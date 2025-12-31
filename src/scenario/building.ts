
import { building_type } from 'building/type';
import { allowed_building, scenario_t } from 'scenario/data';
import BUILDING_MENU_FARMS = building_type.BUILDING_MENU_FARMS;
import BUILDING_MENU_RAW_MATERIALS = building_type.BUILDING_MENU_RAW_MATERIALS;
import BUILDING_MENU_WORKSHOPS = building_type.BUILDING_MENU_WORKSHOPS;
import BUILDING_ROAD = building_type.BUILDING_ROAD;
import BUILDING_WALL = building_type.BUILDING_WALL;
import BUILDING_DRAGGABLE_RESERVOIR = building_type.BUILDING_DRAGGABLE_RESERVOIR;
import BUILDING_AQUEDUCT = building_type.BUILDING_AQUEDUCT;
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
import ALLOWED_BUILDING_FARMS = allowed_building.ALLOWED_BUILDING_FARMS;
import ALLOWED_BUILDING_RAW_MATERIALS = allowed_building.ALLOWED_BUILDING_RAW_MATERIALS;
import ALLOWED_BUILDING_WORKSHOPS = allowed_building.ALLOWED_BUILDING_WORKSHOPS;
import ALLOWED_BUILDING_ROAD = allowed_building.ALLOWED_BUILDING_ROAD;
import ALLOWED_BUILDING_WALL = allowed_building.ALLOWED_BUILDING_WALL;
import ALLOWED_BUILDING_AQUEDUCT = allowed_building.ALLOWED_BUILDING_AQUEDUCT;
import ALLOWED_BUILDING_AMPHITHEATER = allowed_building.ALLOWED_BUILDING_AMPHITHEATER;
import ALLOWED_BUILDING_THEATER = allowed_building.ALLOWED_BUILDING_THEATER;
import ALLOWED_BUILDING_HIPPODROME = allowed_building.ALLOWED_BUILDING_HIPPODROME;
import ALLOWED_BUILDING_COLOSSEUM = allowed_building.ALLOWED_BUILDING_COLOSSEUM;
import ALLOWED_BUILDING_GLADIATOR_SCHOOL = allowed_building.ALLOWED_BUILDING_GLADIATOR_SCHOOL;
import ALLOWED_BUILDING_LION_HOUSE = allowed_building.ALLOWED_BUILDING_LION_HOUSE;
import ALLOWED_BUILDING_ACTOR_COLONY = allowed_building.ALLOWED_BUILDING_ACTOR_COLONY;
import ALLOWED_BUILDING_CHARIOT_MAKER = allowed_building.ALLOWED_BUILDING_CHARIOT_MAKER;
import ALLOWED_BUILDING_GARDENS = allowed_building.ALLOWED_BUILDING_GARDENS;
import ALLOWED_BUILDING_PLAZA = allowed_building.ALLOWED_BUILDING_PLAZA;
import ALLOWED_BUILDING_STATUES = allowed_building.ALLOWED_BUILDING_STATUES;
import ALLOWED_BUILDING_DOCTOR = allowed_building.ALLOWED_BUILDING_DOCTOR;
import ALLOWED_BUILDING_HOSPITAL = allowed_building.ALLOWED_BUILDING_HOSPITAL;
import ALLOWED_BUILDING_BATHHOUSE = allowed_building.ALLOWED_BUILDING_BATHHOUSE;
import ALLOWED_BUILDING_BARBER = allowed_building.ALLOWED_BUILDING_BARBER;
import ALLOWED_BUILDING_SCHOOL = allowed_building.ALLOWED_BUILDING_SCHOOL;
import ALLOWED_BUILDING_ACADEMY = allowed_building.ALLOWED_BUILDING_ACADEMY;
import ALLOWED_BUILDING_LIBRARY = allowed_building.ALLOWED_BUILDING_LIBRARY;
import ALLOWED_BUILDING_PREFECTURE = allowed_building.ALLOWED_BUILDING_PREFECTURE;
import ALLOWED_BUILDING_FORT = allowed_building.ALLOWED_BUILDING_FORT;
import ALLOWED_BUILDING_GATEHOUSE = allowed_building.ALLOWED_BUILDING_GATEHOUSE;
import ALLOWED_BUILDING_TOWER = allowed_building.ALLOWED_BUILDING_TOWER;
import ALLOWED_BUILDING_SMALL_TEMPLES = allowed_building.ALLOWED_BUILDING_SMALL_TEMPLES;
import ALLOWED_BUILDING_LARGE_TEMPLES = allowed_building.ALLOWED_BUILDING_LARGE_TEMPLES;
import ALLOWED_BUILDING_MARKET = allowed_building.ALLOWED_BUILDING_MARKET;
import ALLOWED_BUILDING_GRANARY = allowed_building.ALLOWED_BUILDING_GRANARY;
import ALLOWED_BUILDING_WAREHOUSE = allowed_building.ALLOWED_BUILDING_WAREHOUSE;
import ALLOWED_BUILDING_DOCK = allowed_building.ALLOWED_BUILDING_DOCK;
import ALLOWED_BUILDING_WHARF = allowed_building.ALLOWED_BUILDING_WHARF;
import ALLOWED_BUILDING_GOVERNOR_HOME = allowed_building.ALLOWED_BUILDING_GOVERNOR_HOME;
import ALLOWED_BUILDING_ENGINEERS_POST = allowed_building.ALLOWED_BUILDING_ENGINEERS_POST;
import ALLOWED_BUILDING_SENATE = allowed_building.ALLOWED_BUILDING_SENATE;
import ALLOWED_BUILDING_FORUM = allowed_building.ALLOWED_BUILDING_FORUM;
import ALLOWED_BUILDING_WELL = allowed_building.ALLOWED_BUILDING_WELL;
import ALLOWED_BUILDING_ORACLE = allowed_building.ALLOWED_BUILDING_ORACLE;
import ALLOWED_BUILDING_MISSION_POST = allowed_building.ALLOWED_BUILDING_MISSION_POST;
import ALLOWED_BUILDING_BRIDGE = allowed_building.ALLOWED_BUILDING_BRIDGE;
import ALLOWED_BUILDING_BARRACKS = allowed_building.ALLOWED_BUILDING_BARRACKS;
import ALLOWED_BUILDING_MILITARY_ACADEMY = allowed_building.ALLOWED_BUILDING_MILITARY_ACADEMY;
import ALLOWED_BUILDING_DISTRIBUTION_CENTER = allowed_building.ALLOWED_BUILDING_DISTRIBUTION_CENTER;
export let scenario: scenario_t = new scenario_t();
export function scenario_building_allowed(building_type: number) {
    switch (building_type) {
        case BUILDING_ROAD:
            return scenario.allowed_buildings[ALLOWED_BUILDING_ROAD];
        case BUILDING_DRAGGABLE_RESERVOIR:
        case BUILDING_AQUEDUCT:
        case BUILDING_FOUNTAIN:
            return scenario.allowed_buildings[ALLOWED_BUILDING_AQUEDUCT];
        case BUILDING_WELL:
            return scenario.allowed_buildings[ALLOWED_BUILDING_WELL];
        case BUILDING_BARBER:
            return scenario.allowed_buildings[ALLOWED_BUILDING_BARBER];
        case BUILDING_BATHHOUSE:
            return scenario.allowed_buildings[ALLOWED_BUILDING_BATHHOUSE];
        case BUILDING_DOCTOR:
            return scenario.allowed_buildings[ALLOWED_BUILDING_DOCTOR];
        case BUILDING_HOSPITAL:
            return scenario.allowed_buildings[ALLOWED_BUILDING_HOSPITAL];
        case BUILDING_MENU_SMALL_TEMPLES:
        case BUILDING_SMALL_TEMPLE_CERES:
        case BUILDING_SMALL_TEMPLE_NEPTUNE:
        case BUILDING_SMALL_TEMPLE_MERCURY:
        case BUILDING_SMALL_TEMPLE_MARS:
        case BUILDING_SMALL_TEMPLE_VENUS:
            return scenario.allowed_buildings[ALLOWED_BUILDING_SMALL_TEMPLES];
        case BUILDING_MENU_LARGE_TEMPLES:
        case BUILDING_LARGE_TEMPLE_CERES:
        case BUILDING_LARGE_TEMPLE_NEPTUNE:
        case BUILDING_LARGE_TEMPLE_MERCURY:
        case BUILDING_LARGE_TEMPLE_MARS:
        case BUILDING_LARGE_TEMPLE_VENUS:
            return scenario.allowed_buildings[ALLOWED_BUILDING_LARGE_TEMPLES];
        case BUILDING_ORACLE:
            return scenario.allowed_buildings[ALLOWED_BUILDING_ORACLE];
        case BUILDING_SCHOOL:
            return scenario.allowed_buildings[ALLOWED_BUILDING_SCHOOL];
        case BUILDING_ACADEMY:
            return scenario.allowed_buildings[ALLOWED_BUILDING_ACADEMY];
        case BUILDING_LIBRARY:
            return scenario.allowed_buildings[ALLOWED_BUILDING_LIBRARY];
        case BUILDING_THEATER:
            return scenario.allowed_buildings[ALLOWED_BUILDING_THEATER];
        case BUILDING_AMPHITHEATER:
            return scenario.allowed_buildings[ALLOWED_BUILDING_AMPHITHEATER];
        case BUILDING_COLOSSEUM:
            return scenario.allowed_buildings[ALLOWED_BUILDING_COLOSSEUM];
        case BUILDING_HIPPODROME:
            return scenario.allowed_buildings[ALLOWED_BUILDING_HIPPODROME];
        case BUILDING_GLADIATOR_SCHOOL:
            return scenario.allowed_buildings[ALLOWED_BUILDING_GLADIATOR_SCHOOL];
        case BUILDING_LION_HOUSE:
            return scenario.allowed_buildings[ALLOWED_BUILDING_LION_HOUSE];
        case BUILDING_ACTOR_COLONY:
            return scenario.allowed_buildings[ALLOWED_BUILDING_ACTOR_COLONY];
        case BUILDING_CHARIOT_MAKER:
            return scenario.allowed_buildings[ALLOWED_BUILDING_CHARIOT_MAKER];
        case BUILDING_FORUM:
            return scenario.allowed_buildings[ALLOWED_BUILDING_FORUM];
        case BUILDING_SENATE:
            return scenario.allowed_buildings[ALLOWED_BUILDING_SENATE];
        case BUILDING_GOVERNORS_HOUSE:
        case BUILDING_GOVERNORS_VILLA:
        case BUILDING_GOVERNORS_PALACE:
            return scenario.allowed_buildings[ALLOWED_BUILDING_GOVERNOR_HOME];
        case BUILDING_SMALL_STATUE:
        case BUILDING_MEDIUM_STATUE:
        case BUILDING_LARGE_STATUE:
            return scenario.allowed_buildings[ALLOWED_BUILDING_STATUES];
        case BUILDING_GARDENS:
            return scenario.allowed_buildings[ALLOWED_BUILDING_GARDENS];
        case BUILDING_PLAZA:
            return scenario.allowed_buildings[ALLOWED_BUILDING_PLAZA];
        case BUILDING_ENGINEERS_POST:
            return scenario.allowed_buildings[ALLOWED_BUILDING_ENGINEERS_POST];
        case BUILDING_MISSION_POST:
            return scenario.allowed_buildings[ALLOWED_BUILDING_MISSION_POST];
        case BUILDING_SHIPYARD:
        case BUILDING_WHARF:
            return scenario.allowed_buildings[ALLOWED_BUILDING_WHARF];
        case BUILDING_DOCK:
            return scenario.allowed_buildings[ALLOWED_BUILDING_DOCK];
        case BUILDING_WALL:
            return scenario.allowed_buildings[ALLOWED_BUILDING_WALL];
        case BUILDING_TOWER:
            return scenario.allowed_buildings[ALLOWED_BUILDING_TOWER];
        case BUILDING_GATEHOUSE:
            return scenario.allowed_buildings[ALLOWED_BUILDING_GATEHOUSE];
        case BUILDING_PREFECTURE:
            return scenario.allowed_buildings[ALLOWED_BUILDING_PREFECTURE];
        case BUILDING_FORT:
        case BUILDING_FORT_LEGIONARIES:
        case BUILDING_FORT_JAVELIN:
        case BUILDING_FORT_MOUNTED:
            return scenario.allowed_buildings[ALLOWED_BUILDING_FORT];
        case BUILDING_MILITARY_ACADEMY:
            return scenario.allowed_buildings[ALLOWED_BUILDING_MILITARY_ACADEMY];
        case BUILDING_BARRACKS:
            return scenario.allowed_buildings[ALLOWED_BUILDING_BARRACKS];
        case BUILDING_DISTRIBUTION_CENTER_UNUSED:
            return scenario.allowed_buildings[ALLOWED_BUILDING_DISTRIBUTION_CENTER];
        case BUILDING_MENU_FARMS:
        case BUILDING_WHEAT_FARM:
        case BUILDING_VEGETABLE_FARM:
        case BUILDING_FRUIT_FARM:
        case BUILDING_OLIVE_FARM:
        case BUILDING_VINES_FARM:
        case BUILDING_PIG_FARM:
            return scenario.allowed_buildings[ALLOWED_BUILDING_FARMS];
        case BUILDING_MENU_RAW_MATERIALS:
        case BUILDING_MARBLE_QUARRY:
        case BUILDING_IRON_MINE:
        case BUILDING_TIMBER_YARD:
        case BUILDING_CLAY_PIT:
            return scenario.allowed_buildings[ALLOWED_BUILDING_RAW_MATERIALS];
        case BUILDING_MENU_WORKSHOPS:
        case BUILDING_WINE_WORKSHOP:
        case BUILDING_OIL_WORKSHOP:
        case BUILDING_WEAPONS_WORKSHOP:
        case BUILDING_FURNITURE_WORKSHOP:
        case BUILDING_POTTERY_WORKSHOP:
            return scenario.allowed_buildings[ALLOWED_BUILDING_WORKSHOPS];
        case BUILDING_MARKET:
            return scenario.allowed_buildings[ALLOWED_BUILDING_MARKET];
        case BUILDING_GRANARY:
            return scenario.allowed_buildings[ALLOWED_BUILDING_GRANARY];
        case BUILDING_WAREHOUSE:
            return scenario.allowed_buildings[ALLOWED_BUILDING_WAREHOUSE];
        case BUILDING_LOW_BRIDGE:
        case BUILDING_SHIP_BRIDGE:
            return scenario.allowed_buildings[ALLOWED_BUILDING_BRIDGE];
    }
    return 1;
}
export function scenario_building_image_native_hut() {
    return scenario.native_images.hut;
}
export function scenario_building_image_native_meeting() {
    return scenario.native_images.meeting;
}
export function scenario_building_image_native_crops() {
    return scenario.native_images.crops;
}
