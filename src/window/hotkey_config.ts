export const NUM_VISIBLE_OPTIONS = 14;
export const HOTKEY_HEADER = 1;
export const TR_NONE = 1;
export const GROUP_BUILDINGS = 28;
export const HOTKEY_X_OFFSET_1 = 290;
export const HOTKEY_BTN_WIDTH = 140;
export const HOTKEY_BTN_HEIGHT = 22;
export const HOTKEY_X_OFFSET_2 = 430;
export const NUM_BOTTOM_BUTTONS = 3;
import { building_type } from 'building/type';
import { hotkey_action, hotkey_config_add_mapping, hotkey_config_clear, hotkey_config_save, hotkey_default_for_action, hotkey_for_action, hotkey_mapping } from 'core/hotkey_config';
import { image_group } from 'core/image';
import { group_terrain } from 'core/image_group';
import { lang_get_string } from 'core/lang';
import { button_border_draw, button_none } from 'graphics/button';
import { font_t } from 'graphics/font';
import { generic_button, generic_buttons_handle_mouse } from 'graphics/generic_button';
import { graphics_clear_screen, graphics_in_dialog, graphics_reset_clip_rectangle, graphics_reset_dialog, graphics_set_clip_rectangle } from 'graphics/graphics';
import { image_draw_fullscreen_background } from 'graphics/image';
import { lang_text_draw } from 'graphics/lang_text';
import { inner_panel_draw, outer_panel_draw } from 'graphics/panel';
import { scrollbar_draw, scrollbar_handle_mouse, scrollbar_init, scrollbar_type } from 'graphics/scrollbar';
import { text_draw, text_draw_centered } from 'graphics/text';
import { window_go_back, window_id, window_invalidate, window_show, window_type } from 'graphics/window';
import { hotkeys } from 'input/hotkey';
import { key_combination_display_name, key_modifier_type, key_type } from 'input/keys';
import { mouse, mouse_in_dialog } from 'input/mouse';
import { translation_for, translation_key } from 'translation/translation';
import { window_config_show } from 'window/config';
import { window_hotkey_editor_show } from 'window/hotkey_editor';
import { window_plain_message_dialog_show_with_extra } from 'window/plain_message_dialog';
import { Ref } from '../../ext/crt';
import BUILDING_ROAD = building_type.BUILDING_ROAD;
import BUILDING_WALL = building_type.BUILDING_WALL;
import BUILDING_AQUEDUCT = building_type.BUILDING_AQUEDUCT;
import BUILDING_PLAZA = building_type.BUILDING_PLAZA;
import BUILDING_GARDENS = building_type.BUILDING_GARDENS;
import BUILDING_DOCTOR = building_type.BUILDING_DOCTOR;
import BUILDING_PREFECTURE = building_type.BUILDING_PREFECTURE;
import BUILDING_GATEHOUSE = building_type.BUILDING_GATEHOUSE;
import BUILDING_MARKET = building_type.BUILDING_MARKET;
import BUILDING_GRANARY = building_type.BUILDING_GRANARY;
import BUILDING_WAREHOUSE = building_type.BUILDING_WAREHOUSE;
import BUILDING_ENGINEERS_POST = building_type.BUILDING_ENGINEERS_POST;
import BUILDING_RESERVOIR = building_type.BUILDING_RESERVOIR;
import BUILDING_FOUNTAIN = building_type.BUILDING_FOUNTAIN;;
import KEY_TYPE_NONE = key_type.KEY_TYPE_NONE;
import KEY_MOD_NONE = key_modifier_type.KEY_MOD_NONE;
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
import HOTKEY_BUILD_CLEAR_LAND = hotkey_action.HOTKEY_BUILD_CLEAR_LAND;
import HOTKEY_BUILD_VACANT_HOUSE = hotkey_action.HOTKEY_BUILD_VACANT_HOUSE;
import HOTKEY_BUILD_ROAD = hotkey_action.HOTKEY_BUILD_ROAD;
import HOTKEY_BUILD_PLAZA = hotkey_action.HOTKEY_BUILD_PLAZA;
import HOTKEY_BUILD_GARDENS = hotkey_action.HOTKEY_BUILD_GARDENS;
import HOTKEY_BUILD_PREFECTURE = hotkey_action.HOTKEY_BUILD_PREFECTURE;
import HOTKEY_BUILD_ENGINEERS_POST = hotkey_action.HOTKEY_BUILD_ENGINEERS_POST;
import HOTKEY_BUILD_DOCTOR = hotkey_action.HOTKEY_BUILD_DOCTOR;
import HOTKEY_BUILD_GRANARY = hotkey_action.HOTKEY_BUILD_GRANARY;
import HOTKEY_BUILD_WAREHOUSE = hotkey_action.HOTKEY_BUILD_WAREHOUSE;
import HOTKEY_BUILD_MARKET = hotkey_action.HOTKEY_BUILD_MARKET;
import HOTKEY_BUILD_WALL = hotkey_action.HOTKEY_BUILD_WALL;
import HOTKEY_BUILD_GATEHOUSE = hotkey_action.HOTKEY_BUILD_GATEHOUSE;
import HOTKEY_BUILD_RESERVOIR = hotkey_action.HOTKEY_BUILD_RESERVOIR;
import HOTKEY_BUILD_AQUEDUCT = hotkey_action.HOTKEY_BUILD_AQUEDUCT;
import HOTKEY_BUILD_FOUNTAIN = hotkey_action.HOTKEY_BUILD_FOUNTAIN;
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
import HOTKEY_BUILD_CLONE = hotkey_action.HOTKEY_BUILD_CLONE;
import HOTKEY_MAX_ITEMS = hotkey_action.HOTKEY_MAX_ITEMS;
import GROUP_CONFIG = group_terrain.GROUP_CONFIG;
import FONT_NORMAL_BLACK = font_t.FONT_NORMAL_BLACK;
import FONT_NORMAL_WHITE = font_t.FONT_NORMAL_WHITE;
import FONT_LARGE_BLACK = font_t.FONT_LARGE_BLACK;
import FONT_NORMAL_GREEN = font_t.FONT_NORMAL_GREEN;
import WINDOW_HOTKEY_CONFIG = window_id.WINDOW_HOTKEY_CONFIG;
import TR_BUTTON_OK = translation_key.TR_BUTTON_OK;
import TR_BUTTON_CANCEL = translation_key.TR_BUTTON_CANCEL;
import TR_BUTTON_RESET_DEFAULTS = translation_key.TR_BUTTON_RESET_DEFAULTS;
import TR_HOTKEY_TITLE = translation_key.TR_HOTKEY_TITLE;
import TR_HOTKEY_LABEL = translation_key.TR_HOTKEY_LABEL;
import TR_HOTKEY_ALTERNATIVE_LABEL = translation_key.TR_HOTKEY_ALTERNATIVE_LABEL;
import TR_HOTKEY_HEADER_ARROWS = translation_key.TR_HOTKEY_HEADER_ARROWS;
import TR_HOTKEY_HEADER_GLOBAL = translation_key.TR_HOTKEY_HEADER_GLOBAL;
import TR_HOTKEY_HEADER_CITY = translation_key.TR_HOTKEY_HEADER_CITY;
import TR_HOTKEY_HEADER_ADVISORS = translation_key.TR_HOTKEY_HEADER_ADVISORS;
import TR_HOTKEY_HEADER_OVERLAYS = translation_key.TR_HOTKEY_HEADER_OVERLAYS;
import TR_HOTKEY_HEADER_BOOKMARKS = translation_key.TR_HOTKEY_HEADER_BOOKMARKS;
import TR_HOTKEY_HEADER_EDITOR = translation_key.TR_HOTKEY_HEADER_EDITOR;
import TR_HOTKEY_HEADER_BUILD = translation_key.TR_HOTKEY_HEADER_BUILD;
import TR_HOTKEY_ARROW_UP = translation_key.TR_HOTKEY_ARROW_UP;
import TR_HOTKEY_ARROW_DOWN = translation_key.TR_HOTKEY_ARROW_DOWN;
import TR_HOTKEY_ARROW_LEFT = translation_key.TR_HOTKEY_ARROW_LEFT;
import TR_HOTKEY_ARROW_RIGHT = translation_key.TR_HOTKEY_ARROW_RIGHT;
import TR_HOTKEY_TOGGLE_FULLSCREEN = translation_key.TR_HOTKEY_TOGGLE_FULLSCREEN;
import TR_HOTKEY_CENTER_WINDOW = translation_key.TR_HOTKEY_CENTER_WINDOW;
import TR_HOTKEY_RESIZE_TO_640 = translation_key.TR_HOTKEY_RESIZE_TO_640;
import TR_HOTKEY_RESIZE_TO_800 = translation_key.TR_HOTKEY_RESIZE_TO_800;
import TR_HOTKEY_RESIZE_TO_1024 = translation_key.TR_HOTKEY_RESIZE_TO_1024;
import TR_HOTKEY_SAVE_SCREENSHOT = translation_key.TR_HOTKEY_SAVE_SCREENSHOT;
import TR_HOTKEY_SAVE_CITY_SCREENSHOT = translation_key.TR_HOTKEY_SAVE_CITY_SCREENSHOT;
import TR_HOTKEY_BUILD_CLONE = translation_key.TR_HOTKEY_BUILD_CLONE;
import TR_HOTKEY_LOAD_FILE = translation_key.TR_HOTKEY_LOAD_FILE;
import TR_HOTKEY_SAVE_FILE = translation_key.TR_HOTKEY_SAVE_FILE;
import TR_HOTKEY_INCREASE_GAME_SPEED = translation_key.TR_HOTKEY_INCREASE_GAME_SPEED;
import TR_HOTKEY_DECREASE_GAME_SPEED = translation_key.TR_HOTKEY_DECREASE_GAME_SPEED;
import TR_HOTKEY_TOGGLE_PAUSE = translation_key.TR_HOTKEY_TOGGLE_PAUSE;
import TR_HOTKEY_CYCLE_LEGION = translation_key.TR_HOTKEY_CYCLE_LEGION;
import TR_HOTKEY_ROTATE_MAP_LEFT = translation_key.TR_HOTKEY_ROTATE_MAP_LEFT;
import TR_HOTKEY_ROTATE_MAP_RIGHT = translation_key.TR_HOTKEY_ROTATE_MAP_RIGHT;
import TR_HOTKEY_SHOW_ADVISOR_LABOR = translation_key.TR_HOTKEY_SHOW_ADVISOR_LABOR;
import TR_HOTKEY_SHOW_ADVISOR_MILITARY = translation_key.TR_HOTKEY_SHOW_ADVISOR_MILITARY;
import TR_HOTKEY_SHOW_ADVISOR_IMPERIAL = translation_key.TR_HOTKEY_SHOW_ADVISOR_IMPERIAL;
import TR_HOTKEY_SHOW_ADVISOR_RATINGS = translation_key.TR_HOTKEY_SHOW_ADVISOR_RATINGS;
import TR_HOTKEY_SHOW_ADVISOR_TRADE = translation_key.TR_HOTKEY_SHOW_ADVISOR_TRADE;
import TR_HOTKEY_SHOW_ADVISOR_POPULATION = translation_key.TR_HOTKEY_SHOW_ADVISOR_POPULATION;
import TR_HOTKEY_SHOW_ADVISOR_HEALTH = translation_key.TR_HOTKEY_SHOW_ADVISOR_HEALTH;
import TR_HOTKEY_SHOW_ADVISOR_EDUCATION = translation_key.TR_HOTKEY_SHOW_ADVISOR_EDUCATION;
import TR_HOTKEY_SHOW_ADVISOR_ENTERTAINMENT = translation_key.TR_HOTKEY_SHOW_ADVISOR_ENTERTAINMENT;
import TR_HOTKEY_SHOW_ADVISOR_RELIGION = translation_key.TR_HOTKEY_SHOW_ADVISOR_RELIGION;
import TR_HOTKEY_SHOW_ADVISOR_FINANCIAL = translation_key.TR_HOTKEY_SHOW_ADVISOR_FINANCIAL;
import TR_HOTKEY_SHOW_ADVISOR_CHIEF = translation_key.TR_HOTKEY_SHOW_ADVISOR_CHIEF;
import TR_HOTKEY_TOGGLE_OVERLAY = translation_key.TR_HOTKEY_TOGGLE_OVERLAY;
import TR_HOTKEY_SHOW_OVERLAY_WATER = translation_key.TR_HOTKEY_SHOW_OVERLAY_WATER;
import TR_HOTKEY_SHOW_OVERLAY_FIRE = translation_key.TR_HOTKEY_SHOW_OVERLAY_FIRE;
import TR_HOTKEY_SHOW_OVERLAY_DAMAGE = translation_key.TR_HOTKEY_SHOW_OVERLAY_DAMAGE;
import TR_HOTKEY_SHOW_OVERLAY_CRIME = translation_key.TR_HOTKEY_SHOW_OVERLAY_CRIME;
import TR_HOTKEY_SHOW_OVERLAY_PROBLEMS = translation_key.TR_HOTKEY_SHOW_OVERLAY_PROBLEMS;
import TR_HOTKEY_GO_TO_BOOKMARK_1 = translation_key.TR_HOTKEY_GO_TO_BOOKMARK_1;
import TR_HOTKEY_GO_TO_BOOKMARK_2 = translation_key.TR_HOTKEY_GO_TO_BOOKMARK_2;
import TR_HOTKEY_GO_TO_BOOKMARK_3 = translation_key.TR_HOTKEY_GO_TO_BOOKMARK_3;
import TR_HOTKEY_GO_TO_BOOKMARK_4 = translation_key.TR_HOTKEY_GO_TO_BOOKMARK_4;
import TR_HOTKEY_SET_BOOKMARK_1 = translation_key.TR_HOTKEY_SET_BOOKMARK_1;
import TR_HOTKEY_SET_BOOKMARK_2 = translation_key.TR_HOTKEY_SET_BOOKMARK_2;
import TR_HOTKEY_SET_BOOKMARK_3 = translation_key.TR_HOTKEY_SET_BOOKMARK_3;
import TR_HOTKEY_SET_BOOKMARK_4 = translation_key.TR_HOTKEY_SET_BOOKMARK_4;
import TR_HOTKEY_EDITOR_TOGGLE_BATTLE_INFO = translation_key.TR_HOTKEY_EDITOR_TOGGLE_BATTLE_INFO;
import TR_HOTKEY_DUPLICATE_TITLE = translation_key.TR_HOTKEY_DUPLICATE_TITLE;
import TR_HOTKEY_DUPLICATE_MESSAGE = translation_key.TR_HOTKEY_DUPLICATE_MESSAGE;
let scrollbar: scrollbar_type = new scrollbar_type(580, 72, 352, 560, NUM_VISIBLE_OPTIONS, on_scroll, 1);
export class hotkey_widget {
    public action: number = 0;
    public name_translation: number = 0;
    public name_text_group: number = 0;
    public name_text_id: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.action = args[0]);
        args.length >= 2 && (this.name_translation = args[1]);
        args.length >= 3 && (this.name_text_group = args[2]);
        args.length >= 4 && (this.name_text_id = args[3]);
    }
}
let hotkey_widgets: hotkey_widget[] = [
    new hotkey_widget(HOTKEY_HEADER, TR_HOTKEY_HEADER_ARROWS),
    new hotkey_widget(HOTKEY_ARROW_UP, TR_HOTKEY_ARROW_UP),
    new hotkey_widget(HOTKEY_ARROW_DOWN, TR_HOTKEY_ARROW_DOWN),
    new hotkey_widget(HOTKEY_ARROW_LEFT, TR_HOTKEY_ARROW_LEFT),
    new hotkey_widget(HOTKEY_ARROW_RIGHT, TR_HOTKEY_ARROW_RIGHT),
    new hotkey_widget(HOTKEY_HEADER, TR_HOTKEY_HEADER_GLOBAL),
    new hotkey_widget(HOTKEY_TOGGLE_FULLSCREEN, TR_HOTKEY_TOGGLE_FULLSCREEN),
    new hotkey_widget(HOTKEY_CENTER_WINDOW, TR_HOTKEY_CENTER_WINDOW),
    new hotkey_widget(HOTKEY_RESIZE_TO_640, TR_HOTKEY_RESIZE_TO_640),
    new hotkey_widget(HOTKEY_RESIZE_TO_800, TR_HOTKEY_RESIZE_TO_800),
    new hotkey_widget(HOTKEY_RESIZE_TO_1024, TR_HOTKEY_RESIZE_TO_1024),
    new hotkey_widget(HOTKEY_SAVE_SCREENSHOT, TR_HOTKEY_SAVE_SCREENSHOT),
    new hotkey_widget(HOTKEY_SAVE_CITY_SCREENSHOT, TR_HOTKEY_SAVE_CITY_SCREENSHOT),
    new hotkey_widget(HOTKEY_LOAD_FILE, TR_HOTKEY_LOAD_FILE),
    new hotkey_widget(HOTKEY_SAVE_FILE, TR_HOTKEY_SAVE_FILE),
    new hotkey_widget(HOTKEY_HEADER, TR_HOTKEY_HEADER_CITY),
    new hotkey_widget(HOTKEY_INCREASE_GAME_SPEED, TR_HOTKEY_INCREASE_GAME_SPEED),
    new hotkey_widget(HOTKEY_DECREASE_GAME_SPEED, TR_HOTKEY_DECREASE_GAME_SPEED),
    new hotkey_widget(HOTKEY_TOGGLE_PAUSE, TR_HOTKEY_TOGGLE_PAUSE),
    new hotkey_widget(HOTKEY_CYCLE_LEGION, TR_HOTKEY_CYCLE_LEGION),
    new hotkey_widget(HOTKEY_ROTATE_MAP_LEFT, TR_HOTKEY_ROTATE_MAP_LEFT),
    new hotkey_widget(HOTKEY_ROTATE_MAP_RIGHT, TR_HOTKEY_ROTATE_MAP_RIGHT),
    new hotkey_widget(HOTKEY_HEADER, TR_HOTKEY_HEADER_BUILD),
    new hotkey_widget(HOTKEY_BUILD_CLONE, TR_HOTKEY_BUILD_CLONE),
    new hotkey_widget(HOTKEY_BUILD_CLEAR_LAND, TR_NONE, 68, 21),
    new hotkey_widget(HOTKEY_BUILD_VACANT_HOUSE, TR_NONE, 67, 7),
    new hotkey_widget(HOTKEY_BUILD_ROAD, TR_NONE, GROUP_BUILDINGS, BUILDING_ROAD),
    new hotkey_widget(HOTKEY_BUILD_PLAZA, TR_NONE, GROUP_BUILDINGS, BUILDING_PLAZA),
    new hotkey_widget(HOTKEY_BUILD_GARDENS, TR_NONE, GROUP_BUILDINGS, BUILDING_GARDENS),
    new hotkey_widget(HOTKEY_BUILD_PREFECTURE, TR_NONE, GROUP_BUILDINGS, BUILDING_PREFECTURE),
    new hotkey_widget(HOTKEY_BUILD_ENGINEERS_POST, TR_NONE, GROUP_BUILDINGS, BUILDING_ENGINEERS_POST),
    new hotkey_widget(HOTKEY_BUILD_DOCTOR, TR_NONE, GROUP_BUILDINGS, BUILDING_DOCTOR),
    new hotkey_widget(HOTKEY_BUILD_GRANARY, TR_NONE, GROUP_BUILDINGS, BUILDING_GRANARY),
    new hotkey_widget(HOTKEY_BUILD_WAREHOUSE, TR_NONE, GROUP_BUILDINGS, BUILDING_WAREHOUSE),
    new hotkey_widget(HOTKEY_BUILD_MARKET, TR_NONE, GROUP_BUILDINGS, BUILDING_MARKET),
    new hotkey_widget(HOTKEY_BUILD_WALL, TR_NONE, GROUP_BUILDINGS, BUILDING_WALL),
    new hotkey_widget(HOTKEY_BUILD_GATEHOUSE, TR_NONE, GROUP_BUILDINGS, BUILDING_GATEHOUSE),
    new hotkey_widget(HOTKEY_BUILD_RESERVOIR, TR_NONE, GROUP_BUILDINGS, BUILDING_RESERVOIR),
    new hotkey_widget(HOTKEY_BUILD_AQUEDUCT, TR_NONE, GROUP_BUILDINGS, BUILDING_AQUEDUCT),
    new hotkey_widget(HOTKEY_BUILD_FOUNTAIN, TR_NONE, GROUP_BUILDINGS, BUILDING_FOUNTAIN),
    new hotkey_widget(HOTKEY_HEADER, TR_HOTKEY_HEADER_ADVISORS),
    new hotkey_widget(HOTKEY_SHOW_ADVISOR_LABOR, TR_HOTKEY_SHOW_ADVISOR_LABOR),
    new hotkey_widget(HOTKEY_SHOW_ADVISOR_MILITARY, TR_HOTKEY_SHOW_ADVISOR_MILITARY),
    new hotkey_widget(HOTKEY_SHOW_ADVISOR_IMPERIAL, TR_HOTKEY_SHOW_ADVISOR_IMPERIAL),
    new hotkey_widget(HOTKEY_SHOW_ADVISOR_RATINGS, TR_HOTKEY_SHOW_ADVISOR_RATINGS),
    new hotkey_widget(HOTKEY_SHOW_ADVISOR_TRADE, TR_HOTKEY_SHOW_ADVISOR_TRADE),
    new hotkey_widget(HOTKEY_SHOW_ADVISOR_POPULATION, TR_HOTKEY_SHOW_ADVISOR_POPULATION),
    new hotkey_widget(HOTKEY_SHOW_ADVISOR_HEALTH, TR_HOTKEY_SHOW_ADVISOR_HEALTH),
    new hotkey_widget(HOTKEY_SHOW_ADVISOR_EDUCATION, TR_HOTKEY_SHOW_ADVISOR_EDUCATION),
    new hotkey_widget(HOTKEY_SHOW_ADVISOR_ENTERTAINMENT, TR_HOTKEY_SHOW_ADVISOR_ENTERTAINMENT),
    new hotkey_widget(HOTKEY_SHOW_ADVISOR_RELIGION, TR_HOTKEY_SHOW_ADVISOR_RELIGION),
    new hotkey_widget(HOTKEY_SHOW_ADVISOR_FINANCIAL, TR_HOTKEY_SHOW_ADVISOR_FINANCIAL),
    new hotkey_widget(HOTKEY_SHOW_ADVISOR_CHIEF, TR_HOTKEY_SHOW_ADVISOR_CHIEF),
    new hotkey_widget(HOTKEY_HEADER, TR_HOTKEY_HEADER_OVERLAYS),
    new hotkey_widget(HOTKEY_TOGGLE_OVERLAY, TR_HOTKEY_TOGGLE_OVERLAY),
    new hotkey_widget(HOTKEY_SHOW_OVERLAY_WATER, TR_HOTKEY_SHOW_OVERLAY_WATER),
    new hotkey_widget(HOTKEY_SHOW_OVERLAY_FIRE, TR_HOTKEY_SHOW_OVERLAY_FIRE),
    new hotkey_widget(HOTKEY_SHOW_OVERLAY_DAMAGE, TR_HOTKEY_SHOW_OVERLAY_DAMAGE),
    new hotkey_widget(HOTKEY_SHOW_OVERLAY_CRIME, TR_HOTKEY_SHOW_OVERLAY_CRIME),
    new hotkey_widget(HOTKEY_SHOW_OVERLAY_PROBLEMS, TR_HOTKEY_SHOW_OVERLAY_PROBLEMS),
    new hotkey_widget(HOTKEY_HEADER, TR_HOTKEY_HEADER_BOOKMARKS),
    new hotkey_widget(HOTKEY_GO_TO_BOOKMARK_1, TR_HOTKEY_GO_TO_BOOKMARK_1),
    new hotkey_widget(HOTKEY_GO_TO_BOOKMARK_2, TR_HOTKEY_GO_TO_BOOKMARK_2),
    new hotkey_widget(HOTKEY_GO_TO_BOOKMARK_3, TR_HOTKEY_GO_TO_BOOKMARK_3),
    new hotkey_widget(HOTKEY_GO_TO_BOOKMARK_4, TR_HOTKEY_GO_TO_BOOKMARK_4),
    new hotkey_widget(HOTKEY_SET_BOOKMARK_1, TR_HOTKEY_SET_BOOKMARK_1),
    new hotkey_widget(HOTKEY_SET_BOOKMARK_2, TR_HOTKEY_SET_BOOKMARK_2),
    new hotkey_widget(HOTKEY_SET_BOOKMARK_3, TR_HOTKEY_SET_BOOKMARK_3),
    new hotkey_widget(HOTKEY_SET_BOOKMARK_4, TR_HOTKEY_SET_BOOKMARK_4),
    new hotkey_widget(HOTKEY_HEADER, TR_HOTKEY_HEADER_EDITOR),
    new hotkey_widget(HOTKEY_EDITOR_TOGGLE_BATTLE_INFO, TR_HOTKEY_EDITOR_TOGGLE_BATTLE_INFO),
];
let hotkey_buttons: generic_button[] = [
    new generic_button(HOTKEY_X_OFFSET_1, 80 + 24 * 0, HOTKEY_BTN_WIDTH, HOTKEY_BTN_HEIGHT, button_hotkey, button_none, 0, 0),
    new generic_button(HOTKEY_X_OFFSET_2, 80 + 24 * 0, HOTKEY_BTN_WIDTH, HOTKEY_BTN_HEIGHT, button_hotkey, button_none, 0, 1),
    new generic_button(HOTKEY_X_OFFSET_1, 80 + 24 * 1, HOTKEY_BTN_WIDTH, HOTKEY_BTN_HEIGHT, button_hotkey, button_none, 1, 0),
    new generic_button(HOTKEY_X_OFFSET_2, 80 + 24 * 1, HOTKEY_BTN_WIDTH, HOTKEY_BTN_HEIGHT, button_hotkey, button_none, 1, 1),
    new generic_button(HOTKEY_X_OFFSET_1, 80 + 24 * 2, HOTKEY_BTN_WIDTH, HOTKEY_BTN_HEIGHT, button_hotkey, button_none, 2, 0),
    new generic_button(HOTKEY_X_OFFSET_2, 80 + 24 * 2, HOTKEY_BTN_WIDTH, HOTKEY_BTN_HEIGHT, button_hotkey, button_none, 2, 1),
    new generic_button(HOTKEY_X_OFFSET_1, 80 + 24 * 3, HOTKEY_BTN_WIDTH, HOTKEY_BTN_HEIGHT, button_hotkey, button_none, 3, 0),
    new generic_button(HOTKEY_X_OFFSET_2, 80 + 24 * 3, HOTKEY_BTN_WIDTH, HOTKEY_BTN_HEIGHT, button_hotkey, button_none, 3, 1),
    new generic_button(HOTKEY_X_OFFSET_1, 80 + 24 * 4, HOTKEY_BTN_WIDTH, HOTKEY_BTN_HEIGHT, button_hotkey, button_none, 4, 0),
    new generic_button(HOTKEY_X_OFFSET_2, 80 + 24 * 4, HOTKEY_BTN_WIDTH, HOTKEY_BTN_HEIGHT, button_hotkey, button_none, 4, 1),
    new generic_button(HOTKEY_X_OFFSET_1, 80 + 24 * 5, HOTKEY_BTN_WIDTH, HOTKEY_BTN_HEIGHT, button_hotkey, button_none, 5, 0),
    new generic_button(HOTKEY_X_OFFSET_2, 80 + 24 * 5, HOTKEY_BTN_WIDTH, HOTKEY_BTN_HEIGHT, button_hotkey, button_none, 5, 1),
    new generic_button(HOTKEY_X_OFFSET_1, 80 + 24 * 6, HOTKEY_BTN_WIDTH, HOTKEY_BTN_HEIGHT, button_hotkey, button_none, 6, 0),
    new generic_button(HOTKEY_X_OFFSET_2, 80 + 24 * 6, HOTKEY_BTN_WIDTH, HOTKEY_BTN_HEIGHT, button_hotkey, button_none, 6, 1),
    new generic_button(HOTKEY_X_OFFSET_1, 80 + 24 * 7, HOTKEY_BTN_WIDTH, HOTKEY_BTN_HEIGHT, button_hotkey, button_none, 7, 0),
    new generic_button(HOTKEY_X_OFFSET_2, 80 + 24 * 7, HOTKEY_BTN_WIDTH, HOTKEY_BTN_HEIGHT, button_hotkey, button_none, 7, 1),
    new generic_button(HOTKEY_X_OFFSET_1, 80 + 24 * 8, HOTKEY_BTN_WIDTH, HOTKEY_BTN_HEIGHT, button_hotkey, button_none, 8, 0),
    new generic_button(HOTKEY_X_OFFSET_2, 80 + 24 * 8, HOTKEY_BTN_WIDTH, HOTKEY_BTN_HEIGHT, button_hotkey, button_none, 8, 1),
    new generic_button(HOTKEY_X_OFFSET_1, 80 + 24 * 9, HOTKEY_BTN_WIDTH, HOTKEY_BTN_HEIGHT, button_hotkey, button_none, 9, 0),
    new generic_button(HOTKEY_X_OFFSET_2, 80 + 24 * 9, HOTKEY_BTN_WIDTH, HOTKEY_BTN_HEIGHT, button_hotkey, button_none, 9, 1),
    new generic_button(HOTKEY_X_OFFSET_1, 80 + 24 * 10, HOTKEY_BTN_WIDTH, HOTKEY_BTN_HEIGHT, button_hotkey, button_none, 10, 0),
    new generic_button(HOTKEY_X_OFFSET_2, 80 + 24 * 10, HOTKEY_BTN_WIDTH, HOTKEY_BTN_HEIGHT, button_hotkey, button_none, 10, 1),
    new generic_button(HOTKEY_X_OFFSET_1, 80 + 24 * 11, HOTKEY_BTN_WIDTH, HOTKEY_BTN_HEIGHT, button_hotkey, button_none, 11, 0),
    new generic_button(HOTKEY_X_OFFSET_2, 80 + 24 * 11, HOTKEY_BTN_WIDTH, HOTKEY_BTN_HEIGHT, button_hotkey, button_none, 11, 1),
    new generic_button(HOTKEY_X_OFFSET_1, 80 + 24 * 12, HOTKEY_BTN_WIDTH, HOTKEY_BTN_HEIGHT, button_hotkey, button_none, 12, 0),
    new generic_button(HOTKEY_X_OFFSET_2, 80 + 24 * 12, HOTKEY_BTN_WIDTH, HOTKEY_BTN_HEIGHT, button_hotkey, button_none, 12, 1),
    new generic_button(HOTKEY_X_OFFSET_1, 80 + 24 * 13, HOTKEY_BTN_WIDTH, HOTKEY_BTN_HEIGHT, button_hotkey, button_none, 13, 0),
    new generic_button(HOTKEY_X_OFFSET_2, 80 + 24 * 13, HOTKEY_BTN_WIDTH, HOTKEY_BTN_HEIGHT, button_hotkey, button_none, 13, 1),
];
let bottom_buttons: generic_button[] = [
    new generic_button(230, 430, 180, 30, button_reset_defaults, button_none),
    new generic_button(415, 430, 100, 30, button_close, button_none, 0),
    new generic_button(520, 430, 100, 30, button_close, button_none, 1),
];
let bottom_button_texts: translation_key[] = new Array().fill({
    TR_BUTTON_RESET_DEFAULTS,
    TR_BUTTON_CANCEL,
    TR_BUTTON_OK
});
export class unnamed165_8 {
    public focus_button: number = 0;
    public bottom_focus_button: number = 0;
    public mappings: hotkey_mapping[] = new Array(HOTKEY_MAX_ITEMS).fill(null);
    public constructor(...args: any[]) {
        args.length >= 1 && (this.focus_button = args[0]);
        args.length >= 2 && (this.bottom_focus_button = args[1]);
        args.length >= 3 && (this.mappings = args[2]);
    }
}
let data: unnamed165_8 = new unnamed165_8();
function init() {
    scrollbar_init(scrollbar, 0, hotkey_widgets.length);
    for (let i: number = 0; i < HOTKEY_MAX_ITEMS; i++) {
        let empty: hotkey_mapping = new hotkey_mapping(KEY_TYPE_NONE, KEY_MOD_NONE, i);
        let mapping: hotkey_mapping = hotkey_for_action(i, 0);
        data.mappings[i][0] = mapping ? mapping : empty;
        mapping = hotkey_for_action(i, 1);
        data.mappings[i][1] = mapping ? mapping : empty;
    }
}
function draw_background() {
    graphics_clear_screen();
    image_draw_fullscreen_background(image_group(GROUP_CONFIG));
    graphics_in_dialog();
    outer_panel_draw(0, 0, 40, 30);
    text_draw_centered(translation_for(TR_HOTKEY_TITLE), 16, 16, 608, FONT_LARGE_BLACK, 0);
    text_draw_centered(translation_for(TR_HOTKEY_LABEL), HOTKEY_X_OFFSET_1, 55,
        HOTKEY_BTN_WIDTH, FONT_NORMAL_BLACK, 0);
    text_draw_centered(translation_for(TR_HOTKEY_ALTERNATIVE_LABEL), HOTKEY_X_OFFSET_2, 55,
        HOTKEY_BTN_WIDTH, FONT_NORMAL_BLACK, 0);
    inner_panel_draw(20, 72, 35, 22);
    let y_base: number = 80;
    for (let i: number = 0; i < NUM_VISIBLE_OPTIONS; i++) {
        let widget: hotkey_widget = hotkey_widgets[i + scrollbar.scroll_position];
        let text_offset: number = y_base + 6 + 24 * i;
        if (widget.action == HOTKEY_HEADER) {
            text_draw(translation_for(widget.name_translation), 32, text_offset, FONT_NORMAL_WHITE, 0);
        } else {
            if (widget.name_translation != TR_NONE) {
                text_draw(translation_for(widget.name_translation),
                    32, text_offset, FONT_NORMAL_GREEN, 0);
            } else {
                lang_text_draw(widget.name_text_group, widget.name_text_id,
                    32, text_offset, FONT_NORMAL_GREEN);
            }
            let mapping1: hotkey_mapping = data.mappings[widget.action][0];
            if (mapping1.key) {
                let keyname = key_combination_display_name(mapping1.key, mapping1.modifiers);
                graphics_set_clip_rectangle(HOTKEY_X_OFFSET_1, text_offset, HOTKEY_BTN_WIDTH, HOTKEY_BTN_HEIGHT);
                text_draw_centered(keyname, HOTKEY_X_OFFSET_1 + 3, text_offset,
                    HOTKEY_BTN_WIDTH - 6, FONT_NORMAL_WHITE, 0);
                graphics_reset_clip_rectangle();
            }
            let mapping2: hotkey_mapping = data.mappings[widget.action][1];
            if (mapping2.key) {
                graphics_set_clip_rectangle(HOTKEY_X_OFFSET_2, text_offset, HOTKEY_BTN_WIDTH, HOTKEY_BTN_HEIGHT);
                let keyname = key_combination_display_name(mapping2.key, mapping2.modifiers);
                text_draw_centered(keyname, HOTKEY_X_OFFSET_2 + 3, text_offset,
                    HOTKEY_BTN_WIDTH - 6, FONT_NORMAL_WHITE, 0);
                graphics_reset_clip_rectangle();
            }
        }
    }
    for (let i: number = 0; i < NUM_BOTTOM_BUTTONS; i++) {
        text_draw_centered(translation_for(bottom_button_texts[i]),
            bottom_buttons[i].x, bottom_buttons[i].y + 9,
            bottom_buttons[i].width, FONT_NORMAL_BLACK, 0);
    }
    graphics_reset_dialog();
}
function draw_foreground() {
    graphics_in_dialog();
    scrollbar_draw(scrollbar);
    for (let i: number = 0; i < NUM_VISIBLE_OPTIONS; i++) {
        let widget: hotkey_widget = hotkey_widgets[i + scrollbar.scroll_position];
        if (widget.action != HOTKEY_HEADER) {
            let btn: generic_button = hotkey_buttons[2 * i];
            button_border_draw(btn.x, btn.y, btn.width, btn.height, data.focus_button == 1 + 2 * i);
            btn = hotkey_buttons[2 * i + 1];
            button_border_draw(btn.x, btn.y, btn.width, btn.height, data.focus_button == 2 + 2 * i);
        }
    }
    for (let i: number = 0; i < NUM_BOTTOM_BUTTONS; i++) {
        button_border_draw(bottom_buttons[i].x, bottom_buttons[i].y,
            bottom_buttons[i].width, bottom_buttons[i].height,
            data.bottom_focus_button == i + 1);
    }
    graphics_reset_dialog();
}
function handle_input(m: mouse, h: hotkeys) {
    let m_dialog: mouse = mouse_in_dialog(m);
    if (scrollbar_handle_mouse(scrollbar, m_dialog)) {
        return;
    }
    let handled: boolean = false;
    let focus_button_ref: Ref<number> = new Ref(data.focus_button)
    handled ||= generic_buttons_handle_mouse(m_dialog, 0, 0, hotkey_buttons, NUM_VISIBLE_OPTIONS * 2, focus_button_ref)
    data.focus_button = focus_button_ref.v;
    let bottom_focus_button_ref: Ref<number> = new Ref(data.bottom_focus_button);
    handled ||= generic_buttons_handle_mouse(m_dialog, 0, 0, bottom_buttons, NUM_BOTTOM_BUTTONS, bottom_focus_button_ref)
    data.bottom_focus_button = bottom_focus_button_ref.v;
    if (!handled && (m.right.went_up || h.escape_pressed)) {
        window_config_show();
    }
}
function hotkey_action_name_for(action: hotkey_action) {
    let name: string = null;
    for (let i: number = 0; i < NUM_VISIBLE_OPTIONS + scrollbar.max_scroll_position; i++) {
        let widget: hotkey_widget = hotkey_widgets[i];
        if (widget.action == action) {
            if (widget.name_translation != TR_NONE) {
                name = translation_for(widget.name_translation);
            } else {
                name = lang_get_string(widget.name_text_group, widget.name_text_id);
            }
            break
        }
    }
    return name;
}
function set_hotkey(action: hotkey_action, index: number, key: key_type, modifiers: key_modifier_type) {
    let is_duplicate_hotkey: number = 0;
    if (key != KEY_TYPE_NONE) {
        for (let test_action: number = 0; test_action < HOTKEY_MAX_ITEMS; test_action++) {
            for (let test_index: number = 0; test_index < 2; test_index++) {
                if (data.mappings[test_action][test_index].key == key
                    && data.mappings[test_action][test_index].modifiers == modifiers) {
                    is_duplicate_hotkey = 1;
                    if (!(test_action == action && test_index == index)) {
                        window_plain_message_dialog_show_with_extra(
                            TR_HOTKEY_DUPLICATE_TITLE, TR_HOTKEY_DUPLICATE_MESSAGE,
                            hotkey_action_name_for(test_action));
                    }
                    break
                }
            }
            if (is_duplicate_hotkey) {
                break
            }
        }
    }
    if (!is_duplicate_hotkey) {
        data.mappings[action][index].key = key;
        data.mappings[action][index].modifiers = modifiers;
    }
}
function button_hotkey(row: number, is_alternative: number) {
    let widget: hotkey_widget = hotkey_widgets[row + scrollbar.scroll_position];
    if (widget.action == HOTKEY_HEADER) {
        return;
    }
    window_hotkey_editor_show(widget.action, is_alternative, set_hotkey);
}
function button_reset_defaults(param1: number, param2: number) {
    for (let action: number = 0; action < HOTKEY_MAX_ITEMS; action++) {
        for (let index: number = 0; index < 2; index++) {
            data.mappings[action][index] = hotkey_default_for_action(action, index);
        }
    }
    window_invalidate();
}
function on_scroll() {
    window_invalidate();
}
function button_close(save: number, param2: number) {
    if (!save) {
        window_go_back();
        return;
    }
    hotkey_config_clear();
    for (let action: number = 0; action < HOTKEY_MAX_ITEMS; action++) {
        for (let index: number = 0; index < 2; index++) {
            if (data.mappings[action][index].key != KEY_TYPE_NONE) {
                hotkey_config_add_mapping(data.mappings[action][index]);
            }
        }
    }
    hotkey_config_save();
    window_go_back();
}
export function window_hotkey_config_show() {
    let window: window_type = new window_type(
        WINDOW_HOTKEY_CONFIG,
        draw_background,
        draw_foreground,
        handle_input
    );
    init();
    window_show(window);
}
