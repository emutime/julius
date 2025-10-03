export const MAX_PROGRESS_WORKSHOP = 400;
export const MAX_PROGRESS_RAW = 200;
import { building, building_get, MAX_BUILDINGS } from 'building/building';
import { building_state, building_type } from 'building/type';
import { city_resource_is_stockpiled } from 'city/resource';
import { calc_distance_with_penalty } from 'core/calc';
import { image_group } from 'core/image';
import { group_terrain } from 'core/image_group';
import { resource_to_workshop_type, resource_type, workshop_type } from 'game/resource';
import { map_building_tiles_add_farm } from 'map/building_tiles';
import { map_point, map_point_store_result } from 'map/point';
import { scenario_climate, scenario_property_climate } from 'scenario/property';
export const INFINITE = 10000;
import BUILDING_WHEAT_FARM = building_type.BUILDING_WHEAT_FARM;
import BUILDING_PIG_FARM = building_type.BUILDING_PIG_FARM;
import BUILDING_MARBLE_QUARRY = building_type.BUILDING_MARBLE_QUARRY;
import BUILDING_WINE_WORKSHOP = building_type.BUILDING_WINE_WORKSHOP;
import BUILDING_POTTERY_WORKSHOP = building_type.BUILDING_POTTERY_WORKSHOP;
import BUILDING_STATE_IN_USE = building_state.BUILDING_STATE_IN_USE;;
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
import WORKSHOP_NONE = workshop_type.WORKSHOP_NONE;
import GROUP_BUILDING_FARM_CROPS = group_terrain.GROUP_BUILDING_FARM_CROPS;
import CLIMATE_NORTHERN = scenario_climate.CLIMATE_NORTHERN;
export function building_is_farm(type: building_type) {
    return type >= BUILDING_WHEAT_FARM && type <= BUILDING_PIG_FARM;
}
export function building_is_workshop(type: building_type) {
    return type >= BUILDING_WINE_WORKSHOP && type <= BUILDING_POTTERY_WORKSHOP;
}
function max_progress(b: building) {
    return b.subtype.workshop_type ? MAX_PROGRESS_WORKSHOP : MAX_PROGRESS_RAW;
}
function update_farm_image(b: building) {
    map_building_tiles_add_farm(b.id, b.x, b.y,
        image_group(GROUP_BUILDING_FARM_CROPS) + 5 * (b.output_resource_id - 1),
        b.data.industry.progress);
}
export function building_industry_update_production() {
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state != BUILDING_STATE_IN_USE || !b.output_resource_id) {
            continue
        }
        b.data.industry.has_raw_materials = 0;
        if (b.houses_covered <= 0 || b.num_workers <= 0) {
            continue
        }
        if (b.subtype.workshop_type && !b.loads_stored) {
            continue
        }
        if (b.data.industry.curse_days_left) {
            b.data.industry.curse_days_left--;
        } else {
            if (b.data.industry.blessing_days_left) {
                b.data.industry.blessing_days_left--;
            }
            if (b.type == BUILDING_MARBLE_QUARRY) {
                b.data.industry.progress += b.num_workers / 2
            } else {
                b.data.industry.progress += b.num_workers
            }
            if (b.data.industry.blessing_days_left && building_is_farm(b.type)) {
                b.data.industry.progress += b.num_workers
            }
            let max: number = max_progress(b);
            if (b.data.industry.progress > max) {
                b.data.industry.progress = max;
            }
            if (building_is_farm(b.type)) {
                update_farm_image(b);
            }
        }
    }
}
export function building_industry_update_wheat_production() {
    if (scenario_property_climate() == CLIMATE_NORTHERN) {
        return;
    }
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state != BUILDING_STATE_IN_USE || !b.output_resource_id) {
            continue
        }
        if (b.houses_covered <= 0 || b.num_workers <= 0) {
            continue
        }
        if (b.type == BUILDING_WHEAT_FARM && !b.data.industry.curse_days_left) {
            b.data.industry.progress += b.num_workers
            if (b.data.industry.blessing_days_left) {
                b.data.industry.progress += b.num_workers
            }
            if (b.data.industry.progress > MAX_PROGRESS_RAW) {
                b.data.industry.progress = MAX_PROGRESS_RAW;
            }
            update_farm_image(b);
        }
    }
}
export function building_industry_has_produced_resource(b: building) {
    return b.data.industry.progress >= max_progress(b);
}
export function building_industry_start_new_production(b: building) {
    b.data.industry.progress = 0;
    if (b.subtype.workshop_type) {
        if (b.loads_stored) {
            if (b.loads_stored > 1) {
                b.data.industry.has_raw_materials = 1;
            }
            b.loads_stored--;
        }
    }
    if (building_is_farm(b.type)) {
        update_farm_image(b);
    }
}
export function building_bless_farms() {
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state == BUILDING_STATE_IN_USE && b.output_resource_id && building_is_farm(b.type)) {
            b.data.industry.progress = MAX_PROGRESS_RAW;
            b.data.industry.curse_days_left = 0;
            b.data.industry.blessing_days_left = 16;
            update_farm_image(b);
        }
    }
}
export function building_curse_farms(big_curse: number) {
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state == BUILDING_STATE_IN_USE && b.output_resource_id && building_is_farm(b.type)) {
            b.data.industry.progress = 0;
            b.data.industry.blessing_days_left = 0;
            b.data.industry.curse_days_left = big_curse ? 48 : 4;
            update_farm_image(b);
        }
    }
}
export function building_workshop_add_raw_material(b: building) {
    if (b.id > 0 && building_is_workshop(b.type)) {
        b.loads_stored++;
    }
}
export function building_get_workshop_for_raw_material_with_room(x: number, y: number, resource: number, distance_from_entry: number, road_network_id: number, dst: map_point) {
    if (city_resource_is_stockpiled(resource)) {
        return 0;
    }
    let output_type: number = resource_to_workshop_type(resource);
    if (output_type == WORKSHOP_NONE) {
        return 0;
    }
    let min_dist: number = INFINITE;
    let min_building: building = null;
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state != BUILDING_STATE_IN_USE || !building_is_workshop(b.type)) {
            continue
        }
        if (!b.has_road_access || b.distance_from_entry <= 0) {
            continue
        }
        if (b.subtype.workshop_type == output_type && b.road_network_id == road_network_id && b.loads_stored < 2) {
            let dist: number = calc_distance_with_penalty(b.x, b.y, x, y, distance_from_entry, b.distance_from_entry);
            if (b.loads_stored > 0) {
                dist += 20
            }
            if (dist < min_dist) {
                min_dist = dist;
                min_building = b;
            }
        }
    }
    if (min_building) {
        map_point_store_result(min_building.road_access_x, min_building.road_access_y, dst);
        return min_building.id;
    }
    return 0;
}
export function building_get_workshop_for_raw_material(x: number, y: number, resource: number, distance_from_entry: number, road_network_id: number, dst: map_point) {
    if (city_resource_is_stockpiled(resource)) {
        return 0;
    }
    let output_type: number = resource_to_workshop_type(resource);
    if (output_type == WORKSHOP_NONE) {
        return 0;
    }
    let min_dist: number = INFINITE;
    let min_building: building = null;
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state != BUILDING_STATE_IN_USE || !building_is_workshop(b.type)) {
            continue
        }
        if (!b.has_road_access || b.distance_from_entry <= 0) {
            continue
        }
        if (b.subtype.workshop_type == output_type && b.road_network_id == road_network_id) {
            let dist: number = 10 * b.loads_stored +
                calc_distance_with_penalty(b.x, b.y, x, y, distance_from_entry, b.distance_from_entry);
            if (dist < min_dist) {
                min_dist = dist;
                min_building = b;
            }
        }
    }
    if (min_building) {
        map_point_store_result(min_building.road_access_x, min_building.road_access_y, dst);
        return min_building.id;
    }
    return 0;
}
