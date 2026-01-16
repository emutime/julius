
import { encoding_can_display } from 'core/encoding';
import { system_keyboard_key_modifier_name, system_keyboard_key_name } from 'game/system';
import { font_can_display } from 'graphics/font';

export const enum key_type {
    KEY_TYPE_NONE = 0,
    KEY_TYPE_A,
    KEY_TYPE_B,
    KEY_TYPE_C,
    KEY_TYPE_D,
    KEY_TYPE_E,
    KEY_TYPE_F,
    KEY_TYPE_G,
    KEY_TYPE_H,
    KEY_TYPE_I,
    KEY_TYPE_J,
    KEY_TYPE_K,
    KEY_TYPE_L,
    KEY_TYPE_M,
    KEY_TYPE_N,
    KEY_TYPE_O,
    KEY_TYPE_P,
    KEY_TYPE_Q,
    KEY_TYPE_R,
    KEY_TYPE_S,
    KEY_TYPE_T,
    KEY_TYPE_U,
    KEY_TYPE_V,
    KEY_TYPE_W,
    KEY_TYPE_X,
    KEY_TYPE_Y,
    KEY_TYPE_Z,
    KEY_TYPE_1,
    KEY_TYPE_2,
    KEY_TYPE_3,
    KEY_TYPE_4,
    KEY_TYPE_5,
    KEY_TYPE_6,
    KEY_TYPE_7,
    KEY_TYPE_8,
    KEY_TYPE_9,
    KEY_TYPE_0,
    KEY_TYPE_MINUS,
    KEY_TYPE_EQUALS,
    KEY_TYPE_ENTER,
    KEY_TYPE_ESCAPE,
    KEY_TYPE_BACKSPACE,
    KEY_TYPE_TAB,
    KEY_TYPE_SPACE,
    KEY_TYPE_LEFTBRACKET,
    KEY_TYPE_RIGHTBRACKET,
    KEY_TYPE_BACKSLASH,
    KEY_TYPE_SEMICOLON,
    KEY_TYPE_APOSTROPHE,
    KEY_TYPE_GRAVE,
    KEY_TYPE_COMMA,
    KEY_TYPE_PERIOD,
    KEY_TYPE_SLASH,
    KEY_TYPE_F1,
    KEY_TYPE_F2,
    KEY_TYPE_F3,
    KEY_TYPE_F4,
    KEY_TYPE_F5,
    KEY_TYPE_F6,
    KEY_TYPE_F7,
    KEY_TYPE_F8,
    KEY_TYPE_F9,
    KEY_TYPE_F10,
    KEY_TYPE_F11,
    KEY_TYPE_F12,
    KEY_TYPE_INSERT,
    KEY_TYPE_DELETE,
    KEY_TYPE_HOME,
    KEY_TYPE_END,
    KEY_TYPE_PAGEUP,
    KEY_TYPE_PAGEDOWN,
    // arrow keys
    KEY_TYPE_RIGHT,
    KEY_TYPE_LEFT,
    KEY_TYPE_DOWN,
    KEY_TYPE_UP,
    // keypad keys
    KEY_TYPE_KP_1,
    KEY_TYPE_KP_2,
    KEY_TYPE_KP_3,
    KEY_TYPE_KP_4,
    KEY_TYPE_KP_5,
    KEY_TYPE_KP_6,
    KEY_TYPE_KP_7,
    KEY_TYPE_KP_8,
    KEY_TYPE_KP_9,
    KEY_TYPE_KP_0,
    KEY_TYPE_KP_PERIOD,
    KEY_TYPE_KP_PLUS,
    KEY_TYPE_KP_MINUS,
    KEY_TYPE_KP_MULTIPLY,
    KEY_TYPE_KP_DIVIDE,
    // the key next to left shift on ISO (Non-US) keyboards, usually \ or <
    KEY_TYPE_NON_US,
    KEY_TYPE_MAX_ITEMS
};
import KEY_TYPE_NONE = key_type.KEY_TYPE_NONE;
import KEY_TYPE_MAX_ITEMS = key_type.KEY_TYPE_MAX_ITEMS;

