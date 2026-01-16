export const UNTIL_STOP = 0;
export const GUARD = 50000;
export const UNTIL_CONTINUE = 1;
import { buffer } from 'core/buffer';
import { buffer_write_i32 } from 'core/buffer';
import { buffer_read_i32 } from 'core/buffer';
import { buffer_skip } from 'core/buffer';
export const enum routed_building_type {
    ROUTED_BUILDING_ROAD = 0,
    ROUTED_BUILDING_WALL = 1,
    ROUTED_BUILDING_AQUEDUCT = 2,
    ROUTED_BUILDING_AQUEDUCT_WITHOUT_GRAPHIC = 4,
};
import ROUTED_BUILDING_ROAD = routed_building_type.ROUTED_BUILDING_ROAD;
import ROUTED_BUILDING_WALL = routed_building_type.ROUTED_BUILDING_WALL;
import { building_type } from 'building/type';
import BUILDING_RESERVOIR = building_type.BUILDING_RESERVOIR;
import { building } from 'building/building';
import { building_get } from 'building/building';
import { map_building_at } from 'map/building';
import { direction_type } from 'core/direction';
import { figure_action } from 'figure/action';
import FIGURE_ACTION_150_ATTACK = figure_action.FIGURE_ACTION_150_ATTACK;
import { figure_type } from 'figure/type';
import { figure } from 'figure/figure';
import { map_figure_foreach_until } from 'map/figure';
import { GRID } from 'map/grid';
import GRID_SIZE = GRID.GRID_SIZE;
const MAX_QUEUE = GRID_SIZE * GRID_SIZE;
import { grid_u8 } from 'map/grid';
import { grid_i8 } from 'map/grid';
import { grid_i16 } from 'map/grid';
import { map_grid_is_valid_offset } from 'map/grid';
import { map_grid_delta, map_grid_offset } from 'map/grid';
import { map_grid_is_inside } from 'map/grid';
import { map_grid_clear_u8 } from 'map/grid';
import { map_grid_clear_i16 } from 'map/grid';
import { map_can_place_road_under_aqueduct } from 'map/road_aqueduct';
import { map_can_place_aqueduct_on_road } from 'map/road_aqueduct';
import { citizen } from 'map/routing_data';
import CITIZEN_0_ROAD = citizen.CITIZEN_0_ROAD;
import CITIZEN_2_PASSABLE_TERRAIN = citizen.CITIZEN_2_PASSABLE_TERRAIN;
import CITIZEN_4_CLEAR_TERRAIN = citizen.CITIZEN_4_CLEAR_TERRAIN;
import CITIZEN_N1_BLOCKED = citizen.CITIZEN_N1_BLOCKED;
import CITIZEN_N3_AQUEDUCT = citizen.CITIZEN_N3_AQUEDUCT;
import CITIZEN_N4_RESERVOIR_CONNECTOR = citizen.CITIZEN_N4_RESERVOIR_CONNECTOR;
import NONCITIZEN_0_PASSABLE = citizen.NONCITIZEN_0_PASSABLE;
import NONCITIZEN_1_BUILDING = citizen.NONCITIZEN_1_BUILDING;
import NONCITIZEN_2_CLEARABLE = citizen.NONCITIZEN_2_CLEARABLE;
import NONCITIZEN_5_FORT = citizen.NONCITIZEN_5_FORT;
import WATER_N1_BLOCKED = citizen.WATER_N1_BLOCKED;
import WATER_N2_MAP_EDGE = citizen.WATER_N2_MAP_EDGE;
import WATER_N3_LOW_BRIDGE = citizen.WATER_N3_LOW_BRIDGE;
import WALL_0_PASSABLE = citizen.WALL_0_PASSABLE;
export let terrain_land_citizen: grid_i8;
export let terrain_land_noncitizen: grid_i8;
export let terrain_water: grid_i8;
export let terrain_walls: grid_i8;
import { terrain } from 'map/terrain';
import TERRAIN_BUILDING = terrain.TERRAIN_BUILDING;
import TERRAIN_ROAD = terrain.TERRAIN_ROAD;
import TERRAIN_AQUEDUCT = terrain.TERRAIN_AQUEDUCT;
import TERRAIN_WALL = terrain.TERRAIN_WALL;
import TERRAIN_GATEHOUSE = terrain.TERRAIN_GATEHOUSE;
import TERRAIN_CLEARABLE = terrain.TERRAIN_CLEARABLE;
import { map_terrain_is } from 'map/terrain';
import { map_terrain_remove } from 'map/terrain';
let ROUTE_OFFSETS: number[] = [- map_grid_delta(0, 1), 1, map_grid_delta(0, 1), -1, map_grid_delta(-1, 1), map_grid_delta(1, 1), 1, -map_grid_delta(1, 1)];
let routing_distance: grid_i16 = new grid_i16();
export class unnamed21_8 {
    public total_routes_calculated: number = 0;
    public enemy_routes_calculated: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.total_routes_calculated = args[0]);
        args.length >= 2 && (this.enemy_routes_calculated = args[1]);
    }
}
let stats: unnamed21_8 = new unnamed21_8(0, 0);
export class unnamed26_8 {
    public head: number = 0;
    public tail: number = 0;
    public items: number[] = new Array(MAX_QUEUE).fill(0);
    public constructor(...args: any[]) {
        args.length >= 1 && (this.head = args[0]);
        args.length >= 2 && (this.tail = args[1]);
        args.length >= 3 && (this.items = args[2]);
    }
}
let queue: unnamed26_8 = new unnamed26_8();
let water_drag: grid_u8 = new grid_u8();
export class unnamed34_8 {
    public through_building_id: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.through_building_id = args[0]);
    }
}
let state: unnamed34_8 = new unnamed34_8();
function clear_distances() {
    map_grid_clear_i16(routing_distance.items);
}
function enqueue(next_offset: number, dist: number) {
    routing_distance.items[next_offset] = dist;
    queue.items[queue.tail++] = next_offset;
    if (queue.tail >= MAX_QUEUE) {
        queue.tail = 0;
    }
}
function valid_offset(grid_offset: number) {
    return map_grid_is_valid_offset(grid_offset) && routing_distance.items[grid_offset] == 0;
}
function route_queue(source: number, dest: number, callback: (offset: number, dist: number) => void) {
    clear_distances();
    queue.head = queue.tail = 0;
    enqueue(source, 1);
    while (queue.head != queue.tail) {
        let offset: number = queue.items[queue.head];
        if (offset == dest) {
            break;
        }
        let dist: number = 1 + routing_distance.items[offset];
        for (let i: number = 0; i < 4; i++) {
            if (valid_offset(offset + ROUTE_OFFSETS[i])) {
                callback(offset + ROUTE_OFFSETS[i], dist);
            }
        }
        if (++queue.head >= MAX_QUEUE) {
            queue.head = 0;
        }
    }
}
function route_queue_until(source: number, callback: (offset: number, dist: number) => number) {
    clear_distances();
    queue.head = queue.tail = 0;
    enqueue(source, 1);
    while (queue.head != queue.tail) {
        let offset: number = queue.items[queue.head];
        let dist: number = 1 + routing_distance.items[offset];
        for (let i: number = 0; i < 4; i++) {
            if (valid_offset(offset + ROUTE_OFFSETS[i])) {
                if (callback(offset + ROUTE_OFFSETS[i], dist) == UNTIL_STOP) {
                    break;
                }
            }
        }
        if (++queue.head >= MAX_QUEUE) {
            queue.head = 0;
        }
    }
}
function route_queue_max(source: number, dest: number, max_tiles: number, callback: (offset: number, dist: number) => void) {
    clear_distances();
    queue.head = queue.tail = 0;
    enqueue(source, 1);
    let tiles: number = 0;
    while (queue.head != queue.tail) {
        let offset: number = queue.items[queue.head];
        if (offset == dest) break;
        if (++tiles > max_tiles) break;
        let dist: number = 1 + routing_distance.items[offset];
        for (let i: number = 0; i < 4; i++) {
            if (valid_offset(offset + ROUTE_OFFSETS[i])) {
                callback(offset + ROUTE_OFFSETS[i], dist);
            }
        }
        if (++queue.head >= MAX_QUEUE) {
            queue.head = 0;
        }
    }
}
function route_queue_boat(source: number, callback: (offset: number, dist: number) => void) {
    clear_distances();
    map_grid_clear_u8(water_drag.items);
    queue.head = queue.tail = 0;
    enqueue(source, 1);
    let tiles: number = 0;
    while (queue.head != queue.tail) {
        let offset: number = queue.items[queue.head];
        if (++tiles > GUARD) {
            break;
        }
        let drag: number = terrain_water.items[offset] == WATER_N2_MAP_EDGE ? 4 : 0;
        if (drag && water_drag.items[offset]++ < drag) {
            queue.items[queue.tail++] = offset;
            if (queue.tail >= MAX_QUEUE) {
                queue.tail = 0;
            }
        } else {
            let dist: number = 1 + routing_distance.items[offset];
            for (let i: number = 0; i < 4; i++) {
                if (valid_offset(offset + ROUTE_OFFSETS[i])) {
                    callback(offset + ROUTE_OFFSETS[i], dist);
                }
            }
        }
        if (++queue.head >= MAX_QUEUE) {
            queue.head = 0;
        }
    }
}
function route_queue_dir8(source: number, callback: (offset: number, dist: number) => void) {
    clear_distances();
    queue.head = queue.tail = 0;
    enqueue(source, 1);
    let tiles: number = 0;
    while (queue.head != queue.tail) {
        if (++tiles > GUARD) {
            break;
        }
        let offset: number = queue.items[queue.head];
        let dist: number = 1 + routing_distance.items[offset];
        for (let i: number = 0; i < 8; i++) {
            if (valid_offset(offset + ROUTE_OFFSETS[i])) {
                callback(offset + ROUTE_OFFSETS[i], dist);
            }
        }
        if (++queue.head >= MAX_QUEUE) {
            queue.head = 0;
        }
    }
}
function callback_calc_distance(next_offset: number, dist: number) {
    if (terrain_land_citizen.items[next_offset] >= CITIZEN_0_ROAD) {
        enqueue(next_offset, dist);
    }
}
export function map_routing_calculate_distances(x: number, y: number) {
    ++stats.total_routes_calculated;
    route_queue(map_grid_offset(x, y), -1, callback_calc_distance);
}
function callback_calc_distance_water_boat(next_offset: number, dist: number) {
    if (terrain_water.items[next_offset] != WATER_N1_BLOCKED &&
        terrain_water.items[next_offset] != WATER_N3_LOW_BRIDGE) {
        enqueue(next_offset, dist);
        if (terrain_water.items[next_offset] == WATER_N2_MAP_EDGE) {
            routing_distance.items[next_offset] += 4
        }
    }
}
export function map_routing_calculate_distances_water_boat(x: number, y: number) {
    let grid_offset: number = map_grid_offset(x, y);
    if (terrain_water.items[grid_offset] == WATER_N1_BLOCKED) {
        clear_distances();
    } else {
        route_queue_boat(grid_offset, callback_calc_distance_water_boat);
    }
}
function callback_calc_distance_water_flotsam(next_offset: number, dist: number) {
    if (terrain_water.items[next_offset] != WATER_N1_BLOCKED) {
        enqueue(next_offset, dist);
    }
}
export function map_routing_calculate_distances_water_flotsam(x: number, y: number) {
    let grid_offset: number = map_grid_offset(x, y);
    if (terrain_water.items[grid_offset] == WATER_N1_BLOCKED) {
        clear_distances();
    } else {
        route_queue_dir8(grid_offset, callback_calc_distance_water_flotsam);
    }
}
function callback_calc_distance_build_wall(next_offset: number, dist: number) {
    if (terrain_land_citizen.items[next_offset] == CITIZEN_4_CLEAR_TERRAIN) {
        enqueue(next_offset, dist);
    }
}
function callback_calc_distance_build_road(next_offset: number, dist: number) {
    let blocked: number = 0;
    switch (terrain_land_citizen.items[next_offset]) {
        case CITIZEN_N3_AQUEDUCT:
            if (!map_can_place_road_under_aqueduct(next_offset)) {
                routing_distance.items[next_offset] = -1;
                blocked = 1;
            }
            break
        case CITIZEN_2_PASSABLE_TERRAIN:
        case CITIZEN_N1_BLOCKED:
            blocked = 1;
            break
        default:
            if (map_terrain_is(next_offset, TERRAIN_BUILDING)) {
                blocked = 1;
            }
            break
    }
    if (!blocked) {
        enqueue(next_offset, dist);
    }
}
function callback_calc_distance_build_aqueduct(next_offset: number, dist: number) {
    let blocked: number = 0;
    switch (terrain_land_citizen.items[next_offset]) {
        case CITIZEN_N3_AQUEDUCT:
        case CITIZEN_2_PASSABLE_TERRAIN:
        case CITIZEN_N1_BLOCKED:
            blocked = 1;
            break
        default:
            if (map_terrain_is(next_offset, TERRAIN_BUILDING)) {
                if (terrain_land_citizen.items[next_offset] != CITIZEN_N4_RESERVOIR_CONNECTOR) {
                    blocked = 1;
                }
            }
            break
    }
    if (map_terrain_is(next_offset, TERRAIN_ROAD) && !map_can_place_aqueduct_on_road(next_offset)) {
        routing_distance.items[next_offset] = -1;
        blocked = 1;
    }
    if (!blocked) {
        enqueue(next_offset, dist);
    }
}
function map_can_place_initial_road_or_aqueduct(grid_offset: number, is_aqueduct: boolean) {
    if (terrain_land_citizen.items[grid_offset] == CITIZEN_N1_BLOCKED) {
        if (!is_aqueduct) {
            return 0;
        }
        if (map_terrain_is(grid_offset, TERRAIN_AQUEDUCT)) {
            return 1;
        }
        if (map_terrain_is(grid_offset, TERRAIN_BUILDING)) {
            if (building_get(map_building_at(grid_offset)).type == BUILDING_RESERVOIR) {
                return 1;
            }
        }
        return 0;
    } else if (terrain_land_citizen.items[grid_offset] == CITIZEN_2_PASSABLE_TERRAIN) {
        return 0;
    } else if (terrain_land_citizen.items[grid_offset] == CITIZEN_N3_AQUEDUCT) {
        if (is_aqueduct) {
            return 0;
        }
        if (map_can_place_road_under_aqueduct(grid_offset)) {
            return 1;
        }
        return 0;
    } else {
        return 1;
    }
}
export function map_routing_calculate_distances_for_building(type: routed_building_type, x: number, y: number) {
    if (type == ROUTED_BUILDING_WALL) {
        route_queue(map_grid_offset(x, y), -1, callback_calc_distance_build_wall);
        return 1;
    }
    clear_distances();
    let source_offset: number = map_grid_offset(x, y);
    if (!map_can_place_initial_road_or_aqueduct(source_offset, type != ROUTED_BUILDING_ROAD)) {
        return 0;
    }
    if (map_terrain_is(source_offset, TERRAIN_ROAD) &&
        type != ROUTED_BUILDING_ROAD && !map_can_place_aqueduct_on_road(source_offset)) {
        return 0;
    }
    ++stats.total_routes_calculated;
    if (type == ROUTED_BUILDING_ROAD) {
        route_queue(source_offset, -1, callback_calc_distance_build_road);
    } else {
        route_queue(source_offset, -1, callback_calc_distance_build_aqueduct);
    }
    return 1;
}
function callback_delete_wall_aqueduct(next_offset: number, dist: number) {
    if (terrain_land_citizen.items[next_offset] < CITIZEN_0_ROAD) {
        if (map_terrain_is(next_offset, TERRAIN_AQUEDUCT | TERRAIN_WALL)) {
            map_terrain_remove(next_offset, TERRAIN_CLEARABLE);
            return UNTIL_STOP;
        }
    } else {
        enqueue(next_offset, dist);
    }
    return UNTIL_CONTINUE;
}
export function map_routing_delete_first_wall_or_aqueduct(x: number, y: number) {
    ++stats.total_routes_calculated;
    route_queue_until(map_grid_offset(x, y), callback_delete_wall_aqueduct);
}
function is_fighting_friendly(f: figure) {
    return (f.is_friendly && f.action_state == FIGURE_ACTION_150_ATTACK) ? 1 : 0;
}
function has_fighting_friendly(grid_offset: number) {
    return map_figure_foreach_until(grid_offset, is_fighting_friendly);
}
function is_fighting_enemy(f: figure) {
    return (!f.is_friendly && f.action_state == FIGURE_ACTION_150_ATTACK) ? 1 : 0;
}
function has_fighting_enemy(grid_offset: number) {
    return map_figure_foreach_until(grid_offset, is_fighting_enemy);
}
function callback_travel_citizen_land(next_offset: number, dist: number) {
    if (terrain_land_citizen.items[next_offset] >= 0 && !has_fighting_friendly(next_offset)) {
        enqueue(next_offset, dist);
    }
}
export function map_routing_citizen_can_travel_over_land(src_x: number, src_y: number, dst_x: number, dst_y: number) {
    let src_offset: number = map_grid_offset(src_x, src_y);
    let dst_offset: number = map_grid_offset(dst_x, dst_y);
    ++stats.total_routes_calculated;
    route_queue(src_offset, dst_offset, callback_travel_citizen_land);
    return routing_distance.items[dst_offset] != 0;
}
function callback_travel_citizen_road_garden(next_offset: number, dist: number) {
    if (terrain_land_citizen.items[next_offset] >= CITIZEN_0_ROAD &&
        terrain_land_citizen.items[next_offset] <= CITIZEN_2_PASSABLE_TERRAIN) {
        enqueue(next_offset, dist);
    }
}
export function map_routing_citizen_can_travel_over_road_garden(src_x: number, src_y: number, dst_x: number, dst_y: number) {
    let src_offset: number = map_grid_offset(src_x, src_y);
    let dst_offset: number = map_grid_offset(dst_x, dst_y);
    ++stats.total_routes_calculated;
    route_queue(src_offset, dst_offset, callback_travel_citizen_road_garden);
    return routing_distance.items[dst_offset] != 0;
}
function callback_travel_walls(next_offset: number, dist: number) {
    if (terrain_walls.items[next_offset] >= WALL_0_PASSABLE &&
        terrain_walls.items[next_offset] <= 2) {
        enqueue(next_offset, dist);
    }
}
export function map_routing_can_travel_over_walls(src_x: number, src_y: number, dst_x: number, dst_y: number) {
    let src_offset: number = map_grid_offset(src_x, src_y);
    let dst_offset: number = map_grid_offset(dst_x, dst_y);
    ++stats.total_routes_calculated;
    route_queue(src_offset, dst_offset, callback_travel_walls);
    return routing_distance.items[dst_offset] != 0;
}
function callback_travel_noncitizen_land_through_building(next_offset: number, dist: number) {
    if (!has_fighting_enemy(next_offset)) {
        if (terrain_land_noncitizen.items[next_offset] == NONCITIZEN_0_PASSABLE ||
            terrain_land_noncitizen.items[next_offset] == NONCITIZEN_2_CLEARABLE ||
            (terrain_land_noncitizen.items[next_offset] == NONCITIZEN_1_BUILDING &&
                map_building_at(next_offset) == state.through_building_id)) {
            enqueue(next_offset, dist);
        }
    }
}
function callback_travel_noncitizen_land(next_offset: number, dist: number) {
    if (!has_fighting_enemy(next_offset)) {
        if (terrain_land_noncitizen.items[next_offset] >= NONCITIZEN_0_PASSABLE &&
            terrain_land_noncitizen.items[next_offset] < NONCITIZEN_5_FORT) {
            enqueue(next_offset, dist);
        }
    }
}
export function map_routing_noncitizen_can_travel_over_land(src_x: number, src_y: number, dst_x: number, dst_y: number, only_through_building_id: number, max_tiles: number) {
    let src_offset: number = map_grid_offset(src_x, src_y);
    let dst_offset: number = map_grid_offset(dst_x, dst_y);
    ++stats.total_routes_calculated;
    ++stats.enemy_routes_calculated;
    if (only_through_building_id) {
        state.through_building_id = only_through_building_id;
        route_queue(src_offset, dst_offset, callback_travel_noncitizen_land_through_building);
    } else {
        route_queue_max(src_offset, dst_offset, max_tiles, callback_travel_noncitizen_land);
    }
    return routing_distance.items[dst_offset] != 0;
}
function callback_travel_noncitizen_through_everything(next_offset: number, dist: number) {
    if (terrain_land_noncitizen.items[next_offset] >= NONCITIZEN_0_PASSABLE) {
        enqueue(next_offset, dist);
    }
}
export function map_routing_noncitizen_can_travel_through_everything(src_x: number, src_y: number, dst_x: number, dst_y: number) {
    let src_offset: number = map_grid_offset(src_x, src_y);
    let dst_offset: number = map_grid_offset(dst_x, dst_y);
    ++stats.total_routes_calculated;
    route_queue(src_offset, dst_offset, callback_travel_noncitizen_through_everything);
    return routing_distance.items[dst_offset] != 0;
}
export function map_routing_block(x: number, y: number, size: number) {
    if (!map_grid_is_inside(x, y, size)) {
        return;
    }
    for (let dy: number = 0; dy < size; dy++) {
        for (let dx: number = 0; dx < size; dx++) {
            routing_distance.items[map_grid_offset(x + dx, y + dy)] = 0;
        }
    }
}
export function map_routing_distance(grid_offset: number) {
    return routing_distance.items[grid_offset];
}
export function map_routing_save_state(buf: buffer) {
    buffer_write_i32(buf, 0);
    buffer_write_i32(buf, stats.enemy_routes_calculated);
    buffer_write_i32(buf, stats.total_routes_calculated);
    buffer_write_i32(buf, 0);
}
export function map_routing_load_state(buf: buffer) {
    buffer_skip(buf, 4);
    stats.enemy_routes_calculated = buffer_read_i32(buf);
    stats.total_routes_calculated = buffer_read_i32(buf);
    buffer_skip(buf, 4);
}
