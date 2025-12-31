export const OFFSET = 0;
import { COLOR_MASK_RED } from 'graphics/color';
import { COLOR_MASK_GREEN } from 'graphics/color';
import { COLOR_MASK_BLUE } from 'graphics/color';
import { MAX_LEGIONS } from 'figure/formation';
import { map_point } from 'map/point';
import { map_tile } from 'map/point';
import { building_type } from 'building/type';
import BUILDING_NONE = building_type.BUILDING_NONE;
import BUILDING_ROAD = building_type.BUILDING_ROAD;
import BUILDING_DRAGGABLE_RESERVOIR = building_type.BUILDING_DRAGGABLE_RESERVOIR;
import BUILDING_AQUEDUCT = building_type.BUILDING_AQUEDUCT;
import BUILDING_CLEAR_LAND = building_type.BUILDING_CLEAR_LAND;
import BUILDING_HOUSE_VACANT_LOT = building_type.BUILDING_HOUSE_VACANT_LOT;
import BUILDING_HIPPODROME = building_type.BUILDING_HIPPODROME;
import BUILDING_PLAZA = building_type.BUILDING_PLAZA;
import BUILDING_FORT_LEGIONARIES = building_type.BUILDING_FORT_LEGIONARIES;
import BUILDING_FORT_JAVELIN = building_type.BUILDING_FORT_JAVELIN;
import BUILDING_FORT_MOUNTED = building_type.BUILDING_FORT_MOUNTED;
import BUILDING_BATHHOUSE = building_type.BUILDING_BATHHOUSE;
import BUILDING_FORT_GROUND = building_type.BUILDING_FORT_GROUND;
import BUILDING_TRIUMPHAL_ARCH = building_type.BUILDING_TRIUMPHAL_ARCH;
import BUILDING_FORT = building_type.BUILDING_FORT;
import BUILDING_GATEHOUSE = building_type.BUILDING_GATEHOUSE;
import BUILDING_TOWER = building_type.BUILDING_TOWER;
import BUILDING_GRANARY = building_type.BUILDING_GRANARY;
import BUILDING_WAREHOUSE = building_type.BUILDING_WAREHOUSE;
import BUILDING_SHIPYARD = building_type.BUILDING_SHIPYARD;
import BUILDING_DOCK = building_type.BUILDING_DOCK;
import BUILDING_WHARF = building_type.BUILDING_WHARF;
import BUILDING_LOW_BRIDGE = building_type.BUILDING_LOW_BRIDGE;
import BUILDING_SHIP_BRIDGE = building_type.BUILDING_SHIP_BRIDGE;
import BUILDING_SENATE = building_type.BUILDING_SENATE;
import BUILDING_FOUNTAIN = building_type.BUILDING_FOUNTAIN;
import BUILDING_WELL = building_type.BUILDING_WELL;
import BUILDING_BARRACKS = building_type.BUILDING_BARRACKS;
import { building_type } from 'building/type';
import { house_level } from 'building/type';
import { building_construction_set_cost } from 'building/construction';
import { building_construction_type } from 'building/construction';
import { building_construction_cost } from 'building/construction';
import { building_construction_in_progress } from 'building/construction';
import { building_construction_can_place_on_terrain } from 'building/construction';
import { building_construction_update_road_orientation } from 'building/construction';
import { building_construction_road_orientation } from 'building/construction';
import { building_construction_get_view_position } from 'building/construction';
import { building_construction_get_start_grid_offset } from 'building/construction';
import { building_construction_draw_as_constructing } from 'building/construction';;
import { buffer } from 'core/buffer';
import { resource_type } from 'game/resource';
import { workshop_type } from 'game/resource';
import { resource_image_type } from 'game/resource';
import { building_count_total } from 'building/count';
import { building } from 'building/building';
import { building_is_farm } from 'building/industry';
import { model_building } from 'building/model';
import { model_house } from 'building/model';
import { model_get_building } from 'building/model';
import { building_properties } from 'building/properties';
import { building_properties_for_type } from 'building/properties';
import { city_buildings_has_senate } from 'city/buildings';
import { city_buildings_has_hippodrome } from 'city/buildings';
import { city_finance_out_of_money } from 'city/finance';
import { finance_overview } from 'city/finance';
import { view_tile } from 'city/view';
import { pixel_offset } from 'city/view';
import { map_callback } from 'city/view';
import { city_view_orientation } from 'city/view';
import { city_view_get_selected_tile_pixels } from 'city/view';
import { city_view_foreach_tile_in_range } from 'city/view';
import { config_key } from 'core/config';
import CONFIG_UI_VISUAL_FEEDBACK_ON_DELETE = config_key.CONFIG_UI_VISUAL_FEEDBACK_ON_DELETE;
import CONFIG_UI_SHOW_WATER_STRUCTURE_RANGE = config_key.CONFIG_UI_SHOW_WATER_STRUCTURE_RANGE;
import { config_key } from 'core/config';
import { config_string_key } from 'core/config';
import { config_get } from 'core/config';
import { figure_type } from 'figure/type';
import { formation_state } from 'figure/formation';
import { formation } from 'figure/formation';
import { formation_get_num_legions_cached } from 'figure/formation';
import { language_type } from 'core/locale';
import { encoding_type } from 'core/encoding';
import { group_terrain } from 'core/image_group';
import GROUP_BUILDING_AQUEDUCT = group_terrain.GROUP_BUILDING_AQUEDUCT;
import GROUP_TERRAIN_FLAT_TILE = group_terrain.GROUP_TERRAIN_FLAT_TILE;
import GROUP_BUILDING_RESERVOIR = group_terrain.GROUP_BUILDING_RESERVOIR;
import GROUP_BUILDING_HOUSE_VACANT_LOT = group_terrain.GROUP_BUILDING_HOUSE_VACANT_LOT;
import GROUP_BUILDING_FORT = group_terrain.GROUP_BUILDING_FORT;
import GROUP_BUILDING_DOCK_1 = group_terrain.GROUP_BUILDING_DOCK_1;
import GROUP_BUILDING_WAREHOUSE = group_terrain.GROUP_BUILDING_WAREHOUSE;
import GROUP_BUILDING_WAREHOUSE_STORAGE_EMPTY = group_terrain.GROUP_BUILDING_WAREHOUSE_STORAGE_EMPTY;
import GROUP_TERRAIN_ROAD = group_terrain.GROUP_TERRAIN_ROAD;
import GROUP_BUILDING_DOCK_2 = group_terrain.GROUP_BUILDING_DOCK_2;
import GROUP_BUILDING_DOCK_3 = group_terrain.GROUP_BUILDING_DOCK_3;
import GROUP_BUILDING_DOCK_4 = group_terrain.GROUP_BUILDING_DOCK_4;
import GROUP_BUILDING_TRIUMPHAL_ARCH = group_terrain.GROUP_BUILDING_TRIUMPHAL_ARCH;
import GROUP_BUILDING_HIPPODROME_1 = group_terrain.GROUP_BUILDING_HIPPODROME_1;
import GROUP_BUILDING_HIPPODROME_2 = group_terrain.GROUP_BUILDING_HIPPODROME_2;
import { color_t } from 'graphics/color';
import { image } from 'core/image';
import { image_group } from 'core/image';
import { image_get } from 'core/image';
import { font_t } from 'graphics/font';
import { font_definition } from 'graphics/font';
import { image_draw_masked } from 'graphics/image';
import { image_draw_blend } from 'graphics/image';
import { image_draw_blend_alpha } from 'graphics/image';
import { image_draw_isometric_footprint } from 'graphics/image';
import { image_draw_isometric_top } from 'graphics/image';
import { time_millis } from 'core/time';
import { touch_coords } from 'input/touch';
import { touch_mode } from 'input/touch';
import { touch } from 'input/touch';
import { mouse_button } from 'input/mouse';
import { scroll_state } from 'input/mouse';
import { mouse } from 'input/mouse';
import { scroll_type } from 'input/scroll';
import { scroll_in_progress } from 'input/scroll';
import { map_bridge_calculate_length_direction } from 'map/bridge';
import { map_bridge_get_sprite_id } from 'map/bridge';
import { map_building_is_reservoir } from 'map/building';
import { map_building_tiles_mark_deleting } from 'map/building_tiles';
import { direction_type } from 'core/direction';
import DIR_0_TOP = direction_type.DIR_0_TOP;
import DIR_2_RIGHT = direction_type.DIR_2_RIGHT;
import DIR_4_BOTTOM = direction_type.DIR_4_BOTTOM;
import DIR_6_LEFT = direction_type.DIR_6_LEFT;
import { direction_type } from 'core/direction';
import { figure } from 'figure/figure';
import { map_has_figure_at } from 'map/figure';
import { GRID } from 'map/grid';
import GRID_SIZE = GRID.GRID_SIZE;
import { map_grid_offset_to_x } from 'map/grid';
import { map_grid_offset_to_y } from 'map/grid';
import { map_grid_delta } from 'map/grid';
import { terrain_image } from 'map/image_context';
import { map_image_context_get_aqueduct } from 'map/image_context';
import { map_orientation_for_gatehouse } from 'map/orientation';
import { map_orientation_for_triumphal_arch } from 'map/orientation';
import { map_property_is_plaza_or_earthquake } from 'map/property';
import { map_property_clear_constructing_and_deleted } from 'map/property';
import { map_can_place_road_under_aqueduct } from 'map/road_aqueduct';
import { map_get_aqueduct_with_road_image } from 'map/road_aqueduct';
import { map_is_straight_road_for_aqueduct } from 'map/road_aqueduct';
import { terrain } from 'map/terrain';
import TERRAIN_WATER = terrain.TERRAIN_WATER;
import TERRAIN_ROAD = terrain.TERRAIN_ROAD;
import TERRAIN_RESERVOIR_RANGE = terrain.TERRAIN_RESERVOIR_RANGE;
import TERRAIN_AQUEDUCT = terrain.TERRAIN_AQUEDUCT;
import TERRAIN_WALL = terrain.TERRAIN_WALL;
import TERRAIN_GATEHOUSE = terrain.TERRAIN_GATEHOUSE;
import TERRAIN_NOT_CLEAR = terrain.TERRAIN_NOT_CLEAR;
import TERRAIN_ALL = terrain.TERRAIN_ALL;
import { map_terrain_is } from 'map/terrain';
import { map_terrain_get } from 'map/terrain';
import { map_terrain_has_adjacent_x_with_type } from 'map/terrain';
import { map_terrain_has_adjacent_y_with_type } from 'map/terrain';
import { map_terrain_exists_tile_in_area_with_type } from 'map/terrain';
import { map_tiles_is_paved_road } from 'map/tiles';
import { map_tiles_are_clear } from 'map/tiles';
import { map_water_determine_orientation_size2 } from 'map/water';
import { map_water_determine_orientation_size3 } from 'map/water';
import { scenario_climate } from 'scenario/property';
import CLIMATE_DESERT = scenario_climate.CLIMATE_DESERT;
import { scenario_climate } from 'scenario/property';
import { scenario_property_climate } from 'scenario/property';
import { city_draw_bridge_tile } from 'widget/city_bridge';
let X_VIEW_OFFSETS: number[] = new Array(MAX_TILES).fill({
    0,
    - 30, 30, 0,
    -60, 60, -30, 30, 0,
    -90, 90, -60, 60, -30, 30, 0,
    -120, 120, -90, 90, -60, 60, -30, 30, 0
});
let Y_VIEW_OFFSETS: number[] = new Array(MAX_TILES).fill({
    0,
    15, 15, 30,
    30, 30, 45, 45, 60,
    45, 45, 60, 60, 75, 75, 90,
    60, 60, 75, 75, 90, 90, 105, 105, 120
});
let TILE_GRID_OFFSETS: number[] = new Array(4).fill({
    {
        OFFSET(0,0),
        OFFSET(0,1), OFFSET(1,0), OFFSET(1,1),
        OFFSET(0,2), OFFSET(2,0), OFFSET(1,2), OFFSET(2,1), OFFSET(2,2),
        OFFSET(0,3), OFFSET(3,0), OFFSET(1,3), OFFSET(3,1), OFFSET(2,3), OFFSET(3,2), OFFSET(3,3),
        OFFSET(0,4), OFFSET(4,0), OFFSET(1,4), OFFSET(4,1), OFFSET(2,4), OFFSET(4,2),
        OFFSET(3,4), OFFSET(4,3), OFFSET(4,4)
    },
    {
        OFFSET(0,0),
        OFFSET(- 1, 0), OFFSET(0, 1), OFFSET(-1, 1),
            OFFSET(-2, 0), OFFSET(0, 2), OFFSET(-2, 1), OFFSET(-1, 2), OFFSET(-2, 2),
            OFFSET(-3, 0), OFFSET(0, 3), OFFSET(-3, 1), OFFSET(-1, 3), OFFSET(-3, 2), OFFSET(-2, 3), OFFSET(-3, 3),
            OFFSET(-4, 0), OFFSET(0, 4), OFFSET(-4, 1), OFFSET(-1, 4), OFFSET(-4, 2), OFFSET(-2, 4),
            OFFSET(-4, 3), OFFSET(-3, 4), OFFSET(-4, 4)},
{
    OFFSET(0, 0),
    OFFSET(0, -1), OFFSET(-1, 0), OFFSET(-1, -1),
    OFFSET(0, -2), OFFSET(-2, 0), OFFSET(-1, -2), OFFSET(-2, -1), OFFSET(-2, -2),
    OFFSET(0, -3), OFFSET(-3, 0), OFFSET(-1, -3), OFFSET(-3, -1), OFFSET(-2, -3), OFFSET(-3, -2), OFFSET(-3, -3),
    OFFSET(0, -4), OFFSET(-4, 0), OFFSET(-1, -4), OFFSET(-4, -1), OFFSET(-2, -4), OFFSET(-4, -2),
    OFFSET(-3, -4), OFFSET(-4, -3), OFFSET(-4, -4)
},
{
    OFFSET(0, 0),
    OFFSET(1, 0), OFFSET(0, -1), OFFSET(1, -1),
    OFFSET(2, 0), OFFSET(0, -2), OFFSET(2, -1), OFFSET(1, -2), OFFSET(2, -2),
    OFFSET(3, 0), OFFSET(0, -3), OFFSET(3, -1), OFFSET(1, -3), OFFSET(3, -2), OFFSET(2, -3), OFFSET(3, -3),
    OFFSET(4, 0), OFFSET(0, -4), OFFSET(4, -1), OFFSET(1, -4), OFFSET(4, -2), OFFSET(2, -4),
    OFFSET(4, -3), OFFSET(3, -4), OFFSET(4, -4)
},
});
let FORT_GROUND_GRID_OFFSETS: number[] = new Array(4).fill({ OFFSET(3,- 1), OFFSET(4, -1), OFFSET(4, 0), OFFSET(3, 0)});
let FORT_GROUND_X_VIEW_OFFSETS: number[] = new Array(4).fill({ 120, 90, - 120, -90});
let FORT_GROUND_Y_VIEW_OFFSETS: number[] = new Array(4).fill({ 30, - 75, -60, 45});
let RESERVOIR_GRID_OFFSETS: number[] = new Array(4).fill({ OFFSET(- 1, -1), OFFSET(1, -1), OFFSET(1, 1), OFFSET(-1, 1)});
let HIPPODROME_X_VIEW_OFFSETS: number[] = new Array(4).fill({ 150, 150, - 150, -150});
let HIPPODROME_Y_VIEW_OFFSETS: number[] = new Array(4).fill({ 75, - 75, -75, 75});
export class unnamed88_8 {
    public total: number = 0;
    public save_offsets: number = 0;
    public offsets: number[] = new Array(RESERVOIR_RANGE_MAX_TILES).fill(0);
    public last_grid_offset: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.total = args[0]);
        args.length >= 2 && (this.save_offsets = args[1]);
        args.length >= 3 && (this.offsets = args[2]);
        args.length >= 4 && (this.last_grid_offset = args[3]);
    }
}
let reservoir_range_data: unnamed88_8 = new unnamed88_8();
function draw_flat_tile(x: number, y: number, color_mask: color_t) {
    image_draw_blend(image_group(GROUP_TERRAIN_FLAT_TILE), x, y, color_mask);
}
function is_blocked_for_building(grid_offset: number, num_tiles: number, blocked_tiles: number) {
    let orientation_index: number = city_view_orientation() / 2;
    let blocked: number = 0;
    for (let i: number = 0; i < num_tiles; i++) {
        let tile_offset: number = grid_offset + TILE_GRID_OFFSETS[orientation_index][i];
        let tile_blocked: number = 0;
        if (map_terrain_is(tile_offset, TERRAIN_NOT_CLEAR)) {
            tile_blocked = 1;
        }
        if (map_has_figure_at(tile_offset)) {
            tile_blocked = 1;
        }
        blocked_tiles[i] = tile_blocked;
        blocked += tile_blocked
    }
    return blocked;
}
function draw_partially_blocked(x: number, y: number, fully_blocked: number, num_tiles: number, blocked_tiles: number) {
    for (let i: number = 0; i < num_tiles; i++) {
        let x_offset: number = x + X_VIEW_OFFSETS[i];
        let y_offset: number = y + Y_VIEW_OFFSETS[i];
        if (fully_blocked || blocked_tiles[i]) {
            draw_flat_tile(x_offset, y_offset, COLOR_MASK_RED);
        } else {
            draw_flat_tile(x_offset, y_offset, COLOR_MASK_GREEN);
        }
    }
}
function draw_building(image_id: number, x: number, y: number) {
    image_draw_isometric_footprint(image_id, x, y, COLOR_MASK_GREEN);
    image_draw_isometric_top(image_id, x, y, COLOR_MASK_GREEN);
}
function draw_fountain_range(x: number, y: number, grid_offset: number) {
    image_draw_blend_alpha(image_group(GROUP_TERRAIN_FLAT_TILE), x, y, COLOR_MASK_BLUE);
}
function draw_regular_building(type: building_type, image_id: number, x: number, y: number, grid_offset: number) {
    if (building_is_farm(type)) {
        draw_building(image_id, x, y);
        for (let i: number = 4; i < 9; i++) {
            image_draw_isometric_footprint(image_id + 1,
                x + X_VIEW_OFFSETS[i], y + Y_VIEW_OFFSETS[i], COLOR_MASK_GREEN);
        }
    } else if (type == BUILDING_WAREHOUSE) {
        draw_building(image_id, x, y);
        image_draw_masked(image_group(GROUP_BUILDING_WAREHOUSE) + 17, x - 4, y - 42, COLOR_MASK_GREEN);
        let image_id_space: number = image_group(GROUP_BUILDING_WAREHOUSE_STORAGE_EMPTY);
        for (let i: number = 1; i < 9; i++) {
            draw_building(image_id_space, x + X_VIEW_OFFSETS[i], y + Y_VIEW_OFFSETS[i]);
        }
    } else if (type == BUILDING_GRANARY) {
        image_draw_isometric_footprint(image_id, x, y, COLOR_MASK_GREEN);
        let img: image = image_get(image_id + 1);
        image_draw_masked(image_id + 1,
            x + img.sprite_offset_x - 32, y + img.sprite_offset_y - 64, COLOR_MASK_GREEN);
    } else if (type == BUILDING_HOUSE_VACANT_LOT) {
        draw_building(image_group(GROUP_BUILDING_HOUSE_VACANT_LOT), x, y);
    } else if (type == BUILDING_TRIUMPHAL_ARCH) {
        draw_building(image_id, x, y);
        let img: image = image_get(image_id + 1);
        if (image_id == image_group(GROUP_BUILDING_TRIUMPHAL_ARCH)) {
            image_draw_masked(image_id + 1,
                x + img.sprite_offset_x + 4, y + img.sprite_offset_y - 51, COLOR_MASK_GREEN);
        } else {
            image_draw_masked(image_id + 1,
                x + img.sprite_offset_x - 33, y + img.sprite_offset_y - 56, COLOR_MASK_GREEN);
        }
    } else if (type == BUILDING_WELL) {
        if (config_get(CONFIG_UI_SHOW_WATER_STRUCTURE_RANGE)) {
            city_view_foreach_tile_in_range(grid_offset, 1, 2, draw_fountain_range);
        }
        draw_building(image_id, x, y);
    } else if (type != BUILDING_CLEAR_LAND) {
        draw_building(image_id, x, y);
    }
}
function get_building_image_id(map_x: number, map_y: number, type: building_type, props: building_properties) {
    let image_id: number = image_group(props.image_group) + props.image_offset;
    if (type == BUILDING_GATEHOUSE) {
        let orientation: number = map_orientation_for_gatehouse(map_x, map_y);
        let image_offset: number;
        if (orientation == 2) {
            image_offset = 1;
        } else if (orientation == 1) {
            image_offset = 0;
        } else {
            image_offset = building_construction_road_orientation() == 2 ? 1 : 0;
        }
        let map_orientation: number = city_view_orientation();
        if (map_orientation == DIR_6_LEFT || map_orientation == DIR_2_RIGHT) {
            image_offset = 1 - image_offset;
        }
        image_id += image_offset
    } else if (type == BUILDING_TRIUMPHAL_ARCH) {
        let orientation: number = map_orientation_for_triumphal_arch(map_x, map_y);
        let image_offset: number;
        if (orientation == 2) {
            image_offset = 2;
        } else if (orientation == 1) {
            image_offset = 0;
        } else {
            image_offset = building_construction_road_orientation() == 2 ? 2 : 0;
        }
        let map_orientation: number = city_view_orientation();
        if (map_orientation == DIR_6_LEFT || map_orientation == DIR_2_RIGHT) {
            image_offset = 2 - image_offset;
        }
        image_id += image_offset
    }
    return image_id;
}
function get_building_base_xy(map_x: number, map_y: number, building_size: number, x: number, y: number) {
    switch (city_view_orientation()) {
        case DIR_0_TOP:
            * x = map_x;
        * y = map_y;
            break
        case DIR_2_RIGHT:
            * x = map_x - building_size + 1;
        * y = map_y;
            break
        case DIR_4_BOTTOM:
            * x = map_x - building_size + 1;
        * y = map_y - building_size + 1;
            break
        case DIR_6_LEFT:
            * x = map_x;
        * y = map_y - building_size + 1;
            break
        default:
                    * x = * y = 0
    }
}
function is_fully_blocked(map_x: number, map_y: number, type: building_type, building_size: number, grid_offset: number) {
    let x: number = 0
    let y: number = 0;
    get_building_base_xy(map_x, map_y, building_size, x, y);
    if (!building_construction_can_place_on_terrain(x, y, 0)) {
        return 1;
    }
    if (type == BUILDING_SENATE && city_buildings_has_senate()) {
        return 1;
    }
    if (type == BUILDING_BARRACKS && building_count_total(BUILDING_BARRACKS)) {
        return 1;
    }
    if (type == BUILDING_PLAZA && !map_terrain_is(grid_offset, TERRAIN_ROAD)) {
        return 1;
    }
    if (city_finance_out_of_money()) {
        return 1;
    }
    return 0;
}
function draw_default(tile: map_tile, x_view: number, y_view: number, type: building_type) {
    building_construction_update_road_orientation();
    let props: building_properties = building_properties_for_type(type);
    let building_size: number = type == BUILDING_WAREHOUSE ? 3 : props.size;
    let grid_offset: number = tile.grid_offset;
    let fully_blocked: number = is_fully_blocked(tile.x, tile.y, type, building_size, grid_offset);
    let blocked: number = fully_blocked;
    let num_tiles: number = building_size * building_size;
    let blocked_tiles: number[];
    let orientation_index: number = city_view_orientation() / 2;
    for (let i: number = 0; i < num_tiles; i++) {
        let tile_offset: number = grid_offset + TILE_GRID_OFFSETS[orientation_index][i];
        let forbidden_terrain: number = map_terrain_get(tile_offset) & TERRAIN_NOT_CLEAR;
        if (type == BUILDING_GATEHOUSE || type == BUILDING_TRIUMPHAL_ARCH || type == BUILDING_PLAZA) {
            forbidden_terrain &= ~TERRAIN_ROAD
        }
        if (type == BUILDING_TOWER) {
            forbidden_terrain &= ~TERRAIN_WALL
        }
        if (forbidden_terrain || (map_has_figure_at(tile_offset) && type != BUILDING_PLAZA)) {
            blocked_tiles[i] = blocked = 1;
        } else {
            blocked_tiles[i] = 0;
        }
    }
    if (blocked) {
        draw_partially_blocked(x_view, y_view, fully_blocked, num_tiles, blocked_tiles);
    } else {
        let image_id: number = get_building_image_id(tile.x, tile.y, type, props);
        draw_regular_building(type, image_id, x_view, y_view, grid_offset);
    }
}
function draw_single_reservoir(x: number, y: number, has_water: number) {
    let image_id: number = image_group(GROUP_BUILDING_RESERVOIR);
    draw_building(image_id, x, y);
    if (has_water) {
        let img: image = image_get(image_id);
        let x_water: number = x - 58 + img.sprite_offset_x - 2;
        let y_water: number = y + img.sprite_offset_y - (img.height - 90);
        image_draw_masked(image_id + 1, x_water, y_water, COLOR_MASK_GREEN);
    }
}
function draw_first_reservoir_range(x: number, y: number, grid_offset: number) {
    if (reservoir_range_data.save_offsets) {
        reservoir_range_data.offsets[reservoir_range_data.total] = grid_offset;
        reservoir_range_data.total++;
    }
    image_draw_blend_alpha(image_group(GROUP_TERRAIN_FLAT_TILE), x, y, COLOR_MASK_BLUE);
}
function draw_second_reservoir_range(x: number, y: number, grid_offset: number) {
    for (let i: number = 0; i < reservoir_range_data.total; ++i) {
        if (reservoir_range_data.offsets[i] == grid_offset) {
            return;
        }
    }
    image_draw_blend_alpha(image_group(GROUP_TERRAIN_FLAT_TILE), x, y, COLOR_MASK_BLUE);
}
function draw_draggable_reservoir(tile: map_tile, x: number, y: number) {
    let map_x: number = tile.x - 1;
    let map_y: number = tile.y - 1;
    let blocked: number = 0;
    if (building_construction_in_progress()) {
        if (!building_construction_cost()) {
            blocked = 1;
        }
    } else {
        if (map_building_is_reservoir(map_x, map_y)) {
            blocked = 0;
        } else if (!map_tiles_are_clear(map_x, map_y, 3, TERRAIN_ALL)) {
            blocked = 1;
        }
    }
    if (city_finance_out_of_money()) {
        blocked = 1;
    }
    let draw_later: number = 0;
    let x_start: number
    let y_start: number
    let offset: number;
    let has_water: number = map_terrain_exists_tile_in_area_with_type(map_x - 1, map_y - 1, 5, TERRAIN_WATER);
    let orientation_index: number = city_view_orientation() / 2;
    if (building_construction_in_progress()) {
        building_construction_get_view_position(x_start, y_start);
        y_start -= 30
        if (blocked) {
            for (let i: number = 0; i < 9; i++) {
                draw_flat_tile(x_start + X_VIEW_OFFSETS[i], y_start + Y_VIEW_OFFSETS[i], COLOR_MASK_RED);
            }
        } else {
            offset = building_construction_get_start_grid_offset();
            if (offset != reservoir_range_data.last_grid_offset) {
                reservoir_range_data.last_grid_offset = offset;
                reservoir_range_data.total = 0;
                reservoir_range_data.save_offsets = 1;
            } else {
                reservoir_range_data.save_offsets = 0;
            }
            let map_x_start: number = map_grid_offset_to_x(offset) - 1;
            let map_y_start: number = map_grid_offset_to_y(offset) - 1;
            if (!has_water) {
                has_water = map_terrain_exists_tile_in_area_with_type(
                    map_x_start - 1, map_y_start - 1, 5, TERRAIN_WATER);
            }
            switch (city_view_orientation()) {
                case DIR_0_TOP:
                    draw_later = map_x_start > map_x || map_y_start > map_y;
                    break
                case DIR_2_RIGHT:
                    draw_later = map_x_start < map_x || map_y_start > map_y;
                    break
                case DIR_4_BOTTOM:
                    draw_later = map_x_start < map_x || map_y_start < map_y;
                    break
                case DIR_6_LEFT:
                    draw_later = map_x_start > map_x || map_y_start < map_y;
                    break
            }
            if (!draw_later) {
                if (config_get(CONFIG_UI_SHOW_WATER_STRUCTURE_RANGE)) {
                    city_view_foreach_tile_in_range(offset + RESERVOIR_GRID_OFFSETS[orientation_index],
                        3, 10, draw_first_reservoir_range);
                    city_view_foreach_tile_in_range(tile.grid_offset + RESERVOIR_GRID_OFFSETS[orientation_index],
                        3, 10, draw_second_reservoir_range);
                }
                draw_single_reservoir(x_start, y_start, has_water);
            }
        }
    } else {
        reservoir_range_data.last_grid_offset = -1;
        reservoir_range_data.total = 0;
    }
    y -= 30
    if (config_get(CONFIG_UI_SHOW_WATER_STRUCTURE_RANGE) && (!building_construction_in_progress() || draw_later)) {
        if (draw_later) {
            city_view_foreach_tile_in_range(
                offset + RESERVOIR_GRID_OFFSETS[orientation_index], 3, 10, draw_first_reservoir_range);
        }
        city_view_foreach_tile_in_range(
            tile.grid_offset + RESERVOIR_GRID_OFFSETS[orientation_index], 3, 10, draw_second_reservoir_range);
    }
    if (blocked) {
        for (let i: number = 0; i < 9; i++) {
            draw_flat_tile(x + X_VIEW_OFFSETS[i], y + Y_VIEW_OFFSETS[i], COLOR_MASK_RED);
        }
    } else {
        draw_single_reservoir(x, y, has_water);
        if (draw_later) {
            draw_single_reservoir(x_start, y_start, has_water);
        }
    }
}
function draw_aqueduct(tile: map_tile, x: number, y: number) {
    let grid_offset: number = tile.grid_offset;
    let blocked: number = 0;
    if (building_construction_in_progress()) {
        if (!building_construction_cost()) {
            blocked = 1;
        }
    } else {
        if (map_terrain_is(grid_offset, TERRAIN_ROAD)) {
            blocked = !map_is_straight_road_for_aqueduct(grid_offset);
            if (map_property_is_plaza_or_earthquake(grid_offset)) {
                blocked = 1;
            }
        } else if (map_terrain_is(grid_offset, TERRAIN_NOT_CLEAR)) {
            blocked = 1;
        }
    }
    if (city_finance_out_of_money()) {
        blocked = 1;
    }
    if (blocked) {
        draw_flat_tile(x, y, COLOR_MASK_RED);
    } else {
        let image_id: number = image_group(GROUP_BUILDING_AQUEDUCT);
        let img: terrain_image = map_image_context_get_aqueduct(grid_offset, 1);
        if (map_terrain_is(grid_offset, TERRAIN_ROAD)) {
            let group_offset: number = img.group_offset;
            if (!img.aqueduct_offset) {
                if (map_terrain_is(grid_offset + map_grid_delta(0, -1), TERRAIN_ROAD)) {
                    group_offset = 3;
                } else {
                    group_offset = 2;
                }
            }
            if (map_tiles_is_paved_road(grid_offset)) {
                image_id += group_offset + 13
            } else {
                image_id += group_offset + 21
            }
        } else {
            image_id += img.group_offset + 15
        }
        draw_building(image_id, x, y);
    }
}
function draw_fountain(tile: map_tile, x: number, y: number) {
    if (city_finance_out_of_money()) {
        draw_flat_tile(x, y, COLOR_MASK_RED);
    } else {
        let blocked_tiles: number = 0;
        let blocked: number = is_blocked_for_building(tile.grid_offset, 1, blocked_tiles);
        let color_mask: number = blocked ? COLOR_MASK_RED : COLOR_MASK_GREEN;
        let image_id: number = image_group(building_properties_for_type(BUILDING_FOUNTAIN).image_group);
        if (config_get(CONFIG_UI_SHOW_WATER_STRUCTURE_RANGE)) {
            city_view_foreach_tile_in_range(tile.grid_offset, 1,
                scenario_property_climate() == CLIMATE_DESERT ? 3 : 4, draw_fountain_range);
        }
        image_draw_isometric_footprint(image_id, x, y, color_mask);
        image_draw_isometric_top(image_id, x, y, color_mask);
        if (map_terrain_is(tile.grid_offset, TERRAIN_RESERVOIR_RANGE)) {
            let img: image = image_get(image_id);
            image_draw_masked(image_id + 1, x + img.sprite_offset_x, y + img.sprite_offset_y, color_mask);
        }
    }
}
function draw_bathhouse(tile: map_tile, x: number, y: number) {
    let grid_offset: number = tile.grid_offset;
    let num_tiles: number = 4;
    let blocked_tiles: number[];
    let blocked: number = is_blocked_for_building(grid_offset, num_tiles, blocked_tiles);
    let fully_blocked: number = 0;
    if (city_finance_out_of_money()) {
        fully_blocked = 1;
        blocked = 1;
    }
    if (blocked) {
        draw_partially_blocked(x, y, fully_blocked, num_tiles, blocked_tiles);
    } else {
        let image_id: number = image_group(building_properties_for_type(BUILDING_BATHHOUSE).image_group);
        let has_water: number = 0;
        let orientation_index: number = city_view_orientation() / 2;
        for (let i: number = 0; i < num_tiles; i++) {
            let tile_offset: number = grid_offset + TILE_GRID_OFFSETS[orientation_index][i];
            if (map_terrain_is(tile_offset, TERRAIN_RESERVOIR_RANGE)) {
                has_water = 1;
            }
        }
        draw_building(image_id, x, y);
        if (has_water) {
            let img: image = image_get(image_id);
            image_draw_masked(image_id - 1, x + img.sprite_offset_x - 7, y + img.sprite_offset_y + 6, COLOR_MASK_GREEN);
        }
    }
}
function draw_bridge(tile: map_tile, x: number, y: number, type: building_type) {
    let length: number
    let direction: number;
    let end_grid_offset: number = map_bridge_calculate_length_direction(tile.x, tile.y, length, direction);
    let dir: number = direction - city_view_orientation();
    if (dir < 0) {
        dir += 8
    }
    let blocked: number = 0;
    if (type == BUILDING_SHIP_BRIDGE && length < 5) {
        blocked = 1;
    } else if (!end_grid_offset) {
        blocked = 1;
    }
    if (city_finance_out_of_money()) {
        blocked = 1;
    }
    let x_delta: number
    let y_delta: number;
    switch (dir) {
        case DIR_0_TOP:
            x_delta = 29;
            y_delta = -15;
            break
        case DIR_2_RIGHT:
            x_delta = 29;
            y_delta = 15;
            break
        case DIR_4_BOTTOM:
            x_delta = -29;
            y_delta = 15;
            break
        case DIR_6_LEFT:
            x_delta = -29;
            y_delta = -15;
            break
        default:
            return
    }
    if (blocked) {
        draw_flat_tile(x, y, length > 0 ? COLOR_MASK_GREEN : COLOR_MASK_RED);
        if (length > 1) {
            draw_flat_tile(x + x_delta * (length - 1), y + y_delta * (length - 1), COLOR_MASK_RED);
        }
        building_construction_set_cost(0);
    } else {
        if (dir == DIR_0_TOP || dir == DIR_6_LEFT) {
            for (let i: number = length - 1; i >= 0; i--) {
                let sprite_id: number = map_bridge_get_sprite_id(i, length, dir, type == BUILDING_SHIP_BRIDGE);
                city_draw_bridge_tile(x + x_delta * i, y + y_delta * i, sprite_id, COLOR_MASK_GREEN);
            }
        } else {
            for (let i: number = 0; i < length; i++) {
                let sprite_id: number = map_bridge_get_sprite_id(i, length, dir, type == BUILDING_SHIP_BRIDGE);
                city_draw_bridge_tile(x + x_delta * i, y + y_delta * i, sprite_id, COLOR_MASK_GREEN);
            }
        }
        building_construction_set_cost(model_get_building(type).cost * length);
    }
}
function draw_fort(tile: map_tile, x: number, y: number) {
    let fully_blocked: number = 0;
    let blocked: number = 0;
    if (formation_get_num_legions_cached() >= MAX_LEGIONS || city_finance_out_of_money()) {
        fully_blocked = 1;
        blocked = 1;
    }
    let num_tiles_fort: number = building_properties_for_type(BUILDING_FORT).size;
    num_tiles_fort *= num_tiles_fort
    let num_tiles_ground: number = building_properties_for_type(BUILDING_FORT_GROUND).size;
    num_tiles_ground *= num_tiles_ground
    let orientation_index: number = city_view_orientation() / 2;
    let grid_offset_fort: number = tile.grid_offset;
    let grid_offset_ground: number = grid_offset_fort + FORT_GROUND_GRID_OFFSETS[orientation_index];
    let blocked_tiles_fort: number[];
    let blocked_tiles_ground: number[];
    blocked += is_blocked_for_building(grid_offset_fort, num_tiles_fort, blocked_tiles_fort)
    blocked += is_blocked_for_building(grid_offset_ground, num_tiles_ground, blocked_tiles_ground)
    let x_ground: number = x + FORT_GROUND_X_VIEW_OFFSETS[orientation_index];
    let y_ground: number = y + FORT_GROUND_Y_VIEW_OFFSETS[orientation_index];
    if (blocked) {
        draw_partially_blocked(x, y, fully_blocked, num_tiles_fort, blocked_tiles_fort);
        draw_partially_blocked(x_ground, y_ground, fully_blocked, num_tiles_ground, blocked_tiles_ground);
    } else {
        let image_id: number = image_group(GROUP_BUILDING_FORT);
        if (orientation_index == 0 || orientation_index == 3) {
            draw_building(image_id, x, y);
            draw_building(image_id + 1, x_ground, y_ground);
        } else {
            draw_building(image_id + 1, x_ground, y_ground);
            draw_building(image_id, x, y);
        }
    }
}
function draw_hippodrome(tile: map_tile, x: number, y: number) {
    let fully_blocked: number = 0;
    let blocked: number = 0;
    if (city_buildings_has_hippodrome() || city_finance_out_of_money()) {
        fully_blocked = 1;
        blocked = 1;
    }
    let num_tiles: number = 25;
    let orientation_index: number = city_view_orientation() / 2;
    let grid_offset1: number = tile.grid_offset;
    let grid_offset2: number = grid_offset1 + map_grid_delta(5, 0);
    let grid_offset3: number = grid_offset1 + map_grid_delta(10, 0);
    let blocked_tiles1: number[];
    let blocked_tiles2: number[];
    let blocked_tiles3: number[];
    blocked += is_blocked_for_building(grid_offset1, num_tiles, blocked_tiles1)
    blocked += is_blocked_for_building(grid_offset2, num_tiles, blocked_tiles2)
    blocked += is_blocked_for_building(grid_offset3, num_tiles, blocked_tiles3)
    let x_part1: number = x;
    let y_part1: number = y;
    let x_part2: number = x_part1 + HIPPODROME_X_VIEW_OFFSETS[orientation_index];
    let y_part2: number = y_part1 + HIPPODROME_Y_VIEW_OFFSETS[orientation_index];
    let x_part3: number = x_part2 + HIPPODROME_X_VIEW_OFFSETS[orientation_index];
    let y_part3: number = y_part2 + HIPPODROME_Y_VIEW_OFFSETS[orientation_index];
    if (blocked) {
        draw_partially_blocked(x_part1, y_part1, fully_blocked, num_tiles, blocked_tiles1);
        draw_partially_blocked(x_part2, y_part2, fully_blocked, num_tiles, blocked_tiles2);
        draw_partially_blocked(x_part3, y_part3, fully_blocked, num_tiles, blocked_tiles3);
    } else {
        if (orientation_index == 0) {
            let image_id: number = image_group(GROUP_BUILDING_HIPPODROME_2);
            draw_building(image_id, x_part1, y_part1);
            draw_building(image_id + 2, x_part2, y_part2);
            draw_building(image_id + 4, x_part3, y_part3);
        } else if (orientation_index == 1) {
            let image_id: number = image_group(GROUP_BUILDING_HIPPODROME_1);
            draw_building(image_id, x_part3, y_part3);
            draw_building(image_id + 2, x_part2, y_part2);
            draw_building(image_id + 4, x_part1, y_part1);
        } else if (orientation_index == 2) {
            let image_id: number = image_group(GROUP_BUILDING_HIPPODROME_2);
            draw_building(image_id + 4, x_part1, y_part1);
            draw_building(image_id + 2, x_part2, y_part2);
            draw_building(image_id, x_part3, y_part3);
        } else if (orientation_index == 3) {
            let image_id: number = image_group(GROUP_BUILDING_HIPPODROME_1);
            draw_building(image_id + 4, x_part3, y_part3);
            draw_building(image_id + 2, x_part2, y_part2);
            draw_building(image_id, x_part1, y_part1);
        }
    }
}
function draw_shipyard_wharf(tile: map_tile, x: number, y: number, type: building_type) {
    let dir_absolute: number
    let dir_relative: number;
    let blocked: number = map_water_determine_orientation_size2(tile.x, tile.y, 1, dir_absolute, dir_relative);
    if (city_finance_out_of_money()) {
        blocked = 999;
    }
    if (blocked) {
        for (let i: number = 0; i < 4; i++) {
            draw_flat_tile(x + X_VIEW_OFFSETS[i], y + Y_VIEW_OFFSETS[i], COLOR_MASK_RED);
        }
    } else {
        let props: building_properties = building_properties_for_type(type);
        let image_id: number = image_group(props.image_group) + props.image_offset + dir_relative;
        draw_building(image_id, x, y);
    }
}
function draw_dock(tile: map_tile, x: number, y: number) {
    let dir_absolute: number
    let dir_relative: number;
    let blocked: number = map_water_determine_orientation_size3(tile.x, tile.y, 1, dir_absolute, dir_relative);
    if (city_finance_out_of_money()) {
        blocked = 1;
    }
    if (blocked) {
        for (let i: number = 0; i < 9; i++) {
            draw_flat_tile(x + X_VIEW_OFFSETS[i], y + Y_VIEW_OFFSETS[i], COLOR_MASK_RED);
        }
    } else {
        let image_id: number;
        switch (dir_relative) {
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
        draw_building(image_id, x, y);
    }
}
function draw_road(tile: map_tile, x: number, y: number) {
    let grid_offset: number = tile.grid_offset;
    let blocked: number = 0;
    let image_id: number = 0;
    if (map_terrain_is(grid_offset, TERRAIN_AQUEDUCT)) {
        image_id = image_group(GROUP_BUILDING_AQUEDUCT);
        if (map_can_place_road_under_aqueduct(grid_offset)) {
            image_id += map_get_aqueduct_with_road_image(grid_offset)
        } else {
            blocked = 1;
        }
    } else if (map_terrain_is(grid_offset, TERRAIN_NOT_CLEAR)) {
        blocked = 1;
    } else {
        image_id = image_group(GROUP_TERRAIN_ROAD);
        if (!map_terrain_has_adjacent_x_with_type(grid_offset, TERRAIN_ROAD) &&
            map_terrain_has_adjacent_y_with_type(grid_offset, TERRAIN_ROAD)) {
            image_id++;
        }
    }
    if (city_finance_out_of_money()) {
        blocked = 1;
    }
    if (blocked) {
        draw_flat_tile(x, y, COLOR_MASK_RED);
    } else {
        draw_building(image_id, x, y);
    }
}
export function city_building_ghost_mark_deleting(tile: map_tile) {
    if (!config_get(CONFIG_UI_VISUAL_FEEDBACK_ON_DELETE)) {
        return 0;
    }
    let construction_type: number = building_construction_type();
    if (!tile.grid_offset || building_construction_draw_as_constructing() ||
        scroll_in_progress() || construction_type != BUILDING_CLEAR_LAND) {
        return (construction_type == BUILDING_CLEAR_LAND);
    }
    if (!building_construction_in_progress()) {
        map_property_clear_constructing_and_deleted();
    }
    map_building_tiles_mark_deleting(tile.grid_offset);
    return 1;
}
export function city_building_ghost_draw(tile: map_tile) {
    if (!tile.grid_offset || scroll_in_progress()) {
        return;
    }
    let type: building_type = building_construction_type();
    if (building_construction_draw_as_constructing() || type == BUILDING_NONE || type == BUILDING_CLEAR_LAND) {
        return;
    }
    let x: number
    let y: number;
    city_view_get_selected_tile_pixels(x, y);
    switch (type) {
        case BUILDING_DRAGGABLE_RESERVOIR:
            draw_draggable_reservoir(tile, x, y);
            break
        case BUILDING_AQUEDUCT:
            draw_aqueduct(tile, x, y);
            break
        case BUILDING_FOUNTAIN:
            draw_fountain(tile, x, y);
            break
        case BUILDING_BATHHOUSE:
            draw_bathhouse(tile, x, y);
            break
        case BUILDING_LOW_BRIDGE:
        case BUILDING_SHIP_BRIDGE:
            draw_bridge(tile, x, y, type);
            break
        case BUILDING_FORT_LEGIONARIES:
        case BUILDING_FORT_JAVELIN:
        case BUILDING_FORT_MOUNTED:
            draw_fort(tile, x, y);
            break
        case BUILDING_HIPPODROME:
            draw_hippodrome(tile, x, y);
            break
        case BUILDING_SHIPYARD:
        case BUILDING_WHARF:
            draw_shipyard_wharf(tile, x, y, type);
            break
        case BUILDING_DOCK:
            draw_dock(tile, x, y);
            break
        case BUILDING_ROAD:
            draw_road(tile, x, y);
            break
        default:
            draw_default(tile, x, y, type)
            break
    }
}
