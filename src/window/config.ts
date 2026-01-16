export const ITEM_Y_OFFSET = 60;
export const ITEM_HEIGHT = 24;
export const NUM_VISIBLE_ITEMS = 15;
export const CHECKBOX_WIDTH = 560;
export const MAX_WIDGETS = 26;
import { calc_bound } from 'core/calc';
import { config_get, config_get_default_string_value, config_get_default_value, config_get_string, config_key, config_save, config_set, config_set_string, config_string_key, CONFIG_STRING_VALUE_MAX } from 'core/config';
import { dir_find_all_subdirectories, dir_listing } from 'core/dir';
import { encoding_from_utf8 } from 'core/encoding';
import { image_group } from 'core/image';
import { group_terrain } from 'core/image_group';
import { lang_dir_is_valid } from 'core/lang';
import { string_copy, string_from_ascii, string_from_int } from 'core/string';
import { game_reload_language } from 'game/game';
import { system_can_scale_display, system_init_cursors, system_is_fullscreen_only, system_scale_display } from 'game/system';
import { button_border_draw, button_none } from 'graphics/button';
import { font_t } from 'graphics/font';
import { generic_button, generic_buttons_handle_mouse } from 'graphics/generic_button';
import { graphics_clear_screen, graphics_in_dialog, graphics_reset_dialog } from 'graphics/graphics';
import { image_draw, image_draw_fullscreen_background } from 'graphics/image';
import { BLOCK_SIZE, inner_panel_draw, outer_panel_draw } from 'graphics/panel';
import { screen_dialog_offset_x, screen_dialog_offset_y } from 'graphics/screen';
import { scrollbar_draw, scrollbar_handle_mouse, scrollbar_init, scrollbar_type } from 'graphics/scrollbar';
import { text_draw, text_draw_centered, text_draw_ellipsized } from 'graphics/text';
import { window_id, window_invalidate, window_request_refresh, window_show, window_type } from 'graphics/window';
import { hotkeys } from 'input/hotkey';
import { mouse, mouse_in_dialog } from 'input/mouse';
import { translation_for, translation_key } from 'translation/translation';
import { window_hotkey_config_show } from 'window/hotkey_config';
import { window_main_menu_show } from 'window/main_menu';
import { window_plain_message_dialog_show } from 'window/plain_message_dialog';
import { window_select_list_show_text } from 'window/select_list';
import { memcpy, Ref, strcmp, strncpy } from '../../ext/crt';
export const MAX_LANGUAGE_DIRS = 20;
export const CHECKBOX_TEXT_WIDTH = 560;
export const CHECKBOX_CHECK_SIZE = 20;
export const NUMERICAL_SLIDER_X = 50;
export const NUMERICAL_SLIDER_PADDING = 2;
export const NUMERICAL_DOT_SIZE = 20;
export const NUMERICAL_RANGE_X = 20;
export const NUM_BOTTOM_BUTTONS = 4;
export const CHECKBOX_HEIGHT = 20;
;
import CONFIG_GP_FIX_IMMIGRATION_BUG = config_key.CONFIG_GP_FIX_IMMIGRATION_BUG;
import CONFIG_GP_FIX_100_YEAR_GHOSTS = config_key.CONFIG_GP_FIX_100_YEAR_GHOSTS;
import CONFIG_SCREEN_DISPLAY_SCALE = config_key.CONFIG_SCREEN_DISPLAY_SCALE;
import CONFIG_SCREEN_CURSOR_SCALE = config_key.CONFIG_SCREEN_CURSOR_SCALE;
import CONFIG_UI_SIDEBAR_INFO = config_key.CONFIG_UI_SIDEBAR_INFO;
import CONFIG_UI_SHOW_INTRO_VIDEO = config_key.CONFIG_UI_SHOW_INTRO_VIDEO;
import CONFIG_UI_SMOOTH_SCROLLING = config_key.CONFIG_UI_SMOOTH_SCROLLING;
import CONFIG_UI_DISABLE_MOUSE_EDGE_SCROLLING = config_key.CONFIG_UI_DISABLE_MOUSE_EDGE_SCROLLING;
import CONFIG_UI_DISABLE_RIGHT_CLICK_MAP_DRAG = config_key.CONFIG_UI_DISABLE_RIGHT_CLICK_MAP_DRAG;
import CONFIG_UI_VISUAL_FEEDBACK_ON_DELETE = config_key.CONFIG_UI_VISUAL_FEEDBACK_ON_DELETE;
import CONFIG_UI_ALLOW_CYCLING_TEMPLES = config_key.CONFIG_UI_ALLOW_CYCLING_TEMPLES;
import CONFIG_UI_SHOW_WATER_STRUCTURE_RANGE = config_key.CONFIG_UI_SHOW_WATER_STRUCTURE_RANGE;
import CONFIG_UI_SHOW_CONSTRUCTION_SIZE = config_key.CONFIG_UI_SHOW_CONSTRUCTION_SIZE;
import CONFIG_UI_HIGHLIGHT_LEGIONS = config_key.CONFIG_UI_HIGHLIGHT_LEGIONS;
import CONFIG_UI_SHOW_MILITARY_SIDEBAR = config_key.CONFIG_UI_SHOW_MILITARY_SIDEBAR;
import CONFIG_MAX_ENTRIES = config_key.CONFIG_MAX_ENTRIES;
import CONFIG_STRING_UI_LANGUAGE_DIR = config_string_key.CONFIG_STRING_UI_LANGUAGE_DIR;
import CONFIG_STRING_MAX_ENTRIES = config_string_key.CONFIG_STRING_MAX_ENTRIES;
import GROUP_PANEL_BUTTON = group_terrain.GROUP_PANEL_BUTTON;
import GROUP_CONFIG = group_terrain.GROUP_CONFIG;
import FONT_NORMAL_BLACK = font_t.FONT_NORMAL_BLACK;
import FONT_LARGE_BLACK = font_t.FONT_LARGE_BLACK;
import WINDOW_CONFIG = window_id.WINDOW_CONFIG;
import TR_INVALID_LANGUAGE_TITLE = translation_key.TR_INVALID_LANGUAGE_TITLE;
import TR_INVALID_LANGUAGE_MESSAGE = translation_key.TR_INVALID_LANGUAGE_MESSAGE;
import TR_BUTTON_OK = translation_key.TR_BUTTON_OK;
import TR_BUTTON_CANCEL = translation_key.TR_BUTTON_CANCEL;
import TR_BUTTON_RESET_DEFAULTS = translation_key.TR_BUTTON_RESET_DEFAULTS;
import TR_BUTTON_CONFIGURE_HOTKEYS = translation_key.TR_BUTTON_CONFIGURE_HOTKEYS;
import TR_CONFIG_TITLE = translation_key.TR_CONFIG_TITLE;
import TR_CONFIG_LANGUAGE_LABEL = translation_key.TR_CONFIG_LANGUAGE_LABEL;
import TR_CONFIG_LANGUAGE_DEFAULT = translation_key.TR_CONFIG_LANGUAGE_DEFAULT;
import TR_CONFIG_DISPLAY_SCALE = translation_key.TR_CONFIG_DISPLAY_SCALE;
import TR_CONFIG_CURSOR_SCALE = translation_key.TR_CONFIG_CURSOR_SCALE;
import TR_CONFIG_HEADER_UI_CHANGES = translation_key.TR_CONFIG_HEADER_UI_CHANGES;
import TR_CONFIG_HEADER_GAMEPLAY_CHANGES = translation_key.TR_CONFIG_HEADER_GAMEPLAY_CHANGES;
import TR_CONFIG_SHOW_INTRO_VIDEO = translation_key.TR_CONFIG_SHOW_INTRO_VIDEO;
import TR_CONFIG_SIDEBAR_INFO = translation_key.TR_CONFIG_SIDEBAR_INFO;
import TR_CONFIG_SMOOTH_SCROLLING = translation_key.TR_CONFIG_SMOOTH_SCROLLING;
import TR_CONFIG_DISABLE_MOUSE_EDGE_SCROLLING = translation_key.TR_CONFIG_DISABLE_MOUSE_EDGE_SCROLLING;
import TR_CONFIG_DISABLE_RIGHT_CLICK_MAP_DRAG = translation_key.TR_CONFIG_DISABLE_RIGHT_CLICK_MAP_DRAG;
import TR_CONFIG_VISUAL_FEEDBACK_ON_DELETE = translation_key.TR_CONFIG_VISUAL_FEEDBACK_ON_DELETE;
import TR_CONFIG_ALLOW_CYCLING_TEMPLES = translation_key.TR_CONFIG_ALLOW_CYCLING_TEMPLES;
import TR_CONFIG_SHOW_WATER_STRUCTURE_RANGE = translation_key.TR_CONFIG_SHOW_WATER_STRUCTURE_RANGE;
import TR_CONFIG_SHOW_CONSTRUCTION_SIZE = translation_key.TR_CONFIG_SHOW_CONSTRUCTION_SIZE;
import TR_CONFIG_HIGHLIGHT_LEGIONS = translation_key.TR_CONFIG_HIGHLIGHT_LEGIONS;
import TR_CONFIG_SHOW_MILITARY_SIDEBAR = translation_key.TR_CONFIG_SHOW_MILITARY_SIDEBAR;
import TR_CONFIG_FIX_IMMIGRATION_BUG = translation_key.TR_CONFIG_FIX_IMMIGRATION_BUG;
import TR_CONFIG_FIX_100_YEAR_GHOSTS = translation_key.TR_CONFIG_FIX_100_YEAR_GHOSTS;
let scrollbar: scrollbar_type = new scrollbar_type(580, ITEM_Y_OFFSET, ITEM_HEIGHT * NUM_VISIBLE_ITEMS, CHECKBOX_WIDTH, NUM_VISIBLE_ITEMS, on_scroll, 0, 4);
export const enum type {
    TYPE_NONE,
    TYPE_SPACE,
    TYPE_HEADER,
    TYPE_CHECKBOX,
    TYPE_SELECT,
    TYPE_NUMERICAL_DESC,
    TYPE_NUMERICAL_RANGE,
}
import TYPE_NONE = type.TYPE_NONE;
import TYPE_SPACE = type.TYPE_SPACE;
import TYPE_HEADER = type.TYPE_HEADER;
import TYPE_CHECKBOX = type.TYPE_CHECKBOX;
import TYPE_SELECT = type.TYPE_SELECT;
import TYPE_NUMERICAL_DESC = type.TYPE_NUMERICAL_DESC;
import TYPE_NUMERICAL_RANGE = type.TYPE_NUMERICAL_RANGE;

