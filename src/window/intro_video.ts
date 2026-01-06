export const NUM_INTRO_VIDEOS = 3;
import { graphics_clear_screen } from 'graphics/graphics';
import { video_draw_fullscreen, video_init, video_is_finished, video_start, video_stop } from 'graphics/video';
import { window_go_back, window_id, window_show, window_type } from 'graphics/window';
import { hotkeys } from 'input/hotkey';
import { mouse } from 'input/mouse';
import { sound_music_play_intro } from 'sound/music';
import WINDOW_INTRO_VIDEO = window_id.WINDOW_INTRO_VIDEO;
let current_video: number;
let started: number;
let intro_videos: string[] = ["smk/logo.smk", "smk/intro.smk", "smk/credits.smk"];
function start_next_video() {
    graphics_clear_screen();
    while (current_video < NUM_INTRO_VIDEOS) {
        if (video_start(intro_videos[current_video++])) {
            video_init(0);
            return 1;
        }
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
    if (!started || m.left.went_up || m.right.went_up || video_is_finished() || h.enter_pressed) {
        video_stop();
        if (!start_next_video()) {
            sound_music_play_intro();
            window_go_back();
        }
        started = 1;
    }
}
export function window_intro_video_show() {
    current_video = 0;
    started = 0;
    let window: window_type = new window_type(
        WINDOW_INTRO_VIDEO,
        draw_background,
        draw_foreground,
        handle_input
    );
    window_show(window);
}
