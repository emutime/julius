
import { map_point } from 'map/point';
import { map_tile } from 'map/point';
import { tool_type } from 'editor/tool';
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
import TOOL_HERD_POINT = tool_type.TOOL_HERD_POINT;;
import { buffer } from 'core/buffer';
import { routed_building_type } from 'map/routing';
import { building_construction_place_road } from 'building/construction_routed';
import { language_type } from 'core/locale';
import { encoding_type } from 'core/encoding';
import { group_terrain } from 'core/image_group';
import GROUP_TERRAIN_ACCESS_RAMP = group_terrain.GROUP_TERRAIN_ACCESS_RAMP;
import { color_t } from 'graphics/color';
import { image } from 'core/image';
import { image_group } from 'core/image';
import { group_editor } from 'core/image_group_editor';
import GROUP_EDITOR_BUILDING_CROPS = group_editor.GROUP_EDITOR_BUILDING_CROPS;
import GROUP_EDITOR_BUILDING_NATIVE = group_editor.GROUP_EDITOR_BUILDING_NATIVE;
import { random_byte } from 'core/random';
import { editor_tool_can_place_flag } from 'editor/tool_restriction';
import { editor_tool_can_place_access_ramp } from 'editor/tool_restriction';
import { editor_tool_can_place_building } from 'editor/tool_restriction';
import { building_type } from 'building/type';
import BUILDING_ROAD = building_type.BUILDING_ROAD;
import BUILDING_NATIVE_HUT = building_type.BUILDING_NATIVE_HUT;
import BUILDING_NATIVE_MEETING = building_type.BUILDING_NATIVE_MEETING;
import BUILDING_NATIVE_CROPS = building_type.BUILDING_NATIVE_CROPS;
import { building_type } from 'building/type';
import { building } from 'building/building';
import { building_create } from 'building/building';
import { game_undo_restore_map } from 'game/undo';
import { game_undo_start_build } from 'game/undo';
import { map_building_tiles_add } from 'map/building_tiles';
import { map_building_tiles_remove } from 'map/building_tiles';
import { map_elevation_at } from 'map/elevation';
import { map_elevation_set } from 'map/elevation';
import { map_elevation_remove_cliffs } from 'map/elevation';
import { GRID } from 'map/grid';
import GRID_SIZE = GRID.GRID_SIZE;
import { map_grid_delta } from 'map/grid';
import { map_grid_is_inside } from 'map/grid';
import { terrain_image } from 'map/image_context';
import { map_image_context_reset_water } from 'map/image_context';
import { map_image_context_reset_elevation } from 'map/image_context';
import { map_property_set_multi_tile_xy } from 'map/property';
import { map_property_set_multi_tile_size } from 'map/property';
import { map_routing_update_land } from 'map/routing_terrain';
import { map_tiles_update_all_rocks } from 'map/tiles';
import { map_tiles_update_region_trees } from 'map/tiles';
import { map_tiles_update_region_shrub } from 'map/tiles';
import { map_tiles_update_all_empty_land } from 'map/tiles';
import { map_tiles_update_region_empty_land } from 'map/tiles';
import { map_tiles_update_all_meadow } from 'map/tiles';
import { map_tiles_update_region_meadow } from 'map/tiles';
import { map_tiles_update_region_water } from 'map/tiles';
import { map_tiles_update_all_elevation_editor } from 'map/tiles';
import { terrain } from 'map/terrain';
import TERRAIN_TREE = terrain.TERRAIN_TREE;
import TERRAIN_ROCK = terrain.TERRAIN_ROCK;
import TERRAIN_WATER = terrain.TERRAIN_WATER;
import TERRAIN_BUILDING = terrain.TERRAIN_BUILDING;
import TERRAIN_SHRUB = terrain.TERRAIN_SHRUB;
import TERRAIN_GARDEN = terrain.TERRAIN_GARDEN;
import TERRAIN_ROAD = terrain.TERRAIN_ROAD;
import TERRAIN_AQUEDUCT = terrain.TERRAIN_AQUEDUCT;
import TERRAIN_ELEVATION = terrain.TERRAIN_ELEVATION;
import TERRAIN_ACCESS_RAMP = terrain.TERRAIN_ACCESS_RAMP;
import TERRAIN_MEADOW = terrain.TERRAIN_MEADOW;
import TERRAIN_WALL = terrain.TERRAIN_WALL;
import TERRAIN_GATEHOUSE = terrain.TERRAIN_GATEHOUSE;
import { map_terrain_get } from 'map/terrain';
import { map_terrain_set } from 'map/terrain';
import { scenario_editor_earthquake_severity } from 'scenario/editor_events';
import { scenario_editor_set_entry_point } from 'scenario/editor_map';
import { scenario_editor_set_exit_point } from 'scenario/editor_map';
import { scenario_editor_set_river_entry_point } from 'scenario/editor_map';
import { scenario_editor_set_river_exit_point } from 'scenario/editor_map';
import { scenario_editor_set_herd_point } from 'scenario/editor_map';
import { scenario_editor_set_fishing_point } from 'scenario/editor_map';
import { scenario_editor_set_invasion_point } from 'scenario/editor_map';
import { scenario_editor_set_earthquake_point } from 'scenario/editor_map';
import { scenario_editor_updated_terrain } from 'scenario/editor_map';
import { warning_type } from 'city/warning';
import WARNING_EDITOR_CANNOT_PLACE = warning_type.WARNING_EDITOR_CANNOT_PLACE;
import WARNING_EDITOR_NO_EARTHQUAKE_SCHEDULED = warning_type.WARNING_EDITOR_NO_EARTHQUAKE_SCHEDULED;
import { warning_type } from 'city/warning';
import { city_warning_show } from 'city/warning';
import { time_millis } from 'core/time';
import { touch_coords } from 'input/touch';
import { touch_mode } from 'input/touch';
import { touch } from 'input/touch';
import { mouse_button } from 'input/mouse';
import { scroll_state } from 'input/mouse';
import { mouse } from 'input/mouse';
import { widget_minimap_invalidate } from 'widget/minimap';
export class unnamed26_8 {
    public active: number = 0;
    public type: tool_type = null;
    public id: number = 0;
    public brush_size: number = 0;
    public build_in_progress: number = 0;
    public start_elevation: number = 0;
    public start_tile: map_tile = null;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.active = args[0]);
        args.length >= 2 && (this.type = args[1]);
        args.length >= 3 && (this.id = args[2]);
        args.length >= 4 && (this.brush_size = args[3]);
        args.length >= 5 && (this.build_in_progress = args[4]);
        args.length >= 6 && (this.start_elevation = args[5]);
        args.length >= 7 && (this.start_tile = args[6]);
    }
}
let data: unnamed26_8 = new unnamed26_8(0, TOOL_GRASS, 0, 3, 0);
export function editor_tool_type() {
    return data.type;
}
export function editor_tool_is_active() {
    return data.active;
}
export function editor_tool_deactivate() {
    if (editor_tool_is_updatable() && data.build_in_progress) {
        game_undo_restore_map(1);
        data.build_in_progress = 0;
    } else {
        data.active = 0;
    }
}
export function editor_tool_set_type(type: tool_type) {
    editor_tool_set_with_id(type, 0);
}
export function editor_tool_set_with_id(type: tool_type, id: number) {
    data.active = 1;
    data.type = type;
    data.id = id;
}
export function editor_tool_brush_size() {
    return data.brush_size;
}
export function editor_tool_set_brush_size(size: number) {
    data.brush_size = size;
}
export function editor_tool_foreach_brush_tile(callback: void (, user_data: void) {
    if (data.type == TOOL_RAISE_LAND || data.type == TOOL_LOWER_LAND) {
        for (let dy: number = -1; dy <= 1; dy++) {
            for (let dx: number = -1; dx <= 1; dx++) {
                callback(user_data, dx, dy);
            }
        }
    } else {
        for (let dy: number = -data.brush_size + 1; dy < data.brush_size; dy++) {
            for (let dx: number = -data.brush_size + 1; dx < data.brush_size; dx++) {
                let steps: number = (dx < 0 ? -dx : dx) + (dy < 0 ? -dy : dy);
                if (steps < data.brush_size) {
                    callback(user_data, dx, dy);
                }
            }
        }
    }
}
export function editor_tool_is_updatable() {
    return data.type == TOOL_ROAD;
}
export function editor_tool_is_in_use() {
    return data.build_in_progress;
}
export function editor_tool_start_use(tile: map_tile) {
    if (!data.active) {
        return;
    }
    data.build_in_progress = 1;
    data.start_elevation = map_elevation_at(tile.grid_offset);
    data.start_tile = * tile;
    if (data.type == TOOL_ROAD) {
        game_undo_start_build(BUILDING_ROAD);
        map_routing_update_land();
    }
}
export function editor_tool_is_brush() {
    switch (data.type) {
        case TOOL_GRASS:
        case TOOL_TREES:
        case TOOL_WATER:
        case TOOL_SHRUB:
        case TOOL_ROCKS:
        case TOOL_MEADOW:
        case TOOL_RAISE_LAND:
        case TOOL_LOWER_LAND:
            return 1;
        default:
            return 0
    }
}
function raise_land_tile(x: number, y: number, grid_offset: number, terrain: number) {
    let elevation: number = map_elevation_at(grid_offset);
    if (elevation < 5 && elevation == data.start_elevation) {
        if (!(terrain & (TERRAIN_ACCESS_RAMP | TERRAIN_ELEVATION))) {
            map_property_set_multi_tile_size(grid_offset, 1);
            map_elevation_set(grid_offset, elevation + 1);
            terrain &= ~(TERRAIN_WATER | TERRAIN_BUILDING | TERRAIN_GARDEN | TERRAIN_ROAD)
        }
    }
    return terrain;
}
function lower_land_tile(x: number, y: number, grid_offset: number, terrain: number) {
    if (terrain & TERRAIN_ACCESS_RAMP) {
        terrain |= TERRAIN_ELEVATION
        terrain &= ~(TERRAIN_ACCESS_RAMP)
        map_property_set_multi_tile_size(grid_offset, 1);
        map_property_set_multi_tile_xy(grid_offset, 0, 0, 1);
    }
    let elevation: number = map_elevation_at(grid_offset);
    if (elevation <= 0) {
        terrain &= ~(TERRAIN_ELEVATION)
    } else if (elevation == data.start_elevation) {
        terrain &= ~(TERRAIN_ELEVATION | TERRAIN_ACCESS_RAMP)
        map_elevation_set(grid_offset, elevation - 1);
    }
    return terrain;
}
function add_terrain(tile_data: void, dx: number, dy: number) {
    let tile: map_tile = (const map_tile *) tile_data;
    let x: number = tile.x + dx;
    let y: number = tile.y + dy;
    if (!map_grid_is_inside(x, y, 1)) {
        return;
    }
    let grid_offset: number = tile.grid_offset + map_grid_delta(dx, dy);
    let terrain: number = map_terrain_get(grid_offset);
    if (terrain & TERRAIN_BUILDING) {
        map_building_tiles_remove(0, x, y);
        terrain = map_terrain_get(grid_offset);
    }
    switch (data.type) {
        case TOOL_GRASS:
            terrain &= TERRAIN_PAINT_MASK
            break
        case TOOL_TREES:
            if (!(terrain & TERRAIN_TREE)) {
                terrain &= TERRAIN_PAINT_MASK
                terrain |= TERRAIN_TREE
            }
            break
        case TOOL_ROCKS:
            if (!(terrain & TERRAIN_ROCK)) {
                terrain &= TERRAIN_PAINT_MASK
                terrain |= TERRAIN_ROCK
            }
            break
        case TOOL_WATER:
            if (!map_elevation_at(grid_offset) && !(terrain & TERRAIN_WATER)) {
                terrain &= TERRAIN_PAINT_MASK
                terrain |= TERRAIN_WATER
            }
            break
        case TOOL_SHRUB:
            if (!(terrain & TERRAIN_SHRUB)) {
                terrain &= TERRAIN_PAINT_MASK
                terrain |= TERRAIN_SHRUB
            }
            break
        case TOOL_MEADOW:
            if (!(terrain & TERRAIN_MEADOW)) {
                terrain &= TERRAIN_PAINT_MASK
                terrain |= TERRAIN_MEADOW
            }
            break
        case TOOL_RAISE_LAND:
            terrain = raise_land_tile(x, y, grid_offset, terrain);
            break
        case TOOL_LOWER_LAND:
            terrain = lower_land_tile(x, y, grid_offset, terrain);
            break
        default:
            break
    }
    map_terrain_set(grid_offset, terrain);
}
export function editor_tool_update_use(tile: map_tile) {
    if (!data.build_in_progress) {
        return;
    }
    if (data.type == TOOL_ROAD) {
        building_construction_place_road(1, data.start_tile.x, data.start_tile.y, tile.x, tile.y);
        return;
    }
    if (!editor_tool_is_brush()) {
        return;
    }
    editor_tool_foreach_brush_tile(add_terrain, tile);
    let x_min: number = tile.x - data.brush_size;
    let x_max: number = tile.x + data.brush_size;
    let y_min: number = tile.y - data.brush_size;
    let y_max: number = tile.y + data.brush_size;
    switch (data.type) {
        case TOOL_GRASS:
            map_image_context_reset_water();
            map_tiles_update_region_water(x_min, y_min, x_max, y_max);
            map_tiles_update_all_rocks();
            map_tiles_update_region_empty_land(x_min, y_min, x_max, y_max);
            map_tiles_update_region_meadow(x_min, y_min, x_max, y_max);
            break
        case TOOL_TREES:
            map_image_context_reset_water();
            map_tiles_update_region_water(x_min, y_min, x_max, y_max);
            map_tiles_update_all_rocks();
            map_tiles_update_region_trees(x_min, y_min, x_max, y_max);
            break
        case TOOL_WATER:
        case TOOL_ROCKS:
            map_image_context_reset_water();
            map_tiles_update_all_rocks();
            map_tiles_update_region_water(x_min, y_min, x_max, y_max);
            break
        case TOOL_SHRUB:
            map_image_context_reset_water();
            map_tiles_update_region_water(x_min, y_min, x_max, y_max);
            map_tiles_update_all_rocks();
            map_tiles_update_region_shrub(x_min, y_min, x_max, y_max);
            break
        case TOOL_MEADOW:
            map_image_context_reset_water();
            map_tiles_update_region_water(x_min, y_min, x_max, y_max);
            map_tiles_update_all_rocks();
            map_tiles_update_region_meadow(x_min, y_min, x_max, y_max);
            break
        case TOOL_RAISE_LAND:
        case TOOL_LOWER_LAND:
            map_image_context_reset_water();
            map_image_context_reset_elevation();
            map_tiles_update_all_elevation_editor();
            map_tiles_update_region_water(x_min, y_min, x_max, y_max);
            map_tiles_update_region_trees(x_min, y_min, x_max, y_max);
            map_tiles_update_region_shrub(x_min, y_min, x_max, y_max);
            map_tiles_update_all_rocks();
            map_tiles_update_region_empty_land(x_min, y_min, x_max, y_max);
            map_tiles_update_region_meadow(x_min, y_min, x_max, y_max);
            break
        default:
            break
    }
    scenario_editor_updated_terrain();
    widget_minimap_invalidate();
}
function place_earthquake_flag(tile: map_tile) {
    let warning: number = 0;
    if (editor_tool_can_place_flag(data.type, tile, warning)) {
        if (scenario_editor_earthquake_severity()) {
            scenario_editor_set_earthquake_point(tile.x, tile.y);
        } else {
            city_warning_show(WARNING_EDITOR_NO_EARTHQUAKE_SCHEDULED);
        }
    } else {
        city_warning_show(warning);
    }
}
function place_flag(tile: map_tile, update: void () {
    let warning: number = 0;
    if (editor_tool_can_place_flag(data.type, tile, warning)) {
        update(tile.x, tile.y);
    } else {
        city_warning_show(warning);
    }
}
function place_flag_with_id(tile: map_tile, update: void () {
    let warning: number = 0;
    if (editor_tool_can_place_flag(data.type, tile, warning)) {
        update(data.id, tile.x, tile.y);
    } else {
        city_warning_show(warning);
    }
}
function place_building(tile: map_tile) {
    let image_id: number;
    let size: number;
    let type: building_type;
    switch (data.type) {
        case TOOL_NATIVE_HUT:
            type = BUILDING_NATIVE_HUT;
            image_id = image_group(GROUP_EDITOR_BUILDING_NATIVE) + (random_byte() & 1);
            size = 1;
            break
        case TOOL_NATIVE_CENTER:
            type = BUILDING_NATIVE_MEETING;
            image_id = image_group(GROUP_EDITOR_BUILDING_NATIVE) + 2;
            size = 2;
            break
        case TOOL_NATIVE_FIELD:
            type = BUILDING_NATIVE_CROPS;
            image_id = image_group(GROUP_EDITOR_BUILDING_CROPS);
            size = 1;
            break
        default:
            return
    }
    if (editor_tool_can_place_building(tile, size * size, 0)) {
        let b: building = building_create(type, tile.x, tile.y);
        map_building_tiles_add(b.id, tile.x, tile.y, size, image_id, TERRAIN_BUILDING);
        scenario_editor_updated_terrain();
    } else {
        city_warning_show(WARNING_EDITOR_CANNOT_PLACE);
    }
}
function update_terrain_after_elevation_changes() {
    map_elevation_remove_cliffs();
    map_image_context_reset_water();
    map_image_context_reset_elevation();
    map_tiles_update_all_elevation_editor();
    map_tiles_update_all_rocks();
    map_tiles_update_all_empty_land();
    map_tiles_update_all_meadow();
    scenario_editor_updated_terrain();
}
function place_access_ramp(tile: map_tile) {
    let orientation: number = 0;
    if (editor_tool_can_place_access_ramp(tile, orientation)) {
        let terrain_mask: number = ~(TERRAIN_ROCK | TERRAIN_WATER | TERRAIN_BUILDING | TERRAIN_GARDEN | TERRAIN_AQUEDUCT);
        for (let dy: number = 0; dy < 2; dy++) {
            for (let dx: number = 0; dx < 2; dx++) {
                let grid_offset: number = tile.grid_offset + map_grid_delta(dx, dy);
                map_terrain_set(grid_offset, map_terrain_get(grid_offset) & terrain_mask);
            }
        }
        map_building_tiles_add(0, tile.x, tile.y, 2,
            image_group(GROUP_TERRAIN_ACCESS_RAMP) + orientation, TERRAIN_ACCESS_RAMP);
        update_terrain_after_elevation_changes();
        scenario_editor_updated_terrain();
    } else {
        city_warning_show(WARNING_EDITOR_CANNOT_PLACE);
    }
}
function place_road(start_tile: map_tile, end_tile: map_tile) {
    if (building_construction_place_road(0, start_tile.x, start_tile.y, end_tile.x, end_tile.y)) {
        scenario_editor_updated_terrain();
    }
}
export function editor_tool_end_use(tile: map_tile) {
    if (!data.build_in_progress) {
        return;
    }
    data.build_in_progress = 0;
    if (!tile.grid_offset) {
        return;
    }
    switch (data.type) {
        case TOOL_EARTHQUAKE_POINT:
            place_earthquake_flag(tile);
            break
        case TOOL_ENTRY_POINT:
            place_flag(tile, scenario_editor_set_entry_point);
            break
        case TOOL_EXIT_POINT:
            place_flag(tile, scenario_editor_set_exit_point);
            break
        case TOOL_RIVER_ENTRY_POINT:
            place_flag(tile, scenario_editor_set_river_entry_point);
            break
        case TOOL_RIVER_EXIT_POINT:
            place_flag(tile, scenario_editor_set_river_exit_point);
            break
        case TOOL_INVASION_POINT:
            place_flag_with_id(tile, scenario_editor_set_invasion_point);
            break
        case TOOL_FISHING_POINT:
            place_flag_with_id(tile, scenario_editor_set_fishing_point);
            break
        case TOOL_HERD_POINT:
            place_flag_with_id(tile, scenario_editor_set_herd_point);
            break
        case TOOL_NATIVE_CENTER:
        case TOOL_NATIVE_FIELD:
        case TOOL_NATIVE_HUT:
            place_building(tile);
            break
        case TOOL_RAISE_LAND:
        case TOOL_LOWER_LAND:
            update_terrain_after_elevation_changes();
            break
        case TOOL_ACCESS_RAMP:
            place_access_ramp(tile);
            break
        case TOOL_ROAD:
            place_road(data.start_tile, tile);
            break
        default:
            break
    }
}
