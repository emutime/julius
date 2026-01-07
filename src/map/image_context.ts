import { building_type } from 'building/type';
import { buffer } from 'core/buffer';
import { building } from 'building/building';
import { building_get } from 'building/building';
import { city_view_orientation } from 'city/view';
import { map_building_at } from 'map/building';
import { map_elevation_at } from 'map/elevation';
import { GRID } from 'map/grid';
import { map_grid_delta } from 'map/grid';
import { map_grid_direction_delta } from 'map/grid';
import { edge_x } from 'map/property';
import { map_property_multi_tile_xy } from 'map/property';
import { map_property_is_plaza_or_earthquake } from 'map/property';
import { map_property_is_constructing } from 'map/property';
import { terrain } from 'map/terrain';
import { map_terrain_is } from 'map/terrain';

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

const BUILDING_GATEHOUSE = building_type.BUILDING_GATEHOUSE;
const BUILDING_GRANARY = building_type.BUILDING_GRANARY;
const BUILDING_RESERVOIR = building_type.BUILDING_RESERVOIR;
const GRID_SIZE = GRID.GRID_SIZE;
const EDGE_X1Y0 = edge_x.EDGE_X1Y0;
const EDGE_X0Y1 = edge_x.EDGE_X0Y1;
const EDGE_X2Y1 = edge_x.EDGE_X2Y1;
const EDGE_X1Y2 = edge_x.EDGE_X1Y2;
const TERRAIN_ROCK = terrain.TERRAIN_ROCK;
const TERRAIN_WATER = terrain.TERRAIN_WATER;
const TERRAIN_BUILDING = terrain.TERRAIN_BUILDING;
const TERRAIN_ROAD = terrain.TERRAIN_ROAD;
const TERRAIN_AQUEDUCT = terrain.TERRAIN_AQUEDUCT;
const TERRAIN_ACCESS_RAMP = terrain.TERRAIN_ACCESS_RAMP;
const TERRAIN_WALL = terrain.TERRAIN_WALL;
const TERRAIN_GATEHOUSE = terrain.TERRAIN_GATEHOUSE;
const TERRAIN_WALL_OR_GATEHOUSE = terrain.TERRAIN_WALL_OR_GATEHOUSE;

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
let terrain_images_water: terrain_image_context[] = [
    { tiles: [1, 2, 1, 2, 1, 2, 1, 2], offset_for_orientation: [79, 79, 79, 79], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 2, 1, 2, 1, 2, 0, 2], offset_for_orientation: [47, 46, 45, 44], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 2, 1, 2, 1, 2, 1, 2], offset_for_orientation: [44, 47, 46, 45], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 2, 0, 2, 1, 2, 1, 2], offset_for_orientation: [45, 44, 47, 46], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 2, 1, 2, 0, 2, 1, 2], offset_for_orientation: [46, 45, 44, 47], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 2, 0, 2, 1, 2, 0, 2], offset_for_orientation: [40, 42, 40, 42], aqueduct_offset: 0, max_item_offset: 2, current_item_offset: 0 },
    { tiles: [0, 2, 1, 2, 0, 2, 1, 2], offset_for_orientation: [42, 40, 42, 40], aqueduct_offset: 0, max_item_offset: 2, current_item_offset: 0 },
    { tiles: [1, 2, 1, 2, 0, 0, 0, 2], offset_for_orientation: [32, 28, 24, 36], aqueduct_offset: 0, max_item_offset: 4, current_item_offset: 0 },
    { tiles: [0, 2, 1, 2, 1, 2, 0, 0], offset_for_orientation: [36, 32, 28, 24], aqueduct_offset: 0, max_item_offset: 4, current_item_offset: 0 },
    { tiles: [0, 0, 0, 2, 1, 2, 1, 2], offset_for_orientation: [24, 36, 32, 28], aqueduct_offset: 0, max_item_offset: 4, current_item_offset: 0 },
    { tiles: [1, 2, 0, 0, 0, 2, 1, 2], offset_for_orientation: [28, 24, 36, 32], aqueduct_offset: 0, max_item_offset: 4, current_item_offset: 0 },
    { tiles: [1, 2, 1, 2, 0, 1, 0, 2], offset_for_orientation: [77, 76, 75, 78], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 2, 1, 2, 1, 2, 0, 1], offset_for_orientation: [78, 77, 76, 75], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 1, 0, 2, 1, 2, 1, 2], offset_for_orientation: [75, 78, 77, 76], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 2, 0, 1, 0, 2, 1, 2], offset_for_orientation: [76, 75, 78, 77], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 2, 0, 0, 0, 0, 0, 2], offset_for_orientation: [16, 12, 8, 20], aqueduct_offset: 0, max_item_offset: 4, current_item_offset: 0 },
    { tiles: [0, 2, 1, 2, 0, 0, 0, 0], offset_for_orientation: [20, 16, 12, 8], aqueduct_offset: 0, max_item_offset: 4, current_item_offset: 0 },
    { tiles: [0, 0, 0, 2, 1, 2, 0, 0], offset_for_orientation: [8, 20, 16, 12], aqueduct_offset: 0, max_item_offset: 4, current_item_offset: 0 },
    { tiles: [0, 0, 0, 0, 0, 2, 1, 2], offset_for_orientation: [12, 8, 20, 16], aqueduct_offset: 0, max_item_offset: 4, current_item_offset: 0 },
    { tiles: [1, 2, 0, 1, 0, 0, 0, 2], offset_for_orientation: [69, 66, 63, 72], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 2, 1, 2, 0, 1, 0, 0], offset_for_orientation: [72, 69, 66, 63], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 0, 0, 2, 1, 2, 0, 1], offset_for_orientation: [63, 72, 69, 66], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 1, 0, 0, 0, 2, 1, 2], offset_for_orientation: [66, 63, 72, 69], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 2, 0, 0, 0, 1, 0, 2], offset_for_orientation: [70, 67, 64, 73], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 2, 1, 2, 0, 0, 0, 1], offset_for_orientation: [73, 70, 67, 64], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 1, 0, 2, 1, 2, 0, 0], offset_for_orientation: [64, 73, 70, 67], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 0, 0, 1, 0, 2, 1, 2], offset_for_orientation: [67, 64, 73, 70], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 2, 0, 1, 0, 1, 0, 2], offset_for_orientation: [71, 68, 65, 74], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 2, 1, 2, 0, 1, 0, 1], offset_for_orientation: [74, 71, 68, 65], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 1, 0, 2, 1, 2, 0, 1], offset_for_orientation: [65, 74, 71, 68], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 1, 0, 1, 0, 2, 1, 2], offset_for_orientation: [68, 65, 74, 71], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 1, 0, 1, 0, 1, 0, 1], offset_for_orientation: [62, 62, 62, 62], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 1, 0, 1, 0, 1, 0, 0], offset_for_orientation: [60, 59, 58, 61], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 0, 0, 1, 0, 1, 0, 1], offset_for_orientation: [61, 60, 59, 58], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 1, 0, 0, 0, 1, 0, 1], offset_for_orientation: [58, 61, 60, 59], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 1, 0, 1, 0, 0, 0, 1], offset_for_orientation: [59, 58, 61, 60], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 1, 0, 0, 0, 1, 0, 0], offset_for_orientation: [48, 49, 48, 49], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 0, 0, 1, 0, 0, 0, 1], offset_for_orientation: [49, 48, 49, 48], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 1, 0, 1, 0, 0, 0, 0], offset_for_orientation: [56, 55, 54, 57], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 0, 0, 1, 0, 1, 0, 0], offset_for_orientation: [57, 56, 55, 54], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 0, 0, 0, 0, 1, 0, 1], offset_for_orientation: [54, 57, 56, 55], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 1, 0, 0, 0, 0, 0, 1], offset_for_orientation: [55, 54, 57, 56], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 1, 0, 0, 0, 0, 0, 0], offset_for_orientation: [52, 51, 50, 53], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 0, 0, 1, 0, 0, 0, 0], offset_for_orientation: [53, 52, 51, 50], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 0, 0, 0, 0, 1, 0, 0], offset_for_orientation: [50, 53, 52, 51], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 0, 0, 0, 0, 0, 0, 1], offset_for_orientation: [51, 50, 53, 52], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 0, 0, 0, 0, 0, 0, 0], offset_for_orientation: [0, 0, 0, 0], aqueduct_offset: 0, max_item_offset: 6, current_item_offset: 0 },
    { tiles: [0, 0, 0, 0, 0, 0, 0, 0], offset_for_orientation: [0, 0, 0, 0], aqueduct_offset: 0, max_item_offset: 0, current_item_offset: 0 }
];
let terrain_images_wall: terrain_image_context[] = [
    { tiles: [1, 2, 1, 2, 1, 2, 1, 2], offset_for_orientation: [26, 26, 26, 26], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 2, 1, 2, 1, 2, 0, 2], offset_for_orientation: [15, 10, 5, 16], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 2, 1, 2, 1, 2, 1, 2], offset_for_orientation: [16, 15, 10, 5], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 2, 0, 2, 1, 2, 1, 2], offset_for_orientation: [5, 16, 15, 10], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 2, 1, 2, 0, 2, 1, 2], offset_for_orientation: [10, 5, 16, 15], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 2, 0, 2, 1, 2, 0, 2], offset_for_orientation: [1, 4, 1, 4], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 2, 1, 2, 0, 2, 1, 2], offset_for_orientation: [4, 1, 4, 1], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 2, 1, 2, 0, 0, 0, 2], offset_for_orientation: [10, 7, 5, 12], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 2, 1, 2, 1, 2, 0, 0], offset_for_orientation: [12, 10, 7, 5], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 0, 0, 2, 1, 2, 1, 2], offset_for_orientation: [5, 12, 10, 7], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 2, 0, 0, 0, 2, 1, 2], offset_for_orientation: [7, 5, 12, 10], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 2, 1, 2, 0, 1, 0, 2], offset_for_orientation: [10, 22, 5, 12], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 2, 1, 2, 1, 2, 0, 1], offset_for_orientation: [12, 10, 22, 5], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 1, 0, 2, 1, 2, 1, 2], offset_for_orientation: [5, 12, 10, 22], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 2, 0, 1, 0, 2, 1, 2], offset_for_orientation: [22, 5, 12, 10], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 2, 0, 0, 0, 0, 0, 2], offset_for_orientation: [3, 2, 1, 4], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 2, 1, 2, 0, 0, 0, 0], offset_for_orientation: [4, 3, 2, 1], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 0, 0, 2, 1, 2, 0, 0], offset_for_orientation: [1, 4, 3, 2], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 0, 0, 0, 0, 2, 1, 2], offset_for_orientation: [2, 1, 4, 3], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 2, 0, 1, 0, 0, 0, 2], offset_for_orientation: [22, 24, 1, 4], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 2, 1, 2, 0, 1, 0, 0], offset_for_orientation: [4, 22, 24, 1], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 0, 0, 2, 1, 2, 0, 1], offset_for_orientation: [1, 4, 22, 24], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 1, 0, 0, 0, 2, 1, 2], offset_for_orientation: [24, 1, 4, 22], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 2, 0, 0, 0, 1, 0, 2], offset_for_orientation: [25, 22, 1, 4], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 2, 1, 2, 0, 0, 0, 1], offset_for_orientation: [4, 25, 22, 1], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 1, 0, 2, 1, 2, 0, 0], offset_for_orientation: [1, 4, 25, 22], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 0, 0, 1, 0, 2, 1, 2], offset_for_orientation: [22, 1, 4, 25], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 2, 0, 1, 0, 1, 0, 2], offset_for_orientation: [22, 22, 1, 4], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 2, 1, 2, 0, 1, 0, 1], offset_for_orientation: [4, 22, 22, 1], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 1, 0, 2, 1, 2, 0, 1], offset_for_orientation: [1, 4, 22, 22], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 1, 0, 1, 0, 2, 1, 2], offset_for_orientation: [22, 1, 4, 22], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 1, 0, 1, 0, 1, 0, 1], offset_for_orientation: [22, 22, 22, 22], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 1, 0, 1, 0, 1, 0, 0], offset_for_orientation: [22, 22, 23, 22], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 0, 0, 1, 0, 1, 0, 1], offset_for_orientation: [22, 22, 22, 23], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 1, 0, 0, 0, 1, 0, 1], offset_for_orientation: [23, 22, 22, 22], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 1, 0, 1, 0, 0, 0, 1], offset_for_orientation: [22, 23, 22, 22], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 1, 0, 0, 0, 1, 0, 0], offset_for_orientation: [17, 18, 17, 18], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 0, 0, 1, 0, 0, 0, 1], offset_for_orientation: [18, 17, 18, 17], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 1, 0, 1, 0, 0, 0, 0], offset_for_orientation: [22, 21, 19, 22], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 0, 0, 1, 0, 1, 0, 0], offset_for_orientation: [22, 22, 21, 19], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 0, 0, 0, 0, 1, 0, 1], offset_for_orientation: [19, 22, 22, 21], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 1, 0, 0, 0, 0, 0, 1], offset_for_orientation: [21, 19, 22, 22], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 1, 0, 0, 0, 0, 0, 0], offset_for_orientation: [21, 20, 19, 22], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 0, 0, 1, 0, 0, 0, 0], offset_for_orientation: [22, 21, 20, 19], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 0, 0, 0, 0, 1, 0, 0], offset_for_orientation: [19, 22, 21, 20], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 0, 0, 0, 0, 0, 0, 1], offset_for_orientation: [20, 19, 22, 21], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 0, 0, 0, 0, 0, 0, 0], offset_for_orientation: [0, 0, 0, 0], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 0, 0, 0, 0, 0, 0, 0], offset_for_orientation: [0, 0, 0, 0], aqueduct_offset: 0, max_item_offset: 0, current_item_offset: 0 },
];
let terrain_images_wall_gatehouse: terrain_image_context[] = [
    { tiles: [1, 2, 0, 2, 0, 2, 0, 2], offset_for_orientation: [16, 15, 10, 5], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 2, 1, 2, 0, 2, 0, 2], offset_for_orientation: [5, 16, 15, 10], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 2, 0, 2, 1, 2, 0, 2], offset_for_orientation: [10, 5, 16, 15], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 2, 0, 2, 0, 2, 1, 2], offset_for_orientation: [15, 10, 5, 16], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 2, 1, 2, 0, 2, 0, 2], offset_for_orientation: [27, 12, 28, 22], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 2, 1, 2, 1, 2, 0, 2], offset_for_orientation: [22, 27, 12, 28], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 2, 0, 2, 1, 2, 1, 2], offset_for_orientation: [28, 22, 27, 12], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 2, 0, 2, 0, 2, 1, 2], offset_for_orientation: [12, 28, 22, 27], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 2, 0, 2, 1, 2, 0, 2], offset_for_orientation: [31, 32, 31, 32], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 2, 1, 2, 0, 2, 1, 2], offset_for_orientation: [32, 31, 32, 31], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
];
let terrain_images_elevation: terrain_image_context[] = [
    { tiles: [1, 1, 1, 1, 1, 1, 1, 1], offset_for_orientation: [44, 44, 44, 44], aqueduct_offset: 2, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 1, 1, 1, 1, 0, 1, 1], offset_for_orientation: [30, 18, 28, 22], aqueduct_offset: 4, max_item_offset: 2, current_item_offset: 0 },
    { tiles: [1, 1, 1, 1, 1, 1, 1, 0], offset_for_orientation: [22, 30, 18, 28], aqueduct_offset: 4, max_item_offset: 2, current_item_offset: 0 },
    { tiles: [1, 0, 1, 1, 1, 1, 1, 1], offset_for_orientation: [28, 22, 30, 18], aqueduct_offset: 4, max_item_offset: 2, current_item_offset: 0 },
    { tiles: [1, 1, 1, 0, 1, 1, 1, 1], offset_for_orientation: [18, 28, 22, 30], aqueduct_offset: 4, max_item_offset: 2, current_item_offset: 0 },
    { tiles: [1, 1, 1, 2, 2, 2, 1, 1], offset_for_orientation: [0, 8, 12, 4], aqueduct_offset: 4, max_item_offset: 4, current_item_offset: 0 },
    { tiles: [1, 1, 1, 1, 1, 2, 2, 2], offset_for_orientation: [4, 0, 8, 12], aqueduct_offset: 4, max_item_offset: 4, current_item_offset: 0 },
    { tiles: [2, 2, 1, 1, 1, 1, 1, 2], offset_for_orientation: [12, 4, 0, 8], aqueduct_offset: 4, max_item_offset: 4, current_item_offset: 0 },
    { tiles: [1, 2, 2, 2, 1, 1, 1, 1], offset_for_orientation: [8, 12, 4, 0], aqueduct_offset: 4, max_item_offset: 4, current_item_offset: 0 },
    { tiles: [1, 1, 1, 2, 2, 2, 2, 2], offset_for_orientation: [24, 16, 26, 20], aqueduct_offset: 4, max_item_offset: 2, current_item_offset: 0 },
    { tiles: [2, 2, 1, 1, 1, 2, 2, 2], offset_for_orientation: [20, 24, 16, 26], aqueduct_offset: 4, max_item_offset: 2, current_item_offset: 0 },
    { tiles: [2, 2, 2, 2, 1, 1, 1, 2], offset_for_orientation: [26, 20, 24, 16], aqueduct_offset: 4, max_item_offset: 2, current_item_offset: 0 },
    { tiles: [1, 2, 2, 2, 2, 2, 1, 1], offset_for_orientation: [16, 26, 20, 24], aqueduct_offset: 4, max_item_offset: 2, current_item_offset: 0 },
    { tiles: [2, 2, 2, 2, 2, 2, 2, 2], offset_for_orientation: [32, 32, 32, 32], aqueduct_offset: 4, max_item_offset: 4, current_item_offset: 0 }
];
let terrain_images_earthquake: terrain_image_context[] = [
    { tiles: [1, 2, 1, 2, 1, 2, 1, 2], offset_for_orientation: [29, 29, 29, 29], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 2, 1, 2, 1, 2, 0, 2], offset_for_orientation: [25, 28, 27, 26], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 2, 1, 2, 1, 2, 1, 2], offset_for_orientation: [26, 25, 28, 27], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 2, 0, 2, 1, 2, 1, 2], offset_for_orientation: [27, 26, 25, 28], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 2, 1, 2, 0, 2, 1, 2], offset_for_orientation: [28, 27, 26, 25], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 2, 1, 2, 0, 2, 0, 2], offset_for_orientation: [8, 14, 12, 10], aqueduct_offset: 0, max_item_offset: 2, current_item_offset: 0 },
    { tiles: [0, 2, 1, 2, 1, 2, 0, 2], offset_for_orientation: [10, 8, 14, 12], aqueduct_offset: 0, max_item_offset: 2, current_item_offset: 0 },
    { tiles: [0, 2, 0, 2, 1, 2, 1, 2], offset_for_orientation: [12, 10, 8, 14], aqueduct_offset: 0, max_item_offset: 2, current_item_offset: 0 },
    { tiles: [1, 2, 0, 2, 0, 2, 1, 2], offset_for_orientation: [14, 12, 10, 8], aqueduct_offset: 0, max_item_offset: 2, current_item_offset: 0 },
    { tiles: [1, 2, 0, 2, 1, 2, 0, 2], offset_for_orientation: [0, 4, 0, 4], aqueduct_offset: 0, max_item_offset: 4, current_item_offset: 0 },
    { tiles: [0, 2, 1, 2, 0, 2, 1, 2], offset_for_orientation: [4, 0, 4, 0], aqueduct_offset: 0, max_item_offset: 4, current_item_offset: 0 },
    { tiles: [1, 2, 0, 2, 0, 2, 0, 2], offset_for_orientation: [16, 22, 18, 20], aqueduct_offset: 0, max_item_offset: 2, current_item_offset: 0 },
    { tiles: [0, 2, 1, 2, 0, 2, 0, 2], offset_for_orientation: [20, 16, 22, 18], aqueduct_offset: 0, max_item_offset: 2, current_item_offset: 0 },
    { tiles: [0, 2, 0, 2, 1, 2, 0, 2], offset_for_orientation: [18, 20, 16, 22], aqueduct_offset: 0, max_item_offset: 2, current_item_offset: 0 },
    { tiles: [0, 2, 0, 2, 0, 2, 1, 2], offset_for_orientation: [22, 18, 20, 16], aqueduct_offset: 0, max_item_offset: 2, current_item_offset: 0 },
    { tiles: [0, 2, 0, 2, 0, 2, 0, 2], offset_for_orientation: [24, 24, 24, 24], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [2, 2, 2, 2, 2, 2, 2, 2], offset_for_orientation: [24, 24, 24, 24], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 }
];
let terrain_images_dirt_road: terrain_image_context[] = [
    { tiles: [1, 2, 1, 2, 1, 2, 1, 2], offset_for_orientation: [17, 17, 17, 17], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 2, 1, 2, 1, 2, 0, 2], offset_for_orientation: [13, 16, 15, 14], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 2, 1, 2, 1, 2, 1, 2], offset_for_orientation: [14, 13, 16, 15], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 2, 0, 2, 1, 2, 1, 2], offset_for_orientation: [15, 14, 13, 16], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 2, 1, 2, 0, 2, 1, 2], offset_for_orientation: [16, 15, 14, 13], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 2, 1, 2, 0, 2, 0, 2], offset_for_orientation: [4, 7, 6, 5], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 2, 1, 2, 1, 2, 0, 2], offset_for_orientation: [5, 4, 7, 6], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 2, 0, 2, 1, 2, 1, 2], offset_for_orientation: [6, 5, 4, 7], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 2, 0, 2, 0, 2, 1, 2], offset_for_orientation: [7, 6, 5, 4], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 2, 0, 2, 1, 2, 0, 2], offset_for_orientation: [0, 1, 0, 1], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 2, 1, 2, 0, 2, 1, 2], offset_for_orientation: [1, 0, 1, 0], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 2, 0, 2, 0, 2, 0, 2], offset_for_orientation: [8, 11, 10, 9], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 2, 1, 2, 0, 2, 0, 2], offset_for_orientation: [9, 8, 11, 10], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 2, 0, 2, 1, 2, 0, 2], offset_for_orientation: [10, 9, 8, 11], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 2, 0, 2, 0, 2, 1, 2], offset_for_orientation: [11, 10, 9, 8], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 2, 0, 2, 0, 2, 0, 2], offset_for_orientation: [12, 12, 12, 12], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [2, 2, 2, 2, 2, 2, 2, 2], offset_for_orientation: [12, 12, 12, 12], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 }
];
let terrain_images_paved_road: terrain_image_context[] = [
    { tiles: [1, 0, 1, 0, 1, 0, 1, 0], offset_for_orientation: [17, 17, 17, 17], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 0, 1, 0, 1, 2, 0, 2], offset_for_orientation: [13, 16, 15, 14], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 1, 1, 1, 1, 2, 0, 2], offset_for_orientation: [18, 21, 20, 19], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 0, 1, 1, 1, 2, 0, 2], offset_for_orientation: [26, 33, 32, 31], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 1, 1, 0, 1, 2, 0, 2], offset_for_orientation: [30, 29, 28, 27], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 2, 1, 0, 1, 0, 1, 2], offset_for_orientation: [14, 13, 16, 15], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 2, 1, 1, 1, 1, 1, 2], offset_for_orientation: [19, 18, 21, 20], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 2, 1, 0, 1, 1, 1, 2], offset_for_orientation: [31, 26, 33, 32], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 2, 1, 1, 1, 0, 1, 2], offset_for_orientation: [27, 30, 29, 28], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 2, 0, 2, 1, 0, 1, 0], offset_for_orientation: [15, 14, 13, 16], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 2, 0, 2, 1, 1, 1, 1], offset_for_orientation: [20, 19, 18, 21], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 2, 0, 2, 1, 0, 1, 1], offset_for_orientation: [32, 31, 26, 33], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 2, 0, 2, 1, 1, 1, 0], offset_for_orientation: [28, 27, 30, 29], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 0, 1, 2, 0, 2, 1, 0], offset_for_orientation: [16, 15, 14, 13], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 1, 1, 2, 0, 2, 1, 1], offset_for_orientation: [21, 20, 19, 18], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 1, 1, 2, 0, 2, 1, 0], offset_for_orientation: [33, 32, 31, 26], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 0, 1, 2, 0, 2, 1, 1], offset_for_orientation: [29, 28, 27, 30], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 1, 1, 2, 0, 0, 0, 2], offset_for_orientation: [22, 25, 24, 23], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 2, 1, 1, 1, 2, 0, 0], offset_for_orientation: [23, 22, 25, 24], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 0, 0, 2, 1, 1, 1, 2], offset_for_orientation: [24, 23, 22, 25], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 2, 0, 0, 0, 2, 1, 1], offset_for_orientation: [25, 24, 23, 22], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 0, 1, 0, 1, 1, 1, 1], offset_for_orientation: [34, 37, 36, 35], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 1, 1, 0, 1, 0, 1, 1], offset_for_orientation: [35, 34, 37, 36], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 1, 1, 1, 1, 0, 1, 0], offset_for_orientation: [36, 35, 34, 37], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 0, 1, 1, 1, 1, 1, 0], offset_for_orientation: [37, 36, 35, 34], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 0, 1, 0, 1, 0, 1, 1], offset_for_orientation: [38, 41, 40, 39], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 1, 1, 0, 1, 0, 1, 0], offset_for_orientation: [39, 38, 41, 40], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 0, 1, 1, 1, 0, 1, 0], offset_for_orientation: [40, 39, 38, 41], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 0, 1, 0, 1, 1, 1, 0], offset_for_orientation: [41, 40, 39, 38], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 1, 1, 1, 1, 0, 1, 1], offset_for_orientation: [42, 45, 44, 43], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 1, 1, 1, 1, 1, 1, 0], offset_for_orientation: [43, 42, 45, 44], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 0, 1, 1, 1, 1, 1, 1], offset_for_orientation: [44, 43, 42, 45], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 1, 1, 0, 1, 1, 1, 1], offset_for_orientation: [45, 44, 43, 42], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 1, 1, 0, 1, 1, 1, 0], offset_for_orientation: [46, 47, 46, 47], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 0, 1, 1, 1, 0, 1, 1], offset_for_orientation: [47, 46, 47, 46], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 2, 1, 2, 0, 2, 0, 2], offset_for_orientation: [4, 7, 6, 5], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 2, 1, 2, 1, 2, 0, 2], offset_for_orientation: [5, 4, 7, 6], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 2, 0, 2, 1, 2, 1, 2], offset_for_orientation: [6, 5, 4, 7], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 2, 0, 2, 0, 2, 1, 2], offset_for_orientation: [7, 6, 5, 4], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 2, 0, 2, 1, 2, 0, 2], offset_for_orientation: [0, 1, 0, 1], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 2, 1, 2, 0, 2, 1, 2], offset_for_orientation: [1, 0, 1, 0], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 2, 0, 2, 0, 2, 0, 2], offset_for_orientation: [8, 11, 10, 9], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 2, 1, 2, 0, 2, 0, 2], offset_for_orientation: [9, 8, 11, 10], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 2, 0, 2, 1, 2, 0, 2], offset_for_orientation: [10, 9, 8, 11], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 2, 0, 2, 0, 2, 1, 2], offset_for_orientation: [11, 10, 9, 8], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 0, 0, 0, 0, 0, 0, 0], offset_for_orientation: [12, 12, 12, 12], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 1, 1, 1, 1, 1, 1, 1], offset_for_orientation: [48, 48, 48, 48], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [2, 2, 2, 2, 2, 2, 2, 2], offset_for_orientation: [12, 12, 12, 12], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 }
];
let terrain_images_aqueduct: terrain_image_context[] = [
    { tiles: [1, 2, 1, 2, 0, 2, 0, 2], offset_for_orientation: [4, 7, 6, 5], aqueduct_offset: 7, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 2, 1, 2, 1, 2, 0, 2], offset_for_orientation: [5, 4, 7, 6], aqueduct_offset: 8, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 2, 0, 2, 1, 2, 1, 2], offset_for_orientation: [6, 5, 4, 7], aqueduct_offset: 9, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 2, 0, 2, 0, 2, 1, 2], offset_for_orientation: [7, 6, 5, 4], aqueduct_offset: 10, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 2, 0, 2, 1, 2, 0, 2], offset_for_orientation: [2, 3, 2, 3], aqueduct_offset: 5, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 2, 1, 2, 0, 2, 1, 2], offset_for_orientation: [3, 2, 3, 2], aqueduct_offset: 6, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 2, 0, 2, 0, 2, 0, 2], offset_for_orientation: [2, 3, 2, 3], aqueduct_offset: 1, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 2, 1, 2, 0, 2, 0, 2], offset_for_orientation: [3, 2, 3, 2], aqueduct_offset: 2, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 2, 0, 2, 1, 2, 0, 2], offset_for_orientation: [2, 3, 2, 3], aqueduct_offset: 3, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 2, 0, 2, 0, 2, 1, 2], offset_for_orientation: [3, 2, 3, 2], aqueduct_offset: 4, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 2, 1, 2, 1, 2, 0, 2], offset_for_orientation: [10, 13, 12, 11], aqueduct_offset: 11, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [0, 2, 1, 2, 1, 2, 1, 2], offset_for_orientation: [11, 10, 13, 12], aqueduct_offset: 12, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 2, 0, 2, 1, 2, 1, 2], offset_for_orientation: [12, 11, 10, 13], aqueduct_offset: 13, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 2, 1, 2, 0, 2, 1, 2], offset_for_orientation: [13, 12, 11, 10], aqueduct_offset: 14, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [1, 2, 1, 2, 1, 2, 1, 2], offset_for_orientation: [14, 14, 14, 14], aqueduct_offset: 15, max_item_offset: 1, current_item_offset: 0 },
    { tiles: [2, 2, 2, 2, 2, 2, 2, 2], offset_for_orientation: [2, 2, 2, 2], aqueduct_offset: 0, max_item_offset: 1, current_item_offset: 0 }
];
export const enum context_wa {
    CONTEXT_WATER = 0,
    CONTEXT_WALL = 1,
    CONTEXT_WALL_GATEHOUSE = 2,
    CONTEXT_ELEVATION = 3,
    CONTEXT_EARTHQUAKE = 4,
    CONTEXT_DIRT_ROAD = 5,
    CONTEXT_PAVED_ROAD = 6,
    CONTEXT_AQUEDUCT = 7,
    CONTEXT_MAX_ITEMS = 8,
}
export class unnamed279_8 {
    public context: terrain_image_context[];
    public size: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.context = args[0]);
        args.length >= 2 && (this.size = args[1]);
    }
}
let context_pointers: unnamed279_8[] = [
    { context: terrain_images_water, size: 48 },
    { context: terrain_images_wall, size: 48 },
    { context: terrain_images_wall_gatehouse, size: 10 },
    { context: terrain_images_elevation, size: 14 },
    { context: terrain_images_earthquake, size: 17 },
    { context: terrain_images_dirt_road, size: 17 },
    { context: terrain_images_paved_road, size: 48 },
    { context: terrain_images_aqueduct, size: 16 }
];
function clear_current_offset(items: terrain_image_context[], num_items: number) {
    for (let i: number = 0; i < num_items; i++) {
        items[i].current_item_offset = 0;
    }
}
export function map_image_context_init() {
    for (let i: number = 0; i < context_wa.CONTEXT_MAX_ITEMS; i++) {
        clear_current_offset(context_pointers[i].context, context_pointers[i].size);
    }
}
export function map_image_context_reset_water() {
    clear_current_offset(context_pointers[context_wa.CONTEXT_WATER].context, context_pointers[context_wa.CONTEXT_WATER].size);
}
export function map_image_context_reset_elevation() {
    clear_current_offset(context_pointers[context_wa.CONTEXT_ELEVATION].context, context_pointers[context_wa.CONTEXT_ELEVATION].size);
}
function context_matches_tiles(context: terrain_image_context, tiles: number[]) {
    for (let i: number = 0; i < MAX_TILES; i++) {
        if (context.tiles[i] != 2 && tiles[i] != context.tiles[i]) {
            return 0;
        }
    }
    return 1;
}
function get_image(group: number, tiles: number[]) {
    let result: terrain_image = new terrain_image();
    result.is_valid = 0;
    let context: terrain_image_context[] = context_pointers[group].context;
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
    let tiles: number[] = new Array(MAX_TILES).fill(0);
    for (let i: number = 0; i < MAX_TILES; i++) {
        tiles[i] = map_elevation_at(grid_offset + map_grid_direction_delta(i)) >= elevation ? 1 : 0;
    }
    return get_image(context_wa.CONTEXT_ELEVATION, tiles);
}
export function map_image_context_get_earthquake(grid_offset: number) {
    let tiles: number[] = new Array(MAX_TILES).fill(0);
    for (let i: number = 0; i < MAX_TILES; i++) {
        let offset: number = grid_offset + map_grid_direction_delta(i);
        tiles[i] = (map_terrain_is(offset, TERRAIN_ROCK) &&
            map_property_is_plaza_or_earthquake(grid_offset)) ? 1 : 0;
    }
    return get_image(context_wa.CONTEXT_EARTHQUAKE, tiles);
}
function fill_matches(grid_offset: number, terrain: number, match_value: number, no_match_value: number, tiles: number[]) {
    for (let i: number = 0; i < MAX_TILES; i++) {
        tiles[i] = map_terrain_is(grid_offset + map_grid_direction_delta(i), terrain) ? match_value : no_match_value;
    }
}
export function map_image_context_get_shore(grid_offset: number) {
    let tiles: number[] = new Array(MAX_TILES).fill(0);
    fill_matches(grid_offset, TERRAIN_WATER, 0, 1, tiles);
    return get_image(context_wa.CONTEXT_WATER, tiles);
}
export function map_image_context_get_wall(grid_offset: number) {
    let tiles: number[] = new Array(MAX_TILES).fill(0);
    fill_matches(grid_offset, TERRAIN_WALL, 0, 1, tiles);
    return get_image(context_wa.CONTEXT_WALL, tiles);
}
export function map_image_context_get_wall_gatehouse(grid_offset: number) {
    let tiles: number[] = new Array(MAX_TILES).fill(0);
    for (let i: number = 0; i < MAX_TILES; i += 2) {
        tiles[i] = map_terrain_is(grid_offset + map_grid_direction_delta(i), TERRAIN_WALL_OR_GATEHOUSE) ? 1 : 0;
    }
    return get_image(context_wa.CONTEXT_WALL_GATEHOUSE, tiles);
}
function set_tiles_road(grid_offset: number, tiles: number[]) {
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
                tiles[i] |= (offset == b.grid_offset + map_grid_delta(0, 1)) ? 1 : 0;
                tiles[i] |= (offset == b.grid_offset + map_grid_delta(2, 1)) ? 1 : 0;
                tiles[i] |= (offset == b.grid_offset + map_grid_delta(1, 2)) ? 1 : 0;
            }
        }
    }
}
export function map_image_context_get_dirt_road(grid_offset: number) {
    let tiles: number[] = new Array(MAX_TILES).fill(0);
    set_tiles_road(grid_offset, tiles);
    return get_image(context_wa.CONTEXT_DIRT_ROAD, tiles);
}
export function map_image_context_get_paved_road(grid_offset: number) {
    let tiles: number[] = new Array(MAX_TILES).fill(0);
    set_tiles_road(grid_offset, tiles);
    return get_image(context_wa.CONTEXT_PAVED_ROAD, tiles);
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
function set_terrain_reservoir(grid_offset: number, direction: number, multi_tile_mask: number, tiles: number[], include_construction: number) {
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
    let tiles: number[] = new Array(MAX_TILES).fill(0);
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
    return get_image(context_wa.CONTEXT_AQUEDUCT, tiles);
}
