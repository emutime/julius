import { MAX_FIGURES } from 'figure/figure';
import { building_type } from 'building/type';
import BUILDING_NONE = building_type.BUILDING_NONE;
import BUILDING_ROAD = building_type.BUILDING_ROAD;
import BUILDING_WALL = building_type.BUILDING_WALL;
import BUILDING_DRAGGABLE_RESERVOIR = building_type.BUILDING_DRAGGABLE_RESERVOIR;
import BUILDING_AQUEDUCT = building_type.BUILDING_AQUEDUCT;
import BUILDING_CLEAR_LAND = building_type.BUILDING_CLEAR_LAND;
import BUILDING_HOUSE_VACANT_LOT = building_type.BUILDING_HOUSE_VACANT_LOT;
import BUILDING_HIPPODROME = building_type.BUILDING_HIPPODROME;
import BUILDING_PLAZA = building_type.BUILDING_PLAZA;
import BUILDING_GARDENS = building_type.BUILDING_GARDENS;
import BUILDING_DISTRIBUTION_CENTER_UNUSED = building_type.BUILDING_DISTRIBUTION_CENTER_UNUSED;
import BUILDING_TRIUMPHAL_ARCH = building_type.BUILDING_TRIUMPHAL_ARCH;
import BUILDING_GATEHOUSE = building_type.BUILDING_GATEHOUSE;
import BUILDING_TOWER = building_type.BUILDING_TOWER;
import BUILDING_SMALL_TEMPLE_CERES = building_type.BUILDING_SMALL_TEMPLE_CERES;
import BUILDING_SMALL_TEMPLE_VENUS = building_type.BUILDING_SMALL_TEMPLE_VENUS;
import BUILDING_LARGE_TEMPLE_CERES = building_type.BUILDING_LARGE_TEMPLE_CERES;
import BUILDING_LARGE_TEMPLE_VENUS = building_type.BUILDING_LARGE_TEMPLE_VENUS;
import BUILDING_WAREHOUSE = building_type.BUILDING_WAREHOUSE;
import BUILDING_SHIPYARD = building_type.BUILDING_SHIPYARD;
import BUILDING_DOCK = building_type.BUILDING_DOCK;
import BUILDING_WHARF = building_type.BUILDING_WHARF;
import BUILDING_LOW_BRIDGE = building_type.BUILDING_LOW_BRIDGE;
import BUILDING_SHIP_BRIDGE = building_type.BUILDING_SHIP_BRIDGE;
import BUILDING_SENATE = building_type.BUILDING_SENATE;
import BUILDING_RESERVOIR = building_type.BUILDING_RESERVOIR;
import BUILDING_BARRACKS = building_type.BUILDING_BARRACKS;
import BUILDING_MENU_SMALL_TEMPLES = building_type.BUILDING_MENU_SMALL_TEMPLES;
import BUILDING_MENU_LARGE_TEMPLES = building_type.BUILDING_MENU_LARGE_TEMPLES;
import BUILDING_ORACLE = building_type.BUILDING_ORACLE;
import BUILDING_WHEAT_FARM = building_type.BUILDING_WHEAT_FARM;
import BUILDING_VEGETABLE_FARM = building_type.BUILDING_VEGETABLE_FARM;
import BUILDING_FRUIT_FARM = building_type.BUILDING_FRUIT_FARM;
import BUILDING_OLIVE_FARM = building_type.BUILDING_OLIVE_FARM;
import BUILDING_VINES_FARM = building_type.BUILDING_VINES_FARM;
import BUILDING_PIG_FARM = building_type.BUILDING_PIG_FARM;
import BUILDING_MARBLE_QUARRY = building_type.BUILDING_MARBLE_QUARRY;
import BUILDING_IRON_MINE = building_type.BUILDING_IRON_MINE;
import BUILDING_TIMBER_YARD = building_type.BUILDING_TIMBER_YARD;
import BUILDING_CLAY_PIT = building_type.BUILDING_CLAY_PIT;
import { building_type } from 'building/type';
import { house_level } from 'building/type';
import { building_construction_place_building } from 'building/construction_building';
import { building_construction_clear_land } from 'building/construction_clear';;
import { buffer } from 'core/buffer';
import { routed_building_type } from 'map/routing';
import ROUTED_BUILDING_ROAD = routed_building_type.ROUTED_BUILDING_ROAD;
import ROUTED_BUILDING_WALL = routed_building_type.ROUTED_BUILDING_WALL;
import ROUTED_BUILDING_AQUEDUCT = routed_building_type.ROUTED_BUILDING_AQUEDUCT;
import { routed_building_type } from 'map/routing';
import { map_routing_calculate_distances_for_building } from 'map/routing';
import { map_routing_block } from 'map/routing';
import { building_construction_place_road } from 'building/construction_routed';
import { building_construction_place_wall } from 'building/construction_routed';
import { building_construction_place_aqueduct } from 'building/construction_routed';
import { building_construction_place_aqueduct_for_reservoir } from 'building/construction_routed';
import { building_construction_warning_reset } from 'building/construction_warning';
import { building_construction_warning_check_food_stocks } from 'building/construction_warning';
import { building_construction_warning_check_reservoir } from 'building/construction_warning';
import { resource_type } from 'game/resource';
import RESOURCE_MARBLE = resource_type.RESOURCE_MARBLE;
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
import { resource_type } from 'game/resource';
import { workshop_type } from 'game/resource';
import { resource_image_type } from 'game/resource';
import { building_count_total } from 'building/count';
import { model_building } from 'building/model';
import { model_house } from 'building/model';
import { model_get_building } from 'building/model';
import { building_properties } from 'building/properties';
import { building_properties_for_type } from 'building/properties';
import { building } from 'building/building';
import { building_create } from 'building/building';
import { building_is_fort } from 'building/building';
import { map_point } from 'map/point';
import { map_tile } from 'map/point';
import { building_warehouses_remove_resource } from 'building/warehouse';
import { city_buildings_has_senate } from 'city/buildings';
import { city_buildings_has_distribution_center } from 'city/buildings';
import { city_buildings_has_hippodrome } from 'city/buildings';
import { city_finance_out_of_money } from 'city/finance';
import { city_finance_process_construction } from 'city/finance';
import { finance_overview } from 'city/finance';
import { resource_trade_status } from 'city/constants';
import { resource_list } from 'city/resource';
import { city_resource_count } from 'city/resource';
import { view_tile } from 'city/view';
import { map_callback } from 'city/view';
import { city_view_orientation } from 'city/view';
import { warning_type } from 'city/warning';
import WARNING_CLEAR_LAND_NEEDED = warning_type.WARNING_CLEAR_LAND_NEEDED;
import WARNING_OUT_OF_MONEY = warning_type.WARNING_OUT_OF_MONEY;
import WARNING_MARBLE_NEEDED_LARGE_TEMPLE = warning_type.WARNING_MARBLE_NEEDED_LARGE_TEMPLE;
import WARNING_MARBLE_NEEDED_ORACLE = warning_type.WARNING_MARBLE_NEEDED_ORACLE;
import WARNING_MEADOW_NEEDED = warning_type.WARNING_MEADOW_NEEDED;
import WARNING_WATER_NEEDED = warning_type.WARNING_WATER_NEEDED;
import WARNING_ROCK_NEEDED = warning_type.WARNING_ROCK_NEEDED;
import WARNING_TREE_NEEDED = warning_type.WARNING_TREE_NEEDED;
import WARNING_SHORE_NEEDED = warning_type.WARNING_SHORE_NEEDED;
import WARNING_WALL_NEEDED = warning_type.WARNING_WALL_NEEDED;
import WARNING_ENEMY_NEARBY = warning_type.WARNING_ENEMY_NEARBY;
import WARNING_HOUSE_TOO_FAR_FROM_ROAD = warning_type.WARNING_HOUSE_TOO_FAR_FROM_ROAD;
import { warning_type } from 'city/warning';
import { city_warning_show } from 'city/warning';
import { direction_type } from 'core/direction';
import { calc_maximum_distance } from 'core/calc';
import { config_key } from 'core/config';
import CONFIG_UI_SHOW_CONSTRUCTION_SIZE = config_key.CONFIG_UI_SHOW_CONSTRUCTION_SIZE;
import { config_key } from 'core/config';
import { config_string_key } from 'core/config';
import { config_get } from 'core/config';
import { language_type } from 'core/locale';
import { encoding_type } from 'core/encoding';
import { group_terrain } from 'core/image_group';
import GROUP_BUILDING_RESERVOIR = group_terrain.GROUP_BUILDING_RESERVOIR;
import GROUP_BUILDING_HOUSE_VACANT_LOT = group_terrain.GROUP_BUILDING_HOUSE_VACANT_LOT;
import { color_t } from 'graphics/color';
import { image } from 'core/image';
import { image_group } from 'core/image';
import { time_millis } from 'core/time';
import { time_get_millis } from 'core/time';
import { figure_type } from 'figure/type';
import { figure_state } from 'figure/type';
import FIGURE_STATE_ALIVE = figure_state.FIGURE_STATE_ALIVE;
import { formation_state } from 'figure/formation';
import { formation } from 'figure/formation';
import { formation_get_num_legions_cached } from 'figure/formation';
import { formation_move_herds_away } from 'figure/formation';
import { game_undo_add_building } from 'game/undo';
import { game_undo_restore_building_state } from 'game/undo';
import { game_undo_restore_map } from 'game/undo';
import { game_undo_start_build } from 'game/undo';
import { game_undo_finish_build } from 'game/undo';
import { touch_coords } from 'input/touch';
import { touch_mode } from 'input/touch';
import { touch } from 'input/touch';
import { mouse_button } from 'input/mouse';
import { scroll_state } from 'input/mouse';
import { mouse } from 'input/mouse';
import { tooltip_type } from 'graphics/tooltip';
import { tooltip_extra_text_type } from 'graphics/tooltip';
import { tooltip_context } from 'graphics/tooltip';
import { key_type } from 'input/keys';
import { key_modifier_type } from 'input/keys';
import { hotkey_action } from 'core/hotkey_config';
import { hotkey_mapping } from 'core/hotkey_config';
import { hotkeys } from 'input/hotkey';
import { window_id } from 'graphics/window';
import { window_type } from 'graphics/window';
import { window_invalidate } from 'graphics/window';
import { map_aqueduct_set } from 'map/aqueduct';
import { map_bridge_building_length } from 'map/bridge';
import { map_bridge_reset_building_length } from 'map/bridge';
import { map_bridge_add } from 'map/bridge';
import { map_building_is_reservoir } from 'map/building';
import { map_building_tiles_add } from 'map/building_tiles';
import { map_building_tiles_mark_construction } from 'map/building_tiles';
import { map_building_tiles_are_clear } from 'map/building_tiles';
import { GRID } from 'map/grid';
import GRID_SIZE = GRID.GRID_SIZE;
import { map_grid_offset } from 'map/grid';
import { map_grid_start_end_to_area } from 'map/grid';
import { map_image_set } from 'map/image';
import { map_property_mark_draw_tile } from 'map/property';
import { map_property_set_multi_tile_size } from 'map/property';
import { map_property_is_plaza_or_earthquake } from 'map/property';
import { map_property_mark_plaza_or_earthquake } from 'map/property';
import { map_property_mark_constructing } from 'map/property';
import { map_property_clear_constructing_and_deleted } from 'map/property';
import { map_routing_update_land } from 'map/routing_terrain';
import { terrain } from 'map/terrain';
import TERRAIN_TREE = terrain.TERRAIN_TREE;
import TERRAIN_ROCK = terrain.TERRAIN_ROCK;
import TERRAIN_WATER = terrain.TERRAIN_WATER;
import TERRAIN_BUILDING = terrain.TERRAIN_BUILDING;
import TERRAIN_SHRUB = terrain.TERRAIN_SHRUB;
import TERRAIN_GARDEN = terrain.TERRAIN_GARDEN;
import TERRAIN_ROAD = terrain.TERRAIN_ROAD;
import TERRAIN_AQUEDUCT = terrain.TERRAIN_AQUEDUCT;
import TERRAIN_MEADOW = terrain.TERRAIN_MEADOW;
import TERRAIN_WALL = terrain.TERRAIN_WALL;
import TERRAIN_GATEHOUSE = terrain.TERRAIN_GATEHOUSE;
import TERRAIN_NOT_CLEAR = terrain.TERRAIN_NOT_CLEAR;
import TERRAIN_ALL = terrain.TERRAIN_ALL;
import { map_terrain_is } from 'map/terrain';
import { map_terrain_add } from 'map/terrain';
import { map_terrain_exists_tile_in_area_with_type } from 'map/terrain';
import { map_terrain_exists_tile_in_radius_with_type } from 'map/terrain';
import { map_terrain_all_tiles_in_radius_are } from 'map/terrain';
import { map_tiles_update_all_gardens } from 'map/tiles';
import { map_tiles_update_all_plazas } from 'map/tiles';
import { map_tiles_update_all_aqueducts } from 'map/tiles';
import { map_tiles_are_clear } from 'map/tiles';
import { figure } from 'figure/figure';
import { figure_get } from 'figure/figure';
import { figure_is_enemy } from 'figure/figure';
import { map_water_determine_orientation_size2 } from 'map/water';
import { map_water_determine_orientation_size3 } from 'map/water';
export class reservoir_info {
    public cost: number = 0;
    public place_reservoir_at_start: number = 0;
    public place_reservoir_at_end: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.cost = args[0]);
        args.length >= 2 && (this.place_reservoir_at_start = args[1]);
        args.length >= 3 && (this.place_reservoir_at_end = args[2]);
    }
}
export const enum place_reservoir {
    PLACE_RESERVOIR_BLOCKED = -1,
    PLACE_RESERVOIR_NO = 0,
    PLACE_RESERVOIR_YES = 1,
    PLACE_RESERVOIR_EXISTS = 2,
}
class required_terrain {
    public meadow: number = 0;
    public rock: number = 0;
    public tree: number = 0;
    public water: number = 0;
    public wall: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.meadow = args[0]);
        args.length >= 2 && (this.rock = args[1]);
        args.length >= 3 && (this.tree = args[2]);
        args.length >= 4 && (this.water = args[3]);
        args.length >= 5 && (this.wall = args[4]);
    }
}
export class unnamed50_8 {
    public type: building_type = null;
    public sub_type: building_type = null;
    public in_progress: number = 0;
    public start: map_tile = null;
    public end: map_tile = null;
    public cost_preview: number = 0;
    public required_terrain: required_terrain = null;
    public road_orientation: number = 0;
    public road_last_update: time_millis = null;
    public draw_as_constructing: number = 0;
    public start_offset_x_view: number = 0;
    public start_offset_y_view: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.type = args[0]);
        args.length >= 2 && (this.sub_type = args[1]);
        args.length >= 3 && (this.in_progress = args[2]);
        args.length >= 4 && (this.start = args[3]);
        args.length >= 5 && (this.end = args[4]);
        args.length >= 6 && (this.cost_preview = args[5]);
        args.length >= 7 && (this.required_terrain = args[6]);
        args.length >= 8 && (this.road_orientation = args[7]);
        args.length >= 9 && (this.road_last_update = args[8]);
        args.length >= 10 && (this.draw_as_constructing = args[9]);
        args.length >= 11 && (this.start_offset_x_view = args[10]);
        args.length >= 12 && (this.start_offset_y_view = args[11]);
    }
}
let data: unnamed50_8 = new unnamed50_8();
let last_items_cleared: number;
function mark_construction(x: number, y: number, size: number, terrain: number, absolute_xy: number) {
    if (map_building_tiles_mark_construction(x, y, size, terrain, absolute_xy)) {
        data.draw_as_constructing = 1;
    }
}
function place_houses(measure_only: number, x_start: number, y_start: number, x_end: number, y_end: number) {
    let x_min: number
    let x_max: number
    let y_min: number
    let y_max: number;
    map_grid_start_end_to_area(x_start, y_start, x_end, y_end, x_min, y_min, x_max, y_max);
    let needs_road_warning: number = 0;
    let items_placed: number = 0;
    game_undo_restore_building_state();
    for (let y: number = y_min; y <= y_max; y++) {
        for (let x: number = x_min; x <= x_max; x++) {
            let grid_offset: number = map_grid_offset(x, y);
            if (map_terrain_is(grid_offset, TERRAIN_NOT_CLEAR)) {
                continue
            }
            if (measure_only) {
                map_property_mark_constructing(grid_offset);
                items_placed++;
            } else {
                let b: building = building_create(BUILDING_HOUSE_VACANT_LOT, x, y);
                game_undo_add_building(b);
                if (b.id > 0) {
                    items_placed++;
                    map_building_tiles_add(b.id, x, y, 1,
                        image_group(GROUP_BUILDING_HOUSE_VACANT_LOT), TERRAIN_BUILDING);
                    if (!map_terrain_exists_tile_in_radius_with_type(x, y, 1, 2, TERRAIN_ROAD)) {
                        needs_road_warning = 1;
                    }
                }
            }
        }
    }
    if (!measure_only) {
        building_construction_warning_check_food_stocks(BUILDING_HOUSE_VACANT_LOT);
        if (needs_road_warning) {
            city_warning_show(WARNING_HOUSE_TOO_FAR_FROM_ROAD);
        }
        map_routing_update_land();
        window_invalidate();
    }
    return items_placed;
}
function place_plaza(x_start: number, y_start: number, x_end: number, y_end: number) {
    let x_min: number
    let y_min: number
    let x_max: number
    let y_max: number;
    map_grid_start_end_to_area(x_start, y_start, x_end, y_end, x_min, y_min, x_max, y_max);
    game_undo_restore_map(1);
    let items_placed: number = 0;
    for (let y: number = y_min; y <= y_max; y++) {
        for (let x: number = x_min; x <= x_max; x++) {
            let grid_offset: number = map_grid_offset(x, y);
            if (map_terrain_is(grid_offset, TERRAIN_ROAD) &&
                !map_terrain_is(grid_offset, TERRAIN_WATER | TERRAIN_BUILDING | TERRAIN_AQUEDUCT)) {
                if (!map_property_is_plaza_or_earthquake(grid_offset)) {
                    items_placed++;
                }
                map_image_set(grid_offset, 0);
                map_property_mark_plaza_or_earthquake(grid_offset);
                map_property_set_multi_tile_size(grid_offset, 1);
                map_property_mark_draw_tile(grid_offset);
            }
        }
    }
    map_tiles_update_all_plazas();
    return items_placed;
}
function place_garden(x_start: number, y_start: number, x_end: number, y_end: number) {
    game_undo_restore_map(1);
    let x_min: number
    let y_min: number
    let x_max: number
    let y_max: number;
    map_grid_start_end_to_area(x_start, y_start, x_end, y_end, x_min, y_min, x_max, y_max);
    let items_placed: number = 0;
    for (let y: number = y_min; y <= y_max; y++) {
        for (let x: number = x_min; x <= x_max; x++) {
            let grid_offset: number = map_grid_offset(x, y);
            if (!map_terrain_is(grid_offset, TERRAIN_NOT_CLEAR)) {
                items_placed++;
                map_terrain_add(grid_offset, TERRAIN_GARDEN);
            }
        }
    }
    map_tiles_update_all_gardens();
    return items_placed;
}
function place_reservoir_and_aqueducts(measure_only: number, x_start: number, y_start: number, x_end: number, y_end: number, info: reservoir_info) {
    info.cost = 0;
    info.place_reservoir_at_start = PLACE_RESERVOIR_NO;
    info.place_reservoir_at_end = PLACE_RESERVOIR_NO;
    game_undo_restore_map(0);
    let distance: number = calc_maximum_distance(x_start, y_start, x_end, y_end);
    if (measure_only && !data.in_progress) {
        distance = 0;
    }
    if (distance > 0) {
        if (map_building_is_reservoir(x_start - 1, y_start - 1)) {
            info.place_reservoir_at_start = PLACE_RESERVOIR_EXISTS;
        } else if (map_tiles_are_clear(x_start - 1, y_start - 1, 3, TERRAIN_ALL)) {
            info.place_reservoir_at_start = PLACE_RESERVOIR_YES;
        } else {
            info.place_reservoir_at_start = PLACE_RESERVOIR_BLOCKED;
        }
    }
    if (map_building_is_reservoir(x_end - 1, y_end - 1)) {
        info.place_reservoir_at_end = PLACE_RESERVOIR_EXISTS;
    } else if (map_tiles_are_clear(x_end - 1, y_end - 1, 3, TERRAIN_ALL)) {
        info.place_reservoir_at_end = PLACE_RESERVOIR_YES;
    } else {
        info.place_reservoir_at_end = PLACE_RESERVOIR_BLOCKED;
    }
    if (info.place_reservoir_at_start == PLACE_RESERVOIR_BLOCKED
        || info.place_reservoir_at_end == PLACE_RESERVOIR_BLOCKED) {
        return 0;
    }
    if (info.place_reservoir_at_start == PLACE_RESERVOIR_YES
        && info.place_reservoir_at_end == PLACE_RESERVOIR_YES && distance < 3) {
        return 0;
    }
    if (!distance) {
        if (info.place_reservoir_at_end == PLACE_RESERVOIR_YES) {
            info.cost = model_get_building(BUILDING_RESERVOIR).cost;
        }
        return 1;
    }
    if (!map_routing_calculate_distances_for_building(ROUTED_BUILDING_AQUEDUCT, x_start, y_start)) {
        return 0;
    }
    if (info.place_reservoir_at_start != PLACE_RESERVOIR_NO) {
        map_routing_block(x_start - 1, y_start - 1, 3);
        mark_construction(x_start - 1, y_start - 1, 3, TERRAIN_ALL, 1);
    }
    if (info.place_reservoir_at_end != PLACE_RESERVOIR_NO) {
        map_routing_block(x_end - 1, y_end - 1, 3);
        mark_construction(x_end - 1, y_end - 1, 3, TERRAIN_ALL, 1);
    }
    let aqueduct_offsets_x: number[] = [0, 2, 0, - 2]

let aqueduct_offsets_y: number[] = [- 2, 0, 2, 0];
let min_dist: number = 10000;
let min_dir_start: number = 0
let min_dir_end: number = 0;
for (let dir_start: number = 0; dir_start < 4; dir_start++) {
    let dx_start: number = aqueduct_offsets_x[dir_start];
    let dy_start: number = aqueduct_offsets_y[dir_start];
    for (let dir_end: number = 0; dir_end < 4; dir_end++) {
        let dx_end: number = aqueduct_offsets_x[dir_end];
        let dy_end: number = aqueduct_offsets_y[dir_end];
        let dist: number;
        if (building_construction_place_aqueduct_for_reservoir(1,
            x_start + dx_start, y_start + dy_start, x_end + dx_end, y_end + dy_end, dist)) {
            if (dist && dist < min_dist) {
                min_dist = dist;
                min_dir_start = dir_start;
                min_dir_end = dir_end;
            }
        }
    }
}
if (min_dist == 10000) {
    return 0;
}
let x_aq_start: number = aqueduct_offsets_x[min_dir_start];
let y_aq_start: number = aqueduct_offsets_y[min_dir_start];
let x_aq_end: number = aqueduct_offsets_x[min_dir_end];
let y_aq_end: number = aqueduct_offsets_y[min_dir_end];
let aq_items: number;
building_construction_place_aqueduct_for_reservoir(0, x_start + x_aq_start, y_start + y_aq_start,
    x_end + x_aq_end, y_end + y_aq_end, aq_items);
if (info.place_reservoir_at_start == PLACE_RESERVOIR_YES) {
    info.cost += model_get_building(BUILDING_RESERVOIR).cost
}
if (info.place_reservoir_at_end == PLACE_RESERVOIR_YES) {
    info.cost += model_get_building(BUILDING_RESERVOIR).cost
}
if (aq_items) {
    info.cost += aq_items * model_get_building(BUILDING_AQUEDUCT).cost
}
return 1;
}
export function building_construction_set_cost(cost: number) {
    data.cost_preview = cost;
}
export function building_construction_set_type(type: building_type) {
    data.type = type;
    data.sub_type = BUILDING_NONE;
    data.in_progress = 0;
    data.start.x = 0;
    data.start.y = 0;
    data.end.x = 0;
    data.end.y = 0;
    data.cost_preview = 0;
    if (type != BUILDING_NONE) {
        data.required_terrain.wall = 0;
        data.required_terrain.water = 0;
        data.required_terrain.tree = 0;
        data.required_terrain.rock = 0;
        data.required_terrain.meadow = 0;
        data.road_orientation = 0;
        data.road_last_update = time_get_millis();
        data.start.grid_offset = 0;
        switch (type) {
            case BUILDING_WHEAT_FARM:
            case BUILDING_VEGETABLE_FARM:
            case BUILDING_FRUIT_FARM:
            case BUILDING_OLIVE_FARM:
            case BUILDING_VINES_FARM:
            case BUILDING_PIG_FARM:
                data.required_terrain.meadow = 1;
                break
            case BUILDING_MARBLE_QUARRY:
            case BUILDING_IRON_MINE:
                data.required_terrain.rock = 1;
                break
            case BUILDING_TIMBER_YARD:
                data.required_terrain.tree = 1;
                break
            case BUILDING_CLAY_PIT:
                data.required_terrain.water = 1;
                break
            case BUILDING_GATEHOUSE:
            case BUILDING_TRIUMPHAL_ARCH:
                data.road_orientation = 1;
                break
            case BUILDING_TOWER:
                data.required_terrain.wall = 1;
                break
            case BUILDING_MENU_SMALL_TEMPLES:
                data.sub_type = BUILDING_SMALL_TEMPLE_CERES;
                break
            case BUILDING_MENU_LARGE_TEMPLES:
                data.sub_type = BUILDING_LARGE_TEMPLE_CERES;
                break
            default:
                break
        }
    }
}
export function building_construction_clear_type() {
    data.cost_preview = 0;
    data.sub_type = BUILDING_NONE;
    data.type = BUILDING_NONE;
}
export function building_construction_type() {
    return data.sub_type ? data.sub_type : data.type;
}
export function building_construction_cost() {
    return data.cost_preview;
}
export function building_construction_size(x: number, y: number) {
    if (!config_get(CONFIG_UI_SHOW_CONSTRUCTION_SIZE) ||
        !building_construction_is_updatable() || !data.in_progress ||
        (data.type != BUILDING_CLEAR_LAND && !data.cost_preview)) {
        return 0;
    }
    let size_x: number = data.end.x - data.start.x;
    let size_y: number = data.end.y - data.start.y;
    if (size_x < 0) {
        size_x = -size_x;
    }
    if (size_y < 0) {
        size_y = -size_y;
    }
    size_x++;
    size_y++;
    * x = size_x;
    * y = size_y;
    return 1;
}
export function building_construction_in_progress() {
    return data.in_progress;
}
export function building_construction_start(x: number, y: number, grid_offset: number) {
    data.start.grid_offset = grid_offset;
    data.start.x = data.end.x = x;
    data.start.y = data.end.y = y;
    if (game_undo_start_build(data.type)) {
        data.in_progress = 1;
        let can_start: number = 1;
        switch (data.type) {
            case BUILDING_ROAD:
                can_start = map_routing_calculate_distances_for_building(
                    ROUTED_BUILDING_ROAD, data.start.x, data.start.y);
                break
            case BUILDING_AQUEDUCT:
            case BUILDING_DRAGGABLE_RESERVOIR:
                can_start = map_routing_calculate_distances_for_building(
                    ROUTED_BUILDING_AQUEDUCT, data.start.x, data.start.y);
                break
            case BUILDING_WALL:
                can_start = map_routing_calculate_distances_for_building(
                    ROUTED_BUILDING_WALL, data.start.x, data.start.y);
                break
            default:
                break
        }
        if (!can_start) {
            building_construction_cancel();
        }
    }
}
export function building_construction_is_updatable() {
    switch (data.type) {
        case BUILDING_CLEAR_LAND:
        case BUILDING_ROAD:
        case BUILDING_AQUEDUCT:
        case BUILDING_DRAGGABLE_RESERVOIR:
        case BUILDING_WALL:
        case BUILDING_PLAZA:
        case BUILDING_GARDENS:
        case BUILDING_HOUSE_VACANT_LOT:
            return 1;
        default:
            return 0
    }
}
export function building_construction_cancel() {
    map_property_clear_constructing_and_deleted();
    if (data.in_progress && building_construction_is_updatable()) {
        game_undo_restore_building_state();
        game_undo_restore_map(1);
        data.in_progress = 0;
        data.cost_preview = 0;
    } else {
        building_construction_clear_type();
    }
}
export function building_construction_update(x: number, y: number, grid_offset: number) {
    let type: building_type = data.sub_type ? data.sub_type : data.type;
    if (grid_offset) {
        data.end.x = x;
        data.end.y = y;
        data.end.grid_offset = grid_offset;
    } else {
        x = data.end.x;
        y = data.end.y;
        grid_offset = data.end.grid_offset;
    }
    if (!type || city_finance_out_of_money()) {
        data.cost_preview = 0;
        return;
    }
    map_property_clear_constructing_and_deleted();
    let current_cost: number = model_get_building(type).cost;
    if (type == BUILDING_CLEAR_LAND) {
        let items_placed: number = last_items_cleared = building_construction_clear_land(1, data.start.x, data.start.y, x, y);
        if (items_placed >= 0) {
            current_cost *= items_placed
        }
    } else if (type == BUILDING_WALL) {
        let items_placed: number = building_construction_place_wall(1, data.start.x, data.start.y, x, y);
        if (items_placed >= 0) {
            current_cost *= items_placed
        }
    } else if (type == BUILDING_ROAD) {
        let items_placed: number = building_construction_place_road(1, data.start.x, data.start.y, x, y);
        if (items_placed >= 0) {
            current_cost *= items_placed
        }
    } else if (type == BUILDING_PLAZA) {
        let items_placed: number = place_plaza(data.start.x, data.start.y, x, y);
        if (items_placed >= 0) {
            current_cost *= items_placed
        }
    } else if (type == BUILDING_GARDENS) {
        let items_placed: number = place_garden(data.start.x, data.start.y, x, y);
        if (items_placed >= 0) {
            current_cost *= items_placed
        }
    } else if (type == BUILDING_LOW_BRIDGE || type == BUILDING_SHIP_BRIDGE) {
        let length: number = map_bridge_building_length();
        if (length > 1) {
            current_cost *= length
        }
    } else if (type == BUILDING_AQUEDUCT) {
        building_construction_place_aqueduct(data.start.x, data.start.y, x, y, current_cost);
        map_tiles_update_all_aqueducts(0);
    } else if (type == BUILDING_DRAGGABLE_RESERVOIR) {
        let info: reservoir_info;
        place_reservoir_and_aqueducts(1, data.start.x, data.start.y, x, y, info);
        current_cost = info.cost;
        map_tiles_update_all_aqueducts(1);
        data.draw_as_constructing = 0;
    } else if (type == BUILDING_HOUSE_VACANT_LOT) {
        let items_placed: number = place_houses(1, data.start.x, data.start.y, x, y);
        if (items_placed >= 0) {
            current_cost *= items_placed
        }
    } else if (type == BUILDING_GATEHOUSE) {
        mark_construction(x, y, 2, ~TERRAIN_ROAD, 0);
    } else if (type == BUILDING_TRIUMPHAL_ARCH) {
        mark_construction(x, y, 3, ~TERRAIN_ROAD, 0);
    } else if (type == BUILDING_WAREHOUSE) {
        mark_construction(x, y, 3, TERRAIN_ALL, 0);
    } else if (building_is_fort(type)) {
        if (formation_get_num_legions_cached() < 6) {
            let offsets_x: number[] = { 3, 4, 4, 3};
            let offsets_y: number[] = {- 1, -1, 0, 0
        };
        let orient_index: number = city_view_orientation() / 2;
        let x_offset: number = offsets_x[orient_index];
        let y_offset: number = offsets_y[orient_index];
        if (map_building_tiles_are_clear(x, y, 3, TERRAIN_ALL) &&
            map_building_tiles_are_clear(x + x_offset, y + y_offset, 4, TERRAIN_ALL)) {
            mark_construction(x, y, 3, TERRAIN_ALL, 0);
            mark_construction(x + x_offset, y + y_offset, 4, TERRAIN_ALL, 0);
        }
    }
} else if (type == BUILDING_HIPPODROME) {
    if (map_building_tiles_are_clear(x, y, 5, TERRAIN_ALL) &&
        map_building_tiles_are_clear(x + 5, y, 5, TERRAIN_ALL) &&
        map_building_tiles_are_clear(x + 10, y, 5, TERRAIN_ALL) &&
        !city_buildings_has_hippodrome()) {
        mark_construction(x, y, 5, TERRAIN_ALL, 0);
        mark_construction(x + 5, y, 5, TERRAIN_ALL, 0);
        mark_construction(x + 10, y, 5, TERRAIN_ALL, 0);
    }
} else if (type == BUILDING_SHIPYARD || type == BUILDING_WHARF) {
    if (!map_water_determine_orientation_size2(x, y, 1, 0, 0)) {
        data.draw_as_constructing = 1;
    }
} else if (type == BUILDING_DOCK) {
    if (!map_water_determine_orientation_size3(x, y, 1, 0, 0)) {
        data.draw_as_constructing = 1;
    }
} else if (data.required_terrain.meadow || data.required_terrain.rock || data.required_terrain.tree ||
    data.required_terrain.water || data.required_terrain.wall) {
} else {
    if (!(type == BUILDING_SENATE && city_buildings_has_senate()) &&
        !(type == BUILDING_BARRACKS && building_count_total(BUILDING_BARRACKS) > 0) &&
        !(type == BUILDING_DISTRIBUTION_CENTER_UNUSED && city_buildings_has_distribution_center())) {
        let size: number = building_properties_for_type(type).size;
        mark_construction(x, y, size, TERRAIN_ALL, 0);
    }
}
data.cost_preview = current_cost;
}
function has_nearby_enemy(x_start: number, y_start: number, x_end: number, y_end: number) {
    for (let i: number = 1; i < MAX_FIGURES; i++) {
        let f: figure = figure_get(i);
        if (f.state != FIGURE_STATE_ALIVE || !figure_is_enemy(f)) {
            continue
        }
        let dx: number = (f.x > x_start) ? (f.x - x_start) : (x_start - f.x);
        let dy: number = (f.y > y_start) ? (f.y - y_start) : (y_start - f.y);
        if (dx <= 12 && dy <= 12) {
            return 1;
        }
        dx = (f.x > x_end) ? (f.x - x_end) : (x_end - f.x);
        dy = (f.y > y_end) ? (f.y - y_end) : (y_end - f.y);
        if (dx <= 12 && dy <= 12) {
            return 1;
        }
    }
    return 0;
}
export function building_construction_place() {
    data.cost_preview = 0;
    data.in_progress = 0;
    let x_start: number = data.start.x;
    let y_start: number = data.start.y;
    let x_end: number = data.end.x;
    let y_end: number = data.end.y;
    let type: building_type = data.sub_type ? data.sub_type : data.type;
    building_construction_warning_reset();
    if (!type) {
        return;
    }
    if (city_finance_out_of_money()) {
        map_property_clear_constructing_and_deleted();
        city_warning_show(WARNING_OUT_OF_MONEY);
        return;
    }
    if (type >= BUILDING_LARGE_TEMPLE_CERES && type <= BUILDING_LARGE_TEMPLE_VENUS
        && city_resource_count(RESOURCE_MARBLE) < 2) {
        map_property_clear_constructing_and_deleted();
        city_warning_show(WARNING_MARBLE_NEEDED_LARGE_TEMPLE);
        return;
    }
    if (type == BUILDING_ORACLE && city_resource_count(RESOURCE_MARBLE) < 2) {
        map_property_clear_constructing_and_deleted();
        city_warning_show(WARNING_MARBLE_NEEDED_ORACLE);
        return;
    }
    if (type != BUILDING_CLEAR_LAND && has_nearby_enemy(x_start, y_start, x_end, y_end)) {
        if (type == BUILDING_WALL || type == BUILDING_ROAD || type == BUILDING_AQUEDUCT) {
            game_undo_restore_map(0);
        } else if (type == BUILDING_PLAZA || type == BUILDING_GARDENS) {
            game_undo_restore_map(1);
        } else if (type == BUILDING_LOW_BRIDGE || type == BUILDING_SHIP_BRIDGE) {
            map_bridge_reset_building_length();
        } else {
            map_property_clear_constructing_and_deleted();
        }
        city_warning_show(WARNING_ENEMY_NEARBY);
        return;
    }
    let placement_cost: number = model_get_building(type).cost;
    if (type == BUILDING_CLEAR_LAND) {
        let items_placed: number = building_construction_clear_land(0, x_start, y_start, x_end, y_end);
        if (items_placed < 0) {
            items_placed = last_items_cleared;
        }
        placement_cost *= items_placed
        map_property_clear_constructing_and_deleted();
    } else if (type == BUILDING_WALL) {
        placement_cost *= building_construction_place_wall(0, x_start, y_start, x_end, y_end)
    } else if (type == BUILDING_ROAD) {
        placement_cost *= building_construction_place_road(0, x_start, y_start, x_end, y_end)
    } else if (type == BUILDING_PLAZA) {
        placement_cost *= place_plaza(x_start, y_start, x_end, y_end)
    } else if (type == BUILDING_GARDENS) {
        placement_cost *= place_garden(x_start, y_start, x_end, y_end)
        map_routing_update_land();
    } else if (type == BUILDING_LOW_BRIDGE) {
        let length: number = map_bridge_add(x_end, y_end, 0);
        if (length <= 1) {
            city_warning_show(WARNING_SHORE_NEEDED);
            return;
        }
        placement_cost *= length
    } else if (type == BUILDING_SHIP_BRIDGE) {
        let length: number = map_bridge_add(x_end, y_end, 1);
        if (length <= 1) {
            city_warning_show(WARNING_SHORE_NEEDED);
            return;
        }
        placement_cost *= length
    } else if (type == BUILDING_AQUEDUCT) {
        let cost: number;
        if (!building_construction_place_aqueduct(x_start, y_start, x_end, y_end, cost)) {
            city_warning_show(WARNING_CLEAR_LAND_NEEDED);
            return;
        }
        placement_cost = cost;
        map_tiles_update_all_aqueducts(0);
        map_routing_update_land();
    } else if (type == BUILDING_DRAGGABLE_RESERVOIR) {
        let info: reservoir_info;
        if (!place_reservoir_and_aqueducts(0, x_start, y_start, x_end, y_end, info)) {
            map_property_clear_constructing_and_deleted();
            city_warning_show(WARNING_CLEAR_LAND_NEEDED);
            return;
        }
        if (info.place_reservoir_at_start == PLACE_RESERVOIR_YES) {
            let reservoir: building = building_create(BUILDING_RESERVOIR, x_start - 1, y_start - 1);
            game_undo_add_building(reservoir);
            map_building_tiles_add(reservoir.id, x_start - 1, y_start - 1, 3,
                image_group(GROUP_BUILDING_RESERVOIR), TERRAIN_BUILDING);
            map_aqueduct_set(map_grid_offset(x_start - 1, y_start - 1), 0);
        }
        if (info.place_reservoir_at_end == PLACE_RESERVOIR_YES) {
            let reservoir: building = building_create(BUILDING_RESERVOIR, x_end - 1, y_end - 1);
            game_undo_add_building(reservoir);
            map_building_tiles_add(reservoir.id, x_end - 1, y_end - 1, 3,
                image_group(GROUP_BUILDING_RESERVOIR), TERRAIN_BUILDING);
            map_aqueduct_set(map_grid_offset(x_end - 1, y_end - 1), 0);
            if (!map_terrain_exists_tile_in_area_with_type(x_start - 2, y_start - 2, 5, TERRAIN_WATER)
                && info.place_reservoir_at_start == PLACE_RESERVOIR_NO) {
                building_construction_warning_check_reservoir(BUILDING_RESERVOIR);
            }
        }
        placement_cost = info.cost;
        map_tiles_update_all_aqueducts(0);
        map_routing_update_land();
    } else if (type == BUILDING_HOUSE_VACANT_LOT) {
        placement_cost *= place_houses(0, x_start, y_start, x_end, y_end)
    } else if (!building_construction_place_building(type, x_end, y_end)) {
        return;
    }
    if ((type >= BUILDING_LARGE_TEMPLE_CERES && type <= BUILDING_LARGE_TEMPLE_VENUS) || type == BUILDING_ORACLE) {
        building_warehouses_remove_resource(RESOURCE_MARBLE, 2);
    }
    if (data.type == BUILDING_MENU_SMALL_TEMPLES) {
        data.sub_type++;
        if (data.sub_type > BUILDING_SMALL_TEMPLE_VENUS) {
            data.sub_type = BUILDING_SMALL_TEMPLE_CERES;
        }
    }
    if (data.type == BUILDING_MENU_LARGE_TEMPLES) {
        data.sub_type++;
        if (data.sub_type > BUILDING_LARGE_TEMPLE_VENUS) {
            data.sub_type = BUILDING_LARGE_TEMPLE_CERES;
        }
    }
    formation_move_herds_away(x_end, y_end);
    city_finance_process_construction(placement_cost);
    if (type != BUILDING_TRIUMPHAL_ARCH) {
        game_undo_finish_build(placement_cost);
    }
}
function set_warning(warning_id: number, warning: number) {
    if (warning_id) {
        * warning_id = warning;
    }
}
export function building_construction_can_place_on_terrain(x: number, y: number, warning_id: number) {
    if (data.required_terrain.meadow) {
        if (!map_terrain_exists_tile_in_radius_with_type(x, y, 3, 1, TERRAIN_MEADOW)) {
            set_warning(warning_id, WARNING_MEADOW_NEEDED);
            return 0;
        }
    } else if (data.required_terrain.rock) {
        if (!map_terrain_exists_tile_in_radius_with_type(x, y, 2, 1, TERRAIN_ROCK)) {
            set_warning(warning_id, WARNING_ROCK_NEEDED);
            return 0;
        }
    } else if (data.required_terrain.tree) {
        if (!map_terrain_exists_tile_in_radius_with_type(x, y, 2, 1, TERRAIN_SHRUB | TERRAIN_TREE)) {
            set_warning(warning_id, WARNING_TREE_NEEDED);
            return 0;
        }
    } else if (data.required_terrain.water) {
        if (!map_terrain_exists_tile_in_radius_with_type(x, y, 2, 3, TERRAIN_WATER)) {
            set_warning(warning_id, WARNING_WATER_NEEDED);
            return 0;
        }
    } else if (data.required_terrain.wall) {
        if (!map_terrain_all_tiles_in_radius_are(x, y, 2, 0, TERRAIN_WALL)) {
            set_warning(warning_id, WARNING_WALL_NEEDED);
            return 0;
        }
    }
    return 1;
}
export function building_construction_update_road_orientation() {
    if (data.road_orientation > 0) {
        if (time_get_millis() - data.road_last_update > 1500) {
            data.road_last_update = time_get_millis();
            data.road_orientation = data.road_orientation == 1 ? 2 : 1;
        }
    }
}
export function building_construction_road_orientation() {
    return data.road_orientation;
}
export function building_construction_record_view_position(view_x: number, view_y: number, grid_offset: number) {
    if (grid_offset == data.start.grid_offset) {
        data.start_offset_x_view = view_x;
        data.start_offset_y_view = view_y;
    }
}
export function building_construction_get_view_position(view_x: number, view_y: number) {
    * view_x = data.start_offset_x_view;
    * view_y = data.start_offset_y_view;
}
export function building_construction_get_start_grid_offset() {
    return data.start.grid_offset;
}
export function building_construction_reset_draw_as_constructing() {
    data.draw_as_constructing = 0;
}
export function building_construction_draw_as_constructing() {
    return data.draw_as_constructing;
}
