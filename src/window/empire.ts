export const MAX_WIDTH = 2032;
export const MAX_HEIGHT = 1136;
import { building_menu_update } from 'building/menu';
import { advisor_type } from 'city/constants';
import { city_military_distant_battle_city_is_roman, city_military_distant_battle_enemy_months_traveled, city_military_distant_battle_roman_army_is_traveling, city_military_distant_battle_roman_army_is_traveling_forth, city_military_distant_battle_roman_months_traveled, city_military_months_until_distant_battle } from 'city/military';
import { pixel_offset } from 'city/view';
import { city_warning_show, warning_type } from 'city/warning';
import { image, image_get, image_group } from 'core/image';
import { group_terrain } from 'core/image_group';
import { empire_city, empire_city_get, empire_city_get_for_object, empire_city_is_trade_route_open, empire_city_open_trade } from 'empire/city';
import { empire_adjust_scroll, empire_clear_selected_object, empire_scroll_map, empire_select_object, empire_selected_object, empire_set_viewport } from 'empire/empire';
import { empire_object, empire_object_city_buys_resource, empire_object_city_sells_resource, empire_object_foreach, empire_object_get, empire_object_update_animation } from 'empire/object';
import { trade_route_limit, trade_route_traded } from 'empire/trade_route';
import { empire_city_type, empire_object_type } from 'empire/type';
import { resource_image_offset, resource_image_type, resource_type } from 'game/resource';
import { tutorial_advisor_empire_availability, tutorial_availability } from 'game/tutorial';
import { button_border_draw, button_none } from 'graphics/button';
import { font_t } from 'graphics/font';
import { generic_button, generic_buttons_handle_mouse } from 'graphics/generic_button';
import { graphics_clear_screen, graphics_draw_inset_rect, graphics_reset_clip_rectangle, graphics_set_clip_rectangle } from 'graphics/graphics';
import { image_draw } from 'graphics/image';
import { ib, image_button, image_buttons_draw, image_buttons_handle_mouse } from 'graphics/image_button';
import { lang_text_draw, lang_text_draw_amount, lang_text_draw_centered, lang_text_draw_multiline, lang_text_get_width } from 'graphics/lang_text';
import { screen_height, screen_width } from 'graphics/screen';
import { text_draw_number } from 'graphics/text';
import { tooltip_context, tooltip_type } from 'graphics/tooltip';
import { window_id, window_invalidate, window_show, window_type } from 'graphics/window';
import { hotkeys } from 'input/hotkey';
import { input_go_back_requested } from 'input/input';
import { mouse } from 'input/mouse';
import { scroll_drag_end, scroll_drag_start, scroll_get_delta, scroll_type } from 'input/scroll';
import { touch, touch_get_earliest, touch_was_click } from 'input/touch';
import { scenario_empire_is_expanded } from 'scenario/empire';
import { scenario_invasion_foreach_warning } from 'scenario/invasion';
import { window_advisors_show_advisor } from 'window/advisors';
import { window_city_show } from 'window/city';
import { message_dialog, window_message_dialog_show } from 'window/message_dialog';
import { popup_dialog_type, window_popup_dialog_show } from 'window/popup_dialog';
import { window_resource_settings_show } from 'window/resource_settings';
import { window_trade_opened_show } from 'window/trade_opened';
import WARNING_NOT_AVAILABLE = warning_type.WARNING_NOT_AVAILABLE;
import WARNING_NOT_AVAILABLE_YET = warning_type.WARNING_NOT_AVAILABLE_YET;
import GROUP_EMPIRE_MAP = group_terrain.GROUP_EMPIRE_MAP;
import GROUP_CONTEXT_ICONS = group_terrain.GROUP_CONTEXT_ICONS;
import GROUP_EMPIRE_PANELS = group_terrain.GROUP_EMPIRE_PANELS;
import GROUP_EMPIRE_RESOURCES = group_terrain.GROUP_EMPIRE_RESOURCES;
import GROUP_EMPIRE_CITY_TRADE = group_terrain.GROUP_EMPIRE_CITY_TRADE;
import GROUP_EMPIRE_TRADE_ROUTE_TYPE = group_terrain.GROUP_EMPIRE_TRADE_ROUTE_TYPE;
import GROUP_MESSAGE_ADVISOR_BUTTONS = group_terrain.GROUP_MESSAGE_ADVISOR_BUTTONS;
import GROUP_EMPIRE_FOREIGN_CITY = group_terrain.GROUP_EMPIRE_FOREIGN_CITY;
import GROUP_TRADE_AMOUNT = group_terrain.GROUP_TRADE_AMOUNT;
import RESOURCE_WHEAT = resource_type.RESOURCE_WHEAT;
import RESOURCE_VEGETABLES = resource_type.RESOURCE_VEGETABLES;
import RESOURCE_FRUIT = resource_type.RESOURCE_FRUIT;
import RESOURCE_OLIVES = resource_type.RESOURCE_OLIVES;
import RESOURCE_VINES = resource_type.RESOURCE_VINES;
import RESOURCE_MEAT = resource_type.RESOURCE_MEAT;
import RESOURCE_WINE = resource_type.RESOURCE_WINE;
import RESOURCE_OIL = resource_type.RESOURCE_OIL;
import RESOURCE_IRON = resource_type.RESOURCE_IRON;
import RESOURCE_TIMBER = resource_type.RESOURCE_TIMBER;
import RESOURCE_CLAY = resource_type.RESOURCE_CLAY;
import RESOURCE_MARBLE = resource_type.RESOURCE_MARBLE;
import RESOURCE_WEAPONS = resource_type.RESOURCE_WEAPONS;
import RESOURCE_FURNITURE = resource_type.RESOURCE_FURNITURE;
import RESOURCE_POTTERY = resource_type.RESOURCE_POTTERY;
import RESOURCE_MIN = resource_type.RESOURCE_MIN;
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
import RESOURCE_IMAGE_ICON = resource_image_type.RESOURCE_IMAGE_ICON;
import EMPIRE_OBJECT_CITY = empire_object_type.EMPIRE_OBJECT_CITY;
import EMPIRE_OBJECT_BATTLE_ICON = empire_object_type.EMPIRE_OBJECT_BATTLE_ICON;
import EMPIRE_OBJECT_LAND_TRADE_ROUTE = empire_object_type.EMPIRE_OBJECT_LAND_TRADE_ROUTE;
import EMPIRE_OBJECT_SEA_TRADE_ROUTE = empire_object_type.EMPIRE_OBJECT_SEA_TRADE_ROUTE;
import EMPIRE_OBJECT_ROMAN_ARMY = empire_object_type.EMPIRE_OBJECT_ROMAN_ARMY;
import EMPIRE_OBJECT_ENEMY_ARMY = empire_object_type.EMPIRE_OBJECT_ENEMY_ARMY;
import EMPIRE_CITY_DISTANT_ROMAN = empire_city_type.EMPIRE_CITY_DISTANT_ROMAN;
import EMPIRE_CITY_OURS = empire_city_type.EMPIRE_CITY_OURS;
import EMPIRE_CITY_TRADE = empire_city_type.EMPIRE_CITY_TRADE;
import EMPIRE_CITY_FUTURE_TRADE = empire_city_type.EMPIRE_CITY_FUTURE_TRADE;
import EMPIRE_CITY_DISTANT_FOREIGN = empire_city_type.EMPIRE_CITY_DISTANT_FOREIGN;
import EMPIRE_CITY_VULNERABLE_ROMAN = empire_city_type.EMPIRE_CITY_VULNERABLE_ROMAN;
import EMPIRE_CITY_FUTURE_ROMAN = empire_city_type.EMPIRE_CITY_FUTURE_ROMAN;
import AVAILABLE = tutorial_availability.AVAILABLE;
import NOT_AVAILABLE = tutorial_availability.NOT_AVAILABLE;
import FONT_LARGE_BLACK = font_t.FONT_LARGE_BLACK;
import FONT_NORMAL_GREEN = font_t.FONT_NORMAL_GREEN;
import IB_NORMAL = ib.IB_NORMAL;
import TOOLTIP_BUTTON = tooltip_type.TOOLTIP_BUTTON;
import WINDOW_EMPIRE = window_id.WINDOW_EMPIRE;
import SCROLL_TYPE_EMPIRE = scroll_type.SCROLL_TYPE_EMPIRE;
import ADVISOR_TRADE = advisor_type.ADVISOR_TRADE;
import MESSAGE_DIALOG_EMPIRE_MAP = message_dialog.MESSAGE_DIALOG_EMPIRE_MAP;
import POPUP_DIALOG_OPEN_TRADE = popup_dialog_type.POPUP_DIALOG_OPEN_TRADE;
let image_button_help: image_button[] = [
    new image_button(0, 0, 27, 27, IB_NORMAL, GROUP_CONTEXT_ICONS, 0, button_help, button_none, 0, 0, 1)
];
let image_button_return_to_city: image_button[] = [
    new image_button(0, 0, 24, 24, IB_NORMAL, GROUP_CONTEXT_ICONS, 4, button_return_to_city, button_none, 0, 0, 1)
];
let image_button_advisor: image_button[] = [
    new image_button(-4, 0, 24, 24, IB_NORMAL, GROUP_MESSAGE_ADVISOR_BUTTONS, 12, button_advisor, button_none, ADVISOR_TRADE, 0, 1)
];
let generic_button_trade_resource: generic_button[] = [
    new generic_button(0, 0, 101, 27, button_show_resource_window, button_none, RESOURCE_WHEAT, 0),
    new generic_button(0, 0, 101, 27, button_show_resource_window, button_none, RESOURCE_VEGETABLES, 0),
    new generic_button(0, 0, 101, 27, button_show_resource_window, button_none, RESOURCE_FRUIT, 0),
    new generic_button(0, 0, 101, 27, button_show_resource_window, button_none, RESOURCE_OLIVES, 0),
    new generic_button(0, 0, 101, 27, button_show_resource_window, button_none, RESOURCE_VINES, 0),
    new generic_button(0, 0, 101, 27, button_show_resource_window, button_none, RESOURCE_MEAT, 0),
    new generic_button(0, 0, 101, 27, button_show_resource_window, button_none, RESOURCE_WINE, 0),
    new generic_button(0, 0, 101, 27, button_show_resource_window, button_none, RESOURCE_OIL, 0),
    new generic_button(0, 0, 101, 27, button_show_resource_window, button_none, RESOURCE_IRON, 0),
    new generic_button(0, 0, 101, 27, button_show_resource_window, button_none, RESOURCE_TIMBER, 0),
    new generic_button(0, 0, 101, 27, button_show_resource_window, button_none, RESOURCE_CLAY, 0),
    new generic_button(0, 0, 101, 27, button_show_resource_window, button_none, RESOURCE_MARBLE, 0),
    new generic_button(0, 0, 101, 27, button_show_resource_window, button_none, RESOURCE_WEAPONS, 0),
    new generic_button(0, 0, 101, 27, button_show_resource_window, button_none, RESOURCE_FURNITURE, 0),
    new generic_button(0, 0, 101, 27, button_show_resource_window, button_none, RESOURCE_POTTERY, 0)
];
let generic_button_open_trade: generic_button[] = [
    new generic_button(30, 56, 440, 26, button_open_trade, button_none, 0, 0)
];
export class unnamed71_8 {
    public selected_button: number = 0;
    public selected_city: number = 0;
    public x_min: number = 0;
    public x_max: number = 0;
    public y_min: number = 0;
    public y_max: number = 0;
    public x_draw_offset: number = 0;
    public y_draw_offset: number = 0;
    public focus_button_id: number = 0;
    public is_scrolling: number = 0;
    public finished_scroll: number = 0;
    public focus_resource: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.selected_button = args[0]);
        args.length >= 2 && (this.selected_city = args[1]);
        args.length >= 3 && (this.x_min = args[2]);
        args.length >= 4 && (this.x_max = args[3]);
        args.length >= 5 && (this.y_min = args[4]);
        args.length >= 6 && (this.y_max = args[5]);
        args.length >= 7 && (this.x_draw_offset = args[6]);
        args.length >= 8 && (this.y_draw_offset = args[7]);
        args.length >= 9 && (this.focus_button_id = args[8]);
        args.length >= 10 && (this.is_scrolling = args[9]);
        args.length >= 11 && (this.finished_scroll = args[10]);
        args.length >= 12 && (this.focus_resource = args[11]);
    }
}
let data: unnamed71_8 = new unnamed71_8(0, 1);
function init() {
    data.selected_button = 0;
    let selected_object: number = empire_selected_object();
    if (selected_object) {
        data.selected_city = empire_city_get_for_object(selected_object - 1);
    } else {
        data.selected_city = 0;
    }
    data.focus_button_id = 0;
}
function draw_paneling() {
    let image_base: number = image_group(GROUP_EMPIRE_PANELS);
    graphics_set_clip_rectangle(data.x_min, data.y_min, data.x_max - data.x_min, data.y_max - data.y_min);
    for (let x: number = data.x_min; x < data.x_max; x += 70) {
        image_draw(image_base + 3, x, data.y_max - 120);
        image_draw(image_base + 3, x, data.y_max - 80);
        image_draw(image_base + 3, x, data.y_max - 40);
    }
    for (let x: number = data.x_min; x < data.x_max; x += 86) {
        image_draw(image_base + 1, x, data.y_min);
        image_draw(image_base + 1, x, data.y_max - 120);
        image_draw(image_base + 1, x, data.y_max - 16);
    }
    for (let y: number = data.y_min + 16; y < data.y_max; y += 86) {
        image_draw(image_base, data.x_min, y);
        image_draw(image_base, data.x_max - 16, y);
    }
    image_draw(image_base + 2, data.x_min, data.y_min);
    image_draw(image_base + 2, data.x_min, data.y_max - 120);
    image_draw(image_base + 2, data.x_min, data.y_max - 16);
    image_draw(image_base + 2, data.x_max - 16, data.y_min);
    image_draw(image_base + 2, data.x_max - 16, data.y_max - 120);
    image_draw(image_base + 2, data.x_max - 16, data.y_max - 16);
    graphics_reset_clip_rectangle();
}
function draw_trade_resource(resource: resource_type, trade_max: number, x_offset: number, y_offset: number) {
    graphics_draw_inset_rect(x_offset, y_offset, 26, 26);
    let image_id: number = resource + image_group(GROUP_EMPIRE_RESOURCES);
    let resource_offset: number = resource_image_offset(resource, RESOURCE_IMAGE_ICON);
    image_draw(image_id + resource_offset, x_offset + 1, y_offset + 1);
    if (data.focus_resource == resource) {
        button_border_draw(x_offset - 2, y_offset - 2, 101 + 4, 30, true);
    }
    switch (trade_max) {
        case 15:
            image_draw(image_group(GROUP_TRADE_AMOUNT), x_offset + 21, y_offset - 1);
            break;
        case 25:
            image_draw(image_group(GROUP_TRADE_AMOUNT) + 1, x_offset + 17, y_offset - 1);
            break;
        case 40:
            image_draw(image_group(GROUP_TRADE_AMOUNT) + 2, x_offset + 13, y_offset - 1);
            break;
    }
}
function draw_trade_city_info(object: empire_object, city: empire_city) {
    let x_offset: number = (data.x_min + data.x_max - 500) / 2;
    let y_offset: number = data.y_max - 113;
    if (city.is_open) {
        lang_text_draw(47, 10, x_offset + 44, y_offset + 40, FONT_NORMAL_GREEN);
        let index: number = 0;
        for (let resource: number = RESOURCE_MIN; resource < RESOURCE_MAX; resource++) {
            if (!empire_object_city_sells_resource(object.id, resource)) {
                continue;
            }
            let trade_max: number = trade_route_limit(city.route_id, resource);
            draw_trade_resource(resource, trade_max, x_offset + 104 * index + 120, y_offset + 31);
            let trade_now: number = trade_route_traded(city.route_id, resource);
            if (trade_now > trade_max) {
                trade_max = trade_now;
            }
            let text_width: number = text_draw_number(trade_now, '@', "",
                x_offset + 104 * index + 150, y_offset + 40, FONT_NORMAL_GREEN);
            text_width += lang_text_draw(47, 11,
                x_offset + 104 * index + 148 + text_width, y_offset + 40, FONT_NORMAL_GREEN);
            text_draw_number(trade_max, '@', "",
                x_offset + 104 * index + 138 + text_width, y_offset + 40, FONT_NORMAL_GREEN);
            index++;
        }
        lang_text_draw(47, 9, x_offset + 44, y_offset + 71, FONT_NORMAL_GREEN);
        index = 0;
        for (let resource: number = RESOURCE_MIN; resource < RESOURCE_MAX; resource++) {
            if (!empire_object_city_buys_resource(object.id, resource)) {
                continue;
            }
            let trade_max: number = trade_route_limit(city.route_id, resource);
            draw_trade_resource(resource, trade_max, x_offset + 104 * index + 120, y_offset + 62);
            let trade_now: number = trade_route_traded(city.route_id, resource);
            if (trade_now > trade_max) {
                trade_max = trade_now;
            }
            let text_width: number = text_draw_number(trade_now, '@', "",
                x_offset + 104 * index + 150, y_offset + 71, FONT_NORMAL_GREEN);
            text_width += lang_text_draw(47, 11,
                x_offset + 104 * index + 148 + text_width, y_offset + 71, FONT_NORMAL_GREEN);
            text_draw_number(trade_max, '@', "",
                x_offset + 104 * index + 138 + text_width, y_offset + 71, FONT_NORMAL_GREEN);
            index++;
        }
    } else {
        let index: number = lang_text_draw(47, 5, x_offset + 50, y_offset + 42, FONT_NORMAL_GREEN);
        for (let resource: number = RESOURCE_MIN; resource < RESOURCE_MAX; resource++) {
            if (!empire_object_city_sells_resource(object.id, resource)) {
                continue;
            }
            let trade_max: number = trade_route_limit(city.route_id, resource);
            draw_trade_resource(resource, trade_max, x_offset + index + 60, y_offset + 33);
            index += 32;
        }
        index += lang_text_draw(47, 4, x_offset + index + 100, y_offset + 42, FONT_NORMAL_GREEN);
        for (let resource: number = RESOURCE_MIN; resource < RESOURCE_MAX; resource++) {
            if (!empire_object_city_buys_resource(object.id, resource)) {
                continue;
            }
            let trade_max: number = trade_route_limit(city.route_id, resource);
            draw_trade_resource(resource, trade_max, x_offset + index + 110, y_offset + 33);
            index += 32;
        }
        index = lang_text_draw_amount(8, 0, city.cost_to_open,
            x_offset + 40, y_offset + 73, FONT_NORMAL_GREEN);
        lang_text_draw(47, 6, x_offset + index + 40, y_offset + 73, FONT_NORMAL_GREEN);
        let image_id: number = image_group(GROUP_EMPIRE_TRADE_ROUTE_TYPE) + 1 - city.is_sea_trade;
        image_draw(image_id, x_offset + 430, y_offset + 65 + 2 * city.is_sea_trade);
    }
}
function draw_city_info(object: empire_object) {
    let x_offset: number = (data.x_min + data.x_max - 240) / 2;
    let y_offset: number = data.y_max - 88;
    let city: empire_city = empire_city_get(data.selected_city);
    switch (city.type) {
        case EMPIRE_CITY_DISTANT_ROMAN:
            lang_text_draw_centered(47, 12, x_offset, y_offset + 42, 240, FONT_NORMAL_GREEN);
            break;
        case EMPIRE_CITY_VULNERABLE_ROMAN:
            if (city_military_distant_battle_city_is_roman()) {
                lang_text_draw_centered(47, 12, x_offset, y_offset + 42, 240, FONT_NORMAL_GREEN);
            } else {
                lang_text_draw_centered(47, 13, x_offset, y_offset + 42, 240, FONT_NORMAL_GREEN);
            }
            break;
        case EMPIRE_CITY_FUTURE_TRADE:
        case EMPIRE_CITY_DISTANT_FOREIGN:
        case EMPIRE_CITY_FUTURE_ROMAN:
            lang_text_draw_centered(47, 0, x_offset, y_offset + 42, 240, FONT_NORMAL_GREEN);
            break;
        case EMPIRE_CITY_OURS:
            lang_text_draw_centered(47, 1, x_offset, y_offset + 42, 240, FONT_NORMAL_GREEN);
            break;
        case EMPIRE_CITY_TRADE:
            draw_trade_city_info(object, city);
            break;
    }
}
function draw_roman_army_info(object: empire_object) {
    if (city_military_distant_battle_roman_army_is_traveling()) {
        if (city_military_distant_battle_roman_months_traveled() == object.distant_battle_travel_months) {
            let x_offset: number = (data.x_min + data.x_max - 240) / 2;
            let y_offset: number = data.y_max - 68;
            let text_id: number;
            if (city_military_distant_battle_roman_army_is_traveling_forth()) {
                text_id = 15;
            } else {
                text_id = 16;
            }
            lang_text_draw_multiline(47, text_id, x_offset, y_offset, 240, FONT_NORMAL_GREEN);
        }
    }
}
function draw_enemy_army_info(object: empire_object) {
    if (city_military_months_until_distant_battle() > 0) {
        if (city_military_distant_battle_enemy_months_traveled() == object.distant_battle_travel_months) {
            lang_text_draw_multiline(47, 14,
                (data.x_min + data.x_max - 240) / 2,
                data.y_max - 68,
                240, FONT_NORMAL_GREEN);
        }
    }
}
function draw_object_info() {
    let selected_object: number = empire_selected_object();
    if (selected_object) {
        let object: empire_object = empire_object_get(selected_object - 1);
        switch (object.type) {
            case EMPIRE_OBJECT_CITY:
                draw_city_info(object);
                break
            case EMPIRE_OBJECT_ROMAN_ARMY:
                draw_roman_army_info(object);
                break
            case EMPIRE_OBJECT_ENEMY_ARMY:
                draw_enemy_army_info(object);
                break
        }
    } else {
        lang_text_draw_centered(47, 8, data.x_min, data.y_max - 48, data.x_max - data.x_min, FONT_NORMAL_GREEN);
    }
}
function draw_background() {
    let s_width: number = screen_width();
    let s_height: number = screen_height();
    data.x_min = s_width <= MAX_WIDTH ? 0 : (s_width - MAX_WIDTH) / 2;
    data.x_max = s_width <= MAX_WIDTH ? s_width : data.x_min + MAX_WIDTH;
    data.y_min = s_height <= MAX_HEIGHT ? 0 : (s_height - MAX_HEIGHT) / 2;
    data.y_max = s_height <= MAX_HEIGHT ? s_height : data.y_min + MAX_HEIGHT;
    if (data.x_min || data.y_min) {
        graphics_clear_screen();
    }
}
function draw_empire_object(obj: empire_object) {
    if (obj.type == EMPIRE_OBJECT_LAND_TRADE_ROUTE || obj.type == EMPIRE_OBJECT_SEA_TRADE_ROUTE) {
        if (!empire_city_is_trade_route_open(obj.trade_route_id)) {
            return;
        }
    }
    let x: number;
    let y: number;
    let image_id: number;
    if (scenario_empire_is_expanded()) {
        x = obj.expanded.x;
        y = obj.expanded.y;
        image_id = obj.expanded.image_id;
    } else {
        x = obj.x;
        y = obj.y;
        image_id = obj.image_id;
    }
    if (obj.type == EMPIRE_OBJECT_CITY) {
        let city: empire_city = empire_city_get(empire_city_get_for_object(obj.id));
        if (city.type == EMPIRE_CITY_DISTANT_FOREIGN ||
            city.type == EMPIRE_CITY_FUTURE_ROMAN) {
            image_id = image_group(GROUP_EMPIRE_FOREIGN_CITY);
        } else if (city.type == EMPIRE_CITY_TRADE) {
            image_id = image_group(GROUP_EMPIRE_CITY_TRADE);
        }
    }
    if (obj.type == EMPIRE_OBJECT_BATTLE_ICON) {
        return;
    }
    if (obj.type == EMPIRE_OBJECT_ENEMY_ARMY) {
        if (city_military_months_until_distant_battle() <= 0) {
            return;
        }
        if (city_military_distant_battle_enemy_months_traveled() != obj.distant_battle_travel_months) {
            return;
        }
    }
    if (obj.type == EMPIRE_OBJECT_ROMAN_ARMY) {
        if (!city_military_distant_battle_roman_army_is_traveling()) {
            return;
        }
        if (city_military_distant_battle_roman_months_traveled() != obj.distant_battle_travel_months) {
            return;
        }
    }
    image_draw(image_id, data.x_draw_offset + x, data.y_draw_offset + y);
    let img: image = image_get(image_id);
    if (img.animation_speed_id) {
        let new_animation: number = empire_object_update_animation(obj, image_id);
        image_draw(image_id + new_animation,
            data.x_draw_offset + x + img.sprite_offset_x,
            data.y_draw_offset + y + img.sprite_offset_y);
    }
}
function draw_invasion_warning(x: number, y: number, image_id: number) {
    image_draw(image_id, data.x_draw_offset + x, data.y_draw_offset + y);
}
function draw_map() {
    graphics_set_clip_rectangle(data.x_min + 16, data.y_min + 16,
        data.x_max - data.x_min - 32, data.y_max - data.y_min - 136);
    empire_set_viewport(data.x_max - data.x_min - 32, data.y_max - data.y_min - 136);
    data.x_draw_offset = data.x_min + 16;
    data.y_draw_offset = data.y_min + 16;
    empire_adjust_scroll(data.x_draw_offset, data.y_draw_offset);
    image_draw(image_group(GROUP_EMPIRE_MAP), data.x_draw_offset, data.y_draw_offset);
    empire_object_foreach(draw_empire_object);
    scenario_invasion_foreach_warning(draw_invasion_warning);
    graphics_reset_clip_rectangle();
}
function draw_city_name(city: empire_city) {
    let image_base: number = image_group(GROUP_EMPIRE_PANELS);
    image_draw(image_base + 6, data.x_min + 2, data.y_max - 199);
    image_draw(image_base + 7, data.x_max - 84, data.y_max - 199);
    image_draw(image_base + 8, (data.x_min + data.x_max - 332) / 2, data.y_max - 181);
    if (city) {
        lang_text_draw_centered(21, city.name_id,
            (data.x_min + data.x_max - 332) / 2 + 64, data.y_max - 118, 268, FONT_LARGE_BLACK);
    }
}
function draw_panel_buttons(city: empire_city) {
    image_buttons_draw(data.x_min + 20, data.y_max - 44, image_button_help, 1);
    image_buttons_draw(data.x_max - 44, data.y_max - 44, image_button_return_to_city, 1);
    image_buttons_draw(data.x_max - 44, data.y_max - 100, image_button_advisor, 1);
    if (city) {
        if (city.type == EMPIRE_CITY_TRADE && !city.is_open) {
            button_border_draw((data.x_min + data.x_max - 500) / 2 + 30, data.y_max - 49, 440,
                26, data.selected_button);
        }
    }
}
function draw_foreground() {
    draw_map();
    let city: empire_city = null;
    let selected_object: number = empire_selected_object();
    if (selected_object) {
        let object: empire_object = empire_object_get(selected_object - 1);
        if (object.type == EMPIRE_OBJECT_CITY) {
            data.selected_city = empire_city_get_for_object(object.id);
            city = empire_city_get(data.selected_city);
        }
    }
    draw_paneling();
    draw_city_name(city);
    draw_panel_buttons(city);
    draw_object_info();
}
function is_outside_map(x: number, y: number) {
    return (x < data.x_min + 16 || x >= data.x_max - 16 ||
        y < data.y_min + 16 || y >= data.y_max - 120);
}
function determine_selected_object(m: mouse) {
    if (!m.left.went_up || data.finished_scroll || is_outside_map(m.x, m.y)) {
        data.finished_scroll = 0;
        return;
    }
    empire_select_object(m.x - data.x_min - 16, m.y - data.y_min - 16);
    window_invalidate();
}
function handle_input(m: mouse, h: hotkeys) {
    let position: pixel_offset;
    if (scroll_get_delta(m, position, SCROLL_TYPE_EMPIRE)) {
        empire_scroll_map(position.x, position.y);
    }
    if (m.is_touch) {
        let t: touch = touch_get_earliest();
        if (!is_outside_map(t.current_point.x, t.current_point.y)) {
            if (t.has_started) {
                data.is_scrolling = 1;
                scroll_drag_start(1);
            }
        }
        if (t.has_ended) {
            data.is_scrolling = 0;
            data.finished_scroll = !touch_was_click(t);
            scroll_drag_end();
        }
    }
    data.focus_button_id = 0;
    data.focus_resource = 0;
    let button_id: number;
    image_buttons_handle_mouse(m, data.x_min + 20, data.y_max - 44, image_button_help, 1, button_id);
    if (button_id) {
        data.focus_button_id = 1;
    }
    image_buttons_handle_mouse(m, data.x_max - 44, data.y_max - 44, image_button_return_to_city, 1, button_id);
    if (button_id) {
        data.focus_button_id = 2;
    }
    image_buttons_handle_mouse(m, data.x_max - 44, data.y_max - 100, image_button_advisor, 1, button_id);
    if (button_id) {
        data.focus_button_id = 3;
    }
    button_id = 0;
    determine_selected_object(m);
    let selected_object: number = empire_selected_object();
    if (selected_object) {
        let obj: empire_object = empire_object_get(selected_object - 1);
        if (obj.type == EMPIRE_OBJECT_CITY) {
            data.selected_city = empire_city_get_for_object(selected_object - 1);
            let city: empire_city = empire_city_get(data.selected_city);
            if (city.type == EMPIRE_CITY_TRADE) {
                if (city.is_open) {
                    let x_offset: number = (data.x_min + data.x_max - 500) / 2;
                    let y_offset: number = data.y_max - 113;
                    let index_sell: number = 0;
                    let index_buy: number = 0;
                    for (let resource: number = RESOURCE_MIN; resource < RESOURCE_MAX; resource++) {
                        if (empire_object_city_sells_resource(obj.id, resource)) {
                            generic_buttons_handle_mouse(m, x_offset + 120 + 104 * index_sell, y_offset + 31,
                                generic_button_trade_resource + resource - 1, 1, button_id);
                            index_sell++;
                        } else if (empire_object_city_buys_resource(obj.id, resource)) {
                            generic_buttons_handle_mouse(m, x_offset + 120 + 104 * index_buy, y_offset + 62,
                                generic_button_trade_resource + resource - 1, 1, button_id);
                            index_buy++;
                        }
                        if (button_id) {
                            data.focus_resource = resource;
                            break;
                        }
                    }
                } else {
                    generic_buttons_handle_mouse(
                        m, (data.x_min + data.x_max - 500) / 2, data.y_max - 105,
                        generic_button_open_trade, 1, data.selected_button);
                }
            }
        }
        if (input_go_back_requested(m, h)) {
            empire_clear_selected_object();
            window_invalidate();
        }
    } else {
        if (input_go_back_requested(m, h)) {
            window_city_show();
        }
    }
}
function is_mouse_hit(c: tooltip_context, x: number, y: number, size: number) {
    let mx: number = c.mouse_x;
    let my: number = c.mouse_y;
    return x <= mx && mx < x + size && y <= my && my < y + size;
}
function get_tooltip_resource(c: tooltip_context) {
    let city: empire_city = empire_city_get(data.selected_city);
    if (city.type != EMPIRE_CITY_TRADE || city.is_open) {
        return 0;
    }
    let object_id: number = empire_selected_object() - 1;
    let x_offset: number = (data.x_min + data.x_max - 500) / 2;
    let y_offset: number = data.y_max - 113;
    let item_offset: number = lang_text_get_width(47, 5, FONT_NORMAL_GREEN);
    for (let r: number = RESOURCE_MIN; r < RESOURCE_MAX; r++) {
        if (empire_object_city_sells_resource(object_id, r)) {
            if (is_mouse_hit(c, x_offset + 60 + item_offset, y_offset + 33, 26)) {
                return r;
            }
            item_offset += 32;
        }
    }
    item_offset += lang_text_get_width(47, 4, FONT_NORMAL_GREEN);
    for (let r: number = RESOURCE_MIN; r <= RESOURCE_MAX; r++) {
        if (empire_object_city_buys_resource(object_id, r)) {
            if (is_mouse_hit(c, x_offset + 110 + item_offset, y_offset + 33, 26)) {
                return r;
            }
            item_offset += 32;
        }
    }
    return 0;
}
function get_tooltip_trade_route_type(c: tooltip_context) {
    let selected_object: number = empire_selected_object();
    if (!selected_object || empire_object_get(selected_object - 1).type != EMPIRE_OBJECT_CITY) {
        return;
    }
    data.selected_city = empire_city_get_for_object(selected_object - 1);
    let city: empire_city = empire_city_get(data.selected_city);
    if (city.type != EMPIRE_CITY_TRADE || city.is_open) {
        return;
    }
    let x_offset: number = (data.x_min + data.x_max + 300) / 2;
    let y_offset: number = data.y_max - 41;
    let y_offset_max: number = y_offset + 22 - 2 * city.is_sea_trade;
    if (c.mouse_x >= x_offset && c.mouse_x < x_offset + 32 &&
        c.mouse_y >= y_offset && c.mouse_y < y_offset_max) {
        c.type = TOOLTIP_BUTTON;
        c.text_group = 44;
        c.text_id = 28 + city.is_sea_trade;
    }
}
function get_tooltip(c: tooltip_context) {
    let resource: number = data.focus_resource ? data.focus_resource : get_tooltip_resource(c);
    if (resource) {
        c.type = TOOLTIP_BUTTON;
        c.text_id = 131 + resource;
    } else if (data.focus_button_id) {
        c.type = TOOLTIP_BUTTON;
        switch (data.focus_button_id) {
            case 1:
                c.text_id = 1;
                break;
            case 2:
                c.text_id = 2;
                break;
            case 3:
                c.text_id = 69;
                break;
        }
    } else {
        get_tooltip_trade_route_type(c);
    }
}
function button_help(param1: number, param2: number) {
    window_message_dialog_show(MESSAGE_DIALOG_EMPIRE_MAP, 0);
}
function button_return_to_city(param1: number, param2: number) {
    window_city_show();
}
function button_advisor(advisor: number, param2: number) {
    window_advisors_show_advisor(advisor);
}
function button_show_resource_window(resource: number, param2: number) {
    window_resource_settings_show(resource);
}
function confirmed_open_trade(accepted: number) {
    if (accepted) {
        empire_city_open_trade(data.selected_city);
        building_menu_update();
        window_trade_opened_show(data.selected_city);
    }
}
function button_open_trade(param1: number, param2: number) {
    window_popup_dialog_show(POPUP_DIALOG_OPEN_TRADE, confirmed_open_trade, 2);
}
export function window_empire_show() {
    let window: window_type = new window_type(
        WINDOW_EMPIRE,
        draw_background,
        draw_foreground,
        handle_input,
        get_tooltip
    );
    init();
    window_show(window);
}
export function window_empire_show_checked() {
    let avail: tutorial_availability = tutorial_advisor_empire_availability();
    if (avail == AVAILABLE) {
        window_empire_show();
    } else {
        city_warning_show(avail == NOT_AVAILABLE ? WARNING_NOT_AVAILABLE : WARNING_NOT_AVAILABLE_YET);
    }
}
