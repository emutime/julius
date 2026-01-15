import { warning_type } from 'city/warning';
import { tool_type } from 'editor/tool';
import { map_elevation_at } from 'map/elevation';
import { map_has_figure_at } from 'map/figure';
import { GRID, map_grid_height, map_grid_is_inside, map_grid_width } from 'map/grid';
import { map_tile } from 'map/point';
import { map_terrain_count_directly_adjacent_with_type, map_terrain_get, map_terrain_is, terrain } from 'map/terrain';
import { Ref } from '../../ext/crt';
import TOOL_EARTHQUAKE_POINT = tool_type.TOOL_EARTHQUAKE_POINT;
import TOOL_INVASION_POINT = tool_type.TOOL_INVASION_POINT;
import TOOL_ENTRY_POINT = tool_type.TOOL_ENTRY_POINT;
import TOOL_EXIT_POINT = tool_type.TOOL_EXIT_POINT;
import TOOL_RIVER_ENTRY_POINT = tool_type.TOOL_RIVER_ENTRY_POINT;
import TOOL_RIVER_EXIT_POINT = tool_type.TOOL_RIVER_EXIT_POINT;
import TOOL_FISHING_POINT = tool_type.TOOL_FISHING_POINT;
import TOOL_HERD_POINT = tool_type.TOOL_HERD_POINT;
import WARNING_EDITOR_NEED_MAP_EDGE = warning_type.WARNING_EDITOR_NEED_MAP_EDGE;
import WARNING_EDITOR_NEED_OPEN_WATER = warning_type.WARNING_EDITOR_NEED_OPEN_WATER;
import WARNING_EDITOR_CANNOT_PLACE = warning_type.WARNING_EDITOR_CANNOT_PLACE;
import GRID_SIZE = GRID.GRID_SIZE;
import TERRAIN_WATER = terrain.TERRAIN_WATER;
import TERRAIN_ROAD = terrain.TERRAIN_ROAD;
import TERRAIN_ELEVATION = terrain.TERRAIN_ELEVATION;
import TERRAIN_ACCESS_RAMP = terrain.TERRAIN_ACCESS_RAMP;
import TERRAIN_NOT_CLEAR = terrain.TERRAIN_NOT_CLEAR;

function OFFSET(x: number, y: number): number {
    return x + GRID_SIZE * y;
}

