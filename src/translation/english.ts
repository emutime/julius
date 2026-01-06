
import { translation_key, translation_string } from 'translation/translation';
import { Ref } from '../../ext/crt';
import { URL_EDITOR, URL_PATCHES } from './common';
import TR_NO_PATCH_TITLE = translation_key.TR_NO_PATCH_TITLE;
import TR_NO_PATCH_MESSAGE = translation_key.TR_NO_PATCH_MESSAGE;
import TR_MISSING_FONTS_TITLE = translation_key.TR_MISSING_FONTS_TITLE;
import TR_MISSING_FONTS_MESSAGE = translation_key.TR_MISSING_FONTS_MESSAGE;
import TR_NO_EDITOR_TITLE = translation_key.TR_NO_EDITOR_TITLE;
import TR_NO_EDITOR_MESSAGE = translation_key.TR_NO_EDITOR_MESSAGE;
import TR_INVALID_LANGUAGE_TITLE = translation_key.TR_INVALID_LANGUAGE_TITLE;
import TR_INVALID_LANGUAGE_MESSAGE = translation_key.TR_INVALID_LANGUAGE_MESSAGE;
import TR_BUILD_ALL_TEMPLES = translation_key.TR_BUILD_ALL_TEMPLES;
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
import TR_HOTKEY_EDIT_TITLE = translation_key.TR_HOTKEY_EDIT_TITLE;
import TR_HOTKEY_DUPLICATE_TITLE = translation_key.TR_HOTKEY_DUPLICATE_TITLE;
import TR_HOTKEY_DUPLICATE_MESSAGE = translation_key.TR_HOTKEY_DUPLICATE_MESSAGE;
import TR_WARNING_SCREENSHOT_SAVED = translation_key.TR_WARNING_SCREENSHOT_SAVED;
let all_strings: translation_string[] = [
    new translation_string(TR_NO_PATCH_TITLE, "Patch 1.0.1.0 not installed"),
    new translation_string(TR_NO_PATCH_MESSAGE,
        "Your Caesar 3 installation does not have the 1.0.1.0 patch installed. " +
        "You can download the patch from:\n" +
        URL_PATCHES + "\n" +
        "Continue at your own risk."
    ),
    new translation_string(TR_MISSING_FONTS_TITLE, "Missing fonts"),
    new translation_string(TR_MISSING_FONTS_MESSAGE,
        "Your Caesar 3 installation requires extra font files. " +
        "You can download them for your language from:\n" +
        URL_PATCHES
    ),
    new translation_string(TR_NO_EDITOR_TITLE, "Editor not installed"),
    new translation_string(TR_NO_EDITOR_MESSAGE,
        "Your Caesar 3 installation does not contain the editor files. " +
        "You can download them from:\n" +
        URL_EDITOR
    ),
    new translation_string(TR_INVALID_LANGUAGE_TITLE, "Invalid language directory"),
    new translation_string(TR_INVALID_LANGUAGE_MESSAGE,
        "The directory you selected does not contain a valid language pack. " +
        "Please check the log for errors."
    ),
    new translation_string(TR_BUILD_ALL_TEMPLES, "All"),
    new translation_string(TR_BUTTON_OK, "OK"),
    new translation_string(TR_BUTTON_CANCEL, "Cancel"),
    new translation_string(TR_BUTTON_RESET_DEFAULTS, "Reset defaults"),
    new translation_string(TR_BUTTON_CONFIGURE_HOTKEYS, "Configure hotkeys"),
    new translation_string(TR_CONFIG_TITLE, "Julius configuration options"),
    new translation_string(TR_CONFIG_LANGUAGE_LABEL, "Language:"),
    new translation_string(TR_CONFIG_LANGUAGE_DEFAULT, "(default)"),
    new translation_string(TR_CONFIG_DISPLAY_SCALE, "Display scale:"),
    new translation_string(TR_CONFIG_CURSOR_SCALE, "Cursor scale:"),
    new translation_string(TR_CONFIG_HEADER_UI_CHANGES, "User interface changes"),
    new translation_string(TR_CONFIG_HEADER_GAMEPLAY_CHANGES, "Gameplay changes"),
    new translation_string(TR_CONFIG_SHOW_INTRO_VIDEO, "Play intro videos"),
    new translation_string(TR_CONFIG_SIDEBAR_INFO, "Extra information in the control panel"),
    new translation_string(TR_CONFIG_SMOOTH_SCROLLING, "Enable smooth scrolling"),
    new translation_string(TR_CONFIG_DISABLE_MOUSE_EDGE_SCROLLING, "Disable map scrolling on window edge"),
    new translation_string(TR_CONFIG_DISABLE_RIGHT_CLICK_MAP_DRAG, "Disable right click to drag the map"),
    new translation_string(TR_CONFIG_VISUAL_FEEDBACK_ON_DELETE, "Improve visual feedback when clearing land"),
    new translation_string(TR_CONFIG_ALLOW_CYCLING_TEMPLES, "Allow building each temple in succession"),
    new translation_string(TR_CONFIG_SHOW_WATER_STRUCTURE_RANGE, "Show range when building reservoirs, fountains and wells"),
    new translation_string(TR_CONFIG_SHOW_CONSTRUCTION_SIZE, "Show draggable construction size"),
    new translation_string(TR_CONFIG_HIGHLIGHT_LEGIONS, "Highlight legion on cursor hover"),
    new translation_string(TR_CONFIG_SHOW_MILITARY_SIDEBAR, "Enable military sidebar"),
    new translation_string(TR_CONFIG_FIX_IMMIGRATION_BUG, "Fix immigration bug on very hard"),
    new translation_string(TR_CONFIG_FIX_100_YEAR_GHOSTS, "Fix 100-year-old ghosts"),
    new translation_string(TR_HOTKEY_TITLE, "Julius hotkey configuration"),
    new translation_string(TR_HOTKEY_LABEL, "Hotkey"),
    new translation_string(TR_HOTKEY_ALTERNATIVE_LABEL, "Alternative"),
    new translation_string(TR_HOTKEY_HEADER_ARROWS, "Arrow keys"),
    new translation_string(TR_HOTKEY_HEADER_GLOBAL, "Global hotkeys"),
    new translation_string(TR_HOTKEY_HEADER_CITY, "City hotkeys"),
    new translation_string(TR_HOTKEY_HEADER_ADVISORS, "Advisors"),
    new translation_string(TR_HOTKEY_HEADER_OVERLAYS, "Overlays"),
    new translation_string(TR_HOTKEY_HEADER_BOOKMARKS, "City map bookmarks"),
    new translation_string(TR_HOTKEY_HEADER_EDITOR, "Editor"),
    new translation_string(TR_HOTKEY_HEADER_BUILD, "Construction hotkeys"),
    new translation_string(TR_HOTKEY_ARROW_UP, "Up"),
    new translation_string(TR_HOTKEY_ARROW_DOWN, "Down"),
    new translation_string(TR_HOTKEY_ARROW_LEFT, "Left"),
    new translation_string(TR_HOTKEY_ARROW_RIGHT, "Right"),
    new translation_string(TR_HOTKEY_TOGGLE_FULLSCREEN, "Toggle fullscreen"),
    new translation_string(TR_HOTKEY_CENTER_WINDOW, "Center window"),
    new translation_string(TR_HOTKEY_RESIZE_TO_640, "Resize window to 640x480"),
    new translation_string(TR_HOTKEY_RESIZE_TO_800, "Resize window to 800x600"),
    new translation_string(TR_HOTKEY_RESIZE_TO_1024, "Resize window to 1024x768"),
    new translation_string(TR_HOTKEY_SAVE_SCREENSHOT, "Save screenshot"),
    new translation_string(TR_HOTKEY_SAVE_CITY_SCREENSHOT, "Save full city screenshot"),
    new translation_string(TR_HOTKEY_BUILD_CLONE, "Clone building under cursor"),
    new translation_string(TR_HOTKEY_LOAD_FILE, "Load file"),
    new translation_string(TR_HOTKEY_SAVE_FILE, "Save file"),
    new translation_string(TR_HOTKEY_INCREASE_GAME_SPEED, "Increase game speed"),
    new translation_string(TR_HOTKEY_DECREASE_GAME_SPEED, "Decrease game speed"),
    new translation_string(TR_HOTKEY_TOGGLE_PAUSE, "Toggle pause"),
    new translation_string(TR_HOTKEY_CYCLE_LEGION, "Cycle through legions"),
    new translation_string(TR_HOTKEY_ROTATE_MAP_LEFT, "Rotate map left"),
    new translation_string(TR_HOTKEY_ROTATE_MAP_RIGHT, "Rotate map right"),
    new translation_string(TR_HOTKEY_SHOW_ADVISOR_LABOR, "Labor advisor"),
    new translation_string(TR_HOTKEY_SHOW_ADVISOR_MILITARY, "Military advisor"),
    new translation_string(TR_HOTKEY_SHOW_ADVISOR_IMPERIAL, "Imperial advisor"),
    new translation_string(TR_HOTKEY_SHOW_ADVISOR_RATINGS, "Ratings advisor"),
    new translation_string(TR_HOTKEY_SHOW_ADVISOR_TRADE, "Trade advisor"),
    new translation_string(TR_HOTKEY_SHOW_ADVISOR_POPULATION, "Population advisor"),
    new translation_string(TR_HOTKEY_SHOW_ADVISOR_HEALTH, "Health advisor"),
    new translation_string(TR_HOTKEY_SHOW_ADVISOR_EDUCATION, "Education advisor"),
    new translation_string(TR_HOTKEY_SHOW_ADVISOR_ENTERTAINMENT, "Entertainment advisor"),
    new translation_string(TR_HOTKEY_SHOW_ADVISOR_RELIGION, "Religion advisor"),
    new translation_string(TR_HOTKEY_SHOW_ADVISOR_FINANCIAL, "Financial advisor"),
    new translation_string(TR_HOTKEY_SHOW_ADVISOR_CHIEF, "Chief advisor"),
    new translation_string(TR_HOTKEY_TOGGLE_OVERLAY, "Toggle current overlay"),
    new translation_string(TR_HOTKEY_SHOW_OVERLAY_WATER, "Show water overlay"),
    new translation_string(TR_HOTKEY_SHOW_OVERLAY_FIRE, "Show fire overlay"),
    new translation_string(TR_HOTKEY_SHOW_OVERLAY_DAMAGE, "Damage overlay"),
    new translation_string(TR_HOTKEY_SHOW_OVERLAY_CRIME, "Crime overlay"),
    new translation_string(TR_HOTKEY_SHOW_OVERLAY_PROBLEMS, "Problems overlay"),
    new translation_string(TR_HOTKEY_GO_TO_BOOKMARK_1, "Go to bookmark 1"),
    new translation_string(TR_HOTKEY_GO_TO_BOOKMARK_2, "Go to bookmark 2"),
    new translation_string(TR_HOTKEY_GO_TO_BOOKMARK_3, "Go to bookmark 3"),
    new translation_string(TR_HOTKEY_GO_TO_BOOKMARK_4, "Go to bookmark 4"),
    new translation_string(TR_HOTKEY_SET_BOOKMARK_1, "Set bookmark 1"),
    new translation_string(TR_HOTKEY_SET_BOOKMARK_2, "Set bookmark 2"),
    new translation_string(TR_HOTKEY_SET_BOOKMARK_3, "Set bookmark 3"),
    new translation_string(TR_HOTKEY_SET_BOOKMARK_4, "Set bookmark 4"),
    new translation_string(TR_HOTKEY_EDITOR_TOGGLE_BATTLE_INFO, "Toggle battle info"),
    new translation_string(TR_HOTKEY_EDIT_TITLE, "Press new hotkey"),
    new translation_string(TR_HOTKEY_DUPLICATE_TITLE, "Hotkey already used"),
    new translation_string(TR_HOTKEY_DUPLICATE_MESSAGE, "This key combination is already assigned to the following action:"),
    new translation_string(TR_WARNING_SCREENSHOT_SAVED, "Screenshot saved: "),
];
export function translation_english(strings: Ref<translation_string[]>, num_strings: Ref<number>) {
    strings.v = all_strings;
    num_strings.v = strings.v.length;
}
