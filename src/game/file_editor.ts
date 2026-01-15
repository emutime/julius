
import { building_clear_all } from 'building/building';
import { building_construction_clear_type } from 'building/construction';
import { building_menu_enable_all } from 'building/menu';
import { building_storage_clear_all } from 'building/storage';
import { city_data_init, city_data_init_scenario } from 'city/data';
import { city_message_init_scenario } from 'city/message';
import { city_victory_reset } from 'city/victory';
import { city_view_init, city_view_reset_orientation, city_view_set_camera } from 'city/view';
import { image_group, image_load_climate } from 'core/image';
import { group_editor } from 'core/image_group_editor';
import { empire_load } from 'empire/empire';
import { empire_object_init_cities } from 'empire/object';
import { enemy_armies_clear } from 'figure/enemy_army';
import { figure_init_scenario } from 'figure/figure';
import { formations_clear } from 'figure/formation';
import { figure_name_init } from 'figure/name';
import { figure_route_clear_all } from 'figure/route';
import { traders_clear } from 'figure/trader';
import { figure_create_editor_flags } from 'figuretype/editor';
import { figure_create_flotsam } from 'figuretype/water';
import { game_animation_init } from 'game/animation';
import { game_file_io_read_scenario, game_file_io_write_scenario } from 'game/file_io';
import { game_state_init, game_state_unpause } from 'game/state';
import { game_time_init } from 'game/time';
import { string_from_bytes } from 'core/string';
import { map_aqueduct_clear } from 'map/aqueduct';
import { map_building_clear } from 'map/building';
import { map_desirability_clear } from 'map/desirability';
import { map_elevation_clear } from 'map/elevation';
import { map_figure_clear } from 'map/figure';
import { map_image_clear, map_image_init_edges } from 'map/image';
import { map_image_context_init } from 'map/image_context';
import { map_natives_init_editor } from 'map/natives';
import { map_property_clear, map_property_init_alternate_terrain } from 'map/property';
import { map_random_clear, map_random_init } from 'map/random';
import { map_road_network_clear } from 'map/road_network';
import { map_routing_update_all } from 'map/routing_terrain';
import { map_soldier_strength_clear } from 'map/soldier_strength';
import { map_sprite_clear } from 'map/sprite';
import { map_terrain_clear, map_terrain_init_outside_map } from 'map/terrain';
import { map_tiles_update_all_aqueducts, map_tiles_update_all_earthquake, map_tiles_update_all_elevation_editor, map_tiles_update_all_empty_land, map_tiles_update_all_meadow, map_tiles_update_all_plazas, map_tiles_update_all_roads, map_tiles_update_all_rocks, map_tiles_update_all_walls, map_tiles_update_all_water } from 'map/tiles';
import { scenario_distant_battle_set_enemy_travel_months, scenario_distant_battle_set_roman_travel_months } from 'scenario/distant_battle';
import { scenario_editor_create, scenario_editor_set_native_images } from 'scenario/editor';
import { scenario_empire_id } from 'scenario/empire';
import { scenario_invasion_clear } from 'scenario/invasion';
import { scenario_map_init } from 'scenario/map';
import { scenario_property_climate } from 'scenario/property';
import { sound_city_init } from 'sound/city';
import GROUP_EDITOR_BUILDING_CROPS = group_editor.GROUP_EDITOR_BUILDING_CROPS;
import GROUP_EDITOR_BUILDING_NATIVE = group_editor.GROUP_EDITOR_BUILDING_NATIVE;
export function game_file_editor_clear_data() {
    city_victory_reset();
    building_construction_clear_type();
    city_data_init();
    city_data_init_scenario();
    city_message_init_scenario();
    game_state_init();
    game_animation_init();
    sound_city_init();
    building_menu_enable_all();
    building_clear_all();
    building_storage_clear_all();
    figure_init_scenario();
    enemy_armies_clear();
    figure_name_init();
    formations_clear();
    figure_route_clear_all();
    traders_clear();
    game_time_init(2098);
    scenario_invasion_clear();
}
function clear_map_data() {
    map_image_clear();
    map_building_clear();
    map_terrain_clear();
    map_aqueduct_clear();
    map_figure_clear();
    map_property_clear();
    map_sprite_clear();
    map_random_clear();
    map_desirability_clear();
    map_elevation_clear();
    map_soldier_strength_clear();
    map_road_network_clear();
    map_image_context_init();
    map_terrain_init_outside_map();
    map_random_init();
    map_property_init_alternate_terrain();
}
function create_blank_map(size: number) {
    scenario_editor_create(size);
    scenario_map_init();
    clear_map_data();
    map_image_init_edges();
    city_view_set_camera(76, 152);
    city_view_reset_orientation();
}
function prepare_map_for_editing() {
    image_load_climate(scenario_property_climate(), 1, 0);
    empire_load(1, scenario_empire_id());
    empire_object_init_cities();
    figure_init_scenario();
    figure_create_editor_flags();
    figure_create_flotsam();
    map_tiles_update_all_elevation_editor();
    map_tiles_update_all_water();
    map_tiles_update_all_earthquake();
    map_tiles_update_all_rocks();
    map_tiles_update_all_empty_land();
    map_tiles_update_all_meadow();
    map_tiles_update_all_roads();
    map_tiles_update_all_plazas();
    map_tiles_update_all_walls();
    map_tiles_update_all_aqueducts(0);
    map_natives_init_editor();
    map_routing_update_all();
    city_view_init();
    game_state_unpause();
}
export function game_file_editor_create_scenario(size: number) {
    create_blank_map(size);
    prepare_map_for_editing();
}
export function game_file_editor_load_scenario(scenario_file: string | ArrayLike<number>) {
    const scenarioFileStr = typeof scenario_file === "string" ? scenario_file : string_from_bytes(scenario_file);
    clear_map_data();
    if (!game_file_io_read_scenario(scenarioFileStr)) {
        return 0;
    }
    scenario_map_init();
    prepare_map_for_editing();
    return 1;
}
export function game_file_editor_write_scenario(scenario_file: string | ArrayLike<number>) {
    const scenarioFileStr = typeof scenario_file === "string" ? scenario_file : string_from_bytes(scenario_file);
    scenario_editor_set_native_images(
        image_group(GROUP_EDITOR_BUILDING_NATIVE),
        image_group(GROUP_EDITOR_BUILDING_NATIVE) + 2,
        image_group(GROUP_EDITOR_BUILDING_CROPS)
    );
    scenario_distant_battle_set_roman_travel_months();
    scenario_distant_battle_set_enemy_travel_months();
    return game_file_io_write_scenario(scenarioFileStr);
}
