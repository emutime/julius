// 引入模型模块
import { building_type, house_level, model_building, model_house } from '../../src/building/type';

// 定义建筑模型数组
const buildings: model_building[] = [
    [0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [4, 0, 0, 0, 0, 0],
    [12, 0, 0, 0, 0, 0],
    [30, 0, 0, 0, 0, 0],
    [8, - 2, 1, 1, 2, 0],
    [2, 0, 0, 0, 0, 0],
    [10, -3, 1, 1, 3, 0],
    [0, -3, 1, 1, 3, 0],
    [0, -2, 1, 1, 2, 0],
    [0, -2, 1, 1, 2, 0],
    [0, -2, 1, 1, 2, 0],
    [0, -2, 1, 1, 2, 0],
    [0, -1, 1, 1, 1, 0],
    [0, -1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 1, 2, -1, 2, 0],
    [0, 1, 2, -1, 2, 0],
    [0, 2, 2, -2, 2, 0],
    [0, 2, 2, -2, 2, 0],
    [0, 3, 2, -1, 6, 0],
    [0, 3, 2, -1, 6, 0],
    [0, 4, 2, -1, 6, 0],
    [0, 4, 2, -1, 6, 0],
    [100, 4, 1, -1, 4, 12],
    [50, 2, 1, -1, 2, 8],
    [2500, -3, 1, 1, 3, 150],
    [500, -3, 1, 1, 3, 25],
    [75, -3, 1, 1, 3, 8],
    [75, -3, 1, 1, 3, 8],
    [50, 2, 1, -1, 2, 5],
    [75, -3, 1, 1, 3, 10],
    [15, 4, 1, -2, 2, 0],
    [12, 3, 1, -1, 3, 0],
    [1000, -20, 2, 2, 8, 16],
    [12, 3, 1, -1, 3, 0],
    [60, 10, 1, -2, 4, 0],
    [150, 14, 2, -2, 5, 0],
    [1000, -20, 2, 2, 8, 16],
    [1000, -20, 2, 2, 8, 16],
    [30, 0, 0, 0, 0, 5],
    [300, -1, 2, 1, 2, 30],
    [50, 4, 1, -1, 4, 10],
    [25, 2, 1, -1, 2, 2],
    [0, 0, 0, 0, 0, 0],
    [50, -2, 1, 1, 2, 10],
    [100, 4, 1, 1, 4, 30],
    [75, 4, 1, -1, 4, 20],
    [0, 0, 0, 0, 0, 0],
    [30, -2, 1, 1, 2, 6],
    [0, 18, 2, 3, 5, 0],
    [250, -20, 2, 2, 8, 16],
    [100, -4, 1, 1, 3, 3],
    [150, -8, 1, 2, 3, 6],
    [50, 4, 2, -1, 6, 2],
    [50, 4, 2, -1, 6, 2],
    [50, 4, 2, -1, 6, 2],
    [50, 4, 2, -1, 6, 2],
    [50, 4, 2, -1, 6, 2],
    [150, 8, 2, -1, 8, 5],
    [150, 8, 2, -1, 8, 5],
    [150, 8, 2, -1, 8, 5],
    [150, 8, 2, -1, 8, 5],
    [150, 8, 2, -1, 8, 5],
    [40, -2, 1, 1, 6, 5],
    [100, -4, 1, 2, 2, 6],
    [70, -5, 2, 2, 3, 6],
    [0, 0, 0, 0, 0, 0],
    [100, -8, 2, 2, 3, 10],
    [100, -8, 2, 2, 3, 12],
    [60, -8, 2, 2, 3, 6],
    [150, 12, 2, -2, 3, 0],
    [400, 20, 2, -3, 4, 0],
    [700, 28, 2, -4, 5, 0],
    [100, -3, 1, 1, 2, 20],
    [30, 0, 1, 1, 1, 5],
    [40, 0, 0, 0, 0, 0],
    [100, 0, 0, 0, 0, 0],
    [250, 8, 2, -2, 2, 20],
    [400, 8, 2, -1, 8, 30],
    [75, 3, 2, -1, 2, 6],
    [125, 3, 2, -1, 2, 8],
    [50, 0, 0, 0, 0, 0],
    [50, 0, 0, 0, 0, 0],
    [80, -6, 1, 2, 3, 0],
    [15, 0, 0, 0, 0, 4],
    [5, -1, 1, 2, 1, 1],
    [0, 0, 0, 0, 0, 0],
    [1000, -3, 1, 1, 3, 20],
    [150, -6, 1, 1, 3, 10],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [200, 8, 2, -1, 6, 0],
    [0, -1, 1, 1, 2, 0],
    [40, -2, 1, 1, 2, 10],
    [40, -2, 1, 1, 2, 10],
    [40, 2, 1, 1, 2, 10],
    [40, 2, 1, 1, 2, 10],
    [40, 2, 1, 1, 2, 10],
    [40, -2, 1, 1, 2, 10],
    [50, -6, 1, 1, 4, 10],
    [50, -6, 1, 1, 4, 10],
    [40, -4, 1, 1, 3, 10],
    [40, -3, 1, 1, 2, 10],
    [45, -1, 1, 1, 1, 10],
    [50, -4, 1, 1, 2, 10],
    [50, -4, 1, 1, 2, 10],
    [40, -4, 1, 1, 2, 10],
    [40, -4, 1, 1, 2, 10],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
];

// 定义房屋模型数组
const houses: model_house[] = [
    [- 99, -10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 1],
    [-12, -5, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 7, 1],
    [-7, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 15, 9, 1],
    [-2, 4, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 20, 11, 1],
    [2, 8, 0, 2, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 25, 13, 2],
    [6, 12, 10, 2, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 30, 15, 2],
    [10, 16, 10, 2, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 35, 17, 2],
    [14, 20, 10, 2, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 45, 19, 2],
    [18, 25, 25, 2, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 50, 19, 3],
    [22, 32, 25, 2, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 58, 20, 3],
    [29, 40, 25, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 0, 65, 84, 3],
    [37, 48, 35, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 0, 80, 84, 4],
    [45, 53, 35, 2, 2, 2, 1, 1, 1, 2, 1, 1, 1, 1, 150, 40, 9],
    [50, 58, 40, 2, 2, 2, 1, 1, 2, 2, 1, 1, 1, 1, 180, 42, 10],
    [55, 63, 45, 2, 2, 3, 1, 1, 2, 2, 1, 1, 1, 1, 400, 90, 11],
    [60, 68, 50, 2, 3, 3, 1, 1, 2, 3, 1, 1, 1, 1, 600, 100, 11],
    [65, 74, 55, 2, 3, 3, 1, 1, 2, 3, 1, 1, 1, 2, 700, 106, 12],
    [70, 80, 60, 2, 4, 3, 1, 1, 2, 3, 1, 1, 1, 2, 900, 112, 12],
    [76, 90, 70, 2, 4, 3, 1, 1, 2, 3, 1, 1, 1, 2, 1500, 190, 15],
    [85, 100, 80, 2, 4, 3, 1, 1, 2, 3, 1, 1, 1, 2, 1750, 200, 16],
];

// 加载模型的函数
export function model_load(): number {
    return 1;
}

// 获取建筑模型的函数
export function model_get_building(type: building_type): model_building {
    return buildings[type];
}

// 获取房屋模型的函数
export function model_get_house(level: house_level): model_house {
    return houses[level];
}