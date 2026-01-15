import { set_sound, set_sound_type, setting_decrease_sound_volume, setting_increase_sound_volume, setting_reset_sound, setting_sound, setting_sound_is_enabled, setting_toggle_sound_enabled } from 'game/settings';
import { arrow_button, arrow_buttons_draw, arrow_buttons_handle_mouse } from 'graphics/arrow_button';
import { button_none } from 'graphics/button';
import { font_t } from 'graphics/font';
import { generic_button, generic_buttons_handle_mouse } from 'graphics/generic_button';
import { graphics_in_dialog, graphics_reset_dialog } from 'graphics/graphics';
import { lang_text_draw, lang_text_draw_centered } from 'graphics/lang_text';
import { label_draw, outer_panel_draw } from 'graphics/panel';
import { text_draw_percentage } from 'graphics/text';
import { window_draw_underlying_window, window_id, window_show, window_type } from 'graphics/window';
import { hotkeys } from 'input/hotkey';
import { input_go_back_requested } from 'input/input';
import { mouse, mouse_in_dialog } from 'input/mouse';
import { sound_city_set_volume } from 'sound/city';
import { sound_effect_set_volume } from 'sound/effect';
import { sound_music_set_volume, sound_music_stop, sound_music_update } from 'sound/music';
import { sound_speech_set_volume, sound_speech_stop } from 'sound/speech';
import { Ref } from '../../ext/crt';
import SOUND_MUSIC = set_sound_type.SOUND_MUSIC;
import SOUND_SPEECH = set_sound_type.SOUND_SPEECH;
import SOUND_EFFECTS = set_sound_type.SOUND_EFFECTS;
import SOUND_CITY = set_sound_type.SOUND_CITY;
import FONT_NORMAL_PLAIN = font_t.FONT_NORMAL_PLAIN;
import FONT_LARGE_BLACK = font_t.FONT_LARGE_BLACK;
import FONT_SMALL_PLAIN = font_t.FONT_SMALL_PLAIN;
import FONT_NORMAL_GREEN = font_t.FONT_NORMAL_GREEN;
import WINDOW_SOUND_OPTIONS = window_id.WINDOW_SOUND_OPTIONS;

