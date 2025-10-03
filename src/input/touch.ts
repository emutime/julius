export const CLICK_TIME = 300;
export const MAX_ACTIVE_TOUCHES = 2;
export const SCROLL_FINGER_RADIUS = 25;
export const NOT_MOVING_RANGE = 5;
export const MILLIS_TOLERANCE_BETWEEN_LAST_MOVE_AND_TOUCH_END = 60;
import { time_millis } from 'core/time';
import { time_get_millis } from 'core/time';
export class touch_coords {
    public x: number = 0;
    public y: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.x = args[0]);
        args.length >= 2 && (this.y = args[1]);
    }
}
import { touch_mode } from 'input/touch';
import TOUCH_MODE_TOUCHPAD = touch_mode.TOUCH_MODE_TOUCHPAD;
import TOUCH_MODE_DIRECT = touch_mode.TOUCH_MODE_DIRECT;
import TOUCH_MODE_MAX = touch_mode.TOUCH_MODE_MAX;
export class touch {
    public in_use: number = 0;
    public has_started: number = 0;
    public has_moved: number = 0;
    public has_ended: number = 0;
    public start_point: touch_coords = null;
    public current_point: touch_coords = null;
    public previous_frame_point: touch_coords = null;
    public frame_movement: touch_coords = null;
    public last_movement: touch_coords = null;
    public start_time: time_millis = null;
    public last_change_time: time_millis = null;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.in_use = args[0]);
        args.length >= 2 && (this.has_started = args[1]);
        args.length >= 3 && (this.has_moved = args[2]);
        args.length >= 4 && (this.has_ended = args[3]);
        args.length >= 5 && (this.start_point = args[4]);
        args.length >= 6 && (this.current_point = args[5]);
        args.length >= 7 && (this.previous_frame_point = args[6]);
        args.length >= 8 && (this.frame_movement = args[7]);
        args.length >= 9 && (this.last_movement = args[8]);
        args.length >= 10 && (this.start_time = args[9]);
        args.length >= 11 && (this.last_change_time = args[10]);
    }
};
import { color_t } from 'graphics/color';
import { key_type } from 'input/keys';
import { key_modifier_type } from 'input/keys';
import { system_move_mouse_cursor } from 'game/system';
import { system_set_mouse_position } from 'game/system';
import { mouse_button } from 'input/mouse';
import { scroll_state } from 'input/mouse';
import SCROLL_NONE = scroll_state.SCROLL_NONE;
import SCROLL_UP = scroll_state.SCROLL_UP;
import SCROLL_DOWN = scroll_state.SCROLL_DOWN;
import { scroll_state } from 'input/mouse';
import { mouse } from 'input/mouse';
import { mouse_get } from 'input/mouse';
import { mouse_set_position } from 'input/mouse';
import { mouse_set_left_down } from 'input/mouse';
import { mouse_set_right_down } from 'input/mouse';
import { mouse_set_from_touch } from 'input/mouse';
import { mouse_reset_scroll } from 'input/mouse';
import { mouse_reset_button_state } from 'input/mouse';
import { mouse_determine_button_state } from 'input/mouse';
import { abs } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdlib';
import { abs } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdlib';
export const enum emulated_mouse_click {
    EMULATED_MOUSE_CLICK_NONE = 0,
    EMULATED_MOUSE_CLICK_LEFT = 1,
    EMULATED_MOUSE_CLICK_RIGHT = 2,
}
export class unnamed19_8 {
    public finger: touch[] = new Array(MAX_ACTIVE_TOUCHES + 1).fill(null);
    public old_touch: touch = null;
    public last_scroll_position: number = 0;
    public mode: touch_mode = null;
    public touchpad_mode_click_type: emulated_mouse_click = null;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.finger = args[0]);
        args.length >= 2 && (this.old_touch = args[1]);
        args.length >= 3 && (this.last_scroll_position = args[2]);
        args.length >= 4 && (this.mode = args[3]);
        args.length >= 5 && (this.touchpad_mode_click_type = args[4]);
    }
}
let data: unnamed19_8 = new unnamed19_8();
function start_delayed(t: touch) {
    return t.has_started && !t.has_moved && !t.has_ended
        && ((time_get_millis() - t.start_time) < (time_millis)(CLICK_TIME / 2));
}
export function touch_get_earliest() {
    let timestamp: time_millis = -1;
    let touch_index: number = MAX_ACTIVE_TOUCHES;
    for (let i: number = 0; i < MAX_ACTIVE_TOUCHES; ++i) {
        if (data.finger[i].in_use && !start_delayed(data.finger[i]) && data.finger[i].start_time < timestamp) {
            timestamp = data.finger[i].start_time;
            touch_index = i;
        }
    }
    return data.finger[touch_index];
}
export function touch_get_latest() {
    let active_touches: number = 0;
    let timestamp: time_millis = 0;
    let touch_index: number = MAX_ACTIVE_TOUCHES;
    for (let i: number = 0; i < MAX_ACTIVE_TOUCHES; ++i) {
        if (data.finger[i].in_use && !start_delayed(data.finger[i])) {
            ++active_touches;
            if (data.finger[i].start_time > timestamp) {
                timestamp = data.finger[i].start_time;
                touch_index = i;
            }
        }
    }
    return (active_touches > 1) ? data.finger[touch_index] : data.finger[MAX_ACTIVE_TOUCHES];
}
function get_total_active_touches() {
    let active_touches: number = 0;
    for (let i: number = 0; i < MAX_ACTIVE_TOUCHES; ++i) {
        if (data.finger[i].in_use) {
            ++active_touches;
        }
    }
    return active_touches;
}
export function touch_not_click(t: touch) {
    return (t.has_moved || (!t.has_ended && (time_get_millis() - t.start_time) >= CLICK_TIME) ||
        (t.has_ended && (t.last_change_time - t.start_time) >= CLICK_TIME));
}
export function touch_was_click(t: touch) {
    return (t.has_ended && !t.has_moved && (t.last_change_time - t.start_time) < CLICK_TIME);
}
export function touch_was_double_click(t: touch) {
    return (touch_was_click(t) && touch_was_click(data.old_touch) &&
        (t.start_time > data.old_touch.last_change_time) &&
        (t.start_time - data.old_touch.last_change_time) < CLICK_TIME);
}
export function touch_is_scroll() {
    let num_touches: number = get_total_active_touches();
    if (num_touches > 2) {
        return 0;
    }
    let first: touch = touch_get_earliest();
    if (num_touches == 2) {
        let last: touch = touch_get_latest();
        return ((last.start_time - first.start_time) < CLICK_TIME) && !touch_was_click(last);
    }
    return first.in_use && start_delayed(first);
}
export function touch_get_scroll() {
    let first: touch = touch_get_earliest();
    let last: touch = touch_get_latest();
    if (!touch_is_scroll() || !first.has_moved || !last.has_moved) {
        return SCROLL_NONE;
    }
    if (!data.last_scroll_position) {
        data.last_scroll_position = first.start_point.y;
    }
    let delta_x: number = abs((first.current_point.x - first.start_point.x) - (last.current_point.x - last.start_point.x));
    let delta_y: number = abs((first.current_point.y - first.start_point.y) - (last.current_point.y - last.start_point.y));
    if (delta_x > SCROLL_FINGER_RADIUS || delta_y > SCROLL_FINGER_RADIUS) {
        return SCROLL_NONE;
    }
    let delta: number = first.current_point.y - data.last_scroll_position;
    if (abs(delta) < NOT_MOVING_RANGE * 2) {
        return SCROLL_NONE;
    }
    data.last_scroll_position = first.current_point.y;
    return (delta > 0) ? SCROLL_UP : SCROLL_DOWN;
}
function get_unused_touch_index() {
    let i: number = 0;
    while (i < MAX_ACTIVE_TOUCHES) {
        if (!data.finger[i].in_use) {
            break;
        }
        ++i;
    }
    return i;
}
export function touch_create(start_coords: touch_coords, start_time: time_millis) {
    let index: number = get_unused_touch_index();
    if (index != MAX_ACTIVE_TOUCHES) {
        let t: touch = data.finger[index];
        t.in_use = 1;
        t.has_started = 1;
        t.has_ended = 0;
        t.start_point = start_coords;
        t.current_point = start_coords;
        t.previous_frame_point = start_coords;
        t.frame_movement.x = 0;
        t.frame_movement.y = 0;
        t.last_movement = t.frame_movement;
        t.start_time = start_time;
        t.last_change_time = start_time;
    }
    return index;
}
export function touch_in_use(index: number) {
    return index >= 0 && index < MAX_ACTIVE_TOUCHES && data.finger[index].in_use;
}
export function touch_move(index: number, current_coords: touch_coords, current_time: time_millis) {
    if (index < 0 || index >= MAX_ACTIVE_TOUCHES || !data.finger[index].in_use) {
        return;
    }
    let t: touch = data.finger[index];
    t.last_change_time = current_time;
    t.current_point = current_coords;
    if ((abs(current_coords.x - t.start_point.x) > NOT_MOVING_RANGE)
        || (abs(current_coords.y - t.start_point.y) > NOT_MOVING_RANGE)) {
        t.has_moved = 1;
    }
}
export function touch_end(index: number, current_time: time_millis) {
    if (index < 0 || index >= MAX_ACTIVE_TOUCHES || !data.finger[index].in_use) {
        return;
    }
    let t: touch = data.finger[index];
    t.has_ended = 1;
    if (current_time - t.last_change_time < MILLIS_TOLERANCE_BETWEEN_LAST_MOVE_AND_TOUCH_END) {
        t.frame_movement = t.last_movement;
    }
}
export function reset_touches(reset_old_touch: number) {
    for (let i: number = 0; i < MAX_ACTIVE_TOUCHES; ++i) {
        let t: touch = data.finger[i];
        if (!t.in_use) {
            continue
        }
        if (t.has_ended) {
            t.in_use = 0;
            if (!reset_old_touch) {
                data.old_touch = * t;
            } else {
                data.old_touch.last_change_time = 0;
            }
            t.has_started = 0;
            t.has_moved = 0;
            t.has_ended = 0;
            data.last_scroll_position = 0;
        } else {
            t.frame_movement.x = t.current_point.x - t.previous_frame_point.x;
            t.frame_movement.y = t.current_point.y - t.previous_frame_point.y;
            if (t.frame_movement.x != 0 || t.frame_movement.y != 0) {
                t.last_movement = t.frame_movement;
            }
            t.previous_frame_point = t.current_point;
            t.has_started = start_delayed(t);
        }
    }
}
function any_touch_went_up() {
    for (let i: number = 0; i < MAX_ACTIVE_TOUCHES; ++i) {
        if (data.finger[i].has_ended) {
            return 1;
        }
    }
    return 0;
}
function handle_emulated_mouse_clicks() {
    mouse_reset_scroll();
    switch (data.touchpad_mode_click_type) {
        case EMULATED_MOUSE_CLICK_LEFT:
            mouse_set_left_down(0);
            break
        case EMULATED_MOUSE_CLICK_RIGHT:
            mouse_set_right_down(0);
            break
        default:
            mouse_reset_button_state()
            return 0;
    }
    mouse_determine_button_state();
    data.touchpad_mode_click_type = EMULATED_MOUSE_CLICK_NONE;
    return 1;
}
function handle_mouse_touchpad() {
    if (handle_emulated_mouse_clicks()) {
        return;
    }
    let num_fingers: number = get_total_active_touches();
    if (!num_fingers) {
        return;
    }
    if (any_touch_went_up()) {
        if (num_fingers == 1 && touch_was_click(touch_get_earliest())) {
            mouse_set_left_down(1);
            mouse_determine_button_state();
            data.touchpad_mode_click_type = EMULATED_MOUSE_CLICK_LEFT;
        } else if (num_fingers == 2 &&
            (touch_was_click(touch_get_earliest()) || touch_was_click(touch_get_latest()))) {
            mouse_set_right_down(1);
            mouse_determine_button_state();
            data.touchpad_mode_click_type = EMULATED_MOUSE_CLICK_RIGHT;
        }
    } else {
        let t: touch = touch_get_earliest();
        if (!t.has_moved) {
            return;
        }
        system_move_mouse_cursor(t.frame_movement.x, t.frame_movement.y);
    }
}
function handle_mouse_direct() {
    mouse_reset_scroll();
    mouse_reset_button_state();
    let first: touch = touch_get_earliest();
    let x: number = first.current_point.x;
    let y: number = first.current_point.y;
    system_set_mouse_position(x, y);
    mouse_set_position(x, y);
}
export function touch_to_mouse() {
    let first: touch = touch_get_earliest();
    if (!first.in_use) {
        if (mouse_get().is_touch) {
            mouse_reset_scroll();
            mouse_reset_button_state();
            return 1;
        } else if (data.touchpad_mode_click_type != EMULATED_MOUSE_CLICK_NONE) {
            return handle_emulated_mouse_clicks();
        }
        return 0;
    }
    switch (data.mode) {
        case TOUCH_MODE_TOUCHPAD:
            handle_mouse_touchpad();
            break
        case TOUCH_MODE_DIRECT:
            handle_mouse_direct();
            break
        default:
            mouse_set_from_touch(first, touch_get_latest())
            break
    }
    return 1;
}
export function touch_set_mode(mode: touch_mode) {
    data.mode = mode;
}
export function touch_cycle_mode() {
    data.mode = (data.mode + 1) % TOUCH_MODE_MAX;
}
