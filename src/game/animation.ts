export const MAX_ANIM_TIMERS = 51;
import { time_get_millis, time_millis } from 'core/time';
export class unnamed7_8 {
    public last_update: time_millis = null;
    public should_update: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.last_update = args[0]);
        args.length >= 2 && (this.should_update = args[1]);
    }
}
let timers: unnamed7_8[] = new Array(MAX_ANIM_TIMERS);
export function game_animation_init() {
    for (let i: number = 0; i < MAX_ANIM_TIMERS; i++) {
        timers[i].last_update = 0;
        timers[i].should_update = 0;
    }
}
export function game_animation_update() {
    let now_millis: time_millis = time_get_millis();
    for (let i: number = 0; i < MAX_ANIM_TIMERS; i++) {
        timers[i].should_update = 0;
    }
    let delay_millis: number = 0;
    for (let i: number = 0; i < MAX_ANIM_TIMERS; i++) {
        if (now_millis - timers[i].last_update >= delay_millis) {
            timers[i].should_update = 1;
            timers[i].last_update = now_millis;
        }
        delay_millis += 20
    }
}
export function game_animation_should_advance(speed: number) {
    return timers[speed].should_update;
}
