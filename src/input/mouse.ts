export const DOUBLE_CLICK_TIME = 300;
import { time_get_millis, time_millis } from 'core/time';
import { screen_dialog_offset_x, screen_dialog_offset_y } from 'graphics/screen';
import { scroll_state } from 'input/mouse';
import { touch, touch_get_scroll, touch_is_scroll, touch_was_double_click } from 'input/touch';
export class mouse_button {
    public is_down: number = 0;
    public went_down: number = 0;
    public went_up: number = 0;
    public double_click: number = 0;
    public system_change: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.is_down = args[0]);
        args.length >= 2 && (this.went_down = args[1]);
        args.length >= 3 && (this.went_up = args[2]);
        args.length >= 4 && (this.double_click = args[3]);
        args.length >= 5 && (this.system_change = args[4]);
    }
}
import SCROLL_NONE = scroll_state.SCROLL_NONE;
export class mouse {
    public x: number = 0;
    public y: number = 0;
    public scrolled: scroll_state = null;
    public left: mouse_button = null;
    public right: mouse_button = null;
    public is_inside_window: number = 0;
    public is_touch: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.x = args[0]);
        args.length >= 2 && (this.y = args[1]);
        args.length >= 3 && (this.scrolled = args[2]);
        args.length >= 4 && (this.left = args[3]);
        args.length >= 5 && (this.right = args[4]);
        args.length >= 6 && (this.is_inside_window = args[5]);
        args.length >= 7 && (this.is_touch = args[6]);
    }
};
export const enum system {
    SYSTEM_NONE = 0,
    SYSTEM_UP = 1,
    SYSTEM_DOWN = 2,
    SYSTEM_DOUBLE_CLICK = 4,
}
let data: mouse;
let dialog: mouse;
let last_click: time_millis;
export function mouse_get() {
    return data;
}
function clear_mouse_button(button: mouse_button) {
    button.is_down = 0;
    button.went_down = 0;
    button.went_up = 0;
    button.double_click = 0;
    button.system_change = SYSTEM_NONE;
}
export function mouse_set_from_touch(first: touch, last: touch) {
    data.x = first.current_point.x;
    data.y = first.current_point.y;
    data.scrolled = touch_get_scroll();
    data.is_inside_window = !first.has_ended;
    data.is_touch = 1;
    data.left.system_change = SYSTEM_NONE;
    data.right.system_change = SYSTEM_NONE;
    if (touch_is_scroll()) {
        mouse_reset_button_state();
        return;
    }
    data.left.is_down = (!first.has_ended && first.in_use);
    data.left.went_down = first.has_started;
    data.left.went_up = first.has_ended;
    data.left.double_click = touch_was_double_click(first);
    data.right.is_down = (!last.has_ended && last.in_use);
    data.right.went_down = last.has_started;
    data.right.went_up = last.has_ended;
}
export function mouse_remove_touch() {
    data.is_touch = 0;
}
export function mouse_set_position(x: number, y: number) {
    if (x != data.x || y != data.y) {
        last_click = 0;
    }
    data.x = x;
    data.y = y;
    data.is_touch = 0;
    data.is_inside_window = 1;
}
export function mouse_set_left_down(down: number) {
    data.left.system_change |= down ? SYSTEM_DOWN : SYSTEM_UP
    data.is_touch = 0;
    data.is_inside_window = 1;
    if (!down) {
        let now: time_millis = time_get_millis();
        let is_double_click: number = (last_click < now) && ((now - last_click) <= DOUBLE_CLICK_TIME);
        data.left.system_change |= is_double_click ? SYSTEM_DOUBLE_CLICK : SYSTEM_NONE
        last_click = now;
    }
}
export function mouse_set_right_down(down: number) {
    data.right.system_change |= down ? SYSTEM_DOWN : SYSTEM_UP
    data.is_touch = 0;
    data.is_inside_window = 1;
    last_click = 0;
}
export function mouse_set_inside_window(inside: number) {
    data.is_inside_window = inside;
    data.is_touch = 0;
}
function update_button_state(button: mouse_button) {
    button.went_down = (button.system_change & SYSTEM_DOWN) == SYSTEM_DOWN;
    button.went_up = (button.system_change & SYSTEM_UP) == SYSTEM_UP;
    button.double_click = (button.system_change & SYSTEM_DOUBLE_CLICK) == SYSTEM_DOUBLE_CLICK;
    button.system_change = SYSTEM_NONE;
    button.is_down = (button.is_down || button.went_down) && !button.went_up;
}
export function mouse_determine_button_state() {
    update_button_state(data.left);
    update_button_state(data.right);
}
export function mouse_set_scroll(state: scroll_state) {
    data.scrolled = state;
    data.is_touch = 0;
    data.is_inside_window = 1;
}
export function mouse_reset_scroll() {
    data.scrolled = SCROLL_NONE;
}
export function mouse_reset_up_state() {
    data.left.went_up = 0;
    data.right.went_up = 0;
}
export function mouse_reset_button_state() {
    last_click = 0;
    clear_mouse_button(data.left);
    clear_mouse_button(data.right);
}
export function mouse_in_dialog(m: mouse) {
    dialog.left = m.left;
    dialog.right = m.right;
    dialog.scrolled = m.scrolled;
    dialog.is_inside_window = m.is_inside_window;
    dialog.is_touch = m.is_touch;
    dialog.x = m.x - screen_dialog_offset_x();
    dialog.y = m.y - screen_dialog_offset_y();
    return dialog;
}
