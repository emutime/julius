export const MAX_CITIES = 41;
import { city_buildings_has_working_dock } from 'city/buildings';
import { city_finance_process_construction } from 'city/finance';
import { city_map_entry_point } from 'city/map';
import { city_message_post_with_message_delay, city_message_type, message_category } from 'city/message';
import { city_trade_add_land_trade_route, city_trade_add_sea_trade_route, city_trade_has_land_trade_problems, city_trade_has_sea_trade_problems } from 'city/trade';
import { buffer, buffer_read_i16, buffer_read_u8, buffer_skip, buffer_write_i16, buffer_write_u8 } from 'core/buffer';
import { empire_object_set_expanded } from 'empire/object';
import { trade_route_limit, trade_route_reset_traded } from 'empire/trade_route';
import { empire_city_type } from 'empire/type';
import { figure_create_trade_caravan, figure_create_trade_ship } from 'figuretype/trader';
import { resource_type } from 'game/resource';
import { map_point, map_tile } from 'map/point';
import { scenario_map_has_river_entry, scenario_map_river_entry } from 'scenario/map';
import RESOURCE_OLIVES = resource_type.RESOURCE_OLIVES;
import RESOURCE_VINES = resource_type.RESOURCE_VINES;
import RESOURCE_WINE = resource_type.RESOURCE_WINE;
import RESOURCE_OIL = resource_type.RESOURCE_OIL;
import RESOURCE_IRON = resource_type.RESOURCE_IRON;
import RESOURCE_TIMBER = resource_type.RESOURCE_TIMBER;
import RESOURCE_CLAY = resource_type.RESOURCE_CLAY;
import RESOURCE_WEAPONS = resource_type.RESOURCE_WEAPONS;
import RESOURCE_FURNITURE = resource_type.RESOURCE_FURNITURE;
import RESOURCE_POTTERY = resource_type.RESOURCE_POTTERY;
import RESOURCE_MIN = resource_type.RESOURCE_MIN;
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
export class empire_city {
    public in_use: number = 0;
    public type: number = 0;
    public name_id: number = 0;
    public route_id: number = 0;
    public is_open: number = 0;
    public buys_resource: number[] = new Array(RESOURCE_MAX).fill(0);
    public sells_resource: number[] = new Array(RESOURCE_MAX).fill(0);
    public cost_to_open: number = 0;
    public trader_entry_delay: number = 0;
    public empire_object_id: number = 0;
    public is_sea_trade: number = 0;
    public trader_figure_ids: number[] = new Array(3).fill(0);
    public constructor(...args: any[]) {
        args.length >= 1 && (this.in_use = args[0]);
        args.length >= 2 && (this.type = args[1]);
        args.length >= 3 && (this.name_id = args[2]);
        args.length >= 4 && (this.route_id = args[3]);
        args.length >= 5 && (this.is_open = args[4]);
        args.length >= 6 && (this.buys_resource = args[5]);
        args.length >= 7 && (this.sells_resource = args[6]);
        args.length >= 8 && (this.cost_to_open = args[7]);
        args.length >= 9 && (this.trader_entry_delay = args[8]);
        args.length >= 10 && (this.empire_object_id = args[9]);
        args.length >= 11 && (this.is_sea_trade = args[10]);
        args.length >= 12 && (this.trader_figure_ids = args[11]);
    }
}
import MESSAGE_CAT_NO_WORKING_DOCK = message_category.MESSAGE_CAT_NO_WORKING_DOCK;
import MESSAGE_NO_WORKING_DOCK = city_message_type.MESSAGE_NO_WORKING_DOCK;
import EMPIRE_CITY_DISTANT_ROMAN = empire_city_type.EMPIRE_CITY_DISTANT_ROMAN;
import EMPIRE_CITY_OURS = empire_city_type.EMPIRE_CITY_OURS;
import EMPIRE_CITY_TRADE = empire_city_type.EMPIRE_CITY_TRADE;
import EMPIRE_CITY_FUTURE_TRADE = empire_city_type.EMPIRE_CITY_FUTURE_TRADE;
import EMPIRE_CITY_DISTANT_FOREIGN = empire_city_type.EMPIRE_CITY_DISTANT_FOREIGN;
import EMPIRE_CITY_VULNERABLE_ROMAN = empire_city_type.EMPIRE_CITY_VULNERABLE_ROMAN;
import EMPIRE_CITY_FUTURE_ROMAN = empire_city_type.EMPIRE_CITY_FUTURE_ROMAN;
let cities: empire_city[] = new Array(MAX_CITIES);
export function empire_city_clear_all() {
    for (let i: number = 0; i < MAX_CITIES; i++) {
        cities[i] = new empire_city(0, 0, 0, 0, 0, new Array(RESOURCE_MAX).fill(0), new Array(RESOURCE_MAX).fill(0), 0, 0, 0, 0, new Array(3).fill(0));
    }
}
export function empire_city_get(city_id: number) {
    if (city_id >= 0 && city_id < MAX_CITIES) {
        return cities[city_id];
    } else {
        return null;
    }
}
export function empire_city_get_route_id(city_id: number) {
    return cities[city_id].route_id;
}
export function empire_can_import_resource(resource: number) {
    for (let i: number = 0; i < MAX_CITIES; i++) {
        if (cities[i].in_use &&
            cities[i].type == EMPIRE_CITY_TRADE &&
            cities[i].is_open &&
            cities[i].sells_resource[resource] == 1) {
            return 1;
        }
    }
    return 0;
}
export function empire_can_import_resource_potentially(resource: number) {
    for (let i: number = 0; i < MAX_CITIES; i++) {
        if (cities[i].in_use &&
            cities[i].type == EMPIRE_CITY_TRADE &&
            cities[i].sells_resource[resource] == 1) {
            return 1;
        }
    }
    return 0;
}
export function empire_can_export_resource(resource: number) {
    for (let i: number = 0; i < MAX_CITIES; i++) {
        if (cities[i].in_use &&
            cities[i].type == EMPIRE_CITY_TRADE &&
            cities[i].is_open &&
            cities[i].buys_resource[resource] == 1) {
            return 1;
        }
    }
    return 0;
}
function can_produce_resource(resource: number) {
    for (let i: number = 0; i < MAX_CITIES; i++) {
        if (cities[i].in_use &&
            cities[i].type == EMPIRE_CITY_OURS &&
            cities[i].sells_resource[resource] == 1) {
            return 1;
        }
    }
    return 0;
}
function get_raw_resource(resource: number) {
    switch (resource) {
        case RESOURCE_POTTERY:
            return RESOURCE_CLAY;
        case RESOURCE_FURNITURE:
            return RESOURCE_TIMBER;
        case RESOURCE_OIL:
            return RESOURCE_OLIVES;
        case RESOURCE_WINE:
            return RESOURCE_VINES;
        case RESOURCE_WEAPONS:
            return RESOURCE_IRON;
        default:
            return resource
    }
}
export function empire_can_produce_resource(resource: number) {
    let raw_resource: number = get_raw_resource(resource);
    if (raw_resource != resource && empire_can_import_resource(raw_resource)) {
        return 1;
    }
    return can_produce_resource(raw_resource);
}
export function empire_can_produce_resource_potentially(resource: number) {
    let raw_resource: number = get_raw_resource(resource);
    if (raw_resource != resource && empire_can_import_resource_potentially(raw_resource)) {
        return 1;
    }
    return can_produce_resource(raw_resource);
}
export function empire_city_get_for_object(empire_object_id: number) {
    for (let i: number = 0; i < MAX_CITIES; i++) {
        if (cities[i].in_use && cities[i].empire_object_id == empire_object_id) {
            return i;
        }
    }
    return 0;
}
export function empire_city_get_for_trade_route(route_id: number) {
    for (let i: number = 0; i < MAX_CITIES; i++) {
        if (cities[i].in_use && cities[i].route_id == route_id) {
            return i;
        }
    }
    return -1;
}
export function empire_city_is_trade_route_open(route_id: number) {
    for (let i: number = 0; i < MAX_CITIES; i++) {
        if (cities[i].in_use && cities[i].route_id == route_id) {
            return cities[i].is_open ? 1 : 0;
        }
    }
    return 0;
}
export function empire_city_reset_yearly_trade_amounts() {
    for (let i: number = 0; i < MAX_CITIES; i++) {
        if (cities[i].in_use && cities[i].is_open) {
            trade_route_reset_traded(cities[i].route_id);
        }
    }
}
export function empire_city_count_wine_sources() {
    let sources: number = 0;
    for (let i: number = 1; i < MAX_CITIES; i++) {
        if (cities[i].in_use &&
            cities[i].is_open &&
            cities[i].sells_resource[RESOURCE_WINE]) {
            sources++;
        }
    }
    return sources;
}
export function empire_city_get_vulnerable_roman() {
    let city: number = 0;
    for (let i: number = 0; i < MAX_CITIES; i++) {
        if (cities[i].in_use) {
            if (cities[i].type == EMPIRE_CITY_VULNERABLE_ROMAN) {
                city = i;
            }
        }
    }
    return city;
}
export function empire_city_expand_empire() {
    for (let i: number = 0; i < MAX_CITIES; i++) {
        if (!cities[i].in_use) {
            continue
        }
        if (cities[i].type == EMPIRE_CITY_FUTURE_TRADE) {
            cities[i].type = EMPIRE_CITY_TRADE;
        } else if (cities[i].type == EMPIRE_CITY_FUTURE_ROMAN) {
            cities[i].type = EMPIRE_CITY_DISTANT_ROMAN;
        } else {
            continue
        }
        empire_object_set_expanded(cities[i].empire_object_id, cities[i].type);
    }
}
function generate_trader(city_id: number, city: empire_city) {
    let max_traders: number = 0;
    let num_resources: number = 0;
    for (let r: number = RESOURCE_MIN; r < RESOURCE_MAX; r++) {
        if (city.buys_resource[r] || city.sells_resource[r]) {
            ++num_resources;
            switch (trade_route_limit(city.route_id, r)) {
                case 15:
                    max_traders += 1
                    break
                case 25:
                    max_traders += 2
                    break
                case 40:
                    max_traders += 3
                    break
            }
        }
    }
    if (num_resources > 1) {
        if (max_traders % num_resources) {
            max_traders = max_traders / num_resources + 1;
        } else {
            max_traders = max_traders / num_resources;
        }
    }
    if (max_traders <= 0) {
        return 0;
    }
    let index: number;
    if (max_traders == 1) {
        if (!city.trader_figure_ids[0]) {
            index = 0;
        } else {
            return 0;
        }
    } else if (max_traders == 2) {
        if (!city.trader_figure_ids[0]) {
            index = 0;
        } else if (!city.trader_figure_ids[1]) {
            index = 1;
        } else {
            return 0;
        }
    } else {
        if (!city.trader_figure_ids[0]) {
            index = 0;
        } else if (!city.trader_figure_ids[1]) {
            index = 1;
        } else if (!city.trader_figure_ids[2]) {
            index = 2;
        } else {
            return 0;
        }
    }
    if (city.trader_entry_delay > 0) {
        city.trader_entry_delay--;
        return 0;
    }
    city.trader_entry_delay = city.is_sea_trade ? 30 : 4;
    if (city.is_sea_trade) {
        if (city_buildings_has_working_dock() && scenario_map_has_river_entry()
            && !city_trade_has_sea_trade_problems()) {
            let river_entry: map_point = scenario_map_river_entry();
            city.trader_figure_ids[index] = figure_create_trade_ship(river_entry.x, river_entry.y, city_id);
            return 1;
        }
    } else {
        if (!city_trade_has_land_trade_problems()) {
            let entry: map_tile = city_map_entry_point();
            city.trader_figure_ids[index] = figure_create_trade_caravan(entry.x, entry.y, city_id);
            return 1;
        }
    }
    return 0;
}
export function empire_city_open_trade(city_id: number) {
    let city: empire_city = cities[city_id];
    city_finance_process_construction(city.cost_to_open);
    city.is_open = 1;
}
export function empire_city_generate_trader() {
    for (let i: number = 1; i < MAX_CITIES; i++) {
        if (!cities[i].in_use || !cities[i].is_open) {
            continue
        }
        if (cities[i].is_sea_trade) {
            if (!city_buildings_has_working_dock()) {
                city_message_post_with_message_delay(MESSAGE_CAT_NO_WORKING_DOCK, true, MESSAGE_NO_WORKING_DOCK, 384);
                continue
            }
            if (!scenario_map_has_river_entry()) {
                continue
            }
            city_trade_add_sea_trade_route();
        } else {
            city_trade_add_land_trade_route();
        }
        if (generate_trader(i, cities[i])) {
            break
        }
    }
}
export function empire_city_remove_trader(city_id: number, figure_id: number) {
    for (let i: number = 0; i < 3; i++) {
        if (cities[city_id].trader_figure_ids[i] == figure_id) {
            cities[city_id].trader_figure_ids[i] = 0;
        }
    }
}
export function empire_city_set_vulnerable(city_id: number) {
    cities[city_id].type = EMPIRE_CITY_VULNERABLE_ROMAN;
}
export function empire_city_set_foreign(city_id: number) {
    cities[city_id].type = EMPIRE_CITY_DISTANT_FOREIGN;
}
export function empire_city_save_state(buf: buffer) {
    for (let i: number = 0; i < MAX_CITIES; i++) {
        let city: empire_city = cities[i];
        buffer_write_u8(buf, city.in_use);
        buffer_write_u8(buf, 0);
        buffer_write_u8(buf, city.type);
        buffer_write_u8(buf, city.name_id);
        buffer_write_u8(buf, city.route_id);
        buffer_write_u8(buf, city.is_open);
        for (let r: number = 0; r < RESOURCE_MAX; r++) {
            buffer_write_u8(buf, city.buys_resource[r]);
        }
        for (let r: number = 0; r < RESOURCE_MAX; r++) {
            buffer_write_u8(buf, city.sells_resource[r]);
        }
        buffer_write_i16(buf, city.cost_to_open);
        buffer_skip(buf, 2);
        buffer_write_i16(buf, city.trader_entry_delay);
        buffer_write_i16(buf, 0);
        buffer_write_i16(buf, city.empire_object_id);
        buffer_write_u8(buf, city.is_sea_trade);
        buffer_write_u8(buf, 0);
        for (let f: number = 0; f < 3; f++) {
            buffer_write_i16(buf, city.trader_figure_ids[f]);
        }
        for (let p: number = 0; p < 10; p++) {
            buffer_write_u8(buf, 0);
        }
    }
}
export function empire_city_load_state(buf: buffer) {
    for (let i: number = 0; i < MAX_CITIES; i++) {
        let city: empire_city = cities[i];
        city.in_use = buffer_read_u8(buf);
        buffer_skip(buf, 1);
        city.type = buffer_read_u8(buf);
        city.name_id = buffer_read_u8(buf);
        city.route_id = buffer_read_u8(buf);
        city.is_open = buffer_read_u8(buf);
        for (let r: number = 0; r < RESOURCE_MAX; r++) {
            city.buys_resource[r] = buffer_read_u8(buf);
        }
        for (let r: number = 0; r < RESOURCE_MAX; r++) {
            city.sells_resource[r] = buffer_read_u8(buf);
        }
        city.cost_to_open = buffer_read_i16(buf);
        buffer_skip(buf, 2);
        city.trader_entry_delay = buffer_read_i16(buf);
        buffer_skip(buf, 2);
        city.empire_object_id = buffer_read_i16(buf);
        city.is_sea_trade = buffer_read_u8(buf);
        buffer_skip(buf, 1);
        for (let f: number = 0; f < 3; f++) {
            city.trader_figure_ids[f] = buffer_read_i16(buf);
        }
        buffer_skip(buf, 10);
    }
}
