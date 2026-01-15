export const SPEED_CHANGE_IMMEDIATE = 0;
import { time_millis } from 'core/time';
import { time_get_millis } from 'core/time';
import { speed_direction } from 'core/speed';
import SPEED_DIRECTION_NEGATIVE = speed_direction.SPEED_DIRECTION_NEGATIVE;
import SPEED_DIRECTION_STOPPED = speed_direction.SPEED_DIRECTION_STOPPED;
import SPEED_DIRECTION_POSITIVE = speed_direction.SPEED_DIRECTION_POSITIVE;
export class speed_type {
    public start_time: time_millis = null;
    public total_time: time_millis = null;
    public last_speed_check: time_millis = null;
    public speed_difference: number = 0;
    public desired_speed: number = 0;
    public current_speed: number = 0;
    public adjusted_current_speed: number = 0;
    public cumulative_delta: number = 0;
    public fine_position: number = 0;
    public adjust_for_time: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.start_time = args[0]);
        args.length >= 2 && (this.total_time = args[1]);
        args.length >= 3 && (this.last_speed_check = args[2]);
        args.length >= 4 && (this.speed_difference = args[3]);
        args.length >= 5 && (this.desired_speed = args[4]);
        args.length >= 6 && (this.current_speed = args[5]);
        args.length >= 7 && (this.adjusted_current_speed = args[6]);
        args.length >= 8 && (this.cumulative_delta = args[7]);
        args.length >= 9 && (this.fine_position = args[8]);
        args.length >= 10 && (this.adjust_for_time = args[9]);
    }
}
const FRAME_TIME = 16.67;
export function speed_clear(speed: speed_type) {
    speed.cumulative_delta = 0.0;
    speed.fine_position = 0.0;
    speed.desired_speed = 0.0;
    speed.current_speed = 0.0;
    speed.speed_difference = 0.0;
    speed.start_time = 0;
    speed.total_time = 0;
    speed.last_speed_check = time_get_millis();
}
function adjust_speed_for_elapsed_time(delta: number, adjust_for_time: number, last_time: time_millis) {
    return adjust_for_time ? (delta / FRAME_TIME) * (time_get_millis() - last_time) : delta;
}
function adjust_speed_for_frame_time(delta: number, adjust_for_time: number, last_time: time_millis) {
    return adjust_for_time ? ((delta / (time_get_millis() - last_time)) * FRAME_TIME) : delta;
}
export function speed_set_target(speed: speed_type, new_speed: number, total_time: time_millis, adjust_for_time: number) {
    speed.adjust_for_time = adjust_for_time;
    if (new_speed == speed.desired_speed) {
        return;
    }
    if (total_time == SPEED_CHANGE_IMMEDIATE) {
        speed.desired_speed = new_speed;
        speed.current_speed = new_speed;
        speed.total_time = total_time;
        if (!adjust_for_time && time_get_millis() - speed.last_speed_check > 0) {
            speed.adjusted_current_speed = adjust_speed_for_frame_time(new_speed, 1, speed.last_speed_check);
        } else {
            speed.adjusted_current_speed = new_speed;
        }
        return;
    }
    speed.cumulative_delta = 0.0;
    speed.fine_position = 0.0;
    let base_speed: number = adjust_for_time ? speed.adjusted_current_speed : speed.current_speed;
    speed.speed_difference = base_speed - new_speed;
    speed.desired_speed = new_speed;
    speed.start_time = time_get_millis();
    speed.total_time = total_time;
}
export function speed_invert(speed: speed_type) {
    speed_set_target(speed, -speed.current_speed, SPEED_CHANGE_IMMEDIATE, speed.adjust_for_time);
}
export function speed_get_current_direction(speed: speed_type) {
    if (!speed.current_speed) {
        return SPEED_DIRECTION_STOPPED;
    }
    return (speed.current_speed > 0) ? SPEED_DIRECTION_POSITIVE : SPEED_DIRECTION_NEGATIVE;
}
function handle_fine_position(speed: speed_type, delta: number) {
    let delta_rounded: number = Math.floor(delta);
    speed.fine_position += delta - delta_rounded;
    let extra_position: number = Math.floor(speed.fine_position);
    speed.fine_position -= extra_position;
    return delta_rounded + extra_position;
}
export function speed_get_delta(speed: speed_type) {
    if (speed.adjust_for_time && speed.last_speed_check == time_get_millis()) {
        return 0;
    }
    let delta: number;
    let elapsed: time_millis = time_get_millis() - speed.start_time;
    let desired: number = speed.desired_speed;
    desired = adjust_speed_for_elapsed_time(speed.desired_speed, speed.adjust_for_time, speed.last_speed_check);
    if (speed.total_time == SPEED_CHANGE_IMMEDIATE) {
        delta = desired;
    } else if (speed.current_speed == speed.desired_speed || elapsed > speed.total_time * 4) {
        delta = desired;
        speed.current_speed = speed.desired_speed;
        speed.adjusted_current_speed = speed.desired_speed;
    } else {
        if (elapsed == 0) {
            delta = adjust_speed_for_elapsed_time(
                speed.current_speed, speed.adjust_for_time, speed.last_speed_check);
        } else {
            let full_delta: number = speed.speed_difference * (speed.total_time / FRAME_TIME);
            let exponent: number = Math.exp(-(Math.floor(elapsed)) / speed.total_time);
            delta = full_delta - full_delta * exponent - speed.cumulative_delta;
            speed.cumulative_delta += delta;
            delta += desired;
            speed.current_speed = adjust_speed_for_frame_time(delta, speed.adjust_for_time, speed.last_speed_check);
            speed.adjusted_current_speed = speed.current_speed;
        }
    }
    speed.last_speed_check = time_get_millis();
    return handle_fine_position(speed, delta);
}
export function speed_is_changing(speed: speed_type) {
    return speed.current_speed != speed.desired_speed;
}
