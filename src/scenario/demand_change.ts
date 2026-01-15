import { city_message_post, city_message_type } from 'city/message';
import { random_byte, random_generate_next } from 'core/random';
import { empire_city_get_for_trade_route, empire_city_is_trade_route_open } from 'empire/city';
import { trade_route_decrease_limit, trade_route_increase_limit, trade_route_limit } from 'empire/trade_route';
import { game_time_month, game_time_year } from 'game/time';
import { MAX_DEMAND_CHANGES, scenario_t } from 'scenario/data';
import MESSAGE_INCREASED_TRADING = city_message_type.MESSAGE_INCREASED_TRADING;
import MESSAGE_DECREASED_TRADING = city_message_type.MESSAGE_DECREASED_TRADING;
import MESSAGE_TRADE_STOPPED = city_message_type.MESSAGE_TRADE_STOPPED;
export let scenario: scenario_t = new scenario_t();
export function scenario_demand_change_init() {
    for (let i: number = 0; i < MAX_DEMAND_CHANGES; i++) {
        random_generate_next();
        if (scenario.demand_changes[i].year) {
            scenario.demand_changes[i].month = (random_byte() & 7) + 2;
        }
    }
}
export function scenario_demand_change_process() {
    for (let i: number = 0; i < MAX_DEMAND_CHANGES; i++) {
        if (!scenario.demand_changes[i].year) {
            continue
        }
        if (game_time_year() != scenario.demand_changes[i].year + scenario.start_year ||
            game_time_month() != scenario.demand_changes[i].month) {
            continue
        }
        let route: number = scenario.demand_changes[i].route_id;
        let resource: number = scenario.demand_changes[i].resource;
        let city_id: number = empire_city_get_for_trade_route(route);
        if (city_id < 0) {
            city_id = 0;
        }
        if (scenario.demand_changes[i].is_rise) {
            if (trade_route_increase_limit(route, resource) && empire_city_is_trade_route_open(route)) {
                city_message_post(true, MESSAGE_INCREASED_TRADING, city_id, resource);
            }
        } else {
            if (trade_route_decrease_limit(route, resource) && empire_city_is_trade_route_open(route)) {
                if (trade_route_limit(route, resource) > 0) {
                    city_message_post(true, MESSAGE_DECREASED_TRADING, city_id, resource);
                } else {
                    city_message_post(true, MESSAGE_TRADE_STOPPED, city_id, resource);
                }
            }
        }
    }
}
