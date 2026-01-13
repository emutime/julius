import { building } from 'building/building';
import { building_type } from 'building/type';
import { figure } from 'figure/figure';
import { figure_type } from 'figure/type';
import { overlay } from 'game/state';
import { tooltip_context } from 'graphics/tooltip';
import { city_overlay, column_type, NO_COLUMN } from 'widget/city_overlay';
import BUILDING_DOCTOR = building_type.BUILDING_DOCTOR;
import BUILDING_HOSPITAL = building_type.BUILDING_HOSPITAL;
import BUILDING_BATHHOUSE = building_type.BUILDING_BATHHOUSE;
import BUILDING_BARBER = building_type.BUILDING_BARBER;
;
import FIGURE_BARBER = figure_type.FIGURE_BARBER;
import FIGURE_BATHHOUSE_WORKER = figure_type.FIGURE_BATHHOUSE_WORKER;
import FIGURE_DOCTOR = figure_type.FIGURE_DOCTOR;
import FIGURE_SURGEON = figure_type.FIGURE_SURGEON;
import COLUMN_TYPE_ACCESS = column_type.COLUMN_TYPE_ACCESS;
import OVERLAY_BARBER = overlay.OVERLAY_BARBER;
import OVERLAY_BATHHOUSE = overlay.OVERLAY_BATHHOUSE;
import OVERLAY_CLINIC = overlay.OVERLAY_CLINIC;
import OVERLAY_HOSPITAL = overlay.OVERLAY_HOSPITAL;
function show_building_barber(b: building) {
    return b.type == BUILDING_BARBER;
}
function show_building_bathhouse(b: building) {
    return b.type == BUILDING_BATHHOUSE;
}
function show_building_clinic(b: building) {
    return b.type == BUILDING_DOCTOR;
}
function show_building_hospital(b: building) {
    return b.type == BUILDING_HOSPITAL;
}
function show_figure_barber(f: figure) {
    return f.type == FIGURE_BARBER;
}
function show_figure_bathhouse(f: figure) {
    return f.type == FIGURE_BATHHOUSE_WORKER;
}
function show_figure_clinic(f: figure) {
    return f.type == FIGURE_DOCTOR;
}
function show_figure_hospital(f: figure) {
    return f.type == FIGURE_SURGEON;
}
function get_column_height_barber(b: building) {
    return b.house_size && b.data.house.barber ? b.data.house.barber / 10 : NO_COLUMN;
}
function get_column_height_bathhouse(b: building) {
    return b.house_size && b.data.house.bathhouse ? b.data.house.bathhouse / 10 : NO_COLUMN;
}
function get_column_height_clinic(b: building) {
    return b.house_size && b.data.house.clinic ? b.data.house.clinic / 10 : NO_COLUMN;
}
function get_column_height_hospital(b: building) {
    return b.house_size && b.data.house.hospital ? b.data.house.hospital / 10 : NO_COLUMN;
}
function get_tooltip_barber(c: tooltip_context, b: building) {
    if (b.data.house.barber <= 0) {
        return 31;
    } else if (b.data.house.barber >= 80) {
        return 32;
    } else if (b.data.house.barber < 20) {
        return 33;
    } else {
        return 34;
    }
}
function get_tooltip_bathhouse(c: tooltip_context, b: building) {
    if (b.data.house.bathhouse <= 0) {
        return 8;
    } else if (b.data.house.bathhouse >= 80) {
        return 9;
    } else if (b.data.house.bathhouse >= 20) {
        return 10;
    } else {
        return 11;
    }
}
function get_tooltip_clinic(c: tooltip_context, b: building) {
    if (b.data.house.clinic <= 0) {
        return 35;
    } else if (b.data.house.clinic >= 80) {
        return 36;
    } else if (b.data.house.clinic >= 20) {
        return 37;
    } else {
        return 38;
    }
}
function get_tooltip_hospital(c: tooltip_context, b: building) {
    if (b.data.house.hospital <= 0) {
        return 39;
    } else if (b.data.house.hospital >= 80) {
        return 40;
    } else if (b.data.house.hospital >= 20) {
        return 41;
    } else {
        return 42;
    }
}
export function city_overlay_for_barber() {
    let overlay: city_overlay = new city_overlay(
        OVERLAY_BARBER,
        COLUMN_TYPE_ACCESS,
        show_building_barber,
        show_figure_barber,
        get_column_height_barber,
        0,
        get_tooltip_barber,
        0,
        0
    );
    return overlay;
}
export function city_overlay_for_bathhouse() {
    let overlay: city_overlay = new city_overlay(
        OVERLAY_BATHHOUSE,
        COLUMN_TYPE_ACCESS,
        show_building_bathhouse,
        show_figure_bathhouse,
        get_column_height_bathhouse,
        0,
        get_tooltip_bathhouse,
        0,
        0
    );
    return overlay;
}
export function city_overlay_for_clinic() {
    let overlay: city_overlay = new city_overlay(
        OVERLAY_CLINIC,
        COLUMN_TYPE_ACCESS,
        show_building_clinic,
        show_figure_clinic,
        get_column_height_clinic,
        0,
        get_tooltip_clinic,
        0,
        0
    );
    return overlay;
}
export function city_overlay_for_hospital() {
    let overlay: city_overlay = new city_overlay(
        OVERLAY_HOSPITAL,
        COLUMN_TYPE_ACCESS,
        show_building_hospital,
        show_figure_hospital,
        get_column_height_hospital,
        0,
        get_tooltip_hospital,
        0,
        0
    );
    return overlay;
}
