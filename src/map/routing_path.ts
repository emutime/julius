export const MAX_PATH = 500;
import { direction_type } from 'core/direction';
import DIR_0_TOP = direction_type.DIR_0_TOP;
import DIR_1_TOP_RIGHT = direction_type.DIR_1_TOP_RIGHT;
import DIR_2_RIGHT = direction_type.DIR_2_RIGHT;
import DIR_3_BOTTOM_RIGHT = direction_type.DIR_3_BOTTOM_RIGHT;
import DIR_4_BOTTOM = direction_type.DIR_4_BOTTOM;
import DIR_5_BOTTOM_LEFT = direction_type.DIR_5_BOTTOM_LEFT;
import DIR_6_LEFT = direction_type.DIR_6_LEFT;
import DIR_7_TOP_LEFT = direction_type.DIR_7_TOP_LEFT;
import { calc_general_direction } from 'core/calc';
import { buffer } from 'core/buffer';
import { random_byte } from 'core/random';
import { GRID } from 'map/grid';
import GRID_SIZE = GRID.GRID_SIZE;
import { map_grid_offset } from 'map/grid';
import { map_grid_direction_delta } from 'map/grid';
import { map_random_get } from 'map/random';
import { routed_building_type } from 'map/routing';
import { map_routing_distance } from 'map/routing';
import { Ref } from '../../ext/crt';
let direction_path: number[] = new Array(MAX_PATH);
function adjust_tile_in_direction(direction: number, x: Ref<number>, y: Ref<number>, grid_offset: Ref<number>) {
    switch (direction) {
        case DIR_0_TOP:
            y.v--;
            break;
        case DIR_1_TOP_RIGHT:
            x.v++;
            y.v--;
            break;
        case DIR_2_RIGHT:
            x.v++;
            break;
        case DIR_3_BOTTOM_RIGHT:
            x.v++;
            y.v++;
            break;
        case DIR_4_BOTTOM:
            y.v++;
            break;
        case DIR_5_BOTTOM_LEFT:
            x.v--;
            y.v++;
            break;
        case DIR_6_LEFT:
            x.v--;
            break;
        case DIR_7_TOP_LEFT:
            x.v--;
            y.v--;
            break;
    }
    grid_offset.v += map_grid_direction_delta(direction);
}
export function map_routing_get_path(path: number[], src_x: number, src_y: number, dst_x: number, dst_y: number, num_directions: number) {
    let dst_grid_offset: number = map_grid_offset(dst_x, dst_y);
    let distance: number = map_routing_distance(dst_grid_offset);
    if (distance <= 0 || distance >= 998) {
        return 0;
    }
    let num_tiles: number = 0;
    let last_direction: number = -1;
    let x: Ref<number> = new Ref<number>(dst_x);
    let y: Ref<number> = new Ref<number>(dst_y);
    let grid_offset: Ref<number> = new Ref<number>(dst_grid_offset);
    let step: number = num_directions == 8 ? 1 : 2;
    while (distance > 1) {
        distance = map_routing_distance(grid_offset.v);
        let direction: number = -1;
        let general_direction: number = calc_general_direction(x.v, y.v, src_x, src_y);
        for (let d: number = 0; d < 8; d += step) {
            if (d != last_direction) {
                let next_offset: number = grid_offset.v + map_grid_direction_delta(d);
                let next_distance: number = map_routing_distance(next_offset);
                if (next_distance) {
                    if (next_distance < distance) {
                        distance = next_distance;
                        direction = d;
                    } else if (next_distance == distance && (d == general_direction || direction == -1)) {
                        distance = next_distance;
                        direction = d;
                    }
                }
            }
        }
        if (direction == -1) {
            return 0;
        }
        adjust_tile_in_direction(direction, x, y, grid_offset);
        let forward_direction: number = (direction + 4) % 8;
        direction_path[num_tiles++] = forward_direction;
        last_direction = forward_direction;
        if (num_tiles >= MAX_PATH) {
            return 0;
        }
    }
    for (let i: number = 0; i < num_tiles; i++) {
        path[i] = direction_path[num_tiles - i - 1];
    }
    return num_tiles;
}
export function map_routing_get_closest_tile_within_range(src_x: number, src_y: number, dst_x: number, dst_y: number, num_directions: number, range: number, out_x: Ref<number>, out_y: Ref<number>) {
    let dst_grid_offset: number = map_grid_offset(dst_x, dst_y);
    let distance: number = map_routing_distance(dst_grid_offset);
    if (distance <= 0 || distance >= 998) {
        return 0;
    }
    let num_tiles: number = 0;
    let last_direction: number = -1;
    let x: Ref<number> = new Ref<number>(dst_x);
    let y: Ref<number> = new Ref<number>(dst_y);
    let grid_offset: Ref<number> = new Ref<number>(dst_grid_offset);
    let step: number = num_directions == 8 ? 1 : 2;
    while (distance > 1) {
        distance = map_routing_distance(grid_offset.v);
        out_x.v = x.v;
        out_y.v = y.v;
        if (distance <= range) {
            return 1;
        }
        let direction: number = -1;
        let general_direction: number = calc_general_direction(x.v, y.v, src_x, src_y);
        for (let d: number = 0; d < 8; d += step) {
            if (d != last_direction) {
                let next_offset: number = grid_offset.v + map_grid_direction_delta(d);
                let next_distance: number = map_routing_distance(next_offset);
                if (next_distance) {
                    if (next_distance < distance) {
                        distance = next_distance;
                        direction = d;
                    } else if (next_distance == distance && (d == general_direction || direction == -1)) {
                        distance = next_distance;
                        direction = d;
                    }
                }
            }
        }
        if (direction == -1) {
            return 0;
        }
        adjust_tile_in_direction(direction, x, y, grid_offset);
        let forward_direction: number = (direction + 4) % 8;
        direction_path[num_tiles++] = forward_direction;
        last_direction = forward_direction;
        if (num_tiles >= MAX_PATH) {
            return 0;
        }
    }
    return 0;
}
export function map_routing_get_path_on_water(path: number, dst_x: number, dst_y: number, is_flotsam: number) {
    let rand: number = random_byte() & 3;
    let dst_grid_offset: number = map_grid_offset(dst_x, dst_y);
    let distance: number = map_routing_distance(dst_grid_offset);
    if (distance <= 0 || distance >= 998) {
        return 0;
    }
    let num_tiles: number = 0;
    let last_direction: number = -1;
    let x: number = dst_x;
    let y: number = dst_y;
    let grid_offset: number = dst_grid_offset;
    while (distance > 1) {
        let current_rand: number = rand;
        distance = map_routing_distance(grid_offset);
        if (is_flotsam) {
            current_rand = map_random_get(grid_offset) & 3;
        }
        let direction: number = -1;
        for (let d: number = 0; d < 8; d++) {
            if (d != last_direction) {
                let next_offset: number = grid_offset + map_grid_direction_delta(d);
                let next_distance: number = map_routing_distance(next_offset);
                if (next_distance) {
                    if (next_distance < distance) {
                        distance = next_distance;
                        direction = d;
                    } else if (next_distance == distance && rand == current_rand) {
                        // allow flotsam to wander
                        distance = next_distance;
                        direction = d;
                    }
                }
            }
        }
        if (direction == -1) {
            return 0;
        }
        adjust_tile_in_direction(direction, x, y, grid_offset);
        let forward_direction: number = (direction + 4) % 8;
        direction_path[num_tiles++] = forward_direction;
        last_direction = forward_direction;
        if (num_tiles >= MAX_PATH) {
            return 0;
        }
    }
    for (let i: number = 0; i < num_tiles; i++) {
        path[i] = direction_path[num_tiles - i - 1];
    }
    return num_tiles;
}
