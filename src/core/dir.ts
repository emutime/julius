export const  = 1;
import { FILE_NAME_MAX } from 'core/file';
export const BASE_MAX_FILES = 100;
import { localized } from 'core/dir';
import NOT_LOCALIZED = localized.NOT_LOCALIZED;
import MUST_BE_LOCALIZED = localized.MUST_BE_LOCALIZED;
export class dir_listing {
    public files: char = null;
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
import { __va_start } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vadefs';
import { __va_start } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vadefs';;
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
import { malloc } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_malloc';
import { malloc } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_malloc';
import { realloc } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_malloc';
import { realloc } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_malloc';
import { _errno } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stddef';
import { qsort } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_search';
import { _errno } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdlib';
import { file_open } from 'core/file';
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
import { _errno } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/errno';
import { memcpy } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vcruntime_string';
import { memcpy } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vcruntime_string';
import { memmove } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vcruntime_string';
import { memmove } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vcruntime_string';
import { memset } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vcruntime_string';
import { memset } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vcruntime_string';
import { strchr } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vcruntime_string';
import { strchr } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vcruntime_string';
import { wcsnlen } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstring';
import { wcstok } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstring';
import { strlen } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/string';
import { strlen } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/string';
import { strnlen } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/string';
export class unnamed13_8 {
    public listing: dir_listing = null;
    public max_files: number = 0;
    public cased_filename: char = null;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.listing = args[0]);
        args.length >= 2 && (this.max_files = args[1]);
        args.length >= 3 && (this.cased_filename = args[2]);
    }
}
let data: unnamed13_8 = new unnamed13_8();
function allocate_listing_files(min: number, max: number) {
    for (let i: number = min; i < max; i++) {
        data.listing.files[i] = malloc(FILE_NAME_MAX * sizeof(char));
        data.listing.files[i][0] = 0;
    }
}
function clear_dir_listing() {
    data.listing.num_files = 0;
    if (data.max_files <= 0) {
        data.listing.files = (char **) malloc(BASE_MAX_FILES * sizeof(char *));
        allocate_listing_files(0, BASE_MAX_FILES);
        data.max_files = BASE_MAX_FILES;
    } else {
        for (let i: number = 0; i < data.max_files; i++) {
            data.listing.files[i][0] = 0;
        }
    }
}
function expand_dir_listing() {
    let old_max_files: number = data.max_files;
    data.max_files = 2 * old_max_files;
    data.listing.files = (char **) realloc(data.listing.files, data.max_files * sizeof(char *));
    allocate_listing_files(old_max_files, data.max_files);
}
function compare_lower(va: void, vb: void) {
    return platform_file_manager_compare_filename(* (const char**) va, * (const char**)vb);
}
function add_to_listing(filename: char) {
    if (data.listing.num_files >= data.max_files) {
        expand_dir_listing();
    }
    strncpy(data.listing.files[data.listing.num_files], filename, FILE_NAME_MAX);
    data.listing.files[data.listing.num_files][FILE_NAME_MAX - 1] = 0;
    ++data.listing.num_files;
    return LIST_CONTINUE;
}
export function dir_find_files_with_extension(extension: char) {
    clear_dir_listing();
    platform_file_manager_list_directory_contents(0, TYPE_FILE, extension, add_to_listing);
    qsort(data.listing.files, data.listing.num_files, sizeof(char *), compare_lower);
    return data.listing;
}
export function dir_find_all_subdirectories() {
    clear_dir_listing();
    platform_file_manager_list_directory_contents(0, TYPE_DIR, 0, add_to_listing);
    qsort(data.listing.files, data.listing.num_files, sizeof(char *), compare_lower);
    return data.listing;
}
function compare_case(filename: char) {
    if (platform_file_manager_compare_filename(filename, data.cased_filename) == 0) {
        strcpy(data.cased_filename, filename);
        return LIST_MATCH;
    }
    return LIST_NO_MATCH;
}
function correct_case(dir: char, filename: char, type: number) {
    data.cased_filename = filename;
    return platform_file_manager_list_directory_contents(dir, type, 0, compare_case) == LIST_MATCH;
}
function move_left(str: char) {
    while (* str) {
        str[0] = str[1];
        str++;
    }
    * str = 0;
}
function get_case_corrected_file(dir: char, filepath: char) {
    let corrected_filename: char[];
    corrected_filename[2 * FILE_NAME_MAX - 1] = 0;
    let dir_len: size_t = 0;
    if (dir) {
        dir_len = strlen(dir) + 1;
        strncpy(corrected_filename, dir, 2 * FILE_NAME_MAX - 1);
        corrected_filename[dir_len - 1] = '/';
    } else {
        dir = ".";
    }
    strncpy(corrected_filename[dir_len], filepath, 2 * FILE_NAME_MAX - dir_len - 1);
    let fp: FILE = file_open(corrected_filename, "rb");
    if (fp) {
        file_close(fp);
        return corrected_filename;
    }
    if (!platform_file_manager_should_case_correct_file()) {
        return 0;
    }
    let slash: char = strchr(corrected_filename[dir_len], '/');
    if (!slash) {
        slash = strchr(corrected_filename[dir_len], '\\');
    }
    if (slash) {
        * slash = 0;
        if (correct_case(dir, corrected_filename[dir_len], TYPE_DIR)) {
            let path: char = slash + 1;
            if (* path == '\\') {
                move_left(path);
            }
            if (correct_case(corrected_filename, path, TYPE_FILE)) {
                * slash = '/';
                return corrected_filename;
            }
        }
    } else {
        if (correct_case(dir, corrected_filename[dir_len], TYPE_FILE)) {
            return corrected_filename;
        }
    }
    return 0;
}
export function dir_get_file(filepath: char, localizable: number) {
    if (localizable != NOT_LOCALIZED) {
        let custom_dir: char = config_get_string(CONFIG_STRING_UI_LANGUAGE_DIR);
        if (* custom_dir) {
            let path: char = get_case_corrected_file(custom_dir, filepath);
            if (path) {
                return path;
            } else if (localizable == MUST_BE_LOCALIZED) {
                return 0;
            }
        }
    }
    return get_case_corrected_file(0, filepath);
}
