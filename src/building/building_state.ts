// building_state.ts

import { buffer } from './buffer'; // 假设有一个 buffer 模块
import { building, INVENTORY_MAX, RESOURCE_MAX } from './building'; // 假设有 building 模块

// 检查建筑物是否为工业类型
const isIndustryType = (b: building): boolean => {
    return b.output_resource_id !== 0 || b.type === BUILDING_NATIVE_CROPS ||
        b.type === BUILDING_SHIPYARD || b.type === BUILDING_WHARF;
};

// 写入建筑物类型数据到缓冲区
const writeTypeData = (buf: buffer, b: building): void => {
    if (buildingIsHouse(b.type)) {
        for (let i = 0; i < INVENTORY_MAX; i++) {
            buf.writeI16(b.data.house.inventory[i]);
        }
        buf.writeU8(b.data.house.theater);
        buf.writeU8(b.data.house.amphitheater_actor);
        buf.writeU8(b.data.house.amphitheater_gladiator);
        buf.writeU8(b.data.house.colosseum_gladiator);
        buf.writeU8(b.data.house.colosseum_lion);
        buf.writeU8(b.data.house.hippodrome);
        buf.writeU8(b.data.house.school);
        buf.writeU8(b.data.house.library);
        buf.writeU8(b.data.house.academy);
        buf.writeU8(b.data.house.barber);
        buf.writeU8(b.data.house.clinic);
        buf.writeU8(b.data.house.bathhouse);
        buf.writeU8(b.data.house.hospital);
        buf.writeU8(b.data.house.temple_ceres);
        buf.writeU8(b.data.house.temple_neptune);
        buf.writeU8(b.data.house.temple_mercury);
        buf.writeU8(b.data.house.temple_mars);
        buf.writeU8(b.data.house.temple_venus);
        buf.writeU8(b.data.house.no_space_to_expand);
        buf.writeU8(b.data.house.num_foods);
        buf.writeU8(b.data.house.entertainment);
        buf.writeU8(b.data.house.education);
        buf.writeU8(b.data.house.health);
        buf.writeU8(b.data.house.num_gods);
        buf.writeU8(b.data.house.devolve_delay);
        buf.writeU8(b.data.house.evolve_text_id);
    } else if (b.type === BUILDING_MARKET) {
        buf.writeI16(0);
        for (let i = 0; i < INVENTORY_MAX; i++) {
            buf.writeI16(b.data.market.inventory[i]);
        }
        buf.writeI16(b.data.market.pottery_demand);
        buf.writeI16(b.data.market.furniture_demand);
        buf.writeI16(b.data.market.oil_demand);
        buf.writeI16(b.data.market.wine_demand);
        for (let i = 0; i < 3; i++) {
            buf.writeI16(0);
        }
        buf.writeU8(b.data.market.fetch_inventory_id);
        for (let i = 0; i < 9; i++) {
            buf.writeU8(0);
        }
    } else if (b.type === BUILDING_GRANARY) {
        buf.writeI16(0);
        for (let i = 0; i < RESOURCE_MAX; i++) {
            buf.writeI16(b.data.granary.resource_stored[i]);
        }
        buf.writeI32(0);
        buf.writeI32(0);
    } else if (b.type === BUILDING_DOCK) {
        buf.writeI16(b.data.dock.queued_docker_id);
        for (let i = 0; i < 25; i++) {
            buf.writeU8(0);
        }
        buf.writeU8(b.data.dock.num_ships);
        buf.writeU8(0);
        buf.writeU8(0);
        buf.writeI8(b.data.dock.orientation);
        buf.writeU8(0);
        buf.writeU8(0);
        buf.writeU8(0);
        for (let i = 0; i < 3; i++) {
            buf.writeI16(b.data.dock.docker_ids[i]);
        }
        buf.writeI16(b.data.dock.trade_ship_id);
    } else if (isIndustryType(b)) {
        buf.writeI16(b.data.industry.progress);
        for (let i = 0; i < 12; i++) {
            buf.writeU8(0);
        }
        buf.writeU8(b.data.industry.has_fish);
        for (let i = 0; i < 14; i++) {
            buf.writeU8(0);
        }
        buf.writeU8(b.data.industry.blessing_days_left);
        buf.writeU8(b.data.industry.orientation);
        buf.writeU8(b.data.industry.has_raw_materials);
        buf.writeU8(0);
        buf.writeU8(b.data.industry.curse_days_left);
        for (let i = 0; i < 6; i++) {
            buf.writeU8(0);
        }
        buf.writeI16(b.data.industry.fishing_boat_id);
    } else {
        for (let i = 0; i < 26; i++) {
            buf.writeU8(0);
        }
        buf.writeU8(b.data.entertainment.num_shows);
        buf.writeU8(b.data.entertainment.days1);
        buf.writeU8(b.data.entertainment.days2);
        buf.writeU8(b.data.entertainment.play);
        for (let i = 0; i < 12; i++) {
            buf.writeU8(0);
        }
    }
};

