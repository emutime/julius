import { city_view_foreach_map_tile, city_view_foreach_valid_map_tile_row, city_view_get_viewport, city_view_pixels_to_view_tile, city_view_scroll, city_view_set_selected_view_tile, city_view_tile_to_grid_offset, pixel_offset, view_tile } from 'city/view';
import { image_group } from 'core/image';
import { group_terrain } from 'core/image_group';
import { time_get_millis, time_millis } from 'core/time';
import { editor_tool_deactivate, editor_tool_end_use, editor_tool_is_active, editor_tool_is_brush, editor_tool_is_in_use, editor_tool_is_updatable, editor_tool_start_use, editor_tool_update_use } from 'editor/tool';
import { figure, figure_get } from 'figure/figure';
import { color_t } from 'graphics/color';
import { graphics_reset_clip_rectangle, graphics_set_clip_rectangle } from 'graphics/graphics';
import { image_draw_isometric_footprint_from_draw_tile, image_draw_isometric_top_from_draw_tile } from 'graphics/image';
import { BLOCK_SIZE } from 'graphics/panel';
import { hotkey_handle_escape, hotkeys } from 'input/hotkey';
import { mouse } from 'input/mouse';
import { scroll_drag_end, scroll_drag_start, scroll_get_delta, scroll_restore_margins, scroll_set_custom_margins, scroll_type } from 'input/scroll';
import { touch, touch_get_earliest, touch_get_latest, touch_not_click, touch_was_click } from 'input/touch';
import { map_figure_at } from 'map/figure';
import { GRID, map_grid_offset_to_x, map_grid_offset_to_y } from 'map/grid';
import { map_image_at, map_image_set } from 'map/image';
import { map_tile } from 'map/point';
import { map_property_is_draw_tile } from 'map/property';
import { sound_city_decay_views } from 'sound/city';
import { sound_effect, sound_effect_play } from 'sound/effect';
import { city_draw_figure } from 'widget/city_figure';
import { map_editor_tool_draw } from 'widget/map_editor_tool';
import GROUP_TERRAIN_BLACK = group_terrain.GROUP_TERRAIN_BLACK;
import GROUP_TERRAIN_WATER = group_terrain.GROUP_TERRAIN_WATER;
import SCROLL_TYPE_CITY = scroll_type.SCROLL_TYPE_CITY;
import GRID_SIZE = GRID.GRID_SIZE;
import SOUND_EFFECT_BUILD = sound_effect.SOUND_EFFECT_BUILD;
export class unnamed19_8 {
    public current_tile: map_tile = null;
    public selected_grid_offset: number = 0;
    public new_start_grid_offset: number = 0;
    public capture_input: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.current_tile = args[0]);
        args.length >= 2 && (this.selected_grid_offset = args[1]);
        args.length >= 3 && (this.new_start_grid_offset = args[2]);
        args.length >= 4 && (this.capture_input = args[3]);
    }
}
let data: unnamed19_8 = new unnamed19_8();
export class unnamed26_8 {
    public last_water_animation_time: time_millis = null;
    public advance_water_animation: number = 0;
    public image_id_water_first: number = 0;
    public image_id_water_last: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.last_water_animation_time = args[0]);
        args.length >= 2 && (this.advance_water_animation = args[1]);
        args.length >= 3 && (this.image_id_water_first = args[2]);
        args.length >= 4 && (this.image_id_water_last = args[3]);
    }
}
let draw_context: unnamed26_8 = new unnamed26_8();
function init_draw_context() {
    draw_context.advance_water_animation = 0;
    let now: time_millis = time_get_millis();
    if (now - draw_context.last_water_animation_time > 60) {
        draw_context.last_water_animation_time = now;
        draw_context.advance_water_animation = 1;
    }
    draw_context.image_id_water_first = image_group(GROUP_TERRAIN_WATER);
    draw_context.image_id_water_last = 5 + draw_context.image_id_water_first;
}
function draw_footprint(x: number, y: number, grid_offset: number) {
    if (grid_offset < 0) {
        image_draw_isometric_footprint_from_draw_tile(image_group(GROUP_TERRAIN_BLACK), x, y, 0);
    } else if (map_property_is_draw_tile(grid_offset)) {
        let color_mask: color_t = 0;
        let image_id: number = map_image_at(grid_offset);
        if (draw_context.advance_water_animation &&
            image_id >= draw_context.image_id_water_first &&
            image_id <= draw_context.image_id_water_last) {
            image_id++;
            if (image_id > draw_context.image_id_water_last) {
                image_id = draw_context.image_id_water_first;
            }
            map_image_set(grid_offset, image_id);
        }
        image_draw_isometric_footprint_from_draw_tile(image_id, x, y, color_mask);
    }
}
function draw_top(x: number, y: number, grid_offset: number) {
    if (!map_property_is_draw_tile(grid_offset)) {
        return;
    }
    let image_id: number = map_image_at(grid_offset);
    let color_mask: color_t = 0;
    image_draw_isometric_top_from_draw_tile(image_id, x, y, color_mask);
}
function draw_flags(x: number, y: number, grid_offset: number) {
    let figure_id: number = map_figure_at(grid_offset);
    while (figure_id) {
        let f: figure = figure_get(figure_id);
        if (!f.is_ghost) {
            city_draw_figure(f, x, y, 0);
        }
        figure_id = f.next_figure_id_on_same_tile;
    }
}
function set_city_clip_rectangle() {
    let x: number
    let y: number
    let width: number
    let height: number;
    city_view_get_viewport(x, y, width, height);
    graphics_set_clip_rectangle(x, y, width, height);
}
export function widget_map_editor_draw() {
    set_city_clip_rectangle();
    init_draw_context();
    city_view_foreach_map_tile(draw_footprint);
    city_view_foreach_valid_map_tile_row(draw_flags, draw_top, null);
    map_editor_tool_draw(data.current_tile);
    graphics_reset_clip_rectangle();
}
function update_city_view_coords(x: number, y: number, tile: map_tile) {
    let view: view_tile;
    if (city_view_pixels_to_view_tile(x, y, view)) {
        tile.grid_offset = city_view_tile_to_grid_offset(view);
        city_view_set_selected_view_tile(view);
        tile.x = map_grid_offset_to_x(tile.grid_offset);
        tile.y = map_grid_offset_to_y(tile.grid_offset);
    } else {
        tile.grid_offset = tile.x = tile.y = 0;
    }
}
function scroll_map(m: mouse) {
    let delta: pixel_offset;
    if (scroll_get_delta(m, delta, SCROLL_TYPE_CITY)) {
        city_view_scroll(delta.x, delta.y);
        sound_city_decay_views();
    }
}
function input_coords_in_map(x: number, y: number) {
    let x_offset: number
    let y_offset: number
    let width: number
    let height: number;
    city_view_get_viewport(x_offset, y_offset, width, height);
    x -= x_offset
    y -= y_offset
    return (x >= 0 && x < width & y >= 0 && y < height);
}
function handle_touch_scroll(t: touch) {
    if (editor_tool_is_active()) {
        if (t.has_started) {
            let x_offset: number
            let y_offset: number
            let width: number
            let height: number;
            city_view_get_viewport(x_offset, y_offset, width, height);
            scroll_set_custom_margins(x_offset, y_offset, width, height);
        }
        if (t.has_ended) {
            scroll_restore_margins();
        }
        return;
    }
    scroll_restore_margins();
    if (!data.capture_input) {
        return;
    }
    let was_click: number = touch_was_click(touch_get_latest());
    if (t.has_started || was_click) {
        scroll_drag_start(1);
        return;
    }
    if (!touch_not_click(t)) {
        return;
    }
    if (t.has_ended) {
        scroll_drag_end();
    }
}
function handle_last_touch() {
    let last: touch = touch_get_latest();
    if (last.in_use && touch_was_click(last)) {
        editor_tool_deactivate();
    }
}
function handle_cancel_construction_button(t: touch) {
    if (!editor_tool_is_active()) {
        return 0;
    }
    let x: number
    let y: number
    let width: number
    let height: number;
    city_view_get_viewport(x, y, width, height);
    let box_size: number = 5 * BLOCK_SIZE;
    width -= box_size
    if (t.current_point.x < width || t.current_point.x >= width + box_size ||
        t.current_point.y < 24 || t.current_point.y >= 40 + box_size) {
        return 0;
    }
    editor_tool_deactivate();
    return 1;
}
function handle_first_touch(tile: map_tile) {
    let first: touch = touch_get_earliest();
    if (touch_was_click(first)) {
        if (handle_cancel_construction_button(first)) {
            return;
        }
    }
    handle_touch_scroll(first);
    if (!input_coords_in_map(first.current_point.x, first.current_point.y)) {
        return;
    }
    if (editor_tool_is_updatable()) {
        if (!editor_tool_is_in_use()) {
            if (first.has_started) {
                editor_tool_start_use(tile);
                data.new_start_grid_offset = 0;
            }
        } else {
            if (first.has_started) {
                if (data.selected_grid_offset != tile.grid_offset) {
                    data.new_start_grid_offset = tile.grid_offset;
                }
            }
            if (touch_not_click(first) && data.new_start_grid_offset) {
                data.new_start_grid_offset = 0;
                data.selected_grid_offset = 0;
                editor_tool_deactivate();
                editor_tool_start_use(tile);
            }
            editor_tool_update_use(tile);
            if (data.selected_grid_offset != tile.grid_offset) {
                data.selected_grid_offset = 0;
            }
            if (first.has_ended) {
                if (data.selected_grid_offset == tile.grid_offset) {
                    editor_tool_end_use(tile);
                    widget_map_editor_clear_current_tile();
                    data.new_start_grid_offset = 0;
                } else {
                    data.selected_grid_offset = tile.grid_offset;
                }
            }
        }
        return;
    }
    if (editor_tool_is_brush()) {
        if (first.has_started) {
            editor_tool_start_use(tile);
        }
        editor_tool_update_use(tile);
        if (first.has_ended) {
            editor_tool_end_use(tile);
        }
        return;
    }
    if (touch_was_click(first) && first.has_ended && data.capture_input &&
        data.selected_grid_offset == tile.grid_offset) {
        editor_tool_start_use(tile);
        editor_tool_update_use(tile);
        editor_tool_end_use(tile);
        widget_map_editor_clear_current_tile();
    } else if (first.has_ended) {
        data.selected_grid_offset = tile.grid_offset;
    }
}
function handle_touch() {
    let first: touch = touch_get_earliest();
    if (!first.in_use) {
        scroll_restore_margins();
        return;
    }
    let tile: map_tile = data.current_tile;
    if (!editor_tool_is_in_use() || input_coords_in_map(first.current_point.x, first.current_point.y)) {
        update_city_view_coords(first.current_point.x, first.current_point.y, tile);
    }
    if (first.has_started && input_coords_in_map(first.current_point.x, first.current_point.y)) {
        data.capture_input = 1;
        scroll_restore_margins();
    }
    handle_last_touch();
    handle_first_touch(tile);
    if (first.has_ended) {
        data.capture_input = 0;
    }
}
export function widget_map_editor_handle_input(m: mouse, h: hotkeys) {
    scroll_map(m);
    if (m.is_touch) {
        handle_touch();
    } else {
        if (m.right.went_down && input_coords_in_map(m.x, m.y) && !editor_tool_is_active()) {
            scroll_drag_start(0);
        }
        if (m.right.went_up) {
            if (!editor_tool_is_active()) {
                let has_scrolled: number = scroll_drag_end();
                if (!has_scrolled) {
                    editor_tool_deactivate();
                }
            } else {
                editor_tool_deactivate();
            }
        }
    }
    if (h.escape_pressed) {
        if (editor_tool_is_active()) {
            editor_tool_deactivate();
        } else {
            hotkey_handle_escape();
        }
        return;
    }
    let tile: map_tile = data.current_tile;
    update_city_view_coords(m.x, m.y, tile);
    if (tile.grid_offset) {
        if (m.left.went_down) {
            if (!editor_tool_is_in_use()) {
                editor_tool_start_use(tile);
            }
            editor_tool_update_use(tile);
        } else if (m.left.is_down || editor_tool_is_in_use()) {
            editor_tool_update_use(tile);
        }
    }
    if (m.left.went_up && editor_tool_is_in_use()) {
        editor_tool_end_use(tile);
        sound_effect_play(SOUND_EFFECT_BUILD);
    }
}
export function widget_map_editor_clear_current_tile() {
    data.selected_grid_offset = 0;
    data.current_tile.grid_offset = 0;
}
