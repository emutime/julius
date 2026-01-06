
import { city_emperor_can_send_gift, city_emperor_get_gift, city_emperor_init_selected_gift, city_emperor_months_since_gift, city_emperor_selected_gift_size, city_emperor_send_gift, city_emperor_set_gift_size, emperor_gift, gift } from 'city/emperor';
import { image_group } from 'core/image';
import { group_terrain } from 'core/image_group';
import { resource_type } from 'game/resource';
import { button_border_draw, button_none } from 'graphics/button';
import { font_t } from 'graphics/font';
import { generic_button, generic_buttons_handle_mouse } from 'graphics/generic_button';
import { graphics_in_dialog, graphics_reset_dialog } from 'graphics/graphics';
import { image_draw } from 'graphics/image';
import { lang_text_draw, lang_text_draw_amount, lang_text_draw_centered, lang_text_draw_multiline } from 'graphics/lang_text';
import { inner_panel_draw, outer_panel_draw } from 'graphics/panel';
import { text_draw_money } from 'graphics/text';
import { window_id, window_invalidate, window_show, window_type } from 'graphics/window';
import { hotkeys } from 'input/hotkey';
import { input_go_back_requested } from 'input/input';
import { mouse, mouse_in_dialog } from 'input/mouse';
import { window_advisors_draw_dialog_background, window_advisors_show } from 'window/advisors';
import { Ref } from '../../ext/crt';
import GIFT_MODEST = gift.GIFT_MODEST;
import GIFT_GENEROUS = gift.GIFT_GENEROUS;
import GIFT_LAVISH = gift.GIFT_LAVISH;
import RESOURCE_DENARII = resource_type.RESOURCE_DENARII;
import GROUP_RESOURCE_ICONS = group_terrain.GROUP_RESOURCE_ICONS;
import FONT_NORMAL_BLACK = font_t.FONT_NORMAL_BLACK;
import FONT_NORMAL_WHITE = font_t.FONT_NORMAL_WHITE;
import FONT_NORMAL_RED = font_t.FONT_NORMAL_RED;
import FONT_LARGE_BLACK = font_t.FONT_LARGE_BLACK;
import WINDOW_GIFT_TO_EMPEROR = window_id.WINDOW_GIFT_TO_EMPEROR;
let buttons: generic_button[] = [
    new generic_button(208, 213, 300, 20, button_set_gift, button_none, 1, 0),
    new generic_button(208, 233, 300, 20, button_set_gift, button_none, 2, 0),
    new generic_button(208, 253, 300, 20, button_set_gift, button_none, 3, 0),
    new generic_button(118, 336, 260, 20, button_send_gift, button_none, 0, 0),
    new generic_button(400, 336, 160, 20, button_cancel, button_none, 0, 0),
];
let focus_button_id: Ref<number> = new Ref(0);
function init() {
    city_emperor_init_selected_gift();
}
function draw_background() {
    window_advisors_draw_dialog_background();
    graphics_in_dialog();
    outer_panel_draw(96, 144, 30, 15);
    image_draw(image_group(GROUP_RESOURCE_ICONS) + RESOURCE_DENARII, 112, 160);
    lang_text_draw_centered(52, 69, 144, 160, 416, FONT_LARGE_BLACK);
    let width: number = lang_text_draw(52, 50, 144, 304, FONT_NORMAL_BLACK);
    lang_text_draw_amount(8, 4, city_emperor_months_since_gift(), 144 + width, 304, FONT_NORMAL_BLACK);
    lang_text_draw_centered(13, 4, 400, 341, 160, FONT_NORMAL_BLACK);
    graphics_reset_dialog();
}
function draw_foreground() {
    graphics_in_dialog();
    inner_panel_draw(112, 208, 28, 5);
    if (city_emperor_can_send_gift(GIFT_MODEST)) {
        let gift: emperor_gift = city_emperor_get_gift(GIFT_MODEST);
        lang_text_draw(52, 63, 128, 218, FONT_NORMAL_WHITE);
        let font: font_t = focus_button_id.v == 1 ? FONT_NORMAL_RED : FONT_NORMAL_WHITE;
        let width: number = lang_text_draw(52, 51 + gift.id, 224, 218, font);
        text_draw_money(gift.cost, 224 + width, 218, font);
    } else {
        lang_text_draw_multiline(52, 70, 160, 224, 352, FONT_NORMAL_WHITE);
    }
    if (city_emperor_can_send_gift(GIFT_GENEROUS)) {
        let gift: emperor_gift = city_emperor_get_gift(GIFT_GENEROUS);
        lang_text_draw(52, 64, 128, 238, FONT_NORMAL_WHITE);
        let font: font_t = focus_button_id.v == 2 ? FONT_NORMAL_RED : FONT_NORMAL_WHITE;
        let width: number = lang_text_draw(52, 55 + gift.id, 224, 238, font);
        text_draw_money(gift.cost, 224 + width, 238, font);
    }
    if (city_emperor_can_send_gift(GIFT_LAVISH)) {
        let gift: emperor_gift = city_emperor_get_gift(GIFT_LAVISH);
        lang_text_draw(52, 65, 128, 258, FONT_NORMAL_WHITE);
        let font: font_t = focus_button_id.v == 3 ? FONT_NORMAL_RED : FONT_NORMAL_WHITE;
        let width: number = lang_text_draw(52, 59 + gift.id, 224, 258, font);
        text_draw_money(gift.cost, 224 + width, 258, font);
    }
    if (city_emperor_can_send_gift(GIFT_MODEST)) {
        lang_text_draw_centered(52, 66 + city_emperor_selected_gift_size(), 118, 341, 260, FONT_NORMAL_BLACK);
        button_border_draw(118, 336, 260, 20, focus_button_id.v == 4);
    }
    button_border_draw(400, 336, 160, 20, focus_button_id.v == 5);
    graphics_reset_dialog();
}
function handle_input(m: mouse, h: hotkeys) {
    if (generic_buttons_handle_mouse(mouse_in_dialog(m), 0, 0, buttons, 5, focus_button_id)) {
        return;
    }
    if (input_go_back_requested(m, h)) {
        window_advisors_show();
    }
}
function button_set_gift(gift_id: number, param2: number) {
    if (city_emperor_set_gift_size(gift_id - 1)) {
        window_invalidate();
    }
}
function button_send_gift(param1: number, param2: number) {
    if (city_emperor_can_send_gift(GIFT_MODEST)) {
        city_emperor_send_gift();
        window_advisors_show();
    }
}
function button_cancel(param1: number, param2: number) {
    window_advisors_show();
}
export function window_gift_to_emperor_show() {
    let window: window_type = new window_type(
        WINDOW_GIFT_TO_EMPEROR,
        draw_background,
        draw_foreground,
        handle_input
    );
    init();
    window_show(window);
}
