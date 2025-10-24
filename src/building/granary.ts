export const ONE_LOAD = 100;
export const UNITS_PER_LOAD = 100;
export const MAX_GRANARIES = 100;
import { building, building_get, MAX_BUILDINGS } from 'building/building';
import { building_destroy_by_fire } from 'building/destruction';
import { model_get_building } from 'building/model';
import { building_storage, building_storage_get, building_storage_state } from 'building/storage';
import { building_state, building_type } from 'building/type';
import { building_warehouse_get_amount, building_warehouse_remove_resource_curse } from 'building/warehouse';
import { city_message_disable_sound_for_next_message, city_message_post, city_message_type } from 'city/message';
import { city_resource_add_produced_to_granary, city_resource_is_stockpiled, city_resource_remove_from_granary } from 'city/resource';
import { calc_distance_with_penalty, calc_percentage } from 'core/calc';
import { resource_is_food, resource_type } from 'game/resource';
import { map_point, map_point_store_result } from 'map/point';
import { map_routing_update_land } from 'map/routing_terrain';
import { scenario_property_rome_supplies_wheat } from 'scenario/property';
import { sound_effect, sound_effect_play } from 'sound/effect';
import { Ref } from '../../ext/crt';
export const INFINITE = 10000;
export const CURSE_LOADS = 16;
import BUILDING_GRANARY = building_type.BUILDING_GRANARY;
import BUILDING_WAREHOUSE = building_type.BUILDING_WAREHOUSE;
import BUILDING_STATE_IN_USE = building_state.BUILDING_STATE_IN_USE;;
export const enum granary_task {
    GRANARY_TASK_NONE = -1,
    GRANARY_TASK_GETTING = 0
};
import GRANARY_TASK_NONE = granary_task.GRANARY_TASK_NONE;
import GRANARY_TASK_GETTING = granary_task.GRANARY_TASK_GETTING;
import RESOURCE_NONE = resource_type.RESOURCE_NONE;
import RESOURCE_WHEAT = resource_type.RESOURCE_WHEAT;
import RESOURCE_VEGETABLES = resource_type.RESOURCE_VEGETABLES;
import RESOURCE_FRUIT = resource_type.RESOURCE_FRUIT;
import RESOURCE_MEAT = resource_type.RESOURCE_MEAT;
import RESOURCE_MIN = resource_type.RESOURCE_MIN;
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
import RESOURCE_MIN_FOOD = resource_type.RESOURCE_MIN_FOOD;
import RESOURCE_MAX_FOOD = resource_type.RESOURCE_MAX_FOOD;
import BUILDING_STORAGE_STATE_NOT_ACCEPTING = building_storage_state.BUILDING_STORAGE_STATE_NOT_ACCEPTING;
import BUILDING_STORAGE_STATE_GETTING = building_storage_state.BUILDING_STORAGE_STATE_GETTING;
import MESSAGE_FIRE = city_message_type.MESSAGE_FIRE;
import SOUND_EFFECT_EXPLOSION = sound_effect.SOUND_EFFECT_EXPLOSION;
export class unnamed20_8 {
    public building_ids: number[] = new Array(MAX_GRANARIES).fill(0);
    public num_items: number = 0;
    public total_storage_wheat: number = 0;
    public total_storage_vegetables: number = 0;
    public total_storage_fruit: number = 0;
    public total_storage_meat: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.building_ids = args[0]);
        args.length >= 2 && (this.num_items = args[1]);
        args.length >= 3 && (this.total_storage_wheat = args[2]);
        args.length >= 4 && (this.total_storage_vegetables = args[3]);
        args.length >= 5 && (this.total_storage_fruit = args[4]);
        args.length >= 6 && (this.total_storage_meat = args[5]);
    }
}
let non_getting_granaries: unnamed20_8 = new unnamed20_8();
function get_amount(granary: building, resource: number) {
    if (!resource_is_food(resource)) {
        return 0;
    }
    if (granary.type != BUILDING_GRANARY) {
        return 0;
    }
    return granary.data.granary.resource_stored[resource];
}
export function building_granary_add_resource(granary: building, resource: number, is_produced: number) {
    if (granary.id <= 0) {
        return 1;
    }
    if (!resource_is_food(resource)) {
        return 0;
    }
    if (granary.type != BUILDING_GRANARY) {
        return 0;
    }
    if (granary.data.granary.resource_stored[RESOURCE_NONE] <= 0) {
        return 0;
    }
    if (is_produced) {
        city_resource_add_produced_to_granary(ONE_LOAD);
    }
    if (granary.data.granary.resource_stored[RESOURCE_NONE] <= ONE_LOAD) {
        granary.data.granary.resource_stored[resource] += granary.data.granary.resource_stored[RESOURCE_NONE]
        granary.data.granary.resource_stored[RESOURCE_NONE] = 0;
    } else {
        granary.data.granary.resource_stored[resource] += ONE_LOAD
        granary.data.granary.resource_stored[RESOURCE_NONE] -= ONE_LOAD
    }
    return 1;
}
export function building_granary_remove_resource(granary: building, resource: number, amount: number) {
    if (amount <= 0) {
        return 0;
    }
    let removed: number;
    if (granary.data.granary.resource_stored[resource] >= amount) {
        removed = amount;
    } else {
        removed = granary.data.granary.resource_stored[resource];
    }
    city_resource_remove_from_granary(resource, removed);
    granary.data.granary.resource_stored[resource] -= removed
    granary.data.granary.resource_stored[RESOURCE_NONE] += removed
    return amount - removed;
}
export function building_granary_remove_for_getting_deliveryman(src: building, dst: building, resource: Ref<number>) {
    let s_src: building_storage = building_storage_get(src.storage_id);
    let s_dst: building_storage = building_storage_get(dst.storage_id);
    let max_amount: number = 0;
    let max_resource: number = 0;
    if (s_dst.resource_state[RESOURCE_WHEAT] == BUILDING_STORAGE_STATE_GETTING &&
        s_src.resource_state[RESOURCE_WHEAT] != BUILDING_STORAGE_STATE_GETTING) {
        if (src.data.granary.resource_stored[RESOURCE_WHEAT] > max_amount) {
            max_amount = src.data.granary.resource_stored[RESOURCE_WHEAT];
            max_resource = RESOURCE_WHEAT;
        }
    }
    if (s_dst.resource_state[RESOURCE_VEGETABLES] == BUILDING_STORAGE_STATE_GETTING &&
        s_src.resource_state[RESOURCE_VEGETABLES] != BUILDING_STORAGE_STATE_GETTING) {
        if (src.data.granary.resource_stored[RESOURCE_VEGETABLES] > max_amount) {
            max_amount = src.data.granary.resource_stored[RESOURCE_VEGETABLES];
            max_resource = RESOURCE_VEGETABLES;
        }
    }
    if (s_dst.resource_state[RESOURCE_FRUIT] == BUILDING_STORAGE_STATE_GETTING &&
        s_src.resource_state[RESOURCE_FRUIT] != BUILDING_STORAGE_STATE_GETTING) {
        if (src.data.granary.resource_stored[RESOURCE_FRUIT] > max_amount) {
            max_amount = src.data.granary.resource_stored[RESOURCE_FRUIT];
            max_resource = RESOURCE_FRUIT;
        }
    }
    if (s_dst.resource_state[RESOURCE_MEAT] == BUILDING_STORAGE_STATE_GETTING &&
        s_src.resource_state[RESOURCE_MEAT] != BUILDING_STORAGE_STATE_GETTING) {
        if (src.data.granary.resource_stored[RESOURCE_MEAT] > max_amount) {
            max_amount = src.data.granary.resource_stored[RESOURCE_MEAT];
            max_resource = RESOURCE_MEAT;
        }
    }
    if (max_amount > 800) {
        max_amount = 800;
    }
    if (max_amount > dst.data.granary.resource_stored[RESOURCE_NONE]) {
        max_amount = dst.data.granary.resource_stored[RESOURCE_NONE];
    }
    building_granary_remove_resource(src, max_resource, max_amount);
    resource.v = max_resource;
    return max_amount / UNITS_PER_LOAD;
}
export function building_granary_determine_worker_task(granary: building) {
    let pct_workers: number = calc_percentage(granary.num_workers, model_get_building(granary.type).laborers);
    if (pct_workers < 50) {
        return GRANARY_TASK_NONE;
    }
    let s: building_storage = building_storage_get(granary.storage_id);
    if (s.empty_all) {
        for (let i: number = RESOURCE_MIN_FOOD; i < RESOURCE_MAX_FOOD; i++) {
            if (granary.data.granary.resource_stored[i]) {
                return i;
            }
        }
        return GRANARY_TASK_NONE;
    }
    if (granary.data.granary.resource_stored[RESOURCE_NONE] <= 0) {
        return GRANARY_TASK_NONE;
    }
    if (s.resource_state[RESOURCE_WHEAT] == BUILDING_STORAGE_STATE_GETTING
        && non_getting_granaries.total_storage_wheat > ONE_LOAD) {
        return GRANARY_TASK_GETTING;
    }
    if (s.resource_state[RESOURCE_VEGETABLES] == BUILDING_STORAGE_STATE_GETTING
        && non_getting_granaries.total_storage_vegetables > ONE_LOAD) {
        return GRANARY_TASK_GETTING;
    }
    if (s.resource_state[RESOURCE_FRUIT] == BUILDING_STORAGE_STATE_GETTING
        && non_getting_granaries.total_storage_fruit > ONE_LOAD) {
        return GRANARY_TASK_GETTING;
    }
    if (s.resource_state[RESOURCE_MEAT] == BUILDING_STORAGE_STATE_GETTING
        && non_getting_granaries.total_storage_meat > ONE_LOAD) {
        return GRANARY_TASK_GETTING;
    }
    return GRANARY_TASK_NONE;
}
export function building_granaries_calculate_stocks() {
    non_getting_granaries.num_items = 0;
    for (let i: number = 0; i < MAX_GRANARIES; i++) {
        non_getting_granaries.building_ids[i] = 0;
    }
    non_getting_granaries.total_storage_wheat = 0;
    non_getting_granaries.total_storage_vegetables = 0;
    non_getting_granaries.total_storage_fruit = 0;
    non_getting_granaries.total_storage_meat = 0;
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state != BUILDING_STATE_IN_USE || b.type != BUILDING_GRANARY) {
            continue
        }
        if (!b.has_road_access || b.distance_from_entry <= 0) {
            continue
        }
        let s: building_storage = building_storage_get(b.storage_id);
        let total_non_getting: number = 0;
        if (s.resource_state[RESOURCE_WHEAT] != BUILDING_STORAGE_STATE_GETTING) {
            total_non_getting += b.data.granary.resource_stored[RESOURCE_WHEAT]
            non_getting_granaries.total_storage_wheat += b.data.granary.resource_stored[RESOURCE_WHEAT]
        }
        if (s.resource_state[RESOURCE_VEGETABLES] != BUILDING_STORAGE_STATE_GETTING) {
            total_non_getting += b.data.granary.resource_stored[RESOURCE_VEGETABLES]
            non_getting_granaries.total_storage_vegetables += b.data.granary.resource_stored[RESOURCE_VEGETABLES]
        }
        if (s.resource_state[RESOURCE_FRUIT] != BUILDING_STORAGE_STATE_GETTING) {
            total_non_getting += b.data.granary.resource_stored[RESOURCE_FRUIT]
            non_getting_granaries.total_storage_fruit += b.data.granary.resource_stored[RESOURCE_FRUIT]
        }
        if (s.resource_state[RESOURCE_MEAT] != BUILDING_STORAGE_STATE_GETTING) {
            total_non_getting += b.data.granary.resource_stored[RESOURCE_MEAT]
            non_getting_granaries.total_storage_meat += b.data.granary.resource_stored[RESOURCE_MEAT]
        }
        if (total_non_getting > ONE_LOAD) {
            non_getting_granaries.building_ids[non_getting_granaries.num_items] = i;
            if (non_getting_granaries.num_items < MAX_GRANARIES - 2) {
                non_getting_granaries.num_items++;
            }
        }
    }
}
export function building_granary_for_storing(x: number, y: number, resource: number, distance_from_entry: number, road_network_id: number, force_on_stockpile: number, understaffed: Ref<number>, dst: map_point) {
    if (scenario_property_rome_supplies_wheat()) {
        return 0;
    }
    if (!resource_is_food(resource)) {
        return 0;
    }
    if (city_resource_is_stockpiled(resource) && !force_on_stockpile) {
        return 0;
    }
    let min_dist: number = INFINITE;
    let min_building_id: number = 0;
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state != BUILDING_STATE_IN_USE || b.type != BUILDING_GRANARY) {
            continue
        }
        if (!b.has_road_access || b.distance_from_entry <= 0 || b.road_network_id != road_network_id) {
            continue
        }
        let pct_workers: number = calc_percentage(b.num_workers, model_get_building(b.type).laborers);
        if (pct_workers < 100) {
            if (understaffed) {
                understaffed.v += 1;
            }
            continue
        }
        let s: building_storage = building_storage_get(b.storage_id);
        if (s.resource_state[resource] == BUILDING_STORAGE_STATE_NOT_ACCEPTING || s.empty_all) {
            continue
        }
        if (b.data.granary.resource_stored[RESOURCE_NONE] >= ONE_LOAD) {
            let dist: number = calc_distance_with_penalty(
                b.x + 1, b.y + 1, x, y, distance_from_entry, b.distance_from_entry);
            if (dist < min_dist) {
                min_dist = dist;
                min_building_id = i;
            }
        }
    }
    let min: building = building_get(min_building_id);
    map_point_store_result(min.x + 1, min.y + 1, dst);
    return min_building_id;
}
export function building_getting_granary_for_storing(x: number, y: number, resource: number, distance_from_entry: number, road_network_id: number, dst: map_point) {
    if (scenario_property_rome_supplies_wheat()) {
        return 0;
    }
    if (!resource_is_food(resource)) {
        return 0;
    }
    if (city_resource_is_stockpiled(resource)) {
        return 0;
    }
    let min_dist: number = INFINITE;
    let min_building_id: number = 0;
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state != BUILDING_STATE_IN_USE || b.type != BUILDING_GRANARY) {
            continue
        }
        if (!b.has_road_access || b.distance_from_entry <= 0 || b.road_network_id != road_network_id) {
            continue
        }
        let pct_workers: number = calc_percentage(b.num_workers, model_get_building(b.type).laborers);
        if (pct_workers < 100) {
            continue
        }
        let s: building_storage = building_storage_get(b.storage_id);
        if (s.resource_state[resource] != BUILDING_STORAGE_STATE_GETTING || s.empty_all) {
            continue
        }
        if (b.data.granary.resource_stored[RESOURCE_NONE] > ONE_LOAD) {
            let dist: number = calc_distance_with_penalty(
                b.x + 1, b.y + 1, x, y, distance_from_entry, b.distance_from_entry);
            if (dist < min_dist) {
                min_dist = dist;
                min_building_id = i;
            }
        }
    }
    let min: building = building_get(min_building_id);
    map_point_store_result(min.x + 1, min.y + 1, dst);
    return min_building_id;
}
export function building_granary_for_getting(src: building, dst: map_point) {
    let s_src: building_storage = building_storage_get(src.storage_id);
    if (s_src.empty_all) {
        return 0;
    }
    if (scenario_property_rome_supplies_wheat()) {
        return 0;
    }
    let is_getting: number = 0;
    if (s_src.resource_state[RESOURCE_WHEAT] == BUILDING_STORAGE_STATE_GETTING ||
        s_src.resource_state[RESOURCE_VEGETABLES] == BUILDING_STORAGE_STATE_GETTING ||
        s_src.resource_state[RESOURCE_FRUIT] == BUILDING_STORAGE_STATE_GETTING ||
        s_src.resource_state[RESOURCE_MEAT] == BUILDING_STORAGE_STATE_GETTING) {
        is_getting = 1;
    }
    if (is_getting <= 0) {
        return 0;
    }
    let min_dist: number = INFINITE;
    let min_building_id: number = 0;
    for (let i: number = 0; i < non_getting_granaries.num_items; i++) {
        let b: building = building_get(non_getting_granaries.building_ids[i]);
        if (b.road_network_id != src.road_network_id) {
            continue
        }
        let s: building_storage = building_storage_get(b.storage_id);
        let amount_gettable: number = 0;
        if (s_src.resource_state[RESOURCE_WHEAT] == BUILDING_STORAGE_STATE_GETTING &&
            s.resource_state[RESOURCE_WHEAT] != BUILDING_STORAGE_STATE_GETTING) {
            amount_gettable += b.data.granary.resource_stored[RESOURCE_WHEAT]
        }
        if (s_src.resource_state[RESOURCE_VEGETABLES] == BUILDING_STORAGE_STATE_GETTING &&
            s.resource_state[RESOURCE_VEGETABLES] != BUILDING_STORAGE_STATE_GETTING) {
            amount_gettable += b.data.granary.resource_stored[RESOURCE_VEGETABLES]
        }
        if (s_src.resource_state[RESOURCE_FRUIT] == BUILDING_STORAGE_STATE_GETTING &&
            s.resource_state[RESOURCE_FRUIT] != BUILDING_STORAGE_STATE_GETTING) {
            amount_gettable += b.data.granary.resource_stored[RESOURCE_FRUIT]
        }
        if (s_src.resource_state[RESOURCE_MEAT] == BUILDING_STORAGE_STATE_GETTING &&
            s.resource_state[RESOURCE_MEAT] != BUILDING_STORAGE_STATE_GETTING) {
            amount_gettable += b.data.granary.resource_stored[RESOURCE_MEAT]
        }
        if (amount_gettable > 0) {
            let dist: number = calc_distance_with_penalty(
                b.x + 1, b.y + 1,
                src.x + 1, src.x + 1, // BUG passing src.x twice is a bug in original C3
                src.distance_from_entry, b.distance_from_entry);
            if (amount_gettable <= 400) {
                dist *= 2
            }
            if (dist < min_dist) {
                min_dist = dist;
                min_building_id = b.id;
            }
        }
    }
    let min: building = building_get(min_building_id);
    map_point_store_result(min.x + 1, min.y + 1, dst);
    return min_building_id;
}
export function building_granary_bless() {
    let min_stored: number = INFINITE;
    let min_building: building = null;
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state != BUILDING_STATE_IN_USE || b.type != BUILDING_GRANARY) {
            continue
        }
        let total_stored: number = 0;
        for (let r: number = RESOURCE_MIN_FOOD; r < RESOURCE_MAX_FOOD; r++) {
            total_stored += get_amount(b, r)
        }
        if (total_stored < min_stored) {
            min_stored = total_stored;
            min_building = b;
        }
    }
    if (min_building) {
        for (let n: number = 0; n < 6; n++) {
            building_granary_add_resource(min_building, RESOURCE_WHEAT, 0);
        }
        for (let n: number = 0; n < 6; n++) {
            building_granary_add_resource(min_building, RESOURCE_VEGETABLES, 0);
        }
        for (let n: number = 0; n < 6; n++) {
            building_granary_add_resource(min_building, RESOURCE_FRUIT, 0);
        }
        for (let n: number = 0; n < 6; n++) {
            building_granary_add_resource(min_building, RESOURCE_MEAT, 0);
        }
    }
}
export function building_granary_warehouse_curse(big: number) {
    let max_stored: number = 0;
    let max_building: building = null;
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state != BUILDING_STATE_IN_USE) {
            continue
        }
        let total_stored: number = 0;
        if (b.type == BUILDING_WAREHOUSE) {
            for (let r: number = RESOURCE_MIN; r < RESOURCE_MAX; r++) {
                total_stored += building_warehouse_get_amount(b, r)
            }
        } else if (b.type == BUILDING_GRANARY) {
            for (let r: number = RESOURCE_MIN_FOOD; r < RESOURCE_MAX_FOOD; r++) {
                total_stored += get_amount(b, r)
            }
            total_stored /= UNITS_PER_LOAD
        } else {
            continue
        }
        if (total_stored > max_stored) {
            max_stored = total_stored;
            max_building = b;
        }
    }
    if (!max_building) {
        return;
    }
    if (big) {
        city_message_disable_sound_for_next_message();
        city_message_post(0, MESSAGE_FIRE, max_building.type, max_building.grid_offset);
        building_destroy_by_fire(max_building);
        sound_effect_play(SOUND_EFFECT_EXPLOSION);
        map_routing_update_land();
    } else {
        if (max_building.type == BUILDING_WAREHOUSE) {
            building_warehouse_remove_resource_curse(max_building, CURSE_LOADS);
        } else if (max_building.type == BUILDING_GRANARY) {
            let amount: number = building_granary_remove_resource(max_building, RESOURCE_WHEAT, CURSE_LOADS * UNITS_PER_LOAD);
            amount = building_granary_remove_resource(max_building, RESOURCE_VEGETABLES, amount);
            amount = building_granary_remove_resource(max_building, RESOURCE_FRUIT, amount);
            building_granary_remove_resource(max_building, RESOURCE_MEAT, amount);
        }
    }
}
