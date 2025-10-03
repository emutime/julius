
import { city_victory_reset } from 'city/victory';
import { city_view_reset_orientation, city_view_set_camera } from 'city/view';
import { city_warning_clear_all } from 'city/warning';
import { random_generate_pool } from 'core/random';
import { overlay } from 'game/state';
import { map_ring_init } from 'map/ring';
import OVERLAY_NONE = overlay.OVERLAY_NONE;
;
export class unnamed9_8 {
    public paused: number = 0;
    public current_overlay: number = 0;
    public previous_overlay: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.paused = args[0]);
        args.length >= 2 && (this.current_overlay = args[1]);
        args.length >= 3 && (this.previous_overlay = args[2]);
    }
}
let data: unnamed9_8 = new unnamed9_8(0, OVERLAY_NONE, OVERLAY_NONE);
export function game_state_init() {
    city_victory_reset();
    map_ring_init();
    city_view_reset_orientation();
    city_view_set_camera(76, 152);
    random_generate_pool();
    city_warning_clear_all();
}
export function game_state_is_paused() {
    return data.paused;
}
export function game_state_unpause() {
    data.paused = 0;
}
export function game_state_toggle_paused() {
    data.paused = data.paused ? 0 : 1;
}
export function game_state_overlay() {
    return data.current_overlay;
}
export function game_state_reset_overlay() {
    data.current_overlay = OVERLAY_NONE;
    data.previous_overlay = OVERLAY_NONE;
}
export function game_state_toggle_overlay() {
    let tmp: number = data.previous_overlay;
    data.previous_overlay = data.current_overlay;
    data.current_overlay = tmp;
}
export function game_state_set_overlay(overlay: number) {
    if (overlay == OVERLAY_NONE) {
        data.previous_overlay = data.current_overlay;
    } else {
        data.previous_overlay = OVERLAY_NONE;
    }
    data.current_overlay = overlay;
}
