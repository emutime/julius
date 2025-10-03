import { building, building_get, building_main, MAX_BUILDINGS } from 'building/building';
import { building_is_workshop } from 'building/industry';
import { model_get_building, model_get_house } from 'building/model';
import { building_state, building_type } from 'building/type';
import { resource_trade_status } from 'city/constants';
import { calc_adjust_with_percentage, calc_bound, calc_percentage } from 'core/calc';
import { empire_can_export_resource, empire_can_import_resource, empire_can_produce_resource } from 'empire/city';
import { inventory_type, resource_type } from 'game/resource';
import { tutorial_on_filled_granary } from 'game/tutorial';
import { map_has_road_access, map_has_road_access_granary } from 'map/road_access';
import { scenario_building_allowed } from 'scenario/building';
import { scenario_property_rome_supplies_wheat } from 'scenario/property';
import TRADE_STATUS_NONE = resource_trade_status.TRADE_STATUS_NONE;
import TRADE_STATUS_IMPORT = resource_trade_status.TRADE_STATUS_IMPORT;
import TRADE_STATUS_EXPORT = resource_trade_status.TRADE_STATUS_EXPORT;
import RESOURCE_NONE = resource_type.RESOURCE_NONE;
import RESOURCE_OLIVES = resource_type.RESOURCE_OLIVES;
import RESOURCE_VINES = resource_type.RESOURCE_VINES;
import RESOURCE_MEAT = resource_type.RESOURCE_MEAT;
import RESOURCE_MIN = resource_type.RESOURCE_MIN;
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
import RESOURCE_MIN_FOOD = resource_type.RESOURCE_MIN_FOOD;
import RESOURCE_MAX_FOOD = resource_type.RESOURCE_MAX_FOOD;
import INVENTORY_WHEAT = inventory_type.INVENTORY_WHEAT;
import INVENTORY_MIN_FOOD = inventory_type.INVENTORY_MIN_FOOD;
import INVENTORY_MAX_FOOD = inventory_type.INVENTORY_MAX_FOOD;
export class resource_list {
    public size: number = 0;
    public items: number[] = new Array(RESOURCE_MAX).fill(0);
    public constructor(...args: any[]) {
        args.length >= 1 && (this.size = args[0]);
        args.length >= 2 && (this.items = args[1]);
    }
}
import BUILDING_MARKET = building_type.BUILDING_MARKET;
import BUILDING_GRANARY = building_type.BUILDING_GRANARY;
import BUILDING_WAREHOUSE = building_type.BUILDING_WAREHOUSE;
import BUILDING_WAREHOUSE_SPACE = building_type.BUILDING_WAREHOUSE_SPACE;
import BUILDING_WHARF = building_type.BUILDING_WHARF;
import BUILDING_STATE_IN_USE = building_state.BUILDING_STATE_IN_USE;;
export let city_data: city_data_t = new city_data_t();
export class unnamed14_8 {
    public resource_list: resource_list = null;
    public food_list: resource_list = null;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.resource_list = args[0]);
        args.length >= 2 && (this.food_list = args[1]);
    }
}
let available: unnamed14_8 = new unnamed14_8();
export function city_resource_count(resource: resource_type) {
    return city_data.resource.stored_in_warehouses[resource];
}
export function city_resource_get_available() {
    return available.resource_list;
}
export function city_resource_get_available_foods() {
    return available.food_list;
}
export function city_resource_multiple_wine_available() {
    return city_data.resource.wine_types_available >= 2;
}
export function city_resource_food_types_available() {
    return city_data.resource.food_types_available;
}
export function city_resource_food_stored() {
    return city_data.resource.granary_total_stored;
}
export function city_resource_food_needed() {
    return city_data.resource.food_needed_per_month;
}
export function city_resource_food_supply_months() {
    return city_data.resource.food_supply_months;
}
export function city_resource_food_percentage_produced() {
    return calc_percentage(city_data.resource.food_produced_last_month, city_data.resource.food_consumed_last_month);
}
export function city_resource_operating_granaries() {
    return city_data.resource.granaries.operating;
}
export function city_resource_last_used_warehouse() {
    return city_data.resource.last_used_warehouse;
}
export function city_resource_set_last_used_warehouse(warehouse_id: number) {
    city_data.resource.last_used_warehouse = warehouse_id;
}
export function city_resource_trade_status(resource: resource_type) {
    return city_data.resource.trade_status[resource];
}
export function city_resource_cycle_trade_status(resource: resource_type) {
    ++city_data.resource.trade_status[resource];
    if (city_data.resource.trade_status[resource] > TRADE_STATUS_EXPORT) {
        city_data.resource.trade_status[resource] = TRADE_STATUS_NONE;
    }
    if (city_data.resource.trade_status[resource] == TRADE_STATUS_IMPORT &&
        !empire_can_import_resource(resource)) {
        city_data.resource.trade_status[resource] = TRADE_STATUS_EXPORT;
    }
    if (city_data.resource.trade_status[resource] == TRADE_STATUS_EXPORT &&
        !empire_can_export_resource(resource)) {
        city_data.resource.trade_status[resource] = TRADE_STATUS_NONE;
    }
    if (city_data.resource.trade_status[resource] == TRADE_STATUS_EXPORT) {
        city_data.resource.stockpiled[resource] = 0;
    }
}
export function city_resource_export_over(resource: resource_type) {
    return city_data.resource.export_over[resource];
}
export function city_resource_change_export_over(resource: resource_type, change: number) {
    city_data.resource.export_over[resource] = calc_bound(city_data.resource.export_over[resource] + change, 0, 100);
}
export function city_resource_is_stockpiled(resource: resource_type) {
    return city_data.resource.stockpiled[resource];
}
export function city_resource_toggle_stockpiled(resource: resource_type) {
    if (city_data.resource.stockpiled[resource]) {
        city_data.resource.stockpiled[resource] = 0;
    } else {
        city_data.resource.stockpiled[resource] = 1;
        if (city_data.resource.trade_status[resource] == TRADE_STATUS_EXPORT) {
            city_data.resource.trade_status[resource] = TRADE_STATUS_NONE;
        }
    }
}
export function city_resource_is_mothballed(resource: resource_type) {
    return city_data.resource.mothballed[resource];
}
export function city_resource_toggle_mothballed(resource: resource_type) {
    city_data.resource.mothballed[resource] = city_data.resource.mothballed[resource] ? 0 : 1;
}
export function city_resource_has_workshop_with_room(workshop_type: number) {
    return city_data.resource.space_in_workshops[workshop_type] > 0;
}
export function city_resource_add_produced_to_granary(amount: number) {
    city_data.resource.food_produced_this_month += amount
}
export function city_resource_remove_from_granary(food: resource_type, amount: number) {
    city_data.resource.granary_food_stored[food] -= amount
}
export function city_resource_add_to_warehouse(resource: resource_type, amount: number) {
    city_data.resource.space_in_warehouses[resource] -= amount
    city_data.resource.stored_in_warehouses[resource] += amount
}
export function city_resource_remove_from_warehouse(resource: resource_type, amount: number) {
    city_data.resource.space_in_warehouses[resource] += amount
    city_data.resource.stored_in_warehouses[resource] -= amount
}
export function city_resource_calculate_warehouse_stocks() {
    for (let i: number = 0; i < RESOURCE_MAX; i++) {
        city_data.resource.space_in_warehouses[i] = 0;
        city_data.resource.stored_in_warehouses[i] = 0;
    }
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state == BUILDING_STATE_IN_USE && b.type == BUILDING_WAREHOUSE) {
            b.has_road_access = 0;
            if (map_has_road_access(b.x, b.y, b.size, 0)) {
                b.has_road_access = 1;
            } else if (map_has_road_access(b.x, b.y, 3, 0)) {
                b.has_road_access = 2;
            }
        }
    }
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state != BUILDING_STATE_IN_USE || b.type != BUILDING_WAREHOUSE_SPACE) {
            continue
        }
        let warehouse: building = building_main(b);
        if (warehouse.has_road_access) {
            b.has_road_access = warehouse.has_road_access;
            if (b.subtype.warehouse_resource_id) {
                let loads: number = b.loads_stored;
                let resource: number = b.subtype.warehouse_resource_id;
                city_data.resource.stored_in_warehouses[resource] += loads
                city_data.resource.space_in_warehouses[resource] += 4 - loads
            } else {
                city_data.resource.space_in_warehouses[RESOURCE_NONE] += 4
            }
        }
    }
}
export function city_resource_determine_available() {
    for (let i: number = 0; i < RESOURCE_MAX; i++) {
        available.resource_list.items[i] = 0;
        available.food_list.items[i] = 0;
    }
    available.resource_list.size = 0;
    available.food_list.size = 0;
    for (let i: number = RESOURCE_MIN; i < RESOURCE_MAX; i++) {
        if (empire_can_produce_resource(i) || empire_can_import_resource(i) ||
            (i == RESOURCE_MEAT && scenario_building_allowed(BUILDING_WHARF))) {
            available.resource_list.items[available.resource_list.size++] = i;
        }
    }
    for (let i: number = RESOURCE_MIN_FOOD; i < RESOURCE_MAX_FOOD; i++) {
        if (i == RESOURCE_OLIVES || i == RESOURCE_VINES) {
            continue
        }
        if (empire_can_produce_resource(i) || empire_can_import_resource(i) ||
            (i == RESOURCE_MEAT && scenario_building_allowed(BUILDING_WHARF))) {
            available.food_list.items[available.food_list.size++] = i;
        }
    }
}
function calculate_available_food() {
    for (let i: number = 0; i < RESOURCE_MAX_FOOD; i++) {
        city_data.resource.granary_food_stored[i] = 0;
    }
    city_data.resource.granary_total_stored = 0;
    city_data.resource.food_types_available = 0;
    city_data.resource.food_supply_months = 0;
    city_data.resource.granaries.operating = 0;
    city_data.resource.granaries.understaffed = 0;
    city_data.resource.granaries.not_operating = 0;
    city_data.resource.granaries.not_operating_with_food = 0;
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state != BUILDING_STATE_IN_USE || b.type != BUILDING_GRANARY) {
            continue
        }
        b.has_road_access = 0;
        if (map_has_road_access_granary(b.x, b.y, 0)) {
            b.has_road_access = 1;
            let pct_workers: number = calc_percentage(
                b.num_workers, model_get_building(b.type).laborers);
            if (pct_workers < 100) {
                city_data.resource.granaries.understaffed++;
            }
            let amount_stored: number = 0;
            for (let r: number = RESOURCE_MIN_FOOD; r < RESOURCE_MAX_FOOD; r++) {
                amount_stored += b.data.granary.resource_stored[r]
            }
            if (pct_workers < 50) {
                city_data.resource.granaries.not_operating++;
                if (amount_stored > 0) {
                    city_data.resource.granaries.not_operating_with_food++;
                }
            } else {
                city_data.resource.granaries.operating++;
                for (let r: number = 0; r < RESOURCE_MAX_FOOD; r++) {
                    city_data.resource.granary_food_stored[r] += b.data.granary.resource_stored[r]
                }
                if (amount_stored > 400) {
                    tutorial_on_filled_granary();
                }
            }
        }
    }
    for (let i: number = RESOURCE_MIN_FOOD; i < RESOURCE_MAX_FOOD; i++) {
        if (city_data.resource.granary_food_stored[i]) {
            city_data.resource.granary_total_stored += city_data.resource.granary_food_stored[i]
            city_data.resource.food_types_available++;
        }
    }
    city_data.resource.food_needed_per_month =
        calc_adjust_with_percentage(city_data.population.population, 50);
    if (city_data.resource.food_needed_per_month > 0) {
        city_data.resource.food_supply_months =
            city_data.resource.granary_total_stored / city_data.resource.food_needed_per_month;
    } else {
        city_data.resource.food_supply_months =
            city_data.resource.granary_total_stored > 0 ? 1 : 0;
    }
    if (scenario_property_rome_supplies_wheat()) {
        city_data.resource.food_types_available = 1;
        city_data.resource.food_supply_months = 12;
    }
}
export function city_resource_calculate_food_stocks_and_supply_wheat() {
    calculate_available_food();
    if (scenario_property_rome_supplies_wheat()) {
        for (let i: number = 1; i < MAX_BUILDINGS; i++) {
            let b: building = building_get(i);
            if (b.state == BUILDING_STATE_IN_USE && b.type == BUILDING_MARKET) {
                b.data.market.inventory[INVENTORY_WHEAT] = 200;
            }
        }
    }
}
export function city_resource_calculate_workshop_stocks() {
    for (let i: number = 0; i < 6; i++) {
        city_data.resource.stored_in_workshops[i] = 0;
        city_data.resource.space_in_workshops[i] = 0;
    }
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state != BUILDING_STATE_IN_USE || !building_is_workshop(b.type)) {
            continue
        }
        b.has_road_access = 0;
        if (map_has_road_access(b.x, b.y, b.size, 0)) {
            b.has_road_access = 1;
            let room: number = 2 - b.loads_stored;
            if (room < 0) {
                room = 0;
            }
            let workshop_resource: number = b.subtype.workshop_type;
            city_data.resource.space_in_workshops[workshop_resource] += room
            city_data.resource.stored_in_workshops[workshop_resource] += b.loads_stored
        }
    }
}
export function city_resource_consume_food() {
    calculate_available_food();
    city_data.resource.food_types_eaten = 0;
    city_data.unused.unknown_00c0 = 0;
    let total_consumed: number = 0;
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state == BUILDING_STATE_IN_USE && b.house_size) {
            let num_types: number = model_get_house(b.subtype.house_level).food_types;
            let amount_per_type: number = calc_adjust_with_percentage(b.house_population, 50);
            if (num_types > 1) {
                amount_per_type /= num_types
            }
            b.data.house.num_foods = 0;
            if (scenario_property_rome_supplies_wheat()) {
                city_data.resource.food_types_eaten = 1;
                city_data.resource.food_types_available = 1;
                b.data.house.inventory[INVENTORY_WHEAT] = amount_per_type;
                b.data.house.num_foods = 1;
            } else if (num_types > 0) {
                for (let t: number = INVENTORY_MIN_FOOD; t < INVENTORY_MAX_FOOD && b.data.house.num_foods < num_types; t++) {
                    if (b.data.house.inventory[t] >= amount_per_type) {
                        b.data.house.inventory[t] -= amount_per_type
                        b.data.house.num_foods++;
                        total_consumed += amount_per_type
                    } else if (b.data.house.inventory[t]) {
                        b.data.house.inventory[t] = 0;
                        b.data.house.num_foods++;
                        total_consumed += amount_per_type
                    }
                    if (b.data.house.num_foods > city_data.resource.food_types_eaten) {
                        city_data.resource.food_types_eaten = b.data.house.num_foods;
                    }
                }
            }
        }
    }
    city_data.resource.food_consumed_last_month = total_consumed;
    city_data.resource.food_produced_last_month = city_data.resource.food_produced_this_month;
    city_data.resource.food_produced_this_month = 0;
}
