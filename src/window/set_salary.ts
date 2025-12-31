export const MIN_DIALOG_WIDTH = 384;
import { BLOCK_SIZE } from 'graphics/panel';
import { emperor_gift } from 'city/emperor';
import { city_emperor_salary_for_rank } from 'city/emperor';
import { city_emperor_set_salary_rank } from 'city/emperor';
import { city_emperor_salary_rank } from 'city/emperor';
import { city_emperor_rank } from 'city/emperor';
import { city_finance_update_salary } from 'city/finance';
import { finance_overview } from 'city/finance';
import { building_type } from 'building/type';
import { selected_rating } from 'city/ratings';
import { city_ratings_update_favor_explanation } from 'city/ratings';
import { city_victory_has_won } from 'city/victory';
import { resource_type } from 'game/resource';
import RESOURCE_DENARII = resource_type.RESOURCE_DENARII;
import { resource_type } from 'game/resource';
import { workshop_type } from 'game/resource';
import { resource_image_type } from 'game/resource';
import { button_none } from 'graphics/button';
import { button_border_draw } from 'graphics/button';
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
import { group_terrain } from 'core/image_group';
import GROUP_RESOURCE_ICONS = group_terrain.GROUP_RESOURCE_ICONS;
import { image } from 'core/image';
import { image_group } from 'core/image';
import { font_t } from 'graphics/font';
import FONT_NORMAL_BLACK = font_t.FONT_NORMAL_BLACK;
import FONT_NORMAL_WHITE = font_t.FONT_NORMAL_WHITE;
import FONT_NORMAL_RED = font_t.FONT_NORMAL_RED;
import FONT_LARGE_BLACK = font_t.FONT_LARGE_BLACK;
import { font_t } from 'graphics/font';
import { font_definition } from 'graphics/font';
import { image_draw } from 'graphics/image';
import { lang_text_get_width } from 'graphics/lang_text';
import { lang_text_draw } from 'graphics/lang_text';
import { lang_text_draw_centered } from 'graphics/lang_text';
import { lang_text_draw_multiline } from 'graphics/lang_text';
import { outer_panel_draw } from 'graphics/panel';
import { inner_panel_draw } from 'graphics/panel';
import { text_draw_money } from 'graphics/text';
import { tooltip_type } from 'graphics/tooltip';
import { tooltip_extra_text_type } from 'graphics/tooltip';
import { tooltip_context } from 'graphics/tooltip';
import { key_type } from 'input/keys';
import { key_modifier_type } from 'input/keys';
import { hotkey_action } from 'core/hotkey_config';
import { hotkey_mapping } from 'core/hotkey_config';
import { hotkeys } from 'input/hotkey';
import { window_id } from 'graphics/window';
import WINDOW_SET_SALARY = window_id.WINDOW_SET_SALARY;
import { window_id } from 'graphics/window';
import { window_type } from 'graphics/window';
import { window_show } from 'graphics/window';
import { input_go_back_requested } from 'input/input';
import { advisor_type } from 'city/constants';
import { window_advisors_draw_dialog_background } from 'window/advisors';
import { window_advisors_show } from 'window/advisors';
let buttons: generic_button[] = new Array().fill({
    { 240, 395, 160, 20, button_cancel, button_none, 0, 0},
    { 144, 85, 352, 20, button_set_salary, button_none, 0, 0},
    { 144, 105, 352, 20, button_set_salary, button_none, 1, 0},
    { 144, 125, 352, 20, button_set_salary, button_none, 2, 0},
    { 144, 145, 352, 20, button_set_salary, button_none, 3, 0},
    { 144, 165, 352, 20, button_set_salary, button_none, 4, 0},
    { 144, 185, 352, 20, button_set_salary, button_none, 5, 0},
    { 144, 205, 352, 20, button_set_salary, button_none, 6, 0},
    { 144, 225, 352, 20, button_set_salary, button_none, 7, 0},
    { 144, 245, 352, 20, button_set_salary, button_none, 8, 0},
    { 144, 265, 352, 20, button_set_salary, button_none, 9, 0},
    { 144, 285, 352, 20, button_set_salary, button_none, 10, 0},
});
let focus_button_id: number;
function get_dialog_width() {
    let dialog_width: number = 16 + lang_text_get_width(52, 15, FONT_LARGE_BLACK);
    if (dialog_width < MIN_DIALOG_WIDTH) {
        dialog_width = MIN_DIALOG_WIDTH;
    }
    if (dialog_width % BLOCK_SIZE != 0) {
        dialog_width += BLOCK_SIZE - dialog_width % BLOCK_SIZE
    }
    return dialog_width;
}
function draw_foreground() {
    graphics_in_dialog();
    let dialog_width: number = get_dialog_width();
    let dialog_x: number = 128 - (dialog_width - MIN_DIALOG_WIDTH) / 2;
    outer_panel_draw(dialog_x, 32, dialog_width / BLOCK_SIZE, 25);
    image_draw(image_group(GROUP_RESOURCE_ICONS) + RESOURCE_DENARII, dialog_x + 16, 48);
    lang_text_draw_centered(52, 15, dialog_x + 48, 48, dialog_width - 64, FONT_LARGE_BLACK);
    inner_panel_draw(144, 80, 22, 15);
    for (let rank: number = 0; rank < 11; rank++) {
        let font: font_t = focus_button_id == rank + 2 ? FONT_NORMAL_RED : FONT_NORMAL_WHITE;
        let width: number = lang_text_draw(52, rank + 4, 176, 90 + 20 * rank, font);
        text_draw_money(city_emperor_salary_for_rank(rank), 176 + width, 90 + 20 * rank, font);
    }
    if (!city_victory_has_won()) {
        if (city_emperor_salary_rank() <= city_emperor_rank()) {
            lang_text_draw_multiline(52, 76, 152, 336, 336, FONT_NORMAL_BLACK);
        } else {
            lang_text_draw_multiline(52, 71, 152, 336, 336, FONT_NORMAL_BLACK);
        }
    } else {
        lang_text_draw_multiline(52, 77, 152, 336, 336, FONT_NORMAL_BLACK);
    }
    button_border_draw(240, 395, 160, 20, focus_button_id == 1);
    lang_text_draw_centered(13, 4, 176, 400, 288, FONT_NORMAL_BLACK);
    graphics_reset_dialog();
}
function handle_input(m: mouse, h: hotkeys) {
    if (generic_buttons_handle_mouse(mouse_in_dialog(m), 0, 0, buttons, 12, focus_button_id)) {
        return;
    }
    if (input_go_back_requested(m, h)) {
        window_advisors_show();
    }
}
function button_cancel(param1: number, param2: number) {
    window_advisors_show();
}
function button_set_salary(rank: number, param2: number) {
    if (!city_victory_has_won()) {
        city_emperor_set_salary_rank(rank);
        city_finance_update_salary();
        city_ratings_update_favor_explanation();
        window_advisors_show();
    }
}
export function window_set_salary_show() {
    let window: window_type = {
        WINDOW_SET_SALARY,
        window_advisors_draw_dialog_background,
        draw_foreground,
        handle_input
    };
    window_show(window);
}
