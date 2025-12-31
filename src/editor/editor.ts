import { localized } from 'core/dir';
import { file_exists } from 'core/file';
import MAY_BE_LOCALIZED = localized.MAY_BE_LOCALIZED;

let EDITOR_FILES: string[] = [
    "c3_map.eng",
    "c3_map_mm.eng",
    "c3map.sg2",
    "c3map.555",
    "c3map_north.sg2",
    "c3map_north.555",
    "c3map_south.sg2",
    "c3map_south.555",
    "map_panels.555"
];

const MAX_EDITOR_FILES = 9;
let is_active: number;

export function editor_is_present() {
    for (let i: number = 0; i < MAX_EDITOR_FILES; i++) {
        if (!file_exists(EDITOR_FILES[i], MAY_BE_LOCALIZED)) {
            return 0;
        }
    }
    return 1;
}
export function editor_set_active(active: number) {
    is_active = active;
}
export function editor_is_active() {
    return is_active;
}
