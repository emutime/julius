import { calc_general_direction, calc_maximum_distance } from 'core/calc';
import { figure_action } from 'figure/action';
import { figure, figure_get, figure_is_dead, figure_is_enemy, figure_is_herd, figure_is_legion, MAX_FIGURES } from 'figure/figure';
import { formation, formation_get, formation_type, formation_update_morale_after_death } from 'figure/formation';
import { figure_movement_advance_attack, figure_movement_can_launch_cross_country_missile } from 'figure/movement';
import { figure_category, figure_properties, figure_properties_for_type } from 'figure/properties';
import { figure_route_remove } from 'figure/route';
import { figure_play_die_sound, figure_play_hit_sound } from 'figure/sound';
import { figure_state, figure_type } from 'figure/type';
import { difficulty_adjust_wolf_attack } from 'game/difficulty';
import { map_figure_at } from 'map/figure';
import { map_point, map_point_store_result } from 'map/point';
import { sound_effect, sound_effect_play } from 'sound/effect';
import FIGURE_ACTION_80_SOLDIER_AT_REST = figure_action.FIGURE_ACTION_80_SOLDIER_AT_REST;
import FIGURE_ACTION_149_CORPSE = figure_action.FIGURE_ACTION_149_CORPSE;
import FIGURE_ACTION_150_ATTACK = figure_action.FIGURE_ACTION_150_ATTACK;
import FIGURE_ACTION_159_NATIVE_ATTACKING = figure_action.FIGURE_ACTION_159_NATIVE_ATTACKING;
import FIGURE_EXPLOSION = figure_type.FIGURE_EXPLOSION;
import FIGURE_FORT_LEGIONARY = figure_type.FIGURE_FORT_LEGIONARY;
import FIGURE_FORT_STANDARD = figure_type.FIGURE_FORT_STANDARD;
import FIGURE_TRADE_SHIP = figure_type.FIGURE_TRADE_SHIP;
import FIGURE_RIOTER = figure_type.FIGURE_RIOTER;
import FIGURE_FISHING_BOAT = figure_type.FIGURE_FISHING_BOAT;
import FIGURE_MAP_FLAG = figure_type.FIGURE_MAP_FLAG;
import FIGURE_FLOTSAM = figure_type.FIGURE_FLOTSAM;
import FIGURE_INDIGENOUS_NATIVE = figure_type.FIGURE_INDIGENOUS_NATIVE;
import FIGURE_TOWER_SENTRY = figure_type.FIGURE_TOWER_SENTRY;
import FIGURE_ENEMY_CAESAR_LEGIONARY = figure_type.FIGURE_ENEMY_CAESAR_LEGIONARY;
import FIGURE_NATIVE_TRADER = figure_type.FIGURE_NATIVE_TRADER;
import FIGURE_ARROW = figure_type.FIGURE_ARROW;
import FIGURE_JAVELIN = figure_type.FIGURE_JAVELIN;
import FIGURE_BOLT = figure_type.FIGURE_BOLT;
import FIGURE_BALLISTA = figure_type.FIGURE_BALLISTA;
import FIGURE_CREATURE = figure_type.FIGURE_CREATURE;
import FIGURE_FISH_GULLS = figure_type.FIGURE_FISH_GULLS;
import FIGURE_SHIPWRECK = figure_type.FIGURE_SHIPWRECK;
import FIGURE_SHEEP = figure_type.FIGURE_SHEEP;
import FIGURE_WOLF = figure_type.FIGURE_WOLF;
import FIGURE_ZEBRA = figure_type.FIGURE_ZEBRA;
import FIGURE_SPEAR = figure_type.FIGURE_SPEAR;
import FIGURE_STATE_ALIVE = figure_state.FIGURE_STATE_ALIVE;
import FIGURE_STATE_DEAD = figure_state.FIGURE_STATE_DEAD;
import FORMATION_COLUMN = formation_type.FORMATION_COLUMN;
import FORMATION_DOUBLE_LINE_1 = formation_type.FORMATION_DOUBLE_LINE_1;
import FORMATION_DOUBLE_LINE_2 = formation_type.FORMATION_DOUBLE_LINE_2;
import FIGURE_CATEGORY_INACTIVE = figure_category.FIGURE_CATEGORY_INACTIVE;
import FIGURE_CATEGORY_CITIZEN = figure_category.FIGURE_CATEGORY_CITIZEN;
import FIGURE_CATEGORY_ARMED = figure_category.FIGURE_CATEGORY_ARMED;
import FIGURE_CATEGORY_HOSTILE = figure_category.FIGURE_CATEGORY_HOSTILE;
import FIGURE_CATEGORY_CRIMINAL = figure_category.FIGURE_CATEGORY_CRIMINAL;
import FIGURE_CATEGORY_NATIVE = figure_category.FIGURE_CATEGORY_NATIVE;
import FIGURE_CATEGORY_ANIMAL = figure_category.FIGURE_CATEGORY_ANIMAL;
import SOUND_EFFECT_SWORD_SWING = sound_effect.SOUND_EFFECT_SWORD_SWING;
function is_attacking_native(f: figure) {
    return f.type == FIGURE_INDIGENOUS_NATIVE && f.action_state == FIGURE_ACTION_159_NATIVE_ATTACKING;
}
export function figure_combat_handle_corpse(f: figure) {
    if (f.wait_ticks < 0) {
        f.wait_ticks = 0;
    }
    f.wait_ticks++;
    if (f.wait_ticks >= 128) {
        f.wait_ticks = 127;
        f.state = FIGURE_STATE_DEAD;
    }
}
function attack_is_same_direction(dir1: number, dir2: number) {
    if (dir1 == dir2) {
        return 1;
    }
    let dir2_off: number = dir2 <= 0 ? 7 : dir2 - 1;
    if (dir1 == dir2_off) {
        return 1;
    }
    dir2_off = dir2 >= 7 ? 0 : dir2 + 1;
    if (dir1 == dir2_off) {
        return 1;
    }
    return 0;
}
function resume_activity_after_attack(f: figure) {
    f.num_attackers = 0;
    f.action_state = f.action_state_before_attack;
    f.opponent_id = 0;
    f.attacker_id1 = 0;
    f.attacker_id2 = 0;
    figure_route_remove(f);
}
function hit_opponent(f: figure) {
    let m: formation = formation_get(f.formation_id);
    let opponent: figure = figure_get(f.opponent_id);
    let opponent_formation: formation = formation_get(opponent.formation_id);
    let props: figure_properties = figure_properties_for_type(f.type);
    let opponent_props: figure_properties = figure_properties_for_type(opponent.type);
    let cat: number = opponent_props.category;
    if (cat == FIGURE_CATEGORY_CITIZEN || cat == FIGURE_CATEGORY_CRIMINAL) {
        f.attack_image_offset = 12;
    } else {
        f.attack_image_offset = 0;
    }
    let figure_attack: number = props.attack_value;
    let opponent_defense: number = opponent_props.defense_value;
    if (f.type == FIGURE_WOLF) {
        figure_attack = difficulty_adjust_wolf_attack(figure_attack);
    }
    if (opponent.opponent_id != f.id && m.figure_type != FIGURE_FORT_LEGIONARY &&
        attack_is_same_direction(f.attack_direction, opponent.attack_direction)) {
        figure_attack += 4
        sound_effect_play(SOUND_EFFECT_SWORD_SWING);
    }
    if (m.is_halted && m.figure_type == FIGURE_FORT_LEGIONARY &&
        attack_is_same_direction(f.attack_direction, m.direction)) {
        figure_attack += 4
    }
    if (opponent_formation.is_halted &&
        (opponent_formation.figure_type == FIGURE_FORT_LEGIONARY ||
            opponent_formation.figure_type == FIGURE_ENEMY_CAESAR_LEGIONARY)) {
        if (!attack_is_same_direction(opponent.attack_direction, opponent_formation.direction)) {
            opponent_defense -= 4
        } else if (opponent_formation.layout == FORMATION_COLUMN) {
            opponent_defense += 7
        } else if (opponent_formation.layout == FORMATION_DOUBLE_LINE_1 ||
            opponent_formation.layout == FORMATION_DOUBLE_LINE_2) {
            opponent_defense += 4
        }
    }
    let max_damage: number = opponent_props.max_damage;
    let net_attack: number = figure_attack - opponent_defense;
    if (net_attack < 0) {
        net_attack = 0;
    }
    opponent.damage += net_attack
    if (opponent.damage <= max_damage) {
        figure_play_hit_sound(f.type);
    } else {
        opponent.action_state = FIGURE_ACTION_149_CORPSE;
        opponent.wait_ticks = 0;
        figure_play_die_sound(opponent);
        formation_update_morale_after_death(opponent_formation);
    }
}
export function figure_combat_handle_attack(f: figure) {
    figure_movement_advance_attack(f);
    if (f.num_attackers == 0) {
        resume_activity_after_attack(f);
        return;
    }
    if (f.num_attackers == 1) {
        let target: figure = figure_get(f.opponent_id);
        if (figure_is_dead(target)) {
            resume_activity_after_attack(f);
            return;
        }
    } else if (f.num_attackers == 2) {
        if (figure_is_dead(figure_get(f.opponent_id))) {
            if (f.opponent_id == f.attacker_id1) {
                f.opponent_id = f.attacker_id2;
            } else if (f.opponent_id == f.attacker_id2) {
                f.opponent_id = f.attacker_id1;
            }
            if (figure_is_dead(figure_get(f.opponent_id))) {
                resume_activity_after_attack(f);
                return;
            }
            f.num_attackers = 1;
            f.attacker_id1 = f.opponent_id;
            f.attacker_id2 = 0;
        }
    }
    f.attack_image_offset++;
    if (f.attack_image_offset >= 24) {
        hit_opponent(f);
    }
}
export function figure_combat_get_target_for_soldier(x: number, y: number, max_distance: number) {
    let min_figure_id: number = 0;
    let min_distance: number = 10000;
    for (let i: number = 1; i < MAX_FIGURES; i++) {
        let f: figure = figure_get(i);
        if (figure_is_dead(f)) {
            continue
        }
        if (figure_is_enemy(f) || f.type == FIGURE_RIOTER || is_attacking_native(f)) {
            let distance: number = calc_maximum_distance(x, y, f.x, f.y);
            if (distance <= max_distance) {
                if (f.targeted_by_figure_id) {
                    distance *= 2
                }
                if (distance < min_distance) {
                    min_distance = distance;
                    min_figure_id = i;
                }
            }
        }
    }
    if (min_figure_id) {
        return min_figure_id;
    }
    for (let i: number = 1; i < MAX_FIGURES; i++) {
        let f: figure = figure_get(i);
        if (figure_is_dead(f)) {
            continue
        }
        if (figure_is_enemy(f) || f.type == FIGURE_RIOTER || is_attacking_native(f)) {
            return i;
        }
    }
    return 0;
}
export function figure_combat_get_target_for_wolf(x: number, y: number, max_distance: number) {
    let min_figure_id: number = 0;
    let min_distance: number = 10000;
    for (let i: number = 1; i < MAX_FIGURES; i++) {
        let f: figure = figure_get(i);
        if (figure_is_dead(f) || !f.type) {
            continue
        }
        switch (f.type) {
            case FIGURE_EXPLOSION:
            case FIGURE_FORT_STANDARD:
            case FIGURE_TRADE_SHIP:
            case FIGURE_FISHING_BOAT:
            case FIGURE_MAP_FLAG:
            case FIGURE_FLOTSAM:
            case FIGURE_SHIPWRECK:
            case FIGURE_INDIGENOUS_NATIVE:
            case FIGURE_TOWER_SENTRY:
            case FIGURE_NATIVE_TRADER:
            case FIGURE_ARROW:
            case FIGURE_JAVELIN:
            case FIGURE_BOLT:
            case FIGURE_BALLISTA:
            case FIGURE_CREATURE:
                continue
        }
        if (figure_is_enemy(f) || figure_is_herd(f)) {
            continue
        }
        if (figure_is_legion(f) && f.action_state == FIGURE_ACTION_80_SOLDIER_AT_REST) {
            continue
        }
        let distance: number = calc_maximum_distance(x, y, f.x, f.y);
        if (f.targeted_by_figure_id) {
            distance *= 2
        }
        if (distance < min_distance) {
            min_distance = distance;
            min_figure_id = i;
        }
    }
    if (min_distance <= max_distance && min_figure_id) {
        return min_figure_id;
    }
    return 0;
}
export function figure_combat_get_target_for_enemy(x: number, y: number) {
    let min_figure_id: number = 0;
    let min_distance: number = 10000;
    for (let i: number = 1; i < MAX_FIGURES; i++) {
        let f: figure = figure_get(i);
        if (figure_is_dead(f)) {
            continue
        }
        if (!f.targeted_by_figure_id && figure_is_legion(f)) {
            let distance: number = calc_maximum_distance(x, y, f.x, f.y);
            if (distance < min_distance) {
                min_distance = distance;
                min_figure_id = i;
            }
        }
    }
    if (min_figure_id) {
        return min_figure_id;
    }
    for (let i: number = 1; i < MAX_FIGURES; i++) {
        let f: figure = figure_get(i);
        if (figure_is_dead(f)) {
            continue
        }
        if (figure_is_legion(f)) {
            return i;
        }
    }
    return 0;
}
export function figure_combat_get_missile_target_for_soldier(shooter: figure, max_distance: number, tile: map_point) {
    let x: number = shooter.x;
    let y: number = shooter.y;
    let min_distance: number = max_distance;
    let min_figure: figure = null;
    for (let i: number = 1; i < MAX_FIGURES; i++) {
        let f: figure = figure_get(i);
        if (figure_is_dead(f)) {
            continue
        }
        if (figure_is_enemy(f) || figure_is_herd(f) || is_attacking_native(f)) {
            let distance: number = calc_maximum_distance(x, y, f.x, f.y);
            if (distance < min_distance && figure_movement_can_launch_cross_country_missile(x, y, f.x, f.y)) {
                min_distance = distance;
                min_figure = f;
            }
        }
    }
    if (min_figure) {
        map_point_store_result(min_figure.x, min_figure.y, tile);
        return min_figure.id;
    }
    return 0;
}
export function figure_combat_get_missile_target_for_enemy(enemy: figure, max_distance: number, attack_citizens: number, tile: map_point) {
    let x: number = enemy.x;
    let y: number = enemy.y;
    let min_figure: figure = null;
    let min_distance: number = max_distance;
    for (let i: number = 1; i < MAX_FIGURES; i++) {
        let f: figure = figure_get(i);
        if (figure_is_dead(f) || !f.type) {
            continue
        }
        switch (f.type) {
            case FIGURE_EXPLOSION:
            case FIGURE_FORT_STANDARD:
            case FIGURE_MAP_FLAG:
            case FIGURE_FLOTSAM:
            case FIGURE_INDIGENOUS_NATIVE:
            case FIGURE_NATIVE_TRADER:
            case FIGURE_ARROW:
            case FIGURE_JAVELIN:
            case FIGURE_BOLT:
            case FIGURE_BALLISTA:
            case FIGURE_CREATURE:
            case FIGURE_FISH_GULLS:
            case FIGURE_SHIPWRECK:
            case FIGURE_SHEEP:
            case FIGURE_WOLF:
            case FIGURE_ZEBRA:
            case FIGURE_SPEAR:
                continue
        }
        let distance: number;
        if (figure_is_legion(f)) {
            distance = calc_maximum_distance(x, y, f.x, f.y);
        } else if (attack_citizens && f.is_friendly) {
            distance = calc_maximum_distance(x, y, f.x, f.y) + 5;
        } else {
            continue
        }
        if (distance < min_distance && figure_movement_can_launch_cross_country_missile(x, y, f.x, f.y)) {
            min_distance = distance;
            min_figure = f;
        }
    }
    if (min_figure) {
        map_point_store_result(min_figure.x, min_figure.y, tile);
        return min_figure.id;
    }
    return 0;
}
export function figure_combat_attack_figure_at(f: figure, grid_offset: number) {
    let figure_category: number = figure_properties_for_type(f.type).category;
    if (figure_category <= FIGURE_CATEGORY_INACTIVE || figure_category >= FIGURE_CATEGORY_CRIMINAL ||
        f.action_state == FIGURE_ACTION_150_ATTACK) {
        return;
    }
    let guard: number = 0;
    let opponent_id: number = map_figure_at(grid_offset);
    while (1) {
        if (++guard >= MAX_FIGURES || opponent_id <= 0) {
            break;
        }
        let opponent: figure = figure_get(opponent_id);
        if (opponent_id == f.id) {
            opponent_id = opponent.next_figure_id_on_same_tile;
            continue;
        }

        let opponent_category: number = figure_properties_for_type(opponent.type).category;
        let attack: number = 0;
        if (opponent.state != FIGURE_STATE_ALIVE) {
            attack = 0;
        } else if (opponent.action_state == FIGURE_ACTION_149_CORPSE) {
            attack = 0;
        } else if (figure_category == FIGURE_CATEGORY_ARMED && opponent_category == FIGURE_CATEGORY_NATIVE) {
            if (opponent.action_state == FIGURE_ACTION_159_NATIVE_ATTACKING) {
                attack = 1;
            }
        } else if (figure_category == FIGURE_CATEGORY_ARMED && opponent_category == FIGURE_CATEGORY_CRIMINAL) {
            attack = 1;
        } else if (figure_category == FIGURE_CATEGORY_ARMED && opponent_category == FIGURE_CATEGORY_HOSTILE) {
            attack = 1;
        } else if (figure_category == FIGURE_CATEGORY_HOSTILE && opponent_category == FIGURE_CATEGORY_CITIZEN) {
            attack = 1;
        } else if (figure_category == FIGURE_CATEGORY_HOSTILE && opponent_category == FIGURE_CATEGORY_ARMED) {
            attack = 1;
        } else if (figure_category == FIGURE_CATEGORY_HOSTILE && opponent_category == FIGURE_CATEGORY_CRIMINAL) {
            attack = 1;
        } else if (figure_category == FIGURE_CATEGORY_ARMED && opponent_category == FIGURE_CATEGORY_ANIMAL) {
            attack = 1;
        } else if (figure_category == FIGURE_CATEGORY_HOSTILE && opponent_category == FIGURE_CATEGORY_ANIMAL) {
            attack = 1;
        }
        if (attack && opponent.action_state == FIGURE_ACTION_150_ATTACK && opponent.num_attackers >= 2) {
            attack = 0;
        }
        if (attack) {
            f.action_state_before_attack = f.action_state;
            f.action_state = FIGURE_ACTION_150_ATTACK;
            f.opponent_id = opponent_id;
            f.attacker_id1 = opponent_id;
            f.num_attackers = 1;
            f.attack_image_offset = 12;
            if (opponent.x != opponent.destination_x || opponent.y != opponent.destination_y) {
                f.attack_direction = calc_general_direction(f.previous_tile_x, f.previous_tile_y,
                    opponent.previous_tile_x, opponent.previous_tile_y);
            } else {
                f.attack_direction = calc_general_direction(f.previous_tile_x, f.previous_tile_y,
                    opponent.x, opponent.y);
            }
            if (f.attack_direction >= 8) {
                f.attack_direction = 0;
            }
            if (opponent.action_state != FIGURE_ACTION_150_ATTACK) {
                opponent.action_state_before_attack = opponent.action_state;
                opponent.action_state = FIGURE_ACTION_150_ATTACK;
                opponent.attack_image_offset = 0;
                opponent.attack_direction = (f.attack_direction + 4) % 8;
            }
            if (opponent.num_attackers == 0) {
                opponent.attacker_id1 = f.id;
                opponent.opponent_id = f.id;
                opponent.num_attackers = 1;
            } else if (opponent.num_attackers == 1) {
                opponent.attacker_id2 = f.id;
                opponent.num_attackers = 2;
            }
            return;
        }
        opponent_id = opponent.next_figure_id_on_same_tile;
    }
}
