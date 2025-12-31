export const OFFSET = 0;
import { buffer } from 'core/buffer';
import { buffer_write_u16 } from 'core/buffer';
import { buffer_write_raw } from 'core/buffer';
import { buffer_read_u16 } from 'core/buffer';
import { buffer_read_raw } from 'core/buffer';
export const enum GRID {
    GRID_SIZE = 162
};
import GRID_SIZE = GRID.GRID_SIZE;
import { map_data_t } from './data';
export class grid_u8 {
    public items: number[] = new Array(GRID_SIZE * GRID_SIZE).fill(0);
    public constructor(...args: any[]) {
        args.length >= 1 && (this.items = args[0]);
    }
}
export class grid_i8 {
    public items: number[] = new Array(GRID_SIZE * GRID_SIZE).fill(0);
    public constructor(...args: any[]) {
        args.length >= 1 && (this.items = args[0]);
    }
}
export class grid_u16 {
    public items: number[] = new Array(GRID_SIZE * GRID_SIZE).fill(0);
    public constructor(...args: any[]) {
        args.length >= 1 && (this.items = args[0]);
    }
}
export class grid_i16 {
    public items: number[] = new Array(GRID_SIZE * GRID_SIZE).fill(0);
    public constructor(...args: any[]) {
        args.length >= 1 && (this.items = args[0]);
    }
}
export const map_data = new map_data_t();
let DIRECTION_DELTA: number[] = [
    - map_grid_delta(0, 1), map_grid_delta(1, -1), 1, map_grid_delta(1, 1),
    map_grid_delta(0, 1), map_grid_delta(-1, 1), -1, -map_grid_delta(1, 1)
];
let ADJACENT_OFFSETS: number[] = [
    { 0},
    { map_grid_delta(0,- 1), map_grid_delta(1, 0), map_grid_delta(0, 1), map_grid_delta(-1, 0), 0},
{ map_grid_delta(0, -1), map_grid_delta(1, -1), map_grid_delta(2, 0), map_grid_delta(2, 1), map_grid_delta(1, 2), map_grid_delta(0, 2), map_grid_delta(-1, 1), map_grid_delta(-1, 0), 0 },
{
    map_grid_delta(0, -1), map_grid_delta(1, -1), map_grid_delta(2, -1),
        map_grid_delta(3, 0), map_grid_delta(3, 1), map_grid_delta(3, 2),
        map_grid_delta(2, 3), map_grid_delta(1, 3), map_grid_delta(0, 3),
        map_grid_delta(-1, 2), map_grid_delta(-1, 1), map_grid_delta(-1, 0), 0
},
{
    map_grid_delta(0, -1), map_grid_delta(1, -1), map_grid_delta(2, -1), map_grid_delta(3, -1),
        map_grid_delta(4, 0), map_grid_delta(4, 1), map_grid_delta(4, 2), map_grid_delta(4, 3),
        map_grid_delta(3, 4), map_grid_delta(2, 4), map_grid_delta(1, 4), map_grid_delta(0, 4),
        map_grid_delta(-1, 3), map_grid_delta(-1, 2), map_grid_delta(-1, 1), map_grid_delta(-1, 0), 0
},
{
    map_grid_delta(0, -1), map_grid_delta(1, -1), map_grid_delta(2, -1), map_grid_delta(3, -1), map_grid_delta(4, -1),
        map_grid_delta(5, 0), map_grid_delta(5, 1), map_grid_delta(5, 2), map_grid_delta(5, 3), map_grid_delta(5, 4),
        map_grid_delta(4, 5), map_grid_delta(3, 5), map_grid_delta(2, 5), map_grid_delta(1, 5), map_grid_delta(0, 5),
        map_grid_delta(-1, 4), map_grid_delta(-1, 3), map_grid_delta(-1, 2), map_grid_delta(-1, 1), map_grid_delta(-1, 0), 0
},
];
export function map_grid_init(width: number, height: number, start_offset: number, border_size: number) {
    map_data.width = width;
    map_data.height = height;
    map_data.start_offset = start_offset;
    map_data.border_size = border_size;
}
export function map_grid_is_valid_offset(grid_offset: number) {
    return grid_offset >= 0 && grid_offset < GRID_SIZE * GRID_SIZE;
}
export function map_grid_offset(x: number, y: number) {
    return map_data.start_offset + x + y * GRID_SIZE;
}
export function map_grid_offset_to_x(grid_offset: number) {
    return (grid_offset - map_data.start_offset) % GRID_SIZE;
}
export function map_grid_offset_to_y(grid_offset: number) {
    return (grid_offset - map_data.start_offset) / GRID_SIZE;
}
export function map_grid_delta(x: number, y: number) {
    return y * GRID_SIZE + x;
}
export function map_grid_add_delta(grid_offset: number, x: number, y: number) {
    let raw_x: number = grid_offset % GRID_SIZE;
    let raw_y: number = grid_offset / GRID_SIZE;
    if (raw_x + x < 0 || raw_x + x >= GRID_SIZE ||
        raw_y + y < 0 || raw_y + y >= GRID_SIZE) {
        return -1;
    }
    return grid_offset + map_grid_delta(x, y);
}
export function map_grid_direction_delta(direction: number) {
    if (direction >= 0 && direction < 8) {
        return DIRECTION_DELTA[direction];
    } else {
        return 0;
    }
}
export function map_grid_size(widthRef: { value: number }, heightRef: { value: number }) {
    widthRef.value = map_data.width;
    heightRef.value = map_data.height;
}
export function map_grid_width() {
    return map_data.width;
}
export function map_grid_height() {
    return map_data.height;
}
export function map_grid_bound(xRef: { value: number }, yRef: { value: number }) {
    if (xRef.value < 0) {
        xRef.value = 0;
    }
    if (yRef.value < 0) {
        yRef.value = 0;
    }
    if (xRef.value >= map_data.width) {
        xRef.value = map_data.width - 1;
    }
    if (yRef.value >= map_data.height) {
        yRef.value = map_data.height - 1;
    }
}
export function map_grid_bound_area(xMinRef: { value: number }, yMinRef: { value: number }, xMaxRef: { value: number }, yMaxRef: { value: number }) {
    if (xMinRef.value < 0) {
        xMinRef.value = 0;
    }
    if (yMinRef.value < 0) {
        yMinRef.value = 0;
    }
    if (xMaxRef.value >= map_data.width) {
        xMaxRef.value = map_data.width - 1;
    }
    if (yMaxRef.value >= map_data.height) {
        yMaxRef.value = map_data.height - 1;
    }
}
export function map_grid_get_area(x: number, y: number, size: number, radius: number, xMinRef: { value: number }, yMinRef: { value: number }, xMaxRef: { value: number }, yMaxRef: { value: number }) {
    xMinRef.value = x - radius;
    yMinRef.value = y - radius;
    xMaxRef.value = x + size + radius - 1;
    yMaxRef.value = y + size + radius - 1;
    map_grid_bound_area(xMinRef, yMinRef, xMaxRef, yMaxRef);
}
export function map_grid_start_end_to_area(x_start: number, y_start: number, x_end: number, y_end: number, xMinRef: { value: number }, yMinRef: { value: number }, xMaxRef: { value: number }, yMaxRef: { value: number }) {
    if (x_start < x_end) {
        xMinRef.value = x_start;
        xMaxRef.value = x_end;
    } else {
        xMinRef.value = x_end;
        xMaxRef.value = x_start;
    }
    if (y_start < y_end) {
        yMinRef.value = y_start;
        yMaxRef.value = y_end;
    } else {
        yMinRef.value = y_end;
        yMaxRef.value = y_start;
    }
    map_grid_bound_area(xMinRef, yMinRef, xMaxRef, yMaxRef);
}
export function map_grid_is_inside(x: number, y: number, size: number) {
    return x >= 0 && x + size <= map_data.width && y >= 0 && y + size <= map_data.height;
}
export function map_grid_adjacent_offsets(size: number) {
    return ADJACENT_OFFSETS[size];
}
export function map_grid_clear_i8(grid: number[]) {
    for (let i: number = 0; i < grid.length; i++) {
        grid[i] = 0;
    }
}
export function map_grid_clear_u8(grid: number[]) {
    for (let i: number = 0; i < grid.length; i++) {
        grid[i] = 0;
    }
}
export function map_grid_clear_u16(grid: number[]) {
    for (let i: number = 0; i < grid.length; i++) {
        grid[i] = 0;
    }
}
export function map_grid_clear_i16(grid: number[]) {
    for (let i: number = 0; i < grid.length; i++) {
        grid[i] = 0;
    }
}
export function map_grid_init_i8(grid: number[], value: number) {
    for (let i: number = 0; i < grid.length; i++) {
        grid[i] = 0;
    }
}
export function map_grid_and_u8(grid: number[], mask: number) {
    for (let i: number = 0; i < GRID_SIZE * GRID_SIZE; i++) {
        grid[i] &= mask
    }
}
export function map_grid_and_u16(grid: number[], mask: number) {
    for (let i: number = 0; i < GRID_SIZE * GRID_SIZE; i++) {
        grid[i] &= mask
    }
}
export function map_grid_copy_u8(src: number[], dst: number[]) {
    for (let i: number = 0; i < GRID_SIZE * GRID_SIZE; i++) {
        dst[i] = src[i];
    }
}
export function map_grid_copy_u16(src: number[], dst: number[]) {
    for (let i: number = 0; i < GRID_SIZE * GRID_SIZE; i++) {
        dst[i] = src[i];
    }
}
export function map_grid_save_state_u8(grid: number[], buf: buffer) {
    buffer_write_raw(buf, grid, GRID_SIZE * GRID_SIZE);
}
export function map_grid_save_state_i8(grid: number[], buf: buffer) {
    buffer_write_raw(buf, grid, GRID_SIZE * GRID_SIZE);
}
export function map_grid_save_state_u16(grid: number[], buf: buffer) {
    for (let i: number = 0; i < GRID_SIZE * GRID_SIZE; i++) {
        buffer_write_u16(buf, grid[i]);
    }
}
export function map_grid_load_state_u8(grid: number[], buf: buffer) {
    buffer_read_raw(buf, grid, GRID_SIZE * GRID_SIZE);
}
export function map_grid_load_state_i8(grid: number[], buf: buffer) {
    buffer_read_raw(buf, grid, GRID_SIZE * GRID_SIZE);
}
export function map_grid_load_state_u16(grid: number[], buf: buffer) {
    for (let i: number = 0; i < GRID_SIZE * GRID_SIZE; i++) {
        grid[i] = buffer_read_u16(buf);
    }
}
