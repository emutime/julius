
;
export function string_equals(a: number, b: number) {
    while (* a && * b && * a == * b) {
        ++a;
        ++b;
    }
    if (* a == 0 && * b == 0) {
        return 1;
    } else {
        return 0;
    }
}
export function string_copy(src: number, dst: number, maxlength: number) {
    let length: number = 0;
    while (length < maxlength && * src) {
            * dst = * src;
        src++;
        dst++;
        length++;
    }
    if (length == maxlength) {
        dst--;
    }
    * dst = 0;
}
export function string_length(str: number) {
    let length: number = 0;
    while (* str) {
        length++;
        str++;
    }
    return length;
}
export function string_from_ascii(str: char) {
    let s: char = str;
    while (* s) {
        if (* s & 0x80) {
            return 0;
        }
        s++;
    }
    return (const uint8_t *) str;
}
export function string_to_int(str: number) {
    let multipliers: number[] = { 1, 10, 100, 1000, 10000, 100000, 1000000, 10000000};
    let ptr: number = str;
    let negative: number = 0;
    let num_chars: number = 0;
    if (* ptr == '-') {
        negative = 1;
        ptr++;
    }
    while (* ptr >= '0' && * ptr <= '9') {
        num_chars++;
        ptr++;
    }
    if (num_chars > 8) {
        return 0;
    }
    ptr = str;
    if (* ptr == '-') {
        ptr++;
    }
    let result: number = 0;
    while (num_chars) {
        --num_chars;
        result += multipliers[num_chars] * (* ptr - '0');
        ptr++;
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
    total_chars += num_digits
    dst[num_digits] = 0;
    while (--num_digits >= 0) {
        dst[num_digits] = (uint8_t)(value % 10 + '0');
        value /= 10;
    }
    return total_chars;
}
