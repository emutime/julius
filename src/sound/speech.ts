
import { dir_get_file, localized } from 'core/dir';
import { set_sound_type, setting_sound } from 'game/settings';
import { sound_channel } from 'sound/channel';
import { sound_device_play_file_on_channel, sound_device_set_channel_volume, sound_device_stop_channel } from 'sound/device';
import MAY_BE_LOCALIZED = localized.MAY_BE_LOCALIZED;
;
import SOUND_SPEECH = set_sound_type.SOUND_SPEECH;
import SOUND_CHANNEL_SPEECH = sound_channel.SOUND_CHANNEL_SPEECH;
import SOUND_CHANNEL_CITY_MAX = sound_channel.SOUND_CHANNEL_CITY_MAX;
export function sound_speech_set_volume(percentage: number) {
    sound_device_set_channel_volume(SOUND_CHANNEL_SPEECH, percentage);
}
export function sound_speech_play_file(filename: string) {
    if (!setting_sound(SOUND_SPEECH).enabled) {
        return;
    }
    sound_device_stop_channel(SOUND_CHANNEL_SPEECH);
    let cased_filename: string = dir_get_file(filename, MAY_BE_LOCALIZED);
    if (cased_filename) {
        sound_device_play_file_on_channel(cased_filename, SOUND_CHANNEL_SPEECH, setting_sound(SOUND_SPEECH).volume);
    }
}
export function sound_speech_stop() {
    sound_device_stop_channel(SOUND_CHANNEL_SPEECH);
}
