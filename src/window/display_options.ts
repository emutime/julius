
;
import { set_tooltips } from 'game/settings';
import { set_difficulty } from 'game/settings';
import { set_sound_type } from 'game/settings';
import { set_sound } from 'game/settings';
import { setting_fullscreen } from 'game/settings';
import { color_t } from 'graphics/color';
import { key_type } from 'input/keys';
import { key_modifier_type } from 'input/keys';
import { system_resize } from 'game/system';
import { system_set_fullscreen } from 'game/system';
import { button_none } from 'graphics/button';
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
import { clip_code } from 'graphics/graphics';
import { clip_info } from 'graphics/graphics';
import { graphics_in_dialog } from 'graphics/graphics';
import { graphics_reset_dialog } from 'graphics/graphics';
import { language_type } from 'core/locale';
import { encoding_type } from 'core/encoding';
import { font_t } from 'graphics/font';
import FONT_LARGE_BLACK = font_t.FONT_LARGE_BLACK;
import FONT_NORMAL_GREEN = font_t.FONT_NORMAL_GREEN;
import { font_t } from 'graphics/font';
import { font_definition } from 'graphics/font';
import { lang_text_draw_centered } from 'graphics/lang_text';
import { outer_panel_draw } from 'graphics/panel';
import { label_draw } from 'graphics/panel';
import { tooltip_type } from 'graphics/tooltip';
import { tooltip_extra_text_type } from 'graphics/tooltip';
import { tooltip_context } from 'graphics/tooltip';
import { hotkey_action } from 'core/hotkey_config';
import { hotkey_mapping } from 'core/hotkey_config';
import { hotkeys } from 'input/hotkey';
import { window_id } from 'graphics/window';
import WINDOW_DISPLAY_OPTIONS = window_id.WINDOW_DISPLAY_OPTIONS;
import { window_id } from 'graphics/window';
import { window_type } from 'graphics/window';
import { window_draw_underlying_window } from 'graphics/window';
import { window_show } from 'graphics/window';
import { input_go_back_requested } from 'input/input';
let buttons: generic_button[] = new Array().fill({
    { 128, 136, 224, 20, button_fullscreen, button_none, 1, 0},
    { 128, 160, 224, 20, button_set_resolution, button_none, 1, 0},
    { 128, 184, 224, 20, button_set_resolution, button_none, 2, 0},
    { 128, 208, 224, 20, button_set_resolution, button_none, 3, 0},
    { 128, 232, 224, 20, button_cancel, button_none, 1, 0},
});
export class unnamed24_8 {
    public focus_button_id: number = 0;
    public close_callback: void ( = null;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.focus_button_id = args[0]);
        args.length >= 2 && (this.close_callback = args[1]);
    }
}
let data: unnamed24_8 = new unnamed24_8();
function init(close_callback: void () {
    data.focus_button_id = 0;
    data.close_callback = close_callback;
}
function draw_foreground() {
    graphics_in_dialog();
    outer_panel_draw(96, 80, 18, 12);
    label_draw(128, 136, 14, data.focus_button_id == 1 ? 1 : 2);
    label_draw(128, 160, 14, data.focus_button_id == 2 ? 1 : 2);
    label_draw(128, 184, 14, data.focus_button_id == 3 ? 1 : 2);
    label_draw(128, 208, 14, data.focus_button_id == 4 ? 1 : 2);
    label_draw(128, 232, 14, data.focus_button_id == 5 ? 1 : 2);
    lang_text_draw_centered(42, 0, 128, 94, 224, FONT_LARGE_BLACK);
    lang_text_draw_centered(42, setting_fullscreen() ? 2 : 1, 128, 140, 224, FONT_NORMAL_GREEN);
    lang_text_draw_centered(42, 3, 128, 164, 224, FONT_NORMAL_GREEN);
    lang_text_draw_centered(42, 4, 128, 188, 224, FONT_NORMAL_GREEN);
    lang_text_draw_centered(42, 5, 128, 212, 224, FONT_NORMAL_GREEN);
    lang_text_draw_centered(42, 6, 128, 236, 224, FONT_NORMAL_GREEN);
    graphics_reset_dialog();
}
function handle_input(m: mouse, h: hotkeys) {
    if (generic_buttons_handle_mouse(mouse_in_dialog(m), 0, 0, buttons, 5, data.focus_button_id)) {
        return;
    }
    if (input_go_back_requested(m, h)) {
        data.close_callback();
    }
}
function button_fullscreen(param1: number, param2: number) {
    system_set_fullscreen(!setting_fullscreen());
    data.close_callback();
}
function button_set_resolution(id: number, param2: number) {
    switch (id) {
        case 1:
            system_resize(640, 480);
            break
        case 2:
            system_resize(800, 600);
            break
        case 3:
            system_resize(1024, 768);
            break
    }
    data.close_callback();
}
function button_cancel(param1: number, param2: number) {
    data.close_callback();
}
export function window_display_options_show(close_callback: void () {
    let window: window_type = {
        WINDOW_DISPLAY_OPTIONS,
        window_draw_underlying_window,
        draw_foreground,
        handle_input
    };
    init(close_callback);
    window_show(window);
}
