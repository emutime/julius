import { city_message_post, city_message_type } from 'city/message';
import { random_byte, random_generate_next } from 'core/random';
import { trade_price_change } from 'empire/trade_prices';
import { game_time_month, game_time_year } from 'game/time';
import { MAX_PRICE_CHANGES, scenario_t } from 'scenario/data';
;
import MESSAGE_PRICE_INCREASED = city_message_type.MESSAGE_PRICE_INCREASED;
import MESSAGE_PRICE_DECREASED = city_message_type.MESSAGE_PRICE_DECREASED;
export let scenario: scenario_t = new scenario_t();
export function scenario_price_change_init() {
    for (let i: number = 0; i < MAX_PRICE_CHANGES; i++) {
        random_generate_next();
        if (scenario.price_changes[i].year) {
            scenario.price_changes[i].month = (random_byte() & 7) + 2;
        }
    }
}
export function scenario_price_change_process() {
    for (let i: number = 0; i < MAX_PRICE_CHANGES; i++) {
        if (!scenario.price_changes[i].year) {
            continue
        }
        if (game_time_year() != scenario.price_changes[i].year + scenario.start_year ||
            game_time_month() != scenario.price_changes[i].month) {
            continue
        }
        let amount: number = scenario.price_changes[i].amount;
        let resource: number = scenario.price_changes[i].resource;
        if (scenario.price_changes[i].is_rise) {
            if (trade_price_change(resource, amount)) {
                city_message_post(true, MESSAGE_PRICE_INCREASED, amount, resource);
            }
        } else {
            if (trade_price_change(resource, -amount)) {
                city_message_post(true, MESSAGE_PRICE_DECREASED, amount, resource);
            }
        }
    }
}
