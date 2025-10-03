
import { building, building_get, building_main, building_next } from 'building/building';
import { building_state, building_type } from 'building/type';
import { city_warning_show, warning_type } from 'city/warning';
import { config_get, config_key } from 'core/config';
import { figure_create_homeless } from 'figuretype/migrant';
import { game_undo_add_building, game_undo_disable, game_undo_restore_building_state, game_undo_restore_map } from 'game/undo';
import { window_invalidate } from 'graphics/window';
import { map_aqueduct_remove } from 'map/aqueduct';
import { map_bridge_count_figures, map_bridge_remove, map_is_bridge } from 'map/bridge';
import { map_building_at } from 'map/building';
import { map_building_tiles_mark_deleting } from 'map/building_tiles';
import { GRID, map_grid_offset, map_grid_start_end_to_area } from 'map/grid';
import { map_property_clear_plaza_or_earthquake, map_property_is_deleted } from 'map/property';
import { map_routing_update_land, map_routing_update_walls, map_routing_update_water } from 'map/routing_terrain';
import { map_terrain_is, map_terrain_remove, terrain } from 'map/terrain';
import { map_tiles_update_all_gardens, map_tiles_update_all_plazas, map_tiles_update_area_roads, map_tiles_update_area_walls, map_tiles_update_region_aqueducts, map_tiles_update_region_empty_land, map_tiles_update_region_meadow, map_tiles_update_region_rubble } from 'map/tiles';
import { popup_dialog_type, window_popup_dialog_show } from 'window/popup_dialog';
import BUILDING_FORT_GROUND = building_type.BUILDING_FORT_GROUND;
import BUILDING_FORT = building_type.BUILDING_FORT;
import BUILDING_NATIVE_HUT = building_type.BUILDING_NATIVE_HUT;
import BUILDING_NATIVE_MEETING = building_type.BUILDING_NATIVE_MEETING;
import BUILDING_NATIVE_CROPS = building_type.BUILDING_NATIVE_CROPS;
import BUILDING_BURNING_RUIN = building_type.BUILDING_BURNING_RUIN;
import BUILDING_STATE_DELETED_BY_PLAYER = building_state.BUILDING_STATE_DELETED_BY_PLAYER;;
import WARNING_PEOPLE_ON_BRIDGE = warning_type.WARNING_PEOPLE_ON_BRIDGE;
import CONFIG_UI_VISUAL_FEEDBACK_ON_DELETE = config_key.CONFIG_UI_VISUAL_FEEDBACK_ON_DELETE;
import GRID_SIZE = GRID.GRID_SIZE;
import TERRAIN_ROCK = terrain.TERRAIN_ROCK;
import TERRAIN_WATER = terrain.TERRAIN_WATER;
import TERRAIN_BUILDING = terrain.TERRAIN_BUILDING;
import TERRAIN_ROAD = terrain.TERRAIN_ROAD;
import TERRAIN_AQUEDUCT = terrain.TERRAIN_AQUEDUCT;
import TERRAIN_ELEVATION = terrain.TERRAIN_ELEVATION;
import TERRAIN_WALL = terrain.TERRAIN_WALL;
import TERRAIN_GATEHOUSE = terrain.TERRAIN_GATEHOUSE;
import TERRAIN_NOT_CLEAR = terrain.TERRAIN_NOT_CLEAR;
import TERRAIN_CLEARABLE = terrain.TERRAIN_CLEARABLE;
import POPUP_DIALOG_DELETE_FORT = popup_dialog_type.POPUP_DIALOG_DELETE_FORT;
import POPUP_DIALOG_DELETE_BRIDGE = popup_dialog_type.POPUP_DIALOG_DELETE_BRIDGE;
export class unnamed20_8 {
    public x_start: number = 0;
    public y_start: number = 0;
    public x_end: number = 0;
    public y_end: number = 0;
    public bridge_confirmed: number = 0;
    public fort_confirmed: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.x_start = args[0]);
        args.length >= 2 && (this.y_start = args[1]);
        args.length >= 3 && (this.x_end = args[2]);
        args.length >= 4 && (this.y_end = args[3]);
        args.length >= 5 && (this.bridge_confirmed = args[4]);
        args.length >= 6 && (this.fort_confirmed = args[5]);
    }
}
let confirm: unnamed20_8 = new unnamed20_8();
function get_deletable_building(grid_offset: number) {
    let building_id: number = map_building_at(grid_offset);
    if (!building_id) {
        return 0;
    }
    let b: building = building_main(building_get(building_id));
    if (b.type == BUILDING_BURNING_RUIN || b.type == BUILDING_NATIVE_CROPS ||
        b.type == BUILDING_NATIVE_HUT || b.type == BUILDING_NATIVE_MEETING) {
        return 0;
    }
    if (b.state == BUILDING_STATE_DELETED_BY_PLAYER || b.is_deleted) {
        return 0;
    }
    return b;
}
function clear_land_confirmed(measure_only: number, x_start: number, y_start: number, x_end: number, y_end: number) {
    let items_placed: number = 0;
    game_undo_restore_building_state();
    game_undo_restore_map(0);
    let x_min: number
    let x_max: number
    let y_min: number
    let y_max: number;
    map_grid_start_end_to_area(x_start, y_start, x_end, y_end, x_min, y_min, x_max, y_max);
    let visual_feedback_on_delete: number = config_get(CONFIG_UI_VISUAL_FEEDBACK_ON_DELETE);
    for (let y: number = y_min; y <= y_max; y++) {
        for (let x: number = x_min; x <= x_max; x++) {
            let grid_offset: number = map_grid_offset(x, y);
            if (measure_only && visual_feedback_on_delete) {
                let b: building = get_deletable_building(grid_offset);
                if (map_property_is_deleted(grid_offset) || (b && map_property_is_deleted(b.grid_offset))) {
                    continue
                }
                map_building_tiles_mark_deleting(grid_offset);
                if (map_terrain_is(grid_offset, TERRAIN_BUILDING)) {
                    if (b) {
                        items_placed++;
                    }
                } else if (map_terrain_is(grid_offset, TERRAIN_ROCK | TERRAIN_ELEVATION)) {
                    continue
                } else if (map_terrain_is(grid_offset, TERRAIN_WATER)) {
                    continue
                } else if (map_terrain_is(grid_offset, TERRAIN_AQUEDUCT)
                    || map_terrain_is(grid_offset, TERRAIN_NOT_CLEAR)) {
                    items_placed++;
                }
                continue
            }
            if (map_terrain_is(grid_offset, TERRAIN_ROCK | TERRAIN_ELEVATION)) {
                continue
            }
            if (map_terrain_is(grid_offset, TERRAIN_BUILDING)) {
                let b: building = get_deletable_building(grid_offset);
                if (!b) {
                    continue
                }
                if (b.type == BUILDING_FORT_GROUND || b.type == BUILDING_FORT) {
                    if (!measure_only && confirm.fort_confirmed != 1) {
                        continue
                    }
                    if (!measure_only && confirm.fort_confirmed == 1) {
                        game_undo_disable();
                    }
                }
                if (b.house_size && b.house_population && !measure_only) {
                    figure_create_homeless(b.x, b.y, b.house_population);
                    b.house_population = 0;
                }
                if (b.state != BUILDING_STATE_DELETED_BY_PLAYER) {
                    items_placed++;
                    game_undo_add_building(b);
                }
                b.state = BUILDING_STATE_DELETED_BY_PLAYER;
                b.is_deleted = 1;
                let space: building = b;
                for (let i: number = 0; i < 9; i++) {
                    if (space.prev_part_building_id <= 0) {
                        break
                    }
                    space = building_get(space.prev_part_building_id);
                    game_undo_add_building(space);
                    space.state = BUILDING_STATE_DELETED_BY_PLAYER;
                }
                space = b;
                for (let i: number = 0; i < 9; i++) {
                    space = building_next(space);
                    if (space.id <= 0) {
                        break
                    }
                    game_undo_add_building(space);
                    space.state = BUILDING_STATE_DELETED_BY_PLAYER;
                }
            } else if (map_terrain_is(grid_offset, TERRAIN_AQUEDUCT)) {
                map_terrain_remove(grid_offset, TERRAIN_CLEARABLE);
                items_placed++;
                map_aqueduct_remove(grid_offset);
            } else if (map_terrain_is(grid_offset, TERRAIN_WATER)) {
                if (!measure_only && map_bridge_count_figures(grid_offset) > 0) {
                    city_warning_show(WARNING_PEOPLE_ON_BRIDGE);
                } else if (confirm.bridge_confirmed == 1) {
                    map_bridge_remove(grid_offset, measure_only);
                    items_placed++;
                }
            } else if (map_terrain_is(grid_offset, TERRAIN_NOT_CLEAR)) {
                if (map_terrain_is(grid_offset, TERRAIN_ROAD)) {
                    map_property_clear_plaza_or_earthquake(grid_offset);
                }
                map_terrain_remove(grid_offset, TERRAIN_CLEARABLE);
                items_placed++;
            }
        }
    }
    if (!measure_only || !visual_feedback_on_delete) {
        let radius: number;
        if (x_max - x_min <= y_max - y_min) {
            radius = y_max - y_min + 3;
        } else {
            radius = x_max - x_min + 3;
        }
        map_tiles_update_region_empty_land(x_min, y_min, x_max, y_max);
        map_tiles_update_region_meadow(x_min, y_min, x_max, y_max);
        map_tiles_update_region_rubble(x_min, y_min, x_max, y_max);
        map_tiles_update_all_gardens();
        map_tiles_update_area_roads(x_min, y_min, radius);
        map_tiles_update_all_plazas();
        map_tiles_update_area_walls(x_min, y_min, radius);
        map_tiles_update_region_aqueducts(x_min - 3, y_min - 3, x_max + 3, y_max + 3);
    }
    if (!measure_only) {
        map_routing_update_land();
        map_routing_update_walls();
        map_routing_update_water();
        window_invalidate();
    }
    return items_placed;
}
function confirm_delete_fort(accepted: number) {
    if (accepted == 1) {
        confirm.fort_confirmed = 1;
    } else {
        confirm.fort_confirmed = -1;
    }
    clear_land_confirmed(0, confirm.x_start, confirm.y_start, confirm.x_end, confirm.y_end);
}
function confirm_delete_bridge(accepted: number) {
    if (accepted == 1) {
        confirm.bridge_confirmed = 1;
    } else {
        confirm.bridge_confirmed = -1;
    }
    clear_land_confirmed(0, confirm.x_start, confirm.y_start, confirm.x_end, confirm.y_end);
}
export function building_construction_clear_land(measure_only: number, x_start: number, y_start: number, x_end: number, y_end: number) {
    confirm.fort_confirmed = 0;
    confirm.bridge_confirmed = 0;
    if (measure_only) {
        return clear_land_confirmed(measure_only, x_start, y_start, x_end, y_end);
    }
    let x_min: number
    let x_max: number
    let y_min: number
    let y_max: number;
    map_grid_start_end_to_area(x_start, y_start, x_end, y_end, x_min, y_min, x_max, y_max);
    let ask_confirm_bridge: number = 0;
    let ask_confirm_fort: number = 0;
    for (let y: number = y_min; y <= y_max; y++) {
        for (let x: number = x_min; x <= x_max; x++) {
            let grid_offset: number = map_grid_offset(x, y);
            let building_id: number = map_building_at(grid_offset);
            if (building_id) {
                let b: building = building_get(building_id);
                if (b.type == BUILDING_FORT || b.type == BUILDING_FORT_GROUND) {
                    ask_confirm_fort = 1;
                }
            }
            if (map_is_bridge(grid_offset)) {
                ask_confirm_bridge = 1;
            }
        }
    }
    confirm.x_start = x_start;
    confirm.y_start = y_start;
    confirm.x_end = x_end;
    confirm.y_end = y_end;
    if (ask_confirm_fort) {
        window_popup_dialog_show(POPUP_DIALOG_DELETE_FORT, confirm_delete_fort, 2);
        return -1;
    } else if (ask_confirm_bridge) {
        window_popup_dialog_show(POPUP_DIALOG_DELETE_BRIDGE, confirm_delete_bridge, 2);
        return -1;
    } else {
        return clear_land_confirmed(measure_only, x_start, y_start, x_end, y_end);
    }
}
