export const MAX_AXIS = 8;
export const MAX_BUTTONS = 20;
export const MAX_TRACKBALLS = 4;
export const MAX_HATS = 4;
export const MAX_CONTROLLERS = 6;
export const AXIS_MAX_THRESHOLD = 1300;
export const JOYSTICK_MAPPING_ELEMENTS_MAX = 2;
export const TRACKBALL_TO_AXIS_RATIO = 5;
export const AXIS_MAX_VALUE = 32767;
export const JOYSTICK_MAX_NAME = 64;
export const JOYSTICK_MAX_GUID = 33;
export const DEADZONE = 2000.0;
export const enum joystick_element {
    JOYSTICK_ELEMENT_NONE = 0,
    JOYSTICK_ELEMENT_AXIS = 1,
    JOYSTICK_ELEMENT_TRACKBALL = 2,
    JOYSTICK_ELEMENT_BUTTON = 3,
    JOYSTICK_ELEMENT_HAT = 4
}
export const enum joystick_axis_position {
    JOYSTICK_AXIS_POSITIVE = 0,
    JOYSTICK_AXIS_NEGATIVE = 1
}
export const enum joystick_hat_position {
    JOYSTICK_HAT_CENTERED = 0,
    JOYSTICK_HAT_UP = 1,
    JOYSTICK_HAT_LEFT = 2,
    JOYSTICK_HAT_DOWN = 4,
    JOYSTICK_HAT_RIGHT = 8
}
import HOTKEY_OFFSET = mapping_action.MAPPING_ACTION_ROTATE_MAP_LEFT;
type joystick_button = number;
type joystick_axis = number;
import { hotkey_action } from 'core/hotkey_config';
import { log_info } from 'core/log';
import { SPEED_CHANGE_IMMEDIATE, speed_clear, speed_get_delta, speed_set_target, speed_type } from 'core/speed';
import { time_get_millis, time_millis } from 'core/time';
import { system_keyboard_show, system_move_mouse_cursor } from 'game/system';
import { window_id, window_is } from 'graphics/window';
import { hotkey_set_value_for_action } from 'input/hotkey';
import { keyboard_is_capturing } from 'input/keyboard';
import { mouse_remove_touch, mouse_set_left_down, mouse_set_right_down, mouse_set_scroll, scroll_state } from 'input/mouse';
import { scroll_arrow_down, scroll_arrow_left, scroll_arrow_right, scroll_arrow_up } from 'input/scroll';
import { touch_cycle_mode } from 'input/touch';
export const MAX_HOTKEYS = 6;
import SCROLL_NONE = scroll_state.SCROLL_NONE;
import SCROLL_UP = scroll_state.SCROLL_UP;
import SCROLL_DOWN = scroll_state.SCROLL_DOWN;
import JOYSTICK_ELEMENT_NONE = joystick_element.JOYSTICK_ELEMENT_NONE;
import JOYSTICK_ELEMENT_AXIS = joystick_element.JOYSTICK_ELEMENT_AXIS;
import JOYSTICK_ELEMENT_TRACKBALL = joystick_element.JOYSTICK_ELEMENT_TRACKBALL;
import JOYSTICK_ELEMENT_BUTTON = joystick_element.JOYSTICK_ELEMENT_BUTTON;
import JOYSTICK_ELEMENT_HAT = joystick_element.JOYSTICK_ELEMENT_HAT;
import JOYSTICK_AXIS_POSITIVE = joystick_axis_position.JOYSTICK_AXIS_POSITIVE;
import JOYSTICK_HAT_UP = joystick_hat_position.JOYSTICK_HAT_UP;
import JOYSTICK_HAT_LEFT = joystick_hat_position.JOYSTICK_HAT_LEFT;
import JOYSTICK_HAT_DOWN = joystick_hat_position.JOYSTICK_HAT_DOWN;
import JOYSTICK_HAT_RIGHT = joystick_hat_position.JOYSTICK_HAT_RIGHT;

