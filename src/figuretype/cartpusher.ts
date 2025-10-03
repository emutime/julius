
;
import { buffer } from 'core/buffer';
import { direction_type } from 'core/direction';
import DIR_FIGURE_AT_DESTINATION = direction_type.DIR_FIGURE_AT_DESTINATION;
import DIR_FIGURE_REROUTE = direction_type.DIR_FIGURE_REROUTE;
import DIR_FIGURE_LOST = direction_type.DIR_FIGURE_LOST;
import { direction_type } from 'core/direction';
import { figure_action } from 'figure/action';
import FIGURE_ACTION_20_CARTPUSHER_INITIAL = figure_action.FIGURE_ACTION_20_CARTPUSHER_INITIAL;
import FIGURE_ACTION_21_CARTPUSHER_DELIVERING_TO_WAREHOUSE = figure_action.FIGURE_ACTION_21_CARTPUSHER_DELIVERING_TO_WAREHOUSE;
import FIGURE_ACTION_22_CARTPUSHER_DELIVERING_TO_GRANARY = figure_action.FIGURE_ACTION_22_CARTPUSHER_DELIVERING_TO_GRANARY;
import FIGURE_ACTION_23_CARTPUSHER_DELIVERING_TO_WORKSHOP = figure_action.FIGURE_ACTION_23_CARTPUSHER_DELIVERING_TO_WORKSHOP;
import FIGURE_ACTION_24_CARTPUSHER_AT_WAREHOUSE = figure_action.FIGURE_ACTION_24_CARTPUSHER_AT_WAREHOUSE;
import FIGURE_ACTION_25_CARTPUSHER_AT_GRANARY = figure_action.FIGURE_ACTION_25_CARTPUSHER_AT_GRANARY;
import FIGURE_ACTION_26_CARTPUSHER_AT_WORKSHOP = figure_action.FIGURE_ACTION_26_CARTPUSHER_AT_WORKSHOP;
import FIGURE_ACTION_27_CARTPUSHER_RETURNING = figure_action.FIGURE_ACTION_27_CARTPUSHER_RETURNING;
import FIGURE_ACTION_50_WAREHOUSEMAN_CREATED = figure_action.FIGURE_ACTION_50_WAREHOUSEMAN_CREATED;
import FIGURE_ACTION_51_WAREHOUSEMAN_DELIVERING_RESOURCE = figure_action.FIGURE_ACTION_51_WAREHOUSEMAN_DELIVERING_RESOURCE;
import FIGURE_ACTION_52_WAREHOUSEMAN_AT_DELIVERY_BUILDING = figure_action.FIGURE_ACTION_52_WAREHOUSEMAN_AT_DELIVERY_BUILDING;
import FIGURE_ACTION_53_WAREHOUSEMAN_RETURNING_EMPTY = figure_action.FIGURE_ACTION_53_WAREHOUSEMAN_RETURNING_EMPTY;
import FIGURE_ACTION_54_WAREHOUSEMAN_GETTING_FOOD = figure_action.FIGURE_ACTION_54_WAREHOUSEMAN_GETTING_FOOD;
import FIGURE_ACTION_55_WAREHOUSEMAN_AT_GRANARY = figure_action.FIGURE_ACTION_55_WAREHOUSEMAN_AT_GRANARY;
import FIGURE_ACTION_56_WAREHOUSEMAN_RETURNING_WITH_FOOD = figure_action.FIGURE_ACTION_56_WAREHOUSEMAN_RETURNING_WITH_FOOD;
import FIGURE_ACTION_57_WAREHOUSEMAN_GETTING_RESOURCE = figure_action.FIGURE_ACTION_57_WAREHOUSEMAN_GETTING_RESOURCE;
import FIGURE_ACTION_58_WAREHOUSEMAN_AT_WAREHOUSE = figure_action.FIGURE_ACTION_58_WAREHOUSEMAN_AT_WAREHOUSE;
import FIGURE_ACTION_59_WAREHOUSEMAN_RETURNING_WITH_RESOURCE = figure_action.FIGURE_ACTION_59_WAREHOUSEMAN_RETURNING_WITH_RESOURCE;
import FIGURE_ACTION_149_CORPSE = figure_action.FIGURE_ACTION_149_CORPSE;
import FIGURE_ACTION_150_ATTACK = figure_action.FIGURE_ACTION_150_ATTACK;
import { figure_type } from 'figure/type';
import { figure_state } from 'figure/type';
import FIGURE_STATE_DEAD = figure_state.FIGURE_STATE_DEAD;
import { terrain_usage } from 'figure/type';
import TERRAIN_USAGE_ROADS = terrain_usage.TERRAIN_USAGE_ROADS;
import TERRAIN_USAGE_PREFER_ROADS = terrain_usage.TERRAIN_USAGE_PREFER_ROADS;
import { figure } from 'figure/figure';
import { building_type } from 'building/type';
import BUILDING_GRANARY = building_type.BUILDING_GRANARY;
import BUILDING_WAREHOUSE = building_type.BUILDING_WAREHOUSE;
import BUILDING_WAREHOUSE_SPACE = building_type.BUILDING_WAREHOUSE_SPACE;
import BUILDING_BARRACKS = building_type.BUILDING_BARRACKS;
import { building_type } from 'building/type';
import { building_state } from 'building/type';
import BUILDING_STATE_IN_USE = building_state.BUILDING_STATE_IN_USE;
import { building } from 'building/building';
import { building_get } from 'building/building';
import { map_point } from 'map/point';
import { building_get_barracks_for_weapon } from 'building/barracks';
import { building_barracks_add_weapon } from 'building/barracks';
import { building_granary_add_resource } from 'building/granary';
import { building_granary_remove_resource } from 'building/granary';
import { building_granary_remove_for_getting_deliveryman } from 'building/granary';
import { building_granary_for_storing } from 'building/granary';
import { building_getting_granary_for_storing } from 'building/granary';
import { building_granary_for_getting } from 'building/granary';
import { building_workshop_add_raw_material } from 'building/industry';
import { building_get_workshop_for_raw_material } from 'building/industry';
import { building_get_workshop_for_raw_material_with_room } from 'building/industry';
import { building_warehouse_add_resource } from 'building/warehouse';
import { building_warehouse_remove_resource } from 'building/warehouse';
import { building_warehouse_for_storing } from 'building/warehouse';
import { building_warehouse_for_getting } from 'building/warehouse';
import { resource_trade_status } from 'city/constants';
import { resource_type } from 'game/resource';
import RESOURCE_WHEAT = resource_type.RESOURCE_WHEAT;
import RESOURCE_VEGETABLES = resource_type.RESOURCE_VEGETABLES;
import RESOURCE_FRUIT = resource_type.RESOURCE_FRUIT;
import RESOURCE_MEAT = resource_type.RESOURCE_MEAT;
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
import { resource_type } from 'game/resource';
import { workshop_type } from 'game/resource';
import { resource_image_type } from 'game/resource';
import RESOURCE_IMAGE_CART = resource_image_type.RESOURCE_IMAGE_CART;
import RESOURCE_IMAGE_FOOD_CART = resource_image_type.RESOURCE_IMAGE_FOOD_CART;
import { resource_image_type } from 'game/resource';
import { resource_image_offset } from 'game/resource';
import { resource_list } from 'city/resource';
import { city_resource_is_stockpiled } from 'city/resource';
import { language_type } from 'core/locale';
import { encoding_type } from 'core/encoding';
import { group_terrain } from 'core/image_group';
import GROUP_FIGURE_CARTPUSHER_CART = group_terrain.GROUP_FIGURE_CARTPUSHER_CART;
import GROUP_FIGURE_CARTPUSHER = group_terrain.GROUP_FIGURE_CARTPUSHER;
import GROUP_FIGURE_CARTPUSHER_CART_MULTIPLE_FOOD = group_terrain.GROUP_FIGURE_CARTPUSHER_CART_MULTIPLE_FOOD;
import GROUP_FIGURE_CARTPUSHER_CART_MULTIPLE_RESOURCE = group_terrain.GROUP_FIGURE_CARTPUSHER_CART_MULTIPLE_RESOURCE;
import { color_t } from 'graphics/color';
import { image } from 'core/image';
import { image_group } from 'core/image';
import { figure_combat_handle_corpse } from 'figure/combat';
import { figure_combat_handle_attack } from 'figure/combat';
import { figure_image_increase_offset } from 'figure/image';
import { figure_image_set_cart_offset } from 'figure/image';
import { figure_image_corpse_offset } from 'figure/image';
import { figure_image_normalize_direction } from 'figure/image';
import { figure_movement_move_ticks } from 'figure/movement';
import { figure_route_remove } from 'figure/route';
import { map_road_network_get } from 'map/road_network';
import { map_routing_citizen_is_passable } from 'map/routing_terrain';
import { map_routing_citizen_is_passable_terrain } from 'map/routing_terrain';
let CART_OFFSET_MULTIPLE_LOADS_FOOD: number[] = new Array().fill({ 0, 0, 8, 16, 0, 0, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0});
let CART_OFFSET_MULTIPLE_LOADS_NON_FOOD: number[] = new Array().fill({ 0, 0, 0, 0, 0, 8, 0, 16, 24, 32, 40, 48, 56, 64, 72, 80});
let CART_OFFSET_8_LOADS_FOOD: number[] = new Array().fill({ 0, 40, 48, 56, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0});
function set_cart_graphic(f: figure) {
    f.cart_image_id = image_group(GROUP_FIGURE_CARTPUSHER_CART) +
        8 * f.resource_id + resource_image_offset(f.resource_id, RESOURCE_IMAGE_CART);
}
function set_destination(f: figure, action: number, building_id: number, x_dst: number, y_dst: number) {
    f.destination_building_id = building_id;
    f.action_state = action;
    f.wait_ticks = 0;
    f.destination_x = x_dst;
    f.destination_y = y_dst;
}
function determine_cartpusher_destination(f: figure, b: building, road_network_id: number) {
    let dst: map_point;
    let understaffed_storages: number = 0;
    let dst_building_id: number = building_warehouse_for_storing(0, f.x, f.y,
        b.output_resource_id, b.distance_from_entry, road_network_id,
        understaffed_storages, dst);
    if (!city_resource_is_stockpiled(b.output_resource_id)) {
        dst_building_id = 0;
    }
    if (dst_building_id) {
        set_destination(f, FIGURE_ACTION_21_CARTPUSHER_DELIVERING_TO_WAREHOUSE, dst_building_id, dst.x, dst.y);
        return;
    }
    dst_building_id = building_granary_for_storing(f.x, f.y,
        b.output_resource_id, b.distance_from_entry, road_network_id, 0,
        understaffed_storages, dst);
    if (dst_building_id) {
        set_destination(f, FIGURE_ACTION_22_CARTPUSHER_DELIVERING_TO_GRANARY, dst_building_id, dst.x, dst.y);
        return;
    }
    dst_building_id = building_get_workshop_for_raw_material_with_room(f.x, f.y,
        b.output_resource_id, b.distance_from_entry, road_network_id, dst);
    if (dst_building_id) {
        set_destination(f, FIGURE_ACTION_23_CARTPUSHER_DELIVERING_TO_WORKSHOP, dst_building_id, dst.x, dst.y);
        return;
    }
    dst_building_id = building_warehouse_for_storing(0, f.x, f.y,
        b.output_resource_id, b.distance_from_entry, road_network_id,
        understaffed_storages, dst);
    if (dst_building_id) {
        set_destination(f, FIGURE_ACTION_21_CARTPUSHER_DELIVERING_TO_WAREHOUSE, dst_building_id, dst.x, dst.y);
        return;
    }
    dst_building_id = building_granary_for_storing(f.x, f.y,
        b.output_resource_id, b.distance_from_entry, road_network_id, 1,
        understaffed_storages, dst);
    if (dst_building_id) {
        set_destination(f, FIGURE_ACTION_22_CARTPUSHER_DELIVERING_TO_GRANARY, dst_building_id, dst.x, dst.y);
        return;
    }
    f.wait_ticks = 0;
    f.min_max_seen = understaffed_storages ? 2 : 1;
}
function determine_cartpusher_destination_food(f: figure, road_network_id: number) {
    let b: building = building_get(f.building_id);
    let dst: map_point;
    let dst_building_id: number = building_granary_for_storing(f.x, f.y,
        b.output_resource_id, b.distance_from_entry, road_network_id, 0,
        0, dst);
    if (dst_building_id) {
        set_destination(f, FIGURE_ACTION_22_CARTPUSHER_DELIVERING_TO_GRANARY, dst_building_id, dst.x, dst.y);
        return;
    }
    dst_building_id = building_warehouse_for_storing(0, f.x, f.y,
        b.output_resource_id, b.distance_from_entry, road_network_id,
        0, dst);
    if (dst_building_id) {
        set_destination(f, FIGURE_ACTION_21_CARTPUSHER_DELIVERING_TO_WAREHOUSE, dst_building_id, dst.x, dst.y);
        return;
    }
    dst_building_id = building_granary_for_storing(f.x, f.y,
        b.output_resource_id, b.distance_from_entry, road_network_id, 1,
        0, dst);
    if (dst_building_id) {
        set_destination(f, FIGURE_ACTION_22_CARTPUSHER_DELIVERING_TO_GRANARY, dst_building_id, dst.x, dst.y);
        return;
    }
    f.wait_ticks = 0;
}
function update_image(f: figure) {
    let dir: number = figure_image_normalize_direction(
        f.direction < 8 ? f.direction : f.previous_tile_direction);
    if (f.action_state == FIGURE_ACTION_149_CORPSE) {
        f.image_id = image_group(GROUP_FIGURE_CARTPUSHER) + figure_image_corpse_offset(f) + 96;
        f.cart_image_id = 0;
    } else {
        f.image_id = image_group(GROUP_FIGURE_CARTPUSHER) + dir + 8 * f.image_offset;
    }
    if (f.cart_image_id) {
        f.cart_image_id += dir
        figure_image_set_cart_offset(f, dir);
        if (f.loads_sold_or_carrying >= 8) {
            f.y_offset_cart -= 40
        }
    }
}
function reroute_cartpusher(f: figure) {
    figure_route_remove(f);
    if (!map_routing_citizen_is_passable_terrain(f.grid_offset)) {
        f.action_state = FIGURE_ACTION_20_CARTPUSHER_INITIAL;
    }
    f.wait_ticks = 0;
}
export function figure_cartpusher_action(f: figure) {
    figure_image_increase_offset(f, 12);
    f.cart_image_id = 0;
    let road_network_id: number = map_road_network_get(f.grid_offset);
    f.terrain_usage = TERRAIN_USAGE_ROADS;
    let b: building = building_get(f.building_id);
    switch (f.action_state) {
        case FIGURE_ACTION_150_ATTACK:
            figure_combat_handle_attack(f);
            break
        case FIGURE_ACTION_149_CORPSE:
            figure_combat_handle_corpse(f);
            break
        case FIGURE_ACTION_20_CARTPUSHER_INITIAL:
            set_cart_graphic(f);
            if (!map_routing_citizen_is_passable(f.grid_offset)) {
                f.state = FIGURE_STATE_DEAD;
            }
            if (b.state != BUILDING_STATE_IN_USE || b.figure_id != f.id) {
                f.state = FIGURE_STATE_DEAD;
            }
            f.wait_ticks++;
            if (f.wait_ticks > 30) {
                determine_cartpusher_destination(f, b, road_network_id);
            }
            f.image_offset = 0;
            break
        case FIGURE_ACTION_21_CARTPUSHER_DELIVERING_TO_WAREHOUSE:
            set_cart_graphic(f);
            figure_movement_move_ticks(f, 1);
            if (f.direction == DIR_FIGURE_AT_DESTINATION) {
                f.action_state = FIGURE_ACTION_24_CARTPUSHER_AT_WAREHOUSE;
            } else if (f.direction == DIR_FIGURE_REROUTE) {
                reroute_cartpusher(f);
            } else if (f.direction == DIR_FIGURE_LOST) {
                f.state = FIGURE_STATE_DEAD;
            }
            if (building_get(f.destination_building_id).state != BUILDING_STATE_IN_USE) {
                f.state = FIGURE_STATE_DEAD;
            }
            break
        case FIGURE_ACTION_22_CARTPUSHER_DELIVERING_TO_GRANARY:
            set_cart_graphic(f);
            figure_movement_move_ticks(f, 1);
            if (f.direction == DIR_FIGURE_AT_DESTINATION) {
                f.action_state = FIGURE_ACTION_25_CARTPUSHER_AT_GRANARY;
            } else if (f.direction == DIR_FIGURE_REROUTE) {
                reroute_cartpusher(f);
            } else if (f.direction == DIR_FIGURE_LOST) {
                f.action_state = FIGURE_ACTION_20_CARTPUSHER_INITIAL;
                f.wait_ticks = 0;
            }
            if (building_get(f.destination_building_id).state != BUILDING_STATE_IN_USE) {
                f.state = FIGURE_STATE_DEAD;
            }
            break
        case FIGURE_ACTION_23_CARTPUSHER_DELIVERING_TO_WORKSHOP:
            set_cart_graphic(f);
            figure_movement_move_ticks(f, 1);
            if (f.direction == DIR_FIGURE_AT_DESTINATION) {
                f.action_state = FIGURE_ACTION_26_CARTPUSHER_AT_WORKSHOP;
            } else if (f.direction == DIR_FIGURE_REROUTE) {
                reroute_cartpusher(f);
            } else if (f.direction == DIR_FIGURE_LOST) {
                f.state = FIGURE_STATE_DEAD;
            }
            break
        case FIGURE_ACTION_24_CARTPUSHER_AT_WAREHOUSE:
            f.wait_ticks++;
            if (f.wait_ticks > 10) {
                if (building_warehouse_add_resource(building_get(f.destination_building_id), f.resource_id)) {
                    f.action_state = FIGURE_ACTION_27_CARTPUSHER_RETURNING;
                    f.wait_ticks = 0;
                    f.destination_x = f.source_x;
                    f.destination_y = f.source_y;
                } else {
                    figure_route_remove(f);
                    f.action_state = FIGURE_ACTION_20_CARTPUSHER_INITIAL;
                    f.wait_ticks = 0;
                }
            }
            f.image_offset = 0;
            break
        case FIGURE_ACTION_25_CARTPUSHER_AT_GRANARY:
            f.wait_ticks++;
            if (f.wait_ticks > 5) {
                if (building_granary_add_resource(building_get(f.destination_building_id), f.resource_id, 1)) {
                    f.action_state = FIGURE_ACTION_27_CARTPUSHER_RETURNING;
                    f.wait_ticks = 0;
                    f.destination_x = f.source_x;
                    f.destination_y = f.source_y;
                } else {
                    determine_cartpusher_destination_food(f, road_network_id);
                }
            }
            f.image_offset = 0;
            break
        case FIGURE_ACTION_26_CARTPUSHER_AT_WORKSHOP:
            f.wait_ticks++;
            if (f.wait_ticks > 5) {
                building_workshop_add_raw_material(building_get(f.destination_building_id));
                f.action_state = FIGURE_ACTION_27_CARTPUSHER_RETURNING;
                f.wait_ticks = 0;
                f.destination_x = f.source_x;
                f.destination_y = f.source_y;
            }
            f.image_offset = 0;
            break
        case FIGURE_ACTION_27_CARTPUSHER_RETURNING:
            f.cart_image_id = image_group(GROUP_FIGURE_CARTPUSHER_CART);
            figure_movement_move_ticks(f, 1);
            if (f.direction == DIR_FIGURE_AT_DESTINATION) {
                f.action_state = FIGURE_ACTION_20_CARTPUSHER_INITIAL;
                f.state = FIGURE_STATE_DEAD;
            } else if (f.direction == DIR_FIGURE_REROUTE) {
                figure_route_remove(f);
            } else if (f.direction == DIR_FIGURE_LOST) {
                f.state = FIGURE_STATE_DEAD;
            }
            break
    }
    update_image(f);
}
function determine_granaryman_destination(f: figure, road_network_id: number) {
    let dst: map_point;
    let dst_building_id: number;
    let granary: building = building_get(f.building_id);
    if (!f.resource_id) {
        dst_building_id = building_granary_for_getting(granary, dst);
        if (dst_building_id) {
            f.loads_sold_or_carrying = 0;
            set_destination(f, FIGURE_ACTION_54_WAREHOUSEMAN_GETTING_FOOD, dst_building_id, dst.x, dst.y);
        } else {
            f.state = FIGURE_STATE_DEAD;
        }
        return;
    }
    dst_building_id = building_granary_for_storing(f.x, f.y,
        f.resource_id, granary.distance_from_entry, road_network_id, 0,
        0, dst);
    if (dst_building_id) {
        set_destination(f, FIGURE_ACTION_51_WAREHOUSEMAN_DELIVERING_RESOURCE, dst_building_id, dst.x, dst.y);
        building_granary_remove_resource(granary, f.resource_id, 100);
        return;
    }
    dst_building_id = building_warehouse_for_storing(0, f.x, f.y,
        f.resource_id, granary.distance_from_entry,
        road_network_id, 0, dst);
    if (dst_building_id) {
        set_destination(f, FIGURE_ACTION_51_WAREHOUSEMAN_DELIVERING_RESOURCE, dst_building_id, dst.x, dst.y);
        building_granary_remove_resource(granary, f.resource_id, 100);
        return;
    }
    dst_building_id = building_granary_for_storing(f.x, f.y,
        f.resource_id, granary.distance_from_entry, road_network_id, 1,
        0, dst);
    if (dst_building_id) {
        set_destination(f, FIGURE_ACTION_51_WAREHOUSEMAN_DELIVERING_RESOURCE, dst_building_id, dst.x, dst.y);
        building_granary_remove_resource(granary, f.resource_id, 100);
        return;
    }
    f.state = FIGURE_STATE_DEAD;
}
function remove_resource_from_warehouse(f: figure) {
    if (f.state != FIGURE_STATE_DEAD) {
        let err: number = building_warehouse_remove_resource(building_get(f.building_id), f.resource_id, 1);
        if (err) {
            f.state = FIGURE_STATE_DEAD;
        }
    }
}
function determine_warehouseman_destination(f: figure, road_network_id: number) {
    let dst: map_point;
    let dst_building_id: number;
    if (!f.resource_id) {
        dst_building_id = building_warehouse_for_getting(
            building_get(f.building_id), f.collecting_item_id, dst);
        if (dst_building_id) {
            f.loads_sold_or_carrying = 0;
            set_destination(f, FIGURE_ACTION_57_WAREHOUSEMAN_GETTING_RESOURCE, dst_building_id, dst.x, dst.y);
            f.terrain_usage = TERRAIN_USAGE_PREFER_ROADS;
        } else {
            f.state = FIGURE_STATE_DEAD;
        }
        return;
    }
    let warehouse: building = building_get(f.building_id);
    dst_building_id = building_get_barracks_for_weapon(f.resource_id, road_network_id, dst);
    if (dst_building_id) {
        set_destination(f, FIGURE_ACTION_51_WAREHOUSEMAN_DELIVERING_RESOURCE, dst_building_id, dst.x, dst.y);
        remove_resource_from_warehouse(f);
        return;
    }
    dst_building_id = building_get_workshop_for_raw_material_with_room(f.x, f.y, f.resource_id,
        warehouse.distance_from_entry, road_network_id, dst);
    if (dst_building_id) {
        set_destination(f, FIGURE_ACTION_51_WAREHOUSEMAN_DELIVERING_RESOURCE, dst_building_id, dst.x, dst.y);
        remove_resource_from_warehouse(f);
        return;
    }
    dst_building_id = building_granary_for_storing(f.x, f.y, f.resource_id,
        warehouse.distance_from_entry, road_network_id, 0, 0, dst);
    if (dst_building_id) {
        set_destination(f, FIGURE_ACTION_51_WAREHOUSEMAN_DELIVERING_RESOURCE, dst_building_id, dst.x, dst.y);
        remove_resource_from_warehouse(f);
        return;
    }
    dst_building_id = building_getting_granary_for_storing(f.x, f.y, f.resource_id,
        warehouse.distance_from_entry, road_network_id, dst);
    if (dst_building_id) {
        set_destination(f, FIGURE_ACTION_51_WAREHOUSEMAN_DELIVERING_RESOURCE, dst_building_id, dst.x, dst.y);
        remove_resource_from_warehouse(f);
        return;
    }
    dst_building_id = building_warehouse_for_storing(f.building_id, f.x, f.y, f.resource_id,
        warehouse.distance_from_entry, road_network_id, 0, dst);
    if (dst_building_id) {
        if (dst_building_id == f.building_id) {
            f.state = FIGURE_STATE_DEAD;
        } else {
            set_destination(f, FIGURE_ACTION_51_WAREHOUSEMAN_DELIVERING_RESOURCE, dst_building_id, dst.x, dst.y);
            remove_resource_from_warehouse(f);
        }
        return;
    }
    dst_building_id = building_get_workshop_for_raw_material(f.x, f.y, f.resource_id,
        warehouse.distance_from_entry, road_network_id, dst);
    if (dst_building_id) {
        set_destination(f, FIGURE_ACTION_51_WAREHOUSEMAN_DELIVERING_RESOURCE, dst_building_id, dst.x, dst.y);
        remove_resource_from_warehouse(f);
        return;
    }
    f.state = FIGURE_STATE_DEAD;
}
export function figure_warehouseman_action(f: figure) {
    f.terrain_usage = TERRAIN_USAGE_ROADS;
    figure_image_increase_offset(f, 12);
    f.cart_image_id = 0;
    let road_network_id: number = map_road_network_get(f.grid_offset);
    switch (f.action_state) {
        case FIGURE_ACTION_150_ATTACK:
            figure_combat_handle_attack(f);
            break
        case FIGURE_ACTION_149_CORPSE:
            figure_combat_handle_corpse(f);
            break
        case FIGURE_ACTION_50_WAREHOUSEMAN_CREATED:
            {
                let b: building = building_get(f.building_id);
                if (b.state != BUILDING_STATE_IN_USE || b.figure_id != f.id) {
                    f.state = FIGURE_STATE_DEAD;
                }
                f.wait_ticks++;
                if (f.wait_ticks > 2) {
                    if (building_get(f.building_id).type == BUILDING_GRANARY) {
                        determine_granaryman_destination(f, road_network_id);
                    } else {
                        determine_warehouseman_destination(f, road_network_id);
                    }
                }
                f.image_offset = 0;
                break
            }
        case FIGURE_ACTION_51_WAREHOUSEMAN_DELIVERING_RESOURCE:
            if (f.loads_sold_or_carrying == 1) {
                f.cart_image_id = image_group(GROUP_FIGURE_CARTPUSHER_CART_MULTIPLE_FOOD) +
                    8 * f.resource_id - 8 + resource_image_offset(f.resource_id, RESOURCE_IMAGE_FOOD_CART);
            } else {
                set_cart_graphic(f);
            }
            figure_movement_move_ticks(f, 1);
            if (f.direction == DIR_FIGURE_AT_DESTINATION) {
                f.action_state = FIGURE_ACTION_52_WAREHOUSEMAN_AT_DELIVERY_BUILDING;
            } else if (f.direction == DIR_FIGURE_REROUTE) {
                figure_route_remove(f);
            } else if (f.direction == DIR_FIGURE_LOST) {
                f.state = FIGURE_STATE_DEAD;
            }
            break
        case FIGURE_ACTION_52_WAREHOUSEMAN_AT_DELIVERY_BUILDING:
            f.wait_ticks++;
            if (f.wait_ticks > 4) {
                let b: building = building_get(f.destination_building_id);
                switch (b.type) {
                    case BUILDING_GRANARY:
                        building_granary_add_resource(b, f.resource_id, 0);
                        break
                    case BUILDING_BARRACKS:
                        building_barracks_add_weapon(b);
                        break
                    case BUILDING_WAREHOUSE:
                    case BUILDING_WAREHOUSE_SPACE:
                        building_warehouse_add_resource(b, f.resource_id);
                        break
                    default: // workshop
                        building_workshop_add_raw_material(b)
                        break
                }
                f.action_state = FIGURE_ACTION_53_WAREHOUSEMAN_RETURNING_EMPTY;
                f.wait_ticks = 0;
                f.destination_x = f.source_x;
                f.destination_y = f.source_y;
            }
            f.image_offset = 0;
            break
        case FIGURE_ACTION_53_WAREHOUSEMAN_RETURNING_EMPTY:
            f.cart_image_id = image_group(GROUP_FIGURE_CARTPUSHER_CART);
            figure_movement_move_ticks(f, 1);
            if (f.direction == DIR_FIGURE_AT_DESTINATION || f.direction == DIR_FIGURE_LOST) {
                f.state = FIGURE_STATE_DEAD;
            } else if (f.direction == DIR_FIGURE_REROUTE) {
                figure_route_remove(f);
            }
            break
        case FIGURE_ACTION_54_WAREHOUSEMAN_GETTING_FOOD:
            f.cart_image_id = image_group(GROUP_FIGURE_CARTPUSHER_CART);
            figure_movement_move_ticks(f, 1);
            if (f.direction == DIR_FIGURE_AT_DESTINATION) {
                f.action_state = FIGURE_ACTION_55_WAREHOUSEMAN_AT_GRANARY;
            } else if (f.direction == DIR_FIGURE_REROUTE) {
                figure_route_remove(f);
            } else if (f.direction == DIR_FIGURE_LOST) {
                f.state = FIGURE_STATE_DEAD;
            }
            break
        case FIGURE_ACTION_55_WAREHOUSEMAN_AT_GRANARY:
            f.wait_ticks++;
            if (f.wait_ticks > 4) {
                let resource: number;
                f.loads_sold_or_carrying = building_granary_remove_for_getting_deliveryman(
                    building_get(f.destination_building_id), building_get(f.building_id), resource);
                f.resource_id = resource;
                f.action_state = FIGURE_ACTION_56_WAREHOUSEMAN_RETURNING_WITH_FOOD;
                f.wait_ticks = 0;
                f.destination_x = f.source_x;
                f.destination_y = f.source_y;
                figure_route_remove(f);
            }
            f.image_offset = 0;
            break
        case FIGURE_ACTION_56_WAREHOUSEMAN_RETURNING_WITH_FOOD:
            if (f.loads_sold_or_carrying <= 0) {
                f.cart_image_id = image_group(GROUP_FIGURE_CARTPUSHER_CART);
            } else if (f.loads_sold_or_carrying == 1) {
                set_cart_graphic(f);
            } else {
                if (f.loads_sold_or_carrying >= 8) {
                    f.cart_image_id = image_group(GROUP_FIGURE_CARTPUSHER_CART_MULTIPLE_FOOD) +
                        CART_OFFSET_8_LOADS_FOOD[f.resource_id];
                } else {
                    f.cart_image_id = image_group(GROUP_FIGURE_CARTPUSHER_CART_MULTIPLE_FOOD) +
                        CART_OFFSET_MULTIPLE_LOADS_FOOD[f.resource_id];
                }
                f.cart_image_id += resource_image_offset(f.resource_id, RESOURCE_IMAGE_FOOD_CART)
            }
            figure_movement_move_ticks(f, 1);
            if (f.direction == DIR_FIGURE_AT_DESTINATION) {
                for (let i: number = 0; i < f.loads_sold_or_carrying; i++) {
                    building_granary_add_resource(building_get(f.building_id), f.resource_id, 0);
                }
                f.state = FIGURE_STATE_DEAD;
            } else if (f.direction == DIR_FIGURE_REROUTE) {
                figure_route_remove(f);
            } else if (f.direction == DIR_FIGURE_LOST) {
                f.state = FIGURE_STATE_DEAD;
            }
            break
        case FIGURE_ACTION_57_WAREHOUSEMAN_GETTING_RESOURCE:
            f.terrain_usage = TERRAIN_USAGE_PREFER_ROADS;
            f.cart_image_id = image_group(GROUP_FIGURE_CARTPUSHER_CART);
            figure_movement_move_ticks(f, 1);
            if (f.direction == DIR_FIGURE_AT_DESTINATION) {
                f.action_state = FIGURE_ACTION_58_WAREHOUSEMAN_AT_WAREHOUSE;
            } else if (f.direction == DIR_FIGURE_REROUTE) {
                figure_route_remove(f);
            } else if (f.direction == DIR_FIGURE_LOST) {
                f.state = FIGURE_STATE_DEAD;
            }
            break
        case FIGURE_ACTION_58_WAREHOUSEMAN_AT_WAREHOUSE:
            f.terrain_usage = TERRAIN_USAGE_PREFER_ROADS;
            f.wait_ticks++;
            if (f.wait_ticks > 4) {
                f.loads_sold_or_carrying = 0;
                while (f.loads_sold_or_carrying < 4 && 0 == building_warehouse_remove_resource(
                    building_get(f.destination_building_id), f.collecting_item_id, 1)) {
                    f.loads_sold_or_carrying++;
                }
                f.resource_id = f.collecting_item_id;
                f.action_state = FIGURE_ACTION_59_WAREHOUSEMAN_RETURNING_WITH_RESOURCE;
                f.wait_ticks = 0;
                f.destination_x = f.source_x;
                f.destination_y = f.source_y;
                figure_route_remove(f);
            }
            f.image_offset = 0;
            break
        case FIGURE_ACTION_59_WAREHOUSEMAN_RETURNING_WITH_RESOURCE:
            f.terrain_usage = TERRAIN_USAGE_PREFER_ROADS;
            if (f.loads_sold_or_carrying <= 0) {
                f.cart_image_id = image_group(GROUP_FIGURE_CARTPUSHER_CART);
            } else if (f.loads_sold_or_carrying == 1) {
                set_cart_graphic(f);
            } else {
                if (f.resource_id == RESOURCE_WHEAT || f.resource_id == RESOURCE_VEGETABLES ||
                    f.resource_id == RESOURCE_FRUIT || f.resource_id == RESOURCE_MEAT) {
                    f.cart_image_id = image_group(GROUP_FIGURE_CARTPUSHER_CART_MULTIPLE_FOOD) +
                        CART_OFFSET_MULTIPLE_LOADS_FOOD[f.resource_id];
                } else {
                    f.cart_image_id = image_group(GROUP_FIGURE_CARTPUSHER_CART_MULTIPLE_RESOURCE) +
                        CART_OFFSET_MULTIPLE_LOADS_NON_FOOD[f.resource_id];
                }
                f.cart_image_id += resource_image_offset(f.resource_id, RESOURCE_IMAGE_FOOD_CART)
            }
            figure_movement_move_ticks(f, 1);
            if (f.direction == DIR_FIGURE_AT_DESTINATION) {
                for (let i: number = 0; i < f.loads_sold_or_carrying; i++) {
                    building_warehouse_add_resource(building_get(f.building_id), f.resource_id);
                }
                f.state = FIGURE_STATE_DEAD;
            } else if (f.direction == DIR_FIGURE_REROUTE) {
                figure_route_remove(f);
            } else if (f.direction == DIR_FIGURE_LOST) {
                f.state = FIGURE_STATE_DEAD;
            }
            break
    }
    update_image(f);
}
