export const MAX_RANK = 10;
import { victory_state } from 'city/victory';
import VICTORY_STATE_WON = victory_state.VICTORY_STATE_WON;
import { city_victory_reset } from 'city/victory';
import { city_victory_state } from 'city/victory';
import { city_victory_continue_governing } from 'city/victory';
import { button_none } from 'graphics/button';
import { time_millis } from 'core/time';
import { touch_coords } from 'input/touch';
import { touch_mode } from 'input/touch';
import { touch } from 'input/touch';
import { mouse_button } from 'input/mouse';
import { scroll_state } from 'input/mouse';
import { mouse } from 'input/mouse';
import { mouse_in_dialog } from 'input/mouse';
import { generic_button } from 'graphics/generic_button';
import { generic_buttons_handle_mouse } from 'graphics/generic_button';;
import { color_t } from 'graphics/color';
import { clip_code } from 'graphics/graphics';
import { clip_info } from 'graphics/graphics';
import { graphics_in_dialog } from 'graphics/graphics';
import { graphics_reset_dialog } from 'graphics/graphics';
import { language_type } from 'core/locale';
import { encoding_type } from 'core/encoding';
import { font_t } from 'graphics/font';
import FONT_NORMAL_BLACK = font_t.FONT_NORMAL_BLACK;
import FONT_LARGE_BLACK = font_t.FONT_LARGE_BLACK;
import FONT_NORMAL_GREEN = font_t.FONT_NORMAL_GREEN;
import { font_t } from 'graphics/font';
import { font_definition } from 'graphics/font';
import { lang_text_draw_centered } from 'graphics/lang_text';
import { lang_text_draw_multiline } from 'graphics/lang_text';
import { outer_panel_draw } from 'graphics/panel';
import { large_label_draw } from 'graphics/panel';
import { text_draw_centered } from 'graphics/text';
import { tooltip_type } from 'graphics/tooltip';
import { tooltip_extra_text_type } from 'graphics/tooltip';
import { tooltip_context } from 'graphics/tooltip';
import { key_type } from 'input/keys';
import { key_modifier_type } from 'input/keys';
import { hotkey_action } from 'core/hotkey_config';
import { hotkey_mapping } from 'core/hotkey_config';
import { hotkeys } from 'input/hotkey';
import { window_id } from 'graphics/window';
import WINDOW_VICTORY_DIALOG = window_id.WINDOW_VICTORY_DIALOG;
import { window_id } from 'graphics/window';
import { window_type } from 'graphics/window';
import { window_show } from 'graphics/window';
import { scenario_climate } from 'scenario/property';
import { scenario_is_custom } from 'scenario/property';
import { scenario_campaign_rank } from 'scenario/property';
import { scenario_player_name } from 'scenario/property';
import { scenario_property_player_rank } from 'scenario/property';
import { sound_music_update } from 'sound/music';
import { window_city_show } from 'window/city';
let victory_buttons: generic_button[] = new Array().fill({
    { 32, 112, 480, 20, button_accept, button_none, 0, 0},
    { 32, 144, 480, 20, button_continue_governing, button_none, 24, 0},
    { 32, 176, 480, 20, button_continue_governing, button_none, 60, 0},
});
let focus_button_id: number = 0;
function get_next_rank() {
    let current_rank: number = 0;
    if (scenario_is_custom()) {
        current_rank = scenario_property_player_rank();
    } else {
        current_rank = scenario_campaign_rank();
    }
    if (current_rank < MAX_RANK) {
        return current_rank + 1;
    } else {
        return MAX_RANK;
    }
}
function draw_background() {
    graphics_in_dialog();
    outer_panel_draw(48, 128, 34, 15);
    if (scenario_campaign_rank() < 10 || scenario_is_custom()) {
        lang_text_draw_centered(62, 0, 48, 144, 544, FONT_LARGE_BLACK);
        lang_text_draw_centered(62, 2, 48, 175, 544, FONT_NORMAL_BLACK);
        lang_text_draw_centered(32, get_next_rank(), 48, 194, 544, FONT_LARGE_BLACK);
    } else {
        text_draw_centered(scenario_player_name(), 48, 144, 512, FONT_LARGE_BLACK, 0);
        lang_text_draw_multiline(62, 26, 80, 175, 480, FONT_NORMAL_BLACK);
    }
    graphics_reset_dialog();
}
function draw_foreground() {
    graphics_in_dialog();
    if (city_victory_state() == VICTORY_STATE_WON) {
        large_label_draw(80, 240, 30, focus_button_id == 1);
        if (scenario_campaign_rank() < 10 || scenario_is_custom()) {
            lang_text_draw_centered(62, 3, 80, 246, 480, FONT_NORMAL_GREEN);
        } else {
            lang_text_draw_centered(62, 27, 80, 246, 480, FONT_NORMAL_GREEN);
        }
        if (scenario_campaign_rank() >= 2 || scenario_is_custom()) {
            large_label_draw(80, 272, 30, focus_button_id == 2);
            lang_text_draw_centered(62, 4, 80, 278, 480, FONT_NORMAL_GREEN);
            large_label_draw(80, 304, 30, focus_button_id == 3);
            lang_text_draw_centered(62, 5, 80, 310, 480, FONT_NORMAL_GREEN);
        }
    } else {
        large_label_draw(80, 224, 30, focus_button_id == 1);
        lang_text_draw_centered(62, 6, 80, 230, 480, FONT_NORMAL_GREEN);
    }
    graphics_reset_dialog();
}
function handle_input(m: mouse, h: hotkeys) {
    let num_buttons: number;
    if (scenario_campaign_rank() >= 2 || scenario_is_custom()) {
        num_buttons = 3;
    } else {
        num_buttons = 1;
    }
    generic_buttons_handle_mouse(mouse_in_dialog(m), 48, 128, victory_buttons, num_buttons, focus_button_id);
}
function button_accept(param1: number, param2: number) {
    window_city_show();
}
function button_continue_governing(months: number, param2: number) {
    city_victory_continue_governing(months);
    window_city_show();
    city_victory_reset();
    sound_music_update(1);
}
export function window_victory_dialog_show() {
    let window: window_type = {
        WINDOW_VICTORY_DIALOG,
        draw_background,
        draw_foreground,
        handle_input
    };
    window_show(window);
}
