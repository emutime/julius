
export const enum gift {
    GIFT_MODEST = 0,
    GIFT_GENEROUS = 1,
    GIFT_LAVISH = 2
};

import GIFT_MODEST = gift.GIFT_MODEST;
import GIFT_GENEROUS = gift.GIFT_GENEROUS;
import GIFT_LAVISH = gift.GIFT_LAVISH;


export class emperor_gift {
    public id: number = 0;
    public cost: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.id = args[0]);
        args.length >= 2 && (this.cost = args[1]);
    }
};
import { city_data_t } from 'city/data_private';
import { city_finance_calculate_totals, city_finance_process_donation } from 'city/finance';
import { city_message_post, city_message_type } from 'city/message';
import { city_ratings_change_favor, city_ratings_limit_favor, city_ratings_reduce_prosperity_after_bailout } from 'city/ratings';
import { calc_bound } from 'core/calc';
import { formation_caesar_pause, formation_caesar_retreat } from 'figure/formation';
import { difficulty_adjust_money } from 'game/difficulty';
import { resource_type } from 'game/resource';
import { game_time_day } from 'game/time';
import { scenario_invasion_start_from_caesar } from 'scenario/invasion';
import { scenario_is_custom, scenario_property_player_rank, scenario_rescue_loan, scenario_starting_favor, scenario_starting_personal_savings } from 'scenario/property';
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
import RESOURCE_MAX_FOOD = resource_type.RESOURCE_MAX_FOOD;
export let city_data: city_data_t = new city_data_t();
import MESSAGE_CITY_IN_DEBT = city_message_type.MESSAGE_CITY_IN_DEBT;
import MESSAGE_CITY_IN_DEBT_AGAIN = city_message_type.MESSAGE_CITY_IN_DEBT_AGAIN;
import MESSAGE_CITY_STILL_IN_DEBT = city_message_type.MESSAGE_CITY_STILL_IN_DEBT;
import MESSAGE_CAESAR_WRATH = city_message_type.MESSAGE_CAESAR_WRATH;
import MESSAGE_CAESAR_ARMY_CONTINUE = city_message_type.MESSAGE_CAESAR_ARMY_CONTINUE;
import MESSAGE_CAESAR_ARMY_RETREAT = city_message_type.MESSAGE_CAESAR_ARMY_RETREAT;
import MESSAGE_CAESAR_RESPECT_1 = city_message_type.MESSAGE_CAESAR_RESPECT_1;
import MESSAGE_CAESAR_RESPECT_2 = city_message_type.MESSAGE_CAESAR_RESPECT_2;
import MESSAGE_CAESAR_RESPECT_3 = city_message_type.MESSAGE_CAESAR_RESPECT_3;
export let SALARY_FOR_RANK: number[] = [0, 2, 5, 8, 12, 20, 30, 40, 60, 80, 100];
export function city_emperor_init_scenario(rank: number) {
    city_data.ratings.favor = scenario_starting_favor();
    city_data.emperor.personal_savings = scenario_starting_personal_savings();
    city_data.emperor.player_rank = rank;
    let salary_rank: number = rank;
    if (scenario_is_custom()) {
        city_data.emperor.personal_savings = 0;
        city_data.emperor.player_rank = scenario_property_player_rank();
        salary_rank = scenario_property_player_rank();
    }
    if (salary_rank > 10) {
        salary_rank = 10;
    }
    city_emperor_set_salary_rank(salary_rank);
}
function update_debt_state() {
    if (city_data.finance.treasury >= 0) {
        city_data.emperor.months_in_debt = -1;
        return;
    }
    if (city_data.emperor.debt_state == 0) {
        let rescue_loan: number = difficulty_adjust_money(scenario_rescue_loan());
        city_finance_process_donation(rescue_loan);
        city_finance_calculate_totals();
        city_data.emperor.debt_state = 1;
        city_data.emperor.months_in_debt = 0;
        city_message_post(true, MESSAGE_CITY_IN_DEBT, 0, 0);
        city_ratings_reduce_prosperity_after_bailout();
    } else if (city_data.emperor.debt_state == 1) {
        city_data.emperor.debt_state = 2;
        city_data.emperor.months_in_debt = 0;
        city_message_post(true, MESSAGE_CITY_IN_DEBT_AGAIN, 0, 0);
        city_ratings_change_favor(-5);
    } else if (city_data.emperor.debt_state == 2) {
        if (city_data.emperor.months_in_debt == -1) {
            city_message_post(true, MESSAGE_CITY_IN_DEBT_AGAIN, 0, 0);
            city_data.emperor.months_in_debt = 0;
        }
        if (game_time_day() == 0) {
            city_data.emperor.months_in_debt++;
        }
        if (city_data.emperor.months_in_debt >= 12) {
            city_data.emperor.debt_state = 3;
            city_data.emperor.months_in_debt = 0;
            if (!city_data.figure.imperial_soldiers) {
                city_message_post(true, MESSAGE_CITY_STILL_IN_DEBT, 0, 0);
                city_ratings_change_favor(-10);
            }
        }
    } else if (city_data.emperor.debt_state == 3) {
        if (city_data.emperor.months_in_debt == -1) {
            city_message_post(true, MESSAGE_CITY_STILL_IN_DEBT, 0, 0);
            city_data.emperor.months_in_debt = 0;
        }
        if (game_time_day() == 0) {
            city_data.emperor.months_in_debt++;
        }
        if (city_data.emperor.months_in_debt >= 12) {
            city_data.emperor.debt_state = 4;
            city_data.emperor.months_in_debt = 0;
            if (!city_data.figure.imperial_soldiers) {
                city_ratings_limit_favor(10);
            }
        }
    }
}
function process_caesar_invasion() {
    if (city_data.figure.imperial_soldiers) {
        city_data.emperor.invasion.duration_day_countdown--;
        if (city_data.ratings.favor >= 35 && city_data.emperor.invasion.duration_day_countdown < 176) {
            formation_caesar_pause();
        } else if (city_data.ratings.favor >= 22) {
            if (city_data.emperor.invasion.duration_day_countdown > 0) {
                formation_caesar_retreat();
                if (!city_data.emperor.invasion.retreat_message_shown) {
                    city_data.emperor.invasion.retreat_message_shown = 1;
                    city_message_post(true, MESSAGE_CAESAR_ARMY_RETREAT, 0, 0);
                }
            } else if (city_data.emperor.invasion.duration_day_countdown == 0) {
                city_message_post(true, MESSAGE_CAESAR_ARMY_CONTINUE, 0, 0);
            }
        }
    } else if (city_data.emperor.invasion.soldiers_killed
        && city_data.emperor.invasion.soldiers_killed >= city_data.emperor.invasion.size) {
        city_data.emperor.invasion.size = 0;
        city_data.emperor.invasion.soldiers_killed = 0;
        if (city_data.ratings.favor < 35) {
            city_ratings_change_favor(10);
            if (city_data.emperor.invasion.count < 2) {
                city_message_post(true, MESSAGE_CAESAR_RESPECT_1, 0, 0);
            } else if (city_data.emperor.invasion.count < 3) {
                city_message_post(true, MESSAGE_CAESAR_RESPECT_2, 0, 0);
            } else {
                city_message_post(true, MESSAGE_CAESAR_RESPECT_3, 0, 0);
            }
        }
    } else if (city_data.emperor.invasion.days_until_invasion <= 0) {
        if (city_data.ratings.favor <= 10) {
            city_data.emperor.invasion.warnings_given++;
            city_data.emperor.invasion.days_until_invasion = 192;
            if (city_data.emperor.invasion.warnings_given <= 1) {
                city_message_post(true, MESSAGE_CAESAR_WRATH, 0, 0);
            }
        }
    } else {
        city_data.emperor.invasion.days_until_invasion--;
        if (city_data.emperor.invasion.days_until_invasion == 0) {
            let size: number;
            if (city_data.emperor.invasion.count == 0) {
                size = 32;
            } else if (city_data.emperor.invasion.count == 1) {
                size = 64;
            } else if (city_data.emperor.invasion.count == 2) {
                size = 96;
            } else {
                size = 144;
            }
            if (scenario_invasion_start_from_caesar(size)) {
                city_data.emperor.invasion.count++;
                city_data.emperor.invasion.duration_day_countdown = 192;
                city_data.emperor.invasion.retreat_message_shown = 0;
                city_data.emperor.invasion.size = size;
                city_data.emperor.invasion.soldiers_killed = 0;
            }
        }
    }
}
export function city_emperor_update() {
    update_debt_state();
    process_caesar_invasion();
}
export function city_emperor_init_selected_gift() {
    if (city_data.emperor.selected_gift_size == GIFT_LAVISH && !city_emperor_can_send_gift(GIFT_LAVISH)) {
        city_data.emperor.selected_gift_size = GIFT_GENEROUS;
    }
    if (city_data.emperor.selected_gift_size == GIFT_GENEROUS && !city_emperor_can_send_gift(GIFT_GENEROUS)) {
        city_data.emperor.selected_gift_size = GIFT_MODEST;
    }
}
export function city_emperor_set_gift_size(size: number) {
    if (city_data.emperor.gifts[size].cost <= city_data.emperor.personal_savings) {
        city_data.emperor.selected_gift_size = size;
        return 1;
    } else {
        return 0;
    }
}
export function city_emperor_selected_gift_size() {
    return city_data.emperor.selected_gift_size;
}
export function city_emperor_get_gift(size: number) {
    return city_data.emperor.gifts[size];
}
export function city_emperor_can_send_gift(size: number) {
    return city_data.emperor.gifts[size].cost <= city_data.emperor.personal_savings;
}
export function city_emperor_calculate_gift_costs() {
    let savings: number = city_data.emperor.personal_savings;
    city_data.emperor.gifts[GIFT_MODEST].cost = savings / 8 + 20;
    city_data.emperor.gifts[GIFT_GENEROUS].cost = savings / 4 + 50;
    city_data.emperor.gifts[GIFT_LAVISH].cost = savings / 2 + 100;
}
export function city_emperor_send_gift() {
    let size: number = city_data.emperor.selected_gift_size;
    if (size < GIFT_MODEST || size > GIFT_LAVISH) {
        return;
    }
    let cost: number = city_data.emperor.gifts[size].cost;
    if (cost > city_data.emperor.personal_savings) {
        return;
    }
    if (city_data.emperor.gift_overdose_penalty <= 0) {
        city_data.emperor.gift_overdose_penalty = 1;
        if (size == GIFT_MODEST) {
            city_ratings_change_favor(3);
        } else if (size == GIFT_GENEROUS) {
            city_ratings_change_favor(5);
        } else if (size == GIFT_LAVISH) {
            city_ratings_change_favor(10);
        }
    } else if (city_data.emperor.gift_overdose_penalty == 1) {
        city_data.emperor.gift_overdose_penalty = 2;
        if (size == GIFT_MODEST) {
            city_ratings_change_favor(1);
        } else if (size == GIFT_GENEROUS) {
            city_ratings_change_favor(3);
        } else if (size == GIFT_LAVISH) {
            city_ratings_change_favor(5);
        }
    } else if (city_data.emperor.gift_overdose_penalty == 2) {
        city_data.emperor.gift_overdose_penalty = 3;
        if (size == GIFT_MODEST) {
            city_ratings_change_favor(0);
        } else if (size == GIFT_GENEROUS) {
            city_ratings_change_favor(1);
        } else if (size == GIFT_LAVISH) {
            city_ratings_change_favor(3);
        }
    } else if (city_data.emperor.gift_overdose_penalty == 3) {
        city_data.emperor.gift_overdose_penalty = 4;
        if (size == GIFT_MODEST) {
            city_ratings_change_favor(0);
        } else if (size == GIFT_GENEROUS) {
            city_ratings_change_favor(0);
        } else if (size == GIFT_LAVISH) {
            city_ratings_change_favor(1);
        }
    }
    city_data.emperor.months_since_gift = 0;
    city_data.emperor.gifts[size].id++;
    if (city_data.emperor.gifts[size].id >= 4) {
        city_data.emperor.gifts[size].id = 0;
    }
    city_data.emperor.personal_savings -= cost
}
export function city_emperor_months_since_gift() {
    return city_data.emperor.months_since_gift;
}
export function city_emperor_salary_for_rank(rank: number) {
    return SALARY_FOR_RANK[rank];
}
export function city_emperor_set_salary_rank(rank: number) {
    city_data.emperor.salary_rank = rank;
    city_data.emperor.salary_amount = SALARY_FOR_RANK[rank];
}
export function city_emperor_salary_rank() {
    return city_data.emperor.salary_rank;
}
export function city_emperor_salary_amount() {
    return city_data.emperor.salary_amount;
}
export function city_emperor_personal_savings() {
    return city_data.emperor.personal_savings;
}
export function city_emperor_rank() {
    return city_data.emperor.player_rank;
}
export function city_emperor_init_donation_amount() {
    if (city_data.emperor.donate_amount > city_data.emperor.personal_savings) {
        city_data.emperor.donate_amount = city_data.emperor.personal_savings;
    }
}
export function city_emperor_set_donation_amount(amount: number) {
    city_data.emperor.donate_amount = calc_bound(amount, 0, city_data.emperor.personal_savings);
}
export function city_emperor_change_donation_amount(change: number) {
    city_emperor_set_donation_amount(city_data.emperor.donate_amount + change);
}
export function city_emperor_donate_savings_to_city() {
    city_finance_process_donation(city_data.emperor.donate_amount);
    city_data.emperor.personal_savings -= city_data.emperor.donate_amount
    city_finance_calculate_totals();
}
export function city_emperor_donate_amount() {
    return city_data.emperor.donate_amount;
}
export function city_emperor_mark_soldier_killed() {
    city_data.emperor.invasion.soldiers_killed++;
}
