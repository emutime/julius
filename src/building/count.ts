import { building, building_get, MAX_BUILDINGS } from 'building/building';
import { building_state, building_type } from 'building/type';
import { city_buildings_add_working_dock, city_buildings_add_working_wharf, city_buildings_reset_dock_wharf_counters, city_buildings_set_barracks } from 'city/buildings';
import { city_health_add_hospital_workers, city_health_reset_hospital_workers } from 'city/health';
import { buffer, buffer_read_i32, buffer_write_i32 } from 'core/buffer';
import { figure, figure_get } from 'figure/figure';
import { figure_state } from 'figure/type';
import { resource_type } from 'game/resource';
import { memset } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vcruntime_string';
;
import BUILDING_AMPHITHEATER = building_type.BUILDING_AMPHITHEATER;
import BUILDING_THEATER = building_type.BUILDING_THEATER;
import BUILDING_HIPPODROME = building_type.BUILDING_HIPPODROME;
import BUILDING_COLOSSEUM = building_type.BUILDING_COLOSSEUM;
import BUILDING_GLADIATOR_SCHOOL = building_type.BUILDING_GLADIATOR_SCHOOL;
import BUILDING_LION_HOUSE = building_type.BUILDING_LION_HOUSE;
import BUILDING_ACTOR_COLONY = building_type.BUILDING_ACTOR_COLONY;
import BUILDING_CHARIOT_MAKER = building_type.BUILDING_CHARIOT_MAKER;
import BUILDING_DOCTOR = building_type.BUILDING_DOCTOR;
import BUILDING_HOSPITAL = building_type.BUILDING_HOSPITAL;
import BUILDING_BATHHOUSE = building_type.BUILDING_BATHHOUSE;
import BUILDING_BARBER = building_type.BUILDING_BARBER;
import BUILDING_SCHOOL = building_type.BUILDING_SCHOOL;
import BUILDING_ACADEMY = building_type.BUILDING_ACADEMY;
import BUILDING_LIBRARY = building_type.BUILDING_LIBRARY;
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
import BUILDING_DOCK = building_type.BUILDING_DOCK;
import BUILDING_WHARF = building_type.BUILDING_WHARF;
import BUILDING_SENATE_1_UNUSED = building_type.BUILDING_SENATE_1_UNUSED;
import BUILDING_SENATE = building_type.BUILDING_SENATE;
import BUILDING_FORUM = building_type.BUILDING_FORUM;
import BUILDING_FORUM_2_UNUSED = building_type.BUILDING_FORUM_2_UNUSED;
import BUILDING_RESERVOIR = building_type.BUILDING_RESERVOIR;
import BUILDING_FOUNTAIN = building_type.BUILDING_FOUNTAIN;
import BUILDING_MILITARY_ACADEMY = building_type.BUILDING_MILITARY_ACADEMY;
import BUILDING_BARRACKS = building_type.BUILDING_BARRACKS;
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
import BUILDING_TYPE_MAX = building_type.BUILDING_TYPE_MAX;
import BUILDING_STATE_IN_USE = building_state.BUILDING_STATE_IN_USE;
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
import FIGURE_STATE_ALIVE = figure_state.FIGURE_STATE_ALIVE;
export class record {
    public active: number = 0;
    public total: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.active = args[0]);
        args.length >= 2 && (this.total = args[1]);
    }
}
export class unnamed15_8 {
    public buildings: record[] = new Array(BUILDING_TYPE_MAX).fill(null);
    public industry: record[] = new Array(RESOURCE_MAX).fill(null);
    public constructor(...args: any[]) {
        args.length >= 1 && (this.buildings = args[0]);
        args.length >= 2 && (this.industry = args[1]);
    }
}
let data: unnamed15_8 = new unnamed15_8();
function clear_counters() {
    memset(data, 0);
}
function increase_count(type: building_type, active: number) {
    ++data.buildings[type].total;
    if (active) {
        ++data.buildings[type].active;
    }
}
function increase_industry_count(resource: resource_type, active: number) {
    ++data.industry[resource].total;
    if (active) {
        ++data.industry[resource].active;
    }
}
function limit_hippodrome() {
    if (data.buildings[BUILDING_HIPPODROME].total > 1) {
        data.buildings[BUILDING_HIPPODROME].total = 1;
    }
    if (data.buildings[BUILDING_HIPPODROME].active > 1) {
        data.buildings[BUILDING_HIPPODROME].active = 1;
    }
}
export function building_count_update() {
    clear_counters();
    city_buildings_reset_dock_wharf_counters();
    city_health_reset_hospital_workers();
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state != BUILDING_STATE_IN_USE || b.house_size) {
            continue
        }
        let is_entertainment_venue: number = 0;
        let type: number = b.type;
        switch (type) {
            case BUILDING_THEATER:
            case BUILDING_AMPHITHEATER:
            case BUILDING_COLOSSEUM:
            case BUILDING_HIPPODROME:
                is_entertainment_venue = 1;
                increase_count(type, b.num_workers > 0);
                break
            case BUILDING_BARRACKS:
                city_buildings_set_barracks(i);
                increase_count(type, b.num_workers > 0);
                break
            case BUILDING_HOSPITAL:
                increase_count(type, b.num_workers > 0);
                city_health_add_hospital_workers(b.num_workers);
                break
            case BUILDING_RESERVOIR:
            case BUILDING_FOUNTAIN:
                increase_count(type, b.has_water_access);
                break
            case BUILDING_SCHOOL:
            case BUILDING_LIBRARY:
            case BUILDING_ACADEMY:
            case BUILDING_BARBER:
            case BUILDING_BATHHOUSE:
            case BUILDING_DOCTOR:
            case BUILDING_FORUM:
            case BUILDING_FORUM_2_UNUSED:
            case BUILDING_SENATE_1_UNUSED:
            case BUILDING_SENATE:
            case BUILDING_ACTOR_COLONY:
            case BUILDING_GLADIATOR_SCHOOL:
            case BUILDING_LION_HOUSE:
            case BUILDING_CHARIOT_MAKER:
            case BUILDING_MARKET:
            case BUILDING_MILITARY_ACADEMY:
            case BUILDING_SMALL_TEMPLE_CERES:
            case BUILDING_SMALL_TEMPLE_NEPTUNE:
            case BUILDING_SMALL_TEMPLE_MERCURY:
            case BUILDING_SMALL_TEMPLE_MARS:
            case BUILDING_SMALL_TEMPLE_VENUS:
            case BUILDING_LARGE_TEMPLE_CERES:
            case BUILDING_LARGE_TEMPLE_NEPTUNE:
            case BUILDING_LARGE_TEMPLE_MERCURY:
            case BUILDING_LARGE_TEMPLE_MARS:
            case BUILDING_LARGE_TEMPLE_VENUS:
            case BUILDING_ORACLE:
                increase_count(type, b.num_workers > 0);
                break
            case BUILDING_WHEAT_FARM:
                increase_industry_count(RESOURCE_WHEAT, b.num_workers > 0);
                break
            case BUILDING_VEGETABLE_FARM:
                increase_industry_count(RESOURCE_VEGETABLES, b.num_workers > 0);
                break
            case BUILDING_FRUIT_FARM:
                increase_industry_count(RESOURCE_FRUIT, b.num_workers > 0);
                break
            case BUILDING_OLIVE_FARM:
                increase_industry_count(RESOURCE_OLIVES, b.num_workers > 0);
                break
            case BUILDING_VINES_FARM:
                increase_industry_count(RESOURCE_VINES, b.num_workers > 0);
                break
            case BUILDING_PIG_FARM:
                increase_industry_count(RESOURCE_MEAT, b.num_workers > 0);
                break
            case BUILDING_MARBLE_QUARRY:
                increase_industry_count(RESOURCE_MARBLE, b.num_workers > 0);
                break
            case BUILDING_IRON_MINE:
                increase_industry_count(RESOURCE_IRON, b.num_workers > 0);
                break
            case BUILDING_TIMBER_YARD:
                increase_industry_count(RESOURCE_TIMBER, b.num_workers > 0);
                break
            case BUILDING_CLAY_PIT:
                increase_industry_count(RESOURCE_CLAY, b.num_workers > 0);
                break
            case BUILDING_WINE_WORKSHOP:
                increase_industry_count(RESOURCE_WINE, b.num_workers > 0);
                break
            case BUILDING_OIL_WORKSHOP:
                increase_industry_count(RESOURCE_OIL, b.num_workers > 0);
                break
            case BUILDING_WEAPONS_WORKSHOP:
                increase_industry_count(RESOURCE_WEAPONS, b.num_workers > 0);
                break
            case BUILDING_FURNITURE_WORKSHOP:
                increase_industry_count(RESOURCE_FURNITURE, b.num_workers > 0);
                break
            case BUILDING_POTTERY_WORKSHOP:
                increase_industry_count(RESOURCE_POTTERY, b.num_workers > 0);
                break
            case BUILDING_WHARF:
                if (b.num_workers > 0) {
                    city_buildings_add_working_wharf(!b.data.industry.fishing_boat_id);
                }
                break
            case BUILDING_DOCK:
                if (b.num_workers > 0 && b.has_water_access) {
                    city_buildings_add_working_dock(i);
                }
                break
            default:
                continue
        }
        if (b.immigrant_figure_id) {
            let f: figure = figure_get(b.immigrant_figure_id);
            if (f.state != FIGURE_STATE_ALIVE || f.destination_building_id != i) {
                b.immigrant_figure_id = 0;
            }
        }
        if (is_entertainment_venue) {
            let shows: number = 0;
            if (b.data.entertainment.days1 > 0) {
                --b.data.entertainment.days1;
                ++shows;
            }
            if (b.data.entertainment.days2 > 0) {
                --b.data.entertainment.days2;
                ++shows;
            }
            b.data.entertainment.num_shows = shows;
        }
    }
    limit_hippodrome();
}
export function building_count_active(type: building_type) {
    return data.buildings[type].active;
}
export function building_count_total(type: building_type) {
    return data.buildings[type].total;
}
export function building_count_industry_active(resource: resource_type) {
    return data.industry[resource].active;
}
export function building_count_industry_total(resource: resource_type) {
    return data.industry[resource].total;
}
export function building_count_save_state(industry: buffer, culture1: buffer, culture2: buffer, culture3: buffer, military: buffer, support: buffer) {
    for (let i: number = 0; i < RESOURCE_MAX; i++) {
        buffer_write_i32(industry, data.industry[i].total);
    }
    for (let i: number = 0; i < RESOURCE_MAX; i++) {
        buffer_write_i32(industry, data.industry[i].active);
    }
    buffer_write_i32(culture1, data.buildings[BUILDING_THEATER].total);
    buffer_write_i32(culture1, data.buildings[BUILDING_THEATER].active);
    buffer_write_i32(culture1, data.buildings[BUILDING_AMPHITHEATER].total);
    buffer_write_i32(culture1, data.buildings[BUILDING_AMPHITHEATER].active);
    buffer_write_i32(culture1, data.buildings[BUILDING_COLOSSEUM].total);
    buffer_write_i32(culture1, data.buildings[BUILDING_COLOSSEUM].active);
    buffer_write_i32(culture1, data.buildings[BUILDING_HIPPODROME].total);
    buffer_write_i32(culture1, data.buildings[BUILDING_HIPPODROME].active);
    buffer_write_i32(culture1, data.buildings[BUILDING_SCHOOL].total);
    buffer_write_i32(culture1, data.buildings[BUILDING_SCHOOL].active);
    buffer_write_i32(culture1, data.buildings[BUILDING_LIBRARY].total);
    buffer_write_i32(culture1, data.buildings[BUILDING_LIBRARY].active);
    buffer_write_i32(culture1, data.buildings[BUILDING_ACADEMY].total);
    buffer_write_i32(culture1, data.buildings[BUILDING_ACADEMY].active);
    buffer_write_i32(culture1, data.buildings[BUILDING_BARBER].total);
    buffer_write_i32(culture1, data.buildings[BUILDING_BARBER].active);
    buffer_write_i32(culture1, data.buildings[BUILDING_BATHHOUSE].total);
    buffer_write_i32(culture1, data.buildings[BUILDING_BATHHOUSE].active);
    buffer_write_i32(culture1, data.buildings[BUILDING_DOCTOR].total);
    buffer_write_i32(culture1, data.buildings[BUILDING_DOCTOR].active);
    buffer_write_i32(culture1, data.buildings[BUILDING_HOSPITAL].total);
    buffer_write_i32(culture1, data.buildings[BUILDING_HOSPITAL].active);
    buffer_write_i32(culture1, data.buildings[BUILDING_SMALL_TEMPLE_CERES].total);
    buffer_write_i32(culture1, data.buildings[BUILDING_SMALL_TEMPLE_NEPTUNE].total);
    buffer_write_i32(culture1, data.buildings[BUILDING_SMALL_TEMPLE_MERCURY].total);
    buffer_write_i32(culture1, data.buildings[BUILDING_SMALL_TEMPLE_MARS].total);
    buffer_write_i32(culture1, data.buildings[BUILDING_SMALL_TEMPLE_VENUS].total);
    buffer_write_i32(culture1, data.buildings[BUILDING_LARGE_TEMPLE_CERES].total);
    buffer_write_i32(culture1, data.buildings[BUILDING_LARGE_TEMPLE_NEPTUNE].total);
    buffer_write_i32(culture1, data.buildings[BUILDING_LARGE_TEMPLE_MERCURY].total);
    buffer_write_i32(culture1, data.buildings[BUILDING_LARGE_TEMPLE_MARS].total);
    buffer_write_i32(culture1, data.buildings[BUILDING_LARGE_TEMPLE_VENUS].total);
    buffer_write_i32(culture1, data.buildings[BUILDING_ORACLE].total);
    buffer_write_i32(culture2, data.buildings[BUILDING_ACTOR_COLONY].total);
    buffer_write_i32(culture2, data.buildings[BUILDING_ACTOR_COLONY].active);
    buffer_write_i32(culture2, data.buildings[BUILDING_GLADIATOR_SCHOOL].total);
    buffer_write_i32(culture2, data.buildings[BUILDING_GLADIATOR_SCHOOL].active);
    buffer_write_i32(culture2, data.buildings[BUILDING_LION_HOUSE].total);
    buffer_write_i32(culture2, data.buildings[BUILDING_LION_HOUSE].active);
    buffer_write_i32(culture2, data.buildings[BUILDING_CHARIOT_MAKER].total);
    buffer_write_i32(culture2, data.buildings[BUILDING_CHARIOT_MAKER].active);
    buffer_write_i32(culture3, data.buildings[BUILDING_SMALL_TEMPLE_CERES].active);
    buffer_write_i32(culture3, data.buildings[BUILDING_SMALL_TEMPLE_NEPTUNE].active);
    buffer_write_i32(culture3, data.buildings[BUILDING_SMALL_TEMPLE_MERCURY].active);
    buffer_write_i32(culture3, data.buildings[BUILDING_SMALL_TEMPLE_MARS].active);
    buffer_write_i32(culture3, data.buildings[BUILDING_SMALL_TEMPLE_VENUS].active);
    buffer_write_i32(culture3, data.buildings[BUILDING_LARGE_TEMPLE_CERES].active);
    buffer_write_i32(culture3, data.buildings[BUILDING_LARGE_TEMPLE_NEPTUNE].active);
    buffer_write_i32(culture3, data.buildings[BUILDING_LARGE_TEMPLE_MERCURY].active);
    buffer_write_i32(culture3, data.buildings[BUILDING_LARGE_TEMPLE_MARS].active);
    buffer_write_i32(culture3, data.buildings[BUILDING_LARGE_TEMPLE_VENUS].active);
    buffer_write_i32(military, data.buildings[BUILDING_MILITARY_ACADEMY].total);
    buffer_write_i32(military, data.buildings[BUILDING_MILITARY_ACADEMY].active);
    buffer_write_i32(military, data.buildings[BUILDING_BARRACKS].total);
    buffer_write_i32(military, data.buildings[BUILDING_BARRACKS].active);
    buffer_write_i32(support, data.buildings[BUILDING_MARKET].total);
    buffer_write_i32(support, data.buildings[BUILDING_MARKET].active);
    buffer_write_i32(support, data.buildings[BUILDING_RESERVOIR].total);
    buffer_write_i32(support, data.buildings[BUILDING_RESERVOIR].active);
    buffer_write_i32(support, data.buildings[BUILDING_FOUNTAIN].total);
    buffer_write_i32(support, data.buildings[BUILDING_FOUNTAIN].active);
}
export function building_count_load_state(industry: buffer, culture1: buffer, culture2: buffer, culture3: buffer, military: buffer, support: buffer) {
    for (let i: number = 0; i < RESOURCE_MAX; i++) {
        data.industry[i].total = buffer_read_i32(industry);
    }
    for (let i: number = 0; i < RESOURCE_MAX; i++) {
        data.industry[i].active = buffer_read_i32(industry);
    }
    data.buildings[BUILDING_THEATER].total = buffer_read_i32(culture1);
    data.buildings[BUILDING_THEATER].active = buffer_read_i32(culture1);
    data.buildings[BUILDING_AMPHITHEATER].total = buffer_read_i32(culture1);
    data.buildings[BUILDING_AMPHITHEATER].active = buffer_read_i32(culture1);
    data.buildings[BUILDING_COLOSSEUM].total = buffer_read_i32(culture1);
    data.buildings[BUILDING_COLOSSEUM].active = buffer_read_i32(culture1);
    data.buildings[BUILDING_HIPPODROME].total = buffer_read_i32(culture1);
    data.buildings[BUILDING_HIPPODROME].active = buffer_read_i32(culture1);
    data.buildings[BUILDING_SCHOOL].total = buffer_read_i32(culture1);
    data.buildings[BUILDING_SCHOOL].active = buffer_read_i32(culture1);
    data.buildings[BUILDING_LIBRARY].total = buffer_read_i32(culture1);
    data.buildings[BUILDING_LIBRARY].active = buffer_read_i32(culture1);
    data.buildings[BUILDING_ACADEMY].total = buffer_read_i32(culture1);
    data.buildings[BUILDING_ACADEMY].active = buffer_read_i32(culture1);
    data.buildings[BUILDING_BARBER].total = buffer_read_i32(culture1);
    data.buildings[BUILDING_BARBER].active = buffer_read_i32(culture1);
    data.buildings[BUILDING_BATHHOUSE].total = buffer_read_i32(culture1);
    data.buildings[BUILDING_BATHHOUSE].active = buffer_read_i32(culture1);
    data.buildings[BUILDING_DOCTOR].total = buffer_read_i32(culture1);
    data.buildings[BUILDING_DOCTOR].active = buffer_read_i32(culture1);
    data.buildings[BUILDING_HOSPITAL].total = buffer_read_i32(culture1);
    data.buildings[BUILDING_HOSPITAL].active = buffer_read_i32(culture1);
    data.buildings[BUILDING_SMALL_TEMPLE_CERES].total = buffer_read_i32(culture1);
    data.buildings[BUILDING_SMALL_TEMPLE_NEPTUNE].total = buffer_read_i32(culture1);
    data.buildings[BUILDING_SMALL_TEMPLE_MERCURY].total = buffer_read_i32(culture1);
    data.buildings[BUILDING_SMALL_TEMPLE_MARS].total = buffer_read_i32(culture1);
    data.buildings[BUILDING_SMALL_TEMPLE_VENUS].total = buffer_read_i32(culture1);
    data.buildings[BUILDING_LARGE_TEMPLE_CERES].total = buffer_read_i32(culture1);
    data.buildings[BUILDING_LARGE_TEMPLE_NEPTUNE].total = buffer_read_i32(culture1);
    data.buildings[BUILDING_LARGE_TEMPLE_MERCURY].total = buffer_read_i32(culture1);
    data.buildings[BUILDING_LARGE_TEMPLE_MARS].total = buffer_read_i32(culture1);
    data.buildings[BUILDING_LARGE_TEMPLE_VENUS].total = buffer_read_i32(culture1);
    data.buildings[BUILDING_ORACLE].total = buffer_read_i32(culture1);
    data.buildings[BUILDING_ACTOR_COLONY].total = buffer_read_i32(culture2);
    data.buildings[BUILDING_ACTOR_COLONY].active = buffer_read_i32(culture2);
    data.buildings[BUILDING_GLADIATOR_SCHOOL].total = buffer_read_i32(culture2);
    data.buildings[BUILDING_GLADIATOR_SCHOOL].active = buffer_read_i32(culture2);
    data.buildings[BUILDING_LION_HOUSE].total = buffer_read_i32(culture2);
    data.buildings[BUILDING_LION_HOUSE].active = buffer_read_i32(culture2);
    data.buildings[BUILDING_CHARIOT_MAKER].total = buffer_read_i32(culture2);
    data.buildings[BUILDING_CHARIOT_MAKER].active = buffer_read_i32(culture2);
    data.buildings[BUILDING_SMALL_TEMPLE_CERES].active = buffer_read_i32(culture3);
    data.buildings[BUILDING_SMALL_TEMPLE_NEPTUNE].active = buffer_read_i32(culture3);
    data.buildings[BUILDING_SMALL_TEMPLE_MERCURY].active = buffer_read_i32(culture3);
    data.buildings[BUILDING_SMALL_TEMPLE_MARS].active = buffer_read_i32(culture3);
    data.buildings[BUILDING_SMALL_TEMPLE_VENUS].active = buffer_read_i32(culture3);
    data.buildings[BUILDING_LARGE_TEMPLE_CERES].active = buffer_read_i32(culture3);
    data.buildings[BUILDING_LARGE_TEMPLE_NEPTUNE].active = buffer_read_i32(culture3);
    data.buildings[BUILDING_LARGE_TEMPLE_MERCURY].active = buffer_read_i32(culture3);
    data.buildings[BUILDING_LARGE_TEMPLE_MARS].active = buffer_read_i32(culture3);
    data.buildings[BUILDING_LARGE_TEMPLE_VENUS].active = buffer_read_i32(culture3);
    data.buildings[BUILDING_MILITARY_ACADEMY].total = buffer_read_i32(military);
    data.buildings[BUILDING_MILITARY_ACADEMY].active = buffer_read_i32(military);
    data.buildings[BUILDING_BARRACKS].total = buffer_read_i32(military);
    data.buildings[BUILDING_BARRACKS].active = buffer_read_i32(military);
    data.buildings[BUILDING_MARKET].total = buffer_read_i32(support);
    data.buildings[BUILDING_MARKET].active = buffer_read_i32(support);
    data.buildings[BUILDING_RESERVOIR].total = buffer_read_i32(support);
    data.buildings[BUILDING_RESERVOIR].active = buffer_read_i32(support);
    data.buildings[BUILDING_FOUNTAIN].total = buffer_read_i32(support);
    data.buildings[BUILDING_FOUNTAIN].active = buffer_read_i32(support);
}
