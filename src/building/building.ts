// 引入必要的模块
import { buffer, buffer_read_i32, buffer_skip, buffer_write_i32 } from './buffer';
import { BUILDING_BARRACKS, BUILDING_CLAY_PIT, BUILDING_DISTRIBUTION_CENTER_UNUSED, BUILDING_DOCK, BUILDING_FORT, BUILDING_FRUIT_FARM, BUILDING_FURNITURE_WORKSHOP, BUILDING_GATEHOUSE, BUILDING_GRANARY, BUILDING_HIPPODROME, BUILDING_HOUSE_LARGE_INSULA, BUILDING_HOUSE_LARGE_PALACE, BUILDING_HOUSE_LARGE_VILLA, BUILDING_HOUSE_LUXURY_PALACE, BUILDING_HOUSE_MEDIUM_INSULA, BUILDING_HOUSE_MEDIUM_PALACE, BUILDING_HOUSE_MEDIUM_VILLA, BUILDING_HOUSE_SMALL_TENT, BUILDING_HOUSE_VACANT_LOT, BUILDING_IRON_MINE, BUILDING_MARBLE_QUARRY, BUILDING_OIL_WORKSHOP, BUILDING_OLIVE_FARM, BUILDING_PIG_FARM, BUILDING_POTTERY_WORKSHOP, BUILDING_RESERVOIR, BUILDING_SENATE, BUILDING_STATE_CREATED, BUILDING_STATE_DELETED_BY_GAME, BUILDING_STATE_DELETED_BY_PLAYER, BUILDING_STATE_IN_USE, BUILDING_STATE_RUBBLE, BUILDING_STATE_UNDO, BUILDING_STATE_UNUSED, BUILDING_TIMBER_YARD, BUILDING_TOWER, building_type, BUILDING_VEGETABLE_FARM, BUILDING_VINES_FARM, BUILDING_WEAPONS_WORKSHOP, BUILDING_WHEAT_FARM, BUILDING_WINE_WORKSHOP, RESOURCE_CLAY, RESOURCE_FRUIT, RESOURCE_FURNITURE, RESOURCE_IRON, RESOURCE_MARBLE, RESOURCE_MEAT, RESOURCE_NONE, RESOURCE_OIL, RESOURCE_OLIVES, RESOURCE_POTTERY, RESOURCE_TIMBER, RESOURCE_VEGETABLES, RESOURCE_VINES, RESOURCE_WEAPONS, RESOURCE_WHEAT, RESOURCE_WINE, WORKSHOP_CLAY_TO_POTTERY, WORKSHOP_IRON_TO_WEAPONS, WORKSHOP_OLIVES_TO_OIL, WORKSHOP_TIMBER_TO_FURNITURE, WORKSHOP_VINES_TO_WINE } from './building';
import { building_state_load_from_buffer, building_state_save_to_buffer } from './building/building_state';
import { building_properties, building_properties_for_type } from './building/properties';
import { building_storage_delete } from './building/storage';
import { city_buildings_remove_barracks, city_buildings_remove_distribution_center, city_buildings_remove_dock, city_buildings_remove_hippodrome, city_buildings_remove_senate, city_buildings_unknown_value, city_population_remove_home_removed, city_warning_show, WARNING_DATA_LIMIT_REACHED } from './city/buildings';
import { formation_legion_delete_for_fort } from './figure/formation_legion';
import { game_undo_contains_building } from './game/undo';
import { map_building_tiles_remove, map_desirability_get_max, map_elevation_at, map_grid_offset, map_random_get, map_routing_update_land, map_terrain_is_adjacent_to_water, map_tiles_update_all_aqueducts, map_tiles_update_all_roads, map_tiles_update_all_walls } from './map';

export class building {
    id: number; // 建筑物 ID

