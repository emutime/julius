export const BUFFER_SIZE = 100000;
import { language_type } from 'core/locale';
import { log_info } from 'core/log';
import { memset, Ref, textDecodeUTF8 } from '../../ext/crt';
import { translation_english } from './english';
import { translation_simplified_chinese } from './simplified_chinese';
export const  enum translation_key {
    TR_NO_PATCH_TITLE,
    TR_NO_PATCH_MESSAGE,
    TR_MISSING_FONTS_TITLE,
    TR_MISSING_FONTS_MESSAGE,
    TR_NO_EDITOR_TITLE,
    TR_NO_EDITOR_MESSAGE,
    TR_INVALID_LANGUAGE_TITLE,
    TR_INVALID_LANGUAGE_MESSAGE,
    TR_BUILD_ALL_TEMPLES,
    TR_BUTTON_OK,
    TR_BUTTON_CANCEL,
    TR_BUTTON_RESET_DEFAULTS,
    TR_BUTTON_CONFIGURE_HOTKEYS,
    TR_CONFIG_TITLE,
    TR_CONFIG_LANGUAGE_LABEL,
    TR_CONFIG_LANGUAGE_DEFAULT,
    TR_CONFIG_DISPLAY_SCALE,
    TR_CONFIG_CURSOR_SCALE,
    TR_CONFIG_HEADER_UI_CHANGES,
    TR_CONFIG_HEADER_GAMEPLAY_CHANGES,
    TR_CONFIG_SHOW_INTRO_VIDEO,
    TR_CONFIG_SIDEBAR_INFO,
    TR_CONFIG_SMOOTH_SCROLLING,
    TR_CONFIG_DISABLE_MOUSE_EDGE_SCROLLING,
    TR_CONFIG_DISABLE_RIGHT_CLICK_MAP_DRAG,
    TR_CONFIG_VISUAL_FEEDBACK_ON_DELETE,
    TR_CONFIG_ALLOW_CYCLING_TEMPLES,
    TR_CONFIG_SHOW_WATER_STRUCTURE_RANGE,
    TR_CONFIG_SHOW_CONSTRUCTION_SIZE,
    TR_CONFIG_HIGHLIGHT_LEGIONS,
    TR_CONFIG_SHOW_MILITARY_SIDEBAR,
    TR_CONFIG_FIX_IMMIGRATION_BUG,
    TR_CONFIG_FIX_100_YEAR_GHOSTS,
    TR_HOTKEY_TITLE,
    TR_HOTKEY_LABEL,
    TR_HOTKEY_ALTERNATIVE_LABEL,
    TR_HOTKEY_HEADER_ARROWS,
    TR_HOTKEY_HEADER_GLOBAL,
    TR_HOTKEY_HEADER_CITY,
    TR_HOTKEY_HEADER_ADVISORS,
    TR_HOTKEY_HEADER_OVERLAYS,
    TR_HOTKEY_HEADER_BOOKMARKS,
    TR_HOTKEY_HEADER_EDITOR,
    TR_HOTKEY_HEADER_BUILD,
    TR_HOTKEY_ARROW_UP,
    TR_HOTKEY_ARROW_DOWN,
    TR_HOTKEY_ARROW_LEFT,
    TR_HOTKEY_ARROW_RIGHT,
    TR_HOTKEY_TOGGLE_FULLSCREEN,
    TR_HOTKEY_CENTER_WINDOW,
    TR_HOTKEY_RESIZE_TO_640,
    TR_HOTKEY_RESIZE_TO_800,
    TR_HOTKEY_RESIZE_TO_1024,
    TR_HOTKEY_SAVE_SCREENSHOT,
    TR_HOTKEY_SAVE_CITY_SCREENSHOT,
    TR_HOTKEY_BUILD_CLONE,
    TR_HOTKEY_LOAD_FILE,
    TR_HOTKEY_SAVE_FILE,
    TR_HOTKEY_INCREASE_GAME_SPEED,
    TR_HOTKEY_DECREASE_GAME_SPEED,
    TR_HOTKEY_TOGGLE_PAUSE,
    TR_HOTKEY_CYCLE_LEGION,
    TR_HOTKEY_ROTATE_MAP_LEFT,
    TR_HOTKEY_ROTATE_MAP_RIGHT,
    TR_HOTKEY_SHOW_ADVISOR_LABOR,
    TR_HOTKEY_SHOW_ADVISOR_MILITARY,
    TR_HOTKEY_SHOW_ADVISOR_IMPERIAL,
    TR_HOTKEY_SHOW_ADVISOR_RATINGS,
    TR_HOTKEY_SHOW_ADVISOR_TRADE,
    TR_HOTKEY_SHOW_ADVISOR_POPULATION,
    TR_HOTKEY_SHOW_ADVISOR_HEALTH,
    TR_HOTKEY_SHOW_ADVISOR_EDUCATION,
    TR_HOTKEY_SHOW_ADVISOR_ENTERTAINMENT,
    TR_HOTKEY_SHOW_ADVISOR_RELIGION,
    TR_HOTKEY_SHOW_ADVISOR_FINANCIAL,
    TR_HOTKEY_SHOW_ADVISOR_CHIEF,
    TR_HOTKEY_TOGGLE_OVERLAY,
    TR_HOTKEY_SHOW_OVERLAY_WATER,
    TR_HOTKEY_SHOW_OVERLAY_FIRE,
    TR_HOTKEY_SHOW_OVERLAY_DAMAGE,
    TR_HOTKEY_SHOW_OVERLAY_CRIME,
    TR_HOTKEY_SHOW_OVERLAY_PROBLEMS,
    TR_HOTKEY_GO_TO_BOOKMARK_1,
    TR_HOTKEY_GO_TO_BOOKMARK_2,
    TR_HOTKEY_GO_TO_BOOKMARK_3,
    TR_HOTKEY_GO_TO_BOOKMARK_4,
    TR_HOTKEY_SET_BOOKMARK_1,
    TR_HOTKEY_SET_BOOKMARK_2,
    TR_HOTKEY_SET_BOOKMARK_3,
    TR_HOTKEY_SET_BOOKMARK_4,
    TR_HOTKEY_EDITOR_TOGGLE_BATTLE_INFO,
    TR_HOTKEY_EDIT_TITLE,
    TR_HOTKEY_DUPLICATE_TITLE,
    TR_HOTKEY_DUPLICATE_MESSAGE,
    TR_WARNING_SCREENSHOT_SAVED,
    TRANSLATION_MAX_KEY
};
import LANGUAGE_UNKNOWN = language_type.LANGUAGE_UNKNOWN;
import LANGUAGE_ENGLISH = language_type.LANGUAGE_ENGLISH;
import LANGUAGE_FRENCH = language_type.LANGUAGE_FRENCH;
import LANGUAGE_GERMAN = language_type.LANGUAGE_GERMAN;
import LANGUAGE_ITALIAN = language_type.LANGUAGE_ITALIAN;
import LANGUAGE_SPANISH = language_type.LANGUAGE_SPANISH;
import LANGUAGE_JAPANESE = language_type.LANGUAGE_JAPANESE;
import LANGUAGE_KOREAN = language_type.LANGUAGE_KOREAN;
import LANGUAGE_POLISH = language_type.LANGUAGE_POLISH;
import LANGUAGE_PORTUGUESE = language_type.LANGUAGE_PORTUGUESE;
import LANGUAGE_RUSSIAN = language_type.LANGUAGE_RUSSIAN;
import LANGUAGE_SWEDISH = language_type.LANGUAGE_SWEDISH;
import LANGUAGE_SIMPLIFIED_CHINESE = language_type.LANGUAGE_SIMPLIFIED_CHINESE;
import LANGUAGE_TRADITIONAL_CHINESE = language_type.LANGUAGE_TRADITIONAL_CHINESE;
import LANGUAGE_CZECH = language_type.LANGUAGE_CZECH;
import LANGUAGE_GREEK = language_type.LANGUAGE_GREEK;
;
import TRANSLATION_MAX_KEY = translation_key.TRANSLATION_MAX_KEY;
export class translation_string {
    public key: translation_key = null;
    public string: string = null;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.key = args[0]);
        args.length >= 2 && (this.string = args[1]);
    }
}
export class unnamed11_8 {
    public strings: Uint8Array<ArrayBuffer>[] = new Array(TRANSLATION_MAX_KEY).fill(0);
    public buffer: number[] = new Array(BUFFER_SIZE).fill(0);
    public buf_index: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.strings = args[0]);
        args.length >= 2 && (this.buffer = args[1]);
        args.length >= 3 && (this.buf_index = args[2]);
    }
}
let data: unnamed11_8 = new unnamed11_8();
function set_strings(strings: translation_string[], num_strings: number, is_default: boolean) {
    for (let i: number = 0; i < num_strings; i++) {
        let string: translation_string = strings[i];
        if (data.strings[string.key]) {
            continue
        }
        if (is_default) {
            log_info("Translation key not found:", string.string, string.key);
        }
        // todo
        // let length_left: number = BUFFER_SIZE - data.buf_index;
        // encoding_from_utf8(string.string, data.buffer[data.buf_index], length_left);
        // data.strings[string.key] = data.buffer[data.buf_index];
        // data.buf_index += 1 + string_length(data.buffer[data.buf_index])
    }
}
export function translation_load(language: language_type) {
    let strings: Ref<translation_string[]> = new Ref(null);
    let num_strings: Ref<number> = new Ref(0);
    let default_strings: Ref<translation_string[]> = new Ref(null);
    let num_default_strings: Ref<number> = new Ref(0);
    translation_english(default_strings, num_default_strings);
    switch (language) {
        case LANGUAGE_ENGLISH:
        case LANGUAGE_UNKNOWN:
        default:
            translation_english(strings, num_strings)
            break
        case LANGUAGE_FRENCH:
            // translation_french(strings, num_strings);
            break
        case LANGUAGE_GERMAN:
            // translation_german(strings, num_strings);
            break
        case LANGUAGE_GREEK:
            // translation_greek(strings, num_strings);
            break
        case LANGUAGE_ITALIAN:
            // translation_italian(strings, num_strings);
            break
        case LANGUAGE_JAPANESE:
            // translation_japanese(strings, num_strings);
            break
        case LANGUAGE_KOREAN:
            // translation_korean(strings, num_strings);
            break
        case LANGUAGE_POLISH:
            // translation_polish(strings, num_strings);
            break
        case LANGUAGE_PORTUGUESE:
            // translation_portuguese(strings, num_strings);
            break
        case LANGUAGE_RUSSIAN:
            // translation_russian(strings, num_strings);
            break
        case LANGUAGE_SPANISH:
            // translation_spanish(strings, num_strings);
            break
        case LANGUAGE_SWEDISH:
            // translation_swedish(strings, num_strings);
            break
        case LANGUAGE_SIMPLIFIED_CHINESE:
            translation_simplified_chinese(strings, num_strings);
            break
        case LANGUAGE_TRADITIONAL_CHINESE:
            // translation_traditional_chinese(strings, num_strings);
            break
        case LANGUAGE_CZECH:
            // translation_czech(strings, num_strings);
            break
    }
    memset(data.strings, 0);
    data.buf_index = 0;
    set_strings(strings.v, num_strings.v, false);
    set_strings(default_strings.v, num_default_strings.v, true);
}
export function translation_for(key: translation_key) {
    return textDecodeUTF8(data.strings[key]);
}
