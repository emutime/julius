export const OFFSET = 0;
export const MAX_DIR = 4;
import { building_type } from 'building/type';
import BUILDING_HOUSE_VACANT_LOT = building_type.BUILDING_HOUSE_VACANT_LOT;
import BUILDING_HOUSE_MEDIUM_INSULA = building_type.BUILDING_HOUSE_MEDIUM_INSULA;
import BUILDING_HOUSE_LARGE_INSULA = building_type.BUILDING_HOUSE_LARGE_INSULA;
import BUILDING_HOUSE_MEDIUM_VILLA = building_type.BUILDING_HOUSE_MEDIUM_VILLA;
import BUILDING_HOUSE_LARGE_VILLA = building_type.BUILDING_HOUSE_LARGE_VILLA;
import BUILDING_HOUSE_MEDIUM_PALACE = building_type.BUILDING_HOUSE_MEDIUM_PALACE;
import BUILDING_HOUSE_LARGE_PALACE = building_type.BUILDING_HOUSE_LARGE_PALACE;
import { building_type } from 'building/type';
import { house_level } from 'building/type';
import HOUSE_MEDIUM_INSULA = house_level.HOUSE_MEDIUM_INSULA;
import HOUSE_LARGE_INSULA = house_level.HOUSE_LARGE_INSULA;
import HOUSE_LARGE_VILLA = house_level.HOUSE_LARGE_VILLA;
import HOUSE_LARGE_PALACE = house_level.HOUSE_LARGE_PALACE;
import { building_state } from 'building/type';
import BUILDING_STATE_IN_USE = building_state.BUILDING_STATE_IN_USE;
import BUILDING_STATE_RUBBLE = building_state.BUILDING_STATE_RUBBLE;
import BUILDING_STATE_DELETED_BY_GAME = building_state.BUILDING_STATE_DELETED_BY_GAME;;
import { buffer } from 'core/buffer';
import { building } from 'building/building';
import { building_get } from 'building/building';
import { building_create } from 'building/building';
import { building_totals_add_corrupted_house } from 'building/building';
import { language_type } from 'core/locale';
import { encoding_type } from 'core/encoding';
import { group_terrain } from 'core/image_group';
import GROUP_BUILDING_HOUSE_TENT = group_terrain.GROUP_BUILDING_HOUSE_TENT;
import GROUP_BUILDING_HOUSE_SHACK = group_terrain.GROUP_BUILDING_HOUSE_SHACK;
import GROUP_BUILDING_HOUSE_HOVEL = group_terrain.GROUP_BUILDING_HOUSE_HOVEL;
import GROUP_BUILDING_HOUSE_CASA = group_terrain.GROUP_BUILDING_HOUSE_CASA;
import GROUP_BUILDING_HOUSE_INSULA_1 = group_terrain.GROUP_BUILDING_HOUSE_INSULA_1;
import GROUP_BUILDING_HOUSE_INSULA_2 = group_terrain.GROUP_BUILDING_HOUSE_INSULA_2;
import GROUP_BUILDING_HOUSE_VILLA_1 = group_terrain.GROUP_BUILDING_HOUSE_VILLA_1;
import GROUP_BUILDING_HOUSE_VILLA_2 = group_terrain.GROUP_BUILDING_HOUSE_VILLA_2;
import GROUP_BUILDING_HOUSE_PALACE_1 = group_terrain.GROUP_BUILDING_HOUSE_PALACE_1;
import GROUP_BUILDING_HOUSE_PALACE_2 = group_terrain.GROUP_BUILDING_HOUSE_PALACE_2;
import GROUP_BUILDING_HOUSE_VACANT_LOT = group_terrain.GROUP_BUILDING_HOUSE_VACANT_LOT;
import { color_t } from 'graphics/color';
import { image } from 'core/image';
import { image_group } from 'core/image';
import { resource_type } from 'game/resource';
import { inventory_type } from 'game/resource';
import INVENTORY_MAX = inventory_type.INVENTORY_MAX;
import { workshop_type } from 'game/resource';
import { resource_image_type } from 'game/resource';
import { game_undo_disable } from 'game/undo';
import { map_building_at } from 'map/building';
import { map_building_tiles_add } from 'map/building_tiles';
import { map_building_tiles_remove } from 'map/building_tiles';
import { GRID } from 'map/grid';
import GRID_SIZE = GRID.GRID_SIZE;
import { map_grid_offset } from 'map/grid';
import { map_grid_offset_to_x } from 'map/grid';
import { map_grid_offset_to_y } from 'map/grid';
import { map_grid_size } from 'map/grid';
import { map_image_set } from 'map/image';
import { map_random_get } from 'map/random';
import { terrain } from 'map/terrain';
import TERRAIN_BUILDING = terrain.TERRAIN_BUILDING;
import TERRAIN_GARDEN = terrain.TERRAIN_GARDEN;
import TERRAIN_WALL = terrain.TERRAIN_WALL;
import TERRAIN_GATEHOUSE = terrain.TERRAIN_GATEHOUSE;
import TERRAIN_NOT_CLEAR = terrain.TERRAIN_NOT_CLEAR;
import { map_terrain_is } from 'map/terrain';
let HOUSE_TILE_OFFSETS: number[] = new Array().fill({
    OFFSET(0,0), OFFSET(1,0), OFFSET(0,1), OFFSET(1,1), // 2x2
    OFFSET(2,0), OFFSET(2,1), OFFSET(2,2), OFFSET(1,2), OFFSET(0,2), // 3x3
    OFFSET(3,0), OFFSET(3,1), OFFSET(3,2), OFFSET(3,3), OFFSET(2,3), OFFSET(1,3), OFFSET(0,3) // 4x4
});
export class unnamed23_14 {
    public group: number = 0;
    public offset: number = 0;
    public num_types: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.group = args[0]);
        args.length >= 2 && (this.offset = args[1]);
        args.length >= 3 && (this.num_types = args[2]);
    }
}
let HOUSE_IMAGE: struct (unnamed struct at./ src / building / house.c: 23: 14)[] = new Array(20).fill({
    { GROUP_BUILDING_HOUSE_TENT, 0, 2}, { GROUP_BUILDING_HOUSE_TENT, 2, 2},
    { GROUP_BUILDING_HOUSE_SHACK, 0, 2}, { GROUP_BUILDING_HOUSE_SHACK, 2, 2},
    { GROUP_BUILDING_HOUSE_HOVEL, 0, 2}, { GROUP_BUILDING_HOUSE_HOVEL, 2, 2},
    { GROUP_BUILDING_HOUSE_CASA, 0, 2}, { GROUP_BUILDING_HOUSE_CASA, 2, 2},
    { GROUP_BUILDING_HOUSE_INSULA_1, 0, 2}, { GROUP_BUILDING_HOUSE_INSULA_1, 2, 2},
    { GROUP_BUILDING_HOUSE_INSULA_2, 0, 2}, { GROUP_BUILDING_HOUSE_INSULA_2, 2, 2},
    { GROUP_BUILDING_HOUSE_VILLA_1, 0, 2}, { GROUP_BUILDING_HOUSE_VILLA_1, 2, 2},
    { GROUP_BUILDING_HOUSE_VILLA_2, 0, 1}, { GROUP_BUILDING_HOUSE_VILLA_2, 1, 1},
    { GROUP_BUILDING_HOUSE_PALACE_1, 0, 1}, { GROUP_BUILDING_HOUSE_PALACE_1, 1, 1},
    { GROUP_BUILDING_HOUSE_PALACE_2, 0, 1}, { GROUP_BUILDING_HOUSE_PALACE_2, 1, 1},
});
export class unnamed40_14 {
    public x: number = 0;
    public y: number = 0;
    public offset: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.x = args[0]);
        args.length >= 2 && (this.y = args[1]);
        args.length >= 3 && (this.offset = args[2]);
    }
}
let EXPAND_DIRECTION_DELTA: struct (unnamed struct at./ src / building / house.c: 40: 14)[] = new Array(MAX_DIR).fill({{ 0, 0, 0}, {- 1, -1, -GRID_SIZE - 1}, {- 1, 0, -1}, { 0, - 1, -GRID_SIZE}});
export class unnamed46_8 {
    public x: number = 0;
    public y: number = 0;
    public inventory: number[] = new Array(INVENTORY_MAX).fill(0);
    public population: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.x = args[0]);
        args.length >= 2 && (this.y = args[1]);
        args.length >= 3 && (this.inventory = args[2]);
        args.length >= 4 && (this.population = args[3]);
    }
}
let merge_data: unnamed46_8 = new unnamed46_8();
export function building_house_change_to(house: building, type: building_type) {
    house.type = type;
    house.subtype.house_level = house.type - BUILDING_HOUSE_VACANT_LOT;
    let image_id: number = image_group(HOUSE_IMAGE[house.subtype.house_level].group);
    if (house.house_is_merged) {
        image_id += 4
        if (HOUSE_IMAGE[house.subtype.house_level].offset) {
            image_id += 1
        }
    } else {
        image_id += HOUSE_IMAGE[house.subtype.house_level].offset
        image_id += map_random_get(house.grid_offset) & (HOUSE_IMAGE[house.subtype.house_level].num_types - 1)
    }
    map_building_tiles_add(house.id, house.x, house.y, house.size, image_id, TERRAIN_BUILDING);
}
function create_vacant_lot(x: number, y: number, image_id: number) {
    let b: building = building_create(BUILDING_HOUSE_VACANT_LOT, x, y);
    b.house_population = 0;
    b.distance_from_entry = 0;
    map_building_tiles_add(b.id, b.x, b.y, 1, image_id, TERRAIN_BUILDING);
}
export function building_house_change_to_vacant_lot(house: building) {
    house.type = BUILDING_HOUSE_VACANT_LOT;
    house.subtype.house_level = house.type - BUILDING_HOUSE_VACANT_LOT;
    let image_id: number = image_group(GROUP_BUILDING_HOUSE_VACANT_LOT);
    if (house.house_is_merged) {
        map_building_tiles_remove(house.id, house.x, house.y);
        house.house_is_merged = 0;
        house.size = house.house_size = 1;
        map_building_tiles_add(house.id, house.x, house.y, 1, image_id, TERRAIN_BUILDING);
        create_vacant_lot(house.x + 1, house.y, image_id);
        create_vacant_lot(house.x, house.y + 1, image_id);
        create_vacant_lot(house.x + 1, house.y + 1, image_id);
    } else {
        map_image_set(house.grid_offset, image_id);
    }
}
function prepare_for_merge(building_id: number, num_tiles: number) {
    for (let i: number = 0; i < INVENTORY_MAX; i++) {
        merge_data.inventory[i] = 0;
    }
    merge_data.population = 0;
    let grid_offset: number = map_grid_offset(merge_data.x, merge_data.y);
    for (let i: number = 0; i < num_tiles; i++) {
        let house_offset: number = grid_offset + HOUSE_TILE_OFFSETS[i];
        if (map_terrain_is(house_offset, TERRAIN_BUILDING)) {
            let house: building = building_get(map_building_at(house_offset));
            if (house.id != building_id && house.house_size) {
                merge_data.population += house.house_population
                for (let inv: number = 0; inv < INVENTORY_MAX; inv++) {
                    merge_data.inventory[inv] += house.data.house.inventory[inv]
                    house.house_population = 0;
                    house.state = BUILDING_STATE_DELETED_BY_GAME;
                }
            }
        }
    }
}
function merge(b: building) {
    prepare_for_merge(b.id, 4);
    b.size = b.house_size = 2;
    b.house_population += merge_data.population
    for (let i: number = 0; i < INVENTORY_MAX; i++) {
        b.data.house.inventory[i] += merge_data.inventory[i]
    }
    let image_id: number = image_group(HOUSE_IMAGE[b.subtype.house_level].group) + 4;
    if (HOUSE_IMAGE[b.subtype.house_level].offset) {
        image_id += 1
    }
    map_building_tiles_remove(b.id, b.x, b.y);
    b.x = merge_data.x;
    b.y = merge_data.y;
    b.grid_offset = map_grid_offset(b.x, b.y);
    b.house_is_merged = 1;
    map_building_tiles_add(b.id, b.x, b.y, 2, image_id, TERRAIN_BUILDING);
}
export function building_house_merge(house: building) {
    if (house.house_is_merged) {
        return;
    }
    if ((map_random_get(house.grid_offset) & 7) >= 5) {
        return;
    }
    let num_house_tiles: number = 0;
    for (let i: number = 0; i < 4; i++) {
        let tile_offset: number = house.grid_offset + HOUSE_TILE_OFFSETS[i];
        if (map_terrain_is(tile_offset, TERRAIN_BUILDING)) {
            let other_house: building = building_get(map_building_at(tile_offset));
            if (other_house.id == house.id) {
                num_house_tiles++;
            } else if (other_house.state == BUILDING_STATE_IN_USE && other_house.house_size &&
                other_house.subtype.house_level == house.subtype.house_level &&
                !other_house.house_is_merged) {
                num_house_tiles++;
            }
        }
    }
    if (num_house_tiles == 4) {
        game_undo_disable();
        merge_data.x = house.x + EXPAND_DIRECTION_DELTA[0].x;
        merge_data.y = house.y + EXPAND_DIRECTION_DELTA[0].y;
        merge(house);
    }
}
export function building_house_can_expand(house: building, num_tiles: number) {
    for (let dir: number = 0; dir < MAX_DIR; dir++) {
        let base_offset: number = EXPAND_DIRECTION_DELTA[dir].offset + house.grid_offset;
        let ok_tiles: number = 0;
        for (let i: number = 0; i < num_tiles; i++) {
            let tile_offset: number = base_offset + HOUSE_TILE_OFFSETS[i];
            if (map_terrain_is(tile_offset, TERRAIN_BUILDING)) {
                let other_house: building = building_get(map_building_at(tile_offset));
                if (other_house.id == house.id) {
                    ok_tiles++;
                } else if (other_house.state == BUILDING_STATE_IN_USE && other_house.house_size) {
                    if (other_house.subtype.house_level <= house.subtype.house_level) {
                        ok_tiles++;
                    }
                }
            }
        }
        if (ok_tiles == num_tiles) {
            merge_data.x = house.x + EXPAND_DIRECTION_DELTA[dir].x;
            merge_data.y = house.y + EXPAND_DIRECTION_DELTA[dir].y;
            return 1;
        }
    }
    for (let dir: number = 0; dir < MAX_DIR; dir++) {
        let base_offset: number = EXPAND_DIRECTION_DELTA[dir].offset + house.grid_offset;
        let ok_tiles: number = 0;
        for (let i: number = 0; i < num_tiles; i++) {
            let tile_offset: number = base_offset + HOUSE_TILE_OFFSETS[i];
            if (!map_terrain_is(tile_offset, TERRAIN_NOT_CLEAR)) {
                ok_tiles++;
            } else if (map_terrain_is(tile_offset, TERRAIN_BUILDING)) {
                let other_house: building = building_get(map_building_at(tile_offset));
                if (other_house.id == house.id) {
                    ok_tiles++;
                } else if (other_house.state == BUILDING_STATE_IN_USE && other_house.house_size) {
                    if (other_house.subtype.house_level <= house.subtype.house_level) {
                        ok_tiles++;
                    }
                }
            }
        }
        if (ok_tiles == num_tiles) {
            merge_data.x = house.x + EXPAND_DIRECTION_DELTA[dir].x;
            merge_data.y = house.y + EXPAND_DIRECTION_DELTA[dir].y;
            return 1;
        }
    }
    for (let dir: number = 0; dir < MAX_DIR; dir++) {
        let base_offset: number = EXPAND_DIRECTION_DELTA[dir].offset + house.grid_offset;
        let ok_tiles: number = 0;
        for (let i: number = 0; i < num_tiles; i++) {
            let tile_offset: number = base_offset + HOUSE_TILE_OFFSETS[i];
            if (!map_terrain_is(tile_offset, TERRAIN_NOT_CLEAR)) {
                ok_tiles++;
            } else if (map_terrain_is(tile_offset, TERRAIN_BUILDING)) {
                let other_house: building = building_get(map_building_at(tile_offset));
                if (other_house.id == house.id) {
                    ok_tiles++;
                } else if (other_house.state == BUILDING_STATE_IN_USE && other_house.house_size) {
                    if (other_house.subtype.house_level <= house.subtype.house_level) {
                        ok_tiles++;
                    }
                }
            } else if (map_terrain_is(tile_offset, TERRAIN_GARDEN)) {
                ok_tiles++;
            }
        }
        if (ok_tiles == num_tiles) {
            merge_data.x = house.x + EXPAND_DIRECTION_DELTA[dir].x;
            merge_data.y = house.y + EXPAND_DIRECTION_DELTA[dir].y;
            return 1;
        }
    }
    house.data.house.no_space_to_expand = 1;
    return 0;
}
function house_image_group(level: number) {
    return image_group(HOUSE_IMAGE[level].group) + HOUSE_IMAGE[level].offset;
}
function create_house_tile(type: building_type, x: number, y: number, image_id: number, population: number, inventory: number) {
    let house: building = building_create(type, x, y);
    house.house_population = population;
    for (let i: number = 0; i < INVENTORY_MAX; i++) {
        house.data.house.inventory[i] = inventory[i];
    }
    house.distance_from_entry = 0;
    map_building_tiles_add(house.id, house.x, house.y, 1,
        image_id + (map_random_get(house.grid_offset) & 1), TERRAIN_BUILDING);
}
function split_size2(house: building, new_type: building_type) {
    let inventory_per_tile: number[];
    let inventory_remainder: number[];
    for (let i: number = 0; i < INVENTORY_MAX; i++) {
        inventory_per_tile[i] = house.data.house.inventory[i] / 4;
        inventory_remainder[i] = house.data.house.inventory[i] % 4;
    }
    let population_per_tile: number = house.house_population / 4;
    let population_remainder: number = house.house_population % 4;
    map_building_tiles_remove(house.id, house.x, house.y);
    house.type = new_type;
    house.subtype.house_level = house.type - BUILDING_HOUSE_VACANT_LOT;
    house.size = house.house_size = 1;
    house.house_is_merged = 0;
    house.house_population = population_per_tile + population_remainder;
    for (let i: number = 0; i < INVENTORY_MAX; i++) {
        house.data.house.inventory[i] = inventory_per_tile[i] + inventory_remainder[i];
    }
    house.distance_from_entry = 0;
    let image_id: number = house_image_group(house.subtype.house_level);
    map_building_tiles_add(house.id, house.x, house.y, house.size,
        image_id + (map_random_get(house.grid_offset) & 1), TERRAIN_BUILDING);
    create_house_tile(house.type, house.x + 1, house.y, image_id, population_per_tile, inventory_per_tile);
    create_house_tile(house.type, house.x, house.y + 1, image_id, population_per_tile, inventory_per_tile);
    create_house_tile(house.type, house.x + 1, house.y + 1, image_id, population_per_tile, inventory_per_tile);
}
function split_size3(house: building) {
    let inventory_per_tile: number[];
    let inventory_remainder: number[];
    for (let i: number = 0; i < INVENTORY_MAX; i++) {
        inventory_per_tile[i] = house.data.house.inventory[i] / 9;
        inventory_remainder[i] = house.data.house.inventory[i] % 9;
    }
    let population_per_tile: number = house.house_population / 9;
    let population_remainder: number = house.house_population % 9;
    map_building_tiles_remove(house.id, house.x, house.y);
    house.type = BUILDING_HOUSE_MEDIUM_INSULA;
    house.subtype.house_level = house.type - BUILDING_HOUSE_VACANT_LOT;
    house.size = house.house_size = 1;
    house.house_is_merged = 0;
    house.house_population = population_per_tile + population_remainder;
    for (let i: number = 0; i < INVENTORY_MAX; i++) {
        house.data.house.inventory[i] = inventory_per_tile[i] + inventory_remainder[i];
    }
    house.distance_from_entry = 0;
    let image_id: number = house_image_group(house.subtype.house_level);
    map_building_tiles_add(house.id, house.x, house.y, house.size,
        image_id + (map_random_get(house.grid_offset) & 1), TERRAIN_BUILDING);
    create_house_tile(house.type, house.x, house.y + 1, image_id, population_per_tile, inventory_per_tile);
    create_house_tile(house.type, house.x + 1, house.y + 1, image_id, population_per_tile, inventory_per_tile);
    create_house_tile(house.type, house.x + 2, house.y + 1, image_id, population_per_tile, inventory_per_tile);
    create_house_tile(house.type, house.x, house.y + 2, image_id, population_per_tile, inventory_per_tile);
    create_house_tile(house.type, house.x + 1, house.y + 2, image_id, population_per_tile, inventory_per_tile);
    create_house_tile(house.type, house.x + 2, house.y + 2, image_id, population_per_tile, inventory_per_tile);
}
function split(house: building, num_tiles: number) {
    let grid_offset: number = map_grid_offset(merge_data.x, merge_data.y);
    for (let i: number = 0; i < num_tiles; i++) {
        let tile_offset: number = grid_offset + HOUSE_TILE_OFFSETS[i];
        if (map_terrain_is(tile_offset, TERRAIN_BUILDING)) {
            let other_house: building = building_get(map_building_at(tile_offset));
            if (other_house.id != house.id && other_house.house_size) {
                if (other_house.house_is_merged == 1) {
                    split_size2(other_house, other_house.type);
                } else if (other_house.house_size == 2) {
                    split_size2(other_house, BUILDING_HOUSE_MEDIUM_INSULA);
                } else if (other_house.house_size == 3) {
                    split_size3(other_house);
                }
            }
        }
    }
}
export function building_house_expand_to_large_insula(house: building) {
    split(house, 4);
    prepare_for_merge(house.id, 4);
    house.type = BUILDING_HOUSE_LARGE_INSULA;
    house.subtype.house_level = HOUSE_LARGE_INSULA;
    house.size = house.house_size = 2;
    house.house_population += merge_data.population
    for (let i: number = 0; i < INVENTORY_MAX; i++) {
        house.data.house.inventory[i] += merge_data.inventory[i]
    }
    let image_id: number = house_image_group(house.subtype.house_level) + (map_random_get(house.grid_offset) & 1);
    map_building_tiles_remove(house.id, house.x, house.y);
    house.x = merge_data.x;
    house.y = merge_data.y;
    house.grid_offset = map_grid_offset(house.x, house.y);
    map_building_tiles_add(house.id, house.x, house.y, house.size, image_id, TERRAIN_BUILDING);
}
export function building_house_expand_to_large_villa(house: building) {
    split(house, 9);
    prepare_for_merge(house.id, 9);
    house.type = BUILDING_HOUSE_LARGE_VILLA;
    house.subtype.house_level = HOUSE_LARGE_VILLA;
    house.size = house.house_size = 3;
    house.house_population += merge_data.population
    for (let i: number = 0; i < INVENTORY_MAX; i++) {
        house.data.house.inventory[i] += merge_data.inventory[i]
    }
    let image_id: number = house_image_group(house.subtype.house_level);
    map_building_tiles_remove(house.id, house.x, house.y);
    house.x = merge_data.x;
    house.y = merge_data.y;
    house.grid_offset = map_grid_offset(house.x, house.y);
    map_building_tiles_add(house.id, house.x, house.y, house.size, image_id, TERRAIN_BUILDING);
}
export function building_house_expand_to_large_palace(house: building) {
    split(house, 16);
    prepare_for_merge(house.id, 16);
    house.type = BUILDING_HOUSE_LARGE_PALACE;
    house.subtype.house_level = HOUSE_LARGE_PALACE;
    house.size = house.house_size = 4;
    house.house_population += merge_data.population
    for (let i: number = 0; i < INVENTORY_MAX; i++) {
        house.data.house.inventory[i] += merge_data.inventory[i]
    }
    let image_id: number = house_image_group(house.subtype.house_level);
    map_building_tiles_remove(house.id, house.x, house.y);
    house.x = merge_data.x;
    house.y = merge_data.y;
    house.grid_offset = map_grid_offset(house.x, house.y);
    map_building_tiles_add(house.id, house.x, house.y, house.size, image_id, TERRAIN_BUILDING);
}
export function building_house_devolve_from_large_insula(house: building) {
    split_size2(house, BUILDING_HOUSE_MEDIUM_INSULA);
}
export function building_house_devolve_from_large_villa(house: building) {
    let inventory_per_tile: number[];
    let inventory_remainder: number[];
    for (let i: number = 0; i < INVENTORY_MAX; i++) {
        inventory_per_tile[i] = house.data.house.inventory[i] / 6;
        inventory_remainder[i] = house.data.house.inventory[i] % 6;
    }
    let population_per_tile: number = house.house_population / 6;
    let population_remainder: number = house.house_population % 6;
    map_building_tiles_remove(house.id, house.x, house.y);
    house.type = BUILDING_HOUSE_MEDIUM_VILLA;
    house.subtype.house_level = house.type - BUILDING_HOUSE_VACANT_LOT;
    house.size = house.house_size = 2;
    house.house_is_merged = 0;
    house.house_population = population_per_tile + population_remainder;
    for (let i: number = 0; i < INVENTORY_MAX; i++) {
        house.data.house.inventory[i] = inventory_per_tile[i] + inventory_remainder[i];
    }
    house.distance_from_entry = 0;
    let image_id: number = house_image_group(house.subtype.house_level);
    map_building_tiles_add(house.id, house.x, house.y, house.size,
        image_id + (map_random_get(house.grid_offset) & 1), TERRAIN_BUILDING);
    image_id = house_image_group(HOUSE_MEDIUM_INSULA);
    create_house_tile(BUILDING_HOUSE_MEDIUM_INSULA,
        house.x + 2, house.y, image_id, population_per_tile, inventory_per_tile);
    create_house_tile(BUILDING_HOUSE_MEDIUM_INSULA,
        house.x + 2, house.y + 1, image_id, population_per_tile, inventory_per_tile);
    create_house_tile(BUILDING_HOUSE_MEDIUM_INSULA,
        house.x, house.y + 2, image_id, population_per_tile, inventory_per_tile);
    create_house_tile(BUILDING_HOUSE_MEDIUM_INSULA,
        house.x + 1, house.y + 2, image_id, population_per_tile, inventory_per_tile);
    create_house_tile(BUILDING_HOUSE_MEDIUM_INSULA,
        house.x + 2, house.y + 2, image_id, population_per_tile, inventory_per_tile);
}
export function building_house_devolve_from_large_palace(house: building) {
    let inventory_per_tile: number[];
    let inventory_remainder: number[];
    for (let i: number = 0; i < INVENTORY_MAX; i++) {
        inventory_per_tile[i] = house.data.house.inventory[i] / 8;
        inventory_remainder[i] = house.data.house.inventory[i] % 8;
    }
    let population_per_tile: number = house.house_population / 8;
    let population_remainder: number = house.house_population % 8;
    map_building_tiles_remove(house.id, house.x, house.y);
    house.type = BUILDING_HOUSE_MEDIUM_PALACE;
    house.subtype.house_level = house.type - BUILDING_HOUSE_VACANT_LOT;
    house.size = house.house_size = 3;
    house.house_is_merged = 0;
    house.house_population = population_per_tile + population_remainder;
    for (let i: number = 0; i < INVENTORY_MAX; i++) {
        house.data.house.inventory[i] = inventory_per_tile[i] + inventory_remainder[i];
    }
    house.distance_from_entry = 0;
    let image_id: number = house_image_group(house.subtype.house_level);
    map_building_tiles_add(house.id, house.x, house.y, house.size, image_id, TERRAIN_BUILDING);
    image_id = house_image_group(HOUSE_MEDIUM_INSULA);
    create_house_tile(BUILDING_HOUSE_MEDIUM_INSULA,
        house.x + 3, house.y, image_id, population_per_tile, inventory_per_tile);
    create_house_tile(BUILDING_HOUSE_MEDIUM_INSULA,
        house.x + 3, house.y + 1, image_id, population_per_tile, inventory_per_tile);
    create_house_tile(BUILDING_HOUSE_MEDIUM_INSULA,
        house.x + 3, house.y + 2, image_id, population_per_tile, inventory_per_tile);
    create_house_tile(BUILDING_HOUSE_MEDIUM_INSULA,
        house.x, house.y + 3, image_id, population_per_tile, inventory_per_tile);
    create_house_tile(BUILDING_HOUSE_MEDIUM_INSULA,
        house.x + 1, house.y + 3, image_id, population_per_tile, inventory_per_tile);
    create_house_tile(BUILDING_HOUSE_MEDIUM_INSULA,
        house.x + 2, house.y + 3, image_id, population_per_tile, inventory_per_tile);
    create_house_tile(BUILDING_HOUSE_MEDIUM_INSULA,
        house.x + 3, house.y + 3, image_id, population_per_tile, inventory_per_tile);
}
export function building_house_check_for_corruption(house: building) {
    let calc_grid_offset: number = map_grid_offset(house.x, house.y);
    house.data.house.no_space_to_expand = 0;
    if (house.grid_offset != calc_grid_offset || map_building_at(house.grid_offset) != house.id) {
        let map_width: number
        let map_height: number;
        map_grid_size(map_width, map_height);
        for (let y: number = 0; y < map_height; y++) {
            for (let x: number = 0; x < map_width; x++) {
                let grid_offset: number = map_grid_offset(x, y);
                if (map_building_at(grid_offset) == house.id) {
                    house.grid_offset = grid_offset;
                    house.x = map_grid_offset_to_x(grid_offset);
                    house.y = map_grid_offset_to_y(grid_offset);
                    building_totals_add_corrupted_house(0);
                    return;
                }
            }
        }
        building_totals_add_corrupted_house(1);
        house.state = BUILDING_STATE_RUBBLE;
    }
}
