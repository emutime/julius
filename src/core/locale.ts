
import { lang_get_string } from 'core/lang';
import { log_info } from 'core/log';
import { string_equals } from 'core/string';
export const enum language_type {
    LANGUAGE_UNKNOWN,
    // Official Sierra versions
    LANGUAGE_ENGLISH,
    LANGUAGE_FRENCH,
    LANGUAGE_GERMAN,
    LANGUAGE_ITALIAN,
    LANGUAGE_SPANISH,
    // Translations done by other publishers
    LANGUAGE_JAPANESE,
    LANGUAGE_KOREAN,
    LANGUAGE_POLISH,
    LANGUAGE_PORTUGUESE,
    LANGUAGE_RUSSIAN,
    LANGUAGE_SWEDISH,
    LANGUAGE_SIMPLIFIED_CHINESE,
    LANGUAGE_TRADITIONAL_CHINESE,
    // Fan translations
    LANGUAGE_CZECH,
    LANGUAGE_GREEK,
    LANGUAGE_MAX_ITEMS
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
import LANGUAGE_GREEK = language_type.LANGUAGE_GREEK;;
let NEW_GAME_ENGLISH: number[] = [0x4e, 0x65, 0x77, 0x20, 0x47, 0x61, 0x6d, 0x65, 0];
let NEW_GAME_FRENCH: number[] = [0x4e, 0x6f, 0x75, 0x76, 0x65, 0x6c, 0x6c, 0x65, 0x20, 0x70, 0x61, 0x72, 0x74, 0x69, 0x65, 0];
let NEW_GAME_GERMAN: number[] = [0x4e, 0x65, 0x75, 0x65, 0x73, 0x20, 0x53, 0x70, 0x69, 0x65, 0x6c, 0];
let NEW_GAME_GREEK: number[] = [0xcd, 0xdd, 0xef, 0x20, 0xd0, 0xe1, 0xe9, 0xf7, 0xed, 0xdf, 0xe4, 0xe9, 0];
let NEW_GAME_ITALIAN: number[] = [0x4e, 0x75, 0x6f, 0x76, 0x61, 0x20, 0x70, 0x61, 0x72, 0x74, 0x69, 0x74, 0x61, 0];
let NEW_GAME_SPANISH: number[] = [0x4e, 0x75, 0x65, 0x76, 0x61, 0x20, 0x70, 0x61, 0x72, 0x74, 0x69, 0x64, 0x61, 0];
let NEW_GAME_PORTUGUESE: number[] = [0x4e, 0x6f, 0x76, 0x6f, 0x20, 0x6a, 0x6f, 0x67, 0x6f, 0];
let NEW_GAME_POLISH: number[] = [0x4e, 0x6f, 0x77, 0x61, 0x20, 0x67, 0x72, 0x61, 0];
let NEW_GAME_RUSSIAN: number[] = [0xcd, 0xee, 0xe2, 0xe0, 0xff, 0x20, 0xe8, 0xe3, 0xf0, 0xe0, 0];
let NEW_GAME_SWEDISH: number[] = [0x4e, 0x79, 0x74, 0x74, 0x20, 0x73, 0x70, 0x65, 0x6c, 0];
let NEW_GAME_TRADITIONAL_CHINESE: number[] = [0x83, 0x80, 0x20, 0x84, 0x80, 0x20, 0x85, 0x80, 0];
let NEW_GAME_SIMPLIFIED_CHINESE: number[] = [0x82, 0x80, 0x20, 0x83, 0x80, 0x20, 0x84, 0x80, 0];
let NEW_GAME_KOREAN: number[] = [0xbb, 0xf5, 0x20, 0xb0, 0xd4, 0xc0, 0xd3, 0];
let NEW_GAME_JAPANESE: number[] = [0x83, 0x6a, 0x83, 0x85, 0x81, 0x5b, 0x83, 0x51, 0x81, 0x5b, 0x83, 0x80, 0];
let NEW_GAME_CZECH: number[] = [0x4e, 0x6f, 0x76, 0xe1, 0x20, 0x68, 0x72, 0x61, 0];
export class unnamed36_8 {
    public last_determined_language: language_type = null;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.last_determined_language = args[0]);
    }
}
let data: unnamed36_8 = new unnamed36_8();
function determine_language() {
    let new_game_string: number = lang_get_string(1, 1);
    if (string_equals(NEW_GAME_ENGLISH, new_game_string)) {
        return LANGUAGE_ENGLISH;
    } else if (string_equals(NEW_GAME_FRENCH, new_game_string)) {
        return LANGUAGE_FRENCH;
    } else if (string_equals(NEW_GAME_GERMAN, new_game_string)) {
        return LANGUAGE_GERMAN;
    } else if (string_equals(NEW_GAME_GREEK, new_game_string)) {
        return LANGUAGE_GREEK;
    } else if (string_equals(NEW_GAME_ITALIAN, new_game_string)) {
        return LANGUAGE_ITALIAN;
    } else if (string_equals(NEW_GAME_SPANISH, new_game_string)) {
        return LANGUAGE_SPANISH;
    } else if (string_equals(NEW_GAME_PORTUGUESE, new_game_string)) {
        return LANGUAGE_PORTUGUESE;
    } else if (string_equals(NEW_GAME_POLISH, new_game_string)) {
        return LANGUAGE_POLISH;
    } else if (string_equals(NEW_GAME_RUSSIAN, new_game_string)) {
        return LANGUAGE_RUSSIAN;
    } else if (string_equals(NEW_GAME_SWEDISH, new_game_string)) {
        return LANGUAGE_SWEDISH;
    } else if (string_equals(NEW_GAME_CZECH, new_game_string)) {
        return LANGUAGE_CZECH;
    } else if (string_equals(NEW_GAME_TRADITIONAL_CHINESE, new_game_string)) {
        return LANGUAGE_TRADITIONAL_CHINESE;
    } else if (string_equals(NEW_GAME_SIMPLIFIED_CHINESE, new_game_string)) {
        return LANGUAGE_SIMPLIFIED_CHINESE;
    } else if (string_equals(NEW_GAME_KOREAN, new_game_string)) {
        return LANGUAGE_KOREAN;
    } else if (string_equals(NEW_GAME_JAPANESE, new_game_string)) {
        return LANGUAGE_JAPANESE;
    } else {
        return LANGUAGE_UNKNOWN;
    }
}
function log_language() {
    let desc: char;
    switch (data.last_determined_language) {
        case LANGUAGE_ENGLISH:
            desc = "English";
            break
        case LANGUAGE_FRENCH:
            desc = "French";
            break
        case LANGUAGE_GERMAN:
            desc = "German";
            break
        case LANGUAGE_GREEK:
            desc = "Greek";
            break
        case LANGUAGE_ITALIAN:
            desc = "Italian";
            break
        case LANGUAGE_SPANISH:
            desc = "Spanish";
            break
        case LANGUAGE_POLISH:
            desc = "Polish";
            break
        case LANGUAGE_PORTUGUESE:
            desc = "Portuguese";
            break
        case LANGUAGE_RUSSIAN:
            desc = "Russian";
            break
        case LANGUAGE_SWEDISH:
            desc = "Swedish";
            break
        case LANGUAGE_TRADITIONAL_CHINESE:
            desc = "Traditional Chinese";
            break
        case LANGUAGE_SIMPLIFIED_CHINESE:
            desc = "Simplified Chinese";
            break
        case LANGUAGE_KOREAN:
            desc = "Korean";
            break
        case LANGUAGE_JAPANESE:
            desc = "Japanese";
            break
        case LANGUAGE_CZECH:
            desc = "Czech";
            break
        default: desc = "Unknown"
            break
    }
    log_info("Detected language:", desc, 0);
}
export function locale_determine_language() {
    data.last_determined_language = determine_language();
    log_language();
    return data.last_determined_language;
}
export function locale_year_before_ad() {
    return data.last_determined_language != LANGUAGE_ENGLISH;
}
export function locale_translate_money_dn() {
    return data.last_determined_language != LANGUAGE_KOREAN;
}
export function locale_paragraph_indent() {
    return data.last_determined_language == LANGUAGE_JAPANESE ? 17 : 50;
}
export function locale_translate_rank_autosaves() {
    switch (data.last_determined_language) {
        case LANGUAGE_ENGLISH:
        case LANGUAGE_FRENCH:
        case LANGUAGE_GERMAN:
        case LANGUAGE_ITALIAN:
        case LANGUAGE_POLISH:
        case LANGUAGE_PORTUGUESE:
        case LANGUAGE_SPANISH:
        case LANGUAGE_SWEDISH:
        case LANGUAGE_RUSSIAN:
        case LANGUAGE_CZECH:
            return 1;
        case LANGUAGE_JAPANESE:
        case LANGUAGE_KOREAN:
        case LANGUAGE_TRADITIONAL_CHINESE:
        case LANGUAGE_SIMPLIFIED_CHINESE:
        default:
            return 0
    }
}

export { language_type };

