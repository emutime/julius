
import { building, building_get } from 'building/building';
import { building_destroy_increase_enemy_damage } from 'building/destruction';
import { building_type } from 'building/type';
import { calc_general_direction, calc_missile_direction } from 'core/calc';
import { direction_type } from 'core/direction';
import { figure_combat_attack_figure_at } from 'figure/combat';
import { figure, figure_get } from 'figure/figure';
import { figure_route_add, figure_route_get_direction, figure_route_remove } from 'figure/route';
import { figure_service_provide_coverage } from 'figure/service';
import { terrain_usage } from 'figure/type';
import { game_time_tick } from 'game/time';
import { map_bridge_height } from 'map/bridge';
import { map_building_at } from 'map/building';
import { map_figure_add, map_figure_delete } from 'map/figure';
import { GRID, map_grid_bound, map_grid_direction_delta, map_grid_offset } from 'map/grid';
import { map_property_multi_tile_size } from 'map/property';
import { map_random_get } from 'map/random';
import { map_closest_road_within_radius, map_get_adjacent_road_tiles_for_roaming, map_get_diagonal_road_tiles_for_roaming } from 'map/road_access';
import { destroyable, map_routing_get_destroyable, map_routing_is_destroyable, map_routing_is_wall_passable, map_routing_noncitizen_is_passable } from 'map/routing_terrain';
import { map_terrain_is, terrain } from 'map/terrain';
import DIR_0_TOP = direction_type.DIR_0_TOP;
import DIR_1_TOP_RIGHT = direction_type.DIR_1_TOP_RIGHT;
import DIR_2_RIGHT = direction_type.DIR_2_RIGHT;
import DIR_3_BOTTOM_RIGHT = direction_type.DIR_3_BOTTOM_RIGHT;
import DIR_4_BOTTOM = direction_type.DIR_4_BOTTOM;
import DIR_5_BOTTOM_LEFT = direction_type.DIR_5_BOTTOM_LEFT;
import DIR_6_LEFT = direction_type.DIR_6_LEFT;
import DIR_7_TOP_LEFT = direction_type.DIR_7_TOP_LEFT;
import DIR_FIGURE_AT_DESTINATION = direction_type.DIR_FIGURE_AT_DESTINATION;
import DIR_FIGURE_REROUTE = direction_type.DIR_FIGURE_REROUTE;
import DIR_FIGURE_LOST = direction_type.DIR_FIGURE_LOST;
import DIR_FIGURE_ATTACK = direction_type.DIR_FIGURE_ATTACK;
import TERRAIN_USAGE_ENEMY = terrain_usage.TERRAIN_USAGE_ENEMY;
import TERRAIN_USAGE_WALLS = terrain_usage.TERRAIN_USAGE_WALLS;
import BUILDING_FORT_GROUND = building_type.BUILDING_FORT_GROUND;
import BUILDING_TRIUMPHAL_ARCH = building_type.BUILDING_TRIUMPHAL_ARCH;
import BUILDING_GATEHOUSE = building_type.BUILDING_GATEHOUSE;
import BUILDING_GRANARY = building_type.BUILDING_GRANARY;
import BUILDING_WAREHOUSE = building_type.BUILDING_WAREHOUSE;
import GRID_SIZE = GRID.GRID_SIZE;
import DESTROYABLE_BUILDING = destroyable.DESTROYABLE_BUILDING;
import DESTROYABLE_AQUEDUCT_GARDEN = destroyable.DESTROYABLE_AQUEDUCT_GARDEN;
import DESTROYABLE_WALL = destroyable.DESTROYABLE_WALL;
import DESTROYABLE_GATEHOUSE = destroyable.DESTROYABLE_GATEHOUSE;
import TERRAIN_TREE = terrain.TERRAIN_TREE;
import TERRAIN_WATER = terrain.TERRAIN_WATER;
import TERRAIN_BUILDING = terrain.TERRAIN_BUILDING;
import TERRAIN_GARDEN = terrain.TERRAIN_GARDEN;
import TERRAIN_ROAD = terrain.TERRAIN_ROAD;
import TERRAIN_ACCESS_RAMP = terrain.TERRAIN_ACCESS_RAMP;
import TERRAIN_RUBBLE = terrain.TERRAIN_RUBBLE;
import TERRAIN_WALL = terrain.TERRAIN_WALL;
import TERRAIN_GATEHOUSE = terrain.TERRAIN_GATEHOUSE;
import TERRAIN_WALL_OR_GATEHOUSE = terrain.TERRAIN_WALL_OR_GATEHOUSE;
import TERRAIN_IMPASSABLE = terrain.TERRAIN_IMPASSABLE;
function advance_tick(f: figure) {
    switch (f.direction) {
        case DIR_0_TOP:
            f.cross_country_y--;
            break
        case DIR_1_TOP_RIGHT:
            f.cross_country_x++;
            f.cross_country_y--;
            break
        case DIR_2_RIGHT:
            f.cross_country_x++;
            break
        case DIR_3_BOTTOM_RIGHT:
            f.cross_country_x++;
            f.cross_country_y++;
            break
        case DIR_4_BOTTOM:
            f.cross_country_y++;
            break
        case DIR_5_BOTTOM_LEFT:
            f.cross_country_x--;
            f.cross_country_y++;
            break
        case DIR_6_LEFT:
            f.cross_country_x--;
            break
        case DIR_7_TOP_LEFT:
            f.cross_country_x--;
            f.cross_country_y--;
            break
        default:
            break
    }
    if (f.height_adjusted_ticks) {
        f.height_adjusted_ticks--;
        if (f.height_adjusted_ticks > 0) {
            f.is_ghost = 1;
            if (f.current_height < f.target_height) {
                f.current_height++;
            }
            if (f.current_height > f.target_height) {
                f.current_height--;
            }
        } else {
            f.is_ghost = 0;
        }
    } else {
        if (f.current_height) {
            f.current_height--;
        }
    }
}
function set_target_height_bridge(f: figure) {
    f.height_adjusted_ticks = 18;
    f.target_height = map_bridge_height(f.grid_offset);
}
function move_to_next_tile(f: figure) {
    let old_x: number = f.x;
    let old_y: number = f.y;
    map_figure_delete(f);
    switch (f.direction) {
        default:
            return
        case DIR_0_TOP:
            f.y--;
            break
        case DIR_1_TOP_RIGHT:
            f.x++;
            f.y--;
            break
        case DIR_2_RIGHT:
            f.x++;
            break
        case DIR_3_BOTTOM_RIGHT:
            f.x++;
            f.y++;
            break
        case DIR_4_BOTTOM:
            f.y++;
            break
        case DIR_5_BOTTOM_LEFT:
            f.x--;
            f.y++;
            break
        case DIR_6_LEFT:
            f.x--;
            break
        case DIR_7_TOP_LEFT:
            f.x--;
            f.y--;
            break
    }
    f.grid_offset += map_grid_direction_delta(f.direction)
    map_figure_add(f);
    if (map_terrain_is(f.grid_offset, TERRAIN_ROAD)) {
        f.is_on_road = 1;
        if (map_terrain_is(f.grid_offset, TERRAIN_WATER)) {
            set_target_height_bridge(f);
        }
    } else {
        f.is_on_road = 0;
    }
    figure_combat_attack_figure_at(f, f.grid_offset);
    f.previous_tile_x = old_x;
    f.previous_tile_y = old_y;
}
function set_next_route_tile_direction(f: figure) {
    if (f.routing_path_id > 0) {
        if (f.routing_path_current_tile < f.routing_path_length) {
            f.direction = figure_route_get_direction(f.routing_path_id, f.routing_path_current_tile);
        } else {
            figure_route_remove(f);
            f.direction = DIR_FIGURE_AT_DESTINATION;
        }
    } else {
        f.direction = calc_general_direction(f.x, f.y, f.destination_x, f.destination_y);
        if (f.direction != DIR_FIGURE_AT_DESTINATION) {
            f.direction = DIR_FIGURE_LOST;
        }
    }
}
function advance_route_tile(f: figure, roaming_enabled: number) {
    if (f.direction >= 8) {
        return;
    }
    let target_grid_offset: number = f.grid_offset + map_grid_direction_delta(f.direction);
    if (f.is_boat) {
        if (!map_terrain_is(target_grid_offset, TERRAIN_WATER)) {
            f.direction = DIR_FIGURE_REROUTE;
        }
    } else if (f.terrain_usage == TERRAIN_USAGE_ENEMY) {
        if (!map_routing_noncitizen_is_passable(target_grid_offset)) {
            f.direction = DIR_FIGURE_REROUTE;
        } else if (map_routing_is_destroyable(target_grid_offset)) {
            let cause_damage: number = 1;
            let max_damage: number = 0;
            switch (map_routing_get_destroyable(target_grid_offset)) {
                case DESTROYABLE_BUILDING:
                    max_damage = 10;
                    break
                case DESTROYABLE_AQUEDUCT_GARDEN:
                    if (map_terrain_is(target_grid_offset, TERRAIN_GARDEN | TERRAIN_ACCESS_RAMP | TERRAIN_RUBBLE)) {
                        cause_damage = 0;
                    } else {
                        max_damage = 10;
                    }
                    break
                case DESTROYABLE_WALL:
                    max_damage = 200;
                    break
                case DESTROYABLE_GATEHOUSE:
                    max_damage = 150;
                    break
            }
            if (cause_damage) {
                f.attack_direction = f.direction;
                f.direction = DIR_FIGURE_ATTACK;
                if (!(game_time_tick() & 3)) {
                    building_destroy_increase_enemy_damage(target_grid_offset, max_damage);
                }
            }
        }
    } else if (f.terrain_usage == TERRAIN_USAGE_WALLS) {
        if (!map_routing_is_wall_passable(target_grid_offset)) {
            f.direction = DIR_FIGURE_REROUTE;
        }
    } else if (map_terrain_is(target_grid_offset, TERRAIN_ROAD | TERRAIN_ACCESS_RAMP)) {
        if (roaming_enabled && map_terrain_is(target_grid_offset, TERRAIN_BUILDING)) {
            if (building_get(map_building_at(target_grid_offset)).type == BUILDING_GATEHOUSE) {
                f.direction = DIR_FIGURE_REROUTE;
            }
        }
    } else if (map_terrain_is(target_grid_offset, TERRAIN_BUILDING)) {
        let type: number = building_get(map_building_at(target_grid_offset)).type;
        switch (type) {
            case BUILDING_WAREHOUSE:
            case BUILDING_GRANARY:
            case BUILDING_TRIUMPHAL_ARCH:
            case BUILDING_FORT_GROUND:
                break
            default:
                f.direction = DIR_FIGURE_REROUTE
        }
    } else if (map_terrain_is(target_grid_offset, TERRAIN_IMPASSABLE)) {
        f.direction = DIR_FIGURE_REROUTE;
    }
}
function walk_ticks(f: figure, num_ticks: number, roaming_enabled: number) {
    while (num_ticks > 0) {
        num_ticks--;
        f.progress_on_tile++;
        if (f.progress_on_tile < 15) {
            advance_tick(f);
        } else {
            figure_service_provide_coverage(f);
            f.progress_on_tile = 15;
            if (f.routing_path_id <= 0) {
                figure_route_add(f);
            }
            set_next_route_tile_direction(f);
            advance_route_tile(f, roaming_enabled);
            if (f.direction >= 8) {
                break;
            }
            f.routing_path_current_tile++;
            f.previous_tile_direction = f.direction;
            f.progress_on_tile = 0;
            move_to_next_tile(f);
            advance_tick(f);
        }
    }
}
export function figure_movement_init_roaming(f: figure) {
    let b: building = building_get(f.building_id);
    f.progress_on_tile = 15;
    f.roam_choose_destination = 0;
    f.roam_ticks_until_next_turn = -1;
    f.roam_turn_direction = 2;
    let roam_dir: number = b.figure_roam_direction;
    b.figure_roam_direction += 2
    if (b.figure_roam_direction > 6) {
        b.figure_roam_direction = 0;
    }
    let x: number = b.x;
    let y: number = b.y;
    switch (roam_dir) {
        case DIR_0_TOP:
            y -= 8
            break
        case DIR_2_RIGHT:
            x += 8
            break
        case DIR_4_BOTTOM:
            y += 8
            break
        case DIR_6_LEFT:
            x -= 8
            break
    }
    map_grid_bound(x, y);
    let x_road: number
    let y_road: number;
    if (map_closest_road_within_radius(x, y, 1, 6, x_road, y_road)) {
        f.destination_x = x_road;
        f.destination_y = y_road;
    } else {
        f.roam_choose_destination = 1;
    }
}
function roam_set_direction(f: figure) {
    let grid_offset: number = map_grid_offset(f.x, f.y);
    let direction: number = calc_general_direction(f.x, f.y, f.destination_x, f.destination_y);
    if (direction >= 8) {
        direction = 0;
    }
    let road_offset_dir1: number = 0;
    let road_dir1: number = 0;
    for (let i: number = 0, dir: number = direction; i < 8; i++) {
        if (dir % 2 == 0 && map_terrain_is(grid_offset + map_grid_direction_delta(dir), TERRAIN_ROAD)) {
            road_dir1 = dir;
            break
        }
        dir++;
        if (dir > 7) {
            dir = 0;
        }
        road_offset_dir1++;
    }
    let road_offset_dir2: number = 0;
    let road_dir2: number = 0;
    for (let i: number = 0, dir: number = direction; i < 8; i++) {
        if (dir % 2 == 0 && map_terrain_is(grid_offset + map_grid_direction_delta(dir), TERRAIN_ROAD)) {
            road_dir2 = dir;
            break
        }
        dir--;
        if (dir < 0) {
            dir = 7;
        }
        road_offset_dir2++;
    }
    if (road_offset_dir1 <= road_offset_dir2) {
        f.direction = road_dir1;
        f.roam_turn_direction = 2;
    } else {
        f.direction = road_dir2;
        f.roam_turn_direction = -2;
    }
    f.roam_ticks_until_next_turn = 5;
}
export function figure_movement_move_ticks(f: figure, num_ticks: number) {
    walk_ticks(f, num_ticks, 0);
}
export function figure_movement_move_ticks_tower_sentry(f: figure, num_ticks: number) {
    while (num_ticks > 0) {
        num_ticks--;
        f.progress_on_tile++;
        if (f.progress_on_tile < 15) {
            advance_tick(f);
        } else {
            f.progress_on_tile = 15;
        }
    }
}
export function figure_movement_follow_ticks(f: figure, num_ticks: number) {
    let leader: figure = figure_get(f.leading_figure_id);
    if (f.x == f.source_x && f.y == f.source_y) {
        f.is_ghost = 1;
    }
    while (num_ticks > 0) {
        num_ticks--;
        f.progress_on_tile++;
        if (f.progress_on_tile < 15) {
            advance_tick(f);
        } else {
            f.progress_on_tile = 15;
            f.direction = calc_general_direction(f.x, f.y,
                leader.previous_tile_x, leader.previous_tile_y);
            if (f.direction >= 8) {
                break;
            }
            f.previous_tile_direction = f.direction;
            f.progress_on_tile = 0;
            move_to_next_tile(f);
            advance_tick(f);
        }
    }
}
export function figure_movement_roam_ticks(f: figure, num_ticks: number) {
    if (f.roam_choose_destination == 0) {
        walk_ticks(f, num_ticks, 1);
        if (f.direction == DIR_FIGURE_AT_DESTINATION) {
            f.roam_choose_destination = 1;
            f.roam_length = 0;
        } else if (f.direction == DIR_FIGURE_REROUTE || f.direction == DIR_FIGURE_LOST) {
            f.roam_choose_destination = 1;
        }
        if (f.roam_choose_destination) {
            f.roam_ticks_until_next_turn = 100;
            f.direction = f.previous_tile_direction;
        } else {
            return;
        }
    }
    while (num_ticks > 0) {
        num_ticks--;
        f.progress_on_tile++;
        if (f.progress_on_tile < 15) {
            advance_tick(f);
        } else {
            f.progress_on_tile = 15;
            f.roam_random_counter++;
            let came_from_direction: number = (f.previous_tile_direction + 4) % 8;
            if (figure_service_provide_coverage(f)) {
                return;
            }
            let road_tiles: number[] = new Array(8);
            let adjacent_road_tiles: number = map_get_adjacent_road_tiles_for_roaming(f.grid_offset, road_tiles);
            if (adjacent_road_tiles == 3 && map_get_diagonal_road_tiles_for_roaming(f.grid_offset, road_tiles) >= 5) {
                // go in the straight direction of a double-wide road
                adjacent_road_tiles = 2;
                if (came_from_direction == DIR_0_TOP || came_from_direction == DIR_4_BOTTOM) {
                    if (road_tiles[0] && road_tiles[4]) {
                        road_tiles[2] = road_tiles[6] = 0;
                    } else {
                        road_tiles[0] = road_tiles[4] = 0;
                    }
                } else {
                    if (road_tiles[2] && road_tiles[6]) {
                        road_tiles[0] = road_tiles[4] = 0;
                    } else {
                        road_tiles[2] = road_tiles[6] = 0;
                    }
                }
            }
            if (adjacent_road_tiles == 4 && map_get_diagonal_road_tiles_for_roaming(f.grid_offset, road_tiles) >= 8) {
                // go straight on when all surrounding tiles are road
                adjacent_road_tiles = 2;
                if (came_from_direction == DIR_0_TOP || came_from_direction == DIR_4_BOTTOM) {
                    road_tiles[2] = road_tiles[6] = 0;
                } else {
                    road_tiles[0] = road_tiles[4] = 0;
                }
            }
            if (adjacent_road_tiles <= 0) {
                f.roam_length = f.max_roam_length; // end roaming walk
                return;
            }
            if (adjacent_road_tiles == 1) {
                let dir: number = 0;
                do {
                    f.direction = 2 * dir;
                } while (!road_tiles[f.direction] && dir++ < 4);
            } else if (adjacent_road_tiles == 2) {
                if (f.roam_ticks_until_next_turn == -1) {
                    roam_set_direction(f);
                    came_from_direction = -1;
                }
                // 1. continue in the same direction
                // 2. turn in the direction given by roam_turn_direction
                let dir: number = 0;
                do {
                    if (road_tiles[f.direction] && f.direction != came_from_direction) {
                        break;
                    }
                    f.direction += f.roam_turn_direction;
                    if (f.direction > 6) f.direction = 0;
                    if (f.direction < 0) f.direction = 6;
                } while (dir++ < 4);
            } else { // > 2 road tiles
                f.direction = (f.roam_random_counter + map_random_get(f.grid_offset)) & 6;
                if (!road_tiles[f.direction] || f.direction == came_from_direction) {
                    f.roam_ticks_until_next_turn--;
                    if (f.roam_ticks_until_next_turn <= 0) {
                        roam_set_direction(f);
                        came_from_direction = -1;
                    }
                    let dir: number = 0;
                    do {
                        if (road_tiles[f.direction] && f.direction != came_from_direction) {
                            break;
                        }
                        f.direction += f.roam_turn_direction;
                        if (f.direction > 6) f.direction = 0;
                        if (f.direction < 0) f.direction = 6;
                    } while (dir++ < 4);
                }
            }
            f.routing_path_current_tile++;
            f.previous_tile_direction = f.direction;
            f.progress_on_tile = 0;
            move_to_next_tile(f);
            advance_tick(f);
        }
    }
}
export function figure_movement_advance_attack(f: figure) {
    if (f.progress_on_tile <= 5) {
        f.progress_on_tile++;
        advance_tick(f);
    }
}
export function figure_movement_set_cross_country_direction(f: figure, x_src: number, y_src: number, x_dst: number, y_dst: number, is_missile: number) {
    f.cc_destination_x = x_dst;
    f.cc_destination_y = y_dst;
    f.cc_delta_x = (x_src > x_dst) ? (x_src - x_dst) : (x_dst - x_src);
    f.cc_delta_y = (y_src > y_dst) ? (y_src - y_dst) : (y_dst - y_src);
    if (f.cc_delta_x < f.cc_delta_y) {
        f.cc_delta_xy = 2 * f.cc_delta_x - f.cc_delta_y;
    } else if (f.cc_delta_y < f.cc_delta_x) {
        f.cc_delta_xy = 2 * f.cc_delta_y - f.cc_delta_x;
    } else {
        f.cc_delta_xy = 0;
    }
    if (is_missile) {
        f.direction = calc_missile_direction(x_src, y_src, x_dst, y_dst);
    } else {
        f.direction = calc_general_direction(x_src, y_src, x_dst, y_dst);
        if (f.cc_delta_y > 2 * f.cc_delta_x) {
            switch (f.direction) {
                case DIR_1_TOP_RIGHT:
                case DIR_7_TOP_LEFT:
                    f.direction = DIR_0_TOP;
                    break
                case DIR_3_BOTTOM_RIGHT:
                case DIR_5_BOTTOM_LEFT:
                    f.direction = DIR_4_BOTTOM;
                    break
            }
        }
        if (f.cc_delta_x > 2 * f.cc_delta_y) {
            switch (f.direction) {
                case DIR_1_TOP_RIGHT:
                case DIR_3_BOTTOM_RIGHT:
                    f.direction = DIR_2_RIGHT;
                    break
                case DIR_5_BOTTOM_LEFT:
                case DIR_7_TOP_LEFT:
                    f.direction = DIR_6_LEFT;
                    break
            }
        }
    }
    if (f.cc_delta_x >= f.cc_delta_y) {
        f.cc_direction = 1;
    } else {
        f.cc_direction = 2;
    }
}
export function figure_movement_set_cross_country_destination(f: figure, x_dst: number, y_dst: number) {
    f.destination_x = x_dst;
    f.destination_y = y_dst;
    figure_movement_set_cross_country_direction(
        f, f.cross_country_x, f.cross_country_y,
        15 * x_dst, 15 * y_dst, 0);
}
function cross_country_update_delta(f: figure) {
    if (f.cc_direction == 1) {
        if (f.cc_delta_xy >= 0) {
            f.cc_delta_xy += 2 * (f.cc_delta_y - f.cc_delta_x)
        } else {
            f.cc_delta_xy += 2 * f.cc_delta_y
        }
        f.cc_delta_x--;
    } else {
        if (f.cc_delta_xy >= 0) {
            f.cc_delta_xy += 2 * (f.cc_delta_x - f.cc_delta_y)
        } else {
            f.cc_delta_xy += 2 * f.cc_delta_x
        }
        f.cc_delta_y--;
    }
}
function cross_country_advance_x(f: figure) {
    if (f.cross_country_x < f.cc_destination_x) {
        f.cross_country_x++;
    } else if (f.cross_country_x > f.cc_destination_x) {
        f.cross_country_x--;
    }
}
function cross_country_advance_y(f: figure) {
    if (f.cross_country_y < f.cc_destination_y) {
        f.cross_country_y++;
    } else if (f.cross_country_y > f.cc_destination_y) {
        f.cross_country_y--;
    }
}
function cross_country_advance(f: figure) {
    cross_country_update_delta(f);
    if (f.cc_direction == 2) {
        cross_country_advance_y(f);
        if (f.cc_delta_xy >= 0) {
            f.cc_delta_x--;
            cross_country_advance_x(f);
        }
    } else {
        cross_country_advance_x(f);
        if (f.cc_delta_xy >= 0) {
            f.cc_delta_y--;
            cross_country_advance_y(f);
        }
    }
}
export function figure_movement_move_ticks_cross_country(f: figure, num_ticks: number) {
    map_figure_delete(f);
    let is_at_destination: number = 0;
    while (num_ticks > 0) {
        num_ticks--;
        if (f.missile_damage > 0) {
            f.missile_damage--;
        } else {
            f.missile_damage = 0;
        }
        if (f.cc_delta_x + f.cc_delta_y <= 0) {
            is_at_destination = 1;
            break;
        }
        cross_country_advance(f);
    }
    f.x = f.cross_country_x / 15;
    f.y = f.cross_country_y / 15;
    f.grid_offset = map_grid_offset(f.x, f.y);
    if (map_terrain_is(f.grid_offset, TERRAIN_BUILDING)) {
        f.in_building_wait_ticks = 8;
    } else if (f.in_building_wait_ticks) {
        f.in_building_wait_ticks--;
    }
    map_figure_add(f);
    return is_at_destination;
}
export function figure_movement_can_launch_cross_country_missile(x_src: number, y_src: number, x_dst: number, y_dst: number) {
    let height: number = 0;
    let f: figure = figure_get(0);
    f.cross_country_x = 15 * x_src;
    f.cross_country_y = 15 * y_src;
    if (map_terrain_is(map_grid_offset(x_src, y_src), TERRAIN_WALL_OR_GATEHOUSE)) {
        height = 6;
    }
    figure_movement_set_cross_country_direction(f, 15 * x_src, 15 * y_src, 15 * x_dst, 15 * y_dst, 0);
    for (let guard: number = 0; guard < 1000; guard++) {
        for (let i: number = 0; i < 8; i++) {
            if (f.cc_delta_x + f.cc_delta_y <= 0) {
                return 1;
            }
            cross_country_advance(f);
        }
        f.x = f.cross_country_x / 15;
        f.y = f.cross_country_y / 15;
        if (height) {
            height--;
        } else {
            let grid_offset: number = map_grid_offset(f.x, f.y);
            if (map_terrain_is(grid_offset, TERRAIN_WALL | TERRAIN_GATEHOUSE | TERRAIN_TREE)) {
                break
            }
            if (map_terrain_is(grid_offset, TERRAIN_BUILDING) && map_property_multi_tile_size(grid_offset) > 1) {
                break
            }
        }
    }
    return 0;
}
