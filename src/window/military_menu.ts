export const MENU_X_OFFSET = 170;
export const MENU_CLICK_MARGIN = 20;
export const MENU_Y_OFFSET = 72;
export const MENU_ITEM_HEIGHT = 24;
;
import { buffer } from 'core/buffer';
import { view_tile } from 'city/view';
import { map_callback } from 'city/view';
import { city_view_go_to_grid_offset } from 'city/view';
import { city_view_get_viewport } from 'city/view';
import { figure_type } from 'figure/type';
import { formation_state } from 'figure/formation';
import { formation } from 'figure/formation';
import { formation_get } from 'figure/formation';
import { formation_get_num_legions } from 'figure/formation';
import { formation_for_legion } from 'figure/formation';
import { button_none } from 'graphics/button';
import { time_millis } from 'core/time';
import { touch_coords } from 'input/touch';
import { touch_mode } from 'input/touch';
import { touch } from 'input/touch';
import { mouse_button } from 'input/mouse';
import { scroll_state } from 'input/mouse';
import { mouse } from 'input/mouse';
import { generic_button } from 'graphics/generic_button';
import { generic_buttons_handle_mouse } from 'graphics/generic_button';
import { language_type } from 'core/locale';
import { encoding_type } from 'core/encoding';
import { font_t } from 'graphics/font';
import FONT_NORMAL_GREEN = font_t.FONT_NORMAL_GREEN;
import { font_t } from 'graphics/font';
import { font_definition } from 'graphics/font';
import { color_t } from 'graphics/color';
import { lang_text_draw_centered } from 'graphics/lang_text';
import { label_draw } from 'graphics/panel';
import { tooltip_type } from 'graphics/tooltip';
import { tooltip_extra_text_type } from 'graphics/tooltip';
import { tooltip_context } from 'graphics/tooltip';
import { key_type } from 'input/keys';
import { key_modifier_type } from 'input/keys';
import { hotkey_action } from 'core/hotkey_config';
import { hotkey_mapping } from 'core/hotkey_config';
import { hotkeys } from 'input/hotkey';
import { window_id } from 'graphics/window';
import WINDOW_MILITARY_MENU = window_id.WINDOW_MILITARY_MENU;
import { window_id } from 'graphics/window';
import { window_type } from 'graphics/window';
import { window_show } from 'graphics/window';
import { window_go_back } from 'graphics/window';
import { input_go_back_requested } from 'input/input';
import { GRID } from 'map/grid';
import GRID_SIZE = GRID.GRID_SIZE;
import { map_grid_offset } from 'map/grid';
import { window_city_draw_panels } from 'window/city';
import { window_city_draw } from 'window/city';
import { window_city_military_show } from 'window/city';
export class unnamed19_8 {
    public active_buttons: number = 0;
    public focus_button_id: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.active_buttons = args[0]);
        args.length >= 2 && (this.focus_button_id = args[1]);
    }
}
let data: unnamed19_8 = new unnamed19_8();
let menu_buttons: generic_button[] = new Array().fill({
    { 0, 0, 160, 24, button_menu_item, button_none, 1, 0},
    { 0, 24, 160, 24, button_menu_item, button_none, 2, 0},
    { 0, 48, 160, 24, button_menu_item, button_none, 3, 0},
    { 0, 72, 160, 24, button_menu_item, button_none, 4, 0},
    { 0, 96, 160, 24, button_menu_item, button_none, 5, 0},
    { 0, 120, 160, 24, button_menu_item, button_none, 6, 0},
});
function get_sidebar_x_offset() {
    let view_x: number
    let view_y: number
    let view_width: number
    let view_height: number;
    city_view_get_viewport(view_x, view_y, view_width, view_height);
    return view_x + view_width;
}
function draw_background() {
    window_city_draw_panels();
}
function draw_foreground() {
    window_city_draw();
    let num_legions: number = formation_get_num_legions();
    let x_offset: number = get_sidebar_x_offset();
    for (let i: number = 0; i < num_legions; i++) {
        let m: formation = formation_get(formation_for_legion(i + 1));
        label_draw(x_offset - 170, 74 + 24 * i, 10, data.focus_button_id == i + 1 ? 1 : 2);
        lang_text_draw_centered(138, m.legion_id, x_offset - 170, 77 + 24 * i, 160, FONT_NORMAL_GREEN);
    }
    data.active_buttons = num_legions;
}
function click_outside_menu(m: mouse, x_offset: number) {
    return m.left.went_up &&
        (m.x < x_offset - MENU_X_OFFSET - MENU_CLICK_MARGIN ||
            m.x > x_offset + MENU_CLICK_MARGIN ||
            m.y < MENU_Y_OFFSET - MENU_CLICK_MARGIN ||
            m.y > MENU_Y_OFFSET + MENU_CLICK_MARGIN + MENU_ITEM_HEIGHT * data.active_buttons);
}
function handle_input(m: mouse, h: hotkeys) {
    let x_offset: number = get_sidebar_x_offset();
    if (generic_buttons_handle_mouse(m, x_offset - MENU_X_OFFSET, MENU_Y_OFFSET,
        menu_buttons, data.active_buttons, data.focus_button_id)) {
        return;
    }
    if (input_go_back_requested(m, h)) {
        window_go_back();
        return;
    }
    if (click_outside_menu(m, x_offset)) {
        window_go_back();
    }
}
function button_menu_item(index: number, param2: number) {
    let formation_id: number = formation_for_legion(index);
    let m: formation = formation_get(formation_id);
    city_view_go_to_grid_offset(map_grid_offset(m.x_home, m.y_home));
    window_city_military_show(formation_id);
}
export function window_military_menu_show() {
    let window: window_type = {
        WINDOW_MILITARY_MENU,
        draw_background,
        draw_foreground,
        handle_input,
        0
    };
    window_show(window);
}
