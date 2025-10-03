
import { resource_type } from 'game/resource';
import RESOURCE_MEAT = resource_type.RESOURCE_MEAT;
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
import { resource_type } from 'game/resource';
import { workshop_type } from 'game/resource';
import { resource_image_type } from 'game/resource';
import RESOURCE_IMAGE_ICON = resource_image_type.RESOURCE_IMAGE_ICON;
import { resource_image_type } from 'game/resource';
import { resource_image_offset } from 'game/resource';;
import { buffer } from 'core/buffer';
import { building_type } from 'building/type';
import BUILDING_WHARF = building_type.BUILDING_WHARF;
import { building_type } from 'building/type';
import { building_count_industry_active } from 'building/count';
import { building_count_industry_total } from 'building/count';
import { advisor_type } from 'city/constants';
import { resource_trade_status } from 'city/constants';
import TRADE_STATUS_NONE = resource_trade_status.TRADE_STATUS_NONE;
import TRADE_STATUS_IMPORT = resource_trade_status.TRADE_STATUS_IMPORT;
import TRADE_STATUS_EXPORT = resource_trade_status.TRADE_STATUS_EXPORT;
import { resource_trade_status } from 'city/constants';
import { resource_list } from 'city/resource';
import { city_resource_count } from 'city/resource';
import { city_resource_trade_status } from 'city/resource';
import { city_resource_cycle_trade_status } from 'city/resource';
import { city_resource_export_over } from 'city/resource';
import { city_resource_change_export_over } from 'city/resource';
import { city_resource_is_stockpiled } from 'city/resource';
import { city_resource_toggle_stockpiled } from 'city/resource';
import { city_resource_is_mothballed } from 'city/resource';
import { city_resource_toggle_mothballed } from 'city/resource';
import { direction_type } from 'core/direction';
import { group_terrain } from 'core/image_group';
import GROUP_RESOURCE_ICONS = group_terrain.GROUP_RESOURCE_ICONS;
import GROUP_CONTEXT_ICONS = group_terrain.GROUP_CONTEXT_ICONS;
import { empire_city } from 'empire/city';
import { empire_can_import_resource } from 'empire/city';
import { empire_can_export_resource } from 'empire/city';
import { empire_can_produce_resource } from 'empire/city';
import { time_millis } from 'core/time';
import { touch_coords } from 'input/touch';
import { touch_mode } from 'input/touch';
import { touch } from 'input/touch';
import { mouse_button } from 'input/mouse';
import { scroll_state } from 'input/mouse';
import { mouse } from 'input/mouse';
import { mouse_in_dialog } from 'input/mouse';
import { arrow_button } from 'graphics/arrow_button';
import { arrow_buttons_draw } from 'graphics/arrow_button';
import { arrow_buttons_handle_mouse } from 'graphics/arrow_button';
import { button_none } from 'graphics/button';
import { button_border_draw } from 'graphics/button';
import { generic_button } from 'graphics/generic_button';
import { generic_buttons_handle_mouse } from 'graphics/generic_button';
import { color_t } from 'graphics/color';
import { clip_code } from 'graphics/graphics';
import { clip_info } from 'graphics/graphics';
import { graphics_in_dialog } from 'graphics/graphics';
import { graphics_reset_dialog } from 'graphics/graphics';
import { language_type } from 'core/locale';
import { encoding_type } from 'core/encoding';
import { image } from 'core/image';
import { image_group } from 'core/image';
import { font_t } from 'graphics/font';
import FONT_NORMAL_BLACK = font_t.FONT_NORMAL_BLACK;
import FONT_LARGE_BLACK = font_t.FONT_LARGE_BLACK;
import { font_t } from 'graphics/font';
import { font_definition } from 'graphics/font';
import { image_draw } from 'graphics/image';
import { ib } from 'graphics/image_button';
import IB_NORMAL = ib.IB_NORMAL;
import { image_button } from 'graphics/image_button';
import { image_buttons_draw } from 'graphics/image_button';
import { image_buttons_handle_mouse } from 'graphics/image_button';
import { lang_text_draw } from 'graphics/lang_text';
import { lang_text_draw_centered } from 'graphics/lang_text';
import { lang_text_draw_amount } from 'graphics/lang_text';
import { outer_panel_draw } from 'graphics/panel';
import { text_draw_number } from 'graphics/text';
import { tooltip_type } from 'graphics/tooltip';
import { tooltip_extra_text_type } from 'graphics/tooltip';
import { tooltip_context } from 'graphics/tooltip';
import { key_type } from 'input/keys';
import { key_modifier_type } from 'input/keys';
import { hotkey_action } from 'core/hotkey_config';
import { hotkey_mapping } from 'core/hotkey_config';
import { hotkeys } from 'input/hotkey';
import { window_id } from 'graphics/window';
import WINDOW_RESOURCE_SETTINGS = window_id.WINDOW_RESOURCE_SETTINGS;
import { window_id } from 'graphics/window';
import { window_type } from 'graphics/window';
import { window_draw_underlying_window } from 'graphics/window';
import { window_show } from 'graphics/window';
import { window_go_back } from 'graphics/window';
import { input_go_back_requested } from 'input/input';
import { scenario_building_allowed } from 'scenario/building';
import { advisor_window_type } from 'window/advisors';
import { message_dialog } from 'window/message_dialog';
import MESSAGE_DIALOG_INDUSTRY = message_dialog.MESSAGE_DIALOG_INDUSTRY;
import { window_message_dialog_show } from 'window/message_dialog';
let resource_image_buttons: image_button[] = new Array().fill({
    { 58, 332, 27, 27, IB_NORMAL, GROUP_CONTEXT_ICONS, 0, button_help, button_none, 0, 0, 1},
    { 558, 335, 24, 24, IB_NORMAL, GROUP_CONTEXT_ICONS, 4, button_ok, button_none, 0, 0, 1}
});
let resource_arrow_buttons: arrow_button[] = new Array().fill({
    { 314, 215, 17, 24, button_export_up_down, 1, 0},
    { 338, 215, 15, 24, button_export_up_down, 0, 0}
});
let resource_generic_buttons: generic_button[] = new Array().fill({
    { 98, 250, 432, 30, button_toggle_industry, button_none, 0, 0},
    { 98, 212, 432, 30, button_toggle_trade, button_none, 0, 0},
    { 98, 288, 432, 50, button_toggle_stockpile, button_none, 0, 0},
});
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
    if (image_buttons_handle_mouse(m_dialog, 0, 0, resource_image_buttons, 2, 0)) {
        return;
    }
    if (city_resource_trade_status(data.resource) == TRADE_STATUS_EXPORT) {
        let button: number = 0;
        arrow_buttons_handle_mouse(m_dialog, 0, 0, resource_arrow_buttons, 2, button);
        if (button) {
            return;
        }
    }
    if (generic_buttons_handle_mouse(m_dialog, 0, 0, resource_generic_buttons, 3, data.focus_button_id)) {
        return;
    }
    if (input_go_back_requested(m, h)) {
        window_go_back();
    }
}
function button_help(param1: number, param2: number) {
    window_message_dialog_show(MESSAGE_DIALOG_INDUSTRY, 0);
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
    let window: window_type = {
        WINDOW_RESOURCE_SETTINGS,
        draw_background,
        draw_foreground,
        handle_input
    };
    init(resource);
    window_show(window);
}
