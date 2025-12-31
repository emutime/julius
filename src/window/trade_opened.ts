
import { group_terrain } from 'core/image_group';
import GROUP_CONTEXT_ICONS = group_terrain.GROUP_CONTEXT_ICONS;
import GROUP_MESSAGE_ADVISOR_BUTTONS = group_terrain.GROUP_MESSAGE_ADVISOR_BUTTONS;;
import { buffer } from 'core/buffer';
import { resource_type } from 'game/resource';
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
import { resource_type } from 'game/resource';
import { workshop_type } from 'game/resource';
import { resource_image_type } from 'game/resource';
import { empire_city } from 'empire/city';
import { empire_city_get } from 'empire/city';
import { color_t } from 'graphics/color';
import { clip_code } from 'graphics/graphics';
import { clip_info } from 'graphics/graphics';
import { graphics_in_dialog } from 'graphics/graphics';
import { graphics_reset_dialog } from 'graphics/graphics';
import { button_none } from 'graphics/button';
import { time_millis } from 'core/time';
import { touch_coords } from 'input/touch';
import { touch_mode } from 'input/touch';
import { touch } from 'input/touch';
import { mouse_button } from 'input/mouse';
import { scroll_state } from 'input/mouse';
import { mouse } from 'input/mouse';
import { mouse_in_dialog } from 'input/mouse';
import { ib } from 'graphics/image_button';
import IB_NORMAL = ib.IB_NORMAL;
import { image_button } from 'graphics/image_button';
import { image_buttons_draw } from 'graphics/image_button';
import { image_buttons_handle_mouse } from 'graphics/image_button';
import { language_type } from 'core/locale';
import { encoding_type } from 'core/encoding';
import { font_t } from 'graphics/font';
import FONT_NORMAL_BLACK = font_t.FONT_NORMAL_BLACK;
import FONT_LARGE_BLACK = font_t.FONT_LARGE_BLACK;
import { font_t } from 'graphics/font';
import { font_definition } from 'graphics/font';
import { lang_text_draw } from 'graphics/lang_text';
import { lang_text_draw_centered } from 'graphics/lang_text';
import { lang_text_draw_multiline } from 'graphics/lang_text';
import { outer_panel_draw } from 'graphics/panel';
import { tooltip_type } from 'graphics/tooltip';
import { tooltip_extra_text_type } from 'graphics/tooltip';
import { tooltip_context } from 'graphics/tooltip';
import { key_type } from 'input/keys';
import { key_modifier_type } from 'input/keys';
import { hotkey_action } from 'core/hotkey_config';
import { hotkey_mapping } from 'core/hotkey_config';
import { hotkeys } from 'input/hotkey';
import { window_id } from 'graphics/window';
import WINDOW_TRADE_OPENED = window_id.WINDOW_TRADE_OPENED;
import { window_id } from 'graphics/window';
import { window_type } from 'graphics/window';
import { window_show } from 'graphics/window';
import { input_go_back_requested } from 'input/input';
import { advisor_type } from 'city/constants';
import ADVISOR_TRADE = advisor_type.ADVISOR_TRADE;
import { advisor_type } from 'city/constants';
import { window_advisors_show_advisor } from 'window/advisors';
import { window_empire_show } from 'window/empire';
let image_buttons: image_button[] = new Array().fill({
    { 92, 248, 28, 28, IB_NORMAL, GROUP_MESSAGE_ADVISOR_BUTTONS, 12, button_advisor, button_none, ADVISOR_TRADE, 0, 1},
    { 522, 252, 24, 24, IB_NORMAL, GROUP_CONTEXT_ICONS, 4, button_close, button_none, 0, 0, 1},
});
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
    if (image_buttons_handle_mouse(mouse_in_dialog(m), 0, 0, image_buttons, 2, 0)) {
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
    let window: window_type = {
        WINDOW_TRADE_OPENED,
        draw_background,
        draw_foreground,
        handle_input
    };
    selected_city = city;
    window_show(window);
}
