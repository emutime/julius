// sprite.ts

import { grid_u8 } from './map/grid'; // 假设 grid_u8 是从 grid 模块导入的

// 定义 sprite 和 sprite_backup 变量
const sprite: grid_u8 = new grid_u8();
const sprite_backup: grid_u8 = new grid_u8();

// 获取指定网格偏移的动画值
export function map_sprite_animation_at(grid_offset: number): number {
    return sprite.items[grid_offset];
}

// 设置指定网格偏移的动画值
export function map_sprite_animation_set(grid_offset: number, value: number): void {
    sprite.items[grid_offset] = value;
}

// 获取指定网格偏移的桥接值
export function map_sprite_bridge_at(grid_offset: number): number {
    return sprite.items[grid_offset];
}

// 设置指定网格偏移的桥接值
export function map_sprite_bridge_set(grid_offset: number, value: number): void {
    sprite.items[grid_offset] = value;
}

// 清除指定网格偏移的瓦片
export function map_sprite_clear_tile(grid_offset: number): void {
    sprite.items[grid_offset] = 0;
}

// 清除所有精灵
export function map_sprite_clear(): void {
    map_grid_clear_u8(sprite.items);
}

// 备份当前精灵状态
export function map_sprite_backup(): void {
    map_grid_copy_u8(sprite.items, sprite_backup.items);
}

// 恢复备份的精灵状态
export function map_sprite_restore(): void {
    map_grid_copy_u8(sprite_backup.items, sprite.items);
}

// 保存精灵状态到缓冲区
export function map_sprite_save_state(buf: Uint8Array, backup: Uint8Array): void {
    map_grid_save_state_u8(sprite.items, buf);
    map_grid_save_state_u8(sprite_backup.items, backup);
}

// 从缓冲区加载精灵状态
export function map_sprite_load_state(buf: Uint8Array, backup: Uint8Array): void {
    map_grid_load_state_u8(sprite.items, buf);
    map_grid_load_state_u8(sprite_backup.items, backup);
}