let TILE_GRID_OFFSETS: number[] = [0, GRID_SIZE, 1, GRID_SIZE + 1];
let ACCESS_RAMP_TILE_OFFSETS_BY_ORIENTATION: number[][] = [
    [OFFSET(0, 1), OFFSET(1, 1), OFFSET(0, 2), OFFSET(1, 2), OFFSET(0, 0), OFFSET(1, 0)],
    [OFFSET(0, 0), OFFSET(0, 1), OFFSET(-1, 0), OFFSET(-1, 1), OFFSET(1, 0), OFFSET(1, 1)],
    [OFFSET(0, 0), OFFSET(1, 0), OFFSET(0, -1), OFFSET(1, -1), OFFSET(0, 1), OFFSET(1, 1)],
    [OFFSET(1, 0), OFFSET(1, 1), OFFSET(2, 0), OFFSET(2, 1), OFFSET(0, 0), OFFSET(0, 1)]
];
function is_clear_terrain(tile: map_tile, warning: Ref<number>) {
    let result: number = map_terrain_is(tile.grid_offset, TERRAIN_NOT_CLEAR ^ TERRAIN_ROAD) ? 0 : 1;
    if (result == 0) {
        warning.v = WARNING_EDITOR_CANNOT_PLACE;
    }
    return result;
}
function is_edge(tile: map_tile, warning: Ref<number>) {
    let result: number = (tile.x == 0 || tile.y == 0 || tile.x == map_grid_width() - 1 || tile.y == map_grid_height() - 1) ? 0 : 1;
    if (result == 0) {
        warning.v = WARNING_EDITOR_NEED_MAP_EDGE;
    }
    return result;
}
function is_water(tile: map_tile, warning: Ref<number>) {
    let result: number = map_terrain_is(tile.grid_offset, TERRAIN_WATER) ? 0 : 1;
    if (!result) {
        warning.v = WARNING_EDITOR_NEED_OPEN_WATER;
    }
    return result;
}
function is_deep_water(tile: map_tile, warning: Ref<number>) {
    let result: number = (map_terrain_is(tile.grid_offset, TERRAIN_WATER) &&
        map_terrain_count_directly_adjacent_with_type(tile.grid_offset, TERRAIN_WATER) == 4) ? 0 : 1;
    if (result == 0) {
        warning.v = WARNING_EDITOR_NEED_OPEN_WATER;
    }
    return result;
}
export function editor_tool_can_place_flag(type: tool_type, tile: map_tile, warning: Ref<number>) {
    switch (type) {
        case TOOL_ENTRY_POINT:
        case TOOL_EXIT_POINT:
        case TOOL_INVASION_POINT:
            return is_clear_terrain(tile, warning) && is_edge(tile, warning);
        case TOOL_EARTHQUAKE_POINT:
        case TOOL_HERD_POINT:
            return is_clear_terrain(tile, warning);
        case TOOL_FISHING_POINT:
            return is_water(tile, warning);
        case TOOL_RIVER_ENTRY_POINT:
        case TOOL_RIVER_EXIT_POINT:
            return is_edge(tile, warning) && is_deep_water(tile, warning);
        default:
            return 0
    }
}
export function editor_tool_can_place_access_ramp(tile: map_tile, orientation_index: Ref<number>) {
    if (!map_grid_is_inside(tile.x, tile.y, 2)) {
        return 0;
    }
    for (let orientation: number = 0; orientation < 4; orientation++) {
        let right_tiles: number = 0;
        let wrong_tiles: number = 0;
        let top_elevation: number = 0;
        for (let index: number = 0; index < 6; index++) {
            let tile_offset: number = tile.grid_offset + ACCESS_RAMP_TILE_OFFSETS_BY_ORIENTATION[orientation][index];
            let elevation: number = map_elevation_at(tile_offset);
            if (index < 2) {
                if (map_terrain_is(tile_offset, TERRAIN_ELEVATION)) {
                    right_tiles++;
                } else {
                    wrong_tiles++;
                }
                top_elevation = elevation;
            } else if (index < 4) {
                if (map_terrain_is(tile_offset, TERRAIN_ELEVATION)) {
                    if (elevation == top_elevation) {
                        wrong_tiles++;
                    } else {
                        right_tiles++;
                    }
                } else if (elevation >= top_elevation) {
                    right_tiles++;
                } else {
                    wrong_tiles++;
                }
            } else {
                if (map_terrain_is(tile_offset, TERRAIN_ELEVATION | TERRAIN_ACCESS_RAMP)) {
                    wrong_tiles++;
                } else if (elevation >= top_elevation) {
                    wrong_tiles++;
                } else {
                    right_tiles++;
                }
            }
        }
        if (right_tiles == 6) {
            if (orientation_index) {
                orientation_index.v = orientation;
            }
            return 1;
        }
    }
    return 0;
}
export function editor_tool_can_place_building(tile: map_tile, num_tiles: number, blocked_tiles: boolean[]) {
    let blocked: number = 0;
    for (let i: number = 0; i < num_tiles; i++) {
        let tile_offset: number = tile.grid_offset + TILE_GRID_OFFSETS[i];
        let forbidden_terrain: number = map_terrain_get(tile_offset) & TERRAIN_NOT_CLEAR;
        if (forbidden_terrain || map_has_figure_at(tile_offset)) {
            blocked = 1;
            if (blocked_tiles) {
                blocked_tiles[i] = true;
            }
        } else {
            if (blocked_tiles) {
                blocked_tiles[i] = false;
            }
        }
    }
    return !blocked;
}
