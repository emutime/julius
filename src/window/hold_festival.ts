import { city_festival_grand_cost, city_festival_grand_wine, city_festival_large_cost, city_festival_out_of_wine, city_festival_schedule, city_festival_select_god, city_festival_select_size, city_festival_selected_god, city_festival_selected_size, city_festival_small_cost } from 'city/festival';
import { city_finance_out_of_money } from 'city/finance';
import { MAX_GODS } from 'city/gods';
import { image_group } from 'core/image';
import { group_terrain } from 'core/image_group';
import { resource_type } from 'game/resource';
import { button_border_draw, button_none } from 'graphics/button';
import { font_t } from 'graphics/font';
import { generic_button, generic_buttons_handle_mouse } from 'graphics/generic_button';
import { graphics_in_dialog, graphics_reset_dialog, graphics_shade_rect } from 'graphics/graphics';
import { image_draw } from 'graphics/image';
import { ib, image_button, image_buttons_draw, image_buttons_handle_mouse } from 'graphics/image_button';
import { lang_text_draw, lang_text_draw_amount, lang_text_draw_centered } from 'graphics/lang_text';
import { outer_panel_draw } from 'graphics/panel';
import { tooltip_context, tooltip_type } from 'graphics/tooltip';
import { window_id, window_invalidate, window_show, window_type } from 'graphics/window';
import { hotkeys } from 'input/hotkey';
import { input_go_back_requested } from 'input/input';
import { mouse, mouse_in_dialog } from 'input/mouse';
import { window_advisors_draw_dialog_background, window_advisors_show } from 'window/advisors';
import { message_dialog, window_message_dialog_show } from 'window/message_dialog';
import { Ref } from '../../ext/crt';
import GROUP_PANEL_WINDOWS = group_terrain.GROUP_PANEL_WINDOWS;
import GROUP_OK_CANCEL_SCROLL_BUTTONS = group_terrain.GROUP_OK_CANCEL_SCROLL_BUTTONS;
import GROUP_RESOURCE_ICONS = group_terrain.GROUP_RESOURCE_ICONS;
import GROUP_CONTEXT_ICONS = group_terrain.GROUP_CONTEXT_ICONS;
import RESOURCE_WINE = resource_type.RESOURCE_WINE;
import FONT_NORMAL_BLACK = font_t.FONT_NORMAL_BLACK;
import FONT_LARGE_BLACK = font_t.FONT_LARGE_BLACK;
import IB_NORMAL = ib.IB_NORMAL;
import TOOLTIP_BUTTON = tooltip_type.TOOLTIP_BUTTON;
import WINDOW_HOLD_FESTIVAL = window_id.WINDOW_HOLD_FESTIVAL;
import MESSAGE_DIALOG_ADVISOR_ENTERTAINMENT = message_dialog.MESSAGE_DIALOG_ADVISOR_ENTERTAINMENT;
let image_buttons_bottom: image_button[] = [
    new image_button(58, 316, 27, 27, IB_NORMAL, GROUP_CONTEXT_ICONS, 0, button_help, button_none, 0, 0, 1),
    new image_button(558, 319, 24, 24, IB_NORMAL, GROUP_CONTEXT_ICONS, 4, button_close, button_none, 0, 0, 1),
    new image_button(358, 317, 39, 26, IB_NORMAL, GROUP_OK_CANCEL_SCROLL_BUTTONS, 0, button_hold_festival, button_none, 1, 0, 1),
    new image_button(400, 317, 39, 26, IB_NORMAL, GROUP_OK_CANCEL_SCROLL_BUTTONS, 4, button_close, button_none, 0, 0, 1),
];
let buttons_gods_size: generic_button[] = [
    new generic_button(70, 96, 80, 90, button_god, button_none, 0, 0),
    new generic_button(170, 96, 80, 90, button_god, button_none, 1, 0),
    new generic_button(270, 96, 80, 90, button_god, button_none, 2, 0),
    new generic_button(370, 96, 80, 90, button_god, button_none, 3, 0),
    new generic_button(470, 96, 80, 90, button_god, button_none, 4, 0),
    new generic_button(102, 216, 430, 26, button_size, button_none, 1, 0),
    new generic_button(102, 246, 430, 26, button_size, button_none, 2, 0),
    new generic_button(102, 276, 430, 26, button_size, button_none, 3, 0),
];
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
    width += lang_text_draw_amount(8, 0, city_festival_grand_cost(), 110 + width, 284, FONT_NORMAL_BLACK);
    width += lang_text_draw_amount(8, 10, city_festival_grand_wine(), 120 + width, 284, FONT_NORMAL_BLACK);
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
            button_border_draw(100 * god + 66, 92, 90, 100, true);
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
    const focusImageRef = new Ref(focus_image_button_id);
    const focusButtonRef = new Ref(focus_button_id);
    if (image_buttons_handle_mouse(m_dialog, 0, 0, image_buttons_bottom, 4, focusImageRef)) {
        handled = 1;
    }
    if (generic_buttons_handle_mouse(m_dialog, 0, 0, buttons_gods_size, 8, focusButtonRef)) {
        handled = 1;
    }
    focus_image_button_id = focusImageRef.v;
    focus_button_id = focusButtonRef.v;
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
    window_message_dialog_show(MESSAGE_DIALOG_ADVISOR_ENTERTAINMENT, null);
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
            break;
        case 2:
            c.text_id = 2;
            break;
        case 3:
            c.text_id = 113;
            break;
        case 4:
            c.text_id = 114;
            break;
    }
    switch (focus_button_id) {
        case 1:
            c.text_id = 115;
            break;
        case 2:
            c.text_id = 116;
            break;
        case 3:
            c.text_id = 117;
            break;
        case 4:
            c.text_id = 118;
            break;
        case 5:
            c.text_id = 119;
            break;
    }
}
export function window_hold_festival_show() {
    let window: window_type = new window_type(
        WINDOW_HOLD_FESTIVAL,
        draw_background,
        draw_foreground,
        handle_input,
        get_tooltip
    );
    window_show(window);
}
