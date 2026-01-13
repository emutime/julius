import { system_create_framebuffer } from 'game/system';
import { COLOR_INSET_DARK, COLOR_INSET_LIGHT, color_t } from 'graphics/color';
import { screen_dialog_offset_x, screen_dialog_offset_y } from 'graphics/screen';
import { memcpy, memset } from '../../ext/crt';
export const enum clip_code {
    CLIP_NONE,
    CLIP_LEFT,
    CLIP_RIGHT,
    CLIP_TOP,
    CLIP_BOTTOM,
    CLIP_BOTH,
    CLIP_INVISIBLE
};
import CLIP_NONE = clip_code.CLIP_NONE;
import CLIP_LEFT = clip_code.CLIP_LEFT;
import CLIP_RIGHT = clip_code.CLIP_RIGHT;
import CLIP_TOP = clip_code.CLIP_TOP;
import CLIP_BOTTOM = clip_code.CLIP_BOTTOM;
import CLIP_BOTH = clip_code.CLIP_BOTH;
import CLIP_INVISIBLE = clip_code.CLIP_INVISIBLE;
export class clip_info {
    public clip_x: clip_code = null;
    public clip_y: clip_code = null;
    public clipped_pixels_left: number = 0;
    public clipped_pixels_right: number = 0;
    public clipped_pixels_top: number = 0;
    public clipped_pixels_bottom: number = 0;
    public visible_pixels_x: number = 0;
    public visible_pixels_y: number = 0;
    public is_visible: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.clip_x = args[0]);
        args.length >= 2 && (this.clip_y = args[1]);
        args.length >= 3 && (this.clipped_pixels_left = args[2]);
        args.length >= 4 && (this.clipped_pixels_right = args[3]);
        args.length >= 5 && (this.clipped_pixels_top = args[4]);
        args.length >= 6 && (this.clipped_pixels_bottom = args[5]);
        args.length >= 7 && (this.visible_pixels_x = args[6]);
        args.length >= 8 && (this.visible_pixels_y = args[7]);
        args.length >= 9 && (this.is_visible = args[8]);
    }
}
export class unnamed9_8 {
    public pixels: color_t = null;
    public width: number = 0;
    public height: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.pixels = args[0]);
        args.length >= 2 && (this.width = args[1]);
        args.length >= 3 && (this.height = args[2]);
    }
}
let canvas: unnamed9_8 = new unnamed9_8();
export class unnamed15_8 {
    public x_start: number = 0;
    public x_end: number = 0;
    public y_start: number = 0;
    public y_end: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.x_start = args[0]);
        args.length >= 2 && (this.x_end = args[1]);
        args.length >= 3 && (this.y_start = args[2]);
        args.length >= 4 && (this.y_end = args[3]);
    }
}
let clip_rectangle: unnamed15_8 = new unnamed15_8(0, 800, 0, 600);
export class unnamed22_8 {
    public x: number = 0;
    public y: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.x = args[0]);
        args.length >= 2 && (this.y = args[1]);
    }
}
let translation: unnamed22_8 = new unnamed22_8();
let clip: clip_info;
export function graphics_init_canvas(width: number, height: number) {
    canvas.pixels = system_create_framebuffer(width, height).v;
    memset(canvas.pixels, 0);
    canvas.width = width;
    canvas.height = height;
    graphics_set_clip_rectangle(0, 0, width, height);
}
export function graphics_canvas() {
    return canvas.pixels;
}
function translate_clip(dx: number, dy: number) {
    clip_rectangle.x_start -= dx
    clip_rectangle.x_end -= dx
    clip_rectangle.y_start -= dy
    clip_rectangle.y_end -= dy
}
function set_translation(x: number, y: number) {
    let dx: number = x - translation.x;
    let dy: number = y - translation.y;
    translation.x = x;
    translation.y = y;
    translate_clip(dx, dy);
}
export function graphics_in_dialog() {
    set_translation(screen_dialog_offset_x(), screen_dialog_offset_y());
}
export function graphics_reset_dialog() {
    set_translation(0, 0);
}
export function graphics_set_clip_rectangle(x: number, y: number, width: number, height: number) {
    clip_rectangle.x_start = x;
    clip_rectangle.x_end = x + width;
    clip_rectangle.y_start = y;
    clip_rectangle.y_end = y + height;
    if (translation.x + clip_rectangle.x_start < 0) {
        clip_rectangle.x_start = -translation.x;
    }
    if (translation.y + clip_rectangle.y_start < 0) {
        clip_rectangle.y_start = -translation.y;
    }
    if (translation.x + clip_rectangle.x_end > canvas.width) {
        clip_rectangle.x_end = canvas.width - translation.x;
    }
    if (translation.y + clip_rectangle.y_end > canvas.height) {
        clip_rectangle.y_end = canvas.height - translation.y;
    }
}
export function graphics_reset_clip_rectangle() {
    clip_rectangle.x_start = 0;
    clip_rectangle.x_end = canvas.width;
    clip_rectangle.y_start = 0;
    clip_rectangle.y_end = canvas.height;
    translate_clip(translation.x, translation.y);
}
function set_clip_x(x_offset: number, width: number) {
    clip.clipped_pixels_left = 0;
    clip.clipped_pixels_right = 0;
    if (width <= 0
        || x_offset + width <= clip_rectangle.x_start
        || x_offset >= clip_rectangle.x_end) {
        clip.clip_x = CLIP_INVISIBLE;
        clip.visible_pixels_x = 0;
        return;
    }
    if (x_offset < clip_rectangle.x_start) {
        clip.clipped_pixels_left = clip_rectangle.x_start - x_offset;
        if (x_offset + width <= clip_rectangle.x_end) {
            clip.clip_x = CLIP_LEFT;
        } else {
            clip.clip_x = CLIP_BOTH;
            clip.clipped_pixels_right = x_offset + width - clip_rectangle.x_end;
        }
    } else if (x_offset + width > clip_rectangle.x_end) {
        clip.clip_x = CLIP_RIGHT;
        clip.clipped_pixels_right = x_offset + width - clip_rectangle.x_end;
    } else {
        clip.clip_x = CLIP_NONE;
    }
    clip.visible_pixels_x = width - clip.clipped_pixels_left - clip.clipped_pixels_right;
}
function set_clip_y(y_offset: number, height: number) {
    clip.clipped_pixels_top = 0;
    clip.clipped_pixels_bottom = 0;
    if (height <= 0
        || y_offset + height <= clip_rectangle.y_start
        || y_offset >= clip_rectangle.y_end) {
        clip.clip_y = CLIP_INVISIBLE;
    } else if (y_offset < clip_rectangle.y_start) {
        clip.clipped_pixels_top = clip_rectangle.y_start - y_offset;
        if (y_offset + height <= clip_rectangle.y_end) {
            clip.clip_y = CLIP_TOP;
        } else {
            clip.clip_y = CLIP_BOTH;
            clip.clipped_pixels_bottom = y_offset + height - clip_rectangle.y_end;
        }
    } else if (y_offset + height > clip_rectangle.y_end) {
        clip.clip_y = CLIP_BOTTOM;
        clip.clipped_pixels_bottom = y_offset + height - clip_rectangle.y_end;
    } else {
        clip.clip_y = CLIP_NONE;
    }
    clip.visible_pixels_y = height - clip.clipped_pixels_top - clip.clipped_pixels_bottom;
}
export function graphics_get_clip_info(x: number, y: number, width: number, height: number) {
    set_clip_x(x, width);
    set_clip_y(y, height);
    if (clip.clip_x == CLIP_INVISIBLE || clip.clip_y == CLIP_INVISIBLE) {
        clip.is_visible = 0;
    } else {
        clip.is_visible = 1;
    }
    return clip;
}
export function graphics_save_to_buffer(x: number, y: number, width: number, height: number, buffer: color_t) {
    let current_clip: clip_info = graphics_get_clip_info(x, y, width, height);
    if (!current_clip.is_visible) {
        return;
    }
    let min_x: number = x + current_clip.clipped_pixels_left;
    let min_dy: number = current_clip.clipped_pixels_top;
    let max_dy: number = height - current_clip.clipped_pixels_bottom;
    for (let dy: number = min_dy; dy < max_dy; dy++) {
        memcpy(buffer[dy * width], graphics_get_pixel(min_x, y + dy), current_clip.visible_pixels_x);
    }
}
export function graphics_draw_from_buffer(x: number, y: number, width: number, height: number, buffer: color_t) {
    let current_clip: clip_info = graphics_get_clip_info(x, y, width, height);
    if (!current_clip.is_visible) {
        return;
    }
    let min_x: number = x + current_clip.clipped_pixels_left;
    let min_dy: number = current_clip.clipped_pixels_top;
    let max_dy: number = height - current_clip.clipped_pixels_bottom;
    for (let dy: number = min_dy; dy < max_dy; dy++) {
        memcpy(graphics_get_pixel(min_x, y + dy), buffer[dy * width], current_clip.visible_pixels_x);
    }
}
export function graphics_get_pixel(x: number, y: number) {
    return canvas.pixels[(translation.y + y) * canvas.width + (translation.x + x)];
}
export function graphics_clear_screen() {
    memset(canvas.pixels, 0);
}
export function graphics_draw_vertical_line(x: number, y1: number, y2: number, color: color_t) {
    if (x < clip_rectangle.x_start || x >= clip_rectangle.x_end) {
        return;
    }
    let y_min: number = y1 < y2 ? y1 : y2;
    let y_max: number = y1 < y2 ? y2 : y1;
    y_min = y_min < clip_rectangle.y_start ? clip_rectangle.y_start : y_min;
    y_max = y_max >= clip_rectangle.y_end ? clip_rectangle.y_end - 1 : y_max;
    let pixel: color_t = graphics_get_pixel(x, y_min);
    let end_pixel: color_t = pixel + ((y_max - y_min) * canvas.width);
    while (pixel <= end_pixel) {
        pixel = color;
        pixel += canvas.width;
    }
}
export function graphics_draw_horizontal_line(x1: number, x2: number, y: number, color: color_t) {
    if (y < clip_rectangle.y_start || y >= clip_rectangle.y_end) {
        return;
    }
    let x_min: number = x1 < x2 ? x1 : x2;
    let x_max: number = x1 < x2 ? x2 : x1;
    x_min = x_min < clip_rectangle.x_start ? clip_rectangle.x_start : x_min;
    x_max = x_max >= clip_rectangle.x_end ? clip_rectangle.x_end - 1 : x_max;
    let pixel: color_t = graphics_get_pixel(x_min, y);
    let end_pixel: color_t = pixel + (x_max - x_min);
    while (pixel <= end_pixel) {
        pixel = color;
        ++pixel;
    }
}
export function graphics_draw_rect(x: number, y: number, width: number, height: number, color: color_t) {
    graphics_draw_horizontal_line(x, x + width - 1, y, color);
    graphics_draw_horizontal_line(x, x + width - 1, y + height - 1, color);
    graphics_draw_vertical_line(x, y, y + height - 1, color);
    graphics_draw_vertical_line(x + width - 1, y, y + height - 1, color);
}
export function graphics_draw_inset_rect(x: number, y: number, width: number, height: number) {
    graphics_draw_horizontal_line(x, x + width - 1, y, COLOR_INSET_DARK);
    graphics_draw_vertical_line(x + width - 1, y, y + height - 1, COLOR_INSET_LIGHT);
    graphics_draw_horizontal_line(x, x + width - 1, y + height - 1, COLOR_INSET_LIGHT);
    graphics_draw_vertical_line(x, y, y + height - 1, COLOR_INSET_DARK);
}
export function graphics_fill_rect(x: number, y: number, width: number, height: number, color: color_t) {
    for (let yy: number = y; yy < height + y; yy++) {
        graphics_draw_horizontal_line(x, x + width - 1, yy, color);
    }
}
export function graphics_shade_rect(x: number, y: number, width: number, height: number, darkness: number) {
    let cur_clip: clip_info = graphics_get_clip_info(x, y, width, height);
    if (!cur_clip.is_visible) {
        return;
    }
    for (let yy: number = y + cur_clip.clipped_pixels_top; yy < y + height - cur_clip.clipped_pixels_bottom; yy++) {
        for (let xx: number = x + cur_clip.clipped_pixels_left; xx < x + width - cur_clip.clipped_pixels_right; xx++) {
            let pixel: color_t = graphics_get_pixel(xx, yy);
            let r: number = (pixel & 0xff0000) >> 16;
            let g: number = (pixel & 0xff00) >> 8;
            let b: number = (pixel & 0xff);
            let grey: number = (r + g + b) / 3 >> darkness;
            let new_pixel: color_t = (grey << 16 | grey << 8 | grey);
            pixel = new_pixel;
        }
    }
}
