
;
import { city_figures_enemies, city_figures_soldiers } from 'city/figures';
import { city_sound_update_die_citizen, city_sound_update_die_soldier, city_sound_update_hit_axe, city_sound_update_hit_club, city_sound_update_hit_elephant, city_sound_update_hit_soldier, city_sound_update_hit_spear, city_sound_update_hit_wolf } from 'city/sound';
import { figure, figure_is_enemy, figure_is_legion } from 'figure/figure';
import { figure_type } from 'figure/type';
import { sound_effect, sound_effect_play } from 'sound/effect';
import { sound_speech_play_file } from 'sound/speech';
import FIGURE_PREFECT = figure_type.FIGURE_PREFECT;
import FIGURE_FORT_JAVELIN = figure_type.FIGURE_FORT_JAVELIN;
import FIGURE_FORT_MOUNTED = figure_type.FIGURE_FORT_MOUNTED;
import FIGURE_FORT_LEGIONARY = figure_type.FIGURE_FORT_LEGIONARY;
import FIGURE_GLADIATOR = figure_type.FIGURE_GLADIATOR;
import FIGURE_LION_TAMER = figure_type.FIGURE_LION_TAMER;
import FIGURE_TRADE_CARAVAN = figure_type.FIGURE_TRADE_CARAVAN;
import FIGURE_TRADE_CARAVAN_DONKEY = figure_type.FIGURE_TRADE_CARAVAN_DONKEY;
import FIGURE_INDIGENOUS_NATIVE = figure_type.FIGURE_INDIGENOUS_NATIVE;
import FIGURE_TOWER_SENTRY = figure_type.FIGURE_TOWER_SENTRY;
import FIGURE_ENEMY43_SPEAR = figure_type.FIGURE_ENEMY43_SPEAR;
import FIGURE_ENEMY44_SWORD = figure_type.FIGURE_ENEMY44_SWORD;
import FIGURE_ENEMY45_SWORD = figure_type.FIGURE_ENEMY45_SWORD;
import FIGURE_ENEMY46_CAMEL = figure_type.FIGURE_ENEMY46_CAMEL;
import FIGURE_ENEMY47_ELEPHANT = figure_type.FIGURE_ENEMY47_ELEPHANT;
import FIGURE_ENEMY48_CHARIOT = figure_type.FIGURE_ENEMY48_CHARIOT;
import FIGURE_ENEMY49_FAST_SWORD = figure_type.FIGURE_ENEMY49_FAST_SWORD;
import FIGURE_ENEMY50_SWORD = figure_type.FIGURE_ENEMY50_SWORD;
import FIGURE_ENEMY51_SPEAR = figure_type.FIGURE_ENEMY51_SPEAR;
import FIGURE_ENEMY52_MOUNTED_ARCHER = figure_type.FIGURE_ENEMY52_MOUNTED_ARCHER;
import FIGURE_ENEMY53_AXE = figure_type.FIGURE_ENEMY53_AXE;
import FIGURE_ENEMY54_GLADIATOR = figure_type.FIGURE_ENEMY54_GLADIATOR;
import FIGURE_ENEMY_CAESAR_JAVELIN = figure_type.FIGURE_ENEMY_CAESAR_JAVELIN;
import FIGURE_ENEMY_CAESAR_MOUNTED = figure_type.FIGURE_ENEMY_CAESAR_MOUNTED;
import FIGURE_ENEMY_CAESAR_LEGIONARY = figure_type.FIGURE_ENEMY_CAESAR_LEGIONARY;
import FIGURE_NATIVE_TRADER = figure_type.FIGURE_NATIVE_TRADER;
import FIGURE_SHEEP = figure_type.FIGURE_SHEEP;
import FIGURE_WOLF = figure_type.FIGURE_WOLF;
import FIGURE_ZEBRA = figure_type.FIGURE_ZEBRA;
import SOUND_EFFECT_AXE = sound_effect.SOUND_EFFECT_AXE;
import SOUND_EFFECT_CLUB = sound_effect.SOUND_EFFECT_CLUB;
import SOUND_EFFECT_CAMEL = sound_effect.SOUND_EFFECT_CAMEL;
import SOUND_EFFECT_ELEPHANT = sound_effect.SOUND_EFFECT_ELEPHANT;
import SOUND_EFFECT_ELEPHANT_HIT = sound_effect.SOUND_EFFECT_ELEPHANT_HIT;
import SOUND_EFFECT_ELEPHANT_DIE = sound_effect.SOUND_EFFECT_ELEPHANT_DIE;
import SOUND_EFFECT_HORSE2 = sound_effect.SOUND_EFFECT_HORSE2;
import SOUND_EFFECT_LION_ATTACK = sound_effect.SOUND_EFFECT_LION_ATTACK;
import SOUND_EFFECT_LION_DIE = sound_effect.SOUND_EFFECT_LION_DIE;
import SOUND_EFFECT_SWORD = sound_effect.SOUND_EFFECT_SWORD;
import SOUND_EFFECT_SWORD_SWING = sound_effect.SOUND_EFFECT_SWORD_SWING;
import SOUND_EFFECT_LIGHT_SWORD = sound_effect.SOUND_EFFECT_LIGHT_SWORD;
import SOUND_EFFECT_SPEAR = sound_effect.SOUND_EFFECT_SPEAR;
import SOUND_EFFECT_WOLF_ATTACK = sound_effect.SOUND_EFFECT_WOLF_ATTACK;
import SOUND_EFFECT_WOLF_DIE = sound_effect.SOUND_EFFECT_WOLF_DIE;
import SOUND_EFFECT_SOLDIER_DIE = sound_effect.SOUND_EFFECT_SOLDIER_DIE;
import SOUND_EFFECT_CITIZEN_DIE = sound_effect.SOUND_EFFECT_CITIZEN_DIE;
import SOUND_EFFECT_SHEEP_DIE = sound_effect.SOUND_EFFECT_SHEEP_DIE;
import SOUND_EFFECT_ZEBRA_DIE = sound_effect.SOUND_EFFECT_ZEBRA_DIE;
export function figure_play_die_sound(f: figure) {
    let is_soldier: number = 0;
    let is_citizen: number = 0;
    switch (f.type) {
        case FIGURE_WOLF:
            sound_effect_play(SOUND_EFFECT_WOLF_DIE);
            break
        case FIGURE_SHEEP:
            sound_effect_play(SOUND_EFFECT_SHEEP_DIE);
            break
        case FIGURE_ZEBRA:
            sound_effect_play(SOUND_EFFECT_ZEBRA_DIE);
            break
        case FIGURE_LION_TAMER:
            sound_effect_play(SOUND_EFFECT_LION_DIE);
            break
        case FIGURE_ENEMY48_CHARIOT:
        case FIGURE_ENEMY52_MOUNTED_ARCHER:
            sound_effect_play(SOUND_EFFECT_HORSE2);
            break
        case FIGURE_ENEMY46_CAMEL:
            sound_effect_play(SOUND_EFFECT_CAMEL);
            break
        case FIGURE_ENEMY47_ELEPHANT:
            sound_effect_play(SOUND_EFFECT_ELEPHANT_DIE);
            break
        case FIGURE_NATIVE_TRADER:
        case FIGURE_TRADE_CARAVAN:
        case FIGURE_TRADE_CARAVAN_DONKEY:
            break
        case FIGURE_PREFECT:
        case FIGURE_FORT_JAVELIN:
        case FIGURE_FORT_MOUNTED:
        case FIGURE_FORT_LEGIONARY:
        case FIGURE_GLADIATOR:
        case FIGURE_INDIGENOUS_NATIVE:
        case FIGURE_TOWER_SENTRY:
        case FIGURE_ENEMY43_SPEAR:
        case FIGURE_ENEMY44_SWORD:
        case FIGURE_ENEMY45_SWORD:
        case FIGURE_ENEMY49_FAST_SWORD:
        case FIGURE_ENEMY50_SWORD:
        case FIGURE_ENEMY51_SPEAR:
        case FIGURE_ENEMY53_AXE:
        case FIGURE_ENEMY54_GLADIATOR:
        case FIGURE_ENEMY_CAESAR_JAVELIN:
        case FIGURE_ENEMY_CAESAR_MOUNTED:
        case FIGURE_ENEMY_CAESAR_LEGIONARY:
            is_soldier = 1;
            break
        default:
            is_citizen = 1
            break
    }
    if (is_soldier) {
        sound_effect_play(SOUND_EFFECT_SOLDIER_DIE + city_sound_update_die_soldier());
    } else if (is_citizen) {
        sound_effect_play(SOUND_EFFECT_CITIZEN_DIE + city_sound_update_die_citizen());
    }
    if (figure_is_enemy(f)) {
        if (city_figures_enemies() == 1) {
            sound_speech_play_file("wavs/army_war_cry.wav");
        }
    } else if (figure_is_legion(f)) {
        if (city_figures_soldiers() == 1) {
            sound_speech_play_file("wavs/barbarian_war_cry.wav");
        }
    }
}
export function figure_play_hit_sound(type: figure_type) {
    switch (type) {
        case FIGURE_FORT_LEGIONARY:
        case FIGURE_ENEMY_CAESAR_LEGIONARY:
            if (city_sound_update_hit_soldier()) {
                sound_effect_play(SOUND_EFFECT_SWORD);
            }
            break
        case FIGURE_FORT_MOUNTED:
        case FIGURE_ENEMY45_SWORD:
        case FIGURE_ENEMY48_CHARIOT:
        case FIGURE_ENEMY50_SWORD:
        case FIGURE_ENEMY52_MOUNTED_ARCHER:
        case FIGURE_ENEMY54_GLADIATOR:
            if (city_sound_update_hit_soldier()) {
                sound_effect_play(SOUND_EFFECT_SWORD_SWING);
            }
            break
        case FIGURE_FORT_JAVELIN:
            if (city_sound_update_hit_soldier()) {
                sound_effect_play(SOUND_EFFECT_LIGHT_SWORD);
            }
            break
        case FIGURE_ENEMY43_SPEAR:
        case FIGURE_ENEMY51_SPEAR:
            if (city_sound_update_hit_spear()) {
                sound_effect_play(SOUND_EFFECT_SPEAR);
            }
            break
        case FIGURE_ENEMY44_SWORD:
        case FIGURE_ENEMY49_FAST_SWORD:
            if (city_sound_update_hit_club()) {
                sound_effect_play(SOUND_EFFECT_CLUB);
            }
            break
        case FIGURE_ENEMY53_AXE:
            if (city_sound_update_hit_axe()) {
                sound_effect_play(SOUND_EFFECT_AXE);
            }
            break
        case FIGURE_ENEMY46_CAMEL:
            sound_effect_play(SOUND_EFFECT_CAMEL);
            break
        case FIGURE_ENEMY47_ELEPHANT:
            if (city_sound_update_hit_elephant()) {
                sound_effect_play(SOUND_EFFECT_ELEPHANT);
            } else {
                sound_effect_play(SOUND_EFFECT_ELEPHANT_HIT);
            }
            break
        case FIGURE_LION_TAMER:
            sound_effect_play(SOUND_EFFECT_LION_ATTACK);
            break
        case FIGURE_WOLF:
            if (city_sound_update_hit_wolf()) {
                sound_effect_play(SOUND_EFFECT_WOLF_ATTACK);
            }
            break
        default:
            break
    }
}