    state: number; // 状态
    faction_id: number; // 阵营 ID
    unknown_value: number; // 未知值
    size: number; // 大小
    house_is_merged: number; // 房屋是否合并
    house_size: number; // 房屋大小
    x: number; // X 坐标
    y: number; // Y 坐标
    grid_offset: number; // 网格偏移
    type: number; // 类型
    subtype: subtype; // 子类型
    road_network_id: number; // 道路网络 ID
    created_sequence: number; // 创建序列
    houses_covered: number; // 覆盖的房屋数量
    percentage_houses_covered: number; // 覆盖房屋的百分比
    house_population: number; // 房屋人口
    house_population_room: number; // 房屋人口房间
    distance_from_entry: number; // 距离入口的距离
    house_highest_population: number; // 房屋最高人口
    house_unreachable_ticks: number; // 房屋不可达的时间
    road_access_x: number; // 道路访问 X
    road_access_y: number; // 道路访问 Y
    figure_id: number; // 角色 ID
    figure_id2: number; // 劳动力寻求者或市场买家 ID
    immigrant_figure_id: number; // 移民角色 ID
    figure_id4: number; // 塔弩或燃烧废墟的长官 ID
    figure_spawn_delay: number; // 角色生成延迟
    figure_roam_direction: number; // 角色游荡方向
    has_water_access: number; // 是否有水源接入
    prev_part_building_id: number; // 上一个部分建筑 ID
    next_part_building_id: number; // 下一个部分建筑 ID
    loads_stored: number; // 存储的负载
    has_well_access: number; // 是否有井接入
    num_workers: number; // 工人数量
    labor_category: number; // 劳动类别
    output_resource_id: number; // 输出资源 ID
    has_road_access: number; // 是否有道路接入
    house_criminal_active: number; // 房屋犯罪活动状态
    damage_risk: number; // 损坏风险
    fire_risk: number; // 火灾风险
    fire_duration: number; // 火灾持续时间
    fire_proof: number; // 是否防火（不能着火或倒塌）
    house_figure_generation_delay: number; // 房屋角色生成延迟
    house_tax_coverage: number; // 房屋税收覆盖
    formation_id: number; // 阵型 ID
    data: data; // 数据
    tax_income_or_storage: number; // 税收收入或存储
    house_days_without_food: number; // 房屋无食物天数
    ruin_has_plague: number; // 废墟是否有瘟疫
    desirability: number; // 受欢迎程度
    is_deleted: number; // 是否已删除
    is_adjacent_to_water: number; // 是否邻近水源
    storage_id: number; // 存储 ID
    sentiment: sentiment; // 情感
    show_on_problem_overlay: number; // 在问题覆盖层上显示

    constructor() {
        this.subtype = new subtype();
        this.data = new data();
        this.sentiment = new sentiment();
    }
}

export class subtype {
    house_level?: number; // 房屋等级
    warehouse_resource_id?: number; // 仓库资源 ID
    workshop_type?: number; // 工作坊类型
    orientation?: number; // 方向
    fort_figure_type?: number; // 要塞角色类型
    native_meeting_center_id?: number; // 本土会议中心 ID
}

export class data {
    dock: dock; // 码头数据
    market: market; // 市场数据
    granary: granary; // 谷仓数据
    industry: industry; // 工业数据
    entertainment: entertainment; // 娱乐数据
    house: house; // 房屋数据

    public constructor() {
        this.dock = new dock();
        this.market = new market();
        this.granary = new granary();
        this.industry = new industry();
        this.entertainment = new entertainment();
        this.house = new house();
    }

    public reset() {
        this.dock.reset();
        this.market.reset();
        this.granary.reset();
        this.industry.reset();
        this.entertainment.reset();
        this.house.reset();
    }
}

export class dock {
    queued_docker_id: number; // 排队的码头 ID
    num_ships: number; // 船只数量
    orientation: number; // 方向
    docker_ids: number[]; // 码头 ID 数组
    trade_ship_id: number; // 贸易船 ID

    constructor() {
        this.docker_ids = new Array(3).fill(0);
    }
}

export class market {
    inventory: number[]; // 库存
    pottery_demand: number; // 陶器需求
    furniture_demand: number; // 家具需求
    oil_demand: number; // 油需求
    wine_demand: number; // 葡萄酒需求
    fetch_inventory_id: number; // 获取库存 ID

    constructor() {
        this.inventory = new Array(8).fill(0);
    }
}

export class granary {
    resource_stored: number[]; // 存储的资源

    constructor() {
        this.resource_stored = new Array(16).fill(0);
    }
}

export class industry {
    progress: number; // 进度
    blessing_days_left: number; // 剩余祝福天数
    curse_days_left: number; // 剩余诅咒天数
    has_raw_materials: number; // 是否有原材料
    has_fish: number; // 是否有鱼
    orientation: number; // 方向
    fishing_boat_id: number; // 渔船 ID
}

export class entertainment {
    num_shows: number; // 演出数量
    days1: number; // 天数 1
    days2: number; // 天数 2
    play: number; // 演出状态
}

