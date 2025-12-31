import { building, building_get } from 'building/building';
import { model_get_building } from 'building/model';
import { building_state } from 'building/type';
import { city_god_neptune_create_shipwreck_flotsam } from 'city/gods';
import { city_message_post_with_message_delay, city_message_type, message_category } from 'city/message';
import { calc_percentage } from 'core/calc';
import { direction_type } from 'core/direction';
import { image_group } from 'core/image';
import { group_terrain } from 'core/image_group';
import { random_byte } from 'core/random';
import { figure_action } from 'figure/action';
import { figure, figure_create, figure_delete, figure_get, MAX_FIGURES } from 'figure/figure';
import { figure_image_increase_offset, figure_image_normalize_direction } from 'figure/image';
import { figure_movement_move_ticks } from 'figure/movement';
import { figure_route_remove } from 'figure/route';
import { figure_state, figure_type, terrain_usage } from 'figure/type';
import { map_figure_add, map_figure_delete } from 'map/figure';
import { GRID, map_grid_offset } from 'map/grid';
import { map_point } from 'map/point';
import { map_water_find_alternative_fishing_boat_tile, map_water_find_shipwreck_tile, map_water_get_wharf_for_new_fishing_boat } from 'map/water';
import { scenario_map_closest_fishing_point, scenario_map_has_flotsam, scenario_map_has_river_entry, scenario_map_has_river_exit, scenario_map_river_entry, scenario_map_river_exit } from 'scenario/map';
import DIR_0_TOP = direction_type.DIR_0_TOP;
import DIR_FIGURE_AT_DESTINATION = direction_type.DIR_FIGURE_AT_DESTINATION;
import DIR_FIGURE_REROUTE = direction_type.DIR_FIGURE_REROUTE;
import DIR_FIGURE_LOST = direction_type.DIR_FIGURE_LOST;
import FIGURE_ACTION_128_FLOTSAM_CREATED = figure_action.FIGURE_ACTION_128_FLOTSAM_CREATED;
import FIGURE_ACTION_129_FLOTSAM_FLOATING = figure_action.FIGURE_ACTION_129_FLOTSAM_FLOATING;
import FIGURE_ACTION_130_FLOTSAM_OFF_MAP = figure_action.FIGURE_ACTION_130_FLOTSAM_OFF_MAP;
import FIGURE_ACTION_190_FISHING_BOAT_CREATED = figure_action.FIGURE_ACTION_190_FISHING_BOAT_CREATED;
import FIGURE_ACTION_191_FISHING_BOAT_GOING_TO_FISH = figure_action.FIGURE_ACTION_191_FISHING_BOAT_GOING_TO_FISH;
import FIGURE_ACTION_192_FISHING_BOAT_FISHING = figure_action.FIGURE_ACTION_192_FISHING_BOAT_FISHING;
import FIGURE_ACTION_193_FISHING_BOAT_GOING_TO_WHARF = figure_action.FIGURE_ACTION_193_FISHING_BOAT_GOING_TO_WHARF;
import FIGURE_ACTION_194_FISHING_BOAT_AT_WHARF = figure_action.FIGURE_ACTION_194_FISHING_BOAT_AT_WHARF;
import FIGURE_ACTION_195_FISHING_BOAT_RETURNING_WITH_FISH = figure_action.FIGURE_ACTION_195_FISHING_BOAT_RETURNING_WITH_FISH;
import FIGURE_TRADE_SHIP = figure_type.FIGURE_TRADE_SHIP;
import FIGURE_FISHING_BOAT = figure_type.FIGURE_FISHING_BOAT;
import FIGURE_FLOTSAM = figure_type.FIGURE_FLOTSAM;
import FIGURE_SHIPWRECK = figure_type.FIGURE_SHIPWRECK;
import FIGURE_STATE_ALIVE = figure_state.FIGURE_STATE_ALIVE;
import FIGURE_STATE_DEAD = figure_state.FIGURE_STATE_DEAD;
import TERRAIN_USAGE_ANY = terrain_usage.TERRAIN_USAGE_ANY;
import BUILDING_STATE_IN_USE = building_state.BUILDING_STATE_IN_USE;
import MESSAGE_CAT_FISHING_BLOCKED = message_category.MESSAGE_CAT_FISHING_BLOCKED;
import MESSAGE_FISHING_BOAT_BLOCKED = city_message_type.MESSAGE_FISHING_BOAT_BLOCKED;
import GROUP_FIGURE_FLOTSAM_0 = group_terrain.GROUP_FIGURE_FLOTSAM_0;
import GROUP_FIGURE_FLOTSAM_1 = group_terrain.GROUP_FIGURE_FLOTSAM_1;
import GROUP_FIGURE_FLOTSAM_2 = group_terrain.GROUP_FIGURE_FLOTSAM_2;
import GROUP_FIGURE_FLOTSAM_3 = group_terrain.GROUP_FIGURE_FLOTSAM_3;
import GROUP_FIGURE_SHIP = group_terrain.GROUP_FIGURE_SHIP;
import GROUP_FIGURE_SHIPWRECK = group_terrain.GROUP_FIGURE_SHIPWRECK;
import GROUP_FIGURE_FLOTSAM_SHEEP = group_terrain.GROUP_FIGURE_FLOTSAM_SHEEP;
import GRID_SIZE = GRID.GRID_SIZE;
let FLOTSAM_RESOURCE_IDS: number[] = [
    3, 1, 3, 2, 1, 3, 2, 3, 2, 1, 3, 3, 2, 3, 3, 3, 1, 2, 0, 1
];
let FLOTSAM_WAIT_TICKS: number[] = [
    10, 50, 100, 130, 200, 250, 400, 430, 500, 600, 70, 750, 820, 830, 900, 980, 1010, 1030, 1200, 1300
];
let FLOTSAM_TYPE_0: number[] = [0, 1, 2, 3, 4, 4, 4, 3, 2, 1, 0, 0];
let FLOTSAM_TYPE_12: number[] = [
    0, 1, 1, 2, 2, 3, 3, 4, 4, 4, 3, 2, 1, 0, 0, 1, 1, 2, 2, 1, 1, 0, 0, 0
];
let FLOTSAM_TYPE_3: number[] = [
    0, 0, 1, 1, 2, 2, 3, 3, 4, 4, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
];
export function figure_create_flotsam() {
    if (!scenario_map_has_river_entry() || !scenario_map_has_river_exit() || !scenario_map_has_flotsam()) {
        return;
    }
    for (let i: number = 1; i < MAX_FIGURES; i++) {
        let f: figure = figure_get(i);
        if (f.state && f.type == FIGURE_FLOTSAM) {
            figure_delete(f);
        }
    }
    let river_entry: map_point = scenario_map_river_entry();
    for (let i: number = 0; i < 20; i++) {
        let f: figure = figure_create(FIGURE_FLOTSAM, river_entry.x, river_entry.y, DIR_0_TOP);
        f.action_state = FIGURE_ACTION_128_FLOTSAM_CREATED;
        f.resource_id = FLOTSAM_RESOURCE_IDS[i];
        f.wait_ticks = FLOTSAM_WAIT_TICKS[i];
    }
}
export function figure_flotsam_action(f: figure) {
    f.is_boat = 2;
    if (!scenario_map_has_river_exit()) {
        return;
    }
    f.is_ghost = 0;
    f.cart_image_id = 0;
    f.terrain_usage = TERRAIN_USAGE_ANY;
    switch (f.action_state) {
        case FIGURE_ACTION_128_FLOTSAM_CREATED:
            f.is_ghost = 1;
            f.wait_ticks--;
            if (f.wait_ticks <= 0) {
                f.action_state = FIGURE_ACTION_129_FLOTSAM_FLOATING;
                f.wait_ticks = 0;
                if (!f.resource_id && city_god_neptune_create_shipwreck_flotsam()) {
                    f.min_max_seen = 1;
                }
                let river_exit: map_point = scenario_map_river_exit();
                f.destination_x = river_exit.x;
                f.destination_y = river_exit.y;
            }
            break
        case FIGURE_ACTION_129_FLOTSAM_FLOATING:
            if (f.flotsam_visible) {
                f.flotsam_visible = 0;
            } else {
                f.flotsam_visible = 1;
                f.wait_ticks++;
                figure_movement_move_ticks(f, 1);
                f.is_ghost = 0;
                f.height_adjusted_ticks = 0;
                if (f.direction == DIR_FIGURE_AT_DESTINATION ||
                    f.direction == DIR_FIGURE_REROUTE || f.direction == DIR_FIGURE_LOST) {
                    f.action_state = FIGURE_ACTION_130_FLOTSAM_OFF_MAP;
                }
            }
            break
        case FIGURE_ACTION_130_FLOTSAM_OFF_MAP:
            f.is_ghost = 1;
            f.min_max_seen = 0;
            f.action_state = FIGURE_ACTION_128_FLOTSAM_CREATED;
            if (f.wait_ticks >= 400) {
                f.wait_ticks = random_byte() & 7;
            } else if (f.wait_ticks >= 200) {
                f.wait_ticks = 50 + (random_byte() & 0xf);
            } else if (f.wait_ticks >= 100) {
                f.wait_ticks = 100 + (random_byte() & 0x1f);
            } else if (f.wait_ticks >= 50) {
                f.wait_ticks = 200 + (random_byte() & 0x3f);
            } else {
                f.wait_ticks = 300 + random_byte();
            }
            map_figure_delete(f);
            let river_entry: map_point = scenario_map_river_entry();
            f.x = river_entry.x;
            f.y = river_entry.y;
            f.grid_offset = map_grid_offset(f.x, f.y);
            f.cross_country_x = 15 * f.x;
            f.cross_country_y = 15 * f.y;
            break
    }
    if (f.resource_id == 0) {
        figure_image_increase_offset(f, 12);
        if (f.min_max_seen) {
            f.image_id = image_group(GROUP_FIGURE_FLOTSAM_SHEEP) + FLOTSAM_TYPE_0[f.image_offset];
        } else {
            f.image_id = image_group(GROUP_FIGURE_FLOTSAM_0) + FLOTSAM_TYPE_0[f.image_offset];
        }
    } else if (f.resource_id == 1) {
        figure_image_increase_offset(f, 24);
        f.image_id = image_group(GROUP_FIGURE_FLOTSAM_1) + FLOTSAM_TYPE_12[f.image_offset];
    } else if (f.resource_id == 2) {
        figure_image_increase_offset(f, 24);
        f.image_id = image_group(GROUP_FIGURE_FLOTSAM_2) + FLOTSAM_TYPE_12[f.image_offset];
    } else if (f.resource_id == 3) {
        figure_image_increase_offset(f, 24);
        if (FLOTSAM_TYPE_3[f.image_offset] == -1) {
            f.image_id = 0;
        } else {
            f.image_id = image_group(GROUP_FIGURE_FLOTSAM_3) + FLOTSAM_TYPE_3[f.image_offset];
        }
    }
}
export function figure_shipwreck_action(f: figure) {
    f.is_ghost = 0;
    f.height_adjusted_ticks = 0;
    f.is_boat = 1;
    figure_image_increase_offset(f, 128);
    if (f.wait_ticks < 1000) {
        map_figure_delete(f);
        let tile: map_point;
        if (map_water_find_shipwreck_tile(f, tile)) {
            f.x = tile.x;
            f.y = tile.y;
            f.grid_offset = map_grid_offset(f.x, f.y);
            f.cross_country_x = 15 * f.x + 7;
            f.cross_country_y = 15 * f.y + 7;
        }
        map_figure_add(f);
        f.wait_ticks = 1000;
    }
    f.wait_ticks++;
    if (f.wait_ticks > 2000) {
        f.state = FIGURE_STATE_DEAD;
    }
    f.image_id = image_group(GROUP_FIGURE_SHIPWRECK) + f.image_offset / 16;
}
export function figure_fishing_boat_action(f: figure) {
    let b: building = building_get(f.building_id);
    if (b.state != BUILDING_STATE_IN_USE) {
        f.state = FIGURE_STATE_DEAD;
    }
    if (f.action_state != FIGURE_ACTION_190_FISHING_BOAT_CREATED && b.data.industry.fishing_boat_id != f.id) {
        let tile: map_point;
        b = building_get(map_water_get_wharf_for_new_fishing_boat(f, tile));
        if (b.id) {
            f.building_id = b.id;
            b.data.industry.fishing_boat_id = f.id;
            f.action_state = FIGURE_ACTION_193_FISHING_BOAT_GOING_TO_WHARF;
            f.destination_x = tile.x;
            f.destination_y = tile.y;
            f.source_x = tile.x;
            f.source_y = tile.y;
            figure_route_remove(f);
        } else {
            f.state = FIGURE_STATE_DEAD;
        }
    }
    f.is_ghost = 0;
    f.is_boat = 1;
    figure_image_increase_offset(f, 12);
    f.cart_image_id = 0;
    switch (f.action_state) {
        case FIGURE_ACTION_190_FISHING_BOAT_CREATED:
            f.wait_ticks++;
            if (f.wait_ticks >= 50) {
                f.wait_ticks = 0;
                let tile: map_point;
                let wharf_id: number = map_water_get_wharf_for_new_fishing_boat(f, tile);
                if (wharf_id) {
                    b.figure_id = 0;
                    f.building_id = wharf_id;
                    building_get(wharf_id).data.industry.fishing_boat_id = f.id;
                    f.action_state = FIGURE_ACTION_193_FISHING_BOAT_GOING_TO_WHARF;
                    f.destination_x = tile.x;
                    f.destination_y = tile.y;
                    f.source_x = tile.x;
                    f.source_y = tile.y;
                    figure_route_remove(f);
                }
            }
            break
        case FIGURE_ACTION_191_FISHING_BOAT_GOING_TO_FISH:
            figure_movement_move_ticks(f, 1);
            f.height_adjusted_ticks = 0;
            if (f.direction == DIR_FIGURE_AT_DESTINATION) {
                let tile: map_point;
                if (map_water_find_alternative_fishing_boat_tile(f, tile)) {
                    figure_route_remove(f);
                    f.destination_x = tile.x;
                    f.destination_y = tile.y;
                    f.direction = f.previous_tile_direction;
                } else {
                    f.action_state = FIGURE_ACTION_192_FISHING_BOAT_FISHING;
                    f.wait_ticks = 0;
                }
            } else if (f.direction == DIR_FIGURE_REROUTE || f.direction == DIR_FIGURE_LOST) {
                f.action_state = FIGURE_ACTION_194_FISHING_BOAT_AT_WHARF;
                f.destination_x = f.source_x;
                f.destination_y = f.source_y;
            }
            break
        case FIGURE_ACTION_192_FISHING_BOAT_FISHING:
            f.wait_ticks++;
            if (f.wait_ticks >= 200) {
                f.wait_ticks = 0;
                f.action_state = FIGURE_ACTION_195_FISHING_BOAT_RETURNING_WITH_FISH;
                f.destination_x = f.source_x;
                f.destination_y = f.source_y;
                figure_route_remove(f);
            }
            break
        case FIGURE_ACTION_193_FISHING_BOAT_GOING_TO_WHARF:
            figure_movement_move_ticks(f, 1);
            f.height_adjusted_ticks = 0;
            if (f.direction == DIR_FIGURE_AT_DESTINATION) {
                f.action_state = FIGURE_ACTION_194_FISHING_BOAT_AT_WHARF;
                f.wait_ticks = 0;
            } else if (f.direction == DIR_FIGURE_REROUTE) {
                figure_route_remove(f);
            } else if (f.direction == DIR_FIGURE_LOST) {
                city_message_post_with_message_delay(MESSAGE_CAT_FISHING_BLOCKED, 1, MESSAGE_FISHING_BOAT_BLOCKED, 12);
                f.state = FIGURE_STATE_DEAD;
            }
            break
        case FIGURE_ACTION_194_FISHING_BOAT_AT_WHARF:
            {
                let pct_workers: number = calc_percentage(b.num_workers, model_get_building(b.type).laborers);
                let max_wait_ticks: number = 5 * (102 - pct_workers);
                if (b.data.industry.has_fish > 0) {
                    pct_workers = 0;
                }
                if (pct_workers > 0) {
                    f.wait_ticks++;
                    if (f.wait_ticks >= max_wait_ticks) {
                        f.wait_ticks = 0;
                        let tile: map_point;
                        if (scenario_map_closest_fishing_point(f.x, f.y, tile)) {
                            f.action_state = FIGURE_ACTION_191_FISHING_BOAT_GOING_TO_FISH;
                            f.destination_x = tile.x;
                            f.destination_y = tile.y;
                            figure_route_remove(f);
                        }
                    }
                }
            }
            break
        case FIGURE_ACTION_195_FISHING_BOAT_RETURNING_WITH_FISH:
            figure_movement_move_ticks(f, 1);
            f.height_adjusted_ticks = 0;
            if (f.direction == DIR_FIGURE_AT_DESTINATION) {
                f.action_state = FIGURE_ACTION_194_FISHING_BOAT_AT_WHARF;
                f.wait_ticks = 0;
                b.figure_spawn_delay = 1;
                b.data.industry.has_fish++;
            } else if (f.direction == DIR_FIGURE_REROUTE) {
                figure_route_remove(f);
            } else if (f.direction == DIR_FIGURE_LOST) {
                f.state = FIGURE_STATE_DEAD;
            }
            break
    }
    let dir: number = figure_image_normalize_direction(f.direction < 8 ? f.direction : f.previous_tile_direction);
    if (f.action_state == FIGURE_ACTION_192_FISHING_BOAT_FISHING) {
        f.image_id = image_group(GROUP_FIGURE_SHIP) + dir + 16;
    } else {
        f.image_id = image_group(GROUP_FIGURE_SHIP) + dir + 8;
    }
}
export function figure_sink_all_ships() {
    for (let i: number = 1; i < MAX_FIGURES; i++) {
        let f: figure = figure_get(i);
        if (f.state != FIGURE_STATE_ALIVE) {
            continue
        }
        if (f.type == FIGURE_TRADE_SHIP) {
            building_get(f.destination_building_id).data.dock.trade_ship_id = 0;
        } else if (f.type == FIGURE_FISHING_BOAT) {
            building_get(f.building_id).data.industry.fishing_boat_id = 0;
        } else {
            continue
        }
        f.building_id = 0;
        f.type = FIGURE_SHIPWRECK;
        f.wait_ticks = 0;
    }
}
