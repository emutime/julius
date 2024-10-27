// 引入必要的模块
import { io } from "core/io";
import { log } from "core/log";
import { string_length, string_to_int } from "core/string";

const TMP_BUFFER_SIZE = 100000;

const NUM_BUILDINGS = 130;
const NUM_HOUSES = 20;


/**
 * 建筑模型
 */
class model_building {
    cost: number; /**< 结构或结构一块（墙壁）的成本 */
    desirability_value: number; /**< 初始吸引值 */
    desirability_step: number; /**< 吸引值步长（以块为单位） */
    desirability_step_size: number; /**< 吸引值步长大小 */
    desirability_range: number; /**< 最大吸引值范围 */
    laborers: number; /**< 建筑雇佣的人数 */
};

/**
 * 房屋模型
 */
class model_house {
    devolve_desirability: number; /**< 房屋退化的吸引值 */
    evolve_desirability: number; /**< 房屋进化的吸引值 */
    entertainment: number; /**< 所需娱乐点数 */
    water: number; /**< 所需水源：1 = 井，2 = 喷泉 */
    religion: number; /**< 所需神灵数量 */
    education: number; /**< 所需教育：
        1 = 学校或图书馆，2 = 学校和图书馆，3 = 学校、图书馆和学院 */
    barber: number; /**< 是否需要理发师（布尔值） */
    bathhouse: number; /**< 是否需要澡堂（布尔值） */
    health: number; /**< 所需健康：1 = 医生或医院，2 = 医生和医院 */
    food_types: number; /**< 所需食物种类数量 */
    pottery: number; /**< 所需陶器 */
    oil: number; /**< 所需油 */
    furniture: number; /**< 所需家具 */
    wine: number; /**< 所需葡萄酒种类：1 = 任何葡萄酒，2 = 两种葡萄酒 */
    prosperity: number; /**< 繁荣贡献 */
    max_people: number; /**< 每块最大人数（中型公寓及以下）或每户（大型公寓及以上） */
    tax_multiplier: number; /**< 税率乘数 */
};


// 定义常量数组
const ALL_BUILDINGS = ['A', 'L', 'L', ' ', 'B', 'U', 'I', 'L', 'D', 'I', 'N', 'G', 'S', 0];
const ALL_HOUSES = ['A', 'L', 'L', ' ', 'H', 'O', 'U', 'S', 'E', 'S', 0];

// 创建建筑和房屋数组
const buildings: model_building[] = new Array(NUM_BUILDINGS);
const houses: model_house[] = new Array(NUM_HOUSES);

