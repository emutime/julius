
import { group_terrain } from 'core/image_group';
import { button_none } from 'graphics/button';
import { font_t } from 'graphics/font';
import { graphics_in_dialog, graphics_reset_dialog } from 'graphics/graphics';
import { ib, image_button, image_buttons_draw, image_buttons_handle_mouse } from 'graphics/image_button';
import { outer_panel_draw } from 'graphics/panel';
import { text_draw_centered, text_draw_multiline } from 'graphics/text';
import { window_go_back, window_id, window_is, window_show, window_type } from 'graphics/window';
import { hotkeys } from 'input/hotkey';
import { input_go_back_requested } from 'input/input';
import { mouse, mouse_in_dialog } from 'input/mouse';
import { translation_for, translation_key } from 'translation/translation';
import GROUP_OK_CANCEL_SCROLL_BUTTONS = group_terrain.GROUP_OK_CANCEL_SCROLL_BUTTONS;
import IB_NORMAL = ib.IB_NORMAL;
import FONT_NORMAL_BLACK = font_t.FONT_NORMAL_BLACK;
import FONT_LARGE_BLACK = font_t.FONT_LARGE_BLACK;
import WINDOW_PLAIN_MESSAGE_DIALOG = window_id.WINDOW_PLAIN_MESSAGE_DIALOG;
let buttons: image_button[] = [
    new image_button(223, 140, 39, 26, IB_NORMAL, GROUP_OK_CANCEL_SCROLL_BUTTONS, 0, button_ok, button_none, 1, 0, 1)
];
export class unnamed18_8 {
    public title: string | ArrayLike<number> = "";
    public message: string | ArrayLike<number> = "";
    public extra: string | ArrayLike<number> | null = null;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.title = args[0]);
        args.length >= 2 && (this.message = args[1]);
        args.length >= 3 && (this.extra = args[2]);
    }
}
let data: unnamed18_8 = new unnamed18_8();
function init(title: translation_key, message: translation_key, extra: string | ArrayLike<number> | null) {
    if (window_is(WINDOW_PLAIN_MESSAGE_DIALOG)) {
        return 0;
    }
    data.title = translation_for(title);
    data.message = translation_for(message);
    data.extra = extra;
    return 1;
}
function draw_background() {
    graphics_in_dialog();
    outer_panel_draw(80, 80, 30, 12);
    text_draw_centered(data.title, 80, 100, 480, FONT_LARGE_BLACK, 0);
    text_draw_multiline(data.message, 100, 140, 450, FONT_NORMAL_BLACK, 0);
    if (data.extra) {
        text_draw_centered(data.extra, 100, 180, 450, FONT_NORMAL_BLACK, 0);
    }
    graphics_reset_dialog();
}
function draw_foreground() {
    graphics_in_dialog();
    image_buttons_draw(80, 80, buttons, 1);
    graphics_reset_dialog();
}
function close() {
    window_go_back();
}
function handle_input(m: mouse, h: hotkeys) {
    if (image_buttons_handle_mouse(mouse_in_dialog(m), 80, 80, buttons, 1, null)) {
        return;
    }
    if (input_go_back_requested(m, h) || h.enter_pressed) {
        close();
    }
}
function button_ok(param1: number, param2: number) {
    close();
}
export function window_plain_message_dialog_show(title: translation_key, message: translation_key) {
    if (init(title, message, null)) {
        let window: window_type = new window_type(
            WINDOW_PLAIN_MESSAGE_DIALOG,
            draw_background,
            draw_foreground,
            handle_input
        );
        window_show(window);
    }
}
export function window_plain_message_dialog_show_with_extra(title: translation_key, message: translation_key, extra: string | ArrayLike<number> | null) {
    if (init(title, message, extra)) {
        let window: window_type = new window_type(
            WINDOW_PLAIN_MESSAGE_DIALOG,
            draw_background,
            draw_foreground,
            handle_input
        );
        window_show(window);
    }
}
