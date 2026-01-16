export const MAX_SCENARIOS = 15;
import { dir_find_files_with_extension, dir_listing } from 'core/dir';
import { encoding_from_utf8 } from 'core/encoding';
import { FILE_NAME_MAX, file_remove_extension } from 'core/file';
import { image_group } from 'core/image';
import { group_terrain } from 'core/image_group';
import { game_file_load_scenario_data, game_file_start_scenario } from 'game/file';
import { button_border_draw, button_none } from 'graphics/button';
import { font_t } from 'graphics/font';
import { generic_button, generic_buttons_handle_mouse } from 'graphics/generic_button';
import { graphics_in_dialog, graphics_reset_dialog } from 'graphics/graphics';
import { image_draw, image_draw_fullscreen_background } from 'graphics/image';
import { ib, image_button, image_buttons_draw, image_buttons_handle_mouse } from 'graphics/image_button';
import { lang_text_draw, lang_text_draw_centered, lang_text_draw_multiline, lang_text_draw_year } from 'graphics/lang_text';
import { inner_panel_draw } from 'graphics/panel';
import { scrollbar_draw, scrollbar_handle_mouse, scrollbar_init, scrollbar_type } from 'graphics/scrollbar';
import { text_draw, text_draw_centered, text_draw_number, text_ellipsize } from 'graphics/text';
import { window_go_back, window_id, window_invalidate, window_show, window_type } from 'graphics/window';
import { hotkeys } from 'input/hotkey';
import { input_go_back_requested } from 'input/input';
import { mouse, mouse_in_dialog } from 'input/mouse';
import { scenario_criteria_culture, scenario_criteria_culture_enabled, scenario_criteria_favor, scenario_criteria_favor_enabled, scenario_criteria_peace, scenario_criteria_peace_enabled, scenario_criteria_population, scenario_criteria_population_enabled, scenario_criteria_prosperity, scenario_criteria_prosperity_enabled, scenario_criteria_survival_enabled, scenario_criteria_survival_years, scenario_criteria_time_limit_enabled, scenario_criteria_time_limit_years } from 'scenario/criteria';
import { scenario_invasion_count } from 'scenario/invasion';
import { scenario_map_size } from 'scenario/map';
import { scenario_brief_description, scenario_image_id, scenario_is_open_play, scenario_open_play_id, scenario_property_climate, scenario_property_player_rank, scenario_property_start_year, scenario_set_custom } from 'scenario/property';
import { sound_music_update } from 'sound/music';
import { widget_scenario_minimap_draw } from 'widget/scenario_minimap';
import { window_city_show } from 'window/city';
import GROUP_SIDEBAR_BRIEFING_ROTATE_BUTTONS = group_terrain.GROUP_SIDEBAR_BRIEFING_ROTATE_BUTTONS;
import GROUP_SIDEBAR_BUTTONS = group_terrain.GROUP_SIDEBAR_BUTTONS;
import GROUP_CCK_BACKGROUND = group_terrain.GROUP_CCK_BACKGROUND;
import GROUP_SCENARIO_IMAGE = group_terrain.GROUP_SCENARIO_IMAGE;
import FONT_NORMAL_BLACK = font_t.FONT_NORMAL_BLACK;
import FONT_NORMAL_WHITE = font_t.FONT_NORMAL_WHITE;
import FONT_LARGE_BLACK = font_t.FONT_LARGE_BLACK;
import FONT_NORMAL_GREEN = font_t.FONT_NORMAL_GREEN;
import IB_NORMAL = ib.IB_NORMAL;
import WINDOW_CCK_SELECTION = window_id.WINDOW_CCK_SELECTION;
let start_button: image_button = new image_button(600, 440, 27, 27, IB_NORMAL, GROUP_SIDEBAR_BUTTONS, 56, button_start_scenario, button_none, 1, 0, 1);
let toggle_minimap_button: generic_button = new generic_button(570, 87, 39, 28, button_toggle_minimap, button_none, 0, 0);
let file_buttons: generic_button[] = [
    new generic_button(18, 220, 252, 16, button_select_item, button_none, 0, 0),
    new generic_button(18, 236, 252, 16, button_select_item, button_none, 1, 0),
    new generic_button(18, 252, 252, 16, button_select_item, button_none, 2, 0),
    new generic_button(18, 268, 252, 16, button_select_item, button_none, 3, 0),
    new generic_button(18, 284, 252, 16, button_select_item, button_none, 4, 0),
    new generic_button(18, 300, 252, 16, button_select_item, button_none, 5, 0),
    new generic_button(18, 316, 252, 16, button_select_item, button_none, 6, 0),
    new generic_button(18, 332, 252, 16, button_select_item, button_none, 7, 0),
    new generic_button(18, 348, 252, 16, button_select_item, button_none, 8, 0),
    new generic_button(18, 364, 252, 16, button_select_item, button_none, 9, 0),
    new generic_button(18, 380, 252, 16, button_select_item, button_none, 10, 0),
    new generic_button(18, 396, 252, 16, button_select_item, button_none, 11, 0),
    new generic_button(18, 412, 252, 16, button_select_item, button_none, 12, 0),
    new generic_button(18, 428, 252, 16, button_select_item, button_none, 13, 0),
    new generic_button(18, 444, 252, 16, button_select_item, button_none, 14, 0),
];
let scrollbar: scrollbar_type = new scrollbar_type(276, 210, 256, 260, MAX_SCENARIOS, on_scroll, 1, 8, 1);
export class unnamed61_8 {
    public focus_button_id: number = 0;
    public focus_toggle_button: number = 0;
    public selected_item: number = 0;
    public show_minimap: number = 0;
    public selected_scenario_filename: Uint8Array = new Uint8Array(FILE_NAME_MAX);
    public selected_scenario_display: Uint8Array = new Uint8Array(FILE_NAME_MAX);
    public scenarios: dir_listing = null;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.focus_button_id = args[0]);
        args.length >= 2 && (this.focus_toggle_button = args[1]);
        args.length >= 3 && (this.selected_item = args[2]);
        args.length >= 4 && (this.show_minimap = args[3]);
        args.length >= 5 && (this.selected_scenario_filename = args[4]);
        args.length >= 6 && (this.selected_scenario_display = args[5]);
        args.length >= 7 && (this.scenarios = args[6]);
    }
}
let data: unnamed61_8 = new unnamed61_8();
function init() {
    scenario_set_custom(2);
    data.scenarios = dir_find_files_with_extension("map");
    data.focus_button_id = 0;
    data.focus_toggle_button = 0;
    data.show_minimap = 0;
    button_select_item(0, 0);
    scrollbar_init(scrollbar, 0, data.scenarios.num_files);
}
function draw_scenario_list() {
    inner_panel_draw(16, 210, 16, 16);
    for (let i: number = 0; i < MAX_SCENARIOS; i++) {
        let font: font_t = FONT_NORMAL_GREEN;
        if (data.focus_button_id == i + 1) {
            font = FONT_NORMAL_WHITE;
        } else if (!data.focus_button_id && data.selected_item == i + scrollbar.scroll_position) {
            font = FONT_NORMAL_WHITE;
        }
        let file: string = data.scenarios.files[i + scrollbar.scroll_position];
        let displayable_file = new Uint8Array(FILE_NAME_MAX);
        encoding_from_utf8(file, displayable_file, FILE_NAME_MAX);
        file_remove_extension(displayable_file);
        text_ellipsize(displayable_file, font, 240);
        text_draw(displayable_file, 24, 220 + 16 * i, font, 0);
    }
}
function draw_scenario_info() {
    let scenario_info_x: number = 335;
    let scenario_info_width: number = 280;
    let scenario_criteria_x: number = 420;
    image_draw(image_group(GROUP_SCENARIO_IMAGE) + scenario_image_id(), 78, 36);
    text_ellipsize(data.selected_scenario_display, FONT_LARGE_BLACK, scenario_info_width + 10);
    text_draw_centered(data.selected_scenario_display,
        scenario_info_x, 25, scenario_info_width + 10, FONT_LARGE_BLACK, 0);
    text_draw_centered(scenario_brief_description(), scenario_info_x, 60, scenario_info_width, FONT_NORMAL_WHITE, 0);
    lang_text_draw_year(scenario_property_start_year(), scenario_criteria_x, 90, FONT_LARGE_BLACK);
    if (data.show_minimap) {
        widget_scenario_minimap_draw(332, 119, 286, 300);
        image_draw(image_group(GROUP_SIDEBAR_BRIEFING_ROTATE_BUTTONS),
            toggle_minimap_button.x + 3, toggle_minimap_button.y + 3);
    } else {
        widget_scenario_minimap_draw(
            toggle_minimap_button.x + 3, toggle_minimap_button.y + 3,
            toggle_minimap_button.width - 6, toggle_minimap_button.height - 6
        );
        lang_text_draw_centered(44, 77 + scenario_property_climate(),
            scenario_info_x, 150, scenario_info_width, FONT_NORMAL_BLACK);
        let text_id: number;
        switch (scenario_map_size()) {
            case 40:
                text_id = 121;
                break
            case 60:
                text_id = 122;
                break
            case 80:
                text_id = 123;
                break
            case 100:
                text_id = 124;
                break
            case 120:
                text_id = 125;
                break
            default: text_id = 126
                break
        }
        lang_text_draw_centered(44, text_id, scenario_info_x, 170, scenario_info_width, FONT_NORMAL_BLACK);
        let num_invasions: number = scenario_invasion_count();
        if (num_invasions <= 0) {
            text_id = 112;
        } else if (num_invasions <= 2) {
            text_id = 113;
        } else if (num_invasions <= 4) {
            text_id = 114;
        } else if (num_invasions <= 10) {
            text_id = 115;
        } else {
            text_id = 116;
        }
        lang_text_draw_centered(44, text_id, scenario_info_x, 190, scenario_info_width, FONT_NORMAL_BLACK);
        lang_text_draw_centered(32, 11 + scenario_property_player_rank(),
            scenario_info_x, 210, scenario_info_width, FONT_NORMAL_BLACK);
        if (scenario_is_open_play()) {
            if (scenario_open_play_id() < 12) {
                lang_text_draw_multiline(145, scenario_open_play_id(),
                    scenario_info_x + 10, 270, scenario_info_width - 10, FONT_NORMAL_BLACK);
            }
        } else {
            lang_text_draw_centered(44, 127, scenario_info_x, 262, scenario_info_width, FONT_NORMAL_BLACK);
            let width: number;
            if (scenario_criteria_culture_enabled()) {
                width = text_draw_number(scenario_criteria_culture(), '@', " ",
                    scenario_criteria_x, 290, FONT_NORMAL_BLACK);
                lang_text_draw(44, 129, scenario_criteria_x + width, 290, FONT_NORMAL_BLACK);
            }
            if (scenario_criteria_prosperity_enabled()) {
                width = text_draw_number(scenario_criteria_prosperity(), '@', " ",
                    scenario_criteria_x, 306, FONT_NORMAL_BLACK);
                lang_text_draw(44, 130, scenario_criteria_x + width, 306, FONT_NORMAL_BLACK);
            }
            if (scenario_criteria_peace_enabled()) {
                width = text_draw_number(scenario_criteria_peace(), '@', " ",
                    scenario_criteria_x, 322, FONT_NORMAL_BLACK);
                lang_text_draw(44, 131, scenario_criteria_x + width, 322, FONT_NORMAL_BLACK);
            }
            if (scenario_criteria_favor_enabled()) {
                width = text_draw_number(scenario_criteria_favor(), '@', " ",
                    scenario_criteria_x, 338, FONT_NORMAL_BLACK);
                lang_text_draw(44, 132, scenario_criteria_x + width, 338, FONT_NORMAL_BLACK);
            }
            if (scenario_criteria_population_enabled()) {
                width = text_draw_number(scenario_criteria_population(), '@', " ",
                    scenario_criteria_x, 354, FONT_NORMAL_BLACK);
                lang_text_draw(44, 133, scenario_criteria_x + width, 354, FONT_NORMAL_BLACK);
            }
            if (scenario_criteria_time_limit_enabled()) {
                width = text_draw_number(scenario_criteria_time_limit_years(), '@', " ",
                    scenario_criteria_x, 370, FONT_NORMAL_BLACK);
                lang_text_draw(44, 134, scenario_criteria_x + width, 370, FONT_NORMAL_BLACK);
            }
            if (scenario_criteria_survival_enabled()) {
                width = text_draw_number(scenario_criteria_survival_years(), '@', " ",
                    scenario_criteria_x, 386, FONT_NORMAL_BLACK);
                lang_text_draw(44, 135, scenario_criteria_x + width, 386, FONT_NORMAL_BLACK);
            }
        }
    }
    lang_text_draw_centered(44, 136, scenario_info_x, 446, scenario_info_width, FONT_NORMAL_BLACK);
}
function draw_background() {
    image_draw_fullscreen_background(image_group(GROUP_CCK_BACKGROUND));
    graphics_in_dialog();
    inner_panel_draw(280, 242, 2, 12);
    draw_scenario_list();
    draw_scenario_info();
    graphics_reset_dialog();
}
function draw_foreground() {
    graphics_in_dialog();
    image_buttons_draw(0, 0, start_button, 1);
    button_border_draw(
        toggle_minimap_button.x, toggle_minimap_button.y,
        toggle_minimap_button.width, toggle_minimap_button.height,
        data.focus_toggle_button);
    scrollbar_draw(scrollbar);
    draw_scenario_list();
    graphics_reset_dialog();
}
function handle_input(m: mouse, h: hotkeys) {
    let m_dialog: mouse = mouse_in_dialog(m);
    if (scrollbar_handle_mouse(scrollbar, m_dialog)) {
        return;
    }
    if (image_buttons_handle_mouse(m_dialog, 0, 0, start_button, 1, null)) {
        return;
    }
    if (generic_buttons_handle_mouse(m_dialog, 0, 0, [toggle_minimap_button], 1, data.focus_toggle_button)) {
        return;
    }
    if (generic_buttons_handle_mouse(m_dialog, 0, 0, file_buttons, MAX_SCENARIOS, data.focus_button_id)) {
        return;
    }
    if (h.enter_pressed) {
        button_start_scenario(0, 0);
        return;
    }
    if (input_go_back_requested(m, h)) {
        window_go_back();
    }
}
function button_select_item(index: number, param2: number) {
    if (index >= data.scenarios.num_files) {
        return;
    }
    data.selected_item = scrollbar.scroll_position + index;
    encoding_from_utf8(data.scenarios.files[data.selected_item], data.selected_scenario_filename, FILE_NAME_MAX);
    game_file_load_scenario_data(data.selected_scenario_filename);
    encoding_from_utf8(data.selected_scenario_filename, data.selected_scenario_display, FILE_NAME_MAX);
    file_remove_extension(data.selected_scenario_display);
    window_invalidate();
}
function button_start_scenario(param1: number, param2: number) {
    if (game_file_start_scenario(data.selected_scenario_filename)) {
        sound_music_update(1);
        window_city_show();
    }
}
function button_toggle_minimap(param1: number, param2: number) {
    data.show_minimap = data.show_minimap ? 0 : 1;
    window_invalidate();
}
function on_scroll() {
    window_invalidate();
}
export function window_cck_selection_show() {
    let window: window_type = new window_type(
        WINDOW_CCK_SELECTION,
        draw_background,
        draw_foreground,
        handle_input
    );
    init();
    window_show(window);
}
