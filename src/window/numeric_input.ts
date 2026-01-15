import { button_none } from 'graphics/button';
import { COLOR_BLACK, COLOR_FONT_BLUE, COLOR_FONT_RED, color_t } from 'graphics/color';
import { font_t } from 'graphics/font';
import { generic_button, generic_buttons_handle_mouse } from 'graphics/generic_button';
import { graphics_draw_rect, graphics_fill_rect } from 'graphics/graphics';
import { lang_text_draw_centered_colored } from 'graphics/lang_text';
import { outer_panel_draw } from 'graphics/panel';
import { text_draw_centered, text_draw_number_centered_colored } from 'graphics/text';
import { window_draw_underlying_window, window_go_back, window_id, window_show, window_type } from 'graphics/window';
import { hotkeys } from 'input/hotkey';
import { input_go_back_requested } from 'input/input';
import { keyboard_start_capture_numeric, keyboard_stop_capture_numeric } from 'input/keyboard';
import { mouse } from 'input/mouse';
import { sound_effect, sound_effect_play } from 'sound/effect';
import { Ref } from '../../ext/crt';
import FONT_NORMAL_PLAIN = font_t.FONT_NORMAL_PLAIN;
import FONT_LARGE_PLAIN = font_t.FONT_LARGE_PLAIN;
import WINDOW_NUMERIC_INPUT = window_id.WINDOW_NUMERIC_INPUT;
import SOUND_EFFECT_BUILD = sound_effect.SOUND_EFFECT_BUILD;
let buttons: generic_button[] = [
    new generic_button(21, 51, 25, 25, button_number, button_none, 1, 0),
    new generic_button(51, 51, 25, 25, button_number, button_none, 2, 0),
    new generic_button(81, 51, 25, 25, button_number, button_none, 3, 0),
    new generic_button(21, 81, 25, 25, button_number, button_none, 4, 0),
    new generic_button(51, 81, 25, 25, button_number, button_none, 5, 0),
    new generic_button(81, 81, 25, 25, button_number, button_none, 6, 0),
    new generic_button(21, 111, 25, 25, button_number, button_none, 7, 0),
    new generic_button(51, 111, 25, 25, button_number, button_none, 8, 0),
    new generic_button(81, 111, 25, 25, button_number, button_none, 9, 0),
    new generic_button(21, 141, 25, 25, button_number, button_none, 0, 0),
    new generic_button(51, 141, 55, 25, button_accept, button_none, 1, 0),
    new generic_button(21, 171, 85, 25, button_cancel, button_none, 1, 0)
];
export class unnamed36_8 {
    public x: number = 0;
    public y: number = 0;
    public max_digits: number = 0;
    public max_value: number = 0;
    public callback: ((value: number) => void) | null = null;
    public num_digits: number = 0;
    public value: number = 0;
    public focus_button_id: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.x = args[0]);
        args.length >= 2 && (this.y = args[1]);
        args.length >= 3 && (this.max_digits = args[2]);
        args.length >= 4 && (this.max_value = args[3]);
        args.length >= 5 && (this.callback = args[4]);
        args.length >= 6 && (this.num_digits = args[5]);
        args.length >= 7 && (this.value = args[6]);
        args.length >= 8 && (this.focus_button_id = args[7]);
    }
}
let data: unnamed36_8 = new unnamed36_8();
function init(x: number, y: number, max_digits: number, max_value: number, callback: (value: number) => void) {
    data.x = x;
    data.y = y;
    data.max_digits = max_digits;
    data.max_value = max_value;
    data.callback = callback;
    data.num_digits = 0;
    data.value = 0;
    data.focus_button_id = 0;
    keyboard_start_capture_numeric(input_number);
}
function close() {
    keyboard_stop_capture_numeric();
    window_go_back();
}
function draw_number_button(x: number, y: number, number: number, is_selected: boolean | number) {
    let color: color_t = is_selected ? COLOR_FONT_BLUE : COLOR_BLACK;
    graphics_draw_rect(x, y, 25, 25, color);
    let number_string: number[] = new Array(2).fill(0);
    number_string[0] = '0'.charCodeAt(0) + number;
    number_string[1] = 0;
    text_draw_centered(number_string, x, y, 25, FONT_LARGE_PLAIN, color);
}
function draw_foreground() {
    outer_panel_draw(data.x, data.y, 8, 14);
    graphics_fill_rect(data.x + 16, data.y + 16, 96, 30, COLOR_BLACK);
    if (data.num_digits > 0) {
        text_draw_number_centered_colored(data.value, data.x + 16, data.y + 19, 92, FONT_LARGE_PLAIN, COLOR_FONT_RED);
    }
    draw_number_button(data.x + 21, data.y + 51, 1, data.focus_button_id == 1);
    draw_number_button(data.x + 51, data.y + 51, 2, data.focus_button_id == 2);
    draw_number_button(data.x + 81, data.y + 51, 3, data.focus_button_id == 3);
    draw_number_button(data.x + 21, data.y + 81, 4, data.focus_button_id == 4);
    draw_number_button(data.x + 51, data.y + 81, 5, data.focus_button_id == 5);
    draw_number_button(data.x + 81, data.y + 81, 6, data.focus_button_id == 6);
    draw_number_button(data.x + 21, data.y + 111, 7, data.focus_button_id == 7);
    draw_number_button(data.x + 51, data.y + 111, 8, data.focus_button_id == 8);
    draw_number_button(data.x + 81, data.y + 111, 9, data.focus_button_id == 9);
    draw_number_button(data.x + 21, data.y + 141, 0, data.focus_button_id == 10);
    graphics_draw_rect(data.x + 51, data.y + 141, 55, 25, data.focus_button_id == 11 ? COLOR_FONT_BLUE : COLOR_BLACK);
    lang_text_draw_centered_colored(44, 16, data.x + 51, data.y + 147, 55, FONT_NORMAL_PLAIN,
        data.focus_button_id == 11 ? COLOR_FONT_BLUE : COLOR_BLACK);
    graphics_draw_rect(data.x + 21, data.y + 171, 85, 25, data.focus_button_id == 12 ? COLOR_FONT_BLUE : COLOR_BLACK);
    lang_text_draw_centered_colored(44, 17, data.x + 21, data.y + 177, 85, FONT_NORMAL_PLAIN,
        data.focus_button_id == 12 ? COLOR_FONT_BLUE : COLOR_BLACK);
}
function handle_input(m: mouse, h: hotkeys) {
    const focusRef = new Ref(data.focus_button_id);
    if (generic_buttons_handle_mouse(m, data.x, data.y, buttons, 12, focusRef)) {
        data.focus_button_id = focusRef.v;
        return;
    }
    data.focus_button_id = focusRef.v;
    if (input_go_back_requested(m, h)) {
        close();
    }
    if (h.enter_pressed) {
        input_accept();
    }
}
function button_number(number: number, param2: number) {
    input_number(number);
}
function button_accept(param1: number, param2: number) {
    input_accept();
}
function button_cancel(param1: number, param2: number) {
    close();
}
function input_number(number: number) {
    if (data.num_digits < data.max_digits) {
        data.value = data.value * 10 + number;
        data.num_digits++;
        sound_effect_play(SOUND_EFFECT_BUILD);
    }
}
function input_accept() {
    close();
    if (data.value > data.max_value) {
        data.value = data.max_value;
    }
    data.callback(data.value);
}
export function window_numeric_input_show(x: number, y: number, max_digits: number, max_value: number, callback: (value: number) => void) {
    let window: window_type = new window_type(
        WINDOW_NUMERIC_INPUT,
        window_draw_underlying_window,
        draw_foreground,
        handle_input,
    );
    init(x, y, max_digits, max_value, callback);
    window_show(window);
}
