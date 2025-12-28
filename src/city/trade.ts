
;
import { building_count_industry_total } from 'building/count';
import { resource_trade_status } from 'city/constants';
import { empire_city_count_wine_sources, empire_city_generate_trader } from 'empire/city';
import { resource_type } from 'game/resource';
import RESOURCE_WINE = resource_type.RESOURCE_WINE;
import RESOURCE_MIN = resource_type.RESOURCE_MIN;
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
import RESOURCE_MAX_FOOD = resource_type.RESOURCE_MAX_FOOD;
import TRADE_STATUS_IMPORT = resource_trade_status.TRADE_STATUS_IMPORT;
import { city_data_t } from './data_private';
export let city_data: city_data_t = new city_data_t();
export function city_trade_update() {
    city_data.trade.num_sea_routes = 0;
    city_data.trade.num_land_routes = 0;
    city_data.resource.wine_types_available = building_count_industry_total(RESOURCE_WINE) > 0 ? 1 : 0;
    if (city_data.resource.trade_status[RESOURCE_WINE] == TRADE_STATUS_IMPORT) {
        city_data.resource.wine_types_available += empire_city_count_wine_sources()
    }
    if (city_data.trade.land_trade_problem_duration > 0) {
        city_data.trade.land_trade_problem_duration--;
    } else {
        city_data.trade.land_trade_problem_duration = 0;
    }
    if (city_data.trade.sea_trade_problem_duration > 0) {
        city_data.trade.sea_trade_problem_duration--;
    } else {
        city_data.trade.sea_trade_problem_duration = 0;
    }
    empire_city_generate_trader();
}
export function city_trade_add_land_trade_route() {
    city_data.trade.num_land_routes++;
}
export function city_trade_add_sea_trade_route() {
    city_data.trade.num_sea_routes++;
}
export function city_trade_has_land_trade_route() {
    return city_data.trade.num_land_routes > 0;
}
export function city_trade_has_sea_trade_route() {
    return city_data.trade.num_sea_routes > 0;
}
export function city_trade_start_land_trade_problems(duration: number) {
    city_data.trade.land_trade_problem_duration = duration;
}
export function city_trade_start_sea_trade_problems(duration: number) {
    city_data.trade.sea_trade_problem_duration = duration;
}
export function city_trade_has_land_trade_problems() {
    return city_data.trade.land_trade_problem_duration > 0;
}
export function city_trade_has_sea_trade_problems() {
    return city_data.trade.sea_trade_problem_duration > 0;
}
export function city_trade_current_caravan_import_resource() {
    return city_data.trade.caravan_import_resource;
}
export function city_trade_next_caravan_import_resource() {
    city_data.trade.caravan_import_resource++;
    if (city_data.trade.caravan_import_resource >= RESOURCE_MAX) {
        city_data.trade.caravan_import_resource = RESOURCE_MIN;
    }
    return city_data.trade.caravan_import_resource;
}
export function city_trade_next_caravan_backup_import_resource() {
    city_data.trade.caravan_backup_import_resource++;
    if (city_data.trade.caravan_backup_import_resource >= RESOURCE_MAX) {
        city_data.trade.caravan_backup_import_resource = RESOURCE_MIN;
    }
    return city_data.trade.caravan_backup_import_resource;
}
export function city_trade_next_docker_import_resource() {
    city_data.trade.docker_import_resource++;
    if (city_data.trade.docker_import_resource >= RESOURCE_MAX) {
        city_data.trade.docker_import_resource = RESOURCE_MIN;
    }
    return city_data.trade.docker_import_resource;
}
export function city_trade_next_docker_export_resource() {
    city_data.trade.docker_export_resource++;
    if (city_data.trade.docker_export_resource >= RESOURCE_MAX) {
        city_data.trade.docker_export_resource = RESOURCE_MIN;
    }
    return city_data.trade.docker_export_resource;
}
