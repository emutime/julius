
import { building, building_get } from 'building/building';
import { building_type } from 'building/type';
import { city_map_road_network_index } from 'city/map';
import { map_building_at } from 'map/building';
import { map_grid_adjacent_offsets, map_grid_delta, map_grid_get_area, map_grid_offset, map_grid_offset_to_x, map_grid_offset_to_y } from 'map/grid';
import { map_point, map_point_store_result } from 'map/point';
import { map_road_network_get } from 'map/road_network';
import { map_routing_distance } from 'map/routing';
import { map_routing_citizen_is_road } from 'map/routing_terrain';
import { map_terrain_is, terrain } from 'map/terrain';
import { Ref } from '../../ext/crt';
import BUILDING_GATEHOUSE = building_type.BUILDING_GATEHOUSE;
import BUILDING_GRANARY = building_type.BUILDING_GRANARY;
import TERRAIN_BUILDING = terrain.TERRAIN_BUILDING;
import TERRAIN_ROAD = terrain.TERRAIN_ROAD;
import TERRAIN_ACCESS_RAMP = terrain.TERRAIN_ACCESS_RAMP;
import TERRAIN_WALL = terrain.TERRAIN_WALL;
import TERRAIN_GATEHOUSE = terrain.TERRAIN_GATEHOUSE;
function find_minimum_road_tile(x: number, y: number, size: number, min_value: Ref<number>, min_grid_offset: Ref<number>) {
    let base_offset: number = map_grid_offset(x, y);
    let offsets = map_grid_adjacent_offsets(size);
    for (let i: number = 0; i < offsets.length && offsets[i]; i++) {
        let grid_offset: number = base_offset + offsets[i];
        if (!map_terrain_is(grid_offset, TERRAIN_BUILDING) ||
            building_get(map_building_at(grid_offset)).type != BUILDING_GATEHOUSE) {
            if (map_terrain_is(grid_offset, TERRAIN_ROAD)) {
                let road_index: number = city_map_road_network_index(map_road_network_get(grid_offset));
                if (road_index < min_value.v) {
                    min_value.v = road_index;
                    min_grid_offset.v = grid_offset;
                }
            }
        }
    }
}
export function map_has_road_access(x: number, y: number, size: number, road: map_point) {
    let min_value: Ref<number> = new Ref(12);
    let min_grid_offset: Ref<number> = new Ref(map_grid_offset(x, y));
    find_minimum_road_tile(x, y, size, min_value, min_grid_offset);
    if (min_value.v < 12) {
        if (road) {
            map_point_store_result(map_grid_offset_to_x(min_grid_offset.v), map_grid_offset_to_y(min_grid_offset.v), road);
        }
        return 1;
    }
    return 0;
}
export function map_has_road_access_hippodrome(x: number, y: number, road: map_point) {
    let min_value: Ref<number> = new Ref(12);
    let min_grid_offset: Ref<number> = new Ref(map_grid_offset(x, y));
    find_minimum_road_tile(x, y, 5, min_value, min_grid_offset);
    find_minimum_road_tile(x + 5, y, 5, min_value, min_grid_offset);
    find_minimum_road_tile(x + 10, y, 5, min_value, min_grid_offset);
    if (min_value.v < 12) {
        if (road) {
            map_point_store_result(map_grid_offset_to_x(min_grid_offset.v), map_grid_offset_to_y(min_grid_offset.v), road);
        }
        return 1;
    }
    return 0;
}
export function map_has_road_access_granary(x: number, y: number, road: map_point) {
    let rx: number = -1
    let ry: number = -1;
    if (map_terrain_is(map_grid_offset(x + 1, y - 1), TERRAIN_ROAD)) {
        rx = x + 1;
        ry = y - 1;
    } else if (map_terrain_is(map_grid_offset(x + 3, y + 1), TERRAIN_ROAD)) {
        rx = x + 3;
        ry = y + 1;
    } else if (map_terrain_is(map_grid_offset(x + 1, y + 3), TERRAIN_ROAD)) {
        rx = x + 1;
        ry = y + 3;
    } else if (map_terrain_is(map_grid_offset(x - 1, y + 1), TERRAIN_ROAD)) {
        rx = x - 1;
        ry = y + 1;
    }
    if (rx >= 0 && ry >= 0) {
        if (road) {
            map_point_store_result(rx, ry, road);
        }
        return 1;
    }
    return 0;
}
function road_within_radius(x: number, y: number, size: number, radius: number, x_road: Ref<number>, y_road: Ref<number>) {
    let x_min = new Ref<number>(0);
    let y_min = new Ref<number>(0);
    let x_max = new Ref<number>(0);
    let y_max = new Ref<number>(0);
    map_grid_get_area(x, y, size, radius, x_min, y_min, x_max, y_max);
    for (let yy: number = y_min.v; yy <= y_max.v; yy++) {
        for (let xx: number = x_min.v; xx <= x_max.v; xx++) {
            if (map_terrain_is(map_grid_offset(xx, yy), TERRAIN_ROAD)) {
                if (x_road && y_road) {
                    x_road.v = xx;
                    y_road.v = yy;
                }
                return 1;
            }
        }
    }
    return 0;
}
export function map_closest_road_within_radius(x: number, y: number, size: number, radius: number, x_road: Ref<number>, y_road: Ref<number>) {
    for (let r: number = 1; r <= radius; r++) {
        if (road_within_radius(x, y, size, r, x_road, y_road)) {
            return 1;
        }
    }
    return 0;
}
function reachable_road_within_radius(x: number, y: number, size: number, radius: number, x_road: Ref<number>, y_road: Ref<number>) {
    let x_min = new Ref<number>(0);
    let y_min = new Ref<number>(0);
    let x_max = new Ref<number>(0);
    let y_max = new Ref<number>(0);
    map_grid_get_area(x, y, size, radius, x_min, y_min, x_max, y_max);
    for (let yy: number = y_min.v; yy <= y_max.v; yy++) {
        for (let xx: number = x_min.v; xx <= x_max.v; xx++) {
            let grid_offset: number = map_grid_offset(xx, yy);
            if (map_terrain_is(grid_offset, TERRAIN_ROAD)) {
                if (map_routing_distance(grid_offset) > 0) {
                    if (x_road && y_road) {
                        x_road.v = xx;
                        y_road.v = yy;
                    }
                    return 1;
                }
            }
        }
    }
    return 0;
}
export function map_closest_reachable_road_within_radius(x: number, y: number, size: number, radius: number, x_road: Ref<number>, y_road: Ref<number>) {
    for (let r: number = 1; r <= radius; r++) {
        if (reachable_road_within_radius(x, y, size, r, x_road, y_road)) {
            return 1;
        }
    }
    return 0;
}
export function map_road_to_largest_network(x: number, y: number, size: number, x_road: Ref<number>, y_road: Ref<number>) {
    let min_index: number = 12;
    let min_grid_offset: number = -1;
    let base_offset: number = map_grid_offset(x, y);
    let offsets = map_grid_adjacent_offsets(size);
    for (let i: number = 0; i < offsets.length && offsets[i]; i++) {
        let grid_offset: number = base_offset + offsets[i];
        if (map_terrain_is(grid_offset, TERRAIN_ROAD) && map_routing_distance(grid_offset) > 0) {
            let index: number = city_map_road_network_index(map_road_network_get(grid_offset));
            if (index < min_index) {
                min_index = index;
                min_grid_offset = grid_offset;
            }
        }
    }
    if (min_index < 12) {
        x_road.v = map_grid_offset_to_x(min_grid_offset);
        y_road.v = map_grid_offset_to_y(min_grid_offset);
        return min_grid_offset;
    }
    let min_dist: number = 100000;
    min_grid_offset = -1;
    offsets = map_grid_adjacent_offsets(size);
    for (let i: number = 0; i < offsets.length && offsets[i]; i++) {
        let grid_offset: number = base_offset + offsets[i];
        let dist: number = map_routing_distance(grid_offset);
        if (dist > 0 && dist < min_dist) {
            min_dist = dist;
            min_grid_offset = grid_offset;
        }
    }
    if (min_grid_offset >= 0) {
        x_road.v = map_grid_offset_to_x(min_grid_offset);
        y_road.v = map_grid_offset_to_y(min_grid_offset);
        return min_grid_offset;
    }
    return -1;
}
function check_road_to_largest_network_hippodrome(x: number, y: number, min_index: Ref<number>, min_grid_offset: Ref<number>) {
    let base_offset: number = map_grid_offset(x, y);
    let offsets = map_grid_adjacent_offsets(5);
    for (let i: number = 0; i < offsets.length && offsets[i]; i++) {
        let grid_offset: number = base_offset + offsets[i];
        if (map_terrain_is(grid_offset, TERRAIN_ROAD) && map_routing_distance(grid_offset) > 0) {
            let index: number = city_map_road_network_index(map_road_network_get(grid_offset));
            if (index < min_index.v) {
                min_index.v = index;
                min_grid_offset.v = grid_offset;
            }
        }
    }
}
function check_min_dist_hippodrome(base_offset: number, x_offset: number, min_dist: Ref<number>, min_grid_offset: Ref<number>, min_x_offset: Ref<number>) {
    let offsets = map_grid_adjacent_offsets(5);
    for (let i: number = 0; i < offsets.length && offsets[i]; i++) {
        let grid_offset: number = base_offset + offsets[i];
        let dist: number = map_routing_distance(grid_offset);
        if (dist > 0 && dist < min_dist.v) {
            min_dist.v = dist;
            min_grid_offset.v = grid_offset;
            min_x_offset.v = x_offset;
        }
    }
}
export function map_road_to_largest_network_hippodrome(x: number, y: number, x_road: Ref<number>, y_road: Ref<number>) {
    let min_index: Ref<number> = new Ref(12);
    let min_grid_offset: Ref<number> = new Ref(-1);
    check_road_to_largest_network_hippodrome(x, y, min_index, min_grid_offset);
    check_road_to_largest_network_hippodrome(x + 5, y, min_index, min_grid_offset);
    check_road_to_largest_network_hippodrome(x + 10, y, min_index, min_grid_offset);
    if (min_index.v < 12) {
        x_road.v = map_grid_offset_to_x(min_grid_offset.v);
        y_road.v = map_grid_offset_to_y(min_grid_offset.v);
        return min_grid_offset;
    }
    let min_dist: Ref<number> = new Ref(100000);
    min_grid_offset.v = -1;
    let min_x_offset: Ref<number> = new Ref(-1);
    check_min_dist_hippodrome(map_grid_offset(x, y), 0, min_dist, min_grid_offset, min_x_offset);
    check_min_dist_hippodrome(map_grid_offset(x + 5, y), 5, min_dist, min_grid_offset, min_x_offset);
    check_min_dist_hippodrome(map_grid_offset(x + 10, y), 10, min_dist, min_grid_offset, min_x_offset);
    if (min_grid_offset.v >= 0) {
        x_road.v = map_grid_offset_to_x(min_grid_offset.v) + min_x_offset.v;
        y_road.v = map_grid_offset_to_y(min_grid_offset.v);
        return min_grid_offset.v + min_x_offset.v;
    }
    return -1;
}
function terrain_is_road_like(grid_offset: number) {
    return map_terrain_is(grid_offset, TERRAIN_ROAD | TERRAIN_ACCESS_RAMP) ? 1 : 0;
}
function get_adjacent_road_tile_for_roaming(grid_offset: number) {
    let is_road: number = terrain_is_road_like(grid_offset);
    if (map_terrain_is(grid_offset, TERRAIN_BUILDING)) {
        let b: building = building_get(map_building_at(grid_offset));
        if (b.type == BUILDING_GATEHOUSE) {
            is_road = 0;
        } else if (b.type == BUILDING_GRANARY) {
            if (map_routing_citizen_is_road(grid_offset)) {
                is_road = 1;
            }
        }
    }
    return is_road;
}
export function map_get_adjacent_road_tiles_for_roaming(grid_offset: number, road_tiles: number[]) {
    road_tiles[1] = road_tiles[3] = road_tiles[5] = road_tiles[7] = 0;
    road_tiles[0] = get_adjacent_road_tile_for_roaming(grid_offset + map_grid_delta(0, -1));
    road_tiles[2] = get_adjacent_road_tile_for_roaming(grid_offset + map_grid_delta(1, 0));
    road_tiles[4] = get_adjacent_road_tile_for_roaming(grid_offset + map_grid_delta(0, 1));
    road_tiles[6] = get_adjacent_road_tile_for_roaming(grid_offset + map_grid_delta(-1, 0));
    return road_tiles[0] + road_tiles[2] + road_tiles[4] + road_tiles[6];
}
export function map_get_diagonal_road_tiles_for_roaming(grid_offset: number, road_tiles: number[]) {
    road_tiles[1] = terrain_is_road_like(grid_offset + map_grid_delta(1, -1));
    road_tiles[3] = terrain_is_road_like(grid_offset + map_grid_delta(1, 1));
    road_tiles[5] = terrain_is_road_like(grid_offset + map_grid_delta(-1, 1));
    road_tiles[7] = terrain_is_road_like(grid_offset + map_grid_delta(-1, -1));
    let max_stretch: number = 0;
    let stretch: number = 0;
    for (let i: number = 0; i < 16; i++) {
        if (road_tiles[i % 8]) {
            stretch++;
            if (stretch > max_stretch) {
                max_stretch = stretch;
            }
        } else {
            stretch = 0;
        }
    }
    return max_stretch;
}
