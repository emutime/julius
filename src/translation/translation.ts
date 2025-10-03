export const BUFFER_SIZE = 100000;
import { encoding_from_utf8 } from 'core/encoding';
import { language_type } from 'core/locale';
import { log_info } from 'core/log';
import { string_length } from 'core/string';
import { translation_key } from 'translation/translation';
import { memset } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vcruntime_string';
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
    public string: char = null;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.key = args[0]);
        args.length >= 2 && (this.string = args[1]);
    }
}
export class unnamed11_8 {
    public strings: number[] = new Array(TRANSLATION_MAX_KEY).fill(0);
    public buffer: number[] = new Array(BUFFER_SIZE).fill(0);
    public buf_index: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.strings = args[0]);
        args.length >= 2 && (this.buffer = args[1]);
        args.length >= 3 && (this.buf_index = args[2]);
    }
}
let data: unnamed11_8 = new unnamed11_8();
function set_strings(strings: translation_string, num_strings: number, is_default: number) {
    for (let i: number = 0; i < num_strings; i++) {
        let string: translation_string = strings[i];
        if (data.strings[string.key]) {
            continue
        }
        if (is_default) {
            log_info("Translation key not found:", string.string, string.key);
        }
        let length_left: number = BUFFER_SIZE - data.buf_index;
        encoding_from_utf8(string.string, data.buffer[data.buf_index], length_left);
        data.strings[string.key] = data.buffer[data.buf_index];
        data.buf_index += 1 + string_length(data.buffer[data.buf_index])
    }
}
export function translation_load(language: language_type) {
    let strings: translation_string = null;
    let num_strings: number = 0;
    let default_strings: translation_string;
    let num_default_strings: number;
    translation_english(default_strings, num_default_strings);
    switch (language) {
        case LANGUAGE_ENGLISH:
        case LANGUAGE_UNKNOWN:
        default:
            translation_english(strings, num_strings)
            break
        case LANGUAGE_FRENCH:
            translation_french(strings, num_strings);
            break
        case LANGUAGE_GERMAN:
            translation_german(strings, num_strings);
            break
        case LANGUAGE_GREEK:
            translation_greek(strings, num_strings);
            break
        case LANGUAGE_ITALIAN:
            translation_italian(strings, num_strings);
            break
        case LANGUAGE_JAPANESE:
            translation_japanese(strings, num_strings);
            break
        case LANGUAGE_KOREAN:
            translation_korean(strings, num_strings);
            break
        case LANGUAGE_POLISH:
            translation_polish(strings, num_strings);
            break
        case LANGUAGE_PORTUGUESE:
            translation_portuguese(strings, num_strings);
            break
        case LANGUAGE_RUSSIAN:
            translation_russian(strings, num_strings);
            break
        case LANGUAGE_SPANISH:
            translation_spanish(strings, num_strings);
            break
        case LANGUAGE_SWEDISH:
            translation_swedish(strings, num_strings);
            break
        case LANGUAGE_SIMPLIFIED_CHINESE:
            translation_simplified_chinese(strings, num_strings);
            break
        case LANGUAGE_TRADITIONAL_CHINESE:
            translation_traditional_chinese(strings, num_strings);
            break
        case LANGUAGE_CZECH:
            translation_czech(strings, num_strings);
            break
    }
    memset(data.strings, 0);
    data.buf_index = 0;
    set_strings(strings, num_strings, 0);
    set_strings(default_strings, num_default_strings, 1);
}
export function translation_for(key: translation_key) {
    return data.strings[key];
}
