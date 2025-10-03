export const DISPLAY_TIME_MILLIS = 1000;
import { intermezzo_type } from 'window/intermezzo';
import INTERMEZZO_MISSION_BRIEFING = intermezzo_type.INTERMEZZO_MISSION_BRIEFING;
import INTERMEZZO_FIRED = intermezzo_type.INTERMEZZO_FIRED;
import INTERMEZZO_WON = intermezzo_type.INTERMEZZO_WON;
import { time_millis } from 'core/time';
import { time_get_millis } from 'core/time';;
import { color_t } from 'graphics/color';
import { clip_code } from 'graphics/graphics';
import { clip_info } from 'graphics/graphics';
import { graphics_clear_screen } from 'graphics/graphics';
import { language_type } from 'core/locale';
import { encoding_type } from 'core/encoding';
import { group_terrain } from 'core/image_group';
import GROUP_INTERMEZZO_BACKGROUND = group_terrain.GROUP_INTERMEZZO_BACKGROUND;
import { image } from 'core/image';
import { image_group } from 'core/image';
import { font_t } from 'graphics/font';
import { font_definition } from 'graphics/font';
import { image_draw } from 'graphics/image';
import { screen_width } from 'graphics/screen';
import { screen_height } from 'graphics/screen';
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
import WINDOW_INTERMEZZO = window_id.WINDOW_INTERMEZZO;
import { window_id } from 'graphics/window';
import { window_type } from 'graphics/window';
import { window_show } from 'graphics/window';
import { scenario_climate } from 'scenario/property';
import { scenario_is_custom } from 'scenario/property';
import { scenario_campaign_mission } from 'scenario/property';
import { sound_music_stop } from 'sound/music';
import { sound_speech_play_file } from 'sound/speech';
import { sound_speech_stop } from 'sound/speech';
let SOUND_FILES_BRIEFING: char[] = new Array(32).fill({
    "wavs/01b.wav",
    "wavs/02b.wav",
    "wavs/03b.wav",
    "wavs/04b.wav",
    "wavs/05b.wav",
    "wavs/06b.wav",
    "wavs/07b.wav",
    "wavs/08b.wav",
    "wavs/09b.wav",
    "wavs/10b.wav",
    "wavs/11b.wav",
    "wavs/12b.wav",
    "wavs/13b.wav",
    "wavs/14b.wav",
    "wavs/15b.wav",
    "wavs/16b.wav",
    "wavs/17b.wav",
    "wavs/18b.wav",
    "wavs/19b.wav",
    "wavs/20b.wav",
    "wavs/21b.wav",
    "wavs/22b.wav",
});
let SOUND_FILES_WON: char[] = new Array(32).fill({
    "wavs/01w.wav",
    "wavs/02w.wav",
    "wavs/03w.wav",
    "wavs/04w.wav",
    "wavs/05w.wav",
    "wavs/06w.wav",
    "wavs/07w.wav",
    "wavs/08w.wav",
    "wavs/09w.wav",
    "wavs/10w.wav",
    "wavs/11w.wav",
    "wavs/12w.wav",
    "wavs/13w.wav",
    "wavs/14w.wav",
    "wavs/15w.wav",
    "wavs/16w.wav",
    "wavs/17w.wav",
    "wavs/18w.wav",
    "wavs/19w.wav",
    "wavs/20w.wav",
    "wavs/21w.wav",
    "wavs/22w.wav",
});
let SOUND_FILE_LOSE: char[] = new Array().fill("wavs/lose_game.wav");
export class unnamed66_8 {
    public type: intermezzo_type = null;
    public callback: void ( = null;
    public start_time: time_millis = null;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.type = args[0]);
        args.length >= 2 && (this.callback = args[1]);
        args.length >= 3 && (this.start_time = args[2]);
    }
}
let data: unnamed66_8 = new unnamed66_8();
function init(type: intermezzo_type, callback: void () {
    data.type = type;
    data.callback = callback;
    data.start_time = time_get_millis();
    sound_music_stop();
    sound_speech_stop();
    if (data.type == INTERMEZZO_FIRED) {
        sound_speech_play_file(SOUND_FILE_LOSE);
    } else if (!scenario_is_custom()) {
        let mission: number = scenario_campaign_mission();
        if (data.type == INTERMEZZO_MISSION_BRIEFING) {
            sound_speech_play_file(SOUND_FILES_BRIEFING[mission]);
        } else if (data.type == INTERMEZZO_WON) {
            sound_speech_play_file(SOUND_FILES_WON[mission]);
        }
    }
}
function draw_background() {
    graphics_clear_screen();
    let x_offset: number = (screen_width() - 1024) / 2;
    let y_offset: number = (screen_height() - 768) / 2;
    let mission: number = scenario_campaign_mission();
    let image_base: number = image_group(GROUP_INTERMEZZO_BACKGROUND);
    if (data.type == INTERMEZZO_MISSION_BRIEFING) {
        if (scenario_is_custom()) {
            image_draw(image_base + 1, x_offset, y_offset);
        } else {
            image_draw(image_base + 1 + 2 * mission, x_offset, y_offset);
        }
    } else if (data.type == INTERMEZZO_FIRED) {
        image_draw(image_base, x_offset, y_offset);
    } else if (data.type == INTERMEZZO_WON) {
        if (scenario_is_custom()) {
            image_draw(image_base + 2, x_offset, y_offset);
        } else {
            image_draw(image_base + 2 + 2 * mission, x_offset, y_offset);
        }
    }
}
function handle_input(m: mouse, h: hotkeys) {
    let current_time: time_millis = time_get_millis();
    if (m.right.went_up || (m.is_touch && m.left.double_click)
        || current_time - data.start_time > DISPLAY_TIME_MILLIS) {
        data.callback();
    }
}
export function window_intermezzo_show(type: intermezzo_type, callback: void () {
    let window: window_type = {
        WINDOW_INTERMEZZO,
        draw_background,
        0,
        handle_input
    };
    init(type, callback);
    window_show(window);
}
