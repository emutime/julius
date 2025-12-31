import { building_clear_all } from 'building/building';
import { building_construction_clear_type } from 'building/construction';
import { building_granaries_calculate_stocks } from 'building/granary';
import { building_maintenance_check_rome_access } from 'building/maintenance';
import { building_menu_enable_all, building_menu_update } from 'building/menu';
import { building_storage_clear_all, building_storage_reset_building_ids } from 'building/storage';
import { city_data_init, city_data_init_campaign_mission, city_data_init_scenario } from 'city/data';
import { city_emperor_init_scenario } from 'city/emperor';
import { city_map_set_entry_point, city_map_set_exit_point } from 'city/map';
import { city_message_clear_scroll, city_message_init_problem_areas, city_message_init_scenario } from 'city/message';
import { city_military_determine_distant_battle_city } from 'city/military';
import { city_mission_should_save_start, city_mission_tutorial_set_disease_message_shown, city_mission_tutorial_set_fire_message_shown } from 'city/mission';
import { city_victory_reset } from 'city/victory';
import { city_view_init, city_view_reset_orientation } from 'city/view';
import { buffer, buffer_init, buffer_read_i32 } from 'core/buffer';
import { localized } from 'core/dir';
import { encoding_from_utf8, encoding_system_uses_decomposed, encoding_to_utf8 } from 'core/encoding';
import { file_append_extension, file_exists, file_has_extension, FILE_NAME_MAX, file_remove_extension } from 'core/file';
import { image_load_climate, image_load_enemy } from 'core/image';
import { io_read_file_part_into_buffer } from 'core/io';
import { lang_get_string } from 'core/lang';
import { locale_translate_rank_autosaves } from 'core/locale';
import { empire_init_scenario, empire_load } from 'empire/empire';
import { trade_prices_reset } from 'empire/trade_prices';
import { enemy_armies_clear } from 'figure/enemy_army';
import { figure_init_scenario } from 'figure/figure';
import { formations_clear } from 'figure/formation';
import { figure_name_init } from 'figure/name';
import { figure_route_clean, figure_route_clear_all } from 'figure/route';
import { traders_clear } from 'figure/trader';
import { figure_create_fishing_points, figure_create_herds } from 'figuretype/animal';
import { figure_create_flotsam } from 'figuretype/water';
import { game_animation_init } from 'game/animation';
import { game_file_io_delete_saved_game, game_file_io_read_saved_game, game_file_io_read_scenario, game_file_io_write_saved_game } from 'game/file_io';
import { resource_type } from 'game/resource';
import { setting_player_name, setting_set_personal_savings_for_mission } from 'game/settings';
import { game_state_init, game_state_reset_overlay, game_state_unpause } from 'game/state';
import { game_time_init } from 'game/time';
import { tutorial_init } from 'game/tutorial';
import { game_undo_disable } from 'game/undo';
import { map_aqueduct_clear } from 'map/aqueduct';
import { map_bookmarks_clear } from 'map/bookmark';
import { map_building_clear } from 'map/building';
import { map_desirability_clear } from 'map/desirability';
import { map_elevation_clear } from 'map/elevation';
import { map_figure_clear } from 'map/figure';
import { GRID } from 'map/grid';
import { map_image_clear } from 'map/image';
import { map_image_context_init } from 'map/image_context';
import { map_natives_init } from 'map/natives';
import { map_orientation_update_buildings } from 'map/orientation';
import { map_point } from 'map/point';
import { map_property_clear } from 'map/property';
import { map_random_clear, map_random_init } from 'map/random';
import { map_road_network_clear, map_road_network_update } from 'map/road_network';
import { map_routing_update_all } from 'map/routing_terrain';
import { map_soldier_strength_clear } from 'map/soldier_strength';
import { map_sprite_clear } from 'map/sprite';
import { map_terrain_clear, terrain } from 'map/terrain';
import { map_tiles_add_entry_exit_flags, map_tiles_determine_gardens, map_tiles_update_all_aqueducts, map_tiles_update_all_earthquake, map_tiles_update_all_elevation, map_tiles_update_all_empty_land, map_tiles_update_all_meadow, map_tiles_update_all_plazas, map_tiles_update_all_roads, map_tiles_update_all_rocks, map_tiles_update_all_walls, map_tiles_update_all_water } from 'map/tiles';
import { scenario_criteria_init_max_year } from 'scenario/criteria';
import { scenario_demand_change_init } from 'scenario/demand_change';
import { scenario_distant_battle_set_enemy_travel_months, scenario_distant_battle_set_roman_travel_months } from 'scenario/distant_battle';
import { scenario_earthquake_init } from 'scenario/earthquake';
import { scenario_emperor_change_init } from 'scenario/emperor_change';
import { scenario_empire_id } from 'scenario/empire';
import { scenario_gladiator_revolt_init } from 'scenario/gladiator_revolt';
import { scenario_invasion_init } from 'scenario/invasion';
import { scenario_map_entry, scenario_map_exit, scenario_map_init, scenario_map_init_entry_exit } from 'scenario/map';
import { scenario_price_change_init } from 'scenario/price_change';
import { scenario_campaign_mission, scenario_campaign_rank, scenario_is_custom, scenario_is_tutorial_1, scenario_property_climate, scenario_property_enemy, scenario_property_start_year, scenario_restore_campaign_player_name, scenario_set_campaign_mission, scenario_set_campaign_rank, scenario_set_name, scenario_set_player_name } from 'scenario/property';
import { scenario_request_init } from 'scenario/request';
import { scenario_settings_init_mission } from 'scenario/scenario';
import { sound_city_init } from 'sound/city';
import { sound_music_update } from 'sound/music';
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
import NOT_LOCALIZED = localized.NOT_LOCALIZED;
import GRID_SIZE = GRID.GRID_SIZE;
import TERRAIN_WALL = terrain.TERRAIN_WALL;
import TERRAIN_GATEHOUSE = terrain.TERRAIN_GATEHOUSE;

