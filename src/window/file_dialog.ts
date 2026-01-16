export const NUM_FILES_IN_VIEW = 12;
import { FILE_NAME_MAX } from 'core/file';
export const MAX_FILE_WINDOW_TEXT_WIDTH = 18;
export const enum file_dialog_type {
    FILE_DIALOG_SAVE = 0,
    FILE_DIALOG_LOAD = 1,
    FILE_DIALOG_DELETE = 2,
}
export const enum file_type {
    FILE_TYPE_SAVED_GAME = 0,
    FILE_TYPE_SCENARIO = 1,
}
import FILE_DIALOG_SAVE = file_dialog_type.FILE_DIALOG_SAVE;
import FILE_DIALOG_LOAD = file_dialog_type.FILE_DIALOG_LOAD;
import FILE_DIALOG_DELETE = file_dialog_type.FILE_DIALOG_DELETE;
import FILE_TYPE_SAVED_GAME = file_type.FILE_TYPE_SAVED_GAME;
import FILE_TYPE_SCENARIO = file_type.FILE_TYPE_SCENARIO;
// System library imports removed - these should not be in TypeScript
import { calc_bound } from 'core/calc';
import { dir_find_files_with_extension, dir_listing, localized } from 'core/dir';
import { encoding_from_utf8, encoding_system_uses_decomposed, encoding_to_utf8 } from 'core/encoding';
import NOT_LOCALIZED = localized.NOT_LOCALIZED;
// System library imports removed - these should not be in TypeScript
import { file_append_extension, file_exists, file_remove_extension } from 'core/file';
import { group_terrain } from 'core/image_group';
import { lang_get_string } from 'core/lang';
import { string_copy, string_equals, string_from_bytes, string_length } from 'core/string';
import { time_get_millis, time_millis } from 'core/time';
import { game_file_delete_saved_game, game_file_load_saved_game, game_file_write_saved_game } from 'game/file';
import { game_file_editor_load_scenario, game_file_editor_write_scenario } from 'game/file_editor';
import { button_none } from 'graphics/button';
import { font_t } from 'graphics/font';
import { generic_button, generic_buttons_handle_mouse } from 'graphics/generic_button';
import { graphics_in_dialog, graphics_reset_dialog } from 'graphics/graphics';
import { ib, image_button, image_buttons_draw, image_buttons_handle_mouse } from 'graphics/image_button';
import { lang_text_draw, lang_text_draw_centered } from 'graphics/lang_text';
import { inner_panel_draw, outer_panel_draw } from 'graphics/panel';
import { scrollbar_draw, scrollbar_handle_mouse, scrollbar_init, scrollbar_reset, scrollbar_type } from 'graphics/scrollbar';
import { text_draw, text_ellipsize } from 'graphics/text';
import { window_draw_underlying_window, window_go_back, window_id, window_show, window_type } from 'graphics/window';
import { hotkeys } from 'input/hotkey';
import { input_go_back_requested } from 'input/input';
import { mouse, mouse_in_dialog } from 'input/mouse';
import { platform_file_manager_compare_filename_prefix } from 'platform/file_manager';
import { input_box, input_box_draw, input_box_handle_mouse, input_box_is_accepted, input_box_refresh_text, input_box_start, input_box_stop } from 'widget/input_box';
import { window_city_show } from 'window/city';
import { Ref } from '../../ext/crt';
// TODO: window_editor_map_show needs to be translated from C to TypeScript
declare function window_editor_map_show(): void;
import GROUP_OK_CANCEL_SCROLL_BUTTONS = group_terrain.GROUP_OK_CANCEL_SCROLL_BUTTONS;
import FONT_NORMAL_BLACK = font_t.FONT_NORMAL_BLACK;
import FONT_NORMAL_WHITE = font_t.FONT_NORMAL_WHITE;
import FONT_LARGE_BLACK = font_t.FONT_LARGE_BLACK;
import FONT_NORMAL_GREEN = font_t.FONT_NORMAL_GREEN;
import IB_NORMAL = ib.IB_NORMAL;
import WINDOW_FILE_DIALOG = window_id.WINDOW_FILE_DIALOG;
let NOT_EXIST_MESSAGE_TIMEOUT: time_millis = 500;
let image_buttons: image_button[] = [
    new image_button(344, 335, 39, 26, IB_NORMAL, GROUP_OK_CANCEL_SCROLL_BUTTONS, 0, button_ok_cancel, button_none, 1, 0, 1),
    new image_button(392, 335, 39, 26, IB_NORMAL, GROUP_OK_CANCEL_SCROLL_BUTTONS, 4, button_ok_cancel, button_none, 0, 0, 1),
];
let file_buttons: generic_button[] = [
    new generic_button(160, 128, 288, 16, button_select_file, button_none, 0, 0),
    new generic_button(160, 144, 288, 16, button_select_file, button_none, 1, 0),
    new generic_button(160, 160, 288, 16, button_select_file, button_none, 2, 0),
    new generic_button(160, 176, 288, 16, button_select_file, button_none, 3, 0),
    new generic_button(160, 192, 288, 16, button_select_file, button_none, 4, 0),
    new generic_button(160, 208, 288, 16, button_select_file, button_none, 5, 0),
    new generic_button(160, 224, 288, 16, button_select_file, button_none, 6, 0),
    new generic_button(160, 240, 288, 16, button_select_file, button_none, 7, 0),
    new generic_button(160, 256, 288, 16, button_select_file, button_none, 8, 0),
    new generic_button(160, 272, 288, 16, button_select_file, button_none, 9, 0),
    new generic_button(160, 288, 288, 16, button_select_file, button_none, 10, 0),
    new generic_button(160, 304, 288, 16, button_select_file, button_none, 11, 0),
];
let scrollbar: scrollbar_type = new scrollbar_type(464, 120, 206, 320, NUM_FILES_IN_VIEW, on_scroll, 1);
export class file_type_data {
    public extension: number[] = new Array(4).fill(0);
    public last_loaded_file: number[] = new Array(FILE_NAME_MAX).fill(0);
    public constructor(...args: any[]) {
        args.length >= 1 && (this.extension = args[0]);
        args.length >= 2 && (this.last_loaded_file = args[1]);
    }
}
export class unnamed65_8 {
    public message_not_exist_start_time: time_millis = null;
    public type: file_type = null;
    public dialog_type: file_dialog_type = null;
    public focus_button_id: number = 0;
    public double_click: number = 0;
    public file_list: dir_listing = null;
    public file_data: file_type_data = null;
    public typed_name: number[] = new Array(FILE_NAME_MAX).fill(0);
    public previously_seen_typed_name: number[] = new Array(FILE_NAME_MAX).fill(0);
    public selected_file: number[] = new Array(FILE_NAME_MAX).fill(0);
    public constructor(...args: any[]) {
        args.length >= 1 && (this.message_not_exist_start_time = args[0]);
        args.length >= 2 && (this.type = args[1]);
        args.length >= 3 && (this.dialog_type = args[2]);
        args.length >= 4 && (this.focus_button_id = args[3]);
        args.length >= 5 && (this.double_click = args[4]);
        args.length >= 6 && (this.file_list = args[5]);
        args.length >= 7 && (this.file_data = args[6]);
        args.length >= 8 && (this.typed_name = args[7]);
        args.length >= 9 && (this.previously_seen_typed_name = args[8]);
        args.length >= 10 && (this.selected_file = args[9]);
    }
}
let data: unnamed65_8 = new unnamed65_8();
let file_name_input: input_box = new input_box(144, 80, 20, 2, FONT_NORMAL_WHITE, 0, data.typed_name, FILE_NAME_MAX);
let saved_game_data: file_type_data = new file_type_data();
saved_game_data.extension = [115, 97, 118, 0]; // "sav"
let scenario_data: file_type_data = new file_type_data();
scenario_data.extension = [109, 97, 112, 0]; // "map"
function find_first_file_with_prefix(prefix: number[]) {
    let len: number = string_length(prefix);
    if (len == 0) {
        return -1;
    }
    let left: number = 0;
    let right: number = data.file_list.num_files;
    while (left < right) {
        let middle: number = Math.floor((left + right) / 2);
        if (platform_file_manager_compare_filename_prefix(data.file_list.files[middle], prefix, len) >= 0) {
            right = middle;
        } else {
            left = middle + 1;
        }
    }
    if (left < data.file_list.num_files &&
        platform_file_manager_compare_filename_prefix(data.file_list.files[left], prefix, len) == 0) {
        return left;
    } else {
        return -1;
    }
}
function scroll_to_typed_text() {
    if (data.file_list.num_files <= NUM_FILES_IN_VIEW) {
        return;
    }
    let name_utf8: number[] = new Array(FILE_NAME_MAX).fill(0);
    encoding_to_utf8(data.typed_name, name_utf8, FILE_NAME_MAX, encoding_system_uses_decomposed());
    let index: number = find_first_file_with_prefix(name_utf8);
    if (index >= 0) {
        scrollbar_reset(scrollbar, calc_bound(index, 0, data.file_list.num_files - NUM_FILES_IN_VIEW));
    }
}
function init(type: file_type, dialog_type: file_dialog_type) {
    data.type = type;
    data.file_data = type == FILE_TYPE_SCENARIO ? scenario_data : saved_game_data;
    data.dialog_type = dialog_type;
    data.message_not_exist_start_time = 0;
    data.double_click = 0;
    data.focus_button_id = 0;
    if (string_length(data.file_data.last_loaded_file) > 0) {
        encoding_from_utf8(data.file_data.last_loaded_file, data.typed_name, FILE_NAME_MAX);
        file_remove_extension(data.typed_name);
    } else if (dialog_type == FILE_DIALOG_SAVE) {
        string_copy(lang_get_string(9, type == FILE_TYPE_SCENARIO ? 7 : 6), data.typed_name, FILE_NAME_MAX);
    } else {
        data.typed_name[0] = 0;
    }
    string_copy(data.typed_name, data.previously_seen_typed_name, FILE_NAME_MAX);
    data.file_list = dir_find_files_with_extension(data.file_data.extension);
    scrollbar_init(scrollbar, 0, data.file_list.num_files);
    scroll_to_typed_text();
    string_copy(data.file_data.last_loaded_file, data.selected_file, FILE_NAME_MAX);
    input_box_start(file_name_input);
}
function draw_foreground() {
    graphics_in_dialog();
    let file: number[] = new Array(FILE_NAME_MAX).fill(0);
    outer_panel_draw(128, 40, 24, 21);
    input_box_draw(file_name_input);
    inner_panel_draw(144, 120, 20, 13);
    if (data.message_not_exist_start_time
        && time_get_millis() - data.message_not_exist_start_time < NOT_EXIST_MESSAGE_TIMEOUT) {
        lang_text_draw_centered(43, 2, 160, 50, 304, FONT_LARGE_BLACK);
    } else if (data.dialog_type == FILE_DIALOG_DELETE) {
        lang_text_draw_centered(43, 6, 160, 50, 304, FONT_LARGE_BLACK);
    } else {
        let text_id: number = data.dialog_type + (data.type == FILE_TYPE_SCENARIO ? 3 : 0);
        lang_text_draw_centered(43, text_id, 160, 50, 304, FONT_LARGE_BLACK);
    }
    lang_text_draw(43, 5, 224, 342, FONT_NORMAL_BLACK);
    for (let i: number = 0; i < NUM_FILES_IN_VIEW; i++) {
        let font: font_t = FONT_NORMAL_GREEN;
        if (data.focus_button_id == i + 1) {
            font = FONT_NORMAL_WHITE;
        }
        encoding_from_utf8(data.file_list.files[scrollbar.scroll_position + i], file, FILE_NAME_MAX);
        file_remove_extension(file);
        text_ellipsize(file, font, MAX_FILE_WINDOW_TEXT_WIDTH);
        text_draw(file, 160, 130 + 16 * i, font, 0);
    }
    image_buttons_draw(0, 0, image_buttons, 2);
    scrollbar_draw(scrollbar);
    graphics_reset_dialog();
}
function should_scroll_to_typed_text() {
    if (string_equals(data.previously_seen_typed_name, data.typed_name)) {
        return 0;
    }
    let scroll: number = 0;
    if (string_length(data.typed_name) > string_length(data.previously_seen_typed_name)) {
        scroll = 1;
    }
    string_copy(data.typed_name, data.previously_seen_typed_name, FILE_NAME_MAX);
    return scroll;
}
function handle_input(m: mouse, h: hotkeys) {
    data.double_click = m.left.double_click ? 1 : 0;
    if (input_box_is_accepted(file_name_input)) {
        button_ok_cancel(1, 0);
        return;
    }
    let m_dialog: mouse = mouse_in_dialog(m);
    data.focus_button_id = 0;
    let focus_button_id_ref: Ref<number> = new Ref(data.focus_button_id);
    let image_focus_ref: Ref<number> = new Ref(0);
    if (scrollbar_handle_mouse(scrollbar, m_dialog) ||
        input_box_handle_mouse(m_dialog, file_name_input) ||
        generic_buttons_handle_mouse(m_dialog, 0, 0, file_buttons, NUM_FILES_IN_VIEW, focus_button_id_ref) ||
        image_buttons_handle_mouse(m_dialog, 0, 0, image_buttons, 2, image_focus_ref)) {
        data.focus_button_id = focus_button_id_ref.v;
        return;
    }
    if (input_go_back_requested(m, h)) {
        input_box_stop(file_name_input);
        window_go_back();
    }
    if (should_scroll_to_typed_text()) {
        scroll_to_typed_text();
    }
}
function get_chosen_filename() {
    let selected_name: number[] = new Array(FILE_NAME_MAX).fill(0);
    // TODO: encoding_from_utf8 needs proper implementation - temporarily use string_copy
    string_copy(data.selected_file, selected_name, FILE_NAME_MAX);
    file_remove_extension(selected_name);
    if (string_equals(selected_name, data.typed_name)) {
        return data.selected_file;
    }
    let typed_file: number[] = new Array(FILE_NAME_MAX).fill(0);
    encoding_to_utf8(data.typed_name, typed_file, FILE_NAME_MAX, encoding_system_uses_decomposed());
    file_append_extension(typed_file, data.file_data.extension);
    return typed_file;
}
function button_ok_cancel(is_ok: number, param2: number) {
    if (!is_ok) {
        input_box_stop(file_name_input);
        window_go_back();
        return;
    }
    let filename: number[] = get_chosen_filename();
    if (data.dialog_type != FILE_DIALOG_SAVE && !file_exists(filename, NOT_LOCALIZED)) {
        data.message_not_exist_start_time = time_get_millis();
        return;
    }
    const filename_str = string_from_bytes(filename);
    if (data.dialog_type == FILE_DIALOG_LOAD) {
        if (data.type == FILE_TYPE_SAVED_GAME) {
            if (game_file_load_saved_game(filename_str)) {
                input_box_stop(file_name_input);
                window_city_show();
            } else {
                data.message_not_exist_start_time = time_get_millis();
                return;
            }
        } else if (data.type == FILE_TYPE_SCENARIO) {
            if (game_file_editor_load_scenario(filename)) {
                input_box_stop(file_name_input);
                window_editor_map_show();
            } else {
                data.message_not_exist_start_time = time_get_millis();
                return;
            }
        }
    } else if (data.dialog_type == FILE_DIALOG_SAVE) {
        input_box_stop(file_name_input);
        if (data.type == FILE_TYPE_SAVED_GAME) {
            game_file_write_saved_game(filename_str);
            window_city_show();
        } else if (data.type == FILE_TYPE_SCENARIO) {
            game_file_editor_write_scenario(filename);
            window_editor_map_show();
        }
    } else if (data.dialog_type == FILE_DIALOG_DELETE) {
        if (game_file_delete_saved_game(filename_str)) {
            dir_find_files_with_extension(data.file_data.extension);
            if (scrollbar.scroll_position + NUM_FILES_IN_VIEW >= data.file_list.num_files) {
                --scrollbar.scroll_position;
            }
            if (scrollbar.scroll_position < 0) {
                scrollbar.scroll_position = 0;
            }
        }
    }
    string_copy(filename, data.file_data.last_loaded_file, FILE_NAME_MAX - 1);
}
function on_scroll() {
    data.message_not_exist_start_time = 0;
}
function button_select_file(index: number, param2: number) {
    if (index < data.file_list.num_files) {
        string_copy(data.file_list.files[scrollbar.scroll_position + index], data.selected_file, FILE_NAME_MAX - 1);
        encoding_from_utf8(data.selected_file, data.typed_name, FILE_NAME_MAX);
        file_remove_extension(data.typed_name);
        string_copy(data.typed_name, data.previously_seen_typed_name, FILE_NAME_MAX);
        input_box_refresh_text(file_name_input);
        data.message_not_exist_start_time = 0;
    }
    if (data.dialog_type != FILE_DIALOG_DELETE && data.double_click) {
        data.double_click = 0;
        button_ok_cancel(1, 0);
    }
}
export function window_file_dialog_show(type: file_type, dialog_type: file_dialog_type) {
    let window: window_type = new window_type(
        WINDOW_FILE_DIALOG,
        window_draw_underlying_window,
        draw_foreground,
        handle_input
    );
    init(type, dialog_type);
    window_show(window);
}
