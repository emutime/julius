import { building_properties, building_properties_for_type } from 'building/properties';
import { building_type } from 'building/type';
import { city_view_get_selected_tile_pixels, view_tile } from 'city/view';
import { image_group } from 'core/image';
import { group_terrain } from 'core/image_group';
import { group_editor } from 'core/image_group_editor';
import { editor_tool_foreach_brush_tile, editor_tool_is_active, editor_tool_is_in_use, editor_tool_type, tool_type } from 'editor/tool';
import { editor_tool_can_place_access_ramp, editor_tool_can_place_building, editor_tool_can_place_flag } from 'editor/tool_restriction';
import { ALPHA_MASK_SEMI_TRANSPARENT, COLOR_MASK_GREEN, COLOR_MASK_RED, color_t } from 'graphics/color';
import { image_draw_blend, image_draw_blend_alpha, image_draw_isometric_footprint, image_draw_isometric_top } from 'graphics/image';
import { scroll_in_progress } from 'input/scroll';
import { map_tile } from 'map/point';
import { map_terrain_has_adjacent_x_with_type, map_terrain_has_adjacent_y_with_type, map_terrain_is, terrain } from 'map/terrain';
import { scenario_climate, scenario_property_climate } from 'scenario/property';
import { Ref } from '../../ext/crt';
import BUILDING_NATIVE_HUT = building_type.BUILDING_NATIVE_HUT;
import BUILDING_NATIVE_MEETING = building_type.BUILDING_NATIVE_MEETING;
import BUILDING_NATIVE_CROPS = building_type.BUILDING_NATIVE_CROPS;
import GROUP_EDITOR_BUILDING_CROPS = group_editor.GROUP_EDITOR_BUILDING_CROPS;
import TOOL_GRASS = tool_type.TOOL_GRASS;
import TOOL_TREES = tool_type.TOOL_TREES;
import TOOL_WATER = tool_type.TOOL_WATER;
import TOOL_EARTHQUAKE_POINT = tool_type.TOOL_EARTHQUAKE_POINT;
import TOOL_SHRUB = tool_type.TOOL_SHRUB;
import TOOL_ROCKS = tool_type.TOOL_ROCKS;
import TOOL_MEADOW = tool_type.TOOL_MEADOW;
import TOOL_ACCESS_RAMP = tool_type.TOOL_ACCESS_RAMP;
import TOOL_ROAD = tool_type.TOOL_ROAD;
import TOOL_RAISE_LAND = tool_type.TOOL_RAISE_LAND;
import TOOL_LOWER_LAND = tool_type.TOOL_LOWER_LAND;
import TOOL_INVASION_POINT = tool_type.TOOL_INVASION_POINT;
import TOOL_ENTRY_POINT = tool_type.TOOL_ENTRY_POINT;
import TOOL_EXIT_POINT = tool_type.TOOL_EXIT_POINT;
import TOOL_RIVER_ENTRY_POINT = tool_type.TOOL_RIVER_ENTRY_POINT;
import TOOL_RIVER_EXIT_POINT = tool_type.TOOL_RIVER_EXIT_POINT;
import TOOL_NATIVE_HUT = tool_type.TOOL_NATIVE_HUT;
import TOOL_NATIVE_CENTER = tool_type.TOOL_NATIVE_CENTER;
import TOOL_NATIVE_FIELD = tool_type.TOOL_NATIVE_FIELD;
import TOOL_FISHING_POINT = tool_type.TOOL_FISHING_POINT;
import TOOL_HERD_POINT = tool_type.TOOL_HERD_POINT;
import GROUP_TERRAIN_OVERLAY = group_terrain.GROUP_TERRAIN_OVERLAY;
import GROUP_TERRAIN_FLAT_TILE = group_terrain.GROUP_TERRAIN_FLAT_TILE;
import GROUP_TERRAIN_ROAD = group_terrain.GROUP_TERRAIN_ROAD;
import GROUP_TERRAIN_ACCESS_RAMP = group_terrain.GROUP_TERRAIN_ACCESS_RAMP;
import TERRAIN_ROAD = terrain.TERRAIN_ROAD;
import TERRAIN_WALL = terrain.TERRAIN_WALL;
import TERRAIN_GATEHOUSE = terrain.TERRAIN_GATEHOUSE;
import TERRAIN_NOT_CLEAR = terrain.TERRAIN_NOT_CLEAR;
import CLIMATE_DESERT = scenario_climate.CLIMATE_DESERT;
let X_VIEW_OFFSETS: number[] = [0, - 30, 30, 0];
let Y_VIEW_OFFSETS: number[] = [0, 15, 15, 30];
function offset_to_view_offset(dx: number, dy: number, view_dx: Ref<number>, view_dy: Ref<number>) {
    view_dx.v = (dx - dy) * 30;
    view_dy.v = (dx + dy) * 15;
}
function draw_flat_tile(x: number, y: number, color_mask: color_t) {
    if (color_mask == COLOR_MASK_GREEN && scenario_property_climate() != CLIMATE_DESERT) {
        image_draw_blend_alpha(image_group(GROUP_TERRAIN_FLAT_TILE), x, y, ALPHA_MASK_SEMI_TRANSPARENT | color_mask);
    } else {
        image_draw_blend(image_group(GROUP_TERRAIN_FLAT_TILE), x, y, color_mask);
    }
}
function draw_partially_blocked(x: number, y: number, num_tiles: number, blocked_tiles: boolean[]) {
    for (let i: number = 0; i < num_tiles; i++) {
        let x_offset: number = x + X_VIEW_OFFSETS[i];
        let y_offset: number = y + Y_VIEW_OFFSETS[i];
        if (blocked_tiles[i]) {
            draw_flat_tile(x_offset, y_offset, COLOR_MASK_RED);
        } else {
            draw_flat_tile(x_offset, y_offset, COLOR_MASK_GREEN);
        }
    }
}
function draw_building_image(image_id: number, x: number, y: number) {
    image_draw_isometric_footprint(image_id, x, y, COLOR_MASK_GREEN);
    image_draw_isometric_top(image_id, x, y, COLOR_MASK_GREEN);
}
function draw_building(tile: map_tile, x_view: number, y_view: number, type: building_type) {
    let props: building_properties = building_properties_for_type(type);
    let num_tiles: number = props.size * props.size;
    let blocked_tiles: number[];
    let blocked: number = !editor_tool_can_place_building(tile, num_tiles, blocked_tiles);
    if (blocked) {
        draw_partially_blocked(x_view, y_view, num_tiles, blocked_tiles);
    } else if (editor_tool_is_in_use()) {
        let image_id: number = image_group(GROUP_TERRAIN_OVERLAY);
        for (let i: number = 0; i < num_tiles; i++) {
            let x_offset: number = x_view + X_VIEW_OFFSETS[i];
            let y_offset: number = y_view + Y_VIEW_OFFSETS[i];
            image_draw_isometric_footprint(image_id, x_offset, y_offset, 0);
        }
    } else {
        let image_id: number;
        if (type == BUILDING_NATIVE_CROPS) {
            image_id = image_group(GROUP_EDITOR_BUILDING_CROPS);
        } else {
            image_id = image_group(props.image_group) + props.image_offset;
        }
        draw_building_image(image_id, x_view, y_view);
    }
}
function draw_road(tile: map_tile, x: number, y: number) {
    let grid_offset: number = tile.grid_offset;
    let blocked: number = 0;
    let image_id: number = 0;
    if (map_terrain_is(grid_offset, TERRAIN_NOT_CLEAR)) {
        blocked = 1;
    } else {
        image_id = image_group(GROUP_TERRAIN_ROAD);
        if (!map_terrain_has_adjacent_x_with_type(grid_offset, TERRAIN_ROAD) &&
            map_terrain_has_adjacent_y_with_type(grid_offset, TERRAIN_ROAD)) {
            image_id++;
        }
    }
    if (blocked) {
        draw_flat_tile(x, y, COLOR_MASK_RED);
    } else {
        draw_building_image(image_id, x, y);
    }
}
function draw_brush_tile(data: view_tile, dx: number, dy: number) {
    let view: view_tile = data;
    let view_dx: Ref<number> = new Ref<number>(0);
    let view_dy: Ref<number> = new Ref<number>(0);
    offset_to_view_offset(dx, dy, view_dx, view_dy);
    draw_flat_tile(view.x + view_dx, view.y + view_dy, COLOR_MASK_GREEN);
}
function draw_brush(tile: map_tile, x: number, y: number) {
    let vt: view_tile = { x, y };
    editor_tool_foreach_brush_tile(draw_brush_tile, vt);
}
function draw_access_ramp(tile: map_tile, x: number, y: number) {
    let orientation: number;
    if (editor_tool_can_place_access_ramp(tile, orientation)) {
        let image_id: number = image_group(GROUP_TERRAIN_ACCESS_RAMP) + orientation;
        draw_building_image(image_id, x, y);
    } else {
        let blocked: boolean[] = [true, true, true, true];
        draw_partially_blocked(x, y, 4, blocked);
    }
}
function draw_map_flag(x: number, y: number, is_ok: number) {
    draw_flat_tile(x, y, is_ok ? COLOR_MASK_GREEN : COLOR_MASK_RED);
}
export function map_editor_tool_draw(tile: map_tile) {
    if (!tile.grid_offset || scroll_in_progress() || !editor_tool_is_active()) {
        return;
    }
    let type: tool_type = editor_tool_type();
    let x: number
    let y: number;
    city_view_get_selected_tile_pixels(x, y);
    switch (type) {
        case TOOL_NATIVE_CENTER:
            draw_building(tile, x, y, BUILDING_NATIVE_MEETING);
            break
        case TOOL_NATIVE_HUT:
            draw_building(tile, x, y, BUILDING_NATIVE_HUT);
            break
        case TOOL_NATIVE_FIELD:
            draw_building(tile, x, y, BUILDING_NATIVE_CROPS);
            break
        case TOOL_EARTHQUAKE_POINT:
        case TOOL_ENTRY_POINT:
        case TOOL_EXIT_POINT:
        case TOOL_RIVER_ENTRY_POINT:
        case TOOL_RIVER_EXIT_POINT:
        case TOOL_INVASION_POINT:
        case TOOL_FISHING_POINT:
        case TOOL_HERD_POINT:
            draw_map_flag(x, y, editor_tool_can_place_flag(type, tile, null));
            break
        case TOOL_ACCESS_RAMP:
            draw_access_ramp(tile, x, y);
            break
        case TOOL_GRASS:
        case TOOL_MEADOW:
        case TOOL_ROCKS:
        case TOOL_SHRUB:
        case TOOL_TREES:
        case TOOL_WATER:
        case TOOL_RAISE_LAND:
        case TOOL_LOWER_LAND:
            draw_brush(tile, x, y);
            break
        case TOOL_ROAD:
            draw_road(tile, x, y);
            break
    }
}
