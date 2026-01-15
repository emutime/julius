
import { city_emperor_change_donation_amount, city_emperor_donate_amount, city_emperor_donate_savings_to_city, city_emperor_init_donation_amount, city_emperor_set_donation_amount } from 'city/emperor';
import { image_group } from 'core/image';
import { group_terrain } from 'core/image_group';
import { resource_type } from 'game/resource';
import { arrow_button, arrow_buttons_draw, arrow_buttons_handle_mouse } from 'graphics/arrow_button';
import { button_border_draw, button_none } from 'graphics/button';
import { font_t } from 'graphics/font';
import { generic_button, generic_buttons_handle_mouse } from 'graphics/generic_button';
import { graphics_in_dialog, graphics_reset_dialog } from 'graphics/graphics';
import { image_draw } from 'graphics/image';
import { lang_text_draw, lang_text_draw_centered } from 'graphics/lang_text';
import { inner_panel_draw, outer_panel_draw } from 'graphics/panel';
import { text_draw_number, text_draw_number_centered } from 'graphics/text';
import { tooltip_context, tooltip_type } from 'graphics/tooltip';
import { window_id, window_invalidate, window_show, window_type } from 'graphics/window';
import { hotkeys } from 'input/hotkey';
import { input_go_back_requested } from 'input/input';
import { mouse, mouse_in_dialog } from 'input/mouse';
import { window_advisors_draw_dialog_background, window_advisors_show } from 'window/advisors';
import { Ref } from '../../ext/crt';
;
import RESOURCE_DENARII = resource_type.RESOURCE_DENARII;
import GROUP_RESOURCE_ICONS = group_terrain.GROUP_RESOURCE_ICONS;
import FONT_NORMAL_BLACK = font_t.FONT_NORMAL_BLACK;
import FONT_NORMAL_WHITE = font_t.FONT_NORMAL_WHITE;
import FONT_LARGE_BLACK = font_t.FONT_LARGE_BLACK;
import TOOLTIP_BUTTON = tooltip_type.TOOLTIP_BUTTON;
import WINDOW_DONATE_TO_CITY = window_id.WINDOW_DONATE_TO_CITY;
let buttons: generic_button[] = [
    new generic_button(336, 283, 160, 20, button_cancel, button_none, 0, 0),
    new generic_button(144, 283, 160, 20, button_donate, button_none, 0, 0),
    new generic_button(128, 216, 64, 20, button_set_amount, button_none, 0, 0),
    new generic_button(208, 216, 64, 20, button_set_amount, button_none, 1, 0),
    new generic_button(288, 216, 64, 20, button_set_amount, button_none, 2, 0),
    new generic_button(368, 216, 64, 20, button_set_amount, button_none, 3, 0),
    new generic_button(448, 216, 64, 20, button_set_amount, button_none, 4, 0),
];
let arrow_buttons: arrow_button[] = [
    new arrow_button(240, 242, 17, 24, arrow_button_amount, 1, 0),
    new arrow_button(264, 242, 15, 24, arrow_button_amount, 0, 0),
];
export class unnamed37_8 {
    public focus_button_id: number = 0;
    public focus_arrow_button_id: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.focus_button_id = args[0]);
        args.length >= 2 && (this.focus_arrow_button_id = args[1]);
    }
}
let data: unnamed37_8 = new unnamed37_8();
function draw_background() {
    window_advisors_draw_dialog_background();
    graphics_in_dialog();
    outer_panel_draw(64, 160, 32, 10);
    image_draw(image_group(GROUP_RESOURCE_ICONS) + RESOURCE_DENARII, 80, 176);
    lang_text_draw_centered(52, 16, 112, 176, 448, FONT_LARGE_BLACK);
    inner_panel_draw(112, 208, 26, 4);
    text_draw_number_centered(0, 124, 221, 64, FONT_NORMAL_WHITE);
    text_draw_number_centered(500, 204, 221, 64, FONT_NORMAL_WHITE);
    text_draw_number_centered(2000, 284, 221, 64, FONT_NORMAL_WHITE);
    text_draw_number_centered(5000, 364, 221, 64, FONT_NORMAL_WHITE);
    lang_text_draw_centered(52, 19, 444, 221, 64, FONT_NORMAL_WHITE);
    let width: number = lang_text_draw(52, 17, 128, 248, FONT_NORMAL_WHITE);
    let button_start: number = 128 + width + 10;
    if (button_start < 240) {
        button_start = 240;
    }
    arrow_buttons[0].x_offset = button_start;
    arrow_buttons[1].x_offset = arrow_buttons[0].x_offset + arrow_buttons[0].size;
    text_draw_number(city_emperor_donate_amount(), '@', " ", button_start + 76, 248, FONT_NORMAL_WHITE);
    lang_text_draw_centered(13, 4, 336, 288, 160, FONT_NORMAL_BLACK);
    lang_text_draw_centered(52, 18, 144, 288, 160, FONT_NORMAL_BLACK);
    graphics_reset_dialog();
}
function draw_foreground() {
    graphics_in_dialog();
    button_border_draw(128, 216, 64, 20, data.focus_button_id == 3);
    button_border_draw(208, 216, 64, 20, data.focus_button_id == 4);
    button_border_draw(288, 216, 64, 20, data.focus_button_id == 5);
    button_border_draw(368, 216, 64, 20, data.focus_button_id == 6);
    button_border_draw(448, 216, 64, 20, data.focus_button_id == 7);
    button_border_draw(336, 283, 160, 20, data.focus_button_id == 1);
    button_border_draw(144, 283, 160, 20, data.focus_button_id == 2);
    arrow_buttons_draw(0, 0, arrow_buttons, 2);
    graphics_reset_dialog();
}
function handle_input(m: mouse, h: hotkeys) {
    data.focus_arrow_button_id = 0;
    let m_dialog: mouse = mouse_in_dialog(m);
    const focusRef = new Ref(data.focus_button_id);
    if (generic_buttons_handle_mouse(m_dialog, 0, 0, buttons, 7, focusRef)) {
        data.focus_button_id = focusRef.v;
        return;
    }
    data.focus_button_id = focusRef.v;
    const arrowFocus = arrow_buttons_handle_mouse(m_dialog, 0, 0, arrow_buttons, 2, data.focus_arrow_button_id);
    data.focus_arrow_button_id = arrowFocus;
    if (arrowFocus) {
        return;
    }
    if (input_go_back_requested(m, h)) {
        window_advisors_show();
    }
}
function button_set_amount(amount_id: number, param2: number) {
    let amount: number;
    switch (amount_id) {
        case 0:
            amount = 0;
            break
        case 1:
            amount = 500;
            break
        case 2:
            amount = 2000;
            break
        case 3:
            amount = 5000;
            break
        case 4:
            amount = 1000000;
            break
        default: return
    }
    city_emperor_set_donation_amount(amount);
    window_invalidate();
}
function button_donate(param1: number, param2: number) {
    city_emperor_donate_savings_to_city();
    window_advisors_show();
}
function button_cancel(param1: number, param2: number) {
    window_advisors_show();
}
function arrow_button_amount(is_down: number, param2: number) {
    city_emperor_change_donation_amount(is_down ? -10 : 10);
    window_invalidate();
}
function get_tooltip(c: tooltip_context) {
    if (!data.focus_button_id && !data.focus_arrow_button_id) {
        return;
    }
    c.type = TOOLTIP_BUTTON;
    if (data.focus_button_id == 1) {
        c.text_id = 98;
    } else if (data.focus_button_id == 2) {
        c.text_id = 99;
    } else if (data.focus_button_id) {
        c.text_id = 100;
    } else if (data.focus_arrow_button_id) {
        c.text_id = 101;
    }
}
export function window_donate_to_city_show() {
    let window: window_type = new window_type(
        WINDOW_DONATE_TO_CITY,
        draw_background,
        draw_foreground,
        handle_input,
        get_tooltip
    );
    city_emperor_init_donation_amount();
    window_show(window);
}
