import { MAX_FORMATION_FIGURES } from 'figure/formation';
;
import { buffer } from 'core/buffer';
import { figure_type } from 'figure/type';
import { formation } from 'figure/formation';
import FORMATION_MAX = formation.FORMATION_MAX;
import { formation_state } from 'figure/formation';
import { formation } from 'figure/formation';
let FORMATION_LAYOUT_POSITION_X: number[] = new Array(FORMATION_MAX).fill({
    { 0, 1, 0, 1, - 1, -1, 0, 1, -1, 2, 2, 2, 0, 1, -1, 2},
{ 0, 0, -1, 1, -1, 1, -2, -2, 2, 2, -3, -3, 3, 3, -4, -4 },
{ 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 },
{ 0, 2, -2, 1, -1, 3, -3, 4, -4, 5, 6, -5, -6, 7, 8, -7 },
{ 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1 },
{ 0, 0, 1, 0, -1, 1, 1, -1, -1, 1, 1, -1, -1, 1, -1, 0 },
{ 0, 1, 0, 1, 2, 2, 1, 0, 2, 3, 3, 3, 1, 2, 0, 3 },
{ 0, 1, 0, 1, 2, 2, 1, 0, 2, 3, 3, 3, 1, 2, 0, 3 },
{ 0, 1, 0, 0, 1, -1, 2, -1, 1, 0, 1, 0, 1, -1, 1, -1 },
{ 0, 2, -1, 1, 1, -1, 3, -2, 0, -4, -1, 0, 1, 4, 2, -5 }, // herd
{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
{ 0, 2, 0, 2, -2, -2, 0, 2, -2, 4, 4, 4, 0, 2, -2, 4 },
{ 0, 1, 0, 1, 2, 2, 1, 0, 2, 3, 3, 3, 1, 2, 0, 3 }
});
let FORMATION_LAYOUT_POSITION_Y: number[] = new Array(FORMATION_MAX).fill({
    { 0, 0, 1, 1, 0, 1, - 1, -1, -1, -1, 0, 1, 2, 2, 2, 2},
{ 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 },
{ 0, -1, 1, 0, -1, 1, -2, -2, 2, 2, -3, -3, 3, 3, -4, -4 },
{ 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1 },
{ 0, -2, 2, -1, 1, -3, 3, -4, 4, -5, -6, 5, 6, -7, -8, 7 },
{ 0, -1, 0, 1, 0, -1, 1, 1, -1, -1, 1, 1, -1, 0, 0, 0 },
{ 0, 0, 1, 1, 0, 1, 2, 2, 2, 0, 1, 2, 3, 3, 3, 3 },
{ 0, 0, 1, 1, 0, 1, 2, 2, 2, 0, 1, 2, 3, 3, 3, 3 },
{ 0, -1, 1, 0, 0, 1, 1, -1, -1, 1, 0, 2, 1, 1, -2, 1 },
{ 0, 1, -1, 1, 0, 1, 1, -1, 2, 0, 3, 5, 4, 0, 3, 2 }, // herd
{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
{ 0, 0, 2, 2, 0, 2, -2, -2, -2, -2, 0, 2, 4, 4, 4, 4 },
{ 0, 0, 1, 1, 0, 1, 2, 2, 2, 0, 1, 2, 3, 3, 3, 3 }
});
export function formation_layout_position_x(layout: number, index: number) {
    return FORMATION_LAYOUT_POSITION_X[layout][index % MAX_FORMATION_FIGURES];
}
export function formation_layout_position_y(layout: number, index: number) {
    return FORMATION_LAYOUT_POSITION_Y[layout][index % MAX_FORMATION_FIGURES];
}
