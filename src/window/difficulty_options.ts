
import { setting_decrease_difficulty, setting_difficulty, setting_gods_enabled, setting_increase_difficulty, setting_toggle_gods_enabled } from 'game/settings';
import { arrow_button, arrow_buttons_draw, arrow_buttons_handle_mouse } from 'graphics/arrow_button';
import { font_t } from 'graphics/font';
import { graphics_in_dialog, graphics_reset_dialog } from 'graphics/graphics';
import { lang_text_draw_centered } from 'graphics/lang_text';
import { outer_panel_draw } from 'graphics/panel';
import { window_draw_underlying_window, window_id, window_show, window_type } from 'graphics/window';
import { hotkeys } from 'input/hotkey';
import { input_go_back_requested } from 'input/input';
import { mouse, mouse_in_dialog } from 'input/mouse';
import FONT_NORMAL_BLACK = font_t.FONT_NORMAL_BLACK;
import FONT_LARGE_BLACK = font_t.FONT_LARGE_BLACK;
import WINDOW_DIFFICULTY_OPTIONS = window_id.WINDOW_DIFFICULTY_OPTIONS;
let arrow_buttons: arrow_button[] = [
    new arrow_button(0, 54, 15, 24, arrow_button_difficulty, 0, 0),
    new arrow_button(24, 54, 17, 24, arrow_button_difficulty, 1, 0),
    new arrow_button(24, 102, 21, 24, arrow_button_gods, 2, 0)
];
export class unnamed20_8 {
    public close_callback: (() => void) | null = null;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.close_callback = args[0]);
    }
}
let data: unnamed20_8 = new unnamed20_8();
function draw_foreground() {
    graphics_in_dialog();
    outer_panel_draw(48, 80, 24, 12);
    lang_text_draw_centered(153, 0, 48, 94, 384, FONT_LARGE_BLACK);
    lang_text_draw_centered(153, setting_difficulty() + 1, 70, 142, 244, FONT_NORMAL_BLACK);
    lang_text_draw_centered(153, setting_gods_enabled() ? 7 : 6, 70, 190, 244, FONT_NORMAL_BLACK);
    arrow_buttons_draw(288, 80, arrow_buttons, 3);
    lang_text_draw_centered(153, 8, 48, 246, 384, FONT_NORMAL_BLACK);
    graphics_reset_dialog();
}
function handle_input(m: mouse, h: hotkeys) {
    if (arrow_buttons_handle_mouse(mouse_in_dialog(m), 288, 80, arrow_buttons, 3, 0)) {
        return;
    }
    if (input_go_back_requested(m, h)) {
        data.close_callback();
    }
}
function arrow_button_difficulty(is_down: number, param2: number) {
    if (is_down) {
        setting_decrease_difficulty();
    } else {
        setting_increase_difficulty();
    }
}
function arrow_button_gods(param1: number, param2: number) {
    setting_toggle_gods_enabled();
}
export function window_difficulty_options_show(close_callback: () => void) {
    let window: window_type = new window_type(
        WINDOW_DIFFICULTY_OPTIONS,
        window_draw_underlying_window,
        draw_foreground,
        handle_input
    );
    data.close_callback = close_callback;
    window_show(window);
}
