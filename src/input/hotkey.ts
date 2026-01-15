
import { building_type } from 'building/type';
import { advisor_type } from 'city/constants';
import { hotkey_action, hotkey_mapping } from 'core/hotkey_config';
import { setting_fullscreen } from 'game/settings';
import { overlay } from 'game/state';
import { system_center, system_exit, system_resize, system_set_fullscreen } from 'game/system';
import { graphics_save_screenshot } from 'graphics/screenshot';
import { video_stop } from 'graphics/video';
import { window_id, window_is } from 'graphics/window';
import { key_modifier_type, key_type } from 'input/keys';
import { scroll_arrow_down, scroll_arrow_left, scroll_arrow_right, scroll_arrow_up } from 'input/scroll';
import { window_hotkey_editor_key_pressed, window_hotkey_editor_key_released } from 'window/hotkey_editor';
import { popup_dialog_type, window_popup_dialog_show } from 'window/popup_dialog';
import KEY_TYPE_NONE = key_type.KEY_TYPE_NONE;
import KEY_TYPE_ENTER = key_type.KEY_TYPE_ENTER;
import KEY_TYPE_ESCAPE = key_type.KEY_TYPE_ESCAPE;
import HOTKEY_ARROW_UP = hotkey_action.HOTKEY_ARROW_UP;
import HOTKEY_ARROW_DOWN = hotkey_action.HOTKEY_ARROW_DOWN;
import HOTKEY_ARROW_LEFT = hotkey_action.HOTKEY_ARROW_LEFT;
import HOTKEY_ARROW_RIGHT = hotkey_action.HOTKEY_ARROW_RIGHT;
import HOTKEY_TOGGLE_PAUSE = hotkey_action.HOTKEY_TOGGLE_PAUSE;
import HOTKEY_TOGGLE_OVERLAY = hotkey_action.HOTKEY_TOGGLE_OVERLAY;
import HOTKEY_CYCLE_LEGION = hotkey_action.HOTKEY_CYCLE_LEGION;
import HOTKEY_INCREASE_GAME_SPEED = hotkey_action.HOTKEY_INCREASE_GAME_SPEED;
import HOTKEY_DECREASE_GAME_SPEED = hotkey_action.HOTKEY_DECREASE_GAME_SPEED;
import HOTKEY_ROTATE_MAP_LEFT = hotkey_action.HOTKEY_ROTATE_MAP_LEFT;
import HOTKEY_ROTATE_MAP_RIGHT = hotkey_action.HOTKEY_ROTATE_MAP_RIGHT;
import HOTKEY_BUILD_CLEAR_LAND = hotkey_action.HOTKEY_BUILD_CLEAR_LAND;
import HOTKEY_BUILD_VACANT_HOUSE = hotkey_action.HOTKEY_BUILD_VACANT_HOUSE;
import HOTKEY_BUILD_ROAD = hotkey_action.HOTKEY_BUILD_ROAD;
import HOTKEY_BUILD_PLAZA = hotkey_action.HOTKEY_BUILD_PLAZA;
import HOTKEY_BUILD_GARDENS = hotkey_action.HOTKEY_BUILD_GARDENS;
import HOTKEY_BUILD_PREFECTURE = hotkey_action.HOTKEY_BUILD_PREFECTURE;
import HOTKEY_BUILD_ENGINEERS_POST = hotkey_action.HOTKEY_BUILD_ENGINEERS_POST;
import HOTKEY_BUILD_DOCTOR = hotkey_action.HOTKEY_BUILD_DOCTOR;
import HOTKEY_BUILD_GRANARY = hotkey_action.HOTKEY_BUILD_GRANARY;
import HOTKEY_BUILD_WAREHOUSE = hotkey_action.HOTKEY_BUILD_WAREHOUSE;
import HOTKEY_BUILD_MARKET = hotkey_action.HOTKEY_BUILD_MARKET;
import HOTKEY_BUILD_WALL = hotkey_action.HOTKEY_BUILD_WALL;
import HOTKEY_BUILD_GATEHOUSE = hotkey_action.HOTKEY_BUILD_GATEHOUSE;
import HOTKEY_BUILD_RESERVOIR = hotkey_action.HOTKEY_BUILD_RESERVOIR;
import HOTKEY_BUILD_AQUEDUCT = hotkey_action.HOTKEY_BUILD_AQUEDUCT;
import HOTKEY_BUILD_FOUNTAIN = hotkey_action.HOTKEY_BUILD_FOUNTAIN;
import HOTKEY_SHOW_ADVISOR_LABOR = hotkey_action.HOTKEY_SHOW_ADVISOR_LABOR;
import HOTKEY_SHOW_ADVISOR_MILITARY = hotkey_action.HOTKEY_SHOW_ADVISOR_MILITARY;
import HOTKEY_SHOW_ADVISOR_IMPERIAL = hotkey_action.HOTKEY_SHOW_ADVISOR_IMPERIAL;
import HOTKEY_SHOW_ADVISOR_RATINGS = hotkey_action.HOTKEY_SHOW_ADVISOR_RATINGS;
import HOTKEY_SHOW_ADVISOR_TRADE = hotkey_action.HOTKEY_SHOW_ADVISOR_TRADE;
import HOTKEY_SHOW_ADVISOR_POPULATION = hotkey_action.HOTKEY_SHOW_ADVISOR_POPULATION;
import HOTKEY_SHOW_ADVISOR_HEALTH = hotkey_action.HOTKEY_SHOW_ADVISOR_HEALTH;
import HOTKEY_SHOW_ADVISOR_EDUCATION = hotkey_action.HOTKEY_SHOW_ADVISOR_EDUCATION;
import HOTKEY_SHOW_ADVISOR_ENTERTAINMENT = hotkey_action.HOTKEY_SHOW_ADVISOR_ENTERTAINMENT;
import HOTKEY_SHOW_ADVISOR_RELIGION = hotkey_action.HOTKEY_SHOW_ADVISOR_RELIGION;
import HOTKEY_SHOW_ADVISOR_FINANCIAL = hotkey_action.HOTKEY_SHOW_ADVISOR_FINANCIAL;
import HOTKEY_SHOW_ADVISOR_CHIEF = hotkey_action.HOTKEY_SHOW_ADVISOR_CHIEF;
import HOTKEY_SHOW_OVERLAY_WATER = hotkey_action.HOTKEY_SHOW_OVERLAY_WATER;
import HOTKEY_SHOW_OVERLAY_FIRE = hotkey_action.HOTKEY_SHOW_OVERLAY_FIRE;
import HOTKEY_SHOW_OVERLAY_DAMAGE = hotkey_action.HOTKEY_SHOW_OVERLAY_DAMAGE;
import HOTKEY_SHOW_OVERLAY_CRIME = hotkey_action.HOTKEY_SHOW_OVERLAY_CRIME;
import HOTKEY_SHOW_OVERLAY_PROBLEMS = hotkey_action.HOTKEY_SHOW_OVERLAY_PROBLEMS;
import HOTKEY_EDITOR_TOGGLE_BATTLE_INFO = hotkey_action.HOTKEY_EDITOR_TOGGLE_BATTLE_INFO;
import HOTKEY_LOAD_FILE = hotkey_action.HOTKEY_LOAD_FILE;
import HOTKEY_SAVE_FILE = hotkey_action.HOTKEY_SAVE_FILE;
import HOTKEY_GO_TO_BOOKMARK_1 = hotkey_action.HOTKEY_GO_TO_BOOKMARK_1;
import HOTKEY_GO_TO_BOOKMARK_2 = hotkey_action.HOTKEY_GO_TO_BOOKMARK_2;
import HOTKEY_GO_TO_BOOKMARK_3 = hotkey_action.HOTKEY_GO_TO_BOOKMARK_3;
import HOTKEY_GO_TO_BOOKMARK_4 = hotkey_action.HOTKEY_GO_TO_BOOKMARK_4;
import HOTKEY_SET_BOOKMARK_1 = hotkey_action.HOTKEY_SET_BOOKMARK_1;
import HOTKEY_SET_BOOKMARK_2 = hotkey_action.HOTKEY_SET_BOOKMARK_2;
import HOTKEY_SET_BOOKMARK_3 = hotkey_action.HOTKEY_SET_BOOKMARK_3;
import HOTKEY_SET_BOOKMARK_4 = hotkey_action.HOTKEY_SET_BOOKMARK_4;
import HOTKEY_CENTER_WINDOW = hotkey_action.HOTKEY_CENTER_WINDOW;
import HOTKEY_TOGGLE_FULLSCREEN = hotkey_action.HOTKEY_TOGGLE_FULLSCREEN;
import HOTKEY_RESIZE_TO_640 = hotkey_action.HOTKEY_RESIZE_TO_640;
import HOTKEY_RESIZE_TO_800 = hotkey_action.HOTKEY_RESIZE_TO_800;
import HOTKEY_RESIZE_TO_1024 = hotkey_action.HOTKEY_RESIZE_TO_1024;
import HOTKEY_SAVE_SCREENSHOT = hotkey_action.HOTKEY_SAVE_SCREENSHOT;
import HOTKEY_SAVE_CITY_SCREENSHOT = hotkey_action.HOTKEY_SAVE_CITY_SCREENSHOT;
import HOTKEY_BUILD_CLONE = hotkey_action.HOTKEY_BUILD_CLONE;
export class hotkeys {
    public enter_pressed: number = 0;
    public escape_pressed: number = 0;
    public cycle_legion: number = 0;
    public decrease_game_speed: number = 0;
    public increase_game_speed: number = 0;
    public rotate_map_left: number = 0;
    public rotate_map_right: number = 0;
    public show_advisor: number = 0;
    public show_overlay: number = 0;
    public toggle_overlay: number = 0;
    public toggle_pause: number = 0;
    public toggle_editor_battle_info: number = 0;
    public set_bookmark: number = 0;
    public go_to_bookmark: number = 0;
    public load_file: number = 0;
    public save_file: number = 0;
    public building: number = 0;
    public clone_building: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.enter_pressed = args[0]);
        args.length >= 2 && (this.escape_pressed = args[1]);
        args.length >= 3 && (this.cycle_legion = args[2]);
        args.length >= 4 && (this.decrease_game_speed = args[3]);
        args.length >= 5 && (this.increase_game_speed = args[4]);
        args.length >= 6 && (this.rotate_map_left = args[5]);
        args.length >= 7 && (this.rotate_map_right = args[6]);
        args.length >= 8 && (this.show_advisor = args[7]);
        args.length >= 9 && (this.show_overlay = args[8]);
        args.length >= 10 && (this.toggle_overlay = args[9]);
        args.length >= 11 && (this.toggle_pause = args[10]);
        args.length >= 12 && (this.toggle_editor_battle_info = args[11]);
        args.length >= 13 && (this.set_bookmark = args[12]);
        args.length >= 14 && (this.go_to_bookmark = args[13]);
        args.length >= 15 && (this.load_file = args[14]);
        args.length >= 16 && (this.save_file = args[15]);
        args.length >= 17 && (this.building = args[16]);
        args.length >= 18 && (this.clone_building = args[17]);
    }
}
import BUILDING_ROAD = building_type.BUILDING_ROAD;
import BUILDING_WALL = building_type.BUILDING_WALL;
import BUILDING_DRAGGABLE_RESERVOIR = building_type.BUILDING_DRAGGABLE_RESERVOIR;
import BUILDING_AQUEDUCT = building_type.BUILDING_AQUEDUCT;
import BUILDING_CLEAR_LAND = building_type.BUILDING_CLEAR_LAND;
import BUILDING_HOUSE_VACANT_LOT = building_type.BUILDING_HOUSE_VACANT_LOT;
import BUILDING_PLAZA = building_type.BUILDING_PLAZA;
import BUILDING_GARDENS = building_type.BUILDING_GARDENS;
import BUILDING_DOCTOR = building_type.BUILDING_DOCTOR;
import BUILDING_PREFECTURE = building_type.BUILDING_PREFECTURE;
import BUILDING_GATEHOUSE = building_type.BUILDING_GATEHOUSE;
import BUILDING_MARKET = building_type.BUILDING_MARKET;
import BUILDING_GRANARY = building_type.BUILDING_GRANARY;
import BUILDING_WAREHOUSE = building_type.BUILDING_WAREHOUSE;
import BUILDING_ENGINEERS_POST = building_type.BUILDING_ENGINEERS_POST;
import BUILDING_FOUNTAIN = building_type.BUILDING_FOUNTAIN;
import ADVISOR_LABOR = advisor_type.ADVISOR_LABOR;
import ADVISOR_MILITARY = advisor_type.ADVISOR_MILITARY;
import ADVISOR_IMPERIAL = advisor_type.ADVISOR_IMPERIAL;
import ADVISOR_RATINGS = advisor_type.ADVISOR_RATINGS;
import ADVISOR_TRADE = advisor_type.ADVISOR_TRADE;
import ADVISOR_POPULATION = advisor_type.ADVISOR_POPULATION;
import ADVISOR_HEALTH = advisor_type.ADVISOR_HEALTH;
import ADVISOR_EDUCATION = advisor_type.ADVISOR_EDUCATION;
import ADVISOR_ENTERTAINMENT = advisor_type.ADVISOR_ENTERTAINMENT;
import ADVISOR_RELIGION = advisor_type.ADVISOR_RELIGION;
import ADVISOR_FINANCIAL = advisor_type.ADVISOR_FINANCIAL;
import ADVISOR_CHIEF = advisor_type.ADVISOR_CHIEF;
import OVERLAY_WATER = overlay.OVERLAY_WATER;
import OVERLAY_FIRE = overlay.OVERLAY_FIRE;
import OVERLAY_DAMAGE = overlay.OVERLAY_DAMAGE;
import OVERLAY_CRIME = overlay.OVERLAY_CRIME;
import OVERLAY_PROBLEMS = overlay.OVERLAY_PROBLEMS;
import WINDOW_HOTKEY_EDITOR = window_id.WINDOW_HOTKEY_EDITOR;
import POPUP_DIALOG_QUIT = popup_dialog_type.POPUP_DIALOG_QUIT;
export class hotkey_definition {
    public action: number = 0;
    public value: number = 0;
    public key: key_type = null;
    public modifiers: key_modifier_type = null;
    public repeatable: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.action = args[0]);
        args.length >= 2 && (this.value = args[1]);
        args.length >= 3 && (this.key = args[2]);
        args.length >= 4 && (this.modifiers = args[3]);
        args.length >= 5 && (this.repeatable = args[4]);
    }
}
export class arrow_definition {
    public action: (value: number) => void = null;
    public key: key_type = null;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.action = args[0]);
        args.length >= 2 && (this.key = args[1]);
    }
}
export class global_hotkeys {
    public center_screen: number = 0;
    public toggle_fullscreen: number = 0;
    public resize_to: number = 0;
    public save_screenshot: number = 0;
    public save_city_screenshot: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.center_screen = args[0]);
        args.length >= 2 && (this.toggle_fullscreen = args[1]);
        args.length >= 3 && (this.resize_to = args[2]);
        args.length >= 4 && (this.save_screenshot = args[3]);
        args.length >= 5 && (this.save_city_screenshot = args[4]);
    }
}
export class unnamed39_8 {
    public global_hotkey_state: global_hotkeys = null;
    public hotkey_state: hotkeys = null;
    public definitions: hotkey_definition[] = [];
    public num_definitions: number = 0;
    public arrows: arrow_definition[] = [];
    public num_arrows: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.global_hotkey_state = args[0]);
        args.length >= 2 && (this.hotkey_state = args[1]);
        args.length >= 3 && (this.definitions = args[2]);
        args.length >= 4 && (this.num_definitions = args[3]);
        args.length >= 5 && (this.arrows = args[4]);
        args.length >= 6 && (this.num_arrows = args[5]);
    }
}
let data: unnamed39_8 = new unnamed39_8();
function set_definition_for_action(action: hotkey_action, def: hotkey_definition) {
    def.value = 1;
    def.repeatable = 0;
    switch (action) {
        case HOTKEY_TOGGLE_PAUSE:
            def.action = data.hotkey_state.toggle_pause;
            break
        case HOTKEY_TOGGLE_OVERLAY:
            def.action = data.hotkey_state.toggle_overlay;
            break
        case HOTKEY_CYCLE_LEGION:
            def.action = data.hotkey_state.cycle_legion;
            break
        case HOTKEY_INCREASE_GAME_SPEED:
            def.action = data.hotkey_state.increase_game_speed;
            def.repeatable = 1;
            break
        case HOTKEY_DECREASE_GAME_SPEED:
            def.action = data.hotkey_state.decrease_game_speed;
            def.repeatable = 1;
            break
        case HOTKEY_ROTATE_MAP_LEFT:
            def.action = data.hotkey_state.rotate_map_left;
            break
        case HOTKEY_ROTATE_MAP_RIGHT:
            def.action = data.hotkey_state.rotate_map_right;
            break
        case HOTKEY_SHOW_ADVISOR_LABOR:
            def.action = data.hotkey_state.show_advisor;
            def.value = ADVISOR_LABOR;
            break
        case HOTKEY_SHOW_ADVISOR_MILITARY:
            def.action = data.hotkey_state.show_advisor;
            def.value = ADVISOR_MILITARY;
            break
        case HOTKEY_SHOW_ADVISOR_IMPERIAL:
            def.action = data.hotkey_state.show_advisor;
            def.value = ADVISOR_IMPERIAL;
            break
        case HOTKEY_SHOW_ADVISOR_RATINGS:
            def.action = data.hotkey_state.show_advisor;
            def.value = ADVISOR_RATINGS;
            break
        case HOTKEY_SHOW_ADVISOR_TRADE:
            def.action = data.hotkey_state.show_advisor;
            def.value = ADVISOR_TRADE;
            break
        case HOTKEY_SHOW_ADVISOR_POPULATION:
            def.action = data.hotkey_state.show_advisor;
            def.value = ADVISOR_POPULATION;
            break
        case HOTKEY_SHOW_ADVISOR_HEALTH:
            def.action = data.hotkey_state.show_advisor;
            def.value = ADVISOR_HEALTH;
            break
        case HOTKEY_SHOW_ADVISOR_EDUCATION:
            def.action = data.hotkey_state.show_advisor;
            def.value = ADVISOR_EDUCATION;
            break
        case HOTKEY_SHOW_ADVISOR_ENTERTAINMENT:
            def.action = data.hotkey_state.show_advisor;
            def.value = ADVISOR_ENTERTAINMENT;
            break
        case HOTKEY_SHOW_ADVISOR_RELIGION:
            def.action = data.hotkey_state.show_advisor;
            def.value = ADVISOR_RELIGION;
            break
        case HOTKEY_SHOW_ADVISOR_FINANCIAL:
            def.action = data.hotkey_state.show_advisor;
            def.value = ADVISOR_FINANCIAL;
            break
        case HOTKEY_SHOW_ADVISOR_CHIEF:
            def.action = data.hotkey_state.show_advisor;
            def.value = ADVISOR_CHIEF;
            break
        case HOTKEY_SHOW_OVERLAY_WATER:
            def.action = data.hotkey_state.show_overlay;
            def.value = OVERLAY_WATER;
            break
        case HOTKEY_SHOW_OVERLAY_FIRE:
            def.action = data.hotkey_state.show_overlay;
            def.value = OVERLAY_FIRE;
            break
        case HOTKEY_SHOW_OVERLAY_DAMAGE:
            def.action = data.hotkey_state.show_overlay;
            def.value = OVERLAY_DAMAGE;
            break
        case HOTKEY_SHOW_OVERLAY_CRIME:
            def.action = data.hotkey_state.show_overlay;
            def.value = OVERLAY_CRIME;
            break
        case HOTKEY_SHOW_OVERLAY_PROBLEMS:
            def.action = data.hotkey_state.show_overlay;
            def.value = OVERLAY_PROBLEMS;
            break
        case HOTKEY_EDITOR_TOGGLE_BATTLE_INFO:
            def.action = data.hotkey_state.toggle_editor_battle_info;
            break
        case HOTKEY_LOAD_FILE:
            def.action = data.hotkey_state.load_file;
            break
        case HOTKEY_SAVE_FILE:
            def.action = data.hotkey_state.save_file;
            break
        case HOTKEY_GO_TO_BOOKMARK_1:
            def.action = data.hotkey_state.go_to_bookmark;
            def.value = 1;
            break
        case HOTKEY_GO_TO_BOOKMARK_2:
            def.action = data.hotkey_state.go_to_bookmark;
            def.value = 2;
            break
        case HOTKEY_GO_TO_BOOKMARK_3:
            def.action = data.hotkey_state.go_to_bookmark;
            def.value = 3;
            break
        case HOTKEY_GO_TO_BOOKMARK_4:
            def.action = data.hotkey_state.go_to_bookmark;
            def.value = 4;
            break
        case HOTKEY_SET_BOOKMARK_1:
            def.action = data.hotkey_state.set_bookmark;
            def.value = 1;
            break
        case HOTKEY_SET_BOOKMARK_2:
            def.action = data.hotkey_state.set_bookmark;
            def.value = 2;
            break
        case HOTKEY_SET_BOOKMARK_3:
            def.action = data.hotkey_state.set_bookmark;
            def.value = 3;
            break
        case HOTKEY_SET_BOOKMARK_4:
            def.action = data.hotkey_state.set_bookmark;
            def.value = 4;
            break
        case HOTKEY_CENTER_WINDOW:
            def.action = data.global_hotkey_state.center_screen;
            break
        case HOTKEY_TOGGLE_FULLSCREEN:
            def.action = data.global_hotkey_state.toggle_fullscreen;
            break
        case HOTKEY_RESIZE_TO_640:
            def.action = data.global_hotkey_state.resize_to;
            def.value = 640;
            break
        case HOTKEY_RESIZE_TO_800:
            def.action = data.global_hotkey_state.resize_to;
            def.value = 800;
            break
        case HOTKEY_RESIZE_TO_1024:
            def.action = data.global_hotkey_state.resize_to;
            def.value = 1024;
            break
        case HOTKEY_SAVE_SCREENSHOT:
            def.action = data.global_hotkey_state.save_screenshot;
            break
        case HOTKEY_SAVE_CITY_SCREENSHOT:
            def.action = data.global_hotkey_state.save_city_screenshot;
            break
        case HOTKEY_BUILD_VACANT_HOUSE:
            def.action = data.hotkey_state.building;
            def.value = BUILDING_HOUSE_VACANT_LOT;
            break
        case HOTKEY_BUILD_CLEAR_LAND:
            def.action = data.hotkey_state.building;
            def.value = BUILDING_CLEAR_LAND;
            break
        case HOTKEY_BUILD_ROAD:
            def.action = data.hotkey_state.building;
            def.value = BUILDING_ROAD;
            break
        case HOTKEY_BUILD_ENGINEERS_POST:
            def.action = data.hotkey_state.building;
            def.value = BUILDING_ENGINEERS_POST;
            break
        case HOTKEY_BUILD_WALL:
            def.action = data.hotkey_state.building;
            def.value = BUILDING_WALL;
            break
        case HOTKEY_BUILD_GATEHOUSE:
            def.action = data.hotkey_state.building;
            def.value = BUILDING_GATEHOUSE;
            break
        case HOTKEY_BUILD_PREFECTURE:
            def.action = data.hotkey_state.building;
            def.value = BUILDING_PREFECTURE;
            break
        case HOTKEY_BUILD_GRANARY:
            def.action = data.hotkey_state.building;
            def.value = BUILDING_GRANARY;
            break
        case HOTKEY_BUILD_WAREHOUSE:
            def.action = data.hotkey_state.building;
            def.value = BUILDING_WAREHOUSE;
            break
        case HOTKEY_BUILD_MARKET:
            def.action = data.hotkey_state.building;
            def.value = BUILDING_MARKET;
            break
        case HOTKEY_BUILD_PLAZA:
            def.action = data.hotkey_state.building;
            def.value = BUILDING_PLAZA;
            break
        case HOTKEY_BUILD_GARDENS:
            def.action = data.hotkey_state.building;
            def.value = BUILDING_GARDENS;
            break
        case HOTKEY_BUILD_RESERVOIR:
            def.action = data.hotkey_state.building;
            def.value = BUILDING_DRAGGABLE_RESERVOIR;
            break
        case HOTKEY_BUILD_AQUEDUCT:
            def.action = data.hotkey_state.building;
            def.value = BUILDING_AQUEDUCT;
            break
        case HOTKEY_BUILD_FOUNTAIN:
            def.action = data.hotkey_state.building;
            def.value = BUILDING_FOUNTAIN;
            break
        case HOTKEY_BUILD_DOCTOR:
            def.action = data.hotkey_state.building;
            def.value = BUILDING_DOCTOR;
            break
        case HOTKEY_BUILD_CLONE:
            def.action = data.hotkey_state.clone_building;
            break
        default:
            def.action = 0
    }
}
function add_definition(mapping: hotkey_mapping) {
    let def: hotkey_definition = data.definitions[data.num_definitions];
    def.key = mapping.key;
    def.modifiers = mapping.modifiers;
    set_definition_for_action(mapping.action, def);
    if (def.action) {
        data.num_definitions++;
    }
}
function add_arrow(mapping: hotkey_mapping) {
    let arrow: arrow_definition = data.arrows[data.num_arrows];
    arrow.key = mapping.key;
    switch (mapping.action) {
        case HOTKEY_ARROW_UP:
            arrow.action = scroll_arrow_up;
            break
        case HOTKEY_ARROW_DOWN:
            arrow.action = scroll_arrow_down;
            break
        case HOTKEY_ARROW_LEFT:
            arrow.action = scroll_arrow_left;
            break
        case HOTKEY_ARROW_RIGHT:
            arrow.action = scroll_arrow_right;
            break
        default:
            arrow.action = null;
            break
    }
    if (arrow.action) {
        data.num_arrows++;
    }
}
function allocate_mapping_memory(total_definitions: number, total_arrows: number) {
    data.definitions = [];
    data.arrows = [];
    data.num_definitions = 0;
    data.num_arrows = 0;
    for (let i = 0; i < total_definitions; i++) {
        data.definitions.push(new hotkey_definition());
    }
    for (let i = 0; i < total_arrows; i++) {
        data.arrows.push(new arrow_definition());
    }
    if (!data.definitions || !data.arrows) {
        data.definitions = [];
        data.arrows = [];
        return 0;
    }
    return 1;
}
export function hotkey_install_mapping(mappings: hotkey_mapping[], num_mappings: number) {
    let total_definitions: number = 2;
    let total_arrows: number = 0;
    for (let i: number = 0; i < num_mappings; i++) {
        let action: hotkey_action = mappings[i].action;
        if (action == HOTKEY_ARROW_UP || action == HOTKEY_ARROW_DOWN ||
            action == HOTKEY_ARROW_LEFT || action == HOTKEY_ARROW_RIGHT) {
            total_arrows++;
        } else {
            total_definitions++;
        }
    }
    if (!allocate_mapping_memory(total_definitions, total_arrows)) {
        return;
    }
    data.definitions[0].action = data.hotkey_state.enter_pressed;
    data.definitions[0].key = KEY_TYPE_ENTER;
    data.definitions[0].modifiers = 0;
    data.definitions[0].repeatable = 0;
    data.definitions[0].value = 1;
    data.definitions[1].action = data.hotkey_state.escape_pressed;
    data.definitions[1].key = KEY_TYPE_ESCAPE;
    data.definitions[1].modifiers = 0;
    data.definitions[1].repeatable = 0;
    data.definitions[1].value = 1;
    data.num_definitions = 2;
    for (let i: number = 0; i < num_mappings; i++) {
        let action: hotkey_action = mappings[i].action;
        if (action == HOTKEY_ARROW_UP || action == HOTKEY_ARROW_DOWN ||
            action == HOTKEY_ARROW_LEFT || action == HOTKEY_ARROW_RIGHT) {
            add_arrow(mappings[i]);
        } else {
            add_definition(mappings[i]);
        }
    }
}
export function hotkey_state() {
    return data.hotkey_state;
}
export function hotkey_reset_state() {
    if (data.hotkey_state) {
        data.hotkey_state.enter_pressed = 0;
        data.hotkey_state.escape_pressed = 0;
        data.hotkey_state.cycle_legion = 0;
        data.hotkey_state.decrease_game_speed = 0;
        data.hotkey_state.increase_game_speed = 0;
        data.hotkey_state.rotate_map_left = 0;
        data.hotkey_state.rotate_map_right = 0;
        data.hotkey_state.show_advisor = 0;
        data.hotkey_state.show_overlay = 0;
        data.hotkey_state.toggle_overlay = 0;
        data.hotkey_state.toggle_pause = 0;
        data.hotkey_state.toggle_editor_battle_info = 0;
        data.hotkey_state.set_bookmark = 0;
        data.hotkey_state.go_to_bookmark = 0;
        data.hotkey_state.load_file = 0;
        data.hotkey_state.save_file = 0;
        data.hotkey_state.building = 0;
        data.hotkey_state.clone_building = 0;
    }
    if (data.global_hotkey_state) {
        data.global_hotkey_state.center_screen = 0;
        data.global_hotkey_state.toggle_fullscreen = 0;
        data.global_hotkey_state.resize_to = 0;
        data.global_hotkey_state.save_screenshot = 0;
        data.global_hotkey_state.save_city_screenshot = 0;
    }
}
export function hotkey_key_pressed(key: key_type, modifiers: key_modifier_type, repeat: number) {
    if (window_is(WINDOW_HOTKEY_EDITOR)) {
        window_hotkey_editor_key_pressed(key, modifiers);
        return;
    }
    if (key == 0) {
        return;
    }
    let found_action: number = 0;
    for (let i: number = 0; i < data.num_definitions; i++) {
        let def: hotkey_definition = data.definitions[i];
        if (def.key == key && def.modifiers == modifiers && (!repeat || def.repeatable)) {
            def.action = def.value;
            found_action = 1;
        }
    }
    if (found_action) {
        return;
    }
    for (let i: number = 0; i < data.num_arrows; i++) {
        let arrow: arrow_definition = data.arrows[i];
        if (arrow.key == key) {
            arrow.action(1);
        }
    }
}
export function hotkey_key_released(key: key_type, modifiers: key_modifier_type) {
    if (window_is(WINDOW_HOTKEY_EDITOR)) {
        window_hotkey_editor_key_released(key, modifiers);
        return;
    }
    if (key == KEY_TYPE_NONE) {
        return;
    }
    for (let i: number = 0; i < data.num_arrows; i++) {
        let arrow: arrow_definition = data.arrows[i];
        if (arrow.key == key) {
            arrow.action(0);
        }
    }
}
function confirm_exit(accepted: number) {
    if (accepted) {
        system_exit();
    }
}
export function hotkey_handle_escape() {
    video_stop();
    window_popup_dialog_show(POPUP_DIALOG_QUIT, confirm_exit, 1);
}
export function hotkey_handle_global_keys() {
    if (data.global_hotkey_state.center_screen) {
        system_center();
    }
    if (data.global_hotkey_state.resize_to) {
        switch (data.global_hotkey_state.resize_to) {
            case 640:
                system_resize(640, 480);
                break
            case 800:
                system_resize(800, 600);
                break
            case 1024:
                system_resize(1024, 768);
                break
        }
    }
    if (data.global_hotkey_state.toggle_fullscreen) {
        system_set_fullscreen(!setting_fullscreen());
    }
    if (data.global_hotkey_state.save_screenshot) {
        graphics_save_screenshot(0);
    }
    if (data.global_hotkey_state.save_city_screenshot) {
        graphics_save_screenshot(1);
    }
}
export function hotkey_set_value_for_action(action: hotkey_action, value: number) {
    let def: hotkey_definition = new hotkey_definition();
    set_definition_for_action(action, def);
    def.action = value ? def.value : 0;
}
