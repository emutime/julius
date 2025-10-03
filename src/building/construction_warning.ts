
import { building_is_fort } from 'building/building';
import { building_count_active, building_count_industry_active } from 'building/count';
import { model_get_building } from 'building/model';
import { building_type } from 'building/type';
import { resource_trade_status } from 'city/constants';
import { city_labor_workers_needed } from 'city/labor';
import { city_population } from 'city/population';
import { city_resource_count, city_resource_food_percentage_produced, city_resource_trade_status } from 'city/resource';
import { city_warning_show, warning_type } from 'city/warning';
import { empire_can_import_resource, empire_can_produce_resource } from 'empire/city';
import { resource_type } from 'game/resource';
import { GRID, map_grid_delta, map_grid_offset } from 'map/grid';
import { map_has_road_access, map_has_road_access_hippodrome } from 'map/road_access';
import { map_terrain_is, map_terrain_is_adjacent_to_wall, terrain } from 'map/terrain';
import { scenario_property_rome_supplies_wheat } from 'scenario/property';
import BUILDING_HOUSE_VACANT_LOT = building_type.BUILDING_HOUSE_VACANT_LOT;
import BUILDING_AMPHITHEATER = building_type.BUILDING_AMPHITHEATER;
import BUILDING_THEATER = building_type.BUILDING_THEATER;
import BUILDING_HIPPODROME = building_type.BUILDING_HIPPODROME;
import BUILDING_COLOSSEUM = building_type.BUILDING_COLOSSEUM;
import BUILDING_GLADIATOR_SCHOOL = building_type.BUILDING_GLADIATOR_SCHOOL;
import BUILDING_LION_HOUSE = building_type.BUILDING_LION_HOUSE;
import BUILDING_ACTOR_COLONY = building_type.BUILDING_ACTOR_COLONY;
import BUILDING_CHARIOT_MAKER = building_type.BUILDING_CHARIOT_MAKER;
import BUILDING_FORT_LEGIONARIES = building_type.BUILDING_FORT_LEGIONARIES;
import BUILDING_SMALL_STATUE = building_type.BUILDING_SMALL_STATUE;
import BUILDING_MEDIUM_STATUE = building_type.BUILDING_MEDIUM_STATUE;
import BUILDING_LARGE_STATUE = building_type.BUILDING_LARGE_STATUE;
import BUILDING_FORT_JAVELIN = building_type.BUILDING_FORT_JAVELIN;
import BUILDING_FORT_MOUNTED = building_type.BUILDING_FORT_MOUNTED;
import BUILDING_BATHHOUSE = building_type.BUILDING_BATHHOUSE;
import BUILDING_TRIUMPHAL_ARCH = building_type.BUILDING_TRIUMPHAL_ARCH;
import BUILDING_FORT = building_type.BUILDING_FORT;
import BUILDING_GATEHOUSE = building_type.BUILDING_GATEHOUSE;
import BUILDING_TOWER = building_type.BUILDING_TOWER;
import BUILDING_MARKET = building_type.BUILDING_MARKET;
import BUILDING_GRANARY = building_type.BUILDING_GRANARY;
import BUILDING_WAREHOUSE = building_type.BUILDING_WAREHOUSE;
import BUILDING_RESERVOIR = building_type.BUILDING_RESERVOIR;
import BUILDING_FOUNTAIN = building_type.BUILDING_FOUNTAIN;
import BUILDING_WELL = building_type.BUILDING_WELL;
import BUILDING_BARRACKS = building_type.BUILDING_BARRACKS;
import BUILDING_WINE_WORKSHOP = building_type.BUILDING_WINE_WORKSHOP;
import BUILDING_OIL_WORKSHOP = building_type.BUILDING_OIL_WORKSHOP;
import BUILDING_WEAPONS_WORKSHOP = building_type.BUILDING_WEAPONS_WORKSHOP;
import BUILDING_FURNITURE_WORKSHOP = building_type.BUILDING_FURNITURE_WORKSHOP;
import BUILDING_POTTERY_WORKSHOP = building_type.BUILDING_POTTERY_WORKSHOP;
;
import RESOURCE_OLIVES = resource_type.RESOURCE_OLIVES;
import RESOURCE_VINES = resource_type.RESOURCE_VINES;
import RESOURCE_WINE = resource_type.RESOURCE_WINE;
import RESOURCE_OIL = resource_type.RESOURCE_OIL;
import RESOURCE_IRON = resource_type.RESOURCE_IRON;
import RESOURCE_TIMBER = resource_type.RESOURCE_TIMBER;
import RESOURCE_CLAY = resource_type.RESOURCE_CLAY;
import RESOURCE_WEAPONS = resource_type.RESOURCE_WEAPONS;
import RESOURCE_FURNITURE = resource_type.RESOURCE_FURNITURE;
import RESOURCE_POTTERY = resource_type.RESOURCE_POTTERY;
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
import TRADE_STATUS_IMPORT = resource_trade_status.TRADE_STATUS_IMPORT;
import WARNING_ROAD_ACCESS_NEEDED = warning_type.WARNING_ROAD_ACCESS_NEEDED;
import WARNING_WORKERS_NEEDED = warning_type.WARNING_WORKERS_NEEDED;
import WARNING_MORE_FOOD_NEEDED = warning_type.WARNING_MORE_FOOD_NEEDED;
import WARNING_BUILD_MARKET = warning_type.WARNING_BUILD_MARKET;
import WARNING_IRON_NEEDED = warning_type.WARNING_IRON_NEEDED;
import WARNING_VINES_NEEDED = warning_type.WARNING_VINES_NEEDED;
import WARNING_OLIVES_NEEDED = warning_type.WARNING_OLIVES_NEEDED;
import WARNING_CLAY_NEEDED = warning_type.WARNING_CLAY_NEEDED;
import WARNING_TIMBER_NEEDED = warning_type.WARNING_TIMBER_NEEDED;
import WARNING_OPEN_TRADE_TO_IMPORT = warning_type.WARNING_OPEN_TRADE_TO_IMPORT;
import WARNING_TRADE_IMPORT_RESOURCE = warning_type.WARNING_TRADE_IMPORT_RESOURCE;
import WARNING_BUILD_IRON_MINE = warning_type.WARNING_BUILD_IRON_MINE;
import WARNING_BUILD_VINES_FARM = warning_type.WARNING_BUILD_VINES_FARM;
import WARNING_BUILD_OLIVE_FARM = warning_type.WARNING_BUILD_OLIVE_FARM;
import WARNING_BUILD_CLAY_PIT = warning_type.WARNING_BUILD_CLAY_PIT;
import WARNING_BUILD_TIMBER_YARD = warning_type.WARNING_BUILD_TIMBER_YARD;
import WARNING_WATER_PIPE_ACCESS_NEEDED = warning_type.WARNING_WATER_PIPE_ACCESS_NEEDED;
import WARNING_PLACE_RESERVOIR_NEXT_TO_WATER = warning_type.WARNING_PLACE_RESERVOIR_NEXT_TO_WATER;
import WARNING_CONNECT_TO_RESERVOIR = warning_type.WARNING_CONNECT_TO_RESERVOIR;
import WARNING_SENTRIES_NEED_WALL = warning_type.WARNING_SENTRIES_NEED_WALL;
import WARNING_BUILD_BARRACKS = warning_type.WARNING_BUILD_BARRACKS;
import WARNING_WEAPONS_NEEDED = warning_type.WARNING_WEAPONS_NEEDED;
import WARNING_BUILD_ACTOR_COLONY = warning_type.WARNING_BUILD_ACTOR_COLONY;
import WARNING_BUILD_GLADIATOR_SCHOOL = warning_type.WARNING_BUILD_GLADIATOR_SCHOOL;
import WARNING_BUILD_LION_HOUSE = warning_type.WARNING_BUILD_LION_HOUSE;
import WARNING_BUILD_CHARIOT_MAKER = warning_type.WARNING_BUILD_CHARIOT_MAKER;
import GRID_SIZE = GRID.GRID_SIZE;
import TERRAIN_RESERVOIR_RANGE = terrain.TERRAIN_RESERVOIR_RANGE;
import TERRAIN_WALL = terrain.TERRAIN_WALL;
import TERRAIN_GATEHOUSE = terrain.TERRAIN_GATEHOUSE;
let has_warning: number = 0;
export function building_construction_warning_reset() {
    has_warning = 0;
}
function show(warning: warning_type) {
    city_warning_show(warning);
    has_warning = 1;
}
function check_road_access(type: number, x: number, y: number, size: number) {
    switch (type) {
        case BUILDING_SMALL_STATUE:
        case BUILDING_MEDIUM_STATUE:
        case BUILDING_LARGE_STATUE:
        case BUILDING_FOUNTAIN:
        case BUILDING_WELL:
        case BUILDING_RESERVOIR:
        case BUILDING_GATEHOUSE:
        case BUILDING_TRIUMPHAL_ARCH:
        case BUILDING_HOUSE_VACANT_LOT:
        case BUILDING_FORT:
        case BUILDING_FORT_LEGIONARIES:
        case BUILDING_FORT_JAVELIN:
        case BUILDING_FORT_MOUNTED:
            return;
    }
    let has_road: number = 0;
    if (map_has_road_access(x, y, size, 0)) {
        has_road = 1;
    } else if (type == BUILDING_WAREHOUSE && map_has_road_access(x, y, size, 0)) {
        has_road = 1;
    } else if (type == BUILDING_HIPPODROME && map_has_road_access_hippodrome(x, y, 0)) {
        has_road = 1;
    }
    if (!has_road) {
        show(WARNING_ROAD_ACCESS_NEEDED);
    }
}
function check_water(type: number, x: number, y: number) {
    if (!has_warning) {
        if (type == BUILDING_FOUNTAIN || type == BUILDING_BATHHOUSE) {
            let grid_offset: number = map_grid_offset(x, y);
            let has_water: number = 0;
            if (map_terrain_is(grid_offset, TERRAIN_RESERVOIR_RANGE)) {
                has_water = 1;
            } else if (type == BUILDING_BATHHOUSE) {
                if (map_terrain_is(grid_offset + map_grid_delta(1, 0), TERRAIN_RESERVOIR_RANGE) ||
                    map_terrain_is(grid_offset + map_grid_delta(0, 1), TERRAIN_RESERVOIR_RANGE) ||
                    map_terrain_is(grid_offset + map_grid_delta(1, 1), TERRAIN_RESERVOIR_RANGE)) {
                    has_water = 1;
                }
            }
            if (!has_water) {
                show(WARNING_WATER_PIPE_ACCESS_NEEDED);
            }
        }
    }
}
function check_workers(type: number) {
    if (!has_warning && type != BUILDING_WELL && !building_is_fort(type)) {
        if (model_get_building(type).laborers > 0 && city_labor_workers_needed() >= 10) {
            show(WARNING_WORKERS_NEEDED);
        }
    }
}
function check_market(type: number) {
    if (!has_warning && type == BUILDING_GRANARY) {
        if (building_count_active(BUILDING_MARKET) <= 0) {
            show(WARNING_BUILD_MARKET);
        }
    }
}
function check_barracks(type: number) {
    if (!has_warning) {
        if (building_is_fort(type) && building_count_active(BUILDING_BARRACKS) <= 0) {
            show(WARNING_BUILD_BARRACKS);
        }
    }
}
function check_weapons_access(type: number) {
    if (!has_warning && type == BUILDING_BARRACKS) {
        if (city_resource_count(RESOURCE_WEAPONS) <= 0) {
            show(WARNING_WEAPONS_NEEDED);
        }
    }
}
function check_wall(type: number, x: number, y: number, size: number) {
    if (!has_warning && type == BUILDING_TOWER) {
        if (!map_terrain_is_adjacent_to_wall(x, y, size)) {
            show(WARNING_SENTRIES_NEED_WALL);
        }
    }
}
function check_actor_access(type: number) {
    if (!has_warning && type == BUILDING_THEATER) {
        if (building_count_active(BUILDING_ACTOR_COLONY) <= 0) {
            show(WARNING_BUILD_ACTOR_COLONY);
        }
    }
}
function check_gladiator_access(type: number) {
    if (!has_warning && type == BUILDING_AMPHITHEATER) {
        if (building_count_active(BUILDING_GLADIATOR_SCHOOL) <= 0) {
            show(WARNING_BUILD_GLADIATOR_SCHOOL);
        }
    }
}
function check_lion_access(type: number) {
    if (!has_warning && type == BUILDING_COLOSSEUM) {
        if (building_count_active(BUILDING_LION_HOUSE) <= 0) {
            show(WARNING_BUILD_LION_HOUSE);
        }
    }
}
function check_charioteer_access(type: number) {
    if (!has_warning && type == BUILDING_HIPPODROME) {
        if (building_count_active(BUILDING_CHARIOT_MAKER) <= 0) {
            show(WARNING_BUILD_CHARIOT_MAKER);
        }
    }
}
function check_iron_access(type: number) {
    if (type == BUILDING_WEAPONS_WORKSHOP &&
        building_count_industry_active(RESOURCE_IRON) <= 0) {
        if (city_resource_count(RESOURCE_WEAPONS) <= 0 && city_resource_count(RESOURCE_IRON) <= 0) {
            show(WARNING_IRON_NEEDED);
            if (empire_can_produce_resource(RESOURCE_IRON)) {
                show(WARNING_BUILD_IRON_MINE);
            } else if (!empire_can_import_resource(RESOURCE_IRON)) {
                show(WARNING_OPEN_TRADE_TO_IMPORT);
            } else if (city_resource_trade_status(RESOURCE_IRON) != TRADE_STATUS_IMPORT) {
                show(WARNING_TRADE_IMPORT_RESOURCE);
            }
        }
    }
}
function check_vines_access(type: number) {
    if (type == BUILDING_WINE_WORKSHOP &&
        building_count_industry_active(RESOURCE_VINES) <= 0) {
        if (city_resource_count(RESOURCE_WINE) <= 0 && city_resource_count(RESOURCE_VINES) <= 0) {
            show(WARNING_VINES_NEEDED);
            if (empire_can_produce_resource(RESOURCE_VINES)) {
                show(WARNING_BUILD_VINES_FARM);
            } else if (!empire_can_import_resource(RESOURCE_VINES)) {
                show(WARNING_OPEN_TRADE_TO_IMPORT);
            } else if (city_resource_trade_status(RESOURCE_VINES) != TRADE_STATUS_IMPORT) {
                show(WARNING_TRADE_IMPORT_RESOURCE);
            }
        }
    }
}
function check_olives_access(type: number) {
    if (type == BUILDING_OIL_WORKSHOP &&
        building_count_industry_active(RESOURCE_OLIVES) <= 0) {
        if (city_resource_count(RESOURCE_OIL) <= 0 && city_resource_count(RESOURCE_OLIVES) <= 0) {
            show(WARNING_OLIVES_NEEDED);
            if (empire_can_produce_resource(RESOURCE_OLIVES)) {
                show(WARNING_BUILD_OLIVE_FARM);
            } else if (!empire_can_import_resource(RESOURCE_OLIVES)) {
                show(WARNING_OPEN_TRADE_TO_IMPORT);
            } else if (city_resource_trade_status(RESOURCE_OLIVES) != TRADE_STATUS_IMPORT) {
                show(WARNING_TRADE_IMPORT_RESOURCE);
            }
        }
    }
}
function check_timber_access(type: number) {
    if (type == BUILDING_FURNITURE_WORKSHOP &&
        building_count_industry_active(RESOURCE_TIMBER) <= 0) {
        if (city_resource_count(RESOURCE_FURNITURE) <= 0 && city_resource_count(RESOURCE_TIMBER) <= 0) {
            show(WARNING_TIMBER_NEEDED);
            if (empire_can_produce_resource(RESOURCE_TIMBER)) {
                show(WARNING_BUILD_TIMBER_YARD);
            } else if (!empire_can_import_resource(RESOURCE_TIMBER)) {
                show(WARNING_OPEN_TRADE_TO_IMPORT);
            } else if (city_resource_trade_status(RESOURCE_TIMBER) != TRADE_STATUS_IMPORT) {
                show(WARNING_TRADE_IMPORT_RESOURCE);
            }
        }
    }
}
function check_clay_access(type: number) {
    if (type == BUILDING_POTTERY_WORKSHOP &&
        building_count_industry_active(RESOURCE_CLAY) <= 0) {
        if (city_resource_count(RESOURCE_POTTERY) <= 0 && city_resource_count(RESOURCE_CLAY) <= 0) {
            show(WARNING_CLAY_NEEDED);
            if (empire_can_produce_resource(RESOURCE_CLAY)) {
                show(WARNING_BUILD_CLAY_PIT);
            } else if (!empire_can_import_resource(RESOURCE_CLAY)) {
                show(WARNING_OPEN_TRADE_TO_IMPORT);
            } else if (city_resource_trade_status(RESOURCE_CLAY) != TRADE_STATUS_IMPORT) {
                show(WARNING_TRADE_IMPORT_RESOURCE);
            }
        }
    }
}
export function building_construction_warning_check_all(type: building_type, x: number, y: number, size: number) {
    building_construction_warning_check_food_stocks(type);
    check_workers(type);
    check_market(type);
    check_actor_access(type);
    check_gladiator_access(type);
    check_lion_access(type);
    check_charioteer_access(type);
    check_barracks(type);
    check_weapons_access(type);
    check_wall(type, x, y, size);
    check_water(type, x, y);
    check_iron_access(type);
    check_vines_access(type);
    check_olives_access(type);
    check_timber_access(type);
    check_clay_access(type);
    check_road_access(type, x, y, size);
}
export function building_construction_warning_check_food_stocks(type: building_type) {
    if (!has_warning && type == BUILDING_HOUSE_VACANT_LOT) {
        if (city_population() >= 200 && !scenario_property_rome_supplies_wheat()) {
            if (city_resource_food_percentage_produced() <= 95) {
                show(WARNING_MORE_FOOD_NEEDED);
            }
        }
    }
}
export function building_construction_warning_check_reservoir(type: building_type) {
    if (!has_warning && type == BUILDING_RESERVOIR) {
        if (building_count_active(BUILDING_RESERVOIR)) {
            show(WARNING_CONNECT_TO_RESERVOIR);
        } else {
            show(WARNING_PLACE_RESERVOIR_NEXT_TO_WATER);
        }
    }
}
