import { BLOCK_SIZE } from 'graphics/panel';

import { advisor_type } from 'city/constants';
import ADVISOR_NONE = advisor_type.ADVISOR_NONE;
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

import { city_culture_update_coverage } from 'city/culture';
import { city_finance_calculate_totals, city_finance_estimate_taxes, city_finance_estimate_wages, city_finance_update_interest, city_finance_update_salary } from 'city/finance';
import { city_houses_calculate_culture_demands } from 'city/houses';
import { city_labor_allocate_workers } from 'city/labor';
import { city_migration_determine_no_immigration_cause } from 'city/migration';
import { city_ratings_update_explanations } from 'city/ratings';
import { city_resource_calculate_food_stocks_and_supply_wheat } from 'city/resource';
import { city_warning_show, warning_type } from 'city/warning';
import { image_group } from 'core/image';
import { group_terrain } from 'core/image_group';
import { formation_calculate_figures } from 'figure/formation';
import { resource_type } from 'game/resource';
import { setting_last_advisor, setting_set_last_advisor } from 'game/settings';
import { tutorial_advisor_empire_availability, tutorial_availability } from 'game/tutorial';
import { button_none } from 'graphics/button';
import { generic_button, generic_buttons_handle_mouse } from 'graphics/generic_button';
import { graphics_in_dialog, graphics_reset_dialog } from 'graphics/graphics';
import { image_draw, image_draw_fullscreen_background } from 'graphics/image';
import { ib, image_button, image_buttons_draw, image_buttons_handle_mouse } from 'graphics/image_button';
import { tooltip_context } from 'graphics/tooltip';
import { window_id, window_invalidate, window_show, window_type } from 'graphics/window';
import { hotkeys } from 'input/hotkey';
import { input_go_back_requested } from 'input/input';
import { mouse, mouse_in_dialog } from 'input/mouse';
import { window_city_show } from 'window/city';
import { message_dialog, window_message_dialog_show } from 'window/message_dialog';
import { Ref } from '../../ext/crt';
export class advisor_window_type {
    public draw_background: (() => number) | null = null;
    public draw_foreground: (() => void) | null = null;
    public handle_mouse: ((m: mouse) => number) | null = null;
    public get_tooltip_text: (() => number) | null = null;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.draw_background = args[0]);
        args.length >= 2 && (this.draw_foreground = args[1]);
        args.length >= 3 && (this.handle_mouse = args[2]);
        args.length >= 4 && (this.get_tooltip_text = args[3]);
    }
};
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
import WARNING_NOT_AVAILABLE = warning_type.WARNING_NOT_AVAILABLE;
import WARNING_NOT_AVAILABLE_YET = warning_type.WARNING_NOT_AVAILABLE_YET;
import GROUP_PANEL_WINDOWS = group_terrain.GROUP_PANEL_WINDOWS;
import GROUP_ADVISOR_ICONS = group_terrain.GROUP_ADVISOR_ICONS;
import GROUP_CONTEXT_ICONS = group_terrain.GROUP_CONTEXT_ICONS;
import GROUP_ADVISOR_BACKGROUND = group_terrain.GROUP_ADVISOR_BACKGROUND;
import AVAILABLE = tutorial_availability.AVAILABLE;
import NOT_AVAILABLE = tutorial_availability.NOT_AVAILABLE;
import NOT_AVAILABLE_YET = tutorial_availability.NOT_AVAILABLE_YET;
import IB_NORMAL = ib.IB_NORMAL;
// tooltip_type is not exported, use the value directly
const TOOLTIP_BUTTON = 1;
import WINDOW_ADVISORS = window_id.WINDOW_ADVISORS;
import MESSAGE_DIALOG_ABOUT = message_dialog.MESSAGE_DIALOG_ABOUT;
import MESSAGE_DIALOG_ADVISOR_LABOR = message_dialog.MESSAGE_DIALOG_ADVISOR_LABOR;
import MESSAGE_DIALOG_ADVISOR_MILITARY = message_dialog.MESSAGE_DIALOG_ADVISOR_MILITARY;
import MESSAGE_DIALOG_ADVISOR_IMPERIAL = message_dialog.MESSAGE_DIALOG_ADVISOR_IMPERIAL;
import MESSAGE_DIALOG_ADVISOR_RATINGS = message_dialog.MESSAGE_DIALOG_ADVISOR_RATINGS;
import MESSAGE_DIALOG_ADVISOR_TRADE = message_dialog.MESSAGE_DIALOG_ADVISOR_TRADE;
import MESSAGE_DIALOG_ADVISOR_POPULATION = message_dialog.MESSAGE_DIALOG_ADVISOR_POPULATION;
import MESSAGE_DIALOG_ADVISOR_HEALTH = message_dialog.MESSAGE_DIALOG_ADVISOR_HEALTH;
import MESSAGE_DIALOG_ADVISOR_EDUCATION = message_dialog.MESSAGE_DIALOG_ADVISOR_EDUCATION;
import MESSAGE_DIALOG_ADVISOR_ENTERTAINMENT = message_dialog.MESSAGE_DIALOG_ADVISOR_ENTERTAINMENT;
import MESSAGE_DIALOG_ADVISOR_RELIGION = message_dialog.MESSAGE_DIALOG_ADVISOR_RELIGION;
import MESSAGE_DIALOG_ADVISOR_FINANCIAL = message_dialog.MESSAGE_DIALOG_ADVISOR_FINANCIAL;
import MESSAGE_DIALOG_ADVISOR_CHIEF = message_dialog.MESSAGE_DIALOG_ADVISOR_CHIEF;
// TODO: These advisor modules need to be translated from C to TypeScript
// import { window_advisor_chief } from 'window/advisor/chief';
// import { window_advisor_education } from 'window/advisor/education';
// import { window_advisor_entertainment } from 'window/advisor/entertainment';
// import { window_advisor_financial } from 'window/advisor/financial';
// import { window_advisor_health } from 'window/advisor/health';
// import { window_advisor_imperial } from 'window/advisor/imperial';
// import { window_advisor_labor } from 'window/advisor/labor';
// import { window_advisor_military } from 'window/advisor/military';
// import { window_advisor_population } from 'window/advisor/population';
// import { window_advisor_ratings } from 'window/advisor/ratings';
// import { window_advisor_religion } from 'window/advisor/religion';
// import { window_advisor_trade } from 'window/advisor/trade';
// Temporary declarations until these modules are translated
declare function window_advisor_chief(): advisor_window_type;
declare function window_advisor_education(): advisor_window_type;
declare function window_advisor_entertainment(): advisor_window_type;
declare function window_advisor_financial(): advisor_window_type;
declare function window_advisor_health(): advisor_window_type;
declare function window_advisor_imperial(): advisor_window_type;
declare function window_advisor_labor(): advisor_window_type;
declare function window_advisor_military(): advisor_window_type;
declare function window_advisor_population(): advisor_window_type;
declare function window_advisor_ratings(): advisor_window_type;
declare function window_advisor_religion(): advisor_window_type;
declare function window_advisor_trade(): advisor_window_type;
let help_button: image_button = new image_button(
    11, - 7, 27, 27, IB_NORMAL, GROUP_CONTEXT_ICONS, 0, button_help, button_none, 0, 0, 1
);
let advisor_buttons: generic_button[] = [
    new generic_button(12, 1, 40, 40, button_change_advisor, button_none, ADVISOR_LABOR, 0),
    new generic_button(60, 1, 40, 40, button_change_advisor, button_none, ADVISOR_MILITARY, 0),
    new generic_button(108, 1, 40, 40, button_change_advisor, button_none, ADVISOR_IMPERIAL, 0),
    new generic_button(156, 1, 40, 40, button_change_advisor, button_none, ADVISOR_RATINGS, 0),
    new generic_button(204, 1, 40, 40, button_change_advisor, button_none, ADVISOR_TRADE, 0),
    new generic_button(252, 1, 40, 40, button_change_advisor, button_none, ADVISOR_POPULATION, 0),
    new generic_button(300, 1, 40, 40, button_change_advisor, button_none, ADVISOR_HEALTH, 0),
    new generic_button(348, 1, 40, 40, button_change_advisor, button_none, ADVISOR_EDUCATION, 0),
    new generic_button(396, 1, 40, 40, button_change_advisor, button_none, ADVISOR_ENTERTAINMENT, 0),
    new generic_button(444, 1, 40, 40, button_change_advisor, button_none, ADVISOR_RELIGION, 0),
    new generic_button(492, 1, 40, 40, button_change_advisor, button_none, ADVISOR_FINANCIAL, 0),
    new generic_button(540, 1, 40, 40, button_change_advisor, button_none, ADVISOR_CHIEF, 0),
    new generic_button(588, 1, 40, 40, button_change_advisor, button_none, 0, 0),
];
let sub_advisors: ((() => advisor_window_type) | null)[] = [
    null,
    window_advisor_labor,
    window_advisor_military,
    window_advisor_imperial,
    window_advisor_ratings,
    window_advisor_trade,
    window_advisor_population,
    window_advisor_health,
    window_advisor_education,
    window_advisor_entertainment,
    window_advisor_religion,
    window_advisor_financial,
    window_advisor_chief
];
let ADVISOR_TO_MESSAGE_TEXT: number[] = [
    MESSAGE_DIALOG_ABOUT,
    MESSAGE_DIALOG_ADVISOR_LABOR,
    MESSAGE_DIALOG_ADVISOR_MILITARY,
    MESSAGE_DIALOG_ADVISOR_IMPERIAL,
    MESSAGE_DIALOG_ADVISOR_RATINGS,
    MESSAGE_DIALOG_ADVISOR_TRADE,
    MESSAGE_DIALOG_ADVISOR_POPULATION,
    MESSAGE_DIALOG_ADVISOR_HEALTH,
    MESSAGE_DIALOG_ADVISOR_EDUCATION,
    MESSAGE_DIALOG_ADVISOR_ENTERTAINMENT,
    MESSAGE_DIALOG_ADVISOR_RELIGION,
    MESSAGE_DIALOG_ADVISOR_FINANCIAL,
    MESSAGE_DIALOG_ADVISOR_CHIEF
];
let current_advisor_window: advisor_window_type | null = null;
let current_advisor: advisor_type = ADVISOR_NONE;
let focus_button_id: Ref<number> = new Ref(0);
let advisor_height: number;
function set_advisor_window() {
    if (sub_advisors[current_advisor]) {
        current_advisor_window = sub_advisors[current_advisor]!();
    } else {
        current_advisor_window = null;
    }
}
function set_advisor(advisor: number) {
    current_advisor = advisor;
    setting_set_last_advisor(advisor);
    set_advisor_window();
}
function init() {
    city_labor_allocate_workers();
    city_finance_estimate_taxes();
    city_finance_estimate_wages();
    city_finance_update_interest();
    city_finance_update_salary();
    city_finance_calculate_totals();
    city_migration_determine_no_immigration_cause();
    city_houses_calculate_culture_demands();
    city_culture_update_coverage();
    city_resource_calculate_food_stocks_and_supply_wheat();
    formation_calculate_figures();
    city_ratings_update_explanations();
    set_advisor_window();
}
export function window_advisors_draw_dialog_background() {
    image_draw_fullscreen_background(image_group(GROUP_ADVISOR_BACKGROUND));
    graphics_in_dialog();
    image_draw(image_group(GROUP_PANEL_WINDOWS) + 13, 0, 432);
    for (let i: number = 0; i < 13; i++) {
        let selected_offset: number = 0;
        if (current_advisor && i == current_advisor - 1) {
            selected_offset = 13;
        }
        image_draw(image_group(GROUP_ADVISOR_ICONS) + i + selected_offset, 48 * i + 12, 441);
    }
    graphics_reset_dialog();
}
function draw_background() {
    window_advisors_draw_dialog_background();
    graphics_in_dialog();
    if (current_advisor_window) {
        advisor_height = current_advisor_window.draw_background!();
    }
    graphics_reset_dialog();
}
function draw_foreground() {
    graphics_in_dialog();
    image_buttons_draw(0, BLOCK_SIZE * (advisor_height - 2), [help_button], 1);
    graphics_reset_dialog();
    if (current_advisor_window && current_advisor_window.draw_foreground) {
        graphics_in_dialog();
        current_advisor_window.draw_foreground();
        graphics_reset_dialog();
    }
}
function handle_hotkeys(h: hotkeys) {
    if (h.show_advisor) {
        if (current_advisor == h.show_advisor) {
            window_city_show();
        } else {
            window_advisors_show_advisor(h.show_advisor);
        }
    }
}
function handle_input(m: mouse, h: hotkeys) {
    handle_hotkeys(h);
    let m_dialog: mouse = mouse_in_dialog(m);
    if (generic_buttons_handle_mouse(m_dialog, 0, 440, advisor_buttons, 13, focus_button_id)) {
        return;
    }
    let button_id: Ref<number> = new Ref(0);
    image_buttons_handle_mouse(m_dialog, 0, BLOCK_SIZE * (advisor_height - 2), [help_button], 1, button_id);
    if (button_id.v) {
        focus_button_id.v = -1;
    }
    if (current_advisor_window && current_advisor_window.handle_mouse && current_advisor_window.handle_mouse(m_dialog)) {
        return;
    }
    if (input_go_back_requested(m, h)) {
        window_city_show();
        return;
    }
}
function button_change_advisor(advisor: number, param2: number) {
    if (advisor) {
        set_advisor(advisor);
        window_invalidate();
    } else {
        window_city_show();
    }
}
function button_help(param1: number, param2: number) {
    if (current_advisor > 0 && current_advisor < 13) {
        window_message_dialog_show(ADVISOR_TO_MESSAGE_TEXT[current_advisor], () => {});
    }
}
function get_tooltip(c: tooltip_context) {
    if (focus_button_id.v) {
        c.type = TOOLTIP_BUTTON;
        if (focus_button_id.v == -1) {
            c.text_id = 1;
        } else {
            c.text_id = 69 + focus_button_id.v;
        }
        return;
    }
    let text_id: number = 0;
    if (current_advisor_window && current_advisor_window.get_tooltip_text) {
        text_id = current_advisor_window.get_tooltip_text();
    }
    if (text_id) {
        c.text_id = text_id;
        c.type = TOOLTIP_BUTTON;
    }
}
export function window_advisors_get_advisor() {
    return current_advisor;
}
export function window_advisors_show() {
    let window: window_type = new window_type(
        WINDOW_ADVISORS,
        draw_background,
        draw_foreground,
        handle_input,
        get_tooltip
    );
    init();
    window_show(window);
}
export function window_advisors_show_checked() {
    let avail: tutorial_availability = tutorial_advisor_empire_availability();
    if (avail == AVAILABLE) {
        set_advisor(setting_last_advisor());
        window_advisors_show();
    } else {
        city_warning_show(avail == NOT_AVAILABLE ? WARNING_NOT_AVAILABLE : WARNING_NOT_AVAILABLE_YET);
    }
}
export function window_advisors_show_advisor(advisor: advisor_type) {
    let avail: tutorial_availability = tutorial_advisor_empire_availability();
    if (avail == NOT_AVAILABLE || avail == NOT_AVAILABLE_YET) {
        city_warning_show(avail == NOT_AVAILABLE ? WARNING_NOT_AVAILABLE : WARNING_NOT_AVAILABLE_YET);
        return 0;
    }
    set_advisor(advisor);
    window_advisors_show();
    return 1;
}
