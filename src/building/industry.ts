// industry.ts

import {
    BUILDING_MARBLE_QUARRY,
    BUILDING_PIG_FARM,
    BUILDING_POTTERY_WORKSHOP,
    BUILDING_STATE_IN_USE,
    BUILDING_WHEAT_FARM,
    BUILDING_WINE_WORKSHOP,
    CLIMATE_NORTHERN,
    MAX_BUILDINGS,
    WORKSHOP_NONE
} from './constants'; // 假设常量在 constants.ts 中定义
import {
    building_get,
    calc_distance_with_penalty,
    city_resource_is_stockpiled,
    image_group,
    map_building_tiles_add_farm,
    map_point_store_result,
    resource_to_workshop_type,
    scenario_property_climate
} from './utils'; // 假设这些函数在 utils.ts 中定义

const MAX_PROGRESS_RAW = 200;
const MAX_PROGRESS_WORKSHOP = 400;
const INFINITE = 10000;

type BuildingType = number; // 假设建筑类型是数字
type Building = {
    id: number;
    state: number;
    output_resource_id: number;
    houses_covered: number;
    num_workers: number;
    subtype: { workshop_type: BuildingType };
    loads_stored: number;
    distance_from_entry: number;
    has_road_access: boolean;
    x: number;
    y: number;
    road_network_id: number;
    data: {
        industry: {
            progress: number;
            has_raw_materials: number;
            curse_days_left: number;
            blessing_days_left: number;
        };
    };
};

// 判断建筑是否为农场
export function building_is_farm(type: BuildingType): boolean {
    return type >= BUILDING_WHEAT_FARM && type <= BUILDING_PIG_FARM;
}

// 判断建筑是否为车间
export function building_is_workshop(type: BuildingType): boolean {
    return type >= BUILDING_WINE_WORKSHOP && type <= BUILDING_POTTERY_WORKSHOP;
}

// 获取建筑的最大进度
export function max_progress(b: Building): number {
    return b.subtype.workshop_type ? MAX_PROGRESS_WORKSHOP : MAX_PROGRESS_RAW;
}

// 更新农场图像
export function update_farm_image(b: Building): void {
    map_building_tiles_add_farm(b.id, b.x, b.y,
        image_group(GROUP_BUILDING_FARM_CROPS) + 5 * (b.output_resource_id - 1),
        b.data.industry.progress);
}

// 更新建筑的生产
export function building_industry_update_production(): void {
    for (let i = 1; i < MAX_BUILDINGS; i++) {
        const b = building_get(i);
        if (b.state !== BUILDING_STATE_IN_USE || !b.output_resource_id) {
            continue;
        }
        b.data.industry.has_raw_materials = 0;
        if (b.houses_covered <= 0 || b.num_workers <= 0) {
            continue;
        }
        if (b.subtype.workshop_type && !b.loads_stored) {
            continue;
        }
        if (b.data.industry.curse_days_left) {
            b.data.industry.curse_days_left--;
        } else {
            if (b.data.industry.blessing_days_left) {
                b.data.industry.blessing_days_left--;
            }
            if (b.id === BUILDING_MARBLE_QUARRY) {
                b.data.industry.progress += Math.floor(b.num_workers / 2);
            } else {
                b.data.industry.progress += b.num_workers;
            }
            if (b.data.industry.blessing_days_left && building_is_farm(b.id)) {
                b.data.industry.progress += b.num_workers;
            }
            const max = max_progress(b);
            if (b.data.industry.progress > max) {
                b.data.industry.progress = max;
            }
            if (building_is_farm(b.id)) {
                update_farm_image(b);
            }
        }
    }
}

// 更新小麦生产
export function building_industry_update_wheat_production(): void {
    if (scenario_property_climate() === CLIMATE_NORTHERN) {
        return;
    }
    for (let i = 1; i < MAX_BUILDINGS; i++) {
        const b = building_get(i);
        if (b.state !== BUILDING_STATE_IN_USE || !b.output_resource_id) {
            continue;
        }
        if (b.houses_covered <= 0 || b.num_workers <= 0) {
            continue;
        }
        if (b.id === BUILDING_WHEAT_FARM && !b.data.industry.curse_days_left) {
            b.data.industry.progress += b.num_workers;
            if (b.data.industry.blessing_days_left) {
                b.data.industry.progress += b.num_workers;
            }
            if (b.data.industry.progress > MAX_PROGRESS_RAW) {
                b.data.industry.progress = MAX_PROGRESS_RAW;
            }
            update_farm_image(b);
        }
    }
}

