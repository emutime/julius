
;
import { buffer } from 'core/buffer';
import { direction_type } from 'core/direction';
import DIR_FIGURE_AT_DESTINATION = direction_type.DIR_FIGURE_AT_DESTINATION;
import DIR_FIGURE_REROUTE = direction_type.DIR_FIGURE_REROUTE;
import DIR_FIGURE_LOST = direction_type.DIR_FIGURE_LOST;
import DIR_FIGURE_ATTACK = direction_type.DIR_FIGURE_ATTACK;
import { direction_type } from 'core/direction';
import { figure_action } from 'figure/action';
import FIGURE_ACTION_84_SOLDIER_AT_STANDARD = figure_action.FIGURE_ACTION_84_SOLDIER_AT_STANDARD;
import FIGURE_ACTION_148_FLEEING = figure_action.FIGURE_ACTION_148_FLEEING;
import FIGURE_ACTION_149_CORPSE = figure_action.FIGURE_ACTION_149_CORPSE;
import FIGURE_ACTION_150_ATTACK = figure_action.FIGURE_ACTION_150_ATTACK;
import FIGURE_ACTION_151_ENEMY_INITIAL = figure_action.FIGURE_ACTION_151_ENEMY_INITIAL;
import FIGURE_ACTION_152_ENEMY_WAITING = figure_action.FIGURE_ACTION_152_ENEMY_WAITING;
import FIGURE_ACTION_153_ENEMY_MARCHING = figure_action.FIGURE_ACTION_153_ENEMY_MARCHING;
import FIGURE_ACTION_154_ENEMY_FIGHTING = figure_action.FIGURE_ACTION_154_ENEMY_FIGHTING;
import FIGURE_ACTION_158_NATIVE_CREATED = figure_action.FIGURE_ACTION_158_NATIVE_CREATED;
import FIGURE_ACTION_159_NATIVE_ATTACKING = figure_action.FIGURE_ACTION_159_NATIVE_ATTACKING;
import { figure_type } from 'figure/type';
import FIGURE_ENEMY43_SPEAR = figure_type.FIGURE_ENEMY43_SPEAR;
import FIGURE_ENEMY46_CAMEL = figure_type.FIGURE_ENEMY46_CAMEL;
import FIGURE_ENEMY47_ELEPHANT = figure_type.FIGURE_ENEMY47_ELEPHANT;
import FIGURE_ENEMY48_CHARIOT = figure_type.FIGURE_ENEMY48_CHARIOT;
import FIGURE_ENEMY51_SPEAR = figure_type.FIGURE_ENEMY51_SPEAR;
import FIGURE_ENEMY52_MOUNTED_ARCHER = figure_type.FIGURE_ENEMY52_MOUNTED_ARCHER;
import FIGURE_ARROW = figure_type.FIGURE_ARROW;
import FIGURE_SPEAR = figure_type.FIGURE_SPEAR;
import { figure_type } from 'figure/type';
import { enemy_type } from 'figure/type';
import ENEMY_0_BARBARIAN = enemy_type.ENEMY_0_BARBARIAN;
import ENEMY_1_NUMIDIAN = enemy_type.ENEMY_1_NUMIDIAN;
import ENEMY_2_GAUL = enemy_type.ENEMY_2_GAUL;
import ENEMY_3_CELT = enemy_type.ENEMY_3_CELT;
import ENEMY_4_GOTH = enemy_type.ENEMY_4_GOTH;
import ENEMY_5_PERGAMUM = enemy_type.ENEMY_5_PERGAMUM;
import ENEMY_6_SELEUCID = enemy_type.ENEMY_6_SELEUCID;
import ENEMY_7_ETRUSCAN = enemy_type.ENEMY_7_ETRUSCAN;
import ENEMY_8_GREEK = enemy_type.ENEMY_8_GREEK;
import ENEMY_9_EGYPTIAN = enemy_type.ENEMY_9_EGYPTIAN;
import ENEMY_10_CARTHAGINIAN = enemy_type.ENEMY_10_CARTHAGINIAN;
import { figure_state } from 'figure/type';
import FIGURE_STATE_DEAD = figure_state.FIGURE_STATE_DEAD;
import { terrain_usage } from 'figure/type';
import TERRAIN_USAGE_ANY = terrain_usage.TERRAIN_USAGE_ANY;
import TERRAIN_USAGE_ENEMY = terrain_usage.TERRAIN_USAGE_ENEMY;
import { figure } from 'figure/figure';
import { figure_get } from 'figure/figure';
import { figure_is_dead } from 'figure/figure';
import { city_figures_add_enemy } from 'city/figures';
import { city_figures_add_imperial_soldier } from 'city/figures';
import { city_figures_set_gladiator_revolt } from 'city/figures';
import { city_figures_soldiers } from 'city/figures';
import { city_sound_update_march_enemy } from 'city/sound';
import { city_sound_update_march_horse } from 'city/sound';
import { city_sound_update_shoot_arrow } from 'city/sound';
import { calc_general_direction } from 'core/calc';
import { calc_missile_shooter_direction } from 'core/calc';
import { language_type } from 'core/locale';
import { encoding_type } from 'core/encoding';
import { group_terrain } from 'core/image_group';
import GROUP_FIGURE_GLADIATOR = group_terrain.GROUP_FIGURE_GLADIATOR;
import GROUP_BUILDING_FORT_LEGIONARY = group_terrain.GROUP_BUILDING_FORT_LEGIONARY;
import GROUP_FIGURE_CAESAR_LEGIONARY = group_terrain.GROUP_FIGURE_CAESAR_LEGIONARY;
import { color_t } from 'graphics/color';
import { image } from 'core/image';
import { image_group } from 'core/image';
import { map_point } from 'map/point';
import { map_point_get_last_result } from 'map/point';
import { figure_combat_handle_corpse } from 'figure/combat';
import { figure_combat_handle_attack } from 'figure/combat';
import { figure_combat_get_target_for_enemy } from 'figure/combat';
import { figure_combat_get_missile_target_for_enemy } from 'figure/combat';
import { formation } from 'figure/formation';
import FORMATION_COLUMN = formation.FORMATION_COLUMN;
import FORMATION_ENEMY_MOB = formation.FORMATION_ENEMY_MOB;
import FORMATION_ENEMY12 = formation.FORMATION_ENEMY12;
import { formation_state } from 'figure/formation';
import { formation } from 'figure/formation';
import { formation_get } from 'figure/formation';
import { formation_record_missile_fired } from 'figure/formation';
import { formation_rioter_get_target_building } from 'figure/formation_enemy';
import { formation_layout_position_x } from 'figure/formation_layout';
import { formation_layout_position_y } from 'figure/formation_layout';
import { figure_image_increase_offset } from 'figure/image';
import { figure_image_corpse_offset } from 'figure/image';
import { figure_image_missile_launcher_offset } from 'figure/image';
import { figure_image_normalize_direction } from 'figure/image';
import { figure_movement_move_ticks } from 'figure/movement';
import { figure_category } from 'figure/properties';
import { figure_properties } from 'figure/properties';
import { figure_properties_for_type } from 'figure/properties';
import { figure_route_remove } from 'figure/route';
import { figure_create_missile } from 'figuretype/missile';
import { map_figure_update } from 'map/figure';
import { scenario_gladiator_revolt_is_finished } from 'scenario/gladiator_revolt';
import { sound_effect } from 'sound/effect';
import SOUND_EFFECT_ARROW = sound_effect.SOUND_EFFECT_ARROW;
import SOUND_EFFECT_HORSE_MOVING = sound_effect.SOUND_EFFECT_HORSE_MOVING;
import SOUND_EFFECT_MARCHING = sound_effect.SOUND_EFFECT_MARCHING;
import { sound_effect_play } from 'sound/effect';
import { sound_speech_play_file } from 'sound/speech';
function enemy_initial(f: figure, m: formation) {
    map_figure_update(f);
    f.image_offset = 0;
    figure_route_remove(f);
    f.wait_ticks--;
    if (f.wait_ticks <= 0) {
        if (f.is_ghost && f.index_in_formation == 0 && m.figures[0] == f.id) {
            if (m.layout == FORMATION_ENEMY_MOB) {
                sound_speech_play_file("wavs/drums.wav");
            } else if (m.layout == FORMATION_ENEMY12) {
                sound_speech_play_file("wavs/horn2.wav");
            } else {
                sound_speech_play_file("wavs/horn1.wav");
            }
        }
        f.is_ghost = 0;
        if (m.recent_fight) {
            f.action_state = FIGURE_ACTION_154_ENEMY_FIGHTING;
        } else {
            f.destination_x = m.destination_x + f.formation_position_x.enemy;
            f.destination_y = m.destination_y + f.formation_position_y.enemy;
            if (calc_general_direction(f.x, f.y, f.destination_x, f.destination_y) < 8) {
                f.action_state = FIGURE_ACTION_153_ENEMY_MARCHING;
            }
        }
    }
    if (f.type == FIGURE_ENEMY43_SPEAR || f.type == FIGURE_ENEMY46_CAMEL ||
        f.type == FIGURE_ENEMY51_SPEAR || f.type == FIGURE_ENEMY52_MOUNTED_ARCHER) {
        f.wait_ticks_missile++;
        let tile: map_point = { 0, 0};
        if (f.wait_ticks_missile > figure_properties_for_type(f.type).missile_delay) {
            f.wait_ticks_missile = 0;
            if (figure_combat_get_missile_target_for_enemy(f, 10, city_figures_soldiers() < 4, tile)) {
                f.attack_image_offset = 1;
                f.direction = calc_missile_shooter_direction(f.x, f.y, tile.x, tile.y);
            } else {
                f.attack_image_offset = 0;
            }
        }
        if (f.attack_image_offset) {
            let missile_type: figure_type;
            switch (m.enemy_type) {
                case ENEMY_4_GOTH:
                case ENEMY_5_PERGAMUM:
                case ENEMY_9_EGYPTIAN:
                case ENEMY_10_CARTHAGINIAN:
                    missile_type = FIGURE_ARROW;
                    break
                default:
                    missile_type = FIGURE_SPEAR
                    break
            }
            if (f.attack_image_offset == 1) {
                if (tile.x == -1 || tile.y == -1) {
                    map_point_get_last_result(tile);
                }
                figure_create_missile(f.id, f.x, f.y, tile.x, tile.y, missile_type);
                formation_record_missile_fired(m);
            }
            if (missile_type == FIGURE_ARROW && city_sound_update_shoot_arrow()) {
                sound_effect_play(SOUND_EFFECT_ARROW);
            }
            f.attack_image_offset++;
            if (f.attack_image_offset > 100) {
                f.attack_image_offset = 0;
            }
        }
    }
}
function enemy_marching(f: figure, m: formation) {
    f.wait_ticks--;
    if (f.wait_ticks <= 0) {
        f.wait_ticks = 50;
        f.destination_x = m.destination_x + f.formation_position_x.enemy;
        f.destination_y = m.destination_y + f.formation_position_y.enemy;
        if (calc_general_direction(f.x, f.y, f.destination_x, f.destination_y) == DIR_FIGURE_AT_DESTINATION) {
            f.action_state = FIGURE_ACTION_151_ENEMY_INITIAL;
            return;
        }
        f.destination_building_id = m.destination_building_id;
        figure_route_remove(f);
    }
    figure_movement_move_ticks(f, f.speed_multiplier);
    if (f.direction == DIR_FIGURE_AT_DESTINATION ||
        f.direction == DIR_FIGURE_REROUTE ||
        f.direction == DIR_FIGURE_LOST) {
        f.action_state = FIGURE_ACTION_151_ENEMY_INITIAL;
    }
}
function enemy_fighting(f: figure, m: formation) {
    if (!m.recent_fight) {
        f.action_state = FIGURE_ACTION_151_ENEMY_INITIAL;
    }
    if (f.type != FIGURE_ENEMY46_CAMEL && f.type != FIGURE_ENEMY47_ELEPHANT) {
        if (f.type == FIGURE_ENEMY48_CHARIOT || f.type == FIGURE_ENEMY52_MOUNTED_ARCHER) {
            if (city_sound_update_march_horse()) {
                sound_effect_play(SOUND_EFFECT_HORSE_MOVING);
            }
        } else {
            if (city_sound_update_march_enemy()) {
                sound_effect_play(SOUND_EFFECT_MARCHING);
            }
        }
    }
    let target_id: number = f.target_figure_id;
    if (figure_is_dead(figure_get(target_id))) {
        f.target_figure_id = 0;
        target_id = 0;
    }
    if (target_id <= 0) {
        target_id = figure_combat_get_target_for_enemy(f.x, f.y);
        if (target_id) {
            let target: figure = figure_get(target_id);
            f.destination_x = target.x;
            f.destination_y = target.y;
            f.target_figure_id = target_id;
            f.target_figure_created_sequence = target.created_sequence;
            target.targeted_by_figure_id = f.id;
            figure_route_remove(f);
        }
    }
    if (target_id > 0) {
        figure_movement_move_ticks(f, f.speed_multiplier);
        if (f.direction == DIR_FIGURE_AT_DESTINATION) {
            let target: figure = figure_get(f.target_figure_id);
            f.destination_x = target.x;
            f.destination_y = target.y;
            figure_route_remove(f);
        } else if (f.direction == DIR_FIGURE_REROUTE || f.direction == DIR_FIGURE_LOST) {
            f.action_state = FIGURE_ACTION_151_ENEMY_INITIAL;
            f.target_figure_id = 0;
        }
    } else {
        f.action_state = FIGURE_ACTION_151_ENEMY_INITIAL;
        f.wait_ticks = 50;
    }
}
function enemy_action(f: figure, m: formation) {
    city_figures_add_enemy();
    f.terrain_usage = TERRAIN_USAGE_ENEMY;
    f.formation_position_x.enemy = formation_layout_position_x(m.layout, f.index_in_formation);
    f.formation_position_y.enemy = formation_layout_position_y(m.layout, f.index_in_formation);
    switch (f.action_state) {
        case FIGURE_ACTION_150_ATTACK:
            figure_combat_handle_attack(f);
            break
        case FIGURE_ACTION_149_CORPSE:
            figure_combat_handle_corpse(f);
            break
        case FIGURE_ACTION_148_FLEEING:
            f.destination_x = f.source_x;
            f.destination_y = f.source_y;
            figure_movement_move_ticks(f, f.speed_multiplier);
            if (f.direction == DIR_FIGURE_AT_DESTINATION ||
                f.direction == DIR_FIGURE_REROUTE ||
                f.direction == DIR_FIGURE_LOST) {
                f.state = FIGURE_STATE_DEAD;
            }
            break
        case FIGURE_ACTION_151_ENEMY_INITIAL:
            enemy_initial(f, m);
            break
        case FIGURE_ACTION_152_ENEMY_WAITING:
            map_figure_update(f);
            break
        case FIGURE_ACTION_153_ENEMY_MARCHING:
            enemy_marching(f, m);
            break
        case FIGURE_ACTION_154_ENEMY_FIGHTING:
            enemy_fighting(f, m);
            break
    }
}
function get_direction(f: figure) {
    let dir: number;
    if (f.action_state == FIGURE_ACTION_150_ATTACK) {
        dir = f.attack_direction;
    } else if (f.direction < 8) {
        dir = f.direction;
    } else {
        dir = f.previous_tile_direction;
    }
    return figure_image_normalize_direction(dir);
}
function get_missile_direction(f: figure, m: formation) {
    let dir: number;
    if (f.action_state == FIGURE_ACTION_150_ATTACK) {
        dir = f.attack_direction;
    } else if (m.missile_fired || f.direction < 8) {
        dir = f.direction;
    } else {
        dir = f.previous_tile_direction;
    }
    return figure_image_normalize_direction(dir);
}
export function figure_enemy43_spear_action(f: figure) {
    let m: formation = formation_get(f.formation_id);
    figure_image_increase_offset(f, 12);
    f.cart_image_id = 0;
    f.speed_multiplier = 1;
    enemy_action(f, m);
    let dir: number = get_missile_direction(f, m);
    f.is_enemy_image = 1;
    switch (m.enemy_type) {
        case ENEMY_5_PERGAMUM:
        case ENEMY_6_SELEUCID:
        case ENEMY_7_ETRUSCAN:
        case ENEMY_8_GREEK:
            break
        default:
            return
    }
    if (f.action_state == FIGURE_ACTION_150_ATTACK) {
        if (f.attack_image_offset >= 12) {
            f.image_id = 745 + dir + 8 * ((f.attack_image_offset - 12) / 2);
        } else {
            f.image_id = 745 + dir;
        }
    } else if (f.action_state == FIGURE_ACTION_151_ENEMY_INITIAL) {
        f.image_id = 697 + dir + 8 * figure_image_missile_launcher_offset(f);
    } else if (f.action_state == FIGURE_ACTION_149_CORPSE) {
        f.image_id = 793 + figure_image_corpse_offset(f);
    } else if (f.direction == DIR_FIGURE_ATTACK) {
        f.image_id = 745 + dir + 8 * (f.image_offset / 2);
    } else {
        f.image_id = 601 + dir + 8 * f.image_offset;
    }
}
export function figure_enemy44_sword_action(f: figure) {
    let m: formation = formation_get(f.formation_id);
    figure_image_increase_offset(f, 12);
    f.cart_image_id = 0;
    f.speed_multiplier = 1;
    enemy_action(f, m);
    let dir: number = get_direction(f);
    f.is_enemy_image = 1;
    switch (m.enemy_type) {
        case ENEMY_5_PERGAMUM:
        case ENEMY_6_SELEUCID:
        case ENEMY_9_EGYPTIAN:
            break
        default:
            return
    }
    if (f.action_state == FIGURE_ACTION_150_ATTACK) {
        if (f.attack_image_offset >= 12) {
            f.image_id = 545 + dir + 8 * ((f.attack_image_offset - 12) / 2);
        } else {
            f.image_id = 545 + dir;
        }
    } else if (f.action_state == FIGURE_ACTION_149_CORPSE) {
        f.image_id = 593 + figure_image_corpse_offset(f);
    } else if (f.direction == DIR_FIGURE_ATTACK) {
        f.image_id = 545 + dir + 8 * (f.image_offset / 2);
    } else {
        f.image_id = 449 + dir + 8 * f.image_offset;
    }
}
export function figure_enemy45_sword_action(f: figure) {
    let m: formation = formation_get(f.formation_id);
    figure_image_increase_offset(f, 12);
    f.cart_image_id = 0;
    f.speed_multiplier = 1;
    enemy_action(f, m);
    let dir: number = get_direction(f);
    f.is_enemy_image = 1;
    switch (m.enemy_type) {
        case ENEMY_7_ETRUSCAN:
        case ENEMY_8_GREEK:
        case ENEMY_10_CARTHAGINIAN:
            break
        default:
            return
    }
    if (f.action_state == FIGURE_ACTION_150_ATTACK) {
        if (f.attack_image_offset >= 12) {
            f.image_id = 545 + dir + 8 * ((f.attack_image_offset - 12) / 2);
        } else {
            f.image_id = 545 + dir;
        }
    } else if (f.action_state == FIGURE_ACTION_149_CORPSE) {
        f.image_id = 593 + figure_image_corpse_offset(f);
    } else if (f.direction == DIR_FIGURE_ATTACK) {
        f.image_id = 545 + dir + 8 * (f.image_offset / 2);
    } else {
        f.image_id = 449 + dir + 8 * f.image_offset;
    }
}
export function figure_enemy_camel_action(f: figure) {
    let m: formation = formation_get(f.formation_id);
    figure_image_increase_offset(f, 12);
    f.cart_image_id = 0;
    f.speed_multiplier = 1;
    enemy_action(f, m);
    let dir: number = get_missile_direction(f, m);
    f.is_enemy_image = 1;
    if (f.direction == DIR_FIGURE_ATTACK) {
        f.image_id = 601 + dir + 8 * f.image_offset;
    } else if (f.action_state == FIGURE_ACTION_150_ATTACK) {
        f.image_id = 601 + dir;
    } else if (f.action_state == FIGURE_ACTION_151_ENEMY_INITIAL) {
        f.image_id = 697 + dir + 8 * figure_image_missile_launcher_offset(f);
    } else if (f.action_state == FIGURE_ACTION_149_CORPSE) {
        f.image_id = 745 + figure_image_corpse_offset(f);
    } else {
        f.image_id = 601 + dir + 8 * f.image_offset;
    }
}
export function figure_enemy_elephant_action(f: figure) {
    figure_image_increase_offset(f, 12);
    f.cart_image_id = 0;
    f.speed_multiplier = 1;
    enemy_action(f, formation_get(f.formation_id));
    let dir: number = get_direction(f);
    f.is_enemy_image = 1;
    if (f.direction == DIR_FIGURE_ATTACK || f.action_state == FIGURE_ACTION_150_ATTACK) {
        f.image_id = 601 + dir + 8 * f.image_offset;
    } else if (f.action_state == FIGURE_ACTION_149_CORPSE) {
        f.image_id = 705 + figure_image_corpse_offset(f);
    } else {
        f.image_id = 601 + dir + 8 * f.image_offset;
    }
}
export function figure_enemy_chariot_action(f: figure) {
    figure_image_increase_offset(f, 12);
    f.cart_image_id = 0;
    f.speed_multiplier = 3;
    enemy_action(f, formation_get(f.formation_id));
    let dir: number = get_direction(f);
    f.is_enemy_image = 1;
    if (f.direction == DIR_FIGURE_ATTACK || f.action_state == FIGURE_ACTION_150_ATTACK) {
        f.image_id = 697 + dir + 8 * (f.image_offset / 2);
    } else if (f.action_state == FIGURE_ACTION_149_CORPSE) {
        f.image_id = 745 + figure_image_corpse_offset(f);
    } else {
        f.image_id = 601 + dir + 8 * f.image_offset;
    }
}
export function figure_enemy49_fast_sword_action(f: figure) {
    let m: formation = formation_get(f.formation_id);
    figure_image_increase_offset(f, 12);
    f.cart_image_id = 0;
    f.speed_multiplier = 2;
    enemy_action(f, m);
    let dir: number = get_direction(f);
    f.is_enemy_image = 1;
    let attack_id: number
    let corpse_id: number
    let normal_id: number;
    if (m.enemy_type == ENEMY_0_BARBARIAN) {
        attack_id = 393;
        corpse_id = 441;
        normal_id = 297;
    } else if (m.enemy_type == ENEMY_1_NUMIDIAN) {
        attack_id = 593;
        corpse_id = 641;
        normal_id = 449;
    } else if (m.enemy_type == ENEMY_4_GOTH) {
        attack_id = 545;
        corpse_id = 593;
        normal_id = 449;
    } else {
        return;
    }
    if (f.action_state == FIGURE_ACTION_150_ATTACK) {
        if (f.attack_image_offset >= 12) {
            f.image_id = attack_id + dir + 8 * ((f.attack_image_offset - 12) / 2);
        } else {
            f.image_id = attack_id + dir;
        }
    } else if (f.action_state == FIGURE_ACTION_149_CORPSE) {
        f.image_id = corpse_id + figure_image_corpse_offset(f);
    } else if (f.direction == DIR_FIGURE_ATTACK) {
        f.image_id = attack_id + dir + 8 * (f.image_offset / 2);
    } else {
        f.image_id = normal_id + dir + 8 * f.image_offset;
    }
}
export function figure_enemy50_sword_action(f: figure) {
    let m: formation = formation_get(f.formation_id);
    figure_image_increase_offset(f, 12);
    f.cart_image_id = 0;
    f.speed_multiplier = 1;
    enemy_action(f, m);
    let dir: number = get_direction(f);
    f.is_enemy_image = 1;
    if (m.enemy_type != ENEMY_2_GAUL && m.enemy_type != ENEMY_3_CELT) {
        return;
    }
    if (f.action_state == FIGURE_ACTION_150_ATTACK) {
        if (f.attack_image_offset >= 12) {
            f.image_id = 545 + dir + 8 * ((f.attack_image_offset - 12) / 2);
        } else {
            f.image_id = 545 + dir;
        }
    } else if (f.action_state == FIGURE_ACTION_149_CORPSE) {
        f.image_id = 593 + figure_image_corpse_offset(f);
    } else if (f.direction == DIR_FIGURE_ATTACK) {
        f.image_id = 545 + dir + 8 * (f.image_offset / 2);
    } else {
        f.image_id = 449 + dir + 8 * f.image_offset;
    }
}
export function figure_enemy51_spear_action(f: figure) {
    let m: formation = formation_get(f.formation_id);
    figure_image_increase_offset(f, 12);
    f.cart_image_id = 0;
    f.speed_multiplier = 2;
    enemy_action(f, m);
    let dir: number = get_missile_direction(f, m);
    f.is_enemy_image = 1;
    if (m.enemy_type != ENEMY_1_NUMIDIAN) {
        return;
    }
    if (f.action_state == FIGURE_ACTION_150_ATTACK) {
        if (f.attack_image_offset >= 12) {
            f.image_id = 593 + dir + 8 * ((f.attack_image_offset - 12) / 2);
        } else {
            f.image_id = 593 + dir;
        }
    } else if (f.action_state == FIGURE_ACTION_151_ENEMY_INITIAL) {
        f.image_id = 545 + dir + 8 * figure_image_missile_launcher_offset(f);
    } else if (f.action_state == FIGURE_ACTION_149_CORPSE) {
        f.image_id = 641 + figure_image_corpse_offset(f);
    } else if (f.direction == DIR_FIGURE_ATTACK) {
        f.image_id = 593 + dir + 8 * (f.image_offset / 2);
    } else {
        f.image_id = 449 + dir + 8 * f.image_offset;
    }
}
export function figure_enemy52_mounted_archer_action(f: figure) {
    let m: formation = formation_get(f.formation_id);
    figure_image_increase_offset(f, 12);
    f.cart_image_id = 0;
    f.speed_multiplier = 3;
    enemy_action(f, m);
    let dir: number = get_missile_direction(f, m);
    f.is_enemy_image = 1;
    if (f.direction == DIR_FIGURE_ATTACK) {
        f.image_id = 601 + dir + 8 * f.image_offset;
    } else if (f.action_state == FIGURE_ACTION_150_ATTACK) {
        f.image_id = 601 + dir;
    } else if (f.action_state == FIGURE_ACTION_151_ENEMY_INITIAL) {
        f.image_id = 697 + dir + 8 * figure_image_missile_launcher_offset(f);
    } else if (f.action_state == FIGURE_ACTION_149_CORPSE) {
        f.image_id = 745 + figure_image_corpse_offset(f);
    } else {
        f.image_id = 601 + dir + 8 * f.image_offset;
    }
}
export function figure_enemy53_axe_action(f: figure) {
    let m: formation = formation_get(f.formation_id);
    figure_image_increase_offset(f, 12);
    f.cart_image_id = 0;
    f.speed_multiplier = 1;
    enemy_action(f, m);
    let dir: number = get_direction(f);
    f.is_enemy_image = 1;
    if (m.enemy_type != ENEMY_2_GAUL) {
        return;
    }
    if (f.action_state == FIGURE_ACTION_150_ATTACK) {
        if (f.attack_image_offset >= 12) {
            f.image_id = 697 + dir + 8 * ((f.attack_image_offset - 12) / 2);
        } else {
            f.image_id = 697 + dir;
        }
    } else if (f.action_state == FIGURE_ACTION_149_CORPSE) {
        f.image_id = 745 + figure_image_corpse_offset(f);
    } else if (f.direction == DIR_FIGURE_ATTACK) {
        f.image_id = 697 + dir + 8 * (f.image_offset / 2);
    } else {
        f.image_id = 601 + dir + 8 * f.image_offset;
    }
}
export function figure_enemy_gladiator_action(f: figure) {
    f.terrain_usage = TERRAIN_USAGE_ANY;
    f.use_cross_country = 0;
    figure_image_increase_offset(f, 12);
    if (scenario_gladiator_revolt_is_finished()) {
        if (f.action_state != FIGURE_ACTION_149_CORPSE) {
            f.action_state = FIGURE_ACTION_149_CORPSE;
            f.wait_ticks = 0;
            f.direction = 0;
        }
    }
    switch (f.action_state) {
        case FIGURE_ACTION_150_ATTACK:
            figure_combat_handle_attack(f);
            figure_image_increase_offset(f, 16);
            break
        case FIGURE_ACTION_149_CORPSE:
            figure_combat_handle_corpse(f);
            break
        case FIGURE_ACTION_158_NATIVE_CREATED:
            f.image_offset = 0;
            f.wait_ticks++;
            if (f.wait_ticks > 10 + (f.id & 3)) {
                f.wait_ticks = 0;
                f.action_state = FIGURE_ACTION_159_NATIVE_ATTACKING;
                let x_tile: number
                let y_tile: number;
                let building_id: number = formation_rioter_get_target_building(x_tile, y_tile);
                if (building_id) {
                    f.destination_x = x_tile;
                    f.destination_y = y_tile;
                    f.destination_building_id = building_id;
                    figure_route_remove(f);
                } else {
                    f.state = FIGURE_STATE_DEAD;
                }
            }
            break
        case FIGURE_ACTION_159_NATIVE_ATTACKING:
            city_figures_set_gladiator_revolt();
            f.terrain_usage = TERRAIN_USAGE_ENEMY;
            figure_movement_move_ticks(f, 1);
            if (f.direction == DIR_FIGURE_AT_DESTINATION ||
                f.direction == DIR_FIGURE_REROUTE ||
                f.direction == DIR_FIGURE_LOST) {
                f.action_state = FIGURE_ACTION_158_NATIVE_CREATED;
            }
            break
    }
    let dir: number;
    if (f.action_state == FIGURE_ACTION_150_ATTACK || f.direction == DIR_FIGURE_ATTACK) {
        dir = f.attack_direction;
    } else if (f.direction < 8) {
        dir = f.direction;
    } else {
        dir = f.previous_tile_direction;
    }
    dir = figure_image_normalize_direction(dir);
    if (f.action_state == FIGURE_ACTION_150_ATTACK || f.direction == DIR_FIGURE_ATTACK) {
        f.image_id = image_group(GROUP_FIGURE_GLADIATOR) + dir + 104 + 8 * (f.image_offset / 2);
    } else if (f.action_state == FIGURE_ACTION_149_CORPSE) {
        f.image_id = image_group(GROUP_FIGURE_GLADIATOR) + 96 + figure_image_corpse_offset(f);
    } else {
        f.image_id = image_group(GROUP_FIGURE_GLADIATOR) + dir + 8 * f.image_offset;
    }
}
export function figure_enemy_caesar_legionary_action(f: figure) {
    let m: formation = formation_get(f.formation_id);
    city_figures_add_imperial_soldier();
    figure_image_increase_offset(f, 12);
    f.cart_image_id = 0;
    f.speed_multiplier = 1;
    enemy_action(f, m);
    let dir: number = get_direction(f);
    if (f.direction == DIR_FIGURE_ATTACK) {
        f.image_id = image_group(GROUP_FIGURE_CAESAR_LEGIONARY) + dir +
            8 * ((f.attack_image_offset - 12) / 2);
    }
    switch (f.action_state) {
        case FIGURE_ACTION_150_ATTACK:
            if (f.attack_image_offset >= 12) {
                f.image_id = image_group(GROUP_FIGURE_CAESAR_LEGIONARY) + dir +
                    8 * ((f.attack_image_offset - 12) / 2);
            } else {
                f.image_id = image_group(GROUP_FIGURE_CAESAR_LEGIONARY) + dir;
            }
            break
        case FIGURE_ACTION_149_CORPSE:
            f.image_id = image_group(GROUP_FIGURE_CAESAR_LEGIONARY) +
                figure_image_corpse_offset(f) + 152;
            break
        case FIGURE_ACTION_84_SOLDIER_AT_STANDARD:
            if (m.is_halted && m.layout == FORMATION_COLUMN && m.missile_attack_timeout) {
                f.image_id = image_group(GROUP_BUILDING_FORT_LEGIONARY) + dir + 144;
            } else {
                f.image_id = image_group(GROUP_BUILDING_FORT_LEGIONARY) + dir;
            }
            break
        default:
            f.image_id = image_group(GROUP_FIGURE_CAESAR_LEGIONARY) + 48 + dir + 8 * f.image_offset
            break
    }
}
