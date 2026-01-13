
import { city_figures_total_invading_enemies } from 'city/figures';
import { city_population } from 'city/population';
import { dir_get_file, localized } from 'core/dir';
import { set_sound_type, setting_sound } from 'game/settings';
import { sound_device_play_music, sound_device_set_music_volume, sound_device_stop_music } from 'sound/device';
import NOT_LOCALIZED = localized.NOT_LOCALIZED;

import SOUND_MUSIC = set_sound_type.SOUND_MUSIC;
export const enum track {
    TRACK_NONE = 0,
    TRACK_CITY_1 = 1,
    TRACK_CITY_2 = 2,
    TRACK_CITY_3 = 3,
    TRACK_CITY_4 = 4,
    TRACK_CITY_5 = 5,
    TRACK_COMBAT_SHORT = 6,
    TRACK_COMBAT_LONG = 7,
    TRACK_INTRO = 8,
    TRACK_MAX = 9,
}

import TRACK_NONE = track.TRACK_NONE
import TRACK_CITY_1 = track.TRACK_CITY_1
import TRACK_CITY_2 = track.TRACK_CITY_2
import TRACK_CITY_3 = track.TRACK_CITY_3
import TRACK_CITY_4 = track.TRACK_CITY_4
import TRACK_CITY_5 = track.TRACK_CITY_5
import TRACK_COMBAT_SHORT = track.TRACK_COMBAT_SHORT
import TRACK_COMBAT_LONG = track.TRACK_COMBAT_LONG
import TRACK_INTRO = track.TRACK_INTRO
import TRACK_MAX = track.TRACK_MAX

export class unnamed22_8 {
    public current_track: number = 0;
    public next_check: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.current_track = args[0]);
        args.length >= 2 && (this.next_check = args[1]);
    }
}
let data: unnamed22_8 = new unnamed22_8(TRACK_NONE, 0);
let tracks: string[] = [
    "",
    "wavs/ROME1.WAV",
    "wavs/ROME2.WAV",
    "wavs/ROME3.WAV",
    "wavs/ROME4.WAV",
    "wavs/ROME5.WAV",
    "wavs/Combat_Short.wav",
    "wavs/Combat_Long.wav",
    "wavs/setup.wav"
];
let mp3_tracks: string[] = [
    "mp3/ROME2.mp3",
    "mp3/ROME3.mp3",
    "mp3/ROME4.mp3",
    "mp3/ROME5.mp3",
    "mp3/Combat_Short.mp3",
    "mp3/Combat_Long.mp3",
    "mp3/setup.mp3"
];
export function sound_music_set_volume(percentage: number) {
    sound_device_set_music_volume(percentage);
}
function play_track(track: number) {
    sound_device_stop_music();
    if (track <= TRACK_NONE || track >= TRACK_MAX) {
        return;
    }
    let mp3_track: string = dir_get_file(mp3_tracks[track], NOT_LOCALIZED);
    let volume: number = setting_sound(SOUND_MUSIC).volume;
    if (!mp3_track || !sound_device_play_music(mp3_track, volume)) {
        sound_device_play_music(dir_get_file(tracks[track], NOT_LOCALIZED), volume);
    }
    data.current_track = track;
}
export function sound_music_play_intro() {
    if (setting_sound(SOUND_MUSIC).enabled) {
        play_track(TRACK_INTRO);
    }
}
export function sound_music_play_editor() {
    if (setting_sound(SOUND_MUSIC).enabled) {
        play_track(TRACK_CITY_1);
    }
}
export function sound_music_update(force: number) {
    if (data.next_check && !force) {
        --data.next_check;
        return;
    }
    if (!setting_sound(SOUND_MUSIC).enabled) {
        return;
    }
    let track: number;
    let population: number = city_population();
    let total_enemies: number = city_figures_total_invading_enemies();
    if (total_enemies >= 32) {
        track = TRACK_COMBAT_LONG;
    } else if (total_enemies > 0) {
        track = TRACK_COMBAT_SHORT;
    } else if (population < 1000) {
        track = TRACK_CITY_1;
    } else if (population < 2000) {
        track = TRACK_CITY_2;
    } else if (population < 5000) {
        track = TRACK_CITY_3;
    } else if (population < 7000) {
        track = TRACK_CITY_4;
    } else {
        track = TRACK_CITY_5;
    }
    if (track == data.current_track) {
        return;
    }
    play_track(track);
    data.next_check = 10;
}
export function sound_music_stop() {
    sound_device_stop_music();
    data.current_track = TRACK_NONE;
    data.next_check = 0;
}
