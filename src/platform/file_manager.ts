export enum type {
    TYPE_NONE = 0,
    TYPE_DIR = 1,
    TYPE_FILE = 2,
    TYPE_ANY = 3
}

export enum list {
    LIST_ERROR = 0,
    LIST_NO_MATCH = 1,
    LIST_CONTINUE = 1,
    LIST_MATCH = 2
}

export function platform_file_manager_set_base_path(path: string): number {
    return 0;
}

export function platform_file_manager_list_directory_contents(
    dir: string | number,
    type: number,
    extension: string,
    callback: (filename: string) => number
): number {
    return list.LIST_NO_MATCH;
}

export function platform_file_manager_should_case_correct_file(): number {
    return 0;
}

export function platform_file_manager_compare_filename(a: string, b: string): number {
    const lowerA = a.toLowerCase();
    const lowerB = b.toLowerCase();
    if (lowerA === lowerB) {
        return 0;
    }
    return lowerA < lowerB ? -1 : 1;
}

export function platform_file_manager_compare_filename_prefix(
    filename: string,
    prefix: string | ArrayLike<number>,
    prefix_len: number
): number {
    const prefixStr = typeof prefix === "string"
        ? prefix
        : Array.from(prefix)
            .slice(0, prefix_len)
            .map((code) => String.fromCharCode(code))
            .join("");
    const lowerFilename = filename.toLowerCase();
    const lowerPrefix = prefixStr.toLowerCase();
    if (lowerFilename.startsWith(lowerPrefix)) {
        return 0;
    }
    return lowerFilename < lowerPrefix ? -1 : 1;
}

export function platform_file_manager_open_file(filename: string, mode: string): any {
    return null;
}

export function platform_file_manager_close_file(stream: any): number {
    return 0;
}

export function platform_file_manager_remove_file(filename: string): number {
    return 0;
}
