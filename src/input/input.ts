
;
import { hotkeys } from 'input/hotkey';
import { mouse } from 'input/mouse';
export function input_go_back_requested(m: mouse, h: hotkeys) {
    return m.right.went_up || (m.is_touch && m.left.double_click) || h.escape_pressed;
}
