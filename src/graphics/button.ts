import { image_group } from 'core/image';
import { group_terrain } from 'core/image_group';
import { image_draw } from 'graphics/image';
import { BLOCK_SIZE } from 'graphics/panel';
;
import GROUP_BORDERED_BUTTON = group_terrain.GROUP_BORDERED_BUTTON;
export function button_none(param1: number, param2: number) {
}
export function button_border_draw(x: number, y: number, width_pixels: number, height_pixels: number, has_focus: number) {
    let width_blocks: number = width_pixels / BLOCK_SIZE;
    if (width_pixels % BLOCK_SIZE) {
        width_blocks++;
    }
    let height_blocks: number = height_pixels / BLOCK_SIZE;
    if (height_pixels % BLOCK_SIZE) {
        height_blocks++;
    }
    let last_block_offset_x: number = BLOCK_SIZE * width_blocks - width_pixels;
    let last_block_offset_y: number = BLOCK_SIZE * height_blocks - height_pixels;
    let image_base: number = image_group(GROUP_BORDERED_BUTTON);
    if (has_focus) {
        image_base += 8
    }
    for (let yy: number = 0; yy < height_blocks; yy++) {
        let draw_offset_y: number = y + BLOCK_SIZE * yy;
        for (let xx: number = 0; xx < width_blocks; xx++) {
            let draw_offset_x: number = x + BLOCK_SIZE * xx;
            if (yy == 0) {
                if (xx == 0) {
                    image_draw(image_base, draw_offset_x, draw_offset_y);
                } else if (xx < width_blocks - 1) {
                    image_draw(image_base + 1, draw_offset_x, draw_offset_y);
                } else {
                    image_draw(image_base + 2, draw_offset_x - last_block_offset_x, draw_offset_y);
                }
            } else if (yy < height_blocks - 1) {
                if (xx == 0) {
                    image_draw(image_base + 7, draw_offset_x, draw_offset_y);
                } else if (xx >= width_blocks - 1) {
                    image_draw(image_base + 3, draw_offset_x - last_block_offset_x, draw_offset_y);
                }
            } else {
                if (xx == 0) {
                    image_draw(image_base + 6, draw_offset_x, draw_offset_y - last_block_offset_y);
                } else if (xx < width_blocks - 1) {
                    image_draw(image_base + 5, draw_offset_x, draw_offset_y - last_block_offset_y);
                } else {
                    image_draw(image_base + 4,
                        draw_offset_x - last_block_offset_x, draw_offset_y - last_block_offset_y);
                }
            }
        }
    }
}