// 字符串比较函数
function strings_equal(a: Uint8Array, b: Uint8Array, len: number): boolean {
    for (let i = 0; i < len; i++) {
        if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
}

// 查找字符串的索引
function index_of_string(haystack: Uint8Array, needle: Uint8Array, haystack_length: number): number {
    const needle_length = string_length(needle);
    for (let i = 0; i < haystack_length; i++) {
        if (haystack[i] === needle[0] && strings_equal(haystack.subarray(i), needle, needle_length)) {
            return i + 1;
        }
    }
    return 0;
}

// 查找字符的索引
function index_of(haystack: Uint8Array, needle: number, haystack_length: number): number {
    for (let i = 0; i < haystack_length; i++) {
        if (haystack[i] === needle) {
            return i + 1;
        }
    }
    return 0;
}

// 跳过非数字字符
function skip_non_digits(str: Uint8Array): Uint8Array {
    let safeguard = 0;
    while (true) {
        if (++safeguard >= 1000) {
            break;
        }
        if ((str[0] >= '0'.charCodeAt(0) && str[0] <= '9'.charCodeAt(0)) || str[0] === '-'.charCodeAt(0)) {
            break;
        }
        str = str.subarray(1);
    }
    return str;
}

// 获取值
function get_value(ptr: Uint8Array, end_ptr: Uint8Array, value: { value: number }): Uint8Array {
    ptr = skip_non_digits(ptr);
    value.value = string_to_int(ptr);
    ptr = ptr.subarray(index_of(ptr, ','.charCodeAt(0), end_ptr.length - ptr.length));
    return ptr;
}

// 加载模型
function model_load(): boolean {
    const buffer = new Uint8Array(TMP_BUFFER_SIZE);
    const filesize = io.read_file_into_buffer("c3_model.txt", NOT_LOCALIZED, buffer, TMP_BUFFER_SIZE);
    if (filesize === 0) {
        log.error("No c3_model.txt file", 0, 0);
        return false;
    }

    let num_lines = 0;
    let guard = 200;
    let brace_index: number;
    let ptr = buffer.subarray(index_of_string(buffer, ALL_BUILDINGS, filesize));
    do {
        guard--;
        brace_index = index_of(ptr, '{'.charCodeAt(0), filesize);
        if (brace_index) {
            ptr = ptr.subarray(brace_index);
            num_lines++;
        }
    } while (brace_index && guard > 0);

    if (num_lines !== NUM_BUILDINGS + NUM_HOUSES) {
        log.error("Model has incorrect number of lines", 0, num_lines + 1);
        return false;
    }

    let dummy: { value: number } = { value: 0 };
    ptr = buffer.subarray(index_of_string(buffer, ALL_BUILDINGS, filesize));
    const end_ptr = buffer.subarray(filesize);
    for (let i = 0; i < NUM_BUILDINGS; i++) {
        ptr = ptr.subarray(index_of(ptr, '{'.charCodeAt(0), filesize));

        ptr = get_value(ptr, end_ptr, { value: buildings[i].cost });
        ptr = get_value(ptr, end_ptr, { value: buildings[i].desirability_value });
        ptr = get_value(ptr, end_ptr, { value: buildings[i].desirability_step });
        ptr = get_value(ptr, end_ptr, { value: buildings[i].desirability_step_size });
        ptr = get_value(ptr, end_ptr, { value: buildings[i].desirability_range });
        ptr = get_value(ptr, end_ptr, { value: buildings[i].laborers });
        ptr = get_value(ptr, end_ptr, dummy);
        ptr = get_value(ptr, end_ptr, dummy);
    }

    ptr = buffer.subarray(index_of_string(buffer, ALL_HOUSES, filesize));

    for (let i = 0; i < NUM_HOUSES; i++) {
        ptr = ptr.subarray(index_of(ptr, '{'.charCodeAt(0), filesize));

        ptr = get_value(ptr, end_ptr, { value: houses[i].devolve_desirability });
        ptr = get_value(ptr, end_ptr, { value: houses[i].evolve_desirability });
        ptr = get_value(ptr, end_ptr, { value: houses[i].entertainment });
        ptr = get_value(ptr, end_ptr, { value: houses[i].water });
        ptr = get_value(ptr, end_ptr, { value: houses[i].religion });
        ptr = get_value(ptr, end_ptr, { value: houses[i].education });
        ptr = get_value(ptr, end_ptr, dummy);
        ptr = get_value(ptr, end_ptr, { value: houses[i].barber });
        ptr = get_value(ptr, end_ptr, { value: houses[i].bathhouse });
        ptr = get_value(ptr, end_ptr, { value: houses[i].health });
        ptr = get_value(ptr, end_ptr, { value: houses[i].food_types });
        ptr = get_value(ptr, end_ptr, { value: houses[i].pottery });
        ptr = get_value(ptr, end_ptr, { value: houses[i].oil });
        ptr = get_value(ptr, end_ptr, { value: houses[i].furniture });
        ptr = get_value(ptr, end_ptr, { value: houses[i].wine });
        ptr = get_value(ptr, end_ptr, dummy);
        ptr = get_value(ptr, end_ptr, dummy);
        ptr = get_value(ptr, end_ptr, { value: houses[i].prosperity });
        ptr = get_value(ptr, end_ptr, { value: houses[i].max_people });
        ptr = get_value(ptr, end_ptr, { value: houses[i].tax_multiplier });
    }

    log.info("Model loaded", 0, 0);
    return true;
}

// 获取建筑模型
export function model_get_building(type: number): model_building {
    return buildings[type];
}

// 获取房屋模型
export function model_get_house(level: number): model_house {
    return houses[level];
}