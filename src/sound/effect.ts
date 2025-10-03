
;
import { set_sound_type, setting_sound } from 'game/settings';
import { sound_channel } from 'sound/channel';
import { sound_device_is_channel_playing, sound_device_play_channel, sound_device_set_channel_volume } from 'sound/device';
import SOUND_EFFECTS = set_sound_type.SOUND_EFFECTS;
import SOUND_CHANNEL_EFFECTS_MIN = sound_channel.SOUND_CHANNEL_EFFECTS_MIN;
import SOUND_CHANNEL_EFFECTS_MAX = sound_channel.SOUND_CHANNEL_EFFECTS_MAX;
import SOUND_CHANNEL_CITY_MAX = sound_channel.SOUND_CHANNEL_CITY_MAX;
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
