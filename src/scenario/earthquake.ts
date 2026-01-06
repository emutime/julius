
;
import { building_get } from 'building/building';
import { building_destroy_by_fire } from 'building/destruction';
import { building_state } from 'building/type';
import { city_message_post, city_message_type } from 'city/message';
import { buffer, buffer_read_i32, buffer_write_i32 } from 'core/buffer';
import { calc_bound } from 'core/calc';
import { random_byte } from 'core/random';
import { figure_create_explosion_cloud } from 'figuretype/missile';
import { game_time_month, game_time_year } from 'game/time';
import { map_building_at, map_building_set } from 'map/building';
import { GRID, map_grid_offset } from 'map/grid';
import { map_routing_update_land, map_routing_update_walls } from 'map/routing_terrain';
import { map_terrain_is, map_terrain_set, terrain } from 'map/terrain';
import { map_tiles_set_earthquake, map_tiles_update_all_gardens, map_tiles_update_all_plazas, map_tiles_update_all_roads } from 'map/tiles';
import { event } from 'scenario/data';
import { earthquake } from 'scenario/types';
import { sound_effect, sound_effect_play } from 'sound/effect';
import BUILDING_STATE_DELETED_BY_GAME = building_state.BUILDING_STATE_DELETED_BY_GAME;
import MESSAGE_EARTHQUAKE = city_message_type.MESSAGE_EARTHQUAKE;
import GRID_SIZE = GRID.GRID_SIZE;
import TERRAIN_ROCK = terrain.TERRAIN_ROCK;
import TERRAIN_WATER = terrain.TERRAIN_WATER;
import TERRAIN_ELEVATION = terrain.TERRAIN_ELEVATION;
import TERRAIN_WALL = terrain.TERRAIN_WALL;
import TERRAIN_GATEHOUSE = terrain.TERRAIN_GATEHOUSE;
import EARTHQUAKE_NONE = earthquake.EARTHQUAKE_NONE;
import EARTHQUAKE_SMALL = earthquake.EARTHQUAKE_SMALL;
import EARTHQUAKE_MEDIUM = earthquake.EARTHQUAKE_MEDIUM;
import EARTHQUAKE_LARGE = earthquake.EARTHQUAKE_LARGE;
import EVENT_NOT_STARTED = event.EVENT_NOT_STARTED;
import EVENT_IN_PROGRESS = event.EVENT_IN_PROGRESS;
import EVENT_FINISHED = event.EVENT_FINISHED;
export let scenario: scenario_t = new scenario_t();
import SOUND_EFFECT_EXPLOSION = sound_effect.SOUND_EFFECT_EXPLOSION;
class unnamed26_5 {
    public x: number = 0;
    public y: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.x = args[0]);
        args.length >= 2 && (this.y = args[1]);
    }
}
export class unnamed18_8 {
    public game_year: number = 0;
    public month: number = 0;
    public state: number = 0;
    public duration: number = 0;
    public max_duration: number = 0;
    public delay: number = 0;
    public max_delay: number = 0;
    public expand: expand = new Array(4).fill(null);
    public constructor(...args: any[]) {
        args.length >= 1 && (this.game_year = args[0]);
        args.length >= 2 && (this.month = args[1]);
        args.length >= 3 && (this.state = args[2]);
        args.length >= 4 && (this.duration = args[3]);
        args.length >= 5 && (this.max_duration = args[4]);
        args.length >= 6 && (this.delay = args[5]);
        args.length >= 7 && (this.max_delay = args[6]);
        args.length >= 8 && (this.expand = args[7]);
    }
}
let data: unnamed18_8 = new unnamed18_8();
export function scenario_earthquake_init() {
    data.game_year = scenario.start_year + scenario.earthquake.year;
    data.month = 2 + (random_byte() & 7);
    switch (scenario.earthquake.severity) {
        default:
            data.max_duration = 0
            data.max_delay = 0;
            break
        case EARTHQUAKE_SMALL:
            data.max_duration = 25 + (random_byte() & 0x1f);
            data.max_delay = 10;
            break
        case EARTHQUAKE_MEDIUM:
            data.max_duration = 100 + (random_byte() & 0x3f);
            data.max_delay = 8;
            break
        case EARTHQUAKE_LARGE:
            data.max_duration = 250 + random_byte();
            data.max_delay = 6;
            break
    }
    data.state = EVENT_NOT_STARTED;
    for (let i: number = 0; i < 4; i++) {
        data.expand[i].x = scenario.earthquake_point.x;
        data.expand[i].y = scenario.earthquake_point.y;
    }
}
function can_advance_earthquake_to_tile(x: number, y: number) {
    if (map_terrain_is(map_grid_offset(x, y), TERRAIN_ELEVATION | TERRAIN_ROCK | TERRAIN_WATER)) {
        return 0;
    } else {
        return 1;
    }
}
function advance_earthquake_to_tile(x: number, y: number) {
    let grid_offset: number = map_grid_offset(x, y);
    let building_id: number = map_building_at(grid_offset);
    if (building_id) {
        building_destroy_by_fire(building_get(building_id));
        sound_effect_play(SOUND_EFFECT_EXPLOSION);
        let ruin_id: number = map_building_at(grid_offset);
        if (ruin_id) {
            building_get(ruin_id).state = BUILDING_STATE_DELETED_BY_GAME;
            map_building_set(grid_offset, 0);
        }
    }
    map_terrain_set(grid_offset, 0);
    map_tiles_set_earthquake(x, y);
    map_tiles_update_all_gardens();
    map_tiles_update_all_roads();
    map_tiles_update_all_plazas();
    map_routing_update_land();
    map_routing_update_walls();
    figure_create_explosion_cloud(x, y, 1);
}
export function scenario_earthquake_process() {
    if (scenario.earthquake.severity == EARTHQUAKE_NONE ||
        scenario.earthquake_point.x == -1 || scenario.earthquake_point.y == -1) {
        return;
    }
    if (data.state == EVENT_NOT_STARTED) {
        if (game_time_year() == data.game_year &&
            game_time_month() == data.month) {
            data.state = EVENT_IN_PROGRESS;
            data.duration = 0;
            data.delay = 0;
            advance_earthquake_to_tile(data.expand[0].x, data.expand[0].y);
            city_message_post(true, MESSAGE_EARTHQUAKE, 0,
                map_grid_offset(data.expand[0].x, data.expand[0].y));
        }
    } else if (data.state == EVENT_IN_PROGRESS) {
        data.delay++;
        if (data.delay >= data.max_delay) {
            data.delay = 0;
            data.duration++;
            if (data.duration >= data.max_duration) {
                data.state = EVENT_FINISHED;
            }
            let dx: number
            let dy: number
            let index: number;
            switch (random_byte() & 0xf) {
                case 0:
                    index = 0;
                    dx = 0;
                    dy = -1;
                    break
                case 1:
                    index = 1;
                    dx = 1;
                    dy = 0;
                    break
                case 2:
                    index = 2;
                    dx = 0;
                    dy = 1;
                    break
                case 3:
                    index = 3;
                    dx = -1;
                    dy = 0;
                    break
                case 4:
                    index = 0;
                    dx = 0;
                    dy = -1;
                    break
                case 5:
                    index = 0;
                    dx = -1;
                    dy = 0;
                    break
                case 6:
                    index = 0;
                    dx = 1;
                    dy = 0;
                    break
                case 7:
                    index = 1;
                    dx = 1;
                    dy = 0;
                    break
                case 8:
                    index = 1;
                    dx = 0;
                    dy = -1;
                    break
                case 9:
                    index = 1;
                    dx = 0;
                    dy = 1;
                    break
                case 10:
                    index = 2;
                    dx = 0;
                    dy = 1;
                    break
                case 11:
                    index = 2;
                    dx = -1;
                    dy = 0;
                    break
                case 12:
                    index = 2;
                    dx = 1;
                    dy = 0;
                    break
                case 13:
                    index = 3;
                    dx = -1;
                    dy = 0;
                    break
                case 14:
                    index = 3;
                    dx = 0;
                    dy = -1;
                    break
                case 15:
                    index = 3;
                    dx = 0;
                    dy = 1;
                    break
                default: return
            }
            let x: number = calc_bound(data.expand[index].x + dx, 0, scenario.map.width - 1);
            let y: number = calc_bound(data.expand[index].y + dy, 0, scenario.map.height - 1);
            if (can_advance_earthquake_to_tile(x, y)) {
                data.expand[index].x = x;
                data.expand[index].y = y;
                advance_earthquake_to_tile(x, y);
            }
        }
    }
}
export function scenario_earthquake_is_in_progress() {
    return data.state == EVENT_IN_PROGRESS;
}
export function scenario_earthquake_save_state(buf: buffer) {
    buffer_write_i32(buf, data.game_year);
    buffer_write_i32(buf, data.month);
    buffer_write_i32(buf, data.state);
    buffer_write_i32(buf, data.duration);
    buffer_write_i32(buf, data.max_duration);
    buffer_write_i32(buf, data.max_delay);
    buffer_write_i32(buf, data.delay);
    for (let i: number = 0; i < 4; i++) {
        buffer_write_i32(buf, data.expand[i].x);
        buffer_write_i32(buf, data.expand[i].y);
    }
}
export function scenario_earthquake_load_state(buf: buffer) {
    data.game_year = buffer_read_i32(buf);
    data.month = buffer_read_i32(buf);
    data.state = buffer_read_i32(buf);
    data.duration = buffer_read_i32(buf);
    data.max_duration = buffer_read_i32(buf);
    data.max_delay = buffer_read_i32(buf);
    data.delay = buffer_read_i32(buf);
    for (let i: number = 0; i < 4; i++) {
        data.expand[i].x = buffer_read_i32(buf);
        data.expand[i].y = buffer_read_i32(buf);
    }
}
