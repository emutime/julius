
import { building, building_get, building_main } from 'building/building';
import { building_is_farm } from 'building/industry';
import { building_type } from 'building/type';
import { city_view_orientation } from 'city/view';
import { direction_type } from 'core/direction';
import { image_group } from 'core/image';
import { group_terrain } from 'core/image_group';
import { map_aqueduct_set } from 'map/aqueduct';
import { map_bridge_remove } from 'map/bridge';
import { map_building_at, map_building_damage_clear, map_building_set, map_set_rubble_building_type } from 'map/building';
import { map_has_figure_at } from 'map/figure';
import { GRID, map_grid_delta, map_grid_is_inside, map_grid_offset, map_grid_offset_to_x, map_grid_offset_to_y } from 'map/grid';
import { map_image_set } from 'map/image';
import { map_property_clear_constructing, map_property_clear_multi_tile_xy, map_property_mark_constructing, map_property_mark_deleted, map_property_mark_draw_tile, map_property_multi_tile_size, map_property_multi_tile_x, map_property_multi_tile_y, map_property_set_multi_tile_size, map_property_set_multi_tile_xy } from 'map/property';
import { map_random_get } from 'map/random';
import { map_sprite_clear_tile } from 'map/sprite';
import { map_terrain_add, map_terrain_get, map_terrain_is, map_terrain_remove, map_terrain_set, terrain } from 'map/terrain';
import { map_tiles_set_water, map_tiles_update_region_empty_land, map_tiles_update_region_meadow, map_tiles_update_region_rubble } from 'map/tiles';
import BUILDING_WALL = building_type.BUILDING_WALL;
import BUILDING_BURNING_RUIN = building_type.BUILDING_BURNING_RUIN;
import DIR_0_TOP = direction_type.DIR_0_TOP;
import DIR_2_RIGHT = direction_type.DIR_2_RIGHT;
import DIR_4_BOTTOM = direction_type.DIR_4_BOTTOM;
import DIR_6_LEFT = direction_type.DIR_6_LEFT;
import GROUP_TERRAIN_UGLY_GRASS = group_terrain.GROUP_TERRAIN_UGLY_GRASS;
import GROUP_BUILDING_FARM_HOUSE = group_terrain.GROUP_BUILDING_FARM_HOUSE;
import GROUP_TERRAIN_RUBBLE = group_terrain.GROUP_TERRAIN_RUBBLE;
import GRID_SIZE = GRID.GRID_SIZE;
import TERRAIN_ROCK = terrain.TERRAIN_ROCK;
import TERRAIN_WATER = terrain.TERRAIN_WATER;
import TERRAIN_BUILDING = terrain.TERRAIN_BUILDING;
import TERRAIN_AQUEDUCT = terrain.TERRAIN_AQUEDUCT;
import TERRAIN_RUBBLE = terrain.TERRAIN_RUBBLE;
import TERRAIN_WALL = terrain.TERRAIN_WALL;
import TERRAIN_GATEHOUSE = terrain.TERRAIN_GATEHOUSE;
import TERRAIN_NOT_CLEAR = terrain.TERRAIN_NOT_CLEAR;
import TERRAIN_CLEARABLE = terrain.TERRAIN_CLEARABLE;
export function map_building_tiles_add(building_id: number, x: number, y: number, size: number, image_id: number, terrain: number) {
    if (!map_grid_is_inside(x, y, size)) {
        return;
    }
    let x_leftmost: number
    let y_leftmost: number;
    switch (city_view_orientation()) {
        case DIR_0_TOP:
            x_leftmost = 0;
            y_leftmost = size - 1;
            break
        case DIR_2_RIGHT:
            x_leftmost = y_leftmost = 0;
            break
        case DIR_4_BOTTOM:
            x_leftmost = size - 1;
            y_leftmost = 0;
            break
        case DIR_6_LEFT:
            x_leftmost = y_leftmost = size - 1;
            break
        default:
            return
    }
    for (let dy: number = 0; dy < size; dy++) {
        for (let dx: number = 0; dx < size; dx++) {
            let grid_offset: number = map_grid_offset(x + dx, y + dy);
            map_terrain_remove(grid_offset, TERRAIN_CLEARABLE);
            map_terrain_add(grid_offset, terrain);
            map_building_set(grid_offset, building_id);
            map_property_clear_constructing(grid_offset);
            map_property_set_multi_tile_size(grid_offset, size);
            map_image_set(grid_offset, image_id);
            map_property_set_multi_tile_xy(grid_offset, dx, dy,
                dx == x_leftmost && dy == y_leftmost);
        }
    }
}
function set_crop_tile(building_id: number, x: number, y: number, dx: number, dy: number, crop_image_id: number, growth: number) {
    let grid_offset: number = map_grid_offset(x + dx, y + dy);
    map_terrain_remove(grid_offset, TERRAIN_CLEARABLE);
    map_terrain_add(grid_offset, TERRAIN_BUILDING);
    map_building_set(grid_offset, building_id);
    map_property_clear_constructing(grid_offset);
    map_property_set_multi_tile_xy(grid_offset, dx, dy, true);
    map_image_set(grid_offset, crop_image_id + (growth < 4 ? growth : 4));
}
export function map_building_tiles_add_farm(building_id: number, x: number, y: number, crop_image_id: number, progress: number) {
    if (!map_grid_is_inside(x, y, 3)) {
        return;
    }
    let x_leftmost: number
    let y_leftmost: number;
    switch (city_view_orientation()) {
        case DIR_0_TOP:
            x_leftmost = 0;
            y_leftmost = 1;
            break
        case DIR_2_RIGHT:
            x_leftmost = 0;
            y_leftmost = 0;
            break
        case DIR_4_BOTTOM:
            x_leftmost = 1;
            y_leftmost = 0;
            break
        case DIR_6_LEFT:
            x_leftmost = 1;
            y_leftmost = 1;
            break
        default:
            return
    }
    for (let dy: number = 0; dy < 2; dy++) {
        for (let dx: number = 0; dx < 2; dx++) {
            let grid_offset: number = map_grid_offset(x + dx, y + dy);
            map_terrain_remove(grid_offset, TERRAIN_CLEARABLE);
            map_terrain_add(grid_offset, TERRAIN_BUILDING);
            map_building_set(grid_offset, building_id);
            map_property_clear_constructing(grid_offset);
            map_property_set_multi_tile_size(grid_offset, 2);
            map_image_set(grid_offset, image_group(GROUP_BUILDING_FARM_HOUSE));
            map_property_set_multi_tile_xy(grid_offset, dx, dy,
                dx == x_leftmost && dy == y_leftmost);
        }
    }
    let growth: number = progress / 10;
    set_crop_tile(building_id, x, y, 0, 2, crop_image_id, growth);
    growth -= 4
    if (growth < 0) {
        growth = 0;
    }
    set_crop_tile(building_id, x, y, 1, 2, crop_image_id, growth);
    growth -= 4
    if (growth < 0) {
        growth = 0;
    }
    set_crop_tile(building_id, x, y, 2, 2, crop_image_id, growth);
    growth -= 4
    if (growth < 0) {
        growth = 0;
    }
    set_crop_tile(building_id, x, y, 2, 1, crop_image_id, growth);
    growth -= 4
    if (growth < 0) {
        growth = 0;
    }
    set_crop_tile(building_id, x, y, 2, 0, crop_image_id, growth);
}
export function map_building_tiles_add_aqueduct(x: number, y: number) {
    let grid_offset: number = map_grid_offset(x, y);
    map_terrain_add(grid_offset, TERRAIN_AQUEDUCT);
    map_property_clear_constructing(grid_offset);
    return 1;
}
function north_tile_grid_offset(x: number, y: number, sizeRef: { value: number }) {
    let grid_offset: number = map_grid_offset(x, y);
    sizeRef.value = map_property_multi_tile_size(grid_offset);
    for (let i: number = 0; i < sizeRef.value && map_property_multi_tile_x(grid_offset); i++) {
        grid_offset += map_grid_delta(-1, 0)
    }
    for (let i: number = 0; i < sizeRef.value && map_property_multi_tile_y(grid_offset); i++) {
        grid_offset += map_grid_delta(0, -1)
    }
    return grid_offset;
}
export function map_building_tiles_remove(building_id: number, x: number, y: number) {
    if (!map_grid_is_inside(x, y, 1)) {
        return;
    }
    let sizeRef: { value: number } = { value: 0 };
    let base_grid_offset: number = north_tile_grid_offset(x, y, sizeRef);
    let size: number = sizeRef.value;
    x = map_grid_offset_to_x(base_grid_offset);
    y = map_grid_offset_to_y(base_grid_offset);
    if (map_terrain_get(base_grid_offset) == TERRAIN_ROCK) {
        return;
    }
    let b: building = building_get(building_id);
    if (building_id && building_is_farm(b.type)) {
        size = 3;
    }
    for (let dy: number = 0; dy < size; dy++) {
        for (let dx: number = 0; dx < size; dx++) {
            let grid_offset: number = map_grid_offset(x + dx, y + dy);
            if (building_id && map_building_at(grid_offset) != building_id) {
                continue
            }
            if (building_id && b.type != BUILDING_BURNING_RUIN) {
                map_set_rubble_building_type(grid_offset, b.type);
            }
            map_property_clear_constructing(grid_offset);
            map_property_set_multi_tile_size(grid_offset, 1);
            map_property_clear_multi_tile_xy(grid_offset);
            map_property_mark_draw_tile(grid_offset);
            map_aqueduct_set(grid_offset, 0);
            map_building_set(grid_offset, 0);
            map_building_damage_clear(grid_offset);
            map_sprite_clear_tile(grid_offset);
            if (map_terrain_is(grid_offset, TERRAIN_WATER)) {
                map_terrain_set(grid_offset, TERRAIN_WATER);
                map_tiles_set_water(x + dx, y + dy);
            } else {
                map_image_set(grid_offset,
                    image_group(GROUP_TERRAIN_UGLY_GRASS) +
                    (map_random_get(grid_offset) & 7));
                map_terrain_remove(grid_offset, TERRAIN_CLEARABLE);
            }
        }
    }
    map_tiles_update_region_empty_land(x, y, x + size, y + size);
    map_tiles_update_region_meadow(x, y, x + size, y + size);
    map_tiles_update_region_rubble(x, y, x + size, y + size);
}
export function map_building_tiles_set_rubble(building_id: number, x: number, y: number, size: number) {
    if (!map_grid_is_inside(x, y, size)) {
        return;
    }
    let b: building = building_get(building_id);
    for (let dy: number = 0; dy < size; dy++) {
        for (let dx: number = 0; dx < size; dx++) {
            let grid_offset: number = map_grid_offset(x + dx, y + dy);
            if (map_building_at(grid_offset) != building_id) {
                continue
            }
            if (building_id && building_get(map_building_at(grid_offset)).type != BUILDING_BURNING_RUIN) {
                map_set_rubble_building_type(grid_offset, b.type);
            } else if (!building_id && map_terrain_get(grid_offset) & TERRAIN_WALL) {
                map_set_rubble_building_type(grid_offset, BUILDING_WALL);
            }
            map_property_clear_constructing(grid_offset);
            map_property_set_multi_tile_size(grid_offset, 1);
            map_aqueduct_set(grid_offset, 0);
            map_building_set(grid_offset, 0);
            map_building_damage_clear(grid_offset);
            map_sprite_clear_tile(grid_offset);
            map_property_set_multi_tile_xy(grid_offset, 0, 0, true);
            if (map_terrain_is(grid_offset, TERRAIN_WATER)) {
                map_terrain_set(grid_offset, TERRAIN_WATER);
                map_tiles_set_water(x + dx, y + dy);
            } else {
                map_terrain_remove(grid_offset, TERRAIN_CLEARABLE);
                map_terrain_add(grid_offset, TERRAIN_RUBBLE);
                map_image_set(grid_offset, image_group(GROUP_TERRAIN_RUBBLE) + (map_random_get(grid_offset) & 7));
            }
        }
    }
}
function adjust_to_absolute_xy(xRef: { value: number }, yRef: { value: number }, size: number) {
    switch (city_view_orientation()) {
        case DIR_2_RIGHT:
            xRef.value = xRef.value - size + 1;
            break
        case DIR_4_BOTTOM:
            xRef.value = xRef.value - size + 1;
        case DIR_6_LEFT:
            yRef.value = yRef.value - size + 1;
            break
    }
}
export function map_building_tiles_mark_construction(x: number, y: number, size: number, terrain: number, absolute_xy: number) {
    let xRef: { value: number } = { value: x };
    let yRef: { value: number } = { value: y };
    if (!absolute_xy) {
        adjust_to_absolute_xy(xRef, yRef, size);
    }
    let actualX: number = xRef.value;
    let actualY: number = yRef.value;
    if (!map_grid_is_inside(actualX, actualY, size)) {
        return 0;
    }
    for (let dy: number = 0; dy < size; dy++) {
        for (let dx: number = 0; dx < size; dx++) {
            let grid_offset: number = map_grid_offset(actualX + dx, actualY + dy);
            if (map_terrain_is(grid_offset, terrain & TERRAIN_NOT_CLEAR) || map_has_figure_at(grid_offset)) {
                return 0;
            }
        }
    }
    for (let dy: number = 0; dy < size; dy++) {
        for (let dx: number = 0; dx < size; dx++) {
            let grid_offset: number = map_grid_offset(x + dx, y + dy);
            map_property_mark_constructing(grid_offset);
        }
    }
    return 1;
}
export function map_building_tiles_mark_deleting(grid_offset: number) {
    let building_id: number = map_building_at(grid_offset);
    if (!building_id) {
        map_bridge_remove(grid_offset, 1);
    } else {
        grid_offset = building_main(building_get(building_id)).grid_offset;
    }
    map_property_mark_deleted(grid_offset);
}
export function map_building_tiles_are_clear(x: number, y: number, size: number, terrain: number) {
    let xRef: { value: number } = { value: x };
    let yRef: { value: number } = { value: y };
    adjust_to_absolute_xy(xRef, yRef, size);
    let actualX: number = xRef.value;
    let actualY: number = yRef.value;
    if (!map_grid_is_inside(actualX, actualY, size)) {
        return 0;
    }
    for (let dy: number = 0; dy < size; dy++) {
        for (let dx: number = 0; dx < size; dx++) {
            let grid_offset: number = map_grid_offset(actualX + dx, actualY + dy);
            if (map_terrain_is(grid_offset, terrain & TERRAIN_NOT_CLEAR)) {
                return 0;
            }
        }
    }
    return 1;
}
