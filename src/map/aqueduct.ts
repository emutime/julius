
import { buffer } from 'core/buffer';
import { GRID, grid_u8, map_grid_clear_u8, map_grid_copy_u8, map_grid_delta, map_grid_load_state_u8, map_grid_save_state_u8 } from 'map/grid';
import GRID_SIZE = GRID.GRID_SIZE;
// The aqueduct grid is used in two ways:
// 1) to mark water / no water(0 / 1, see map / water_supply.c)
// 2) to store image IDs for the aqueduct(0 - 15)
// This leads to some strange results
let aqueduct: grid_u8 = new grid_u8();
let aqueduct_backup: grid_u8 = new grid_u8();
export function map_aqueduct_at(grid_offset: number) {
    return aqueduct.items[grid_offset];
}
export function map_aqueduct_set(grid_offset: number, value: number) {
    aqueduct.items[grid_offset] = value;
}
export function map_aqueduct_remove(grid_offset: number) {
    aqueduct.items[grid_offset] = 0;
    if (aqueduct.items[grid_offset + map_grid_delta(0, -1)] == 5) {
        aqueduct.items[grid_offset + map_grid_delta(0, -1)] = 1;
    }
    if (aqueduct.items[grid_offset + map_grid_delta(1, 0)] == 6) {
        aqueduct.items[grid_offset + map_grid_delta(1, 0)] = 2;
    }
    if (aqueduct.items[grid_offset + map_grid_delta(0, 1)] == 5) {
        aqueduct.items[grid_offset + map_grid_delta(0, 1)] = 3;
    }
    if (aqueduct.items[grid_offset + map_grid_delta(-1, 0)] == 6) {
        aqueduct.items[grid_offset + map_grid_delta(-1, 0)] = 4;
    }
}
export function map_aqueduct_clear() {
    map_grid_clear_u8(aqueduct.items);
}
export function map_aqueduct_backup() {
    map_grid_copy_u8(aqueduct.items, aqueduct_backup.items);
}
export function map_aqueduct_restore() {
    map_grid_copy_u8(aqueduct_backup.items, aqueduct.items);
}
export function map_aqueduct_save_state(buf: buffer, backup: buffer) {
    map_grid_save_state_u8(aqueduct.items, buf);
    map_grid_save_state_u8(aqueduct_backup.items, backup);
}
export function map_aqueduct_load_state(buf: buffer, backup: buffer) {
    map_grid_load_state_u8(aqueduct.items, buf);
    map_grid_load_state_u8(aqueduct_backup.items, backup);
}
