import { MAX_BUILDINGS } from 'building/building';
import { building_type } from 'building/type';
import BUILDING_HOUSE_VACANT_LOT = building_type.BUILDING_HOUSE_VACANT_LOT;
import BUILDING_HOUSE_SMALL_TENT = building_type.BUILDING_HOUSE_SMALL_TENT;
import BUILDING_HOUSE_LARGE_TENT = building_type.BUILDING_HOUSE_LARGE_TENT;
import BUILDING_HOUSE_SMALL_SHACK = building_type.BUILDING_HOUSE_SMALL_SHACK;
import BUILDING_HOUSE_LARGE_SHACK = building_type.BUILDING_HOUSE_LARGE_SHACK;
import BUILDING_HOUSE_SMALL_HOVEL = building_type.BUILDING_HOUSE_SMALL_HOVEL;
import BUILDING_HOUSE_LARGE_HOVEL = building_type.BUILDING_HOUSE_LARGE_HOVEL;
import BUILDING_HOUSE_SMALL_CASA = building_type.BUILDING_HOUSE_SMALL_CASA;
import BUILDING_HOUSE_LARGE_CASA = building_type.BUILDING_HOUSE_LARGE_CASA;
import BUILDING_HOUSE_SMALL_INSULA = building_type.BUILDING_HOUSE_SMALL_INSULA;
import BUILDING_HOUSE_MEDIUM_INSULA = building_type.BUILDING_HOUSE_MEDIUM_INSULA;
import BUILDING_HOUSE_LARGE_INSULA = building_type.BUILDING_HOUSE_LARGE_INSULA;
import BUILDING_HOUSE_GRAND_INSULA = building_type.BUILDING_HOUSE_GRAND_INSULA;
import BUILDING_HOUSE_SMALL_VILLA = building_type.BUILDING_HOUSE_SMALL_VILLA;
import BUILDING_HOUSE_MEDIUM_VILLA = building_type.BUILDING_HOUSE_MEDIUM_VILLA;
import BUILDING_HOUSE_LARGE_VILLA = building_type.BUILDING_HOUSE_LARGE_VILLA;
import BUILDING_HOUSE_GRAND_VILLA = building_type.BUILDING_HOUSE_GRAND_VILLA;
import BUILDING_HOUSE_SMALL_PALACE = building_type.BUILDING_HOUSE_SMALL_PALACE;
import BUILDING_HOUSE_MEDIUM_PALACE = building_type.BUILDING_HOUSE_MEDIUM_PALACE;
import BUILDING_HOUSE_LARGE_PALACE = building_type.BUILDING_HOUSE_LARGE_PALACE;
import BUILDING_HOUSE_LUXURY_PALACE = building_type.BUILDING_HOUSE_LUXURY_PALACE;
import { building_type } from 'building/type';
import { house_level } from 'building/type';
import HOUSE_LUXURY_PALACE = house_level.HOUSE_LUXURY_PALACE;
import { house_level } from 'building/type';
import { building_state } from 'building/type';
import BUILDING_STATE_IN_USE = building_state.BUILDING_STATE_IN_USE;;
import { buffer } from 'core/buffer';
import { building } from 'building/building';
import { building_get } from 'building/building';
import { building_is_house } from 'building/building';
import { building_house_change_to } from 'building/house';
import { building_house_merge } from 'building/house';
import { building_house_can_expand } from 'building/house';
import { building_house_expand_to_large_insula } from 'building/house';
import { building_house_expand_to_large_villa } from 'building/house';
import { building_house_expand_to_large_palace } from 'building/house';
import { building_house_devolve_from_large_insula } from 'building/house';
import { building_house_devolve_from_large_villa } from 'building/house';
import { building_house_devolve_from_large_palace } from 'building/house';
import { building_house_check_for_corruption } from 'building/house';
import { model_building } from 'building/model';
import { model_house } from 'building/model';
import { model_get_building } from 'building/model';
import { model_get_house } from 'building/model';
import { house_demands } from 'city/houses';
import { city_houses_reset_demands } from 'city/houses';
import { city_houses_demands } from 'city/houses';
import { resource_trade_status } from 'city/constants';
import { resource_type } from 'game/resource';
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
import { resource_type } from 'game/resource';
import { inventory_type } from 'game/resource';
import INVENTORY_WINE = inventory_type.INVENTORY_WINE;
import INVENTORY_OIL = inventory_type.INVENTORY_OIL;
import INVENTORY_FURNITURE = inventory_type.INVENTORY_FURNITURE;
import INVENTORY_POTTERY = inventory_type.INVENTORY_POTTERY;
import INVENTORY_MIN_FOOD = inventory_type.INVENTORY_MIN_FOOD;
import INVENTORY_MAX_FOOD = inventory_type.INVENTORY_MAX_FOOD;
import { workshop_type } from 'game/resource';
import { resource_image_type } from 'game/resource';
import { resource_list } from 'city/resource';
import { city_resource_multiple_wine_available } from 'city/resource';
import { direction_type } from 'core/direction';
import { calc_maximum_distance } from 'core/calc';
import { game_time_day } from 'game/time';
import { game_undo_disable } from 'game/undo';
import { map_building_at } from 'map/building';
import { GRID } from 'map/grid';
import GRID_SIZE = GRID.GRID_SIZE;
import { map_grid_offset } from 'map/grid';
import { map_grid_get_area } from 'map/grid';
import { map_routing_update_land } from 'map/routing_terrain';
import { map_tiles_update_all_gardens } from 'map/tiles';
export const enum evolve_status {
    EVOLVE = 1,
    NONE = 0,
    DEVOLVE = -1,
}
import EVOLVE = evolve_status.EVOLVE;
function check_evolve_desirability(house: building) {
    let level: number = house.subtype.house_level;
    let model: model_house = model_get_house(level);
    let evolve_des: number = model.evolve_desirability;
    if (level >= HOUSE_LUXURY_PALACE) {
        evolve_des = 1000;
    }
    let current_des: number = house.desirability;
    let status: number;
    if (current_des <= model.devolve_desirability) {
        status = DEVOLVE;
    } else if (current_des >= evolve_des) {
        status = EVOLVE;
    } else {
        status = NONE;
    }
    house.data.house.evolve_text_id = status;
    return status;
}
function has_required_goods_and_services(house: building, for_upgrade: number, demands: house_demands) {
    let level: number = house.subtype.house_level;
    if (for_upgrade) {
        ++level;
    }
    let model: model_house = model_get_house(level);
    let water: number = model.water;
    if (!house.has_water_access) {
        if (water >= 2) {
            ++demands.missing.fountain;
            return 0;
        }
        if (water == 1 && !house.has_well_access) {
            ++demands.missing.well;
            return 0;
        }
    }
    let entertainment: number = model.entertainment;
    if (house.data.house.entertainment < entertainment) {
        if (house.data.house.entertainment) {
            ++demands.missing.more_entertainment;
        } else {
            ++demands.missing.entertainment;
        }
        return 0;
    }
    let education: number = model.education;
    if (house.data.house.education < education) {
        if (house.data.house.education) {
            ++demands.missing.more_education;
        } else {
            ++demands.missing.education;
        }
        return 0;
    }
    if (education == 2) {
        ++demands.requiring.school;
        ++demands.requiring.library;
    } else if (education == 1) {
        ++demands.requiring.school;
    }
    let religion: number = model.religion;
    if (house.data.house.num_gods < religion) {
        if (religion == 1) {
            ++demands.missing.religion;
            return 0;
        } else if (religion == 2) {
            ++demands.missing.second_religion;
            return 0;
        } else if (religion == 3) {
            ++demands.missing.third_religion;
            return 0;
        }
    } else if (religion > 0) {
        ++demands.requiring.religion;
    }
    let barber: number = model.barber;
    if (house.data.house.barber < barber) {
        ++demands.missing.barber;
        return 0;
    }
    if (barber == 1) {
        ++demands.requiring.barber;
    }
    let bathhouse: number = model.bathhouse;
    if (house.data.house.bathhouse < bathhouse) {
        ++demands.missing.bathhouse;
        return 0;
    }
    if (bathhouse == 1) {
        ++demands.requiring.bathhouse;
    }
    let health: number = model.health;
    if (house.data.house.health < health) {
        if (health < 2) {
            ++demands.missing.clinic;
        } else {
            ++demands.missing.hospital;
        }
        return 0;
    }
    if (health >= 1) {
        ++demands.requiring.clinic;
    }
    let foodtypes_required: number = model.food_types;
    let foodtypes_available: number = 0;
    for (let i: number = INVENTORY_MIN_FOOD; i < INVENTORY_MAX_FOOD; i++) {
        if (house.data.house.inventory[i]) {
            foodtypes_available++;
        }
    }
    if (foodtypes_available < foodtypes_required) {
        ++demands.missing.food;
        return 0;
    }
    if (house.data.house.inventory[INVENTORY_POTTERY] < model.pottery) {
        return 0;
    }
    if (house.data.house.inventory[INVENTORY_OIL] < model.oil) {
        return 0;
    }
    if (house.data.house.inventory[INVENTORY_FURNITURE] < model.furniture) {
        return 0;
    }
    let wine: number = model.wine;
    if (wine && house.data.house.inventory[INVENTORY_WINE] <= 0) {
        return 0;
    }
    if (wine > 1 && !city_resource_multiple_wine_available()) {
        ++demands.missing.second_wine;
        return 0;
    }
    return 1;
}
function check_requirements(house: building, demands: house_demands) {
    let status: number = check_evolve_desirability(house);
    if (!has_required_goods_and_services(house, 0, demands)) {
        status = DEVOLVE;
    } else if (status == EVOLVE) {
        status = has_required_goods_and_services(house, 1, demands);
    }
    return status;
}
function has_devolve_delay(house: building, status: evolve_status) {
    if (status == DEVOLVE && house.data.house.devolve_delay < 2) {
        house.data.house.devolve_delay++;
        return 1;
    } else {
        house.data.house.devolve_delay = 0;
        return 0;
    }
}
function evolve_small_tent(house: building, demands: house_demands) {
    if (house.house_population > 0) {
        building_house_merge(house);
        let status: evolve_status = check_requirements(house, demands);
        if (status == EVOLVE) {
            building_house_change_to(house, BUILDING_HOUSE_LARGE_TENT);
        }
    }
    return 0;
}
function evolve_large_tent(house: building, demands: house_demands) {
    if (house.house_population > 0) {
        building_house_merge(house);
        let status: evolve_status = check_requirements(house, demands);
        if (!has_devolve_delay(house, status)) {
            if (status == EVOLVE) {
                building_house_change_to(house, BUILDING_HOUSE_SMALL_SHACK);
            } else if (status == DEVOLVE) {
                building_house_change_to(house, BUILDING_HOUSE_SMALL_TENT);
            }
        }
    }
    return 0;
}
function evolve_small_shack(house: building, demands: house_demands) {
    building_house_merge(house);
    let status: number = check_requirements(house, demands);
    if (!has_devolve_delay(house, status)) {
        if (status == EVOLVE) {
            building_house_change_to(house, BUILDING_HOUSE_LARGE_SHACK);
        } else if (status == DEVOLVE) {
            building_house_change_to(house, BUILDING_HOUSE_LARGE_TENT);
        }
    }
    return 0;
}
function evolve_large_shack(house: building, demands: house_demands) {
    building_house_merge(house);
    let status: number = check_requirements(house, demands);
    if (!has_devolve_delay(house, status)) {
        if (status == EVOLVE) {
            building_house_change_to(house, BUILDING_HOUSE_SMALL_HOVEL);
        } else if (status == DEVOLVE) {
            building_house_change_to(house, BUILDING_HOUSE_SMALL_SHACK);
        }
    }
    return 0;
}
function evolve_small_hovel(house: building, demands: house_demands) {
    building_house_merge(house);
    let status: number = check_requirements(house, demands);
    if (!has_devolve_delay(house, status)) {
        if (status == EVOLVE) {
            building_house_change_to(house, BUILDING_HOUSE_LARGE_HOVEL);
        } else if (status == DEVOLVE) {
            building_house_change_to(house, BUILDING_HOUSE_LARGE_SHACK);
        }
    }
    return 0;
}
function evolve_large_hovel(house: building, demands: house_demands) {
    building_house_merge(house);
    let status: number = check_requirements(house, demands);
    if (!has_devolve_delay(house, status)) {
        if (status == EVOLVE) {
            building_house_change_to(house, BUILDING_HOUSE_SMALL_CASA);
        } else if (status == DEVOLVE) {
            building_house_change_to(house, BUILDING_HOUSE_SMALL_HOVEL);
        }
    }
    return 0;
}
function evolve_small_casa(house: building, demands: house_demands) {
    building_house_merge(house);
    let status: number = check_requirements(house, demands);
    if (!has_devolve_delay(house, status)) {
        if (status == EVOLVE) {
            building_house_change_to(house, BUILDING_HOUSE_LARGE_CASA);
        } else if (status == DEVOLVE) {
            building_house_change_to(house, BUILDING_HOUSE_LARGE_HOVEL);
        }
    }
    return 0;
}
function evolve_large_casa(house: building, demands: house_demands) {
    building_house_merge(house);
    let status: number = check_requirements(house, demands);
    if (!has_devolve_delay(house, status)) {
        if (status == EVOLVE) {
            building_house_change_to(house, BUILDING_HOUSE_SMALL_INSULA);
        } else if (status == DEVOLVE) {
            building_house_change_to(house, BUILDING_HOUSE_SMALL_CASA);
        }
    }
    return 0;
}
function evolve_small_insula(house: building, demands: house_demands) {
    building_house_merge(house);
    let status: number = check_requirements(house, demands);
    if (!has_devolve_delay(house, status)) {
        if (status == EVOLVE) {
            building_house_change_to(house, BUILDING_HOUSE_MEDIUM_INSULA);
        } else if (status == DEVOLVE) {
            building_house_change_to(house, BUILDING_HOUSE_LARGE_CASA);
        }
    }
    return 0;
}
function evolve_medium_insula(house: building, demands: house_demands) {
    building_house_merge(house);
    let status: number = check_requirements(house, demands);
    if (!has_devolve_delay(house, status)) {
        if (status == EVOLVE) {
            if (building_house_can_expand(house, 4)) {
                game_undo_disable();
                house.house_is_merged = 0;
                building_house_expand_to_large_insula(house);
                map_tiles_update_all_gardens();
                return 1;
            }
        } else if (status == DEVOLVE) {
            building_house_change_to(house, BUILDING_HOUSE_SMALL_INSULA);
        }
    }
    return 0;
}
function evolve_large_insula(house: building, demands: house_demands) {
    let status: number = check_requirements(house, demands);
    if (!has_devolve_delay(house, status)) {
        if (status == EVOLVE) {
            building_house_change_to(house, BUILDING_HOUSE_GRAND_INSULA);
        } else if (status == DEVOLVE) {
            game_undo_disable();
            building_house_devolve_from_large_insula(house);
        }
    }
    return 0;
}
function evolve_grand_insula(house: building, demands: house_demands) {
    let status: number = check_requirements(house, demands);
    if (!has_devolve_delay(house, status)) {
        if (status == EVOLVE) {
            building_house_change_to(house, BUILDING_HOUSE_SMALL_VILLA);
        } else if (status == DEVOLVE) {
            building_house_change_to(house, BUILDING_HOUSE_LARGE_INSULA);
        }
    }
    return 0;
}
function evolve_small_villa(house: building, demands: house_demands) {
    let status: number = check_requirements(house, demands);
    if (!has_devolve_delay(house, status)) {
        if (status == EVOLVE) {
            building_house_change_to(house, BUILDING_HOUSE_MEDIUM_VILLA);
        } else if (status == DEVOLVE) {
            building_house_change_to(house, BUILDING_HOUSE_GRAND_INSULA);
        }
    }
    return 0;
}
function evolve_medium_villa(house: building, demands: house_demands) {
    let status: number = check_requirements(house, demands);
    if (!has_devolve_delay(house, status)) {
        if (status == EVOLVE) {
            if (building_house_can_expand(house, 9)) {
                game_undo_disable();
                building_house_expand_to_large_villa(house);
                map_tiles_update_all_gardens();
                return 1;
            }
        } else if (status == DEVOLVE) {
            building_house_change_to(house, BUILDING_HOUSE_SMALL_VILLA);
        }
    }
    return 0;
}
function evolve_large_villa(house: building, demands: house_demands) {
    let status: number = check_requirements(house, demands);
    if (!has_devolve_delay(house, status)) {
        if (status == EVOLVE) {
            building_house_change_to(house, BUILDING_HOUSE_GRAND_VILLA);
        } else if (status == DEVOLVE) {
            game_undo_disable();
            building_house_devolve_from_large_villa(house);
        }
    }
    return 0;
}
function evolve_grand_villa(house: building, demands: house_demands) {
    let status: number = check_requirements(house, demands);
    if (!has_devolve_delay(house, status)) {
        if (status == EVOLVE) {
            building_house_change_to(house, BUILDING_HOUSE_SMALL_PALACE);
        } else if (status == DEVOLVE) {
            building_house_change_to(house, BUILDING_HOUSE_LARGE_VILLA);
        }
    }
    return 0;
}
function evolve_small_palace(house: building, demands: house_demands) {
    let status: number = check_requirements(house, demands);
    if (!has_devolve_delay(house, status)) {
        if (status == EVOLVE) {
            building_house_change_to(house, BUILDING_HOUSE_MEDIUM_PALACE);
        } else if (status == DEVOLVE) {
            building_house_change_to(house, BUILDING_HOUSE_GRAND_VILLA);
        }
    }
    return 0;
}
function evolve_medium_palace(house: building, demands: house_demands) {
    let status: number = check_requirements(house, demands);
    if (!has_devolve_delay(house, status)) {
        if (status == EVOLVE) {
            if (building_house_can_expand(house, 16)) {
                game_undo_disable();
                building_house_expand_to_large_palace(house);
                map_tiles_update_all_gardens();
                return 1;
            }
        } else if (status == DEVOLVE) {
            building_house_change_to(house, BUILDING_HOUSE_SMALL_PALACE);
        }
    }
    return 0;
}
function evolve_large_palace(house: building, demands: house_demands) {
    let status: number = check_requirements(house, demands);
    if (!has_devolve_delay(house, status)) {
        if (status == EVOLVE) {
            building_house_change_to(house, BUILDING_HOUSE_LUXURY_PALACE);
        } else if (status == DEVOLVE) {
            game_undo_disable();
            building_house_devolve_from_large_palace(house);
        }
    }
    return 0;
}
function evolve_luxury_palace(house: building, demands: house_demands) {
    let status: number = check_evolve_desirability(house);
    if (!has_required_goods_and_services(house, 0, demands)) {
        status = DEVOLVE;
    }
    if (!has_devolve_delay(house, status) && status == DEVOLVE) {
        building_house_change_to(house, BUILDING_HOUSE_LARGE_PALACE);
    }
    return 0;
}
function consume_resource(b: building, inventory: number, amount: number) {
    if (amount > 0) {
        if (amount > b.data.house.inventory[inventory]) {
            b.data.house.inventory[inventory] = 0;
        } else {
            b.data.house.inventory[inventory] -= amount
        }
    }
}
function consume_resources(b: building) {
    let model: model_house = model_get_house(b.subtype.house_level);
    consume_resource(b, INVENTORY_POTTERY, model.pottery);
    consume_resource(b, INVENTORY_FURNITURE, model.furniture);
    consume_resource(b, INVENTORY_OIL, model.oil);
    consume_resource(b, INVENTORY_WINE, model.wine);
}
let evolve_callback: int ([] = new Array().fill({
    evolve_small_tent, evolve_large_tent, evolve_small_shack, evolve_large_shack,
    evolve_small_hovel, evolve_large_hovel, evolve_small_casa, evolve_large_casa,
    evolve_small_insula, evolve_medium_insula, evolve_large_insula, evolve_grand_insula,
    evolve_small_villa, evolve_medium_villa, evolve_large_villa, evolve_grand_villa,
    evolve_small_palace, evolve_medium_palace, evolve_large_palace, evolve_luxury_palace
});
export function building_house_process_evolve_and_consume_goods() {
    city_houses_reset_demands();
    let demands: house_demands = city_houses_demands();
    let has_expanded: number = 0;
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state == BUILDING_STATE_IN_USE && building_is_house(b.type)) {
            building_house_check_for_corruption(b);
            has_expanded |= evolve_callback[b.type - BUILDING_HOUSE_VACANT_LOT](b, demands)
            if (game_time_day() == 0 || game_time_day() == 7) {
                consume_resources(b);
            }
        }
    }
    if (has_expanded) {
        map_routing_update_land();
    }
}
export function building_house_determine_evolve_text(house: building, worst_desirability_building: number) {
    let level: number = house.subtype.house_level;
    let model: model_house = model_get_house(level);
    if (house.desirability <= model.devolve_desirability) {
        house.data.house.evolve_text_id = 0;
        return;
    }
    let water: number = model.water;
    if (water == 1 && !house.has_water_access && !house.has_well_access) {
        house.data.house.evolve_text_id = 1;
        return;
    }
    if (water == 2 && !house.has_water_access) {
        house.data.house.evolve_text_id = 2;
        return;
    }
    let entertainment: number = model.entertainment;
    if (house.data.house.entertainment < entertainment) {
        if (!house.data.house.entertainment) {
            house.data.house.evolve_text_id = 3;
        } else if (entertainment < 10) {
            house.data.house.evolve_text_id = 4;
        } else if (entertainment < 25) {
            house.data.house.evolve_text_id = 5;
        } else if (entertainment < 50) {
            house.data.house.evolve_text_id = 6;
        } else if (entertainment < 80) {
            house.data.house.evolve_text_id = 7;
        } else {
            house.data.house.evolve_text_id = 8;
        }
        return;
    }
    let foodtypes_required: number = model.food_types;
    let foodtypes_available: number = 0;
    for (let i: number = INVENTORY_MIN_FOOD; i < INVENTORY_MAX_FOOD; i++) {
        if (house.data.house.inventory[i]) {
            foodtypes_available++;
        }
    }
    if (foodtypes_available < foodtypes_required) {
        if (foodtypes_required == 1) {
            house.data.house.evolve_text_id = 9;
            return;
        } else if (foodtypes_required == 2) {
            house.data.house.evolve_text_id = 10;
            return;
        } else if (foodtypes_required == 3) {
            house.data.house.evolve_text_id = 11;
            return;
        }
    }
    let education: number = model.education;
    if (house.data.house.education < education) {
        if (education == 1) {
            house.data.house.evolve_text_id = 14;
            return;
        } else if (education == 2) {
            if (house.data.house.school) {
                house.data.house.evolve_text_id = 15;
                return;
            } else if (house.data.house.library) {
                house.data.house.evolve_text_id = 16;
                return;
            }
        } else if (education == 3) {
            house.data.house.evolve_text_id = 17;
            return;
        }
    }
    if (house.data.house.bathhouse < model.bathhouse) {
        house.data.house.evolve_text_id = 18;
        return;
    }
    if (house.data.house.inventory[INVENTORY_POTTERY] < model.pottery) {
        house.data.house.evolve_text_id = 19;
        return;
    }
    let religion: number = model.religion;
    if (house.data.house.num_gods < religion) {
        if (religion == 1) {
            house.data.house.evolve_text_id = 20;
            return;
        } else if (religion == 2) {
            house.data.house.evolve_text_id = 21;
            return;
        } else if (religion == 3) {
            house.data.house.evolve_text_id = 22;
            return;
        }
    }
    if (house.data.house.barber < model.barber) {
        house.data.house.evolve_text_id = 23;
        return;
    }
    let health: number = model.health;
    if (house.data.house.health < health) {
        if (health == 1) {
            house.data.house.evolve_text_id = 24;
        } else if (house.data.house.clinic) {
            house.data.house.evolve_text_id = 25;
        } else {
            house.data.house.evolve_text_id = 26;
        }
        return;
    }
    if (house.data.house.inventory[INVENTORY_OIL] < model.oil) {
        house.data.house.evolve_text_id = 27;
        return;
    }
    if (house.data.house.inventory[INVENTORY_FURNITURE] < model.furniture) {
        house.data.house.evolve_text_id = 28;
        return;
    }
    let wine: number = model.wine;
    if (house.data.house.inventory[INVENTORY_WINE] < wine) {
        house.data.house.evolve_text_id = 29;
        return;
    }
    if (wine > 1 && !city_resource_multiple_wine_available()) {
        house.data.house.evolve_text_id = 65;
        return;
    }
    if (level >= HOUSE_LUXURY_PALACE) {
        house.data.house.evolve_text_id = 60;
        return;
    }
    if (house.desirability < model.evolve_desirability) {
        if (worst_desirability_building) {
            house.data.house.evolve_text_id = 62;
        } else {
            house.data.house.evolve_text_id = 30;
        }
        return;
    }
    model = model_get_house(++level);
    water = model.water;
    if (water == 1 && !house.has_water_access && !house.has_well_access) {
        house.data.house.evolve_text_id = 31;
        return;
    }
    if (water == 2 && !house.has_water_access) {
        house.data.house.evolve_text_id = 32;
        return;
    }
    entertainment = model.entertainment;
    if (house.data.house.entertainment < entertainment) {
        if (!house.data.house.entertainment) {
            house.data.house.evolve_text_id = 33;
        } else if (entertainment < 10) {
            house.data.house.evolve_text_id = 34;
        } else if (entertainment < 25) {
            house.data.house.evolve_text_id = 35;
        } else if (entertainment < 50) {
            house.data.house.evolve_text_id = 36;
        } else if (entertainment < 80) {
            house.data.house.evolve_text_id = 37;
        } else {
            house.data.house.evolve_text_id = 38;
        }
        return;
    }
    foodtypes_required = model.food_types;
    if (foodtypes_available < foodtypes_required) {
        if (foodtypes_required == 1) {
            house.data.house.evolve_text_id = 39;
            return;
        } else if (foodtypes_required == 2) {
            house.data.house.evolve_text_id = 40;
            return;
        } else if (foodtypes_required == 3) {
            house.data.house.evolve_text_id = 41;
            return;
        }
    }
    education = model.education;
    if (house.data.house.education < education) {
        if (education == 1) {
            house.data.house.evolve_text_id = 44;
            return;
        } else if (education == 2) {
            if (house.data.house.school) {
                house.data.house.evolve_text_id = 45;
                return;
            } else if (house.data.house.library) {
                house.data.house.evolve_text_id = 46;
                return;
            }
        } else if (education == 3) {
            house.data.house.evolve_text_id = 47;
            return;
        }
    }
    if (house.data.house.bathhouse < model.bathhouse) {
        house.data.house.evolve_text_id = 48;
        return;
    }
    if (house.data.house.inventory[INVENTORY_POTTERY] < model.pottery) {
        house.data.house.evolve_text_id = 49;
        return;
    }
    religion = model.religion;
    if (house.data.house.num_gods < religion) {
        if (religion == 1) {
            house.data.house.evolve_text_id = 50;
            return;
        } else if (religion == 2) {
            house.data.house.evolve_text_id = 51;
            return;
        } else if (religion == 3) {
            house.data.house.evolve_text_id = 52;
            return;
        }
    }
    if (house.data.house.barber < model.barber) {
        house.data.house.evolve_text_id = 53;
        return;
    }
    health = model.health;
    if (house.data.house.health < health) {
        if (health == 1) {
            house.data.house.evolve_text_id = 54;
        } else if (house.data.house.clinic) {
            house.data.house.evolve_text_id = 55;
        } else {
            house.data.house.evolve_text_id = 56;
        }
        return;
    }
    if (house.data.house.inventory[INVENTORY_OIL] < model.oil) {
        house.data.house.evolve_text_id = 57;
        return;
    }
    if (house.data.house.inventory[INVENTORY_FURNITURE] < model.furniture) {
        house.data.house.evolve_text_id = 58;
        return;
    }
    wine = model.wine;
    if (house.data.house.inventory[INVENTORY_WINE] < wine) {
        house.data.house.evolve_text_id = 59;
        return;
    }
    if (wine > 1 && !city_resource_multiple_wine_available()) {
        house.data.house.evolve_text_id = 66;
        return;
    }
    house.data.house.evolve_text_id = 61;
    if (house.data.house.no_space_to_expand == 1) {
        house.data.house.evolve_text_id = 64;
    }
}
export function building_house_determine_worst_desirability_building(house: building) {
    let lowest_desirability: number = 0;
    let lowest_building_id: number = 0;
    let x_min: number
    let y_min: number
    let x_max: number
    let y_max: number;
    map_grid_get_area(house.x, house.y, 1, 6, x_min, y_min, x_max, y_max);
    for (let y: number = y_min; y <= y_max; y++) {
        for (let x: number = x_min; x <= x_max; x++) {
            let building_id: number = map_building_at(map_grid_offset(x, y));
            if (building_id <= 0) {
                continue
            }
            let b: building = building_get(building_id);
            if (b.state != BUILDING_STATE_IN_USE || building_id == house.id) {
                continue
            }
            if (!b.house_size || b.type < house.type) {
                let des: number = model_get_building(b.type).desirability_value;
                if (des < 0) {
                    let step_size: number = model_get_building(b.type).desirability_step_size;
                    let range: number = model_get_building(b.type).desirability_range;
                    let dist: number = calc_maximum_distance(x, y, house.x, house.y);
                    if (dist <= range) {
                        while (--dist > 1) {
                            des += step_size;
                        }
                        if (des < lowest_desirability) {
                            lowest_desirability = des;
                            lowest_building_id = building_id;
                        }
                    }
                }
            }
        }
    }
    return lowest_building_id;
}
