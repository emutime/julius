export const MAX_ROUTES = 600;
export const MAX_PATH_LENGTH = 500;
import { buffer, buffer_read_i16, buffer_read_raw, buffer_write_i16, buffer_write_raw } from 'core/buffer';
import { figure, figure_get, MAX_FIGURES } from 'figure/figure';
import { figure_state, terrain_usage } from 'figure/type';
import { map_routing_calculate_distances_water_boat, map_routing_calculate_distances_water_flotsam, map_routing_can_travel_over_walls, map_routing_citizen_can_travel_over_land, map_routing_citizen_can_travel_over_road_garden, map_routing_noncitizen_can_travel_over_land, map_routing_noncitizen_can_travel_through_everything } from 'map/routing';
import { map_routing_get_path, map_routing_get_path_on_water } from 'map/routing_path';
import FIGURE_STATE_ALIVE = figure_state.FIGURE_STATE_ALIVE;
import TERRAIN_USAGE_ROADS = terrain_usage.TERRAIN_USAGE_ROADS;
import TERRAIN_USAGE_ENEMY = terrain_usage.TERRAIN_USAGE_ENEMY;
import TERRAIN_USAGE_PREFER_ROADS = terrain_usage.TERRAIN_USAGE_PREFER_ROADS;
import TERRAIN_USAGE_WALLS = terrain_usage.TERRAIN_USAGE_WALLS;
import TERRAIN_USAGE_ANIMAL = terrain_usage.TERRAIN_USAGE_ANIMAL;
export class unnamed9_8 {
    public figure_ids: number[] = new Array(MAX_ROUTES).fill(0);
    public direction_paths: ArrayBuffer = new ArrayBuffer(MAX_ROUTES);
    public constructor(...args: any[]) {
        args.length >= 1 && (this.figure_ids = args[0]);
        args.length >= 2 && (this.direction_paths = args[1]);
    }
}
let data: unnamed9_8 = new unnamed9_8();
export function figure_route_clear_all() {
    for (let i: number = 0; i < MAX_ROUTES; i++) {
        data.figure_ids[i] = 0;
        for (let j: number = 0; j < MAX_PATH_LENGTH; j++) {
            data.direction_paths[i][j] = 0;
        }
    }
}
export function figure_route_clean() {
    for (let i: number = 0; i < MAX_ROUTES; i++) {
        let figure_id: number = data.figure_ids[i];
        if (figure_id > 0 && figure_id < MAX_FIGURES) {
            let f: figure = figure_get(figure_id);
            if (f.state != FIGURE_STATE_ALIVE || f.routing_path_id != i) {
                data.figure_ids[i] = 0;
            }
        }
    }
}
function get_first_available() {
    for (let i: number = 1; i < MAX_ROUTES; i++) {
        if (data.figure_ids[i] == 0) {
            return i;
        }
    }
    return 0;
}
export function figure_route_add(f: figure) {
    f.routing_path_id = 0;
    f.routing_path_current_tile = 0;
    f.routing_path_length = 0;
    let path_id: number = get_first_available();
    if (!path_id) {
        return;
    }
    let path_length: number;
    if (f.is_boat) {
        if (f.is_boat == 2) {
            map_routing_calculate_distances_water_flotsam(f.x, f.y);
            path_length = map_routing_get_path_on_water(data.direction_paths[path_id],
                f.destination_x, f.destination_y, 1);
        } else {
            map_routing_calculate_distances_water_boat(f.x, f.y);
            path_length = map_routing_get_path_on_water(data.direction_paths[path_id],
                f.destination_x, f.destination_y, 0);
        }
    } else {
        let can_travel: boolean;
        switch (f.terrain_usage) {
            case TERRAIN_USAGE_ENEMY:
                can_travel = map_routing_noncitizen_can_travel_over_land(f.x, f.y,
                    f.destination_x, f.destination_y, f.destination_building_id, 5000);
                if (!can_travel) {
                    can_travel = map_routing_noncitizen_can_travel_over_land(f.x, f.y,
                        f.destination_x, f.destination_y, 0, 25000);
                    if (!can_travel) {
                        can_travel = map_routing_noncitizen_can_travel_through_everything(
                            f.x, f.y, f.destination_x, f.destination_y);
                    }
                }
                break
            case TERRAIN_USAGE_WALLS:
                can_travel = map_routing_can_travel_over_walls(f.x, f.y,
                    f.destination_x, f.destination_y);
                break
            case TERRAIN_USAGE_ANIMAL:
                can_travel = map_routing_noncitizen_can_travel_over_land(f.x, f.y,
                    f.destination_x, f.destination_y, -1, 5000);
                break
            case TERRAIN_USAGE_PREFER_ROADS:
                can_travel = map_routing_citizen_can_travel_over_road_garden(f.x, f.y,
                    f.destination_x, f.destination_y);
                if (!can_travel) {
                    can_travel = map_routing_citizen_can_travel_over_land(f.x, f.y,
                        f.destination_x, f.destination_y);
                }
                break
            case TERRAIN_USAGE_ROADS:
                can_travel = map_routing_citizen_can_travel_over_road_garden(f.x, f.y,
                    f.destination_x, f.destination_y);
                break
            default:
                can_travel = map_routing_citizen_can_travel_over_land(f.x, f.y,
                    f.destination_x, f.destination_y)
                break
        }
        if (can_travel) {
            if (f.terrain_usage == TERRAIN_USAGE_WALLS) {
                path_length = map_routing_get_path(data.direction_paths[path_id], f.x, f.y,
                    f.destination_x, f.destination_y, 4);
                if (path_length <= 0) {
                    path_length = map_routing_get_path(data.direction_paths[path_id], f.x, f.y,
                        f.destination_x, f.destination_y, 8);
                }
            } else {
                path_length = map_routing_get_path(data.direction_paths[path_id], f.x, f.y,
                    f.destination_x, f.destination_y, 8);
            }
        } else {
            path_length = 0;
        }
    }
    if (path_length) {
        data.figure_ids[path_id] = f.id;
        f.routing_path_id = path_id;
        f.routing_path_length = path_length;
    }
}
export function figure_route_remove(f: figure) {
    if (f.routing_path_id > 0) {
        if (data.figure_ids[f.routing_path_id] == f.id) {
            data.figure_ids[f.routing_path_id] = 0;
        }
        f.routing_path_id = 0;
    }
}
export function figure_route_get_direction(path_id: number, index: number) {
    return data.direction_paths[path_id][index];
}
export function figure_route_save_state(figures: buffer, paths: buffer) {
    for (let i: number = 0; i < MAX_ROUTES; i++) {
        buffer_write_i16(figures, data.figure_ids[i]);
        buffer_write_raw(paths, data.direction_paths[i], MAX_PATH_LENGTH);
    }
}
export function figure_route_load_state(figures: buffer, paths: buffer) {
    for (let i: number = 0; i < MAX_ROUTES; i++) {
        data.figure_ids[i] = buffer_read_i16(figures);
        buffer_read_raw(paths, data.direction_paths[i], MAX_PATH_LENGTH);
    }
}
