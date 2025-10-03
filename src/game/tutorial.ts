
;
import { buffer } from 'core/buffer';
import { buffer_write_i32 } from 'core/buffer';
import { buffer_read_i32 } from 'core/buffer';
import { tutorial_availability } from 'game/tutorial';
import AVAILABLE = tutorial_availability.AVAILABLE;
import NOT_AVAILABLE = tutorial_availability.NOT_AVAILABLE;
import NOT_AVAILABLE_YET = tutorial_availability.NOT_AVAILABLE_YET;
import { tutorial_build_buttons } from 'game/tutorial';
import TUT_BUILD_NORMAL = tutorial_build_buttons.TUT_BUILD_NORMAL;
import TUT1_BUILD_START = tutorial_build_buttons.TUT1_BUILD_START;
import TUT1_BUILD_AFTER_FIRE = tutorial_build_buttons.TUT1_BUILD_AFTER_FIRE;
import TUT1_BUILD_AFTER_COLLAPSE = tutorial_build_buttons.TUT1_BUILD_AFTER_COLLAPSE;
import TUT2_BUILD_START = tutorial_build_buttons.TUT2_BUILD_START;
import TUT2_BUILD_UP_TO_250 = tutorial_build_buttons.TUT2_BUILD_UP_TO_250;
import TUT2_BUILD_UP_TO_450 = tutorial_build_buttons.TUT2_BUILD_UP_TO_450;
import TUT2_BUILD_AFTER_450 = tutorial_build_buttons.TUT2_BUILD_AFTER_450;
import { building_type } from 'building/type';
import { build_menu_group } from 'building/menu';
import { building_menu_update } from 'building/menu';
import { building } from 'building/building';
import { city_buildings_has_senate } from 'city/buildings';
import { message_category } from 'city/message';
import MESSAGE_CAT_TUTORIAL3 = message_category.MESSAGE_CAT_TUTORIAL3;
import { message_category } from 'city/message';
import { message_advisor } from 'city/message';
import { city_message_type } from 'city/message';
import MESSAGE_TUTORIAL_FIRE = city_message_type.MESSAGE_TUTORIAL_FIRE;
import MESSAGE_TUTORIAL_COLLAPSE = city_message_type.MESSAGE_TUTORIAL_COLLAPSE;
import MESSAGE_TUTORIAL_WATER = city_message_type.MESSAGE_TUTORIAL_WATER;
import MESSAGE_TUTORIAL_GROWING_YOUR_CITY = city_message_type.MESSAGE_TUTORIAL_GROWING_YOUR_CITY;
import MESSAGE_TUTORIAL_HUNGER_HALTS_IMMIGRANTS = city_message_type.MESSAGE_TUTORIAL_HUNGER_HALTS_IMMIGRANTS;
import MESSAGE_TUTORIAL_RELIGION = city_message_type.MESSAGE_TUTORIAL_RELIGION;
import MESSAGE_TUTORIAL_TAXES_INDUSTRY = city_message_type.MESSAGE_TUTORIAL_TAXES_INDUSTRY;
import MESSAGE_TUTORIAL_TRADE = city_message_type.MESSAGE_TUTORIAL_TRADE;
import MESSAGE_TUTORIAL_HEALTH = city_message_type.MESSAGE_TUTORIAL_HEALTH;
import { city_message_type } from 'city/message';
import { city_message } from 'city/message';
import { city_message_post } from 'city/message';
import { city_message_post_with_message_delay } from 'city/message';
import { city_mission_tutorial_set_fire_message_shown } from 'city/mission';
import { city_mission_tutorial_set_disease_message_shown } from 'city/mission';
import { city_mission_tutorial_show_disease_message } from 'city/mission';
import { city_mission_tutorial_add_senate } from 'city/mission';
import { city_mission_tutorial_has_senate } from 'city/mission';
import { city_population } from 'city/population';
import { resource_trade_status } from 'city/constants';
import { resource_type } from 'game/resource';
import RESOURCE_POTTERY = resource_type.RESOURCE_POTTERY;
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
import { resource_type } from 'game/resource';
import { workshop_type } from 'game/resource';
import { resource_image_type } from 'game/resource';
import { resource_list } from 'city/resource';
import { city_resource_count } from 'city/resource';
import { game_time_year } from 'game/time';
import { game_time_month } from 'game/time';
import { game_time_day } from 'game/time';
import { scenario_criteria_population } from 'scenario/criteria';
import { scenario_climate } from 'scenario/property';
import { scenario_is_tutorial_1 } from 'scenario/property';
import { scenario_is_tutorial_2 } from 'scenario/property';
import { scenario_is_tutorial_3 } from 'scenario/property';
class tutorial1 {
    public fire: number = 0;
    public crime: number = 0;
    public collapse: number = 0;
    public senate_built: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.fire = args[0]);
        args.length >= 2 && (this.crime = args[1]);
        args.length >= 3 && (this.collapse = args[2]);
        args.length >= 4 && (this.senate_built = args[3]);
    }
}
class tutorial2 {
    public granary_built: number = 0;
    public population_250_reached: number = 0;
    public population_450_reached: number = 0;
    public pottery_made: number = 0;
    public pottery_made_year: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.granary_built = args[0]);
        args.length >= 2 && (this.population_250_reached = args[1]);
        args.length >= 3 && (this.population_450_reached = args[2]);
        args.length >= 4 && (this.pottery_made = args[3]);
        args.length >= 5 && (this.pottery_made_year = args[4]);
    }
}
class tutorial3 {
    public disease: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.disease = args[0]);
    }
}
export class unnamed14_8 {
    public tutorial1: tutorial1 = null;
    public tutorial2: tutorial2 = null;
    public tutorial3: tutorial3 = null;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.tutorial1 = args[0]);
        args.length >= 2 && (this.tutorial2 = args[1]);
        args.length >= 3 && (this.tutorial3 = args[2]);
    }
}
let data: unnamed14_8 = new unnamed14_8();
export function tutorial_init() {
    let tut1: number = 1
    let tut2: number = 1
    let tut3: number = 1;
    if (scenario_is_tutorial_1()) {
        tut1 = tut2 = 0;
    } else if (scenario_is_tutorial_2()) {
        tut2 = 0;
    } else if (scenario_is_tutorial_3()) {
        tut3 = 0;
    }
    data.tutorial1.fire = tut1;
    data.tutorial1.crime = tut1;
    data.tutorial1.collapse = tut1;
    data.tutorial1.senate_built = tut1;
    city_mission_tutorial_set_fire_message_shown(tut1);
    data.tutorial2.granary_built = tut2;
    data.tutorial2.population_250_reached = tut2;
    data.tutorial2.population_450_reached = tut2;
    data.tutorial2.pottery_made = tut2;
    data.tutorial2.pottery_made_year = tut2;
    data.tutorial3.disease = tut3;
    city_mission_tutorial_set_disease_message_shown(tut3);
}
export function tutorial_advisor_empire_availability() {
    if (scenario_is_tutorial_1()) {
        return NOT_AVAILABLE;
    } else if (scenario_is_tutorial_2() && !data.tutorial2.population_250_reached) {
        return NOT_AVAILABLE_YET;
    } else {
        return AVAILABLE;
    }
}
export function tutorial_get_build_buttons() {
    if (scenario_is_tutorial_1()) {
        if (!data.tutorial1.fire && !data.tutorial1.crime) {
            return TUT1_BUILD_START;
        } else if (!data.tutorial1.collapse) {
            return TUT1_BUILD_AFTER_FIRE;
        } else if (!data.tutorial1.senate_built) {
            return TUT1_BUILD_AFTER_COLLAPSE;
        }
    } else if (scenario_is_tutorial_2()) {
        if (!data.tutorial2.granary_built) {
            return TUT2_BUILD_START;
        } else if (!data.tutorial2.population_250_reached) {
            return TUT2_BUILD_UP_TO_250;
        } else if (!data.tutorial2.population_450_reached) {
            return TUT2_BUILD_UP_TO_450;
        } else if (!data.tutorial2.pottery_made) {
            return TUT2_BUILD_AFTER_450;
        }
    }
    return TUT_BUILD_NORMAL;
}
export function tutorial_get_population_cap(current_cap: number) {
    if (scenario_is_tutorial_1()) {
        if (!data.tutorial1.fire ||
            !data.tutorial1.collapse ||
            !data.tutorial1.senate_built) {
            return 80;
        }
    } else if (scenario_is_tutorial_2()) {
        if (!data.tutorial2.granary_built) {
            return 150;
        } else if (!data.tutorial2.pottery_made) {
            return 520;
        }
    }
    return current_cap;
}
export function tutorial_get_immediate_goal_text() {
    if (scenario_is_tutorial_1()) {
        if (!data.tutorial1.fire && !data.tutorial1.crime) {
            return 17;
        } else if (!data.tutorial1.collapse) {
            return 18;
        } else if (!data.tutorial1.senate_built) {
            return 19;
        } else {
            return 20;
        }
    } else if (scenario_is_tutorial_2()) {
        if (!data.tutorial2.granary_built) {
            return 21;
        } else if (!data.tutorial2.population_250_reached) {
            return 22;
        } else if (!data.tutorial2.population_450_reached) {
            return 23;
        } else if (!data.tutorial2.pottery_made) {
            return 24;
        } else {
            return 25;
        }
    }
    return 0;
}
export function tutorial_adjust_request_year(year: number) {
    if (scenario_is_tutorial_2()) {
        if (!data.tutorial2.pottery_made) {
            return 0;
        }
        * year = data.tutorial2.pottery_made_year;
    }
    return 1;
}
export function tutorial_extra_fire_risk() {
    return !data.tutorial1.fire;
}
export function tutorial_extra_damage_risk() {
    return data.tutorial1.fire && !data.tutorial1.collapse;
}
function post_message(message: number) {
    city_message_post(1, message, 0, 0);
}
export function tutorial_handle_fire() {
    if (data.tutorial1.fire) {
        return 0;
    }
    data.tutorial1.fire = 1;
    building_menu_update();
    post_message(MESSAGE_TUTORIAL_FIRE);
    return 1;
}
export function tutorial_handle_collapse() {
    if (data.tutorial1.collapse) {
        return 0;
    }
    data.tutorial1.collapse = 1;
    building_menu_update();
    post_message(MESSAGE_TUTORIAL_COLLAPSE);
    return 1;
}
export function tutorial_on_crime() {
    if (!data.tutorial1.crime) {
        data.tutorial1.crime = 1;
        building_menu_update();
    }
}
export function tutorial_on_disease() {
    data.tutorial3.disease = 1;
}
export function tutorial_on_filled_granary() {
    if (!data.tutorial2.granary_built) {
        data.tutorial2.granary_built = 1;
        building_menu_update();
        post_message(MESSAGE_TUTORIAL_WATER);
    }
}
export function tutorial_on_add_to_warehouse() {
    if (!data.tutorial2.pottery_made && city_resource_count(RESOURCE_POTTERY) >= 1) {
        data.tutorial2.pottery_made = 1;
        data.tutorial2.pottery_made_year = game_time_year();
        building_menu_update();
        post_message(MESSAGE_TUTORIAL_TRADE);
    }
}
export function tutorial_on_day_tick() {
    if (data.tutorial1.fire) {
        city_mission_tutorial_set_fire_message_shown(1);
    }
    if (data.tutorial3.disease && city_mission_tutorial_show_disease_message()) {
        post_message(MESSAGE_TUTORIAL_HEALTH);
    }
    if (data.tutorial2.granary_built) {
        if (!data.tutorial2.population_250_reached && city_population() >= 250) {
            data.tutorial2.population_250_reached = 1;
            building_menu_update();
            post_message(MESSAGE_TUTORIAL_GROWING_YOUR_CITY);
        }
    }
    if (data.tutorial2.population_250_reached) {
        if (!data.tutorial2.population_450_reached && city_population() >= 450) {
            data.tutorial2.population_450_reached = 1;
            building_menu_update();
            post_message(MESSAGE_TUTORIAL_TAXES_INDUSTRY);
        }
    }
    if (data.tutorial1.fire && !data.tutorial1.senate_built) {
        let population_almost: number = city_population() >= scenario_criteria_population() - 20;
        if (!game_time_day() || population_almost) {
            if (city_buildings_has_senate()) {
                city_mission_tutorial_add_senate();
            }
            if (city_mission_tutorial_has_senate() || population_almost) {
                data.tutorial1.senate_built = 1;
                building_menu_update();
                post_message(MESSAGE_TUTORIAL_RELIGION);
            }
        }
    }
}
export function tutorial_on_month_tick() {
    if (scenario_is_tutorial_3()) {
        if (game_time_month() == 5) {
            city_message_post_with_message_delay(MESSAGE_CAT_TUTORIAL3, 1,
                MESSAGE_TUTORIAL_HUNGER_HALTS_IMMIGRANTS, 1200);
        }
    }
}
export function tutorial_save_state(buf1: buffer, buf2: buffer, buf3: buffer) {
    buffer_write_i32(buf1, data.tutorial1.fire);
    buffer_write_i32(buf1, data.tutorial1.crime);
    buffer_write_i32(buf1, data.tutorial1.collapse);
    buffer_write_i32(buf1, data.tutorial2.granary_built);
    buffer_write_i32(buf1, data.tutorial2.population_250_reached);
    buffer_write_i32(buf1, data.tutorial1.senate_built);
    buffer_write_i32(buf1, data.tutorial2.population_450_reached);
    buffer_write_i32(buf1, data.tutorial2.pottery_made);
    buffer_write_i32(buf2, data.tutorial2.pottery_made_year);
    buffer_write_i32(buf3, data.tutorial3.disease);
}
export function tutorial_load_state(buf1: buffer, buf2: buffer, buf3: buffer) {
    data.tutorial1.fire = buffer_read_i32(buf1);
    data.tutorial1.crime = buffer_read_i32(buf1);
    data.tutorial1.collapse = buffer_read_i32(buf1);
    data.tutorial2.granary_built = buffer_read_i32(buf1);
    data.tutorial2.population_250_reached = buffer_read_i32(buf1);
    data.tutorial1.senate_built = buffer_read_i32(buf1);
    data.tutorial2.population_450_reached = buffer_read_i32(buf1);
    data.tutorial2.pottery_made = buffer_read_i32(buf1);
    data.tutorial2.pottery_made_year = buffer_read_i32(buf2);
    data.tutorial3.disease = buffer_read_i32(buf3);
}
