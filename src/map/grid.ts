export const OFFSET = 0;
;
import { buffer } from 'core/buffer';
import { buffer_write_u16 } from 'core/buffer';
import { buffer_write_raw } from 'core/buffer';
import { buffer_read_u16 } from 'core/buffer';
import { buffer_read_raw } from 'core/buffer';
import { GRID } from 'map/grid';
import GRID_SIZE = GRID.GRID_SIZE;
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
export let map_data: map_data_t = new map_data_t();
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
export let map_data: map_data_t = new map_data_t();
let DIRECTION_DELTA: number[] = new Array().fill({
    - OFFSET(0, 1), OFFSET(1, -1), 1, OFFSET(1, 1), OFFSET(0, 1), OFFSET(-1, 1), -1, -OFFSET(1, 1)
});
let ADJACENT_OFFSETS: number[] = new Array(21).fill({
    { 0},
    { OFFSET(0,- 1), OFFSET(1, 0), OFFSET(0, 1), OFFSET(-1, 0), 0},
{ OFFSET(0, -1), OFFSET(1, -1), OFFSET(2, 0), OFFSET(2, 1), OFFSET(1, 2), OFFSET(0, 2), OFFSET(-1, 1), OFFSET(-1, 0), 0 },
{
    OFFSET(0, -1), OFFSET(1, -1), OFFSET(2, -1),
        OFFSET(3, 0), OFFSET(3, 1), OFFSET(3, 2),
        OFFSET(2, 3), OFFSET(1, 3), OFFSET(0, 3),
        OFFSET(-1, 2), OFFSET(-1, 1), OFFSET(-1, 0), 0
},
{
    OFFSET(0, -1), OFFSET(1, -1), OFFSET(2, -1), OFFSET(3, -1),
        OFFSET(4, 0), OFFSET(4, 1), OFFSET(4, 2), OFFSET(4, 3),
        OFFSET(3, 4), OFFSET(2, 4), OFFSET(1, 4), OFFSET(0, 4),
        OFFSET(-1, 3), OFFSET(-1, 2), OFFSET(-1, 1), OFFSET(-1, 0), 0
},
{
    OFFSET(0, -1), OFFSET(1, -1), OFFSET(2, -1), OFFSET(3, -1), OFFSET(4, -1),
        OFFSET(5, 0), OFFSET(5, 1), OFFSET(5, 2), OFFSET(5, 3), OFFSET(5, 4),
        OFFSET(4, 5), OFFSET(3, 5), OFFSET(2, 5), OFFSET(1, 5), OFFSET(0, 5),
        OFFSET(-1, 4), OFFSET(-1, 3), OFFSET(-1, 2), OFFSET(-1, 1), OFFSET(-1, 0), 0
},
});
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
export function map_grid_size(width: number, height: number) {
    * width = map_data.width;
    * height = map_data.height;
}
export function map_grid_width() {
    return map_data.width;
}
export function map_grid_height() {
    return map_data.height;
}
export function map_grid_bound(x: number, y: number) {
    if (* x < 0) {
        * x = 0;
    }
    if (* y < 0) {
        * y = 0;
    }
    if (* x >= map_data.width) {
        * x = map_data.width - 1;
    }
    if (* y >= map_data.height) {
        * y = map_data.height - 1;
    }
}
export function map_grid_bound_area(x_min: number, y_min: number, x_max: number, y_max: number) {
    if (* x_min < 0) {
        * x_min = 0;
    }
    if (* y_min < 0) {
        * y_min = 0;
    }
    if (* x_max >= map_data.width) {
        * x_max = map_data.width - 1;
    }
    if (* y_max >= map_data.height) {
        * y_max = map_data.height - 1;
    }
}
export function map_grid_get_area(x: number, y: number, size: number, radius: number, x_min: number, y_min: number, x_max: number, y_max: number) {
    * x_min = x - radius;
    * y_min = y - radius;
    * x_max = x + size + radius - 1;
    * y_max = y + size + radius - 1;
    map_grid_bound_area(x_min, y_min, x_max, y_max);
}
export function map_grid_start_end_to_area(x_start: number, y_start: number, x_end: number, y_end: number, x_min: number, y_min: number, x_max: number, y_max: number) {
    if (x_start < x_end) {
        * x_min = x_start;
        * x_max = x_end;
    } else {
        * x_min = x_end;
        * x_max = x_start;
    }
    if (y_start < y_end) {
        * y_min = y_start;
        * y_max = y_end;
    } else {
        * y_min = y_end;
        * y_max = y_start;
    }
    map_grid_bound_area(x_min, y_min, x_max, y_max);
}
export function map_grid_is_inside(x: number, y: number, size: number) {
    return x >= 0 && x + size <= map_data.width && y >= 0 && y + size <= map_data.height;
}
export function map_grid_adjacent_offsets(size: number) {
    return ADJACENT_OFFSETS[size];
}
export function map_grid_clear_i8(grid: number) {
    memset(grid, 0);
}
export function map_grid_clear_u8(grid: number) {
    memset(grid, 0);
}
export function map_grid_clear_u16(grid: number) {
    memset(grid, 0);
}
export function map_grid_clear_i16(grid: number) {
    memset(grid, 0);
}
export function map_grid_init_i8(grid: number, value: number) {
    memset(grid, 0);
}
export function map_grid_and_u8(grid: number, mask: number) {
    for (let i: number = 0; i < GRID_SIZE * GRID_SIZE; i++) {
        grid[i] &= mask
    }
}
export function map_grid_and_u16(grid: number, mask: number) {
    for (let i: number = 0; i < GRID_SIZE * GRID_SIZE; i++) {
        grid[i] &= mask
    }
}
export function map_grid_copy_u8(src: number, dst: number) {
    memcpy(dst, src, GRID_SIZE * GRID_SIZE * sizeof(uint8_t));
}
export function map_grid_copy_u16(src: number, dst: number) {
    memcpy(dst, src, GRID_SIZE * GRID_SIZE * sizeof(uint16_t));
}
export function map_grid_save_state_u8(grid: number, buf: buffer) {
    buffer_write_raw(buf, grid, GRID_SIZE * GRID_SIZE);
}
export function map_grid_save_state_i8(grid: number, buf: buffer) {
    buffer_write_raw(buf, grid, GRID_SIZE * GRID_SIZE);
}
export function map_grid_save_state_u16(grid: number, buf: buffer) {
    for (let i: number = 0; i < GRID_SIZE * GRID_SIZE; i++) {
        buffer_write_u16(buf, grid[i]);
    }
}
export function map_grid_load_state_u8(grid: number, buf: buffer) {
    buffer_read_raw(buf, grid, GRID_SIZE * GRID_SIZE);
}
export function map_grid_load_state_i8(grid: number, buf: buffer) {
    buffer_read_raw(buf, grid, GRID_SIZE * GRID_SIZE);
}
export function map_grid_load_state_u16(grid: number, buf: buffer) {
    for (let i: number = 0; i < GRID_SIZE * GRID_SIZE; i++) {
        grid[i] = buffer_read_u16(buf);
    }
}
