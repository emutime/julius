import { COLOR_WHITE } from 'graphics/color';
import { COLOR_FONT_RED } from 'graphics/color';
import { COLOR_FONT_YELLOW } from 'graphics/color';
import { time_millis } from 'core/time';
import { touch_coords } from 'input/touch';
import { touch_mode } from 'input/touch';
import { touch } from 'input/touch';
import { mouse_button } from 'input/mouse';
import { scroll_state } from 'input/mouse';
import { mouse } from 'input/mouse';
import { tooltip_type } from 'graphics/tooltip';
import { tooltip_extra_text_type } from 'graphics/tooltip';
import { tooltip_context } from 'graphics/tooltip';;
import { key_type } from 'input/keys';
import { key_modifier_type } from 'input/keys';
import { hotkey_action } from 'core/hotkey_config';
import { hotkey_mapping } from 'core/hotkey_config';
import { hotkeys } from 'input/hotkey';
import { building_type } from 'building/type';
import { building_construction_clear_type } from 'building/construction';
import { city_finance_treasury } from 'city/finance';
import { finance_overview } from 'city/finance';
import { city_population } from 'city/population';
import { game_file_start_scenario_by_name } from 'game/file';
import { set_tooltips } from 'game/settings';
import TOOLTIPS_NONE = set_tooltips.TOOLTIPS_NONE;
import TOOLTIPS_SOME = set_tooltips.TOOLTIPS_SOME;
import TOOLTIPS_FULL = set_tooltips.TOOLTIPS_FULL;
import { set_tooltips } from 'game/settings';
import { set_difficulty } from 'game/settings';
import { set_sound_type } from 'game/settings';
import { set_sound } from 'game/settings';
import { setting_tooltips } from 'game/settings';
import { setting_cycle_tooltips } from 'game/settings';
import { setting_warnings } from 'game/settings';
import { setting_toggle_warnings } from 'game/settings';
import { setting_monthly_autosave } from 'game/settings';
import { setting_toggle_monthly_autosave } from 'game/settings';
import { game_state_reset_overlay } from 'game/state';
import { color_t } from 'graphics/color';
import { system_is_fullscreen_only } from 'game/system';
import { system_exit } from 'game/system';
import { buffer } from 'core/buffer';
import { game_time_year } from 'game/time';
import { game_time_month } from 'game/time';
import { building } from 'building/building';
import { game_undo_disable } from 'game/undo';
import { language_type } from 'core/locale';
import { encoding_type } from 'core/encoding';
import { group_terrain } from 'core/image_group';
import GROUP_TOP_MENU = group_terrain.GROUP_TOP_MENU;
import { image } from 'core/image';
import { image_group } from 'core/image';
import { font_t } from 'graphics/font';
import FONT_NORMAL_PLAIN = font_t.FONT_NORMAL_PLAIN;
import FONT_NORMAL_GREEN = font_t.FONT_NORMAL_GREEN;
import { font_t } from 'graphics/font';
import { font_definition } from 'graphics/font';
import { image_draw } from 'graphics/image';
import { lang_text_draw } from 'graphics/lang_text';
import { lang_text_draw_colored } from 'graphics/lang_text';
import { lang_text_draw_month_year_max_width } from 'graphics/lang_text';
import { menu_item } from 'graphics/menu';
import { menu_bar_item } from 'graphics/menu';
import { menu_bar_draw } from 'graphics/menu';
import { menu_bar_handle_mouse } from 'graphics/menu';
import { menu_draw } from 'graphics/menu';
import { menu_handle_mouse } from 'graphics/menu';
import { menu_update_text } from 'graphics/menu';
import { screen_width } from 'graphics/screen';
import { text_draw_number } from 'graphics/text';
import { text_draw_number_colored } from 'graphics/text';
import { window_id } from 'graphics/window';
import WINDOW_TOP_MENU = window_id.WINDOW_TOP_MENU;
import { window_id } from 'graphics/window';
import { window_type } from 'graphics/window';
import { window_request_refresh } from 'graphics/window';
import { window_show } from 'graphics/window';
import { window_go_back } from 'graphics/window';
import { scenario_climate } from 'scenario/property';
import { scenario_is_custom } from 'scenario/property';
import { scenario_name } from 'scenario/property';
import { scenario_save_campaign_player_name } from 'scenario/property';
import { pixel_coordinate } from 'widget/city';
import { widget_city_has_input } from 'widget/city';
import { advisor_type } from 'city/constants';
import { window_advisors_show_advisor } from 'window/advisors';
import { window_city_draw_all } from 'window/city';
import { window_city_draw_panels } from 'window/city';
import { window_city_draw } from 'window/city';
import { window_city_show } from 'window/city';
import { window_city_return } from 'window/city';
import { window_difficulty_options_show } from 'window/difficulty_options';
import { window_display_options_show } from 'window/display_options';
import { file_dialog_type } from 'window/file_dialog';
import FILE_DIALOG_SAVE = file_dialog_type.FILE_DIALOG_SAVE;
import FILE_DIALOG_LOAD = file_dialog_type.FILE_DIALOG_LOAD;
import FILE_DIALOG_DELETE = file_dialog_type.FILE_DIALOG_DELETE;
import { file_dialog_type } from 'window/file_dialog';
import { file_type } from 'window/file_dialog';
import FILE_TYPE_SAVED_GAME = file_type.FILE_TYPE_SAVED_GAME;
import { file_type } from 'window/file_dialog';
import { window_file_dialog_show } from 'window/file_dialog';
import { window_main_menu_show } from 'window/main_menu';
import { message_dialog } from 'window/message_dialog';
import MESSAGE_DIALOG_ABOUT = message_dialog.MESSAGE_DIALOG_ABOUT;
import MESSAGE_DIALOG_HELP = message_dialog.MESSAGE_DIALOG_HELP;
import MESSAGE_DIALOG_TOP_FUNDS = message_dialog.MESSAGE_DIALOG_TOP_FUNDS;
import MESSAGE_DIALOG_TOP_POPULATION = message_dialog.MESSAGE_DIALOG_TOP_POPULATION;
import MESSAGE_DIALOG_TOP_DATE = message_dialog.MESSAGE_DIALOG_TOP_DATE;
import { window_message_dialog_show } from 'window/message_dialog';
import { window_mission_briefing_show } from 'window/mission_briefing';
import { popup_dialog_type } from 'window/popup_dialog';
import POPUP_DIALOG_QUIT = popup_dialog_type.POPUP_DIALOG_QUIT;
import { popup_dialog_type } from 'window/popup_dialog';
import { window_popup_dialog_show } from 'window/popup_dialog';
import { window_popup_dialog_show_confirmation } from 'window/popup_dialog';
import { window_sound_options_show } from 'window/sound_options';
import { window_speed_options_show } from 'window/speed_options';
export const enum info {
    INFO_NONE = 0,
    INFO_FUNDS = 1,
    INFO_POPULATION = 2,
    INFO_DATE = 3,
}
let menu_file: menu_item[] = new Array().fill({
    { 1, 1, menu_file_new_game, 0},
    { 1, 2, menu_file_replay_map, 0},
    { 1, 3, menu_file_load_game, 0},
    { 1, 4, menu_file_save_game, 0},
    { 1, 6, menu_file_delete_game, 0},
    { 1, 5, menu_file_exit_game, 0},
});
let menu_options: menu_item[] = new Array().fill({
    { 2, 1, menu_options_display, 0},
    { 2, 2, menu_options_sound, 0},
    { 2, 3, menu_options_speed, 0},
    { 2, 6, menu_options_difficulty, 0},
    { 19, 51, menu_options_autosave, 0},
});
let menu_help: menu_item[] = new Array().fill({
    { 3, 1, menu_help_help, 0},
    { 3, 2, menu_help_mouse_help, 0},
    { 3, 5, menu_help_warnings, 0},
    { 3, 7, menu_help_about, 0},
});
let menu_advisors: menu_item[] = new Array().fill({
    { 4, 1, menu_advisors_go_to, 1},
    { 4, 2, menu_advisors_go_to, 2},
    { 4, 3, menu_advisors_go_to, 3},
    { 4, 4, menu_advisors_go_to, 4},
    { 4, 5, menu_advisors_go_to, 5},
    { 4, 6, menu_advisors_go_to, 6},
    { 4, 7, menu_advisors_go_to, 7},
    { 4, 8, menu_advisors_go_to, 8},
    { 4, 9, menu_advisors_go_to, 9},
    { 4, 10, menu_advisors_go_to, 10},
    { 4, 11, menu_advisors_go_to, 11},
    { 4, 12, menu_advisors_go_to, 12},
});
let menu: menu_bar_item[] = new Array().fill({
    { 1, menu_file, 6},
    { 2, menu_options, 5},
    { 3, menu_help, 4},
    { 4, menu_advisors, 12},
});
let INDEX_OPTIONS: number = 1;
let INDEX_HELP: number = 2;
export class unnamed108_8 {
    public offset_funds: number = 0;
    public offset_population: number = 0;
    public offset_date: number = 0;
    public open_sub_menu: number = 0;
    public focus_menu_id: number = 0;
    public focus_sub_menu_id: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.offset_funds = args[0]);
        args.length >= 2 && (this.offset_population = args[1]);
        args.length >= 3 && (this.offset_date = args[2]);
        args.length >= 4 && (this.open_sub_menu = args[3]);
        args.length >= 5 && (this.focus_menu_id = args[4]);
        args.length >= 6 && (this.focus_sub_menu_id = args[5]);
    }
}
let data: unnamed108_8 = new unnamed108_8();
export class unnamed118_8 {
    public population: number = 0;
    public treasury: number = 0;
    public month: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.population = args[0]);
        args.length >= 2 && (this.treasury = args[1]);
        args.length >= 3 && (this.month = args[2]);
    }
}
let drawn: unnamed118_8 = new unnamed118_8();
function clear_state() {
    data.open_sub_menu = 0;
    data.focus_menu_id = 0;
    data.focus_sub_menu_id = 0;
}
function set_text_for_autosave() {
    menu_update_text(menu[INDEX_OPTIONS], 4, setting_monthly_autosave() ? 51 : 52);
}
function set_text_for_tooltips() {
    let new_text: number;
    switch (setting_tooltips()) {
        case TOOLTIPS_NONE:
            new_text = 2;
            break
        case TOOLTIPS_SOME:
            new_text = 3;
            break
        case TOOLTIPS_FULL:
            new_text = 4;
            break
        default:
            return
    }
    menu_update_text(menu[INDEX_HELP], 1, new_text);
}
function set_text_for_warnings() {
    menu_update_text(menu[INDEX_HELP], 2, setting_warnings() ? 6 : 5);
}
function init() {
    menu[INDEX_OPTIONS].items[0].hidden = system_is_fullscreen_only();
    set_text_for_autosave();
    set_text_for_tooltips();
    set_text_for_warnings();
}
function draw_background() {
    window_city_draw_panels();
    window_city_draw();
}
function draw_foreground() {
    if (data.open_sub_menu) {
        menu_draw(menu[data.open_sub_menu - 1], data.focus_sub_menu_id);
    }
}
function handle_input(m: mouse, h: hotkeys) {
    widget_top_menu_handle_input(m, h);
}
function top_menu_window_show() {
    let window: window_type = {
        WINDOW_TOP_MENU,
        draw_background,
        draw_foreground,
        handle_input
    };
    init();
    window_show(window);
}
function refresh_background() {
    let block_width: number = 24;
    let image_base: number = image_group(GROUP_TOP_MENU);
    let s_width: number = screen_width();
    for (let i: number = 0; i * block_width < s_width; i++) {
        image_draw(image_base + i % 8, i * block_width, 0);
    }
    if (s_width < 800) {
        image_draw(image_base + 14, 336, 0);
    } else if (s_width < 1024) {
        image_draw(image_base + 14, 336, 0);
        image_draw(image_base + 14, 456, 0);
        image_draw(image_base + 14, 648, 0);
    } else {
        image_draw(image_base + 14, 480, 0);
        image_draw(image_base + 14, 624, 0);
        image_draw(image_base + 14, 840, 0);
    }
}
export function widget_top_menu_draw(force: number) {
    if (!force && drawn.treasury == city_finance_treasury() &&
        drawn.population == city_population() &&
        drawn.month == game_time_month()) {
        return;
    }
    let s_width: number = screen_width();
    refresh_background();
    menu_bar_draw(menu, 4, s_width < 1024 ? 338 : 493);
    let treasure_color: color_t = COLOR_WHITE;
    let treasury: number = city_finance_treasury();
    if (treasury < 0) {
        treasure_color = COLOR_FONT_RED;
    }
    if (s_width < 800) {
        data.offset_funds = 338;
        data.offset_population = 453;
        data.offset_date = 547;
        let width: number = lang_text_draw_colored(6, 0, 350, 5, FONT_NORMAL_PLAIN, treasure_color);
        text_draw_number_colored(treasury, '@', " ", 346 + width, 5, FONT_NORMAL_PLAIN, treasure_color);
        width = lang_text_draw(6, 1, 458, 5, FONT_NORMAL_GREEN);
        text_draw_number(city_population(), '@', " ", 450 + width, 5, FONT_NORMAL_GREEN);
        lang_text_draw_month_year_max_width(game_time_month(), game_time_year(), 540, 5, 100, FONT_NORMAL_GREEN, 0);
    } else if (s_width < 1024) {
        data.offset_funds = 338;
        data.offset_population = 458;
        data.offset_date = 652;
        let width: number = lang_text_draw_colored(6, 0, 350, 5, FONT_NORMAL_PLAIN, treasure_color);
        text_draw_number_colored(treasury, '@', " ", 346 + width, 5, FONT_NORMAL_PLAIN, treasure_color);
        width = lang_text_draw_colored(6, 1, 470, 5, FONT_NORMAL_PLAIN, COLOR_WHITE);
        text_draw_number_colored(city_population(), '@', " ", 466 + width, 5, FONT_NORMAL_PLAIN, COLOR_WHITE);
        lang_text_draw_month_year_max_width(game_time_month(), game_time_year(),
            655, 5, 110, FONT_NORMAL_PLAIN, COLOR_FONT_YELLOW);
    } else {
        data.offset_funds = 493;
        data.offset_population = 637;
        data.offset_date = 852;
        let width: number = lang_text_draw_colored(6, 0, 495, 5, FONT_NORMAL_PLAIN, treasure_color);
        text_draw_number_colored(treasury, '@', " ", 501 + width, 5, FONT_NORMAL_PLAIN, treasure_color);
        width = lang_text_draw_colored(6, 1, 645, 5, FONT_NORMAL_PLAIN, COLOR_WHITE);
        text_draw_number_colored(city_population(), '@', " ", 651 + width, 5, FONT_NORMAL_PLAIN, COLOR_WHITE);
        lang_text_draw_month_year_max_width(game_time_month(), game_time_year(),
            850, 5, 110, FONT_NORMAL_PLAIN, COLOR_FONT_YELLOW);
    }
    drawn.treasury = treasury;
    drawn.population = city_population();
    drawn.month = game_time_month();
}
function handle_input_submenu(m: mouse, h: hotkeys) {
    if (m.right.went_up || h.escape_pressed) {
        clear_state();
        window_go_back();
        return 1;
    }
    let menu_id: number = menu_bar_handle_mouse(m, menu, 4, data.focus_menu_id);
    if (menu_id && menu_id != data.open_sub_menu) {
        window_request_refresh();
        data.open_sub_menu = menu_id;
    }
    if (!menu_handle_mouse(m, menu[data.open_sub_menu - 1], data.focus_sub_menu_id)) {
        if (m.left.went_up) {
            clear_state();
            window_go_back();
            return 1;
        }
    }
    return 0;
}
function get_info_id(mouse_x: number, mouse_y: number) {
    if (mouse_y < 4 || mouse_y >= 18) {
        return INFO_NONE;
    }
    if (mouse_x > data.offset_funds && mouse_x < data.offset_funds + 128) {
        return INFO_FUNDS;
    }
    if (mouse_x > data.offset_population && mouse_x < data.offset_population + 128) {
        return INFO_POPULATION;
    }
    if (mouse_x > data.offset_date && mouse_x < data.offset_date + 128) {
        return INFO_DATE;
    }
    return INFO_NONE;
}
function handle_right_click(type: number) {
    if (type == INFO_NONE) {
        return 0;
    }
    if (type == INFO_FUNDS) {
        window_message_dialog_show(MESSAGE_DIALOG_TOP_FUNDS, window_city_draw_all);
    } else if (type == INFO_POPULATION) {
        window_message_dialog_show(MESSAGE_DIALOG_TOP_POPULATION, window_city_draw_all);
    } else if (type == INFO_DATE) {
        window_message_dialog_show(MESSAGE_DIALOG_TOP_DATE, window_city_draw_all);
    }
    return 1;
}
function handle_mouse_menu(m: mouse) {
    let menu_id: number = menu_bar_handle_mouse(m, menu, 4, data.focus_menu_id);
    if (menu_id && m.left.went_up) {
        data.open_sub_menu = menu_id;
        top_menu_window_show();
        return 1;
    }
    if (m.right.went_up) {
        return handle_right_click(get_info_id(m.x, m.y));
    }
    return 0;
}
export function widget_top_menu_handle_input(m: mouse, h: hotkeys) {
    if (widget_city_has_input()) {
        return 0;
    }
    if (data.open_sub_menu) {
        return handle_input_submenu(m, h);
    } else {
        return handle_mouse_menu(m);
    }
}
export function widget_top_menu_get_tooltip_text(c: tooltip_context) {
    if (data.focus_menu_id) {
        return 49 + data.focus_menu_id;
    }
    let button_id: number = get_info_id(c.mouse_x, c.mouse_y);
    if (button_id) {
        return 59 + button_id;
    }
    return 0;
}
function menu_file_new_game(param: number) {
    clear_state();
    building_construction_clear_type();
    game_undo_disable();
    game_state_reset_overlay();
    window_main_menu_show(1);
}
function replay_map_confirmed(confirmed: number) {
    if (!confirmed) {
        window_city_show();
        return;
    }
    if (scenario_is_custom()) {
        game_file_start_scenario_by_name(scenario_name());
        window_city_show();
    } else {
        scenario_save_campaign_player_name();
        window_mission_briefing_show();
    }
}
function menu_file_replay_map(param: number) {
    clear_state();
    building_construction_clear_type();
    window_popup_dialog_show_confirmation(1, 2, replay_map_confirmed);
}
function menu_file_load_game(param: number) {
    clear_state();
    building_construction_clear_type();
    window_go_back();
    window_file_dialog_show(FILE_TYPE_SAVED_GAME, FILE_DIALOG_LOAD);
}
function menu_file_save_game(param: number) {
    clear_state();
    window_go_back();
    window_file_dialog_show(FILE_TYPE_SAVED_GAME, FILE_DIALOG_SAVE);
}
function menu_file_delete_game(param: number) {
    clear_state();
    window_go_back();
    window_file_dialog_show(FILE_TYPE_SAVED_GAME, FILE_DIALOG_DELETE);
}
function menu_file_confirm_exit(accepted: number) {
    if (accepted) {
        system_exit();
    } else {
        window_city_return();
    }
}
function menu_file_exit_game(param: number) {
    clear_state();
    window_popup_dialog_show(POPUP_DIALOG_QUIT, menu_file_confirm_exit, 1);
}
function menu_options_display(param: number) {
    clear_state();
    window_display_options_show(window_city_return);
}
function menu_options_sound(param: number) {
    clear_state();
    window_sound_options_show(window_city_return);
}
function menu_options_speed(param: number) {
    clear_state();
    window_speed_options_show(window_city_return);
}
function menu_options_difficulty(param: number) {
    clear_state();
    window_difficulty_options_show(window_city_return);
}
function menu_options_autosave(param: number) {
    setting_toggle_monthly_autosave();
    set_text_for_autosave();
}
function menu_help_help(param: number) {
    clear_state();
    window_go_back();
    window_message_dialog_show(MESSAGE_DIALOG_HELP, window_city_draw_all);
}
function menu_help_mouse_help(param: number) {
    setting_cycle_tooltips();
    set_text_for_tooltips();
}
function menu_help_warnings(param: number) {
    setting_toggle_warnings();
    set_text_for_warnings();
}
function menu_help_about(param: number) {
    clear_state();
    window_go_back();
    window_message_dialog_show(MESSAGE_DIALOG_ABOUT, window_city_draw_all);
}
function menu_advisors_go_to(advisor: number) {
    clear_state();
    window_go_back();
    window_advisors_show_advisor(advisor);
}
