
import { building, building_get, building_is_house, building_main } from 'building/building';
import { building_type } from 'building/type';
import { figure_type } from 'figure/type';
import { map_building_at } from 'map/building';
import { map_property_is_plaza_or_earthquake } from 'map/property';
import { map_sprite_bridge_at } from 'map/sprite';
import { map_terrain_get, terrain } from 'map/terrain';
import BUILDING_NONE = building_type.BUILDING_NONE;
import BUILDING_ROAD = building_type.BUILDING_ROAD;
import BUILDING_WALL = building_type.BUILDING_WALL;
import BUILDING_DRAGGABLE_RESERVOIR = building_type.BUILDING_DRAGGABLE_RESERVOIR;
import BUILDING_AQUEDUCT = building_type.BUILDING_AQUEDUCT;
import BUILDING_HOUSE_VACANT_LOT = building_type.BUILDING_HOUSE_VACANT_LOT;
import BUILDING_PLAZA = building_type.BUILDING_PLAZA;
import BUILDING_GARDENS = building_type.BUILDING_GARDENS;
import BUILDING_FORT_LEGIONARIES = building_type.BUILDING_FORT_LEGIONARIES;
import BUILDING_FORT_JAVELIN = building_type.BUILDING_FORT_JAVELIN;
import BUILDING_FORT_MOUNTED = building_type.BUILDING_FORT_MOUNTED;
import BUILDING_FORT = building_type.BUILDING_FORT;
import BUILDING_LOW_BRIDGE = building_type.BUILDING_LOW_BRIDGE;
import BUILDING_SHIP_BRIDGE = building_type.BUILDING_SHIP_BRIDGE;
import BUILDING_NATIVE_HUT = building_type.BUILDING_NATIVE_HUT;
import BUILDING_NATIVE_MEETING = building_type.BUILDING_NATIVE_MEETING;
import BUILDING_RESERVOIR = building_type.BUILDING_RESERVOIR;
import BUILDING_NATIVE_CROPS = building_type.BUILDING_NATIVE_CROPS;
import BUILDING_BURNING_RUIN = building_type.BUILDING_BURNING_RUIN;
;
import FIGURE_FORT_JAVELIN = figure_type.FIGURE_FORT_JAVELIN;
import FIGURE_FORT_MOUNTED = figure_type.FIGURE_FORT_MOUNTED;
import FIGURE_FORT_LEGIONARY = figure_type.FIGURE_FORT_LEGIONARY;
import TERRAIN_WATER = terrain.TERRAIN_WATER;
import TERRAIN_BUILDING = terrain.TERRAIN_BUILDING;
import TERRAIN_GARDEN = terrain.TERRAIN_GARDEN;
import TERRAIN_ROAD = terrain.TERRAIN_ROAD;
import TERRAIN_AQUEDUCT = terrain.TERRAIN_AQUEDUCT;
import TERRAIN_WALL = terrain.TERRAIN_WALL;
import TERRAIN_GATEHOUSE = terrain.TERRAIN_GATEHOUSE;
function get_clone_type_from_building(b: building) {
    let clone_type: building_type = b.type;
    if (building_is_house(clone_type)) {
        return BUILDING_HOUSE_VACANT_LOT;
    }
    switch (clone_type) {
        case BUILDING_RESERVOIR:
            return BUILDING_DRAGGABLE_RESERVOIR;
        case BUILDING_FORT:
            switch (b.subtype.fort_figure_type) {
                case FIGURE_FORT_LEGIONARY:
                    return BUILDING_FORT_LEGIONARIES;
                case FIGURE_FORT_JAVELIN:
                    return BUILDING_FORT_JAVELIN;
                case FIGURE_FORT_MOUNTED:
                    return BUILDING_FORT_MOUNTED;
            }
            return BUILDING_NONE;
        case BUILDING_NATIVE_CROPS:
        case BUILDING_NATIVE_HUT:
        case BUILDING_NATIVE_MEETING:
        case BUILDING_BURNING_RUIN:
            return BUILDING_NONE;
        default:
            return clone_type
    }
}
export function building_clone_type_from_grid_offset(grid_offset: number) {
    let terrain: number = map_terrain_get(grid_offset);
    if (terrain & TERRAIN_BUILDING) {
        let building_id: number = map_building_at(grid_offset);
        if (building_id) {
            let b: building = building_main(building_get(building_id));
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