let MISSION_PACK_FILE: string = "mission1.pak";
let MISSION_SAVED_GAMES: string[] = [
    "Citizen.sav",
    "Clerk.sav",
    "Engineer.sav",
    "Architect.sav",
    "Quaestor.sav",
    "Procurator.sav",
    "Aedile.sav",
    "Praetor.sav",
    "Consul.sav",
    "Proconsul.sav",
    "Caesar.sav",
    "Caesar2.sav"
];
function clear_scenario_data() {
    city_victory_reset();
    building_construction_clear_type();
    city_data_init();
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
    game_time_init(2098);
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
    map_random_init();
}
function initialize_scenario_data(scenario_name: number) {
    scenario_set_name(scenario_name);
    scenario_map_init();
    map_tiles_update_all_elevation();
    map_tiles_update_all_water();
    map_tiles_update_all_earthquake();
    map_tiles_update_all_rocks();
    map_tiles_add_entry_exit_flags();
    map_tiles_update_all_empty_land();
    map_tiles_update_all_meadow();
    map_tiles_update_all_roads();
    map_tiles_update_all_plazas();
    map_tiles_update_all_walls();
    map_tiles_update_all_aqueducts(0);
    map_natives_init();
    city_view_init();
    figure_create_fishing_points();
    figure_create_herds();
    figure_create_flotsam();
    map_routing_update_all();
    scenario_map_init_entry_exit();
    let entry: map_point = scenario_map_entry();
    let exit: map_point = scenario_map_exit();
    city_map_set_entry_point(entry.x, entry.y);
    city_map_set_exit_point(exit.x, exit.y);
    game_time_init(scenario_property_start_year());
    scenario_earthquake_init();
    scenario_gladiator_revolt_init();
    scenario_emperor_change_init();
    scenario_criteria_init_max_year();
    empire_init_scenario();
    traders_clear();
    scenario_invasion_init();
    city_military_determine_distant_battle_city();
    scenario_request_init();
    scenario_demand_change_init();
    scenario_price_change_init();
    building_menu_update();
    image_load_climate(scenario_property_climate(), 0, 0);
    image_load_enemy(scenario_property_enemy());
    city_data_init_scenario();
    game_state_unpause();
}
function load_custom_scenario(scenario_name: number, scenario_file: string) {
    if (!file_exists(scenario_file, NOT_LOCALIZED)) {
        return 0;
    }
    clear_scenario_data();
    game_file_load_scenario_data(scenario_file);
    initialize_scenario_data(scenario_name);
    return 1;
}
function load_empire_data(is_custom_scenario: number, empire_id: number) {
    empire_load(is_custom_scenario, empire_id);
    scenario_distant_battle_set_roman_travel_months();
    scenario_distant_battle_set_enemy_travel_months();
}
function initialize_saved_game() {
    load_empire_data(scenario_is_custom(), scenario_empire_id());
    scenario_map_init();
    city_view_init();
    map_routing_update_all();
    map_orientation_update_buildings();
    figure_route_clean();
    map_road_network_update();
    building_maintenance_check_rome_access();
    building_granaries_calculate_stocks();
    building_menu_update();
    city_message_init_problem_areas();
    sound_city_init();
    building_construction_clear_type();
    game_undo_disable();
    game_state_reset_overlay();
    city_mission_tutorial_set_fire_message_shown(1);
    city_mission_tutorial_set_disease_message_shown(1);
    image_load_climate(scenario_property_climate(), 0, 0);
    image_load_enemy(scenario_property_enemy());
    city_military_determine_distant_battle_city();
    map_tiles_determine_gardens();
    city_message_clear_scroll();
    game_state_unpause();
}
function get_campaign_mission_offset(mission_id: number) {
    let offset_data: number[];
    let buf: buffer;
    buffer_init(buf, offset_data, 4);
    if (!io_read_file_part_into_buffer(MISSION_PACK_FILE, NOT_LOCALIZED, offset_data, 4, 4 * mission_id)) {
        return 0;
    }
    return buffer_read_i32(buf);
}
function load_campaign_mission(mission_id: number) {
    let offset: number = get_campaign_mission_offset(mission_id);
    if (offset <= 0) {
        return 0;
    }
    if (!game_file_io_read_saved_game(MISSION_PACK_FILE, offset)) {
        return 0;
    }
    if (mission_id == 0) {
        scenario_set_player_name(setting_player_name());
    } else {
        scenario_restore_campaign_player_name();
    }
    initialize_saved_game();
    city_data_init_campaign_mission();
    return 1;
}
function start_scenario(scenario_name: number, scenario_file: string) {
    let mission: number = scenario_campaign_mission();
    let rank: number = scenario_campaign_rank();
    map_bookmarks_clear();
    if (scenario_is_custom()) {
        if (!load_custom_scenario(scenario_name, scenario_file)) {
            return 0;
        }
        scenario_set_player_name(setting_player_name());
    } else {
        if (!load_campaign_mission(mission)) {
            return 0;
        }
    }
    scenario_set_campaign_mission(mission);
    scenario_set_campaign_rank(rank);
    if (scenario_is_tutorial_1()) {
        setting_set_personal_savings_for_mission(0, 0);
    }
    scenario_settings_init_mission();
    city_emperor_init_scenario(rank);
    tutorial_init();
    building_menu_update();
    city_message_init_scenario();
    return 1;
}
function get_scenario_filename(scenario_name: number, decomposed: number) {
    let filename: char[];
    encoding_to_utf8(scenario_name, filename, FILE_NAME_MAX, decomposed);
    if (!file_has_extension(filename, "map")) {
        file_append_extension(filename, "map");
    }
    return filename;
}
export function game_file_start_scenario_by_name(scenario_name: number) {
    if (start_scenario(scenario_name, get_scenario_filename(scenario_name, 0))) {
        return 1;
    } else {
        return start_scenario(scenario_name, get_scenario_filename(scenario_name, 1));
    }
}
export function game_file_start_scenario(scenario_file: string) {
    let scenario_name: number[];
    encoding_from_utf8(scenario_file, scenario_name, FILE_NAME_MAX);
    file_remove_extension(scenario_name);
    return start_scenario(scenario_name, scenario_file);
}
export function game_file_load_scenario_data(scenario_file: string) {
    if (!game_file_io_read_scenario(scenario_file)) {
        return 0;
    }
    trade_prices_reset();
    load_empire_data(1, scenario_empire_id());
    city_view_reset_orientation();
    return 1;
}
export function game_file_load_saved_game(filename: char) {
    if (!game_file_io_read_saved_game(filename, 0)) {
        return 0;
    }
    initialize_saved_game();
    building_storage_reset_building_ids();
    sound_music_update(1);
    return 1;
}
export function game_file_write_saved_game(filename: char) {
    return game_file_io_write_saved_game(filename);
}
export function game_file_delete_saved_game(filename: char) {
    return game_file_io_delete_saved_game(filename);
}
export function game_file_write_mission_saved_game() {
    let rank: number = scenario_campaign_rank();
    if (rank < 0) {
        rank = 0;
    } else if (rank > 11) {
        rank = 11;
    }
    let filename: char = MISSION_SAVED_GAMES[rank];
    let localized_filename: char[];
    if (locale_translate_rank_autosaves()) {
        encoding_to_utf8(lang_get_string(32, rank), localized_filename, FILE_NAME_MAX,
            encoding_system_uses_decomposed());
        strcat(localized_filename, ".sav");
        filename = localized_filename;
    }
    if (city_mission_should_save_start() && !file_exists(filename, NOT_LOCALIZED)) {
        game_file_io_write_saved_game(filename);
    }
}
