import { city_figures_animals } from 'city/figures';
import { city_sound_update_march_wolf } from 'city/sound';
import { direction_type } from 'core/direction';
import { random_byte } from 'core/random';
import { figure_action } from 'figure/action';
import { figure_combat_get_target_for_wolf } from 'figure/combat';
import { figure, figure_create, figure_get } from 'figure/figure';
import { formation, formation_get, formation_set_destination, formation_set_home, MAX_FORMATION_FIGURES, MAX_FORMATIONS } from 'figure/formation';
import { formation_enemy_move_formation_to } from 'figure/formation_enemy';
import { figure_route_remove } from 'figure/route';
import { figure_state, figure_type } from 'figure/type';
import { map_desirability_get } from 'map/desirability';
import { GRID, map_grid_get_area, map_grid_height, map_grid_offset, map_grid_width } from 'map/grid';
import { map_soldier_strength_get } from 'map/soldier_strength';
import { map_terrain_is, terrain } from 'map/terrain';
import { sound_effect, sound_effect_play } from 'sound/effect';
import { Ref } from '../../ext/crt';
import DIR_0_TOP = direction_type.DIR_0_TOP;
import DIR_1_TOP_RIGHT = direction_type.DIR_1_TOP_RIGHT;
import DIR_2_RIGHT = direction_type.DIR_2_RIGHT;
import DIR_3_BOTTOM_RIGHT = direction_type.DIR_3_BOTTOM_RIGHT;
import DIR_4_BOTTOM = direction_type.DIR_4_BOTTOM;
import DIR_5_BOTTOM_LEFT = direction_type.DIR_5_BOTTOM_LEFT;
import DIR_6_LEFT = direction_type.DIR_6_LEFT;
import DIR_7_TOP_LEFT = direction_type.DIR_7_TOP_LEFT;
import FIGURE_ACTION_149_CORPSE = figure_action.FIGURE_ACTION_149_CORPSE;
import FIGURE_ACTION_150_ATTACK = figure_action.FIGURE_ACTION_150_ATTACK;
import FIGURE_ACTION_196_HERD_ANIMAL_AT_REST = figure_action.FIGURE_ACTION_196_HERD_ANIMAL_AT_REST;
import FIGURE_ACTION_199_WOLF_ATTACKING = figure_action.FIGURE_ACTION_199_WOLF_ATTACKING;
import FIGURE_SHEEP = figure_type.FIGURE_SHEEP;
import FIGURE_WOLF = figure_type.FIGURE_WOLF;
import FIGURE_ZEBRA = figure_type.FIGURE_ZEBRA;
import FIGURE_STATE_ALIVE = figure_state.FIGURE_STATE_ALIVE;
import GRID_SIZE = GRID.GRID_SIZE;
import TERRAIN_ACCESS_RAMP = terrain.TERRAIN_ACCESS_RAMP;
import TERRAIN_MEADOW = terrain.TERRAIN_MEADOW;
import TERRAIN_WALL = terrain.TERRAIN_WALL;
import TERRAIN_GATEHOUSE = terrain.TERRAIN_GATEHOUSE;
import TERRAIN_IMPASSABLE_WOLF = terrain.TERRAIN_IMPASSABLE_WOLF;
import SOUND_EFFECT_WOLF_HOWL = sound_effect.SOUND_EFFECT_WOLF_HOWL;
function get_free_tile(x: number, y: number, allow_negative_desirability: number, x_tile: Ref<number>, y_tile: Ref<number>) {
    let disallowed_terrain: number = ~(TERRAIN_ACCESS_RAMP | TERRAIN_MEADOW);
    let tile_found: number = 0;
    let x_found: number = 0
    let y_found: number = 0;
    let x_min: Ref<number> = new Ref(0);
    let y_min: Ref<number> = new Ref(0);
    let x_max: Ref<number> = new Ref(0);
    let y_max: Ref<number> = new Ref(0);
    map_grid_get_area(x, y, 1, 4, x_min, y_min, x_max, y_max);
    for (let yy: number = y_min.v; yy <= y_max.v; yy++) {
        for (let xx: number = x_min.v; xx <= x_max.v; xx++) {
            let grid_offset: number = map_grid_offset(xx, yy);
            if (!map_terrain_is(grid_offset, disallowed_terrain)) {
                if (map_soldier_strength_get(grid_offset)) {
                    return 0;
                }
                let desirability: number = map_desirability_get(grid_offset);
                if (allow_negative_desirability) {
                    if (desirability > 1) {
                        return 0;
                    }
                } else if (desirability) {
                    return 0;
                }
                tile_found = 1;
                x_found = xx;
                y_found = yy;
            }
        }
    }
    x_tile.v = x_found;
    y_tile.v = y_found;
    return tile_found;
}
function get_roaming_destination(formation_id: number, allow_negative_desirability: number, x: number, y: number, distance: number, direction: number, x_tile: Ref<number>, y_tile: Ref<number>) {
    let target_direction: number = (formation_id + random_byte()) & 6;
    if (direction) {
        target_direction = direction;
        allow_negative_desirability = 1;
    }
    for (let i: number = 0; i < 4; i++) {
        let x_target: number
        let y_target: number;
        switch (target_direction) {
            case DIR_0_TOP:
                x_target = x;
                y_target = y - distance;
                break
            case DIR_1_TOP_RIGHT:
                x_target = x + distance;
                y_target = y - distance;
                break
            case DIR_2_RIGHT:
                x_target = x + distance;
                y_target = y;
                break
            case DIR_3_BOTTOM_RIGHT:
                x_target = x + distance;
                y_target = y + distance;
                break
            case DIR_4_BOTTOM:
                x_target = x;
                y_target = y + distance;
                break
            case DIR_5_BOTTOM_LEFT:
                x_target = x - distance;
                y_target = y + distance;
                break
            case DIR_6_LEFT:
                x_target = x - distance;
                y_target = y;
                break
            case DIR_7_TOP_LEFT:
                x_target = x - distance;
                y_target = y - distance;
                break
            default:
                continue
        }
        if (x_target <= 0) {
            x_target = 1;
        } else if (y_target <= 0) {
            y_target = 1;
        } else if (x_target >= map_grid_width() - 1) {
            x_target = map_grid_width() - 2;
        } else if (y_target >= map_grid_height() - 1) {
            y_target = map_grid_height() - 2;
        }
        if (get_free_tile(x_target, y_target, allow_negative_desirability, x_tile, y_tile)) {
            return 1;
        }
        target_direction += 2
        if (target_direction > 6) {
            target_direction = 0;
        }
    }
    return 0;
}
function move_animals(m: formation, attacking_animals: number) {
    for (let i: number = 0; i < MAX_FORMATION_FIGURES; i++) {
        if (m.figures[i] <= 0) {
            continue
        }
        let f: figure = figure_get(m.figures[i]);
        if (f.action_state == FIGURE_ACTION_149_CORPSE ||
            f.action_state == FIGURE_ACTION_150_ATTACK) {
            continue
        }
        f.wait_ticks = 401;
        if (attacking_animals) {
            let target_id: number = figure_combat_get_target_for_wolf(f.x, f.y, 6);
            if (target_id) {
                let target: figure = figure_get(target_id);
                f.action_state = FIGURE_ACTION_199_WOLF_ATTACKING;
                f.destination_x = target.x;
                f.destination_y = target.y;
                f.target_figure_id = target_id;
                target.targeted_by_figure_id = f.id;
                f.target_figure_created_sequence = target.created_sequence;
                figure_route_remove(f);
            } else {
                f.action_state = FIGURE_ACTION_196_HERD_ANIMAL_AT_REST;
            }
        } else {
            f.action_state = FIGURE_ACTION_196_HERD_ANIMAL_AT_REST;
        }
    }
}
function can_spawn_wolf(m: formation) {
    if (m.num_figures < m.max_figures && m.figure_type == FIGURE_WOLF) {
        m.herd_wolf_spawn_delay++;
        if (m.herd_wolf_spawn_delay > 32) {
            m.herd_wolf_spawn_delay = 0;
            return 1;
        }
    }
    return 0;
}
function update_herd_formation(m: formation) {
    if (can_spawn_wolf(m)) {
        if (!map_terrain_is(map_grid_offset(m.x, m.y), TERRAIN_IMPASSABLE_WOLF)) {
            let wolf: figure = figure_create(m.figure_type, m.x, m.y, DIR_0_TOP);
            wolf.action_state = FIGURE_ACTION_196_HERD_ANIMAL_AT_REST;
            wolf.formation_id = m.id;
            wolf.wait_ticks = wolf.id & 0x1f;
        }
    }
    let attacking_animals: number = 0;
    for (let fig: number = 0; fig < MAX_FORMATION_FIGURES; fig++) {
        let figure_id: number = m.figures[fig];
        if (figure_id > 0 && figure_get(figure_id).action_state == FIGURE_ACTION_150_ATTACK) {
            attacking_animals++;
        }
    }
    if (m.missile_attack_timeout) {
        attacking_animals = 1;
    }
    if (m.figures[0]) {
        let f: figure = figure_get(m.figures[0]);
        if (f.state == FIGURE_STATE_ALIVE) {
            formation_set_home(m, f.x, f.y);
        }
    }
    let roam_distance: number;
    let roam_delay: number;
    let allow_negative_desirability: number;
    switch (m.figure_type) {
        case FIGURE_SHEEP:
            roam_distance = 8;
            roam_delay = 20;
            allow_negative_desirability = 0;
            attacking_animals = 0;
            break
        case FIGURE_ZEBRA:
            roam_distance = 20;
            roam_delay = 4;
            allow_negative_desirability = 0;
            attacking_animals = 0;
            break
        case FIGURE_WOLF:
            roam_distance = 16;
            roam_delay = 6;
            allow_negative_desirability = 1;
            break
        default:
            return
    }
    m.wait_ticks++;
    if (m.wait_ticks > roam_delay || attacking_animals) {
        m.wait_ticks = 0;
        if (attacking_animals) {
            formation_set_destination(m, m.x_home, m.y_home);
            move_animals(m, attacking_animals);
        } else {
            let x_tile = new Ref(0);
            let y_tile = new Ref(0);
            if (get_roaming_destination(m.id, allow_negative_desirability, m.x_home, m.y_home,
                roam_distance, m.herd_direction, x_tile, y_tile)) {
                m.herd_direction = 0;
                if (formation_enemy_move_formation_to(m, x_tile.v, y_tile.v, x_tile, y_tile)) {
                    formation_set_destination(m, x_tile.v, y_tile.v);
                    if (m.figure_type == FIGURE_WOLF && city_sound_update_march_wolf()) {
                        sound_effect_play(SOUND_EFFECT_WOLF_HOWL);
                    }
                    move_animals(m, attacking_animals);
                }
            }
        }
    }
}
export function formation_herd_update() {
    if (city_figures_animals() <= 0) {
        return;
    }
    for (let i: number = 1; i < MAX_FORMATIONS; i++) {
        let m: formation = formation_get(i);
        if (m.in_use && m.is_herd && !m.is_legion && m.num_figures > 0) {
            update_herd_formation(m);
        }
    }
}
