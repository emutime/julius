import { color_t } from "graphics/color";
import { Ref } from "../../ext/crt";

export function system_version(): string {
    return "0.0.0";
}
export function system_resize(width: number, height: number): void {

}
export function system_center(): void {

}
export function system_is_fullscreen_only(): number {
    return 0;
}
export function system_set_fullscreen(fullscreen: boolean): void {

}
export function system_scale_display(scale_percentage: number): number {
    return 0;
}
export function system_can_scale_display(min_scale: Ref<number>, max_scale: Ref<number>): number {
    return 0;
}
export function system_init_cursors(scale_percentage: number): void {

}
export function system_set_cursor(cursor_id: number): void {

}
export function system_keyboard_key_for_symbol(name: string): number {
    return 0;
}
export function system_keyboard_key_name(key: number): string {
    return "";
}
export function system_keyboard_key_modifier_name(modifier: number): string {
    return ""
}
export function system_keyboard_set_input_rect(x: number, y: number, width: number, height: number): void {

}
export function system_keyboard_show(): void {

}
export function system_keyboard_hide(): void {

}
export function system_start_text_input(): void {

}
export function system_stop_text_input(): void {

}
export function system_mouse_set_relative_mode(enabled: number): void {

}
export function system_mouse_get_relative_state(x: Ref<number>, y: Ref<number>): void {

}
export function system_move_mouse_cursor(delta_x: number, delta_y: number): void {

}
export function system_set_mouse_position(x: Ref<number>, y: Ref<number>): void {

}
export function system_create_framebuffer(width: number, height: number): Ref<color_t> {
    return null;
}
export function system_exit(): void {

}
