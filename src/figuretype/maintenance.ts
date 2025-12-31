import { building, building_get } from 'building/building';
import { building_list_burning_size } from 'building/list';
import { building_maintenance_get_closest_burning_ruin } from 'building/maintenance';
import { building_state, building_type } from 'building/type';
import { city_figures_has_security_breach } from 'city/figures';
import { calc_general_direction, calc_maximum_distance } from 'core/calc';
import { direction_type } from 'core/direction';
import { image_group } from 'core/image';
import { group_terrain } from 'core/image_group';
import { figure_action } from 'figure/action';
import { figure_combat_handle_attack, figure_combat_handle_corpse } from 'figure/combat';
import { enemy_army_total_enemy_formations } from 'figure/enemy_army';
import { figure, figure_get, figure_is_dead, figure_is_enemy, MAX_FIGURES } from 'figure/figure';
import { figure_image_corpse_offset, figure_image_increase_offset, figure_image_normalize_direction, figure_image_update } from 'figure/image';
import { figure_movement_init_roaming, figure_movement_move_ticks, figure_movement_move_ticks_cross_country, figure_movement_roam_ticks, figure_movement_set_cross_country_destination } from 'figure/movement';
import { figure_route_remove } from 'figure/route';
import { figure_state, figure_type, terrain_usage } from 'figure/type';
import { map_building_at } from 'map/building';
import { map_closest_road_within_radius } from 'map/road_access';
import { sound_effect, sound_effect_play } from 'sound/effect';
import { Ref } from '../../ext/crt';
import DIR_FIGURE_AT_DESTINATION = direction_type.DIR_FIGURE_AT_DESTINATION;
import DIR_FIGURE_REROUTE = direction_type.DIR_FIGURE_REROUTE;
import DIR_FIGURE_LOST = direction_type.DIR_FIGURE_LOST;
import FIGURE_ACTION_60_ENGINEER_CREATED = figure_action.FIGURE_ACTION_60_ENGINEER_CREATED;
import FIGURE_ACTION_61_ENGINEER_ENTERING_EXITING = figure_action.FIGURE_ACTION_61_ENGINEER_ENTERING_EXITING;
import FIGURE_ACTION_62_ENGINEER_ROAMING = figure_action.FIGURE_ACTION_62_ENGINEER_ROAMING;
import FIGURE_ACTION_63_ENGINEER_RETURNING = figure_action.FIGURE_ACTION_63_ENGINEER_RETURNING;
import FIGURE_ACTION_70_PREFECT_CREATED = figure_action.FIGURE_ACTION_70_PREFECT_CREATED;
import FIGURE_ACTION_71_PREFECT_ENTERING_EXITING = figure_action.FIGURE_ACTION_71_PREFECT_ENTERING_EXITING;
import FIGURE_ACTION_72_PREFECT_ROAMING = figure_action.FIGURE_ACTION_72_PREFECT_ROAMING;
import FIGURE_ACTION_73_PREFECT_RETURNING = figure_action.FIGURE_ACTION_73_PREFECT_RETURNING;
import FIGURE_ACTION_74_PREFECT_GOING_TO_FIRE = figure_action.FIGURE_ACTION_74_PREFECT_GOING_TO_FIRE;
import FIGURE_ACTION_75_PREFECT_AT_FIRE = figure_action.FIGURE_ACTION_75_PREFECT_AT_FIRE;
import FIGURE_ACTION_76_PREFECT_GOING_TO_ENEMY = figure_action.FIGURE_ACTION_76_PREFECT_GOING_TO_ENEMY;
import FIGURE_ACTION_77_PREFECT_AT_ENEMY = figure_action.FIGURE_ACTION_77_PREFECT_AT_ENEMY;
import FIGURE_ACTION_149_CORPSE = figure_action.FIGURE_ACTION_149_CORPSE;
import FIGURE_ACTION_150_ATTACK = figure_action.FIGURE_ACTION_150_ATTACK;
import FIGURE_ACTION_159_NATIVE_ATTACKING = figure_action.FIGURE_ACTION_159_NATIVE_ATTACKING;
import FIGURE_RIOTER = figure_type.FIGURE_RIOTER;
import FIGURE_INDIGENOUS_NATIVE = figure_type.FIGURE_INDIGENOUS_NATIVE;
import FIGURE_ENEMY54_GLADIATOR = figure_type.FIGURE_ENEMY54_GLADIATOR;
import FIGURE_WOLF = figure_type.FIGURE_WOLF;
import FIGURE_STATE_ALIVE = figure_state.FIGURE_STATE_ALIVE;
import FIGURE_STATE_DEAD = figure_state.FIGURE_STATE_DEAD;
import TERRAIN_USAGE_ANY = terrain_usage.TERRAIN_USAGE_ANY;
import TERRAIN_USAGE_ROADS = terrain_usage.TERRAIN_USAGE_ROADS;
import BUILDING_BURNING_RUIN = building_type.BUILDING_BURNING_RUIN;
import BUILDING_STATE_IN_USE = building_state.BUILDING_STATE_IN_USE;
import GROUP_FIGURE_ENGINEER = group_terrain.GROUP_FIGURE_ENGINEER;
import GROUP_FIGURE_PREFECT = group_terrain.GROUP_FIGURE_PREFECT;
import GROUP_FIGURE_PREFECT_WITH_BUCKET = group_terrain.GROUP_FIGURE_PREFECT_WITH_BUCKET;
import SOUND_EFFECT_FIRE_SPLASH = sound_effect.SOUND_EFFECT_FIRE_SPLASH;
export function figure_engineer_action(f: figure) {
    let b: building = building_get(f.building_id);
    f.terrain_usage = TERRAIN_USAGE_ROADS;
    f.use_cross_country = 0;
    f.max_roam_length = 640;
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
        case FIGURE_ACTION_60_ENGINEER_CREATED:
            f.is_ghost = 1;
            f.image_offset = 0;
            f.wait_ticks--;
            if (f.wait_ticks <= 0) {
                let x_road: Ref<number>;
                let y_road: Ref<number>;
                if (map_closest_road_within_radius(b.x, b.y, b.size, 2, x_road, y_road)) {
                    f.action_state = FIGURE_ACTION_61_ENGINEER_ENTERING_EXITING;
                    figure_movement_set_cross_country_destination(f, x_road.v, y_road.v);
                    f.roam_length = 0;
                } else {
                    f.state = FIGURE_STATE_DEAD;
                }
            }
            break
        case FIGURE_ACTION_61_ENGINEER_ENTERING_EXITING:
            f.use_cross_country = 1;
            f.is_ghost = 1;
            if (figure_movement_move_ticks_cross_country(f, 1) == 1) {
                if (map_building_at(f.grid_offset) == f.building_id) {
                    f.state = FIGURE_STATE_DEAD;
                } else {
                    f.action_state = FIGURE_ACTION_62_ENGINEER_ROAMING;
                    figure_movement_init_roaming(f);
                    f.roam_length = 0;
                }
            }
            break
        case FIGURE_ACTION_62_ENGINEER_ROAMING:
            f.is_ghost = 0;
            f.roam_length++;
            if (f.roam_length >= f.max_roam_length) {
                let x_road: Ref<number>;
                let y_road: Ref<number>;
                if (map_closest_road_within_radius(b.x, b.y, b.size, 2, x_road, y_road)) {
                    f.action_state = FIGURE_ACTION_63_ENGINEER_RETURNING;
                    f.destination_x = x_road.v;
                    f.destination_y = y_road.v;
                } else {
                    f.state = FIGURE_STATE_DEAD;
                }
            }
            figure_movement_roam_ticks(f, 1);
            break
        case FIGURE_ACTION_63_ENGINEER_RETURNING:
            figure_movement_move_ticks(f, 1);
            if (f.direction == DIR_FIGURE_AT_DESTINATION) {
                f.action_state = FIGURE_ACTION_61_ENGINEER_ENTERING_EXITING;
                figure_movement_set_cross_country_destination(f, b.x, b.y);
                f.roam_length = 0;
            } else if (f.direction == DIR_FIGURE_REROUTE || f.direction == DIR_FIGURE_LOST) {
                f.state = FIGURE_STATE_DEAD;
            }
            break
    }
    figure_image_update(f, image_group(GROUP_FIGURE_ENGINEER));
}
function get_nearest_enemy(x: number, y: number, distance: Ref<number>) {
    let min_enemy_id: number = 0;
    let min_dist: number = 10000;
    for (let i: number = 1; i < MAX_FIGURES; i++) {
        let f: figure = figure_get(i);
        if (f.state != FIGURE_STATE_ALIVE || f.targeted_by_figure_id) {
            continue
        }
        let dist: number;
        if (f.type == FIGURE_RIOTER || f.type == FIGURE_ENEMY54_GLADIATOR) {
            dist = calc_maximum_distance(x, y, f.x, f.y);
        } else if (f.type == FIGURE_INDIGENOUS_NATIVE && f.action_state == FIGURE_ACTION_159_NATIVE_ATTACKING) {
            dist = calc_maximum_distance(x, y, f.x, f.y);
        } else if (figure_is_enemy(f)) {
            dist = 3 * calc_maximum_distance(x, y, f.x, f.y);
        } else if (f.type == FIGURE_WOLF) {
            dist = 4 * calc_maximum_distance(x, y, f.x, f.y);
        } else {
            continue
        }
        if (dist < min_dist) {
            min_dist = dist;
            min_enemy_id = i;
        }
    }
    distance.v = min_dist;
    return min_enemy_id;
}
function fight_enemy(f: figure) {
    if (!city_figures_has_security_breach() && enemy_army_total_enemy_formations() <= 0) {
        return 0;
    }
    switch (f.action_state) {
        case FIGURE_ACTION_150_ATTACK:
        case FIGURE_ACTION_149_CORPSE:
        case FIGURE_ACTION_70_PREFECT_CREATED:
        case FIGURE_ACTION_71_PREFECT_ENTERING_EXITING:
        case FIGURE_ACTION_74_PREFECT_GOING_TO_FIRE:
        case FIGURE_ACTION_75_PREFECT_AT_FIRE:
        case FIGURE_ACTION_76_PREFECT_GOING_TO_ENEMY:
        case FIGURE_ACTION_77_PREFECT_AT_ENEMY:
            return 0;
    }
    f.wait_ticks_next_target++;
    if (f.wait_ticks_next_target < 10) {
        return 0;
    }
    f.wait_ticks_next_target = 0;
    let distance: Ref<number> = new Ref(0);
    let enemy_id: number = get_nearest_enemy(f.x, f.y, distance);
    if (enemy_id > 0 && distance.v <= 30) {
        let enemy: figure = figure_get(enemy_id);
        f.wait_ticks_next_target = 0;
        f.action_state = FIGURE_ACTION_76_PREFECT_GOING_TO_ENEMY;
        f.destination_x = enemy.x;
        f.destination_y = enemy.y;
        f.target_figure_id = enemy_id;
        enemy.targeted_by_figure_id = f.id;
        f.target_figure_created_sequence = enemy.created_sequence;
        figure_route_remove(f);
        return 1;
    }
    return 0;
}
function fight_fire(f: figure) {
    if (building_list_burning_size() <= 0) {
        return 0;
    }
    switch (f.action_state) {
        case FIGURE_ACTION_150_ATTACK:
        case FIGURE_ACTION_149_CORPSE:
        case FIGURE_ACTION_70_PREFECT_CREATED:
        case FIGURE_ACTION_71_PREFECT_ENTERING_EXITING:
        case FIGURE_ACTION_74_PREFECT_GOING_TO_FIRE:
        case FIGURE_ACTION_75_PREFECT_AT_FIRE:
        case FIGURE_ACTION_76_PREFECT_GOING_TO_ENEMY:
        case FIGURE_ACTION_77_PREFECT_AT_ENEMY:
            return 0;
    }
    f.wait_ticks_missile++;
    if (f.wait_ticks_missile < 20) {
        return 0;
    }
    let distance: Ref<number>;
    let ruin_id: number = building_maintenance_get_closest_burning_ruin(f.x, f.y, distance);
    if (ruin_id > 0 && distance.v <= 25) {
        let ruin: building = building_get(ruin_id);
        f.wait_ticks_missile = 0;
        f.action_state = FIGURE_ACTION_74_PREFECT_GOING_TO_FIRE;
        f.destination_x = ruin.road_access_x;
        f.destination_y = ruin.road_access_y;
        f.destination_building_id = ruin_id;
        figure_route_remove(f);
        ruin.figure_id4 = f.id;
        return 1;
    }
    return 0;
}
function extinguish_fire(f: figure) {
    let burn: building = building_get(f.destination_building_id);
    let distance: number = calc_maximum_distance(f.x, f.y, burn.x, burn.y);
    if (burn.state == BUILDING_STATE_IN_USE && burn.type == BUILDING_BURNING_RUIN && distance < 2) {
        burn.fire_duration = 32;
        sound_effect_play(SOUND_EFFECT_FIRE_SPLASH);
    } else {
        f.wait_ticks = 1;
    }
    f.attack_direction = calc_general_direction(f.x, f.y, burn.x, burn.y);
    if (f.attack_direction >= 8) {
        f.attack_direction = 0;
    }
    f.wait_ticks--;
    if (f.wait_ticks <= 0) {
        f.wait_ticks_missile = 20;
        if (!fight_fire(f)) {
            let b: building = building_get(f.building_id);
            let x_road: Ref<number>
            let y_road: Ref<number>;
            if (map_closest_road_within_radius(b.x, b.y, b.size, 2, x_road, y_road)) {
                f.action_state = FIGURE_ACTION_73_PREFECT_RETURNING;
                f.destination_x = x_road.v;
                f.destination_y = y_road.v;
                figure_route_remove(f);
            } else {
                f.state = FIGURE_STATE_DEAD;
            }
        }
    }
}
function target_is_alive(f: figure) {
    if (f.target_figure_id <= 0) {
        return 0;
    }
    let target: figure = figure_get(f.target_figure_id);
    if (!figure_is_dead(target) && target.created_sequence == f.target_figure_created_sequence) {
        return 1;
    }
    return 0;
}
export function figure_prefect_action(f: figure) {
    let b: building = building_get(f.building_id);
    f.terrain_usage = TERRAIN_USAGE_ROADS;
    f.use_cross_country = 0;
    f.max_roam_length = 640;
    if (b.state != BUILDING_STATE_IN_USE || b.figure_id != f.id) {
        f.state = FIGURE_STATE_DEAD;
    }
    figure_image_increase_offset(f, 12);
    if (!fight_enemy(f)) {
        fight_fire(f);
    }
    switch (f.action_state) {
        case FIGURE_ACTION_150_ATTACK:
            figure_combat_handle_attack(f);
            break
        case FIGURE_ACTION_149_CORPSE:
            figure_combat_handle_corpse(f);
            break
        case FIGURE_ACTION_70_PREFECT_CREATED:
            f.is_ghost = 1;
            f.image_offset = 0;
            f.wait_ticks--;
            if (f.wait_ticks <= 0) {
                let x_road: Ref<number>;
                let y_road: Ref<number>;
                if (map_closest_road_within_radius(b.x, b.y, b.size, 2, x_road, y_road)) {
                    f.action_state = FIGURE_ACTION_71_PREFECT_ENTERING_EXITING;
                    figure_movement_set_cross_country_destination(f, x_road.v, y_road.v);
                    f.roam_length = 0;
                } else {
                    f.state = FIGURE_STATE_DEAD;
                }
            }
            break
        case FIGURE_ACTION_71_PREFECT_ENTERING_EXITING:
            f.use_cross_country = 1;
            f.is_ghost = 1;
            if (figure_movement_move_ticks_cross_country(f, 1) == 1) {
                if (map_building_at(f.grid_offset) == f.building_id) {
                    f.state = FIGURE_STATE_DEAD;
                } else {
                    f.action_state = FIGURE_ACTION_72_PREFECT_ROAMING;
                    figure_movement_init_roaming(f);
                    f.roam_length = 0;
                }
            }
            break
        case FIGURE_ACTION_72_PREFECT_ROAMING:
            f.is_ghost = 0;
            f.roam_length++;
            if (f.roam_length >= f.max_roam_length) {
                let x_road: Ref<number>
                let y_road: Ref<number>;
                if (map_closest_road_within_radius(b.x, b.y, b.size, 2, x_road, y_road)) {
                    f.action_state = FIGURE_ACTION_73_PREFECT_RETURNING;
                    f.destination_x = x_road.v;
                    f.destination_y = y_road.v;
                    figure_route_remove(f);
                } else {
                    f.state = FIGURE_STATE_DEAD;
                }
            }
            figure_movement_roam_ticks(f, 1);
            break
        case FIGURE_ACTION_73_PREFECT_RETURNING:
            figure_movement_move_ticks(f, 1);
            if (f.direction == DIR_FIGURE_AT_DESTINATION) {
                f.action_state = FIGURE_ACTION_71_PREFECT_ENTERING_EXITING;
                figure_movement_set_cross_country_destination(f, b.x, b.y);
                f.roam_length = 0;
            } else if (f.direction == DIR_FIGURE_REROUTE || f.direction == DIR_FIGURE_LOST) {
                f.state = FIGURE_STATE_DEAD;
            }
            break
        case FIGURE_ACTION_74_PREFECT_GOING_TO_FIRE:
            f.terrain_usage = TERRAIN_USAGE_ANY;
            figure_movement_move_ticks(f, 1);
            if (f.direction == DIR_FIGURE_AT_DESTINATION) {
                f.action_state = FIGURE_ACTION_75_PREFECT_AT_FIRE;
                figure_route_remove(f);
                f.roam_length = 0;
                f.wait_ticks = 50;
            } else if (f.direction == DIR_FIGURE_REROUTE || f.direction == DIR_FIGURE_LOST) {
                f.state = FIGURE_STATE_DEAD;
            }
            break
        case FIGURE_ACTION_75_PREFECT_AT_FIRE:
            extinguish_fire(f);
            break
        case FIGURE_ACTION_76_PREFECT_GOING_TO_ENEMY:
            f.terrain_usage = TERRAIN_USAGE_ANY;
            if (!target_is_alive(f)) {
                let x_road: Ref<number>
                let y_road: Ref<number>;
                if (map_closest_road_within_radius(b.x, b.y, b.size, 2, x_road, y_road)) {
                    f.action_state = FIGURE_ACTION_73_PREFECT_RETURNING;
                    f.destination_x = x_road.v;
                    f.destination_y = y_road.v;
                    figure_route_remove(f);
                    f.roam_length = 0;
                } else {
                    f.state = FIGURE_STATE_DEAD;
                }
            }
            figure_movement_move_ticks(f, 1);
            if (f.direction == DIR_FIGURE_AT_DESTINATION) {
                let target: figure = figure_get(f.target_figure_id);
                f.destination_x = target.x;
                f.destination_y = target.y;
                figure_route_remove(f);
            } else if (f.direction == DIR_FIGURE_REROUTE || f.direction == DIR_FIGURE_LOST) {
                f.state = FIGURE_STATE_DEAD;
            }
            break
    }
    let dir: number;
    if (f.action_state == FIGURE_ACTION_75_PREFECT_AT_FIRE ||
        f.action_state == FIGURE_ACTION_150_ATTACK) {
        dir = f.attack_direction;
    } else if (f.direction < 8) {
        dir = f.direction;
    } else {
        dir = f.previous_tile_direction;
    }
    dir = figure_image_normalize_direction(dir);
    switch (f.action_state) {
        case FIGURE_ACTION_74_PREFECT_GOING_TO_FIRE:
            f.image_id = image_group(GROUP_FIGURE_PREFECT_WITH_BUCKET) +
                dir + 8 * f.image_offset;
            break
        case FIGURE_ACTION_75_PREFECT_AT_FIRE:
            f.image_id = image_group(GROUP_FIGURE_PREFECT_WITH_BUCKET) +
                dir + 96 + 8 * (f.image_offset / 2);
            break
        case FIGURE_ACTION_150_ATTACK:
            if (f.attack_image_offset >= 12) {
                f.image_id = image_group(GROUP_FIGURE_PREFECT) +
                    104 + dir + 8 * ((f.attack_image_offset - 12) / 2);
            } else {
                f.image_id = image_group(GROUP_FIGURE_PREFECT) + 104 + dir;
            }
            break
        case FIGURE_ACTION_149_CORPSE:
            f.image_id = image_group(GROUP_FIGURE_PREFECT) +
                96 + figure_image_corpse_offset(f);
            break
        default:
            f.image_id = image_group(GROUP_FIGURE_PREFECT) +
                dir + 8 * f.image_offset
            break
    }
}
export function figure_worker_action(f: figure) {
    f.terrain_usage = TERRAIN_USAGE_ROADS;
    f.use_cross_country = 0;
    f.max_roam_length = 384;
    let b: building = building_get(f.building_id);
    if (b.state != BUILDING_STATE_IN_USE || b.figure_id != f.id) {
        f.state = FIGURE_STATE_DEAD;
    }
}
