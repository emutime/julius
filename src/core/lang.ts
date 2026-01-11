export const enum lang_message_type {
    MESSAGE_TYPE_GENERAL = 0,
    MESSAGE_TYPE_DISASTER = 1,
    MESSAGE_TYPE_IMPERIAL = 2,
    MESSAGE_TYPE_EMIGRATION = 3,
    MESSAGE_TYPE_TUTORIAL = 4,
    MESSAGE_TYPE_TRADE_CHANGE = 5,
    MESSAGE_TYPE_PRICE_CHANGE = 6,
    MESSAGE_TYPE_INVASION = 7
};
export const enum lang_type {
    TYPE_MANUAL = 0,
    TYPE_ABOUT = 1,
    TYPE_MESSAGE = 2,
    TYPE_MISSION = 3
};
import { FILE_NAME_MAX } from 'core/file';
export const MAX_TEXT_ENTRIES = 1000;
export const MAX_TEXT_DATA = 200000;
export const BUFFER_SIZE = 400000;
export const MIN_TEXT_SIZE = 28;
export const MAX_TEXT_SIZE = 28;
export const MAX_MESSAGE_ENTRIES = 400;
export const MAX_MESSAGE_DATA = 460000;
export const MIN_MESSAGE_SIZE = 32024;
export const MAX_MESSAGE_SIZE = 32024;
export const FILE_TEXT_ENG = "c3.eng";
export const FILE_MM_ENG = "c3_mm.eng";
export const FILE_TEXT_RUS = "c3.rus";
export const FILE_MM_RUS = "c3_mm.rus";
export const FILE_EDITOR_TEXT_ENG = "c3_map.eng";
export const FILE_EDITOR_MM_ENG = "c3_map_mm.eng";
export const FILE_EDITOR_TEXT_RUS = "c3_map.rus";
export const FILE_EDITOR_MM_RUS = "c3_map_mm.rus";
export class lang_message_image {
    public id: number = 0;
    public x: number = 0;
    public y: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.id = args[0]);
        args.length >= 2 && (this.x = args[1]);
        args.length >= 3 && (this.y = args[2]);
    }
}
export class lang_message_string {
    public text: Uint8Array;
    public x: number = 0;
    public y: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.text = args[0]);
        args.length >= 2 && (this.x = args[1]);
        args.length >= 3 && (this.y = args[2]);
    }
}
export class lang_message {
    public type: lang_type = null;
    public message_type: lang_message_type = null;
    public x: number = 0;
    public y: number = 0;
    public width_blocks: number = 0;
    public height_blocks: number = 0;
    public urgent: number = 0;
    public image: lang_message_image = null;
    public title: lang_message_string = null;
    public subtitle: lang_message_string = null;
    public video: lang_message_string = null;
    public content: lang_message_string = null;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.type = args[0]);
        args.length >= 2 && (this.message_type = args[1]);
        args.length >= 3 && (this.x = args[2]);
        args.length >= 4 && (this.y = args[3]);
        args.length >= 5 && (this.width_blocks = args[4]);
        args.length >= 6 && (this.height_blocks = args[5]);
        args.length >= 7 && (this.urgent = args[6]);
        args.length >= 8 && (this.image = args[7]);
        args.length >= 9 && (this.title = args[8]);
        args.length >= 10 && (this.subtitle = args[9]);
        args.length >= 11 && (this.video = args[10]);
        args.length >= 12 && (this.content = args[11]);
    }
}
import { buffer } from 'core/buffer';
import { buffer_init } from 'core/buffer';
import { buffer_read_i16 } from 'core/buffer';
import { buffer_read_i32 } from 'core/buffer';
import { buffer_read_raw } from 'core/buffer';
import { buffer_skip } from 'core/buffer';
import { localized } from 'core/dir';
import NOT_LOCALIZED = localized.NOT_LOCALIZED;
import MAY_BE_LOCALIZED = localized.MAY_BE_LOCALIZED;
import MUST_BE_LOCALIZED = localized.MUST_BE_LOCALIZED;
import { file_exists } from 'core/file';
import { io_read_file_into_buffer } from 'core/io';
class text_entries {
    public offset: number = 0;
    public in_use: number = 0;
}
export class Data {
    public text_entries: text_entries[] = new Array(MAX_TEXT_ENTRIES);
    public text_data: Uint8Array = new Uint8Array(MAX_TEXT_DATA);
    public message_entries: lang_message[] = new Array(MAX_MESSAGE_ENTRIES).fill(null);
    public message_data: Uint8Array = new Uint8Array(MAX_MESSAGE_DATA);
    public constructor(...args: any[]) {
        args.length >= 1 && (this.text_entries = args[0]);
        args.length >= 2 && (this.text_data = args[1]);
        args.length >= 3 && (this.message_entries = args[2]);
        args.length >= 4 && (this.message_data = args[3]);
    }
}
let data: Data = new Data();
function file_exists_in_dir(dir: string, file: string) {
    let path: Uint8Array = new Uint8Array(2 * FILE_NAME_MAX);
    path[2 * FILE_NAME_MAX - 1] = 0;
    // strncpy and strncat would need to be implemented or use string operations
    let pathStr: string = dir + "/" + file;
    return file_exists(pathStr, NOT_LOCALIZED);
}
export function lang_dir_is_valid(dir: string) {
    if (file_exists_in_dir(dir, FILE_TEXT_ENG) && file_exists_in_dir(dir, FILE_MM_ENG)) {
        return 1;
    }
    if (file_exists_in_dir(dir, FILE_TEXT_RUS) && file_exists_in_dir(dir, FILE_MM_RUS)) {
        return 1;
    }
    return 0;
}
function parse_text(buf: buffer) {
    buffer_skip(buf, 28);
    for (let i: number = 0; i < MAX_TEXT_ENTRIES; i++) {
        data.text_entries[i].offset = buffer_read_i32(buf);
        data.text_entries[i].in_use = buffer_read_i32(buf);
    }
    buffer_read_raw(buf, data.text_data, MAX_TEXT_DATA);
}
function load_text(filename: string, localizable: number, buf_data: Uint8Array) {
    let buf: buffer;
    let filesize: number = io_read_file_into_buffer(filename, localizable, buf_data, BUFFER_SIZE);
    if (filesize < MIN_TEXT_SIZE || filesize > MAX_TEXT_SIZE) {
        return 0;
    }
    buffer_init(buf, buf_data, filesize);
    parse_text(buf);
    return 1;
}
function get_message_text(offset: number): Uint8Array {
    if (!offset) {
        return null;
    }
    return new Uint8Array(data.message_data.buffer, data.message_data.byteOffset + offset);
}
function parse_message(buf: buffer) {
    buffer_skip(buf, 24);
    for (let i: number = 0; i < MAX_MESSAGE_ENTRIES; i++) {
        let m: lang_message = data.message_entries[i];
        m.type = buffer_read_i16(buf);
        m.message_type = buffer_read_i16(buf);
        buffer_skip(buf, 2);
        m.x = buffer_read_i16(buf);
        m.y = buffer_read_i16(buf);
        m.width_blocks = buffer_read_i16(buf);
        m.height_blocks = buffer_read_i16(buf);
        m.image.id = buffer_read_i16(buf);
        m.image.x = buffer_read_i16(buf);
        m.image.y = buffer_read_i16(buf);
        buffer_skip(buf, 6);
        m.title.x = buffer_read_i16(buf);
        m.title.y = buffer_read_i16(buf);
        m.subtitle.x = buffer_read_i16(buf);
        m.subtitle.y = buffer_read_i16(buf);
        buffer_skip(buf, 4);
        m.video.x = buffer_read_i16(buf);
        m.video.y = buffer_read_i16(buf);
        buffer_skip(buf, 14);
        m.urgent = buffer_read_i32(buf);
        m.video.text = get_message_text(buffer_read_i32(buf));
        buffer_skip(buf, 4);
        m.title.text = get_message_text(buffer_read_i32(buf));
        m.subtitle.text = get_message_text(buffer_read_i32(buf));
        m.content.text = get_message_text(buffer_read_i32(buf));
    }
    buffer_read_raw(buf, data.message_data, MAX_MESSAGE_DATA);
}
function load_message(filename: string, localizable: number, data_buffer: Uint8Array) {
    let buf: buffer;
    let filesize: number = io_read_file_into_buffer(filename, localizable, data_buffer, BUFFER_SIZE);
    if (filesize < MIN_MESSAGE_SIZE || filesize > MAX_MESSAGE_SIZE) {
        return 0;
    }
    buffer_init(buf, data_buffer, filesize);
    parse_message(buf);
    return 1;
}
function load_files(text_filename: string, message_filename: string, localizable: number) {
    let buffer: Uint8Array = new Uint8Array(BUFFER_SIZE);
    if (!buffer) {
        return 0;
    }
    let success: number = load_text(text_filename, localizable, buffer) && load_message(message_filename, localizable, buffer);
    return success;
}
export function lang_load(is_editor: number) {
    if (is_editor) {
        return load_files(FILE_EDITOR_TEXT_RUS, FILE_EDITOR_MM_RUS, MAY_BE_LOCALIZED) ||
            load_files(FILE_EDITOR_TEXT_ENG, FILE_EDITOR_MM_ENG, MAY_BE_LOCALIZED);
    }
    return load_files(FILE_TEXT_ENG, FILE_MM_ENG, MUST_BE_LOCALIZED) ||
        load_files(FILE_TEXT_RUS, FILE_MM_RUS, MUST_BE_LOCALIZED) ||
        load_files(FILE_TEXT_ENG, FILE_MM_ENG, NOT_LOCALIZED) ||
        load_files(FILE_TEXT_RUS, FILE_MM_RUS, NOT_LOCALIZED);
}
export function lang_get_string(group: number, index: number) {
    let strIdx = data.text_data[data.text_entries[group].offset];
    let str: number;
    let prev: number = 0;
    const charCodeSpace = ' '.charCodeAt(0);
    while (index > 0) {
        str = data.text_data[strIdx++];
        if (!str && (prev >= charCodeSpace || prev == 0)) {
            --index;
        }
        prev = str;
        ++strIdx;
    }
    while (str < charCodeSpace) { // skip non-printables
        ++strIdx;
    }
    return new Uint8Array(data.text_data.buffer, strIdx);
}
export function lang_get_message(id: number) {
    return data.message_entries[id];
}
