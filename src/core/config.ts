export const CONFIG_STRING_VALUE_MAX = 64;
export const MAX_LINE = 100;
export const enum config_key {
    CONFIG_GP_FIX_IMMIGRATION_BUG,
    CONFIG_GP_FIX_100_YEAR_GHOSTS,
    CONFIG_SCREEN_DISPLAY_SCALE,
    CONFIG_SCREEN_CURSOR_SCALE,
    CONFIG_UI_SIDEBAR_INFO,
    CONFIG_UI_SHOW_INTRO_VIDEO,
    CONFIG_UI_SMOOTH_SCROLLING,
    CONFIG_UI_DISABLE_MOUSE_EDGE_SCROLLING,
    CONFIG_UI_DISABLE_RIGHT_CLICK_MAP_DRAG,
    CONFIG_UI_VISUAL_FEEDBACK_ON_DELETE,
    CONFIG_UI_ALLOW_CYCLING_TEMPLES,
    CONFIG_UI_SHOW_WATER_STRUCTURE_RANGE,
    CONFIG_UI_SHOW_CONSTRUCTION_SIZE,
    CONFIG_UI_HIGHLIGHT_LEGIONS,
    CONFIG_UI_SHOW_MILITARY_SIDEBAR,
    CONFIG_UI_SHOW_SPEEDRUN_INFO,
    CONFIG_MAX_ENTRIES
};

export const enum config_string_key {
    CONFIG_STRING_UI_LANGUAGE_DIR,
    CONFIG_STRING_MAX_ENTRIES
};
import { strncpy } from '../../ext/crt';
import CONFIG_SCREEN_DISPLAY_SCALE = config_key.CONFIG_SCREEN_DISPLAY_SCALE;
import CONFIG_SCREEN_CURSOR_SCALE = config_key.CONFIG_SCREEN_CURSOR_SCALE;
import CONFIG_MAX_ENTRIES = config_key.CONFIG_MAX_ENTRIES;
import CONFIG_STRING_UI_LANGUAGE_DIR = config_string_key.CONFIG_STRING_UI_LANGUAGE_DIR;
import CONFIG_STRING_MAX_ENTRIES = config_string_key.CONFIG_STRING_MAX_ENTRIES;
import { file_close, file_open } from 'core/file';
import { log_error, log_info } from 'core/log';
import { fgets, fprintf } from './stdio';
let INI_FILENAME: string = "julius.ini";
let ini_keys: string[] = [
    "gameplay_fix_immigration",
    "gameplay_fix_100y_ghosts",
    "screen_display_scale",
    "screen_cursor_scale",
    "ui_sidebar_info",
    "ui_show_intro_video",
    "ui_smooth_scrolling",
    "ui_disable_mouse_edge_scrolling",
    "ui_disable_map_drag",
    "ui_visual_feedback_on_delete",
    "ui_allow_cycling_temples",
    "ui_show_water_structure_range",
    "ui_show_construction_size",
    "ui_highlight_legions",
    "ui_show_military_sidebar",
    "ui_show_speedrun_info"
];
let ini_string_keys: string[] = [
    "ui_language_dir"
];
let values: number[] = new Array(CONFIG_MAX_ENTRIES).fill(0);
let string_values: Uint8Array[] = new Array(CONFIG_STRING_MAX_ENTRIES);
let default_values: number[] = new Array(CONFIG_MAX_ENTRIES).fill(0);
default_values[CONFIG_SCREEN_DISPLAY_SCALE] = 100;
default_values[CONFIG_SCREEN_CURSOR_SCALE] = 100;
let default_string_values: Uint8Array[] = new Array(CONFIG_STRING_MAX_ENTRIES);
export function config_get(key: config_key) {
    return values[key];
}
export function config_set(key: config_key, value: number) {
    values[key] = value;
}
export function config_get_string(key: config_string_key) {
    return string_values[key];
}
export function config_set_string(key: config_string_key, value: char) {
    if (!value) {
        string_values[key][0] = 0;
    } else {
        strncpy(string_values[key], value, CONFIG_STRING_VALUE_MAX - 1);
    }
}
export function config_get_default_value(key: config_key) {
    return default_values[key];
}
export function config_get_default_string_value(key: config_string_key) {
    return default_string_values[key];
}
function set_defaults() {
    for (let i: number = 0; i < CONFIG_MAX_ENTRIES; ++i) {
        values[i] = default_values[i];
    }
    strncpy(string_values[CONFIG_STRING_UI_LANGUAGE_DIR],
        default_string_values[CONFIG_STRING_UI_LANGUAGE_DIR], CONFIG_STRING_VALUE_MAX);
}
export function config_load() {
    set_defaults();
    let fp: FILE = file_open(INI_FILENAME, "rt");
    if (!fp) {
        return;
    }
    let line_buffer: Uint8Array = new Uint8Array(MAX_LINE);
    let line: string;
    while ((line = fgets(line_buffer, MAX_LINE, fp))) {
        // Remove newline from string
        let size: number = line.length;
        while (size > 0 && (line[size - 1] == '\n' || line[size - 1] == '\r')) {
            line = line.substring(0, --size);
        }
        let equalsIndex: number = line.indexOf('=');
        if (equalsIndex >= 0) {
            let key: string = line.substring(0, equalsIndex);
            let valueStr: string = line.substring(equalsIndex + 1);
            for (let i: number = 0; i < CONFIG_MAX_ENTRIES; i++) {
                if (ini_keys[i] == key) {
                    let value: number = parseInt(valueStr);
                    log_info("Config key", ini_keys[i], value);
                    values[i] = value;
                    break;
                }
            }
            for (let i: number = 0; i < CONFIG_STRING_MAX_ENTRIES; i++) {
                if (ini_string_keys[i] == key) {
                    log_info("Config key", ini_string_keys[i], 0);
                    log_info("Config value", valueStr, 0);
                    // strncpy equivalent
                    let encoder = new TextEncoder();
                    string_values[i] = encoder.encode(valueStr.substring(0, CONFIG_STRING_VALUE_MAX - 1));
                    break;
                }
            }
        }
    }
    file_close(fp);
}
export function config_save() {
    let fp: FILE = file_open(INI_FILENAME, "wt");
    if (!fp) {
        log_error("Unable to write configuration file", INI_FILENAME, 0);
        return;
    }
    for (let i: number = 0; i < CONFIG_MAX_ENTRIES; i++) {
        fprintf(fp, "%s=%d\n", ini_keys[i], values[i]);
    }
    for (let i: number = 0; i < CONFIG_STRING_MAX_ENTRIES; i++) {
        fprintf(fp, "%s=%s\n", ini_string_keys[i], string_values[i]);
    }
    file_close(fp);
}
