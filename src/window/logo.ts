import { config_get, config_key } from 'core/config';
import { image_group } from 'core/image';
import { group_terrain } from 'core/image_group';
import { COLOR_WHITE } from 'graphics/color';
import { font_t } from 'graphics/font';
import { graphics_clear_screen, graphics_in_dialog, graphics_reset_dialog } from 'graphics/graphics';
import { image_draw } from 'graphics/image';
import { lang_text_draw_centered_colored } from 'graphics/lang_text';
import { window_id, window_show, window_type } from 'graphics/window';
import { hotkey_handle_escape, hotkeys } from 'input/hotkey';
import { mouse } from 'input/mouse';
import { sound_music_play_intro } from 'sound/music';
import { translation_key } from 'translation/translation';
import { window_intro_video_show } from 'window/intro_video';
import { window_main_menu_show } from 'window/main_menu';
import { window_plain_message_dialog_show } from 'window/plain_message_dialog';
export const enum message {
    MESSAGE_NONE = 0,
    MESSAGE_MISSING_PATCH = 1,
    MESSAGE_MISSING_FONTS = 2
};

import MESSAGE_MISSING_PATCH = message.MESSAGE_MISSING_PATCH;
import MESSAGE_MISSING_FONTS = message.MESSAGE_MISSING_FONTS;
import CONFIG_UI_SHOW_INTRO_VIDEO = config_key.CONFIG_UI_SHOW_INTRO_VIDEO;
;
import GROUP_LOGO = group_terrain.GROUP_LOGO;
import FONT_NORMAL_PLAIN = font_t.FONT_NORMAL_PLAIN;
import WINDOW_LOGO = window_id.WINDOW_LOGO;
import TR_NO_PATCH_TITLE = translation_key.TR_NO_PATCH_TITLE;
import TR_NO_PATCH_MESSAGE = translation_key.TR_NO_PATCH_MESSAGE;
import TR_MISSING_FONTS_TITLE = translation_key.TR_MISSING_FONTS_TITLE;
import TR_MISSING_FONTS_MESSAGE = translation_key.TR_MISSING_FONTS_MESSAGE;
function init() {
    sound_music_play_intro();
}
function draw_background() {
    graphics_clear_screen();
    graphics_in_dialog();
    image_draw(image_group(GROUP_LOGO), 0, 0);
    lang_text_draw_centered_colored(13, 7, 160, 462, 320, FONT_NORMAL_PLAIN, COLOR_WHITE);
    graphics_reset_dialog();
}
function handle_input(m: mouse, h: hotkeys) {
    if (m.left.went_up || m.right.went_up) {
        window_main_menu_show(0);
        return;
    }
    if (h.escape_pressed) {
        hotkey_handle_escape();
    }
}
export function window_logo_show(show_patch_message: number) {
    let window: window_type = new window_type(
        WINDOW_LOGO,
        draw_background,
        0,
        handle_input
    );
    init();
    window_show(window);
    if (show_patch_message == MESSAGE_MISSING_PATCH) {
        window_plain_message_dialog_show(TR_NO_PATCH_TITLE, TR_NO_PATCH_MESSAGE);
    } else if (show_patch_message == MESSAGE_MISSING_FONTS) {
        window_plain_message_dialog_show(TR_MISSING_FONTS_TITLE, TR_MISSING_FONTS_MESSAGE);
    }
    if (config_get(CONFIG_UI_SHOW_INTRO_VIDEO)) {
        window_intro_video_show();
    }
}
