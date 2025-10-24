import { building, building_get, MAX_BUILDINGS } from 'building/building';
import { building_state, building_type } from 'building/type';
import { city_buildings_get_working_dock, city_buildings_has_working_dock } from 'city/buildings';
import { figure_action } from 'figure/action';
import { figure, figure_get } from 'figure/figure';
import { map_has_figure_at } from 'map/figure';
import { map_grid_offset } from 'map/grid';
import { map_point, map_point_store_result } from 'map/point';
import { map_routing_calculate_distances_water_boat } from 'map/routing';
import { map_terrain_is_adjacent_to_open_water } from 'map/terrain';
import { scenario_map_river_entry } from 'scenario/map';
import BUILDING_DOCK = building_type.BUILDING_DOCK;
import BUILDING_STATE_IN_USE = building_state.BUILDING_STATE_IN_USE;;
import FIGURE_ACTION_132_DOCKER_IDLING = figure_action.FIGURE_ACTION_132_DOCKER_IDLING;
import FIGURE_ACTION_133_DOCKER_IMPORT_QUEUE = figure_action.FIGURE_ACTION_133_DOCKER_IMPORT_QUEUE;
export function building_dock_count_idle_dockers(dock: building) {
    let num_idle: number = 0;
    for (let i: number = 0; i < 3; i++) {
        if (dock.data.dock.docker_ids[i]) {
            let f: figure = figure_get(dock.data.dock.docker_ids[i]);
            if (f.action_state == FIGURE_ACTION_132_DOCKER_IDLING ||
                f.action_state == FIGURE_ACTION_133_DOCKER_IMPORT_QUEUE) {
                num_idle++;
            }
        }
    }
    return num_idle;
}
export function building_dock_update_open_water_access() {
    let river_entry: map_point = scenario_map_river_entry();
    map_routing_calculate_distances_water_boat(river_entry.x, river_entry.y);
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state == BUILDING_STATE_IN_USE && !b.house_size && b.type == BUILDING_DOCK) {
            if (map_terrain_is_adjacent_to_open_water(b.x, b.y, 3)) {
                b.has_water_access = 1;
            } else {
                b.has_water_access = 0;
            }
        }
    }
}
export function building_dock_is_connected_to_open_water(x: number, y: number) {
    let river_entry: map_point = scenario_map_river_entry();
    map_routing_calculate_distances_water_boat(river_entry.x, river_entry.y);
    if (map_terrain_is_adjacent_to_open_water(x, y, 3)) {
        return 1;
    } else {
        return 0;
    }
}
export function building_dock_get_free_destination(ship_id: number, tile: map_point) {
    if (!city_buildings_has_working_dock()) {
        return 0;
    }
    let dock_id: number = 0;
    for (let i: number = 0; i < 10; i++) {
        dock_id = city_buildings_get_working_dock(i);
        if (!dock_id) {
            continue
        }
        let dock: building = building_get(dock_id);
        if (!dock.data.dock.trade_ship_id || dock.data.dock.trade_ship_id == ship_id) {
            break
        }
    }
    if (dock_id <= 0) {
        return 0;
    }
    let dock: building = building_get(dock_id);
    let dx: number
    let dy: number;
    switch (dock.data.dock.orientation) {
        case 0:
            dx = 1;
            dy = -1;
            break
        case 1:
            dx = 3;
            dy = 1;
            break
        case 2:
            dx = 1;
            dy = 3;
            break
        default: dx = -1
            dy = 1;
            break
    }
    map_point_store_result(dock.x + dx, dock.y + dy, tile);
    dock.data.dock.trade_ship_id = ship_id;
    return dock_id;
}
export function building_dock_get_queue_destination(tile: map_point) {
    if (!city_buildings_has_working_dock()) {
        return 0;
    }
    for (let i: number = 0; i < 10; i++) {
        let dock_id: number = city_buildings_get_working_dock(i);
        if (!dock_id) {
            continue
        }
        let dock: building = building_get(dock_id);
        let dx: number
        let dy: number;
        switch (dock.data.dock.orientation) {
            case 0:
                dx = 2;
                dy = -2;
                break
            case 1:
                dx = 4;
                dy = 2;
                break
            case 2:
                dx = 2;
                dy = 4;
                break
            default: dx = -2
                dy = 2;
                break
        }
        map_point_store_result(dock.x + dx, dock.y + dy, tile);
        if (!map_has_figure_at(map_grid_offset(tile.x, tile.y))) {
            return dock_id;
        }
    }
    for (let i: number = 0; i < 10; i++) {
        let dock_id: number = city_buildings_get_working_dock(i);
        if (!dock_id) {
            continue
        }
        let dock: building = building_get(dock_id);
        let dx: number
        let dy: number;
        switch (dock.data.dock.orientation) {
            case 0:
                dx = 2;
                dy = -3;
                break
            case 1:
                dx = 5;
                dy = 2;
                break
            case 2:
                dx = 2;
                dy = 5;
                break
            default: dx = -3
                dy = 2;
                break
        }
        map_point_store_result(dock.x + dx, dock.y + dy, tile);
        if (!map_has_figure_at(map_grid_offset(tile.x, tile.y))) {
            return dock_id;
        }
    }
    return 0;
}
