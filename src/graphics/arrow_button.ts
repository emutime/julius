
import { time_millis } from 'core/time';
import { time_get_millis } from 'core/time';
import { touch_coords } from 'input/touch';
import { touch_mode } from 'input/touch';
import { touch } from 'input/touch';
import { mouse_button } from 'input/mouse';
import { scroll_state } from 'input/mouse';
import { mouse } from 'input/mouse';
export class arrow_button {
    public x_offset: number = 0;
    public y_offset: number = 0;
    public image_id: number = 0;
    public size: number = 0;
    public left_click_handler: void ( = null;
    public parameter1: number = 0;
    public parameter2: number = 0;
    public pressed: number = 0;
    public repeats: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.x_offset = args[0]);
        args.length >= 2 && (this.y_offset = args[1]);
        args.length >= 3 && (this.image_id = args[2]);
        args.length >= 4 && (this.size = args[3]);
        args.length >= 5 && (this.left_click_handler = args[4]);
        args.length >= 6 && (this.parameter1 = args[5]);
        args.length >= 7 && (this.parameter2 = args[6]);
        args.length >= 8 && (this.pressed = args[7]);
        args.length >= 9 && (this.repeats = args[8]);
    }
}
import { language_type } from 'core/locale';;
import { encoding_type } from 'core/encoding';
import { color_t } from 'graphics/color';
import { image } from 'core/image';
import { font_t } from 'graphics/font';
import { font_definition } from 'graphics/font';
import { image_draw } from 'graphics/image';
let REPEATS: number[] = new Array().fill({
    0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0,
    0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
    1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0
});
let REPEAT_MILLIS: time_millis = 30;
let BUTTON_PRESSED_FRAMES: number = 3;
export function arrow_buttons_draw(x: number, y: number, buttons: arrow_button, num_buttons: number) {
    for (let i: number = 0; i < num_buttons; i++) {
        let image_id: number = buttons[i].image_id;
        if (buttons[i].pressed) {
            image_id += 1
        }
        image_draw(image_id, x + buttons[i].x_offset, y + buttons[i].y_offset);
    }
}
function get_button(m: mouse, x: number, y: number, buttons: arrow_button, num_buttons: number) {
    for (let i: number = 0; i < num_buttons; i++) {
        if (x + buttons[i].x_offset <= m.x &&
            x + buttons[i].x_offset + buttons[i].size > m.x &&
            y + buttons[i].y_offset <= m.y &&
            y + buttons[i].y_offset + buttons[i].size > m.y) {
            return i + 1;
        }
    }
    return 0;
}
export function arrow_buttons_handle_mouse(m: mouse, x: number, y: number, buttons: arrow_button, num_buttons: number, focus_button_id: number) {
    let last_time: time_millis = 0;
    let curr_time: time_millis = time_get_millis();
    let should_repeat: number = 0;
    if (curr_time - last_time >= REPEAT_MILLIS) {
        should_repeat = 1;
        last_time = curr_time;
    }
    for (let i: number = 0; i < num_buttons; i++) {
        let btn: arrow_button = buttons[i];
        if (btn.pressed) {
            btn.pressed--;
            if (!btn.pressed) {
                btn.repeats = 0;
            }
        } else {
            btn.repeats = 0;
        }
    }
    let button_id: number = get_button(m, x, y, buttons, num_buttons);
    if (focus_button_id) {
        * focus_button_id = button_id;
    }
    if (!button_id) {
        return 0;
    }
    let btn: arrow_button = buttons[button_id - 1];
    if (m.left.went_down) {
        btn.pressed = BUTTON_PRESSED_FRAMES;
        btn.repeats = 0;
        btn.left_click_handler(btn.parameter1, btn.parameter2);
        return button_id;
    }
    if (m.left.is_down) {
        btn.pressed = BUTTON_PRESSED_FRAMES;
        if (should_repeat) {
            btn.repeats++;
            if (btn.repeats < 48) {
                if (!REPEATS[btn.repeats]) {
                    return 0;
                }
            } else {
                btn.repeats = 47;
            }
            btn.left_click_handler(btn.parameter1, btn.parameter2);
        }
        return button_id;
    }
    return 0;
}
