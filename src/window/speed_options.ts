
import { setting_decrease_game_speed, setting_decrease_scroll_speed, setting_game_speed, setting_increase_game_speed, setting_increase_scroll_speed, setting_reset_speeds, setting_scroll_speed } from 'game/settings';
import { arrow_button, arrow_buttons_draw, arrow_buttons_handle_mouse } from 'graphics/arrow_button';
import { button_none } from 'graphics/button';
import { font_t } from 'graphics/font';
import { generic_button, generic_buttons_handle_mouse } from 'graphics/generic_button';
import { graphics_in_dialog, graphics_reset_dialog } from 'graphics/graphics';
import { lang_text_draw, lang_text_draw_centered } from 'graphics/lang_text';
import { label_draw, outer_panel_draw } from 'graphics/panel';
import { text_draw_percentage } from 'graphics/text';
import { window_draw_underlying_window, window_id, window_show, window_type } from 'graphics/window';
import { hotkeys } from 'input/hotkey';
import { input_go_back_requested } from 'input/input';
import { mouse, mouse_in_dialog } from 'input/mouse';
import { Ref } from '../../ext/crt';
import FONT_NORMAL_PLAIN = font_t.FONT_NORMAL_PLAIN;
import FONT_LARGE_BLACK = font_t.FONT_LARGE_BLACK;
import FONT_NORMAL_GREEN = font_t.FONT_NORMAL_GREEN;
import WINDOW_SPEED_OPTIONS = window_id.WINDOW_SPEED_OPTIONS;
let buttons: generic_button[] = [
    new generic_button(144, 232, 192, 20, button_ok, button_none, 1, 0),
    new generic_button(144, 262, 192, 20, button_cancel, button_none, 1, 0),
];
let arrow_buttons: arrow_button[] = [
    new arrow_button(112, 100, 17, 24, arrow_button_game, 1, 0),
    new arrow_button(136, 100, 15, 24, arrow_button_game, 0, 0),
    new arrow_button(112, 136, 17, 24, arrow_button_scroll, 1, 0),
    new arrow_button(136, 136, 15, 24, arrow_button_scroll, 0, 0),
];
export class unnamed31_8 {
    public focus_button_id: number = 0;
    public close_callback: (() => void) | null = null;
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
function init(close_callback: () => void) {
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
    const focusRef = new Ref(data.focus_button_id);
    if (generic_buttons_handle_mouse(m_dialog, 0, 0, buttons, 2, focusRef) ||
        arrow_buttons_handle_mouse(m_dialog, 160, 40, arrow_buttons, 4, 0)) {
        data.focus_button_id = focusRef.v;
        return;
    }
    data.focus_button_id = focusRef.v;
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
export function window_speed_options_show(close_callback: () => void) {
    let window: window_type = new window_type(
        WINDOW_SPEED_OPTIONS,
        window_draw_underlying_window,
        draw_foreground,
        handle_input
    );
    init(close_callback);
    window_show(window);
}
