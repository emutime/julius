
import { house_population_create_emigrants, house_population_create_immigrants } from 'building/house_population';
import { low_mood_cause } from 'city/constants';
import { city_figures_total_invading_enemies } from 'city/figures';
import { city_message_post, city_message_type } from 'city/message';
import { calc_adjust_with_percentage } from 'core/calc';
import { resource_type } from 'game/resource';
import { tutorial_get_population_cap } from 'game/tutorial';
import { city_data_t } from './data_private';
import LOW_MOOD_CAUSE_NO_FOOD = low_mood_cause.LOW_MOOD_CAUSE_NO_FOOD;
import LOW_MOOD_CAUSE_NO_JOBS = low_mood_cause.LOW_MOOD_CAUSE_NO_JOBS;
import LOW_MOOD_CAUSE_HIGH_TAXES = low_mood_cause.LOW_MOOD_CAUSE_HIGH_TAXES;
import LOW_MOOD_CAUSE_LOW_WAGES = low_mood_cause.LOW_MOOD_CAUSE_LOW_WAGES;
import LOW_MOOD_CAUSE_MANY_TENTS = low_mood_cause.LOW_MOOD_CAUSE_MANY_TENTS;
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
import RESOURCE_MAX_FOOD = resource_type.RESOURCE_MAX_FOOD;
export let city_data: city_data_t = new city_data_t();
import MESSAGE_EMIGRATION = city_message_type.MESSAGE_EMIGRATION;
function update_status() {
    if (city_data.sentiment.value > 70) {
        city_data.migration.percentage = 100;
    } else if (city_data.sentiment.value > 60) {
        city_data.migration.percentage = 75;
    } else if (city_data.sentiment.value >= 50) {
        city_data.migration.percentage = 50;
    } else if (city_data.sentiment.value > 40) {
        city_data.migration.percentage = 0;
    } else if (city_data.sentiment.value > 30) {
        city_data.migration.percentage = -10;
    } else if (city_data.sentiment.value > 20) {
        city_data.migration.percentage = -25;
    } else {
        city_data.migration.percentage = -50;
    }
    city_data.migration.immigration_amount_per_batch = 0;
    city_data.migration.emigration_amount_per_batch = 0;
    let population_cap: number = tutorial_get_population_cap(200000);
    if (city_data.population.population >= population_cap) {
        city_data.migration.percentage = 0;
        return;
    }
    if (city_figures_total_invading_enemies() > 3 &&
        city_data.migration.percentage > 0) {
        city_data.migration.percentage = 0;
        return;
    }
    if (city_data.migration.percentage > 0) {
        if (city_data.migration.emigration_duration) {
            city_data.migration.emigration_duration--;
        } else {
            city_data.migration.immigration_amount_per_batch =
                calc_adjust_with_percentage(12, city_data.migration.percentage);
            city_data.migration.immigration_duration = 2;
        }
    } else if (city_data.migration.percentage < 0) {
        if (city_data.migration.immigration_duration) {
            city_data.migration.immigration_duration--;
        } else if (city_data.population.population > 100) {
            city_data.migration.emigration_amount_per_batch =
                calc_adjust_with_percentage(12, -city_data.migration.percentage);
            city_data.migration.emigration_duration = 2;
        }
    }
}
function create_immigrants(num_people: number) {
    let immigrated: number = house_population_create_immigrants(num_people);
    city_data.migration.immigrated_today += immigrated
    city_data.migration.newcomers += city_data.migration.immigrated_today
    if (immigrated == 0) {
        city_data.migration.refused_immigrants_today += num_people
    }
}
function create_emigrants(num_people: number) {
    city_data.migration.emigrated_today += house_population_create_emigrants(num_people)
}
function create_migrants() {
    city_data.migration.immigrated_today = 0;
    city_data.migration.emigrated_today = 0;
    city_data.migration.refused_immigrants_today = 0;
    if (city_data.migration.immigration_amount_per_batch > 0) {
        if (city_data.migration.immigration_amount_per_batch >= 4) {
            create_immigrants(city_data.migration.immigration_amount_per_batch);
        } else if (city_data.migration.immigration_amount_per_batch
            + city_data.migration.immigration_queue_size >= 4) {
            create_immigrants(city_data.migration.immigration_amount_per_batch
                + city_data.migration.immigration_queue_size);
            city_data.migration.immigration_queue_size = 0;
        } else {
            city_data.migration.immigration_queue_size += city_data.migration.immigration_amount_per_batch
        }
    }
    if (city_data.migration.emigration_amount_per_batch > 0) {
        if (city_data.migration.emigration_amount_per_batch >= 4) {
            create_emigrants(city_data.migration.emigration_amount_per_batch);
        } else if (city_data.migration.emigration_amount_per_batch + city_data.migration.emigration_queue_size >= 4) {
            create_emigrants(city_data.migration.emigration_amount_per_batch
                + city_data.migration.emigration_queue_size);
            city_data.migration.emigration_queue_size = 0;
            if (!city_data.migration.emigration_message_shown) {
                city_data.migration.emigration_message_shown = 1;
                city_message_post(1, MESSAGE_EMIGRATION, 0, 0);
            }
        } else {
            city_data.migration.emigration_queue_size += city_data.migration.emigration_amount_per_batch
        }
    }
    city_data.migration.immigration_amount_per_batch = 0;
    city_data.migration.emigration_amount_per_batch = 0;
}
export function city_migration_update() {
    update_status();
    create_migrants();
}
export function city_migration_determine_no_immigration_cause() {
    switch (city_data.sentiment.low_mood_cause) {
        case LOW_MOOD_CAUSE_NO_FOOD:
            city_data.migration.no_immigration_cause = 2;
            break
        case LOW_MOOD_CAUSE_NO_JOBS:
            city_data.migration.no_immigration_cause = 1;
            break
        case LOW_MOOD_CAUSE_HIGH_TAXES:
            city_data.migration.no_immigration_cause = 3;
            break
        case LOW_MOOD_CAUSE_LOW_WAGES:
            city_data.migration.no_immigration_cause = 0;
            break
        case LOW_MOOD_CAUSE_MANY_TENTS:
            city_data.migration.no_immigration_cause = 4;
            break
        default:
            city_data.migration.no_immigration_cause = 5
            break
    }
}
export function city_migration_no_immigration_cause() {
    return city_data.migration.no_immigration_cause;
}
export function city_migration_no_room_for_immigrants() {
    return city_data.migration.refused_immigrants_today || city_data.population.room_in_houses <= 0;
}
export function city_migration_percentage() {
    return city_data.migration.percentage;
}
export function city_migration_newcomers() {
    return city_data.migration.newcomers;
}
export function city_migration_reset_newcomers() {
    city_data.migration.newcomers = 0;
}
