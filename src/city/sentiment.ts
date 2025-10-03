import { MAX_BUILDINGS } from 'building/building';
import { building_type } from 'building/type';
import { house_level } from 'building/type';
import { building_state } from 'building/type';
import BUILDING_STATE_IN_USE = building_state.BUILDING_STATE_IN_USE;;
import { buffer } from 'core/buffer';
import { building } from 'building/building';
import { building_get } from 'building/building';
import { model_building } from 'building/model';
import { model_house } from 'building/model';
import { model_get_house } from 'building/model';
import { low_mood_cause } from 'city/constants';
import LOW_MOOD_CAUSE_NONE = low_mood_cause.LOW_MOOD_CAUSE_NONE;
import LOW_MOOD_CAUSE_NO_FOOD = low_mood_cause.LOW_MOOD_CAUSE_NO_FOOD;
import LOW_MOOD_CAUSE_NO_JOBS = low_mood_cause.LOW_MOOD_CAUSE_NO_JOBS;
import LOW_MOOD_CAUSE_HIGH_TAXES = low_mood_cause.LOW_MOOD_CAUSE_HIGH_TAXES;
import LOW_MOOD_CAUSE_LOW_WAGES = low_mood_cause.LOW_MOOD_CAUSE_LOW_WAGES;
import LOW_MOOD_CAUSE_MANY_TENTS = low_mood_cause.LOW_MOOD_CAUSE_MANY_TENTS;
import { resource_trade_status } from 'city/constants';
import { emperor_gift } from 'city/emperor';
import { finance_overview } from 'city/finance';
import { house_demands } from 'city/houses';
import { labor_category_data } from 'city/labor';
import { resource_type } from 'game/resource';
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
import RESOURCE_MAX_FOOD = resource_type.RESOURCE_MAX_FOOD;
import { resource_type } from 'game/resource';
import { workshop_type } from 'game/resource';
import { resource_image_type } from 'game/resource';
import { resource_list } from 'city/resource';
import { map_point } from 'map/point';
import { map_tile } from 'map/point';
import { god_status } from 'city/data_private';
export let city_data: city_data_t = new city_data_t();
import { message_category } from 'city/message';
import { message_advisor } from 'city/message';
import { city_message_type } from 'city/message';
import MESSAGE_PEOPLE_DISGRUNTLED = city_message_type.MESSAGE_PEOPLE_DISGRUNTLED;
import MESSAGE_PEOPLE_UNHAPPY = city_message_type.MESSAGE_PEOPLE_UNHAPPY;
import MESSAGE_PEOPLE_ANGRY = city_message_type.MESSAGE_PEOPLE_ANGRY;
import { city_message_type } from 'city/message';
import { city_message } from 'city/message';
import { city_message_post } from 'city/message';
import { city_population_check_consistency } from 'city/population';
import { direction_type } from 'core/direction';
import { calc_percentage } from 'core/calc';
import { calc_bound } from 'core/calc';
import { config_key } from 'core/config';
import CONFIG_GP_FIX_IMMIGRATION_BUG = config_key.CONFIG_GP_FIX_IMMIGRATION_BUG;
import { config_key } from 'core/config';
import { config_string_key } from 'core/config';
import { config_get } from 'core/config';
import { difficulty_sentiment } from 'game/difficulty';
import { tutorial_availability } from 'game/tutorial';
import { tutorial_build_buttons } from 'game/tutorial';
let SENTIMENT_PER_TAX_RATE: number[] = new Array(26).fill({
    3, 2, 2, 2, 1, 1, 1, 0, 0, - 1,
    -2, -2, -3, -3, -3, -5, -5, -5, -5, -6,
    -6, -6, -6, -6, -6, -6
});
export function city_sentiment() {
    return city_data.sentiment.value;
}
export function city_sentiment_low_mood_cause() {
    return city_data.sentiment.low_mood_cause;
}
export function city_sentiment_change_happiness(amount: number) {
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state == BUILDING_STATE_IN_USE && b.house_size) {
            b.sentiment.house_happiness = calc_bound(b.sentiment.house_happiness + amount, 0, 100);
        }
    }
}
export function city_sentiment_set_max_happiness(max: number) {
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state == BUILDING_STATE_IN_USE && b.house_size) {
            if (b.sentiment.house_happiness > max) {
                b.sentiment.house_happiness = max;
            }
            b.sentiment.house_happiness = calc_bound(b.sentiment.house_happiness, 0, 100);
        }
    }
}
export function city_sentiment_reset_protesters_criminals() {
    city_data.sentiment.protesters = 0;
    city_data.sentiment.criminals = 0;
}
export function city_sentiment_add_protester() {
    city_data.sentiment.protesters++;
}
export function city_sentiment_add_criminal() {
    city_data.sentiment.criminals++;
}
export function city_sentiment_protesters() {
    return city_data.sentiment.protesters;
}
export function city_sentiment_criminals() {
    return city_data.sentiment.criminals;
}
function get_sentiment_penalty_for_tent_dwellers() {
    if (!city_data.sentiment.include_tents) {
        city_data.sentiment.include_tents = 1;
        return 0;
    }
    city_data.sentiment.include_tents = 0;
    let penalty: number;
    let pct_tents: number = calc_percentage(city_data.population.people_in_tents, city_data.population.population);
    if (city_data.population.people_in_villas_palaces > 0) {
        if (pct_tents >= 57) {
            penalty = 0;
        } else if (pct_tents >= 40) {
            penalty = -3;
        } else if (pct_tents >= 26) {
            penalty = -4;
        } else if (pct_tents >= 10) {
            penalty = -5;
        } else {
            penalty = -6;
        }
    } else if (city_data.population.people_in_large_insula_and_above > 0) {
        if (pct_tents >= 57) {
            penalty = 0;
        } else if (pct_tents >= 40) {
            penalty = -2;
        } else if (pct_tents >= 26) {
            penalty = -3;
        } else if (pct_tents >= 10) {
            penalty = -4;
        } else {
            penalty = -5;
        }
    } else {
        if (pct_tents >= 40) {
            penalty = 0;
        } else if (pct_tents >= 26) {
            penalty = -1;
        } else if (pct_tents >= 10) {
            penalty = -2;
        } else {
            penalty = -3;
        }
    }
    return penalty;
}
function get_sentiment_contribution_wages() {
    city_data.sentiment.wages = city_data.labor.wages;
    let contribution: number = 0;
    let wage_diff: number = city_data.labor.wages - city_data.labor.wages_rome;
    if (wage_diff < 0) {
        contribution = wage_diff / 2;
        if (!contribution) {
            contribution = -1;
        }
    } else if (wage_diff > 7) {
        contribution = 4;
    } else if (wage_diff > 4) {
        contribution = 3;
    } else if (wage_diff > 1) {
        contribution = 2;
    } else if (wage_diff > 0) {
        contribution = 1;
    }
    return contribution;
}
function get_sentiment_contribution_employment() {
    let unemployment: number = city_data.sentiment.unemployment = city_data.labor.unemployment_percentage;
    if (unemployment > 25) {
        return -3;
    } else if (unemployment > 17) {
        return -2;
    } else if (unemployment > 10) {
        return -1;
    } else if (unemployment > 4) {
        return 0;
    } else {
        return 1;
    }
}
export function city_sentiment_update() {
    city_population_check_consistency();
    let sentiment_contribution_taxes: number = SENTIMENT_PER_TAX_RATE[city_data.finance.tax_percentage];
    let sentiment_contribution_wages: number = get_sentiment_contribution_wages();
    let sentiment_contribution_employment: number = get_sentiment_contribution_employment();
    let sentiment_penalty_tents: number = get_sentiment_penalty_for_tent_dwellers();
    let houses_calculated: number = 0;
    let houses_needing_food: number = 0;
    let total_sentiment_contribution_food: number = 0;
    let total_sentiment_penalty_tents: number = 0;
    let default_sentiment: number = difficulty_sentiment();
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state != BUILDING_STATE_IN_USE || !b.house_size) {
            continue
        }
        if (!b.house_population) {
            b.sentiment.house_happiness = 10 + default_sentiment;
            continue
        }
        if (city_data.population.population < 300) {
            sentiment_contribution_employment = 0;
            sentiment_contribution_taxes = 0;
            sentiment_contribution_wages = 0;
            b.sentiment.house_happiness = default_sentiment;
            if (city_data.population.population < 200) {
                b.sentiment.house_happiness += 10
            } else if (default_sentiment < 50 && config_get(CONFIG_GP_FIX_IMMIGRATION_BUG)) {
                b.sentiment.house_happiness += 50 - default_sentiment
            }
            continue
        }
        houses_calculated++;
        let sentiment_contribution_food: number = 0;
        let sentiment_contribution_tents: number = 0;
        if (!model_get_house(b.subtype.house_level).food_types) {
            b.house_days_without_food = 0;
            sentiment_contribution_tents = sentiment_penalty_tents;
            total_sentiment_penalty_tents += sentiment_penalty_tents
        } else {
            houses_needing_food++;
            if (b.data.house.num_foods >= 2) {
                sentiment_contribution_food = 2;
                total_sentiment_contribution_food += 2
                b.house_days_without_food = 0;
            } else if (b.data.house.num_foods >= 1) {
                sentiment_contribution_food = 1;
                total_sentiment_contribution_food += 1
                b.house_days_without_food = 0;
            } else {
                if (b.house_days_without_food < 3) {
                    b.house_days_without_food++;
                }
                sentiment_contribution_food = -b.house_days_without_food;
                total_sentiment_contribution_food -= b.house_days_without_food
            }
        }
        b.sentiment.house_happiness += sentiment_contribution_taxes
        b.sentiment.house_happiness += sentiment_contribution_wages
        b.sentiment.house_happiness += sentiment_contribution_employment
        b.sentiment.house_happiness += sentiment_contribution_food
        b.sentiment.house_happiness += sentiment_contribution_tents
        b.sentiment.house_happiness = calc_bound(b.sentiment.house_happiness, 0, 100);
    }
    let sentiment_contribution_food: number = 0;
    let sentiment_contribution_tents: number = 0;
    if (houses_needing_food) {
        sentiment_contribution_food = total_sentiment_contribution_food / houses_needing_food;
    }
    if (houses_calculated) {
        sentiment_contribution_tents = total_sentiment_penalty_tents / houses_calculated;
    }
    let total_sentiment: number = 0;
    let total_houses: number = 0;
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state == BUILDING_STATE_IN_USE && b.house_size && b.house_population) {
            total_houses++;
            total_sentiment += b.sentiment.house_happiness
        }
    }
    if (total_houses) {
        city_data.sentiment.value = total_sentiment / total_houses;
    } else {
        city_data.sentiment.value = 60;
    }
    if (city_data.sentiment.message_delay) {
        city_data.sentiment.message_delay--;
    }
    if (city_data.sentiment.value < 48 && city_data.sentiment.value < city_data.sentiment.previous_value) {
        if (city_data.sentiment.message_delay <= 0) {
            city_data.sentiment.message_delay = 3;
            if (city_data.sentiment.value < 35) {
                city_message_post(0, MESSAGE_PEOPLE_ANGRY, 0, 0);
            } else if (city_data.sentiment.value < 40) {
                city_message_post(0, MESSAGE_PEOPLE_UNHAPPY, 0, 0);
            } else {
                city_message_post(0, MESSAGE_PEOPLE_DISGRUNTLED, 0, 0);
            }
        }
    }
    let worst_sentiment: number = 0;
    city_data.sentiment.low_mood_cause = LOW_MOOD_CAUSE_NONE;
    if (sentiment_contribution_food < worst_sentiment) {
        worst_sentiment = sentiment_contribution_food;
        city_data.sentiment.low_mood_cause = LOW_MOOD_CAUSE_NO_FOOD;
    }
    if (sentiment_contribution_employment < worst_sentiment) {
        worst_sentiment = sentiment_contribution_employment;
        city_data.sentiment.low_mood_cause = LOW_MOOD_CAUSE_NO_JOBS;
    }
    if (sentiment_contribution_taxes < worst_sentiment) {
        worst_sentiment = sentiment_contribution_taxes;
        city_data.sentiment.low_mood_cause = LOW_MOOD_CAUSE_HIGH_TAXES;
    }
    if (sentiment_contribution_wages < worst_sentiment) {
        worst_sentiment = sentiment_contribution_wages;
        city_data.sentiment.low_mood_cause = LOW_MOOD_CAUSE_LOW_WAGES;
    }
    if (sentiment_contribution_tents < worst_sentiment) {
        city_data.sentiment.low_mood_cause = LOW_MOOD_CAUSE_MANY_TENTS;
    }
    city_data.sentiment.previous_value = city_data.sentiment.value;
}
