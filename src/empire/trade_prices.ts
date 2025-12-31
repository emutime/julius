

import { buffer } from 'core/buffer';
import { buffer_write_i32 } from 'core/buffer';
import { buffer_read_i32 } from 'core/buffer';
import { resource_type } from 'game/resource';
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
export class trade_price {
    public buy: number = 0;
    public sell: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.buy = args[0]);
        args.length >= 2 && (this.sell = args[1]);
    }
}
let DEFAULT_PRICES: trade_price[] = [
    new trade_price(0, 0), new trade_price(28, 22), new trade_price(38, 30), new trade_price(38, 30), // wheat, vegetables, fruit
    new trade_price(42, 34), new trade_price(44, 36), new trade_price(44, 36), new trade_price(215, 160), // olives, vines, meat, wine
    new trade_price(180, 140), new trade_price(60, 40), new trade_price(50, 35), new trade_price(40, 30), // oil, iron, timber, clay
    new trade_price(200, 140), new trade_price(250, 180), new trade_price(200, 150), new trade_price(180, 140) // marble, weapons, furniture, pottery
];
let prices: trade_price[] = new Array(RESOURCE_MAX);
export function trade_prices_reset() {
    for (let i: number = 0; i < RESOURCE_MAX; i++) {
        prices[i] = DEFAULT_PRICES[i];
    }
}
export function trade_price_buy(resource: resource_type) {
    return prices[resource].buy;
}
export function trade_price_sell(resource: resource_type) {
    return prices[resource].sell;
}
export function trade_price_change(resource: resource_type, amount: number) {
    if (amount < 0 && prices[resource].sell <= 0) {
        return 0;
    }
    if (amount < 0 && prices[resource].sell <= -amount) {
        prices[resource].buy = 2;
        prices[resource].sell = 0;
    } else {
        prices[resource].buy += amount
        prices[resource].sell += amount
    }
    return 1;
}
export function trade_prices_save_state(buf: buffer) {
    for (let i: number = 0; i < RESOURCE_MAX; i++) {
        buffer_write_i32(buf, prices[i].buy);
        buffer_write_i32(buf, prices[i].sell);
    }
}
export function trade_prices_load_state(buf: buffer) {
    for (let i: number = 0; i < RESOURCE_MAX; i++) {
        prices[i].buy = buffer_read_i32(buf);
        prices[i].sell = buffer_read_i32(buf);
    }
}
