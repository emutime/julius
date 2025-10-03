export const MAX_TRADERS = 100;
;
import { buffer, buffer_read_i32, buffer_read_u8, buffer_write_i32, buffer_write_u8 } from 'core/buffer';
import { trade_price_buy, trade_price_sell } from 'empire/trade_prices';
import { resource_type } from 'game/resource';
import { memset } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vcruntime_string';
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
export class trader {
    public bought_amount: number = 0;
    public bought_value: number = 0;
    public bought_resources: number[] = new Array(RESOURCE_MAX).fill(0);
    public sold_amount: number = 0;
    public sold_value: number = 0;
    public sold_resources: number[] = new Array(RESOURCE_MAX).fill(0);
    public constructor(...args: any[]) {
        args.length >= 1 && (this.bought_amount = args[0]);
        args.length >= 2 && (this.bought_value = args[1]);
        args.length >= 3 && (this.bought_resources = args[2]);
        args.length >= 4 && (this.sold_amount = args[3]);
        args.length >= 5 && (this.sold_value = args[4]);
        args.length >= 6 && (this.sold_resources = args[5]);
    }
}
export class unnamed19_8 {
    public traders: trader[] = new Array(MAX_TRADERS).fill(null);
    public next_index: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.traders = args[0]);
        args.length >= 2 && (this.next_index = args[1]);
    }
}
let data: unnamed19_8 = new unnamed19_8();
export function traders_clear() {
    memset(data, 0);
}
export function trader_create() {
    let trader_id: number = data.next_index++;
    if (data.next_index >= MAX_TRADERS) {
        data.next_index = 0;
    }
    memset(data.traders[trader_id], 0);
    return trader_id;
}
export function trader_record_bought_resource(trader_id: number, resource: resource_type) {
    data.traders[trader_id].bought_amount++;
    data.traders[trader_id].bought_resources[resource]++;
    data.traders[trader_id].bought_value += trade_price_buy(resource)
}
export function trader_record_sold_resource(trader_id: number, resource: resource_type) {
    data.traders[trader_id].sold_amount++;
    data.traders[trader_id].sold_resources[resource]++;
    data.traders[trader_id].sold_value += trade_price_sell(resource)
}
export function trader_bought_resources(trader_id: number, resource: resource_type) {
    return data.traders[trader_id].bought_resources[resource];
}
export function trader_sold_resources(trader_id: number, resource: resource_type) {
    return data.traders[trader_id].sold_resources[resource];
}
export function trader_has_traded(trader_id: number) {
    return data.traders[trader_id].bought_amount || data.traders[trader_id].sold_amount;
}
export function trader_has_traded_max(trader_id: number) {
    return data.traders[trader_id].bought_amount >= 12 || data.traders[trader_id].sold_amount >= 12;
}
export function traders_save_state(buf: buffer) {
    for (let i: number = 0; i < MAX_TRADERS; i++) {
        let t: trader = data.traders[i];
        buffer_write_i32(buf, t.bought_amount);
        buffer_write_i32(buf, t.sold_amount);
        for (let r: number = 0; r < RESOURCE_MAX; r++) {
            buffer_write_u8(buf, t.bought_resources[r]);
        }
        for (let r: number = 0; r < RESOURCE_MAX; r++) {
            buffer_write_u8(buf, t.sold_resources[r]);
        }
        buffer_write_i32(buf, t.bought_value);
        buffer_write_i32(buf, t.sold_value);
    }
    buffer_write_i32(buf, data.next_index);
}
export function traders_load_state(buf: buffer) {
    for (let i: number = 0; i < MAX_TRADERS; i++) {
        let t: trader = data.traders[i];
        t.bought_amount = buffer_read_i32(buf);
        t.sold_amount = buffer_read_i32(buf);
        for (let r: number = 0; r < RESOURCE_MAX; r++) {
            t.bought_resources[r] = buffer_read_u8(buf);
        }
        for (let r: number = 0; r < RESOURCE_MAX; r++) {
            t.sold_resources[r] = buffer_read_u8(buf);
        }
        t.bought_value = buffer_read_i32(buf);
        t.sold_value = buffer_read_i32(buf);
    }
    data.next_index = buffer_read_i32(buf);
}
