export const GROUP = 5;
export const PROCEED_GROUP = 43;
export const PROCEED_TEXT = 5;
export const enum popup_dialog_type {
    POPUP_DIALOG_NONE = -1,
    POPUP_DIALOG_QUIT = 0,
    POPUP_DIALOG_OPEN_TRADE = 2,
    POPUP_DIALOG_SEND_GOODS = 4,
    POPUP_DIALOG_NOT_ENOUGH_GOODS = 6,
    POPUP_DIALOG_NO_LEGIONS_AVAILABLE = 8,
    POPUP_DIALOG_NO_LEGIONS_SELECTED = 10,
    POPUP_DIALOG_SEND_TROOPS = 12,
    POPUP_DIALOG_DELETE_FORT = 14,
    POPUP_DIALOG_DELETE_BRIDGE = 18,
    POPUP_DIALOG_EDITOR_QUIT_WITHOUT_SAVING = 20,
};

import POPUP_DIALOG_NONE = popup_dialog_type.POPUP_DIALOG_NONE;
import { group_terrain } from 'core/image_group';
import { button_none } from 'graphics/button';
import { font_t } from 'graphics/font';
import { graphics_in_dialog, graphics_reset_dialog } from 'graphics/graphics';
import { ib, image_button, image_buttons_draw, image_buttons_handle_mouse } from 'graphics/image_button';
import { lang_text_draw_centered, lang_text_draw_multiline, lang_text_get_width } from 'graphics/lang_text';
import { outer_panel_draw } from 'graphics/panel';
import { window_draw_underlying_window, window_go_back, window_id, window_is, window_show, window_type } from 'graphics/window';
import { hotkeys } from 'input/hotkey';
import { input_go_back_requested } from 'input/input';
import { mouse, mouse_in_dialog } from 'input/mouse';
import GROUP_OK_CANCEL_SCROLL_BUTTONS = group_terrain.GROUP_OK_CANCEL_SCROLL_BUTTONS;;
import IB_NORMAL = ib.IB_NORMAL;
import FONT_NORMAL_BLACK = font_t.FONT_NORMAL_BLACK;
import FONT_LARGE_BLACK = font_t.FONT_LARGE_BLACK;
import WINDOW_POPUP_DIALOG = window_id.WINDOW_POPUP_DIALOG;
let buttons: image_button[] = [
    new image_button(192, 100, 39, 26, IB_NORMAL, GROUP_OK_CANCEL_SCROLL_BUTTONS, 0, button_ok, button_none, 1, 0, 1),
    new image_button(256, 100, 39, 26, IB_NORMAL, GROUP_OK_CANCEL_SCROLL_BUTTONS, 4, button_cancel, button_none, 0, 0, 1),
];
export class unnamed25_8 {
    public type: popup_dialog_type = null;
    public custom_text_group: number = 0;
    public custom_text_id: number = 0;
    public ok_clicked: number = 0;
    public close_func: (accepted: number) => void = null;
    public has_buttons: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.type = args[0]);
        args.length >= 2 && (this.custom_text_group = args[1]);
        args.length >= 3 && (this.custom_text_id = args[2]);
        args.length >= 4 && (this.ok_clicked = args[3]);
        args.length >= 5 && (this.close_func = args[4]);
        args.length >= 6 && (this.has_buttons = args[5]);
    }
}
let data: unnamed25_8 = new unnamed25_8();
function init(type: popup_dialog_type, custom_text_group: number, custom_text_id: number, close_func: (accepted: number) => void, has_ok_cancel_buttons: number) {
    if (window_is(WINDOW_POPUP_DIALOG)) {
        return 0;
    }
    data.type = type;
    data.custom_text_group = custom_text_group;
    data.custom_text_id = custom_text_id;
    data.ok_clicked = 0;
    data.close_func = close_func;
    data.has_buttons = has_ok_cancel_buttons;
    return 1;
}
function draw_background() {
    window_draw_underlying_window();
    graphics_in_dialog();
    outer_panel_draw(80, 80, 30, 10);
    if (data.type >= 0) {
        lang_text_draw_centered(GROUP, data.type, 80, 100, 480, FONT_LARGE_BLACK);
        if (lang_text_get_width(GROUP, data.type + 1, FONT_NORMAL_BLACK) >= 420) {
            lang_text_draw_multiline(GROUP, data.type + 1, 110, 140, 420, FONT_NORMAL_BLACK);
        } else {
            lang_text_draw_centered(GROUP, data.type + 1, 80, 140, 480, FONT_NORMAL_BLACK);
        }
    } else {
        lang_text_draw_centered(data.custom_text_group, data.custom_text_id, 80, 100, 480, FONT_LARGE_BLACK);
        lang_text_draw_centered(PROCEED_GROUP, PROCEED_TEXT, 80, 140, 480, FONT_NORMAL_BLACK);
    }
    graphics_reset_dialog();
}
function draw_foreground() {
    graphics_in_dialog();
    if (data.has_buttons) {
        image_buttons_draw(80, 80, buttons, 2);
    } else {
        lang_text_draw_centered(13, 1, 80, 208, 480, FONT_NORMAL_BLACK);
    }
    graphics_reset_dialog();
}
function handle_input(m: mouse, h: hotkeys) {
    if (data.has_buttons && image_buttons_handle_mouse(mouse_in_dialog(m), 80, 80, buttons, 2, null)) {
        return;
    }
    if (input_go_back_requested(m, h)) {
        data.close_func(0);
        window_go_back();
    }
    if (h.enter_pressed) {
        confirm();
    }
}
function button_ok(param1: number, param2: number) {
    confirm();
}
function button_cancel(param1: number, param2: number) {
    window_go_back();
    data.close_func(0);
}
function confirm() {
    window_go_back();
    data.close_func(1);
}
export function window_popup_dialog_show(type: popup_dialog_type, close_func: (accepted: number) => void, has_ok_cancel_buttons: number) {
    if (init(type, 0, 0, close_func, has_ok_cancel_buttons)) {
        let window: window_type = new window_type(
            WINDOW_POPUP_DIALOG,
            draw_background,
            draw_foreground,
            handle_input
        );
        window_show(window);
    }
}
export function window_popup_dialog_show_confirmation(text_group: number, text_id: number, close_func: (accepted: number) => void) {
    if (init(POPUP_DIALOG_NONE, text_group, text_id, close_func, 1)) {
        let window: window_type = new window_type(
            WINDOW_POPUP_DIALOG,
            draw_background,
            draw_foreground,
            handle_input
        );
        window_show(window);
    }
}
