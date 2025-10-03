
import { model_load } from 'building/model';
import { city_view_is_sidebar_collapsed, city_view_toggle_sidebar } from 'city/view';
import { config_load, config_save } from 'core/config';
import { encoding_determine, encoding_get, encoding_type } from 'core/encoding';
import { hotkey_config_load } from 'core/hotkey_config';
import { image_init, image_load_climate, image_load_enemy, image_load_fonts } from 'core/image';
import { lang_get_string, lang_load } from 'core/lang';
import { language_type, locale_determine_language } from 'core/locale';
import { log_error, log_info } from 'core/log';
import { random_init } from 'core/random';
import { editor_set_active } from 'editor/editor';
import { enemy_type } from 'figure/type';
import { game_animation_update } from 'game/animation';
import { game_file_write_mission_saved_game } from 'game/file';
import { game_file_editor_clear_data, game_file_editor_create_scenario } from 'game/file_editor';
import { settings_load, settings_save } from 'game/settings';
import { game_speed_get_elapsed_ticks } from 'game/speed';
import { game_state_init, game_state_unpause } from 'game/state';
import { game_tick_run } from 'game/tick';
import { font_set_encoding } from 'graphics/font';
import { video_shutdown } from 'graphics/video';
import { window_draw, window_is_invalid } from 'graphics/window';
import { scenario_climate } from 'scenario/property';
import { scenario_settings_init } from 'scenario/scenario';
import { sound_city_play } from 'sound/city';
import { sound_system_init, sound_system_shutdown } from 'sound/system';
import { translation_load } from 'translation/translation';
import { window_editor_map_show } from 'window/editor/map';
import { message, window_logo_show } from 'window/logo';
import { window_main_menu_show } from 'window/main_menu';
;
import ENCODING_JAPANESE = encoding_type.ENCODING_JAPANESE;
import ENCODING_KOREAN = encoding_type.ENCODING_KOREAN;
import ENEMY_0_BARBARIAN = enemy_type.ENEMY_0_BARBARIAN;
import CLIMATE_CENTRAL = scenario_climate.CLIMATE_CENTRAL;
import MESSAGE_NONE = message.MESSAGE_NONE;
import MESSAGE_MISSING_PATCH = message.MESSAGE_MISSING_PATCH;
import MESSAGE_MISSING_FONTS = message.MESSAGE_MISSING_FONTS;
function errlog(msg: char) {
    log_error(msg, 0, 0);
}
function update_encoding() {
    let language: language_type = locale_determine_language();
    let encoding: encoding_type = encoding_determine(language);
    log_info("Detected encoding:", 0, encoding);
    font_set_encoding(encoding);
    translation_load(language);
    return encoding;
}
export function game_pre_init() {
    settings_load();
    config_load();
    hotkey_config_load();
    scenario_settings_init();
    game_state_unpause();
    if (!lang_load(0)) {
        errlog("'c3.eng' or 'c3_mm.eng' files not found or too large.");
        return 0;
    }
    update_encoding();
    random_init();
    return 1;
}
function is_unpatched() {
    let delete_game: number = lang_get_string(1, 6);
    let option_menu: number = lang_get_string(2, 0);
    let difficulty_option: number = lang_get_string(2, 6);
    let help_menu: number = lang_get_string(3, 0);
    return difficulty_option == help_menu || delete_game == option_menu;
}
export function game_init() {
    if (!image_init()) {
        errlog("unable to init graphics");
        return 0;
    }
    if (!image_load_climate(CLIMATE_CENTRAL, 0, 1)) {
        errlog("unable to load main graphics");
        return 0;
    }
    if (!image_load_enemy(ENEMY_0_BARBARIAN)) {
        errlog("unable to load enemy graphics");
        return 0;
    }
    let missing_fonts: number = 0;
    if (!image_load_fonts(encoding_get())) {
        errlog("unable to load font graphics");
        if (encoding_get() == ENCODING_KOREAN || encoding_get() == ENCODING_JAPANESE) {
            missing_fonts = 1;
        } else {
            return 0;
        }
    }
    if (!model_load()) {
        errlog("unable to load c3_model.txt");
        return 0;
    }
    sound_system_init();
    game_state_init();
    window_logo_show(missing_fonts ? MESSAGE_MISSING_FONTS : (is_unpatched() ? MESSAGE_MISSING_PATCH : MESSAGE_NONE));
    return 1;
}
function reload_language(is_editor: number, reload_images: number) {
    if (!lang_load(is_editor)) {
        if (is_editor) {
            errlog("'c3_map.eng' or 'c3_map_mm.eng' files not found or too large.");
        } else {
            errlog("'c3.eng' or 'c3_mm.eng' files not found or too large.");
        }
        return 0;
    }
    let encoding: encoding_type = update_encoding();
    if (!image_load_fonts(encoding)) {
        errlog("unable to load font graphics");
        return 0;
    }
    if (!image_load_climate(CLIMATE_CENTRAL, is_editor, reload_images)) {
        errlog("unable to load main graphics");
        return 0;
    }
    return 1;
}
export function game_init_editor() {
    if (!reload_language(1, 0)) {
        return 0;
    }
    game_file_editor_clear_data();
    game_file_editor_create_scenario(2);
    if (city_view_is_sidebar_collapsed()) {
        city_view_toggle_sidebar();
    }
    editor_set_active(1);
    window_editor_map_show();
    return 1;
}
export function game_exit_editor() {
    if (!reload_language(0, 0)) {
        return;
    }
    editor_set_active(0);
    window_main_menu_show(1);
}
export function game_reload_language() {
    return reload_language(0, 1);
}
export function game_run() {
    game_animation_update();
    let num_ticks: number = game_speed_get_elapsed_ticks();
    for (let i: number = 0; i < num_ticks; i++) {
        game_tick_run();
        game_file_write_mission_saved_game();
        if (window_is_invalid()) {
            break
        }
    }
}
export function game_draw() {
    window_draw(0);
    sound_city_play();
}
export function game_exit() {
    video_shutdown();
    settings_save();
    config_save();
    sound_system_shutdown();
}