export const enum key_modifier_type {
    KEY_MOD_NONE = 0,
    KEY_MOD_SHIFT = 1,
    KEY_MOD_CTRL = 2,
    KEY_MOD_ALT = 4,
    KEY_MOD_GUI = 8,
};
import KEY_MOD_NONE = key_modifier_type.KEY_MOD_NONE;
import KEY_MOD_SHIFT = key_modifier_type.KEY_MOD_SHIFT;
import KEY_MOD_CTRL = key_modifier_type.KEY_MOD_CTRL;
import KEY_MOD_ALT = key_modifier_type.KEY_MOD_ALT;
import KEY_MOD_GUI = key_modifier_type.KEY_MOD_GUI;
let key_names: string[] = [
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
];
let key_display_names: string[] = [
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
];
export class modifier_name {
    public modifier: key_modifier_type = null;
    public name: string = null;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.modifier = args[0]);
        args.length >= 2 && (this.name = args[1]);
    }
}
let modifier_names: modifier_name[] = [
    new modifier_name(KEY_MOD_CTRL, "Ctrl"),
    new modifier_name(KEY_MOD_ALT, "Alt"),
    new modifier_name(KEY_MOD_GUI, "Gui"),
    new modifier_name(KEY_MOD_SHIFT, "Shift"),
    new modifier_name(KEY_MOD_NONE)
];
export function key_combination_name(key: key_type, modifiers: key_modifier_type) {
    let name: string = "";
    for (let modname of modifier_names) {
        if (modifiers & modname.modifier) {
            name += modname.name;
            name += " ";
        }
    }
    name += key_names[key];
    return name;
}
function parse_modifier(name: string) {
    for (let modname of modifier_names) {
        if (modname.name == name) {
            return modname.modifier;
        }
    }
    return KEY_MOD_NONE;
}
function parse_key(name: string) {
    for (let i: number = 1; i < KEY_TYPE_MAX_ITEMS; i++) {
        if (key_names[i] == name) {
            return i;
        }
    }
    return KEY_TYPE_NONE;
}
export function key_combination_from_name(name: string, key: key_type, modifiers: key_modifier_type) {
    let editable_name: string = name;
    key = KEY_TYPE_NONE;
    modifiers = KEY_MOD_NONE;
    let tokens: string[] = editable_name.split(" ");
    for (let token of tokens) {
        if (!token) {
            continue;
        }
        let mod = parse_modifier(token);
        if (mod != KEY_MOD_NONE) {
            modifiers |= mod;
        } else {
            key = parse_key(token);
            if (key == KEY_TYPE_NONE) {
                return 0;
            }
        }
    }
    if (key == KEY_TYPE_NONE) {
        return 0;
    }
    return 1;
}
function can_display(key_name: string) {
    if (!encoding_can_display(key_name.charCodeAt(0))) {
        return 0;
    }

    return font_can_display(key_name);
}
export function key_combination_display_name(key: key_type, modifiers: key_modifier_type) {
    let result: string = "";
    if (modifiers & KEY_MOD_CTRL) {
        result += system_keyboard_key_modifier_name(KEY_MOD_CTRL);
        result += " ";
    }
    if (modifiers & KEY_MOD_ALT) {
        result += system_keyboard_key_modifier_name(KEY_MOD_ALT);
        result += " ";
    }
    if (modifiers & KEY_MOD_GUI) {
        result += system_keyboard_key_modifier_name(KEY_MOD_GUI);
        result += " ";
    }
    if (modifiers & KEY_MOD_SHIFT) {
        result += system_keyboard_key_modifier_name(KEY_MOD_SHIFT);
        result += " ";
    }
    let key_name: string = system_keyboard_key_name(key);
    if ((key_name.charCodeAt(0) & 0x80) == 0) {
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
        result += key_name;
    } else if (can_display(key_name)) {
        result += key_name;
    } else {
        result += "? (";
        result += key_display_names[key];
        result += ")";
    }
    return result;
}
