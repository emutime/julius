export const MAX_ROUTES = 20;
;
import { buffer, buffer_read_i32, buffer_write_i32 } from 'core/buffer';
import { resource_type } from 'game/resource';
import RESOURCE_MIN = resource_type.RESOURCE_MIN;
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
export class route_resource {
    public limit: number = 0;
    public traded: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.limit = args[0]);
        args.length >= 2 && (this.traded = args[1]);
    }
}
let data: route_resource[] = new Array(MAX_ROUTES);
export function trade_route_init(route_id: number, resource: resource_type, limit: number) {
    data[route_id][resource].limit = limit;
    data[route_id][resource].traded = 0;
}
export function trade_route_limit(route_id: number, resource: resource_type) {
    return data[route_id][resource].limit;
}
export function trade_route_traded(route_id: number, resource: resource_type) {
    return data[route_id][resource].traded;
}
export function trade_route_increase_limit(route_id: number, resource: resource_type) {
    switch (data[route_id][resource].limit) {
        case 0:
            data[route_id][resource].limit = 15;
            break
        case 15:
            data[route_id][resource].limit = 25;
            break
        case 25:
            data[route_id][resource].limit = 40;
            break
        default: return 0
    }
    return 1;
}
export function trade_route_decrease_limit(route_id: number, resource: resource_type) {
    switch (data[route_id][resource].limit) {
        case 40:
            data[route_id][resource].limit = 25;
            break
        case 25:
            data[route_id][resource].limit = 15;
            break
        case 15:
            data[route_id][resource].limit = 0;
            break
        default: return 0
    }
    return 1;
}
export function trade_route_increase_traded(route_id: number, resource: resource_type) {
    data[route_id][resource].traded++;
}
export function trade_route_reset_traded(route_id: number) {
    for (let r: number = RESOURCE_MIN; r < RESOURCE_MAX; r++) {
        data[route_id][r].traded = 0;
    }
}
export function trade_route_limit_reached(route_id: number, resource: resource_type) {
    return data[route_id][resource].traded >= data[route_id][resource].limit;
}
export function trade_routes_save_state(limit: buffer, traded: buffer) {
    for (let route_id: number = 0; route_id < MAX_ROUTES; route_id++) {
        for (let r: number = 0; r < RESOURCE_MAX; r++) {
            buffer_write_i32(limit, data[route_id][r].limit);
            buffer_write_i32(traded, data[route_id][r].traded);
        }
    }
}
export function trade_routes_load_state(limit: buffer, traded: buffer) {
    for (let route_id: number = 0; route_id < MAX_ROUTES; route_id++) {
        for (let r: number = 0; r < RESOURCE_MAX; r++) {
            data[route_id][r].limit = buffer_read_i32(limit);
            data[route_id][r].traded = buffer_read_i32(traded);
        }
    }
}
