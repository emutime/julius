import { building_animation_offset } from 'building/animation';
import { building, building_get, building_main } from 'building/building';
import { building_construction_record_view_position } from 'building/construction';
import { building_is_farm } from 'building/industry';
import { building_type } from 'building/type';
import { city_view_foreach_map_tile, city_view_foreach_valid_map_tile, city_view_foreach_valid_map_tile_row, city_view_orientation } from 'city/view';
import { config_get, config_key } from 'core/config';
import { direction_type } from 'core/direction';
import { image, image_get, image_group } from 'core/image';
import { group_terrain } from 'core/image_group';
import { figure, figure_get } from 'figure/figure';
import { resource_type } from 'game/resource';
import { game_state_overlay, overlay } from 'game/state';
import { COLOR_MASK_RED, color_t } from 'graphics/color';
import { image_draw, image_draw_blend, image_draw_isometric_footprint_from_draw_tile, image_draw_isometric_top_from_draw_tile, image_draw_masked } from 'graphics/image';
import { tooltip_context } from 'graphics/tooltip';
import { map_is_bridge } from 'map/bridge';
import { map_building_at } from 'map/building';
import { map_figure_at } from 'map/figure';
import { GRID } from 'map/grid';
import { map_image_at } from 'map/image';
import { map_tile } from 'map/point';
import { edge_x, map_property_is_deleted, map_property_is_draw_tile, map_property_multi_tile_size, map_property_multi_tile_xy } from 'map/property';
import { map_random_get } from 'map/random';
import { map_terrain_get, map_terrain_is, terrain } from 'map/terrain';
import { city_draw_bridge } from 'widget/city_bridge';
import { city_building_ghost_draw, city_building_ghost_mark_deleting } from 'widget/city_building_ghost';
import { city_draw_figure } from 'widget/city_figure';
import { city_overlay, city_with_overlay_draw_building_footprint, city_with_overlay_draw_building_top, column_type, NO_COLUMN } from 'widget/city_overlay';
import { city_overlay_for_academy, city_overlay_for_education, city_overlay_for_library, city_overlay_for_school } from 'widget/city_overlay_education';
import { city_overlay_for_amphitheater, city_overlay_for_colosseum, city_overlay_for_entertainment, city_overlay_for_hippodrome, city_overlay_for_theater } from 'widget/city_overlay_entertainment';
import { city_overlay_for_barber, city_overlay_for_bathhouse, city_overlay_for_clinic, city_overlay_for_hospital } from 'widget/city_overlay_health';
import { city_overlay_for_desirability, city_overlay_for_food_stocks, city_overlay_for_religion, city_overlay_for_tax_income, city_overlay_for_water } from 'widget/city_overlay_other';
import { city_overlay_for_crime, city_overlay_for_damage, city_overlay_for_fire, city_overlay_for_native, city_overlay_for_problems, city_overlay_problems_prepare_building } from 'widget/city_overlay_risks';
import BUILDING_PREFECTURE = building_type.BUILDING_PREFECTURE;
import BUILDING_MARKET = building_type.BUILDING_MARKET;
import BUILDING_GRANARY = building_type.BUILDING_GRANARY;
import BUILDING_WAREHOUSE = building_type.BUILDING_WAREHOUSE;
import BUILDING_ENGINEERS_POST = building_type.BUILDING_ENGINEERS_POST;
import BUILDING_RESERVOIR = building_type.BUILDING_RESERVOIR;
import BUILDING_FOUNTAIN = building_type.BUILDING_FOUNTAIN;
import BUILDING_BURNING_RUIN = building_type.BUILDING_BURNING_RUIN;
import CONFIG_UI_VISUAL_FEEDBACK_ON_DELETE = config_key.CONFIG_UI_VISUAL_FEEDBACK_ON_DELETE;
import RESOURCE_NONE = resource_type.RESOURCE_NONE;
import OVERLAY_WATER = overlay.OVERLAY_WATER;
import OVERLAY_RELIGION = overlay.OVERLAY_RELIGION;
import OVERLAY_FIRE = overlay.OVERLAY_FIRE;
import OVERLAY_DAMAGE = overlay.OVERLAY_DAMAGE;
import OVERLAY_CRIME = overlay.OVERLAY_CRIME;
import OVERLAY_ENTERTAINMENT = overlay.OVERLAY_ENTERTAINMENT;
import OVERLAY_THEATER = overlay.OVERLAY_THEATER;
import OVERLAY_AMPHITHEATER = overlay.OVERLAY_AMPHITHEATER;
import OVERLAY_COLOSSEUM = overlay.OVERLAY_COLOSSEUM;
import OVERLAY_HIPPODROME = overlay.OVERLAY_HIPPODROME;
import OVERLAY_EDUCATION = overlay.OVERLAY_EDUCATION;
import OVERLAY_SCHOOL = overlay.OVERLAY_SCHOOL;
import OVERLAY_LIBRARY = overlay.OVERLAY_LIBRARY;
import OVERLAY_ACADEMY = overlay.OVERLAY_ACADEMY;
import OVERLAY_BARBER = overlay.OVERLAY_BARBER;
import OVERLAY_BATHHOUSE = overlay.OVERLAY_BATHHOUSE;
import OVERLAY_CLINIC = overlay.OVERLAY_CLINIC;
import OVERLAY_HOSPITAL = overlay.OVERLAY_HOSPITAL;
import OVERLAY_TAX_INCOME = overlay.OVERLAY_TAX_INCOME;
import OVERLAY_FOOD_STOCKS = overlay.OVERLAY_FOOD_STOCKS;
import OVERLAY_DESIRABILITY = overlay.OVERLAY_DESIRABILITY;
import OVERLAY_NATIVE = overlay.OVERLAY_NATIVE;
import OVERLAY_PROBLEMS = overlay.OVERLAY_PROBLEMS;
import GROUP_TERRAIN_BLACK = group_terrain.GROUP_TERRAIN_BLACK;
import GROUP_TERRAIN_GRASS_1 = group_terrain.GROUP_TERRAIN_GRASS_1;
import GROUP_TERRAIN_OVERLAY = group_terrain.GROUP_TERRAIN_OVERLAY;
import GROUP_TERRAIN_FLAT_TILE = group_terrain.GROUP_TERRAIN_FLAT_TILE;
import GROUP_BUILDING_WAREHOUSE = group_terrain.GROUP_BUILDING_WAREHOUSE;
import GROUP_BUILDING_GRANARY = group_terrain.GROUP_BUILDING_GRANARY;
import GROUP_OVERLAY_COLUMN = group_terrain.GROUP_OVERLAY_COLUMN;
import DIR_0_TOP = direction_type.DIR_0_TOP;
import DIR_2_RIGHT = direction_type.DIR_2_RIGHT;
import DIR_4_BOTTOM = direction_type.DIR_4_BOTTOM;
import DIR_6_LEFT = direction_type.DIR_6_LEFT;
import GRID_SIZE = GRID.GRID_SIZE;
import EDGE_X0Y0 = edge_x.EDGE_X0Y0;
import EDGE_X1Y0 = edge_x.EDGE_X1Y0;
import EDGE_X2Y0 = edge_x.EDGE_X2Y0;
import EDGE_X0Y1 = edge_x.EDGE_X0Y1;
import EDGE_X1Y1 = edge_x.EDGE_X1Y1;
import EDGE_X0Y2 = edge_x.EDGE_X0Y2;
import EDGE_X2Y2 = edge_x.EDGE_X2Y2;
import TERRAIN_BUILDING = terrain.TERRAIN_BUILDING;
import TERRAIN_ROAD = terrain.TERRAIN_ROAD;
import TERRAIN_AQUEDUCT = terrain.TERRAIN_AQUEDUCT;
import TERRAIN_WALL = terrain.TERRAIN_WALL;
import TERRAIN_GATEHOUSE = terrain.TERRAIN_GATEHOUSE;
import COLUMN_TYPE_RISK = column_type.COLUMN_TYPE_RISK;
let overlay: city_overlay = 0;
function OFFSET(x: number, y: number) { return x + GRID_SIZE * y };

