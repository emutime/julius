export const MAX_SCENARIOS = 15;
import { FILE_NAME_MAX } from 'core/file';
import { dir_listing } from 'core/dir';
import { dir_find_files_with_extension } from 'core/dir';
import { language_type } from 'core/locale';
import { __va_start } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vadefs';
import { __va_start } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vadefs';;
import { encoding_type } from 'core/encoding';
import { encoding_from_utf8 } from 'core/encoding';
import { _invalid_parameter_noinfo } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt';
import { __local_stdio_printf_options } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_stdio_config';
import { __local_stdio_scanf_options } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_stdio_config';
import { __acrt_iob_func } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstdio';
import { __stdio_common_vfwprintf } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstdio';
import { __stdio_common_vfwprintf_s } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstdio';
import { __stdio_common_vfwprintf_p } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstdio';
import { _vfwprintf_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstdio';
import { _vfwprintf_s_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstdio';
import { _vfwprintf_p_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstdio';
import { __stdio_common_vfwscanf } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstdio';
import { _vfwscanf_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstdio';
import { _vfwscanf_s_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstdio';
import { __stdio_common_vswprintf } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstdio';
import { __stdio_common_vswprintf_s } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstdio';
import { __stdio_common_vsnwprintf_s } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstdio';
import { __stdio_common_vswprintf_p } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstdio';
import { _vsnwprintf_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstdio';
import { _vsnwprintf_s_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstdio';
import { _vswprintf_c_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstdio';
import { _vswprintf_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstdio';
import { __vswprintf_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstdio';
import { _vswprintf_s_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstdio';
import { _vswprintf_p_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstdio';
import { _vscwprintf_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstdio';
import { _vscwprintf_p_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstdio';
import { __stdio_common_vswscanf } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstdio';
import { _vswscanf_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstdio';
import { _vswscanf_s_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstdio';
import { _vsnwscanf_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstdio';
import { _vsnwscanf_s_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstdio';
import { __stdio_common_vfprintf } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdio';
import { __stdio_common_vfprintf_s } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdio';
import { __stdio_common_vfprintf_p } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdio';
import { _vfprintf_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdio';
import { _vfprintf_s_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdio';
import { _vfprintf_p_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdio';
import { __stdio_common_vfscanf } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdio';
import { _vfscanf_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdio';
import { _vfscanf_s_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdio';
import { __stdio_common_vsprintf } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdio';
import { __stdio_common_vsprintf_s } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdio';
import { __stdio_common_vsnprintf_s } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdio';
import { __stdio_common_vsprintf_p } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdio';
import { _vsnprintf_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdio';
import { _vsnprintf } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdio';
import { vsnprintf } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdio';
import { vsnprintf } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdio';
import { _vsprintf_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdio';
import { _vsprintf_s_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdio';
import { _vsprintf_p_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdio';
import { _vsnprintf_s_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdio';
import { _vscprintf_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdio';
import { _vscprintf_p_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdio';
import { _vscprintf_p } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdio';
import { _vsnprintf_c_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdio';
import { __stdio_common_vsscanf } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdio';
import { _vsscanf_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdio';
import { _vsscanf_s_l } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdio';
import { vsscanf_s } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdio';
import { _errno } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stddef';
import { _errno } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/stdlib';
import { file_remove_extension } from 'core/file';
import { group_terrain } from 'core/image_group';
import GROUP_SIDEBAR_BRIEFING_ROTATE_BUTTONS = group_terrain.GROUP_SIDEBAR_BRIEFING_ROTATE_BUTTONS;
import GROUP_SIDEBAR_BUTTONS = group_terrain.GROUP_SIDEBAR_BUTTONS;
import GROUP_CCK_BACKGROUND = group_terrain.GROUP_CCK_BACKGROUND;
import GROUP_SCENARIO_IMAGE = group_terrain.GROUP_SCENARIO_IMAGE;
import { game_file_start_scenario } from 'game/file';
import { game_file_load_scenario_data } from 'game/file';
import { button_none } from 'graphics/button';
import { button_border_draw } from 'graphics/button';
import { time_millis } from 'core/time';
import { touch_coords } from 'input/touch';
import { touch_mode } from 'input/touch';
import { touch } from 'input/touch';
import { mouse_button } from 'input/mouse';
import { scroll_state } from 'input/mouse';
import { mouse } from 'input/mouse';
import { mouse_in_dialog } from 'input/mouse';
import { generic_button } from 'graphics/generic_button';
import { generic_buttons_handle_mouse } from 'graphics/generic_button';
import { color_t } from 'graphics/color';
import { clip_code } from 'graphics/graphics';
import { clip_info } from 'graphics/graphics';
import { graphics_in_dialog } from 'graphics/graphics';
import { graphics_reset_dialog } from 'graphics/graphics';
import { image } from 'core/image';
import { image_group } from 'core/image';
import { font_t } from 'graphics/font';
import FONT_NORMAL_BLACK = font_t.FONT_NORMAL_BLACK;
import FONT_NORMAL_WHITE = font_t.FONT_NORMAL_WHITE;
import FONT_LARGE_BLACK = font_t.FONT_LARGE_BLACK;
import FONT_NORMAL_GREEN = font_t.FONT_NORMAL_GREEN;
import { font_t } from 'graphics/font';
import { font_definition } from 'graphics/font';
import { image_draw } from 'graphics/image';
import { image_draw_fullscreen_background } from 'graphics/image';
import { ib } from 'graphics/image_button';
import IB_NORMAL = ib.IB_NORMAL;
import { image_button } from 'graphics/image_button';
import { image_buttons_draw } from 'graphics/image_button';
import { image_buttons_handle_mouse } from 'graphics/image_button';
import { lang_text_draw } from 'graphics/lang_text';
import { lang_text_draw_centered } from 'graphics/lang_text';
import { lang_text_draw_year } from 'graphics/lang_text';
import { lang_text_draw_multiline } from 'graphics/lang_text';
import { inner_panel_draw } from 'graphics/panel';
import { scrollbar_type } from 'graphics/scrollbar';
import { scrollbar_init } from 'graphics/scrollbar';
import { scrollbar_draw } from 'graphics/scrollbar';
import { scrollbar_handle_mouse } from 'graphics/scrollbar';
import { text_ellipsize } from 'graphics/text';
import { text_draw } from 'graphics/text';
import { text_draw_centered } from 'graphics/text';
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
import WINDOW_CCK_SELECTION = window_id.WINDOW_CCK_SELECTION;
import { window_id } from 'graphics/window';
import { window_type } from 'graphics/window';
import { window_invalidate } from 'graphics/window';
import { window_show } from 'graphics/window';
import { window_go_back } from 'graphics/window';
import { input_go_back_requested } from 'input/input';
import { buffer } from 'core/buffer';
import { scenario_criteria_population_enabled } from 'scenario/criteria';
import { scenario_criteria_population } from 'scenario/criteria';
import { scenario_criteria_culture_enabled } from 'scenario/criteria';
import { scenario_criteria_culture } from 'scenario/criteria';
import { scenario_criteria_prosperity_enabled } from 'scenario/criteria';
import { scenario_criteria_prosperity } from 'scenario/criteria';
import { scenario_criteria_peace_enabled } from 'scenario/criteria';
import { scenario_criteria_peace } from 'scenario/criteria';
import { scenario_criteria_favor_enabled } from 'scenario/criteria';
import { scenario_criteria_favor } from 'scenario/criteria';
import { scenario_criteria_time_limit_enabled } from 'scenario/criteria';
import { scenario_criteria_time_limit_years } from 'scenario/criteria';
import { scenario_criteria_survival_enabled } from 'scenario/criteria';
import { scenario_criteria_survival_years } from 'scenario/criteria';
import { scenario_invasion_count } from 'scenario/invasion';
import { map_point } from 'map/point';
import { scenario_map_size } from 'scenario/map';
import { scenario_climate } from 'scenario/property';
import { scenario_set_custom } from 'scenario/property';
import { scenario_is_open_play } from 'scenario/property';
import { scenario_open_play_id } from 'scenario/property';
import { scenario_property_climate } from 'scenario/property';
import { scenario_property_start_year } from 'scenario/property';
import { scenario_property_player_rank } from 'scenario/property';
import { scenario_image_id } from 'scenario/property';
import { scenario_brief_description } from 'scenario/property';
import { sound_music_update } from 'sound/music';
import { widget_scenario_minimap_draw } from 'widget/scenario_minimap';
import { window_city_show } from 'window/city';
import { _errno } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/errno';
import { memcpy } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vcruntime_string';
import { memcpy } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vcruntime_string';
import { memmove } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vcruntime_string';
import { memmove } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vcruntime_string';
import { memset } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vcruntime_string';
import { memset } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vcruntime_string';
import { wcsnlen } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstring';
import { wcstok } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstring';
import { strnlen } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/string';
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
    public selected_scenario_filename: char[] = new Array(FILE_NAME_MAX).fill(null);
    public selected_scenario_display: number[] = new Array(FILE_NAME_MAX).fill(0);
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
    let file: char[];
    let displayable_file: number[];
    for (let i: number = 0; i < MAX_SCENARIOS; i++) {
        let font: font_t = FONT_NORMAL_GREEN;
        if (data.focus_button_id == i + 1) {
            font = FONT_NORMAL_WHITE;
        } else if (!data.focus_button_id && data.selected_item == i + scrollbar.scroll_position) {
            font = FONT_NORMAL_WHITE;
        }
        strcpy(file, data.scenarios.files[i + scrollbar.scroll_position]);
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
    if (image_buttons_handle_mouse(m_dialog, 0, 0, start_button, 1, 0)) {
        return;
    }
    if (generic_buttons_handle_mouse(m_dialog, 0, 0, toggle_minimap_button, 1, data.focus_toggle_button)) {
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
    strcpy(data.selected_scenario_filename, data.scenarios.files[data.selected_item]);
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
    data.show_minimap = !data.show_minimap;
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
