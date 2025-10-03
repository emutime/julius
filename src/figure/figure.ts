export const MAX_FIGURES = 1000;
;
import { building, building_get } from 'building/building';
import { city_emperor_mark_soldier_killed } from 'city/emperor';
import { buffer, buffer_read_i16, buffer_read_i32, buffer_read_i8, buffer_read_u16, buffer_read_u8, buffer_write_i16, buffer_write_i32, buffer_write_i8, buffer_write_u16, buffer_write_u8 } from 'core/buffer';
import { direction_type } from 'core/direction';
import { random_byte } from 'core/random';
import { empire_city_remove_trader } from 'empire/city';
import { figure_action } from 'figure/action';
import { figure_name_get } from 'figure/name';
import { figure_route_remove } from 'figure/route';
import { trader_create } from 'figure/trader';
import { figure_state, figure_type } from 'figure/type';
import { resource_type } from 'game/resource';
import { map_figure_add, map_figure_delete } from 'map/figure';
import { GRID, map_grid_offset } from 'map/grid';
import { memset } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vcruntime_string';
import FIGURE_ACTION_149_CORPSE = figure_action.FIGURE_ACTION_149_CORPSE;
import FIGURE_LABOR_SEEKER = figure_type.FIGURE_LABOR_SEEKER;
import FIGURE_EXPLOSION = figure_type.FIGURE_EXPLOSION;
import FIGURE_FORT_JAVELIN = figure_type.FIGURE_FORT_JAVELIN;
import FIGURE_FORT_LEGIONARY = figure_type.FIGURE_FORT_LEGIONARY;
import FIGURE_FORT_STANDARD = figure_type.FIGURE_FORT_STANDARD;
import FIGURE_TRADE_CARAVAN = figure_type.FIGURE_TRADE_CARAVAN;
import FIGURE_TRADE_SHIP = figure_type.FIGURE_TRADE_SHIP;
import FIGURE_DOCKER = figure_type.FIGURE_DOCKER;
import FIGURE_MARKET_BUYER = figure_type.FIGURE_MARKET_BUYER;
import FIGURE_PATRICIAN = figure_type.FIGURE_PATRICIAN;
import FIGURE_ENEMY43_SPEAR = figure_type.FIGURE_ENEMY43_SPEAR;
import FIGURE_ENEMY_CAESAR_LEGIONARY = figure_type.FIGURE_ENEMY_CAESAR_LEGIONARY;
import FIGURE_ARROW = figure_type.FIGURE_ARROW;
import FIGURE_JAVELIN = figure_type.FIGURE_JAVELIN;
import FIGURE_BOLT = figure_type.FIGURE_BOLT;
import FIGURE_BALLISTA = figure_type.FIGURE_BALLISTA;
import FIGURE_FISH_GULLS = figure_type.FIGURE_FISH_GULLS;
import FIGURE_DELIVERY_BOY = figure_type.FIGURE_DELIVERY_BOY;
import FIGURE_SHEEP = figure_type.FIGURE_SHEEP;
import FIGURE_WOLF = figure_type.FIGURE_WOLF;
import FIGURE_ZEBRA = figure_type.FIGURE_ZEBRA;
import FIGURE_SPEAR = figure_type.FIGURE_SPEAR;
import FIGURE_STATE_ALIVE = figure_state.FIGURE_STATE_ALIVE;
class formation_position_x {
    public soldier: number = 0;
    public enemy: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.soldier = args[0]);
        args.length >= 2 && (this.enemy = args[1]);
    }
}
class formation_position_y {
    public soldier: number = 0;
    public enemy: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.soldier = args[0]);
        args.length >= 2 && (this.enemy = args[1]);
    }
}
export class figure {
    public id: number = 0;
    public image_id: number = 0;
    public cart_image_id: number = 0;
    public image_offset: number = 0;
    public is_enemy_image: number = 0;
    public alternative_location_index: number = 0;
    public flotsam_visible: number = 0;
    public next_figure_id_on_same_tile: number = 0;
    public type: number = 0;
    public resource_id: number = 0;
    public use_cross_country: number = 0;
    public is_friendly: number = 0;
    public state: number = 0;
    public faction_id: number = 0;
    public action_state_before_attack: number = 0;
    public direction: number = 0;
    public previous_tile_direction: number = 0;
    public attack_direction: number = 0;
    public x: number = 0;
    public y: number = 0;
    public previous_tile_x: number = 0;
    public previous_tile_y: number = 0;
    public missile_damage: number = 0;
    public damage: number = 0;
    public grid_offset: number = 0;
    public destination_x: number = 0;
    public destination_y: number = 0;
    public destination_grid_offset: number = 0;
    public source_x: number = 0;
    public source_y: number = 0;
    public formation_position_x: formation_position_x = null;
    public formation_position_y: formation_position_y = null;
    public __unused_24: number = 0;
    public wait_ticks: number = 0;
    public action_state: number = 0;
    public progress_on_tile: number = 0;
    public routing_path_id: number = 0;
    public routing_path_current_tile: number = 0;
    public routing_path_length: number = 0;
    public in_building_wait_ticks: number = 0;
    public is_on_road: number = 0;
    public max_roam_length: number = 0;
    public roam_length: number = 0;
    public roam_choose_destination: number = 0;
    public roam_random_counter: number = 0;
    public roam_turn_direction: number = 0;
    public roam_ticks_until_next_turn: number = 0;
    public cross_country_x: number = 0;
    public cross_country_y: number = 0;
    public cc_destination_x: number = 0;
    public cc_destination_y: number = 0;
    public cc_delta_x: number = 0;
    public cc_delta_y: number = 0;
    public cc_delta_xy: number = 0;
    public cc_direction: number = 0;
    public speed_multiplier: number = 0;
    public building_id: number = 0;
    public immigrant_building_id: number = 0;
    public destination_building_id: number = 0;
    public formation_id: number = 0;
    public index_in_formation: number = 0;
    public formation_at_rest: number = 0;
    public migrant_num_people: number = 0;
    public is_ghost: number = 0;
    public min_max_seen: number = 0;
    public __unused_57: number = 0;
    public leading_figure_id: number = 0;
    public attack_image_offset: number = 0;
    public wait_ticks_missile: number = 0;
    public x_offset_cart: number = 0;
    public y_offset_cart: number = 0;
    public empire_city_id: number = 0;
    public trader_amount_bought: number = 0;
    public name: number = 0;
    public terrain_usage: number = 0;
    public loads_sold_or_carrying: number = 0;
    public is_boat: number = 0;
    public height_adjusted_ticks: number = 0;
    public current_height: number = 0;
    public target_height: number = 0;
    public collecting_item_id: number = 0;
    public trade_ship_failed_dock_attempts: number = 0;
    public phrase_sequence_exact: number = 0;
    public phrase_id: number = 0;
    public phrase_sequence_city: number = 0;
    public trader_id: number = 0;
    public wait_ticks_next_target: number = 0;
    public __unused_6f: number = 0;
    public target_figure_id: number = 0;
    public targeted_by_figure_id: number = 0;
    public created_sequence: number = 0;
    public target_figure_created_sequence: number = 0;
    public figures_on_same_tile_index: number = 0;
    public num_attackers: number = 0;
    public attacker_id1: number = 0;
    public attacker_id2: number = 0;
    public opponent_id: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.id = args[0]);
        args.length >= 2 && (this.image_id = args[1]);
        args.length >= 3 && (this.cart_image_id = args[2]);
        args.length >= 4 && (this.image_offset = args[3]);
        args.length >= 5 && (this.is_enemy_image = args[4]);
        args.length >= 6 && (this.alternative_location_index = args[5]);
        args.length >= 7 && (this.flotsam_visible = args[6]);
        args.length >= 8 && (this.next_figure_id_on_same_tile = args[7]);
        args.length >= 9 && (this.type = args[8]);
        args.length >= 10 && (this.resource_id = args[9]);
        args.length >= 11 && (this.use_cross_country = args[10]);
        args.length >= 12 && (this.is_friendly = args[11]);
        args.length >= 13 && (this.state = args[12]);
        args.length >= 14 && (this.faction_id = args[13]);
        args.length >= 15 && (this.action_state_before_attack = args[14]);
        args.length >= 16 && (this.direction = args[15]);
        args.length >= 17 && (this.previous_tile_direction = args[16]);
        args.length >= 18 && (this.attack_direction = args[17]);
        args.length >= 19 && (this.x = args[18]);
        args.length >= 20 && (this.y = args[19]);
        args.length >= 21 && (this.previous_tile_x = args[20]);
        args.length >= 22 && (this.previous_tile_y = args[21]);
        args.length >= 23 && (this.missile_damage = args[22]);
        args.length >= 24 && (this.damage = args[23]);
        args.length >= 25 && (this.grid_offset = args[24]);
        args.length >= 26 && (this.destination_x = args[25]);
        args.length >= 27 && (this.destination_y = args[26]);
        args.length >= 28 && (this.destination_grid_offset = args[27]);
        args.length >= 29 && (this.source_x = args[28]);
        args.length >= 30 && (this.source_y = args[29]);
        args.length >= 31 && (this.formation_position_x = args[30]);
        args.length >= 32 && (this.formation_position_y = args[31]);
        args.length >= 33 && (this.__unused_24 = args[32]);
        args.length >= 34 && (this.wait_ticks = args[33]);
        args.length >= 35 && (this.action_state = args[34]);
        args.length >= 36 && (this.progress_on_tile = args[35]);
        args.length >= 37 && (this.routing_path_id = args[36]);
        args.length >= 38 && (this.routing_path_current_tile = args[37]);
        args.length >= 39 && (this.routing_path_length = args[38]);
        args.length >= 40 && (this.in_building_wait_ticks = args[39]);
        args.length >= 41 && (this.is_on_road = args[40]);
        args.length >= 42 && (this.max_roam_length = args[41]);
        args.length >= 43 && (this.roam_length = args[42]);
        args.length >= 44 && (this.roam_choose_destination = args[43]);
        args.length >= 45 && (this.roam_random_counter = args[44]);
        args.length >= 46 && (this.roam_turn_direction = args[45]);
        args.length >= 47 && (this.roam_ticks_until_next_turn = args[46]);
        args.length >= 48 && (this.cross_country_x = args[47]);
        args.length >= 49 && (this.cross_country_y = args[48]);
        args.length >= 50 && (this.cc_destination_x = args[49]);
        args.length >= 51 && (this.cc_destination_y = args[50]);
        args.length >= 52 && (this.cc_delta_x = args[51]);
        args.length >= 53 && (this.cc_delta_y = args[52]);
        args.length >= 54 && (this.cc_delta_xy = args[53]);
        args.length >= 55 && (this.cc_direction = args[54]);
        args.length >= 56 && (this.speed_multiplier = args[55]);
        args.length >= 57 && (this.building_id = args[56]);
        args.length >= 58 && (this.immigrant_building_id = args[57]);
        args.length >= 59 && (this.destination_building_id = args[58]);
        args.length >= 60 && (this.formation_id = args[59]);
        args.length >= 61 && (this.index_in_formation = args[60]);
        args.length >= 62 && (this.formation_at_rest = args[61]);
        args.length >= 63 && (this.migrant_num_people = args[62]);
        args.length >= 64 && (this.is_ghost = args[63]);
        args.length >= 65 && (this.min_max_seen = args[64]);
        args.length >= 66 && (this.__unused_57 = args[65]);
        args.length >= 67 && (this.leading_figure_id = args[66]);
        args.length >= 68 && (this.attack_image_offset = args[67]);
        args.length >= 69 && (this.wait_ticks_missile = args[68]);
        args.length >= 70 && (this.x_offset_cart = args[69]);
        args.length >= 71 && (this.y_offset_cart = args[70]);
        args.length >= 72 && (this.empire_city_id = args[71]);
        args.length >= 73 && (this.trader_amount_bought = args[72]);
        args.length >= 74 && (this.name = args[73]);
        args.length >= 75 && (this.terrain_usage = args[74]);
        args.length >= 76 && (this.loads_sold_or_carrying = args[75]);
        args.length >= 77 && (this.is_boat = args[76]);
        args.length >= 78 && (this.height_adjusted_ticks = args[77]);
        args.length >= 79 && (this.current_height = args[78]);
        args.length >= 80 && (this.target_height = args[79]);
        args.length >= 81 && (this.collecting_item_id = args[80]);
        args.length >= 82 && (this.trade_ship_failed_dock_attempts = args[81]);
        args.length >= 83 && (this.phrase_sequence_exact = args[82]);
        args.length >= 84 && (this.phrase_id = args[83]);
        args.length >= 85 && (this.phrase_sequence_city = args[84]);
        args.length >= 86 && (this.trader_id = args[85]);
        args.length >= 87 && (this.wait_ticks_next_target = args[86]);
        args.length >= 88 && (this.__unused_6f = args[87]);
        args.length >= 89 && (this.target_figure_id = args[88]);
        args.length >= 90 && (this.targeted_by_figure_id = args[89]);
        args.length >= 91 && (this.created_sequence = args[90]);
        args.length >= 92 && (this.target_figure_created_sequence = args[91]);
        args.length >= 93 && (this.figures_on_same_tile_index = args[92]);
        args.length >= 94 && (this.num_attackers = args[93]);
        args.length >= 95 && (this.attacker_id1 = args[94]);
        args.length >= 96 && (this.attacker_id2 = args[95]);
        args.length >= 97 && (this.opponent_id = args[96]);
    }
}
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
import GRID_SIZE = GRID.GRID_SIZE;
export class unnamed15_8 {
    public created_sequence: number = 0;
    public figures: figure[] = new Array(MAX_FIGURES).fill(null);
    public constructor(...args: any[]) {
        args.length >= 1 && (this.created_sequence = args[0]);
        args.length >= 2 && (this.figures = args[1]);
    }
}
let data: unnamed15_8 = new unnamed15_8(0);
export function figure_get(id: number) {
    return data.figures[id];
}
export function figure_create(type: figure_type, x: number, y: number, dir: direction_type) {
    let id: number = 0;
    for (let i: number = 1; i < MAX_FIGURES; i++) {
        if (!data.figures[i].state) {
            id = i;
            break
        }
    }
    if (!id) {
        return data.figures[0];
    }
    let f: figure = data.figures[id];
    f.state = FIGURE_STATE_ALIVE;
    f.faction_id = 1;
    f.type = type;
    f.use_cross_country = 0;
    f.is_friendly = 1;
    f.created_sequence = data.created_sequence++;
    f.direction = dir;
    f.source_x = f.destination_x = f.previous_tile_x = f.x = x;
    f.source_y = f.destination_y = f.previous_tile_y = f.y = y;
    f.grid_offset = map_grid_offset(x, y);
    f.cross_country_x = 15 * x;
    f.cross_country_y = 15 * y;
    f.progress_on_tile = 15;
    f.phrase_sequence_city = f.phrase_sequence_exact = random_byte() & 3;
    f.name = figure_name_get(type, 0);
    map_figure_add(f);
    if (type == FIGURE_TRADE_CARAVAN || type == FIGURE_TRADE_SHIP) {
        f.trader_id = trader_create();
    }
    return f;
}
export function figure_delete(f: figure) {
    let b: building = building_get(f.building_id);
    switch (f.type) {
        case FIGURE_LABOR_SEEKER:
        case FIGURE_MARKET_BUYER:
            if (f.building_id) {
                b.figure_id2 = 0;
            }
            break
        case FIGURE_BALLISTA:
            b.figure_id4 = 0;
            break
        case FIGURE_DOCKER:
            for (let i: number = 0; i < 3; i++) {
                if (b.data.dock.docker_ids[i] == f.id) {
                    b.data.dock.docker_ids[i] = 0;
                }
            }
            break
        case FIGURE_ENEMY_CAESAR_LEGIONARY:
            city_emperor_mark_soldier_killed();
            break
        case FIGURE_EXPLOSION:
        case FIGURE_FORT_STANDARD:
        case FIGURE_ARROW:
        case FIGURE_JAVELIN:
        case FIGURE_BOLT:
        case FIGURE_SPEAR:
        case FIGURE_FISH_GULLS:
        case FIGURE_SHEEP:
        case FIGURE_WOLF:
        case FIGURE_ZEBRA:
        case FIGURE_DELIVERY_BOY:
        case FIGURE_PATRICIAN:
            break
        default:
            if (f.building_id) {
                b.figure_id = 0;
            }
            break
    }
    if (f.empire_city_id) {
        empire_city_remove_trader(f.empire_city_id, f.id);
    }
    if (f.immigrant_building_id) {
        b.immigrant_figure_id = 0;
    }
    figure_route_remove(f);
    map_figure_delete(f);
    let figure_id: number = f.id;
    memset(f, 0);
    f.id = figure_id;
}
export function figure_is_dead(f: figure) {
    return f.state != FIGURE_STATE_ALIVE || f.action_state == FIGURE_ACTION_149_CORPSE;
}
export function figure_is_enemy(f: figure) {
    return f.type >= FIGURE_ENEMY43_SPEAR && f.type <= FIGURE_ENEMY_CAESAR_LEGIONARY;
}
export function figure_is_legion(f: figure) {
    return f.type >= FIGURE_FORT_JAVELIN && f.type <= FIGURE_FORT_LEGIONARY;
}
export function figure_is_herd(f: figure) {
    return f.type >= FIGURE_SHEEP && f.type <= FIGURE_ZEBRA;
}
export function figure_init_scenario() {
    for (let i: number = 0; i < MAX_FIGURES; i++) {
        memset(data.figures[i], 0);
        data.figures[i].id = i;
    }
    data.created_sequence = 0;
}
function figure_save(buf: buffer, f: figure) {
    buffer_write_u8(buf, f.alternative_location_index);
    buffer_write_u8(buf, f.image_offset);
    buffer_write_u8(buf, f.is_enemy_image);
    buffer_write_u8(buf, f.flotsam_visible);
    buffer_write_i16(buf, f.image_id);
    buffer_write_i16(buf, f.cart_image_id);
    buffer_write_i16(buf, f.next_figure_id_on_same_tile);
    buffer_write_u8(buf, f.type);
    buffer_write_u8(buf, f.resource_id);
    buffer_write_u8(buf, f.use_cross_country);
    buffer_write_u8(buf, f.is_friendly);
    buffer_write_u8(buf, f.state);
    buffer_write_u8(buf, f.faction_id);
    buffer_write_u8(buf, f.action_state_before_attack);
    buffer_write_i8(buf, f.direction);
    buffer_write_i8(buf, f.previous_tile_direction);
    buffer_write_i8(buf, f.attack_direction);
    buffer_write_u8(buf, f.x);
    buffer_write_u8(buf, f.y);
    buffer_write_u8(buf, f.previous_tile_x);
    buffer_write_u8(buf, f.previous_tile_y);
    buffer_write_u8(buf, f.missile_damage);
    buffer_write_u8(buf, f.damage);
    buffer_write_i16(buf, f.grid_offset);
    buffer_write_u8(buf, f.destination_x);
    buffer_write_u8(buf, f.destination_y);
    buffer_write_i16(buf, f.destination_grid_offset);
    buffer_write_u8(buf, f.source_x);
    buffer_write_u8(buf, f.source_y);
    buffer_write_u8(buf, f.formation_position_x.soldier);
    buffer_write_u8(buf, f.formation_position_y.soldier);
    buffer_write_i16(buf, f.__unused_24);
    buffer_write_i16(buf, f.wait_ticks);
    buffer_write_u8(buf, f.action_state);
    buffer_write_u8(buf, f.progress_on_tile);
    buffer_write_i16(buf, f.routing_path_id);
    buffer_write_i16(buf, f.routing_path_current_tile);
    buffer_write_i16(buf, f.routing_path_length);
    buffer_write_u8(buf, f.in_building_wait_ticks);
    buffer_write_u8(buf, f.is_on_road);
    buffer_write_i16(buf, f.max_roam_length);
    buffer_write_i16(buf, f.roam_length);
    buffer_write_u8(buf, f.roam_choose_destination);
    buffer_write_u8(buf, f.roam_random_counter);
    buffer_write_i8(buf, f.roam_turn_direction);
    buffer_write_i8(buf, f.roam_ticks_until_next_turn);
    buffer_write_i16(buf, f.cross_country_x);
    buffer_write_i16(buf, f.cross_country_y);
    buffer_write_i16(buf, f.cc_destination_x);
    buffer_write_i16(buf, f.cc_destination_y);
    buffer_write_i16(buf, f.cc_delta_x);
    buffer_write_i16(buf, f.cc_delta_y);
    buffer_write_i16(buf, f.cc_delta_xy);
    buffer_write_u8(buf, f.cc_direction);
    buffer_write_u8(buf, f.speed_multiplier);
    buffer_write_i16(buf, f.building_id);
    buffer_write_i16(buf, f.immigrant_building_id);
    buffer_write_i16(buf, f.destination_building_id);
    buffer_write_i16(buf, f.formation_id);
    buffer_write_u8(buf, f.index_in_formation);
    buffer_write_u8(buf, f.formation_at_rest);
    buffer_write_u8(buf, f.migrant_num_people);
    buffer_write_u8(buf, f.is_ghost);
    buffer_write_u8(buf, f.min_max_seen);
    buffer_write_u8(buf, f.__unused_57);
    buffer_write_i16(buf, f.leading_figure_id);
    buffer_write_u8(buf, f.attack_image_offset);
    buffer_write_u8(buf, f.wait_ticks_missile);
    buffer_write_i8(buf, f.x_offset_cart);
    buffer_write_i8(buf, f.y_offset_cart);
    buffer_write_u8(buf, f.empire_city_id);
    buffer_write_u8(buf, f.trader_amount_bought);
    buffer_write_i16(buf, f.name);
    buffer_write_u8(buf, f.terrain_usage);
    buffer_write_u8(buf, f.loads_sold_or_carrying);
    buffer_write_u8(buf, f.is_boat);
    buffer_write_u8(buf, f.height_adjusted_ticks);
    buffer_write_u8(buf, f.current_height);
    buffer_write_u8(buf, f.target_height);
    buffer_write_u8(buf, f.collecting_item_id);
    buffer_write_u8(buf, f.trade_ship_failed_dock_attempts);
    buffer_write_u8(buf, f.phrase_sequence_exact);
    buffer_write_i8(buf, f.phrase_id);
    buffer_write_u8(buf, f.phrase_sequence_city);
    buffer_write_u8(buf, f.trader_id);
    buffer_write_u8(buf, f.wait_ticks_next_target);
    buffer_write_u8(buf, f.__unused_6f);
    buffer_write_i16(buf, f.target_figure_id);
    buffer_write_i16(buf, f.targeted_by_figure_id);
    buffer_write_u16(buf, f.created_sequence);
    buffer_write_u16(buf, f.target_figure_created_sequence);
    buffer_write_u8(buf, f.figures_on_same_tile_index);
    buffer_write_u8(buf, f.num_attackers);
    buffer_write_i16(buf, f.attacker_id1);
    buffer_write_i16(buf, f.attacker_id2);
    buffer_write_i16(buf, f.opponent_id);
}
function figure_load(buf: buffer, f: figure) {
    f.alternative_location_index = buffer_read_u8(buf);
    f.image_offset = buffer_read_u8(buf);
    f.is_enemy_image = buffer_read_u8(buf);
    f.flotsam_visible = buffer_read_u8(buf);
    f.image_id = buffer_read_i16(buf);
    f.cart_image_id = buffer_read_i16(buf);
    f.next_figure_id_on_same_tile = buffer_read_i16(buf);
    f.type = buffer_read_u8(buf);
    f.resource_id = buffer_read_u8(buf);
    f.use_cross_country = buffer_read_u8(buf);
    f.is_friendly = buffer_read_u8(buf);
    f.state = buffer_read_u8(buf);
    f.faction_id = buffer_read_u8(buf);
    f.action_state_before_attack = buffer_read_u8(buf);
    f.direction = buffer_read_i8(buf);
    f.previous_tile_direction = buffer_read_i8(buf);
    f.attack_direction = buffer_read_i8(buf);
    f.x = buffer_read_u8(buf);
    f.y = buffer_read_u8(buf);
    f.previous_tile_x = buffer_read_u8(buf);
    f.previous_tile_y = buffer_read_u8(buf);
    f.missile_damage = buffer_read_u8(buf);
    f.damage = buffer_read_u8(buf);
    f.grid_offset = buffer_read_i16(buf);
    f.destination_x = buffer_read_u8(buf);
    f.destination_y = buffer_read_u8(buf);
    f.destination_grid_offset = buffer_read_i16(buf);
    f.source_x = buffer_read_u8(buf);
    f.source_y = buffer_read_u8(buf);
    f.formation_position_x.soldier = buffer_read_u8(buf);
    f.formation_position_y.soldier = buffer_read_u8(buf);
    f.__unused_24 = buffer_read_i16(buf);
    f.wait_ticks = buffer_read_i16(buf);
    f.action_state = buffer_read_u8(buf);
    f.progress_on_tile = buffer_read_u8(buf);
    f.routing_path_id = buffer_read_i16(buf);
    f.routing_path_current_tile = buffer_read_i16(buf);
    f.routing_path_length = buffer_read_i16(buf);
    f.in_building_wait_ticks = buffer_read_u8(buf);
    f.is_on_road = buffer_read_u8(buf);
    f.max_roam_length = buffer_read_i16(buf);
    f.roam_length = buffer_read_i16(buf);
    f.roam_choose_destination = buffer_read_u8(buf);
    f.roam_random_counter = buffer_read_u8(buf);
    f.roam_turn_direction = buffer_read_i8(buf);
    f.roam_ticks_until_next_turn = buffer_read_i8(buf);
    f.cross_country_x = buffer_read_i16(buf);
    f.cross_country_y = buffer_read_i16(buf);
    f.cc_destination_x = buffer_read_i16(buf);
    f.cc_destination_y = buffer_read_i16(buf);
    f.cc_delta_x = buffer_read_i16(buf);
    f.cc_delta_y = buffer_read_i16(buf);
    f.cc_delta_xy = buffer_read_i16(buf);
    f.cc_direction = buffer_read_u8(buf);
    f.speed_multiplier = buffer_read_u8(buf);
    f.building_id = buffer_read_i16(buf);
    f.immigrant_building_id = buffer_read_i16(buf);
    f.destination_building_id = buffer_read_i16(buf);
    f.formation_id = buffer_read_i16(buf);
    f.index_in_formation = buffer_read_u8(buf);
    f.formation_at_rest = buffer_read_u8(buf);
    f.migrant_num_people = buffer_read_u8(buf);
    f.is_ghost = buffer_read_u8(buf);
    f.min_max_seen = buffer_read_u8(buf);
    f.__unused_57 = buffer_read_u8(buf);
    f.leading_figure_id = buffer_read_i16(buf);
    f.attack_image_offset = buffer_read_u8(buf);
    f.wait_ticks_missile = buffer_read_u8(buf);
    f.x_offset_cart = buffer_read_i8(buf);
    f.y_offset_cart = buffer_read_i8(buf);
    f.empire_city_id = buffer_read_u8(buf);
    f.trader_amount_bought = buffer_read_u8(buf);
    f.name = buffer_read_i16(buf);
    f.terrain_usage = buffer_read_u8(buf);
    f.loads_sold_or_carrying = buffer_read_u8(buf);
    f.is_boat = buffer_read_u8(buf);
    f.height_adjusted_ticks = buffer_read_u8(buf);
    f.current_height = buffer_read_u8(buf);
    f.target_height = buffer_read_u8(buf);
    f.collecting_item_id = buffer_read_u8(buf);
    f.trade_ship_failed_dock_attempts = buffer_read_u8(buf);
    f.phrase_sequence_exact = buffer_read_u8(buf);
    f.phrase_id = buffer_read_i8(buf);
    f.phrase_sequence_city = buffer_read_u8(buf);
    f.trader_id = buffer_read_u8(buf);
    f.wait_ticks_next_target = buffer_read_u8(buf);
    f.__unused_6f = buffer_read_u8(buf);
    f.target_figure_id = buffer_read_i16(buf);
    f.targeted_by_figure_id = buffer_read_i16(buf);
    f.created_sequence = buffer_read_u16(buf);
    f.target_figure_created_sequence = buffer_read_u16(buf);
    f.figures_on_same_tile_index = buffer_read_u8(buf);
    f.num_attackers = buffer_read_u8(buf);
    f.attacker_id1 = buffer_read_i16(buf);
    f.attacker_id2 = buffer_read_i16(buf);
    f.opponent_id = buffer_read_i16(buf);
}
export function figure_save_state(list: buffer, seq: buffer) {
    buffer_write_i32(seq, data.created_sequence);
    for (let i: number = 0; i < MAX_FIGURES; i++) {
        figure_save(list, data.figures[i]);
    }
}
export function figure_load_state(list: buffer, seq: buffer) {
    data.created_sequence = buffer_read_i32(seq);
    for (let i: number = 0; i < MAX_FIGURES; i++) {
        figure_load(list, data.figures[i]);
        data.figures[i].id = i;
    }
}
