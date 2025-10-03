
;
import { buffer } from 'core/buffer';
import { buffer_init } from 'core/buffer';
import { buffer_write_i32 } from 'core/buffer';
import { buffer_read_i16 } from 'core/buffer';
import { buffer_read_i32 } from 'core/buffer';
import { building_type } from 'building/type';
import { resource_type } from 'game/resource';
import RESOURCE_NONE = resource_type.RESOURCE_NONE;
import RESOURCE_WHEAT = resource_type.RESOURCE_WHEAT;
import RESOURCE_VEGETABLES = resource_type.RESOURCE_VEGETABLES;
import RESOURCE_FRUIT = resource_type.RESOURCE_FRUIT;
import RESOURCE_OLIVES = resource_type.RESOURCE_OLIVES;
import RESOURCE_VINES = resource_type.RESOURCE_VINES;
import RESOURCE_MEAT = resource_type.RESOURCE_MEAT;
import RESOURCE_WINE = resource_type.RESOURCE_WINE;
import RESOURCE_OIL = resource_type.RESOURCE_OIL;
import RESOURCE_IRON = resource_type.RESOURCE_IRON;
import RESOURCE_TIMBER = resource_type.RESOURCE_TIMBER;
import RESOURCE_CLAY = resource_type.RESOURCE_CLAY;
import RESOURCE_MARBLE = resource_type.RESOURCE_MARBLE;
import RESOURCE_WEAPONS = resource_type.RESOURCE_WEAPONS;
import RESOURCE_FURNITURE = resource_type.RESOURCE_FURNITURE;
import RESOURCE_POTTERY = resource_type.RESOURCE_POTTERY;
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
import { resource_type } from 'game/resource';
import { workshop_type } from 'game/resource';
import { resource_image_type } from 'game/resource';
import { building_count_industry_active } from 'building/count';
import { resource_trade_status } from 'city/constants';
import TRADE_STATUS_IMPORT = resource_trade_status.TRADE_STATUS_IMPORT;
import TRADE_STATUS_EXPORT = resource_trade_status.TRADE_STATUS_EXPORT;
import { resource_trade_status } from 'city/constants';
import { city_population } from 'city/population';
import { resource_list } from 'city/resource';
import { city_resource_count } from 'city/resource';
import { city_resource_trade_status } from 'city/resource';
import { city_resource_export_over } from 'city/resource';
import { direction_type } from 'core/direction';
import { calc_bound } from 'core/calc';
import { log_error } from 'core/log';
import { localized } from 'core/dir';
import NOT_LOCALIZED = localized.NOT_LOCALIZED;
import { dir_listing } from 'core/dir';
import { io_read_file_part_into_buffer } from 'core/io';
import { empire_city } from 'empire/city';
import { empire_city_get } from 'empire/city';
import { empire_object } from 'empire/object';
import { empire_object_load } from 'empire/object';
import { empire_object_init_cities } from 'empire/object';
import { empire_object_get_our_city } from 'empire/object';
import { empire_object_get_closest } from 'empire/object';
import { trade_route_limit_reached } from 'empire/trade_route';
import { _invalid_parameter_noinfo } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt';
import { _errno } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/errno';
import { memcpy } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vcruntime_string';
import { memcpy } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vcruntime_string';
import { memmove } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vcruntime_string';
import { memmove } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vcruntime_string';
import { memset } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vcruntime_string';
import { memset } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vcruntime_string';
import { wcsnlen } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstring';
import { wcstok } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstring';
import { strnlen } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/string';
export const enum empire {
    EMPIRE_WIDTH = 2000,
    EMPIRE_HEIGHT = 1000,
    EMPIRE_HEADER_SIZE = 1280,
    EMPIRE_DATA_SIZE = 12800,
}
export class unnamed23_8 {
    public initial_scroll_x: number = 0;
    public initial_scroll_y: number = 0;
    public scroll_x: number = 0;
    public scroll_y: number = 0;
    public selected_object: number = 0;
    public viewport_width: number = 0;
    public viewport_height: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.initial_scroll_x = args[0]);
        args.length >= 2 && (this.initial_scroll_y = args[1]);
        args.length >= 3 && (this.scroll_x = args[2]);
        args.length >= 4 && (this.scroll_y = args[3]);
        args.length >= 5 && (this.selected_object = args[4]);
        args.length >= 6 && (this.viewport_width = args[5]);
        args.length >= 7 && (this.viewport_height = args[6]);
    }
}
let data: unnamed23_8 = new unnamed23_8();
export function empire_load(is_custom_scenario: number, empire_id: number) {
    let raw_data: char[];
    let filename: char = is_custom_scenario ? "c32.emp" : "c3.emp";
    if (!io_read_file_part_into_buffer(filename, NOT_LOCALIZED, raw_data, 4, 32 * empire_id)) {
        memset(raw_data, 0);
    }
    let buf: buffer;
    buffer_init(buf, raw_data, 4);
    data.initial_scroll_x = buffer_read_i16(buf);
    data.initial_scroll_y = buffer_read_i16(buf);
    let offset: number = EMPIRE_HEADER_SIZE + EMPIRE_DATA_SIZE * empire_id;
    let read_size: number = io_read_file_part_into_buffer(filename, NOT_LOCALIZED, raw_data, EMPIRE_DATA_SIZE, offset);
    if (read_size != EMPIRE_DATA_SIZE) {
        log_error("Unable to load empire data from file", filename, 0);
        memset(raw_data, 0);
    }
    buffer_init(buf, raw_data, EMPIRE_DATA_SIZE);
    empire_object_load(buf);
}
function check_scroll_boundaries() {
    let max_x: number = EMPIRE_WIDTH - data.viewport_width;
    let max_y: number = EMPIRE_HEIGHT - data.viewport_height;
    data.scroll_x = calc_bound(data.scroll_x, 0, max_x);
    data.scroll_y = calc_bound(data.scroll_y, 0, max_y);
}
export function empire_load_editor(empire_id: number, viewport_width: number, viewport_height: number) {
    empire_load(1, empire_id);
    empire_object_init_cities();
    let our_city: empire_object = empire_object_get_our_city();
    data.viewport_width = viewport_width;
    data.viewport_height = viewport_height;
    if (our_city) {
        data.scroll_x = our_city.x - data.viewport_width / 2;
        data.scroll_y = our_city.y - data.viewport_height / 2;
    } else {
        data.scroll_x = data.initial_scroll_x;
        data.scroll_y = data.initial_scroll_y;
    }
    check_scroll_boundaries();
}
export function empire_init_scenario() {
    data.scroll_x = data.initial_scroll_x;
    data.scroll_y = data.initial_scroll_y;
    data.viewport_width = EMPIRE_WIDTH;
    data.viewport_height = EMPIRE_HEIGHT;
    empire_object_init_cities();
}
export function empire_set_viewport(width: number, height: number) {
    data.viewport_width = width;
    data.viewport_height = height;
    check_scroll_boundaries();
}
export function empire_adjust_scroll(x_offset: number, y_offset: number) {
    * x_offset = * x_offset - data.scroll_x;
    * y_offset = * y_offset - data.scroll_y;
}
export function empire_scroll_map(x: number, y: number) {
    data.scroll_x += x
    data.scroll_y += y
    check_scroll_boundaries();
}
export function empire_selected_object() {
    return data.selected_object;
}
export function empire_clear_selected_object() {
    data.selected_object = 0;
}
export function empire_select_object(x: number, y: number) {
    let map_x: number = x + data.scroll_x;
    let map_y: number = y + data.scroll_y;
    data.selected_object = empire_object_get_closest(map_x, map_y);
}
export function empire_can_export_resource_to_city(city_id: number, resource: number) {
    let city: empire_city = empire_city_get(city_id);
    if (city_id && trade_route_limit_reached(city.route_id, resource)) {
        return 0;
    }
    if (city_resource_count(resource) <= city_resource_export_over(resource)) {
        return 0;
    }
    if (city_id == 0 || city.buys_resource[resource]) {
        return city_resource_trade_status(resource) == TRADE_STATUS_EXPORT;
    } else {
        return 0;
    }
}
function get_max_stock_for_population() {
    let population: number = city_population();
    if (population < 2000) {
        return 10;
    } else if (population < 4000) {
        return 20;
    } else if (population < 6000) {
        return 30;
    } else {
        return 40;
    }
}
export function empire_can_import_resource_from_city(city_id: number, resource: number) {
    let city: empire_city = empire_city_get(city_id);
    if (!city.sells_resource[resource]) {
        return 0;
    }
    if (city_resource_trade_status(resource) != TRADE_STATUS_IMPORT) {
        return 0;
    }
    if (trade_route_limit_reached(city.route_id, resource)) {
        return 0;
    }
    let in_stock: number = city_resource_count(resource);
    let max_in_stock: number = 0;
    let finished_good: number = RESOURCE_NONE;
    switch (resource) {
        case RESOURCE_WHEAT:
        case RESOURCE_VEGETABLES:
        case RESOURCE_FRUIT:
        case RESOURCE_MEAT:
        case RESOURCE_POTTERY:
        case RESOURCE_FURNITURE:
        case RESOURCE_OIL:
        case RESOURCE_WINE:
            max_in_stock = get_max_stock_for_population();
            break
        case RESOURCE_MARBLE:
        case RESOURCE_WEAPONS:
            max_in_stock = 10;
            break
        case RESOURCE_CLAY:
            finished_good = RESOURCE_POTTERY;
            break
        case RESOURCE_TIMBER:
            finished_good = RESOURCE_FURNITURE;
            break
        case RESOURCE_OLIVES:
            finished_good = RESOURCE_OIL;
            break
        case RESOURCE_VINES:
            finished_good = RESOURCE_WINE;
            break
        case RESOURCE_IRON:
            finished_good = RESOURCE_WEAPONS;
            break
    }
    if (finished_good) {
        max_in_stock = 2 + 2 * building_count_industry_active(finished_good);
    }
    return in_stock < max_in_stock ? 1 : 0;
}
export function empire_save_state(buf: buffer) {
    buffer_write_i32(buf, data.scroll_x);
    buffer_write_i32(buf, data.scroll_y);
    buffer_write_i32(buf, data.selected_object);
}
export function empire_load_state(buf: buffer) {
    data.scroll_x = buffer_read_i32(buf);
    data.scroll_y = buffer_read_i32(buf);
    data.selected_object = buffer_read_i32(buf);
}
