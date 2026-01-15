export const VIEW_X_MAX = 165;
export const VIEW_Y_MAX = 325;
export const TILE_WIDTH_PIXELS = 60;
export const TILE_HEIGHT_PIXELS = 30;
export const HALF_TILE_HEIGHT_PIXELS = 15;
export const HALF_TILE_WIDTH_PIXELS = 30;
import { buffer, buffer_read_i32, buffer_write_i32 } from 'core/buffer';
import { TOP_MENU_HEIGHT } from 'graphics/menu';

export class pixel_offset {
    public x: number = 0;
    public y: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.x = args[0]);
        args.length >= 2 && (this.y = args[1]);
    }
}
export type view_tile = pixel_offset;

import { direction_type } from 'core/direction';
import { GRID, map_grid_add_delta, map_grid_delta, map_grid_height, map_grid_width } from 'map/grid';
import { map_image_at } from 'map/image';
import { widget_minimap_invalidate } from 'widget/minimap';
import { Ref } from '../../ext/crt';
import DIR_0_TOP = direction_type.DIR_0_TOP;
import DIR_2_RIGHT = direction_type.DIR_2_RIGHT;
import DIR_4_BOTTOM = direction_type.DIR_4_BOTTOM;
import DIR_6_LEFT = direction_type.DIR_6_LEFT;
import DIR_8_NONE = direction_type.DIR_8_NONE;
import GRID_SIZE = GRID.GRID_SIZE;
export type map_callback = (x: number, y: number, grid_offset: number) => void;
let X_DIRECTION_FOR_ORIENTATION: number[] = [1, 1, - 1, -1];
let Y_DIRECTION_FOR_ORIENTATION: number[] = [1, - 1, -1, 1];
class camera {
    public tile: view_tile = null;
    public pixel: pixel_offset = null;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.tile = args[0]);
        args.length >= 2 && (this.pixel = args[1]);
    }
}
class viewport {
    public x: number = 0;
    public y: number = 0;
    public width_pixels: number = 0;
    public height_pixels: number = 0;
    public width_tiles: number = 0;
    public height_tiles: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.x = args[0]);
        args.length >= 2 && (this.y = args[1]);
        args.length >= 3 && (this.width_pixels = args[2]);
        args.length >= 4 && (this.height_pixels = args[3]);
        args.length >= 5 && (this.width_tiles = args[4]);
        args.length >= 6 && (this.height_tiles = args[5]);
    }
}
class selected_tile {
    public x_pixels: number = 0;
    public y_pixels: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.x_pixels = args[0]);
        args.length >= 2 && (this.y_pixels = args[1]);
    }
}
export class unnamed17_8 {
    public screen_width: number = 0;
    public screen_height: number = 0;
    public sidebar_collapsed: number = 0;
    public orientation: number = 0;
    public camera: camera = null;
    public viewport: viewport = null;
    public selected_tile: selected_tile = null;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.screen_width = args[0]);
        args.length >= 2 && (this.screen_height = args[1]);
        args.length >= 3 && (this.sidebar_collapsed = args[2]);
        args.length >= 4 && (this.orientation = args[3]);
        args.length >= 5 && (this.camera = args[4]);
        args.length >= 6 && (this.viewport = args[5]);
        args.length >= 7 && (this.selected_tile = args[6]);
    }
}
let data: unnamed17_8 = new unnamed17_8();
let view_to_grid_offset_lookup: number[] = new Array(VIEW_X_MAX);
function check_camera_boundaries() {
    let x_min: number = (VIEW_X_MAX - map_grid_width()) / 2;
    let y_min: number = (VIEW_Y_MAX - 2 * map_grid_height()) / 2;
    if (data.camera.tile.x < x_min - 1) {
        data.camera.tile.x = x_min - 1;
        data.camera.pixel.x = 0;
    }
    if (data.camera.tile.x >= VIEW_X_MAX - x_min - data.viewport.width_tiles) {
        data.camera.tile.x = VIEW_X_MAX - x_min - data.viewport.width_tiles;
        data.camera.pixel.x = 0;
    }
    if (data.camera.tile.y < y_min - 2) {
        data.camera.tile.y = y_min - 1;
        data.camera.pixel.y = 0;
    }
    if (data.camera.tile.y >= ((VIEW_Y_MAX - y_min - data.viewport.height_tiles) & ~1)) {
        data.camera.tile.y = VIEW_Y_MAX - y_min - data.viewport.height_tiles;
        data.camera.pixel.y = 0;
    }
    data.camera.tile.y &= ~1
}
function reset_lookup() {
    for (let y: number = 0; y < VIEW_Y_MAX; y++) {
        for (let x: number = 0; x < VIEW_X_MAX; x++) {
            view_to_grid_offset_lookup[x][y] = -1;
        }
    }
}
function calculate_lookup() {
    reset_lookup();
    let y_view_start: number;
    let y_view_skip: number;
    let y_view_step: number;
    let x_view_start: number;
    let x_view_skip: number;
    let x_view_step: number;
    switch (data.orientation) {
        default:
        case DIR_0_TOP:
            x_view_start = VIEW_X_MAX - 1
            x_view_skip = -1;
            x_view_step = 1;
            y_view_start = 1;
            y_view_skip = 1;
            y_view_step = 1;
            break
        case DIR_2_RIGHT:
            x_view_start = 3;
            x_view_skip = 1;
            x_view_step = 1;
            y_view_start = VIEW_X_MAX - 3;
            y_view_skip = 1;
            y_view_step = -1;
            break
        case DIR_4_BOTTOM:
            x_view_start = VIEW_X_MAX - 1;
            x_view_skip = 1;
            x_view_step = -1;
            y_view_start = VIEW_Y_MAX - 2;
            y_view_skip = -1;
            y_view_step = -1;
            break
        case DIR_6_LEFT:
            x_view_start = VIEW_Y_MAX;
            x_view_skip = -1;
            x_view_step = -1;
            y_view_start = VIEW_X_MAX - 3;
            y_view_skip = -1;
            y_view_step = 1;
            break
    }
    for (let y: number = 0; y < GRID_SIZE; y++) {
        let x_view: number = x_view_start;
        let y_view: number = y_view_start;
        for (let x: number = 0; x < GRID_SIZE; x++) {
            let grid_offset: number = x + GRID_SIZE * y;
            if (map_image_at(grid_offset) < 6) {
                view_to_grid_offset_lookup[x_view / 2][y_view] = -1;
            } else {
                view_to_grid_offset_lookup[x_view / 2][y_view] = grid_offset;
            }
            x_view += x_view_step
            y_view += y_view_step
        }
        x_view_start += x_view_skip
        y_view_start += y_view_skip
    }
}
function adjust_camera_position_for_pixels() {
    while (data.camera.pixel.x < 0) {
        data.camera.tile.x--;
        data.camera.pixel.x += TILE_WIDTH_PIXELS;
    }
    while (data.camera.pixel.y < 0) {
        data.camera.tile.y -= 2;
        data.camera.pixel.y += TILE_HEIGHT_PIXELS;
    }
    while (data.camera.pixel.x >= TILE_WIDTH_PIXELS) {
        data.camera.tile.x++;
        data.camera.pixel.x -= TILE_WIDTH_PIXELS;
    }
    while (data.camera.pixel.y >= TILE_HEIGHT_PIXELS) {
        data.camera.tile.y += 2;
        data.camera.pixel.y -= TILE_HEIGHT_PIXELS;
    }
}
export function city_view_init() {
    calculate_lookup();
    check_camera_boundaries();
    widget_minimap_invalidate();
}
export function city_view_orientation() {
    return data.orientation;
}
export function city_view_reset_orientation() {
    data.orientation = 0;
    calculate_lookup();
}
export function city_view_get_camera(x: Ref<number>, y: Ref<number>) {
    x.v = data.camera.tile.x;
    y.v = data.camera.tile.y;
}
export function city_view_get_pixel_offset(x: Ref<number>, y: Ref<number>) {
    x.v = data.camera.pixel.x;
    y.v = data.camera.pixel.y;
}
export function city_view_get_camera_in_pixels(x: Ref<number>, y: Ref<number>) {
    x.v = data.camera.tile.x * TILE_WIDTH_PIXELS + data.camera.pixel.x;
    y.v = data.camera.tile.y * HALF_TILE_HEIGHT_PIXELS + data.camera.pixel.y;
}
function adjust_for_orientation(x: number, y: number, orientation: number, x_out: Ref<number>, y_out: Ref<number>) {
    switch (orientation) {
        default:
        case DIR_0_TOP:
            x_out.v = x
            y_out.v = y;
            break
        case DIR_2_RIGHT:
            x_out.v = y / 2;
            y_out.v = (VIEW_X_MAX - x) * 2;
            break
        case DIR_4_BOTTOM:
            x_out.v = VIEW_X_MAX - x;
            y_out.v = VIEW_Y_MAX - y;
            break
        case DIR_6_LEFT:
            x_out.v = (VIEW_Y_MAX - y) / 2;
            y_out.v = x * 2;
            break
    }
}
export function city_view_get_camera_absolute(x_abs: Ref<number>, y_abs: Ref<number>) {
    let x_offset: number = data.viewport.width_tiles / 2;
    let y_offset: number = data.viewport.height_tiles / 2;
    let x_center: number = data.camera.tile.x + x_offset;
    let y_center: number = data.camera.tile.y + y_offset;
    let x_center_abs: Ref<number> = new Ref<number>(0);
    let y_center_abs: Ref<number> = new Ref<number>(0);
    let to_rotate: number = (DIR_8_NONE - data.orientation) % DIR_8_NONE;
    adjust_for_orientation(x_center, y_center, to_rotate, x_center_abs, y_center_abs);
    x_abs.v = x_center_abs.v - x_offset;
    y_abs.v = y_center_abs.v - y_offset;
}
export function city_view_set_camera(x: number, y: number) {
    data.camera.tile.x = x;
    data.camera.tile.y = y;
    check_camera_boundaries();
}
export function city_view_set_camera_absolute(x_abs: number, y_abs: number) {
    let x_offset: number = data.viewport.width_tiles / 2;
    let y_offset: number = data.viewport.height_tiles / 2;
    let x_center_abs: number = x_abs + x_offset;
    let y_center_abs: number = y_abs + y_offset;
    let x_center: Ref<number> = new Ref<number>(0);
    let y_center: Ref<number> = new Ref<number>(0);
    adjust_for_orientation(x_center_abs, y_center_abs, data.orientation, x_center, y_center);
    city_view_set_camera(x_center.v - x_offset, y_center.v - y_offset);
}
export function city_view_set_camera_from_pixel_position(x: number, y: number) {
    x = x < 0 ? 0 : x;
    y = y < 0 ? 0 : y;
    data.camera.tile.x = x / TILE_WIDTH_PIXELS;
    data.camera.tile.y = y / HALF_TILE_HEIGHT_PIXELS;
    data.camera.pixel.x = x % TILE_WIDTH_PIXELS;
    data.camera.pixel.y = y % TILE_HEIGHT_PIXELS;
    check_camera_boundaries();
}
export function city_view_scroll(x: number, y: number) {
    data.camera.pixel.x += x
    data.camera.pixel.y += y
    adjust_camera_position_for_pixels();
    check_camera_boundaries();
}
export function city_view_grid_offset_to_xy_view(grid_offset: number, x_view: Ref<number>, y_view: Ref<number>) {
    x_view.v = y_view.v = 0;
    for (let y: number = 0; y < VIEW_Y_MAX; y++) {
        for (let x: number = 0; x < VIEW_X_MAX; x++) {
            if (view_to_grid_offset_lookup[x][y] == grid_offset) {
                x_view.v = x;
                y_view.v = y;
                return;
            }
        }
    }
}
export function city_view_get_selected_tile_pixels(x_pixels: Ref<number>, y_pixels: Ref<number>) {
    x_pixels.v = data.selected_tile.x_pixels;
    y_pixels.v = data.selected_tile.y_pixels;
}
export function city_view_pixels_to_view_tile(x_pixels: number, y_pixels: number, tile: view_tile) {
    if (x_pixels < data.viewport.x ||
        x_pixels >= data.viewport.x + data.viewport.width_pixels ||
        y_pixels < data.viewport.y ||
        y_pixels >= data.viewport.y + data.viewport.height_pixels) {
        return 0;
    }
    x_pixels += data.camera.pixel.x
    y_pixels += data.camera.pixel.y
    let odd: number = ((x_pixels - data.viewport.x) / HALF_TILE_WIDTH_PIXELS +
        (y_pixels - data.viewport.y) / HALF_TILE_HEIGHT_PIXELS) & 1;
    let x_is_odd: number = ((x_pixels - data.viewport.x) / HALF_TILE_WIDTH_PIXELS) & 1;
    let y_is_odd: number = ((y_pixels - data.viewport.y) / HALF_TILE_HEIGHT_PIXELS) & 1;
    let x_mod: number = ((x_pixels - data.viewport.x) % HALF_TILE_WIDTH_PIXELS) / 2;
    let y_mod: number = (y_pixels - data.viewport.y) % HALF_TILE_HEIGHT_PIXELS;
    let x_view_offset: number = (x_pixels - data.viewport.x) / TILE_WIDTH_PIXELS;
    let y_view_offset: number = (y_pixels - data.viewport.y) / HALF_TILE_HEIGHT_PIXELS;
    if (odd) {
        if (x_mod + y_mod >= HALF_TILE_HEIGHT_PIXELS - 1) {
            y_view_offset++;
            if (x_is_odd && !y_is_odd) {
                x_view_offset++;
            }
        }
    } else {
        if (y_mod > x_mod) {
            y_view_offset++;
        } else if (x_is_odd && y_is_odd) {
            x_view_offset++;
        }
    }
    tile.x = data.camera.tile.x + x_view_offset;
    tile.y = data.camera.tile.y + y_view_offset;
    return 1;
}
export function city_view_set_selected_view_tile(tile: view_tile) {
    let x_view_offset: number = tile.x - data.camera.tile.x;
    let y_view_offset: number = tile.y - data.camera.tile.y;
    data.selected_tile.x_pixels = data.viewport.x + TILE_WIDTH_PIXELS * x_view_offset - data.camera.pixel.x;
    if (y_view_offset & 1) {
        data.selected_tile.x_pixels -= HALF_TILE_WIDTH_PIXELS
    }
    data.selected_tile.y_pixels = data.viewport.y + HALF_TILE_HEIGHT_PIXELS * y_view_offset
        - HALF_TILE_HEIGHT_PIXELS - data.camera.pixel.y;
}
export function city_view_tile_to_grid_offset(tile: view_tile) {
    let grid_offset: number = view_to_grid_offset_lookup[tile.x][tile.y];
    return grid_offset < 0 ? 0 : grid_offset;
}
export function city_view_go_to_grid_offset(grid_offset: number) {
    let x: number
    let y: number;
    let x_ref: Ref<number> = new Ref<number>(0);
    let y_ref: Ref<number> = new Ref<number>(0);
    city_view_grid_offset_to_xy_view(grid_offset, x_ref, y_ref);
    x = x_ref.v;
    y = y_ref.v;
    data.camera.tile.x = x - data.viewport.width_tiles / 2;
    data.camera.tile.y = y - data.viewport.height_tiles / 2;
    data.camera.tile.y &= ~1
    check_camera_boundaries();
}
function get_center_grid_offset() {
    let x_center: number = data.camera.tile.x + data.viewport.width_tiles / 2;
    let y_center: number = data.camera.tile.y + data.viewport.height_tiles / 2;
    return view_to_grid_offset_lookup[x_center][y_center];
}
export function city_view_rotate_left() {
    let center_grid_offset: number = get_center_grid_offset();
    data.orientation += 2
    if (data.orientation > 6) {
        data.orientation = DIR_0_TOP;
    }
    calculate_lookup();
    if (center_grid_offset >= 0) {
        let x: number
        let y: number;
        let x_ref: Ref<number> = new Ref<number>(0);
        let y_ref: Ref<number> = new Ref<number>(0);
        city_view_grid_offset_to_xy_view(center_grid_offset, x_ref, y_ref);
        x = x_ref.v;
        y = y_ref.v;
        data.camera.tile.x = x - data.viewport.width_tiles / 2;
        data.camera.tile.y = y - data.viewport.height_tiles / 2;
    }
    check_camera_boundaries();
}
export function city_view_rotate_right() {
    let center_grid_offset: number = get_center_grid_offset();
    data.orientation -= 2
    if (data.orientation < 0) {
        data.orientation = DIR_6_LEFT;
    }
    calculate_lookup();
    if (center_grid_offset >= 0) {
        let x: Ref<number> = new Ref<number>(0);
        let y: Ref<number> = new Ref<number>(0);
        city_view_grid_offset_to_xy_view(center_grid_offset, x, y);
        data.camera.tile.x = x.v - data.viewport.width_tiles / 2;
        data.camera.tile.y = y.v - data.viewport.height_tiles / 2;
    }
    check_camera_boundaries();
}
function set_viewport(x_offset: number, y_offset: number, width: number, height: number) {
    data.viewport.x = x_offset;
    data.viewport.y = y_offset;
    data.viewport.width_pixels = width - 2;
    data.viewport.height_pixels = height;
    data.viewport.width_tiles = width / TILE_WIDTH_PIXELS;
    data.viewport.height_tiles = height / HALF_TILE_HEIGHT_PIXELS;
}
function set_viewport_with_sidebar() {
    set_viewport(0, TOP_MENU_HEIGHT, data.screen_width - 160, data.screen_height - TOP_MENU_HEIGHT);
}
function set_viewport_without_sidebar() {
    set_viewport(0, TOP_MENU_HEIGHT, data.screen_width - 40, data.screen_height - TOP_MENU_HEIGHT);
}
export function city_view_set_viewport(screen_width: number, screen_height: number) {
    data.screen_width = screen_width;
    data.screen_height = screen_height;
    if (data.sidebar_collapsed) {
        set_viewport_without_sidebar();
    } else {
        set_viewport_with_sidebar();
    }
    check_camera_boundaries();
}
export function city_view_get_viewport(x: Ref<number>, y: Ref<number>, width: Ref<number>, height: Ref<number>) {
    x.v = data.viewport.x;
    y.v = data.viewport.y;
    width.v = data.viewport.width_pixels;
    height.v = data.viewport.height_pixels;
}
export function city_view_get_viewport_size_tiles(width: Ref<number>, height: Ref<number>) {
    width.v = data.viewport.width_tiles;
    height.v = data.viewport.height_tiles;
}
export function city_view_is_sidebar_collapsed() {
    return data.sidebar_collapsed;
}
export function city_view_start_sidebar_toggle() {
    set_viewport_without_sidebar();
    check_camera_boundaries();
}
export function city_view_toggle_sidebar() {
    if (data.sidebar_collapsed) {
        data.sidebar_collapsed = 0;
        set_viewport_with_sidebar();
    } else {
        data.sidebar_collapsed = 1;
        set_viewport_without_sidebar();
    }
    check_camera_boundaries();
}
export function city_view_save_state(orientation: buffer, camera: buffer) {
    buffer_write_i32(orientation, data.orientation);
    buffer_write_i32(camera, data.camera.tile.x);
    buffer_write_i32(camera, data.camera.tile.y);
}
export function city_view_load_state(orientation: buffer, camera: buffer) {
    data.orientation = buffer_read_i32(orientation);
    city_view_load_scenario_state(camera);
    if (data.orientation >= 0 && data.orientation <= 6) {
        data.orientation = 2 * (data.orientation / 2);
    } else {
        data.orientation = 0;
    }
}
export function city_view_save_scenario_state(camera: buffer) {
    buffer_write_i32(camera, data.camera.tile.x);
    buffer_write_i32(camera, data.camera.tile.y);
}
export function city_view_load_scenario_state(camera: buffer) {
    data.camera.tile.x = buffer_read_i32(camera);
    data.camera.tile.y = buffer_read_i32(camera);
}
export function city_view_foreach_map_tile(callback: map_callback) {
    let odd: number = 0;
    let y_view: number = data.camera.tile.y - 8;
    let y_graphic: number = data.viewport.y - 9 * HALF_TILE_HEIGHT_PIXELS - data.camera.pixel.y;
    for (let y: number = 0; y < data.viewport.height_tiles + 21; y++) {
        if (y_view >= 0 && y_view < VIEW_Y_MAX) {
            let x_graphic: number = -(4 * TILE_WIDTH_PIXELS) - data.camera.pixel.x;
            if (odd) {
                x_graphic += data.viewport.x - HALF_TILE_WIDTH_PIXELS
            } else {
                x_graphic += data.viewport.x
            }
            let x_view: number = data.camera.tile.x - 4;
            for (let x: number = 0; x < data.viewport.width_tiles + 7; x++) {
                if (x_view >= 0 && x_view < VIEW_X_MAX) {
                    let grid_offset: number = view_to_grid_offset_lookup[x_view][y_view];
                    callback(x_graphic, y_graphic, grid_offset);
                }
                x_graphic += TILE_WIDTH_PIXELS
                x_view++;
            }
        }
        odd = 1 - odd;
        y_graphic += HALF_TILE_HEIGHT_PIXELS
        y_view++;
    }
}
export function city_view_foreach_valid_map_tile(callback: map_callback) {
    let odd: number = 0;
    let y_view: number = data.camera.tile.y - 8;
    let y_graphic: number = data.viewport.y - 9 * HALF_TILE_HEIGHT_PIXELS - data.camera.pixel.y;
    for (let y: number = 0; y < data.viewport.height_tiles + 21; y++) {
        if (y_view >= 0 && y_view < VIEW_Y_MAX) {
            let x_graphic: number = -(4 * TILE_WIDTH_PIXELS) - data.camera.pixel.x;
            if (odd) {
                x_graphic += data.viewport.x - HALF_TILE_WIDTH_PIXELS
            } else {
                x_graphic += data.viewport.x
            }
            let x_view: number = data.camera.tile.x - 4;
            for (let x: number = 0; x < data.viewport.width_tiles + 7; x++) {
                if (x_view >= 0 && x_view < VIEW_X_MAX) {
                    let grid_offset: number = view_to_grid_offset_lookup[x_view][y_view];
                    if (grid_offset >= 0) {
                        callback(x_graphic, y_graphic, grid_offset);
                    }
                }
                x_graphic += TILE_WIDTH_PIXELS
                x_view++;
            }
        }
        odd = 1 - odd;
        y_graphic += HALF_TILE_HEIGHT_PIXELS
        y_view++;
    }
}
export function city_view_foreach_valid_map_tile_row(callback1: map_callback, callback2: map_callback, callback3: map_callback) {
    let odd: number = 0;
    let y_view: number = data.camera.tile.y - 8;
    let y_graphic: number = data.viewport.y - 9 * HALF_TILE_HEIGHT_PIXELS - data.camera.pixel.y;
    let x_graphic: number
    let x_view: number;
    for (let y: number = 0; y < data.viewport.height_tiles + 21; y++) {
        if (y_view >= 0 && y_view < VIEW_Y_MAX) {
            if (callback1) {
                x_graphic = -(4 * TILE_WIDTH_PIXELS) - data.camera.pixel.x;
                if (odd) {
                    x_graphic += data.viewport.x - HALF_TILE_WIDTH_PIXELS
                } else {
                    x_graphic += data.viewport.x
                }
                x_view = data.camera.tile.x - 4;
                for (let x: number = 0; x < data.viewport.width_tiles + 7; x++) {
                    if (x_view >= 0 && x_view < VIEW_X_MAX) {
                        let grid_offset: number = view_to_grid_offset_lookup[x_view][y_view];
                        if (grid_offset >= 0) {
                            callback1(x_graphic, y_graphic, grid_offset);
                        }
                    }
                    x_graphic += TILE_WIDTH_PIXELS
                    x_view++;
                }
            }
            if (callback2) {
                x_graphic = -(4 * TILE_WIDTH_PIXELS) - data.camera.pixel.x;
                if (odd) {
                    x_graphic += data.viewport.x - HALF_TILE_WIDTH_PIXELS
                } else {
                    x_graphic += data.viewport.x
                }
                x_view = data.camera.tile.x - 4;
                for (let x: number = 0; x < data.viewport.width_tiles + 7; x++) {
                    if (x_view >= 0 && x_view < VIEW_X_MAX) {
                        let grid_offset: number = view_to_grid_offset_lookup[x_view][y_view];
                        if (grid_offset >= 0) {
                            callback2(x_graphic, y_graphic, grid_offset);
                        }
                    }
                    x_graphic += TILE_WIDTH_PIXELS
                    x_view++;
                }
            }
            if (callback3) {
                x_graphic = -(4 * TILE_WIDTH_PIXELS) - data.camera.pixel.x;
                if (odd) {
                    x_graphic += data.viewport.x - HALF_TILE_WIDTH_PIXELS
                } else {
                    x_graphic += data.viewport.x
                }
                x_view = data.camera.tile.x - 4;
                for (let x: number = 0; x < data.viewport.width_tiles + 7; x++) {
                    if (x_view >= 0 && x_view < VIEW_X_MAX) {
                        let grid_offset: number = view_to_grid_offset_lookup[x_view][y_view];
                        if (grid_offset >= 0) {
                            callback3(x_graphic, y_graphic, grid_offset);
                        }
                    }
                    x_graphic += TILE_WIDTH_PIXELS
                    x_view++;
                }
            }
        }
        odd = 1 - odd;
        y_graphic += HALF_TILE_HEIGHT_PIXELS
        y_view++;
    }
}
function do_valid_callback(view_x: number, view_y: number, grid_offset: number, callback: map_callback) {
    if (grid_offset >= 0 && map_image_at(grid_offset) >= 6) {
        callback(view_x, view_y, grid_offset);
    }
}
export function city_view_foreach_tile_in_range(grid_offset: number, size: number, radius: number, callback: map_callback) {
    let x: number
    let y: number;
    let x_ref: Ref<number> = new Ref<number>(0);
    let y_ref: Ref<number> = new Ref<number>(0);
    city_view_grid_offset_to_xy_view(grid_offset, x_ref, y_ref);
    x = x_ref.v;
    y = y_ref.v;
    x = (x - data.camera.tile.x) * TILE_WIDTH_PIXELS
        - (y & 1) * HALF_TILE_WIDTH_PIXELS - data.camera.pixel.x + data.viewport.x;
    y = (y - data.camera.tile.y - 1) * HALF_TILE_HEIGHT_PIXELS - data.camera.pixel.y + data.viewport.y;
    let orientation_x: number = X_DIRECTION_FOR_ORIENTATION[data.orientation / 2];
    let orientation_y: number = Y_DIRECTION_FOR_ORIENTATION[data.orientation / 2];
    let pixel_rotation: number = orientation_x * orientation_y;
    let rotation_delta: number = pixel_rotation == -1 ? (2 - size) : 1;
    grid_offset += map_grid_delta(rotation_delta * orientation_x, rotation_delta * orientation_y)
    let x_delta: number = HALF_TILE_WIDTH_PIXELS;
    let y_delta: number = HALF_TILE_HEIGHT_PIXELS;
    let x_offset: number = HALF_TILE_WIDTH_PIXELS;
    let y_offset: number = TILE_HEIGHT_PIXELS;
    if (size) {
        --size;
        y += HALF_TILE_HEIGHT_PIXELS * size
        x_offset += HALF_TILE_WIDTH_PIXELS * size
        y_offset += HALF_TILE_HEIGHT_PIXELS * size
    } else {
        do_valid_callback(x, y, grid_offset, callback);
    }
    for (let ring: number = 0; ring < radius; ++ring) {
        let offset_north: number = -ring - 2;
        let offset_south: number = ring + size;
        do_valid_callback(
            x, y + y_offset * pixel_rotation,
            map_grid_add_delta(grid_offset, offset_south * orientation_x, offset_south * orientation_y),
            callback);
        do_valid_callback(
            x, y - y_offset * pixel_rotation,
            map_grid_add_delta(grid_offset, offset_north * orientation_x, offset_north * orientation_y),
            callback);
        do_valid_callback(
            x - x_offset - x_delta, y,
            map_grid_add_delta(grid_offset, offset_north * orientation_x, offset_south * orientation_y),
            callback);
        do_valid_callback(
            x + x_offset + x_delta, y,
            map_grid_add_delta(grid_offset, offset_south * orientation_x, offset_north * orientation_y),
            callback);
        for (let tile: number = 1; tile < ring * 2 + size + 2; ++tile) {
            do_valid_callback(
                x + x_delta * tile, y - y_offset * pixel_rotation + y_delta * pixel_rotation * tile,
                map_grid_add_delta(grid_offset, (tile + offset_north) * orientation_x, offset_north * orientation_y),
                callback);
            do_valid_callback(
                x - x_delta * tile, y - y_offset * pixel_rotation + y_delta * pixel_rotation * tile,
                map_grid_add_delta(grid_offset, offset_north * orientation_x, (tile + offset_north) * orientation_y),
                callback);
            do_valid_callback(
                x + x_delta * tile, y + y_offset * pixel_rotation - y_delta * pixel_rotation * tile,
                map_grid_add_delta(grid_offset, offset_south * orientation_x, (offset_south - tile) * orientation_y),
                callback);
            do_valid_callback(
                x - x_delta * tile, y + y_offset * pixel_rotation - y_delta * pixel_rotation * tile,
                map_grid_add_delta(grid_offset, (offset_south - tile) * orientation_x, offset_south * orientation_y),
                callback);
        }
        x_offset += TILE_WIDTH_PIXELS
        y_offset += TILE_HEIGHT_PIXELS
    }
}
export function city_view_foreach_minimap_tile(x_offset: number, y_offset: number, absolute_x: number, absolute_y: number, width_tiles: number, height_tiles: number, callback: map_callback) {
    let odd: number = 0;
    let y_abs: number = absolute_y - 4;
    let y_view: number = y_offset - 4;
    for (let y_rel: number = -4; y_rel < height_tiles + 4; y_rel++, y_abs++, y_view++) {
        let x_view: number;
        if (odd) {
            x_view = x_offset - 9;
            odd = 0;
        } else {
            x_view = x_offset - 8;
            odd = 1;
        }
        let x_abs: number = absolute_x - 4;
        for (let x_rel: number = -4; x_rel < width_tiles; x_rel++, x_abs++, x_view += 2) {
            if (x_abs >= 0 && x_abs < VIEW_X_MAX && y_abs >= 0 && y_abs < VIEW_Y_MAX) {
                callback(x_view, y_view, view_to_grid_offset_lookup[x_abs][y_abs]);
            }
        }
    }
}
