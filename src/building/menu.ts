
import { building_type } from 'building/type';
import { city_buildings_triumphal_arch_available } from 'city/buildings';
import { config_get, config_key } from 'core/config';
import { empire_can_produce_resource, empire_can_produce_resource_potentially } from 'empire/city';
import { resource_type } from 'game/resource';
import { tutorial_build_buttons, tutorial_get_build_buttons } from 'game/tutorial';
import { scenario_building_allowed } from 'scenario/building';
import { Ref } from '../../ext/crt';
export const BUILD_MENU_ITEM_MAX = 30;
export const enum build_menu_group {
    BUILD_MENU_VACANT_HOUSE = 0,
    BUILD_MENU_CLEAR_LAND = 1,
    BUILD_MENU_ROAD = 2,
    BUILD_MENU_WATER = 3,
    BUILD_MENU_HEALTH = 4,
    BUILD_MENU_TEMPLES = 5,
    BUILD_MENU_EDUCATION = 6,
    BUILD_MENU_ENTERTAINMENT = 7,
    BUILD_MENU_ADMINISTRATION = 8,
    BUILD_MENU_ENGINEERING = 9,
    BUILD_MENU_SECURITY = 10,
    BUILD_MENU_INDUSTRY = 11,
    BUILD_MENU_FARMS = 12,
    BUILD_MENU_RAW_MATERIALS = 13,
    BUILD_MENU_WORKSHOPS = 14,
    BUILD_MENU_SMALL_TEMPLES = 15,
    BUILD_MENU_LARGE_TEMPLES = 16,
    BUILD_MENU_FORTS = 17,
    BUILD_MENU_MAX = 18
};
import BUILDING_MENU_FARMS = building_type.BUILDING_MENU_FARMS;
import BUILDING_MENU_RAW_MATERIALS = building_type.BUILDING_MENU_RAW_MATERIALS;
import BUILDING_MENU_WORKSHOPS = building_type.BUILDING_MENU_WORKSHOPS;
import BUILDING_ROAD = building_type.BUILDING_ROAD;
import BUILDING_WALL = building_type.BUILDING_WALL;
import BUILDING_DRAGGABLE_RESERVOIR = building_type.BUILDING_DRAGGABLE_RESERVOIR;
import BUILDING_AQUEDUCT = building_type.BUILDING_AQUEDUCT;
import BUILDING_CLEAR_LAND = building_type.BUILDING_CLEAR_LAND;
import BUILDING_HOUSE_VACANT_LOT = building_type.BUILDING_HOUSE_VACANT_LOT;
import BUILDING_HOUSE_LUXURY_PALACE = building_type.BUILDING_HOUSE_LUXURY_PALACE;
import BUILDING_AMPHITHEATER = building_type.BUILDING_AMPHITHEATER;
import BUILDING_THEATER = building_type.BUILDING_THEATER;
import BUILDING_HIPPODROME = building_type.BUILDING_HIPPODROME;
import BUILDING_COLOSSEUM = building_type.BUILDING_COLOSSEUM;
import BUILDING_GLADIATOR_SCHOOL = building_type.BUILDING_GLADIATOR_SCHOOL;
import BUILDING_LION_HOUSE = building_type.BUILDING_LION_HOUSE;
import BUILDING_ACTOR_COLONY = building_type.BUILDING_ACTOR_COLONY;
import BUILDING_CHARIOT_MAKER = building_type.BUILDING_CHARIOT_MAKER;
import BUILDING_PLAZA = building_type.BUILDING_PLAZA;
import BUILDING_GARDENS = building_type.BUILDING_GARDENS;
import BUILDING_FORT_LEGIONARIES = building_type.BUILDING_FORT_LEGIONARIES;
import BUILDING_SMALL_STATUE = building_type.BUILDING_SMALL_STATUE;
import BUILDING_MEDIUM_STATUE = building_type.BUILDING_MEDIUM_STATUE;
import BUILDING_LARGE_STATUE = building_type.BUILDING_LARGE_STATUE;
import BUILDING_FORT_JAVELIN = building_type.BUILDING_FORT_JAVELIN;
import BUILDING_FORT_MOUNTED = building_type.BUILDING_FORT_MOUNTED;
import BUILDING_DOCTOR = building_type.BUILDING_DOCTOR;
import BUILDING_HOSPITAL = building_type.BUILDING_HOSPITAL;
import BUILDING_BATHHOUSE = building_type.BUILDING_BATHHOUSE;
import BUILDING_BARBER = building_type.BUILDING_BARBER;
import BUILDING_DISTRIBUTION_CENTER_UNUSED = building_type.BUILDING_DISTRIBUTION_CENTER_UNUSED;
import BUILDING_SCHOOL = building_type.BUILDING_SCHOOL;
import BUILDING_ACADEMY = building_type.BUILDING_ACADEMY;
import BUILDING_LIBRARY = building_type.BUILDING_LIBRARY;
import BUILDING_PREFECTURE = building_type.BUILDING_PREFECTURE;
import BUILDING_TRIUMPHAL_ARCH = building_type.BUILDING_TRIUMPHAL_ARCH;
import BUILDING_FORT = building_type.BUILDING_FORT;
import BUILDING_GATEHOUSE = building_type.BUILDING_GATEHOUSE;
import BUILDING_TOWER = building_type.BUILDING_TOWER;
import BUILDING_SMALL_TEMPLE_CERES = building_type.BUILDING_SMALL_TEMPLE_CERES;
import BUILDING_SMALL_TEMPLE_NEPTUNE = building_type.BUILDING_SMALL_TEMPLE_NEPTUNE;
import BUILDING_SMALL_TEMPLE_MERCURY = building_type.BUILDING_SMALL_TEMPLE_MERCURY;
import BUILDING_SMALL_TEMPLE_MARS = building_type.BUILDING_SMALL_TEMPLE_MARS;
import BUILDING_SMALL_TEMPLE_VENUS = building_type.BUILDING_SMALL_TEMPLE_VENUS;
import BUILDING_LARGE_TEMPLE_CERES = building_type.BUILDING_LARGE_TEMPLE_CERES;
import BUILDING_LARGE_TEMPLE_NEPTUNE = building_type.BUILDING_LARGE_TEMPLE_NEPTUNE;
import BUILDING_LARGE_TEMPLE_MERCURY = building_type.BUILDING_LARGE_TEMPLE_MERCURY;
import BUILDING_LARGE_TEMPLE_MARS = building_type.BUILDING_LARGE_TEMPLE_MARS;
import BUILDING_LARGE_TEMPLE_VENUS = building_type.BUILDING_LARGE_TEMPLE_VENUS;
import BUILDING_MARKET = building_type.BUILDING_MARKET;
import BUILDING_GRANARY = building_type.BUILDING_GRANARY;
import BUILDING_WAREHOUSE = building_type.BUILDING_WAREHOUSE;
import BUILDING_SHIPYARD = building_type.BUILDING_SHIPYARD;
import BUILDING_DOCK = building_type.BUILDING_DOCK;
import BUILDING_WHARF = building_type.BUILDING_WHARF;
import BUILDING_GOVERNORS_HOUSE = building_type.BUILDING_GOVERNORS_HOUSE;
import BUILDING_GOVERNORS_VILLA = building_type.BUILDING_GOVERNORS_VILLA;
import BUILDING_GOVERNORS_PALACE = building_type.BUILDING_GOVERNORS_PALACE;
import BUILDING_MISSION_POST = building_type.BUILDING_MISSION_POST;
import BUILDING_ENGINEERS_POST = building_type.BUILDING_ENGINEERS_POST;
import BUILDING_LOW_BRIDGE = building_type.BUILDING_LOW_BRIDGE;
import BUILDING_SHIP_BRIDGE = building_type.BUILDING_SHIP_BRIDGE;
import BUILDING_SENATE = building_type.BUILDING_SENATE;
import BUILDING_FORUM = building_type.BUILDING_FORUM;
import BUILDING_FOUNTAIN = building_type.BUILDING_FOUNTAIN;
import BUILDING_WELL = building_type.BUILDING_WELL;
import BUILDING_MILITARY_ACADEMY = building_type.BUILDING_MILITARY_ACADEMY;
import BUILDING_BARRACKS = building_type.BUILDING_BARRACKS;
import BUILDING_MENU_SMALL_TEMPLES = building_type.BUILDING_MENU_SMALL_TEMPLES;
import BUILDING_MENU_LARGE_TEMPLES = building_type.BUILDING_MENU_LARGE_TEMPLES;
import BUILDING_ORACLE = building_type.BUILDING_ORACLE;
import BUILDING_WHEAT_FARM = building_type.BUILDING_WHEAT_FARM;
import BUILDING_VEGETABLE_FARM = building_type.BUILDING_VEGETABLE_FARM;
import BUILDING_FRUIT_FARM = building_type.BUILDING_FRUIT_FARM;
import BUILDING_OLIVE_FARM = building_type.BUILDING_OLIVE_FARM;
import BUILDING_VINES_FARM = building_type.BUILDING_VINES_FARM;
import BUILDING_PIG_FARM = building_type.BUILDING_PIG_FARM;
import BUILDING_MARBLE_QUARRY = building_type.BUILDING_MARBLE_QUARRY;
import BUILDING_IRON_MINE = building_type.BUILDING_IRON_MINE;
import BUILDING_TIMBER_YARD = building_type.BUILDING_TIMBER_YARD;
import BUILDING_CLAY_PIT = building_type.BUILDING_CLAY_PIT;
import BUILDING_WINE_WORKSHOP = building_type.BUILDING_WINE_WORKSHOP;
import BUILDING_OIL_WORKSHOP = building_type.BUILDING_OIL_WORKSHOP;
import BUILDING_WEAPONS_WORKSHOP = building_type.BUILDING_WEAPONS_WORKSHOP;
import BUILDING_FURNITURE_WORKSHOP = building_type.BUILDING_FURNITURE_WORKSHOP;
import BUILDING_POTTERY_WORKSHOP = building_type.BUILDING_POTTERY_WORKSHOP;
import BUILD_MENU_SMALL_TEMPLES = build_menu_group.BUILD_MENU_SMALL_TEMPLES;
import BUILD_MENU_LARGE_TEMPLES = build_menu_group.BUILD_MENU_LARGE_TEMPLES;
import BUILD_MENU_MAX = build_menu_group.BUILD_MENU_MAX;;
import CONFIG_UI_ALLOW_CYCLING_TEMPLES = config_key.CONFIG_UI_ALLOW_CYCLING_TEMPLES;
import RESOURCE_WHEAT = resource_type.RESOURCE_WHEAT;
import RESOURCE_VEGETABLES = resource_type.RESOURCE_VEGETABLES;
import RESOURCE_FRUIT = resource_type.RESOURCE_FRUIT;
import RESOURCE_OLIVES = resource_type.RESOURCE_OLIVES;
import RESOURCE_VINES = resource_type.RESOURCE_VINES;
import RESOURCE_MEAT = resource_type.RESOURCE_MEAT;
import RESOURCE_WINE = resource_type.RESOURCE_WINE;
import RESOURCE_OIL = resource_type.RESOURCE_OIL;
import RESOURCE_IRON = resource_type.RESOURCE_IRON;
import RESOURCE_TIMBER = resource_type.RESOURCE_TIMBER;
import RESOURCE_CLAY = resource_type.RESOURCE_CLAY;
import RESOURCE_MARBLE = resource_type.RESOURCE_MARBLE;
import RESOURCE_WEAPONS = resource_type.RESOURCE_WEAPONS;
import RESOURCE_FURNITURE = resource_type.RESOURCE_FURNITURE;
import RESOURCE_POTTERY = resource_type.RESOURCE_POTTERY;
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
import TUT1_BUILD_START = tutorial_build_buttons.TUT1_BUILD_START;
import TUT1_BUILD_AFTER_FIRE = tutorial_build_buttons.TUT1_BUILD_AFTER_FIRE;
import TUT1_BUILD_AFTER_COLLAPSE = tutorial_build_buttons.TUT1_BUILD_AFTER_COLLAPSE;
import TUT2_BUILD_START = tutorial_build_buttons.TUT2_BUILD_START;
import TUT2_BUILD_UP_TO_250 = tutorial_build_buttons.TUT2_BUILD_UP_TO_250;
import TUT2_BUILD_UP_TO_450 = tutorial_build_buttons.TUT2_BUILD_UP_TO_450;
import TUT2_BUILD_AFTER_450 = tutorial_build_buttons.TUT2_BUILD_AFTER_450;
let MENU_BUILDING_TYPE: building_type[][] = [
    [BUILDING_HOUSE_VACANT_LOT, 0],
    [BUILDING_CLEAR_LAND, 0],
    [BUILDING_ROAD, 0],
    [BUILDING_DRAGGABLE_RESERVOIR, BUILDING_AQUEDUCT, BUILDING_FOUNTAIN, BUILDING_WELL, 0],
    [BUILDING_BARBER, BUILDING_BATHHOUSE, BUILDING_DOCTOR, BUILDING_HOSPITAL, 0],
    [BUILDING_MENU_SMALL_TEMPLES, BUILDING_MENU_LARGE_TEMPLES, BUILDING_ORACLE, 0],
    [BUILDING_SCHOOL, BUILDING_ACADEMY, BUILDING_LIBRARY, BUILDING_MISSION_POST, 0],
    [BUILDING_THEATER, BUILDING_AMPHITHEATER, BUILDING_COLOSSEUM, BUILDING_HIPPODROME, BUILDING_GLADIATOR_SCHOOL, BUILDING_LION_HOUSE, BUILDING_ACTOR_COLONY, BUILDING_CHARIOT_MAKER, 0],
    [
        BUILDING_FORUM, BUILDING_SENATE,
        BUILDING_GOVERNORS_HOUSE, BUILDING_GOVERNORS_VILLA, BUILDING_GOVERNORS_PALACE,
        BUILDING_SMALL_STATUE, BUILDING_MEDIUM_STATUE, BUILDING_LARGE_STATUE, BUILDING_TRIUMPHAL_ARCH, 0],
    [
        BUILDING_GARDENS, BUILDING_PLAZA, BUILDING_ENGINEERS_POST, BUILDING_LOW_BRIDGE, BUILDING_SHIP_BRIDGE,
        BUILDING_SHIPYARD, BUILDING_DOCK, BUILDING_WHARF, 0],
    [
        BUILDING_WALL, BUILDING_TOWER, BUILDING_GATEHOUSE, BUILDING_PREFECTURE,
        BUILDING_FORT, BUILDING_MILITARY_ACADEMY, BUILDING_BARRACKS, 0],
    [
        BUILDING_MENU_FARMS, BUILDING_MENU_RAW_MATERIALS, BUILDING_MENU_WORKSHOPS,
        BUILDING_MARKET, BUILDING_GRANARY, BUILDING_WAREHOUSE, 0],
    [
        BUILDING_WHEAT_FARM, BUILDING_VEGETABLE_FARM, BUILDING_FRUIT_FARM,
        BUILDING_OLIVE_FARM, BUILDING_VINES_FARM, BUILDING_PIG_FARM, 0],
    [BUILDING_CLAY_PIT, BUILDING_MARBLE_QUARRY, BUILDING_IRON_MINE, BUILDING_TIMBER_YARD, 0],
    [
        BUILDING_WINE_WORKSHOP, BUILDING_OIL_WORKSHOP, BUILDING_WEAPONS_WORKSHOP,
        BUILDING_FURNITURE_WORKSHOP, BUILDING_POTTERY_WORKSHOP, 0],
    [
        BUILDING_MENU_SMALL_TEMPLES, BUILDING_SMALL_TEMPLE_CERES, BUILDING_SMALL_TEMPLE_NEPTUNE,
        BUILDING_SMALL_TEMPLE_MERCURY, BUILDING_SMALL_TEMPLE_MARS, BUILDING_SMALL_TEMPLE_VENUS, 0],
    [
        BUILDING_MENU_LARGE_TEMPLES, BUILDING_LARGE_TEMPLE_CERES, BUILDING_LARGE_TEMPLE_NEPTUNE,
        BUILDING_LARGE_TEMPLE_MERCURY, BUILDING_LARGE_TEMPLE_MARS, BUILDING_LARGE_TEMPLE_VENUS, 0],
    [BUILDING_FORT_LEGIONARIES, BUILDING_FORT_JAVELIN, BUILDING_FORT_MOUNTED, 0],
];
let menu_enabled: number[] = new Array(BUILD_MENU_MAX);
let changed: number = 1;
export function building_menu_enable_all() {
    for (let sub: number = 0; sub < BUILD_MENU_MAX; sub++) {
        for (let item: number = 0; item < BUILD_MENU_ITEM_MAX; item++) {
            menu_enabled[sub][item] = 1;
        }
    }
}
function enable_house(enabled: Ref<number>, menu_building_type: building_type) {
    if (menu_building_type >= BUILDING_HOUSE_VACANT_LOT && menu_building_type <= BUILDING_HOUSE_LUXURY_PALACE) {
        enabled.v = 1;
    }
}
function enable_clear(enabled: Ref<number>, menu_building_type: building_type) {
    if (menu_building_type == BUILDING_CLEAR_LAND) {
        enabled.v = 1;
    }
}
function enable_cycling_temples_if_allowed(type: building_type) {
    let sub: number = (type == BUILDING_MENU_SMALL_TEMPLES) ? BUILD_MENU_SMALL_TEMPLES : BUILD_MENU_LARGE_TEMPLES;
    menu_enabled[sub][0] = config_get(CONFIG_UI_ALLOW_CYCLING_TEMPLES);
}
function enable_if_allowed(enabled: Ref<number>, menu_building_type: building_type, type: building_type) {
    if (menu_building_type == type && scenario_building_allowed(type)) {
        enabled.v = 1;
        if (type == BUILDING_MENU_SMALL_TEMPLES || type == BUILDING_MENU_LARGE_TEMPLES) {
            enable_cycling_temples_if_allowed(type);
        }
    }
}
function disable_raw(enabled: Ref<number>, menu_building_type: building_type, type: building_type, resource: number) {
    if (type == menu_building_type && !empire_can_produce_resource(resource)) {
        enabled.v = 0;
    }
}
function disable_finished(enabled: Ref<number>, menu_building_type: building_type, type: building_type, resource: number) {
    if (type == menu_building_type && !empire_can_produce_resource_potentially(resource)) {
        enabled.v = 0;
    }
}
function enable_normal(enabled: Ref<number>, type: building_type) {
    enable_house(enabled, type);
    enable_clear(enabled, type);
    enable_if_allowed(enabled, type, BUILDING_ROAD);
    enable_if_allowed(enabled, type, BUILDING_DRAGGABLE_RESERVOIR);
    enable_if_allowed(enabled, type, BUILDING_AQUEDUCT);
    enable_if_allowed(enabled, type, BUILDING_FOUNTAIN);
    enable_if_allowed(enabled, type, BUILDING_WELL);
    enable_if_allowed(enabled, type, BUILDING_BARBER);
    enable_if_allowed(enabled, type, BUILDING_BATHHOUSE);
    enable_if_allowed(enabled, type, BUILDING_DOCTOR);
    enable_if_allowed(enabled, type, BUILDING_HOSPITAL);
    enable_if_allowed(enabled, type, BUILDING_MENU_SMALL_TEMPLES);
    enable_if_allowed(enabled, type, BUILDING_MENU_LARGE_TEMPLES);
    enable_if_allowed(enabled, type, BUILDING_ORACLE);
    enable_if_allowed(enabled, type, BUILDING_SCHOOL);
    enable_if_allowed(enabled, type, BUILDING_ACADEMY);
    enable_if_allowed(enabled, type, BUILDING_LIBRARY);
    enable_if_allowed(enabled, type, BUILDING_THEATER);
    enable_if_allowed(enabled, type, BUILDING_AMPHITHEATER);
    enable_if_allowed(enabled, type, BUILDING_COLOSSEUM);
    enable_if_allowed(enabled, type, BUILDING_HIPPODROME);
    enable_if_allowed(enabled, type, BUILDING_GLADIATOR_SCHOOL);
    enable_if_allowed(enabled, type, BUILDING_LION_HOUSE);
    enable_if_allowed(enabled, type, BUILDING_ACTOR_COLONY);
    enable_if_allowed(enabled, type, BUILDING_CHARIOT_MAKER);
    enable_if_allowed(enabled, type, BUILDING_FORUM);
    enable_if_allowed(enabled, type, BUILDING_SENATE);
    enable_if_allowed(enabled, type, BUILDING_GOVERNORS_HOUSE);
    enable_if_allowed(enabled, type, BUILDING_GOVERNORS_VILLA);
    enable_if_allowed(enabled, type, BUILDING_GOVERNORS_PALACE);
    enable_if_allowed(enabled, type, BUILDING_SMALL_STATUE);
    enable_if_allowed(enabled, type, BUILDING_MEDIUM_STATUE);
    enable_if_allowed(enabled, type, BUILDING_LARGE_STATUE);
    enable_if_allowed(enabled, type, BUILDING_GARDENS);
    enable_if_allowed(enabled, type, BUILDING_PLAZA);
    enable_if_allowed(enabled, type, BUILDING_ENGINEERS_POST);
    enable_if_allowed(enabled, type, BUILDING_MISSION_POST);
    enable_if_allowed(enabled, type, BUILDING_SHIPYARD);
    enable_if_allowed(enabled, type, BUILDING_WHARF);
    enable_if_allowed(enabled, type, BUILDING_DOCK);
    enable_if_allowed(enabled, type, BUILDING_WALL);
    enable_if_allowed(enabled, type, BUILDING_TOWER);
    enable_if_allowed(enabled, type, BUILDING_GATEHOUSE);
    enable_if_allowed(enabled, type, BUILDING_PREFECTURE);
    enable_if_allowed(enabled, type, BUILDING_FORT);
    enable_if_allowed(enabled, type, BUILDING_MILITARY_ACADEMY);
    enable_if_allowed(enabled, type, BUILDING_BARRACKS);
    enable_if_allowed(enabled, type, BUILDING_DISTRIBUTION_CENTER_UNUSED);
    enable_if_allowed(enabled, type, BUILDING_MENU_FARMS);
    enable_if_allowed(enabled, type, BUILDING_MENU_RAW_MATERIALS);
    enable_if_allowed(enabled, type, BUILDING_MENU_WORKSHOPS);
    enable_if_allowed(enabled, type, BUILDING_MARKET);
    enable_if_allowed(enabled, type, BUILDING_GRANARY);
    enable_if_allowed(enabled, type, BUILDING_WAREHOUSE);
    enable_if_allowed(enabled, type, BUILDING_LOW_BRIDGE);
    enable_if_allowed(enabled, type, BUILDING_SHIP_BRIDGE);
    if (type == BUILDING_TRIUMPHAL_ARCH) {
        if (city_buildings_triumphal_arch_available()) {
            enabled.v = 1;
        }
    }
}
function enable_tutorial1_start(enabled: Ref<number>, type: building_type) {
    enable_house(enabled, type);
    enable_clear(enabled, type);
    enable_if_allowed(enabled, type, BUILDING_WELL);
    enable_if_allowed(enabled, type, BUILDING_ROAD);
}
function enable_tutorial1_after_fire(enabled: Ref<number>, type: building_type) {
    enable_tutorial1_start(enabled, type);
    enable_if_allowed(enabled, type, BUILDING_PREFECTURE);
    enable_if_allowed(enabled, type, BUILDING_MARKET);
}
function enable_tutorial1_after_collapse(enabled: Ref<number>, type: building_type) {
    enable_tutorial1_after_fire(enabled, type);
    enable_if_allowed(enabled, type, BUILDING_ENGINEERS_POST);
    enable_if_allowed(enabled, type, BUILDING_SENATE);
}
function enable_tutorial2_start(enabled: Ref<number>, type: building_type) {
    enable_house(enabled, type);
    enable_clear(enabled, type);
    enable_if_allowed(enabled, type, BUILDING_WELL);
    enable_if_allowed(enabled, type, BUILDING_ROAD);
    enable_if_allowed(enabled, type, BUILDING_PREFECTURE);
    enable_if_allowed(enabled, type, BUILDING_ENGINEERS_POST);
    enable_if_allowed(enabled, type, BUILDING_SENATE);
    enable_if_allowed(enabled, type, BUILDING_MARKET);
    enable_if_allowed(enabled, type, BUILDING_GRANARY);
    enable_if_allowed(enabled, type, BUILDING_MENU_FARMS);
    enable_if_allowed(enabled, type, BUILDING_MENU_SMALL_TEMPLES);
}
function enable_tutorial2_up_to_250(enabled: Ref<number>, type: building_type) {
    enable_tutorial2_start(enabled, type);
    enable_if_allowed(enabled, type, BUILDING_DRAGGABLE_RESERVOIR);
    enable_if_allowed(enabled, type, BUILDING_AQUEDUCT);
    enable_if_allowed(enabled, type, BUILDING_FOUNTAIN);
}
function enable_tutorial2_up_to_450(enabled: Ref<number>, type: building_type) {
    enable_tutorial2_up_to_250(enabled, type);
    enable_if_allowed(enabled, type, BUILDING_GARDENS);
    enable_if_allowed(enabled, type, BUILDING_ACTOR_COLONY);
    enable_if_allowed(enabled, type, BUILDING_THEATER);
    enable_if_allowed(enabled, type, BUILDING_BATHHOUSE);
    enable_if_allowed(enabled, type, BUILDING_SCHOOL);
}
function enable_tutorial2_after_450(enabled: Ref<number>, type: building_type) {
    enable_tutorial2_up_to_450(enabled, type);
    enable_if_allowed(enabled, type, BUILDING_MENU_RAW_MATERIALS);
    enable_if_allowed(enabled, type, BUILDING_MENU_WORKSHOPS);
    enable_if_allowed(enabled, type, BUILDING_WAREHOUSE);
    enable_if_allowed(enabled, type, BUILDING_FORUM);
    enable_if_allowed(enabled, type, BUILDING_AMPHITHEATER);
    enable_if_allowed(enabled, type, BUILDING_GLADIATOR_SCHOOL);
}
function disable_resources(enabled: Ref<number>, type: building_type) {
    disable_raw(enabled, type, BUILDING_WHEAT_FARM, RESOURCE_WHEAT);
    disable_raw(enabled, type, BUILDING_VEGETABLE_FARM, RESOURCE_VEGETABLES);
    disable_raw(enabled, type, BUILDING_FRUIT_FARM, RESOURCE_FRUIT);
    disable_raw(enabled, type, BUILDING_PIG_FARM, RESOURCE_MEAT);
    disable_raw(enabled, type, BUILDING_OLIVE_FARM, RESOURCE_OLIVES);
    disable_raw(enabled, type, BUILDING_VINES_FARM, RESOURCE_VINES);
    disable_raw(enabled, type, BUILDING_CLAY_PIT, RESOURCE_CLAY);
    disable_raw(enabled, type, BUILDING_TIMBER_YARD, RESOURCE_TIMBER);
    disable_raw(enabled, type, BUILDING_IRON_MINE, RESOURCE_IRON);
    disable_raw(enabled, type, BUILDING_MARBLE_QUARRY, RESOURCE_MARBLE);
    disable_finished(enabled, type, BUILDING_POTTERY_WORKSHOP, RESOURCE_POTTERY);
    disable_finished(enabled, type, BUILDING_FURNITURE_WORKSHOP, RESOURCE_FURNITURE);
    disable_finished(enabled, type, BUILDING_OIL_WORKSHOP, RESOURCE_OIL);
    disable_finished(enabled, type, BUILDING_WINE_WORKSHOP, RESOURCE_WINE);
    disable_finished(enabled, type, BUILDING_WEAPONS_WORKSHOP, RESOURCE_WEAPONS);
}
export function building_menu_update() {
    let tutorial_buttons: tutorial_build_buttons = tutorial_get_build_buttons();
    for (let sub: number = 0; sub < BUILD_MENU_MAX; sub++) {
        for (let item: number = 0; item < BUILD_MENU_ITEM_MAX; item++) {
            let building_type: number = MENU_BUILDING_TYPE[sub][item];
            let menu_item_ref: Ref<number> = new Ref(menu_enabled[sub][item]);
            if (sub < 12) {
                menu_item_ref.v = 0;
            } else {
                menu_item_ref.v = 1;
            }
            switch (tutorial_buttons) {
                case TUT1_BUILD_START:
                    enable_tutorial1_start(menu_item_ref, building_type);
                    break
                case TUT1_BUILD_AFTER_FIRE:
                    enable_tutorial1_after_fire(menu_item_ref, building_type);
                    break
                case TUT1_BUILD_AFTER_COLLAPSE:
                    enable_tutorial1_after_collapse(menu_item_ref, building_type);
                    break
                case TUT2_BUILD_START:
                    enable_tutorial2_start(menu_item_ref, building_type);
                    break
                case TUT2_BUILD_UP_TO_250:
                    enable_tutorial2_up_to_250(menu_item_ref, building_type);
                    break
                case TUT2_BUILD_UP_TO_450:
                    enable_tutorial2_up_to_450(menu_item_ref, building_type);
                    break
                case TUT2_BUILD_AFTER_450:
                    enable_tutorial2_after_450(menu_item_ref, building_type);
                    break
                default:
                    enable_normal(menu_item_ref, building_type)
                    break
            }
            disable_resources(menu_item_ref, building_type);
            menu_enabled[sub][item] = menu_item_ref.v;
        }
    }
    changed = 1;
}
export function building_menu_count_items(submenu: number) {
    let count: number = 0;
    for (let item: number = 0; item < BUILD_MENU_ITEM_MAX; item++) {
        if (menu_enabled[submenu][item] && MENU_BUILDING_TYPE[submenu][item] > 0) {
            count++;
        }
    }
    return count;
}
export function building_menu_next_index(submenu: number, current_index: number) {
    for (let i: number = current_index + 1; i < BUILD_MENU_ITEM_MAX; i++) {
        if (MENU_BUILDING_TYPE[submenu][i] <= 0) {
            return 0;
        }
        if (menu_enabled[submenu][i]) {
            return i;
        }
    }
    return 0;
}
export function building_menu_type(submenu: number, item: number) {
    return MENU_BUILDING_TYPE[submenu][item];
}
export function building_menu_for_type(type: building_type) {
    for (let sub: number = 0; sub < BUILD_MENU_MAX; sub++) {
        for (let item: number = 0; item < BUILD_MENU_ITEM_MAX && MENU_BUILDING_TYPE[sub][item]; item++) {
            if (MENU_BUILDING_TYPE[sub][item] == type) {
                return sub;
            }
        }
    }
    return -1;
}
export function building_menu_is_enabled(type: building_type) {
    for (let sub: number = 0; sub < BUILD_MENU_MAX; sub++) {
        for (let item: number = 0; item < BUILD_MENU_ITEM_MAX && MENU_BUILDING_TYPE[sub][item]; item++) {
            if (MENU_BUILDING_TYPE[sub][item] == type) {
                return menu_enabled[sub][item];
            }
        }
    }
    return 0;
}
export function building_menu_has_changed() {
    if (changed) {
        changed = 0;
        return 1;
    }
    return 0;
}
