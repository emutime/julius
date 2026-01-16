import { building, building_get } from 'building/building';
import { building_type } from 'building/type';
import { city_view_foreach_minimap_tile, city_view_get_camera, city_view_get_pixel_offset, city_view_get_viewport_size_tiles, city_view_go_to_grid_offset, map_callback, VIEW_X_MAX, VIEW_Y_MAX } from 'city/view';
import { image_group } from 'core/image';
import { group_terrain } from 'core/image_group';
import { figure_action } from 'figure/action';
import { figure, figure_is_enemy, figure_is_legion } from 'figure/figure';
import { formation_get_selected } from 'figure/formation';
import { figure_type } from 'figure/type';
import { COLOR_MINIMAP_DARK, COLOR_MINIMAP_ENEMY_CENTRAL, COLOR_MINIMAP_ENEMY_DESERT, COLOR_MINIMAP_ENEMY_NORTHERN, COLOR_MINIMAP_LIGHT, COLOR_MINIMAP_SELECTED_SOLDIER, COLOR_MINIMAP_SOLDIER, COLOR_MINIMAP_VIEWPORT, COLOR_MINIMAP_WOLF, color_t } from 'graphics/color';
import { graphics_draw_from_buffer, graphics_draw_horizontal_line, graphics_draw_rect, graphics_draw_vertical_line, graphics_reset_clip_rectangle, graphics_save_to_buffer, graphics_set_clip_rectangle } from 'graphics/graphics';
import { image_draw } from 'graphics/image';
import { mouse as input_mouse } from 'input/mouse';
import { map_building_at } from 'map/building';
import { map_figure_foreach_until } from 'map/figure';
import { GRID, map_grid_height, map_grid_width } from 'map/grid';
import { map_property_is_draw_tile, map_property_multi_tile_size } from 'map/property';
import { map_random_get } from 'map/random';
import { map_terrain_get, terrain } from 'map/terrain';
import { scenario_property_climate } from 'scenario/property';
import { Ref, free } from '../../ext/crt';
import BUILDING_FORT_GROUND = building_type.BUILDING_FORT_GROUND;
import BUILDING_RESERVOIR = building_type.BUILDING_RESERVOIR;
;
import FIGURE_ACTION_159_NATIVE_ATTACKING = figure_action.FIGURE_ACTION_159_NATIVE_ATTACKING;
import FIGURE_INDIGENOUS_NATIVE = figure_type.FIGURE_INDIGENOUS_NATIVE;
import FIGURE_WOLF = figure_type.FIGURE_WOLF;
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
import GRID_SIZE = GRID.GRID_SIZE;
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
export const enum figure_color {
    FIGURE_COLOR_NONE = 0,
    FIGURE_COLOR_SOLDIER = 1,
    FIGURE_COLOR_SELECTED_SOLDIER = 2,
    FIGURE_COLOR_ENEMY = 3,
    FIGURE_COLOR_WOLF = 4,
}

import FIGURE_COLOR_NONE = figure_color.FIGURE_COLOR_NONE;
import FIGURE_COLOR_SOLDIER = figure_color.FIGURE_COLOR_SOLDIER;
import FIGURE_COLOR_SELECTED_SOLDIER = figure_color.FIGURE_COLOR_SELECTED_SOLDIER;
import FIGURE_COLOR_ENEMY = figure_color.FIGURE_COLOR_ENEMY;
import FIGURE_COLOR_WOLF = figure_color.FIGURE_COLOR_WOLF;

export const enum refresh {
    REFRESH_NOT_NEEDED = 0,
    REFRESH_FULL = 1,
    REFRESH_CAMERA_MOVED = 2,
}

import REFRESH_NOT_NEEDED = refresh.REFRESH_NOT_NEEDED;
import REFRESH_FULL = refresh.REFRESH_FULL;
import REFRESH_CAMERA_MOVED = refresh.REFRESH_CAMERA_MOVED;

