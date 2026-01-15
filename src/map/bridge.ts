
;
import { city_view_orientation } from 'city/view';
import { direction_type } from 'core/direction';
import { map_has_figure_at } from 'map/figure';
import { GRID, map_grid_delta, map_grid_offset } from 'map/grid';
import { map_property_mark_deleted } from 'map/property';
import { map_data, map_routing_update_land, map_routing_update_water } from 'map/routing_terrain';
import { map_sprite_bridge_at, map_sprite_bridge_set, map_sprite_clear_tile } from 'map/sprite';
import { map_terrain_add, map_terrain_count_diagonally_adjacent_with_type, map_terrain_count_directly_adjacent_with_type, map_terrain_is, map_terrain_remove, terrain } from 'map/terrain';
import { Ref } from '../../ext/crt';
import DIR_0_TOP = direction_type.DIR_0_TOP;
import DIR_2_RIGHT = direction_type.DIR_2_RIGHT;
import DIR_4_BOTTOM = direction_type.DIR_4_BOTTOM;
import DIR_6_LEFT = direction_type.DIR_6_LEFT;
import GRID_SIZE = GRID.GRID_SIZE;
import TERRAIN_TREE = terrain.TERRAIN_TREE;
import TERRAIN_WATER = terrain.TERRAIN_WATER;
import TERRAIN_BUILDING = terrain.TERRAIN_BUILDING;
import TERRAIN_ROAD = terrain.TERRAIN_ROAD;
import TERRAIN_WALL = terrain.TERRAIN_WALL;
import TERRAIN_GATEHOUSE = terrain.TERRAIN_GATEHOUSE;
export class unnamed13_8 {
    public end_grid_offset: number = 0;
    public length: number = 0;
    public direction: number = 0;
    public direction_grid_delta: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.end_grid_offset = args[0]);
        args.length >= 2 && (this.length = args[1]);
        args.length >= 3 && (this.direction = args[2]);
        args.length >= 4 && (this.direction_grid_delta = args[3]);
    }
}
let bridge: unnamed13_8 = new unnamed13_8();
export function map_bridge_building_length() {
    return bridge.length;
}
export function map_bridge_reset_building_length() {
    bridge.length = 0;
}
export function map_bridge_calculate_length_direction(x: number, y: number, lengthRef: Ref<number>, directionRef: Ref<number>) {
    let grid_offset: number = map_grid_offset(x, y);
    bridge.end_grid_offset = 0;
    bridge.direction_grid_delta = 0;
    bridge.length = 0;
    lengthRef.v = 0;
    bridge.direction = 0;
    directionRef.v = 0;
    if (!map_terrain_is(grid_offset, TERRAIN_WATER)) {
        return 0;
    }
    if (map_terrain_is(grid_offset, TERRAIN_ROAD | TERRAIN_BUILDING)) {
        return 0;
    }
    if (map_terrain_count_directly_adjacent_with_type(grid_offset, TERRAIN_WATER) != 3) {
        return 0;
    }
    if (!map_terrain_is(grid_offset + map_grid_delta(0, -1), TERRAIN_WATER)) {
        bridge.direction_grid_delta = map_grid_delta(0, 1);
        bridge.direction = DIR_4_BOTTOM;
    } else if (!map_terrain_is(grid_offset + map_grid_delta(1, 0), TERRAIN_WATER)) {
        bridge.direction_grid_delta = map_grid_delta(-1, 0);
        bridge.direction = DIR_6_LEFT;
    } else if (!map_terrain_is(grid_offset + map_grid_delta(0, 1), TERRAIN_WATER)) {
        bridge.direction_grid_delta = map_grid_delta(0, -1);
        bridge.direction = DIR_0_TOP;
    } else if (!map_terrain_is(grid_offset + map_grid_delta(-1, 0), TERRAIN_WATER)) {
        bridge.direction_grid_delta = map_grid_delta(1, 0);
        bridge.direction = DIR_2_RIGHT;
    } else {
        return 0;
    }
    directionRef.v = bridge.direction;
    bridge.length = 1;
    for (let i: number = 0; i < 40; i++) {
        grid_offset += bridge.direction_grid_delta
        bridge.length++;
        let next_offset: number = grid_offset + bridge.direction_grid_delta;
        if (map_terrain_is(next_offset, TERRAIN_TREE)) {
            break
        }
        if (!map_terrain_is(next_offset, TERRAIN_WATER)) {
            bridge.end_grid_offset = grid_offset;
            if (map_terrain_count_directly_adjacent_with_type(grid_offset, TERRAIN_WATER) != 3) {
                bridge.end_grid_offset = 0;
            }
            lengthRef.v = bridge.length;
            return bridge.end_grid_offset;
        }
        if (map_terrain_is(next_offset, TERRAIN_ROAD | TERRAIN_BUILDING)) {
            break
        }
        if (map_terrain_count_diagonally_adjacent_with_type(grid_offset, TERRAIN_WATER) != 4) {
            break
        }
    }
    lengthRef.v = bridge.length;
    return 0;
}
function get_pillar_distance(length: number) {
    switch (bridge.length) {
        case 9:
        case 10:
            return 4;
        case 11:
        case 12:
            return 5;
        case 13:
        case 14:
            return 6;
        case 15:
        case 16:
            return 7;
        default:
            return 8
    }
}
export function map_bridge_get_sprite_id(index: number, length: number, direction: number, is_ship_bridge: boolean) {
    if (is_ship_bridge) {
        let pillar_distance: number = get_pillar_distance(length);
        if (index == 1 || index == length - 2) {
            return 13;
        } else if (index == 0) {
            switch (direction) {
                case DIR_0_TOP:
                    return 7;
                case DIR_2_RIGHT:
                    return 8;
                case DIR_4_BOTTOM:
                    return 9;
                case DIR_6_LEFT:
                    return 10;
            }
        } else if (index == length - 1) {
            switch (direction) {
                case DIR_0_TOP:
                    return 9;
                case DIR_2_RIGHT:
                    return 10;
                case DIR_4_BOTTOM:
                    return 7;
                case DIR_6_LEFT:
                    return 8;
            }
        } else if (index == pillar_distance) {
            if (direction == DIR_0_TOP || direction == DIR_4_BOTTOM) {
                return 14;
            } else {
                return 15;
            }
        } else {
            if (direction == DIR_0_TOP || direction == DIR_4_BOTTOM) {
                return 11;
            } else {
                return 12;
            }
        }
    } else {
        if (index == 0) {
            switch (direction) {
                case DIR_0_TOP:
                    return 1;
                case DIR_2_RIGHT:
                    return 2;
                case DIR_4_BOTTOM:
                    return 3;
                case DIR_6_LEFT:
                    return 4;
            }
        } else if (index == length - 1) {
            switch (direction) {
                case DIR_0_TOP:
                    return 3;
                case DIR_2_RIGHT:
                    return 4;
                case DIR_4_BOTTOM:
                    return 1;
                case DIR_6_LEFT:
                    return 2;
            }
        } else {
            if (direction == DIR_0_TOP || direction == DIR_4_BOTTOM) {
                return 5;
            } else {
                return 6;
            }
        }
    }
    return 0;
}
export function map_bridge_add(x: number, y: number, is_ship_bridge: boolean) {
    let min_length: number = is_ship_bridge ? 5 : 2;
    if (bridge.end_grid_offset <= 0 || bridge.length < min_length) {
        bridge.length = 0;
        return bridge.length;
    }
    bridge.direction -= city_view_orientation()
    if (bridge.direction < 0) {
        bridge.direction += 8
    }
    let grid_offset: number = map_grid_offset(x, y);
    for (let i: number = 0; i < bridge.length; i++) {
        map_terrain_add(grid_offset, TERRAIN_ROAD);
        let value: number = map_bridge_get_sprite_id(i, bridge.length, bridge.direction, is_ship_bridge);
        map_sprite_bridge_set(grid_offset, value);
        grid_offset += bridge.direction_grid_delta
    }
    map_routing_update_land();
    map_routing_update_water();
    return bridge.length;
}
export function map_is_bridge(grid_offset: number) {
    return map_terrain_is(grid_offset, TERRAIN_WATER) && map_sprite_bridge_at(grid_offset);
}
function get_y_bridge_tiles(grid_offset: number) {
    let tiles: number = 0;
    if (map_is_bridge(grid_offset + map_grid_delta(0, -1))) {
        tiles++;
    }
    if (map_is_bridge(grid_offset + map_grid_delta(0, -2))) {
        tiles++;
    }
    if (map_is_bridge(grid_offset + map_grid_delta(0, 1))) {
        tiles++;
    }
    if (map_is_bridge(grid_offset + map_grid_delta(0, 2))) {
        tiles++;
    }
    return tiles;
}
function get_x_bridge_tiles(grid_offset: number) {
    let tiles: number = 0;
    if (map_is_bridge(grid_offset + map_grid_delta(-1, 0))) {
        tiles++;
    }
    if (map_is_bridge(grid_offset + map_grid_delta(-2, 0))) {
        tiles++;
    }
    if (map_is_bridge(grid_offset + map_grid_delta(1, 0))) {
        tiles++;
    }
    if (map_is_bridge(grid_offset + map_grid_delta(2, 0))) {
        tiles++;
    }
    return tiles;
}
export function map_bridge_remove(grid_offset: number, mark_deleted: number) {
    if (!map_is_bridge(grid_offset)) {
        return;
    }
    let tiles_x: number = get_x_bridge_tiles(grid_offset);
    let tiles_y: number = get_y_bridge_tiles(grid_offset);
    let offset_up: number = tiles_x > tiles_y ? map_grid_delta(1, 0) : map_grid_delta(0, 1);
    while (map_is_bridge(grid_offset - offset_up)) {
        grid_offset -= offset_up;
    }
    if (mark_deleted) {
        map_property_mark_deleted(grid_offset);
    } else {
        map_sprite_clear_tile(grid_offset);
        map_terrain_remove(grid_offset, TERRAIN_ROAD);
    }
    while (map_is_bridge(grid_offset + offset_up)) {
        grid_offset += offset_up;
        if (mark_deleted) {
            map_property_mark_deleted(grid_offset);
        } else {
            map_sprite_clear_tile(grid_offset);
            map_terrain_remove(grid_offset, TERRAIN_ROAD);
        }
    }
}
export function map_bridge_count_figures(grid_offset: number) {
    if (!map_is_bridge(grid_offset)) {
        return 0;
    }
    let tiles_x: number = get_x_bridge_tiles(grid_offset);
    let tiles_y: number = get_y_bridge_tiles(grid_offset);
    let offset_up: number = tiles_x > tiles_y ? map_grid_delta(1, 0) : map_grid_delta(0, 1);
    while (map_is_bridge(grid_offset - offset_up)) {
        grid_offset -= offset_up;
    }
    let figures: number = 0;
    if (map_has_figure_at(grid_offset)) {
        figures = 1;
    }
    while (map_is_bridge(grid_offset + offset_up)) {
        grid_offset += offset_up;
        if (map_has_figure_at(grid_offset)) {
            figures++;
        }
    }
    return figures;
}
export function map_bridge_update_after_rotate(counter_clockwise: number) {
    let grid_offset: number = map_data.start_offset;
    for (let y: number = 0; y < map_data.height; y++, grid_offset += map_data.border_size) {
        for (let x: number = 0; x < map_data.width; x++, grid_offset++) {
            if (map_is_bridge(grid_offset)) {
                let new_value: number;
                switch (map_sprite_bridge_at(grid_offset)) {
                    case 1:
                        new_value = counter_clockwise ? 2 : 4;
                        break
                    case 2:
                        new_value = counter_clockwise ? 3 : 1;
                        break
                    case 3:
                        new_value = counter_clockwise ? 4 : 2;
                        break
                    case 4:
                        new_value = counter_clockwise ? 1 : 3;
                        break
                    case 5:
                        new_value = 6;
                        break
                    case 6:
                        new_value = 5;
                        break
                    case 7:
                        new_value = counter_clockwise ? 8 : 10;
                        break
                    case 8:
                        new_value = counter_clockwise ? 9 : 7;
                        break
                    case 9:
                        new_value = counter_clockwise ? 10 : 8;
                        break
                    case 10:
                        new_value = counter_clockwise ? 7 : 9;
                        break
                    case 11:
                        new_value = 12;
                        break
                    case 12:
                        new_value = 11;
                        break
                    case 13:
                        new_value = 13;
                        break
                    case 14:
                        new_value = 15;
                        break
                    case 15:
                        new_value = 14;
                        break
                    default: new_value = map_sprite_bridge_at(grid_offset)
                }
                map_sprite_bridge_set(grid_offset, new_value);
            }
        }
    }
}
export function map_bridge_height(grid_offset: number) {
    let sprite: number = map_sprite_bridge_at(grid_offset);
    if (sprite <= 6) {
        switch (sprite) {
            case 1:
            case 4:
                return 10;
            case 2:
            case 3:
                return 16;
            default:
                return 20
        }
    } else {
        switch (sprite) {
            case 7:
            case 8:
            case 9:
            case 10:
                return 14;
            case 13:
                return 30;
            default:
                return 36
        }
    }
}
