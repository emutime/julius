export const MAX_INVASION_WARNINGS = 101;
import { MAX_INVASIONS } from 'scenario/data';
import { MAX_INVASION_POINTS } from 'scenario/data';
;
import { buffer } from 'core/buffer';
import { buffer_write_u8 } from 'core/buffer';
import { buffer_write_u16 } from 'core/buffer';
import { buffer_write_i16 } from 'core/buffer';
import { buffer_write_i32 } from 'core/buffer';
import { buffer_read_u8 } from 'core/buffer';
import { buffer_read_u16 } from 'core/buffer';
import { buffer_read_i16 } from 'core/buffer';
import { buffer_read_i32 } from 'core/buffer';
import { buffer_skip } from 'core/buffer';
import { building_type } from 'building/type';
import { building } from 'building/building';
import { building_destroy_by_enemy } from 'building/destruction';
import { message_category } from 'city/message';
import { message_advisor } from 'city/message';
import { city_message_type } from 'city/message';
import MESSAGE_LOCAL_UPRISING = city_message_type.MESSAGE_LOCAL_UPRISING;
import MESSAGE_BARBARIAN_ATTACK = city_message_type.MESSAGE_BARBARIAN_ATTACK;
import MESSAGE_CAESAR_ARMY_ATTACK = city_message_type.MESSAGE_CAESAR_ARMY_ATTACK;
import MESSAGE_DISTANT_BATTLE = city_message_type.MESSAGE_DISTANT_BATTLE;
import MESSAGE_ENEMIES_CLOSING = city_message_type.MESSAGE_ENEMIES_CLOSING;
import MESSAGE_ENEMIES_AT_THE_DOOR = city_message_type.MESSAGE_ENEMIES_AT_THE_DOOR;
import MESSAGE_ENEMY_ARMY_ATTACK = city_message_type.MESSAGE_ENEMY_ARMY_ATTACK;
import MESSAGE_LOCAL_UPRISING_MARS = city_message_type.MESSAGE_LOCAL_UPRISING_MARS;
import { city_message_type } from 'city/message';
import { city_message } from 'city/message';
import { city_message_post } from 'city/message';
import { direction_type } from 'core/direction';
import DIR_0_TOP = direction_type.DIR_0_TOP;
import DIR_2_RIGHT = direction_type.DIR_2_RIGHT;
import DIR_4_BOTTOM = direction_type.DIR_4_BOTTOM;
import DIR_6_LEFT = direction_type.DIR_6_LEFT;
import { direction_type } from 'core/direction';
import { calc_adjust_with_percentage } from 'core/calc';
import { random_generate_next } from 'core/random';
import { random_byte } from 'core/random';
import { empire_object } from 'empire/object';
import { empire_object_get_battle_icon } from 'empire/object';
import { empire_object_get_max_invasion_path } from 'empire/object';
import { figure_action } from 'figure/action';
import FIGURE_ACTION_151_ENEMY_INITIAL = figure_action.FIGURE_ACTION_151_ENEMY_INITIAL;
import { figure_type } from 'figure/type';
import FIGURE_ENEMY43_SPEAR = figure_type.FIGURE_ENEMY43_SPEAR;
import FIGURE_ENEMY44_SWORD = figure_type.FIGURE_ENEMY44_SWORD;
import FIGURE_ENEMY45_SWORD = figure_type.FIGURE_ENEMY45_SWORD;
import FIGURE_ENEMY46_CAMEL = figure_type.FIGURE_ENEMY46_CAMEL;
import FIGURE_ENEMY47_ELEPHANT = figure_type.FIGURE_ENEMY47_ELEPHANT;
import FIGURE_ENEMY48_CHARIOT = figure_type.FIGURE_ENEMY48_CHARIOT;
import FIGURE_ENEMY49_FAST_SWORD = figure_type.FIGURE_ENEMY49_FAST_SWORD;
import FIGURE_ENEMY50_SWORD = figure_type.FIGURE_ENEMY50_SWORD;
import FIGURE_ENEMY51_SPEAR = figure_type.FIGURE_ENEMY51_SPEAR;
import FIGURE_ENEMY52_MOUNTED_ARCHER = figure_type.FIGURE_ENEMY52_MOUNTED_ARCHER;
import FIGURE_ENEMY53_AXE = figure_type.FIGURE_ENEMY53_AXE;
import FIGURE_ENEMY_CAESAR_LEGIONARY = figure_type.FIGURE_ENEMY_CAESAR_LEGIONARY;
import { figure_type } from 'figure/type';
import { enemy_type } from 'figure/type';
import ENEMY_0_BARBARIAN = enemy_type.ENEMY_0_BARBARIAN;
import ENEMY_1_NUMIDIAN = enemy_type.ENEMY_1_NUMIDIAN;
import ENEMY_2_GAUL = enemy_type.ENEMY_2_GAUL;
import ENEMY_3_CELT = enemy_type.ENEMY_3_CELT;
import ENEMY_4_GOTH = enemy_type.ENEMY_4_GOTH;
import ENEMY_5_PERGAMUM = enemy_type.ENEMY_5_PERGAMUM;
import ENEMY_6_SELEUCID = enemy_type.ENEMY_6_SELEUCID;
import ENEMY_7_ETRUSCAN = enemy_type.ENEMY_7_ETRUSCAN;
import ENEMY_8_GREEK = enemy_type.ENEMY_8_GREEK;
import ENEMY_9_EGYPTIAN = enemy_type.ENEMY_9_EGYPTIAN;
import ENEMY_10_CARTHAGINIAN = enemy_type.ENEMY_10_CARTHAGINIAN;
import ENEMY_11_CAESAR = enemy_type.ENEMY_11_CAESAR;
import { enemy_type } from 'figure/type';
import { figure } from 'figure/figure';
import { figure_create } from 'figure/figure';
import { formation_attack } from 'figure/formation';
import FORMATION_ATTACK_FOOD_CHAIN = formation_attack.FORMATION_ATTACK_FOOD_CHAIN;
import FORMATION_ATTACK_BEST_BUILDINGS = formation_attack.FORMATION_ATTACK_BEST_BUILDINGS;
import { formation } from 'figure/formation';
import FORMATION_COLUMN = formation.FORMATION_COLUMN;
import FORMATION_ENEMY_MOB = formation.FORMATION_ENEMY_MOB;
import FORMATION_ENEMY_DOUBLE_LINE = formation.FORMATION_ENEMY_DOUBLE_LINE;
import FORMATION_ENEMY_WIDE_COLUMN = formation.FORMATION_ENEMY_WIDE_COLUMN;
import { formation_state } from 'figure/formation';
import { formation } from 'figure/formation';
import { formation_create_enemy } from 'figure/formation';
import { figure_name_get } from 'figure/name';
import { difficulty_adjust_enemies } from 'game/difficulty';
import { game_time_year } from 'game/time';
import { game_time_month } from 'game/time';
import { GRID } from 'map/grid';
import GRID_SIZE = GRID.GRID_SIZE;
import { map_grid_offset } from 'map/grid';
import { terrain } from 'map/terrain';
import TERRAIN_TREE = terrain.TERRAIN_TREE;
import TERRAIN_ROCK = terrain.TERRAIN_ROCK;
import TERRAIN_WATER = terrain.TERRAIN_WATER;
import TERRAIN_BUILDING = terrain.TERRAIN_BUILDING;
import TERRAIN_ROAD = terrain.TERRAIN_ROAD;
import TERRAIN_AQUEDUCT = terrain.TERRAIN_AQUEDUCT;
import TERRAIN_ELEVATION = terrain.TERRAIN_ELEVATION;
import TERRAIN_WALL = terrain.TERRAIN_WALL;
import TERRAIN_GATEHOUSE = terrain.TERRAIN_GATEHOUSE;
import { map_terrain_is } from 'map/terrain';
import { map_point } from 'map/point';
import { invasion_type } from 'scenario/types';
import INVASION_TYPE_LOCAL_UPRISING = invasion_type.INVASION_TYPE_LOCAL_UPRISING;
import INVASION_TYPE_ENEMY_ARMY = invasion_type.INVASION_TYPE_ENEMY_ARMY;
import INVASION_TYPE_CAESAR = invasion_type.INVASION_TYPE_CAESAR;
import INVASION_TYPE_DISTANT_BATTLE = invasion_type.INVASION_TYPE_DISTANT_BATTLE;
import { request_t } from 'scenario/data';
import { invasion_t } from 'scenario/data';
import { price_change_t } from 'scenario/data';
import { demand_change_t } from 'scenario/data';
export let scenario: scenario_t = new scenario_t();
import { scenario_map_entry } from 'scenario/map';
import { scenario_map_exit } from 'scenario/map';
import { scenario_climate } from 'scenario/property';
import { scenario_campaign_mission } from 'scenario/property';
import { _invalid_parameter_noinfo } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt';
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
let ENEMY_ID_TO_ENEMY_TYPE: number[] = new Array(20).fill({
    ENEMY_0_BARBARIAN,
    ENEMY_7_ETRUSCAN,
    ENEMY_7_ETRUSCAN,
    ENEMY_10_CARTHAGINIAN,
    ENEMY_8_GREEK,
    ENEMY_8_GREEK,
    ENEMY_9_EGYPTIAN,
    ENEMY_5_PERGAMUM,
    ENEMY_6_SELEUCID,
    ENEMY_3_CELT,
    ENEMY_3_CELT,
    ENEMY_3_CELT,
    ENEMY_2_GAUL,
    ENEMY_2_GAUL,
    ENEMY_4_GOTH,
    ENEMY_4_GOTH,
    ENEMY_4_GOTH,
    ENEMY_6_SELEUCID,
    ENEMY_1_NUMIDIAN,
    ENEMY_6_SELEUCID
});
let LOCAL_UPRISING_NUM_ENEMIES: number[] = new Array(20).fill({
    0, 0, 0, 0, 0, 3, 3, 3, 0, 6, 6, 6, 6, 6, 9, 9, 9, 9, 9, 9
});
export class unnamed50_14 {
    public pct_type1: number = 0;
    public pct_type2: number = 0;
    public pct_type3: number = 0;
    public figure_types: number[] = new Array(3).fill(0);
    public formation_layout: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.pct_type1 = args[0]);
        args.length >= 2 && (this.pct_type2 = args[1]);
        args.length >= 3 && (this.pct_type3 = args[2]);
        args.length >= 4 && (this.figure_types = args[3]);
        args.length >= 5 && (this.formation_layout = args[4]);
    }
}
let ENEMY_PROPERTIES: struct (unnamed struct at./ src / scenario / invasion.c: 50: 14)[] = new Array(3).fill({
    { 100, 0, 0, { FIGURE_ENEMY49_FAST_SWORD, 0, 0}, FORMATION_ENEMY_MOB}, // barbarian
    { 40, 60, 0, { FIGURE_ENEMY49_FAST_SWORD, FIGURE_ENEMY51_SPEAR, 0}, FORMATION_ENEMY_MOB}, // numidian
    { 50, 50, 0, { FIGURE_ENEMY50_SWORD, FIGURE_ENEMY53_AXE, 0}, FORMATION_ENEMY_MOB}, // gaul
    { 80, 20, 0, { FIGURE_ENEMY50_SWORD, FIGURE_ENEMY48_CHARIOT, 0}, FORMATION_ENEMY_MOB}, // celt
    { 50, 50, 0, { FIGURE_ENEMY49_FAST_SWORD, FIGURE_ENEMY52_MOUNTED_ARCHER, 0}, FORMATION_ENEMY_MOB}, // goth
    { 30, 70, 0, { FIGURE_ENEMY44_SWORD, FIGURE_ENEMY43_SPEAR, 0}, FORMATION_COLUMN}, // pergamum
    { 50, 50, 0, { FIGURE_ENEMY44_SWORD, FIGURE_ENEMY43_SPEAR, 0}, FORMATION_ENEMY_DOUBLE_LINE}, // seleucid
    { 50, 50, 0, { FIGURE_ENEMY45_SWORD, FIGURE_ENEMY43_SPEAR, 0}, FORMATION_ENEMY_DOUBLE_LINE}, // etruscan
    { 80, 20, 0, { FIGURE_ENEMY45_SWORD, FIGURE_ENEMY43_SPEAR, 0}, FORMATION_ENEMY_DOUBLE_LINE}, // greek
    { 80, 20, 0, { FIGURE_ENEMY44_SWORD, FIGURE_ENEMY46_CAMEL, 0}, FORMATION_ENEMY_WIDE_COLUMN}, // egyptian
    { 90, 10, 0, { FIGURE_ENEMY45_SWORD, FIGURE_ENEMY47_ELEPHANT, 0}, FORMATION_ENEMY_WIDE_COLUMN}, // carthaginian
    { 100, 0, 0, { FIGURE_ENEMY_CAESAR_LEGIONARY, 0, 0}, FORMATION_COLUMN} // caesar
});
export class invasion_warning {
    public in_use: number = 0;
    public handled: number = 0;
    public invasion_path_id: number = 0;
    public warning_years: number = 0;
    public x: number = 0;
    public y: number = 0;
    public image_id: number = 0;
    public empire_object_id: number = 0;
    public year_notified: number = 0;
    public month_notified: number = 0;
    public months_to_go: number = 0;
    public invasion_id: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.in_use = args[0]);
        args.length >= 2 && (this.handled = args[1]);
        args.length >= 3 && (this.invasion_path_id = args[2]);
        args.length >= 4 && (this.warning_years = args[3]);
        args.length >= 5 && (this.x = args[4]);
        args.length >= 6 && (this.y = args[5]);
        args.length >= 7 && (this.image_id = args[6]);
        args.length >= 8 && (this.empire_object_id = args[7]);
        args.length >= 9 && (this.year_notified = args[8]);
        args.length >= 10 && (this.month_notified = args[9]);
        args.length >= 11 && (this.months_to_go = args[10]);
        args.length >= 12 && (this.invasion_id = args[11]);
    }
}
export class unnamed86_8 {
    public last_internal_invasion_id: number = 0;
    public warnings: invasion_warning[] = new Array(MAX_INVASION_WARNINGS).fill(null);
    public constructor(...args: any[]) {
        args.length >= 1 && (this.last_internal_invasion_id = args[0]);
        args.length >= 2 && (this.warnings = args[1]);
    }
}
let data: unnamed86_8 = new unnamed86_8();
export function scenario_invasion_clear() {
    memset(data.warnings, 0);
}
export function scenario_invasion_init() {
    scenario_invasion_clear();
    let path_current: number = 1;
    let path_max: number = empire_object_get_max_invasion_path();
    if (path_max == 0) {
        return;
    }
    let warning: invasion_warning = data.warnings[1];
    for (let i: number = 0; i < MAX_INVASIONS; i++) {
        random_generate_next();
        if (!scenario.invasions[i].type) {
            continue
        }
        scenario.invasions[i].month = 2 + (random_byte() & 7);
        if (scenario.invasions[i].type == INVASION_TYPE_LOCAL_UPRISING ||
            scenario.invasions[i].type == INVASION_TYPE_DISTANT_BATTLE) {
            continue
        }
        for (let year: number = 1; year < 8; year++) {
            let obj: empire_object = empire_object_get_battle_icon(path_current, year);
            if (!obj) {
                continue
            }
            warning.in_use = 1;
            warning.invasion_path_id = obj.invasion_path_id;
            warning.warning_years = obj.invasion_years;
            warning.x = obj.x;
            warning.y = obj.y;
            warning.image_id = obj.image_id;
            warning.invasion_id = i;
            warning.empire_object_id = obj.id;
            warning.month_notified = 0;
            warning.year_notified = 0;
            warning.months_to_go = 12 * scenario.invasions[i].year;
            warning.months_to_go += scenario.invasions[i].month
            warning.months_to_go -= 12 * year
            ++warning;
        }
        path_current++;
        if (path_current > path_max) {
            path_current = 1;
        }
    }
}
export function scenario_invasion_exists_upcoming() {
    for (let i: number = 0; i < MAX_INVASION_WARNINGS; i++) {
        if (data.warnings[i].in_use && data.warnings[i].handled) {
            return 1;
        }
    }
    return 0;
}
export function scenario_invasion_foreach_warning(callback: void () {
    for (let i: number = 0; i < MAX_INVASION_WARNINGS; i++) {
        if (data.warnings[i].in_use && data.warnings[i].handled) {
            callback(data.warnings[i].x, data.warnings[i].y, data.warnings[i].image_id);
        }
    }
}
export function scenario_invasion_count() {
    let num_invasions: number = 0;
    for (let i: number = 0; i < MAX_INVASIONS; i++) {
        if (scenario.invasions[i].type) {
            num_invasions++;
        }
    }
    return num_invasions;
}
function determine_formations(num_soldiers: number, num_formations: number, soldiers_per_formation: number) {
    if (num_soldiers > 0) {
        if (num_soldiers <= 16) {
            * num_formations = 1;
            soldiers_per_formation[0] = num_soldiers;
        } else if (num_soldiers <= 32) {
            * num_formations = 2;
            soldiers_per_formation[1] = num_soldiers / 2;
            soldiers_per_formation[0] = num_soldiers - num_soldiers / 2;
        } else {
            * num_formations = 3;
            soldiers_per_formation[2] = num_soldiers / 3;
            soldiers_per_formation[1] = num_soldiers / 3;
            soldiers_per_formation[0] = num_soldiers - 2 * (num_soldiers / 3);
        }
    }
}
function start_invasion(enemy_type: number, amount: number, invasion_point: number, attack_type: number, invasion_id: number) {
    if (amount <= 0) {
        return -1;
    }
    let formations_per_type: number[];
    let soldiers_per_formation: number[];
    let x: number
    let y: number;
    let orientation: number;
    amount = difficulty_adjust_enemies(amount);
    if (amount >= 150) {
        amount = 150;
    }
    data.last_internal_invasion_id++;
    if (data.last_internal_invasion_id > 32000) {
        data.last_internal_invasion_id = 1;
    }
    let num_type1: number = calc_adjust_with_percentage(amount, ENEMY_PROPERTIES[enemy_type].pct_type1);
    let num_type2: number = calc_adjust_with_percentage(amount, ENEMY_PROPERTIES[enemy_type].pct_type2);
    let num_type3: number = calc_adjust_with_percentage(amount, ENEMY_PROPERTIES[enemy_type].pct_type3);
    num_type1 += amount - (num_type1 + num_type2 + num_type3)
    for (let t: number = 0; t < 3; t++) {
        formations_per_type[t] = 0;
        for (let f: number = 0; f < 4; f++) {
            soldiers_per_formation[t][f] = 0;
        }
    }
    determine_formations(num_type1, formations_per_type[0], soldiers_per_formation[0]);
    determine_formations(num_type2, formations_per_type[1], soldiers_per_formation[1]);
    determine_formations(num_type3, formations_per_type[2], soldiers_per_formation[2]);
    if (enemy_type == ENEMY_11_CAESAR) {
        let entry_point: map_point = scenario_map_entry();
        x = entry_point.x;
        y = entry_point.y;
    } else {
        let num_points: number = 0;
        for (let i: number = 0; i < MAX_INVASION_POINTS; i++) {
            if (scenario.invasion_points[i].x != -1) {
                num_points++;
            }
        }
        if (invasion_point == MAX_INVASION_POINTS) {
            if (num_points <= 2) {
                invasion_point = random_byte() & 1;
            } else if (num_points <= 4) {
                invasion_point = random_byte() & 3;
            } else {
                invasion_point = random_byte() & 7;
            }
        }
        if (num_points > 0) {
            while (scenario.invasion_points[invasion_point].x == -1) {
                invasion_point++;
                if (invasion_point >= MAX_INVASION_POINTS) {
                    invasion_point = 0;
                }
            }
        }
        x = scenario.invasion_points[invasion_point].x;
        y = scenario.invasion_points[invasion_point].y;
    }
    if (x == -1 || y == -1) {
        let exit_point: map_point = scenario_map_exit();
        x = exit_point.x;
        y = exit_point.y;
    }
    if (y == 0) {
        orientation = DIR_4_BOTTOM;
    } else if (y >= scenario.map.height - 1) {
        orientation = DIR_0_TOP;
    } else if (x == 0) {
        orientation = DIR_2_RIGHT;
    } else if (x >= scenario.map.width - 1) {
        orientation = DIR_6_LEFT;
    } else {
        orientation = DIR_4_BOTTOM;
    }
    let grid_offset: number = map_grid_offset(x, y);
    if (map_terrain_is(grid_offset, TERRAIN_ELEVATION | TERRAIN_ROCK | TERRAIN_TREE)) {
        return -1;
    }
    if (map_terrain_is(grid_offset, TERRAIN_WATER)) {
        if (!map_terrain_is(grid_offset, TERRAIN_ROAD)) {
            return -1;
        }
    } else if (map_terrain_is(grid_offset, TERRAIN_BUILDING | TERRAIN_AQUEDUCT | TERRAIN_GATEHOUSE | TERRAIN_WALL)) {
        building_destroy_by_enemy(x, y, grid_offset);
    }
    let seq: number = 0;
    for (let type: number = 0; type < 3; type++) {
        if (formations_per_type[type] <= 0) {
            continue
        }
        let figure_type: number = ENEMY_PROPERTIES[enemy_type].figure_types[type];
        for (let i: number = 0; i < formations_per_type[type]; i++) {
            let formation_id: number = formation_create_enemy(
                figure_type, x, y, ENEMY_PROPERTIES[enemy_type].formation_layout, orientation,
                enemy_type, attack_type, invasion_id, data.last_internal_invasion_id
            );
            if (formation_id <= 0) {
                continue
            }
            for (let fig: number = 0; fig < soldiers_per_formation[type][i]; fig++) {
                let f: figure = figure_create(figure_type, x, y, orientation);
                f.faction_id = 0;
                f.is_friendly = 0;
                f.action_state = FIGURE_ACTION_151_ENEMY_INITIAL;
                f.wait_ticks = 200 * seq + 10 * fig + 10;
                f.formation_id = formation_id;
                f.name = figure_name_get(figure_type, enemy_type);
                f.is_ghost = 1;
            }
            seq++;
        }
    }
    return grid_offset;
}
export function scenario_invasion_process() {
    let enemy_id: number = scenario.enemy_id;
    for (let i: number = 0; i < MAX_INVASION_WARNINGS; i++) {
        if (!data.warnings[i].in_use) {
            continue
        }
        let warning: invasion_warning = data.warnings[i];
        warning.months_to_go--;
        if (warning.months_to_go <= 0) {
            if (warning.handled != 1) {
                warning.handled = 1;
                warning.year_notified = game_time_year();
                warning.month_notified = game_time_month();
                if (warning.warning_years > 2) {
                    city_message_post(0, MESSAGE_DISTANT_BATTLE, 0, 0);
                } else if (warning.warning_years > 1) {
                    city_message_post(0, MESSAGE_ENEMIES_CLOSING, 0, 0);
                } else {
                    city_message_post(0, MESSAGE_ENEMIES_AT_THE_DOOR, 0, 0);
                }
            }
        }
        if (game_time_year() >= scenario.start_year + scenario.invasions[warning.invasion_id].year &&
            game_time_month() >= scenario.invasions[warning.invasion_id].month) {
            warning.in_use = 0;
            if (warning.warning_years > 1) {
                continue
            }
            if (scenario.invasions[warning.invasion_id].type == INVASION_TYPE_ENEMY_ARMY) {
                let grid_offset: number = start_invasion(
                    ENEMY_ID_TO_ENEMY_TYPE[enemy_id],
                    scenario.invasions[warning.invasion_id].amount,
                    scenario.invasions[warning.invasion_id].from,
                    scenario.invasions[warning.invasion_id].attack_type,
                    warning.invasion_id);
                if (grid_offset > 0) {
                    if (ENEMY_ID_TO_ENEMY_TYPE[enemy_id] > 4) {
                        city_message_post(1, MESSAGE_ENEMY_ARMY_ATTACK, data.last_internal_invasion_id, grid_offset);
                    } else {
                        city_message_post(1, MESSAGE_BARBARIAN_ATTACK, data.last_internal_invasion_id, grid_offset);
                    }
                }
            }
            if (scenario.invasions[warning.invasion_id].type == INVASION_TYPE_CAESAR) {
                let grid_offset: number = start_invasion(
                    ENEMY_11_CAESAR,
                    scenario.invasions[warning.invasion_id].amount,
                    scenario.invasions[warning.invasion_id].from,
                    scenario.invasions[warning.invasion_id].attack_type,
                    warning.invasion_id);
                if (grid_offset > 0) {
                    city_message_post(1, MESSAGE_CAESAR_ARMY_ATTACK, data.last_internal_invasion_id, grid_offset);
                }
            }
        }
    }
    for (let i: number = 0; i < MAX_INVASIONS; i++) {
        if (scenario.invasions[i].type == INVASION_TYPE_LOCAL_UPRISING) {
            if (game_time_year() == scenario.start_year + scenario.invasions[i].year &&
                game_time_month() == scenario.invasions[i].month) {
                let grid_offset: number = start_invasion(
                    ENEMY_0_BARBARIAN,
                    scenario.invasions[i].amount,
                    scenario.invasions[i].from,
                    scenario.invasions[i].attack_type,
                    i);
                if (grid_offset > 0) {
                    city_message_post(1, MESSAGE_LOCAL_UPRISING, data.last_internal_invasion_id, grid_offset);
                }
            }
        }
    }
}
export function scenario_invasion_start_from_mars() {
    let mission: number = scenario_campaign_mission();
    if (mission < 0 || mission > 19) {
        return 0;
    }
    let amount: number = LOCAL_UPRISING_NUM_ENEMIES[mission];
    if (amount <= 0) {
        return 0;
    }
    let grid_offset: number = start_invasion(ENEMY_0_BARBARIAN, amount, 8, FORMATION_ATTACK_FOOD_CHAIN, 23);
    if (grid_offset) {
        city_message_post(1, MESSAGE_LOCAL_UPRISING_MARS, data.last_internal_invasion_id, grid_offset);
    }
    return 1;
}
export function scenario_invasion_start_from_caesar(size: number) {
    let grid_offset: number = start_invasion(ENEMY_11_CAESAR, size, 0, FORMATION_ATTACK_BEST_BUILDINGS, 24);
    if (grid_offset > 0) {
        city_message_post(1, MESSAGE_CAESAR_ARMY_ATTACK, data.last_internal_invasion_id, grid_offset);
        return 1;
    }
    return 0;
}
export function scenario_invasion_start_from_cheat() {
    let enemy_id: number = scenario.enemy_id;
    let grid_offset: number = start_invasion(ENEMY_ID_TO_ENEMY_TYPE[enemy_id], 150, 8, FORMATION_ATTACK_FOOD_CHAIN, 23);
    if (grid_offset) {
        if (ENEMY_ID_TO_ENEMY_TYPE[enemy_id] > 4) {
            city_message_post(1, MESSAGE_ENEMY_ARMY_ATTACK, data.last_internal_invasion_id, grid_offset);
        } else {
            city_message_post(1, MESSAGE_BARBARIAN_ATTACK, data.last_internal_invasion_id, grid_offset);
        }
    }
}
export function scenario_invasion_save_state(invasion_id: buffer, warnings: buffer) {
    buffer_write_u16(invasion_id, data.last_internal_invasion_id);
    for (let i: number = 0; i < MAX_INVASION_WARNINGS; i++) {
        let w: invasion_warning = data.warnings[i];
        buffer_write_u8(warnings, w.in_use);
        buffer_write_u8(warnings, w.handled);
        buffer_write_u8(warnings, w.invasion_path_id);
        buffer_write_u8(warnings, w.warning_years);
        buffer_write_i16(warnings, w.x);
        buffer_write_i16(warnings, w.y);
        buffer_write_i16(warnings, w.image_id);
        buffer_write_i16(warnings, w.empire_object_id);
        buffer_write_i16(warnings, w.month_notified);
        buffer_write_i16(warnings, w.year_notified);
        buffer_write_i32(warnings, w.months_to_go);
        buffer_write_u8(warnings, w.invasion_id);
        for (let x: number = 0; x < 11; x++) {
            buffer_write_u8(warnings, 0);
        }
    }
}
export function scenario_invasion_load_state(invasion_id: buffer, warnings: buffer) {
    data.last_internal_invasion_id = buffer_read_u16(invasion_id);
    for (let i: number = 0; i < MAX_INVASION_WARNINGS; i++) {
        let w: invasion_warning = data.warnings[i];
        w.in_use = buffer_read_u8(warnings);
        w.handled = buffer_read_u8(warnings);
        w.invasion_path_id = buffer_read_u8(warnings);
        w.warning_years = buffer_read_u8(warnings);
        w.x = buffer_read_i16(warnings);
        w.y = buffer_read_i16(warnings);
        w.image_id = buffer_read_i16(warnings);
        w.empire_object_id = buffer_read_i16(warnings);
        w.month_notified = buffer_read_i16(warnings);
        w.year_notified = buffer_read_i16(warnings);
        w.months_to_go = buffer_read_i32(warnings);
        w.invasion_id = buffer_read_u8(warnings);
        buffer_skip(warnings, 11);
    }
}
