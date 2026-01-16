import { image, image_letter } from 'core/image';
import { lang_get_string } from 'core/lang';
import { locale_translate_money_dn } from 'core/locale';
import { string_copy, string_from_ascii, string_from_bytes, string_from_int, string_length } from 'core/string';
import { time_get_millis, time_millis } from 'core/time';
import { color_t, COLOR_WHITE } from 'graphics/color';
import { font_definition, font_definition_for, font_letter_id, font_t } from 'graphics/font';
import { graphics_draw_horizontal_line, graphics_draw_vertical_line, graphics_fill_rect } from 'graphics/graphics';
import { image_draw_letter } from 'graphics/image';
import { Ref } from '../../ext/crt';
export const ELLIPSIS_LENGTH = 4;
export const NUMBER_BUFFER_LENGTH = 100;
import FONT_TYPES_MAX = font_t.FONT_TYPES_MAX;
let tmp_line: number[] = new Array(200);
export class unnamed17_8 {
    public capture: number = 0;
    public seen: number = 0;
    public position: number = 0;
    public cursor_position: number = 0;
    public width: number = 0;
    public visible: number = 0;
    public updated: time_millis = 0;
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
    public string: string = "";
    public width: number[] = new Array(FONT_TYPES_MAX).fill(0);
    public constructor(...args: any[]) {
        args.length >= 1 && (this.string = args[0]);
        args.length >= 2 && (this.width = args[1]);
    }
}
let ellipsis: unnamed31_8 = new unnamed31_8();
function to_text(input: string | ArrayLike<number>): string {
    return typeof input === "string" ? input : string_from_bytes(input);
}
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
export function text_get_width(str: string | ArrayLike<number>, font: font_t): number {
    const text = to_text(str);
    let def: font_definition = font_definition_for(font);
    let maxlen: number = 10000;
    let width: number = 0;
    let strIndex: number = 0;
    while (text.charCodeAt(strIndex) && maxlen > 0) {
        let num_bytes = new Ref<number>(1);
        if (text.charCodeAt(strIndex) === 32) { // ' ' (space)
            width += def.space_width;
        } else {
            let letter_id: number = font_letter_id(def, text, num_bytes);
            if (letter_id >= 0) {
                width += def.letter_spacing + image_letter(letter_id).width;
            }
        }
        strIndex += num_bytes.v;
        maxlen -= num_bytes.v;
    }
    return width;
}
function get_letter_width(str: string, strIndex: number, def: font_definition, num_bytes: Ref<number>): number {
    num_bytes.v = 1;
    if (str.charCodeAt(strIndex) === 32) { // ' ' (space)
        return def.space_width;
    }
    let letter_id: number = font_letter_id(def, str, num_bytes, strIndex);
    if (letter_id >= 0) {
        return def.letter_spacing + image_letter(letter_id).width;
    } else {
        return 0;
    }
}
export function text_get_max_length_for_width(str: string | ArrayLike<number>, length: number, font: font_t, requested_width: number, invert: number): number {
    const text = to_text(str);
    let def: font_definition = font_definition_for(font);
    if (!length) {
        length = string_length(text);
    }
    if (invert) {
        let maxlen: number = length;
        let width: number = 0;
        let strIndex: number = 0;
        while (maxlen > 0) {
            let num_bytes = new Ref<number>(1);
            width += get_letter_width(text, strIndex, def, num_bytes);
            strIndex += num_bytes.v;
            maxlen -= num_bytes.v;
        }
        maxlen = length;
        strIndex = 0;
        while (maxlen > 0 && width > requested_width) {
            let num_bytes = new Ref<number>(1);
            width -= get_letter_width(text, strIndex, def, num_bytes);
            strIndex += num_bytes.v;
            maxlen -= num_bytes.v;
        }
        return maxlen;
    } else {
        let maxlen: number = length;
        let width: number = 0;
        let strIndex: number = 0;
        while (maxlen > 0) {
            let num_bytes = new Ref<number>(1);
            width += get_letter_width(text, strIndex, def, num_bytes);
            if (width > requested_width) {
                break;
            }
            strIndex += num_bytes.v;
            maxlen -= num_bytes.v;
        }
        return length - maxlen;
    }
}
export function text_ellipsize(str: string | ArrayLike<number>, font: font_t, requested_width: number): void {
    const text = to_text(str);
    let orig_str: string = text;
    let def: font_definition = font_definition_for(font);
    let ellipsis_width: number = get_ellipsis_width(font);
    let maxlen: number = 10000;
    let width: number = 0;
    let length_with_ellipsis: number = 0;
    let strIndex: number = 0;
    while (text.charCodeAt(strIndex) && maxlen > 0) {
        let num_bytes = new Ref<number>(1);
        if (text.charCodeAt(strIndex) === 32) { // ' ' (space)
            width += def.space_width;
        } else {
            let letter_id: number = font_letter_id(def, text, num_bytes, strIndex);
            if (letter_id >= 0) {
                width += def.letter_spacing + image_letter(letter_id).width;
            }
        }
        if (ellipsis_width + width <= requested_width) {
            length_with_ellipsis += num_bytes.v;
        }
        if (width > requested_width) {
            break;
        }
        strIndex += num_bytes.v;
        maxlen -= num_bytes.v;
    }
    if (10000 - maxlen < string_length(orig_str)) {
        if (typeof str !== "string") {
            string_copy(ellipsis.string, str, length_with_ellipsis, ELLIPSIS_LENGTH);
        }
    }
}
function get_word_width(str: string, strIndex: number, font: font_t, out_num_chars: number[]): number {
    let def: font_definition = font_definition_for(font);
    let width: number = 0;
    let guard: number = 0;
    let word_char_seen: number = 0;
    let num_chars: number = 0;
    while (str.charCodeAt(strIndex) && ++guard < 200) {
        let num_bytes = new Ref<number>(1);
        if (str.charCodeAt(strIndex) === 32 || str.charCodeAt(strIndex) === 10) { // ' ' or '\n'
            if (word_char_seen) {
                break;
            }
            width += def.space_width;
        } else if (str.charCodeAt(strIndex) === 36) { // '$'
            if (word_char_seen) {
                break;
            }
        } else if (str.charCodeAt(strIndex) > 32) {
            // normal char
            let letter_id: number = font_letter_id(def, str, num_bytes, strIndex);
            if (letter_id >= 0) {
                width += image_letter(letter_id).width + def.letter_spacing;
            }
            word_char_seen = 1;
            if (num_bytes.v > 1) {
                num_chars += num_bytes.v;
                break;
            }
        }
        strIndex += num_bytes.v;
        num_chars += num_bytes.v;
    }
    out_num_chars[0] = num_chars;
    return width;
}
export function text_draw_centered(str: string | ArrayLike<number>, x: number, y: number, box_width: number, font: font_t, color: color_t) {
    const text = to_text(str);
    let offset: number = (box_width - text_get_width(text, font)) / 2;
    if (offset < 0) {
        offset = 0;
    }
    text_draw(text, offset + x, y, font, color);
}
export function text_draw_ellipsized(str: string | ArrayLike<number>, x: number, y: number, box_width: number, font: font_t, color: color_t): void {
    const text = to_text(str);
    let buffer: number[] = new Array(1000).fill(0);
    string_copy(text, buffer, 1000);
    text_ellipsize(buffer, font, box_width);
    text_draw(buffer, x, y, font, color);
}
export function text_draw(str: string | ArrayLike<number>, x: number, y: number, font: font_t, color: color_t): number {
    const text = to_text(str);
    let def: font_definition = font_definition_for(font);
    let length: number = string_length(text);
    let strIndex: number = 0;
    if (input_cursor.capture) {
        strIndex = input_cursor.text_offset_start;
        length = input_cursor.text_offset_end - input_cursor.text_offset_start;
    }
    let current_x: number = x;
    while (length > 0) {
        let num_bytes = new Ref<number>(1);

        if (text.charCodeAt(strIndex) >= 32) { // ' ' (space)
            let letter_id: number = font_letter_id(def, text, num_bytes, strIndex);
            let width: number;
            if (text.charCodeAt(strIndex) === 32 || text.charCodeAt(strIndex) === 95 || letter_id < 0) { // ' ' or '_'
                width = def.space_width;
            } else {
                const img: image = image_letter(letter_id);
                let height: number = def.image_y_offset(text.charCodeAt(strIndex), img.height, def.line_height);
                image_draw_letter(def.font, letter_id, current_x, y - height, color);
                width = def.letter_spacing + img.width;
            }
            if (input_cursor.capture && input_cursor.position === input_cursor.cursor_position) {
                if (!input_cursor.seen) {
                    input_cursor.width = width;
                    input_cursor.x_offset = current_x - x;
                    input_cursor.seen = 1;
                }
            }
            current_x += width;
        }

        strIndex += num_bytes.v;
        length -= num_bytes.v;
        input_cursor.position += num_bytes.v;
    }
    if (input_cursor.capture && !input_cursor.seen) {
        input_cursor.width = 4;
        input_cursor.x_offset = current_x - x;
        input_cursor.seen = 1;
    }
    current_x += def.space_width;
    return current_x - x;
}
function number_to_string(str: Uint8Array, value: number, prefix: string, postfix: string): number {
    let offset: number = 0;
    if (prefix) {
        str[offset++] = prefix.charCodeAt(0);
    }
    offset += string_from_int(str.subarray(offset), value, 0);
    let postfixIndex: number = 0;
    while (postfix[postfixIndex]) {
        str[offset++] = postfix.charCodeAt(postfixIndex++);
    }
    str[offset] = 0;
    return offset;
}
export function text_draw_number(value: number, prefix: string, postfix: string, x_offset: number, y_offset: number, font: font_t): number {
    let str: Uint8Array = new Uint8Array(NUMBER_BUFFER_LENGTH);
    number_to_string(str, value, prefix, postfix);
    return text_draw(str, x_offset, y_offset, font, 0);
}
export function text_draw_number_colored(value: number, prefix: string, postfix: string, x_offset: number, y_offset: number, font: font_t, color: color_t): number {
    let str: Uint8Array = new Uint8Array(NUMBER_BUFFER_LENGTH);
    number_to_string(str, value, prefix, postfix);
    return text_draw(str, x_offset, y_offset, font, color);
}
export function text_draw_money(value: number, x_offset: number, y_offset: number, font: font_t): number {
    let str: Uint8Array = new Uint8Array(NUMBER_BUFFER_LENGTH);
    let money_len: number = number_to_string(str, value, '@', " ");
    let postfix: string | Uint8Array;
    if (locale_translate_money_dn()) {
        postfix = lang_get_string(6, 0);
    } else {
        postfix = string_from_ascii("Dn");
    }
    string_copy(postfix, str, money_len, NUMBER_BUFFER_LENGTH - money_len - 1);
    return text_draw(str, x_offset, y_offset, font, 0);
}
export function text_draw_percentage(value: number, x_offset: number, y_offset: number, font: font_t): number {
    let str: Uint8Array = new Uint8Array(NUMBER_BUFFER_LENGTH);
    number_to_string(str, value, '@', "%");
    return text_draw(str, x_offset, y_offset, font, 0);
}
export function text_draw_number_centered(value: number, x_offset: number, y_offset: number, box_width: number, font: font_t): void {
    let str: Uint8Array = new Uint8Array(NUMBER_BUFFER_LENGTH);
    number_to_string(str, value, '@', " ");
    text_draw_centered(str, x_offset, y_offset, box_width, font, 0);
}
export function text_draw_number_centered_prefix(value: number, prefix: string, x_offset: number, y_offset: number, box_width: number, font: font_t): void {
    let str: Uint8Array = new Uint8Array(NUMBER_BUFFER_LENGTH);
    number_to_string(str, value, prefix, " ");
    text_draw_centered(str, x_offset, y_offset, box_width, font, 0);
}
export function text_draw_number_centered_colored(value: number, x_offset: number, y_offset: number, box_width: number, font: font_t, color: color_t): void {
    let str: Uint8Array = new Uint8Array(NUMBER_BUFFER_LENGTH);
    number_to_string(str, value, '@', " ");
    text_draw_centered(str, x_offset, y_offset, box_width, font, color);
}
export function text_draw_multiline(str: string | ArrayLike<number>, x_offset: number, y_offset: number, box_width: number, font: font_t, color: number): number {
    const text = to_text(str);
    let line_height: number = font_definition_for(font).line_height;
    if (line_height < 11) {
        line_height = 11;
    }
    let has_more_characters: number = 1;
    let guard: number = 0;
    let y: number = y_offset;
    let strIndex: number = 0;
    while (has_more_characters) {
        if (++guard >= 100) {
            break;
        }
        // clear line
        for (let i: number = 0; i < 200; i++) {
            tmp_line[i] = 0;
        }
        let current_width: number = 0;
        let line_index: number = 0;
        while (has_more_characters && current_width < box_width) {
            let word_num_chars: number[] = [0];
            let word_width: number = get_word_width(text, strIndex, font, word_num_chars);
            current_width += word_width;
            if (current_width >= box_width) {
                if (current_width === 0) {
                    has_more_characters = 0;
                }
            } else {
                for (let i: number = 0; i < word_num_chars[0]; i++) {
                    if (line_index === 0 && text.charCodeAt(strIndex) <= 32) { // ' ' (space)
                        strIndex++; // skip whitespace at start of line
                    } else {
                        tmp_line[line_index++] = text.charCodeAt(strIndex++);
                    }
                }
                if (!text.charCodeAt(strIndex)) {
                    has_more_characters = 0;
                } else if (text.charCodeAt(strIndex) === 10) { // '\n'
                    strIndex++;
                    break;
                }
            }
        }
        text_draw(tmp_line, x_offset, y, font, color);
        y += line_height + 5;
    }
    return y - y_offset;
}
export function text_measure_multiline(str: string | ArrayLike<number>, box_width: number, font: font_t): number {
    const text = to_text(str);
    let has_more_characters: number = 1;
    let guard: number = 0;
    let num_lines: number = 0;
    let strIndex: number = 0;
    while (has_more_characters) {
        if (++guard >= 100) {
            break;
        }
        let current_width: number = 0;
        while (has_more_characters && current_width < box_width) {
            let word_num_chars: number[] = [0];
            let word_width: number = get_word_width(text, strIndex, font, word_num_chars);
            current_width += word_width;
            if (current_width >= box_width) {
                if (current_width === 0) {
                    has_more_characters = 0;
                }
            } else {
                strIndex += word_num_chars[0];
                if (!text.charCodeAt(strIndex)) {
                    has_more_characters = 0;
                } else if (text.charCodeAt(strIndex) === 10) { // '\n'
                    strIndex++;
                    break;
                }
            }
        }
        num_lines += 1;
    }
    return num_lines;
}
