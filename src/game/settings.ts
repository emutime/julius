export const MAX_PLAYER_NAME = 32;
export const MAX_PERSONAL_SAVINGS = 100;
export const INF_SIZE = 560;

export const enum set_tooltips {
    TOOLTIPS_NONE = 0,
    TOOLTIPS_SOME = 1,
    TOOLTIPS_FULL = 2
};

export const enum set_difficulty {
    DIFFICULTY_VERY_EASY = 0,
    DIFFICULTY_EASY = 1,
    DIFFICULTY_NORMAL = 2,
    DIFFICULTY_HARD = 3,
    DIFFICULTY_VERY_HARD = 4
};

export const enum set_sound_type {
    SOUND_MUSIC = 1,
    SOUND_SPEECH = 2,
    SOUND_EFFECTS = 3,
    SOUND_CITY = 4,
};
import TOOLTIPS_NONE = set_tooltips.TOOLTIPS_NONE;
import TOOLTIPS_SOME = set_tooltips.TOOLTIPS_SOME;
import TOOLTIPS_FULL = set_tooltips.TOOLTIPS_FULL;

import DIFFICULTY_VERY_EASY = set_difficulty.DIFFICULTY_VERY_EASY;
import DIFFICULTY_HARD = set_difficulty.DIFFICULTY_HARD;
import DIFFICULTY_VERY_HARD = set_difficulty.DIFFICULTY_VERY_HARD;

