export const ENEMY_DATA_SIZE = 2400000;
export const MAIN_DATA_SIZE = 30000000;
export const EMPIRE_DATA_SIZE = 2000;
export const SCRATCH_DATA_SIZE = 12100000;
export const MAIN_INDEX_SIZE = 660680;
export const HEADER_SIZE = 20680;
export const ENTRY_SIZE = 64;
export const MAIN_ENTRIES = 10000;
export const EXTERNAL_FONT_ENTRIES = 2000;
export const EXTERNAL_FONT_DATA_SIZE = 1500000;
export const EXTERNAL_FONT_INDEX_SIZE = 64;
export const EXTERNAL_FONT_INDEX_OFFSET = 20680;
import { buffer, buffer_init, buffer_read_i16, buffer_read_i32, buffer_read_i8, buffer_read_raw, buffer_read_u16, buffer_read_u8, buffer_set, buffer_skip } from 'core/buffer';
import { localized } from 'core/dir';
import { encoding_type } from 'core/encoding';
import { file_change_extension } from 'core/file';
import { group_terrain } from 'core/image_group';
import { io_read_file_into_buffer, io_read_file_part_into_buffer } from 'core/io';
import { log_error, log_info } from 'core/log';
import { ALPHA_FONT_SEMI_TRANSPARENT, ALPHA_OPAQUE, COLOR_SG2_TRANSPARENT, color_t } from 'graphics/color';
export const TRAD_CHINESE_FONT_ENTRIES = 3;
export const CHINESE_FONT_DATA_SIZE = 7200000;
export const IMAGE_FONT_MULTIBYTE_TRAD_CHINESE_MAX_CHARS = 2188;
export const SIMP_CHINESE_FONT_ENTRIES = 3;
export const IMAGE_FONT_MULTIBYTE_SIMP_CHINESE_MAX_CHARS = 2130;
export const IMAGE_FONT_MULTIBYTE_KOREAN_MAX_CHARS = 2350;
export const KOREAN_FONT_ENTRIES = 3;
export const KOREAN_FONT_DATA_SIZE = 7500000;
export const JAPANESE_FONT_ENTRIES = 3;
export const JAPANESE_FONT_DATA_SIZE = 11000000;
export const IMAGE_FONT_MULTIBYTE_JAPANESE_MAX_CHARS = 3321;
export const CYRILLIC_FONT_BASE_OFFSET = 201;
export const GREEK_FONT_BASE_OFFSET = 1;
export const ENEMY_INDEX_SIZE = 64;
export const ENEMY_INDEX_OFFSET = 20680;
export const ENEMY_ENTRIES = 801;
export const IMAGE_FONT_MULTIBYTE_OFFSET = 10000;
import ENCODING_CYRILLIC = encoding_type.ENCODING_CYRILLIC;
import ENCODING_GREEK = encoding_type.ENCODING_GREEK;
import ENCODING_TRADITIONAL_CHINESE = encoding_type.ENCODING_TRADITIONAL_CHINESE;
import ENCODING_SIMPLIFIED_CHINESE = encoding_type.ENCODING_SIMPLIFIED_CHINESE;
import ENCODING_JAPANESE = encoding_type.ENCODING_JAPANESE;
import ENCODING_KOREAN = encoding_type.ENCODING_KOREAN;
import GROUP_FONT = group_terrain.GROUP_FONT;
import GROUP_EMPIRE_MAP = group_terrain.GROUP_EMPIRE_MAP;
class draw {
    public type: number = 0;
    public is_fully_compressed: number = 0;
    public is_external: number = 0;
    public has_compressed_part: number = 0;
    public bitmap_id: number = 0;
    public offset: number = 0;
    public data_length: number = 0;
    public uncompressed_length: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.type = args[0]);
        args.length >= 2 && (this.is_fully_compressed = args[1]);
        args.length >= 3 && (this.is_external = args[2]);
        args.length >= 4 && (this.has_compressed_part = args[3]);
        args.length >= 5 && (this.bitmap_id = args[4]);
        args.length >= 6 && (this.offset = args[5]);
        args.length >= 7 && (this.data_length = args[6]);
        args.length >= 8 && (this.uncompressed_length = args[7]);
    }
}
export class image {
    public width: number = 0;
    public height: number = 0;
    public num_animation_sprites: number = 0;
    public sprite_offset_x: number = 0;
    public sprite_offset_y: number = 0;
    public animation_can_reverse: number = 0;
    public animation_speed_id: number = 0;
    public draw: draw = null;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.width = args[0]);
        args.length >= 2 && (this.height = args[1]);
        args.length >= 3 && (this.num_animation_sprites = args[2]);
        args.length >= 4 && (this.sprite_offset_x = args[3]);
        args.length >= 5 && (this.sprite_offset_y = args[4]);
        args.length >= 6 && (this.animation_can_reverse = args[5]);
        args.length >= 7 && (this.animation_speed_id = args[6]);
        args.length >= 8 && (this.draw = args[7]);
    }
}
import MAY_BE_LOCALIZED = localized.MAY_BE_LOCALIZED;
export const enum font {
    NO_EXTRA_FONT = 0,
    FULL_CHARSET_IN_FONT = 1,
    MULTIBYTE_IN_FONT = 2,
}
let MAIN_GRAPHICS_SG2: string[] = [
    "c3.sg2",
    "c3_north.sg2",
    "c3_south.sg2"
];
let MAIN_GRAPHICS_555: string[] = [
    "c3.555",
    "c3_north.555",
    "c3_south.555"
];
let EDITOR_GRAPHICS_SG2: string[] = [
    "c3map.sg2",
    "c3map_north.sg2",
    "c3map_south.sg2"
];
let EDITOR_GRAPHICS_555: string[] = [
    "c3map.555",
    "c3map_north.555",
    "c3map_south.555"
];
let EMPIRE_555: string = "The_empire.555";
let EXTERNAL_FONTS_SG2: string = "C3_fonts.sg2";
let EXTERNAL_FONTS_555: string = "C3_fonts.555";
let CHINESE_FONTS_555: string = "rome.555";
let CHINESE_FONTS_555_V2: string = "rome-v2.555";
let KOREAN_FONTS_555: string = "korean.555";
let KOREAN_FONTS_555_V2: string = "korean-v2.555";
let JAPANESE_FONTS_555: string = "japanese-v2.555";
let ENEMY_GRAPHICS_SG2: string[] = [
    "goths.sg2",
    "Etruscan.sg2",
    "Etruscan.sg2",
    "carthage.sg2",
    "Greek.sg2",
    "Greek.sg2",
    "egyptians.sg2",
    "Persians.sg2",
    "Phoenician.sg2",
    "celts.sg2",
    "celts.sg2",
    "celts.sg2",
    "Gaul.sg2",
    "Gaul.sg2",
    "goths.sg2",
    "goths.sg2",
    "goths.sg2",
    "Phoenician.sg2",
    "North African.sg2",
    "Phoenician.sg2"
];
let ENEMY_GRAPHICS_555: string[] = [
    "goths.555",
    "Etruscan.555",
    "Etruscan.555",
    "carthage.555",
    "Greek.555",
    "Greek.555",
    "egyptians.555",
    "Persians.555",
    "Phoenician.555",
    "celts.555",
    "celts.555",
    "celts.555",
    "Gaul.555",
    "Gaul.555",
    "goths.555",
    "goths.555",
    "goths.555",
    "Phoenician.555",
    "North African.555",
    "Phoenician.555"
];
let DUMMY_IMAGE: image;
export class unnamed125_8 {
    public current_climate: number = 0;
    public is_editor: number = 0;
    public fonts_enabled: number = 0;
    public font_base_offset: number = 0;
    public group_image_ids: number[] = new Array(300).fill(0);
    public bitmaps: string[] = new Array(100).fill(null);
    public main: image[] = new Array(MAIN_ENTRIES).fill(null);
    public enemy: image[] = new Array(ENEMY_ENTRIES).fill(null);
    public font: image[] = null;
    public main_data: color_t = null;
    public empire_data: color_t = null;
    public enemy_data: color_t = null;
    public font_data: color_t[] = null;
    public tmp_data: Uint8Array = null;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.current_climate = args[0]);
        args.length >= 2 && (this.is_editor = args[1]);
        args.length >= 3 && (this.fonts_enabled = args[2]);
        args.length >= 4 && (this.font_base_offset = args[3]);
        args.length >= 5 && (this.group_image_ids = args[4]);
        args.length >= 6 && (this.bitmaps = args[5]);
        args.length >= 7 && (this.main = args[6]);
        args.length >= 8 && (this.enemy = args[7]);
        args.length >= 9 && (this.font = args[8]);
        args.length >= 10 && (this.main_data = args[9]);
        args.length >= 11 && (this.empire_data = args[10]);
        args.length >= 12 && (this.enemy_data = args[11]);
        args.length >= 13 && (this.font_data = args[12]);
        args.length >= 14 && (this.tmp_data = args[13]);
    }
}
let data: unnamed125_8 = new unnamed125_8(-1);
export function image_init() {
    data.enemy_data = null; // Stub: should allocate ENEMY_DATA_SIZE
    data.main_data = null; // Stub: should allocate MAIN_DATA_SIZE
    data.empire_data = null; // Stub: should allocate EMPIRE_DATA_SIZE
    data.tmp_data = null; // Stub: should allocate SCRATCH_DATA_SIZE
    if (!data.main_data || !data.empire_data || !data.enemy_data || !data.tmp_data) {
        data.main_data = null;
        data.empire_data = null;
        data.enemy_data = null;
        data.tmp_data = null;
        return 0;
    }
    return 1;
}
function prepare_index(images: image, size: number) {
    let offset: number = 4;
    for (let i: number = 1; i < size; i++) {
        let img: image = images[i];
        if (img.draw.is_external) {
            if (!img.draw.offset) {
                img.draw.offset = 1;
            }
        } else {
            img.draw.offset = offset;
            offset += img.draw.data_length;
        }
    }
}
function read_index_entry(buf: buffer, img: image) {
    img.draw.offset = buffer_read_i32(buf);
    img.draw.data_length = buffer_read_i32(buf);
    img.draw.uncompressed_length = buffer_read_i32(buf);
    buffer_skip(buf, 8);
    img.width = buffer_read_u16(buf);
    img.height = buffer_read_u16(buf);
    buffer_skip(buf, 6);
    img.num_animation_sprites = buffer_read_u16(buf);
    buffer_skip(buf, 2);
    img.sprite_offset_x = buffer_read_i16(buf);
    img.sprite_offset_y = buffer_read_i16(buf);
    buffer_skip(buf, 10);
    img.animation_can_reverse = buffer_read_i8(buf);
    buffer_skip(buf, 1);
    img.draw.type = buffer_read_u8(buf);
    img.draw.is_fully_compressed = buffer_read_i8(buf);
    img.draw.is_external = buffer_read_i8(buf);
    img.draw.has_compressed_part = buffer_read_i8(buf);
    buffer_skip(buf, 2);
    img.draw.bitmap_id = buffer_read_u8(buf);
    buffer_skip(buf, 1);
    img.animation_speed_id = buffer_read_u8(buf);
    buffer_skip(buf, 5);
}
function read_index(buf: buffer, images: image, size: number) {
    for (let i: number = 0; i < size; i++) {
        read_index_entry(buf, images[i]);
    }
    prepare_index(images, size);
}
function read_header(buf: buffer) {
    buffer_skip(buf, 80);
    for (let i: number = 0; i < 300; i++) {
        data.group_image_ids[i] = buffer_read_u16(buf);
    }
    buffer_read_raw(buf, data.bitmaps, 20000);
}
function to_32_bit(c: number) {
    return ((c & 0x7c00) << 9) | ((c & 0x7000) << 4) |
        ((c & 0x3e0) << 6) | ((c & 0x380) << 1) |
        ((c & 0x1f) << 3) | ((c & 0x1c) >> 2);
}
function convert_uncompressed(buf: buffer, buf_length: number, dst: color_t) {

    return buf_length / 2;
}
function convert_compressed(buf: buffer, buf_length: number, dst: color_t[]) {
    let dst_length: number = 0;
    return dst_length;
}
function convert_images(images: image, size: number, buf: buffer, dst: color_t) {
    let start_dst: color_t = dst;
    dst++;
    for (let i: number = 0; i < size; i++) {
        let img: image = images[i];
        if (img.draw.is_external) {
            continue
        }
        buffer_set(buf, img.draw.offset);
        let img_offset: number = (dst - start_dst);
        if (img.draw.is_fully_compressed) {
            dst += convert_compressed(buf, img.draw.data_length, dst)
        } else if (img.draw.has_compressed_part) {
            dst += convert_uncompressed(buf, img.draw.uncompressed_length, dst)
            dst += convert_compressed(buf, img.draw.data_length - img.draw.uncompressed_length, dst)
        } else {
            dst += convert_uncompressed(buf, img.draw.data_length, dst)
        }
        img.draw.offset = img_offset;
        img.draw.uncompressed_length /= 2
    }
}
function load_empire() {
    let size: number = io_read_file_into_buffer(EMPIRE_555, MAY_BE_LOCALIZED, data.tmp_data, EMPIRE_DATA_SIZE);
    if (size != EMPIRE_DATA_SIZE / 2) {
        log_error("unable to load empire data", EMPIRE_555, 0);
        return;
    }
    let buf: buffer;
    buffer_init(buf, data.tmp_data, size);
    convert_uncompressed(buf, size, data.empire_data);
}
export function image_load_climate(climate_id: number, is_editor: number, force_reload: number) {
    if (climate_id == data.current_climate && is_editor == data.is_editor && !force_reload) {
        return 1;
    }
    let filename_bmp: string = is_editor ? EDITOR_GRAPHICS_555[climate_id] : MAIN_GRAPHICS_555[climate_id];
    let filename_idx: string = is_editor ? EDITOR_GRAPHICS_SG2[climate_id] : MAIN_GRAPHICS_SG2[climate_id];
    if (MAIN_INDEX_SIZE != io_read_file_into_buffer(filename_idx, MAY_BE_LOCALIZED, data.tmp_data, MAIN_INDEX_SIZE)) {
        return 0;
    }
    let buf: buffer;
    buffer_init(buf, data.tmp_data, HEADER_SIZE);
    read_header(buf);
    buffer_init(buf, data.tmp_data[HEADER_SIZE], ENTRY_SIZE * MAIN_ENTRIES);
    read_index(buf, data.main, MAIN_ENTRIES);
    let data_size: number = io_read_file_into_buffer(filename_bmp, MAY_BE_LOCALIZED, data.tmp_data, SCRATCH_DATA_SIZE);
    if (!data_size) {
        return 0;
    }
    buffer_init(buf, data.tmp_data, data_size);
    convert_images(data.main, MAIN_ENTRIES, buf, data.main_data);
    data.current_climate = climate_id;
    data.is_editor = is_editor;
    load_empire();
    return 1;
}
function free_font_memory() {
    data.font = null;
    data.font_data = null;
    data.fonts_enabled = NO_EXTRA_FONT;
}
function alloc_font_memory(font_entries: number, font_data_size: number) {
    free_font_memory();
    data.font = new Array<image>(font_entries);
    data.font_data = new Array<color_t>(font_data_size);
    if (!data.font || !data.font_data) {
        data.font = null;
        data.font_data = null;
        return 0;
    }
    return 1;
}
function load_external_fonts(base_offset: number) {
    if (!alloc_font_memory(EXTERNAL_FONT_ENTRIES, EXTERNAL_FONT_DATA_SIZE)) {
        return 0;
    }
    if (EXTERNAL_FONT_INDEX_SIZE != io_read_file_part_into_buffer(EXTERNAL_FONTS_SG2, MAY_BE_LOCALIZED,
        data.tmp_data, EXTERNAL_FONT_INDEX_SIZE, EXTERNAL_FONT_INDEX_OFFSET)) {
        return 0;
    }
    let buf: buffer;
    buffer_init(buf, data.tmp_data, EXTERNAL_FONT_INDEX_SIZE);
    read_index(buf, data.font, EXTERNAL_FONT_ENTRIES);
    let data_size: number = io_read_file_into_buffer(EXTERNAL_FONTS_555, MAY_BE_LOCALIZED, data.tmp_data, SCRATCH_DATA_SIZE);
    if (!data_size) {
        return 0;
    }
    buffer_init(buf, data.tmp_data, data_size);
    convert_images(data.font, EXTERNAL_FONT_ENTRIES, buf, data.font_data);
    data.fonts_enabled = FULL_CHARSET_IN_FONT;
    data.font_base_offset = base_offset;
    return 1;
}
function parse_multibyte_font(num_chars: number, input: buffer, pixels: color_t[], pixel_offset: number, char_size: number, letter_spacing: number, index_offset: number) {
    for (let i: number = 0; i < num_chars; i++) {
        let img: image = data.font[index_offset + i];
        img.width = char_size + letter_spacing;
        img.height = char_size;
        img.draw.bitmap_id = 0;
        img.draw.offset = pixel_offset;
        img.draw.uncompressed_length = img.draw.data_length = img.width * img.height;
        for (let row: number = 0; row < char_size; row++) {
            let bits: number = 0;
            for (let col: number = 0; col < char_size; col++) {
                if (col % 2 == 0) {
                    bits = buffer_read_u8(input);
                }
                if (col < img.width) {
                    let value: number = bits & 0xf;
                    if (value == 0) {
                        pixels[pixel_offset] = COLOR_SG2_TRANSPARENT;
                    } else {
                        let color_value: number = (value * 16 + value);
                        pixels[pixel_offset] = color_value << 24;
                    }
                    pixel_offset++;
                }
                bits >>= 4
            }
            for (let s: number = 0; s < letter_spacing; s++) {
                pixels[pixel_offset] = COLOR_SG2_TRANSPARENT;
                pixel_offset++;
            }
        }
    }
    return pixel_offset;
}
function parse_chinese_font(num_chars: number, input: buffer, pixels: color_t[], pixel_offset: number, char_size: number, index_offset: number) {
    let bytes_per_row: number = char_size <= 16 ? 2 : 3;
    for (let i: number = 0; i < num_chars; i++) {
        let img: image = data.font[index_offset + i];
        img.width = char_size + 1;
        img.height = char_size - 1;
        img.draw.bitmap_id = 0;
        img.draw.offset = pixel_offset;
        img.draw.uncompressed_length = img.draw.data_length = img.width * img.height;
        for (let row: number = 0; row < img.height; row++) {
            let bits: number = buffer_read_u16(input);
            if (bytes_per_row == 3) {
                bits += buffer_read_u8(input) << 16
            }
            let prev_set: number = 0;
            for (let col: number = 0; col < img.width; col++) {
                let set: number = bits & 1;
                if (set) {
                    pixels[pixel_offset] = ALPHA_OPAQUE;
                } else if (prev_set) {
                    pixels[pixel_offset] = ALPHA_FONT_SEMI_TRANSPARENT;
                } else {
                    pixels[pixel_offset] = COLOR_SG2_TRANSPARENT;
                }
                pixel_offset++;
                bits >>= 1;
                prev_set = set;
            }
        }
    }
    return pixel_offset;
}
function load_traditional_chinese_fonts() {
    if (!alloc_font_memory(TRAD_CHINESE_FONT_ENTRIES, CHINESE_FONT_DATA_SIZE)) {
        return 0;
    }
    let file_version: number = 2;
    let data_size: number = io_read_file_into_buffer(CHINESE_FONTS_555_V2, MAY_BE_LOCALIZED, data.tmp_data, SCRATCH_DATA_SIZE);
    if (!data_size) {
        file_version = 1;
        data_size = io_read_file_into_buffer(CHINESE_FONTS_555, MAY_BE_LOCALIZED, data.tmp_data, SCRATCH_DATA_SIZE);
        if (!data_size) {
            log_error("Julius requires extra files for Chinese characters:", CHINESE_FONTS_555_V2, 0);
            return 0;
        }
    }
    let input: buffer;
    buffer_init(input, data.tmp_data, data_size);
    let pixels: color_t = data.font_data;
    let offset: number = 0;
    let num_chars: number = IMAGE_FONT_MULTIBYTE_TRAD_CHINESE_MAX_CHARS;
    log_info("Parsing Traditional Chinese font", 0, 0);
    if (file_version == 2) {
        offset = parse_multibyte_font(num_chars, input, pixels[offset], offset, 12, 1, 0);
        offset = parse_multibyte_font(num_chars, input, pixels[offset], offset, 15, 1, num_chars);
        offset = parse_multibyte_font(num_chars, input, pixels[offset], offset, 20, 1, num_chars * 2);
    } else if (file_version == 1) {
        offset = parse_chinese_font(num_chars, input, pixels[offset], offset, 12, 0);
        offset = parse_chinese_font(num_chars, input, pixels[offset], offset, 16, num_chars);
        offset = parse_chinese_font(num_chars, input, pixels[offset], offset, 20, num_chars * 2);
    }
    log_info("Done parsing Traditional Chinese font", 0, 0);
    data.fonts_enabled = MULTIBYTE_IN_FONT;
    data.font_base_offset = 0;
    return 1;
}
function load_simplified_chinese_fonts() {
    if (!alloc_font_memory(SIMP_CHINESE_FONT_ENTRIES, CHINESE_FONT_DATA_SIZE)) {
        return 0;
    }
    let file_version: number = 2;
    let data_size: number = io_read_file_into_buffer(CHINESE_FONTS_555_V2, MAY_BE_LOCALIZED, data.tmp_data, SCRATCH_DATA_SIZE);
    if (!data_size) {
        file_version = 1;
        data_size = io_read_file_into_buffer(CHINESE_FONTS_555, MAY_BE_LOCALIZED, data.tmp_data, SCRATCH_DATA_SIZE);
        if (!data_size) {
            log_error("Julius requires extra files for Chinese characters:", CHINESE_FONTS_555_V2, 0);
            return 0;
        }
    }
    let input: buffer;
    buffer_init(input, data.tmp_data, data_size);
    let pixels: color_t = data.font_data;
    let offset: number = 0;
    let num_chars: number = IMAGE_FONT_MULTIBYTE_SIMP_CHINESE_MAX_CHARS;
    log_info("Parsing Simplified Chinese font", 0, 0);
    if (file_version == 2) {
        offset = parse_multibyte_font(num_chars, input, pixels[offset], offset, 12, 1, 0);
        offset = parse_multibyte_font(num_chars, input, pixels[offset], offset, 15, 1, num_chars);
        offset = parse_multibyte_font(num_chars, input, pixels[offset], offset, 20, 1, num_chars * 2);
    } else if (file_version == 1) {
        offset = parse_chinese_font(num_chars, input, pixels[offset], offset, 12, 0);
        offset = parse_chinese_font(num_chars, input, pixels[offset], offset, 16, num_chars);
        offset = parse_chinese_font(num_chars, input, pixels[offset], offset, 19, num_chars * 2);
    }
    log_info("Done parsing Simplified Chinese font", 0, 0);
    data.fonts_enabled = MULTIBYTE_IN_FONT;
    data.font_base_offset = 0;
    return 1;
}
function parse_korean_font(input: buffer, pixels: color_t[], pixel_offset: number, char_size: number, index_offset: number) {
    let bytes_per_row: number = char_size <= 16 ? 2 : 3;
    for (let i: number = 0; i < IMAGE_FONT_MULTIBYTE_KOREAN_MAX_CHARS; i++) {
        let img: image = data.font[index_offset + i];
        img.width = char_size;
        img.height = char_size;
        img.draw.bitmap_id = 0;
        img.draw.offset = pixel_offset;
        img.draw.uncompressed_length = img.draw.data_length = img.width * img.height;
        for (let row: number = 0; row < char_size; row++) {
            let bits: number = buffer_read_u16(input);
            if (bytes_per_row == 3) {
                bits += buffer_read_u8(input) << 16
            }
            let prev_set: number = 0;
            for (let col: number = 0; col < char_size; col++) {
                let set: number = bits & 1;
                if (set) {
                    pixels[pixel_offset] = ALPHA_OPAQUE;
                } else if (prev_set) {
                    pixels[pixel_offset] = ALPHA_FONT_SEMI_TRANSPARENT;
                } else {
                    pixels[pixel_offset] = COLOR_SG2_TRANSPARENT;
                }
                pixel_offset++;
                bits >>= 1;
                prev_set = set;
            }
        }
    }
    return pixel_offset;
}
function load_korean_fonts() {
    if (!alloc_font_memory(KOREAN_FONT_ENTRIES, KOREAN_FONT_DATA_SIZE)) {
        return 0;
    }
    let file_version: number = 2;
    let data_size: number = io_read_file_into_buffer(KOREAN_FONTS_555_V2, MAY_BE_LOCALIZED, data.tmp_data, SCRATCH_DATA_SIZE);
    if (!data_size) {
        file_version = 1;
        data_size = io_read_file_into_buffer(KOREAN_FONTS_555, MAY_BE_LOCALIZED, data.tmp_data, SCRATCH_DATA_SIZE);
        if (!data_size) {
            log_error("Julius requires extra files for Korean characters:", KOREAN_FONTS_555, 0);
            return 0;
        }
    }
    let input: buffer;
    buffer_init(input, data.tmp_data, data_size);
    let pixels: color_t = data.font_data;
    let offset: number = 0;
    let num_chars: number = IMAGE_FONT_MULTIBYTE_KOREAN_MAX_CHARS;
    log_info("Parsing Korean font", 0, 0);
    if (file_version == 2) {
        offset = parse_multibyte_font(num_chars, input, pixels[offset], offset, 12, 0, 0);
        offset = parse_multibyte_font(num_chars, input, pixels[offset], offset, 15, 0, num_chars);
        offset = parse_multibyte_font(num_chars, input, pixels[offset], offset, 20, 0, num_chars * 2);
    } else if (file_version == 1) {
        offset = parse_korean_font(input, pixels[offset], offset, 12, 0);
        offset = parse_korean_font(input, pixels[offset], offset, 15, num_chars);
        offset = parse_korean_font(input, pixels[offset], offset, 20, num_chars * 2);
    }
    log_info("Done parsing Korean font", 0, 0);
    data.fonts_enabled = MULTIBYTE_IN_FONT;
    data.font_base_offset = 0;
    return 1;
}
function load_japanese_fonts() {
    if (!alloc_font_memory(JAPANESE_FONT_ENTRIES, JAPANESE_FONT_DATA_SIZE)) {
        return 0;
    }
    let data_size: number = io_read_file_into_buffer(JAPANESE_FONTS_555, MAY_BE_LOCALIZED, data.tmp_data, SCRATCH_DATA_SIZE);
    if (!data_size) {
        log_error("Julius requires extra files for Japanese characters:", JAPANESE_FONTS_555, 0);
        return 0;
    }
    let input: buffer;
    buffer_init(input, data.tmp_data, data_size);
    let pixels: color_t = data.font_data;
    let offset: number = 0;
    let num_chars: number = IMAGE_FONT_MULTIBYTE_JAPANESE_MAX_CHARS;
    let num_half_width: number = 63;
    let num_full_width: number = num_chars - num_half_width;
    log_info("Parsing Japanese font", 0, 0);
    offset = parse_multibyte_font(num_half_width, input, pixels[offset], offset, 12, -5, 0);
    offset = parse_multibyte_font(num_full_width, input, pixels[offset], offset, 12, 1, num_half_width);
    offset = parse_multibyte_font(num_half_width, input, pixels[offset], offset, 15, -6, num_chars);
    offset = parse_multibyte_font(num_full_width, input, pixels[offset], offset, 15, 1, num_chars + num_half_width);
    offset = parse_multibyte_font(num_half_width, input, pixels[offset], offset, 20, -9, num_chars * 2);
    offset = parse_multibyte_font(num_full_width, input, pixels[offset], offset, 20, 1, num_chars * 2 + num_half_width);
    log_info("Done parsing Japanese font", 0, offset);
    data.fonts_enabled = MULTIBYTE_IN_FONT;
    data.font_base_offset = 0;
    return 1;
}
export function image_load_fonts(encoding: encoding_type) {
    if (encoding == ENCODING_CYRILLIC) {
        return load_external_fonts(CYRILLIC_FONT_BASE_OFFSET);
    } else if (encoding == ENCODING_GREEK) {
        return load_external_fonts(GREEK_FONT_BASE_OFFSET);
    } else if (encoding == ENCODING_TRADITIONAL_CHINESE) {
        return load_traditional_chinese_fonts();
    } else if (encoding == ENCODING_SIMPLIFIED_CHINESE) {
        return load_simplified_chinese_fonts();
    } else if (encoding == ENCODING_KOREAN) {
        return load_korean_fonts();
    } else if (encoding == ENCODING_JAPANESE) {
        return load_japanese_fonts();
    } else {
        free_font_memory();
        return 1;
    }
}
export function image_load_enemy(enemy_id: number) {
    let filename_bmp: char = ENEMY_GRAPHICS_555[enemy_id];
    let filename_idx: char = ENEMY_GRAPHICS_SG2[enemy_id];
    if (ENEMY_INDEX_SIZE != io_read_file_part_into_buffer(
        filename_idx, MAY_BE_LOCALIZED, data.tmp_data, ENEMY_INDEX_SIZE, ENEMY_INDEX_OFFSET)) {
        return 0;
    }
    let buf: buffer;
    buffer_init(buf, data.tmp_data, ENEMY_INDEX_SIZE);
    read_index(buf, data.enemy, ENEMY_ENTRIES);
    let data_size: number = io_read_file_into_buffer(filename_bmp, MAY_BE_LOCALIZED, data.tmp_data, SCRATCH_DATA_SIZE);
    if (!data_size) {
        return 0;
    }
    buffer_init(buf, data.tmp_data, data_size);
    convert_images(data.enemy, ENEMY_ENTRIES, buf, data.enemy_data);
    return 1;
}
function load_external_data(image_id: number) {
    let img: image = data.main[image_id];
    let filename = "555/";
    strcpy(filename[4], data.bitmaps[img.draw.bitmap_id]);
    file_change_extension(filename, "555");
    let size: number = io_read_file_part_into_buffer(
        filename[4], MAY_BE_LOCALIZED, data.tmp_data,
        img.draw.data_length, img.draw.offset - 1
    );
    if (!size) {
        size = io_read_file_part_into_buffer(
            filename, MAY_BE_LOCALIZED, data.tmp_data,
            img.draw.data_length, img.draw.offset - 1
        );
        if (!size) {
            log_error("unable to load external image",
                data.bitmaps[img.draw.bitmap_id], image_id);
            return null;
        }
    }
    let buf: buffer;
    buffer_init(buf, data.tmp_data, size);
    let dst: color_t = data.tmp_data[4000000];
    if (img.draw.is_fully_compressed) {
        convert_compressed(buf, img.draw.data_length, dst);
    } else {
        convert_uncompressed(buf, img.draw.data_length, dst);
    }
    return dst;
}
export function image_group(group: number) {
    return data.group_image_ids[group];
}
export function image_get(id: number) {
    if (id >= 0 && id < MAIN_ENTRIES) {
        return data.main[id];
    } else {
        return NULL;
    }
}
export function image_letter(letter_id: number) {
    if (data.fonts_enabled == FULL_CHARSET_IN_FONT) {
        return data.font[data.font_base_offset + letter_id];
    } else if (data.fonts_enabled == MULTIBYTE_IN_FONT && letter_id >= IMAGE_FONT_MULTIBYTE_OFFSET) {
        return data.font[data.font_base_offset + letter_id - IMAGE_FONT_MULTIBYTE_OFFSET];
    } else if (letter_id < IMAGE_FONT_MULTIBYTE_OFFSET) {
        return data.main[data.group_image_ids[GROUP_FONT] + letter_id];
    } else {
        return DUMMY_IMAGE;
    }
}
export function image_get_enemy(id: number) {
    if (id >= 0 && id < ENEMY_ENTRIES) {
        return data.enemy[id];
    } else {
        return NULL;
    }
}
export function image_data(id: number) {
    if (id < 0 || id >= MAIN_ENTRIES) {
        return NULL;
    }
    if (!data.main[id].draw.is_external) {
        return data.main_data[data.main[id].draw.offset];
    } else if (id == image_group(GROUP_EMPIRE_MAP)) {
        return data.empire_data;
    } else {
        return load_external_data(id);
    }
}
export function image_data_letter(letter_id: number) {
    if (data.fonts_enabled == FULL_CHARSET_IN_FONT) {
        return data.font_data[data.font[data.font_base_offset + letter_id].draw.offset];
    } else if (data.fonts_enabled == MULTIBYTE_IN_FONT && letter_id >= IMAGE_FONT_MULTIBYTE_OFFSET) {
        return data.font_data[data.font[data.font_base_offset + letter_id - IMAGE_FONT_MULTIBYTE_OFFSET].draw.offset];
    } else if (letter_id < IMAGE_FONT_MULTIBYTE_OFFSET) {
        let image_id: number = data.group_image_ids[GROUP_FONT] + letter_id;
        return data.main_data[data.main[image_id].draw.offset];
    } else {
        return NULL;
    }
}
export function image_data_enemy(id: number) {
    if (data.enemy[id].draw.offset > 0) {
        return data.enemy_data[data.enemy[id].draw.offset];
    }
    return NULL;
}
