import { buffer } from 'core/buffer';
import { GRID, grid_u8, map_grid_clear_u8, map_grid_copy_u8, map_grid_load_state_u8, map_grid_save_state_u8 } from 'map/grid';
import GRID_SIZE = GRID.GRID_SIZE;
let sprite: grid_u8;
let sprite_backup: grid_u8;
export function map_sprite_animation_at(grid_offset: number) {
    return sprite.items[grid_offset];
}
export function map_sprite_animation_set(grid_offset: number, value: number) {
    sprite.items[grid_offset] = value;
}
export function map_sprite_bridge_at(grid_offset: number) {
    return sprite.items[grid_offset];
}
export function map_sprite_bridge_set(grid_offset: number, value: number) {
    sprite.items[grid_offset] = value;
}
export function map_sprite_clear_tile(grid_offset: number) {
    sprite.items[grid_offset] = 0;
}
export function map_sprite_clear() {
    map_grid_clear_u8(sprite.items);
}
export function map_sprite_backup() {
    map_grid_copy_u8(sprite.items, sprite_backup.items);
}
export function map_sprite_restore() {
    map_grid_copy_u8(sprite_backup.items, sprite.items);
}
export function map_sprite_save_state(buf: buffer, backup: buffer) {
    map_grid_save_state_u8(sprite.items, buf);
    map_grid_save_state_u8(sprite_backup.items, backup);
}
export function map_sprite_load_state(buf: buffer, backup: buffer) {
    map_grid_load_state_u8(sprite.items, buf);
    map_grid_load_state_u8(sprite_backup.items, backup);
}
