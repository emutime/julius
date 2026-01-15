
export class Ref<T> {
    public v: T;
    constructor(value: T) {
        this.v = value;
    }
}

export class PtrBuffer {
    private m_offset: number;
    private m_buffer: Uint8Array;
    constructor(buffer: Uint8Array, offset: number = 0) {
        this.m_offset = offset;
        this.m_buffer = buffer;
    }
    public get offset(): number {
        return this.m_offset;
    }
    public get buffer(): Uint8Array {
        return this.m_buffer;
    }
    public inc(offset: number = 1): PtrBuffer {
        this.m_offset += offset;
        return this;
    }
    public dec(offset: number = 1): PtrBuffer {
        this.m_offset -= offset;
        return this;
    }
    public get(): number {
        return this.m_buffer[this.m_offset];
    }
    public set(value: number): void {
        this.m_buffer[this.m_offset] = value;
    }
}

export function malloc(size: number): Uint8Array {
    return new Uint8Array(size);
}

export function free(buffer: Uint8Array): void {
}

export function memset(ptr: any, value: number, size?: number): void {
    if (!ptr) {
        return;
    }
    const length = typeof ptr.length === "number" ? (size ?? ptr.length) : 0;
    for (let i = 0; i < length; i++) {
        ptr[i] = value;
    }
}

export function memcpy(dst: any, src: any, size: number): void {
    if (!dst || !src || size <= 0) {
        return;
    }
    const dstLength = typeof dst.length === "number" ? dst.length : size;
    const srcLength = typeof src.length === "number" ? src.length : size;
    const length = Math.min(size, dstLength, srcLength);
    for (let i = 0; i < length; i++) {
        dst[i] = src[i];
    }
}

function toCString(value: any): string {
    if (typeof value === "string") {
        return value;
    }
    if (!value || typeof value.length !== "number") {
        return "";
    }
    let result = "";
    for (let i = 0; i < value.length; i++) {
        const code = value[i];
        if (!code) {
            break;
        }
        result += String.fromCharCode(code);
    }
    return result;
}

export function strcmp(a: any, b: any): number {
    const left = toCString(a);
    const right = toCString(b);
    if (left === right) {
        return 0;
    }
    return left < right ? -1 : 1;
}

export function strncpy(dst: any, src: any, size: number): void {
    if (!dst || size <= 0) {
        return;
    }
    const max = Math.min(size, typeof dst.length === "number" ? dst.length : size);
    const isString = typeof src === "string";
    let i = 0;
    for (; i < max; i++) {
        let value: number;
        if (isString) {
            value = i < src.length ? src.charCodeAt(i) : 0;
        } else if (src && typeof src.length === "number") {
            value = src[i] ?? 0;
        } else {
            value = 0;
        }
        dst[i] = value;
        if (value === 0) {
            i++;
            break;
        }
    }
    for (; i < max; i++) {
        dst[i] = 0;
    }
}

export function strtok(str: string, delim: string): string {
    return str.split(delim)[0];
}

export function textEncodeUTF8(str: string): Uint8Array<ArrayBuffer> {
    return new TextEncoder().encode(str);
}

export function textDecodeUTF8(buf: Uint8Array<ArrayBuffer>): string {
    return new TextDecoder().decode(buf);
}