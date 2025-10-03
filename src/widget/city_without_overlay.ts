export const OFFSET = 1;
import { COLOR_MASK_RED } from 'graphics/color';
import { map_point } from 'map/point';
import { map_tile } from 'map/point';
import { time_millis } from 'core/time';
import { time_get_millis } from 'core/time';
import { touch_coords } from 'input/touch';
import { touch_mode } from 'input/touch';
import { touch } from 'input/touch';
import { mouse_button } from 'input/mouse';
import { scroll_state } from 'input/mouse';
import { mouse } from 'input/mouse';
import { tooltip_type } from 'graphics/tooltip';
import { tooltip_extra_text_type } from 'graphics/tooltip';
import { tooltip_context } from 'graphics/tooltip';;
import { key_type } from 'input/keys';
import { key_modifier_type } from 'input/keys';
import { hotkey_action } from 'core/hotkey_config';
import { hotkey_mapping } from 'core/hotkey_config';
import { hotkeys } from 'input/hotkey';
import { pixel_coordinate } from 'widget/city';
import { building_type } from 'building/type';
import BUILDING_AMPHITHEATER = building_type.BUILDING_AMPHITHEATER;
import BUILDING_THEATER = building_type.BUILDING_THEATER;
import BUILDING_HIPPODROME = building_type.BUILDING_HIPPODROME;
import BUILDING_COLOSSEUM = building_type.BUILDING_COLOSSEUM;
import BUILDING_GARDENS = building_type.BUILDING_GARDENS;
import BUILDING_FORT = building_type.BUILDING_FORT;
import BUILDING_GATEHOUSE = building_type.BUILDING_GATEHOUSE;
import BUILDING_GRANARY = building_type.BUILDING_GRANARY;
import BUILDING_WAREHOUSE = building_type.BUILDING_WAREHOUSE;
import BUILDING_DOCK = building_type.BUILDING_DOCK;
import BUILDING_SENATE = building_type.BUILDING_SENATE;
import BUILDING_BURNING_RUIN = building_type.BUILDING_BURNING_RUIN;
import BUILDING_WINE_WORKSHOP = building_type.BUILDING_WINE_WORKSHOP;
import BUILDING_OIL_WORKSHOP = building_type.BUILDING_OIL_WORKSHOP;
import BUILDING_WEAPONS_WORKSHOP = building_type.BUILDING_WEAPONS_WORKSHOP;
import BUILDING_FURNITURE_WORKSHOP = building_type.BUILDING_FURNITURE_WORKSHOP;
import BUILDING_POTTERY_WORKSHOP = building_type.BUILDING_POTTERY_WORKSHOP;
import { building_type } from 'building/type';
import { buffer } from 'core/buffer';
import { building } from 'building/building';
import { building_get } from 'building/building';
import { building_main } from 'building/building';
import { building_animation_offset } from 'building/animation';
import { building_construction_record_view_position } from 'building/construction';
import { building_dock_count_idle_dockers } from 'building/dock';
import { city_buildings_get_trade_center } from 'city/buildings';
import { city_entertainment_hippodrome_has_race } from 'city/entertainment';
import { labor_category_data } from 'city/labor';
import { city_labor_unemployment_percentage_for_senate } from 'city/labor';
import { city_population } from 'city/population';
import { selected_rating } from 'city/ratings';
import { city_rating_culture } from 'city/ratings';
import { city_rating_prosperity } from 'city/ratings';
import { city_rating_peace } from 'city/ratings';
import { city_rating_favor } from 'city/ratings';
import { view_tile } from 'city/view';
import { map_callback } from 'city/view';
import { city_view_orientation } from 'city/view';
import { city_view_get_viewport } from 'city/view';
import { city_view_foreach_map_tile } from 'city/view';
import { city_view_foreach_valid_map_tile } from 'city/view';
import { city_view_foreach_valid_map_tile_row } from 'city/view';
import { config_key } from 'core/config';
import CONFIG_UI_HIGHLIGHT_LEGIONS = config_key.CONFIG_UI_HIGHLIGHT_LEGIONS;
import { config_key } from 'core/config';
import { config_string_key } from 'core/config';
import { config_get } from 'core/config';
import { figure_type } from 'figure/type';
import FIGURE_FORT_JAVELIN = figure_type.FIGURE_FORT_JAVELIN;
import FIGURE_FORT_MOUNTED = figure_type.FIGURE_FORT_MOUNTED;
import FIGURE_FORT_LEGIONARY = figure_type.FIGURE_FORT_LEGIONARY;
import { figure_type } from 'figure/type';
import { formation_state } from 'figure/formation';
import { formation } from 'figure/formation';
import { formation_get } from 'figure/formation';
import { formation_get_selected } from 'figure/formation';
import { formation_legion_at_grid_offset } from 'figure/formation_legion';
import { resource_type } from 'game/resource';
import RESOURCE_NONE = resource_type.RESOURCE_NONE;
import { resource_type } from 'game/resource';
import { workshop_type } from 'game/resource';
import { resource_image_type } from 'game/resource';
import { language_type } from 'core/locale';
import { encoding_type } from 'core/encoding';
import { group_terrain } from 'core/image_group';
import GROUP_TERRAIN_BLACK = group_terrain.GROUP_TERRAIN_BLACK;
import GROUP_TERRAIN_WATER = group_terrain.GROUP_TERRAIN_WATER;
import GROUP_TERRAIN_OVERLAY = group_terrain.GROUP_TERRAIN_OVERLAY;
import GROUP_TERRAIN_FLAT_TILE = group_terrain.GROUP_TERRAIN_FLAT_TILE;
import GROUP_BUILDING_WORKSHOP_RAW_MATERIAL = group_terrain.GROUP_BUILDING_WORKSHOP_RAW_MATERIAL;
import GROUP_BUILDING_SENATE = group_terrain.GROUP_BUILDING_SENATE;
import GROUP_BUILDING_FORT = group_terrain.GROUP_BUILDING_FORT;
import GROUP_BUILDING_DOCK_1 = group_terrain.GROUP_BUILDING_DOCK_1;
import GROUP_BUILDING_WAREHOUSE = group_terrain.GROUP_BUILDING_WAREHOUSE;
import GROUP_BUILDING_GRANARY = group_terrain.GROUP_BUILDING_GRANARY;
import GROUP_FIGURE_HOMELESS = group_terrain.GROUP_FIGURE_HOMELESS;
import GROUP_BUILDING_DOCK_2 = group_terrain.GROUP_BUILDING_DOCK_2;
import GROUP_BUILDING_DOCK_3 = group_terrain.GROUP_BUILDING_DOCK_3;
import GROUP_BUILDING_DOCK_DOCKERS = group_terrain.GROUP_BUILDING_DOCK_DOCKERS;
import GROUP_BUILDING_THEATER_SHOW = group_terrain.GROUP_BUILDING_THEATER_SHOW;
import GROUP_BUILDING_AMPHITHEATER_SHOW = group_terrain.GROUP_BUILDING_AMPHITHEATER_SHOW;
import GROUP_BUILDING_COLOSSEUM_SHOW = group_terrain.GROUP_BUILDING_COLOSSEUM_SHOW;
import GROUP_BUILDING_HIPPODROME_1 = group_terrain.GROUP_BUILDING_HIPPODROME_1;
import GROUP_BUILDING_HIPPODROME_2 = group_terrain.GROUP_BUILDING_HIPPODROME_2;
import GROUP_PLAGUE_SKULL = group_terrain.GROUP_PLAGUE_SKULL;
import GROUP_BUILDING_TRADE_CENTER_FLAG = group_terrain.GROUP_BUILDING_TRADE_CENTER_FLAG;
import GROUP_BUILDING_GATEHOUSE = group_terrain.GROUP_BUILDING_GATEHOUSE;
import { color_t } from 'graphics/color';
import { image } from 'core/image';
import { image_group } from 'core/image';
import { image_get } from 'core/image';
import { font_t } from 'graphics/font';
import { font_definition } from 'graphics/font';
import { image_draw_masked } from 'graphics/image';
import { image_draw_blend } from 'graphics/image';
import { image_draw_isometric_footprint_from_draw_tile } from 'graphics/image';
import { image_draw_isometric_top_from_draw_tile } from 'graphics/image';
import { window_id } from 'graphics/window';
import { window_type } from 'graphics/window';
import { map_building_at } from 'map/building';
import { direction_type } from 'core/direction';
import DIR_0_TOP = direction_type.DIR_0_TOP;
import DIR_2_RIGHT = direction_type.DIR_2_RIGHT;
import DIR_4_BOTTOM = direction_type.DIR_4_BOTTOM;
import DIR_6_LEFT = direction_type.DIR_6_LEFT;
import { direction_type } from 'core/direction';
import { figure } from 'figure/figure';
import { figure_get } from 'figure/figure';
import { map_figure_at } from 'map/figure';
import { GRID } from 'map/grid';
import GRID_SIZE = GRID.GRID_SIZE;
import { map_image_at } from 'map/image';
import { map_image_set } from 'map/image';
import { edge_x } from 'map/property';
import EDGE_X0Y0 = edge_x.EDGE_X0Y0;
import EDGE_X1Y0 = edge_x.EDGE_X1Y0;
import EDGE_X0Y1 = edge_x.EDGE_X0Y1;
import EDGE_X1Y1 = edge_x.EDGE_X1Y1;
import { map_property_is_draw_tile } from 'map/property';
import { map_property_multi_tile_xy } from 'map/property';
import { map_property_multi_tile_size } from 'map/property';
import { map_property_is_constructing } from 'map/property';
import { map_property_is_deleted } from 'map/property';
import { map_sprite_bridge_at } from 'map/sprite';
import { terrain } from 'map/terrain';
import TERRAIN_GARDEN = terrain.TERRAIN_GARDEN;
import TERRAIN_WALL = terrain.TERRAIN_WALL;
import TERRAIN_GATEHOUSE = terrain.TERRAIN_GATEHOUSE;
import { map_terrain_is } from 'map/terrain';
import { sound_direction } from 'sound/city';
import SOUND_DIRECTION_LEFT = sound_direction.SOUND_DIRECTION_LEFT;
import SOUND_DIRECTION_CENTER = sound_direction.SOUND_DIRECTION_CENTER;
import SOUND_DIRECTION_RIGHT = sound_direction.SOUND_DIRECTION_RIGHT;
import { sound_city_mark_building_view } from 'sound/city';
import { city_draw_bridge } from 'widget/city_bridge';
import { city_building_ghost_mark_deleting } from 'widget/city_building_ghost';
import { city_building_ghost_draw } from 'widget/city_building_ghost';
import { city_draw_figure } from 'widget/city_figure';
import { city_draw_selected_figure } from 'widget/city_figure';
let ADJACENT_OFFSETS: number[] = new Array(2).fill({
    {
        { OFFSET(- 1, 0), OFFSET(-1, -1), OFFSET(-1, -2), OFFSET(0, -2), OFFSET(1, -2)},
{ OFFSET(0, -1), OFFSET(1, -1), OFFSET(2, -1), OFFSET(2, 0), OFFSET(2, 1) },
{ OFFSET(1, 0), OFFSET(1, 1), OFFSET(1, 2), OFFSET(0, 2), OFFSET(-1, 2) },
{ OFFSET(0, 1), OFFSET(-1, 1), OFFSET(-2, 1), OFFSET(-2, 0), OFFSET(-2, -1) }
    },
{
    { OFFSET(-1, 0), OFFSET(-1, -1), OFFSET(-1, -2), OFFSET(-1, -3), OFFSET(0, -3), OFFSET(1, -3), OFFSET(2, -3) },
    { OFFSET(0, -1), OFFSET(1, -1), OFFSET(2, -1), OFFSET(3, -1), OFFSET(3, 0), OFFSET(3, 1), OFFSET(3, 2) },
    { OFFSET(1, 0), OFFSET(1, 1), OFFSET(1, 2), OFFSET(1, 3), OFFSET(0, 3), OFFSET(-1, 3), OFFSET(-2, 3) },
    { OFFSET(0, 1), OFFSET(-1, 1), OFFSET(-2, 1), OFFSET(-3, 1), OFFSET(-3, 0), OFFSET(-3, -1), OFFSET(-3, -2) }
}
});
export class unnamed47_8 {
    public last_water_animation_time: time_millis = null;
    public advance_water_animation: number = 0;
    public image_id_water_first: number = 0;
    public image_id_water_last: number = 0;
    public selected_figure_id: number = 0;
    public highlighted_formation: number = 0;
    public selected_figure_coord: pixel_coordinate = null;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.last_water_animation_time = args[0]);
        args.length >= 2 && (this.advance_water_animation = args[1]);
        args.length >= 3 && (this.image_id_water_first = args[2]);
        args.length >= 4 && (this.image_id_water_last = args[3]);
        args.length >= 5 && (this.selected_figure_id = args[4]);
        args.length >= 6 && (this.highlighted_formation = args[5]);
        args.length >= 7 && (this.selected_figure_coord = args[6]);
    }
}
let draw_context: unnamed47_8 = new unnamed47_8();
function init_draw_context(selected_figure_id: number, figure_coord: pixel_coordinate, highlighted_formation: number) {
    draw_context.advance_water_animation = 0;
    if (!selected_figure_id) {
        let now: time_millis = time_get_millis();
        if (now - draw_context.last_water_animation_time > 60) {
            draw_context.last_water_animation_time = now;
            draw_context.advance_water_animation = 1;
        }
    }
    draw_context.image_id_water_first = image_group(GROUP_TERRAIN_WATER);
    draw_context.image_id_water_last = 5 + draw_context.image_id_water_first;
    draw_context.selected_figure_id = selected_figure_id;
    draw_context.selected_figure_coord = figure_coord;
    draw_context.highlighted_formation = highlighted_formation;
}
function draw_building_as_deleted(b: building) {
    b = building_main(b);
    return (b.id && (b.is_deleted || map_property_is_deleted(b.grid_offset)));
}
function is_multi_tile_terrain(grid_offset: number) {
    return (!map_building_at(grid_offset) && map_property_multi_tile_size(grid_offset) > 1);
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
function draw_footprint(x: number, y: number, grid_offset: number) {
    building_construction_record_view_position(x, y, grid_offset);
    if (grid_offset < 0) {
        image_draw_isometric_footprint_from_draw_tile(image_group(GROUP_TERRAIN_BLACK), x, y, 0);
    } else if (map_property_is_draw_tile(grid_offset)) {
        let building_id: number = map_building_at(grid_offset);
        let color_mask: color_t = 0;
        if (building_id) {
            let b: building = building_get(building_id);
            if (draw_building_as_deleted(b)) {
                color_mask = COLOR_MASK_RED;
            }
            let view_x: number
            let view_y: number
            let view_width: number
            let view_height: number;
            city_view_get_viewport(view_x, view_y, view_width, view_height);
            if (x < view_x + 100) {
                sound_city_mark_building_view(b, SOUND_DIRECTION_LEFT);
            } else if (x > view_x + view_width - 100) {
                sound_city_mark_building_view(b, SOUND_DIRECTION_RIGHT);
            } else {
                sound_city_mark_building_view(b, SOUND_DIRECTION_CENTER);
            }
        }
        if (map_terrain_is(grid_offset, TERRAIN_GARDEN)) {
            let b: building = building_get(0);
            b.type = BUILDING_GARDENS;
            sound_city_mark_building_view(b, SOUND_DIRECTION_CENTER);
        }
        let image_id: number = map_image_at(grid_offset);
        if (map_property_is_constructing(grid_offset)) {
            image_id = image_group(GROUP_TERRAIN_OVERLAY);
        }
        if (draw_context.advance_water_animation &&
            image_id >= draw_context.image_id_water_first &&
            image_id <= draw_context.image_id_water_last) {
            image_id++;
            if (image_id > draw_context.image_id_water_last) {
                image_id = draw_context.image_id_water_first;
            }
            map_image_set(grid_offset, image_id);
        }
        image_draw_isometric_footprint_from_draw_tile(image_id, x, y, color_mask);
    }
}
function draw_hippodrome_spectators(b: building, x: number, y: number, color_mask: color_t) {
    let subtype: number = b.subtype.orientation;
    let orientation: number = city_view_orientation();
    let population: number = city_population();
    if ((subtype == 0 || subtype == 3) && population > 2000) {
        switch (orientation) {
            case DIR_0_TOP:
                image_draw_masked(image_group(GROUP_BUILDING_HIPPODROME_2) + 6, x + 147, y - 72, color_mask);
                break
            case DIR_2_RIGHT:
                image_draw_masked(image_group(GROUP_BUILDING_HIPPODROME_1) + 8, x + 58, y - 79, color_mask);
                break
            case DIR_4_BOTTOM:
                image_draw_masked(image_group(GROUP_BUILDING_HIPPODROME_2) + 8, x + 119, y - 80, color_mask);
                break
            case DIR_6_LEFT:
                image_draw_masked(image_group(GROUP_BUILDING_HIPPODROME_1) + 6, x, y - 72, color_mask);
        }
    } else if ((subtype == 1 || subtype == 4) && population > 100) {
        switch (orientation) {
            case DIR_0_TOP:
            case DIR_4_BOTTOM:
                image_draw_masked(image_group(GROUP_BUILDING_HIPPODROME_2) + 7, x + 122, y - 79, color_mask);
                break
            case DIR_2_RIGHT:
            case DIR_6_LEFT:
                image_draw_masked(image_group(GROUP_BUILDING_HIPPODROME_1) + 7, x, y - 80, color_mask);
        }
    } else if ((subtype == 2 || subtype == 5) && population > 1000) {
        switch (orientation) {
            case DIR_0_TOP:
                image_draw_masked(image_group(GROUP_BUILDING_HIPPODROME_2) + 8, x + 119, y - 80, color_mask);
                break
            case DIR_2_RIGHT:
                image_draw_masked(image_group(GROUP_BUILDING_HIPPODROME_1) + 6, x, y - 72, color_mask);
                break
            case DIR_4_BOTTOM:
                image_draw_masked(image_group(GROUP_BUILDING_HIPPODROME_2) + 6, x + 147, y - 72, color_mask);
                break
            case DIR_6_LEFT:
                image_draw_masked(image_group(GROUP_BUILDING_HIPPODROME_1) + 8, x + 58, y - 79, color_mask);
                break
        }
    }
}
function draw_entertainment_spectators(b: building, x: number, y: number, color_mask: color_t) {
    if (b.type == BUILDING_AMPHITHEATER && b.num_workers > 0) {
        image_draw_masked(image_group(GROUP_BUILDING_AMPHITHEATER_SHOW), x + 36, y - 47, color_mask);
    }
    if (b.type == BUILDING_THEATER && b.num_workers > 0) {
        image_draw_masked(image_group(GROUP_BUILDING_THEATER_SHOW), x + 34, y - 22, color_mask);
    }
    if (b.type == BUILDING_COLOSSEUM && b.num_workers > 0) {
        image_draw_masked(image_group(GROUP_BUILDING_COLOSSEUM_SHOW), x + 70, y - 90, color_mask);
    }
    if (b.type == BUILDING_HIPPODROME && building_main(b).num_workers > 0
        && city_entertainment_hippodrome_has_race()) {
        draw_hippodrome_spectators(b, x, y, color_mask);
    }
}
function draw_workshop_raw_material_storage(b: building, x: number, y: number, color_mask: color_t) {
    if (b.type == BUILDING_WINE_WORKSHOP) {
        if (b.loads_stored >= 2 || b.data.industry.has_raw_materials) {
            image_draw_masked(image_group(GROUP_BUILDING_WORKSHOP_RAW_MATERIAL), x + 45, y + 23, color_mask);
        }
    }
    if (b.type == BUILDING_OIL_WORKSHOP) {
        if (b.loads_stored >= 2 || b.data.industry.has_raw_materials) {
            image_draw_masked(image_group(GROUP_BUILDING_WORKSHOP_RAW_MATERIAL) + 1, x + 35, y + 15, color_mask);
        }
    }
    if (b.type == BUILDING_WEAPONS_WORKSHOP) {
        if (b.loads_stored >= 2 || b.data.industry.has_raw_materials) {
            image_draw_masked(image_group(GROUP_BUILDING_WORKSHOP_RAW_MATERIAL) + 3, x + 46, y + 24, color_mask);
        }
    }
    if (b.type == BUILDING_FURNITURE_WORKSHOP) {
        if (b.loads_stored >= 2 || b.data.industry.has_raw_materials) {
            image_draw_masked(image_group(GROUP_BUILDING_WORKSHOP_RAW_MATERIAL) + 2, x + 48, y + 19, color_mask);
        }
    }
    if (b.type == BUILDING_POTTERY_WORKSHOP) {
        if (b.loads_stored >= 2 || b.data.industry.has_raw_materials) {
            image_draw_masked(image_group(GROUP_BUILDING_WORKSHOP_RAW_MATERIAL) + 4, x + 47, y + 24, color_mask);
        }
    }
}
function draw_senate_rating_flags(b: building, x: number, y: number, color_mask: color_t) {
    if (b.type == BUILDING_SENATE) {
        let image_id: number = image_group(GROUP_BUILDING_SENATE);
        image_draw_masked(image_id + 1, x + 138, y + 44 - city_rating_culture() / 2, color_mask);
        image_draw_masked(image_id + 2, x + 168, y + 36 - city_rating_prosperity() / 2, color_mask);
        image_draw_masked(image_id + 3, x + 198, y + 27 - city_rating_peace() / 2, color_mask);
        image_draw_masked(image_id + 4, x + 228, y + 19 - city_rating_favor() / 2, color_mask);
        image_id = image_group(GROUP_FIGURE_HOMELESS);
        let unemployment_pct: number = city_labor_unemployment_percentage_for_senate();
        if (unemployment_pct > 0) {
            image_draw_masked(image_id + 108, x + 80, y, color_mask);
        }
        if (unemployment_pct > 5) {
            image_draw_masked(image_id + 104, x + 230, y - 30, color_mask);
        }
        if (unemployment_pct > 10) {
            image_draw_masked(image_id + 107, x + 100, y + 20, color_mask);
        }
        if (unemployment_pct > 15) {
            image_draw_masked(image_id + 106, x + 235, y - 10, color_mask);
        }
        if (unemployment_pct > 20) {
            image_draw_masked(image_id + 106, x + 66, y + 20, color_mask);
        }
    }
}
function draw_top(x: number, y: number, grid_offset: number) {
    if (!map_property_is_draw_tile(grid_offset)) {
        return;
    }
    let b: building = building_get(map_building_at(grid_offset));
    let image_id: number = map_image_at(grid_offset);
    let color_mask: color_t = 0;
    if (draw_building_as_deleted(b) || (map_property_is_deleted(grid_offset) && !is_multi_tile_terrain(grid_offset))) {
        color_mask = COLOR_MASK_RED;
    }
    image_draw_isometric_top_from_draw_tile(image_id, x, y, color_mask);
    draw_senate_rating_flags(b, x, y, color_mask);
    draw_entertainment_spectators(b, x, y, color_mask);
    draw_workshop_raw_material_storage(b, x, y, color_mask);
}
function draw_figures(x: number, y: number, grid_offset: number) {
    let figure_id: number = map_figure_at(grid_offset);
    while (figure_id) {
        figure * f = figure_get(figure_id);
        if (figure_id == draw_context.selected_figure_id) {
            if (!f.is_ghost || f.height_adjusted_ticks) {
                city_draw_selected_figure(f, x, y, draw_context.selected_figure_coord);
            }
        } else if (!f.is_ghost) {
                int highlight = f.formation_id > 0 && f.formation_id == draw_context.highlighted_formation;
            city_draw_figure(f, x, y, highlight);
        }
        figure_id = f.next_figure_id_on_same_tile;
    }
}
function draw_dock_workers(b: building, x: number, y: number, color_mask: color_t) {
    let num_dockers: number = building_dock_count_idle_dockers(b);
    if (num_dockers > 0) {
        let image_dock: number = map_image_at(b.grid_offset);
        let image_dockers: number = image_group(GROUP_BUILDING_DOCK_DOCKERS);
        if (image_dock == image_group(GROUP_BUILDING_DOCK_1)) {
            image_dockers += 0
        } else if (image_dock == image_group(GROUP_BUILDING_DOCK_2)) {
            image_dockers += 3
        } else if (image_dock == image_group(GROUP_BUILDING_DOCK_3)) {
            image_dockers += 6
        } else {
            image_dockers += 9
        }
        if (num_dockers == 2) {
            image_dockers += 1
        } else if (num_dockers == 3) {
            image_dockers += 2
        }
        let img: image = image_get(image_dockers);
        image_draw_masked(image_dockers, x + img.sprite_offset_x, y + img.sprite_offset_y, color_mask);
    }
}
function draw_warehouse_ornaments(b: building, x: number, y: number, color_mask: color_t) {
    image_draw_masked(image_group(GROUP_BUILDING_WAREHOUSE) + 17, x - 4, y - 42, color_mask);
    if (b.id == city_buildings_get_trade_center()) {
        image_draw_masked(image_group(GROUP_BUILDING_TRADE_CENTER_FLAG), x + 19, y - 56, color_mask);
    }
}
function draw_granary_stores(img: image, b: building, x: number, y: number, color_mask: color_t) {
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
}
function draw_animation(x: number, y: number, grid_offset: number) {
    let image_id: number = map_image_at(grid_offset);
    let img: image = image_get(image_id);
    if (img.num_animation_sprites) {
        if (map_property_is_draw_tile(grid_offset)) {
            let building_id: number = map_building_at(grid_offset);
            let b: building = building_get(building_id);
            let color_mask: number = 0;
            if (draw_building_as_deleted(b) || map_property_is_deleted(grid_offset)) {
                color_mask = COLOR_MASK_RED;
            }
            if (b.type == BUILDING_DOCK) {
                draw_dock_workers(b, x, y, color_mask);
            } else if (b.type == BUILDING_WAREHOUSE) {
                draw_warehouse_ornaments(b, x, y, color_mask);
            } else if (b.type == BUILDING_GRANARY) {
                draw_granary_stores(img, b, x, y, color_mask);
            } else if (b.type == BUILDING_BURNING_RUIN && b.ruin_has_plague) {
                image_draw_masked(image_group(GROUP_PLAGUE_SKULL), x + 18, y - 32, color_mask);
            }
            let animation_offset: number = building_animation_offset(b, image_id, grid_offset);
            if (b.type != BUILDING_HIPPODROME && animation_offset > 0) {
                if (animation_offset > img.num_animation_sprites) {
                    animation_offset = img.num_animation_sprites;
                }
                if (b.type == BUILDING_GRANARY) {
                    image_draw_masked(image_id + animation_offset + 5, x + 77, y - 49, color_mask);
                } else {
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
    } else if (map_sprite_bridge_at(grid_offset)) {
        city_draw_bridge(x, y, grid_offset);
    } else if (building_get(map_building_at(grid_offset)).type == BUILDING_FORT) {
        if (map_property_is_draw_tile(grid_offset)) {
            let fort: building = building_get(map_building_at(grid_offset));
            let offset: number = 0;
            switch (fort.subtype.fort_figure_type) {
                case FIGURE_FORT_LEGIONARY:
                    offset = 4;
                    break
                case FIGURE_FORT_MOUNTED:
                    offset = 3;
                    break
                case FIGURE_FORT_JAVELIN:
                    offset = 2;
                    break
            }
            if (offset) {
                image_draw_masked(image_group(GROUP_BUILDING_FORT) + offset, x + 81, y + 5,
                    draw_building_as_deleted(fort) ? COLOR_MASK_RED : 0);
            }
        }
    } else if (building_get(map_building_at(grid_offset)).type == BUILDING_GATEHOUSE) {
        let xy: number = map_property_multi_tile_xy(grid_offset);
        let orientation: number = city_view_orientation();
        if ((orientation == DIR_0_TOP && xy == EDGE_X1Y1) ||
            (orientation == DIR_2_RIGHT && xy == EDGE_X0Y1) ||
            (orientation == DIR_4_BOTTOM && xy == EDGE_X0Y0) ||
            (orientation == DIR_6_LEFT && xy == EDGE_X1Y0)) {
            let gate: building = building_get(map_building_at(grid_offset));
            let image_id: number = image_group(GROUP_BUILDING_GATEHOUSE);
            let color_mask: number = draw_building_as_deleted(gate) ? COLOR_MASK_RED : 0;
            if (gate.subtype.orientation == 1) {
                if (orientation == DIR_0_TOP || orientation == DIR_4_BOTTOM) {
                    image_draw_masked(image_id, x - 22, y - 80, color_mask);
                } else {
                    image_draw_masked(image_id + 1, x - 18, y - 81, color_mask);
                }
            } else if (gate.subtype.orientation == 2) {
                if (orientation == DIR_0_TOP || orientation == DIR_4_BOTTOM) {
                    image_draw_masked(image_id + 1, x - 18, y - 81, color_mask);
                } else {
                    image_draw_masked(image_id, x - 22, y - 80, color_mask);
                }
            }
        }
    }
}
function draw_elevated_figures(x: number, y: number, grid_offset: number) {
    let figure_id: number = map_figure_at(grid_offset);
    while (figure_id > 0) {
        figure * f = figure_get(figure_id);
        if ((f.use_cross_country && !f.is_ghost) || f.height_adjusted_ticks) {
            city_draw_figure(f, x, y, 0);
        }
        figure_id = f.next_figure_id_on_same_tile;
    }
}
function draw_hippodrome_ornaments(x: number, y: number, grid_offset: number) {
    let image_id: number = map_image_at(grid_offset);
    let img: image = image_get(image_id);
    let b: building = building_get(map_building_at(grid_offset));
    if (img.num_animation_sprites
        && map_property_is_draw_tile(grid_offset)
        && b.type == BUILDING_HIPPODROME) {
        image_draw_masked(image_id + 1,
            x + img.sprite_offset_x, y + img.sprite_offset_y - img.height + 90,
            draw_building_as_deleted(b) ? COLOR_MASK_RED : 0
        );
    }
}
function should_draw_top_before_deletion(grid_offset: number) {
    return is_multi_tile_terrain(grid_offset) && has_adjacent_deletion(grid_offset);
}
function deletion_draw_terrain_top(x: number, y: number, grid_offset: number) {
    if (map_property_is_draw_tile(grid_offset) && should_draw_top_before_deletion(grid_offset)) {
        draw_top(x, y, grid_offset);
    }
}
function deletion_draw_figures_animations(x: number, y: number, grid_offset: number) {
    if (map_property_is_deleted(grid_offset) || draw_building_as_deleted(building_get(map_building_at(grid_offset)))) {
        image_draw_blend(image_group(GROUP_TERRAIN_FLAT_TILE), x, y, COLOR_MASK_RED);
    }
    if (map_property_is_draw_tile(grid_offset) && !should_draw_top_before_deletion(grid_offset)) {
        draw_top(x, y, grid_offset);
    }
    draw_figures(x, y, grid_offset);
    draw_animation(x, y, grid_offset);
}
function deletion_draw_remaining(x: number, y: number, grid_offset: number) {
    draw_elevated_figures(x, y, grid_offset);
    draw_hippodrome_ornaments(x, y, grid_offset);
}
export function city_without_overlay_draw(selected_figure_id: number, figure_coord: pixel_coordinate, tile: map_tile) {
    let highlighted_formation: number = 0;
    if (config_get(CONFIG_UI_HIGHLIGHT_LEGIONS)) {
        highlighted_formation = formation_legion_at_grid_offset(tile.grid_offset);
        if (highlighted_formation > 0) {
            let selected_formation: number = formation_get_selected();
            if (selected_formation && highlighted_formation != selected_formation) {
                highlighted_formation = 0;
            }
            if (formation_get(highlighted_formation).in_distant_battle) {
                highlighted_formation = 0;
            }
        }
    }
    init_draw_context(selected_figure_id, figure_coord, highlighted_formation);
    let should_mark_deleting: number = city_building_ghost_mark_deleting(tile);
    city_view_foreach_map_tile(draw_footprint);
    if (!should_mark_deleting) {
        city_view_foreach_valid_map_tile_row(
            draw_top,
            draw_figures,
            draw_animation
        );
        if (!selected_figure_id) {
            city_building_ghost_draw(tile);
        }
        city_view_foreach_valid_map_tile_row(
            draw_elevated_figures,
            draw_hippodrome_ornaments,
            0
        );
    } else {
        city_view_foreach_valid_map_tile(deletion_draw_terrain_top);
        city_view_foreach_valid_map_tile(deletion_draw_figures_animations);
        city_view_foreach_valid_map_tile(deletion_draw_remaining);
    }
}
