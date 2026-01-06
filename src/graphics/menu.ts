export const TOP_MENU_BASE_X_OFFSET = 10;
export const MENU_BASE_TEXT_Y_OFFSET = 6;
export const MENU_ITEM_HEIGHT = 20;
import { calc_bound } from 'core/calc';
import { COLOR_BLACK, COLOR_FONT_ORANGE } from 'graphics/color';
import { font_t } from 'graphics/font';
import { graphics_fill_rect } from 'graphics/graphics';
import { lang_text_draw, lang_text_draw_colored, lang_text_get_width } from 'graphics/lang_text';
import { BLOCK_SIZE, unbordered_panel_draw } from 'graphics/panel';
import { mouse } from 'input/mouse';
export const TOP_MENU_HEIGHT = 24;

export class menu_item {
    public text_group: number = 0;
    public text_number: number = 0;
    public left_click_handler: (param: number) => void = null;
    public parameter: number = 0;
    public hidden: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.text_group = args[0]);
        args.length >= 2 && (this.text_number = args[1]);
        args.length >= 3 && (this.left_click_handler = args[2]);
        args.length >= 4 && (this.parameter = args[3]);
        args.length >= 5 && (this.hidden = args[4]);
    }
}
export class menu_bar_item {
    public text_group: number = 0;
    public items: menu_item[] = null;
    public num_items: number = 0;
    public x_start: number = 0;
    public x_end: number = 0;
    public calculated_width_blocks: number = 0;
    public calculated_height_blocks: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.text_group = args[0]);
        args.length >= 2 && (this.items = args[1]);
        args.length >= 3 && (this.num_items = args[2]);
        args.length >= 4 && (this.x_start = args[3]);
        args.length >= 5 && (this.x_end = args[4]);
        args.length >= 6 && (this.calculated_width_blocks = args[5]);
        args.length >= 7 && (this.calculated_height_blocks = args[6]);
    }
}
const FONT_NORMAL_PLAIN = font_t.FONT_NORMAL_PLAIN;
const FONT_NORMAL_BLACK = font_t.FONT_NORMAL_BLACK;
const FONT_NORMAL_GREEN = font_t.FONT_NORMAL_GREEN;
export function menu_bar_draw(items: menu_bar_item[], num_items: number, max_width: number): void {
    let total_text_width: number = 0;
    for (let i: number = 0; i < num_items; i++) {
        total_text_width += lang_text_get_width(items[i].text_group, 0, FONT_NORMAL_GREEN)
    }
    let spacing_width: number = (max_width - total_text_width - TOP_MENU_BASE_X_OFFSET) / (num_items - 1);
    spacing_width = calc_bound(spacing_width, 0, 32);
    let x_offset: number = TOP_MENU_BASE_X_OFFSET;
    for (let i: number = 0; i < num_items; i++) {
        items[i].x_start = x_offset;
        x_offset += lang_text_draw(items[i].text_group, 0, x_offset, MENU_BASE_TEXT_Y_OFFSET, FONT_NORMAL_GREEN)
        items[i].x_end = x_offset;
        x_offset += spacing_width
    }
}
function get_menu_bar_item(m: mouse, items: menu_bar_item[], num_items: number): number {
    for (let i: number = 0; i < num_items; i++) {
        if (items[i].x_start <= m.x &&
            items[i].x_end > m.x &&
            MENU_BASE_TEXT_Y_OFFSET <= m.y &&
            MENU_BASE_TEXT_Y_OFFSET + 12 > m.y) {
            return i + 1;
        }
    }
    return 0;
}
export function menu_bar_handle_mouse(m: mouse, items: menu_bar_item[], num_items: number, focus_menu_id?: number): number {
    let menu_id: number = get_menu_bar_item(m, items, num_items);
    return menu_id;
}
function calculate_menu_dimensions(menu: menu_bar_item): void {
    let max_width: number = 0;
    let height_pixels: number = MENU_ITEM_HEIGHT;
    for (let i: number = 0; i < menu.num_items; i++) {
        let sub: menu_item = menu.items[i];
        if (sub.hidden) {
            continue
        }
        let width_pixels: number = lang_text_get_width(
            sub.text_group, sub.text_number, FONT_NORMAL_BLACK);
        if (width_pixels > max_width) {
            max_width = width_pixels;
        }
        height_pixels += MENU_ITEM_HEIGHT
    }
    let blocks: number = (max_width + 8) / BLOCK_SIZE + 1;
    menu.calculated_width_blocks = blocks < 10 ? 10 : blocks;
    menu.calculated_height_blocks = height_pixels / BLOCK_SIZE;
}
export function menu_draw(menu: menu_bar_item, focus_item_id: number): void {
    if (menu.calculated_width_blocks == 0 || menu.calculated_height_blocks == 0) {
        calculate_menu_dimensions(menu);
    }
    unbordered_panel_draw(menu.x_start, TOP_MENU_HEIGHT,
        menu.calculated_width_blocks, menu.calculated_height_blocks);
    let y_offset: number = TOP_MENU_HEIGHT + MENU_BASE_TEXT_Y_OFFSET * 2;
    for (let i: number = 0; i < menu.num_items; i++) {
        let sub: menu_item = menu.items[i];
        if (sub.hidden) {
            continue
        }
        if (i == focus_item_id - 1) {
            graphics_fill_rect(menu.x_start, y_offset - 4,
                BLOCK_SIZE * menu.calculated_width_blocks, 20, COLOR_BLACK);
            lang_text_draw_colored(sub.text_group, sub.text_number,
                menu.x_start + 8, y_offset, FONT_NORMAL_PLAIN, COLOR_FONT_ORANGE);
        } else {
            lang_text_draw(sub.text_group, sub.text_number,
                menu.x_start + 8, y_offset, FONT_NORMAL_BLACK);
        }
        y_offset += MENU_ITEM_HEIGHT
    }
}
function get_menu_item(m: mouse, menu: menu_bar_item): number {
    let y_offset: number = TOP_MENU_HEIGHT + MENU_BASE_TEXT_Y_OFFSET * 2;
    for (let i: number = 0; i < menu.num_items; i++) {
        if (menu.items[i].hidden) {
            continue
        }
        if (menu.x_start <= m.x &&
            menu.x_start + BLOCK_SIZE * menu.calculated_width_blocks > m.x &&
            y_offset - 2 <= m.y &&
            y_offset + 19 > m.y) {
            return i + 1;
        }
        y_offset += MENU_ITEM_HEIGHT
    }
    return 0;
}
export function menu_handle_mouse(m: mouse, menu: menu_bar_item, focus_item_id?: number): number {
    let item_id: number = get_menu_item(m, menu);
    if (!item_id) {
        return 0;
    }
    if (m.left.went_up) {
        let item: menu_item = menu.items[item_id - 1];
        item.left_click_handler(item.parameter);
    }
    return item_id;
}
export function menu_update_text(menu: menu_bar_item, index: number, text_number: number): void {
    menu.items[index].text_number = text_number;
    if (menu.calculated_width_blocks > 0) {
        let item_width: number = lang_text_get_width(
            menu.items[index].text_group, text_number, FONT_NORMAL_BLACK);
        let blocks: number = (item_width + 8) / BLOCK_SIZE + 1;
        if (blocks > menu.calculated_width_blocks) {
            menu.calculated_width_blocks = blocks;
        }
    }
}
