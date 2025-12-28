import { building, building_get, MAX_BUILDINGS } from 'building/building';
import { house_population_add_to_city, house_population_remove_from_city } from 'building/house_population';
import { building_state, house_level } from 'building/type';
import { calc_adjust_with_percentage } from 'core/calc';
import { config_get, config_key } from 'core/config';
import { random_from_pool } from 'core/random';
import { resource_type } from 'game/resource';
import { city_data_t } from './data_private';
import HOUSE_LARGE_TENT = house_level.HOUSE_LARGE_TENT;
import HOUSE_LARGE_SHACK = house_level.HOUSE_LARGE_SHACK;
import HOUSE_LARGE_INSULA = house_level.HOUSE_LARGE_INSULA;
import HOUSE_SMALL_VILLA = house_level.HOUSE_SMALL_VILLA;
import BUILDING_STATE_UNUSED = building_state.BUILDING_STATE_UNUSED;
import BUILDING_STATE_UNDO = building_state.BUILDING_STATE_UNDO;
import BUILDING_STATE_DELETED_BY_GAME = building_state.BUILDING_STATE_DELETED_BY_GAME;
import BUILDING_STATE_DELETED_BY_PLAYER = building_state.BUILDING_STATE_DELETED_BY_PLAYER;;
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
import RESOURCE_MAX_FOOD = resource_type.RESOURCE_MAX_FOOD;
export let city_data: city_data_t = new city_data_t();
import CONFIG_GP_FIX_100_YEAR_GHOSTS = config_key.CONFIG_GP_FIX_100_YEAR_GHOSTS;
let BIRTHS_PER_AGE_DECENNIUM: number[] = new Array(10).fill([
    0, 3, 16, 9, 2, 0, 0, 0, 0, 0
]);
let DEATHS_PER_HEALTH_PER_AGE_DECENNIUM: number[] = new Array(11).fill([
    [20, 10, 5, 10, 20, 30, 50, 85, 100, 100],
    [15, 8, 4, 8, 16, 25, 45, 70, 90, 100],
    [10, 6, 2, 6, 12, 20, 30, 55, 80, 90],
    [5, 4, 0, 4, 8, 15, 25, 40, 65, 80],
    [3, 2, 0, 2, 6, 12, 20, 30, 50, 70],
    [2, 0, 0, 0, 4, 8, 15, 25, 40, 60],
    [1, 0, 0, 0, 2, 6, 12, 20, 30, 50],
    [0, 0, 0, 0, 0, 4, 8, 15, 20, 40],
    [0, 0, 0, 0, 0, 2, 6, 10, 15, 30],
    [0, 0, 0, 0, 0, 0, 4, 5, 10, 20],
    [0, 0, 0, 0, 0, 0, 0, 2, 5, 1]
]);
export function city_population() {
    return city_data.population.population;
}
export function city_population_school_age() {
    return city_data.population.school_age;
}
export function city_population_academy_age() {
    return city_data.population.academy_age;
}
export function city_population_last_used_house_add() {
    return city_data.population.last_used_house_add;
}
export function city_population_set_last_used_house_add(building_id: number) {
    city_data.population.last_used_house_add = building_id;
}
export function city_population_last_used_house_remove() {
    return city_data.population.last_used_house_remove;
}
export function city_population_set_last_used_house_remove(building_id: number) {
    city_data.population.last_used_house_remove = building_id;
}
export function city_population_clear_capacity() {
    city_data.population.total_capacity = 0;
    city_data.population.room_in_houses = 0;
}
export function city_population_add_capacity(people_in_house: number, max_people: number) {
    city_data.population.total_capacity += max_people
    city_data.population.room_in_houses += max_people - people_in_house
}
function recalculate_population() {
    city_data.population.population = 0;
    for (let i: number = 0; i < 100; i++) {
        city_data.population.population += city_data.population.at_age[i]
    }
    if (city_data.population.population > city_data.population.highest_ever) {
        city_data.population.highest_ever = city_data.population.population;
    }
}
function add_to_census(num_people: number) {
    let odd: number = 0;
    let index: number = 0;
    for (let i: number = 0; i < num_people; i++, odd = 1 - odd) {
        let age: number = random_from_pool(index++) & 0x3f;
        if (age > 50) {
            age -= 30
        } else if (age < 10 && odd) {
            age += 20
        }
        city_data.population.at_age[age]++;
    }
}
function remove_from_census(num_people: number) {
    let index: number = 0;
    let empty_buckets: number = 0;
    while (num_people > 0 && empty_buckets < 100) {
        let age: number = random_from_pool(index++) & 0x3f;
        if (city_data.population.at_age[age] <= 0) {
            empty_buckets++;
        } else {
            city_data.population.at_age[age]--;
            num_people--;
            empty_buckets = 0;
        }
    }
    empty_buckets = 0;
    let age: number = 10;
    while (num_people > 0 && empty_buckets < 100) {
        if (city_data.population.at_age[age] <= 0) {
            empty_buckets++;
        } else {
            city_data.population.at_age[age]--;
            num_people--;
            empty_buckets = 0;
        }
        age++;
        if (age >= 100) {
            age = 0;
        }
    }
}
function remove_from_census_in_age_decennium(decennium: number, num_people: number) {
    let empty_buckets: number = 0;
    let age: number = 0;
    while (num_people > 0 && empty_buckets < 10) {
        if (city_data.population.at_age[10 * decennium + age] <= 0) {
            empty_buckets++;
        } else {
            city_data.population.at_age[10 * decennium + age]--;
            num_people--;
            empty_buckets = 0;
        }
        age++;
        if (age >= 10) {
            age = 0;
        }
    }
}
function get_people_in_age_decennium(decennium: number) {
    let pop: number = 0;
    for (let i: number = 0; i < 10; i++) {
        pop += city_data.population.at_age[10 * decennium + i]
    }
    return pop;
}
export function city_population_add(num_people: number) {
    city_data.population.last_change = num_people;
    add_to_census(num_people);
    recalculate_population();
}
export function city_population_remove(num_people: number) {
    city_data.population.last_change = -num_people;
    remove_from_census(num_people);
    recalculate_population();
}
export function city_population_add_homeless(num_people: number) {
    city_data.population.lost_homeless -= num_people
    add_to_census(num_people);
    recalculate_population();
}
export function city_population_remove_homeless(num_people: number) {
    city_data.population.lost_homeless += num_people
    remove_from_census(num_people);
    recalculate_population();
}
export function city_population_remove_home_removed(num_people: number) {
    city_data.population.lost_removal += num_people
    remove_from_census(num_people);
    recalculate_population();
}
export function city_population_remove_for_troop_request(num_people: number) {
    let removed: number = house_population_remove_from_city(num_people);
    remove_from_census(removed);
    city_data.population.lost_troop_request += num_people
    recalculate_population();
}
export function city_population_people_of_working_age() {
    return get_people_in_age_decennium(2) +
        get_people_in_age_decennium(3) +
        get_people_in_age_decennium(4);
}
function get_people_aged_between(min: number, max: number) {
    let pop: number = 0;
    for (let i: number = min; i < max; i++) {
        pop += city_data.population.at_age[i]
    }
    return pop;
}
export function city_population_calculate_educational_age() {
    city_data.population.school_age = get_people_aged_between(0, 14);
    city_data.population.academy_age = get_people_aged_between(14, 21);
}
export function city_population_record_monthly() {
    city_data.population.monthly.values[city_data.population.monthly.next_index++] = city_data.population.population;
    if (city_data.population.monthly.next_index >= 2400) {
        city_data.population.monthly.next_index = 0;
    }
    ++city_data.population.monthly.count;
}
export function city_population_monthly_count() {
    return city_data.population.monthly.count;
}
export function city_population_at_month(max_months: number, month: number) {
    let start_offset: number = 0;
    if (city_data.population.monthly.count > max_months) {
        start_offset = city_data.population.monthly.count + 2400 - max_months;
    }
    let index: number = (start_offset + month) % 2400;
    return city_data.population.monthly.values[index];
}
export function city_population_at_age(age: number) {
    return city_data.population.at_age[age];
}
export function city_population_at_level(house_level: number) {
    return city_data.population.at_level[house_level];
}
function yearly_advance_ages_and_calculate_deaths() {
    let aged100: number = city_data.population.at_age[99];
    for (let age: number = 99; age > 0; age--) {
        city_data.population.at_age[age] = city_data.population.at_age[age - 1];
    }
    city_data.population.at_age[0] = 0;
    city_data.population.yearly_deaths = 0;
    for (let decennium: number = 9; decennium >= 0; decennium--) {
        let people: number = get_people_in_age_decennium(decennium);
        let death_percentage: number = DEATHS_PER_HEALTH_PER_AGE_DECENNIUM[city_data.health.value / 10][decennium];
        let deaths: number = calc_adjust_with_percentage(people, death_percentage);
        let removed: number = house_population_remove_from_city(deaths + aged100);
        if (config_get(CONFIG_GP_FIX_100_YEAR_GHOSTS)) {
            remove_from_census_in_age_decennium(decennium, deaths);
        } else {
            remove_from_census_in_age_decennium(decennium, removed);
        }
        city_data.population.yearly_deaths += removed
        aged100 = 0;
    }
}
function yearly_calculate_births() {
    city_data.population.yearly_births = 0;
    for (let decennium: number = 9; decennium >= 0; decennium--) {
        let people: number = get_people_in_age_decennium(decennium);
        let births: number = calc_adjust_with_percentage(people, BIRTHS_PER_AGE_DECENNIUM[decennium]);
        let added: number = house_population_add_to_city(births);
        city_data.population.at_age[0] += added
        city_data.population.yearly_births += added
    }
}
function yearly_recalculate_population() {
    city_data.population.yearly_update_requested = 0;
    city_data.population.population_last_year = city_data.population.population;
    recalculate_population();
    city_data.population.lost_removal = 0;
    city_data.population.total_all_years += city_data.population.population
    city_data.population.total_years++;
    city_data.population.average_per_year = city_data.population.total_all_years / city_data.population.total_years;
}
function calculate_people_per_house_type() {
    city_data.population.people_in_tents_shacks = 0;
    city_data.population.people_in_villas_palaces = 0;
    city_data.population.people_in_tents = 0;
    city_data.population.people_in_large_insula_and_above = 0;
    let total: number = 0;
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state == BUILDING_STATE_UNUSED ||
            b.state == BUILDING_STATE_UNDO ||
            b.state == BUILDING_STATE_DELETED_BY_GAME ||
            b.state == BUILDING_STATE_DELETED_BY_PLAYER) {
            continue
        }
        if (b.house_size) {
            let pop: number = b.house_population;
            total += pop
            if (b.subtype.house_level <= HOUSE_LARGE_TENT) {
                city_data.population.people_in_tents += pop
            }
            if (b.subtype.house_level <= HOUSE_LARGE_SHACK) {
                city_data.population.people_in_tents_shacks += pop
            }
            if (b.subtype.house_level >= HOUSE_LARGE_INSULA) {
                city_data.population.people_in_large_insula_and_above += pop
            }
            if (b.subtype.house_level >= HOUSE_SMALL_VILLA) {
                city_data.population.people_in_villas_palaces += pop
            }
        }
    }
    return total;
}
export function city_population_request_yearly_update() {
    city_data.population.yearly_update_requested = 1;
    calculate_people_per_house_type();
}
export function city_population_yearly_update() {
    if (city_data.population.yearly_update_requested) {
        yearly_advance_ages_and_calculate_deaths();
        yearly_calculate_births();
        yearly_recalculate_population();
    }
}
export function city_population_check_consistency() {
    let people_in_houses: number = calculate_people_per_house_type();
    if (people_in_houses < city_data.population.population) {
        remove_from_census(city_data.population.population - people_in_houses);
    }
}
export function city_population_graph_order() {
    return city_data.population.graph_order;
}
export function city_population_set_graph_order(order: number) {
    city_data.population.graph_order = order;
}
