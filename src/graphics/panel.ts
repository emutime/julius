export const BLOCK_SIZE = 16;
import { image_group } from 'core/image';
import { group_terrain } from 'core/image_group';
import { image_draw } from 'graphics/image';
;
import GROUP_PANEL_BUTTON = group_terrain.GROUP_PANEL_BUTTON;
import GROUP_DIALOG_BACKGROUND = group_terrain.GROUP_DIALOG_BACKGROUND;
import GROUP_SUNKEN_TEXTBOX_BACKGROUND = group_terrain.GROUP_SUNKEN_TEXTBOX_BACKGROUND;
export function outer_panel_draw(x: number, y: number, width_blocks: number, height_blocks: number) {
    let image_base: number = image_group(GROUP_DIALOG_BACKGROUND);
    let image_id: number;
    let image_y: number = 0;
    let y_add: number = 0;
    for (let yy: number = 0; yy < height_blocks; yy++) {
        let image_x: number = 0;
        for (let xx: number = 0; xx < width_blocks; xx++) {
            if (yy == 0) {
                if (xx == 0) {
                    image_id = 0;
                } else if (xx < width_blocks - 1) {
                    image_id = 1 + image_x++;
                } else {
                    image_id = 11;
                }
                y_add = 0;
            } else if (yy < height_blocks - 1) {
                if (xx == 0) {
                    image_id = 12 + image_y;
                } else if (xx < width_blocks - 1) {
                    image_id = 13 + image_y + image_x++;
                } else {
                    image_id = 23 + image_y;
                }
                y_add = 12;
            } else {
                if (xx == 0) {
                    image_id = 132;
                } else if (xx < width_blocks - 1) {
                    image_id = 133 + image_x++;
                } else {
                    image_id = 143;
                }
                y_add = 0;
            }
            image_draw(image_base + image_id, x + BLOCK_SIZE * xx, y + BLOCK_SIZE * yy);
            if (image_x >= 10) {
                image_x = 0;
            }
        }
        image_y += y_add
        if (image_y >= 120) {
            image_y = 0;
        }
    }
}
export function unbordered_panel_draw(x: number, y: number, width_blocks: number, height_blocks: number) {
    let image_base: number = image_group(GROUP_DIALOG_BACKGROUND);
    let image_y: number = 0;
    for (let yy: number = 0; yy < height_blocks; yy++) {
        let image_x: number = 0;
        for (let xx: number = 0; xx < width_blocks; xx++) {
            let image_id: number = 13 + image_y + image_x++;
            image_draw(image_base + image_id, x + BLOCK_SIZE * xx, y + BLOCK_SIZE * yy);
            if (image_x >= 10) {
                image_x = 0;
            }
        }
        image_y += 12
        if (image_y >= 120) {
            image_y = 0;
        }
    }
}
export function inner_panel_draw(x: number, y: number, width_blocks: number, height_blocks: number) {
    let image_base: number = image_group(GROUP_SUNKEN_TEXTBOX_BACKGROUND);
    let image_y: number = 0;
    let y_add: number = 0;
    for (let yy: number = 0; yy < height_blocks; yy++) {
        let image_x: number = 0;
        for (let xx: number = 0; xx < width_blocks; xx++) {
            let image_id: number;
            if (yy == 0) {
                if (xx == 0) {
                    image_id = 0;
                } else if (xx < width_blocks - 1) {
                    image_id = 1 + image_x++;
                } else {
                    image_id = 6;
                }
                y_add = 0;
            } else if (yy < height_blocks - 1) {
                if (xx == 0) {
                    image_id = 7 + image_y;
                } else if (xx < width_blocks - 1) {
                    image_id = 8 + image_y + image_x++;
                } else {
                    image_id = 13 + image_y;
                }
                y_add = 7;
            } else {
                if (xx == 0) {
                    image_id = 42;
                } else if (xx < width_blocks - 1) {
                    image_id = 43 + image_x++;
                } else {
                    image_id = 48;
                }
                y_add = 0;
            }
            image_draw(image_base + image_id, x + BLOCK_SIZE * xx, y + BLOCK_SIZE * yy);
            if (image_x >= 5) {
                image_x = 0;
            }
        }
        image_y += y_add
        if (image_y >= 35) {
            image_y = 0;
        }
    }
}
export function label_draw(x: number, y: number, width_blocks: number, type: number) {
    let image_base: number = image_group(GROUP_PANEL_BUTTON);
    for (let i: number = 0; i < width_blocks; i++) {
        let image_id: number;
        if (i == 0) {
            image_id = 3 * type + 40;
        } else if (i < width_blocks - 1) {
            image_id = 3 * type + 41;
        } else {
            image_id = 3 * type + 42;
        }
        image_draw(image_base + image_id, x + BLOCK_SIZE * i, y);
    }
}
export function large_label_draw(x: number, y: number, width_blocks: number, type: number) {
    let image_base: number = image_group(GROUP_PANEL_BUTTON);
    for (let i: number = 0; i < width_blocks; i++) {
        let image_id: number;
        if (i == 0) {
            image_id = 3 * type;
        } else if (i < width_blocks - 1) {
            image_id = 3 * type + 1;
        } else {
            image_id = 3 * type + 2;
        }
        image_draw(image_base + image_id, x + BLOCK_SIZE * i, y);
    }
}
