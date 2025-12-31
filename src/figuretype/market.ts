
import { building, building_get } from 'building/building';
import { building_granary_remove_resource } from 'building/granary';
import { building_state } from 'building/type';
import { building_warehouse_get_amount, building_warehouse_remove_resource } from 'building/warehouse';
import { direction_type } from 'core/direction';
import { image_group } from 'core/image';
import { group_terrain } from 'core/image_group';
import { figure_action } from 'figure/action';
import { figure_combat_handle_attack, figure_combat_handle_corpse } from 'figure/combat';
import { figure, figure_create, figure_get } from 'figure/figure';
import { figure_image_corpse_offset, figure_image_increase_offset, figure_image_normalize_direction, figure_image_update } from 'figure/image';
import { figure_movement_follow_ticks, figure_movement_move_ticks } from 'figure/movement';
import { figure_route_remove } from 'figure/route';
import { figure_state, figure_type, terrain_usage } from 'figure/type';
import { inventory_type, resource_type } from 'game/resource';
import DIR_FIGURE_AT_DESTINATION = direction_type.DIR_FIGURE_AT_DESTINATION;
import DIR_FIGURE_REROUTE = direction_type.DIR_FIGURE_REROUTE;
import DIR_FIGURE_LOST = direction_type.DIR_FIGURE_LOST;
import FIGURE_ACTION_145_MARKET_BUYER_GOING_TO_STORAGE = figure_action.FIGURE_ACTION_145_MARKET_BUYER_GOING_TO_STORAGE;
import FIGURE_ACTION_146_MARKET_BUYER_RETURNING = figure_action.FIGURE_ACTION_146_MARKET_BUYER_RETURNING;
import FIGURE_ACTION_149_CORPSE = figure_action.FIGURE_ACTION_149_CORPSE;
import FIGURE_ACTION_150_ATTACK = figure_action.FIGURE_ACTION_150_ATTACK;
import FIGURE_MARKET_BUYER = figure_type.FIGURE_MARKET_BUYER;
import FIGURE_DELIVERY_BOY = figure_type.FIGURE_DELIVERY_BOY;
import FIGURE_STATE_ALIVE = figure_state.FIGURE_STATE_ALIVE;
import FIGURE_STATE_DEAD = figure_state.FIGURE_STATE_DEAD;
import TERRAIN_USAGE_ROADS = terrain_usage.TERRAIN_USAGE_ROADS;
import BUILDING_STATE_IN_USE = building_state.BUILDING_STATE_IN_USE;
import GROUP_FIGURE_MARKET_LADY = group_terrain.GROUP_FIGURE_MARKET_LADY;
import GROUP_FIGURE_DELIVERY_BOY = group_terrain.GROUP_FIGURE_DELIVERY_BOY;
import RESOURCE_WHEAT = resource_type.RESOURCE_WHEAT;
import RESOURCE_VEGETABLES = resource_type.RESOURCE_VEGETABLES;
import RESOURCE_FRUIT = resource_type.RESOURCE_FRUIT;
import RESOURCE_MEAT = resource_type.RESOURCE_MEAT;
import RESOURCE_WINE = resource_type.RESOURCE_WINE;
import RESOURCE_OIL = resource_type.RESOURCE_OIL;
import RESOURCE_FURNITURE = resource_type.RESOURCE_FURNITURE;
import RESOURCE_POTTERY = resource_type.RESOURCE_POTTERY;
import INVENTORY_WHEAT = inventory_type.INVENTORY_WHEAT;
import INVENTORY_VEGETABLES = inventory_type.INVENTORY_VEGETABLES;
import INVENTORY_FRUIT = inventory_type.INVENTORY_FRUIT;
import INVENTORY_MEAT = inventory_type.INVENTORY_MEAT;
import INVENTORY_WINE = inventory_type.INVENTORY_WINE;
import INVENTORY_OIL = inventory_type.INVENTORY_OIL;
import INVENTORY_FURNITURE = inventory_type.INVENTORY_FURNITURE;
import INVENTORY_POTTERY = inventory_type.INVENTORY_POTTERY;
function create_delivery_boy(leader_id: number, f: figure) {
    let boy: figure = figure_create(FIGURE_DELIVERY_BOY, f.x, f.y, 0);
    boy.leading_figure_id = leader_id;
    boy.collecting_item_id = f.collecting_item_id;
    boy.building_id = f.building_id;
    return boy.id;
}
function take_food_from_granary(f: figure, market_id: number, granary_id: number) {
    let resource: number;
    switch (f.collecting_item_id) {
        case INVENTORY_WHEAT:
            resource = RESOURCE_WHEAT;
            break
        case INVENTORY_VEGETABLES:
            resource = RESOURCE_VEGETABLES;
            break
        case INVENTORY_FRUIT:
            resource = RESOURCE_FRUIT;
            break
        case INVENTORY_MEAT:
            resource = RESOURCE_MEAT;
            break
        default: return 0
    }
    let granary: building = building_get(granary_id);
    let market_units: number = building_get(market_id).data.market.inventory[f.collecting_item_id];
    let max_units: number = (f.collecting_item_id == INVENTORY_WHEAT ? 800 : 600) - market_units;
    let granary_units: number = granary.data.granary.resource_stored[resource];
    let num_loads: number;
    if (granary_units >= 800) {
        num_loads = 8;
    } else if (granary_units >= 700) {
        num_loads = 7;
    } else if (granary_units >= 600) {
        num_loads = 6;
    } else if (granary_units >= 500) {
        num_loads = 5;
    } else if (granary_units >= 400) {
        num_loads = 4;
    } else if (granary_units >= 300) {
        num_loads = 3;
    } else if (granary_units >= 200) {
        num_loads = 2;
    } else if (granary_units >= 100) {
        num_loads = 1;
    } else {
        num_loads = 0;
    }
    if (num_loads > max_units / 100) {
        num_loads = max_units / 100;
    }
    if (num_loads <= 0) {
        return 0;
    }
    building_granary_remove_resource(granary, resource, 100 * num_loads);
    let previous_boy: number = f.id;
    for (let i: number = 0; i < num_loads; i++) {
        previous_boy = create_delivery_boy(previous_boy, f);
    }
    return 1;
}
function take_resource_from_warehouse(f: figure, warehouse_id: number) {
    let resource: number;
    switch (f.collecting_item_id) {
        case INVENTORY_POTTERY:
            resource = RESOURCE_POTTERY;
            break
        case INVENTORY_FURNITURE:
            resource = RESOURCE_FURNITURE;
            break
        case INVENTORY_OIL:
            resource = RESOURCE_OIL;
            break
        case INVENTORY_WINE:
            resource = RESOURCE_WINE;
            break
        default: return 0
    }
    let warehouse: building = building_get(warehouse_id);
    let num_loads: number;
    let stored: number = building_warehouse_get_amount(warehouse, resource);
    if (stored < 2) {
        num_loads = stored;
    } else {
        num_loads = 2;
    }
    if (num_loads <= 0) {
        return 0;
    }
    building_warehouse_remove_resource(warehouse, resource, num_loads);
    let boy1: number = create_delivery_boy(f.id, f);
    if (num_loads > 1) {
        create_delivery_boy(boy1, f);
    }
    return 1;
}
export function figure_market_buyer_action(f: figure) {
    f.terrain_usage = TERRAIN_USAGE_ROADS;
    f.use_cross_country = 0;
    f.max_roam_length = 800;
    let b: building = building_get(f.building_id);
    if (b.state != BUILDING_STATE_IN_USE || b.figure_id2 != f.id) {
        f.state = FIGURE_STATE_DEAD;
    }
    figure_image_increase_offset(f, 12);
    switch (f.action_state) {
        case FIGURE_ACTION_150_ATTACK:
            figure_combat_handle_attack(f);
            break
        case FIGURE_ACTION_149_CORPSE:
            figure_combat_handle_corpse(f);
            break
        case FIGURE_ACTION_145_MARKET_BUYER_GOING_TO_STORAGE:
            figure_movement_move_ticks(f, 1);
            if (f.direction == DIR_FIGURE_AT_DESTINATION) {
                if (f.collecting_item_id > 3) {
                    if (!take_resource_from_warehouse(f, f.destination_building_id)) {
                        f.state = FIGURE_STATE_DEAD;
                    }
                } else {
                    if (!take_food_from_granary(f, f.building_id, f.destination_building_id)) {
                        f.state = FIGURE_STATE_DEAD;
                    }
                }
                f.action_state = FIGURE_ACTION_146_MARKET_BUYER_RETURNING;
                f.destination_x = f.source_x;
                f.destination_y = f.source_y;
            } else if (f.direction == DIR_FIGURE_REROUTE || f.direction == DIR_FIGURE_LOST) {
                f.action_state = FIGURE_ACTION_146_MARKET_BUYER_RETURNING;
                f.destination_x = f.source_x;
                f.destination_y = f.source_y;
                figure_route_remove(f);
            }
            break
        case FIGURE_ACTION_146_MARKET_BUYER_RETURNING:
            figure_movement_move_ticks(f, 1);
            if (f.direction == DIR_FIGURE_AT_DESTINATION || f.direction == DIR_FIGURE_LOST) {
                f.state = FIGURE_STATE_DEAD;
            } else if (f.direction == DIR_FIGURE_REROUTE) {
                figure_route_remove(f);
            }
            break
    }
    figure_image_update(f, image_group(GROUP_FIGURE_MARKET_LADY));
}
export function figure_delivery_boy_action(f: figure) {
    f.is_ghost = 0;
    f.terrain_usage = TERRAIN_USAGE_ROADS;
    figure_image_increase_offset(f, 12);
    f.cart_image_id = 0;
    let leader: figure = figure_get(f.leading_figure_id);
    if (f.leading_figure_id <= 0 || leader.action_state == FIGURE_ACTION_149_CORPSE) {
        f.state = FIGURE_STATE_DEAD;
    } else {
        if (leader.state == FIGURE_STATE_ALIVE) {
            if (leader.type == FIGURE_MARKET_BUYER || leader.type == FIGURE_DELIVERY_BOY) {
                figure_movement_follow_ticks(f, 1);
            } else {
                f.state = FIGURE_STATE_DEAD;
            }
        } else {
            building_get(f.building_id).data.market.inventory[f.collecting_item_id] += 100
            f.state = FIGURE_STATE_DEAD;
        }
    }
    if (leader.is_ghost) {
        f.is_ghost = 1;
    }
    let dir: number = figure_image_normalize_direction(f.direction < 8 ? f.direction : f.previous_tile_direction);
    if (f.action_state == FIGURE_ACTION_149_CORPSE) {
        f.image_id = image_group(GROUP_FIGURE_DELIVERY_BOY) + 96 +
            figure_image_corpse_offset(f);
    } else {
        f.image_id = image_group(GROUP_FIGURE_DELIVERY_BOY) +
            dir + 8 * f.image_offset;
    }
}