export const enum mapping_action {
    MAPPING_ACTION_MOUSE_CURSOR_UP,
    MAPPING_ACTION_MOUSE_CURSOR_LEFT,
    MAPPING_ACTION_MOUSE_CURSOR_DOWN,
    MAPPING_ACTION_MOUSE_CURSOR_RIGHT,
    MAPPING_ACTION_FASTER_MOUSE_CURSOR_SPEED,
    MAPPING_ACTION_SLOWER_MOUSE_CURSOR_SPEED,
    MAPPING_ACTION_LEFT_MOUSE_BUTTON,
    MAPPING_ACTION_RIGHT_MOUSE_BUTTON,
    MAPPING_ACTION_SCROLL_WINDOW_UP,
    MAPPING_ACTION_SCROLL_WINDOW_DOWN,
    MAPPING_ACTION_SCROLL_MAP_UP,
    MAPPING_ACTION_SCROLL_MAP_LEFT,
    MAPPING_ACTION_SCROLL_MAP_DOWN,
    MAPPING_ACTION_SCROLL_MAP_RIGHT,
    MAPPING_ACTION_ROTATE_MAP_LEFT,
    MAPPING_ACTION_ROTATE_MAP_RIGHT,
    MAPPING_ACTION_INCREASE_GAME_SPEED,
    MAPPING_ACTION_DECREASE_GAME_SPEED,
    MAPPING_ACTION_TOGGLE_PAUSE,
    MAPPING_ACTION_CYCLE_LEGION,
    MAPPING_ACTION_SHOW_VIRTUAL_KEYBOARD,
    MAPPING_ACTION_CYCLE_TOUCH_TYPE,
    MAPPING_ACTION_RESET_MAPPING,
    MAPPING_ACTION_MAX
};
export const MAX_JOYSTICK_MAPPINGS = mapping_action.MAPPING_ACTION_MAX * 2;
import MAPPING_ACTION_MOUSE_CURSOR_UP = mapping_action.MAPPING_ACTION_MOUSE_CURSOR_UP;
import MAPPING_ACTION_MOUSE_CURSOR_LEFT = mapping_action.MAPPING_ACTION_MOUSE_CURSOR_LEFT;
import MAPPING_ACTION_MOUSE_CURSOR_DOWN = mapping_action.MAPPING_ACTION_MOUSE_CURSOR_DOWN;
import MAPPING_ACTION_MOUSE_CURSOR_RIGHT = mapping_action.MAPPING_ACTION_MOUSE_CURSOR_RIGHT;
import MAPPING_ACTION_FASTER_MOUSE_CURSOR_SPEED = mapping_action.MAPPING_ACTION_FASTER_MOUSE_CURSOR_SPEED;
import MAPPING_ACTION_SLOWER_MOUSE_CURSOR_SPEED = mapping_action.MAPPING_ACTION_SLOWER_MOUSE_CURSOR_SPEED;
import MAPPING_ACTION_LEFT_MOUSE_BUTTON = mapping_action.MAPPING_ACTION_LEFT_MOUSE_BUTTON;
import MAPPING_ACTION_RIGHT_MOUSE_BUTTON = mapping_action.MAPPING_ACTION_RIGHT_MOUSE_BUTTON;
import MAPPING_ACTION_SCROLL_WINDOW_UP = mapping_action.MAPPING_ACTION_SCROLL_WINDOW_UP;
import MAPPING_ACTION_SCROLL_WINDOW_DOWN = mapping_action.MAPPING_ACTION_SCROLL_WINDOW_DOWN;
import MAPPING_ACTION_SCROLL_MAP_UP = mapping_action.MAPPING_ACTION_SCROLL_MAP_UP;
import MAPPING_ACTION_SCROLL_MAP_LEFT = mapping_action.MAPPING_ACTION_SCROLL_MAP_LEFT;
import MAPPING_ACTION_SCROLL_MAP_DOWN = mapping_action.MAPPING_ACTION_SCROLL_MAP_DOWN;
import MAPPING_ACTION_SCROLL_MAP_RIGHT = mapping_action.MAPPING_ACTION_SCROLL_MAP_RIGHT;
import MAPPING_ACTION_ROTATE_MAP_LEFT = mapping_action.MAPPING_ACTION_ROTATE_MAP_LEFT;
import MAPPING_ACTION_SHOW_VIRTUAL_KEYBOARD = mapping_action.MAPPING_ACTION_SHOW_VIRTUAL_KEYBOARD;
import MAPPING_ACTION_CYCLE_TOUCH_TYPE = mapping_action.MAPPING_ACTION_CYCLE_TOUCH_TYPE;
import MAPPING_ACTION_RESET_MAPPING = mapping_action.MAPPING_ACTION_RESET_MAPPING;
import MAPPING_ACTION_MAX = mapping_action.MAPPING_ACTION_MAX;

class element {
    public type: joystick_element = null;
    public id: number = 0;
    public position: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.type = args[0]);
        args.length >= 2 && (this.id = args[1]);
        args.length >= 3 && (this.position = args[2]);
    }
}
export class mapping_element {
    public action: mapping_action = null;
    public element: element[] = new Array(JOYSTICK_MAPPING_ELEMENTS_MAX).fill(null);
    public constructor(...args: any[]) {
        args.length >= 1 && (this.action = args[0]);
        args.length >= 2 && (this.element = args[1]);
    }
}
export class joystick_model {
    public connected_joysticks: number = 0;
    public name: string = "";
    public guid: string = "";
    public mapping: mapping_element[] = new Array(MAX_JOYSTICK_MAPPINGS).fill(null);
    public num_mappings: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.connected_joysticks = args[0]);
        args.length >= 2 && (this.name = args[1]);
        args.length >= 3 && (this.guid = args[2]);
        args.length >= 4 && (this.mapping = args[3]);
        args.length >= 5 && (this.num_mappings = args[4]);
    }
}
;
import HOTKEY_TOGGLE_PAUSE = hotkey_action.HOTKEY_TOGGLE_PAUSE;
import HOTKEY_CYCLE_LEGION = hotkey_action.HOTKEY_CYCLE_LEGION;
import HOTKEY_INCREASE_GAME_SPEED = hotkey_action.HOTKEY_INCREASE_GAME_SPEED;
import HOTKEY_DECREASE_GAME_SPEED = hotkey_action.HOTKEY_DECREASE_GAME_SPEED;
import HOTKEY_ROTATE_MAP_LEFT = hotkey_action.HOTKEY_ROTATE_MAP_LEFT;
import HOTKEY_ROTATE_MAP_RIGHT = hotkey_action.HOTKEY_ROTATE_MAP_RIGHT;
import WINDOW_CITY = window_id.WINDOW_CITY;
import WINDOW_CITY_MILITARY = window_id.WINDOW_CITY_MILITARY;
import WINDOW_EMPIRE = window_id.WINDOW_EMPIRE;
import WINDOW_EDITOR_MAP = window_id.WINDOW_EDITOR_MAP;
import WINDOW_EDITOR_EMPIRE = window_id.WINDOW_EDITOR_EMPIRE;
export const enum joystick_trackball_pos {
    JOYSTICK_TRACKBALL_X_POSITIVE = 0,
    JOYSTICK_TRACKBALL_X_NEGATIVE = 1,
    JOYSTICK_TRACKBALL_Y_POSITIVE = 2,
    JOYSTICK_TRACKBALL_Y_NEGATIVE = 3,
}

