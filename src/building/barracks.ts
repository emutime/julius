export const INFINITE = 10000;
import { building, building_get, MAX_BUILDINGS } from 'building/building';
import { building_count_active } from 'building/count';
import { model_get_building } from 'building/model';
import { building_state, building_type } from 'building/type';
import { city_buildings_get_barracks } from 'city/buildings';
import { city_military_has_legionary_legions } from 'city/military';
import { city_resource_is_stockpiled } from 'city/resource';
import { buffer, buffer_read_i32, buffer_write_i32 } from 'core/buffer';
import { calc_maximum_distance } from 'core/calc';
import { direction_type } from 'core/direction';
import { figure_action } from 'figure/action';
import { figure, figure_create } from 'figure/figure';
import { formation, formation_calculate_figures, formation_get, legion_recruit, MAX_FORMATIONS } from 'figure/formation';
import { figure_state, figure_type } from 'figure/type';
import { resource_type } from 'game/resource';
import { GRID, map_grid_offset } from 'map/grid';
import { map_point } from 'map/point';
import { map_has_road_access } from 'map/road_access';
import BUILDING_TOWER = building_type.BUILDING_TOWER;
import BUILDING_MILITARY_ACADEMY = building_type.BUILDING_MILITARY_ACADEMY;
import BUILDING_BARRACKS = building_type.BUILDING_BARRACKS;
import BUILDING_STATE_IN_USE = building_state.BUILDING_STATE_IN_USE;;
import RESOURCE_WEAPONS = resource_type.RESOURCE_WEAPONS;
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
import DIR_0_TOP = direction_type.DIR_0_TOP;
import FIGURE_ACTION_81_SOLDIER_GOING_TO_FORT = figure_action.FIGURE_ACTION_81_SOLDIER_GOING_TO_FORT;
import FIGURE_ACTION_85_SOLDIER_GOING_TO_MILITARY_ACADEMY = figure_action.FIGURE_ACTION_85_SOLDIER_GOING_TO_MILITARY_ACADEMY;
import FIGURE_ACTION_174_TOWER_SENTRY_GOING_TO_TOWER = figure_action.FIGURE_ACTION_174_TOWER_SENTRY_GOING_TO_TOWER;
import FIGURE_FORT_LEGIONARY = figure_type.FIGURE_FORT_LEGIONARY;
import FIGURE_TOWER_SENTRY = figure_type.FIGURE_TOWER_SENTRY;
import FIGURE_STATE_DEAD = figure_state.FIGURE_STATE_DEAD;
import LEGION_RECRUIT_NONE = legion_recruit.LEGION_RECRUIT_NONE;
import LEGION_RECRUIT_LEGIONARY = legion_recruit.LEGION_RECRUIT_LEGIONARY;
import GRID_SIZE = GRID.GRID_SIZE;
let tower_sentry_request: number = 0;
export function building_get_barracks_for_weapon(resource: number, road_network_id: number, dst: map_point) {
    if (resource != RESOURCE_WEAPONS) {
        return 0;
    }
    if (city_resource_is_stockpiled(RESOURCE_WEAPONS)) {
        return 0;
    }
    if (building_count_active(BUILDING_BARRACKS) <= 0) {
        return 0;
    }
    let b: building = building_get(city_buildings_get_barracks());
    if (b.loads_stored < 5 && city_military_has_legionary_legions()) {
        if (map_has_road_access(b.x, b.y, b.size, dst) && b.road_network_id == road_network_id) {
            return b.id;
        }
    }
    return 0;
}
export function building_barracks_add_weapon(barracks: building) {
    if (barracks.id > 0) {
        barracks.loads_stored++;
    }
}
function get_closest_legion_needing_soldiers(barracks: building) {
    let recruit_type: number = LEGION_RECRUIT_NONE;
    let min_formation_id: number = 0;
    let min_distance: number = INFINITE;
    for (let i: number = 1; i < MAX_FORMATIONS; i++) {
        let m: formation = formation_get(i);
        if (!m.in_use || !m.is_legion) {
            continue
        }
        if (m.in_distant_battle || m.legion_recruit_type == LEGION_RECRUIT_NONE) {
            continue
        }
        if (m.legion_recruit_type == LEGION_RECRUIT_LEGIONARY && barracks.loads_stored <= 0) {
            continue
        }
        let fort: building = building_get(m.building_id);
        let dist: number = calc_maximum_distance(barracks.x, barracks.y, fort.x, fort.y);
        if (m.legion_recruit_type > recruit_type ||
            (m.legion_recruit_type == recruit_type && dist < min_distance)) {
            recruit_type = m.legion_recruit_type;
            min_formation_id = m.id;
            min_distance = dist;
        }
    }
    return min_formation_id;
}
function get_closest_military_academy(fort: building) {
    let min_building_id: number = 0;
    let min_distance: number = INFINITE;
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state == BUILDING_STATE_IN_USE && b.type == BUILDING_MILITARY_ACADEMY &&
            b.num_workers >= model_get_building(BUILDING_MILITARY_ACADEMY).laborers) {
            let dist: number = calc_maximum_distance(fort.x, fort.y, b.x, b.y);
            if (dist < min_distance) {
                min_distance = dist;
                min_building_id = i;
            }
        }
    }
    return min_building_id;
}
export function building_barracks_create_soldier(barracks: building, x: number, y: number) {
    let formation_id: number = get_closest_legion_needing_soldiers(barracks);
    if (formation_id > 0) {
        let m: formation = formation_get(formation_id);
        let f: figure = figure_create(m.figure_type, x, y, DIR_0_TOP);
        f.formation_id = formation_id;
        f.formation_at_rest = 1;
        if (m.figure_type == FIGURE_FORT_LEGIONARY) {
            if (barracks.loads_stored > 0) {
                barracks.loads_stored--;
            }
        }
        let academy_id: number = get_closest_military_academy(building_get(m.building_id));
        if (academy_id) {
            let road: map_point;
            let academy: building = building_get(academy_id);
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
export function building_barracks_create_tower_sentry(barracks: building, x: number, y: number) {
    if (tower_sentry_request <= 0) {
        return 0;
    }
    let tower: building = null;
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state == BUILDING_STATE_IN_USE && b.type == BUILDING_TOWER && b.num_workers > 0 &&
            !b.figure_id && b.road_network_id == barracks.road_network_id) {
            tower = b;
            break
        }
    }
    if (!tower) {
        return 0;
    }
    let f: figure = figure_create(FIGURE_TOWER_SENTRY, x, y, DIR_0_TOP);
    f.action_state = FIGURE_ACTION_174_TOWER_SENTRY_GOING_TO_TOWER;
    let road: map_point;
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
export function building_barracks_request_tower_sentry() {
    tower_sentry_request = 2;
}
export function building_barracks_decay_tower_sentry_request() {
    if (tower_sentry_request > 0) {
        tower_sentry_request--;
    }
}
export function building_barracks_has_tower_sentry_request() {
    return tower_sentry_request;
}
export function building_barracks_save_state(buf: buffer) {
    buffer_write_i32(buf, tower_sentry_request);
}
export function building_barracks_load_state(buf: buffer) {
    tower_sentry_request = buffer_read_i32(buf);
}
