import { FILE_NAME_MAX } from 'core/file';
export const BASE_MAX_FILES = 100;
export enum localized {
    NOT_LOCALIZED = 0,
    MAY_BE_LOCALIZED = 1,
    MUST_BE_LOCALIZED = 2
};
import NOT_LOCALIZED = localized.NOT_LOCALIZED;
import MUST_BE_LOCALIZED = localized.MUST_BE_LOCALIZED;
export class dir_listing {
    public files: string[] = [];
    public num_files: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.files = args[0]);
        args.length >= 2 && (this.num_files = args[1]);
    }
}
import { config_key } from 'core/config';
import { config_string_key } from 'core/config';
import CONFIG_STRING_UI_LANGUAGE_DIR = config_string_key.CONFIG_STRING_UI_LANGUAGE_DIR;
import { config_string_key } from 'core/config';
import { config_get_string } from 'core/config';
import { file_open } from 'core/file';
import { string_from_bytes } from 'core/string';
import { file_close } from 'core/file';
import { type } from 'platform/file_manager';
import TYPE_DIR = type.TYPE_DIR;
import TYPE_FILE = type.TYPE_FILE;
import { list } from 'platform/file_manager';
import LIST_NO_MATCH = list.LIST_NO_MATCH;
import LIST_CONTINUE = list.LIST_CONTINUE;
import LIST_MATCH = list.LIST_MATCH;
import { platform_file_manager_list_directory_contents } from 'platform/file_manager';
import { platform_file_manager_should_case_correct_file } from 'platform/file_manager';
import { platform_file_manager_compare_filename } from 'platform/file_manager';

export class unnamed13_8 {
    public listing: dir_listing = null;
    public max_files: number = 0;
    public cased_filename: string = null;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.listing = args[0]);
        args.length >= 2 && (this.max_files = args[1]);
        args.length >= 3 && (this.cased_filename = args[2]);
    }
}
let data: unnamed13_8 = new unnamed13_8();
function allocate_listing_files(min: number, max: number) {
    for (let i: number = min; i < max; i++) {
        data.listing.files[i] = "";
    }
}
function clear_dir_listing() {
    data.listing.num_files = 0;
    if (data.max_files <= 0) {
        data.listing.files = new Array(BASE_MAX_FILES);
        allocate_listing_files(0, BASE_MAX_FILES);
        data.max_files = BASE_MAX_FILES;
    } else {
        for (let i: number = 0; i < data.max_files; i++) {
            data.listing.files[i] = "";
        }
    }
}
function expand_dir_listing() {
    let old_max_files: number = data.max_files;
    data.max_files = 2 * old_max_files;
    let newFiles: string[] = new Array(data.max_files);
    for (let i = 0; i < old_max_files; i++) {
        newFiles[i] = data.listing.files[i];
    }
    data.listing.files = newFiles;
    allocate_listing_files(old_max_files, data.max_files);
}
function compare_lower(va: any, vb: any): number {
    let a: string = va as string;
    let b: string = vb as string;
    return platform_file_manager_compare_filename(a, b);
}
function add_to_listing(filename: string) {
    if (data.listing.num_files >= data.max_files) {
        expand_dir_listing();
    }
    data.listing.files[data.listing.num_files] = filename.substring(0, FILE_NAME_MAX - 1);
    ++data.listing.num_files;
    return LIST_CONTINUE;
}
export function dir_find_files_with_extension(extension: string | ArrayLike<number>) {
    const extensionStr = typeof extension === "string" ? extension : string_from_bytes(extension);
    clear_dir_listing();
    platform_file_manager_list_directory_contents(0, TYPE_FILE, extensionStr, add_to_listing);
    let filesToSort = data.listing.files.slice(0, data.listing.num_files);
    filesToSort.sort((a, b) => compare_lower(a, b));
    for (let i = 0; i < data.listing.num_files; i++) {
        data.listing.files[i] = filesToSort[i];
    }
    return data.listing;
}
export function dir_find_all_subdirectories() {
    clear_dir_listing();
    platform_file_manager_list_directory_contents(0, TYPE_DIR, "", add_to_listing);
    let filesToSort = data.listing.files.slice(0, data.listing.num_files);
    filesToSort.sort((a, b) => compare_lower(a, b));
    for (let i = 0; i < data.listing.num_files; i++) {
        data.listing.files[i] = filesToSort[i];
    }
    return data.listing;
}
function compare_case(filename: string) {
    if (platform_file_manager_compare_filename(filename, data.cased_filename) == 0) {
        data.cased_filename = filename;
        return LIST_MATCH;
    }
    return LIST_NO_MATCH;
}
function correct_case(dir: string, filename: string, type: number) {
    data.cased_filename = filename;
    return platform_file_manager_list_directory_contents(dir, type, "", compare_case) == LIST_MATCH;
}
function move_left(str: string[]): string {
    return str.slice(1).join('');
}
function get_case_corrected_file(dir: string, filepath: string): string | null {
    let corrected_filename: string = "";
    let dir_len: number = 0;
    if (dir) {
        dir_len = dir.length + 1;
        corrected_filename = dir + "/";
    } else {
        dir = ".";
    }
    corrected_filename += filepath;
    if (corrected_filename.length > 2 * FILE_NAME_MAX - 1) {
        corrected_filename = corrected_filename.substring(0, 2 * FILE_NAME_MAX - 1);
    }
    let fp: any = file_open(corrected_filename, "rb");
    if (fp) {
        file_close(fp);
        return corrected_filename;
    }
    if (!platform_file_manager_should_case_correct_file()) {
        return null;
    }
    let slashIndex: number = corrected_filename.indexOf('/', dir_len);
    if (slashIndex < 0) {
        slashIndex = corrected_filename.indexOf('\\', dir_len);
    }
    if (slashIndex >= 0) {
        let dirPart: string = corrected_filename.substring(0, slashIndex);
        let path: string = corrected_filename.substring(slashIndex + 1);
        if (path.length > 0 && path[0] == '\\') {
            path = path.substring(1);
        }
        if (correct_case(dir, corrected_filename.substring(dir_len, slashIndex), TYPE_DIR)) {
            if (correct_case(corrected_filename.substring(0, slashIndex), path, TYPE_FILE)) {
                return corrected_filename.substring(0, slashIndex) + "/" + path;
            }
        }
    } else {
        if (correct_case(dir, corrected_filename.substring(dir_len), TYPE_FILE)) {
            return corrected_filename;
        }
    }
    return null;
}
export function dir_get_file(filepath: string, localizable: number): string | null {
    if (localizable != NOT_LOCALIZED) {
        let custom_dir: string | null = config_get_string(CONFIG_STRING_UI_LANGUAGE_DIR);
        if (custom_dir) {
            let path = get_case_corrected_file(custom_dir, filepath);
            if (path) {
                return path;
            } else if (localizable == MUST_BE_LOCALIZED) {
                return null;
            }
        }
    }
    return get_case_corrected_file("", filepath);
}
