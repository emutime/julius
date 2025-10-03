
;
import { buffer } from 'core/buffer';
import { direction_type } from 'core/direction';
import { figure_type } from 'figure/type';
import FIGURE_MAP_FLAG = figure_type.FIGURE_MAP_FLAG;
import { figure_type } from 'figure/type';
import { figure } from 'figure/figure';
import { figure_create } from 'figure/figure';
import { map_flag_e } from 'figuretype/editor';
import MAP_FLAG_EARTHQUAKE = map_flag_e.MAP_FLAG_EARTHQUAKE;
import MAP_FLAG_ENTRY = map_flag_e.MAP_FLAG_ENTRY;
import MAP_FLAG_EXIT = map_flag_e.MAP_FLAG_EXIT;
import MAP_FLAG_RIVER_ENTRY = map_flag_e.MAP_FLAG_RIVER_ENTRY;
import MAP_FLAG_RIVER_EXIT = map_flag_e.MAP_FLAG_RIVER_EXIT;
import MAP_FLAG_INVASION_MIN = map_flag_e.MAP_FLAG_INVASION_MIN;
import MAP_FLAG_INVASION_MAX = map_flag_e.MAP_FLAG_INVASION_MAX;
import MAP_FLAG_FISHING_MIN = map_flag_e.MAP_FLAG_FISHING_MIN;
import MAP_FLAG_FISHING_MAX = map_flag_e.MAP_FLAG_FISHING_MAX;
import MAP_FLAG_HERD_MIN = map_flag_e.MAP_FLAG_HERD_MIN;
import MAP_FLAG_HERD_MAX = map_flag_e.MAP_FLAG_HERD_MAX;
import MAP_FLAG_MIN = map_flag_e.MAP_FLAG_MIN;
import MAP_FLAG_MAX = map_flag_e.MAP_FLAG_MAX;
import { language_type } from 'core/locale';
import { encoding_type } from 'core/encoding';
import { group_terrain } from 'core/image_group';
import GROUP_FIGURE_FORT_STANDARD_ICONS = group_terrain.GROUP_FIGURE_FORT_STANDARD_ICONS;
import GROUP_FIGURE_MAP_FLAG_FLAGS = group_terrain.GROUP_FIGURE_MAP_FLAG_FLAGS;
import GROUP_FIGURE_MAP_FLAG_ICONS = group_terrain.GROUP_FIGURE_MAP_FLAG_ICONS;
import { color_t } from 'graphics/color';
import { image } from 'core/image';
import { image_group } from 'core/image';
import { figure_image_increase_offset } from 'figure/image';
import { map_figure_add } from 'map/figure';
import { map_figure_delete } from 'map/figure';
import { GRID } from 'map/grid';
import GRID_SIZE = GRID.GRID_SIZE;
import { map_grid_offset } from 'map/grid';
import { map_point } from 'map/point';
import { scenario_editor_herd_point } from 'scenario/editor_map';
import { scenario_editor_fishing_point } from 'scenario/editor_map';
import { scenario_editor_invasion_point } from 'scenario/editor_map';
import { scenario_editor_earthquake_point } from 'scenario/editor_map';
import { scenario_map_entry } from 'scenario/map';
import { scenario_map_exit } from 'scenario/map';
import { scenario_map_river_entry } from 'scenario/map';
import { scenario_map_river_exit } from 'scenario/map';
export function figure_create_editor_flags() {
    for (let id: number = MAP_FLAG_MIN; id < MAP_FLAG_MAX; id++) {
        figure_create(FIGURE_MAP_FLAG, -1, -1, 0).resource_id = id;
    }
}
export function figure_editor_flag_action(f: figure) {
    figure_image_increase_offset(f, 16);
    f.image_id = image_group(GROUP_FIGURE_MAP_FLAG_FLAGS) + f.image_offset / 2;
    map_figure_delete(f);
    let point: map_point = { 0, 0};
    let id: number = f.resource_id;
    let image_base: number = image_group(GROUP_FIGURE_MAP_FLAG_ICONS);
    if (id == MAP_FLAG_EARTHQUAKE) {
        point = scenario_editor_earthquake_point();
        f.cart_image_id = image_base;
    } else if (id == MAP_FLAG_ENTRY) {
        point = scenario_map_entry();
        f.cart_image_id = image_base + 2;
    } else if (id == MAP_FLAG_EXIT) {
        point = scenario_map_exit();
        f.cart_image_id = image_base + 3;
    } else if (id == MAP_FLAG_RIVER_ENTRY) {
        point = scenario_map_river_entry();
        f.cart_image_id = image_base + 4;
    } else if (id == MAP_FLAG_RIVER_EXIT) {
        point = scenario_map_river_exit();
        f.cart_image_id = image_base + 5;
    } else if (id >= MAP_FLAG_INVASION_MIN && id < MAP_FLAG_INVASION_MAX) {
        point = scenario_editor_invasion_point(id - MAP_FLAG_INVASION_MIN);
        f.cart_image_id = image_base + 1;
    } else if (id >= MAP_FLAG_FISHING_MIN && id < MAP_FLAG_FISHING_MAX) {
        point = scenario_editor_fishing_point(id - MAP_FLAG_FISHING_MIN);
        f.cart_image_id = image_group(GROUP_FIGURE_FORT_STANDARD_ICONS) + 3;
    } else if (id >= MAP_FLAG_HERD_MIN && id < MAP_FLAG_HERD_MAX) {
        point = scenario_editor_herd_point(id - MAP_FLAG_HERD_MIN);
        f.cart_image_id = image_group(GROUP_FIGURE_FORT_STANDARD_ICONS) + 4;
    }
    f.x = point.x;
    f.y = point.y;
    f.grid_offset = map_grid_offset(f.x, f.y);
    f.cross_country_x = 15 * f.x + 7;
    f.cross_country_y = 15 * f.y + 7;
    map_figure_add(f);
}
