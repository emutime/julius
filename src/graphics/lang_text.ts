
import { lang_get_string } from 'core/lang';
import { locale_year_before_ad } from 'core/locale';
import { color_t } from 'graphics/color';
import { font_definition_for, font_t } from 'graphics/font';
import { text_draw, text_draw_centered, text_draw_ellipsized, text_draw_multiline, text_draw_number, text_draw_number_colored, text_get_width } from 'graphics/text';
;
export function lang_text_get_width(group: number, number: number, font: font_t) {
    let str: string = lang_get_string(group, number);
    return text_get_width(str, font) + font_definition_for(font).space_width;
}
export function lang_text_draw(group: number, number: number, x_offset: number, y_offset: number, font: font_t) {
    let str: string = lang_get_string(group, number);
    return text_draw(str, x_offset, y_offset, font, 0);
}
export function lang_text_draw_colored(group: number, number: number, x_offset: number, y_offset: number, font: font_t, color: color_t) {
    let str: string = lang_get_string(group, number);
    return text_draw(str, x_offset, y_offset, font, color);
}
export function lang_text_draw_centered(group: number, number: number, x_offset: number, y_offset: number, box_width: number, font: font_t) {
    let str: string = lang_get_string(group, number);
    text_draw_centered(str, x_offset, y_offset, box_width, font, 0);
}
export function lang_text_draw_centered_colored(group: number, number: number, x_offset: number, y_offset: number, box_width: number, font: font_t, color: color_t) {
    let str: string = lang_get_string(group, number);
    text_draw_centered(str, x_offset, y_offset, box_width, font, color);
}
export function lang_text_draw_ellipsized(group: number, number: number, x_offset: number, y_offset: number, box_width: number, font: font_t) {
    let str: string = lang_get_string(group, number);
    text_draw_ellipsized(str, x_offset, y_offset, box_width, font, 0);
}
export function lang_text_draw_amount(group: number, number: number, amount: number, x_offset: number, y_offset: number, font: font_t) {
    let amount_offset: number = 1;
    if (amount == 1 || amount == -1) {
        amount_offset = 0;
    }
    let desc_offset_x: number;
    if (amount >= 0) {
        desc_offset_x = text_draw_number(amount, ' ', " ",
            x_offset, y_offset, font);
    } else {
        desc_offset_x = text_draw_number(-amount, '-', " ",
            x_offset, y_offset, font);
    }
    return desc_offset_x + lang_text_draw(group, number + amount_offset,
        x_offset + desc_offset_x, y_offset, font);
}
export function lang_text_draw_year(year: number, x_offset: number, y_offset: number, font: font_t) {
    let width: number = 0;
    if (year >= 0) {
        let use_year_ad: boolean = locale_year_before_ad();
        if (use_year_ad) {
            width += text_draw_number(year, ' ', " ", x_offset + width, y_offset, font)
            width += lang_text_draw(20, 1, x_offset + width, y_offset, font)
        } else {
            width += lang_text_draw(20, 1, x_offset + width, y_offset, font)
            width += text_draw_number(year, ' ', " ", x_offset + width, y_offset, font)
        }
    } else {
        width += text_draw_number(-year, ' ', " ", x_offset + width, y_offset, font)
        width += lang_text_draw(20, 0, x_offset + width, y_offset, font)
    }
    return width;
}
export function lang_text_draw_month_year_max_width(month: number, year: number, x_offset: number, y_offset: number, box_width: number, font: font_t, color: color_t) {
    let month_width: number = lang_text_get_width(25, month, font);
    let ad_bc_width: number = lang_text_get_width(20, year >= 0 ? 1 : 0, font);
    let space_width: number = font_definition_for(font).space_width;
    let negative_padding: number = 0;
    let total_width: number = month_width + ad_bc_width + 35 + 2 * space_width;
    if (total_width > box_width) {
        negative_padding = (box_width - total_width) / 2;
        if (negative_padding < -2 * (space_width - 2)) {
            negative_padding = -2 * (space_width - 2);
        }
    }
    let width: number = negative_padding + lang_text_draw_colored(25, month, x_offset, y_offset, font, color);
    if (year >= 0) {
        let use_year_ad: boolean = locale_year_before_ad();
        if (use_year_ad) {
            width += negative_padding +
                text_draw_number_colored(year, ' ', " ", x_offset + width, y_offset, font, color)
            lang_text_draw_colored(20, 1, x_offset + width, y_offset, font, color);
        } else {
            width += negative_padding + lang_text_draw_colored(20, 1, x_offset + width, y_offset, font, color)
            text_draw_number_colored(year, ' ', " ", x_offset + width, y_offset, font, color);
        }
    } else {
        width += negative_padding + text_draw_number_colored(-year, ' ', " ", x_offset + width, y_offset, font, color)
        lang_text_draw_colored(20, 0, x_offset + width, y_offset, font, color);
    }
}
export function lang_text_draw_multiline(group: number, number: number, x_offset: number, y_offset: number, box_width: number, font: font_t) {
    let str: string = lang_get_string(group, number);
    return text_draw_multiline(str, x_offset, y_offset, box_width, font, 0);
}
