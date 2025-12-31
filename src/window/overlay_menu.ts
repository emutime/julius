export const MENU_CLICK_MARGIN = 20;
export const SUBMENU_X_OFFSET = 348;
export const MENU_X_OFFSET = 170;
export const MENU_Y_OFFSET = 72;
export const MENU_ITEM_HEIGHT = 24;
export const MAX_BUTTONS = 8;
;
import { buffer } from 'core/buffer';
import { view_tile } from 'city/view';
import { map_callback } from 'city/view';
import { city_view_get_viewport } from 'city/view';
import { time_millis } from 'core/time';
import { time_get_millis } from 'core/time';
import { overlay } from 'game/state';
import OVERLAY_NONE = overlay.OVERLAY_NONE;
import OVERLAY_WATER = overlay.OVERLAY_WATER;
import OVERLAY_RELIGION = overlay.OVERLAY_RELIGION;
import OVERLAY_FIRE = overlay.OVERLAY_FIRE;
import OVERLAY_DAMAGE = overlay.OVERLAY_DAMAGE;
import OVERLAY_CRIME = overlay.OVERLAY_CRIME;
import OVERLAY_ENTERTAINMENT = overlay.OVERLAY_ENTERTAINMENT;
import OVERLAY_THEATER = overlay.OVERLAY_THEATER;
import OVERLAY_AMPHITHEATER = overlay.OVERLAY_AMPHITHEATER;
import OVERLAY_COLOSSEUM = overlay.OVERLAY_COLOSSEUM;
import OVERLAY_HIPPODROME = overlay.OVERLAY_HIPPODROME;
import OVERLAY_EDUCATION = overlay.OVERLAY_EDUCATION;
import OVERLAY_SCHOOL = overlay.OVERLAY_SCHOOL;
import OVERLAY_LIBRARY = overlay.OVERLAY_LIBRARY;
import OVERLAY_ACADEMY = overlay.OVERLAY_ACADEMY;
import OVERLAY_BARBER = overlay.OVERLAY_BARBER;
import OVERLAY_BATHHOUSE = overlay.OVERLAY_BATHHOUSE;
import OVERLAY_CLINIC = overlay.OVERLAY_CLINIC;
import OVERLAY_HOSPITAL = overlay.OVERLAY_HOSPITAL;
import OVERLAY_TAX_INCOME = overlay.OVERLAY_TAX_INCOME;
import OVERLAY_FOOD_STOCKS = overlay.OVERLAY_FOOD_STOCKS;
import OVERLAY_DESIRABILITY = overlay.OVERLAY_DESIRABILITY;
import OVERLAY_NATIVE = overlay.OVERLAY_NATIVE;
import OVERLAY_PROBLEMS = overlay.OVERLAY_PROBLEMS;
import { game_state_set_overlay } from 'game/state';
import { button_none } from 'graphics/button';
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
import { group_terrain } from 'core/image_group';
import GROUP_BULLET = group_terrain.GROUP_BULLET;
import { color_t } from 'graphics/color';
import { image } from 'core/image';
import { image_group } from 'core/image';
import { font_t } from 'graphics/font';
import FONT_NORMAL_GREEN = font_t.FONT_NORMAL_GREEN;
import { font_t } from 'graphics/font';
import { font_definition } from 'graphics/font';
import { image_draw } from 'graphics/image';
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
import WINDOW_OVERLAY_MENU = window_id.WINDOW_OVERLAY_MENU;
import { window_id } from 'graphics/window';
import { window_type } from 'graphics/window';
import { window_show } from 'graphics/window';
import { input_go_back_requested } from 'input/input';
import { window_city_draw_panels } from 'window/city';
import { window_city_draw } from 'window/city';
import { window_city_show } from 'window/city';
let menu_buttons: generic_button[] = new Array().fill({
    { 0, 0, 160, 24, button_menu_item, button_none, 0, 0},
    { 0, 24, 160, 24, button_menu_item, button_none, 1, 0},
    { 0, 48, 160, 24, button_menu_item, button_none, 2, 0},
    { 0, 72, 160, 24, button_menu_item, button_none, 3, 0},
    { 0, 96, 160, 24, button_menu_item, button_none, 4, 0},
    { 0, 120, 160, 24, button_menu_item, button_none, 5, 0},
    { 0, 144, 160, 24, button_menu_item, button_none, 6, 0},
    { 0, 168, 160, 24, button_menu_item, button_none, 7, 0},
    { 0, 192, 160, 24, button_menu_item, button_none, 8, 0},
    { 0, 216, 160, 24, button_menu_item, button_none, 9, 0},
});
let submenu_buttons: generic_button[] = new Array().fill({
    { 0, 0, 160, 24, button_submenu_item, button_none, 0, 0},
    { 0, 24, 160, 24, button_submenu_item, button_none, 1, 0},
    { 0, 48, 160, 24, button_submenu_item, button_none, 2, 0},
    { 0, 72, 160, 24, button_submenu_item, button_none, 3, 0},
    { 0, 96, 160, 24, button_submenu_item, button_none, 4, 0},
    { 0, 120, 160, 24, button_submenu_item, button_none, 5, 0},
    { 0, 144, 160, 24, button_submenu_item, button_none, 6, 0},
    { 0, 168, 160, 24, button_submenu_item, button_none, 7, 0},
    { 0, 192, 160, 24, button_submenu_item, button_none, 8, 0},
    { 0, 216, 160, 24, button_submenu_item, button_none, 9, 0},
});
let MENU_ID_TO_OVERLAY: number[] = new Array(MAX_BUTTONS).fill({ OVERLAY_NONE, OVERLAY_WATER, 1, 3, 5, 6, 7, OVERLAY_RELIGION });
let MENU_ID_TO_SUBMENU_ID: number[] = new Array(MAX_BUTTONS).fill({ 0, 0, 1, 2, 3, 4, 5, 0});
let SUBMENU_ID_TO_OVERLAY: number[] = new Array(6).fill({
    { 0},
    { OVERLAY_FIRE, OVERLAY_DAMAGE, OVERLAY_CRIME, OVERLAY_NATIVE, OVERLAY_PROBLEMS, 0},
    { OVERLAY_ENTERTAINMENT, OVERLAY_THEATER, OVERLAY_AMPHITHEATER, OVERLAY_COLOSSEUM, OVERLAY_HIPPODROME, 0},
    { OVERLAY_EDUCATION, OVERLAY_SCHOOL, OVERLAY_LIBRARY, OVERLAY_ACADEMY, 0},
    { OVERLAY_BARBER, OVERLAY_BATHHOUSE, OVERLAY_CLINIC, OVERLAY_HOSPITAL, 0},
    { OVERLAY_TAX_INCOME, OVERLAY_FOOD_STOCKS, OVERLAY_DESIRABILITY, 0},
});
export class unnamed62_8 {
    public selected_menu: number = 0;
    public selected_submenu: number = 0;
    public num_submenu_items: number = 0;
    public submenu_focus_time: time_millis = null;
    public menu_focus_button_id: number = 0;
    public submenu_focus_button_id: number = 0;
    public keep_submenu_open: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.selected_menu = args[0]);
        args.length >= 2 && (this.selected_submenu = args[1]);
        args.length >= 3 && (this.num_submenu_items = args[2]);
        args.length >= 4 && (this.submenu_focus_time = args[3]);
        args.length >= 5 && (this.menu_focus_button_id = args[4]);
        args.length >= 6 && (this.submenu_focus_button_id = args[5]);
        args.length >= 7 && (this.keep_submenu_open = args[6]);
    }
}
let data: unnamed62_8 = new unnamed62_8();
function init() {
    data.selected_submenu = 0;
    data.num_submenu_items = 0;
}
function draw_background() {
    window_city_draw_panels();
}
function get_sidebar_x_offset() {
    let view_x: number
    let view_y: number
    let view_width: number
    let view_height: number;
    city_view_get_viewport(view_x, view_y, view_width, view_height);
    return view_x + view_width;
}
function draw_foreground() {
    window_city_draw();
    let x_offset: number = get_sidebar_x_offset();
    for (let i: number = 0; i < 8; i++) {
        label_draw(x_offset - 170, 74 + 24 * i, 10, data.menu_focus_button_id == i + 1 ? 1 : 2);
        lang_text_draw_centered(14, MENU_ID_TO_OVERLAY[i], x_offset - 170, 78 + 24 * i, 160, FONT_NORMAL_GREEN);
    }
    if (data.selected_submenu > 0) {
        image_draw(image_group(GROUP_BULLET), x_offset - 185, 80 + 24 * data.selected_menu);
        for (let i: number = 0; i < data.num_submenu_items; i++) {
            label_draw(x_offset - 348, 74 + 24 * (i + data.selected_menu),
                10, data.submenu_focus_button_id == i + 1 ? 1 : 2);
            lang_text_draw_centered(14, SUBMENU_ID_TO_OVERLAY[data.selected_submenu][i],
                x_offset - 348, 78 + 24 * (i + data.selected_menu), 160, FONT_NORMAL_GREEN);
        }
    }
}
function count_submenu_items(submenu_id: number) {
    let total: number = 0;
    for (let i: number = 0; i < 8 && SUBMENU_ID_TO_OVERLAY[submenu_id][i] > 0; i++) {
        total++;
    }
    return total;
}
function open_submenu(index: number, keep_open: number) {
    data.keep_submenu_open = keep_open;
    data.selected_menu = index;
    data.selected_submenu = MENU_ID_TO_SUBMENU_ID[index];
    data.num_submenu_items = count_submenu_items(data.selected_submenu);
}
function close_submenu() {
    data.keep_submenu_open = 0;
    data.selected_menu = 0;
    data.selected_submenu = 0;
    data.num_submenu_items = 0;
}
function handle_submenu_focus() {
    if (data.menu_focus_button_id || data.submenu_focus_button_id) {
        data.submenu_focus_time = time_get_millis();
        if (data.menu_focus_button_id) {
            open_submenu(data.menu_focus_button_id - 1, 0);
        }
    } else if (time_get_millis() - data.submenu_focus_time > 500) {
        close_submenu();
    }
}
function click_outside_menu(m: mouse, x_offset: number) {
    return m.left.went_up &&
        (m.x < x_offset - MENU_CLICK_MARGIN - (data.selected_submenu ? SUBMENU_X_OFFSET : MENU_X_OFFSET) ||
            m.x > x_offset + MENU_CLICK_MARGIN ||
            m.y < MENU_Y_OFFSET - MENU_CLICK_MARGIN ||
            m.y > MENU_Y_OFFSET + MENU_CLICK_MARGIN + MENU_ITEM_HEIGHT * MAX_BUTTONS);
}
function handle_input(m: mouse, h: hotkeys) {
    let x_offset: number = get_sidebar_x_offset();
    let handled: number = 0;
    handled |= generic_buttons_handle_mouse(m, x_offset - MENU_X_OFFSET, MENU_Y_OFFSET,
        menu_buttons, MAX_BUTTONS, data.menu_focus_button_id)
    if (!data.keep_submenu_open) {
        handle_submenu_focus();
    }
    if (data.selected_submenu) {
        handled |= generic_buttons_handle_mouse(
            m, x_offset - SUBMENU_X_OFFSET, MENU_Y_OFFSET + MENU_ITEM_HEIGHT * data.selected_menu,
            submenu_buttons, data.num_submenu_items, data.submenu_focus_button_id)
    }
    if (!handled && input_go_back_requested(m, h)) {
        if (data.keep_submenu_open) {
            close_submenu();
        } else {
            window_city_show();
        }
        return;
    }
    if (!handled && click_outside_menu(m, x_offset)) {
        close_submenu();
        window_city_show();
    }
}
function button_menu_item(index: number, param2: number) {
    if (MENU_ID_TO_SUBMENU_ID[index] == 0) {
        game_state_set_overlay(MENU_ID_TO_OVERLAY[index]);
        close_submenu();
        window_city_show();
    } else {
        if (data.keep_submenu_open && data.selected_submenu == MENU_ID_TO_SUBMENU_ID[index]) {
            close_submenu();
        } else {
            open_submenu(index, 1);
        }
    }
}
function button_submenu_item(index: number, param2: number) {
    let overlay: number = SUBMENU_ID_TO_OVERLAY[data.selected_submenu][index];
    if (overlay) {
        game_state_set_overlay(overlay);
    }
    close_submenu();
    window_city_show();
}
export function window_overlay_menu_show() {
    let window: window_type = {
        WINDOW_OVERLAY_MENU,
        draw_background,
        draw_foreground,
        handle_input
    };
    init();
    window_show(window);
}
