import { building, building_get } from 'building/building';
import { city_entertainment_hippodrome_has_race, city_entertainment_set_hippodrome_has_race } from 'city/entertainment';
import { city_figures_add_animal } from 'city/figures';
import { city_view_orientation } from 'city/view';
import { calc_general_direction } from 'core/calc';
import { direction_type } from 'core/direction';
import { image_group } from 'core/image';
import { group_terrain } from 'core/image_group';
import { random_byte, random_generate_next } from 'core/random';
import { figure_action } from 'figure/action';
import { figure_combat_get_target_for_wolf, figure_combat_handle_attack, figure_combat_handle_corpse } from 'figure/combat';
import { figure, figure_create, figure_get, MAX_FIGURES } from 'figure/figure';
import { formation, formation_create_herd, formation_get, formation_type } from 'figure/formation';
import { formation_layout_position_x, formation_layout_position_y } from 'figure/formation_layout';
import { figure_image_corpse_offset, figure_image_direction, figure_image_increase_offset, figure_image_set_cart_offset } from 'figure/image';
import { figure_movement_move_ticks, figure_movement_move_ticks_cross_country, figure_movement_set_cross_country_destination, figure_movement_set_cross_country_direction } from 'figure/movement';
import { figure_route_remove } from 'figure/route';
import { figure_state, figure_type, terrain_usage } from 'figure/type';
import { map_figure_add, map_figure_delete } from 'map/figure';
import { GRID, map_grid_bound, map_grid_offset } from 'map/grid';
import { map_point } from 'map/point';
import { scenario_map_foreach_fishing_point, scenario_map_foreach_herd_point } from 'scenario/map';
import { scenario_climate, scenario_property_climate } from 'scenario/property';
import { Ref } from '../../ext/crt';
import DIR_0_TOP = direction_type.DIR_0_TOP;
import DIR_6_LEFT = direction_type.DIR_6_LEFT;
import DIR_FIGURE_AT_DESTINATION = direction_type.DIR_FIGURE_AT_DESTINATION;
import DIR_FIGURE_REROUTE = direction_type.DIR_FIGURE_REROUTE;
import DIR_FIGURE_LOST = direction_type.DIR_FIGURE_LOST;
import FIGURE_ACTION_149_CORPSE = figure_action.FIGURE_ACTION_149_CORPSE;
import FIGURE_ACTION_150_ATTACK = figure_action.FIGURE_ACTION_150_ATTACK;
import FIGURE_ACTION_196_HERD_ANIMAL_AT_REST = figure_action.FIGURE_ACTION_196_HERD_ANIMAL_AT_REST;
import FIGURE_ACTION_197_HERD_ANIMAL_MOVING = figure_action.FIGURE_ACTION_197_HERD_ANIMAL_MOVING;
import FIGURE_ACTION_199_WOLF_ATTACKING = figure_action.FIGURE_ACTION_199_WOLF_ATTACKING;
import FIGURE_ACTION_200_HIPPODROME_HORSE_CREATED = figure_action.FIGURE_ACTION_200_HIPPODROME_HORSE_CREATED;
import FIGURE_ACTION_201_HIPPODROME_HORSE_RACING = figure_action.FIGURE_ACTION_201_HIPPODROME_HORSE_RACING;
import FIGURE_ACTION_202_HIPPODROME_HORSE_DONE = figure_action.FIGURE_ACTION_202_HIPPODROME_HORSE_DONE;
import FIGURE_FISH_GULLS = figure_type.FIGURE_FISH_GULLS;
import FIGURE_SHEEP = figure_type.FIGURE_SHEEP;
import FIGURE_WOLF = figure_type.FIGURE_WOLF;
import FIGURE_ZEBRA = figure_type.FIGURE_ZEBRA;
import FIGURE_HIPPODROME_HORSES = figure_type.FIGURE_HIPPODROME_HORSES;
import FIGURE_STATE_ALIVE = figure_state.FIGURE_STATE_ALIVE;
import FIGURE_STATE_DEAD = figure_state.FIGURE_STATE_DEAD;
import TERRAIN_USAGE_ANY = terrain_usage.TERRAIN_USAGE_ANY;
import TERRAIN_USAGE_ANIMAL = terrain_usage.TERRAIN_USAGE_ANIMAL;
import GROUP_FIGURE_SEAGULLS = group_terrain.GROUP_FIGURE_SEAGULLS;
import GROUP_FIGURE_HIPPODROME_HORSE_1 = group_terrain.GROUP_FIGURE_HIPPODROME_HORSE_1;
import GROUP_FIGURE_HIPPODROME_HORSE_2 = group_terrain.GROUP_FIGURE_HIPPODROME_HORSE_2;
import GROUP_FIGURE_HIPPODROME_CART_1 = group_terrain.GROUP_FIGURE_HIPPODROME_CART_1;
import GROUP_FIGURE_HIPPODROME_CART_2 = group_terrain.GROUP_FIGURE_HIPPODROME_CART_2;
import GROUP_FIGURE_SHEEP = group_terrain.GROUP_FIGURE_SHEEP;
import GROUP_FIGURE_WOLF = group_terrain.GROUP_FIGURE_WOLF;
import GROUP_FIGURE_ZEBRA = group_terrain.GROUP_FIGURE_ZEBRA;
import FORMATION_HERD = formation_type.FORMATION_HERD;
import GRID_SIZE = GRID.GRID_SIZE;
import CLIMATE_CENTRAL = scenario_climate.CLIMATE_CENTRAL;
import CLIMATE_NORTHERN = scenario_climate.CLIMATE_NORTHERN;
import CLIMATE_DESERT = scenario_climate.CLIMATE_DESERT;

