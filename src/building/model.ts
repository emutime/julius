export const TMP_BUFFER_SIZE = 100000;
export const NUM_BUILDINGS = 130;
export const NUM_HOUSES = 20;
import { building_type } from 'building/type';
import { house_level } from 'building/type';
export class model_building {
    public cost: number = 0;
    public desirability_value: number = 0;
    public desirability_step: number = 0;
    public desirability_step_size: number = 0;
    public desirability_range: number = 0;
    public laborers: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.cost = args[0]);
        args.length >= 2 && (this.desirability_value = args[1]);
        args.length >= 3 && (this.desirability_step = args[2]);
        args.length >= 4 && (this.desirability_step_size = args[3]);
        args.length >= 5 && (this.desirability_range = args[4]);
        args.length >= 6 && (this.laborers = args[5]);
    }
}
export class model_house {
    public devolve_desirability: number = 0;
    public evolve_desirability: number = 0;
    public entertainment: number = 0;
    public water: number = 0;
    public religion: number = 0;
    public education: number = 0;
    public barber: number = 0;
    public bathhouse: number = 0;
    public health: number = 0;
    public food_types: number = 0;
    public pottery: number = 0;
    public oil: number = 0;
    public furniture: number = 0;
    public wine: number = 0;
    public prosperity: number = 0;
    public max_people: number = 0;
    public tax_multiplier: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.devolve_desirability = args[0]);
        args.length >= 2 && (this.evolve_desirability = args[1]);
        args.length >= 3 && (this.entertainment = args[2]);
        args.length >= 4 && (this.water = args[3]);
        args.length >= 5 && (this.religion = args[4]);
        args.length >= 6 && (this.education = args[5]);
        args.length >= 7 && (this.barber = args[6]);
        args.length >= 8 && (this.bathhouse = args[7]);
        args.length >= 9 && (this.health = args[8]);
        args.length >= 10 && (this.food_types = args[9]);
        args.length >= 11 && (this.pottery = args[10]);
        args.length >= 12 && (this.oil = args[11]);
        args.length >= 13 && (this.furniture = args[12]);
        args.length >= 14 && (this.wine = args[13]);
        args.length >= 15 && (this.prosperity = args[14]);
        args.length >= 16 && (this.max_people = args[15]);
        args.length >= 17 && (this.tax_multiplier = args[16]);
    }
}
import { localized } from 'core/dir';
import NOT_LOCALIZED = localized.NOT_LOCALIZED;
import { dir_listing } from 'core/dir';
import { io_read_file_into_buffer } from 'core/io';
import { log_info } from 'core/log';
import { log_error } from 'core/log';;
import { string_length } from 'core/string';
import { string_to_int } from 'core/string';
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
let ALL_BUILDINGS: uint8_t[] = new Array().fill({ 'A', 'L', 'L', ' ', 'B', 'U', 'I', 'L', 'D', 'I', 'N', 'G', 'S', 0});
let ALL_HOUSES: uint8_t[] = new Array().fill({ 'A', 'L', 'L', ' ', 'H', 'O', 'U', 'S', 'E', 'S', 0});
let buildings: model_building[] = new Array(NUM_BUILDINGS);
let houses: model_house[] = new Array(NUM_HOUSES);
function strings_equal(a: uint8_t, b: uint8_t, len: number) {
    for (let i: number = 0; i < len; i++, a++, b++) {
        if (* a != * b) {
            return 0;
        }
    }
    return 1;
}
function index_of_string(haystack: uint8_t, needle: uint8_t, haystack_length: number) {
    let needle_length: number = string_length(needle);
    for (let i: number = 0; i < haystack_length; i++) {
        if (haystack[i] == needle[0] && strings_equal(haystack[i], needle, needle_length)) {
            return i + 1;
        }
    }
    return 0;
}
function index_of(haystack: uint8_t, needle: uint8_t, haystack_length: number) {
    for (let i: number = 0; i < haystack_length; i++) {
        if (haystack[i] == needle) {
            return i + 1;
        }
    }
    return 0;
}
function skip_non_digits(str: uint8_t) {
    let safeguard: number = 0;
    while (1) {
        if (++safeguard >= 1000) {
            break;
        }
        if ((* str >= '0' && * str <= '9') || * str == '-') {
            break;
        }
        str++;
    }
    return str;
}
function get_value(ptr: uint8_t, end_ptr: uint8_t, value: number) {
    ptr = skip_non_digits(ptr);
    * value = string_to_int(ptr);
    ptr += index_of(ptr, ',', (int)(end_ptr - ptr))
    return ptr;
}
export function model_load() {
    let buffer: uint8_t = (uint8_t *) malloc(TMP_BUFFER_SIZE);
    if (!buffer) {
        log_error("No memory for model", 0, 0);
        return 0;
    }
    memset(buffer, 0);
    let filesize: number = io_read_file_into_buffer("c3_model.txt", NOT_LOCALIZED, buffer, TMP_BUFFER_SIZE);
    if (filesize == 0) {
        log_error("No c3_model.txt file", 0, 0);
        free(buffer);
        return 0;
    }
    let num_lines: number = 0;
    let guard: number = 200;
    let brace_index: number;
    let ptr: uint8_t = buffer[index_of_string(buffer, ALL_BUILDINGS, filesize)];
    do {
        guard--;
        brace_index = index_of(ptr, '{', filesize);
        if (brace_index) {
            ptr += brace_index;
            num_lines++;
        }
    } while (brace_index && guard > 0)
    if (num_lines != NUM_BUILDINGS + NUM_HOUSES) {
        log_error("Model has incorrect no of lines ", 0, num_lines + 1);
        free(buffer);
        return 0;
    }
    let dummy: number;
    ptr = buffer[index_of_string(buffer, ALL_BUILDINGS, filesize)];
    let end_ptr: uint8_t = buffer[filesize];
    for (let i: number = 0; i < NUM_BUILDINGS; i++) {
        ptr += index_of(ptr, '{', filesize)
        ptr = get_value(ptr, end_ptr, buildings[i].cost);
        ptr = get_value(ptr, end_ptr, buildings[i].desirability_value);
        ptr = get_value(ptr, end_ptr, buildings[i].desirability_step);
        ptr = get_value(ptr, end_ptr, buildings[i].desirability_step_size);
        ptr = get_value(ptr, end_ptr, buildings[i].desirability_range);
        ptr = get_value(ptr, end_ptr, buildings[i].laborers);
        ptr = get_value(ptr, end_ptr, dummy);
        ptr = get_value(ptr, end_ptr, dummy);
    }
    ptr = buffer[index_of_string(buffer, ALL_HOUSES, filesize)];
    for (let i: number = 0; i < NUM_HOUSES; i++) {
        ptr += index_of(ptr, '{', filesize)
        ptr = get_value(ptr, end_ptr, houses[i].devolve_desirability);
        ptr = get_value(ptr, end_ptr, houses[i].evolve_desirability);
        ptr = get_value(ptr, end_ptr, houses[i].entertainment);
        ptr = get_value(ptr, end_ptr, houses[i].water);
        ptr = get_value(ptr, end_ptr, houses[i].religion);
        ptr = get_value(ptr, end_ptr, houses[i].education);
        ptr = get_value(ptr, end_ptr, dummy);
        ptr = get_value(ptr, end_ptr, houses[i].barber);
        ptr = get_value(ptr, end_ptr, houses[i].bathhouse);
        ptr = get_value(ptr, end_ptr, houses[i].health);
        ptr = get_value(ptr, end_ptr, houses[i].food_types);
        ptr = get_value(ptr, end_ptr, houses[i].pottery);
        ptr = get_value(ptr, end_ptr, houses[i].oil);
        ptr = get_value(ptr, end_ptr, houses[i].furniture);
        ptr = get_value(ptr, end_ptr, houses[i].wine);
        ptr = get_value(ptr, end_ptr, dummy);
        ptr = get_value(ptr, end_ptr, dummy);
        ptr = get_value(ptr, end_ptr, houses[i].prosperity);
        ptr = get_value(ptr, end_ptr, houses[i].max_people);
        ptr = get_value(ptr, end_ptr, houses[i].tax_multiplier);
    }
    log_info("Model loaded", 0, 0);
    free(buffer);
    return 1;
}
export function model_get_building(type: building_type) {
    return buildings[type];
}
export function model_get_house(level: house_level) {
    return houses[level];
}
