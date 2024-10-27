// 定义常量
const HEADER_SIZE = 20680;
const ENTRY_SIZE = 64;

const MAIN_ENTRIES = 10000;
const ENEMY_ENTRIES = 801;
const EXTERNAL_FONT_ENTRIES = 2000;
const TRAD_CHINESE_FONT_ENTRIES = 3 * IMAGE_FONT_MULTIBYTE_TRAD_CHINESE_MAX_CHARS;
const SIMP_CHINESE_FONT_ENTRIES = 3 * IMAGE_FONT_MULTIBYTE_SIMP_CHINESE_MAX_CHARS;
const KOREAN_FONT_ENTRIES = 3 * IMAGE_FONT_MULTIBYTE_KOREAN_MAX_CHARS;
const JAPANESE_FONT_ENTRIES = 3 * IMAGE_FONT_MULTIBYTE_JAPANESE_MAX_CHARS;

const MAIN_INDEX_SIZE = 660680;
const ENEMY_INDEX_OFFSET = HEADER_SIZE;
const ENEMY_INDEX_SIZE = ENTRY_SIZE * ENEMY_ENTRIES;
const EXTERNAL_FONT_INDEX_OFFSET = HEADER_SIZE;
const EXTERNAL_FONT_INDEX_SIZE = ENTRY_SIZE * EXTERNAL_FONT_ENTRIES;

const MAIN_DATA_SIZE = 30000000;
const EMPIRE_DATA_SIZE = 2000 * 1000 * 4;
const ENEMY_DATA_SIZE = 2400000;
const EXTERNAL_FONT_DATA_SIZE = 1500000;
const CHINESE_FONT_DATA_SIZE = 7200000;
const KOREAN_FONT_DATA_SIZE = 7500000;
const JAPANESE_FONT_DATA_SIZE = 11000000;
const SCRATCH_DATA_SIZE = 12100000;

const CYRILLIC_FONT_BASE_OFFSET = 201;
const GREEK_FONT_BASE_OFFSET = 1;

const NAME_SIZE = 32;

enum FontType {
    NO_EXTRA_FONT = 0,
    FULL_CHARSET_IN_FONT = 1,
    MULTIBYTE_IN_FONT = 2
}

// 定义图像结构
export interface image {
    draw: {
        offset: number;
        data_length: number;
        uncompressed_length: number;
        is_external: boolean;
        is_fully_compressed: boolean;
        has_compressed_part: boolean;
        type: number;
        bitmap_id: number;
    };
    width: number;
    height: number;
    num_animation_sprites: number;
    sprite_offset_x: number;
    sprite_offset_y: number;
    animation_can_reverse: boolean;
    animation_speed_id: number;
}

// 定义颜色类型
type Color = number;

// 定义数据结构
interface Data {
    current_climate: number;
    is_editor: boolean;
    fonts_enabled: FontType;
    font_base_offset: number;
    group_image_ids: number[];
    bitmaps: string[];
    main: Image[];
    enemy: Image[];
    font: Image[];
    main_data: Color[];
    empire_data: Color[];
    enemy_data: Color[];
    font_data: Color[];
    tmp_data: Uint8Array;
}

// 初始化数据
const data: Data = {
    current_climate: -1,
    is_editor: false,
    fonts_enabled: FontType.NO_EXTRA_FONT,
    font_base_offset: 0,
    group_image_ids: new Array(300).fill(0),
    bitmaps: new Array(100).fill(""),
    main: new Array(MAIN_ENTRIES).fill({} as Image),
    enemy: new Array(ENEMY_ENTRIES).fill({} as Image),
    font: [],
    main_data: [],
    empire_data: [],
    enemy_data: [],
    font_data: [],
    tmp_data: new Uint8Array(SCRATCH_DATA_SIZE)
};

