import { MAX_BUILDINGS } from 'building/building';
import { building_type } from 'building/type';
import BUILDING_SHIPYARD = building_type.BUILDING_SHIPYARD;
import BUILDING_DOCK = building_type.BUILDING_DOCK;
import BUILDING_WHARF = building_type.BUILDING_WHARF;
import BUILDING_BURNING_RUIN = building_type.BUILDING_BURNING_RUIN;
import { building_type } from 'building/type';
import { house_level } from 'building/type';
import HOUSE_LARGE_TENT = house_level.HOUSE_LARGE_TENT;
import { building_state } from 'building/type';
import BUILDING_STATE_IN_USE = building_state.BUILDING_STATE_IN_USE;
import BUILDING_STATE_CREATED = building_state.BUILDING_STATE_CREATED;
import BUILDING_STATE_RUBBLE = building_state.BUILDING_STATE_RUBBLE;
import BUILDING_STATE_DELETED_BY_GAME = building_state.BUILDING_STATE_DELETED_BY_GAME;;
import { buffer } from 'core/buffer';
import { building } from 'building/building';
import { building_get } from 'building/building';
import { building_main } from 'building/building';
import { building_next } from 'building/building';
import { building_create } from 'building/building';
import { building_clear_related_data } from 'building/building';
import { message_category } from 'city/message';
import { message_advisor } from 'city/message';
import { city_message_type } from 'city/message';
import MESSAGE_ROAD_TO_ROME_BLOCKED = city_message_type.MESSAGE_ROAD_TO_ROME_BLOCKED;
import { city_message_type } from 'city/message';
import { city_message } from 'city/message';
import { city_message_post } from 'city/message';
import { city_population_remove_home_removed } from 'city/population';
import { selected_rating } from 'city/ratings';
import { city_ratings_peace_building_destroyed } from 'city/ratings';
import { language_type } from 'core/locale';
import { encoding_type } from 'core/encoding';
import { group_terrain } from 'core/image_group';
import GROUP_TERRAIN_RUBBLE_TENT = group_terrain.GROUP_TERRAIN_RUBBLE_TENT;
import GROUP_TERRAIN_RUBBLE_GENERAL = group_terrain.GROUP_TERRAIN_RUBBLE_GENERAL;
import { color_t } from 'graphics/color';
import { image } from 'core/image';
import { image_group } from 'core/image';
import { direction_type } from 'core/direction';
import { figure_type } from 'figure/type';
import { figure } from 'figure/figure';
import { figure_create_explosion_cloud } from 'figuretype/missile';
import { figure_tower_sentry_reroute } from 'figuretype/wall';
import { figure_kill_tower_sentries_at } from 'figuretype/wall';
import { game_undo_disable } from 'game/undo';
import { map_building_at } from 'map/building';
import { map_building_damage_increase } from 'map/building';
import { map_building_tiles_add } from 'map/building_tiles';
import { map_building_tiles_remove } from 'map/building_tiles';
import { map_building_tiles_set_rubble } from 'map/building_tiles';
import { GRID } from 'map/grid';
import GRID_SIZE = GRID.GRID_SIZE;
import { map_grid_offset } from 'map/grid';
import { map_grid_offset_to_x } from 'map/grid';
import { map_grid_offset_to_y } from 'map/grid';
import { map_random_get } from 'map/random';
import { map_routing_update_land } from 'map/routing_terrain';
import { map_routing_update_water } from 'map/routing_terrain';
import { map_routing_update_walls } from 'map/routing_terrain';
import { terrain } from 'map/terrain';
import TERRAIN_WATER = terrain.TERRAIN_WATER;
import TERRAIN_BUILDING = terrain.TERRAIN_BUILDING;
import TERRAIN_WALL = terrain.TERRAIN_WALL;
import TERRAIN_GATEHOUSE = terrain.TERRAIN_GATEHOUSE;
import { map_terrain_is } from 'map/terrain';
import { map_tiles_update_area_walls } from 'map/tiles';
import { map_tiles_update_region_aqueducts } from 'map/tiles';
import { sound_effect } from 'sound/effect';
import SOUND_EFFECT_EXPLOSION = sound_effect.SOUND_EFFECT_EXPLOSION;
import { sound_effect_play } from 'sound/effect';
import { _invalid_parameter_noinfo } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt';
import { _errno } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/errno';
import { memcpy } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vcruntime_string';
import { memcpy } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vcruntime_string';
import { memmove } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vcruntime_string';
import { memmove } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vcruntime_string';
import { memset } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vcruntime_string';
import { memset } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vcruntime_string';
import { wcsnlen } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstring';
import { wcstok } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstring';
import { strnlen } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/string';
function destroy_on_fire(b: building, plagued: number) {
    game_undo_disable();
    b.fire_risk = 0;
    b.damage_risk = 0;
    if (b.house_size && b.house_population) {
        city_population_remove_home_removed(b.house_population);
    }
    let was_tent: number = b.house_size && b.subtype.house_level <= HOUSE_LARGE_TENT;
    b.house_population = 0;
    b.house_size = 0;
    b.output_resource_id = 0;
    b.distance_from_entry = 0;
    building_clear_related_data(b);
    let waterside_building: number = 0;
    if (b.type == BUILDING_DOCK || b.type == BUILDING_WHARF || b.type == BUILDING_SHIPYARD) {
        waterside_building = 1;
    }
    let num_tiles: number;
    if (b.size >= 2 && b.size <= 5) {
        num_tiles = b.size * b.size;
    } else {
        num_tiles = 0;
    }
    map_building_tiles_remove(b.id, b.x, b.y);
    if (map_terrain_is(b.grid_offset, TERRAIN_WATER)) {
        b.state = BUILDING_STATE_DELETED_BY_GAME;
    } else {
        b.type = BUILDING_BURNING_RUIN;
        b.figure_id4 = 0;
        b.tax_income_or_storage = 0;
        b.fire_duration = (b.house_figure_generation_delay & 7) + 1;
        b.fire_proof = 1;
        b.size = 1;
        b.ruin_has_plague = plagued;
        memset(b.data, 0);
        let image_id: number;
        if (was_tent) {
            image_id = image_group(GROUP_TERRAIN_RUBBLE_TENT);
        } else {
            let random: number = map_random_get(b.grid_offset) & 3;
            image_id = image_group(GROUP_TERRAIN_RUBBLE_GENERAL) + 9 * random;
        }
        map_building_tiles_add(b.id, b.x, b.y, 1, image_id, TERRAIN_BUILDING);
    }
    let x_tiles: number[] = {
        0, 1, 1, 0, 2, 2, 2, 1, 0, 3, 3, 3, 3, 2, 1, 0, 4, 4, 4, 4, 4, 3, 2, 1, 0, 5, 5, 5, 5, 5, 5, 4, 3, 2, 1, 0
    };
    let y_tiles: number[] = {
        0, 0, 1, 1, 0, 1, 2, 2, 2, 0, 1, 2, 3, 3, 3, 3, 0, 1, 2, 3, 4, 4, 4, 4, 4, 0, 1, 2, 3, 4, 5, 5, 5, 5, 5, 5
    };
    for (let tile: number = 1; tile < num_tiles; tile++) {
        let x: number = x_tiles[tile] + b.x;
        let y: number = y_tiles[tile] + b.y;
        if (map_terrain_is(map_grid_offset(x, y), TERRAIN_WATER)) {
            continue
        }
        let ruin: building = building_create(BUILDING_BURNING_RUIN, x, y);
        let image_id: number;
        if (was_tent) {
            image_id = image_group(GROUP_TERRAIN_RUBBLE_TENT);
        } else {
            let random: number = map_random_get(ruin.grid_offset) & 3;
            image_id = image_group(GROUP_TERRAIN_RUBBLE_GENERAL) + 9 * random;
        }
        map_building_tiles_add(ruin.id, ruin.x, ruin.y, 1, image_id, TERRAIN_BUILDING);
        ruin.fire_duration = (ruin.house_figure_generation_delay & 7) + 1;
        ruin.figure_id4 = 0;
        ruin.fire_proof = 1;
        ruin.ruin_has_plague = plagued;
    }
    if (waterside_building) {
        map_routing_update_water();
    }
}
function destroy_linked_parts(b: building, on_fire: number) {
    let part: building = b;
    for (let i: number = 0; i < 9; i++) {
        if (part.prev_part_building_id <= 0) {
            break
        }
        let part_id: number = part.prev_part_building_id;
        part = building_get(part_id);
        if (on_fire) {
            destroy_on_fire(part, 0);
        } else {
            map_building_tiles_set_rubble(part_id, part.x, part.y, part.size);
            part.state = BUILDING_STATE_RUBBLE;
        }
    }
    part = b;
    for (let i: number = 0; i < 9; i++) {
        part = building_next(part);
        if (part.id <= 0) {
            break
        }
        if (on_fire) {
            destroy_on_fire(part, 0);
        } else {
            map_building_tiles_set_rubble(part.id, part.x, part.y, part.size);
            part.state = BUILDING_STATE_RUBBLE;
        }
    }
    part = building_main(b);
    for (let i: number = 0; i < 9 && part.id > 0; i++) {
        let next_part: building = building_next(part);
        part.next_part_building_id = 0;
        part.prev_part_building_id = 0;
        part = next_part;
    }
}
export function building_destroy_by_collapse(b: building) {
    b.state = BUILDING_STATE_RUBBLE;
    map_building_tiles_set_rubble(b.id, b.x, b.y, b.size);
    figure_create_explosion_cloud(b.x, b.y, b.size);
    destroy_linked_parts(b, 0);
}
export function building_destroy_by_fire(b: building) {
    destroy_on_fire(b, 0);
    destroy_linked_parts(b, 1);
}
export function building_destroy_by_plague(b: building) {
    destroy_on_fire(b, 1);
}
export function building_destroy_by_rioter(b: building) {
    destroy_on_fire(b, 0);
}
export function building_destroy_first_of_type(type: building_type) {
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state == BUILDING_STATE_IN_USE && b.type == type) {
            let grid_offset: number = b.grid_offset;
            game_undo_disable();
            b.state = BUILDING_STATE_RUBBLE;
            map_building_tiles_set_rubble(i, b.x, b.y, b.size);
            sound_effect_play(SOUND_EFFECT_EXPLOSION);
            map_routing_update_land();
            return grid_offset;
        }
    }
    return 0;
}
export function building_destroy_last_placed() {
    let highest_sequence: number = 0;
    let last_building: building = null;
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state == BUILDING_STATE_CREATED || b.state == BUILDING_STATE_IN_USE) {
            if (b.created_sequence > highest_sequence) {
                highest_sequence = b.created_sequence;
                last_building = b;
            }
        }
    }
    if (last_building) {
        city_message_post(1, MESSAGE_ROAD_TO_ROME_BLOCKED, 0, last_building.grid_offset);
        game_undo_disable();
        building_destroy_by_collapse(last_building);
        map_routing_update_land();
    }
}
export function building_destroy_increase_enemy_damage(grid_offset: number, max_damage: number) {
    if (map_building_damage_increase(grid_offset) > max_damage) {
        building_destroy_by_enemy(map_grid_offset_to_x(grid_offset),
            map_grid_offset_to_y(grid_offset), grid_offset);
    }
}
export function building_destroy_by_enemy(x: number, y: number, grid_offset: number) {
    let building_id: number = map_building_at(grid_offset);
    if (building_id > 0) {
        let b: building = building_get(building_id);
        if (b.state == BUILDING_STATE_IN_USE) {
            city_ratings_peace_building_destroyed(b.type);
            building_destroy_by_collapse(b);
        }
    } else {
        if (map_terrain_is(grid_offset, TERRAIN_WALL)) {
            figure_kill_tower_sentries_at(x, y);
        }
        map_building_tiles_set_rubble(0, x, y, 1);
    }
    figure_tower_sentry_reroute();
    map_tiles_update_area_walls(x, y, 3);
    map_tiles_update_region_aqueducts(x - 3, y - 3, x + 3, y + 3);
    map_routing_update_land();
    map_routing_update_walls();
}
