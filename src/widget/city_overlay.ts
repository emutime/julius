
import { building_type } from 'building/type';;
import { buffer } from 'core/buffer';
import { building } from 'building/building';
import { direction_type } from 'core/direction';
import { figure_type } from 'figure/type';
import { figure } from 'figure/figure';
import { time_millis } from 'core/time';
import { touch_coords } from 'input/touch';
import { touch_mode } from 'input/touch';
import { touch } from 'input/touch';
import { mouse_button } from 'input/mouse';
import { scroll_state } from 'input/mouse';
import { mouse } from 'input/mouse';
import { tooltip_type } from 'graphics/tooltip';
import { tooltip_extra_text_type } from 'graphics/tooltip';
import { tooltip_context } from 'graphics/tooltip';
export const enum column_type {
    COLUMN_TYPE_RISK = undefined,
    COLUMN_TYPE_ACCESS = undefined,
}
export class city_overlay {
    public type: number = 0;
    public column_type: number = 0;
    public show_building: int ( = null;
    public show_figure: int ( = null;
    public get_column_height: int ( = null;
    public get_tooltip_for_grid_offset: int ( = null;
    public get_tooltip_for_building: int ( = null;
    public draw_custom_footprint: void ( = null;
    public draw_custom_top: void ( = null;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.type = args[0]);
        args.length >= 2 && (this.column_type = args[1]);
        args.length >= 3 && (this.show_building = args[2]);
        args.length >= 4 && (this.show_figure = args[3]);
        args.length >= 5 && (this.get_column_height = args[4]);
        args.length >= 6 && (this.get_tooltip_for_grid_offset = args[5]);
        args.length >= 7 && (this.get_tooltip_for_building = args[6]);
        args.length >= 8 && (this.draw_custom_footprint = args[7]);
        args.length >= 9 && (this.draw_custom_top = args[8]);
    }
}
