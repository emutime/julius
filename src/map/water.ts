export const OFFSET = 0;
import { MAX_BUILDINGS } from 'building/building';
;
import { buffer } from 'core/buffer';
import { direction_type } from 'core/direction';
import DIR_0_TOP = direction_type.DIR_0_TOP;
import DIR_2_RIGHT = direction_type.DIR_2_RIGHT;
import DIR_4_BOTTOM = direction_type.DIR_4_BOTTOM;
import DIR_6_LEFT = direction_type.DIR_6_LEFT;
import DIR_8_NONE = direction_type.DIR_8_NONE;
import { direction_type } from 'core/direction';
import { figure_type } from 'figure/type';
import { figure } from 'figure/figure';
import { map_point } from 'map/point';
import { map_point_store_result } from 'map/point';
import { building_type } from 'building/type';
import BUILDING_WHARF = building_type.BUILDING_WHARF;
import { building_type } from 'building/type';
import { building_state } from 'building/type';
import BUILDING_STATE_IN_USE = building_state.BUILDING_STATE_IN_USE;
import { building } from 'building/building';
import { building_get } from 'building/building';
import { view_tile } from 'city/view';
import { map_callback } from 'city/view';
import { city_view_orientation } from 'city/view';
import { map_building_set } from 'map/building';
import { map_figure_at } from 'map/figure';
import { map_has_figure_at } from 'map/figure';
import { GRID } from 'map/grid';
import GRID_SIZE = GRID.GRID_SIZE;
import { map_grid_offset } from 'map/grid';
import { map_grid_offset_to_x } from 'map/grid';
import { map_grid_offset_to_y } from 'map/grid';
import { map_grid_direction_delta } from 'map/grid';
import { map_grid_get_area } from 'map/grid';
import { map_grid_is_inside } from 'map/grid';
import { map_grid_adjacent_offsets } from 'map/grid';
import { map_image_set } from 'map/image';
import { map_property_set_multi_tile_xy } from 'map/property';
import { map_property_set_multi_tile_size } from 'map/property';
import { map_property_clear_constructing } from 'map/property';
import { terrain } from 'map/terrain';
import TERRAIN_TREE = terrain.TERRAIN_TREE;
import TERRAIN_ROCK = terrain.TERRAIN_ROCK;
import TERRAIN_WATER = terrain.TERRAIN_WATER;
import TERRAIN_BUILDING = terrain.TERRAIN_BUILDING;
import TERRAIN_SHRUB = terrain.TERRAIN_SHRUB;
import TERRAIN_GARDEN = terrain.TERRAIN_GARDEN;
import TERRAIN_ROAD = terrain.TERRAIN_ROAD;
import TERRAIN_ELEVATION = terrain.TERRAIN_ELEVATION;
import TERRAIN_RUBBLE = terrain.TERRAIN_RUBBLE;
import TERRAIN_WALL = terrain.TERRAIN_WALL;
import TERRAIN_GATEHOUSE = terrain.TERRAIN_GATEHOUSE;
import TERRAIN_CLEARABLE = terrain.TERRAIN_CLEARABLE;
import { map_terrain_is } from 'map/terrain';
import { map_terrain_add } from 'map/terrain';
import { map_terrain_remove } from 'map/terrain';
export function map_water_add_building(building_id: number, x: number, y: number, size: number, image_id: number) {
    if (!map_grid_is_inside(x, y, size)) {
        return;
    }
    let leftmost: map_point;
    switch (city_view_orientation()) {
        case DIR_0_TOP:
            leftmost.x = 0;
            leftmost.y = size - 1;
            break
        case DIR_2_RIGHT:
            leftmost.x = leftmost.y = 0;
            break
        case DIR_4_BOTTOM:
            leftmost.x = size - 1;
            leftmost.y = 0;
            break
        case DIR_6_LEFT:
            leftmost.x = leftmost.y = size - 1;
            break
        default:
            return
    }
    for (let dy: number = 0; dy < size; dy++) {
        for (let dx: number = 0; dx < size; dx++) {
            let grid_offset: number = map_grid_offset(x + dx, y + dy);
            map_terrain_add(grid_offset, TERRAIN_BUILDING);
            if (!map_terrain_is(grid_offset, TERRAIN_WATER)) {
                map_terrain_remove(grid_offset, TERRAIN_CLEARABLE);
                map_terrain_add(grid_offset, TERRAIN_BUILDING);
            }
            map_building_set(grid_offset, building_id);
            map_property_clear_constructing(grid_offset);
            map_property_set_multi_tile_size(grid_offset, size);
            map_image_set(grid_offset, image_id);
            map_property_set_multi_tile_xy(grid_offset, dx, dy,
                dx == leftmost.x && dy == leftmost.y);
        }
    }
}
function blocked_land_terrain() {
    return
    TERRAIN_TREE | TERRAIN_ROCK | TERRAIN_WATER |
        TERRAIN_BUILDING | TERRAIN_SHRUB | TERRAIN_GARDEN |
        TERRAIN_ROAD | TERRAIN_ELEVATION | TERRAIN_RUBBLE;
}
export function map_water_determine_orientation_size2(x: number, y: number, adjust_xy: number, orientation_absolute: number, orientation_relative: number) {
    if (adjust_xy == 1) {
        switch (city_view_orientation()) {
            case DIR_0_TOP:
                break
            case DIR_2_RIGHT:
                x--;
                break
            case DIR_6_LEFT:
                y--;
                break
            case DIR_4_BOTTOM:
                x--;
                y--;
                break
        }
    }
    if (!map_grid_is_inside(x, y, 2)) {
        return 999;
    }
    let base_offset: number = map_grid_offset(x, y);
    let tile_offsets: number[] = { OFFSET(0,0), OFFSET(1,0), OFFSET(0,1), OFFSET(1,1) };
    let should_be_water: number[] = {{ 1, 1, 0, 0}, { 0, 1, 0, 1}, { 0, 0, 1, 1}, { 1, 0, 1, 0}
};
for (let dir: number = 0; dir < 4; dir++) {
    let ok_tiles: number = 0;
    let blocked_tiles: number = 0;
    for (let i: number = 0; i < 4; i++) {
        let grid_offset: number = base_offset + tile_offsets[i];
        if (should_be_water[dir][i]) {
            if (!map_terrain_is(grid_offset, TERRAIN_WATER)) {
                break
            }
            ok_tiles++;
            if (map_terrain_is(grid_offset, TERRAIN_ROCK | TERRAIN_ROAD)) {
                blocked_tiles++;
            }
        } else {
            if (map_terrain_is(grid_offset, TERRAIN_WATER)) {
                break
            }
            ok_tiles++;
            if (map_terrain_is(grid_offset, blocked_land_terrain())) {
                blocked_tiles++;
            }
        }
    }
    let tiles_to_check: number[] = {
            { OFFSET(-1, 0), OFFSET(-1, -1), OFFSET(0, -1), OFFSET(1, -1), OFFSET(2, -1), OFFSET(2, 0) },
    { OFFSET(1, -1), OFFSET(2, -1), OFFSET(2, 0), OFFSET(2, 1), OFFSET(2, 2), OFFSET(1, 2) },
    { OFFSET(2, 1), OFFSET(2, 2), OFFSET(1, 2), OFFSET(0, 2), OFFSET(-1, 2), OFFSET(-1, 1) },
    { OFFSET(0, 2), OFFSET(-1, 2), OFFSET(-1, 1), OFFSET(-1, 0), OFFSET(-1, -1), OFFSET(0, -1) },
};
for (let i: number = 0; i < 6; i++) {
    if (!map_terrain_is(base_offset + tiles_to_check[dir][i], TERRAIN_WATER)) {
        ok_tiles = 0;
    }
}
if (ok_tiles == 4) {
    if (orientation_absolute) {
                * orientation_absolute = dir;
    }
    if (orientation_relative) {
                * orientation_relative = (4 + dir - city_view_orientation() / 2) % 4;
    }
    return blocked_tiles;
}
    }
return 999;
}
export function map_water_determine_orientation_size3(x: number, y: number, adjust_xy: number, orientation_absolute: number, orientation_relative: number) {
    if (adjust_xy == 1) {
        switch (city_view_orientation()) {
            case DIR_0_TOP:
                break
            case DIR_2_RIGHT:
                x -= 2
                break
            case DIR_6_LEFT:
                y -= 2
                break
            case DIR_4_BOTTOM:
                x -= 2
                y -= 2
                break
        }
    }
    if (!map_grid_is_inside(x, y, 3)) {
        return 999;
    }
    let base_offset: number = map_grid_offset(x, y);
    let tile_offsets: number[] = {
        OFFSET(0,0), OFFSET(1,0), OFFSET(2,0),
        OFFSET(0,1), OFFSET(1,1), OFFSET(2,1),
        OFFSET(0,2), OFFSET(1,2), OFFSET(2,2)
    };
    let should_be_water: number[] = {
        { 1, 1, 1, 0, 0, 0, 0, 0, 0 },
    { 0, 0, 1, 0, 0, 1, 0, 0, 1 },
    { 0, 0, 0, 0, 0, 0, 1, 1, 1 },
    { 1, 0, 0, 1, 0, 0, 1, 0, 0 }
};
for (let dir: number = 0; dir < 4; dir++) {
    let ok_tiles: number = 0;
    let blocked_tiles: number = 0;
    for (let i: number = 0; i < 9; i++) {
        let grid_offset: number = base_offset + tile_offsets[i];
        if (should_be_water[dir][i]) {
            if (!map_terrain_is(grid_offset, TERRAIN_WATER)) {
                break
            }
            ok_tiles++;
            if (map_terrain_is(grid_offset, TERRAIN_ROCK | TERRAIN_ROAD)) {
                blocked_tiles++;
            }
        } else {
            if (map_terrain_is(grid_offset, TERRAIN_WATER)) {
                break
            }
            ok_tiles++;
            if (map_terrain_is(grid_offset, blocked_land_terrain())) {
                blocked_tiles++;
            }
        }
    }
    let tiles_to_check: number[] = {
            { OFFSET(-1, 0), OFFSET(3, 0) }, { OFFSET(2, -1), OFFSET(2, 3) },
    { OFFSET(3, 2), OFFSET(-1, 2) }, { OFFSET(0, -1), OFFSET(0, 3) }
};
for (let i: number = 0; i < 2; i++) {
    if (!map_terrain_is(base_offset + tiles_to_check[dir][i], TERRAIN_WATER)) {
        ok_tiles = 0;
    }
}
if (ok_tiles == 9) {
    if (orientation_absolute) {
                * orientation_absolute = dir;
    }
    if (orientation_relative) {
                * orientation_relative = (4 + dir - city_view_orientation() / 2) % 4;
    }
    return blocked_tiles;
}
    }
return 999;
}
export function map_water_get_wharf_for_new_fishing_boat(boat: figure, tile: map_point) {
    let wharf: building = null;
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state == BUILDING_STATE_IN_USE && b.type == BUILDING_WHARF) {
            let wharf_boat_id: number = b.data.industry.fishing_boat_id;
            if (!wharf_boat_id || wharf_boat_id == boat.id) {
                wharf = b;
                break
            }
        }
    }
    if (!wharf) {
        return 0;
    }
    let dx: number
    let dy: number;
    switch (wharf.data.industry.orientation) {
        case 0:
            dx = 1;
            dy = -1;
            break
        case 1:
            dx = 2;
            dy = 1;
            break
        case 2:
            dx = 1;
            dy = 2;
            break
        default: dx = -1
            dy = 1;
            break
    }
    map_point_store_result(wharf.x + dx, wharf.y + dy, tile);
    return wharf.id;
}
export function map_water_find_alternative_fishing_boat_tile(boat: figure, tile: map_point) {
    if (map_figure_at(boat.grid_offset) == boat.id) {
        return 0;
    }
    for (let radius: number = 1; radius <= 5; radius++) {
        let x_min: number
        let y_min: number
        let x_max: number
        let y_max: number;
        map_grid_get_area(boat.x, boat.y, 1, radius, x_min, y_min, x_max, y_max);
        for (let yy: number = y_min; yy <= y_max; yy++) {
            for (let xx: number = x_min; xx <= x_max; xx++) {
                let grid_offset: number = map_grid_offset(xx, yy);
                if (!map_has_figure_at(grid_offset) && map_terrain_is(grid_offset, TERRAIN_WATER)) {
                    map_point_store_result(xx, yy, tile);
                    return 1;
                }
            }
        }
    }
    return 0;
}
export function map_water_find_shipwreck_tile(wreck: figure, tile: map_point) {
    if (map_terrain_is(wreck.grid_offset, TERRAIN_WATER) && map_figure_at(wreck.grid_offset) == wreck.id) {
        return 0;
    }
    for (let radius: number = 1; radius <= 5; radius++) {
        let x_min: number
        let y_min: number
        let x_max: number
        let y_max: number;
        map_grid_get_area(wreck.x, wreck.y, 1, radius, x_min, y_min, x_max, y_max);
        for (let yy: number = y_min; yy <= y_max; yy++) {
            for (let xx: number = x_min; xx <= x_max; xx++) {
                let grid_offset: number = map_grid_offset(xx, yy);
                if (!map_has_figure_at(grid_offset) || map_figure_at(grid_offset) == wreck.id) {
                    if (map_terrain_is(grid_offset, TERRAIN_WATER) &&
                        map_terrain_is(map_grid_offset(xx, yy - 2), TERRAIN_WATER) &&
                        map_terrain_is(map_grid_offset(xx, yy + 2), TERRAIN_WATER) &&
                        map_terrain_is(map_grid_offset(xx - 2, yy), TERRAIN_WATER) &&
                        map_terrain_is(map_grid_offset(xx + 2, yy), TERRAIN_WATER)) {
                        map_point_store_result(xx, yy, tile);
                        return 1;
                    }
                }
            }
        }
    }
    return 0;
}
function num_surrounding_water_tiles(grid_offset: number) {
    let amount: number = 0;
    for (let i: number = 0; i < DIR_8_NONE; i++) {
        if (map_terrain_is(grid_offset + map_grid_direction_delta(i), TERRAIN_WATER)) {
            amount++;
        }
    }
    return amount;
}
export function map_water_can_spawn_fishing_boat(x: number, y: number, size: number, tile: map_point) {
    let base_offset: number = map_grid_offset(x, y);
    for (let tile_delta: number = map_grid_adjacent_offsets(size); * tile_delta; tile_delta++) {
        let grid_offset: number = base_offset + * tile_delta;
        if (map_terrain_is(grid_offset, TERRAIN_WATER)) {
            if (!map_terrain_is(grid_offset, TERRAIN_BUILDING)) {
                if (num_surrounding_water_tiles(grid_offset) >= 8) {
                    map_point_store_result(map_grid_offset_to_x(grid_offset), map_grid_offset_to_y(grid_offset), tile);
                    return 1;
                }
            }
        }
    }
    return 0;
}
