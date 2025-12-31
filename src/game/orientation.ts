
;
import { city_view_orientation, city_view_rotate_left, city_view_rotate_right } from 'city/view';
import { city_warning_show, warning_type } from 'city/warning';
import { direction_type } from 'core/direction';
import { map_orientation_change } from 'map/orientation';
import { widget_minimap_invalidate } from 'widget/minimap';
import WARNING_ORIENTATION = warning_type.WARNING_ORIENTATION;
import DIR_2_RIGHT = direction_type.DIR_2_RIGHT;
import DIR_4_BOTTOM = direction_type.DIR_4_BOTTOM;
import DIR_6_LEFT = direction_type.DIR_6_LEFT;
export function game_orientation_rotate_left() {
    city_view_rotate_left();
    map_orientation_change(0);
    widget_minimap_invalidate();
    city_warning_show(WARNING_ORIENTATION);
}
export function game_orientation_rotate_right() {
    city_view_rotate_right();
    map_orientation_change(1);
    widget_minimap_invalidate();
    city_warning_show(WARNING_ORIENTATION);
}
export function game_orientation_rotate_north() {
    switch (city_view_orientation()) {
        case DIR_2_RIGHT:
            city_view_rotate_right();
            map_orientation_change(1);
            break
        case DIR_4_BOTTOM:
            city_view_rotate_left();
            map_orientation_change(0);
        case DIR_6_LEFT:
            city_view_rotate_left();
            map_orientation_change(0);
            break
        default: // already north
            return
    }
    widget_minimap_invalidate();
    city_warning_show(WARNING_ORIENTATION);
}
