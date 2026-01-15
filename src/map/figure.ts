import { buffer } from 'core/buffer';
import { figure, figure_get } from 'figure/figure';
import { GRID, grid_u16, map_grid_clear_u16, map_grid_is_valid_offset, map_grid_load_state_u16, map_grid_save_state_u16 } from 'map/grid';
import GRID_SIZE = GRID.GRID_SIZE;
let figures: grid_u16;
export function map_has_figure_at(grid_offset: number) {
    return map_grid_is_valid_offset(grid_offset) && figures.items[grid_offset] > 0;
}
export function map_figure_at(grid_offset: number) {
    return map_grid_is_valid_offset(grid_offset) ? figures.items[grid_offset] : 0;
}
function cap_figures_on_same_tile_index(f: figure) {
    if (f.figures_on_same_tile_index > 20) {
        f.figures_on_same_tile_index = 20;
    }
}
export function map_figure_add(f: figure) {
    if (!map_grid_is_valid_offset(f.grid_offset)) {
        return;
    }
    f.figures_on_same_tile_index = 0;
    f.next_figure_id_on_same_tile = 0;
    if (figures.items[f.grid_offset]) {
        let next: figure = figure_get(figures.items[f.grid_offset]);
        f.figures_on_same_tile_index++;
        while (next.next_figure_id_on_same_tile) {
            next = figure_get(next.next_figure_id_on_same_tile);
            f.figures_on_same_tile_index++;
        }
        cap_figures_on_same_tile_index(f);
        next.next_figure_id_on_same_tile = f.id;
    } else {
        figures.items[f.grid_offset] = f.id;
    }
}
export function map_figure_update(f: figure) {
    if (!map_grid_is_valid_offset(f.grid_offset)) {
        return;
    }
    f.figures_on_same_tile_index = 0;
    let next: figure = figure_get(figures.items[f.grid_offset]);
    while (next.id) {
        if (next.id == f.id) {
            cap_figures_on_same_tile_index(f);
            return;
        }
        f.figures_on_same_tile_index++;
        next = figure_get(next.next_figure_id_on_same_tile);
    }
    cap_figures_on_same_tile_index(f);
}
export function map_figure_delete(f: figure) {
    if (!map_grid_is_valid_offset(f.grid_offset) || !figures.items[f.grid_offset]) {
        f.next_figure_id_on_same_tile = 0;
        return;
    }
    if (figures.items[f.grid_offset] == f.id) {
        figures.items[f.grid_offset] = f.next_figure_id_on_same_tile;
    } else {
        let prev: figure = figure_get(figures.items[f.grid_offset]);
        while (prev.id && prev.next_figure_id_on_same_tile != f.id) {
            prev = figure_get(prev.next_figure_id_on_same_tile);
        }
        prev.next_figure_id_on_same_tile = f.next_figure_id_on_same_tile;
    }
    f.next_figure_id_on_same_tile = 0;
}
export function map_figure_foreach_until(grid_offset: number, callback: (f: figure) => boolean) {
    if (figures.items[grid_offset] > 0) {
        let figure_id: number = figures.items[grid_offset];
        while (figure_id) {
            let f: figure = figure_get(figure_id);
            let result: number = callback(f);
            if (result) {
                return result;
            }
            figure_id = f.next_figure_id_on_same_tile;
        }
    }
    return 0;
}
export function map_figure_clear() {
    map_grid_clear_u16(figures.items);
}
export function map_figure_save_state(buf: buffer) {
    map_grid_save_state_u16(figures.items, buf);
}
export function map_figure_load_state(buf: buffer) {
    map_grid_load_state_u16(figures.items, buf);
}
