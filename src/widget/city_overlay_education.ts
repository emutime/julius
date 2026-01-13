import { building } from 'building/building';
import { building_type } from 'building/type';
import { figure } from 'figure/figure';
import { figure_type } from 'figure/type';
import { overlay } from 'game/state';
import { tooltip_context } from 'graphics/tooltip';
import { city_overlay, column_type, NO_COLUMN } from 'widget/city_overlay';
import BUILDING_SCHOOL = building_type.BUILDING_SCHOOL;
import BUILDING_ACADEMY = building_type.BUILDING_ACADEMY;
import BUILDING_LIBRARY = building_type.BUILDING_LIBRARY;
;
import FIGURE_SCHOOL_CHILD = figure_type.FIGURE_SCHOOL_CHILD;
import FIGURE_TEACHER = figure_type.FIGURE_TEACHER;
import FIGURE_LIBRARIAN = figure_type.FIGURE_LIBRARIAN;
import COLUMN_TYPE_ACCESS = column_type.COLUMN_TYPE_ACCESS;
import OVERLAY_EDUCATION = overlay.OVERLAY_EDUCATION;
import OVERLAY_SCHOOL = overlay.OVERLAY_SCHOOL;
import OVERLAY_LIBRARY = overlay.OVERLAY_LIBRARY;
import OVERLAY_ACADEMY = overlay.OVERLAY_ACADEMY;
function show_building_education(b: building) {
    return b.type == BUILDING_SCHOOL || b.type == BUILDING_LIBRARY || b.type == BUILDING_ACADEMY;
}
function show_building_school(b: building) {
    return b.type == BUILDING_SCHOOL;
}
function show_building_library(b: building) {
    return b.type == BUILDING_LIBRARY;
}
function show_building_academy(b: building) {
    return b.type == BUILDING_ACADEMY;
}
function show_figure_education(f: figure) {
    return f.type == FIGURE_SCHOOL_CHILD || f.type == FIGURE_LIBRARIAN || f.type == FIGURE_TEACHER;
}
function show_figure_school(f: figure) {
    return f.type == FIGURE_SCHOOL_CHILD;
}
function show_figure_library(f: figure) {
    return f.type == FIGURE_LIBRARIAN;
}
function show_figure_academy(f: figure) {
    return f.type == FIGURE_TEACHER;
}
function get_column_height_education(b: building) {
    return b.house_size && b.data.house.education ? b.data.house.education * 3 - 1 : NO_COLUMN;
}
function get_column_height_school(b: building) {
    return b.house_size && b.data.house.school ? b.data.house.school / 10 : NO_COLUMN;
}
function get_column_height_library(b: building) {
    return b.house_size && b.data.house.library ? b.data.house.library / 10 : NO_COLUMN;
}
function get_column_height_academy(b: building) {
    return b.house_size && b.data.house.academy ? b.data.house.academy / 10 : NO_COLUMN;
}
function get_tooltip_education(c: tooltip_context, b: building) {
    switch (b.data.house.education) {
        case 0:
            return 100;
        case 1:
            return 101;
        case 2:
            return 102;
        case 3:
            return 103;
        default: return 0
    }
}
function get_tooltip_school(c: tooltip_context, b: building) {
    if (b.data.house.school <= 0) {
        return 19;
    } else if (b.data.house.school >= 80) {
        return 20;
    } else if (b.data.house.school >= 20) {
        return 21;
    } else {
        return 22;
    }
}
function get_tooltip_library(c: tooltip_context, b: building) {
    if (b.data.house.library <= 0) {
        return 23;
    } else if (b.data.house.library >= 80) {
        return 24;
    } else if (b.data.house.library >= 20) {
        return 25;
    } else {
        return 26;
    }
}
function get_tooltip_academy(c: tooltip_context, b: building) {
    if (b.data.house.academy <= 0) {
        return 27;
    } else if (b.data.house.academy >= 80) {
        return 28;
    } else if (b.data.house.academy >= 20) {
        return 29;
    } else {
        return 30;
    }
}
export function city_overlay_for_education() {
    let overlay: city_overlay = new city_overlay(
        OVERLAY_EDUCATION,
        COLUMN_TYPE_ACCESS,
        show_building_education,
        show_figure_education,
        get_column_height_education,
        0,
        get_tooltip_education,
        0,
        0
    );
    return overlay;
}
export function city_overlay_for_school() {
    let overlay: city_overlay = new city_overlay(
        OVERLAY_SCHOOL,
        COLUMN_TYPE_ACCESS,
        show_building_school,
        show_figure_school,
        get_column_height_school,
        0,
        get_tooltip_school,
        0,
        0
    );
    return overlay;
}
export function city_overlay_for_library() {
    let overlay: city_overlay = new city_overlay(
        OVERLAY_LIBRARY,
        COLUMN_TYPE_ACCESS,
        show_building_library,
        show_figure_library,
        get_column_height_library,
        0,
        get_tooltip_library,
        0,
        0
    );
    return overlay;
}
export function city_overlay_for_academy() {
    let overlay: city_overlay = new city_overlay(
        OVERLAY_ACADEMY,
        COLUMN_TYPE_ACCESS,
        show_building_academy,
        show_figure_academy,
        get_column_height_academy,
        0,
        get_tooltip_academy,
        0,
        0
    );
    return overlay;
}
