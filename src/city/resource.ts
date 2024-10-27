// 引入相关模块
import { building_get, building_is_workshop, building_main } from './building/building';
import { model_get_building, model_get_house } from './building/model';
import { city_data } from './city/data_private';
import { calc_adjust_with_percentage, calc_bound, calc_percentage } from './core/calc';
import { empire_can_export_resource, empire_can_import_resource, empire_can_produce_resource } from './empire/city';
import { tutorial_on_filled_granary } from './game/tutorial';
import { map_has_road_access, map_has_road_access_granary } from './map/road_access';
import { BUILDING_GRANARY, BUILDING_STATE_IN_USE, BUILDING_WAREHOUSE, BUILDING_WAREHOUSE_SPACE, BUILDING_WHARF, INVENTORY_MAX_FOOD, INVENTORY_MIN_FOOD, INVENTORY_WHEAT, MAX_BUILDINGS, resource_list, RESOURCE_MAX, RESOURCE_MAX_FOOD, RESOURCE_MEAT, RESOURCE_MIN, RESOURCE_MIN_FOOD, RESOURCE_NONE, RESOURCE_OLIVES, resource_trade_status, resource_type, RESOURCE_VINES, TRADE_STATUS_EXPORT, TRADE_STATUS_IMPORT, TRADE_STATUS_NONE } from './resource';
import { scenario_building_allowed, scenario_property_rome_supplies_wheat } from './scenario/building';

// 定义可用资源结构
const available = {
    resource_list: new resource_list(),
    food_list: new resource_list()
};

// 导出所有类和函数、枚举
export class CityResource {
    // 获取城市资源数量
    static city_resource_count(resource: resource_type): number {
        return city_data.resource.stored_in_warehouses[resource];
    }

    // 获取可用资源列表
    static city_resource_get_available(): resource_list {
        return available.resource_list;
    }

    // 获取可用食物列表
    static city_resource_get_available_foods(): resource_list {
        return available.food_list;
    }

    // 检查是否有多种葡萄酒可用
    static city_resource_multiple_wine_available(): number {
        return city_data.resource.wine_types_available >= 2 ? 1 : 0;
    }

    // 获取可用食物种类数量
    static city_resource_food_types_available(): number {
        return city_data.resource.food_types_available;
    }

    // 获取存储的食物数量
    static city_resource_food_stored(): number {
        return city_data.resource.granary_total_stored;
    }

    // 获取每月所需食物数量
    static city_resource_food_needed(): number {
        return city_data.resource.food_needed_per_month;
    }

    // 获取食物供应月数
    static city_resource_food_supply_months(): number {
        return city_data.resource.food_supply_months;
    }

    // 获取上月生产的食物百分比
    static city_resource_food_percentage_produced(): number {
        return calc_percentage(city_data.resource.food_produced_last_month, city_data.resource.food_consumed_last_month);
    }

    // 获取正在运营的粮仓数量
    static city_resource_operating_granaries(): number {
        return city_data.resource.granaries.operating;
    }

    // 获取上次使用的仓库ID
    static city_resource_last_used_warehouse(): number {
        return city_data.resource.last_used_warehouse;
    }

    // 设置上次使用的仓库ID
    static city_resource_set_last_used_warehouse(warehouse_id: number): void {
        city_data.resource.last_used_warehouse = warehouse_id;
    }

    // 获取资源贸易状态
    static city_resource_trade_status(resource: resource_type): resource_trade_status {
        return city_data.resource.trade_status[resource];
    }

    // 循环切换资源贸易状态
    static city_resource_cycle_trade_status(resource: resource_type): void {
        city_data.resource.trade_status[resource]++;
        if (city_data.resource.trade_status[resource] > TRADE_STATUS_EXPORT) {
            city_data.resource.trade_status[resource] = TRADE_STATUS_NONE;
        }

        if (city_data.resource.trade_status[resource] === TRADE_STATUS_IMPORT && !empire_can_import_resource(resource)) {
            city_data.resource.trade_status[resource] = TRADE_STATUS_EXPORT;
        }
        if (city_data.resource.trade_status[resource] === TRADE_STATUS_EXPORT && !empire_can_export_resource(resource)) {
            city_data.resource.trade_status[resource] = TRADE_STATUS_NONE;
        }
        if (city_data.resource.trade_status[resource] === TRADE_STATUS_EXPORT) {
            city_data.resource.stockpiled[resource] = 0;
        }
    }

    // 获取资源出口上限
    static city_resource_export_over(resource: resource_type): number {
        return city_data.resource.export_over[resource];
    }

    // 修改资源出口上限
    static city_resource_change_export_over(resource: resource_type, change: number): void {
        city_data.resource.export_over[resource] = calc_bound(city_data.resource.export_over[resource] + change, 0, 100);
    }

    // 检查资源是否被囤积
    static city_resource_is_stockpiled(resource: resource_type): number {
        return city_data.resource.stockpiled[resource];
    }

