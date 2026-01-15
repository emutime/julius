export const MAX_MESSAGES = 10;
import { city_message, city_message_count, city_message_delete, city_message_get, city_message_get_advisor, city_message_get_text_id, city_message_mark_read, city_message_scroll_position, city_message_set_current, city_message_set_scroll_position, city_message_sort_and_compact } from 'city/message';
import { image_group } from 'core/image';
import { group_terrain } from 'core/image_group';
import { lang_get_message, lang_message, lang_message_type } from 'core/lang';
import { button_none } from 'graphics/button';
import { font_t } from 'graphics/font';
import { generic_button, generic_buttons_handle_mouse } from 'graphics/generic_button';
import { graphics_in_dialog, graphics_reset_dialog } from 'graphics/graphics';
import { image_draw } from 'graphics/image';
import { ib, image_button, image_buttons_draw, image_buttons_handle_mouse } from 'graphics/image_button';
import { lang_text_draw, lang_text_draw_centered, lang_text_draw_multiline, lang_text_draw_year } from 'graphics/lang_text';
import { BLOCK_SIZE, inner_panel_draw, outer_panel_draw } from 'graphics/panel';
import { scrollbar_draw, scrollbar_handle_mouse, scrollbar_init, scrollbar_type, scrollbar_update_total_elements } from 'graphics/scrollbar';
import { text_draw } from 'graphics/text';
import { tooltip_context, tooltip_type } from 'graphics/tooltip';
import { window_id, window_invalidate, window_show, window_type } from 'graphics/window';
import { hotkeys } from 'input/hotkey';
import { input_go_back_requested } from 'input/input';
import { mouse, mouse_in_dialog } from 'input/mouse';
import { window_city_draw_all, window_city_show } from 'window/city';
import { message_dialog, window_message_dialog_show, window_message_dialog_show_city_message } from 'window/message_dialog';
import { Ref } from '../../ext/crt';
;
import GROUP_ARROW_MESSAGE_PROBLEMS = group_terrain.GROUP_ARROW_MESSAGE_PROBLEMS;
import GROUP_CONTEXT_ICONS = group_terrain.GROUP_CONTEXT_ICONS;
import MESSAGE_TYPE_DISASTER = lang_message_type.MESSAGE_TYPE_DISASTER;
import FONT_NORMAL_BLACK = font_t.FONT_NORMAL_BLACK;
import FONT_NORMAL_WHITE = font_t.FONT_NORMAL_WHITE;
import FONT_NORMAL_RED = font_t.FONT_NORMAL_RED;
import FONT_LARGE_BLACK = font_t.FONT_LARGE_BLACK;
import FONT_SMALL_PLAIN = font_t.FONT_SMALL_PLAIN;
import FONT_NORMAL_GREEN = font_t.FONT_NORMAL_GREEN;
import IB_NORMAL = ib.IB_NORMAL;
import TOOLTIP_BUTTON = tooltip_type.TOOLTIP_BUTTON;
import WINDOW_MESSAGE_LIST = window_id.WINDOW_MESSAGE_LIST;
import MESSAGE_DIALOG_MESSAGES = message_dialog.MESSAGE_DIALOG_MESSAGES;
let image_button_help: image_button = new image_button(0, 0, 27, 27, IB_NORMAL, GROUP_CONTEXT_ICONS, 0, button_help, button_none, 0, 0, 1);
let image_button_close: image_button = new image_button(0, 0, 24, 24, IB_NORMAL, GROUP_CONTEXT_ICONS, 4, button_close, button_none, 0, 0, 1);
let generic_buttons_messages: generic_button[] = [
    new generic_button(0, 0, 412, 18, button_message, button_delete, 0, 0),
    new generic_button(0, 20, 412, 18, button_message, button_delete, 1, 0),
    new generic_button(0, 40, 412, 18, button_message, button_delete, 2, 0),
    new generic_button(0, 60, 412, 18, button_message, button_delete, 3, 0),
    new generic_button(0, 80, 412, 18, button_message, button_delete, 4, 0),
    new generic_button(0, 100, 412, 18, button_message, button_delete, 5, 0),
    new generic_button(0, 120, 412, 18, button_message, button_delete, 6, 0),
    new generic_button(0, 140, 412, 18, button_message, button_delete, 7, 0),
    new generic_button(0, 160, 412, 18, button_message, button_delete, 8, 0),
    new generic_button(0, 180, 412, 18, button_message, button_delete, 9, 0),
];
let scrollbar: scrollbar_type = new scrollbar_type(432, 112, 208, 416, MAX_MESSAGES, on_scroll, 1);
export class unnamed49_8 {
    public width_blocks: number = 0;
    public height_blocks: number = 0;
    public x_text: number = 0;
    public y_text: number = 0;
    public text_width_blocks: number = 0;
    public text_height_blocks: number = 0;
    public focus_button_id: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.width_blocks = args[0]);
        args.length >= 2 && (this.height_blocks = args[1]);
        args.length >= 3 && (this.x_text = args[2]);
        args.length >= 4 && (this.y_text = args[3]);
        args.length >= 5 && (this.text_width_blocks = args[4]);
        args.length >= 6 && (this.text_height_blocks = args[5]);
        args.length >= 7 && (this.focus_button_id = args[6]);
    }
}
let data: unnamed49_8 = new unnamed49_8();
function init() {
    city_message_sort_and_compact();
    scrollbar_init(scrollbar, city_message_scroll_position(), city_message_count());
}
function draw_background() {
    window_city_draw_all();
    graphics_in_dialog();
    data.width_blocks = 30;
    data.height_blocks = 22;
    data.x_text = 16;
    data.y_text = 112;
    data.text_width_blocks = data.width_blocks - 4;
    data.text_height_blocks = data.height_blocks - 9;
    outer_panel_draw(0, 32, data.width_blocks, data.height_blocks);
    lang_text_draw_centered(63, 0, 0, 48, BLOCK_SIZE * data.width_blocks, FONT_LARGE_BLACK);
    inner_panel_draw(data.x_text, data.y_text, data.text_width_blocks, data.text_height_blocks);
    if (city_message_count() > 0) {
        lang_text_draw(63, 2, data.x_text + 42, data.y_text - 12, FONT_SMALL_PLAIN);
        lang_text_draw(63, 3, data.x_text + 180, data.y_text - 12, FONT_SMALL_PLAIN);
        lang_text_draw_multiline(63, 4,
            data.x_text + 50, data.y_text + 12 + BLOCK_SIZE * data.text_height_blocks,
            BLOCK_SIZE * data.text_width_blocks - 100, FONT_NORMAL_BLACK);
    } else {
        lang_text_draw_multiline(63, 1,
            data.x_text + 16, data.y_text + 80,
            BLOCK_SIZE * data.text_width_blocks - 48, FONT_NORMAL_GREEN);
    }
    graphics_reset_dialog();
}
function draw_messages(total_messages: number) {
    let max: number = total_messages < MAX_MESSAGES ? total_messages : MAX_MESSAGES;
    let index: number = scrollbar.scroll_position;
    for (let i: number = 0; i < max; i++, index++) {
        let msg: city_message = city_message_get(index);
        let lang_msg: lang_message = lang_get_message(city_message_get_text_id(msg.message_type));
        let image_offset: number = 0;
        if (lang_msg.message_type == MESSAGE_TYPE_DISASTER) {
            image_offset = 2;
        }
        if (msg.is_read) {
            image_draw(image_group(GROUP_ARROW_MESSAGE_PROBLEMS) + 15 + image_offset,
                data.x_text + 12, data.y_text + 6 + 20 * i);
        } else {
            image_draw(image_group(GROUP_ARROW_MESSAGE_PROBLEMS) + 14 + image_offset,
                data.x_text + 12, data.y_text + 6 + 20 * i);
        }
        let font: font_t = FONT_NORMAL_WHITE;
        if (data.focus_button_id == i + 1) {
            font = FONT_NORMAL_RED;
        }
        let width: number = lang_text_draw(25, msg.month, data.x_text + 42, data.y_text + 8 + 20 * i, font);
        lang_text_draw_year(msg.year,
            data.x_text + 42 + width, data.y_text + 8 + 20 * i, font);
        text_draw(
            lang_msg.title.text,
            data.x_text + 180, data.y_text + 8 + 20 * i, font, 0);
    }
    scrollbar_draw(scrollbar);
}
function draw_foreground() {
    graphics_in_dialog();
    image_buttons_draw(16, 32 + BLOCK_SIZE * data.height_blocks - 42, image_button_help, 1);
    image_buttons_draw(BLOCK_SIZE * data.width_blocks - 38, 32 + BLOCK_SIZE * data.height_blocks - 36,
        image_button_close, 1);
    let total_messages: number = city_message_count();
    if (total_messages > 0) {
        draw_messages(total_messages);
    }
    graphics_reset_dialog();
}
function handle_input(m: mouse, h: hotkeys) {
    let m_dialog: mouse = mouse_in_dialog(m);
    let old_button_id: number = data.focus_button_id;
    data.focus_button_id = 0;
    if (scrollbar_handle_mouse(scrollbar, m_dialog)) {
        data.focus_button_id = 13;
        return;
    }
    const buttonRef = new Ref(0);
    let handled: number = 0;
    if (image_buttons_handle_mouse(m_dialog, 16, 32 + BLOCK_SIZE * data.height_blocks - 42,
        image_button_help, 1, buttonRef)) {
        handled = 1;
    }
    if (buttonRef.v) {
        data.focus_button_id = 11;
    }
    buttonRef.v = 0;
    if (image_buttons_handle_mouse(m_dialog, BLOCK_SIZE * data.width_blocks - 38,
        32 + BLOCK_SIZE * data.height_blocks - 36, image_button_close, 1, buttonRef)) {
        handled = 1;
    }
    if (buttonRef.v) {
        data.focus_button_id = 12;
    }
    buttonRef.v = 0;
    if (generic_buttons_handle_mouse(m_dialog, data.x_text, data.y_text + 4,
        generic_buttons_messages, MAX_MESSAGES, buttonRef)) {
        handled = 1;
    }
    if (!data.focus_button_id) {
        data.focus_button_id = buttonRef.v;
    }
    if (buttonRef.v && old_button_id != buttonRef.v) {
        window_invalidate();
    }
    if (!handled && input_go_back_requested(m, h)) {
        button_close(0, 0);
    }
}
function on_scroll() {
    city_message_set_scroll_position(scrollbar.scroll_position);
    window_invalidate();
}
function button_help(param1: number, param2: number) {
    window_message_dialog_show(MESSAGE_DIALOG_MESSAGES, window_city_draw_all);
}
function button_close(param1: number, param2: number) {
    window_city_show();
}
function button_message(param1: number, param2: number) {
    let id: number = city_message_set_current(scrollbar.scroll_position + param1);
    if (id < city_message_count()) {
        let msg: city_message = city_message_get(id);
        city_message_mark_read(id);
        window_message_dialog_show_city_message(
            city_message_get_text_id(msg.message_type),
            msg.year, msg.month, msg.param1, msg.param2,
            city_message_get_advisor(msg.message_type),
            0);
    }
}
function button_delete(id_to_delete: number, param2: number) {
    let id: number = city_message_set_current(scrollbar.scroll_position + id_to_delete);
    if (id < city_message_count()) {
        city_message_delete(id);
        scrollbar_update_total_elements(scrollbar, city_message_count());
        window_invalidate();
    }
}
function get_tooltip(c: tooltip_context) {
    if (data.focus_button_id == 11) {
        c.text_id = 1;
    } else if (data.focus_button_id == 12) {
        c.text_id = 2;
    } else {
        return;
    }
    c.type = TOOLTIP_BUTTON;
}
export function window_message_list_show() {
    let window: window_type = new window_type(
        WINDOW_MESSAGE_LIST,
        draw_background,
        draw_foreground,
        handle_input,
        get_tooltip
    );
    init();
    window_show(window);
}
