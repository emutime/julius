
export const enum destroyable {
    DESTROYABLE_BUILDING,
    DESTROYABLE_AQUEDUCT_GARDEN,
    DESTROYABLE_WALL,
    DESTROYABLE_GATEHOUSE,
    DESTROYABLE_NONE
};
import DESTROYABLE_BUILDING = destroyable.DESTROYABLE_BUILDING;
import DESTROYABLE_AQUEDUCT_GARDEN = destroyable.DESTROYABLE_AQUEDUCT_GARDEN;
import DESTROYABLE_WALL = destroyable.DESTROYABLE_WALL;
import DESTROYABLE_GATEHOUSE = destroyable.DESTROYABLE_GATEHOUSE;
import DESTROYABLE_NONE = destroyable.DESTROYABLE_NONE;
import { building, building_get } from 'building/building';
import { building_type } from 'building/type';
import { city_view_orientation } from 'city/view';
import { direction_type } from 'core/direction';
import { image_group } from 'core/image';
import { group_terrain } from 'core/image_group';
import { map_building_at } from 'map/building';
import { GRID, grid_i8, map_grid_delta, map_grid_get_area, map_grid_init_i8, map_grid_offset } from 'map/grid';
import { map_image_at, map_image_set } from 'map/image';
import { edge_x, map_property_mark_draw_tile, map_property_multi_tile_xy, map_property_set_multi_tile_size } from 'map/property';
import { map_random_get } from 'map/random';
import { citizen } from 'map/routing_data';
import { map_sprite_bridge_at } from 'map/sprite';
import { map_terrain_get, map_terrain_is, map_terrain_remove, terrain } from 'map/terrain';
import { Ref } from '../../ext/crt';
import { map_data_t } from './data';
import BUILDING_FORT_GROUND = building_type.BUILDING_FORT_GROUND;
import BUILDING_TRIUMPHAL_ARCH = building_type.BUILDING_TRIUMPHAL_ARCH;
import BUILDING_FORT = building_type.BUILDING_FORT;
import BUILDING_GATEHOUSE = building_type.BUILDING_GATEHOUSE;
import BUILDING_GRANARY = building_type.BUILDING_GRANARY;
import BUILDING_WAREHOUSE = building_type.BUILDING_WAREHOUSE;
import BUILDING_NATIVE_HUT = building_type.BUILDING_NATIVE_HUT;
import BUILDING_NATIVE_MEETING = building_type.BUILDING_NATIVE_MEETING;
import BUILDING_RESERVOIR = building_type.BUILDING_RESERVOIR;
import BUILDING_NATIVE_CROPS = building_type.BUILDING_NATIVE_CROPS;
import BUILDING_BURNING_RUIN = building_type.BUILDING_BURNING_RUIN;
import DIR_0_TOP = direction_type.DIR_0_TOP;
import DIR_2_RIGHT = direction_type.DIR_2_RIGHT;
import DIR_4_BOTTOM = direction_type.DIR_4_BOTTOM;
import DIR_6_LEFT = direction_type.DIR_6_LEFT;
import GROUP_TERRAIN_GRASS_1 = group_terrain.GROUP_TERRAIN_GRASS_1;
import GROUP_BUILDING_AQUEDUCT = group_terrain.GROUP_BUILDING_AQUEDUCT;
export let map_data: map_data_t = new map_data_t();
import EDGE_X1Y0 = edge_x.EDGE_X1Y0;
import EDGE_X0Y1 = edge_x.EDGE_X0Y1;
import EDGE_X1Y1 = edge_x.EDGE_X1Y1;
import EDGE_X2Y1 = edge_x.EDGE_X2Y1;
import EDGE_X1Y2 = edge_x.EDGE_X1Y2;
import GRID_SIZE = GRID.GRID_SIZE;
import CITIZEN_0_ROAD = citizen.CITIZEN_0_ROAD;
import CITIZEN_2_PASSABLE_TERRAIN = citizen.CITIZEN_2_PASSABLE_TERRAIN;
import CITIZEN_4_CLEAR_TERRAIN = citizen.CITIZEN_4_CLEAR_TERRAIN;
import CITIZEN_N1_BLOCKED = citizen.CITIZEN_N1_BLOCKED;
import CITIZEN_N3_AQUEDUCT = citizen.CITIZEN_N3_AQUEDUCT;
import CITIZEN_N4_RESERVOIR_CONNECTOR = citizen.CITIZEN_N4_RESERVOIR_CONNECTOR;
import NONCITIZEN_0_PASSABLE = citizen.NONCITIZEN_0_PASSABLE;
import NONCITIZEN_1_BUILDING = citizen.NONCITIZEN_1_BUILDING;
import NONCITIZEN_2_CLEARABLE = citizen.NONCITIZEN_2_CLEARABLE;
import NONCITIZEN_3_WALL = citizen.NONCITIZEN_3_WALL;
import NONCITIZEN_4_GATEHOUSE = citizen.NONCITIZEN_4_GATEHOUSE;
import NONCITIZEN_5_FORT = citizen.NONCITIZEN_5_FORT;
import NONCITIZEN_N1_BLOCKED = citizen.NONCITIZEN_N1_BLOCKED;
import WATER_0_PASSABLE = citizen.WATER_0_PASSABLE;
import WATER_N1_BLOCKED = citizen.WATER_N1_BLOCKED;
import WATER_N2_MAP_EDGE = citizen.WATER_N2_MAP_EDGE;
import WATER_N3_LOW_BRIDGE = citizen.WATER_N3_LOW_BRIDGE;
import WALL_0_PASSABLE = citizen.WALL_0_PASSABLE;
import WALL_N1_BLOCKED = citizen.WALL_N1_BLOCKED;
export let terrain_land_citizen: grid_i8;
export let terrain_land_noncitizen: grid_i8;
export let terrain_water: grid_i8;
export let terrain_walls: grid_i8;
import TERRAIN_WATER = terrain.TERRAIN_WATER;
import TERRAIN_BUILDING = terrain.TERRAIN_BUILDING;
import TERRAIN_GARDEN = terrain.TERRAIN_GARDEN;
import TERRAIN_ROAD = terrain.TERRAIN_ROAD;
import TERRAIN_AQUEDUCT = terrain.TERRAIN_AQUEDUCT;
import TERRAIN_ACCESS_RAMP = terrain.TERRAIN_ACCESS_RAMP;
import TERRAIN_RUBBLE = terrain.TERRAIN_RUBBLE;
import TERRAIN_WALL = terrain.TERRAIN_WALL;
import TERRAIN_GATEHOUSE = terrain.TERRAIN_GATEHOUSE;
import TERRAIN_WALL_OR_GATEHOUSE = terrain.TERRAIN_WALL_OR_GATEHOUSE;
import TERRAIN_NOT_CLEAR = terrain.TERRAIN_NOT_CLEAR;


