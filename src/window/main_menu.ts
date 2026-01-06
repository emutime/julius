import { image_group } from 'core/image';
import { group_terrain } from 'core/image_group';
import { string_copy, string_from_ascii, string_length } from 'core/string';
import { editor_is_present } from 'editor/editor';
import { game_init_editor } from 'game/game';
import { system_exit, system_version } from 'game/system';
import { button_none } from 'graphics/button';
import { COLOR_BLACK, COLOR_FONT_LIGHT_GRAY, COLOR_WHITE } from 'graphics/color';
import { font_t } from 'graphics/font';
import { generic_button, generic_buttons_handle_mouse } from 'graphics/generic_button';
import { graphics_clear_screen, graphics_draw_rect, graphics_fill_rect, graphics_in_dialog, graphics_reset_dialog } from 'graphics/graphics';
import { image_draw } from 'graphics/image';
import { lang_text_draw_centered } from 'graphics/lang_text';
import { BLOCK_SIZE, large_label_draw } from 'graphics/panel';
import { screen_height, screen_width } from 'graphics/screen';
import { text_draw, text_get_width } from 'graphics/text';
import { window_id, window_is, window_show, window_type } from 'graphics/window';
import { hotkey_handle_escape, hotkeys } from 'input/hotkey';
import { mouse, mouse_in_dialog } from 'input/mouse';
import { sound_music_play_editor, sound_music_play_intro } from 'sound/music';
import { translation_key } from 'translation/translation';
import { window_cck_selection_show } from 'window/cck_selection';
import { window_config_show } from 'window/config';
import { file_dialog_type, file_type, window_file_dialog_show } from 'window/file_dialog';
import { window_new_career_show } from 'window/new_career';
import { window_plain_message_dialog_show } from 'window/plain_message_dialog';
import { popup_dialog_type, window_popup_dialog_show } from 'window/popup_dialog';
export const MAX_BUTTONS = 6;
;
import GROUP_MAIN_MENU_BACKGROUND = group_terrain.GROUP_MAIN_MENU_BACKGROUND;
import FONT_SMALL_PLAIN = font_t.FONT_SMALL_PLAIN;
import FONT_NORMAL_GREEN = font_t.FONT_NORMAL_GREEN;
import WINDOW_MAIN_MENU = window_id.WINDOW_MAIN_MENU;
import FILE_DIALOG_LOAD = file_dialog_type.FILE_DIALOG_LOAD;
import FILE_TYPE_SAVED_GAME = file_type.FILE_TYPE_SAVED_GAME;
import TR_NO_EDITOR_TITLE = translation_key.TR_NO_EDITOR_TITLE;
import TR_NO_EDITOR_MESSAGE = translation_key.TR_NO_EDITOR_MESSAGE;
import POPUP_DIALOG_QUIT = popup_dialog_type.POPUP_DIALOG_QUIT;
let focus_button_id: number;
let buttons: generic_button[] = [
    new generic_button(192, 100, 256, 25, button_click, button_none, 1, 0),
    new generic_button(192, 140, 256, 25, button_click, button_none, 2, 0),
    new generic_button(192, 180, 256, 25, button_click, button_none, 3, 0),
    new generic_button(192, 220, 256, 25, button_click, button_none, 4, 0),
    new generic_button(192, 260, 256, 25, button_click, button_none, 5, 0),
    new generic_button(192, 300, 256, 25, button_click, button_none, 6, 0),
];
function draw_version_string() {
    let version_string: number[] = "Julius v";
    let version_prefix_length: number = string_length(version_string);
    let text_y: number = screen_height() - 30;
    string_copy(string_from_ascii(system_version()), version_string + version_prefix_length, 99);
    let text_width: number = text_get_width(version_string, FONT_SMALL_PLAIN);
    if (text_y <= 500 && (screen_width() - 640) / 2 < text_width + 18) {
        graphics_draw_rect(10, text_y, text_width + 14, 20, COLOR_BLACK);
        graphics_fill_rect(11, text_y + 1, text_width + 12, 18, COLOR_WHITE);
        text_draw(version_string, 18, text_y + 6, FONT_SMALL_PLAIN, COLOR_BLACK);
    } else {
        text_draw(version_string, 18, text_y + 6, FONT_SMALL_PLAIN, COLOR_FONT_LIGHT_GRAY);
    }
}
function draw_background() {
    graphics_clear_screen();
    graphics_in_dialog();
    image_draw(image_group(GROUP_MAIN_MENU_BACKGROUND), 0, 0);
    graphics_reset_dialog();
    if (window_is(WINDOW_MAIN_MENU)) {
        draw_version_string();
    }
}
function draw_foreground() {
    graphics_in_dialog();
    for (let i: number = 0; i < MAX_BUTTONS; i++) {
        large_label_draw(buttons[i].x, buttons[i].y, buttons[i].width / BLOCK_SIZE, focus_button_id == i + 1 ? 1 : 0);
    }
    lang_text_draw_centered(30, 1, 192, 107, 256, FONT_NORMAL_GREEN);
    lang_text_draw_centered(30, 2, 192, 147, 256, FONT_NORMAL_GREEN);
    lang_text_draw_centered(30, 3, 192, 187, 256, FONT_NORMAL_GREEN);
    lang_text_draw_centered(9, 8, 192, 227, 256, FONT_NORMAL_GREEN);
    lang_text_draw_centered(2, 0, 192, 267, 256, FONT_NORMAL_GREEN);
    lang_text_draw_centered(30, 5, 192, 307, 256, FONT_NORMAL_GREEN);
    graphics_reset_dialog();
}
function handle_input(m: mouse, h: hotkeys) {
    let m_dialog: mouse = mouse_in_dialog(m);
    if (generic_buttons_handle_mouse(m_dialog, 0, 0, buttons, MAX_BUTTONS, focus_button_id)) {
        return;
    }
    if (h.escape_pressed) {
        hotkey_handle_escape();
    }
    if (h.load_file) {
        window_file_dialog_show(FILE_TYPE_SAVED_GAME, FILE_DIALOG_LOAD);
    }
}
function confirm_exit(accepted: number) {
    if (accepted) {
        system_exit();
    }
}
function button_click(type: number, param2: number) {
    if (type == 1) {
        window_new_career_show();
    } else if (type == 2) {
        window_file_dialog_show(FILE_TYPE_SAVED_GAME, FILE_DIALOG_LOAD);
    } else if (type == 3) {
        window_cck_selection_show();
    } else if (type == 4) {
        if (!editor_is_present() || !game_init_editor()) {
            window_plain_message_dialog_show(
                TR_NO_EDITOR_TITLE, TR_NO_EDITOR_MESSAGE);
        } else {
            sound_music_play_editor();
        }
    } else if (type == 5) {
        window_config_show();
    } else if (type == 6) {
        window_popup_dialog_show(POPUP_DIALOG_QUIT, confirm_exit, 1);
    }
}
export function window_main_menu_show(restart_music: number) {
    if (restart_music) {
        sound_music_play_intro();
    }
    let window: window_type = new window_type(
        WINDOW_MAIN_MENU,
        draw_background,
        draw_foreground,
        handle_input
    );
    window_show(window);
}
