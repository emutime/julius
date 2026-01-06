
import { building_destroy_first_of_type } from 'building/destruction';
import { building_type } from 'building/type';
import { city_health, city_health_change } from 'city/health';
import { city_labor_lower_wages_rome, city_labor_raise_wages_rome } from 'city/labor';
import { city_message_post, city_message_type } from 'city/message';
import { city_population } from 'city/population';
import { city_trade_has_land_trade_route, city_trade_has_sea_trade_route, city_trade_start_land_trade_problems, city_trade_start_sea_trade_problems } from 'city/trade';
import { random_byte } from 'core/random';
import { scenario_climate, scenario_property_climate } from 'scenario/property';
import { scenario_t } from './data';
import BUILDING_IRON_MINE = building_type.BUILDING_IRON_MINE;
import BUILDING_CLAY_PIT = building_type.BUILDING_CLAY_PIT;
import MESSAGE_LAND_TRADE_DISRUPTED_SANDSTORMS = city_message_type.MESSAGE_LAND_TRADE_DISRUPTED_SANDSTORMS;
import MESSAGE_SEA_TRADE_DISRUPTED = city_message_type.MESSAGE_SEA_TRADE_DISRUPTED;
import MESSAGE_LAND_TRADE_DISRUPTED_LANDSLIDES = city_message_type.MESSAGE_LAND_TRADE_DISRUPTED_LANDSLIDES;
import MESSAGE_ROME_RAISES_WAGES = city_message_type.MESSAGE_ROME_RAISES_WAGES;
import MESSAGE_ROME_LOWERS_WAGES = city_message_type.MESSAGE_ROME_LOWERS_WAGES;
import MESSAGE_CONTAMINATED_WATER = city_message_type.MESSAGE_CONTAMINATED_WATER;
import MESSAGE_IRON_MINE_COLLAPED = city_message_type.MESSAGE_IRON_MINE_COLLAPED;
import MESSAGE_CLAY_PIT_FLOODED = city_message_type.MESSAGE_CLAY_PIT_FLOODED;
export let scenario: scenario_t = new scenario_t();
import CLIMATE_DESERT = scenario_climate.CLIMATE_DESERT;
export const enum event_rome {
    EVENT_ROME_RAISES_WAGES = 1,
    EVENT_ROME_LOWERS_WAGES = 2,
    EVENT_LAND_TRADE_DISRUPTED = 3,
    EVENT_LAND_SEA_DISRUPTED = 4,
    EVENT_CONTAMINATED_WATER = 5,
    EVENT_IRON_MINE_COLLAPSED = 6,
    EVENT_CLAY_PIT_FLOODED = 7,
}

import EVENT_ROME_RAISES_WAGES = event_rome.EVENT_ROME_RAISES_WAGES;
import EVENT_ROME_LOWERS_WAGES = event_rome.EVENT_ROME_LOWERS_WAGES;
import EVENT_LAND_TRADE_DISRUPTED = event_rome.EVENT_LAND_TRADE_DISRUPTED;
import EVENT_LAND_SEA_DISRUPTED = event_rome.EVENT_LAND_SEA_DISRUPTED;
import EVENT_CONTAMINATED_WATER = event_rome.EVENT_CONTAMINATED_WATER;
import EVENT_IRON_MINE_COLLAPSED = event_rome.EVENT_IRON_MINE_COLLAPSED;
import EVENT_CLAY_PIT_FLOODED = event_rome.EVENT_CLAY_PIT_FLOODED;

let RANDOM_EVENT_PROBABILITY: number[] = [
    0, 0, 1, 0, 0, 0, 4, 0, 0, 0, 0, 3, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 6,
    0, 0, 2, 0, 0, 0, 7, 0, 5, 0, 0, 7, 0, 0, 0, 0,
    0, 7, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
    6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 6, 0, 0,
    0, 7, 0, 1, 6, 0, 0, 0, 0, 0, 2, 0, 0, 4, 0, 0,
    0, 0, 3, 0, 7, 4, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0
];
function raise_wages() {
    if (scenario.random_events.raise_wages) {
        if (city_labor_raise_wages_rome()) {
            city_message_post(true, MESSAGE_ROME_RAISES_WAGES, 0, 0);
        }
    }
}
function lower_wages() {
    if (scenario.random_events.lower_wages) {
        if (city_labor_lower_wages_rome()) {
            city_message_post(true, MESSAGE_ROME_LOWERS_WAGES, 0, 0);
        }
    }
}
function disrupt_land_trade() {
    if (scenario.random_events.land_trade_problem) {
        if (city_trade_has_land_trade_route()) {
            city_trade_start_land_trade_problems(48);
            if (scenario_property_climate() == CLIMATE_DESERT) {
                city_message_post(true, MESSAGE_LAND_TRADE_DISRUPTED_SANDSTORMS, 0, 0);
            } else {
                city_message_post(true, MESSAGE_LAND_TRADE_DISRUPTED_LANDSLIDES, 0, 0);
            }
        }
    }
}
function disrupt_sea_trade() {
    if (scenario.random_events.sea_trade_problem) {
        if (city_trade_has_sea_trade_route()) {
            city_trade_start_sea_trade_problems(48);
            city_message_post(true, MESSAGE_SEA_TRADE_DISRUPTED, 0, 0);
        }
    }
}
function contaminate_water() {
    if (scenario.random_events.contaminated_water) {
        if (city_population() > 200) {
            let change: number;
            let health_rate: number = city_health();
            if (health_rate > 80) {
                change = -50;
            } else if (health_rate > 60) {
                change = -40;
            } else {
                change = -25;
            }
            city_health_change(change);
            city_message_post(true, MESSAGE_CONTAMINATED_WATER, 0, 0);
        }
    }
}
function destroy_iron_mine() {
    if (scenario.random_events.iron_mine_collapse) {
        let grid_offset: number = building_destroy_first_of_type(BUILDING_IRON_MINE);
        if (grid_offset) {
            city_message_post(true, MESSAGE_IRON_MINE_COLLAPED, 0, grid_offset);
        }
    }
}
function destroy_clay_pit() {
    if (scenario.random_events.clay_pit_flooded) {
        let grid_offset: number = building_destroy_first_of_type(BUILDING_CLAY_PIT);
        if (grid_offset) {
            city_message_post(true, MESSAGE_CLAY_PIT_FLOODED, 0, grid_offset);
        }
    }
}
export function scenario_random_event_process() {
    let event: number = RANDOM_EVENT_PROBABILITY[random_byte()];
    switch (event) {
        case EVENT_ROME_RAISES_WAGES:
            raise_wages();
            break
        case EVENT_ROME_LOWERS_WAGES:
            lower_wages();
            break
        case EVENT_LAND_TRADE_DISRUPTED:
            disrupt_land_trade();
            break
        case EVENT_LAND_SEA_DISRUPTED:
            disrupt_sea_trade();
            break
        case EVENT_CONTAMINATED_WATER:
            contaminate_water();
            break
        case EVENT_IRON_MINE_COLLAPSED:
            destroy_iron_mine();
            break
        case EVENT_CLAY_PIT_FLOODED:
            destroy_clay_pit();
            break
    }
}
