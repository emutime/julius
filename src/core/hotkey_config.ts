export const MAX_MAPPINGS = 2;
export const MAX_LINE = 100;
import { key_type } from 'input/keys';
import KEY_TYPE_NONE = key_type.KEY_TYPE_NONE;
import KEY_TYPE_A = key_type.KEY_TYPE_A;
import KEY_TYPE_C = key_type.KEY_TYPE_C;
import KEY_TYPE_D = key_type.KEY_TYPE_D;
import KEY_TYPE_F = key_type.KEY_TYPE_F;
import KEY_TYPE_L = key_type.KEY_TYPE_L;
import KEY_TYPE_O = key_type.KEY_TYPE_O;
import KEY_TYPE_P = key_type.KEY_TYPE_P;
import KEY_TYPE_S = key_type.KEY_TYPE_S;
import KEY_TYPE_T = key_type.KEY_TYPE_T;
import KEY_TYPE_W = key_type.KEY_TYPE_W;
import KEY_TYPE_1 = key_type.KEY_TYPE_1;
import KEY_TYPE_2 = key_type.KEY_TYPE_2;
import KEY_TYPE_3 = key_type.KEY_TYPE_3;
import KEY_TYPE_4 = key_type.KEY_TYPE_4;
import KEY_TYPE_5 = key_type.KEY_TYPE_5;
import KEY_TYPE_6 = key_type.KEY_TYPE_6;
import KEY_TYPE_7 = key_type.KEY_TYPE_7;
import KEY_TYPE_8 = key_type.KEY_TYPE_8;
import KEY_TYPE_9 = key_type.KEY_TYPE_9;
import KEY_TYPE_0 = key_type.KEY_TYPE_0;
import KEY_TYPE_MINUS = key_type.KEY_TYPE_MINUS;
import KEY_TYPE_EQUALS = key_type.KEY_TYPE_EQUALS;
import KEY_TYPE_ENTER = key_type.KEY_TYPE_ENTER;
import KEY_TYPE_SPACE = key_type.KEY_TYPE_SPACE;
import KEY_TYPE_LEFTBRACKET = key_type.KEY_TYPE_LEFTBRACKET;
import KEY_TYPE_RIGHTBRACKET = key_type.KEY_TYPE_RIGHTBRACKET;
import KEY_TYPE_F1 = key_type.KEY_TYPE_F1;
import KEY_TYPE_F2 = key_type.KEY_TYPE_F2;
import KEY_TYPE_F3 = key_type.KEY_TYPE_F3;
import KEY_TYPE_F4 = key_type.KEY_TYPE_F4;
import KEY_TYPE_F5 = key_type.KEY_TYPE_F5;
import KEY_TYPE_F6 = key_type.KEY_TYPE_F6;
import KEY_TYPE_F7 = key_type.KEY_TYPE_F7;
import KEY_TYPE_F8 = key_type.KEY_TYPE_F8;
import KEY_TYPE_F9 = key_type.KEY_TYPE_F9;
import KEY_TYPE_F12 = key_type.KEY_TYPE_F12;
import KEY_TYPE_HOME = key_type.KEY_TYPE_HOME;
import KEY_TYPE_END = key_type.KEY_TYPE_END;
import KEY_TYPE_PAGEUP = key_type.KEY_TYPE_PAGEUP;
import KEY_TYPE_PAGEDOWN = key_type.KEY_TYPE_PAGEDOWN;
import KEY_TYPE_RIGHT = key_type.KEY_TYPE_RIGHT;
import KEY_TYPE_LEFT = key_type.KEY_TYPE_LEFT;
import KEY_TYPE_DOWN = key_type.KEY_TYPE_DOWN;
import KEY_TYPE_UP = key_type.KEY_TYPE_UP;
import KEY_TYPE_KP_1 = key_type.KEY_TYPE_KP_1;
import KEY_TYPE_KP_2 = key_type.KEY_TYPE_KP_2;
import KEY_TYPE_KP_3 = key_type.KEY_TYPE_KP_3;
import KEY_TYPE_KP_4 = key_type.KEY_TYPE_KP_4;
import KEY_TYPE_KP_5 = key_type.KEY_TYPE_KP_5;
import KEY_TYPE_KP_6 = key_type.KEY_TYPE_KP_6;
import KEY_TYPE_KP_7 = key_type.KEY_TYPE_KP_7;
import KEY_TYPE_KP_8 = key_type.KEY_TYPE_KP_8;
import KEY_TYPE_KP_9 = key_type.KEY_TYPE_KP_9;
import KEY_TYPE_KP_0 = key_type.KEY_TYPE_KP_0;
import { key_type } from 'input/keys';
import { key_modifier_type } from 'input/keys';
import KEY_MOD_NONE = key_modifier_type.KEY_MOD_NONE;
import KEY_MOD_CTRL = key_modifier_type.KEY_MOD_CTRL;
import KEY_MOD_ALT = key_modifier_type.KEY_MOD_ALT;
import { key_modifier_type } from 'input/keys';
import { key_combination_name } from 'input/keys';
import { key_combination_from_name } from 'input/keys';
import { hotkey_action } from 'core/hotkey_config';
import HOTKEY_ARROW_UP = hotkey_action.HOTKEY_ARROW_UP;
import HOTKEY_ARROW_DOWN = hotkey_action.HOTKEY_ARROW_DOWN;
import HOTKEY_ARROW_LEFT = hotkey_action.HOTKEY_ARROW_LEFT;
import HOTKEY_ARROW_RIGHT = hotkey_action.HOTKEY_ARROW_RIGHT;
import HOTKEY_TOGGLE_PAUSE = hotkey_action.HOTKEY_TOGGLE_PAUSE;
import HOTKEY_TOGGLE_OVERLAY = hotkey_action.HOTKEY_TOGGLE_OVERLAY;
import HOTKEY_CYCLE_LEGION = hotkey_action.HOTKEY_CYCLE_LEGION;
import HOTKEY_INCREASE_GAME_SPEED = hotkey_action.HOTKEY_INCREASE_GAME_SPEED;
import HOTKEY_DECREASE_GAME_SPEED = hotkey_action.HOTKEY_DECREASE_GAME_SPEED;
import HOTKEY_ROTATE_MAP_LEFT = hotkey_action.HOTKEY_ROTATE_MAP_LEFT;
import HOTKEY_ROTATE_MAP_RIGHT = hotkey_action.HOTKEY_ROTATE_MAP_RIGHT;
import HOTKEY_SHOW_ADVISOR_LABOR = hotkey_action.HOTKEY_SHOW_ADVISOR_LABOR;
import HOTKEY_SHOW_ADVISOR_MILITARY = hotkey_action.HOTKEY_SHOW_ADVISOR_MILITARY;
import HOTKEY_SHOW_ADVISOR_IMPERIAL = hotkey_action.HOTKEY_SHOW_ADVISOR_IMPERIAL;
import HOTKEY_SHOW_ADVISOR_RATINGS = hotkey_action.HOTKEY_SHOW_ADVISOR_RATINGS;
import HOTKEY_SHOW_ADVISOR_TRADE = hotkey_action.HOTKEY_SHOW_ADVISOR_TRADE;
import HOTKEY_SHOW_ADVISOR_POPULATION = hotkey_action.HOTKEY_SHOW_ADVISOR_POPULATION;
import HOTKEY_SHOW_ADVISOR_HEALTH = hotkey_action.HOTKEY_SHOW_ADVISOR_HEALTH;
import HOTKEY_SHOW_ADVISOR_EDUCATION = hotkey_action.HOTKEY_SHOW_ADVISOR_EDUCATION;
import HOTKEY_SHOW_ADVISOR_ENTERTAINMENT = hotkey_action.HOTKEY_SHOW_ADVISOR_ENTERTAINMENT;
import HOTKEY_SHOW_ADVISOR_RELIGION = hotkey_action.HOTKEY_SHOW_ADVISOR_RELIGION;
import HOTKEY_SHOW_ADVISOR_FINANCIAL = hotkey_action.HOTKEY_SHOW_ADVISOR_FINANCIAL;
import HOTKEY_SHOW_ADVISOR_CHIEF = hotkey_action.HOTKEY_SHOW_ADVISOR_CHIEF;
import HOTKEY_SHOW_OVERLAY_WATER = hotkey_action.HOTKEY_SHOW_OVERLAY_WATER;
import HOTKEY_SHOW_OVERLAY_FIRE = hotkey_action.HOTKEY_SHOW_OVERLAY_FIRE;
import HOTKEY_SHOW_OVERLAY_DAMAGE = hotkey_action.HOTKEY_SHOW_OVERLAY_DAMAGE;
import HOTKEY_SHOW_OVERLAY_CRIME = hotkey_action.HOTKEY_SHOW_OVERLAY_CRIME;
import HOTKEY_SHOW_OVERLAY_PROBLEMS = hotkey_action.HOTKEY_SHOW_OVERLAY_PROBLEMS;
import HOTKEY_EDITOR_TOGGLE_BATTLE_INFO = hotkey_action.HOTKEY_EDITOR_TOGGLE_BATTLE_INFO;
import HOTKEY_LOAD_FILE = hotkey_action.HOTKEY_LOAD_FILE;
import HOTKEY_SAVE_FILE = hotkey_action.HOTKEY_SAVE_FILE;
import HOTKEY_GO_TO_BOOKMARK_1 = hotkey_action.HOTKEY_GO_TO_BOOKMARK_1;
import HOTKEY_GO_TO_BOOKMARK_2 = hotkey_action.HOTKEY_GO_TO_BOOKMARK_2;
import HOTKEY_GO_TO_BOOKMARK_3 = hotkey_action.HOTKEY_GO_TO_BOOKMARK_3;
import HOTKEY_GO_TO_BOOKMARK_4 = hotkey_action.HOTKEY_GO_TO_BOOKMARK_4;
import HOTKEY_SET_BOOKMARK_1 = hotkey_action.HOTKEY_SET_BOOKMARK_1;
import HOTKEY_SET_BOOKMARK_2 = hotkey_action.HOTKEY_SET_BOOKMARK_2;
import HOTKEY_SET_BOOKMARK_3 = hotkey_action.HOTKEY_SET_BOOKMARK_3;
import HOTKEY_SET_BOOKMARK_4 = hotkey_action.HOTKEY_SET_BOOKMARK_4;
import HOTKEY_CENTER_WINDOW = hotkey_action.HOTKEY_CENTER_WINDOW;
import HOTKEY_TOGGLE_FULLSCREEN = hotkey_action.HOTKEY_TOGGLE_FULLSCREEN;
import HOTKEY_RESIZE_TO_640 = hotkey_action.HOTKEY_RESIZE_TO_640;
import HOTKEY_RESIZE_TO_800 = hotkey_action.HOTKEY_RESIZE_TO_800;
import HOTKEY_RESIZE_TO_1024 = hotkey_action.HOTKEY_RESIZE_TO_1024;
import HOTKEY_SAVE_SCREENSHOT = hotkey_action.HOTKEY_SAVE_SCREENSHOT;
import HOTKEY_SAVE_CITY_SCREENSHOT = hotkey_action.HOTKEY_SAVE_CITY_SCREENSHOT;
import HOTKEY_MAX_ITEMS = hotkey_action.HOTKEY_MAX_ITEMS;
export class hotkey_mapping {
    public key: key_type = null;
    public modifiers: key_modifier_type = null;
    public action: hotkey_action = null;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.key = args[0]);
        args.length >= 2 && (this.modifiers = args[1]);
        args.length >= 3 && (this.action = args[2]);
    }
}
import { dir_listing } from 'core/dir';
import { file_open } from 'core/file';
import { file_close } from 'core/file';
import { log_info } from 'core/log';
import { log_error } from 'core/log';
import { color_t } from 'graphics/color';
import { system_keyboard_key_for_symbol } from 'game/system';
import { hotkeys } from 'input/hotkey';
import { hotkey_install_mapping } from 'input/hotkey';
let INI_FILENAME: string = "julius-hotkeys.ini";
let ini_keys: string[] = [
    "arrow_up",
    "arrow_down",
    "arrow_left",
    "arrow_right",
    "toggle_pause",
    "toggle_overlay",
    "cycle_legion",
    "increase_game_speed",
    "decrease_game_speed",
    "rotate_map_left",
    "rotate_map_right",
    "build_vacant_house",
    "build_clear_land",
    "build_road",
    "build_plaza",
    "build_gardens",
    "build_prefecture",
    "build_engineers_post",
    "build_doctor",
    "build_granary",
    "build_warehouse",
    "build_market",
    "build_wall",
    "build_gatehouse",
    "build_reservoir",
    "build_aqueduct",
    "build_fountain",
    "show_advisor_labor",
    "show_advisor_military",
    "show_advisor_imperial",
    "show_advisor_ratings",
    "show_advisor_trade",
    "show_advisor_population",
    "show_advisor_health",
    "show_advisor_education",
    "show_advisor_entertainment",
    "show_advisor_religion",
    "show_advisor_financial",
    "show_advisor_chief",
    "show_overlay_water",
    "show_overlay_fire",
    "show_overlay_damage",
    "show_overlay_crime",
    "show_overlay_problems",
    "editor_toggle_battle_info",
    "load_file",
    "save_file",
    "go_to_bookmark_1",
    "go_to_bookmark_2",
    "go_to_bookmark_3",
    "go_to_bookmark_4",
    "set_bookmark_1",
    "set_bookmark_2",
    "set_bookmark_3",
    "set_bookmark_4",
    "center_screen",
    "toggle_fullscreen",
    "resize_to_640",
    "resize_to_800",
    "resize_to_1024",
    "save_screenshot",
    "save_city_screenshot",
    "clone_building"
];
export class unnamed83_8 {
    public default_mappings: hotkey_mapping[] = new Array(HOTKEY_MAX_ITEMS).fill(null);
    public mappings: hotkey_mapping[] = new Array(MAX_MAPPINGS).fill(null);
    public num_mappings: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.default_mappings = args[0]);
        args.length >= 2 && (this.mappings = args[1]);
        args.length >= 3 && (this.num_mappings = args[2]);
    }
}
let data: unnamed83_8 = new unnamed83_8();
function set_mapping(key: key_type, modifiers: key_modifier_type, action: hotkey_action) {
    let mapping: hotkey_mapping = data.default_mappings[action][0];
    if (mapping.key) {
        mapping = data.default_mappings[action][1];
    }
    if (mapping.key) {
        return;
    }
    mapping.key = key;
    mapping.modifiers = modifiers;
    mapping.action = action;
}
function set_layout_mapping(name: string, default_key: key_type, modifiers: key_modifier_type, action: hotkey_action) {
    let key: key_type = system_keyboard_key_for_symbol(name);
    if (key == KEY_TYPE_NONE) {
        log_info("No key found on layout for", name, 0);
        key = default_key;
    }
    set_mapping(key, modifiers, action);
}
function init_defaults() {
    for (let i = 0; i < HOTKEY_MAX_ITEMS; i++) {
        data.default_mappings[i] = [null, null];
    }
    set_mapping(KEY_TYPE_UP, KEY_MOD_NONE, HOTKEY_ARROW_UP);
    set_mapping(KEY_TYPE_DOWN, KEY_MOD_NONE, HOTKEY_ARROW_DOWN);
    set_mapping(KEY_TYPE_LEFT, KEY_MOD_NONE, HOTKEY_ARROW_LEFT);
    set_mapping(KEY_TYPE_RIGHT, KEY_MOD_NONE, HOTKEY_ARROW_RIGHT);
    set_layout_mapping("P", KEY_TYPE_P, KEY_MOD_NONE, HOTKEY_TOGGLE_PAUSE);
    set_mapping(KEY_TYPE_SPACE, KEY_MOD_NONE, HOTKEY_TOGGLE_OVERLAY);
    set_layout_mapping("L", KEY_TYPE_L, KEY_MOD_NONE, HOTKEY_CYCLE_LEGION);
    set_layout_mapping("[", KEY_TYPE_LEFTBRACKET, KEY_MOD_NONE, HOTKEY_DECREASE_GAME_SPEED);
    set_layout_mapping("]", KEY_TYPE_RIGHTBRACKET, KEY_MOD_NONE, HOTKEY_INCREASE_GAME_SPEED);
    set_mapping(KEY_TYPE_PAGEDOWN, KEY_MOD_NONE, HOTKEY_DECREASE_GAME_SPEED);
    set_mapping(KEY_TYPE_PAGEUP, KEY_MOD_NONE, HOTKEY_INCREASE_GAME_SPEED);
    set_mapping(KEY_TYPE_HOME, KEY_MOD_NONE, HOTKEY_ROTATE_MAP_LEFT);
    set_mapping(KEY_TYPE_END, KEY_MOD_NONE, HOTKEY_ROTATE_MAP_RIGHT);
    set_mapping(KEY_TYPE_1, KEY_MOD_NONE, HOTKEY_SHOW_ADVISOR_LABOR);
    set_mapping(KEY_TYPE_2, KEY_MOD_NONE, HOTKEY_SHOW_ADVISOR_MILITARY);
    set_mapping(KEY_TYPE_3, KEY_MOD_NONE, HOTKEY_SHOW_ADVISOR_IMPERIAL);
    set_mapping(KEY_TYPE_4, KEY_MOD_NONE, HOTKEY_SHOW_ADVISOR_RATINGS);
    set_mapping(KEY_TYPE_5, KEY_MOD_NONE, HOTKEY_SHOW_ADVISOR_TRADE);
    set_mapping(KEY_TYPE_6, KEY_MOD_NONE, HOTKEY_SHOW_ADVISOR_POPULATION);
    set_mapping(KEY_TYPE_7, KEY_MOD_NONE, HOTKEY_SHOW_ADVISOR_HEALTH);
    set_mapping(KEY_TYPE_8, KEY_MOD_NONE, HOTKEY_SHOW_ADVISOR_EDUCATION);
    set_mapping(KEY_TYPE_9, KEY_MOD_NONE, HOTKEY_SHOW_ADVISOR_ENTERTAINMENT);
    set_mapping(KEY_TYPE_0, KEY_MOD_NONE, HOTKEY_SHOW_ADVISOR_RELIGION);
    set_mapping(KEY_TYPE_KP_1, KEY_MOD_NONE, HOTKEY_SHOW_ADVISOR_LABOR);
    set_mapping(KEY_TYPE_KP_2, KEY_MOD_NONE, HOTKEY_SHOW_ADVISOR_MILITARY);
    set_mapping(KEY_TYPE_KP_3, KEY_MOD_NONE, HOTKEY_SHOW_ADVISOR_IMPERIAL);
    set_mapping(KEY_TYPE_KP_4, KEY_MOD_NONE, HOTKEY_SHOW_ADVISOR_RATINGS);
    set_mapping(KEY_TYPE_KP_5, KEY_MOD_NONE, HOTKEY_SHOW_ADVISOR_TRADE);
    set_mapping(KEY_TYPE_KP_6, KEY_MOD_NONE, HOTKEY_SHOW_ADVISOR_POPULATION);
    set_mapping(KEY_TYPE_KP_7, KEY_MOD_NONE, HOTKEY_SHOW_ADVISOR_HEALTH);
    set_mapping(KEY_TYPE_KP_8, KEY_MOD_NONE, HOTKEY_SHOW_ADVISOR_EDUCATION);
    set_mapping(KEY_TYPE_KP_9, KEY_MOD_NONE, HOTKEY_SHOW_ADVISOR_ENTERTAINMENT);
    set_mapping(KEY_TYPE_KP_0, KEY_MOD_NONE, HOTKEY_SHOW_ADVISOR_RELIGION);
    set_layout_mapping("-", KEY_TYPE_MINUS, KEY_MOD_NONE, HOTKEY_SHOW_ADVISOR_FINANCIAL);
    set_layout_mapping("=", KEY_TYPE_EQUALS, KEY_MOD_NONE, HOTKEY_SHOW_ADVISOR_CHIEF);
    set_layout_mapping("W", KEY_TYPE_W, KEY_MOD_NONE, HOTKEY_SHOW_OVERLAY_WATER);
    set_layout_mapping("F", KEY_TYPE_F, KEY_MOD_NONE, HOTKEY_SHOW_OVERLAY_FIRE);
    set_layout_mapping("D", KEY_TYPE_D, KEY_MOD_NONE, HOTKEY_SHOW_OVERLAY_DAMAGE);
    set_layout_mapping("C", KEY_TYPE_C, KEY_MOD_NONE, HOTKEY_SHOW_OVERLAY_CRIME);
    set_layout_mapping("T", KEY_TYPE_T, KEY_MOD_NONE, HOTKEY_SHOW_OVERLAY_PROBLEMS);
    set_layout_mapping("A", KEY_TYPE_A, KEY_MOD_CTRL, HOTKEY_EDITOR_TOGGLE_BATTLE_INFO);
    set_layout_mapping("O", KEY_TYPE_O, KEY_MOD_CTRL, HOTKEY_LOAD_FILE);
    set_layout_mapping("S", KEY_TYPE_S, KEY_MOD_CTRL, HOTKEY_SAVE_FILE);
    set_mapping(KEY_TYPE_F1, KEY_MOD_NONE, HOTKEY_GO_TO_BOOKMARK_1);
    set_mapping(KEY_TYPE_F2, KEY_MOD_NONE, HOTKEY_GO_TO_BOOKMARK_2);
    set_mapping(KEY_TYPE_F3, KEY_MOD_NONE, HOTKEY_GO_TO_BOOKMARK_3);
    set_mapping(KEY_TYPE_F4, KEY_MOD_NONE, HOTKEY_GO_TO_BOOKMARK_4);
    set_mapping(KEY_TYPE_F1, KEY_MOD_CTRL, HOTKEY_SET_BOOKMARK_1);
    set_mapping(KEY_TYPE_F2, KEY_MOD_CTRL, HOTKEY_SET_BOOKMARK_2);
    set_mapping(KEY_TYPE_F3, KEY_MOD_CTRL, HOTKEY_SET_BOOKMARK_3);
    set_mapping(KEY_TYPE_F4, KEY_MOD_CTRL, HOTKEY_SET_BOOKMARK_4);
    set_mapping(KEY_TYPE_F1, KEY_MOD_ALT, HOTKEY_SET_BOOKMARK_1);
    set_mapping(KEY_TYPE_F2, KEY_MOD_ALT, HOTKEY_SET_BOOKMARK_2);
    set_mapping(KEY_TYPE_F3, KEY_MOD_ALT, HOTKEY_SET_BOOKMARK_3);
    set_mapping(KEY_TYPE_F4, KEY_MOD_ALT, HOTKEY_SET_BOOKMARK_4);
    set_mapping(KEY_TYPE_F5, KEY_MOD_NONE, HOTKEY_CENTER_WINDOW);
    set_mapping(KEY_TYPE_F6, KEY_MOD_NONE, HOTKEY_TOGGLE_FULLSCREEN);
    set_mapping(KEY_TYPE_ENTER, KEY_MOD_ALT, HOTKEY_TOGGLE_FULLSCREEN);
    set_mapping(KEY_TYPE_F7, KEY_MOD_NONE, HOTKEY_RESIZE_TO_640);
    set_mapping(KEY_TYPE_F8, KEY_MOD_NONE, HOTKEY_RESIZE_TO_800);
    set_mapping(KEY_TYPE_F9, KEY_MOD_NONE, HOTKEY_RESIZE_TO_1024);
    set_mapping(KEY_TYPE_F12, KEY_MOD_NONE, HOTKEY_SAVE_SCREENSHOT);
    set_mapping(KEY_TYPE_F12, KEY_MOD_ALT, HOTKEY_SAVE_SCREENSHOT);
    set_mapping(KEY_TYPE_F12, KEY_MOD_CTRL, HOTKEY_SAVE_CITY_SCREENSHOT);
}
export function hotkey_for_action(action: hotkey_action, index: number) {
    let num: number = 0;
    for (let i: number = 0; i < data.num_mappings; i++) {
        if (data.mappings[i].action == action) {
            if (num == index) {
                return data.mappings[i];
            }
            num++;
        }
    }
    return 0;
}
export function hotkey_default_for_action(action: hotkey_action, index: number) {
    if (index < 0 || index >= 2 || action < 0 || action >= HOTKEY_MAX_ITEMS) {
        return null;
    }
    return data.default_mappings[action][index];
}
export function hotkey_config_clear() {
    data.num_mappings = 0;
}
export function hotkey_config_add_mapping(mapping: hotkey_mapping) {
    if (data.num_mappings < MAX_MAPPINGS) {
        data.mappings[data.num_mappings] = mapping;
        data.num_mappings++;
    }
}
function load_defaults() {
    hotkey_config_clear();
    for (let action: number = 0; action < HOTKEY_MAX_ITEMS; action++) {
        for (let index: number = 0; index < 2; index++) {
            if (data.default_mappings[action][index].key) {
                hotkey_config_add_mapping(data.default_mappings[action][index]);
            }
        }
    }
}
function load_file() {
    hotkey_config_clear();
    let fp: any = file_open(INI_FILENAME, "rt");
    if (!fp) {
        return;
    }
    // Stub for file reading - needs implementation
    file_close(fp);
}
export function hotkey_config_load() {
    init_defaults();
    load_file();
    if (data.num_mappings == 0) {
        load_defaults();
    }
    hotkey_install_mapping(data.mappings, data.num_mappings);
}
export function hotkey_config_save() {
    hotkey_install_mapping(data.mappings, data.num_mappings);
    let fp: any = file_open(INI_FILENAME, "wt");
    if (!fp) {
        log_error("Unable to write hotkey configuration file", INI_FILENAME, 0);
        return;
    }
    // Stub for file writing - needs implementation
    file_close(fp);
}
