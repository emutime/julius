export const KEY_WAIT_TIME_AFTER_HOLD = 500;
export const SCROLL_KEY_PRESSED = 1;
export const SCROLL_DRAG_MIN_DELTA = 4;
import { SPEED_CHANGE_IMMEDIATE } from 'core/speed';
export const SCROLL_DRAG_DECAY_TIME = 350;
export const MOUSE_BORDER = 5;
export const TOUCH_BORDER = 100;
export const SCROLL_REGULAR_DECAY_TIME = 75;
export const TILE_X_PIXELS = 60;
export const TILE_Y_PIXELS = 30;
;
import { buffer } from 'core/buffer';
import { view_tile } from 'city/view';
import { pixel_offset } from 'city/view';
import { map_callback } from 'city/view';
import { city_view_get_pixel_offset } from 'city/view';
import { time_millis } from 'core/time';
import { time_get_millis } from 'core/time';
import { touch_coords } from 'input/touch';
import { touch_mode } from 'input/touch';
import { touch } from 'input/touch';
import { touch_get_earliest } from 'input/touch';
import { mouse_button } from 'input/mouse';
import { scroll_state } from 'input/mouse';
import { mouse } from 'input/mouse';
export const enum scroll_type {
    SCROLL_TYPE_CITY = 0,
    SCROLL_TYPE_EMPIRE = 1,
    SCROLL_TYPE_MAX = 2
};
import SCROLL_TYPE_CITY = scroll_type.SCROLL_TYPE_CITY;
import SCROLL_TYPE_MAX = scroll_type.SCROLL_TYPE_MAX;
import { direction_type } from 'core/direction';
import DIR_0_TOP = direction_type.DIR_0_TOP;
import DIR_1_TOP_RIGHT = direction_type.DIR_1_TOP_RIGHT;
import DIR_2_RIGHT = direction_type.DIR_2_RIGHT;
import DIR_3_BOTTOM_RIGHT = direction_type.DIR_3_BOTTOM_RIGHT;
import DIR_4_BOTTOM = direction_type.DIR_4_BOTTOM;
import DIR_5_BOTTOM_LEFT = direction_type.DIR_5_BOTTOM_LEFT;
import DIR_6_LEFT = direction_type.DIR_6_LEFT;
import DIR_7_TOP_LEFT = direction_type.DIR_7_TOP_LEFT;
import DIR_8_NONE = direction_type.DIR_8_NONE;
import { direction_type } from 'core/direction';
import { calc_bound } from 'core/calc';
import { config_key } from 'core/config';
import CONFIG_UI_SMOOTH_SCROLLING = config_key.CONFIG_UI_SMOOTH_SCROLLING;
import CONFIG_UI_DISABLE_MOUSE_EDGE_SCROLLING = config_key.CONFIG_UI_DISABLE_MOUSE_EDGE_SCROLLING;
import CONFIG_UI_DISABLE_RIGHT_CLICK_MAP_DRAG = config_key.CONFIG_UI_DISABLE_RIGHT_CLICK_MAP_DRAG;
import { config_key } from 'core/config';
import { config_string_key } from 'core/config';
import { config_get } from 'core/config';
import { speed_direction } from 'core/speed';
import SPEED_DIRECTION_NEGATIVE = speed_direction.SPEED_DIRECTION_NEGATIVE;
import SPEED_DIRECTION_STOPPED = speed_direction.SPEED_DIRECTION_STOPPED;
import SPEED_DIRECTION_POSITIVE = speed_direction.SPEED_DIRECTION_POSITIVE;
import { speed_direction } from 'core/speed';
import { speed_type } from 'core/speed';
import { speed_clear } from 'core/speed';
import { speed_set_target } from 'core/speed';
import { speed_invert } from 'core/speed';
import { speed_get_delta } from 'core/speed';
import { speed_get_current_direction } from 'core/speed';
import { speed_is_changing } from 'core/speed';
import { set_tooltips } from 'game/settings';
import { set_difficulty } from 'game/settings';
import { set_sound_type } from 'game/settings';
import { set_sound } from 'game/settings';
import { setting_fullscreen } from 'game/settings';
import { setting_scroll_speed } from 'game/settings';
import { color_t } from 'graphics/color';
import { key_type } from 'input/keys';
import { key_modifier_type } from 'input/keys';
import { system_mouse_set_relative_mode } from 'game/system';
import { system_mouse_get_relative_state } from 'game/system';
import { screen_width } from 'graphics/screen';
import { screen_height } from 'graphics/screen';;;;;;;;;;;;;;;;;;;;;;;;;;;
import { abs } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_math';
import { abs } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_math';
import { acos } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_math';
import { acos } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_math';
import { asin } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_math';
import { asin } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_math';
import { atan } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_math';
import { atan } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_math';
import { atan2 } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_math';
import { atan2 } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_math';
import { cos } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_math';
import { cos } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_math';
import { cosh } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_math';
import { cosh } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_math';
import { exp } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_math';
import { exp } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_math';
import { fabs } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_math';
import { fabs } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_math';
import { fmod } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_math';
import { fmod } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_math';
import { log } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_math';
import { log } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_math';
import { log10 } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_math';
import { log10 } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_math';
import { pow } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_math';
import { pow } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_math';
import { sin } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_math';
import { sin } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_math';
import { sinh } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_math';
import { sinh } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_math';
import { sqrt } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_math';
import { sqrt } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_math';
import { tan } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_math';
import { tan } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_math';
import { tanh } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_math';
import { tanh } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_math';
import { ceil } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_math';
import { ceil } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_math';
import { _chgsign } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_math';
import { _copysign } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_math';
import { floor } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_math';
import { floor } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_math';
import { frexp } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_math';
import { frexp } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_math';
import { _hypot } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_math';
import { ldexp } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_math';
import { ldexp } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_math';
import { modf } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_math';
import { modf } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_math';
import { fmaxf } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_math';
import { fmaxf } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_math';
import { fminf } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_math';
import { fminf } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_math';
import { _hypotf } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_math';;
import { abs } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdlib';
let DIRECTION_X: number[] = new Array().fill({ 0, 1, 1, 1, 0, - 1, -1, -1, 0});
let DIRECTION_Y: number[] = new Array().fill({- 1, -1, 0, 1, 1, 1, 0, -1, 0});
let SCROLL_STEP: number[] = new Array(SCROLL_TYPE_MAX).fill({
    { 60, 44, 30, 20, 16, 12, 10, 8, 6, 4, 2},
    { 20, 15, 10, 7, 5, 4, 3, 3, 2, 2, 1}
});
export const enum key_state {
    KEY_STATE_UNPRESSED = 0,
    KEY_STATE_PRESSED = 1,
    KEY_STATE_HELD = 2,
    KEY_STATE_AXIS = 3,
}
export class key {
    public state: key_state = null;
    public value: number = 0;
    public last_change: time_millis = null;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.state = args[0]);
        args.length >= 2 && (this.value = args[1]);
        args.length >= 3 && (this.last_change = args[2]);
    }
}
class arrow_key {
    public up: key = null;
    public down: key = null;
    public left: key = null;
    public right: key = null;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.up = args[0]);
        args.length >= 2 && (this.down = args[1]);
        args.length >= 3 && (this.left = args[2]);
        args.length >= 4 && (this.right = args[3]);
    }
}
class drag {
    public active: number = 0;
    public is_touch: number = 0;
    public has_started: number = 0;
    public delta: pixel_offset = null;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.active = args[0]);
        args.length >= 2 && (this.is_touch = args[1]);
        args.length >= 3 && (this.has_started = args[2]);
        args.length >= 4 && (this.delta = args[3]);
    }
}
class speed {
    public x: speed_type = null;
    public y: speed_type = null;
    public decaying: number = 0;
    public modifier_x: number = 0;
    public modifier_y: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.x = args[0]);
        args.length >= 2 && (this.y = args[1]);
        args.length >= 3 && (this.decaying = args[2]);
        args.length >= 4 && (this.modifier_x = args[3]);
        args.length >= 5 && (this.modifier_y = args[4]);
    }
}
class limits {
    public active: number = 0;
    public x: number = 0;
    public y: number = 0;
    public width: number = 0;
    public height: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.active = args[0]);
        args.length >= 2 && (this.x = args[1]);
        args.length >= 3 && (this.y = args[2]);
        args.length >= 4 && (this.width = args[3]);
        args.length >= 5 && (this.height = args[4]);
    }
}
export class unnamed47_8 {
    public is_scrolling: number = 0;
    public constant_input: number = 0;
    public arrow_key: arrow_key = null;
    public drag: drag = null;
    public speed: speed = null;
    public x_align_direction: speed_direction = null;
    public y_align_direction: speed_direction = null;
    public last_time: time_millis = null;
    public limits: limits = null;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.is_scrolling = args[0]);
        args.length >= 2 && (this.constant_input = args[1]);
        args.length >= 3 && (this.arrow_key = args[2]);
        args.length >= 4 && (this.drag = args[3]);
        args.length >= 5 && (this.speed = args[4]);
        args.length >= 6 && (this.x_align_direction = args[5]);
        args.length >= 7 && (this.y_align_direction = args[6]);
        args.length >= 8 && (this.last_time = args[7]);
        args.length >= 9 && (this.limits = args[8]);
    }
}
let data: unnamed47_8 = new unnamed47_8();
function clear_scroll_speed() {
    speed_clear(data.speed.x);
    speed_clear(data.speed.y);
    data.speed.decaying = 0;
    data.x_align_direction = SPEED_DIRECTION_STOPPED;
    data.y_align_direction = SPEED_DIRECTION_STOPPED;
}
function get_arrow_key_value(arrow: key) {
    if (arrow.state == KEY_STATE_AXIS) {
        return arrow.value;
    }
    if (config_get(CONFIG_UI_SMOOTH_SCROLLING)) {
        return arrow.state != KEY_STATE_UNPRESSED;
    }
    if (arrow.state == KEY_STATE_PRESSED) {
        arrow.state = KEY_STATE_HELD;
        return 1;
    }
    if (arrow.state == KEY_STATE_HELD && time_get_millis() - arrow.last_change >= KEY_WAIT_TIME_AFTER_HOLD) {
        return 1;
    }
    return 0;
}
function get_normalized_arrow_key_value(arrow: key) {
    let value: number = get_arrow_key_value(arrow);
    if (value == SCROLL_KEY_PRESSED) {
        return 1.0f;
    } else {
        return fminf(arrow.value / SCROLL_KEY_MAX_VALUE, 1.0f);
    }
}
function is_arrow_active(arrow: key) {
    return arrow.value != 0;
}
function restart_active_arrow(arrow: key, exception: key) {
    if (arrow == exception) {
        return;
    }
    if (arrow.state != KEY_STATE_UNPRESSED && arrow.state != KEY_STATE_AXIS) {
        arrow.state = KEY_STATE_PRESSED;
        arrow.last_change = time_get_millis();
    }
}
function restart_all_active_arrows_except(arrow: key) {
    clear_scroll_speed();
    restart_active_arrow(data.arrow_key.up, arrow);
    restart_active_arrow(data.arrow_key.down, arrow);
    restart_active_arrow(data.arrow_key.left, arrow);
    restart_active_arrow(data.arrow_key.right, arrow);
}
function get_key_state_for_value(value: number) {
    if (!value) {
        return KEY_STATE_UNPRESSED;
    }
    if (value == SCROLL_KEY_PRESSED) {
        return KEY_STATE_PRESSED;
    }
    return KEY_STATE_AXIS;
}
function set_arrow_key(arrow: key, value: number) {
    let state: key_state = get_key_state_for_value(value);
    if (state != KEY_STATE_AXIS && state != KEY_STATE_UNPRESSED &&
        arrow.state != KEY_STATE_AXIS && arrow.state != KEY_STATE_UNPRESSED) {
        return;
    }
    if (arrow.state != KEY_STATE_AXIS || state != KEY_STATE_UNPRESSED) {
        arrow.state = state;
    }
    arrow.value = value;
    arrow.last_change = time_get_millis();
    if (state != KEY_STATE_AXIS && !config_get(CONFIG_UI_SMOOTH_SCROLLING)) {
        restart_all_active_arrows_except(arrow);
    }
}
export function scroll_in_progress() {
    return data.is_scrolling || data.drag.active;
}
function get_scroll_speed_factor() {
    return calc_bound((100 - setting_scroll_speed()) / 10, 0, 10);
}
export function scroll_is_smooth() {
    return config_get(CONFIG_UI_SMOOTH_SCROLLING) || data.drag.active || data.speed.decaying;
}
function should_scroll() {
    let current_time: time_millis = time_get_millis();
    let diff: time_millis = current_time - data.last_time;
    let scroll_delay: number = get_scroll_speed_factor();
    let further_delay: number = data.constant_input ?
        20 - (int)(fmaxf(data.speed.modifier_x, data.speed.modifier_y) * 20) : 0;
    if (scroll_delay < 10) {
        if (diff >= 12 * (scroll_delay + further_delay) + 2) {
            data.last_time = current_time;
            return 1;
        }
    }
    return 0;
}
function direction_from_sides(top: number, left: number, bottom: number, right: number) {
    if (left && top) {
        return DIR_7_TOP_LEFT;
    } else if (left && bottom) {
        return DIR_5_BOTTOM_LEFT;
    } else if (right && top) {
        return DIR_1_TOP_RIGHT;
    } else if (right && bottom) {
        return DIR_3_BOTTOM_RIGHT;
    }
    if (left) {
        return DIR_6_LEFT;
    } else if (right) {
        return DIR_2_RIGHT;
    } else if (top) {
        return DIR_0_TOP;
    } else if (bottom) {
        return DIR_4_BOTTOM;
    }
    return DIR_8_NONE;
}
export function scroll_set_custom_margins(x: number, y: number, width: number, height: number) {
    data.limits.active = 1;
    data.limits.x = x;
    data.limits.y = y;
    data.limits.width = width;
    data.limits.height = height;
}
export function scroll_restore_margins() {
    data.limits.active = 0;
}
export function scroll_drag_start(is_touch: number) {
    if (data.drag.active || (!is_touch && config_get(CONFIG_UI_DISABLE_RIGHT_CLICK_MAP_DRAG))) {
        return;
    }
    data.drag.active = 1;
    data.drag.is_touch = is_touch;
    data.drag.delta.x = 0;
    data.drag.delta.y = 0;
    if (!is_touch) {
        system_mouse_get_relative_state(0, 0);
    }
    clear_scroll_speed();
}
function set_scroll_speed_from_drag() {
    if (!data.drag.active) {
        return 0;
    }
    let delta_x: number = 0;
    let delta_y: number = 0;
    if (!data.drag.is_touch) {
        system_mouse_get_relative_state(delta_x, delta_y);
    } else {
        let t: touch = touch_get_earliest();
        delta_x = -t.frame_movement.x;
        delta_y = -t.frame_movement.y;
    }
    data.drag.delta.x += delta_x
    data.drag.delta.y += delta_y
    if ((delta_x != 0 || delta_y != 0)) {
        if (!data.drag.is_touch) {
            system_mouse_set_relative_mode(1);
        }
        if (!data.drag.has_started) {
            data.drag.has_started = abs(data.drag.delta.x) > SCROLL_DRAG_MIN_DELTA
                || abs(data.drag.delta.y) > SCROLL_DRAG_MIN_DELTA;
        }
    }
    if (data.drag.has_started) {
        speed_set_target(data.speed.x, data.drag.delta.x, SPEED_CHANGE_IMMEDIATE, 0);
        speed_set_target(data.speed.y, data.drag.delta.y, SPEED_CHANGE_IMMEDIATE, 0);
        data.drag.delta.x = 0;
        data.drag.delta.y = 0;
    }
    return 1;
}
export function scroll_drag_end() {
    if (!data.drag.active) {
        return 0;
    }
    let has_scrolled: number = data.drag.has_started;
    data.drag.active = 0;
    data.drag.has_started = 0;
    if (!data.drag.is_touch) {
        system_mouse_set_relative_mode(0);
    } else if (has_scrolled) {
        let t: touch = touch_get_earliest();
        speed_set_target(data.speed.x, -t.frame_movement.x, SPEED_CHANGE_IMMEDIATE, 1);
        speed_set_target(data.speed.y, -t.frame_movement.y, SPEED_CHANGE_IMMEDIATE, 1);
    }
    data.x_align_direction = speed_get_current_direction(data.speed.x);
    data.y_align_direction = speed_get_current_direction(data.speed.y);
    speed_set_target(data.speed.x, 0, SCROLL_DRAG_DECAY_TIME, 1);
    speed_set_target(data.speed.y, 0, SCROLL_DRAG_DECAY_TIME, 1);
    return has_scrolled;
}
function set_arrow_input(arrow: key, opposite_arrow: key, modifier: number) {
    if (get_arrow_key_value(arrow) && (!opposite_arrow || !is_arrow_active(opposite_arrow))) {
        if (arrow.state == KEY_STATE_AXIS) {
            data.constant_input = 1;
            * modifier = get_normalized_arrow_key_value(arrow);
        }
        return 1;
    }
    return 0;
}
function get_direction(m: mouse) {
    let is_inside_window: number = m.is_inside_window;
    let width: number = screen_width();
    let height: number = screen_height();
    if (setting_fullscreen() && m.x < width && m.y < height) {
        is_inside_window = 1;
    }
    if (!is_inside_window && !m.is_touch) {
        return DIR_8_NONE;
    }
    let top: number = 0;
    let bottom: number = 0;
    let left: number = 0;
    let right: number = 0;
    let border: number = MOUSE_BORDER;
    let x: number = m.x;
    let y: number = m.y;
    data.constant_input = 0;
    data.speed.modifier_x = 0.0f;
    data.speed.modifier_y = 0.0f;
    if (data.limits.active) {
        border = TOUCH_BORDER;
        width = data.limits.width;
        height = data.limits.height;
        x -= data.limits.x
        y -= data.limits.y
        data.constant_input = 1;
    }
    if (((!m.is_touch && !config_get(CONFIG_UI_DISABLE_MOUSE_EDGE_SCROLLING)) || data.limits.active) &&
        (x >= 0 && x <= width && y >= 0 && y <= height)) {
        if (x < border) {
            left = 1;
            data.speed.modifier_x = 1 - x / (float) border;
        } else if (x >= width - border) {
            right = 1;
            data.speed.modifier_x = 1 - (width - x) / (float) border;
        }
        if (y < border) {
            top = 1;
            data.speed.modifier_y = 1 - y / (float) border;
        } else if (y >= height - border) {
            bottom = 1;
            data.speed.modifier_y = 1 - (height - y) / (float) border;
        }
    }
    left |= set_arrow_input(data.arrow_key.left, 0, data.speed.modifier_x)
    right |= set_arrow_input(data.arrow_key.right, data.arrow_key.left, data.speed.modifier_x)
    top |= set_arrow_input(data.arrow_key.up, 0, data.speed.modifier_y)
    bottom |= set_arrow_input(data.arrow_key.down, data.arrow_key.up, data.speed.modifier_y)
    if (data.constant_input) {
        if (!data.speed.modifier_x) {
            data.speed.modifier_x = data.speed.modifier_y;
        }
        if (!data.speed.modifier_y) {
            data.speed.modifier_y = data.speed.modifier_x;
        }
    }
    return direction_from_sides(top, left, bottom, right);
}
function get_alignment_delta(direction: speed_direction, camera_max_offset: number, camera_offset: number) {
    if (camera_offset == 0) {
        return 0;
    }
    let calc_direction: speed_direction = SPEED_DIRECTION_STOPPED;
    switch (direction) {
        case SPEED_DIRECTION_STOPPED:
            calc_direction =
                (camera_offset >= camera_max_offset / 2) ? SPEED_DIRECTION_POSITIVE : SPEED_DIRECTION_NEGATIVE;
            direction = SPEED_DIRECTION_POSITIVE;
            break
        case SPEED_DIRECTION_NEGATIVE:
            calc_direction =
                (camera_offset >= camera_max_offset * 0.666667) ? SPEED_DIRECTION_POSITIVE : SPEED_DIRECTION_NEGATIVE;
            break
        default:
            calc_direction =
                (camera_offset >= camera_max_offset / 3) ? SPEED_DIRECTION_POSITIVE : SPEED_DIRECTION_NEGATIVE
            break
    }
    return (calc_direction == SPEED_DIRECTION_POSITIVE) ?
        (camera_max_offset - camera_offset) : (camera_offset * -direction);
}
function set_scroll_speed_from_input(m: mouse, type: scroll_type) {
    if (set_scroll_speed_from_drag()) {
        return 1;
    }
    let direction: number = get_direction(m);
    if (direction == DIR_8_NONE) {
        let time: time_millis = config_get(CONFIG_UI_SMOOTH_SCROLLING) ? SCROLL_REGULAR_DECAY_TIME : SPEED_CHANGE_IMMEDIATE;
        speed_set_target(data.speed.x, 0, time, 1);
        speed_set_target(data.speed.y, 0, time, 1);
        return 0;
    }
    if (data.speed.decaying) {
        clear_scroll_speed();
    }
    let dir_x: number = DIRECTION_X[direction];
    let dir_y: number = DIRECTION_Y[direction];
    let y_fraction: number = type == SCROLL_TYPE_CITY ? 2 : 1;
    if (!config_get(CONFIG_UI_SMOOTH_SCROLLING) && !data.limits.active) {
        let do_scroll: number = should_scroll();
        let step: number = SCROLL_STEP[type][0];
        let align_x: number = 0;
        let align_y: number = 0;
        if (type == SCROLL_TYPE_CITY) {
            let camera_offset: pixel_offset;
            city_view_get_pixel_offset(camera_offset.x, camera_offset.y);
            align_x = get_alignment_delta(dir_x, TILE_X_PIXELS, camera_offset.x);
            align_y = get_alignment_delta(dir_y, TILE_Y_PIXELS, camera_offset.y);
        }
        speed_set_target(data.speed.x, (step + align_x) * dir_x * do_scroll, SPEED_CHANGE_IMMEDIATE, 0);
        speed_set_target(data.speed.y, ((step / y_fraction) + align_y) * dir_y * do_scroll,
            SPEED_CHANGE_IMMEDIATE, 0);
        return 1;
    }
    let max_speed: number = SCROLL_STEP[type][get_scroll_speed_factor()];
    let max_speed_x: number = max_speed * dir_x;
    let max_speed_y: number = (max_speed / y_fraction) * dir_y;
    if (!data.constant_input) {
        if (speed_get_current_direction(data.speed.x) * dir_x < 0) {
            speed_invert(data.speed.x);
        } else if (data.speed.x.desired_speed != max_speed_x) {
            speed_set_target(data.speed.x, max_speed_x, SCROLL_REGULAR_DECAY_TIME, 1);
        }
        if (speed_get_current_direction(data.speed.y) * dir_y < 0) {
            speed_invert(data.speed.y);
        } else if (data.speed.y.desired_speed != max_speed_y) {
            speed_set_target(data.speed.y, max_speed_y, SCROLL_REGULAR_DECAY_TIME, 1);
        }
    } else {
        speed_set_target(data.speed.x, (int)(max_speed_x * data.speed.modifier_x), SPEED_CHANGE_IMMEDIATE, 1);
        speed_set_target(data.speed.y, (int)(max_speed_y * data.speed.modifier_y), SPEED_CHANGE_IMMEDIATE, 1);
    }
    return 1;
}
export function scroll_get_delta(m: mouse, delta: pixel_offset, type: scroll_type) {
    data.is_scrolling = set_scroll_speed_from_input(m, type);
    delta.x = speed_get_delta(data.speed.x);
    delta.y = speed_get_delta(data.speed.y);
    if (!data.is_scrolling) {
        data.speed.decaying = speed_is_changing(data.speed.x) || speed_is_changing(data.speed.y);
        data.is_scrolling = data.speed.decaying;
    }
    return delta.x != 0 || delta.y != 0;
}
export function scroll_stop() {
    clear_scroll_speed();
    system_mouse_set_relative_mode(0);
    data.is_scrolling = 0;
    data.constant_input = 0;
    data.drag.active = 0;
    data.limits.active = 0;
}
export function scroll_arrow_left(value: number) {
    set_arrow_key(data.arrow_key.left, value);
}
export function scroll_arrow_right(value: number) {
    set_arrow_key(data.arrow_key.right, value);
}
export function scroll_arrow_up(value: number) {
    set_arrow_key(data.arrow_key.up, value);
}
export function scroll_arrow_down(value: number) {
    set_arrow_key(data.arrow_key.down, value);
}
