
import { advisor_type } from 'city/constants';
import { group_terrain } from 'core/image_group';
import { empire_city_get } from 'empire/city';
import { resource_type } from 'game/resource';
import { button_none } from 'graphics/button';
import { font_t } from 'graphics/font';
import { graphics_in_dialog, graphics_reset_dialog } from 'graphics/graphics';
import { ib, image_button, image_buttons_draw, image_buttons_handle_mouse } from 'graphics/image_button';
import { lang_text_draw, lang_text_draw_centered, lang_text_draw_multiline } from 'graphics/lang_text';
import { outer_panel_draw } from 'graphics/panel';
import { window_id, window_show, window_type } from 'graphics/window';
import { hotkeys } from 'input/hotkey';
import { input_go_back_requested } from 'input/input';
import { mouse, mouse_in_dialog } from 'input/mouse';
import { window_advisors_show_advisor } from 'window/advisors';
import { window_empire_show } from 'window/empire';
import GROUP_CONTEXT_ICONS = group_terrain.GROUP_CONTEXT_ICONS;
import GROUP_MESSAGE_ADVISOR_BUTTONS = group_terrain.GROUP_MESSAGE_ADVISOR_BUTTONS;;
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
import IB_NORMAL = ib.IB_NORMAL;
import FONT_NORMAL_BLACK = font_t.FONT_NORMAL_BLACK;
import FONT_LARGE_BLACK = font_t.FONT_LARGE_BLACK;
import WINDOW_TRADE_OPENED = window_id.WINDOW_TRADE_OPENED;
import ADVISOR_TRADE = advisor_type.ADVISOR_TRADE;
let image_buttons: image_button[] = [
    new image_button(92, 248, 28, 28, IB_NORMAL, GROUP_MESSAGE_ADVISOR_BUTTONS, 12, button_advisor, button_none, ADVISOR_TRADE, 0, 1),
    new image_button(522, 252, 24, 24, IB_NORMAL, GROUP_CONTEXT_ICONS, 4, button_close, button_none, 0, 0, 1),
];
let selected_city: number;
function draw_background() {
    graphics_in_dialog();
    outer_panel_draw(80, 64, 30, 14);
    lang_text_draw_centered(142, 0, 80, 80, 480, FONT_LARGE_BLACK);
    if (empire_city_get(selected_city).is_sea_trade) {
        lang_text_draw_multiline(142, 1, 112, 120, 416, FONT_NORMAL_BLACK);
        lang_text_draw_multiline(142, 3, 112, 184, 416, FONT_NORMAL_BLACK);
    } else {
        lang_text_draw_multiline(142, 1, 112, 152, 416, FONT_NORMAL_BLACK);
    }
    lang_text_draw(142, 2, 128, 256, FONT_NORMAL_BLACK);
    graphics_reset_dialog();
}
function draw_foreground() {
    graphics_in_dialog();
    image_buttons_draw(0, 0, image_buttons, 2);
    graphics_reset_dialog();
}
function handle_input(m: mouse, h: hotkeys) {
    if (image_buttons_handle_mouse(mouse_in_dialog(m), 0, 0, image_buttons, 2, null)) {
        return;
    }
    if (input_go_back_requested(m, h)) {
        window_empire_show();
    }
}
function button_advisor(advisor: number, param2: number) {
    window_advisors_show_advisor(advisor);
}
function button_close(param1: number, param2: number) {
    window_empire_show();
}
export function window_trade_opened_show(city: number) {
    let window: window_type = new window_type(
        WINDOW_TRADE_OPENED,
        draw_background,
        draw_foreground,
        handle_input
    );
    selected_city = city;
    window_show(window);
}
