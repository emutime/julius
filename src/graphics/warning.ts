import { BLOCK_SIZE } from 'graphics/panel';
;
import { warning_type } from 'city/warning';
import { city_warning_get } from 'city/warning';
import { city_warning_clear_all } from 'city/warning';
import { city_warning_clear_outdated } from 'city/warning';
import { game_state_is_paused } from 'game/state';
import { language_type } from 'core/locale';
import { encoding_type } from 'core/encoding';
import { group_terrain } from 'core/image_group';
import GROUP_CONTEXT_ICONS = group_terrain.GROUP_CONTEXT_ICONS;
import { color_t } from 'graphics/color';
import { image } from 'core/image';
import { image_group } from 'core/image';
import { font_t } from 'graphics/font';
import FONT_NORMAL_BLACK = font_t.FONT_NORMAL_BLACK;
import FONT_NORMAL_WHITE = font_t.FONT_NORMAL_WHITE;
import { font_t } from 'graphics/font';
import { font_definition } from 'graphics/font';
import { image_draw } from 'graphics/image';
import { label_draw } from 'graphics/panel';
import { screen_width } from 'graphics/screen';
import { time_millis } from 'core/time';
import { touch_coords } from 'input/touch';
import { touch_mode } from 'input/touch';
import { touch } from 'input/touch';
import { mouse_button } from 'input/mouse';
import { scroll_state } from 'input/mouse';
import { mouse } from 'input/mouse';
import { text_get_width } from 'graphics/text';
import { text_draw_centered } from 'graphics/text';
import { tooltip_type } from 'graphics/tooltip';
import { tooltip_extra_text_type } from 'graphics/tooltip';
import { tooltip_context } from 'graphics/tooltip';
import { key_type } from 'input/keys';
import { key_modifier_type } from 'input/keys';
import { hotkey_action } from 'core/hotkey_config';
import { hotkey_mapping } from 'core/hotkey_config';
import { hotkeys } from 'input/hotkey';
import { window_id } from 'graphics/window';
import WINDOW_CITY = window_id.WINDOW_CITY;
import WINDOW_EDITOR_MAP = window_id.WINDOW_EDITOR_MAP;
import { window_id } from 'graphics/window';
import { window_type } from 'graphics/window';
import { window_is } from 'graphics/window';
let TOP_OFFSETS: number[] = new Array().fill({ 30, 55, 80, 105, 130});
function determine_width(text: number) {
    let width: number = text_get_width(text, FONT_NORMAL_BLACK);
    if (width <= 100) {
        return 200;
    } else if (width <= 200) {
        return 300;
    } else if (width <= 300) {
        return 400;
    } else {
        return 460;
    }
}
export function warning_draw() {
    if (!window_is(WINDOW_CITY) && !window_is(WINDOW_EDITOR_MAP)) {
        city_warning_clear_all();
        return;
    }
    let center: number = (screen_width() - 180) / 2;
    for (let i: number = 0; i < 5; i++) {
        let text: number = city_warning_get(i);
        if (!text) {
            continue
        }
        let top_offset: number = TOP_OFFSETS[i];
        if (game_state_is_paused()) {
            top_offset += 70
        }
        let box_width: number = determine_width(text);
        label_draw(center - box_width / 2 + 1, top_offset, box_width / BLOCK_SIZE + 1, 1);
        if (box_width < 460) {
            image_draw(image_group(GROUP_CONTEXT_ICONS) + 15, center - box_width / 2 + 2, top_offset + 2);
            image_draw(image_group(GROUP_CONTEXT_ICONS) + 15, center + box_width / 2 - 30, top_offset + 2);
        }
        text_draw_centered(text, center - box_width / 2 + 1, top_offset + 4, box_width, FONT_NORMAL_WHITE, 0);
    }
    city_warning_clear_outdated();
}
