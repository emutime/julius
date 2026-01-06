
;
import { city_message_post, city_message_type } from 'city/message';
import { empire_city_expand_empire } from 'empire/city';
import { resource_type } from 'game/resource';
import { game_time_year } from 'game/time';
import MESSAGE_EMPIRE_HAS_EXPANDED = city_message_type.MESSAGE_EMPIRE_HAS_EXPANDED;
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
export let scenario: scenario_t = new scenario_t();
export function scenario_empire_id() {
    return scenario.empire.id;
}
export function scenario_empire_is_expanded() {
    return scenario.empire.is_expanded;
}
export function scenario_empire_process_expansion() {
    if (scenario.empire.is_expanded || scenario.empire.expansion_year <= 0) {
        return;
    }
    if (game_time_year() < scenario.empire.expansion_year + scenario.start_year) {
        return;
    }
    empire_city_expand_empire();
    scenario.empire.is_expanded = 1;
    city_message_post(true, MESSAGE_EMPIRE_HAS_EXPANDED, 0, 0);
}
