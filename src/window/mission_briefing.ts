
import { city_mission_reset_save_start } from 'city/mission';
import { group_terrain } from 'core/image_group';
import { lang_get_message, lang_message } from 'core/lang';
import { game_file_start_scenario_by_name } from 'game/file';
import { game_mission_has_choice } from 'game/mission';
import { tutorial_get_immediate_goal_text } from 'game/tutorial';
import { button_none } from 'graphics/button';
import { font_t } from 'graphics/font';
import { graphics_in_dialog, graphics_reset_clip_rectangle, graphics_reset_dialog, graphics_set_clip_rectangle } from 'graphics/graphics';
import { ib, image_button, image_buttons_draw, image_buttons_handle_mouse } from 'graphics/image_button';
import { lang_text_draw } from 'graphics/lang_text';
import { inner_panel_draw, label_draw, outer_panel_draw } from 'graphics/panel';
import { rich_text_draw, rich_text_draw_scrollbar, rich_text_handle_mouse, rich_text_init, rich_text_reset, rich_text_set_fonts } from 'graphics/rich_text';
import { text_draw, text_draw_number } from 'graphics/text';
import { window_draw_underlying_window, window_id, window_show, window_type } from 'graphics/window';
import { hotkeys } from 'input/hotkey';
import { mouse, mouse_in_dialog } from 'input/mouse';
import { scenario_criteria_culture, scenario_criteria_culture_enabled, scenario_criteria_favor, scenario_criteria_favor_enabled, scenario_criteria_peace, scenario_criteria_peace_enabled, scenario_criteria_population, scenario_criteria_population_enabled, scenario_criteria_prosperity, scenario_criteria_prosperity_enabled } from 'scenario/criteria';
import { scenario_campaign_mission, scenario_name } from 'scenario/property';
import { sound_music_update } from 'sound/music';
import { sound_speech_stop } from 'sound/speech';
import { window_city_show } from 'window/city';
import { intermezzo_type, window_intermezzo_show } from 'window/intermezzo';
import { window_mission_selection_show } from 'window/mission_selection';
import GROUP_ARROW_MESSAGE_PROBLEMS = group_terrain.GROUP_ARROW_MESSAGE_PROBLEMS;
import GROUP_SIDEBAR_BUTTONS = group_terrain.GROUP_SIDEBAR_BUTTONS;;
import IB_NORMAL = ib.IB_NORMAL;
import FONT_NORMAL_BLACK = font_t.FONT_NORMAL_BLACK;
import FONT_NORMAL_WHITE = font_t.FONT_NORMAL_WHITE;
import FONT_NORMAL_RED = font_t.FONT_NORMAL_RED;
import FONT_LARGE_BLACK = font_t.FONT_LARGE_BLACK;
import WINDOW_MISSION_BRIEFING = window_id.WINDOW_MISSION_BRIEFING;
import INTERMEZZO_MISSION_BRIEFING = intermezzo_type.INTERMEZZO_MISSION_BRIEFING;
let GOAL_OFFSETS_X: number[] = [32, 288, 32, 288, 288, 288];
let GOAL_OFFSETS_Y: number[] = [95, 95, 117, 117, 73, 135];
let image_button_back: image_button = new image_button(
    0, 0, 31, 20, IB_NORMAL, GROUP_ARROW_MESSAGE_PROBLEMS, 8, button_back, button_none, 0, 0, 1
);
let image_button_start_mission: image_button = new image_button(
    0, 0, 27, 27, IB_NORMAL, GROUP_SIDEBAR_BUTTONS, 56, button_start_mission, button_none, 1, 0, 1
);
export class unnamed37_8 {
    public is_review: number = 0;
    public focus_button: number = 0;
    public campaign_mission_loaded: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.is_review = args[0]);
        args.length >= 2 && (this.focus_button = args[1]);
        args.length >= 3 && (this.campaign_mission_loaded = args[2]);
    }
}
let data: unnamed37_8 = new unnamed37_8();
function init() {
    data.focus_button = 0;
    rich_text_reset(0);
}
function draw_background() {
    if (!data.campaign_mission_loaded) {
        data.campaign_mission_loaded = 1;
        if (!game_file_start_scenario_by_name(scenario_name())) {
            window_city_show();
            return;
        }
    }
    window_draw_underlying_window();
    graphics_in_dialog();
    let text_id: number = 200 + scenario_campaign_mission();
    let msg: lang_message = lang_get_message(text_id);
    outer_panel_draw(16, 32, 38, 27);
    text_draw(msg.title.text, 32, 48, FONT_LARGE_BLACK, 0);
    text_draw(msg.subtitle.text, 32, 78, FONT_NORMAL_BLACK, 0);
    lang_text_draw(62, 7, 376, 433, FONT_NORMAL_BLACK);
    if (!data.is_review && game_mission_has_choice()) {
        lang_text_draw(13, 4, 66, 435, FONT_NORMAL_BLACK);
    }
    inner_panel_draw(32, 96, 33, 5);
    lang_text_draw(62, 10, 48, 104, FONT_NORMAL_WHITE);
    let goal_index: number = 0;
    if (scenario_criteria_population_enabled()) {
        let x: number = GOAL_OFFSETS_X[goal_index];
        let y: number = GOAL_OFFSETS_Y[goal_index];
        goal_index++;
        label_draw(16 + x, 32 + y, 15, 1);
        let width: number = lang_text_draw(62, 11, 16 + x + 8, 32 + y + 3, FONT_NORMAL_RED);
        text_draw_number(scenario_criteria_population(), '@', " ", 16 + x + 8 + width, 32 + y + 3, FONT_NORMAL_RED);
    }
    if (scenario_criteria_culture_enabled()) {
        let x: number = GOAL_OFFSETS_X[goal_index];
        let y: number = GOAL_OFFSETS_Y[goal_index];
        goal_index++;
        label_draw(16 + x, 32 + y, 15, 1);
        let width: number = lang_text_draw(62, 12, 16 + x + 8, 32 + y + 3, FONT_NORMAL_RED);
        text_draw_number(scenario_criteria_culture(), '@', " ", 16 + x + 8 + width, 32 + y + 3, FONT_NORMAL_RED);
    }
    if (scenario_criteria_prosperity_enabled()) {
        let x: number = GOAL_OFFSETS_X[goal_index];
        let y: number = GOAL_OFFSETS_Y[goal_index];
        goal_index++;
        label_draw(16 + x, 32 + y, 15, 1);
        let width: number = lang_text_draw(62, 13, 16 + x + 8, 32 + y + 3, FONT_NORMAL_RED);
        text_draw_number(scenario_criteria_prosperity(), '@', " ", 16 + x + 8 + width, 32 + y + 3, FONT_NORMAL_RED);
    }
    if (scenario_criteria_peace_enabled()) {
        let x: number = GOAL_OFFSETS_X[goal_index];
        let y: number = GOAL_OFFSETS_Y[goal_index];
        goal_index++;
        label_draw(16 + x, 32 + y, 15, 1);
        let width: number = lang_text_draw(62, 14, 16 + x + 8, 32 + y + 3, FONT_NORMAL_RED);
        text_draw_number(scenario_criteria_peace(), '@', " ", 16 + x + 8 + width, 32 + y + 3, FONT_NORMAL_RED);
    }
    if (scenario_criteria_favor_enabled()) {
        let x: number = GOAL_OFFSETS_X[goal_index];
        let y: number = GOAL_OFFSETS_Y[goal_index];
        goal_index++;
        label_draw(16 + x, 32 + y, 15, 1);
        let width: number = lang_text_draw(62, 15, 16 + x + 8, 32 + y + 3, FONT_NORMAL_RED);
        text_draw_number(scenario_criteria_favor(), '@', " ", 16 + x + 8 + width, 32 + y + 3, FONT_NORMAL_RED);
    }
    let immediate_goal_text: number = tutorial_get_immediate_goal_text();
    if (immediate_goal_text) {
        let x: number = GOAL_OFFSETS_X[2];
        let y: number = GOAL_OFFSETS_Y[2];
        label_draw(16 + x, 32 + y, 31, 1);
        lang_text_draw(62, immediate_goal_text, 16 + x + 8, 32 + y + 3, FONT_NORMAL_RED);
    }
    inner_panel_draw(32, 184, 33, 15);
    rich_text_set_fonts(FONT_NORMAL_WHITE, FONT_NORMAL_RED, 5);
    rich_text_init(msg.content.text, 64, 184, 31, 15, 0);
    graphics_set_clip_rectangle(35, 187, 522, 234);
    rich_text_draw(msg.content.text, 48, 196, 496, 14, 0);
    graphics_reset_clip_rectangle();
    graphics_reset_dialog();
}
function draw_foreground() {
    graphics_in_dialog();
    rich_text_draw_scrollbar();
    image_buttons_draw(516, 426, image_button_start_mission, 1);
    if (!data.is_review && game_mission_has_choice()) {
        image_buttons_draw(26, 428, image_button_back, 1);
    }
    graphics_reset_dialog();
}
function handle_input(m: mouse, h: hotkeys) {
    let m_dialog: mouse = mouse_in_dialog(m);
    if (rich_text_handle_mouse(m_dialog)) {
        return;
    }
    if (image_buttons_handle_mouse(m_dialog, 516, 426, image_button_start_mission, 1, 0)) {
        return;
    }
    if (!data.is_review && game_mission_has_choice()) {
        if (image_buttons_handle_mouse(m_dialog, 26, 428, image_button_back, 1, 0)) {
            return;
        }
    }
}
function button_back(param1: number, param2: number) {
    if (!data.is_review) {
        sound_speech_stop();
        window_mission_selection_show();
    }
}
function button_start_mission(param1: number, param2: number) {
    sound_speech_stop();
    sound_music_update(1);
    window_city_show();
    city_mission_reset_save_start();
}
function show() {
    let window: window_type = new window_type(
        WINDOW_MISSION_BRIEFING,
        draw_background,
        draw_foreground,
        handle_input
    );
    init();
    window_show(window);
}
export function window_mission_briefing_show() {
    data.is_review = 0;
    data.campaign_mission_loaded = 0;
    window_intermezzo_show(INTERMEZZO_MISSION_BRIEFING, show);
}
export function window_mission_briefing_show_review() {
    data.is_review = 1;
    data.campaign_mission_loaded = 1;
    window_intermezzo_show(INTERMEZZO_MISSION_BRIEFING, show);
}
