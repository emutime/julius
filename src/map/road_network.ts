export const MAX_QUEUE = 1000;
import { map_point } from 'map/point';
import { map_tile } from 'map/point';
import { city_map_clear_largest_road_networks } from 'city/map';
import { city_map_add_to_largest_road_networks } from 'city/map';
export let map_data: map_data_t = new map_data_t();;
import { buffer } from 'core/buffer';
import { GRID } from 'map/grid';
import GRID_SIZE = GRID.GRID_SIZE;
import { grid_u8 } from 'map/grid';
import { map_grid_clear_u8 } from 'map/grid';
import { map_routing_citizen_is_passable } from 'map/routing_terrain';
import { map_routing_citizen_is_road } from 'map/routing_terrain';
import { terrain } from 'map/terrain';
import TERRAIN_ROAD = terrain.TERRAIN_ROAD;
import TERRAIN_ACCESS_RAMP = terrain.TERRAIN_ACCESS_RAMP;
import TERRAIN_WALL = terrain.TERRAIN_WALL;
import TERRAIN_GATEHOUSE = terrain.TERRAIN_GATEHOUSE;
import { map_terrain_is } from 'map/terrain';
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
let ADJACENT_OFFSETS: number[] = new Array().fill({- GRID_SIZE, 1, GRID_SIZE, -1});
let network: grid_u8;
export class unnamed17_8 {
    public items: number[] = new Array(MAX_QUEUE).fill(0);
    public head: number = 0;
    public tail: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.items = args[0]);
        args.length >= 2 && (this.head = args[1]);
        args.length >= 3 && (this.tail = args[2]);
    }
}
let queue: unnamed17_8 = new unnamed17_8();
export function map_road_network_clear() {
    map_grid_clear_u8(network.items);
}
export function map_road_network_get(grid_offset: number) {
    return network.items[grid_offset];
}
function mark_road_network(grid_offset: number, network_id: number) {
    memset(queue, 0);
    let guard: number = 0;
    let next_offset: number;
    let size: number = 1;
    do {
        if (++guard >= GRID_SIZE * GRID_SIZE) {
            break;
        }
        network.items[grid_offset] = network_id;
        next_offset = -1;
        for (int i = 0; i < 4; i++) {
                int new_offset = grid_offset + ADJACENT_OFFSETS[i];
            if (map_routing_citizen_is_passable(new_offset) && !network.items[new_offset]) {
                if (map_routing_citizen_is_road(new_offset) || map_terrain_is(new_offset, TERRAIN_ACCESS_RAMP)) {
                    network.items[new_offset] = network_id;
                    size++;
                    if (next_offset == -1) {
                        next_offset = new_offset;
                    } else {
                        queue.items[queue.tail++] = new_offset;
                        if (queue.tail >= MAX_QUEUE) {
                            queue.tail = 0;
                        }
                    }
                }
            }
        }
        if (next_offset == -1) {
            if (queue.head == queue.tail) {
                return size;
            }
            next_offset = queue.items[queue.head++];
            if (queue.head >= MAX_QUEUE) {
                queue.head = 0;
            }
        }
        grid_offset = next_offset;
    } while (next_offset > -1)
    return size;
}
export function map_road_network_update() {
    city_map_clear_largest_road_networks();
    map_grid_clear_u8(network.items);
    let network_id: number = 1;
    let grid_offset: number = map_data.start_offset;
    for (let y: number = 0; y < map_data.height; y++, grid_offset += map_data.border_size) {
        for (let x: number = 0; x < map_data.width; x++, grid_offset++) {
            if (map_terrain_is(grid_offset, TERRAIN_ROAD) && !network.items[grid_offset]) {
                let size: number = mark_road_network(grid_offset, network_id);
                city_map_add_to_largest_road_networks(network_id, size);
                network_id++;
            }
        }
    }
}
