
;
import { building, building_get } from 'building/building';
import { building_market_get_max_food_stock, building_market_get_max_goods_stock } from 'building/market';
import { building_state, building_type } from 'building/type';
import { direction_type } from 'core/direction';
import { image_group } from 'core/image';
import { group_terrain } from 'core/image_group';
import { figure_action } from 'figure/action';
import { figure_combat_handle_attack, figure_combat_handle_corpse } from 'figure/combat';
import { figure } from 'figure/figure';
import { figure_image_increase_offset, figure_image_update } from 'figure/image';
import { figure_movement_init_roaming, figure_movement_move_ticks, figure_movement_move_ticks_cross_country, figure_movement_roam_ticks, figure_movement_set_cross_country_destination } from 'figure/movement';
import { figure_route_remove } from 'figure/route';
import { figure_state, terrain_usage } from 'figure/type';
import { map_building_at } from 'map/building';
import { map_closest_road_within_radius } from 'map/road_access';
import DIR_FIGURE_AT_DESTINATION = direction_type.DIR_FIGURE_AT_DESTINATION;
import DIR_FIGURE_REROUTE = direction_type.DIR_FIGURE_REROUTE;
import DIR_FIGURE_LOST = direction_type.DIR_FIGURE_LOST;
import FIGURE_ACTION_40_TAX_COLLECTOR_CREATED = figure_action.FIGURE_ACTION_40_TAX_COLLECTOR_CREATED;
import FIGURE_ACTION_41_TAX_COLLECTOR_ENTERING_EXITING = figure_action.FIGURE_ACTION_41_TAX_COLLECTOR_ENTERING_EXITING;
import FIGURE_ACTION_42_TAX_COLLECTOR_ROAMING = figure_action.FIGURE_ACTION_42_TAX_COLLECTOR_ROAMING;
import FIGURE_ACTION_43_TAX_COLLECTOR_RETURNING = figure_action.FIGURE_ACTION_43_TAX_COLLECTOR_RETURNING;
import FIGURE_ACTION_125_ROAMING = figure_action.FIGURE_ACTION_125_ROAMING;
import FIGURE_ACTION_126_ROAMER_RETURNING = figure_action.FIGURE_ACTION_126_ROAMER_RETURNING;
import FIGURE_ACTION_149_CORPSE = figure_action.FIGURE_ACTION_149_CORPSE;
import FIGURE_ACTION_150_ATTACK = figure_action.FIGURE_ACTION_150_ATTACK;
import FIGURE_STATE_DEAD = figure_state.FIGURE_STATE_DEAD;
import TERRAIN_USAGE_ROADS = terrain_usage.TERRAIN_USAGE_ROADS;
import BUILDING_SCHOOL = building_type.BUILDING_SCHOOL;
import BUILDING_STATE_IN_USE = building_state.BUILDING_STATE_IN_USE;
import GROUP_FIGURE_LABOR_SEEKER = group_terrain.GROUP_FIGURE_LABOR_SEEKER;
import GROUP_FIGURE_BATHHOUSE_WORKER = group_terrain.GROUP_FIGURE_BATHHOUSE_WORKER;
import GROUP_FIGURE_PRIEST = group_terrain.GROUP_FIGURE_PRIEST;
import GROUP_FIGURE_TAX_COLLECTOR = group_terrain.GROUP_FIGURE_TAX_COLLECTOR;
import GROUP_FIGURE_SCHOOL_CHILD = group_terrain.GROUP_FIGURE_SCHOOL_CHILD;
import GROUP_FIGURE_MARKET_LADY = group_terrain.GROUP_FIGURE_MARKET_LADY;
import GROUP_FIGURE_BARBER = group_terrain.GROUP_FIGURE_BARBER;
import GROUP_FIGURE_DOCTOR_SURGEON = group_terrain.GROUP_FIGURE_DOCTOR_SURGEON;
import GROUP_FIGURE_PATRICIAN = group_terrain.GROUP_FIGURE_PATRICIAN;
import GROUP_FIGURE_MISSIONARY = group_terrain.GROUP_FIGURE_MISSIONARY;
import GROUP_FIGURE_TEACHER_LIBRARIAN = group_terrain.GROUP_FIGURE_TEACHER_LIBRARIAN;
function roamer_action(f: figure, num_ticks: number) {
    switch (f.action_state) {
        case FIGURE_ACTION_150_ATTACK:
            figure_combat_handle_attack(f);
            break
        case FIGURE_ACTION_149_CORPSE:
            figure_combat_handle_corpse(f);
            break
        case FIGURE_ACTION_125_ROAMING:
            f.is_ghost = 0;
            f.roam_length++;
            if (f.roam_length >= f.max_roam_length) {
                let x: number
                let y: number;
                let b: building = building_get(f.building_id);
                if (map_closest_road_within_radius(b.x, b.y, b.size, 2, x, y)) {
                    f.action_state = FIGURE_ACTION_126_ROAMER_RETURNING;
                    f.destination_x = x;
                    f.destination_y = y;
                    figure_route_remove(f);
                    f.roam_length = 0;
                } else {
                    f.state = FIGURE_STATE_DEAD;
                }
            }
            figure_movement_roam_ticks(f, num_ticks);
            break
        case FIGURE_ACTION_126_ROAMER_RETURNING:
            figure_movement_move_ticks(f, num_ticks);
            if (f.direction == DIR_FIGURE_AT_DESTINATION ||
                f.direction == DIR_FIGURE_REROUTE || f.direction == DIR_FIGURE_LOST) {
                f.state = FIGURE_STATE_DEAD;
            }
            break
    }
}
function culture_action(f: figure, group: number) {
    f.terrain_usage = TERRAIN_USAGE_ROADS;
    f.use_cross_country = 0;
    f.max_roam_length = 384;
    let b: building = building_get(f.building_id);
    if (b.state != BUILDING_STATE_IN_USE || b.figure_id != f.id) {
        f.state = FIGURE_STATE_DEAD;
    }
    figure_image_increase_offset(f, 12);
    roamer_action(f, 1);
    figure_image_update(f, image_group(group));
}
export function figure_priest_action(f: figure) {
    culture_action(f, GROUP_FIGURE_PRIEST);
}
export function figure_school_child_action(f: figure) {
    f.terrain_usage = TERRAIN_USAGE_ROADS;
    f.use_cross_country = 0;
    f.max_roam_length = 96;
    let b: building = building_get(f.building_id);
    if (b.state != BUILDING_STATE_IN_USE || b.type != BUILDING_SCHOOL) {
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
        case FIGURE_ACTION_125_ROAMING:
            f.is_ghost = 0;
            f.roam_length++;
            if (f.roam_length >= f.max_roam_length) {
                f.state = FIGURE_STATE_DEAD;
            }
            figure_movement_roam_ticks(f, 2);
            break
    }
    figure_image_update(f, image_group(GROUP_FIGURE_SCHOOL_CHILD));
}
export function figure_teacher_action(f: figure) {
    culture_action(f, GROUP_FIGURE_TEACHER_LIBRARIAN);
}
export function figure_librarian_action(f: figure) {
    culture_action(f, GROUP_FIGURE_TEACHER_LIBRARIAN);
}
export function figure_barber_action(f: figure) {
    culture_action(f, GROUP_FIGURE_BARBER);
}
export function figure_bathhouse_worker_action(f: figure) {
    culture_action(f, GROUP_FIGURE_BATHHOUSE_WORKER);
}
export function figure_doctor_action(f: figure) {
    culture_action(f, GROUP_FIGURE_DOCTOR_SURGEON);
}
export function figure_missionary_action(f: figure) {
    f.terrain_usage = TERRAIN_USAGE_ROADS;
    f.use_cross_country = 0;
    f.max_roam_length = 192;
    let b: building = building_get(f.building_id);
    if (b.state != BUILDING_STATE_IN_USE || b.figure_id != f.id) {
        f.state = FIGURE_STATE_DEAD;
    }
    figure_image_increase_offset(f, 12);
    roamer_action(f, 1);
    figure_image_update(f, image_group(GROUP_FIGURE_MISSIONARY));
}
export function figure_patrician_action(f: figure) {
    f.terrain_usage = TERRAIN_USAGE_ROADS;
    f.use_cross_country = 0;
    f.max_roam_length = 128;
    if (building_get(f.building_id).state != BUILDING_STATE_IN_USE) {
        f.state = FIGURE_STATE_DEAD;
    }
    figure_image_increase_offset(f, 12);
    roamer_action(f, 1);
    figure_image_update(f, image_group(GROUP_FIGURE_PATRICIAN));
}
export function figure_labor_seeker_action(f: figure) {
    f.terrain_usage = TERRAIN_USAGE_ROADS;
    f.use_cross_country = 0;
    f.max_roam_length = 384;
    let b: building = building_get(f.building_id);
    if (b.state != BUILDING_STATE_IN_USE || b.figure_id2 != f.id) {
        f.state = FIGURE_STATE_DEAD;
    }
    figure_image_increase_offset(f, 12);
    roamer_action(f, 1);
    figure_image_update(f, image_group(GROUP_FIGURE_LABOR_SEEKER));
}
export function figure_market_trader_action(f: figure) {
    f.terrain_usage = TERRAIN_USAGE_ROADS;
    f.use_cross_country = 0;
    f.max_roam_length = 384;
    let market: building = building_get(f.building_id);
    if (market.state != BUILDING_STATE_IN_USE || market.figure_id != f.id) {
        f.state = FIGURE_STATE_DEAD;
    }
    figure_image_increase_offset(f, 12);
    if (f.action_state == FIGURE_ACTION_125_ROAMING) {
        let stock: number = building_market_get_max_food_stock(market) +
            building_market_get_max_goods_stock(market);
        if (f.roam_length >= 96 && stock <= 0) {
            f.roam_length = f.max_roam_length;
        }
    }
    roamer_action(f, 1);
    figure_image_update(f, image_group(GROUP_FIGURE_MARKET_LADY));
}
export function figure_tax_collector_action(f: figure) {
    let b: building = building_get(f.building_id);
    f.terrain_usage = TERRAIN_USAGE_ROADS;
    f.use_cross_country = 0;
    f.max_roam_length = 512;
    if (b.state != BUILDING_STATE_IN_USE || b.figure_id != f.id) {
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
        case FIGURE_ACTION_40_TAX_COLLECTOR_CREATED:
            f.is_ghost = 1;
            f.image_offset = 0;
            f.wait_ticks--;
            if (f.wait_ticks <= 0) {
                let x_road: number
                let y_road: number;
                if (map_closest_road_within_radius(b.x, b.y, b.size, 2, x_road, y_road)) {
                    f.action_state = FIGURE_ACTION_41_TAX_COLLECTOR_ENTERING_EXITING;
                    figure_movement_set_cross_country_destination(f, x_road, y_road);
                    f.roam_length = 0;
                } else {
                    f.state = FIGURE_STATE_DEAD;
                }
            }
            break
        case FIGURE_ACTION_41_TAX_COLLECTOR_ENTERING_EXITING:
            f.use_cross_country = 1;
            f.is_ghost = 1;
            if (figure_movement_move_ticks_cross_country(f, 1) == 1) {
                if (map_building_at(f.grid_offset) == f.building_id) {
                    f.state = FIGURE_STATE_DEAD;
                } else {
                    f.action_state = FIGURE_ACTION_42_TAX_COLLECTOR_ROAMING;
                    figure_movement_init_roaming(f);
                    f.roam_length = 0;
                }
            }
            break
        case FIGURE_ACTION_42_TAX_COLLECTOR_ROAMING:
            f.is_ghost = 0;
            f.roam_length++;
            if (f.roam_length >= f.max_roam_length) {
                let x_road: number
                let y_road: number;
                if (map_closest_road_within_radius(b.x, b.y, b.size, 2, x_road, y_road)) {
                    f.action_state = FIGURE_ACTION_43_TAX_COLLECTOR_RETURNING;
                    f.destination_x = x_road;
                    f.destination_y = y_road;
                } else {
                    f.state = FIGURE_STATE_DEAD;
                }
            }
            figure_movement_roam_ticks(f, 1);
            break
        case FIGURE_ACTION_43_TAX_COLLECTOR_RETURNING:
            figure_movement_move_ticks(f, 1);
            if (f.direction == DIR_FIGURE_AT_DESTINATION) {
                f.action_state = FIGURE_ACTION_41_TAX_COLLECTOR_ENTERING_EXITING;
                figure_movement_set_cross_country_destination(f, b.x, b.y);
                f.roam_length = 0;
            } else if (f.direction == DIR_FIGURE_REROUTE || f.direction == DIR_FIGURE_LOST) {
                f.state = FIGURE_STATE_DEAD;
            }
            break
    }
    figure_image_update(f, image_group(GROUP_FIGURE_TAX_COLLECTOR));
}
