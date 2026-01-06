import { building_clone_type_from_grid_offset } from 'building/clone';
import { building_construction_cancel, building_construction_clear_type, building_construction_in_progress, building_construction_set_type, building_construction_type } from 'building/construction';
import { building_menu_is_enabled } from 'building/menu';
import { building_type } from 'building/type';
import { city_message_process_queue } from 'city/message';
import { city_victory_has_won } from 'city/victory';
import { city_view_get_viewport, city_view_go_to_grid_offset } from 'city/view';
import { city_warning_clear_all } from 'city/warning';
import { config_get, config_key } from 'core/config';
import { formation, formation_get, formation_get_selected, formation_set_selected, MAX_FORMATIONS, MAX_LEGIONS } from 'figure/formation';
import { game_orientation_rotate_left, game_orientation_rotate_right } from 'game/orientation';
import { setting_decrease_game_speed, setting_difficulty, setting_increase_game_speed } from 'game/settings';
import { game_state_is_paused, game_state_overlay, game_state_set_overlay, game_state_toggle_overlay, game_state_toggle_paused, overlay } from 'game/state';
import { game_time_month, game_time_year } from 'game/time';
import { font_t } from 'graphics/font';
import { lang_text_draw, lang_text_draw_centered } from 'graphics/lang_text';
import { label_draw, large_label_draw, outer_panel_draw } from 'graphics/panel';
import { screen_height } from 'graphics/screen';
import { text_draw_number } from 'graphics/text';
import { tooltip_context } from 'graphics/tooltip';
import { window_id, window_invalidate, window_is, window_request_refresh, window_show, window_type } from 'graphics/window';
import { hotkeys } from 'input/hotkey';
import { mouse, mouse_get } from 'input/mouse';
import { map_bookmark_go_to, map_bookmark_save } from 'map/bookmark';
import { GRID, map_grid_offset } from 'map/grid';
import { scenario_building_allowed } from 'scenario/building';
import { scenario_criteria_max_year, scenario_criteria_survival_enabled, scenario_criteria_time_limit_enabled } from 'scenario/criteria';
import { widget_city_current_grid_offset, widget_city_draw, widget_city_draw_construction_cost_and_size, widget_city_draw_touch_buttons, widget_city_get_tooltip, widget_city_handle_input, widget_city_handle_input_military } from 'widget/city';
import { city_with_overlay_update } from 'widget/city_with_overlay';
import { widget_top_menu_draw, widget_top_menu_get_tooltip_text, widget_top_menu_handle_input } from 'widget/top_menu';
import { window_advisors_show_advisor } from 'window/advisors';
import { file_dialog_type, file_type, window_file_dialog_show } from 'window/file_dialog';
import { Ref } from '../../ext/crt';
const TOOLTIP_BUTTON = 1;
// TODO: These widget modules need to be translated from C to TypeScript
// import { widget_sidebar_city_draw_background, widget_sidebar_city_draw_foreground, widget_sidebar_city_get_tooltip_text, widget_sidebar_city_handle_mouse } from 'widget/sidebar/city';
// import { widget_sidebar_military_draw_background, widget_sidebar_military_draw_foreground, widget_sidebar_military_enter, widget_sidebar_military_exit, widget_sidebar_military_get_tooltip_text, widget_sidebar_military_handle_input } from 'widget/sidebar/military';
declare function widget_sidebar_city_draw_background(): void;
declare function widget_sidebar_city_draw_foreground(): void;
declare function widget_sidebar_city_get_tooltip_text(): number;
declare function widget_sidebar_city_handle_mouse(m: mouse): number;
declare function widget_sidebar_military_draw_background(): void;
declare function widget_sidebar_military_draw_foreground(): void;
declare function widget_sidebar_military_enter(formation_id: number): number;
declare function widget_sidebar_military_exit(): number;
declare function widget_sidebar_military_get_tooltip_text(c: tooltip_context): number;
declare function widget_sidebar_military_handle_input(m: mouse): number;
;
import CONFIG_UI_SHOW_MILITARY_SIDEBAR = config_key.CONFIG_UI_SHOW_MILITARY_SIDEBAR;
import CONFIG_UI_SHOW_SPEEDRUN_INFO = config_key.CONFIG_UI_SHOW_SPEEDRUN_INFO;
import OVERLAY_NONE = overlay.OVERLAY_NONE;
import FONT_NORMAL_BLACK = font_t.FONT_NORMAL_BLACK;
import FONT_NORMAL_WHITE = font_t.FONT_NORMAL_WHITE;
import WINDOW_CITY = window_id.WINDOW_CITY;
import WINDOW_CITY_MILITARY = window_id.WINDOW_CITY_MILITARY;
import GRID_SIZE = GRID.GRID_SIZE;
import FILE_DIALOG_SAVE = file_dialog_type.FILE_DIALOG_SAVE;
import FILE_DIALOG_LOAD = file_dialog_type.FILE_DIALOG_LOAD;
import FILE_TYPE_SAVED_GAME = file_type.FILE_TYPE_SAVED_GAME;
import FILE_TYPE_SCENARIO = file_type.FILE_TYPE_SCENARIO;
function draw_background() {
    widget_sidebar_city_draw_background();
    widget_top_menu_draw(1);
}
function draw_background_military() {
    if (config_get(CONFIG_UI_SHOW_MILITARY_SIDEBAR)) {
        widget_sidebar_military_draw_background();
    } else {
        widget_sidebar_city_draw_background();
    }
    widget_top_menu_draw(1);
}
function center_in_city(element_width_pixels: number) {
    let x: Ref<number> = new Ref(0);
    let y: Ref<number> = new Ref(0);
    let width: Ref<number> = new Ref(0);
    let height: Ref<number> = new Ref(0);
    city_view_get_viewport(x, y, width, height);
    let margin: number = (width.v - element_width_pixels) / 2;
    return x.v + margin;
}
function draw_paused_banner() {
    if (game_state_is_paused()) {
        let x_offset: number = center_in_city(448);
        outer_panel_draw(x_offset, 40, 28, 3);
        lang_text_draw_centered(13, 2, x_offset, 58, 448, FONT_NORMAL_BLACK);
    }
}
function draw_time_left() {
    if (scenario_criteria_time_limit_enabled() && !city_victory_has_won()) {
        let years: number;
        if (scenario_criteria_max_year() <= game_time_year() + 1) {
            years = 0;
        } else {
            years = scenario_criteria_max_year() - game_time_year() - 1;
        }
        let total_months: number = 12 - game_time_month() + 12 * years;
        label_draw(1, 25, 15, 1);
        let width: number = lang_text_draw(6, 2, 6, 29, FONT_NORMAL_BLACK);
        text_draw_number(total_months, '@', " ", 6 + width, 29, FONT_NORMAL_BLACK);
    } else if (scenario_criteria_survival_enabled() && !city_victory_has_won()) {
        let years: number;
        if (scenario_criteria_max_year() <= game_time_year() + 1) {
            years = 0;
        } else {
            years = scenario_criteria_max_year() - game_time_year() - 1;
        }
        let total_months: number = 12 - game_time_month() + 12 * years;
        label_draw(1, 25, 15, 1);
        let width: number = lang_text_draw(6, 3, 6, 29, FONT_NORMAL_BLACK);
        text_draw_number(total_months, '@', " ", 6 + width, 29, FONT_NORMAL_BLACK);
    }
}
function draw_speedrun_info() {
    if (config_get(CONFIG_UI_SHOW_SPEEDRUN_INFO)) {
        let s_height: number = screen_height();
        large_label_draw(0, s_height - 25, 10, 0);
        lang_text_draw_centered(153, setting_difficulty() + 1, 4, s_height - 18, 150, FONT_NORMAL_WHITE);
    }
}
function draw_foreground() {
    widget_top_menu_draw(0);
    window_city_draw();
    widget_sidebar_city_draw_foreground();
    draw_speedrun_info();
    if (window_is(WINDOW_CITY) || window_is(WINDOW_CITY_MILITARY)) {
        draw_time_left();
        if (mouse_get().is_touch) {
            widget_city_draw_touch_buttons();
        } else {
            draw_paused_banner();
        }
    }
    widget_city_draw_construction_cost_and_size();
    if (window_is(WINDOW_CITY)) {
        city_message_process_queue();
    }
}
function draw_foreground_military() {
    widget_top_menu_draw(0);
    window_city_draw();
    if (config_get(CONFIG_UI_SHOW_MILITARY_SIDEBAR)) {
        widget_sidebar_military_draw_foreground();
    } else {
        widget_sidebar_city_draw_foreground();
    }
    draw_time_left();
    if (mouse_get().is_touch) {
        widget_city_draw_touch_buttons();
    } else {
        draw_paused_banner();
    }
}
function exit_military_command() {
    if (window_is(WINDOW_CITY_MILITARY)) {
        window_city_show();
    }
}
function show_overlay(overlay: number) {
    exit_military_command();
    if (game_state_overlay() == overlay) {
        game_state_set_overlay(OVERLAY_NONE);
    } else {
        game_state_set_overlay(overlay);
    }
    city_with_overlay_update();
    window_invalidate();
}
function cycle_legion() {
    let current_legion_id: number = 1;
    if (window_is(WINDOW_CITY) || window_is(WINDOW_CITY_MILITARY)) {
        let legion_id: number = current_legion_id;
        current_legion_id = 0;
        for (let i: number = 1; i < MAX_FORMATIONS; i++) {
            legion_id++;
            if (legion_id > MAX_LEGIONS) {
                legion_id = 1;
            }
            let m: formation = formation_get(legion_id);
            if (m.in_use == 1 && !m.is_herd && m.is_legion) {
                if (current_legion_id == 0) {
                    current_legion_id = legion_id;
                    break
                }
            }
        }
        if (current_legion_id > 0) {
            let m: formation = formation_get(current_legion_id);
            city_view_go_to_grid_offset(map_grid_offset(m.x_home, m.y_home));
            window_city_military_show(current_legion_id);
        }
    }
}
function toggle_pause() {
    game_state_toggle_paused();
    city_warning_clear_all();
}
function set_construction_building_type(type: building_type) {
    if (scenario_building_allowed(type) && building_menu_is_enabled(type)) {
        building_construction_cancel();
        building_construction_set_type(type);
        window_request_refresh();
    }
}
function handle_hotkeys(h: hotkeys) {
    if (h.toggle_pause) {
        toggle_pause();
    }
    if (h.decrease_game_speed) {
        setting_decrease_game_speed();
    }
    if (h.increase_game_speed) {
        setting_increase_game_speed();
    }
    if (h.show_overlay) {
        show_overlay(h.show_overlay);
    }
    if (h.toggle_overlay) {
        exit_military_command();
        game_state_toggle_overlay();
        city_with_overlay_update();
        window_invalidate();
    }
    if (h.show_advisor) {
        window_advisors_show_advisor(h.show_advisor);
    }
    if (h.cycle_legion) {
        cycle_legion();
    }
    if (h.rotate_map_left) {
        game_orientation_rotate_left();
        window_invalidate();
    }
    if (h.rotate_map_right) {
        game_orientation_rotate_right();
        window_invalidate();
    }
    if (h.go_to_bookmark) {
        if (map_bookmark_go_to(h.go_to_bookmark - 1)) {
            window_invalidate();
        }
    }
    if (h.set_bookmark) {
        map_bookmark_save(h.set_bookmark - 1);
    }
    if (h.load_file) {
        window_file_dialog_show(FILE_TYPE_SAVED_GAME, FILE_DIALOG_LOAD);
    }
    if (h.save_file) {
        window_file_dialog_show(FILE_TYPE_SAVED_GAME, FILE_DIALOG_SAVE);
    }
    if (h.building) {
        set_construction_building_type(h.building);
    }
    if (h.clone_building) {
        let type: building_type = building_clone_type_from_grid_offset(widget_city_current_grid_offset());
        if (type) {
            set_construction_building_type(type);
        }
    }
}
function handle_input(m: mouse, h: hotkeys) {
    handle_hotkeys(h);
    if (!building_construction_in_progress()) {
        if (widget_top_menu_handle_input(m, h)) {
            return;
        }
        if (widget_sidebar_city_handle_mouse(m)) {
            return;
        }
    }
    widget_city_handle_input(m, h);
}
function handle_input_military(m: mouse, h: hotkeys) {
    handle_hotkeys(h);
    if (widget_top_menu_handle_input(m, h)) {
        return;
    }
    if (config_get(CONFIG_UI_SHOW_MILITARY_SIDEBAR) && widget_sidebar_military_handle_input(m)) {
        return;
    }
    widget_city_handle_input_military(m, h, formation_get_selected());
}
function get_tooltip(c: tooltip_context) {
    let text_id: number = widget_top_menu_get_tooltip_text(c);
    if (!text_id) {
        if (config_get(CONFIG_UI_SHOW_MILITARY_SIDEBAR) && formation_get_selected()) {
            text_id = widget_sidebar_military_get_tooltip_text(c);
        } else {
            text_id = widget_sidebar_city_get_tooltip_text();
        }
    }
    if (text_id) {
        c.type = TOOLTIP_BUTTON;
        c.text_id = text_id;
        return;
    }
    widget_city_get_tooltip(c);
}
export function window_city_military_is_cursor_in_menu() {
    if (!config_get(CONFIG_UI_SHOW_MILITARY_SIDEBAR) || !window_is(WINDOW_CITY_MILITARY)) {
        return 0;
    }
    let m: mouse = mouse_get();
    let x: Ref<number> = new Ref(0);
    let y: Ref<number> = new Ref(0);
    let width: Ref<number> = new Ref(0);
    let height: Ref<number> = new Ref(0);
    city_view_get_viewport(x, y, width, height);
    return m.x < x.v || m.x >= width.v || m.y < y.v || m.y >= height.v;
}
export function window_city_draw_all() {
    if (formation_get_selected() && config_get(CONFIG_UI_SHOW_MILITARY_SIDEBAR)) {
        draw_background_military();
        draw_foreground_military();
    } else {
        draw_background();
        draw_foreground();
    }
}
export function window_city_draw_panels() {
    if (formation_get_selected() && config_get(CONFIG_UI_SHOW_MILITARY_SIDEBAR)) {
        draw_background_military();
    } else {
        draw_background();
    }
}
export function window_city_draw() {
    widget_city_draw();
}
export function window_city_show() {
    if (formation_get_selected()) {
        formation_set_selected(0);
        if (config_get(CONFIG_UI_SHOW_MILITARY_SIDEBAR) && widget_sidebar_military_exit()) {
            return;
        }
    }
    let window: window_type = new window_type(
        WINDOW_CITY,
        draw_background,
        draw_foreground,
        handle_input,
        get_tooltip
    );
    window_show(window);
}
export function window_city_military_show(legion_formation_id: number) {
    if (building_construction_type()) {
        building_construction_cancel();
        building_construction_clear_type();
    }
    formation_set_selected(legion_formation_id);
    if (config_get(CONFIG_UI_SHOW_MILITARY_SIDEBAR) && widget_sidebar_military_enter(legion_formation_id)) {
        return;
    }
    let window: window_type = new window_type(
        WINDOW_CITY_MILITARY,
        draw_background_military,
        draw_foreground_military,
        handle_input_military,
        get_tooltip
    );
    window_show(window);
}
export function window_city_return() {
    let formation_id: number = formation_get_selected();
    if (formation_id) {
        window_city_military_show(formation_id);
    } else {
        window_city_show();
    }
}
