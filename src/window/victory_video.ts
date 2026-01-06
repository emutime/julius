
;
import { graphics_clear_screen } from 'graphics/graphics';
import { video_draw_fullscreen, video_init, video_is_finished, video_start, video_stop } from 'graphics/video';
import { window_id, window_show, window_type } from 'graphics/window';
import { hotkeys } from 'input/hotkey';
import { mouse } from 'input/mouse';
import WINDOW_VICTORY_VIDEO = window_id.WINDOW_VICTORY_VIDEO;
export class unnamed8_8 {
    public width: number = 0;
    public height: number = 0;
    public callback: (() => void) | null = null;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.width = args[0]);
        args.length >= 2 && (this.height = args[1]);
        args.length >= 3 && (this.callback = args[2]);
    }
}
let data: unnamed8_8 = new unnamed8_8();
function init(filename: string, width: number, height: number, callback: () => void) {
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
        data.callback!();
    }
}
export function window_victory_video_show(filename: string, width: number, height: number, callback: () => void) {
    if (init(filename, width, height, callback)) {
        let window: window_type = new window_type(
            WINDOW_VICTORY_VIDEO,
            draw_background,
            draw_foreground,
            handle_input
        );
        window_show(window);
    } else {
        callback();
    }
}
