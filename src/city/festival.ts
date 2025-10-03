
import { building_warehouses_remove_resource } from 'building/warehouse';
import { festival_size } from 'city/constants';
import { city_finance_process_sundry } from 'city/finance';
import { city_message_post, city_message_type } from 'city/message';
import { city_sentiment_change_happiness } from 'city/sentiment';
import { resource_type } from 'game/resource';
;
import FESTIVAL_NONE = festival_size.FESTIVAL_NONE;
import FESTIVAL_SMALL = festival_size.FESTIVAL_SMALL;
import FESTIVAL_LARGE = festival_size.FESTIVAL_LARGE;
import FESTIVAL_GRAND = festival_size.FESTIVAL_GRAND;
import RESOURCE_WINE = resource_type.RESOURCE_WINE;
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
import RESOURCE_MAX_FOOD = resource_type.RESOURCE_MAX_FOOD;
export let city_data: city_data_t = new city_data_t();
import MESSAGE_SMALL_FESTIVAL = city_message_type.MESSAGE_SMALL_FESTIVAL;
import MESSAGE_LARGE_FESTIVAL = city_message_type.MESSAGE_LARGE_FESTIVAL;
import MESSAGE_GRAND_FESTIVAL = city_message_type.MESSAGE_GRAND_FESTIVAL;
export function city_festival_is_planned() {
    return city_data.festival.planned.size != FESTIVAL_NONE;
}
export function city_festival_months_since_last() {
    return city_data.festival.months_since_festival;
}
export function city_festival_small_cost() {
    return city_data.festival.small_cost;
}
export function city_festival_large_cost() {
    return city_data.festival.large_cost;
}
export function city_festival_grand_cost() {
    return city_data.festival.grand_cost;
}
export function city_festival_grand_wine() {
    return city_data.festival.grand_wine;
}
export function city_festival_out_of_wine() {
    return city_data.festival.not_enough_wine;
}
export function city_festival_selected_god() {
    return city_data.festival.selected.god;
}
export function city_festival_select_god(god_id: number) {
    city_data.festival.selected.god = god_id;
}
export function city_festival_selected_size() {
    return city_data.festival.selected.size;
}
export function city_festival_select_size(size: number) {
    if (size == FESTIVAL_GRAND && city_data.festival.not_enough_wine) {
        return 0;
    }
    city_data.festival.selected.size = size;
    return 1;
}
export function city_festival_schedule() {
    city_data.festival.planned.god = city_data.festival.selected.god;
    city_data.festival.planned.size = city_data.festival.selected.size;
    let cost: number;
    if (city_data.festival.selected.size == FESTIVAL_SMALL) {
        city_data.festival.planned.months_to_go = 2;
        cost = city_data.festival.small_cost;
    } else if (city_data.festival.selected.size == FESTIVAL_LARGE) {
        city_data.festival.planned.months_to_go = 3;
        cost = city_data.festival.large_cost;
    } else {
        city_data.festival.planned.months_to_go = 4;
        cost = city_data.festival.grand_cost;
    }
    city_finance_process_sundry(cost);
    if (city_data.festival.selected.size == FESTIVAL_GRAND) {
        building_warehouses_remove_resource(RESOURCE_WINE, city_data.festival.grand_wine);
    }
}
function throw_party() {
    if (city_data.festival.first_festival_effect_months <= 0) {
        city_data.festival.first_festival_effect_months = 12;
        switch (city_data.festival.planned.size) {
            case FESTIVAL_SMALL:
                city_sentiment_change_happiness(7);
                break
            case FESTIVAL_LARGE:
                city_sentiment_change_happiness(9);
                break
            case FESTIVAL_GRAND:
                city_sentiment_change_happiness(12);
                break
        }
    } else if (city_data.festival.second_festival_effect_months <= 0) {
        city_data.festival.second_festival_effect_months = 12;
        switch (city_data.festival.planned.size) {
            case FESTIVAL_SMALL:
                city_sentiment_change_happiness(2);
                break
            case FESTIVAL_LARGE:
                city_sentiment_change_happiness(3);
                break
            case FESTIVAL_GRAND:
                city_sentiment_change_happiness(5);
                break
        }
    }
    city_data.festival.months_since_festival = 1;
    city_data.religion.gods[city_data.festival.planned.god].months_since_festival = 0;
    switch (city_data.festival.planned.size) {
        case FESTIVAL_SMALL:
            city_message_post(1, MESSAGE_SMALL_FESTIVAL, 0, 0);
            break
        case FESTIVAL_LARGE:
            city_message_post(1, MESSAGE_LARGE_FESTIVAL, 0, 0);
            break
        case FESTIVAL_GRAND:
            city_message_post(1, MESSAGE_GRAND_FESTIVAL, 0, 0);
            break
    }
    city_data.festival.planned.size = FESTIVAL_NONE;
    city_data.festival.planned.months_to_go = 0;
}
export function city_festival_update() {
    city_data.festival.months_since_festival++;
    if (city_data.festival.first_festival_effect_months) {
        --city_data.festival.first_festival_effect_months;
    }
    if (city_data.festival.second_festival_effect_months) {
        --city_data.festival.second_festival_effect_months;
    }
    if (city_festival_is_planned()) {
        city_data.festival.planned.months_to_go--;
        if (city_data.festival.planned.months_to_go <= 0) {
            throw_party();
        }
    }
}
export function city_festival_calculate_costs() {
    city_data.festival.small_cost = city_data.population.population / 20 + 10;
    city_data.festival.large_cost = city_data.population.population / 10 + 20;
    city_data.festival.grand_cost = city_data.population.population / 5 + 40;
    city_data.festival.grand_wine = city_data.population.population / 500 + 1;
    city_data.festival.not_enough_wine = 0;
    if (city_data.resource.stored_in_warehouses[RESOURCE_WINE] < city_data.festival.grand_wine) {
        city_data.festival.not_enough_wine = 1;
        if (city_data.festival.selected.size == FESTIVAL_GRAND) {
            city_data.festival.selected.size = FESTIVAL_LARGE;
        }
    }
}