// 初始化图像
export function image_init(): boolean {
    data.enemy_data = new Array(ENEMY_DATA_SIZE).fill(0);
    data.main_data = new Array(MAIN_DATA_SIZE).fill(0);
    data.empire_data = new Array(EMPIRE_DATA_SIZE).fill(0);
    data.tmp_data = new Uint8Array(SCRATCH_DATA_SIZE);
    if (!data.main_data || !data.empire_data || !data.enemy_data || !data.tmp_data) {
        data.main_data = [];
        data.empire_data = [];
        data.enemy_data = [];
        data.tmp_data = new Uint8Array(0);
        return false;
    }
    return true;
}

// 准备索引
export function prepare_index(images: Image[], size: number): void {
    let offset = 4;
    for (let i = 1; i < size; i++) {
        const img = images[i];
        if (img.draw.is_external) {
            if (img.draw.offset === 0) {
                img.draw.offset = 1;
            }
        } else {
            img.draw.offset = offset;
            offset += img.draw.data_length;
        }
    }
}

// 读取索引条目
export function read_index_entry(buf: Buffer, img: Image): void {
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

// 读取索引
export function read_index(buf: Buffer, images: Image[], size: number): void {
    for (let i = 0; i < size; i++) {
        read_index_entry(buf, images[i]);
    }
    prepare_index(images, size);
}

// 读取头部
export function read_header(buf: Buffer): void {
    buffer_skip(buf, 80); // 跳过头部整数
    for (let i = 0; i < 300; i++) {
        data.group_image_ids[i] = buffer_read_u16(buf);
    }
    buffer_read_raw(buf, data.bitmaps, 20000);
}

// 将 16 位颜色转换为 32 位颜色
export function to_32_bit(c: number): color_t {
    return ((c & 0x7c00) << 9) | ((c & 0x7000) << 4) |
        ((c & 0x3e0) << 6) | ((c & 0x380) << 1) |
        ((c & 0x1f) << 3) | ((c & 0x1c) >> 2);
}

// 转换未压缩图像
export function convert_uncompressed(buf: Buffer, buf_length: number, dst: color_t[]): number {
    for (let i = 0; i < buf_length; i += 2) {
        dst.push(to_32_bit(buffer_read_u16(buf)));
    }
    return buf_length / 2;
}

// 转换压缩图像
export function convert_compressed(buf: Buffer, buf_length: number, dst: color_t[]): number {
    let dst_length = 0;
    while (buf_length > 0) {
        const control = buffer_read_u8(buf);
        if (control === 255) {
            // 下一个字节 = 透明像素数
            dst.push(255);
            dst.push(buffer_read_u8(buf));
            dst_length += 2;
            buf_length -= 2;
        } else {
            // control = 具体像素的数量
            dst.push(control);
            for (let i = 0; i < control; i++) {
                dst.push(to_32_bit(buffer_read_u16(buf)));
            }
            dst_length += control + 1;
            buf_length -= control * 2 + 1;
        }
    }
    return dst_length;
}

// 转换图像
export function convert_images(images: Image[], size: number, buf: Buffer, dst: color_t[]): void {
    const start_dst = dst.length;
    dst.push(0); // 确保 img->offset > 0
    for (let i = 0; i < size; i++) {
        const img = images[i];
        if (img.draw.is_external) {
            continue;
        }
        buffer_set(buf, img.draw.offset);
        const img_offset = dst.length - start_dst;
        if (img.draw.is_fully_compressed) {
            convert_compressed(buf, img.draw.data_length, dst);
        } else if (img.draw.has_compressed_part) { // 等轴测图像
            convert_uncompressed(buf, img.draw.uncompressed_length, dst);
            convert_compressed(buf, img.draw.data_length - img.draw.uncompressed_length, dst);
        } else {
            convert_uncompressed(buf, img.draw.data_length, dst);
        }
        img.draw.offset = img_offset;
        img.draw.uncompressed_length /= 2;
    }
}

// 加载帝国数据
export function load_empire(): void {
    const size = io_read_file_into_buffer(EMPIRE_555, MAY_BE_LOCALIZED, data.tmp_data, EMPIRE_DATA_SIZE);
    if (size !== EMPIRE_DATA_SIZE / 2) {
        log_error("无法加载帝国数据", EMPIRE_555, 0);
        return;
    }
    const buf: Buffer = { data: new Uint8Array(data.tmp_data), position: 0 };
    convert_uncompressed(buf, size, data.empire_data);
}

// 加载气候图像
export function image_load_climate(climate_id: number, is_editor: number, force_reload: number): number {
    if (climate_id === data.current_climate && is_editor === data.is_editor && !force_reload) {
        return 1;
    }

    const filename_bmp = is_editor ? EDITOR_GRAPHICS_555[climate_id] : MAIN_GRAPHICS_555[climate_id];
    const filename_idx = is_editor ? EDITOR_GRAPHICS_SG2[climate_id] : MAIN_GRAPHICS_SG2[climate_id];

    if (MAIN_INDEX_SIZE !== io_read_file_into_buffer(filename_idx, MAY_BE_LOCALIZED, data.tmp_data, MAIN_INDEX_SIZE)) {
        return 0;
    }

    let buf: Buffer = { data: new Uint8Array(data.tmp_data), position: 0 };
    buffer_init(buf, data.tmp_data, HEADER_SIZE);
    read_header(buf);
    buffer_init(buf, data.tmp_data.slice(HEADER_SIZE), ENTRY_SIZE * MAIN_ENTRIES);
    read_index(buf, data.main, MAIN_ENTRIES);

    const data_size = io_read_file_into_buffer(filename_bmp, MAY_BE_LOCALIZED, data.tmp_data, SCRATCH_DATA_SIZE);
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

// 释放字体内存
export function free_font_memory(): void {
    free(data.font);
    free(data.font_data);
    data.font = 0;
    data.font_data = 0;
    data.fonts_enabled = NO_EXTRA_FONT;
}

// 分配字体内存
export function alloc_font_memory(font_entries: number, font_data_size: number): number {
    free_font_memory();
    data.font = new Array(font_entries).fill({} as Image);
    data.font_data = new Array(font_data_size).fill(0);
    if (!data.font || !data.font_data) {
        free(data.font);
        free(data.font_data);
        return 0;
    }
    return 1;
}

// 加载外部字体
export function load_external_fonts(base_offset: number): number {
    if (!alloc_font_memory(EXTERNAL_FONT_ENTRIES, EXTERNAL_FONT_DATA_SIZE)) {
        return 0;
    }
    if (EXTERNAL_FONT_INDEX_SIZE !== io_read_file_part_into_buffer(EXTERNAL_FONTS_SG2, MAY_BE_LOCALIZED,
        data.tmp_data, EXTERNAL_FONT_INDEX_SIZE, EXTERNAL_FONT_INDEX_OFFSET)) {
        return 0;
    }
    const buf: Buffer = { data: data.tmp_data, size: EXTERNAL_FONT_INDEX_SIZE };
    read_index(buf, data.font, EXTERNAL_FONT_ENTRIES);

    const data_size = io_read_file_into_buffer(EXTERNAL_FONTS_555, MAY_BE_LOCALIZED, data.tmp_data, SCRATCH_DATA_SIZE);
    if (!data_size) {
        return 0;
    }
    buffer_init(buf, data.tmp_data, data_size);
    convert_images(data.font, EXTERNAL_FONT_ENTRIES, buf, data.font_data);

    data.fonts_enabled = FULL_CHARSET_IN_FONT;
    data.font_base_offset = base_offset;
    return 1;
}

// 解析多字节字体
export function parse_multibyte_font(
    num_chars: number, input: Buffer, pixels: Uint32Array, pixel_offset: number,
    char_size: number, letter_spacing: number, index_offset: number
): number {
    for (let i = 0; i < num_chars; i++) {
        const img = data.font[index_offset + i];
        img.width = char_size + letter_spacing;
        img.height = char_size;
        img.draw.bitmap_id = 0;
        img.draw.offset = pixel_offset;
        img.draw.uncompressed_length = img.draw.data_length = img.width * img.height;

        for (let row = 0; row < char_size; row++) {
            let bits = 0;
            for (let col = 0; col < char_size; col++) {
                if (col % 2 === 0) {
                    bits = buffer_read_u8(input);
                }
                if (col < img.width) {
                    const value = bits & 0xf;
                    if (value === 0) {
                        pixels[pixel_offset] = COLOR_SG2_TRANSPARENT;
                    } else {
                        const color_value = (value * 16 + value);
                        pixels[pixel_offset] = color_value << 24;
                    }
                    pixel_offset++;
                }
                bits >>= 4;
            }
            for (let s = 0; s < letter_spacing; s++) {
                pixels[pixel_offset] = COLOR_SG2_TRANSPARENT;
                pixel_offset++;
            }
        }
    }
    return pixel_offset;
}

export function parse_chinese_font(
    int num_chars, buffer * input, color_t * pixels, int pixel_offset, int char_size, int index_offset): number {
    int bytes_per_row = char_size <= 16 ? 2 : 3;
    for (int i = 0; i < num_chars; i++) {
        image * img = & data.font[index_offset + i];
        img -> width = char_size + 1;
        img -> height = char_size - 1;
        img -> draw.bitmap_id = 0;
        img -> draw.offset = pixel_offset;
        img -> draw.uncompressed_length = img -> draw.data_length = img -> width * img -> height;
        for (int row = 0; row < img -> height; row++) {
            unsigned int bits = buffer_read_u16(input);
            if (bytes_per_row == 3) {
                bits += buffer_read_u8(input) << 16;
            }
            int prev_set = 0;
            for (int col = 0; col < img -> width; col++) {
                int set = bits & 1;
                if (set) {
                    * pixels = ALPHA_OPAQUE;
                } else if (prev_set) {
                    * pixels = ALPHA_FONT_SEMI_TRANSPARENT;
                } else {
                    * pixels = COLOR_SG2_TRANSPARENT;
                }
                pixels++;
                pixel_offset++;
                bits >>= 1;
                prev_set = set;
            }
        }
    }
    return pixel_offset;
}
// 解析繁体中文字体
export function load_traditional_chinese_fonts(): number {
    if (!alloc_font_memory(TRAD_CHINESE_FONT_ENTRIES, CHINESE_FONT_DATA_SIZE)) {
        return 0;
    }

    let file_version = 2;
    let data_size = io_read_file_into_buffer(CHINESE_FONTS_555_V2, MAY_BE_LOCALIZED, data.tmp_data, SCRATCH_DATA_SIZE);
    if (!data_size) {
        file_version = 1;
        data_size = io_read_file_into_buffer(CHINESE_FONTS_555, MAY_BE_LOCALIZED, data.tmp_data, SCRATCH_DATA_SIZE);
        if (!data_size) {
            log_error("Julius requires extra files for Chinese characters:", CHINESE_FONTS_555_V2, 0);
            return 0;
        }
    }

    const input: Buffer = { data: data.tmp_data, size: data_size };
    const pixels = data.font_data;
    let offset = 0;
    const num_chars = IMAGE_FONT_MULTIBYTE_TRAD_CHINESE_MAX_CHARS;

    log_info("Parsing Traditional Chinese font", 0, 0);
    if (file_version === 2) {
        // 4-bit 字体文件
        offset = parse_multibyte_font(num_chars, input, pixels, offset, 12, 1, 0);
        offset = parse_multibyte_font(num_chars, input, pixels, offset, 15, 1, num_chars);
        offset = parse_multibyte_font(num_chars, input, pixels, offset, 20, 1, num_chars * 2);
    } else if (file_version === 1) {
        // 旧的 1-bit 字体文件
        offset = parse_chinese_font(num_chars, input, pixels, offset, 12, 0);
        offset = parse_chinese_font(num_chars, input, pixels, offset, 16, num_chars);
        offset = parse_chinese_font(num_chars, input, pixels, offset, 20, num_chars * 2);
    }
    log_info("Done parsing Traditional Chinese font", 0, 0);

    data.fonts_enabled = MULTIBYTE_IN_FONT;
    data.font_base_offset = 0;
    return 1;
}

// 加载简体中文字体
export function load_simplified_chinese_fonts(): number {
    if (!alloc_font_memory(SIMP_CHINESE_FONT_ENTRIES, CHINESE_FONT_DATA_SIZE)) {
        return 0;
    }

    let file_version = 2;
    let data_size = io_read_file_into_buffer(CHINESE_FONTS_555_V2, MAY_BE_LOCALIZED, data.tmp_data, SCRATCH_DATA_SIZE);
    if (!data_size) {
        file_version = 1;
        data_size = io_read_file_into_buffer(CHINESE_FONTS_555, MAY_BE_LOCALIZED, data.tmp_data, SCRATCH_DATA_SIZE);
        if (!data_size) {
            log_error("Julius requires extra files for Chinese characters:", CHINESE_FONTS_555_V2, 0);
            return 0;
        }
    }

    const input: Buffer = { data: data.tmp_data, size: data_size };
    const pixels = data.font_data;
    let offset = 0;
    const num_chars = IMAGE_FONT_MULTIBYTE_SIMP_CHINESE_MAX_CHARS;

    log_info("Parsing Simplified Chinese font", 0, 0);
    if (file_version === 2) {
        // 4-bit 字体文件
        offset = parse_multibyte_font(num_chars, input, pixels, offset, 12, 1, 0);
        offset = parse_multibyte_font(num_chars, input, pixels, offset, 15, 1, num_chars);
        offset = parse_multibyte_font(num_chars, input, pixels, offset, 20, 1, num_chars * 2);
    } else if (file_version === 1) {
        // 旧的 1-bit 字体文件
        offset = parse_chinese_font(num_chars, input, pixels, offset, 12, 0);
        offset = parse_chinese_font(num_chars, input, pixels, offset, 16, num_chars);
        offset = parse_chinese_font(num_chars, input, pixels, offset, 19, num_chars * 2);
    }
    log_info("Done parsing Simplified Chinese font", 0, 0);

    data.fonts_enabled = MULTIBYTE_IN_FONT;
    data.font_base_offset = 0;
    return 1;
}

export function parse_korean_font(buffer * input, color_t * pixels, int pixel_offset, int char_size, int index_offset): number {
    int bytes_per_row = char_size <= 16 ? 2 : 3;
    for (int i = 0; i < IMAGE_FONT_MULTIBYTE_KOREAN_MAX_CHARS; i++) {
        image * img = & data.font[index_offset + i];
        img -> width = char_size;
        img -> height = char_size;
        img -> draw.bitmap_id = 0;
        img -> draw.offset = pixel_offset;
        img -> draw.uncompressed_length = img -> draw.data_length = img -> width * img -> height;
        for (int row = 0; row < char_size; row++) {
            unsigned int bits = buffer_read_u16(input);
            if (bytes_per_row == 3) {
                bits += buffer_read_u8(input) << 16;
            }
            int prev_set = 0;
            for (int col = 0; col < char_size; col++) {
                int set = bits & 1;
                if (set) {
                    * pixels = ALPHA_OPAQUE;
                } else if (prev_set) {
                    * pixels = ALPHA_FONT_SEMI_TRANSPARENT;
                } else {
                    * pixels = COLOR_SG2_TRANSPARENT;
                }
                pixels++;
                pixel_offset++;
                bits >>= 1;
                prev_set = set;
            }
        }
    }
    return pixel_offset;
}

export function load_korean_fonts(): number {
    if (!alloc_font_memory(KOREAN_FONT_ENTRIES, KOREAN_FONT_DATA_SIZE)) {
        return 0;
    }

    let file_version = 2;
    let data_size = io_read_file_into_buffer(KOREAN_FONTS_555_V2, MAY_BE_LOCALIZED, data.tmp_data, SCRATCH_DATA_SIZE);
    if (!data_size) {
        file_version = 1;
        data_size = io_read_file_into_buffer(KOREAN_FONTS_555, MAY_BE_LOCALIZED, data.tmp_data, SCRATCH_DATA_SIZE);
        if (!data_size) {
            log_error("Julius requires extra files for Korean characters:", KOREAN_FONTS_555, 0);
            return 0;
        }
    }

    const input: Buffer = { data: data.tmp_data, size: data_size };
    const pixels = data.font_data;
    let offset = 0;
    const num_chars = IMAGE_FONT_MULTIBYTE_KOREAN_MAX_CHARS;

    log_info("Parsing Korean font", 0, 0);
    if (file_version === 2) {
        // 4-bit 字体文件
        offset = parse_multibyte_font(num_chars, input, pixels, offset, 12, 0, 0);
        offset = parse_multibyte_font(num_chars, input, pixels, offset, 15, 0, num_chars);
        offset = parse_multibyte_font(num_chars, input, pixels, offset, 20, 0, num_chars * 2);
    } else if (file_version === 1) {
        // 旧的 1-bit 字体文件
        offset = parse_korean_font(input, pixels, offset, 12, 0);
        offset = parse_korean_font(input, pixels, offset, 15, num_chars);
        offset = parse_korean_font(input, pixels, offset, 20, num_chars * 2);
    }
    log_info("Done parsing Korean font", 0, 0);

    data.fonts_enabled = MULTIBYTE_IN_FONT;
    data.font_base_offset = 0;
    return 1;
}

// 加载日文字体
export function load_japanese_fonts(): number {
    if (!alloc_font_memory(JAPANESE_FONT_ENTRIES, JAPANESE_FONT_DATA_SIZE)) {
        return 0;
    }

    const data_size = io_read_file_into_buffer(JAPANESE_FONTS_555, MAY_BE_LOCALIZED, data.tmp_data, SCRATCH_DATA_SIZE);
    if (!data_size) {
        log_error("Julius requires extra files for Japanese characters:", JAPANESE_FONTS_555, 0);
        return 0;
    }

    const input: Buffer = { data: data.tmp_data, size: data_size };
    const pixels = data.font_data;
    let offset = 0;
    const num_chars = IMAGE_FONT_MULTIBYTE_JAPANESE_MAX_CHARS;
    const num_half_width = 63;
    const num_full_width = num_chars - num_half_width;

    log_info("Parsing Japanese font", 0, 0);
    // 4-bit 字体文件
    offset = parse_multibyte_font(num_half_width, input, pixels, offset, 12, -5, 0);
    offset = parse_multibyte_font(num_full_width, input, pixels, offset, 12, 1, num_half_width);
    offset = parse_multibyte_font(num_half_width, input, pixels, offset, 15, -6, num_chars);
    offset = parse_multibyte_font(num_full_width, input, pixels, offset, 15, 1, num_chars + num_half_width);
    offset = parse_multibyte_font(num_half_width, input, pixels, offset, 20, -9, num_chars * 2);
    offset = parse_multibyte_font(num_full_width, input, pixels, offset, 20, 1, num_chars * 2 + num_half_width);
    log_info("Done parsing Japanese font", 0, offset);

    data.fonts_enabled = MULTIBYTE_IN_FONT;
    data.font_base_offset = 0;
    return 1;
}

// 加载字体
export function image_load_fonts(encoding: encoding_type): number {
    if (encoding === ENCODING_CYRILLIC) {
        return load_external_fonts(CYRILLIC_FONT_BASE_OFFSET);
    } else if (encoding === ENCODING_GREEK) {
        return load_external_fonts(GREEK_FONT_BASE_OFFSET);
    } else if (encoding === ENCODING_TRADITIONAL_CHINESE) {
        return load_traditional_chinese_fonts();
    } else if (encoding === ENCODING_SIMPLIFIED_CHINESE) {
        return load_simplified_chinese_fonts();
    } else if (encoding === ENCODING_KOREAN) {
        return load_korean_fonts();
    } else if (encoding === ENCODING_JAPANESE) {
        return load_japanese_fonts();
    } else {
        free_font_memory();
        return 1;
    }
}

// 加载敌人图像
export function image_load_enemy(enemy_id: number): number {
    const filename_bmp = ENEMY_GRAPHICS_555[enemy_id];
    const filename_idx = ENEMY_GRAPHICS_SG2[enemy_id];

    if (ENEMY_INDEX_SIZE !== io_read_file_part_into_buffer(
        filename_idx, MAY_BE_LOCALIZED, data.tmp_data, ENEMY_INDEX_SIZE, ENEMY_INDEX_OFFSET)) {
        return 0;
    }

    const buf: Buffer = { data: data.tmp_data, size: ENEMY_INDEX_SIZE };
    read_index(buf, data.enemy, ENEMY_ENTRIES);

    const data_size = io_read_file_into_buffer(filename_bmp, MAY_BE_LOCALIZED, data.tmp_data, SCRATCH_DATA_SIZE);
    if (!data_size) {
        return 0;
    }
    buffer_init(buf, data.tmp_data, data_size);
    convert_images(data.enemy, ENEMY_ENTRIES, buf, data.enemy_data);
    return 1;
}

// 加载外部数据
export function load_external_data(image_id: number): Uint32Array | null {
    const img = data.main[image_id];
    const filename = `555/${data.bitmaps[img.draw.bitmap_id]}`;
    const full_filename = `${filename}.555`;
    let size = io_read_file_part_into_buffer(
        full_filename, MAY_BE_LOCALIZED, data.tmp_data,
        img.draw.data_length, img.draw.offset - 1
    );
    if (!size) {
        // 尝试在 555 目录中
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
    const buf: Buffer = { data: data.tmp_data, size: size };
    const dst = new Uint32Array(4000000); // 假设有足够的空间
    // NB: 等轴测图像永远不是外部的
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

// 获取图像
export function image_get(id: number): Image | null {
    if (id >= 0 && id < MAIN_ENTRIES) {
        return data.main[id];
    } else {
        return null;
    }
}

// 获取字母图像
export function image_letter(letter_id: number): Image {
    if (data.fonts_enabled === FULL_CHARSET_IN_FONT) {
        return data.font[data.font_base_offset + letter_id];
    } else if (data.fonts_enabled === MULTIBYTE_IN_FONT && letter_id >= IMAGE_FONT_MULTIBYTE_OFFSET) {
        return data.font[data.font_base_offset + letter_id - IMAGE_FONT_MULTIBYTE_OFFSET];
    } else if (letter_id < IMAGE_FONT_MULTIBYTE_OFFSET) {
        return data.main[data.group_image_ids[GROUP_FONT] + letter_id];
    } else {
        return DUMMY_IMAGE; // 返回虚拟图像
    }
}

// 获取敌人图像
export function image_get_enemy(id: number): Image | null {
    if (id >= 0 && id < ENEMY_ENTRIES) {
        return data.enemy[id];
    } else {
        return null; // 返回空值
    }
}

// 获取图像数据
export function image_data(id: number): Color | null {
    if (id < 0 || id >= MAIN_ENTRIES) {
        return null; // 返回空值
    }
    if (!data.main[id].draw.is_external) {
        return data.main_data[data.main[id].draw.offset];
    } else if (id === image_group(GROUP_EMPIRE_MAP)) {
        return data.empire_data;
    } else {
        return load_external_data(id); // 加载外部数据
    }
}

// 获取字母图像数据
export function image_data_letter(letter_id: number): Color | null {
    if (data.fonts_enabled === FULL_CHARSET_IN_FONT) {
        return data.font_data[data.font[data.font_base_offset + letter_id].draw.offset];
    } else if (data.fonts_enabled === MULTIBYTE_IN_FONT && letter_id >= IMAGE_FONT_MULTIBYTE_OFFSET) {
        return data.font_data[data.font[data.font_base_offset + letter_id - IMAGE_FONT_MULTIBYTE_OFFSET].draw.offset];
    } else if (letter_id < IMAGE_FONT_MULTIBYTE_OFFSET) {
        const image_id = data.group_image_ids[GROUP_FONT] + letter_id;
        return data.main_data[data.main[image_id].draw.offset];
    } else {
        return null; // 返回空值
    }
}

// 获取敌人图像数据
export function image_data_enemy(id: number): Color | null {
    if (data.enemy[id].draw.offset > 0) {
        return data.enemy_data[data.enemy[id].draw.offset];
    }
    return null; // 返回空值
}