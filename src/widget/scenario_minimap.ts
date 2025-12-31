import { VIEW_X_MAX } from 'city/view';
import { VIEW_Y_MAX } from 'city/view';
;
import { buffer } from 'core/buffer';
import { view_tile } from 'city/view';
import { map_callback } from 'city/view';
import { city_view_foreach_minimap_tile } from 'city/view';
import { color_t } from 'graphics/color';
import { clip_code } from 'graphics/graphics';
import { clip_info } from 'graphics/graphics';
import { graphics_set_clip_rectangle } from 'graphics/graphics';
import { graphics_reset_clip_rectangle } from 'graphics/graphics';
import { graphics_draw_vertical_line } from 'graphics/graphics';
import { language_type } from 'core/locale';
import { encoding_type } from 'core/encoding';
import { group_terrain } from 'core/image_group';
import GROUP_MINIMAP_BUILDING = group_terrain.GROUP_MINIMAP_BUILDING;
import { image } from 'core/image';
import { image_group } from 'core/image';
import { font_t } from 'graphics/font';
import { font_definition } from 'graphics/font';
import { image_draw } from 'graphics/image';
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
import TERRAIN_ELEVATION = terrain.TERRAIN_ELEVATION;
import TERRAIN_MEADOW = terrain.TERRAIN_MEADOW;
import TERRAIN_WALL = terrain.TERRAIN_WALL;
import TERRAIN_GATEHOUSE = terrain.TERRAIN_GATEHOUSE;
import { map_terrain_get } from 'map/terrain';
import { scenario_climate } from 'scenario/property';
import { scenario_property_climate } from 'scenario/property';
export class tile_color {
    public left: color_t = null;
    public right: color_t = null;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.left = args[0]);
        args.length >= 2 && (this.right = args[1]);
    }
}
export class tile_color_set {
    public water: tile_color[] = new Array(4).fill(null);
    public tree: tile_color[] = new Array(4).fill(null);
    public rock: tile_color[] = new Array(4).fill(null);
    public meadow: tile_color[] = new Array(4).fill(null);
    public grass: tile_color[] = new Array(8).fill(null);
    public road: tile_color = null;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.water = args[0]);
        args.length >= 2 && (this.tree = args[1]);
        args.length >= 3 && (this.rock = args[2]);
        args.length >= 4 && (this.meadow = args[3]);
        args.length >= 5 && (this.grass = args[4]);
        args.length >= 6 && (this.road = args[5]);
    }
}
export let MINIMAP_COLOR_SETS: tile_color_set[] = new Array(3).fill({
    // central
    {
        .water = {{ 0x394a7b, 0x31427b}, { 0x394a7b, 0x314273}, { 0x313973, 0x314273}, { 0x31427b, 0x394a7b}},
        .tree = {{ 0x6b8431, 0x102108 }, { 0x103908, 0x737b29 }, { 0x103108, 0x526b21 }, { 0x737b31, 0x084a10 }},
        .rock = {{ 0x948484, 0x635a4a }, { 0xa59c94, 0xb5ada5 }, { 0xb5ada5, 0x8c8484 }, { 0x635a4a, 0xa59c94 }},
        .meadow = {{ 0xd6bd63, 0x9c8c39 }, { 0x948c39, 0xd6bd63 }, { 0xd6bd63, 0x9c9439 }, { 0x848431, 0xada54a }},
        .grass = {
            { 0x6b8c31, 0x6b7b29 }, { 0x738431, 0x6b7b29 }, { 0x6b7329, 0x7b8c39 }, { 0x527b29, 0x6b7321 },
{ 0x6b8431, 0x737b31 }, { 0x6b7b31, 0x737b29 }, { 0x636b18, 0x526b21 }, { 0x737b31, 0x737b29 }
        },
        .road = { 0x736b63, 0x4a3121}
    },
// northern
{
        .water = {{ 0x394a7b, 0x31427b }, { 0x394a7b, 0x314273 }, { 0x313973, 0x314273 }, { 0x31427b, 0x394a7b }
},
        .tree = {{ 0x527b31, 0x082108 }, { 0x083908, 0x5a7329 }, { 0x082908, 0x316b21 }, { 0x527b29, 0x084a21 }},
        .rock = {{ 0x8c8484, 0x5a5252 }, { 0x9c9c94, 0xa5a5a5 }, { 0xa5a5a5, 0x848484 }, { 0x5a5252, 0x9c9c94 }},
        .meadow = {{ 0x427318, 0x8c9442 }, { 0xb5ad4a, 0x738c39 }, { 0x8c8c39, 0x6b7b29 }, { 0x527331, 0x5a8442 }},
        .grass = {
            { 0x4a8431, 0x4a7329 }, { 0x527b29, 0x4a7329 }, { 0x526b29, 0x5a8439 }, { 0x397321, 0x4a6b21 },
{ 0x527b31, 0x5a7331 }, { 0x4a7329, 0x5a7329 }, { 0x4a6b18, 0x316b21 }, { 0x527b29, 0x527329 }
        },
        .road = { 0x736b63, 0x4a3121}
    },
// desert
{
        .water = {{ 0x4a84c6, 0x4a7bc6 }, { 0x4a84c6, 0x4a7bc6 }, { 0x4a84c6, 0x5284c6 }, { 0x4a7bbd, 0x4a7bc6 }
},
        .tree = {{ 0xa59c7b, 0x6b7b18 }, { 0x214210, 0xada573 }, { 0x526b21, 0xcec6a5 }, { 0xa59c7b, 0x316321 }},
        .rock = {{ 0xa59494, 0x736352 }, { 0xa59c94, 0xb5ada5 }, { 0xb5ada5, 0x8c847b }, { 0x736352, 0xbdada5 }},
        .meadow = {{ 0x739c31, 0x9cbd52 }, { 0x7bb529, 0x63ad21 }, { 0x9cbd52, 0x8c944a }, { 0x7ba539, 0x739c31 }},
        .grass = {
            { 0xbdbd9c, 0xb5b594 }, { 0xc6bda5, 0xbdbda5 }, { 0xbdbd9c, 0xc6c6ad }, { 0xd6cead, 0xc6bd9c },
{ 0xa59c7b, 0xbdb594 }, { 0xcecead, 0xb5ad94 }, { 0xc6c6a5, 0xdedebd }, { 0xcecead, 0xd6d6b5 }
        },
        .road = { 0x6b5a52, 0x4a4239}
    }
});
export class unnamed67_8 {
    public absolute_x: number = 0;
    public absolute_y: number = 0;
    public width_tiles: number = 0;
    public height_tiles: number = 0;
    public x_offset: number = 0;
    public y_offset: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.absolute_x = args[0]);
        args.length >= 2 && (this.absolute_y = args[1]);
        args.length >= 3 && (this.width_tiles = args[2]);
        args.length >= 4 && (this.height_tiles = args[3]);
        args.length >= 5 && (this.x_offset = args[4]);
        args.length >= 6 && (this.y_offset = args[5]);
    }
}
let data: unnamed67_8 = new unnamed67_8();
function foreach_map_tile(callback: map_callback) {
    city_view_foreach_minimap_tile(
        data.x_offset, data.y_offset, data.absolute_x, data.absolute_y,
        data.width_tiles, data.height_tiles, callback);
}
function set_bounds(x_offset: number, y_offset: number, width: number, height: number) {
    data.width_tiles = width / 2;
    data.height_tiles = height;
    data.x_offset = x_offset;
    data.y_offset = y_offset;
    data.absolute_x = (VIEW_X_MAX - data.width_tiles) / 2;
    data.absolute_y = (VIEW_Y_MAX - data.height_tiles) / 2;
    data.absolute_y &= ~1
}
function draw_minimap_tile(x_view: number, y_view: number, grid_offset: number) {
    if (grid_offset < 0) {
        return;
    }
    let terrain: number = map_terrain_get(grid_offset);
    if (terrain & TERRAIN_BUILDING) {
        if (map_property_is_draw_tile(grid_offset)) {
            let image_id: number = image_group(GROUP_MINIMAP_BUILDING);
            switch (map_property_multi_tile_size(grid_offset)) {
                case 1:
                    image_draw(image_id, x_view, y_view);
                    break
                case 2:
                    image_draw(image_id + 1, x_view, y_view - 1);
                    break
            }
        }
    } else {
        let rand: number = map_random_get(grid_offset);
        let color: tile_color;
        let set: tile_color_set = MINIMAP_COLOR_SETS[scenario_property_climate()];
        if (terrain & TERRAIN_WATER) {
            color = set.water[rand & 3];
        } else if (terrain & (TERRAIN_SHRUB | TERRAIN_TREE)) {
            color = set.tree[rand & 3];
        } else if (terrain & (TERRAIN_ROCK | TERRAIN_ELEVATION)) {
            color = set.rock[rand & 3];
        } else if (terrain & TERRAIN_ROAD) {
            color = set.road;
        } else if (terrain & TERRAIN_MEADOW) {
            color = set.meadow[rand & 3];
        } else {
            color = set.grass[rand & 7];
        }
        graphics_draw_vertical_line(x_view, y_view, y_view, color.left);
        graphics_draw_vertical_line(x_view + 1, y_view, y_view, color.right);
    }
}
export function widget_scenario_minimap_draw(x_offset: number, y_offset: number, width: number, height: number) {
    set_bounds(x_offset, y_offset, width + 2, height);
    graphics_set_clip_rectangle(x_offset, y_offset, width, height);
    foreach_map_tile(draw_minimap_tile);
    graphics_reset_clip_rectangle();
}
