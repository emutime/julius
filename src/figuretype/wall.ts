import { building, building_get } from 'building/building';
import { building_state } from 'building/type';
import { city_view_orientation } from 'city/view';
import { calc_maximum_distance, calc_missile_shooter_direction } from 'core/calc';
import { direction_type } from 'core/direction';
import { image_group } from 'core/image';
import { group_terrain } from 'core/image_group';
import { figure_action } from 'figure/action';
import { figure_combat_get_missile_target_for_soldier, figure_combat_handle_attack, figure_combat_handle_corpse } from 'figure/combat';
import { enemy_army_total_enemy_formations } from 'figure/enemy_army';
import { MAX_FIGURES, figure, figure_get, figure_is_dead } from 'figure/figure';
import { figure_image_corpse_offset, figure_image_direction, figure_image_increase_offset } from 'figure/image';
import { figure_movement_move_ticks, figure_movement_move_ticks_tower_sentry } from 'figure/movement';
import { figure_properties_for_type } from 'figure/properties';
import { figure_route_remove } from 'figure/route';
import { figure_state, figure_type, terrain_usage } from 'figure/type';
import { figure_create_missile } from 'figuretype/missile';
import { map_figure_add, map_figure_delete } from 'map/figure';
import { map_grid_bound, map_grid_offset } from 'map/grid';
import { map_point } from 'map/point';
import { map_routing_is_wall_passable, map_routing_wall_tile_in_radius } from 'map/routing_terrain';
import { map_terrain_is, terrain } from 'map/terrain';
import { sound_effect, sound_effect_play } from 'sound/effect';
import DIR_0_TOP = direction_type.DIR_0_TOP;
import DIR_2_RIGHT = direction_type.DIR_2_RIGHT;
import DIR_4_BOTTOM = direction_type.DIR_4_BOTTOM;
import DIR_6_LEFT = direction_type.DIR_6_LEFT;
import DIR_FIGURE_AT_DESTINATION = direction_type.DIR_FIGURE_AT_DESTINATION;
import DIR_FIGURE_REROUTE = direction_type.DIR_FIGURE_REROUTE;
import DIR_FIGURE_LOST = direction_type.DIR_FIGURE_LOST;
import FIGURE_ACTION_149_CORPSE = figure_action.FIGURE_ACTION_149_CORPSE;
import FIGURE_ACTION_150_ATTACK = figure_action.FIGURE_ACTION_150_ATTACK;
import FIGURE_ACTION_170_TOWER_SENTRY_AT_REST = figure_action.FIGURE_ACTION_170_TOWER_SENTRY_AT_REST;
import FIGURE_ACTION_171_TOWER_SENTRY_PATROLLING = figure_action.FIGURE_ACTION_171_TOWER_SENTRY_PATROLLING;
import FIGURE_ACTION_172_TOWER_SENTRY_FIRING = figure_action.FIGURE_ACTION_172_TOWER_SENTRY_FIRING;
import FIGURE_ACTION_173_TOWER_SENTRY_RETURNING = figure_action.FIGURE_ACTION_173_TOWER_SENTRY_RETURNING;
import FIGURE_ACTION_174_TOWER_SENTRY_GOING_TO_TOWER = figure_action.FIGURE_ACTION_174_TOWER_SENTRY_GOING_TO_TOWER;
import FIGURE_ACTION_180_BALLISTA_CREATED = figure_action.FIGURE_ACTION_180_BALLISTA_CREATED;
import FIGURE_ACTION_181_BALLISTA_FIRING = figure_action.FIGURE_ACTION_181_BALLISTA_FIRING;
import FIGURE_TOWER_SENTRY = figure_type.FIGURE_TOWER_SENTRY;
import FIGURE_JAVELIN = figure_type.FIGURE_JAVELIN;
import FIGURE_BOLT = figure_type.FIGURE_BOLT;
import FIGURE_STATE_DEAD = figure_state.FIGURE_STATE_DEAD;
import TERRAIN_USAGE_ROADS = terrain_usage.TERRAIN_USAGE_ROADS;
import TERRAIN_USAGE_WALLS = terrain_usage.TERRAIN_USAGE_WALLS;
import BUILDING_STATE_IN_USE = building_state.BUILDING_STATE_IN_USE;
import GROUP_FIGURE_TOWER_SENTRY = group_terrain.GROUP_FIGURE_TOWER_SENTRY;
import GROUP_FIGURE_BALLISTA = group_terrain.GROUP_FIGURE_BALLISTA;
import TERRAIN_WALL = terrain.TERRAIN_WALL;
import TERRAIN_GATEHOUSE = terrain.TERRAIN_GATEHOUSE;
import SOUND_EFFECT_BALLISTA_SHOOT = sound_effect.SOUND_EFFECT_BALLISTA_SHOOT;
let BALLISTA_FIRING_OFFSETS: number[] = [
    0, 1, 2, 3, 4, 5, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];
