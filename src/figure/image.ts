import { city_view_orientation } from 'city/view';
import { figure_action } from 'figure/action';
import { figure } from 'figure/figure';
import FIGURE_ACTION_149_CORPSE = figure_action.FIGURE_ACTION_149_CORPSE;
let CORPSE_IMAGE_OFFSETS: number[] = [
    0, 1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
    5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
    5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
    6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7,
    7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
    7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
    7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7
];
let MISSILE_LAUNCHER_OFFSETS: number[] = [
    0, 1, 2, 3, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];
let CART_OFFSETS_X: number[] = [13, 18, 12, 0, -13, -18, -13, 0];
let CART_OFFSETS_Y: number[] = [-7, -1, 7, 11, 6, -1, -7, -12];
export function figure_image_update(f: figure, image_base: number) {
    if (f.action_state == FIGURE_ACTION_149_CORPSE) {
        f.image_id = image_base + CORPSE_IMAGE_OFFSETS[f.wait_ticks / 2] + 96;
    } else {
        f.image_id = image_base + figure_image_direction(f) + 8 * f.image_offset;
    }
}
export function figure_image_increase_offset(f: figure, max: number) {
    f.image_offset++;
    if (f.image_offset >= max) {
        f.image_offset = 0;
    }
}
export function figure_image_set_cart_offset(f: figure, direction: number) {
    f.x_offset_cart = CART_OFFSETS_X[direction];
    f.y_offset_cart = CART_OFFSETS_Y[direction];
}
export function figure_image_corpse_offset(f: figure) {
    return CORPSE_IMAGE_OFFSETS[f.wait_ticks / 2];
}
export function figure_image_missile_launcher_offset(f: figure) {
    return MISSILE_LAUNCHER_OFFSETS[f.attack_image_offset / 2];
}
export function figure_image_direction(f: figure) {
    let dir: number = f.direction - city_view_orientation();
    if (dir < 0) {
        dir += 8;
    }
    return dir;
}
export function figure_image_normalize_direction(direction: number) {
    let normalized_direction: number = direction - city_view_orientation();
    if (normalized_direction < 0) {
        normalized_direction += 8;
    }
    return normalized_direction;
}
