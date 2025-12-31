import { COLOR_WHITE } from 'graphics/color';
import { COLOR_MASK_LEGION_HIGHLIGHT } from 'graphics/color';
;
import { buffer } from 'core/buffer';
import { direction_type } from 'core/direction';
import DIR_0_TOP = direction_type.DIR_0_TOP;
import DIR_1_TOP_RIGHT = direction_type.DIR_1_TOP_RIGHT;
import DIR_2_RIGHT = direction_type.DIR_2_RIGHT;
import DIR_3_BOTTOM_RIGHT = direction_type.DIR_3_BOTTOM_RIGHT;
import DIR_4_BOTTOM = direction_type.DIR_4_BOTTOM;
import DIR_5_BOTTOM_LEFT = direction_type.DIR_5_BOTTOM_LEFT;
import DIR_6_LEFT = direction_type.DIR_6_LEFT;
import DIR_7_TOP_LEFT = direction_type.DIR_7_TOP_LEFT;
import { direction_type } from 'core/direction';
import { figure_type } from 'figure/type';
import FIGURE_IMMIGRANT = figure_type.FIGURE_IMMIGRANT;
import FIGURE_EMIGRANT = figure_type.FIGURE_EMIGRANT;
import FIGURE_CART_PUSHER = figure_type.FIGURE_CART_PUSHER;
import FIGURE_WAREHOUSEMAN = figure_type.FIGURE_WAREHOUSEMAN;
import FIGURE_FORT_STANDARD = figure_type.FIGURE_FORT_STANDARD;
import FIGURE_LION_TAMER = figure_type.FIGURE_LION_TAMER;
import FIGURE_MAP_FLAG = figure_type.FIGURE_MAP_FLAG;
import FIGURE_DOCKER = figure_type.FIGURE_DOCKER;
import FIGURE_NATIVE_TRADER = figure_type.FIGURE_NATIVE_TRADER;
import FIGURE_BALLISTA = figure_type.FIGURE_BALLISTA;
import FIGURE_HIPPODROME_HORSES = figure_type.FIGURE_HIPPODROME_HORSES;
import { figure_type } from 'figure/type';
import { figure } from 'figure/figure';
import { time_millis } from 'core/time';
import { touch_coords } from 'input/touch';
import { touch_mode } from 'input/touch';
import { touch } from 'input/touch';
import { mouse_button } from 'input/mouse';
import { scroll_state } from 'input/mouse';
import { mouse } from 'input/mouse';
import { tooltip_type } from 'graphics/tooltip';
import { tooltip_extra_text_type } from 'graphics/tooltip';
import { tooltip_context } from 'graphics/tooltip';
import { key_type } from 'input/keys';
import { key_modifier_type } from 'input/keys';
import { hotkey_action } from 'core/hotkey_config';
import { hotkey_mapping } from 'core/hotkey_config';
import { hotkeys } from 'input/hotkey';
import { pixel_coordinate } from 'widget/city';
import { view_tile } from 'city/view';
import { map_callback } from 'city/view';
import { city_view_orientation } from 'city/view';
import { formation_state } from 'figure/formation';
import { formation } from 'figure/formation';
import { formation_get } from 'figure/formation';
import { figure_image_normalize_direction } from 'figure/image';
import { map_flag_e } from 'figuretype/editor';
import MAP_FLAG_INVASION_MIN = map_flag_e.MAP_FLAG_INVASION_MIN;
import MAP_FLAG_INVASION_MAX = map_flag_e.MAP_FLAG_INVASION_MAX;
import MAP_FLAG_FISHING_MIN = map_flag_e.MAP_FLAG_FISHING_MIN;
import MAP_FLAG_FISHING_MAX = map_flag_e.MAP_FLAG_FISHING_MAX;
import MAP_FLAG_HERD_MIN = map_flag_e.MAP_FLAG_HERD_MIN;
import MAP_FLAG_HERD_MAX = map_flag_e.MAP_FLAG_HERD_MAX;
import { language_type } from 'core/locale';
import { encoding_type } from 'core/encoding';
import { group_terrain } from 'core/image_group';
import GROUP_FIGURE_FORT_STANDARD_ICONS = group_terrain.GROUP_FIGURE_FORT_STANDARD_ICONS;
import { color_t } from 'graphics/color';
import { image } from 'core/image';
import { image_group } from 'core/image';
import { image_get } from 'core/image';
import { image_get_enemy } from 'core/image';
import { font_t } from 'graphics/font';
import FONT_NORMAL_PLAIN = font_t.FONT_NORMAL_PLAIN;
import { font_t } from 'graphics/font';
import { font_definition } from 'graphics/font';
import { image_draw } from 'graphics/image';
import { image_draw_enemy } from 'graphics/image';
import { image_draw_blend_alpha } from 'graphics/image';
import { text_draw_number_colored } from 'graphics/text';
function draw_figure_with_cart(f: figure, x: number, y: number) {
    if (f.y_offset_cart >= 0) {
        image_draw(f.image_id, x, y);
        image_draw(f.cart_image_id, x + f.x_offset_cart, y + f.y_offset_cart);
    } else {
        image_draw(f.cart_image_id, x + f.x_offset_cart, y + f.y_offset_cart);
        image_draw(f.image_id, x, y);
    }
}
function draw_hippodrome_horse(f: figure, x: number, y: number) {
    let val: number = f.wait_ticks_missile;
    switch (city_view_orientation()) {
        case DIR_0_TOP:
            x += 10
            if (val <= 10) {
                y -= 2
            } else if (val <= 11) {
                y -= 10
            } else if (val <= 12) {
                y -= 18
            } else if (val <= 13) {
                y -= 16
            } else if (val <= 20) {
                y -= 14
            } else if (val <= 21) {
                y -= 10
            } else {
                y -= 2
            }
            break
        case DIR_2_RIGHT:
            x -= 10
            if (val <= 9) {
                y -= 12
            } else if (val <= 10) {
                y += 4
            } else if (val <= 11) {
                x -= 5
                y += 2
            } else if (val <= 13) {
                x -= 5
            } else if (val <= 20) {
                y -= 2
            } else if (val <= 21) {
                y -= 6
            } else {
                y -= 12
            }
            break
        case DIR_4_BOTTOM:
            x += 20
            if (val <= 9) {
                y += 4
            } else if (val <= 10) {
                x += 10
                y += 4
            } else if (val <= 11) {
                x += 10
                y -= 4
            } else if (val <= 13) {
                y -= 6
            } else if (val <= 20) {
                y -= 12
            } else if (val <= 21) {
                y -= 10
            } else {
                y -= 2
            }
            break
        case DIR_6_LEFT:
            x -= 10
            if (val <= 9) {
                y -= 12
            } else if (val <= 10) {
                y += 4
            } else if (val <= 11) {
                y += 2
            } else if (val <= 13) {
            } else if (val <= 20) {
                y -= 2
            } else if (val <= 21) {
                y -= 6
            } else {
                y -= 12
            }
            break
    }
    draw_figure_with_cart(f, x, y);
}
function draw_fort_standard(f: figure, x: number, y: number) {
    if (!formation_get(f.formation_id).in_distant_battle) {
        image_draw(f.image_id, x, y);
        let flag_height: number = image_get(f.cart_image_id).height;
        image_draw(f.cart_image_id, x, y - flag_height);
        let icon_image_id: number = image_group(GROUP_FIGURE_FORT_STANDARD_ICONS) + f.formation_id - 1;
        image_draw(icon_image_id, x, y - image_get(icon_image_id).height - flag_height);
    }
}
function draw_map_flag(f: figure, x: number, y: number) {
    image_draw(f.image_id, x, y);
    image_draw(f.cart_image_id, x, y - image_get(f.cart_image_id).height);
    let number: number = 0;
    let id: number = f.resource_id;
    if (id >= MAP_FLAG_INVASION_MIN && id < MAP_FLAG_INVASION_MAX) {
        number = id - MAP_FLAG_INVASION_MIN + 1;
    } else if (id >= MAP_FLAG_FISHING_MIN && id < MAP_FLAG_FISHING_MAX) {
        number = id - MAP_FLAG_FISHING_MIN + 1;
    } else if (id >= MAP_FLAG_HERD_MIN && id < MAP_FLAG_HERD_MAX) {
        number = id - MAP_FLAG_HERD_MIN + 1;
    }
    if (number > 0) {
        text_draw_number_colored(number, '@', " ", x + 6, y + 7, FONT_NORMAL_PLAIN, COLOR_WHITE);
    }
}
function tile_cross_country_offset_to_pixel_offset(cross_country_x: number, cross_country_y: number, pixel_x: number, pixel_y: number) {
    let dir: number = city_view_orientation();
    if (dir == DIR_0_TOP || dir == DIR_4_BOTTOM) {
        let base_pixel_x: number = 2 * cross_country_x - 2 * cross_country_y;
        let base_pixel_y: number = cross_country_x + cross_country_y;
        * pixel_x = dir == DIR_0_TOP ? base_pixel_x : -base_pixel_x;
        * pixel_y = dir == DIR_0_TOP ? base_pixel_y : -base_pixel_y;
    } else {
        let base_pixel_x: number = 2 * cross_country_x + 2 * cross_country_y;
        let base_pixel_y: number = cross_country_x - cross_country_y;
        * pixel_x = dir == DIR_2_RIGHT ? base_pixel_x : -base_pixel_x;
        * pixel_y = dir == DIR_6_LEFT ? base_pixel_y : -base_pixel_y;
    }
}
function tile_progress_to_pixel_offset_x(direction: number, progress: number) {
    if (progress >= 15) {
        return 0;
    }
    switch (direction) {
        case DIR_0_TOP:
        case DIR_2_RIGHT:
            return 2 * progress - 28;
        case DIR_1_TOP_RIGHT:
            return 4 * progress - 56;
        case DIR_4_BOTTOM:
        case DIR_6_LEFT:
            return 28 - 2 * progress;
        case DIR_5_BOTTOM_LEFT:
            return 56 - 4 * progress;
        default:
            return 0
    }
}
function tile_progress_to_pixel_offset_y(direction: number, progress: number) {
    if (progress >= 15) {
        return 0;
    }
    switch (direction) {
        case DIR_0_TOP:
        case DIR_6_LEFT:
            return 14 - progress;
        case DIR_2_RIGHT:
        case DIR_4_BOTTOM:
            return progress - 14;
        case DIR_3_BOTTOM_RIGHT:
            return 2 * progress - 28;
        case DIR_7_TOP_LEFT:
            return 28 - 2 * progress;
        default:
            return 0
    }
}
function tile_progress_to_pixel_offset(direction: number, progress: number, pixel_x: number, pixel_y: number) {
    * pixel_x = tile_progress_to_pixel_offset_x(direction, progress);
    * pixel_y = tile_progress_to_pixel_offset_y(direction, progress);
}
function adjust_pixel_offset(f: figure, pixel_x: number, pixel_y: number) {
    let x_offset: number = 0;
    let y_offset: number = 0;
    if (f.use_cross_country) {
        tile_cross_country_offset_to_pixel_offset(
            f.cross_country_x % 15, f.cross_country_y % 15, x_offset, y_offset);
        y_offset -= f.missile_damage
    } else {
        let direction: number = figure_image_normalize_direction(f.direction);
        tile_progress_to_pixel_offset(direction, f.progress_on_tile, x_offset, y_offset);
        y_offset -= f.current_height
        if (f.figures_on_same_tile_index && f.type != FIGURE_BALLISTA) {
            let BUSY_ROAD_X_OFFSETS: number[] = {
                0, 8, 8, - 8, -8, 0, 16, 0, -16, 8, -8, 16, -16, 16, -16, 8, -8, 0, 24, 0, -24, 0, 0, 0
        };
        let BUSY_ROAD_Y_OFFSETS: number[] = {
            0, 0, 8, 8, - 8, -16, 0, 16, 0, -16, 16, 8, -8, -8, 8, 16, -16, -24, 0, 24, 0, 0, 0, 0
    };
    x_offset += BUSY_ROAD_X_OFFSETS[f.figures_on_same_tile_index]
    y_offset += BUSY_ROAD_Y_OFFSETS[f.figures_on_same_tile_index]
}
    }
x_offset += 29
y_offset += 15
let img: image = f.is_enemy_image ? image_get_enemy(f.image_id) : image_get(f.image_id);
    * pixel_x += x_offset - img.sprite_offset_x
    * pixel_y += y_offset - img.sprite_offset_y
}
function draw_figure(f: figure, x: number, y: number, highlight: number) {
    if (f.cart_image_id) {
        switch (f.type) {
            case FIGURE_CART_PUSHER:
            case FIGURE_WAREHOUSEMAN:
            case FIGURE_LION_TAMER:
            case FIGURE_DOCKER:
            case FIGURE_NATIVE_TRADER:
            case FIGURE_IMMIGRANT:
            case FIGURE_EMIGRANT:
                draw_figure_with_cart(f, x, y);
                break
            case FIGURE_HIPPODROME_HORSES:
                draw_hippodrome_horse(f, x, y);
                break
            case FIGURE_FORT_STANDARD:
                draw_fort_standard(f, x, y);
                break
            case FIGURE_MAP_FLAG:
                draw_map_flag(f, x, y);
                break
            default:
                image_draw(f.image_id, x, y)
                break
        }
    } else {
        if (f.is_enemy_image) {
            image_draw_enemy(f.image_id, x, y);
        } else {
            image_draw(f.image_id, x, y);
            if (highlight) {
                image_draw_blend_alpha(f.image_id, x, y, COLOR_MASK_LEGION_HIGHLIGHT);
            }
        }
    }
}
export function city_draw_figure(f: figure, x: number, y: number, highlight: number) {
    adjust_pixel_offset(f, x, y);
    draw_figure(f, x, y, highlight);
}
export function city_draw_selected_figure(f: figure, x: number, y: number, coord: pixel_coordinate) {
    adjust_pixel_offset(f, x, y);
    draw_figure(f, x, y, 0);
    coord.x = x;
    coord.y = y;
}