class house {
    inventory: number[]; // 库存
    theater: number; // 剧院
    amphitheater_actor: number; // 圆形剧场演员
    amphitheater_gladiator: number; // 圆形剧场角斗士
    colosseum_gladiator: number; // 斗兽场角斗士
    colosseum_lion: number; // 斗兽场狮子
    hippodrome: number; // 赛马场
    school: number; // 学校
    library: number; // 图书馆
    academy: number; // 学院
    barber: number; // 理发店
    clinic: number; // 诊所
    bathhouse: number; // 浴室
    hospital: number; // 医院
    temple_ceres: number; // 谷物女神庙
    temple_neptune: number; // 海神庙
    temple_mercury: number; // 商神庙
    temple_mars: number; // 战神庙
    temple_venus: number; // 爱神庙
    no_space_to_expand: number; // 无法扩展空间
    num_foods: number; // 食物数量
    entertainment: number; // 娱乐
    education: number; // 教育
    health: number; // 健康
    num_gods: number; // 神明数量
    devolve_delay: number; // 退化延迟
    evolve_text_id: number; // 进化文本 ID

    constructor() {
        this.inventory = new Array(8).fill(0);
    }
}

export class sentiment {
    house_happiness?: number; // 房屋幸福感
    native_anger?: number; // 本土愤怒值
}

// 定义最大建筑数量
const MAX_BUILDINGS = 1000;

// 定义建筑数组
let all_buildings: building[] = new Array(MAX_BUILDINGS).fill(null).map(() => new building());

// 额外的状态信息
let extra = {
    highest_id_in_use: 0,
    highest_id_ever: 0,
    created_sequence: 0,
    incorrect_houses: 0,
    unfixable_houses: 0
};

// 获取建筑
function building_get(id: number): building {
    return all_buildings[id];
}

// 获取主建筑
function building_main(b: building): building {
    for (let guard = 0; guard < 9; guard++) {
        if (b.prev_part_building_id <= 0) {
            return b;
        }
        b = all_buildings[b.prev_part_building_id];
    }
    return all_buildings[0];
}

// 获取下一个建筑
function building_next(b: building): building {
    return all_buildings[b.next_part_building_id];
}

// 创建建筑
function building_create(type: building_type, x: number, y: number): building {
    let b: building | null = null;
    for (let i = 1; i < MAX_BUILDINGS; i++) {
        if (all_buildings[i].state === BUILDING_STATE_UNUSED && !game_undo_contains_building(i)) {
            b = all_buildings[i];
            break;
        }
    }
    if (!b) {
        city_warning_show(WARNING_DATA_LIMIT_REACHED);
        return all_buildings[0];
    }

    const props: building_properties = building_properties_for_type(type);

    // 初始化建筑数据
    b.data.reset();
    b.state = BUILDING_STATE_CREATED;
    b.faction_id = 1;
    b.unknown_value = city_buildings_unknown_value();
    b.type = type;
    b.size = props.size;
    b.created_sequence = extra.created_sequence++;
    b.sentiment = { house_happiness: 50 };
    b.distance_from_entry = 0;

    // 设置房屋大小
    b.house_size = 0;
    if (type >= BUILDING_HOUSE_SMALL_TENT && type <= BUILDING_HOUSE_MEDIUM_INSULA) {
        b.house_size = 1;
    } else if (type >= BUILDING_HOUSE_LARGE_INSULA && type <= BUILDING_HOUSE_MEDIUM_VILLA) {
        b.house_size = 2;
    } else if (type >= BUILDING_HOUSE_LARGE_VILLA && type <= BUILDING_HOUSE_MEDIUM_PALACE) {
        b.house_size = 3;
    } else if (type >= BUILDING_HOUSE_LARGE_PALACE && type <= BUILDING_HOUSE_LUXURY_PALACE) {
        b.house_size = 4;
    }

    // 设置子类型
    if (building_is_house(type)) {
        b.subtype = { house_level: type - BUILDING_HOUSE_VACANT_LOT };
    } else {
        b.subtype = { house_level: 0 };
    }

    // 设置输入/输出资源
    switch (type) {
        case BUILDING_WHEAT_FARM:
            b.output_resource_id = RESOURCE_WHEAT;
            break;
        case BUILDING_VEGETABLE_FARM:
            b.output_resource_id = RESOURCE_VEGETABLES;
            break;
        case BUILDING_FRUIT_FARM:
            b.output_resource_id = RESOURCE_FRUIT;
            break;
        case BUILDING_OLIVE_FARM:
            b.output_resource_id = RESOURCE_OLIVES;
            break;
        case BUILDING_VINES_FARM:
            b.output_resource_id = RESOURCE_VINES;
            break;
        case BUILDING_PIG_FARM:
            b.output_resource_id = RESOURCE_MEAT;
            break;
        case BUILDING_MARBLE_QUARRY:
            b.output_resource_id = RESOURCE_MARBLE;
            break;
        case BUILDING_IRON_MINE:
            b.output_resource_id = RESOURCE_IRON;
            break;
        case BUILDING_TIMBER_YARD:
            b.output_resource_id = RESOURCE_TIMBER;
            break;
        case BUILDING_CLAY_PIT:
            b.output_resource_id = RESOURCE_CLAY;
            break;
        case BUILDING_WINE_WORKSHOP:
            b.output_resource_id = RESOURCE_WINE;
            b.subtype.workshop_type = WORKSHOP_VINES_TO_WINE;
            break;
        case BUILDING_OIL_WORKSHOP:
            b.output_resource_id = RESOURCE_OIL;
            b.subtype.workshop_type = WORKSHOP_OLIVES_TO_OIL;
            break;
        case BUILDING_WEAPONS_WORKSHOP:
            b.output_resource_id = RESOURCE_WEAPONS;
            b.subtype.workshop_type = WORKSHOP_IRON_TO_WEAPONS;
            break;
        case BUILDING_FURNITURE_WORKSHOP:
            b.output_resource_id = RESOURCE_FURNITURE;
            b.subtype.workshop_type = WORKSHOP_TIMBER_TO_FURNITURE;
            break;
        case BUILDING_POTTERY_WORKSHOP:
            b.output_resource_id = RESOURCE_POTTERY;
            b.subtype.workshop_type = WORKSHOP_CLAY_TO_POTTERY;
            break;
        default:
            b.output_resource_id = RESOURCE_NONE;
            break;
    }

    if (type === BUILDING_GRANARY) {
        b.data.granary = { resource_stored: { [RESOURCE_NONE]: 2400 } };
    }

    b.x = x;
    b.y = y;
    b.grid_offset = map_grid_offset(x, y);
    b.house_figure_generation_delay = map_random_get(b.grid_offset) & 0x7f;
    b.figure_roam_direction = b.house_figure_generation_delay & 6;
    b.fire_proof = props.fire_proof;
    b.is_adjacent_to_water = map_terrain_is_adjacent_to_water(x, y, b.size);

    return b;
}

