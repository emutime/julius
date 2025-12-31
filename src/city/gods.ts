export const MAX_GODS = 5;
export const TIE = 10;
import { building_count_total } from 'building/count';
import { building_granary_bless, building_granary_warehouse_curse } from 'building/granary';
import { building_bless_farms, building_curse_farms } from 'building/industry';
import { building_type } from 'building/type';
import { god_type } from 'city/constants';
import { city_culture_coverage_religion } from 'city/culture';
import { city_data_t, god_status } from 'city/data_private';
import { city_health_change } from 'city/health';
import { city_message_post, city_message_type } from 'city/message';
import { city_sentiment_change_happiness, city_sentiment_set_max_happiness, city_sentiment_update } from 'city/sentiment';
import { city_trade_start_sea_trade_problems } from 'city/trade';
import { calc_bound } from 'core/calc';
import { random_byte } from 'core/random';
import { formation_legion_curse } from 'figure/formation_legion';
import { figure_sink_all_ships } from 'figuretype/water';
import { resource_type } from 'game/resource';
import { setting_gods_enabled } from 'game/settings';
import { game_time_day } from 'game/time';
import { scenario_invasion_start_from_mars } from 'scenario/invasion';
import { scenario_campaign_rank, scenario_is_custom, scenario_is_tutorial_1 } from 'scenario/property';
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
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
import RESOURCE_MAX_FOOD = resource_type.RESOURCE_MAX_FOOD;
import GOD_CERES = god_type.GOD_CERES;
import GOD_NEPTUNE = god_type.GOD_NEPTUNE;
import GOD_MERCURY = god_type.GOD_MERCURY;
import GOD_MARS = god_type.GOD_MARS;
import GOD_VENUS = god_type.GOD_VENUS;
export let city_data: city_data_t = new city_data_t();
import MESSAGE_WRATH_OF_CERES = city_message_type.MESSAGE_WRATH_OF_CERES;
import MESSAGE_WRATH_OF_NEPTUNE_NO_SEA_TRADE = city_message_type.MESSAGE_WRATH_OF_NEPTUNE_NO_SEA_TRADE;
import MESSAGE_WRATH_OF_MERCURY = city_message_type.MESSAGE_WRATH_OF_MERCURY;
import MESSAGE_WRATH_OF_MARS_NO_MILITARY = city_message_type.MESSAGE_WRATH_OF_MARS_NO_MILITARY;
import MESSAGE_WRATH_OF_VENUS = city_message_type.MESSAGE_WRATH_OF_VENUS;
import MESSAGE_GODS_UNHAPPY = city_message_type.MESSAGE_GODS_UNHAPPY;
import MESSAGE_WRATH_OF_NEPTUNE = city_message_type.MESSAGE_WRATH_OF_NEPTUNE;
import MESSAGE_WRATH_OF_MARS = city_message_type.MESSAGE_WRATH_OF_MARS;
import MESSAGE_CERES_IS_UPSET = city_message_type.MESSAGE_CERES_IS_UPSET;
import MESSAGE_NEPTUNE_IS_UPSET = city_message_type.MESSAGE_NEPTUNE_IS_UPSET;
import MESSAGE_MERCURY_IS_UPSET = city_message_type.MESSAGE_MERCURY_IS_UPSET;
import MESSAGE_MARS_IS_UPSET = city_message_type.MESSAGE_MARS_IS_UPSET;
import MESSAGE_VENUS_IS_UPSET = city_message_type.MESSAGE_VENUS_IS_UPSET;
import MESSAGE_BLESSING_FROM_CERES = city_message_type.MESSAGE_BLESSING_FROM_CERES;
import MESSAGE_BLESSING_FROM_NEPTUNE = city_message_type.MESSAGE_BLESSING_FROM_NEPTUNE;
import MESSAGE_BLESSING_FROM_MERCURY = city_message_type.MESSAGE_BLESSING_FROM_MERCURY;
import MESSAGE_BLESSING_FROM_MARS = city_message_type.MESSAGE_BLESSING_FROM_MARS;
import MESSAGE_BLESSING_FROM_VENUS = city_message_type.MESSAGE_BLESSING_FROM_VENUS;
import MESSAGE_GODS_WRATHFUL = city_message_type.MESSAGE_GODS_WRATHFUL;
export function city_gods_reset() {
    for (let i: number = 0; i < MAX_GODS; i++) {
        let god: god_status = city_data.religion.gods[i];
        god.target_happiness = 50;
        god.happiness = 50;
        god.wrath_bolts = 0;
        god.blessing_done = 0;
        god.small_curse_done = 0;
        god.unused1 = 0;
        god.unused2 = 0;
        god.unused3 = 0;
        god.months_since_festival = 0;
    }
    city_data.religion.angry_message_delay = 0;
}
export function city_gods_reset_neptune_blessing() {
    city_data.religion.neptune_double_trade_active = 0;
}
function perform_blessing(god: god_type) {
    switch (god) {
        case GOD_CERES:
            city_message_post(1, MESSAGE_BLESSING_FROM_CERES, 0, 0);
            building_bless_farms();
            break
        case GOD_NEPTUNE:
            city_message_post(1, MESSAGE_BLESSING_FROM_NEPTUNE, 0, 0);
            city_data.religion.neptune_double_trade_active = 1;
            break
        case GOD_MERCURY:
            city_message_post(1, MESSAGE_BLESSING_FROM_MERCURY, 0, 0);
            building_granary_bless();
            break
        case GOD_MARS:
            city_message_post(1, MESSAGE_BLESSING_FROM_MARS, 0, 0);
            city_data.religion.mars_spirit_power = 10;
            break
        case GOD_VENUS:
            city_message_post(1, MESSAGE_BLESSING_FROM_VENUS, 0, 0);
            city_sentiment_change_happiness(25);
            break
    }
}
function perform_small_curse(god: god_type) {
    switch (god) {
        case GOD_CERES:
            city_message_post(1, MESSAGE_CERES_IS_UPSET, 0, 0);
            building_curse_farms(0);
            break
        case GOD_NEPTUNE:
            city_message_post(1, MESSAGE_NEPTUNE_IS_UPSET, 0, 0);
            figure_sink_all_ships();
            city_data.religion.neptune_sank_ships = 1;
            break
        case GOD_MERCURY:
            city_message_post(1, MESSAGE_MERCURY_IS_UPSET, 0, 0);
            building_granary_warehouse_curse(0);
            break
        case GOD_MARS:
            if (scenario_invasion_start_from_mars()) {
                city_message_post(1, MESSAGE_MARS_IS_UPSET, 0, 0);
            } else {
                city_message_post(1, MESSAGE_WRATH_OF_MARS_NO_MILITARY, 0, 0);
            }
            break
        case GOD_VENUS:
            city_message_post(1, MESSAGE_VENUS_IS_UPSET, 0, 0);
            city_sentiment_set_max_happiness(50);
            city_sentiment_change_happiness(-5);
            city_health_change(-10);
            city_sentiment_update();
            break
    }
}
function perform_large_curse(god: god_type) {
    switch (god) {
        case GOD_CERES:
            city_message_post(1, MESSAGE_WRATH_OF_CERES, 0, 0);
            building_curse_farms(1);
            break
        case GOD_NEPTUNE:
            if (city_data.trade.num_sea_routes <= 0) {
                city_message_post(1, MESSAGE_WRATH_OF_NEPTUNE_NO_SEA_TRADE, 0, 0);
                return 0;
            } else {
                city_message_post(1, MESSAGE_WRATH_OF_NEPTUNE, 0, 0);
                figure_sink_all_ships();
                city_data.religion.neptune_sank_ships = 1;
                city_trade_start_sea_trade_problems(80);
            }
            break
        case GOD_MERCURY:
            city_message_post(1, MESSAGE_WRATH_OF_MERCURY, 0, 0);
            building_granary_warehouse_curse(1);
            break
        case GOD_MARS:
            if (formation_legion_curse()) {
                city_message_post(1, MESSAGE_WRATH_OF_MARS, 0, 0);
                scenario_invasion_start_from_mars();
            } else {
                city_message_post(1, MESSAGE_WRATH_OF_MARS_NO_MILITARY, 0, 0);
            }
            break
        case GOD_VENUS:
            city_message_post(1, MESSAGE_WRATH_OF_VENUS, 0, 0);
            city_sentiment_set_max_happiness(40);
            city_sentiment_change_happiness(-10);
            if (city_data.health.value >= 80) {
                city_health_change(-50);
            } else if (city_data.health.value >= 60) {
                city_health_change(-40);
            } else {
                city_health_change(-20);
            }
            city_data.religion.venus_curse_active = 1;
            city_sentiment_update();
            break
    }
    return 1;
}
function update_god_moods() {
    for (let i: number = 0; i < MAX_GODS; i++) {
        let god: god_status = city_data.religion.gods[i];
        if (god.happiness < god.target_happiness) {
            god.happiness++;
        } else if (god.happiness > god.target_happiness) {
            god.happiness--;
        }
        if (scenario_is_tutorial_1()) {
            if (god.happiness < 50) {
                god.happiness = 50;
            }
        }
        if (god.happiness > 50) {
            god.small_curse_done = 0;
        }
        if (god.happiness < 50) {
            god.blessing_done = 0;
        }
    }
    let god_id: number = random_byte() & 7;
    if (god_id < MAX_GODS) {
        let god: god_status = city_data.religion.gods[god_id];
        if (god.happiness >= 50) {
            god.wrath_bolts = 0;
        } else if (god.happiness < 40) {
            if (god.happiness >= 20) {
                god.wrath_bolts += 1
            } else if (god.happiness >= 10) {
                god.wrath_bolts += 2
            } else {
                god.wrath_bolts += 5
            }
        }
        if (god.wrath_bolts > 50) {
            god.wrath_bolts = 50;
        }
    }
    if (game_time_day() != 0) {
        return;
    }
    for (let i: number = 0; i < MAX_GODS; i++) {
        city_data.religion.gods[i].months_since_festival++;
    }
    if (god_id >= MAX_GODS) {
        if (city_gods_calculate_least_happy()) {
            god_id = city_data.religion.least_happy_god - 1;
        }
    }
    if (!setting_gods_enabled()) {
        return;
    }
    if (god_id < MAX_GODS) {
        let god: god_status = city_data.religion.gods[god_id];
        if (god.happiness >= 100 && !god.blessing_done) {
            god.blessing_done = 1;
            perform_blessing(god_id);
        } else if (god.wrath_bolts >= 20 && !god.small_curse_done && god.months_since_festival > 3) {
            god.small_curse_done = 1;
            god.wrath_bolts = 0;
            god.happiness += 12
            perform_small_curse(god_id);
        } else if (god.wrath_bolts >= 50 && god.months_since_festival > 3) {
            if (scenario_campaign_rank() < 4 && !scenario_is_custom()) {
                god.small_curse_done = 0;
                return;
            }
            god.wrath_bolts = 0;
            god.happiness += 30
            if (!perform_large_curse(god_id)) {
                return;
            }
        }
    }
    let min_happiness: number = 100;
    for (let i: number = 0; i < MAX_GODS; i++) {
        if (city_data.religion.gods[i].happiness < min_happiness) {
            min_happiness = city_data.religion.gods[i].happiness;
        }
    }
    if (city_data.religion.angry_message_delay) {
        city_data.religion.angry_message_delay--;
    } else if (min_happiness < 30) {
        city_data.religion.angry_message_delay = 20;
        if (min_happiness < 10) {
            city_message_post(0, MESSAGE_GODS_WRATHFUL, 0, 0);
        } else {
            city_message_post(0, MESSAGE_GODS_UNHAPPY, 0, 0);
        }
    }
}
export function city_gods_calculate_moods(update_moods: number) {
    for (let i: number = 0; i < MAX_GODS; i++) {
        city_data.religion.gods[i].target_happiness = city_culture_coverage_religion(i);
    }
    let max_temples: number = 0;
    let max_god: number = TIE;
    let min_temples: number = 100000;
    let min_god: number = TIE;
    for (let i: number = 0; i < MAX_GODS; i++) {
        let num_temples: number = 0;
        switch (i) {
            case GOD_CERES:
                num_temples = building_count_total(BUILDING_SMALL_TEMPLE_CERES)
                    + building_count_total(BUILDING_LARGE_TEMPLE_CERES);
                break
            case GOD_NEPTUNE:
                num_temples = building_count_total(BUILDING_SMALL_TEMPLE_NEPTUNE)
                    + building_count_total(BUILDING_LARGE_TEMPLE_NEPTUNE);
                break
            case GOD_MERCURY:
                num_temples = building_count_total(BUILDING_SMALL_TEMPLE_MERCURY)
                    + building_count_total(BUILDING_LARGE_TEMPLE_MERCURY);
                break
            case GOD_MARS:
                num_temples = building_count_total(BUILDING_SMALL_TEMPLE_MARS)
                    + building_count_total(BUILDING_LARGE_TEMPLE_MARS);
                break
            case GOD_VENUS:
                num_temples = building_count_total(BUILDING_SMALL_TEMPLE_VENUS)
                    + building_count_total(BUILDING_LARGE_TEMPLE_VENUS);
                break
        }
        if (num_temples == max_temples) {
            max_god = TIE;
        } else if (num_temples > max_temples) {
            max_temples = num_temples;
            max_god = i;
        }
        if (num_temples == min_temples) {
            min_god = TIE;
        } else if (num_temples < min_temples) {
            min_temples = num_temples;
            min_god = i;
        }
    }
    for (let i: number = 0; i < MAX_GODS; i++) {
        let festival_penalty: number = city_data.religion.gods[i].months_since_festival;
        if (festival_penalty > 40) {
            festival_penalty = 40;
        }
        city_data.religion.gods[i].target_happiness += 12 - festival_penalty
    }
    if (max_god < 4) {
        if (city_data.religion.gods[max_god].target_happiness >= 50) {
            city_data.religion.gods[max_god].target_happiness = 100;
        } else {
            city_data.religion.gods[max_god].target_happiness += 50
        }
    }
    if (min_god < 4) {
        city_data.religion.gods[min_god].target_happiness -= 25
    }
    let min_happiness: number;
    if (city_data.population.population < 100) {
        min_happiness = 50;
    } else if (city_data.population.population < 200) {
        min_happiness = 40;
    } else if (city_data.population.population < 300) {
        min_happiness = 30;
    } else if (city_data.population.population < 400) {
        min_happiness = 20;
    } else if (city_data.population.population < 500) {
        min_happiness = 10;
    } else {
        min_happiness = 0;
    }
    for (let i: number = 0; i < MAX_GODS; i++) {
        city_data.religion.gods[i].target_happiness =
            calc_bound(city_data.religion.gods[i].target_happiness, min_happiness, 100);
    }
    if (update_moods) {
        update_god_moods();
    }
}
export function city_gods_calculate_least_happy() {
    let max_god: number = 0;
    let max_wrath: number = 0;
    for (let i: number = 0; i < MAX_GODS; i++) {
        if (city_data.religion.gods[i].wrath_bolts > max_wrath) {
            max_god = i + 1;
            max_wrath = city_data.religion.gods[i].wrath_bolts;
        }
    }
    if (max_god > 0) {
        city_data.religion.least_happy_god = max_god;
        return 1;
    }
    let min_happiness: number = 40;
    for (let i: number = 0; i < MAX_GODS; i++) {
        if (city_data.religion.gods[i].happiness < min_happiness) {
            max_god = i + 1;
            min_happiness = city_data.religion.gods[i].happiness;
        }
    }
    city_data.religion.least_happy_god = max_god;
    return max_god > 0;
}
export function city_god_happiness(god_id: number) {
    return city_data.religion.gods[god_id].happiness;
}
export function city_god_wrath_bolts(god_id: number) {
    return city_data.religion.gods[god_id].wrath_bolts;
}
export function city_god_months_since_festival(god_id: number) {
    return city_data.religion.gods[god_id].months_since_festival;
}
export function city_god_least_happy() {
    return city_data.religion.least_happy_god - 1;
}
export function city_god_spirit_of_mars_power() {
    return city_data.religion.mars_spirit_power;
}
export function city_god_spirit_of_mars_mark_used() {
    city_data.religion.mars_spirit_power = 0;
}
export function city_god_neptune_create_shipwreck_flotsam() {
    if (city_data.religion.neptune_sank_ships) {
        city_data.religion.neptune_sank_ships = 0;
        return 1;
    } else {
        return 0;
    }
}
