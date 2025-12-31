export const MAX_UNDO_BUILDINGS = 50;
import { building, building_get, building_is_house, building_set, MAX_BUILDINGS } from 'building/building';
import { building_is_farm } from 'building/industry';
import { building_properties_for_type } from 'building/properties';
import { building_storage_reset_building_ids, building_storage_restore } from 'building/storage';
import { building_state, building_type } from 'building/type';
import { building_warehouses_add_resource } from 'building/warehouse';
import { city_finance_process_construction } from 'city/finance';
import { image_group } from 'core/image';
import { group_terrain } from 'core/image_group';
import { resource_type } from 'game/resource';
import { window_invalidate } from 'graphics/window';
import { map_aqueduct_backup, map_aqueduct_restore } from 'map/aqueduct';
import { map_building_at } from 'map/building';
import { map_building_tiles_add, map_building_tiles_add_farm } from 'map/building_tiles';
import { GRID, map_grid_offset, map_grid_size } from 'map/grid';
import { map_image_backup, map_image_restore, map_image_restore_at } from 'map/image';
import { map_property_backup, map_property_clear_constructing_and_deleted, map_property_restore } from 'map/property';
import { map_routing_update_land, map_routing_update_walls } from 'map/routing_terrain';
import { map_sprite_backup, map_sprite_restore } from 'map/sprite';
import { map_terrain_backup, map_terrain_restore, terrain } from 'map/terrain';
import { scenario_earthquake_is_in_progress } from 'scenario/earthquake';
import BUILDING_ROAD = building_type.BUILDING_ROAD;
import BUILDING_WALL = building_type.BUILDING_WALL;
import BUILDING_DRAGGABLE_RESERVOIR = building_type.BUILDING_DRAGGABLE_RESERVOIR;
import BUILDING_AQUEDUCT = building_type.BUILDING_AQUEDUCT;
import BUILDING_CLEAR_LAND = building_type.BUILDING_CLEAR_LAND;
import BUILDING_HOUSE_VACANT_LOT = building_type.BUILDING_HOUSE_VACANT_LOT;
import BUILDING_PLAZA = building_type.BUILDING_PLAZA;
import BUILDING_GARDENS = building_type.BUILDING_GARDENS;
import BUILDING_LARGE_TEMPLE_CERES = building_type.BUILDING_LARGE_TEMPLE_CERES;
import BUILDING_LARGE_TEMPLE_VENUS = building_type.BUILDING_LARGE_TEMPLE_VENUS;
import BUILDING_GRANARY = building_type.BUILDING_GRANARY;
import BUILDING_WAREHOUSE = building_type.BUILDING_WAREHOUSE;
import BUILDING_WHARF = building_type.BUILDING_WHARF;
import BUILDING_LOW_BRIDGE = building_type.BUILDING_LOW_BRIDGE;
import BUILDING_SHIP_BRIDGE = building_type.BUILDING_SHIP_BRIDGE;
import BUILDING_ORACLE = building_type.BUILDING_ORACLE;
import BUILDING_WHEAT_FARM = building_type.BUILDING_WHEAT_FARM;
import BUILDING_VEGETABLE_FARM = building_type.BUILDING_VEGETABLE_FARM;
import BUILDING_FRUIT_FARM = building_type.BUILDING_FRUIT_FARM;
import BUILDING_OLIVE_FARM = building_type.BUILDING_OLIVE_FARM;
import BUILDING_VINES_FARM = building_type.BUILDING_VINES_FARM;
import BUILDING_PIG_FARM = building_type.BUILDING_PIG_FARM;
import BUILDING_STATE_IN_USE = building_state.BUILDING_STATE_IN_USE;
import BUILDING_STATE_UNDO = building_state.BUILDING_STATE_UNDO;
import BUILDING_STATE_RUBBLE = building_state.BUILDING_STATE_RUBBLE;
import BUILDING_STATE_DELETED_BY_GAME = building_state.BUILDING_STATE_DELETED_BY_GAME;
import BUILDING_STATE_DELETED_BY_PLAYER = building_state.BUILDING_STATE_DELETED_BY_PLAYER;;
import RESOURCE_MARBLE = resource_type.RESOURCE_MARBLE;
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
import GROUP_BUILDING_FARM_CROPS = group_terrain.GROUP_BUILDING_FARM_CROPS;
import GRID_SIZE = GRID.GRID_SIZE;
import TERRAIN_WALL = terrain.TERRAIN_WALL;
import TERRAIN_GATEHOUSE = terrain.TERRAIN_GATEHOUSE;
export class unnamed26_8 {
    public available: number = 0;
    public ready: number = 0;
    public timeout_ticks: number = 0;
    public building_cost: number = 0;
    public num_buildings: number = 0;
    public type: building_type = null;
    public buildings: building[] = new Array(MAX_UNDO_BUILDINGS).fill(null);
    public constructor(...args: any[]) {
        args.length >= 1 && (this.available = args[0]);
        args.length >= 2 && (this.ready = args[1]);
        args.length >= 3 && (this.timeout_ticks = args[2]);
        args.length >= 4 && (this.building_cost = args[3]);
        args.length >= 5 && (this.num_buildings = args[4]);
        args.length >= 6 && (this.type = args[5]);
        args.length >= 7 && (this.buildings = args[6]);
    }
}
let data: unnamed26_8 = new unnamed26_8();
export function game_can_undo() {
    return data.ready && data.available;
}
export function game_undo_disable() {
    data.available = 0;
}
export function game_undo_add_building(b: building) {
    if (b.id <= 0) {
        return;
    }
    data.num_buildings = 0;
    let is_on_list: number = 0;
    for (let i: number = 0; i < MAX_UNDO_BUILDINGS; i++) {
        if (data.buildings[i].id) {
            data.num_buildings++;
        }
        if (data.buildings[i].id == b.id) {
            is_on_list = 1;
        }
    }
    if (!is_on_list) {
        for (let i: number = 0; i < MAX_UNDO_BUILDINGS; i++) {
            if (!data.buildings[i].id) {
                data.num_buildings++;
                data.buildings[i] = { ...b };
                return;
            }
        }
        data.available = 0;
    }
}
export function game_undo_contains_building(building_id: number) {
    if (building_id <= 0 || !game_can_undo()) {
        return 0;
    }
    if (data.num_buildings <= 0) {
        return 0;
    }
    for (let i: number = 0; i < MAX_UNDO_BUILDINGS; i++) {
        if (data.buildings[i].id == building_id) {
            return 1;
        }
    }
    return 0;
}
function clear_buildings() {
    data.num_buildings = 0;
    data.buildings.fill(null);
}
export function game_undo_start_build(type: building_type) {
    data.ready = 0;
    data.available = 1;
    data.timeout_ticks = 0;
    data.building_cost = 0;
    data.type = type;
    clear_buildings();
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state == BUILDING_STATE_UNDO) {
            data.available = 0;
            return 0;
        }
        if (b.state == BUILDING_STATE_DELETED_BY_PLAYER) {
            data.available = 0;
        }
    }
    map_image_backup();
    map_terrain_backup();
    map_aqueduct_backup();
    map_property_backup();
    map_sprite_backup();
    return 1;
}
export function game_undo_restore_building_state() {
    for (let i: number = 0; i < data.num_buildings; i++) {
        if (data.buildings[i].id) {
            let b: building = building_get(data.buildings[i].id);
            if (b.state == BUILDING_STATE_DELETED_BY_PLAYER) {
                b.state = BUILDING_STATE_IN_USE;
            }
            b.is_deleted = 0;
        }
    }
    clear_buildings();
}
function restore_map_images() {
    let map_width: number
    let map_height: number;
    map_grid_size(map_width, map_height);
    for (let y: number = 0; y < map_height; y++) {
        for (let x: number = 0; x < map_width; x++) {
            let grid_offset: number = map_grid_offset(x, y);
            if (!map_building_at(grid_offset)) {
                map_image_restore_at(grid_offset);
            }
        }
    }
}
export function game_undo_restore_map(include_properties: number) {
    map_terrain_restore();
    map_aqueduct_restore();
    if (include_properties) {
        map_property_restore();
    }
    restore_map_images();
}
export function game_undo_finish_build(cost: number) {
    data.ready = 1;
    data.timeout_ticks = 500;
    data.building_cost = cost;
    window_invalidate();
}
function add_building_to_terrain(b: building) {
    if (b.id <= 0) {
        return;
    }
    if (building_is_farm(b.type)) {
        let image_offset: number;
        switch (b.type) {
            default:
            case BUILDING_WHEAT_FARM: image_offset = 0
                break
            case BUILDING_VEGETABLE_FARM:
                image_offset = 5;
                break
            case BUILDING_FRUIT_FARM:
                image_offset = 10;
                break
            case BUILDING_OLIVE_FARM:
                image_offset = 15;
                break
            case BUILDING_VINES_FARM:
                image_offset = 20;
                break
            case BUILDING_PIG_FARM:
                image_offset = 25;
                break
        }
        map_building_tiles_add_farm(b.id, b.x, b.y,
            image_group(GROUP_BUILDING_FARM_CROPS) + image_offset, 0);
    } else {
        let size: number = building_properties_for_type(b.type).size;
        if (building_is_house(b.type) && b.house_is_merged) {
            size = 2;
        }
        map_building_tiles_add(b.id, b.x, b.y, size, 0, 0);
        if (b.type == BUILDING_WHARF) {
            b.data.industry.fishing_boat_id = 0;
        }
    }
    b.state = BUILDING_STATE_IN_USE;
}
export function game_undo_perform() {
    if (!game_can_undo()) {
        return;
    }
    data.available = 0;
    city_finance_process_construction(-data.building_cost);
    if (data.type == BUILDING_CLEAR_LAND) {
        for (let i: number = 0; i < data.num_buildings; i++) {
            if (data.buildings[i].id) {
                let b: building = data.buildings[i];
                building_set(b.id, b);
                if (b.type == BUILDING_WAREHOUSE || b.type == BUILDING_GRANARY) {
                    if (!building_storage_restore(b.storage_id)) {
                        building_storage_reset_building_ids();
                    }
                }
                add_building_to_terrain(b);
            }
        }
        map_terrain_restore();
        map_aqueduct_restore();
        map_sprite_restore();
        map_image_restore();
        map_property_restore();
        map_property_clear_constructing_and_deleted();
    } else if (data.type == BUILDING_AQUEDUCT || data.type == BUILDING_ROAD ||
        data.type == BUILDING_WALL) {
        map_terrain_restore();
        map_aqueduct_restore();
        restore_map_images();
    } else if (data.type == BUILDING_LOW_BRIDGE || data.type == BUILDING_SHIP_BRIDGE) {
        map_terrain_restore();
        map_sprite_restore();
        restore_map_images();
    } else if (data.type == BUILDING_PLAZA || data.type == BUILDING_GARDENS) {
        map_terrain_restore();
        map_aqueduct_restore();
        map_property_restore();
        restore_map_images();
    } else if (data.num_buildings) {
        if (data.type == BUILDING_DRAGGABLE_RESERVOIR) {
            map_terrain_restore();
            map_aqueduct_restore();
            restore_map_images();
        }
        for (let i: number = 0; i < data.num_buildings; i++) {
            if (data.buildings[i].id) {
                let b: building = building_get(data.buildings[i].id);
                if (b.type == BUILDING_ORACLE
                    || (b.type >= BUILDING_LARGE_TEMPLE_CERES && b.type <= BUILDING_LARGE_TEMPLE_VENUS)) {
                    building_warehouses_add_resource(RESOURCE_MARBLE, 2);
                }
                b.state = BUILDING_STATE_UNDO;
            }
        }
    }
    map_routing_update_land();
    map_routing_update_walls();
    data.num_buildings = 0;
}
export function game_undo_reduce_time_available() {
    if (!game_can_undo()) {
        return;
    }
    if (data.timeout_ticks <= 0 || scenario_earthquake_is_in_progress()) {
        data.available = 0;
        clear_buildings();
        window_invalidate();
        return;
    }
    data.timeout_ticks--;
    switch (data.type) {
        case BUILDING_CLEAR_LAND:
        case BUILDING_AQUEDUCT:
        case BUILDING_ROAD:
        case BUILDING_WALL:
        case BUILDING_LOW_BRIDGE:
        case BUILDING_SHIP_BRIDGE:
        case BUILDING_PLAZA:
        case BUILDING_GARDENS:
            return;
        default: break
    }
    if (data.num_buildings <= 0) {
        data.available = 0;
        window_invalidate();
        return;
    }
    if (data.type == BUILDING_HOUSE_VACANT_LOT) {
        for (let i: number = 0; i < data.num_buildings; i++) {
            if (data.buildings[i].id && building_get(data.buildings[i].id).house_population) {
                data.available = 0;
                window_invalidate();
                return;
            }
        }
    }
    for (let i: number = 0; i < data.num_buildings; i++) {
        if (data.buildings[i].id) {
            let b: building = building_get(data.buildings[i].id);
            if (b.state == BUILDING_STATE_UNDO ||
                b.state == BUILDING_STATE_RUBBLE ||
                b.state == BUILDING_STATE_DELETED_BY_GAME) {
                data.available = 0;
                window_invalidate();
                return;
            }
            if (b.type != data.buildings[i].type || b.grid_offset != data.buildings[i].grid_offset) {
                data.available = 0;
                window_invalidate();
                return;
            }
        }
    }
}
