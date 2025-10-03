export const MAX_WARNINGS = 5;
export const MAX_TEXT = 100;
export const TIMEOUT_MS = 15000;
;
import { city_view_orientation } from 'city/view';
import { warning_type } from 'city/warning';
import { lang_get_string } from 'core/lang';
import { string_copy } from 'core/string';
import { time_get_millis, time_millis } from 'core/time';
import { setting_warnings } from 'game/settings';
import WARNING_ORIENTATION = warning_type.WARNING_ORIENTATION;
export class warning {
    public in_use: number = 0;
    public time: time_millis = null;
    public text: number[] = new Array(MAX_TEXT).fill(0);
    public constructor(...args: any[]) {
        args.length >= 1 && (this.in_use = args[0]);
        args.length >= 2 && (this.time = args[1]);
        args.length >= 3 && (this.text = args[2]);
    }
}
let warnings: warning[] = new Array(MAX_WARNINGS);
function new_warning() {
    for (let i: number = 0; i < MAX_WARNINGS; i++) {
        if (!warnings[i].in_use) {
            return warnings[i];
        }
    }
    return 0;
}
export function city_warning_show(type: warning_type) {
    let text: number;
    if (type == WARNING_ORIENTATION) {
        text = lang_get_string(17, city_view_orientation());
    } else {
        text = lang_get_string(19, type - 2);
    }
    city_warning_show_custom(text);
}
export function city_warning_show_custom(text: number) {
    if (!setting_warnings()) {
        return;
    }
    let w: warning = new_warning();
    if (!w) {
        return;
    }
    w.in_use = 1;
    w.time = time_get_millis();
    string_copy(text, w.text, MAX_TEXT);
}
export function city_has_warnings() {
    for (let i: number = 0; i < MAX_WARNINGS; i++) {
        if (warnings[i].in_use) {
            return 1;
        }
    }
    return 0;
}
export function city_warning_get(id: number) {
    if (warnings[id].in_use) {
        return warnings[id].text;
    }
    return 0;
}
export function city_warning_clear_all() {
    for (let i: number = 0; i < MAX_WARNINGS; i++) {
        warnings[i].in_use = 0;
    }
}
export function city_warning_clear_outdated() {
    for (let i: number = 0; i < MAX_WARNINGS; i++) {
        if (warnings[i].in_use && time_get_millis() - warnings[i].time > TIMEOUT_MS) {
            warnings[i].in_use = 0;
        }
    }
}
