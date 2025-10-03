import { MAX_BUILDINGS } from 'building/building';
import { building_type } from 'building/type';
import BUILDING_HIPPODROME = building_type.BUILDING_HIPPODROME;
import BUILDING_WAREHOUSE = building_type.BUILDING_WAREHOUSE;
import BUILDING_WAREHOUSE_SPACE = building_type.BUILDING_WAREHOUSE_SPACE;
import BUILDING_BURNING_RUIN = building_type.BUILDING_BURNING_RUIN;
import { building_type } from 'building/type';
import { house_level } from 'building/type';
import HOUSE_LARGE_TENT = house_level.HOUSE_LARGE_TENT;
import HOUSE_LARGE_SHACK = house_level.HOUSE_LARGE_SHACK;
import HOUSE_GRAND_INSULA = house_level.HOUSE_GRAND_INSULA;
import { building_state } from 'building/type';
import BUILDING_STATE_IN_USE = building_state.BUILDING_STATE_IN_USE;
import BUILDING_STATE_UNDO = building_state.BUILDING_STATE_UNDO;
import BUILDING_STATE_RUBBLE = building_state.BUILDING_STATE_RUBBLE;;
import { buffer } from 'core/buffer';
import { building } from 'building/building';
import { building_get } from 'building/building';
import { building_main } from 'building/building';
import { building_get_highest_id } from 'building/building';
import { building_destroy_by_collapse } from 'building/destruction';
import { building_destroy_by_fire } from 'building/destruction';
import { building_destroy_last_placed } from 'building/destruction';
import { building_list_burning_clear } from 'building/list';
import { building_list_burning_add } from 'building/list';
import { building_list_burning_size } from 'building/list';
import { building_list_burning_items } from 'building/list';
import { city_buildings_get_trade_center } from 'city/buildings';
import { city_buildings_set_trade_center } from 'city/buildings';
import { map_point } from 'map/point';
import { map_tile } from 'map/point';
import { city_map_entry_point } from 'city/map';
import { city_map_exit_point } from 'city/map';
import { message_category } from 'city/message';
import MESSAGE_CAT_FIRE = message_category.MESSAGE_CAT_FIRE;
import MESSAGE_CAT_COLLAPSE = message_category.MESSAGE_CAT_COLLAPSE;
import { message_category } from 'city/message';
import { message_advisor } from 'city/message';
import { city_message_type } from 'city/message';
import MESSAGE_FIRE = city_message_type.MESSAGE_FIRE;
import MESSAGE_COLLAPSED_BUILDING = city_message_type.MESSAGE_COLLAPSED_BUILDING;
import MESSAGE_ROAD_TO_ROME_OBSTRUCTED = city_message_type.MESSAGE_ROAD_TO_ROME_OBSTRUCTED;
import { city_message_type } from 'city/message';
import { city_message } from 'city/message';
import { city_message_apply_sound_interval } from 'city/message';
import { city_message_post } from 'city/message';
import { city_message_post_with_popup_delay } from 'city/message';
import { city_population } from 'city/population';
import { city_sentiment_reset_protesters_criminals } from 'city/sentiment';
import { view_tile } from 'city/view';
import { map_callback } from 'city/view';
import { city_view_go_to_grid_offset } from 'city/view';
import { warning_type } from 'city/warning';
import WARNING_CITY_BOXED_IN = warning_type.WARNING_CITY_BOXED_IN;
import WARNING_CITY_BOXED_IN_PEOPLE_WILL_PERISH = warning_type.WARNING_CITY_BOXED_IN_PEOPLE_WILL_PERISH;
import { warning_type } from 'city/warning';
import { city_warning_show } from 'city/warning';
import { direction_type } from 'core/direction';
import { calc_maximum_distance } from 'core/calc';
import { random_byte } from 'core/random';
import { figure_type } from 'figure/type';
import { figure } from 'figure/figure';
import { figure_create_homeless } from 'figuretype/migrant';
import { tutorial_availability } from 'game/tutorial';
import { tutorial_build_buttons } from 'game/tutorial';
import { tutorial_extra_fire_risk } from 'game/tutorial';
import { tutorial_extra_damage_risk } from 'game/tutorial';
import { tutorial_handle_fire } from 'game/tutorial';
import { tutorial_handle_collapse } from 'game/tutorial';
import { game_undo_disable } from 'game/undo';
import { map_building_at } from 'map/building';
import { map_building_tiles_set_rubble } from 'map/building_tiles';
import { GRID } from 'map/grid';
import GRID_SIZE = GRID.GRID_SIZE;
import { map_grid_offset } from 'map/grid';
import { map_grid_direction_delta } from 'map/grid';
import { map_random_get } from 'map/random';
import { map_closest_road_within_radius } from 'map/road_access';
import { map_closest_reachable_road_within_radius } from 'map/road_access';
import { map_road_to_largest_network } from 'map/road_access';
import { map_road_to_largest_network_hippodrome } from 'map/road_access';
import { map_road_network_get } from 'map/road_network';
import { routed_building_type } from 'map/routing';
import { map_routing_calculate_distances } from 'map/routing';
import { map_routing_delete_first_wall_or_aqueduct } from 'map/routing';
import { map_routing_distance } from 'map/routing';
import { map_routing_update_land } from 'map/routing_terrain';
import { map_routing_update_walls } from 'map/routing_terrain';
import { map_tiles_update_all_walls } from 'map/tiles';
import { map_tiles_update_all_empty_land } from 'map/tiles';
import { map_tiles_update_all_meadow } from 'map/tiles';
import { map_tiles_update_all_aqueducts } from 'map/tiles';
import { scenario_climate } from 'scenario/property';
import CLIMATE_NORTHERN = scenario_climate.CLIMATE_NORTHERN;
import CLIMATE_DESERT = scenario_climate.CLIMATE_DESERT;
import { scenario_climate } from 'scenario/property';
import { scenario_property_climate } from 'scenario/property';
import { sound_effect } from 'sound/effect';
import SOUND_EFFECT_EXPLOSION = sound_effect.SOUND_EFFECT_EXPLOSION;
import { sound_effect_play } from 'sound/effect';
let fire_spread_direction: number = 0;
export function building_maintenance_update_fire_direction() {
    fire_spread_direction = random_byte() & 7;
}
export function building_maintenance_update_burning_ruins() {
    let climate: scenario_climate = scenario_property_climate();
    let recalculate_terrain: number = 0;
    building_list_burning_clear();
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state != BUILDING_STATE_IN_USE || b.type != BUILDING_BURNING_RUIN) {
            continue
        }
        if (b.fire_duration < 0) {
            b.fire_duration = 0;
        }
        b.fire_duration++;
        if (b.fire_duration > 32) {
            game_undo_disable();
            b.state = BUILDING_STATE_RUBBLE;
            map_building_tiles_set_rubble(i, b.x, b.y, b.size);
            recalculate_terrain = 1;
            continue
        }
        if (b.ruin_has_plague) {
            continue
        }
        building_list_burning_add(i);
        if (climate == CLIMATE_DESERT) {
            if (b.fire_duration & 3) {
                continue
            }
        } else {
            if (b.fire_duration & 7) {
                continue
            }
        }
        if ((b.house_figure_generation_delay & 3) != (random_byte() & 3)) {
            continue
        }
        let dir1: number = fire_spread_direction - 1;
        if (dir1 < 0) {
            dir1 = 7;
        }
        let dir2: number = fire_spread_direction + 1;
        if (dir2 > 7) {
            dir2 = 0;
        }
        let grid_offset: number = b.grid_offset;
        let next_building_id: number = map_building_at(grid_offset + map_grid_direction_delta(fire_spread_direction));
        if (next_building_id && !building_get(next_building_id).fire_proof) {
            building_destroy_by_fire(building_get(next_building_id));
            sound_effect_play(SOUND_EFFECT_EXPLOSION);
            recalculate_terrain = 1;
        } else {
            next_building_id = map_building_at(grid_offset + map_grid_direction_delta(dir1));
            if (next_building_id && !building_get(next_building_id).fire_proof) {
                building_destroy_by_fire(building_get(next_building_id));
                sound_effect_play(SOUND_EFFECT_EXPLOSION);
                recalculate_terrain = 1;
            } else {
                next_building_id = map_building_at(grid_offset + map_grid_direction_delta(dir2));
                if (next_building_id && !building_get(next_building_id).fire_proof) {
                    building_destroy_by_fire(building_get(next_building_id));
                    sound_effect_play(SOUND_EFFECT_EXPLOSION);
                    recalculate_terrain = 1;
                }
            }
        }
    }
    if (recalculate_terrain) {
        map_routing_update_land();
    }
}
export function building_maintenance_get_closest_burning_ruin(x: number, y: number, distance: number) {
    let min_free_building_id: number = 0;
    let min_occupied_building_id: number = 0;
    let min_occupied_dist: number = * distance = 10000;
    let burning: number = building_list_burning_items();
    let burning_size: number = building_list_burning_size();
    for (let i: number = 0; i < burning_size; i++) {
        let building_id: number = burning[i];
        let b: building = building_get(building_id);
        if (b.state == BUILDING_STATE_IN_USE && b.type == BUILDING_BURNING_RUIN
            && !b.ruin_has_plague && b.distance_from_entry) {
            let dist: number = calc_maximum_distance(x, y, b.x, b.y);
            if (b.figure_id4) {
                if (dist < min_occupied_dist) {
                    min_occupied_dist = dist;
                    min_occupied_building_id = building_id;
                }
            } else if (dist < * distance) {
                * distance = dist;
                min_free_building_id = building_id;
            }
        }
    }
    if (!min_free_building_id && min_occupied_dist <= 2) {
        min_free_building_id = min_occupied_building_id;
        * distance = 2;
    }
    return min_free_building_id;
}
function collapse_building(b: building) {
    city_message_apply_sound_interval(MESSAGE_CAT_COLLAPSE);
    if (!tutorial_handle_collapse()) {
        city_message_post_with_popup_delay(MESSAGE_CAT_COLLAPSE, MESSAGE_COLLAPSED_BUILDING, b.type, b.grid_offset);
    }
    game_undo_disable();
    building_destroy_by_collapse(b);
}
function fire_building(b: building) {
    city_message_apply_sound_interval(MESSAGE_CAT_FIRE);
    if (!tutorial_handle_fire()) {
        city_message_post_with_popup_delay(MESSAGE_CAT_FIRE, MESSAGE_FIRE, b.type, b.grid_offset);
    }
    building_destroy_by_fire(b);
    sound_effect_play(SOUND_EFFECT_EXPLOSION);
}
export function building_maintenance_check_fire_collapse() {
    city_sentiment_reset_protesters_criminals();
    let climate: scenario_climate = scenario_property_climate();
    let recalculate_terrain: number = 0;
    let random_global: number = random_byte() & 7;
    let max_id: number = building_get_highest_id();
    for (let i: number = 1; i <= max_id; i++) {
        let b: building = building_get(i);
        if (b.state != BUILDING_STATE_IN_USE || b.fire_proof) {
            continue
        }
        if (b.type == BUILDING_HIPPODROME && b.prev_part_building_id) {
            continue
        }
        let random_building: number = (i + map_random_get(b.grid_offset)) & 7;
        b.damage_risk += random_building == random_global ? 3 : 1
        if (tutorial_extra_damage_risk()) {
            b.damage_risk += 5
        }
        if (b.house_size && b.subtype.house_level <= HOUSE_LARGE_TENT) {
            b.damage_risk = 0;
        }
        if (b.damage_risk > 200) {
            collapse_building(b);
            recalculate_terrain = 1;
            continue
        }
        if (random_building == random_global) {
            if (!b.house_size) {
                b.fire_risk += 5
            } else if (b.house_population <= 0) {
                b.fire_risk = 0;
            } else if (b.subtype.house_level <= HOUSE_LARGE_SHACK) {
                b.fire_risk += 10
            } else if (b.subtype.house_level <= HOUSE_GRAND_INSULA) {
                b.fire_risk += 5
            } else {
                b.fire_risk += 2
            }
            if (tutorial_extra_fire_risk()) {
                b.fire_risk += 5
            }
            if (climate == CLIMATE_NORTHERN) {
                b.fire_risk = 0;
            } else if (climate == CLIMATE_DESERT) {
                b.fire_risk += 3
            }
        }
        if (b.fire_risk > 100) {
            fire_building(b);
            recalculate_terrain = 1;
        }
    }
    if (recalculate_terrain) {
        map_routing_update_land();
    }
}
export function building_maintenance_check_rome_access() {
    let entry_point: map_tile = city_map_entry_point();
    map_routing_calculate_distances(entry_point.x, entry_point.y);
    let problem_grid_offset: number = 0;
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state != BUILDING_STATE_IN_USE) {
            continue
        }
        if (b.house_size) {
            let x_road: number
            let y_road: number;
            if (!map_closest_road_within_radius(b.x, b.y, b.size, 2, x_road, y_road)) {
                b.distance_from_entry = 0;
                b.house_unreachable_ticks++;
                if (b.house_unreachable_ticks > 4) {
                    if (b.house_population) {
                        figure_create_homeless(b.x, b.y, b.house_population);
                        b.house_population = 0;
                        b.house_unreachable_ticks = 0;
                    }
                    b.state = BUILDING_STATE_UNDO;
                }
            } else if (map_routing_distance(map_grid_offset(x_road, y_road))) {
                b.distance_from_entry = map_routing_distance(map_grid_offset(x_road, y_road));
                b.house_unreachable_ticks = 0;
            } else if (map_closest_reachable_road_within_radius(b.x, b.y, b.size, 2, x_road, y_road)) {
                b.distance_from_entry = map_routing_distance(map_grid_offset(x_road, y_road));
                b.house_unreachable_ticks = 0;
            } else {
                if (!b.house_unreachable_ticks) {
                    problem_grid_offset = b.grid_offset;
                }
                b.house_unreachable_ticks++;
                if (b.house_unreachable_ticks > 8) {
                    b.distance_from_entry = 0;
                    b.house_unreachable_ticks = 0;
                    b.state = BUILDING_STATE_UNDO;
                }
            }
        } else if (b.type == BUILDING_WAREHOUSE) {
            if (!city_buildings_get_trade_center()) {
                city_buildings_set_trade_center(i);
            }
            b.distance_from_entry = 0;
            let x_road: number
            let y_road: number;
            let road_grid_offset: number = map_road_to_largest_network(b.x, b.y, 3, x_road, y_road);
            if (road_grid_offset >= 0) {
                b.road_network_id = map_road_network_get(road_grid_offset);
                b.distance_from_entry = map_routing_distance(road_grid_offset);
                b.road_access_x = x_road;
                b.road_access_y = y_road;
            }
        } else if (b.type == BUILDING_WAREHOUSE_SPACE) {
            b.distance_from_entry = 0;
            let main_building: building = building_main(b);
            b.road_network_id = main_building.road_network_id;
            b.distance_from_entry = main_building.distance_from_entry;
            b.road_access_x = main_building.road_access_x;
            b.road_access_y = main_building.road_access_y;
        } else if (b.type == BUILDING_HIPPODROME) {
            b.distance_from_entry = 0;
            let x_road: number
            let y_road: number;
            let road_grid_offset: number = map_road_to_largest_network_hippodrome(b.x, b.y, x_road, y_road);
            if (road_grid_offset >= 0) {
                b.road_network_id = map_road_network_get(road_grid_offset);
                b.distance_from_entry = map_routing_distance(road_grid_offset);
                b.road_access_x = x_road;
                b.road_access_y = y_road;
            }
        } else {
            b.distance_from_entry = 0;
            let x_road: number
            let y_road: number;
            let road_grid_offset: number = map_road_to_largest_network(b.x, b.y, b.size, x_road, y_road);
            if (road_grid_offset >= 0) {
                b.road_network_id = map_road_network_get(road_grid_offset);
                b.distance_from_entry = map_routing_distance(road_grid_offset);
                b.road_access_x = x_road;
                b.road_access_y = y_road;
            }
        }
    }
    let exit_point: map_tile = city_map_exit_point();
    if (!map_routing_distance(exit_point.grid_offset)) {
        if (city_population() <= 0) {
            return;
        }
        for (let i: number = 0; i < 15; i++) {
            map_routing_delete_first_wall_or_aqueduct(entry_point.x, entry_point.y);
            map_routing_delete_first_wall_or_aqueduct(exit_point.x, exit_point.y);
            map_routing_calculate_distances(entry_point.x, entry_point.y);
            map_tiles_update_all_walls();
            map_tiles_update_all_aqueducts(0);
            map_tiles_update_all_empty_land();
            map_tiles_update_all_meadow();
            map_routing_update_land();
            map_routing_update_walls();
            if (map_routing_distance(exit_point.grid_offset)) {
                city_message_post(1, MESSAGE_ROAD_TO_ROME_OBSTRUCTED, 0, 0);
                game_undo_disable();
                return;
            }
        }
        building_destroy_last_placed();
    } else if (problem_grid_offset) {
        city_warning_show(WARNING_CITY_BOXED_IN);
        city_warning_show(WARNING_CITY_BOXED_IN_PEOPLE_WILL_PERISH);
        city_view_go_to_grid_offset(problem_grid_offset);
    }
}
