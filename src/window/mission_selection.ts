import { image_group } from 'core/image';
import { group_terrain } from 'core/image_group';
import { game_mission_has_choice, game_mission_military, game_mission_peaceful } from 'game/mission';
import { button_none } from 'graphics/button';
import { font_t } from 'graphics/font';
import { graphics_in_dialog, graphics_reset_dialog } from 'graphics/graphics';
import { image_draw, image_draw_fullscreen_background } from 'graphics/image';
import { ib, image_button, image_buttons_draw, image_buttons_handle_mouse } from 'graphics/image_button';
import { lang_text_draw, lang_text_draw_multiline } from 'graphics/lang_text';
import { window_id, window_invalidate, window_show, window_type } from 'graphics/window';
import { hotkey_handle_escape, hotkeys } from 'input/hotkey';
import { mouse, mouse_in_dialog } from 'input/mouse';
import { scenario_campaign_rank, scenario_set_campaign_mission } from 'scenario/property';
import { sound_speech_play_file } from 'sound/speech';
import { window_mission_briefing_show } from 'window/mission_briefing';
import GROUP_SIDEBAR_BUTTONS = group_terrain.GROUP_SIDEBAR_BUTTONS;
import GROUP_SELECT_MISSION_BACKGROUND = group_terrain.GROUP_SELECT_MISSION_BACKGROUND;
import GROUP_SELECT_MISSION = group_terrain.GROUP_SELECT_MISSION;
import GROUP_SELECT_MISSION_BUTTON = group_terrain.GROUP_SELECT_MISSION_BUTTON;
;
import FONT_NORMAL_BLACK = font_t.FONT_NORMAL_BLACK;
import FONT_LARGE_BLACK = font_t.FONT_LARGE_BLACK;
import IB_NORMAL = ib.IB_NORMAL;
import WINDOW_MISSION_SELECTION = window_id.WINDOW_MISSION_SELECTION;
let BACKGROUND_IMAGE_OFFSET: number[] = [
    0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 0
];
export class unnamed20_14 {
    public x_peaceful: number = 0;
    public y_peaceful: number = 0;
    public x_military: number = 0;
    public y_military: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.x_peaceful = args[0]);
        args.length >= 2 && (this.y_peaceful = args[1]);
        args.length >= 3 && (this.x_military = args[2]);
        args.length >= 4 && (this.y_military = args[3]);
    }
}
let CAMPAIGN_SELECTION: unnamed20_14[] = [
    new unnamed20_14(0, 0, 0, 0),
    new unnamed20_14(0, 0, 0, 0),
    new unnamed20_14(292, 182, 353, 232),
    new unnamed20_14(118, 202, 324, 286),
    new unnamed20_14(549, 285, 224, 121),
    new unnamed20_14(173, 109, 240, 292),
    new unnamed20_14(576, 283, 19, 316),
    new unnamed20_14(97, 240, 156, 59),
    new unnamed20_14(127, 300, 579, 327),
    new unnamed20_14(103, 35, 410, 109),
    new unnamed20_14(191, 153, 86, 8),
    new unnamed20_14(200, 300, 400, 300),
];
let image_button_start_mission: image_button = new image_button(
    0, 0, 27, 27, IB_NORMAL, GROUP_SIDEBAR_BUTTONS, 56, button_start, button_none, 1, 0, 1
);
export class unnamed44_8 {
    public choice: number = 0;
    public focus_button: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.choice = args[0]);
        args.length >= 2 && (this.focus_button = args[1]);
    }
}
let data: unnamed44_8 = new unnamed44_8();
function draw_background() {
    let rank: number = scenario_campaign_rank();
    image_draw_fullscreen_background(image_group(GROUP_SELECT_MISSION_BACKGROUND));
    graphics_in_dialog();
    image_draw(image_group(GROUP_SELECT_MISSION) + BACKGROUND_IMAGE_OFFSET[rank], 0, 0);
    lang_text_draw(144, 1 + 3 * rank, 20, 410, FONT_LARGE_BLACK);
    if (data.choice) {
        lang_text_draw_multiline(144, 1 + 3 * rank + data.choice, 20, 440, 560, FONT_NORMAL_BLACK);
    } else {
        lang_text_draw_multiline(144, 0, 20, 440, 560, FONT_NORMAL_BLACK);
    }
    graphics_reset_dialog();
}
function is_mouse_hit(m: mouse, x: number, y: number, size: number) {
    return x <= m.x && m.x < x + size && y <= m.y && m.y < y + size;
}
function draw_foreground() {
    graphics_in_dialog();
    if (data.choice > 0) {
        image_buttons_draw(580, 410, image_button_start_mission, 1);
    }
    let rank: number = scenario_campaign_rank();
    let x_peaceful: number = CAMPAIGN_SELECTION[rank].x_peaceful - 4;
    let y_peaceful: number = CAMPAIGN_SELECTION[rank].y_peaceful - 4;
    let x_military: number = CAMPAIGN_SELECTION[rank].x_military - 4;
    let y_military: number = CAMPAIGN_SELECTION[rank].y_military - 4;
    let image_id: number = image_group(GROUP_SELECT_MISSION_BUTTON);
    if (data.choice == 0) {
        image_draw(data.focus_button == 1 ? image_id + 1 : image_id, x_peaceful, y_peaceful);
        image_draw(data.focus_button == 2 ? image_id + 1 : image_id, x_military, y_military);
    } else if (data.choice == 1) {
        image_draw(data.focus_button == 1 ? image_id + 1 : image_id + 2, x_peaceful, y_peaceful);
        image_draw(data.focus_button == 2 ? image_id + 1 : image_id, x_military, y_military);
    } else {
        image_draw(data.focus_button == 1 ? image_id + 1 : image_id, x_peaceful, y_peaceful);
        image_draw(data.focus_button == 2 ? image_id + 1 : image_id + 2, x_military, y_military);
    }
    graphics_reset_dialog();
}
function handle_input(m: mouse, h: hotkeys) {
    let m_dialog: mouse = mouse_in_dialog(m);
    let rank: number = scenario_campaign_rank();
    let x_peaceful: number = CAMPAIGN_SELECTION[rank].x_peaceful - 4;
    let y_peaceful: number = CAMPAIGN_SELECTION[rank].y_peaceful - 4;
    let x_military: number = CAMPAIGN_SELECTION[rank].x_military - 4;
    let y_military: number = CAMPAIGN_SELECTION[rank].y_military - 4;
    data.focus_button = 0;
    if (is_mouse_hit(m_dialog, x_peaceful, y_peaceful, 44)) {
        data.focus_button = 1;
    }
    if (is_mouse_hit(m_dialog, x_military, y_military, 44)) {
        data.focus_button = 2;
    }
    if (data.choice > 0) {
        if (image_buttons_handle_mouse(m_dialog, 580, 410, image_button_start_mission, 1, null)) {   
            return;
        }
        if (m_dialog.right.went_up || h.escape_pressed) {
            data.choice = 0;
            window_invalidate();
        }
    } else if (h.escape_pressed) {
        hotkey_handle_escape();
    }
    if (m_dialog.left.went_up) {
        if (is_mouse_hit(m_dialog, x_peaceful, y_peaceful, 44)) {
            scenario_set_campaign_mission(game_mission_peaceful());
            data.choice = 1;
            if (m_dialog.left.double_click) {
                button_start(0, 0);
                return;
            }
            window_invalidate();
            sound_speech_play_file("wavs/fanfare_nu1.wav");
        }
        if (is_mouse_hit(m_dialog, x_military, y_military, 44)) {
            scenario_set_campaign_mission(game_mission_military());
            data.choice = 2;
            if (m_dialog.left.double_click) {
                button_start(0, 0);
                return;
            }
            window_invalidate();
            sound_speech_play_file("wavs/fanfare_nu5.wav");
        }
    }
}
function button_start(param1: number, param2: number) {
    window_mission_briefing_show();
}
export function window_mission_selection_show() {
    if (!game_mission_has_choice()) {
        window_mission_briefing_show();
        return;
    }
    let window: window_type = new window_type(
        WINDOW_MISSION_SELECTION,
        draw_background,
        draw_foreground,
        handle_input
    );
    data.choice = 0;
    data.focus_button = 0;
    window_show(window);
}
