
;
import { buffer } from 'core/buffer';
import { GRID, grid_u8, map_data, map_grid_clear_u8, map_grid_delta, map_grid_load_state_u8, map_grid_save_state_u8 } from 'map/grid';
import GRID_SIZE = GRID.GRID_SIZE;
let elevation: grid_u8 = new grid_u8();
export function map_elevation_at(grid_offset: number) {
    return elevation.items[grid_offset];
}
export function map_elevation_set(grid_offset: number, value: number) {
    elevation.items[grid_offset] = value;
}
export function map_elevation_clear() {
    map_grid_clear_u8(elevation.items);
}
function fix_cliff_tiles(grid_offset: number) {
    let max: number = elevation.items[grid_offset] - 1;
    if (elevation.items[grid_offset + map_grid_delta(-1, 0)] < max ||
        elevation.items[grid_offset + map_grid_delta(0, -1)] < max ||
        elevation.items[grid_offset + map_grid_delta(1, 0)] < max ||
        elevation.items[grid_offset + map_grid_delta(0, 1)] < max) {
        elevation.items[grid_offset]--;
    }
}
export function map_elevation_remove_cliffs() {
    for (let level: number = 0; level < 4; level++) {
        let grid_offset: number = map_data.start_offset;
        for (let y: number = 0; y < map_data.height; y++, grid_offset += map_data.border_size) {
            for (let x: number = 0; x < map_data.width; x++, grid_offset++) {
                if (elevation.items[grid_offset] > 0) {
                    fix_cliff_tiles(grid_offset);
                }
            }
        }
    }
}
export function map_elevation_save_state(buf: buffer) {
    map_grid_save_state_u8(elevation.items, buf);
}
export function map_elevation_load_state(buf: buffer) {
    map_grid_load_state_u8(elevation.items, buf);
}
