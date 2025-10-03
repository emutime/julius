export const MAX_QUEUE = 3;
import { time_millis } from 'core/time';
import { touch_coords } from 'input/touch';
import { touch_mode } from 'input/touch';
import { touch } from 'input/touch';
import { reset_touches } from 'input/touch';
import { touch_to_mouse } from 'input/touch';
import { mouse_button } from 'input/mouse';
import { scroll_state } from 'input/mouse';
import { mouse } from 'input/mouse';
import { mouse_get } from 'input/mouse';
import { mouse_reset_scroll } from 'input/mouse';
import { mouse_reset_button_state } from 'input/mouse';
import { mouse_determine_button_state } from 'input/mouse';
import { tooltip_type } from 'graphics/tooltip';
import { tooltip_extra_text_type } from 'graphics/tooltip';
import { tooltip_context } from 'graphics/tooltip';
import { tooltip_invalidate } from 'graphics/tooltip';
import { tooltip_handle } from 'graphics/tooltip';;
import { key_type } from 'input/keys';
import { key_modifier_type } from 'input/keys';
import { hotkey_action } from 'core/hotkey_config';
import { hotkey_mapping } from 'core/hotkey_config';
import { hotkeys } from 'input/hotkey';
import { hotkey_state } from 'input/hotkey';
import { hotkey_reset_state } from 'input/hotkey';
import { hotkey_handle_global_keys } from 'input/hotkey';
export class window_type {
    public id: window_id = null;
    public draw_background: void ( = null;
    public draw_foreground: void ( = null;
    public handle_input: void ( = null;
    public get_tooltip: void ( = null;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.id = args[0]);
        args.length >= 2 && (this.draw_background = args[1]);
        args.length >= 3 && (this.draw_foreground = args[2]);
        args.length >= 4 && (this.handle_input = args[3]);
        args.length >= 5 && (this.get_tooltip = args[4]);
    }
}
import { warning_draw } from 'graphics/warning';
import { cursor_shape } from 'input/cursor';
import { cursor_scale } from 'input/cursor';
import { cursor } from 'input/cursor';
import { input_cursor_update } from 'input/cursor';
import { joystick_element } from 'input/joystick';
import { mapping_action } from 'input/joystick';
import MAPPING_ACTION_MAX = mapping_action.MAPPING_ACTION_MAX;
import { mapping_action } from 'input/joystick';
import { mapping_element } from 'input/joystick';
import { joystick_model } from 'input/joystick';
import { joystick_to_mouse_and_keyboard } from 'input/joystick';
import { buffer } from 'core/buffer';
import { view_tile } from 'city/view';
import { pixel_offset } from 'city/view';
import { map_callback } from 'city/view';
import { scroll_type } from 'input/scroll';
import { scroll_stop } from 'input/scroll';
export class unnamed13_8 {
    public window_queue: window_type[] = new Array(MAX_QUEUE).fill(null);
    public queue_index: number = 0;
    public current_window: window_type = null;
    public refresh_immediate: number = 0;
    public refresh_on_draw: number = 0;
    public underlying_windows_redrawing: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.window_queue = args[0]);
        args.length >= 2 && (this.queue_index = args[1]);
        args.length >= 3 && (this.current_window = args[2]);
        args.length >= 4 && (this.refresh_immediate = args[3]);
        args.length >= 5 && (this.refresh_on_draw = args[4]);
        args.length >= 6 && (this.underlying_windows_redrawing = args[5]);
    }
}
let data: unnamed13_8 = new unnamed13_8();
function noop() {
}
function noop_input(m: mouse, h: hotkeys) {
}
function increase_queue_index() {
    data.queue_index++;
    if (data.queue_index >= MAX_QUEUE) {
        data.queue_index = 0;
    }
}
function decrease_queue_index() {
    data.queue_index--;
    if (data.queue_index < 0) {
        data.queue_index = MAX_QUEUE - 1;
    }
}
function reset_input() {
    mouse_reset_button_state();
    reset_touches(1);
    scroll_stop();
}
export function window_invalidate() {
    data.refresh_immediate = 1;
    data.refresh_on_draw = 1;
}
export function window_is_invalid() {
    return data.refresh_immediate;
}
export function window_request_refresh() {
    data.refresh_on_draw = 1;
}
export function window_is(id: window_id) {
    return data.current_window.id == id;
}
export function window_get_id() {
    return data.current_window.id;
}
export function window_show(window: window_type) {
    reset_input();
    increase_queue_index();
    data.window_queue[data.queue_index] = * window;
    data.current_window = data.window_queue[data.queue_index];
    if (!data.current_window.draw_background) {
        data.current_window.draw_background = noop;
    }
    if (!data.current_window.draw_foreground) {
        data.current_window.draw_foreground = noop;
    }
    if (!data.current_window.handle_input) {
        data.current_window.handle_input = noop_input;
    }
    window_invalidate();
}
export function window_go_back() {
    reset_input();
    decrease_queue_index();
    data.current_window = data.window_queue[data.queue_index];
    window_invalidate();
}
function update_input_before() {
    let handled: number = touch_to_mouse();
    handled |= joystick_to_mouse_and_keyboard()
    if (!handled) {
        mouse_determine_button_state();
    }
    hotkey_handle_global_keys();
}
function update_input_after() {
    reset_touches(0);
    mouse_reset_scroll();
    input_cursor_update(data.current_window.id);
    hotkey_reset_state();
}
export function window_draw(force: number) {
    update_input_before();
    let w: window_type = data.current_window;
    if (force || data.refresh_on_draw) {
        tooltip_invalidate();
        w.draw_background();
        data.refresh_on_draw = 0;
        data.refresh_immediate = 0;
    }
    w.draw_foreground();
    let m: mouse = mouse_get();
    let h: hotkeys = hotkey_state();
    w.handle_input(m, h);
    tooltip_handle(m, w.get_tooltip);
    warning_draw();
    update_input_after();
}
export function window_draw_underlying_window() {
    if (data.underlying_windows_redrawing < MAX_QUEUE) {
        ++data.underlying_windows_redrawing;
        decrease_queue_index();
        let window_behind: window_type = data.window_queue[data.queue_index];
        if (window_behind.draw_background) {
            window_behind.draw_background();
        }
        if (window_behind.draw_foreground) {
            window_behind.draw_foreground();
        }
        increase_queue_index();
        --data.underlying_windows_redrawing;
    }
}
