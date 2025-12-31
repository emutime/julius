import { MAX_BUILDINGS } from 'building/building';
export const MAX_QUEUE = 1000;
export const OFFSET = 1;
import { well } from 'map/water_supply';
import WELL_NECESSARY = well.WELL_NECESSARY;
import WELL_UNNECESSARY_FOUNTAIN = well.WELL_UNNECESSARY_FOUNTAIN;
import WELL_UNNECESSARY_NO_HOUSES = well.WELL_UNNECESSARY_NO_HOUSES;
import { building_type } from 'building/type';
import BUILDING_RESERVOIR = building_type.BUILDING_RESERVOIR;
import BUILDING_FOUNTAIN = building_type.BUILDING_FOUNTAIN;
import BUILDING_WELL = building_type.BUILDING_WELL;
import { building_type } from 'building/type';
import { building_state } from 'building/type';
import BUILDING_STATE_IN_USE = building_state.BUILDING_STATE_IN_USE;;
import { buffer } from 'core/buffer';
import { building } from 'building/building';
import { building_get } from 'building/building';
import { building_list_small_clear } from 'building/list';
import { building_list_small_add } from 'building/list';
import { building_list_small_size } from 'building/list';
import { building_list_small_items } from 'building/list';
import { building_list_large_clear } from 'building/list';
import { building_list_large_add } from 'building/list';
import { building_list_large_size } from 'building/list';
import { building_list_large_items } from 'building/list';
import { language_type } from 'core/locale';
import { encoding_type } from 'core/encoding';
import { group_terrain } from 'core/image_group';
import GROUP_BUILDING_FOUNTAIN_4 = group_terrain.GROUP_BUILDING_FOUNTAIN_4;
import GROUP_BUILDING_FOUNTAIN_1 = group_terrain.GROUP_BUILDING_FOUNTAIN_1;
import GROUP_BUILDING_FOUNTAIN_2 = group_terrain.GROUP_BUILDING_FOUNTAIN_2;
import GROUP_BUILDING_FOUNTAIN_3 = group_terrain.GROUP_BUILDING_FOUNTAIN_3;
import GROUP_BUILDING_AQUEDUCT_NO_WATER = group_terrain.GROUP_BUILDING_AQUEDUCT_NO_WATER;
import { color_t } from 'graphics/color';
import { image } from 'core/image';
import { image_group } from 'core/image';
import { map_aqueduct_at } from 'map/aqueduct';
import { map_aqueduct_set } from 'map/aqueduct';
import { map_building_tiles_add } from 'map/building_tiles';
export let map_data: map_data_t = new map_data_t();
import { map_desirability_get } from 'map/desirability';
import { map_building_at } from 'map/building';
import { GRID } from 'map/grid';
import GRID_SIZE = GRID.GRID_SIZE;
import { map_grid_offset } from 'map/grid';
import { map_grid_get_area } from 'map/grid';
import { map_image_at } from 'map/image';
import { map_image_set } from 'map/image';
import { edge_x } from 'map/property';
import EDGE_X0Y0 = edge_x.EDGE_X0Y0;
import EDGE_X2Y0 = edge_x.EDGE_X2Y0;
import EDGE_X0Y2 = edge_x.EDGE_X0Y2;
import EDGE_X2Y2 = edge_x.EDGE_X2Y2;
import { map_property_multi_tile_xy } from 'map/property';
import { terrain } from 'map/terrain';
import TERRAIN_WATER = terrain.TERRAIN_WATER;
import TERRAIN_BUILDING = terrain.TERRAIN_BUILDING;
import TERRAIN_RESERVOIR_RANGE = terrain.TERRAIN_RESERVOIR_RANGE;
import TERRAIN_AQUEDUCT = terrain.TERRAIN_AQUEDUCT;
import TERRAIN_FOUNTAIN_RANGE = terrain.TERRAIN_FOUNTAIN_RANGE;
import TERRAIN_WALL = terrain.TERRAIN_WALL;
import TERRAIN_GATEHOUSE = terrain.TERRAIN_GATEHOUSE;
import { map_terrain_is } from 'map/terrain';
import { map_terrain_add_with_radius } from 'map/terrain';
import { map_terrain_remove_all } from 'map/terrain';
import { map_terrain_exists_tile_in_area_with_type } from 'map/terrain';
import { scenario_climate } from 'scenario/property';
import CLIMATE_DESERT = scenario_climate.CLIMATE_DESERT;
import { scenario_climate } from 'scenario/property';
import { scenario_property_climate } from 'scenario/property';
import { _invalid_parameter_noinfo } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt';
import { _errno } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/errno';
import { memcpy } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vcruntime_string';
import { memcpy } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vcruntime_string';
import { memmove } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vcruntime_string';
import { memmove } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vcruntime_string';
import { memset } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vcruntime_string';
import { memset } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vcruntime_string';
import { wcsnlen } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstring';
import { wcstok } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstring';
import { strnlen } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/string';
let ADJACENT_OFFSETS: number[] = new Array().fill({- GRID_SIZE, 1, GRID_SIZE, -1});
export class unnamed25_8 {
    public items: number[] = new Array(MAX_QUEUE).fill(0);
    public head: number = 0;
    public tail: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.items = args[0]);
        args.length >= 2 && (this.head = args[1]);
        args.length >= 3 && (this.tail = args[2]);
    }
}
let queue: unnamed25_8 = new unnamed25_8();
function mark_well_access(well_id: number, radius: number) {
    let well: building = building_get(well_id);
    let x_min: number
    let y_min: number
    let x_max: number
    let y_max: number;
    map_grid_get_area(well.x, well.y, 1, radius, x_min, y_min, x_max, y_max);
    for (let yy: number = y_min; yy <= y_max; yy++) {
        for (let xx: number = x_min; xx <= x_max; xx++) {
            let building_id: number = map_building_at(map_grid_offset(xx, yy));
            if (building_id) {
                building_get(building_id).has_well_access = 1;
            }
        }
    }
}
export function map_water_supply_update_houses() {
    building_list_small_clear();
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state != BUILDING_STATE_IN_USE) {
            continue
        }
        if (b.type == BUILDING_WELL) {
            building_list_small_add(i);
        } else if (b.house_size) {
            b.has_water_access = 0;
            b.has_well_access = 0;
            if (map_terrain_exists_tile_in_area_with_type(
                b.x, b.y, b.size, TERRAIN_FOUNTAIN_RANGE)) {
                b.has_water_access = 1;
            }
        }
    }
    let total_wells: number = building_list_small_size();
    let wells: number = building_list_small_items();
    for (let i: number = 0; i < total_wells; i++) {
        mark_well_access(wells[i], 2);
    }
}
function set_all_aqueducts_to_no_water() {
    let image_without_water: number = image_group(GROUP_BUILDING_AQUEDUCT_NO_WATER);
    let grid_offset: number = map_data.start_offset;
    for (let y: number = 0; y < map_data.height; y++, grid_offset += map_data.border_size) {
        for (let x: number = 0; x < map_data.width; x++, grid_offset++) {
            if (map_terrain_is(grid_offset, TERRAIN_AQUEDUCT)) {
                map_aqueduct_set(grid_offset, 0);
                let image_id: number = map_image_at(grid_offset);
                if (image_id < image_without_water) {
                    map_image_set(grid_offset, image_id + 15);
                }
            }
        }
    }
}
function fill_aqueducts_from_offset(grid_offset: number) {
    if (!map_terrain_is(grid_offset, TERRAIN_AQUEDUCT)) {
        return;
    }
    memset(queue, 0);
    let guard: number = 0;
    let next_offset: number;
    let image_without_water: number = image_group(GROUP_BUILDING_AQUEDUCT_NO_WATER);
    do {
        if (++guard >= GRID_SIZE * GRID_SIZE) {
            break;
        }
        map_aqueduct_set(grid_offset, 1);
            int image_id = map_image_at(grid_offset);
        if (image_id >= image_without_water) {
            map_image_set(grid_offset, image_id - 15);
        }
        next_offset = -1;
        for (let i: number = 0; i < 4; i++) {
            let new_offset: number = grid_offset + ADJACENT_OFFSETS[i];
            let b: building = building_get(map_building_at(new_offset));
            if (b.id && b.type == BUILDING_RESERVOIR) {
                    // check if aqueduct connects to reservoir -. doesn't connect to corner
                let xy: number = map_property_multi_tile_xy(new_offset);
                if (xy != EDGE_X0Y0 && xy != EDGE_X2Y0 && xy != EDGE_X0Y2 && xy != EDGE_X2Y2) {
                    if (!b.has_water_access) {
                        b.has_water_access = 2;
                    }
                }
            } else if (map_terrain_is(new_offset, TERRAIN_AQUEDUCT)) {
                if (!map_aqueduct_at(new_offset)) {
                    if (next_offset == -1) {
                        next_offset = new_offset;
                    } else {
                        queue.items[queue.tail++] = new_offset;
                        if (queue.tail >= MAX_QUEUE) {
                            queue.tail = 0;
                        }
                    }
                }
            }
        }
        if (next_offset == -1) {
            if (queue.head == queue.tail) {
                return;
            }
            next_offset = queue.items[queue.head++];
            if (queue.head >= MAX_QUEUE) {
                queue.head = 0;
            }
        }
        grid_offset = next_offset;
    } while (next_offset > -1)
}
export function map_water_supply_update_reservoir_fountain() {
    map_terrain_remove_all(TERRAIN_FOUNTAIN_RANGE | TERRAIN_RESERVOIR_RANGE);
    set_all_aqueducts_to_no_water();
    building_list_large_clear(1);
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state == BUILDING_STATE_IN_USE && b.type == BUILDING_RESERVOIR) {
            building_list_large_add(i);
            if (map_terrain_exists_tile_in_area_with_type(b.x - 1, b.y - 1, 5, TERRAIN_WATER)) {
                b.has_water_access = 2;
            } else {
                b.has_water_access = 0;
            }
        }
    }
    let total_reservoirs: number = building_list_large_size();
    let reservoirs: number = building_list_large_items();
    let changed: number = 1;
    let CONNECTOR_OFFSETS: number[] = { OFFSET(1,- 1), OFFSET(3, 1), OFFSET(1, 3), OFFSET(-1, 1)
};
while (changed == 1) {
    changed = 0;
    for (let i: number = 0; i < total_reservoirs; i++) {
        let b: building = building_get(reservoirs[i]);
        if (b.has_water_access == 2) {
            b.has_water_access = 1;
            changed = 1;
            for (let d: number = 0; d < 4; d++) {
                fill_aqueducts_from_offset(b.grid_offset + CONNECTOR_OFFSETS[d]);
            }
        }
    }
}
for (let i: number = 0; i < total_reservoirs; i++) {
    let b: building = building_get(reservoirs[i]);
    if (b.has_water_access) {
        map_terrain_add_with_radius(b.x, b.y, 3, 10, TERRAIN_RESERVOIR_RANGE);
    }
}
for (let i: number = 1; i < MAX_BUILDINGS; i++) {
    let b: building = building_get(i);
    if (b.state != BUILDING_STATE_IN_USE || b.type != BUILDING_FOUNTAIN) {
        continue
    }
    let des: number = map_desirability_get(b.grid_offset);
    let image_id: number;
    if (des > 60) {
        image_id = image_group(GROUP_BUILDING_FOUNTAIN_4);
    } else if (des > 40) {
        image_id = image_group(GROUP_BUILDING_FOUNTAIN_3);
    } else if (des > 20) {
        image_id = image_group(GROUP_BUILDING_FOUNTAIN_2);
    } else {
        image_id = image_group(GROUP_BUILDING_FOUNTAIN_1);
    }
    map_building_tiles_add(i, b.x, b.y, 1, image_id, TERRAIN_BUILDING);
    if (map_terrain_is(b.grid_offset, TERRAIN_RESERVOIR_RANGE) && b.num_workers) {
        b.has_water_access = 1;
        map_terrain_add_with_radius(b.x, b.y, 1,
            scenario_property_climate() == CLIMATE_DESERT ? 3 : 4,
            TERRAIN_FOUNTAIN_RANGE);
    } else {
        b.has_water_access = 0;
    }
}
}
export function map_water_supply_is_well_unnecessary(well_id: number, radius: number) {
    let well: building = building_get(well_id);
    let num_houses: number = 0;
    let x_min: number
    let y_min: number
    let x_max: number
    let y_max: number;
    map_grid_get_area(well.x, well.y, 1, radius, x_min, y_min, x_max, y_max);
    for (let yy: number = y_min; yy <= y_max; yy++) {
        for (let xx: number = x_min; xx <= x_max; xx++) {
            let grid_offset: number = map_grid_offset(xx, yy);
            let building_id: number = map_building_at(grid_offset);
            if (building_id && building_get(building_id).house_size) {
                num_houses++;
                if (!map_terrain_is(grid_offset, TERRAIN_FOUNTAIN_RANGE)) {
                    return WELL_NECESSARY;
                }
            }
        }
    }
    return num_houses ? WELL_UNNECESSARY_FOUNTAIN : WELL_UNNECESSARY_NO_HOUSES;
}
