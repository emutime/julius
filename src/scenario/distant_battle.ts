import { city_message_post, city_message_type } from 'city/message';
import { city_military_has_distant_battle, city_military_init_distant_battle, city_military_process_distant_battle } from 'city/military';
import { empire_object, empire_object_init_distant_battle_travel_months } from 'empire/object';
import { resource_type } from 'game/resource';
import { game_time_month, game_time_year } from 'game/time';
import { MAX_INVASIONS } from 'scenario/data';
import { invasion_type } from 'scenario/types';
;
import MESSAGE_CAESAR_REQUESTS_ARMY = city_message_type.MESSAGE_CAESAR_REQUESTS_ARMY;
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
import EMPIRE_OBJECT_ROMAN_ARMY = empire_object.EMPIRE_OBJECT_ROMAN_ARMY;
import EMPIRE_OBJECT_ENEMY_ARMY = empire_object.EMPIRE_OBJECT_ENEMY_ARMY;
import INVASION_TYPE_DISTANT_BATTLE = invasion_type.INVASION_TYPE_DISTANT_BATTLE;
export let scenario: scenario_t = new scenario_t();
export function scenario_distant_battle_roman_travel_months() {
    return scenario.empire.distant_battle_roman_travel_months;
}
export function scenario_distant_battle_enemy_travel_months() {
    return scenario.empire.distant_battle_enemy_travel_months;
}
export function scenario_distant_battle_set_roman_travel_months() {
    scenario.empire.distant_battle_roman_travel_months =
        empire_object_init_distant_battle_travel_months(EMPIRE_OBJECT_ROMAN_ARMY);
}
export function scenario_distant_battle_set_enemy_travel_months() {
    scenario.empire.distant_battle_enemy_travel_months =
        empire_object_init_distant_battle_travel_months(EMPIRE_OBJECT_ENEMY_ARMY);
}
export function scenario_distant_battle_process() {
    for (let i: number = 0; i < MAX_INVASIONS; i++) {
        if (scenario.invasions[i].type == INVASION_TYPE_DISTANT_BATTLE &&
            game_time_year() == scenario.invasions[i].year + scenario.start_year &&
            game_time_month() == scenario.invasions[i].month &&
            scenario.empire.distant_battle_enemy_travel_months > 4 &&
            scenario.empire.distant_battle_roman_travel_months > 4 &&
            !city_military_has_distant_battle()) {
            city_message_post(1, MESSAGE_CAESAR_REQUESTS_ARMY, 0, 0);
            city_military_init_distant_battle(scenario.invasions[i].amount);
            return;
        }
    }
    city_military_process_distant_battle();
}
