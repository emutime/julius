
;
import { resource_type } from 'game/resource';
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
import RESOURCE_MAX_FOOD = resource_type.RESOURCE_MAX_FOOD;
import { city_data_t } from './data_private';
export let city_data: city_data_t = new city_data_t();
export function city_mission_reset_save_start() {
    city_data.mission.start_saved_game_written = 0;
}
export function city_mission_should_save_start() {
    if (!city_data.mission.start_saved_game_written) {
        city_data.mission.start_saved_game_written = 1;
        return 1;
    } else {
        return 0;
    }
}
export function city_mission_tutorial_set_fire_message_shown(shown: number) {
    city_data.mission.tutorial_fire_message_shown = shown;
}
export function city_mission_tutorial_set_disease_message_shown(shown: number) {
    city_data.mission.tutorial_disease_message_shown = shown;
}
export function city_mission_tutorial_show_disease_message() {
    if (!city_data.mission.tutorial_disease_message_shown) {
        city_data.mission.tutorial_disease_message_shown = 1;
        return 1;
    } else {
        return 0;
    }
}
export function city_mission_tutorial_add_senate() {
    city_data.mission.tutorial_senate_built++;
}
export function city_mission_tutorial_has_senate() {
    return city_data.mission.tutorial_senate_built > 0;
}
