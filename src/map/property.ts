
;
import { buffer } from 'core/buffer';
import { GRID, grid_u8, map_grid_and_u8, map_grid_clear_u8, map_grid_copy_u8, map_grid_load_state_u8, map_grid_offset, map_grid_save_state_u8, map_grid_size } from 'map/grid';
import { map_random_get } from 'map/random';
import GRID_SIZE = GRID.GRID_SIZE;
export const enum bit_size {
    BIT_SIZE1 = 0,
    BIT_SIZE2 = 1,
    BIT_SIZE3 = 2,
    BIT_SIZE4 = 4,
    BIT_SIZE5 = 8,
    BIT_SIZES = 15,
    BIT_NO_SIZES = 240,
    BIT_CONSTRUCTION = 16,
    BIT_NO_CONSTRUCTION = 239,
    BIT_ALTERNATE_TERRAIN = 32,
    BIT_DELETED = 64,
    BIT_NO_DELETED = 191,
    BIT_PLAZA_OR_EARTHQUAKE = 128,
    BIT_NO_PLAZA = 127,
    BIT_NO_CONSTRUCTION_AND_DELETED = 175,
    EDGE_MASK_X = 7,
    EDGE_MASK_Y = 56,
    EDGE_MASK_XY = 63,
    EDGE_LEFTMOST_TILE = 64,
    EDGE_NO_LEFTMOST_TILE = 191,
    EDGE_NATIVE_LAND = 128,
    EDGE_NO_NATIVE_LAND = 127,
}
let edge_grid: grid_u8;
let bitfields_grid: grid_u8;
let edge_backup: grid_u8;
let bitfields_backup: grid_u8;
function edge_for(x: number, y: number) {
    return 8 * y + x;
}
export function map_property_is_draw_tile(grid_offset: number) {
    return edge_grid.items[grid_offset] & EDGE_LEFTMOST_TILE;
}
export function map_property_mark_draw_tile(grid_offset: number) {
    edge_grid.items[grid_offset] |= EDGE_LEFTMOST_TILE
}
export function map_property_clear_draw_tile(grid_offset: number) {
    edge_grid.items[grid_offset] &= ~EDGE_LEFTMOST_TILE
}
export function map_property_is_native_land(grid_offset: number) {
    return edge_grid.items[grid_offset] & EDGE_NATIVE_LAND;
}
export function map_property_mark_native_land(grid_offset: number) {
    edge_grid.items[grid_offset] |= EDGE_NATIVE_LAND
}
export function map_property_clear_all_native_land() {
    map_grid_and_u8(edge_grid.items, EDGE_NO_NATIVE_LAND);
}
export function map_property_multi_tile_xy(grid_offset: number) {
    return edge_grid.items[grid_offset] & EDGE_MASK_XY;
}
export function map_property_multi_tile_x(grid_offset: number) {
    return edge_grid.items[grid_offset] & EDGE_MASK_X;
}
export function map_property_multi_tile_y(grid_offset: number) {
    return edge_grid.items[grid_offset] & EDGE_MASK_Y;
}
export function map_property_is_multi_tile_xy(grid_offset: number, x: number, y: number) {
    return (edge_grid.items[grid_offset] & EDGE_MASK_XY) == edge_for(x, y);
}
export function map_property_set_multi_tile_xy(grid_offset: number, x: number, y: number, is_draw_tile: number) {
    if (is_draw_tile) {
        edge_grid.items[grid_offset] = edge_for(x, y) | EDGE_LEFTMOST_TILE;
    } else {
        edge_grid.items[grid_offset] = edge_for(x, y);
    }
}
export function map_property_clear_multi_tile_xy(grid_offset: number) {
    edge_grid.items[grid_offset] &= EDGE_NATIVE_LAND
}
export function map_property_multi_tile_size(grid_offset: number) {
    switch (bitfields_grid.items[grid_offset] & BIT_SIZES) {
        case BIT_SIZE2:
            return 2;
        case BIT_SIZE3:
            return 3;
        case BIT_SIZE4:
            return 4;
        case BIT_SIZE5:
            return 5;
        default: return 1
    }
}
export function map_property_set_multi_tile_size(grid_offset: number, size: number) {
    bitfields_grid.items[grid_offset] &= BIT_NO_SIZES
    switch (size) {
        case 2:
            bitfields_grid.items[grid_offset] |= BIT_SIZE2
            break
        case 3:
            bitfields_grid.items[grid_offset] |= BIT_SIZE3
            break
        case 4:
            bitfields_grid.items[grid_offset] |= BIT_SIZE4
            break
        case 5:
            bitfields_grid.items[grid_offset] |= BIT_SIZE5
            break
    }
}
export function map_property_init_alternate_terrain() {
    let mapWidthRef: { value: number } = { value: 0 };
    let mapHeightRef: { value: number } = { value: 0 };
    map_grid_size(mapWidthRef, mapHeightRef);
    let map_width: number = mapWidthRef.value;
    let map_height: number = mapHeightRef.value;
    for (let y: number = 0; y < map_height; y++) {
        for (let x: number = 0; x < map_width; x++) {
            let grid_offset: number = map_grid_offset(x, y);
            if (map_random_get(grid_offset) & 1) {
                bitfields_grid.items[grid_offset] |= BIT_ALTERNATE_TERRAIN
            }
        }
    }
}
export function map_property_is_alternate_terrain(grid_offset: number) {
    return bitfields_grid.items[grid_offset] & BIT_ALTERNATE_TERRAIN;
}
export function map_property_is_plaza_or_earthquake(grid_offset: number) {
    return bitfields_grid.items[grid_offset] & BIT_PLAZA_OR_EARTHQUAKE;
}
export function map_property_mark_plaza_or_earthquake(grid_offset: number) {
    bitfields_grid.items[grid_offset] |= BIT_PLAZA_OR_EARTHQUAKE
}
export function map_property_clear_plaza_or_earthquake(grid_offset: number) {
    bitfields_grid.items[grid_offset] &= BIT_NO_PLAZA
}
export function map_property_is_constructing(grid_offset: number) {
    return bitfields_grid.items[grid_offset] & BIT_CONSTRUCTION;
}
export function map_property_mark_constructing(grid_offset: number) {
    bitfields_grid.items[grid_offset] |= BIT_CONSTRUCTION
}
export function map_property_clear_constructing(grid_offset: number) {
    bitfields_grid.items[grid_offset] &= BIT_NO_CONSTRUCTION
}
export function map_property_is_deleted(grid_offset: number) {
    return bitfields_grid.items[grid_offset] & BIT_DELETED;
}
export function map_property_mark_deleted(grid_offset: number) {
    bitfields_grid.items[grid_offset] |= BIT_DELETED
}
export function map_property_clear_deleted(grid_offset: number) {
    bitfields_grid.items[grid_offset] &= BIT_NO_DELETED
}
export function map_property_clear_constructing_and_deleted() {
    map_grid_and_u8(bitfields_grid.items, BIT_NO_CONSTRUCTION_AND_DELETED);
}
export function map_property_clear() {
    map_grid_clear_u8(bitfields_grid.items);
    map_grid_clear_u8(edge_grid.items);
}
export function map_property_backup() {
    map_grid_copy_u8(bitfields_grid.items, bitfields_backup.items);
    map_grid_copy_u8(edge_grid.items, edge_backup.items);
}
export function map_property_restore() {
    map_grid_copy_u8(bitfields_backup.items, bitfields_grid.items);
    map_grid_copy_u8(edge_backup.items, edge_grid.items);
}
export function map_property_save_state(bitfields: buffer, edge: buffer) {
    map_grid_save_state_u8(bitfields_grid.items, bitfields);
    map_grid_save_state_u8(edge_grid.items, edge);
}
export function map_property_load_state(bitfields: buffer, edge: buffer) {
    map_grid_load_state_u8(bitfields_grid.items, bitfields);
    map_grid_load_state_u8(edge_grid.items, edge);
}