let SEAGULL_OFFSETS: map_point[] = [
    { x: 0, y: 0 }, { x: 0, y: -2 }, { x: -2, y: 0 }, { x: 1, y: 2 }, { x: 2, y: 0 }, { x: -3, y: 1 }, { x: 4, y: -3 }, { x: -2, y: 4 }, { x: 0, y: 0 }
];
let HORSE_DESTINATION_1: map_point[] = [
    { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 4, y: 1 }, { x: 5, y: 1 }, { x: 6, y: 1 }, { x: 7, y: 1 }, { x: 8, y: 1 }, { x: 9, y: 1 }, { x: 10, y: 1 }, { x: 11, y: 1 }, { x: 12, y: 2 },
    { x: 12, y: 3 }, { x: 11, y: 3 }, { x: 10, y: 3 }, { x: 9, y: 3 }, { x: 8, y: 3 }, { x: 7, y: 3 }, { x: 6, y: 3 }, { x: 5, y: 3 }, { x: 4, y: 3 }, { x: 3, y: 3 }, { x: 2, y: 2 }
];
let HORSE_DESTINATION_2: map_point[] = [
    { x: 12, y: 3 }, { x: 11, y: 3 }, { x: 10, y: 3 }, { x: 9, y: 3 }, { x: 8, y: 3 }, { x: 7, y: 3 }, { x: 6, y: 3 }, { x: 5, y: 3 }, { x: 4, y: 3 }, { x: 3, y: 3 }, { x: 2, y: 2 },
    { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 4, y: 1 }, { x: 5, y: 1 }, { x: 6, y: 1 }, { x: 7, y: 1 }, { x: 8, y: 1 }, { x: 9, y: 1 }, { x: 10, y: 1 }, { x: 11, y: 1 }, { x: 12, y: 2 }
];
let SHEEP_IMAGE_OFFSETS: number[] = [
    0, 0, 1, 1, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    3, 3, 3, 3, 4, 4, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1
];
export const enum horse {
    HORSE_CREATED = 0,
    HORSE_RACING = 1,
    HORSE_FINISHED = 2,
}

import HORSE_CREATED = horse.HORSE_CREATED;
import HORSE_RACING = horse.HORSE_RACING;
import HORSE_FINISHED = horse.HORSE_FINISHED;

