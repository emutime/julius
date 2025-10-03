import { building, building_get, MAX_BUILDINGS } from 'building/building';
import { building_state, building_type } from 'building/type';
import { city_view_orientation } from 'city/view';
import { direction_type } from 'core/direction';
import { image_group } from 'core/image';
import { group_terrain } from 'core/image_group';
import { figure_hippodrome_horse_reroute } from 'figuretype/animal';
import { figure_tower_sentry_reroute } from 'figuretype/wall';
import { game_undo_disable } from 'game/undo';
import { map_bridge_update_after_rotate } from 'map/bridge';
import { map_building_tiles_add } from 'map/building_tiles';
import { GRID, map_grid_delta, map_grid_offset } from 'map/grid';
import { map_property_clear_draw_tile, map_property_is_multi_tile_xy, map_property_mark_draw_tile, map_property_multi_tile_size } from 'map/property';
import { map_routing_update_walls } from 'map/routing_terrain';
import { map_terrain_add_gatehouse_roads, map_terrain_add_triumphal_arch_roads, map_terrain_get, map_terrain_is, terrain } from 'map/terrain';
import { map_tiles_add_entry_exit_flags, map_tiles_remove_entry_exit_flags, map_tiles_update_all_aqueducts, map_tiles_update_all_earthquake, map_tiles_update_all_elevation, map_tiles_update_all_empty_land, map_tiles_update_all_gardens, map_tiles_update_all_meadow, map_tiles_update_all_plazas, map_tiles_update_all_roads, map_tiles_update_all_rocks, map_tiles_update_all_rubble, map_tiles_update_all_walls, map_tiles_update_all_water } from 'map/tiles';
import { map_water_add_building } from 'map/water';
;
import DIR_0_TOP = direction_type.DIR_0_TOP;
import DIR_2_RIGHT = direction_type.DIR_2_RIGHT;
import DIR_4_BOTTOM = direction_type.DIR_4_BOTTOM;
import DIR_6_LEFT = direction_type.DIR_6_LEFT;
import GROUP_BUILDING_TOWER = group_terrain.GROUP_BUILDING_TOWER;
import GROUP_BUILDING_SHIPYARD = group_terrain.GROUP_BUILDING_SHIPYARD;
import GROUP_BUILDING_DOCK_1 = group_terrain.GROUP_BUILDING_DOCK_1;
import GROUP_BUILDING_WHARF = group_terrain.GROUP_BUILDING_WHARF;
import GROUP_BUILDING_DOCK_2 = group_terrain.GROUP_BUILDING_DOCK_2;
import GROUP_BUILDING_DOCK_3 = group_terrain.GROUP_BUILDING_DOCK_3;
import GROUP_BUILDING_DOCK_4 = group_terrain.GROUP_BUILDING_DOCK_4;
import GROUP_BUILDING_TRIUMPHAL_ARCH = group_terrain.GROUP_BUILDING_TRIUMPHAL_ARCH;
import GROUP_BUILDING_HIPPODROME_1 = group_terrain.GROUP_BUILDING_HIPPODROME_1;
import GROUP_BUILDING_HIPPODROME_2 = group_terrain.GROUP_BUILDING_HIPPODROME_2;
import BUILDING_HIPPODROME = building_type.BUILDING_HIPPODROME;
import BUILDING_TRIUMPHAL_ARCH = building_type.BUILDING_TRIUMPHAL_ARCH;
import BUILDING_GATEHOUSE = building_type.BUILDING_GATEHOUSE;
import BUILDING_SHIPYARD = building_type.BUILDING_SHIPYARD;
import BUILDING_DOCK = building_type.BUILDING_DOCK;
import BUILDING_WHARF = building_type.BUILDING_WHARF;
import BUILDING_STATE_UNUSED = building_state.BUILDING_STATE_UNUSED;
import BUILDING_STATE_DELETED_BY_GAME = building_state.BUILDING_STATE_DELETED_BY_GAME;
export let map_data: map_data_t = new map_data_t();
import GRID_SIZE = GRID.GRID_SIZE;
import TERRAIN_BUILDING = terrain.TERRAIN_BUILDING;
import TERRAIN_ROAD = terrain.TERRAIN_ROAD;
import TERRAIN_WALL = terrain.TERRAIN_WALL;
import TERRAIN_GATEHOUSE = terrain.TERRAIN_GATEHOUSE;
import TERRAIN_NOT_CLEAR = terrain.TERRAIN_NOT_CLEAR;
function determine_leftmost_tile() {
    let orientation: number = city_view_orientation();
    let grid_offset: number = map_data.start_offset;
    for (let y: number = 0; y < map_data.height; y++, grid_offset += map_data.border_size) {
        for (let x: number = 0; x < map_data.width; x++, grid_offset++) {
            let size: number = map_property_multi_tile_size(grid_offset);
            if (size == 1) {
                map_property_mark_draw_tile(grid_offset);
                continue
            }
            map_property_clear_draw_tile(grid_offset);
            let dx: number = orientation == DIR_4_BOTTOM || orientation == DIR_6_LEFT ? size - 1 : 0;
            let dy: number = orientation == DIR_0_TOP || orientation == DIR_6_LEFT ? size - 1 : 0;
            if (map_property_is_multi_tile_xy(grid_offset, dx, dy)) {
                map_property_mark_draw_tile(grid_offset);
            }
        }
    }
}
export function map_orientation_change(counter_clockwise: number) {
    map_tiles_remove_entry_exit_flags();
    game_undo_disable();
    determine_leftmost_tile();
    map_tiles_update_all_elevation();
    map_tiles_update_all_water();
    map_tiles_update_all_earthquake();
    map_tiles_update_all_rocks();
    map_tiles_update_all_gardens();
    map_tiles_add_entry_exit_flags();
    map_tiles_update_all_empty_land();
    map_tiles_update_all_meadow();
    map_tiles_update_all_rubble();
    map_tiles_update_all_roads();
    map_tiles_update_all_plazas();
    map_tiles_update_all_walls();
    map_tiles_update_all_aqueducts(0);
    map_orientation_update_buildings();
    map_bridge_update_after_rotate(counter_clockwise);
    map_routing_update_walls();
    figure_tower_sentry_reroute();
    figure_hippodrome_horse_reroute();
}
export function map_orientation_for_gatehouse(x: number, y: number) {
    switch (city_view_orientation()) {
        case DIR_2_RIGHT:
            x--;
            break
        case DIR_4_BOTTOM:
            x--;
            y--;
            break
        case DIR_6_LEFT:
            y--;
            break
    }
    let grid_offset: number = map_grid_offset(x, y);
    let num_road_tiles_within: number = 0;
    let road_tiles_within_flags: number = 0;
    if (map_terrain_is(map_grid_offset(x, y), TERRAIN_ROAD)) {
        road_tiles_within_flags |= 1
        num_road_tiles_within++;
    }
    if (map_terrain_is(grid_offset + map_grid_delta(1, 0), TERRAIN_ROAD)) {
        road_tiles_within_flags |= 2
        num_road_tiles_within++;
    }
    if (map_terrain_is(grid_offset + map_grid_delta(0, 1), TERRAIN_ROAD)) {
        road_tiles_within_flags |= 4
        num_road_tiles_within++;
    }
    if (map_terrain_is(grid_offset + map_grid_delta(1, 1), TERRAIN_ROAD)) {
        road_tiles_within_flags |= 8
        num_road_tiles_within++;
    }
    if (num_road_tiles_within != 2 && num_road_tiles_within != 4) {
        return 0;
    }
    if (num_road_tiles_within == 2) {
        if (road_tiles_within_flags == 6 || road_tiles_within_flags == 9) {
            return 0;
        }
        if (road_tiles_within_flags == 5 || road_tiles_within_flags == 10) {
            return 1;
        }
        if (road_tiles_within_flags == 3 || road_tiles_within_flags == 12) {
            return 2;
        }
        return 0;
    }
    let num_road_tiles_top: number = 0;
    let num_road_tiles_right: number = 0;
    let num_road_tiles_bottom: number = 0;
    let num_road_tiles_left: number = 0;
    if (map_terrain_is(grid_offset + map_grid_delta(0, -1), TERRAIN_ROAD)) {
        num_road_tiles_top++;
    }
    if (map_terrain_is(grid_offset + map_grid_delta(1, -1), TERRAIN_ROAD)) {
        num_road_tiles_top++;
    }
    if (map_terrain_is(grid_offset + map_grid_delta(0, 2), TERRAIN_ROAD)) {
        num_road_tiles_bottom++;
    }
    if (map_terrain_is(grid_offset + map_grid_delta(1, 2), TERRAIN_ROAD)) {
        num_road_tiles_bottom++;
    }
    if (map_terrain_is(grid_offset + map_grid_delta(-1, 0), TERRAIN_ROAD)) {
        num_road_tiles_left++;
    }
    if (map_terrain_is(grid_offset + map_grid_delta(-1, 1), TERRAIN_ROAD)) {
        num_road_tiles_left++;
    }
    if (map_terrain_is(grid_offset + map_grid_delta(2, 0), TERRAIN_ROAD)) {
        num_road_tiles_right++;
    }
    if (map_terrain_is(grid_offset + map_grid_delta(2, 1), TERRAIN_ROAD)) {
        num_road_tiles_right++;
    }
    if (num_road_tiles_top || num_road_tiles_bottom) {
        if (num_road_tiles_left || num_road_tiles_right) {
            return 0;
        }
        return 1;
    } else if (num_road_tiles_left || num_road_tiles_right) {
        return 2;
    }
    return 0;
}
export function map_orientation_for_triumphal_arch(x: number, y: number) {
    switch (city_view_orientation()) {
        case DIR_2_RIGHT:
            x -= 2
            break
        case DIR_4_BOTTOM:
            x -= 2
            y -= 2
            break
        case DIR_6_LEFT:
            y -= 2
            break
    }
    let num_road_tiles_top_bottom: number = 0;
    let num_road_tiles_left_right: number = 0;
    let num_blocked_tiles: number = 0;
    let grid_offset: number = map_grid_offset(x, y);
    if (map_terrain_is(grid_offset, TERRAIN_NOT_CLEAR)) {
        num_blocked_tiles++;
    }
    if (map_terrain_is(grid_offset + map_grid_delta(2, 0), TERRAIN_NOT_CLEAR)) {
        num_blocked_tiles++;
    }
    if (map_terrain_is(grid_offset + map_grid_delta(0, 2), TERRAIN_NOT_CLEAR)) {
        num_blocked_tiles++;
    }
    if (map_terrain_is(grid_offset + map_grid_delta(2, 2), TERRAIN_NOT_CLEAR)) {
        num_blocked_tiles++;
    }
    let top_offset: number = grid_offset + map_grid_delta(1, 0);
    if ((map_terrain_get(top_offset) & TERRAIN_NOT_CLEAR) == TERRAIN_ROAD) {
        num_road_tiles_top_bottom++;
    } else if (map_terrain_is(top_offset, TERRAIN_NOT_CLEAR)) {
        num_blocked_tiles++;
    }
    let bottom_offset: number = grid_offset + map_grid_delta(1, 2);
    if ((map_terrain_get(bottom_offset) & TERRAIN_NOT_CLEAR) == TERRAIN_ROAD) {
        num_road_tiles_top_bottom++;
    } else if (map_terrain_is(bottom_offset, TERRAIN_NOT_CLEAR)) {
        num_blocked_tiles++;
    }
    let left_offset: number = grid_offset + map_grid_delta(0, 1);
    if ((map_terrain_get(left_offset) & TERRAIN_NOT_CLEAR) == TERRAIN_ROAD) {
        num_road_tiles_left_right++;
    } else if (map_terrain_is(left_offset, TERRAIN_NOT_CLEAR)) {
        num_blocked_tiles++;
    }
    let right_offset: number = grid_offset + map_grid_delta(2, 1);
    if ((map_terrain_get(right_offset) & TERRAIN_NOT_CLEAR) == TERRAIN_ROAD) {
        num_road_tiles_left_right++;
    } else if (map_terrain_is(right_offset, TERRAIN_NOT_CLEAR)) {
        num_blocked_tiles++;
    }
    let center_offset: number = grid_offset + map_grid_delta(2, 1);
    if ((map_terrain_get(center_offset) & TERRAIN_NOT_CLEAR) == TERRAIN_ROAD) {
    } else if (map_terrain_is(center_offset, TERRAIN_NOT_CLEAR)) {
        num_blocked_tiles++;
    }
    if (num_blocked_tiles) {
        return 0;
    }
    if (!num_road_tiles_left_right && !num_road_tiles_top_bottom) {
        return 0;
    }
    if (num_road_tiles_top_bottom == 2 && !num_road_tiles_left_right) {
        return 1;
    }
    if (num_road_tiles_left_right == 2 && !num_road_tiles_top_bottom) {
        return 2;
    }
    return 0;
}
export function map_orientation_update_buildings() {
    let map_orientation: number = city_view_orientation();
    let orientation_is_top_bottom: number = map_orientation == DIR_0_TOP || map_orientation == DIR_4_BOTTOM;
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state == BUILDING_STATE_UNUSED || b.state == BUILDING_STATE_DELETED_BY_GAME) {
            continue
        }
        let image_id: number;
        let image_offset: number;
        switch (b.type) {
            case BUILDING_GATEHOUSE:
                if (b.subtype.orientation == 1) {
                    if (orientation_is_top_bottom) {
                        image_id = image_group(GROUP_BUILDING_TOWER) + 1;
                    } else {
                        image_id = image_group(GROUP_BUILDING_TOWER) + 2;
                    }
                } else {
                    if (orientation_is_top_bottom) {
                        image_id = image_group(GROUP_BUILDING_TOWER) + 2;
                    } else {
                        image_id = image_group(GROUP_BUILDING_TOWER) + 1;
                    }
                }
                map_building_tiles_add(i, b.x, b.y, b.size, image_id, TERRAIN_GATEHOUSE | TERRAIN_BUILDING);
                map_terrain_add_gatehouse_roads(b.x, b.y, 0);
                break
            case BUILDING_TRIUMPHAL_ARCH:
                if (b.subtype.orientation == 1) {
                    if (orientation_is_top_bottom) {
                        image_id = image_group(GROUP_BUILDING_TRIUMPHAL_ARCH);
                    } else {
                        image_id = image_group(GROUP_BUILDING_TRIUMPHAL_ARCH) + 2;
                    }
                } else {
                    if (orientation_is_top_bottom) {
                        image_id = image_group(GROUP_BUILDING_TRIUMPHAL_ARCH) + 2;
                    } else {
                        image_id = image_group(GROUP_BUILDING_TRIUMPHAL_ARCH);
                    }
                }
                map_building_tiles_add(i, b.x, b.y, b.size, image_id, TERRAIN_BUILDING);
                map_terrain_add_triumphal_arch_roads(b.x, b.y, b.subtype.orientation);
                break
            case BUILDING_HIPPODROME:
                if (map_orientation == DIR_0_TOP) {
                    image_id = image_group(GROUP_BUILDING_HIPPODROME_2);
                    switch (b.subtype.orientation) {
                        case 0:
                        case 3:
                            image_id += 0
                            break
                        case 1:
                        case 4:
                            image_id += 2
                            break
                        case 2:
                        case 5:
                            image_id += 4
                            break
                    }
                } else if (map_orientation == DIR_4_BOTTOM) {
                    image_id = image_group(GROUP_BUILDING_HIPPODROME_2);
                    switch (b.subtype.orientation) {
                        case 0:
                        case 3:
                            image_id += 4
                            break
                        case 1:
                        case 4:
                            image_id += 2
                            break
                        case 2:
                        case 5:
                            image_id += 0
                            break
                    }
                } else if (map_orientation == DIR_6_LEFT) {
                    image_id = image_group(GROUP_BUILDING_HIPPODROME_1);
                    switch (b.subtype.orientation) {
                        case 0:
                        case 3:
                            image_id += 0
                            break
                        case 1:
                        case 4:
                            image_id += 2
                            break
                        case 2:
                        case 5:
                            image_id += 4
                            break
                    }
                } else {
                    image_id = image_group(GROUP_BUILDING_HIPPODROME_1);
                    switch (b.subtype.orientation) {
                        case 0:
                        case 3:
                            image_id += 4
                            break
                        case 1:
                        case 4:
                            image_id += 2
                            break
                        case 2:
                        case 5:
                            image_id += 0
                            break
                    }
                }
                map_building_tiles_add(i, b.x, b.y, b.size, image_id, TERRAIN_BUILDING);
                break
            case BUILDING_SHIPYARD:
                image_offset = (4 + b.data.industry.orientation - map_orientation / 2) % 4;
                image_id = image_group(GROUP_BUILDING_SHIPYARD) + image_offset;
                map_water_add_building(i, b.x, b.y, 2, image_id);
                break
            case BUILDING_WHARF:
                image_offset = (4 + b.data.industry.orientation - map_orientation / 2) % 4;
                image_id = image_group(GROUP_BUILDING_WHARF) + image_offset;
                map_water_add_building(i, b.x, b.y, 2, image_id);
                break
            case BUILDING_DOCK:
                image_offset = (4 + b.data.dock.orientation - map_orientation / 2) % 4;
                switch (image_offset) {
                    case 0:
                        image_id = image_group(GROUP_BUILDING_DOCK_1);
                        break
                    case 1:
                        image_id = image_group(GROUP_BUILDING_DOCK_2);
                        break
                    case 2:
                        image_id = image_group(GROUP_BUILDING_DOCK_3);
                        break
                    default: image_id = image_group(GROUP_BUILDING_DOCK_4)
                        break
                }
                map_water_add_building(i, b.x, b.y, 3, image_id);
                break
        }
    }
}
