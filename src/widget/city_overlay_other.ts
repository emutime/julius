import { NO_COLUMN } from 'widget/city_overlay';
import { COLOR_MASK_RED } from 'graphics/color';
import { building_type } from 'building/type';
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
import BUILDING_WHARF = building_type.BUILDING_WHARF;
import BUILDING_SENATE = building_type.BUILDING_SENATE;
import BUILDING_FORUM = building_type.BUILDING_FORUM;
import BUILDING_RESERVOIR = building_type.BUILDING_RESERVOIR;
import BUILDING_FOUNTAIN = building_type.BUILDING_FOUNTAIN;
import BUILDING_WELL = building_type.BUILDING_WELL;
import BUILDING_ORACLE = building_type.BUILDING_ORACLE;
import { building_type } from 'building/type';
import { house_level } from 'building/type';;
import { buffer } from 'core/buffer';
import { building } from 'building/building';
import { building_get } from 'building/building';
import { building_main } from 'building/building';
import { direction_type } from 'core/direction';
import { figure_type } from 'figure/type';
import FIGURE_CART_PUSHER = figure_type.FIGURE_CART_PUSHER;
import FIGURE_TAX_COLLECTOR = figure_type.FIGURE_TAX_COLLECTOR;
import FIGURE_FISHING_BOAT = figure_type.FIGURE_FISHING_BOAT;
import FIGURE_MARKET_TRADER = figure_type.FIGURE_MARKET_TRADER;
import FIGURE_PRIEST = figure_type.FIGURE_PRIEST;
import FIGURE_MARKET_BUYER = figure_type.FIGURE_MARKET_BUYER;
import FIGURE_DELIVERY_BOY = figure_type.FIGURE_DELIVERY_BOY;
import { figure_type } from 'figure/type';
import { figure } from 'figure/figure';
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
import COLUMN_TYPE_ACCESS = column_type.COLUMN_TYPE_ACCESS;
import { city_overlay } from 'widget/city_overlay';
import { city_with_overlay_draw_building_footprint } from 'widget/city_overlay';
import { city_with_overlay_draw_building_top } from 'widget/city_overlay';
import { model_building } from 'building/model';
import { model_house } from 'building/model';
import { model_get_house } from 'building/model';
import { god_type } from 'city/constants';
import GOD_CERES = god_type.GOD_CERES;
import GOD_NEPTUNE = god_type.GOD_NEPTUNE;
import GOD_MERCURY = god_type.GOD_MERCURY;
import GOD_MARS = god_type.GOD_MARS;
import GOD_VENUS = god_type.GOD_VENUS;
import { city_finance_tax_percentage } from 'city/finance';
import { finance_overview } from 'city/finance';
import { calc_adjust_with_percentage } from 'core/calc';
import { calc_percentage } from 'core/calc';
import { config_key } from 'core/config';
import CONFIG_UI_VISUAL_FEEDBACK_ON_DELETE = config_key.CONFIG_UI_VISUAL_FEEDBACK_ON_DELETE;
import { config_key } from 'core/config';
import { config_string_key } from 'core/config';
import { config_get } from 'core/config';
import { resource_type } from 'game/resource';
import { inventory_type } from 'game/resource';
import INVENTORY_MIN_FOOD = inventory_type.INVENTORY_MIN_FOOD;
import INVENTORY_MAX_FOOD = inventory_type.INVENTORY_MAX_FOOD;
import { workshop_type } from 'game/resource';
import { resource_image_type } from 'game/resource';
import { resource_is_food } from 'game/resource';
import { overlay } from 'game/state';
import OVERLAY_WATER = overlay.OVERLAY_WATER;
import OVERLAY_RELIGION = overlay.OVERLAY_RELIGION;
import OVERLAY_TAX_INCOME = overlay.OVERLAY_TAX_INCOME;
import OVERLAY_FOOD_STOCKS = overlay.OVERLAY_FOOD_STOCKS;
import OVERLAY_DESIRABILITY = overlay.OVERLAY_DESIRABILITY;
import { language_type } from 'core/locale';
import { encoding_type } from 'core/encoding';
import { group_terrain } from 'core/image_group';
import GROUP_TERRAIN_GRASS_1 = group_terrain.GROUP_TERRAIN_GRASS_1;
import GROUP_TERRAIN_OVERLAY = group_terrain.GROUP_TERRAIN_OVERLAY;
import GROUP_TERRAIN_DESIRABILITY = group_terrain.GROUP_TERRAIN_DESIRABILITY;
import { color_t } from 'graphics/color';
import { image } from 'core/image';
import { image_group } from 'core/image';
import { font_t } from 'graphics/font';
import { font_definition } from 'graphics/font';
import { image_draw_isometric_footprint_from_draw_tile } from 'graphics/image';
import { image_draw_isometric_top_from_draw_tile } from 'graphics/image';
import { map_building_at } from 'map/building';
import { map_desirability_get } from 'map/desirability';
import { map_image_at } from 'map/image';
import { map_property_is_draw_tile } from 'map/property';
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
import TERRAIN_ROAD = terrain.TERRAIN_ROAD;
import TERRAIN_RESERVOIR_RANGE = terrain.TERRAIN_RESERVOIR_RANGE;
import TERRAIN_AQUEDUCT = terrain.TERRAIN_AQUEDUCT;
import TERRAIN_ELEVATION = terrain.TERRAIN_ELEVATION;
import TERRAIN_ACCESS_RAMP = terrain.TERRAIN_ACCESS_RAMP;
import TERRAIN_RUBBLE = terrain.TERRAIN_RUBBLE;
import TERRAIN_FOUNTAIN_RANGE = terrain.TERRAIN_FOUNTAIN_RANGE;
import TERRAIN_WALL = terrain.TERRAIN_WALL;
import TERRAIN_GATEHOUSE = terrain.TERRAIN_GATEHOUSE;
import { map_terrain_is } from 'map/terrain';
import { map_terrain_get } from 'map/terrain';
function show_building_religion(b: building) {
    return
    b.type == BUILDING_ORACLE || b.type == BUILDING_SMALL_TEMPLE_CERES ||
        b.type == BUILDING_SMALL_TEMPLE_NEPTUNE || b.type == BUILDING_SMALL_TEMPLE_MERCURY ||
        b.type == BUILDING_SMALL_TEMPLE_MARS || b.type == BUILDING_SMALL_TEMPLE_VENUS ||
        b.type == BUILDING_LARGE_TEMPLE_CERES || b.type == BUILDING_LARGE_TEMPLE_NEPTUNE ||
        b.type == BUILDING_LARGE_TEMPLE_MERCURY || b.type == BUILDING_LARGE_TEMPLE_MARS ||
        b.type == BUILDING_LARGE_TEMPLE_VENUS;
}
function show_building_food_stocks(b: building) {
    return b.type == BUILDING_MARKET || b.type == BUILDING_WHARF || b.type == BUILDING_GRANARY;
}
function show_building_tax_income(b: building) {
    return b.type == BUILDING_FORUM || b.type == BUILDING_SENATE;
}
function show_building_water(b: building) {
    return b.type == BUILDING_WELL || b.type == BUILDING_FOUNTAIN || b.type == BUILDING_RESERVOIR;
}
function show_building_desirability(b: building) {
    return 0;
}
function show_figure_religion(f: figure) {
    return f.type == FIGURE_PRIEST;
}
function show_figure_food_stocks(f: figure) {
    if (f.type == FIGURE_MARKET_BUYER || f.type == FIGURE_MARKET_TRADER ||
        f.type == FIGURE_DELIVERY_BOY || f.type == FIGURE_FISHING_BOAT) {
        return 1;
    } else if (f.type == FIGURE_CART_PUSHER) {
        return resource_is_food(f.resource_id);
    }
    return 0;
}
function show_figure_tax_income(f: figure) {
    return f.type == FIGURE_TAX_COLLECTOR;
}
function show_figure_none(f: figure) {
    return 0;
}
function get_column_height_religion(b: building) {
    return b.house_size && b.data.house.num_gods ? b.data.house.num_gods * 17 / 10 : NO_COLUMN;
}
function get_column_height_food_stocks(b: building) {
    if (b.house_size && model_get_house(b.subtype.house_level).food_types) {
        let pop: number = b.house_population;
        let stocks: number = 0;
        for (let i: number = INVENTORY_MIN_FOOD; i < INVENTORY_MAX_FOOD; i++) {
            stocks += b.data.house.inventory[i]
        }
        let pct_stocks: number = calc_percentage(stocks, pop);
        if (pct_stocks <= 0) {
            return 10;
        } else if (pct_stocks < 100) {
            return 5;
        } else if (pct_stocks <= 200) {
            return 1;
        }
    }
    return NO_COLUMN;
}
function get_column_height_tax_income(b: building) {
    if (b.house_size) {
        let pct: number = calc_adjust_with_percentage(b.tax_income_or_storage / 2, city_finance_tax_percentage());
        if (pct > 0) {
            return pct / 25;
        }
    }
    return NO_COLUMN;
}
function get_column_height_none(b: building) {
    return NO_COLUMN;
}
function add_god(c: tooltip_context, god_id: number) {
    let index: number = c.num_extra_texts;
    c.extra_text_groups[index] = 59;
    c.extra_text_ids[index] = 11 + god_id;
    c.num_extra_texts++;
}
function get_tooltip_religion(c: tooltip_context, b: building) {
    if (b.data.house.num_gods < 5) {
        if (b.data.house.temple_ceres) {
            add_god(c, GOD_CERES);
        }
        if (b.data.house.temple_neptune) {
            add_god(c, GOD_NEPTUNE);
        }
        if (b.data.house.temple_mercury) {
            add_god(c, GOD_MERCURY);
        }
        if (b.data.house.temple_mars) {
            add_god(c, GOD_MARS);
        }
        if (b.data.house.temple_venus) {
            add_god(c, GOD_VENUS);
        }
    }
    if (b.data.house.num_gods <= 0) {
        return 12;
    } else if (b.data.house.num_gods == 1) {
        return 13;
    } else if (b.data.house.num_gods == 2) {
        return 14;
    } else if (b.data.house.num_gods == 3) {
        return 15;
    } else if (b.data.house.num_gods == 4) {
        return 16;
    } else if (b.data.house.num_gods == 5) {
        return 17;
    } else {
        return 18;
    }
}
function get_tooltip_food_stocks(c: tooltip_context, b: building) {
    if (b.house_population <= 0) {
        return 0;
    }
    if (!model_get_house(b.subtype.house_level).food_types) {
        return 104;
    } else {
        let stocks_present: number = 0;
        for (let i: number = INVENTORY_MIN_FOOD; i < INVENTORY_MAX_FOOD; i++) {
            stocks_present += b.data.house.inventory[i]
        }
        let stocks_per_pop: number = calc_percentage(stocks_present, b.house_population);
        if (stocks_per_pop <= 0) {
            return 4;
        } else if (stocks_per_pop < 100) {
            return 5;
        } else if (stocks_per_pop <= 200) {
            return 6;
        } else {
            return 7;
        }
    }
}
function get_tooltip_tax_income(c: tooltip_context, b: building) {
    let denarii: number = calc_adjust_with_percentage(b.tax_income_or_storage / 2, city_finance_tax_percentage());
    if (denarii > 0) {
        c.has_numeric_prefix = 1;
        c.numeric_prefix = denarii;
        return 45;
    } else if (b.house_tax_coverage > 0) {
        return 44;
    } else {
        return 43;
    }
}
function get_tooltip_water(c: tooltip_context, grid_offset: number) {
    if (map_terrain_is(grid_offset, TERRAIN_RESERVOIR_RANGE)) {
        if (map_terrain_is(grid_offset, TERRAIN_FOUNTAIN_RANGE)) {
            return 2;
        } else {
            return 1;
        }
    } else if (map_terrain_is(grid_offset, TERRAIN_FOUNTAIN_RANGE)) {
        return 3;
    }
    return 0;
}
function get_tooltip_desirability(c: tooltip_context, grid_offset: number) {
    let desirability: number = map_desirability_get(grid_offset);
    if (desirability < 0) {
        return 91;
    } else if (desirability == 0) {
        return 92;
    } else {
        return 93;
    }
}
export function city_overlay_for_religion() {
    let overlay: city_overlay = {
        OVERLAY_RELIGION,
        COLUMN_TYPE_ACCESS,
        show_building_religion,
        show_figure_religion,
        get_column_height_religion,
        0,
        get_tooltip_religion,
        0,
        0
    };
    return overlay;
}
export function city_overlay_for_food_stocks() {
    let overlay: city_overlay = {
        OVERLAY_FOOD_STOCKS,
        COLUMN_TYPE_RISK,
        show_building_food_stocks,
        show_figure_food_stocks,
        get_column_height_food_stocks,
        0,
        get_tooltip_food_stocks,
        0,
        0
    };
    return overlay;
}
export function city_overlay_for_tax_income() {
    let overlay: city_overlay = {
        OVERLAY_TAX_INCOME,
        COLUMN_TYPE_ACCESS,
        show_building_tax_income,
        show_figure_tax_income,
        get_column_height_tax_income,
        0,
        get_tooltip_tax_income,
        0,
        0
    };
    return overlay;
}
function has_deleted_building(grid_offset: number) {
    if (!config_get(CONFIG_UI_VISUAL_FEEDBACK_ON_DELETE)) {
        return 0;
    }
    let b: building = building_get(map_building_at(grid_offset));
    b = building_main(b);
    return b.id && (b.is_deleted || map_property_is_deleted(b.grid_offset));
}
function terrain_on_water_overlay() {
    return
    TERRAIN_TREE | TERRAIN_ROCK | TERRAIN_WATER | TERRAIN_SHRUB |
        TERRAIN_GARDEN | TERRAIN_ROAD | TERRAIN_AQUEDUCT | TERRAIN_ELEVATION |
        TERRAIN_ACCESS_RAMP | TERRAIN_RUBBLE;
}
function draw_footprint_water(x: number, y: number, grid_offset: number) {
    if (!map_property_is_draw_tile(grid_offset)) {
        return;
    }
    if (map_terrain_is(grid_offset, terrain_on_water_overlay())) {
        if (map_terrain_is(grid_offset, TERRAIN_BUILDING)) {
            city_with_overlay_draw_building_footprint(x, y, grid_offset, 0);
        } else {
            image_draw_isometric_footprint_from_draw_tile(map_image_at(grid_offset), x, y, 0);
        }
    } else if (map_terrain_is(grid_offset, TERRAIN_WALL)) {
        let image_id: number = image_group(GROUP_TERRAIN_GRASS_1) + (map_random_get(grid_offset) & 7);
        image_draw_isometric_footprint_from_draw_tile(image_id, x, y, 0);
    } else if (map_terrain_is(grid_offset, TERRAIN_BUILDING)) {
        let b: building = building_get(map_building_at(grid_offset));
        let terrain: number = map_terrain_get(grid_offset);
        if (b.id && (b.has_well_access || (b.house_size && b.has_water_access))) {
            terrain |= TERRAIN_FOUNTAIN_RANGE
        }
        let image_offset: number;
        switch (terrain & (TERRAIN_RESERVOIR_RANGE | TERRAIN_FOUNTAIN_RANGE)) {
            case TERRAIN_RESERVOIR_RANGE | TERRAIN_FOUNTAIN_RANGE:
                image_offset = 24;
                break
            case TERRAIN_RESERVOIR_RANGE:
                image_offset = 8;
                break
            case TERRAIN_FOUNTAIN_RANGE:
                image_offset = 16;
                break
            default:
                image_offset = 0
                break
        }
        city_with_overlay_draw_building_footprint(x, y, grid_offset, image_offset);
    } else {
        let image_id: number = image_group(GROUP_TERRAIN_OVERLAY);
        switch (map_terrain_get(grid_offset) & (TERRAIN_RESERVOIR_RANGE | TERRAIN_FOUNTAIN_RANGE)) {
            case TERRAIN_RESERVOIR_RANGE | TERRAIN_FOUNTAIN_RANGE:
                image_id += 27
                break
            case TERRAIN_RESERVOIR_RANGE:
                image_id += 11
                break
            case TERRAIN_FOUNTAIN_RANGE:
                image_id += 19
                break
            default:
                image_id = map_image_at(grid_offset)
                break
        }
        image_draw_isometric_footprint_from_draw_tile(image_id, x, y, 0);
    }
}
function draw_top_water(x: number, y: number, grid_offset: number) {
    if (!map_property_is_draw_tile(grid_offset)) {
        return;
    }
    if (map_terrain_is(grid_offset, terrain_on_water_overlay())) {
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
export function city_overlay_for_water() {
    let overlay: city_overlay = {
        OVERLAY_WATER,
        COLUMN_TYPE_ACCESS,
        show_building_water,
        show_figure_none,
        get_column_height_none,
        get_tooltip_water,
        0,
        draw_footprint_water,
        draw_top_water
    };
    return overlay;
}
function terrain_on_desirability_overlay() {
    return
    TERRAIN_TREE | TERRAIN_ROCK | TERRAIN_WATER |
        TERRAIN_SHRUB | TERRAIN_GARDEN | TERRAIN_ROAD |
        TERRAIN_ELEVATION | TERRAIN_ACCESS_RAMP | TERRAIN_RUBBLE;
}
function get_desirability_image_offset(desirability: number) {
    if (desirability < -10) {
        return 0;
    } else if (desirability < -5) {
        return 1;
    } else if (desirability < 0) {
        return 2;
    } else if (desirability == 1) {
        return 3;
    } else if (desirability < 5) {
        return 4;
    } else if (desirability < 10) {
        return 5;
    } else if (desirability < 15) {
        return 6;
    } else if (desirability < 20) {
        return 7;
    } else if (desirability < 25) {
        return 8;
    } else {
        return 9;
    }
}
function draw_footprint_desirability(x: number, y: number, grid_offset: number) {
    let color_mask: color_t = map_property_is_deleted(grid_offset) ? COLOR_MASK_RED : 0;
    if (map_terrain_is(grid_offset, terrain_on_desirability_overlay())
        && !map_terrain_is(grid_offset, TERRAIN_BUILDING)) {
        if (map_property_is_draw_tile(grid_offset)) {
            image_draw_isometric_footprint_from_draw_tile(map_image_at(grid_offset), x, y, color_mask);
        }
    } else if (map_terrain_is(grid_offset, TERRAIN_AQUEDUCT | TERRAIN_WALL)) {
        let image_id: number = image_group(GROUP_TERRAIN_GRASS_1) + (map_random_get(grid_offset) & 7);
        image_draw_isometric_footprint_from_draw_tile(image_id, x, y, color_mask);
    } else if (map_terrain_is(grid_offset, TERRAIN_BUILDING) || map_desirability_get(grid_offset)) {
        if (has_deleted_building(grid_offset)) {
            color_mask = COLOR_MASK_RED;
        }
        let offset: number = get_desirability_image_offset(map_desirability_get(grid_offset));
        image_draw_isometric_footprint_from_draw_tile(
            image_group(GROUP_TERRAIN_DESIRABILITY) + offset, x, y, color_mask);
    } else {
        image_draw_isometric_footprint_from_draw_tile(map_image_at(grid_offset), x, y, color_mask);
    }
}
function draw_top_desirability(x: number, y: number, grid_offset: number) {
    let color_mask: color_t = map_property_is_deleted(grid_offset) ? COLOR_MASK_RED : 0;
    if (map_terrain_is(grid_offset, terrain_on_desirability_overlay())
        && !map_terrain_is(grid_offset, TERRAIN_BUILDING)) {
        if (map_property_is_draw_tile(grid_offset)) {
            image_draw_isometric_top_from_draw_tile(map_image_at(grid_offset), x, y, color_mask);
        }
    } else if (map_terrain_is(grid_offset, TERRAIN_AQUEDUCT | TERRAIN_WALL)) {
    } else if (map_terrain_is(grid_offset, TERRAIN_BUILDING) || map_desirability_get(grid_offset)) {
        if (has_deleted_building(grid_offset)) {
            color_mask = COLOR_MASK_RED;
        }
        let offset: number = get_desirability_image_offset(map_desirability_get(grid_offset));
        image_draw_isometric_top_from_draw_tile(image_group(GROUP_TERRAIN_DESIRABILITY) + offset, x, y, color_mask);
    } else {
        image_draw_isometric_top_from_draw_tile(map_image_at(grid_offset), x, y, color_mask);
    }
}
export function city_overlay_for_desirability() {
    let overlay: city_overlay = {
        OVERLAY_DESIRABILITY,
        COLUMN_TYPE_ACCESS,
        show_building_desirability,
        show_figure_none,
        get_column_height_none,
        get_tooltip_desirability,
        0,
        draw_footprint_desirability,
        draw_top_desirability
    };
    return overlay;
}
