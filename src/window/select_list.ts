import { button_none } from 'graphics/button';
import { COLOR_BLACK, COLOR_FONT_BLUE, color_t } from 'graphics/color';
import { font_t } from 'graphics/font';
import { generic_button, generic_buttons_handle_mouse } from 'graphics/generic_button';
import { lang_text_draw_centered_colored } from 'graphics/lang_text';
import { BLOCK_SIZE, outer_panel_draw } from 'graphics/panel';
import { text_draw_centered } from 'graphics/text';
import { window_draw_underlying_window, window_go_back, window_id, window_show, window_type } from 'graphics/window';
import { hotkeys } from 'input/hotkey';
import { input_go_back_requested } from 'input/input';
import { mouse } from 'input/mouse';
export const MAX_ITEMS_PER_LIST = 20;
import FONT_NORMAL_PLAIN = font_t.FONT_NORMAL_PLAIN;
import WINDOW_SELECT_LIST = window_id.WINDOW_SELECT_LIST;
export const enum mode {
    MODE_TEXT,
    MODE_GROUP,
}

import MODE_TEXT = mode.MODE_TEXT;
import MODE_GROUP = mode.MODE_GROUP;

let buttons_list1: generic_button[] = [
    new generic_button(5, 8, 190, 18, select_item, button_none, 0, 0),
    new generic_button(5, 28, 190, 18, select_item, button_none, 1, 0),
    new generic_button(5, 48, 190, 18, select_item, button_none, 2, 0),
    new generic_button(5, 68, 190, 18, select_item, button_none, 3, 0),
    new generic_button(5, 88, 190, 18, select_item, button_none, 4, 0),
    new generic_button(5, 108, 190, 18, select_item, button_none, 5, 0),
    new generic_button(5, 128, 190, 18, select_item, button_none, 6, 0),
    new generic_button(5, 148, 190, 18, select_item, button_none, 7, 0),
    new generic_button(5, 168, 190, 18, select_item, button_none, 8, 0),
    new generic_button(5, 188, 190, 18, select_item, button_none, 9, 0),
    new generic_button(5, 208, 190, 18, select_item, button_none, 10, 0),
    new generic_button(5, 228, 190, 18, select_item, button_none, 11, 0),
    new generic_button(5, 248, 190, 18, select_item, button_none, 12, 0),
    new generic_button(5, 268, 190, 18, select_item, button_none, 13, 0),
    new generic_button(5, 288, 190, 18, select_item, button_none, 14, 0),
    new generic_button(5, 308, 190, 18, select_item, button_none, 15, 0),
    new generic_button(5, 328, 190, 18, select_item, button_none, 16, 0),
    new generic_button(5, 348, 190, 18, select_item, button_none, 17, 0),
    new generic_button(5, 368, 190, 18, select_item, button_none, 18, 0),
    new generic_button(5, 388, 190, 18, select_item, button_none, 19, 0),
];
let buttons_list2: generic_button[] = [
    new generic_button(205, 8, 190, 18, select_item, button_none, 0, 1),
    new generic_button(205, 28, 190, 18, select_item, button_none, 1, 1),
    new generic_button(205, 48, 190, 18, select_item, button_none, 2, 1),
    new generic_button(205, 68, 190, 18, select_item, button_none, 3, 1),
    new generic_button(205, 88, 190, 18, select_item, button_none, 4, 1),
    new generic_button(205, 108, 190, 18, select_item, button_none, 5, 1),
    new generic_button(205, 128, 190, 18, select_item, button_none, 6, 1),
    new generic_button(205, 148, 190, 18, select_item, button_none, 7, 1),
    new generic_button(205, 168, 190, 18, select_item, button_none, 8, 1),
    new generic_button(205, 188, 190, 18, select_item, button_none, 9, 1),
    new generic_button(205, 208, 190, 18, select_item, button_none, 10, 1),
    new generic_button(205, 228, 190, 18, select_item, button_none, 11, 1),
    new generic_button(205, 248, 190, 18, select_item, button_none, 12, 1),
    new generic_button(205, 268, 190, 18, select_item, button_none, 13, 1),
    new generic_button(205, 288, 190, 18, select_item, button_none, 14, 1),
    new generic_button(205, 308, 190, 18, select_item, button_none, 15, 1),
    new generic_button(205, 328, 190, 18, select_item, button_none, 16, 1),
    new generic_button(205, 348, 190, 18, select_item, button_none, 17, 1),
    new generic_button(205, 368, 190, 18, select_item, button_none, 18, 1),
    new generic_button(205, 388, 190, 18, select_item, button_none, 19, 1),
];
export class unnamed67_8 {
    public x: number = 0;
    public y: number = 0;
    public mode: number = 0;
    public group: number = 0;
    public items: string[] = [];
    public num_items: number = 0;
    public callback: ((size: number) => void) | null = null;
    public focus_button_id: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.x = args[0]);
        args.length >= 2 && (this.y = args[1]);
        args.length >= 3 && (this.mode = args[2]);
        args.length >= 4 && (this.group = args[3]);
        args.length >= 5 && (this.items = args[4]);
        args.length >= 6 && (this.num_items = args[5]);
        args.length >= 7 && (this.callback = args[6]);
        args.length >= 8 && (this.focus_button_id = args[7]);
    }
}
let data: unnamed67_8 = new unnamed67_8();
function init_group(x: number, y: number, group: number, num_items: number, callback: (size: number) => void) {
    data.x = x;
    data.y = y;
    data.mode = MODE_GROUP;
    data.group = group;
    data.num_items = num_items;
    data.callback = callback;
}
function init_text(x: number, y: number, items: number, num_items: number, callback: (size: number) => void) {
    data.x = x;
    data.y = y;
    data.mode = MODE_TEXT;
    data.items = items;
    data.num_items = num_items;
    data.callback = callback;
}
function items_in_first_list() {
    return data.num_items / 2 + data.num_items % 2;
}
function draw_item(item_id: number, x: number, y: number, selected: boolean) {
    let color: color_t = selected ? COLOR_FONT_BLUE : COLOR_BLACK;
    if (data.mode == MODE_GROUP) {
        lang_text_draw_centered_colored(data.group, item_id, data.x + x, data.y + y, 190, FONT_NORMAL_PLAIN, color);
    } else {
        text_draw_centered(data.items[item_id], data.x + x, data.y + y, 190, FONT_NORMAL_PLAIN, color);
    }
}
function draw_foreground() {
    if (data.num_items > MAX_ITEMS_PER_LIST) {
        let max_first: number = items_in_first_list();
        outer_panel_draw(data.x, data.y, 26, (20 * max_first + 24) / BLOCK_SIZE);
        for (let i: number = 0; i < max_first; i++) {
            draw_item(i, 5, 11 + 20 * i, i + 1 == data.focus_button_id);
        }
        for (let i: number = 0; i < data.num_items - max_first; i++) {
            draw_item(i + max_first, 205, 11 + 20 * i, MAX_ITEMS_PER_LIST + i + 1 == data.focus_button_id);
        }
    } else {
        outer_panel_draw(data.x, data.y, 13, (20 * data.num_items + 24) / BLOCK_SIZE);
        for (let i: number = 0; i < data.num_items; i++) {
            draw_item(i, 5, 11 + 20 * i, i + 1 == data.focus_button_id);
        }
    }
}
function handle_input(m: mouse, h: hotkeys) {
    if (data.num_items > MAX_ITEMS_PER_LIST) {
        let items_first: number = items_in_first_list();
        if (generic_buttons_handle_mouse(m, data.x, data.y, buttons_list1, items_first, data.focus_button_id)) {
            return;
        }
        let second_id: number = 0;
        generic_buttons_handle_mouse(m, data.x, data.y, buttons_list2, data.num_items - items_first, second_id);
        if (second_id > 0) {
            data.focus_button_id = second_id + MAX_ITEMS_PER_LIST;
        }
    } else {
        if (generic_buttons_handle_mouse(m, data.x, data.y, buttons_list1, data.num_items, data.focus_button_id)) {
            return;
        }
    }
    if (input_go_back_requested(m, h)) {
        window_go_back();
    }
}
export function select_item(id: number, list_id: number) {
    window_go_back();
    if (list_id == 0) {
        data.callback(id);
    } else {
        data.callback(id + items_in_first_list());
    }
}
export function window_select_list_show(x: number, y: number, group: number, num_items: number, callback: (size: number) => void) {
    let window: window_type = new window_type(
        WINDOW_SELECT_LIST,
        window_draw_underlying_window,
        draw_foreground,
        handle_input
    );
    init_group(x, y, group, num_items, callback);
    window_show(window);
}
export function window_select_list_show_text(x: number, y: number, items: number, num_items: number, callback: (size: number) => void) {
    let window: window_type = new window_type(
        WINDOW_SELECT_LIST,
        window_draw_underlying_window,
        draw_foreground,
        handle_input
    );
    init_text(x, y, items, num_items, callback);
    window_show(window);
}
