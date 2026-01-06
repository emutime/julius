
;
import { image_group } from 'core/image';
import { group_terrain } from 'core/image_group';
import { trade_price_buy, trade_price_sell } from 'empire/trade_prices';
import { resource_image_offset, resource_image_type, resource_type } from 'game/resource';
import { font_t } from 'graphics/font';
import { graphics_in_dialog, graphics_reset_dialog, graphics_shade_rect } from 'graphics/graphics';
import { image_draw } from 'graphics/image';
import { lang_text_draw, lang_text_draw_centered } from 'graphics/lang_text';
import { outer_panel_draw } from 'graphics/panel';
import { screen_dialog_offset_x, screen_dialog_offset_y } from 'graphics/screen';
import { text_draw_number_centered } from 'graphics/text';
import { tooltip_context, tooltip_type } from 'graphics/tooltip';
import { window_draw_underlying_window, window_id, window_show, window_type } from 'graphics/window';
import { hotkeys } from 'input/hotkey';
import { input_go_back_requested } from 'input/input';
import { mouse } from 'input/mouse';
import { window_advisors_show } from 'window/advisors';
import RESOURCE_MIN = resource_type.RESOURCE_MIN;
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
import RESOURCE_IMAGE_ICON = resource_image_type.RESOURCE_IMAGE_ICON;
import GROUP_RESOURCE_ICONS = group_terrain.GROUP_RESOURCE_ICONS;
import FONT_NORMAL_BLACK = font_t.FONT_NORMAL_BLACK;
import FONT_LARGE_BLACK = font_t.FONT_LARGE_BLACK;
import FONT_SMALL_PLAIN = font_t.FONT_SMALL_PLAIN;
import TOOLTIP_BUTTON = tooltip_type.TOOLTIP_BUTTON;
import WINDOW_TRADE_PRICES = window_id.WINDOW_TRADE_PRICES;
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
    let window: window_type = new window_type(
        WINDOW_TRADE_PRICES,
        draw_background,
        0,
        handle_input,
        get_tooltip
    );
    window_show(window);
}
