import { building, building_create, building_get, MAX_BUILDINGS } from 'building/building';
import { building_list_small_add, building_list_small_clear, building_list_small_items, building_list_small_size } from 'building/list';
import { building_state, building_type } from 'building/type';
import { city_buildings_set_main_native_meeting_center } from 'city/buildings';
import { city_military_decrease_native_attack_duration, city_military_start_native_attack } from 'city/military';
import { calc_maximum_distance } from 'core/calc';
import { image_group } from 'core/image';
import { group_terrain } from 'core/image_group';
import { group_editor } from 'core/image_group_editor';
import { map_building_at, map_building_set } from 'map/building';
import { map_building_tiles_remove } from 'map/building_tiles';
import { GRID, map_grid_delta, map_grid_get_area, map_grid_offset } from 'map/grid';
import { map_image_at, map_image_set } from 'map/image';
import { map_property_clear_all_native_land, map_property_mark_native_land } from 'map/property';
import { map_random_get } from 'map/random';
import { map_terrain_is, terrain } from 'map/terrain';
import { scenario_building_image_native_crops, scenario_building_image_native_hut, scenario_building_image_native_meeting } from 'scenario/building';
import { map_data_t } from './data';
import BUILDING_MISSION_POST = building_type.BUILDING_MISSION_POST;
import BUILDING_NATIVE_HUT = building_type.BUILDING_NATIVE_HUT;
import BUILDING_NATIVE_MEETING = building_type.BUILDING_NATIVE_MEETING;
import BUILDING_NATIVE_CROPS = building_type.BUILDING_NATIVE_CROPS;
import BUILDING_STATE_IN_USE = building_state.BUILDING_STATE_IN_USE;;
import GROUP_BUILDING_FARM_CROPS = group_terrain.GROUP_BUILDING_FARM_CROPS;
import GROUP_BUILDING_NATIVE = group_terrain.GROUP_BUILDING_NATIVE;
import GROUP_EDITOR_BUILDING_CROPS = group_editor.GROUP_EDITOR_BUILDING_CROPS;
import GROUP_EDITOR_BUILDING_NATIVE = group_editor.GROUP_EDITOR_BUILDING_NATIVE;
export let map_data: map_data_t = new map_data_t();
import GRID_SIZE = GRID.GRID_SIZE;
import TERRAIN_BUILDING = terrain.TERRAIN_BUILDING;
import TERRAIN_WALL = terrain.TERRAIN_WALL;
import TERRAIN_GATEHOUSE = terrain.TERRAIN_GATEHOUSE;
function mark_native_land(x: number, y: number, size: number, radius: number) {
    let xMinRef: { value: number } = { value: 0 };
    let yMinRef: { value: number } = { value: 0 };
    let xMaxRef: { value: number } = { value: 0 };
    let yMaxRef: { value: number } = { value: 0 };
    map_grid_get_area(x, y, size, radius, xMinRef, yMinRef, xMaxRef, yMaxRef);
    let x_min: number = xMinRef.value;
    let y_min: number = yMinRef.value;
    let x_max: number = xMaxRef.value;
    let y_max: number = yMaxRef.value;
    for (let yy: number = y_min; yy <= y_max; yy++) {
        for (let xx: number = x_min; xx <= x_max; xx++) {
            map_property_mark_native_land(map_grid_offset(xx, yy));
        }
    }
}
function has_building_on_native_land(x: number, y: number, size: number, radius: number) {
    let xMinRef: { value: number } = { value: 0 };
    let yMinRef: { value: number } = { value: 0 };
    let xMaxRef: { value: number } = { value: 0 };
    let yMaxRef: { value: number } = { value: 0 };
    map_grid_get_area(x, y, size, radius, xMinRef, yMinRef, xMaxRef, yMaxRef);
    let x_min: number = xMinRef.value;
    let y_min: number = yMinRef.value;
    let x_max: number = xMaxRef.value;
    let y_max: number = yMaxRef.value;
    for (let yy: number = y_min; yy <= y_max; yy++) {
        for (let xx: number = x_min; xx <= x_max; xx++) {
            let building_id: number = map_building_at(map_grid_offset(xx, yy));
            if (building_id > 0) {
                let type: number = building_get(building_id).type;
                if (type != BUILDING_MISSION_POST &&
                    type != BUILDING_NATIVE_HUT &&
                    type != BUILDING_NATIVE_MEETING &&
                    type != BUILDING_NATIVE_CROPS) {
                    return 1;
                }
            }
        }
    }
    return 0;
}
function determine_meeting_center() {
    building_list_small_clear();
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state == BUILDING_STATE_IN_USE && b.type == BUILDING_NATIVE_MEETING) {
            building_list_small_add(i);
        }
    }
    let total_meetings: number = building_list_small_size();
    if (total_meetings <= 0) {
        return;
    }
    let meetings: number = building_list_small_items();
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state == BUILDING_STATE_IN_USE && b.type == BUILDING_NATIVE_HUT) {
            let min_dist: number = 1000;
            let min_meeting_id: number = 0;
            for (let n: number = 0; n < total_meetings; n++) {
                let meeting: building = building_get(meetings[n]);
                let dist: number = calc_maximum_distance(b.x, b.y, meeting.x, meeting.y);
                if (dist < min_dist) {
                    min_dist = dist;
                    min_meeting_id = meetings[n];
                }
            }
            b.subtype.native_meeting_center_id = min_meeting_id;
        }
    }
}
export function map_natives_init() {
    let meeting_center_set: number = 0;
    let image_hut: number = scenario_building_image_native_hut();
    let image_meeting: number = scenario_building_image_native_meeting();
    let image_crops: number = scenario_building_image_native_crops();
    let native_image: number = image_group(GROUP_BUILDING_NATIVE);
    let grid_offset: number = map_data.start_offset;
    for (let y: number = 0; y < map_data.height; y++, grid_offset += map_data.border_size) {
        for (let x: number = 0; x < map_data.width; x++, grid_offset++) {
            if (!map_terrain_is(grid_offset, TERRAIN_BUILDING) || map_building_at(grid_offset)) {
                continue
            }
            let random_bit: number = map_random_get(grid_offset) & 1;
            let type: number;
            let image_id: number = map_image_at(grid_offset);
            if (image_id == image_hut) {
                type = BUILDING_NATIVE_HUT;
                map_image_set(grid_offset, native_image);
            } else if (image_id == image_hut + 1) {
                type = BUILDING_NATIVE_HUT;
                map_image_set(grid_offset, native_image + 1);
            } else if (image_id == image_meeting) {
                type = BUILDING_NATIVE_MEETING;
                map_image_set(grid_offset, native_image + 2);
                map_image_set(grid_offset + map_grid_delta(1, 0), native_image + 2);
                map_image_set(grid_offset + map_grid_delta(0, 1), native_image + 2);
                map_image_set(grid_offset + map_grid_delta(1, 1), native_image + 2);
            } else if (image_id == image_crops) {
                type = BUILDING_NATIVE_CROPS;
                map_image_set(grid_offset, image_group(GROUP_BUILDING_FARM_CROPS) + random_bit);
            } else {
                map_building_tiles_remove(0, x, y);
                continue
            }
            let b: building = building_create(type, x, y);
            map_building_set(grid_offset, b.id);
            b.state = BUILDING_STATE_IN_USE;
            switch (type) {
                case BUILDING_NATIVE_CROPS:
                    b.data.industry.progress = random_bit;
                    break
                case BUILDING_NATIVE_MEETING:
                    b.sentiment.native_anger = 100;
                    map_building_set(grid_offset + map_grid_delta(1, 0), b.id);
                    map_building_set(grid_offset + map_grid_delta(0, 1), b.id);
                    map_building_set(grid_offset + map_grid_delta(1, 1), b.id);
                    mark_native_land(b.x, b.y, 2, 6);
                    if (!meeting_center_set) {
                        city_buildings_set_main_native_meeting_center(b.x, b.y);
                    }
                    break
                case BUILDING_NATIVE_HUT:
                    b.sentiment.native_anger = 100;
                    b.figure_spawn_delay = random_bit;
                    mark_native_land(b.x, b.y, 1, 3);
                    break
            }
        }
    }
    determine_meeting_center();
}
export function map_natives_init_editor() {
    let image_hut: number = scenario_building_image_native_hut();
    let image_meeting: number = scenario_building_image_native_meeting();
    let image_crops: number = scenario_building_image_native_crops();
    let native_image: number = image_group(GROUP_EDITOR_BUILDING_NATIVE);
    let grid_offset: number = map_data.start_offset;
    for (let y: number = 0; y < map_data.height; y++, grid_offset += map_data.border_size) {
        for (let x: number = 0; x < map_data.width; x++, grid_offset++) {
            if (!map_terrain_is(grid_offset, TERRAIN_BUILDING) || map_building_at(grid_offset)) {
                continue
            }
            let type: number;
            let image_id: number = map_image_at(grid_offset);
            if (image_id == image_hut) {
                type = BUILDING_NATIVE_HUT;
                map_image_set(grid_offset, native_image);
            } else if (image_id == image_hut + 1) {
                type = BUILDING_NATIVE_HUT;
                map_image_set(grid_offset, native_image + 1);
            } else if (image_id == image_meeting) {
                type = BUILDING_NATIVE_MEETING;
                map_image_set(grid_offset, native_image + 2);
                map_image_set(grid_offset + map_grid_delta(1, 0), native_image + 2);
                map_image_set(grid_offset + map_grid_delta(0, 1), native_image + 2);
                map_image_set(grid_offset + map_grid_delta(1, 1), native_image + 2);
            } else if (image_id == image_crops) {
                type = BUILDING_NATIVE_CROPS;
                map_image_set(grid_offset, image_group(GROUP_EDITOR_BUILDING_CROPS));
            } else {
                map_building_tiles_remove(0, x, y);
                continue
            }
            let b: building = building_create(type, x, y);
            b.state = BUILDING_STATE_IN_USE;
            map_building_set(grid_offset, b.id);
            if (type == BUILDING_NATIVE_MEETING) {
                map_building_set(grid_offset + map_grid_delta(1, 0), b.id);
                map_building_set(grid_offset + map_grid_delta(0, 1), b.id);
                map_building_set(grid_offset + map_grid_delta(1, 1), b.id);
            }
        }
    }
}
export function map_natives_check_land() {
    map_property_clear_all_native_land();
    city_military_decrease_native_attack_duration();
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state != BUILDING_STATE_IN_USE) {
            continue
        }
        let size: number
        let radius: number;
        if (b.type == BUILDING_NATIVE_HUT) {
            size = 1;
            radius = 3;
        } else if (b.type == BUILDING_NATIVE_MEETING) {
            size = 2;
            radius = 6;
        } else {
            continue
        }
        if (b.sentiment.native_anger >= 100) {
            mark_native_land(b.x, b.y, size, radius);
            if (has_building_on_native_land(b.x, b.y, size, radius)) {
                city_military_start_native_attack();
            }
        } else {
            b.sentiment.native_anger++;
        }
    }
}