// 删除建筑
function building_delete(b: building): void {
    building_clear_related_data(b);
    const id = b.id;
    Object.assign(b, new building());
    b.id = id;
}

// 清除建筑相关数据
function building_clear_related_data(b: building): void {
    if (b.storage_id) {
        building_storage_delete(b.storage_id);
        b.storage_id = 0;
    }
    if (b.type === BUILDING_SENATE) {
        city_buildings_remove_senate(b);
    }
    if (b.type === BUILDING_DOCK) {
        city_buildings_remove_dock();
    }
    if (b.type === BUILDING_BARRACKS) {
        city_buildings_remove_barracks(b);
    }
    if (b.type === BUILDING_DISTRIBUTION_CENTER_UNUSED) {
        city_buildings_remove_distribution_center(b);
    }
    if (b.type === BUILDING_FORT) {
        formation_legion_delete_for_fort(b);
    }
    if (b.type === BUILDING_HIPPODROME) {
        city_buildings_remove_hippodrome();
    }
}

// 更新建筑状态
function building_update_state(): void {
    let land_recalc = 0;
    let wall_recalc = 0;
    let road_recalc = 0;
    let aqueduct_recalc = 0;
    for (let i = 1; i < MAX_BUILDINGS; i++) {
        const b = all_buildings[i];
        if (b.state === BUILDING_STATE_CREATED) {
            b.state = BUILDING_STATE_IN_USE;
        }
        if (b.state !== BUILDING_STATE_IN_USE || !b.house_size) {
            if (b.state === BUILDING_STATE_UNDO || b.state === BUILDING_STATE_DELETED_BY_PLAYER) {
                if (b.type === BUILDING_TOWER || b.type === BUILDING_GATEHOUSE) {
                    wall_recalc = 1;
                    road_recalc = 1;
                } else if (b.type === BUILDING_RESERVOIR) {
                    aqueduct_recalc = 1;
                } else if (b.type === BUILDING_GRANARY) {
                    road_recalc = 1;
                }
                map_building_tiles_remove(i, b.x, b.y);
                land_recalc = 1;
                building_delete(b);
            } else if (b.state === BUILDING_STATE_RUBBLE) {
                if (b.house_size) {
                    city_population_remove_home_removed(b.house_population);
                }
                building_delete(b);
            } else if (b.state === BUILDING_STATE_DELETED_BY_GAME) {
                building_delete(b);
            }
        }
    }
    if (wall_recalc) {
        map_tiles_update_all_walls();
    }
    if (aqueduct_recalc) {
        map_tiles_update_all_aqueducts(0);
    }
    if (land_recalc) {
        map_routing_update_land();
    }
    if (road_recalc) {
        map_tiles_update_all_roads();
    }
}