    // 切换资源囤积状态
    static city_resource_toggle_stockpiled(resource: resource_type): void {
        if (city_data.resource.stockpiled[resource]) {
            city_data.resource.stockpiled[resource] = 0;
        } else {
            city_data.resource.stockpiled[resource] = 1;
            if (city_data.resource.trade_status[resource] === TRADE_STATUS_EXPORT) {
                city_data.resource.trade_status[resource] = TRADE_STATUS_NONE;
            }
        }
    }

    // 检查资源是否被封存
    static city_resource_is_mothballed(resource: resource_type): number {
        return city_data.resource.mothballed[resource];
    }

    // 切换资源封存状态
    static city_resource_toggle_mothballed(resource: resource_type): void {
        city_data.resource.mothballed[resource] = city_data.resource.mothballed[resource] ? 0 : 1;
    }

    // 检查是否有空间的工作坊
    static city_resource_has_workshop_with_room(workshop_type: number): number {
        return city_data.resource.space_in_workshops[workshop_type] > 0 ? 1 : 0;
    }

    // 向粮仓添加生产的食物
    static city_resource_add_produced_to_granary(amount: number): void {
        city_data.resource.food_produced_this_month += amount;
    }

    // 从粮仓移除食物
    static city_resource_remove_from_granary(food: resource_type, amount: number): void {
        city_data.resource.granary_food_stored[food] -= amount;
    }

    // 向仓库添加资源
    static city_resource_add_to_warehouse(resource: resource_type, amount: number): void {
        city_data.resource.space_in_warehouses[resource] -= amount;
        city_data.resource.stored_in_warehouses[resource] += amount;
    }

    // 从仓库移除资源
    static city_resource_remove_from_warehouse(resource: resource_type, amount: number): void {
        city_data.resource.space_in_warehouses[resource] += amount;
        city_data.resource.stored_in_warehouses[resource] -= amount;
    }

    // 计算仓库库存
    static city_resource_calculate_warehouse_stocks(): void {
        for (let i = 0; i < RESOURCE_MAX; i++) {
            city_data.resource.space_in_warehouses[i] = 0;
            city_data.resource.stored_in_warehouses[i] = 0;
        }
        for (let i = 1; i < MAX_BUILDINGS; i++) {
            const b = building_get(i);
            if (b.state === BUILDING_STATE_IN_USE && b.type === BUILDING_WAREHOUSE) {
                b.has_road_access = 0;
                if (map_has_road_access(b.x, b.y, b.size, 0)) {
                    b.has_road_access = 1;
                } else if (map_has_road_access(b.x, b.y, 3, 0)) {
                    b.has_road_access = 2;
                }
            }
        }
        for (let i = 1; i < MAX_BUILDINGS; i++) {
            const b = building_get(i);
            if (b.state !== BUILDING_STATE_IN_USE || b.type !== BUILDING_WAREHOUSE_SPACE) {
                continue;
            }
            const warehouse = building_main(b);
            if (warehouse.has_road_access) {
                b.has_road_access = warehouse.has_road_access;
                if (b.subtype.warehouse_resource_id) {
                    const loads = b.loads_stored;
                    const resource = b.subtype.warehouse_resource_id;
                    city_data.resource.stored_in_warehouses[resource] += loads;
                    city_data.resource.space_in_warehouses[resource] += 4 - loads;
                } else {
                    city_data.resource.space_in_warehouses[RESOURCE_NONE] += 4;
                }
            }
        }
    }

    // 确定可用资源
    static city_resource_determine_available(): void {
        for (let i = 0; i < RESOURCE_MAX; i++) {
            available.resource_list.items[i] = 0;
            available.food_list.items[i] = 0;
        }
        available.resource_list.size = 0;
        available.food_list.size = 0;

        for (let i = RESOURCE_MIN; i < RESOURCE_MAX; i++) {
            if (empire_can_produce_resource(i) || empire_can_import_resource(i) ||
                (i === RESOURCE_MEAT && scenario_building_allowed(BUILDING_WHARF))) {
                available.resource_list.items[available.resource_list.size++] = i;
            }
        }
        for (let i = RESOURCE_MIN_FOOD; i < RESOURCE_MAX_FOOD; i++) {
            if (i === RESOURCE_OLIVES || i === RESOURCE_VINES) {
                continue;
            }
            if (empire_can_produce_resource(i) || empire_can_import_resource(i) ||
                (i === RESOURCE_MEAT && scenario_building_allowed(BUILDING_WHARF))) {
                available.food_list.items[available.food_list.size++] = i;
            }
        }
    }

