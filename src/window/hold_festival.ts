import { MAX_GODS } from 'city/gods';
import { advisor_type } from 'city/constants';
import { city_festival_small_cost } from 'city/festival';
import { city_festival_large_cost } from 'city/festival';
import { city_festival_grand_cost } from 'city/festival';
import { city_festival_grand_wine } from 'city/festival';
import { city_festival_out_of_wine } from 'city/festival';
import { city_festival_selected_god } from 'city/festival';
import { city_festival_select_god } from 'city/festival';
import { city_festival_selected_size } from 'city/festival';
import { city_festival_select_size } from 'city/festival';
import { city_festival_schedule } from 'city/festival';
import { city_finance_out_of_money } from 'city/finance';
import { finance_overview } from 'city/finance';
import { group_terrain } from 'core/image_group';
import GROUP_PANEL_WINDOWS = group_terrain.GROUP_PANEL_WINDOWS;
import GROUP_OK_CANCEL_SCROLL_BUTTONS = group_terrain.GROUP_OK_CANCEL_SCROLL_BUTTONS;
import GROUP_RESOURCE_ICONS = group_terrain.GROUP_RESOURCE_ICONS;
import GROUP_CONTEXT_ICONS = group_terrain.GROUP_CONTEXT_ICONS;
import { resource_type } from 'game/resource';
import RESOURCE_WINE = resource_type.RESOURCE_WINE;
import { resource_type } from 'game/resource';
import { workshop_type } from 'game/resource';
import { resource_image_type } from 'game/resource';
import { button_none } from 'graphics/button';
import { button_border_draw } from 'graphics/button';
import { time_millis } from 'core/time';
import { touch_coords } from 'input/touch';
import { touch_mode } from 'input/touch';
import { touch } from 'input/touch';
import { mouse_button } from 'input/mouse';
import { scroll_state } from 'input/mouse';
import { mouse } from 'input/mouse';
import { mouse_in_dialog } from 'input/mouse';
import { generic_button } from 'graphics/generic_button';
import { generic_buttons_handle_mouse } from 'graphics/generic_button';;
import { color_t } from 'graphics/color';
import { clip_code } from 'graphics/graphics';
import { clip_info } from 'graphics/graphics';
import { graphics_in_dialog } from 'graphics/graphics';
import { graphics_reset_dialog } from 'graphics/graphics';
import { graphics_shade_rect } from 'graphics/graphics';
import { language_type } from 'core/locale';
import { encoding_type } from 'core/encoding';
import { image } from 'core/image';
import { image_group } from 'core/image';
import { font_t } from 'graphics/font';
import FONT_NORMAL_BLACK = font_t.FONT_NORMAL_BLACK;
import FONT_LARGE_BLACK = font_t.FONT_LARGE_BLACK;
import { font_t } from 'graphics/font';
import { font_definition } from 'graphics/font';
import { image_draw } from 'graphics/image';
import { ib } from 'graphics/image_button';
import IB_NORMAL = ib.IB_NORMAL;
import { image_button } from 'graphics/image_button';
import { image_buttons_draw } from 'graphics/image_button';
import { image_buttons_handle_mouse } from 'graphics/image_button';
import { lang_text_draw } from 'graphics/lang_text';
import { lang_text_draw_centered } from 'graphics/lang_text';
import { lang_text_draw_amount } from 'graphics/lang_text';
import { outer_panel_draw } from 'graphics/panel';
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
import WINDOW_HOLD_FESTIVAL = window_id.WINDOW_HOLD_FESTIVAL;
import { window_id } from 'graphics/window';
import { window_type } from 'graphics/window';
import { window_invalidate } from 'graphics/window';
import { window_show } from 'graphics/window';
import { input_go_back_requested } from 'input/input';
import { window_advisors_draw_dialog_background } from 'window/advisors';
import { window_advisors_show } from 'window/advisors';
import { message_dialog } from 'window/message_dialog';
import MESSAGE_DIALOG_ADVISOR_ENTERTAINMENT = message_dialog.MESSAGE_DIALOG_ADVISOR_ENTERTAINMENT;
import { window_message_dialog_show } from 'window/message_dialog';
let image_buttons_bottom: image_button[] = new Array().fill({
    { 58, 316, 27, 27, IB_NORMAL, GROUP_CONTEXT_ICONS, 0, button_help, button_none, 0, 0, 1},
    { 558, 319, 24, 24, IB_NORMAL, GROUP_CONTEXT_ICONS, 4, button_close, button_none, 0, 0, 1},
    { 358, 317, 39, 26, IB_NORMAL, GROUP_OK_CANCEL_SCROLL_BUTTONS, 0, button_hold_festival, button_none, 1, 0, 1},
    { 400, 317, 39, 26, IB_NORMAL, GROUP_OK_CANCEL_SCROLL_BUTTONS, 4, button_close, button_none, 0, 0, 1},
});
let buttons_gods_size: generic_button[] = new Array().fill({
    { 70, 96, 80, 90, button_god, button_none, 0, 0},
    { 170, 96, 80, 90, button_god, button_none, 1, 0},
    { 270, 96, 80, 90, button_god, button_none, 2, 0},
    { 370, 96, 80, 90, button_god, button_none, 3, 0},
    { 470, 96, 80, 90, button_god, button_none, 4, 0},
    { 102, 216, 430, 26, button_size, button_none, 1, 0},
    { 102, 246, 430, 26, button_size, button_none, 2, 0},
    { 102, 276, 430, 26, button_size, button_none, 3, 0},
});
let focus_button_id: number;
let focus_image_button_id: number;
function draw_buttons() {
    button_border_draw(102, 216, 430, 26, focus_button_id == 6);
    let width: number = lang_text_draw(58, 31, 110, 224, FONT_NORMAL_BLACK);
    lang_text_draw_amount(8, 0, city_festival_small_cost(), 110 + width, 224, FONT_NORMAL_BLACK);
    button_border_draw(102, 246, 430, 26, focus_button_id == 7);
    width = lang_text_draw(58, 32, 110, 254, FONT_NORMAL_BLACK);
    lang_text_draw_amount(8, 0, city_festival_large_cost(), 110 + width, 254, FONT_NORMAL_BLACK);
    button_border_draw(102, 276, 430, 26, focus_button_id == 8);
    width = lang_text_draw(58, 33, 110, 284, FONT_NORMAL_BLACK);
    width += lang_text_draw_amount(8, 0, city_festival_grand_cost(), 110 + width, 284, FONT_NORMAL_BLACK)
    width += lang_text_draw_amount(8, 10, city_festival_grand_wine(), 120 + width, 284, FONT_NORMAL_BLACK)
    image_draw(image_group(GROUP_RESOURCE_ICONS) + RESOURCE_WINE, 120 + width, 279);
    if (city_finance_out_of_money()) {
        graphics_shade_rect(104, 218, 426, 22, 0);
        graphics_shade_rect(104, 248, 426, 22, 0);
        graphics_shade_rect(104, 278, 426, 22, 0);
    } else if (city_festival_out_of_wine()) {
        graphics_shade_rect(104, 278, 426, 22, 0);
    }
}
function draw_background() {
    window_advisors_draw_dialog_background();
    graphics_in_dialog();
    outer_panel_draw(48, 48, 34, 20);
    lang_text_draw_centered(58, 25 + city_festival_selected_god(), 48, 60, 544, FONT_LARGE_BLACK);
    for (let god: number = 0; god < MAX_GODS; god++) {
        if (god == city_festival_selected_god()) {
            button_border_draw(100 * god + 66, 92, 90, 100, 1);
            image_draw(image_group(GROUP_PANEL_WINDOWS) + god + 21, 100 * god + 70, 96);
        } else {
            image_draw(image_group(GROUP_PANEL_WINDOWS) + god + 16, 100 * god + 70, 96);
        }
    }
    draw_buttons();
    lang_text_draw(58, 30 + city_festival_selected_size(), 180, 322, FONT_NORMAL_BLACK);
    graphics_reset_dialog();
}
function draw_foreground() {
    graphics_in_dialog();
    draw_buttons();
    image_buttons_draw(0, 0, image_buttons_bottom, 4);
    graphics_reset_dialog();
}
function handle_input(m: mouse, h: hotkeys) {
    let m_dialog: mouse = mouse_in_dialog(m);
    let handled: number = 0;
    handled |= image_buttons_handle_mouse(m_dialog, 0, 0, image_buttons_bottom, 4, focus_image_button_id)
    handled |= generic_buttons_handle_mouse(m_dialog, 0, 0, buttons_gods_size, 8, focus_button_id)
    if (focus_image_button_id) {
        focus_button_id = 0;
    }
    if (!handled && input_go_back_requested(m, h)) {
        window_advisors_show();
    }
}
function button_god(god: number, param2: number) {
    city_festival_select_god(god);
    window_invalidate();
}
function button_size(size: number, param2: number) {
    if (!city_finance_out_of_money()) {
        if (city_festival_select_size(size)) {
            window_invalidate();
        }
    }
}
function button_help(param1: number, param2: number) {
    window_message_dialog_show(MESSAGE_DIALOG_ADVISOR_ENTERTAINMENT, 0);
}
function button_close(param1: number, param2: number) {
    window_advisors_show();
}
function button_hold_festival(param1: number, param2: number) {
    if (city_finance_out_of_money()) {
        return;
    }
    city_festival_schedule();
    window_advisors_show();
}
function get_tooltip(c: tooltip_context) {
    if (!focus_image_button_id && (!focus_button_id || focus_button_id > 5)) {
        return;
    }
    c.type = TOOLTIP_BUTTON;
    switch (focus_image_button_id) {
        case 1:
            c.text_id = 1;
            break
        case 2:
            c.text_id = 2;
            break
        case 3:
            c.text_id = 113;
            break
        case 4:
            c.text_id = 114;
            break
    }
    switch (focus_button_id) {
        case 1:
            c.text_id = 115;
            break
        case 2:
            c.text_id = 116;
            break
        case 3:
            c.text_id = 117;
            break
        case 4:
            c.text_id = 118;
            break
        case 5:
            c.text_id = 119;
            break
    }
}
export function window_hold_festival_show() {
    let window: window_type = {
        WINDOW_HOLD_FESTIVAL,
        draw_background,
        draw_foreground,
        handle_input,
        get_tooltip
    };
    window_show(window);
}
