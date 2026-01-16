export type building_info_context = any;
export const enum building_info_type {
    BUILDING_INFO_NONE = 0,
    BUILDING_INFO_TERRAIN = 1,
    BUILDING_INFO_BUILDING = 2,
    BUILDING_INFO_LEGION = 4
}
export const enum terrain_info_type {
    TERRAIN_INFO_NONE = 0,
    TERRAIN_INFO_TREE = 1,
    TERRAIN_INFO_ROCK = 2,
    TERRAIN_INFO_WATER = 3,
    TERRAIN_INFO_SHRUB = 4,
    TERRAIN_INFO_EARTHQUAKE = 5,
    TERRAIN_INFO_ROAD = 6,
    TERRAIN_INFO_AQUEDUCT = 7,
    TERRAIN_INFO_RUBBLE = 8,
    TERRAIN_INFO_WALL = 9,
    TERRAIN_INFO_EMPTY = 10,
    TERRAIN_INFO_BRIDGE = 11,
    TERRAIN_INFO_GARDEN = 12,
    TERRAIN_INFO_PLAZA = 13,
    TERRAIN_INFO_ENTRY_FLAG = 14,
    TERRAIN_INFO_EXIT_FLAG = 15
}

export function window_building_get_vertical_offset(..._args: any[]): number {
    return 0;
}

export function window_building_set_possible_position(..._args: any[]): void {
}
