import { building, building_get, MAX_BUILDINGS } from 'building/building';
import { building_list_large_add, building_list_large_clear, building_list_large_items, building_list_large_size } from 'building/list';
import { model_get_house } from 'building/model';
import { building_state, house_level } from 'building/type';
import { city_labor_calculate_workers } from 'city/labor';
import { city_message_mark_population_shown, city_message_post, city_message_type } from 'city/message';
import { city_migration_update } from 'city/migration';
import { city_population, city_population_add_capacity, city_population_clear_capacity, city_population_last_used_house_add, city_population_last_used_house_remove, city_population_set_last_used_house_add, city_population_set_last_used_house_remove, city_population_yearly_update } from 'city/population';
import { figure_get } from 'figure/figure';
import { figure_state } from 'figure/type';
import { figure_create_emigrant, figure_create_homeless, figure_create_immigrant } from 'figuretype/migrant';
import HOUSE_SMALL_TENT = house_level.HOUSE_SMALL_TENT;
import HOUSE_LARGE_INSULA = house_level.HOUSE_LARGE_INSULA;
import HOUSE_SMALL_VILLA = house_level.HOUSE_SMALL_VILLA;
import BUILDING_STATE_IN_USE = building_state.BUILDING_STATE_IN_USE;
import BUILDING_STATE_UNDO = building_state.BUILDING_STATE_UNDO;;
import MESSAGE_POPULATION_500 = city_message_type.MESSAGE_POPULATION_500;
import MESSAGE_POPULATION_1000 = city_message_type.MESSAGE_POPULATION_1000;
import MESSAGE_POPULATION_2000 = city_message_type.MESSAGE_POPULATION_2000;
import MESSAGE_POPULATION_3000 = city_message_type.MESSAGE_POPULATION_3000;
import MESSAGE_POPULATION_5000 = city_message_type.MESSAGE_POPULATION_5000;
import MESSAGE_POPULATION_10000 = city_message_type.MESSAGE_POPULATION_10000;
import MESSAGE_POPULATION_15000 = city_message_type.MESSAGE_POPULATION_15000;
import MESSAGE_POPULATION_20000 = city_message_type.MESSAGE_POPULATION_20000;
import MESSAGE_POPULATION_25000 = city_message_type.MESSAGE_POPULATION_25000;
import FIGURE_STATE_ALIVE = figure_state.FIGURE_STATE_ALIVE;
export function house_population_add_to_city(num_people: number) {
    let added: number = 0;
    let building_id: number = city_population_last_used_house_add();
    for (let i: number = 1; i < MAX_BUILDINGS && added < num_people; i++) {
        if (++building_id >= MAX_BUILDINGS) {
            building_id = 1;
        }
        let b: building = building_get(building_id);
        if (b.state == BUILDING_STATE_IN_USE && b.house_size
            && b.distance_from_entry > 0 && b.house_population > 0) {
            city_population_set_last_used_house_add(building_id);
            let max_people: number = model_get_house(b.subtype.house_level).max_people;
            if (b.house_is_merged) {
                max_people *= 4
            }
            if (b.house_population < max_people) {
                ++added;
                ++b.house_population;
                b.house_population_room = max_people - b.house_population;
            }
        }
    }
    return added;
}
export function house_population_remove_from_city(num_people: number) {
    let removed: number = 0;
    let building_id: number = city_population_last_used_house_remove();
    for (let i: number = 1; i < 4 * MAX_BUILDINGS && removed < num_people; i++) {
        if (++building_id >= MAX_BUILDINGS) {
            building_id = 1;
        }
        let b: building = building_get(building_id);
        if (b.state == BUILDING_STATE_IN_USE && b.house_size) {
            city_population_set_last_used_house_remove(building_id);
            if (b.house_population > 0) {
                ++removed;
                --b.house_population;
            }
        }
    }
    return removed;
}
function fill_building_list_with_houses() {
    building_list_large_clear(0);
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state == BUILDING_STATE_IN_USE && b.house_size) {
            building_list_large_add(i);
        }
    }
}
export function house_population_update_room() {
    city_population_clear_capacity();
    fill_building_list_with_houses();
    let total_houses: number = building_list_large_size();
    let houses: number[] = building_list_large_items();
    for (let i: number = 0; i < total_houses; i++) {
        let b: building = building_get(houses[i]);
        b.house_population_room = 0;
        if (b.distance_from_entry > 0) {
            let max_pop: number = model_get_house(b.subtype.house_level).max_people;
            if (b.house_is_merged) {
                max_pop *= 4
            }
            city_population_add_capacity(b.house_population, max_pop);
            b.house_population_room = max_pop - b.house_population;
            if (b.house_population > b.house_highest_population) {
                b.house_highest_population = b.house_population;
            }
        } else if (b.house_population) {
            b.house_population_room = -b.house_population;
        }
    }
}
export function house_population_create_immigrants(num_people: number) {
    let total_houses: number = building_list_large_size();
    let houses: number[] = building_list_large_items();
    let to_immigrate: number = num_people;
    for (let i: number = 0; i < total_houses; i++) {
        let b: building = building_get(houses[i]);
        if (b.immigrant_figure_id && figure_get(b.immigrant_figure_id).state != FIGURE_STATE_ALIVE) {
            b.immigrant_figure_id = 0;
        }
    }
    for (let i: number = 0; i < total_houses && to_immigrate > 0; i++) {
        let b: building = building_get(houses[i]);
        if (b.distance_from_entry > 0 && b.house_population_room >= 8 && !b.immigrant_figure_id) {
            if (to_immigrate <= 4) {
                figure_create_immigrant(b, to_immigrate);
                to_immigrate = 0;
            } else {
                figure_create_immigrant(b, 4);
                to_immigrate -= 4
            }
        }
    }
    for (let i: number = 0; i < total_houses && to_immigrate > 0; i++) {
        let b: building = building_get(houses[i]);
        if (b.distance_from_entry > 0 && b.house_population_room > 0 && !b.immigrant_figure_id) {
            if (to_immigrate <= b.house_population_room) {
                figure_create_immigrant(b, to_immigrate);
                to_immigrate = 0;
            } else {
                figure_create_immigrant(b, b.house_population_room);
                to_immigrate -= b.house_population_room
            }
        }
    }
    return num_people - to_immigrate;
}
export function house_population_create_emigrants(num_people: number) {
    let total_houses: number = building_list_large_size();
    let houses: number[] = building_list_large_items();
    let to_emigrate: number = num_people;
    for (let level: number = HOUSE_SMALL_TENT; level < HOUSE_LARGE_INSULA && to_emigrate > 0; level++) {
        for (let i: number = 0; i < total_houses && to_emigrate > 0; i++) {
            let b: building = building_get(houses[i]);
            if (b.house_population > 0 && b.subtype.house_level == level) {
                let current_people: number;
                if (b.house_population >= 4) {
                    current_people = 4;
                } else {
                    current_people = b.house_population;
                }
                if (to_emigrate <= current_people) {
                    figure_create_emigrant(b, to_emigrate);
                    to_emigrate = 0;
                } else {
                    figure_create_emigrant(b, current_people);
                    to_emigrate -= current_people
                }
            }
        }
    }
    return num_people - to_emigrate;
}
function calculate_working_population() {
    let num_plebs: number = 0;
    let num_patricians: number = 0;
    let total_houses: number = building_list_large_size();
    let houses: number[] = building_list_large_items();
    for (let i: number = 0; i < total_houses; i++) {
        let b: building = building_get(houses[i]);
        if (b.house_population > 0) {
            if (b.subtype.house_level >= HOUSE_SMALL_VILLA) {
                num_patricians += b.house_population
            } else {
                num_plebs += b.house_population
            }
        }
    }
    city_labor_calculate_workers(num_plebs, num_patricians);
}
export function house_population_update_migration() {
    city_migration_update();
    city_population_yearly_update();
    calculate_working_population();
    let population: number = city_population();
    if (population >= 500 && city_message_mark_population_shown(500)) {
        city_message_post(true, MESSAGE_POPULATION_500, 0, 0);
    }
    if (population >= 1000 && city_message_mark_population_shown(1000)) {
        city_message_post(true, MESSAGE_POPULATION_1000, 0, 0);
    }
    if (population >= 2000 && city_message_mark_population_shown(2000)) {
        city_message_post(true, MESSAGE_POPULATION_2000, 0, 0);
    }
    if (population >= 3000 && city_message_mark_population_shown(3000)) {
        city_message_post(true, MESSAGE_POPULATION_3000, 0, 0);
    }
    if (population >= 5000 && city_message_mark_population_shown(5000)) {
        city_message_post(true, MESSAGE_POPULATION_5000, 0, 0);
    }
    if (population >= 10000 && city_message_mark_population_shown(10000)) {
        city_message_post(true, MESSAGE_POPULATION_10000, 0, 0);
    }
    if (population >= 15000 && city_message_mark_population_shown(15000)) {
        city_message_post(true, MESSAGE_POPULATION_15000, 0, 0);
    }
    if (population >= 20000 && city_message_mark_population_shown(20000)) {
        city_message_post(true, MESSAGE_POPULATION_20000, 0, 0);
    }
    if (population >= 25000 && city_message_mark_population_shown(25000)) {
        city_message_post(true, MESSAGE_POPULATION_25000, 0, 0);
    }
}
export function house_population_evict_overcrowded() {
    let size: number = building_list_large_size();
    let items: number[] = building_list_large_items();
    for (let i: number = 0; i < size; i++) {
        let b: building = building_get(items[i]);
        if (b.house_population_room < 0) {
            let num_people_to_evict: number = -b.house_population_room;
            figure_create_homeless(b.x, b.y, num_people_to_evict);
            if (num_people_to_evict < b.house_population) {
                b.house_population -= num_people_to_evict
            } else {
                b.state = BUILDING_STATE_UNDO;
            }
        }
    }
}
