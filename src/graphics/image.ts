import { image, image_data, image_data_enemy, image_data_letter, IMAGE_FONT_MULTIBYTE_OFFSET, image_get, image_get_enemy, image_letter } from 'core/image';
import { log_error } from 'core/log';
import { COLOR_BLACK, COLOR_MASK_NONE, COLOR_SG2_TRANSPARENT, color_t, COLOR_WHITE } from 'graphics/color';
import { font_t } from 'graphics/font';
import { clip_code, clip_info, graphics_clear_screen, graphics_get_clip_info, graphics_get_pixel } from 'graphics/graphics';
import { screen_height, screen_width } from 'graphics/screen';
export const COMPONENT = 24;
export const MIX_RB = 16711935;
export const MIX_G = 65280;
export const FOOTPRINT_WIDTH = 58;
export const FOOTPRINT_HEIGHT = 30;
export const enum image_type {
    IMAGE_TYPE_WITH_TRANSPARENCY = 0,
    IMAGE_TYPE_ISOMETRIC = 30
};
import IMAGE_TYPE_WITH_TRANSPARENCY = image_type.IMAGE_TYPE_WITH_TRANSPARENCY;
import IMAGE_TYPE_ISOMETRIC = image_type.IMAGE_TYPE_ISOMETRIC;
import FONT_NORMAL_BLACK = font_t.FONT_NORMAL_BLACK;
import FONT_NORMAL_WHITE = font_t.FONT_NORMAL_WHITE;
import FONT_NORMAL_RED = font_t.FONT_NORMAL_RED;
import FONT_LARGE_BLACK = font_t.FONT_LARGE_BLACK;
import FONT_NORMAL_GREEN = font_t.FONT_NORMAL_GREEN;
import CLIP_NONE = clip_code.CLIP_NONE;
import CLIP_LEFT = clip_code.CLIP_LEFT;
import CLIP_RIGHT = clip_code.CLIP_RIGHT;
import CLIP_BOTH = clip_code.CLIP_BOTH;

