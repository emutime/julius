
import { building } from 'building/building';
import { city_data_t } from 'city/data_private';
import { resource_type } from 'game/resource';
import { Ref } from '../../ext/crt';
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
import RESOURCE_MAX_FOOD = resource_type.RESOURCE_MAX_FOOD;
export let city_data: city_data_t = new city_data_t();
export function city_buildings_has_senate() {
    return city_data.building.senate_placed;
}
export function city_buildings_add_senate(senate: building) {
    city_data.building.senate_placed = 1;
    if (!city_data.building.senate_grid_offset) {
        city_data.building.senate_building_id = senate.id;
        city_data.building.senate_x = senate.x;
        city_data.building.senate_y = senate.y;
        city_data.building.senate_grid_offset = senate.grid_offset;
    }
}
export function city_buildings_remove_senate(senate: building) {
    if (senate.grid_offset == city_data.building.senate_grid_offset) {
        city_data.building.senate_grid_offset = 0;
        city_data.building.senate_x = 0;
        city_data.building.senate_y = 0;
        city_data.building.senate_placed = 0;
    }
}
export function city_buildings_add_barracks(barracks: building) {
    if (!city_data.building.barracks_grid_offset) {
        city_data.building.barracks_building_id = barracks.id;
        city_data.building.barracks_x = barracks.x;
        city_data.building.barracks_y = barracks.y;
        city_data.building.barracks_grid_offset = barracks.grid_offset;
    }
}
export function city_buildings_remove_barracks(barracks: building) {
    if (barracks.grid_offset == city_data.building.barracks_grid_offset) {
        city_data.building.barracks_grid_offset = 0;
        city_data.building.barracks_x = 0;
        city_data.building.barracks_y = 0;
        city_data.building.barracks_placed = 0;
    }
}
export function city_buildings_get_barracks() {
    return city_data.building.barracks_building_id;
}
export function city_buildings_set_barracks(building_id: number) {
    city_data.building.barracks_building_id = building_id;
}
export function city_buildings_has_distribution_center() {
    return city_data.building.distribution_center_placed;
}
export function city_buildings_add_distribution_center(center: building) {
    city_data.building.distribution_center_placed = 1;
    if (!city_data.building.distribution_center_grid_offset) {
        city_data.building.distribution_center_building_id = center.id;
        city_data.building.distribution_center_x = center.x;
        city_data.building.distribution_center_y = center.y;
        city_data.building.distribution_center_grid_offset = center.grid_offset;
    }
}
export function city_buildings_remove_distribution_center(center: building) {
    if (center.grid_offset == city_data.building.distribution_center_grid_offset) {
        city_data.building.distribution_center_grid_offset = 0;
        city_data.building.distribution_center_x = 0;
        city_data.building.distribution_center_y = 0;
        city_data.building.distribution_center_placed = 0;
    }
}
export function city_buildings_get_trade_center() {
    return city_data.building.trade_center_building_id;
}
export function city_buildings_set_trade_center(building_id: number) {
    city_data.building.trade_center_building_id = building_id;
}
export function city_buildings_has_hippodrome() {
    return city_data.building.hippodrome_placed;
}
export function city_buildings_add_hippodrome() {
    city_data.building.hippodrome_placed = 1;
}
export function city_buildings_remove_hippodrome() {
    city_data.building.hippodrome_placed = 0;
}
export function city_buildings_triumphal_arch_available() {
    return city_data.building.triumphal_arches_available > city_data.building.triumphal_arches_placed;
}
export function city_buildings_build_triumphal_arch() {
    city_data.building.triumphal_arches_placed++;
}
export function city_buildings_earn_triumphal_arch() {
    city_data.building.triumphal_arches_available++;
}
export function city_buildings_add_dock() {
    city_data.building.working_docks++;
}
export function city_buildings_remove_dock() {
    city_data.building.working_docks--;
}
export function city_buildings_reset_dock_wharf_counters() {
    city_data.building.working_wharfs = 0;
    city_data.building.shipyard_boats_requested = 0;
    for (let i: number = 0; i < 8; i++) {
        city_data.building.working_dock_ids[i] = 0;
    }
    city_data.building.working_docks = 0;
}
export function city_buildings_add_working_wharf(needs_fishing_boat: boolean) {
    ++city_data.building.working_wharfs;
    if (needs_fishing_boat) {
        ++city_data.building.shipyard_boats_requested;
    }
}
export function city_buildings_add_working_dock(building_id: number) {
    if (city_data.building.working_docks < 10) {
        city_data.building.working_dock_ids[city_data.building.working_docks] = building_id;
    }
    ++city_data.building.working_docks;
}
export function city_buildings_shipyard_boats_requested() {
    return city_data.building.shipyard_boats_requested;
}
export function city_buildings_has_working_dock() {
    return city_data.building.working_docks > 0;
}
export function city_buildings_get_working_dock(index: number) {
    return city_data.building.working_dock_ids[index];
}
export function city_buildings_main_native_meeting_center(x: Ref<number>, y: Ref<number>) {
    x.v = city_data.building.main_native_meeting.x;
    y.v = city_data.building.main_native_meeting.y;
}
export function city_buildings_set_main_native_meeting_center(x: number, y: number) {
    city_data.building.main_native_meeting.x = x;
    city_data.building.main_native_meeting.y = y;
}
export function city_buildings_is_mission_post_operational() {
    return city_data.building.mission_post_operational > 0;
}
export function city_buildings_set_mission_post_operational() {
    city_data.building.mission_post_operational = 1;
}
export function city_buildings_unknown_value() {
    return city_data.building.unknown_value;
}