let ENEMY_COLOR_BY_CLIMATE: color_t[] = new Array().fill({
    COLOR_MINIMAP_ENEMY_CENTRAL,
    COLOR_MINIMAP_ENEMY_NORTHERN,
    COLOR_MINIMAP_ENEMY_DESERT
});
class minimap_mouse {
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
    public cache: color_t[] = null;
    public mouse: minimap_mouse = null;
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
data.mouse = new minimap_mouse();
data.cache = [];
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
    let camera_x = new Ref<number>(0);
    let camera_y = new Ref<number>(0);
    city_view_get_camera(camera_x, camera_y);
    data.camera_x = camera_x.v;
    data.camera_y = camera_y.v;
    let view_width_tiles = new Ref<number>(0);
    let view_height_tiles = new Ref<number>(0);
    city_view_get_viewport_size_tiles(view_width_tiles, view_height_tiles);
    if ((map_grid_width() - data.width_tiles) / 2 > 0) {
        if (data.camera_x < data.absolute_x) {
            data.absolute_x = data.camera_x;
        } else if (data.camera_x > data.width_tiles + data.absolute_x - view_width_tiles.v) {
            data.absolute_x = view_width_tiles.v + data.camera_x - data.width_tiles;
        }
    }
    if ((2 * map_grid_height() - data.height_tiles) / 2 > 0) {
        if (data.camera_y < data.absolute_y) {
            data.absolute_y = data.camera_y;
        } else if (data.camera_y > data.height_tiles + data.absolute_y - view_height_tiles.v) {
            data.absolute_y = view_height_tiles.v + data.camera_y - data.height_tiles;
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
    let camera_x = new Ref<number>(0);
    let camera_y = new Ref<number>(0);
    let camera_pixels_x = new Ref<number>(0);
    let camera_pixels_y = new Ref<number>(0);
    city_view_get_camera(camera_x, camera_y);
    city_view_get_pixel_offset(camera_pixels_x, camera_pixels_y);
    let view_width_tiles = new Ref<number>(0);
    let view_height_tiles = new Ref<number>(0);
    city_view_get_viewport_size_tiles(view_width_tiles, view_height_tiles);
    let x_offset: number = data.x_offset + 2 * (camera_x.v - data.absolute_x) - 2 + camera_pixels_x.v / 30;
    if (x_offset < data.x_offset) {
        x_offset = data.x_offset;
    }
    if (x_offset + 2 * view_width_tiles.v + 4 > data.x_offset + data.width_tiles) {
        x_offset -= 2
    }
    let y_offset: number = data.y_offset + camera_y.v - data.absolute_y + 2;
    graphics_draw_rect(x_offset, y_offset,
        view_width_tiles.v * 2 + 4,
        view_height_tiles.v - 4,
        COLOR_MINIMAP_VIEWPORT);
}
function prepare_minimap_cache(width: number, height: number) {
    if (width != data.width || height != data.height) {
        free(data.cache);
        data.cache = new Array<color_t>(width * height);
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
    let new_x = new Ref<number>(0);
    let new_y = new Ref<number>(0);
    city_view_get_camera(new_x, new_y);
    if (data.camera_x != new_x.v || data.camera_y != new_y.v) {
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
function get_mouse_grid_offset(m: input_mouse) {
    data.mouse.x = m.x;
    data.mouse.y = m.y;
    data.mouse.grid_offset = 0;
    foreach_map_tile(update_mouse_grid_offset);
    return data.mouse.grid_offset;
}
function is_in_minimap(m: input_mouse) {
    if (m.x >= data.x_offset && m.x < data.x_offset + data.width &&
        m.y >= data.y_offset && m.y < data.y_offset + data.height) {
        return 1;
    }
    return 0;
}
export function widget_minimap_handle_mouse(m: input_mouse) {
    if ((m.left.went_down || m.right.went_down) && is_in_minimap(m)) {
        let grid_offset: number = get_mouse_grid_offset(m);
        if (grid_offset > 0) {
            city_view_go_to_grid_offset(grid_offset);
            return 1;
        }
    }
    return 0;
}
