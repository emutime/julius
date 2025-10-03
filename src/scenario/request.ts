import { MAX_REQUESTS } from 'scenario/data';
import { scenario_request_state } from 'scenario/request';
import REQUEST_STATE_NORMAL = scenario_request_state.REQUEST_STATE_NORMAL;
import REQUEST_STATE_OVERDUE = scenario_request_state.REQUEST_STATE_OVERDUE;
import REQUEST_STATE_DISPATCHED = scenario_request_state.REQUEST_STATE_DISPATCHED;
import REQUEST_STATE_DISPATCHED_LATE = scenario_request_state.REQUEST_STATE_DISPATCHED_LATE;
import REQUEST_STATE_IGNORED = scenario_request_state.REQUEST_STATE_IGNORED;
import REQUEST_STATE_RECEIVED = scenario_request_state.REQUEST_STATE_RECEIVED;
export class scenario_request {
    public id: number = 0;
    public state: scenario_request_state = null;
    public resource: number = 0;
    public amount: number = 0;
    public months_to_comply: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.id = args[0]);
        args.length >= 2 && (this.state = args[1]);
        args.length >= 3 && (this.resource = args[2]);
        args.length >= 4 && (this.amount = args[3]);
        args.length >= 5 && (this.months_to_comply = args[4]);
    }
}
import { building_type } from 'building/type';;
import { buffer } from 'core/buffer';
import { building } from 'building/building';
import { map_point } from 'map/point';
import { building_warehouses_remove_resource } from 'building/warehouse';
import { city_finance_process_sundry } from 'city/finance';
import { finance_overview } from 'city/finance';
import { message_category } from 'city/message';
import { message_advisor } from 'city/message';
import { city_message_type } from 'city/message';
import MESSAGE_CAESAR_REQUESTS_GOODS = city_message_type.MESSAGE_CAESAR_REQUESTS_GOODS;
import MESSAGE_CAESAR_REQUESTS_MONEY = city_message_type.MESSAGE_CAESAR_REQUESTS_MONEY;
import MESSAGE_CAESAR_REQUESTS_ARMY = city_message_type.MESSAGE_CAESAR_REQUESTS_ARMY;
import MESSAGE_REQUEST_REMINDER = city_message_type.MESSAGE_REQUEST_REMINDER;
import MESSAGE_REQUEST_RECEIVED = city_message_type.MESSAGE_REQUEST_RECEIVED;
import MESSAGE_REQUEST_REFUSED = city_message_type.MESSAGE_REQUEST_REFUSED;
import MESSAGE_REQUEST_REFUSED_OVERDUE = city_message_type.MESSAGE_REQUEST_REFUSED_OVERDUE;
import MESSAGE_REQUEST_RECEIVED_LATE = city_message_type.MESSAGE_REQUEST_RECEIVED_LATE;
import MESSAGE_REQUEST_CAN_COMPLY = city_message_type.MESSAGE_REQUEST_CAN_COMPLY;
import { city_message_type } from 'city/message';
import { city_message } from 'city/message';
import { city_message_post } from 'city/message';
import { city_population_remove_for_troop_request } from 'city/population';
import { selected_rating } from 'city/ratings';
import { city_ratings_change_favor } from 'city/ratings';
import { city_ratings_reduce_favor_missed_request } from 'city/ratings';
import { resource_trade_status } from 'city/constants';
import { resource_type } from 'game/resource';
import RESOURCE_WEAPONS = resource_type.RESOURCE_WEAPONS;
import RESOURCE_DENARII = resource_type.RESOURCE_DENARII;
import RESOURCE_TROOPS = resource_type.RESOURCE_TROOPS;
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
import { resource_type } from 'game/resource';
import { workshop_type } from 'game/resource';
import { resource_image_type } from 'game/resource';
import { resource_list } from 'city/resource';
import { city_resource_count } from 'city/resource';
import { random_generate_next } from 'core/random';
import { random_byte } from 'core/random';
import { game_time_year } from 'game/time';
import { game_time_month } from 'game/time';
import { tutorial_availability } from 'game/tutorial';
import { tutorial_build_buttons } from 'game/tutorial';
import { tutorial_adjust_request_year } from 'game/tutorial';
import { request_t } from 'scenario/data';
import { invasion_t } from 'scenario/data';
import { price_change_t } from 'scenario/data';
import { demand_change_t } from 'scenario/data';
export let scenario: scenario_t = new scenario_t();
export function scenario_request_init() {
    for (let i: number = 0; i < MAX_REQUESTS; i++) {
        random_generate_next();
        if (scenario.requests[i].resource) {
            scenario.requests[i].month = (random_byte() & 7) + 2;
            scenario.requests[i].months_to_comply = 12 * scenario.requests[i].deadline_years;
        }
    }
}
export function scenario_request_process() {
    for (let i: number = 0; i < MAX_REQUESTS; i++) {
        if (!scenario.requests[i].resource || scenario.requests[i].state > REQUEST_STATE_DISPATCHED_LATE) {
            continue
        }
        let state: number = scenario.requests[i].state;
        if (state == REQUEST_STATE_DISPATCHED || state == REQUEST_STATE_DISPATCHED_LATE) {
            --scenario.requests[i].months_to_comply;
            if (scenario.requests[i].months_to_comply <= 0) {
                if (state == REQUEST_STATE_DISPATCHED) {
                    city_message_post(1, MESSAGE_REQUEST_RECEIVED, i, 0);
                    city_ratings_change_favor(scenario.requests[i].favor);
                } else {
                    city_message_post(1, MESSAGE_REQUEST_RECEIVED_LATE, i, 0);
                    city_ratings_change_favor(scenario.requests[i].favor / 2);
                }
                scenario.requests[i].state = REQUEST_STATE_RECEIVED;
                scenario.requests[i].visible = 0;
            }
        } else {
            if (scenario.requests[i].visible) {
                --scenario.requests[i].months_to_comply;
                if (state == REQUEST_STATE_NORMAL) {
                    if (scenario.requests[i].months_to_comply == 12) {
                        city_message_post(1, MESSAGE_REQUEST_REMINDER, i, 0);
                    } else if (scenario.requests[i].months_to_comply <= 0) {
                        city_message_post(1, MESSAGE_REQUEST_REFUSED, i, 0);
                        scenario.requests[i].state = REQUEST_STATE_OVERDUE;
                        scenario.requests[i].months_to_comply = 24;
                        city_ratings_reduce_favor_missed_request(3);
                    }
                } else if (state == REQUEST_STATE_OVERDUE) {
                    if (scenario.requests[i].months_to_comply <= 0) {
                        city_message_post(1, MESSAGE_REQUEST_REFUSED_OVERDUE, i, 0);
                        scenario.requests[i].state = REQUEST_STATE_IGNORED;
                        scenario.requests[i].visible = 0;
                        city_ratings_reduce_favor_missed_request(5);
                    }
                }
                if (!scenario.requests[i].can_comply_dialog_shown &&
                    city_resource_count(scenario.requests[i].resource) >= scenario.requests[i].amount) {
                    scenario.requests[i].can_comply_dialog_shown = 1;
                    city_message_post(1, MESSAGE_REQUEST_CAN_COMPLY, i, 0);
                }
            } else {
                let year: number = scenario.start_year;
                if (!tutorial_adjust_request_year(year)) {
                    return;
                }
                if (game_time_year() == year + scenario.requests[i].year &&
                    game_time_month() == scenario.requests[i].month) {
                    scenario.requests[i].visible = 1;
                    if (city_resource_count(scenario.requests[i].resource) >= scenario.requests[i].amount) {
                        scenario.requests[i].can_comply_dialog_shown = 1;
                    }
                    if (scenario.requests[i].resource == RESOURCE_DENARII) {
                        city_message_post(1, MESSAGE_CAESAR_REQUESTS_MONEY, i, 0);
                    } else if (scenario.requests[i].resource == RESOURCE_TROOPS) {
                        city_message_post(1, MESSAGE_CAESAR_REQUESTS_ARMY, i, 0);
                    } else {
                        city_message_post(1, MESSAGE_CAESAR_REQUESTS_GOODS, i, 0);
                    }
                }
            }
        }
    }
}
export function scenario_request_dispatch(id: number) {
    if (scenario.requests[id].state == REQUEST_STATE_NORMAL) {
        scenario.requests[id].state = REQUEST_STATE_DISPATCHED;
    } else {
        scenario.requests[id].state = REQUEST_STATE_DISPATCHED_LATE;
    }
    scenario.requests[id].months_to_comply = (random_byte() & 3) + 1;
    scenario.requests[id].visible = 0;
    let amount: number = scenario.requests[id].amount;
    if (scenario.requests[id].resource == RESOURCE_DENARII) {
        city_finance_process_sundry(amount);
    } else if (scenario.requests[id].resource == RESOURCE_TROOPS) {
        city_population_remove_for_troop_request(amount);
        building_warehouses_remove_resource(RESOURCE_WEAPONS, amount);
    } else {
        building_warehouses_remove_resource(scenario.requests[id].resource, amount);
    }
}
export function scenario_request_get(id: number) {
    let request: scenario_request;
    request.id = id;
    request.amount = scenario.requests[id].amount;
    request.resource = scenario.requests[id].resource;
    request.state = scenario.requests[id].state;
    request.months_to_comply = scenario.requests[id].months_to_comply;
    return request;
}
export function scenario_request_foreach_visible(start_index: number, callback: void () {
    let index: number = start_index;
    for (let i: number = 0; i < MAX_REQUESTS; i++) {
        if (scenario.requests[i].resource && scenario.requests[i].visible) {
            callback(index, scenario_request_get(i));
            index++;
        }
    }
    return index;
}
export function scenario_request_get_visible(index: number) {
    for (let i: number = 0; i < MAX_REQUESTS; i++) {
        if (scenario.requests[i].resource && scenario.requests[i].visible &&
            scenario.requests[i].state <= 1) {
            if (index == 0) {
                return scenario_request_get(i);
            }
            index--;
        }
    }
    return 0;
}