function create_fishing_point(x: number, y: number) {
    random_generate_next();
    let fish: figure = figure_create(FIGURE_FISH_GULLS, x, y, DIR_0_TOP);
    fish.image_offset = random_byte() & 0x1f;
    fish.progress_on_tile = random_byte() & 7;
    figure_movement_set_cross_country_direction(fish,
        fish.cross_country_x, fish.cross_country_y,
        15 * fish.destination_x, 15 * fish.destination_y, 0);
}
export function figure_create_fishing_points() {
    scenario_map_foreach_fishing_point(create_fishing_point);
}
function create_herd(x: number, y: number) {
    let herd_type: figure_type;
    let num_animals: number;
    switch (scenario_property_climate()) {
        case CLIMATE_CENTRAL:
            herd_type = FIGURE_SHEEP;
            num_animals = 10;
            break
        case CLIMATE_NORTHERN:
            herd_type = FIGURE_WOLF;
            num_animals = 8;
            break
        case CLIMATE_DESERT:
            herd_type = FIGURE_ZEBRA;
            num_animals = 12;
            break
        default:
            return
    }
    let formation_id: number = formation_create_herd(herd_type, x, y, num_animals);
    if (formation_id > 0) {
        for (let fig: number = 0; fig < num_animals; fig++) {
            random_generate_next();
            let f: figure = figure_create(herd_type, x, y, DIR_0_TOP);
            f.action_state = FIGURE_ACTION_196_HERD_ANIMAL_AT_REST;
            f.formation_id = formation_id;
            f.wait_ticks = f.id & 0x1f;
        }
    }
}
export function figure_create_herds() {
    scenario_map_foreach_herd_point(create_herd);
}
export function figure_seagulls_action(f: figure) {
    f.terrain_usage = TERRAIN_USAGE_ANY;
    f.is_ghost = 0;
    f.use_cross_country = 1;
    if (!(f.image_offset & 3) && figure_movement_move_ticks_cross_country(f, 1)) {
        f.progress_on_tile++;
        if (f.progress_on_tile > 8) {
            f.progress_on_tile = 0;
        }
        figure_movement_set_cross_country_destination(f,
            f.source_x + SEAGULL_OFFSETS[f.progress_on_tile].x,
            f.source_y + SEAGULL_OFFSETS[f.progress_on_tile].y);
    }
    if (f.id & 1) {
        figure_image_increase_offset(f, 54);
        f.image_id = image_group(GROUP_FIGURE_SEAGULLS) + f.image_offset / 3;
    } else {
        figure_image_increase_offset(f, 72);
        f.image_id = image_group(GROUP_FIGURE_SEAGULLS) + 18 + f.image_offset / 3;
    }
}
function herd_get_destination(index: number, m: formation, x: Ref<number>, y: Ref<number>) {
    let offset_x: number = formation_layout_position_x(FORMATION_HERD, index);
    let offset_y: number = formation_layout_position_y(FORMATION_HERD, index);
    let destination_x: number = m.destination_x + offset_x;
    let destination_y: number = m.destination_y + offset_y;
    map_grid_bound(destination_x, destination_y);
    x.v = destination_x;
    y.v = destination_y;
}
export function figure_sheep_action(f: figure) {
    let m: formation = formation_get(f.formation_id);
    f.terrain_usage = TERRAIN_USAGE_ANIMAL;
    f.use_cross_country = 0;
    f.is_ghost = 0;
    city_figures_add_animal();
    figure_image_increase_offset(f, 6);
    switch (f.action_state) {
        case FIGURE_ACTION_150_ATTACK:
            figure_combat_handle_attack(f);
            break
        case FIGURE_ACTION_149_CORPSE:
            figure_combat_handle_corpse(f);
            break
        case FIGURE_ACTION_196_HERD_ANIMAL_AT_REST:
            f.wait_ticks++;
            if (f.wait_ticks > 400) {
                f.wait_ticks = f.id & 0x1f;
                f.action_state = FIGURE_ACTION_197_HERD_ANIMAL_MOVING;
                let dst_x: Ref<number> = new Ref<number>(0);
                let dst_y: Ref<number> = new Ref<number>(0);
                herd_get_destination(f.index_in_formation, m, dst_x, dst_y);
                f.destination_x = dst_x.v;
                f.destination_y = dst_y.v;
                f.roam_length = 0;
            }
            break
        case FIGURE_ACTION_197_HERD_ANIMAL_MOVING:
            figure_movement_move_ticks(f, 1);
            if (f.direction == DIR_FIGURE_AT_DESTINATION || f.direction == DIR_FIGURE_LOST) {
                f.direction = f.previous_tile_direction;
                f.action_state = FIGURE_ACTION_196_HERD_ANIMAL_AT_REST;
                f.wait_ticks = f.id & 0x1f;
            } else if (f.direction == DIR_FIGURE_REROUTE) {
                figure_route_remove(f);
            }
            break
    }
    let dir: number = figure_image_direction(f);
    if (f.action_state == FIGURE_ACTION_149_CORPSE) {
        f.image_id = image_group(GROUP_FIGURE_SHEEP) + 104 +
            figure_image_corpse_offset(f);
    } else if (f.action_state == FIGURE_ACTION_196_HERD_ANIMAL_AT_REST) {
        if (f.id & 3) {
            f.image_id = image_group(GROUP_FIGURE_SHEEP) + 48 + dir +
                8 * SHEEP_IMAGE_OFFSETS[f.wait_ticks & 0x3f];
        } else {
            f.image_id = image_group(GROUP_FIGURE_SHEEP) + 96 + dir;
        }
    } else {
        f.image_id = image_group(GROUP_FIGURE_SHEEP) + dir + 8 * f.image_offset;
    }
}
export function figure_wolf_action(f: figure) {
    let m: formation = formation_get(f.formation_id);
    f.terrain_usage = TERRAIN_USAGE_ANIMAL;
    f.use_cross_country = 0;
    f.is_ghost = 0;
    city_figures_add_animal();
    figure_image_increase_offset(f, 12);
    switch (f.action_state) {
        case FIGURE_ACTION_150_ATTACK:
            figure_combat_handle_attack(f);
            break
        case FIGURE_ACTION_149_CORPSE:
            figure_combat_handle_corpse(f);
            break
        case FIGURE_ACTION_196_HERD_ANIMAL_AT_REST:
            f.wait_ticks++;
            if (f.wait_ticks > 400) {
                f.wait_ticks = f.id & 0x1f;
                f.action_state = FIGURE_ACTION_197_HERD_ANIMAL_MOVING;
                let dst_x: Ref<number> = new Ref<number>(0);
                let dst_y: Ref<number> = new Ref<number>(0);
                herd_get_destination(f.index_in_formation, m, dst_x, dst_y);
                f.destination_x = dst_x.v;
                f.destination_y = dst_y.v;
                f.roam_length = 0;
            }
            break
        case FIGURE_ACTION_197_HERD_ANIMAL_MOVING:
            figure_movement_move_ticks(f, 2);
            if (f.direction == DIR_FIGURE_AT_DESTINATION || f.direction == DIR_FIGURE_LOST) {
                f.direction = f.previous_tile_direction;
                f.action_state = FIGURE_ACTION_196_HERD_ANIMAL_AT_REST;
                f.wait_ticks = f.id & 0x1f;
            } else if (f.direction == DIR_FIGURE_REROUTE) {
                figure_route_remove(f);
            }
            break
        case FIGURE_ACTION_199_WOLF_ATTACKING:
            figure_movement_move_ticks(f, 2);
            if (f.direction == DIR_FIGURE_AT_DESTINATION) {
                let target_id: number = figure_combat_get_target_for_wolf(f.x, f.y, 6);
                if (target_id) {
                    let target: figure = figure_get(target_id);
                    f.destination_x = target.x;
                    f.destination_y = target.y;
                    f.target_figure_id = target_id;
                    target.targeted_by_figure_id = f.id;
                    f.target_figure_created_sequence = target.created_sequence;
                    figure_route_remove(f);
                } else {
                    f.direction = f.previous_tile_direction;
                    f.action_state = FIGURE_ACTION_196_HERD_ANIMAL_AT_REST;
                    f.wait_ticks = f.id & 0x1f;
                }
            } else if (f.direction == DIR_FIGURE_REROUTE) {
                figure_route_remove(f);
            } else if (f.direction == DIR_FIGURE_LOST) {
                f.direction = f.previous_tile_direction;
                f.action_state = FIGURE_ACTION_196_HERD_ANIMAL_AT_REST;
                f.wait_ticks = f.id & 0x1f;
            }
            break
    }
    let dir: number = figure_image_direction(f);
    if (f.action_state == FIGURE_ACTION_149_CORPSE) {
        f.image_id = image_group(GROUP_FIGURE_WOLF) + 96 + figure_image_corpse_offset(f);
    } else if (f.action_state == FIGURE_ACTION_150_ATTACK) {
        f.image_id = image_group(GROUP_FIGURE_WOLF) + 104 +
            dir + 8 * (f.attack_image_offset / 4);
    } else if (f.action_state == FIGURE_ACTION_196_HERD_ANIMAL_AT_REST) {
        f.image_id = image_group(GROUP_FIGURE_WOLF) + 152 + dir;
    } else {
        f.image_id = image_group(GROUP_FIGURE_WOLF) + dir + 8 * f.image_offset;
    }
}
export function figure_zebra_action(f: figure) {
    let m: formation = formation_get(f.formation_id);
    f.terrain_usage = TERRAIN_USAGE_ANIMAL;
    f.use_cross_country = 0;
    f.is_ghost = 0;
    city_figures_add_animal();
    figure_image_increase_offset(f, 12);
    switch (f.action_state) {
        case FIGURE_ACTION_150_ATTACK:
            figure_combat_handle_attack(f);
            break
        case FIGURE_ACTION_149_CORPSE:
            figure_combat_handle_corpse(f);
            break
        case FIGURE_ACTION_196_HERD_ANIMAL_AT_REST:
            f.wait_ticks++;
            if (f.wait_ticks > 200) {
                f.wait_ticks = f.id & 0x1f;
                f.action_state = FIGURE_ACTION_197_HERD_ANIMAL_MOVING;
                let dst_x: Ref<number> = new Ref<number>(0);
                let dst_y: Ref<number> = new Ref<number>(0);
                herd_get_destination(f.index_in_formation, m, dst_x, dst_y);
                f.destination_x = dst_x.v;
                f.destination_y = dst_y.v;
                f.roam_length = 0;
            }
            break
        case FIGURE_ACTION_197_HERD_ANIMAL_MOVING:
            figure_movement_move_ticks(f, 2);
            if (f.direction == DIR_FIGURE_AT_DESTINATION || f.direction == DIR_FIGURE_LOST) {
                f.direction = f.previous_tile_direction;
                f.action_state = FIGURE_ACTION_196_HERD_ANIMAL_AT_REST;
                f.wait_ticks = f.id & 0x1f;
            } else if (f.direction == DIR_FIGURE_REROUTE) {
                figure_route_remove(f);
            }
            break
    }
    let dir: number = figure_image_direction(f);
    if (f.action_state == FIGURE_ACTION_149_CORPSE) {
        f.image_id = image_group(GROUP_FIGURE_ZEBRA) + 96 + figure_image_corpse_offset(f);
    } else if (f.action_state == FIGURE_ACTION_196_HERD_ANIMAL_AT_REST) {
        f.image_id = image_group(GROUP_FIGURE_ZEBRA) + dir;
    } else {
        f.image_id = image_group(GROUP_FIGURE_ZEBRA) + dir + 8 * f.image_offset;
    }
}
function set_horse_destination(f: figure, state: number) {
    let b: building = building_get(f.building_id);
    let orientation: number = city_view_orientation();
    if (state == HORSE_CREATED) {
        map_figure_delete(f);
        if (orientation == DIR_0_TOP || orientation == DIR_6_LEFT) {
            f.destination_x = b.x + HORSE_DESTINATION_1[f.wait_ticks_missile].x;
            f.destination_y = b.y + HORSE_DESTINATION_1[f.wait_ticks_missile].y;
        } else {
            f.destination_x = b.x + HORSE_DESTINATION_2[f.wait_ticks_missile].x;
            f.destination_y = b.y + HORSE_DESTINATION_2[f.wait_ticks_missile].y;
        }
        if (f.resource_id == 1) {
            f.destination_y++;
        }
        f.x = f.destination_x;
        f.y = f.destination_y;
        f.cross_country_x = 15 * f.x;
        f.cross_country_y = 15 * f.y;
        f.grid_offset = map_grid_offset(f.x, f.y);
        map_figure_add(f);
    } else if (state == HORSE_RACING) {
        if (orientation == DIR_0_TOP || orientation == DIR_6_LEFT) {
            f.destination_x = b.x + HORSE_DESTINATION_1[f.wait_ticks_missile].x;
            f.destination_y = b.y + HORSE_DESTINATION_1[f.wait_ticks_missile].y;
        } else {
            f.destination_x = b.x + HORSE_DESTINATION_2[f.wait_ticks_missile].x;
            f.destination_y = b.y + HORSE_DESTINATION_2[f.wait_ticks_missile].y;
        }
    } else if (state == HORSE_FINISHED) {
        if (orientation == DIR_0_TOP || orientation == DIR_6_LEFT) {
            if (f.resource_id) {
                f.destination_x = b.x + 1;
                f.destination_y = b.y + 2;
            } else {
                f.destination_x = b.x + 1;
                f.destination_y = b.y + 1;
            }
        } else {
            if (f.resource_id) {
                f.destination_x = b.x + 12;
                f.destination_y = b.y + 3;
            } else {
                f.destination_x = b.x + 12;
                f.destination_y = b.y + 2;
            }
        }
    }
}
export function figure_hippodrome_horse_action(f: figure) {
    city_entertainment_set_hippodrome_has_race(1);
    f.use_cross_country = 1;
    f.is_ghost = 0;
    figure_image_increase_offset(f, 8);
    switch (f.action_state) {
        case FIGURE_ACTION_200_HIPPODROME_HORSE_CREATED:
            f.image_offset = 0;
            f.wait_ticks_missile = 0;
            set_horse_destination(f, HORSE_CREATED);
            f.wait_ticks++;
            if (f.wait_ticks > 60 && f.resource_id == 0) {
                f.action_state = FIGURE_ACTION_201_HIPPODROME_HORSE_RACING;
                f.wait_ticks = 0;
            }
            f.wait_ticks++;
            if (f.wait_ticks > 20 && f.resource_id == 1) {
                f.action_state = FIGURE_ACTION_201_HIPPODROME_HORSE_RACING;
                f.wait_ticks = 0;
            }
            break
        case FIGURE_ACTION_201_HIPPODROME_HORSE_RACING:
            f.direction = calc_general_direction(f.x, f.y, f.destination_x, f.destination_y);
            if (f.direction == DIR_FIGURE_AT_DESTINATION) {
                f.wait_ticks_missile++;
                if (f.wait_ticks_missile >= 22) {
                    f.wait_ticks_missile = 0;
                    f.leading_figure_id++;
                    if (f.leading_figure_id >= 6) {
                        f.wait_ticks = 0;
                        f.action_state = FIGURE_ACTION_202_HIPPODROME_HORSE_DONE;
                    }
                    if ((f.id + random_byte()) & 1) {
                        f.speed_multiplier = 3;
                    } else {
                        f.speed_multiplier = 4;
                    }
                } else if (f.wait_ticks_missile == 11) {
                    if ((f.id + random_byte()) & 1) {
                        f.speed_multiplier = 3;
                    } else {
                        f.speed_multiplier = 4;
                    }
                }
                set_horse_destination(f, HORSE_RACING);
                f.direction = calc_general_direction(f.x, f.y, f.destination_x, f.destination_y);
                figure_movement_set_cross_country_direction(f,
                    f.cross_country_x, f.cross_country_y, 15 * f.destination_x, 15 * f.destination_y, 0);
            }
            if (f.action_state != FIGURE_ACTION_202_HIPPODROME_HORSE_DONE) {
                figure_movement_move_ticks_cross_country(f, f.speed_multiplier);
            }
            break
        case FIGURE_ACTION_202_HIPPODROME_HORSE_DONE:
            if (!f.wait_ticks) {
                set_horse_destination(f, HORSE_FINISHED);
                f.direction = calc_general_direction(f.x, f.y, f.destination_x, f.destination_y);
                figure_movement_set_cross_country_direction(f,
                    f.cross_country_x, f.cross_country_y, 15 * f.destination_x, 15 * f.destination_y, 0);
            }
            if (f.direction != DIR_FIGURE_AT_DESTINATION) {
                figure_movement_move_ticks_cross_country(f, 1);
            }
            f.wait_ticks++;
            if (f.wait_ticks > 30) {
                f.image_offset = 0;
            }
            f.wait_ticks++;
            if (f.wait_ticks > 150) {
                f.state = FIGURE_STATE_DEAD;
            }
            break
    }
    let dir: number = figure_image_direction(f);
    if (f.resource_id == 0) {
        f.image_id = image_group(GROUP_FIGURE_HIPPODROME_HORSE_1) +
            dir + 8 * f.image_offset;
        f.cart_image_id = image_group(GROUP_FIGURE_HIPPODROME_CART_1) + dir;
    } else {
        f.image_id = image_group(GROUP_FIGURE_HIPPODROME_HORSE_2) +
            dir + 8 * f.image_offset;
        f.cart_image_id = image_group(GROUP_FIGURE_HIPPODROME_CART_2) + dir;
    }
    let cart_dir: number = (dir + 4) % 8;
    figure_image_set_cart_offset(f, cart_dir);
}
export function figure_hippodrome_horse_reroute() {
    if (!city_entertainment_hippodrome_has_race()) {
        return;
    }
    for (let i: number = 1; i < MAX_FIGURES; i++) {
        let f: figure = figure_get(i);
        if (f.state == FIGURE_STATE_ALIVE && f.type == FIGURE_HIPPODROME_HORSES) {
            f.wait_ticks_missile = 0;
            set_horse_destination(f, HORSE_CREATED);
        }
    }
}
