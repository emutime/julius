export const MAX_TILES = 8;
export class terrain_image {
    public is_valid: number = 0;
    public group_offset: number = 0;
    public item_offset: number = 0;
    public aqueduct_offset: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.is_valid = args[0]);
        args.length >= 2 && (this.group_offset = args[1]);
        args.length >= 3 && (this.item_offset = args[2]);
        args.length >= 4 && (this.aqueduct_offset = args[3]);
    }
}
import { building_type } from 'building/type';
import BUILDING_GATEHOUSE = building_type.BUILDING_GATEHOUSE;
import BUILDING_GRANARY = building_type.BUILDING_GRANARY;
import BUILDING_RESERVOIR = building_type.BUILDING_RESERVOIR;
import { building_type } from 'building/type';;
import { buffer } from 'core/buffer';
import { building } from 'building/building';
import { building_get } from 'building/building';
import { view_tile } from 'city/view';
import { map_callback } from 'city/view';
import { city_view_orientation } from 'city/view';
import { map_building_at } from 'map/building';
import { map_elevation_at } from 'map/elevation';
import { GRID } from 'map/grid';
import GRID_SIZE = GRID.GRID_SIZE;
import { map_grid_delta } from 'map/grid';
import { map_grid_direction_delta } from 'map/grid';
import { edge_x } from 'map/property';
import EDGE_X1Y0 = edge_x.EDGE_X1Y0;
import EDGE_X0Y1 = edge_x.EDGE_X0Y1;
import EDGE_X2Y1 = edge_x.EDGE_X2Y1;
import EDGE_X1Y2 = edge_x.EDGE_X1Y2;
import { map_property_multi_tile_xy } from 'map/property';
import { map_property_is_plaza_or_earthquake } from 'map/property';
import { map_property_is_constructing } from 'map/property';
import { terrain } from 'map/terrain';
import TERRAIN_ROCK = terrain.TERRAIN_ROCK;
import TERRAIN_WATER = terrain.TERRAIN_WATER;
import TERRAIN_BUILDING = terrain.TERRAIN_BUILDING;
import TERRAIN_ROAD = terrain.TERRAIN_ROAD;
import TERRAIN_AQUEDUCT = terrain.TERRAIN_AQUEDUCT;
import TERRAIN_ACCESS_RAMP = terrain.TERRAIN_ACCESS_RAMP;
import TERRAIN_WALL = terrain.TERRAIN_WALL;
import TERRAIN_GATEHOUSE = terrain.TERRAIN_GATEHOUSE;
import TERRAIN_WALL_OR_GATEHOUSE = terrain.TERRAIN_WALL_OR_GATEHOUSE;
import { map_terrain_is } from 'map/terrain';
export class terrain_image_context {
    public tiles: number[] = new Array(MAX_TILES).fill(0);
    public offset_for_orientation: number[] = new Array(4).fill(0);
    public aqueduct_offset: number = 0;
    public max_item_offset: number = 0;
    public current_item_offset: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.tiles = args[0]);
        args.length >= 2 && (this.offset_for_orientation = args[1]);
        args.length >= 3 && (this.aqueduct_offset = args[2]);
        args.length >= 4 && (this.max_item_offset = args[3]);
        args.length >= 5 && (this.current_item_offset = args[4]);
    }
}
let terrain_images_water: terrain_image_context[] = new Array(48).fill({
    {{ 1, 2, 1, 2, 1, 2, 1, 2}, { 79, 79, 79, 79}, 0, 1},
{ { 1, 2, 1, 2, 1, 2, 0, 2 }, { 47, 46, 45, 44 }, 0, 1 },
{ { 0, 2, 1, 2, 1, 2, 1, 2 }, { 44, 47, 46, 45 }, 0, 1 },
{ { 1, 2, 0, 2, 1, 2, 1, 2 }, { 45, 44, 47, 46 }, 0, 1 },
{ { 1, 2, 1, 2, 0, 2, 1, 2 }, { 46, 45, 44, 47 }, 0, 1 },
{ { 1, 2, 0, 2, 1, 2, 0, 2 }, { 40, 42, 40, 42 }, 0, 2 },
{ { 0, 2, 1, 2, 0, 2, 1, 2 }, { 42, 40, 42, 40 }, 0, 2 },
{ { 1, 2, 1, 2, 0, 0, 0, 2 }, { 32, 28, 24, 36 }, 0, 4 },
{ { 0, 2, 1, 2, 1, 2, 0, 0 }, { 36, 32, 28, 24 }, 0, 4 },
{ { 0, 0, 0, 2, 1, 2, 1, 2 }, { 24, 36, 32, 28 }, 0, 4 },
{ { 1, 2, 0, 0, 0, 2, 1, 2 }, { 28, 24, 36, 32 }, 0, 4 },
{ { 1, 2, 1, 2, 0, 1, 0, 2 }, { 77, 76, 75, 78 }, 0, 1 },
{ { 0, 2, 1, 2, 1, 2, 0, 1 }, { 78, 77, 76, 75 }, 0, 1 },
{ { 0, 1, 0, 2, 1, 2, 1, 2 }, { 75, 78, 77, 76 }, 0, 1 },
{ { 1, 2, 0, 1, 0, 2, 1, 2 }, { 76, 75, 78, 77 }, 0, 1 },
{ { 1, 2, 0, 0, 0, 0, 0, 2 }, { 16, 12, 8, 20 }, 0, 4 },
{ { 0, 2, 1, 2, 0, 0, 0, 0 }, { 20, 16, 12, 8 }, 0, 4 },
{ { 0, 0, 0, 2, 1, 2, 0, 0 }, { 8, 20, 16, 12 }, 0, 4 },
{ { 0, 0, 0, 0, 0, 2, 1, 2 }, { 12, 8, 20, 16 }, 0, 4 },
{ { 1, 2, 0, 1, 0, 0, 0, 2 }, { 69, 66, 63, 72 }, 0, 1 },
{ { 0, 2, 1, 2, 0, 1, 0, 0 }, { 72, 69, 66, 63 }, 0, 1 },
{ { 0, 0, 0, 2, 1, 2, 0, 1 }, { 63, 72, 69, 66 }, 0, 1 },
{ { 0, 1, 0, 0, 0, 2, 1, 2 }, { 66, 63, 72, 69 }, 0, 1 },
{ { 1, 2, 0, 0, 0, 1, 0, 2 }, { 70, 67, 64, 73 }, 0, 1 },
{ { 0, 2, 1, 2, 0, 0, 0, 1 }, { 73, 70, 67, 64 }, 0, 1 },
{ { 0, 1, 0, 2, 1, 2, 0, 0 }, { 64, 73, 70, 67 }, 0, 1 },
{ { 0, 0, 0, 1, 0, 2, 1, 2 }, { 67, 64, 73, 70 }, 0, 1 },
{ { 1, 2, 0, 1, 0, 1, 0, 2 }, { 71, 68, 65, 74 }, 0, 1 },
{ { 0, 2, 1, 2, 0, 1, 0, 1 }, { 74, 71, 68, 65 }, 0, 1 },
{ { 0, 1, 0, 2, 1, 2, 0, 1 }, { 65, 74, 71, 68 }, 0, 1 },
{ { 0, 1, 0, 1, 0, 2, 1, 2 }, { 68, 65, 74, 71 }, 0, 1 },
{ { 0, 1, 0, 1, 0, 1, 0, 1 }, { 62, 62, 62, 62 }, 0, 1 },
{ { 0, 1, 0, 1, 0, 1, 0, 0 }, { 60, 59, 58, 61 }, 0, 1 },
{ { 0, 0, 0, 1, 0, 1, 0, 1 }, { 61, 60, 59, 58 }, 0, 1 },
{ { 0, 1, 0, 0, 0, 1, 0, 1 }, { 58, 61, 60, 59 }, 0, 1 },
{ { 0, 1, 0, 1, 0, 0, 0, 1 }, { 59, 58, 61, 60 }, 0, 1 },
{ { 0, 1, 0, 0, 0, 1, 0, 0 }, { 48, 49, 48, 49 }, 0, 1 },
{ { 0, 0, 0, 1, 0, 0, 0, 1 }, { 49, 48, 49, 48 }, 0, 1 },
{ { 0, 1, 0, 1, 0, 0, 0, 0 }, { 56, 55, 54, 57 }, 0, 1 },
{ { 0, 0, 0, 1, 0, 1, 0, 0 }, { 57, 56, 55, 54 }, 0, 1 },
{ { 0, 0, 0, 0, 0, 1, 0, 1 }, { 54, 57, 56, 55 }, 0, 1 },
{ { 0, 1, 0, 0, 0, 0, 0, 1 }, { 55, 54, 57, 56 }, 0, 1 },
{ { 0, 1, 0, 0, 0, 0, 0, 0 }, { 52, 51, 50, 53 }, 0, 1 },
{ { 0, 0, 0, 1, 0, 0, 0, 0 }, { 53, 52, 51, 50 }, 0, 1 },
{ { 0, 0, 0, 0, 0, 1, 0, 0 }, { 50, 53, 52, 51 }, 0, 1 },
{ { 0, 0, 0, 0, 0, 0, 0, 1 }, { 51, 50, 53, 52 }, 0, 1 },
{ { 0, 0, 0, 0, 0, 0, 0, 0 }, { 0, 0, 0, 0 }, 0, 6 },
{ { 0, 0, 0, 0, 0, 0, 0, 0 }, { 0, 0, 0, 0 }, 0, 0 },
});
let terrain_images_wall: terrain_image_context[] = new Array(48).fill({
    {{ 1, 2, 1, 2, 1, 2, 1, 2}, { 26, 26, 26, 26}, 0, 1},
{ { 1, 2, 1, 2, 1, 2, 0, 2 }, { 15, 10, 5, 16 }, 0, 1 },
{ { 0, 2, 1, 2, 1, 2, 1, 2 }, { 16, 15, 10, 5 }, 0, 1 },
{ { 1, 2, 0, 2, 1, 2, 1, 2 }, { 5, 16, 15, 10 }, 0, 1 },
{ { 1, 2, 1, 2, 0, 2, 1, 2 }, { 10, 5, 16, 15 }, 0, 1 },
{ { 1, 2, 0, 2, 1, 2, 0, 2 }, { 1, 4, 1, 4 }, 0, 1 },
{ { 0, 2, 1, 2, 0, 2, 1, 2 }, { 4, 1, 4, 1 }, 0, 1 },
{ { 1, 2, 1, 2, 0, 0, 0, 2 }, { 10, 7, 5, 12 }, 0, 1 },
{ { 0, 2, 1, 2, 1, 2, 0, 0 }, { 12, 10, 7, 5 }, 0, 1 },
{ { 0, 0, 0, 2, 1, 2, 1, 2 }, { 5, 12, 10, 7 }, 0, 1 },
{ { 1, 2, 0, 0, 0, 2, 1, 2 }, { 7, 5, 12, 10 }, 0, 1 },
{ { 1, 2, 1, 2, 0, 1, 0, 2 }, { 10, 22, 5, 12 }, 0, 1 },
{ { 0, 2, 1, 2, 1, 2, 0, 1 }, { 12, 10, 22, 5 }, 0, 1 },
{ { 0, 1, 0, 2, 1, 2, 1, 2 }, { 5, 12, 10, 22 }, 0, 1 },
{ { 1, 2, 0, 1, 0, 2, 1, 2 }, { 22, 5, 12, 10 }, 0, 1 },
{ { 1, 2, 0, 0, 0, 0, 0, 2 }, { 3, 2, 1, 4 }, 0, 1 },
{ { 0, 2, 1, 2, 0, 0, 0, 0 }, { 4, 3, 2, 1 }, 0, 1 },
{ { 0, 0, 0, 2, 1, 2, 0, 0 }, { 1, 4, 3, 2 }, 0, 1 },
{ { 0, 0, 0, 0, 0, 2, 1, 2 }, { 2, 1, 4, 3 }, 0, 1 },
{ { 1, 2, 0, 1, 0, 0, 0, 2 }, { 22, 24, 1, 4 }, 0, 1 },
{ { 0, 2, 1, 2, 0, 1, 0, 0 }, { 4, 22, 24, 1 }, 0, 1 },
{ { 0, 0, 0, 2, 1, 2, 0, 1 }, { 1, 4, 22, 24 }, 0, 1 },
{ { 0, 1, 0, 0, 0, 2, 1, 2 }, { 24, 1, 4, 22 }, 0, 1 },
{ { 1, 2, 0, 0, 0, 1, 0, 2 }, { 25, 22, 1, 4 }, 0, 1 },
{ { 0, 2, 1, 2, 0, 0, 0, 1 }, { 4, 25, 22, 1 }, 0, 1 },
{ { 0, 1, 0, 2, 1, 2, 0, 0 }, { 1, 4, 25, 22 }, 0, 1 },
{ { 0, 0, 0, 1, 0, 2, 1, 2 }, { 22, 1, 4, 25 }, 0, 1 },
{ { 1, 2, 0, 1, 0, 1, 0, 2 }, { 22, 22, 1, 4 }, 0, 1 },
{ { 0, 2, 1, 2, 0, 1, 0, 1 }, { 4, 22, 22, 1 }, 0, 1 },
{ { 0, 1, 0, 2, 1, 2, 0, 1 }, { 1, 4, 22, 22 }, 0, 1 },
{ { 0, 1, 0, 1, 0, 2, 1, 2 }, { 22, 1, 4, 22 }, 0, 1 },
{ { 0, 1, 0, 1, 0, 1, 0, 1 }, { 22, 22, 22, 22 }, 0, 1 },
{ { 0, 1, 0, 1, 0, 1, 0, 0 }, { 22, 22, 23, 22 }, 0, 1 },
{ { 0, 0, 0, 1, 0, 1, 0, 1 }, { 22, 22, 22, 23 }, 0, 1 },
{ { 0, 1, 0, 0, 0, 1, 0, 1 }, { 23, 22, 22, 22 }, 0, 1 },
{ { 0, 1, 0, 1, 0, 0, 0, 1 }, { 22, 23, 22, 22 }, 0, 1 },
{ { 0, 1, 0, 0, 0, 1, 0, 0 }, { 17, 18, 17, 18 }, 0, 1 },
{ { 0, 0, 0, 1, 0, 0, 0, 1 }, { 18, 17, 18, 17 }, 0, 1 },
{ { 0, 1, 0, 1, 0, 0, 0, 0 }, { 22, 21, 19, 22 }, 0, 1 },
{ { 0, 0, 0, 1, 0, 1, 0, 0 }, { 22, 22, 21, 19 }, 0, 1 },
{ { 0, 0, 0, 0, 0, 1, 0, 1 }, { 19, 22, 22, 21 }, 0, 1 },
{ { 0, 1, 0, 0, 0, 0, 0, 1 }, { 21, 19, 22, 22 }, 0, 1 },
{ { 0, 1, 0, 0, 0, 0, 0, 0 }, { 21, 20, 19, 22 }, 0, 1 },
{ { 0, 0, 0, 1, 0, 0, 0, 0 }, { 22, 21, 20, 19 }, 0, 1 },
{ { 0, 0, 0, 0, 0, 1, 0, 0 }, { 19, 22, 21, 20 }, 0, 1 },
{ { 0, 0, 0, 0, 0, 0, 0, 1 }, { 20, 19, 22, 21 }, 0, 1 },
{ { 0, 0, 0, 0, 0, 0, 0, 0 }, { 0, 0, 0, 0 }, 0, 1 },
{ { 0, 0, 0, 0, 0, 0, 0, 0 }, { 0, 0, 0, 0 }, 0, 0 },
});
let terrain_images_wall_gatehouse: terrain_image_context[] = new Array(10).fill({
    {{ 1, 2, 0, 2, 0, 2, 0, 2}, { 16, 15, 10, 5}, 0, 1},
{ { 0, 2, 1, 2, 0, 2, 0, 2 }, { 5, 16, 15, 10 }, 0, 1 },
{ { 0, 2, 0, 2, 1, 2, 0, 2 }, { 10, 5, 16, 15 }, 0, 1 },
{ { 0, 2, 0, 2, 0, 2, 1, 2 }, { 15, 10, 5, 16 }, 0, 1 },
{ { 1, 2, 1, 2, 0, 2, 0, 2 }, { 27, 12, 28, 22 }, 0, 1 },
{ { 0, 2, 1, 2, 1, 2, 0, 2 }, { 22, 27, 12, 28 }, 0, 1 },
{ { 0, 2, 0, 2, 1, 2, 1, 2 }, { 28, 22, 27, 12 }, 0, 1 },
{ { 1, 2, 0, 2, 0, 2, 1, 2 }, { 12, 28, 22, 27 }, 0, 1 },
{ { 1, 2, 0, 2, 1, 2, 0, 2 }, { 31, 32, 31, 32 }, 0, 1 },
{ { 0, 2, 1, 2, 0, 2, 1, 2 }, { 32, 31, 32, 31 }, 0, 1 },
});
let terrain_images_elevation: terrain_image_context[] = new Array(14).fill({
    {{ 1, 1, 1, 1, 1, 1, 1, 1}, { 44, 44, 44, 44}, 2, 1},
{ { 1, 1, 1, 1, 1, 0, 1, 1 }, { 30, 18, 28, 22 }, 4, 2 },
{ { 1, 1, 1, 1, 1, 1, 1, 0 }, { 22, 30, 18, 28 }, 4, 2 },
{ { 1, 0, 1, 1, 1, 1, 1, 1 }, { 28, 22, 30, 18 }, 4, 2 },
{ { 1, 1, 1, 0, 1, 1, 1, 1 }, { 18, 28, 22, 30 }, 4, 2 },
{ { 1, 1, 1, 2, 2, 2, 1, 1 }, { 0, 8, 12, 4 }, 4, 4 },
{ { 1, 1, 1, 1, 1, 2, 2, 2 }, { 4, 0, 8, 12 }, 4, 4 },
{ { 2, 2, 1, 1, 1, 1, 1, 2 }, { 12, 4, 0, 8 }, 4, 4 },
{ { 1, 2, 2, 2, 1, 1, 1, 1 }, { 8, 12, 4, 0 }, 4, 4 },
{ { 1, 1, 1, 2, 2, 2, 2, 2 }, { 24, 16, 26, 20 }, 4, 2 },
{ { 2, 2, 1, 1, 1, 2, 2, 2 }, { 20, 24, 16, 26 }, 4, 2 },
{ { 2, 2, 2, 2, 1, 1, 1, 2 }, { 26, 20, 24, 16 }, 4, 2 },
{ { 1, 2, 2, 2, 2, 2, 1, 1 }, { 16, 26, 20, 24 }, 4, 2 },
{ { 2, 2, 2, 2, 2, 2, 2, 2 }, { 32, 32, 32, 32 }, 4, 4 },
});
let terrain_images_earthquake: terrain_image_context[] = new Array(17).fill({
    {{ 1, 2, 1, 2, 1, 2, 1, 2}, { 29, 29, 29, 29}, 0, 1},
{ { 1, 2, 1, 2, 1, 2, 0, 2 }, { 25, 28, 27, 26 }, 0, 1 },
{ { 0, 2, 1, 2, 1, 2, 1, 2 }, { 26, 25, 28, 27 }, 0, 1 },
{ { 1, 2, 0, 2, 1, 2, 1, 2 }, { 27, 26, 25, 28 }, 0, 1 },
{ { 1, 2, 1, 2, 0, 2, 1, 2 }, { 28, 27, 26, 25 }, 0, 1 },
{ { 1, 2, 1, 2, 0, 2, 0, 2 }, { 8, 14, 12, 10 }, 0, 2 },
{ { 0, 2, 1, 2, 1, 2, 0, 2 }, { 10, 8, 14, 12 }, 0, 2 },
{ { 0, 2, 0, 2, 1, 2, 1, 2 }, { 12, 10, 8, 14 }, 0, 2 },
{ { 1, 2, 0, 2, 0, 2, 1, 2 }, { 14, 12, 10, 8 }, 0, 2 },
{ { 1, 2, 0, 2, 1, 2, 0, 2 }, { 0, 4, 0, 4 }, 0, 4 },
{ { 0, 2, 1, 2, 0, 2, 1, 2 }, { 4, 0, 4, 0 }, 0, 4 },
{ { 1, 2, 0, 2, 0, 2, 0, 2 }, { 16, 22, 18, 20 }, 0, 2 },
{ { 0, 2, 1, 2, 0, 2, 0, 2 }, { 20, 16, 22, 18 }, 0, 2 },
{ { 0, 2, 0, 2, 1, 2, 0, 2 }, { 18, 20, 16, 22 }, 0, 2 },
{ { 0, 2, 0, 2, 0, 2, 1, 2 }, { 22, 18, 20, 16 }, 0, 2 },
{ { 0, 2, 0, 2, 0, 2, 0, 2 }, { 24, 24, 24, 24 }, 0, 1 },
{ { 2, 2, 2, 2, 2, 2, 2, 2 }, { 24, 24, 24, 24 }, 0, 1 },
});
let terrain_images_dirt_road: terrain_image_context[] = new Array(17).fill({
    {{ 1, 2, 1, 2, 1, 2, 1, 2}, { 17, 17, 17, 17}, 0, 1},
{ { 1, 2, 1, 2, 1, 2, 0, 2 }, { 13, 16, 15, 14 }, 0, 1 },
{ { 0, 2, 1, 2, 1, 2, 1, 2 }, { 14, 13, 16, 15 }, 0, 1 },
{ { 1, 2, 0, 2, 1, 2, 1, 2 }, { 15, 14, 13, 16 }, 0, 1 },
{ { 1, 2, 1, 2, 0, 2, 1, 2 }, { 16, 15, 14, 13 }, 0, 1 },
{ { 1, 2, 1, 2, 0, 2, 0, 2 }, { 4, 7, 6, 5 }, 0, 1 },
{ { 0, 2, 1, 2, 1, 2, 0, 2 }, { 5, 4, 7, 6 }, 0, 1 },
{ { 0, 2, 0, 2, 1, 2, 1, 2 }, { 6, 5, 4, 7 }, 0, 1 },
{ { 1, 2, 0, 2, 0, 2, 1, 2 }, { 7, 6, 5, 4 }, 0, 1 },
{ { 1, 2, 0, 2, 1, 2, 0, 2 }, { 0, 1, 0, 1 }, 0, 1 },
{ { 0, 2, 1, 2, 0, 2, 1, 2 }, { 1, 0, 1, 0 }, 0, 1 },
{ { 1, 2, 0, 2, 0, 2, 0, 2 }, { 8, 11, 10, 9 }, 0, 1 },
{ { 0, 2, 1, 2, 0, 2, 0, 2 }, { 9, 8, 11, 10 }, 0, 1 },
{ { 0, 2, 0, 2, 1, 2, 0, 2 }, { 10, 9, 8, 11 }, 0, 1 },
{ { 0, 2, 0, 2, 0, 2, 1, 2 }, { 11, 10, 9, 8 }, 0, 1 },
{ { 0, 2, 0, 2, 0, 2, 0, 2 }, { 12, 12, 12, 12 }, 0, 1 },
{ { 2, 2, 2, 2, 2, 2, 2, 2 }, { 12, 12, 12, 12 }, 0, 1 },
});
let terrain_images_paved_road: terrain_image_context[] = new Array(48).fill({
    {{ 1, 0, 1, 0, 1, 0, 1, 0}, { 17, 17, 17, 17}, 0, 1},
{ { 1, 0, 1, 0, 1, 2, 0, 2 }, { 13, 16, 15, 14 }, 0, 1 },
{ { 1, 1, 1, 1, 1, 2, 0, 2 }, { 18, 21, 20, 19 }, 0, 1 },
{ { 1, 0, 1, 1, 1, 2, 0, 2 }, { 26, 33, 32, 31 }, 0, 1 },
{ { 1, 1, 1, 0, 1, 2, 0, 2 }, { 30, 29, 28, 27 }, 0, 1 },
{ { 0, 2, 1, 0, 1, 0, 1, 2 }, { 14, 13, 16, 15 }, 0, 1 },
{ { 0, 2, 1, 1, 1, 1, 1, 2 }, { 19, 18, 21, 20 }, 0, 1 },
{ { 0, 2, 1, 0, 1, 1, 1, 2 }, { 31, 26, 33, 32 }, 0, 1 },
{ { 0, 2, 1, 1, 1, 0, 1, 2 }, { 27, 30, 29, 28 }, 0, 1 },
{ { 1, 2, 0, 2, 1, 0, 1, 0 }, { 15, 14, 13, 16 }, 0, 1 },
{ { 1, 2, 0, 2, 1, 1, 1, 1 }, { 20, 19, 18, 21 }, 0, 1 },
{ { 1, 2, 0, 2, 1, 0, 1, 1 }, { 32, 31, 26, 33 }, 0, 1 },
{ { 1, 2, 0, 2, 1, 1, 1, 0 }, { 28, 27, 30, 29 }, 0, 1 },
{ { 1, 0, 1, 2, 0, 2, 1, 0 }, { 16, 15, 14, 13 }, 0, 1 },
{ { 1, 1, 1, 2, 0, 2, 1, 1 }, { 21, 20, 19, 18 }, 0, 1 },
{ { 1, 1, 1, 2, 0, 2, 1, 0 }, { 33, 32, 31, 26 }, 0, 1 },
{ { 1, 0, 1, 2, 0, 2, 1, 1 }, { 29, 28, 27, 30 }, 0, 1 },
{ { 1, 1, 1, 2, 0, 0, 0, 2 }, { 22, 25, 24, 23 }, 0, 1 },
{ { 0, 2, 1, 1, 1, 2, 0, 0 }, { 23, 22, 25, 24 }, 0, 1 },
{ { 0, 0, 0, 2, 1, 1, 1, 2 }, { 24, 23, 22, 25 }, 0, 1 },
{ { 1, 2, 0, 0, 0, 2, 1, 1 }, { 25, 24, 23, 22 }, 0, 1 },
{ { 1, 0, 1, 0, 1, 1, 1, 1 }, { 34, 37, 36, 35 }, 0, 1 },
{ { 1, 1, 1, 0, 1, 0, 1, 1 }, { 35, 34, 37, 36 }, 0, 1 },
{ { 1, 1, 1, 1, 1, 0, 1, 0 }, { 36, 35, 34, 37 }, 0, 1 },
{ { 1, 0, 1, 1, 1, 1, 1, 0 }, { 37, 36, 35, 34 }, 0, 1 },
{ { 1, 0, 1, 0, 1, 0, 1, 1 }, { 38, 41, 40, 39 }, 0, 1 },
{ { 1, 1, 1, 0, 1, 0, 1, 0 }, { 39, 38, 41, 40 }, 0, 1 },
{ { 1, 0, 1, 1, 1, 0, 1, 0 }, { 40, 39, 38, 41 }, 0, 1 },
{ { 1, 0, 1, 0, 1, 1, 1, 0 }, { 41, 40, 39, 38 }, 0, 1 },
{ { 1, 1, 1, 1, 1, 0, 1, 1 }, { 42, 45, 44, 43 }, 0, 1 },
{ { 1, 1, 1, 1, 1, 1, 1, 0 }, { 43, 42, 45, 44 }, 0, 1 },
{ { 1, 0, 1, 1, 1, 1, 1, 1 }, { 44, 43, 42, 45 }, 0, 1 },
{ { 1, 1, 1, 0, 1, 1, 1, 1 }, { 45, 44, 43, 42 }, 0, 1 },
{ { 1, 1, 1, 0, 1, 1, 1, 0 }, { 46, 47, 46, 47 }, 0, 1 },
{ { 1, 0, 1, 1, 1, 0, 1, 1 }, { 47, 46, 47, 46 }, 0, 1 },
{ { 1, 2, 1, 2, 0, 2, 0, 2 }, { 4, 7, 6, 5 }, 0, 1 },
{ { 0, 2, 1, 2, 1, 2, 0, 2 }, { 5, 4, 7, 6 }, 0, 1 },
{ { 0, 2, 0, 2, 1, 2, 1, 2 }, { 6, 5, 4, 7 }, 0, 1 },
{ { 1, 2, 0, 2, 0, 2, 1, 2 }, { 7, 6, 5, 4 }, 0, 1 },
{ { 1, 2, 0, 2, 1, 2, 0, 2 }, { 0, 1, 0, 1 }, 0, 1 },
{ { 0, 2, 1, 2, 0, 2, 1, 2 }, { 1, 0, 1, 0 }, 0, 1 },
{ { 1, 2, 0, 2, 0, 2, 0, 2 }, { 8, 11, 10, 9 }, 0, 1 },
{ { 0, 2, 1, 2, 0, 2, 0, 2 }, { 9, 8, 11, 10 }, 0, 1 },
{ { 0, 2, 0, 2, 1, 2, 0, 2 }, { 10, 9, 8, 11 }, 0, 1 },
{ { 0, 2, 0, 2, 0, 2, 1, 2 }, { 11, 10, 9, 8 }, 0, 1 },
{ { 0, 0, 0, 0, 0, 0, 0, 0 }, { 12, 12, 12, 12 }, 0, 1 },
{ { 1, 1, 1, 1, 1, 1, 1, 1 }, { 48, 48, 48, 48 }, 0, 1 },
{ { 2, 2, 2, 2, 2, 2, 2, 2 }, { 12, 12, 12, 12 }, 0, 1 },
});
let terrain_images_aqueduct: terrain_image_context[] = new Array(16).fill({
    {{ 1, 2, 1, 2, 0, 2, 0, 2}, { 4, 7, 6, 5}, 7, 1},
{ { 0, 2, 1, 2, 1, 2, 0, 2 }, { 5, 4, 7, 6 }, 8, 1 },
{ { 0, 2, 0, 2, 1, 2, 1, 2 }, { 6, 5, 4, 7 }, 9, 1 },
{ { 1, 2, 0, 2, 0, 2, 1, 2 }, { 7, 6, 5, 4 }, 10, 1 },
{ { 1, 2, 0, 2, 1, 2, 0, 2 }, { 2, 3, 2, 3 }, 5, 1 },
{ { 0, 2, 1, 2, 0, 2, 1, 2 }, { 3, 2, 3, 2 }, 6, 1 },
{ { 1, 2, 0, 2, 0, 2, 0, 2 }, { 2, 3, 2, 3 }, 1, 1 },
{ { 0, 2, 1, 2, 0, 2, 0, 2 }, { 3, 2, 3, 2 }, 2, 1 },
{ { 0, 2, 0, 2, 1, 2, 0, 2 }, { 2, 3, 2, 3 }, 3, 1 },
{ { 0, 2, 0, 2, 0, 2, 1, 2 }, { 3, 2, 3, 2 }, 4, 1 },
{ { 1, 2, 1, 2, 1, 2, 0, 2 }, { 10, 13, 12, 11 }, 11, 1 },
{ { 0, 2, 1, 2, 1, 2, 1, 2 }, { 11, 10, 13, 12 }, 12, 1 },
{ { 1, 2, 0, 2, 1, 2, 1, 2 }, { 12, 11, 10, 13 }, 13, 1 },
{ { 1, 2, 1, 2, 0, 2, 1, 2 }, { 13, 12, 11, 10 }, 14, 1 },
{ { 1, 2, 1, 2, 1, 2, 1, 2 }, { 14, 14, 14, 14 }, 15, 1 },
{ { 2, 2, 2, 2, 2, 2, 2, 2 }, { 2, 2, 2, 2 }, 0, 1 },
});
export const enum context_wa {
    CONTEXT_WATER = undefined,
    CONTEXT_WALL = undefined,
    CONTEXT_WALL_GATEHOUSE = undefined,
    CONTEXT_ELEVATION = undefined,
    CONTEXT_EARTHQUAKE = undefined,
    CONTEXT_DIRT_ROAD = undefined,
    CONTEXT_PAVED_ROAD = undefined,
    CONTEXT_AQUEDUCT = undefined,
    CONTEXT_MAX_ITEMS = undefined,
}
export class unnamed279_8 {
    public context: terrain_image_context = null;
    public size: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.context = args[0]);
        args.length >= 2 && (this.size = args[1]);
    }
}
let context_pointers: unnamed279_8[] = new Array().fill({
    { terrain_images_water, 48},
    { terrain_images_wall, 48},
    { terrain_images_wall_gatehouse, 10},
    { terrain_images_elevation, 14},
    { terrain_images_earthquake, 17},
    { terrain_images_dirt_road, 17},
    { terrain_images_paved_road, 48},
    { terrain_images_aqueduct, 16}
});
function clear_current_offset(items: terrain_image_context, num_items: number) {
    for (let i: number = 0; i < num_items; i++) {
        items[i].current_item_offset = 0;
    }
}
export function map_image_context_init() {
    for (let i: number = 0; i < CONTEXT_MAX_ITEMS; i++) {
        clear_current_offset(context_pointers[i].context, context_pointers[i].size);
    }
}
export function map_image_context_reset_water() {
    clear_current_offset(context_pointers[CONTEXT_WATER].context, context_pointers[CONTEXT_WATER].size);
}
export function map_image_context_reset_elevation() {
    clear_current_offset(context_pointers[CONTEXT_ELEVATION].context, context_pointers[CONTEXT_ELEVATION].size);
}
function context_matches_tiles(context: struct terrain_image_context, tiles: number) {
    for (let i: number = 0; i < MAX_TILES; i++) {
        if (context.tiles[i] != 2 && tiles[i] != context.tiles[i]) {
            return 0;
        }
    }
    return 1;
}
function get_image(group: number, tiles: number) {
    let result: terrain_image;
    result.is_valid = 0;
    let context: terrain_image_context = context_pointers[group].context;
    let size: number = context_pointers[group].size;
    for (let i: number = 0; i < size; i++) {
        if (context_matches_tiles(context[i], tiles)) {
            context[i].current_item_offset++;
            if (context[i].current_item_offset >= context[i].max_item_offset) {
                context[i].current_item_offset = 0;
            }
            result.is_valid = 1;
            result.group_offset = context[i].offset_for_orientation[city_view_orientation() / 2];
            result.item_offset = context[i].current_item_offset;
            result.aqueduct_offset = context[i].aqueduct_offset;
            break
        }
    }
    return result;
}
export function map_image_context_get_elevation(grid_offset: number, elevation: number) {
    let tiles: number[];
    for (let i: number = 0; i < MAX_TILES; i++) {
        tiles[i] = map_elevation_at(grid_offset + map_grid_direction_delta(i)) >= elevation ? 1 : 0;
    }
    return get_image(CONTEXT_ELEVATION, tiles);
}
export function map_image_context_get_earthquake(grid_offset: number) {
    let tiles: number[];
    for (let i: number = 0; i < MAX_TILES; i++) {
        let offset: number = grid_offset + map_grid_direction_delta(i);
        tiles[i] = (map_terrain_is(offset, TERRAIN_ROCK) &&
            map_property_is_plaza_or_earthquake(grid_offset)) ? 1 : 0;
    }
    return get_image(CONTEXT_EARTHQUAKE, tiles);
}
function fill_matches(grid_offset: number, terrain: number, match_value: number, no_match_value: number, tiles: number) {
    for (let i: number = 0; i < MAX_TILES; i++) {
        tiles[i] = map_terrain_is(grid_offset + map_grid_direction_delta(i), terrain) ? match_value : no_match_value;
    }
}
export function map_image_context_get_shore(grid_offset: number) {
    let tiles: number[];
    fill_matches(grid_offset, TERRAIN_WATER, 0, 1, tiles);
    return get_image(CONTEXT_WATER, tiles);
}
export function map_image_context_get_wall(grid_offset: number) {
    let tiles: number[];
    fill_matches(grid_offset, TERRAIN_WALL, 0, 1, tiles);
    return get_image(CONTEXT_WALL, tiles);
}
export function map_image_context_get_wall_gatehouse(grid_offset: number) {
    let tiles: number[] = { 0, 0, 0, 0, 0, 0, 0, 0};
    for (let i: number = 0; i < MAX_TILES; i += 2) {
        tiles[i] = map_terrain_is(grid_offset + map_grid_direction_delta(i), TERRAIN_WALL_OR_GATEHOUSE) ? 1 : 0;
    }
    return get_image(CONTEXT_WALL_GATEHOUSE, tiles);
}
function set_tiles_road(grid_offset: number, tiles: number) {
    fill_matches(grid_offset, TERRAIN_ROAD, 1, 0, tiles);
    for (let i: number = 0; i < MAX_TILES; i += 2) {
        let offset: number = grid_offset + map_grid_direction_delta(i);
        if (map_terrain_is(offset, TERRAIN_GATEHOUSE)) {
            let b: building = building_get(map_building_at(offset));
            if (b.type == BUILDING_GATEHOUSE &&
                b.subtype.orientation == 1 + ((i / 2) & 1)) {
                tiles[i] = 1;
            }
        } else if (map_terrain_is(offset, TERRAIN_ACCESS_RAMP)) {
            tiles[i] = 1;
        } else if (map_terrain_is(offset, TERRAIN_BUILDING)) {
            let b: building = building_get(map_building_at(offset));
            if (b.type == BUILDING_GRANARY) {
                tiles[i] = (offset == b.grid_offset + map_grid_delta(1, 0)) ? 1 : 0;
                tiles[i] |= (offset == b.grid_offset + map_grid_delta(0, 1)) ? 1 : 0
                tiles[i] |= (offset == b.grid_offset + map_grid_delta(2, 1)) ? 1 : 0
                tiles[i] |= (offset == b.grid_offset + map_grid_delta(1, 2)) ? 1 : 0
            }
        }
    }
}
export function map_image_context_get_dirt_road(grid_offset: number) {
    let tiles: number[];
    set_tiles_road(grid_offset, tiles);
    return get_image(CONTEXT_DIRT_ROAD, tiles);
}
export function map_image_context_get_paved_road(grid_offset: number) {
    let tiles: number[];
    set_tiles_road(grid_offset, tiles);
    return get_image(CONTEXT_PAVED_ROAD, tiles);
}
function is_reservoir_construction_entrance(grid_offset: number) {
    if (!map_property_is_constructing(grid_offset)) {
        return 0;
    }
    if (map_property_is_constructing(grid_offset + map_grid_direction_delta(0)) &&
        map_property_is_constructing(grid_offset + map_grid_direction_delta(4))) {
        return !map_property_is_constructing(grid_offset + 2 * map_grid_direction_delta(0)) ||
            !map_property_is_constructing(grid_offset + 2 * map_grid_direction_delta(4));
    }
    if (map_property_is_constructing(grid_offset + map_grid_direction_delta(2)) &&
        map_property_is_constructing(grid_offset + map_grid_direction_delta(6))) {
        return !map_property_is_constructing(grid_offset + 2 * map_grid_direction_delta(2)) ||
            !map_property_is_constructing(grid_offset + 2 * map_grid_direction_delta(6));
    }
    return 0;
}
function set_terrain_reservoir(grid_offset: number, direction: number, multi_tile_mask: number, tiles: number, include_construction: number) {
    let offset: number = grid_offset + map_grid_direction_delta(direction);
    if (map_terrain_is(offset, TERRAIN_BUILDING)) {
        let b: building = building_get(map_building_at(offset));
        if (b.type == BUILDING_RESERVOIR && map_property_multi_tile_xy(offset) == multi_tile_mask) {
            tiles[direction] = 1;
            return;
        }
    }
    if (include_construction && is_reservoir_construction_entrance(offset)) {
        tiles[direction] = 1;
    }
}
export function map_image_context_get_aqueduct(grid_offset: number, include_construction: number) {
    let tiles: number[] = { 0, 0, 0, 0, 0, 0, 0, 0};
    let has_road: number = map_terrain_is(grid_offset, TERRAIN_ROAD) ? 1 : 0;
    for (let i: number = 0; i < MAX_TILES; i += 2) {
        let offset: number = grid_offset + map_grid_direction_delta(i);
        if (map_terrain_is(offset, TERRAIN_AQUEDUCT)) {
            if (has_road) {
                if (!map_terrain_is(offset, TERRAIN_ROAD)) {
                    tiles[i] = 1;
                }
            } else {
                tiles[i] = 1;
            }
        }
    }
    set_terrain_reservoir(grid_offset, 0, EDGE_X1Y2, tiles, include_construction);
    set_terrain_reservoir(grid_offset, 2, EDGE_X0Y1, tiles, include_construction);
    set_terrain_reservoir(grid_offset, 4, EDGE_X1Y0, tiles, include_construction);
    set_terrain_reservoir(grid_offset, 6, EDGE_X2Y1, tiles, include_construction);
    return get_image(CONTEXT_AQUEDUCT, tiles);
}
