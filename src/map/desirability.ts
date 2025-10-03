
;
import { building, building_get, building_get_highest_id } from 'building/building';
import { model_building, model_get_building } from 'building/model';
import { building_state, building_type } from 'building/type';
import { buffer } from 'core/buffer';
import { calc_bound } from 'core/calc';
import { GRID, grid_i8, map_grid_clear_i8, map_grid_load_state_i8, map_grid_offset, map_grid_save_state_i8 } from 'map/grid';
import { map_property_clear_plaza_or_earthquake, map_property_is_plaza_or_earthquake } from 'map/property';
import { map_ring_end, map_ring_is_inside_map, map_ring_start, map_ring_tile, ring_tile } from 'map/ring';
import { map_terrain_get, terrain } from 'map/terrain';
import BUILDING_HOUSE_VACANT_LOT = building_type.BUILDING_HOUSE_VACANT_LOT;
import BUILDING_PLAZA = building_type.BUILDING_PLAZA;
import BUILDING_GARDENS = building_type.BUILDING_GARDENS;
import BUILDING_STATE_IN_USE = building_state.BUILDING_STATE_IN_USE;
export let map_data: map_data_t = new map_data_t();
import GRID_SIZE = GRID.GRID_SIZE;
import TERRAIN_ROCK = terrain.TERRAIN_ROCK;
import TERRAIN_GARDEN = terrain.TERRAIN_GARDEN;
import TERRAIN_ROAD = terrain.TERRAIN_ROAD;
import TERRAIN_RUBBLE = terrain.TERRAIN_RUBBLE;
import TERRAIN_WALL = terrain.TERRAIN_WALL;
import TERRAIN_GATEHOUSE = terrain.TERRAIN_GATEHOUSE;
let desirability_grid: grid_i8;
export function map_desirability_clear() {
    map_grid_clear_i8(desirability_grid.items);
}
function add_desirability_at_distance(x: number, y: number, size: number, distance: number, desirability: number) {
    let partially_outside_map: number = 0;
    if (x - distance < -1 || x + distance + size - 1 > map_data.width) {
        partially_outside_map = 1;
    }
    if (y - distance < -1 || y + distance + size - 1 > map_data.height) {
        partially_outside_map = 1;
    }
    let base_offset: number = map_grid_offset(x, y);
    let start: number = map_ring_start(size, distance);
    let end: number = map_ring_end(size, distance);
    if (partially_outside_map) {
        for (let i: number = start; i < end; i++) {
            let tile: ring_tile = map_ring_tile(i);
            if (map_ring_is_inside_map(x + tile.x, y + tile.y)) {
                desirability_grid.items[base_offset + tile.grid_offset] += desirability
                desirability_grid.items[base_offset] = calc_bound(desirability_grid.items[base_offset], -100, 100);
            }
        }
    } else {
        for (let i: number = start; i < end; i++) {
            let tile: ring_tile = map_ring_tile(i);
            desirability_grid.items[base_offset + tile.grid_offset] =
                calc_bound(desirability_grid.items[base_offset + tile.grid_offset] + desirability, -100, 100);
        }
    }
}
function add_to_terrain(x: number, y: number, size: number, desirability: number, step: number, step_size: number, range: number) {
    if (size > 0) {
        if (range > 6) {
            range = 6;
        }
        let tiles_within_step: number = 0;
        let distance: number = 1;
        while (range > 0) {
            add_desirability_at_distance(x, y, size, distance, desirability);
            distance++;
            range--;
            tiles_within_step++;
            if (tiles_within_step >= step) {
                desirability += step_size;
                tiles_within_step = 0;
            }
        }
    }
}
function update_buildings() {
    let max_id: number = building_get_highest_id();
    for (let i: number = 1; i <= max_id; i++) {
        let b: building = building_get(i);
        if (b.state == BUILDING_STATE_IN_USE) {
            let model: model_building = model_get_building(b.type);
            add_to_terrain(
                b.x, b.y, b.size,
                model.desirability_value,
                model.desirability_step,
                model.desirability_step_size,
                model.desirability_range);
        }
    }
}
function update_terrain() {
    let grid_offset: number = map_data.start_offset;
    for (let y: number = 0; y < map_data.height; y++, grid_offset += map_data.border_size) {
        for (let x: number = 0; x < map_data.width; x++, grid_offset++) {
            let terrain: number = map_terrain_get(grid_offset);
            if (map_property_is_plaza_or_earthquake(grid_offset)) {
                let type: number;
                if (terrain & TERRAIN_ROAD) {
                    type = BUILDING_PLAZA;
                } else if (terrain & TERRAIN_ROCK) {
                    type = BUILDING_HOUSE_VACANT_LOT;
                } else {
                    map_property_clear_plaza_or_earthquake(grid_offset);
                    continue
                }
                let model: model_building = model_get_building(type);
                add_to_terrain(x, y, 1,
                    model.desirability_value,
                    model.desirability_step,
                    model.desirability_step_size,
                    model.desirability_range);
            } else if (terrain & TERRAIN_GARDEN) {
                let model: model_building = model_get_building(BUILDING_GARDENS);
                add_to_terrain(x, y, 1,
                    model.desirability_value,
                    model.desirability_step,
                    model.desirability_step_size,
                    model.desirability_range);
            } else if (terrain & TERRAIN_RUBBLE) {
                add_to_terrain(x, y, 1, -2, 1, 1, 2);
            }
        }
    }
}
export function map_desirability_update() {
    map_desirability_clear();
    update_buildings();
    update_terrain();
}
export function map_desirability_get(grid_offset: number) {
    return desirability_grid.items[grid_offset];
}
export function map_desirability_get_max(x: number, y: number, size: number) {
    if (size == 1) {
        return desirability_grid.items[map_grid_offset(x, y)];
    }
    let max: number = -9999;
    for (let dy: number = 0; dy < size; dy++) {
        for (let dx: number = 0; dx < size; dx++) {
            let grid_offset: number = map_grid_offset(x + dx, y + dy);
            if (desirability_grid.items[grid_offset] > max) {
                max = desirability_grid.items[grid_offset];
            }
        }
    }
    return max;
}
export function map_desirability_save_state(buf: buffer) {
    map_grid_save_state_i8(desirability_grid.items, buf);
}
export function map_desirability_load_state(buf: buffer) {
    map_grid_load_state_i8(desirability_grid.items, buf);
}
