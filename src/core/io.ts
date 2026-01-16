export type FILE = any;
import { localized } from 'core/dir';
import NOT_LOCALIZED = localized.NOT_LOCALIZED;
import { dir_listing } from 'core/dir';
import { dir_get_file } from 'core/dir';
import { file_open } from 'core/file';
import { file_close } from 'core/file';
import { Ref } from '../../ext/crt';

export const SEEK_SET = 0;
export const SEEK_END = 2;

export function fseek(fp: FILE, offset: number, whence: number): number {
    // Stub implementation
    return 0;
}

export function ftell(fp: FILE): number {
    // Stub implementation
    return 0;
}

export function fread(buffer: any, size: number, count: number, fp: FILE): number {
    // Stub implementation
    return 0;
}

export function fwrite(buffer: any, size: number, count: number, fp: FILE): number {
    // Stub implementation
    return 0;
}

export function io_read_file_into_buffer(filepath: string, localizable: number, buffer: Uint8Array, max_size: number) {
    let cased_file = dir_get_file(filepath, localizable);
    if (!cased_file) {
        return 0;
    }
    let fp: FILE = file_open(cased_file, "rb");
    if (!fp) {
        return 0;
    }
    fseek(fp, 0, SEEK_END);
    let size: number = ftell(fp);
    if (size > max_size) {
        size = max_size;
    }
    fseek(fp, 0, SEEK_SET);
    let bytes_read: number = fread(buffer, 1, size, fp);
    file_close(fp);
    return bytes_read;
}
export function io_read_file_part_into_buffer(filepath: string, localizable: number, buffer: Ref<ArrayBufferView>, size: number, offset_in_file: number) {
    let cased_file: string = dir_get_file(filepath, localizable);
    if (!cased_file) {
        return 0;
    }
    let bytes_read: number = 0;
    let fp: FILE = file_open(cased_file, "rb");
    if (fp) {
        let seek_result: number = fseek(fp, offset_in_file, SEEK_SET);
        if (seek_result == 0) {
            bytes_read = fread(buffer, 1, size, fp);
        }
        file_close(fp);
    }
    return bytes_read;
}
export function io_write_buffer_to_file(filepath: string, buffer: Uint8Array, size: number) {
    let cased_file: string = dir_get_file(filepath, NOT_LOCALIZED);
    if (!cased_file) {
        cased_file = filepath;
    }
    let fp: FILE = file_open(cased_file, "wb");
    if (!fp) {
        return 0;
    }
    let bytes_written: number = fwrite(buffer, 1, size, fp);
    file_close(fp);
    return bytes_written;
}