let ADJACENT_OFFSETS: number[][][] = [
    [
        [OFFSET(- 1, 0), OFFSET(-1, -1), OFFSET(-1, -2), OFFSET(0, -2), OFFSET(1, -2)],
        [OFFSET(0, -1), OFFSET(1, -1), OFFSET(2, -1), OFFSET(2, 0), OFFSET(2, 1)],
        [OFFSET(1, 0), OFFSET(1, 1), OFFSET(1, 2), OFFSET(0, 2), OFFSET(-1, 2)],
        [OFFSET(0, 1), OFFSET(-1, 1), OFFSET(-2, 1), OFFSET(-2, 0), OFFSET(-2, -1)]
    ],
    [
        [OFFSET(-1, 0), OFFSET(-1, -1), OFFSET(-1, -2), OFFSET(-1, -3), OFFSET(0, -3), OFFSET(1, -3), OFFSET(2, -3)],
        [OFFSET(0, -1), OFFSET(1, -1), OFFSET(2, -1), OFFSET(3, -1), OFFSET(3, 0), OFFSET(3, 1), OFFSET(3, 2)],
        [OFFSET(1, 0), OFFSET(1, 1), OFFSET(1, 2), OFFSET(1, 3), OFFSET(0, 3), OFFSET(-1, 3), OFFSET(-2, 3)],
        [OFFSET(0, 1), OFFSET(-1, 1), OFFSET(-2, 1), OFFSET(-3, 1), OFFSET(-3, 0), OFFSET(-3, -1), OFFSET(-3, -2)]
    ]
];
function get_city_overlay() {
    switch (game_state_overlay()) {
        case OVERLAY_FIRE:
            return city_overlay_for_fire();
        case OVERLAY_CRIME:
            return city_overlay_for_crime();
        case OVERLAY_DAMAGE:
            return city_overlay_for_damage();
        case OVERLAY_PROBLEMS:
            return city_overlay_for_problems();
        case OVERLAY_NATIVE:
            return city_overlay_for_native();
        case OVERLAY_ENTERTAINMENT:
            return city_overlay_for_entertainment();
        case OVERLAY_THEATER:
            return city_overlay_for_theater();
        case OVERLAY_AMPHITHEATER:
            return city_overlay_for_amphitheater();
        case OVERLAY_COLOSSEUM:
            return city_overlay_for_colosseum();
        case OVERLAY_HIPPODROME:
            return city_overlay_for_hippodrome();
        case OVERLAY_EDUCATION:
            return city_overlay_for_education();
        case OVERLAY_SCHOOL:
            return city_overlay_for_school();
        case OVERLAY_LIBRARY:
            return city_overlay_for_library();
        case OVERLAY_ACADEMY:
            return city_overlay_for_academy();
        case OVERLAY_BARBER:
            return city_overlay_for_barber();
        case OVERLAY_BATHHOUSE:
            return city_overlay_for_bathhouse();
        case OVERLAY_CLINIC:
            return city_overlay_for_clinic();
        case OVERLAY_HOSPITAL:
            return city_overlay_for_hospital();
        case OVERLAY_RELIGION:
            return city_overlay_for_religion();
        case OVERLAY_TAX_INCOME:
            return city_overlay_for_tax_income();
        case OVERLAY_FOOD_STOCKS:
            return city_overlay_for_food_stocks();
        case OVERLAY_WATER:
            return city_overlay_for_water();
        case OVERLAY_DESIRABILITY:
            return city_overlay_for_desirability();
        default:
            return 0
    }
}
function select_city_overlay() {
    if (!overlay || overlay.type != game_state_overlay()) {
        overlay = get_city_overlay();
    }
    return overlay != 0;
}
export function city_with_overlay_update() {
    select_city_overlay();
}
function is_drawable_farmhouse(grid_offset: number, map_orientation: number) {
    if (!map_property_is_draw_tile(grid_offset)) {
        return 0;
    }
    let xy: number = map_property_multi_tile_xy(grid_offset);
    if (map_orientation == DIR_0_TOP && xy == EDGE_X0Y1) {
        return 1;
    }
    if (map_orientation == DIR_2_RIGHT && xy == EDGE_X0Y0) {
        return 1;
    }
    if (map_orientation == DIR_4_BOTTOM && xy == EDGE_X1Y0) {
        return 1;
    }
    if (map_orientation == DIR_2_RIGHT && xy == EDGE_X1Y1) {
        return 1;
    }
    return 0;
}
function is_drawable_farm_corner(grid_offset: number) {
    if (!map_property_is_draw_tile(grid_offset)) {
        return 0;
    }
    let map_orientation: number = city_view_orientation();
    let xy: number = map_property_multi_tile_xy(grid_offset);
    if (map_orientation == DIR_0_TOP && xy == EDGE_X0Y2) {
        return 1;
    } else if (map_orientation == DIR_2_RIGHT && xy == EDGE_X0Y0) {
        return 1;
    } else if (map_orientation == DIR_4_BOTTOM && xy == EDGE_X2Y0) {
        return 1;
    } else if (map_orientation == DIR_6_LEFT && xy == EDGE_X2Y2) {
        return 1;
    }
    return 0;
}
function draw_building_as_deleted(b: building) {
    if (!config_get(CONFIG_UI_VISUAL_FEEDBACK_ON_DELETE)) {
        return 0;
    }
    b = building_main(b);
    return b.id && (b.is_deleted || map_property_is_deleted(b.grid_offset));
}
function is_multi_tile_terrain(grid_offset: number) {
    return !map_building_at(grid_offset) && map_property_multi_tile_size(grid_offset) > 1;
}
function has_adjacent_deletion(grid_offset: number) {
    let size: number = map_property_multi_tile_size(grid_offset);
    let total_adjacent_offsets: number = size * 2 + 1;
    let adjacent_offset: number = ADJACENT_OFFSETS[size - 2][city_view_orientation() / 2];
    for (let i: number = 0; i < total_adjacent_offsets; ++i) {
        if (map_property_is_deleted(grid_offset + adjacent_offset[i]) ||
            draw_building_as_deleted(building_get(map_building_at(grid_offset + adjacent_offset[i])))) {
            return 1;
        }
    }
    return 0;
}
function draw_flattened_building_footprint(b: building, x: number, y: number, image_offset: number, color_mask: color_t) {
    let image_base: number = image_group(GROUP_TERRAIN_OVERLAY) + image_offset;
    if (b.house_size) {
        image_base += 4
    }
    if (b.size == 1) {
        image_draw_isometric_footprint_from_draw_tile(image_base, x, y, color_mask);
    } else if (b.size == 2) {
        let x_tile_offset: number[] = [30, 0, 60, 30];
        let y_tile_offset: number[] = [-15, 0, 0, 15];
        for (let i: number = 0; i < 4; i++) {
            image_draw_isometric_footprint_from_draw_tile(image_base + i,
                x + x_tile_offset[i], y + y_tile_offset[i], color_mask);
        }
    } else if (b.size == 3) {
        let image_tile_offset: number[] = [0, 1, 2, 1, 3, 2, 3, 3, 3];
        let x_tile_offset: number[] = [60, 30, 90, 0, 60, 120, 30, 90, 60];
        let y_tile_offset: number[] = [- 30, -15, -15, 0, 0, 0, 15, 15, 30
        ];
        for (let i: number = 0; i < 9; i++) {
            image_draw_isometric_footprint_from_draw_tile(image_base + image_tile_offset[i],
                x + x_tile_offset[i], y + y_tile_offset[i], color_mask);
        }
    } else if (b.size == 4) {
        let image_tile_offset: number[] = [0, 1, 2, 1, 3, 2, 1, 3, 3, 2, 3, 3, 3, 3, 3, 3];
        let x_tile_offset: number[] = [
            90,
            60, 120,
            30, 90, 150,
            0, 60, 120, 180,
            30, 90, 150,
            60, 120,
            90
        ];
        let y_tile_offset: number[] = [
            - 45,
            -30, -30,
            -15, -15, -15,
            0, 0, 0, 0,
            15, 15, 15,
            30, 30,
            45
        ];
        for (let i: number = 0; i < 16; i++) {
            image_draw_isometric_footprint_from_draw_tile(image_base + image_tile_offset[i],
                x + x_tile_offset[i], y + y_tile_offset[i], color_mask);
        }
    } else if (b.size == 5) {
        let image_tile_offset: number[] = [0, 1, 2, 1, 3, 2, 1, 3, 3, 2, 1, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3];
        let x_tile_offset: number[] = [
            120,
            90, 150,
            60, 120, 180,
            30, 90, 150, 210,
            0, 60, 120, 180, 240,
            30, 90, 150, 210,
            60, 120, 180,
            90, 150,
            120
        ];
        let y_tile_offset: number[] = [
            - 60,
            -45, -45,
            -30, -30, -30,
            -15, -15, -15, -15,
            0, 0, 0, 0, 0,
            15, 15, 15, 15,
            30, 30, 30,
            45, 45,
            60
        ];
        for (let i: number = 0; i < 25; i++) {
            image_draw_isometric_footprint_from_draw_tile(image_base + image_tile_offset[i],
                x + x_tile_offset[i], y + y_tile_offset[i], color_mask);
        }
    }
}
export function city_with_overlay_draw_building_footprint(x: number, y: number, grid_offset: number, image_offset: number) {
    let building_id: number = map_building_at(grid_offset);
    if (!building_id) {
        return;
    }
    let b: building = building_get(building_id);
    if (overlay.show_building(b)) {
        if (building_is_farm(b.type)) {
            if (is_drawable_farmhouse(grid_offset, city_view_orientation())) {
                image_draw_isometric_footprint_from_draw_tile(map_image_at(grid_offset), x, y, 0);
            } else if (map_property_is_draw_tile(grid_offset)) {
                image_draw_isometric_footprint_from_draw_tile(map_image_at(grid_offset), x, y, 0);
            }
        } else {
            image_draw_isometric_footprint_from_draw_tile(map_image_at(grid_offset), x, y, 0);
        }
    } else {
        let draw: number = 1;
        if (b.size == 3 && building_is_farm(b.type)) {
            draw = is_drawable_farm_corner(grid_offset);
        }
        if (draw) {
            draw_flattened_building_footprint(b, x, y, image_offset, 0);
        }
    }
}
function draw_footprint(x: number, y: number, grid_offset: number) {
    building_construction_record_view_position(x, y, grid_offset);
    if (grid_offset < 0) {
        image_draw_isometric_footprint_from_draw_tile(image_group(GROUP_TERRAIN_BLACK), x, y, 0);
    } else if (overlay.draw_custom_footprint) {
        overlay.draw_custom_footprint(x, y, grid_offset);
    } else if (map_property_is_draw_tile(grid_offset)) {
        let terrain: number = map_terrain_get(grid_offset);
        if (terrain & (TERRAIN_AQUEDUCT | TERRAIN_WALL)) {
            let image_id: number = image_group(GROUP_TERRAIN_GRASS_1) + (map_random_get(grid_offset) & 7);
            image_draw_isometric_footprint_from_draw_tile(image_id, x, y, 0);
        } else if ((terrain & TERRAIN_ROAD) && !(terrain & TERRAIN_BUILDING)) {
            image_draw_isometric_footprint_from_draw_tile(map_image_at(grid_offset), x, y, 0);
        } else if (terrain & TERRAIN_BUILDING) {
            city_with_overlay_draw_building_footprint(x, y, grid_offset, 0);
        } else {
            image_draw_isometric_footprint_from_draw_tile(map_image_at(grid_offset), x, y, 0);
        }
    }
}
function draw_overlay_column(x: number, y: number, height: number, is_red: number) {
    let image_id: number = image_group(GROUP_OVERLAY_COLUMN);
    if (is_red) {
        image_id += 9
    }
    if (height > 10) {
        height = 10;
    }
    let capital_height: number = image_get(image_id).height;
    image_draw(image_id + 2, x + 9, y - 8);
    if (height) {
        for (let i: number = 1; i < height; i++) {
            image_draw(image_id + 1, x + 17, y - 8 - 10 * i + 13);
        }
        image_draw(image_id, x + 5, y - 8 - capital_height - 10 * (height - 1) + 13);
    }
}
function draw_building_top(grid_offset: number, b: building, x: number, y: number) {
    let color_mask: color_t = draw_building_as_deleted(b) ? COLOR_MASK_RED : 0;
    if (building_is_farm(b.type)) {
        if (is_drawable_farmhouse(grid_offset, city_view_orientation())) {
            image_draw_isometric_top_from_draw_tile(map_image_at(grid_offset), x, y, color_mask);
        } else if (map_property_is_draw_tile(grid_offset)) {
            image_draw_isometric_top_from_draw_tile(map_image_at(grid_offset), x, y, color_mask);
        }
        return;
    }
    if (b.type == BUILDING_GRANARY) {
        let img: image = image_get(map_image_at(grid_offset));
        image_draw(image_group(GROUP_BUILDING_GRANARY) + 1,
            x + img.sprite_offset_x, y + img.sprite_offset_y - 30 - (img.height - 90));
        if (b.data.granary.resource_stored[RESOURCE_NONE] < 2400) {
            image_draw(image_group(GROUP_BUILDING_GRANARY) + 2, x + 33, y - 60);
            if (b.data.granary.resource_stored[RESOURCE_NONE] < 1800) {
                image_draw(image_group(GROUP_BUILDING_GRANARY) + 3, x + 56, y - 50);
            }
            if (b.data.granary.resource_stored[RESOURCE_NONE] < 1200) {
                image_draw(image_group(GROUP_BUILDING_GRANARY) + 4, x + 91, y - 50);
            }
            if (b.data.granary.resource_stored[RESOURCE_NONE] < 600) {
                image_draw(image_group(GROUP_BUILDING_GRANARY) + 5, x + 117, y - 62);
            }
        }
    }
    if (b.type == BUILDING_WAREHOUSE) {
        image_draw(image_group(GROUP_BUILDING_WAREHOUSE) + 17, x - 4, y - 42);
    }
    image_draw_isometric_top_from_draw_tile(map_image_at(grid_offset), x, y, color_mask);
}
export function city_with_overlay_draw_building_top(x: number, y: number, grid_offset: number) {
    let b: building = building_get(map_building_at(grid_offset));
    if (overlay.type == OVERLAY_PROBLEMS) {
        city_overlay_problems_prepare_building(b);
    }
    if (overlay.show_building(b)) {
        draw_building_top(grid_offset, b, x, y);
    } else {
        let column_height: number = overlay.get_column_height(b);
        if (column_height != NO_COLUMN) {
            let draw: number = 1;
            if (building_is_farm(b.type)) {
                draw = is_drawable_farm_corner(grid_offset);
            }
            if (draw) {
                draw_overlay_column(x, y, column_height, overlay.column_type == COLUMN_TYPE_RISK);
            }
        }
    }
}
function draw_top(x: number, y: number, grid_offset: number) {
    if (overlay.draw_custom_top) {
        overlay.draw_custom_top(x, y, grid_offset);
    } else if (map_property_is_draw_tile(grid_offset)) {
        if (!map_terrain_is(grid_offset, TERRAIN_WALL | TERRAIN_AQUEDUCT | TERRAIN_ROAD)) {
            if (map_terrain_is(grid_offset, TERRAIN_BUILDING) && map_building_at(grid_offset)) {
                city_with_overlay_draw_building_top(x, y, grid_offset);
            } else if (!map_terrain_is(grid_offset, TERRAIN_BUILDING)) {
                let color_mask: color_t = 0;
                if (map_property_is_deleted(grid_offset) && !is_multi_tile_terrain(grid_offset)) {
                    color_mask = COLOR_MASK_RED;
                }
                image_draw_isometric_top_from_draw_tile(map_image_at(grid_offset), x, y, color_mask);
            }
        }
    }
}
function draw_animation(x: number, y: number, grid_offset: number) {
    let draw: number = 0;
    if (map_building_at(grid_offset)) {
        let btype: number = building_get(map_building_at(grid_offset)).type;
        switch (overlay.type) {
            case OVERLAY_FIRE:
            case OVERLAY_CRIME:
                if (btype == BUILDING_PREFECTURE || btype == BUILDING_BURNING_RUIN) {
                    draw = 1;
                }
                break
            case OVERLAY_DAMAGE:
                if (btype == BUILDING_ENGINEERS_POST) {
                    draw = 1;
                }
                break
            case OVERLAY_WATER:
                if (btype == BUILDING_RESERVOIR || btype == BUILDING_FOUNTAIN) {
                    draw = 1;
                }
                break
            case OVERLAY_FOOD_STOCKS:
                if (btype == BUILDING_MARKET || btype == BUILDING_GRANARY) {
                    draw = 1;
                }
                break
        }
    }
    let image_id: number = map_image_at(grid_offset);
    let img: image = image_get(image_id);
    if (img.num_animation_sprites && draw) {
        if (map_property_is_draw_tile(grid_offset)) {
            let b: building = building_get(map_building_at(grid_offset));
            let color_mask: number = draw_building_as_deleted(b) ? COLOR_MASK_RED : 0;
            if (b.type == BUILDING_GRANARY) {
                image_draw_masked(image_group(GROUP_BUILDING_GRANARY) + 1,
                    x + img.sprite_offset_x,
                    y + 60 + img.sprite_offset_y - img.height,
                    color_mask);
                if (b.data.granary.resource_stored[RESOURCE_NONE] < 2400) {
                    image_draw_masked(image_group(GROUP_BUILDING_GRANARY) + 2, x + 33, y - 60, color_mask);
                }
                if (b.data.granary.resource_stored[RESOURCE_NONE] < 1800) {
                    image_draw_masked(image_group(GROUP_BUILDING_GRANARY) + 3, x + 56, y - 50, color_mask);
                }
                if (b.data.granary.resource_stored[RESOURCE_NONE] < 1200) {
                    image_draw_masked(image_group(GROUP_BUILDING_GRANARY) + 4, x + 91, y - 50, color_mask);
                }
                if (b.data.granary.resource_stored[RESOURCE_NONE] < 600) {
                    image_draw_masked(image_group(GROUP_BUILDING_GRANARY) + 5, x + 117, y - 62, color_mask);
                }
            } else {
                let animation_offset: number = building_animation_offset(b, image_id, grid_offset);
                if (animation_offset > 0) {
                    if (animation_offset > img.num_animation_sprites) {
                        animation_offset = img.num_animation_sprites;
                    }
                    let ydiff: number = 0;
                    switch (map_property_multi_tile_size(grid_offset)) {
                        case 1:
                            ydiff = 30;
                            break
                        case 2:
                            ydiff = 45;
                            break
                        case 3:
                            ydiff = 60;
                            break
                        case 4:
                            ydiff = 75;
                            break
                        case 5:
                            ydiff = 90;
                            break
                    }
                    image_draw_masked(image_id + animation_offset,
                        x + img.sprite_offset_x,
                        y + ydiff + img.sprite_offset_y - img.height,
                        color_mask);
                }
            }
        }
    } else if (map_is_bridge(grid_offset)) {
        city_draw_bridge(x, y, grid_offset);
    }
}
function draw_figures(x: number, y: number, grid_offset: number) {
    let figure_id: number = map_figure_at(grid_offset);
    while (figure_id) {
        let f: figure = figure_get(figure_id);
        if (!f.is_ghost && overlay.show_figure(f)) {
            city_draw_figure(f, x, y, 0);
        }
        figure_id = f.next_figure_id_on_same_tile;
    }
}
function draw_elevated_figures(x: number, y: number, grid_offset: number) {
    let figure_id: number = map_figure_at(grid_offset);
    while (figure_id > 0) {
        let f: figure = figure_get(figure_id);
        if (((f.use_cross_country && !f.is_ghost) || f.height_adjusted_ticks) && overlay.show_figure(f)) {
            city_draw_figure(f, x, y, 0);
        }
        figure_id = f.next_figure_id_on_same_tile;
    }
}
function should_draw_top_before_deletion(grid_offset: number) {
    return is_multi_tile_terrain(grid_offset) && has_adjacent_deletion(grid_offset);
}
function deletion_draw_terrain_top(x: number, y: number, grid_offset: number) {
    if (should_draw_top_before_deletion(grid_offset)) {
        draw_top(x, y, grid_offset);
    }
}
function deletion_draw_animations(x: number, y: number, grid_offset: number) {
    if (map_property_is_deleted(grid_offset) || draw_building_as_deleted(building_get(map_building_at(grid_offset)))) {
        image_draw_blend(image_group(GROUP_TERRAIN_FLAT_TILE), x, y, COLOR_MASK_RED);
    }
    if (!should_draw_top_before_deletion(grid_offset)) {
        draw_top(x, y, grid_offset);
    }
    draw_animation(x, y, grid_offset);
}
export function city_with_overlay_draw(tile: map_tile) {
    if (!select_city_overlay()) {
        return;
    }
    let should_mark_deleting: number = city_building_ghost_mark_deleting(tile);
    city_view_foreach_map_tile(draw_footprint);
    if (!should_mark_deleting) {
        city_view_foreach_valid_map_tile_row(
            draw_figures,
            draw_top,
            draw_animation
        );
        city_building_ghost_draw(tile);
        city_view_foreach_valid_map_tile(draw_elevated_figures);
    } else {
        city_view_foreach_valid_map_tile(draw_figures);
        city_view_foreach_valid_map_tile(deletion_draw_terrain_top);
        city_view_foreach_valid_map_tile(deletion_draw_animations);
        city_view_foreach_valid_map_tile(draw_elevated_figures);
    }
}
export function city_with_overlay_get_tooltip_text(c: tooltip_context, grid_offset: number) {
    let overlay_type: number = overlay.type;
    let building_id: number = map_building_at(grid_offset);
    if (overlay.get_tooltip_for_building && !building_id) {
        return 0;
    }
    let overlay_requires_house: number = overlay_type != OVERLAY_WATER && overlay_type != OVERLAY_FIRE &&
        overlay_type != OVERLAY_DAMAGE && overlay_type != OVERLAY_NATIVE && overlay_type != OVERLAY_DESIRABILITY;
    let b: building = building_get(building_id);
    if (overlay_requires_house && !b.house_size) {
        return 0;
    }
    if (overlay.get_tooltip_for_building) {
        return overlay.get_tooltip_for_building(c, b);
    } else if (overlay.get_tooltip_for_grid_offset) {
        return overlay.get_tooltip_for_grid_offset(c, grid_offset);
    }
    return 0;
}
