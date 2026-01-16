export const MAX_HISTORY = 200;
import { advisor_type } from 'city/constants';
import { message_advisor } from 'city/message';
import { city_sentiment_low_mood_cause } from 'city/sentiment';
import { city_view_go_to_grid_offset } from 'city/view';
import { image, image_get, image_group } from 'core/image';
import { group_terrain } from 'core/image_group';
import { lang_get_message, lang_message, lang_message_type, lang_type } from 'core/lang';
import { empire_city_get } from 'empire/city';
import { formation_grid_offset_for_invasion } from 'figure/formation';
import { resource_image_offset, resource_image_type, resource_type } from 'game/resource';
import { button_none } from 'graphics/button';
import { COLOR_BLACK, COLOR_WHITE } from 'graphics/color';
import { font_t } from 'graphics/font';
import { graphics_draw_rect, graphics_in_dialog, graphics_reset_clip_rectangle, graphics_reset_dialog, graphics_set_clip_rectangle } from 'graphics/graphics';
import { image_draw } from 'graphics/image';
import { ib, image_button, image_buttons_draw, image_buttons_handle_mouse } from 'graphics/image_button';
import { lang_text_draw, lang_text_draw_amount, lang_text_draw_multiline, lang_text_draw_year } from 'graphics/lang_text';
import { BLOCK_SIZE, inner_panel_draw, outer_panel_draw } from 'graphics/panel';
import { rich_text_clear_links, rich_text_draw, rich_text_draw_colored, rich_text_draw_scrollbar, rich_text_get_clicked_link, rich_text_handle_mouse, rich_text_init, rich_text_reset, rich_text_scroll_position, rich_text_set_fonts } from 'graphics/rich_text';
import { text_draw, text_draw_centered, text_draw_money, text_draw_multiline, text_draw_number } from 'graphics/text';
import { tooltip_context, tooltip_type } from 'graphics/tooltip';
import { video_draw, video_init, video_start, video_stop } from 'graphics/video';
import { window_draw_underlying_window, window_go_back, window_id, window_invalidate, window_show, window_type } from 'graphics/window';
import { hotkeys } from 'input/hotkey';
import { input_go_back_requested } from 'input/input';
import { mouse, mouse_in_dialog } from 'input/mouse';
import { scroll_drag_end } from 'input/scroll';
import { scenario_player_name } from 'scenario/property';
import { scenario_request, scenario_request_get, scenario_request_state } from 'scenario/request';
import { window_advisors_show_advisor } from 'window/advisors';
import { window_city_draw_all, window_city_show } from 'window/city';
import { Ref } from '../../ext/crt';
export const enum message_dialog {
    MESSAGE_DIALOG_ABOUT = 0,
    MESSAGE_DIALOG_HELP = 10,
    MESSAGE_DIALOG_TOP_FUNDS = 15,
    MESSAGE_DIALOG_TOP_POPULATION = 16,
    MESSAGE_DIALOG_TOP_DATE = 17,
    MESSAGE_DIALOG_OVERLAYS = 18,
    MESSAGE_DIALOG_ADVISOR_LABOR = 20,
    MESSAGE_DIALOG_ADVISOR_MILITARY = 21,
    MESSAGE_DIALOG_ADVISOR_IMPERIAL = 22,
    MESSAGE_DIALOG_ADVISOR_RATINGS = 23,
    MESSAGE_DIALOG_ADVISOR_TRADE = 24,
    MESSAGE_DIALOG_ADVISOR_POPULATION = 25,
    MESSAGE_DIALOG_ADVISOR_HEALTH = 26,
    MESSAGE_DIALOG_ADVISOR_EDUCATION = 27,
    MESSAGE_DIALOG_ADVISOR_ENTERTAINMENT = 28,
    MESSAGE_DIALOG_ADVISOR_RELIGION = 29,
    MESSAGE_DIALOG_ADVISOR_FINANCIAL = 30,
    MESSAGE_DIALOG_ADVISOR_CHIEF = 31,
    MESSAGE_DIALOG_EMPIRE_MAP = 32,
    MESSAGE_DIALOG_MESSAGES = 34,
    MESSAGE_DIALOG_INDUSTRY = 46,
    MESSAGE_DIALOG_THEFT = 251,
    MESSAGE_DIALOG_EDITOR_ABOUT = 331,
    MESSAGE_DIALOG_EDITOR_HELP = 332,
};
import MESSAGE_DIALOG_HELP = message_dialog.MESSAGE_DIALOG_HELP;
import MESSAGE_DIALOG_THEFT = message_dialog.MESSAGE_DIALOG_THEFT;;
import MESSAGE_ADVISOR_LABOR = message_advisor.MESSAGE_ADVISOR_LABOR;
import MESSAGE_ADVISOR_TRADE = message_advisor.MESSAGE_ADVISOR_TRADE;
import MESSAGE_ADVISOR_POPULATION = message_advisor.MESSAGE_ADVISOR_POPULATION;
import MESSAGE_ADVISOR_IMPERIAL = message_advisor.MESSAGE_ADVISOR_IMPERIAL;
import MESSAGE_ADVISOR_MILITARY = message_advisor.MESSAGE_ADVISOR_MILITARY;
import MESSAGE_ADVISOR_HEALTH = message_advisor.MESSAGE_ADVISOR_HEALTH;
import MESSAGE_ADVISOR_RELIGION = message_advisor.MESSAGE_ADVISOR_RELIGION;
import GROUP_ARROW_MESSAGE_PROBLEMS = group_terrain.GROUP_ARROW_MESSAGE_PROBLEMS;
import GROUP_SIDEBAR_BUTTONS = group_terrain.GROUP_SIDEBAR_BUTTONS;
import GROUP_RESOURCE_ICONS = group_terrain.GROUP_RESOURCE_ICONS;
import GROUP_CONTEXT_ICONS = group_terrain.GROUP_CONTEXT_ICONS;
import GROUP_MESSAGE_IMAGES = group_terrain.GROUP_MESSAGE_IMAGES;
import GROUP_BIG_PEOPLE = group_terrain.GROUP_BIG_PEOPLE;
import GROUP_MESSAGE_ADVISOR_BUTTONS = group_terrain.GROUP_MESSAGE_ADVISOR_BUTTONS;
import TYPE_MANUAL = lang_type.TYPE_MANUAL;
import TYPE_MESSAGE = lang_type.TYPE_MESSAGE;
import MESSAGE_TYPE_DISASTER = lang_message_type.MESSAGE_TYPE_DISASTER;
import MESSAGE_TYPE_IMPERIAL = lang_message_type.MESSAGE_TYPE_IMPERIAL;
import MESSAGE_TYPE_EMIGRATION = lang_message_type.MESSAGE_TYPE_EMIGRATION;
import MESSAGE_TYPE_TUTORIAL = lang_message_type.MESSAGE_TYPE_TUTORIAL;
import MESSAGE_TYPE_TRADE_CHANGE = lang_message_type.MESSAGE_TYPE_TRADE_CHANGE;
import MESSAGE_TYPE_PRICE_CHANGE = lang_message_type.MESSAGE_TYPE_PRICE_CHANGE;
import MESSAGE_TYPE_INVASION = lang_message_type.MESSAGE_TYPE_INVASION;
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
import RESOURCE_IMAGE_ICON = resource_image_type.RESOURCE_IMAGE_ICON;
import FONT_NORMAL_BLACK = font_t.FONT_NORMAL_BLACK;
import FONT_NORMAL_WHITE = font_t.FONT_NORMAL_WHITE;
import FONT_NORMAL_RED = font_t.FONT_NORMAL_RED;
import FONT_LARGE_BLACK = font_t.FONT_LARGE_BLACK;
import FONT_SMALL_PLAIN = font_t.FONT_SMALL_PLAIN;
import IB_NORMAL = ib.IB_NORMAL;
import TOOLTIP_BUTTON = tooltip_type.TOOLTIP_BUTTON;
import WINDOW_MESSAGE_DIALOG = window_id.WINDOW_MESSAGE_DIALOG;
import REQUEST_STATE_NORMAL = scenario_request_state.REQUEST_STATE_NORMAL;
import REQUEST_STATE_OVERDUE = scenario_request_state.REQUEST_STATE_OVERDUE;
import ADVISOR_LABOR = advisor_type.ADVISOR_LABOR;
import ADVISOR_MILITARY = advisor_type.ADVISOR_MILITARY;
import ADVISOR_IMPERIAL = advisor_type.ADVISOR_IMPERIAL;
import ADVISOR_TRADE = advisor_type.ADVISOR_TRADE;
import ADVISOR_POPULATION = advisor_type.ADVISOR_POPULATION;
import ADVISOR_HEALTH = advisor_type.ADVISOR_HEALTH;
import ADVISOR_RELIGION = advisor_type.ADVISOR_RELIGION;
let image_button_back: image_button = new image_button(
    0, 0, 31, 20, IB_NORMAL, GROUP_ARROW_MESSAGE_PROBLEMS, 8, button_back, button_none, 0, 0, 1
);
let image_button_close: image_button = new image_button(
    0, 0, 24, 24, IB_NORMAL, GROUP_CONTEXT_ICONS, 4, button_close, button_none, 0, 0, 1
);
let image_button_go_to_problem: image_button = new image_button(
    0, 0, 27, 27, IB_NORMAL, GROUP_SIDEBAR_BUTTONS, 52, button_go_to_problem, button_none, 1, 0, 1
);
let image_button_help: image_button = new image_button(
    0, 0, 18, 27, IB_NORMAL, GROUP_CONTEXT_ICONS, 0, button_help, button_none, 1, 0, 1
);
let image_button_labor: image_button = new image_button(
    0, 0, 27, 27, IB_NORMAL, GROUP_MESSAGE_ADVISOR_BUTTONS, 0, button_advisor, button_none, ADVISOR_LABOR, 0, 1
);
let image_button_trade: image_button = new image_button(
    0, 0, 27, 27, IB_NORMAL, GROUP_MESSAGE_ADVISOR_BUTTONS, 12, button_advisor, button_none, ADVISOR_TRADE, 0, 1
);
let image_button_population: image_button = new image_button(
    0, 0, 27, 27, IB_NORMAL, GROUP_MESSAGE_ADVISOR_BUTTONS, 15, button_advisor, button_none, ADVISOR_POPULATION, 0, 1
);
let image_button_imperial: image_button = new image_button(
    0, 0, 27, 27, IB_NORMAL, GROUP_MESSAGE_ADVISOR_BUTTONS, 6, button_advisor, button_none, ADVISOR_IMPERIAL, 0, 1
);
let image_button_military: image_button = new image_button(
    0, 0, 27, 27, IB_NORMAL, GROUP_MESSAGE_ADVISOR_BUTTONS, 3, button_advisor, button_none, ADVISOR_MILITARY, 0, 1
);
let image_button_health: image_button = new image_button(
    0, 0, 27, 27, IB_NORMAL, GROUP_MESSAGE_ADVISOR_BUTTONS, 18, button_advisor, button_none, ADVISOR_HEALTH, 0, 1
);
let image_button_religion: image_button = new image_button(
    0, 0, 27, 27, IB_NORMAL, GROUP_MESSAGE_ADVISOR_BUTTONS, 27, button_advisor, button_none, ADVISOR_RELIGION, 0, 1
);
class unnamed71_5 {
    public text_id: number = 0;
    public scroll_position: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.text_id = args[0]);
        args.length >= 2 && (this.scroll_position = args[1]);
    }
}
export class unnamed70_8 {
    public history: unnamed71_5[] = Array.from({ length: 200 }, () => new unnamed71_5());
    public num_history: number = 0;
    public text_id: number = 0;
    public background_callback: (() => void) | null = null;
    public show_video: number = 0;
    public x: number = 0;
    public y: number = 0;
    public x_text: number = 0;
    public y_text: number = 0;
    public text_height_blocks: number = 0;
    public text_width_blocks: number = 0;
    public focus_button_id: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.history = args[0]);
        args.length >= 2 && (this.num_history = args[1]);
        args.length >= 3 && (this.text_id = args[2]);
        args.length >= 4 && (this.background_callback = args[3]);
        args.length >= 5 && (this.show_video = args[4]);
        args.length >= 6 && (this.x = args[5]);
        args.length >= 7 && (this.y = args[6]);
        args.length >= 8 && (this.x_text = args[7]);
        args.length >= 9 && (this.y_text = args[8]);
        args.length >= 10 && (this.text_height_blocks = args[9]);
        args.length >= 11 && (this.text_width_blocks = args[10]);
        args.length >= 12 && (this.focus_button_id = args[11]);
    }
}
let data: unnamed70_8 = new unnamed70_8();
export class unnamed90_8 {
    public year: number = 0;
    public month: number = 0;
    public param1: number = 0;
    public param2: number = 0;
    public message_advisor: number = 0;
    public use_popup: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.year = args[0]);
        args.length >= 2 && (this.month = args[1]);
        args.length >= 3 && (this.param1 = args[2]);
        args.length >= 4 && (this.param2 = args[3]);
        args.length >= 5 && (this.message_advisor = args[4]);
        args.length >= 6 && (this.use_popup = args[5]);
    }
}
let player_message: unnamed90_8 = new unnamed90_8();
function set_city_message(year: number, month: number, param1: number, param2: number, message_advisor: number, use_popup: number) {
    player_message.year = year;
    player_message.month = month;
    player_message.param1 = param1;
    player_message.param2 = param2;
    player_message.message_advisor = message_advisor;
    player_message.use_popup = use_popup;
}
function init(text_id: number, background_callback: (() => void) | null) {
    scroll_drag_end();
    for (let i: number = 0; i < MAX_HISTORY; i++) {
        data.history[i].text_id = 0;
        data.history[i].scroll_position = 0;
    }
    data.num_history = 0;
    rich_text_reset(0);
    data.text_id = text_id;
    data.background_callback = background_callback;
    let msg: lang_message = lang_get_message(text_id);
    if (player_message.use_popup != 1) {
        data.show_video = 0;
    } else if (msg.video.text && video_start(msg.video.text)) {
        data.show_video = 1;
    } else {
        data.show_video = 0;
    }
    if (data.show_video) {
        video_init(1);
    }
}
function resource_image(resource: number) {
    let image_id: number = image_group(GROUP_RESOURCE_ICONS) + resource;
    image_id += resource_image_offset(resource, RESOURCE_IMAGE_ICON)
    return image_id;
}
function is_problem_message(msg: lang_message) {
    return msg.type == TYPE_MESSAGE &&
        (msg.message_type == MESSAGE_TYPE_DISASTER || msg.message_type == MESSAGE_TYPE_INVASION);
}
function draw_city_message_text(msg: lang_message) {
    if (msg.message_type != MESSAGE_TYPE_TUTORIAL) {
        let width: number = lang_text_draw(25, player_message.month, data.x_text + 10, data.y_text + 6, FONT_NORMAL_WHITE);
        width += lang_text_draw_year(player_message.year,
            data.x_text + 12 + width, data.y_text + 6, FONT_NORMAL_WHITE)
        if (msg.message_type == MESSAGE_TYPE_DISASTER && player_message.param1) {
            if (data.text_id == MESSAGE_DIALOG_THEFT) {
                lang_text_draw_amount(8, 0, player_message.param1, data.x + 240, data.y_text + 6, FONT_NORMAL_WHITE);
            } else {
                lang_text_draw(41, player_message.param1, data.x + 240, data.y_text + 6, FONT_NORMAL_WHITE);
            }
        } else {
            width += lang_text_draw(63, 5, data.x_text + width + 60, data.y_text + 6, FONT_NORMAL_WHITE)
            text_draw(scenario_player_name(), data.x_text + width + 60, data.y_text + 6, FONT_NORMAL_WHITE, 0);
        }
    }
    switch (msg.message_type) {
        case MESSAGE_TYPE_DISASTER:
        case MESSAGE_TYPE_INVASION:
            lang_text_draw(12, 1, data.x + 100, data.y_text + 44, FONT_NORMAL_WHITE);
            rich_text_draw(msg.content.text, data.x_text + 8, data.y_text + 86,
                BLOCK_SIZE * data.text_width_blocks, data.text_height_blocks - 1, 0);
            break
        case MESSAGE_TYPE_EMIGRATION:
            {
                let low_mood_cause: number = city_sentiment_low_mood_cause();
                if (low_mood_cause >= 1 && low_mood_cause <= 5) {
                    let max_width: number = BLOCK_SIZE * (data.text_width_blocks - 1) - 64;
                    lang_text_draw_multiline(12, low_mood_cause + 2,
                        data.x + 64, data.y_text + 44, max_width, FONT_NORMAL_WHITE);
                }
                rich_text_draw(msg.content.text,
                    data.x_text + 8, data.y_text + 86, BLOCK_SIZE * (data.text_width_blocks - 1),
                    data.text_height_blocks - 1, 0);
                break
            }
        case MESSAGE_TYPE_TUTORIAL:
            rich_text_draw(msg.content.text,
                data.x_text + 8, data.y_text + 6, BLOCK_SIZE * (data.text_width_blocks - 1),
                data.text_height_blocks - 1, 0);
            break
        case MESSAGE_TYPE_TRADE_CHANGE:
            image_draw(resource_image(player_message.param2), data.x + 64, data.y_text + 40);
            lang_text_draw(21, empire_city_get(player_message.param1).name_id,
                data.x + 100, data.y_text + 44, FONT_NORMAL_WHITE);
            rich_text_draw(msg.content.text,
                data.x_text + 8, data.y_text + 86, BLOCK_SIZE * (data.text_width_blocks - 1),
                data.text_height_blocks - 1, 0);
            break
        case MESSAGE_TYPE_PRICE_CHANGE:
            image_draw(resource_image(player_message.param2), data.x + 64, data.y_text + 40);
            text_draw_money(player_message.param1, data.x + 100, data.y_text + 44, FONT_NORMAL_WHITE);
            rich_text_draw(msg.content.text,
                data.x_text + 8, data.y_text + 86, BLOCK_SIZE * (data.text_width_blocks - 1),
                data.text_height_blocks - 1, 0);
            break
        default: {
            let lines: number = rich_text_draw(msg.content.text,
                data.x_text + 8, data.y_text + 56, BLOCK_SIZE * (data.text_width_blocks - 1),
                data.text_height_blocks - 1, 0);
            if (msg.message_type == MESSAGE_TYPE_IMPERIAL) {
                const request = scenario_request_get(player_message.param1);
                let y_offset: number = data.y_text + 86 + lines * 16;
                text_draw_number(request.amount, '@', " ", data.x_text + 8, y_offset, FONT_NORMAL_WHITE);
                image_draw(resource_image(request.resource), data.x_text + 70, y_offset - 5);
                lang_text_draw(23, request.resource,
                    data.x_text + 100, y_offset, FONT_NORMAL_WHITE);
                if (request.state == REQUEST_STATE_NORMAL || request.state == REQUEST_STATE_OVERDUE) {
                    let width: number = lang_text_draw_amount(8, 4, request.months_to_comply,
                        data.x_text + 200, y_offset, FONT_NORMAL_WHITE);
                    lang_text_draw(12, 2, data.x_text + 200 + width, y_offset, FONT_NORMAL_WHITE);
                }
            }
            break;
        }
    }
}
function get_message_image_id(msg: lang_message) {
    if (!msg.image.id) {
        return 0;
    } else if (data.text_id == 0) {
        return image_group(GROUP_BIG_PEOPLE);
    } else {
        return image_group(GROUP_MESSAGE_IMAGES) + msg.image.id - 1;
    }
}
function draw_title(msg: lang_message) {
    if (!msg.title.text) {
        return;
    }
    let image_id: number = get_message_image_id(msg);
    let img: image | null = image_id ? image_get(image_id) : null;
    if (msg.message_type == MESSAGE_TYPE_TUTORIAL) {
        text_draw_centered(msg.title.text,
            data.x, data.y + msg.title.y, BLOCK_SIZE * msg.width_blocks, FONT_LARGE_BLACK, 0);
    } else {
        let title_x_offset: number = img ? img.width + msg.image.x + 8 : 0;
        text_draw_centered(msg.title.text, data.x + title_x_offset, data.y + 14,
            BLOCK_SIZE * msg.width_blocks - 2 * title_x_offset, FONT_LARGE_BLACK, 0);
    }
    data.y_text = data.y + 48;
    if (img) {
        let image_x: number = msg.image.x;
        let image_y: number = msg.image.y;
        image_draw(image_id, data.x + image_x, data.y + image_y);
        if (data.y + image_y + img.height + 8 > data.y_text) {
            data.y_text = data.y + image_y + img.height + 8;
        }
    }
}
function draw_subtitle(msg: lang_message) {
    if (msg.subtitle.x && msg.subtitle.text) {
        let width: number = BLOCK_SIZE * (msg.width_blocks - 1) - msg.subtitle.x;
        let height: number = text_draw_multiline(msg.subtitle.text,
            data.x + msg.subtitle.x, data.y + msg.subtitle.y, width, FONT_NORMAL_BLACK, 0);
        if (data.y + msg.subtitle.y + height > data.y_text) {
            data.y_text = data.y + msg.subtitle.y + height;
        }
    }
}
function draw_content(msg: lang_message) {
    if (!msg.content.text) {
        return;
    }
    rich_text_set_fonts(FONT_NORMAL_WHITE, FONT_NORMAL_RED, 5);
    let header_offset: number = msg.type == TYPE_MANUAL ? 48 : 32;
    data.text_height_blocks = msg.height_blocks - 1 - (header_offset + data.y_text - data.y) / BLOCK_SIZE;
    data.text_width_blocks = rich_text_init(msg.content.text,
        data.x_text, data.y_text, msg.width_blocks - 4, data.text_height_blocks, 1);
    inner_panel_draw(data.x_text, data.y_text, data.text_width_blocks, data.text_height_blocks);
    graphics_set_clip_rectangle(data.x_text + 3, data.y_text + 3,
        BLOCK_SIZE * data.text_width_blocks - 6, BLOCK_SIZE * data.text_height_blocks - 6);
    rich_text_clear_links();
    if (msg.type == TYPE_MESSAGE) {
        draw_city_message_text(msg);
    } else {
        rich_text_draw(msg.content.text,
            data.x_text + 8, data.y_text + 6, BLOCK_SIZE * (data.text_width_blocks - 1),
            data.text_height_blocks - 1, 0);
    }
    graphics_reset_clip_rectangle();
}
function draw_background_normal() {
    let msg: lang_message = lang_get_message(data.text_id);
    data.x = msg.x;
    data.y = msg.y;
    data.x_text = data.x + 16;
    outer_panel_draw(data.x, data.y, msg.width_blocks, msg.height_blocks);
    draw_title(msg);
    draw_subtitle(msg);
    draw_content(msg);
    if (msg.type == TYPE_MANUAL && data.num_history > 0) {
        lang_text_draw(12, 0,
            data.x + 52, data.y + BLOCK_SIZE * msg.height_blocks - 31, FONT_NORMAL_BLACK);
    }
}
function draw_background_video() {
    let msg: lang_message = lang_get_message(data.text_id);
    data.x = 32;
    data.y = 28;
    let small_font: number = 0;
    let lines_available: number = 4;
    if (msg.type == TYPE_MESSAGE && msg.message_type == MESSAGE_TYPE_IMPERIAL) {
        lines_available = 3;
    }
    rich_text_set_fonts(FONT_NORMAL_WHITE, FONT_NORMAL_RED, 5);
    rich_text_clear_links();
    let lines_required: number = rich_text_draw(msg.content.text, 0, 0, 384, lines_available, 1);
    if (lines_required > lines_available) {
        small_font = 1;
        rich_text_set_fonts(FONT_SMALL_PLAIN, FONT_SMALL_PLAIN, 7);
        lines_required = rich_text_draw(msg.content.text, 0, 0, 384, lines_available, 1);
    }
    outer_panel_draw(data.x, data.y, 26, 28);
    graphics_draw_rect(data.x + 7, data.y + 7, 402, 294, COLOR_BLACK);
    let y_base: number = data.y + 308;
    let inner_height_blocks: number = 6;
    if (lines_required > lines_available) {
        y_base = y_base - 8;
        inner_height_blocks += 1
    }
    inner_panel_draw(data.x + 8, y_base, 25, inner_height_blocks);
    text_draw_centered(msg.title.text,
        data.x + 8, data.y + 414, 400, FONT_NORMAL_BLACK, 0);
    let width: number = lang_text_draw(25, player_message.month, data.x + 16, y_base + 4, FONT_NORMAL_WHITE);
    width += lang_text_draw_year(player_message.year, data.x + 18 + width, y_base + 4, FONT_NORMAL_WHITE)
    if (msg.type == TYPE_MESSAGE && msg.message_type == MESSAGE_TYPE_DISASTER &&
        data.text_id == MESSAGE_DIALOG_THEFT) {
        lang_text_draw_amount(8, 0, player_message.param1, data.x + 90 + width, y_base + 4, FONT_NORMAL_WHITE);
    } else {
        width += lang_text_draw(63, 5, data.x + 70 + width, y_base + 4, FONT_NORMAL_WHITE)
        text_draw(scenario_player_name(), data.x + 70 + width, y_base + 4, FONT_NORMAL_WHITE, 0);
    }
    data.text_height_blocks = msg.height_blocks - 1 - (32 + data.y_text - data.y) / BLOCK_SIZE;
    data.text_width_blocks = msg.width_blocks - 4;
    if (small_font) {
        rich_text_draw_colored(msg.content.text,
            data.x + 16 + 1, y_base + 24 + 1, 384, data.text_height_blocks - 1, COLOR_BLACK);
        rich_text_draw_colored(msg.content.text,
            data.x + 16, y_base + 24, 384, data.text_height_blocks - 1, COLOR_WHITE);
    } else {
        rich_text_draw(msg.content.text, data.x + 16, y_base + 24, 384, data.text_height_blocks - 1, 0);
    }
    if (msg.type == TYPE_MESSAGE && msg.message_type == MESSAGE_TYPE_IMPERIAL) {
        let y_text: number = data.y + 384;
        if (lines_required > lines_available) {
            y_text += 8
        }
        let request: scenario_request = scenario_request_get(player_message.param1);
        text_draw_number(request.amount, '@', " ", data.x + 8, y_text, FONT_NORMAL_WHITE);
        image_draw(
            image_group(GROUP_RESOURCE_ICONS) + request.resource
            + resource_image_offset(request.resource, RESOURCE_IMAGE_ICON),
            data.x + 70, y_text - 5);
        lang_text_draw(23, request.resource, data.x + 100, y_text, FONT_NORMAL_WHITE);
        if (request.state == REQUEST_STATE_NORMAL || request.state == REQUEST_STATE_OVERDUE) {
            width = lang_text_draw_amount(8, 4, request.months_to_comply, data.x + 200, y_text, FONT_NORMAL_WHITE);
            lang_text_draw(12, 2, data.x + 200 + width, y_text, FONT_NORMAL_WHITE);
        }
    }
    draw_foreground_video();
}
function draw_background() {
    if (data.background_callback) {
        data.background_callback();
    } else {
        window_draw_underlying_window();
    }
    graphics_in_dialog();
    if (data.show_video) {
        draw_background_video();
    } else {
        draw_background_normal();
    }
    graphics_reset_dialog();
}
function get_advisor_button() {
    switch (player_message.message_advisor) {
        case MESSAGE_ADVISOR_LABOR:
            return image_button_labor;
        case MESSAGE_ADVISOR_TRADE:
            return image_button_trade;
        case MESSAGE_ADVISOR_POPULATION:
            return image_button_population;
        case MESSAGE_ADVISOR_IMPERIAL:
            return image_button_imperial;
        case MESSAGE_ADVISOR_MILITARY:
            return image_button_military;
        case MESSAGE_ADVISOR_HEALTH:
            return image_button_health;
        case MESSAGE_ADVISOR_RELIGION:
            return image_button_religion;
        default:
            return image_button_help
    }
}
function draw_foreground_normal() {
    let msg: lang_message = lang_get_message(data.text_id);
    if (msg.type == TYPE_MANUAL && data.num_history > 0) {
        image_buttons_draw(
            data.x + 16, data.y + BLOCK_SIZE * msg.height_blocks - 36,
            image_button_back, 1);
    }
    if (msg.type == TYPE_MESSAGE) {
        image_buttons_draw(data.x + 16, data.y + BLOCK_SIZE * msg.height_blocks - 40, get_advisor_button(), 1);
        if (msg.message_type == MESSAGE_TYPE_DISASTER || msg.message_type == MESSAGE_TYPE_INVASION) {
            image_buttons_draw(data.x + 64, data.y_text + 36, image_button_go_to_problem, 1);
        }
    }
    image_buttons_draw(data.x + BLOCK_SIZE * msg.width_blocks - 38, data.y + BLOCK_SIZE * msg.height_blocks - 36,
        image_button_close, 1);
    rich_text_draw_scrollbar();
}
function draw_foreground_video() {
    video_draw(data.x + 8, data.y + 8);
    image_buttons_draw(data.x + 16, data.y + 408, get_advisor_button(), 1);
    image_buttons_draw(data.x + 372, data.y + 410, image_button_close, 1);
    let msg: lang_message = lang_get_message(data.text_id);
    if (is_problem_message(msg)) {
        image_buttons_draw(data.x + 48, data.y + 407, image_button_go_to_problem, 1);
    }
}
function draw_foreground() {
    graphics_in_dialog();
    if (data.show_video) {
        draw_foreground_video();
    } else {
        draw_foreground_normal();
    }
    graphics_reset_dialog();
}
function handle_input_video(m_dialog: mouse, msg: lang_message) {
    if (image_buttons_handle_mouse(m_dialog, data.x + 16, data.y + 408, get_advisor_button(), 1, null)) {
        return 1;
    }
    if (image_buttons_handle_mouse(m_dialog, data.x + 372, data.y + 410, image_button_close, 1, null)) {
        return 1;
    }
    const focusRef = new Ref(data.focus_button_id);
    if (is_problem_message(msg)) {
        if (image_buttons_handle_mouse(m_dialog, data.x + 48, data.y + 407,
            image_button_go_to_problem, 1, focusRef)) {
            data.focus_button_id = focusRef.v;
            return 1;
        }
    }
    data.focus_button_id = focusRef.v;
    return 0;
}
function handle_input_normal(m_dialog: mouse, msg: lang_message) {
    if (rich_text_handle_mouse(m_dialog)) {
        return 1;
    }
    if (msg.type == TYPE_MANUAL && image_buttons_handle_mouse(
        m_dialog, data.x + 16, data.y + BLOCK_SIZE * msg.height_blocks - 36, image_button_back, 1, null)) {
        return 1;
    }
    if (msg.type == TYPE_MESSAGE) {
        if (image_buttons_handle_mouse(
            m_dialog, data.x + 16, data.y + BLOCK_SIZE * msg.height_blocks - 40, get_advisor_button(), 1, null)) {
            return 1;
        }
        if (msg.message_type == MESSAGE_TYPE_DISASTER || msg.message_type == MESSAGE_TYPE_INVASION) {
            const focusRef = new Ref(data.focus_button_id);
            if (image_buttons_handle_mouse(m_dialog, data.x + 64, data.y_text + 36,
                image_button_go_to_problem, 1, focusRef)) {
                data.focus_button_id = focusRef.v;
                return 1;
            }
            data.focus_button_id = focusRef.v;
        }
    }
    if (image_buttons_handle_mouse(m_dialog,
        data.x + BLOCK_SIZE * msg.width_blocks - 38,
        data.y + BLOCK_SIZE * msg.height_blocks - 36,
        image_button_close, 1, null)) {
        return 1;
    }
    let text_id: number = rich_text_get_clicked_link(m_dialog);
    if (text_id >= 0) {
        if (data.num_history < MAX_HISTORY - 1) {
            data.history[data.num_history].text_id = data.text_id;
            data.history[data.num_history].scroll_position = rich_text_scroll_position();
            data.num_history++;
        }
        data.text_id = text_id;
        rich_text_reset(0);
        window_invalidate();
        return 1;
    }
    return 0;
}
function handle_input(m: mouse, h: hotkeys) {
    data.focus_button_id = 0;
    let m_dialog: mouse = mouse_in_dialog(m);
    let msg: lang_message = lang_get_message(data.text_id);
    let handled: number;
    if (data.show_video) {
        handled = handle_input_video(m_dialog, msg);
    } else {
        handled = handle_input_normal(m_dialog, msg);
    }
    if (!handled && input_go_back_requested(m, h)) {
        button_close(0, 0);
    }
}
function button_back(param1: number, param2: number) {
    if (data.num_history > 0) {
        data.num_history--;
        data.text_id = data.history[data.num_history].text_id;
        rich_text_reset(data.history[data.num_history].scroll_position);
        window_invalidate();
    }
}
function cleanup() {
    if (data.show_video) {
        video_stop();
        data.show_video = 0;
    }
    player_message.message_advisor = 0;
}
function button_close(param1: number, param2: number) {
    cleanup();
    window_go_back();
    window_invalidate();
}
function button_help(param1: number, param2: number) {
    button_close(0, 0);
    window_message_dialog_show(MESSAGE_DIALOG_HELP, data.background_callback);
}
function button_advisor(advisor: number, param2: number) {
    cleanup();
    if (!window_advisors_show_advisor(advisor)) {
        window_city_show();
    }
}
function button_go_to_problem(param1: number, param2: number) {
    cleanup();
    let msg: lang_message = lang_get_message(data.text_id);
    let grid_offset: number = player_message.param2;
    if (msg.message_type == MESSAGE_TYPE_INVASION) {
        let invasion_grid_offset: number = formation_grid_offset_for_invasion(player_message.param1);
        if (invasion_grid_offset > 0) {
            grid_offset = invasion_grid_offset;
        }
    }
    if (grid_offset > 0 && grid_offset < 26244) {
        city_view_go_to_grid_offset(grid_offset);
    }
    window_city_show();
}
function get_tooltip(c: tooltip_context) {
    if (data.focus_button_id) {
        c.type = TOOLTIP_BUTTON;
        c.text_group = 12;
        c.text_id = 1;
    }
}
export function window_message_dialog_show(text_id: number, background_callback: (() => void) | null) {
    let window: window_type = new window_type(
        WINDOW_MESSAGE_DIALOG,
        draw_background,
        draw_foreground,
        handle_input,
        get_tooltip
    );
    init(text_id, background_callback);
    window_show(window);
}
export function window_message_dialog_show_city_message(text_id: number, year: number, month: number, param1: number, param2: number, message_advisor: number, use_popup: number) {
    set_city_message(year, month, param1, param2, message_advisor, use_popup);
    window_message_dialog_show(text_id, window_city_draw_all);
}
