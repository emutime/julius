// clone.ts

import { building, building_type, FIGURE_FORT_JAVELIN, FIGURE_FORT_LEGIONARY, FIGURE_FORT_MOUNTED } from './building';
import { map_building_at, map_property_is_plaza_or_earthquake, map_sprite_bridge_at, map_terrain_get } from './map';
import { TERRAIN_AQUEDUCT, TERRAIN_BUILDING, TERRAIN_GARDEN, TERRAIN_ROAD, TERRAIN_WALL, TERRAIN_WATER } from './terrain';

/**
 * 根据建筑物获取其适合克隆的类型。
 * 例如，给定一个堡垒，返回对应于特定堡垒的枚举值，而不是一般值。
 *
 * @param b 要检查的建筑物
 * @return 要克隆的 building_type 值，如果不可克隆则返回 BUILDING_NONE
 */
function get_clone_type_from_building(b: building): building_type {
    let clone_type: building_type = b.type;

    if (building_is_house(clone_type)) {
        return BUILDING_HOUSE_VACANT_LOT;
    }

    switch (clone_type) {
        case BUILDING_RESERVOIR:
            return BUILDING_DRAGGABLE_RESERVOIR;
        case BUILDING_FORT:
            switch (b.subtype.fort_figure_type) {
                case FIGURE_FORT_LEGIONARY: return BUILDING_FORT_LEGIONARIES;
                case FIGURE_FORT_JAVELIN: return BUILDING_FORT_JAVELIN;
                case FIGURE_FORT_MOUNTED: return BUILDING_FORT_MOUNTED;
            }
            return BUILDING_NONE;
        case BUILDING_NATIVE_CROPS:
        case BUILDING_NATIVE_HUT:
        case BUILDING_NATIVE_MEETING:
        case BUILDING_BURNING_RUIN:
            return BUILDING_NONE;
        default:
            return clone_type;
    }
}

/**
 * 根据网格偏移量获取建筑物的克隆类型。
 *
 * @param grid_offset 网格偏移量
 * @return 对应的建筑物克隆类型
 */
function building_clone_type_from_grid_offset(grid_offset: number): building_type {
    const terrain = map_terrain_get(grid_offset);

    if (terrain & TERRAIN_BUILDING) {
        const building_id = map_building_at(grid_offset);
        if (building_id) {
            const b = building_main(building_get(building_id));
            return get_clone_type_from_building(b);
        }
    } else if (terrain & TERRAIN_AQUEDUCT) {
        return BUILDING_AQUEDUCT;
    } else if (terrain & TERRAIN_WALL) {
        return BUILDING_WALL;
    } else if (terrain & TERRAIN_GARDEN) {
        return BUILDING_GARDENS;
    } else if (terrain & TERRAIN_ROAD) {
        if (terrain & TERRAIN_WATER) {
            if (map_sprite_bridge_at(grid_offset) > 6) {
                return BUILDING_SHIP_BRIDGE;
            }
            return BUILDING_LOW_BRIDGE;
        } else if (map_property_is_plaza_or_earthquake(grid_offset)) {
            return BUILDING_PLAZA;
        }
        return BUILDING_ROAD;
    }

    return BUILDING_NONE;
}