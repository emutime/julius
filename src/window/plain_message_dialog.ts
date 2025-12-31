
import { language_type } from 'core/locale';;
import { translation_key } from 'translation/translation';
import { translation_string } from 'translation/translation';
import { translation_for } from 'translation/translation';
import { group_terrain } from 'core/image_group';
import GROUP_OK_CANCEL_SCROLL_BUTTONS = group_terrain.GROUP_OK_CANCEL_SCROLL_BUTTONS;
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
import { outer_panel_draw } from 'graphics/panel';
import { encoding_type } from 'core/encoding';
import { font_t } from 'graphics/font';
import FONT_NORMAL_BLACK = font_t.FONT_NORMAL_BLACK;
import FONT_LARGE_BLACK = font_t.FONT_LARGE_BLACK;
import { font_t } from 'graphics/font';
import { font_definition } from 'graphics/font';
import { text_draw_centered } from 'graphics/text';
import { text_draw_multiline } from 'graphics/text';
import { tooltip_type } from 'graphics/tooltip';
import { tooltip_extra_text_type } from 'graphics/tooltip';
import { tooltip_context } from 'graphics/tooltip';
import { key_type } from 'input/keys';
import { key_modifier_type } from 'input/keys';
import { hotkey_action } from 'core/hotkey_config';
import { hotkey_mapping } from 'core/hotkey_config';
import { hotkeys } from 'input/hotkey';
import { window_id } from 'graphics/window';
import WINDOW_PLAIN_MESSAGE_DIALOG = window_id.WINDOW_PLAIN_MESSAGE_DIALOG;
import { window_id } from 'graphics/window';
import { window_type } from 'graphics/window';
import { window_is } from 'graphics/window';
import { window_show } from 'graphics/window';
import { window_go_back } from 'graphics/window';
import { input_go_back_requested } from 'input/input';
let buttons: image_button[] = new Array().fill({
    { 223, 140, 39, 26, IB_NORMAL, GROUP_OK_CANCEL_SCROLL_BUTTONS, 0, button_ok, button_none, 1, 0, 1},
});
export class unnamed18_8 {
    public title: number = 0;
    public message: number = 0;
    public extra: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.title = args[0]);
        args.length >= 2 && (this.message = args[1]);
        args.length >= 3 && (this.extra = args[2]);
    }
}
let data: unnamed18_8 = new unnamed18_8();
function init(title: translation_key, message: translation_key, extra: number) {
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
    if (image_buttons_handle_mouse(mouse_in_dialog(m), 80, 80, buttons, 1, 0)) {
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
    if (init(title, message, 0)) {
        let window: window_type = {
            WINDOW_PLAIN_MESSAGE_DIALOG,
            draw_background,
            draw_foreground,
            handle_input
        };
        window_show(window);
    }
}
export function window_plain_message_dialog_show_with_extra(title: translation_key, message: translation_key, extra: number) {
    if (init(title, message, extra)) {
        let window: window_type = {
            WINDOW_PLAIN_MESSAGE_DIALOG,
            draw_background,
            draw_foreground,
            handle_input
        };
        window_show(window);
    }
}
