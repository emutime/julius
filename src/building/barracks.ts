

import { calc_maximum_distance } from "core/calc";
import { resource_type } from "game/resource";
import { model_get_building } from "./model";
import { building_type } from "./type";

import RESOURCE_WEAPONS = resource_type.RESOURCE_WEAPONS;
import BUILDING_TOWER = building_type.BUILDING_TOWER;
import BUILDING_MILITARY_ACADEMY = building_type.BUILDING_MILITARY_ACADEMY;
import BUILDING_BARRACKS = building_type.BUILDING_BARRACKS;


// 定义常量
const INFINITE = 10000;

// 记录塔哨请求的数量
let tower_sentry_request = 0;

// 获取可用于武器的兵营
export function building_get_barracks_for_weapon(resource: number, road_network_id: number, dst: MapPoint): number {
    // 检查资源是否为武器
    if (resource !== RESOURCE_WEAPONS) {
        return 0;
    }
    // 检查武器资源是否已储备
    if (city_resource_is_stockpiled(RESOURCE_WEAPONS)) {
        return 0;
    }
    // 检查是否有活动的兵营
    if (building_count_active(BUILDING_BARRACKS) <= 0) {
        return 0;
    }
    const b = building_get(city_buildings_get_barracks());
    // 检查兵营的存储量和军团的存在
    if (b.loads_stored < 5 && city_military_has_legionary_legions()) {
        // 检查是否有道路通行权限
        if (map_has_road_access(b.x, b.y, b.size, dst) && b.road_network_id === road_network_id) {
            return b.id;
        }
    }
    return 0;
}

// 在兵营中添加武器
export function building_barracks_add_weapon(barracks: Building): void {
    if (barracks.id > 0) {
        barracks.loads_stored++;
    }
}

// 获取最近需要士兵的军团
export function get_closest_legion_needing_soldiers(barracks: Building): number {
    let recruit_type = LEGION_RECRUIT_NONE;
    let min_formation_id = 0;
    let min_distance = INFINITE;

    for (let i = 1; i < MAX_FORMATIONS; i++) {
        const m = formation_get(i);
        if (!m.in_use || !m.is_legion) {
            continue;
        }
        if (m.in_distant_battle || m.legion_recruit_type === LEGION_RECRUIT_NONE) {
            continue;
        }
        if (m.legion_recruit_type === LEGION_RECRUIT_LEGIONARY && barracks.loads_stored <= 0) {
            continue;
        }
        const fort = building_get(m.building_id);
        const dist = calc_maximum_distance(barracks.x, barracks.y, fort.x, fort.y);
        if (m.legion_recruit_type > recruit_type || (m.legion_recruit_type === recruit_type && dist < min_distance)) {
            recruit_type = m.legion_recruit_type;
            min_formation_id = m.id;
            min_distance = dist;
        }
    }
    return min_formation_id;
}

// 获取最近的军事学院
export function get_closest_military_academy(fort: Building): number {
    let min_building_id = 0;
    let min_distance = INFINITE;

    for (let i = 1; i < MAX_BUILDINGS; i++) {
        const b = building_get(i);
        if (b.state === BUILDING_STATE_IN_USE && b.type === BUILDING_MILITARY_ACADEMY &&
            b.num_workers >= model_get_building(BUILDING_MILITARY_ACADEMY).laborers) {
            const dist = calc_maximum_distance(fort.x, fort.y, b.x, b.y);
            if (dist < min_distance) {
                min_distance = dist;
                min_building_id = i;
            }
        }
    }
    return min_building_id;
}

// 在兵营中创建士兵
export function building_barracks_create_soldier(barracks: Building, x: number, y: number): number {
    const formation_id = get_closest_legion_needing_soldiers(barracks);
    if (formation_id > 0) {
        const m = formation_get(formation_id);
        const f = figure_create(m.figure_type, x, y, DIR_0_TOP);
        f.formation_id = formation_id;
        f.formation_at_rest = 1;

        // 如果是军团士兵，减少兵营存储的武器
        if (m.figure_type === FIGURE_FORT_LEGIONARY) {
            if (barracks.loads_stored > 0) {
                barracks.loads_stored--;
            }
        }

        const academy_id = get_closest_military_academy(building_get(m.building_id));
        if (academy_id) {
            const road: MapPoint = {};
            const academy = building_get(academy_id);
            if (map_has_road_access(academy.x, academy.y, academy.size, road)) {
                f.action_state = FIGURE_ACTION_85_SOLDIER_GOING_TO_MILITARY_ACADEMY;
                f.destination_x = road.x;
                f.destination_y = road.y;
                f.destination_grid_offset = map_grid_offset(f.destination_x, f.destination_y);
            } else {
                f.action_state = FIGURE_ACTION_81_SOLDIER_GOING_TO_FORT;
            }
        } else {
            f.action_state = FIGURE_ACTION_81_SOLDIER_GOING_TO_FORT;
        }
    }
    formation_calculate_figures();
    return formation_id ? 1 : 0;
}

// 在兵营中创建塔哨
export function building_barracks_create_tower_sentry(barracks: Building, x: number, y: number): number {
    if (tower_sentry_request <= 0) {
        return 0;
    }
    let tower: Building | null = null;

    for (let i = 1; i < MAX_BUILDINGS; i++) {
        const b = building_get(i);
        if (b.state === BUILDING_STATE_IN_USE && b.type === BUILDING_TOWER && b.num_workers > 0 &&
            !b.figure_id && b.road_network_id === barracks.road_network_id) {
            tower = b;
            break;
        }
    }
    if (!tower) {
        return 0;
    }
    const f = figure_create(FIGURE_TOWER_SENTRY, x, y, DIR_0_TOP);
    f.action_state = FIGURE_ACTION_174_TOWER_SENTRY_GOING_TO_TOWER;
    const road: MapPoint = {};
    if (map_has_road_access(tower.x, tower.y, tower.size, road)) {
        f.destination_x = road.x;
        f.destination_y = road.y;
    } else {
        f.state = FIGURE_STATE_DEAD;
    }
    tower.figure_id = f.id;
    f.building_id = tower.id;
    return 1;
}

// 请求创建塔哨
export function building_barracks_request_tower_sentry(): void {
    tower_sentry_request = 2;
}

// 递减塔哨请求
export function building_barracks_decay_tower_sentry_request(): void {
    if (tower_sentry_request > 0) {
        tower_sentry_request--;
    }
}

// 检查是否有塔哨请求
export function building_barracks_has_tower_sentry_request(): number {
    return tower_sentry_request;
}

// 保存兵营状态
export function building_barracks_save_state(buf: Buffer): void {
    buffer_write_i32(buf, tower_sentry_request);
}

// 加载兵营状态
export function building_barracks_load_state(buf: Buffer): void {
    tower_sentry_request = buffer_read_i32(buf);
}