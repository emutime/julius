import { PtrBuffer } from "../../ext/crt";

function read_char_code(input: string | ArrayLike<number>, index: number): number {
    if (typeof input === "string") {
        return input.charCodeAt(index) || 0;
    }
    return input[index] ?? 0;
}

export function string_equals(a: string | ArrayLike<number>, b: string | ArrayLike<number>) {
    let i = 0;
    while (read_char_code(a, i) && read_char_code(b, i) && read_char_code(a, i) == read_char_code(b, i)) {
        i++;
    }
    if (read_char_code(a, i) == 0 && read_char_code(b, i) == 0) {
        return 1;
    } else {
        return 0;
    }
}
export function string_copy(
    src: string | ArrayLike<number>,
    dst: ArrayLike<number> & { [index: number]: number },
    maxlength: number,
    extra_maxlength?: number
) {
    let dstOffset = 0;
    let maxLen = maxlength;
    if (extra_maxlength !== undefined) {
        dstOffset = maxlength;
        maxLen = extra_maxlength;
    }
    let length: number = 0;
    const srcLength = typeof src === "string" ? src.length : src.length;
    const dstLength = typeof dst.length === "number" ? dst.length - dstOffset : maxLen;
    maxLen = Math.min(maxLen, srcLength, dstLength);
    while (length < maxLen && read_char_code(src, length)) {
        dst[dstOffset + length] = read_char_code(src, length);
        length++;
    }
    if (length == maxLen && length > 0) {
        length--;
    }
    if (length >= 0) {
        dst[dstOffset + length] = 0;
    }
}
export function string_length(str: string | ArrayLike<number>) {
    let length: number = 0;
    if (typeof str === "string") {
        while (str.charCodeAt(length)) {
            length++;
        }
        return length;
    }
    while (str[length]) {
        length++;
    }
    return length;
}

export function string_from_bytes(bytes: ArrayLike<number>): string {
    let result = "";
    for (let i = 0; i < bytes.length; i++) {
        const code = bytes[i];
        if (!code) {
            break;
        }
        result += String.fromCharCode(code);
    }
    return result;
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
export function string_from_int(dst: ArrayLike<number> & { [index: number]: number }, value: number, force_plus_sign: number) {
    let total_chars: number = 0;
    let dst_offset: number = 0;
    if (value >= 0) {
        if (force_plus_sign) {
            dst[dst_offset++] = '+'.charCodeAt(0);
            total_chars = 1;
        }
    } else {
        dst[dst_offset++] = '-'.charCodeAt(0);
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
    dst[dst_offset + num_digits] = 0;
    while (--num_digits >= 0) {
        dst[dst_offset + num_digits] = Math.floor(value % 10 + '0'.charCodeAt(0));
        value = Math.floor(value / 10);
    }
    return total_chars;
}
