
export class ring_tile {
    public x: number = 0;
    public y: number = 0;
    public grid_offset: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.x = args[0]);
        args.length >= 2 && (this.y = args[1]);
        args.length >= 3 && (this.grid_offset = args[2]);
    }
}
import { map_data, map_grid_delta } from 'map/grid';
export class unnamed6_8 {
    public tiles: ring_tile[] = new Array(1080).fill(null);
    public index: number[] = new Array(6).fill(0);
    public constructor(...args: any[]) {
        args.length >= 1 && (this.tiles = args[0]);
        args.length >= 2 && (this.index = args[1]);
    }
}
let data: unnamed6_8 = new unnamed6_8();
export function map_ring_init() {
    let index: number = 0;
    let x: number = 0;
    let y: number = 0;
    for (let size: number = 1; size <= 5; size++) {
        for (let dist: number = 1; dist <= 6; dist++) {
            data.index[size][dist] = index;
            for (y = -dist, x = 0; x < size + dist; x++, index++) {
                data.tiles[index].x = x;
                data.tiles[index].y = y;
            }
            for (x = size + dist - 1, y = -dist + 1; y < size + dist; y++, index++) {
                data.tiles[index].x = x;
                data.tiles[index].y = y;
            }
            for (y = size + dist - 1, x = size + dist - 2; x >= -dist; x--, index++) {
                data.tiles[index].x = x;
                data.tiles[index].y = y;
            }
            if (size == 4 && dist == 2) {
                data.tiles[index - 1].x += 1
                data.tiles[index - 1].y -= 1
            }
            for (x = -dist, y = size + dist - 2; y >= -dist; y--, index++) {
                data.tiles[index].x = x;
                data.tiles[index].y = y;
            }
            for (y = -dist, x = -dist + 1; x < 0; x++, index++) {
                data.tiles[index].x = x;
                data.tiles[index].y = y;
            }
        }
    }
    for (let i: number = 0; i < index; i++) {
        data.tiles[i].grid_offset = map_grid_delta(data.tiles[i].x, data.tiles[i].y);
    }
}
export function map_ring_start(size: number, distance: number) {
    return data.index[size][distance];
}
export function map_ring_end(size: number, distance: number) {
    return map_ring_start(size, distance) + 4 * (size - 1) + 8 * distance;
}
export function map_ring_is_inside_map(x: number, y: number) {
    return x >= -1 && x <= map_data.width &&
        y >= -1 && y <= map_data.height;
}
export function map_ring_tile(index: number) {
    return data.tiles[index];
}
