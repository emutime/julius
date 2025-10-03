import { MAX_HERD_POINTS } from 'scenario/data';
import { MAX_FISH_POINTS } from 'scenario/data';
import { map_point } from 'map/point';
import { map_point_store_result } from 'map/point';
import { direction_type } from 'core/direction';;
import { calc_maximum_distance } from 'core/calc';
import { buffer } from 'core/buffer';
import { GRID } from 'map/grid';
import GRID_SIZE = GRID.GRID_SIZE;
import { map_grid_init } from 'map/grid';
import { request_t } from 'scenario/data';
import { invasion_t } from 'scenario/data';
import { price_change_t } from 'scenario/data';
import { demand_change_t } from 'scenario/data';
export let scenario: scenario_t = new scenario_t();
export function scenario_map_init() {
    map_grid_init(scenario.map.width, scenario.map.height,
        scenario.map.grid_start, scenario.map.grid_border_size);
}
export function scenario_map_size() {
    return scenario.map.width;
}
export function scenario_map_init_entry_exit() {
    if (scenario.entry_point.x == -1 || scenario.entry_point.y == -1) {
        scenario.entry_point.x = scenario.map.width - 1;
        scenario.entry_point.y = scenario.map.height / 2;
    }
    if (scenario.exit_point.x == -1 || scenario.exit_point.y == -1) {
        scenario.exit_point.x = scenario.entry_point.x;
        scenario.exit_point.y = scenario.entry_point.y;
    }
}
export function scenario_map_entry() {
    let point: map_point = { scenario.entry_point.x, scenario.entry_point.y };
    return point;
}
export function scenario_map_exit() {
    let point: map_point = { scenario.exit_point.x, scenario.exit_point.y };
    return point;
}
export function scenario_map_has_river_entry() {
    return scenario.river_entry_point.x != -1 && scenario.river_entry_point.y != -1;
}
export function scenario_map_river_entry() {
    let point: map_point = { scenario.river_entry_point.x, scenario.river_entry_point.y };
    return point;
}
export function scenario_map_has_river_exit() {
    return scenario.river_exit_point.x != -1 && scenario.river_exit_point.y != -1;
}
export function scenario_map_river_exit() {
    let point: map_point = { scenario.river_exit_point.x, scenario.river_exit_point.y };
    return point;
}
export function scenario_map_foreach_herd_point(callback: void () {
    for (let i: number = 0; i < MAX_HERD_POINTS; i++) {
        if (scenario.herd_points[i].x > 0) {
            callback(scenario.herd_points[i].x, scenario.herd_points[i].y);
        }
    }
}
export function scenario_map_foreach_fishing_point(callback: void () {
    for (let i: number = 0; i < MAX_FISH_POINTS; i++) {
        if (scenario.fishing_points[i].x > 0) {
            callback(scenario.fishing_points[i].x, scenario.fishing_points[i].y);
        }
    }
}
export function scenario_map_closest_fishing_point(x: number, y: number, fish: map_point) {
    let num_fishing_spots: number = 0;
    for (let i: number = 0; i < MAX_FISH_POINTS; i++) {
        if (scenario.fishing_points[i].x > 0) {
            num_fishing_spots++;
        }
    }
    if (num_fishing_spots <= 0) {
        return 0;
    }
    let min_dist: number = 10000;
    let min_fish_id: number = 0;
    for (let i: number = 0; i < MAX_FISH_POINTS; i++) {
        if (scenario.fishing_points[i].x > 0) {
            let dist: number = calc_maximum_distance(x, y,
                scenario.fishing_points[i].x, scenario.fishing_points[i].y);
            if (dist < min_dist) {
                min_dist = dist;
                min_fish_id = i;
            }
        }
    }
    if (min_dist < 10000) {
        map_point_store_result(
            scenario.fishing_points[min_fish_id].x,
            scenario.fishing_points[min_fish_id].y,
            fish
        );
        return 1;
    }
    return 0;
}
export function scenario_map_has_flotsam() {
    return scenario.flotsam_enabled;
}
