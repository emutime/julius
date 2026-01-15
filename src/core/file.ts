export const FILE_NAME_MAX = 300;
import { dir_listing } from 'core/dir';
import { dir_get_file } from 'core/dir';
import { string_from_bytes } from 'core/string';
import { platform_file_manager_compare_filename } from '../platform/file_manager';
import { platform_file_manager_open_file } from '../platform/file_manager';
import { platform_file_manager_close_file } from '../platform/file_manager';
import { platform_file_manager_remove_file } from '../platform/file_manager';
export function file_open(filename: string, mode: string) {
    return platform_file_manager_open_file(filename, mode);
}
export function file_close(stream: FILE) {
    return platform_file_manager_close_file(stream);
}
export function file_has_extension(filename: string | ArrayLike<number>, extension: string | ArrayLike<number>): number {
    const filenameStr = typeof filename === "string" ? filename : string_from_bytes(filename);
    const extensionStr = typeof extension === "string" ? extension : string_from_bytes(extension);
    if (!extensionStr || extensionStr.length == 0) {
        return 1;
    }
    let dotIndex: number = filenameStr.lastIndexOf('.');
    if (dotIndex == -1) {
        return 0;
    }
    let ext: string = filenameStr.substring(dotIndex + 1);
    return platform_file_manager_compare_filename(ext, extensionStr) == 0 ? 1 : 0;
}
export function file_change_extension(filename: string | (ArrayLike<number> & { [index: number]: number }), new_extension: string | ArrayLike<number>): string | void {
    if (typeof filename === "string") {
        const newExtStr = typeof new_extension === "string" ? new_extension : string_from_bytes(new_extension);
        let dotIndex: number = filename.lastIndexOf('.');
        if (dotIndex == -1) {
            return filename;
        }
        return filename.substring(0, dotIndex + 1) + newExtStr;
    }
    const newExtStr = typeof new_extension === "string" ? new_extension : string_from_bytes(new_extension);
    const buffer = filename as ArrayLike<number> & { [index: number]: number };
    let i = 0;
    while (buffer[i] && buffer[i] !== ".".charCodeAt(0)) {
        i++;
    }
    if (buffer[i] === ".".charCodeAt(0)) {
        buffer[i + 0] = newExtStr.charCodeAt(0) || 0;
        buffer[i + 1] = newExtStr.charCodeAt(1) || 0;
        buffer[i + 2] = newExtStr.charCodeAt(2) || 0;
        buffer[i + 3] = 0;
    }
}
export function file_append_extension(filename: string | (ArrayLike<number> & { [index: number]: number }), extension: string | ArrayLike<number>): string | void {
    const extensionStr = typeof extension === "string" ? extension : string_from_bytes(extension);
    if (typeof filename === "string") {
        return filename + '.' + extensionStr;
    }
    const buffer = filename as ArrayLike<number> & { [index: number]: number };
    let i = 0;
    while (buffer[i]) {
        i++;
    }
    buffer[i++] = ".".charCodeAt(0);
    buffer[i++] = extensionStr.charCodeAt(0) || 0;
    buffer[i++] = extensionStr.charCodeAt(1) || 0;
    buffer[i++] = extensionStr.charCodeAt(2) || 0;
    buffer[i] = 0;
}
export function file_remove_extension(filename: string | (ArrayLike<number> & { [index: number]: number })): string | void {
    if (typeof filename === "string") {
        let dotIndex: number = filename.lastIndexOf('.');
        if (dotIndex == -1) {
            return filename;
        }
        return filename.substring(0, dotIndex);
    }
    const buffer = filename as ArrayLike<number> & { [index: number]: number };
    let i = 0;
    while (buffer[i] && buffer[i] !== ".".charCodeAt(0)) {
        i++;
    }
    if (buffer[i] === ".".charCodeAt(0) && i > 0) {
        buffer[i] = 0;
    }
}
export function file_exists(filename: string | ArrayLike<number>, localizable: number): number {
    const filenameStr = typeof filename === "string" ? filename : string_from_bytes(filename);
    return dir_get_file(filenameStr, localizable) != null ? 1 : 0;
}
export function file_remove(filename: string | ArrayLike<number>) {
    const filenameStr = typeof filename === "string" ? filename : string_from_bytes(filename);
    return platform_file_manager_remove_file(filenameStr);
}
