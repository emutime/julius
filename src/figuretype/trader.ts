import { building, building_get, building_next, MAX_BUILDINGS } from 'building/building';
import { building_dock_get_free_destination, building_dock_get_queue_destination } from 'building/dock';
import { building_storage, building_storage_get, building_storage_state } from 'building/storage';
import { building_state, building_type } from 'building/type';
import { building_warehouse_space_add_import, building_warehouse_space_set_image } from 'building/warehouse';
import { city_buildings_get_trade_center } from 'city/buildings';
import { city_finance_process_export } from 'city/finance';
import { city_map_exit_point } from 'city/map';
import { city_message_get_category_count, city_message_increase_category_count, city_message_post, city_message_reset_category_count, city_message_type, message_category } from 'city/message';
import { city_resource_remove_from_warehouse } from 'city/resource';
import { city_trade_current_caravan_import_resource, city_trade_next_caravan_backup_import_resource, city_trade_next_caravan_import_resource } from 'city/trade';
import { calc_distance_with_penalty } from 'core/calc';
import { direction_type } from 'core/direction';
import { image_group } from 'core/image';
import { group_terrain } from 'core/image_group';
import { empire_city_get_route_id } from 'empire/city';
import { empire_can_export_resource_to_city, empire_can_import_resource_from_city } from 'empire/empire';
import { trade_price_sell } from 'empire/trade_prices';
import { trade_route_increase_traded } from 'empire/trade_route';
import { figure_action } from 'figure/action';
import { figure_combat_handle_attack, figure_combat_handle_corpse } from 'figure/combat';
import { figure, figure_create, figure_get } from 'figure/figure';
import { figure_image_corpse_offset, figure_image_increase_offset, figure_image_normalize_direction, figure_image_set_cart_offset } from 'figure/image';
import { figure_movement_follow_ticks, figure_movement_move_ticks } from 'figure/movement';
import { figure_route_remove } from 'figure/route';
import { trader_record_bought_resource, trader_record_sold_resource } from 'figure/trader';
import { figure_state, figure_type, terrain_usage } from 'figure/type';
import { resource_type } from 'game/resource';
import { map_figure_at } from 'map/figure';
import { map_point, map_point_store_result, map_tile } from 'map/point';
import { map_has_road_access } from 'map/road_access';
import { scenario_map_river_entry, scenario_map_river_exit } from 'scenario/map';
export const enum trade_ship {
    TRADE_SHIP_NONE = 0,
    TRADE_SHIP_BUYING = 1,
    TRADE_SHIP_SELLING = 2,
};
;
import DIR_0_TOP = direction_type.DIR_0_TOP;
import DIR_2_RIGHT = direction_type.DIR_2_RIGHT;
import DIR_4_BOTTOM = direction_type.DIR_4_BOTTOM;
import DIR_6_LEFT = direction_type.DIR_6_LEFT;
import DIR_FIGURE_AT_DESTINATION = direction_type.DIR_FIGURE_AT_DESTINATION;
import DIR_FIGURE_REROUTE = direction_type.DIR_FIGURE_REROUTE;
import DIR_FIGURE_LOST = direction_type.DIR_FIGURE_LOST;
import FIGURE_ACTION_100_TRADE_CARAVAN_CREATED = figure_action.FIGURE_ACTION_100_TRADE_CARAVAN_CREATED;
import FIGURE_ACTION_101_TRADE_CARAVAN_ARRIVING = figure_action.FIGURE_ACTION_101_TRADE_CARAVAN_ARRIVING;
import FIGURE_ACTION_102_TRADE_CARAVAN_TRADING = figure_action.FIGURE_ACTION_102_TRADE_CARAVAN_TRADING;
import FIGURE_ACTION_103_TRADE_CARAVAN_LEAVING = figure_action.FIGURE_ACTION_103_TRADE_CARAVAN_LEAVING;
import FIGURE_ACTION_110_TRADE_SHIP_CREATED = figure_action.FIGURE_ACTION_110_TRADE_SHIP_CREATED;
import FIGURE_ACTION_111_TRADE_SHIP_GOING_TO_DOCK = figure_action.FIGURE_ACTION_111_TRADE_SHIP_GOING_TO_DOCK;
import FIGURE_ACTION_112_TRADE_SHIP_MOORED = figure_action.FIGURE_ACTION_112_TRADE_SHIP_MOORED;
import FIGURE_ACTION_113_TRADE_SHIP_GOING_TO_DOCK_QUEUE = figure_action.FIGURE_ACTION_113_TRADE_SHIP_GOING_TO_DOCK_QUEUE;
import FIGURE_ACTION_114_TRADE_SHIP_ANCHORED = figure_action.FIGURE_ACTION_114_TRADE_SHIP_ANCHORED;
import FIGURE_ACTION_115_TRADE_SHIP_LEAVING = figure_action.FIGURE_ACTION_115_TRADE_SHIP_LEAVING;
import FIGURE_ACTION_132_DOCKER_IDLING = figure_action.FIGURE_ACTION_132_DOCKER_IDLING;
import FIGURE_ACTION_133_DOCKER_IMPORT_QUEUE = figure_action.FIGURE_ACTION_133_DOCKER_IMPORT_QUEUE;
import FIGURE_ACTION_134_DOCKER_EXPORT_QUEUE = figure_action.FIGURE_ACTION_134_DOCKER_EXPORT_QUEUE;
import FIGURE_ACTION_135_DOCKER_IMPORT_GOING_TO_WAREHOUSE = figure_action.FIGURE_ACTION_135_DOCKER_IMPORT_GOING_TO_WAREHOUSE;
import FIGURE_ACTION_136_DOCKER_EXPORT_GOING_TO_WAREHOUSE = figure_action.FIGURE_ACTION_136_DOCKER_EXPORT_GOING_TO_WAREHOUSE;
import FIGURE_ACTION_137_DOCKER_EXPORT_RETURNING = figure_action.FIGURE_ACTION_137_DOCKER_EXPORT_RETURNING;
import FIGURE_ACTION_138_DOCKER_IMPORT_RETURNING = figure_action.FIGURE_ACTION_138_DOCKER_IMPORT_RETURNING;
import FIGURE_ACTION_139_DOCKER_IMPORT_AT_WAREHOUSE = figure_action.FIGURE_ACTION_139_DOCKER_IMPORT_AT_WAREHOUSE;
import FIGURE_ACTION_140_DOCKER_EXPORT_AT_WAREHOUSE = figure_action.FIGURE_ACTION_140_DOCKER_EXPORT_AT_WAREHOUSE;
import FIGURE_ACTION_149_CORPSE = figure_action.FIGURE_ACTION_149_CORPSE;
import FIGURE_ACTION_150_ATTACK = figure_action.FIGURE_ACTION_150_ATTACK;
import FIGURE_ACTION_160_NATIVE_TRADER_GOING_TO_WAREHOUSE = figure_action.FIGURE_ACTION_160_NATIVE_TRADER_GOING_TO_WAREHOUSE;
import FIGURE_ACTION_161_NATIVE_TRADER_RETURNING = figure_action.FIGURE_ACTION_161_NATIVE_TRADER_RETURNING;
import FIGURE_ACTION_162_NATIVE_TRADER_CREATED = figure_action.FIGURE_ACTION_162_NATIVE_TRADER_CREATED;
import FIGURE_ACTION_163_NATIVE_TRADER_AT_WAREHOUSE = figure_action.FIGURE_ACTION_163_NATIVE_TRADER_AT_WAREHOUSE;
import FIGURE_TRADE_CARAVAN = figure_type.FIGURE_TRADE_CARAVAN;
import FIGURE_TRADE_SHIP = figure_type.FIGURE_TRADE_SHIP;
import FIGURE_TRADE_CARAVAN_DONKEY = figure_type.FIGURE_TRADE_CARAVAN_DONKEY;
import FIGURE_STATE_ALIVE = figure_state.FIGURE_STATE_ALIVE;
import FIGURE_STATE_DEAD = figure_state.FIGURE_STATE_DEAD;
import TERRAIN_USAGE_ANY = terrain_usage.TERRAIN_USAGE_ANY;
import TERRAIN_USAGE_PREFER_ROADS = terrain_usage.TERRAIN_USAGE_PREFER_ROADS;
import TRADE_SHIP_NONE = trade_ship.TRADE_SHIP_NONE;
import TRADE_SHIP_BUYING = trade_ship.TRADE_SHIP_BUYING;
import TRADE_SHIP_SELLING = trade_ship.TRADE_SHIP_SELLING;
import BUILDING_WAREHOUSE = building_type.BUILDING_WAREHOUSE;
import BUILDING_DOCK = building_type.BUILDING_DOCK;
import BUILDING_STATE_IN_USE = building_state.BUILDING_STATE_IN_USE;
import RESOURCE_NONE = resource_type.RESOURCE_NONE;
import RESOURCE_MIN = resource_type.RESOURCE_MIN;
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
import BUILDING_STORAGE_STATE_NOT_ACCEPTING = building_storage_state.BUILDING_STORAGE_STATE_NOT_ACCEPTING;
import MESSAGE_CAT_BLOCKED_DOCK = message_category.MESSAGE_CAT_BLOCKED_DOCK;
import MESSAGE_NAVIGATION_IMPOSSIBLE = city_message_type.MESSAGE_NAVIGATION_IMPOSSIBLE;
import GROUP_FIGURE_CARTPUSHER = group_terrain.GROUP_FIGURE_CARTPUSHER;
import GROUP_FIGURE_TRADE_CARAVAN = group_terrain.GROUP_FIGURE_TRADE_CARAVAN;
import GROUP_FIGURE_MIGRANT_CART = group_terrain.GROUP_FIGURE_MIGRANT_CART;
import GROUP_FIGURE_SHIP = group_terrain.GROUP_FIGURE_SHIP;
export function figure_create_trade_caravan(x: number, y: number, city_id: number) {
    let caravan: figure = figure_create(FIGURE_TRADE_CARAVAN, x, y, DIR_0_TOP);
    caravan.empire_city_id = city_id;
    caravan.action_state = FIGURE_ACTION_100_TRADE_CARAVAN_CREATED;
    caravan.wait_ticks = 10;
    let donkey1: figure = figure_create(FIGURE_TRADE_CARAVAN_DONKEY, x, y, DIR_0_TOP);
    donkey1.action_state = FIGURE_ACTION_100_TRADE_CARAVAN_CREATED;
    donkey1.leading_figure_id = caravan.id;
    let donkey2: figure = figure_create(FIGURE_TRADE_CARAVAN_DONKEY, x, y, DIR_0_TOP);
    donkey2.action_state = FIGURE_ACTION_100_TRADE_CARAVAN_CREATED;
    donkey2.leading_figure_id = donkey1.id;
    return caravan.id;
}
export function figure_create_trade_ship(x: number, y: number, city_id: number) {
    let ship: figure = figure_create(FIGURE_TRADE_SHIP, x, y, DIR_0_TOP);
    ship.empire_city_id = city_id;
    ship.action_state = FIGURE_ACTION_110_TRADE_SHIP_CREATED;
    ship.wait_ticks = 10;
    return ship.id;
}
export function figure_trade_caravan_can_buy(trader: figure, warehouse_id: number, city_id: number) {
    let warehouse: building = building_get(warehouse_id);
    if (warehouse.type != BUILDING_WAREHOUSE) {
        return 0;
    }
    if (trader.trader_amount_bought >= 8) {
        return 0;
    }
    let space: building = warehouse;
    for (let i: number = 0; i < 8; i++) {
        space = building_next(space);
        if (space.id > 0 && space.loads_stored > 0 &&
            empire_can_export_resource_to_city(city_id, space.subtype.warehouse_resource_id)) {
            return 1;
        }
    }
    return 0;
}
export function figure_trade_caravan_can_sell(trader: figure, warehouse_id: number, city_id: number) {
    let warehouse: building = building_get(warehouse_id);
    if (warehouse.type != BUILDING_WAREHOUSE) {
        return 0;
    }
    if (trader.loads_sold_or_carrying >= 8) {
        return 0;
    }
    let storage: building_storage = building_storage_get(warehouse.storage_id);
    if (storage.empty_all) {
        return 0;
    }
    let num_importable: number = 0;
    for (let r: number = RESOURCE_MIN; r < RESOURCE_MAX; r++) {
        if (storage.resource_state[r] != BUILDING_STORAGE_STATE_NOT_ACCEPTING) {
            if (empire_can_import_resource_from_city(city_id, r)) {
                num_importable++;
            }
        }
    }
    if (num_importable <= 0) {
        return 0;
    }
    let can_import: number = 0;
    let resource: number = city_trade_current_caravan_import_resource();
    if (storage.resource_state[resource] != BUILDING_STORAGE_STATE_NOT_ACCEPTING &&
        empire_can_import_resource_from_city(city_id, resource)) {
        can_import = 1;
    } else {
        for (let i: number = RESOURCE_MIN; i < RESOURCE_MAX; i++) {
            resource = city_trade_next_caravan_import_resource();
            if (storage.resource_state[resource] != BUILDING_STORAGE_STATE_NOT_ACCEPTING &&
                empire_can_import_resource_from_city(city_id, resource)) {
                can_import = 1;
                break
            }
        }
    }
    if (can_import) {
        let space: building = warehouse;
        for (let s: number = 0; s < 8; s++) {
            space = building_next(space);
            if (space.id > 0 && space.loads_stored < 4) {
                if (!space.loads_stored) {
                    return 1;
                }
                if (empire_can_import_resource_from_city(city_id, space.subtype.warehouse_resource_id)) {
                    return 1;
                }
            }
        }
    }
    return 0;
}
function trader_get_buy_resource(warehouse_id: number, city_id: number) {
    let warehouse: building = building_get(warehouse_id);
    if (warehouse.type != BUILDING_WAREHOUSE) {
        return RESOURCE_NONE;
    }
    let space: building = warehouse;
    for (let i: number = 0; i < 8; i++) {
        space = building_next(space);
        if (space.id <= 0) {
            continue
        }
        let resource: number = space.subtype.warehouse_resource_id;
        if (space.loads_stored > 0 && empire_can_export_resource_to_city(city_id, resource)) {
            city_resource_remove_from_warehouse(resource, 1);
            space.loads_stored--;
            if (space.loads_stored <= 0) {
                space.subtype.warehouse_resource_id = RESOURCE_NONE;
            }
            city_finance_process_export(trade_price_sell(resource));
            building_warehouse_space_set_image(space, resource);
            return resource;
        }
    }
    return 0;
}
function trader_get_sell_resource(warehouse_id: number, city_id: number) {
    let warehouse: building = building_get(warehouse_id);
    if (warehouse.type != BUILDING_WAREHOUSE) {
        return 0;
    }
    let resource_to_import: number = city_trade_current_caravan_import_resource();
    let imp: number = RESOURCE_MIN;
    while (imp < RESOURCE_MAX && !empire_can_import_resource_from_city(city_id, resource_to_import)) {
        imp++;
        resource_to_import = city_trade_next_caravan_import_resource();
    }
    if (imp >= RESOURCE_MAX) {
        return 0;
    }
    let space: building = warehouse;
    for (let i: number = 0; i < 8; i++) {
        space = building_next(space);
        if (space.id > 0 && space.loads_stored > 0 && space.loads_stored < 4 &&
            space.subtype.warehouse_resource_id == resource_to_import) {
            building_warehouse_space_add_import(space, resource_to_import);
            city_trade_next_caravan_import_resource();
            return resource_to_import;
        }
    }
    space = warehouse;
    for (let i: number = 0; i < 8; i++) {
        space = building_next(space);
        if (space.id > 0 && !space.loads_stored) {
            building_warehouse_space_add_import(space, resource_to_import);
            city_trade_next_caravan_import_resource();
            return resource_to_import;
        }
    }
    for (let r: number = RESOURCE_MIN; r < RESOURCE_MAX; r++) {
        resource_to_import = city_trade_next_caravan_backup_import_resource();
        if (empire_can_import_resource_from_city(city_id, resource_to_import)) {
            space = warehouse;
            for (let i: number = 0; i < 8; i++) {
                space = building_next(space);
                if (space.id > 0 && space.loads_stored < 4
                    && space.subtype.warehouse_resource_id == resource_to_import) {
                    building_warehouse_space_add_import(space, resource_to_import);
                    return resource_to_import;
                }
            }
        }
    }
    return 0;
}
function get_closest_warehouse(f: figure, x: number, y: number, city_id: number, distance_from_entry: number, warehouse: map_point) {
    let exportable: boolean[] = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
    let importable: boolean[] = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
    exportable[RESOURCE_NONE] = false;
    importable[RESOURCE_NONE] = false;
    for (let r: number = RESOURCE_MIN; r < RESOURCE_MAX; r++) {
        exportable[r] = empire_can_export_resource_to_city(city_id, r);
        if (f.trader_amount_bought >= 8) {
            exportable[r] = false;
        }
        if (city_id) {
            importable[r] = empire_can_import_resource_from_city(city_id, r);
        } else {
            importable[r] = false;
        }
        if (f.loads_sold_or_carrying >= 8) {
            importable[r] = false;
        }
    }
    let num_importable: number = 0;
    for (let r: number = RESOURCE_MIN; r < RESOURCE_MAX; r++) {
        if (importable[r]) {
            num_importable++;
        }
    }
    let min_distance: number = 10000;
    let min_building: building = null;
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state != BUILDING_STATE_IN_USE || b.type != BUILDING_WAREHOUSE) {
            continue
        }
        if (!b.has_road_access || b.distance_from_entry <= 0) {
            continue
        }
        let s: building_storage = building_storage_get(b.storage_id);
        let num_imports_for_warehouse: number = 0;
        for (let r: number = RESOURCE_MIN; r < RESOURCE_MAX; r++) {
            if (s.resource_state[r] != BUILDING_STORAGE_STATE_NOT_ACCEPTING
                && empire_can_import_resource_from_city(city_id, r)) {
                num_imports_for_warehouse++;
            }
        }
        let distance_penalty: number = 32;
        let space: building = b;
        for (let space_cnt: number = 0; space_cnt < 8; space_cnt++) {
            space = building_next(space);
            if (space.id && exportable[space.subtype.warehouse_resource_id]) {
                distance_penalty -= 4
            }
            if (num_importable && num_imports_for_warehouse && !s.empty_all) {
                for (let r: number = RESOURCE_MIN; r < RESOURCE_MAX; r++) {
                    let import_resource: number = city_trade_next_caravan_import_resource();
                    if (s.resource_state[import_resource] != BUILDING_STORAGE_STATE_NOT_ACCEPTING) {
                        break
                    }
                }
                let resource: number = city_trade_current_caravan_import_resource();
                if (s.resource_state[resource] != BUILDING_STORAGE_STATE_NOT_ACCEPTING) {
                    if (space.subtype.warehouse_resource_id == RESOURCE_NONE) {
                        distance_penalty -= 16
                    }
                    if (space.id && importable[space.subtype.warehouse_resource_id] && space.loads_stored < 4 &&
                        space.subtype.warehouse_resource_id == resource) {
                        distance_penalty -= 8
                    }
                }
            }
        }
        if (distance_penalty < 32) {
            let distance: number = calc_distance_with_penalty(b.x, b.y, x, y, distance_from_entry, b.distance_from_entry);
            distance += distance_penalty
            if (distance < min_distance) {
                min_distance = distance;
                min_building = b;
            }
        }
    }
    if (!min_building) {
        return 0;
    }
    if (min_building.has_road_access == 1) {
        map_point_store_result(min_building.x, min_building.y, warehouse);
    } else if (!map_has_road_access(min_building.x, min_building.y, 3, warehouse)) {
        return 0;
    }
    return min_building.id;
}
function go_to_next_warehouse(f: figure, x_src: number, y_src: number, distance_to_entry: number) {
    let dst: map_point;
    let warehouse_id: number = get_closest_warehouse(f, x_src, y_src, f.empire_city_id, distance_to_entry, dst);
    if (warehouse_id) {
        f.destination_building_id = warehouse_id;
        f.action_state = FIGURE_ACTION_101_TRADE_CARAVAN_ARRIVING;
        f.destination_x = dst.x;
        f.destination_y = dst.y;
    } else {
        let exit: map_tile = city_map_exit_point();
        f.action_state = FIGURE_ACTION_103_TRADE_CARAVAN_LEAVING;
        f.destination_x = exit.x;
        f.destination_y = exit.y;
    }
}
export function figure_trade_caravan_action(f: figure) {
    f.is_ghost = 0;
    f.terrain_usage = TERRAIN_USAGE_PREFER_ROADS;
    figure_image_increase_offset(f, 12);
    f.cart_image_id = 0;
    switch (f.action_state) {
        case FIGURE_ACTION_150_ATTACK:
            figure_combat_handle_attack(f);
            break
        case FIGURE_ACTION_149_CORPSE:
            figure_combat_handle_corpse(f);
            break
        case FIGURE_ACTION_100_TRADE_CARAVAN_CREATED:
            f.is_ghost = 1;
            f.wait_ticks++;
            if (f.wait_ticks > 20) {
                f.wait_ticks = 0;
                let x_base: number
                let y_base: number;
                let trade_center_id: number = city_buildings_get_trade_center();
                if (trade_center_id) {
                    let trade_center: building = building_get(trade_center_id);
                    x_base = trade_center.x;
                    y_base = trade_center.y;
                } else {
                    x_base = f.x;
                    y_base = f.y;
                }
                go_to_next_warehouse(f, x_base, y_base, 0);
            }
            f.image_offset = 0;
            break
        case FIGURE_ACTION_101_TRADE_CARAVAN_ARRIVING:
            figure_movement_move_ticks(f, 1);
            switch (f.direction) {
                case DIR_FIGURE_AT_DESTINATION:
                    f.action_state = FIGURE_ACTION_102_TRADE_CARAVAN_TRADING;
                    break
                case DIR_FIGURE_REROUTE:
                    figure_route_remove(f);
                    break
                case DIR_FIGURE_LOST:
                    f.state = FIGURE_STATE_DEAD;
                    f.is_ghost = 1;
                    break
            }
            if (building_get(f.destination_building_id).state != BUILDING_STATE_IN_USE) {
                f.state = FIGURE_STATE_DEAD;
            }
            break
        case FIGURE_ACTION_102_TRADE_CARAVAN_TRADING:
            f.wait_ticks++;
            if (f.wait_ticks > 10) {
                f.wait_ticks = 0;
                let move_on: number = 0;
                if (figure_trade_caravan_can_buy(f, f.destination_building_id, f.empire_city_id)) {
                    let resource: number = trader_get_buy_resource(f.destination_building_id, f.empire_city_id);
                    if (resource) {
                        trade_route_increase_traded(empire_city_get_route_id(f.empire_city_id), resource);
                        trader_record_bought_resource(f.trader_id, resource);
                        f.trader_amount_bought++;
                    } else {
                        move_on++;
                    }
                } else {
                    move_on++;
                }
                if (figure_trade_caravan_can_sell(f, f.destination_building_id, f.empire_city_id)) {
                    let resource: number = trader_get_sell_resource(f.destination_building_id, f.empire_city_id);
                    if (resource) {
                        trade_route_increase_traded(empire_city_get_route_id(f.empire_city_id), resource);
                        trader_record_sold_resource(f.trader_id, resource);
                        f.loads_sold_or_carrying++;
                    } else {
                        move_on++;
                    }
                } else {
                    move_on++;
                }
                if (move_on == 2) {
                    go_to_next_warehouse(f, f.x, f.y, -1);
                }
            }
            f.image_offset = 0;
            break
        case FIGURE_ACTION_103_TRADE_CARAVAN_LEAVING:
            figure_movement_move_ticks(f, 1);
            switch (f.direction) {
                case DIR_FIGURE_AT_DESTINATION:
                    f.action_state = FIGURE_ACTION_100_TRADE_CARAVAN_CREATED;
                    f.state = FIGURE_STATE_DEAD;
                    break
                case DIR_FIGURE_REROUTE:
                    figure_route_remove(f);
                    break
                case DIR_FIGURE_LOST:
                    f.state = FIGURE_STATE_DEAD;
                    break
            }
            break
    }
    let dir: number = figure_image_normalize_direction(f.direction < 8 ? f.direction : f.previous_tile_direction);
    f.image_id = image_group(GROUP_FIGURE_TRADE_CARAVAN) + dir + 8 * f.image_offset;
}
export function figure_trade_caravan_donkey_action(f: figure) {
    f.is_ghost = 0;
    f.terrain_usage = TERRAIN_USAGE_PREFER_ROADS;
    figure_image_increase_offset(f, 12);
    f.cart_image_id = 0;
    let leader: figure = figure_get(f.leading_figure_id);
    if (f.leading_figure_id <= 0) {
        f.state = FIGURE_STATE_DEAD;
    } else {
        if (leader.action_state == FIGURE_ACTION_149_CORPSE) {
            f.state = FIGURE_STATE_DEAD;
        } else if (leader.state != FIGURE_STATE_ALIVE) {
            f.state = FIGURE_STATE_DEAD;
        } else if (leader.type != FIGURE_TRADE_CARAVAN && leader.type != FIGURE_TRADE_CARAVAN_DONKEY) {
            f.state = FIGURE_STATE_DEAD;
        } else {
            figure_movement_follow_ticks(f, 1);
        }
    }
    if (leader.is_ghost) {
        f.is_ghost = 1;
    }
    let dir: number = figure_image_normalize_direction(f.direction < 8 ? f.direction : f.previous_tile_direction);
    f.image_id = image_group(GROUP_FIGURE_TRADE_CARAVAN) + dir + 8 * f.image_offset;
}
export function figure_native_trader_action(f: figure) {
    f.is_ghost = 0;
    f.terrain_usage = TERRAIN_USAGE_ANY;
    figure_image_increase_offset(f, 12);
    f.cart_image_id = 0;
    switch (f.action_state) {
        case FIGURE_ACTION_150_ATTACK:
            figure_combat_handle_attack(f);
            break
        case FIGURE_ACTION_149_CORPSE:
            figure_combat_handle_corpse(f);
            break
        case FIGURE_ACTION_160_NATIVE_TRADER_GOING_TO_WAREHOUSE:
            figure_movement_move_ticks(f, 1);
            if (f.direction == DIR_FIGURE_AT_DESTINATION) {
                f.action_state = FIGURE_ACTION_163_NATIVE_TRADER_AT_WAREHOUSE;
            } else if (f.direction == DIR_FIGURE_REROUTE) {
                figure_route_remove(f);
            } else if (f.direction == DIR_FIGURE_LOST) {
                f.state = FIGURE_STATE_DEAD;
                f.is_ghost = 1;
            }
            if (building_get(f.destination_building_id).state != BUILDING_STATE_IN_USE) {
                f.state = FIGURE_STATE_DEAD;
            }
            break
        case FIGURE_ACTION_161_NATIVE_TRADER_RETURNING:
            figure_movement_move_ticks(f, 1);
            if (f.direction == DIR_FIGURE_AT_DESTINATION || f.direction == DIR_FIGURE_LOST) {
                f.state = FIGURE_STATE_DEAD;
            } else if (f.direction == DIR_FIGURE_REROUTE) {
                figure_route_remove(f);
            }
            break
        case FIGURE_ACTION_162_NATIVE_TRADER_CREATED:
            f.is_ghost = 1;
            f.wait_ticks++;
            if (f.wait_ticks > 10) {
                f.wait_ticks = 0;
                let tile: map_point;
                let building_id: number = get_closest_warehouse(f, f.x, f.y, 0, -1, tile);
                if (building_id) {
                    f.action_state = FIGURE_ACTION_160_NATIVE_TRADER_GOING_TO_WAREHOUSE;
                    f.destination_building_id = building_id;
                    f.destination_x = tile.x;
                    f.destination_y = tile.y;
                } else {
                    f.state = FIGURE_STATE_DEAD;
                }
            }
            f.image_offset = 0;
            break
        case FIGURE_ACTION_163_NATIVE_TRADER_AT_WAREHOUSE:
            f.wait_ticks++;
            if (f.wait_ticks > 10) {
                f.wait_ticks = 0;
                if (figure_trade_caravan_can_buy(f, f.destination_building_id, 0)) {
                    let resource: number = trader_get_buy_resource(f.destination_building_id, 0);
                    trader_record_bought_resource(f.trader_id, resource);
                    f.trader_amount_bought += 3
                } else {
                    let tile: map_point;
                    let building_id: number = get_closest_warehouse(f, f.x, f.y, 0, -1, tile);
                    if (building_id) {
                        f.action_state = FIGURE_ACTION_160_NATIVE_TRADER_GOING_TO_WAREHOUSE;
                        f.destination_building_id = building_id;
                        f.destination_x = tile.x;
                        f.destination_y = tile.y;
                    } else {
                        f.action_state = FIGURE_ACTION_161_NATIVE_TRADER_RETURNING;
                        f.destination_x = f.source_x;
                        f.destination_y = f.source_y;
                    }
                }
            }
            f.image_offset = 0;
            break
    }
    let dir: number = figure_image_normalize_direction(f.direction < 8 ? f.direction : f.previous_tile_direction);
    if (f.action_state == FIGURE_ACTION_149_CORPSE) {
        f.image_id = image_group(GROUP_FIGURE_CARTPUSHER) + 96 + figure_image_corpse_offset(f);
        f.cart_image_id = 0;
    } else {
        f.image_id = image_group(GROUP_FIGURE_CARTPUSHER) + dir + 8 * f.image_offset;
        f.cart_image_id = image_group(GROUP_FIGURE_MIGRANT_CART) + 8 + 8 * f.resource_id;
    }
    if (f.cart_image_id) {
        f.cart_image_id += dir
        figure_image_set_cart_offset(f, dir);
    }
}
export function figure_trade_ship_is_trading(ship: figure) {
    let b: building = building_get(ship.destination_building_id);
    if (b.state != BUILDING_STATE_IN_USE || b.type != BUILDING_DOCK) {
        return TRADE_SHIP_BUYING;
    }
    for (let i: number = 0; i < 3; i++) {
        let f: figure = figure_get(b.data.dock.docker_ids[i]);
        if (!b.data.dock.docker_ids[i] || f.state != FIGURE_STATE_ALIVE) {
            continue
        }
        switch (f.action_state) {
            case FIGURE_ACTION_133_DOCKER_IMPORT_QUEUE:
            case FIGURE_ACTION_135_DOCKER_IMPORT_GOING_TO_WAREHOUSE:
            case FIGURE_ACTION_138_DOCKER_IMPORT_RETURNING:
            case FIGURE_ACTION_139_DOCKER_IMPORT_AT_WAREHOUSE:
                return TRADE_SHIP_BUYING;
            case FIGURE_ACTION_134_DOCKER_EXPORT_QUEUE:
            case FIGURE_ACTION_136_DOCKER_EXPORT_GOING_TO_WAREHOUSE:
            case FIGURE_ACTION_137_DOCKER_EXPORT_RETURNING:
            case FIGURE_ACTION_140_DOCKER_EXPORT_AT_WAREHOUSE:
                return TRADE_SHIP_SELLING;
        }
    }
    return TRADE_SHIP_NONE;
}
function trade_ship_lost_queue(f: figure) {
    let b: building = building_get(f.destination_building_id);
    if (b.state == BUILDING_STATE_IN_USE && b.type == BUILDING_DOCK &&
        b.num_workers > 0 && b.data.dock.trade_ship_id == f.id) {
        return 0;
    }
    return 1;
}
function trade_ship_done_trading(f: figure) {
    let b: building = building_get(f.destination_building_id);
    if (b.state == BUILDING_STATE_IN_USE && b.type == BUILDING_DOCK && b.num_workers > 0) {
        for (let i: number = 0; i < 3; i++) {
            if (b.data.dock.docker_ids[i]) {
                let docker: figure = figure_get(b.data.dock.docker_ids[i]);
                if (docker.state == FIGURE_STATE_ALIVE && docker.action_state != FIGURE_ACTION_132_DOCKER_IDLING) {
                    return 0;
                }
            }
        }
        f.trade_ship_failed_dock_attempts++;
        if (f.trade_ship_failed_dock_attempts >= 10) {
            f.trade_ship_failed_dock_attempts = 11;
            return 1;
        }
        return 0;
    }
    return 1;
}
export function figure_trade_ship_action(f: figure) {
    f.is_ghost = 0;
    f.is_boat = 1;
    figure_image_increase_offset(f, 12);
    f.cart_image_id = 0;
    switch (f.action_state) {
        case FIGURE_ACTION_150_ATTACK:
            figure_combat_handle_attack(f);
            break
        case FIGURE_ACTION_149_CORPSE:
            figure_combat_handle_corpse(f);
            break
        case FIGURE_ACTION_110_TRADE_SHIP_CREATED:
            f.loads_sold_or_carrying = 12;
            f.trader_amount_bought = 0;
            f.is_ghost = 1;
            f.wait_ticks++;
            if (f.wait_ticks > 20) {
                f.wait_ticks = 0;
                let tile: map_point;
                let dock_id: number = building_dock_get_free_destination(f.id, tile);
                if (dock_id) {
                    f.destination_building_id = dock_id;
                    f.action_state = FIGURE_ACTION_111_TRADE_SHIP_GOING_TO_DOCK;
                    f.destination_x = tile.x;
                    f.destination_y = tile.y;
                } else if (building_dock_get_queue_destination(tile)) {
                    f.action_state = FIGURE_ACTION_113_TRADE_SHIP_GOING_TO_DOCK_QUEUE;
                    f.destination_x = tile.x;
                    f.destination_y = tile.y;
                } else {
                    f.state = FIGURE_STATE_DEAD;
                }
            }
            f.image_offset = 0;
            break
        case FIGURE_ACTION_111_TRADE_SHIP_GOING_TO_DOCK:
            figure_movement_move_ticks(f, 1);
            f.height_adjusted_ticks = 0;
            if (f.direction == DIR_FIGURE_AT_DESTINATION) {
                f.action_state = FIGURE_ACTION_112_TRADE_SHIP_MOORED;
            } else if (f.direction == DIR_FIGURE_REROUTE) {
                figure_route_remove(f);
            } else if (f.direction == DIR_FIGURE_LOST) {
                f.state = FIGURE_STATE_DEAD;
                if (!city_message_get_category_count(MESSAGE_CAT_BLOCKED_DOCK)) {
                    city_message_post(true, MESSAGE_NAVIGATION_IMPOSSIBLE, 0, 0);
                    city_message_increase_category_count(MESSAGE_CAT_BLOCKED_DOCK);
                }
            }
            if (building_get(f.destination_building_id).state != BUILDING_STATE_IN_USE) {
                f.action_state = FIGURE_ACTION_115_TRADE_SHIP_LEAVING;
                f.wait_ticks = 0;
                let river_exit: map_point = scenario_map_river_exit();
                f.destination_x = river_exit.x;
                f.destination_y = river_exit.y;
            }
            break
        case FIGURE_ACTION_112_TRADE_SHIP_MOORED:
            if (trade_ship_lost_queue(f)) {
                f.trade_ship_failed_dock_attempts = 0;
                f.action_state = FIGURE_ACTION_115_TRADE_SHIP_LEAVING;
                f.wait_ticks = 0;
                let river_entry: map_point = scenario_map_river_entry();
                f.destination_x = river_entry.x;
                f.destination_y = river_entry.y;
            } else if (trade_ship_done_trading(f)) {
                f.trade_ship_failed_dock_attempts = 0;
                f.action_state = FIGURE_ACTION_115_TRADE_SHIP_LEAVING;
                f.wait_ticks = 0;
                let river_entry: map_point = scenario_map_river_entry();
                f.destination_x = river_entry.x;
                f.destination_y = river_entry.y;
                let dst: building = building_get(f.destination_building_id);
                dst.data.dock.queued_docker_id = 0;
                dst.data.dock.num_ships = 0;
            }
            switch (building_get(f.destination_building_id).data.dock.orientation) {
                case 0:
                    f.direction = DIR_2_RIGHT;
                    break
                case 1:
                    f.direction = DIR_4_BOTTOM;
                    break
                case 2:
                    f.direction = DIR_6_LEFT;
                    break
                default: f.direction = DIR_0_TOP
                    break
            }
            f.image_offset = 0;
            city_message_reset_category_count(MESSAGE_CAT_BLOCKED_DOCK);
            break
        case FIGURE_ACTION_113_TRADE_SHIP_GOING_TO_DOCK_QUEUE:
            figure_movement_move_ticks(f, 1);
            f.height_adjusted_ticks = 0;
            if (f.direction == DIR_FIGURE_AT_DESTINATION) {
                f.action_state = FIGURE_ACTION_114_TRADE_SHIP_ANCHORED;
            } else if (f.direction == DIR_FIGURE_REROUTE) {
                figure_route_remove(f);
            } else if (f.direction == DIR_FIGURE_LOST) {
                f.state = FIGURE_STATE_DEAD;
            }
            break
        case FIGURE_ACTION_114_TRADE_SHIP_ANCHORED:
            f.wait_ticks++;
            if (f.wait_ticks > 40) {
                let tile: map_point;
                let dock_id: number = building_dock_get_free_destination(f.id, tile);
                if (dock_id) {
                    f.destination_building_id = dock_id;
                    f.action_state = FIGURE_ACTION_111_TRADE_SHIP_GOING_TO_DOCK;
                    f.destination_x = tile.x;
                    f.destination_y = tile.y;
                } else if (map_figure_at(f.grid_offset) != f.id &&
                    building_dock_get_queue_destination(tile)) {
                    f.action_state = FIGURE_ACTION_113_TRADE_SHIP_GOING_TO_DOCK_QUEUE;
                    f.destination_x = tile.x;
                    f.destination_y = tile.y;
                }
                f.wait_ticks = 0;
            }
            f.image_offset = 0;
            break
        case FIGURE_ACTION_115_TRADE_SHIP_LEAVING:
            figure_movement_move_ticks(f, 1);
            f.height_adjusted_ticks = 0;
            if (f.direction == DIR_FIGURE_AT_DESTINATION) {
                f.action_state = FIGURE_ACTION_110_TRADE_SHIP_CREATED;
                f.state = FIGURE_STATE_DEAD;
            } else if (f.direction == DIR_FIGURE_REROUTE) {
                figure_route_remove(f);
            } else if (f.direction == DIR_FIGURE_LOST) {
                f.state = FIGURE_STATE_DEAD;
            }
            break
    }
    let dir: number = figure_image_normalize_direction(f.direction < 8 ? f.direction : f.previous_tile_direction);
    f.image_id = image_group(GROUP_FIGURE_SHIP) + dir;
}
