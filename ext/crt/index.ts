
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

export function memset(ptr: any, value: number): void {

}

export function memcpy(dst: Uint8Array, src: Uint8Array, size: number): void {

}