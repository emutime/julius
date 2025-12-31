
import { buffer } from 'core/buffer';
import { random_generate_next, random_short } from 'core/random';
import { GRID, grid_u8, map_grid_clear_u8, map_grid_load_state_u8, map_grid_save_state_u8 } from 'map/grid';
import GRID_SIZE = GRID.GRID_SIZE;
let random: grid_u8;
export function map_random_clear() {
    map_grid_clear_u8(random.items);
}
export function map_random_init() {
    let grid_offset: number = 0;
    for (let y: number = 0; y < GRID_SIZE; y++) {
        for (let x: number = 0; x < GRID_SIZE; x++, grid_offset++) {
            random_generate_next();
            random.items[grid_offset] = random_short() & 0xFF;
        }
    }
}
export function map_random_get(grid_offset: number) {
    return random.items[grid_offset];
}
export function map_random_save_state(buf: buffer) {
    map_grid_save_state_u8(random.items, buf);
}
export function map_random_load_state(buf: buffer) {
    map_grid_load_state_u8(random.items, buf);
}
