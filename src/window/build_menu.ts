export const SUBMENU_NONE = 1;
export const MENU_X_OFFSET = 258;
export const MENU_Y_OFFSET = 110;
export const MENU_ITEM_HEIGHT = 24;
export const MENU_ITEM_WIDTH = 176;
export const MENU_CLICK_MARGIN = 20;
import { building_construction_clear_type, building_construction_set_type, building_construction_type } from 'building/construction';
import { build_menu_group, building_menu_count_items, building_menu_for_type, building_menu_next_index, building_menu_type } from 'building/menu';
import { model_get_building } from 'building/model';
import { building_type } from 'building/type';
import { city_view_get_viewport } from 'city/view';
import { image_group } from 'core/image';
import { group_terrain } from 'core/image_group';
import { button_none } from 'graphics/button';
import { font_t } from 'graphics/font';
import { generic_button, generic_buttons_handle_mouse } from 'graphics/generic_button';
import { lang_text_draw_centered } from 'graphics/lang_text';
import { label_draw } from 'graphics/panel';
import { text_draw_centered, text_draw_money } from 'graphics/text';
import { window_id, window_show, window_type } from 'graphics/window';
import { hotkeys } from 'input/hotkey';
import { input_go_back_requested } from 'input/input';
import { mouse } from 'input/mouse';
import { scenario_climate, scenario_property_climate } from 'scenario/property';
import { translation_for, translation_key } from 'translation/translation';
import { widget_city_clear_current_tile } from 'widget/city';
import { widget_sidebar_city_handle_mouse_build_menu } from 'widget/sidebar/city';
import { window_city_draw, window_city_draw_panels, window_city_show } from 'window/city';
import { Ref } from '../../ext/crt';
import BUILD_MENU_VACANT_HOUSE = build_menu_group.BUILD_MENU_VACANT_HOUSE;
import BUILDING_NONE = building_type.BUILDING_NONE;
import BUILDING_MENU_FARMS = building_type.BUILDING_MENU_FARMS;
import BUILDING_MENU_RAW_MATERIALS = building_type.BUILDING_MENU_RAW_MATERIALS;
import BUILDING_MENU_WORKSHOPS = building_type.BUILDING_MENU_WORKSHOPS;
import BUILDING_DRAGGABLE_RESERVOIR = building_type.BUILDING_DRAGGABLE_RESERVOIR;
import BUILDING_FORT = building_type.BUILDING_FORT;
import BUILDING_SMALL_TEMPLE_CERES = building_type.BUILDING_SMALL_TEMPLE_CERES;
import BUILDING_LARGE_TEMPLE_CERES = building_type.BUILDING_LARGE_TEMPLE_CERES;
import BUILDING_RESERVOIR = building_type.BUILDING_RESERVOIR;
import BUILDING_MENU_SMALL_TEMPLES = building_type.BUILDING_MENU_SMALL_TEMPLES;
import BUILDING_MENU_LARGE_TEMPLES = building_type.BUILDING_MENU_LARGE_TEMPLES;
import BUILD_MENU_CLEAR_LAND = build_menu_group.BUILD_MENU_CLEAR_LAND;
import BUILD_MENU_ROAD = build_menu_group.BUILD_MENU_ROAD;
import BUILD_MENU_WATER = build_menu_group.BUILD_MENU_WATER;
import BUILD_MENU_HEALTH = build_menu_group.BUILD_MENU_HEALTH;
import BUILD_MENU_TEMPLES = build_menu_group.BUILD_MENU_TEMPLES;
import BUILD_MENU_EDUCATION = build_menu_group.BUILD_MENU_EDUCATION;
import BUILD_MENU_ENTERTAINMENT = build_menu_group.BUILD_MENU_ENTERTAINMENT;
import BUILD_MENU_ADMINISTRATION = build_menu_group.BUILD_MENU_ADMINISTRATION;
import BUILD_MENU_ENGINEERING = build_menu_group.BUILD_MENU_ENGINEERING;
import BUILD_MENU_SECURITY = build_menu_group.BUILD_MENU_SECURITY;
import BUILD_MENU_INDUSTRY = build_menu_group.BUILD_MENU_INDUSTRY;
import BUILD_MENU_FARMS = build_menu_group.BUILD_MENU_FARMS;
import BUILD_MENU_RAW_MATERIALS = build_menu_group.BUILD_MENU_RAW_MATERIALS;
import BUILD_MENU_WORKSHOPS = build_menu_group.BUILD_MENU_WORKSHOPS;
import BUILD_MENU_SMALL_TEMPLES = build_menu_group.BUILD_MENU_SMALL_TEMPLES;
import BUILD_MENU_LARGE_TEMPLES = build_menu_group.BUILD_MENU_LARGE_TEMPLES;
import BUILD_MENU_FORTS = build_menu_group.BUILD_MENU_FORTS;
import GROUP_PANEL_WINDOWS = group_terrain.GROUP_PANEL_WINDOWS;
import GROUP_PANEL_WINDOWS_DESERT = group_terrain.GROUP_PANEL_WINDOWS_DESERT;
import FONT_NORMAL_GREEN = font_t.FONT_NORMAL_GREEN;
import WINDOW_BUILD_MENU = window_id.WINDOW_BUILD_MENU;
import CLIMATE_DESERT = scenario_climate.CLIMATE_DESERT;
import TR_BUILD_ALL_TEMPLES = translation_key.TR_BUILD_ALL_TEMPLES;
let build_menu_buttons: generic_button[] = [
    new generic_button(0, 0, 256, 20, button_menu_index, button_none, 1, 0),
    new generic_button(0, 24, 256, 20, button_menu_index, button_none, 2, 0),
    new generic_button(0, 48, 256, 20, button_menu_index, button_none, 3, 0),
    new generic_button(0, 72, 256, 20, button_menu_index, button_none, 4, 0),
    new generic_button(0, 96, 256, 20, button_menu_index, button_none, 5, 0),
    new generic_button(0, 120, 256, 20, button_menu_index, button_none, 6, 0),
    new generic_button(0, 144, 256, 20, button_menu_index, button_none, 7, 0),
    new generic_button(0, 168, 256, 20, button_menu_index, button_none, 8, 0),
    new generic_button(0, 192, 256, 20, button_menu_index, button_none, 9, 0),
    new generic_button(0, 216, 256, 20, button_menu_index, button_none, 10, 0),
    new generic_button(0, 240, 256, 20, button_menu_index, button_none, 11, 0),
    new generic_button(0, 264, 256, 20, button_menu_index, button_none, 12, 0),
    new generic_button(0, 288, 256, 20, button_menu_index, button_none, 13, 0),
    new generic_button(0, 312, 256, 20, button_menu_index, button_none, 14, 0),
    new generic_button(0, 336, 256, 20, button_menu_index, button_none, 15, 0),
    new generic_button(0, 360, 256, 20, button_menu_index, button_none, 16, 0),
    new generic_button(0, 384, 256, 20, button_menu_index, button_none, 17, 0),
    new generic_button(0, 408, 256, 20, button_menu_index, button_none, 18, 0),
    new generic_button(0, 432, 256, 20, button_menu_index, button_none, 19, 0),
    new generic_button(0, 456, 256, 20, button_menu_index, button_none, 20, 0),
    new generic_button(0, 480, 256, 20, button_menu_index, button_none, 21, 0),
    new generic_button(0, 504, 256, 20, button_menu_index, button_none, 22, 0),
    new generic_button(0, 528, 256, 20, button_menu_index, button_none, 23, 0),
    new generic_button(0, 552, 256, 20, button_menu_index, button_none, 24, 0),
    new generic_button(0, 576, 256, 20, button_menu_index, button_none, 25, 0),
    new generic_button(0, 600, 256, 20, button_menu_index, button_none, 26, 0),
    new generic_button(0, 624, 256, 20, button_menu_index, button_none, 27, 0),
    new generic_button(0, 648, 256, 20, button_menu_index, button_none, 28, 0),
    new generic_button(0, 672, 256, 20, button_menu_index, button_none, 29, 0),
    new generic_button(0, 696, 256, 20, button_menu_index, button_none, 30, 0),
];
let Y_MENU_OFFSETS: number[] = [
    0, 322, 306, 274, 258, 226, 210, 178, 162, 130, 114,
    82, 66, 34, 18, -30, -46, -62, -78, -78, -94,
    -94, -110, -110,
    0, 0, 0, 0, 0, 0
];
export class unnamed71_8 {
    public selected_submenu: build_menu_group = null;
    public num_items: number = 0;
    public y_offset: number = 0;
    public focus_button_id: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.selected_submenu = args[0]);
        args.length >= 2 && (this.num_items = args[1]);
        args.length >= 3 && (this.y_offset = args[2]);
        args.length >= 4 && (this.focus_button_id = args[3]);
    }
}
let data: unnamed71_8 = new unnamed71_8(SUBMENU_NONE);
function init(submenu: build_menu_group) {
    data.selected_submenu = submenu;
    data.num_items = building_menu_count_items(submenu);
    data.y_offset = Y_MENU_OFFSETS[data.num_items];
    if (submenu == BUILD_MENU_VACANT_HOUSE ||
        submenu == BUILD_MENU_CLEAR_LAND ||
        submenu == BUILD_MENU_ROAD) {
        button_menu_item(0);
        return 0;
    } else {
        return 1;
    }
}
export function window_build_menu_image() {
    let type: building_type = building_construction_type();
    let image_base: number = image_group(GROUP_PANEL_WINDOWS);
    if (type == BUILDING_NONE) {
        return image_base + 12;
    }
    switch (building_menu_for_type(type)) {
        default:
        case BUILD_MENU_VACANT_HOUSE:
            return image_base
        case BUILD_MENU_CLEAR_LAND:
            if (scenario_property_climate() == CLIMATE_DESERT) {
                return image_group(GROUP_PANEL_WINDOWS_DESERT);
            } else {
                return image_base + 11;
            }
        case BUILD_MENU_ROAD:
            if (scenario_property_climate() == CLIMATE_DESERT) {
                return image_group(GROUP_PANEL_WINDOWS_DESERT) + 1;
            } else {
                return image_base + 10;
            }
        case BUILD_MENU_WATER:
            if (scenario_property_climate() == CLIMATE_DESERT) {
                return image_group(GROUP_PANEL_WINDOWS_DESERT) + 2;
            } else {
                return image_base + 3;
            }
        case BUILD_MENU_HEALTH:
            return image_base + 5;
        case BUILD_MENU_TEMPLES:
        case BUILD_MENU_SMALL_TEMPLES:
        case BUILD_MENU_LARGE_TEMPLES:
            return image_base + 1;
        case BUILD_MENU_EDUCATION:
            return image_base + 6;
        case BUILD_MENU_ENTERTAINMENT:
            return image_base + 4;
        case BUILD_MENU_ADMINISTRATION:
            return image_base + 2;
        case BUILD_MENU_ENGINEERING:
            return image_base + 7;
        case BUILD_MENU_SECURITY:
        case BUILD_MENU_FORTS:
            if (scenario_property_climate() == CLIMATE_DESERT) {
                return image_group(GROUP_PANEL_WINDOWS_DESERT) + 3;
            } else {
                return image_base + 8;
            }
        case BUILD_MENU_INDUSTRY:
        case BUILD_MENU_FARMS:
        case BUILD_MENU_RAW_MATERIALS:
        case BUILD_MENU_WORKSHOPS:
            return image_base + 9;
    }
}
function draw_background() {
    window_city_draw_panels();
}
function get_sidebar_x_offset() {
    let view_x: Ref<number> = new Ref(0);
    let view_y: Ref<number> = new Ref(0);
    let view_width: Ref<number> = new Ref(0);
    let view_height: Ref<number> = new Ref(0);
    city_view_get_viewport(view_x, view_y, view_width, view_height);
    return view_x.v + view_width.v;
}
function is_all_button(type: building_type) {
    return (type == BUILDING_MENU_SMALL_TEMPLES && data.selected_submenu == BUILD_MENU_SMALL_TEMPLES) ||
        (type == BUILDING_MENU_LARGE_TEMPLES && data.selected_submenu == BUILD_MENU_LARGE_TEMPLES);
}
function draw_menu_buttons() {
    let x_offset: number = get_sidebar_x_offset();
    let item_index: number = -1;
    let item_x_align: number = x_offset - MENU_X_OFFSET - 8;
    for (let i: number = 0; i < data.num_items; i++) {
        item_index = building_menu_next_index(data.selected_submenu, item_index);
        label_draw(item_x_align, data.y_offset + MENU_Y_OFFSET + MENU_ITEM_HEIGHT * i, 16,
            data.focus_button_id == i + 1 ? 1 : 2);
        let type: number = building_menu_type(data.selected_submenu, item_index);
        if (is_all_button(type)) {
            text_draw_centered(translation_for(TR_BUILD_ALL_TEMPLES),
                item_x_align, data.y_offset + MENU_Y_OFFSET + 4 + MENU_ITEM_HEIGHT * i,
                MENU_ITEM_WIDTH, FONT_NORMAL_GREEN, 0);
        } else {
            lang_text_draw_centered(28, type, item_x_align, data.y_offset + MENU_Y_OFFSET + 4 + MENU_ITEM_HEIGHT * i,
                MENU_ITEM_WIDTH, FONT_NORMAL_GREEN);
        }
        if (type == BUILDING_DRAGGABLE_RESERVOIR) {
            type = BUILDING_RESERVOIR;
        }
        let cost: number = model_get_building(type).cost;
        if (type == BUILDING_FORT) {
            cost = 0;
        }
        if (type == BUILDING_MENU_SMALL_TEMPLES && data.selected_submenu == BUILD_MENU_SMALL_TEMPLES) {
            cost = model_get_building(BUILDING_SMALL_TEMPLE_CERES).cost;
        }
        if (type == BUILDING_MENU_LARGE_TEMPLES && data.selected_submenu == BUILD_MENU_LARGE_TEMPLES) {
            cost = model_get_building(BUILDING_LARGE_TEMPLE_CERES).cost;
        }
        if (cost) {
            text_draw_money(cost, x_offset - 82, data.y_offset + MENU_Y_OFFSET + 4 + MENU_ITEM_HEIGHT * i,
                FONT_NORMAL_GREEN);
        }
    }
}
function draw_foreground() {
    window_city_draw();
    draw_menu_buttons();
}
function click_outside_menu(m: mouse, x_offset: number) {
    return m.left.went_up &&
        (m.x < x_offset - MENU_X_OFFSET - MENU_CLICK_MARGIN ||
            m.x > x_offset + MENU_CLICK_MARGIN ||
            m.y < data.y_offset + MENU_Y_OFFSET - MENU_CLICK_MARGIN ||
            m.y > data.y_offset + MENU_Y_OFFSET + MENU_CLICK_MARGIN + MENU_ITEM_HEIGHT * data.num_items);
}
function handle_build_submenu(m: mouse) {
    return generic_buttons_handle_mouse(
        m, get_sidebar_x_offset() - MENU_X_OFFSET, data.y_offset + MENU_Y_OFFSET,
        build_menu_buttons, data.num_items, data.focus_button_id);
}
function handle_input(m: mouse, h: hotkeys) {
    if (handle_build_submenu(m) ||
        widget_sidebar_city_handle_mouse_build_menu(m)) {
        return;
    }
    if (input_go_back_requested(m, h) || click_outside_menu(m, get_sidebar_x_offset())) {
        data.selected_submenu = SUBMENU_NONE;
        window_city_show();
        return;
    }
}
function button_index_to_submenu_item(index: number) {
    let item: number = -1;
    for (let i: number = 0; i <= index; i++) {
        item = building_menu_next_index(data.selected_submenu, item);
    }
    return item;
}
function button_menu_index(param1: number, param2: number) {
    button_menu_item(button_index_to_submenu_item(param1 - 1));
}
function set_submenu_for_type(type: building_type) {
    let current_menu: build_menu_group = data.selected_submenu;
    switch (type) {
        case BUILDING_MENU_FARMS:
            data.selected_submenu = BUILD_MENU_FARMS;
            break
        case BUILDING_MENU_RAW_MATERIALS:
            data.selected_submenu = BUILD_MENU_RAW_MATERIALS;
            break
        case BUILDING_MENU_WORKSHOPS:
            data.selected_submenu = BUILD_MENU_WORKSHOPS;
            break
        case BUILDING_MENU_SMALL_TEMPLES:
            data.selected_submenu = BUILD_MENU_SMALL_TEMPLES;
            break
        case BUILDING_MENU_LARGE_TEMPLES:
            data.selected_submenu = BUILD_MENU_LARGE_TEMPLES;
            break
        case BUILDING_FORT:
            data.selected_submenu = BUILD_MENU_FORTS;
            break
        default:
            return 0
    }
    return current_menu != data.selected_submenu;
}
function button_menu_item(item: number) {
    widget_city_clear_current_tile();
    let type: building_type = building_menu_type(data.selected_submenu, item);
    building_construction_set_type(type);
    if (set_submenu_for_type(type)) {
        data.num_items = building_menu_count_items(data.selected_submenu);
        data.y_offset = Y_MENU_OFFSETS[data.num_items];
        building_construction_clear_type();
    } else {
        data.selected_submenu = SUBMENU_NONE;
        window_city_show();
    }
}
export function window_build_menu_show(submenu: number) {
    if (submenu == SUBMENU_NONE || submenu == data.selected_submenu) {
        window_build_menu_hide();
        return;
    }
    if (init(submenu)) {
        let window: window_type = new window_type(
            WINDOW_BUILD_MENU,
            draw_background,
            draw_foreground,
            handle_input,
            0
        );
        window_show(window);
    }
}
export function window_build_menu_hide() {
    data.selected_submenu = SUBMENU_NONE;
    window_city_show();
}
