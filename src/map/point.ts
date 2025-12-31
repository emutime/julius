
export class map_point {
    public x: number = 0;
    public y: number = 0;
    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
export class map_tile {
    public x: number = 0;
    public y: number = 0;
    public grid_offset: number = 0;
    public constructor(x: number, y: number, grid_offset: number) {
        this.x = x;
        this.y = y;
        this.grid_offset = grid_offset;
    }
}
let last: map_point = new map_point(0, 0);
export function map_point_store_result(x: number, y: number, point: map_point) {
    point.x = last.x = x;
    point.y = last.y = y;
}
export function map_point_get_last_result(point: map_point) {
    point.x = last.x;
    point.y = last.y;
}
