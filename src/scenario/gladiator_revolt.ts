
;
import { building_count_active } from 'building/count';
import { building_type } from 'building/type';
import { city_message_post, city_message_type } from 'city/message';
import { buffer, buffer_read_i32, buffer_write_i32 } from 'core/buffer';
import { random_byte } from 'core/random';
import { game_time_month, game_time_year } from 'game/time';
import { event } from 'scenario/data';
import BUILDING_GLADIATOR_SCHOOL = building_type.BUILDING_GLADIATOR_SCHOOL;
import MESSAGE_GLADIATOR_REVOLT = city_message_type.MESSAGE_GLADIATOR_REVOLT;
import MESSAGE_GLADIATOR_REVOLT_FINISHED = city_message_type.MESSAGE_GLADIATOR_REVOLT_FINISHED;
import EVENT_NOT_STARTED = event.EVENT_NOT_STARTED;
import EVENT_IN_PROGRESS = event.EVENT_IN_PROGRESS;
import EVENT_FINISHED = event.EVENT_FINISHED;
export let scenario: scenario_t = new scenario_t();
export class unnamed9_8 {
    public game_year: number = 0;
    public month: number = 0;
    public end_month: number = 0;
    public state: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.game_year = args[0]);
        args.length >= 2 && (this.month = args[1]);
        args.length >= 3 && (this.end_month = args[2]);
        args.length >= 4 && (this.state = args[3]);
    }
}
let data: unnamed9_8 = new unnamed9_8();
export function scenario_gladiator_revolt_init() {
    data.game_year = scenario.start_year + scenario.gladiator_revolt.year;
    data.month = 3 + (random_byte() & 3);
    data.end_month = 3 + data.month;
    data.state = EVENT_NOT_STARTED;
}
export function scenario_gladiator_revolt_process() {
    if (!scenario.gladiator_revolt.enabled) {
        return;
    }
    if (data.state == EVENT_NOT_STARTED) {
        if (game_time_year() == data.game_year && game_time_month() == data.month) {
            if (building_count_active(BUILDING_GLADIATOR_SCHOOL) > 0) {
                data.state = EVENT_IN_PROGRESS;
                city_message_post(true, MESSAGE_GLADIATOR_REVOLT, 0, 0);
            } else {
                data.state = EVENT_FINISHED;
            }
        }
    } else if (data.state == EVENT_IN_PROGRESS) {
        if (data.end_month == game_time_month()) {
            data.state = EVENT_FINISHED;
            city_message_post(true, MESSAGE_GLADIATOR_REVOLT_FINISHED, 0, 0);
        }
    }
}
export function scenario_gladiator_revolt_is_in_progress() {
    return data.state == EVENT_IN_PROGRESS;
}
export function scenario_gladiator_revolt_is_finished() {
    return data.state == EVENT_FINISHED;
}
export function scenario_gladiator_revolt_save_state(buf: buffer) {
    buffer_write_i32(buf, data.game_year);
    buffer_write_i32(buf, data.month);
    buffer_write_i32(buf, data.end_month);
    buffer_write_i32(buf, data.state);
}
export function scenario_gladiator_revolt_load_state(buf: buffer) {
    data.game_year = buffer_read_i32(buf);
    data.month = buffer_read_i32(buf);
    data.end_month = buffer_read_i32(buf);
    data.state = buffer_read_i32(buf);
}
