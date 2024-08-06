// 引入必要的模块
import { building, BUILDING_CHARIOT_MAKER, BUILDING_CLAY_PIT, BUILDING_DOCK, BUILDING_ENGINEERS_POST, BUILDING_FOUNTAIN, BUILDING_GLADIATOR_SCHOOL, BUILDING_GRANARY, BUILDING_HIPPODROME, BUILDING_IRON_MINE, building_is_workshop, BUILDING_MARBLE_QUARRY, BUILDING_MARKET, BUILDING_PREFECTURE, BUILDING_RESERVOIR, BUILDING_THEATER, BUILDING_TIMBER_YARD, BUILDING_WAREHOUSE, BUILDING_WINE_WORKSHOP } from './building';
import { model_get_building } from './building/model';
import { calc_percentage } from './core/calc';
import { image, image_get } from './core/image';
import { game_animation_should_advance } from './game/animation';
import { map_sprite_animation_at, map_sprite_animation_set } from './map/sprite';

// 定义建筑动画偏移函数
function building_animation_offset(b: building, image_id: number, grid_offset: number): number {
    // 检查建筑类型和条件，决定是否返回0
    if (b.type === BUILDING_FOUNTAIN && (b.num_workers <= 0 || !b.has_water_access)) {
        return 0;
    }
    if (b.type === BUILDING_RESERVOIR && !b.has_water_access) {
        return 0;
    }
    if (building_is_workshop(b.type)) {
        if (b.loads_stored <= 0 || b.num_workers <= 0) {
            return 0;
        }
    }
    if ((b.type === BUILDING_PREFECTURE || b.type === BUILDING_ENGINEERS_POST) && b.num_workers <= 0) {
        return 0;
    }
    if (b.type === BUILDING_MARKET && b.num_workers <= 0) {
        return 0;
    }
    if (b.type === BUILDING_WAREHOUSE && b.num_workers < model_get_building(b.type).laborers) {
        return 0;
    }
    if (b.type === BUILDING_DOCK && b.data.dock.num_ships <= 0) {
        map_sprite_animation_set(grid_offset, 1);
        return 1;
    }
    if (b.type === BUILDING_MARBLE_QUARRY && b.num_workers <= 0) {
        map_sprite_animation_set(grid_offset, 1);
        return 1;
    } else if ((b.type === BUILDING_IRON_MINE || b.type === BUILDING_CLAY_PIT || b.type === BUILDING_TIMBER_YARD) && b.num_workers <= 0) {
        return 0;
    }
    if (b.type === BUILDING_GLADIATOR_SCHOOL) {
        if (b.num_workers <= 0) {
            map_sprite_animation_set(grid_offset, 1);
            return 1;
        }
    } else if (b.type >= BUILDING_THEATER && b.type <= BUILDING_CHARIOT_MAKER && b.type !== BUILDING_HIPPODROME && b.num_workers <= 0) {
        return 0;
    }
    if (b.type === BUILDING_GRANARY && b.num_workers < model_get_building(b.type).laborers) {
        return 0;
    }

    // 获取图像
    const img: image = image_get(image_id);
    if (!game_animation_should_advance(img.animation_speed_id)) {
        return map_sprite_animation_at(grid_offset) & 0x7f;
    }

    // 处理动画推进
    let new_sprite = 0;
    let is_reverse = 0;
    if (b.type === BUILDING_WINE_WORKSHOP) {
        // 处理葡萄酒作坊的特殊情况
        const pct_done = calc_percentage(b.data.industry.progress, 400);
        if (pct_done <= 0) {
            new_sprite = 0;
        } else if (pct_done < 4) {
            new_sprite = 1;
        } else if (pct_done < 8) {
            new_sprite = 2;
        } else if (pct_done < 12) {
            new_sprite = 3;
        } else if (pct_done < 96) {
            if (map_sprite_animation_at(grid_offset) < 4) {
                new_sprite = 4;
            } else {
                new_sprite = map_sprite_animation_at(grid_offset) + 1;
                if (new_sprite > 8) {
                    new_sprite = 4;
                }
            }
        } else {
            // 接近完成
            if (map_sprite_animation_at(grid_offset) < 9) {
                new_sprite = 9;
            } else {
                new_sprite = map_sprite_animation_at(grid_offset) + 1;
                if (new_sprite > 12) {
                    new_sprite = 12;
                }
            }
        }
    } else if (img.animation_can_reverse) {
        // 处理可逆动画
        if (map_sprite_animation_at(grid_offset) & 0x80) {
            is_reverse = 1;
        }
        const current_sprite = map_sprite_animation_at(grid_offset) & 0x7f;
        if (is_reverse) {
            new_sprite = current_sprite - 1;
            if (new_sprite < 1) {
                new_sprite = 1;
                is_reverse = 0;
            }
        } else {
            new_sprite = current_sprite + 1;
            if (new_sprite > img.num_animation_sprites) {
                new_sprite = img.num_animation_sprites;
                is_reverse = 1;
            }
        }
    } else {
        // 处理普通情况
        new_sprite = map_sprite_animation_at(grid_offset) + 1;
        if (new_sprite > img.num_animation_sprites) {
            new_sprite = 1;
        }
    }

    // 设置新的动画帧
    map_sprite_animation_set(grid_offset, is_reverse ? new_sprite | 0x80 : new_sprite);
    return new_sprite;
}