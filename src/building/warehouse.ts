import { MAX_BUILDINGS } from 'building/building';
import { building_type } from 'building/type';
import BUILDING_GRANARY = building_type.BUILDING_GRANARY;
import BUILDING_WAREHOUSE = building_type.BUILDING_WAREHOUSE;
import BUILDING_WAREHOUSE_SPACE = building_type.BUILDING_WAREHOUSE_SPACE;
import BUILDING_BARRACKS = building_type.BUILDING_BARRACKS;
import { building_type } from 'building/type';
import { house_level } from 'building/type';
import { building_state } from 'building/type';
import BUILDING_STATE_IN_USE = building_state.BUILDING_STATE_IN_USE;;
import { buffer } from 'core/buffer';
import { building } from 'building/building';
import { building_get } from 'building/building';
import { building_main } from 'building/building';
import { building_next } from 'building/building';
import { map_point } from 'map/point';
import { map_point_store_result } from 'map/point';
import { warehouse } from 'building/warehouse';
import WAREHOUSE_ROOM = warehouse.WAREHOUSE_ROOM;
import WAREHOUSE_FULL = warehouse.WAREHOUSE_FULL;
import WAREHOUSE_SOME_ROOM = warehouse.WAREHOUSE_SOME_ROOM;
import { warehouse_task } from 'building/warehouse';
import WAREHOUSE_TASK_NONE = warehouse_task.WAREHOUSE_TASK_NONE;
import WAREHOUSE_TASK_GETTING = warehouse_task.WAREHOUSE_TASK_GETTING;
import WAREHOUSE_TASK_DELIVERING = warehouse_task.WAREHOUSE_TASK_DELIVERING;
import { resource_type } from 'game/resource';
import RESOURCE_NONE = resource_type.RESOURCE_NONE;
import RESOURCE_WHEAT = resource_type.RESOURCE_WHEAT;
import RESOURCE_VEGETABLES = resource_type.RESOURCE_VEGETABLES;
import RESOURCE_FRUIT = resource_type.RESOURCE_FRUIT;
import RESOURCE_MEAT = resource_type.RESOURCE_MEAT;
import RESOURCE_WEAPONS = resource_type.RESOURCE_WEAPONS;
import RESOURCE_MIN = resource_type.RESOURCE_MIN;
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
import RESOURCE_MAX_FOOD = resource_type.RESOURCE_MAX_FOOD;
import { resource_type } from 'game/resource';
import { workshop_type } from 'game/resource';
import WORKSHOP_NONE = workshop_type.WORKSHOP_NONE;
import { workshop_type } from 'game/resource';
import { resource_image_type } from 'game/resource';
import RESOURCE_IMAGE_STORAGE = resource_image_type.RESOURCE_IMAGE_STORAGE;
import { resource_image_type } from 'game/resource';
import { resource_image_offset } from 'game/resource';
import { resource_to_workshop_type } from 'game/resource';
import { building_count_active } from 'building/count';
import { model_building } from 'building/model';
import { model_house } from 'building/model';
import { model_get_building } from 'building/model';
import { building_storage_state } from 'building/storage';
import BUILDING_STORAGE_STATE_NOT_ACCEPTING = building_storage_state.BUILDING_STORAGE_STATE_NOT_ACCEPTING;
import BUILDING_STORAGE_STATE_GETTING = building_storage_state.BUILDING_STORAGE_STATE_GETTING;
import { building_storage_state } from 'building/storage';
import { building_storage } from 'building/storage';
import { building_storage_get } from 'building/storage';
import { city_buildings_get_barracks } from 'city/buildings';
import { city_finance_process_import } from 'city/finance';
import { city_finance_process_export } from 'city/finance';
import { finance_overview } from 'city/finance';
import { city_military_has_legionary_legions } from 'city/military';
import { resource_trade_status } from 'city/constants';
import { resource_list } from 'city/resource';
import { city_resource_count } from 'city/resource';
import { city_resource_last_used_warehouse } from 'city/resource';
import { city_resource_set_last_used_warehouse } from 'city/resource';
import { city_resource_is_stockpiled } from 'city/resource';
import { city_resource_has_workshop_with_room } from 'city/resource';
import { city_resource_add_to_warehouse } from 'city/resource';
import { city_resource_remove_from_warehouse } from 'city/resource';
import { direction_type } from 'core/direction';
import { calc_percentage } from 'core/calc';
import { calc_distance_with_penalty } from 'core/calc';
import { language_type } from 'core/locale';
import { encoding_type } from 'core/encoding';
import { group_terrain } from 'core/image_group';
import GROUP_BUILDING_WAREHOUSE_STORAGE_EMPTY = group_terrain.GROUP_BUILDING_WAREHOUSE_STORAGE_EMPTY;
import GROUP_BUILDING_WAREHOUSE_STORAGE_FILLED = group_terrain.GROUP_BUILDING_WAREHOUSE_STORAGE_FILLED;
import { color_t } from 'graphics/color';
import { image } from 'core/image';
import { image_group } from 'core/image';
import { trade_price_buy } from 'empire/trade_prices';
import { trade_price_sell } from 'empire/trade_prices';
import { tutorial_availability } from 'game/tutorial';
import { tutorial_build_buttons } from 'game/tutorial';
import { tutorial_on_add_to_warehouse } from 'game/tutorial';
import { map_image_set } from 'map/image';
import { map_has_road_access } from 'map/road_access';
import { scenario_climate } from 'scenario/property';
import { scenario_property_rome_supplies_wheat } from 'scenario/property';
export function building_warehouse_get_space_info(warehouse: building) {
    let total_loads: number = 0;
    let empty_spaces: number = 0;
    let space: building = warehouse;
    for (let i: number = 0; i < 8; i++) {
        space = building_next(space);
        if (space.id <= 0) {
            return 0;
        }
        if (space.subtype.warehouse_resource_id) {
            total_loads += space.loads_stored
        } else {
            empty_spaces++;
        }
    }
    if (empty_spaces > 0) {
        return WAREHOUSE_ROOM;
    } else if (total_loads < 32) {
        return WAREHOUSE_SOME_ROOM;
    } else {
        return WAREHOUSE_FULL;
    }
}
export function building_warehouse_get_amount(warehouse: building, resource: number) {
    let loads: number = 0;
    let space: building = warehouse;
    for (let i: number = 0; i < 8; i++) {
        space = building_next(space);
        if (space.id <= 0) {
            return 0;
        }
        if (space.subtype.warehouse_resource_id && space.subtype.warehouse_resource_id == resource) {
            loads += space.loads_stored
        }
    }
    return loads;
}
export function building_warehouse_add_resource(b: building, resource: number) {
    if (b.id <= 0) {
        return 0;
    }
    let find_space: number = 0;
    if (b.subtype.warehouse_resource_id && b.subtype.warehouse_resource_id != resource) {
        find_space = 1;
    } else if (b.loads_stored >= 4) {
        find_space = 1;
    } else if (b.type == BUILDING_WAREHOUSE) {
        find_space = 1;
    }
    if (find_space) {
        let space_found: number = 0;
        let space: building = building_main(b);
        for (let i: number = 0; i < 8; i++) {
            space = building_next(space);
            if (!space.id) {
                return 0;
            }
            if (!space.subtype.warehouse_resource_id || space.subtype.warehouse_resource_id == resource) {
                if (space.loads_stored < 4) {
                    space_found = 1;
                    b = space;
                    break
                }
            }
        }
        if (!space_found) {
            return 0;
        }
    }
    city_resource_add_to_warehouse(resource, 1);
    b.subtype.warehouse_resource_id = resource;
    b.loads_stored++;
    tutorial_on_add_to_warehouse();
    building_warehouse_space_set_image(b, resource);
    return 1;
}
export function building_warehouse_remove_resource(warehouse: building, resource: number, amount: number) {
    if (warehouse.type != BUILDING_WAREHOUSE) {
        return amount;
    }
    let space: building = warehouse;
    for (let i: number = 0; i < 8; i++) {
        if (amount <= 0) {
            return 0;
        }
        space = building_next(space);
        if (space.id <= 0) {
            continue
        }
        if (space.subtype.warehouse_resource_id != resource || space.loads_stored <= 0) {
            continue
        }
        if (space.loads_stored > amount) {
            city_resource_remove_from_warehouse(resource, amount);
            space.loads_stored -= amount
            amount = 0;
        } else {
            city_resource_remove_from_warehouse(resource, space.loads_stored);
            amount -= space.loads_stored
            space.loads_stored = 0;
            space.subtype.warehouse_resource_id = RESOURCE_NONE;
        }
        building_warehouse_space_set_image(space, resource);
    }
    return amount;
}
export function building_warehouse_remove_resource_curse(warehouse: building, amount: number) {
    if (warehouse.type != BUILDING_WAREHOUSE) {
        return;
    }
    let space: building = warehouse;
    for (let i: number = 0; i < 8 && amount > 0; i++) {
        space = building_next(space);
        if (space.id <= 0 || space.loads_stored <= 0) {
            continue
        }
        let resource: number = space.subtype.warehouse_resource_id;
        if (space.loads_stored > amount) {
            city_resource_remove_from_warehouse(resource, amount);
            space.loads_stored -= amount
            amount = 0;
        } else {
            city_resource_remove_from_warehouse(resource, space.loads_stored);
            amount -= space.loads_stored
            space.loads_stored = 0;
            space.subtype.warehouse_resource_id = RESOURCE_NONE;
        }
        building_warehouse_space_set_image(space, resource);
    }
}
export function building_warehouse_space_set_image(space: building, resource: number) {
    let image_id: number;
    if (space.loads_stored <= 0) {
        image_id = image_group(GROUP_BUILDING_WAREHOUSE_STORAGE_EMPTY);
    } else {
        image_id = image_group(GROUP_BUILDING_WAREHOUSE_STORAGE_FILLED) +
            4 * (resource - 1) + resource_image_offset(resource, RESOURCE_IMAGE_STORAGE) +
            space.loads_stored - 1;
    }
    map_image_set(space.grid_offset, image_id);
}
export function building_warehouse_space_add_import(space: building, resource: number) {
    city_resource_add_to_warehouse(resource, 1);
    space.loads_stored++;
    space.subtype.warehouse_resource_id = resource;
    let price: number = trade_price_buy(resource);
    city_finance_process_import(price);
    building_warehouse_space_set_image(space, resource);
}
export function building_warehouse_space_remove_export(space: building, resource: number) {
    city_resource_remove_from_warehouse(resource, 1);
    space.loads_stored--;
    if (space.loads_stored <= 0) {
        space.subtype.warehouse_resource_id = RESOURCE_NONE;
    }
    let price: number = trade_price_sell(resource);
    city_finance_process_export(price);
    building_warehouse_space_set_image(space, resource);
}
export function building_warehouses_add_resource(resource: number, amount: number) {
    let building_id: number = city_resource_last_used_warehouse();
    for (let i: number = 1; i < MAX_BUILDINGS && amount > 0; i++) {
        building_id++;
        if (building_id >= MAX_BUILDINGS) {
            building_id = 1;
        }
        let b: building = building_get(building_id);
        if (b.state == BUILDING_STATE_IN_USE && b.type == BUILDING_WAREHOUSE) {
            city_resource_set_last_used_warehouse(building_id);
            while (amount && building_warehouse_add_resource(b, resource)) {
                amount--;
            }
        }
    }
}
export function building_warehouses_remove_resource(resource: number, amount: number) {
    let amount_left: number = amount;
    let building_id: number = city_resource_last_used_warehouse();
    for (let i: number = 1; i < MAX_BUILDINGS && amount_left > 0; i++) {
        building_id++;
        if (building_id >= MAX_BUILDINGS) {
            building_id = 1;
        }
        let b: building = building_get(building_id);
        if (b.state == BUILDING_STATE_IN_USE && b.type == BUILDING_WAREHOUSE) {
            if (building_storage_get(b.storage_id).resource_state[resource] != BUILDING_STORAGE_STATE_GETTING) {
                city_resource_set_last_used_warehouse(building_id);
                amount_left = building_warehouse_remove_resource(b, resource, amount_left);
            }
        }
    }
    for (let i: number = 1; i < MAX_BUILDINGS && amount_left > 0; i++) {
        building_id++;
        if (building_id >= MAX_BUILDINGS) {
            building_id = 1;
        }
        let b: building = building_get(building_id);
        if (b.state == BUILDING_STATE_IN_USE && b.type == BUILDING_WAREHOUSE) {
            city_resource_set_last_used_warehouse(building_id);
            amount_left = building_warehouse_remove_resource(b, resource, amount_left);
        }
    }
    return amount - amount_left;
}
export function building_warehouse_for_storing(src_building_id: number, x: number, y: number, resource: number, distance_from_entry: number, road_network_id: number, understaffed: number, dst: map_point) {
    let min_dist: number = 10000;
    let min_building_id: number = 0;
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state != BUILDING_STATE_IN_USE || b.type != BUILDING_WAREHOUSE_SPACE) {
            continue
        }
        if (!b.has_road_access || b.distance_from_entry <= 0 || b.road_network_id != road_network_id) {
            continue
        }
        let building_dst: building = building_main(b);
        if (src_building_id == building_dst.id) {
            continue
        }
        let s: building_storage = building_storage_get(building_dst.storage_id);
        if (s.resource_state[resource] == BUILDING_STORAGE_STATE_NOT_ACCEPTING || s.empty_all) {
            continue
        }
        let pct_workers: number = calc_percentage(building_dst.num_workers, model_get_building(building_dst.type).laborers);
        if (pct_workers < 100) {
            if (understaffed) {
                * understaffed += 1
            }
            continue
        }
        let dist: number;
        if (b.subtype.warehouse_resource_id == RESOURCE_NONE) {
            dist = calc_distance_with_penalty(b.x, b.y, x, y, distance_from_entry, b.distance_from_entry);
        } else if (b.subtype.warehouse_resource_id == resource && b.loads_stored < 4) {
            dist = calc_distance_with_penalty(b.x, b.y, x, y, distance_from_entry, b.distance_from_entry);
        } else {
            dist = 0;
        }
        if (dist > 0 && dist < min_dist) {
            min_dist = dist;
            min_building_id = i;
        }
    }
    let b: building = building_main(building_get(min_building_id));
    if (b.has_road_access == 1) {
        map_point_store_result(b.x, b.y, dst);
    } else if (!map_has_road_access(b.x, b.y, 3, dst)) {
        return 0;
    }
    return min_building_id;
}
export function building_warehouse_for_getting(src: building, resource: number, dst: map_point) {
    let min_dist: number = 10000;
    let min_building: building = null;
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state != BUILDING_STATE_IN_USE || b.type != BUILDING_WAREHOUSE) {
            continue
        }
        if (i == src.id) {
            continue
        }
        let loads_stored: number = 0;
        let space: building = b;
        let s: building_storage = building_storage_get(b.storage_id);
        for (let t: number = 0; t < 8; t++) {
            space = building_next(space);
            if (space.id > 0 && space.loads_stored > 0) {
                if (space.subtype.warehouse_resource_id == resource) {
                    loads_stored += space.loads_stored
                }
            }
        }
        if (loads_stored > 0 && s.resource_state[resource] != BUILDING_STORAGE_STATE_GETTING) {
            let dist: number = calc_distance_with_penalty(b.x, b.y, src.x, src.y,
                src.distance_from_entry, b.distance_from_entry);
            dist -= 4 * loads_stored
            if (dist < min_dist) {
                min_dist = dist;
                min_building = b;
            }
        }
    }
    if (min_building) {
        map_point_store_result(min_building.road_access_x, min_building.road_access_y, dst);
        return min_building.id;
    } else {
        return 0;
    }
}
function determine_granary_accept_foods(resources: number) {
    if (scenario_property_rome_supplies_wheat()) {
        return 0;
    }
    for (let i: number = 0; i < RESOURCE_MAX_FOOD; i++) {
        resources[i] = 0;
    }
    let can_accept: number = 0;
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state != BUILDING_STATE_IN_USE || b.type != BUILDING_GRANARY || !b.has_road_access) {
            continue
        }
        let pct_workers: number = calc_percentage(b.num_workers, model_get_building(b.type).laborers);
        if (pct_workers >= 100 && b.data.granary.resource_stored[RESOURCE_NONE] >= 1200) {
            let s: building_storage = building_storage_get(b.storage_id);
            if (!s.empty_all) {
                for (let r: number = 0; r < RESOURCE_MAX_FOOD; r++) {
                    if (s.resource_state[r] != BUILDING_STORAGE_STATE_NOT_ACCEPTING) {
                        resources[r]++;
                        can_accept = 1;
                    }
                }
            }
        }
    }
    return can_accept;
}
function determine_granary_get_foods(resources: number) {
    if (scenario_property_rome_supplies_wheat()) {
        return 0;
    }
    for (let i: number = 0; i < RESOURCE_MAX_FOOD; i++) {
        resources[i] = 0;
    }
    let can_get: number = 0;
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state != BUILDING_STATE_IN_USE || b.type != BUILDING_GRANARY || !b.has_road_access) {
            continue
        }
        let pct_workers: number = calc_percentage(b.num_workers, model_get_building(b.type).laborers);
        if (pct_workers >= 100 && b.data.granary.resource_stored[RESOURCE_NONE] > 100) {
            let s: building_storage = building_storage_get(b.storage_id);
            if (!s.empty_all) {
                for (let r: number = 0; r < RESOURCE_MAX_FOOD; r++) {
                    if (s.resource_state[r] == BUILDING_STORAGE_STATE_GETTING) {
                        resources[r]++;
                        can_get = 1;
                    }
                }
            }
        }
    }
    return can_get;
}
function contains_non_stockpiled_food(space: building, resources: number) {
    if (space.id <= 0) {
        return 0;
    }
    if (space.loads_stored <= 0) {
        return 0;
    }
    let resource: number = space.subtype.warehouse_resource_id;
    if (city_resource_is_stockpiled(resource)) {
        return 0;
    }
    if (resource == RESOURCE_WHEAT || resource == RESOURCE_VEGETABLES ||
        resource == RESOURCE_FRUIT || resource == RESOURCE_MEAT) {
        if (resources[resource] > 0) {
            return 1;
        }
    }
    return 0;
}
export function building_warehouse_determine_worker_task(warehouse: building, resource: number) {
    let pct_workers: number = calc_percentage(warehouse.num_workers, model_get_building(warehouse.type).laborers);
    if (pct_workers < 50) {
        return WAREHOUSE_TASK_NONE;
    }
    let s: building_storage = building_storage_get(warehouse.storage_id);
    let space: building;
    for (let r: number = RESOURCE_MIN; r < RESOURCE_MAX; r++) {
        if (s.resource_state[r] != BUILDING_STORAGE_STATE_GETTING || city_resource_is_stockpiled(r)) {
            continue
        }
        let loads_stored: number = 0;
        space = warehouse;
        for (let i: number = 0; i < 8; i++) {
            space = building_next(space);
            if (space.id > 0 && space.loads_stored > 0) {
                if (space.subtype.warehouse_resource_id == r) {
                    loads_stored += space.loads_stored
                }
            }
        }
        let room: number = 0;
        space = warehouse;
        for (let i: number = 0; i < 8; i++) {
            space = building_next(space);
            if (space.id > 0) {
                if (space.loads_stored <= 0) {
                    room += 4
                }
                if (space.subtype.warehouse_resource_id == r) {
                    room += 4 - space.loads_stored
                }
            }
        }
        if (room >= 8 && loads_stored <= 4 && city_resource_count(r) - loads_stored > 4) {
            * resource = r;
            return WAREHOUSE_TASK_GETTING;
        }
    }
    if (building_count_active(BUILDING_BARRACKS) > 0 && city_military_has_legionary_legions() &&
        !city_resource_is_stockpiled(RESOURCE_WEAPONS)) {
        let barracks: building = building_get(city_buildings_get_barracks());
        if (barracks.loads_stored < 4 &&
            warehouse.road_network_id == barracks.road_network_id) {
            space = warehouse;
            for (let i: number = 0; i < 8; i++) {
                space = building_next(space);
                if (space.id > 0 && space.loads_stored > 0 &&
                    space.subtype.warehouse_resource_id == RESOURCE_WEAPONS) {
                    * resource = RESOURCE_WEAPONS;
                    return WAREHOUSE_TASK_DELIVERING;
                }
            }
        }
    }
    space = warehouse;
    for (let i: number = 0; i < 8; i++) {
        space = building_next(space);
        if (space.id > 0 && space.loads_stored > 0) {
            if (!city_resource_is_stockpiled(space.subtype.warehouse_resource_id)) {
                let workshop_type: number = resource_to_workshop_type(space.subtype.warehouse_resource_id);
                if (workshop_type != WORKSHOP_NONE && city_resource_has_workshop_with_room(workshop_type)) {
                    * resource = space.subtype.warehouse_resource_id;
                    return WAREHOUSE_TASK_DELIVERING;
                }
            }
        }
    }
    let granary_resources: number[];
    if (determine_granary_get_foods(granary_resources)) {
        space = warehouse;
        for (let i: number = 0; i < 8; i++) {
            space = building_next(space);
            if (contains_non_stockpiled_food(space, granary_resources)) {
                * resource = space.subtype.warehouse_resource_id;
                return WAREHOUSE_TASK_DELIVERING;
            }
        }
    }
    if (determine_granary_accept_foods(granary_resources) && !scenario_property_rome_supplies_wheat()) {
        space = warehouse;
        for (let i: number = 0; i < 8; i++) {
            space = building_next(space);
            if (contains_non_stockpiled_food(space, granary_resources)) {
                * resource = space.subtype.warehouse_resource_id;
                return WAREHOUSE_TASK_DELIVERING;
            }
        }
    }
    if (s.empty_all) {
        space = warehouse;
        for (let i: number = 0; i < 8; i++) {
            space = building_next(space);
            if (space.id > 0 && space.loads_stored > 0) {
                * resource = space.subtype.warehouse_resource_id;
                return WAREHOUSE_TASK_DELIVERING;
            }
        }
    }
    return WAREHOUSE_TASK_NONE;
}