export function map_routing_update_all() {
    map_routing_update_land();
    map_routing_update_water();
    map_routing_update_walls();
}
export function map_routing_update_land() {
    map_routing_update_land_citizen();
    map_routing_update_land_noncitizen();
}
function get_land_type_citizen_building(grid_offset: number) {
    let b: building = building_get(map_building_at(grid_offset));
    let type: number = CITIZEN_N1_BLOCKED;
    switch (b.type) {
        case BUILDING_WAREHOUSE:
        case BUILDING_GATEHOUSE:
            type = CITIZEN_0_ROAD;
            break
        case BUILDING_FORT_GROUND:
            type = CITIZEN_2_PASSABLE_TERRAIN;
            break
        case BUILDING_TRIUMPHAL_ARCH:
            if (b.subtype.orientation == 3) {
                switch (map_property_multi_tile_xy(grid_offset)) {
                    case EDGE_X0Y1:
                    case EDGE_X1Y1:
                    case EDGE_X2Y1:
                        type = CITIZEN_0_ROAD;
                        break
                }
            } else {
                switch (map_property_multi_tile_xy(grid_offset)) {
                    case EDGE_X1Y0:
                    case EDGE_X1Y1:
                    case EDGE_X1Y2:
                        type = CITIZEN_0_ROAD;
                        break
                }
            }
            break
        case BUILDING_GRANARY:
            switch (map_property_multi_tile_xy(grid_offset)) {
                case EDGE_X1Y0:
                case EDGE_X0Y1:
                case EDGE_X1Y1:
                case EDGE_X2Y1:
                case EDGE_X1Y2:
                    type = CITIZEN_0_ROAD;
                    break
            }
            break
        case BUILDING_RESERVOIR:
            switch (map_property_multi_tile_xy(grid_offset)) {
                case EDGE_X1Y0:
                case EDGE_X0Y1:
                case EDGE_X2Y1:
                case EDGE_X1Y2:
                    type = CITIZEN_N4_RESERVOIR_CONNECTOR;
                    break
            }
            break
    }
    return type;
}
function get_land_type_citizen_aqueduct(grid_offset: number) {
    let image_id: number = map_image_at(grid_offset) - image_group(GROUP_BUILDING_AQUEDUCT);
    if (image_id <= 3) {
        return CITIZEN_N3_AQUEDUCT;
    } else if (image_id <= 7) {
        return CITIZEN_N1_BLOCKED;
    } else if (image_id <= 9) {
        return CITIZEN_N3_AQUEDUCT;
    } else if (image_id <= 14) {
        return CITIZEN_N1_BLOCKED;
    } else if (image_id <= 18) {
        return CITIZEN_N3_AQUEDUCT;
    } else if (image_id <= 22) {
        return CITIZEN_N1_BLOCKED;
    } else if (image_id <= 24) {
        return CITIZEN_N3_AQUEDUCT;
    } else {
        return CITIZEN_N1_BLOCKED;
    }
}
export function map_routing_update_land_citizen() {
    map_grid_init_i8(terrain_land_citizen.items, -1);
    let grid_offset: number = map_data.start_offset;
    for (let y: number = 0; y < map_data.height; y++, grid_offset += map_data.border_size) {
        for (let x: number = 0; x < map_data.width; x++, grid_offset++) {
            let terrain: number = map_terrain_get(grid_offset);
            if (terrain & TERRAIN_ROAD) {
                terrain_land_citizen.items[grid_offset] = CITIZEN_0_ROAD;
            } else if (terrain & (TERRAIN_RUBBLE | TERRAIN_ACCESS_RAMP | TERRAIN_GARDEN)) {
                terrain_land_citizen.items[grid_offset] = CITIZEN_2_PASSABLE_TERRAIN;
            } else if (terrain & (TERRAIN_BUILDING | TERRAIN_GATEHOUSE)) {
                if (!map_building_at(grid_offset)) {
                    terrain_land_noncitizen.items[grid_offset] = CITIZEN_4_CLEAR_TERRAIN;
                    map_terrain_remove(grid_offset, TERRAIN_BUILDING);
                    map_image_set(grid_offset, (map_random_get(grid_offset) & 7) + image_group(GROUP_TERRAIN_GRASS_1));
                    map_property_mark_draw_tile(grid_offset);
                    map_property_set_multi_tile_size(grid_offset, 1);
                    continue
                }
                terrain_land_citizen.items[grid_offset] = get_land_type_citizen_building(grid_offset);
            } else if (terrain & TERRAIN_AQUEDUCT) {
                terrain_land_citizen.items[grid_offset] = get_land_type_citizen_aqueduct(grid_offset);
            } else if (terrain & TERRAIN_NOT_CLEAR) {
                terrain_land_citizen.items[grid_offset] = CITIZEN_N1_BLOCKED;
            } else {
                terrain_land_citizen.items[grid_offset] = CITIZEN_4_CLEAR_TERRAIN;
            }
        }
    }
}
function get_land_type_noncitizen(grid_offset: number) {
    let type: number = NONCITIZEN_1_BUILDING;
    switch (building_get(map_building_at(grid_offset)).type) {
        case BUILDING_WAREHOUSE:
        case BUILDING_FORT_GROUND:
            type = NONCITIZEN_0_PASSABLE;
            break
        case BUILDING_BURNING_RUIN:
        case BUILDING_NATIVE_HUT:
        case BUILDING_NATIVE_MEETING:
        case BUILDING_NATIVE_CROPS:
            type = NONCITIZEN_N1_BLOCKED;
            break
        case BUILDING_FORT:
            type = NONCITIZEN_5_FORT;
            break
        case BUILDING_GRANARY:
            switch (map_property_multi_tile_xy(grid_offset)) {
                case EDGE_X1Y0:
                case EDGE_X0Y1:
                case EDGE_X1Y1:
                case EDGE_X2Y1:
                case EDGE_X1Y2:
                    type = NONCITIZEN_0_PASSABLE;
                    break
            }
            break
    }
    return type;
}
function map_routing_update_land_noncitizen() {
    map_grid_init_i8(terrain_land_noncitizen.items, -1);
    let grid_offset: number = map_data.start_offset;
    for (let y: number = 0; y < map_data.height; y++, grid_offset += map_data.border_size) {
        for (let x: number = 0; x < map_data.width; x++, grid_offset++) {
            let terrain: number = map_terrain_get(grid_offset);
            if (terrain & TERRAIN_GATEHOUSE) {
                terrain_land_noncitizen.items[grid_offset] = NONCITIZEN_4_GATEHOUSE;
            } else if (terrain & TERRAIN_ROAD) {
                terrain_land_noncitizen.items[grid_offset] = NONCITIZEN_0_PASSABLE;
            } else if (terrain & (TERRAIN_GARDEN | TERRAIN_ACCESS_RAMP | TERRAIN_RUBBLE)) {
                terrain_land_noncitizen.items[grid_offset] = NONCITIZEN_2_CLEARABLE;
            } else if (terrain & TERRAIN_BUILDING) {
                terrain_land_noncitizen.items[grid_offset] = get_land_type_noncitizen(grid_offset);
            } else if (terrain & TERRAIN_AQUEDUCT) {
                terrain_land_noncitizen.items[grid_offset] = NONCITIZEN_2_CLEARABLE;
            } else if (terrain & TERRAIN_WALL) {
                terrain_land_noncitizen.items[grid_offset] = NONCITIZEN_3_WALL;
            } else if (terrain & TERRAIN_NOT_CLEAR) {
                terrain_land_noncitizen.items[grid_offset] = NONCITIZEN_N1_BLOCKED;
            } else {
                terrain_land_noncitizen.items[grid_offset] = NONCITIZEN_0_PASSABLE;
            }
        }
    }
}
function is_surrounded_by_water(grid_offset: number) {
    return map_terrain_is(grid_offset + map_grid_delta(0, -1), TERRAIN_WATER) &&
        map_terrain_is(grid_offset + map_grid_delta(-1, 0), TERRAIN_WATER) &&
        map_terrain_is(grid_offset + map_grid_delta(1, 0), TERRAIN_WATER) &&
        map_terrain_is(grid_offset + map_grid_delta(0, 1), TERRAIN_WATER);
}
export function map_routing_update_water() {
    map_grid_init_i8(terrain_water.items, -1);
    let grid_offset: number = map_data.start_offset;
    for (let y: number = 0; y < map_data.height; y++, grid_offset += map_data.border_size) {
        for (let x: number = 0; x < map_data.width; x++, grid_offset++) {
            if (map_terrain_is(grid_offset, TERRAIN_WATER) && is_surrounded_by_water(grid_offset)) {
                if (x > 0 && x < map_data.width - 1 &&
                    y > 0 && y < map_data.height - 1) {
                    switch (map_sprite_bridge_at(grid_offset)) {
                        case 5:
                        case 6:
                            terrain_water.items[grid_offset] = WATER_N3_LOW_BRIDGE;
                            break
                        case 13:
                            terrain_water.items[grid_offset] = WATER_N1_BLOCKED;
                            break
                        default:
                            terrain_water.items[grid_offset] = WATER_0_PASSABLE
                            break
                    }
                } else {
                    terrain_water.items[grid_offset] = WATER_N2_MAP_EDGE;
                }
            } else {
                terrain_water.items[grid_offset] = WATER_N1_BLOCKED;
            }
        }
    }
}
function is_wall_tile(grid_offset: number) {
    return map_terrain_is(grid_offset, TERRAIN_WALL_OR_GATEHOUSE) ? 1 : 0;
}
function count_adjacent_wall_tiles(grid_offset: number) {
    let adjacent: number = 0;
    switch (city_view_orientation()) {
        case DIR_0_TOP:
            adjacent += is_wall_tile(grid_offset + map_grid_delta(0, 1))
            adjacent += is_wall_tile(grid_offset + map_grid_delta(1, 1))
            adjacent += is_wall_tile(grid_offset + map_grid_delta(1, 0))
            break
        case DIR_2_RIGHT:
            adjacent += is_wall_tile(grid_offset + map_grid_delta(0, 1))
            adjacent += is_wall_tile(grid_offset + map_grid_delta(-1, 1))
            adjacent += is_wall_tile(grid_offset + map_grid_delta(-1, 0))
            break
        case DIR_4_BOTTOM:
            adjacent += is_wall_tile(grid_offset + map_grid_delta(0, -1))
            adjacent += is_wall_tile(grid_offset + map_grid_delta(-1, -1))
            adjacent += is_wall_tile(grid_offset + map_grid_delta(-1, 0))
            break
        case DIR_6_LEFT:
            adjacent += is_wall_tile(grid_offset + map_grid_delta(0, -1))
            adjacent += is_wall_tile(grid_offset + map_grid_delta(1, -1))
            adjacent += is_wall_tile(grid_offset + map_grid_delta(1, 0))
            break
    }
    return adjacent;
}
export function map_routing_update_walls() {
    map_grid_init_i8(terrain_walls.items, -1);
    let grid_offset: number = map_data.start_offset;
    for (let y: number = 0; y < map_data.height; y++, grid_offset += map_data.border_size) {
        for (let x: number = 0; x < map_data.width; x++, grid_offset++) {
            if (map_terrain_is(grid_offset, TERRAIN_WALL)) {
                if (count_adjacent_wall_tiles(grid_offset) == 3) {
                    terrain_walls.items[grid_offset] = WALL_0_PASSABLE;
                } else {
                    terrain_walls.items[grid_offset] = WALL_N1_BLOCKED;
                }
            } else if (map_terrain_is(grid_offset, TERRAIN_GATEHOUSE)) {
                terrain_walls.items[grid_offset] = WALL_0_PASSABLE;
            } else {
                terrain_walls.items[grid_offset] = WALL_N1_BLOCKED;
            }
        }
    }
}
export function map_routing_is_wall_passable(grid_offset: number) {
    return terrain_walls.items[grid_offset] == WALL_0_PASSABLE;
}
function wall_tile_in_radius(x: number, y: number, radius: number, x_wall: Ref<number>, y_wall: Ref<number>) {
    let size: number = 1;
    let x_min: Ref<number> = new Ref<number>(0);
    let y_min: Ref<number> = new Ref<number>(0);
    let x_max: Ref<number> = new Ref<number>(0);
    let y_max: Ref<number> = new Ref<number>(0);
    map_grid_get_area(x, y, size, radius, x_min, y_min, x_max, y_max);
    for (let yy: number = y_min.v; yy <= y_max.v; yy++) {
        for (let xx: number = x_min.v; xx <= x_max.v; xx++) {
            if (map_routing_is_wall_passable(map_grid_offset(xx, yy))) {
                x_wall.v = xx;
                y_wall.v = yy;
                return 1;
            }
        }
    }
    return 0;
}
export function map_routing_wall_tile_in_radius(x: number, y: number, radius: number, x_wall: Ref<number>, y_wall: Ref<number>) {
    for (let i: number = 1; i <= radius; i++) {
        if (wall_tile_in_radius(x, y, i, x_wall, y_wall)) {
            return 1;
        }
    }
    return 0;
}
export function map_routing_citizen_is_passable(grid_offset: number) {
    return terrain_land_citizen.items[grid_offset] == CITIZEN_0_ROAD ||
        terrain_land_citizen.items[grid_offset] == CITIZEN_2_PASSABLE_TERRAIN;
}
export function map_routing_citizen_is_road(grid_offset: number) {
    return terrain_land_citizen.items[grid_offset] == CITIZEN_0_ROAD;
}
export function map_routing_citizen_is_passable_terrain(grid_offset: number) {
    return terrain_land_citizen.items[grid_offset] == CITIZEN_2_PASSABLE_TERRAIN;
}
export function map_routing_noncitizen_is_passable(grid_offset: number) {
    return terrain_land_noncitizen.items[grid_offset] >= NONCITIZEN_0_PASSABLE;
}
export function map_routing_is_destroyable(grid_offset: number) {
    return terrain_land_noncitizen.items[grid_offset] > NONCITIZEN_0_PASSABLE &&
        terrain_land_noncitizen.items[grid_offset] != NONCITIZEN_5_FORT;
}
export function map_routing_get_destroyable(grid_offset: number) {
    switch (terrain_land_noncitizen.items[grid_offset]) {
        case NONCITIZEN_1_BUILDING:
            return DESTROYABLE_BUILDING;
        case NONCITIZEN_2_CLEARABLE:
            return DESTROYABLE_AQUEDUCT_GARDEN;
        case NONCITIZEN_3_WALL:
            return DESTROYABLE_WALL;
        case NONCITIZEN_4_GATEHOUSE:
            return DESTROYABLE_GATEHOUSE;
        default:
            return DESTROYABLE_NONE
    }
}
