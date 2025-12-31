
;
import { _invalid_parameter_noinfo } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt';
import { free } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_malloc';
import { free } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_malloc';
import { malloc } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_malloc';
import { malloc } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_malloc';
import { _errno } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stddef';
import { _errno } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdlib';
import { _errno } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/errno';
import { memcpy } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vcruntime_string';
import { memcpy } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vcruntime_string';
import { memmove } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vcruntime_string';
import { memmove } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vcruntime_string';
import { memset } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vcruntime_string';
import { memset } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vcruntime_string';
import { wcsnlen } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstring';
import { wcstok } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstring';
import { strnlen } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/string';
import { log_error } from 'core/log';
export const enum pk {
    PK_SUCCESS = 0,
    PK_INVALID_WINDOWSIZE = 1,
    PK_LITERAL_ENCODING_UNSUPPORTED = 2,
    PK_TOO_FEW_INPUT_BYTES = 3,
    PK_ERROR_DECODING = 4,
    PK_ERROR_VALUE = 774,
    PK_EOF = 773,
}
export class pk_token {
    public stop: number = 0;
    public input_data: number = 0;
    public input_ptr: number = 0;
    public input_length: number = 0;
    public output_data: number = 0;
    public output_ptr: number = 0;
    public output_length: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.stop = args[0]);
        args.length >= 2 && (this.input_data = args[1]);
        args.length >= 3 && (this.input_ptr = args[2]);
        args.length >= 4 && (this.input_length = args[3]);
        args.length >= 5 && (this.output_data = args[4]);
        args.length >= 6 && (this.output_ptr = args[5]);
        args.length >= 7 && (this.output_length = args[6]);
    }
}
export class pk_comp_buffer {
    public input_func: pk_input_func = null;
    public output_func: pk_output_func = null;
    public token: pk_token = null;
    public window_size: number = 0;
    public dictionary_size: number = 0;
    public copy_offset_extra_mask: number = 0;
    public current_output_bits_used: number = 0;
    public input_data: number[] = new Array(8708).fill(0);
    public output_data: number[] = new Array(2050).fill(0);
    public output_ptr: number = 0;
    public analyze_offset_table: number[] = new Array(2304).fill(0);
    public analyze_index: number[] = new Array(8708).fill(0);
    public long_matcher: number[] = new Array(518).fill(0);
    public codeword_values: number[] = new Array(774).fill(0);
    public codeword_bits: number[] = new Array(774).fill(0);
    public constructor(...args: any[]) {
        args.length >= 1 && (this.input_func = args[0]);
        args.length >= 2 && (this.output_func = args[1]);
        args.length >= 3 && (this.token = args[2]);
        args.length >= 4 && (this.window_size = args[3]);
        args.length >= 5 && (this.dictionary_size = args[4]);
        args.length >= 6 && (this.copy_offset_extra_mask = args[5]);
        args.length >= 7 && (this.current_output_bits_used = args[6]);
        args.length >= 8 && (this.input_data = args[7]);
        args.length >= 9 && (this.output_data = args[8]);
        args.length >= 10 && (this.output_ptr = args[9]);
        args.length >= 11 && (this.analyze_offset_table = args[10]);
        args.length >= 12 && (this.analyze_index = args[11]);
        args.length >= 13 && (this.long_matcher = args[12]);
        args.length >= 14 && (this.codeword_values = args[13]);
        args.length >= 15 && (this.codeword_bits = args[14]);
    }
}
export class pk_decomp_buffer {
    public input_func: pk_input_func = null;
    public output_func: pk_output_func = null;
    public token: pk_token = null;
    public window_size: number = 0;
    public dictionary_size: number = 0;
    public current_input_byte: number = 0;
    public current_input_bits_available: number = 0;
    public input_buffer_ptr: number = 0;
    public input_buffer_end: number = 0;
    public output_buffer_ptr: number = 0;
    public input_buffer: number[] = new Array(2048).fill(0);
    public output_buffer: number[] = new Array(8708).fill(0);
    public copy_offset_jump_table: number[] = new Array(256).fill(0);
    public copy_length_jump_table: number[] = new Array(256).fill(0);
    public constructor(...args: any[]) {
        args.length >= 1 && (this.input_func = args[0]);
        args.length >= 2 && (this.output_func = args[1]);
        args.length >= 3 && (this.token = args[2]);
        args.length >= 4 && (this.window_size = args[3]);
        args.length >= 5 && (this.dictionary_size = args[4]);
        args.length >= 6 && (this.current_input_byte = args[5]);
        args.length >= 7 && (this.current_input_bits_available = args[6]);
        args.length >= 8 && (this.input_buffer_ptr = args[7]);
        args.length >= 9 && (this.input_buffer_end = args[8]);
        args.length >= 10 && (this.output_buffer_ptr = args[9]);
        args.length >= 11 && (this.input_buffer = args[10]);
        args.length >= 12 && (this.output_buffer = args[11]);
        args.length >= 13 && (this.copy_offset_jump_table = args[12]);
        args.length >= 14 && (this.copy_length_jump_table = args[13]);
    }
}
export class pk_copy_length_offset {
    public length: number = 0;
    public offset: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.length = args[0]);
        args.length >= 2 && (this.offset = args[1]);
    }
}
let pk_copy_offset_bits: number[] = new Array(64).fill({
    2, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6,
    6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
    7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
    8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
});
let pk_copy_offset_code: number[] = new Array(64).fill({
    0x03, 0x0D, 0x05, 0x19, 0x09, 0x11, 0x01, 0x3E,
    0x1E, 0x2E, 0x0E, 0x36, 0x16, 0x26, 0x06, 0x3A,
    0x1A, 0x2A, 0x0A, 0x32, 0x12, 0x22, 0x42, 0x02,
    0x7C, 0x3C, 0x5C, 0x1C, 0x6C, 0x2C, 0x4C, 0x0C,
    0x74, 0x34, 0x54, 0x14, 0x64, 0x24, 0x44, 0x04,
    0x78, 0x38, 0x58, 0x18, 0x68, 0x28, 0x48, 0x08,
    0xF0, 0x70, 0xB0, 0x30, 0xD0, 0x50, 0x90, 0x10,
    0xE0, 0x60, 0xA0, 0x20, 0xC0, 0x40, 0x80, 0x00,
});
let pk_copy_length_base_bits: number[] = new Array(16).fill({
    3, 2, 3, 3, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 7, 7,
});
let pk_copy_length_base_value: number[] = new Array(16).fill({
    0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07,
    0x08, 0x0A, 0x0E, 0x16, 0x26, 0x46, 0x86, 0x106,
});
let pk_copy_length_base_code: number[] = new Array(16).fill({
    0x05, 0x03, 0x01, 0x06, 0x0A, 0x02, 0x0C, 0x14,
    0x04, 0x18, 0x08, 0x30, 0x10, 0x20, 0x40, 0x00,
});
let pk_copy_length_extra_bits: number[] = new Array(16).fill({
    0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8,
});
function pk_memcpy(dst: number, src: number, length: number) {
    for (let i: number = 0; i < length; i++) {
        dst[i] = src[i];
    }
}
function pk_memset(buffer: void, fill_byte: number, length: number) {
    memset(buffer, 0);
}
function pk_implode_fill_input_buffer(buf: pk_comp_buffer, bytes_to_read: number) {
    let used: number = 0;
    let read: number;
    do {
        read = buf.input_func(buf.input_data[buf.dictionary_size + 516 + used], bytes_to_read, buf.token);
        used += read;
        bytes_to_read -= read;
    } while (read && bytes_to_read > 0)
    return used;
}
function pk_implode_flush_full_buffer(buf: pk_comp_buffer) {
    buf.output_func(buf.output_data, 2048, buf.token);
    let new_first_byte: number = buf.output_data[2048];
    let last_byte: number = buf.output_data[buf.output_ptr];
    buf.output_ptr -= 2048
    memset(buf.output_data, 0);
    if (buf.output_ptr) {
        buf.output_data[0] = new_first_byte;
    }
    if (buf.current_output_bits_used) {
        buf.output_data[buf.output_ptr] = last_byte;
    }
}
function pk_implode_write_bits(buf: pk_comp_buffer, num_bits: number, value: number) {
    if (num_bits > 8) {
        num_bits -= 8
        pk_implode_write_bits(buf, 8u, value);
        value >>= 8
    }
    let current_bits_used: number = buf.current_output_bits_used;
    let shifted_value: number = (uint8_t)(value << buf.current_output_bits_used);
    buf.output_data[buf.output_ptr] |= shifted_value
    buf.current_output_bits_used += num_bits
    if (buf.current_output_bits_used == 8) {
        buf.output_ptr++;
        buf.current_output_bits_used = 0;
    } else if (buf.current_output_bits_used > 8) {
        buf.output_ptr++;
        buf.output_data[buf.output_ptr] = (uint8_t)(value >> (8 - current_bits_used));
        buf.current_output_bits_used -= 8
    }
    if (buf.output_ptr >= 2048) {
        pk_implode_flush_full_buffer(buf);
    }
}
function pk_implode_write_copy_length_offset(buf: pk_comp_buffer, copy: pk_copy_length_offset) {
    pk_implode_write_bits(buf, buf.codeword_bits[copy.length + 254], buf.codeword_values[copy.length + 254]);
    if (copy.length == 2) {
        pk_implode_write_bits(buf, pk_copy_offset_bits[copy.offset >> 2],
            pk_copy_offset_code[copy.offset >> 2]);
        pk_implode_write_bits(buf, 2, copy.offset & 3);
    } else {
        pk_implode_write_bits(buf, pk_copy_offset_bits[copy.offset >> buf.window_size],
            pk_copy_offset_code[copy.offset >> buf.window_size]);
        pk_implode_write_bits(buf, buf.window_size, copy.offset & buf.copy_offset_extra_mask);
    }
}
function pk_implode_determine_copy(buf: pk_comp_buffer, input_index: number, copy: pk_copy_length_offset) {
    let input_ptr: number = buf.input_data[input_index];
    let hash_value: number = 4 * input_ptr[0] + 5 * input_ptr[1];
    let analyze_offset_ptr: number = buf.analyze_offset_table[hash_value];
    let hash_analyze_index: number = * analyze_offset_ptr;
    let min_match_index: number = input_index - buf.dictionary_size + 1;
    let analyze_index_ptr: number = buf.analyze_index[hash_analyze_index];
    if (* analyze_index_ptr < min_match_index) {
        do {
            analyze_index_ptr++;
            hash_analyze_index++;
        } while (* analyze_index_ptr < min_match_index)
        * analyze_offset_ptr = hash_analyze_index;
    }
    let max_matched_bytes: number = 1;
    let prev_input_ptr: number = input_ptr - 1;
    let hash_analyze_index_ptr: number = buf.analyze_index[hash_analyze_index];
    let start_match: number = buf.input_data[* hash_analyze_index_ptr];
    if (prev_input_ptr <= start_match) {
        copy.length = 0;
        return;
    }
    let input_ptr_copy: number = input_ptr;
    while (1) {
        if (start_match[max_matched_bytes - 1] == input_ptr_copy[max_matched_bytes - 1]
            && * start_match == * input_ptr_copy) {
            uint8_t * start_match_plus_one = start_match + 1;
            uint8_t * input_ptr_copy_plus_one = input_ptr_copy + 1;
                uint16_t matched_bytes = 2;
            do {
                start_match_plus_one++;
                input_ptr_copy_plus_one++;
                if (* start_match_plus_one != * input_ptr_copy_plus_one) {
                    break;
                }
                matched_bytes++;
            } while (matched_bytes < 516);
            input_ptr_copy = input_ptr;
            if (matched_bytes >= max_matched_bytes) {
                copy.offset = (uint16_t)(input_ptr - start_match_plus_one - 1 + matched_bytes);
                max_matched_bytes = matched_bytes;
                if (matched_bytes > 10) {
                    break;
                }
            }
        }
        hash_analyze_index_ptr++;
        hash_analyze_index++;
        start_match = buf.input_data[* hash_analyze_index_ptr];
        if (prev_input_ptr <= start_match) {
            copy.length = (uint16_t)(max_matched_bytes < 2 ? 0 : max_matched_bytes);
            return;
        }
    }
    if (max_matched_bytes == 516) {
        copy.length = max_matched_bytes;
        copy.offset--;
        return;
    }
    if (buf.input_data[buf.analyze_index[hash_analyze_index + 1]] >= prev_input_ptr) {
        copy.length = max_matched_bytes;
        return;
    }
    let long_offset: number = 0;
    let long_index: number = 1;
    buf.long_matcher[0] = -1;
    buf.long_matcher[1] = 0;
    do {
        if (input_ptr[long_index] != input_ptr[long_offset]) {
            long_offset = buf.long_matcher[long_offset];
            if (long_offset != -1) {
                continue;
            }
        }
        long_index++;
        long_offset++;
        buf.long_matcher[long_index] = long_offset;
    } while (long_index < max_matched_bytes)
    let matched_bytes: number = max_matched_bytes;
    let match_ptr: number = buf.input_data[max_matched_bytes] + buf.analyze_index[hash_analyze_index];
    while (1) {
        matched_bytes = buf.long_matcher[matched_bytes];
        if (matched_bytes == -1) {
            matched_bytes = 0;
        }
        hash_analyze_index_ptr = buf.analyze_index[hash_analyze_index];
        uint8_t * better_match_ptr;
        do {
            hash_analyze_index_ptr++;
            hash_analyze_index++;
            better_match_ptr = buf.input_data[* hash_analyze_index_ptr];
            if (better_match_ptr >= prev_input_ptr) {
                copy.length = max_matched_bytes;
                return;
            }
        } while (better_match_ptr[matched_bytes] < match_ptr);
        if (input_ptr[max_matched_bytes - 2] != better_match_ptr[max_matched_bytes - 2]) {
            while (1) {
                hash_analyze_index++;
                better_match_ptr = buf.input_data[buf.analyze_index[hash_analyze_index]];
                if (better_match_ptr >= prev_input_ptr) {
                    copy.length = max_matched_bytes;
                    return;
                }
                if (better_match_ptr[max_matched_bytes - 2] == input_ptr[max_matched_bytes - 2]
                    && * better_match_ptr == * input_ptr) {
                    matched_bytes = 2;
                    match_ptr = better_match_ptr + 2;
                    break;
                }
            }
        } else if (better_match_ptr[matched_bytes] != match_ptr) {
            matched_bytes = 0;
            match_ptr = buf.input_data[* hash_analyze_index_ptr];
        }
        while (input_ptr[matched_bytes] == * match_ptr) {
            matched_bytes++;
            if (matched_bytes >= 516) {
                break;
            }
            match_ptr++;
        }
        if (matched_bytes >= max_matched_bytes) {
            copy.offset = (uint16_t)(input_ptr - better_match_ptr - 1);
            if (matched_bytes > max_matched_bytes) {
                max_matched_bytes = matched_bytes;
                if (matched_bytes == 516) {
                    copy.length = 516;
                    return;
                }
                do {
                    if (input_ptr[long_index] != input_ptr[long_offset]) {
                        long_offset = buf.long_matcher[long_offset];
                        if (long_offset != -1) {
                            continue;
                        }
                    }
                    long_index++;
                    long_offset++;
                    buf.long_matcher[long_index] = long_offset;
                } while (long_index < matched_bytes);
            }
        }
    }
}
function pk_implode_next_copy_is_better(buf: pk_comp_buffer, offset: number, current_copy: struct pk_copy_length_offset) {
    let next_copy: pk_copy_length_offset;
    pk_implode_determine_copy(buf, offset + 1, next_copy);
    if (current_copy.length >= next_copy.length) {
        return 0;
    }
    if (current_copy.length + 1 == next_copy.length && current_copy.offset <= 128) {
        return 0;
    }
    return 1;
}
function pk_implode_analyze_input(buf: pk_comp_buffer, input_start: number, input_end: number) {
    memset(buf.analyze_offset_table, 0);
    for (let index: number = input_start; index < input_end; index++) {
        buf.analyze_offset_table[4 * buf.input_data[index] + 5 * buf.input_data[index + 1]]++;
    }
    let running_total: number = 0;
    for (let i: number = 0; i < 2304; i++) {
        running_total += buf.analyze_offset_table[i]
        buf.analyze_offset_table[i] = (uint16_t) running_total;
    }
    for (let index: number = input_end - 1; index >= input_start; index--) {
        let hash_value: number = 4 * buf.input_data[index] + 5 * buf.input_data[index + 1];
        let value: number = --buf.analyze_offset_table[hash_value];
        buf.analyze_index[value] = (uint16_t) index;
    }
}
function pk_implode_data(buf: pk_comp_buffer) {
    let eof: number = 0;
    let has_leftover_data: number = 0;
    buf.output_data[0] = 0;
    buf.output_data[1] = (uint8_t) buf.window_size;
    buf.output_ptr = 2;
    let input_ptr: number = buf.dictionary_size + 516;
    pk_memset(buf.output_data[2], 0, 2048);
    buf.current_output_bits_used = 0;
    while (!eof) {
        let bytes_read: number = pk_implode_fill_input_buffer(buf, 4096);
        if (bytes_read != 4096) {
            eof = 1;
            if (!bytes_read && has_leftover_data == 0) {
                break;
            }
        }
        let input_end: number = buf.dictionary_size + bytes_read; // keep 516 bytes leftover
        if (eof) {
            input_end += 516; // eat the 516 leftovers anyway
        }

        if (has_leftover_data == 0) {
            pk_implode_analyze_input(buf, input_ptr, input_end + 1);
            has_leftover_data++;
            if (buf.dictionary_size != 4096) {
                has_leftover_data++;
            }
        } else if (has_leftover_data == 1) {
            pk_implode_analyze_input(buf, input_ptr - buf.dictionary_size + 516, input_end + 1);
            has_leftover_data++;
        } else if (has_leftover_data == 2) {
            pk_implode_analyze_input(buf, input_ptr - buf.dictionary_size, input_end + 1);
        }

        while (input_ptr < input_end) {
            let write_literal: number = 0;
            let write_copy: number = 0;
            let copy: pk_copy_length_offset;
            pk_implode_determine_copy(buf, input_ptr, copy);

            if (copy.length == 0) {
                write_literal = 1;
            } else if (copy.length == 2 && copy.offset >= 256) {
                write_literal = 1;
            } else if (eof && input_ptr + copy.length > input_end) {
                copy.length = input_end - input_ptr;
                if (input_end - input_ptr > 2 || (input_end - input_ptr == 2 && copy.offset < 256)) {
                    write_copy = 1;
                } else {
                    write_literal = 1;
                }
            } else if (copy.length >= 8 || input_ptr + 1 >= input_end) {
                write_copy = 1;
            } else if (pk_implode_next_copy_is_better(buf, input_ptr, copy)) {
                write_literal = 1;
            } else {
                write_copy = 1;
            }

            if (write_copy) {
                pk_implode_write_copy_length_offset(buf, copy);
                input_ptr += copy.length;
            } else if (write_literal) {
                // Write literal
                pk_implode_write_bits(buf, buf.codeword_bits[buf.input_data[input_ptr]],
                    buf.codeword_values[buf.input_data[input_ptr]]);
                input_ptr++;
            }
        }

        if (!eof) {
            input_ptr -= 4096;
            pk_memcpy(buf.input_data, buf.input_data[4096], buf.dictionary_size + 516);
        }
    }
    pk_implode_write_bits(buf, buf.codeword_bits[PK_EOF], buf.codeword_values[PK_EOF]);
    if (buf.current_output_bits_used) {
        buf.output_ptr++;
    }
    buf.output_func(buf.output_data, buf.output_ptr, buf.token);
}
function pk_implode(input_func: pk_input_func, output_func: pk_output_func, buf: pk_comp_buffer, token: pk_token, dictionary_size: number) {
    buf.input_func = input_func;
    buf.output_func = output_func;
    buf.dictionary_size = dictionary_size;
    buf.token = token;
    if (dictionary_size == 1024) {
        buf.window_size = 4;
        buf.copy_offset_extra_mask = 0xf;
    } else if (dictionary_size == 2048) {
        buf.window_size = 5;
        buf.copy_offset_extra_mask = 0x1f;
    } else if (dictionary_size == 4096) {
        buf.window_size = 6;
        buf.copy_offset_extra_mask = 0x3f;
    } else {
        return PK_INVALID_WINDOWSIZE;
    }
    for (let i: number = 0; i < 256; i++) {
        buf.codeword_bits[i] = 9;
        buf.codeword_values[i] = (uint16_t)(i << 1);
    }
    let code_index: number = 256;
    for (let copy: number = 0; copy < 16; copy++) {
        let base_bits: number = pk_copy_length_base_bits[copy];
        let extra_bits: number = pk_copy_length_extra_bits[copy];
        let base_code: number = pk_copy_length_base_code[copy];
        let max: number = 1 << extra_bits;
        for (let i: number = 0; i < max; i++) {
            buf.codeword_bits[code_index] = (uint8_t)(1 + base_bits + extra_bits);
            buf.codeword_values[code_index] = (uint16_t)(1 | (base_code << 1) | (i << (base_bits + 1)));
            code_index++;
        }
    }
    pk_implode_data(buf);
    return PK_SUCCESS;
}
function pk_explode_construct_jump_table(size: number, bits: number, codes: number, jump: number) {
    for (let i: number = size - 1; i >= 0; i--) {
        let bit: number = bits[i];
        let code: number = codes[i];
        do {
            jump[code] = (uint8_t) i;
            code += 1 << bit;
        } while (code < 0x100)
    }
}
function pk_explode_set_bits_used(buf: pk_decomp_buffer, num_bits: number) {
    if (buf.current_input_bits_available >= num_bits) {
        buf.current_input_bits_available -= num_bits
        buf.current_input_byte = (uint16_t)(buf.current_input_byte >> num_bits);
        return 0;
    }
    buf.current_input_byte = (uint16_t)(buf.current_input_byte >> buf.current_input_bits_available);
    if (buf.input_buffer_ptr == buf.input_buffer_end) {
        buf.input_buffer_ptr = 2048;
        buf.input_buffer_end = buf.input_func(buf.input_buffer, buf.input_buffer_ptr, buf.token);
        if (!buf.input_buffer_end) {
            return 1;
        }
        buf.input_buffer_ptr = 0;
    }
    buf.current_input_byte |= (uint16_t)(buf.input_buffer[buf.input_buffer_ptr++] << 8)
    buf.current_input_byte = (uint16_t)(buf.current_input_byte >> (num_bits - buf.current_input_bits_available));
    buf.current_input_bits_available += 8 - num_bits
    return 0;
}
function pk_explode_decode_next_token(buf: pk_decomp_buffer) {
    if (buf.current_input_byte & 1) {
        if (pk_explode_set_bits_used(buf, 1)) {
            return PK_ERROR_VALUE;
        }
        let index: number = buf.copy_length_jump_table[buf.current_input_byte & 0xff];
        if (pk_explode_set_bits_used(buf, pk_copy_length_base_bits[index])) {
            return PK_ERROR_VALUE;
        }
        let extra_bits: number = pk_copy_length_extra_bits[index];
        if (extra_bits) {
            let extra_bits_value: number = buf.current_input_byte & ((1 << extra_bits) - 1);
            if (pk_explode_set_bits_used(buf, extra_bits) && index + extra_bits_value != 270) {
                return PK_ERROR_VALUE;
            }
            index = pk_copy_length_base_value[index] + extra_bits_value;
        }
        return index + 256;
    } else {
        if (pk_explode_set_bits_used(buf, 1)) {
            return PK_ERROR_VALUE;
        }
        let result: number = buf.current_input_byte & 0xff;
        if (pk_explode_set_bits_used(buf, 8)) {
            return PK_ERROR_VALUE;
        }
        return result;
    }
}
function pk_explode_get_copy_offset(buf: pk_decomp_buffer, copy_length: number) {
    let index: number = buf.copy_offset_jump_table[buf.current_input_byte & 0xff];
    if (pk_explode_set_bits_used(buf, pk_copy_offset_bits[index])) {
        return 0;
    }
    let offset: number;
    if (copy_length == 2) {
        offset = (buf.current_input_byte & 3) | (index << 2);
        if (pk_explode_set_bits_used(buf, 2)) {
            return 0;
        }
    } else {
        offset = (buf.current_input_byte & buf.dictionary_size) | (index << buf.window_size);
        if (pk_explode_set_bits_used(buf, buf.window_size)) {
            return 0;
        }
    }
    return offset + 1;
}
function pk_explode_data(buf: pk_decomp_buffer) {
    let token: number;
    buf.output_buffer_ptr = 4096;
    while (1) {
        token = pk_explode_decode_next_token(buf);
        if (token >= PK_ERROR_VALUE - 1) {
            break;
        }
        if (token >= 256) {
                // copy offset
                let length: number = token - 254;
                let offset: number = pk_explode_get_copy_offset(buf, length);
            if (!offset) {
                token = PK_ERROR_VALUE;
                break;
            }
            uint8_t * src = buf.output_buffer[buf.output_buffer_ptr - offset];
            uint8_t * dst = buf.output_buffer[buf.output_buffer_ptr];
            buf.output_buffer_ptr += length;
            do {
                    * dst = * src;
                src++;
                dst++;
            } while (--length > 0);
        } else {
            // literal byte
            buf.output_buffer[buf.output_buffer_ptr++] = (uint8_t) token;
        }
        if (buf.output_buffer_ptr >= 8192) {
            // Flush buffer
            buf.output_func(buf.output_buffer[4096], 4096, buf.token);
            pk_memcpy(buf.output_buffer, buf.output_buffer[4096], buf.output_buffer_ptr - 4096);
            buf.output_buffer_ptr -= 4096;
        }
    }
    let remaining_bytes: number = buf.output_buffer_ptr - 4096;
    if (remaining_bytes > 0) {
        buf.output_func(buf.output_buffer[4096], remaining_bytes, buf.token);
    }
    return token;
}
function pk_explode(input_func: pk_input_func, output_func: pk_output_func, buf: pk_decomp_buffer, token: pk_token) {
    buf.input_func = input_func;
    buf.output_func = output_func;
    buf.token = token;
    buf.input_buffer_ptr = 2048;
    let bytes_read: number = buf.input_func(buf.input_buffer, buf.input_buffer_ptr, buf.token);
    buf.input_buffer_end = bytes_read;
    if (bytes_read <= 4) {
        return PK_TOO_FEW_INPUT_BYTES;
    }
    let has_literal_encoding: number = buf.input_buffer[0];
    buf.window_size = buf.input_buffer[1];
    buf.current_input_byte = buf.input_buffer[2];
    buf.current_input_bits_available = 0;
    buf.input_buffer_ptr = 3;
    if (buf.window_size < 4 || buf.window_size > 6) {
        return PK_INVALID_WINDOWSIZE;
    }
    buf.dictionary_size = 0xFFFF >> (16 - buf.window_size);
    if (has_literal_encoding) {
        return PK_LITERAL_ENCODING_UNSUPPORTED;
    }
    pk_explode_construct_jump_table(16,
        pk_copy_length_base_bits, pk_copy_length_base_code, buf.copy_length_jump_table);
    pk_explode_construct_jump_table(64,
        pk_copy_offset_bits, pk_copy_offset_code, buf.copy_offset_jump_table);
    let result: number = pk_explode_data(buf);
    if (result != PK_EOF) {
        return PK_ERROR_DECODING;
    }
    return PK_SUCCESS;
}
function zip_input_func(buffer: number, length: number, token: pk_token) {
    if (token.stop) {
        return 0;
    }
    if (token.input_ptr >= token.input_length) {
        return 0;
    }
    if (token.input_length - token.input_ptr < length) {
        length = token.input_length - token.input_ptr;
    }
    memcpy(buffer, token.input_data[token.input_ptr], (size_t) length);
    token.input_ptr += length
    return length;
}
function zip_output_func(buffer: number, length: number, token: pk_token) {
    if (token.stop) {
        return;
    }
    if (token.output_ptr >= token.output_length) {
        log_error("COMP2 Out of buffer space.", 0, 0);
        token.stop = 1;
        return;
    }
    if (token.output_length - token.output_ptr >= length) {
        memcpy(token.output_data[token.output_ptr], buffer, (size_t) length);
        token.output_ptr += length
    } else {
        log_error("COMP1 Corrupt.", 0, 0);
        token.stop = 1;
    }
}
export function zip_compress(input_buffer: void, input_length: number, output_buffer: void, output_length: number) {
    let token: pk_token;
    let buf: pk_comp_buffer = (struct pk_comp_buffer *) malloc(sizeof(struct pk_comp_buffer));
    if (!buf) {
        return 0;
    }
    memset(buf, 0);
    memset(token, 0);
    token.input_data = (const uint8_t *) input_buffer;
    token.input_length = input_length;
    token.output_data = (uint8_t *) output_buffer;
    token.output_length = * output_length;
    let ok: number = 1;
    let pk_error: number = pk_implode(zip_input_func, zip_output_func, buf, token, 4096);
    if (pk_error || token.stop) {
        log_error("COMP Error occurred while compressing.", 0, 0);
        ok = 0;
    } else {
        * output_length = token.output_ptr;
    }
    free(buf);
    return ok;
}
export function zip_decompress(input_buffer: void, input_length: number, output_buffer: void, output_length: number) {
    let token: pk_token;
    let buf: pk_decomp_buffer = (struct pk_decomp_buffer *) malloc(sizeof(struct pk_decomp_buffer));
    if (!buf) {
        return 0;
    }
    memset(buf, 0);
    memset(token, 0);
    token.input_data = (const uint8_t *) input_buffer;
    token.input_length = input_length;
    token.output_data = (uint8_t *) output_buffer;
    token.output_length = * output_length;
    let ok: number = 1;
    let pk_error: number = pk_explode(zip_input_func, zip_output_func, buf, token);
    if (pk_error || token.stop) {
        log_error("COMP Error uncompressing.", 0, 0);
        ok = 0;
    } else {
        * output_length = token.output_ptr;
    }
    free(buf);
    return ok;
}
