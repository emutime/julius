export const FILE_NAME_MAX = 300;
import { dir_listing } from 'core/dir';
import { dir_get_file } from 'core/dir';
import { platform_file_manager_compare_filename } from 'platform/file_manager';
import { platform_file_manager_open_file } from 'platform/file_manager';
import { platform_file_manager_close_file } from 'platform/file_manager';
import { platform_file_manager_remove_file } from 'platform/file_manager';
export function file_open(filename: string, mode: string) {
    return platform_file_manager_open_file(filename, mode);
}
export function file_close(stream: FILE) {
    return platform_file_manager_close_file(stream);
}
export function file_has_extension(filename: string, extension: string): number {
    if (!extension || extension.length == 0) {
        return 1;
    }
    let dotIndex: number = filename.lastIndexOf('.');
    if (dotIndex == -1) {
        return 0;
    }
    let ext: string = filename.substring(dotIndex + 1);
    return platform_file_manager_compare_filename(ext, extension) == 0 ? 1 : 0;
}
export function file_change_extension(filename: string, new_extension: string): string {
    let dotIndex: number = filename.lastIndexOf('.');
    if (dotIndex == -1) {
        return filename;
    }
    return filename.substring(0, dotIndex + 1) + new_extension;
}
export function file_append_extension(filename: string, extension: string): string {
    return filename + '.' + extension;
}
export function file_remove_extension(filename: string): string {
    let dotIndex: number = filename.lastIndexOf('.');
    if (dotIndex == -1) {
        return filename;
    }
    return filename.substring(0, dotIndex);
}
export function file_exists(filename: string, localizable: number): number {
    return dir_get_file(filename, localizable) != null ? 1 : 0;
}
export function file_remove(filename: char) {
    return platform_file_manager_remove_file(filename);
}
