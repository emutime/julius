
;
import { city_message_post, city_message_type } from 'city/message';
import { buffer, buffer_read_i32, buffer_write_i32 } from 'core/buffer';
import { random_byte } from 'core/random';
import { game_time_month, game_time_year } from 'game/time';
import MESSAGE_EMPEROR_CHANGE = city_message_type.MESSAGE_EMPEROR_CHANGE;
export let scenario: scenario_t = new scenario_t();
export class unnamed10_8 {
    public game_year: number = 0;
    public month: number = 0;
    public state: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.game_year = args[0]);
        args.length >= 2 && (this.month = args[1]);
        args.length >= 3 && (this.state = args[2]);
    }
}
let data: unnamed10_8 = new unnamed10_8();
export function scenario_emperor_change_init() {
    data.game_year = scenario.start_year + scenario.emperor_change.year;
    data.month = 1 + (random_byte() & 7);
    data.state = 0;
}
export function scenario_emperor_change_process() {
    if (!scenario.emperor_change.enabled) {
        return;
    }
    if (data.state == 0) {
        if (game_time_year() == data.game_year && game_time_month() == data.month) {
            data.state = 1;
            city_message_post(true, MESSAGE_EMPEROR_CHANGE, 0, 0);
        }
    }
}
export function scenario_emperor_change_save_state(time: buffer, state: buffer) {
    buffer_write_i32(time, data.game_year);
    buffer_write_i32(time, data.month);
    buffer_write_i32(state, data.state);
}
export function scenario_emperor_change_load_state(time: buffer, state: buffer) {
    data.game_year = buffer_read_i32(time);
    data.month = buffer_read_i32(time);
    data.state = buffer_read_i32(state);
}
