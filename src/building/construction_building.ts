// construction_building.ts

import {
    building,
    building_storage_create,
    city_buildings_add_hippodrome,
    formation_legion_create_for_fort,
    game_undo_add_building,
    image_group,
    map_building_tiles_add,
    TERRAIN_BUILDING
} from './imports'; // 假设所有的导入都在一个文件中

// 添加堡垒
function add_fort(type: number, fort: building) {
    fort.prev_part_building_id = 0;
    map_building_tiles_add(fort.id, fort.x, fort.y, fort.size, image_group(GROUP_BUILDING_FORT), TERRAIN_BUILDING);

    // 设置堡垒的子类型
    switch (type) {
        case BUILDING_FORT_LEGIONARIES:
            fort.subtype.fort_figure_type = FIGURE_FORT_LEGIONARY;
            break;
        case BUILDING_FORT_JAVELIN:
            fort.subtype.fort_figure_type = FIGURE_FORT_JAVELIN;
            break;
        case BUILDING_FORT_MOUNTED:
            fort.subtype.fort_figure_type = FIGURE_FORT_MOUNTED;
            break;
    }

    fort.formation_id = formation_legion_create_for_fort(fort);

    // 创建阅兵场
    const ground = building_create(BUILDING_FORT_GROUND, fort.x + 3, fort.y - 1);
    game_undo_add_building(ground);
    ground.formation_id = fort.formation_id;
    ground.prev_part_building_id = fort.id;
    fort.next_part_building_id = ground.id;
    ground.next_part_building_id = 0;
    map_building_tiles_add(ground.id, fort.x + 3, fort.y - 1, 4, image_group(GROUP_BUILDING_FORT) + 1, TERRAIN_BUILDING);
}

// 添加马戏团
function add_hippodrome(b: building) {
    const image1 = image_group(GROUP_BUILDING_HIPPODROME_1);
    const image2 = image_group(GROUP_BUILDING_HIPPODROME_2);
    city_buildings_add_hippodrome();

    const orientation = city_view_orientation();
    const part1 = b;
    part1.subtype.orientation = (orientation === DIR_0_TOP || orientation === DIR_4_BOTTOM) ? 0 : 3;
    part1.prev_part_building_id = 0;

    let image_id: number;
    switch (orientation) {
        case DIR_0_TOP:
            image_id = image2;
            break;
        case DIR_2_RIGHT:
            image_id = image1 + 4;
            break;
        case DIR_4_BOTTOM:
            image_id = image2 + 4;
            break;
        case DIR_6_LEFT:
            image_id = image1;
            break;
        default:
            return;
    }
    map_building_tiles_add(b.id, b.x, b.y, b.size, image_id, TERRAIN_BUILDING);

    const part2 = building_create(BUILDING_HIPPODROME, b.x + 5, b.y);
    game_undo_add_building(part2);
    part2.subtype.orientation = (orientation === DIR_0_TOP || orientation === DIR_4_BOTTOM) ? 1 : 4;
    part2.prev_part_building_id = part1.id;
    part1.next_part_building_id = part2.id;
    part2.next_part_building_id = 0;

    switch (orientation) {
        case DIR_0_TOP:
        case DIR_4_BOTTOM:
            image_id = image2 + 2;
            break;
        case DIR_2_RIGHT:
        case DIR_6_LEFT:
            image_id = image1 + 2;
            break;
    }
    map_building_tiles_add(part2.id, b.x + 5, b.y, b.size, image_id, TERRAIN_BUILDING);

    const part3 = building_create(BUILDING_HIPPODROME, b.x + 10, b.y);
    game_undo_add_building(part3);
    part3.subtype.orientation = (orientation === DIR_0_TOP || orientation === DIR_4_BOTTOM) ? 2 : 5;
    part3.prev_part_building_id = part2.id;
    part2.next_part_building_id = part3.id;
    part3.next_part_building_id = 0;

    switch (orientation) {
        case DIR_0_TOP:
            image_id = image2 + 4;
            break;
        case DIR_2_RIGHT:
            image_id = image1;
            break;
        case DIR_4_BOTTOM:
            image_id = image2;
            break;
        case DIR_6_LEFT:
            image_id = image1 + 4;
            break;
    }
    map_building_tiles_add(part3.id, b.x + 10, b.y, b.size, image_id, TERRAIN_BUILDING);
}

// 添加仓库空间
function add_warehouse_space(x: number, y: number, prev: building): building {
    const b = building_create(BUILDING_WAREHOUSE_SPACE, x, y);
    game_undo_add_building(b);
    b.prev_part_building_id = prev.id;
    prev.next_part_building_id = b.id;
    map_building_tiles_add(b.id, x, y, 1, image_group(GROUP_BUILDING_WAREHOUSE_STORAGE_EMPTY), TERRAIN_BUILDING);
    return b;
}

// 添加仓库
function add_warehouse(b: building) {
    b.storage_id = building_storage_create();
    b.prev_part_building_id = 0;
    map_building_tiles_add(b.id, b.x, b.y, 1, image_group(GROUP_BUILDING_WAREHOUSE), TERRAIN_BUILDING);

    let prev = b;
    prev = add_warehouse_space(b.x + 1, b.y, prev);
    prev = add_warehouse_space(b.x + 2, b.y, prev);
    prev = add_warehouse_space(b.x, b.y + 1, prev);
    prev = add_warehouse_space(b.x + 1, b.y + 1, prev);
    prev = add_warehouse_space(b.x + 2, b.y + 1, prev);
    prev = add_warehouse_space(b.x, b.y + 2, prev);
    prev = add_warehouse_space(b.x + 1, b.y + 2, prev);
    prev = add_warehouse_space(b.x + 2, b.y + 2, prev);
    prev.next_part_building_id = 0;
}

// 添加建筑
function add_building(b: building, image_id: number) {
    map_building_tiles_add(b.id, b.x, b.y, b.size, image_id, TERRAIN_BUILD