import JOYSTICK_TRACKBALL_X_POSITIVE = joystick_trackball_pos.JOYSTICK_TRACKBALL_X_POSITIVE;
import JOYSTICK_TRACKBALL_X_NEGATIVE = joystick_trackball_pos.JOYSTICK_TRACKBALL_X_NEGATIVE;
import JOYSTICK_TRACKBALL_Y_POSITIVE = joystick_trackball_pos.JOYSTICK_TRACKBALL_Y_POSITIVE;
import JOYSTICK_TRACKBALL_Y_NEGATIVE = joystick_trackball_pos.JOYSTICK_TRACKBALL_Y_NEGATIVE;

export const enum direction {
    DIRECTION_UP = 0,
    DIRECTION_LEFT = 1,
    DIRECTION_DOWN = 2,
    DIRECTION_RIGHT = 3,
    NUM_DIRECTIONS = 4,
}

import DIRECTION_UP = direction.DIRECTION_UP;
import DIRECTION_LEFT = direction.DIRECTION_LEFT;
import DIRECTION_DOWN = direction.DIRECTION_DOWN;
import DIRECTION_RIGHT = direction.DIRECTION_RIGHT;
import NUM_DIRECTIONS = direction.NUM_DIRECTIONS;

export const enum input_state {
    INPUT_STATE_IS_UP,
    INPUT_STATE_WENT_DOWN,
    INPUT_STATE_IS_DOWN,
    INPUT_STATE_WENT_UP,
}

import INPUT_STATE_IS_UP = input_state.INPUT_STATE_IS_UP;
import INPUT_STATE_WENT_DOWN = input_state.INPUT_STATE_WENT_DOWN;
import INPUT_STATE_IS_DOWN = input_state.INPUT_STATE_IS_DOWN;
import INPUT_STATE_WENT_UP = input_state.INPUT_STATE_WENT_UP;

