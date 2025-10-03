import { NO_COLUMN } from 'widget/city_overlay';
import { building_type } from 'building/type';
import BUILDING_AMPHITHEATER = building_type.BUILDING_AMPHITHEATER;
import BUILDING_THEATER = building_type.BUILDING_THEATER;
import BUILDING_HIPPODROME = building_type.BUILDING_HIPPODROME;
import BUILDING_COLOSSEUM = building_type.BUILDING_COLOSSEUM;
import BUILDING_GLADIATOR_SCHOOL = building_type.BUILDING_GLADIATOR_SCHOOL;
import BUILDING_LION_HOUSE = building_type.BUILDING_LION_HOUSE;
import BUILDING_ACTOR_COLONY = building_type.BUILDING_ACTOR_COLONY;
import BUILDING_CHARIOT_MAKER = building_type.BUILDING_CHARIOT_MAKER;
import { building_type } from 'building/type';;
import { buffer } from 'core/buffer';
import { building } from 'building/building';
import { building_get } from 'building/building';
import { direction_type } from 'core/direction';
import { figure_action } from 'figure/action';
import FIGURE_ACTION_94_ENTERTAINER_ROAMING = figure_action.FIGURE_ACTION_94_ENTERTAINER_ROAMING;
import FIGURE_ACTION_95_ENTERTAINER_RETURNING = figure_action.FIGURE_ACTION_95_ENTERTAINER_RETURNING;
import { figure_type } from 'figure/type';
import FIGURE_ACTOR = figure_type.FIGURE_ACTOR;
import FIGURE_GLADIATOR = figure_type.FIGURE_GLADIATOR;
import FIGURE_LION_TAMER = figure_type.FIGURE_LION_TAMER;
import FIGURE_CHARIOTEER = figure_type.FIGURE_CHARIOTEER;
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
import { column_type } from 'widget/city_overlay';
import COLUMN_TYPE_ACCESS = column_type.COLUMN_TYPE_ACCESS;
import { city_overlay } from 'widget/city_overlay';
import { overlay } from 'game/state';
import OVERLAY_ENTERTAINMENT = overlay.OVERLAY_ENTERTAINMENT;
import OVERLAY_THEATER = overlay.OVERLAY_THEATER;
import OVERLAY_AMPHITHEATER = overlay.OVERLAY_AMPHITHEATER;
import OVERLAY_COLOSSEUM = overlay.OVERLAY_COLOSSEUM;
import OVERLAY_HIPPODROME = overlay.OVERLAY_HIPPODROME;
function show_building_entertainment(b: building) {
    return
    b.type == BUILDING_ACTOR_COLONY || b.type == BUILDING_THEATER ||
        b.type == BUILDING_GLADIATOR_SCHOOL || b.type == BUILDING_AMPHITHEATER ||
        b.type == BUILDING_LION_HOUSE || b.type == BUILDING_COLOSSEUM ||
        b.type == BUILDING_CHARIOT_MAKER || b.type == BUILDING_HIPPODROME;
}
function show_building_theater(b: building) {
    return b.type == BUILDING_ACTOR_COLONY || b.type == BUILDING_THEATER;
}
function show_building_amphitheater(b: building) {
    return b.type == BUILDING_ACTOR_COLONY
        || b.type == BUILDING_GLADIATOR_SCHOOL
        || b.type == BUILDING_AMPHITHEATER;
}
function show_building_colosseum(b: building) {
    return b.type == BUILDING_GLADIATOR_SCHOOL || b.type == BUILDING_LION_HOUSE || b.type == BUILDING_COLOSSEUM;
}
function show_building_hippodrome(b: building) {
    return b.type == BUILDING_CHARIOT_MAKER || b.type == BUILDING_HIPPODROME;
}
function get_entertainment_building(f: figure) {
    if (f.action_state == FIGURE_ACTION_94_ENTERTAINER_ROAMING ||
        f.action_state == FIGURE_ACTION_95_ENTERTAINER_RETURNING) {
        return building_get(f.building_id);
    } else {
        return building_get(f.destination_building_id);
    }
}
function show_figure_entertainment(f: figure) {
    return f.type == FIGURE_ACTOR || f.type == FIGURE_GLADIATOR ||
        f.type == FIGURE_LION_TAMER || f.type == FIGURE_CHARIOTEER;
}
function show_figure_theater(f: figure) {
    if (f.type == FIGURE_ACTOR) {
        return get_entertainment_building(f).type == BUILDING_THEATER;
    }
    return 0;
}
function show_figure_amphitheater(f: figure) {
    if (f.type == FIGURE_ACTOR || f.type == FIGURE_GLADIATOR) {
        return get_entertainment_building(f).type == BUILDING_AMPHITHEATER;
    }
    return 0;
}
function show_figure_colosseum(f: figure) {
    if (f.type == FIGURE_GLADIATOR) {
        return get_entertainment_building(f).type == BUILDING_COLOSSEUM;
    } else if (f.type == FIGURE_LION_TAMER) {
        return 1;
    }
    return 0;
}
function show_figure_hippodrome(f: figure) {
    return f.type == FIGURE_CHARIOTEER;
}
function get_column_height_entertainment(b: building) {
    return b.house_size && b.data.house.entertainment ? b.data.house.entertainment / 10 : NO_COLUMN;
}
function get_column_height_theater(b: building) {
    return b.house_size && b.data.house.theater ? b.data.house.theater / 10 : NO_COLUMN;
}
function get_column_height_amphitheater(b: building) {
    return b.house_size && b.data.house.amphitheater_actor ? b.data.house.amphitheater_actor / 10 : NO_COLUMN;
}
function get_column_height_colosseum(b: building) {
    return b.house_size && b.data.house.colosseum_gladiator ? b.data.house.colosseum_gladiator / 10 : NO_COLUMN;
}
function get_column_height_hippodrome(b: building) {
    return b.house_size && b.data.house.hippodrome ? b.data.house.hippodrome / 10 : NO_COLUMN;
}
function get_tooltip_entertainment(c: tooltip_context, b: building) {
    if (b.data.house.entertainment <= 0) {
        return 64;
    } else if (b.data.house.entertainment < 10) {
        return 65;
    } else if (b.data.house.entertainment < 20) {
        return 66;
    } else if (b.data.house.entertainment < 30) {
        return 67;
    } else if (b.data.house.entertainment < 40) {
        return 68;
    } else if (b.data.house.entertainment < 50) {
        return 69;
    } else if (b.data.house.entertainment < 60) {
        return 70;
    } else if (b.data.house.entertainment < 70) {
        return 71;
    } else if (b.data.house.entertainment < 80) {
        return 72;
    } else if (b.data.house.entertainment < 90) {
        return 73;
    } else {
        return 74;
    }
}
function get_tooltip_theater(c: tooltip_context, b: building) {
    if (b.data.house.theater <= 0) {
        return 75;
    } else if (b.data.house.theater >= 80) {
        return 76;
    } else if (b.data.house.theater >= 20) {
        return 77;
    } else {
        return 78;
    }
}
function get_tooltip_amphitheater(c: tooltip_context, b: building) {
    if (b.data.house.amphitheater_actor <= 0) {
        return 79;
    } else if (b.data.house.amphitheater_actor >= 80) {
        return 80;
    } else if (b.data.house.amphitheater_actor >= 20) {
        return 81;
    } else {
        return 82;
    }
}
function get_tooltip_colosseum(c: tooltip_context, b: building) {
    if (b.data.house.colosseum_gladiator <= 0) {
        return 83;
    } else if (b.data.house.colosseum_gladiator >= 80) {
        return 84;
    } else if (b.data.house.colosseum_gladiator >= 20) {
        return 85;
    } else {
        return 86;
    }
}
function get_tooltip_hippodrome(c: tooltip_context, b: building) {
    if (b.data.house.hippodrome <= 0) {
        return 87;
    } else if (b.data.house.hippodrome >= 80) {
        return 88;
    } else if (b.data.house.hippodrome >= 20) {
        return 89;
    } else {
        return 90;
    }
}
export function city_overlay_for_entertainment() {
    let overlay: city_overlay = {
        OVERLAY_ENTERTAINMENT,
        COLUMN_TYPE_ACCESS,
        show_building_entertainment,
        show_figure_entertainment,
        get_column_height_entertainment,
        0,
        get_tooltip_entertainment,
        0,
        0
    };
    return overlay;
}
export function city_overlay_for_theater() {
    let overlay: city_overlay = {
        OVERLAY_THEATER,
        COLUMN_TYPE_ACCESS,
        show_building_theater,
        show_figure_theater,
        get_column_height_theater,
        0,
        get_tooltip_theater,
        0,
        0
    };
    return overlay;
}
export function city_overlay_for_amphitheater() {
    let overlay: city_overlay = {
        OVERLAY_AMPHITHEATER,
        COLUMN_TYPE_ACCESS,
        show_building_amphitheater,
        show_figure_amphitheater,
        get_column_height_amphitheater,
        0,
        get_tooltip_amphitheater,
        0,
        0
    };
    return overlay;
}
export function city_overlay_for_colosseum() {
    let overlay: city_overlay = {
        OVERLAY_COLOSSEUM,
        COLUMN_TYPE_ACCESS,
        show_building_colosseum,
        show_figure_colosseum,
        get_column_height_colosseum,
        0,
        get_tooltip_colosseum,
        0,
        0
    };
    return overlay;
}
export function city_overlay_for_hippodrome() {
    let overlay: city_overlay = {
        OVERLAY_HIPPODROME,
        COLUMN_TYPE_ACCESS,
        show_building_hippodrome,
        show_figure_hippodrome,
        get_column_height_hippodrome,
        0,
        get_tooltip_hippodrome,
        0,
        0
    };
    return overlay;
}
