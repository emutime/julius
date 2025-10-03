import { image_group } from 'core/image';
import { group_terrain } from 'core/image_group';
import { COLOR_MASK_RED, color_t } from 'graphics/color';
import { image_draw_masked } from 'graphics/image';
import { map_property_is_deleted } from 'map/property';
import { map_sprite_bridge_at, map_sprite_clear_tile } from 'map/sprite';
import { map_terrain_is, terrain } from 'map/terrain';
;
import GROUP_BUILDING_BRIDGE = group_terrain.GROUP_BUILDING_BRIDGE;
import TERRAIN_WATER = terrain.TERRAIN_WATER;
import TERRAIN_BUILDING = terrain.TERRAIN_BUILDING;
import TERRAIN_WALL = terrain.TERRAIN_WALL;
import TERRAIN_GATEHOUSE = terrain.TERRAIN_GATEHOUSE;
export function city_draw_bridge(x: number, y: number, grid_offset: number) {
    if (!map_terrain_is(grid_offset, TERRAIN_WATER)) {
        map_sprite_clear_tile(grid_offset);
        return;
    }
    if (map_terrain_is(grid_offset, TERRAIN_BUILDING)) {
        return;
    }
    let color_mask: color_t = 0;
    if (map_property_is_deleted(grid_offset)) {
        color_mask = COLOR_MASK_RED;
    }
    city_draw_bridge_tile(x, y, map_sprite_bridge_at(grid_offset), color_mask);
}
export function city_draw_bridge_tile(x: number, y: number, bridge_sprite_id: number, color_mask: color_t) {
    let image_id: number = image_group(GROUP_BUILDING_BRIDGE);
    switch (bridge_sprite_id) {
        case 1:
            image_draw_masked(image_id + 5, x, y - 20, color_mask);
            break
        case 2:
            image_draw_masked(image_id, x - 1, y - 8, color_mask);
            break
        case 3:
            image_draw_masked(image_id + 3, x, y - 8, color_mask);
            break
        case 4:
            image_draw_masked(image_id + 2, x + 7, y - 20, color_mask);
            break
        case 5:
            image_draw_masked(image_id + 4, x, y - 21, color_mask);
            break
        case 6:
            image_draw_masked(image_id + 1, x + 5, y - 21, color_mask);
            break
        case 7:
            image_draw_masked(image_id + 11, x - 3, y - 50, color_mask);
            break
        case 8:
            image_draw_masked(image_id + 6, x - 1, y - 12, color_mask);
            break
        case 9:
            image_draw_masked(image_id + 9, x - 30, y - 12, color_mask);
            break
        case 10:
            image_draw_masked(image_id + 8, x - 23, y - 53, color_mask);
            break
        case 11:
            image_draw_masked(image_id + 10, x, y - 37, color_mask);
            break
        case 12:
            image_draw_masked(image_id + 7, x + 7, y - 38, color_mask);
            break
        case 14:
            image_draw_masked(image_id + 13, x, y - 38, color_mask);
            break
        case 15:
            image_draw_masked(image_id + 12, x + 7, y - 38, color_mask);
            break
    }
}
