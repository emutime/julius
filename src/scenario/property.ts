import { string_copy } from 'core/string';
import { MAX_PLAYER_NAME, MAX_SCENARIO_NAME, scenario_t } from 'scenario/data';
export const  enum scenario_climate {
    CLIMATE_CENTRAL = 0,
    CLIMATE_NORTHERN = 1,
    CLIMATE_DESERT = 2
};
export let scenario: scenario_t = new scenario_t();
export function scenario_is_custom() {
    return scenario.settings.is_custom;
}
export function scenario_set_custom(custom: number) {
    scenario.settings.is_custom = custom;
}
export function scenario_campaign_rank() {
    return scenario.settings.campaign_rank;
}
export function scenario_set_campaign_rank(rank: number) {
    scenario.settings.campaign_rank = rank;
}
export function scenario_campaign_mission() {
    return scenario.settings.campaign_mission;
}
export function scenario_set_campaign_mission(mission: number) {
    scenario.settings.campaign_mission = mission;
}
export function scenario_is_tutorial_1() {
    return !scenario.settings.is_custom && scenario.settings.campaign_rank == 0;
}
export function scenario_is_tutorial_2() {
    return !scenario.settings.is_custom && scenario.settings.campaign_rank == 1;
}
export function scenario_is_tutorial_3() {
    return !scenario.settings.is_custom && scenario.settings.campaign_rank == 2;
}
export function scenario_starting_favor() {
    return scenario.settings.starting_favor;
}
export function scenario_starting_personal_savings() {
    return scenario.settings.starting_personal_savings;
}
export function scenario_name() {
    return scenario.scenario_name;
}
export function scenario_set_name(name: string) {
    string_copy(name, scenario.scenario_name, MAX_SCENARIO_NAME);
}
export function scenario_player_name() {
    return scenario.settings.player_name;
}
export function scenario_set_player_name(name: string) {
    string_copy(name, scenario.settings.player_name, MAX_PLAYER_NAME);
}
export function scenario_save_campaign_player_name() {
    string_copy(scenario.settings.player_name, scenario.settings.campaign_player_name, MAX_PLAYER_NAME);
}
export function scenario_restore_campaign_player_name() {
    string_copy(scenario.settings.campaign_player_name, scenario.settings.player_name, MAX_PLAYER_NAME);
}
export function scenario_is_open_play() {
    return scenario.is_open_play;
}
export function scenario_open_play_id() {
    return scenario.open_play_scenario_id;
}
export function scenario_property_climate() {
    return scenario.climate;
}
export function scenario_property_start_year() {
    return scenario.start_year;
}
export function scenario_property_rome_supplies_wheat() {
    return scenario.rome_supplies_wheat;
}
export function scenario_property_enemy() {
    return scenario.enemy_id;
}
export function scenario_property_player_rank() {
    return scenario.player_rank;
}
export function scenario_image_id() {
    return scenario.image_id;
}
export function scenario_brief_description() {
    return scenario.brief_description;
}
export function scenario_initial_funds() {
    return scenario.initial_funds;
}
export function scenario_rescue_loan() {
    return scenario.rescue_loan;
}
