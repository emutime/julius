export const SCROLL_BUTTON_WIDTH = 39;
export const SCROLL_BUTTON_HEIGHT = 26;
export const TOTAL_BUTTON_HEIGHT = 2;
export const SCROLL_DOT_SIZE = 25;
;
import { color_t } from 'graphics/color';
import { language_type } from 'core/locale';
import { encoding_type } from 'core/encoding';
import { font_t } from 'graphics/font';
import { font_definition } from 'graphics/font';
import { time_millis } from 'core/time';
import { touch_coords } from 'input/touch';
import { touch_mode } from 'input/touch';
import { touch } from 'input/touch';
import { touch_get_earliest } from 'input/touch';
import { mouse_button } from 'input/mouse';
import { scroll_state } from 'input/mouse';
import SCROLL_UP = scroll_state.SCROLL_UP;
import SCROLL_DOWN = scroll_state.SCROLL_DOWN;
import { scroll_state } from 'input/mouse';
import { mouse } from 'input/mouse';
export class scrollbar_type {
    public x: number = 0;
    public y: number = 0;
    public height: number = 0;
    public scrollable_width: number = 0;
    public elements_in_view: number = 0;
    public on_scroll_callback: void ( = null;
    public has_y_margin: number = 0;
    public dot_padding: number = 0;
    public always_visible: number = 0;
    public max_scroll_position: number = 0;
    public scroll_position: number = 0;
    public is_dragging_scrollbar_dot: number = 0;
    public scrollbar_dot_drag_offset: number = 0;
    public touch_drag_state: number = 0;
    public position_on_touch: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.x = args[0]);
        args.length >= 2 && (this.y = args[1]);
        args.length >= 3 && (this.height = args[2]);
        args.length >= 4 && (this.scrollable_width = args[3]);
        args.length >= 5 && (this.elements_in_view = args[4]);
        args.length >= 6 && (this.on_scroll_callback = args[5]);
        args.length >= 7 && (this.has_y_margin = args[6]);
        args.length >= 8 && (this.dot_padding = args[7]);
        args.length >= 9 && (this.always_visible = args[8]);
        args.length >= 10 && (this.max_scroll_position = args[9]);
        args.length >= 11 && (this.scroll_position = args[10]);
        args.length >= 12 && (this.is_dragging_scrollbar_dot = args[11]);
        args.length >= 13 && (this.scrollbar_dot_drag_offset = args[12]);
        args.length >= 14 && (this.touch_drag_state = args[13]);
        args.length >= 15 && (this.position_on_touch = args[14]);
    }
}
import { direction_type } from 'core/direction';
import { calc_adjust_with_percentage } from 'core/calc';
import { calc_percentage } from 'core/calc';
import { calc_bound } from 'core/calc';
import { group_terrain } from 'core/image_group';
import GROUP_PANEL_BUTTON = group_terrain.GROUP_PANEL_BUTTON;
import GROUP_OK_CANCEL_SCROLL_BUTTONS = group_terrain.GROUP_OK_CANCEL_SCROLL_BUTTONS;
import { image } from 'core/image';
import { image_group } from 'core/image';
import { image_draw } from 'graphics/image';
import { button_none } from 'graphics/button';
import { ib } from 'graphics/image_button';
import IB_SCROLL = ib.IB_SCROLL;
import { image_button } from 'graphics/image_button';
import { image_buttons_draw } from 'graphics/image_button';
import { image_buttons_handle_mouse } from 'graphics/image_button';
export const enum touch_drag {
    TOUCH_DRAG_NONE = 0,
    TOUCH_DRAG_PENDING = 1,
    TOUCH_DRAG_IN_PROGRESS = 2,
}
let image_button_scroll_up: image_button = new image_button(
    0, 0, SCROLL_BUTTON_WIDTH, SCROLL_BUTTON_HEIGHT, IB_SCROLL,
    GROUP_OK_CANCEL_SCROLL_BUTTONS, 8, text_scroll, button_none, 0, 1, 1
);
let image_button_scroll_down: image_button = new image_button(
    0, 0, SCROLL_BUTTON_WIDTH, SCROLL_BUTTON_HEIGHT, IB_SCROLL,
    GROUP_OK_CANCEL_SCROLL_BUTTONS, 12, text_scroll, button_none, 1, 1, 1
);
let current: scrollbar_type;
export function scrollbar_init(scrollbar: scrollbar_type, scroll_position: number, total_elements: number) {
    let max_scroll_position: number = total_elements - scrollbar.elements_in_view;
    if (max_scroll_position < 0) {
        max_scroll_position = 0;
    }
    scrollbar.scroll_position = calc_bound(scroll_position, 0, max_scroll_position);
    scrollbar.max_scroll_position = max_scroll_position;
    scrollbar.is_dragging_scrollbar_dot = 0;
    scrollbar.touch_drag_state = TOUCH_DRAG_NONE;
}
export function scrollbar_reset(scrollbar: scrollbar_type, scroll_position: number) {
    scrollbar.scroll_position = scroll_position;
    scrollbar.is_dragging_scrollbar_dot = 0;
    scrollbar.touch_drag_state = TOUCH_DRAG_NONE;
}
export function scrollbar_update_total_elements(scrollbar: scrollbar_type, total_elements: number) {
    let max_scroll_position: number = total_elements - scrollbar.elements_in_view;
    if (max_scroll_position < 0) {
        max_scroll_position = 0;
    }
    scrollbar.max_scroll_position = max_scroll_position;
    if (scrollbar.scroll_position > max_scroll_position) {
        scrollbar.scroll_position = max_scroll_position;
    }
}
export function scrollbar_draw(scrollbar: scrollbar_type) {
    if (scrollbar.max_scroll_position > 0 || scrollbar.always_visible) {
        image_buttons_draw(scrollbar.x, scrollbar.y, image_button_scroll_up, 1);
        image_buttons_draw(scrollbar.x, scrollbar.y + scrollbar.height - SCROLL_BUTTON_HEIGHT,
            image_button_scroll_down, 1);
        let pct: number;
        if (scrollbar.scroll_position <= 0) {
            pct = 0;
        } else if (scrollbar.scroll_position >= scrollbar.max_scroll_position) {
            pct = 100;
        } else {
            pct = calc_percentage(scrollbar.scroll_position, scrollbar.max_scroll_position);
        }
        let offset: number = calc_adjust_with_percentage(
            scrollbar.height - TOTAL_BUTTON_HEIGHT - 2 * scrollbar.dot_padding, pct);
        if (scrollbar.is_dragging_scrollbar_dot) {
            offset = scrollbar.scrollbar_dot_drag_offset;
        }
        image_draw(image_group(GROUP_PANEL_BUTTON) + 39,
            scrollbar.x + (SCROLL_BUTTON_WIDTH - SCROLL_DOT_SIZE) / 2,
            scrollbar.y + offset + SCROLL_BUTTON_HEIGHT + scrollbar.dot_padding);
    }
}
function touch_inside_scrollable_area(scrollbar: scrollbar_type, t: touch) {
    return scrollbar.max_scroll_position > 0 &&
        t.start_point.x >= scrollbar.x - scrollbar.scrollable_width && t.start_point.x <= scrollbar.x - 2 &&
        t.start_point.y >= scrollbar.y && t.start_point.y < scrollbar.y + scrollbar.height;
}
function handle_touch(scrollbar: scrollbar_type, t: touch) {
    let old_position: number = scrollbar.scroll_position;
    let active: number = scrollbar.touch_drag_state == TOUCH_DRAG_IN_PROGRESS;
    if (t.has_started && touch_inside_scrollable_area(scrollbar, t)) {
        scrollbar.touch_drag_state = TOUCH_DRAG_PENDING;
        scrollbar.position_on_touch = scrollbar.scroll_position;
    }
    if (t.has_moved && scrollbar.touch_drag_state != TOUCH_DRAG_NONE) {
        scrollbar.touch_drag_state = TOUCH_DRAG_IN_PROGRESS;
        let element_height: number = (scrollbar.height - 8 * scrollbar.has_y_margin) / scrollbar.elements_in_view;
        let current_y: number = t.current_point.y - ((t.current_point.y - (scrollbar.y + 8 * scrollbar.has_y_margin)) % element_height);
        let start_y: number = t.start_point.y - ((t.start_point.y - (scrollbar.y + 8 * scrollbar.has_y_margin)) % element_height);
        let touch_scrolled: number = (current_y - start_y) / element_height;
        scrollbar.scroll_position = calc_bound(scrollbar.position_on_touch - touch_scrolled, 0, scrollbar.max_scroll_position);
        active = 1;
    }
    if (t.has_ended) {
        scrollbar.touch_drag_state = TOUCH_DRAG_NONE;
    }
    if (scrollbar.on_scroll_callback && old_position != scrollbar.scroll_position) {
        scrollbar.on_scroll_callback();
    }
    return active;
}
function handle_scrollbar_dot(scrollbar: scrollbar_type, m: mouse) {
    if (scrollbar.max_scroll_position <= 0 || !m.left.is_down) {
        return 0;
    }
    let track_height: number = scrollbar.height - TOTAL_BUTTON_HEIGHT - 2 * scrollbar.dot_padding;
    if (m.x < scrollbar.x || m.x >= scrollbar.x + SCROLL_BUTTON_WIDTH) {
        return 0;
    }
    if (m.y < scrollbar.y + SCROLL_BUTTON_HEIGHT + scrollbar.dot_padding ||
        m.y > scrollbar.y + scrollbar.height - SCROLL_BUTTON_HEIGHT - scrollbar.dot_padding) {
        return 0;
    }
    let dot_offset: number = m.y - scrollbar.y - SCROLL_DOT_SIZE / 2 - SCROLL_BUTTON_HEIGHT;
    if (dot_offset < 0) {
        dot_offset = 0;
    }
    if (dot_offset > track_height) {
        dot_offset = track_height;
    }
    let pct_scrolled: number = calc_percentage(dot_offset, track_height);
    scrollbar.scroll_position = calc_adjust_with_percentage(
        scrollbar.max_scroll_position, pct_scrolled);
    scrollbar.is_dragging_scrollbar_dot = 1;
    scrollbar.scrollbar_dot_drag_offset = dot_offset;
    if (scrollbar.scrollbar_dot_drag_offset < 0) {
        scrollbar.scrollbar_dot_drag_offset = 0;
    }
    if (scrollbar.on_scroll_callback) {
        scrollbar.on_scroll_callback();
    }
    return 1;
}
export function scrollbar_handle_mouse(scrollbar: scrollbar_type, m: mouse) {
    if (scrollbar.max_scroll_position <= 0) {
        return 0;
    }
    current = scrollbar;
    if (!m.is_touch) {
        scrollbar.touch_drag_state = TOUCH_DRAG_NONE;
    }
    if (scrollbar.touch_drag_state != TOUCH_DRAG_IN_PROGRESS) {
        if (m.scrolled == SCROLL_DOWN) {
            text_scroll(1, 3);
        } else if (m.scrolled == SCROLL_UP) {
            text_scroll(0, 3);
        }
        if (image_buttons_handle_mouse(m,
            scrollbar.x, scrollbar.y, image_button_scroll_up, 1, 0)) {
            return 1;
        }
        if (image_buttons_handle_mouse(m,
            scrollbar.x, scrollbar.y + scrollbar.height - SCROLL_BUTTON_HEIGHT,
            image_button_scroll_down, 1, 0)) {
            return 1;
        }
    }
    if (m.is_touch && handle_touch(scrollbar, touch_get_earliest())) {
        return 1;
    }
    return handle_scrollbar_dot(scrollbar, m);
}
function text_scroll(is_down: number, num_lines: number) {
    let scrollbar: scrollbar_type = current;
    if (is_down) {
        scrollbar.scroll_position += num_lines
        if (scrollbar.scroll_position > scrollbar.max_scroll_position) {
            scrollbar.scroll_position = scrollbar.max_scroll_position;
        }
    } else {
        scrollbar.scroll_position -= num_lines
        if (scrollbar.scroll_position < 0) {
            scrollbar.scroll_position = 0;
        }
    }
    scrollbar.is_dragging_scrollbar_dot = 0;
    if (scrollbar.on_scroll_callback) {
        scrollbar.on_scroll_callback();
    }
}
