import { buffer, buffer_read_i32, buffer_write_i32 } from 'core/buffer';
import { scenario_t } from './data';
export let scenario: scenario_t = new scenario_t();
let max_game_year: number;
export function scenario_criteria_population_enabled() {
    return scenario.win_criteria.population.enabled;
}
export function scenario_criteria_population() {
    return scenario.win_criteria.population.goal;
}
export function scenario_criteria_culture_enabled() {
    return scenario.win_criteria.culture.enabled;
}
export function scenario_criteria_culture() {
    return scenario.win_criteria.culture.goal;
}
export function scenario_criteria_prosperity_enabled() {
    return scenario.win_criteria.prosperity.enabled;
}
export function scenario_criteria_prosperity() {
    return scenario.win_criteria.prosperity.goal;
}
export function scenario_criteria_peace_enabled() {
    return scenario.win_criteria.peace.enabled;
}
export function scenario_criteria_peace() {
    return scenario.win_criteria.peace.goal;
}
export function scenario_criteria_favor_enabled() {
    return scenario.win_criteria.favor.enabled;
}
export function scenario_criteria_favor() {
    return scenario.win_criteria.favor.goal;
}
export function scenario_criteria_time_limit_enabled() {
    return scenario.win_criteria.time_limit.enabled;
}
export function scenario_criteria_time_limit_years() {
    return scenario.win_criteria.time_limit.years;
}
export function scenario_criteria_survival_enabled() {
    return scenario.win_criteria.survival_time.enabled;
}
export function scenario_criteria_survival_years() {
    return scenario.win_criteria.survival_time.years;
}
export function scenario_criteria_milestone_year(percentage: number) {
    switch (percentage) {
        case 25:
            return scenario.start_year + scenario.win_criteria.milestone25_year;
        case 50:
            return scenario.start_year + scenario.win_criteria.milestone50_year;
        case 75:
            return scenario.start_year + scenario.win_criteria.milestone75_year;
        default:
            return 0
    }
}
export function scenario_criteria_init_max_year() {
    if (scenario.win_criteria.time_limit.enabled) {
        max_game_year = scenario.start_year + scenario.win_criteria.time_limit.years;
    } else if (scenario.win_criteria.survival_time.enabled) {
        max_game_year = scenario.start_year + scenario.win_criteria.survival_time.years;
    } else {
        max_game_year = 1000000 + scenario.start_year;
    }
}
export function scenario_criteria_max_year() {
    return max_game_year;
}
export function scenario_criteria_save_state(buf: buffer) {
    buffer_write_i32(buf, max_game_year);
}
export function scenario_criteria_load_state(buf: buffer) {
    max_game_year = buffer_read_i32(buf);
}
