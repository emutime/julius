import { COLOR_MINIMAP_ENEMY_CENTRAL } from 'graphics/color';
import { COLOR_MINIMAP_ENEMY_NORTHERN } from 'graphics/color';
import { COLOR_MINIMAP_ENEMY_DESERT } from 'graphics/color';
import { VIEW_X_MAX } from 'city/view';
import { VIEW_Y_MAX } from 'city/view';
import { COLOR_MINIMAP_WOLF } from 'graphics/color';
import { COLOR_MINIMAP_SOLDIER } from 'graphics/color';
import { COLOR_MINIMAP_SELECTED_SOLDIER } from 'graphics/color';
import { COLOR_MINIMAP_VIEWPORT } from 'graphics/color';
import { COLOR_MINIMAP_DARK } from 'graphics/color';
import { COLOR_MINIMAP_LIGHT } from 'graphics/color';
import { time_millis } from 'core/time';
import { touch_coords } from 'input/touch';
import { touch_mode } from 'input/touch';
import { touch } from 'input/touch';
import { mouse_button } from 'input/mouse';
import { scroll_state } from 'input/mouse';
import { mouse } from 'input/mouse';
import { building_type } from 'building/type';
import BUILDING_FORT_GROUND = building_type.BUILDING_FORT_GROUND;
import BUILDING_RESERVOIR = building_type.BUILDING_RESERVOIR;
import { building_type } from 'building/type';;
import { buffer } from 'core/buffer';
import { building } from 'building/building';
import { building_get } from 'building/building';
import { view_tile } from 'city/view';
import { map_callback } from 'city/view';
import { city_view_get_camera } from 'city/view';
import { city_view_get_pixel_offset } from 'city/view';
import { city_view_go_to_grid_offset } from 'city/view';
import { city_view_get_viewport_size_tiles } from 'city/view';
import { city_view_foreach_minimap_tile } from 'city/view';
import { direction_type } from 'core/direction';
import { figure_action } from 'figure/action';
import FIGURE_ACTION_159_NATIVE_ATTACKING = figure_action.FIGURE_ACTION_159_NATIVE_ATTACKING;
import { figure_type } from 'figure/type';
import FIGURE_INDIGENOUS_NATIVE = figure_type.FIGURE_INDIGENOUS_NATIVE;
import FIGURE_WOLF = figure_type.FIGURE_WOLF;
import { figure_type } from 'figure/type';
import { figure } from 'figure/figure';
import { figure_is_enemy } from 'figure/figure';
import { figure_is_legion } from 'figure/figure';
import { formation_state } from 'figure/formation';
import { formation } from 'figure/formation';
import { formation_get_selected } from 'figure/formation';
import { color_t } from 'graphics/color';
import { clip_code } from 'graphics/graphics';
import { clip_info } from 'graphics/graphics';
import { graphics_set_clip_rectangle } from 'graphics/graphics';
import { graphics_reset_clip_rectangle } from 'graphics/graphics';
import { graphics_save_to_buffer } from 'graphics/graphics';
import { graphics_draw_from_buffer } from 'graphics/graphics';
import { graphics_draw_vertical_line } from 'graphics/graphics';
import { graphics_draw_horizontal_line } from 'graphics/graphics';
import { graphics_draw_rect } from 'graphics/graphics';
import { language_type } from 'core/locale';
import { encoding_type } from 'core/encoding';
import { group_terrain } from 'core/image_group';
import GROUP_MINIMAP_EMPTY_LAND = group_terrain.GROUP_MINIMAP_EMPTY_LAND;
import GROUP_MINIMAP_WATER = group_terrain.GROUP_MINIMAP_WATER;
import GROUP_MINIMAP_TREE = group_terrain.GROUP_MINIMAP_TREE;
import GROUP_MINIMAP_ROCK = group_terrain.GROUP_MINIMAP_ROCK;
import GROUP_MINIMAP_MEADOW = group_terrain.GROUP_MINIMAP_MEADOW;
import GROUP_MINIMAP_ROAD = group_terrain.GROUP_MINIMAP_ROAD;
import GROUP_MINIMAP_HOUSE = group_terrain.GROUP_MINIMAP_HOUSE;
import GROUP_MINIMAP_BUILDING = group_terrain.GROUP_MINIMAP_BUILDING;
import GROUP_MINIMAP_WALL = group_terrain.GROUP_MINIMAP_WALL;
import GROUP_MINIMAP_AQUEDUCT = group_terrain.GROUP_MINIMAP_AQUEDUCT;
import GROUP_MINIMAP_BLACK = group_terrain.GROUP_MINIMAP_BLACK;
import { image } from 'core/image';
import { image_group } from 'core/image';
import { font_t } from 'graphics/font';
import { font_definition } from 'graphics/font';
import { image_draw } from 'graphics/image';
import { map_building_at } from 'map/building';
import { map_figure_foreach_until } from 'map/figure';
import { GRID } from 'map/grid';
import GRID_SIZE = GRID.GRID_SIZE;
import { map_grid_width } from 'map/grid';
import { map_grid_height } from 'map/grid';
import { map_property_is_draw_tile } from 'map/property';
import { map_property_multi_tile_size } from 'map/property';
import { map_random_get } from 'map/random';
import { terrain } from 'map/terrain';
import TERRAIN_TREE = terrain.TERRAIN_TREE;
import TERRAIN_ROCK = terrain.TERRAIN_ROCK;
import TERRAIN_WATER = terrain.TERRAIN_WATER;
import TERRAIN_BUILDING = terrain.TERRAIN_BUILDING;
import TERRAIN_SHRUB = terrain.TERRAIN_SHRUB;
import TERRAIN_ROAD = terrain.TERRAIN_ROAD;
import TERRAIN_AQUEDUCT = terrain.TERRAIN_AQUEDUCT;
import TERRAIN_ELEVATION = terrain.TERRAIN_ELEVATION;
import TERRAIN_MEADOW = terrain.TERRAIN_MEADOW;
import TERRAIN_WALL = terrain.TERRAIN_WALL;
import TERRAIN_GATEHOUSE = terrain.TERRAIN_GATEHOUSE;
import { map_terrain_get } from 'map/terrain';
import { scenario_climate } from 'scenario/property';
import { scenario_property_climate } from 'scenario/property';
import { free } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_malloc';
import { free } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_malloc';
import { malloc } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_malloc';
import { malloc } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_malloc';
export const enum figure_color {
    FIGURE_COLOR_NONE = 0,
    FIGURE_COLOR_SOLDIER = 1,
    FIGURE_COLOR_SELECTED_SOLDIER = 2,
    FIGURE_COLOR_ENEMY = 3,
    FIGURE_COLOR_WOLF = 4,
}
export const enum refresh {
    REFRESH_NOT_NEEDED = 0,
    REFRESH_FULL = 1,
    REFRESH_CAMERA_MOVED = 2,
}
let ENEMY_COLOR_BY_CLIMATE: color_t[] = new Array().fill({
    COLOR_MINIMAP_ENEMY_CENTRAL,
    COLOR_MINIMAP_ENEMY_NORTHERN,
    COLOR_MINIMAP_ENEMY_DESERT
});
class mouse {
    public x: number = 0;
    public y: number = 0;
    public grid_offset: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.x = args[0]);
        args.length >= 2 && (this.y = args[1]);
        args.length >= 3 && (this.grid_offset = args[2]);
    }
}
export class unnamed39_8 {
    public absolute_x: number = 0;
    public absolute_y: number = 0;
    public width_tiles: number = 0;
    public height_tiles: number = 0;
    public x_offset: number = 0;
    public y_offset: number = 0;
    public width: number = 0;
    public height: number = 0;
    public enemy_color: color_t = null;
    public cache: color_t = null;
    public mouse: mouse = null;
    public refresh_requested: number = 0;
    public camera_x: number = 0;
    public camera_y: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.absolute_x = args[0]);
        args.length >= 2 && (this.absolute_y = args[1]);
        args.length >= 3 && (this.width_tiles = args[2]);
        args.length >= 4 && (this.height_tiles = args[3]);
        args.length >= 5 && (this.x_offset = args[4]);
        args.length >= 6 && (this.y_offset = args[5]);
        args.length >= 7 && (this.width = args[6]);
        args.length >= 8 && (this.height = args[7]);
        args.length >= 9 && (this.enemy_color = args[8]);
        args.length >= 10 && (this.cache = args[9]);
        args.length >= 11 && (this.mouse = args[10]);
        args.length >= 12 && (this.refresh_requested = args[11]);
        args.length >= 13 && (this.camera_x = args[12]);
        args.length >= 14 && (this.camera_y = args[13]);
    }
}
let data: unnamed39_8 = new unnamed39_8();
export function widget_minimap_invalidate() {
    data.refresh_requested = 1;
}
function foreach_map_tile(callback: map_callback) {
    city_view_foreach_minimap_tile(data.x_offset, data.y_offset,
        data.absolute_x, data.absolute_y,
        data.width_tiles, data.height_tiles,
        callback);
}
function set_bounds(x_offset: number, y_offset: number, width: number, height: number) {
    data.width_tiles = width / 2;
    data.height_tiles = height;
    data.x_offset = x_offset;
    data.y_offset = y_offset;
    data.width = width;
    data.height = height;
    data.absolute_x = (VIEW_X_MAX - data.width_tiles) / 2;
    data.absolute_y = (VIEW_Y_MAX - data.height_tiles) / 2;
    city_view_get_camera(data.camera_x, data.camera_y);
    let view_width_tiles: number
    let view_height_tiles: number;
    city_view_get_viewport_size_tiles(view_width_tiles, view_height_tiles);
    if ((map_grid_width() - data.width_tiles) / 2 > 0) {
        if (data.camera_x < data.absolute_x) {
            data.absolute_x = data.camera_x;
        } else if (data.camera_x > data.width_tiles + data.absolute_x - view_width_tiles) {
            data.absolute_x = view_width_tiles + data.camera_x - data.width_tiles;
        }
    }
    if ((2 * map_grid_height() - data.height_tiles) / 2 > 0) {
        if (data.camera_y < data.absolute_y) {
            data.absolute_y = data.camera_y;
        } else if (data.camera_y > data.height_tiles + data.absolute_y - view_height_tiles) {
            data.absolute_y = view_height_tiles + data.camera_y - data.height_tiles;
        }
    }
    data.absolute_y &= ~1
}
function has_figure_color(f: figure) {
    let type: number = f.type;
    if (figure_is_legion(f)) {
        return formation_get_selected() == f.formation_id ?
            FIGURE_COLOR_SELECTED_SOLDIER : FIGURE_COLOR_SOLDIER;
    }
    if (figure_is_enemy(f)) {
        return FIGURE_COLOR_ENEMY;
    }
    if (f.type == FIGURE_INDIGENOUS_NATIVE &&
        f.action_state == FIGURE_ACTION_159_NATIVE_ATTACKING) {
        return FIGURE_COLOR_ENEMY;
    }
    if (type == FIGURE_WOLF) {
        return FIGURE_COLOR_WOLF;
    }
    return FIGURE_COLOR_NONE;
}
function draw_figure(x_view: number, y_view: number, grid_offset: number) {
    let color_type: number = map_figure_foreach_until(grid_offset, has_figure_color);
    if (color_type == FIGURE_COLOR_NONE) {
        return 0;
    }
    let color: color_t = COLOR_MINIMAP_WOLF;
    if (color_type == FIGURE_COLOR_SOLDIER) {
        color = COLOR_MINIMAP_SOLDIER;
    } else if (color_type == FIGURE_COLOR_SELECTED_SOLDIER) {
        color = COLOR_MINIMAP_SELECTED_SOLDIER;
    } else if (color_type == FIGURE_COLOR_ENEMY) {
        color = data.enemy_color;
    }
    graphics_draw_horizontal_line(x_view, x_view + 1, y_view, color);
    return 1;
}
function draw_minimap_tile(x_view: number, y_view: number, grid_offset: number) {
    if (grid_offset < 0) {
        image_draw(image_group(GROUP_MINIMAP_BLACK), x_view, y_view);
        return;
    }
    if (draw_figure(x_view, y_view, grid_offset)) {
        return;
    }
    let terrain: number = map_terrain_get(grid_offset);
    if (terrain & TERRAIN_BUILDING) {
        if (building_get(map_building_at(grid_offset)).type == BUILDING_FORT_GROUND) {
            terrain = 0;
        }
    }
    if (terrain & TERRAIN_BUILDING) {
        if (map_property_is_draw_tile(grid_offset)) {
            let image_id: number;
            let b: building = building_get(map_building_at(grid_offset));
            if (b.house_size) {
                image_id = image_group(GROUP_MINIMAP_HOUSE);
            } else if (b.type == BUILDING_RESERVOIR) {
                image_id = image_group(GROUP_MINIMAP_AQUEDUCT) - 1;
            } else {
                image_id = image_group(GROUP_MINIMAP_BUILDING);
            }
            switch (map_property_multi_tile_size(grid_offset)) {
                case 1:
                    image_draw(image_id, x_view, y_view);
                    break
                case 2:
                    image_draw(image_id + 1, x_view, y_view - 1);
                    break
                case 3:
                    image_draw(image_id + 2, x_view, y_view - 2);
                    break
                case 4:
                    image_draw(image_id + 3, x_view, y_view - 3);
                    break
                case 5:
                    image_draw(image_id + 4, x_view, y_view - 4);
                    break
            }
        }
    } else {
        let rand: number = map_random_get(grid_offset);
        let image_id: number;
        if (terrain & TERRAIN_ROAD) {
            image_id = image_group(GROUP_MINIMAP_ROAD);
        } else if (terrain & TERRAIN_WATER) {
            image_id = image_group(GROUP_MINIMAP_WATER) + (rand & 3);
        } else if (terrain & (TERRAIN_SHRUB | TERRAIN_TREE)) {
            image_id = image_group(GROUP_MINIMAP_TREE) + (rand & 3);
        } else if (terrain & (TERRAIN_ROCK | TERRAIN_ELEVATION)) {
            image_id = image_group(GROUP_MINIMAP_ROCK) + (rand & 3);
        } else if (terrain & TERRAIN_AQUEDUCT) {
            image_id = image_group(GROUP_MINIMAP_AQUEDUCT);
        } else if (terrain & TERRAIN_WALL) {
            image_id = image_group(GROUP_MINIMAP_WALL);
        } else if (terrain & TERRAIN_MEADOW) {
            image_id = image_group(GROUP_MINIMAP_MEADOW) + (rand & 3);
        } else {
            image_id = image_group(GROUP_MINIMAP_EMPTY_LAND) + (rand & 7);
        }
        image_draw(image_id, x_view, y_view);
    }
}
function draw_viewport_rectangle() {
    let camera_x: number
    let camera_y: number;
    let camera_pixels_x: number
    let camera_pixels_y: number;
    city_view_get_camera(camera_x, camera_y);
    city_view_get_pixel_offset(camera_pixels_x, camera_pixels_y);
    let view_width_tiles: number
    let view_height_tiles: number;
    city_view_get_viewport_size_tiles(view_width_tiles, view_height_tiles);
    let x_offset: number = data.x_offset + 2 * (camera_x - data.absolute_x) - 2 + camera_pixels_x / 30;
    if (x_offset < data.x_offset) {
        x_offset = data.x_offset;
    }
    if (x_offset + 2 * view_width_tiles + 4 > data.x_offset + data.width_tiles) {
        x_offset -= 2
    }
    let y_offset: number = data.y_offset + camera_y - data.absolute_y + 2;
    graphics_draw_rect(x_offset, y_offset,
        view_width_tiles * 2 + 4,
        view_height_tiles - 4,
        COLOR_MINIMAP_VIEWPORT);
}
function prepare_minimap_cache(width: number, height: number) {
    if (width != data.width || height != data.height) {
        free(data.cache);
        data.cache = (color_t *)malloc(sizeof(color_t) * width * height);
    }
}
function cache_minimap() {
    graphics_save_to_buffer(data.x_offset, data.y_offset, data.width, data.height, data.cache);
}
function draw_minimap() {
    graphics_set_clip_rectangle(data.x_offset, data.y_offset, data.width, data.height);
    foreach_map_tile(draw_minimap_tile);
    cache_minimap();
    draw_viewport_rectangle();
    graphics_reset_clip_rectangle();
}
function draw_uncached(x_offset: number, y_offset: number, width: number, height: number) {
    data.enemy_color = ENEMY_COLOR_BY_CLIMATE[scenario_property_climate()];
    prepare_minimap_cache(width, height);
    set_bounds(x_offset, y_offset, width, height);
    draw_minimap();
}
function draw_using_cache(x_offset: number, y_offset: number, width: number, height: number) {
    if (width != data.width || height != data.height || x_offset != data.x_offset) {
        draw_uncached(x_offset, y_offset, width, height);
        return;
    }
    let old_absolute_x: number = data.absolute_x;
    let old_absolute_y: number = data.absolute_y;
    set_bounds(x_offset, y_offset, width, height);
    if (data.absolute_x != old_absolute_x || data.absolute_y != old_absolute_y) {
        draw_minimap();
        return;
    }
    graphics_set_clip_rectangle(x_offset, y_offset, width, height);
    graphics_draw_from_buffer(x_offset, y_offset, data.width, data.height, data.cache);
    draw_viewport_rectangle();
    graphics_reset_clip_rectangle();
}
function should_refresh(force: number) {
    if (data.refresh_requested || force) {
        data.refresh_requested = 0;
        return REFRESH_FULL;
    }
    let new_x: number
    let new_y: number;
    city_view_get_camera(new_x, new_y);
    if (data.camera_x != new_x || data.camera_y != new_y) {
        return REFRESH_CAMERA_MOVED;
    }
    return REFRESH_NOT_NEEDED;
}
export function widget_minimap_draw(x_offset: number, y_offset: number, width: number, height: number, force: number) {
    let refresh_type: number = should_refresh(force);
    if (refresh_type != REFRESH_NOT_NEEDED) {
        if (refresh_type == REFRESH_FULL) {
            draw_uncached(x_offset, y_offset, width, height);
        } else {
            draw_using_cache(x_offset, y_offset, width, height);
        }
        graphics_draw_horizontal_line(x_offset - 1, x_offset - 1 + width, y_offset - 1, COLOR_MINIMAP_DARK);
        graphics_draw_vertical_line(x_offset - 1, y_offset, y_offset + height, COLOR_MINIMAP_DARK);
        graphics_draw_vertical_line(x_offset - 1 + width, y_offset,
            y_offset + height, COLOR_MINIMAP_LIGHT);
    }
}
function update_mouse_grid_offset(x_view: number, y_view: number, grid_offset: number) {
    if (data.mouse.y == y_view && (data.mouse.x == x_view || data.mouse.x == x_view + 1)) {
        data.mouse.grid_offset = grid_offset < 0 ? 0 : grid_offset;
    }
}
function get_mouse_grid_offset(m: mouse) {
    data.mouse.x = m.x;
    data.mouse.y = m.y;
    data.mouse.grid_offset = 0;
    foreach_map_tile(update_mouse_grid_offset);
    return data.mouse.grid_offset;
}
function is_in_minimap(m: mouse) {
    if (m.x >= data.x_offset && m.x < data.x_offset + data.width &&
        m.y >= data.y_offset && m.y < data.y_offset + data.height) {
        return 1;
    }
    return 0;
}
export function widget_minimap_handle_mouse(m: mouse) {
    if ((m.left.went_down || m.right.went_down) && is_in_minimap(m)) {
        let grid_offset: number = get_mouse_grid_offset(m);
        if (grid_offset > 0) {
            city_view_go_to_grid_offset(grid_offset);
            return 1;
        }
    }
    return 0;
}