export class joystick_hat {
    public top: joystick_button = null;
    public left: joystick_button = null;
    public bottom: joystick_button = null;
    public right: joystick_button = null;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.top = args[0]);
        args.length >= 2 && (this.left = args[1]);
        args.length >= 3 && (this.bottom = args[2]);
        args.length >= 4 && (this.right = args[3]);
    }
}
export class joystick_trackball {
    public delta_x: number = 0;
    public delta_y: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.delta_x = args[0]);
        args.length >= 2 && (this.delta_y = args[1]);
    }
}
export class joystick_info {
    public id: number = 0;
    public connected: number = 0;
    public model: joystick_model = null;
    public axis: joystick_axis[] = new Array(MAX_AXIS).fill(null);
    public button: joystick_button[] = new Array(MAX_BUTTONS).fill(null);
    public trackball: joystick_trackball[] = new Array(MAX_TRACKBALLS).fill(null);
    public hat: joystick_hat[] = new Array(MAX_HATS).fill(null);
    public constructor(...args: any[]) {
        args.length >= 1 && (this.id = args[0]);
        args.length >= 2 && (this.connected = args[1]);
        args.length >= 3 && (this.model = args[2]);
        args.length >= 4 && (this.axis = args[3]);
        args.length >= 5 && (this.button = args[4]);
        args.length >= 6 && (this.trackball = args[5]);
        args.length >= 7 && (this.hat = args[6]);
    }
}
export class mapped_input {
    public element: joystick_element = null;
    public value: number = 0;
    public state: input_state = null;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.element = args[0]);
        args.length >= 2 && (this.value = args[1]);
        args.length >= 3 && (this.state = args[2]);
    }
}
export const enum cursor_slowdown {
    CURSOR_SLOWDOWN_FASTER = 1024,
    CURSOR_SLOWDOWN_NORMAL = 4096,
    CURSOR_SLOWDOWN_SLOWER = 8192,
}
class mouse {
    public x_speed: speed_type = null;
    public y_speed: speed_type = null;
    public left_button: number = 0;
    public middle_button: number = 0;
    public right_button: number = 0;
    public scroll: scroll_state = null;
    public last_scroll_time: time_millis = null;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.x_speed = args[0]);
        args.length >= 2 && (this.y_speed = args[1]);
        args.length >= 3 && (this.left_button = args[2]);
        args.length >= 4 && (this.middle_button = args[3]);
        args.length >= 5 && (this.right_button = args[4]);
        args.length >= 6 && (this.scroll = args[5]);
        args.length >= 7 && (this.last_scroll_time = args[6]);
    }
}
export class unnamed91_8 {
    public connected_models: joystick_model[] = Array.from({ length: MAX_CONTROLLERS }, () => new joystick_model());
    public joystick: joystick_info[] = Array.from({ length: MAX_CONTROLLERS }, () => new joystick_info());
    public connected_joysticks: number = 0;
    public mouse: mouse = null;
    public map_scroll: mapped_input[] = Array.from({ length: NUM_DIRECTIONS }, () => new mapped_input());
    public joystick_hotkey: mapped_input[] = Array.from({ length: MAX_HOTKEYS }, () => new mapped_input());
    public virtual_keyboard: mapped_input = new mapped_input();
    public touch_mode: mapped_input = new mapped_input();
    public constructor(...args: any[]) {
        args.length >= 1 && (this.connected_models = args[0]);
        args.length >= 2 && (this.joystick = args[1]);
        args.length >= 3 && (this.connected_joysticks = args[2]);
        args.length >= 4 && (this.mouse = args[3]);
        args.length >= 5 && (this.map_scroll = args[4]);
        args.length >= 6 && (this.joystick_hotkey = args[5]);
        args.length >= 7 && (this.virtual_keyboard = args[6]);
        args.length >= 8 && (this.touch_mode = args[7]);
    }
}
let data: unnamed91_8 = new unnamed91_8();
let JOYSTICK_MAPPING_TO_HOTKEY_ACTION: hotkey_action[] = new Array(MAX_HOTKEYS).fill({
    HOTKEY_ROTATE_MAP_LEFT,
    HOTKEY_ROTATE_MAP_RIGHT,
    HOTKEY_INCREASE_GAME_SPEED,
    HOTKEY_DECREASE_GAME_SPEED,
    HOTKEY_TOGGLE_PAUSE,
    HOTKEY_CYCLE_LEGION
});
function update_hat(hat: joystick_hat, position: joystick_hat_position) {
    hat.top = (position & JOYSTICK_HAT_UP) ? 1 : 0;
    hat.left = (position & JOYSTICK_HAT_LEFT) ? 1 : 0;
    hat.bottom = (position & JOYSTICK_HAT_DOWN) ? 1 : 0;
    hat.right = (position & JOYSTICK_HAT_RIGHT) ? 1 : 0;
}
function update_trackball(trackball: joystick_trackball, delta_x: number, delta_y: number) {
    trackball.delta_x += delta_x;
    trackball.delta_y += delta_y;
}
function reset_joystick_state(joystick: joystick_info): void {
    for (let i: number = 0; i < MAX_AXIS; i++) {
        joystick.axis[i] = null;
    }
    for (let i: number = 0; i < MAX_BUTTONS; i++) {
        joystick.button[i] = null;
    }
    for (let i: number = 0; i < MAX_TRACKBALLS; i++) {
        joystick.trackball[i] = null;
    }
    for (let i: number = 0; i < MAX_HATS; i++) {
        joystick.hat[i] = null;
    }
}
function get_free_joystick() {
    for (let i: number = 0; i < MAX_CONTROLLERS; ++i) {
        if (!data.joystick[i].connected) {
            return data.joystick[i];
        }
    }
    return 0;
}
function get_model_by_guid(guid: string): joystick_model {
    for (let i: number = 0; i < MAX_CONTROLLERS; ++i) {
        let model: joystick_model = data.connected_models[i];
        if (guid === model.guid) {
            return model;
        }
    }
    return null;
}
export function joystick_has_model(guid: string): boolean {
    return get_model_by_guid(guid) != null;
}
export function joystick_add_model(model: joystick_model): void {
    for (let i: number = 0; i < MAX_CONTROLLERS; ++i) {
        if (!data.connected_models[i].connected_joysticks) {
            data.connected_models[i] = model;
            return;
        }
    }
}
export function joystick_add(joystick_id: number, guid: string) {
    let joystick: joystick_info = get_free_joystick();
    let model: joystick_model = get_model_by_guid(guid);
    if (!joystick || !model) {
        return 0;
    }
    joystick.id = joystick_id;
    joystick.model = model;
    joystick.connected = 1;
    model.connected_joysticks++;
    data.connected_joysticks++;
    log_info("Joystick added with name", model.name, 0);
    return 1;
}
function get_joystick_by_id(joystick_id: number) {
    for (let i: number = 0; i < MAX_CONTROLLERS; ++i) {
        if (data.joystick[i].id == joystick_id && data.joystick[i].connected) {
            return data.joystick[i];
        }
    }
    return 0;
}
export function joystick_is_active(joystick_id: number) {
    return get_joystick_by_id(joystick_id) != 0;
}
export function joystick_remove(joystick_id: number): number {
    let joystick: joystick_info = get_joystick_by_id(joystick_id);
    if (!joystick) {
        return 0;
    }
    joystick.connected = 0;
    joystick.model.connected_joysticks--;
    let name: string = joystick.model.name;
    joystick.model = null;
    reset_joystick_state(joystick);
    data.connected_joysticks--;
    log_info("Joystick removed with name", name, 0);
    return 1;
}
export function joystick_update_element(joystick_id: number, element: joystick_element, element_id: number, value1: number, value2: number): void {
    let joystick: joystick_info = get_joystick_by_id(joystick_id);
    if (!joystick) {
        return;
    }
    switch (element) {
        case JOYSTICK_ELEMENT_BUTTON:
            joystick.button[element_id] = value1;
            break;
        case JOYSTICK_ELEMENT_HAT:
            update_hat(joystick.hat[element_id], value1);
            break;
        case JOYSTICK_ELEMENT_AXIS:
            joystick.axis[element_id] = (Math.abs(value1) > AXIS_MAX_THRESHOLD) ? value1 : 0;
            break;
        case JOYSTICK_ELEMENT_TRACKBALL:
            update_trackball(joystick.trackball[element_id], value1, value2);
            break;
        default:
            log_info("Trying to update wrong joystick element", 0, element);
            break;
    }
}
function get_input_for_mapping(joystick: joystick_info, mapping: mapping_element, input: mapped_input) {
    for (let j: number = 0; j < JOYSTICK_MAPPING_ELEMENTS_MAX; ++j) {
        let current_element: joystick_element = mapping.element[j].type;
        let current_value: number = 0;
        let element_id: number = mapping.element[j].id;
        let element_position: number = mapping.element[j].position;
        switch (current_element) {
            case JOYSTICK_ELEMENT_AXIS:
                if (element_position == JOYSTICK_AXIS_POSITIVE) {
                    current_value = (joystick.axis[element_id] > 0) ? joystick.axis[element_id] : 0;
                } else {
                    current_value = (joystick.axis[element_id] < 0) ? -joystick.axis[element_id] : 0;
                }
                break;
            case JOYSTICK_ELEMENT_TRACKBALL:
                switch (element_position) {
                    case JOYSTICK_TRACKBALL_X_POSITIVE:
                        if (joystick.trackball[element_id].delta_x > 0) {
                            current_value = joystick.trackball[element_id].delta_x;
                        }
                        break;
                    case JOYSTICK_TRACKBALL_X_NEGATIVE:
                        if (joystick.trackball[element_id].delta_x < 0) {
                            current_value = -joystick.trackball[element_id].delta_x;
                        }
                        break;
                    case JOYSTICK_TRACKBALL_Y_POSITIVE:
                        if (joystick.trackball[element_id].delta_y > 0) {
                            current_value = joystick.trackball[element_id].delta_y;
                        }
                        break;
                    case JOYSTICK_TRACKBALL_Y_NEGATIVE:
                        if (joystick.trackball[element_id].delta_y < 0) {
                            current_value = -joystick.trackball[element_id].delta_y;
                        }
                        break;
                }
                break
            case JOYSTICK_ELEMENT_BUTTON:
                current_value = joystick.button[element_id];
                break;
            case JOYSTICK_ELEMENT_HAT:
                {
                    let hat: joystick_hat = joystick.hat[element_id];
                    switch (element_position) {
                        case JOYSTICK_HAT_UP:
                            current_value = hat.top;
                            break;
                        case JOYSTICK_HAT_LEFT:
                            current_value = hat.left;
                            break;
                        case JOYSTICK_HAT_DOWN:
                            current_value = hat.bottom;
                            break;
                        case JOYSTICK_HAT_RIGHT:
                            current_value = hat.right;
                            break;
                        default:
                            current_value = 0
                            log_info("Invalid hat value for hat", 0, element_id);
                            break
                    }
                    break
                }
            default:
                continue;
        }
        if (current_value == 0) {
            input.element = JOYSTICK_ELEMENT_NONE;
            input.value = 0;
            return 0;
        }
        if (input.element == JOYSTICK_ELEMENT_NONE || current_element < input.element) {
            input.element = current_element;
            input.value = current_value;
        }
    }
    return input.value != 0;
}
function set_input_state(input: mapped_input) {
    if (input.value) {
        if (input.state == INPUT_STATE_IS_UP || input.state == INPUT_STATE_WENT_UP) {
            input.state = INPUT_STATE_WENT_DOWN;
        } else {
            input.state = INPUT_STATE_IS_DOWN;
        }
    } else {
        if (input.state == INPUT_STATE_IS_DOWN || input.state == INPUT_STATE_WENT_DOWN) {
            input.state = INPUT_STATE_WENT_UP;
        } else {
            input.state = INPUT_STATE_IS_UP;
        }
    }
}
function get_joystick_input_for_action(action: mapping_action, input: mapped_input | null) {
    let dummy_input: mapped_input = new mapped_input();
    if (!input) {
        input = dummy_input;
    }
    input.value = 0;
    input.element = JOYSTICK_ELEMENT_NONE;
    for (let i: number = 0; i < MAX_CONTROLLERS; ++i) {
        let joystick = data.joystick[i];
        if (!joystick || !joystick.connected) {
            continue
        }
        let model: joystick_model = joystick.model;
        for (let j: number = 0; j < model.num_mappings; j++) {
            if (model.mapping[j].action == action && get_input_for_mapping(joystick, model.mapping[j], input)) {
                set_input_state(input);
                return 1;
            }
        }
    }
    set_input_state(input);
    return 0;
}
function translate_input_for_element(input: mapped_input, translated_element: joystick_element) {
    if (input.element == translated_element) {
        return;
    }
    if (translated_element == JOYSTICK_ELEMENT_AXIS) {
        switch (input.element) {
            case JOYSTICK_ELEMENT_TRACKBALL:
                input.value *= TRACKBALL_TO_AXIS_RATIO
                break
            default:
                input.value *= AXIS_MAX_VALUE
                break
        }
    } else if (translated_element == JOYSTICK_ELEMENT_TRACKBALL) {
        switch (input.element) {
            case JOYSTICK_ELEMENT_AXIS:
                input.value /= TRACKBALL_TO_AXIS_RATIO
                break
            default:
                input.value *= TRACKBALL_TO_AXIS_RATIO
                break
        }
    } else if (translated_element == JOYSTICK_ELEMENT_BUTTON || translated_element == JOYSTICK_ELEMENT_HAT) {
        input.value = (input.value != 0) ? 1 : 0;
    }
    input.element = translated_element;
}
function rescale_axis(inputs: mapped_input[]) {
    let analog_x: number = inputs[DIRECTION_RIGHT].value - inputs[DIRECTION_LEFT].value;
    let analog_y: number = inputs[DIRECTION_DOWN].value - inputs[DIRECTION_UP].value;
    inputs[DIRECTION_UP].value = 0;
    inputs[DIRECTION_LEFT].value = 0;
    inputs[DIRECTION_DOWN].value = 0;
    inputs[DIRECTION_RIGHT].value = 0;
    let magnitude: number = Math.sqrt(analog_x * analog_x + analog_y * analog_y);
    if (magnitude < DEADZONE) {
        return 0;
    }
    let abs_analog_x: number = Math.abs(analog_x);
    let abs_analog_y: number = Math.abs(analog_y);
    let max_x: number;
    let max_y: number;
    if (abs_analog_x > abs_analog_y) {
        max_x = AXIS_MAX_VALUE;
        max_y = (AXIS_MAX_VALUE * analog_y) / abs_analog_x;
    } else {
        max_x = (AXIS_MAX_VALUE * analog_x) / abs_analog_y;
        max_y = AXIS_MAX_VALUE;
    }
    let maximum: number = Math.sqrt(max_x * max_x + max_y * max_y);
    if (maximum > 1.25 * AXIS_MAX_VALUE) {
        maximum = 1.25 * AXIS_MAX_VALUE;
    }
    if (maximum < magnitude) {
        maximum = magnitude;
    }
    let scaling_factor: number = maximum / magnitude * (magnitude - DEADZONE) / (maximum - DEADZONE);
    analog_x = (analog_x * scaling_factor);
    analog_y = (analog_y * scaling_factor);
    let clamping_factor: number = 1.0;
    abs_analog_x = Math.abs(analog_x);
    abs_analog_y = Math.abs(analog_y);
    if (abs_analog_x > AXIS_MAX_VALUE || abs_analog_y > AXIS_MAX_VALUE) {
        if (abs_analog_x > abs_analog_y) {
            clamping_factor = AXIS_MAX_VALUE / abs_analog_x;
        } else {
            clamping_factor = AXIS_MAX_VALUE / abs_analog_y;
        }
    }
    if (analog_y > 0.0) {
        inputs[DIRECTION_DOWN].value = Math.floor(clamping_factor * analog_y);
    } else if (analog_y < 0.0) {
        inputs[DIRECTION_UP].value = Math.floor(clamping_factor * -analog_y);
    }
    if (analog_x > 0.0) {
        inputs[DIRECTION_RIGHT].value = Math.floor(clamping_factor * analog_x);
    } else if (analog_x < 0.0) {
        inputs[DIRECTION_LEFT].value = Math.floor(clamping_factor * -analog_x);
    }
    return 1;
}
function get_highest_priority_element(inputs: mapped_input[], total_inputs: number) {
    let highest_priority: joystick_element = inputs[0].element;
    for (let i: number = 1; i < total_inputs; ++i) {
        if (inputs[i].element < highest_priority && inputs[i].element != JOYSTICK_ELEMENT_NONE) {
            highest_priority = inputs[i].element;
        }
    }
    return highest_priority;
}
function translate_mapping_reset() {
    return get_joystick_input_for_action(MAPPING_ACTION_RESET_MAPPING, null);
}
function translate_mouse_cursor_position() {
    let cursor_input: mapped_input[] = Array.from({ length: NUM_DIRECTIONS }, () => new mapped_input());
    let handled: number = get_joystick_input_for_action(MAPPING_ACTION_MOUSE_CURSOR_UP, cursor_input[DIRECTION_UP]);
    handled |= get_joystick_input_for_action(MAPPING_ACTION_MOUSE_CURSOR_LEFT, cursor_input[DIRECTION_LEFT])
    handled |= get_joystick_input_for_action(MAPPING_ACTION_MOUSE_CURSOR_DOWN, cursor_input[DIRECTION_DOWN])
    handled |= get_joystick_input_for_action(MAPPING_ACTION_MOUSE_CURSOR_RIGHT, cursor_input[DIRECTION_RIGHT])
    if (!handled) {
        speed_clear(data.mouse.x_speed);
        speed_clear(data.mouse.y_speed);
        return 0;
    }
    translate_input_for_element(cursor_input[DIRECTION_UP], JOYSTICK_ELEMENT_AXIS);
    translate_input_for_element(cursor_input[DIRECTION_LEFT], JOYSTICK_ELEMENT_AXIS);
    translate_input_for_element(cursor_input[DIRECTION_DOWN], JOYSTICK_ELEMENT_AXIS);
    translate_input_for_element(cursor_input[DIRECTION_RIGHT], JOYSTICK_ELEMENT_AXIS);
    if (!rescale_axis(cursor_input)) {
        speed_clear(data.mouse.x_speed);
        speed_clear(data.mouse.y_speed);
        return 0;
    }
    let slowdown: number = cursor_slowdown.CURSOR_SLOWDOWN_NORMAL;
    if (get_joystick_input_for_action(MAPPING_ACTION_FASTER_MOUSE_CURSOR_SPEED, null)) {
        slowdown = cursor_slowdown.CURSOR_SLOWDOWN_FASTER;
    } else if (get_joystick_input_for_action(MAPPING_ACTION_SLOWER_MOUSE_CURSOR_SPEED, null)) {
        slowdown = cursor_slowdown.CURSOR_SLOWDOWN_SLOWER;
    }
    let delta_x: number = cursor_input[DIRECTION_RIGHT].value - cursor_input[DIRECTION_LEFT].value;
    let delta_y: number = cursor_input[DIRECTION_DOWN].value - cursor_input[DIRECTION_UP].value;
    speed_set_target(data.mouse.x_speed, delta_x / slowdown, SPEED_CHANGE_IMMEDIATE, 1);
    speed_set_target(data.mouse.y_speed, delta_y / slowdown, SPEED_CHANGE_IMMEDIATE, 1);
    delta_x = speed_get_delta(data.mouse.x_speed);
    delta_y = speed_get_delta(data.mouse.y_speed);
    if (!delta_x && !delta_y) {
        return 1;
    }
    system_move_mouse_cursor(delta_x, delta_y);
    return 1;
}
function translate_mouse_button_presses() {
    let handled: number = 0;
    let button: number = get_joystick_input_for_action(MAPPING_ACTION_LEFT_MOUSE_BUTTON, null);
    if (button != data.mouse.left_button) {
        data.mouse.left_button = button;
        mouse_set_left_down(button != 0);
        handled = 1;
    }
    button = get_joystick_input_for_action(MAPPING_ACTION_RIGHT_MOUSE_BUTTON, null);
    if (button != data.mouse.right_button) {
        data.mouse.right_button = button;
        mouse_set_right_down(button != 0);
        handled = 1;
    }
    return handled;
}
function translate_mouse() {
    let handled: number = 0;
    handled |= translate_mouse_cursor_position()
    handled |= translate_mouse_button_presses()
    return handled;
}
function window_has_map_scrolling() {
    return window_is(WINDOW_CITY) ||
        window_is(WINDOW_CITY_MILITARY) ||
        window_is(WINDOW_EDITOR_MAP) ||
        window_is(WINDOW_EMPIRE) ||
        window_is(WINDOW_EDITOR_EMPIRE);
}
function translate_window_scrolling() {
    if (window_has_map_scrolling()) {
        return 0;
    }
    let handled: number = 0;
    let current_scroll: scroll_state = SCROLL_NONE;
    let scroll_up: mapped_input
    let scroll_down: mapped_input;
    handled |= get_joystick_input_for_action(MAPPING_ACTION_SCROLL_WINDOW_UP, scroll_up)
    handled |= get_joystick_input_for_action(MAPPING_ACTION_SCROLL_WINDOW_DOWN, scroll_down)
    if (!handled) {
        return 0;
    }
    translate_input_for_element(scroll_up, JOYSTICK_ELEMENT_AXIS);
    translate_input_for_element(scroll_down, JOYSTICK_ELEMENT_AXIS);
    let max_scroll_time: number = 50;
    if (scroll_up.value) {
        current_scroll = SCROLL_UP;
        max_scroll_time = max_scroll_time * AXIS_MAX_VALUE / scroll_up.value;
    } else if (scroll_down.value) {
        current_scroll = SCROLL_DOWN;
        max_scroll_time = max_scroll_time * AXIS_MAX_VALUE / scroll_down.value;
    }
    if (current_scroll != SCROLL_NONE) {
        let current_time: time_millis = time_get_millis();
        if (current_time - data.mouse.last_scroll_time > max_scroll_time) {
            data.mouse.last_scroll_time = current_time;
            mouse_set_scroll(current_scroll);
        }
        return 1;
    } else {
        data.mouse.last_scroll_time = 0;
        return 0;
    }
}
function translate_map_scrolling() {
    if (!window_has_map_scrolling()) {
        return 0;
    }
    let handled: number = get_joystick_input_for_action(MAPPING_ACTION_SCROLL_MAP_UP, data.map_scroll[DIRECTION_UP]);
    handled |= get_joystick_input_for_action(MAPPING_ACTION_SCROLL_MAP_LEFT, data.map_scroll[DIRECTION_LEFT])
    handled |= get_joystick_input_for_action(MAPPING_ACTION_SCROLL_MAP_DOWN, data.map_scroll[DIRECTION_DOWN])
    handled |= get_joystick_input_for_action(MAPPING_ACTION_SCROLL_MAP_RIGHT, data.map_scroll[DIRECTION_RIGHT])
    if (!handled) {
        let stopped_scrolling: number = 0;
        for (let direction: number = 0; direction < NUM_DIRECTIONS; ++direction) {
            if (data.map_scroll[direction].state == INPUT_STATE_IS_DOWN ||
                data.map_scroll[direction].state == INPUT_STATE_WENT_DOWN) {
                stopped_scrolling = 0;
                break;
            } else if (data.map_scroll[direction].state == INPUT_STATE_WENT_UP) {
                stopped_scrolling |= 1
            }
        }
        if (stopped_scrolling) {
            scroll_arrow_up(0);
            scroll_arrow_left(0);
            scroll_arrow_down(0);
            scroll_arrow_right(0);
        }
        return 0;
    }
    let base_element: joystick_element = get_highest_priority_element(data.map_scroll, 4);
    translate_input_for_element(data.map_scroll[DIRECTION_UP], base_element);
    translate_input_for_element(data.map_scroll[DIRECTION_LEFT], base_element);
    translate_input_for_element(data.map_scroll[DIRECTION_DOWN], base_element);
    translate_input_for_element(data.map_scroll[DIRECTION_RIGHT], base_element);
    if (base_element == JOYSTICK_ELEMENT_AXIS) {
        rescale_axis(data.map_scroll);
    }
    scroll_arrow_up(data.map_scroll[DIRECTION_UP].value);
    scroll_arrow_left(data.map_scroll[DIRECTION_LEFT].value);
    scroll_arrow_down(data.map_scroll[DIRECTION_DOWN].value);
    scroll_arrow_right(data.map_scroll[DIRECTION_RIGHT].value);
    return 1;
}
function translate_hotkeys() {
    let handled: number = 0;
    for (let i: number = 0; i < MAX_HOTKEYS; ++i) {
        let value: number = get_joystick_input_for_action(HOTKEY_OFFSET + i, data.joystick_hotkey[i]);
        handled |= value
        if (value) {
            if (data.joystick_hotkey[i].state == INPUT_STATE_WENT_DOWN) {
                hotkey_set_value_for_action(JOYSTICK_MAPPING_TO_HOTKEY_ACTION[i], 1);
            }
        } else if (data.joystick_hotkey[i].state == INPUT_STATE_WENT_UP) {
            hotkey_set_value_for_action(JOYSTICK_MAPPING_TO_HOTKEY_ACTION[i], 0);
        }
    }
    return handled;
}
function translate_system_functions() {
    if (get_joystick_input_for_action(MAPPING_ACTION_SHOW_VIRTUAL_KEYBOARD, data.virtual_keyboard)) {
        if (data.virtual_keyboard.state == INPUT_STATE_WENT_DOWN) {
            if (keyboard_is_capturing()) {
                system_keyboard_show();
            }
        }
        return 1;
    }
    if (get_joystick_input_for_action(MAPPING_ACTION_CYCLE_TOUCH_TYPE, data.touch_mode)) {
        if (data.touch_mode.state == INPUT_STATE_WENT_DOWN) {
            touch_cycle_mode();
        }
        return 1;
    }
    return 0;
}
export function joystick_to_mouse_and_keyboard() {
    if (data.connected_joysticks == 0) {
        return 0;
    }
    let handled: number = 0;
    if (!translate_mapping_reset()) {
        handled |= translate_mouse()
        handled |= translate_window_scrolling()
        handled |= translate_map_scrolling()
        handled |= translate_hotkeys()
        handled |= translate_system_functions()
    }
    for (let i: number = 0; i < MAX_CONTROLLERS; ++i) {
        let trackball: joystick_trackball[] | null = data.joystick[i].trackball;
        if (trackball) {
            for (let j: number = 0; j < MAX_TRACKBALLS; j++) {
                trackball[j] = null;
            }
        }
    }
    if (handled) {
        mouse_remove_touch();
    }
    return handled;
}
