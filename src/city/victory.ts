
import { building_construction_clear_type } from 'building/construction';
import { city_figures_total_invading_enemies } from 'city/figures';
import { city_finance_update_salary } from 'city/finance';
import { city_message_post, city_message_type } from 'city/message';
import { resource_type } from 'game/resource';
import { game_time_year } from 'game/time';
import { scenario_criteria_culture, scenario_criteria_culture_enabled, scenario_criteria_favor, scenario_criteria_favor_enabled, scenario_criteria_max_year, scenario_criteria_peace, scenario_criteria_peace_enabled, scenario_criteria_population, scenario_criteria_population_enabled, scenario_criteria_prosperity, scenario_criteria_prosperity_enabled, scenario_criteria_survival_enabled, scenario_criteria_time_limit_enabled } from 'scenario/criteria';
import { scenario_is_open_play } from 'scenario/property';
import { sound_music_stop } from 'sound/music';
import { window_mission_end_show_fired, window_mission_end_show_won } from 'window/mission_end';
import { window_victory_dialog_show } from 'window/victory_dialog';
import { city_data_t } from './data_private';

export const enum victory_state {
    VICTORY_STATE_LOST = -1,
    VICTORY_STATE_NONE = 0,
    VICTORY_STATE_WON = 1
};

import VICTORY_STATE_LOST = victory_state.VICTORY_STATE_LOST;
import VICTORY_STATE_NONE = victory_state.VICTORY_STATE_NONE;
import VICTORY_STATE_WON = victory_state.VICTORY_STATE_WON;
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
import RESOURCE_MAX_FOOD = resource_type.RESOURCE_MAX_FOOD;
export let city_data: city_data_t = new city_data_t();
import MESSAGE_FIRED = city_message_type.MESSAGE_FIRED;
export class unnamed16_8 {
    public state: number = 0;
    public force_win: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.state = args[0]);
        args.length >= 2 && (this.force_win = args[1]);
    }
}
let data: unnamed16_8 = new unnamed16_8();
export function city_victory_reset() {
    data.state = VICTORY_STATE_NONE;
    data.force_win = 0;
}
export function city_victory_force_win() {
    data.force_win = 1;
}
export function city_victory_state() {
    return data.state;
}
function determine_victory_state() {
    let state: number = VICTORY_STATE_WON;
    let has_criteria: number = 0;
    if (scenario_criteria_culture_enabled()) {
        has_criteria = 1;
        if (city_data.ratings.culture < scenario_criteria_culture()) {
            state = VICTORY_STATE_NONE;
        }
    }
    if (scenario_criteria_prosperity_enabled()) {
        has_criteria = 1;
        if (city_data.ratings.prosperity < scenario_criteria_prosperity()) {
            state = VICTORY_STATE_NONE;
        }
    }
    if (scenario_criteria_peace_enabled()) {
        has_criteria = 1;
        if (city_data.ratings.peace < scenario_criteria_peace()) {
            state = VICTORY_STATE_NONE;
        }
    }
    if (scenario_criteria_favor_enabled()) {
        has_criteria = 1;
        if (city_data.ratings.favor < scenario_criteria_favor()) {
            state = VICTORY_STATE_NONE;
        }
    }
    if (scenario_criteria_population_enabled()) {
        has_criteria = 1;
        if (city_data.population.population < scenario_criteria_population()) {
            state = VICTORY_STATE_NONE;
        }
    }
    if (!has_criteria) {
        state = VICTORY_STATE_NONE;
    }
    if (!has_criteria) {
        if (scenario_criteria_time_limit_enabled() || scenario_criteria_survival_enabled()) {
            has_criteria = 1;
        }
    }
    if (game_time_year() >= scenario_criteria_max_year()) {
        if (scenario_criteria_time_limit_enabled()) {
            state = VICTORY_STATE_LOST;
        } else if (scenario_criteria_survival_enabled()) {
            state = VICTORY_STATE_WON;
        }
    }
    if (city_figures_total_invading_enemies() > 2 + city_data.figure.soldiers) {
        if (city_data.population.population < city_data.population.highest_ever / 4) {
            state = VICTORY_STATE_LOST;
        }
    }
    if (city_figures_total_invading_enemies() > 0) {
        if (city_data.population.population <= 0) {
            state = VICTORY_STATE_LOST;
        }
    }
    if (!has_criteria) {
        state = VICTORY_STATE_NONE;
    }
    return state;
}
export function city_victory_check() {
    if (scenario_is_open_play()) {
        return;
    }
    data.state = determine_victory_state();
    if (city_data.mission.has_won) {
        data.state = city_data.mission.continue_months_left <= 0 ? VICTORY_STATE_WON : VICTORY_STATE_NONE;
    }
    if (data.force_win) {
        data.state = VICTORY_STATE_WON;
    }
    if (data.state != VICTORY_STATE_NONE) {
        building_construction_clear_type();
        if (data.state == VICTORY_STATE_LOST) {
            if (city_data.mission.fired_message_shown) {
                window_mission_end_show_fired();
            } else {
                city_data.mission.fired_message_shown = 1;
                city_message_post(1, MESSAGE_FIRED, 0, 0);
            }
            data.force_win = 0;
        } else if (data.state == VICTORY_STATE_WON) {
            sound_music_stop();
            if (city_data.mission.victory_message_shown) {
                window_mission_end_show_won();
                data.force_win = 0;
            } else {
                city_data.mission.victory_message_shown = 1;
                window_victory_dialog_show();
            }
        }
    }
}
export function city_victory_update_months_to_govern() {
    if (city_data.mission.has_won) {
        city_data.mission.continue_months_left--;
    }
}
export function city_victory_continue_governing(months: number) {
    city_data.mission.has_won = 1;
    city_data.mission.continue_months_left += months
    city_data.mission.continue_months_chosen = months;
    city_data.emperor.salary_rank = 0;
    city_data.emperor.salary_amount = 0;
    city_finance_update_salary();
}
export function city_victory_stop_governing() {
    city_data.mission.has_won = 0;
    city_data.mission.continue_months_left = 0;
    city_data.mission.continue_months_chosen = 0;
}
export function city_victory_has_won() {
    return city_data.mission.has_won;
}
