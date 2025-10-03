
import { building, building_get, building_get_highest_id, building_is_house } from 'building/building';
import { building_house_change_to, building_house_change_to_vacant_lot } from 'building/house';
import { model_get_house } from 'building/model';
import { building_state, building_type } from 'building/type';
import { city_map_entry_point, city_map_exit_point } from 'city/map';
import { city_population_add, city_population_add_homeless, city_population_remove, city_population_remove_homeless } from 'city/population';
import { calc_maximum_distance } from 'core/calc';
import { direction_type } from 'core/direction';
import { image_group } from 'core/image';
import { group_terrain } from 'core/image_group';
import { figure_action } from 'figure/action';
import { figure_combat_handle_attack, figure_combat_handle_corpse } from 'figure/combat';
import { figure, figure_create } from 'figure/figure';
import { figure_image_direction, figure_image_increase_offset, figure_image_set_cart_offset, figure_image_update } from 'figure/image';
import { figure_movement_move_ticks, figure_movement_move_ticks_cross_country, figure_movement_set_cross_country_destination } from 'figure/movement';
import { figure_route_remove } from 'figure/route';
import { figure_state, figure_type, terrain_usage } from 'figure/type';
import { map_tile } from 'map/point';
import { map_closest_road_within_radius } from 'map/road_access';
import BUILDING_HOUSE_SMALL_TENT = building_type.BUILDING_HOUSE_SMALL_TENT;
import BUILDING_STATE_IN_USE = building_state.BUILDING_STATE_IN_USE;;
import DIR_0_TOP = direction_type.DIR_0_TOP;
import DIR_FIGURE_AT_DESTINATION = direction_type.DIR_FIGURE_AT_DESTINATION;
import DIR_FIGURE_REROUTE = direction_type.DIR_FIGURE_REROUTE;
import DIR_FIGURE_LOST = direction_type.DIR_FIGURE_LOST;
import FIGURE_ACTION_1_IMMIGRANT_CREATED = figure_action.FIGURE_ACTION_1_IMMIGRANT_CREATED;
import FIGURE_ACTION_2_IMMIGRANT_ARRIVING = figure_action.FIGURE_ACTION_2_IMMIGRANT_ARRIVING;
import FIGURE_ACTION_3_IMMIGRANT_ENTERING_HOUSE = figure_action.FIGURE_ACTION_3_IMMIGRANT_ENTERING_HOUSE;
import FIGURE_ACTION_4_EMIGRANT_CREATED = figure_action.FIGURE_ACTION_4_EMIGRANT_CREATED;
import FIGURE_ACTION_5_EMIGRANT_EXITING_HOUSE = figure_action.FIGURE_ACTION_5_EMIGRANT_EXITING_HOUSE;
import FIGURE_ACTION_6_EMIGRANT_LEAVING = figure_action.FIGURE_ACTION_6_EMIGRANT_LEAVING;
import FIGURE_ACTION_7_HOMELESS_CREATED = figure_action.FIGURE_ACTION_7_HOMELESS_CREATED;
import FIGURE_ACTION_8_HOMELESS_GOING_TO_HOUSE = figure_action.FIGURE_ACTION_8_HOMELESS_GOING_TO_HOUSE;
import FIGURE_ACTION_9_HOMELESS_ENTERING_HOUSE = figure_action.FIGURE_ACTION_9_HOMELESS_ENTERING_HOUSE;
import FIGURE_ACTION_10_HOMELESS_LEAVING = figure_action.FIGURE_ACTION_10_HOMELESS_LEAVING;
import FIGURE_ACTION_149_CORPSE = figure_action.FIGURE_ACTION_149_CORPSE;
import FIGURE_ACTION_150_ATTACK = figure_action.FIGURE_ACTION_150_ATTACK;
import FIGURE_IMMIGRANT = figure_type.FIGURE_IMMIGRANT;
import FIGURE_EMIGRANT = figure_type.FIGURE_EMIGRANT;
import FIGURE_HOMELESS = figure_type.FIGURE_HOMELESS;
import FIGURE_STATE_DEAD = figure_state.FIGURE_STATE_DEAD;
import TERRAIN_USAGE_ANY = terrain_usage.TERRAIN_USAGE_ANY;
import TERRAIN_USAGE_PREFER_ROADS = terrain_usage.TERRAIN_USAGE_PREFER_ROADS;
import GROUP_FIGURE_MIGRANT = group_terrain.GROUP_FIGURE_MIGRANT;
import GROUP_FIGURE_HOMELESS = group_terrain.GROUP_FIGURE_HOMELESS;
import GROUP_FIGURE_MIGRANT_CART = group_terrain.GROUP_FIGURE_MIGRANT_CART;
export function figure_create_immigrant(house: building, num_people: number) {
    let entry: map_tile = city_map_entry_point();
    let f: figure = figure_create(FIGURE_IMMIGRANT, entry.x, entry.y, DIR_0_TOP);
    f.action_state = FIGURE_ACTION_1_IMMIGRANT_CREATED;
    f.immigrant_building_id = house.id;
    house.immigrant_figure_id = f.id;
    f.wait_ticks = 10 + (house.house_figure_generation_delay & 0x7f);
    f.migrant_num_people = num_people;
}
export function figure_create_emigrant(house: building, num_people: number) {
    city_population_remove(num_people);
    if (num_people < house.house_population) {
        house.house_population -= num_people
    } else {
        house.house_population = 0;
        building_house_change_to_vacant_lot(house);
    }
    let f: figure = figure_create(FIGURE_EMIGRANT, house.x, house.y, DIR_0_TOP);
    f.action_state = FIGURE_ACTION_4_EMIGRANT_CREATED;
    f.wait_ticks = 0;
    f.migrant_num_people = num_people;
}
export function figure_create_homeless(x: number, y: number, num_people: number) {
    let f: figure = figure_create(FIGURE_HOMELESS, x, y, DIR_0_TOP);
    f.action_state = FIGURE_ACTION_7_HOMELESS_CREATED;
    f.wait_ticks = 0;
    f.migrant_num_people = num_people;
    city_population_remove_homeless(num_people);
}
function update_direction_and_image(f: figure) {
    figure_image_update(f, image_group(GROUP_FIGURE_MIGRANT));
    if (f.action_state == FIGURE_ACTION_2_IMMIGRANT_ARRIVING ||
        f.action_state == FIGURE_ACTION_6_EMIGRANT_LEAVING) {
        let dir: number = figure_image_direction(f);
        f.cart_image_id = image_group(GROUP_FIGURE_MIGRANT_CART) + dir;
        figure_image_set_cart_offset(f, (dir + 4) % 8);
    }
}
function closest_house_with_room(x: number, y: number) {
    let min_dist: number = 1000;
    let min_building_id: number = 0;
    let max_id: number = building_get_highest_id();
    for (let i: number = 1; i <= max_id; i++) {
        let b: building = building_get(i);
        if (b.state == BUILDING_STATE_IN_USE && b.house_size
            && b.distance_from_entry > 0 && b.house_population_room > 0) {
            if (!b.immigrant_figure_id) {
                let dist: number = calc_maximum_distance(x, y, b.x, b.y);
                if (dist < min_dist) {
                    min_dist = dist;
                    min_building_id = i;
                }
            }
        }
    }
    return min_building_id;
}
export function figure_immigrant_action(f: figure) {
    let b: building = building_get(f.immigrant_building_id);
    f.terrain_usage = TERRAIN_USAGE_ANY;
    f.cart_image_id = 0;
    if (b.state != BUILDING_STATE_IN_USE || b.immigrant_figure_id != f.id || !b.house_size) {
        f.state = FIGURE_STATE_DEAD;
        return;
    }
    figure_image_increase_offset(f, 12);
    switch (f.action_state) {
        case FIGURE_ACTION_150_ATTACK:
            figure_combat_handle_attack(f);
            break
        case FIGURE_ACTION_149_CORPSE:
            figure_combat_handle_corpse(f);
            break
        case FIGURE_ACTION_1_IMMIGRANT_CREATED:
            f.is_ghost = 1;
            f.image_offset = 0;
            f.wait_ticks--;
            if (f.wait_ticks <= 0) {
                let x_road: number
                let y_road: number;
                if (map_closest_road_within_radius(b.x, b.y, b.size, 2, x_road, y_road)) {
                    f.action_state = FIGURE_ACTION_2_IMMIGRANT_ARRIVING;
                    f.destination_x = x_road;
                    f.destination_y = y_road;
                    f.roam_length = 0;
                } else {
                    f.state = FIGURE_STATE_DEAD;
                }
            }
            break
        case FIGURE_ACTION_2_IMMIGRANT_ARRIVING:
            f.is_ghost = 0;
            figure_movement_move_ticks(f, 1);
            switch (f.direction) {
                case DIR_FIGURE_AT_DESTINATION:
                    f.action_state = FIGURE_ACTION_3_IMMIGRANT_ENTERING_HOUSE;
                    figure_movement_set_cross_country_destination(f, b.x, b.y);
                    f.roam_length = 0;
                    break
                case DIR_FIGURE_REROUTE:
                    figure_route_remove(f);
                    break
                case DIR_FIGURE_LOST:
                    b.immigrant_figure_id = 0;
                    b.distance_from_entry = 0;
                    f.state = FIGURE_STATE_DEAD;
                    break
            }
            break
        case FIGURE_ACTION_3_IMMIGRANT_ENTERING_HOUSE:
            f.use_cross_country = 1;
            f.is_ghost = 1;
            if (figure_movement_move_ticks_cross_country(f, 1) == 1) {
                f.state = FIGURE_STATE_DEAD;
                let max_people: number = model_get_house(b.subtype.house_level).max_people;
                if (b.house_is_merged) {
                    max_people *= 4
                }
                let room: number = max_people - b.house_population;
                if (room < 0) {
                    room = 0;
                }
                if (room < f.migrant_num_people) {
                    f.migrant_num_people = room;
                }
                if (!b.house_population) {
                    building_house_change_to(b, BUILDING_HOUSE_SMALL_TENT);
                }
                b.house_population += f.migrant_num_people
                b.house_population_room = max_people - b.house_population;
                city_population_add(f.migrant_num_people);
                b.immigrant_figure_id = 0;
            }
            f.is_ghost = f.in_building_wait_ticks ? 1 : 0;
            break
    }
    update_direction_and_image(f);
}
export function figure_emigrant_action(f: figure) {
    f.terrain_usage = TERRAIN_USAGE_ANY;
    f.cart_image_id = 0;
    figure_image_increase_offset(f, 12);
    switch (f.action_state) {
        case FIGURE_ACTION_150_ATTACK:
            figure_combat_handle_attack(f);
            break
        case FIGURE_ACTION_149_CORPSE:
            figure_combat_handle_corpse(f);
            break
        case FIGURE_ACTION_4_EMIGRANT_CREATED:
            f.is_ghost = 1;
            f.image_offset = 0;
            f.wait_ticks++;
            if (f.wait_ticks >= 5) {
                let x_road: number
                let y_road: number;
                if (!map_closest_road_within_radius(f.x, f.y, 1, 5, x_road, y_road)) {
                    f.state = FIGURE_STATE_DEAD;
                }
                f.action_state = FIGURE_ACTION_5_EMIGRANT_EXITING_HOUSE;
                figure_movement_set_cross_country_destination(f, x_road, y_road);
                f.roam_length = 0;
            }
            break
        case FIGURE_ACTION_5_EMIGRANT_EXITING_HOUSE:
            f.use_cross_country = 1;
            f.is_ghost = 1;
            if (figure_movement_move_ticks_cross_country(f, 1) == 1) {
                let entry: map_tile = city_map_entry_point();
                f.action_state = FIGURE_ACTION_6_EMIGRANT_LEAVING;
                f.destination_x = entry.x;
                f.destination_y = entry.y;
                f.roam_length = 0;
                f.progress_on_tile = 15;
            }
            f.is_ghost = f.in_building_wait_ticks ? 1 : 0;
            break
        case FIGURE_ACTION_6_EMIGRANT_LEAVING:
            f.use_cross_country = 0;
            f.is_ghost = 0;
            figure_movement_move_ticks(f, 1);
            if (f.direction == DIR_FIGURE_AT_DESTINATION ||
                f.direction == DIR_FIGURE_REROUTE ||
                f.direction == DIR_FIGURE_LOST) {
                f.state = FIGURE_STATE_DEAD;
            }
            break
    }
    update_direction_and_image(f);
}
export function figure_homeless_action(f: figure) {
    figure_image_increase_offset(f, 12);
    f.terrain_usage = TERRAIN_USAGE_PREFER_ROADS;
    switch (f.action_state) {
        case FIGURE_ACTION_150_ATTACK:
            figure_combat_handle_attack(f);
            break
        case FIGURE_ACTION_149_CORPSE:
            figure_combat_handle_corpse(f);
            break
        case FIGURE_ACTION_7_HOMELESS_CREATED:
            f.image_offset = 0;
            f.wait_ticks++;
            if (f.wait_ticks > 51) {
                let building_id: number = closest_house_with_room(f.x, f.y);
                if (building_id) {
                    let b: building = building_get(building_id);
                    let x_road: number
                    let y_road: number;
                    if (map_closest_road_within_radius(b.x, b.y, b.size, 2, x_road, y_road)) {
                        b.immigrant_figure_id = f.id;
                        f.immigrant_building_id = building_id;
                        f.action_state = FIGURE_ACTION_8_HOMELESS_GOING_TO_HOUSE;
                        f.destination_x = x_road;
                        f.destination_y = y_road;
                        f.roam_length = 0;
                    } else {
                        f.state = FIGURE_STATE_DEAD;
                    }
                } else {
                    let exit: map_tile = city_map_exit_point();
                    f.action_state = FIGURE_ACTION_10_HOMELESS_LEAVING;
                    f.destination_x = exit.x;
                    f.destination_y = exit.y;
                    f.roam_length = 0;
                    f.wait_ticks = 0;
                }
            }
            break
        case FIGURE_ACTION_8_HOMELESS_GOING_TO_HOUSE:
            f.is_ghost = 0;
            figure_movement_move_ticks(f, 1);
            if (f.direction == DIR_FIGURE_REROUTE || f.direction == DIR_FIGURE_LOST) {
                building_get(f.immigrant_building_id).immigrant_figure_id = 0;
                f.state = FIGURE_STATE_DEAD;
            } else if (f.direction == DIR_FIGURE_AT_DESTINATION) {
                let b: building = building_get(f.immigrant_building_id);
                f.action_state = FIGURE_ACTION_9_HOMELESS_ENTERING_HOUSE;
                figure_movement_set_cross_country_destination(f, b.x, b.y);
                f.roam_length = 0;
            }
            break
        case FIGURE_ACTION_9_HOMELESS_ENTERING_HOUSE:
            f.use_cross_country = 1;
            f.is_ghost = 1;
            if (figure_movement_move_ticks_cross_country(f, 1) == 1) {
                f.state = FIGURE_STATE_DEAD;
                let b: building = building_get(f.immigrant_building_id);
                if (f.immigrant_building_id && building_is_house(b.type)) {
                    let max_people: number = model_get_house(b.subtype.house_level).max_people;
                    if (b.house_is_merged) {
                        max_people *= 4
                    }
                    let room: number = max_people - b.house_population;
                    if (room < 0) {
                        room = 0;
                    }
                    if (room < f.migrant_num_people) {
                        f.migrant_num_people = room;
                    }
                    if (!b.house_population) {
                        building_house_change_to(b, BUILDING_HOUSE_SMALL_TENT);
                    }
                    b.house_population += f.migrant_num_people
                    b.house_population_room = max_people - b.house_population;
                    city_population_add_homeless(f.migrant_num_people);
                    b.immigrant_figure_id = 0;
                }
            }
            break
        case FIGURE_ACTION_10_HOMELESS_LEAVING:
            figure_movement_move_ticks(f, 1);
            if (f.direction == DIR_FIGURE_AT_DESTINATION || f.direction == DIR_FIGURE_LOST) {
                f.state = FIGURE_STATE_DEAD;
            } else if (f.direction == DIR_FIGURE_REROUTE) {
                figure_route_remove(f);
            }
            f.wait_ticks++;
            if (f.wait_ticks > 30) {
                f.wait_ticks = 0;
                let building_id: number = closest_house_with_room(f.x, f.y);
                if (building_id > 0) {
                    let b: building = building_get(building_id);
                    let x_road: number
                    let y_road: number;
                    if (map_closest_road_within_radius(b.x, b.y, b.size, 2, x_road, y_road)) {
                        b.immigrant_figure_id = f.id;
                        f.immigrant_building_id = building_id;
                        f.action_state = FIGURE_ACTION_8_HOMELESS_GOING_TO_HOUSE;
                        f.destination_x = x_road;
                        f.destination_y = y_road;
                        f.roam_length = 0;
                        figure_route_remove(f);
                    }
                }
            }
            break
    }
    figure_image_update(f, image_group(GROUP_FIGURE_HOMELESS));
}
