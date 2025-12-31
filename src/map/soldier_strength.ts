
;
import { figure_get, figure_is_legion } from 'figure/figure';
import { map_figure_at, map_has_figure_at } from 'map/figure';
import { GRID, grid_u8, map_grid_clear_u8, map_grid_get_area, map_grid_offset } from 'map/grid';
import { map_routing_distance } from 'map/routing';
import { Ref } from '../../ext/crt';
import GRID_SIZE = GRID.GRID_SIZE;
let strength: grid_u8;
export function map_soldier_strength_clear() {
    map_grid_clear_u8(strength.items);
}
export function map_soldier_strength_add(x: number, y: number, radius: number, amount: number) {
    let x_min: number
    let y_min: number
    let x_max: number
    let y_max: number;
    map_grid_get_area(x, y, 1, radius, x_min, y_min, x_max, y_max);
    for (let yy: number = y_min; yy <= y_max; yy++) {
        for (let xx: number = x_min; xx <= x_max; xx++) {
            let grid_offset: number = map_grid_offset(xx, yy);
            strength.items[grid_offset] += amount
            if (map_has_figure_at(grid_offset)) {
                if (figure_is_legion(figure_get(map_figure_at(grid_offset)))) {
                    strength.items[grid_offset] += 2
                }
            }
        }
    }
}
export function map_soldier_strength_get(grid_offset: number) {
    return strength.items[grid_offset];
}
export function map_soldier_strength_get_max(x: number, y: number, radius: number, out_x: Ref<number>, out_y: Ref<number>) {
    let x_min: number
    let y_min: number
    let x_max: number
    let y_max: number;
    map_grid_get_area(x, y, 1, radius, x_min, y_min, x_max, y_max);
    let max_value: number = 0;
    let max_tile_x: number = 0
    let max_tile_y: number = 0;
    for (let yy: number = y_min; yy <= y_max; yy++) {
        for (let xx: number = x_min; xx <= x_max; xx++) {
            let grid_offset: number = map_grid_offset(xx, yy);
            if (map_routing_distance(grid_offset) > 0 && strength.items[grid_offset] > max_value) {
                max_value = strength.items[grid_offset];
                max_tile_x = xx;
                max_tile_y = yy;
            }
        }
    }
    if (max_value > 0) {
        out_x.v = max_tile_x;
        out_y.v = max_tile_y;
        return 1;
    }
    return 0;
}