// 将建筑物状态保存到缓冲区
export const buildingStateSaveToBuffer = (buf: buffer, b: building): void => {
    buf.writeU8(b.state);
    buf.writeU8(b.faction_id);
    buf.writeU8(b.unknown_value);
    buf.writeU8(b.size);
    buf.writeU8(b.house_is_merged);
    buf.writeU8(b.house_size);
    buf.writeU8(b.x);
    buf.writeU8(b.y);
    buf.writeI16(b.grid_offset);
    buf.writeI16(b.type);
    buf.writeI16(b.subtype.house_level); // 使用哪个联合字段无关紧要
    buf.writeU8(b.road_network_id);
    buf.writeU8(0);
    buf.writeU16(b.created_sequence);
    buf.writeI16(b.houses_covered);
    buf.writeI16(b.percentage_houses_covered);
    buf.writeI16(b.house_population);
    buf.writeI16(b.house_population_room);
    buf.writeI16(b.distance_from_entry);
    buf.writeI16(b.house_highest_population);
    buf.writeI16(b.house_unreachable_ticks);
    buf.writeU8(b.road_access_x);
    buf.writeU8(b.road_access_y);
    buf.writeI16(b.figure_id);
    buf.writeI16(b.figure_id2);
    buf.writeI16(b.immigrant_figure_id);
    buf.writeI16(b.figure_id4);
    buf.writeU8(b.figure_spawn_delay);
    buf.writeU8(0);
    buf.writeU8(b.figure_roam_direction);
    buf.writeU8(b.has_water_access);
    buf.writeU8(0);
    buf.writeU8(0);
    buf.writeI16(b.prev_part_building_id);
    buf.writeI16(b.next_part_building_id);
    buf.writeI16(b.loads_stored);
    buf.writeU8(0);
    buf.writeU8(b.has_well_access);
    buf.writeI16(b.num_workers);
    buf.writeU8(b.labor_category);
    buf.writeU8(b.output_resource_id);
    buf.writeU8(b.has_road_access);
    buf.writeU8(b.house_criminal_active);
    buf.writeI16(b.damage_risk);
    buf.writeI16(b.fire_risk);
    buf.writeI16(b.fire_duration);
    buf.writeU8(b.fire_proof);
    buf.writeU8(b.house_figure_generation_delay);
    buf.writeU8(b.house_tax_coverage);
    buf.writeU8(0);
    buf.writeI16(b.formation_id);
    writeTypeData(buf, b);
    buf.writeI32(b.tax_income_or_storage);
    buf.writeU8(b.house_days_without_food);
    buf.writeU8(b.ruin_has_plague);
    buf.writeI8(b.desirability);
    buf.writeU8(b.is_deleted);
    buf.writeU8(b.is_adjacent_to_water);
    buf.writeU8(b.storage_id);
    buf.writeI8(b.sentiment.house_happiness); // 使用哪个联合字段无关紧要
    buf.writeU8(b.show_on_problem_overlay);
};

