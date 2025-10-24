
import { model_get_building } from 'building/model';
import { building_type } from 'building/type';
import { calc_general_direction } from 'core/calc';
import { direction_type } from 'core/direction';
import { game_undo_restore_map } from 'game/undo';
import { window_invalidate } from 'graphics/window';
import { map_building_tiles_add_aqueduct } from 'map/building_tiles';
import { map_grid_direction_delta, map_grid_offset, map_grid_offset_to_x, map_grid_offset_to_y } from 'map/grid';
import { map_property_is_plaza_or_earthquake } from 'map/property';
import { map_routing_calculate_distances_for_building, map_routing_distance, routed_building_type } from 'map/routing';
import { map_routing_update_land, map_routing_update_walls } from 'map/routing_terrain';
import { map_terrain_is, terrain } from 'map/terrain';
import { map_tiles_set_road, map_tiles_set_wall } from 'map/tiles';
import { Ref } from '../../ext/crt';
import ROUTED_BUILDING_ROAD = routed_building_type.ROUTED_BUILDING_ROAD;
import ROUTED_BUILDING_WALL = routed_building_type.ROUTED_BUILDING_WALL;
import ROUTED_BUILDING_AQUEDUCT = routed_building_type.ROUTED_BUILDING_AQUEDUCT;
import ROUTED_BUILDING_AQUEDUCT_WITHOUT_GRAPHIC = routed_building_type.ROUTED_BUILDING_AQUEDUCT_WITHOUT_GRAPHIC;
import DIR_8_NONE = direction_type.DIR_8_NONE;
import BUILDING_AQUEDUCT = building_type.BUILDING_AQUEDUCT;
import TERRAIN_TREE = terrain.TERRAIN_TREE;
import TERRAIN_ROCK = terrain.TERRAIN_ROCK;
import TERRAIN_WATER = terrain.TERRAIN_WATER;
import TERRAIN_BUILDING = terrain.TERRAIN_BUILDING;
import TERRAIN_SHRUB = terrain.TERRAIN_SHRUB;
import TERRAIN_GARDEN = terrain.TERRAIN_GARDEN;
import TERRAIN_ROAD = terrain.TERRAIN_ROAD;
import TERRAIN_AQUEDUCT = terrain.TERRAIN_AQUEDUCT;
import TERRAIN_ELEVATION = terrain.TERRAIN_ELEVATION;
import TERRAIN_ACCESS_RAMP = terrain.TERRAIN_ACCESS_RAMP;
import TERRAIN_RUBBLE = terrain.TERRAIN_RUBBLE;
import TERRAIN_WALL = terrain.TERRAIN_WALL;
import TERRAIN_NOT_CLEAR = terrain.TERRAIN_NOT_CLEAR;
function place_routed_building(x_start: number, y_start: number, x_end: number, y_end: number, type: routed_building_type, items: Ref<number>) {
    let direction_indices: number[][] = [
        [0, 2, 6, 4],
        [0, 2, 6, 4],
        [2, 4, 0, 6],
        [2, 4, 0, 6],
        [4, 6, 2, 0],
        [4, 6, 2, 0],
        [6, 0, 4, 2],
        [6, 0, 4, 2]
    ];
    items.v = 0;
    let grid_offset: number = map_grid_offset(x_end, y_end);
    let guard: number = 0;
    while (1) {
        if (++guard >= 400) {
            return 0;
        }
        let distance = map_routing_distance(grid_offset);
        if (distance <= 0) {
            return 0;
        }
        switch (type) {
            default:
            case ROUTED_BUILDING_ROAD:
                items.v += map_tiles_set_road(x_end, y_end);
                break;
            case ROUTED_BUILDING_WALL:
                items.v += map_tiles_set_wall(x_end, y_end);
                break;
            case ROUTED_BUILDING_AQUEDUCT:
                items.v += map_building_tiles_add_aqueduct(x_end, y_end);
                break;
            case ROUTED_BUILDING_AQUEDUCT_WITHOUT_GRAPHIC:
                items.v += 1;
                break;
        }
        let direction = calc_general_direction(x_end, y_end, x_start, y_start);
        if (direction == DIR_8_NONE) {
            return 1; // destination reached
        }
        let routed = 0;
        for (let i = 0; i < 4; i++) {
            let index = direction_indices[direction][i];
            let new_grid_offset = grid_offset + map_grid_direction_delta(index);
            let new_dist = map_routing_distance(new_grid_offset);
            if (new_dist > 0 && new_dist < distance) {
                grid_offset = new_grid_offset;
                x_end = map_grid_offset_to_x(grid_offset);
                y_end = map_grid_offset_to_y(grid_offset);
                routed = 1;
                break;
            }
        }
        if (!routed) {
            return 0;
        }
    }
}
export function building_construction_place_road(measure_only: number, x_start: number, y_start: number, x_end: number, y_end: number) {
    game_undo_restore_map(0);
    let start_offset: number = map_grid_offset(x_start, y_start);
    let end_offset: number = map_grid_offset(x_end, y_end);
    let forbidden_terrain_mask: number = TERRAIN_TREE | TERRAIN_ROCK | TERRAIN_WATER |
        TERRAIN_SHRUB | TERRAIN_GARDEN | TERRAIN_ELEVATION |
        TERRAIN_RUBBLE | TERRAIN_BUILDING | TERRAIN_WALL;
    if (map_terrain_is(start_offset, forbidden_terrain_mask)) {
        return 0;
    }
    if (map_terrain_is(end_offset, forbidden_terrain_mask)) {
        return 0;
    }
    let items_placed: number = 0;
    let items_placed_ref: Ref<number> = new Ref(items_placed);
    if (map_routing_calculate_distances_for_building(ROUTED_BUILDING_ROAD, x_start, y_start) &&
        place_routed_building(x_start, y_start, x_end, y_end, ROUTED_BUILDING_ROAD, items_placed_ref)) {
        if (!measure_only) {
            map_routing_update_land();
            window_invalidate();
        }
    }
    items_placed = items_placed_ref.v;
    return items_placed;
}
export function building_construction_place_wall(measure_only: number, x_start: number, y_start: number, x_end: number, y_end: number) {
    game_undo_restore_map(0);
    let start_offset: number = map_grid_offset(x_start, y_start);
    let end_offset: number = map_grid_offset(x_end, y_end);
    let forbidden_terrain_mask: number = TERRAIN_TREE | TERRAIN_ROCK | TERRAIN_WATER | TERRAIN_BUILDING |
        TERRAIN_SHRUB | TERRAIN_ROAD | TERRAIN_GARDEN | TERRAIN_ELEVATION |
        TERRAIN_RUBBLE | TERRAIN_AQUEDUCT | TERRAIN_ACCESS_RAMP;
    if (map_terrain_is(start_offset, forbidden_terrain_mask)) {
        return 0;
    }
    if (map_terrain_is(end_offset, forbidden_terrain_mask)) {
        return 0;
    }
    let items_placed: number = 0;
    let items_placed_ref: Ref<number> = new Ref(items_placed);
    if (place_routed_building(x_start, y_start, x_end, y_end, ROUTED_BUILDING_WALL, items_placed_ref)) {
        if (!measure_only) {
            map_routing_update_land();
            map_routing_update_walls();
            window_invalidate();
        }
    }
    items_placed = items_placed_ref.v;
    return items_placed;
}
export function building_construction_place_aqueduct(x_start: number, y_start: number, x_end: number, y_end: number, cost: Ref<number>) {
    game_undo_restore_map(0);
    let item_cost: number = model_get_building(BUILDING_AQUEDUCT).cost;
    cost.v = 0;
    let blocked: number = 0;
    let grid_offset: number = map_grid_offset(x_start, y_start);
    if (map_terrain_is(grid_offset, TERRAIN_ROAD)) {
        if (map_property_is_plaza_or_earthquake(grid_offset)) {
            blocked = 1;
        }
    } else if (map_terrain_is(grid_offset, TERRAIN_NOT_CLEAR)) {
        blocked = 1;
    }
    grid_offset = map_grid_offset(x_end, y_end);
    if (map_terrain_is(grid_offset, TERRAIN_ROAD)) {
        if (map_property_is_plaza_or_earthquake(grid_offset)) {
            blocked = 1;
        }
    } else if (map_terrain_is(grid_offset, TERRAIN_NOT_CLEAR)) {
        blocked = 1;
    }
    if (blocked) {
        return 0;
    }
    if (!map_routing_calculate_distances_for_building(ROUTED_BUILDING_AQUEDUCT, x_start, y_start)) {
        return 0;
    }
    let num_items: number;
    let num_items_ref: Ref<number> = new Ref(num_items);
    place_routed_building(x_start, y_start, x_end, y_end, ROUTED_BUILDING_AQUEDUCT, num_items_ref);
    num_items = num_items_ref.v;
    cost.v = item_cost * num_items;
    return 1;
}
export function building_construction_place_aqueduct_for_reservoir(measure_only: number, x_start: number, y_start: number, x_end: number, y_end: number, items: Ref<number>) {
    let type: routed_building_type = measure_only ? ROUTED_BUILDING_AQUEDUCT_WITHOUT_GRAPHIC : ROUTED_BUILDING_AQUEDUCT;
    return place_routed_building(x_start, y_start, x_end, y_end, type, items);
}
