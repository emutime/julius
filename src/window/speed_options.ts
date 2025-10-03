
;
import { set_tooltips } from 'game/settings';
import { set_difficulty } from 'game/settings';
import { set_sound_type } from 'game/settings';
import { set_sound } from 'game/settings';
import { setting_game_speed } from 'game/settings';
import { setting_increase_game_speed } from 'game/settings';
import { setting_decrease_game_speed } from 'game/settings';
import { setting_scroll_speed } from 'game/settings';
import { setting_increase_scroll_speed } from 'game/settings';
import { setting_decrease_scroll_speed } from 'game/settings';
import { setting_reset_speeds } from 'game/settings';
import { time_millis } from 'core/time';
import { touch_coords } from 'input/touch';
import { touch_mode } from 'input/touch';
import { touch } from 'input/touch';
import { mouse_button } from 'input/mouse';
import { scroll_state } from 'input/mouse';
import { mouse } from 'input/mouse';
import { mouse_in_dialog } from 'input/mouse';
import { arrow_button } from 'graphics/arrow_button';
import { arrow_buttons_draw } from 'graphics/arrow_button';
import { arrow_buttons_handle_mouse } from 'graphics/arrow_button';
import { button_none } from 'graphics/button';
import { generic_button } from 'graphics/generic_button';
import { generic_buttons_handle_mouse } from 'graphics/generic_button';
import { color_t } from 'graphics/color';
import { clip_code } from 'graphics/graphics';
import { clip_info } from 'graphics/graphics';
import { graphics_in_dialog } from 'graphics/graphics';
import { graphics_reset_dialog } from 'graphics/graphics';
import { language_type } from 'core/locale';
import { encoding_type } from 'core/encoding';
import { font_t } from 'graphics/font';
import FONT_NORMAL_PLAIN = font_t.FONT_NORMAL_PLAIN;
import FONT_LARGE_BLACK = font_t.FONT_LARGE_BLACK;
import FONT_NORMAL_GREEN = font_t.FONT_NORMAL_GREEN;
import { font_t } from 'graphics/font';
import { font_definition } from 'graphics/font';
import { lang_text_draw } from 'graphics/lang_text';
import { lang_text_draw_centered } from 'graphics/lang_text';
import { outer_panel_draw } from 'graphics/panel';
import { label_draw } from 'graphics/panel';
import { text_draw_percentage } from 'graphics/text';
import { tooltip_type } from 'graphics/tooltip';
import { tooltip_extra_text_type } from 'graphics/tooltip';
import { tooltip_context } from 'graphics/tooltip';
import { key_type } from 'input/keys';
import { key_modifier_type } from 'input/keys';
import { hotkey_action } from 'core/hotkey_config';
import { hotkey_mapping } from 'core/hotkey_config';
import { hotkeys } from 'input/hotkey';
import { window_id } from 'graphics/window';
import WINDOW_SPEED_OPTIONS = window_id.WINDOW_SPEED_OPTIONS;
import { window_id } from 'graphics/window';
import { window_type } from 'graphics/window';
import { window_draw_underlying_window } from 'graphics/window';
import { window_show } from 'graphics/window';
import { input_go_back_requested } from 'input/input';
let buttons: generic_button[] = new Array().fill({
    { 144, 232, 192, 20, button_ok, button_none, 1, 0},
    { 144, 262, 192, 20, button_cancel, button_none, 1, 0},
});
let arrow_buttons: arrow_button[] = new Array().fill({
    { 112, 100, 17, 24, arrow_button_game, 1, 0},
    { 136, 100, 15, 24, arrow_button_game, 0, 0},
    { 112, 136, 17, 24, arrow_button_scroll, 1, 0},
    { 136, 136, 15, 24, arrow_button_scroll, 0, 0},
});
export class unnamed31_8 {
    public focus_button_id: number = 0;
    public close_callback: void ( = null;
    public original_game_speed: number = 0;
    public original_scroll_speed: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.focus_button_id = args[0]);
        args.length >= 2 && (this.close_callback = args[1]);
        args.length >= 3 && (this.original_game_speed = args[2]);
        args.length >= 4 && (this.original_scroll_speed = args[3]);
    }
}
let data: unnamed31_8 = new unnamed31_8();
function init(close_callback: void () {
    data.focus_button_id = 0;
    data.close_callback = close_callback;
    data.original_game_speed = setting_game_speed();
    data.original_scroll_speed = setting_scroll_speed();
}
function draw_foreground() {
    graphics_in_dialog();
    outer_panel_draw(80, 80, 20, 14);
    label_draw(144, 232, 12, data.focus_button_id == 1 ? 1 : 2);
    label_draw(144, 262, 12, data.focus_button_id == 2 ? 1 : 2);
    lang_text_draw_centered(45, 0, 96, 92, 288, FONT_LARGE_BLACK);
    lang_text_draw_centered(45, 4, 128, 236, 224, FONT_NORMAL_GREEN);
    lang_text_draw_centered(45, 1, 128, 266, 224, FONT_NORMAL_GREEN);
    lang_text_draw(45, 2, 112, 146, FONT_NORMAL_PLAIN);
    text_draw_percentage(setting_game_speed(), 328, 146, FONT_NORMAL_PLAIN);
    lang_text_draw(45, 3, 112, 182, FONT_NORMAL_PLAIN);
    text_draw_percentage(setting_scroll_speed(), 328, 182, FONT_NORMAL_PLAIN);
    arrow_buttons_draw(160, 40, arrow_buttons, 4);
    graphics_reset_dialog();
}
function handle_input(m: mouse, h: hotkeys) {
    let m_dialog: mouse = mouse_in_dialog(m);
    if (generic_buttons_handle_mouse(m_dialog, 0, 0, buttons, 2, data.focus_button_id) ||
        arrow_buttons_handle_mouse(m_dialog, 160, 40, arrow_buttons, 4, 0)) {
        return;
    }
    if (input_go_back_requested(m, h)) {
        data.close_callback();
    }
}
function button_ok(param1: number, param2: number) {
    data.close_callback();
}
function button_cancel(param1: number, param2: number) {
    setting_reset_speeds(data.original_game_speed, data.original_scroll_speed);
    data.close_callback();
}
function arrow_button_game(is_down: number, param2: number) {
    if (is_down) {
        setting_decrease_game_speed();
    } else {
        setting_increase_game_speed();
    }
}
function arrow_button_scroll(is_down: number, param2: number) {
    if (is_down) {
        setting_decrease_scroll_speed();
    } else {
        setting_increase_scroll_speed();
    }
}
export function window_speed_options_show(close_callback: void () {
    let window: window_type = {
        WINDOW_SPEED_OPTIONS,
        window_draw_underlying_window,
        draw_foreground,
        handle_input
    };
    init(close_callback);
    window_show(window);
}
