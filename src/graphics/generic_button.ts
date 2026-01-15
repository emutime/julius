
import { button_none } from 'graphics/button';
import { mouse } from 'input/mouse';
import { Ref } from '../../ext/crt';
export class generic_button {
    public x: number = 0;
    public y: number = 0;
    public width: number = 0;
    public height: number = 0;
    public left_click_handler: (parameter1: number, parameter2: number) => void = null;
    public right_click_handler: (parameter1: number, parameter2: number) => void = null;
    public parameter1: number = 0;
    public parameter2: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.x = args[0]);
        args.length >= 2 && (this.y = args[1]);
        args.length >= 3 && (this.width = args[2]);
        args.length >= 4 && (this.height = args[3]);
        args.length >= 5 && (this.left_click_handler = args[4]);
        args.length >= 6 && (this.right_click_handler = args[5]);
        args.length >= 7 && (this.parameter1 = args[6]);
        args.length >= 8 && (this.parameter2 = args[7]);
    }
}
function get_button(m: mouse, x: number, y: number, buttons: generic_button[], num_buttons: number) {
    for (let i: number = 0; i < num_buttons; i++) {
        if (x + buttons[i].x <= m.x &&
            x + buttons[i].x + buttons[i].width > m.x &&
            y + buttons[i].y <= m.y &&
            y + buttons[i].y + buttons[i].height > m.y) {
            return i + 1;
        }
    }
    return 0;
}
export function generic_buttons_handle_mouse(m: mouse, x: number, y: number, buttons: generic_button[], num_buttons: number, focus_button_id: Ref<number> | number | null): boolean {
    let button_id: number = get_button(m, x, y, buttons, num_buttons);
    if (focus_button_id && typeof focus_button_id !== "number") {
        focus_button_id.v = button_id;
    }
    if (!button_id) {
        return false;
    }
    let button: generic_button = buttons[button_id - 1];
    if (m.left.went_up) {
        button.left_click_handler(button.parameter1, button.parameter2);
        return button.left_click_handler != button_none;
    } else if (m.right.went_up) {
        button.right_click_handler(button.parameter1, button.parameter2);
        return button.right_click_handler != button_none;
    } else {
        return false;
    }
}
