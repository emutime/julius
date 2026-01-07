import { earthquake } from 'scenario/types';
import EARTHQUAKE_NONE = earthquake.EARTHQUAKE_NONE;
import EARTHQUAKE_LARGE = earthquake.EARTHQUAKE_LARGE;
import { scenario } from 'scenario/data';
export function scenario_editor_earthquake_severity() {
    return scenario.earthquake.severity;
}
export function scenario_editor_earthquake_year() {
    return scenario.earthquake.year;
}
export function scenario_editor_earthquake_cycle_severity() {
    scenario.earthquake.severity++;
    if (scenario.earthquake.severity > EARTHQUAKE_LARGE) {
        scenario.earthquake.severity = EARTHQUAKE_NONE;
    }
    scenario.is_saved = 0;
}
export function scenario_editor_earthquake_set_year(year: number) {
    scenario.earthquake.year = year;
    scenario.is_saved = 0;
}
export function scenario_editor_gladiator_revolt_enabled() {
    return scenario.gladiator_revolt.enabled;
}
export function scenario_editor_gladiator_revolt_year() {
    return scenario.gladiator_revolt.year;
}
export function scenario_editor_gladiator_revolt_toggle_enabled() {
    scenario.gladiator_revolt.enabled = scenario.gladiator_revolt.enabled ? 0 : 1;
    scenario.is_saved = 0;
}
export function scenario_editor_gladiator_revolt_set_year(year: number) {
    scenario.gladiator_revolt.year = year;
    scenario.is_saved = 0;
}
export function scenario_editor_emperor_change_enabled() {
    return scenario.emperor_change.enabled;
}
export function scenario_editor_emperor_change_year() {
    return scenario.emperor_change.year;
}
export function scenario_editor_emperor_change_toggle_enabled() {
    scenario.emperor_change.enabled = scenario.emperor_change.enabled ? 0 : 1;
    scenario.is_saved = 0;
}
export function scenario_editor_emperor_change_set_year(year: number) {
    scenario.emperor_change.year = year;
    scenario.is_saved = 0;
}
export function scenario_editor_sea_trade_problem_enabled() {
    return scenario.random_events.sea_trade_problem;
}
export function scenario_editor_sea_trade_problem_toggle_enabled() {
    scenario.random_events.sea_trade_problem = scenario.random_events.sea_trade_problem ? 0 : 1;
    scenario.is_saved = 0;
}
export function scenario_editor_land_trade_problem_enabled() {
    return scenario.random_events.land_trade_problem;
}
export function scenario_editor_land_trade_problem_toggle_enabled() {
    scenario.random_events.land_trade_problem = scenario.random_events.land_trade_problem ? 0 : 1;
    scenario.is_saved = 0;
}
export function scenario_editor_raise_wages_enabled() {
    return scenario.random_events.raise_wages;
}
export function scenario_editor_raise_wages_toggle_enabled() {
    scenario.random_events.raise_wages = scenario.random_events.raise_wages ? 0 : 1;
    scenario.is_saved = 0;
}
export function scenario_editor_lower_wages_enabled() {
    return scenario.random_events.lower_wages;
}
export function scenario_editor_lower_wages_toggle_enabled() {
    scenario.random_events.lower_wages = scenario.random_events.lower_wages ? 0 : 1;
    scenario.is_saved = 0;
}
export function scenario_editor_contaminated_water_enabled() {
    return scenario.random_events.contaminated_water;
}
export function scenario_editor_contaminated_water_toggle_enabled() {
    scenario.random_events.contaminated_water = scenario.random_events.contaminated_water ? 0 : 1;
    scenario.is_saved = 0;
}
export function scenario_editor_iron_mine_collapse_enabled() {
    return scenario.random_events.iron_mine_collapse;
}
export function scenario_editor_iron_mine_collapse_toggle_enabled() {
    scenario.random_events.iron_mine_collapse = scenario.random_events.iron_mine_collapse ? 0 : 1;
    scenario.is_saved = 0;
}
export function scenario_editor_clay_pit_flooded_enabled() {
    return scenario.random_events.clay_pit_flooded;
}
export function scenario_editor_clay_pit_flooded_toggle_enabled() {
    scenario.random_events.clay_pit_flooded = scenario.random_events.clay_pit_flooded ? 0 : 1;
    scenario.is_saved = 0;
}
