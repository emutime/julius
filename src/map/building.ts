
import { building_get } from 'building/building';
import { building_type } from 'building/type';
import { buffer } from 'core/buffer';
import { GRID, grid_u16, grid_u8, map_grid_clear_u16, map_grid_clear_u8, map_grid_delta, map_grid_is_inside, map_grid_is_valid_offset, map_grid_load_state_u16, map_grid_load_state_u8, map_grid_offset, map_grid_save_state_u16, map_grid_save_state_u8 } from 'map/grid';
import BUILDING_RESERVOIR = building_type.BUILDING_RESERVOIR;
import GRID_SIZE = GRID.GRID_SIZE;
let buildings_grid: grid_u16 = new grid_u16();
let damage_grid: grid_u8 = new grid_u8();
let rubble_type_grid: grid_u8 = new grid_u8();
export function map_building_at(grid_offset: number) {
    return map_grid_is_valid_offset(grid_offset) ? buildings_grid.items[grid_offset] : 0;
}
export function map_building_set(grid_offset: number, building_id: number) {
    buildings_grid.items[grid_offset] = building_id;
}
export function map_building_damage_clear(grid_offset: number) {
    damage_grid.items[grid_offset] = 0;
}
export function map_building_damage_increase(grid_offset: number) {
    return ++damage_grid.items[grid_offset];
}
export function map_rubble_building_type(grid_offset: number) {
    return rubble_type_grid.items[grid_offset];
}
export function map_set_rubble_building_type(grid_offset: number, type: building_type) {
    rubble_type_grid.items[grid_offset] = type;
}
export function map_building_clear() {
    map_grid_clear_u16(buildings_grid.items);
    map_grid_clear_u8(damage_grid.items);
    map_grid_clear_u8(rubble_type_grid.items);
}
export function map_building_save_state(buildings: buffer, damage: buffer) {
    map_grid_save_state_u16(buildings_grid.items, buildings);
    map_grid_save_state_u8(damage_grid.items, damage);
}
export function map_building_load_state(buildings: buffer, damage: buffer) {
    map_grid_load_state_u16(buildings_grid.items, buildings);
    map_grid_load_state_u8(damage_grid.items, damage);
}
export function map_building_is_reservoir(x: number, y: number) {
    if (!map_grid_is_inside(x, y, 3)) {
        return 0;
    }
    let grid_offset: number = map_grid_offset(x, y);
    let building_id: number = map_building_at(grid_offset);
    if (!building_id || building_get(building_id).type != BUILDING_RESERVOIR) {
        return 0;
    }
    for (let dy: number = 0; dy < 3; dy++) {
        for (let dx: number = 0; dx < 3; dx++) {
            if (building_id != map_building_at(grid_offset + map_grid_delta(dx, dy))) {
                return 0;
            }
        }
    }
    return 1;
}
