
;
import { city_view_set_viewport } from 'city/view';
import { city_warning_clear_all } from 'city/warning';
import { graphics_init_canvas } from 'graphics/graphics';
import { window_invalidate } from 'graphics/window';
class dialog_offset {
    public x: number = 0;
    public y: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.x = args[0]);
        args.length >= 2 && (this.y = args[1]);
    }
}
export class unnamed8_8 {
    public width: number = 0;
    public height: number = 0;
    public dialog_offset: dialog_offset = null;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.width = args[0]);
        args.length >= 2 && (this.height = args[1]);
        args.length >= 3 && (this.dialog_offset = args[2]);
    }
}
let data: unnamed8_8 = new unnamed8_8();
export function screen_set_resolution(width: number, height: number) {
    data.width = width;
    data.height = height;
    data.dialog_offset.x = (width - 640) / 2;
    data.dialog_offset.y = (height - 480) / 2;
    graphics_init_canvas(width, height);
    city_view_set_viewport(width, height);
    city_warning_clear_all();
    window_invalidate();
}
export function screen_width() {
    return data.width;
}
export function screen_height() {
    return data.height;
}
export function screen_dialog_offset_x() {
    return data.dialog_offset.x;
}
export function screen_dialog_offset_y() {
    return data.dialog_offset.y;
}
