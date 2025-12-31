
import { city_view_orientation } from 'city/view';
import { direction_type } from 'core/direction';
import { image_group } from 'core/image';
import { group_terrain } from 'core/image_group';
import { figure_action } from 'figure/action';
import { figure, figure_create, figure_get, figure_is_enemy } from 'figure/figure';
import { formation, formation_get, formation_record_missile_attack, formation_type, formation_update_morale_after_death } from 'figure/formation';
import { figure_movement_move_ticks_cross_country, figure_movement_set_cross_country_direction } from 'figure/movement';
import { figure_properties, figure_properties_for_type } from 'figure/properties';
import { figure_play_die_sound } from 'figure/sound';
import { figure_state, figure_type } from 'figure/type';
import { map_figure_foreach_until } from 'map/figure';
import { map_point } from 'map/point';
import { sound_effect, sound_effect_play } from 'sound/effect';
import DIR_0_TOP = direction_type.DIR_0_TOP;
import FIGURE_ACTION_149_CORPSE = figure_action.FIGURE_ACTION_149_CORPSE;
import FIGURE_ACTION_159_NATIVE_ATTACKING = figure_action.FIGURE_ACTION_159_NATIVE_ATTACKING;
import FIGURE_EXPLOSION = figure_type.FIGURE_EXPLOSION;
import FIGURE_FORT_LEGIONARY = figure_type.FIGURE_FORT_LEGIONARY;
import FIGURE_FORT_STANDARD = figure_type.FIGURE_FORT_STANDARD;
import FIGURE_MAP_FLAG = figure_type.FIGURE_MAP_FLAG;
import FIGURE_FLOTSAM = figure_type.FIGURE_FLOTSAM;
import FIGURE_INDIGENOUS_NATIVE = figure_type.FIGURE_INDIGENOUS_NATIVE;
import FIGURE_ENEMY_CAESAR_LEGIONARY = figure_type.FIGURE_ENEMY_CAESAR_LEGIONARY;
import FIGURE_BOLT = figure_type.FIGURE_BOLT;
import FIGURE_SHEEP = figure_type.FIGURE_SHEEP;
import FIGURE_WOLF = figure_type.FIGURE_WOLF;
import FIGURE_ZEBRA = figure_type.FIGURE_ZEBRA;
import FIGURE_STATE_DEAD = figure_state.FIGURE_STATE_DEAD;
import GROUP_FIGURE_EXPLOSION = group_terrain.GROUP_FIGURE_EXPLOSION;
import GROUP_FIGURE_MISSILE = group_terrain.GROUP_FIGURE_MISSILE;
import FORMATION_COLUMN = formation_type.FORMATION_COLUMN;
import SOUND_EFFECT_EXPLOSION = sound_effect.SOUND_EFFECT_EXPLOSION;
import SOUND_EFFECT_ARROW_HIT = sound_effect.SOUND_EFFECT_ARROW_HIT;
import SOUND_EFFECT_BALLISTA_HIT_GROUND = sound_effect.SOUND_EFFECT_BALLISTA_HIT_GROUND;
import SOUND_EFFECT_BALLISTA_HIT_PERSON = sound_effect.SOUND_EFFECT_BALLISTA_HIT_PERSON;
import SOUND_EFFECT_JAVELIN = sound_effect.SOUND_EFFECT_JAVELIN;
let CLOUD_TILE_OFFSETS: number[] = [0, 0, 0, 1, 1, 2];
let CLOUD_CC_OFFSETS: number[] = [0, 7, 14, 7, 14, 7];
let CLOUD_SPEED: number[] = [
    1, 2, 1, 3, 2, 1, 3, 2, 1, 1, 2, 1, 2, 1, 3, 1
];
let CLOUD_DIRECTION: map_point[] = [
    { x: 0, y: -6 }, { x: -2, y: -5 }, { x: -4, y: -4 }, { x: -5, y: -2 }, { x: -6, y: 0 }, { x: -5, y: -2 }, { x: -4, y: -4 }, { x: -2, y: -5 },
    { x: 0, y: -6 }, { x: -2, y: -5 }, { x: -4, y: -4 }, { x: -5, y: -2 }, { x: -6, y: 0 }, { x: -5, y: -2 }, { x: -4, y: -4 }, { x: -2, y: -5 }
];
let CLOUD_IMAGE_OFFSETS: number[] = [
    0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2,
    2, 2, 2, 2, 3, 3, 3, 4, 4, 5, 6, 7
];
export function figure_create_explosion_cloud(x: number, y: number, size: number) {
    let tile_offset: number = CLOUD_TILE_OFFSETS[size];
    let cc_offset: number = CLOUD_CC_OFFSETS[size];
    for (let i: number = 0; i < 16; i++) {
        let f: figure = figure_create(FIGURE_EXPLOSION,
            x + tile_offset, y + tile_offset, DIR_0_TOP);
        if (f.id) {
            f.cross_country_x += cc_offset
            f.cross_country_y += cc_offset
            f.destination_x += CLOUD_DIRECTION[i].x
            f.destination_y += CLOUD_DIRECTION[i].y
            figure_movement_set_cross_country_direction(f,
                f.cross_country_x, f.cross_country_y,
                15 * f.destination_x + cc_offset,
                15 * f.destination_y + cc_offset, 0);
            f.speed_multiplier = CLOUD_SPEED[i];
        }
    }
    sound_effect_play(SOUND_EFFECT_EXPLOSION);
}
export function figure_create_missile(building_id: number, x: number, y: number, x_dst: number, y_dst: number, type: figure_type) {
    let f: figure = figure_create(type, x, y, DIR_0_TOP);
    if (f.id) {
        f.missile_damage = type == FIGURE_BOLT ? 60 : 10;
        f.building_id = building_id;
        f.destination_x = x_dst;
        f.destination_y = y_dst;
        figure_movement_set_cross_country_direction(
            f, f.cross_country_x, f.cross_country_y,
            15 * x_dst, 15 * y_dst, 1);
    }
}
function is_citizen(f: figure) {
    if (f.action_state != FIGURE_ACTION_149_CORPSE) {
        if (f.type && f.type != FIGURE_EXPLOSION && f.type != FIGURE_FORT_STANDARD &&
            f.type != FIGURE_MAP_FLAG && f.type != FIGURE_FLOTSAM && f.type < FIGURE_INDIGENOUS_NATIVE) {
            return f.id;
        }
    }
    return 0;
}
function get_citizen_on_tile(grid_offset: number) {
    return map_figure_foreach_until(grid_offset, is_citizen);
}
function is_non_citizen(f: figure) {
    if (f.action_state == FIGURE_ACTION_149_CORPSE) {
        return 0;
    }
    if (figure_is_enemy(f)) {
        return f.id;
    }
    if (f.type == FIGURE_INDIGENOUS_NATIVE && f.action_state == FIGURE_ACTION_159_NATIVE_ATTACKING) {
        return f.id;
    }
    if (f.type == FIGURE_WOLF || f.type == FIGURE_SHEEP || f.type == FIGURE_ZEBRA) {
        return f.id;
    }
    return 0;
}
function get_non_citizen_on_tile(grid_offset: number) {
    return map_figure_foreach_until(grid_offset, is_non_citizen);
}
export function figure_explosion_cloud_action(f: figure) {
    f.use_cross_country = 1;
    f.progress_on_tile++;
    if (f.progress_on_tile > 44) {
        f.state = FIGURE_STATE_DEAD;
    }
    figure_movement_move_ticks_cross_country(f, f.speed_multiplier);
    if (f.progress_on_tile < 48) {
        f.image_id = image_group(GROUP_FIGURE_EXPLOSION) +
            CLOUD_IMAGE_OFFSETS[f.progress_on_tile / 2];
    } else {
        f.image_id = image_group(GROUP_FIGURE_EXPLOSION) + 7;
    }
}
function missile_hit_target(f: figure, target_id: number, legionary_type: figure_type) {
    let target: figure = figure_get(target_id);
    let target_props: figure_properties = figure_properties_for_type(target.type);
    let max_damage: number = target_props.max_damage;
    let damage_inflicted: number = figure_properties_for_type(f.type).missile_attack_value -
        target_props.missile_defense_value;
    let m: formation = formation_get(target.formation_id);
    if (damage_inflicted < 0) {
        damage_inflicted = 0;
    }
    if (target.type == legionary_type && m.is_halted && m.layout == FORMATION_COLUMN) {
        damage_inflicted = 1;
    }
    let target_damage: number = damage_inflicted + target.damage;
    if (target_damage <= max_damage) {
        target.damage = target_damage;
    } else {
        target.damage = max_damage + 1;
        target.action_state = FIGURE_ACTION_149_CORPSE;
        target.wait_ticks = 0;
        figure_play_die_sound(target);
        formation_update_morale_after_death(m);
    }
    f.state = FIGURE_STATE_DEAD;
    let missile_formation: number = figure_get(f.building_id).formation_id;
    formation_record_missile_attack(m, missile_formation);
}
export function figure_arrow_action(f: figure) {
    f.use_cross_country = 1;
    f.progress_on_tile++;
    if (f.progress_on_tile > 120) {
        f.state = FIGURE_STATE_DEAD;
    }
    let should_die: number = figure_movement_move_ticks_cross_country(f, 4);
    let target_id: number = get_citizen_on_tile(f.grid_offset);
    if (target_id) {
        missile_hit_target(f, target_id, FIGURE_FORT_LEGIONARY);
        sound_effect_play(SOUND_EFFECT_ARROW_HIT);
    } else if (should_die) {
        f.state = FIGURE_STATE_DEAD;
    }
    let dir: number = (16 + f.direction - 2 * city_view_orientation()) % 16;
    f.image_id = image_group(GROUP_FIGURE_MISSILE) + 16 + dir;
}
export function figure_spear_action(f: figure) {
    f.use_cross_country = 1;
    f.progress_on_tile++;
    if (f.progress_on_tile > 120) {
        f.state = FIGURE_STATE_DEAD;
    }
    let should_die: number = figure_movement_move_ticks_cross_country(f, 4);
    let target_id: number = get_citizen_on_tile(f.grid_offset);
    if (target_id) {
        missile_hit_target(f, target_id, FIGURE_FORT_LEGIONARY);
        sound_effect_play(SOUND_EFFECT_JAVELIN);
    } else if (should_die) {
        f.state = FIGURE_STATE_DEAD;
    }
    let dir: number = (16 + f.direction - 2 * city_view_orientation()) % 16;
    f.image_id = image_group(GROUP_FIGURE_MISSILE) + dir;
}
export function figure_javelin_action(f: figure) {
    f.use_cross_country = 1;
    f.progress_on_tile++;
    if (f.progress_on_tile > 120) {
        f.state = FIGURE_STATE_DEAD;
    }
    let should_die: number = figure_movement_move_ticks_cross_country(f, 4);
    let target_id: number = get_non_citizen_on_tile(f.grid_offset);
    if (target_id) {
        missile_hit_target(f, target_id, FIGURE_ENEMY_CAESAR_LEGIONARY);
        sound_effect_play(SOUND_EFFECT_JAVELIN);
    } else if (should_die) {
        f.state = FIGURE_STATE_DEAD;
    }
    let dir: number = (16 + f.direction - 2 * city_view_orientation()) % 16;
    f.image_id = image_group(GROUP_FIGURE_MISSILE) + dir;
}
export function figure_bolt_action(f: figure) {
    f.use_cross_country = 1;
    f.progress_on_tile++;
    if (f.progress_on_tile > 120) {
        f.state = FIGURE_STATE_DEAD;
    }
    let should_die: number = figure_movement_move_ticks_cross_country(f, 4);
    let target_id: number = get_non_citizen_on_tile(f.grid_offset);
    if (target_id) {
        let target: figure = figure_get(target_id);
        let target_props: figure_properties = figure_properties_for_type(target.type);
        let max_damage: number = target_props.max_damage;
        let damage_inflicted: number = figure_properties_for_type(f.type).missile_attack_value -
            target_props.missile_defense_value;
        if (damage_inflicted < 0) {
            damage_inflicted = 0;
        }
        let target_damage: number = damage_inflicted + target.damage;
        if (target_damage <= max_damage) {
            target.damage = target_damage;
        } else {
            target.damage = max_damage + 1;
            target.action_state = FIGURE_ACTION_149_CORPSE;
            target.wait_ticks = 0;
            figure_play_die_sound(target);
            formation_update_morale_after_death(formation_get(target.formation_id));
        }
        sound_effect_play(SOUND_EFFECT_BALLISTA_HIT_PERSON);
        f.state = FIGURE_STATE_DEAD;
    } else if (should_die) {
        f.state = FIGURE_STATE_DEAD;
        sound_effect_play(SOUND_EFFECT_BALLISTA_HIT_GROUND);
    }
    let dir: number = (16 + f.direction - 2 * city_view_orientation()) % 16;
    f.image_id = image_group(GROUP_FIGURE_MISSILE) + 32 + dir;
}
