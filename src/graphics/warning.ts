import { city_warning_clear_all, city_warning_clear_outdated, city_warning_get } from 'city/warning';
import { image_group } from 'core/image';
import { group_terrain } from 'core/image_group';
import { game_state_is_paused } from 'game/state';
import { font_t } from 'graphics/font';
import { image_draw } from 'graphics/image';
import { BLOCK_SIZE, label_draw } from 'graphics/panel';
import { screen_width } from 'graphics/screen';
import { text_draw_centered, text_get_width } from 'graphics/text';
import { window_id, window_is } from 'graphics/window';
import GROUP_CONTEXT_ICONS = group_terrain.GROUP_CONTEXT_ICONS;
import FONT_NORMAL_BLACK = font_t.FONT_NORMAL_BLACK;
import FONT_NORMAL_WHITE = font_t.FONT_NORMAL_WHITE;
import WINDOW_CITY = window_id.WINDOW_CITY;
import WINDOW_EDITOR_MAP = window_id.WINDOW_EDITOR_MAP;
let TOP_OFFSETS: number[] = [30, 55, 80, 105, 130];
function determine_width(text: string | ArrayLike<number>) {
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
        let text: string | ArrayLike<number> | null = city_warning_get(i);
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
