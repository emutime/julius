
export type time_millis = number;
let current_time: time_millis;
export function time_get_millis() {
    return current_time;
}
export function time_set_millis(millis: time_millis) {
    current_time = millis;
}
