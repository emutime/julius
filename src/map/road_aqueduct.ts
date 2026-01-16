
import { building, building_get } from 'building/building';
import { building_type } from 'building/type';
import { city_view_orientation } from 'city/view';
import { direction_type } from 'core/direction';
import { image_group } from 'core/image';
import { group_terrain } from 'core/image_group';
import { map_building_at } from 'map/building';
import { GRID, map_grid_delta } from 'map/grid';
import { map_image_at } from 'map/image';
import { map_routing_distance } from 'map/routing';
import { map_routing_citizen_is_road } from 'map/routing_terrain';
import { map_terrain_is, terrain } from 'map/terrain';
import BUILDING_GATEHOUSE = building_type.BUILDING_GATEHOUSE;
import BUILDING_GRANARY = building_type.BUILDING_GRANARY;
import DIR_2_RIGHT = direction_type.DIR_2_RIGHT;
import DIR_6_LEFT = direction_type.DIR_6_LEFT;
import GROUP_BUILDING_AQUEDUCT = group_terrain.GROUP_BUILDING_AQUEDUCT;
import GROUP_TERRAIN_ROAD = group_terrain.GROUP_TERRAIN_ROAD;
import GRID_SIZE = GRID.GRID_SIZE;
import TERRAIN_BUILDING = terrain.TERRAIN_BUILDING;
import TERRAIN_ROAD = terrain.TERRAIN_ROAD;
import TERRAIN_WALL = terrain.TERRAIN_WALL;
import TERRAIN_GATEHOUSE = terrain.TERRAIN_GATEHOUSE;
export function map_can_place_road_under_aqueduct(grid_offset: number) {
    let image_id: number = map_image_at(grid_offset) - image_group(GROUP_BUILDING_AQUEDUCT);
    let check_y: boolean;
    switch (image_id) {
        case 0:
        case 2:
        case 8:
        case 15:
        case 17:
        case 23:
            check_y = true;
            break
        case 1:
        case 3:
        case 9:
        case 10:
        case 11:
        case 12:
        case 13:
        case 14:
        case 16:
        case 18:
        case 24:
        case 25:
        case 26:
        case 27:
        case 28:
        case 29:
            check_y = false;
            break
        default: // not a straight aqueduct
            return 0
    }
    if (city_view_orientation() == DIR_6_LEFT || city_view_orientation() == DIR_2_RIGHT) {
        check_y = !check_y;
    }
    if (check_y) {
        let dy_up: number = map_grid_delta(0, -1);
        let dy_down: number = map_grid_delta(0, 1);
        if (map_terrain_is(grid_offset + dy_up, TERRAIN_ROAD) ||
            map_routing_distance(grid_offset + dy_up) > 0) {
            return 0;
        }
        if (map_terrain_is(grid_offset + dy_down, TERRAIN_ROAD) ||
            map_routing_distance(grid_offset + dy_down) > 0) {
            return 0;
        }
    } else {
        let dx_left: number = map_grid_delta(-1, 0);
        let dx_right: number = map_grid_delta(1, 0);
        if (map_terrain_is(grid_offset + dx_left, TERRAIN_ROAD) ||
            map_routing_distance(grid_offset + dx_left) > 0) {
            return 0;
        }
        if (map_terrain_is(grid_offset + dx_right, TERRAIN_ROAD) ||
            map_routing_distance(grid_offset + dx_right) > 0) {
            return 0;
        }
    }
    return 1;
}
export function map_can_place_aqueduct_on_road(grid_offset: number) {
    let image_id: number = map_image_at(grid_offset) - image_group(GROUP_TERRAIN_ROAD);
    if (image_id != 0 && image_id != 1 && image_id != 49 && image_id != 50) {
        return 0;
    }
    let check_y: boolean = image_id == 0 || image_id == 49;
    if (city_view_orientation() == DIR_6_LEFT || city_view_orientation() == DIR_2_RIGHT) {
        check_y = !check_y;
    }
    if (check_y) {
        if (map_routing_distance(grid_offset + map_grid_delta(0, -1)) > 0 ||
            map_routing_distance(grid_offset + map_grid_delta(0, 1)) > 0) {
            return 0;
        }
    } else {
        if (map_routing_distance(grid_offset + map_grid_delta(-1, 0)) > 0 ||
            map_routing_distance(grid_offset + map_grid_delta(1, 0)) > 0) {
            return 0;
        }
    }
    return 1;
}
export function map_get_aqueduct_with_road_image(grid_offset: number) {
    let image_id: number = map_image_at(grid_offset) - image_group(GROUP_BUILDING_AQUEDUCT);
    switch (image_id) {
        case 2:
            return 8;
        case 17:
            return 23;
        case 3:
            return 9;
        case 18:
            return 24;
        case 0:
        case 1:
        case 8:
        case 9:
        case 15:
        case 16:
        case 23:
        case 24:
            return image_id;
        default:
            // shouldn't happen
            return 8
    }
}
function is_road_tile_for_aqueduct(grid_offset: number, gate_orientation: number) {
    let is_road: number = map_terrain_is(grid_offset, TERRAIN_ROAD) ? 1 : 0;
    if (map_terrain_is(grid_offset, TERRAIN_BUILDING)) {
        let b: building = building_get(map_building_at(grid_offset));
        if (b.type == BUILDING_GATEHOUSE) {
            if (b.subtype.orientation == gate_orientation) {
                is_road = 1;
            }
        } else if (b.type == BUILDING_GRANARY) {
            if (map_routing_citizen_is_road(grid_offset)) {
                is_road = 1;
            }
        }
    }
    return is_road;
}
export function map_is_straight_road_for_aqueduct(grid_offset: number) {
    let road_tiles_x: number = is_road_tile_for_aqueduct(grid_offset + map_grid_delta(1, 0), 2) +
        is_road_tile_for_aqueduct(grid_offset + map_grid_delta(-1, 0), 2);
    let road_tiles_y: number = is_road_tile_for_aqueduct(grid_offset + map_grid_delta(0, -1), 1) +
        is_road_tile_for_aqueduct(grid_offset + map_grid_delta(0, 1), 1);
    if (road_tiles_x == 2 && road_tiles_y == 0) {
        return 1;
    } else if (road_tiles_y == 2 && road_tiles_x == 0) {
        return 1;
    } else {
        return 0;
    }
}
