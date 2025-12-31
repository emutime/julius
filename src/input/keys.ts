
;
import { key_type } from 'input/keys';
import KEY_TYPE_NONE = key_type.KEY_TYPE_NONE;
import KEY_TYPE_MAX_ITEMS = key_type.KEY_TYPE_MAX_ITEMS;
import { key_modifier_type } from 'input/keys';
import KEY_MOD_NONE = key_modifier_type.KEY_MOD_NONE;
import KEY_MOD_SHIFT = key_modifier_type.KEY_MOD_SHIFT;
import KEY_MOD_CTRL = key_modifier_type.KEY_MOD_CTRL;
import KEY_MOD_ALT = key_modifier_type.KEY_MOD_ALT;
import KEY_MOD_GUI = key_modifier_type.KEY_MOD_GUI;
import { language_type } from 'core/locale';
import { encoding_type } from 'core/encoding';
import { encoding_can_display } from 'core/encoding';
import { encoding_from_utf8 } from 'core/encoding';
import { color_t } from 'graphics/color';
import { system_keyboard_key_name } from 'game/system';
import { system_keyboard_key_modifier_name } from 'game/system';
import { font_t } from 'graphics/font';
import { font_definition } from 'graphics/font';
import { font_can_display } from 'graphics/font';
import { _invalid_parameter_noinfo } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt';
import { _errno } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/errno';
import { memcpy } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vcruntime_string';
import { memcpy } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vcruntime_string';
import { memmove } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vcruntime_string';
import { memmove } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vcruntime_string';
import { memset } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vcruntime_string';
import { memset } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vcruntime_string';
import { wcsnlen } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstring';
import { wcstok } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstring';
import { strcmp } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/string';
import { strcmp } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/string';
import { strnlen } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/string';
import { strtok } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/string';
import { strtok } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/string';
let key_names: char[] = new Array(KEY_TYPE_MAX_ITEMS).fill({
    "", "A", "B", "C", "D", "E", "F", "G", "H", "I",
    "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S",
    "T", "U", "V", "W", "X", "Y", "Z", "1", "2", "3",
    "4", "5", "6", "7", "8", "9", "0", "-", "=", "Enter",
    "Esc", "Backspace", "Tab", "Space", "[", "]", "\\", ";", "'", "`",
    ",", ".", "/", "F1", "F2", "F3", "F4", "F5", "F6", "F7",
    "F8", "F9", "F10", "F11", "F12", "Insert", "Delete", "Home", "End", "PageUp",
    "PageDown", "Right", "Left", "Down", "Up",
    "Kp1", "Kp2", "Kp3", "Kp4", "Kp5", "Kp6", "Kp7", "Kp8", "Kp9", "Kp0",
    "Kp.", "Kp+", "Kp-", "Kp*", "Kp/", "NonUS"
});
let key_display_names: char[] = new Array(KEY_TYPE_MAX_ITEMS).fill({
    "", "A", "B", "C", "D", "E", "F", "G", "H", "I",
    "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S",
    "T", "U", "V", "W", "X", "Y", "Z", "1", "2", "3",
    "4", "5", "6", "7", "8", "9", "0", "-", "=", "Enter",
    "Esc", "Backspace", "Tab", "Space", "Left bracket", "Right bracket", "Backslash", ";", "'", "Backtick",
    ",", ".", "/", "F1", "F2", "F3", "F4", "F5", "F6", "F7",
    "F8", "F9", "F10", "F11", "F12", "Insert", "Delete", "Home", "End", "PageUp",
    "PageDown", "Right", "Left", "Down", "Up",
    "Keypad 1", "Keypad 2", "Keypad 3", "Keypad 4", "Keypad 5",
    "Keypad 6", "Keypad 7", "Keypad 8", "Keypad 9", "Keypad 0",
    "Keypad .", "Keypad +", "Keypad -", "Keypad *", "Keypad /", "NonUS"
});
export class modifier_name {
    public modifier: key_modifier_type = null;
    public name: char = null;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.modifier = args[0]);
        args.length >= 2 && (this.name = args[1]);
    }
}
let modifier_names: modifier_name[] = new Array().fill({
    { KEY_MOD_CTRL, "Ctrl"},
    { KEY_MOD_ALT, "Alt"},
    { KEY_MOD_GUI, "Gui"},
    { KEY_MOD_SHIFT, "Shift"},
    { KEY_MOD_NONE }
});
export function key_combination_name(key: key_type, modifiers: key_modifier_type) {
    let name: char[];
    name[0] = 0;
    for (let modname: modifier_name = modifier_names; modname.modifier; modname++) {
        if (modifiers & modname.modifier) {
            strcat(name, modname.name);
            strcat(name, " ");
        }
    }
    strcat(name, key_names[key]);
    return name;
}
function parse_modifier(name: char) {
    for (let modname: modifier_name = modifier_names; modname.modifier; modname++) {
        if (strcmp(modname.name, name) == 0) {
            return modname.modifier;
        }
    }
    return KEY_MOD_NONE;
}
function parse_key(name: char) {
    for (let i: number = 1; i < KEY_TYPE_MAX_ITEMS; i++) {
        if (strcmp(key_names[i], name) == 0) {
            return i;
        }
    }
    return KEY_TYPE_NONE;
}
export function key_combination_from_name(name: char, key: key_type, modifiers: key_modifier_type) {
    let editable_name: char[] = { 0};
    strncpy(editable_name, name, 99);
    * key = KEY_TYPE_NONE;
    * modifiers = KEY_MOD_NONE;
    let token: char = strtok(editable_name, " ");
    while (token) {
        if (token[0]) {
                key_modifier_type mod = parse_modifier(token);
            if (mod != KEY_MOD_NONE) {
                    * modifiers |= mod;
            } else {
                    * key = parse_key(token);
                if (* key == KEY_TYPE_NONE) {
                    return 0;
                }
            }
        }
        token = strtok(0, " ");
    }
    if (* key == KEY_TYPE_NONE) {
        return 0;
    }
    return 1;
}
function can_display(key_name: char) {
    if (!encoding_can_display(key_name)) {
        return 0;
    }
    let internal_name: number[];
    encoding_from_utf8(key_name, internal_name, 10);
    return font_can_display(internal_name);
}
export function key_combination_display_name(key: key_type, modifiers: key_modifier_type) {
    let result: char[];
    let str_result: number[];
    result[0] = 0;
    if (modifiers & KEY_MOD_CTRL) {
        strcat(result, system_keyboard_key_modifier_name(KEY_MOD_CTRL));
        strcat(result, " ");
    }
    if (modifiers & KEY_MOD_ALT) {
        strcat(result, system_keyboard_key_modifier_name(KEY_MOD_ALT));
        strcat(result, " ");
    }
    if (modifiers & KEY_MOD_GUI) {
        strcat(result, system_keyboard_key_modifier_name(KEY_MOD_GUI));
        strcat(result, " ");
    }
    if (modifiers & KEY_MOD_SHIFT) {
        strcat(result, system_keyboard_key_modifier_name(KEY_MOD_SHIFT));
        strcat(result, " ");
    }
    let key_name: char = system_keyboard_key_name(key);
    if ((key_name[0] & 0x80) == 0) {
        switch (key_name[0]) {
            case '[':
                key_name = "Left bracket";
                break
            case ']':
                key_name = "Right bracket";
                break
            case '\\':
                key_name = "Backslash";
                break
            case '`':
                key_name = "Backtick";
                break
            case '~':
                key_name = "Tilde";
                break
            case '#':
                key_name = "Hash";
                break
            case '$':
                key_name = "Dollar";
                break
            case '&':
                key_name = "Ampersand";
                break
            case '<':
                key_name = "Less than";
                break
            case '>':
                key_name = "Greater than";
                break
            case '@':
                key_name = "At-sign";
                break
            case '^':
                key_name = "Caret";
                break
            case '_':
                key_name = "Underscore";
                break
            case '|':
                key_name = "Pipe";
                break
            case '{':
                key_name = "Left curly brace";
                break
            case '}':
                key_name = "Right curly brace";
                break
            case '\0':
                key_name = key_display_names[key];
        }
        strcat(result, key_name);
    } else if (can_display(key_name)) {
        strcat(result, key_name);
    } else {
        strcat(result, "? (");
        strcat(result, key_display_names[key]);
        strcat(result, ")");
    }
    encoding_from_utf8(result, str_result, 100);
    return str_result;
}
