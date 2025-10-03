
;
import { buffer, buffer_read_i32, buffer_write_i32 } from 'core/buffer';
export class unnamed3_8 {
    public tick: number = 0;
    public day: number = 0;
    public month: number = 0;
    public year: number = 0;
    public total_days: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.tick = args[0]);
        args.length >= 2 && (this.day = args[1]);
        args.length >= 3 && (this.month = args[2]);
        args.length >= 4 && (this.year = args[3]);
        args.length >= 5 && (this.total_days = args[4]);
    }
}
let data: unnamed3_8 = new unnamed3_8();
export function game_time_init(year: number) {
    data.tick = 0;
    data.day = 0;
    data.month = 0;
    data.total_days = 0;
    data.year = year;
}
export function game_time_tick() {
    return data.tick;
}
export function game_time_day() {
    return data.day;
}
export function game_time_month() {
    return data.month;
}
export function game_time_year() {
    return data.year;
}
export function game_time_advance_tick() {
    if (++data.tick >= 50) {
        data.tick = 0;
        return 1;
    }
    return 0;
}
export function game_time_advance_day() {
    data.total_days++;
    if (++data.day >= 16) {
        data.day = 0;
        return 1;
    }
    return 0;
}
export function game_time_advance_month() {
    if (++data.month >= 12) {
        data.month = 0;
        return 1;
    }
    return 0;
}
export function game_time_advance_year() {
    ++data.year;
}
export function game_time_save_state(buf: buffer) {
    buffer_write_i32(buf, data.tick);
    buffer_write_i32(buf, data.day);
    buffer_write_i32(buf, data.month);
    buffer_write_i32(buf, data.year);
    buffer_write_i32(buf, data.total_days);
}
export function game_time_load_state(buf: buffer) {
    data.tick = buffer_read_i32(buf);
    data.day = buffer_read_i32(buf);
    data.month = buffer_read_i32(buf);
    data.year = buffer_read_i32(buf);
    data.total_days = buffer_read_i32(buf);
}
