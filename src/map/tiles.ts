export const OFFSET = 0;
import { map_point } from 'map/point';
import { map_tile } from 'map/point';
import { city_map_entry_flag } from 'city/map';
import { city_map_exit_flag } from 'city/map';
import { city_map_set_entry_flag } from 'city/map';
import { city_map_set_exit_flag } from 'city/map';;
import { buffer } from 'core/buffer';
import { view_tile } from 'city/view';
import { map_callback } from 'city/view';
import { city_view_orientation } from 'city/view';
import { direction_type } from 'core/direction';
import DIR_0_TOP = direction_type.DIR_0_TOP;
import DIR_2_RIGHT = direction_type.DIR_2_RIGHT;
import DIR_4_BOTTOM = direction_type.DIR_4_BOTTOM;
import DIR_6_LEFT = direction_type.DIR_6_LEFT;
import { language_type } from 'core/locale';
import { encoding_type } from 'core/encoding';
import { group_terrain } from 'core/image_group';
import GROUP_TERRAIN_SHRUB = group_terrain.GROUP_TERRAIN_SHRUB;
import GROUP_TERRAIN_TREE = group_terrain.GROUP_TERRAIN_TREE;
import GROUP_TERRAIN_WATER = group_terrain.GROUP_TERRAIN_WATER;
import GROUP_TERRAIN_EARTHQUAKE = group_terrain.GROUP_TERRAIN_EARTHQUAKE;
import GROUP_TERRAIN_GRASS_2 = group_terrain.GROUP_TERRAIN_GRASS_2;
import GROUP_TERRAIN_ELEVATION_ROCK = group_terrain.GROUP_TERRAIN_ELEVATION_ROCK;
import GROUP_TERRAIN_ELEVATION = group_terrain.GROUP_TERRAIN_ELEVATION;
import GROUP_TERRAIN_GRASS_1 = group_terrain.GROUP_TERRAIN_GRASS_1;
import GROUP_BUILDING_AQUEDUCT = group_terrain.GROUP_BUILDING_AQUEDUCT;
import GROUP_BUILDING_WALL = group_terrain.GROUP_BUILDING_WALL;
import GROUP_TERRAIN_PLAZA = group_terrain.GROUP_TERRAIN_PLAZA;
import GROUP_TERRAIN_GARDEN = group_terrain.GROUP_TERRAIN_GARDEN;
import GROUP_TERRAIN_ROAD = group_terrain.GROUP_TERRAIN_ROAD;
import GROUP_TERRAIN_RUBBLE = group_terrain.GROUP_TERRAIN_RUBBLE;
import GROUP_TERRAIN_MEADOW = group_terrain.GROUP_TERRAIN_MEADOW;
import GROUP_TERRAIN_WATER_SHORE = group_terrain.GROUP_TERRAIN_WATER_SHORE;
import GROUP_TERRAIN_ACCESS_RAMP = group_terrain.GROUP_TERRAIN_ACCESS_RAMP;
import GROUP_TERRAIN_ROCK = group_terrain.GROUP_TERRAIN_ROCK;
import GROUP_TERRAIN_ENTRY_EXIT_FLAGS = group_terrain.GROUP_TERRAIN_ENTRY_EXIT_FLAGS;
import { color_t } from 'graphics/color';
import { image } from 'core/image';
import { image_group } from 'core/image';
import { map_aqueduct_at } from 'map/aqueduct';
import { map_aqueduct_set } from 'map/aqueduct';
import { building_type } from 'building/type';
import { map_building_at } from 'map/building';
import { map_building_set } from 'map/building';
import { map_building_tiles_add } from 'map/building_tiles';
export let map_data: map_data_t = new map_data_t();
import { map_desirability_get } from 'map/desirability';
import { map_elevation_at } from 'map/elevation';
import { figure_type } from 'figure/type';
import { figure } from 'figure/figure';
import { map_has_figure_at } from 'map/figure';
import { GRID } from 'map/grid';
import GRID_SIZE = GRID.GRID_SIZE;
import { map_grid_offset } from 'map/grid';
import { map_grid_delta } from 'map/grid';
import { map_grid_bound_area } from 'map/grid';
import { map_grid_is_inside } from 'map/grid';
import { map_image_at } from 'map/image';
import { map_image_set } from 'map/image';
import { terrain_image } from 'map/image_context';
import { map_image_context_get_elevation } from 'map/image_context';
import { map_image_context_get_earthquake } from 'map/image_context';
import { map_image_context_get_shore } from 'map/image_context';
import { map_image_context_get_wall } from 'map/image_context';
import { map_image_context_get_wall_gatehouse } from 'map/image_context';
import { map_image_context_get_dirt_road } from 'map/image_context';
import { map_image_context_get_paved_road } from 'map/image_context';
import { map_image_context_get_aqueduct } from 'map/image_context';
import { map_property_mark_draw_tile } from 'map/property';
import { map_property_set_multi_tile_xy } from 'map/property';
import { map_property_set_multi_tile_size } from 'map/property';
import { map_property_is_alternate_terrain } from 'map/property';
import { map_property_is_plaza_or_earthquake } from 'map/property';
import { map_property_mark_plaza_or_earthquake } from 'map/property';
import { map_property_clear_plaza_or_earthquake } from 'map/property';
import { map_property_clear_constructing } from 'map/property';
import { map_random_get } from 'map/random';
import { terrain } from 'map/terrain';
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
import TERRAIN_MEADOW = terrain.TERRAIN_MEADOW;
import TERRAIN_RUBBLE = terrain.TERRAIN_RUBBLE;
import TERRAIN_FOUNTAIN_RANGE = terrain.TERRAIN_FOUNTAIN_RANGE;
import TERRAIN_WALL = terrain.TERRAIN_WALL;
import TERRAIN_GATEHOUSE = terrain.TERRAIN_GATEHOUSE;
import TERRAIN_WALL_OR_GATEHOUSE = terrain.TERRAIN_WALL_OR_GATEHOUSE;
import TERRAIN_NOT_CLEAR = terrain.TERRAIN_NOT_CLEAR;
import TERRAIN_CLEARABLE = terrain.TERRAIN_CLEARABLE;
import TERRAIN_ALL = terrain.TERRAIN_ALL;
import { map_terrain_is } from 'map/terrain';
import { map_terrain_get } from 'map/terrain';
import { map_terrain_set } from 'map/terrain';
import { map_terrain_add } from 'map/terrain';
import { map_terrain_remove } from 'map/terrain';
import { map_terrain_count_directly_adjacent_with_type } from 'map/terrain';
import { map_terrain_exists_tile_in_radius_with_type } from 'map/terrain';
import { map_terrain_exists_clear_tile_in_radius } from 'map/terrain';
import { map_terrain_has_only_rocks_trees_in_ring } from 'map/terrain';
import { map_terrain_has_only_meadow_in_ring } from 'map/terrain';
import { scenario_map_entry } from 'scenario/map';
import { scenario_map_exit } from 'scenario/map';
let aqueduct_include_construction: number = 0;
let elevation_recalculate_trees: number = 0;
function is_clear(x: number, y: number, size: number, disallowed_terrain: number, check_image: number) {
    if (!map_grid_is_inside(x, y, size)) {
        return 0;
    }
    for (let dy: number = 0; dy < size; dy++) {
        for (let dx: number = 0; dx < size; dx++) {
            let grid_offset: number = map_grid_offset(x + dx, y + dy);
            if (map_terrain_is(grid_offset, TERRAIN_NOT_CLEAR & disallowed_terrain)) {
                return 0;
            } else if (map_has_figure_at(grid_offset)) {
                return 0;
            } else if (check_image && map_image_at(grid_offset)) {
                return 0;
            }
        }
    }
    return 1;
}
export function map_tiles_are_clear(x: number, y: number, size: number, disallowed_terrain: number) {
    return is_clear(x, y, size, disallowed_terrain, 0);
}
function foreach_map_tile(callback: (x: number, y: number, grid_offset: number) => void) {
    let grid_offset: number = map_data.start_offset;
    for (let y: number = 0; y < map_data.height; y++, grid_offset += map_data.border_size) {
        for (let x: number = 0; x < map_data.width; x++, grid_offset++) {
            callback(x, y, grid_offset);
        }
    }
}
function foreach_region_tile(x_min: number, y_min: number, x_max: number, y_max: number, callback: (x: number, y: number, grid_offset: number) => void) {
    map_grid_bound_area(x_min, y_min, x_max, y_max);
    let grid_offset: number = map_grid_offset(x_min, y_min);
    for (let yy: number = y_min; yy <= y_max; yy++) {
        for (let xx: number = x_min; xx <= x_max; xx++) {
            callback(xx, yy, grid_offset);
            ++grid_offset;
        }
        grid_offset += GRID_SIZE - (x_max - x_min + 1)
    }
}
function is_all_terrain_in_area(x: number, y: number, size: number, terrain: number) {
    if (!map_grid_is_inside(x, y, size)) {
        return 0;
    }
    for (let dy: number = 0; dy < size; dy++) {
        for (let dx: number = 0; dx < size; dx++) {
            let grid_offset: number = map_grid_offset(x + dx, y + dy);
            if ((map_terrain_get(grid_offset) & TERRAIN_NOT_CLEAR) != terrain) {
                return 0;
            }
            if (map_image_at(grid_offset) != 0) {
                return 0;
            }
        }
    }
    return 1;
}
function is_updatable_rock(grid_offset: number) {
    return map_terrain_is(grid_offset, TERRAIN_ROCK) &&
        !map_property_is_plaza_or_earthquake(grid_offset) &&
        !map_terrain_is(grid_offset, TERRAIN_ELEVATION | TERRAIN_ACCESS_RAMP);
}
function clear_rock_image(x: number, y: number, grid_offset: number) {
    if (is_updatable_rock(grid_offset)) {
        map_image_set(grid_offset, 0);
        map_property_set_multi_tile_size(grid_offset, 1);
        map_property_mark_draw_tile(grid_offset);
    }
}
function set_rock_image(x: number, y: number, grid_offset: number) {
    if (is_updatable_rock(grid_offset)) {
        if (!map_image_at(grid_offset)) {
            if (is_all_terrain_in_area(x, y, 3, TERRAIN_ROCK)) {
                let image_id: number = 12 + (map_random_get(grid_offset) & 1);
                if (map_terrain_exists_tile_in_radius_with_type(x, y, 3, 4, TERRAIN_ELEVATION)) {
                    image_id += image_group(GROUP_TERRAIN_ELEVATION_ROCK)
                } else {
                    image_id += image_group(GROUP_TERRAIN_ROCK)
                }
                map_building_tiles_add(0, x, y, 3, image_id, TERRAIN_ROCK);
            } else if (is_all_terrain_in_area(x, y, 2, TERRAIN_ROCK)) {
                let image_id: number = 8 + (map_random_get(grid_offset) & 3);
                if (map_terrain_exists_tile_in_radius_with_type(x, y, 2, 4, TERRAIN_ELEVATION)) {
                    image_id += image_group(GROUP_TERRAIN_ELEVATION_ROCK)
                } else {
                    image_id += image_group(GROUP_TERRAIN_ROCK)
                }
                map_building_tiles_add(0, x, y, 2, image_id, TERRAIN_ROCK);
            } else {
                let image_id: number = map_random_get(grid_offset) & 7;
                if (map_terrain_exists_tile_in_radius_with_type(x, y, 1, 4, TERRAIN_ELEVATION)) {
                    image_id += image_group(GROUP_TERRAIN_ELEVATION_ROCK)
                } else {
                    image_id += image_group(GROUP_TERRAIN_ROCK)
                }
                map_image_set(grid_offset, image_id);
            }
        }
    }
}
export function map_tiles_update_all_rocks() {
    foreach_map_tile(clear_rock_image);
    foreach_map_tile(set_rock_image);
}
function update_tree_image(x: number, y: number, grid_offset: number) {
    if (map_terrain_is(grid_offset, TERRAIN_TREE) &&
        !map_terrain_is(grid_offset, TERRAIN_ELEVATION | TERRAIN_ACCESS_RAMP)) {
        let image_id: number = image_group(GROUP_TERRAIN_TREE) + (map_random_get(grid_offset) & 7);
        if (map_terrain_has_only_rocks_trees_in_ring(x, y, 3)) {
            map_image_set(grid_offset, image_id + 24);
        } else if (map_terrain_has_only_rocks_trees_in_ring(x, y, 2)) {
            map_image_set(grid_offset, image_id + 16);
        } else if (map_terrain_has_only_rocks_trees_in_ring(x, y, 1)) {
            map_image_set(grid_offset, image_id + 8);
        } else {
            map_image_set(grid_offset, image_id);
        }
        map_property_set_multi_tile_size(grid_offset, 1);
        map_property_mark_draw_tile(grid_offset);
        map_aqueduct_set(grid_offset, 0);
    }
}
function set_tree_image(x: number, y: number, grid_offset: number) {
    if (map_terrain_is(grid_offset, TERRAIN_TREE) &&
        !map_terrain_is(grid_offset, TERRAIN_ELEVATION | TERRAIN_ACCESS_RAMP)) {
        foreach_region_tile(x - 1, y - 1, x + 1, y + 1, update_tree_image);
    }
}
export function map_tiles_update_region_trees(x_min: number, y_min: number, x_max: number, y_max: number) {
    foreach_region_tile(x_min, y_min, x_max, y_max, set_tree_image);
}
function set_shrub_image(x: number, y: number, grid_offset: number) {
    if (map_terrain_is(grid_offset, TERRAIN_SHRUB) &&
        !map_terrain_is(grid_offset, TERRAIN_ELEVATION | TERRAIN_ACCESS_RAMP)) {
        map_image_set(grid_offset, image_group(GROUP_TERRAIN_SHRUB) + (map_random_get(grid_offset) & 7));
        map_property_set_multi_tile_size(grid_offset, 1);
        map_property_mark_draw_tile(grid_offset);
    }
}
export function map_tiles_update_region_shrub(x_min: number, y_min: number, x_max: number, y_max: number) {
    foreach_region_tile(x_min, y_min, x_max, y_max, set_shrub_image);
}
function clear_garden_image(x: number, y: number, grid_offset: number) {
    if (map_terrain_is(grid_offset, TERRAIN_GARDEN) &&
        !map_terrain_is(grid_offset, TERRAIN_ELEVATION | TERRAIN_ACCESS_RAMP)) {
        map_image_set(grid_offset, 0);
        map_property_set_multi_tile_size(grid_offset, 1);
        map_property_mark_draw_tile(grid_offset);
    }
}
function set_garden_image(x: number, y: number, grid_offset: number) {
    if (map_terrain_is(grid_offset, TERRAIN_GARDEN)
        && !map_terrain_is(grid_offset, TERRAIN_ELEVATION | TERRAIN_ACCESS_RAMP)) {
        if (!map_image_at(grid_offset)) {
            let image_id: number = image_group(GROUP_TERRAIN_GARDEN);
            if (is_all_terrain_in_area(x, y, 2, TERRAIN_GARDEN)) {
                switch (map_random_get(grid_offset) & 3) {
                    case 0:
                    case 1:
                        image_id += 6
                        break
                    case 2:
                        image_id += 5
                        break
                    case 3:
                        image_id += 4
                        break
                }
                map_building_tiles_add(0, x, y, 2, image_id, TERRAIN_GARDEN);
            } else {
                if (y & 1) {
                    switch (x & 3) {
                        case 0:
                        case 2:
                            image_id += 2
                            break
                        case 1:
                        case 3:
                            image_id += 3
                            break
                    }
                } else {
                    switch (x & 3) {
                        case 1:
                        case 3:
                            image_id += 1
                            break
                    }
                }
                map_image_set(grid_offset, image_id);
            }
        }
    }
}
function remove_plaza_below_building(x: number, y: number, grid_offset: number) {
    if (map_terrain_is(grid_offset, TERRAIN_ROAD) &&
        map_property_is_plaza_or_earthquake(grid_offset)) {
        if (map_terrain_is(grid_offset, TERRAIN_BUILDING)) {
            map_property_clear_plaza_or_earthquake(grid_offset);
        }
    }
}
function clear_plaza_image(x: number, y: number, grid_offset: number) {
    if (map_terrain_is(grid_offset, TERRAIN_ROAD) &&
        map_property_is_plaza_or_earthquake(grid_offset)) {
        map_image_set(grid_offset, 0);
        map_property_set_multi_tile_size(grid_offset, 1);
        map_property_mark_draw_tile(grid_offset);
    }
}
function is_tile_plaza(grid_offset: number) {
    if (map_terrain_is(grid_offset, TERRAIN_ROAD) &&
        map_property_is_plaza_or_earthquake(grid_offset) &&
        !map_terrain_is(grid_offset, TERRAIN_WATER | TERRAIN_BUILDING) &&
        !map_image_at(grid_offset)) {
        return 1;
    }
    return 0;
}
function is_two_tile_square_plaza(grid_offset: number) {
    return
    is_tile_plaza(grid_offset + map_grid_delta(1, 0)) &&
        is_tile_plaza(grid_offset + map_grid_delta(0, 1)) &&
        is_tile_plaza(grid_offset + map_grid_delta(1, 1));
}
function set_plaza_image(x: number, y: number, grid_offset: number) {
    if (map_terrain_is(grid_offset, TERRAIN_ROAD) &&
        map_property_is_plaza_or_earthquake(grid_offset) &&
        !map_image_at(grid_offset)) {
        let image_id: number = image_group(GROUP_TERRAIN_PLAZA);
        if (is_two_tile_square_plaza(grid_offset)) {
            if (map_random_get(grid_offset) & 1) {
                image_id += 7
            } else {
                image_id += 6
            }
            map_building_tiles_add(0, x, y, 2, image_id, TERRAIN_ROAD);
        } else {
            switch ((x & 1) + (y & 1)) {
                case 2:
                    image_id += 1
                    break
                case 1:
                    image_id += 2
                    break
            }
            map_image_set(grid_offset, image_id);
        }
    }
}
export function map_tiles_update_all_gardens() {
    foreach_map_tile(clear_garden_image);
    foreach_map_tile(set_garden_image);
}
function determine_garden_tile(x: number, y: number, grid_offset: number) {
    let base_image: number = image_group(GROUP_TERRAIN_GARDEN);
    let image_id: number = map_image_at(grid_offset);
    if (image_id >= base_image && image_id <= base_image + 6) {
        map_terrain_add(grid_offset, TERRAIN_GARDEN);
        map_property_clear_constructing(grid_offset);
        map_aqueduct_set(grid_offset, 0);
    }
}
export function map_tiles_determine_gardens() {
    foreach_map_tile(determine_garden_tile);
}
export function map_tiles_update_all_plazas() {
    foreach_map_tile(remove_plaza_below_building);
    foreach_map_tile(clear_plaza_image);
    foreach_map_tile(set_plaza_image);
}
function get_gatehouse_building_id(grid_offset: number) {
    if (map_terrain_is(grid_offset, TERRAIN_GATEHOUSE)) {
        return map_building_at(grid_offset);
    }
    return 0;
}
function get_gatehouse_position(grid_offset: number, direction: number, building_id: number) {
    let result: number = 0;
    if (direction == DIR_0_TOP) {
        if (map_terrain_is(grid_offset + map_grid_delta(1, -1), TERRAIN_GATEHOUSE) &&
            map_building_at(grid_offset + map_grid_delta(1, -1)) == building_id) {
            result = 1;
            if (!map_terrain_is(grid_offset + map_grid_delta(1, 0), TERRAIN_WALL)) {
                result = 0;
            }
            if (map_terrain_is(grid_offset + map_grid_delta(-1, 0), TERRAIN_WALL) &&
                map_terrain_is(grid_offset + map_grid_delta(-1, 1), TERRAIN_WALL)) {
                result = 2;
            }
            if (!map_terrain_is(grid_offset + map_grid_delta(0, 1), TERRAIN_WALL_OR_GATEHOUSE)) {
                result = 0;
            }
            if (!map_terrain_is(grid_offset + map_grid_delta(1, 1), TERRAIN_WALL_OR_GATEHOUSE)) {
                result = 0;
            }
        } else if (map_terrain_is(grid_offset + map_grid_delta(-1, -1), TERRAIN_GATEHOUSE) &&
            map_building_at(grid_offset + map_grid_delta(-1, -1)) == building_id) {
            result = 3;
            if (!map_terrain_is(grid_offset + map_grid_delta(-1, 0), TERRAIN_WALL)) {
                result = 0;
            }
            if (map_terrain_is(grid_offset + map_grid_delta(1, 0), TERRAIN_WALL) &&
                map_terrain_is(grid_offset + map_grid_delta(1, 1), TERRAIN_WALL)) {
                result = 4;
            }
            if (!map_terrain_is(grid_offset + map_grid_delta(0, 1), TERRAIN_WALL_OR_GATEHOUSE)) {
                result = 0;
            }
            if (!map_terrain_is(grid_offset + map_grid_delta(-1, 1), TERRAIN_WALL_OR_GATEHOUSE)) {
                result = 0;
            }
        }
    } else if (direction == DIR_6_LEFT) {
        if (map_terrain_is(grid_offset + map_grid_delta(-1, 1), TERRAIN_GATEHOUSE) &&
            map_building_at(grid_offset + map_grid_delta(-1, 1)) == building_id) {
            result = 1;
            if (!map_terrain_is(grid_offset + map_grid_delta(0, 1), TERRAIN_WALL)) {
                result = 0;
            }
            if (map_terrain_is(grid_offset + map_grid_delta(0, -1), TERRAIN_WALL) &&
                map_terrain_is(grid_offset + map_grid_delta(1, -1), TERRAIN_WALL)) {
                result = 2;
            }
            if (!map_terrain_is(grid_offset + map_grid_delta(1, 0), TERRAIN_WALL_OR_GATEHOUSE)) {
                result = 0;
            }
            if (!map_terrain_is(grid_offset + map_grid_delta(1, 1), TERRAIN_WALL_OR_GATEHOUSE)) {
                result = 0;
            }
        } else if (map_terrain_is(grid_offset + map_grid_delta(-1, -1), TERRAIN_GATEHOUSE) &&
            map_building_at(grid_offset + map_grid_delta(-1, -1)) == building_id) {
            result = 3;
            if (!map_terrain_is(grid_offset + map_grid_delta(0, -1), TERRAIN_WALL)) {
                result = 0;
            }
            if (map_terrain_is(grid_offset + map_grid_delta(0, 1), TERRAIN_WALL) &&
                map_terrain_is(grid_offset + map_grid_delta(1, 1), TERRAIN_WALL)) {
                result = 4;
            }
            if (!map_terrain_is(grid_offset + map_grid_delta(1, 0), TERRAIN_WALL_OR_GATEHOUSE)) {
                result = 0;
            }
            if (!map_terrain_is(grid_offset + map_grid_delta(1, -1), TERRAIN_WALL_OR_GATEHOUSE)) {
                result = 0;
            }
        }
    } else if (direction == DIR_4_BOTTOM) {
        if (map_terrain_is(grid_offset + map_grid_delta(1, 1), TERRAIN_GATEHOUSE) &&
            map_building_at(grid_offset + map_grid_delta(1, 1)) == building_id) {
            result = 1;
            if (!map_terrain_is(grid_offset + map_grid_delta(1, 0), TERRAIN_WALL)) {
                result = 0;
            }
            if (map_terrain_is(grid_offset + map_grid_delta(-1, 0), TERRAIN_WALL) &&
                map_terrain_is(grid_offset + map_grid_delta(-1, -1), TERRAIN_WALL)) {
                result = 2;
            }
            if (!map_terrain_is(grid_offset + map_grid_delta(0, -1), TERRAIN_WALL_OR_GATEHOUSE)) {
                result = 0;
            }
            if (!map_terrain_is(grid_offset + map_grid_delta(1, -1), TERRAIN_WALL_OR_GATEHOUSE)) {
                result = 0;
            }
        } else if (map_terrain_is(grid_offset + map_grid_delta(-1, 1), TERRAIN_GATEHOUSE) &&
            map_building_at(grid_offset + map_grid_delta(-1, 1)) == building_id) {
            result = 3;
            if (!map_terrain_is(grid_offset + map_grid_delta(-1, 0), TERRAIN_WALL)) {
                result = 0;
            }
            if (map_terrain_is(grid_offset + map_grid_delta(1, 0), TERRAIN_WALL) &&
                map_terrain_is(grid_offset + map_grid_delta(1, -1), TERRAIN_WALL)) {
                result = 4;
            }
            if (!map_terrain_is(grid_offset + map_grid_delta(0, -1), TERRAIN_WALL_OR_GATEHOUSE)) {
                result = 0;
            }
            if (!map_terrain_is(grid_offset + map_grid_delta(-1, -1), TERRAIN_WALL_OR_GATEHOUSE)) {
                result = 0;
            }
        }
    } else if (direction == DIR_2_RIGHT) {
        if (map_terrain_is(grid_offset + map_grid_delta(1, 1), TERRAIN_GATEHOUSE) &&
            map_building_at(grid_offset + map_grid_delta(1, 1)) == building_id) {
            result = 1;
            if (!map_terrain_is(grid_offset + map_grid_delta(0, 1), TERRAIN_WALL)) {
                result = 0;
            }
            if (map_terrain_is(grid_offset + map_grid_delta(0, -1), TERRAIN_WALL) &&
                map_terrain_is(grid_offset + map_grid_delta(-1, -1), TERRAIN_WALL)) {
                result = 2;
            }
            if (!map_terrain_is(grid_offset + map_grid_delta(-1, 0), TERRAIN_WALL_OR_GATEHOUSE)) {
                result = 0;
            }
            if (!map_terrain_is(grid_offset + map_grid_delta(-1, 1), TERRAIN_WALL_OR_GATEHOUSE)) {
                result = 0;
            }
        } else if (map_terrain_is(grid_offset + map_grid_delta(1, -1), TERRAIN_GATEHOUSE) &&
            map_building_at(grid_offset + map_grid_delta(1, -1)) == building_id) {
            result = 3;
            if (!map_terrain_is(grid_offset + map_grid_delta(0, -1), TERRAIN_WALL)) {
                result = 0;
            }
            if (map_terrain_is(grid_offset + map_grid_delta(0, 1), TERRAIN_WALL) &&
                map_terrain_is(grid_offset + map_grid_delta(-1, 1), TERRAIN_WALL)) {
                result = 4;
            }
            if (!map_terrain_is(grid_offset + map_grid_delta(-1, 0), TERRAIN_WALL_OR_GATEHOUSE)) {
                result = 0;
            }
            if (!map_terrain_is(grid_offset + map_grid_delta(-1, -1), TERRAIN_WALL_OR_GATEHOUSE)) {
                result = 0;
            }
        }
    }
    return result;
}
function set_wall_gatehouse_image_manually(grid_offset: number) {
    let gatehouse_up: number = get_gatehouse_building_id(grid_offset + map_grid_delta(0, -1));
    let gatehouse_left: number = get_gatehouse_building_id(grid_offset + map_grid_delta(-1, 0));
    let gatehouse_down: number = get_gatehouse_building_id(grid_offset + map_grid_delta(0, 1));
    let gatehouse_right: number = get_gatehouse_building_id(grid_offset + map_grid_delta(1, 0));
    let image_offset: number = 0;
    let map_orientation: number = city_view_orientation();
    if (map_orientation == DIR_0_TOP) {
        if (gatehouse_up && !gatehouse_left) {
            let pos: number = get_gatehouse_position(grid_offset, DIR_0_TOP, gatehouse_up);
            if (pos > 0) {
                if (pos <= 2) {
                    image_offset = 29;
                } else if (pos == 3) {
                    image_offset = 31;
                } else {
                    image_offset = 33;
                }
            }
        } else if (gatehouse_left && !gatehouse_up) {
            let pos: number = get_gatehouse_position(grid_offset, DIR_6_LEFT, gatehouse_left);
            if (pos > 0) {
                if (pos <= 2) {
                    image_offset = 30;
                } else if (pos == 3) {
                    image_offset = 32;
                } else {
                    image_offset = 33;
                }
            }
        }
    } else if (map_orientation == DIR_2_RIGHT) {
        if (gatehouse_up && !gatehouse_right) {
            let pos: number = get_gatehouse_position(grid_offset, DIR_0_TOP, gatehouse_up);
            if (pos > 0) {
                if (pos == 1) {
                    image_offset = 32;
                } else if (pos == 2) {
                    image_offset = 33;
                } else {
                    image_offset = 30;
                }
            }
        } else if (gatehouse_right && !gatehouse_up) {
            let pos: number = get_gatehouse_position(grid_offset, DIR_2_RIGHT, gatehouse_right);
            if (pos > 0) {
                if (pos <= 2) {
                    image_offset = 29;
                } else if (pos == 3) {
                    image_offset = 31;
                } else {
                    image_offset = 33;
                }
            }
        }
    } else if (map_orientation == DIR_4_BOTTOM) {
        if (gatehouse_down && !gatehouse_right) {
            let pos: number = get_gatehouse_position(grid_offset, DIR_4_BOTTOM, gatehouse_down);
            if (pos > 0) {
                if (pos == 1) {
                    image_offset = 31;
                } else if (pos == 2) {
                    image_offset = 33;
                } else {
                    image_offset = 29;
                }
            }
        } else if (gatehouse_right && !gatehouse_down) {
            let pos: number = get_gatehouse_position(grid_offset, DIR_2_RIGHT, gatehouse_right);
            if (pos > 0) {
                if (pos == 1) {
                    image_offset = 32;
                } else if (pos == 2) {
                    image_offset = 33;
                } else {
                    image_offset = 30;
                }
            }
        }
    } else if (map_orientation == DIR_6_LEFT) {
        if (gatehouse_down && !gatehouse_left) {
            let pos: number = get_gatehouse_position(grid_offset, DIR_4_BOTTOM, gatehouse_down);
            if (pos > 0) {
                if (pos <= 2) {
                    image_offset = 30;
                } else if (pos == 3) {
                    image_offset = 32;
                } else {
                    image_offset = 33;
                }
            }
        } else if (gatehouse_left && !gatehouse_down) {
            let pos: number = get_gatehouse_position(grid_offset, DIR_6_LEFT, gatehouse_left);
            if (pos > 0) {
                if (pos == 1) {
                    image_offset = 31;
                } else if (pos == 2) {
                    image_offset = 33;
                } else {
                    image_offset = 29;
                }
            }
        }
    }
    if (image_offset) {
        map_image_set(grid_offset, image_group(GROUP_BUILDING_WALL) + image_offset);
    }
}
function set_wall_image(x: number, y: number, grid_offset: number) {
    if (!map_terrain_is(grid_offset, TERRAIN_WALL) ||
        map_terrain_is(grid_offset, TERRAIN_BUILDING)) {
        return;
    }
    let img: terrain_image = map_image_context_get_wall(grid_offset);
    map_image_set(grid_offset, image_group(GROUP_BUILDING_WALL) +
        img.group_offset + img.item_offset);
    map_property_set_multi_tile_size(grid_offset, 1);
    map_property_mark_draw_tile(grid_offset);
    if (map_terrain_count_directly_adjacent_with_type(grid_offset, TERRAIN_GATEHOUSE) > 0) {
        img = map_image_context_get_wall_gatehouse(grid_offset);
        if (img.is_valid) {
            map_image_set(grid_offset, image_group(GROUP_BUILDING_WALL) +
                img.group_offset + img.item_offset);
        } else {
            set_wall_gatehouse_image_manually(grid_offset);
        }
    }
}
export function map_tiles_update_all_walls() {
    foreach_map_tile(set_wall_image);
}
export function map_tiles_update_area_walls(x: number, y: number, size: number) {
    foreach_region_tile(x - 1, y - 1, x + size - 2, y + size - 2, set_wall_image);
}
export function map_tiles_set_wall(x: number, y: number) {
    let grid_offset: number = map_grid_offset(x, y);
    let tile_set: number = 0;
    if (!map_terrain_is(grid_offset, TERRAIN_WALL)) {
        tile_set = 1;
    }
    map_terrain_set(grid_offset, TERRAIN_WALL);
    map_property_clear_constructing(grid_offset);
    foreach_region_tile(x - 1, y - 1, x + 1, y + 1, set_wall_image);
    return tile_set;
}
export function map_tiles_is_paved_road(grid_offset: number) {
    let desirability: number = map_desirability_get(grid_offset);
    if (desirability > 4) {
        return 1;
    }
    if (desirability > 0 && map_terrain_is(grid_offset, TERRAIN_FOUNTAIN_RANGE)) {
        return 1;
    }
    return 0;
}
function set_aqueduct_image(grid_offset: number, is_road: number, img: terrain_image) {
    let group_offset: number = img.group_offset;
    if (is_road) {
        if (!img.aqueduct_offset || (group_offset != 2 && group_offset != 3)) {
            if (map_terrain_is(grid_offset + map_grid_delta(0, -1), TERRAIN_ROAD)) {
                group_offset = 3;
            } else {
                group_offset = 2;
            }
        }
        if (map_tiles_is_paved_road(grid_offset)) {
            group_offset -= 2
        } else {
            group_offset += 6
        }
    }
    let image_aqueduct: number = image_group(GROUP_BUILDING_AQUEDUCT);
    let water_offset: number;
    let image_id: number = map_image_at(grid_offset);
    if (image_id >= image_aqueduct && image_id < image_aqueduct + 15) {
        water_offset = 0;
    } else {
        water_offset = 15;
    }
    map_image_set(grid_offset, image_aqueduct + water_offset + group_offset);
    map_property_set_multi_tile_size(grid_offset, 1);
    map_property_mark_draw_tile(grid_offset);
}
function set_road_with_aqueduct_image(grid_offset: number) {
    set_aqueduct_image(grid_offset, 1, map_image_context_get_aqueduct(grid_offset, 0));
}
function set_road_image(x: number, y: number, grid_offset: number) {
    if (!map_terrain_is(grid_offset, TERRAIN_ROAD) ||
        map_terrain_is(grid_offset, TERRAIN_WATER | TERRAIN_BUILDING)) {
        return;
    }
    if (map_terrain_is(grid_offset, TERRAIN_AQUEDUCT)) {
        set_road_with_aqueduct_image(grid_offset);
        return;
    }
    if (map_property_is_plaza_or_earthquake(grid_offset)) {
        return;
    }
    if (map_tiles_is_paved_road(grid_offset)) {
        let img: terrain_image = map_image_context_get_paved_road(grid_offset);
        map_image_set(grid_offset, image_group(GROUP_TERRAIN_ROAD) +
            img.group_offset + img.item_offset);
    } else {
        let img: terrain_image = map_image_context_get_dirt_road(grid_offset);
        map_image_set(grid_offset, image_group(GROUP_TERRAIN_ROAD) +
            img.group_offset + img.item_offset + 49);
    }
    map_property_set_multi_tile_size(grid_offset, 1);
    map_property_mark_draw_tile(grid_offset);
}
export function map_tiles_update_all_roads() {
    foreach_map_tile(set_road_image);
}
export function map_tiles_update_area_roads(x: number, y: number, size: number) {
    foreach_region_tile(x - 1, y - 1, x + size - 2, y + size - 2, set_road_image);
}
export function map_tiles_set_road(x: number, y: number) {
    let grid_offset: number = map_grid_offset(x, y);
    let tile_set: number = 0;
    if (!map_terrain_is(grid_offset, TERRAIN_ROAD)) {
        tile_set = 1;
    }
    map_terrain_add(grid_offset, TERRAIN_ROAD);
    map_property_clear_constructing(grid_offset);
    foreach_region_tile(x - 1, y - 1, x + 1, y + 1, set_road_image);
    return tile_set;
}
function clear_empty_land_image(x: number, y: number, grid_offset: number) {
    if (!map_terrain_is(grid_offset, TERRAIN_NOT_CLEAR)) {
        map_image_set(grid_offset, 0);
        map_property_set_multi_tile_size(grid_offset, 1);
        map_property_mark_draw_tile(grid_offset);
    }
}
function set_empty_land_image(x: number, y: number, size: number, image_id: number) {
    if (!map_grid_is_inside(x, y, size)) {
        return;
    }
    let index: number = 0;
    for (let dy: number = 0; dy < size; dy++) {
        for (let dx: number = 0; dx < size; dx++) {
            let grid_offset: number = map_grid_offset(x + dx, y + dy);
            map_terrain_remove(grid_offset, TERRAIN_CLEARABLE);
            map_building_set(grid_offset, 0);
            map_property_clear_constructing(grid_offset);
            map_property_set_multi_tile_size(grid_offset, 1);
            map_property_mark_draw_tile(grid_offset);
            map_image_set(grid_offset, image_id + index);
            index++;
        }
    }
}
function set_empty_land_pass1(x: number, y: number, grid_offset: number) {
    if (!map_terrain_is(grid_offset, TERRAIN_NOT_CLEAR) && !map_image_at(grid_offset) &&
        !(map_random_get(grid_offset) & 0xf0)) {
        let image_id: number;
        if (map_property_is_alternate_terrain(grid_offset)) {
            image_id = image_group(GROUP_TERRAIN_GRASS_2);
        } else {
            image_id = image_group(GROUP_TERRAIN_GRASS_1);
        }
        set_empty_land_image(x, y, 1, image_id + (map_random_get(grid_offset) & 7));
    }
}
function set_empty_land_pass2(x: number, y: number, grid_offset: number) {
    if (!map_terrain_is(grid_offset, TERRAIN_NOT_CLEAR) && !map_image_at(grid_offset)) {
        let image_id: number;
        if (map_property_is_alternate_terrain(grid_offset)) {
            image_id = image_group(GROUP_TERRAIN_GRASS_2);
        } else {
            image_id = image_group(GROUP_TERRAIN_GRASS_1);
        }
        if (is_clear(x, y, 4, TERRAIN_ALL, 1)) {
            set_empty_land_image(x, y, 4, image_id + 42);
        } else if (is_clear(x, y, 3, TERRAIN_ALL, 1)) {
            set_empty_land_image(x, y, 3, image_id + 24 + 9 * (map_random_get(grid_offset) & 1));
        } else if (is_clear(x, y, 2, TERRAIN_ALL, 1)) {
            set_empty_land_image(x, y, 2, image_id + 8 + 4 * (map_random_get(grid_offset) & 3));
        } else {
            set_empty_land_image(x, y, 1, image_id + (map_random_get(grid_offset) & 7));
        }
    }
}
export function map_tiles_update_all_empty_land() {
    foreach_map_tile(clear_empty_land_image);
    foreach_map_tile(set_empty_land_pass1);
    foreach_map_tile(set_empty_land_pass2);
}
export function map_tiles_update_region_empty_land(x_min: number, y_min: number, x_max: number, y_max: number) {
    foreach_region_tile(x_min, y_min, x_max, y_max, clear_empty_land_image);
    foreach_region_tile(x_min, y_min, x_max, y_max, set_empty_land_pass1);
    foreach_region_tile(x_min, y_min, x_max, y_max, set_empty_land_pass2);
}
function set_meadow_image(x: number, y: number, grid_offset: number) {
    if (map_terrain_is(grid_offset, TERRAIN_MEADOW) && !map_terrain_is(grid_offset, FORBIDDEN_TERRAIN_MEADOW)) {
        let random: number = map_random_get(grid_offset) & 3;
        let image_id: number = image_group(GROUP_TERRAIN_MEADOW);
        if (map_terrain_has_only_meadow_in_ring(x, y, 2)) {
            map_image_set(grid_offset, image_id + random + 8);
        } else if (map_terrain_has_only_meadow_in_ring(x, y, 1)) {
            map_image_set(grid_offset, image_id + random + 4);
        } else {
            map_image_set(grid_offset, image_id + random);
        }
        map_property_set_multi_tile_size(grid_offset, 1);
        map_property_mark_draw_tile(grid_offset);
        map_aqueduct_set(grid_offset, 0);
    }
}
function update_meadow_tile(x: number, y: number, grid_offset: number) {
    if (map_terrain_is(grid_offset, TERRAIN_MEADOW) && !map_terrain_is(grid_offset, FORBIDDEN_TERRAIN_MEADOW)) {
        foreach_region_tile(x - 1, y - 1, x + 1, y + 1, set_meadow_image);
    }
}
export function map_tiles_update_all_meadow() {
    foreach_map_tile(update_meadow_tile);
}
export function map_tiles_update_region_meadow(x_min: number, y_min: number, x_max: number, y_max: number) {
    foreach_region_tile(x_min, y_min, x_max, y_max, update_meadow_tile);
}
function set_water_image(x: number, y: number, grid_offset: number) {
    if ((map_terrain_get(grid_offset) & (TERRAIN_WATER | TERRAIN_BUILDING)) == TERRAIN_WATER) {
        let img: terrain_image = map_image_context_get_shore(grid_offset);
        let image_id: number = image_group(GROUP_TERRAIN_WATER) + img.group_offset + img.item_offset;
        if (map_terrain_exists_tile_in_radius_with_type(x, y, 1, 2, TERRAIN_BUILDING)) {
            let base: number = image_group(GROUP_TERRAIN_WATER_SHORE);
            switch (img.group_offset) {
                case 8:
                    image_id = base + 10;
                    break
                case 12:
                    image_id = base + 11;
                    break
                case 16:
                    image_id = base + 9;
                    break
                case 20:
                    image_id = base + 8;
                    break
                case 24:
                    image_id = base + 18;
                    break
                case 28:
                    image_id = base + 16;
                    break
                case 32:
                    image_id = base + 19;
                    break
                case 36:
                    image_id = base + 17;
                    break
                case 50:
                    image_id = base + 12;
                    break
                case 51:
                    image_id = base + 14;
                    break
                case 52:
                    image_id = base + 13;
                    break
                case 53:
                    image_id = base + 15;
                    break
            }
        }
        map_image_set(grid_offset, image_id);
        map_property_set_multi_tile_size(grid_offset, 1);
        map_property_mark_draw_tile(grid_offset);
    }
}
function update_water_tile(x: number, y: number, grid_offset: number) {
    if (map_terrain_is(grid_offset, TERRAIN_WATER) && !map_terrain_is(grid_offset, TERRAIN_BUILDING)) {
        foreach_region_tile(x - 1, y - 1, x + 1, y + 1, set_water_image);
    }
}
export function map_tiles_update_all_water() {
    foreach_map_tile(update_water_tile);
}
export function map_tiles_update_region_water(x_min: number, y_min: number, x_max: number, y_max: number) {
    foreach_region_tile(x_min, y_min, x_max, y_max, update_water_tile);
}
export function map_tiles_set_water(x: number, y: number) {
    map_terrain_add(map_grid_offset(x, y), TERRAIN_WATER);
    foreach_region_tile(x - 1, y - 1, x + 1, y + 1, set_water_image);
}
function set_aqueduct(grid_offset: number) {
    let img: terrain_image = map_image_context_get_aqueduct(grid_offset, aqueduct_include_construction);
    let is_road: number = map_terrain_is(grid_offset, TERRAIN_ROAD);
    if (is_road) {
        map_property_clear_plaza_or_earthquake(grid_offset);
    }
    set_aqueduct_image(grid_offset, is_road, img);
    map_aqueduct_set(grid_offset, img.aqueduct_offset);
}
function update_aqueduct_tile(x: number, y: number, grid_offset: number) {
    if (map_terrain_is(grid_offset, TERRAIN_AQUEDUCT) && map_aqueduct_at(grid_offset) <= 15) {
        set_aqueduct(grid_offset);
    }
}
export function map_tiles_update_all_aqueducts(include_construction: number) {
    aqueduct_include_construction = include_construction;
    foreach_map_tile(update_aqueduct_tile);
    aqueduct_include_construction = 0;
}
export function map_tiles_update_region_aqueducts(x_min: number, y_min: number, x_max: number, y_max: number) {
    foreach_region_tile(x_min, y_min, x_max, y_max, update_aqueduct_tile);
}
function set_earthquake_image(x: number, y: number, grid_offset: number) {
    if (map_terrain_is(grid_offset, TERRAIN_ROCK) && map_property_is_plaza_or_earthquake(grid_offset)) {
        let img: terrain_image = map_image_context_get_earthquake(grid_offset);
        if (img.is_valid) {
            map_image_set(grid_offset,
                image_group(GROUP_TERRAIN_EARTHQUAKE) + img.group_offset + img.item_offset);
        } else {
            map_image_set(grid_offset, image_group(GROUP_TERRAIN_EARTHQUAKE));
        }
        map_property_set_multi_tile_size(grid_offset, 1);
        map_property_mark_draw_tile(grid_offset);
    }
}
function update_earthquake_tile(x: number, y: number, grid_offset: number) {
    if (map_terrain_is(grid_offset, TERRAIN_ROCK) && map_property_is_plaza_or_earthquake(grid_offset)) {
        map_terrain_add(grid_offset, TERRAIN_ROCK);
        map_property_mark_plaza_or_earthquake(grid_offset);
        foreach_region_tile(x - 1, y - 1, x + 1, y + 1, set_earthquake_image);
    }
}
export function map_tiles_update_all_earthquake() {
    foreach_map_tile(update_earthquake_tile);
}
export function map_tiles_set_earthquake(x: number, y: number) {
    let grid_offset: number = map_grid_offset(x, y);
    map_terrain_add(grid_offset, TERRAIN_ROCK);
    map_property_mark_plaza_or_earthquake(grid_offset);
    foreach_region_tile(x - 1, y - 1, x + 1, y + 1, set_earthquake_image);
}
function set_rubble_image(x: number, y: number, grid_offset: number) {
    if (map_terrain_is(grid_offset, TERRAIN_RUBBLE) && !map_terrain_is(grid_offset, FORBIDDEN_TERRAIN_RUBBLE)) {
        map_image_set(grid_offset, image_group(GROUP_TERRAIN_RUBBLE) + (map_random_get(grid_offset) & 7));
        map_property_set_multi_tile_size(grid_offset, 1);
        map_property_mark_draw_tile(grid_offset);
        map_aqueduct_set(grid_offset, 0);
    }
}
export function map_tiles_update_all_rubble() {
    foreach_map_tile(set_rubble_image);
}
export function map_tiles_update_region_rubble(x_min: number, y_min: number, x_max: number, y_max: number) {
    foreach_region_tile(x_min, y_min, x_max, y_max, set_rubble_image);
}
function clear_access_ramp_image(x: number, y: number, grid_offset: number) {
    if (map_terrain_is(grid_offset, TERRAIN_ACCESS_RAMP)) {
        map_image_set(grid_offset, 0);
    }
}
function get_access_ramp_image_offset(x: number, y: number) {
    if (!map_grid_is_inside(x, y, 1)) {
        return -1;
    }
    let offsets: number[][] = [
        [OFFSET(0, 1), OFFSET(1, 1), OFFSET(0, 0), OFFSET(1, 0), OFFSET(0, 2), OFFSET(1, 2)],
        [OFFSET(0, 0), OFFSET(0, 1), OFFSET(1, 0), OFFSET(1, 1), OFFSET(-1, 0), OFFSET(-1, 1)],
        [OFFSET(0, 0), OFFSET(1, 0), OFFSET(0, 1), OFFSET(1, 1), OFFSET(0, -1), OFFSET(1, -1)],
        [OFFSET(1, 0), OFFSET(1, 1), OFFSET(0, 0), OFFSET(0, 1), OFFSET(2, 0), OFFSET(2, 1)],
    ];
    let base_offset: number = map_grid_offset(x, y);
    let image_offset: number = -1;
    for (let dir: number = 0; dir < 4; dir++) {
        let right_tiles: number = 0;
        let height: number = -1;
        for (let i: number = 0; i < 6; i++) {
            let grid_offset: number = base_offset + offsets[dir][i];
            if (i < 2) {
                if (map_terrain_is(grid_offset, TERRAIN_ELEVATION)) {
                    right_tiles++;
                }
                height = map_elevation_at(grid_offset);
            } else if (i < 4) {
                if (map_terrain_is(grid_offset, TERRAIN_ACCESS_RAMP) &&
                map_elevation_at(grid_offset) < height) {
                right_tiles++;
            }
        } else {
            if (map_terrain_is(grid_offset, TERRAIN_ELEVATION)) {
                if (map_elevation_at(grid_offset) != height) {
                    right_tiles++;
                }
            } else if (map_elevation_at(grid_offset) >= height) {
                right_tiles++;
            }
        }
    }
    if (right_tiles == 6) {
        image_offset = dir;
        break
    }
}
if (image_offset < 0) {
    return -1;
}
switch (city_view_orientation()) {
    case DIR_0_TOP:
        break
    case DIR_6_LEFT:
        image_offset += 1
        break
    case DIR_4_BOTTOM:
        image_offset += 2
        break
    case DIR_2_RIGHT:
        image_offset += 3
        break
}
if (image_offset >= 4) {
    image_offset -= 4
}
return image_offset;
}
function set_elevation_aqueduct_image(grid_offset: number) {
    if (map_aqueduct_at(grid_offset) <= 15 && !map_terrain_is(grid_offset, TERRAIN_BUILDING)) {
        set_aqueduct(grid_offset);
    }
}
function set_elevation_image(x: number, y: number, grid_offset: number) {
    if (map_terrain_is(grid_offset, TERRAIN_ACCESS_RAMP) && !map_image_at(grid_offset)) {
        let image_offset: number = get_access_ramp_image_offset(x, y);
        if (image_offset < 0) {
            map_terrain_remove(grid_offset, TERRAIN_ACCESS_RAMP);
            map_property_set_multi_tile_size(grid_offset, 1);
            map_property_mark_draw_tile(grid_offset);
            if (map_elevation_at(grid_offset)) {
                map_terrain_add(grid_offset, TERRAIN_ELEVATION);
            } else {
                map_terrain_remove(grid_offset, TERRAIN_ELEVATION);
                map_image_set(grid_offset,
                    image_group(GROUP_TERRAIN_GRASS_1) + (map_random_get(grid_offset) & 7));
            }
        } else {
            map_building_tiles_add(0, x, y, 2,
                image_group(GROUP_TERRAIN_ACCESS_RAMP) + image_offset, TERRAIN_ACCESS_RAMP);
        }
    }
    if (map_elevation_at(grid_offset) && !map_terrain_is(grid_offset, TERRAIN_ACCESS_RAMP)) {
        let img: terrain_image = map_image_context_get_elevation(grid_offset, map_elevation_at(grid_offset));
        if (img.group_offset == 44) {
            map_terrain_remove(grid_offset, TERRAIN_ELEVATION);
            let terrain: number = map_terrain_get(grid_offset);
            if (!(terrain & TERRAIN_BUILDING)) {
                map_property_set_multi_tile_xy(grid_offset, 0, 0, true);
                if (terrain & TERRAIN_SHRUB) {
                    map_image_set(grid_offset, image_group(GROUP_TERRAIN_SHRUB) + (map_random_get(grid_offset) & 7));
                } else if (terrain & TERRAIN_TREE) {
                    if (elevation_recalculate_trees) {
                        update_tree_image(x, y, grid_offset);
                    }
                } else if (terrain & TERRAIN_ROAD) {
                    map_tiles_set_road(x, y);
                } else if (terrain & TERRAIN_AQUEDUCT) {
                    set_elevation_aqueduct_image(grid_offset);
                } else if (terrain & TERRAIN_MEADOW) {
                    map_image_set(grid_offset, image_group(GROUP_TERRAIN_MEADOW) + (map_random_get(grid_offset) & 3));
                } else {
                    map_image_set(grid_offset, image_group(GROUP_TERRAIN_GRASS_1) + (map_random_get(grid_offset) & 7));
                }
            }
        } else {
            map_property_set_multi_tile_xy(grid_offset, 0, 0, true);
            map_terrain_add(grid_offset, TERRAIN_ELEVATION);
            map_image_set(grid_offset, image_group(GROUP_TERRAIN_ELEVATION) + img.group_offset + img.item_offset);
        }
    }
}
function update_all_elevation(recalculate_trees: number) {
    elevation_recalculate_trees = recalculate_trees;
    let width: number = map_data.width - 2;
    let height: number = map_data.height - 2;
    foreach_region_tile(0, 0, width, height, clear_access_ramp_image);
    foreach_region_tile(0, 0, width, height, set_elevation_image);
}
export function map_tiles_update_all_elevation() {
    update_all_elevation(0);
}
export function map_tiles_update_all_elevation_editor() {
    update_all_elevation(1);
}
export function map_tiles_add_entry_exit_flags() {
    let entry_orientation: number;
    let entry_point: map_point = scenario_map_entry();
    if (entry_point.x == 0) {
        entry_orientation = DIR_2_RIGHT;
    } else if (entry_point.x == map_data.width - 1) {
        entry_orientation = DIR_6_LEFT;
    } else if (entry_point.y == 0) {
        entry_orientation = DIR_0_TOP;
    } else if (entry_point.y == map_data.height - 1) {
        entry_orientation = DIR_4_BOTTOM;
    } else {
        entry_orientation = -1;
    }
    let exit_orientation: number;
    let exit_point: map_point = scenario_map_exit();
    if (exit_point.x == 0) {
        exit_orientation = DIR_2_RIGHT;
    } else if (exit_point.x == map_data.width - 1) {
        exit_orientation = DIR_6_LEFT;
    } else if (exit_point.y == 0) {
        exit_orientation = DIR_0_TOP;
    } else if (exit_point.y == map_data.height - 1) {
        exit_orientation = DIR_4_BOTTOM;
    } else {
        exit_orientation = -1;
    }
    if (entry_orientation >= 0) {
        let grid_offset: number = map_grid_offset(entry_point.x, entry_point.y);
        let x_tile: number
        let y_tile: number;
        for (let i: number = 1; i < 10; i++) {
            if (map_terrain_exists_clear_tile_in_radius(entry_point.x, entry_point.y,
                1, i, grid_offset, x_tile, y_tile)) {
                break
            }
        }
        let grid_offset_flag: number = city_map_set_entry_flag(x_tile, y_tile);
        map_terrain_add(grid_offset_flag, TERRAIN_ROCK);
        let orientation: number = (city_view_orientation() + entry_orientation) % 8;
        map_image_set(grid_offset_flag, image_group(GROUP_TERRAIN_ENTRY_EXIT_FLAGS) + orientation / 2);
    }
    if (exit_orientation >= 0) {
        let grid_offset: number = map_grid_offset(exit_point.x, exit_point.y);
        let x_tile: number
        let y_tile: number;
        for (let i: number = 1; i < 10; i++) {
            if (map_terrain_exists_clear_tile_in_radius(exit_point.x, exit_point.y,
                1, i, grid_offset, x_tile, y_tile)) {
                break
            }
        }
        let grid_offset_flag: number = city_map_set_exit_flag(x_tile, y_tile);
        map_terrain_add(grid_offset_flag, TERRAIN_ROCK);
        let orientation: number = (city_view_orientation() + exit_orientation) % 8;
        map_image_set(grid_offset_flag, image_group(GROUP_TERRAIN_ENTRY_EXIT_FLAGS) + 4 + orientation / 2);
    }
}
function remove_entry_exit_flag(tile: map_tile) {
    map_terrain_remove(map_grid_offset(tile.x, tile.y), TERRAIN_ROCK);
}
export function map_tiles_remove_entry_exit_flags() {
    remove_entry_exit_flag(city_map_entry_flag());
    remove_entry_exit_flag(city_map_exit_flag());
}
