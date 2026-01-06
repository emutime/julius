import { buffer, buffer_read_raw, buffer_read_u16, buffer_write_raw, buffer_write_u16 } from 'core/buffer';
import { Ref } from '../../ext/crt';
import { map_data_t } from './data';
export const enum GRID {
    GRID_SIZE = 162
};
import GRID_SIZE = GRID.GRID_SIZE;

function OFFSET(x: number, y: number) { return x + GRID_SIZE * y }

export class grid_u8 {
    public items: Uint8Array = new Uint8Array(GRID_SIZE * GRID_SIZE);
    public constructor(...args: any[]) {
        args.length >= 1 && (this.items = args[0]);
    }
}
export class grid_i8 {
    public items: Int8Array = new Int8Array(GRID_SIZE * GRID_SIZE);
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
    -OFFSET(0, 1), OFFSET(1, -1), 1, OFFSET(1, 1), OFFSET(0, 1), OFFSET(-1, 1), -1, -OFFSET(1, 1)
];
let ADJACENT_OFFSETS: number[][] = [
    [0],
    [OFFSET(0, - 1), OFFSET(1, 0), OFFSET(0, 1), OFFSET(-1, 0), 0],
    [OFFSET(0, -1), OFFSET(1, -1), OFFSET(2, 0), OFFSET(2, 1), OFFSET(1, 2), OFFSET(0, 2), OFFSET(-1, 1), OFFSET(-1, 0), 0],
    [
        OFFSET(0, -1), OFFSET(1, -1), OFFSET(2, -1),
        OFFSET(3, 0), OFFSET(3, 1), OFFSET(3, 2),
        OFFSET(2, 3), OFFSET(1, 3), OFFSET(0, 3),
        OFFSET(-1, 2), OFFSET(-1, 1), OFFSET(-1, 0), 0
    ],
    [
        OFFSET(0, -1), OFFSET(1, -1), OFFSET(2, -1), OFFSET(3, -1),
        OFFSET(4, 0), OFFSET(4, 1), OFFSET(4, 2), OFFSET(4, 3),
        OFFSET(3, 4), OFFSET(2, 4), OFFSET(1, 4), OFFSET(0, 4),
        OFFSET(-1, 3), OFFSET(-1, 2), OFFSET(-1, 1), OFFSET(-1, 0), 0
    ],
    [
        OFFSET(0, -1), OFFSET(1, -1), OFFSET(2, -1), OFFSET(3, -1), OFFSET(4, -1),
        OFFSET(5, 0), OFFSET(5, 1), OFFSET(5, 2), OFFSET(5, 3), OFFSET(5, 4),
        OFFSET(4, 5), OFFSET(3, 5), OFFSET(2, 5), OFFSET(1, 5), OFFSET(0, 5),
        OFFSET(-1, 4), OFFSET(-1, 3), OFFSET(-1, 2), OFFSET(-1, 1), OFFSET(-1, 0), 0
    ],
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
export function map_grid_size(widthRef: Ref<number>, heightRef: Ref<number>) {
    widthRef.v = map_data.width;
    heightRef.v = map_data.height;
}
export function map_grid_width() {
    return map_data.width;
}
export function map_grid_height() {
    return map_data.height;
}
export function map_grid_bound(xRef: Ref<number>, yRef: Ref<number>) {
    if (xRef.v < 0) {
        xRef.v = 0;
    }
    if (yRef.v < 0) {
        yRef.v = 0;
    }
    if (xRef.v >= map_data.width) {
        xRef.v = map_data.width - 1;
    }
    if (yRef.v >= map_data.height) {
        yRef.v = map_data.height - 1;
    }
}
export function map_grid_bound_area(xMinRef: Ref<number>, yMinRef: Ref<number>, xMaxRef: Ref<number>, yMaxRef: Ref<number>) {
    if (xMinRef.v < 0) {
        xMinRef.v = 0;
    }
    if (yMinRef.v < 0) {
        yMinRef.v = 0;
    }
    if (xMaxRef.v >= map_data.width) {
        xMaxRef.v = map_data.width - 1;
    }
    if (yMaxRef.v >= map_data.height) {
        yMaxRef.v = map_data.height - 1;
    }
}
export function map_grid_get_area(x: number, y: number, size: number, radius: number, xMinRef: Ref<number>, yMinRef: Ref<number>, xMaxRef: Ref<number>, yMaxRef: Ref<number>) {
    xMinRef.v = x - radius;
    yMinRef.v = y - radius;
    xMaxRef.v = x + size + radius - 1;
    yMaxRef.v = y + size + radius - 1;
    map_grid_bound_area(xMinRef, yMinRef, xMaxRef, yMaxRef);
}
export function map_grid_start_end_to_area(x_start: number, y_start: number, x_end: number, y_end: number, xMinRef: Ref<number>, yMinRef: Ref<number>, xMaxRef: Ref<number>, yMaxRef: Ref<number>) {
    if (x_start < x_end) {
        xMinRef.v = x_start;
        xMaxRef.v = x_end;
    } else {
        xMinRef.v = x_end;
        xMaxRef.v = x_start;
    }
    if (y_start < y_end) {
        yMinRef.v = y_start;
        yMaxRef.v = y_end;
    } else {
        yMinRef.v = y_end;
        yMaxRef.v = y_start;
    }
    map_grid_bound_area(xMinRef, yMinRef, xMaxRef, yMaxRef);
}
export function map_grid_is_inside(x: number, y: number, size: number) {
    return x >= 0 && x + size <= map_data.width && y >= 0 && y + size <= map_data.height;
}
export function map_grid_adjacent_offsets(size: number) {
    return ADJACENT_OFFSETS[size];
}
export function map_grid_clear_i8(grid: Int8Array) {
    grid.fill(0);
}
export function map_grid_clear_u8(grid: Uint8Array) {
    grid.fill(0);
}
export function map_grid_clear_u16(grid: Uint16Array) {
    grid.fill(0);
}
export function map_grid_clear_i16(grid: Int16Array) {
    grid.fill(0);
}
export function map_grid_init_i8(grid: Int8Array, value: number) {
    for (let i: number = 0; i < grid.length; i++) {
        grid[i] = 0;
    }
}
export function map_grid_and_u8(grid: Uint8Array, mask: number) {
    for (let i: number = 0; i < GRID_SIZE * GRID_SIZE; i++) {
        grid[i] &= mask
    }
}
export function map_grid_and_u16(grid: number[], mask: number) {
    for (let i: number = 0; i < GRID_SIZE * GRID_SIZE; i++) {
        grid[i] &= mask
    }
}
export function map_grid_copy_u8(src: Uint8Array, dst: Uint8Array) {
    for (let i: number = 0; i < GRID_SIZE * GRID_SIZE; i++) {
        dst[i] = src[i];
    }
}
export function map_grid_copy_u16(src: Uint16Array, dst: Uint16Array) {
    for (let i: number = 0; i < GRID_SIZE * GRID_SIZE; i++) {
        dst[i] = src[i];
    }
}
export function map_grid_save_state_u8(grid: Uint8Array, buf: buffer) {
    buffer_write_raw(buf, grid, GRID_SIZE * GRID_SIZE);
}
export function map_grid_save_state_i8(grid: Uint8Array, buf: buffer) {
    buffer_write_raw(buf, grid, GRID_SIZE * GRID_SIZE);
}
export function map_grid_save_state_u16(grid: number[], buf: buffer) {
    for (let i: number = 0; i < GRID_SIZE * GRID_SIZE; i++) {
        buffer_write_u16(buf, grid[i]);
    }
}
export function map_grid_load_state_u8(grid: Uint8Array, buf: buffer) {
    buffer_read_raw(buf, grid, GRID_SIZE * GRID_SIZE);
}
export function map_grid_load_state_i8(grid: Uint8Array, buf: buffer) {
    buffer_read_raw(buf, grid, GRID_SIZE * GRID_SIZE);
}
export function map_grid_load_state_u16(grid: number[], buf: buffer) {
    for (let i: number = 0; i < GRID_SIZE * GRID_SIZE; i++) {
        grid[i] = buffer_read_u16(buf);
    }
}