// 从缓冲区读取建筑物类型数据
const readTypeData = (buf: buffer, b: building): void => {
    if (buildingIsHouse(b.type)) {
        for (let i = 0; i < INVENTORY_MAX; i++) {
            b.data.house.inventory[i] = buf.readI16();
        }
        b.data.house.theater = buf.readU8();
        b.data.house.amphitheater_actor = buf.readU8();
        b.data.house.amphitheater_gladiator = buf.readU8();
        b.data.house.colosseum_gladiator = buf.readU8();
        b.data.house.colosseum_lion = buf.readU8();
        b.data.house.hippodrome = buf.readU8();
        b.data.house.school = buf.readU8();
        b.data.house.library = buf.readU8();
        b.data.house.academy = buf.readU8();
        b.data.house.barber = buf.readU8();
        b.data.house.clinic = buf.readU8();
        b.data.house.bathhouse = buf.readU8();
        b.data.house.hospital = buf.readU8();
        b.data.house.temple_ceres = buf.readU8();
        b.data.house.temple_neptune = buf.readU8();
        b.data.house.temple_mercury = buf.readU8();
        b.data.house.temple_mars = buf.readU8();
        b.data.house.temple_venus = buf.readU8();
        b.data.house.no_space_to_expand = buf.readU8();
        b.data.house.num_foods = buf.readU8();
        b.data.house.entertainment = buf.readU8();
        b.data.house.education = buf.readU8();
        b.data.house.health = buf.readU8();
        b.data.house.num_gods = buf.readU8();
        b.data.house.devolve_delay = buf.readU8();
        b.data.house.evolve_text_id = buf.readU8();
    } else if (b.type === BUILDING_MARKET) {
        buf.skip(2);
        for (let i = 0; i < INVENTORY_MAX; i++) {
            b.data.market.inventory[i] = buf.readI16();
        }
        b.data.market.pottery_demand = buf.readI16();
        b.data.market.furniture_demand = buf.readI16();
        b.data.market.oil_demand = buf.readI16();
        b.data.market.wine_demand = buf.readI16();
        buf.skip(6);
        b.data.market.fetch_inventory_id = buf.readU8();
        buf.skip(9);
    } else if (b.type === BUILDING_GRANARY) {
        buf.skip(2);
        for (let i = 0; i < RESOURCE_MAX; i++) {
            b.data.granary.resource_stored[i] = buf.readI16();
        }
        buf.skip(8);
    } else if (b.type === BUILDING_DOCK) {
        b.data.dock.queued_docker_id = buf.readI16();
        buf.skip(25);
        b.data.dock.num_ships = buf.readU8();
        buf.skip(2);
        b.data.dock.orientation = buf.readI8();
        buf.skip(3);
        for (let i = 0; i < 3; i++) {
            b.data.dock.docker_ids[i] = buf.readI16();
        }
        b.data.dock.trade_ship_id = buf.readI16();
    } else if (isIndustryType(b)) {
        b.data.industry.progress = buf.readI16();
        buf.skip(12);
        b.data.industry.has_fish = buf.readU8();
        buf.skip(14);
        b.data.industry.blessing_days_left = buf.readU8();
        b.data.industry.orientation = buf.readU8();
        b.data.industry.has_raw_materials = buf.readU8();
        buf.skip(1);
        b.data.industry.curse_days_left = buf.readU8();
        buf.skip(6);
        b.data.industry.fishing_boat_id = buf.readI16();
    } else {
        buf.skip(26);
        b.data.entertainment.num_shows = buf.readU8();
        b.data.entertainment.days1 = buf.readU8();
        b.data.entertainment.days2 = buf.readU8();
        b.data.entertainment.play = buf.readU8();
        buf.skip(12);
    }
};

// 从缓冲区加载建筑物状态
export const buildingStateLoadFromBuffer = (buf: buffer, b: building): void => {
    b.state = buf.readU8();
    b.faction_id = buf.readU8();
    b.unknown_value = buf.readU8();
    b.size = buf.readU8();
    b.house_is_merged = buf.readU8();
    b.house_size = buf.readU8();
    b.x = buf.readU8();
    b.y = buf.readU8();
    b.grid_offset = buf.readI16();
    b.type = buf.readI16();
    b.subtype.house_level = buf.readI16(); // 使用哪个联合字段无关紧要
    b.road_network_id = buf.readU8();
    buf.skip(1);
    b.created_sequence = buf.readU16();
    b.houses_covered = buf.readI16();
    b.percentage_houses_covered = buf.readI16();
    b.house_population = buf.readI16();
    b.house_population_room = buf.readI16();
    b.distance_from_entry = buf.readI16();
    b.house_highest_population = buf.readI16();
    b.house_unreachable_ticks = buf.readI16();
    b.road_access_x = buf.readU8();
    b.road_access_y = buf.readU8();
    b.figure_id = buf.readI16();
    b.figure_id2 = buf.readI16();
    b.immigrant_figure_id = buf.readI16();
    b.figure_id4 = buf.readI16();
    b.figure_spawn_delay = buf.readU8();
    buf.skip(1);
    b.figure_roam_direction = buf.readU8();
    b.has_water_access = buf.readU8();
    buf.skip(1);
    buf.skip(1);
    b.prev_part_building_id = buf.readI16();
    b.next_part_building_id = buf.readI16();
    b.loads_stored = buf.readI16();
    buf.skip(1);
    b.has_well_access = buf.readU8();
    b.num_workers = buf.readI16();
    b.labor_category = buf.readU8();
    b.output_resource_id = buf.readU8();
    b.has_road_access = buf.readU8();
    b.house_criminal_active = buf.readU8();
    b.damage_risk = buf.readI16();
    b.fire_risk = buf.readI16();
    b.fire_duration = buf.readI16();
    b.fire_proof = buf.readU8();
    b.house_figure_generation_delay = buf.readU8();
    b.house_tax_coverage = buf.readU8();
    buf.skip(1);
    b.formation_id = buf.readI16();
    readTypeData(buf, b);
    b.tax_income_or_storage = buf.readI32();
    b.house_days_without_food = buf.readU8();
    b.ruin_has_plague = buf.readU8();
    b.desirability = buf.readI8();
    b.is_deleted = buf.readU8();
    b.is_adjacent_to_water = buf.readU8();
    b.storage_id = buf.readU8();
    b.sentiment.house_happiness = buf.readI8(); // 使用哪个联合字段无关紧要
    b.show_on_problem_overlay = buf.readU8();
};