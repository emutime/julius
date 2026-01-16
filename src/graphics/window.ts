import { tooltip_context, tooltip_handle, tooltip_invalidate } from 'graphics/tooltip';
import { warning_draw } from 'graphics/warning';
import { input_cursor_update } from 'input/cursor';
import { hotkey_handle_global_keys, hotkey_reset_state, hotkey_state, hotkeys } from 'input/hotkey';
import { joystick_to_mouse_and_keyboard, mapping_action } from 'input/joystick';
import { mouse, mouse_determine_button_state, mouse_get, mouse_reset_button_state, mouse_reset_scroll } from 'input/mouse';
import { scroll_stop } from 'input/scroll';
import { reset_touches, touch_to_mouse } from 'input/touch';
export const MAX_QUEUE = 3;
export const enum window_id {
    WINDOW_LOGO,
    WINDOW_MAIN_MENU,
    WINDOW_CONFIG,
    WINDOW_HOTKEY_CONFIG,
    WINDOW_HOTKEY_EDITOR,
    WINDOW_NEW_CAREER,
    WINDOW_CCK_SELECTION,
    WINDOW_FILE_DIALOG,
    WINDOW_POPUP_DIALOG,
    WINDOW_PLAIN_MESSAGE_DIALOG,
    WINDOW_INTRO_VIDEO,
    // mission start/end
    WINDOW_INTERMEZZO,
    WINDOW_MISSION_SELECTION,
    WINDOW_MISSION_BRIEFING,
    WINDOW_VICTORY_DIALOG,
    WINDOW_VICTORY_VIDEO,
    WINDOW_MISSION_END,
    // city
    WINDOW_CITY,
    WINDOW_CITY_MILITARY,
    WINDOW_TOP_MENU,
    WINDOW_OVERLAY_MENU,
    WINDOW_MILITARY_MENU,
    WINDOW_BUILD_MENU,
    WINDOW_SLIDING_SIDEBAR,
    WINDOW_MESSAGE_DIALOG,
    WINDOW_MESSAGE_LIST,
    WINDOW_BUILDING_INFO,
    // advisors and dialogs
    WINDOW_ADVISORS,
    WINDOW_LABOR_PRIORITY,
    WINDOW_SET_SALARY,
    WINDOW_DONATE_TO_CITY,
    WINDOW_GIFT_TO_EMPEROR,
    WINDOW_TRADE_PRICES,
    WINDOW_RESOURCE_SETTINGS,
    WINDOW_HOLD_FESTIVAL,
    // empire and dialog
    WINDOW_EMPIRE,
    WINDOW_TRADE_OPENED,
    // options dialogs
    WINDOW_DIFFICULTY_OPTIONS,
    WINDOW_DISPLAY_OPTIONS,
    WINDOW_SOUND_OPTIONS,
    WINDOW_SPEED_OPTIONS,
    // utility windows
    WINDOW_SELECT_LIST,
    WINDOW_NUMERIC_INPUT,
    // editor
    WINDOW_EDITOR_MAP,
    WINDOW_EDITOR_TOP_MENU,
    WINDOW_EDITOR_BUILD_MENU,
    WINDOW_EDITOR_EMPIRE,
    WINDOW_EDITOR_ATTRIBUTES,
    WINDOW_EDITOR_ALLOWED_BUILDINGS,
    WINDOW_EDITOR_INVASIONS,
    WINDOW_EDITOR_EDIT_INVASION,
    WINDOW_EDITOR_REQUESTS,
    WINDOW_EDITOR_EDIT_REQUEST,
    WINDOW_EDITOR_STARTING_CONDITIONS,
    WINDOW_EDITOR_START_YEAR,
    WINDOW_EDITOR_SPECIAL_EVENTS,
    WINDOW_EDITOR_PRICE_CHANGES,
    WINDOW_EDITOR_EDIT_PRICE_CHANGE,
    WINDOW_EDITOR_DEMAND_CHANGES,
    WINDOW_EDITOR_EDIT_DEMAND_CHANGE,
    WINDOW_EDITOR_WIN_CRITERIA,
};
;
export class window_type {
    public id: window_id = window_id.WINDOW_LOGO;
    public draw_background: () => void = null;
    public draw_foreground: () => void = null;
    public handle_input: (m: mouse, h: hotkeys) => void = null;
    public get_tooltip: ((c: tooltip_context) => void) | null = null;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.id = args[0]);
        args.length >= 2 && (this.draw_background = args[1]);
        args.length >= 3 && (this.draw_foreground = args[2]);
        args.length >= 4 && (this.handle_input = args[3]);
        args.length >= 5 && (this.get_tooltip = args[4]);
    }
}
import MAPPING_ACTION_MAX = mapping_action.MAPPING_ACTION_MAX;
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
    reset_touches(true);
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
    data.window_queue[data.queue_index] = window;
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
    reset_touches(false);
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
