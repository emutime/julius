import { COLOR_WHITE } from 'graphics/color';
export const ELLIPSIS_LENGTH = 4;
export const NUMBER_BUFFER_LENGTH = 100;
;
import { color_t } from 'graphics/color';
import { language_type } from 'core/locale';
import { locale_translate_money_dn } from 'core/locale';
import { encoding_type } from 'core/encoding';
import { font_t } from 'graphics/font';
import FONT_TYPES_MAX = font_t.FONT_TYPES_MAX;
import { font_t } from 'graphics/font';
import { font_definition } from 'graphics/font';
import { font_definition_for } from 'graphics/font';
import { font_letter_id } from 'graphics/font';
import { time_millis } from 'core/time';
import { time_get_millis } from 'core/time';
import { touch_coords } from 'input/touch';
import { touch_mode } from 'input/touch';
import { touch } from 'input/touch';
import { mouse_button } from 'input/mouse';
import { scroll_state } from 'input/mouse';
import { mouse } from 'input/mouse';
import { lang_type } from 'core/lang';
import { lang_message_type } from 'core/lang';
import { lang_message } from 'core/lang';
import { lang_get_string } from 'core/lang';
import { string_copy } from 'core/string';
import { string_length } from 'core/string';
import { string_from_ascii } from 'core/string';
import { string_from_int } from 'core/string';
import { clip_code } from 'graphics/graphics';
import { clip_info } from 'graphics/graphics';
import { graphics_draw_vertical_line } from 'graphics/graphics';
import { graphics_draw_horizontal_line } from 'graphics/graphics';
import { graphics_fill_rect } from 'graphics/graphics';
import { image } from 'core/image';
import { image_letter } from 'core/image';
import { image_draw_letter } from 'graphics/image';
import { _invalid_parameter_noinfo } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt';
import { _errno } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/errno';
import { memcpy } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vcruntime_string';
import { memcpy } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vcruntime_string';
import { memmove } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vcruntime_string';
import { memmove } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vcruntime_string';
import { memset } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vcruntime_string';
import { memset } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vcruntime_string';
import { wcsnlen } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstring';
import { wcstok } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstring';
import { strnlen } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/string';
let tmp_line: number[] = new Array(200);
export class unnamed17_8 {
    public capture: number = 0;
    public seen: number = 0;
    public position: number = 0;
    public cursor_position: number = 0;
    public width: number = 0;
    public visible: number = 0;
    public updated: time_millis = null;
    public x_offset: number = 0;
    public y_offset: number = 0;
    public text_offset_start: number = 0;
    public text_offset_end: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.capture = args[0]);
        args.length >= 2 && (this.seen = args[1]);
        args.length >= 3 && (this.position = args[2]);
        args.length >= 4 && (this.cursor_position = args[3]);
        args.length >= 5 && (this.width = args[4]);
        args.length >= 6 && (this.visible = args[5]);
        args.length >= 7 && (this.updated = args[6]);
        args.length >= 8 && (this.x_offset = args[7]);
        args.length >= 9 && (this.y_offset = args[8]);
        args.length >= 10 && (this.text_offset_start = args[9]);
        args.length >= 11 && (this.text_offset_end = args[10]);
    }
}
let input_cursor: unnamed17_8 = new unnamed17_8();
export class unnamed31_8 {
    public string: number[] = new Array(ELLIPSIS_LENGTH).fill(0);
    public width: number[] = new Array(FONT_TYPES_MAX).fill(0);
    public constructor(...args: any[]) {
        args.length >= 1 && (this.string = args[0]);
        args.length >= 2 && (this.width = args[1]);
    }
}
let ellipsis: unnamed31_8 = new unnamed31_8();
function get_ellipsis_width(font: font_t) {
    if (!ellipsis.width[font]) {
        ellipsis.width[font] = text_get_width(ellipsis.string, font);
    }
    return ellipsis.width[font];
}
export function text_capture_cursor(cursor_position: number, offset_start: number, offset_end: number) {
    input_cursor.capture = 1;
    input_cursor.seen = 0;
    input_cursor.position = 0;
    input_cursor.width = 0;
    input_cursor.cursor_position = cursor_position;
    input_cursor.text_offset_start = offset_start;
    input_cursor.text_offset_end = offset_end;
}
export function text_draw_cursor(x_offset: number, y_offset: number, is_insert: number) {
    if (!input_cursor.capture) {
        return;
    }
    input_cursor.capture = 0;
    let curr: time_millis = time_get_millis();
    let diff: time_millis = curr - input_cursor.updated;
    if (!input_cursor.visible && diff >= 200) {
        input_cursor.visible = 1;
        input_cursor.updated = curr;
    } else if (input_cursor.visible && diff >= 400) {
        input_cursor.visible = 0;
        input_cursor.updated = curr;
    }
    if (input_cursor.visible) {
        if (is_insert) {
            graphics_draw_horizontal_line(
                x_offset + input_cursor.x_offset - 3, x_offset + input_cursor.x_offset + 1,
                y_offset + input_cursor.y_offset - 3, COLOR_WHITE);
            graphics_draw_vertical_line(
                x_offset + input_cursor.x_offset - 1, y_offset + input_cursor.y_offset - 3,
                y_offset + input_cursor.y_offset + 13, COLOR_WHITE);
            graphics_draw_horizontal_line(
                x_offset + input_cursor.x_offset - 3, x_offset + input_cursor.x_offset + 1,
                y_offset + input_cursor.y_offset + 14, COLOR_WHITE);
        } else {
            graphics_fill_rect(
                x_offset + input_cursor.x_offset, y_offset + input_cursor.y_offset + 14,
                input_cursor.width, 2, COLOR_WHITE);
        }
    }
}
export function text_get_width(str: number, font: font_t) {
    let def: font_definition = font_definition_for(font);
    let maxlen: number = 10000;
    let width: number = 0;
    while (* str && maxlen > 0) {
            int num_bytes = 1;
        if (* str == ' ') {
            width += def.space_width;
        } else {
                int letter_id = font_letter_id(def, str, num_bytes);
            if (letter_id >= 0) {
                width += def.letter_spacing + image_letter(letter_id).width;
            }
        }
        str += num_bytes;
        maxlen -= num_bytes;
    }
    return width;
}
function get_letter_width(str: number, def: font_definition, num_bytes: number) {
    * num_bytes = 1;
    if (* str == ' ') {
        return def.space_width;
    }
    let letter_id: number = font_letter_id(def, str, num_bytes);
    if (letter_id >= 0) {
        return def.letter_spacing + image_letter(letter_id).width;
    } else {
        return 0;
    }
}
export function text_get_max_length_for_width(str: number, length: number, font: font_t, requested_width: number, invert: number) {
    let def: font_definition = font_definition_for(font);
    if (!length) {
        length = string_length(str);
    }
    if (invert) {
        let maxlen: number = length;
        let width: number = 0;
        let s: number = str;
        while (maxlen) {
                    int num_bytes;
            width += get_letter_width(s, def, num_bytes);
            s += num_bytes;
            maxlen -= num_bytes;
        }
        maxlen = length;
        while (maxlen && width > requested_width) {
                    int num_bytes;
            width -= get_letter_width(str, def, num_bytes);
            str += num_bytes;
            maxlen -= num_bytes;
        }
        return maxlen;
    } else {
        let maxlen: number = length;
        let width: number = 0;
        while (maxlen) {
                    int num_bytes;
            width += get_letter_width(str, def, num_bytes);
            if (width > requested_width) {
                break;
            }
            str += num_bytes;
            maxlen -= num_bytes;
        }
        return length - maxlen;
    }
}
export function text_ellipsize(str: number, font: font_t, requested_width: number) {
    let orig_str: number = str;
    let def: font_definition = font_definition_for(font);
    let ellipsis_width: number = get_ellipsis_width(font);
    let maxlen: number = 10000;
    let width: number = 0;
    let length_with_ellipsis: number = 0;
    while (* str && maxlen > 0) {
            int num_bytes = 1;
        if (* str == ' ') {
            width += def.space_width;
        } else {
                int letter_id = font_letter_id(def, str, num_bytes);
            if (letter_id >= 0) {
                width += def.letter_spacing + image_letter(letter_id).width;
            }
        }
        if (ellipsis_width + width <= requested_width) {
            length_with_ellipsis += num_bytes;
        }
        if (width > requested_width) {
            break;
        }
        str += num_bytes;
        maxlen -= num_bytes;
    }
    if (10000 - maxlen < string_length(orig_str)) {
        string_copy(ellipsis.string, orig_str + length_with_ellipsis, ELLIPSIS_LENGTH);
    }
}
function get_word_width(str: number, font: font_t, out_num_chars: number) {
    let def: font_definition = font_definition_for(font);
    let width: number = 0;
    let guard: number = 0;
    let word_char_seen: number = 0;
    let num_chars: number = 0;
    while (* str && ++guard < 200) {
            int num_bytes = 1;
        if (* str == ' ' || * str == '\n') {
            if (word_char_seen) {
                break;
            }
            width += def.space_width;
        } else if (* str == '$') {
            if (word_char_seen) {
                break;
            }
        } else if (* str > ' ') {
                // normal char
                int letter_id = font_letter_id(def, str, num_bytes);
            if (letter_id >= 0) {
                width += image_letter(letter_id).width + def.letter_spacing;
            }
            word_char_seen = 1;
            if (num_bytes > 1) {
                num_chars += num_bytes;
                break;
            }
        }
        str += num_bytes;
        num_chars += num_bytes;
    }
    * out_num_chars = num_chars;
    return width;
}
export function text_draw_centered(str: number, x: number, y: number, box_width: number, font: font_t, color: color_t) {
    let offset: number = (box_width - text_get_width(str, font)) / 2;
    if (offset < 0) {
        offset = 0;
    }
    text_draw(str, offset + x, y, font, color);
}
export function text_draw_ellipsized(str: number, x: number, y: number, box_width: number, font: font_t, color: color_t) {
    let buffer: number[];
    string_copy(str, buffer, 1000);
    text_ellipsize(buffer, font, box_width);
    text_draw(buffer, x, y, font, color);
}
export function text_draw(str: number, x: number, y: number, font: font_t, color: color_t) {
    let def: font_definition = font_definition_for(font);
    let length: number = string_length(str);
    if (input_cursor.capture) {
        str += input_cursor.text_offset_start
        length = input_cursor.text_offset_end - input_cursor.text_offset_start;
    }
    let current_x: number = x;
    while (length > 0) {
            int num_bytes = 1;

        if (* str >= ' ') {
                int letter_id = font_letter_id(def, str, num_bytes);
                int width;
            if (* str == ' ' || * str == '_' || letter_id < 0) {
                width = def.space_width;
            } else {
                const image * img = image_letter(letter_id);
                    int height = def.image_y_offset(* str, img.height, def.line_height);
                image_draw_letter(def.font, letter_id, current_x, y - height, color);
                width = def.letter_spacing + img.width;
            }
            if (input_cursor.capture && input_cursor.position == input_cursor.cursor_position) {
                if (!input_cursor.seen) {
                    input_cursor.width = width;
                    input_cursor.x_offset = current_x - x;
                    input_cursor.seen = 1;
                }
            }
            current_x += width;
        }

        str += num_bytes;
        length -= num_bytes;
        input_cursor.position += num_bytes;
    }
    if (input_cursor.capture && !input_cursor.seen) {
        input_cursor.width = 4;
        input_cursor.x_offset = current_x - x;
        input_cursor.seen = 1;
    }
    current_x += def.space_width
    return current_x - x;
}
function number_to_string(str: number, value: number, prefix: char, postfix: char) {
    let offset: number = 0;
    if (prefix) {
        str[offset++] = prefix;
    }
    offset += string_from_int(str[offset], value, 0)
    while (* postfix) {
        str[offset++] = * postfix;
        postfix++;
    }
    str[offset] = 0;
    return offset;
}
export function text_draw_number(value: number, prefix: char, postfix: char, x_offset: number, y_offset: number, font: font_t) {
    let str: number[];
    number_to_string(str, value, prefix, postfix);
    return text_draw(str, x_offset, y_offset, font, 0);
}
export function text_draw_number_colored(value: number, prefix: char, postfix: char, x_offset: number, y_offset: number, font: font_t, color: color_t) {
    let str: number[];
    number_to_string(str, value, prefix, postfix);
    return text_draw(str, x_offset, y_offset, font, color);
}
export function text_draw_money(value: number, x_offset: number, y_offset: number, font: font_t) {
    let str: number[];
    let money_len: number = number_to_string(str, value, '@', " ");
    let postfix: number;
    if (locale_translate_money_dn()) {
        postfix = lang_get_string(6, 0);
    } else {
        postfix = string_from_ascii("Dn");
    }
    string_copy(postfix, str + money_len, NUMBER_BUFFER_LENGTH - money_len - 1);
    return text_draw(str, x_offset, y_offset, font, 0);
}
export function text_draw_percentage(value: number, x_offset: number, y_offset: number, font: font_t) {
    let str: number[];
    number_to_string(str, value, '@', "%");
    return text_draw(str, x_offset, y_offset, font, 0);
}
export function text_draw_number_centered(value: number, x_offset: number, y_offset: number, box_width: number, font: font_t) {
    let str: number[];
    number_to_string(str, value, '@', " ");
    text_draw_centered(str, x_offset, y_offset, box_width, font, 0);
}
export function text_draw_number_centered_prefix(value: number, prefix: char, x_offset: number, y_offset: number, box_width: number, font: font_t) {
    let str: number[];
    number_to_string(str, value, prefix, " ");
    text_draw_centered(str, x_offset, y_offset, box_width, font, 0);
}
export function text_draw_number_centered_colored(value: number, x_offset: number, y_offset: number, box_width: number, font: font_t, color: color_t) {
    let str: number[];
    number_to_string(str, value, '@', " ");
    text_draw_centered(str, x_offset, y_offset, box_width, font, color);
}
export function text_draw_multiline(str: number, x_offset: number, y_offset: number, box_width: number, font: font_t, color: number) {
    let line_height: number = font_definition_for(font).line_height;
    if (line_height < 11) {
        line_height = 11;
    }
    let has_more_characters: number = 1;
    let guard: number = 0;
    let y: number = y_offset;
    while (has_more_characters) {
        if (++guard >= 100) {
            break;
        }
        // clear line
        for (int i = 0; i < 200; i++) {
            tmp_line[i] = 0;
        }
            int current_width = 0;
            int line_index = 0;
        while (has_more_characters && current_width < box_width) {
                int word_num_chars;
                int word_width = get_word_width(str, font, word_num_chars);
            current_width += word_width;
            if (current_width >= box_width) {
                if (current_width == 0) {
                    has_more_characters = 0;
                }
            } else {
                for (int i = 0; i < word_num_chars; i++) {
                    if (line_index == 0 && * str <= ' ') {
                        str++; // skip whitespace at start of line
                    } else {
                        tmp_line[line_index++] = * str++;
                    }
                }
                if (!* str) {
                    has_more_characters = 0;
                } else if (* str == '\n') {
                    str++;
                    break;
                }
            }
        }
        text_draw(tmp_line, x_offset, y, font, color);
        y += line_height + 5;
    }
    return y - y_offset;
}
export function text_measure_multiline(str: number, box_width: number, font: font_t) {
    let has_more_characters: number = 1;
    let guard: number = 0;
    let num_lines: number = 0;
    while (has_more_characters) {
        if (++guard >= 100) {
            break;
        }
            int current_width = 0;
        while (has_more_characters && current_width < box_width) {
                int word_num_chars;
                int word_width = get_word_width(str, font, word_num_chars);
            current_width += word_width;
            if (current_width >= box_width) {
                if (current_width == 0) {
                    has_more_characters = 0;
                }
            } else {
                str += word_num_chars;
                if (!* str) {
                    has_more_characters = 0;
                } else if (* str == '\n') {
                    str++;
                    break;
                }
            }
        }
        num_lines += 1;
    }
    return num_lines;
}
