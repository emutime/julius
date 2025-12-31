export const MAX_CATS = 10;
import { building, building_get, MAX_BUILDINGS } from 'building/building';
import { model_get_building } from 'building/model';
import { building_state, building_type } from 'building/type';
import { city_data_t } from 'city/data_private';
import { city_message_post_with_message_delay, city_message_type, message_category } from 'city/message';
import { city_population_people_of_working_age } from 'city/population';
import { calc_adjust_with_percentage, calc_bound, calc_percentage } from 'core/calc';
import { random_byte_alt } from 'core/random';
import { resource_type } from 'game/resource';
import { game_time_year } from 'game/time';
import { scenario_property_start_year } from 'scenario/property';
export class labor_category_data {
    public workers_needed: number = 0;
    public workers_allocated: number = 0;
    public buildings: number = 0;
    public priority: number = 0;
    public total_houses_covered: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.workers_needed = args[0]);
        args.length >= 2 && (this.workers_allocated = args[1]);
        args.length >= 3 && (this.buildings = args[2]);
        args.length >= 4 && (this.priority = args[3]);
        args.length >= 5 && (this.total_houses_covered = args[4]);
    }
}
import BUILDING_HIPPODROME = building_type.BUILDING_HIPPODROME;
import BUILDING_WHEAT_FARM = building_type.BUILDING_WHEAT_FARM;
import BUILDING_POTTERY_WORKSHOP = building_type.BUILDING_POTTERY_WORKSHOP;
import BUILDING_STATE_IN_USE = building_state.BUILDING_STATE_IN_USE;
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
import RESOURCE_MAX_FOOD = resource_type.RESOURCE_MAX_FOOD;
export let city_data: city_data_t = new city_data_t();
import MESSAGE_CAT_WORKERS_NEEDED = message_category.MESSAGE_CAT_WORKERS_NEEDED;
import MESSAGE_WORKERS_NEEDED = city_message_type.MESSAGE_WORKERS_NEEDED;
export const enum labor_category {
    LABOR_CATEGORY_INDUSTRY_COMMERCE = 0,
    LABOR_CATEGORY_FOOD_PRODUCTION = 1,
    LABOR_CATEGORY_ENGINEERING = 2,
    LABOR_CATEGORY_WATER = 3,
    LABOR_CATEGORY_PREFECTURES = 4,
    LABOR_CATEGORY_MILITARY = 5,
    LABOR_CATEGORY_ENTERTAINMENT = 6,
    LABOR_CATEGORY_HEALTH_EDUCATION = 7,
    LABOR_CATEGORY_GOVERNANCE_RELIGION = 8,
}

import LABOR_CATEGORY_INDUSTRY_COMMERCE = labor_category.LABOR_CATEGORY_INDUSTRY_COMMERCE
import LABOR_CATEGORY_FOOD_PRODUCTION = labor_category.LABOR_CATEGORY_INDUSTRY_COMMERCE
import LABOR_CATEGORY_ENGINEERING = labor_category.LABOR_CATEGORY_INDUSTRY_COMMERCE
import LABOR_CATEGORY_WATER = labor_category.LABOR_CATEGORY_INDUSTRY_COMMERCE
import LABOR_CATEGORY_PREFECTURES = labor_category.LABOR_CATEGORY_INDUSTRY_COMMERCE
import LABOR_CATEGORY_MILITARY = labor_category.LABOR_CATEGORY_INDUSTRY_COMMERCE
import LABOR_CATEGORY_ENTERTAINMENT = labor_category.LABOR_CATEGORY_INDUSTRY_COMMERCE
import LABOR_CATEGORY_HEALTH_EDUCATION = labor_category.LABOR_CATEGORY_INDUSTRY_COMMERCE
import LABOR_CATEGORY_GOVERNANCE_RELIGION = labor_category.LABOR_CATEGORY_INDUSTRY_COMMERCE

