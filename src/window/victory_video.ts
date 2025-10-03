
;
import { color_t } from 'graphics/color';
import { clip_code } from 'graphics/graphics';
import { clip_info } from 'graphics/graphics';
import { graphics_clear_screen } from 'graphics/graphics';
import { video_start } from 'graphics/video';
import { video_init } from 'graphics/video';
import { video_is_finished } from 'graphics/video';
import { video_stop } from 'graphics/video';
import { video_draw_fullscreen } from 'graphics/video';
import { time_millis } from 'core/time';
import { touch_coords } from 'input/touch';
import { touch_mode } from 'input/touch';
import { touch } from 'input/touch';
import { mouse_button } from 'input/mouse';
import { scroll_state } from 'input/mouse';
import { mouse } from 'input/mouse';
import { tooltip_type } from 'graphics/tooltip';
import { tooltip_extra_text_type } from 'graphics/tooltip';
import { tooltip_context } from 'graphics/tooltip';
import { key_type } from 'input/keys';
import { key_modifier_type } from 'input/keys';
import { hotkey_action } from 'core/hotkey_config';
import { hotkey_mapping } from 'core/hotkey_config';
import { hotkeys } from 'input/hotkey';
import { window_id } from 'graphics/window';
import WINDOW_VICTORY_VIDEO = window_id.WINDOW_VICTORY_VIDEO;
import { window_id } from 'graphics/window';
import { window_type } from 'graphics/window';
import { window_show } from 'graphics/window';
export class unnamed8_8 {
    public width: number = 0;
    public height: number = 0;
    public callback: void ( = null;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.width = args[0]);
        args.length >= 2 && (this.height = args[1]);
        args.length >= 3 && (this.callback = args[2]);
    }
}
let data: unnamed8_8 = new unnamed8_8();
function init(filename: char, width: number, height: number, callback: void () {
    if (video_start(filename)) {
        data.width = width;
        data.height = height;
        data.callback = callback;
        video_init(0);
        return 1;
    }
    return 0;
}
function draw_background() {
    graphics_clear_screen();
}
function draw_foreground() {
    video_draw_fullscreen();
}
function handle_input(m: mouse, h: hotkeys) {
    if (m.left.went_up || m.right.went_up || video_is_finished()) {
        video_stop();
        data.callback();
    }
}
export function window_victory_video_show(filename: char, width: number, height: number, callback: void () {
    if (init(filename, width, height, callback)) {
        let window: window_type = {
            WINDOW_VICTORY_VIDEO,
            draw_background,
            draw_foreground,
            handle_input
        };
        window_show(window);
    } else {
        callback();
    }
}
