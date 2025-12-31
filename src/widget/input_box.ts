import { system_keyboard_hide, system_keyboard_set_input_rect, system_keyboard_show } from 'game/system';
import { font_t } from 'graphics/font';
import { BLOCK_SIZE, inner_panel_draw } from 'graphics/panel';
import { text_capture_cursor, text_draw, text_draw_cursor } from 'graphics/text';
import { keyboard_cursor_position, keyboard_input_is_accepted, keyboard_is_insert, keyboard_offset_end, keyboard_offset_start, keyboard_pause_capture, keyboard_refresh, keyboard_resume_capture, keyboard_start_capture, keyboard_stop_capture } from 'input/keyboard';
import { mouse } from 'input/mouse';
;
export class input_box {
    public x: number = 0;
    public y: number = 0;
    public width_blocks: number = 0;
    public height_blocks: number = 0;
    public font: font_t = null;
    public allow_punctuation: number = 0;
    public text: number = 0;
    public text_length: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.x = args[0]);
        args.length >= 2 && (this.y = args[1]);
        args.length >= 3 && (this.width_blocks = args[2]);
        args.length >= 4 && (this.height_blocks = args[3]);
        args.length >= 5 && (this.font = args[4]);
        args.length >= 6 && (this.allow_punctuation = args[5]);
        args.length >= 7 && (this.text = args[6]);
        args.length >= 8 && (this.text_length = args[7]);
    }
}
export function input_box_start(box: input_box) {
    let text_width: number = (box.width_blocks - 2) * BLOCK_SIZE;
    keyboard_start_capture(box.text, box.text_length, box.allow_punctuation, text_width, box.font);
    system_keyboard_set_input_rect(box.x, box.y,
        box.width_blocks * BLOCK_SIZE,
        box.height_blocks * BLOCK_SIZE);
}
export function input_box_pause(box: input_box) {
    keyboard_pause_capture();
}
export function input_box_resume(box: input_box) {
    keyboard_resume_capture();
}
export function input_box_stop(box: input_box) {
    keyboard_stop_capture();
    system_keyboard_set_input_rect(0, 0, 0, 0);
}
export function input_box_refresh_text(box: input_box) {
    keyboard_refresh();
}
export function input_box_is_accepted(box: input_box) {
    return keyboard_input_is_accepted();
}
function is_mouse_inside_input(m: mouse, box: input_box) {
    return m.x >= box.x && m.x < box.x + box.width_blocks * BLOCK_SIZE &&
        m.y >= box.y && m.y < box.y + box.height_blocks * BLOCK_SIZE;
}
export function input_box_draw(box: input_box) {
    inner_panel_draw(box.x, box.y, box.width_blocks, box.height_blocks);
    text_capture_cursor(keyboard_cursor_position(), keyboard_offset_start(), keyboard_offset_end());
    let text_x: number = box.x + 16;
    let text_y: number = box.y + 10;
    text_draw(box.text, text_x, text_y, box.font, 0);
    text_draw_cursor(text_x, text_y + 1, keyboard_is_insert());
}
export function input_box_handle_mouse(m: mouse, box: input_box) {
    if (!m.left.went_up) {
        return 0;
    }
    let selected: number = is_mouse_inside_input(m, box);
    if (selected) {
        system_keyboard_show();
    } else {
        system_keyboard_hide();
    }
    return selected;
}
