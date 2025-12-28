
import { resource_type } from 'game/resource';
import { GRID, map_grid_offset } from 'map/grid';
import { map_tile } from 'map/point';
import { city_data_t } from './data_private';
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
import RESOURCE_MAX_FOOD = resource_type.RESOURCE_MAX_FOOD;
export let city_data: city_data_t = new city_data_t();
import GRID_SIZE = GRID.GRID_SIZE;
export function city_map_entry_point() {
    return city_data.map.entry_point;
}
export function city_map_exit_point() {
    return city_data.map.exit_point;
}
export function city_map_entry_flag() {
    return city_data.map.entry_flag;
}
export function city_map_exit_flag() {
    return city_data.map.exit_flag;
}
function set_tile(tile: map_tile, x: number, y: number) {
    let grid_offset: number = map_grid_offset(x, y);
    tile.x = x;
    tile.y = y;
    tile.grid_offset = grid_offset;
    return grid_offset;
}
export function city_map_set_entry_point(x: number, y: number) {
    set_tile(city_data.map.entry_point, x, y);
}
export function city_map_set_exit_point(x: number, y: number) {
    set_tile(city_data.map.exit_point, x, y);
}
export function city_map_set_entry_flag(x: number, y: number) {
    return set_tile(city_data.map.entry_flag, x, y);
}
export function city_map_set_exit_flag(x: number, y: number) {
    return set_tile(city_data.map.exit_flag, x, y);
}
export function city_map_road_network_index(network_id: number) {
    for (let n: number = 0; n < 10; n++) {
        if (city_data.map.largest_road_networks[n].id == network_id) {
            return n;
        }
    }
    return 11;
}
export function city_map_clear_largest_road_networks() {
    for (let i: number = 0; i < 10; i++) {
        city_data.map.largest_road_networks[i].id = 0;
        city_data.map.largest_road_networks[i].size = 0;
    }
}
export function city_map_add_to_largest_road_networks(network_id: number, size: number) {
    for (let n: number = 0; n < 10; n++) {
        if (size > city_data.map.largest_road_networks[n].size) {
            for (let m: number = 9; m > n; m--) {
                city_data.map.largest_road_networks[m].id = city_data.map.largest_road_networks[m - 1].id;
                city_data.map.largest_road_networks[m].size = city_data.map.largest_road_networks[m - 1].size;
            }
            city_data.map.largest_road_networks[n].id = network_id;
            city_data.map.largest_road_networks[n].size = size;
            break
        }
    }
}