let TOWER_SENTRY_FIRING_OFFSETS: number[] = [
    0, 1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];
export function figure_ballista_action(f: figure) {
    let b: building = building_get(f.building_id);
    f.terrain_usage = TERRAIN_USAGE_WALLS;
    f.use_cross_country = 0;
    f.is_ghost = 1;
    f.height_adjusted_ticks = 10;
    f.current_height = 45;
    if (b.state != BUILDING_STATE_IN_USE || b.figure_id4 != f.id) {
        f.state = FIGURE_STATE_DEAD;
    }
    if (b.num_workers <= 0 || b.figure_id <= 0) {
        f.state = FIGURE_STATE_DEAD;
    }
    map_figure_delete(f);
    switch (city_view_orientation()) {
        case DIR_0_TOP:
            f.x = b.x;
            f.y = b.y;
            break
        case DIR_2_RIGHT:
            f.x = b.x + 1;
            f.y = b.y;
            break
        case DIR_4_BOTTOM:
            f.x = b.x + 1;
            f.y = b.y + 1;
            break
        case DIR_6_LEFT:
            f.x = b.x;
            f.y = b.y + 1;
            break
    }
    f.grid_offset = map_grid_offset(f.x, f.y);
    map_figure_add(f);
    switch (f.action_state) {
        case FIGURE_ACTION_149_CORPSE:
            f.state = FIGURE_STATE_DEAD;
            break
        case FIGURE_ACTION_180_BALLISTA_CREATED:
            f.wait_ticks++;
            if (f.wait_ticks > 20) {
                f.wait_ticks = 0;
                let tile: map_point;
                if (figure_combat_get_missile_target_for_soldier(f, 15, tile)) {
                    f.action_state = FIGURE_ACTION_181_BALLISTA_FIRING;
                    f.wait_ticks_missile = figure_properties_for_type(f.type).missile_delay;
                }
            }
            break
        case FIGURE_ACTION_181_BALLISTA_FIRING:
            f.wait_ticks_missile++;
            if (f.wait_ticks_missile > figure_properties_for_type(f.type).missile_delay) {
                let tile: map_point;
                if (figure_combat_get_missile_target_for_soldier(f, 15, tile)) {
                    f.direction = calc_missile_shooter_direction(f.x, f.y, tile.x, tile.y);
                    f.wait_ticks_missile = 0;
                    figure_create_missile(f.id, f.x, f.y, tile.x, tile.y, FIGURE_BOLT);
                    sound_effect_play(SOUND_EFFECT_BALLISTA_SHOOT);
                } else {
                    f.action_state = FIGURE_ACTION_180_BALLISTA_CREATED;
                }
            }
            break
    }
    let dir: number = figure_image_direction(f);
    if (f.action_state == FIGURE_ACTION_181_BALLISTA_FIRING) {
        f.image_id = image_group(GROUP_FIGURE_BALLISTA) + dir +
            8 * BALLISTA_FIRING_OFFSETS[f.wait_ticks_missile / 4];
    } else {
        f.image_id = image_group(GROUP_FIGURE_BALLISTA) + dir;
    }
}
function tower_sentry_pick_target(f: figure) {
    if (enemy_army_total_enemy_formations() <= 0) {
        return;
    }
    if (f.action_state == FIGURE_ACTION_150_ATTACK ||
        f.action_state == FIGURE_ACTION_149_CORPSE) {
        return;
    }
    if (f.in_building_wait_ticks) {
        return;
    }
    f.wait_ticks_next_target++;
    if (f.wait_ticks_next_target >= 40) {
        f.wait_ticks_next_target = 0;
        let tile: map_point;
        if (figure_combat_get_missile_target_for_soldier(f, 10, tile)) {
            f.action_state = FIGURE_ACTION_172_TOWER_SENTRY_FIRING;
            f.destination_x = f.x;
            f.destination_y = f.y;
        }
    }
}
function tower_sentry_init_patrol(b: building, x_tile: Ref<number>, y_tile: Ref<number>) {
    let dir: number = b.figure_roam_direction;
    let x: number = b.x;
    let y: number = b.y;
    switch (dir) {
        case DIR_0_TOP:
            y -= 8
            break
        case DIR_2_RIGHT:
            x += 8
            break
        case DIR_4_BOTTOM:
            y += 8
            break
        case DIR_6_LEFT:
            x -= 8
            break
    }
    let x_ref: Ref<number> = new Ref(x);
    let y_ref: Ref<number> = new Ref(y);
    map_grid_bound(x_ref, y_ref);
    if (map_routing_wall_tile_in_radius(x_ref.v, y_ref.v, 6, x_tile, y_tile)) {
        b.figure_roam_direction += 2
        if (b.figure_roam_direction > 6) {
            b.figure_roam_direction = 0;
        }
        return 1;
    }
    for (let i: number = 0; i < 4; i++) {
        dir = b.figure_roam_direction;
        b.figure_roam_direction += 2
        if (b.figure_roam_direction > 6) {
            b.figure_roam_direction = 0;
        }
        x = b.x;
        y = b.y;
        switch (dir) {
            case DIR_0_TOP:
                y -= 3
                break
            case DIR_2_RIGHT:
                x += 3
                break
            case DIR_4_BOTTOM:
                y += 3
                break
            case DIR_6_LEFT:
                x -= 3
                break
        }
        x_ref = new Ref(x);
        y_ref = new Ref(y);
        map_grid_bound(x_ref, y_ref);
        if (map_routing_wall_tile_in_radius(x_ref.v, y_ref.v, 6, x_tile, y_tile)) {
            return 1;
        }
    }
    return 0;
}
export function figure_tower_sentry_action(f: figure) {
    let b: building = building_get(f.building_id);
    f.terrain_usage = TERRAIN_USAGE_WALLS;
    f.use_cross_country = 0;
    f.is_ghost = 1;
    f.height_adjusted_ticks = 10;
    f.max_roam_length = 800;
    if (b.state != BUILDING_STATE_IN_USE || b.figure_id != f.id) {
        f.state = FIGURE_STATE_DEAD;
    }
    figure_image_increase_offset(f, 12);
    tower_sentry_pick_target(f);
    switch (f.action_state) {
        case FIGURE_ACTION_150_ATTACK:
            figure_combat_handle_attack(f);
            break
        case FIGURE_ACTION_149_CORPSE:
            figure_combat_handle_corpse(f);
            break
        case FIGURE_ACTION_170_TOWER_SENTRY_AT_REST:
            f.image_offset = 0;
            f.wait_ticks++;
            if (f.wait_ticks > 40) {
                f.wait_ticks = 0;
                let x_tile: Ref<number> = new Ref(0);
                let y_tile: Ref<number> = new Ref(0);
                if (tower_sentry_init_patrol(b, x_tile, y_tile)) {
                    f.action_state = FIGURE_ACTION_171_TOWER_SENTRY_PATROLLING;
                    f.destination_x = x_tile.v;
                    f.destination_y = y_tile.v;
                    figure_route_remove(f);
                }
            }
            break
        case FIGURE_ACTION_171_TOWER_SENTRY_PATROLLING:
            figure_movement_move_ticks(f, 1);
            if (f.direction == DIR_FIGURE_AT_DESTINATION) {
                f.action_state = FIGURE_ACTION_173_TOWER_SENTRY_RETURNING;
                f.destination_x = f.source_x;
                f.destination_y = f.source_y;
                figure_route_remove(f);
            } else if (f.direction == DIR_FIGURE_REROUTE || f.direction == DIR_FIGURE_LOST) {
                f.action_state = FIGURE_ACTION_170_TOWER_SENTRY_AT_REST;
            }
            break
        case FIGURE_ACTION_172_TOWER_SENTRY_FIRING:
            figure_movement_move_ticks_tower_sentry(f, 1);
            f.wait_ticks_missile++;
            if (f.wait_ticks_missile > figure_properties_for_type(f.type).missile_delay) {
                let tile: map_point;
                if (figure_combat_get_missile_target_for_soldier(f, 10, tile)) {
                    f.direction = calc_missile_shooter_direction(f.x, f.y, tile.x, tile.y);
                    f.wait_ticks_missile = 0;
                    figure_create_missile(f.id, f.x, f.y, tile.x, tile.y, FIGURE_JAVELIN);
                } else {
                    f.action_state = FIGURE_ACTION_173_TOWER_SENTRY_RETURNING;
                    f.destination_x = f.source_x;
                    f.destination_y = f.source_y;
                    figure_route_remove(f);
                }
            }
            break
        case FIGURE_ACTION_173_TOWER_SENTRY_RETURNING:
            figure_movement_move_ticks(f, 1);
            if (f.direction == DIR_FIGURE_AT_DESTINATION) {
                f.action_state = FIGURE_ACTION_170_TOWER_SENTRY_AT_REST;
            } else if (f.direction == DIR_FIGURE_REROUTE || f.direction == DIR_FIGURE_LOST) {
                f.state = FIGURE_STATE_DEAD;
            }
            break
        case FIGURE_ACTION_174_TOWER_SENTRY_GOING_TO_TOWER:
            f.terrain_usage = TERRAIN_USAGE_ROADS;
            f.is_ghost = 0;
            f.height_adjusted_ticks = 0;
            figure_movement_move_ticks(f, 1);
            if (f.direction == DIR_FIGURE_AT_DESTINATION) {
                map_figure_delete(f);
                f.source_x = f.x = b.x;
                f.source_y = f.y = b.y;
                f.grid_offset = map_grid_offset(f.x, f.y);
                map_figure_add(f);
                f.action_state = FIGURE_ACTION_170_TOWER_SENTRY_AT_REST;
                figure_route_remove(f);
            } else if (f.direction == DIR_FIGURE_REROUTE || f.direction == DIR_FIGURE_LOST) {
                f.state = FIGURE_STATE_DEAD;
            }
            break
    }
    if (map_terrain_is(f.grid_offset, TERRAIN_WALL)) {
        f.current_height = 18;
    } else if (map_terrain_is(f.grid_offset, TERRAIN_GATEHOUSE)) {
        f.in_building_wait_ticks = 24;
    } else if (f.action_state != FIGURE_ACTION_174_TOWER_SENTRY_GOING_TO_TOWER) {
        f.state = FIGURE_STATE_DEAD;
    }
    if (f.in_building_wait_ticks) {
        f.in_building_wait_ticks--;
        f.height_adjusted_ticks = 0;
    }
    let dir: number = figure_image_direction(f);
    if (f.action_state == FIGURE_ACTION_149_CORPSE) {
        f.image_id = image_group(GROUP_FIGURE_TOWER_SENTRY) +
            136 + figure_image_corpse_offset(f);
    } else if (f.action_state == FIGURE_ACTION_172_TOWER_SENTRY_FIRING) {
        f.image_id = image_group(GROUP_FIGURE_TOWER_SENTRY) +
            dir + 96 + 8 * TOWER_SENTRY_FIRING_OFFSETS[f.wait_ticks_missile / 2];
    } else {
        f.image_id = image_group(GROUP_FIGURE_TOWER_SENTRY) +
            dir + 8 * f.image_offset;
    }
}
export function figure_tower_sentry_reroute() {
    for (let i: number = 1; i < MAX_FIGURES; i++) {
        let f: figure = figure_get(i);
        if (f.type != FIGURE_TOWER_SENTRY || map_routing_is_wall_passable(f.grid_offset)) {
            continue
        }
        let x_tile: Ref<number> = new Ref(0);
        let y_tile: Ref<number> = new Ref(0);
        if (map_routing_wall_tile_in_radius(f.x, f.y, 2, x_tile, y_tile)) {
            figure_route_remove(f);
            f.progress_on_tile = 0;
            map_figure_delete(f);
            f.previous_tile_x = f.x = x_tile.v;
            f.previous_tile_y = f.y = y_tile.v;
            f.cross_country_x = 15 * x_tile.v;
            f.cross_country_y = 15 * y_tile.v;
            f.grid_offset = map_grid_offset(x_tile.v, y_tile.v);
            map_figure_add(f);
            f.action_state = FIGURE_ACTION_173_TOWER_SENTRY_RETURNING;
            f.destination_x = f.source_x;
            f.destination_y = f.source_y;
        } else {
            map_figure_delete(f);
            let b: building = building_get(f.building_id);
            f.source_x = f.x = b.x;
            f.source_y = f.y = b.y;
            f.grid_offset = map_grid_offset(f.x, f.y);
            map_figure_add(f);
            f.action_state = FIGURE_ACTION_170_TOWER_SENTRY_AT_REST;
            figure_route_remove(f);
        }
    }
}
export function figure_kill_tower_sentries_at(x: number, y: number) {
    for (let i: number = 0; i < MAX_FIGURES; i++) {
        let f: figure = figure_get(i);
        if (!figure_is_dead(f) && f.type == FIGURE_TOWER_SENTRY) {
            if (calc_maximum_distance(f.x, f.y, x, y) <= 1) {
                f.state = FIGURE_STATE_DEAD;
            }
        }
    }
}
