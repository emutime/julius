import { MAX_BUILDINGS } from 'building/building';
;
import { buffer } from 'core/buffer';
import { direction_type } from 'core/direction';
import DIR_FIGURE_AT_DESTINATION = direction_type.DIR_FIGURE_AT_DESTINATION;
import DIR_FIGURE_REROUTE = direction_type.DIR_FIGURE_REROUTE;
import DIR_FIGURE_LOST = direction_type.DIR_FIGURE_LOST;
import { direction_type } from 'core/direction';
import { figure_action } from 'figure/action';
import FIGURE_ACTION_112_TRADE_SHIP_MOORED = figure_action.FIGURE_ACTION_112_TRADE_SHIP_MOORED;
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
import { figure_type } from 'figure/type';
import FIGURE_TRADE_SHIP = figure_type.FIGURE_TRADE_SHIP;
import { figure_type } from 'figure/type';
import { figure_state } from 'figure/type';
import FIGURE_STATE_ALIVE = figure_state.FIGURE_STATE_ALIVE;
import FIGURE_STATE_DEAD = figure_state.FIGURE_STATE_DEAD;
import { terrain_usage } from 'figure/type';
import TERRAIN_USAGE_ROADS = terrain_usage.TERRAIN_USAGE_ROADS;
import { figure } from 'figure/figure';
import { figure_get } from 'figure/figure';
import { building_type } from 'building/type';
import BUILDING_WAREHOUSE = building_type.BUILDING_WAREHOUSE;
import BUILDING_DOCK = building_type.BUILDING_DOCK;
import BUILDING_WHARF = building_type.BUILDING_WHARF;
import { building_type } from 'building/type';
import { building_state } from 'building/type';
import BUILDING_STATE_IN_USE = building_state.BUILDING_STATE_IN_USE;
import { building } from 'building/building';
import { building_get } from 'building/building';
import { building_next } from 'building/building';
import { resource_type } from 'game/resource';
import RESOURCE_NONE = resource_type.RESOURCE_NONE;
import RESOURCE_MIN = resource_type.RESOURCE_MIN;
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
import { resource_type } from 'game/resource';
import { workshop_type } from 'game/resource';
import { resource_image_type } from 'game/resource';
import RESOURCE_IMAGE_CART = resource_image_type.RESOURCE_IMAGE_CART;
import { resource_image_type } from 'game/resource';
import { resource_image_offset } from 'game/resource';
import { building_storage_state } from 'building/storage';
import BUILDING_STORAGE_STATE_NOT_ACCEPTING = building_storage_state.BUILDING_STORAGE_STATE_NOT_ACCEPTING;
import { building_storage_state } from 'building/storage';
import { building_storage } from 'building/storage';
import { building_storage_get } from 'building/storage';
import { map_point } from 'map/point';
import { map_point_store_result } from 'map/point';
import { building_warehouse_space_add_import } from 'building/warehouse';
import { building_warehouse_space_remove_export } from 'building/warehouse';
import { city_buildings_get_trade_center } from 'city/buildings';
import { city_trade_next_docker_import_resource } from 'city/trade';
import { city_trade_next_docker_export_resource } from 'city/trade';
import { calc_distance_with_penalty } from 'core/calc';
import { language_type } from 'core/locale';
import { encoding_type } from 'core/encoding';
import { group_terrain } from 'core/image_group';
import GROUP_FIGURE_CARTPUSHER_CART = group_terrain.GROUP_FIGURE_CARTPUSHER_CART;
import GROUP_FIGURE_CARTPUSHER = group_terrain.GROUP_FIGURE_CARTPUSHER;
import { color_t } from 'graphics/color';
import { image } from 'core/image';
import { image_group } from 'core/image';
import { empire_city } from 'empire/city';
import { empire_city_get_route_id } from 'empire/city';
import { empire_can_export_resource_to_city } from 'empire/empire';
import { empire_can_import_resource_from_city } from 'empire/empire';
import { trade_route_increase_traded } from 'empire/trade_route';
import { figure_combat_handle_corpse } from 'figure/combat';
import { figure_combat_handle_attack } from 'figure/combat';
import { figure_image_increase_offset } from 'figure/image';
import { figure_image_set_cart_offset } from 'figure/image';
import { figure_image_corpse_offset } from 'figure/image';
import { figure_image_normalize_direction } from 'figure/image';
import { figure_movement_move_ticks } from 'figure/movement';
import { figure_route_remove } from 'figure/route';
import { trader_record_bought_resource } from 'figure/trader';
import { trader_record_sold_resource } from 'figure/trader';
import { trader_has_traded_max } from 'figure/trader';
import { map_has_road_access } from 'map/road_access';
function try_import_resource(building_id: number, resource: number, city_id: number) {
    let warehouse: building = building_get(building_id);
    if (warehouse.type != BUILDING_WAREHOUSE) {
        return 0;
    }
    let route_id: number = empire_city_get_route_id(city_id);
    let space: building = warehouse;
    for (let i: number = 0; i < 8; i++) {
        space = building_next(space);
        if (space.id > 0) {
            if (space.loads_stored && space.loads_stored < 4 && space.subtype.warehouse_resource_id == resource) {
                trade_route_increase_traded(route_id, resource);
                building_warehouse_space_add_import(space, resource);
                return 1;
            }
        }
    }
    space = warehouse;
    for (let i: number = 0; i < 8; i++) {
        space = building_next(space);
        if (space.id > 0) {
            if (space.subtype.warehouse_resource_id == RESOURCE_NONE) {
                trade_route_increase_traded(route_id, resource);
                building_warehouse_space_add_import(space, resource);
                return 1;
            }
        }
    }
    return 0;
}
function try_export_resource(building_id: number, resource: number, city_id: number) {
    let warehouse: building = building_get(building_id);
    if (warehouse.type != BUILDING_WAREHOUSE) {
        return 0;
    }
    let space: building = warehouse;
    for (let i: number = 0; i < 8; i++) {
        space = building_next(space);
        if (space.id > 0) {
            if (space.loads_stored && space.subtype.warehouse_resource_id == resource) {
                trade_route_increase_traded(empire_city_get_route_id(city_id), resource);
                building_warehouse_space_remove_export(space, resource);
                return 1;
            }
        }
    }
    return 0;
}
function get_closest_warehouse_for_import(x: number, y: number, city_id: number, distance_from_entry: number, road_network_id: number, warehouse: map_point, import_resource: number) {
    let importable: number[];
    importable[RESOURCE_NONE] = 0;
    for (let r: number = RESOURCE_MIN; r < RESOURCE_MAX; r++) {
        importable[r] = empire_can_import_resource_from_city(city_id, r);
    }
    let resource: number = city_trade_next_docker_import_resource();
    for (let i: number = RESOURCE_MIN; i < RESOURCE_MAX && !importable[resource]; i++) {
        resource = city_trade_next_docker_import_resource();
    }
    if (!importable[resource]) {
        return 0;
    }
    let min_distance: number = 10000;
    let min_building_id: number = 0;
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state != BUILDING_STATE_IN_USE || b.type != BUILDING_WAREHOUSE) {
            continue
        }
        if (!b.has_road_access || b.distance_from_entry <= 0) {
            continue
        }
        if (b.road_network_id != road_network_id) {
            continue
        }
        let storage: building_storage = building_storage_get(b.storage_id);
        if (storage.resource_state[resource] != BUILDING_STORAGE_STATE_NOT_ACCEPTING && !storage.empty_all) {
            let distance_penalty: number = 32;
            let space: building = b;
            for (let s: number = 0; s < 8; s++) {
                space = building_next(space);
                if (space.id && space.subtype.warehouse_resource_id == RESOURCE_NONE) {
                    distance_penalty -= 8
                }
                if (space.id && space.subtype.warehouse_resource_id == resource && space.loads_stored < 4) {
                    distance_penalty -= 4
                }
            }
            if (distance_penalty < 32) {
                let distance: number = calc_distance_with_penalty(
                    b.x, b.y, x, y, distance_from_entry, b.distance_from_entry);
                distance += distance_penalty
                if (distance < min_distance) {
                    min_distance = distance;
                    min_building_id = i;
                }
            }
        }
    }
    if (!min_building_id) {
        return 0;
    }
    let min: building = building_get(min_building_id);
    if (min.has_road_access == 1) {
        map_point_store_result(min.x, min.y, warehouse);
    } else if (!map_has_road_access(min.x, min.y, 3, warehouse)) {
        return 0;
    }
    * import_resource = resource;
    return min_building_id;
}
function get_closest_warehouse_for_export(x: number, y: number, city_id: number, distance_from_entry: number, road_network_id: number, warehouse: map_point, export_resource: number) {
    let exportable: number[];
    exportable[RESOURCE_NONE] = 0;
    for (let r: number = RESOURCE_MIN; r < RESOURCE_MAX; r++) {
        exportable[r] = empire_can_export_resource_to_city(city_id, r);
    }
    let resource: number = city_trade_next_docker_export_resource();
    for (let i: number = RESOURCE_MIN; i < RESOURCE_MAX && !exportable[resource]; i++) {
        resource = city_trade_next_docker_export_resource();
    }
    if (!exportable[resource]) {
        return 0;
    }
    let min_distance: number = 10000;
    let min_building_id: number = 0;
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state != BUILDING_STATE_IN_USE || b.type != BUILDING_WAREHOUSE) {
            continue
        }
        if (!b.has_road_access || b.distance_from_entry <= 0) {
            continue
        }
        if (b.road_network_id != road_network_id) {
            continue
        }
        let distance_penalty: number = 32;
        let space: building = b;
        for (let s: number = 0; s < 8; s++) {
            space = building_next(space);
            if (space.id && space.subtype.warehouse_resource_id == resource && space.loads_stored > 0) {
                distance_penalty--;
            }
        }
        if (distance_penalty < 32) {
            let distance: number = calc_distance_with_penalty(b.x, b.y, x, y, distance_from_entry, b.distance_from_entry);
            distance += distance_penalty
            if (distance < min_distance) {
                min_distance = distance;
                min_building_id = i;
            }
        }
    }
    if (!min_building_id) {
        return 0;
    }
    let min: building = building_get(min_building_id);
    if (min.has_road_access == 1) {
        map_point_store_result(min.x, min.y, warehouse);
    } else if (!map_has_road_access(min.x, min.y, 3, warehouse)) {
        return 0;
    }
    * export_resource = resource;
    return min_building_id;
}
function get_trade_center_location(f: figure, x: number, y: number) {
    let trade_center_id: number = city_buildings_get_trade_center();
    if (trade_center_id) {
        let trade_center: building = building_get(trade_center_id);
        * x = trade_center.x;
        * y = trade_center.y;
    } else {
        * x = f.x;
        * y = f.y;
    }
}
function deliver_import_resource(f: figure, dock: building) {
    let ship_id: number = dock.data.dock.trade_ship_id;
    if (!ship_id) {
        return 0;
    }
    let ship: figure = figure_get(ship_id);
    if (ship.action_state != FIGURE_ACTION_112_TRADE_SHIP_MOORED || ship.loads_sold_or_carrying <= 0) {
        return 0;
    }
    let x: number
    let y: number;
    get_trade_center_location(f, x, y);
    let tile: map_point;
    let resource: number;
    let warehouse_id: number = get_closest_warehouse_for_import(x, y, ship.empire_city_id,
        dock.distance_from_entry, dock.road_network_id, tile, resource);
    if (!warehouse_id) {
        return 0;
    }
    ship.loads_sold_or_carrying--;
    f.destination_building_id = warehouse_id;
    f.wait_ticks = 0;
    f.action_state = FIGURE_ACTION_133_DOCKER_IMPORT_QUEUE;
    f.destination_x = tile.x;
    f.destination_y = tile.y;
    f.resource_id = resource;
    return 1;
}
function fetch_export_resource(f: figure, dock: building) {
    let ship_id: number = dock.data.dock.trade_ship_id;
    if (!ship_id) {
        return 0;
    }
    let ship: figure = figure_get(ship_id);
    if (ship.action_state != FIGURE_ACTION_112_TRADE_SHIP_MOORED || ship.trader_amount_bought >= 12) {
        return 0;
    }
    let x: number
    let y: number;
    get_trade_center_location(f, x, y);
    let tile: map_point;
    let resource: number;
    let warehouse_id: number = get_closest_warehouse_for_export(x, y, ship.empire_city_id,
        dock.distance_from_entry, dock.road_network_id, tile, resource);
    if (!warehouse_id) {
        return 0;
    }
    ship.trader_amount_bought++;
    f.destination_building_id = warehouse_id;
    f.action_state = FIGURE_ACTION_136_DOCKER_EXPORT_GOING_TO_WAREHOUSE;
    f.wait_ticks = 0;
    f.destination_x = tile.x;
    f.destination_y = tile.y;
    f.resource_id = resource;
    return 1;
}
function set_cart_graphic(f: figure) {
    f.cart_image_id = image_group(GROUP_FIGURE_CARTPUSHER_CART) + 8 * f.resource_id;
    f.cart_image_id += resource_image_offset(f.resource_id, RESOURCE_IMAGE_CART)
}
export function figure_docker_action(f: figure) {
    let b: building = building_get(f.building_id);
    figure_image_increase_offset(f, 12);
    f.cart_image_id = 0;
    if (b.state != BUILDING_STATE_IN_USE) {
        f.state = FIGURE_STATE_DEAD;
    }
    if (b.type != BUILDING_DOCK && b.type != BUILDING_WHARF) {
        f.state = FIGURE_STATE_DEAD;
    }
    if (b.data.dock.num_ships) {
        b.data.dock.num_ships--;
    }
    if (b.data.dock.trade_ship_id) {
        let ship: figure = figure_get(b.data.dock.trade_ship_id);
        if (ship.state != FIGURE_STATE_ALIVE || ship.type != FIGURE_TRADE_SHIP) {
            b.data.dock.trade_ship_id = 0;
        } else if (trader_has_traded_max(ship.trader_id)) {
            b.data.dock.trade_ship_id = 0;
        } else if (ship.action_state == FIGURE_ACTION_115_TRADE_SHIP_LEAVING) {
            b.data.dock.trade_ship_id = 0;
        }
    }
    f.terrain_usage = TERRAIN_USAGE_ROADS;
    switch (f.action_state) {
        case FIGURE_ACTION_150_ATTACK:
            figure_combat_handle_attack(f);
            break
        case FIGURE_ACTION_149_CORPSE:
            figure_combat_handle_corpse(f);
            break
        case FIGURE_ACTION_132_DOCKER_IDLING:
            f.resource_id = 0;
            f.cart_image_id = 0;
            if (!deliver_import_resource(f, b)) {
                fetch_export_resource(f, b);
            }
            f.image_offset = 0;
            break
        case FIGURE_ACTION_133_DOCKER_IMPORT_QUEUE:
            f.cart_image_id = 0;
            f.image_offset = 0;
            if (b.data.dock.queued_docker_id <= 0) {
                b.data.dock.queued_docker_id = f.id;
                f.wait_ticks = 0;
            }
            if (b.data.dock.queued_docker_id == f.id) {
                b.data.dock.num_ships = 120;
                f.wait_ticks++;
                if (f.wait_ticks >= 80) {
                    f.action_state = FIGURE_ACTION_135_DOCKER_IMPORT_GOING_TO_WAREHOUSE;
                    f.wait_ticks = 0;
                    set_cart_graphic(f);
                    b.data.dock.queued_docker_id = 0;
                }
            } else {
                let has_queued_docker: number = 0;
                for (let i: number = 0; i < 3; i++) {
                    if (b.data.dock.docker_ids[i]) {
                        let docker: figure = figure_get(b.data.dock.docker_ids[i]);
                        if (docker.id == b.data.dock.queued_docker_id && docker.state == FIGURE_STATE_ALIVE) {
                            if (docker.action_state == FIGURE_ACTION_133_DOCKER_IMPORT_QUEUE ||
                                docker.action_state == FIGURE_ACTION_134_DOCKER_EXPORT_QUEUE) {
                                has_queued_docker = 1;
                            }
                        }
                    }
                }
                if (!has_queued_docker) {
                    b.data.dock.queued_docker_id = 0;
                }
            }
            break
        case FIGURE_ACTION_134_DOCKER_EXPORT_QUEUE:
            set_cart_graphic(f);
            if (b.data.dock.queued_docker_id <= 0) {
                b.data.dock.queued_docker_id = f.id;
                f.wait_ticks = 0;
            }
            if (b.data.dock.queued_docker_id == f.id) {
                b.data.dock.num_ships = 120;
                f.wait_ticks++;
                if (f.wait_ticks >= 80) {
                    f.action_state = FIGURE_ACTION_132_DOCKER_IDLING;
                    f.wait_ticks = 0;
                    f.image_id = 0;
                    f.cart_image_id = 0;
                    b.data.dock.queued_docker_id = 0;
                }
            }
            f.wait_ticks++;
            if (f.wait_ticks >= 20) {
                f.action_state = FIGURE_ACTION_132_DOCKER_IDLING;
                f.wait_ticks = 0;
            }
            f.image_offset = 0;
            break
        case FIGURE_ACTION_135_DOCKER_IMPORT_GOING_TO_WAREHOUSE:
            set_cart_graphic(f);
            figure_movement_move_ticks(f, 1);
            if (f.direction == DIR_FIGURE_AT_DESTINATION) {
                f.action_state = FIGURE_ACTION_139_DOCKER_IMPORT_AT_WAREHOUSE;
            } else if (f.direction == DIR_FIGURE_REROUTE) {
                figure_route_remove(f);
            } else if (f.direction == DIR_FIGURE_LOST) {
                f.state = FIGURE_STATE_DEAD;
            }
            if (building_get(f.destination_building_id).state != BUILDING_STATE_IN_USE) {
                f.state = FIGURE_STATE_DEAD;
            }
            break
        case FIGURE_ACTION_136_DOCKER_EXPORT_GOING_TO_WAREHOUSE:
            f.cart_image_id = image_group(GROUP_FIGURE_CARTPUSHER_CART);
            figure_movement_move_ticks(f, 1);
            if (f.direction == DIR_FIGURE_AT_DESTINATION) {
                f.action_state = FIGURE_ACTION_140_DOCKER_EXPORT_AT_WAREHOUSE;
            } else if (f.direction == DIR_FIGURE_REROUTE) {
                figure_route_remove(f);
            } else if (f.direction == DIR_FIGURE_LOST) {
                f.state = FIGURE_STATE_DEAD;
            }
            if (building_get(f.destination_building_id).state != BUILDING_STATE_IN_USE) {
                f.state = FIGURE_STATE_DEAD;
            }
            break
        case FIGURE_ACTION_137_DOCKER_EXPORT_RETURNING:
            set_cart_graphic(f);
            figure_movement_move_ticks(f, 1);
            if (f.direction == DIR_FIGURE_AT_DESTINATION) {
                f.action_state = FIGURE_ACTION_134_DOCKER_EXPORT_QUEUE;
                f.wait_ticks = 0;
            } else if (f.direction == DIR_FIGURE_REROUTE) {
                figure_route_remove(f);
            } else if (f.direction == DIR_FIGURE_LOST) {
                f.state = FIGURE_STATE_DEAD;
            }
            if (building_get(f.destination_building_id).state != BUILDING_STATE_IN_USE) {
                f.state = FIGURE_STATE_DEAD;
            }
            break
        case FIGURE_ACTION_138_DOCKER_IMPORT_RETURNING:
            set_cart_graphic(f);
            figure_movement_move_ticks(f, 1);
            if (f.direction == DIR_FIGURE_AT_DESTINATION) {
                f.action_state = FIGURE_ACTION_132_DOCKER_IDLING;
            } else if (f.direction == DIR_FIGURE_REROUTE) {
                figure_route_remove(f);
            } else if (f.direction == DIR_FIGURE_LOST) {
                f.state = FIGURE_STATE_DEAD;
            }
            break
        case FIGURE_ACTION_139_DOCKER_IMPORT_AT_WAREHOUSE:
            set_cart_graphic(f);
            f.wait_ticks++;
            if (f.wait_ticks > 10) {
                let trade_city_id: number;
                if (b.data.dock.trade_ship_id) {
                    trade_city_id = figure_get(b.data.dock.trade_ship_id).empire_city_id;
                } else {
                    trade_city_id = 0;
                }
                if (try_import_resource(f.destination_building_id, f.resource_id, trade_city_id)) {
                    let trader_id: number = figure_get(b.data.dock.trade_ship_id).trader_id;
                    trader_record_sold_resource(trader_id, f.resource_id);
                    f.action_state = FIGURE_ACTION_138_DOCKER_IMPORT_RETURNING;
                    f.wait_ticks = 0;
                    f.destination_x = f.source_x;
                    f.destination_y = f.source_y;
                    f.resource_id = 0;
                    fetch_export_resource(f, b);
                } else {
                    f.action_state = FIGURE_ACTION_138_DOCKER_IMPORT_RETURNING;
                    f.destination_x = f.source_x;
                    f.destination_y = f.source_y;
                }
                f.wait_ticks = 0;
            }
            f.image_offset = 0;
            break
        case FIGURE_ACTION_140_DOCKER_EXPORT_AT_WAREHOUSE:
            f.cart_image_id = image_group(GROUP_FIGURE_CARTPUSHER_CART);
            f.wait_ticks++;
            if (f.wait_ticks > 10) {
                let trade_city_id: number;
                if (b.data.dock.trade_ship_id) {
                    trade_city_id = figure_get(b.data.dock.trade_ship_id).empire_city_id;
                } else {
                    trade_city_id = 0;
                }
                f.action_state = FIGURE_ACTION_138_DOCKER_IMPORT_RETURNING;
                f.destination_x = f.source_x;
                f.destination_y = f.source_y;
                f.wait_ticks = 0;
                if (try_export_resource(f.destination_building_id, f.resource_id, trade_city_id)) {
                    let trader_id: number = figure_get(b.data.dock.trade_ship_id).trader_id;
                    trader_record_bought_resource(trader_id, f.resource_id);
                    f.action_state = FIGURE_ACTION_137_DOCKER_EXPORT_RETURNING;
                } else {
                    fetch_export_resource(f, b);
                }
            }
            f.image_offset = 0;
            break
    }
    let dir: number = figure_image_normalize_direction(f.direction < 8 ? f.direction : f.previous_tile_direction);
    if (f.action_state == FIGURE_ACTION_149_CORPSE) {
        f.image_id = image_group(GROUP_FIGURE_CARTPUSHER) + figure_image_corpse_offset(f) + 96;
        f.cart_image_id = 0;
    } else {
        f.image_id = image_group(GROUP_FIGURE_CARTPUSHER) + dir + 8 * f.image_offset;
    }
    if (f.cart_image_id) {
        f.cart_image_id += dir
        figure_image_set_cart_offset(f, dir);
    } else {
        f.image_id = 0;
    }
}