import SOUND_MUSIC = set_sound_type.SOUND_MUSIC;
import SOUND_SPEECH = set_sound_type.SOUND_SPEECH;
import SOUND_EFFECTS = set_sound_type.SOUND_EFFECTS;
import SOUND_CITY = set_sound_type.SOUND_CITY;
export class set_sound {
    public enabled: number = 0;
    public volume: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.enabled = args[0]);
        args.length >= 2 && (this.volume = args[1]);
    }
}
import { advisor_type } from 'city/constants';
import ADVISOR_NONE = advisor_type.ADVISOR_NONE;
import ADVISOR_LABOR = advisor_type.ADVISOR_LABOR;
import ADVISOR_CHIEF = advisor_type.ADVISOR_CHIEF;
import { buffer } from 'core/buffer';
import { buffer_init } from 'core/buffer';
import { buffer_write_u8 } from 'core/buffer';
import { buffer_write_i32 } from 'core/buffer';
import { buffer_write_raw } from 'core/buffer';
import { buffer_read_u8 } from 'core/buffer';
import { buffer_read_i32 } from 'core/buffer';
import { buffer_read_raw } from 'core/buffer';
import { buffer_skip } from 'core/buffer';
import { buffer_at_end } from 'core/buffer';
import { direction_type } from 'core/direction';
import { calc_bound } from 'core/calc';
import { localized } from 'core/dir';
import NOT_LOCALIZED = localized.NOT_LOCALIZED;
import { dir_listing } from 'core/dir';
import { io_read_file_into_buffer } from 'core/io';
import { io_write_buffer_to_file } from 'core/io';
import { string_copy } from 'core/string';
export class unnamed13_8 {
    public fullscreen: number = 0;
    public window_width: number = 0;
    public window_height: number = 0;
    public sound_effects: set_sound = null;
    public sound_music: set_sound = null;
    public sound_speech: set_sound = null;
    public sound_city: set_sound = null;
    public game_speed: number = 0;
    public scroll_speed: number = 0;
    public difficulty: set_difficulty = null;
    public tooltips: set_tooltips = null;
    public monthly_autosave: number = 0;
    public warnings: number = 0;
    public gods_enabled: number = 0;
    public victory_video: number = 0;
    public last_advisor: number = 0;
    public player_name: number[] = new Array(MAX_PLAYER_NAME).fill(0);
    public personal_savings: number[] = new Array(MAX_PERSONAL_SAVINGS).fill(0);
    public inf_file: number[] = new Array(INF_SIZE).fill(0);
    public constructor(...args: any[]) {
        args.length >= 1 && (this.fullscreen = args[0]);
        args.length >= 2 && (this.window_width = args[1]);
        args.length >= 3 && (this.window_height = args[2]);
        args.length >= 4 && (this.sound_effects = args[3]);
        args.length >= 5 && (this.sound_music = args[4]);
        args.length >= 6 && (this.sound_speech = args[5]);
        args.length >= 7 && (this.sound_city = args[6]);
        args.length >= 8 && (this.game_speed = args[7]);
        args.length >= 9 && (this.scroll_speed = args[8]);
        args.length >= 10 && (this.difficulty = args[9]);
        args.length >= 11 && (this.tooltips = args[10]);
        args.length >= 12 && (this.monthly_autosave = args[11]);
        args.length >= 13 && (this.warnings = args[12]);
        args.length >= 14 && (this.gods_enabled = args[13]);
        args.length >= 15 && (this.victory_video = args[14]);
        args.length >= 16 && (this.last_advisor = args[15]);
        args.length >= 17 && (this.player_name = args[16]);
        args.length >= 18 && (this.personal_savings = args[17]);
        args.length >= 19 && (this.inf_file = args[18]);
    }
}
let data: unnamed13_8 = new unnamed13_8();
function load_default_settings() {
    data.fullscreen = 1;
    data.window_width = 800;
    data.window_height = 600;
    data.sound_effects.enabled = 1;
    data.sound_effects.volume = 100;
    data.sound_music.enabled = 1;
    data.sound_music.volume = 80;
    data.sound_speech.enabled = 1;
    data.sound_speech.volume = 100;
    data.sound_city.enabled = 1;
    data.sound_city.volume = 100;
    data.game_speed = 90;
    data.scroll_speed = 70;
    data.difficulty = DIFFICULTY_HARD;
    data.tooltips = TOOLTIPS_FULL;
    data.warnings = 1;
    data.gods_enabled = 1;
    data.victory_video = 0;
    data.last_advisor = ADVISOR_LABOR;
    setting_clear_personal_savings();
}
function load_settings(buf: buffer) {
    buffer_skip(buf, 4);
    data.fullscreen = buffer_read_i32(buf);
    buffer_skip(buf, 3);
    data.sound_effects.enabled = buffer_read_u8(buf);
    data.sound_music.enabled = buffer_read_u8(buf);
    data.sound_speech.enabled = buffer_read_u8(buf);
    buffer_skip(buf, 6);
    data.game_speed = buffer_read_i32(buf);
    data.scroll_speed = buffer_read_i32(buf);
    buffer_read_raw(buf, data.player_name, MAX_PLAYER_NAME);
    buffer_skip(buf, 16);
    data.last_advisor = buffer_read_i32(buf);
    buffer_skip(buf, 4);
    data.tooltips = buffer_read_i32(buf);
    buffer_skip(buf, 4);
    buffer_skip(buf, 4);
    buffer_skip(buf, 4);
    buffer_skip(buf, 4);
    data.sound_city.enabled = buffer_read_u8(buf);
    data.warnings = buffer_read_u8(buf);
    data.monthly_autosave = buffer_read_u8(buf);
    buffer_skip(buf, 1);
    data.sound_effects.volume = buffer_read_i32(buf);
    data.sound_music.volume = buffer_read_i32(buf);
    data.sound_speech.volume = buffer_read_i32(buf);
    data.sound_city.volume = buffer_read_i32(buf);
    buffer_skip(buf, 8);
    data.window_width = buffer_read_i32(buf);
    data.window_height = buffer_read_i32(buf);
    buffer_skip(buf, 8);
    for (let i: number = 0; i < MAX_PERSONAL_SAVINGS; i++) {
        data.personal_savings[i] = buffer_read_i32(buf);
    }
    data.victory_video = buffer_read_i32(buf);
    if (buffer_at_end(buf)) {
        data.difficulty = DIFFICULTY_HARD;
        data.gods_enabled = 1;
    } else {
        data.difficulty = buffer_read_i32(buf);
        data.gods_enabled = buffer_read_i32(buf);
    }
}
export function settings_load() {
    load_default_settings();
    let size: number = io_read_file_into_buffer("c3.inf", NOT_LOCALIZED, data.inf_file, INF_SIZE);
    if (!size) {
        return;
    }
    let buf: buffer;
    buffer_init(buf, data.inf_file, size);
    load_settings(buf);
    if (data.window_width + data.window_height < 500) {
        data.window_width = 800;
        data.window_height = 600;
    }
    if (data.last_advisor <= ADVISOR_NONE || data.last_advisor > ADVISOR_CHIEF) {
        data.last_advisor = ADVISOR_LABOR;
    }
}
export function settings_save() {
    let b: buffer;
    let buf: buffer = b;
    buffer_init(buf, data.inf_file, INF_SIZE);
    buffer_skip(buf, 4);
    buffer_write_i32(buf, data.fullscreen);
    buffer_skip(buf, 3);
    buffer_write_u8(buf, data.sound_effects.enabled);
    buffer_write_u8(buf, data.sound_music.enabled);
    buffer_write_u8(buf, data.sound_speech.enabled);
    buffer_skip(buf, 6);
    buffer_write_i32(buf, data.game_speed);
    buffer_write_i32(buf, data.scroll_speed);
    buffer_write_raw(buf, data.player_name, MAX_PLAYER_NAME);
    buffer_skip(buf, 16);
    buffer_write_i32(buf, data.last_advisor);
    buffer_skip(buf, 4);
    buffer_write_i32(buf, data.tooltips);
    buffer_skip(buf, 4);
    buffer_skip(buf, 4);
    buffer_skip(buf, 4);
    buffer_skip(buf, 4);
    buffer_write_u8(buf, data.sound_city.enabled);
    buffer_write_u8(buf, data.warnings);
    buffer_write_u8(buf, data.monthly_autosave);
    buffer_skip(buf, 1);
    buffer_write_i32(buf, data.sound_effects.volume);
    buffer_write_i32(buf, data.sound_music.volume);
    buffer_write_i32(buf, data.sound_speech.volume);
    buffer_write_i32(buf, data.sound_city.volume);
    buffer_skip(buf, 8);
    buffer_write_i32(buf, data.window_width);
    buffer_write_i32(buf, data.window_height);
    buffer_skip(buf, 8);
    for (let i: number = 0; i < MAX_PERSONAL_SAVINGS; i++) {
        buffer_write_i32(buf, data.personal_savings[i]);
    }
    buffer_write_i32(buf, data.victory_video);
    buffer_write_i32(buf, data.difficulty);
    buffer_write_i32(buf, data.gods_enabled);
    io_write_buffer_to_file("c3.inf", data.inf_file, INF_SIZE);
}
export function setting_fullscreen() {
    return data.fullscreen;
}
export function setting_window(width: number, height: number) {
    * width = data.window_width;
    * height = data.window_height;
}
export function setting_set_display(fullscreen: number, width: number, height: number) {
    data.fullscreen = fullscreen;
    if (!fullscreen) {
        data.window_width = width;
        data.window_height = height;
    }
}
function get_sound(type: set_sound_type) {
    switch (type) {
        case SOUND_MUSIC:
            return data.sound_music;
        case SOUND_EFFECTS:
            return data.sound_effects;
        case SOUND_SPEECH:
            return data.sound_speech;
        case SOUND_CITY:
            return data.sound_city;
        default: return null;
    }
}
export function setting_sound(type: set_sound_type) {
    return get_sound(type);
}
export function setting_sound_is_enabled(type: set_sound_type) {
    return get_sound(type).enabled;
}
export function setting_toggle_sound_enabled(type: set_sound_type) {
    let sound: set_sound = get_sound(type);
    sound.enabled = sound.enabled ? 0 : 1;
}
export function setting_increase_sound_volume(type: set_sound_type) {
    let sound: set_sound = get_sound(type);
    sound.volume = calc_bound(sound.volume + 1, 0, 100);
}
export function setting_decrease_sound_volume(type: set_sound_type) {
    let sound: set_sound = get_sound(type);
    sound.volume = calc_bound(sound.volume - 1, 0, 100);
}
export function setting_reset_sound(type: set_sound_type, enabled: number, volume: number) {
    let sound: set_sound = get_sound(type);
    sound.enabled = enabled;
    sound.volume = calc_bound(volume, 0, 100);
}
export function setting_game_speed() {
    return data.game_speed;
}
export function setting_increase_game_speed() {
    if (data.game_speed >= 100) {
        if (data.game_speed < 500) {
            data.game_speed += 100
        }
    } else {
        data.game_speed = calc_bound(data.game_speed + 10, 10, 100);
    }
}
export function setting_decrease_game_speed() {
    if (data.game_speed > 100) {
        data.game_speed -= 100
    } else {
        data.game_speed = calc_bound(data.game_speed - 10, 10, 100);
    }
}
export function setting_scroll_speed() {
    return data.scroll_speed;
}
export function setting_increase_scroll_speed() {
    data.scroll_speed = calc_bound(data.scroll_speed + 10, 0, 100);
}
export function setting_decrease_scroll_speed() {
    data.scroll_speed = calc_bound(data.scroll_speed - 10, 0, 100);
}
export function setting_reset_speeds(game_speed: number, scroll_speed: number) {
    data.game_speed = game_speed;
    data.scroll_speed = scroll_speed;
}
export function setting_tooltips() {
    return data.tooltips;
}
export function setting_cycle_tooltips() {
    switch (data.tooltips) {
        case TOOLTIPS_NONE:
            data.tooltips = TOOLTIPS_SOME;
            break
        case TOOLTIPS_SOME:
            data.tooltips = TOOLTIPS_FULL;
            break
        default: data.tooltips = TOOLTIPS_NONE
            break
    }
}
export function setting_warnings() {
    return data.warnings;
}
export function setting_toggle_warnings() {
    data.warnings = data.warnings ? 0 : 1;
}
export function setting_monthly_autosave() {
    return data.monthly_autosave;
}
export function setting_toggle_monthly_autosave() {
    data.monthly_autosave = data.monthly_autosave ? 0 : 1;
}
export function setting_gods_enabled() {
    return data.gods_enabled;
}
export function setting_toggle_gods_enabled() {
    data.gods_enabled = data.gods_enabled ? 0 : 1;
}
export function setting_difficulty() {
    return data.difficulty;
}
export function setting_increase_difficulty() {
    if (data.difficulty >= DIFFICULTY_VERY_HARD) {
        data.difficulty = DIFFICULTY_VERY_HARD;
    } else {
        data.difficulty++;
    }
}
export function setting_decrease_difficulty() {
    if (data.difficulty <= DIFFICULTY_VERY_EASY) {
        data.difficulty = DIFFICULTY_VERY_EASY;
    } else {
        data.difficulty--;
    }
}
export function setting_victory_video() {
    data.victory_video = data.victory_video ? 0 : 1;
    return data.victory_video;
}
export function setting_last_advisor() {
    return data.last_advisor;
}
export function setting_set_last_advisor(advisor: number) {
    data.last_advisor = advisor;
}
export function setting_player_name() {
    return data.player_name;
}
export function setting_set_player_name(player_name: number) {
    string_copy(player_name, data.player_name, MAX_PLAYER_NAME);
}
export function setting_personal_savings_for_mission(mission_id: number) {
    return data.personal_savings[mission_id];
}
export function setting_set_personal_savings_for_mission(mission_id: number, savings: number) {
    data.personal_savings[mission_id] = savings;
}
export function setting_clear_personal_savings() {
    for (let i: number = 0; i < MAX_PERSONAL_SAVINGS; i++) {
        data.personal_savings[i] = 0;
    }
}
