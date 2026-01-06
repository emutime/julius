export const COMPOSED_TOOLTIP_TEXT_MAX = 1000;
import { advisor_type } from 'city/constants';
import { city_labor_unemployment_percentage, city_labor_workers_needed, city_labor_workers_unemployed } from 'city/labor';
import { city_rating_culture, city_rating_favor, city_rating_peace, city_rating_prosperity } from 'city/ratings';
import { time_get_millis, time_millis } from 'core/time';
import { set_tooltips, setting_tooltips } from 'game/settings';
import { COLOR_BLACK, color_t, COLOR_TOOLTIP, COLOR_WHITE } from 'graphics/color';
import { font_t } from 'graphics/font';
import { graphics_draw_from_buffer, graphics_draw_rect, graphics_fill_rect, graphics_save_to_buffer } from 'graphics/graphics';
import { lang_text_draw_colored } from 'graphics/lang_text';
import { screen_dialog_offset_x, screen_dialog_offset_y, screen_height } from 'graphics/screen';
import { text_draw_multiline, text_draw_number_colored, text_measure_multiline } from 'graphics/text';
import { window_get_id, window_id, window_is } from 'graphics/window';
import { mouse } from 'input/mouse';
import { scenario_criteria_culture, scenario_criteria_culture_enabled, scenario_criteria_favor, scenario_criteria_favor_enabled, scenario_criteria_peace, scenario_criteria_peace_enabled, scenario_criteria_prosperity, scenario_criteria_prosperity_enabled } from 'scenario/criteria';
import { scenario_is_open_play } from 'scenario/property';
import { window_advisors_get_advisor } from 'window/advisors';
import { free } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_malloc';
export const enum tooltip_type {
    TOOLTIP_NONE = 0,
    TOOLTIP_BUTTON = 1,
    TOOLTIP_OVERLAY = 2,
    TOOLTIP_SENATE = 3
};
import TOOLTIP_NONE = tooltip_type.TOOLTIP_NONE;
import TOOLTIP_BUTTON = tooltip_type.TOOLTIP_BUTTON;
import TOOLTIP_OVERLAY = tooltip_type.TOOLTIP_OVERLAY;
import TOOLTIP_SENATE = tooltip_type.TOOLTIP_SENATE;
export const  enum tooltip_extra_text_type {
    TOOLTIP_EXTRA_TEXT_COMMA_SEPARATED = 0,
    TOOLTIP_EXTRA_TEXT_JOINED_BY_SPACE = 1
};
import TOOLTIP_EXTRA_TEXT_COMMA_SEPARATED = tooltip_extra_text_type.TOOLTIP_EXTRA_TEXT_COMMA_SEPARATED;
export class tooltip_context {
    public mouse_x: number = 0;
    public mouse_y: number = 0;
    public type: tooltip_type = null;
    public high_priority: number = 0;
    public text_group: number = 0;
    public text_id: number = 0;
    public has_numeric_prefix: number = 0;
    public numeric_prefix: number = 0;
    public num_extra_texts: number = 0;
    public extra_text_type: tooltip_extra_text_type = null;
    public extra_text_groups: number[] = new Array(TOOLTIP_MAX_EXTRA_VALUES).fill(0);
    public extra_text_ids: number[] = new Array(TOOLTIP_MAX_EXTRA_VALUES).fill(0);
    public constructor(...args: any[]) {
        args.length >= 1 && (this.mouse_x = args[0]);
        args.length >= 2 && (this.mouse_y = args[1]);
        args.length >= 3 && (this.type = args[2]);
        args.length >= 4 && (this.high_priority = args[3]);
        args.length >= 5 && (this.text_group = args[4]);
        args.length >= 6 && (this.text_id = args[5]);
        args.length >= 7 && (this.has_numeric_prefix = args[6]);
        args.length >= 8 && (this.numeric_prefix = args[7]);
        args.length >= 9 && (this.num_extra_texts = args[8]);
        args.length >= 10 && (this.extra_text_type = args[9]);
        args.length >= 11 && (this.extra_text_groups = args[10]);
        args.length >= 12 && (this.extra_text_ids = args[11]);
    }
}
;
import TOOLTIPS_FULL = set_tooltips.TOOLTIPS_FULL;
import FONT_SMALL_PLAIN = font_t.FONT_SMALL_PLAIN;
import WINDOW_ADVISORS = window_id.WINDOW_ADVISORS;
import WINDOW_LABOR_PRIORITY = window_id.WINDOW_LABOR_PRIORITY;
import WINDOW_DONATE_TO_CITY = window_id.WINDOW_DONATE_TO_CITY;
import WINDOW_TRADE_PRICES = window_id.WINDOW_TRADE_PRICES;
import ADVISOR_LABOR = advisor_type.ADVISOR_LABOR;
import ADVISOR_TRADE = advisor_type.ADVISOR_TRADE;
import ADVISOR_POPULATION = advisor_type.ADVISOR_POPULATION;
let DEFAULT_TEXT_GROUP: number = 68;
let TOOLTIP_DELAY_MILLIS: time_millis = 150;
let last_update: time_millis = 0;
let composed_tooltip_text: number[] = new Array(COMPOSED_TOOLTIP_TEXT_MAX);
export class unnamed27_8 {
    public is_active: number = 0;
    public x: number = 0;
    public y: number = 0;
    public width: number = 0;
    public height: number = 0;
    public buffer_size: number = 0;
    public buffer: color_t[] = null;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.is_active = args[0]);
        args.length >= 2 && (this.x = args[1]);
        args.length >= 3 && (this.y = args[2]);
        args.length >= 4 && (this.width = args[3]);
        args.length >= 5 && (this.height = args[4]);
        args.length >= 6 && (this.buffer_size = args[5]);
        args.length >= 7 && (this.buffer = args[6]);
    }
}
let button_tooltip_info: unnamed27_8 = new unnamed27_8();
function reset_timer() {
    last_update = time_get_millis();
}
function should_draw_tooltip(c: tooltip_context) {
    if (c.type == TOOLTIP_NONE) {
        reset_timer();
        return 0;
    }
    if (!c.high_priority && setting_tooltips() != TOOLTIPS_FULL) {
        reset_timer();
        return 0;
    }
    if (time_get_millis() - last_update < TOOLTIP_DELAY_MILLIS) {
        return 0;
    }
    return 1;
}
function reset_tooltip(c: tooltip_context) {
    if (c.type != TOOLTIP_NONE) {
        c.type = TOOLTIP_NONE;
    }
}
function restore_window_under_tooltip_from_buffer() {
    if (button_tooltip_info.is_active) {
        graphics_draw_from_buffer(
            button_tooltip_info.x, button_tooltip_info.y,
            button_tooltip_info.width, button_tooltip_info.height,
            button_tooltip_info.buffer);
    }
}
function save_window_under_tooltip_to_buffer(x: number, y: number, width: number, height: number) {
    if (button_tooltip_info.is_active &&
        x == button_tooltip_info.x && y == button_tooltip_info.y &&
        width == button_tooltip_info.width && height == button_tooltip_info.height) {
        return;
    }
    restore_window_under_tooltip_from_buffer();
    button_tooltip_info.is_active = 1;
    button_tooltip_info.x = x;
    button_tooltip_info.y = y;
    button_tooltip_info.width = width;
    button_tooltip_info.height = height;
    let buffer_size: number = width * height;
    if (buffer_size > button_tooltip_info.buffer_size) {
        button_tooltip_info.buffer_size = buffer_size;
        free(button_tooltip_info.buffer);
        button_tooltip_info.buffer = new Array(buffer_size);
    }
    graphics_save_to_buffer(x, y, width, height, button_tooltip_info.buffer);
}
function get_tooltip_text(c: tooltip_context) {
    // let text: number = lang_get_string(c.text_group, c.text_id);
    // if (c.has_numeric_prefix) {
    //     let offset: number = string_from_int(composed_tooltip_text, c.numeric_prefix, 0);
    //     string_copy(text, composed_tooltip_text[offset], COMPOSED_TOOLTIP_TEXT_MAX - offset);
    //     text = composed_tooltip_text;
    // } else if (c.num_extra_texts > 0) {
    //     string_copy(text, composed_tooltip_text, COMPOSED_TOOLTIP_TEXT_MAX);
    //     let offset: number = string_length(composed_tooltip_text);
    //     let is_comma_separated: number = c.extra_text_type == TOOLTIP_EXTRA_TEXT_COMMA_SEPARATED;
    //     if (is_comma_separated) {
    //         composed_tooltip_text[offset++] = ':';
    //         composed_tooltip_text[offset++] = '\n';
    //     } else {
    //         composed_tooltip_text[offset++] = ' ';
    //     }
    //     for (let i: number = 0; i < c.num_extra_texts; i++) {
    //         if (i) {
    //             if (is_comma_separated) {
    //                 composed_tooltip_text[offset++] = ',';
    //             }
    //             composed_tooltip_text[offset++] = ' ';
    //         }
    //         let extra_value: number = lang_get_string(c.extra_text_groups[i], c.extra_text_ids[i]);
    //         string_copy(extra_value, composed_tooltip_text[offset], COMPOSED_TOOLTIP_TEXT_MAX - offset);
    //         offset += string_length(extra_value)
    //     }
    //     text = composed_tooltip_text;
    // }
    // return text;
}
function draw_button_tooltip(c: tooltip_context) {
    let text: number = get_tooltip_text(c);
    let width: number = 200;
    let lines: number = text_measure_multiline(text, width - 5, FONT_SMALL_PLAIN);
    if (lines > 2) {
        width = 300;
        lines = text_measure_multiline(text, width - 5, FONT_SMALL_PLAIN);
    }
    let height: number = 16 * lines + 10;
    let x: number
    let y: number;
    if (c.mouse_x < screen_dialog_offset_x() + width + 100) {
        if (window_is(WINDOW_ADVISORS)) {
            x = c.mouse_x + 50;
        } else {
            x = c.mouse_x + 20;
        }
    } else {
        x = c.mouse_x - width - 20;
    }
    switch (window_get_id()) {
        case WINDOW_ADVISORS:
            if (c.mouse_y < screen_dialog_offset_y() + 432) {
                y = c.mouse_y;
                switch (window_advisors_get_advisor()) {
                    case ADVISOR_LABOR:
                        y -= 74
                        break
                    case ADVISOR_TRADE:
                        y -= 54
                        break
                    case ADVISOR_POPULATION:
                        y -= 58
                        break
                    default: y -= 64
                        break
                }
            } else {
                y = screen_dialog_offset_y() + 432;
            }
            break
        case WINDOW_TRADE_PRICES:
            y = c.mouse_y - 42;
            break
        case WINDOW_DONATE_TO_CITY:
            y = c.mouse_y - 52;
            break
        case WINDOW_LABOR_PRIORITY:
            x = c.mouse_x - width / 2 - 10;
            if (c.mouse_y < screen_dialog_offset_y() + 200) {
                y = c.mouse_y + 40;
            } else {
                y = c.mouse_y - 72;
            }
            break
        default:
            if (c.mouse_y < screen_dialog_offset_y() + 200) {
                y = c.mouse_y + 40;
            } else {
                y = c.mouse_y - 62;
            }
            break
    }
    save_window_under_tooltip_to_buffer(x, y, width, height);
    graphics_draw_rect(x, y, width, height, COLOR_BLACK);
    graphics_fill_rect(x + 1, y + 1, width - 2, height - 2, COLOR_WHITE);
    text_draw_multiline(text, x + 5, y + 7, width - 5, FONT_SMALL_PLAIN, COLOR_TOOLTIP);
}
function draw_overlay_tooltip(c: tooltip_context) {
    let text: number = get_tooltip_text(c);
    let width: number = 200;
    let lines: number = text_measure_multiline(text, width - 5, FONT_SMALL_PLAIN);
    if (lines > 2) {
        width = 300;
        lines = text_measure_multiline(text, width - 5, FONT_SMALL_PLAIN);
    }
    let height: number = 16 * lines + 10;
    let x: number
    let y: number;
    if (c.mouse_x < width + 20) {
        x = c.mouse_x + 20;
    } else {
        x = c.mouse_x - width - 20;
    }
    if (c.mouse_y < 200) {
        y = c.mouse_y + 50;
    } else if (c.mouse_y + height - 72 > screen_height()) {
        y = screen_height() - height;
    } else {
        y = c.mouse_y - 72;
    }
    save_window_under_tooltip_to_buffer(x, y, width, height);
    graphics_draw_rect(x, y, width, height, COLOR_BLACK);
    graphics_fill_rect(x + 1, y + 1, width - 2, height - 2, COLOR_WHITE);
    text_draw_multiline(text, x + 5, y + 7, width - 5, FONT_SMALL_PLAIN, COLOR_TOOLTIP);
}
function draw_senate_tooltip(c: tooltip_context) {
    let x: number
    let y: number;
    let width: number = 220;
    let height: number = 80;
    if (c.mouse_x < width + 20) {
        x = c.mouse_x + 20;
    } else {
        x = c.mouse_x - width - 20;
    }
    if (c.mouse_y < 200) {
        y = c.mouse_y + 10;
    } else if (c.mouse_y + height - 32 > screen_height()) {
        y = screen_height() - height;
    } else {
        y = c.mouse_y - 32;
    }
    save_window_under_tooltip_to_buffer(x, y, width, height);
    graphics_draw_rect(x, y, width, height, COLOR_BLACK);
    graphics_fill_rect(x + 1, y + 1, width - 2, height - 2, COLOR_WHITE);
    lang_text_draw_colored(68, 148, x + 5, y + 5, FONT_SMALL_PLAIN, COLOR_TOOLTIP);
    width = text_draw_number_colored(city_labor_unemployment_percentage(), '@', "%",
        x + 140, y + 5, FONT_SMALL_PLAIN, COLOR_TOOLTIP);
    text_draw_number_colored(city_labor_workers_unemployed() - city_labor_workers_needed(), '(', ")",
        x + 140 + width, y + 5, FONT_SMALL_PLAIN, COLOR_TOOLTIP);
    lang_text_draw_colored(68, 149, x + 5, y + 19, FONT_SMALL_PLAIN, COLOR_TOOLTIP);
    text_draw_number_colored(city_rating_culture(), '@', " ",
        x + 140, y + 19, FONT_SMALL_PLAIN, COLOR_TOOLTIP);
    if (!scenario_is_open_play() && scenario_criteria_culture_enabled()) {
        text_draw_number_colored(scenario_criteria_culture(), '(', ")",
            x + 140 + width, y + 19, FONT_SMALL_PLAIN, COLOR_TOOLTIP);
    }
    lang_text_draw_colored(68, 150, x + 5, y + 33, FONT_SMALL_PLAIN, COLOR_TOOLTIP);
    text_draw_number_colored(city_rating_prosperity(), '@', " ",
        x + 140, y + 33, FONT_SMALL_PLAIN, COLOR_TOOLTIP);
    if (!scenario_is_open_play() && scenario_criteria_prosperity_enabled()) {
        text_draw_number_colored(scenario_criteria_prosperity(), '(', ")",
            x + 140 + width, y + 33, FONT_SMALL_PLAIN, COLOR_TOOLTIP);
    }
    lang_text_draw_colored(68, 151, x + 5, y + 47, FONT_SMALL_PLAIN, COLOR_TOOLTIP);
    text_draw_number_colored(city_rating_peace(), '@', " ",
        x + 140, y + 47, FONT_SMALL_PLAIN, COLOR_TOOLTIP);
    if (!scenario_is_open_play() && scenario_criteria_peace_enabled()) {
        text_draw_number_colored(scenario_criteria_peace(), '(', ")",
            x + 140 + width, y + 47, FONT_SMALL_PLAIN, COLOR_TOOLTIP);
    }
    lang_text_draw_colored(68, 152, x + 5, y + 61, FONT_SMALL_PLAIN, COLOR_TOOLTIP);
    text_draw_number_colored(city_rating_favor(), '@', " ",
        x + 140, y + 61, FONT_SMALL_PLAIN, COLOR_TOOLTIP);
    if (!scenario_is_open_play() && scenario_criteria_favor_enabled()) {
        text_draw_number_colored(scenario_criteria_favor(), '(', ")",
            x + 140 + width, y + 61, FONT_SMALL_PLAIN, COLOR_TOOLTIP);
    }
}
function draw_tooltip(c: tooltip_context) {
    if (c.type == TOOLTIP_BUTTON) {
        draw_button_tooltip(c);
    } else if (c.type == TOOLTIP_OVERLAY) {
        draw_overlay_tooltip(c);
    } else if (c.type == TOOLTIP_SENATE) {
        draw_senate_tooltip(c);
    }
}
export function tooltip_invalidate() {
    button_tooltip_info.is_active = 0;
}
export function tooltip_handle(m: mouse, func: (context: tooltip_context) => void) {
    if (m.is_touch && !m.left.is_down) {
        reset_timer();
        return;
    }
    let context: tooltip_context = new tooltip_context(m.x, m.y);
    context.text_group = DEFAULT_TEXT_GROUP;
    if (setting_tooltips() && func) {
        func(context);
    }
    if (should_draw_tooltip(context)) {
        draw_tooltip(context);
        reset_tooltip(context);
    } else {
        restore_window_under_tooltip_from_buffer();
        button_tooltip_info.is_active = 0;
    }
}
