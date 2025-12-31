export const MAX_BOOKMARKS = 4;
import { city_view_get_camera_absolute, city_view_set_camera_absolute } from 'city/view';
import { buffer, buffer_read_i32, buffer_write_i32 } from 'core/buffer';
import { GRID, map_grid_offset } from 'map/grid';
import { map_point } from 'map/point';
import { Ref } from '../../ext/crt';
import GRID_SIZE = GRID.GRID_SIZE;
let bookmarks: map_point[] = new Array(MAX_BOOKMARKS);
export function map_bookmarks_clear() {
    for (let i: number = 0; i < MAX_BOOKMARKS; i++) {
        bookmarks[i].x = -1;
        bookmarks[i].y = -1;
    }
}
export function map_bookmark_save(number: number) {
    if (number >= 0 && number < MAX_BOOKMARKS) {
        const x_ref = new Ref(0);
        const y_ref = new Ref(0);
        city_view_get_camera_absolute(x_ref, y_ref);
        bookmarks[number].x = x_ref.v;

    }
}
export function map_bookmark_go_to(number: number) {
    if (number >= 0 && number < MAX_BOOKMARKS) {
        let x: number = bookmarks[number].x;
        let y: number = bookmarks[number].y;
        if (x > -1 && map_grid_offset(x, y) > -1) {
            city_view_set_camera_absolute(x, y);
            return 1;
        }
    }
    return 0;
}
export function map_bookmark_save_state(buf: buffer) {
    for (let i: number = 0; i < MAX_BOOKMARKS; i++) {
        buffer_write_i32(buf, bookmarks[i].x);
        buffer_write_i32(buf, bookmarks[i].y);
    }
}
export function map_bookmark_load_state(buf: buffer) {
    for (let i: number = 0; i < MAX_BOOKMARKS; i++) {
        bookmarks[i].x = buffer_read_i32(buf);
        bookmarks[i].y = buffer_read_i32(buf);
    }
}
