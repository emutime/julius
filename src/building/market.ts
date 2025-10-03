import { building, building_get, MAX_BUILDINGS } from 'building/building';
import { building_state, building_type } from 'building/type';
import { building_warehouse_get_amount } from 'building/warehouse';
import { city_resource_is_stockpiled } from 'city/resource';
import { calc_maximum_distance } from 'core/calc';
import { inventory_type, resource_type } from 'game/resource';
import { scenario_property_rome_supplies_wheat } from 'scenario/property';
import BUILDING_MARKET = building_type.BUILDING_MARKET;
import BUILDING_GRANARY = building_type.BUILDING_GRANARY;
import BUILDING_WAREHOUSE = building_type.BUILDING_WAREHOUSE;
import BUILDING_STATE_IN_USE = building_state.BUILDING_STATE_IN_USE;;
import RESOURCE_WHEAT = resource_type.RESOURCE_WHEAT;
import RESOURCE_VEGETABLES = resource_type.RESOURCE_VEGETABLES;
import RESOURCE_FRUIT = resource_type.RESOURCE_FRUIT;
import RESOURCE_MEAT = resource_type.RESOURCE_MEAT;
import RESOURCE_WINE = resource_type.RESOURCE_WINE;
import RESOURCE_OIL = resource_type.RESOURCE_OIL;
import RESOURCE_FURNITURE = resource_type.RESOURCE_FURNITURE;
import RESOURCE_POTTERY = resource_type.RESOURCE_POTTERY;
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
import INVENTORY_WHEAT = inventory_type.INVENTORY_WHEAT;
import INVENTORY_VEGETABLES = inventory_type.INVENTORY_VEGETABLES;
import INVENTORY_FRUIT = inventory_type.INVENTORY_FRUIT;
import INVENTORY_MEAT = inventory_type.INVENTORY_MEAT;
import INVENTORY_WINE = inventory_type.INVENTORY_WINE;
import INVENTORY_OIL = inventory_type.INVENTORY_OIL;
import INVENTORY_FURNITURE = inventory_type.INVENTORY_FURNITURE;
import INVENTORY_POTTERY = inventory_type.INVENTORY_POTTERY;
import INVENTORY_MIN_FOOD = inventory_type.INVENTORY_MIN_FOOD;
import INVENTORY_MAX_FOOD = inventory_type.INVENTORY_MAX_FOOD;
import INVENTORY_MIN_GOOD = inventory_type.INVENTORY_MIN_GOOD;
import INVENTORY_MAX_GOOD = inventory_type.INVENTORY_MAX_GOOD;
import INVENTORY_MAX = inventory_type.INVENTORY_MAX;
export class resource_data {
    public building_id: number = 0;
    public distance: number = 0;
    public num_buildings: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.building_id = args[0]);
        args.length >= 2 && (this.distance = args[1]);
        args.length >= 3 && (this.num_buildings = args[2]);
    }
}
export function building_market_get_max_food_stock(market: building) {
    let max_stock: number = 0;
    if (market.id > 0 && market.type == BUILDING_MARKET) {
        for (let i: number = INVENTORY_MIN_FOOD; i < INVENTORY_MAX_FOOD; i++) {
            let stock: number = market.data.market.inventory[i];
            if (stock > max_stock) {
                max_stock = stock;
            }
        }
    }
    return max_stock;
}
export function building_market_get_max_goods_stock(market: building) {
    let max_stock: number = 0;
    if (market.id > 0 && market.type == BUILDING_MARKET) {
        for (let i: number = INVENTORY_MIN_GOOD; i < INVENTORY_MAX_GOOD; i++) {
            let stock: number = market.data.market.inventory[i];
            if (stock > max_stock) {
                max_stock = stock;
            }
        }
    }
    return max_stock;
}
function update_food_resource(data: resource_data, resource: resource_type, b: building, distance: number) {
    if (b.data.granary.resource_stored[resource]) {
        data.num_buildings++;
        if (distance < data.distance) {
            data.distance = distance;
            data.building_id = b.id;
        }
    }
}
function update_good_resource(data: resource_data, resource: resource_type, b: building, distance: number) {
    if (!city_resource_is_stockpiled(resource) && building_warehouse_get_amount(b, resource) > 0) {
        data.num_buildings++;
        if (distance < data.distance) {
            data.distance = distance;
            data.building_id = b.id;
        }
    }
}
export function building_market_get_storage_destination(market: building) {
    let resources: resource_data[];
    for (let i: number = 0; i < INVENTORY_MAX; i++) {
        resources[i].building_id = 0;
        resources[i].num_buildings = 0;
        resources[i].distance = 40;
    }
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state != BUILDING_STATE_IN_USE) {
            continue
        }
        if (b.type != BUILDING_GRANARY && b.type != BUILDING_WAREHOUSE) {
            continue
        }
        if (!b.has_road_access || b.distance_from_entry <= 0 ||
            b.road_network_id != market.road_network_id) {
            continue
        }
        let distance: number = calc_maximum_distance(market.x, market.y, b.x, b.y);
        if (distance >= 40) {
            continue
        }
        if (b.type == BUILDING_GRANARY) {
            if (scenario_property_rome_supplies_wheat()) {
                continue
            }
            update_food_resource(resources[INVENTORY_WHEAT], RESOURCE_WHEAT, b, distance);
            update_food_resource(resources[INVENTORY_VEGETABLES], RESOURCE_VEGETABLES, b, distance);
            update_food_resource(resources[INVENTORY_FRUIT], RESOURCE_FRUIT, b, distance);
            update_food_resource(resources[INVENTORY_MEAT], RESOURCE_MEAT, b, distance);
        } else if (b.type == BUILDING_WAREHOUSE) {
            update_good_resource(resources[INVENTORY_WINE], RESOURCE_WINE, b, distance);
            update_good_resource(resources[INVENTORY_OIL], RESOURCE_OIL, b, distance);
            update_good_resource(resources[INVENTORY_POTTERY], RESOURCE_POTTERY, b, distance);
            update_good_resource(resources[INVENTORY_FURNITURE], RESOURCE_FURNITURE, b, distance);
        }
    }
    if (market.data.market.pottery_demand) {
        market.data.market.pottery_demand--;
    } else {
        resources[INVENTORY_POTTERY].num_buildings = 0;
    }
    if (market.data.market.furniture_demand) {
        market.data.market.furniture_demand--;
    } else {
        resources[INVENTORY_FURNITURE].num_buildings = 0;
    }
    if (market.data.market.oil_demand) {
        market.data.market.oil_demand--;
    } else {
        resources[INVENTORY_OIL].num_buildings = 0;
    }
    if (market.data.market.wine_demand) {
        market.data.market.wine_demand--;
    } else {
        resources[INVENTORY_WINE].num_buildings = 0;
    }
    let can_go: number = 0;
    for (let i: number = 0; i < INVENTORY_MAX; i++) {
        if (resources[i].num_buildings) {
            can_go = 1;
            break
        }
    }
    if (!can_go) {
        return 0;
    }
    if (!market.data.market.inventory[INVENTORY_WHEAT] && resources[INVENTORY_WHEAT].num_buildings) {
        market.data.market.fetch_inventory_id = INVENTORY_WHEAT;
        return resources[INVENTORY_WHEAT].building_id;
    } else if (!market.data.market.inventory[INVENTORY_VEGETABLES] && resources[INVENTORY_VEGETABLES].num_buildings) {
        market.data.market.fetch_inventory_id = INVENTORY_VEGETABLES;
        return resources[INVENTORY_VEGETABLES].building_id;
    } else if (!market.data.market.inventory[INVENTORY_FRUIT] && resources[INVENTORY_FRUIT].num_buildings) {
        market.data.market.fetch_inventory_id = INVENTORY_FRUIT;
        return resources[INVENTORY_FRUIT].building_id;
    } else if (!market.data.market.inventory[INVENTORY_MEAT] && resources[INVENTORY_MEAT].num_buildings) {
        market.data.market.fetch_inventory_id = INVENTORY_MEAT;
        return resources[INVENTORY_MEAT].building_id;
    }
    if (!market.data.market.inventory[INVENTORY_POTTERY] && resources[INVENTORY_POTTERY].num_buildings) {
        market.data.market.fetch_inventory_id = INVENTORY_POTTERY;
        return resources[INVENTORY_POTTERY].building_id;
    } else if (!market.data.market.inventory[INVENTORY_FURNITURE] && resources[INVENTORY_FURNITURE].num_buildings) {
        market.data.market.fetch_inventory_id = INVENTORY_FURNITURE;
        return resources[INVENTORY_FURNITURE].building_id;
    } else if (!market.data.market.inventory[INVENTORY_OIL] && resources[INVENTORY_OIL].num_buildings) {
        market.data.market.fetch_inventory_id = INVENTORY_OIL;
        return resources[INVENTORY_OIL].building_id;
    } else if (!market.data.market.inventory[INVENTORY_WINE] && resources[INVENTORY_WINE].num_buildings) {
        market.data.market.fetch_inventory_id = INVENTORY_WINE;
        return resources[INVENTORY_WINE].building_id;
    }
    let min_stock: number = 50;
    let fetch_inventory: number = -1;
    if (resources[INVENTORY_WHEAT].num_buildings &&
        market.data.market.inventory[INVENTORY_WHEAT] < min_stock) {
        min_stock = market.data.market.inventory[INVENTORY_WHEAT];
        fetch_inventory = INVENTORY_WHEAT;
    }
    if (resources[INVENTORY_VEGETABLES].num_buildings &&
        market.data.market.inventory[INVENTORY_VEGETABLES] < min_stock) {
        min_stock = market.data.market.inventory[INVENTORY_VEGETABLES];
        fetch_inventory = INVENTORY_VEGETABLES;
    }
    if (resources[INVENTORY_FRUIT].num_buildings &&
        market.data.market.inventory[INVENTORY_FRUIT] < min_stock) {
        min_stock = market.data.market.inventory[INVENTORY_FRUIT];
        fetch_inventory = INVENTORY_FRUIT;
    }
    if (resources[INVENTORY_MEAT].num_buildings &&
        market.data.market.inventory[INVENTORY_MEAT] < min_stock) {
        min_stock = market.data.market.inventory[INVENTORY_MEAT];
        fetch_inventory = INVENTORY_MEAT;
    }
    if (resources[INVENTORY_POTTERY].num_buildings &&
        market.data.market.inventory[INVENTORY_POTTERY] < min_stock) {
        min_stock = market.data.market.inventory[INVENTORY_POTTERY];
        fetch_inventory = INVENTORY_POTTERY;
    }
    if (resources[INVENTORY_FURNITURE].num_buildings &&
        market.data.market.inventory[INVENTORY_FURNITURE] < min_stock) {
        min_stock = market.data.market.inventory[INVENTORY_FURNITURE];
        fetch_inventory = INVENTORY_FURNITURE;
    }
    if (resources[INVENTORY_OIL].num_buildings &&
        market.data.market.inventory[INVENTORY_OIL] < min_stock) {
        min_stock = market.data.market.inventory[INVENTORY_OIL];
        fetch_inventory = INVENTORY_OIL;
    }
    if (resources[INVENTORY_WINE].num_buildings &&
        market.data.market.inventory[INVENTORY_WINE] < min_stock) {
        fetch_inventory = INVENTORY_WINE;
    }
    if (fetch_inventory == -1) {
        if (resources[INVENTORY_WHEAT].num_buildings &&
            market.data.market.inventory[INVENTORY_WHEAT] < 600) {
            fetch_inventory = INVENTORY_WHEAT;
        }
        if (resources[INVENTORY_VEGETABLES].num_buildings &&
            market.data.market.inventory[INVENTORY_VEGETABLES] < 400) {
            fetch_inventory = INVENTORY_VEGETABLES;
        }
        if (resources[INVENTORY_FRUIT].num_buildings &&
            market.data.market.inventory[INVENTORY_FRUIT] < 400) {
            fetch_inventory = INVENTORY_FRUIT;
        }
        if (resources[INVENTORY_MEAT].num_buildings &&
            market.data.market.inventory[INVENTORY_MEAT] < 400) {
            fetch_inventory = INVENTORY_MEAT;
        }
    }
    if (fetch_inventory < 0) {
        return 0;
    }
    market.data.market.fetch_inventory_id = fetch_inventory;
    return resources[fetch_inventory].building_id;
}
