import { building, building_get, MAX_BUILDINGS } from 'building/building';
import { building_state, building_type } from 'building/type';
import { city_buildings_main_native_meeting_center } from 'city/buildings';
import { city_figures_soldiers } from 'city/figures';
import { city_god_spirit_of_mars_mark_used, city_god_spirit_of_mars_power } from 'city/gods';
import { city_message_post, city_message_type } from 'city/message';
import { calc_maximum_distance } from 'core/calc';
import { random_byte } from 'core/random';
import { figure_action } from 'figure/action';
import { enemy_armies_clear_formations, enemy_armies_clear_ignore_roman_soldiers, enemy_army, enemy_army_calculate_roman_influence, enemy_army_get, enemy_army_get_editable, enemy_army_is_stronger_than_legions, enemy_army_total_enemy_formations } from 'figure/enemy_army';
import { figure, figure_get, figure_is_dead, figure_is_enemy, figure_is_legion, MAX_FIGURES } from 'figure/figure';
import { formation, formation_attack, formation_clear_monthly_counters, formation_decrease_monthly_counters, formation_get, formation_has_low_morale, formation_record_fight, formation_set_destination, formation_set_destination_building, formation_set_home, formation_state, formation_type, MAX_FORMATION_FIGURES, MAX_FORMATIONS } from 'figure/formation';
import { formation_layout_position_x, formation_layout_position_y } from 'figure/formation_layout';
import { figure_route_remove } from 'figure/route';
import { figure_state, figure_type } from 'figure/type';
import { map_figure_at, map_has_figure_at } from 'map/figure';
import { GRID, map_grid_bound, map_grid_get_area, map_grid_is_valid_offset, map_grid_offset } from 'map/grid';
import { map_routing_distance, map_routing_noncitizen_can_travel_over_land, map_routing_noncitizen_can_travel_through_everything } from 'map/routing';
import { map_routing_get_closest_tile_within_range } from 'map/routing_path';
import { map_soldier_strength_get, map_soldier_strength_get_max } from 'map/soldier_strength';
import { map_terrain_is, terrain } from 'map/terrain';
import { Ref } from '../../ext/crt';
import FIGURE_FORT_JAVELIN = figure_type.FIGURE_FORT_JAVELIN;
import FIGURE_ENEMY54_GLADIATOR = figure_type.FIGURE_ENEMY54_GLADIATOR;
import FIGURE_STATE_ALIVE = figure_state.FIGURE_STATE_ALIVE;
import FORMATION_ATTACK_RANDOM = formation_attack.FORMATION_ATTACK_RANDOM;
import FORMATION_ENEMY_MOB = formation_type.FORMATION_ENEMY_MOB;
import FORMATION_ENEMY12 = formation_type.FORMATION_ENEMY12;
import BUILDING_HOUSE_SMALL_TENT = building_type.BUILDING_HOUSE_SMALL_TENT;
import BUILDING_HOUSE_LARGE_TENT = building_type.BUILDING_HOUSE_LARGE_TENT;
import BUILDING_HOUSE_SMALL_SHACK = building_type.BUILDING_HOUSE_SMALL_SHACK;
import BUILDING_HOUSE_LARGE_SHACK = building_type.BUILDING_HOUSE_LARGE_SHACK;
import BUILDING_HOUSE_SMALL_HOVEL = building_type.BUILDING_HOUSE_SMALL_HOVEL;
import BUILDING_HOUSE_LARGE_HOVEL = building_type.BUILDING_HOUSE_LARGE_HOVEL;
import BUILDING_HOUSE_SMALL_CASA = building_type.BUILDING_HOUSE_SMALL_CASA;
import BUILDING_HOUSE_LARGE_CASA = building_type.BUILDING_HOUSE_LARGE_CASA;
import BUILDING_HOUSE_SMALL_INSULA = building_type.BUILDING_HOUSE_SMALL_INSULA;
import BUILDING_HOUSE_MEDIUM_INSULA = building_type.BUILDING_HOUSE_MEDIUM_INSULA;
import BUILDING_HOUSE_LARGE_INSULA = building_type.BUILDING_HOUSE_LARGE_INSULA;
import BUILDING_HOUSE_GRAND_INSULA = building_type.BUILDING_HOUSE_GRAND_INSULA;
import BUILDING_HOUSE_SMALL_VILLA = building_type.BUILDING_HOUSE_SMALL_VILLA;
import BUILDING_HOUSE_MEDIUM_VILLA = building_type.BUILDING_HOUSE_MEDIUM_VILLA;
import BUILDING_HOUSE_LARGE_VILLA = building_type.BUILDING_HOUSE_LARGE_VILLA;
import BUILDING_HOUSE_GRAND_VILLA = building_type.BUILDING_HOUSE_GRAND_VILLA;
import BUILDING_HOUSE_SMALL_PALACE = building_type.BUILDING_HOUSE_SMALL_PALACE;
import BUILDING_HOUSE_MEDIUM_PALACE = building_type.BUILDING_HOUSE_MEDIUM_PALACE;
import BUILDING_HOUSE_LARGE_PALACE = building_type.BUILDING_HOUSE_LARGE_PALACE;
import BUILDING_HOUSE_LUXURY_PALACE = building_type.BUILDING_HOUSE_LUXURY_PALACE;
import BUILDING_PREFECTURE = building_type.BUILDING_PREFECTURE;
import BUILDING_FORT = building_type.BUILDING_FORT;
import BUILDING_MARKET = building_type.BUILDING_MARKET;
import BUILDING_GRANARY = building_type.BUILDING_GRANARY;
import BUILDING_WAREHOUSE = building_type.BUILDING_WAREHOUSE;
import BUILDING_GOVERNORS_HOUSE = building_type.BUILDING_GOVERNORS_HOUSE;
import BUILDING_GOVERNORS_VILLA = building_type.BUILDING_GOVERNORS_VILLA;
import BUILDING_GOVERNORS_PALACE = building_type.BUILDING_GOVERNORS_PALACE;
import BUILDING_MISSION_POST = building_type.BUILDING_MISSION_POST;
import BUILDING_SENATE_1_UNUSED = building_type.BUILDING_SENATE_1_UNUSED;
import BUILDING_SENATE = building_type.BUILDING_SENATE;
import BUILDING_FORUM = building_type.BUILDING_FORUM;
import BUILDING_FORUM_2_UNUSED = building_type.BUILDING_FORUM_2_UNUSED;
import BUILDING_NATIVE_HUT = building_type.BUILDING_NATIVE_HUT;
import BUILDING_NATIVE_MEETING = building_type.BUILDING_NATIVE_MEETING;
import BUILDING_NATIVE_CROPS = building_type.BUILDING_NATIVE_CROPS;
import BUILDING_MILITARY_ACADEMY = building_type.BUILDING_MILITARY_ACADEMY;
import BUILDING_WHEAT_FARM = building_type.BUILDING_WHEAT_FARM;
import BUILDING_VEGETABLE_FARM = building_type.BUILDING_VEGETABLE_FARM;
import BUILDING_FRUIT_FARM = building_type.BUILDING_FRUIT_FARM;
import BUILDING_OLIVE_FARM = building_type.BUILDING_OLIVE_FARM;
import BUILDING_VINES_FARM = building_type.BUILDING_VINES_FARM;
import BUILDING_PIG_FARM = building_type.BUILDING_PIG_FARM;
import BUILDING_STATE_IN_USE = building_state.BUILDING_STATE_IN_USE;
import MESSAGE_SPIRIT_OF_MARS = city_message_type.MESSAGE_SPIRIT_OF_MARS;
import FIGURE_ACTION_148_FLEEING = figure_action.FIGURE_ACTION_148_FLEEING;
import FIGURE_ACTION_149_CORPSE = figure_action.FIGURE_ACTION_149_CORPSE;
import FIGURE_ACTION_150_ATTACK = figure_action.FIGURE_ACTION_150_ATTACK;
import FIGURE_ACTION_151_ENEMY_INITIAL = figure_action.FIGURE_ACTION_151_ENEMY_INITIAL;
import GRID_SIZE = GRID.GRID_SIZE;
import TERRAIN_WALL = terrain.TERRAIN_WALL;
import TERRAIN_GATEHOUSE = terrain.TERRAIN_GATEHOUSE;
import TERRAIN_IMPASSABLE_ENEMY = terrain.TERRAIN_IMPASSABLE_ENEMY;
let ENEMY_ATTACK_PRIORITY: number[][] = [
    [
        BUILDING_GRANARY, BUILDING_WAREHOUSE, BUILDING_MARKET,
        BUILDING_WHEAT_FARM, BUILDING_VEGETABLE_FARM, BUILDING_FRUIT_FARM,
        BUILDING_OLIVE_FARM, BUILDING_VINES_FARM, BUILDING_PIG_FARM, 0
    ],
    [
        BUILDING_SENATE, BUILDING_SENATE_1_UNUSED,
        BUILDING_FORUM_2_UNUSED, BUILDING_FORUM, 0
    ],
    [
        BUILDING_GOVERNORS_PALACE, BUILDING_GOVERNORS_VILLA, BUILDING_GOVERNORS_HOUSE,
        BUILDING_HOUSE_LUXURY_PALACE, BUILDING_HOUSE_LARGE_PALACE,
        BUILDING_HOUSE_MEDIUM_PALACE, BUILDING_HOUSE_SMALL_PALACE,
        BUILDING_HOUSE_GRAND_VILLA, BUILDING_HOUSE_LARGE_VILLA,
        BUILDING_HOUSE_MEDIUM_VILLA, BUILDING_HOUSE_SMALL_VILLA,
        BUILDING_HOUSE_GRAND_INSULA, BUILDING_HOUSE_LARGE_INSULA,
        BUILDING_HOUSE_MEDIUM_INSULA, BUILDING_HOUSE_SMALL_INSULA,
        BUILDING_HOUSE_LARGE_CASA, BUILDING_HOUSE_SMALL_CASA,
        BUILDING_HOUSE_LARGE_HOVEL, BUILDING_HOUSE_SMALL_HOVEL,
        BUILDING_HOUSE_LARGE_SHACK, BUILDING_HOUSE_SMALL_SHACK,
        BUILDING_HOUSE_LARGE_TENT, BUILDING_HOUSE_SMALL_TENT, 0
    ],
    [
        BUILDING_MILITARY_ACADEMY, BUILDING_PREFECTURE, 0
    ]
];
let RIOTER_ATTACK_PRIORITY: number[] = [
    79, 78, 77, 29, 28, 27, 26, 25, 85, 84, 32, 33, 98, 65, 66, 67,
    68, 69, 87, 86, 30, 31, 47, 52, 46, 48, 53, 51, 24, 23, 22, 21,
    20, 46, 48, 114, 113, 112, 111, 110, 71, 72, 70, 74, 75, 76, 60, 61,
    62, 63, 64, 34, 36, 37, 35, 94, 19, 18, 17, 16, 15, 49, 106, 107,
    109, 108, 90, 100, 101, 102, 103, 104, 105, 55, 81, 91, 92, 14, 13, 12, 11, 10, 0
];
let LAYOUT_ORIENTATION_OFFSETS: number[][][] = [
    [
        [0, 0, -3, 0, 3, 0, -8, 0, 8, 0, -3, 8, 3, 8, 0],
        [0, 0, 0, -3, 0, 3, 0, -8, 0, 8, 8, -3, 8, 3, 0],
        [0, 0, -3, 0, 3, 0, -8, 0, 8, 0, -3, -8, 3, -8, 0],
        [0, 0, 0, -3, 0, 3, 0, -8, 0, 8, -8, -3, -8, 3, 0]
    ],
    [
        [0, 0, -6, 0, 6, 0, -6, 2, 6, 2, -2, 4, 4, 6, 0],
        [0, 0, 0, -6, 0, 6, 2, -6, 2, 6, 4, -2, 6, 4, 0],
        [0, 0, -6, 0, 6, 0, -6, -2, 6, -2, -4, -6, 4, -6, 0],
        [0, 0, 0, -6, 0, 6, -2, -6, -2, 6, -6, -4, -6, 4, 0]
    ],
    [
        [0, 0, -6, 0, 6, 0, -6, 2, 6, 2, -2, 4, 4, 6, 0],
        [0, 0, 0, -6, 0, 6, 2, -6, 2, 6, 4, -2, 6, 4, 0],
        [0, 0, -6, 0, 6, 0, -6, -2, 6, -2, -4, -6, 4, -6, 0],
        [0, 0, 0, -6, 0, 6, -2, -6, -2, 6, -6, -4, -6, 4, 0]
    ],
    [
        [0, 0, -6, 0, 6, 0, -6, 2, 6, 2, -2, 4, 4, 6, 0],
        [0, 0, 0, -6, 0, 6, 2, -6, 2, 6, 4, -2, 6, 4, 0],
        [0, 0, -6, 0, 6, 0, -6, -2, 6, -2, -4, -6, 4, -6, 0],
        [0, 0, 0, -6, 0, 6, -2, -6, -2, 6, -6, -4, -6, 4, 0]
    ],
    [
        [0, 0, -6, 0, 6, 0, -6, 2, 6, 2, -2, 4, 4, 6, 0],
        [0, 0, 0, -6, 0, 6, 2, -6, 2, 6, 4, -2, 6, 4, 0],
        [0, 0, -6, 0, 6, 0, -6, -2, 6, -2, -4, -6, 4, -6, 0],
        [0, 0, 0, -6, 0, 6, -2, -6, -2, 6, -6, -4, -6, 4, 0]
    ],
    [
        [0, 0, -3, 0, 3, 0, -8, 0, 8, 0, -3, 8, 3, 8, 0],
        [0, 0, 0, -3, 0, 3, 0, -8, 0, 8, 8, -3, 8, 3, 0],
        [0, 0, -3, 0, 3, 0, -8, 0, 8, 0, -3, -8, 3, -8, 0],
        [0, 0, 0, -3, 0, 3, 0, -8, 0, 8, -8, -3, -8, 3, 0]
    ],
    [
        [0, 0, -3, 0, 3, 0, -8, 0, 8, 0, -3, 8, 3, 8, 0],
        [0, 0, 0, -3, 0, 3, 0, -8, 0, 8, 8, -3, 8, 3, 0],
        [0, 0, -3, 0, 3, 0, -8, 0, 8, 0, -3, -8, 3, -8, 0],
        [0, 0, 0, -3, 0, 3, 0, -8, 0, 8, -8, -3, -8, 3, 0]
    ],
    [
        [0, 0, -3, 0, 3, 0, -8, 0, 8, 0, -3, 8, 3, 8, 0],
        [0, 0, 0, -3, 0, 3, 0, -8, 0, 8, 8, -3, 8, 3, 0],
        [0, 0, -3, 0, 3, 0, -8, 0, 8, 0, -3, -8, 3, -8, 0],
        [0, 0, 0, -3, 0, 3, 0, -8, 0, 8, -8, -3, -8, 3, 0]
    ],
    [
        [0, 0, -3, 0, 3, 0, -8, 0, 8, 0, -3, 8, 3, 8, 0],
        [0, 0, 0, -3, 0, 3, 0, -8, 0, 8, 8, -3, 8, 3, 0],
        [0, 0, -3, 0, 3, 0, -8, 0, 8, 0, -3, -8, 3, -8, 0],
        [0, 0, 0, -3, 0, 3, 0, -8, 0, 8, -8, -3, -8, 3, 0]
    ],
    [
        [0, 0, -3, 0, 3, 0, -8, 0, 8, 0, -3, 8, 3, 8, 0],
        [0, 0, 0, -3, 0, 3, 0, -8, 0, 8, 8, -3, 8, 3, 0],
        [0, 0, -3, 0, 3, 0, -8, 0, 8, 0, -3, -8, 3, -8, 0],
        [0, 0, 0, -3, 0, 3, 0, -8, 0, 8, -8, -3, -8, 3, 0]
    ],
    [
        [0, 0, -4, 0, 4, 0, -12, 0, 12, 0, -4, 12, 4, 12, 0],
        [0, 0, 0, -4, 0, 4, 0, -12, 0, 12, 12, -4, 12, 4, 0],
        [0, 0, -4, 0, 4, 0, -12, 0, 12, 0, -4, -12, 4, -12, 0],
        [0, 0, 0, -4, 0, 4, 0, -12, 0, 12, -12, -4, -12, 4, 0]
    ],
    [
        [0, 0, -3, 0, 3, 0, -8, 0, 8, 0, -3, 8, 3, 8, 0],
        [0, 0, 0, -3, 0, 3, 0, -8, 0, 8, 8, -3, 8, 3, 0],
        [0, 0, -3, 0, 3, 0, -8, 0, 8, 0, -3, -8, 3, -8, 0],
        [0, 0, 0, -3, 0, 3, 0, -8, 0, 8, -8, -3, -8, 3, 0]
    ]
];
export function formation_rioter_get_target_building(x_tile: Ref<number>, y_tile: Ref<number>) {
    let best_type_index: number = 100;
    let best_building: building = null;
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state != BUILDING_STATE_IN_USE) {
            continue
        }
        for (let t: number = 0; t < 100 && t <= best_type_index && RIOTER_ATTACK_PRIORITY[t]; t++) {
            if (b.type == RIOTER_ATTACK_PRIORITY[t]) {
                if (t < best_type_index) {
                    best_type_index = t;
                    best_building = b;
                }
                break
            }
        }
    }
    if (!best_building) {
        return 0;
    }
    if (best_building.type == BUILDING_WAREHOUSE) {
        x_tile.v = best_building.x + 1;
        y_tile.v = best_building.y;
        return best_building.id + 1;
    } else {
        x_tile.v = best_building.x;
        y_tile.v = best_building.y;
        return best_building.id;
    }
}
function set_enemy_target_building(m: formation) {
    let attack: number = m.attack_type;
    if (attack == FORMATION_ATTACK_RANDOM) {
        attack = random_byte() & 3;
    }
    let best_type_index: number = 100;
    let best_building: building = null;
    let min_distance: number = 10000;
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state != BUILDING_STATE_IN_USE || map_soldier_strength_get(b.grid_offset)) {
            continue
        }
        for (let n: number = 0; n < 100 && n <= best_type_index && ENEMY_ATTACK_PRIORITY[attack][n]; n++) {
            if (b.type == ENEMY_ATTACK_PRIORITY[attack][n]) {
                let distance: number = calc_maximum_distance(m.x_home, m.y_home, b.x, b.y);
                if (n < best_type_index) {
                    best_type_index = n;
                    best_building = b;
                    min_distance = distance;
                } else if (distance < min_distance) {
                    best_building = b;
                    min_distance = distance;
                }
                break
            }
        }
    }
    if (!best_building) {
        for (let i: number = 1; i < MAX_BUILDINGS; i++) {
            let b: building = building_get(i);
            if (b.state != BUILDING_STATE_IN_USE || map_soldier_strength_get(b.grid_offset)) {
                continue
            }
            for (let n: number = 0; n < 100 && n <= best_type_index && RIOTER_ATTACK_PRIORITY[n]; n++) {
                if (b.type == RIOTER_ATTACK_PRIORITY[n]) {
                    let distance: number = calc_maximum_distance(m.x_home, m.y_home, b.x, b.y);
                    if (n < best_type_index) {
                        best_type_index = n;
                        best_building = b;
                        min_distance = distance;
                    } else if (distance < min_distance) {
                        best_building = b;
                        min_distance = distance;
                    }
                    break
                }
            }
        }
    }
    if (best_building) {
        if (best_building.type == BUILDING_WAREHOUSE) {
            formation_set_destination_building(m, best_building.x + 1, best_building.y, best_building.id + 1);
        } else {
            formation_set_destination_building(m, best_building.x, best_building.y, best_building.id);
        }
    }
}
function set_native_target_building(m: formation) {
    let meeting_x_ref: Ref<number> = new Ref(0);
    let meeting_y_ref: Ref<number> = new Ref(0);
    city_buildings_main_native_meeting_center(meeting_x_ref, meeting_y_ref);
    let meeting_x: number = meeting_x_ref.v;
    let meeting_y: number = meeting_y_ref.v;
    let min_building: building = null;
    let min_distance: number = 10000;
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state != BUILDING_STATE_IN_USE) {
            continue
        }
        switch (b.type) {
            case BUILDING_MISSION_POST:
            case BUILDING_NATIVE_HUT:
            case BUILDING_NATIVE_CROPS:
            case BUILDING_NATIVE_MEETING:
            case BUILDING_WAREHOUSE:
            case BUILDING_FORT:
                break
            default: {
                let distance: number = calc_maximum_distance(meeting_x, meeting_y, b.x, b.y);
                if (distance < min_distance) {
                    min_building = b;
                    min_distance = distance;
                }
            }
        }
    }
    if (min_building) {
        formation_set_destination_building(m, min_building.x, min_building.y, min_building.id);
    }
}
function approach_target(m: formation) {
    if (map_routing_noncitizen_can_travel_over_land(m.x_home, m.y_home,
        m.destination_x, m.destination_y, m.destination_building_id, 400) ||
        map_routing_noncitizen_can_travel_through_everything(m.x_home, m.y_home,
            m.destination_x, m.destination_y)) {
        let x_tile_ref = new Ref(0);
        let y_tile_ref = new Ref(0);
        if (map_routing_get_closest_tile_within_range(m.x_home, m.y_home,
            m.destination_x, m.destination_y, 8, 20, x_tile_ref, y_tile_ref)) {
            let x_tile: number = x_tile_ref.v;
            let y_tile: number = y_tile_ref.v;
            formation_set_destination(m, x_tile, y_tile);
        }
    }
}
function set_figures_to_initial(m: formation) {
    for (let i: number = 0; i < MAX_FORMATION_FIGURES; i++) {
        if (m.figures[i] > 0) {
            let f: figure = figure_get(m.figures[i]);
            if (f.action_state != FIGURE_ACTION_149_CORPSE &&
                f.action_state != FIGURE_ACTION_150_ATTACK) {
                f.action_state = FIGURE_ACTION_151_ENEMY_INITIAL;
                f.wait_ticks = 0;
            }
        }
    }
}
export function formation_enemy_move_formation_to(m: formation, x: number, y: number, x_tile: Ref<number>, y_tile: Ref<number>) {
    let base_offset: number = map_grid_offset(
        formation_layout_position_x(m.layout, 0),
        formation_layout_position_y(m.layout, 0));
    let figure_offsets: number[];
    figure_offsets[0] = 0;
    for (let i: number = 1; i < m.num_figures; i++) {
        figure_offsets[i] = map_grid_offset(
            formation_layout_position_x(m.layout, i),
            formation_layout_position_y(m.layout, i)) - base_offset;
    }
    map_routing_noncitizen_can_travel_over_land(x, y, -1, -1, 0, 600);
    for (let r: number = 0; r <= 10; r++) {
        let x_min: number
        let y_min: number
        let x_max: number
        let y_max: number;
        map_grid_get_area(x, y, 1, r, x_min, y_min, x_max, y_max);
        for (let yy: number = y_min; yy <= y_max; yy++) {
            for (let xx: number = x_min; xx <= x_max; xx++) {
                let can_move: number = 1;
                for (let fig: number = 0; fig < m.num_figures; fig++) {
                    let grid_offset: number = map_grid_offset(xx, yy) + figure_offsets[fig];
                    if (!map_grid_is_valid_offset(grid_offset)) {
                        can_move = 0;
                        break
                    }
                    if (map_terrain_is(grid_offset, TERRAIN_IMPASSABLE_ENEMY)) {
                        can_move = 0;
                        break
                    }
                    if (map_routing_distance(grid_offset) <= 0) {
                        can_move = 0;
                        break
                    }
                    if (map_has_figure_at(grid_offset) &&
                        figure_get(map_figure_at(grid_offset)).formation_id != m.id) {
                        can_move = 0;
                        break
                    }
                }
                if (can_move) {
                    x_tile.v = xx;
                    y_tile.v = yy;
                    return 1;
                }
            }
        }
    }
    return 0;
}
function mars_kill_enemies() {
    let to_kill: number = city_god_spirit_of_mars_power();
    if (to_kill <= 0) {
        return;
    }
    let grid_offset: number = 0;
    for (let i: number = 1; i < MAX_FIGURES && to_kill > 0; i++) {
        let f: figure = figure_get(i);
        if (f.state != FIGURE_STATE_ALIVE) {
            continue
        }
        if (figure_is_enemy(f) && f.type != FIGURE_ENEMY54_GLADIATOR) {
            f.action_state = FIGURE_ACTION_149_CORPSE;
            to_kill--;
            if (!grid_offset) {
                grid_offset = f.grid_offset;
            }
        }
    }
    city_god_spirit_of_mars_mark_used();
    city_message_post(1, MESSAGE_SPIRIT_OF_MARS, 0, grid_offset);
}
function update_enemy_movement(m: formation, roman_distance: number) {
    let army: enemy_army = enemy_army_get(m.invasion_id);
    let state: formation_state = m.enemy_state;
    let regroup: number = 0;
    let halt: number = 0;
    let pursue_target: number = 0;
    let advance: number = 0;
    let target_formation_id: number = 0;
    if (m.missile_fired) {
        halt = 1;
    } else if (m.missile_attack_timeout) {
        pursue_target = 1;
        target_formation_id = m.missile_attack_formation_id;
    } else if (m.wait_ticks < 32) {
        regroup = 1;
        state.duration_advance = 4;
    } else if (army.ignore_roman_soldiers) {
        halt = 0;
        regroup = 0;
        advance = 1;
    } else {
        let halt_duration: number
        let advance_duration: number
        let regroup_duration: number;
        if (army.layout == FORMATION_ENEMY_MOB || army.layout == FORMATION_ENEMY12) {
            switch (m.enemy_legion_index) {
                case 0:
                case 1:
                    regroup_duration = 2;
                    advance_duration = 4;
                    halt_duration = 2;
                    break
                case 2:
                case 3:
                    regroup_duration = 2;
                    advance_duration = 5;
                    halt_duration = 3;
                    break
                default:
                    regroup_duration = 2
                    advance_duration = 6;
                    halt_duration = 4;
                    break
            }
            if (!roman_distance) {
                advance_duration += 6
                halt_duration--;
                regroup_duration--;
            }
        } else {
            if (roman_distance) {
                regroup_duration = 6;
                advance_duration = 4;
                halt_duration = 2;
            } else {
                regroup_duration = 1;
                advance_duration = 12;
                halt_duration = 1;
            }
        }
        if (state.duration_halt) {
            state.duration_advance = 0;
            state.duration_regroup = 0;
            halt = 1;
            state.duration_halt--;
            if (state.duration_halt <= 0) {
                state.duration_regroup = regroup_duration;
                set_figures_to_initial(m);
                regroup = 0;
                halt = 1;
            }
        } else if (state.duration_regroup) {
            state.duration_advance = 0;
            state.duration_halt = 0;
            regroup = 1;
            state.duration_regroup--;
            if (state.duration_regroup <= 0) {
                state.duration_advance = advance_duration;
                set_figures_to_initial(m);
                advance = 1;
                regroup = 0;
            }
        } else {
            state.duration_regroup = 0;
            state.duration_halt = 0;
            advance = 1;
            state.duration_advance--;
            if (state.duration_advance <= 0) {
                state.duration_halt = halt_duration;
                set_figures_to_initial(m);
                halt = 1;
                advance = 0;
            }
        }
    }
    if (m.wait_ticks > 32) {
        mars_kill_enemies();
    }
    if (halt) {
        formation_set_destination(m, m.x_home, m.y_home);
    } else if (pursue_target) {
        if (target_formation_id > 0) {
            let target: formation = formation_get(target_formation_id);
            if (target.num_figures > 0) {
                formation_set_destination(m, target.x_home, target.y_home);
            }
        } else {
            formation_set_destination(m, army.destination_x, army.destination_y);
        }
    } else if (regroup) {
        let layout: number = army.layout;
        let x_offset: number = LAYOUT_ORIENTATION_OFFSETS[layout][m.orientation / 2][2 * m.enemy_legion_index] +
            army.home_x;
        let y_offset: number = LAYOUT_ORIENTATION_OFFSETS[layout][m.orientation / 2][2 * m.enemy_legion_index + 1] +
            army.home_y;
        map_grid_bound(x_offset, y_offset);
        let x_tile = new Ref(0);
        let y_tile = new Ref(0);
        if (formation_enemy_move_formation_to(m, x_offset, y_offset, x_tile, y_tile)) {
            formation_set_destination(m, x_tile.v, y_tile.v);
        }
    } else if (advance) {
        let layout: number = army.layout;
        let x_offset: number = LAYOUT_ORIENTATION_OFFSETS[layout][m.orientation / 2][2 * m.enemy_legion_index] +
            army.destination_x;
        let y_offset: number = LAYOUT_ORIENTATION_OFFSETS[layout][m.orientation / 2][2 * m.enemy_legion_index + 1] +
            army.destination_y;
        map_grid_bound(x_offset, y_offset);
        let x_tile = new Ref(0);
        let y_tile = new Ref(0);
        if (formation_enemy_move_formation_to(m, x_offset, y_offset, x_tile, y_tile)) {
            formation_set_destination(m, x_tile.v, y_tile.v);
        }
    }
}
function update_enemy_formation(m: formation, roman_distance: Ref<number>) {
    let army: enemy_army = enemy_army_get_editable(m.invasion_id);
    if (enemy_army_is_stronger_than_legions()) {
        if (m.figure_type != FIGURE_FORT_JAVELIN) {
            army.ignore_roman_soldiers = 1;
        }
    }
    formation_decrease_monthly_counters(m);
    if (city_figures_soldiers() <= 0) {
        formation_clear_monthly_counters(m);
    }
    for (let n: number = 0; n < MAX_FORMATION_FIGURES; n++) {
        let f: figure = figure_get(m.figures[n]);
        if (f.action_state == FIGURE_ACTION_150_ATTACK) {
            let opponent: figure = figure_get(f.opponent_id);
            if (!figure_is_dead(opponent) && figure_is_legion(opponent)) {
                formation_record_fight(m);
            }
        }
    }
    if (formation_has_low_morale(m)) {
        for (let n: number = 0; n < MAX_FORMATION_FIGURES; n++) {
            let f: figure = figure_get(m.figures[n]);
            if (f.action_state != FIGURE_ACTION_150_ATTACK &&
                f.action_state != FIGURE_ACTION_149_CORPSE &&
                f.action_state != FIGURE_ACTION_148_FLEEING) {
                f.action_state = FIGURE_ACTION_148_FLEEING;
                figure_route_remove(f);
            }
        }
        return;
    }
    if (m.figures[0]) {
        let f: figure = figure_get(m.figures[0]);
        if (f.state == FIGURE_STATE_ALIVE) {
            formation_set_home(m, f.x, f.y);
        }
    }
    if (!army.formation_id) {
        army.formation_id = m.id;
        army.home_x = m.x_home;
        army.home_y = m.y_home;
        army.layout = m.layout;
        roman_distance.v = 0;
        map_routing_noncitizen_can_travel_over_land(m.x_home, m.y_home, -1, -1, 100000, 300);
        let x_tile = new Ref(0);
        let y_tile = new Ref(0);
        if (map_soldier_strength_get_max(m.x_home, m.y_home, 16, x_tile, y_tile)) {
            roman_distance.v = 1;
        } else if (map_soldier_strength_get_max(m.x_home, m.y_home, 32, x_tile, y_tile)) {
            roman_distance.v = 2;
        }
        if (army.ignore_roman_soldiers) {
            roman_distance.v = 0;
        }
        if (roman_distance.v == 1) {
            army.destination_x = x_tile.v;
            army.destination_y = y_tile.v;
            army.destination_building_id = 0;
        } else {
            set_enemy_target_building(m);
            approach_target(m);
            army.destination_x = m.destination_x;
            army.destination_y = m.destination_y;
            army.destination_building_id = m.destination_building_id;
        }
    }
    m.enemy_legion_index = army.num_legions++;
    m.wait_ticks++;
    formation_set_destination_building(m,
        army.destination_x, army.destination_y, army.destination_building_id
    );
    update_enemy_movement(m, roman_distance.v);
}
export function formation_enemy_update() {
    if (enemy_army_total_enemy_formations() <= 0) {
        enemy_armies_clear_ignore_roman_soldiers();
    } else {
        enemy_army_calculate_roman_influence();
        enemy_armies_clear_formations();
        let roman_distance = new Ref(0);
        for (let i: number = 1; i < MAX_FORMATIONS; i++) {
            let m: formation = formation_get(i);
            if (m.in_use && !m.is_herd && !m.is_legion) {
                update_enemy_formation(m, roman_distance);
            }
        }
    }
    set_native_target_building(formation_get(0));
}
