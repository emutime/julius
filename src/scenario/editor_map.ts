import { figure_create_flotsam } from 'figuretype/water';
import { map_routing_update_water } from 'map/routing_terrain';
import { MAX_FISH_POINTS, MAX_HERD_POINTS, MAX_INVASION_POINTS, scenario_t } from 'scenario/data';
;
export let scenario: scenario_t = new scenario_t();
export function scenario_editor_set_entry_point(x: number, y: number) {
    scenario.entry_point.x = x;
    scenario.entry_point.y = y;
    scenario.is_saved = 0;
}
export function scenario_editor_set_exit_point(x: number, y: number) {
    scenario.exit_point.x = x;
    scenario.exit_point.y = y;
    scenario.is_saved = 0;
}
function update_river() {
    figure_create_flotsam();
    map_routing_update_water();
}
export function scenario_editor_set_river_entry_point(x: number, y: number) {
    scenario.river_entry_point.x = x;
    scenario.river_entry_point.y = y;
    scenario.is_saved = 0;
    update_river();
}
export function scenario_editor_set_river_exit_point(x: number, y: number) {
    scenario.river_exit_point.x = x;
    scenario.river_exit_point.y = y;
    scenario.is_saved = 0;
    update_river();
}
export function scenario_editor_clear_herd_points() {
    for (let i: number = 0; i < MAX_HERD_POINTS; i++) {
        scenario.herd_points[i].x = -1;
        scenario.herd_points[i].y = -1;
    }
    scenario.is_saved = 0;
}
export function scenario_editor_herd_point(id: number) {
    return scenario.herd_points[id];
}
export function scenario_editor_set_herd_point(id: number, x: number, y: number) {
    scenario.herd_points[id].x = x;
    scenario.herd_points[id].y = y;
    scenario.is_saved = 0;
}
export function scenario_editor_clear_fishing_points() {
    for (let i: number = 0; i < MAX_FISH_POINTS; i++) {
        scenario.fishing_points[i].x = -1;
        scenario.fishing_points[i].y = -1;
    }
    scenario.is_saved = 0;
}
export function scenario_editor_fishing_point(id: number) {
    return scenario.fishing_points[id];
}
export function scenario_editor_set_fishing_point(id: number, x: number, y: number) {
    scenario.fishing_points[id].x = x;
    scenario.fishing_points[id].y = y;
    scenario.is_saved = 0;
}
export function scenario_editor_count_invasion_points() {
    let points: number = 0;
    for (let i: number = 0; i < MAX_INVASION_POINTS; i++) {
        if (scenario.invasion_points[i].x != -1) {
            points++;
        }
    }
    return points;
}
export function scenario_editor_clear_invasion_points() {
    for (let i: number = 0; i < MAX_INVASION_POINTS; i++) {
        scenario.invasion_points[i].x = -1;
        scenario.invasion_points[i].y = -1;
    }
    scenario.is_saved = 0;
}
export function scenario_editor_invasion_point(id: number) {
    return scenario.invasion_points[id];
}
export function scenario_editor_set_invasion_point(id: number, x: number, y: number) {
    scenario.invasion_points[id].x = x;
    scenario.invasion_points[id].y = y;
    scenario.is_saved = 0;
}
export function scenario_editor_earthquake_point() {
    return scenario.earthquake_point;
}
export function scenario_editor_set_earthquake_point(x: number, y: number) {
    scenario.earthquake_point.x = x;
    scenario.earthquake_point.y = y;
    scenario.is_saved = 0;
}
export function scenario_editor_updated_terrain() {
    scenario.is_saved = 0;
}