// 检查建筑是否已生产资源
export function building_industry_has_produced_resource(b: Building): boolean {
    return b.data.industry.progress >= max_progress(b);
}

// 开始新的生产
export function building_industry_start_new_production(b: Building): void {
    b.data.industry.progress = 0;
    if (b.subtype.workshop_type) {
        if (b.loads_stored) {
            if (b.loads_stored > 1) {
                b.data.industry.has_raw_materials = 1;
            }
            b.loads_stored--;
        }
    }
    if (building_is_farm(b.id)) {
        update_farm_image(b);
    }
}

// 祝福农场
export function building_bless_farms(): void {
    for (let i = 1; i < MAX_BUILDINGS; i++) {
        const b = building_get(i);
        if (b.state === BUILDING_STATE_IN_USE && b.output_resource_id && building_is_farm(b.id)) {
            b.data.industry.progress = MAX_PROGRESS_RAW;
            b.data.industry.curse_days_left = 0;
            b.data.industry.blessing_days_left = 16;
            update_farm_image(b);
        }
    }
}

// 诅咒农场
export function building_curse_farms(big_curse: boolean): void {
    for (let i = 1; i < MAX_BUILDINGS; i++) {
        const b = building_get(i);
        if (b.state === BUILDING_STATE_IN_USE && b.output_resource_id && building_is_farm(b.id)) {
            b.data.industry.progress = 0;
            b.data.industry.blessing_days_left = 0;
            b.data.industry.curse_days_left = big_curse ? 48 : 4;
            update_farm_image(b);
        }
    }
}

// 在车间添加原材料
export function building_workshop_add_raw_material(b: Building): void {
    if (b.id > 0 && building_is_workshop(b.id)) {
        b.loads_stored++; // BUG: 任何原材料都被接受
    }
}

// 获取有空间的原材料车间
export function building_get_workshop_for_raw_material_with_room(
    x: number,
    y: number,
    resource: number,
    distance_from_entry: number,
    road_network_id: number,
    dst: { x: number; y: number }
): number {
    if (city_resource_is_stockpiled(resource)) {
        return 0;
    }
    const output_type = resource_to_workshop_type(resource);
    if (output_type === WORKSHOP_NONE) {
        return 0;
    }
    let min_dist = INFINITE;
    let min_building: Building | null = null;
    for (let i = 1; i < MAX_BUILDINGS; i++) {
        const b = building_get(i);
        if (b.state !== BUILDING_STATE_IN_USE || !building_is_workshop(b.id)) {
            continue;
        }
        if (!b.has_road_access || b.distance_from_entry <= 0) {
            continue;
        }
        if (b.subtype.workshop_type === output_type && b.road_network_id === road_network_id && b.loads_stored < 2) {
            const dist = calc_distance_with_penalty(b.x, b.y, x, y, distance_from_entry, b.distance_from_entry);
            if (b.loads_stored > 0) {
                dist += 20;
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

// 获取原材料车间
export function building_get_workshop_for_raw_material(
    x: number,
    y: number,
    resource: number,
    distance_from_entry: number,
    road_network_id: number,
    dst: { x: number; y: number }
): number {
    if (city_resource_is_stockpiled(resource)) {
        return 0;
    }
    const output_type = resource_to_workshop_type(resource);
    if (output_type === WORKSHOP_NONE) {
        return 0;
    }
    let min_dist = INFINITE;
    let min_building: Building | null = null;
    for (let i = 1; i < MAX_BUILDINGS; i++) {
        const b = building_get(i);
        if (b.state !== BUILDING_STATE_IN_USE || !building_is_workshop(b.id)) {
            continue;
        }
        if (!b.has_road_access || b.distance_from_entry <= 0) {
            continue;
        }
        if (b.subtype.workshop_type === output_type && b.road_network_id === road_network_id) {
            const dist = 10 * b.loads_stored +
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