// 更新建筑的宜居性
function building_update_desirability(): void {
    for (let i = 1; i < MAX_BUILDINGS; i++) {
        const b = all_buildings[i];
        if (b.state !== BUILDING_STATE_IN_USE) {
            continue;
        }
        b.desirability = map_desirability_get_max(b.x, b.y, b.size);
        if (b.is_adjacent_to_water) {
            b.desirability += 10;
        }
        switch (map_elevation_at(b.grid_offset)) {
            case 0: break;
            case 1: b.desirability += 10; break;
            case 2: b.desirability += 12; break;
            case 3: b.desirability += 14; break;
            case 4: b.desirability += 16; break;
            default: b.desirability += 18; break;
        }
    }
}

// 判断建筑是否为房屋
function building_is_house(type: building_type): boolean {
    return type >= BUILDING_HOUSE_VACANT_LOT && type <= BUILDING_HOUSE_LUXURY_PALACE;
}

// 判断建筑是否为堡垒
function building_is_fort(type: building_type): boolean {
    return type === BUILDING_FORT_LEGIONARIES ||
        type === BUILDING_FORT_JAVELIN ||
        type === BUILDING_FORT_MOUNTED;
}

// 获取最高的建筑ID
function building_get_highest_id(): number {
    return extra.highest_id_in_use;
}

// 更新最高的建筑ID
function building_update_highest_id(): void {
    extra.highest_id_in_use = 0;
    for (let i = 1; i < MAX_BUILDINGS; i++) {
        if (all_buildings[i].state !== BUILDING_STATE_UNUSED) {
            extra.highest_id_in_use = i;
        }
    }
    if (extra.highest_id_in_use > extra.highest_id_ever) {
        extra.highest_id_ever = extra.highest_id_in_use;
    }
}

// 增加损坏的房屋计数
function building_totals_add_corrupted_house(unfixable: boolean): void {
    extra.incorrect_houses++;
    if (unfixable) {
        extra.unfixable_houses++;
    }
}

// 清除所有建筑
function building_clear_all(): void {
    for (let i = 0; i < MAX_BUILDINGS; i++) {
        all_buildings[i] = new building();
        all_buildings[i].id = i;
    }
    extra.highest_id_in_use = 0;
    extra.highest_id_ever = 0;
    extra.created_sequence = 0;
    extra.incorrect_houses = 0;
    extra.unfixable_houses = 0;
}

// 保存建筑状态
function building_save_state(buf: buffer, highest_id: buffer, highest_id_ever: buffer, sequence: buffer, corrupt_houses: buffer): void {
    for (let i = 0; i < MAX_BUILDINGS; i++) {
        building_state_save_to_buffer(buf, all_buildings[i]);
    }
    buffer_write_i32(highest_id, extra.highest_id_in_use);
    buffer_write_i32(highest_id_ever, extra.highest_id_ever);
    buffer_skip(highest_id_ever, 4);
    buffer_write_i32(sequence, extra.created_sequence);

    buffer_write_i32(corrupt_houses, extra.incorrect_houses);
    buffer_write_i32(corrupt_houses, extra.unfixable_houses);
}

// 加载建筑状态
function building_load_state(buf: buffer, highest_id: buffer, highest_id_ever: buffer, sequence: buffer, corrupt_houses: buffer): void {
    for (let i = 0; i < MAX_BUILDINGS; i++) {
        building_state_load_from_buffer(buf, all_buildings[i]);
        all_buildings[i].id = i;
    }
    extra.highest_id_in_use = buffer_read_i32(highest_id);
    extra.highest_id_ever = buffer_read_i32(highest_id_ever);
    buffer_skip(highest_id_ever, 4);
    extra.created_sequence = buffer_read_i32(sequence);

    extra.incorrect_houses = buffer_read_i32(corrupt_houses);
    extra.unfixable_houses = buffer_read_i32(corrupt_houses);
}