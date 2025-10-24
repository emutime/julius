export const MAX_BUILDINGS = 2000;
import { building_state_load_from_buffer, building_state_save_to_buffer } from 'building/building_state';
import { building_properties, building_properties_for_type } from 'building/properties';
import { building_storage_delete } from 'building/storage';
import { building_state, building_type } from 'building/type';
import { city_buildings_remove_barracks, city_buildings_remove_distribution_center, city_buildings_remove_dock, city_buildings_remove_hippodrome, city_buildings_remove_senate, city_buildings_unknown_value } from 'city/buildings';
import { city_population_remove_home_removed } from 'city/population';
import { city_warning_show, warning_type } from 'city/warning';
import { buffer, buffer_read_i32, buffer_skip, buffer_write_i32 } from 'core/buffer';
import { formation_legion_delete_for_fort } from 'figure/formation_legion';
import { resource_type, workshop_type } from 'game/resource';
import { game_undo_contains_building } from 'game/undo';
import { map_building_tiles_remove } from 'map/building_tiles';
import { map_desirability_get_max } from 'map/desirability';
import { map_elevation_at } from 'map/elevation';
import { GRID, map_grid_offset } from 'map/grid';
import { map_random_get } from 'map/random';
import { map_routing_update_land } from 'map/routing_terrain';
import { map_terrain_is_adjacent_to_water, terrain } from 'map/terrain';
import { map_tiles_update_all_aqueducts, map_tiles_update_all_roads, map_tiles_update_all_walls } from 'map/tiles';
import { memset } from '../../ext/crt';
import BUILDING_HOUSE_VACANT_LOT = building_type.BUILDING_HOUSE_VACANT_LOT;
import BUILDING_HOUSE_SMALL_TENT = building_type.BUILDING_HOUSE_SMALL_TENT;
import BUILDING_HOUSE_MEDIUM_INSULA = building_type.BUILDING_HOUSE_MEDIUM_INSULA;
import BUILDING_HOUSE_LARGE_INSULA = building_type.BUILDING_HOUSE_LARGE_INSULA;
import BUILDING_HOUSE_MEDIUM_VILLA = building_type.BUILDING_HOUSE_MEDIUM_VILLA;
import BUILDING_HOUSE_LARGE_VILLA = building_type.BUILDING_HOUSE_LARGE_VILLA;
import BUILDING_HOUSE_MEDIUM_PALACE = building_type.BUILDING_HOUSE_MEDIUM_PALACE;
import BUILDING_HOUSE_LARGE_PALACE = building_type.BUILDING_HOUSE_LARGE_PALACE;
import BUILDING_HOUSE_LUXURY_PALACE = building_type.BUILDING_HOUSE_LUXURY_PALACE;
import BUILDING_HIPPODROME = building_type.BUILDING_HIPPODROME;
import BUILDING_FORT_LEGIONARIES = building_type.BUILDING_FORT_LEGIONARIES;
import BUILDING_FORT_JAVELIN = building_type.BUILDING_FORT_JAVELIN;
import BUILDING_FORT_MOUNTED = building_type.BUILDING_FORT_MOUNTED;
import BUILDING_DISTRIBUTION_CENTER_UNUSED = building_type.BUILDING_DISTRIBUTION_CENTER_UNUSED;
import BUILDING_FORT = building_type.BUILDING_FORT;
import BUILDING_GATEHOUSE = building_type.BUILDING_GATEHOUSE;
import BUILDING_TOWER = building_type.BUILDING_TOWER;
import BUILDING_GRANARY = building_type.BUILDING_GRANARY;
import BUILDING_DOCK = building_type.BUILDING_DOCK;
import BUILDING_SENATE = building_type.BUILDING_SENATE;
import BUILDING_RESERVOIR = building_type.BUILDING_RESERVOIR;
import BUILDING_BARRACKS = building_type.BUILDING_BARRACKS;
import BUILDING_WHEAT_FARM = building_type.BUILDING_WHEAT_FARM;
import BUILDING_VEGETABLE_FARM = building_type.BUILDING_VEGETABLE_FARM;
import BUILDING_FRUIT_FARM = building_type.BUILDING_FRUIT_FARM;
import BUILDING_OLIVE_FARM = building_type.BUILDING_OLIVE_FARM;
import BUILDING_VINES_FARM = building_type.BUILDING_VINES_FARM;
import BUILDING_PIG_FARM = building_type.BUILDING_PIG_FARM;
import BUILDING_MARBLE_QUARRY = building_type.BUILDING_MARBLE_QUARRY;
import BUILDING_IRON_MINE = building_type.BUILDING_IRON_MINE;
import BUILDING_TIMBER_YARD = building_type.BUILDING_TIMBER_YARD;
import BUILDING_CLAY_PIT = building_type.BUILDING_CLAY_PIT;
import BUILDING_WINE_WORKSHOP = building_type.BUILDING_WINE_WORKSHOP;
import BUILDING_OIL_WORKSHOP = building_type.BUILDING_OIL_WORKSHOP;
import BUILDING_WEAPONS_WORKSHOP = building_type.BUILDING_WEAPONS_WORKSHOP;
import BUILDING_FURNITURE_WORKSHOP = building_type.BUILDING_FURNITURE_WORKSHOP;
import BUILDING_POTTERY_WORKSHOP = building_type.BUILDING_POTTERY_WORKSHOP;
import BUILDING_STATE_UNUSED = building_state.BUILDING_STATE_UNUSED;
import BUILDING_STATE_IN_USE = building_state.BUILDING_STATE_IN_USE;
import BUILDING_STATE_UNDO = building_state.BUILDING_STATE_UNDO;
import BUILDING_STATE_CREATED = building_state.BUILDING_STATE_CREATED;
import BUILDING_STATE_RUBBLE = building_state.BUILDING_STATE_RUBBLE;
import BUILDING_STATE_DELETED_BY_GAME = building_state.BUILDING_STATE_DELETED_BY_GAME;
import BUILDING_STATE_DELETED_BY_PLAYER = building_state.BUILDING_STATE_DELETED_BY_PLAYER;;
class subtype {
    public house_level: number = 0;
    public warehouse_resource_id: number = 0;
    public workshop_type: number = 0;
    public orientation: number = 0;
    public fort_figure_type: number = 0;
    public native_meeting_center_id: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.house_level = args[0]);
        args.length >= 2 && (this.warehouse_resource_id = args[1]);
        args.length >= 3 && (this.workshop_type = args[2]);
        args.length >= 4 && (this.orientation = args[3]);
        args.length >= 5 && (this.fort_figure_type = args[4]);
        args.length >= 6 && (this.native_meeting_center_id = args[5]);
    }
}
class dock {
    public queued_docker_id: number = 0;
    public num_ships: number = 0;
    public orientation: number = 0;
    public docker_ids: number[] = new Array(3).fill(0);
    public trade_ship_id: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.queued_docker_id = args[0]);
        args.length >= 2 && (this.num_ships = args[1]);
        args.length >= 3 && (this.orientation = args[2]);
        args.length >= 4 && (this.docker_ids = args[3]);
        args.length >= 5 && (this.trade_ship_id = args[4]);
    }
}
class market {
    public inventory: number[] = new Array(8).fill(0);
    public pottery_demand: number = 0;
    public furniture_demand: number = 0;
    public oil_demand: number = 0;
    public wine_demand: number = 0;
    public fetch_inventory_id: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.inventory = args[0]);
        args.length >= 2 && (this.pottery_demand = args[1]);
        args.length >= 3 && (this.furniture_demand = args[2]);
        args.length >= 4 && (this.oil_demand = args[3]);
        args.length >= 5 && (this.wine_demand = args[4]);
        args.length >= 6 && (this.fetch_inventory_id = args[5]);
    }
}
class granary {
    public resource_stored: number[] = new Array(16).fill(0);
    public constructor(...args: any[]) {
        args.length >= 1 && (this.resource_stored = args[0]);
    }
}
class industry {
    public progress: number = 0;
    public blessing_days_left: number = 0;
    public curse_days_left: number = 0;
    public has_raw_materials: number = 0;
    public has_fish: number = 0;
    public orientation: number = 0;
    public fishing_boat_id: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.progress = args[0]);
        args.length >= 2 && (this.blessing_days_left = args[1]);
        args.length >= 3 && (this.curse_days_left = args[2]);
        args.length >= 4 && (this.has_raw_materials = args[3]);
        args.length >= 5 && (this.has_fish = args[4]);
        args.length >= 6 && (this.orientation = args[5]);
        args.length >= 7 && (this.fishing_boat_id = args[6]);
    }
}
class entertainment {
    public num_shows: number = 0;
    public days1: number = 0;
    public days2: number = 0;
    public play: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.num_shows = args[0]);
        args.length >= 2 && (this.days1 = args[1]);
        args.length >= 3 && (this.days2 = args[2]);
        args.length >= 4 && (this.play = args[3]);
    }
}
class house {
    public inventory: number[] = new Array(8).fill(0);
    public theater: number = 0;
    public amphitheater_actor: number = 0;
    public amphitheater_gladiator: number = 0;
    public colosseum_gladiator: number = 0;
    public colosseum_lion: number = 0;
    public hippodrome: number = 0;
    public school: number = 0;
    public library: number = 0;
    public academy: number = 0;
    public barber: number = 0;
    public clinic: number = 0;
    public bathhouse: number = 0;
    public hospital: number = 0;
    public temple_ceres: number = 0;
    public temple_neptune: number = 0;
    public temple_mercury: number = 0;
    public temple_mars: number = 0;
    public temple_venus: number = 0;
    public no_space_to_expand: number = 0;
    public num_foods: number = 0;
    public entertainment: number = 0;
    public education: number = 0;
    public health: number = 0;
    public num_gods: number = 0;
    public devolve_delay: number = 0;
    public evolve_text_id: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.inventory = args[0]);
        args.length >= 2 && (this.theater = args[1]);
        args.length >= 3 && (this.amphitheater_actor = args[2]);
        args.length >= 4 && (this.amphitheater_gladiator = args[3]);
        args.length >= 5 && (this.colosseum_gladiator = args[4]);
        args.length >= 6 && (this.colosseum_lion = args[5]);
        args.length >= 7 && (this.hippodrome = args[6]);
        args.length >= 8 && (this.school = args[7]);
        args.length >= 9 && (this.library = args[8]);
        args.length >= 10 && (this.academy = args[9]);
        args.length >= 11 && (this.barber = args[10]);
        args.length >= 12 && (this.clinic = args[11]);
        args.length >= 13 && (this.bathhouse = args[12]);
        args.length >= 14 && (this.hospital = args[13]);
        args.length >= 15 && (this.temple_ceres = args[14]);
        args.length >= 16 && (this.temple_neptune = args[15]);
        args.length >= 17 && (this.temple_mercury = args[16]);
        args.length >= 18 && (this.temple_mars = args[17]);
        args.length >= 19 && (this.temple_venus = args[18]);
        args.length >= 20 && (this.no_space_to_expand = args[19]);
        args.length >= 21 && (this.num_foods = args[20]);
        args.length >= 22 && (this.entertainment = args[21]);
        args.length >= 23 && (this.education = args[22]);
        args.length >= 24 && (this.health = args[23]);
        args.length >= 25 && (this.num_gods = args[24]);
        args.length >= 26 && (this.devolve_delay = args[25]);
        args.length >= 27 && (this.evolve_text_id = args[26]);
    }
}
class data {
    public dock: dock = null;
    public market: market = null;
    public granary: granary = null;
    public industry: industry = null;
    public entertainment: entertainment = null;
    public house: house = null;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.dock = args[0]);
        args.length >= 2 && (this.market = args[1]);
        args.length >= 3 && (this.granary = args[2]);
        args.length >= 4 && (this.industry = args[3]);
        args.length >= 5 && (this.entertainment = args[4]);
        args.length >= 6 && (this.house = args[5]);
    }
}
class sentiment {
    public house_happiness: number = 0;
    public native_anger: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.house_happiness = args[0]);
        args.length >= 2 && (this.native_anger = args[1]);
    }
}
export class building {
    public id: number = 0;
    public state: number = 0;
    public faction_id: number = 0;
    public unknown_value: number = 0;
    public size: number = 0;
    public house_is_merged: number = 0;
    public house_size: number = 0;
    public x: number = 0;
    public y: number = 0;
    public grid_offset: number = 0;
    public type: number = 0;
    public subtype: subtype = null;
    public road_network_id: number = 0;
    public created_sequence: number = 0;
    public houses_covered: number = 0;
    public percentage_houses_covered: number = 0;
    public house_population: number = 0;
    public house_population_room: number = 0;
    public distance_from_entry: number = 0;
    public house_highest_population: number = 0;
    public house_unreachable_ticks: number = 0;
    public road_access_x: number = 0;
    public road_access_y: number = 0;
    public figure_id: number = 0;
    public figure_id2: number = 0;
    public immigrant_figure_id: number = 0;
    public figure_id4: number = 0;
    public figure_spawn_delay: number = 0;
    public figure_roam_direction: number = 0;
    public has_water_access: number = 0;
    public prev_part_building_id: number = 0;
    public next_part_building_id: number = 0;
    public loads_stored: number = 0;
    public has_well_access: number = 0;
    public num_workers: number = 0;
    public labor_category: number = 0;
    public output_resource_id: number = 0;
    public has_road_access: number = 0;
    public house_criminal_active: number = 0;
    public damage_risk: number = 0;
    public fire_risk: number = 0;
    public fire_duration: number = 0;
    public fire_proof: number = 0;
    public house_figure_generation_delay: number = 0;
    public house_tax_coverage: number = 0;
    public formation_id: number = 0;
    public data: data = null;
    public tax_income_or_storage: number = 0;
    public house_days_without_food: number = 0;
    public ruin_has_plague: number = 0;
    public desirability: number = 0;
    public is_deleted: number = 0;
    public is_adjacent_to_water: number = 0;
    public storage_id: number = 0;
    public sentiment: sentiment = null;
    public show_on_problem_overlay: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.id = args[0]);
        args.length >= 2 && (this.state = args[1]);
        args.length >= 3 && (this.faction_id = args[2]);
        args.length >= 4 && (this.unknown_value = args[3]);
        args.length >= 5 && (this.size = args[4]);
        args.length >= 6 && (this.house_is_merged = args[5]);
        args.length >= 7 && (this.house_size = args[6]);
        args.length >= 8 && (this.x = args[7]);
        args.length >= 9 && (this.y = args[8]);
        args.length >= 10 && (this.grid_offset = args[9]);
        args.length >= 11 && (this.type = args[10]);
        args.length >= 12 && (this.subtype = args[11]);
        args.length >= 13 && (this.road_network_id = args[12]);
        args.length >= 14 && (this.created_sequence = args[13]);
        args.length >= 15 && (this.houses_covered = args[14]);
        args.length >= 16 && (this.percentage_houses_covered = args[15]);
        args.length >= 17 && (this.house_population = args[16]);
        args.length >= 18 && (this.house_population_room = args[17]);
        args.length >= 19 && (this.distance_from_entry = args[18]);
        args.length >= 20 && (this.house_highest_population = args[19]);
        args.length >= 21 && (this.house_unreachable_ticks = args[20]);
        args.length >= 22 && (this.road_access_x = args[21]);
        args.length >= 23 && (this.road_access_y = args[22]);
        args.length >= 24 && (this.figure_id = args[23]);
        args.length >= 25 && (this.figure_id2 = args[24]);
        args.length >= 26 && (this.immigrant_figure_id = args[25]);
        args.length >= 27 && (this.figure_id4 = args[26]);
        args.length >= 28 && (this.figure_spawn_delay = args[27]);
        args.length >= 29 && (this.figure_roam_direction = args[28]);
        args.length >= 30 && (this.has_water_access = args[29]);
        args.length >= 31 && (this.prev_part_building_id = args[30]);
        args.length >= 32 && (this.next_part_building_id = args[31]);
        args.length >= 33 && (this.loads_stored = args[32]);
        args.length >= 34 && (this.has_well_access = args[33]);
        args.length >= 35 && (this.num_workers = args[34]);
        args.length >= 36 && (this.labor_category = args[35]);
        args.length >= 37 && (this.output_resource_id = args[36]);
        args.length >= 38 && (this.has_road_access = args[37]);
        args.length >= 39 && (this.house_criminal_active = args[38]);
        args.length >= 40 && (this.damage_risk = args[39]);
        args.length >= 41 && (this.fire_risk = args[40]);
        args.length >= 42 && (this.fire_duration = args[41]);
        args.length >= 43 && (this.fire_proof = args[42]);
        args.length >= 44 && (this.house_figure_generation_delay = args[43]);
        args.length >= 45 && (this.house_tax_coverage = args[44]);
        args.length >= 46 && (this.formation_id = args[45]);
        args.length >= 47 && (this.data = args[46]);
        args.length >= 48 && (this.tax_income_or_storage = args[47]);
        args.length >= 49 && (this.house_days_without_food = args[48]);
        args.length >= 50 && (this.ruin_has_plague = args[49]);
        args.length >= 51 && (this.desirability = args[50]);
        args.length >= 52 && (this.is_deleted = args[51]);
        args.length >= 53 && (this.is_adjacent_to_water = args[52]);
        args.length >= 54 && (this.storage_id = args[53]);
        args.length >= 55 && (this.sentiment = args[54]);
        args.length >= 56 && (this.show_on_problem_overlay = args[55]);
    }
}
import RESOURCE_NONE = resource_type.RESOURCE_NONE;
import RESOURCE_WHEAT = resource_type.RESOURCE_WHEAT;
import RESOURCE_VEGETABLES = resource_type.RESOURCE_VEGETABLES;
import RESOURCE_FRUIT = resource_type.RESOURCE_FRUIT;
import RESOURCE_OLIVES = resource_type.RESOURCE_OLIVES;
import RESOURCE_VINES = resource_type.RESOURCE_VINES;
import RESOURCE_MEAT = resource_type.RESOURCE_MEAT;
import RESOURCE_WINE = resource_type.RESOURCE_WINE;
import RESOURCE_OIL = resource_type.RESOURCE_OIL;
import RESOURCE_IRON = resource_type.RESOURCE_IRON;
import RESOURCE_TIMBER = resource_type.RESOURCE_TIMBER;
import RESOURCE_CLAY = resource_type.RESOURCE_CLAY;
import RESOURCE_MARBLE = resource_type.RESOURCE_MARBLE;
import RESOURCE_WEAPONS = resource_type.RESOURCE_WEAPONS;
import RESOURCE_FURNITURE = resource_type.RESOURCE_FURNITURE;
import RESOURCE_POTTERY = resource_type.RESOURCE_POTTERY;
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
import WORKSHOP_OLIVES_TO_OIL = workshop_type.WORKSHOP_OLIVES_TO_OIL;
import WORKSHOP_VINES_TO_WINE = workshop_type.WORKSHOP_VINES_TO_WINE;
import WORKSHOP_IRON_TO_WEAPONS = workshop_type.WORKSHOP_IRON_TO_WEAPONS;
import WORKSHOP_TIMBER_TO_FURNITURE = workshop_type.WORKSHOP_TIMBER_TO_FURNITURE;
import WORKSHOP_CLAY_TO_POTTERY = workshop_type.WORKSHOP_CLAY_TO_POTTERY;
import WARNING_DATA_LIMIT_REACHED = warning_type.WARNING_DATA_LIMIT_REACHED;
import GRID_SIZE = GRID.GRID_SIZE;
import TERRAIN_WALL = terrain.TERRAIN_WALL;
import TERRAIN_GATEHOUSE = terrain.TERRAIN_GATEHOUSE;
let all_buildings: building[] = new Array(MAX_BUILDINGS);
export class unnamed25_8 {
    public highest_id_in_use: number = 0;
    public highest_id_ever: number = 0;
    public created_sequence: number = 0;
    public incorrect_houses: number = 0;
    public unfixable_houses: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.highest_id_in_use = args[0]);
        args.length >= 2 && (this.highest_id_ever = args[1]);
        args.length >= 3 && (this.created_sequence = args[2]);
        args.length >= 4 && (this.incorrect_houses = args[3]);
        args.length >= 5 && (this.unfixable_houses = args[4]);
    }
}
let extra: unnamed25_8 = new unnamed25_8(0, 0, 0, 0);
export function building_get(id: number) {
    return all_buildings[id];
}
export function building_main(b: building) {
    for (let guard: number = 0; guard < 9; guard++) {
        if (b.prev_part_building_id <= 0) {
            return b;
        }
        b = all_buildings[b.prev_part_building_id];
    }
    return all_buildings[0];
}
export function building_next(b: building) {
    return all_buildings[b.next_part_building_id];
}
export function building_create(type: building_type, x: number, y: number) {
    let b: building = null;
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        if (all_buildings[i].state == BUILDING_STATE_UNUSED && !game_undo_contains_building(i)) {
            b = all_buildings[i];
            break
        }
    }
    if (!b) {
        city_warning_show(WARNING_DATA_LIMIT_REACHED);
        return all_buildings[0];
    }
    let props: building_properties = building_properties_for_type(type);
    memset(b.data, 0);
    b.state = BUILDING_STATE_CREATED;
    b.faction_id = 1;
    b.unknown_value = city_buildings_unknown_value();
    b.type = type;
    b.size = props.size;
    b.created_sequence = extra.created_sequence++;
    b.sentiment.house_happiness = 50;
    b.distance_from_entry = 0;
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
    if (building_is_house(type)) {
        b.subtype.house_level = type - BUILDING_HOUSE_VACANT_LOT;
    } else {
        b.subtype.house_level = 0;
    }
    switch (type) {
        case BUILDING_WHEAT_FARM:
            b.output_resource_id = RESOURCE_WHEAT;
            break
        case BUILDING_VEGETABLE_FARM:
            b.output_resource_id = RESOURCE_VEGETABLES;
            break
        case BUILDING_FRUIT_FARM:
            b.output_resource_id = RESOURCE_FRUIT;
            break
        case BUILDING_OLIVE_FARM:
            b.output_resource_id = RESOURCE_OLIVES;
            break
        case BUILDING_VINES_FARM:
            b.output_resource_id = RESOURCE_VINES;
            break
        case BUILDING_PIG_FARM:
            b.output_resource_id = RESOURCE_MEAT;
            break
        case BUILDING_MARBLE_QUARRY:
            b.output_resource_id = RESOURCE_MARBLE;
            break
        case BUILDING_IRON_MINE:
            b.output_resource_id = RESOURCE_IRON;
            break
        case BUILDING_TIMBER_YARD:
            b.output_resource_id = RESOURCE_TIMBER;
            break
        case BUILDING_CLAY_PIT:
            b.output_resource_id = RESOURCE_CLAY;
            break
        case BUILDING_WINE_WORKSHOP:
            b.output_resource_id = RESOURCE_WINE;
            b.subtype.workshop_type = WORKSHOP_VINES_TO_WINE;
            break
        case BUILDING_OIL_WORKSHOP:
            b.output_resource_id = RESOURCE_OIL;
            b.subtype.workshop_type = WORKSHOP_OLIVES_TO_OIL;
            break
        case BUILDING_WEAPONS_WORKSHOP:
            b.output_resource_id = RESOURCE_WEAPONS;
            b.subtype.workshop_type = WORKSHOP_IRON_TO_WEAPONS;
            break
        case BUILDING_FURNITURE_WORKSHOP:
            b.output_resource_id = RESOURCE_FURNITURE;
            b.subtype.workshop_type = WORKSHOP_TIMBER_TO_FURNITURE;
            break
        case BUILDING_POTTERY_WORKSHOP:
            b.output_resource_id = RESOURCE_POTTERY;
            b.subtype.workshop_type = WORKSHOP_CLAY_TO_POTTERY;
            break
        default:
            b.output_resource_id = RESOURCE_NONE
            break
    }
    if (type == BUILDING_GRANARY) {
        b.data.granary.resource_stored[RESOURCE_NONE] = 2400;
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
function building_delete(b: building) {
    building_clear_related_data(b);
    let id: number = b.id;
    memset(b, 0);
    b.id = id;
}
export function building_clear_related_data(b: building) {
    if (b.storage_id) {
        building_storage_delete(b.storage_id);
        b.storage_id = 0;
    }
    if (b.type == BUILDING_SENATE) {
        city_buildings_remove_senate(b);
    }
    if (b.type == BUILDING_DOCK) {
        city_buildings_remove_dock();
    }
    if (b.type == BUILDING_BARRACKS) {
        city_buildings_remove_barracks(b);
    }
    if (b.type == BUILDING_DISTRIBUTION_CENTER_UNUSED) {
        city_buildings_remove_distribution_center(b);
    }
    if (b.type == BUILDING_FORT) {
        formation_legion_delete_for_fort(b);
    }
    if (b.type == BUILDING_HIPPODROME) {
        city_buildings_remove_hippodrome();
    }
}
export function building_update_state() {
    let land_recalc: number = 0;
    let wall_recalc: number = 0;
    let road_recalc: number = 0;
    let aqueduct_recalc: number = 0;
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = all_buildings[i];
        if (b.state == BUILDING_STATE_CREATED) {
            b.state = BUILDING_STATE_IN_USE;
        }
        if (b.state != BUILDING_STATE_IN_USE || !b.house_size) {
            if (b.state == BUILDING_STATE_UNDO || b.state == BUILDING_STATE_DELETED_BY_PLAYER) {
                if (b.type == BUILDING_TOWER || b.type == BUILDING_GATEHOUSE) {
                    wall_recalc = 1;
                    road_recalc = 1;
                } else if (b.type == BUILDING_RESERVOIR) {
                    aqueduct_recalc = 1;
                } else if (b.type == BUILDING_GRANARY) {
                    road_recalc = 1;
                }
                map_building_tiles_remove(i, b.x, b.y);
                land_recalc = 1;
                building_delete(b);
            } else if (b.state == BUILDING_STATE_RUBBLE) {
                if (b.house_size) {
                    city_population_remove_home_removed(b.house_population);
                }
                building_delete(b);
            } else if (b.state == BUILDING_STATE_DELETED_BY_GAME) {
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
export function building_update_desirability() {
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = all_buildings[i];
        if (b.state != BUILDING_STATE_IN_USE) {
            continue
        }
        b.desirability = map_desirability_get_max(b.x, b.y, b.size);
        if (b.is_adjacent_to_water) {
            b.desirability += 10
        }
        switch (map_elevation_at(b.grid_offset)) {
            case 0:
                break
            case 1:
                b.desirability += 10
                break
            case 2:
                b.desirability += 12
                break
            case 3:
                b.desirability += 14
                break
            case 4:
                b.desirability += 16
                break
            default: b.desirability += 18
                break
        }
    }
}
export function building_is_house(type: building_type) {
    return type >= BUILDING_HOUSE_VACANT_LOT && type <= BUILDING_HOUSE_LUXURY_PALACE;
}
export function building_is_fort(type: building_type) {
    return type == BUILDING_FORT_LEGIONARIES ||
        type == BUILDING_FORT_JAVELIN ||
        type == BUILDING_FORT_MOUNTED;
}
export function building_get_highest_id() {
    return extra.highest_id_in_use;
}
export function building_update_highest_id() {
    extra.highest_id_in_use = 0;
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        if (all_buildings[i].state != BUILDING_STATE_UNUSED) {
            extra.highest_id_in_use = i;
        }
    }
    if (extra.highest_id_in_use > extra.highest_id_ever) {
        extra.highest_id_ever = extra.highest_id_in_use;
    }
}
export function building_totals_add_corrupted_house(unfixable: number) {
    extra.incorrect_houses++;
    if (unfixable) {
        extra.unfixable_houses++;
    }
}
export function building_clear_all() {
    for (let i: number = 0; i < MAX_BUILDINGS; i++) {
        memset(all_buildings[i], 0);
        all_buildings[i].id = i;
    }
    extra.highest_id_in_use = 0;
    extra.highest_id_ever = 0;
    extra.created_sequence = 0;
    extra.incorrect_houses = 0;
    extra.unfixable_houses = 0;
}
export function building_save_state(buf: buffer, highest_id: buffer, highest_id_ever: buffer, sequence: buffer, corrupt_houses: buffer) {
    for (let i: number = 0; i < MAX_BUILDINGS; i++) {
        building_state_save_to_buffer(buf, all_buildings[i]);
    }
    buffer_write_i32(highest_id, extra.highest_id_in_use);
    buffer_write_i32(highest_id_ever, extra.highest_id_ever);
    buffer_skip(highest_id_ever, 4);
    buffer_write_i32(sequence, extra.created_sequence);
    buffer_write_i32(corrupt_houses, extra.incorrect_houses);
    buffer_write_i32(corrupt_houses, extra.unfixable_houses);
}
export function building_load_state(buf: buffer, highest_id: buffer, highest_id_ever: buffer, sequence: buffer, corrupt_houses: buffer) {
    for (let i: number = 0; i < MAX_BUILDINGS; i++) {
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
