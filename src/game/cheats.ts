
import { building_type } from 'building/type';
import { city_finance_process_cheat } from 'city/finance';
import { city_victory_force_win } from 'city/victory';
import { window_id, window_invalidate, window_is } from 'graphics/window';
import { scenario_invasion_start_from_cheat } from 'scenario/invasion';
import { window_building_info_get_building_type } from 'window/building_info';
import BUILDING_WELL = building_type.BUILDING_WELL;
;
import WINDOW_MESSAGE_DIALOG = window_id.WINDOW_MESSAGE_DIALOG;
import WINDOW_BUILDING_INFO = window_id.WINDOW_BUILDING_INFO;
export class unnamed10_8 {
    public is_cheating: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.is_cheating = args[0]);
    }
}
let data: unnamed10_8 = new unnamed10_8();
export function game_cheat_activate() {
    if (window_is(WINDOW_BUILDING_INFO)) {
        data.is_cheating = window_building_info_get_building_type() == BUILDING_WELL ? 1 : 0;
    } else if (data.is_cheating && window_is(WINDOW_MESSAGE_DIALOG)) {
        data.is_cheating = 2;
        scenario_invasion_start_from_cheat();
    } else {
        data.is_cheating = 0;
    }
}
export function game_cheat_money() {
    if (data.is_cheating) {
        city_finance_process_cheat();
        window_invalidate();
    }
}
export function game_cheat_victory() {
    if (data.is_cheating) {
        city_victory_force_win();
    }
}