export const enum draw_type {
    DRAW_TYPE_SET,
    DRAW_TYPE_AND,
    DRAW_TYPE_NONE,
    DRAW_TYPE_BLEND,
    DRAW_TYPE_BLEND_ALPHA
}
let FOOTPRINT_X_START_PER_HEIGHT: number[] = [
    28, 26, 24, 22, 20, 18, 16, 14, 12, 10, 8, 6, 4, 2, 0,
    0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28
];
let FOOTPRINT_OFFSET_PER_HEIGHT: number[] = [
    0, 2, 8, 18, 32, 50, 72, 98, 128, 162, 200, 242, 288, 338, 392, 450,
    508, 562, 612, 658, 700, 738, 772, 802, 828, 850, 868, 882, 892, 898
];
function draw_uncompressed(img: image, data: color_t[], x_offset: number, y_offset: number, color: color_t, type: draw_type): void {
    let clip: clip_info = graphics_get_clip_info(x_offset, y_offset, img.width, img.height);
    if (!clip.is_visible) {
        return;
    }
    let dataIndex: number = img.width * clip.clipped_pixels_top;
    for (let y: number = clip.clipped_pixels_top; y < img.height - clip.clipped_pixels_bottom; y++) {
        dataIndex += clip.clipped_pixels_left;
        let dst: color_t[] = graphics_get_pixel(x_offset + clip.clipped_pixels_left, y_offset + y);
        let dstIndex: number = 0;
        let x_max: number = img.width - clip.clipped_pixels_right;
        if (type === draw_type.DRAW_TYPE_NONE) {
            if (img.draw.type === image_type.IMAGE_TYPE_WITH_TRANSPARENCY || img.draw.is_external) {
                for (let x: number = clip.clipped_pixels_left; x < x_max; x++, dstIndex++) {
                    if (data[dataIndex] !== COLOR_SG2_TRANSPARENT) {
                        dst[dstIndex] = data[dataIndex];
                    }
                    dataIndex++;
                }
            } else {
                let num_pixels: number = x_max - clip.clipped_pixels_left;
                for (let i: number = 0; i < num_pixels; i++) {
                    dst[dstIndex + i] = data[dataIndex + i];
                }
                dataIndex += num_pixels;
            }
        } else if (type === draw_type.DRAW_TYPE_SET) {
            for (let x: number = clip.clipped_pixels_left; x < x_max; x++, dstIndex++) {
                if (data[dataIndex] !== COLOR_SG2_TRANSPARENT) {
                    dst[dstIndex] = color;
                }
                dataIndex++;
            }
        } else if (type === draw_type.DRAW_TYPE_AND) {
            for (let x: number = clip.clipped_pixels_left; x < x_max; x++, dstIndex++) {
                if (data[dataIndex] !== COLOR_SG2_TRANSPARENT) {
                    dst[dstIndex] = data[dataIndex] & color;
                }
                dataIndex++;
            }
        } else if (type === draw_type.DRAW_TYPE_BLEND) {
            for (let x: number = clip.clipped_pixels_left; x < x_max; x++, dstIndex++) {
                if (data[dataIndex] !== COLOR_SG2_TRANSPARENT) {
                    dst[dstIndex] &= color;
                }
                dataIndex++;
            }
        } else if (type === draw_type.DRAW_TYPE_BLEND_ALPHA) {
            for (let x: number = clip.clipped_pixels_left; x < x_max; x++, dstIndex++) {
                if (data[dataIndex] !== COLOR_SG2_TRANSPARENT) {
                    let alpha: color_t = COMPONENT;
                    if (alpha === 255) {
                        dst[dstIndex] = color;
                    } else {
                        let s: color_t = color;
                        let d: color_t = dst[dstIndex];
                        dst[dstIndex] = (((((s & 0xff00ff) * alpha) + ((d & 0xff00ff) * (256 - alpha))) & 0xff00ff00) |
                            (((((s & 0x00ff00) * alpha) + ((d & 0x00ff00) * (256 - alpha))) & 0x00ff0000)) >> 8);
                    }
                }
                dataIndex++;
            }
        }
        dataIndex += clip.clipped_pixels_right;
    }
}
function draw_compressed(img: image, data: color_t[], x_offset: number, y_offset: number, height: number): void {
    let clip: clip_info = graphics_get_clip_info(x_offset, y_offset, img.width, height);
    if (!clip.is_visible) {
        return;
    }
    let unclipped: boolean = clip.clip_x === CLIP_NONE;
    let dataIndex: number = 0;
    for (let y: number = 0; y < height - clip.clipped_pixels_bottom; y++) {
        let x: number = 0;
        while (x < img.width) {
            let b: color_t = data[dataIndex++];
            if (b === 255) {
                // transparent pixels to skip
                x += data[dataIndex];
                dataIndex++;
            } else if (y < clip.clipped_pixels_top) {
                dataIndex += b;
                x += b;
            } else {
                // number of concrete pixels
                let pixelsIndex: number = dataIndex;
                dataIndex += b;
                let dst: color_t[] = graphics_get_pixel(x_offset + x, y_offset + y);
                let dstIndex: number = 0;
                if (unclipped) {
                    x += b;
                    for (let i: number = 0; i < b; i++) {
                        dst[dstIndex + i] = data[pixelsIndex + i];
                    }
                } else {
                    while (b > 0) {
                        if (x >= clip.clipped_pixels_left && x < img.width - clip.clipped_pixels_right) {
                            dst[dstIndex] = data[pixelsIndex];
                        }
                        dstIndex++;
                        x++;
                        pixelsIndex++;
                        b--;
                    }
                }
            }
        }
    }
}
function draw_compressed_set(img: image, data: color_t[], x_offset: number, y_offset: number, height: number, color: color_t): void {
    let clip: clip_info = graphics_get_clip_info(x_offset, y_offset, img.width, height);
    if (!clip.is_visible) {
        return;
    }
    let unclipped: boolean = clip.clip_x === CLIP_NONE;
    let dataIndex: number = 0;
    for (let y: number = 0; y < height - clip.clipped_pixels_bottom; y++) {
        let x: number = 0;
        while (x < img.width) {
            let b: color_t = data[dataIndex++];
            if (b === 255) {
                // transparent pixels to skip
                x += data[dataIndex];
                dataIndex++;
            } else if (y < clip.clipped_pixels_top) {
                dataIndex += b;
                x += b;
            } else {
                dataIndex += b;
                let dst: color_t[] = graphics_get_pixel(x_offset + x, y_offset + y);
                let dstIndex: number = 0;
                if (unclipped) {
                    x += b;
                    let tempB: number = b;
                    while (tempB > 0) {
                        dst[dstIndex] = color;
                        dstIndex++;
                        tempB--;
                    }
                } else {
                    while (b > 0) {
                        if (x >= clip.clipped_pixels_left && x < img.width - clip.clipped_pixels_right) {
                            dst[dstIndex] = color;
                        }
                        dstIndex++;
                        x++;
                        b--;
                    }
                }
            }
        }
    }
}
function draw_compressed_and(img: image, data: color_t[], x_offset: number, y_offset: number, height: number, color: color_t): void {
    let clip: clip_info = graphics_get_clip_info(x_offset, y_offset, img.width, height);
    if (!clip.is_visible) {
        return;
    }
    let unclipped: boolean = clip.clip_x === CLIP_NONE;
    let dataIndex: number = 0;
    for (let y: number = 0; y < height - clip.clipped_pixels_bottom; y++) {
        let x: number = 0;
        while (x < img.width) {
            let b: color_t = data[dataIndex++];
            if (b === 255) {
                // transparent pixels to skip
                x += data[dataIndex];
                dataIndex++;
            } else if (y < clip.clipped_pixels_top) {
                dataIndex += b;
                x += b;
            } else {
                // number of concrete pixels
                let pixelsIndex: number = dataIndex;
                dataIndex += b;
                let dst: color_t[] = graphics_get_pixel(x_offset + x, y_offset + y);
                let dstIndex: number = 0;
                if (unclipped) {
                    x += b;
                    let tempB: number = b;
                    while (tempB > 0) {
                        dst[dstIndex] = data[pixelsIndex] & color;
                        dstIndex++;
                        pixelsIndex++;
                        tempB--;
                    }
                } else {
                    while (b > 0) {
                        if (x >= clip.clipped_pixels_left && x < img.width - clip.clipped_pixels_right) {
                            dst[dstIndex] = data[pixelsIndex] & color;
                        }
                        dstIndex++;
                        x++;
                        pixelsIndex++;
                        b--;
                    }
                }
            }
        }
    }
}
function draw_compressed_blend(img: image, data: color_t[], x_offset: number, y_offset: number, height: number, color: color_t): void {
    let clip: clip_info = graphics_get_clip_info(x_offset, y_offset, img.width, height);
    if (!clip.is_visible) {
        return;
    }
    let unclipped: boolean = clip.clip_x === CLIP_NONE;
    let dataIndex: number = 0;
    for (let y: number = 0; y < height - clip.clipped_pixels_bottom; y++) {
        let x: number = 0;
        while (x < img.width) {
            let b: color_t = data[dataIndex++];
            if (b === 255) {
                // transparent pixels to skip
                x += data[dataIndex];
                dataIndex++;
            } else if (y < clip.clipped_pixels_top) {
                dataIndex += b;
                x += b;
            } else {
                dataIndex += b;
                let dst: color_t[] = graphics_get_pixel(x_offset + x, y_offset + y);
                let dstIndex: number = 0;
                if (unclipped) {
                    x += b;
                    let tempB: number = b;
                    while (tempB > 0) {
                        dst[dstIndex] &= color;
                        dstIndex++;
                        tempB--;
                    }
                } else {
                    while (b > 0) {
                        if (x >= clip.clipped_pixels_left && x < img.width - clip.clipped_pixels_right) {
                            dst[dstIndex] &= color;
                        }
                        dstIndex++;
                        x++;
                        b--;
                    }
                }
            }
        }
    }
}
function draw_compressed_blend_alpha(img: image, data: color_t[], x_offset: number, y_offset: number, height: number, color: color_t): void {
    let clip: clip_info = graphics_get_clip_info(x_offset, y_offset, img.width, height);
    if (!clip.is_visible) {
        return;
    }
    let alpha: color_t = COMPONENT;
    if (!alpha) {
        return;
    }
    if (alpha === 255) {
        draw_compressed_set(img, data, x_offset, y_offset, height, color);
        return;
    }
    let alpha_dst: color_t = 256 - alpha;
    let src_rb: color_t = (color & 0xff00ff) * alpha;
    let src_g: color_t = (color & 0x00ff00) * alpha;
    let unclipped: boolean = clip.clip_x === CLIP_NONE;
    let dataIndex: number = 0;
    for (let y: number = 0; y < height - clip.clipped_pixels_bottom; y++) {
        let x: number = 0;
        let dst: color_t[] = graphics_get_pixel(x_offset, y_offset + y);
        let dstIndex: number = 0;
        while (x < img.width) {
            let b: color_t = data[dataIndex++];
            if (b === 255) {
                // transparent pixels to skip
                x += data[dataIndex];
                dataIndex++;
                dstIndex += data[dataIndex - 1];
            } else if (y < clip.clipped_pixels_top) {
                dataIndex += b;
                x += b;
                dstIndex += b;
            } else {
                dataIndex += b;
                if (unclipped) {
                    x += b;
                    let tempB: number = b;
                    while (tempB > 0) {
                        let d: color_t = dst[dstIndex];
                        dst[dstIndex] = (((src_rb + (d & 0xff00ff) * alpha_dst) & 0xff00ff00) |
                            ((src_g + (d & 0x00ff00) * alpha_dst) & 0x00ff0000)) >> 8;
                        tempB--;
                        dstIndex++;
                    }
                } else {
                    while (b > 0) {
                        if (x >= clip.clipped_pixels_left && x < img.width - clip.clipped_pixels_right) {
                            let d: color_t = dst[dstIndex];
                            dst[dstIndex] = (((src_rb + (d & 0xff00ff) * alpha_dst) & 0xff00ff00) |
                                ((src_g + (d & 0x00ff00) * alpha_dst) & 0x00ff0000)) >> 8;
                        }
                        dstIndex++;
                        x++;
                        b--;
                    }
                }
            }
        }
    }
}
function draw_footprint_simple(src: color_t[], x: number, y: number): void {
    let srcIndex: number = 0;
    let dst: color_t[] = graphics_get_pixel(x + 28, y + 0);
    for (let i: number = 0; i < 2; i++) dst[i] = src[srcIndex++];
    dst = graphics_get_pixel(x + 26, y + 1);
    for (let i: number = 0; i < 6; i++) dst[i] = src[srcIndex++];
    dst = graphics_get_pixel(x + 24, y + 2);
    for (let i: number = 0; i < 10; i++) dst[i] = src[srcIndex++];
    dst = graphics_get_pixel(x + 22, y + 3);
    for (let i: number = 0; i < 14; i++) dst[i] = src[srcIndex++];
    dst = graphics_get_pixel(x + 20, y + 4);
    for (let i: number = 0; i < 18; i++) dst[i] = src[srcIndex++];
    dst = graphics_get_pixel(x + 18, y + 5);
    for (let i: number = 0; i < 22; i++) dst[i] = src[srcIndex++];
    dst = graphics_get_pixel(x + 16, y + 6);
    for (let i: number = 0; i < 26; i++) dst[i] = src[srcIndex++];
    dst = graphics_get_pixel(x + 14, y + 7);
    for (let i: number = 0; i < 30; i++) dst[i] = src[srcIndex++];
    dst = graphics_get_pixel(x + 12, y + 8);
    for (let i: number = 0; i < 34; i++) dst[i] = src[srcIndex++];
    dst = graphics_get_pixel(x + 10, y + 9);
    for (let i: number = 0; i < 38; i++) dst[i] = src[srcIndex++];
    dst = graphics_get_pixel(x + 8, y + 10);
    for (let i: number = 0; i < 42; i++) dst[i] = src[srcIndex++];
    dst = graphics_get_pixel(x + 6, y + 11);
    for (let i: number = 0; i < 46; i++) dst[i] = src[srcIndex++];
    dst = graphics_get_pixel(x + 4, y + 12);
    for (let i: number = 0; i < 50; i++) dst[i] = src[srcIndex++];
    dst = graphics_get_pixel(x + 2, y + 13);
    for (let i: number = 0; i < 54; i++) dst[i] = src[srcIndex++];
    dst = graphics_get_pixel(x + 0, y + 14);
    for (let i: number = 0; i < 58; i++) dst[i] = src[srcIndex++];
    dst = graphics_get_pixel(x + 0, y + 15);
    for (let i: number = 0; i < 58; i++) dst[i] = src[srcIndex++];
    dst = graphics_get_pixel(x + 2, y + 16);
    for (let i: number = 0; i < 54; i++) dst[i] = src[srcIndex++];
    dst = graphics_get_pixel(x + 4, y + 17);
    for (let i: number = 0; i < 50; i++) dst[i] = src[srcIndex++];
    dst = graphics_get_pixel(x + 6, y + 18);
    for (let i: number = 0; i < 46; i++) dst[i] = src[srcIndex++];
    dst = graphics_get_pixel(x + 8, y + 19);
    for (let i: number = 0; i < 42; i++) dst[i] = src[srcIndex++];
    dst = graphics_get_pixel(x + 10, y + 20);
    for (let i: number = 0; i < 38; i++) dst[i] = src[srcIndex++];
    dst = graphics_get_pixel(x + 12, y + 21);
    for (let i: number = 0; i < 34; i++) dst[i] = src[srcIndex++];
    dst = graphics_get_pixel(x + 14, y + 22);
    for (let i: number = 0; i < 30; i++) dst[i] = src[srcIndex++];
    dst = graphics_get_pixel(x + 16, y + 23);
    for (let i: number = 0; i < 26; i++) dst[i] = src[srcIndex++];
    dst = graphics_get_pixel(x + 18, y + 24);
    for (let i: number = 0; i < 22; i++) dst[i] = src[srcIndex++];
    dst = graphics_get_pixel(x + 20, y + 25);
    for (let i: number = 0; i < 18; i++) dst[i] = src[srcIndex++];
    dst = graphics_get_pixel(x + 22, y + 26);
    for (let i: number = 0; i < 14; i++) dst[i] = src[srcIndex++];
    dst = graphics_get_pixel(x + 24, y + 27);
    for (let i: number = 0; i < 10; i++) dst[i] = src[srcIndex++];
    dst = graphics_get_pixel(x + 26, y + 28);
    for (let i: number = 0; i < 6; i++) dst[i] = src[srcIndex++];
    dst = graphics_get_pixel(x + 28, y + 29);
    for (let i: number = 0; i < 2; i++) dst[i] = src[srcIndex++];
}
function draw_footprint_tile(data: color_t[], x_offset: number, y_offset: number, color_mask: color_t): void {
    if (!color_mask) {
        color_mask = COLOR_MASK_NONE;
    }
    let clip: clip_info = graphics_get_clip_info(x_offset, y_offset, FOOTPRINT_WIDTH, FOOTPRINT_HEIGHT);
    if (!clip.is_visible) {
        return;
    }
    if (clip.clip_y === CLIP_NONE && clip.clip_x === CLIP_NONE && color_mask === COLOR_MASK_NONE) {
        draw_footprint_simple(data, x_offset, y_offset);
        return;
    }
    let clip_left: boolean = clip.clip_x === CLIP_LEFT || clip.clip_x === CLIP_BOTH;
    let clip_right: boolean = clip.clip_x === CLIP_RIGHT || clip.clip_x === CLIP_BOTH;
    let srcIndex: number = FOOTPRINT_OFFSET_PER_HEIGHT[clip.clipped_pixels_top];
    for (let y: number = clip.clipped_pixels_top; y < clip.clipped_pixels_top + clip.visible_pixels_y; y++) {
        let x_start: number = FOOTPRINT_X_START_PER_HEIGHT[y];
        let x_max: number = 58 - x_start * 2;
        let x_pixel_advance: number = 0;
        if (clip_left) {
            if (clip.clipped_pixels_left + clip.visible_pixels_x < x_start) {
                srcIndex += x_max;
                continue;
            }
            if (clip.clipped_pixels_left > x_start) {
                let pixels_to_reduce: number = clip.clipped_pixels_left - x_start;
                if (pixels_to_reduce >= x_max) {
                    srcIndex += x_max;
                    continue;
                }
                srcIndex += pixels_to_reduce;
                x_max -= pixels_to_reduce;
                x_start = clip.clipped_pixels_left;
            }
        }
        if (clip_right) {
            let clip_x: number = 58 - clip.clipped_pixels_right;
            if (clip_x < x_start) {
                srcIndex += x_max;
                continue;
            }
            if (x_start + x_max > clip_x) {
                let temp_x_max: number = clip_x - x_start;
                x_pixel_advance = x_max - temp_x_max;
                x_max = temp_x_max;
            }
        }
        let buffer: color_t[] = graphics_get_pixel(x_offset + x_start, y_offset + y);
        if (color_mask === COLOR_MASK_NONE) {
            for (let i: number = 0; i < x_max; i++) {
                buffer[i] = data[srcIndex + i];
            }
            srcIndex += x_max + x_pixel_advance;
        } else {
            let bufferIndex: number = 0;
            for (let x: number = 0; x < x_max; x++, bufferIndex++, srcIndex++) {
                buffer[bufferIndex] = data[srcIndex] & color_mask;
            }
            srcIndex += x_pixel_advance;
        }
    }
}
function tile_data(data: color_t[], index: number): color_t[] {
    return data.slice(900 * index, 900 * index + 900);
}
function draw_footprint_size1(image_id: number, x: number, y: number, color_mask: color_t): void {
    let data: color_t[] = image_data(image_id);
    draw_footprint_tile(tile_data(data, 0), x, y, color_mask);
}
function draw_footprint_size2(image_id: number, x: number, y: number, color_mask: color_t): void {
    let data: color_t[] = image_data(image_id);
    let index: number = 0;
    draw_footprint_tile(tile_data(data, index++), x, y, color_mask);
    draw_footprint_tile(tile_data(data, index++), x - 30, y + 15, color_mask);
    draw_footprint_tile(tile_data(data, index++), x + 30, y + 15, color_mask);
    draw_footprint_tile(tile_data(data, index++), x, y + 30, color_mask);
}
function draw_footprint_size3(image_id: number, x: number, y: number, color_mask: color_t): void {
    let data: color_t[] = image_data(image_id);
    let index: number = 0;
    draw_footprint_tile(tile_data(data, index++), x, y, color_mask);
    draw_footprint_tile(tile_data(data, index++), x - 30, y + 15, color_mask);
    draw_footprint_tile(tile_data(data, index++), x + 30, y + 15, color_mask);
    draw_footprint_tile(tile_data(data, index++), x - 60, y + 30, color_mask);
    draw_footprint_tile(tile_data(data, index++), x, y + 30, color_mask);
    draw_footprint_tile(tile_data(data, index++), x + 60, y + 30, color_mask);
    draw_footprint_tile(tile_data(data, index++), x - 30, y + 45, color_mask);
    draw_footprint_tile(tile_data(data, index++), x + 30, y + 45, color_mask);
    draw_footprint_tile(tile_data(data, index++), x, y + 60, color_mask);
}
function draw_footprint_size4(image_id: number, x: number, y: number, color_mask: color_t): void {
    let data: color_t[] = image_data(image_id);
    let index: number = 0;
    draw_footprint_tile(tile_data(data, index++), x, y, color_mask);
    draw_footprint_tile(tile_data(data, index++), x - 30, y + 15, color_mask);
    draw_footprint_tile(tile_data(data, index++), x + 30, y + 15, color_mask);
    draw_footprint_tile(tile_data(data, index++), x - 60, y + 30, color_mask);
    draw_footprint_tile(tile_data(data, index++), x, y + 30, color_mask);
    draw_footprint_tile(tile_data(data, index++), x + 60, y + 30, color_mask);
    draw_footprint_tile(tile_data(data, index++), x - 90, y + 45, color_mask);
    draw_footprint_tile(tile_data(data, index++), x - 30, y + 45, color_mask);
    draw_footprint_tile(tile_data(data, index++), x + 30, y + 45, color_mask);
    draw_footprint_tile(tile_data(data, index++), x + 90, y + 45, color_mask);
    draw_footprint_tile(tile_data(data, index++), x - 60, y + 60, color_mask);
    draw_footprint_tile(tile_data(data, index++), x, y + 60, color_mask);
    draw_footprint_tile(tile_data(data, index++), x + 60, y + 60, color_mask);
    draw_footprint_tile(tile_data(data, index++), x - 30, y + 75, color_mask);
    draw_footprint_tile(tile_data(data, index++), x + 30, y + 75, color_mask);
    draw_footprint_tile(tile_data(data, index++), x, y + 90, color_mask);
}
function draw_footprint_size5(image_id: number, x: number, y: number, color_mask: color_t): void {
    let data: color_t[] = image_data(image_id);
    let index: number = 0;
    draw_footprint_tile(tile_data(data, index++), x, y, color_mask);
    draw_footprint_tile(tile_data(data, index++), x - 30, y + 15, color_mask);
    draw_footprint_tile(tile_data(data, index++), x + 30, y + 15, color_mask);
    draw_footprint_tile(tile_data(data, index++), x - 60, y + 30, color_mask);
    draw_footprint_tile(tile_data(data, index++), x, y + 30, color_mask);
    draw_footprint_tile(tile_data(data, index++), x + 60, y + 30, color_mask);
    draw_footprint_tile(tile_data(data, index++), x - 90, y + 45, color_mask);
    draw_footprint_tile(tile_data(data, index++), x - 30, y + 45, color_mask);
    draw_footprint_tile(tile_data(data, index++), x + 30, y + 45, color_mask);
    draw_footprint_tile(tile_data(data, index++), x + 90, y + 45, color_mask);
    draw_footprint_tile(tile_data(data, index++), x - 120, y + 60, color_mask);
    draw_footprint_tile(tile_data(data, index++), x - 60, y + 60, color_mask);
    draw_footprint_tile(tile_data(data, index++), x, y + 60, color_mask);
    draw_footprint_tile(tile_data(data, index++), x + 60, y + 60, color_mask);
    draw_footprint_tile(tile_data(data, index++), x + 120, y + 60, color_mask);
    draw_footprint_tile(tile_data(data, index++), x - 90, y + 75, color_mask);
    draw_footprint_tile(tile_data(data, index++), x - 30, y + 75, color_mask);
    draw_footprint_tile(tile_data(data, index++), x + 30, y + 75, color_mask);
    draw_footprint_tile(tile_data(data, index++), x + 90, y + 75, color_mask);
    draw_footprint_tile(tile_data(data, index++), x - 60, y + 90, color_mask);
    draw_footprint_tile(tile_data(data, index++), x, y + 90, color_mask);
    draw_footprint_tile(tile_data(data, index++), x + 60, y + 90, color_mask);
    draw_footprint_tile(tile_data(data, index++), x - 30, y + 105, color_mask);
    draw_footprint_tile(tile_data(data, index++), x + 30, y + 105, color_mask);
    draw_footprint_tile(tile_data(data, index++), x, y + 120, color_mask);
}
export function image_draw(image_id: number, x: number, y: number): void {
    let img: image = image_get(image_id);
    let data: color_t[] = image_data(image_id);
    if (!data) {
        return;
    }
    if (img.draw.is_fully_compressed) {
        draw_compressed(img, data, x, y, img.height);
    } else {
        draw_uncompressed(img, data, x, y, 0, draw_type.DRAW_TYPE_NONE);
    }
}
export function image_draw_enemy(image_id: number, x: number, y: number): void {
    if (image_id <= 0 || image_id >= 801) {
        return;
    }
    let img: image = image_get_enemy(image_id);
    let data: color_t[] = image_data_enemy(image_id);
    if (data) {
        draw_compressed(img, data, x, y, img.height);
    }
}
export function image_draw_masked(image_id: number, x: number, y: number, color_mask: color_t): void {
    let img: image = image_get(image_id);
    let data: color_t[] = image_data(image_id);
    if (!data) {
        return;
    }
    if (img.draw.type === image_type.IMAGE_TYPE_ISOMETRIC) {
        log_error("use image_draw_isometric_footprint for isometric!", 0, image_id);
        return;
    }
    if (img.draw.is_fully_compressed) {
        if (!color_mask) {
            draw_compressed(img, data, x, y, img.height);
        } else {
            draw_compressed_and(img, data, x, y, img.height, color_mask);
        }
    } else {
        draw_uncompressed(img, data, x, y,
            color_mask, color_mask ? draw_type.DRAW_TYPE_AND : draw_type.DRAW_TYPE_NONE);
    }
}
export function image_draw_blend(image_id: number, x: number, y: number, color: color_t): void {
    let img: image = image_get(image_id);
    let data: color_t[] = image_data(image_id);
    if (!data) {
        return;
    }
    if (img.draw.type === image_type.IMAGE_TYPE_ISOMETRIC) {
        return;
    }
    if (img.draw.is_fully_compressed) {
        draw_compressed_blend(img, data, x, y, img.height, color);
    } else {
        draw_uncompressed(img, data, x, y, color, draw_type.DRAW_TYPE_BLEND);
    }
}
export function image_draw_blend_alpha(image_id: number, x: number, y: number, color: color_t): void {
    let img: image = image_get(image_id);
    let data: color_t[] = image_data(image_id);
    if (!data) {
        return;
    }
    if (img.draw.type === image_type.IMAGE_TYPE_ISOMETRIC) {
        return;
    }
    if (img.draw.is_fully_compressed) {
        draw_compressed_blend_alpha(img, data, x, y, img.height, color);
    } else {
        draw_uncompressed(img, data, x, y, color, draw_type.DRAW_TYPE_BLEND_ALPHA);
    }
}
function draw_multibyte_letter(font: font_t, img: image, data: color_t[], x: number, y: number, color: color_t): void {
    switch (font) {
        case FONT_NORMAL_WHITE:
            draw_uncompressed(img, data, x + 1, y + 1, 0x311c10, draw_type.DRAW_TYPE_BLEND_ALPHA);
            draw_uncompressed(img, data, x, y, COLOR_WHITE, draw_type.DRAW_TYPE_BLEND_ALPHA);
            break;
        case FONT_NORMAL_RED:
            draw_uncompressed(img, data, x + 1, y + 1, 0xe7cfad, draw_type.DRAW_TYPE_BLEND_ALPHA);
            draw_uncompressed(img, data, x, y, 0x731408, draw_type.DRAW_TYPE_BLEND_ALPHA);
            break;
        case FONT_NORMAL_GREEN:
            draw_uncompressed(img, data, x + 1, y + 1, 0xe7cfad, draw_type.DRAW_TYPE_BLEND_ALPHA);
            draw_uncompressed(img, data, x, y, 0x180800, draw_type.DRAW_TYPE_BLEND_ALPHA);
            break;
        case FONT_NORMAL_BLACK:
        case FONT_LARGE_BLACK:
            draw_uncompressed(img, data, x + 1, y + 1, 0xcead9c, draw_type.DRAW_TYPE_BLEND_ALPHA);
            draw_uncompressed(img, data, x, y, COLOR_BLACK, draw_type.DRAW_TYPE_BLEND_ALPHA);
            break;
        default: // Plain + brown
            draw_uncompressed(img, data, x, y, color, draw_type.DRAW_TYPE_BLEND_ALPHA);
            break;
    }
}
export function image_draw_letter(font: font_t, letter_id: number, x: number, y: number, color: color_t): void {
    let img: image = image_letter(letter_id);
    let data: color_t[] = image_data_letter(letter_id);
    if (!data) {
        return;
    }
    if (letter_id >= IMAGE_FONT_MULTIBYTE_OFFSET) {
        draw_multibyte_letter(font, img, data, x, y, color);
        return;
    }
    if (img.draw.is_fully_compressed) {
        if (color) {
            draw_compressed_set(img, data, x, y, img.height, color);
        } else {
            draw_compressed(img, data, x, y, img.height);
        }
    } else {
        draw_uncompressed(img, data, x, y,
            color, color ? draw_type.DRAW_TYPE_SET : draw_type.DRAW_TYPE_NONE);
    }
}
export function image_draw_fullscreen_background(image_id: number): void {
    let s_width: number = screen_width();
    let s_height: number = screen_height();
    if (s_width > 1024 || s_height > 768) {
        graphics_clear_screen();
    }
    image_draw(image_id, (s_width - 1024) / 2, (s_height - 768) / 2);
}
export function image_draw_isometric_footprint(image_id: number, x: number, y: number, color_mask: color_t): void {
    let img: image = image_get(image_id);
    if (img.draw.type !== image_type.IMAGE_TYPE_ISOMETRIC) {
        return;
    }
    switch (img.width) {
        case 58:
            draw_footprint_size1(image_id, x, y, color_mask);
            break;
        case 118:
            draw_footprint_size2(image_id, x, y, color_mask);
            break;
        case 178:
            draw_footprint_size3(image_id, x, y, color_mask);
            break;
        case 238:
            draw_footprint_size4(image_id, x, y, color_mask);
            break;
        case 298:
            draw_footprint_size5(image_id, x, y, color_mask);
            break;
    }
}
export function image_draw_isometric_footprint_from_draw_tile(image_id: number, x: number, y: number, color_mask: color_t): void {
    let img: image = image_get(image_id);
    if (img.draw.type !== image_type.IMAGE_TYPE_ISOMETRIC) {
        return;
    }
    switch (img.width) {
        case 58:
            draw_footprint_size1(image_id, x, y, color_mask);
            break;
        case 118:
            draw_footprint_size2(image_id, x + 30, y - 15, color_mask);
            break;
        case 178:
            draw_footprint_size3(image_id, x + 60, y - 30, color_mask);
            break;
        case 238:
            draw_footprint_size4(image_id, x + 90, y - 45, color_mask);
            break;
        case 298:
            draw_footprint_size5(image_id, x + 120, y - 60, color_mask);
            break;
    }
}
export function image_draw_isometric_top(image_id: number, x: number, y: number, color_mask: color_t): void {
    let img: image = image_get(image_id);
    if (img.draw.type !== image_type.IMAGE_TYPE_ISOMETRIC) {
        return;
    }
    if (!img.draw.has_compressed_part) {
        return;
    }
    let imgData: color_t[] = image_data(image_id);
    let data: color_t[] = imgData.slice(img.draw.uncompressed_length);
    let height: number = img.height;
    switch (img.width) {
        case 58:
            y -= img.height - 30;
            height -= 16;
            break;
        case 118:
            x -= 30;
            y -= img.height - 60;
            height -= 31;
            break;
        case 178:
            x -= 60;
            y -= img.height - 90;
            height -= 46;
            break;
        case 238:
            x -= 90;
            y -= img.height - 120;
            height -= 61;
            break;
        case 298:
            x -= 120;
            y -= img.height - 150;
            height -= 76;
            break;
    }
    if (!color_mask) {
        draw_compressed(img, data, x, y, height);
    } else {
        draw_compressed_and(img, data, x, y, height, color_mask);
    }
}
export function image_draw_isometric_top_from_draw_tile(image_id: number, x: number, y: number, color_mask: color_t): void {
    let img: image = image_get(image_id);
    if (img.draw.type !== image_type.IMAGE_TYPE_ISOMETRIC) {
        return;
    }
    if (!img.draw.has_compressed_part) {
        return;
    }
    let imgData: color_t[] = image_data(image_id);
    let data: color_t[] = imgData.slice(img.draw.uncompressed_length);
    let height: number = img.height;
    switch (img.width) {
        case 58:
            y -= img.height - 30;
            height -= 16;
            break;
        case 118:
            y -= img.height - 45;
            height -= 31;
            break;
        case 178:
            y -= img.height - 60;
            height -= 46;
            break;
        case 238:
            y -= img.height - 75;
            height -= 61;
            break;
        case 298:
            y -= img.height - 90;
            height -= 76;
            break;
    }
    if (!color_mask) {
        draw_compressed(img, data, x, y, height);
    } else {
        draw_compressed_and(img, data, x, y, height, color_mask);
    }
}
function color_average(img: image, data: color_t[], x: number, y: number, scale_factor: number): color_t {
    let baseX: number = x * scale_factor;
    let baseY: number = y * scale_factor;
    let rb: number = 0;
    let g: number = 0;
    let num_colors: number = 0;
    let num_transparent: number = 0;
    let max_x: number = baseX + scale_factor;
    let max_y: number = baseY + scale_factor;
    let currentY: number = baseY;
    while (currentY < max_y) {
        if (currentY === img.height) {
            break;
        }
        let current_x: number = baseX;
        while (current_x < max_x) {
            if (current_x === img.width) {
                break;
            }
            let color: color_t = data[currentY * img.width + current_x];
            if (color === COLOR_SG2_TRANSPARENT) {
                num_transparent++;
            } else {
                // Note: keeping the R and B channels on the same int limits scale_factor to a maximum of 16
                rb += color & 0xff00ff;
                g += color & 0xff00;
                num_colors++;
            }
            current_x++;
        }
        currentY++;
    }
    if (num_transparent > num_colors) {
        return COLOR_SG2_TRANSPARENT;
    }
    return ((rb / num_colors) & 0xff0000) | ((g / num_colors) & 0xff00) | ((rb & 0xff) / num_colors);
}
export function image_draw_scaled_down(image_id: number, x_offset: number, y_offset: number, scale_factor: number): void {
    let img: image = image_get(image_id);
    let data: color_t[] = image_data(image_id);
    if (!data || img.draw.type === image_type.IMAGE_TYPE_ISOMETRIC || img.draw.is_fully_compressed || !scale_factor) {
        return;
    }
    let width: number = img.width / scale_factor;
    let height: number = img.height / scale_factor;
    if (!width || !height) {
        return;
    }
    let clip: clip_info = graphics_get_clip_info(x_offset, y_offset, width, height);
    if (!clip.is_visible) {
        return;
    }
    for (let y: number = clip.clipped_pixels_top; y < height - clip.clipped_pixels_bottom; y++) {
        let dst: color_t[] = graphics_get_pixel(x_offset + clip.clipped_pixels_left, y_offset + y);
        let dstIndex: number = 0;
        let x_max: number = width - clip.clipped_pixels_right;
        for (let x: number = clip.clipped_pixels_left; x < x_max; x++, dstIndex++) {
            dst[dstIndex] = color_average(img, data, x, y, scale_factor);
        }
    }
}
