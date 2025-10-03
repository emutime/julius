export const MAX_RANDOM = 100;
;
import { buffer, buffer_read_u32, buffer_write_u32 } from 'core/buffer';
import { memset } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vcruntime_string';
export class unnamed7_8 {
    public iv1: number = 0;
    public iv2: number = 0;
    public random1_7bit: number = 0;
    public random1_15bit: number = 0;
    public random2_7bit: number = 0;
    public random2_15bit: number = 0;
    public pool_index: number = 0;
    public pool: number[] = new Array(MAX_RANDOM).fill(0);
    public constructor(...args: any[]) {
        args.length >= 1 && (this.iv1 = args[0]);
        args.length >= 2 && (this.iv2 = args[1]);
        args.length >= 3 && (this.random1_7bit = args[2]);
        args.length >= 4 && (this.random1_15bit = args[3]);
        args.length >= 5 && (this.random2_7bit = args[4]);
        args.length >= 6 && (this.random2_15bit = args[5]);
        args.length >= 7 && (this.pool_index = args[6]);
        args.length >= 8 && (this.pool = args[7]);
    }
}
let data: unnamed7_8 = new unnamed7_8();
export function random_init() {
    memset(data, 0);
    data.iv1 = 0x54657687;
    data.iv2 = 0x72641663;
}
export function random_generate_next() {
    data.pool[data.pool_index++] = data.random1_7bit;
    if (data.pool_index >= MAX_RANDOM) {
        data.pool_index = 0;
    }
    for (let i: number = 0; i < 31; i++) {
        let r1: number = (((data.iv1 & 0x10) >> 4) ^ data.iv1) & 1;
        let r2: number = (((data.iv2 & 0x10) >> 4) ^ data.iv2) & 1;
        data.iv1 = data.iv1 >> 1;
        data.iv2 = data.iv2 >> 1;
        if (r1) {
            data.iv1 |= 0x40000000
        }
        if (r2) {
            data.iv2 |= 0x40000000
        }
    }
    data.random1_7bit = data.iv1 & 0x7f;
    data.random1_15bit = data.iv1 & 0x7fff;
    data.random2_7bit = data.iv2 & 0x7f;
    data.random2_15bit = data.iv2 & 0x7fff;
}
export function random_generate_pool() {
    data.pool_index = 0;
    for (let i: number = 0; i < MAX_RANDOM; i++) {
        random_generate_next();
    }
}
export function random_byte() {
    return data.random1_7bit;
}
export function random_byte_alt() {
    return data.random2_7bit;
}
export function random_short() {
    return data.random1_15bit;
}
export function random_from_pool(index: number) {
    return data.pool[(data.pool_index + index) % MAX_RANDOM];
}
export function random_load_state(buf: buffer) {
    data.iv1 = buffer_read_u32(buf);
    data.iv2 = buffer_read_u32(buf);
}
export function random_save_state(buf: buffer) {
    buffer_write_u32(buf, data.iv1);
    buffer_write_u32(buf, data.iv2);
}
