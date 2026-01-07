

import { buffer } from 'core/buffer';
import { Ref } from '../../ext/crt';
export const enum terrain {
    TERRAIN_TREE = 1,
    TERRAIN_ROCK = 2,
    TERRAIN_WATER = 4,
    TERRAIN_BUILDING = 8,
    TERRAIN_SHRUB = 0x10,
    TERRAIN_GARDEN = 0x20,
    TERRAIN_ROAD = 0x40,
    TERRAIN_RESERVOIR_RANGE = 0x80,
    TERRAIN_AQUEDUCT = 0x100,
    TERRAIN_ELEVATION = 0x200,
    TERRAIN_ACCESS_RAMP = 0x400,
    TERRAIN_MEADOW = 0x800,
    TERRAIN_RUBBLE = 0x1000,
    TERRAIN_FOUNTAIN_RANGE = 0x2000,
    TERRAIN_WALL = 0x4000,
    TERRAIN_GATEHOUSE = 0x8000,
    // combined
    TERRAIN_WALL_OR_GATEHOUSE = TERRAIN_WALL | TERRAIN_GATEHOUSE,
    TERRAIN_NOT_CLEAR = 0xd77f,
    TERRAIN_CLEARABLE = 0xd17f,
    TERRAIN_IMPASSABLE = 0xc75f,
    TERRAIN_IMPASSABLE_ENEMY = 0x1237,
    TERRAIN_IMPASSABLE_WOLF = 0xd73f,
    TERRAIN_ALL = 0xffff
};
import TERRAIN_TREE = terrain.TERRAIN_TREE;
import TERRAIN_ROCK = terrain.TERRAIN_ROCK;
import TERRAIN_WATER = terrain.TERRAIN_WATER;
import TERRAIN_ROAD = terrain.TERRAIN_ROAD;
import TERRAIN_MEADOW = terrain.TERRAIN_MEADOW;
import TERRAIN_WALL = terrain.TERRAIN_WALL;
import TERRAIN_GATEHOUSE = terrain.TERRAIN_GATEHOUSE;
import TERRAIN_NOT_CLEAR = terrain.TERRAIN_NOT_CLEAR;
import { GRID } from 'map/grid';
import GRID_SIZE = GRID.GRID_SIZE;
import { grid_u16 } from 'map/grid';
import { map_grid_is_valid_offset } from 'map/grid';
import { map_grid_offset } from 'map/grid';
import { map_grid_offset_to_x } from 'map/grid';
import { map_grid_offset_to_y } from 'map/grid';
import { map_grid_delta } from 'map/grid';
import { map_grid_size } from 'map/grid';
import { map_grid_get_area } from 'map/grid';
import { map_grid_is_inside } from 'map/grid';
import { map_grid_adjacent_offsets } from 'map/grid';
import { map_grid_clear_u16 } from 'map/grid';
import { map_grid_and_u16 } from 'map/grid';
import { map_grid_copy_u16 } from 'map/grid';
import { map_grid_save_state_u16 } from 'map/grid';
import { map_grid_load_state_u16 } from 'map/grid';
import { ring_tile } from 'map/ring';
import { map_ring_start } from 'map/ring';
import { map_ring_end } from 'map/ring';
import { map_ring_is_inside_map } from 'map/ring';
import { map_ring_tile } from 'map/ring';
import { map_routing_distance } from 'map/routing';
let terrain_grid: grid_u16;
let terrain_grid_backup: grid_u16;
export function map_terrain_is(grid_offset: number, terrain: number) {
    return map_grid_is_valid_offset(grid_offset) && terrain_grid.items[grid_offset] & terrain;
}
export function map_terrain_get(grid_offset: number) {
    return terrain_grid.items[grid_offset];
}
export function map_terrain_set(grid_offset: number, terrain: number) {
    terrain_grid.items[grid_offset] = terrain;
}
export function map_terrain_add(grid_offset: number, terrain: number) {
    terrain_grid.items[grid_offset] |= terrain;
}
export function map_terrain_remove(grid_offset: number, terrain: number) {
    terrain_grid.items[grid_offset] &= ~terrain;
}
export function map_terrain_add_with_radius(x: number, y: number, size: number, radius: number, terrain: number) {
    let x_min: Ref<number> = new Ref<number>(0);
    let y_min: Ref<number> = new Ref<number>(0);
    let x_max: Ref<number> = new Ref<number>(0);
    let y_max: Ref<number> = new Ref<number>(0);
    map_grid_get_area(x, y, size, radius, x_min, y_min, x_max, y_max);
    for (let yy: number = y_min.v; yy <= y_max.v; yy++) {
        for (let xx: number = x_min.v; xx <= x_max.v; xx++) {
            map_terrain_add(map_grid_offset(xx, yy), terrain);
        }
    }
}
export function map_terrain_remove_with_radius(x: number, y: number, size: number, radius: number, terrain: number) {
    let x_min: Ref<number> = new Ref<number>(0);
    let y_min: Ref<number> = new Ref<number>(0);
    let x_max: Ref<number> = new Ref<number>(0);
    let y_max: Ref<number> = new Ref<number>(0);
    map_grid_get_area(x, y, size, radius, x_min, y_min, x_max, y_max);
    for (let yy: number = y_min.v; yy <= y_max.v; yy++) {
        for (let xx: number = x_min.v; xx <= x_max.v; xx++) {
            map_terrain_remove(map_grid_offset(xx, yy), terrain);
        }
    }
}
export function map_terrain_remove_all(terrain: number) {
    map_grid_and_u16(terrain_grid.items, ~terrain);
}
export function map_terrain_count_directly_adjacent_with_type(grid_offset: number, terrain: number) {
    let count: number = 0;
    if (map_terrain_is(grid_offset + map_grid_delta(0, -1), terrain)) {
        count++;
    }
    if (map_terrain_is(grid_offset + map_grid_delta(1, 0), terrain)) {
        count++;
    }
    if (map_terrain_is(grid_offset + map_grid_delta(0, 1), terrain)) {
        count++;
    }
    if (map_terrain_is(grid_offset + map_grid_delta(-1, 0), terrain)) {
        count++;
    }
    return count;
}
export function map_terrain_count_diagonally_adjacent_with_type(grid_offset: number, terrain: number) {
    let count: number = 0;
    if (map_terrain_is(grid_offset + map_grid_delta(1, -1), terrain)) {
        count++;
    }
    if (map_terrain_is(grid_offset + map_grid_delta(1, 1), terrain)) {
        count++;
    }
    if (map_terrain_is(grid_offset + map_grid_delta(-1, 1), terrain)) {
        count++;
    }
    if (map_terrain_is(grid_offset + map_grid_delta(-1, -1), terrain)) {
        count++;
    }
    return count;
}
export function map_terrain_has_adjacent_x_with_type(grid_offset: number, terrain: number) {
    if (map_terrain_is(grid_offset + map_grid_delta(0, -1), terrain) ||
        map_terrain_is(grid_offset + map_grid_delta(0, 1), terrain)) {
        return 1;
    }
    return 0;
}
export function map_terrain_has_adjacent_y_with_type(grid_offset: number, terrain: number) {
    if (map_terrain_is(grid_offset + map_grid_delta(-1, 0), terrain) ||
        map_terrain_is(grid_offset + map_grid_delta(1, 0), terrain)) {
        return 1;
    }
    return 0;
}
export function map_terrain_exists_tile_in_area_with_type(x: number, y: number, size: number, terrain: number) {
    for (let yy: number = y; yy < y + size; yy++) {
        for (let xx: number = x; xx < x + size; xx++) {
            if (map_grid_is_inside(xx, yy, 1) && terrain_grid.items[map_grid_offset(xx, yy)] & terrain) {
                return 1;
            }
        }
    }
    return 0;
}
export function map_terrain_exists_tile_in_radius_with_type(x: number, y: number, size: number, radius: number, terrain: number) {
    let x_min: number
    let y_min: number
    let x_max: number
    let y_max: number;
    map_grid_get_area(x, y, size, radius, x_min, y_min, x_max, y_max);
    for (let yy: number = y_min; yy <= y_max; yy++) {
        for (let xx: number = x_min; xx <= x_max; xx++) {
            if (map_terrain_is(map_grid_offset(xx, yy), terrain)) {
                return 1;
            }
        }
    }
    return 0;
}
export function map_terrain_exists_clear_tile_in_radius(x: number, y: number, size: number, radius: number, except_grid_offset: number, x_tile: Ref<number>, y_tile: Ref<number>) {
    let x_min: Ref<number> = new Ref<number>(0);
    let y_min: Ref<number> = new Ref<number>(0);
    let x_max: Ref<number> = new Ref<number>(0);
    let y_max: Ref<number> = new Ref<number>(0);
    map_grid_get_area(x, y, size, radius, x_min, y_min, x_max, y_max);
    for (let yy: number = y_min.v; yy <= y_max.v; yy++) {
        for (let xx: number = x_min.v; xx <= x_max.v; xx++) {
            let grid_offset: number = map_grid_offset(xx, yy);
            if (grid_offset != except_grid_offset && !terrain_grid.items[grid_offset]) {
                x_tile.v = xx;
                y_tile.v = yy;
                return 1;
            }
        }
    }
    x_tile.v = x_max.v;
    y_tile.v = y_max.v;
    return 0;
}
export function map_terrain_all_tiles_in_radius_are(x: number, y: number, size: number, radius: number, terrain: number) {
    let x_min: number
    let y_min: number
    let x_max: number
    let y_max: number;
    map_grid_get_area(x, y, size, radius, x_min, y_min, x_max, y_max);
    for (let yy: number = y_min; yy <= y_max; yy++) {
        for (let xx: number = x_min; xx <= x_max; xx++) {
            if (!map_terrain_is(map_grid_offset(xx, yy), terrain)) {
                return 0;
            }
        }
    }
    return 1;
}
export function map_terrain_has_only_rocks_trees_in_ring(x: number, y: number, distance: number) {
    let start: number = map_ring_start(1, distance);
    let end: number = map_ring_end(1, distance);
    let base_offset: number = map_grid_offset(x, y);
    for (let i: number = start; i < end; i++) {
        let tile: ring_tile = map_ring_tile(i);
        if (map_ring_is_inside_map(x + tile.x, y + tile.y)) {
            if (!map_terrain_is(base_offset + tile.grid_offset, TERRAIN_ROCK | TERRAIN_TREE)) {
                return 0;
            }
        }
    }
    return 1;
}
export function map_terrain_has_only_meadow_in_ring(x: number, y: number, distance: number) {
    let start: number = map_ring_start(1, distance);
    let end: number = map_ring_end(1, distance);
    let base_offset: number = map_grid_offset(x, y);
    for (let i: number = start; i < end; i++) {
        let tile: ring_tile = map_ring_tile(i);
        if (map_ring_is_inside_map(x + tile.x, y + tile.y)) {
            if (!map_terrain_is(base_offset + tile.grid_offset, TERRAIN_MEADOW)) {
                return 0;
            }
        }
    }
    return 1;
}
export function map_terrain_is_adjacent_to_wall(x: number, y: number, size: number) {
    let base_offset: number = map_grid_offset(x, y);
    let tile_delta: number = 0;
    for (let i: number = 0; (tile_delta = map_grid_adjacent_offsets(size, i)) != 0; i++) {
        if (map_terrain_is(base_offset + tile_delta, TERRAIN_WALL)) {
            return 1;
        }
    }
    return 0;
}
export function map_terrain_is_adjacent_to_water(x: number, y: number, size: number) {
    let base_offset: number = map_grid_offset(x, y);
    let tile_delta: number = 0;
    for (let i: number = 0; (tile_delta = map_grid_adjacent_offsets(size, i)) != 0; i++) {
        if (map_terrain_is(base_offset + tile_delta, TERRAIN_WATER)) {
            return 1;
        }
    }
    return 0;
}
export function map_terrain_is_adjacent_to_open_water(x: number, y: number, size: number) {
    let base_offset: number = map_grid_offset(x, y);
    let tile_delta: number = 0;
    for (let i: number = 0; (tile_delta = map_grid_adjacent_offsets(size, i)) != 0; i++) {
        if (map_terrain_is(base_offset + tile_delta, TERRAIN_WATER) &&
            map_routing_distance(base_offset + tile_delta) > 0) {
            return 1;
        }
    }
    return 0;
}
export function map_terrain_get_adjacent_road_or_clear_land(x: number, y: number, size: number, x_tile: Ref<number>, y_tile: Ref<number>) {
    let base_offset: number = map_grid_offset(x, y);
    let tile_delta: number = 0;
    for (let i: number = 0; (tile_delta = map_grid_adjacent_offsets(size, i)) != 0; i++) {
        let grid_offset: number = base_offset + tile_delta;
        if (map_terrain_is(grid_offset, TERRAIN_ROAD) ||
            !map_terrain_is(grid_offset, TERRAIN_NOT_CLEAR)) {
            x_tile.v = map_grid_offset_to_x(grid_offset);
            y_tile.v = map_grid_offset_to_y(grid_offset);
            return 1;
        }
    }
    return 0;
}
function add_road(grid_offset: number) {
    if (!map_terrain_is(grid_offset, TERRAIN_NOT_CLEAR)) {
        map_terrain_add(grid_offset, TERRAIN_ROAD);
    }
}
export function map_terrain_add_gatehouse_roads(x: number, y: number, orientation: number) {
    map_terrain_add(map_grid_offset(x, y), TERRAIN_ROAD);
    map_terrain_add(map_grid_offset(x + 1, y), TERRAIN_ROAD);
    map_terrain_add(map_grid_offset(x, y + 1), TERRAIN_ROAD);
    map_terrain_add(map_grid_offset(x + 1, y + 1), TERRAIN_ROAD);
    if (orientation == 1) {
        add_road(map_grid_offset(x, y - 1));
        add_road(map_grid_offset(x + 1, y - 1));
        add_road(map_grid_offset(x, y + 2));
        add_road(map_grid_offset(x + 1, y + 2));
    } else if (orientation == 2) {
        add_road(map_grid_offset(x - 1, y));
        add_road(map_grid_offset(x - 1, y + 1));
        add_road(map_grid_offset(x + 2, y));
        add_road(map_grid_offset(x + 2, y + 1));
    }
}
export function map_terrain_add_triumphal_arch_roads(x: number, y: number, orientation: number) {
    if (orientation == 1) {
        map_terrain_add(map_grid_offset(x + 1, y), TERRAIN_ROAD);
        map_terrain_add(map_grid_offset(x + 1, y + 1), TERRAIN_ROAD);
        map_terrain_add(map_grid_offset(x + 1, y + 2), TERRAIN_ROAD);
        map_terrain_remove(map_grid_offset(x, y), TERRAIN_ROAD);
        map_terrain_remove(map_grid_offset(x, y + 1), TERRAIN_ROAD);
        map_terrain_remove(map_grid_offset(x, y + 2), TERRAIN_ROAD);
        map_terrain_remove(map_grid_offset(x + 2, y), TERRAIN_ROAD);
        map_terrain_remove(map_grid_offset(x + 2, y + 1), TERRAIN_ROAD);
        map_terrain_remove(map_grid_offset(x + 2, y + 2), TERRAIN_ROAD);
    } else if (orientation == 2) {
        map_terrain_add(map_grid_offset(x, y + 1), TERRAIN_ROAD);
        map_terrain_add(map_grid_offset(x + 1, y + 1), TERRAIN_ROAD);
        map_terrain_add(map_grid_offset(x + 2, y + 1), TERRAIN_ROAD);
        map_terrain_remove(map_grid_offset(x, y), TERRAIN_ROAD);
        map_terrain_remove(map_grid_offset(x + 1, y), TERRAIN_ROAD);
        map_terrain_remove(map_grid_offset(x + 2, y), TERRAIN_ROAD);
        map_terrain_remove(map_grid_offset(x, y + 2), TERRAIN_ROAD);
        map_terrain_remove(map_grid_offset(x + 1, y + 2), TERRAIN_ROAD);
        map_terrain_remove(map_grid_offset(x + 2, y + 2), TERRAIN_ROAD);
    }
}
export function map_terrain_backup() {
    map_grid_copy_u16(terrain_grid.items, terrain_grid_backup.items);
}
export function map_terrain_restore() {
    map_grid_copy_u16(terrain_grid_backup.items, terrain_grid.items);
}
export function map_terrain_clear() {
    map_grid_clear_u16(terrain_grid.items);
}
export function map_terrain_init_outside_map() {
    let map_width: number
    let map_height: number;
    map_grid_size(map_width, map_height);
    let y_start: number = (GRID_SIZE - map_height) / 2;
    let x_start: number = (GRID_SIZE - map_width) / 2;
    for (let y: number = 0; y < GRID_SIZE; y++) {
        let y_outside_map: number = y < y_start || y >= y_start + map_height;
        for (let x: number = 0; x < GRID_SIZE; x++) {
            if (y_outside_map || x < x_start || x >= x_start + map_width) {
                terrain_grid.items[x + GRID_SIZE * y] = TERRAIN_TREE | TERRAIN_WATER;
            }
        }
    }
}
export function map_terrain_save_state(buf: buffer) {
    map_grid_save_state_u16(terrain_grid.items, buf);
}
export function map_terrain_load_state(buf: buffer) {
    map_grid_load_state_u16(terrain_grid.items, buf);
}