export const enum SELECT {
    SELECT_LANGUAGE,
}
import SELECT_LANGUAGE = SELECT.SELECT_LANGUAGE;

export const enum range {
    RANGE_DISPLAY_SCALE,
    RANGE_CURSOR_SCALE,
}
import RANGE_DISPLAY_SCALE = range.RANGE_DISPLAY_SCALE;
import RANGE_CURSOR_SCALE = range.RANGE_CURSOR_SCALE;

export class numerical_range_widget {
    public width_blocks: number = 0;
    public min: number = 0;
    public max: number = 0;
    public step: number = 0;
    public value: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.width_blocks = args[0]);
        args.length >= 2 && (this.min = args[1]);
        args.length >= 3 && (this.max = args[2]);
        args.length >= 4 && (this.step = args[3]);
        args.length >= 5 && (this.value = args[4]);
    }
}
export class config_widget {
    public type: number = 0;
    public subtype: number = 0;
    public description: translation_key = null;
    public get_display_text: (() => string | ArrayLike<number>) | null = null;
    public enabled: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.type = args[0]);
        args.length >= 2 && (this.subtype = args[1]);
        args.length >= 3 && (this.description = args[2]);
        args.length >= 4 && (this.get_display_text = args[3]);
        args.length >= 5 && (this.enabled = args[4]);
    }
}
type config_values = unnamed152_5[];
type config_string_values = unnamed157_5[];
let all_widgets: config_widget[] = [
    new config_widget(TYPE_SELECT, SELECT_LANGUAGE, TR_CONFIG_LANGUAGE_LABEL, display_text_language, 0),
    new config_widget(TYPE_NUMERICAL_DESC, RANGE_DISPLAY_SCALE, TR_CONFIG_DISPLAY_SCALE, 0, 0),
    new config_widget(TYPE_NUMERICAL_RANGE, RANGE_DISPLAY_SCALE, 0, display_text_display_scale, 0),
    new config_widget(TYPE_NUMERICAL_DESC, RANGE_CURSOR_SCALE, TR_CONFIG_CURSOR_SCALE, 0, 0),
    new config_widget(TYPE_NUMERICAL_RANGE, RANGE_CURSOR_SCALE, 0, display_text_cursor_scale, 0),
    new config_widget(TYPE_SPACE, 0, 0, 0, 0),
    new config_widget(TYPE_HEADER, 0, TR_CONFIG_HEADER_UI_CHANGES, 0, 0),
    new config_widget(TYPE_CHECKBOX, CONFIG_UI_SHOW_INTRO_VIDEO, TR_CONFIG_SHOW_INTRO_VIDEO, 0, 0),
    new config_widget(TYPE_CHECKBOX, CONFIG_UI_SIDEBAR_INFO, TR_CONFIG_SIDEBAR_INFO, 0, 0),
    new config_widget(TYPE_CHECKBOX, CONFIG_UI_SMOOTH_SCROLLING, TR_CONFIG_SMOOTH_SCROLLING, 0, 0),
    new config_widget(TYPE_CHECKBOX, CONFIG_UI_DISABLE_MOUSE_EDGE_SCROLLING, TR_CONFIG_DISABLE_MOUSE_EDGE_SCROLLING, 0, 0),
    new config_widget(TYPE_CHECKBOX, CONFIG_UI_DISABLE_RIGHT_CLICK_MAP_DRAG, TR_CONFIG_DISABLE_RIGHT_CLICK_MAP_DRAG, 0, 0),
    new config_widget(TYPE_CHECKBOX, CONFIG_UI_VISUAL_FEEDBACK_ON_DELETE, TR_CONFIG_VISUAL_FEEDBACK_ON_DELETE, 0, 0),
    new config_widget(TYPE_CHECKBOX, CONFIG_UI_ALLOW_CYCLING_TEMPLES, TR_CONFIG_ALLOW_CYCLING_TEMPLES, 0, 0),
    new config_widget(TYPE_CHECKBOX, CONFIG_UI_SHOW_WATER_STRUCTURE_RANGE, TR_CONFIG_SHOW_WATER_STRUCTURE_RANGE, 0, 0),
    new config_widget(TYPE_CHECKBOX, CONFIG_UI_SHOW_CONSTRUCTION_SIZE, TR_CONFIG_SHOW_CONSTRUCTION_SIZE, 0, 0),
    new config_widget(TYPE_CHECKBOX, CONFIG_UI_HIGHLIGHT_LEGIONS, TR_CONFIG_HIGHLIGHT_LEGIONS, 0, 0),
    new config_widget(TYPE_CHECKBOX, CONFIG_UI_SHOW_MILITARY_SIDEBAR, TR_CONFIG_SHOW_MILITARY_SIDEBAR, 0, 0),
    new config_widget(TYPE_SPACE, 0, 0, 0, 0),
    new config_widget(TYPE_HEADER, 0, TR_CONFIG_HEADER_GAMEPLAY_CHANGES, 0, 0),
    new config_widget(TYPE_CHECKBOX, CONFIG_GP_FIX_IMMIGRATION_BUG, TR_CONFIG_FIX_IMMIGRATION_BUG, 0, 0),
    new config_widget(TYPE_CHECKBOX, CONFIG_GP_FIX_100_YEAR_GHOSTS, TR_CONFIG_FIX_100_YEAR_GHOSTS, 0, 0)
];
let select_buttons: generic_button[] = [
    new generic_button(150, 0, 200, 24, button_language_select, button_none)
];
let scale_ranges: numerical_range_widget[] = [
    new numerical_range_widget(30, 50, 500, 5, 0),
    new numerical_range_widget(30, 100, 200, 50, 0)
];
let bottom_buttons: generic_button[] = [
    new generic_button(20, 430, 180, 30, button_hotkeys, button_none, 0, 0),
    new generic_button(230, 430, 180, 30, button_reset_defaults, button_none, 0, 0),
    new generic_button(415, 430, 100, 30, button_close, button_none, 0, 0),
    new generic_button(520, 430, 100, 30, button_close, button_none, 1, 0),
];
let bottom_button_texts: translation_key[] = [
    TR_BUTTON_CONFIGURE_HOTKEYS,
    TR_BUTTON_RESET_DEFAULTS,
    TR_BUTTON_CANCEL,
    TR_BUTTON_OK
];
class unnamed152_5 {
    public original_value: number = 0;
    public new_value: number = 0;
    public change_action: (key: config_key) => number = null;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.original_value = args[0]);
        args.length >= 2 && (this.new_value = args[1]);
        args.length >= 3 && (this.change_action = args[2]);
    }
}
class unnamed157_5 {
    public original_value: Uint8Array = new Uint8Array(CONFIG_STRING_VALUE_MAX);
    public new_value: Uint8Array = new Uint8Array(CONFIG_STRING_VALUE_MAX);
    public change_action: (key: config_key) => number = null;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.original_value = args[0]);
        args.length >= 2 && (this.new_value = args[1]);
        args.length >= 3 && (this.change_action = args[2]);
    }
}
export class unnamed147_8 {
    public widgets: config_widget[] = new Array(MAX_WIDGETS).fill(null);
    public num_widgets: number = 0;
    public focus_button: number = 0;
    public bottom_focus_button: number = 0;
    public config_values: config_values = new Array(CONFIG_MAX_ENTRIES).fill(null);
    public config_string_values: config_string_values = new Array(CONFIG_STRING_VALUE_MAX).fill(null);
    public language_options_data: Uint8Array[] = new Array(MAX_LANGUAGE_DIRS).fill(null);
    public language_options: string[] = new Array(MAX_LANGUAGE_DIRS).fill('');
    public language_options_utf8: string[] = new Array(MAX_LANGUAGE_DIRS).fill('');
    public num_language_options: number = 0;
    public selected_language_option: number = 0;
    public active_numerical_range: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.widgets = args[0]);
        args.length >= 2 && (this.num_widgets = args[1]);
        args.length >= 3 && (this.focus_button = args[2]);
        args.length >= 4 && (this.bottom_focus_button = args[3]);
        args.length >= 5 && (this.config_values = args[4]);
        args.length >= 6 && (this.config_string_values = args[5]);
        args.length >= 7 && (this.language_options_data = args[6]);
        args.length >= 8 && (this.language_options = args[7]);
        args.length >= 9 && (this.language_options_utf8 = args[8]);
        args.length >= 10 && (this.num_language_options = args[9]);
        args.length >= 11 && (this.selected_language_option = args[10]);
        args.length >= 12 && (this.active_numerical_range = args[11]);
    }
}
let data: unnamed147_8 = new unnamed147_8();
function init_config_values() {
    for (let i: number = 0; i < CONFIG_MAX_ENTRIES; ++i) {
        data.config_values[i].change_action = config_change_basic;
    }
    for (let i: number = 0; i < CONFIG_STRING_MAX_ENTRIES; ++i) {
        data.config_string_values[i].change_action = config_change_string_basic;
    }
    data.config_values[CONFIG_SCREEN_DISPLAY_SCALE].change_action = config_change_display_scale;
    data.config_values[CONFIG_SCREEN_CURSOR_SCALE].change_action = config_change_cursor_scale;
    data.config_string_values[CONFIG_STRING_UI_LANGUAGE_DIR].change_action = config_change_string_language;
    scale_ranges[RANGE_DISPLAY_SCALE].value = data.config_values[CONFIG_SCREEN_DISPLAY_SCALE].new_value;
    scale_ranges[RANGE_CURSOR_SCALE].value = data.config_values[CONFIG_SCREEN_CURSOR_SCALE].new_value;
}
function enable_all_widgets() {
    for (let i: number = 0; i < MAX_WIDGETS; i++) {
        if (all_widgets[i].type) {
            all_widgets[i].enabled = 1;
        }
    }
}
function disable_widget(type: number, subtype: number) {
    for (let i: number = 0; i < MAX_WIDGETS; i++) {
        if (all_widgets[i].type == type && all_widgets[i].subtype == subtype) {
            all_widgets[i].enabled = 0;
        }
    }
}
function install_widgets() {
    data.num_widgets = 0;
    for (let i: number = 0; i < MAX_WIDGETS; i++) {
        if (all_widgets[i].enabled) {
            data.widgets[data.num_widgets++] = all_widgets[i];
        }
    }
}
function init_language_buffers() {
    for (let i: number = 0; i < MAX_LANGUAGE_DIRS; i++) {
        if (!data.language_options_data[i]) {
            data.language_options_data[i] = new Uint8Array(CONFIG_STRING_VALUE_MAX);
        }
    }
}
function init() {
    init_language_buffers();
    for (let i: number = 0; i < CONFIG_MAX_ENTRIES; i++) {
        if (!data.config_values[i]) {
            data.config_values[i] = new unnamed152_5();
        }
    }
    for (let i: number = 0; i < CONFIG_STRING_MAX_ENTRIES; i++) {
        if (!data.config_string_values[i]) {
            data.config_string_values[i] = new unnamed157_5();
        }
    }
    if (!data.config_values[0].change_action) {
        init_config_values();
    }
    for (let i: number = 0; i < CONFIG_MAX_ENTRIES; i++) {
        data.config_values[i].original_value = config_get(i);
        data.config_values[i].new_value = config_get(i);
    }
    for (let i: number = 0; i < CONFIG_STRING_MAX_ENTRIES; i++) {
        let value: char = config_get_string(i);
        strncpy(data.config_string_values[i].original_value, value, CONFIG_STRING_VALUE_MAX - 1);
        strncpy(data.config_string_values[i].new_value, value, CONFIG_STRING_VALUE_MAX - 1);
    }
    string_copy(translation_for(TR_CONFIG_LANGUAGE_DEFAULT), data.language_options_data[0], CONFIG_STRING_VALUE_MAX);
    data.language_options[0] = translation_for(TR_CONFIG_LANGUAGE_DEFAULT);
    data.num_language_options = 1;
    data.selected_language_option = 0;
    let subdirs: dir_listing = dir_find_all_subdirectories();
    let original_value = data.config_string_values[CONFIG_STRING_UI_LANGUAGE_DIR].original_value;
    for (let i: number = 0; i < subdirs.num_files; i++) {
        if (data.num_language_options < MAX_LANGUAGE_DIRS && lang_dir_is_valid(subdirs.files[i])) {
            let opt_id: number = data.num_language_options;
            data.language_options_utf8[opt_id] = subdirs.files[i].substring(0, CONFIG_STRING_VALUE_MAX - 1);
            encoding_from_utf8(subdirs.files[i], data.language_options_data[opt_id], CONFIG_STRING_VALUE_MAX);
            data.language_options[opt_id] = subdirs.files[i];
            if (strcmp(original_value, subdirs.files[i]) == 0) {
                data.selected_language_option = opt_id;
            }
            data.num_language_options++;
        }
    }
    enable_all_widgets();
    let min_scale_ref = new Ref<number>(0);
    let max_scale_ref = new Ref<number>(0);
    if (!system_can_scale_display(min_scale_ref, max_scale_ref)) {
        disable_widget(TYPE_NUMERICAL_DESC, RANGE_DISPLAY_SCALE);
        disable_widget(TYPE_NUMERICAL_RANGE, RANGE_DISPLAY_SCALE);
    }
    if (system_is_fullscreen_only()) {
        disable_widget(TYPE_NUMERICAL_DESC, RANGE_CURSOR_SCALE);
        disable_widget(TYPE_NUMERICAL_RANGE, RANGE_CURSOR_SCALE);
    }
    install_widgets();
    scrollbar_init(scrollbar, 0, data.num_widgets);
}
function checkbox_draw_text(x: number, y: number, value_key: number, description: translation_key) {
    if (data.config_values[value_key].new_value) {
        text_draw(string_from_ascii("x"), x + 6, y + 3, FONT_NORMAL_BLACK, 0);
    }
    text_draw_ellipsized(translation_for(description), x + 30, y + 5, CHECKBOX_TEXT_WIDTH, FONT_NORMAL_BLACK, 0);
}
function checkbox_draw(x: number, y: number, has_focus: number) {
    button_border_draw(x, y, CHECKBOX_CHECK_SIZE, CHECKBOX_CHECK_SIZE, has_focus);
}
function numerical_range_draw(w: numerical_range_widget, x: number, y: number, value_text: string | ArrayLike<number>) {
    text_draw(value_text, x, y + 6, FONT_NORMAL_BLACK, 0);
    inner_panel_draw(x + NUMERICAL_SLIDER_X, y + 4, w.width_blocks, 1);
    let width: number = w.width_blocks * BLOCK_SIZE - NUMERICAL_SLIDER_PADDING * 2 - NUMERICAL_DOT_SIZE;
    let scroll_position: number = (w.value - w.min) * width / (w.max - w.min);
    image_draw(image_group(GROUP_PANEL_BUTTON) + 37,
        x + NUMERICAL_SLIDER_X + NUMERICAL_SLIDER_PADDING + scroll_position, y + 2);
}
function percentage_string(value: Uint8Array, percentage: number) {
    let offset: number = string_from_int(value, percentage, 0);
    value[offset] = '%'.charCodeAt(0);
    value[offset + 1] = 0;
    return value;
}
function display_text_language() {
    return data.language_options[data.selected_language_option];
}
function display_text_display_scale() {
    let value: Uint8Array = new Uint8Array(CONFIG_STRING_VALUE_MAX);
    return percentage_string(value, data.config_values[CONFIG_SCREEN_DISPLAY_SCALE].new_value);
}
function display_text_cursor_scale() {
    let value: Uint8Array = new Uint8Array(CONFIG_STRING_VALUE_MAX);
    return percentage_string(value, data.config_values[CONFIG_SCREEN_CURSOR_SCALE].new_value);
}
function update_scale() {
    let min_scale = new Ref<number>(0);
    let max_scale = new Ref<number>(0);
    if (system_can_scale_display(min_scale, max_scale)) {
        scale_ranges[RANGE_DISPLAY_SCALE].min = min_scale.v;
        scale_ranges[RANGE_DISPLAY_SCALE].max = max_scale.v;
        if (scale_ranges[RANGE_DISPLAY_SCALE].value > max_scale.v) {
            scale_ranges[RANGE_DISPLAY_SCALE].value = max_scale.v;
        }
    }
}
function draw_background() {
    update_scale();
    graphics_clear_screen();
    image_draw_fullscreen_background(image_group(GROUP_CONFIG));
    graphics_in_dialog();
    outer_panel_draw(0, 0, 40, 30);
    text_draw_centered(translation_for(TR_CONFIG_TITLE), 16, 16, 608, FONT_LARGE_BLACK, 0);
    for (let i: number = 0; i < NUM_VISIBLE_ITEMS && i < data.num_widgets; i++) {
        let w: config_widget = data.widgets[i + scrollbar.scroll_position];
        let y: number = ITEM_Y_OFFSET + ITEM_HEIGHT * i;
        if (w.type == TYPE_HEADER) {
            text_draw(translation_for(w.description), 20, y, FONT_NORMAL_BLACK, 0);
        } else if (w.type == TYPE_CHECKBOX) {
            checkbox_draw_text(20, y, w.subtype, w.description);
        } else if (w.type == TYPE_SELECT) {
            text_draw(translation_for(w.description), 20, y + 6, FONT_NORMAL_BLACK, 0);
            let btn: generic_button = select_buttons[w.subtype];
            let display_text = w.get_display_text ? w.get_display_text() : "";
            text_draw_centered(display_text, btn.x, y + btn.y + 6, btn.width, FONT_NORMAL_BLACK, 0);
        } else if (w.type == TYPE_NUMERICAL_RANGE) {
            let display_text = w.get_display_text ? w.get_display_text() : "";
            numerical_range_draw(scale_ranges[w.subtype], NUMERICAL_RANGE_X, y, display_text);
        } else if (w.type == TYPE_NUMERICAL_DESC) {
            text_draw(translation_for(w.description), 20, y + 10, FONT_NORMAL_BLACK, 0);
        }
    }
    for (let i: number = 0; i < NUM_BOTTOM_BUTTONS; i++) {
        text_draw_centered(translation_for(bottom_button_texts[i]),
            bottom_buttons[i].x, bottom_buttons[i].y + 9, bottom_buttons[i].width, FONT_NORMAL_BLACK, 0);
    }
    graphics_reset_dialog();
}
function draw_foreground() {
    graphics_in_dialog();
    for (let i: number = 0; i < NUM_VISIBLE_ITEMS && i < data.num_widgets; i++) {
        let w: config_widget = data.widgets[i + scrollbar.scroll_position];
        let y: number = ITEM_Y_OFFSET + ITEM_HEIGHT * i;
        if (w.type == TYPE_CHECKBOX) {
            checkbox_draw(20, y, data.focus_button == i + 1 ? 1 : 0);
        } else if (w.type == TYPE_SELECT) {
            let btn: generic_button = select_buttons[w.subtype];
            button_border_draw(btn.x, y + btn.y,
                btn.width, btn.height, data.focus_button == i + 1);
        }
    }
    for (let i: number = 0; i < NUM_BOTTOM_BUTTONS; i++) {
        button_border_draw(bottom_buttons[i].x, bottom_buttons[i].y,
            bottom_buttons[i].width, bottom_buttons[i].height, data.bottom_focus_button == i + 1);
    }
    if (data.num_widgets > NUM_VISIBLE_ITEMS) {
        inner_panel_draw(scrollbar.x + 4, scrollbar.y + 28, 2, scrollbar.height / BLOCK_SIZE - 3);
        scrollbar_draw(scrollbar);
    }
    graphics_reset_dialog();
}
function is_checkbox(m: mouse, x: number, y: number) {
    if (x <= m.x && x + CHECKBOX_WIDTH > m.x &&
        y <= m.y && y + CHECKBOX_HEIGHT > m.y) {
        return 1;
    }
    return 0;
}
function checkbox_handle_mouse(m: mouse, x: number, y: number, value_key: number, focus: Ref<boolean>) {
    if (!is_checkbox(m, x, y)) {
        return false;
    }
    focus.v = true;
    if (m.left.went_up) {
        toggle_switch(value_key);
        return true;
    } else {
        return false;
    }
}
function is_numerical_range(m: mouse, x: number, y: number, width: number) {
    if (x + NUMERICAL_SLIDER_X <= m.x && x + width + NUMERICAL_SLIDER_X >= m.x &&
        y <= m.y && y + 16 > m.y) {
        return true;
    }
    return false;
}
function numerical_range_handle_mouse(m: mouse, x: number, y: number, numerical_range_id: number) {
    let w: numerical_range_widget = scale_ranges[numerical_range_id - 1];
    if (data.active_numerical_range) {
        if (data.active_numerical_range != numerical_range_id) {
            return false;
        }
        if (!m.left.is_down) {
            data.active_numerical_range = 0;
            return false;
        }
    } else if (!m.left.went_down || !is_numerical_range(m, x, y, w.width_blocks * BLOCK_SIZE)) {
        return false;
    }
    let slider_width: number = w.width_blocks * BLOCK_SIZE - NUMERICAL_SLIDER_PADDING * 2 - NUMERICAL_DOT_SIZE;
    let pixels_per_pct: number = slider_width / (w.max - w.min);
    let dot_position: number = m.x - x - NUMERICAL_SLIDER_X - NUMERICAL_DOT_SIZE / 2 + pixels_per_pct / 2;
    let exact_value: number = calc_bound(w.min + dot_position * (w.max - w.min) / slider_width, w.min, w.max);
    let left_step_value: number = (exact_value / w.step) * w.step;
    let right_step_value: number = calc_bound(left_step_value + w.step, w.min, w.max);
    let closest_step_value: number = (exact_value - left_step_value) < (right_step_value - exact_value) ?
        left_step_value : right_step_value;
    if (closest_step_value != w.value) {
        w.value = closest_step_value;
        window_request_refresh();
    }
    data.active_numerical_range = numerical_range_id;
    return true;
}
function handle_input(m: mouse, h: hotkeys) {
    let m_dialog: mouse = mouse_in_dialog(m);
    if (data.active_numerical_range) {
        numerical_range_handle_mouse(m_dialog, NUMERICAL_RANGE_X, 0, data.active_numerical_range);
        return;
    }
    if (scrollbar_handle_mouse(scrollbar, m_dialog)) {
        return;
    }
    let handled: boolean = false;
    data.focus_button = 0;
    for (let i: number = 0; i < NUM_VISIBLE_ITEMS && i < data.num_widgets; i++) {
        let w: config_widget = data.widgets[i + scrollbar.scroll_position];
        let y: number = ITEM_Y_OFFSET + ITEM_HEIGHT * i;
        if (w.type == TYPE_CHECKBOX) {
            let focus = new Ref<boolean>(false);
            handled ||= checkbox_handle_mouse(m_dialog, 20, y, w.subtype, focus);
            if (focus.v) {
                data.focus_button = i + 1;
            }
        } else if (w.type == TYPE_SELECT) {
            let btn: generic_button = select_buttons[w.subtype];
            let focus = new Ref<number>(0);
            handled ||= generic_buttons_handle_mouse(m_dialog, 0, y, [btn], 1, focus)
            if (focus.v) {
                data.focus_button = i + 1;
            }
        } else if (w.type == TYPE_NUMERICAL_RANGE) {
            handled ||= numerical_range_handle_mouse(m_dialog, NUMERICAL_RANGE_X, y, w.subtype + 1)
        }
    }
    handled ||= generic_buttons_handle_mouse(m_dialog, 0, 0,
        bottom_buttons, NUM_BOTTOM_BUTTONS, data.bottom_focus_button)
    if (!handled && (m.right.went_up || h.escape_pressed)) {
        window_main_menu_show(0);
    }
}
function on_scroll() {
    window_invalidate();
}
function toggle_switch(key: number) {
    data.config_values[key].new_value = 1 - data.config_values[key].new_value;
    window_invalidate();
}
function set_language(index: number) {
    let dir: string = index == 0 ? "" : data.language_options_utf8[index];
    strncpy(data.config_string_values[CONFIG_STRING_UI_LANGUAGE_DIR].new_value, dir, CONFIG_STRING_VALUE_MAX - 1);
    data.selected_language_option = index;
}
function button_language_select(param1: number, param2: number) {
    let btn: generic_button = select_buttons[SELECT_LANGUAGE];
    window_select_list_show_text(
        screen_dialog_offset_x() + btn.x + btn.width - 10,
        screen_dialog_offset_y() + 45,
        data.language_options, data.num_language_options, set_language
    );
}
function button_hotkeys(param1: number, param2: number) {
    window_hotkey_config_show();
}
function button_reset_defaults(param1: number, param2: number) {
    for (let i: number = 0; i < CONFIG_MAX_ENTRIES; ++i) {
        data.config_values[i].new_value = config_get_default_value(i);
    }
    for (let i: number = 0; i < CONFIG_STRING_MAX_ENTRIES; ++i) {
        strncpy(data.config_string_values[i].new_value,
            config_get_default_string_value(i), CONFIG_STRING_VALUE_MAX - 1);
    }
    set_language(0);
    window_invalidate();
}
function cancel_values() {
    for (let i: number = 0; i < CONFIG_MAX_ENTRIES; i++) {
        data.config_values[i].new_value = data.config_values[i].original_value;
    }
    for (let i: number = 0; i < CONFIG_STRING_MAX_ENTRIES; i++) {
        memcpy(data.config_string_values[i].new_value,
            data.config_string_values[i].original_value, CONFIG_STRING_VALUE_MAX - 1);
    }
}
function config_changed(key: config_key) {
    return data.config_values[key].original_value != data.config_values[key].new_value;
}
function config_string_changed(key: config_string_key) {
    return strcmp(data.config_string_values[key].original_value, data.config_string_values[key].new_value) != 0;
}
function config_change_basic(key: config_key) {
    config_set(key, data.config_values[key].new_value);
    data.config_values[key].original_value = data.config_values[key].new_value;
    return 1;
}
function config_change_display_scale(key: config_key) {
    data.config_values[key].new_value = system_scale_display(data.config_values[key].new_value);
    config_change_basic(key);
    return 1;
}
function config_change_cursor_scale(key: config_key) {
    config_change_basic(key);
    system_init_cursors(data.config_values[key].new_value);
    return 1;
}
function config_change_string_basic(key: config_string_key) {
    config_set_string(key, data.config_string_values[key].new_value);
    strncpy(data.config_string_values[key].original_value,
        data.config_string_values[key].new_value, CONFIG_STRING_VALUE_MAX - 1);
    return 1;
}
function config_change_string_language(key: config_string_key) {
    config_set_string(CONFIG_STRING_UI_LANGUAGE_DIR, data.config_string_values[key].new_value);
    if (!game_reload_language()) {
        config_set_string(CONFIG_STRING_UI_LANGUAGE_DIR, data.config_string_values[key].original_value);
        game_reload_language();
        window_plain_message_dialog_show(TR_INVALID_LANGUAGE_TITLE, TR_INVALID_LANGUAGE_MESSAGE);
        return 0;
    }
    strncpy(data.config_string_values[key].original_value,
        data.config_string_values[key].new_value, CONFIG_STRING_VALUE_MAX - 1);
    return 1;
}
function apply_changed_configs() {
    for (let i: number = 0; i < CONFIG_MAX_ENTRIES; ++i) {
        if (config_changed(i)) {
            if (!data.config_values[i].change_action(i)) {
                return 0;
            }
        }
    }
    for (let i: number = 0; i < CONFIG_STRING_MAX_ENTRIES; ++i) {
        if (config_string_changed(i)) {
            if (!data.config_string_values[i].change_action(i)) {
                return 0;
            }
        }
    }
    return 1;
}
function button_close(save: number, param2: number) {
    if (!save) {
        cancel_values();
        window_main_menu_show(0);
        return;
    }
    if (apply_changed_configs()) {
        config_save();
        window_main_menu_show(0);
    }
}
export function window_config_show() {
    let window: window_type = new window_type(
        WINDOW_CONFIG,
        draw_background,
        draw_foreground,
        handle_input
    );
    init();
    window_show(window);
}
