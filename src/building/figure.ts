
import { building_barracks_create_soldier, building_barracks_create_tower_sentry, building_barracks_decay_tower_sentry_request, building_barracks_request_tower_sentry } from 'building/barracks';
import { building, building_get, building_get_highest_id, building_next } from 'building/building';
import { building_granary_determine_worker_task, granary_task } from 'building/granary';
import { building_industry_has_produced_resource, building_industry_start_new_production } from 'building/industry';
import { building_market_get_storage_destination } from 'building/market';
import { model_get_building } from 'building/model';
import { building_state, building_type } from 'building/type';
import { building_warehouse_determine_worker_task, warehouse_task } from 'building/warehouse';
import { city_buildings_is_mission_post_operational, city_buildings_set_mission_post_operational } from 'city/buildings';
import { city_entertainment_hippodrome_has_race, city_entertainment_show_message_colosseum, city_entertainment_show_message_hippodrome } from 'city/entertainment';
import { city_message_post, city_message_type } from 'city/message';
import { city_population } from 'city/population';
import { calc_percentage } from 'core/calc';
import { direction_type } from 'core/direction';
import { image_group } from 'core/image';
import { group_terrain } from 'core/image_group';
import { figure_action } from 'figure/action';
import { figure, figure_create, figure_get } from 'figure/figure';
import { formation_legion_update_recruit_status } from 'figure/formation_legion';
import { figure_movement_init_roaming } from 'figure/movement';
import { figure_state, figure_type } from 'figure/type';
import { resource_type } from 'game/resource';
import { map_building_tiles_add } from 'map/building_tiles';
import { map_desirability_get } from 'map/desirability';
import { map_image_set } from 'map/image';
import { map_point } from 'map/point';
import { map_random_get } from 'map/random';
import { map_has_road_access, map_has_road_access_granary, map_has_road_access_hippodrome } from 'map/road_access';
import { map_terrain_exists_tile_in_area_with_type, map_terrain_get_adjacent_road_or_clear_land, terrain } from 'map/terrain';
import { map_water_can_spawn_fishing_boat } from 'map/water';
import { Ref } from '../../ext/crt';
import BUILDING_HOUSE_SMALL_VILLA = building_type.BUILDING_HOUSE_SMALL_VILLA;
import BUILDING_HOUSE_LUXURY_PALACE = building_type.BUILDING_HOUSE_LUXURY_PALACE;
import BUILDING_AMPHITHEATER = building_type.BUILDING_AMPHITHEATER;
import BUILDING_THEATER = building_type.BUILDING_THEATER;
import BUILDING_HIPPODROME = building_type.BUILDING_HIPPODROME;
import BUILDING_COLOSSEUM = building_type.BUILDING_COLOSSEUM;
import BUILDING_GLADIATOR_SCHOOL = building_type.BUILDING_GLADIATOR_SCHOOL;
import BUILDING_LION_HOUSE = building_type.BUILDING_LION_HOUSE;
import BUILDING_ACTOR_COLONY = building_type.BUILDING_ACTOR_COLONY;
import BUILDING_CHARIOT_MAKER = building_type.BUILDING_CHARIOT_MAKER;
import BUILDING_DOCTOR = building_type.BUILDING_DOCTOR;
import BUILDING_HOSPITAL = building_type.BUILDING_HOSPITAL;
import BUILDING_BATHHOUSE = building_type.BUILDING_BATHHOUSE;
import BUILDING_BARBER = building_type.BUILDING_BARBER;
import BUILDING_SCHOOL = building_type.BUILDING_SCHOOL;
import BUILDING_ACADEMY = building_type.BUILDING_ACADEMY;
import BUILDING_LIBRARY = building_type.BUILDING_LIBRARY;
import BUILDING_PREFECTURE = building_type.BUILDING_PREFECTURE;
import BUILDING_FORT = building_type.BUILDING_FORT;
import BUILDING_TOWER = building_type.BUILDING_TOWER;
import BUILDING_SMALL_TEMPLE_CERES = building_type.BUILDING_SMALL_TEMPLE_CERES;
import BUILDING_LARGE_TEMPLE_VENUS = building_type.BUILDING_LARGE_TEMPLE_VENUS;
import BUILDING_MARKET = building_type.BUILDING_MARKET;
import BUILDING_GRANARY = building_type.BUILDING_GRANARY;
import BUILDING_WAREHOUSE = building_type.BUILDING_WAREHOUSE;
import BUILDING_WAREHOUSE_SPACE = building_type.BUILDING_WAREHOUSE_SPACE;
import BUILDING_SHIPYARD = building_type.BUILDING_SHIPYARD;
import BUILDING_DOCK = building_type.BUILDING_DOCK;
import BUILDING_WHARF = building_type.BUILDING_WHARF;
import BUILDING_MISSION_POST = building_type.BUILDING_MISSION_POST;
import BUILDING_ENGINEERS_POST = building_type.BUILDING_ENGINEERS_POST;
import BUILDING_SENATE_1_UNUSED = building_type.BUILDING_SENATE_1_UNUSED;
import BUILDING_SENATE = building_type.BUILDING_SENATE;
import BUILDING_FORUM_2_UNUSED = building_type.BUILDING_FORUM_2_UNUSED;
import BUILDING_NATIVE_HUT = building_type.BUILDING_NATIVE_HUT;
import BUILDING_NATIVE_MEETING = building_type.BUILDING_NATIVE_MEETING;
import BUILDING_NATIVE_CROPS = building_type.BUILDING_NATIVE_CROPS;
import BUILDING_MILITARY_ACADEMY = building_type.BUILDING_MILITARY_ACADEMY;
import BUILDING_BARRACKS = building_type.BUILDING_BARRACKS;
import BUILDING_WHEAT_FARM = building_type.BUILDING_WHEAT_FARM;
import BUILDING_POTTERY_WORKSHOP = building_type.BUILDING_POTTERY_WORKSHOP;
import BUILDING_STATE_IN_USE = building_state.BUILDING_STATE_IN_USE;;
import GRANARY_TASK_NONE = granary_task.GRANARY_TASK_NONE;
import WAREHOUSE_TASK_NONE = warehouse_task.WAREHOUSE_TASK_NONE;
import WAREHOUSE_TASK_GETTING = warehouse_task.WAREHOUSE_TASK_GETTING;
import MESSAGE_WORKING_HIPPODROME = city_message_type.MESSAGE_WORKING_HIPPODROME;
import MESSAGE_WORKING_COLOSSEUM = city_message_type.MESSAGE_WORKING_COLOSSEUM;
import DIR_0_TOP = direction_type.DIR_0_TOP;
import DIR_2_RIGHT = direction_type.DIR_2_RIGHT;
import DIR_4_BOTTOM = direction_type.DIR_4_BOTTOM;
import GROUP_BUILDING_MARKET = group_terrain.GROUP_BUILDING_MARKET;
import GROUP_BUILDING_SENATE = group_terrain.GROUP_BUILDING_SENATE;
import GROUP_BUILDING_BATHHOUSE_WATER = group_terrain.GROUP_BUILDING_BATHHOUSE_WATER;
import GROUP_BUILDING_FARM_CROPS = group_terrain.GROUP_BUILDING_FARM_CROPS;
import GROUP_BUILDING_NATIVE = group_terrain.GROUP_BUILDING_NATIVE;
import GROUP_BUILDING_BATHHOUSE_NO_WATER = group_terrain.GROUP_BUILDING_BATHHOUSE_NO_WATER;
import GROUP_BUILDING_MARKET_FANCY = group_terrain.GROUP_BUILDING_MARKET_FANCY;
import GROUP_BUILDING_BATHHOUSE_FANCY_WATER = group_terrain.GROUP_BUILDING_BATHHOUSE_FANCY_WATER;
import GROUP_BUILDING_BATHHOUSE_FANCY_NO_WATER = group_terrain.GROUP_BUILDING_BATHHOUSE_FANCY_NO_WATER;
import GROUP_BUILDING_SENATE_FANCY = group_terrain.GROUP_BUILDING_SENATE_FANCY;
import FIGURE_ACTION_20_CARTPUSHER_INITIAL = figure_action.FIGURE_ACTION_20_CARTPUSHER_INITIAL;
import FIGURE_ACTION_40_TAX_COLLECTOR_CREATED = figure_action.FIGURE_ACTION_40_TAX_COLLECTOR_CREATED;
import FIGURE_ACTION_50_WAREHOUSEMAN_CREATED = figure_action.FIGURE_ACTION_50_WAREHOUSEMAN_CREATED;
import FIGURE_ACTION_60_ENGINEER_CREATED = figure_action.FIGURE_ACTION_60_ENGINEER_CREATED;
import FIGURE_ACTION_70_PREFECT_CREATED = figure_action.FIGURE_ACTION_70_PREFECT_CREATED;
import FIGURE_ACTION_90_ENTERTAINER_AT_SCHOOL_CREATED = figure_action.FIGURE_ACTION_90_ENTERTAINER_AT_SCHOOL_CREATED;
import FIGURE_ACTION_94_ENTERTAINER_ROAMING = figure_action.FIGURE_ACTION_94_ENTERTAINER_ROAMING;
import FIGURE_ACTION_125_ROAMING = figure_action.FIGURE_ACTION_125_ROAMING;
import FIGURE_ACTION_132_DOCKER_IDLING = figure_action.FIGURE_ACTION_132_DOCKER_IDLING;
import FIGURE_ACTION_145_MARKET_BUYER_GOING_TO_STORAGE = figure_action.FIGURE_ACTION_145_MARKET_BUYER_GOING_TO_STORAGE;
import FIGURE_ACTION_146_MARKET_BUYER_RETURNING = figure_action.FIGURE_ACTION_146_MARKET_BUYER_RETURNING;
import FIGURE_ACTION_158_NATIVE_CREATED = figure_action.FIGURE_ACTION_158_NATIVE_CREATED;
import FIGURE_ACTION_162_NATIVE_TRADER_CREATED = figure_action.FIGURE_ACTION_162_NATIVE_TRADER_CREATED;
import FIGURE_ACTION_180_BALLISTA_CREATED = figure_action.FIGURE_ACTION_180_BALLISTA_CREATED;
import FIGURE_ACTION_190_FISHING_BOAT_CREATED = figure_action.FIGURE_ACTION_190_FISHING_BOAT_CREATED;
import FIGURE_ACTION_200_HIPPODROME_HORSE_CREATED = figure_action.FIGURE_ACTION_200_HIPPODROME_HORSE_CREATED;
import FIGURE_CART_PUSHER = figure_type.FIGURE_CART_PUSHER;
import FIGURE_LABOR_SEEKER = figure_type.FIGURE_LABOR_SEEKER;
import FIGURE_TAX_COLLECTOR = figure_type.FIGURE_TAX_COLLECTOR;
import FIGURE_ENGINEER = figure_type.FIGURE_ENGINEER;
import FIGURE_WAREHOUSEMAN = figure_type.FIGURE_WAREHOUSEMAN;
import FIGURE_PREFECT = figure_type.FIGURE_PREFECT;
import FIGURE_ACTOR = figure_type.FIGURE_ACTOR;
import FIGURE_GLADIATOR = figure_type.FIGURE_GLADIATOR;
import FIGURE_LION_TAMER = figure_type.FIGURE_LION_TAMER;
import FIGURE_CHARIOTEER = figure_type.FIGURE_CHARIOTEER;
import FIGURE_FISHING_BOAT = figure_type.FIGURE_FISHING_BOAT;
import FIGURE_MARKET_TRADER = figure_type.FIGURE_MARKET_TRADER;
import FIGURE_PRIEST = figure_type.FIGURE_PRIEST;
import FIGURE_SCHOOL_CHILD = figure_type.FIGURE_SCHOOL_CHILD;
import FIGURE_TEACHER = figure_type.FIGURE_TEACHER;
import FIGURE_LIBRARIAN = figure_type.FIGURE_LIBRARIAN;
import FIGURE_BARBER = figure_type.FIGURE_BARBER;
import FIGURE_BATHHOUSE_WORKER = figure_type.FIGURE_BATHHOUSE_WORKER;
import FIGURE_DOCTOR = figure_type.FIGURE_DOCTOR;
import FIGURE_SURGEON = figure_type.FIGURE_SURGEON;
import FIGURE_DOCKER = figure_type.FIGURE_DOCKER;
import FIGURE_MARKET_BUYER = figure_type.FIGURE_MARKET_BUYER;
import FIGURE_PATRICIAN = figure_type.FIGURE_PATRICIAN;
import FIGURE_INDIGENOUS_NATIVE = figure_type.FIGURE_INDIGENOUS_NATIVE;
import FIGURE_TOWER_SENTRY = figure_type.FIGURE_TOWER_SENTRY;
import FIGURE_NATIVE_TRADER = figure_type.FIGURE_NATIVE_TRADER;
import FIGURE_BALLISTA = figure_type.FIGURE_BALLISTA;
import FIGURE_MISSIONARY = figure_type.FIGURE_MISSIONARY;
import FIGURE_HIPPODROME_HORSES = figure_type.FIGURE_HIPPODROME_HORSES;
import FIGURE_STATE_ALIVE = figure_state.FIGURE_STATE_ALIVE;
import FIGURE_STATE_DEAD = figure_state.FIGURE_STATE_DEAD;
import RESOURCE_NONE = resource_type.RESOURCE_NONE;
import RESOURCE_MEAT = resource_type.RESOURCE_MEAT;
import TERRAIN_BUILDING = terrain.TERRAIN_BUILDING;
import TERRAIN_RESERVOIR_RANGE = terrain.TERRAIN_RESERVOIR_RANGE;
import TERRAIN_WALL = terrain.TERRAIN_WALL;
import TERRAIN_GATEHOUSE = terrain.TERRAIN_GATEHOUSE;
function worker_percentage(b: building) {
    return calc_percentage(b.num_workers, model_get_building(b.type).laborers);
}
function check_labor_problem(b: building) {
    if (b.houses_covered <= 0) {
        b.show_on_problem_overlay = 2;
    }
}
function generate_labor_seeker(b: building, x: number, y: number) {
    if (city_population() <= 0) {
        return;
    }
    if (b.figure_id2) {
        let f: figure = figure_get(b.figure_id2);
        if (!f.state || f.type != FIGURE_LABOR_SEEKER || f.building_id != b.id) {
            b.figure_id2 = 0;
        }
    } else {
        let f: figure = figure_create(FIGURE_LABOR_SEEKER, x, y, DIR_0_TOP);
        f.action_state = FIGURE_ACTION_125_ROAMING;
        f.building_id = b.id;
        b.figure_id2 = f.id;
        figure_movement_init_roaming(f);
    }
}
function spawn_labor_seeker(b: building, x: number, y: number, min_houses: number) {
    if (b.houses_covered <= min_houses) {
        generate_labor_seeker(b, x, y);
    }
}
function has_figure_of_types(b: building, type1: figure_type, type2: figure_type) {
    if (b.figure_id <= 0) {
        return 0;
    }
    let f: figure = figure_get(b.figure_id);
    if (f.state && f.building_id == b.id && (f.type == type1 || f.type == type2)) {
        return 1;
    } else {
        b.figure_id = 0;
        return 0;
    }
}
function has_figure_of_type(b: building, type: figure_type) {
    return has_figure_of_types(b, type, 0);
}
function default_spawn_delay(b: building) {
    let pct_workers: number = worker_percentage(b);
    if (pct_workers >= 100) {
        return 3;
    } else if (pct_workers >= 75) {
        return 7;
    } else if (pct_workers >= 50) {
        return 15;
    } else if (pct_workers >= 25) {
        return 29;
    } else if (pct_workers >= 1) {
        return 44;
    } else {
        return 0;
    }
}
function create_roaming_figure(b: building, x: number, y: number, type: figure_type) {
    let f: figure = figure_create(type, x, y, DIR_0_TOP);
    f.action_state = FIGURE_ACTION_125_ROAMING;
    f.building_id = b.id;
    b.figure_id = f.id;
    figure_movement_init_roaming(f);
}
function spawn_patrician(b: building, spawned: number) {
    let road: map_point;
    if (map_has_road_access(b.x, b.y, b.size, road)) {
        b.figure_spawn_delay++;
        if (b.figure_spawn_delay > 40 && !spawned) {
            b.figure_spawn_delay = 0;
            let f: figure = figure_create(FIGURE_PATRICIAN, road.x, road.y, DIR_4_BOTTOM);
            f.action_state = FIGURE_ACTION_125_ROAMING;
            f.building_id = b.id;
            figure_movement_init_roaming(f);
            return 1;
        }
    }
    return spawned;
}
function spawn_figure_warehouse(b: building) {
    check_labor_problem(b);
    let space: building = b;
    for (let i: number = 0; i < 8; i++) {
        space = building_next(space);
        if (space.id) {
            space.show_on_problem_overlay = b.show_on_problem_overlay;
        }
    }
    let road: map_point;
    if (map_has_road_access(b.x, b.y, b.size, road) ||
        map_has_road_access(b.x, b.y, 3, road)) {
        spawn_labor_seeker(b, road.x, road.y, 100);
        if (has_figure_of_type(b, FIGURE_WAREHOUSEMAN)) {
            return;
        }
        let resource: number;
        let resource_ref: Ref<number>;
        let task: number = building_warehouse_determine_worker_task(b, resource_ref);
        resource = resource_ref.v;
        if (task != WAREHOUSE_TASK_NONE) {
            let f: figure = figure_create(FIGURE_WAREHOUSEMAN, road.x, road.y, DIR_4_BOTTOM);
            f.action_state = FIGURE_ACTION_50_WAREHOUSEMAN_CREATED;
            if (task == WAREHOUSE_TASK_GETTING) {
                f.resource_id = RESOURCE_NONE;
                f.collecting_item_id = resource;
            } else {
                f.resource_id = resource;
            }
            b.figure_id = f.id;
            f.building_id = b.id;
        }
    }
}
function spawn_figure_granary(b: building) {
    check_labor_problem(b);
    let road: map_point;
    if (map_has_road_access_granary(b.x, b.y, road)) {
        spawn_labor_seeker(b, road.x, road.y, 100);
        if (has_figure_of_type(b, FIGURE_WAREHOUSEMAN)) {
            return;
        }
        let task: number = building_granary_determine_worker_task(b);
        if (task != GRANARY_TASK_NONE) {
            let f: figure = figure_create(FIGURE_WAREHOUSEMAN, road.x, road.y, DIR_4_BOTTOM);
            f.action_state = FIGURE_ACTION_50_WAREHOUSEMAN_CREATED;
            f.resource_id = task;
            b.figure_id = f.id;
            f.building_id = b.id;
        }
    }
}
function spawn_figure_tower(b: building) {
    check_labor_problem(b);
    let road: map_point;
    if (map_has_road_access(b.x, b.y, b.size, road)) {
        spawn_labor_seeker(b, road.x, road.y, 50);
        if (b.num_workers <= 0) {
            return;
        }
        if (!b.figure_id4 && b.figure_id) {
            let f: figure = figure_create(FIGURE_BALLISTA, b.x, b.y, DIR_0_TOP);
            b.figure_id4 = f.id;
            f.building_id = b.id;
            f.action_state = FIGURE_ACTION_180_BALLISTA_CREATED;
        }
        has_figure_of_type(b, FIGURE_TOWER_SENTRY);
        if (b.figure_id <= 0) {
            building_barracks_request_tower_sentry();
        }
    }
}
function spawn_figure_engineers_post(b: building) {
    check_labor_problem(b);
    if (has_figure_of_type(b, FIGURE_ENGINEER)) {
        return;
    }
    let road: map_point;
    if (map_has_road_access(b.x, b.y, b.size, road)) {
        spawn_labor_seeker(b, road.x, road.y, 100);
        let pct_workers: number = worker_percentage(b);
        let spawn_delay: number;
        if (pct_workers >= 100) {
            spawn_delay = 0;
        } else if (pct_workers >= 75) {
            spawn_delay = 1;
        } else if (pct_workers >= 50) {
            spawn_delay = 3;
        } else if (pct_workers >= 25) {
            spawn_delay = 7;
        } else if (pct_workers >= 1) {
            spawn_delay = 15;
        } else {
            return;
        }
        b.figure_spawn_delay++;
        if (b.figure_spawn_delay > spawn_delay) {
            b.figure_spawn_delay = 0;
            let f: figure = figure_create(FIGURE_ENGINEER, road.x, road.y, DIR_0_TOP);
            f.action_state = FIGURE_ACTION_60_ENGINEER_CREATED;
            f.building_id = b.id;
            b.figure_id = f.id;
        }
    }
}
function spawn_figure_prefecture(b: building) {
    check_labor_problem(b);
    if (has_figure_of_type(b, FIGURE_PREFECT)) {
        return;
    }
    let road: map_point;
    if (map_has_road_access(b.x, b.y, b.size, road)) {
        spawn_labor_seeker(b, road.x, road.y, 100);
        let pct_workers: number = worker_percentage(b);
        let spawn_delay: number;
        if (pct_workers >= 100) {
            spawn_delay = 0;
        } else if (pct_workers >= 75) {
            spawn_delay = 1;
        } else if (pct_workers >= 50) {
            spawn_delay = 3;
        } else if (pct_workers >= 25) {
            spawn_delay = 7;
        } else if (pct_workers >= 1) {
            spawn_delay = 15;
        } else {
            return;
        }
        b.figure_spawn_delay++;
        if (b.figure_spawn_delay > spawn_delay) {
            b.figure_spawn_delay = 0;
            let f: figure = figure_create(FIGURE_PREFECT, road.x, road.y, DIR_0_TOP);
            f.action_state = FIGURE_ACTION_70_PREFECT_CREATED;
            f.building_id = b.id;
            b.figure_id = f.id;
        }
    }
}
function spawn_figure_actor_colony(b: building) {
    check_labor_problem(b);
    let road: map_point;
    if (map_has_road_access(b.x, b.y, b.size, road)) {
        spawn_labor_seeker(b, road.x, road.y, 50);
        let spawn_delay: number = default_spawn_delay(b);
        if (!spawn_delay) {
            return;
        }
        b.figure_spawn_delay++;
        if (b.figure_spawn_delay > spawn_delay) {
            b.figure_spawn_delay = 0;
            let f: figure = figure_create(FIGURE_ACTOR, road.x, road.y, DIR_0_TOP);
            f.action_state = FIGURE_ACTION_90_ENTERTAINER_AT_SCHOOL_CREATED;
            f.building_id = b.id;
            b.figure_id = f.id;
        }
    }
}
function spawn_figure_gladiator_school(b: building) {
    check_labor_problem(b);
    let road: map_point;
    if (map_has_road_access(b.x, b.y, b.size, road)) {
        spawn_labor_seeker(b, road.x, road.y, 50);
        let spawn_delay: number = default_spawn_delay(b);
        if (!spawn_delay) {
            return;
        }
        b.figure_spawn_delay++;
        if (b.figure_spawn_delay > spawn_delay) {
            b.figure_spawn_delay = 0;
            let f: figure = figure_create(FIGURE_GLADIATOR, road.x, road.y, DIR_0_TOP);
            f.action_state = FIGURE_ACTION_90_ENTERTAINER_AT_SCHOOL_CREATED;
            f.building_id = b.id;
            b.figure_id = f.id;
        }
    }
}
function spawn_figure_lion_house(b: building) {
    check_labor_problem(b);
    let road: map_point;
    if (map_has_road_access(b.x, b.y, b.size, road)) {
        spawn_labor_seeker(b, road.x, road.y, 50);
        let pct_workers: number = worker_percentage(b);
        let spawn_delay: number;
        if (pct_workers >= 100) {
            spawn_delay = 5;
        } else if (pct_workers >= 75) {
            spawn_delay = 10;
        } else if (pct_workers >= 50) {
            spawn_delay = 20;
        } else if (pct_workers >= 25) {
            spawn_delay = 35;
        } else if (pct_workers >= 1) {
            spawn_delay = 60;
        } else {
            return;
        }
        b.figure_spawn_delay++;
        if (b.figure_spawn_delay > spawn_delay) {
            b.figure_spawn_delay = 0;
            let f: figure = figure_create(FIGURE_LION_TAMER, road.x, road.y, DIR_0_TOP);
            f.action_state = FIGURE_ACTION_90_ENTERTAINER_AT_SCHOOL_CREATED;
            f.building_id = b.id;
            b.figure_id = f.id;
        }
    }
}
function spawn_figure_chariot_maker(b: building) {
    check_labor_problem(b);
    let road: map_point;
    if (map_has_road_access(b.x, b.y, b.size, road)) {
        spawn_labor_seeker(b, road.x, road.y, 50);
        let pct_workers: number = worker_percentage(b);
        let spawn_delay: number;
        if (pct_workers >= 100) {
            spawn_delay = 7;
        } else if (pct_workers >= 75) {
            spawn_delay = 15;
        } else if (pct_workers >= 50) {
            spawn_delay = 30;
        } else if (pct_workers >= 25) {
            spawn_delay = 60;
        } else if (pct_workers >= 1) {
            spawn_delay = 90;
        } else {
            return;
        }
        b.figure_spawn_delay++;
        if (b.figure_spawn_delay > spawn_delay) {
            b.figure_spawn_delay = 0;
            let f: figure = figure_create(FIGURE_CHARIOTEER, road.x, road.y, DIR_0_TOP);
            f.action_state = FIGURE_ACTION_90_ENTERTAINER_AT_SCHOOL_CREATED;
            f.building_id = b.id;
            b.figure_id = f.id;
        }
    }
}
function spawn_figure_amphitheater(b: building) {
    check_labor_problem(b);
    if (has_figure_of_types(b, FIGURE_ACTOR, FIGURE_GLADIATOR)) {
        return;
    }
    let road: map_point;
    if (map_has_road_access(b.x, b.y, b.size, road)) {
        if (b.houses_covered <= 50 ||
            (b.data.entertainment.days1 <= 0 && b.data.entertainment.days2 <= 0)) {
            generate_labor_seeker(b, road.x, road.y);
        }
        let pct_workers: number = worker_percentage(b);
        let spawn_delay: number;
        if (pct_workers >= 100) {
            spawn_delay = 3;
        } else if (pct_workers >= 75) {
            spawn_delay = 7;
        } else if (pct_workers >= 50) {
            spawn_delay = 15;
        } else if (pct_workers >= 25) {
            spawn_delay = 29;
        } else if (pct_workers >= 1) {
            spawn_delay = 44;
        } else {
            return;
        }
        b.figure_spawn_delay++;
        if (b.figure_spawn_delay > spawn_delay) {
            b.figure_spawn_delay = 0;
            let f: figure;
            if (b.data.entertainment.days1 > 0) {
                f = figure_create(FIGURE_GLADIATOR, road.x, road.y, DIR_0_TOP);
            } else {
                f = figure_create(FIGURE_ACTOR, road.x, road.y, DIR_0_TOP);
            }
            f.action_state = FIGURE_ACTION_94_ENTERTAINER_ROAMING;
            f.building_id = b.id;
            b.figure_id = f.id;
            figure_movement_init_roaming(f);
        }
    }
}
function spawn_figure_theater(b: building) {
    check_labor_problem(b);
    if (has_figure_of_type(b, FIGURE_ACTOR)) {
        return;
    }
    let road: map_point;
    if (map_has_road_access(b.x, b.y, b.size, road)) {
        if (b.houses_covered <= 50 || b.data.entertainment.days1 <= 0) {
            generate_labor_seeker(b, road.x, road.y);
        }
        let spawn_delay: number = default_spawn_delay(b);
        if (!spawn_delay) {
            return;
        }
        b.figure_spawn_delay++;
        if (b.figure_spawn_delay > spawn_delay) {
            b.figure_spawn_delay = 0;
            let f: figure = figure_create(FIGURE_ACTOR, road.x, road.y, DIR_0_TOP);
            f.action_state = FIGURE_ACTION_94_ENTERTAINER_ROAMING;
            f.building_id = b.id;
            b.figure_id = f.id;
            figure_movement_init_roaming(f);
        }
    }
}
function spawn_figure_hippodrome(b: building) {
    check_labor_problem(b);
    if (b.prev_part_building_id) {
        return;
    }
    let part: building = b;
    for (let i: number = 0; i < 2; i++) {
        part = building_next(part);
        if (part.id) {
            part.show_on_problem_overlay = b.show_on_problem_overlay;
        }
    }
    if (has_figure_of_type(b, FIGURE_CHARIOTEER)) {
        return;
    }
    let road: map_point;
    if (map_has_road_access_hippodrome(b.x, b.y, road)) {
        if (b.houses_covered <= 50 || b.data.entertainment.days1 <= 0) {
            generate_labor_seeker(b, road.x, road.y);
        }
        let pct_workers: number = worker_percentage(b);
        let spawn_delay: number;
        if (pct_workers >= 100) {
            spawn_delay = 7;
        } else if (pct_workers >= 75) {
            spawn_delay = 15;
        } else if (pct_workers >= 50) {
            spawn_delay = 30;
        } else if (pct_workers >= 25) {
            spawn_delay = 50;
        } else if (pct_workers >= 1) {
            spawn_delay = 80;
        } else {
            return;
        }
        b.figure_spawn_delay++;
        if (b.figure_spawn_delay > spawn_delay) {
            b.figure_spawn_delay = 0;
            let f: figure = figure_create(FIGURE_CHARIOTEER, road.x, road.y, DIR_0_TOP);
            f.action_state = FIGURE_ACTION_94_ENTERTAINER_ROAMING;
            f.building_id = b.id;
            b.figure_id = f.id;
            figure_movement_init_roaming(f);
            if (!city_entertainment_hippodrome_has_race()) {
                let horse1: figure = figure_create(FIGURE_HIPPODROME_HORSES, b.x + 2, b.y + 1, DIR_2_RIGHT);
                horse1.action_state = FIGURE_ACTION_200_HIPPODROME_HORSE_CREATED;
                horse1.building_id = b.id;
                horse1.resource_id = 0;
                horse1.speed_multiplier = 3;
                let horse2: figure = figure_create(FIGURE_HIPPODROME_HORSES, b.x + 2, b.y + 2, DIR_2_RIGHT);
                horse2.action_state = FIGURE_ACTION_200_HIPPODROME_HORSE_CREATED;
                horse2.building_id = b.id;
                horse2.resource_id = 1;
                horse2.speed_multiplier = 2;
                if (b.data.entertainment.days1 > 0) {
                    if (city_entertainment_show_message_hippodrome()) {
                        city_message_post(1, MESSAGE_WORKING_HIPPODROME, 0, 0);
                    }
                }
            }
        }
    }
}
function spawn_figure_colosseum(b: building) {
    check_labor_problem(b);
    if (has_figure_of_types(b, FIGURE_GLADIATOR, FIGURE_LION_TAMER)) {
        return;
    }
    let road: map_point;
    if (map_has_road_access(b.x, b.y, b.size, road)) {
        if (b.houses_covered <= 50 ||
            (b.data.entertainment.days1 <= 0 && b.data.entertainment.days2 <= 0)) {
            generate_labor_seeker(b, road.x, road.y);
        }
        let pct_workers: number = worker_percentage(b);
        let spawn_delay: number;
        if (pct_workers >= 100) {
            spawn_delay = 6;
        } else if (pct_workers >= 75) {
            spawn_delay = 12;
        } else if (pct_workers >= 50) {
            spawn_delay = 20;
        } else if (pct_workers >= 25) {
            spawn_delay = 40;
        } else if (pct_workers >= 1) {
            spawn_delay = 70;
        } else {
            return;
        }
        b.figure_spawn_delay++;
        if (b.figure_spawn_delay > spawn_delay) {
            b.figure_spawn_delay = 0;
            let f: figure;
            if (b.data.entertainment.days1 > 0) {
                f = figure_create(FIGURE_LION_TAMER, road.x, road.y, DIR_0_TOP);
            } else {
                f = figure_create(FIGURE_GLADIATOR, road.x, road.y, DIR_0_TOP);
            }
            f.action_state = FIGURE_ACTION_94_ENTERTAINER_ROAMING;
            f.building_id = b.id;
            b.figure_id = f.id;
            figure_movement_init_roaming(f);
            if (b.data.entertainment.days1 > 0 || b.data.entertainment.days2 > 0) {
                if (city_entertainment_show_message_colosseum()) {
                    city_message_post(1, MESSAGE_WORKING_COLOSSEUM, 0, 0);
                }
            }
        }
    }
}
function set_market_graphic(b: building) {
    if (b.state != BUILDING_STATE_IN_USE) {
        return;
    }
    if (map_desirability_get(b.grid_offset) <= 30) {
        map_building_tiles_add(b.id, b.x, b.y, b.size,
            image_group(GROUP_BUILDING_MARKET), TERRAIN_BUILDING);
    } else {
        map_building_tiles_add(b.id, b.x, b.y, b.size,
            image_group(GROUP_BUILDING_MARKET_FANCY), TERRAIN_BUILDING);
    }
}
function spawn_figure_market(b: building) {
    set_market_graphic(b);
    check_labor_problem(b);
    let road: map_point;
    if (map_has_road_access(b.x, b.y, b.size, road)) {
        spawn_labor_seeker(b, road.x, road.y, 50);
        let pct_workers: number = worker_percentage(b);
        let spawn_delay: number;
        if (pct_workers >= 100) {
            spawn_delay = 2;
        } else if (pct_workers >= 75) {
            spawn_delay = 5;
        } else if (pct_workers >= 50) {
            spawn_delay = 10;
        } else if (pct_workers >= 25) {
            spawn_delay = 20;
        } else if (pct_workers >= 1) {
            spawn_delay = 30;
        } else {
            return;
        }
        if (!has_figure_of_type(b, FIGURE_MARKET_TRADER)) {
            b.figure_spawn_delay++;
            if (b.figure_spawn_delay <= spawn_delay) {
                return;
            }
            b.figure_spawn_delay = 0;
            create_roaming_figure(b, road.x, road.y, FIGURE_MARKET_TRADER);
        }
        if (b.figure_id2) {
            let f: figure = figure_get(b.figure_id2);
            if (f.state != FIGURE_STATE_ALIVE || (f.type != FIGURE_MARKET_BUYER && f.type != FIGURE_LABOR_SEEKER)) {
                b.figure_id2 = 0;
            }
        } else {
            map_has_road_access(b.x, b.y, b.size, road);
            let dst_building_id: number = building_market_get_storage_destination(b);
            if (dst_building_id > 0) {
                let f: figure = figure_create(FIGURE_MARKET_BUYER, road.x, road.y, DIR_0_TOP);
                f.action_state = FIGURE_ACTION_145_MARKET_BUYER_GOING_TO_STORAGE;
                f.building_id = b.id;
                b.figure_id2 = f.id;
                f.destination_building_id = dst_building_id;
                f.collecting_item_id = b.data.market.fetch_inventory_id;
                let b_dst: building = building_get(dst_building_id);
                if (map_has_road_access(b_dst.x, b_dst.y, b_dst.size, road) ||
                    map_has_road_access(b_dst.x, b_dst.y, 3, road)) {
                    f.destination_x = road.x;
                    f.destination_y = road.y;
                } else {
                    f.action_state = FIGURE_ACTION_146_MARKET_BUYER_RETURNING;
                    f.destination_x = f.x;
                    f.destination_y = f.y;
                }
            }
        }
    }
}
function set_bathhouse_graphic(b: building) {
    if (b.state != BUILDING_STATE_IN_USE) {
        return;
    }
    if (map_terrain_exists_tile_in_area_with_type(b.x, b.y, b.size, TERRAIN_RESERVOIR_RANGE)) {
        b.has_water_access = 1;
    } else {
        b.has_water_access = 0;
    }
    if (b.has_water_access && b.num_workers) {
        if (map_desirability_get(b.grid_offset) <= 30) {
            map_building_tiles_add(b.id, b.x, b.y, b.size,
                image_group(GROUP_BUILDING_BATHHOUSE_WATER), TERRAIN_BUILDING);
        } else {
            map_building_tiles_add(b.id, b.x, b.y, b.size,
                image_group(GROUP_BUILDING_BATHHOUSE_FANCY_WATER), TERRAIN_BUILDING);
        }
    } else {
        if (map_desirability_get(b.grid_offset) <= 30) {
            map_building_tiles_add(b.id, b.x, b.y, b.size,
                image_group(GROUP_BUILDING_BATHHOUSE_NO_WATER), TERRAIN_BUILDING);
        } else {
            map_building_tiles_add(b.id, b.x, b.y, b.size,
                image_group(GROUP_BUILDING_BATHHOUSE_FANCY_NO_WATER), TERRAIN_BUILDING);
        }
    }
}
function spawn_figure_bathhouse(b: building) {
    set_bathhouse_graphic(b);
    check_labor_problem(b);
    if (!b.has_water_access) {
        b.show_on_problem_overlay = 2;
    }
    if (has_figure_of_type(b, FIGURE_BATHHOUSE_WORKER)) {
        return;
    }
    let road: map_point;
    if (map_has_road_access(b.x, b.y, b.size, road) && b.has_water_access) {
        spawn_labor_seeker(b, road.x, road.y, 50);
        let spawn_delay: number = default_spawn_delay(b);
        if (!spawn_delay) {
            return;
        }
        b.figure_spawn_delay++;
        if (b.figure_spawn_delay > spawn_delay) {
            b.figure_spawn_delay = 0;
            create_roaming_figure(b, road.x, road.y, FIGURE_BATHHOUSE_WORKER);
        }
    }
}
function spawn_figure_school(b: building) {
    check_labor_problem(b);
    if (has_figure_of_type(b, FIGURE_SCHOOL_CHILD)) {
        return;
    }
    let road: map_point;
    if (map_has_road_access(b.x, b.y, b.size, road)) {
        spawn_labor_seeker(b, road.x, road.y, 50);
        let spawn_delay: number = default_spawn_delay(b);
        if (!spawn_delay) {
            return;
        }
        b.figure_spawn_delay++;
        if (b.figure_spawn_delay > spawn_delay) {
            b.figure_spawn_delay = 0;
            let child1: figure = figure_create(FIGURE_SCHOOL_CHILD, road.x, road.y, DIR_0_TOP);
            child1.action_state = FIGURE_ACTION_125_ROAMING;
            child1.building_id = b.id;
            b.figure_id = child1.id;
            figure_movement_init_roaming(child1);
            let child2: figure = figure_create(FIGURE_SCHOOL_CHILD, road.x, road.y, DIR_0_TOP);
            child2.action_state = FIGURE_ACTION_125_ROAMING;
            child2.building_id = b.id;
            figure_movement_init_roaming(child2);
            let child3: figure = figure_create(FIGURE_SCHOOL_CHILD, road.x, road.y, DIR_0_TOP);
            child3.action_state = FIGURE_ACTION_125_ROAMING;
            child3.building_id = b.id;
            figure_movement_init_roaming(child3);
            let child4: figure = figure_create(FIGURE_SCHOOL_CHILD, road.x, road.y, DIR_0_TOP);
            child4.action_state = FIGURE_ACTION_125_ROAMING;
            child4.building_id = b.id;
            figure_movement_init_roaming(child4);
        }
    }
}
function spawn_figure_library(b: building) {
    check_labor_problem(b);
    if (has_figure_of_type(b, FIGURE_LIBRARIAN)) {
        return;
    }
    let road: map_point;
    if (map_has_road_access(b.x, b.y, b.size, road)) {
        spawn_labor_seeker(b, road.x, road.y, 50);
        let spawn_delay: number = default_spawn_delay(b);
        if (!spawn_delay) {
            return;
        }
        b.figure_spawn_delay++;
        if (b.figure_spawn_delay > spawn_delay) {
            b.figure_spawn_delay = 0;
            create_roaming_figure(b, road.x, road.y, FIGURE_LIBRARIAN);
        }
    }
}
function spawn_figure_academy(b: building) {
    check_labor_problem(b);
    if (has_figure_of_type(b, FIGURE_TEACHER)) {
        return;
    }
    let road: map_point;
    if (map_has_road_access(b.x, b.y, b.size, road)) {
        spawn_labor_seeker(b, road.x, road.y, 50);
        let spawn_delay: number = default_spawn_delay(b);
        if (!spawn_delay) {
            return;
        }
        b.figure_spawn_delay++;
        if (b.figure_spawn_delay > spawn_delay) {
            b.figure_spawn_delay = 0;
            create_roaming_figure(b, road.x, road.y, FIGURE_TEACHER);
        }
    }
}
function spawn_figure_barber(b: building) {
    check_labor_problem(b);
    if (has_figure_of_type(b, FIGURE_BARBER)) {
        return;
    }
    let road: map_point;
    if (map_has_road_access(b.x, b.y, b.size, road)) {
        spawn_labor_seeker(b, road.x, road.y, 50);
        let spawn_delay: number = default_spawn_delay(b);
        if (!spawn_delay) {
            return;
        }
        b.figure_spawn_delay++;
        if (b.figure_spawn_delay > spawn_delay) {
            b.figure_spawn_delay = 0;
            create_roaming_figure(b, road.x, road.y, FIGURE_BARBER);
        }
    }
}
function spawn_figure_doctor(b: building) {
    check_labor_problem(b);
    if (has_figure_of_type(b, FIGURE_DOCTOR)) {
        return;
    }
    let road: map_point;
    if (map_has_road_access(b.x, b.y, b.size, road)) {
        spawn_labor_seeker(b, road.x, road.y, 50);
        let spawn_delay: number = default_spawn_delay(b);
        if (!spawn_delay) {
            return;
        }
        b.figure_spawn_delay++;
        if (b.figure_spawn_delay > spawn_delay) {
            b.figure_spawn_delay = 0;
            create_roaming_figure(b, road.x, road.y, FIGURE_DOCTOR);
        }
    }
}
function spawn_figure_hospital(b: building) {
    check_labor_problem(b);
    if (has_figure_of_type(b, FIGURE_SURGEON)) {
        return;
    }
    let road: map_point;
    if (map_has_road_access(b.x, b.y, b.size, road)) {
        spawn_labor_seeker(b, road.x, road.y, 50);
        let spawn_delay: number = default_spawn_delay(b);
        if (!spawn_delay) {
            return;
        }
        b.figure_spawn_delay++;
        if (b.figure_spawn_delay > spawn_delay) {
            b.figure_spawn_delay = 0;
            create_roaming_figure(b, road.x, road.y, FIGURE_SURGEON);
        }
    }
}
function spawn_figure_temple(b: building) {
    check_labor_problem(b);
    if (has_figure_of_type(b, FIGURE_PRIEST)) {
        return;
    }
    let road: map_point;
    if (map_has_road_access(b.x, b.y, b.size, road)) {
        spawn_labor_seeker(b, road.x, road.y, 50);
        let pct_workers: number = worker_percentage(b);
        let spawn_delay: number;
        if (model_get_building(b.type).laborers <= 0) {
            spawn_delay = 7;
        } else if (pct_workers >= 100) {
            spawn_delay = 3;
        } else if (pct_workers >= 75) {
            spawn_delay = 7;
        } else if (pct_workers >= 50) {
            spawn_delay = 10;
        } else if (pct_workers >= 25) {
            spawn_delay = 15;
        } else if (pct_workers >= 1) {
            spawn_delay = 20;
        } else {
            return;
        }
        b.figure_spawn_delay++;
        if (b.figure_spawn_delay > spawn_delay) {
            b.figure_spawn_delay = 0;
            create_roaming_figure(b, road.x, road.y, FIGURE_PRIEST);
        }
    }
}
function set_senate_graphic(b: building) {
    if (b.state != BUILDING_STATE_IN_USE) {
        return;
    }
    if (map_desirability_get(b.grid_offset) <= 30) {
        map_building_tiles_add(b.id, b.x, b.y, b.size,
            image_group(GROUP_BUILDING_SENATE), TERRAIN_BUILDING);
    } else {
        map_building_tiles_add(b.id, b.x, b.y, b.size,
            image_group(GROUP_BUILDING_SENATE_FANCY), TERRAIN_BUILDING);
    }
}
function spawn_figure_senate_forum(b: building) {
    if (b.type == BUILDING_SENATE) {
        set_senate_graphic(b);
    }
    check_labor_problem(b);
    if (has_figure_of_type(b, FIGURE_TAX_COLLECTOR)) {
        return;
    }
    let road: map_point;
    if (map_has_road_access(b.x, b.y, b.size, road)) {
        spawn_labor_seeker(b, road.x, road.y, 50);
        let pct_workers: number = worker_percentage(b);
        let spawn_delay: number;
        if (pct_workers >= 100) {
            spawn_delay = 0;
        } else if (pct_workers >= 75) {
            spawn_delay = 1;
        } else if (pct_workers >= 50) {
            spawn_delay = 3;
        } else if (pct_workers >= 25) {
            spawn_delay = 7;
        } else if (pct_workers >= 1) {
            spawn_delay = 15;
        } else {
            return;
        }
        b.figure_spawn_delay++;
        if (b.figure_spawn_delay > spawn_delay) {
            b.figure_spawn_delay = 0;
            let f: figure = figure_create(FIGURE_TAX_COLLECTOR, road.x, road.y, DIR_0_TOP);
            f.action_state = FIGURE_ACTION_40_TAX_COLLECTOR_CREATED;
            f.building_id = b.id;
            b.figure_id = f.id;
        }
    }
}
function spawn_figure_mission_post(b: building) {
    if (has_figure_of_type(b, FIGURE_MISSIONARY)) {
        return;
    }
    let road: map_point;
    if (map_has_road_access(b.x, b.y, b.size, road)) {
        if (city_population() > 0) {
            city_buildings_set_mission_post_operational();
            b.figure_spawn_delay++;
            if (b.figure_spawn_delay > 1) {
                b.figure_spawn_delay = 0;
                create_roaming_figure(b, road.x, road.y, FIGURE_MISSIONARY);
            }
        }
    }
}
function spawn_figure_industry(b: building) {
    check_labor_problem(b);
    let road: map_point;
    if (map_has_road_access(b.x, b.y, b.size, road)) {
        spawn_labor_seeker(b, road.x, road.y, 50);
        if (has_figure_of_type(b, FIGURE_CART_PUSHER)) {
            return;
        }
        if (building_industry_has_produced_resource(b)) {
            building_industry_start_new_production(b);
            let f: figure = figure_create(FIGURE_CART_PUSHER, road.x, road.y, DIR_4_BOTTOM);
            f.action_state = FIGURE_ACTION_20_CARTPUSHER_INITIAL;
            f.resource_id = b.output_resource_id;
            f.building_id = b.id;
            b.figure_id = f.id;
            f.wait_ticks = 30;
        }
    }
}
function spawn_figure_wharf(b: building) {
    check_labor_problem(b);
    if (b.data.industry.fishing_boat_id) {
        let f: figure = figure_get(b.data.industry.fishing_boat_id);
        if (f.state != FIGURE_STATE_ALIVE || f.type != FIGURE_FISHING_BOAT) {
            b.data.industry.fishing_boat_id = 0;
        }
    }
    let road: map_point;
    if (map_has_road_access(b.x, b.y, b.size, road)) {
        spawn_labor_seeker(b, road.x, road.y, 50);
        if (has_figure_of_type(b, FIGURE_CART_PUSHER)) {
            return;
        }
        if (b.figure_spawn_delay) {
            b.figure_spawn_delay = 0;
            b.data.industry.has_fish = 0;
            b.output_resource_id = RESOURCE_MEAT;
            let f: figure = figure_create(FIGURE_CART_PUSHER, road.x, road.y, DIR_4_BOTTOM);
            f.action_state = FIGURE_ACTION_20_CARTPUSHER_INITIAL;
            f.resource_id = RESOURCE_MEAT;
            f.building_id = b.id;
            b.figure_id = f.id;
            f.wait_ticks = 30;
        }
    }
}
function spawn_figure_shipyard(b: building) {
    check_labor_problem(b);
    let road: map_point;
    if (map_has_road_access(b.x, b.y, b.size, road)) {
        spawn_labor_seeker(b, road.x, road.y, 50);
        if (has_figure_of_type(b, FIGURE_FISHING_BOAT)) {
            return;
        }
        let pct_workers: number = worker_percentage(b);
        if (pct_workers >= 100) {
            b.data.industry.progress += 10
        } else if (pct_workers >= 75) {
            b.data.industry.progress += 8
        } else if (pct_workers >= 50) {
            b.data.industry.progress += 6
        } else if (pct_workers >= 25) {
            b.data.industry.progress += 4
        } else if (pct_workers >= 1) {
            b.data.industry.progress += 2
        }
        if (b.data.industry.progress >= 160) {
            b.data.industry.progress = 0;
            let boat: map_point;
            if (map_water_can_spawn_fishing_boat(b.x, b.y, b.size, boat)) {
                let f: figure = figure_create(FIGURE_FISHING_BOAT, boat.x, boat.y, DIR_0_TOP);
                f.action_state = FIGURE_ACTION_190_FISHING_BOAT_CREATED;
                f.building_id = b.id;
                b.figure_id = f.id;
            }
        }
    }
}
function spawn_figure_dock(b: building) {
    check_labor_problem(b);
    let road: map_point;
    if (map_has_road_access(b.x, b.y, b.size, road)) {
        spawn_labor_seeker(b, road.x, road.y, 50);
        let pct_workers: number = worker_percentage(b);
        let max_dockers: number;
        if (pct_workers >= 75) {
            max_dockers = 3;
        } else if (pct_workers >= 50) {
            max_dockers = 2;
        } else if (pct_workers > 0) {
            max_dockers = 1;
        } else {
            max_dockers = 0;
        }
        let existing_dockers: number = 0;
        for (let i: number = 0; i < 3; i++) {
            if (b.data.dock.docker_ids[i]) {
                if (figure_get(b.data.dock.docker_ids[i]).type == FIGURE_DOCKER) {
                    existing_dockers++;
                } else {
                    b.data.dock.docker_ids[i] = 0;
                }
            }
        }
        if (existing_dockers > max_dockers) {
            for (let i: number = 2; i >= 0; i--) {
                if (b.data.dock.docker_ids[i]) {
                    figure_get(b.data.dock.docker_ids[i]).state = FIGURE_STATE_DEAD;
                    break
                }
            }
        } else if (existing_dockers < max_dockers) {
            let f: figure = figure_create(FIGURE_DOCKER, road.x, road.y, DIR_4_BOTTOM);
            f.action_state = FIGURE_ACTION_132_DOCKER_IDLING;
            f.building_id = b.id;
            for (let i: number = 0; i < 3; i++) {
                if (!b.data.dock.docker_ids[i]) {
                    b.data.dock.docker_ids[i] = f.id;
                    break
                }
            }
        }
    }
}
function spawn_figure_native_hut(b: building) {
    map_image_set(b.grid_offset, image_group(GROUP_BUILDING_NATIVE) + (map_random_get(b.grid_offset) & 1));
    if (has_figure_of_type(b, FIGURE_INDIGENOUS_NATIVE)) {
        return;
    }
    let x_out: number
    let y_out: number;
    if (b.subtype.native_meeting_center_id > 0
        && map_terrain_get_adjacent_road_or_clear_land(b.x, b.y, b.size, x_out, y_out)) {
        b.figure_spawn_delay++;
        if (b.figure_spawn_delay > 4) {
            b.figure_spawn_delay = 0;
            let f: figure = figure_create(FIGURE_INDIGENOUS_NATIVE, x_out, y_out, DIR_0_TOP);
            f.action_state = FIGURE_ACTION_158_NATIVE_CREATED;
            f.building_id = b.id;
            b.figure_id = f.id;
        }
    }
}
function spawn_figure_native_meeting(b: building) {
    map_building_tiles_add(b.id, b.x, b.y, 2, image_group(GROUP_BUILDING_NATIVE) + 2, TERRAIN_BUILDING);
    if (city_buildings_is_mission_post_operational() && !has_figure_of_type(b, FIGURE_NATIVE_TRADER)) {
        let x_out: number
        let y_out: number;
        if (map_terrain_get_adjacent_road_or_clear_land(b.x, b.y, b.size, x_out, y_out)) {
            b.figure_spawn_delay++;
            if (b.figure_spawn_delay > 8) {
                b.figure_spawn_delay = 0;
                let f: figure = figure_create(FIGURE_NATIVE_TRADER, x_out, y_out, DIR_0_TOP);
                f.action_state = FIGURE_ACTION_162_NATIVE_TRADER_CREATED;
                f.building_id = b.id;
                b.figure_id = f.id;
            }
        }
    }
}
function spawn_figure_barracks(b: building) {
    check_labor_problem(b);
    let road: map_point;
    if (map_has_road_access(b.x, b.y, b.size, road)) {
        spawn_labor_seeker(b, road.x, road.y, 100);
        let pct_workers: number = worker_percentage(b);
        let spawn_delay: number;
        if (pct_workers >= 100) {
            spawn_delay = 8;
        } else if (pct_workers >= 75) {
            spawn_delay = 12;
        } else if (pct_workers >= 50) {
            spawn_delay = 16;
        } else if (pct_workers >= 25) {
            spawn_delay = 32;
        } else if (pct_workers >= 1) {
            spawn_delay = 48;
        } else {
            return;
        }
        b.figure_spawn_delay++;
        if (b.figure_spawn_delay > spawn_delay) {
            b.figure_spawn_delay = 0;
            map_has_road_access(b.x, b.y, b.size, road);
            if (!building_barracks_create_tower_sentry(b, road.x, road.y)) {
                building_barracks_create_soldier(b, road.x, road.y);
            }
        }
    }
}
function spawn_figure_military_academy(b: building) {
    check_labor_problem(b);
    let road: map_point;
    if (map_has_road_access(b.x, b.y, b.size, road)) {
        spawn_labor_seeker(b, road.x, road.y, 100);
    }
}
function update_native_crop_progress(b: building) {
    b.data.industry.progress++;
    if (b.data.industry.progress >= 5) {
        b.data.industry.progress = 0;
    }
    map_image_set(b.grid_offset, image_group(GROUP_BUILDING_FARM_CROPS) + b.data.industry.progress);
}
export function building_figure_generate() {
    let patrician_generated: number = 0;
    building_barracks_decay_tower_sentry_request();
    let max_id: number = building_get_highest_id();
    for (let i: number = 1; i <= max_id; i++) {
        let b: building = building_get(i);
        if (b.state != BUILDING_STATE_IN_USE) {
            continue
        }
        if (b.type == BUILDING_WAREHOUSE_SPACE || (b.type == BUILDING_HIPPODROME && b.prev_part_building_id)) {
            continue
        }
        b.show_on_problem_overlay = 0;
        if (b.type >= BUILDING_HOUSE_SMALL_VILLA && b.type <= BUILDING_HOUSE_LUXURY_PALACE) {
            patrician_generated = spawn_patrician(b, patrician_generated);
        } else if (b.type >= BUILDING_WHEAT_FARM && b.type <= BUILDING_POTTERY_WORKSHOP) {
            spawn_figure_industry(b);
        } else if (b.type >= BUILDING_SENATE_1_UNUSED && b.type <= BUILDING_FORUM_2_UNUSED) {
            spawn_figure_senate_forum(b);
        } else if (b.type >= BUILDING_SMALL_TEMPLE_CERES && b.type <= BUILDING_LARGE_TEMPLE_VENUS) {
            spawn_figure_temple(b);
        } else {
            switch (b.type) {
                case BUILDING_WAREHOUSE:
                    spawn_figure_warehouse(b);
                    break
                case BUILDING_GRANARY:
                    spawn_figure_granary(b);
                    break
                case BUILDING_TOWER:
                    spawn_figure_tower(b);
                    break
                case BUILDING_ENGINEERS_POST:
                    spawn_figure_engineers_post(b);
                    break
                case BUILDING_PREFECTURE:
                    spawn_figure_prefecture(b);
                    break
                case BUILDING_ACTOR_COLONY:
                    spawn_figure_actor_colony(b);
                    break
                case BUILDING_GLADIATOR_SCHOOL:
                    spawn_figure_gladiator_school(b);
                    break
                case BUILDING_LION_HOUSE:
                    spawn_figure_lion_house(b);
                    break
                case BUILDING_CHARIOT_MAKER:
                    spawn_figure_chariot_maker(b);
                    break
                case BUILDING_AMPHITHEATER:
                    spawn_figure_amphitheater(b);
                    break
                case BUILDING_THEATER:
                    spawn_figure_theater(b);
                    break
                case BUILDING_HIPPODROME:
                    spawn_figure_hippodrome(b);
                    break
                case BUILDING_COLOSSEUM:
                    spawn_figure_colosseum(b);
                    break
                case BUILDING_MARKET:
                    spawn_figure_market(b);
                    break
                case BUILDING_BATHHOUSE:
                    spawn_figure_bathhouse(b);
                    break
                case BUILDING_SCHOOL:
                    spawn_figure_school(b);
                    break
                case BUILDING_LIBRARY:
                    spawn_figure_library(b);
                    break
                case BUILDING_ACADEMY:
                    spawn_figure_academy(b);
                    break
                case BUILDING_BARBER:
                    spawn_figure_barber(b);
                    break
                case BUILDING_DOCTOR:
                    spawn_figure_doctor(b);
                    break
                case BUILDING_HOSPITAL:
                    spawn_figure_hospital(b);
                    break
                case BUILDING_MISSION_POST:
                    spawn_figure_mission_post(b);
                    break
                case BUILDING_DOCK:
                    spawn_figure_dock(b);
                    break
                case BUILDING_WHARF:
                    spawn_figure_wharf(b);
                    break
                case BUILDING_SHIPYARD:
                    spawn_figure_shipyard(b);
                    break
                case BUILDING_NATIVE_HUT:
                    spawn_figure_native_hut(b);
                    break
                case BUILDING_NATIVE_MEETING:
                    spawn_figure_native_meeting(b);
                    break
                case BUILDING_NATIVE_CROPS:
                    update_native_crop_progress(b);
                    break
                case BUILDING_FORT:
                    formation_legion_update_recruit_status(b);
                    break
                case BUILDING_BARRACKS:
                    spawn_figure_barracks(b);
                    break
                case BUILDING_MILITARY_ACADEMY:
                    spawn_figure_military_academy(b);
                    break
            }
        }
    }
}