    // 计算可用食物
    static calculate_available_food(): void {
        for (let i = 0; i < RESOURCE_MAX_FOOD; i++) {
            city_data.resource.granary_food_stored[i] = 0;
        }
        city_data.resource.granary_total_stored = 0;
        city_data.resource.food_types_available = 0;
        city_data.resource.food_supply_months = 0;
        city_data.resource.granaries.operating = 0;
        city_data.resource.granaries.understaffed = 0;
        city_data.resource.granaries.not_operating = 0;
        city_data.resource.granaries.not_operating_with_food = 0;
        for (let i = 1; i < MAX_BUILDINGS; i++) {
            const b = building_get(i);
            if (b.state !== BUILDING_STATE_IN_USE || b.type !== BUILDING_GRANARY) {
                continue;
            }
            b.has_road_access = 0;
            if (map_has_road_access_granary(b.x, b.y, 0)) {
                b.has_road_access = 1;
                const pct_workers = calc_percentage(
                    b.num_workers, model_get_building(b.type).laborers);
                if (pct_workers < 100) {
                    city_data.resource.granaries.understaffed++;
                }
                let amount_stored = 0;
                for (let r = RESOURCE_MIN_FOOD; r < RESOURCE_MAX_FOOD; r++) {
                    amount_stored += b.data.granary.resource_stored[r];
                }
                if (pct_workers < 50) {
                    city_data.resource.granaries.not_operating++;
                    if (amount_stored > 0) {
                        city_data.resource.granaries.not_operating_with_food++;
                    }
                } else {
                    city_data.resource.granaries.operating++;
                    for (let r = 0; r < RESOURCE_MAX_FOOD; r++) {
                        city_data.resource.granary_food_stored[r] += b.data.granary.resource_stored[r];
                    }
                    if (amount_stored > 400) {
                        tutorial_on_filled_granary();
                    }
                }
            }
        }
        for (let i = RESOURCE_MIN_FOOD; i < RESOURCE_MAX_FOOD; i++) {
            if (city_data.resource.granary_food_stored[i]) {
                city_data.resource.granary_total_stored += city_data.resource.granary_food_stored[i];
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

    // 计算食物库存和供应小麦
    static city_resource_calculate_food_stocks_and_supply_wheat(): void {
        this.calculate_available_food();
        if (scenario_property_rome_supplies_wheat()) {
            for (let i = 1; i < MAX_BUILDINGS; i++) {
                const b = building_get(i);
                if (b.state === BUILDING_STATE_IN_USE && b.type === BUILDING_MARKET) {
                    b.data.market.inventory[INVENTORY_WHEAT] = 200;
                }
            }
        }
    }

    // 计算工作坊库存
    static city_resource_calculate_workshop_stocks(): void {
        for (let i = 0; i < 6; i++) {
            city_data.resource.stored_in_workshops[i] = 0;
            city_data.resource.space_in_workshops[i] = 0;
        }
        for (let i = 1; i < MAX_BUILDINGS; i++) {
            const b = building_get(i);
            if (b.state !== BUILDING_STATE_IN_USE || !building_is_workshop(b.type)) {
                continue;
            }
            b.has_road_access = 0;
            if (map_has_road_access(b.x, b.y, b.size, 0)) {
                b.has_road_access = 1;
                const room = Math.max(2 - b.loads_stored, 0);
                const workshop_resource = b.subtype.workshop_type;
                city_data.resource.space_in_workshops[workshop_resource] += room;
                city_data.resource.stored_in_workshops[workshop_resource] += b.loads_stored;
            }
        }
    }

    // 消耗食物
    static city_resource_consume_food(): void {
        this.calculate_available_food();
        city_data.resource.food_types_eaten = 0;
        city_data.unused.unknown_00c0 = 0;
        let total_consumed = 0;
        for (let i = 1; i < MAX_BUILDINGS; i++) {
            const b = building_get(i);
            if (b.state === BUILDING_STATE_IN_USE && b.house_size) {
                const num_types = model_get_house(b.subtype.house_level).food_types;
                let amount_per_type = calc_adjust_with_percentage(b.house_population, 50);
                if (num_types > 1) {
                    amount_per_type /= num_types;
                }
                b.data.house.num_foods = 0;
                if (scenario_property_rome_supplies_wheat()) {
                    city_data.resource.food_types_eaten = 1;
                    city_data.resource.food_types_available = 1;
                    b.data.house.inventory[INVENTORY_WHEAT] = amount_per_type;
                    b.data.house.num_foods = 1;
                } else if (num_types > 0) {
                    for (let t = INVENTORY_MIN_FOOD; t < INVENTORY_MAX_FOOD && b.data.house.num_foods < num_types; t++) {
                        if (b.data.house.inventory[t] >= amount_per_type) {
                            b.data.house.inventory[t] -= amount_per_type;
                            b.data.house.num_foods++;
                            total_consumed += amount_per_type;
                        } else if (b.data.house.inventory[t]) {
                            // 有食物但不够
                            b.data.house.inventory[t] = 0;
                            b.data.house.num_foods++;
                            total_consumed += amount_per_type;
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
}