let buttons: generic_button[] = [
    new generic_button(64, 162, 224, 20, button_toggle, button_none, SOUND_MUSIC, 0),
    new generic_button(64, 192, 224, 20, button_toggle, button_none, SOUND_SPEECH, 0),
    new generic_button(64, 222, 224, 20, button_toggle, button_none, SOUND_EFFECTS, 0),
    new generic_button(64, 252, 224, 20, button_toggle, button_none, SOUND_CITY, 0),
    new generic_button(144, 296, 192, 20, button_ok, button_none, 1, 0),
    new generic_button(144, 326, 192, 20, button_cancel, button_none, 1, 0),
];
let arrow_buttons: arrow_button[] = [
    new arrow_button(112, 100, 17, 24, arrow_button_music, 1, 0),
    new arrow_button(136, 100, 15, 24, arrow_button_music, 0, 0),
    new arrow_button(112, 130, 17, 24, arrow_button_speech, 1, 0),
    new arrow_button(136, 130, 15, 24, arrow_button_speech, 0, 0),
    new arrow_button(112, 160, 17, 24, arrow_button_effects, 1, 0),
    new arrow_button(136, 160, 15, 24, arrow_button_effects, 0, 0),
    new arrow_button(112, 190, 17, 24, arrow_button_city, 1, 0),
    new arrow_button(136, 190, 15, 24, arrow_button_city, 0, 0),
];
export class unnamed46_8 {
    public focus_button_id: number = 0;
    public close_callback: (() => void) | null = null;
    public original_effects: set_sound = null;
    public original_music: set_sound = null;
    public original_speech: set_sound = null;
    public original_city: set_sound = null;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.focus_button_id = args[0]);
        args.length >= 2 && (this.close_callback = args[1]);
        args.length >= 3 && (this.original_effects = args[2]);
        args.length >= 4 && (this.original_music = args[3]);
        args.length >= 5 && (this.original_speech = args[4]);
        args.length >= 6 && (this.original_city = args[5]);
    }
}
let data: unnamed46_8 = new unnamed46_8();
function init(close_callback: () => void) {
    data.focus_button_id = 0;
    data.close_callback = close_callback;
    data.original_effects = setting_sound(SOUND_EFFECTS);
    data.original_music = setting_sound(SOUND_MUSIC);
    data.original_speech = setting_sound(SOUND_SPEECH);
    data.original_city = setting_sound(SOUND_CITY);
}
function draw_foreground() {
    graphics_in_dialog();
    outer_panel_draw(48, 80, 24, 18);
    label_draw(64, 162, 14, data.focus_button_id == 1 ? 1 : 2);
    label_draw(64, 192, 14, data.focus_button_id == 2 ? 1 : 2);
    label_draw(64, 222, 14, data.focus_button_id == 3 ? 1 : 2);
    label_draw(64, 252, 14, data.focus_button_id == 4 ? 1 : 2);
    label_draw(144, 296, 12, data.focus_button_id == 5 ? 1 : 2);
    label_draw(144, 326, 12, data.focus_button_id == 6 ? 1 : 2);
    lang_text_draw_centered(46, 0, 96, 92, 288, FONT_LARGE_BLACK);
    lang_text_draw_centered(46, 12, 128, 300, 224, FONT_NORMAL_GREEN);
    lang_text_draw_centered(46, 9, 128, 330, 224, FONT_NORMAL_GREEN);
    lang_text_draw(46, 10, 112, 142, FONT_SMALL_PLAIN);
    lang_text_draw(46, 11, 336, 142, FONT_SMALL_PLAIN);
    let music: set_sound = setting_sound(SOUND_MUSIC);
    lang_text_draw_centered(46, music.enabled ? 2 : 1, 64, 166, 224, FONT_NORMAL_GREEN);
    text_draw_percentage(music.volume, 374, 166, FONT_NORMAL_PLAIN);
    let speech: set_sound = setting_sound(SOUND_SPEECH);
    lang_text_draw_centered(46, speech.enabled ? 4 : 3, 64, 196, 224, FONT_NORMAL_GREEN);
    text_draw_percentage(speech.volume, 374, 196, FONT_NORMAL_PLAIN);
    let effects: set_sound = setting_sound(SOUND_EFFECTS);
    lang_text_draw_centered(46, effects.enabled ? 6 : 5, 64, 226, 224, FONT_NORMAL_GREEN);
    text_draw_percentage(effects.volume, 374, 226, FONT_NORMAL_PLAIN);
    let city: set_sound = setting_sound(SOUND_CITY);
    lang_text_draw_centered(46, city.enabled ? 8 : 7, 64, 256, 224, FONT_NORMAL_GREEN);
    text_draw_percentage(city.volume, 374, 256, FONT_NORMAL_PLAIN);
    arrow_buttons_draw(208, 60, arrow_buttons, 8);
    graphics_reset_dialog();
}
function handle_input(m: mouse, h: hotkeys) {
    let m_dialog: mouse = mouse_in_dialog(m);
    const focusRef = new Ref(data.focus_button_id);
    if (generic_buttons_handle_mouse(m_dialog, 0, 0, buttons, 6, focusRef) ||
        arrow_buttons_handle_mouse(m_dialog, 208, 60, arrow_buttons, 8, 0)) {
        data.focus_button_id = focusRef.v;
        return;
    }
    data.focus_button_id = focusRef.v;
    if (input_go_back_requested(m, h)) {
        data.close_callback!();
    }
}
function button_toggle(type: number, param2: number) {
    setting_toggle_sound_enabled(type);
    if (type == SOUND_MUSIC) {
        if (setting_sound(SOUND_MUSIC).enabled) {
            sound_music_update(1);
        } else {
            sound_music_stop();
        }
    } else if (type == SOUND_SPEECH) {
        if (!setting_sound(SOUND_SPEECH).enabled) {
            sound_speech_stop();
        }
    }
}
function button_ok(param1: number, param2: number) {
    data.close_callback!();
}
function button_cancel(param1: number, param2: number) {
    setting_reset_sound(SOUND_EFFECTS, data.original_effects.enabled, data.original_effects.volume);
    setting_reset_sound(SOUND_MUSIC, data.original_music.enabled, data.original_music.volume);
    setting_reset_sound(SOUND_SPEECH, data.original_speech.enabled, data.original_speech.volume);
    setting_reset_sound(SOUND_CITY, data.original_city.enabled, data.original_city.volume);
    if (data.original_music.enabled) {
        if (setting_sound_is_enabled(SOUND_MUSIC) != data.original_music.enabled) {
            sound_music_update(1);
        }
    } else {
        sound_music_stop();
    }
    sound_music_set_volume(data.original_music.volume);
    sound_speech_set_volume(data.original_speech.volume);
    sound_effect_set_volume(data.original_effects.volume);
    sound_city_set_volume(data.original_city.volume);
    data.close_callback!();
}
function update_volume(type: set_sound_type, is_decrease: number) {
    if (is_decrease) {
        setting_decrease_sound_volume(type);
    } else {
        setting_increase_sound_volume(type);
    }
}
function arrow_button_music(is_down: number, param2: number) {
    update_volume(SOUND_MUSIC, is_down);
    sound_music_set_volume(setting_sound(SOUND_MUSIC).volume);
}
function arrow_button_speech(is_down: number, param2: number) {
    update_volume(SOUND_SPEECH, is_down);
    sound_speech_set_volume(setting_sound(SOUND_SPEECH).volume);
}
function arrow_button_effects(is_down: number, param2: number) {
    update_volume(SOUND_EFFECTS, is_down);
    sound_effect_set_volume(setting_sound(SOUND_EFFECTS).volume);
}
function arrow_button_city(is_down: number, param2: number) {
    update_volume(SOUND_CITY, is_down);
    sound_city_set_volume(setting_sound(SOUND_CITY).volume);
}
export function window_sound_options_show(close_callback: () => void) {
    let window: window_type = new window_type(
        WINDOW_SOUND_OPTIONS,
        window_draw_underlying_window,
        draw_foreground,
        handle_input,
    );
    init(close_callback);
    window_show(window);
}
