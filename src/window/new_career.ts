export const PLAYER_NAME_LENGTH = 32;
import { group_terrain } from 'core/image_group';
import GROUP_MAIN_MENU_BACKGROUND = group_terrain.GROUP_MAIN_MENU_BACKGROUND;
import GROUP_ARROW_MESSAGE_PROBLEMS = group_terrain.GROUP_ARROW_MESSAGE_PROBLEMS;
import GROUP_SIDEBAR_BUTTONS = group_terrain.GROUP_SIDEBAR_BUTTONS;;
import { lang_type } from 'core/lang';
import { lang_message_type } from 'core/lang';
import { lang_message } from 'core/lang';
import { lang_get_string } from 'core/lang';
import { string_copy } from 'core/string';
import { set_tooltips } from 'game/settings';
import { set_difficulty } from 'game/settings';
import { set_sound_type } from 'game/settings';
import { set_sound } from 'game/settings';
import { setting_set_player_name } from 'game/settings';
import { setting_clear_personal_savings } from 'game/settings';
import { color_t } from 'graphics/color';
import { clip_code } from 'graphics/graphics';
import { clip_info } from 'graphics/graphics';
import { graphics_in_dialog } from 'graphics/graphics';
import { graphics_reset_dialog } from 'graphics/graphics';
import { graphics_clear_screen } from 'graphics/graphics';
import { language_type } from 'core/locale';
import { encoding_type } from 'core/encoding';
import { image } from 'core/image';
import { image_group } from 'core/image';
import { font_t } from 'graphics/font';
import FONT_NORMAL_BLACK = font_t.FONT_NORMAL_BLACK;
import FONT_NORMAL_WHITE = font_t.FONT_NORMAL_WHITE;
import FONT_LARGE_BLACK = font_t.FONT_LARGE_BLACK;
import { font_t } from 'graphics/font';
import { font_definition } from 'graphics/font';
import { image_draw } from 'graphics/image';
import { button_none } from 'graphics/button';
import { time_millis } from 'core/time';
import { touch_coords } from 'input/touch';
import { touch_mode } from 'input/touch';
import { touch } from 'input/touch';
import { mouse_button } from 'input/mouse';
import { scroll_state } from 'input/mouse';
import { mouse } from 'input/mouse';
import { mouse_in_dialog } from 'input/mouse';
import { ib } from 'graphics/image_button';
import IB_NORMAL = ib.IB_NORMAL;
import { image_button } from 'graphics/image_button';
import { image_buttons_draw } from 'graphics/image_button';
import { image_buttons_handle_mouse } from 'graphics/image_button';
import { lang_text_draw } from 'graphics/lang_text';
import { lang_text_draw_centered } from 'graphics/lang_text';
import { outer_panel_draw } from 'graphics/panel';
import { tooltip_type } from 'graphics/tooltip';
import { tooltip_extra_text_type } from 'graphics/tooltip';
import { tooltip_context } from 'graphics/tooltip';
import { key_type } from 'input/keys';
import { key_modifier_type } from 'input/keys';
import { hotkey_action } from 'core/hotkey_config';
import { hotkey_mapping } from 'core/hotkey_config';
import { hotkeys } from 'input/hotkey';
import { window_id } from 'graphics/window';
import WINDOW_NEW_CAREER = window_id.WINDOW_NEW_CAREER;
import { window_id } from 'graphics/window';
import { window_type } from 'graphics/window';
import { window_show } from 'graphics/window';
import { window_go_back } from 'graphics/window';
import { input_go_back_requested } from 'input/input';
import { scenario_climate } from 'scenario/property';
import { buffer } from 'core/buffer';
import { scenario_settings_init } from 'scenario/scenario';
import { input_box } from 'widget/input_box';
import { input_box_start } from 'widget/input_box';
import { input_box_stop } from 'widget/input_box';
import { input_box_is_accepted } from 'widget/input_box';
import { input_box_handle_mouse } from 'widget/input_box';
import { input_box_draw } from 'widget/input_box';
import { window_mission_selection_show } from 'window/mission_selection';
let image_buttons: image_button[] = new Array().fill({
    { 0, 2, 31, 20, IB_NORMAL, GROUP_ARROW_MESSAGE_PROBLEMS, 8, button_back, button_none, 0, 0, 1},
    { 305, 0, 27, 27, IB_NORMAL, GROUP_SIDEBAR_BUTTONS, 56, start_mission, button_none, 1, 0, 1}
});
let player_name: number[] = new Array(PLAYER_NAME_LENGTH);
let player_name_input: input_box = { 160, 208, 20, 2, FONT_NORMAL_WHITE, 1, player_name, PLAYER_NAME_LENGTH };
function init() {
    setting_clear_personal_savings();
    scenario_settings_init();
    string_copy(lang_get_string(9, 5), player_name, PLAYER_NAME_LENGTH);
    input_box_start(player_name_input);
}
function draw_background() {
    graphics_clear_screen();
    graphics_in_dialog();
    image_draw(image_group(GROUP_MAIN_MENU_BACKGROUND), 0, 0);
    graphics_reset_dialog();
}
function draw_foreground() {
    graphics_in_dialog();
    outer_panel_draw(128, 160, 24, 8);
    lang_text_draw_centered(31, 0, 128, 172, 384, FONT_LARGE_BLACK);
    lang_text_draw(13, 5, 352, 256, FONT_NORMAL_BLACK);
    lang_text_draw(12, 0, 200, 256, FONT_NORMAL_BLACK);
    input_box_draw(player_name_input);
    image_buttons_draw(159, 249, image_buttons, 2);
    graphics_reset_dialog();
}
function handle_input(m: mouse, h: hotkeys) {
    let m_dialog: mouse = mouse_in_dialog(m);
    if (input_box_handle_mouse(m_dialog, player_name_input) ||
        image_buttons_handle_mouse(m_dialog, 159, 249, image_buttons, 2, 0)) {
        return;
    }
    if (input_box_is_accepted(player_name_input)) {
        start_mission(0, 0);
        return;
    }
    if (input_go_back_requested(m, h)) {
        button_back(0, 0);
    }
}
function button_back(param1: number, param2: number) {
    input_box_stop(player_name_input);
    window_go_back();
}
function start_mission(param1: number, param2: number) {
    input_box_stop(player_name_input);
    setting_set_player_name(player_name);
    window_mission_selection_show();
}
export function window_new_career_show() {
    let window: window_type = {
        WINDOW_NEW_CAREER,
        draw_background,
        draw_foreground,
        handle_input
    };
    init();
    window_show(window);
}
