import { Ptr, PtrBuffer } from "../../ext/crt";

export function string_equals(a: Uint8Array, b: Uint8Array) {
    let i = 0;
    while (a[i] && b[i] && a[i] == b[i]) {
        i++;
    }
    if (a[i] == 0 && b[i] == 0) {
        return 1;
    } else {
        return 0;
    }
}
export function string_copy(src: Uint8Array, dst: Uint8Array, maxlength: number) {
    let length: number = 0;
    maxlength = Math.min(maxlength, src.length, dst.length);
    while (length < maxlength && src[length]) {
        dst[length] = src[length];
        length++;
    }
    if (length == maxlength) {
        length--;
    }
    dst[length] = 0;
}
export function string_length(str: Uint8Array) {
    let length: number = 0;
    while (str[length]) {
        length++;
    }
    return length;
}
export function string_from_ascii(str: string): Uint8Array | null {
    for (let i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) & 0x80) {
            return null;
        }
    }
    let result = new Uint8Array(str.length + 1);
    for (let i = 0; i < str.length; i++) {
        result[i] = str.charCodeAt(i);
    }
    result[str.length] = 0;
    return result;
}
export function string_to_int(str: PtrBuffer) {
    let multipliers: number[] = [1, 10, 100, 1000, 10000, 100000, 1000000, 10000000];
    let ptr = new PtrBuffer(str.buffer, str.offset);
    let negative: number = 0;
    let num_chars: number = 0;
    const charCode0 = '0'.charCodeAt(0);
    const charCode9 = '9'.charCodeAt(0);
    const charCodeHyphen = '-'.charCodeAt(0);
    if (ptr.get() == charCodeHyphen) {
        negative = 1;
        ptr.inc();
    }
    while (ptr.get() >= charCode0 && ptr.get() <= charCode9) {
        num_chars++;
        ptr.inc();
    }
    if (num_chars > 8) {
        return 0;
    }
    ptr = new PtrBuffer(str.buffer, str.offset);
    if (ptr.get() == charCodeHyphen) {
        ptr.inc();
    }
    let result: number = 0;
    while (num_chars) {
        result += multipliers[num_chars] * (ptr.get() - charCode0);
        ptr.inc();
    }
    if (negative) {
        result = -result;
    }
    return result;
}
export function string_from_int(dst: number, value: number, force_plus_sign: number) {
    let total_chars: number = 0;
    if (value >= 0) {
        if (force_plus_sign) {
            dst[0] = '+';
            dst++;
            total_chars = 1;
        }
    } else {
        dst[0] = '-';
        dst++;
        value = -value;
        total_chars = 1;
    }
    let num_digits: number;
    if (value < 10) {
        num_digits = 1;
    } else if (value < 100) {
        num_digits = 2;
    } else if (value < 1000) {
        num_digits = 3;
    } else if (value < 10000) {
        num_digits = 4;
    } else if (value < 100000) {
        num_digits = 5;
    } else if (value < 1000000) {
        num_digits = 6;
    } else if (value < 10000000) {
        num_digits = 7;
    } else if (value < 100000000) {
        num_digits = 8;
    } else if (value < 1000000000) {
        num_digits = 9;
    } else {
        num_digits = 0;
    }
    total_chars += num_digits;
    dst[num_digits] = 0;
    while (--num_digits >= 0) {
        dst[num_digits] = Math.floor(value % 10 + '0'.charCodeAt(0));
        value = Math.floor(value / 10);
    }
    return total_chars;
}
