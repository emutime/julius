import { building, building_get, MAX_BUILDINGS } from 'building/building';
import { building_destroy_by_plague } from 'building/destruction';
import { building_state, house_level } from 'building/type';
import { city_message_post, city_message_type } from 'city/message';
import { calc_adjust_with_percentage, calc_bound, calc_percentage } from 'core/calc';
import { random_byte } from 'core/random';
import { resource_type } from 'game/resource';
import { tutorial_on_disease } from 'game/tutorial';
import { scenario_is_tutorial_1, scenario_is_tutorial_2 } from 'scenario/property';
import { city_data_t } from './data_private';
import HOUSE_LARGE_TENT = house_level.HOUSE_LARGE_TENT;
import BUILDING_STATE_IN_USE = building_state.BUILDING_STATE_IN_USE;;
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
import RESOURCE_MAX_FOOD = resource_type.RESOURCE_MAX_FOOD;
export let city_data: city_data_t = new city_data_t();
import MESSAGE_HEALTH_ILLNESS = city_message_type.MESSAGE_HEALTH_ILLNESS;
import MESSAGE_HEALTH_DISEASE = city_message_type.MESSAGE_HEALTH_DISEASE;
import MESSAGE_HEALTH_PESTILENCE = city_message_type.MESSAGE_HEALTH_PESTILENCE;
export function city_health() {
    return city_data.health.value;
}
export function city_health_change(amount: number) {
    city_data.health.value = calc_bound(city_data.health.value + amount, 0, 100);
}
function cause_disease(total_people: number) {
    if (city_data.health.value >= 40) {
        return;
    }
    let chance_value: number = random_byte() & 0x3f;
    if (city_data.religion.venus_curse_active) {
        chance_value = 0;
        city_data.religion.venus_curse_active = 0;
    }
    if (chance_value > 40 - city_data.health.value) {
        return;
    }
    let sick_people: number = calc_adjust_with_percentage(total_people, 7 + (random_byte() & 3));
    if (sick_people <= 0) {
        return;
    }
    city_health_change(10);
    let people_to_kill: number = sick_people - city_data.health.num_hospital_workers;
    if (people_to_kill <= 0) {
        city_message_post(true, MESSAGE_HEALTH_ILLNESS, 0, 0);
        return;
    }
    if (city_data.health.num_hospital_workers > 0) {
        city_message_post(true, MESSAGE_HEALTH_DISEASE, 0, 0);
    } else {
        city_message_post(true, MESSAGE_HEALTH_PESTILENCE, 0, 0);
    }
    tutorial_on_disease();
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state == BUILDING_STATE_IN_USE && b.house_size && b.house_population) {
            if (!b.data.house.clinic) {
                people_to_kill -= b.house_population
                building_destroy_by_plague(b);
                if (people_to_kill <= 0) {
                    return;
                }
            }
        }
    }
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state == BUILDING_STATE_IN_USE && b.house_size && b.house_population) {
            if (b.subtype.house_level <= HOUSE_LARGE_TENT) {
                people_to_kill -= b.house_population
                building_destroy_by_plague(b);
                if (people_to_kill <= 0) {
                    return;
                }
            }
        }
    }
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state == BUILDING_STATE_IN_USE && b.house_size && b.house_population) {
            people_to_kill -= b.house_population
            building_destroy_by_plague(b);
            if (people_to_kill <= 0) {
                return;
            }
        }
    }
}
export function city_health_update() {
    if (city_data.population.population < 200 || scenario_is_tutorial_1() || scenario_is_tutorial_2()) {
        city_data.health.value = 50;
        city_data.health.target_value = 50;
        return;
    }
    let total_population: number = 0;
    let healthy_population: number = 0;
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state != BUILDING_STATE_IN_USE || !b.house_size || !b.house_population) {
            continue
        }
        total_population += b.house_population
        if (b.subtype.house_level <= HOUSE_LARGE_TENT) {
            if (b.data.house.clinic) {
                healthy_population += b.house_population
            } else {
                healthy_population += b.house_population / 4
            }
        } else if (b.data.house.clinic) {
            if (b.house_days_without_food == 0) {
                healthy_population += b.house_population
            } else {
                healthy_population += b.house_population / 4
            }
        } else if (b.house_days_without_food == 0) {
            healthy_population += b.house_population / 4
        }
    }
    city_data.health.target_value = calc_percentage(healthy_population, total_population);
    if (city_data.health.value < city_data.health.target_value) {
        city_data.health.value += 2
        if (city_data.health.value > city_data.health.target_value) {
            city_data.health.value = city_data.health.target_value;
        }
    } else if (city_data.health.value > city_data.health.target_value) {
        city_data.health.value -= 2
        if (city_data.health.value < city_data.health.target_value) {
            city_data.health.value = city_data.health.target_value;
        }
    }
    city_data.health.value = calc_bound(city_data.health.value, 0, 100);
    cause_disease(total_population);
}
export function city_health_reset_hospital_workers() {
    city_data.health.num_hospital_workers = 0;
}
export function city_health_add_hospital_workers(amount: number) {
    city_data.health.num_hospital_workers += amount
}
