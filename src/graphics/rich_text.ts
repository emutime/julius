import { BLOCK_SIZE } from 'graphics/panel';
export const MAX_LINKS = 50;
;
import { color_t } from 'graphics/color';
import { language_type } from 'core/locale';
import { locale_paragraph_indent } from 'core/locale';
import { encoding_type } from 'core/encoding';
import { font_t } from 'graphics/font';
import { font_definition } from 'graphics/font';
import { font_definition_for } from 'graphics/font';
import { font_letter_id } from 'graphics/font';
import { time_millis } from 'core/time';
import { touch_coords } from 'input/touch';
import { touch_mode } from 'input/touch';
import { touch } from 'input/touch';
import { mouse_button } from 'input/mouse';
import { scroll_state } from 'input/mouse';
import { mouse } from 'input/mouse';
import { direction_type } from 'core/direction';
import { group_terrain } from 'core/image_group';
import GROUP_MESSAGE_IMAGES = group_terrain.GROUP_MESSAGE_IMAGES;
import { image } from 'core/image';
import { image_group } from 'core/image';
import { image_get } from 'core/image';
import { image_letter } from 'core/image';
import { string_to_int } from 'core/string';
import { image_draw } from 'graphics/image';
import { image_draw_letter } from 'graphics/image';
import { image_button } from 'graphics/image_button';
import { scrollbar_type } from 'graphics/scrollbar';
import { scrollbar_init } from 'graphics/scrollbar';
import { scrollbar_reset } from 'graphics/scrollbar';
import { scrollbar_draw } from 'graphics/scrollbar';
import { scrollbar_handle_mouse } from 'graphics/scrollbar';
import { tooltip_type } from 'graphics/tooltip';
import { tooltip_extra_text_type } from 'graphics/tooltip';
import { tooltip_context } from 'graphics/tooltip';
import { key_type } from 'input/keys';
import { key_modifier_type } from 'input/keys';
import { hotkey_action } from 'core/hotkey_config';
import { hotkey_mapping } from 'core/hotkey_config';
import { hotkeys } from 'input/hotkey';
import { window_id } from 'graphics/window';
import { window_type } from 'graphics/window';
import { window_invalidate } from 'graphics/window';
let scrollbar: scrollbar_type = {
    .has_y_margin = 1,
    .on_scroll_callback = on_scroll
};
export class unnamed23_8 {
    public message_id: number = 0;
    public x_min: number = 0;
    public y_min: number = 0;
    public x_max: number = 0;
    public y_max: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.message_id = args[0]);
        args.length >= 2 && (this.x_min = args[1]);
        args.length >= 3 && (this.y_min = args[2]);
        args.length >= 4 && (this.x_max = args[3]);
        args.length >= 5 && (this.y_max = args[4]);
    }
}
let links: unnamed23_8[] = new Array(MAX_LINKS);
let tmp_line: number[] = new Array(200);
export class unnamed33_8 {
    public normal_font: font_definition = null;
    public link_font: font_definition = null;
    public line_height: number = 0;
    public paragraph_indent: number = 0;
    public x_text: number = 0;
    public y_text: number = 0;
    public text_width_blocks: number = 0;
    public text_height_blocks: number = 0;
    public text_height_lines: number = 0;
    public num_lines: number = 0;
    public max_scroll_position: number = 0;
    public num_links: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.normal_font = args[0]);
        args.length >= 2 && (this.link_font = args[1]);
        args.length >= 3 && (this.line_height = args[2]);
        args.length >= 4 && (this.paragraph_indent = args[3]);
        args.length >= 5 && (this.x_text = args[4]);
        args.length >= 6 && (this.y_text = args[5]);
        args.length >= 7 && (this.text_width_blocks = args[6]);
        args.length >= 8 && (this.text_height_blocks = args[7]);
        args.length >= 9 && (this.text_height_lines = args[8]);
        args.length >= 10 && (this.num_lines = args[9]);
        args.length >= 11 && (this.max_scroll_position = args[10]);
        args.length >= 12 && (this.num_links = args[11]);
    }
}
let data: unnamed33_8 = new unnamed33_8();
export function rich_text_init(text: number, x_text: number, y_text: number, width_blocks: number, height_blocks: number, adjust_width_on_no_scroll: number) {
    data.x_text = x_text;
    data.y_text = y_text;
    if (!data.num_lines) {
        data.text_height_blocks = height_blocks;
        data.text_height_lines = (height_blocks - 1) * BLOCK_SIZE / data.line_height;
        data.text_width_blocks = width_blocks;
        data.num_lines = rich_text_draw(text,
            data.x_text + 8, data.y_text + 6,
            BLOCK_SIZE * data.text_width_blocks - BLOCK_SIZE, data.text_height_lines, 1);
        scrollbar.x = data.x_text + BLOCK_SIZE * data.text_width_blocks - 1;
        scrollbar.y = data.y_text;
        scrollbar.height = BLOCK_SIZE * data.text_height_blocks;
        scrollbar.elements_in_view = data.text_height_lines;
        scrollbar_init(scrollbar, scrollbar.scroll_position, data.num_lines);
        if (data.num_lines <= data.text_height_lines && adjust_width_on_no_scroll) {
            data.text_width_blocks += 2
        }
        scrollbar.scrollable_width = BLOCK_SIZE * data.text_width_blocks;
        window_invalidate();
    }
    return data.text_width_blocks;
}
export function rich_text_set_fonts(normal_font: font_t, link_font: font_t, line_spacing: number) {
    data.normal_font = font_definition_for(normal_font);
    data.link_font = font_definition_for(link_font);
    data.line_height = data.normal_font.line_height + line_spacing;
    data.paragraph_indent = locale_paragraph_indent();
}
export function rich_text_reset(scroll_position: number) {
    scrollbar_reset(scrollbar, scroll_position);
    data.num_lines = 0;
    rich_text_clear_links();
}
export function rich_text_clear_links() {
    for (let i: number = 0; i < MAX_LINKS; i++) {
        links[i].message_id = 0;
        links[i].x_min = 0;
        links[i].x_max = 0;
        links[i].y_min = 0;
        links[i].y_max = 0;
    }
    data.num_links = 0;
}
export function rich_text_get_clicked_link(m: mouse) {
    if (m.left.went_up) {
        for (let i: number = 0; i < data.num_links; i++) {
            if (m.x >= links[i].x_min && m.x <= links[i].x_max &&
                m.y >= links[i].y_min && m.y <= links[i].y_max) {
                return links[i].message_id;
            }
        }
    }
    return -1;
}
function add_link(message_id: number, x_start: number, x_end: number, y: number) {
    if (data.num_links < MAX_LINKS) {
        links[data.num_links].message_id = message_id;
        links[data.num_links].x_min = x_start - 2;
        links[data.num_links].x_max = x_end + 2;
        links[data.num_links].y_min = y - 1;
        links[data.num_links].y_max = y + 13;
        data.num_links++;
    }
}
function get_word_width(str: number, in_link: number, num_chars: number) {
    let width: number = 0;
    let guard: number = 0;
    let word_char_seen: number = 0;
    let start_link: number = 0;
    * num_chars = 0;
    while (* str && ++guard < 2000) {
        if (* str == '@') {
            str++;
            if (!word_char_seen) {
                if (* str == 'P' || * str == 'L') {
                        * num_chars += 2;
                    width = 0;
                    break;
                } else if (* str == 'G') {
                        // skip graphic
                        * num_chars += 2;
                    while (* str >= '0' && * str <= '9') {
                        str++;
                        (* num_chars)++;
                    }
                    width = 0;
                    break;
                } else {
                    (* num_chars)++;
                    while (* str >= '0' && * str <= '9') {
                        str++;
                        (* num_chars)++;
                    }
                    in_link = 1;
                    start_link = 1;
                }
            }
        }
            int num_bytes = 1;
        if (* str == ' ') {
            if (word_char_seen) {
                break;
            }
            width += 4;
        } else if (* str > ' ') {
                // normal char
                int letter_id = font_letter_id(data.normal_font, str, num_bytes);
            if (letter_id >= 0) {
                width += 1 + image_letter(letter_id).width;
            }
            word_char_seen = 1;
            if (num_bytes > 1) {
                if (start_link) {
                    // add space before links in multibyte charsets
                    width += 4;
                    start_link = 0;
                }
                if (!in_link) {
                        * num_chars += num_bytes;
                    break;
                }
            }
        }
        str += num_bytes;
            * num_chars += num_bytes;
    }
    return width;
}
function draw_line(str: number, x: number, y: number, color: color_t, measure_only: number) {
    let start_link: number = 0;
    let num_link_chars: number = 0;
    while (* str) {
        if (* str == '@') {
                int message_id = string_to_int(++str);
            while (* str >= '0' && * str <= '9') {
                str++;
            }
                int width = get_word_width(str, 1, num_link_chars);
            add_link(message_id, x, x + width, y);
            start_link = 1;
        }
        if (* str >= ' ') {
            const font_definition * def = data.normal_font;
            if (num_link_chars > 0) {
                def = data.link_font;
            }
    
                int num_bytes = 1;
                int letter_id = font_letter_id(def, str, num_bytes);
            if (letter_id < 0) {
                x += def.space_width;
            } else {
                if (num_bytes > 1 && start_link) {
                    // add space before links in multibyte charsets
                    x += def.space_width;
                    start_link = 0;
                }
                const image * img = image_letter(letter_id);
                if (!measure_only) {
                        int height = def.image_y_offset(* str, img.height, def.line_height);
                    image_draw_letter(def.font, letter_id, x, y - height, color);
                }
                x += img.width + def.letter_spacing;
            }
            if (num_link_chars > 0) {
                num_link_chars -= num_bytes;
            }
            str += num_bytes;
        } else {
            str++;
        }
    }
}
function draw_text(text: number, x_offset: number, y_offset: number, box_width: number, height_lines: number, color: color_t, measure_only: number) {
    let image_height_lines: number = 0;
    let image_id: number = 0;
    let lines_before_image: number = 0;
    let paragraph: number = 0;
    let has_more_characters: number = 1;
    let y: number = y_offset;
    let guard: number = 0;
    let line: number = 0;
    let num_lines: number = 0;
    while (has_more_characters || image_height_lines) {
        if (++guard >= 1000) {
            break;
        }
        // clear line
        for (int i = 0; i < 200; i++) {
            tmp_line[i] = 0;
        }
            int line_index = 0;
            int current_width, x_line_offset;
        current_width = x_line_offset = paragraph ? data.paragraph_indent : 0;
        paragraph = 0;
        while ((has_more_characters || image_height_lines) && current_width < box_width) {
            if (image_height_lines) {
                image_height_lines--;
                break;
            }
                int word_num_chars;
            current_width += get_word_width(text, 0, word_num_chars);
            if (current_width >= box_width) {
                if (current_width == 0) {
                    has_more_characters = 0;
                }
            } else {
                for (int i = 0; i < word_num_chars; i++) {
                        char c = * text++;
                    if (c == '@') {
                        if (* text == 'P') {
                            paragraph = 1;
                            text++;
                            current_width = box_width;
                            break;
                        } else if (* text == 'L') {
                            text++;
                            current_width = box_width;
                            break;
                        } else if (* text == 'G') {
                            if (line_index) {
                                num_lines++;
                            }
                            text++; // skip 'G'
                            current_width = box_width;
                            image_id = string_to_int(text);
                            c = * text++;
                            while (c >= '0' && c <= '9') {
                                c = * text++;
                            }
                            image_id += image_group(GROUP_MESSAGE_IMAGES) - 1;
                            image_height_lines = image_get(image_id).height / data.line_height + 2;
                            if (line > 0) {
                                lines_before_image = 1;
                            }
                            break;
                        }
                    }
                    if (line_index || c != ' ') { // no space at start of line
                        tmp_line[line_index++] = c;
                    }
                }
                if (!* text) {
                    has_more_characters = 0;
                }
            }
        }
    
            int outside_viewport = 0;
        if (!measure_only) {
            if (line < scrollbar.scroll_position || line >= scrollbar.scroll_position + height_lines) {
                outside_viewport = 1;
            }
        }
        if (!outside_viewport) {
            draw_line(tmp_line, x_line_offset + x_offset, y, color, measure_only);
        }
        if (!measure_only) {
            if (image_id) {
                if (lines_before_image) {
                    lines_before_image--;
                } else {
                    const image * img = image_get(image_id);
                    image_height_lines = img.height / data.line_height + 2;
                        int image_offset_x = x_offset + (box_width - img.width) / 2 - 4;
                    if (line < height_lines + scrollbar.scroll_position) {
                        if (line >= scrollbar.scroll_position) {
                            image_draw(image_id, image_offset_x, y + 8);
                        } else {
                            image_draw(image_id, image_offset_x,
                                y + 8 - data.line_height * (scrollbar.scroll_position - line));
                        }
                    }
                    image_id = 0;
                }
            }
        }
        line++;
        num_lines++;
        if (!outside_viewport) {
            y += data.line_height;
        }
    }
    return num_lines;
}
export function rich_text_draw(text: number, x_offset: number, y_offset: number, box_width: number, height_lines: number, measure_only: number) {
    return draw_text(text, x_offset, y_offset, box_width, height_lines, 0, measure_only);
}
export function rich_text_draw_colored(text: number, x_offset: number, y_offset: number, box_width: number, height_lines: number, color: color_t) {
    return draw_text(text, x_offset, y_offset, box_width, height_lines, color, 0);
}
export function rich_text_draw_scrollbar() {
    scrollbar_draw(scrollbar);
}
export function rich_text_handle_mouse(m: mouse) {
    return scrollbar_handle_mouse(scrollbar, m);
}
function on_scroll() {
    rich_text_clear_links();
    window_invalidate();
}
export function rich_text_scroll_position() {
    return scrollbar.scroll_position;
}
