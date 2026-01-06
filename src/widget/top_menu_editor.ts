export const INDEX_OPTIONS = 1;
;
import { image_group } from 'core/image';
import { group_terrain } from 'core/image_group';
import { game_file_editor_create_scenario } from 'game/file_editor';
import { game_exit_editor } from 'game/game';
import { system_is_fullscreen_only } from 'game/system';
import { image_draw } from 'graphics/image';
import { menu_bar_draw, menu_bar_handle_mouse, menu_bar_item, menu_draw, menu_handle_mouse, menu_item } from 'graphics/menu';
import { screen_width } from 'graphics/screen';
import { window_go_back, window_id, window_request_refresh, window_show, window_type } from 'graphics/window';
import { hotkeys } from 'input/hotkey';
import { mouse } from 'input/mouse';
import { scenario_editor_clear_fishing_points, scenario_editor_clear_herd_points, scenario_editor_clear_invasion_points } from 'scenario/editor_map';
import { scenario_is_saved } from 'scenario/scenario';
import { window_display_options_show } from 'window/display_options';
import { window_editor_empire_show } from 'window/editor/empire';
import { window_editor_map_draw_all, window_editor_map_show } from 'window/editor/map';
import { file_dialog_type, file_type, window_file_dialog_show } from 'window/file_dialog';
import { message_dialog, window_message_dialog_show } from 'window/message_dialog';
import { popup_dialog_type, window_popup_dialog_show } from 'window/popup_dialog';
import { window_select_list_show } from 'window/select_list';
import { window_sound_options_show } from 'window/sound_options';
import { window_speed_options_show } from 'window/speed_options';
import GROUP_TOP_MENU = group_terrain.GROUP_TOP_MENU;
import WINDOW_EDITOR_TOP_MENU = window_id.WINDOW_EDITOR_TOP_MENU;
import FILE_DIALOG_SAVE = file_dialog_type.FILE_DIALOG_SAVE;
import FILE_DIALOG_LOAD = file_dialog_type.FILE_DIALOG_LOAD;
import FILE_TYPE_SCENARIO = file_type.FILE_TYPE_SCENARIO;
import MESSAGE_DIALOG_EDITOR_ABOUT = message_dialog.MESSAGE_DIALOG_EDITOR_ABOUT;
import MESSAGE_DIALOG_EDITOR_HELP = message_dialog.MESSAGE_DIALOG_EDITOR_HELP;
import POPUP_DIALOG_EDITOR_QUIT_WITHOUT_SAVING = popup_dialog_type.POPUP_DIALOG_EDITOR_QUIT_WITHOUT_SAVING;
let menu_file: menu_item[] = [
    new menu_item(7, 1, menu_file_new_map, 0),
    new menu_item(7, 2, menu_file_load_map, 0),
    new menu_item(7, 3, menu_file_save_map, 0),
    new menu_item(7, 4, menu_file_exit_editor, 0),
];
let menu_options: menu_item[] = [
    new menu_item(2, 1, menu_options_display, 0),
    new menu_item(2, 2, menu_options_sound, 0),
    new menu_item(2, 3, menu_options_speed, 0),
];
let menu_help: menu_item[] = [
    new menu_item(3, 1, menu_help_help, 0),
    new menu_item(3, 7, menu_help_about, 0),
];
let menu_resets: menu_item[] = [
    new menu_item(10, 1, menu_resets_herds, 0),
    new menu_item(10, 2, menu_resets_fish, 0),
    new menu_item(10, 3, menu_resets_invasions, 0),
];
let menu_empire: menu_item[] = [
    new menu_item(149, 1, menu_empire_choose, 0),
];
let menu: menu_bar_item[] = [
    new menu_bar_item(7, menu_file, 4),
    new menu_bar_item(2, menu_options, 3),
    new menu_bar_item(3, menu_help, 2),
    new menu_bar_item(10, menu_resets, 3),
    new menu_bar_item(149, menu_empire, 1),
];
export class unnamed78_8 {
    public open_sub_menu: number = 0;
    public focus_menu_id: number = 0;
    public focus_sub_menu_id: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.open_sub_menu = args[0]);
        args.length >= 2 && (this.focus_menu_id = args[1]);
        args.length >= 3 && (this.focus_sub_menu_id = args[2]);
    }
}
let data: unnamed78_8 = new unnamed78_8();
function clear_state() {
    data.open_sub_menu = 0;
    data.focus_menu_id = 0;
    data.focus_sub_menu_id = 0;
}
function init() {
    menu[INDEX_OPTIONS].items[0].hidden = system_is_fullscreen_only();
}
function draw_foreground() {
    if (!data.open_sub_menu) {
        return;
    }
    menu_draw(menu[data.open_sub_menu - 1], data.focus_sub_menu_id);
}
function handle_input(m: mouse, h: hotkeys) {
    widget_top_menu_editor_handle_input(m, h);
}
function top_menu_window_show() {
    let window: window_type = new window_type(
        WINDOW_EDITOR_TOP_MENU,
        window_editor_map_draw_all,
        draw_foreground,
        handle_input
    );
    init();
    window_show(window);
}
export function widget_top_menu_editor_draw() {
    let block_width: number = 24;
    let image_base: number = image_group(GROUP_TOP_MENU);
    let s_width: number = screen_width();
    for (let i: number = 0; i * block_width < s_width; i++) {
        image_draw(image_base + i % 8, i * block_width, 0);
    }
    menu_bar_draw(menu, 5, s_width);
}
function handle_input_submenu(m: mouse, h: hotkeys) {
    if (m.right.went_up || h.escape_pressed) {
        clear_state();
        window_go_back();
        return 1;
    }
    let menu_id: number = menu_bar_handle_mouse(m, menu, 5, data.focus_menu_id);
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
function handle_mouse_menu(m: mouse) {
    let menu_id: number = menu_bar_handle_mouse(m, menu, 5, data.focus_menu_id);
    if (menu_id && m.left.went_up) {
        data.open_sub_menu = menu_id;
        top_menu_window_show();
        return 1;
    }
    return 0;
}
export function widget_top_menu_editor_handle_input(m: mouse, h: hotkeys) {
    if (data.open_sub_menu) {
        return handle_input_submenu(m, h);
    } else {
        return handle_mouse_menu(m);
    }
}
function map_size_selected(size: number) {
    clear_state();
    if (size >= 0 && size <= 5) {
        game_file_editor_create_scenario(size);
        window_editor_map_show();
    } else {
        window_go_back();
    }
}
function menu_file_new_map(param: number) {
    window_select_list_show(50, 50, 33, 7, map_size_selected);
}
function menu_file_load_map(param: number) {
    clear_state();
    window_editor_map_show();
    window_file_dialog_show(FILE_TYPE_SCENARIO, FILE_DIALOG_LOAD);
}
function menu_file_save_map(param: number) {
    clear_state();
    window_editor_map_show();
    window_file_dialog_show(FILE_TYPE_SCENARIO, FILE_DIALOG_SAVE);
}
function menu_file_confirm_exit(accepted: number) {
    if (accepted) {
        game_exit_editor();
    } else {
        window_editor_map_show();
    }
}
function menu_file_exit_editor(param: number) {
    clear_state();
    if (scenario_is_saved()) {
        game_exit_editor();
    } else {
        window_popup_dialog_show(POPUP_DIALOG_EDITOR_QUIT_WITHOUT_SAVING, menu_file_confirm_exit, 1);
    }
}
function menu_options_display(param: number) {
    clear_state();
    window_editor_map_show();
    window_display_options_show(window_editor_map_show);
}
function menu_options_sound(param: number) {
    clear_state();
    window_editor_map_show();
    window_sound_options_show(window_editor_map_show);
}
function menu_options_speed(param: number) {
    clear_state();
    window_editor_map_show();
    window_speed_options_show(window_editor_map_show);
}
function menu_help_help(param: number) {
    clear_state();
    window_go_back();
    window_message_dialog_show(MESSAGE_DIALOG_EDITOR_HELP, window_editor_map_draw_all);
}
function menu_help_about(param: number) {
    clear_state();
    window_go_back();
    window_message_dialog_show(MESSAGE_DIALOG_EDITOR_ABOUT, window_editor_map_draw_all);
}
function menu_resets_herds(param: number) {
    scenario_editor_clear_herd_points();
    clear_state();
    window_go_back();
}
function menu_resets_fish(param: number) {
    scenario_editor_clear_fishing_points();
    clear_state();
    window_go_back();
}
function menu_resets_invasions(param: number) {
    scenario_editor_clear_invasion_points();
    clear_state();
    window_go_back();
}
function menu_empire_choose(param: number) {
    clear_state();
    window_go_back();
    window_editor_empire_show();
}
