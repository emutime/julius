import { building_get } from 'building/building';
import { building_construction_cancel, building_construction_cost, building_construction_in_progress, building_construction_is_updatable, building_construction_place, building_construction_reset_draw_as_constructing, building_construction_size, building_construction_start, building_construction_type, building_construction_update } from 'building/construction';
import { building_properties_for_type } from 'building/properties';
import { building_type } from 'building/type';
import { city_finance_treasury } from 'city/finance';
import { city_view_get_selected_tile_pixels, city_view_get_viewport, city_view_is_sidebar_collapsed, city_view_orientation, city_view_pixels_to_view_tile, city_view_scroll, city_view_set_selected_view_tile, city_view_tile_to_grid_offset, pixel_offset, view_tile } from 'city/view';
import { city_has_warnings, city_warning_clear_all } from 'city/warning';
import { direction_type } from 'core/direction';
import { image_group } from 'core/image';
import { group_terrain } from 'core/image_group';
import { string_from_ascii } from 'core/string';
import { formation, formation_get } from 'figure/formation';
import { formation_legion_at_building, formation_legion_at_grid_offset, formation_legion_move_to, formation_legion_return_home } from 'figure/formation_legion';
import { set_tooltips, setting_tooltips } from 'game/settings';
import { game_state_is_paused, game_state_overlay, game_state_toggle_paused, overlay } from 'game/state';
import { button_border_draw } from 'graphics/button';
import { COLOR_BLACK, COLOR_FONT_ORANGE, COLOR_FONT_ORANGE_LIGHT, COLOR_FONT_RED, COLOR_FONT_YELLOW, color_t, COLOR_WHITE } from 'graphics/color';
import { font_t } from 'graphics/font';
import { graphics_draw_horizontal_line, graphics_draw_vertical_line, graphics_fill_rect, graphics_reset_clip_rectangle, graphics_set_clip_rectangle } from 'graphics/graphics';
import { image_draw } from 'graphics/image';
import { BLOCK_SIZE, inner_panel_draw } from 'graphics/panel';
import { text_draw_number_colored, text_get_width } from 'graphics/text';
import { tooltip_context, tooltip_type } from 'graphics/tooltip';
import { window_id, window_is, window_request_refresh } from 'graphics/window';
import { hotkey_handle_escape, hotkeys } from 'input/hotkey';
import { mouse } from 'input/mouse';
import { scroll_drag_end, scroll_drag_start, scroll_get_delta, scroll_in_progress, scroll_restore_margins, scroll_set_custom_margins, scroll_type } from 'input/scroll';
import { touch, touch_get_earliest, touch_get_latest, touch_not_click, touch_was_click } from 'input/touch';
import { map_building_at } from 'map/building';
import { GRID, map_grid_add_delta, map_grid_delta, map_grid_is_inside, map_grid_offset_to_x, map_grid_offset_to_y } from 'map/grid';
import { map_tile } from 'map/point';
import { scenario_climate, scenario_property_climate } from 'scenario/property';
import { sound_city_decay_views } from 'sound/city';
import { sound_effect, sound_effect_play } from 'sound/effect';
import { sound_speech_play_file } from 'sound/speech';
import { city_with_overlay_draw, city_with_overlay_get_tooltip_text } from 'widget/city_with_overlay';
import { city_without_overlay_draw } from 'widget/city_without_overlay';
import { widget_minimap_handle_mouse, widget_minimap_invalidate } from 'widget/minimap';
import { window_building_info_show } from 'window/building_info';
import { window_city_military_show, window_city_show } from 'window/city';
import { Ref } from '../../ext/crt';
import TOOLTIP_OVERLAY = tooltip_type.TOOLTIP_OVERLAY;
import TOOLTIP_SENATE = tooltip_type.TOOLTIP_SENATE;
;
export class pixel_coordinate {
    public x: number = 0;
    public y: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.x = args[0]);
        args.length >= 2 && (this.y = args[1]);
    }
}
import BUILDING_NONE = building_type.BUILDING_NONE;
import BUILDING_WAREHOUSE = building_type.BUILDING_WAREHOUSE;
import BUILDING_SENATE = building_type.BUILDING_SENATE;
import DIR_0_TOP = direction_type.DIR_0_TOP;
import DIR_2_RIGHT = direction_type.DIR_2_RIGHT;
import DIR_6_LEFT = direction_type.DIR_6_LEFT;
import TOOLTIPS_NONE = set_tooltips.TOOLTIPS_NONE;
import OVERLAY_NONE = overlay.OVERLAY_NONE;
import GROUP_ARROW_MESSAGE_PROBLEMS = group_terrain.GROUP_ARROW_MESSAGE_PROBLEMS;
import GROUP_OK_CANCEL_SCROLL_BUTTONS = group_terrain.GROUP_OK_CANCEL_SCROLL_BUTTONS;
import FONT_NORMAL_PLAIN = font_t.FONT_NORMAL_PLAIN;
import FONT_SMALL_PLAIN = font_t.FONT_SMALL_PLAIN;
import WINDOW_CITY = window_id.WINDOW_CITY;
import SCROLL_TYPE_CITY = scroll_type.SCROLL_TYPE_CITY;
import GRID_SIZE = GRID.GRID_SIZE;
import CLIMATE_DESERT = scenario_climate.CLIMATE_DESERT;
import SOUND_EFFECT_BUILD = sound_effect.SOUND_EFFECT_BUILD;
export class unnamed33_8 {
    public current_tile: map_tile = null;
    public selected_tile: map_tile = null;
    public new_start_grid_offset: number = 0;
    public capture_input: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.current_tile = args[0]);
        args.length >= 2 && (this.selected_tile = args[1]);
        args.length >= 3 && (this.new_start_grid_offset = args[2]);
        args.length >= 4 && (this.capture_input = args[3]);
    }
}
let data: unnamed33_8 = new unnamed33_8();
function set_city_clip_rectangle() {
    let x: number
    let y: number
    let width: number
    let height: number;
    city_view_get_viewport(x, y, width, height);
    graphics_set_clip_rectangle(x, y, width, height);
}
export function widget_city_draw() {
    set_city_clip_rectangle();
    if (game_state_overlay()) {
        city_with_overlay_draw(data.current_tile);
    } else {
        city_without_overlay_draw(0, 0, data.current_tile);
    }
    graphics_reset_clip_rectangle();
}
export function widget_city_draw_for_figure(figure_id: number, coord: pixel_coordinate) {
    set_city_clip_rectangle();
    city_without_overlay_draw(figure_id, coord, data.current_tile);
    graphics_reset_clip_rectangle();
}
export function widget_city_draw_construction_cost_and_size() {
    if (scroll_in_progress()) {
        return;
    }
    let size_x: number
    let size_y: number;
    let cost: number = building_construction_cost();
    let has_size: number = building_construction_size(size_x, size_y);
    if (!cost && !has_size) {
        return;
    }
    set_city_clip_rectangle();
    let x: number
    let y: number;
    city_view_get_selected_tile_pixels(x, y);
    if (cost) {
        let color: color_t;
        if (cost <= city_finance_treasury()) {
            color = scenario_property_climate() == CLIMATE_DESERT ? COLOR_FONT_ORANGE : COLOR_FONT_ORANGE_LIGHT;
        } else {
            color = COLOR_FONT_RED;
        }
        text_draw_number_colored(cost, '@', " ", x + 58 + 1, y + 1, FONT_NORMAL_PLAIN, COLOR_BLACK);
        text_draw_number_colored(cost, '@', " ", x + 58, y, FONT_NORMAL_PLAIN, color);
    }
    if (has_size) {
        let width: number = -text_get_width(string_from_ascii("  "), FONT_SMALL_PLAIN);
        width += text_draw_number_colored(size_x, '@', "x", x - 15 + 1, y + 25 + 1, FONT_SMALL_PLAIN, COLOR_BLACK)
        text_draw_number_colored(size_x, '@', "x", x - 15, y + 25, FONT_SMALL_PLAIN, COLOR_FONT_YELLOW);
        text_draw_number_colored(size_y, '@', " ", x - 15 + width + 1, y + 25 + 1, FONT_SMALL_PLAIN, COLOR_BLACK);
        text_draw_number_colored(size_y, '@', " ", x - 15 + width, y + 25, FONT_SMALL_PLAIN, COLOR_FONT_YELLOW);
    }
    graphics_reset_clip_rectangle();
}
function draw_pause_icon(x_offset: number, y_offset: number) {
    graphics_draw_horizontal_line(x_offset + 3, x_offset + 11, y_offset + 3, COLOR_BLACK);
    graphics_draw_vertical_line(x_offset + 3, y_offset + 4, y_offset + 16, COLOR_BLACK);
    graphics_fill_rect(x_offset + 4, y_offset + 4, 8, 13, COLOR_WHITE);
    x_offset += 13
    graphics_draw_horizontal_line(x_offset + 3, x_offset + 11, y_offset + 3, COLOR_BLACK);
    graphics_draw_vertical_line(x_offset + 3, y_offset + 4, y_offset + 16, COLOR_BLACK);
    graphics_fill_rect(x_offset + 4, y_offset + 4, 8, 13, COLOR_WHITE);
}
function draw_pause_button() {
    inner_panel_draw(16, 40, 3, 2);
    button_border_draw(16, 40, 3 * BLOCK_SIZE, 2 * BLOCK_SIZE, 0);
    if (game_state_is_paused()) {
        image_draw(image_group(GROUP_ARROW_MESSAGE_PROBLEMS), 26, 46);
    } else {
        draw_pause_icon(26, 46);
    }
}
function draw_cancel_construction_button() {
    if (!building_construction_type()) {
        return;
    }
    let city_x: Ref<number> = new Ref(0);
    let city_y: Ref<number> = new Ref(0);
    let width: Ref<number> = new Ref(0);
    let height: Ref<number> = new Ref(0);
    city_view_get_viewport(city_x, city_y, width, height);
    let x_offset: number = width.v - 4 * BLOCK_SIZE;
    let y_offset: number = 40;
    inner_panel_draw(x_offset, y_offset, 3, 2);
    button_border_draw(x_offset, y_offset, 3 * BLOCK_SIZE, 2 * BLOCK_SIZE, 0);
    graphics_set_clip_rectangle(x_offset + 5, y_offset + 5, 37, 24);
    image_draw(image_group(GROUP_OK_CANCEL_SCROLL_BUTTONS) + 4, x_offset + 4, y_offset + 4);
    graphics_reset_clip_rectangle();
}
export function widget_city_draw_touch_buttons() {
    draw_pause_button();
    draw_cancel_construction_button();
}
function is_pause_button(x: number, y: number) {
    return x < 5 * BLOCK_SIZE && y >= 24 && y < 24 + 4 * BLOCK_SIZE;
}
function is_cancel_construction_button(x: number, y: number) {
    if (!building_construction_type()) {
        return 0;
    }
    let city_x: number
    let city_y: number
    let width: number
    let height: number;
    city_view_get_viewport(city_x, city_y, width, height);
    let touch_width: number = 5 * BLOCK_SIZE;
    let touch_height: number = 4 * BLOCK_SIZE;
    let x_offset: number = width - touch_width;
    let y_offset: number = 24;
    return x >= x_offset && x < x_offset + touch_width && y >= y_offset && y < y_offset + touch_height;
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
function handle_right_click_allow_building_info(tile: map_tile) {
    let allow: number = 1;
    if (!window_is(WINDOW_CITY)) {
        allow = 0;
    }
    window_city_show();
    if (!tile.grid_offset) {
        allow = 0;
    }
    if (allow && city_has_warnings()) {
        city_warning_clear_all();
        allow = 0;
    }
    return allow;
}
function handle_legion_click(tile: map_tile) {
    if (tile.grid_offset) {
        let formation_id: number = formation_legion_at_grid_offset(tile.grid_offset);
        if (formation_id > 0 && !formation_get(formation_id).in_distant_battle) {
            window_city_military_show(formation_id);
            return 1;
        }
    }
    return 0;
}
function build_start(tile: map_tile) {
    if (tile.grid_offset) {
        building_construction_start(tile.x, tile.y, tile.grid_offset);
    }
}
function build_move(tile: map_tile) {
    if (!building_construction_in_progress()) {
        return;
    }
    building_construction_update(tile.x, tile.y, tile.grid_offset);
}
function build_end() {
    if (building_construction_in_progress()) {
        if (building_construction_type() != BUILDING_NONE) {
            sound_effect_play(SOUND_EFFECT_BUILD);
        }
        building_construction_place();
        widget_minimap_invalidate();
    }
}
function scroll_map(m: mouse) {
    let delta: pixel_offset;
    if (scroll_get_delta(m, delta, SCROLL_TYPE_CITY)) {
        city_view_scroll(delta.x, delta.y);
        sound_city_decay_views();
    }
}
function adjust_offset_for_orientation(grid_offset: number, size: number) {
    switch (city_view_orientation()) {
        case DIR_0_TOP:
            return map_grid_add_delta(grid_offset, -size + 1, -size + 1);
        case DIR_2_RIGHT:
            return map_grid_add_delta(grid_offset, 0, -size + 1);
        case DIR_6_LEFT:
            return map_grid_add_delta(grid_offset, -size + 1, 0);
        default:
            return grid_offset
    }
}
function has_confirmed_construction(ghost_offset: number, tile_offset: number, range_size: number) {
    tile_offset = adjust_offset_for_orientation(tile_offset, range_size);
    let x: number = map_grid_offset_to_x(tile_offset);
    let y: number = map_grid_offset_to_y(tile_offset);
    if (ghost_offset <= 0 || !map_grid_is_inside(x, y, range_size)) {
        return 0;
    }
    for (let dy: number = 0; dy < range_size; dy++) {
        for (let dx: number = 0; dx < range_size; dx++) {
            if (ghost_offset == tile_offset + map_grid_delta(dx, dy)) {
                return 1;
            }
        }
    }
    return 0;
}
function input_coords_in_city(x: number, y: number) {
    if (is_pause_button(x, y) || is_cancel_construction_button(x, y)) {
        return 0;
    }
    let x_offset: number
    let y_offset: number
    let width: number
    let height: number;
    city_view_get_viewport(x_offset, y_offset, width, height);
    x -= x_offset
    y -= y_offset
    return (x >= 0 && x < width && y >= 0 && y < height);
}
function handle_touch_scroll(t: touch) {
    if (building_construction_type()) {
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
    let was_click: boolean = touch_was_click(touch_get_latest());
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
        building_construction_cancel();
        window_request_refresh();
    }
}
function handle_play_pause_button(t: touch) {
    if (is_pause_button(t.current_point.x, t.current_point.y)) {
        game_state_toggle_paused();
        return 1;
    }
    return 0;
}
function handle_cancel_construction_button(t: touch) {
    if (is_cancel_construction_button(t.current_point.x, t.current_point.y)) {
        building_construction_cancel();
        window_request_refresh();
        return 1;
    }
    return 0;
}
function handle_first_touch(tile: map_tile) {
    let first: touch = touch_get_earliest();
    let type: building_type = building_construction_type();
    if (touch_was_click(first)) {
        if (handle_play_pause_button(first) || handle_cancel_construction_button(first) || handle_legion_click(tile)) {
            return;
        }
        if (type == BUILDING_NONE && handle_right_click_allow_building_info(tile)) {
            scroll_drag_end();
            data.capture_input = 0;
            window_building_info_show(tile.grid_offset);
            return;
        }
    }
    handle_touch_scroll(first);
    if (!input_coords_in_city(first.current_point.x, first.current_point.y) || type == BUILDING_NONE) {
        return;
    }
    if (building_construction_is_updatable()) {
        if (!building_construction_in_progress()) {
            if (first.has_started) {
                build_start(tile);
                data.new_start_grid_offset = 0;
            }
        } else {
            if (first.has_started) {
                if (data.selected_tile.grid_offset != tile.grid_offset) {
                    data.new_start_grid_offset = tile.grid_offset;
                }
            }
            if (touch_not_click(first) && data.new_start_grid_offset) {
                data.new_start_grid_offset = 0;
                data.selected_tile.grid_offset = 0;
                building_construction_cancel();
                build_start(tile);
            }
            build_move(tile);
            if (data.selected_tile.grid_offset != tile.grid_offset) {
                data.selected_tile.grid_offset = 0;
            }
            if (first.has_ended) {
                if (data.selected_tile.grid_offset == tile.grid_offset) {
                    build_end();
                    widget_city_clear_current_tile();
                    data.new_start_grid_offset = 0;
                } else {
                    data.selected_tile.grid_offset = tile.grid_offset;
                }
            }
        }
        return;
    }
    let size: number = building_properties_for_type(type).size;
    if (type == BUILDING_WAREHOUSE) {
        size = 3;
    }
    if (touch_was_click(first) && first.has_ended && data.capture_input &&
        has_confirmed_construction(data.selected_tile.grid_offset, tile.grid_offset, size)) {
        build_start(data.selected_tile);
        build_move(data.selected_tile);
        build_end();
        widget_city_clear_current_tile();
    } else if (first.has_ended) {
        data.selected_tile = tile;
    }
}
function handle_touch() {
    let first: touch = touch_get_earliest();
    if (!first.in_use) {
        scroll_restore_margins();
        return;
    }
    let tile: map_tile = data.current_tile;
    if (!building_construction_in_progress() || input_coords_in_city(first.current_point.x, first.current_point.y)) {
        update_city_view_coords(first.current_point.x, first.current_point.y, tile);
    }
    if (first.has_started && input_coords_in_city(first.current_point.x, first.current_point.y)) {
        data.capture_input = 1;
        scroll_restore_margins();
    }
    handle_last_touch();
    handle_first_touch(tile);
    if (first.has_ended) {
        data.capture_input = 0;
    }
    building_construction_reset_draw_as_constructing();
}
export function widget_city_has_input() {
    return data.capture_input;
}
function handle_mouse(m: mouse) {
    let tile: map_tile = data.current_tile;
    update_city_view_coords(m.x, m.y, tile);
    building_construction_reset_draw_as_constructing();
    if (m.left.went_down) {
        if (handle_legion_click(tile)) {
            return;
        }
        if (!building_construction_in_progress()) {
            build_start(tile);
        }
        build_move(tile);
    } else if (m.left.is_down || building_construction_in_progress()) {
        build_move(tile);
    }
    if (m.left.went_up) {
        build_end();
    }
    if (m.right.went_down && input_coords_in_city(m.x, m.y) && !building_construction_type()) {
        scroll_drag_start(0);
    }
    if (m.right.went_up) {
        if (!building_construction_type()) {
            let has_scrolled: number = scroll_drag_end();
            if (!has_scrolled && handle_right_click_allow_building_info(tile)) {
                window_building_info_show(tile.grid_offset);
            }
        } else {
            building_construction_cancel();
            window_request_refresh();
        }
    }
}
export function widget_city_handle_input(m: mouse, h: hotkeys) {
    scroll_map(m);
    if (m.is_touch) {
        handle_touch();
    } else {
        handle_mouse(m);
    }
    if (h.escape_pressed) {
        if (building_construction_type()) {
            building_construction_cancel();
            window_request_refresh();
        } else {
            hotkey_handle_escape();
        }
    }
}
function military_map_click(legion_formation_id: number, tile: map_tile) {
    if (!tile.grid_offset) {
        return;
    }
    let m: formation = formation_get(legion_formation_id);
    if (m.in_distant_battle || m.cursed_by_mars) {
        return;
    }
    let other_formation_id: number = formation_legion_at_building(tile.grid_offset);
    if (other_formation_id && other_formation_id == legion_formation_id) {
        formation_legion_return_home(m);
    } else {
        formation_legion_move_to(m, tile.x, tile.y);
        sound_speech_play_file("wavs/cohort5.wav");
    }
    window_city_show();
}
export function widget_city_handle_input_military(m: mouse, h: hotkeys, legion_formation_id: number) {
    let tile: map_tile = data.current_tile;
    update_city_view_coords(m.x, m.y, tile);
    if (!city_view_is_sidebar_collapsed() && widget_minimap_handle_mouse(m)) {
        return;
    }
    if (m.is_touch) {
        let t: touch = touch_get_earliest();
        if (!t.in_use) {
            return;
        }
        if (touch_was_click(t) && handle_play_pause_button(t)) {
            return;
        }
        if (t.has_started) {
            data.capture_input = 1;
        }
        handle_touch_scroll(t);
        if (t.has_ended) {
            data.capture_input = 0;
        }
    }
    scroll_map(m);
    if (m.right.went_up || h.escape_pressed) {
        data.capture_input = 0;
        city_warning_clear_all();
        window_city_show();
    } else {
        update_city_view_coords(m.x, m.y, tile);
        if ((!m.is_touch && m.left.went_down)
            || (m.is_touch && m.left.went_up && touch_was_click(touch_get_earliest()))) {
            military_map_click(legion_formation_id, tile);
        }
    }
}
export function widget_city_current_grid_offset() {
    return data.current_tile.grid_offset;
}
export function widget_city_get_tooltip(c: tooltip_context) {
    if (setting_tooltips() == TOOLTIPS_NONE) {
        return;
    }
    if (!window_is(WINDOW_CITY)) {
        return;
    }
    if (data.current_tile.grid_offset == 0) {
        return;
    }
    let grid_offset: number = data.current_tile.grid_offset;
    let building_id: number = map_building_at(grid_offset);
    let overlay: number = game_state_overlay();
    if (overlay == OVERLAY_NONE && building_id && building_get(building_id).type == BUILDING_SENATE) {
        c.type = TOOLTIP_SENATE;
        c.high_priority = 1;
        return;
    }
    if (overlay != OVERLAY_NONE) {
        c.text_group = 66;
        c.text_id = city_with_overlay_get_tooltip_text(c, grid_offset);
        if (c.text_id) {
            c.type = TOOLTIP_OVERLAY;
            c.high_priority = 1;
        }
    }
}
export function widget_city_clear_current_tile() {
    data.selected_tile.x = -1;
    data.selected_tile.y = -1;
    data.selected_tile.grid_offset = 0;
    data.current_tile.grid_offset = 0;
}
