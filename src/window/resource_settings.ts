
import { building_count_industry_active, building_count_industry_total } from 'building/count';
import { building_type } from 'building/type';
import { resource_trade_status } from 'city/constants';
import { city_resource_change_export_over, city_resource_count, city_resource_cycle_trade_status, city_resource_export_over, city_resource_is_mothballed, city_resource_is_stockpiled, city_resource_toggle_mothballed, city_resource_toggle_stockpiled, city_resource_trade_status } from 'city/resource';
import { image_group } from 'core/image';
import { group_terrain } from 'core/image_group';
import { empire_can_export_resource, empire_can_import_resource, empire_can_produce_resource } from 'empire/city';
import { resource_image_offset, resource_image_type, resource_type } from 'game/resource';
import { arrow_button, arrow_buttons_draw, arrow_buttons_handle_mouse } from 'graphics/arrow_button';
import { button_border_draw, button_none } from 'graphics/button';
import { font_t } from 'graphics/font';
import { generic_button, generic_buttons_handle_mouse } from 'graphics/generic_button';
import { graphics_in_dialog, graphics_reset_dialog } from 'graphics/graphics';
import { image_draw } from 'graphics/image';
import { ib, image_button, image_buttons_draw, image_buttons_handle_mouse } from 'graphics/image_button';
import { lang_text_draw, lang_text_draw_amount, lang_text_draw_centered } from 'graphics/lang_text';
import { outer_panel_draw } from 'graphics/panel';
import { text_draw_number } from 'graphics/text';
import { window_draw_underlying_window, window_go_back, window_id, window_show, window_type } from 'graphics/window';
import { hotkeys } from 'input/hotkey';
import { input_go_back_requested } from 'input/input';
import { mouse, mouse_in_dialog } from 'input/mouse';
import { scenario_building_allowed } from 'scenario/building';
import { message_dialog, window_message_dialog_show } from 'window/message_dialog';
import { Ref } from '../../ext/crt';
import RESOURCE_MEAT = resource_type.RESOURCE_MEAT;
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
import RESOURCE_IMAGE_ICON = resource_image_type.RESOURCE_IMAGE_ICON;
;
import BUILDING_WHARF = building_type.BUILDING_WHARF;
import TRADE_STATUS_NONE = resource_trade_status.TRADE_STATUS_NONE;
import TRADE_STATUS_IMPORT = resource_trade_status.TRADE_STATUS_IMPORT;
import TRADE_STATUS_EXPORT = resource_trade_status.TRADE_STATUS_EXPORT;
import GROUP_RESOURCE_ICONS = group_terrain.GROUP_RESOURCE_ICONS;
import GROUP_CONTEXT_ICONS = group_terrain.GROUP_CONTEXT_ICONS;
import FONT_NORMAL_BLACK = font_t.FONT_NORMAL_BLACK;
import FONT_LARGE_BLACK = font_t.FONT_LARGE_BLACK;
import IB_NORMAL = ib.IB_NORMAL;
import WINDOW_RESOURCE_SETTINGS = window_id.WINDOW_RESOURCE_SETTINGS;
import MESSAGE_DIALOG_INDUSTRY = message_dialog.MESSAGE_DIALOG_INDUSTRY;
let resource_image_buttons: image_button[] = [
    new image_button(58, 332, 27, 27, IB_NORMAL, GROUP_CONTEXT_ICONS, 0, button_help, button_none, 0, 0, 1),
    new image_button(558, 335, 24, 24, IB_NORMAL, GROUP_CONTEXT_ICONS, 4, button_ok, button_none, 0, 0, 1)
];
let resource_arrow_buttons: arrow_button[] = [
    new arrow_button(314, 215, 17, 24, button_export_up_down, 1, 0),
    new arrow_button(338, 215, 15, 24, button_export_up_down, 0, 0)
];
let resource_generic_buttons: generic_button[] = [
    new generic_button(98, 250, 432, 30, button_toggle_industry, button_none, 0, 0),
    new generic_button(98, 212, 432, 30, button_toggle_trade, button_none, 0, 0),
    new generic_button(98, 288, 432, 50, button_toggle_stockpile, button_none, 0, 0),
];
export class unnamed46_8 {
    public resource: resource_type = null;
    public focus_button_id: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.resource = args[0]);
        args.length >= 2 && (this.focus_button_id = args[1]);
    }
}
let data: unnamed46_8 = new unnamed46_8();
function init(resource: resource_type) {
    data.resource = resource;
}
function draw_background() {
    window_draw_underlying_window();
}
function draw_foreground() {
    graphics_in_dialog();
    outer_panel_draw(48, 128, 34, 15);
    let image_offset: number = data.resource + resource_image_offset(data.resource, RESOURCE_IMAGE_ICON);
    image_draw(image_group(GROUP_RESOURCE_ICONS) + image_offset, 58, 136);
    lang_text_draw(23, data.resource, 92, 137, FONT_LARGE_BLACK);
    if (empire_can_produce_resource(data.resource)) {
        let total_buildings: number = building_count_industry_total(data.resource);
        let active_buildings: number = building_count_industry_active(data.resource);
        if (building_count_industry_total(data.resource) <= 0) {
            lang_text_draw(54, 7, 98, 172, FONT_NORMAL_BLACK);
        } else if (city_resource_is_mothballed(data.resource)) {
            let width: number = text_draw_number(total_buildings, '@', " ", 98, 172, FONT_NORMAL_BLACK);
            if (total_buildings == 1) {
                lang_text_draw(54, 10, 98 + width, 172, FONT_NORMAL_BLACK);
            } else {
                lang_text_draw(54, 11, 98 + width, 172, FONT_NORMAL_BLACK);
            }
        } else if (total_buildings == active_buildings) {
            let width: number = text_draw_number(total_buildings, '@', " ", 98, 172, FONT_NORMAL_BLACK);
            if (total_buildings == 1) {
                lang_text_draw(54, 8, 98 + width, 172, FONT_NORMAL_BLACK);
            } else {
                lang_text_draw(54, 9, 98 + width, 172, FONT_NORMAL_BLACK);
            }
        } else {
            let idle_buildings: number = total_buildings - active_buildings;
            let width: number = text_draw_number(active_buildings, '@', " ", 98, 172, FONT_NORMAL_BLACK);
            width += lang_text_draw(54, 12, 98 + width, 172, FONT_NORMAL_BLACK)
            width += text_draw_number(idle_buildings, '@', " ",
                98 + width, 172, FONT_NORMAL_BLACK)
            if (idle_buildings == 1) {
                lang_text_draw(54, 14, 98 + width, 172, FONT_NORMAL_BLACK);
            } else {
                lang_text_draw(54, 13, 98 + width, 172, FONT_NORMAL_BLACK);
            }
        }
    } else if (data.resource != RESOURCE_MEAT || !scenario_building_allowed(BUILDING_WHARF)) {
        lang_text_draw(54, 25, 98, 172, FONT_NORMAL_BLACK);
    }
    let width: number = lang_text_draw_amount(8, 10, city_resource_count(data.resource), 98, 192, FONT_NORMAL_BLACK);
    lang_text_draw(54, 15, 98 + width, 192, FONT_NORMAL_BLACK);
    let trade_flags: number = TRADE_STATUS_NONE;
    let trade_status: number = city_resource_trade_status(data.resource);
    if (empire_can_import_resource(data.resource)) {
        trade_flags |= TRADE_STATUS_IMPORT
    }
    if (empire_can_export_resource(data.resource)) {
        trade_flags |= TRADE_STATUS_EXPORT
    }
    if (!trade_flags) {
        lang_text_draw(54, 24, 98, 212, FONT_NORMAL_BLACK);
    } else {
        button_border_draw(98, 212, 432, 30, data.focus_button_id == 2);
        switch (trade_status) {
            case TRADE_STATUS_NONE:
                lang_text_draw_centered(54, 18, 114, 221, 400, FONT_NORMAL_BLACK);
                break
            case TRADE_STATUS_IMPORT:
                lang_text_draw_centered(54, 19, 114, 221, 400, FONT_NORMAL_BLACK);
                break
            case TRADE_STATUS_EXPORT:
                lang_text_draw_centered(54, 20, 114, 221, 200, FONT_NORMAL_BLACK);
                break
        }
    }
    if (trade_status == TRADE_STATUS_EXPORT) {
        lang_text_draw_amount(8, 10, city_resource_export_over(data.resource), 386, 221, FONT_NORMAL_BLACK);
    }
    if (building_count_industry_total(data.resource) > 0) {
        button_border_draw(98, 250, 432, 30, data.focus_button_id == 1);
        if (city_resource_is_mothballed(data.resource)) {
            lang_text_draw_centered(54, 17, 114, 259, 400, FONT_NORMAL_BLACK);
        } else {
            lang_text_draw_centered(54, 16, 114, 259, 400, FONT_NORMAL_BLACK);
        }
    }
    button_border_draw(98, 288, 432, 50, data.focus_button_id == 3);
    if (city_resource_is_stockpiled(data.resource)) {
        lang_text_draw_centered(54, 26, 114, 296, 400, FONT_NORMAL_BLACK);
        lang_text_draw_centered(54, 27, 114, 316, 400, FONT_NORMAL_BLACK);
    } else {
        lang_text_draw_centered(54, 28, 114, 296, 400, FONT_NORMAL_BLACK);
        lang_text_draw_centered(54, 29, 114, 316, 400, FONT_NORMAL_BLACK);
    }
    image_buttons_draw(0, 0, resource_image_buttons, 2);
    if (trade_status == TRADE_STATUS_EXPORT) {
        arrow_buttons_draw(0, 0, resource_arrow_buttons, 2);
    }
    graphics_reset_dialog();
}
function handle_input(m: mouse, h: hotkeys) {
    let m_dialog: mouse = mouse_in_dialog(m);
    if (image_buttons_handle_mouse(m_dialog, 0, 0, resource_image_buttons, 2, null)) {
        return;
    }
    if (city_resource_trade_status(data.resource) == TRADE_STATUS_EXPORT) {
        let button: number = arrow_buttons_handle_mouse(m_dialog, 0, 0, resource_arrow_buttons, 2, 0);
        if (button) {
            return;
        }
    }
    const focusRef = new Ref(data.focus_button_id);
    if (generic_buttons_handle_mouse(m_dialog, 0, 0, resource_generic_buttons, 3, focusRef)) {
        data.focus_button_id = focusRef.v;
        return;
    }
    data.focus_button_id = focusRef.v;
    if (input_go_back_requested(m, h)) {
        window_go_back();
    }
}
function button_help(param1: number, param2: number) {
    window_message_dialog_show(MESSAGE_DIALOG_INDUSTRY, null);
}
function button_ok(param1: number, param2: number) {
    window_go_back();
}
function button_export_up_down(is_down: number, param2: number) {
    city_resource_change_export_over(data.resource, is_down ? -1 : 1);
}
function button_toggle_industry(param1: number, param2: number) {
    if (building_count_industry_total(data.resource) > 0) {
        city_resource_toggle_mothballed(data.resource);
    }
}
function button_toggle_trade(param1: number, param2: number) {
    city_resource_cycle_trade_status(data.resource);
}
function button_toggle_stockpile(param1: number, param2: number) {
    city_resource_toggle_stockpiled(data.resource);
}
export function window_resource_settings_show(resource: resource_type) {
    let window: window_type = new window_type(
        WINDOW_RESOURCE_SETTINGS,
        draw_background,
        draw_foreground,
        handle_input
    );
    init(resource);
    window_show(window);
}
