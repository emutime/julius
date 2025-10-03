
import { emperor_gift } from 'city/emperor';
import { city_emperor_personal_savings } from 'city/emperor';
import { city_finance_treasury } from 'city/finance';
import { finance_overview } from 'city/finance';
import { city_population } from 'city/population';
import { building_type } from 'building/type';
import { selected_rating } from 'city/ratings';
import { city_rating_culture } from 'city/ratings';
import { city_rating_prosperity } from 'city/ratings';
import { city_rating_peace } from 'city/ratings';
import { city_rating_favor } from 'city/ratings';
import { victory_state } from 'city/victory';
import VICTORY_STATE_WON = victory_state.VICTORY_STATE_WON;
import { city_victory_state } from 'city/victory';
import { city_victory_stop_governing } from 'city/victory';
import { game_mission_peaceful } from 'game/mission';;
import { set_tooltips } from 'game/settings';
import { set_difficulty } from 'game/settings';
import { set_sound_type } from 'game/settings';
import { set_sound } from 'game/settings';
import { setting_victory_video } from 'game/settings';
import { setting_set_personal_savings_for_mission } from 'game/settings';
import { setting_clear_personal_savings } from 'game/settings';
import { game_state_reset_overlay } from 'game/state';
import { buffer } from 'core/buffer';
import { building } from 'building/building';
import { game_undo_disable } from 'game/undo';
import { button_none } from 'graphics/button';
import { time_millis } from 'core/time';
import { touch_coords } from 'input/touch';
import { touch_mode } from 'input/touch';
import { touch } from 'input/touch';
import { mouse_button } from 'input/mouse';
import { scroll_state } from 'input/mouse';
import { mouse } from 'input/mouse';
import { mouse_reset_up_state } from 'input/mouse';
import { mouse_in_dialog } from 'input/mouse';
import { generic_button } from 'graphics/generic_button';
import { generic_buttons_handle_mouse } from 'graphics/generic_button';
import { color_t } from 'graphics/color';
import { clip_code } from 'graphics/graphics';
import { clip_info } from 'graphics/graphics';
import { graphics_in_dialog } from 'graphics/graphics';
import { graphics_reset_dialog } from 'graphics/graphics';
import { language_type } from 'core/locale';
import { encoding_type } from 'core/encoding';
import { font_t } from 'graphics/font';
import FONT_NORMAL_BLACK = font_t.FONT_NORMAL_BLACK;
import FONT_NORMAL_WHITE = font_t.FONT_NORMAL_WHITE;
import FONT_LARGE_BLACK = font_t.FONT_LARGE_BLACK;
import FONT_NORMAL_GREEN = font_t.FONT_NORMAL_GREEN;
import { font_t } from 'graphics/font';
import { font_definition } from 'graphics/font';
import { lang_text_get_width } from 'graphics/lang_text';
import { lang_text_draw } from 'graphics/lang_text';
import { lang_text_draw_centered } from 'graphics/lang_text';
import { lang_text_draw_multiline } from 'graphics/lang_text';
import { outer_panel_draw } from 'graphics/panel';
import { inner_panel_draw } from 'graphics/panel';
import { large_label_draw } from 'graphics/panel';
import { text_draw_number } from 'graphics/text';
import { tooltip_type } from 'graphics/tooltip';
import { tooltip_extra_text_type } from 'graphics/tooltip';
import { tooltip_context } from 'graphics/tooltip';
import { key_type } from 'input/keys';
import { key_modifier_type } from 'input/keys';
import { hotkey_action } from 'core/hotkey_config';
import { hotkey_mapping } from 'core/hotkey_config';
import { hotkeys } from 'input/hotkey';
import { window_id } from 'graphics/window';
import WINDOW_MISSION_END = window_id.WINDOW_MISSION_END;
import { window_id } from 'graphics/window';
import { window_type } from 'graphics/window';
import { window_show } from 'graphics/window';
import { input_go_back_requested } from 'input/input';
import { scenario_climate } from 'scenario/property';
import { scenario_is_custom } from 'scenario/property';
import { scenario_campaign_rank } from 'scenario/property';
import { scenario_set_campaign_rank } from 'scenario/property';
import { scenario_campaign_mission } from 'scenario/property';
import { scenario_set_campaign_mission } from 'scenario/property';
import { scenario_is_tutorial_1 } from 'scenario/property';
import { scenario_is_tutorial_2 } from 'scenario/property';
import { scenario_save_campaign_player_name } from 'scenario/property';
import { scenario_settings_init } from 'scenario/scenario';
import { sound_music_stop } from 'sound/music';
import { sound_speech_stop } from 'sound/speech';
import { intermezzo_type } from 'window/intermezzo';
import INTERMEZZO_FIRED = intermezzo_type.INTERMEZZO_FIRED;
import INTERMEZZO_WON = intermezzo_type.INTERMEZZO_WON;
import { intermezzo_type } from 'window/intermezzo';
import { window_intermezzo_show } from 'window/intermezzo';
import { window_main_menu_show } from 'window/main_menu';
import { window_mission_selection_show } from 'window/mission_selection';
import { window_victory_video_show } from 'window/victory_video';
let fired_buttons: generic_button[] = new Array().fill({
    { 80, 224, 480, 25, button_fired, button_none, 0, 0},
});
let focus_button_id: number;
function draw_lost() {
    outer_panel_draw(48, 16, 34, 16);
    lang_text_draw_centered(62, 1, 48, 32, 544, FONT_LARGE_BLACK);
    lang_text_draw_multiline(62, 16, 64, 72, 496, FONT_NORMAL_BLACK);
}
function get_max(value1: number, value2: number, value3: number) {
    let max: number = value1;
    if (value2 > max) {
        max = value2;
    }
    if (value3 > max) {
        max = value3;
    }
    return max;
}
function draw_won() {
    outer_panel_draw(48, 128, 34, 18);
    lang_text_draw_centered(62, 0, 48, 144, 544, FONT_LARGE_BLACK);
    inner_panel_draw(64, 184, 32, 7);
    if (scenario_is_custom()) {
        lang_text_draw_multiline(147, 20, 80, 192, 488, FONT_NORMAL_WHITE);
    } else {
        lang_text_draw_multiline(147, scenario_campaign_mission(), 80, 192, 488, FONT_NORMAL_WHITE);
    }
    let left_width: number = get_max(
        lang_text_get_width(148, 0, FONT_NORMAL_BLACK),
        lang_text_get_width(148, 2, FONT_NORMAL_BLACK),
        lang_text_get_width(148, 4, FONT_NORMAL_BLACK)
    );
    let right_width: number = get_max(
        lang_text_get_width(148, 1, FONT_NORMAL_BLACK),
        lang_text_get_width(148, 3, FONT_NORMAL_BLACK),
        lang_text_get_width(148, 5, FONT_NORMAL_BLACK)
    );
    let left_offset: number = 68;
    let right_offset: number = left_offset + 10 + 512 * left_width / (left_width + right_width);
    let width: number = lang_text_draw(148, 0, left_offset, 308, FONT_NORMAL_BLACK);
    text_draw_number(city_rating_culture(), '@', " ", left_offset + width, 308, FONT_NORMAL_BLACK);
    width = lang_text_draw(148, 1, right_offset, 308, FONT_NORMAL_BLACK);
    text_draw_number(city_rating_prosperity(), '@', " ", right_offset + width, 308, FONT_NORMAL_BLACK);
    width = lang_text_draw(148, 2, left_offset, 328, FONT_NORMAL_BLACK);
    text_draw_number(city_rating_peace(), '@', " ", left_offset + width, 328, FONT_NORMAL_BLACK);
    width = lang_text_draw(148, 3, right_offset, 328, FONT_NORMAL_BLACK);
    text_draw_number(city_rating_favor(), '@', " ", right_offset + width, 328, FONT_NORMAL_BLACK);
    width = lang_text_draw(148, 4, left_offset, 348, FONT_NORMAL_BLACK);
    text_draw_number(city_population(), '@', " ", left_offset + width, 348, FONT_NORMAL_BLACK);
    width = lang_text_draw(148, 5, right_offset, 348, FONT_NORMAL_BLACK);
    text_draw_number(city_finance_treasury(), '@', " ", right_offset + width, 348, FONT_NORMAL_BLACK);
    lang_text_draw_centered(13, 1, 64, 388, 512, FONT_NORMAL_BLACK);
}
function draw_background() {
    graphics_in_dialog();
    if (city_victory_state() == VICTORY_STATE_WON) {
        draw_won();
    } else {
        draw_lost();
    }
    graphics_reset_dialog();
}
function draw_foreground() {
    if (city_victory_state() != VICTORY_STATE_WON) {
        graphics_in_dialog();
        large_label_draw(80, 224, 30, focus_button_id == 1);
        lang_text_draw_centered(62, 6, 80, 230, 480, FONT_NORMAL_GREEN);
        graphics_reset_dialog();
    }
}
function advance_to_next_mission() {
    setting_set_personal_savings_for_mission(scenario_campaign_rank() + 1, city_emperor_personal_savings());
    scenario_set_campaign_rank(scenario_campaign_rank() + 1);
    scenario_save_campaign_player_name();
    city_victory_stop_governing();
    game_undo_disable();
    game_state_reset_overlay();
    if (scenario_campaign_rank() >= 11 || scenario_is_custom()) {
        window_main_menu_show(1);
        if (!scenario_is_custom()) {
            setting_clear_personal_savings();
            scenario_settings_init();
            scenario_set_campaign_rank(2);
        }
    } else {
        scenario_set_campaign_mission(game_mission_peaceful());
        window_mission_selection_show();
    }
}
function handle_input(m: mouse, h: hotkeys) {
    if (city_victory_state() == VICTORY_STATE_WON) {
        if (input_go_back_requested(m, h)) {
            sound_music_stop();
            sound_speech_stop();
            advance_to_next_mission();
        }
    } else {
        generic_buttons_handle_mouse(mouse_in_dialog(m), 0, 0,
            fired_buttons, 1, focus_button_id);
    }
}
function button_fired(param1: number, param2: number) {
    sound_music_stop();
    sound_speech_stop();
    city_victory_stop_governing();
    game_undo_disable();
    if (scenario_is_custom()) {
        window_main_menu_show(1);
    } else {
        window_mission_selection_show();
    }
}
function show_end_dialog() {
    let window: window_type = {
        WINDOW_MISSION_END,
        draw_background,
        draw_foreground,
        handle_input
    };
    window_show(window);
}
function show_intermezzo() {
    window_intermezzo_show(INTERMEZZO_WON, show_end_dialog);
}
export function window_mission_end_show_won() {
    mouse_reset_up_state();
    if (scenario_is_tutorial_1() || scenario_is_tutorial_2()) {
        show_intermezzo();
    } else if (!scenario_is_custom() && scenario_campaign_rank() >= 10) {
        window_victory_video_show("smk/win_game.smk", 400, 292, show_intermezzo);
    } else {
        if (setting_victory_video()) {
            window_victory_video_show("smk/victory_balcony.smk", 400, 292, show_intermezzo);
        } else {
            window_victory_video_show("smk/victory_senate.smk", 400, 292, show_intermezzo);
        }
    }
}
export function window_mission_end_show_fired() {
    window_intermezzo_show(INTERMEZZO_FIRED, show_end_dialog);
}
