import { building, building_create, building_is_fort } from 'building/building';
import { building_construction_can_place_on_terrain, building_construction_clear_type, building_construction_road_orientation } from 'building/construction';
import { building_construction_warning_check_all } from 'building/construction_warning';
import { building_count_total } from 'building/count';
import { building_dock_is_connected_to_open_water } from 'building/dock';
import { building_menu_update } from 'building/menu';
import { building_properties_for_type } from 'building/properties';
import { building_storage_create } from 'building/storage';
import { building_type } from 'building/type';
import { city_buildings_add_barracks, city_buildings_add_distribution_center, city_buildings_add_dock, city_buildings_add_hippodrome, city_buildings_add_senate, city_buildings_build_triumphal_arch, city_buildings_has_hippodrome, city_buildings_has_senate } from 'city/buildings';
import { city_view_orientation } from 'city/view';
import { city_warning_show, warning_type } from 'city/warning';
import { direction_type } from 'core/direction';
import { image_group } from 'core/image';
import { group_terrain } from 'core/image_group';
import { random_byte } from 'core/random';
import { formation_get_num_legions_cached, MAX_LEGIONS } from 'figure/formation';
import { formation_legion_create_for_fort } from 'figure/formation_legion';
import { figure_type } from 'figure/type';
import { resource_type } from 'game/resource';
import { game_undo_add_building } from 'game/undo';
import { map_building_tiles_add, map_building_tiles_add_farm } from 'map/building_tiles';
import { map_orientation_for_gatehouse, map_orientation_for_triumphal_arch, map_orientation_update_buildings } from 'map/orientation';
import { map_routing_update_land, map_routing_update_walls } from 'map/routing_terrain';
import { map_terrain_add_gatehouse_roads, map_terrain_add_triumphal_arch_roads, map_terrain_remove_with_radius, terrain } from 'map/terrain';
import { map_tiles_are_clear, map_tiles_update_all_plazas, map_tiles_update_area_roads, map_tiles_update_area_walls } from 'map/tiles';
import { map_water_add_building, map_water_determine_orientation_size2, map_water_determine_orientation_size3 } from 'map/water';
import { Ref } from '../../ext/crt';
import BUILDING_HOUSE_LARGE_TENT = building_type.BUILDING_HOUSE_LARGE_TENT;
import BUILDING_HOUSE_SMALL_SHACK = building_type.BUILDING_HOUSE_SMALL_SHACK;
import BUILDING_HOUSE_LARGE_SHACK = building_type.BUILDING_HOUSE_LARGE_SHACK;
import BUILDING_HOUSE_SMALL_HOVEL = building_type.BUILDING_HOUSE_SMALL_HOVEL;
import BUILDING_HOUSE_LARGE_HOVEL = building_type.BUILDING_HOUSE_LARGE_HOVEL;
import BUILDING_HOUSE_SMALL_CASA = building_type.BUILDING_HOUSE_SMALL_CASA;
import BUILDING_HOUSE_LARGE_CASA = building_type.BUILDING_HOUSE_LARGE_CASA;
import BUILDING_HOUSE_SMALL_INSULA = building_type.BUILDING_HOUSE_SMALL_INSULA;
import BUILDING_HOUSE_MEDIUM_INSULA = building_type.BUILDING_HOUSE_MEDIUM_INSULA;
import BUILDING_HOUSE_LARGE_INSULA = building_type.BUILDING_HOUSE_LARGE_INSULA;
import BUILDING_HOUSE_GRAND_INSULA = building_type.BUILDING_HOUSE_GRAND_INSULA;
import BUILDING_HOUSE_SMALL_VILLA = building_type.BUILDING_HOUSE_SMALL_VILLA;
import BUILDING_HOUSE_MEDIUM_VILLA = building_type.BUILDING_HOUSE_MEDIUM_VILLA;
import BUILDING_HOUSE_LARGE_VILLA = building_type.BUILDING_HOUSE_LARGE_VILLA;
import BUILDING_HOUSE_GRAND_VILLA = building_type.BUILDING_HOUSE_GRAND_VILLA;
import BUILDING_HOUSE_SMALL_PALACE = building_type.BUILDING_HOUSE_SMALL_PALACE;
import BUILDING_HOUSE_MEDIUM_PALACE = building_type.BUILDING_HOUSE_MEDIUM_PALACE;
import BUILDING_HOUSE_LARGE_PALACE = building_type.BUILDING_HOUSE_LARGE_PALACE;
import BUILDING_HOUSE_LUXURY_PALACE = building_type.BUILDING_HOUSE_LUXURY_PALACE;
import BUILDING_AMPHITHEATER = building_type.BUILDING_AMPHITHEATER;
import BUILDING_THEATER = building_type.BUILDING_THEATER;
import BUILDING_HIPPODROME = building_type.BUILDING_HIPPODROME;
import BUILDING_COLOSSEUM = building_type.BUILDING_COLOSSEUM;
import BUILDING_GLADIATOR_SCHOOL = building_type.BUILDING_GLADIATOR_SCHOOL;
import BUILDING_LION_HOUSE = building_type.BUILDING_LION_HOUSE;
import BUILDING_ACTOR_COLONY = building_type.BUILDING_ACTOR_COLONY;
import BUILDING_CHARIOT_MAKER = building_type.BUILDING_CHARIOT_MAKER;
import BUILDING_FORT_LEGIONARIES = building_type.BUILDING_FORT_LEGIONARIES;
import BUILDING_SMALL_STATUE = building_type.BUILDING_SMALL_STATUE;
import BUILDING_MEDIUM_STATUE = building_type.BUILDING_MEDIUM_STATUE;
import BUILDING_LARGE_STATUE = building_type.BUILDING_LARGE_STATUE;
import BUILDING_FORT_JAVELIN = building_type.BUILDING_FORT_JAVELIN;
import BUILDING_FORT_MOUNTED = building_type.BUILDING_FORT_MOUNTED;
import BUILDING_DOCTOR = building_type.BUILDING_DOCTOR;
import BUILDING_HOSPITAL = building_type.BUILDING_HOSPITAL;
import BUILDING_BATHHOUSE = building_type.BUILDING_BATHHOUSE;
import BUILDING_BARBER = building_type.BUILDING_BARBER;
import BUILDING_DISTRIBUTION_CENTER_UNUSED = building_type.BUILDING_DISTRIBUTION_CENTER_UNUSED;
import BUILDING_SCHOOL = building_type.BUILDING_SCHOOL;
import BUILDING_ACADEMY = building_type.BUILDING_ACADEMY;
import BUILDING_LIBRARY = building_type.BUILDING_LIBRARY;
import BUILDING_FORT_GROUND = building_type.BUILDING_FORT_GROUND;
import BUILDING_PREFECTURE = building_type.BUILDING_PREFECTURE;
import BUILDING_TRIUMPHAL_ARCH = building_type.BUILDING_TRIUMPHAL_ARCH;
import BUILDING_FORT = building_type.BUILDING_FORT;
import BUILDING_GATEHOUSE = building_type.BUILDING_GATEHOUSE;
import BUILDING_TOWER = building_type.BUILDING_TOWER;
import BUILDING_SMALL_TEMPLE_CERES = building_type.BUILDING_SMALL_TEMPLE_CERES;
import BUILDING_SMALL_TEMPLE_NEPTUNE = building_type.BUILDING_SMALL_TEMPLE_NEPTUNE;
import BUILDING_SMALL_TEMPLE_MERCURY = building_type.BUILDING_SMALL_TEMPLE_MERCURY;
import BUILDING_SMALL_TEMPLE_MARS = building_type.BUILDING_SMALL_TEMPLE_MARS;
import BUILDING_SMALL_TEMPLE_VENUS = building_type.BUILDING_SMALL_TEMPLE_VENUS;
import BUILDING_LARGE_TEMPLE_CERES = building_type.BUILDING_LARGE_TEMPLE_CERES;
import BUILDING_LARGE_TEMPLE_NEPTUNE = building_type.BUILDING_LARGE_TEMPLE_NEPTUNE;
import BUILDING_LARGE_TEMPLE_MERCURY = building_type.BUILDING_LARGE_TEMPLE_MERCURY;
import BUILDING_LARGE_TEMPLE_MARS = building_type.BUILDING_LARGE_TEMPLE_MARS;
import BUILDING_LARGE_TEMPLE_VENUS = building_type.BUILDING_LARGE_TEMPLE_VENUS;
import BUILDING_MARKET = building_type.BUILDING_MARKET;
import BUILDING_GRANARY = building_type.BUILDING_GRANARY;
import BUILDING_WAREHOUSE = building_type.BUILDING_WAREHOUSE;
import BUILDING_WAREHOUSE_SPACE = building_type.BUILDING_WAREHOUSE_SPACE;
import BUILDING_SHIPYARD = building_type.BUILDING_SHIPYARD;
import BUILDING_DOCK = building_type.BUILDING_DOCK;
import BUILDING_WHARF = building_type.BUILDING_WHARF;
import BUILDING_GOVERNORS_HOUSE = building_type.BUILDING_GOVERNORS_HOUSE;
import BUILDING_GOVERNORS_VILLA = building_type.BUILDING_GOVERNORS_VILLA;
import BUILDING_GOVERNORS_PALACE = building_type.BUILDING_GOVERNORS_PALACE;
import BUILDING_MISSION_POST = building_type.BUILDING_MISSION_POST;
import BUILDING_ENGINEERS_POST = building_type.BUILDING_ENGINEERS_POST;
import BUILDING_SENATE = building_type.BUILDING_SENATE;
import BUILDING_FORUM = building_type.BUILDING_FORUM;
import BUILDING_NATIVE_HUT = building_type.BUILDING_NATIVE_HUT;
import BUILDING_NATIVE_MEETING = building_type.BUILDING_NATIVE_MEETING;
import BUILDING_FOUNTAIN = building_type.BUILDING_FOUNTAIN;
import BUILDING_WELL = building_type.BUILDING_WELL;
import BUILDING_NATIVE_CROPS = building_type.BUILDING_NATIVE_CROPS;
import BUILDING_MILITARY_ACADEMY = building_type.BUILDING_MILITARY_ACADEMY;
import BUILDING_BARRACKS = building_type.BUILDING_BARRACKS;
import BUILDING_ORACLE = building_type.BUILDING_ORACLE;
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
;
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
import WARNING_CLEAR_LAND_NEEDED = warning_type.WARNING_CLEAR_LAND_NEEDED;
import WARNING_ONE_BUILDING_OF_TYPE = warning_type.WARNING_ONE_BUILDING_OF_TYPE;
import WARNING_SHORE_NEEDED = warning_type.WARNING_SHORE_NEEDED;
import WARNING_MAX_LEGIONS_REACHED = warning_type.WARNING_MAX_LEGIONS_REACHED;
import WARNING_DOCK_OPEN_WATER_NEEDED = warning_type.WARNING_DOCK_OPEN_WATER_NEEDED;
import GROUP_BUILDING_TOWER = group_terrain.GROUP_BUILDING_TOWER;
import GROUP_BUILDING_MARKET = group_terrain.GROUP_BUILDING_MARKET;
import GROUP_BUILDING_WELL = group_terrain.GROUP_BUILDING_WELL;
import GROUP_BUILDING_HOUSE_TENT = group_terrain.GROUP_BUILDING_HOUSE_TENT;
import GROUP_BUILDING_HOUSE_SHACK = group_terrain.GROUP_BUILDING_HOUSE_SHACK;
import GROUP_BUILDING_HOUSE_HOVEL = group_terrain.GROUP_BUILDING_HOUSE_HOVEL;
import GROUP_BUILDING_HOUSE_CASA = group_terrain.GROUP_BUILDING_HOUSE_CASA;
import GROUP_BUILDING_HOUSE_INSULA_1 = group_terrain.GROUP_BUILDING_HOUSE_INSULA_1;
import GROUP_BUILDING_HOUSE_INSULA_2 = group_terrain.GROUP_BUILDING_HOUSE_INSULA_2;
import GROUP_BUILDING_HOUSE_VILLA_1 = group_terrain.GROUP_BUILDING_HOUSE_VILLA_1;
import GROUP_BUILDING_HOUSE_VILLA_2 = group_terrain.GROUP_BUILDING_HOUSE_VILLA_2;
import GROUP_BUILDING_HOUSE_PALACE_1 = group_terrain.GROUP_BUILDING_HOUSE_PALACE_1;
import GROUP_BUILDING_HOUSE_PALACE_2 = group_terrain.GROUP_BUILDING_HOUSE_PALACE_2;
import GROUP_BUILDING_MARBLE_QUARRY = group_terrain.GROUP_BUILDING_MARBLE_QUARRY;
import GROUP_BUILDING_IRON_MINE = group_terrain.GROUP_BUILDING_IRON_MINE;
import GROUP_BUILDING_CLAY_PIT = group_terrain.GROUP_BUILDING_CLAY_PIT;
import GROUP_BUILDING_SCHOOL = group_terrain.GROUP_BUILDING_SCHOOL;
import GROUP_BUILDING_LIBRARY = group_terrain.GROUP_BUILDING_LIBRARY;
import GROUP_BUILDING_ACADEMY = group_terrain.GROUP_BUILDING_ACADEMY;
import GROUP_BUILDING_WINE_WORKSHOP = group_terrain.GROUP_BUILDING_WINE_WORKSHOP;
import GROUP_BUILDING_AMPHITHEATER = group_terrain.GROUP_BUILDING_AMPHITHEATER;
import GROUP_BUILDING_THEATER = group_terrain.GROUP_BUILDING_THEATER;
import GROUP_BUILDING_COLOSSEUM = group_terrain.GROUP_BUILDING_COLOSSEUM;
import GROUP_BUILDING_GLADIATOR_SCHOOL = group_terrain.GROUP_BUILDING_GLADIATOR_SCHOOL;
import GROUP_BUILDING_LION_HOUSE = group_terrain.GROUP_BUILDING_LION_HOUSE;
import GROUP_BUILDING_ACTOR_COLONY = group_terrain.GROUP_BUILDING_ACTOR_COLONY;
import GROUP_BUILDING_CHARIOT_MAKER = group_terrain.GROUP_BUILDING_CHARIOT_MAKER;
import GROUP_BUILDING_FOUNTAIN_1 = group_terrain.GROUP_BUILDING_FOUNTAIN_1;
import GROUP_BUILDING_STATUE = group_terrain.GROUP_BUILDING_STATUE;
import GROUP_BUILDING_SENATE = group_terrain.GROUP_BUILDING_SENATE;
import GROUP_BUILDING_FORUM = group_terrain.GROUP_BUILDING_FORUM;
import GROUP_BUILDING_PREFECTURE = group_terrain.GROUP_BUILDING_PREFECTURE;
import GROUP_BUILDING_TIMBER_YARD = group_terrain.GROUP_BUILDING_TIMBER_YARD;
import GROUP_BUILDING_FORT = group_terrain.GROUP_BUILDING_FORT;
import GROUP_BUILDING_BARBER = group_terrain.GROUP_BUILDING_BARBER;
import GROUP_BUILDING_DOCTOR = group_terrain.GROUP_BUILDING_DOCTOR;
import GROUP_BUILDING_HOSPITAL = group_terrain.GROUP_BUILDING_HOSPITAL;
import GROUP_BUILDING_TEMPLE_CERES = group_terrain.GROUP_BUILDING_TEMPLE_CERES;
import GROUP_BUILDING_TEMPLE_NEPTUNE = group_terrain.GROUP_BUILDING_TEMPLE_NEPTUNE;
import GROUP_BUILDING_TEMPLE_MERCURY = group_terrain.GROUP_BUILDING_TEMPLE_MERCURY;
import GROUP_BUILDING_TEMPLE_MARS = group_terrain.GROUP_BUILDING_TEMPLE_MARS;
import GROUP_BUILDING_TEMPLE_VENUS = group_terrain.GROUP_BUILDING_TEMPLE_VENUS;
import GROUP_BUILDING_ORACLE = group_terrain.GROUP_BUILDING_ORACLE;
import GROUP_BUILDING_SHIPYARD = group_terrain.GROUP_BUILDING_SHIPYARD;
import GROUP_BUILDING_DOCK_1 = group_terrain.GROUP_BUILDING_DOCK_1;
import GROUP_BUILDING_WHARF = group_terrain.GROUP_BUILDING_WHARF;
import GROUP_BUILDING_ENGINEERS_POST = group_terrain.GROUP_BUILDING_ENGINEERS_POST;
import GROUP_BUILDING_WAREHOUSE = group_terrain.GROUP_BUILDING_WAREHOUSE;
import GROUP_BUILDING_WAREHOUSE_STORAGE_EMPTY = group_terrain.GROUP_BUILDING_WAREHOUSE_STORAGE_EMPTY;
import GROUP_BUILDING_GOVERNORS_HOUSE = group_terrain.GROUP_BUILDING_GOVERNORS_HOUSE;
import GROUP_BUILDING_GOVERNORS_VILLA = group_terrain.GROUP_BUILDING_GOVERNORS_VILLA;
import GROUP_BUILDING_GOVERNORS_PALACE = group_terrain.GROUP_BUILDING_GOVERNORS_PALACE;
import GROUP_BUILDING_GRANARY = group_terrain.GROUP_BUILDING_GRANARY;
import GROUP_BUILDING_FARM_CROPS = group_terrain.GROUP_BUILDING_FARM_CROPS;
import GROUP_BUILDING_OIL_WORKSHOP = group_terrain.GROUP_BUILDING_OIL_WORKSHOP;
import GROUP_BUILDING_WEAPONS_WORKSHOP = group_terrain.GROUP_BUILDING_WEAPONS_WORKSHOP;
import GROUP_BUILDING_FURNITURE_WORKSHOP = group_terrain.GROUP_BUILDING_FURNITURE_WORKSHOP;
import GROUP_BUILDING_POTTERY_WORKSHOP = group_terrain.GROUP_BUILDING_POTTERY_WORKSHOP;
import GROUP_BUILDING_BARRACKS = group_terrain.GROUP_BUILDING_BARRACKS;
import GROUP_BUILDING_DOCK_2 = group_terrain.GROUP_BUILDING_DOCK_2;
import GROUP_BUILDING_DOCK_3 = group_terrain.GROUP_BUILDING_DOCK_3;
import GROUP_BUILDING_DOCK_4 = group_terrain.GROUP_BUILDING_DOCK_4;
import GROUP_BUILDING_NATIVE = group_terrain.GROUP_BUILDING_NATIVE;
import GROUP_BUILDING_MISSION_POST = group_terrain.GROUP_BUILDING_MISSION_POST;
import GROUP_BUILDING_BATHHOUSE_NO_WATER = group_terrain.GROUP_BUILDING_BATHHOUSE_NO_WATER;
import GROUP_BUILDING_MILITARY_ACADEMY = group_terrain.GROUP_BUILDING_MILITARY_ACADEMY;
import GROUP_BUILDING_TRIUMPHAL_ARCH = group_terrain.GROUP_BUILDING_TRIUMPHAL_ARCH;
import GROUP_BUILDING_HIPPODROME_1 = group_terrain.GROUP_BUILDING_HIPPODROME_1;
import GROUP_BUILDING_HIPPODROME_2 = group_terrain.GROUP_BUILDING_HIPPODROME_2;
import FIGURE_FORT_JAVELIN = figure_type.FIGURE_FORT_JAVELIN;
import FIGURE_FORT_MOUNTED = figure_type.FIGURE_FORT_MOUNTED;
import FIGURE_FORT_LEGIONARY = figure_type.FIGURE_FORT_LEGIONARY;
import TERRAIN_BUILDING = terrain.TERRAIN_BUILDING;
import TERRAIN_ROAD = terrain.TERRAIN_ROAD;
import TERRAIN_WALL = terrain.TERRAIN_WALL;
import TERRAIN_GATEHOUSE = terrain.TERRAIN_GATEHOUSE;
import TERRAIN_ALL = terrain.TERRAIN_ALL;
import DIR_0_TOP = direction_type.DIR_0_TOP;
import DIR_2_RIGHT = direction_type.DIR_2_RIGHT;
import DIR_4_BOTTOM = direction_type.DIR_4_BOTTOM;
import DIR_6_LEFT = direction_type.DIR_6_LEFT;
function add_fort(type: number, fort: building) {
    fort.prev_part_building_id = 0;
    map_building_tiles_add(fort.id, fort.x, fort.y, fort.size, image_group(GROUP_BUILDING_FORT), TERRAIN_BUILDING);
    if (type == BUILDING_FORT_LEGIONARIES) {
        fort.subtype.fort_figure_type = FIGURE_FORT_LEGIONARY;
    } else if (type == BUILDING_FORT_JAVELIN) {
        fort.subtype.fort_figure_type = FIGURE_FORT_JAVELIN;
    } else if (type == BUILDING_FORT_MOUNTED) {
        fort.subtype.fort_figure_type = FIGURE_FORT_MOUNTED;
    }
    fort.formation_id = formation_legion_create_for_fort(fort);
    let ground: building = building_create(BUILDING_FORT_GROUND, fort.x + 3, fort.y - 1);
    game_undo_add_building(ground);
    ground.formation_id = fort.formation_id;
    ground.prev_part_building_id = fort.id;
    fort.next_part_building_id = ground.id;
    ground.next_part_building_id = 0;
    map_building_tiles_add(ground.id, fort.x + 3, fort.y - 1, 4,
        image_group(GROUP_BUILDING_FORT) + 1, TERRAIN_BUILDING);
}
function add_hippodrome(b: building) {
    let image1: number = image_group(GROUP_BUILDING_HIPPODROME_1);
    let image2: number = image_group(GROUP_BUILDING_HIPPODROME_2);
    city_buildings_add_hippodrome();
    let orientation: number = city_view_orientation();
    let part1: building = b;
    if (orientation == DIR_0_TOP || orientation == DIR_4_BOTTOM) {
        part1.subtype.orientation = 0;
    } else {
        part1.subtype.orientation = 3;
    }
    part1.prev_part_building_id = 0;
    let image_id: number;
    switch (orientation) {
        case DIR_0_TOP:
            image_id = image2;
            break
        case DIR_2_RIGHT:
            image_id = image1 + 4;
            break
        case DIR_4_BOTTOM:
            image_id = image2 + 4;
            break
        case DIR_6_LEFT:
            image_id = image1;
            break
        default:
            return
    }
    map_building_tiles_add(b.id, b.x, b.y, b.size, image_id, TERRAIN_BUILDING);
    let part2: building = building_create(BUILDING_HIPPODROME, b.x + 5, b.y);
    game_undo_add_building(part2);
    if (orientation == DIR_0_TOP || orientation == DIR_4_BOTTOM) {
        part2.subtype.orientation = 1;
    } else {
        part2.subtype.orientation = 4;
    }
    part2.prev_part_building_id = part1.id;
    part1.next_part_building_id = part2.id;
    part2.next_part_building_id = 0;
    switch (orientation) {
        case DIR_0_TOP:
        case DIR_4_BOTTOM:
            image_id = image2 + 2;
            break
        case DIR_2_RIGHT:
        case DIR_6_LEFT:
            image_id = image1 + 2;
            break
    }
    map_building_tiles_add(part2.id, b.x + 5, b.y, b.size, image_id, TERRAIN_BUILDING);
    let part3: building = building_create(BUILDING_HIPPODROME, b.x + 10, b.y);
    game_undo_add_building(part3);
    if (orientation == DIR_0_TOP || orientation == DIR_4_BOTTOM) {
        part3.subtype.orientation = 2;
    } else {
        part3.subtype.orientation = 5;
    }
    part3.prev_part_building_id = part2.id;
    part2.next_part_building_id = part3.id;
    part3.next_part_building_id = 0;
    switch (orientation) {
        case DIR_0_TOP:
            image_id = image2 + 4;
            break
        case DIR_2_RIGHT:
            image_id = image1;
            break
        case DIR_4_BOTTOM:
            image_id = image2;
            break
        case DIR_6_LEFT:
            image_id = image1 + 4;
            break
    }
    map_building_tiles_add(part3.id, b.x + 10, b.y, b.size, image_id, TERRAIN_BUILDING);
}
function add_warehouse_space(x: number, y: number, prev: building) {
    let b: building = building_create(BUILDING_WAREHOUSE_SPACE, x, y);
    game_undo_add_building(b);
    b.prev_part_building_id = prev.id;
    prev.next_part_building_id = b.id;
    map_building_tiles_add(b.id, x, y, 1,
        image_group(GROUP_BUILDING_WAREHOUSE_STORAGE_EMPTY), TERRAIN_BUILDING);
    return b;
}
function add_warehouse(b: building) {
    b.storage_id = building_storage_create();
    b.prev_part_building_id = 0;
    map_building_tiles_add(b.id, b.x, b.y, 1, image_group(GROUP_BUILDING_WAREHOUSE), TERRAIN_BUILDING);
    let prev: building = b;
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
function add_building(b: building, image_id: number) {
    map_building_tiles_add(b.id, b.x, b.y, b.size, image_id, TERRAIN_BUILDING);
}
function add_to_map(type: number, b: building, size: number, orientation: number, waterside_orientation_abs: number, waterside_orientation_rel: number) {
    switch (type) {
        case BUILDING_HOUSE_LARGE_TENT:
            add_building(b, image_group(GROUP_BUILDING_HOUSE_TENT) + 2);
            break
        case BUILDING_HOUSE_SMALL_SHACK:
            add_building(b, image_group(GROUP_BUILDING_HOUSE_SHACK));
            break
        case BUILDING_HOUSE_LARGE_SHACK:
            add_building(b, image_group(GROUP_BUILDING_HOUSE_SHACK) + 2);
            break
        case BUILDING_HOUSE_SMALL_HOVEL:
            add_building(b, image_group(GROUP_BUILDING_HOUSE_HOVEL));
            break
        case BUILDING_HOUSE_LARGE_HOVEL:
            add_building(b, image_group(GROUP_BUILDING_HOUSE_HOVEL) + 2);
            break
        case BUILDING_HOUSE_SMALL_CASA:
            add_building(b, image_group(GROUP_BUILDING_HOUSE_CASA));
            break
        case BUILDING_HOUSE_LARGE_CASA:
            add_building(b, image_group(GROUP_BUILDING_HOUSE_CASA) + 2);
            break
        case BUILDING_HOUSE_SMALL_INSULA:
            add_building(b, image_group(GROUP_BUILDING_HOUSE_INSULA_1));
            break
        case BUILDING_HOUSE_MEDIUM_INSULA:
            add_building(b, image_group(GROUP_BUILDING_HOUSE_INSULA_1) + 2);
            break
        case BUILDING_HOUSE_LARGE_INSULA:
            add_building(b, image_group(GROUP_BUILDING_HOUSE_INSULA_2));
            break
        case BUILDING_HOUSE_GRAND_INSULA:
            add_building(b, image_group(GROUP_BUILDING_HOUSE_INSULA_2) + 2);
            break
        case BUILDING_HOUSE_SMALL_VILLA:
            add_building(b, image_group(GROUP_BUILDING_HOUSE_VILLA_1));
            break
        case BUILDING_HOUSE_MEDIUM_VILLA:
            add_building(b, image_group(GROUP_BUILDING_HOUSE_VILLA_1) + 2);
            break
        case BUILDING_HOUSE_LARGE_VILLA:
            add_building(b, image_group(GROUP_BUILDING_HOUSE_VILLA_2));
            break
        case BUILDING_HOUSE_GRAND_VILLA:
            add_building(b, image_group(GROUP_BUILDING_HOUSE_VILLA_2) + 1);
            break
        case BUILDING_HOUSE_SMALL_PALACE:
            add_building(b, image_group(GROUP_BUILDING_HOUSE_PALACE_1));
            break
        case BUILDING_HOUSE_MEDIUM_PALACE:
            add_building(b, image_group(GROUP_BUILDING_HOUSE_PALACE_1) + 1);
            break
        case BUILDING_HOUSE_LARGE_PALACE:
            add_building(b, image_group(GROUP_BUILDING_HOUSE_PALACE_2));
            break
        case BUILDING_HOUSE_LUXURY_PALACE:
            add_building(b, image_group(GROUP_BUILDING_HOUSE_PALACE_2) + 1);
            break
        case BUILDING_AMPHITHEATER:
            add_building(b, image_group(GROUP_BUILDING_AMPHITHEATER));
            break
        case BUILDING_THEATER:
            add_building(b, image_group(GROUP_BUILDING_THEATER));
            break
        case BUILDING_COLOSSEUM:
            add_building(b, image_group(GROUP_BUILDING_COLOSSEUM));
            break
        case BUILDING_GLADIATOR_SCHOOL:
            add_building(b, image_group(GROUP_BUILDING_GLADIATOR_SCHOOL));
            break
        case BUILDING_LION_HOUSE:
            add_building(b, image_group(GROUP_BUILDING_LION_HOUSE));
            break
        case BUILDING_ACTOR_COLONY:
            add_building(b, image_group(GROUP_BUILDING_ACTOR_COLONY));
            break
        case BUILDING_CHARIOT_MAKER:
            add_building(b, image_group(GROUP_BUILDING_CHARIOT_MAKER));
            break
        case BUILDING_SMALL_STATUE:
            add_building(b, image_group(GROUP_BUILDING_STATUE));
            break
        case BUILDING_MEDIUM_STATUE:
            add_building(b, image_group(GROUP_BUILDING_STATUE) + 1);
            break
        case BUILDING_LARGE_STATUE:
            add_building(b, image_group(GROUP_BUILDING_STATUE) + 2);
            break
        case BUILDING_DOCTOR:
            add_building(b, image_group(GROUP_BUILDING_DOCTOR));
            break
        case BUILDING_HOSPITAL:
            add_building(b, image_group(GROUP_BUILDING_HOSPITAL));
            break
        case BUILDING_BATHHOUSE:
            add_building(b, image_group(GROUP_BUILDING_BATHHOUSE_NO_WATER));
            break
        case BUILDING_BARBER:
            add_building(b, image_group(GROUP_BUILDING_BARBER));
            break
        case BUILDING_SCHOOL:
            add_building(b, image_group(GROUP_BUILDING_SCHOOL));
            break
        case BUILDING_ACADEMY:
            add_building(b, image_group(GROUP_BUILDING_ACADEMY));
            break
        case BUILDING_LIBRARY:
            add_building(b, image_group(GROUP_BUILDING_LIBRARY));
            break
        case BUILDING_PREFECTURE:
            add_building(b, image_group(GROUP_BUILDING_PREFECTURE));
            break
        case BUILDING_WHEAT_FARM:
            map_building_tiles_add_farm(b.id, b.x, b.y, image_group(GROUP_BUILDING_FARM_CROPS), 0);
            break
        case BUILDING_VEGETABLE_FARM:
            map_building_tiles_add_farm(b.id, b.x, b.y, image_group(GROUP_BUILDING_FARM_CROPS) + 5, 0);
            break
        case BUILDING_FRUIT_FARM:
            map_building_tiles_add_farm(b.id, b.x, b.y, image_group(GROUP_BUILDING_FARM_CROPS) + 10, 0);
            break
        case BUILDING_OLIVE_FARM:
            map_building_tiles_add_farm(b.id, b.x, b.y, image_group(GROUP_BUILDING_FARM_CROPS) + 15, 0);
            break
        case BUILDING_VINES_FARM:
            map_building_tiles_add_farm(b.id, b.x, b.y, image_group(GROUP_BUILDING_FARM_CROPS) + 20, 0);
            break
        case BUILDING_PIG_FARM:
            map_building_tiles_add_farm(b.id, b.x, b.y, image_group(GROUP_BUILDING_FARM_CROPS) + 25, 0);
            break
        case BUILDING_MARBLE_QUARRY:
            add_building(b, image_group(GROUP_BUILDING_MARBLE_QUARRY));
            break
        case BUILDING_IRON_MINE:
            add_building(b, image_group(GROUP_BUILDING_IRON_MINE));
            break
        case BUILDING_TIMBER_YARD:
            add_building(b, image_group(GROUP_BUILDING_TIMBER_YARD));
            break
        case BUILDING_CLAY_PIT:
            add_building(b, image_group(GROUP_BUILDING_CLAY_PIT));
            break
        case BUILDING_WINE_WORKSHOP:
            add_building(b, image_group(GROUP_BUILDING_WINE_WORKSHOP));
            break
        case BUILDING_OIL_WORKSHOP:
            add_building(b, image_group(GROUP_BUILDING_OIL_WORKSHOP));
            break
        case BUILDING_WEAPONS_WORKSHOP:
            add_building(b, image_group(GROUP_BUILDING_WEAPONS_WORKSHOP));
            break
        case BUILDING_FURNITURE_WORKSHOP:
            add_building(b, image_group(GROUP_BUILDING_FURNITURE_WORKSHOP));
            break
        case BUILDING_POTTERY_WORKSHOP:
            add_building(b, image_group(GROUP_BUILDING_POTTERY_WORKSHOP));
            break
        case BUILDING_GRANARY:
            b.storage_id = building_storage_create();
            add_building(b, image_group(GROUP_BUILDING_GRANARY));
            map_tiles_update_area_roads(b.x, b.y, 5);
            break
        case BUILDING_MARKET:
            add_building(b, image_group(GROUP_BUILDING_MARKET));
            break
        case BUILDING_GOVERNORS_HOUSE:
            add_building(b, image_group(GROUP_BUILDING_GOVERNORS_HOUSE));
            break
        case BUILDING_GOVERNORS_VILLA:
            add_building(b, image_group(GROUP_BUILDING_GOVERNORS_VILLA));
            break
        case BUILDING_GOVERNORS_PALACE:
            add_building(b, image_group(GROUP_BUILDING_GOVERNORS_PALACE));
            break
        case BUILDING_MISSION_POST:
            add_building(b, image_group(GROUP_BUILDING_MISSION_POST));
            break
        case BUILDING_ENGINEERS_POST:
            add_building(b, image_group(GROUP_BUILDING_ENGINEERS_POST));
            break
        case BUILDING_FORUM:
            add_building(b, image_group(GROUP_BUILDING_FORUM));
            break
        case BUILDING_FOUNTAIN:
            add_building(b, image_group(GROUP_BUILDING_FOUNTAIN_1));
            break
        case BUILDING_WELL:
            add_building(b, image_group(GROUP_BUILDING_WELL));
            break
        case BUILDING_MILITARY_ACADEMY:
            add_building(b, image_group(GROUP_BUILDING_MILITARY_ACADEMY));
            break
        case BUILDING_SMALL_TEMPLE_CERES:
            add_building(b, image_group(GROUP_BUILDING_TEMPLE_CERES));
            break
        case BUILDING_SMALL_TEMPLE_NEPTUNE:
            add_building(b, image_group(GROUP_BUILDING_TEMPLE_NEPTUNE));
            break
        case BUILDING_SMALL_TEMPLE_MERCURY:
            add_building(b, image_group(GROUP_BUILDING_TEMPLE_MERCURY));
            break
        case BUILDING_SMALL_TEMPLE_MARS:
            add_building(b, image_group(GROUP_BUILDING_TEMPLE_MARS));
            break
        case BUILDING_SMALL_TEMPLE_VENUS:
            add_building(b, image_group(GROUP_BUILDING_TEMPLE_VENUS));
            break
        case BUILDING_LARGE_TEMPLE_CERES:
            add_building(b, image_group(GROUP_BUILDING_TEMPLE_CERES) + 1);
            break
        case BUILDING_LARGE_TEMPLE_NEPTUNE:
            add_building(b, image_group(GROUP_BUILDING_TEMPLE_NEPTUNE) + 1);
            break
        case BUILDING_LARGE_TEMPLE_MERCURY:
            add_building(b, image_group(GROUP_BUILDING_TEMPLE_MERCURY) + 1);
            break
        case BUILDING_LARGE_TEMPLE_MARS:
            add_building(b, image_group(GROUP_BUILDING_TEMPLE_MARS) + 1);
            break
        case BUILDING_LARGE_TEMPLE_VENUS:
            add_building(b, image_group(GROUP_BUILDING_TEMPLE_VENUS) + 1);
            break
        case BUILDING_ORACLE:
            add_building(b, image_group(GROUP_BUILDING_ORACLE));
            break
        case BUILDING_SHIPYARD:
            b.data.industry.orientation = waterside_orientation_abs;
            map_water_add_building(b.id, b.x, b.y, 2,
                image_group(GROUP_BUILDING_SHIPYARD) + waterside_orientation_rel);
            break
        case BUILDING_WHARF:
            b.data.industry.orientation = waterside_orientation_abs;
            map_water_add_building(b.id, b.x, b.y, 2,
                image_group(GROUP_BUILDING_WHARF) + waterside_orientation_rel);
            break
        case BUILDING_DOCK:
            city_buildings_add_dock();
            b.data.dock.orientation = waterside_orientation_abs;
            {
                let image_id: number;
                switch (waterside_orientation_rel) {
                    case 0:
                        image_id = image_group(GROUP_BUILDING_DOCK_1);
                        break
                    case 1:
                        image_id = image_group(GROUP_BUILDING_DOCK_2);
                        break
                    case 2:
                        image_id = image_group(GROUP_BUILDING_DOCK_3);
                        break
                    default: image_id = image_group(GROUP_BUILDING_DOCK_4)
                        break
                }
                map_water_add_building(b.id, b.x, b.y, size, image_id);
            }
            break
        case BUILDING_TOWER:
            map_terrain_remove_with_radius(b.x, b.y, 2, 0, TERRAIN_WALL);
            map_building_tiles_add(b.id, b.x, b.y, size, image_group(GROUP_BUILDING_TOWER),
                TERRAIN_BUILDING | TERRAIN_GATEHOUSE);
            map_tiles_update_area_walls(b.x, b.y, 5);
            break
        case BUILDING_GATEHOUSE:
            map_building_tiles_add(b.id, b.x, b.y, size,
                image_group(GROUP_BUILDING_TOWER) + orientation, TERRAIN_BUILDING | TERRAIN_GATEHOUSE);
            b.subtype.orientation = orientation;
            map_orientation_update_buildings();
            map_terrain_add_gatehouse_roads(b.x, b.y, orientation);
            map_tiles_update_area_roads(b.x, b.y, 5);
            map_tiles_update_all_plazas();
            map_tiles_update_area_walls(b.x, b.y, 5);
            break
        case BUILDING_TRIUMPHAL_ARCH:
            add_building(b, image_group(GROUP_BUILDING_TRIUMPHAL_ARCH) + orientation - 1);
            b.subtype.orientation = orientation;
            map_orientation_update_buildings();
            map_terrain_add_triumphal_arch_roads(b.x, b.y, orientation);
            map_tiles_update_area_roads(b.x, b.y, 5);
            map_tiles_update_all_plazas();
            city_buildings_build_triumphal_arch();
            building_menu_update();
            building_construction_clear_type();
            break
        case BUILDING_SENATE:
            add_building(b, image_group(GROUP_BUILDING_SENATE));
            city_buildings_add_senate(b);
            break
        case BUILDING_BARRACKS:
            add_building(b, image_group(GROUP_BUILDING_BARRACKS));
            city_buildings_add_barracks(b);
            break
        case BUILDING_WAREHOUSE:
            add_warehouse(b);
            break
        case BUILDING_HIPPODROME:
            add_hippodrome(b);
            break
        case BUILDING_FORT_LEGIONARIES:
        case BUILDING_FORT_JAVELIN:
        case BUILDING_FORT_MOUNTED:
            add_fort(type, b);
            break
        case BUILDING_NATIVE_HUT:
            add_building(b, image_group(GROUP_BUILDING_NATIVE) + (random_byte() & 1));
            break
        case BUILDING_NATIVE_MEETING:
            add_building(b, image_group(GROUP_BUILDING_NATIVE) + 2);
            break
        case BUILDING_NATIVE_CROPS:
            add_building(b, image_group(GROUP_BUILDING_FARM_CROPS));
            break
        case BUILDING_DISTRIBUTION_CENTER_UNUSED:
            city_buildings_add_distribution_center(b);
            break
    }
    map_routing_update_land();
    map_routing_update_walls();
}
export function building_construction_place_building(type: building_type, x: number, y: number) {
    let terrain_mask: number = TERRAIN_ALL;
    if (type == BUILDING_GATEHOUSE || type == BUILDING_TRIUMPHAL_ARCH) {
        terrain_mask = ~TERRAIN_ROAD;
    } else if (type == BUILDING_TOWER) {
        terrain_mask = ~TERRAIN_WALL;
    }
    let size: number = building_properties_for_type(type).size;
    if (type == BUILDING_WAREHOUSE) {
        size = 3;
    }
    let building_orientation: number = 0;
    if (type == BUILDING_GATEHOUSE) {
        building_orientation = map_orientation_for_gatehouse(x, y);
    } else if (type == BUILDING_TRIUMPHAL_ARCH) {
        building_orientation = map_orientation_for_triumphal_arch(x, y);
    }
    switch (city_view_orientation()) {
        case DIR_2_RIGHT:
            x = x - size + 1;
            break
        case DIR_4_BOTTOM:
            x = x - size + 1;
            y = y - size + 1;
            break
        case DIR_6_LEFT:
            y = y - size + 1;
            break
    }
    if (type == BUILDING_GATEHOUSE) {
        if (!map_tiles_are_clear(x, y, size, terrain_mask)) {
            city_warning_show(WARNING_CLEAR_LAND_NEEDED);
            return 0;
        }
        if (!building_orientation) {
            if (building_construction_road_orientation() == 1) {
                building_orientation = 1;
            } else {
                building_orientation = 2;
            }
        }
    }
    if (type == BUILDING_TRIUMPHAL_ARCH) {
        if (!map_tiles_are_clear(x, y, size, terrain_mask)) {
            city_warning_show(WARNING_CLEAR_LAND_NEEDED);
            return 0;
        }
        if (!building_orientation) {
            if (building_construction_road_orientation() == 1) {
                building_orientation = 1;
            } else {
                building_orientation = 3;
            }
        }
    }
    let waterside_orientation_abs: number = 0
    let waterside_orientation_rel: number = 0;
    if (type == BUILDING_SHIPYARD || type == BUILDING_WHARF) {
        if (map_water_determine_orientation_size2(
            x, y, 0, waterside_orientation_abs, waterside_orientation_rel)) {
            city_warning_show(WARNING_SHORE_NEEDED);
            return 0;
        }
    } else if (type == BUILDING_DOCK) {
        if (map_water_determine_orientation_size3(
            x, y, 0, waterside_orientation_abs, waterside_orientation_rel)) {
            city_warning_show(WARNING_SHORE_NEEDED);
            return 0;
        }
        if (!building_dock_is_connected_to_open_water(x, y)) {
            city_warning_show(WARNING_DOCK_OPEN_WATER_NEEDED);
            return 0;
        }
    } else {
        if (!map_tiles_are_clear(x, y, size, terrain_mask)) {
            city_warning_show(WARNING_CLEAR_LAND_NEEDED);
            return 0;
        }
        let warning_id_ref = new Ref(0);
        if (!building_construction_can_place_on_terrain(x, y, warning_id_ref)) {
            city_warning_show(warning_id_ref.v);
            return 0;
        }
    }
    if (building_is_fort(type)) {
        if (!map_tiles_are_clear(x + 3, y - 1, 4, terrain_mask)) {
            city_warning_show(WARNING_CLEAR_LAND_NEEDED);
            return 0;
        }
        if (formation_get_num_legions_cached() >= MAX_LEGIONS) {
            city_warning_show(WARNING_MAX_LEGIONS_REACHED);
            return 0;
        }
    }
    if (type == BUILDING_HIPPODROME) {
        if (city_buildings_has_hippodrome()) {
            city_warning_show(WARNING_ONE_BUILDING_OF_TYPE);
            return 0;
        }
        if (!map_tiles_are_clear(x + 5, y, 5, terrain_mask) ||
            !map_tiles_are_clear(x + 10, y, 5, terrain_mask)) {
            city_warning_show(WARNING_CLEAR_LAND_NEEDED);
            return 0;
        }
    }
    if (type == BUILDING_SENATE && city_buildings_has_senate()) {
        city_warning_show(WARNING_ONE_BUILDING_OF_TYPE);
        return 0;
    }
    if (type == BUILDING_BARRACKS && building_count_total(BUILDING_BARRACKS) > 0) {
        city_warning_show(WARNING_ONE_BUILDING_OF_TYPE);
        return 0;
    }
    building_construction_warning_check_all(type, x, y, size);
    let b: building;
    if (building_is_fort(type)) {
        b = building_create(BUILDING_FORT, x, y);
    } else {
        b = building_create(type, x, y);
    }
    game_undo_add_building(b);
    if (b.id <= 0) {
        return 0;
    }
    add_to_map(type, b, size, building_orientation, waterside_orientation_abs, waterside_orientation_rel);
    return 1;
}
