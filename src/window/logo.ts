import { COLOR_WHITE } from 'graphics/color';
export const enum message {
    MESSAGE_NONE = 0,
    MESSAGE_MISSING_PATCH = 1,
    MESSAGE_MISSING_FONTS = 2
};

import MESSAGE_MISSING_PATCH = message.MESSAGE_MISSING_PATCH;
import MESSAGE_MISSING_FONTS = message.MESSAGE_MISSING_FONTS;
import { config_key } from 'core/config';
import CONFIG_UI_SHOW_INTRO_VIDEO = config_key.CONFIG_UI_SHOW_INTRO_VIDEO;
import { config_key } from 'core/config';
import { config_string_key } from 'core/config';
import { config_get } from 'core/config';;
import { color_t } from 'graphics/color';
import { clip_code } from 'graphics/graphics';
import { clip_info } from 'graphics/graphics';
import { graphics_in_dialog } from 'graphics/graphics';
import { graphics_reset_dialog } from 'graphics/graphics';
import { graphics_clear_screen } from 'graphics/graphics';
import { language_type } from 'core/locale';
import { encoding_type } from 'core/encoding';
import { group_terrain } from 'core/image_group';
import GROUP_LOGO = group_terrain.GROUP_LOGO;
import { image } from 'core/image';
import { image_group } from 'core/image';
import { font_t } from 'graphics/font';
import FONT_NORMAL_PLAIN = font_t.FONT_NORMAL_PLAIN;
import { font_t } from 'graphics/font';
import { font_definition } from 'graphics/font';
import { image_draw } from 'graphics/image';
import { lang_text_draw_centered_colored } from 'graphics/lang_text';
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
import { hotkey_handle_escape } from 'input/hotkey';
import { window_id } from 'graphics/window';
import WINDOW_LOGO = window_id.WINDOW_LOGO;
import { window_id } from 'graphics/window';
import { window_type } from 'graphics/window';
import { window_show } from 'graphics/window';
import { sound_music_play_intro } from 'sound/music';
import { window_intro_video_show } from 'window/intro_video';
import { window_main_menu_show } from 'window/main_menu';
import { translation_key } from 'translation/translation';
import TR_NO_PATCH_TITLE = translation_key.TR_NO_PATCH_TITLE;
import TR_NO_PATCH_MESSAGE = translation_key.TR_NO_PATCH_MESSAGE;
import TR_MISSING_FONTS_TITLE = translation_key.TR_MISSING_FONTS_TITLE;
import TR_MISSING_FONTS_MESSAGE = translation_key.TR_MISSING_FONTS_MESSAGE;
import { translation_key } from 'translation/translation';
import { translation_string } from 'translation/translation';
import { window_plain_message_dialog_show } from 'window/plain_message_dialog';
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
    let window: window_type = {
        WINDOW_LOGO,
        draw_background,
        0,
        handle_input
    };
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
