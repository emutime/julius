import { COLOR_SG2_TRANSPARENT } from 'graphics/color';
export const COMPONENT = 24;
export const MIX_RB = 16711935;
export const MIX_G = 65280;
import { COLOR_MASK_NONE } from 'graphics/color';
export const FOOTPRINT_WIDTH = 58;
export const FOOTPRINT_HEIGHT = 30;
import { COLOR_WHITE } from 'graphics/color';
import { COLOR_BLACK } from 'graphics/color';
import { IMAGE_FONT_MULTIBYTE_OFFSET } from 'core/image';
import { language_type } from 'core/locale';
import { encoding_type } from 'core/encoding';
import { color_t } from 'graphics/color';
export const enum image_type {
    IMAGE_TYPE_WITH_TRANSPARENCY = 0,
    IMAGE_TYPE_ISOMETRIC = 30
};
import IMAGE_TYPE_WITH_TRANSPARENCY = image_type.IMAGE_TYPE_WITH_TRANSPARENCY;
import IMAGE_TYPE_ISOMETRIC = image_type.IMAGE_TYPE_ISOMETRIC;
import { image } from 'core/image';
import { image_get } from 'core/image';
import { image_letter } from 'core/image';
import { image_get_enemy } from 'core/image';
import { image_data } from 'core/image';
import { image_data_letter } from 'core/image';
import { image_data_enemy } from 'core/image';
import { font_t } from 'graphics/font';
import FONT_NORMAL_BLACK = font_t.FONT_NORMAL_BLACK;
import FONT_NORMAL_WHITE = font_t.FONT_NORMAL_WHITE;
import FONT_NORMAL_RED = font_t.FONT_NORMAL_RED;
import FONT_LARGE_BLACK = font_t.FONT_LARGE_BLACK;
import FONT_NORMAL_GREEN = font_t.FONT_NORMAL_GREEN;
import { font_definition } from 'graphics/font';
import { log_error } from 'core/log';
import { clip_code } from 'graphics/graphics';
import CLIP_NONE = clip_code.CLIP_NONE;
import CLIP_LEFT = clip_code.CLIP_LEFT;
import CLIP_RIGHT = clip_code.CLIP_RIGHT;
import CLIP_BOTH = clip_code.CLIP_BOTH;
import { clip_info } from 'graphics/graphics';
import { graphics_get_clip_info } from 'graphics/graphics';
import { graphics_get_pixel } from 'graphics/graphics';
import { graphics_clear_screen } from 'graphics/graphics';
import { screen_width } from 'graphics/screen';
import { screen_height } from 'graphics/screen';
import { memcpy } from '../../ext/crt';

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
        let x_max: number = img.width - clip.clipped_pixels_right;
        if (type === draw_type.DRAW_TYPE_NONE) {
            if (img.draw.type === image_type.IMAGE_TYPE_WITH_TRANSPARENCY || img.draw.is_external) {
                for (let x: number = clip.clipped_pixels_left; x < x_max; x++, dst++) {
                    if (data[dataIndex] !== COLOR_SG2_TRANSPARENT) {
                        dst[0] = data[dataIndex];
                    }
                    dataIndex++;
                }
            } else {
                let num_pixels: number = x_max - clip.clipped_pixels_left;
                memcpy(dst, data, num_pixels);
                dataIndex += num_pixels;
            }
        } else if (type === draw_type.DRAW_TYPE_SET) {
            for (let x: number = clip.clipped_pixels_left; x < x_max; x++, dst++) {
                if (data[dataIndex] !== COLOR_SG2_TRANSPARENT) {
                    dst[0] = color;
                }
                dataIndex++;
            }
        } else if (type === draw_type.DRAW_TYPE_AND) {
            for (let x: number = clip.clipped_pixels_left; x < x_max; x++, dst++) {
                if (data[dataIndex] !== COLOR_SG2_TRANSPARENT) {
                    dst[0] = data[dataIndex] & color;
                }
                dataIndex++;
            }
        } else if (type === draw_type.DRAW_TYPE_BLEND) {
            for (let x: number = clip.clipped_pixels_left; x < x_max; x++, dst++) {
                if (data[dataIndex] !== COLOR_SG2_TRANSPARENT) {
                    dst[0] &= color;
                }
                dataIndex++;
            }
        } else if (type === draw_type.DRAW_TYPE_BLEND_ALPHA) {
            for (let x: number = clip.clipped_pixels_left; x < x_max; x++, dst++) {
                if (data[dataIndex] !== COLOR_SG2_TRANSPARENT) {
                    let alpha: color_t = COMPONENT;
                    if (alpha === 255) {
                        dst[0] = color;
                    } else {
                        let s: color_t = color;
                        let d: color_t = dst[0];
                        dst[0] = MIX_RB(s, d, alpha) | MIX_G;
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
    let unclipped: number = clip.clip_x === CLIP_NONE;
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
                if (unclipped) {
                    x += b;
                    memcpy(dst, data, b);
                } else {
                    while (b > 0) {
                        if (x >= clip.clipped_pixels_left && x < img.width - clip.clipped_pixels_right) {
                            dst[0] = data[pixelsIndex];
                        }
                        dst++;
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
    let unclipped: number = clip.clip_x === CLIP_NONE;
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
                if (unclipped) {
                    x += b;
                    while (b > 0) {
                        dst[0] = color;
                        dst++;
                        b--;
                    }
                } else {
                    while (b > 0) {
                        if (x >= clip.clipped_pixels_left && x < img.width - clip.clipped_pixels_right) {
                            dst[0] = color;
                        }
                        dst++;
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
    let unclipped: number = clip.clip_x === CLIP_NONE;
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
                if (unclipped) {
                    x += b;
                    while (b > 0) {
                        dst[0] = data[pixelsIndex] & color;
                        dst++;
                        pixelsIndex++;
                        b--;
                    }
                } else {
                    while (b > 0) {
                        if (x >= clip.clipped_pixels_left && x < img.width - clip.clipped_pixels_right) {
                            dst[0] = data[pixelsIndex] & color;
                        }
                        dst++;
                        x++;
                        pixelsIndex++;
                        b--;
                    }
                }
            }
        }
    }
}
function draw_compressed_blend(img: image, data: color_t, x_offset: number, y_offset: number, height: number, color: color_t) {
    let clip: clip_info = graphics_get_clip_info(x_offset, y_offset, img.width, height);
    if (!clip.is_visible) {
        return;
    }
    let unclipped: number = clip.clip_x == CLIP_NONE;
    for (let y: number = 0; y < height - clip.clipped_pixels_bottom; y++) {
        let x: number = 0;
        while (x < img.width) {
                    color_t b = * data;
            data++;
            if (b == 255) {
                // transparent pixels to skip
                x += * data;
                data++;
            } else if (y < clip.clipped_pixels_top) {
                data += b;
                x += b;
            } else {
                data += b;
                color_t * dst = graphics_get_pixel(x_offset + x, y_offset + y);
                if (unclipped) {
                    x += b;
                    while (b) {
                                * dst &= color;
                        dst++;
                        b--;
                    }
                } else {
                    while (b) {
                        if (x >= clip.clipped_pixels_left && x < img.width - clip.clipped_pixels_right) {
                                    * dst &= color;
                        }
                        dst++;
                        x++;
                        b--;
                    }
                }
            }
        }
    }
}
function draw_compressed_blend_alpha(img: image, data: color_t, x_offset: number, y_offset: number, height: number, color: color_t) {
    let clip: clip_info = graphics_get_clip_info(x_offset, y_offset, img.width, height);
    if (!clip.is_visible) {
        return;
    }
    let alpha: color_t = COMPONENT;
    if (!alpha) {
        return;
    }
    if (alpha == 255) {
        draw_compressed_set(img, data, x_offset, y_offset, height, color);
        return;
    }
    let alpha_dst: color_t = 256 - alpha;
    let src_rb: color_t = (color & 0xff00ff) * alpha;
    let src_g: color_t = (color & 0x00ff00) * alpha;
    let unclipped: number = clip.clip_x == CLIP_NONE;
    for (let y: number = 0; y < height - clip.clipped_pixels_bottom; y++) {
        let x: number = 0;
        let dst: color_t = graphics_get_pixel(x_offset, y_offset + y);
        while (x < img.width) {
                    color_t b = * data;
            data++;
            if (b == 255) {
                // transparent pixels to skip
                x += * data;
                dst += * data;
                data++;
            } else if (y < clip.clipped_pixels_top) {
                data += b;
                x += b;
                dst += b;
            } else {
                data += b;
                if (unclipped) {
                    x += b;
                    while (b) {
                                color_t d = * dst;
                                * dst = (((src_rb + (d & 0xff00ff) * alpha_dst) & 0xff00ff00) |
                            ((src_g + (d & 0x00ff00) * alpha_dst) & 0x00ff0000)) >> 8;
                        b--;
                        dst++;
                    }
                } else {
                    while (b) {
                        if (x >= clip.clipped_pixels_left && x < img.width - clip.clipped_pixels_right) {
                                    color_t d = * dst;
                                    * dst = (((src_rb + (d & 0xff00ff) * alpha_dst) & 0xff00ff00) |
                                ((src_g + (d & 0x00ff00) * alpha_dst) & 0x00ff0000)) >> 8;
                        }
                        dst++;
                        x++;
                        b--;
                    }
                }
            }
        }
    }
}
function draw_footprint_simple(src: color_t, x: number, y: number) {
    memcpy(graphics_get_pixel(x + 28, y + 0), src[0], 2);
    memcpy(graphics_get_pixel(x + 26, y + 1), src[2], 6);
    memcpy(graphics_get_pixel(x + 24, y + 2), src[8], 10);
    memcpy(graphics_get_pixel(x + 22, y + 3), src[18], 14);
    memcpy(graphics_get_pixel(x + 20, y + 4), src[32], 18);
    memcpy(graphics_get_pixel(x + 18, y + 5), src[50], 22);
    memcpy(graphics_get_pixel(x + 16, y + 6), src[72], 26);
    memcpy(graphics_get_pixel(x + 14, y + 7), src[98], 30);
    memcpy(graphics_get_pixel(x + 12, y + 8), src[128], 34);
    memcpy(graphics_get_pixel(x + 10, y + 9), src[162], 38);
    memcpy(graphics_get_pixel(x + 8, y + 10), src[200], 42);
    memcpy(graphics_get_pixel(x + 6, y + 11), src[242], 46);
    memcpy(graphics_get_pixel(x + 4, y + 12), src[288], 50);
    memcpy(graphics_get_pixel(x + 2, y + 13), src[338], 54);
    memcpy(graphics_get_pixel(x + 0, y + 14), src[392], 58);
    memcpy(graphics_get_pixel(x + 0, y + 15), src[450], 58);
    memcpy(graphics_get_pixel(x + 2, y + 16), src[508], 54);
    memcpy(graphics_get_pixel(x + 4, y + 17), src[562], 50);
    memcpy(graphics_get_pixel(x + 6, y + 18), src[612], 46);
    memcpy(graphics_get_pixel(x + 8, y + 19), src[658], 42);
    memcpy(graphics_get_pixel(x + 10, y + 20), src[700], 38);
    memcpy(graphics_get_pixel(x + 12, y + 21), src[738], 34);
    memcpy(graphics_get_pixel(x + 14, y + 22), src[772], 30);
    memcpy(graphics_get_pixel(x + 16, y + 23), src[802], 26);
    memcpy(graphics_get_pixel(x + 18, y + 24), src[828], 22);
    memcpy(graphics_get_pixel(x + 20, y + 25), src[850], 18);
    memcpy(graphics_get_pixel(x + 22, y + 26), src[868], 14);
    memcpy(graphics_get_pixel(x + 24, y + 27), src[882], 10);
    memcpy(graphics_get_pixel(x + 26, y + 28), src[892], 6);
    memcpy(graphics_get_pixel(x + 28, y + 29), src[898], 2);
}
function draw_footprint_tile(data: color_t, x_offset: number, y_offset: number, color_mask: color_t) {
    if (!color_mask) {
        color_mask = COLOR_MASK_NONE;
    }
    let clip: clip_info = graphics_get_clip_info(x_offset, y_offset, FOOTPRINT_WIDTH, FOOTPRINT_HEIGHT);
    if (!clip.is_visible) {
        return;
    }
    if (clip.clip_y == CLIP_NONE && clip.clip_x == CLIP_NONE && color_mask == COLOR_MASK_NONE) {
        draw_footprint_simple(data, x_offset, y_offset);
        return;
    }
    let clip_left: number = clip.clip_x == CLIP_LEFT || clip.clip_x == CLIP_BOTH;
    let clip_right: number = clip.clip_x == CLIP_RIGHT || clip.clip_x == CLIP_BOTH;
    let src: color_t = data[FOOTPRINT_OFFSET_PER_HEIGHT[clip.clipped_pixels_top]];
    for (let y: number = clip.clipped_pixels_top; y < clip.clipped_pixels_top + clip.visible_pixels_y; y++) {
        let x_start: number = FOOTPRINT_X_START_PER_HEIGHT[y];
        let x_max: number = 58 - x_start * 2;
        let x_pixel_advance: number = 0;
        if (clip_left) {
            if (clip.clipped_pixels_left + clip.visible_pixels_x < x_start) {
                src += x_max
                continue
            }
            if (clip.clipped_pixels_left > x_start) {
                let pixels_to_reduce: number = clip.clipped_pixels_left - x_start;
                if (pixels_to_reduce >= x_max) {
                    src += x_max
                    continue
                }
                src += pixels_to_reduce
                x_max -= pixels_to_reduce
                x_start = clip.clipped_pixels_left;
            }
        }
        if (clip_right) {
            let clip_x: number = 58 - clip.clipped_pixels_right;
            if (clip_x < x_start) {
                src += x_max
                continue
            }
            if (x_start + x_max > clip_x) {
                let temp_x_max: number = clip_x - x_start;
                x_pixel_advance = x_max - temp_x_max;
                x_max = temp_x_max;
            }
        }
        let buffer: color_t = graphics_get_pixel(x_offset + x_start, y_offset + y);
        if (color_mask == COLOR_MASK_NONE) {
            memcpy(buffer, src, x_max);
            src += x_max + x_pixel_advance
        } else {
            for (let x: number = 0; x < x_max; x++, buffer++, src++) {
                * buffer = * src & color_mask;
            }
            src += x_pixel_advance
        }
    }
}
function tile_data(data: color_t, index: number) {
    return data[900 * index];
}
function draw_footprint_size1(image_id: number, x: number, y: number, color_mask: color_t) {
    let data: color_t = image_data(image_id);
    draw_footprint_tile(tile_data(data, 0), x, y, color_mask);
}
function draw_footprint_size2(image_id: number, x: number, y: number, color_mask: color_t) {
    let data: color_t = image_data(image_id);
    let index: number = 0;
    draw_footprint_tile(tile_data(data, index++), x, y, color_mask);
    draw_footprint_tile(tile_data(data, index++), x - 30, y + 15, color_mask);
    draw_footprint_tile(tile_data(data, index++), x + 30, y + 15, color_mask);
    draw_footprint_tile(tile_data(data, index++), x, y + 30, color_mask);
}
function draw_footprint_size3(image_id: number, x: number, y: number, color_mask: color_t) {
    let data: color_t = image_data(image_id);
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
function draw_footprint_size4(image_id: number, x: number, y: number, color_mask: color_t) {
    let data: color_t = image_data(image_id);
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
function draw_footprint_size5(image_id: number, x: number, y: number, color_mask: color_t) {
    let data: color_t = image_data(image_id);
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
export function image_draw(image_id: number, x: number, y: number) {
    let img: image = image_get(image_id);
    let data: color_t = image_data(image_id);
    if (!data) {
        return;
    }
    if (img.draw.is_fully_compressed) {
        draw_compressed(img, data, x, y, img.height);
    } else {
        draw_uncompressed(img, data, x, y, 0, DRAW_TYPE_NONE);
    }
}
export function image_draw_enemy(image_id: number, x: number, y: number) {
    if (image_id <= 0 || image_id >= 801) {
        return;
    }
    let img: image = image_get_enemy(image_id);
    let data: color_t = image_data_enemy(image_id);
    if (data) {
        draw_compressed(img, data, x, y, img.height);
    }
}
export function image_draw_masked(image_id: number, x: number, y: number, color_mask: color_t) {
    let img: image = image_get(image_id);
    let data: color_t = image_data(image_id);
    if (!data) {
        return;
    }
    if (img.draw.type == IMAGE_TYPE_ISOMETRIC) {
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
            color_mask, color_mask ? DRAW_TYPE_AND : DRAW_TYPE_NONE);
    }
}
export function image_draw_blend(image_id: number, x: number, y: number, color: color_t) {
    let img: image = image_get(image_id);
    let data: color_t = image_data(image_id);
    if (!data) {
        return;
    }
    if (img.draw.type == IMAGE_TYPE_ISOMETRIC) {
        return;
    }
    if (img.draw.is_fully_compressed) {
        draw_compressed_blend(img, data, x, y, img.height, color);
    } else {
        draw_uncompressed(img, data, x, y, color, DRAW_TYPE_BLEND);
    }
}
export function image_draw_blend_alpha(image_id: number, x: number, y: number, color: color_t) {
    let img: image = image_get(image_id);
    let data: color_t = image_data(image_id);
    if (!data) {
        return;
    }
    if (img.draw.type == IMAGE_TYPE_ISOMETRIC) {
        return;
    }
    if (img.draw.is_fully_compressed) {
        draw_compressed_blend_alpha(img, data, x, y, img.height, color);
    } else {
        draw_uncompressed(img, data, x, y, color, DRAW_TYPE_BLEND_ALPHA);
    }
}
function draw_multibyte_letter(font: font_t, img: image, data: color_t, x: number, y: number, color: color_t) {
    switch (font) {
        case FONT_NORMAL_WHITE:
            draw_uncompressed(img, data, x + 1, y + 1, 0x311c10, DRAW_TYPE_BLEND_ALPHA);
            draw_uncompressed(img, data, x, y, COLOR_WHITE, DRAW_TYPE_BLEND_ALPHA);
            break
        case FONT_NORMAL_RED:
            draw_uncompressed(img, data, x + 1, y + 1, 0xe7cfad, DRAW_TYPE_BLEND_ALPHA);
            draw_uncompressed(img, data, x, y, 0x731408, DRAW_TYPE_BLEND_ALPHA);
            break
        case FONT_NORMAL_GREEN:
            draw_uncompressed(img, data, x + 1, y + 1, 0xe7cfad, DRAW_TYPE_BLEND_ALPHA);
            draw_uncompressed(img, data, x, y, 0x180800, DRAW_TYPE_BLEND_ALPHA);
            break
        case FONT_NORMAL_BLACK:
        case FONT_LARGE_BLACK:
            draw_uncompressed(img, data, x + 1, y + 1, 0xcead9c, DRAW_TYPE_BLEND_ALPHA);
            draw_uncompressed(img, data, x, y, COLOR_BLACK, DRAW_TYPE_BLEND_ALPHA);
            break
        default: // Plain + brown
            draw_uncompressed(img, data, x, y, color, DRAW_TYPE_BLEND_ALPHA)
            break
    }
}
export function image_draw_letter(font: font_t, letter_id: number, x: number, y: number, color: color_t) {
    let img: image = image_letter(letter_id);
    let data: color_t = image_data_letter(letter_id);
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
            color, color ? DRAW_TYPE_SET : DRAW_TYPE_NONE);
    }
}
export function image_draw_fullscreen_background(image_id: number) {
    let s_width: number = screen_width();
    let s_height: number = screen_height();
    if (s_width > 1024 || s_height > 768) {
        graphics_clear_screen();
    }
    image_draw(image_id, (s_width - 1024) / 2, (s_height - 768) / 2);
}
export function image_draw_isometric_footprint(image_id: number, x: number, y: number, color_mask: color_t) {
    let img: image = image_get(image_id);
    if (img.draw.type != IMAGE_TYPE_ISOMETRIC) {
        return;
    }
    switch (img.width) {
        case 58:
            draw_footprint_size1(image_id, x, y, color_mask);
            break
        case 118:
            draw_footprint_size2(image_id, x, y, color_mask);
            break
        case 178:
            draw_footprint_size3(image_id, x, y, color_mask);
            break
        case 238:
            draw_footprint_size4(image_id, x, y, color_mask);
            break
        case 298:
            draw_footprint_size5(image_id, x, y, color_mask);
            break
    }
}
export function image_draw_isometric_footprint_from_draw_tile(image_id: number, x: number, y: number, color_mask: color_t) {
    let img: image = image_get(image_id);
    if (img.draw.type != IMAGE_TYPE_ISOMETRIC) {
        return;
    }
    switch (img.width) {
        case 58:
            draw_footprint_size1(image_id, x, y, color_mask);
            break
        case 118:
            draw_footprint_size2(image_id, x + 30, y - 15, color_mask);
            break
        case 178:
            draw_footprint_size3(image_id, x + 60, y - 30, color_mask);
            break
        case 238:
            draw_footprint_size4(image_id, x + 90, y - 45, color_mask);
            break
        case 298:
            draw_footprint_size5(image_id, x + 120, y - 60, color_mask);
            break
    }
}
export function image_draw_isometric_top(image_id: number, x: number, y: number, color_mask: color_t) {
    let img: image = image_get(image_id);
    if (img.draw.type != IMAGE_TYPE_ISOMETRIC) {
        return;
    }
    if (!img.draw.has_compressed_part) {
        return;
    }
    let data: color_t = image_data(image_id)[img.draw.uncompressed_length];
    let height: number = img.height;
    switch (img.width) {
        case 58:
            y -= img.height - 30
            height -= 16
            break
        case 118:
            x -= 30
            y -= img.height - 60
            height -= 31
            break
        case 178:
            x -= 60
            y -= img.height - 90
            height -= 46
            break
        case 238:
            x -= 90
            y -= img.height - 120
            height -= 61
            break
        case 298:
            x -= 120
            y -= img.height - 150
            height -= 76
            break
    }
    if (!color_mask) {
        draw_compressed(img, data, x, y, height);
    } else {
        draw_compressed_and(img, data, x, y, height, color_mask);
    }
}
export function image_draw_isometric_top_from_draw_tile(image_id: number, x: number, y: number, color_mask: color_t) {
    let img: image = image_get(image_id);
    if (img.draw.type != IMAGE_TYPE_ISOMETRIC) {
        return;
    }
    if (!img.draw.has_compressed_part) {
        return;
    }
    let data: color_t = image_data(image_id)[img.draw.uncompressed_length];
    let height: number = img.height;
    switch (img.width) {
        case 58:
            y -= img.height - 30
            height -= 16
            break
        case 118:
            y -= img.height - 45
            height -= 31
            break
        case 178:
            y -= img.height - 60
            height -= 46
            break
        case 238:
            y -= img.height - 75
            height -= 61
            break
        case 298:
            y -= img.height - 90
            height -= 76
            break
    }
    if (!color_mask) {
        draw_compressed(img, data, x, y, height);
    } else {
        draw_compressed_and(img, data, x, y, height, color_mask);
    }
}
function color_average(img: image, data: color_t, x: number, y: number, scale_factor: number) {
    x *= scale_factor
    y *= scale_factor
    let rb: number = 0
    let g: number = 0;
    let num_colors: number = 0;
    let num_transparent: number = 0;
    let max_x: number = x + scale_factor;
    let max_y: number = y + scale_factor;
    while (y < max_y) {
        if (y == img.height) {
            break;
        }
            int current_x = x;
        while (current_x < max_x) {
            if (current_x == img.width) {
                break;
            }
                color_t color = data[y * img.width + current_x];
            if (color == COLOR_SG2_TRANSPARENT) {
                num_transparent++;
            } else {
                // Note: keeping the R and B channels on the same int limits scale_factor to a maximum of 16
                rb += color & 0xff00ff;
                g += color & 0xff00;
                num_colors++;
            }
            current_x++;
        }
        y++;
    }
    if (num_transparent > num_colors) {
        return COLOR_SG2_TRANSPARENT;
    }
    return ((rb / num_colors) & 0xff0000) | ((g / num_colors) & 0xff00) | ((rb & 0xffff) / num_colors);
}
export function image_draw_scaled_down(image_id: number, x_offset: number, y_offset: number, scale_factor: number) {
    let img: image = image_get(image_id);
    let data: color_t = image_data(image_id);
    if (!data || img.draw.type == IMAGE_TYPE_ISOMETRIC || img.draw.is_fully_compressed || !scale_factor) {
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
        let dst: color_t = graphics_get_pixel(x_offset + clip.clipped_pixels_left, y_offset + y);
        let x_max: number = width - clip.clipped_pixels_right;
        for (let x: number = clip.clipped_pixels_left; x < x_max; x++, dst++) {
            * dst = color_average(img, data, x, y, scale_factor);
        }
    }
}