let CATEGORY_FOR_BUILDING_TYPE: number[] = [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, // 0
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, // 10
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, // 20
    6, 6, 6, 6, 6, 6, 6, 6, -1, -1, // 30
    -1, -1, -1, -1, -1, -1, 7, 7, 7, 7, // 40
    0, 7, 7, 7, -1, 4, -1, 5, 5, 5, // 50
    8, 8, 8, 8, 8, 8, 8, 8, 8, 8, // 60
    0, 1, 0, -1, 0, 0, 0, -1, -1, -1, // 70
    7, 2, -1, -1, 8, 8, 8, 8, -1, -1, // 80
    -1, 3, -1, -1, 5, 5, -1, -1, 8, -1, // 90
    1, 1, 1, 0, 0, 1, 0, 0, 0, 0, // 100
    0, 0, 0, 0, 0, -1, -1, -1, -1, -1, // 110
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1 // 120
];
export class unnamed43_8 {
    public category: labor_category = null;
    public workers: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.category = args[0]);
        args.length >= 2 && (this.workers = args[1]);
    }
}
let DEFAULT_PRIORITY: unnamed43_8[] = [
    { category: LABOR_CATEGORY_ENGINEERING, workers: 3 },
    { category: LABOR_CATEGORY_WATER, workers: 1 },
    { category: LABOR_CATEGORY_PREFECTURES, workers: 3 },
    { category: LABOR_CATEGORY_MILITARY, workers: 2 },
    { category: LABOR_CATEGORY_FOOD_PRODUCTION, workers: 4 },
    { category: LABOR_CATEGORY_INDUSTRY_COMMERCE, workers: 2 },
    { category: LABOR_CATEGORY_ENTERTAINMENT, workers: 1 },
    { category: LABOR_CATEGORY_HEALTH_EDUCATION, workers: 1 },
    { category: LABOR_CATEGORY_GOVERNANCE_RELIGION, workers: 1 }
];
export function city_labor_unemployment_percentage() {
    return city_data.labor.unemployment_percentage;
}
export function city_labor_unemployment_percentage_for_senate() {
    return city_data.labor.unemployment_percentage_for_senate;
}
export function city_labor_workers_needed() {
    return city_data.labor.workers_needed;
}
export function city_labor_workers_employed() {
    return city_data.labor.workers_employed;
}
export function city_labor_workers_unemployed() {
    return city_data.labor.workers_unemployed;
}
export function city_labor_wages() {
    return city_data.labor.wages;
}
export function city_labor_change_wages(amount: number) {
    city_data.labor.wages += amount
    city_data.labor.wages = calc_bound(city_data.labor.wages, 0, 100);
}
export function city_labor_wages_rome() {
    return city_data.labor.wages_rome;
}
export function city_labor_raise_wages_rome() {
    if (city_data.labor.wages_rome >= 45) {
        return 0;
    }
    city_data.labor.wages_rome += 1 + (random_byte_alt() & 3)
    if (city_data.labor.wages_rome > 45) {
        city_data.labor.wages_rome = 45;
    }
    return 1;
}
export function city_labor_lower_wages_rome() {
    if (city_data.labor.wages_rome <= 5) {
        return 0;
    }
    city_data.labor.wages_rome -= 1 + (random_byte_alt() & 3)
    return 1;
}
export function city_labor_category(category: number) {
    return city_data.labor.categories[category];
}
export function city_labor_calculate_workers(num_plebs: number, num_patricians: number) {
    city_data.population.percentage_plebs = calc_percentage(num_plebs, num_plebs + num_patricians);
    city_data.population.working_age = calc_adjust_with_percentage(city_population_people_of_working_age(), 60);
    city_data.labor.workers_available = calc_adjust_with_percentage(
        city_data.population.working_age, city_data.population.percentage_plebs);
}
function is_industry_disabled(b: building) {
    if (b.type < BUILDING_WHEAT_FARM || b.type > BUILDING_POTTERY_WORKSHOP) {
        return 0;
    }
    let resource: number = b.output_resource_id;
    if (city_data.resource.mothballed[resource]) {
        return 1;
    }
    return 0;
}
function should_have_workers(b: building, category: number, check_access: number) {
    if (category < 0) {
        return 0;
    }
    if (category == LABOR_CATEGORY_ENTERTAINMENT) {
        if (b.type == BUILDING_HIPPODROME && b.prev_part_building_id) {
            return 0;
        }
    } else if (category == LABOR_CATEGORY_FOOD_PRODUCTION || category == LABOR_CATEGORY_INDUSTRY_COMMERCE) {
        if (is_industry_disabled(b)) {
            return 0;
        }
    }
    if (category == LABOR_CATEGORY_ENGINEERING || category == LABOR_CATEGORY_WATER) {
        return 1;
    }
    if (check_access) {
        return b.houses_covered > 0 ? 1 : 0;
    }
    return 1;
}
function calculate_workers_needed_per_category() {
    for (let cat: number = 0; cat < MAX_CATS; cat++) {
        city_data.labor.categories[cat].buildings = 0;
        city_data.labor.categories[cat].total_houses_covered = 0;
        city_data.labor.categories[cat].workers_allocated = 0;
        city_data.labor.categories[cat].workers_needed = 0;
    }
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state != BUILDING_STATE_IN_USE) {
            continue
        }
        let category: number = CATEGORY_FOR_BUILDING_TYPE[b.type];
        b.labor_category = category;
        if (!should_have_workers(b, category, 1)) {
            continue
        }
        city_data.labor.categories[category].workers_needed += model_get_building(b.type).laborers
        city_data.labor.categories[category].total_houses_covered += b.houses_covered
        city_data.labor.categories[category].buildings++;
    }
}
function allocate_workers_to_categories() {
    let workers_needed: number = 0;
    for (let i: number = 0; i < MAX_CATS; i++) {
        city_data.labor.categories[i].workers_allocated = 0;
        workers_needed += city_data.labor.categories[i].workers_needed
    }
    city_data.labor.workers_needed = 0;
    if (workers_needed <= city_data.labor.workers_available) {
        for (let i: number = 0; i < MAX_CATS; i++) {
            city_data.labor.categories[i].workers_allocated = city_data.labor.categories[i].workers_needed;
        }
        city_data.labor.workers_employed = workers_needed;
    } else {
        let available: number = city_data.labor.workers_available;
        for (let p: number = 1; p <= 9 && available > 0; p++) {
            for (let c: number = 0; c < 9; c++) {
                if (p == city_data.labor.categories[c].priority) {
                    let to_allocate: number = city_data.labor.categories[c].workers_needed;
                    if (to_allocate > available) {
                        to_allocate = available;
                    }
                    city_data.labor.categories[c].workers_allocated = to_allocate;
                    available -= to_allocate
                    break
                }
            }
        }
        let guard: number = 0;
        do {
            guard++;
            if (guard >= city_data.labor.workers_available) {
                break;
            }
            for (let p = 0; p < 9; p++) {
                let cat = DEFAULT_PRIORITY[p].category;
                if (!city_data.labor.categories[cat].priority) {
                    let needed = city_data.labor.categories[cat].workers_needed
                        - city_data.labor.categories[cat].workers_allocated;
                    if (needed > 0) {
                        let to_allocate = DEFAULT_PRIORITY[p].workers;
                        if (to_allocate > available) {
                            to_allocate = available;
                        }
                        if (to_allocate > needed) {
                            to_allocate = needed;
                        }
                        city_data.labor.categories[cat].workers_allocated += to_allocate;
                        available -= to_allocate;
                        if (available <= 0) {
                            break;
                        }
                    }
                }
            }
        } while (available > 0)
        city_data.labor.workers_employed = city_data.labor.workers_available;
        for (let i: number = 0; i < 9; i++) {
            city_data.labor.workers_needed +=
                city_data.labor.categories[i].workers_needed - city_data.labor.categories[i].workers_allocated
        }
    }
    city_data.labor.workers_unemployed = city_data.labor.workers_available - city_data.labor.workers_employed;
    city_data.labor.unemployment_percentage =
        calc_percentage(city_data.labor.workers_unemployed, city_data.labor.workers_available);
}
function check_employment() {
    let orig_needed: number = city_data.labor.workers_needed;
    allocate_workers_to_categories();
    if (city_data.labor.unemployment_percentage < city_data.labor.unemployment_percentage_for_senate) {
        city_data.labor.unemployment_percentage_for_senate = city_data.labor.unemployment_percentage;
    } else if (city_data.labor.unemployment_percentage < city_data.labor.unemployment_percentage_for_senate + 5) {
        city_data.labor.unemployment_percentage_for_senate = city_data.labor.unemployment_percentage;
    } else {
        city_data.labor.unemployment_percentage_for_senate += 5
    }
    if (city_data.labor.unemployment_percentage_for_senate > 100) {
        city_data.labor.unemployment_percentage_for_senate = 100;
    }
    if (!orig_needed && city_data.labor.workers_needed > 0) {
        if (game_time_year() >= scenario_property_start_year()) {
            city_message_post_with_message_delay(MESSAGE_CAT_WORKERS_NEEDED, false, MESSAGE_WORKERS_NEEDED, 6);
        }
    }
}
function set_building_worker_weight() {
    let water_per_10k_per_building: number = calc_percentage(100, city_data.labor.categories[LABOR_CATEGORY_WATER].buildings);
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state != BUILDING_STATE_IN_USE) {
            continue
        }
        let cat: number = CATEGORY_FOR_BUILDING_TYPE[b.type];
        if (cat == LABOR_CATEGORY_WATER) {
            b.percentage_houses_covered = water_per_10k_per_building;
        } else if (cat >= 0) {
            b.percentage_houses_covered = 0;
            if (b.houses_covered) {
                b.percentage_houses_covered =
                    calc_percentage(100 * b.houses_covered,
                        city_data.labor.categories[cat].total_houses_covered);
            }
        }
    }
}
function allocate_workers_to_water() {
    let start_building_id: number = 1;
    let water_cat: labor_category_data = city_data.labor.categories[LABOR_CATEGORY_WATER];
    let percentage_not_filled: number = 100 - calc_percentage(water_cat.workers_allocated, water_cat.workers_needed);
    let buildings_to_skip: number = calc_adjust_with_percentage(water_cat.buildings, percentage_not_filled);
    let workers_per_building: number;
    if (buildings_to_skip == water_cat.buildings) {
        workers_per_building = 1;
    } else {
        workers_per_building = water_cat.workers_allocated / (water_cat.buildings - buildings_to_skip);
    }
    let building_id: number = start_building_id;
    start_building_id = 0;
    for (let guard: number = 1; guard < MAX_BUILDINGS; guard++, building_id++) {
        if (building_id >= MAX_BUILDINGS) {
            building_id = 1;
        }
        let b: building = building_get(building_id);
        if (b.state != BUILDING_STATE_IN_USE || CATEGORY_FOR_BUILDING_TYPE[b.type] != LABOR_CATEGORY_WATER) {
            continue
        }
        b.num_workers = 0;
        if (b.percentage_houses_covered > 0) {
            if (percentage_not_filled > 0) {
                if (buildings_to_skip) {
                    --buildings_to_skip;
                } else if (start_building_id) {
                    b.num_workers = workers_per_building;
                } else {
                    start_building_id = building_id;
                    b.num_workers = workers_per_building;
                }
            } else {
                b.num_workers = model_get_building(b.type).laborers;
            }
        }
    }
    if (!start_building_id) {
        start_building_id = 1;
    }
}
function allocate_workers_to_non_water_buildings() {
    let category_workers_needed: number[] = new Array(MAX_CATS).fill(0);
    let category_workers_allocated: number[] = new Array(MAX_CATS).fill(0);
    for (let i: number = 0; i < MAX_CATS; i++) {
        category_workers_allocated[i] = 0;
        category_workers_needed[i] =
            city_data.labor.categories[i].workers_allocated < city_data.labor.categories[i].workers_needed
                ? 1 : 0;
    }
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state != BUILDING_STATE_IN_USE) {
            continue
        }
        let cat: number = CATEGORY_FOR_BUILDING_TYPE[b.type];
        if (cat == LABOR_CATEGORY_WATER || cat < 0) {
            continue
        }
        b.num_workers = 0;
        if (!should_have_workers(b, cat, 0)) {
            continue
        }
        if (b.percentage_houses_covered > 0) {
            let required_workers: number = model_get_building(b.type).laborers;
            if (category_workers_needed[cat]) {
                let num_workers: number = calc_adjust_with_percentage(
                    city_data.labor.categories[cat].workers_allocated,
                    b.percentage_houses_covered) / 100;
                if (num_workers > required_workers) {
                    num_workers = required_workers;
                }
                b.num_workers = num_workers;
                category_workers_allocated[cat] += num_workers
            } else {
                b.num_workers = required_workers;
            }
        }
    }
    for (let i: number = 0; i < MAX_CATS; i++) {
        if (category_workers_needed[i]) {
            if (category_workers_allocated[i] >= city_data.labor.categories[i].workers_allocated) {
                category_workers_needed[i] = 0;
                category_workers_allocated[i] = 0;
            } else {
                category_workers_needed[i] =
                    city_data.labor.categories[i].workers_allocated - category_workers_allocated[i];
            }
        }
    }
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state != BUILDING_STATE_IN_USE) {
            continue
        }
        let cat: number = CATEGORY_FOR_BUILDING_TYPE[b.type];
        if (cat < 0 || cat == LABOR_CATEGORY_WATER || cat == LABOR_CATEGORY_MILITARY) {
            continue
        }
        if (!should_have_workers(b, cat, 0)) {
            continue
        }
        if (b.percentage_houses_covered > 0 && category_workers_needed[cat]) {
            let required_workers: number = model_get_building(b.type).laborers;
            if (b.num_workers < required_workers) {
                let needed: number = required_workers - b.num_workers;
                if (needed > category_workers_needed[cat]) {
                    b.num_workers += category_workers_needed[cat]
                    category_workers_needed[cat] = 0;
                } else {
                    b.num_workers += needed
                    category_workers_needed[cat] -= needed
                }
            }
        }
    }
}
function allocate_workers_to_buildings() {
    set_building_worker_weight();
    allocate_workers_to_water();
    allocate_workers_to_non_water_buildings();
}
export function city_labor_allocate_workers() {
    allocate_workers_to_categories();
    allocate_workers_to_buildings();
}
export function city_labor_update() {
    calculate_workers_needed_per_category();
    check_employment();
    allocate_workers_to_buildings();
}
export function city_labor_set_priority(category: number, new_priority: number) {
    let old_priority: number = city_data.labor.categories[category].priority;
    if (old_priority == new_priority) {
        return;
    }
    let shift: number;
    let from_prio: number;
    let to_prio: number;
    if (!old_priority && new_priority) {
        shift = 1;
        from_prio = new_priority;
        to_prio = 9;
    } else if (old_priority && !new_priority) {
        shift = -1;
        from_prio = old_priority;
        to_prio = 9;
    } else if (new_priority < old_priority) {
        shift = 1;
        from_prio = new_priority;
        to_prio = old_priority;
    } else {
        shift = -1;
        from_prio = old_priority;
        to_prio = new_priority;
    }
    city_data.labor.categories[category].priority = new_priority;
    for (let i: number = 0; i < 9; i++) {
        if (i == category) {
            continue
        }
        let current_priority: number = city_data.labor.categories[i].priority;
        if (from_prio <= current_priority && current_priority <= to_prio) {
            city_data.labor.categories[i].priority += shift
        }
    }
    city_labor_allocate_workers();
}
export function city_labor_max_selectable_priority(category: number) {
    let max: number = 0;
    for (let i: number = 0; i < 9; i++) {
        if (city_data.labor.categories[i].priority > 0) {
            ++max;
        }
    }
    if (max < 9 && !city_data.labor.categories[category].priority) {
        ++max;
    }
    return max;
}
