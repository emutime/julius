export const NUM_BOTTOM_BUTTONS = 2;
;
import { key_type } from 'input/keys';
import KEY_TYPE_NONE = key_type.KEY_TYPE_NONE;
import KEY_TYPE_ENTER = key_type.KEY_TYPE_ENTER;
import KEY_TYPE_ESCAPE = key_type.KEY_TYPE_ESCAPE;
import { key_type } from 'input/keys';
import { key_modifier_type } from 'input/keys';
import KEY_MOD_NONE = key_modifier_type.KEY_MOD_NONE;
import { key_modifier_type } from 'input/keys';
import { key_combination_display_name } from 'input/keys';
import { hotkey_action } from 'core/hotkey_config';
import { hotkey_mapping } from 'core/hotkey_config';
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
import { generic_buttons_handle_mouse } from 'graphics/generic_button';
import { color_t } from 'graphics/color';
import { clip_code } from 'graphics/graphics';
import { clip_info } from 'graphics/graphics';
import { graphics_in_dialog } from 'graphics/graphics';
import { graphics_reset_dialog } from 'graphics/graphics';
import { language_type } from 'core/locale';
import { encoding_type } from 'core/encoding';
import { image } from 'core/image';
import { font_t } from 'graphics/font';
import FONT_NORMAL_BLACK = font_t.FONT_NORMAL_BLACK;
import FONT_NORMAL_WHITE = font_t.FONT_NORMAL_WHITE;
import FONT_LARGE_BLACK = font_t.FONT_LARGE_BLACK;
import { font_t } from 'graphics/font';
import { font_definition } from 'graphics/font';
import { outer_panel_draw } from 'graphics/panel';
import { inner_panel_draw } from 'graphics/panel';
import { text_draw_centered } from 'graphics/text';
import { tooltip_type } from 'graphics/tooltip';
import { tooltip_extra_text_type } from 'graphics/tooltip';
import { tooltip_context } from 'graphics/tooltip';
import { hotkeys } from 'input/hotkey';
import { window_id } from 'graphics/window';
import WINDOW_HOTKEY_EDITOR = window_id.WINDOW_HOTKEY_EDITOR;
import { window_id } from 'graphics/window';
import { window_type } from 'graphics/window';
import { window_draw_underlying_window } from 'graphics/window';
import { window_show } from 'graphics/window';
import { window_go_back } from 'graphics/window';
import { translation_key } from 'translation/translation';
import TR_BUTTON_OK = translation_key.TR_BUTTON_OK;
import TR_BUTTON_CANCEL = translation_key.TR_BUTTON_CANCEL;
import TR_HOTKEY_EDIT_TITLE = translation_key.TR_HOTKEY_EDIT_TITLE;
import { translation_key } from 'translation/translation';
import { translation_string } from 'translation/translation';
import { translation_for } from 'translation/translation';
let bottom_buttons: generic_button[] = new Array().fill({
    { 192, 228, 120, 24, button_close, button_none, 0},
    { 328, 228, 120, 24, button_close, button_none, 1},
});
let bottom_button_texts: translation_key[] = new Array().fill({
    TR_BUTTON_CANCEL,
    TR_BUTTON_OK
});
export class unnamed28_8 {
    public action: hotkey_action = null;
    public index: number = 0;
    public key: key_type = null;
    public modifiers: key_modifier_type = null;
    public callback: void ( = null;
    public focus_button: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.action = args[0]);
        args.length >= 2 && (this.index = args[1]);
        args.length >= 3 && (this.key = args[2]);
        args.length >= 4 && (this.modifiers = args[3]);
        args.length >= 5 && (this.callback = args[4]);
        args.length >= 6 && (this.focus_button = args[5]);
    }
}
let data: unnamed28_8 = new unnamed28_8();
function init(action: hotkey_action, index: number, callback: void () {
    data.action = action;
    data.index = index;
    data.callback = callback;
    data.key = KEY_TYPE_NONE;
    data.modifiers = KEY_MOD_NONE;
    data.focus_button = 0;
}
function draw_background() {
    window_draw_underlying_window();
    graphics_in_dialog();
    outer_panel_draw(128, 128, 24, 9);
    text_draw_centered(translation_for(TR_HOTKEY_EDIT_TITLE), 136, 144, 376, FONT_LARGE_BLACK, 0);
    for (let i: number = 0; i < NUM_BOTTOM_BUTTONS; i++) {
        let btn: generic_button = bottom_buttons[i];
        text_draw_centered(translation_for(bottom_button_texts[i]),
            btn.x, btn.y + 6, btn.width, FONT_NORMAL_BLACK, 0);
    }
    graphics_reset_dialog();
}
function draw_foreground() {
    graphics_in_dialog();
    inner_panel_draw(192, 184, 16, 2);
    text_draw_centered(key_combination_display_name(data.key, data.modifiers),
        192, 193, 256, FONT_NORMAL_WHITE, 0);
    for (let i: number = 0; i < NUM_BOTTOM_BUTTONS; i++) {
        let btn: generic_button = bottom_buttons[i];
        button_border_draw(btn.x, btn.y, btn.width, btn.height, data.focus_button == i + 1);
    }
    graphics_reset_dialog();
}
function handle_input(m: mouse, h: hotkeys) {
    let m_dialog: mouse = mouse_in_dialog(m);
    let handled: number = 0;
    handled |= generic_buttons_handle_mouse(m_dialog, 0, 0, bottom_buttons, NUM_BOTTOM_BUTTONS, data.focus_button)
    if (!handled && m.right.went_up) {
        button_close(0, 0);
    }
}
function button_close(ok: number, param2: number) {
    window_go_back();
    if (ok) {
        data.callback(data.action, data.index, data.key, data.modifiers);
    }
}
export function window_hotkey_editor_key_pressed(key: key_type, modifiers: key_modifier_type) {
    if (key == KEY_TYPE_ENTER && modifiers == KEY_MOD_NONE) {
        button_close(1, 0);
    } else if (key == KEY_TYPE_ESCAPE && modifiers == KEY_MOD_NONE) {
        button_close(0, 0);
    } else {
        if (key != KEY_TYPE_NONE) {
            data.key = key;
        }
        data.modifiers = modifiers;
    }
}
export function window_hotkey_editor_key_released(key: key_type, modifiers: key_modifier_type) {
    if (data.key == KEY_TYPE_NONE && key == KEY_TYPE_NONE) {
        data.modifiers = modifiers;
    }
}
export function window_hotkey_editor_show(action: hotkey_action, index: number, callback: void () {
    let window: window_type = {
        WINDOW_HOTKEY_EDITOR,
        draw_background,
        draw_foreground,
        handle_input
    };
    init(action, index, callback);
    window_show(window);
}
