
;
import { buffer } from 'core/buffer';
import { GRID, grid_u16, map_grid_clear_u16, map_grid_copy_u16, map_grid_load_state_u16, map_grid_offset, map_grid_save_state_u16, map_grid_size } from 'map/grid';
import GRID_SIZE = GRID.GRID_SIZE;
let images: grid_u16;
let images_backup: grid_u16;
export function map_image_at(grid_offset: number) {
    return images.items[grid_offset];
}
export function map_image_set(grid_offset: number, image_id: number) {
    images.items[grid_offset] = image_id;
}
export function map_image_backup() {
    map_grid_copy_u16(images.items, images_backup.items);
}
export function map_image_restore() {
    map_grid_copy_u16(images_backup.items, images.items);
}
export function map_image_restore_at(grid_offset: number) {
    images.items[grid_offset] = images_backup.items[grid_offset];
}
export function map_image_clear() {
    map_grid_clear_u16(images.items);
}
export function map_image_init_edges() {
    let width: number
    let height: number;
    map_grid_size(width, height);
    for (let x: number = 1; x < width; x++) {
        images.items[map_grid_offset(x, height)] = 1;
    }
    for (let y: number = 1; y < height; y++) {
        images.items[map_grid_offset(width, y)] = 2;
    }
    images.items[map_grid_offset(0, height)] = 3;
    images.items[map_grid_offset(width, 0)] = 4;
    images.items[map_grid_offset(width, height)] = 5;
}
export function map_image_save_state(buf: buffer) {
    map_grid_save_state_u16(images.items, buf);
}
export function map_image_load_state(buf: buffer) {
    map_grid_load_state_u16(images.items, buf);
}
