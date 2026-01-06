import { BLOCK_SIZE } from 'graphics/panel';
import { building_type } from 'building/type';
import BUILDING_NONE = building_type.BUILDING_NONE;
import BUILDING_AMPHITHEATER = building_type.BUILDING_AMPHITHEATER;
import BUILDING_THEATER = building_type.BUILDING_THEATER;
import BUILDING_HIPPODROME = building_type.BUILDING_HIPPODROME;
import BUILDING_COLOSSEUM = building_type.BUILDING_COLOSSEUM;
import BUILDING_GLADIATOR_SCHOOL = building_type.BUILDING_GLADIATOR_SCHOOL;
import BUILDING_LION_HOUSE = building_type.BUILDING_LION_HOUSE;
import BUILDING_ACTOR_COLONY = building_type.BUILDING_ACTOR_COLONY;
import BUILDING_CHARIOT_MAKER = building_type.BUILDING_CHARIOT_MAKER;
import BUILDING_SMALL_STATUE = building_type.BUILDING_SMALL_STATUE;
import BUILDING_MEDIUM_STATUE = building_type.BUILDING_MEDIUM_STATUE;
import BUILDING_LARGE_STATUE = building_type.BUILDING_LARGE_STATUE;
import BUILDING_DOCTOR = building_type.BUILDING_DOCTOR;
import BUILDING_HOSPITAL = building_type.BUILDING_HOSPITAL;
import BUILDING_BATHHOUSE = building_type.BUILDING_BATHHOUSE;
import BUILDING_BARBER = building_type.BUILDING_BARBER;
import BUILDING_SCHOOL = building_type.BUILDING_SCHOOL;
import BUILDING_ACADEMY = building_type.BUILDING_ACADEMY;
import BUILDING_LIBRARY = building_type.BUILDING_LIBRARY;
import BUILDING_FORT_GROUND = building_type.BUILDING_FORT_GROUND;
import BUILDING_PREFECTURE = building_type.BUILDING_PREFECTURE;
import BUILDING_TRIUMPHAL_ARCH = building_type.BUILDING_TRIUMPHAL_ARCH;
import BUILDING_FORT = building_type.BUILDING_FORT;
import BUILDING_GATEHOUSE = building_type.BUILDING_GATEHOUSE;
import BUILDING_TOWER = building_type.BUILDING_TOWER;
import BUILDING_SMALL_TEMPLE_CERES = building_type.BUILDING_SMALL_TEMPLE_CERES;
import BUILDING_SMALL_TEMPLE_NEPTUNE = building_type.BUILDING_SMALL_TEMPLE_NEPTUNE;
import BUILDING_SMALL_TEMPLE_MERCURY = building_type.BUILDING_SMALL_TEMPLE_MERCURY;
import BUILDING_SMALL_TEMPLE_MARS = building_type.BUILDING_SMALL_TEMPLE_MARS;
import BUILDING_SMALL_TEMPLE_VENUS = building_type.BUILDING_SMALL_TEMPLE_VENUS;
import BUILDING_LARGE_TEMPLE_CERES = building_type.BUILDING_LARGE_TEMPLE_CERES;
import BUILDING_LARGE_TEMPLE_NEPTUNE = building_type.BUILDING_LARGE_TEMPLE_NEPTUNE;
import BUILDING_LARGE_TEMPLE_MERCURY = building_type.BUILDING_LARGE_TEMPLE_MERCURY;
import BUILDING_LARGE_TEMPLE_MARS = building_type.BUILDING_LARGE_TEMPLE_MARS;
import BUILDING_LARGE_TEMPLE_VENUS = building_type.BUILDING_LARGE_TEMPLE_VENUS;
import BUILDING_MARKET = building_type.BUILDING_MARKET;
import BUILDING_GRANARY = building_type.BUILDING_GRANARY;
import BUILDING_WAREHOUSE = building_type.BUILDING_WAREHOUSE;
import BUILDING_WAREHOUSE_SPACE = building_type.BUILDING_WAREHOUSE_SPACE;
import BUILDING_SHIPYARD = building_type.BUILDING_SHIPYARD;
import BUILDING_DOCK = building_type.BUILDING_DOCK;
import BUILDING_WHARF = building_type.BUILDING_WHARF;
import BUILDING_GOVERNORS_HOUSE = building_type.BUILDING_GOVERNORS_HOUSE;
import BUILDING_GOVERNORS_VILLA = building_type.BUILDING_GOVERNORS_VILLA;
import BUILDING_GOVERNORS_PALACE = building_type.BUILDING_GOVERNORS_PALACE;
import BUILDING_MISSION_POST = building_type.BUILDING_MISSION_POST;
import BUILDING_ENGINEERS_POST = building_type.BUILDING_ENGINEERS_POST;
import BUILDING_SENATE_1_UNUSED = building_type.BUILDING_SENATE_1_UNUSED;
import BUILDING_SENATE = building_type.BUILDING_SENATE;
import BUILDING_FORUM = building_type.BUILDING_FORUM;
import BUILDING_FORUM_2_UNUSED = building_type.BUILDING_FORUM_2_UNUSED;
import BUILDING_NATIVE_HUT = building_type.BUILDING_NATIVE_HUT;
import BUILDING_NATIVE_MEETING = building_type.BUILDING_NATIVE_MEETING;
import BUILDING_RESERVOIR = building_type.BUILDING_RESERVOIR;
import BUILDING_FOUNTAIN = building_type.BUILDING_FOUNTAIN;
import BUILDING_WELL = building_type.BUILDING_WELL;
import BUILDING_NATIVE_CROPS = building_type.BUILDING_NATIVE_CROPS;
import BUILDING_MILITARY_ACADEMY = building_type.BUILDING_MILITARY_ACADEMY;
import BUILDING_BARRACKS = building_type.BUILDING_BARRACKS;
import BUILDING_ORACLE = building_type.BUILDING_ORACLE;
import BUILDING_BURNING_RUIN = building_type.BUILDING_BURNING_RUIN;
import BUILDING_WHEAT_FARM = building_type.BUILDING_WHEAT_FARM;
import BUILDING_VEGETABLE_FARM = building_type.BUILDING_VEGETABLE_FARM;
import BUILDING_FRUIT_FARM = building_type.BUILDING_FRUIT_FARM;
import BUILDING_OLIVE_FARM = building_type.BUILDING_OLIVE_FARM;
import BUILDING_VINES_FARM = building_type.BUILDING_VINES_FARM;
import BUILDING_PIG_FARM = building_type.BUILDING_PIG_FARM;
import BUILDING_MARBLE_QUARRY = building_type.BUILDING_MARBLE_QUARRY;
import BUILDING_IRON_MINE = building_type.BUILDING_IRON_MINE;
import BUILDING_TIMBER_YARD = building_type.BUILDING_TIMBER_YARD;
import BUILDING_CLAY_PIT = building_type.BUILDING_CLAY_PIT;
import BUILDING_WINE_WORKSHOP = building_type.BUILDING_WINE_WORKSHOP;
import BUILDING_OIL_WORKSHOP = building_type.BUILDING_OIL_WORKSHOP;
import BUILDING_WEAPONS_WORKSHOP = building_type.BUILDING_WEAPONS_WORKSHOP;
import BUILDING_FURNITURE_WORKSHOP = building_type.BUILDING_FURNITURE_WORKSHOP;
import BUILDING_POTTERY_WORKSHOP = building_type.BUILDING_POTTERY_WORKSHOP;
import { building_type } from 'building/type';
import { house_level } from 'building/type';;
import { buffer } from 'core/buffer';
import { building } from 'building/building';
import { building_get } from 'building/building';
import { building_main } from 'building/building';
import { building_is_house } from 'building/building';
import { map_point } from 'map/point';
import { map_tile } from 'map/point';
import { building_barracks_has_tower_sentry_request } from 'building/barracks';
import { building_house_determine_evolve_text } from 'building/house_evolution';
import { building_house_determine_worst_desirability_building } from 'building/house_evolution';
import { model_building } from 'building/model';
import { model_house } from 'building/model';
import { model_get_building } from 'building/model';
import { building_warehouse_get_space_info } from 'building/warehouse';
import { city_map_entry_flag } from 'city/map';
import { city_map_exit_flag } from 'city/map';
import { advisor_type } from 'city/constants';
import ADVISOR_RATINGS = advisor_type.ADVISOR_RATINGS;
import { advisor_type } from 'city/constants';
import { resource_trade_status } from 'city/constants';
import { resource_type } from 'game/resource';
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
import { resource_type } from 'game/resource';
import { workshop_type } from 'game/resource';
import { resource_image_type } from 'game/resource';
import { resource_list } from 'city/resource';
import { city_resource_determine_available } from 'city/resource';
import { view_tile } from 'city/view';
import { map_callback } from 'city/view';
import { city_view_get_viewport } from 'city/view';
import { direction_type } from 'core/direction';
import { calc_percentage } from 'core/calc';
import { group_terrain } from 'core/image_group';
import GROUP_BUILDING_AQUEDUCT = group_terrain.GROUP_BUILDING_AQUEDUCT;
import GROUP_CONTEXT_ICONS = group_terrain.GROUP_CONTEXT_ICONS;
import GROUP_MESSAGE_ADVISOR_BUTTONS = group_terrain.GROUP_MESSAGE_ADVISOR_BUTTONS;
import { figure_action } from 'figure/action';
import FIGURE_ACTION_149_CORPSE = figure_action.FIGURE_ACTION_149_CORPSE;
import { figure_type } from 'figure/type';
import FIGURE_NONE = figure_type.FIGURE_NONE;
import FIGURE_EXPLOSION = figure_type.FIGURE_EXPLOSION;
import FIGURE_FORT_LEGIONARY = figure_type.FIGURE_FORT_LEGIONARY;
import FIGURE_FORT_STANDARD = figure_type.FIGURE_FORT_STANDARD;
import FIGURE_MAP_FLAG = figure_type.FIGURE_MAP_FLAG;
import FIGURE_FLOTSAM = figure_type.FIGURE_FLOTSAM;
import FIGURE_ARROW = figure_type.FIGURE_ARROW;
import FIGURE_JAVELIN = figure_type.FIGURE_JAVELIN;
import FIGURE_BOLT = figure_type.FIGURE_BOLT;
import FIGURE_BALLISTA = figure_type.FIGURE_BALLISTA;
import FIGURE_CREATURE = figure_type.FIGURE_CREATURE;
import FIGURE_FISH_GULLS = figure_type.FIGURE_FISH_GULLS;
import FIGURE_SPEAR = figure_type.FIGURE_SPEAR;
import FIGURE_HIPPODROME_HORSES = figure_type.FIGURE_HIPPODROME_HORSES;
import { figure_type } from 'figure/type';
import { figure_state } from 'figure/type';
import FIGURE_STATE_DEAD = figure_state.FIGURE_STATE_DEAD;
import { figure } from 'figure/figure';
import { figure_get } from 'figure/figure';
import { figure_is_legion } from 'figure/figure';
import { formation_state } from 'figure/formation';
import { formation } from 'figure/formation';
import { formation_get } from 'figure/formation';
import { formation_legion_recruits_needed } from 'figure/formation_legion';
import { figure_phrase_determine } from 'figure/phrase';
import { language_type } from 'core/locale';
import { encoding_type } from 'core/encoding';
import { color_t } from 'graphics/color';
import { image } from 'core/image';
import { image_group } from 'core/image';
import { font_t } from 'graphics/font';
import { font_definition } from 'graphics/font';
import { button_none } from 'graphics/button';
import { time_millis } from 'core/time';
import { touch_coords } from 'input/touch';
import { touch_mode } from 'input/touch';
import { touch } from 'input/touch';
import { mouse_button } from 'input/mouse';
import { scroll_state } from 'input/mouse';
import { mouse } from 'input/mouse';
import { mouse_get } from 'input/mouse';
import { ib } from 'graphics/image_button';
import IB_NORMAL = ib.IB_NORMAL;
import { image_button } from 'graphics/image_button';
import { image_buttons_draw } from 'graphics/image_button';
import { image_buttons_handle_mouse } from 'graphics/image_button';
import { screen_width } from 'graphics/screen';
import { screen_height } from 'graphics/screen';
import { tooltip_type } from 'graphics/tooltip';
import TOOLTIP_BUTTON = tooltip_type.TOOLTIP_BUTTON;
import { tooltip_type } from 'graphics/tooltip';
import { tooltip_extra_text_type } from 'graphics/tooltip';
import { tooltip_context } from 'graphics/tooltip';
import { key_type } from 'input/keys';
import { key_modifier_type } from 'input/keys';
import { hotkey_action } from 'core/hotkey_config';
import { hotkey_mapping } from 'core/hotkey_config';
import { hotkeys } from 'input/hotkey';
import { window_id } from 'graphics/window';
import WINDOW_BUILDING_INFO = window_id.WINDOW_BUILDING_INFO;
import { window_id } from 'graphics/window';
import { window_type } from 'graphics/window';
import { window_invalidate } from 'graphics/window';
import { window_show } from 'graphics/window';
import { input_go_back_requested } from 'input/input';
import { map_aqueduct_at } from 'map/aqueduct';
import { map_building_at } from 'map/building';
import { map_rubble_building_type } from 'map/building';
import { map_figure_at } from 'map/figure';
import { map_grid_delta, GRID } from 'map/grid';
import GRID_SIZE = GRID.GRID_SIZE;
import { map_image_at } from 'map/image';
import { map_property_is_plaza_or_earthquake } from 'map/property';
import { map_has_road_access } from 'map/road_access';
import { map_has_road_access_hippodrome } from 'map/road_access';
import { map_has_road_access_granary } from 'map/road_access';
import { map_sprite_bridge_at } from 'map/sprite';
import { terrain } from 'map/terrain';
import TERRAIN_TREE = terrain.TERRAIN_TREE;
import TERRAIN_ROCK = terrain.TERRAIN_ROCK;
import TERRAIN_WATER = terrain.TERRAIN_WATER;
import TERRAIN_BUILDING = terrain.TERRAIN_BUILDING;
import TERRAIN_SHRUB = terrain.TERRAIN_SHRUB;
import TERRAIN_GARDEN = terrain.TERRAIN_GARDEN;
import TERRAIN_ROAD = terrain.TERRAIN_ROAD;
import TERRAIN_RESERVOIR_RANGE = terrain.TERRAIN_RESERVOIR_RANGE;
import TERRAIN_AQUEDUCT = terrain.TERRAIN_AQUEDUCT;
import TERRAIN_RUBBLE = terrain.TERRAIN_RUBBLE;
import TERRAIN_WALL = terrain.TERRAIN_WALL;
import TERRAIN_GATEHOUSE = terrain.TERRAIN_GATEHOUSE;
import { map_terrain_is } from 'map/terrain';
import { map_terrain_get } from 'map/terrain';
import { window_advisors_show_advisor } from 'window/advisors';
import { window_city_draw_all } from 'window/city';
import { window_city_draw_panels } from 'window/city';
import { window_city_draw } from 'window/city';
import { window_city_show } from 'window/city';
import { message_dialog } from 'window/message_dialog';
import MESSAGE_DIALOG_HELP = message_dialog.MESSAGE_DIALOG_HELP;
import { window_message_dialog_show } from 'window/message_dialog';
let MIN_Y_POSITION: number;
let MARGIN_POSITION: number;
import { building_info_type } from 'window/building/common';
import BUILDING_INFO_NONE = building_info_type.BUILDING_INFO_NONE;
import BUILDING_INFO_TERRAIN = building_info_type.BUILDING_INFO_TERRAIN;
import BUILDING_INFO_BUILDING = building_info_type.BUILDING_INFO_BUILDING;
import BUILDING_INFO_LEGION = building_info_type.BUILDING_INFO_LEGION;
import { building_info_type } from 'window/building/common';
import { terrain_info_type } from 'window/building/common';
import TERRAIN_INFO_TREE = terrain_info_type.TERRAIN_INFO_TREE;
import TERRAIN_INFO_ROCK = terrain_info_type.TERRAIN_INFO_ROCK;
import TERRAIN_INFO_WATER = terrain_info_type.TERRAIN_INFO_WATER;
import TERRAIN_INFO_SHRUB = terrain_info_type.TERRAIN_INFO_SHRUB;
import TERRAIN_INFO_EARTHQUAKE = terrain_info_type.TERRAIN_INFO_EARTHQUAKE;
import TERRAIN_INFO_ROAD = terrain_info_type.TERRAIN_INFO_ROAD;
import TERRAIN_INFO_AQUEDUCT = terrain_info_type.TERRAIN_INFO_AQUEDUCT;
import TERRAIN_INFO_RUBBLE = terrain_info_type.TERRAIN_INFO_RUBBLE;
import TERRAIN_INFO_WALL = terrain_info_type.TERRAIN_INFO_WALL;
import TERRAIN_INFO_EMPTY = terrain_info_type.TERRAIN_INFO_EMPTY;
import TERRAIN_INFO_BRIDGE = terrain_info_type.TERRAIN_INFO_BRIDGE;
import TERRAIN_INFO_GARDEN = terrain_info_type.TERRAIN_INFO_GARDEN;
import TERRAIN_INFO_PLAZA = terrain_info_type.TERRAIN_INFO_PLAZA;
import TERRAIN_INFO_ENTRY_FLAG = terrain_info_type.TERRAIN_INFO_ENTRY_FLAG;
import TERRAIN_INFO_EXIT_FLAG = terrain_info_type.TERRAIN_INFO_EXIT_FLAG;
import { terrain_info_type } from 'window/building/common';
import { building_info_context } from 'window/building/common';
import { window_building_set_possible_position } from 'window/building/common';
import { window_building_get_vertical_offset } from 'window/building/common';
import { window_building_draw_clinic } from 'window/building/culture';
import { window_building_draw_hospital } from 'window/building/culture';
import { window_building_draw_bathhouse } from 'window/building/culture';
import { window_building_draw_barber } from 'window/building/culture';
import { window_building_draw_school } from 'window/building/culture';
import { window_building_draw_academy } from 'window/building/culture';
import { window_building_draw_library } from 'window/building/culture';
import { window_building_draw_temple_ceres } from 'window/building/culture';
import { window_building_draw_temple_neptune } from 'window/building/culture';
import { window_building_draw_temple_mercury } from 'window/building/culture';
import { window_building_draw_temple_mars } from 'window/building/culture';
import { window_building_draw_temple_venus } from 'window/building/culture';
import { window_building_draw_oracle } from 'window/building/culture';
import { window_building_draw_theater } from 'window/building/culture';
import { window_building_draw_amphitheater } from 'window/building/culture';
import { window_building_draw_colosseum } from 'window/building/culture';
import { window_building_draw_hippodrome } from 'window/building/culture';
import { window_building_draw_actor_colony } from 'window/building/culture';
import { window_building_draw_gladiator_school } from 'window/building/culture';
import { window_building_draw_lion_house } from 'window/building/culture';
import { window_building_draw_chariot_maker } from 'window/building/culture';
import { window_building_draw_dock } from 'window/building/distribution';
import { window_building_draw_market } from 'window/building/distribution';
import { window_building_draw_granary } from 'window/building/distribution';
import { window_building_draw_granary_foreground } from 'window/building/distribution';
import { window_building_draw_granary_orders } from 'window/building/distribution';
import { window_building_draw_granary_orders_foreground } from 'window/building/distribution';
import { window_building_handle_mouse_granary } from 'window/building/distribution';
import { window_building_handle_mouse_granary_orders } from 'window/building/distribution';
import { window_building_get_tooltip_granary_orders } from 'window/building/distribution';
import { window_building_draw_warehouse } from 'window/building/distribution';
import { window_building_draw_warehouse_foreground } from 'window/building/distribution';
import { window_building_draw_warehouse_orders } from 'window/building/distribution';
import { window_building_draw_warehouse_orders_foreground } from 'window/building/distribution';
import { window_building_handle_mouse_warehouse } from 'window/building/distribution';
import { window_building_handle_mouse_warehouse_orders } from 'window/building/distribution';
import { window_building_get_tooltip_warehouse_orders } from 'window/building/distribution';
import { window_building_handle_mouse_figure_list } from 'window/building/figures';
import { window_building_draw_forum } from 'window/building/government';
import { window_building_draw_senate } from 'window/building/government';
import { window_building_draw_governor_home } from 'window/building/government';
import { window_building_draw_statue } from 'window/building/government';
import { window_building_draw_triumphal_arch } from 'window/building/government';
import { window_building_draw_house } from 'window/building/house';
import { window_building_draw_wheat_farm } from 'window/building/industry';
import { window_building_draw_vegetable_farm } from 'window/building/industry';
import { window_building_draw_fruit_farm } from 'window/building/industry';
import { window_building_draw_olive_farm } from 'window/building/industry';
import { window_building_draw_vines_farm } from 'window/building/industry';
import { window_building_draw_pig_farm } from 'window/building/industry';
import { window_building_draw_marble_quarry } from 'window/building/industry';
import { window_building_draw_iron_mine } from 'window/building/industry';
import { window_building_draw_timber_yard } from 'window/building/industry';
import { window_building_draw_clay_pit } from 'window/building/industry';
import { window_building_draw_wine_workshop } from 'window/building/industry';
import { window_building_draw_oil_workshop } from 'window/building/industry';
import { window_building_draw_weapons_workshop } from 'window/building/industry';
import { window_building_draw_furniture_workshop } from 'window/building/industry';
import { window_building_draw_pottery_workshop } from 'window/building/industry';
import { window_building_draw_shipyard } from 'window/building/industry';
import { window_building_draw_wharf } from 'window/building/industry';
import { window_building_draw_gatehouse } from 'window/building/military';
import { window_building_draw_tower } from 'window/building/military';
import { window_building_draw_barracks } from 'window/building/military';
import { window_building_draw_military_academy } from 'window/building/military';
import { window_building_draw_fort } from 'window/building/military';
import { window_building_draw_legion_info } from 'window/building/military';
import { window_building_draw_legion_info_foreground } from 'window/building/military';
import { window_building_handle_mouse_legion_info } from 'window/building/military';
import { window_building_get_legion_info_tooltip_text } from 'window/building/military';
import { window_building_draw_no_people } from 'window/building/terrain';
import { window_building_draw_terrain } from 'window/building/terrain';
import { window_building_draw_engineers_post } from 'window/building/utility';
import { window_building_draw_prefect } from 'window/building/utility';
import { window_building_draw_burning_ruin } from 'window/building/utility';
import { window_building_draw_reservoir } from 'window/building/utility';
import { window_building_draw_fountain } from 'window/building/utility';
import { window_building_draw_well } from 'window/building/utility';
import { window_building_draw_mission_post } from 'window/building/utility';
import { window_building_draw_native_hut } from 'window/building/utility';
import { window_building_draw_native_meeting } from 'window/building/utility';
import { window_building_draw_native_crops } from 'window/building/utility';
let image_buttons_help_close: image_button[] = [
    new image_button(14, 0, 27, 27, IB_NORMAL, GROUP_CONTEXT_ICONS, 0, button_help, button_none, 0, 0, 1),
    new image_button(424, 3, 24, 24, IB_NORMAL, GROUP_CONTEXT_ICONS, 4, button_close, button_none, 0, 0, 1)
];
let image_buttons_advisor: image_button[] = [
    new image_button(350, -38, 28, 28, IB_NORMAL, GROUP_MESSAGE_ADVISOR_BUTTONS, 9, button_advisor, button_none, ADVISOR_RATINGS, 0, 1)
];
let context: building_info_context;
let focus_image_button_id: number;
function get_height_id() {
    if (context.type == BUILDING_INFO_TERRAIN) {
        switch (context.terrain_type) {
            case TERRAIN_INFO_AQUEDUCT:
                return 4;
            case TERRAIN_INFO_RUBBLE:
            case TERRAIN_INFO_WALL:
            case TERRAIN_INFO_GARDEN:
                return 1;
            default:
                return 5
        }
    } else if (context.type == BUILDING_INFO_BUILDING) {
        let b: building = building_get(context.building_id);
        if (building_is_house(b.type) && b.house_population <= 0) {
            return 5;
        }
        switch (b.type) {
            case BUILDING_SMALL_TEMPLE_CERES:
            case BUILDING_SMALL_TEMPLE_NEPTUNE:
            case BUILDING_SMALL_TEMPLE_MERCURY:
            case BUILDING_SMALL_TEMPLE_MARS:
            case BUILDING_SMALL_TEMPLE_VENUS:
            case BUILDING_LARGE_TEMPLE_CERES:
            case BUILDING_LARGE_TEMPLE_NEPTUNE:
            case BUILDING_LARGE_TEMPLE_MERCURY:
            case BUILDING_LARGE_TEMPLE_MARS:
            case BUILDING_LARGE_TEMPLE_VENUS:
            case BUILDING_ORACLE:
            case BUILDING_SMALL_STATUE:
            case BUILDING_MEDIUM_STATUE:
            case BUILDING_LARGE_STATUE:
            case BUILDING_GLADIATOR_SCHOOL:
            case BUILDING_LION_HOUSE:
            case BUILDING_ACTOR_COLONY:
            case BUILDING_CHARIOT_MAKER:
            case BUILDING_DOCTOR:
            case BUILDING_HOSPITAL:
            case BUILDING_BATHHOUSE:
            case BUILDING_BARBER:
            case BUILDING_BURNING_RUIN:
            case BUILDING_RESERVOIR:
            case BUILDING_NATIVE_HUT:
            case BUILDING_NATIVE_MEETING:
            case BUILDING_NATIVE_CROPS:
            case BUILDING_MISSION_POST:
            case BUILDING_PREFECTURE:
            case BUILDING_ENGINEERS_POST:
            case BUILDING_SCHOOL:
            case BUILDING_ACADEMY:
            case BUILDING_LIBRARY:
            case BUILDING_GATEHOUSE:
            case BUILDING_TOWER:
            case BUILDING_FORT:
            case BUILDING_MILITARY_ACADEMY:
            case BUILDING_BARRACKS:
            case BUILDING_MARKET:
            case BUILDING_GRANARY:
            case BUILDING_SHIPYARD:
            case BUILDING_DOCK:
            case BUILDING_WHARF:
            case BUILDING_GOVERNORS_HOUSE:
            case BUILDING_GOVERNORS_VILLA:
            case BUILDING_GOVERNORS_PALACE:
            case BUILDING_FORUM:
            case BUILDING_FORUM_2_UNUSED:
            case BUILDING_WINE_WORKSHOP:
            case BUILDING_OIL_WORKSHOP:
            case BUILDING_WEAPONS_WORKSHOP:
            case BUILDING_FURNITURE_WORKSHOP:
            case BUILDING_POTTERY_WORKSHOP:
                return 1;
            case BUILDING_THEATER:
            case BUILDING_HIPPODROME:
            case BUILDING_COLOSSEUM:
            case BUILDING_SENATE_1_UNUSED:
            case BUILDING_SENATE:
            case BUILDING_FOUNTAIN:
                return 2;
            case BUILDING_AMPHITHEATER:
                return 3;
            case BUILDING_WELL:
                return 4;
            default:
                return 0
        }
    }
    return 0;
}
function center_in_city(element_width_pixels: number) {
    let x: number
    let y: number
    let width: number
    let height: number;
    city_view_get_viewport(x, y, width, height);
    let margin: number = (width - element_width_pixels) / 2;
    return x + margin;
}
function init(grid_offset: number) {
    context.can_play_sound = 1;
    context.storage_show_special_orders = 0;
    context.can_go_to_advisor = 0;
    context.building_id = map_building_at(grid_offset);
    context.rubble_building_type = map_rubble_building_type(grid_offset);
    context.has_reservoir_pipes = map_terrain_is(grid_offset, TERRAIN_RESERVOIR_RANGE);
    context.aqueduct_has_water = map_aqueduct_at(grid_offset)
        && map_image_at(grid_offset) - image_group(GROUP_BUILDING_AQUEDUCT) < 15;
    city_resource_determine_available();
    context.type = BUILDING_INFO_TERRAIN;
    context.figure.drawn = 0;
    if (!context.building_id && map_sprite_bridge_at(grid_offset) > 0) {
        if (map_terrain_is(grid_offset, TERRAIN_WATER)) {
            context.terrain_type = TERRAIN_INFO_BRIDGE;
        } else {
            context.terrain_type = TERRAIN_INFO_EMPTY;
        }
    } else if (map_property_is_plaza_or_earthquake(grid_offset)) {
        if (map_terrain_is(grid_offset, TERRAIN_ROAD)) {
            context.terrain_type = TERRAIN_INFO_PLAZA;
        }
        if (map_terrain_is(grid_offset, TERRAIN_ROCK)) {
            context.terrain_type = TERRAIN_INFO_EARTHQUAKE;
        }
    } else if (map_terrain_is(grid_offset, TERRAIN_TREE)) {
        context.terrain_type = TERRAIN_INFO_TREE;
    } else if (map_terrain_is(grid_offset, TERRAIN_ROCK)) {
        if (grid_offset == city_map_entry_flag().grid_offset) {
            context.terrain_type = TERRAIN_INFO_ENTRY_FLAG;
        } else if (grid_offset == city_map_exit_flag().grid_offset) {
            context.terrain_type = TERRAIN_INFO_EXIT_FLAG;
        } else {
            context.terrain_type = TERRAIN_INFO_ROCK;
        }
    } else if ((map_terrain_get(grid_offset) & (TERRAIN_WATER | TERRAIN_BUILDING)) == TERRAIN_WATER) {
        context.terrain_type = TERRAIN_INFO_WATER;
    } else if (map_terrain_is(grid_offset, TERRAIN_SHRUB)) {
        context.terrain_type = TERRAIN_INFO_SHRUB;
    } else if (map_terrain_is(grid_offset, TERRAIN_GARDEN)) {
        context.terrain_type = TERRAIN_INFO_GARDEN;
    } else if ((map_terrain_get(grid_offset) & (TERRAIN_ROAD | TERRAIN_BUILDING)) == TERRAIN_ROAD) {
        context.terrain_type = TERRAIN_INFO_ROAD;
    } else if (map_terrain_is(grid_offset, TERRAIN_AQUEDUCT)) {
        context.terrain_type = TERRAIN_INFO_AQUEDUCT;
    } else if (map_terrain_is(grid_offset, TERRAIN_RUBBLE)) {
        context.terrain_type = TERRAIN_INFO_RUBBLE;
    } else if (map_terrain_is(grid_offset, TERRAIN_WALL)) {
        context.terrain_type = TERRAIN_INFO_WALL;
    } else if (!context.building_id) {
        context.terrain_type = TERRAIN_INFO_EMPTY;
    } else {
        let b: building = building_get(context.building_id);
        context.type = BUILDING_INFO_BUILDING;
        context.worker_percentage = calc_percentage(b.num_workers, model_get_building(b.type).laborers);
        switch (b.type) {
            case BUILDING_FORT_GROUND:
                context.building_id = b.prev_part_building_id;
            case BUILDING_FORT:
                context.formation_id = b.formation_id;
                break
            case BUILDING_WAREHOUSE_SPACE:
            case BUILDING_HIPPODROME:
                b = building_main(b);
                context.building_id = b.id;
                break
            case BUILDING_BARRACKS:
                context.barracks_soldiers_requested = formation_legion_recruits_needed();
                context.barracks_soldiers_requested += building_barracks_has_tower_sentry_request()
                break
            default:
                if (b.house_size) {
                    context.worst_desirability_building_id = building_house_determine_worst_desirability_building(b);
                    building_house_determine_evolve_text(b, context.worst_desirability_building_id);
                }
                break
        }
        context.has_road_access = 0;
        switch (b.type) {
            case BUILDING_GRANARY:
                if (map_has_road_access_granary(b.x, b.y, 0)) {
                    context.has_road_access = 1;
                }
                break
            case BUILDING_HIPPODROME:
                if (map_has_road_access_hippodrome(b.x, b.y, 0)) {
                    context.has_road_access = 1;
                }
                break
            case BUILDING_WAREHOUSE:
                if (map_has_road_access(b.x, b.y, 3, 0)) {
                    context.has_road_access = 1;
                }
                context.warehouse_space_text = building_warehouse_get_space_info(b);
                break
            default:
                if (map_has_road_access(b.x, b.y, b.size, 0)) {
                    context.has_road_access = 1;
                }
                break
        }
    }
    context.figure.selected_index = 0;
    context.figure.count = 0;
    for (let i: number = 0; i < 7; i++) {
        context.figure.figure_ids[i] = 0;
    }
    let FIGURE_OFFSETS: number[] = [
        map_grid_delta(0, 0), map_grid_delta(0, -1), map_grid_delta(0, 1), map_grid_delta(1, 0), map_grid_delta(-1, 0),
        map_grid_delta(-1, -1), map_grid_delta(1, -1), map_grid_delta(-1, 1), map_grid_delta(1, 1)
    ];
for (let i: number = 0; i < 9 && context.figure.count < 7; i++) {
    let figure_id: number = map_figure_at(grid_offset + FIGURE_OFFSETS[i]);
    while (figure_id > 0 && context.figure.count < 7) {
        let f: figure = figure_get(figure_id);
        if (f.state != FIGURE_STATE_DEAD &&
            f.action_state != FIGURE_ACTION_149_CORPSE) {
            switch (f.type) {
                case FIGURE_NONE:
                case FIGURE_EXPLOSION:
                case FIGURE_MAP_FLAG:
                case FIGURE_FLOTSAM:
                case FIGURE_ARROW:
                case FIGURE_JAVELIN:
                case FIGURE_BOLT:
                case FIGURE_BALLISTA:
                case FIGURE_CREATURE:
                case FIGURE_FISH_GULLS:
                case FIGURE_SPEAR:
                case FIGURE_HIPPODROME_HORSES:
                    break;
                default:
                    context.figure.figure_ids[context.figure.count++] = figure_id;
                    figure_phrase_determine(f);
                    break;
            }
        }
        figure_id = f.next_figure_id_on_same_tile;
    }
}
for (let i: number = 0; i < 7; i++) {
    let figure_id: number = context.figure.figure_ids[i];
    if (figure_id <= 0) {
        continue
    }
    let f: figure = figure_get(figure_id);
    if (f.type == FIGURE_FORT_STANDARD || figure_is_legion(f)) {
        context.type = BUILDING_INFO_LEGION;
        context.formation_id = f.formation_id;
        let m: formation = formation_get(context.formation_id);
        if (m.figure_type != FIGURE_FORT_LEGIONARY) {
            context.formation_types = 5;
        } else if (m.has_military_training) {
            context.formation_types = 4;
        } else {
            context.formation_types = 3;
        }
        break
    }
}
context.width_blocks = 29;
switch (get_height_id()) {
    case 1:
        context.height_blocks = 16;
        break
    case 2:
        context.height_blocks = 18;
        break
    case 3:
        context.height_blocks = 19;
        break
    case 4:
        context.height_blocks = 14;
        break
    case 5:
        context.height_blocks = 23;
        break
    default: context.height_blocks = 22
        break
}
let s_width: number = screen_width();
let s_height: number = screen_height();
context.x_offset = center_in_city(BLOCK_SIZE * context.width_blocks);
if (s_width >= 1024 && s_height >= 768) {
    context.x_offset = mouse_get().x;
    context.y_offset = mouse_get().y;
    window_building_set_possible_position(context.x_offset, context.y_offset,
        context.width_blocks, context.height_blocks);
} else if (s_height >= 600 && mouse_get().y <= (s_height - 24) / 2 + 24) {
    context.y_offset = s_height - BLOCK_SIZE * context.height_blocks - MARGIN_POSITION;
} else {
    context.y_offset = MIN_Y_POSITION;
}
}
function draw_background() {
    window_city_draw_panels();
    window_city_draw();
    if (context.type == BUILDING_INFO_NONE) {
        window_building_draw_no_people(context);
    } else if (context.type == BUILDING_INFO_TERRAIN) {
        window_building_draw_terrain(context);
    } else if (context.type == BUILDING_INFO_BUILDING) {
        let btype: number = building_get(context.building_id).type;
        if (building_is_house(btype)) {
            window_building_draw_house(context);
        } else if (btype == BUILDING_WHEAT_FARM) {
            window_building_draw_wheat_farm(context);
        } else if (btype == BUILDING_VEGETABLE_FARM) {
            window_building_draw_vegetable_farm(context);
        } else if (btype == BUILDING_FRUIT_FARM) {
            window_building_draw_fruit_farm(context);
        } else if (btype == BUILDING_OLIVE_FARM) {
            window_building_draw_olive_farm(context);
        } else if (btype == BUILDING_VINES_FARM) {
            window_building_draw_vines_farm(context);
        } else if (btype == BUILDING_PIG_FARM) {
            window_building_draw_pig_farm(context);
        } else if (btype == BUILDING_MARBLE_QUARRY) {
            window_building_draw_marble_quarry(context);
        } else if (btype == BUILDING_IRON_MINE) {
            window_building_draw_iron_mine(context);
        } else if (btype == BUILDING_TIMBER_YARD) {
            window_building_draw_timber_yard(context);
        } else if (btype == BUILDING_CLAY_PIT) {
            window_building_draw_clay_pit(context);
        } else if (btype == BUILDING_WINE_WORKSHOP) {
            window_building_draw_wine_workshop(context);
        } else if (btype == BUILDING_OIL_WORKSHOP) {
            window_building_draw_oil_workshop(context);
        } else if (btype == BUILDING_WEAPONS_WORKSHOP) {
            window_building_draw_weapons_workshop(context);
        } else if (btype == BUILDING_FURNITURE_WORKSHOP) {
            window_building_draw_furniture_workshop(context);
        } else if (btype == BUILDING_POTTERY_WORKSHOP) {
            window_building_draw_pottery_workshop(context);
        } else if (btype == BUILDING_MARKET) {
            window_building_draw_market(context);
        } else if (btype == BUILDING_GRANARY) {
            if (context.storage_show_special_orders) {
                window_building_draw_granary_orders(context);
            } else {
                window_building_draw_granary(context);
            }
        } else if (btype == BUILDING_WAREHOUSE) {
            if (context.storage_show_special_orders) {
                window_building_draw_warehouse_orders(context);
            } else {
                window_building_draw_warehouse(context);
            }
        } else if (btype == BUILDING_AMPHITHEATER) {
            window_building_draw_amphitheater(context);
        } else if (btype == BUILDING_THEATER) {
            window_building_draw_theater(context);
        } else if (btype == BUILDING_HIPPODROME) {
            window_building_draw_hippodrome(context);
        } else if (btype == BUILDING_COLOSSEUM) {
            window_building_draw_colosseum(context);
        } else if (btype == BUILDING_GLADIATOR_SCHOOL) {
            window_building_draw_gladiator_school(context);
        } else if (btype == BUILDING_LION_HOUSE) {
            window_building_draw_lion_house(context);
        } else if (btype == BUILDING_ACTOR_COLONY) {
            window_building_draw_actor_colony(context);
        } else if (btype == BUILDING_CHARIOT_MAKER) {
            window_building_draw_chariot_maker(context);
        } else if (btype == BUILDING_DOCTOR) {
            window_building_draw_clinic(context);
        } else if (btype == BUILDING_HOSPITAL) {
            window_building_draw_hospital(context);
        } else if (btype == BUILDING_BATHHOUSE) {
            window_building_draw_bathhouse(context);
        } else if (btype == BUILDING_BARBER) {
            window_building_draw_barber(context);
        } else if (btype == BUILDING_SCHOOL) {
            window_building_draw_school(context);
        } else if (btype == BUILDING_ACADEMY) {
            window_building_draw_academy(context);
        } else if (btype == BUILDING_LIBRARY) {
            window_building_draw_library(context);
        } else if (btype == BUILDING_SMALL_TEMPLE_CERES || btype == BUILDING_LARGE_TEMPLE_CERES) {
            window_building_draw_temple_ceres(context);
        } else if (btype == BUILDING_SMALL_TEMPLE_NEPTUNE || btype == BUILDING_LARGE_TEMPLE_NEPTUNE) {
            window_building_draw_temple_neptune(context);
        } else if (btype == BUILDING_SMALL_TEMPLE_MERCURY || btype == BUILDING_LARGE_TEMPLE_MERCURY) {
            window_building_draw_temple_mercury(context);
        } else if (btype == BUILDING_SMALL_TEMPLE_MARS || btype == BUILDING_LARGE_TEMPLE_MARS) {
            window_building_draw_temple_mars(context);
        } else if (btype == BUILDING_SMALL_TEMPLE_VENUS || btype == BUILDING_LARGE_TEMPLE_VENUS) {
            window_building_draw_temple_venus(context);
        } else if (btype == BUILDING_ORACLE) {
            window_building_draw_oracle(context);
        } else if (btype == BUILDING_GOVERNORS_HOUSE
            || btype == BUILDING_GOVERNORS_VILLA
            || btype == BUILDING_GOVERNORS_PALACE) {
            window_building_draw_governor_home(context);
        } else if (btype == BUILDING_FORUM || btype == BUILDING_FORUM_2_UNUSED) {
            window_building_draw_forum(context);
        } else if (btype == BUILDING_SENATE_1_UNUSED || btype == BUILDING_SENATE) {
            window_building_draw_senate(context);
        } else if (btype == BUILDING_ENGINEERS_POST) {
            window_building_draw_engineers_post(context);
        } else if (btype == BUILDING_SHIPYARD) {
            window_building_draw_shipyard(context);
        } else if (btype == BUILDING_DOCK) {
            window_building_draw_dock(context);
        } else if (btype == BUILDING_WHARF) {
            window_building_draw_wharf(context);
        } else if (btype == BUILDING_RESERVOIR) {
            window_building_draw_reservoir(context);
        } else if (btype == BUILDING_FOUNTAIN) {
            window_building_draw_fountain(context);
        } else if (btype == BUILDING_WELL) {
            window_building_draw_well(context);
        } else if (btype == BUILDING_SMALL_STATUE
            || btype == BUILDING_MEDIUM_STATUE
            || btype == BUILDING_LARGE_STATUE) {
            window_building_draw_statue(context);
        } else if (btype == BUILDING_TRIUMPHAL_ARCH) {
            window_building_draw_triumphal_arch(context);
        } else if (btype == BUILDING_PREFECTURE) {
            window_building_draw_prefect(context);
        } else if (btype == BUILDING_GATEHOUSE) {
            window_building_draw_gatehouse(context);
        } else if (btype == BUILDING_TOWER) {
            window_building_draw_tower(context);
        } else if (btype == BUILDING_MILITARY_ACADEMY) {
            window_building_draw_military_academy(context);
        } else if (btype == BUILDING_BARRACKS) {
            window_building_draw_barracks(context);
        } else if (btype == BUILDING_FORT) {
            window_building_draw_fort(context);
        } else if (btype == BUILDING_BURNING_RUIN) {
            window_building_draw_burning_ruin(context);
        } else if (btype == BUILDING_NATIVE_HUT) {
            window_building_draw_native_hut(context);
        } else if (btype == BUILDING_NATIVE_MEETING) {
            window_building_draw_native_meeting(context);
        } else if (btype == BUILDING_NATIVE_CROPS) {
            window_building_draw_native_crops(context);
        } else if (btype == BUILDING_MISSION_POST) {
            window_building_draw_mission_post(context);
        }
    } else if (context.type == BUILDING_INFO_LEGION) {
        window_building_draw_legion_info(context);
    }
}
function draw_foreground() {
    if (context.type == BUILDING_INFO_BUILDING) {
        let btype: number = building_get(context.building_id).type;
        if (btype == BUILDING_GRANARY) {
            if (context.storage_show_special_orders) {
                window_building_draw_granary_orders_foreground(context);
            } else {
                window_building_draw_granary_foreground(context);
            }
        } else if (btype == BUILDING_WAREHOUSE) {
            if (context.storage_show_special_orders) {
                window_building_draw_warehouse_orders_foreground(context);
            } else {
                window_building_draw_warehouse_foreground(context);
            }
        }
    } else if (context.type == BUILDING_INFO_LEGION) {
        window_building_draw_legion_info_foreground(context);
    }
    if (context.storage_show_special_orders) {
        let y_offset: number = window_building_get_vertical_offset(context, 28);
        image_buttons_draw(context.x_offset, y_offset + 400, image_buttons_help_close, 2);
    } else {
        image_buttons_draw(context.x_offset, context.y_offset + BLOCK_SIZE * context.height_blocks - 40,
            image_buttons_help_close, 2);
    }
    if (context.can_go_to_advisor) {
        image_buttons_draw(context.x_offset, context.y_offset + BLOCK_SIZE * context.height_blocks - 40,
            image_buttons_advisor, 1);
    }
}
function handle_specific_building_info_mouse(m: mouse) {
    if (context.type == BUILDING_INFO_NONE) {
        return 0;
    }
    if (context.type == BUILDING_INFO_LEGION) {
        return window_building_handle_mouse_legion_info(m, context);
    } else if (context.figure.drawn) {
        return window_building_handle_mouse_figure_list(m, context);
    } else if (context.type == BUILDING_INFO_BUILDING) {
        let btype: number = building_get(context.building_id).type;
        if (btype == BUILDING_GRANARY) {
            if (context.storage_show_special_orders) {
                return window_building_handle_mouse_granary_orders(m, context);
            } else {
                return window_building_handle_mouse_granary(m, context);
            }
        } else if (btype == BUILDING_WAREHOUSE) {
            if (context.storage_show_special_orders) {
                window_building_handle_mouse_warehouse_orders(m, context);
            } else {
                window_building_handle_mouse_warehouse(m, context);
            }
        }
    }
    return 0;
}
function handle_input(m: mouse, h: hotkeys) {
    let handled: number = 0;
    if (context.storage_show_special_orders) {
        let y_offset: number = window_building_get_vertical_offset(context, 28);
        handled |= image_buttons_handle_mouse(m, context.x_offset, y_offset + 400,
            image_buttons_help_close, 2, focus_image_button_id)
    } else {
        handled |= image_buttons_handle_mouse(
            m, context.x_offset, context.y_offset + BLOCK_SIZE * context.height_blocks - 40,
            image_buttons_help_close, 2, focus_image_button_id)
    }
    if (context.can_go_to_advisor) {
        handled |= image_buttons_handle_mouse(
            m, context.x_offset, context.y_offset + BLOCK_SIZE * context.height_blocks - 40,
            image_buttons_advisor, 1, 0)
    }
    if (!handled) {
        handled |= handle_specific_building_info_mouse(m)
    }
    if (!handled && input_go_back_requested(m, h)) {
        window_city_show();
    }
}
function get_tooltip(c: tooltip_context) {
    let text_id: number = 0
    let group_id: number = 0;
    if (focus_image_button_id) {
        text_id = focus_image_button_id;
    } else if (context.type == BUILDING_INFO_LEGION) {
        text_id = window_building_get_legion_info_tooltip_text(context);
    } else if (context.type == BUILDING_INFO_BUILDING && context.storage_show_special_orders) {
        let btype: number = building_get(context.building_id).type;
        if (btype == BUILDING_GRANARY) {
            window_building_get_tooltip_granary_orders(group_id, text_id);
        } else if (btype == BUILDING_WAREHOUSE) {
            window_building_get_tooltip_warehouse_orders(group_id, text_id);
        }
    }
    if (text_id || group_id) {
        c.type = TOOLTIP_BUTTON;
        c.text_id = text_id;
        if (group_id) {
            c.text_group = group_id;
        }
    }
}
function button_help(param1: number, param2: number) {
    if (context.help_id > 0) {
        window_message_dialog_show(context.help_id, window_city_draw_all);
    } else {
        window_message_dialog_show(MESSAGE_DIALOG_HELP, window_city_draw_all);
    }
    window_invalidate();
}
function button_close(param1: number, param2: number) {
    if (context.storage_show_special_orders) {
        context.storage_show_special_orders = 0;
        window_invalidate();
    } else {
        window_city_show();
    }
}
function button_advisor(advisor: number, param2: number) {
    window_advisors_show_advisor(advisor);
}
export function window_building_info_show(grid_offset: number) {
    let window: window_type = new window_type(
        WINDOW_BUILDING_INFO,
        draw_background,
        draw_foreground,
        handle_input,
        get_tooltip
    );
    init(grid_offset);
    window_show(window);
}
export function window_building_info_get_building_type() {
    if (context.type == BUILDING_INFO_BUILDING) {
        return building_get(context.building_id).type;
    }
    return BUILDING_NONE;
}
export function window_building_info_show_storage_orders() {
    context.storage_show_special_orders = 1;
    window_invalidate();
}
