
import { building } from 'building/building';
import { figure } from 'figure/figure';
import { tooltip_type } from 'graphics/tooltip';
;
export const enum column_type {
    COLUMN_TYPE_RISK,
    COLUMN_TYPE_ACCESS,
}
export class city_overlay {
    public type: number = 0;
    public column_type: number = 0;
    public show_building: (b: building) => void = null;
    public show_figure: (f: figure) => void = null;
    public get_column_height: () => number = null;
    public get_tooltip_for_grid_offset: (offset: number) => tooltip_type = null;
    public get_tooltip_for_building: (b: building) => tooltip_type = null;
    public draw_custom_footprint: (x: number, y: number, grid_offset: number) => void = null;
    public draw_custom_top: () => void = null;
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
