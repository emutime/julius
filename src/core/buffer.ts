
;
export class buffer {
    public data: number = 0;
    public size: number = 0;
    public index: number = 0;
    public overflow: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.data = args[0]);
        args.length >= 2 && (this.size = args[1]);
        args.length >= 3 && (this.index = args[2]);
        args.length >= 4 && (this.overflow = args[3]);
    }
}

export function buffer_init(buf: buffer, data: void, size: number) {
    buf.data = data;
    buf.size = size;
    buf.index = 0;
    buf.overflow = 0;
}
export function buffer_reset(buf: buffer) {
    buf.index = 0;
    buf.overflow = 0;
}
export function buffer_set(buf: buffer, offset: number) {
    buf.index = offset;
}
function check_size(buf: buffer, size: number) {
    if (buf.index + size > buf.size) {
        buf.overflow = 1;
        return 0;
    }
    return 1;
}
export function buffer_write_u8(buf: buffer, value: number) {
    if (check_size(buf, 1)) {
        buf.data[buf.index++] = value;
    }
}
export function buffer_write_u16(buf: buffer, value: number) {
    if (check_size(buf, 2)) {
        buf.data[buf.index++] = value & 0xff;
        buf.data[buf.index++] = (value >> 8) & 0xff;
    }
}
export function buffer_write_u32(buf: buffer, value: number) {
    if (check_size(buf, 4)) {
        buf.data[buf.index++] = value & 0xff;
        buf.data[buf.index++] = (value >> 8) & 0xff;
        buf.data[buf.index++] = (value >> 16) & 0xff;
        buf.data[buf.index++] = (value >> 24) & 0xff;
    }
}
export function buffer_write_i8(buf: buffer, value: number) {
    if (check_size(buf, 1)) {
        buf.data[buf.index++] = value & 0xff;
    }
}
export function buffer_write_i16(buf: buffer, value: number) {
    if (check_size(buf, 2)) {
        buf.data[buf.index++] = value & 0xff;
        buf.data[buf.index++] = (value >> 8) & 0xff;
    }
}
export function buffer_write_i32(buf: buffer, value: number) {
    if (check_size(buf, 4)) {
        buf.data[buf.index++] = value & 0xff;
        buf.data[buf.index++] = (value >> 8) & 0xff;
        buf.data[buf.index++] = (value >> 16) & 0xff;
        buf.data[buf.index++] = (value >> 24) & 0xff;
    }
}
export function buffer_write_raw(buf: buffer, value: ArrayBuffer, size: number) {
    if (check_size(buf, size)) {
        memcpy(buf.data[buf.index], value, size);
        buf.index += size
    }
}
export function buffer_read_u8(buf: buffer) {
    if (check_size(buf, 1)) {
        return buf.data[buf.index++];
    } else {
        return 0;
    }
}
export function buffer_read_u16(buf: buffer) {
    if (check_size(buf, 2)) {
        let b0: number = buf.data[buf.index++];
        let b1: number = buf.data[buf.index++];
        return (uint16_t)(b0 | (b1 << 8));
    } else {
        return 0;
    }
}
export function buffer_read_u32(buf: buffer) {
    if (check_size(buf, 4)) {
        let b0: number = buf.data[buf.index++];
        let b1: number = buf.data[buf.index++];
        let b2: number = buf.data[buf.index++];
        let b3: number = buf.data[buf.index++];
        return (uint32_t)(b0 | (b1 << 8) | (b2 << 16) | (b3 << 24));
    } else {
        return 0;
    }
}
export function buffer_read_i8(buf: buffer) {
    if (check_size(buf, 1)) {
        return (int8_t) buf.data[buf.index++];
    } else {
        return 0;
    }
}
export function buffer_read_i16(buf: buffer) {
    if (check_size(buf, 2)) {
        let b0: number = buf.data[buf.index++];
        let b1: number = buf.data[buf.index++];
        return (int16_t)(b0 | (b1 << 8));
    } else {
        return 0;
    }
}
export function buffer_read_i32(buf: buffer) {
    if (check_size(buf, 4)) {
        let b0: number = buf.data[buf.index++];
        let b1: number = buf.data[buf.index++];
        let b2: number = buf.data[buf.index++];
        let b3: number = buf.data[buf.index++];
        return (int32_t)(b0 | (b1 << 8) | (b2 << 16) | (b3 << 24));
    } else {
        return 0;
    }
}
export function buffer_read_raw(buf: buffer, value: ArrayBuffer, max_size: number) {
    let size: number = buf.size - buf.index;
    if (size > max_size) {
        size = max_size;
    }
    memcpy(value, buf.data[buf.index], size);
    buf.index += size
    return size;
}
export function buffer_skip(buf: buffer, size: number) {
    buf.index += size
}
export function buffer_at_end(buf: buffer) {
    return buf.index >= buf.size;
}
