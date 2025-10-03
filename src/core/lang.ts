export const  = 1;
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
import { __va_start } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vadefs';
import { __va_start } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vadefs';;
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
    public text: number = 0;
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
import { dir_listing } from 'core/dir';
import { _invalid_parameter_noinfo } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt';
import { __local_stdio_printf_options } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_stdio_config';
import { __local_stdio_scanf_options } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_stdio_config';
import { __acrt_iob_func } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstdio';
import { __stdio_common_vfwprintf } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstdio';
import { __stdio_common_vfwprintf_s } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstdio';
import { __stdio_common_vfwprintf_p } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstdio';
import { _vfwprintf_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstdio';
import { _vfwprintf_s_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstdio';
import { _vfwprintf_p_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstdio';
import { __stdio_common_vfwscanf } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstdio';
import { _vfwscanf_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstdio';
import { _vfwscanf_s_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstdio';
import { __stdio_common_vswprintf } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstdio';
import { __stdio_common_vswprintf_s } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstdio';
import { __stdio_common_vsnwprintf_s } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstdio';
import { __stdio_common_vswprintf_p } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstdio';
import { _vsnwprintf_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstdio';
import { _vsnwprintf_s_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstdio';
import { _vswprintf_c_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstdio';
import { _vswprintf_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstdio';
import { __vswprintf_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstdio';
import { _vswprintf_s_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstdio';
import { _vswprintf_p_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstdio';
import { _vscwprintf_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstdio';
import { _vscwprintf_p_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstdio';
import { __stdio_common_vswscanf } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstdio';
import { _vswscanf_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstdio';
import { _vswscanf_s_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstdio';
import { _vsnwscanf_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstdio';
import { _vsnwscanf_s_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstdio';
import { __stdio_common_vfprintf } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdio';
import { __stdio_common_vfprintf_s } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdio';
import { __stdio_common_vfprintf_p } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdio';
import { _vfprintf_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdio';
import { _vfprintf_s_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdio';
import { _vfprintf_p_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdio';
import { __stdio_common_vfscanf } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdio';
import { _vfscanf_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdio';
import { _vfscanf_s_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdio';
import { __stdio_common_vsprintf } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdio';
import { __stdio_common_vsprintf_s } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdio';
import { __stdio_common_vsnprintf_s } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdio';
import { __stdio_common_vsprintf_p } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdio';
import { _vsnprintf_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdio';
import { _vsnprintf } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdio';
import { vsnprintf } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdio';
import { vsnprintf } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdio';
import { _vsprintf_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdio';
import { _vsprintf_s_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdio';
import { _vsprintf_p_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdio';
import { _vsnprintf_s_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdio';
import { _vscprintf_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdio';
import { _vscprintf_p_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdio';
import { _vscprintf_p } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdio';
import { _vsnprintf_c_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdio';
import { __stdio_common_vsscanf } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdio';
import { _vsscanf_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdio';
import { _vsscanf_s_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdio';
import { vsscanf_s } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdio';
import { free } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_malloc';
import { free } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_malloc';
import { malloc } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_malloc';
import { malloc } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_malloc';
import { _errno } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stddef';
import { _errno } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdlib';
import { file_exists } from 'core/file';
import { io_read_file_into_buffer } from 'core/io';
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
class unnamed33_5 {
    public offset: number = 0;
    public in_use: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.offset = args[0]);
        args.length >= 2 && (this.in_use = args[1]);
    }
}
export class unnamed32_8 {
    public text_entries: text_entries = new Array(MAX_TEXT_ENTRIES).fill(null);
    public text_data: number[] = new Array(MAX_TEXT_DATA).fill(0);
    public message_entries: lang_message[] = new Array(MAX_MESSAGE_ENTRIES).fill(null);
    public message_data: number[] = new Array(MAX_MESSAGE_DATA).fill(0);
    public constructor(...args: any[]) {
        args.length >= 1 && (this.text_entries = args[0]);
        args.length >= 2 && (this.text_data = args[1]);
        args.length >= 3 && (this.message_entries = args[2]);
        args.length >= 4 && (this.message_data = args[3]);
    }
}
let data: unnamed32_8 = new unnamed32_8();
function file_exists_in_dir(dir: char, file: char) {
    let path: char[];
    path[2 * FILE_NAME_MAX - 1] = 0;
    strncpy(path, dir, 2 * FILE_NAME_MAX - 1);
    strncat(path, "/", 2 * FILE_NAME_MAX - 1);
    strncat(path, file, 2 * FILE_NAME_MAX - 1);
    return file_exists(path, NOT_LOCALIZED);
}
export function lang_dir_is_valid(dir: char) {
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
function load_text(filename: char, localizable: number, buf_data: number) {
    let buf: buffer;
    let filesize: number = io_read_file_into_buffer(filename, localizable, buf_data, BUFFER_SIZE);
    if (filesize < MIN_TEXT_SIZE || filesize > MAX_TEXT_SIZE) {
        return 0;
    }
    buffer_init(buf, buf_data, filesize);
    parse_text(buf);
    return 1;
}
function get_message_text(offset: number) {
    if (!offset) {
        return 0;
    }
    return data.message_data[offset];
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
function load_message(filename: char, localizable: number, data_buffer: number) {
    let buf: buffer;
    let filesize: number = io_read_file_into_buffer(filename, localizable, data_buffer, BUFFER_SIZE);
    if (filesize < MIN_MESSAGE_SIZE || filesize > MAX_MESSAGE_SIZE) {
        return 0;
    }
    buffer_init(buf, data_buffer, filesize);
    parse_message(buf);
    return 1;
}
function load_files(text_filename: char, message_filename: char, localizable: number) {
    let buffer: number = (uint8_t *) malloc(BUFFER_SIZE);
    if (!buffer) {
        return 0;
    }
    let success: number = load_text(text_filename, localizable, buffer) && load_message(message_filename, localizable, buffer);
    free(buffer);
    return success;
}
export function lang_load(is_editor: number) {
    if (is_editor) {
        return
        load_files(FILE_EDITOR_TEXT_RUS, FILE_EDITOR_MM_RUS, MAY_BE_LOCALIZED) ||
            load_files(FILE_EDITOR_TEXT_ENG, FILE_EDITOR_MM_ENG, MAY_BE_LOCALIZED);
    }
    return
    load_files(FILE_TEXT_ENG, FILE_MM_ENG, MUST_BE_LOCALIZED) ||
        load_files(FILE_TEXT_RUS, FILE_MM_RUS, MUST_BE_LOCALIZED) ||
        load_files(FILE_TEXT_ENG, FILE_MM_ENG, NOT_LOCALIZED) ||
        load_files(FILE_TEXT_RUS, FILE_MM_RUS, NOT_LOCALIZED);
}
export function lang_get_string(group: number, index: number) {
    let str: number = data.text_data[data.text_entries[group].offset];
    let prev: number = 0;
    while (index > 0) {
        if (!* str && (prev >= ' ' || prev == 0)) {
            --index;
        }
        prev = * str;
        ++str;
    }
    while (* str < ' ') { // skip non-printables
        ++str;
    }
    return str;
}
export function lang_get_message(id: number) {
    return data.message_entries[id];
}
