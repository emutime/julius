
;
import { buffer } from 'core/buffer';
import { resource_type } from 'game/resource';
import RESOURCE_MIN = resource_type.RESOURCE_MIN;
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
import { resource_type } from 'game/resource';
import { workshop_type } from 'game/resource';
import { resource_image_type } from 'game/resource';
import RESOURCE_IMAGE_ICON = resource_image_type.RESOURCE_IMAGE_ICON;
import { resource_image_type } from 'game/resource';
import { resource_image_offset } from 'game/resource';
import { trade_price_buy } from 'empire/trade_prices';
import { trade_price_sell } from 'empire/trade_prices';
import { color_t } from 'graphics/color';
import { clip_code } from 'graphics/graphics';
import { clip_info } from 'graphics/graphics';
import { graphics_in_dialog } from 'graphics/graphics';
import { graphics_reset_dialog } from 'graphics/graphics';
import { graphics_shade_rect } from 'graphics/graphics';
import { language_type } from 'core/locale';
import { encoding_type } from 'core/encoding';
import { group_terrain } from 'core/image_group';
import GROUP_RESOURCE_ICONS = group_terrain.GROUP_RESOURCE_ICONS;
import { image } from 'core/image';
import { image_group } from 'core/image';
import { font_t } from 'graphics/font';
import FONT_NORMAL_BLACK = font_t.FONT_NORMAL_BLACK;
import FONT_LARGE_BLACK = font_t.FONT_LARGE_BLACK;
import FONT_SMALL_PLAIN = font_t.FONT_SMALL_PLAIN;
import { font_t } from 'graphics/font';
import { font_definition } from 'graphics/font';
import { image_draw } from 'graphics/image';
import { lang_text_draw } from 'graphics/lang_text';
import { lang_text_draw_centered } from 'graphics/lang_text';
import { outer_panel_draw } from 'graphics/panel';
import { screen_dialog_offset_x } from 'graphics/screen';
import { screen_dialog_offset_y } from 'graphics/screen';
import { time_millis } from 'core/time';
import { touch_coords } from 'input/touch';
import { touch_mode } from 'input/touch';
import { touch } from 'input/touch';
import { mouse_button } from 'input/mouse';
import { scroll_state } from 'input/mouse';
import { mouse } from 'input/mouse';
import { text_draw_number_centered } from 'graphics/text';
import { tooltip_type } from 'graphics/tooltip';
import TOOLTIP_BUTTON = tooltip_type.TOOLTIP_BUTTON;
import { tooltip_type } from 'graphics/tooltip';
import { tooltip_extra_text_type } from 'graphics/tooltip';
import { tooltip_context } from 'graphics/tooltip';
import { key_type } from 'input/keys';
import { key_modifier_type } from 'input/keys';
import { hotkey_action } from 'core/hotkey_config';
import { hotkey_mapping } from 'core/hotkey_config';
import { hotkeys } from 'input/hotkey';
import { window_id } from 'graphics/window';
import WINDOW_TRADE_PRICES = window_id.WINDOW_TRADE_PRICES;
import { window_id } from 'graphics/window';
import { window_type } from 'graphics/window';
import { window_draw_underlying_window } from 'graphics/window';
import { window_show } from 'graphics/window';
import { input_go_back_requested } from 'input/input';
import { advisor_type } from 'city/constants';
import { window_advisors_show } from 'window/advisors';
function draw_background() {
    window_draw_underlying_window();
    graphics_in_dialog();
    graphics_shade_rect(33, 53, 574, 334, 0);
    outer_panel_draw(16, 144, 38, 11);
    lang_text_draw(54, 21, 26, 153, FONT_LARGE_BLACK);
    lang_text_draw(54, 22, 26, 228, FONT_NORMAL_BLACK);
    lang_text_draw(54, 23, 26, 253, FONT_NORMAL_BLACK);
    for (let i: number = RESOURCE_MIN; i < RESOURCE_MAX; i++) {
        let image_offset: number = i + resource_image_offset(i, RESOURCE_IMAGE_ICON);
        image_draw(image_group(GROUP_RESOURCE_ICONS) + image_offset, 126 + 30 * i, 194);
        text_draw_number_centered(trade_price_buy(i), 120 + 30 * i, 229, 30, FONT_SMALL_PLAIN);
        text_draw_number_centered(trade_price_sell(i), 120 + 30 * i, 254, 30, FONT_SMALL_PLAIN);
    }
    lang_text_draw_centered(13, 1, 16, 296, 608, FONT_NORMAL_BLACK);
    graphics_reset_dialog();
}
function handle_input(m: mouse, h: hotkeys) {
    if (input_go_back_requested(m, h)) {
        window_advisors_show();
    }
}
function get_tooltip_resource(c: tooltip_context) {
    let x_base: number = screen_dialog_offset_x() + 124;
    let y: number = screen_dialog_offset_y() + 192;
    let x_mouse: number = c.mouse_x;
    let y_mouse: number = c.mouse_y;
    for (let i: number = RESOURCE_MIN; i < RESOURCE_MAX; i++) {
        let x: number = x_base + 30 * i;
        if (x <= x_mouse && x + 24 > x_mouse && y <= y_mouse && y + 24 > y_mouse) {
            return i;
        }
    }
    return 0;
}
function get_tooltip(c: tooltip_context) {
    let resource: number = get_tooltip_resource(c);
    if (!resource) {
        return;
    }
    c.type = TOOLTIP_BUTTON;
    c.text_id = 131 + resource;
}
export function window_trade_prices_show() {
    let window: window_type = {
        WINDOW_TRADE_PRICES,
        draw_background,
        0,
        handle_input,
        get_tooltip
    };
    window_show(window);
}
