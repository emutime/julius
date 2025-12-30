export const MAX_COVERAGE = 96;
import { building, building_get, building_main } from 'building/building';
import { model_get_house, model_house } from 'building/model';
import { building_type, house_level } from 'building/type';
import { figure_action } from 'figure/action';
import { figure } from 'figure/figure';
import { figure_type } from 'figure/type';
import { figure_rioter_collapse_building } from 'figuretype/crime';
import { inventory_type } from 'game/resource';
import { map_building_at } from 'map/building';
import { GRID, map_grid_get_area, map_grid_offset } from 'map/grid';
import FIGURE_ACTION_94_ENTERTAINER_ROAMING = figure_action.FIGURE_ACTION_94_ENTERTAINER_ROAMING;
import FIGURE_ACTION_95_ENTERTAINER_RETURNING = figure_action.FIGURE_ACTION_95_ENTERTAINER_RETURNING;
import FIGURE_LABOR_SEEKER = figure_type.FIGURE_LABOR_SEEKER;
import FIGURE_TAX_COLLECTOR = figure_type.FIGURE_TAX_COLLECTOR;
import FIGURE_ENGINEER = figure_type.FIGURE_ENGINEER;
import FIGURE_PREFECT = figure_type.FIGURE_PREFECT;
import FIGURE_ACTOR = figure_type.FIGURE_ACTOR;
import FIGURE_GLADIATOR = figure_type.FIGURE_GLADIATOR;
import FIGURE_LION_TAMER = figure_type.FIGURE_LION_TAMER;
import FIGURE_CHARIOTEER = figure_type.FIGURE_CHARIOTEER;
import FIGURE_RIOTER = figure_type.FIGURE_RIOTER;
import FIGURE_MARKET_TRADER = figure_type.FIGURE_MARKET_TRADER;
import FIGURE_PRIEST = figure_type.FIGURE_PRIEST;
import FIGURE_SCHOOL_CHILD = figure_type.FIGURE_SCHOOL_CHILD;
import FIGURE_TEACHER = figure_type.FIGURE_TEACHER;
import FIGURE_LIBRARIAN = figure_type.FIGURE_LIBRARIAN;
import FIGURE_BARBER = figure_type.FIGURE_BARBER;
import FIGURE_BATHHOUSE_WORKER = figure_type.FIGURE_BATHHOUSE_WORKER;
import FIGURE_DOCTOR = figure_type.FIGURE_DOCTOR;
import FIGURE_SURGEON = figure_type.FIGURE_SURGEON;
import FIGURE_MARKET_BUYER = figure_type.FIGURE_MARKET_BUYER;
import FIGURE_PATRICIAN = figure_type.FIGURE_PATRICIAN;
import FIGURE_MISSIONARY = figure_type.FIGURE_MISSIONARY;
import BUILDING_AMPHITHEATER = building_type.BUILDING_AMPHITHEATER;
import BUILDING_THEATER = building_type.BUILDING_THEATER;
import BUILDING_HIPPODROME = building_type.BUILDING_HIPPODROME;
import BUILDING_COLOSSEUM = building_type.BUILDING_COLOSSEUM;
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
import BUILDING_NATIVE_HUT = building_type.BUILDING_NATIVE_HUT;
import BUILDING_NATIVE_MEETING = building_type.BUILDING_NATIVE_MEETING;
import HOUSE_LUXURY_PALACE = house_level.HOUSE_LUXURY_PALACE;
import INVENTORY_WINE = inventory_type.INVENTORY_WINE;
import INVENTORY_OIL = inventory_type.INVENTORY_OIL;
import INVENTORY_FURNITURE = inventory_type.INVENTORY_FURNITURE;
import INVENTORY_POTTERY = inventory_type.INVENTORY_POTTERY;
import INVENTORY_MIN_FOOD = inventory_type.INVENTORY_MIN_FOOD;
import INVENTORY_MAX_FOOD = inventory_type.INVENTORY_MAX_FOOD;
import GRID_SIZE = GRID.GRID_SIZE;
function provide_culture(x: number, y: number, callback: (b: building) => void) {
    let serviced: number = 0;
    let x_min: number
    let y_min: number
    let x_max: number
    let y_max: number;
    map_grid_get_area(x, y, 1, 2, x_min, y_min, x_max, y_max);
    for (let yy: number = y_min; yy <= y_max; yy++) {
        for (let xx: number = x_min; xx <= x_max; xx++) {
            let grid_offset: number = map_grid_offset(xx, yy);
            let building_id: number = map_building_at(grid_offset);
            if (building_id) {
                let b: building = building_get(building_id);
                if (b.house_size && b.house_population > 0) {
                    callback(b);
                    serviced++;
                }
            }
        }
    }
    return serviced;
}
function provide_entertainment(x: number, y: number, shows: number, callback: (b: building, shows: number) => void) {
    let serviced: number = 0;
    let x_min: number
    let y_min: number
    let x_max: number
    let y_max: number;
    map_grid_get_area(x, y, 1, 2, x_min, y_min, x_max, y_max);
    for (let yy: number = y_min; yy <= y_max; yy++) {
        for (let xx: number = x_min; xx <= x_max; xx++) {
            let grid_offset: number = map_grid_offset(xx, yy);
            let building_id: number = map_building_at(grid_offset);
            if (building_id) {
                let b: building = building_get(building_id);
                if (b.house_size && b.house_population > 0) {
                    callback(b, shows);
                    serviced++;
                }
            }
        }
    }
    return serviced;
}
function labor_seeker_coverage(b: building) {
}
function theater_coverage(b: building) {
    b.data.house.theater = MAX_COVERAGE;
}
function amphitheater_coverage(b: building, shows: number) {
    b.data.house.amphitheater_actor = MAX_COVERAGE;
    if (shows == 2) {
        b.data.house.amphitheater_gladiator = MAX_COVERAGE;
    }
}
function colosseum_coverage(b: building, shows: number) {
    b.data.house.colosseum_gladiator = MAX_COVERAGE;
    if (shows == 2) {
        b.data.house.colosseum_lion = MAX_COVERAGE;
    }
}
function hippodrome_coverage(b: building) {
    b.data.house.hippodrome = MAX_COVERAGE;
}
function bathhouse_coverage(b: building) {
    b.data.house.bathhouse = MAX_COVERAGE;
}
function religion_coverage_ceres(b: building) {
    b.data.house.temple_ceres = MAX_COVERAGE;
}
function religion_coverage_neptune(b: building) {
    b.data.house.temple_neptune = MAX_COVERAGE;
}
function religion_coverage_mercury(b: building) {
    b.data.house.temple_mercury = MAX_COVERAGE;
}
function religion_coverage_mars(b: building) {
    b.data.house.temple_mars = MAX_COVERAGE;
}
function religion_coverage_venus(b: building) {
    b.data.house.temple_venus = MAX_COVERAGE;
}
function school_coverage(b: building) {
    b.data.house.school = MAX_COVERAGE;
}
function academy_coverage(b: building) {
    b.data.house.academy = MAX_COVERAGE;
}
function library_coverage(b: building) {
    b.data.house.library = MAX_COVERAGE;
}
function barber_coverage(b: building) {
    b.data.house.barber = MAX_COVERAGE;
}
function clinic_coverage(b: building) {
    b.data.house.clinic = MAX_COVERAGE;
}
function hospital_coverage(b: building) {
    b.data.house.hospital = MAX_COVERAGE;
}
function provide_missionary_coverage(x: number, y: number) {
    let x_min: number
    let y_min: number
    let x_max: number
    let y_max: number;
    map_grid_get_area(x, y, 1, 4, x_min, y_min, x_max, y_max);
    for (let yy: number = y_min; yy <= y_max; yy++) {
        for (let xx: number = x_min; xx <= x_max; xx++) {
            let building_id: number = map_building_at(map_grid_offset(xx, yy));
            if (building_id) {
                let b: building = building_get(building_id);
                if (b.type == BUILDING_NATIVE_HUT || b.type == BUILDING_NATIVE_MEETING) {
                    b.sentiment.native_anger = 0;
                }
            }
        }
    }
    return 1;
}
function provide_service(x: number, y: number, data: any, callback: (b: building, data: any) => void): number {
    let serviced: number = 0;
    let x_min: number
    let y_min: number
    let x_max: number
    let y_max: number;
    map_grid_get_area(x, y, 1, 2, x_min, y_min, x_max, y_max);
    for (let yy: number = y_min; yy <= y_max; yy++) {
        for (let xx: number = x_min; xx <= x_max; xx++) {
            let grid_offset: number = map_grid_offset(xx, yy);
            let building_id: number = map_building_at(grid_offset);
            if (building_id) {
                let b: building = building_get(building_id);
                callback(b, data);
                if (b.house_size && b.house_population > 0) {
                    serviced++;
                }
            }
        }
    }
    return serviced;
}
function engineer_coverage(b: building, max_damage_seen: { value: number }) {
    if (b.type == BUILDING_HIPPODROME) {
        b = building_main(b);
    }
    if (b.damage_risk > max_damage_seen.value) {
        max_damage_seen.value = b.damage_risk;
    }
    b.damage_risk = 0;
}
function prefect_coverage(b: building, min_happiness_seen: { value: number }) {
    if (b.type == BUILDING_HIPPODROME) {
        b = building_main(b);
    }
    b.fire_risk = 0;
    if (b.sentiment.house_happiness < min_happiness_seen.value) {
        min_happiness_seen.value = b.sentiment.house_happiness;
    }
}
function tax_collector_coverage(b: building, max_tax_multiplier: { value: number }) {
    if (b.house_size && b.house_population > 0) {
        let tax_multiplier: number = model_get_house(b.subtype.house_level).tax_multiplier;
        if (tax_multiplier > max_tax_multiplier.value) {
            max_tax_multiplier.value = tax_multiplier;
        }
        b.house_tax_coverage = 50;
    }
}
function distribute_good(b: building, market: building, stock_wanted: number, inventory_resource: number) {
    let amount_wanted: number = stock_wanted - b.data.house.inventory[inventory_resource];
    if (market.data.market.inventory[inventory_resource] > 0 && amount_wanted > 0) {
        if (amount_wanted <= market.data.market.inventory[inventory_resource]) {
            b.data.house.inventory[inventory_resource] += amount_wanted
            market.data.market.inventory[inventory_resource] -= amount_wanted
        } else {
            b.data.house.inventory[inventory_resource] += market.data.market.inventory[inventory_resource]
            market.data.market.inventory[inventory_resource] = 0;
        }
    }
}
function distribute_market_resources(b: building, market: building) {
    let level: number = b.subtype.house_level;
    if (level < HOUSE_LUXURY_PALACE) {
        level++;
    }
    let max_food_stocks: number = 4 * b.house_highest_population;
    let food_types_stored_max: number = 0;
    for (let i: number = INVENTORY_MIN_FOOD; i < INVENTORY_MAX_FOOD; i++) {
        if (b.data.house.inventory[i] >= max_food_stocks) {
            food_types_stored_max++;
        }
    }
    let model: model_house = model_get_house(level);
    if (model.food_types > food_types_stored_max) {
        for (let i: number = INVENTORY_MIN_FOOD; i < INVENTORY_MAX_FOOD; i++) {
            if (b.data.house.inventory[i] >= max_food_stocks) {
                continue
            }
            if (market.data.market.inventory[i] >= max_food_stocks) {
                b.data.house.inventory[i] += max_food_stocks
                market.data.market.inventory[i] -= max_food_stocks
                break
            } else if (market.data.market.inventory[i]) {
                b.data.house.inventory[i] += market.data.market.inventory[i]
                market.data.market.inventory[i] = 0;
                break
            }
        }
    }
    if (model.pottery) {
        market.data.market.pottery_demand = 10;
        distribute_good(b, market, 8 * model.pottery, INVENTORY_POTTERY);
    }
    if (model.furniture) {
        market.data.market.furniture_demand = 10;
        distribute_good(b, market, 4 * model.furniture, INVENTORY_FURNITURE);
    }
    if (model.oil) {
        market.data.market.oil_demand = 10;
        distribute_good(b, market, 4 * model.oil, INVENTORY_OIL);
    }
    if (model.wine) {
        market.data.market.wine_demand = 10;
        distribute_good(b, market, 4 * model.wine, INVENTORY_WINE);
    }
}
function provide_market_goods(market_building_id: number, x: number, y: number) {
    let serviced: number = 0;
    let market: building = building_get(market_building_id);
    let x_min: number
    let y_min: number
    let x_max: number
    let y_max: number;
    map_grid_get_area(x, y, 1, 2, x_min, y_min, x_max, y_max);
    for (let yy: number = y_min; yy <= y_max; yy++) {
        for (let xx: number = x_min; xx <= x_max; xx++) {
            let grid_offset: number = map_grid_offset(xx, yy);
            let building_id: number = map_building_at(grid_offset);
            if (building_id) {
                let b: building = building_get(building_id);
                if (b.house_size && b.house_population > 0) {
                    distribute_market_resources(b, market);
                    serviced++;
                }
            }
        }
    }
    return serviced;
}
function get_entertainment_building(f: figure) {
    if (f.action_state == FIGURE_ACTION_94_ENTERTAINER_ROAMING ||
        f.action_state == FIGURE_ACTION_95_ENTERTAINER_RETURNING) {
        return building_get(f.building_id);
    } else {
        return building_get(f.destination_building_id);
    }
}
export function figure_service_provide_coverage(f: figure) {
    let houses_serviced: number = 0;
    let x: number = f.x;
    let y: number = f.y;
    let b: building;
    switch (f.type) {
        case FIGURE_PATRICIAN:
            return 0;
        case FIGURE_LABOR_SEEKER:
            houses_serviced = provide_culture(x, y, labor_seeker_coverage);
            break
        case FIGURE_TAX_COLLECTOR:
            {
                let max_tax_rate = { value: 0 };
                houses_serviced = provide_service(x, y, max_tax_rate, tax_collector_coverage);
                f.min_max_seen = max_tax_rate.value;
                break
            }
        case FIGURE_MARKET_TRADER:
        case FIGURE_MARKET_BUYER:
            houses_serviced = provide_market_goods(f.building_id, x, y);
            break
        case FIGURE_BATHHOUSE_WORKER:
            houses_serviced = provide_culture(x, y, bathhouse_coverage);
            break
        case FIGURE_SCHOOL_CHILD:
            houses_serviced = provide_culture(x, y, school_coverage);
            break
        case FIGURE_TEACHER:
            houses_serviced = provide_culture(x, y, academy_coverage);
            break
        case FIGURE_LIBRARIAN:
            houses_serviced = provide_culture(x, y, library_coverage);
            break
        case FIGURE_BARBER:
            houses_serviced = provide_culture(x, y, barber_coverage);
            break
        case FIGURE_DOCTOR:
            houses_serviced = provide_culture(x, y, clinic_coverage);
            break
        case FIGURE_SURGEON:
            houses_serviced = provide_culture(x, y, hospital_coverage);
            break
        case FIGURE_MISSIONARY:
            houses_serviced = provide_missionary_coverage(x, y);
            break
        case FIGURE_PRIEST:
            switch (building_get(f.building_id).type) {
                case BUILDING_SMALL_TEMPLE_CERES:
                case BUILDING_LARGE_TEMPLE_CERES:
                    houses_serviced = provide_culture(x, y, religion_coverage_ceres);
                    break
                case BUILDING_SMALL_TEMPLE_NEPTUNE:
                case BUILDING_LARGE_TEMPLE_NEPTUNE:
                    houses_serviced = provide_culture(x, y, religion_coverage_neptune);
                    break
                case BUILDING_SMALL_TEMPLE_MERCURY:
                case BUILDING_LARGE_TEMPLE_MERCURY:
                    houses_serviced = provide_culture(x, y, religion_coverage_mercury);
                    break
                case BUILDING_SMALL_TEMPLE_MARS:
                case BUILDING_LARGE_TEMPLE_MARS:
                    houses_serviced = provide_culture(x, y, religion_coverage_mars);
                    break
                case BUILDING_SMALL_TEMPLE_VENUS:
                case BUILDING_LARGE_TEMPLE_VENUS:
                    houses_serviced = provide_culture(x, y, religion_coverage_venus);
                    break
                default:
                    break
            }
            break
        case FIGURE_ACTOR:
            b = get_entertainment_building(f);
            if (b.type == BUILDING_THEATER) {
                houses_serviced = provide_culture(x, y, theater_coverage);
            } else if (b.type == BUILDING_AMPHITHEATER) {
                houses_serviced = provide_entertainment(x, y,
                    b.data.entertainment.days1 ? 2 : 1, amphitheater_coverage);
            }
            break
        case FIGURE_GLADIATOR:
            b = get_entertainment_building(f);
            if (b.type == BUILDING_AMPHITHEATER) {
                houses_serviced = provide_entertainment(x, y,
                    b.data.entertainment.days2 ? 2 : 1, amphitheater_coverage);
            } else if (b.type == BUILDING_COLOSSEUM) {
                houses_serviced = provide_entertainment(x, y,
                    b.data.entertainment.days1 ? 2 : 1, colosseum_coverage);
            }
            break
        case FIGURE_LION_TAMER:
            b = get_entertainment_building(f);
            houses_serviced = provide_entertainment(x, y,
                b.data.entertainment.days2 ? 2 : 1, colosseum_coverage);
            break
        case FIGURE_CHARIOTEER:
            houses_serviced = provide_culture(x, y, hippodrome_coverage);
            break
        case FIGURE_ENGINEER:
            {
                let max_damage = { value: 0 };
                houses_serviced = provide_service(x, y, max_damage, engineer_coverage);
                if (max_damage.value > f.min_max_seen) {
                    f.min_max_seen = max_damage.value;
                } else if (f.min_max_seen <= 10) {
                    f.min_max_seen = 0;
                } else {
                    f.min_max_seen -= 10
                }
                break
            }
        case FIGURE_PREFECT:
            {
                let min_happiness = { value: 100 };
                houses_serviced = provide_service(x, y, min_happiness, prefect_coverage);
                f.min_max_seen = min_happiness.value;
                break
            }
        case FIGURE_RIOTER:
            if (figure_rioter_collapse_building(f) == 1) {
                return 1;
            }
            break
    }
    if (f.building_id) {
        b = building_get(f.building_id);
        b.houses_covered += houses_serviced
        if (b.houses_covered > 300) {
            b.houses_covered = 300;
        }
    }
    return 0;
}
