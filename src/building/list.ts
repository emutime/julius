export const MAX_SMALL = 500;
export const MAX_LARGE = 2000;
export const MAX_BURNING = 500;
import { buffer, buffer_read_i16, buffer_read_i32, buffer_write_i16, buffer_write_i32 } from 'core/buffer';
import { memset } from '../../ext/crt';

class small {
    public size: number = 0;
    public items: number[] = new Array(MAX_SMALL).fill(0);
    public constructor(...args: any[]) {
        args.length >= 1 && (this.size = args[0]);
        args.length >= 2 && (this.items = args[1]);
    }
}
class large {
    public size: number = 0;
    public items: number[] = new Array(MAX_LARGE).fill(0);
    public constructor(...args: any[]) {
        args.length >= 1 && (this.size = args[0]);
        args.length >= 2 && (this.items = args[1]);
    }
}
class burning {
    public size: number = 0;
    public items: number[] = new Array(MAX_BURNING).fill(0);
    public total: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.size = args[0]);
        args.length >= 2 && (this.items = args[1]);
        args.length >= 3 && (this.total = args[2]);
    }
}
export class unnamed9_8 {
    public small: small = null;
    public large: large = null;
    public burning: burning = null;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.small = args[0]);
        args.length >= 2 && (this.large = args[1]);
        args.length >= 3 && (this.burning = args[2]);
    }
}
let data: unnamed9_8 = new unnamed9_8();
export function building_list_small_clear() {
    data.small.size = 0;
}
export function building_list_small_add(building_id: number) {
    data.small.items[data.small.size++] = building_id;
    if (data.small.size >= MAX_SMALL) {
        data.small.size = MAX_SMALL - 1;
    }
}
export function building_list_small_size() {
    return data.small.size;
}
export function building_list_small_items() {
    return data.small.items;
}
export function building_list_large_clear(clear_entries: number) {
    data.large.size = 0;
    if (clear_entries) {
        memset(data.large.items, 0);
    }
}
export function building_list_large_add(building_id: number) {
    if (data.large.size < MAX_LARGE) {
        data.large.items[data.large.size++] = building_id;
    }
}
export function building_list_large_size() {
    return data.large.size;
}
export function building_list_large_items() {
    return data.large.items;
}
export function building_list_burning_clear() {
    data.burning.size = 0;
    data.burning.total = 0;
}
export function building_list_burning_add(building_id: number) {
    data.burning.total++;
    data.burning.items[data.burning.size++] = building_id;
    if (data.burning.size >= MAX_BURNING) {
        data.burning.size = MAX_BURNING - 1;
    }
}
export function building_list_burning_size() {
    return data.burning.size;
}
export function building_list_burning_items() {
    return data.burning.items;
}
export function building_list_save_state(small: buffer, large: buffer, burning: buffer, burning_totals: buffer) {
    for (let i: number = 0; i < MAX_SMALL; i++) {
        buffer_write_i16(small, data.small.items[i]);
    }
    for (let i: number = 0; i < MAX_LARGE; i++) {
        buffer_write_i16(large, data.large.items[i]);
    }
    for (let i: number = 0; i < MAX_BURNING; i++) {
        buffer_write_i16(burning, data.burning.items[i]);
    }
    buffer_write_i32(burning_totals, data.burning.total);
    buffer_write_i32(burning_totals, data.burning.size);
}
export function building_list_load_state(small: buffer, large: buffer, burning: buffer, burning_totals: buffer) {
    for (let i: number = 0; i < MAX_SMALL; i++) {
        data.small.items[i] = buffer_read_i16(small);
    }
    for (let i: number = 0; i < MAX_LARGE; i++) {
        data.large.items[i] = buffer_read_i16(large);
    }
    for (let i: number = 0; i < MAX_BURNING; i++) {
        data.burning.items[i] = buffer_read_i16(burning);
    }
    data.burning.total = buffer_read_i32(burning_totals);
    data.burning.size = buffer_read_i32(burning_totals);
}
