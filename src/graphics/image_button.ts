export const PRESSED_EFFECT_MILLIS = 100;
export const PRESSED_REPEAT_MILLIS = 50;
export const PRESSED_REPEAT_INITIAL_MILLIS = 300;
import { button_none } from 'graphics/button';
import { time_millis } from 'core/time';
import { time_get_millis } from 'core/time';
import { touch_coords } from 'input/touch';
import { touch_mode } from 'input/touch';
import { touch } from 'input/touch';
import { mouse_button } from 'input/mouse';
import { scroll_state } from 'input/mouse';
import { mouse } from 'input/mouse';
import { mouse_get } from 'input/mouse';
import { ib } from 'graphics/image_button';
import IB_NORMAL = ib.IB_NORMAL;
import IB_SCROLL = ib.IB_SCROLL;
import IB_BUILD = ib.IB_BUILD;
export class image_button {
    public x_offset: number = 0;
    public y_offset: number = 0;
    public width: number = 0;
    public height: number = 0;
    public button_type: number = 0;
    public image_collection: number = 0;
    public image_offset: number = 0;
    public left_click_handler: void ( = null;
    public right_click_handler: void ( = null;
    public parameter1: number = 0;
    public parameter2: number = 0;
    public enabled: char = null;
    public pressed: char = null;
    public focused: char = null;
    public pressed_since: time_millis = null;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.x_offset = args[0]);
        args.length >= 2 && (this.y_offset = args[1]);
        args.length >= 3 && (this.width = args[2]);
        args.length >= 4 && (this.height = args[3]);
        args.length >= 5 && (this.button_type = args[4]);
        args.length >= 6 && (this.image_collection = args[5]);
        args.length >= 7 && (this.image_offset = args[6]);
        args.length >= 8 && (this.left_click_handler = args[7]);
        args.length >= 9 && (this.right_click_handler = args[8]);
        args.length >= 10 && (this.parameter1 = args[9]);
        args.length >= 11 && (this.parameter2 = args[10]);
        args.length >= 12 && (this.enabled = args[11]);
        args.length >= 13 && (this.pressed = args[12]);
        args.length >= 14 && (this.focused = args[13]);
        args.length >= 15 && (this.pressed_since = args[14]);
    }
}
import { language_type } from 'core/locale';;
import { encoding_type } from 'core/encoding';
import { color_t } from 'graphics/color';
import { image } from 'core/image';
import { image_group } from 'core/image';
import { font_t } from 'graphics/font';
import { font_definition } from 'graphics/font';
import { image_draw } from 'graphics/image';
import { sound_effect } from 'sound/effect';
import SOUND_EFFECT_ICON = sound_effect.SOUND_EFFECT_ICON;
import { sound_effect_play } from 'sound/effect';
function fade_pressed_effect(buttons: image_button, num_buttons: number) {
    let current_time: time_millis = time_get_millis();
    for (let i: number = 0; i < num_buttons; i++) {
        let btn: image_button = buttons[i];
        if (btn.pressed) {
            if (current_time - btn.pressed_since > PRESSED_EFFECT_MILLIS) {
                if (btn.button_type == IB_NORMAL) {
                    btn.pressed = 0;
                } else if (btn.button_type == IB_SCROLL && !mouse_get().left.is_down) {
                    btn.pressed = 0;
                }
            }
        }
    }
}
function fade_pressed_effect_build(buttons: image_button, num_buttons: number) {
    for (let i: number = 0; i < num_buttons; i++) {
        let btn: image_button = buttons[i];
        if (btn.pressed && btn.button_type == IB_BUILD) {
            btn.pressed--;
        }
    }
}
export function image_buttons_draw(x: number, y: number, buttons: image_button, num_buttons: number) {
    fade_pressed_effect(buttons, num_buttons);
    for (let i: number = 0; i < num_buttons; i++) {
        let btn: image_button = buttons[i];
        let image_id: number = image_group(btn.image_collection) + btn.image_offset;
        if (btn.enabled) {
            if (btn.pressed) {
                image_id += 2
            } else if (btn.focused) {
                image_id += 1
            }
        } else {
            image_id += 3
        }
        image_draw(image_id, x + btn.x_offset, y + btn.y_offset);
    }
}
function should_be_pressed(btn: image_button, m: mouse) {
    if ((m.left.went_down || m.left.is_down) && btn.left_click_handler != button_none) {
        return 1;
    }
    if ((m.right.went_down || m.right.is_down) && btn.right_click_handler != button_none) {
        return 1;
    }
    return 0;
}
export function image_buttons_handle_mouse(m: mouse, x: number, y: number, buttons: image_button, num_buttons: number, focus_button_id: number) {
    fade_pressed_effect(buttons, num_buttons);
    fade_pressed_effect_build(buttons, num_buttons);
    let hit_button: image_button = null;
    if (focus_button_id) {
        * focus_button_id = 0;
    }
    for (let i: number = 0; i < num_buttons; i++) {
        let btn: image_button = buttons[i];
        if (btn.focused) {
            btn.focused--;
        }
        if (x + btn.x_offset <= m.x &&
            x + btn.x_offset + btn.width > m.x &&
            y + btn.y_offset <= m.y &&
            y + btn.y_offset + btn.height > m.y) {
            if (focus_button_id) {
                * focus_button_id = i + 1;
            }
            if (btn.enabled) {
                btn.focused = 2;
                hit_button = btn;
            }
        }
    }
    if (!hit_button) {
        return 0;
    }
    if (hit_button.button_type == IB_SCROLL) {
        if (!m.left.went_down && !m.left.is_down) {
            return 0;
        }
    } else if (hit_button.button_type == IB_BUILD || hit_button.button_type == IB_NORMAL) {
        if (should_be_pressed(hit_button, m)) {
            hit_button.pressed = 2;
            hit_button.pressed_since = time_get_millis();
        }
        if (!m.left.went_up && !m.right.went_up) {
            return 0;
        }
    }
    if (m.left.went_up) {
        sound_effect_play(SOUND_EFFECT_ICON);
        hit_button.left_click_handler(hit_button.parameter1, hit_button.parameter2);
        return hit_button.left_click_handler != button_none;
    } else if (m.right.went_up) {
        hit_button.right_click_handler(hit_button.parameter1, hit_button.parameter2);
        return hit_button.right_click_handler != button_none;
    } else if (hit_button.button_type == IB_SCROLL && m.left.is_down) {
        let delay: time_millis = hit_button.pressed == 2 ? PRESSED_REPEAT_MILLIS : PRESSED_REPEAT_INITIAL_MILLIS;
        if (time_get_millis() - hit_button.pressed_since >= delay) {
            hit_button.pressed = 2;
            hit_button.pressed_since = time_get_millis();
            hit_button.left_click_handler(hit_button.parameter1, hit_button.parameter2);
        }
        return 1;
    }
    return 0;
}
