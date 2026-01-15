export const MIN_DIALOG_WIDTH = 320;
import { city_labor_max_selectable_priority, city_labor_set_priority } from 'city/labor';
import { button_none } from 'graphics/button';
import { COLOR_BLACK, COLOR_RED, color_t } from 'graphics/color';
import { font_t } from 'graphics/font';
import { generic_button, generic_buttons_handle_mouse } from 'graphics/generic_button';
import { graphics_draw_rect, graphics_in_dialog, graphics_reset_dialog, graphics_shade_rect } from 'graphics/graphics';
import { lang_text_draw_centered, lang_text_get_width } from 'graphics/lang_text';
import { BLOCK_SIZE, outer_panel_draw } from 'graphics/panel';
import { tooltip_context, tooltip_type } from 'graphics/tooltip';
import { window_draw_underlying_window, window_go_back, window_id, window_show, window_type } from 'graphics/window';
import { hotkeys } from 'input/hotkey';
import { input_go_back_requested } from 'input/input';
import { mouse, mouse_in_dialog } from 'input/mouse';
import { Ref } from '../../ext/crt';
;
import FONT_NORMAL_BLACK = font_t.FONT_NORMAL_BLACK;
import FONT_LARGE_BLACK = font_t.FONT_LARGE_BLACK;
import TOOLTIP_BUTTON = tooltip_type.TOOLTIP_BUTTON;
import WINDOW_LABOR_PRIORITY = window_id.WINDOW_LABOR_PRIORITY;
export class unnamed15_8 {
    public category: number = 0;
    public max_items: number = 0;
    public focus_button_id: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.category = args[0]);
        args.length >= 2 && (this.max_items = args[1]);
        args.length >= 3 && (this.focus_button_id = args[2]);
    }
}
let data: unnamed15_8 = new unnamed15_8();
let priority_buttons: generic_button[] = [
    new generic_button(180, 256, 280, 25, button_set_priority, button_none, 0, 0), // no prio
    new generic_button(178, 221, 27, 27, button_set_priority, button_none, 1, 0),
    new generic_button(210, 221, 27, 27, button_set_priority, button_none, 2, 0),
    new generic_button(242, 221, 27, 27, button_set_priority, button_none, 3, 0),
    new generic_button(274, 221, 27, 27, button_set_priority, button_none, 4, 0),
    new generic_button(306, 221, 27, 27, button_set_priority, button_none, 5, 0),
    new generic_button(338, 221, 27, 27, button_set_priority, button_none, 6, 0),
    new generic_button(370, 221, 27, 27, button_set_priority, button_none, 7, 0),
    new generic_button(402, 221, 27, 27, button_set_priority, button_none, 8, 0),
    new generic_button(434, 221, 27, 27, button_set_priority, button_none, 9, 0),
];
function init(category: number) {
    data.category = category;
    data.max_items = city_labor_max_selectable_priority(category);
}
function get_dialog_width() {
    let title_width: number = lang_text_get_width(50, 25, FONT_LARGE_BLACK);
    let rclick_width: number = lang_text_get_width(13, 3, FONT_NORMAL_BLACK);
    let dialog_width: number = 16 + (title_width > rclick_width ? title_width : rclick_width);
    if (dialog_width < MIN_DIALOG_WIDTH) {
        dialog_width = MIN_DIALOG_WIDTH;
    }
    if (dialog_width % BLOCK_SIZE != 0) {
        dialog_width += BLOCK_SIZE - dialog_width % BLOCK_SIZE
    }
    return dialog_width;
}
function draw_background() {
    window_draw_underlying_window();
    graphics_in_dialog();
    let dialog_width: number = get_dialog_width();
    let dialog_x: number = 160 - (dialog_width - MIN_DIALOG_WIDTH) / 2;
    outer_panel_draw(dialog_x, 176, dialog_width / BLOCK_SIZE, 9);
    lang_text_draw_centered(50, 25, 160, 185, 320, FONT_LARGE_BLACK);
    for (let i: number = 0; i < 9; i++) {
        graphics_draw_rect(178 + 32 * i, 221, 27, 27, COLOR_BLACK);
        lang_text_draw_centered(50, 27 + i, 178 + 32 * i, 224, 27, FONT_LARGE_BLACK);
        if (i >= data.max_items) {
            graphics_shade_rect(179 + 32 * i, 222, 25, 25, 1);
        }
    }
    graphics_draw_rect(180, 256, 280, 25, COLOR_BLACK);
    lang_text_draw_centered(50, 26, 148, 263, 344, FONT_NORMAL_BLACK);
    lang_text_draw_centered(13, 3, 128, 296, 384, FONT_NORMAL_BLACK);
    graphics_reset_dialog();
}
function draw_foreground() {
    graphics_in_dialog();
    let color: color_t;
    for (let i: number = 0; i < 9; i++) {
        color = COLOR_BLACK;
        if (i == data.focus_button_id - 2) {
            color = COLOR_RED;
        }
        graphics_draw_rect(178 + 32 * i, 221, 27, 27, color);
    }
    color = COLOR_BLACK;
    if (data.focus_button_id == 1) {
        color = COLOR_RED;
    }
    graphics_draw_rect(180, 256, 280, 25, color);
    graphics_reset_dialog();
}
function handle_input(m: mouse, h: hotkeys) {
    const focusRef = new Ref(data.focus_button_id);
    if (generic_buttons_handle_mouse(mouse_in_dialog(m), 0, 0,
        priority_buttons, 1 + data.max_items, focusRef)) {
        data.focus_button_id = focusRef.v;
        return;
    }
    data.focus_button_id = focusRef.v;
    if (input_go_back_requested(m, h)) {
        window_go_back();
    }
}
function button_set_priority(new_priority: number, param2: number) {
    city_labor_set_priority(data.category, new_priority);
    window_go_back();
}
function get_tooltip(c: tooltip_context) {
    if (!data.focus_button_id) {
        return;
    }
    c.type = TOOLTIP_BUTTON;
    if (data.focus_button_id == 1) {
        c.text_id = 92;
    } else {
        c.text_id = 93;
    }
}
export function window_labor_priority_show(category: number) {
    let window: window_type = new window_type(
        WINDOW_LABOR_PRIORITY,
        draw_background,
        draw_foreground,
        handle_input,
        get_tooltip
    );
    init(category);
    window_show(window);
}
