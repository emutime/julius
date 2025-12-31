import { NO_COLUMN } from 'widget/city_overlay';
import { COLOR_MASK_RED } from 'graphics/color';
import { building_type } from 'building/type';
import BUILDING_BATHHOUSE = building_type.BUILDING_BATHHOUSE;
import BUILDING_PREFECTURE = building_type.BUILDING_PREFECTURE;
import BUILDING_MISSION_POST = building_type.BUILDING_MISSION_POST;
import BUILDING_ENGINEERS_POST = building_type.BUILDING_ENGINEERS_POST;
import BUILDING_NATIVE_HUT = building_type.BUILDING_NATIVE_HUT;
import BUILDING_NATIVE_MEETING = building_type.BUILDING_NATIVE_MEETING;
import BUILDING_FOUNTAIN = building_type.BUILDING_FOUNTAIN;
import BUILDING_BURNING_RUIN = building_type.BUILDING_BURNING_RUIN;
import BUILDING_WHEAT_FARM = building_type.BUILDING_WHEAT_FARM;
import BUILDING_CLAY_PIT = building_type.BUILDING_CLAY_PIT;
import { building_type } from 'building/type';;
import { buffer } from 'core/buffer';
import { building } from 'building/building';
import { building_get } from 'building/building';
import { direction_type } from 'core/direction';
import { figure_action } from 'figure/action';
import FIGURE_ACTION_20_CARTPUSHER_INITIAL = figure_action.FIGURE_ACTION_20_CARTPUSHER_INITIAL;
import { figure_type } from 'figure/type';
import FIGURE_CART_PUSHER = figure_type.FIGURE_CART_PUSHER;
import FIGURE_LABOR_SEEKER = figure_type.FIGURE_LABOR_SEEKER;
import FIGURE_ENGINEER = figure_type.FIGURE_ENGINEER;
import FIGURE_PREFECT = figure_type.FIGURE_PREFECT;
import FIGURE_PROTESTER = figure_type.FIGURE_PROTESTER;
import FIGURE_CRIMINAL = figure_type.FIGURE_CRIMINAL;
import FIGURE_RIOTER = figure_type.FIGURE_RIOTER;
import FIGURE_INDIGENOUS_NATIVE = figure_type.FIGURE_INDIGENOUS_NATIVE;
import FIGURE_MISSIONARY = figure_type.FIGURE_MISSIONARY;
import { figure_type } from 'figure/type';
import { figure } from 'figure/figure';
import { figure_get } from 'figure/figure';
import { time_millis } from 'core/time';
import { touch_coords } from 'input/touch';
import { touch_mode } from 'input/touch';
import { touch } from 'input/touch';
import { mouse_button } from 'input/mouse';
import { scroll_state } from 'input/mouse';
import { mouse } from 'input/mouse';
import { tooltip_type } from 'graphics/tooltip';
import { tooltip_extra_text_type } from 'graphics/tooltip';
import { tooltip_context } from 'graphics/tooltip';
import { column_type } from 'widget/city_overlay';
import COLUMN_TYPE_RISK = column_type.COLUMN_TYPE_RISK;
import { city_overlay } from 'widget/city_overlay';
import { city_with_overlay_draw_building_footprint } from 'widget/city_overlay';
import { city_with_overlay_draw_building_top } from 'widget/city_overlay';
import { map_point } from 'map/point';
import { building_is_workshop } from 'building/industry';
import { overlay } from 'game/state';
import OVERLAY_FIRE = overlay.OVERLAY_FIRE;
import OVERLAY_DAMAGE = overlay.OVERLAY_DAMAGE;
import OVERLAY_CRIME = overlay.OVERLAY_CRIME;
import OVERLAY_NATIVE = overlay.OVERLAY_NATIVE;
import OVERLAY_PROBLEMS = overlay.OVERLAY_PROBLEMS;
import { language_type } from 'core/locale';
import { encoding_type } from 'core/encoding';
import { group_terrain } from 'core/image_group';
import GROUP_TERRAIN_GRASS_1 = group_terrain.GROUP_TERRAIN_GRASS_1;
import GROUP_TERRAIN_DESIRABILITY = group_terrain.GROUP_TERRAIN_DESIRABILITY;
import { color_t } from 'graphics/color';
import { image } from 'core/image';
import { image_group } from 'core/image';
import { font_t } from 'graphics/font';
import { font_definition } from 'graphics/font';
import { image_draw_isometric_footprint_from_draw_tile } from 'graphics/image';
import { image_draw_isometric_top_from_draw_tile } from 'graphics/image';
import { map_building_at } from 'map/building';
import { map_image_at } from 'map/image';
import { map_property_is_draw_tile } from 'map/property';
import { map_property_is_native_land } from 'map/property';
import { map_property_multi_tile_size } from 'map/property';
import { map_property_is_deleted } from 'map/property';
import { map_random_get } from 'map/random';
import { terrain } from 'map/terrain';
import TERRAIN_TREE = terrain.TERRAIN_TREE;
import TERRAIN_ROCK = terrain.TERRAIN_ROCK;
import TERRAIN_WATER = terrain.TERRAIN_WATER;
import TERRAIN_BUILDING = terrain.TERRAIN_BUILDING;
import TERRAIN_SHRUB = terrain.TERRAIN_SHRUB;
import TERRAIN_GARDEN = terrain.TERRAIN_GARDEN;
import TERRAIN_AQUEDUCT = terrain.TERRAIN_AQUEDUCT;
import TERRAIN_ELEVATION = terrain.TERRAIN_ELEVATION;
import TERRAIN_ACCESS_RAMP = terrain.TERRAIN_ACCESS_RAMP;
import TERRAIN_RUBBLE = terrain.TERRAIN_RUBBLE;
import TERRAIN_WALL = terrain.TERRAIN_WALL;
import TERRAIN_GATEHOUSE = terrain.TERRAIN_GATEHOUSE;
import { map_terrain_is } from 'map/terrain';
function is_problem_cartpusher(figure_id: number) {
    if (figure_id) {
        let fig: figure = figure_get(figure_id);
        return fig.action_state == FIGURE_ACTION_20_CARTPUSHER_INITIAL && fig.min_max_seen;
    } else {
        return 0;
    }
}
export function city_overlay_problems_prepare_building(b: building) {
    if (b.house_size) {
        return;
    }
    if (b.type == BUILDING_FOUNTAIN || b.type == BUILDING_BATHHOUSE) {
        if (!b.has_water_access) {
            b.show_on_problem_overlay = 1;
        }
    } else if (b.type >= BUILDING_WHEAT_FARM && b.type <= BUILDING_CLAY_PIT) {
        if (is_problem_cartpusher(b.figure_id)) {
            b.show_on_problem_overlay = 1;
        }
    } else if (building_is_workshop(b.type)) {
        if (is_problem_cartpusher(b.figure_id)) {
            b.show_on_problem_overlay = 1;
        } else if (b.loads_stored <= 0) {
            b.show_on_problem_overlay = 1;
        }
    }
}
function show_building_fire_crime(b: building) {
    return b.type == BUILDING_PREFECTURE || b.type == BUILDING_BURNING_RUIN;
}
function show_building_damage(b: building) {
    return b.type == BUILDING_ENGINEERS_POST;
}
function show_building_problems(b: building) {
    return b.show_on_problem_overlay;
}
function show_building_native(b: building) {
    return b.type == BUILDING_NATIVE_HUT || b.type == BUILDING_NATIVE_MEETING || b.type == BUILDING_MISSION_POST;
}
function show_figure_fire(f: figure) {
    return f.type == FIGURE_PREFECT;
}
function show_figure_damage(f: figure) {
    return f.type == FIGURE_ENGINEER;
}
function show_figure_crime(f: figure) {
    return f.type == FIGURE_PREFECT || f.type == FIGURE_PROTESTER ||
        f.type == FIGURE_CRIMINAL || f.type == FIGURE_RIOTER;
}
function show_figure_problems(f: figure) {
    if (f.type == FIGURE_LABOR_SEEKER) {
        return building_get(f.building_id).show_on_problem_overlay;
    } else if (f.type == FIGURE_CART_PUSHER) {
        return f.action_state == FIGURE_ACTION_20_CARTPUSHER_INITIAL || f.min_max_seen;
    } else {
        return 0;
    }
}
function show_figure_native(f: figure) {
    return f.type == FIGURE_INDIGENOUS_NATIVE || f.type == FIGURE_MISSIONARY;
}
function get_column_height_fire(b: building) {
    return b.fire_risk > 0 ? b.fire_risk / 10 : NO_COLUMN;
}
function get_column_height_damage(b: building) {
    return b.damage_risk > 0 ? b.damage_risk / 20 : NO_COLUMN;
}
function get_column_height_crime(b: building) {
    if (b.house_size) {
        let happiness: number = b.sentiment.house_happiness;
        if (happiness <= 0) {
            return 10;
        } else if (happiness <= 10) {
            return 8;
        } else if (happiness <= 20) {
            return 6;
        } else if (happiness <= 30) {
            return 4;
        } else if (happiness <= 40) {
            return 2;
        } else if (happiness < 50) {
            return 1;
        }
    }
    return NO_COLUMN;
}
function get_column_height_none(b: building) {
    return NO_COLUMN;
}
function get_tooltip_fire(c: tooltip_context, b: building) {
    if (b.fire_risk <= 0) {
        return 46;
    } else if (b.fire_risk <= 20) {
        return 47;
    } else if (b.fire_risk <= 40) {
        return 48;
    } else if (b.fire_risk <= 60) {
        return 49;
    } else if (b.fire_risk <= 80) {
        return 50;
    } else {
        return 51;
    }
}
function get_tooltip_damage(c: tooltip_context, b: building) {
    if (b.damage_risk <= 0) {
        return 52;
    } else if (b.damage_risk <= 40) {
        return 53;
    } else if (b.damage_risk <= 80) {
        return 54;
    } else if (b.damage_risk <= 120) {
        return 55;
    } else if (b.damage_risk <= 160) {
        return 56;
    } else {
        return 57;
    }
}
function get_tooltip_crime(c: tooltip_context, b: building) {
    if (b.sentiment.house_happiness <= 0) {
        return 63;
    } else if (b.sentiment.house_happiness <= 10) {
        return 62;
    } else if (b.sentiment.house_happiness <= 20) {
        return 61;
    } else if (b.sentiment.house_happiness <= 30) {
        return 60;
    } else if (b.sentiment.house_happiness < 50) {
        return 59;
    } else {
        return 58;
    }
}
export function city_overlay_for_fire() {
    let overlay: city_overlay = {
        OVERLAY_FIRE,
        COLUMN_TYPE_RISK,
        show_building_fire_crime,
        show_figure_fire,
        get_column_height_fire,
        0,
        get_tooltip_fire,
        0,
        0
    };
    return overlay;
}
export function city_overlay_for_damage() {
    let overlay: city_overlay = {
        OVERLAY_DAMAGE,
        COLUMN_TYPE_RISK,
        show_building_damage,
        show_figure_damage,
        get_column_height_damage,
        0,
        get_tooltip_damage,
        0,
        0
    };
    return overlay;
}
export function city_overlay_for_crime() {
    let overlay: city_overlay = {
        OVERLAY_CRIME,
        COLUMN_TYPE_RISK,
        show_building_fire_crime,
        show_figure_crime,
        get_column_height_crime,
        0,
        get_tooltip_crime,
        0,
        0
    };
    return overlay;
}
export function city_overlay_for_problems() {
    let overlay: city_overlay = {
        OVERLAY_PROBLEMS,
        COLUMN_TYPE_RISK,
        show_building_problems,
        show_figure_problems,
        get_column_height_none,
        0,
        0,
        0,
        0
    };
    return overlay;
}
function terrain_on_native_overlay() {
    return
    TERRAIN_TREE | TERRAIN_ROCK | TERRAIN_WATER | TERRAIN_SHRUB |
        TERRAIN_GARDEN | TERRAIN_ELEVATION | TERRAIN_ACCESS_RAMP | TERRAIN_RUBBLE;
}
function draw_footprint_native(x: number, y: number, grid_offset: number) {
    if (!map_property_is_draw_tile(grid_offset)) {
        return;
    }
    if (map_terrain_is(grid_offset, terrain_on_native_overlay())) {
        if (map_terrain_is(grid_offset, TERRAIN_BUILDING)) {
            city_with_overlay_draw_building_footprint(x, y, grid_offset, 0);
        } else {
            image_draw_isometric_footprint_from_draw_tile(map_image_at(grid_offset), x, y, 0);
        }
    } else if (map_terrain_is(grid_offset, TERRAIN_AQUEDUCT | TERRAIN_WALL)) {
        let image_id: number = image_group(GROUP_TERRAIN_GRASS_1) + (map_random_get(grid_offset) & 7);
        image_draw_isometric_footprint_from_draw_tile(image_id, x, y, 0);
    } else if (map_terrain_is(grid_offset, TERRAIN_BUILDING)) {
        city_with_overlay_draw_building_footprint(x, y, grid_offset, 0);
    } else {
        if (map_property_is_native_land(grid_offset)) {
            image_draw_isometric_footprint_from_draw_tile(image_group(GROUP_TERRAIN_DESIRABILITY) + 1, x, y, 0);
        } else {
            image_draw_isometric_footprint_from_draw_tile(map_image_at(grid_offset), x, y, 0);
        }
    }
}
function draw_top_native(x: number, y: number, grid_offset: number) {
    if (!map_property_is_draw_tile(grid_offset)) {
        return;
    }
    if (map_terrain_is(grid_offset, terrain_on_native_overlay())) {
        if (!map_terrain_is(grid_offset, TERRAIN_BUILDING)) {
            let color_mask: color_t = 0;
            if (map_property_is_deleted(grid_offset) && map_property_multi_tile_size(grid_offset) == 1) {
                color_mask = COLOR_MASK_RED;
            }
            image_draw_isometric_top_from_draw_tile(map_image_at(grid_offset), x, y, color_mask);
        }
    } else if (map_building_at(grid_offset)) {
        city_with_overlay_draw_building_top(x, y, grid_offset);
    }
}
export function city_overlay_for_native() {
    let overlay: city_overlay = {
        OVERLAY_NATIVE,
        COLUMN_TYPE_RISK,
        show_building_native,
        show_figure_native,
        get_column_height_none,
        0,
        0,
        draw_footprint_native,
        draw_top_native
    };
    return overlay;
}
