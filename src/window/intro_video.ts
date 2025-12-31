export const NUM_INTRO_VIDEOS = 3;
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
import WINDOW_INTRO_VIDEO = window_id.WINDOW_INTRO_VIDEO;
import { window_id } from 'graphics/window';
import { window_type } from 'graphics/window';
import { window_show } from 'graphics/window';
import { window_go_back } from 'graphics/window';
import { sound_music_play_intro } from 'sound/music';
let current_video: number;
let started: number;
let intro_videos: char[] = new Array(NUM_INTRO_VIDEOS).fill({ "smk/logo.smk", "smk/intro.smk", "smk/credits.smk"});
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
    let window: window_type = {
        WINDOW_INTRO_VIDEO,
        draw_background,
        draw_foreground,
        handle_input
    };
    window_show(window);
}
