import { building, building_get, MAX_BUILDINGS } from 'building/building';
import { building_list_small_add, building_list_small_clear, building_list_small_items, building_list_small_size } from 'building/list';
import { building_state, building_type } from 'building/type';
import { calc_maximum_distance } from 'core/calc';
import { direction_type } from 'core/direction';
import { image_group } from 'core/image';
import { group_terrain } from 'core/image_group';
import { figure_action } from 'figure/action';
import { figure_combat_handle_attack, figure_combat_handle_corpse } from 'figure/combat';
import { figure } from 'figure/figure';
import { figure_image_corpse_offset, figure_image_increase_offset, figure_image_normalize_direction, figure_image_set_cart_offset } from 'figure/image';
import { figure_movement_move_ticks, figure_movement_move_ticks_cross_country, figure_movement_roam_ticks, figure_movement_set_cross_country_destination } from 'figure/movement';
import { figure_route_remove } from 'figure/route';
import { figure_state, figure_type, terrain_usage } from 'figure/type';
import { GRID, map_grid_offset } from 'map/grid';
import { map_closest_road_within_radius } from 'map/road_access';
import { map_road_network_get } from 'map/road_network';
import { scenario_gladiator_revolt_is_in_progress } from 'scenario/gladiator_revolt';
;
import DIR_FIGURE_AT_DESTINATION = direction_type.DIR_FIGURE_AT_DESTINATION;
import DIR_FIGURE_REROUTE = direction_type.DIR_FIGURE_REROUTE;
import DIR_FIGURE_LOST = direction_type.DIR_FIGURE_LOST;
import FIGURE_ACTION_90_ENTERTAINER_AT_SCHOOL_CREATED = figure_action.FIGURE_ACTION_90_ENTERTAINER_AT_SCHOOL_CREATED;
import FIGURE_ACTION_91_ENTERTAINER_EXITING_SCHOOL = figure_action.FIGURE_ACTION_91_ENTERTAINER_EXITING_SCHOOL;
import FIGURE_ACTION_92_ENTERTAINER_GOING_TO_VENUE = figure_action.FIGURE_ACTION_92_ENTERTAINER_GOING_TO_VENUE;
import FIGURE_ACTION_94_ENTERTAINER_ROAMING = figure_action.FIGURE_ACTION_94_ENTERTAINER_ROAMING;
import FIGURE_ACTION_95_ENTERTAINER_RETURNING = figure_action.FIGURE_ACTION_95_ENTERTAINER_RETURNING;
import FIGURE_ACTION_149_CORPSE = figure_action.FIGURE_ACTION_149_CORPSE;
import FIGURE_ACTION_150_ATTACK = figure_action.FIGURE_ACTION_150_ATTACK;
import FIGURE_ACTION_158_NATIVE_CREATED = figure_action.FIGURE_ACTION_158_NATIVE_CREATED;
import FIGURE_ACTOR = figure_type.FIGURE_ACTOR;
import FIGURE_GLADIATOR = figure_type.FIGURE_GLADIATOR;
import FIGURE_LION_TAMER = figure_type.FIGURE_LION_TAMER;
import FIGURE_CHARIOTEER = figure_type.FIGURE_CHARIOTEER;
import FIGURE_ENEMY54_GLADIATOR = figure_type.FIGURE_ENEMY54_GLADIATOR;
import FIGURE_STATE_DEAD = figure_state.FIGURE_STATE_DEAD;
import TERRAIN_USAGE_ROADS = terrain_usage.TERRAIN_USAGE_ROADS;
import BUILDING_AMPHITHEATER = building_type.BUILDING_AMPHITHEATER;
import BUILDING_THEATER = building_type.BUILDING_THEATER;
import BUILDING_HIPPODROME = building_type.BUILDING_HIPPODROME;
import BUILDING_COLOSSEUM = building_type.BUILDING_COLOSSEUM;
import BUILDING_STATE_IN_USE = building_state.BUILDING_STATE_IN_USE;
import GROUP_FIGURE_CARTPUSHER_CART = group_terrain.GROUP_FIGURE_CARTPUSHER_CART;
import GROUP_FIGURE_ACTOR = group_terrain.GROUP_FIGURE_ACTOR;
import GROUP_FIGURE_LION_TAMER = group_terrain.GROUP_FIGURE_LION_TAMER;
import GROUP_FIGURE_LION_TAMER_WHIP = group_terrain.GROUP_FIGURE_LION_TAMER_WHIP;
import GROUP_FIGURE_GLADIATOR = group_terrain.GROUP_FIGURE_GLADIATOR;
import GROUP_FIGURE_LION = group_terrain.GROUP_FIGURE_LION;
import GROUP_FIGURE_CHARIOTEER = group_terrain.GROUP_FIGURE_CHARIOTEER;
import GRID_SIZE = GRID.GRID_SIZE;
function determine_destination(x: number, y: number, type1: building_type, type2: building_type) {
    let road_network: number = map_road_network_get(map_grid_offset(x, y));
    building_list_small_clear();
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state != BUILDING_STATE_IN_USE) {
            continue
        }
        if (b.type != type1 && b.type != type2) {
            continue
        }
        if (b.distance_from_entry && b.road_network_id == road_network) {
            if (b.type == BUILDING_HIPPODROME && b.prev_part_building_id) {
                continue
            }
            building_list_small_add(i);
        }
    }
    let total_venues: number = building_list_small_size();
    if (total_venues <= 0) {
        return 0;
    }
    let venues: number = building_list_small_items();
    let min_building_id: number = 0;
    let min_distance: number = 10000;
    for (let i: number = 0; i < total_venues; i++) {
        let b: building = building_get(venues[i]);
        let days_left: number;
        if (b.type == type1) {
            days_left = b.data.entertainment.days1;
        } else if (b.type == type2) {
            days_left = b.data.entertainment.days2;
        } else {
            days_left = 0;
        }
        let dist: number = days_left + calc_maximum_distance(x, y, b.x, b.y);
        if (dist < min_distance) {
            min_distance = dist;
            min_building_id = venues[i];
        }
    }
    return min_building_id;
}
function update_shows(f: figure) {
    let b: building = building_get(f.destination_building_id);
    if (b.type < BUILDING_AMPHITHEATER || b.type > BUILDING_COLOSSEUM) {
        return;
    }
    switch (f.type) {
        case FIGURE_ACTOR:
            b.data.entertainment.play++;
            if (b.data.entertainment.play >= 5) {
                b.data.entertainment.play = 0;
            }
            if (b.type == BUILDING_THEATER) {
                b.data.entertainment.days1 = 32;
            } else {
                b.data.entertainment.days2 = 32;
            }
            break
        case FIGURE_GLADIATOR:
            if (b.type == BUILDING_AMPHITHEATER) {
                b.data.entertainment.days1 = 32;
            } else {
                b.data.entertainment.days2 = 32;
            }
            break
        case FIGURE_LION_TAMER:
        case FIGURE_CHARIOTEER:
            b.data.entertainment.days1 = 32;
            break
    }
}
function update_image(f: figure) {
    let dir: number = figure_image_normalize_direction(f.direction < 8 ? f.direction : f.previous_tile_direction);
    if (f.type == FIGURE_CHARIOTEER) {
        f.cart_image_id = 0;
        if (f.action_state == FIGURE_ACTION_150_ATTACK ||
            f.action_state == FIGURE_ACTION_149_CORPSE) {
            f.image_id = image_group(GROUP_FIGURE_CHARIOTEER) + dir;
        } else {
            f.image_id = image_group(GROUP_FIGURE_CHARIOTEER) +
                dir + 8 * f.image_offset;
        }
        return;
    }
    let image_id: number;
    if (f.type == FIGURE_ACTOR) {
        image_id = image_group(GROUP_FIGURE_ACTOR);
    } else if (f.type == FIGURE_GLADIATOR) {
        image_id = image_group(GROUP_FIGURE_GLADIATOR);
    } else if (f.type == FIGURE_LION_TAMER) {
        image_id = image_group(GROUP_FIGURE_LION_TAMER);
        if (f.wait_ticks_missile >= 96) {
            image_id = image_group(GROUP_FIGURE_LION_TAMER_WHIP);
        }
        f.cart_image_id = image_group(GROUP_FIGURE_LION);
    } else {
        return;
    }
    if (f.action_state == FIGURE_ACTION_150_ATTACK) {
        if (f.type == FIGURE_GLADIATOR) {
            f.image_id = image_id + 104 + dir + 8 * (f.image_offset / 2);
        } else {
            f.image_id = image_id + dir;
        }
    } else if (f.action_state == FIGURE_ACTION_149_CORPSE) {
        f.image_id = image_id + 96 + figure_image_corpse_offset(f);
        f.cart_image_id = 0;
    } else {
        f.image_id = image_id + dir + 8 * f.image_offset;
    }
    if (f.cart_image_id) {
        f.cart_image_id += dir + 8 * f.image_offset
        figure_image_set_cart_offset(f, dir);
    }
}
export function figure_entertainer_action(f: figure) {
    let b: building = building_get(f.building_id);
    f.cart_image_id = image_group(GROUP_FIGURE_CARTPUSHER_CART);
    f.terrain_usage = TERRAIN_USAGE_ROADS;
    f.use_cross_country = 0;
    f.max_roam_length = 512;
    figure_image_increase_offset(f, 12);
    f.wait_ticks_missile++;
    if (f.wait_ticks_missile >= 120) {
        f.wait_ticks_missile = 0;
    }
    if (scenario_gladiator_revolt_is_in_progress() && f.type == FIGURE_GLADIATOR) {
        if (f.action_state == FIGURE_ACTION_92_ENTERTAINER_GOING_TO_VENUE ||
            f.action_state == FIGURE_ACTION_94_ENTERTAINER_ROAMING ||
            f.action_state == FIGURE_ACTION_95_ENTERTAINER_RETURNING) {
            f.type = FIGURE_ENEMY54_GLADIATOR;
            figure_route_remove(f);
            f.roam_length = 0;
            f.action_state = FIGURE_ACTION_158_NATIVE_CREATED;
            return;
        }
    }
    let speed_factor: number = f.type == FIGURE_CHARIOTEER ? 2 : 1;
    switch (f.action_state) {
        case FIGURE_ACTION_150_ATTACK:
            figure_combat_handle_attack(f);
            figure_image_increase_offset(f, 32);
            break
        case FIGURE_ACTION_149_CORPSE:
            figure_combat_handle_corpse(f);
            break
        case FIGURE_ACTION_90_ENTERTAINER_AT_SCHOOL_CREATED:
            f.is_ghost = 1;
            f.image_offset = 0;
            f.wait_ticks_missile = 0;
            f.wait_ticks--;
            if (f.wait_ticks <= 0) {
                let x_road: number
                let y_road: number;
                if (map_closest_road_within_radius(b.x, b.y, b.size, 2, x_road, y_road)) {
                    f.action_state = FIGURE_ACTION_91_ENTERTAINER_EXITING_SCHOOL;
                    figure_movement_set_cross_country_destination(f, x_road, y_road);
                    f.roam_length = 0;
                } else {
                    f.state = FIGURE_STATE_DEAD;
                }
            }
            break
        case FIGURE_ACTION_91_ENTERTAINER_EXITING_SCHOOL:
            f.use_cross_country = 1;
            f.is_ghost = 1;
            if (figure_movement_move_ticks_cross_country(f, 1) == 1) {
                let dst_building_id: number = 0;
                switch (f.type) {
                    case FIGURE_ACTOR:
                        dst_building_id = determine_destination(f.x, f.y, BUILDING_THEATER, BUILDING_AMPHITHEATER);
                        break
                    case FIGURE_GLADIATOR:
                        dst_building_id = determine_destination(f.x, f.y, BUILDING_AMPHITHEATER, BUILDING_COLOSSEUM);
                        break
                    case FIGURE_LION_TAMER:
                        dst_building_id = determine_destination(f.x, f.y, BUILDING_COLOSSEUM, 0);
                        break
                    case FIGURE_CHARIOTEER:
                        dst_building_id = determine_destination(f.x, f.y, BUILDING_HIPPODROME, 0);
                        break
                }
                if (dst_building_id) {
                    let b_dst: building = building_get(dst_building_id);
                    let x_road: number
                    let y_road: number;
                    if (map_closest_road_within_radius(b_dst.x, b_dst.y, b_dst.size, 2, x_road, y_road)) {
                        f.destination_building_id = dst_building_id;
                        f.action_state = FIGURE_ACTION_92_ENTERTAINER_GOING_TO_VENUE;
                        f.destination_x = x_road;
                        f.destination_y = y_road;
                        f.roam_length = 0;
                    } else {
                        f.state = FIGURE_STATE_DEAD;
                    }
                } else {
                    f.state = FIGURE_STATE_DEAD;
                }
            }
            f.is_ghost = 1;
            break
        case FIGURE_ACTION_92_ENTERTAINER_GOING_TO_VENUE:
            f.is_ghost = 0;
            f.roam_length++;
            if (f.roam_length >= 3200) {
                f.state = FIGURE_STATE_DEAD;
            }
            figure_movement_move_ticks(f, speed_factor);
            if (f.direction == DIR_FIGURE_AT_DESTINATION) {
                update_shows(f);
                f.state = FIGURE_STATE_DEAD;
            } else if (f.direction == DIR_FIGURE_REROUTE) {
                figure_route_remove(f);
            } else if (f.direction == DIR_FIGURE_LOST) {
                f.state = FIGURE_STATE_DEAD;
            }
            break
        case FIGURE_ACTION_94_ENTERTAINER_ROAMING:
            f.is_ghost = 0;
            f.roam_length++;
            if (f.roam_length >= f.max_roam_length) {
                let x_road: number
                let y_road: number;
                if (map_closest_road_within_radius(b.x, b.y, b.size, 2, x_road, y_road)) {
                    f.action_state = FIGURE_ACTION_95_ENTERTAINER_RETURNING;
                    f.destination_x = x_road;
                    f.destination_y = y_road;
                } else {
                    f.state = FIGURE_STATE_DEAD;
                }
            }
            figure_movement_roam_ticks(f, speed_factor);
            break
        case FIGURE_ACTION_95_ENTERTAINER_RETURNING:
            figure_movement_move_ticks(f, speed_factor);
            if (f.direction == DIR_FIGURE_AT_DESTINATION ||
                f.direction == DIR_FIGURE_REROUTE || f.direction == DIR_FIGURE_LOST) {
                f.state = FIGURE_STATE_DEAD;
            }
            break
    }
    update_image(f);
}
