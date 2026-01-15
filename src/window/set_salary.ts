export const MIN_DIALOG_WIDTH = 384;
import { city_emperor_rank, city_emperor_salary_for_rank, city_emperor_salary_rank, city_emperor_set_salary_rank } from 'city/emperor';
import { city_finance_update_salary } from 'city/finance';
import { city_ratings_update_favor_explanation } from 'city/ratings';
import { city_victory_has_won } from 'city/victory';
import { image_group } from 'core/image';
import { group_terrain } from 'core/image_group';
import { resource_type } from 'game/resource';
import { button_border_draw, button_none } from 'graphics/button';
import { font_t } from 'graphics/font';
import { generic_button, generic_buttons_handle_mouse } from 'graphics/generic_button';
import { graphics_in_dialog, graphics_reset_dialog } from 'graphics/graphics';
import { image_draw } from 'graphics/image';
import { lang_text_draw, lang_text_draw_centered, lang_text_draw_multiline, lang_text_get_width } from 'graphics/lang_text';
import { BLOCK_SIZE, inner_panel_draw, outer_panel_draw } from 'graphics/panel';
import { text_draw_money } from 'graphics/text';
import { window_id, window_show, window_type } from 'graphics/window';
import { hotkeys } from 'input/hotkey';
import { input_go_back_requested } from 'input/input';
import { mouse, mouse_in_dialog } from 'input/mouse';
import { window_advisors_draw_dialog_background, window_advisors_show } from 'window/advisors';
import { Ref } from '../../ext/crt';
import RESOURCE_DENARII = resource_type.RESOURCE_DENARII;
;
import GROUP_RESOURCE_ICONS = group_terrain.GROUP_RESOURCE_ICONS;
import FONT_NORMAL_BLACK = font_t.FONT_NORMAL_BLACK;
import FONT_NORMAL_WHITE = font_t.FONT_NORMAL_WHITE;
import FONT_NORMAL_RED = font_t.FONT_NORMAL_RED;
import FONT_LARGE_BLACK = font_t.FONT_LARGE_BLACK;
import WINDOW_SET_SALARY = window_id.WINDOW_SET_SALARY;
let buttons: generic_button[] = [
    new generic_button(240, 395, 160, 20, button_cancel, button_none, 0, 0),
    new generic_button(144, 85, 352, 20, button_set_salary, button_none, 0, 0),
    new generic_button(144, 105, 352, 20, button_set_salary, button_none, 1, 0),
    new generic_button(144, 125, 352, 20, button_set_salary, button_none, 2, 0),
    new generic_button(144, 145, 352, 20, button_set_salary, button_none, 3, 0),
    new generic_button(144, 165, 352, 20, button_set_salary, button_none, 4, 0),
    new generic_button(144, 185, 352, 20, button_set_salary, button_none, 5, 0),
    new generic_button(144, 205, 352, 20, button_set_salary, button_none, 6, 0),
    new generic_button(144, 225, 352, 20, button_set_salary, button_none, 7, 0),
    new generic_button(144, 245, 352, 20, button_set_salary, button_none, 8, 0),
    new generic_button(144, 265, 352, 20, button_set_salary, button_none, 9, 0),
    new generic_button(144, 285, 352, 20, button_set_salary, button_none, 10, 0),
];

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
    const focusRef = new Ref(focus_button_id);
    if (generic_buttons_handle_mouse(mouse_in_dialog(m), 0, 0, buttons, 12, focusRef)) {
        focus_button_id = focusRef.v;
        return;
    }
    focus_button_id = focusRef.v;
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
    let window: window_type = new window_type(
        WINDOW_SET_SALARY,
        window_advisors_draw_dialog_background,
        draw_foreground,
        handle_input
    );
    window_show(window);
}
