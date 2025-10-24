export const MAX_STORAGES = 200;
import { building, building_get, MAX_BUILDINGS } from 'building/building';
import { building_state, building_type } from 'building/type';
import { buffer, buffer_read_i32, buffer_read_u8, buffer_skip, buffer_write_i32, buffer_write_u8 } from 'core/buffer';
import { resource_type } from 'game/resource';
import { memset } from '../../ext/crt';
export const enum building_storage_state {
    BUILDING_STORAGE_STATE_ACCEPTING = 0,
    BUILDING_STORAGE_STATE_NOT_ACCEPTING = 1,
    BUILDING_STORAGE_STATE_GETTING = 2
};

import RESOURCE_MIN = resource_type.RESOURCE_MIN;
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
import BUILDING_STORAGE_STATE_ACCEPTING = building_storage_state.BUILDING_STORAGE_STATE_ACCEPTING;
import BUILDING_STORAGE_STATE_NOT_ACCEPTING = building_storage_state.BUILDING_STORAGE_STATE_NOT_ACCEPTING;
import BUILDING_STORAGE_STATE_GETTING = building_storage_state.BUILDING_STORAGE_STATE_GETTING;
export class building_storage {
    public empty_all: number = 0;
    public resource_state: building_storage_state[] = new Array(RESOURCE_MAX).fill(null);
    public constructor(...args: any[]) {
        args.length >= 1 && (this.empty_all = args[0]);
        args.length >= 2 && (this.resource_state = args[1]);
    }
}
import BUILDING_GRANARY = building_type.BUILDING_GRANARY;
import BUILDING_WAREHOUSE = building_type.BUILDING_WAREHOUSE;
import BUILDING_STATE_UNUSED = building_state.BUILDING_STATE_UNUSED;
export class data_storage {
    public in_use: number = 0;
    public building_id: number = 0;
    public storage: building_storage = null;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.in_use = args[0]);
        args.length >= 2 && (this.building_id = args[1]);
        args.length >= 3 && (this.storage = args[2]);
    }
}
export class unnamed15_8 {
    public storages: data_storage[] = new Array(MAX_STORAGES).fill(null);
    public constructor(...args: any[]) {
        args.length >= 1 && (this.storages = args[0]);
    }
}
let data: unnamed15_8 = new unnamed15_8();
export function building_storage_clear_all() {
    memset(data.storages, 0);
}
export function building_storage_reset_building_ids() {
    for (let i: number = 1; i < MAX_STORAGES; i++) {
        data.storages[i].building_id = 0;
    }
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state == BUILDING_STATE_UNUSED) {
            continue
        }
        if (b.type == BUILDING_GRANARY || b.type == BUILDING_WAREHOUSE) {
            if (b.storage_id) {
                if (data.storages[b.storage_id].building_id) {
                    b.storage_id = building_storage_create();
                } else {
                    data.storages[b.storage_id].building_id = i;
                }
            }
        }
    }
}
export function building_storage_create() {
    for (let i: number = 1; i < MAX_STORAGES; i++) {
        if (!data.storages[i].in_use) {
            memset(data.storages[i], 0);
            data.storages[i].in_use = 1;
            return i;
        }
    }
    return 0;
}
export function building_storage_restore(storage_id: number) {
    if (data.storages[storage_id].in_use) {
        return 0;
    }
    data.storages[storage_id].in_use = 1;
    return storage_id;
}
export function building_storage_delete(storage_id: number) {
    data.storages[storage_id].in_use = 0;
}
export function building_storage_get(storage_id: number) {
    return data.storages[storage_id].storage;
}
export function building_storage_toggle_empty_all(storage_id: number) {
    data.storages[storage_id].storage.empty_all = 1 - data.storages[storage_id].storage.empty_all;
}
export function building_storage_cycle_resource_state(storage_id: number, resource_id: resource_type) {
    let state: number = data.storages[storage_id].storage.resource_state[resource_id];
    if (state == BUILDING_STORAGE_STATE_ACCEPTING) {
        state = BUILDING_STORAGE_STATE_NOT_ACCEPTING;
    } else if (state == BUILDING_STORAGE_STATE_NOT_ACCEPTING) {
        state = BUILDING_STORAGE_STATE_GETTING;
    } else if (state == BUILDING_STORAGE_STATE_GETTING) {
        state = BUILDING_STORAGE_STATE_ACCEPTING;
    }
    data.storages[storage_id].storage.resource_state[resource_id] = state;
}
export function building_storage_accept_none(storage_id: number) {
    for (let r: number = RESOURCE_MIN; r < RESOURCE_MAX; r++) {
        data.storages[storage_id].storage.resource_state[r] = BUILDING_STORAGE_STATE_NOT_ACCEPTING;
    }
}
export function building_storage_save_state(buf: buffer) {
    for (let i: number = 0; i < MAX_STORAGES; i++) {
        buffer_write_i32(buf, 0);
        buffer_write_i32(buf, data.storages[i].building_id);
        buffer_write_u8(buf, data.storages[i].in_use);
        buffer_write_u8(buf, data.storages[i].storage.empty_all);
        for (let r: number = 0; r < RESOURCE_MAX; r++) {
            buffer_write_u8(buf, data.storages[i].storage.resource_state[r]);
        }
        for (let r: number = 0; r < 6; r++) {
            buffer_write_u8(buf, 0);
        }
    }
}
export function building_storage_load_state(buf: buffer) {
    for (let i: number = 0; i < MAX_STORAGES; i++) {
        buffer_skip(buf, 4);
        data.storages[i].building_id = buffer_read_i32(buf);
        data.storages[i].in_use = buffer_read_u8(buf);
        data.storages[i].storage.empty_all = buffer_read_u8(buf);
        for (let r: number = 0; r < RESOURCE_MAX; r++) {
            data.storages[i].storage.resource_state[r] = buffer_read_u8(buf);
        }
        buffer_skip(buf, 6);
    }
}
