
import { language_type } from 'core/locale';;
import { encoding_type } from 'core/encoding';
import { encoding_is_multibyte } from 'core/encoding';
import { encoding_from_utf8 } from 'core/encoding';
import { font_t } from 'graphics/font';
import { font_definition } from 'graphics/font';
import { string_copy } from 'core/string';
import { string_length } from 'core/string';
import { color_t } from 'graphics/color';
import { key_type } from 'input/keys';
import { key_modifier_type } from 'input/keys';
import { system_keyboard_hide } from 'game/system';
import { system_start_text_input } from 'game/system';
import { system_stop_text_input } from 'game/system';
import { time_millis } from 'core/time';
import { touch_coords } from 'input/touch';
import { touch_mode } from 'input/touch';
import { touch } from 'input/touch';
import { mouse_button } from 'input/mouse';
import { scroll_state } from 'input/mouse';
import { mouse } from 'input/mouse';
import { text_get_max_length_for_width } from 'graphics/text';
export class unnamed8_8 {
    public insert: number = 0;
    public capture: number = 0;
    public accepted: number = 0;
    public capture_numeric: number = 0;
    public capture_numeric_callback: void ( = null;
    public text: number = 0;
    public cursor_position: number = 0;
    public length: number = 0;
    public max_length: number = 0;
    public allow_punctuation: number = 0;
    public viewport_start: number = 0;
    public viewport_end: number = 0;
    public viewport_cursor_position: number = 0;
    public box_width: number = 0;
    public font: font_t = null;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.insert = args[0]);
        args.length >= 2 && (this.capture = args[1]);
        args.length >= 3 && (this.accepted = args[2]);
        args.length >= 4 && (this.capture_numeric = args[3]);
        args.length >= 5 && (this.capture_numeric_callback = args[4]);
        args.length >= 6 && (this.text = args[5]);
        args.length >= 7 && (this.cursor_position = args[6]);
        args.length >= 8 && (this.length = args[7]);
        args.length >= 9 && (this.max_length = args[8]);
        args.length >= 10 && (this.allow_punctuation = args[9]);
        args.length >= 11 && (this.viewport_start = args[10]);
        args.length >= 12 && (this.viewport_end = args[11]);
        args.length >= 13 && (this.viewport_cursor_position = args[12]);
        args.length >= 14 && (this.box_width = args[13]);
        args.length >= 15 && (this.font = args[14]);
    }
}
let data: unnamed8_8 = new unnamed8_8();
function get_char_bytes(str: number) {
    return str[0] >= 0x80 && encoding_is_multibyte() ? 2 : 1;
}
function get_current_char_bytes() {
    return get_char_bytes(data.text[data.cursor_position]);
}
function set_viewport_to_start() {
    data.viewport_start = 0;
    data.viewport_end = text_get_max_length_for_width(data.text, data.length, data.font, data.box_width, 0);
}
function set_viewport_to_end() {
    data.viewport_end = data.length;
    let maxlen: number = text_get_max_length_for_width(data.text, data.length, data.font, data.box_width, 1);
    data.viewport_start = data.length - maxlen;
}
function include_cursor_in_viewport() {
    let new_start: number = data.viewport_start;
    let new_end: number = text_get_max_length_for_width(data.text, data.length - new_start, data.font, data.box_width, 0);
    if (data.cursor_position >= new_start && data.cursor_position < new_end && new_start + new_end < data.length) {
        return;
    }
    if (data.cursor_position <= data.viewport_cursor_position) {
        let maxlen: number = text_get_max_length_for_width(
            data.text + data.cursor_position,
            data.length - data.cursor_position,
            data.font, data.box_width, 0);
        if (data.cursor_position + maxlen < data.length) {
            data.viewport_start = data.cursor_position;
            data.viewport_end = data.cursor_position + maxlen;
        } else {
            set_viewport_to_end();
        }
    } else {
        let viewport_length: number = data.cursor_position + get_current_char_bytes();
        let maxlen: number = text_get_max_length_for_width(
            data.text, viewport_length, data.font, data.box_width, 1);
        if (maxlen < viewport_length) {
            data.viewport_start = viewport_length - maxlen;
            data.viewport_end = viewport_length;
        } else {
            set_viewport_to_start();
        }
    }
}
function update_viewport(has_changed: number) {
    let is_within_viewport: number = data.cursor_position >= data.viewport_start &&
        data.cursor_position < data.viewport_end;
    if (!has_changed && is_within_viewport) {
    } else if (data.cursor_position == 0) {
        set_viewport_to_start();
    } else if (data.cursor_position == data.length) {
        set_viewport_to_end();
    } else {
        include_cursor_in_viewport();
    }
    data.viewport_cursor_position = data.cursor_position;
}
export function keyboard_start_capture(text: number, max_length: number, allow_punctuation: number, box_width: number, font: font_t) {
    data.capture = 1;
    data.text = text;
    data.length = string_length(text);
    data.cursor_position = data.length;
    data.max_length = max_length;
    data.allow_punctuation = allow_punctuation;
    data.accepted = 0;
    data.box_width = box_width;
    data.font = font;
    update_viewport(1);
    system_start_text_input();
}
export function keyboard_refresh() {
    data.length = string_length(data.text);
    data.cursor_position = data.length;
    update_viewport(1);
}
export function keyboard_resume_capture() {
    data.capture = 1;
    system_start_text_input();
}
export function keyboard_pause_capture() {
    data.capture = 0;
    system_keyboard_hide();
    system_stop_text_input();
}
export function keyboard_stop_capture() {
    data.capture = 0;
    data.text = 0;
    data.cursor_position = 0;
    data.length = 0;
    data.max_length = 0;
    data.accepted = 0;
    system_keyboard_hide();
    system_stop_text_input();
}
export function keyboard_start_capture_numeric(callback: void () {
    data.capture_numeric = 1;
    data.capture_numeric_callback = callback;
    system_start_text_input();
}
export function keyboard_stop_capture_numeric() {
    data.capture_numeric = 0;
    data.capture_numeric_callback = 0;
    system_stop_text_input();
}
export function keyboard_input_is_accepted() {
    if (data.accepted) {
        data.accepted = 0;
        return 1;
    } else {
        return 0;
    }
}
export function keyboard_is_insert() {
    return data.insert;
}
export function keyboard_is_capturing() {
    return data.capture;
}
export function keyboard_cursor_position() {
    return data.cursor_position - data.viewport_start;
}
export function keyboard_offset_start() {
    return data.viewport_start;
}
export function keyboard_offset_end() {
    return data.viewport_end;
}
export function keyboard_return() {
    data.accepted = 1;
}
function move_left(start: number, end: number) {
    while (start < end) {
        start[0] = start[1];
        start++;
    }
    * start = 0;
}
function move_right(start: number, end: number) {
    end[1] = 0;
    while (end > start) {
        end--;
        end[1] = end[0];
    }
}
function move_cursor_left() {
    if (encoding_is_multibyte()) {
        let i: number = 0;
        let bytes: number = 0;
        while (i + bytes < data.cursor_position) {
            i += bytes;
            bytes = data.text[i] >= 0x80 ? 2 : 1;
        }
        data.cursor_position = i;
    } else {
        data.cursor_position--;
    }
}
function move_cursor_right() {
    data.cursor_position += get_current_char_bytes()
}
function insert_char(value: number, bytes: number) {
    if (data.length + bytes == data.max_length) {
        return;
    }
    for (let i: number = 0; i < bytes; i++) {
        move_right(data.text[data.cursor_position], data.text[data.length]);
        data.text[data.cursor_position] = value[i];
        data.cursor_position++;
    }
    data.length += bytes
}
function remove_current_char() {
    let bytes: number = get_current_char_bytes();
    for (let i: number = 0; i < bytes; i++) {
        move_left(data.text[data.cursor_position], data.text[data.length]);
    }
    data.length -= bytes
}
function add_char(value: number, bytes: number) {
    if (data.insert) {
        insert_char(value, bytes);
    } else {
        if (data.cursor_position < data.length) {
            remove_current_char();
        }
        insert_char(value, bytes);
    }
}
export function keyboard_backspace() {
    if (data.capture && data.cursor_position > 0) {
        move_cursor_left();
        remove_current_char();
        update_viewport(1);
    }
}
export function keyboard_delete() {
    if (data.capture && data.cursor_position < data.length) {
        remove_current_char();
        update_viewport(1);
    }
}
export function keyboard_insert() {
    data.insert ^= 1
}
export function keyboard_left() {
    if (data.capture) {
        if (data.cursor_position > 0) {
            move_cursor_left();
            update_viewport(0);
        }
    }
}
export function keyboard_right() {
    if (data.capture) {
        if (data.cursor_position < data.length) {
            move_cursor_right();
            update_viewport(0);
        }
    }
}
export function keyboard_home() {
    if (data.capture) {
        data.cursor_position = 0;
        update_viewport(0);
    }
}
export function keyboard_end() {
    if (data.capture) {
        data.cursor_position = data.length;
        update_viewport(0);
    }
}
function keyboard_character(text: number) {
    let c: number = text[0];
    let add: number = 0;
    if (c == ' ' || c == '-') {
        add = 1;
    } else if (c >= '0' && c <= '9') {
        add = 1;
    } else if (c >= 'a' && c <= 'z') {
        add = 1;
    } else if (c >= 'A' && c <= 'Z') {
        add = 1;
    } else if (c == ',' || c == '.' || c == '?' || c == '!') {
        add = data.allow_punctuation;
    } else if (c >= 0x80) {
        add = 1;
    }
    let bytes: number = get_char_bytes(text);
    if (add) {
        add_char(text, bytes);
        update_viewport(1);
    }
    return bytes;
}
export function keyboard_text(text_utf8: char) {
    if (data.capture_numeric) {
        let c: char = text_utf8[0];
        if (c >= '0' && c <= '9') {
            data.capture_numeric_callback(c - '0');
        }
        return;
    }
    if (!data.capture) {
        return;
    }
    let internal_char: number[];
    encoding_from_utf8(text_utf8, internal_char, 100);
    let index: number = 0;
    while (internal_char[index]) {
        index += keyboard_character(internal_char[index]);
    }
}
export function keyboard_get_text() {
    return data.text;
}
export function keyboard_set_text(text: number) {
    if (!data.capture) {
        return;
    }
    string_copy(text, data.text, data.max_length);
    keyboard_refresh();
}
export function keyboard_get_max_text_length() {
    return data.max_length;
}
