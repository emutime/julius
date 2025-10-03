
export class map_point {
    public x: number = 0;
    public y: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.x = args[0]);
        args.length >= 2 && (this.y = args[1]);
    }
}
export class map_tile {
    public x: number = 0;
    public y: number = 0;
    public grid_offset: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.x = args[0]);
        args.length >= 2 && (this.y = args[1]);
        args.length >= 3 && (this.grid_offset = args[2]);
    }
}
let last: map_point = { 0, 0};
export function map_point_store_result(x: number, y: number, point: map_point) {
    point.x = last.x = x;
    point.y = last.y = y;
}
export function map_point_get_last_result(point: map_point) {
    point.x = last.x;
    point.y = last.y;
}
