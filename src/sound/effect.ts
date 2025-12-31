
;
import { set_sound_type, setting_sound } from 'game/settings';
import { sound_channel } from 'sound/channel';
import { sound_device_is_channel_playing, sound_device_play_channel, sound_device_set_channel_volume } from 'sound/device';
import SOUND_EFFECTS = set_sound_type.SOUND_EFFECTS;
import SOUND_CHANNEL_EFFECTS_MIN = sound_channel.SOUND_CHANNEL_EFFECTS_MIN;
import SOUND_CHANNEL_EFFECTS_MAX = sound_channel.SOUND_CHANNEL_EFFECTS_MAX;
import SOUND_CHANNEL_CITY_MAX = sound_channel.SOUND_CHANNEL_CITY_MAX;

export const enum sound_effect {
    SOUND_EFFECT_PANEL = 1,
    SOUND_EFFECT_SIDEBAR = 2,
    SOUND_EFFECT_ICON = 3,
    SOUND_EFFECT_BUILD = 4,
    SOUND_EFFECT_EXPLOSION = 5,
    SOUND_EFFECT_FANFARE = 6,
    SOUND_EFFECT_FANFARE_URGENT = 7,
    // battle effects
    SOUND_EFFECT_ARROW = 8,
    SOUND_EFFECT_ARROW_HIT = 9,
    SOUND_EFFECT_AXE = 10,
    SOUND_EFFECT_BALLISTA_SHOOT = 11,
    SOUND_EFFECT_BALLISTA_HIT_GROUND = 12,
    SOUND_EFFECT_BALLISTA_HIT_PERSON = 13,
    SOUND_EFFECT_CLUB = 14,
    SOUND_EFFECT_CAMEL = 15,
    SOUND_EFFECT_ELEPHANT = 16,
    SOUND_EFFECT_ELEPHANT_HIT = 17,
    SOUND_EFFECT_ELEPHANT_DIE = 18,
    SOUND_EFFECT_HORSE = 19,
    SOUND_EFFECT_HORSE2 = 20,
    SOUND_EFFECT_HORSE_MOVING = 21,
    SOUND_EFFECT_JAVELIN = 22,
    SOUND_EFFECT_LION_ATTACK = 23,
    SOUND_EFFECT_LION_DIE = 24,
    SOUND_EFFECT_MARCHING = 25,
    SOUND_EFFECT_SWORD = 26,
    SOUND_EFFECT_SWORD_SWING = 27,
    SOUND_EFFECT_LIGHT_SWORD = 28,
    SOUND_EFFECT_SPEAR = 29,
    SOUND_EFFECT_WOLF_ATTACK = 30,
    SOUND_EFFECT_WOLF_DIE = 31,
    SOUND_EFFECT_SOLDIER_DIE = 32, // 4x
    SOUND_EFFECT_CITIZEN_DIE = 36, // 4x
    SOUND_EFFECT_SHEEP_DIE = 40,
    SOUND_EFFECT_ZEBRA_DIE = 41,
    SOUND_EFFECT_WOLF_HOWL = 42,
    SOUND_EFFECT_FIRE_SPLASH = 43,
    SOUND_EFFECT_FORMATION_SHIELD = 44
};

export function sound_effect_set_volume(percentage: number) {
    for (let i: number = SOUND_CHANNEL_EFFECTS_MIN; i <= SOUND_CHANNEL_EFFECTS_MAX; i++) {
        sound_device_set_channel_volume(i, percentage);
    }
}
export function sound_effect_play(effect: number) {
    if (!setting_sound(SOUND_EFFECTS).enabled) {
        return;
    }
    if (sound_device_is_channel_playing(effect)) {
        return;
    }
    sound_device_play_channel(effect, setting_sound(SOUND_EFFECTS).volume);
}
