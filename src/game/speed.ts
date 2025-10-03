export const MAX_TICKS_PER_FRAME = 20;
import { building_type } from 'building/type';
import { building_construction_in_progress } from 'building/construction';
import { time_millis } from 'core/time';
import { time_get_millis } from 'core/time';;
import { set_tooltips } from 'game/settings';
import { set_difficulty } from 'game/settings';
import { set_sound_type } from 'game/settings';
import { set_sound } from 'game/settings';
import { setting_game_speed } from 'game/settings';
import { game_state_is_paused } from 'game/state';
import { touch_coords } from 'input/touch';
import { touch_mode } from 'input/touch';
import { touch } from 'input/touch';
import { mouse_button } from 'input/mouse';
import { scroll_state } from 'input/mouse';
import { mouse } from 'input/mouse';
import { tooltip_type } from 'graphics/tooltip';
import { tooltip_extra_text_type } from 'graphics/tooltip';
import { tooltip_context } from 'graphics/tooltip';
import { key_type } from 'input/keys';
import { key_modifier_type } from 'input/keys';
import { hotkey_action } from 'core/hotkey_config';
import { hotkey_mapping } from 'core/hotkey_config';
import { hotkeys } from 'input/hotkey';
import { window_id } from 'graphics/window';
import WINDOW_CITY = window_id.WINDOW_CITY;
import WINDOW_CITY_MILITARY = window_id.WINDOW_CITY_MILITARY;
import WINDOW_OVERLAY_MENU = window_id.WINDOW_OVERLAY_MENU;
import WINDOW_MILITARY_MENU = window_id.WINDOW_MILITARY_MENU;
import WINDOW_BUILD_MENU = window_id.WINDOW_BUILD_MENU;
import WINDOW_SLIDING_SIDEBAR = window_id.WINDOW_SLIDING_SIDEBAR;
import WINDOW_EDITOR_MAP = window_id.WINDOW_EDITOR_MAP;
import { window_id } from 'graphics/window';
import { window_type } from 'graphics/window';
import { window_get_id } from 'graphics/window';
import { buffer } from 'core/buffer';
import { view_tile } from 'city/view';
import { pixel_offset } from 'city/view';
import { map_callback } from 'city/view';
import { scroll_type } from 'input/scroll';
import { scroll_in_progress } from 'input/scroll';
import { scroll_is_smooth } from 'input/scroll';
let MILLIS_PER_TICK_PER_SPEED: time_millis[] = new Array().fill({
    702, 502, 352, 242, 162, 112, 82, 57, 37, 22, 16
});
let MILLIS_PER_HYPER_SPEED: time_millis[] = new Array().fill({
    702, 16, 8, 5, 3, 2
});
export class unnamed19_8 {
    public last_check_was_valid: number = 0;
    public last_update: time_millis = null;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.last_check_was_valid = args[0]);
        args.length >= 2 && (this.last_update = args[1]);
    }
}
let data: unnamed19_8 = new unnamed19_8();
export function game_speed_get_elapsed_ticks() {
    let last_check_was_valid: number = data.last_check_was_valid;
    data.last_check_was_valid = 0;
    if (game_state_is_paused()) {
        return 0;
    }
    let millis_per_tick: number = 1;
    switch (window_get_id()) {
        default:
            return 0
        case WINDOW_CITY:
        case WINDOW_CITY_MILITARY:
        case WINDOW_SLIDING_SIDEBAR:
        case WINDOW_OVERLAY_MENU:
        case WINDOW_MILITARY_MENU:
        case WINDOW_BUILD_MENU:
            {
                let speed: number = setting_game_speed();
                if (speed < 10) {
                    return 0;
                } else if (speed <= 100) {
                    millis_per_tick = MILLIS_PER_TICK_PER_SPEED[speed / 10];
                } else {
                    if (speed > 500) {
                        speed = 500;
                    }
                    millis_per_tick = MILLIS_PER_HYPER_SPEED[speed / 100];
                }
                break
            }
        case WINDOW_EDITOR_MAP:
            millis_per_tick = MILLIS_PER_TICK_PER_SPEED[7];
            break
    }
    if (building_construction_in_progress()) {
        return 0;
    }
    if (scroll_in_progress() && !scroll_is_smooth()) {
        return 0;
    }
    let now: time_millis = time_get_millis();
    let diff: time_millis = now - data.last_update;
    data.last_check_was_valid = 1;
    if (!last_check_was_valid) {
        data.last_update = now;
        return 1;
    }
    let ticks: number = diff / millis_per_tick;
    if (!ticks) {
        return 0;
    } else if (ticks <= MAX_TICKS_PER_FRAME) {
        data.last_update = now - (diff % millis_per_tick);
        return ticks;
    } else {
        data.last_update = now;
        return MAX_TICKS_PER_FRAME;
    }
}
