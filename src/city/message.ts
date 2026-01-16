export const MAX_MESSAGES = 1000;
export const MAX_QUEUE = 20;
export const MAX_MESSAGE_CATEGORIES = 20;
import { buffer, buffer_read_i16, buffer_read_i32, buffer_read_u8, buffer_skip, buffer_write_i16, buffer_write_i32, buffer_write_u8 } from 'core/buffer';
import { localized } from 'core/dir';
import { encoding_to_utf8 } from 'core/encoding';
import { file_exists, FILE_NAME_MAX } from 'core/file';
import { lang_get_message, lang_message, lang_message_type } from 'core/lang';
import { time_get_millis, time_millis } from 'core/time';
import { formation_grid_offset_for_invasion } from 'figure/formation';
import { game_time_month, game_time_year } from 'game/time';
import { window_id, window_invalidate, window_is } from 'graphics/window';
import { sound_effect, sound_effect_play } from 'sound/effect';
import { window_message_dialog_show_city_message } from 'window/message_dialog';
export const enum message_category {
    MESSAGE_CAT_RIOT = 0,
    MESSAGE_CAT_FIRE = 1,
    MESSAGE_CAT_COLLAPSE = 2,
    MESSAGE_CAT_RIOT_COLLAPSE = 3,
    MESSAGE_CAT_BLOCKED_DOCK = 4,
    MESSAGE_CAT_WORKERS_NEEDED = 8,
    MESSAGE_CAT_TUTORIAL3 = 9,
    MESSAGE_CAT_NO_WORKING_DOCK = 10,
    MESSAGE_CAT_FISHING_BLOCKED = 11,
};

export const enum message_advisor {
    MESSAGE_ADVISOR_NONE = 0,
    MESSAGE_ADVISOR_LABOR = 1,
    MESSAGE_ADVISOR_TRADE = 2,
    MESSAGE_ADVISOR_POPULATION = 3,
    MESSAGE_ADVISOR_IMPERIAL = 4,
    MESSAGE_ADVISOR_MILITARY = 5,
    MESSAGE_ADVISOR_HEALTH = 6,
    MESSAGE_ADVISOR_RELIGION = 7,
};

export const enum city_message_type {
    MESSAGE_POPULATION_500 = 2,
    MESSAGE_POPULATION_1000 = 3,
    MESSAGE_POPULATION_2000 = 4,
    MESSAGE_POPULATION_3000 = 5,
    MESSAGE_POPULATION_5000 = 6,
    MESSAGE_POPULATION_10000 = 7,
    MESSAGE_POPULATION_15000 = 8,
    MESSAGE_POPULATION_20000 = 9,
    MESSAGE_POPULATION_25000 = 10,
    MESSAGE_RIOT = 11,
    MESSAGE_FIRE = 12,
    MESSAGE_COLLAPSED_BUILDING = 13,
    MESSAGE_DESTROYED_BUILDING = 14,
    MESSAGE_NAVIGATION_IMPOSSIBLE = 15,
    MESSAGE_CITY_IN_DEBT = 16,
    MESSAGE_CITY_IN_DEBT_AGAIN = 17,
    MESSAGE_CITY_STILL_IN_DEBT = 18,
    MESSAGE_CAESAR_WRATH = 19,
    MESSAGE_CAESAR_ARMY_CONTINUE = 20,
    MESSAGE_CAESAR_ARMY_RETREAT = 21,
    MESSAGE_LOCAL_UPRISING = 22,
    MESSAGE_BARBARIAN_ATTACK = 23,
    MESSAGE_CAESAR_ARMY_ATTACK = 24,
    MESSAGE_DISTANT_BATTLE = 25,
    MESSAGE_ENEMIES_CLOSING = 26,
    MESSAGE_ENEMIES_AT_THE_DOOR = 27,
    MESSAGE_CAESAR_REQUESTS_GOODS = 28,
    MESSAGE_CAESAR_REQUESTS_MONEY = 29,
    MESSAGE_CAESAR_REQUESTS_ARMY = 30,
    MESSAGE_REQUEST_REMINDER = 31,
    MESSAGE_REQUEST_RECEIVED = 32,
    MESSAGE_REQUEST_REFUSED = 33,
    MESSAGE_REQUEST_REFUSED_OVERDUE = 34,
    MESSAGE_REQUEST_RECEIVED_LATE = 35,
    MESSAGE_UNEMPLOYMENT = 36,
    MESSAGE_WORKERS_NEEDED = 37,
    MESSAGE_SMALL_FESTIVAL = 38,
    MESSAGE_LARGE_FESTIVAL = 39,
    MESSAGE_GRAND_FESTIVAL = 40,
    MESSAGE_WRATH_OF_CERES = 41,
    MESSAGE_WRATH_OF_NEPTUNE_NO_SEA_TRADE = 42,
    MESSAGE_WRATH_OF_MERCURY = 43,
    MESSAGE_WRATH_OF_MARS_NO_MILITARY = 44,
    MESSAGE_WRATH_OF_VENUS = 45,
    MESSAGE_PEOPLE_DISGRUNTLED = 46,
    MESSAGE_PEOPLE_UNHAPPY = 47,
    MESSAGE_PEOPLE_ANGRY = 48,
    MESSAGE_NOT_ENOUGH_FOOD = 49,
    MESSAGE_FOOD_NOT_DELIVERED = 50,
    MESSAGE_THEFT = 52,
    MESSAGE_TUTORIAL_FIRE = 53,
    MESSAGE_TUTORIAL_COLLAPSE = 54,
    MESSAGE_GODS_UNHAPPY = 55,
    MESSAGE_TUTORIAL_WATER = 56,
    MESSAGE_TUTORIAL_GROWING_YOUR_CITY = 57,
    MESSAGE_TUTORIAL_HUNGER_HALTS_IMMIGRANTS = 58,
    MESSAGE_TUTORIAL_RELIGION = 59,
    MESSAGE_TUTORIAL_TAXES_INDUSTRY = 60,
    MESSAGE_TUTORIAL_TRADE = 61,
    MESSAGE_EARTHQUAKE = 62,
    MESSAGE_GLADIATOR_REVOLT = 63,
    MESSAGE_EMPEROR_CHANGE = 64,
    MESSAGE_LAND_TRADE_DISRUPTED_SANDSTORMS = 65,
    MESSAGE_SEA_TRADE_DISRUPTED = 66,
    MESSAGE_LAND_TRADE_DISRUPTED_LANDSLIDES = 67,
    MESSAGE_ROME_RAISES_WAGES = 68,
    MESSAGE_ROME_LOWERS_WAGES = 69,
    MESSAGE_CONTAMINATED_WATER = 70,
    MESSAGE_IRON_MINE_COLLAPED = 71,
    MESSAGE_CLAY_PIT_FLOODED = 72,
    MESSAGE_GLADIATOR_REVOLT_FINISHED = 73,
    MESSAGE_INCREASED_TRADING = 74,
    MESSAGE_DECREASED_TRADING = 75,
    MESSAGE_TRADE_STOPPED = 76,
    MESSAGE_PRICE_INCREASED = 78,
    MESSAGE_PRICE_DECREASED = 79,
    MESSAGE_EMPIRE_HAS_EXPANDED = 77,
    MESSAGE_ROAD_TO_ROME_BLOCKED = 80,
    MESSAGE_WRATH_OF_NEPTUNE = 81,
    MESSAGE_WRATH_OF_MARS = 82,
    MESSAGE_DISTANT_BATTLE_LOST_NO_TROOPS = 84,
    MESSAGE_DISTANT_BATTLE_LOST_TOO_LATE = 85,
    MESSAGE_DISTANT_BATTLE_LOST_TOO_WEAK = 86,
    MESSAGE_DISTANT_BATTLE_WON = 87,
    MESSAGE_TROOPS_RETURN_FAILED = 88,
    MESSAGE_TROOPS_RETURN_VICTORIOUS = 89,
    MESSAGE_DISTANT_BATTLE_CITY_RETAKEN = 90,
    MESSAGE_CERES_IS_UPSET = 91,
    MESSAGE_NEPTUNE_IS_UPSET = 92,
    MESSAGE_MERCURY_IS_UPSET = 93,
    MESSAGE_MARS_IS_UPSET = 94,
    MESSAGE_VENUS_IS_UPSET = 95,
    MESSAGE_BLESSING_FROM_CERES = 96,
    MESSAGE_BLESSING_FROM_NEPTUNE = 97,
    MESSAGE_BLESSING_FROM_MERCURY = 98,
    MESSAGE_BLESSING_FROM_MARS = 99,
    MESSAGE_BLESSING_FROM_VENUS = 100,
    MESSAGE_GODS_WRATHFUL = 101,
    MESSAGE_HEALTH_ILLNESS = 102,
    MESSAGE_HEALTH_DISEASE = 103,
    MESSAGE_HEALTH_PESTILENCE = 104,
    MESSAGE_SPIRIT_OF_MARS = 105,
    MESSAGE_CAESAR_RESPECT_1 = 106,
    MESSAGE_CAESAR_RESPECT_2 = 107,
    MESSAGE_CAESAR_RESPECT_3 = 108,
    MESSAGE_WORKING_HIPPODROME = 109,
    MESSAGE_WORKING_COLOSSEUM = 110,
    MESSAGE_EMIGRATION = 111,
    MESSAGE_FIRED = 112,
    MESSAGE_ENEMY_ARMY_ATTACK = 114,
    MESSAGE_REQUEST_CAN_COMPLY = 115,
    MESSAGE_ROAD_TO_ROME_OBSTRUCTED = 116,
    MESSAGE_NO_WORKING_DOCK = 117,
    MESSAGE_FISHING_BOAT_BLOCKED = 118,
    MESSAGE_TUTORIAL_HEALTH = 119,
    MESSAGE_LOCAL_UPRISING_MARS = 121,
};
import MESSAGE_CAT_RIOT_COLLAPSE = message_category.MESSAGE_CAT_RIOT_COLLAPSE;
import MESSAGE_CAT_NO_WORKING_DOCK = message_category.MESSAGE_CAT_NO_WORKING_DOCK;
import MESSAGE_CAT_FISHING_BLOCKED = message_category.MESSAGE_CAT_FISHING_BLOCKED;
import MESSAGE_ADVISOR_NONE = message_advisor.MESSAGE_ADVISOR_NONE;
import MESSAGE_ADVISOR_LABOR = message_advisor.MESSAGE_ADVISOR_LABOR;
import MESSAGE_ADVISOR_POPULATION = message_advisor.MESSAGE_ADVISOR_POPULATION;
import MESSAGE_ADVISOR_IMPERIAL = message_advisor.MESSAGE_ADVISOR_IMPERIAL;
import MESSAGE_ADVISOR_MILITARY = message_advisor.MESSAGE_ADVISOR_MILITARY;
import MESSAGE_ADVISOR_HEALTH = message_advisor.MESSAGE_ADVISOR_HEALTH;
import MESSAGE_ADVISOR_RELIGION = message_advisor.MESSAGE_ADVISOR_RELIGION;
import MESSAGE_LOCAL_UPRISING = city_message_type.MESSAGE_LOCAL_UPRISING;
import MESSAGE_BARBARIAN_ATTACK = city_message_type.MESSAGE_BARBARIAN_ATTACK;
import MESSAGE_CAESAR_ARMY_ATTACK = city_message_type.MESSAGE_CAESAR_ARMY_ATTACK;
import MESSAGE_DISTANT_BATTLE = city_message_type.MESSAGE_DISTANT_BATTLE;
import MESSAGE_ENEMIES_CLOSING = city_message_type.MESSAGE_ENEMIES_CLOSING;
import MESSAGE_ENEMIES_AT_THE_DOOR = city_message_type.MESSAGE_ENEMIES_AT_THE_DOOR;
import MESSAGE_CAESAR_REQUESTS_GOODS = city_message_type.MESSAGE_CAESAR_REQUESTS_GOODS;
import MESSAGE_CAESAR_REQUESTS_MONEY = city_message_type.MESSAGE_CAESAR_REQUESTS_MONEY;
import MESSAGE_CAESAR_REQUESTS_ARMY = city_message_type.MESSAGE_CAESAR_REQUESTS_ARMY;
import MESSAGE_REQUEST_REMINDER = city_message_type.MESSAGE_REQUEST_REMINDER;
import MESSAGE_REQUEST_RECEIVED = city_message_type.MESSAGE_REQUEST_RECEIVED;
import MESSAGE_REQUEST_REFUSED = city_message_type.MESSAGE_REQUEST_REFUSED;
import MESSAGE_REQUEST_REFUSED_OVERDUE = city_message_type.MESSAGE_REQUEST_REFUSED_OVERDUE;
import MESSAGE_REQUEST_RECEIVED_LATE = city_message_type.MESSAGE_REQUEST_RECEIVED_LATE;
import MESSAGE_UNEMPLOYMENT = city_message_type.MESSAGE_UNEMPLOYMENT;
import MESSAGE_WORKERS_NEEDED = city_message_type.MESSAGE_WORKERS_NEEDED;
import MESSAGE_NOT_ENOUGH_FOOD = city_message_type.MESSAGE_NOT_ENOUGH_FOOD;
import MESSAGE_FOOD_NOT_DELIVERED = city_message_type.MESSAGE_FOOD_NOT_DELIVERED;
import MESSAGE_GODS_UNHAPPY = city_message_type.MESSAGE_GODS_UNHAPPY;
import MESSAGE_ROME_RAISES_WAGES = city_message_type.MESSAGE_ROME_RAISES_WAGES;
import MESSAGE_ROME_LOWERS_WAGES = city_message_type.MESSAGE_ROME_LOWERS_WAGES;
import MESSAGE_GODS_WRATHFUL = city_message_type.MESSAGE_GODS_WRATHFUL;
import MESSAGE_HEALTH_ILLNESS = city_message_type.MESSAGE_HEALTH_ILLNESS;
import MESSAGE_HEALTH_DISEASE = city_message_type.MESSAGE_HEALTH_DISEASE;
import MESSAGE_HEALTH_PESTILENCE = city_message_type.MESSAGE_HEALTH_PESTILENCE;
import MESSAGE_ENEMY_ARMY_ATTACK = city_message_type.MESSAGE_ENEMY_ARMY_ATTACK;
import MESSAGE_REQUEST_CAN_COMPLY = city_message_type.MESSAGE_REQUEST_CAN_COMPLY;
export class city_message {
    public sequence: number = 0;
    public message_type: number = 0;
    public year: number = 0;
    public month: number = 0;
    public param1: number = 0;
    public param2: number = 0;
    public is_read: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.sequence = args[0]);
        args.length >= 2 && (this.message_type = args[1]);
        args.length >= 3 && (this.year = args[2]);
        args.length >= 4 && (this.month = args[3]);
        args.length >= 5 && (this.param1 = args[4]);
        args.length >= 6 && (this.param2 = args[5]);
        args.length >= 7 && (this.is_read = args[6]);
    }
}
import MAY_BE_LOCALIZED = localized.MAY_BE_LOCALIZED;
import MESSAGE_TYPE_DISASTER = lang_message_type.MESSAGE_TYPE_DISASTER;
import MESSAGE_TYPE_INVASION = lang_message_type.MESSAGE_TYPE_INVASION;
import WINDOW_CITY = window_id.WINDOW_CITY;
import SOUND_EFFECT_FANFARE = sound_effect.SOUND_EFFECT_FANFARE;
import SOUND_EFFECT_FANFARE_URGENT = sound_effect.SOUND_EFFECT_FANFARE_URGENT;
class population_shown {
    public pop500: number = 0;
    public pop1000: number = 0;
    public pop2000: number = 0;
    public pop3000: number = 0;
    public pop5000: number = 0;
    public pop10000: number = 0;
    public pop15000: number = 0;
    public pop20000: number = 0;
    public pop25000: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.pop500 = args[0]);
        args.length >= 2 && (this.pop1000 = args[1]);
        args.length >= 3 && (this.pop2000 = args[2]);
        args.length >= 4 && (this.pop3000 = args[3]);
        args.length >= 5 && (this.pop5000 = args[4]);
        args.length >= 6 && (this.pop10000 = args[5]);
        args.length >= 7 && (this.pop15000 = args[6]);
        args.length >= 8 && (this.pop20000 = args[7]);
        args.length >= 9 && (this.pop25000 = args[8]);
    }
}
export class unnamed18_8 {
    public messages: city_message[] = new Array(MAX_MESSAGES).fill(null);
    public queue: number[] = new Array(20).fill(0);
    public consecutive_message_delay: number = 0;
    public next_message_sequence: number = 0;
    public total_messages: number = 0;
    public current_message_id: number = 0;
    public population_shown: population_shown = null;
    public message_count: number[] = new Array(MAX_MESSAGE_CATEGORIES).fill(0);
    public message_delay: number[] = new Array(MAX_MESSAGE_CATEGORIES).fill(0);
    public last_sound_time: time_millis[] = new Array(MESSAGE_CAT_RIOT_COLLAPSE + 1).fill(null);
    public problem_count: number = 0;
    public problem_index: number = 0;
    public problem_last_click_time: time_millis = null;
    public scroll_position: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.messages = args[0]);
        args.length >= 2 && (this.queue = args[1]);
        args.length >= 3 && (this.consecutive_message_delay = args[2]);
        args.length >= 4 && (this.next_message_sequence = args[3]);
        args.length >= 5 && (this.total_messages = args[4]);
        args.length >= 6 && (this.current_message_id = args[5]);
        args.length >= 7 && (this.population_shown = args[6]);
        args.length >= 8 && (this.message_count = args[7]);
        args.length >= 9 && (this.message_delay = args[8]);
        args.length >= 10 && (this.last_sound_time = args[9]);
        args.length >= 11 && (this.problem_count = args[10]);
        args.length >= 12 && (this.problem_index = args[11]);
        args.length >= 13 && (this.problem_last_click_time = args[12]);
        args.length >= 14 && (this.scroll_position = args[13]);
    }
}
let data: unnamed18_8 = new unnamed18_8();
let should_play_sound: number = 1;
export function city_message_init_scenario() {
    for (let i: number = 0; i < MAX_MESSAGES; i++) {
        data.messages[i].message_type = 0;
    }
    for (let i: number = 0; i < MAX_QUEUE; i++) {
        data.queue[i] = 0;
    }
    data.consecutive_message_delay = 0;
    data.next_message_sequence = 0;
    data.total_messages = 0;
    data.current_message_id = 0;
    for (let i: number = 0; i < MAX_MESSAGE_CATEGORIES; i++) {
        data.message_count[i] = 0;
        data.message_delay[i] = 0;
    }
    data.population_shown.pop500 = 0;
    data.population_shown.pop1000 = 0;
    data.population_shown.pop2000 = 0;
    data.population_shown.pop3000 = 0;
    data.population_shown.pop5000 = 0;
    data.population_shown.pop10000 = 0;
    data.population_shown.pop15000 = 0;
    data.population_shown.pop20000 = 0;
    data.population_shown.pop25000 = 0;
    for (let i: number = 0; i <= MESSAGE_CAT_RIOT_COLLAPSE; i++) {
        data.last_sound_time[i] = 0;
    }
    city_message_init_problem_areas();
}
export function city_message_init_problem_areas() {
    data.problem_count = 0;
    data.problem_index = 0;
    data.problem_last_click_time = time_get_millis();
}
function new_message_id() {
    for (let i: number = 0; i < MAX_MESSAGES; i++) {
        if (!data.messages[i].message_type) {
            return i;
        }
    }
    return -1;
}
function has_video(text_id: number) {
    let msg: lang_message = lang_get_message(text_id);
    if (!msg.video.text) {
        return 0;
    }
    
    let video_file: string = encoding_to_utf8(msg.video.text, FILE_NAME_MAX) as string;
    return file_exists(video_file, MAY_BE_LOCALIZED);
}
function enqueue_message(sequence: number) {
    for (let i: number = 0; i < MAX_QUEUE; i++) {
        if (!data.queue[i]) {
            data.queue[i] = sequence;
            break
        }
    }
}
function play_sound(text_id: number) {
    if (lang_get_message(text_id).urgent == 1) {
        sound_effect_play(SOUND_EFFECT_FANFARE_URGENT);
    } else {
        sound_effect_play(SOUND_EFFECT_FANFARE);
    }
}
function show_message_popup(message_id: number) {
    let msg: city_message = data.messages[message_id];
    data.consecutive_message_delay = 5;
    msg.is_read = 1;
    let text_id: number = city_message_get_text_id(msg.message_type);
    if (!has_video(text_id)) {
        play_sound(text_id);
    }
    window_message_dialog_show_city_message(text_id,
        msg.year, msg.month, msg.param1, msg.param2,
        city_message_get_advisor(msg.message_type), 1);
}
export function city_message_disable_sound_for_next_message() {
    should_play_sound = 0;
}
export function city_message_apply_sound_interval(category: message_category) {
    let now: time_millis = time_get_millis();
    if (now - data.last_sound_time[category] <= 15000) {
        city_message_disable_sound_for_next_message();
    } else {
        data.last_sound_time[category] = now;
    }
}
export function city_message_post(use_popup: boolean, message_type: number, param1: number, param2: number) {
    let id: number = new_message_id();
    if (id < 0) {
        return;
    }
    data.total_messages++;
    data.current_message_id = id;
    let msg: city_message = data.messages[id];
    msg.message_type = message_type;
    msg.is_read = 0;
    msg.year = game_time_year();
    msg.month = game_time_month();
    msg.param1 = param1;
    msg.param2 = param2;
    msg.sequence = data.next_message_sequence++;
    let text_id: number = city_message_get_text_id(message_type);
    let lang_msg_type: lang_message_type = lang_get_message(text_id).message_type;
    if (lang_msg_type == MESSAGE_TYPE_DISASTER || lang_msg_type == MESSAGE_TYPE_INVASION) {
        data.problem_count = 1;
        window_invalidate();
    }
    if (use_popup && window_is(WINDOW_CITY)) {
        show_message_popup(id);
    } else if (use_popup) {
        enqueue_message(msg.sequence);
    } else if (should_play_sound) {
        play_sound(text_id);
    }
    should_play_sound = 1;
}
export function city_message_post_with_popup_delay(category: message_category, message_type: number, param1: number, param2: number) {
    let use_popup: boolean = false;
    if (data.message_delay[category] <= 0) {
        use_popup = true;
        data.message_delay[category] = 12;
    }
    city_message_post(use_popup, message_type, param1, param2);
    data.message_count[category]++;
}
export function city_message_post_with_message_delay(category: message_category, use_popup: boolean, message_type: number, delay: number) {
    if (category == MESSAGE_CAT_FISHING_BLOCKED || category == MESSAGE_CAT_NO_WORKING_DOCK) {
        if (data.message_count[category] > 0) {
            data.message_count[category]--;
        } else {
            data.message_count[category] = delay;
            city_message_post(use_popup, message_type, 0, 0);
        }
    } else {
        if (data.message_delay[category] <= 0) {
            data.message_delay[category] = delay;
            city_message_post(use_popup, message_type, 0, 0);
        }
    }
}
export function city_message_process_queue() {
    if (data.consecutive_message_delay > 0) {
        data.consecutive_message_delay--;
        return;
    }
    let sequence: number = 0;
    for (let i: number = 0; i < MAX_QUEUE; i++) {
        if (data.queue[i]) {
            sequence = data.queue[i];
            data.queue[i] = 0;
            break
        }
    }
    if (sequence == 0) {
        return;
    }
    let message_id: number = -1;
    for (let i: number = 0; i < 999; i++) {
        if (!data.messages[i].message_type) {
            return;
        }
        if (data.messages[i].sequence == sequence) {
            message_id = i;
            break
        }
    }
    if (message_id >= 0) {
        show_message_popup(message_id);
    }
}
export function city_message_sort_and_compact() {
    for (let i: number = 0; i < MAX_MESSAGES; i++) {
        for (let a: number = 0; a < MAX_MESSAGES - 1; a++) {
            let swap: number = 0;
            if (data.messages[a].message_type) {
                if (data.messages[a].sequence < data.messages[a + 1].sequence) {
                    if (data.messages[a + 1].message_type) {
                        swap = 1;
                    }
                }
            } else if (data.messages[a + 1].message_type) {
                swap = 1;
            }
            if (swap) {
                let tmp_message: city_message = data.messages[a];
                data.messages[a] = data.messages[a + 1];
                data.messages[a + 1] = tmp_message;
            }
        }
    }
    data.total_messages = 0;
    for (let i: number = 0; i < MAX_MESSAGES; i++) {
        if (data.messages[i].message_type) {
            data.total_messages++;
        }
    }
}
export function city_message_get_text_id(message_type: city_message_type) {
    if (message_type > 50) {
        return message_type + 199;
    } else {
        return message_type + 99;
    }
}
export function city_message_get_advisor(message_type: city_message_type) {
    switch (message_type) {
        case MESSAGE_LOCAL_UPRISING:
        case MESSAGE_BARBARIAN_ATTACK:
        case MESSAGE_CAESAR_ARMY_ATTACK:
        case MESSAGE_ENEMY_ARMY_ATTACK:
        case MESSAGE_DISTANT_BATTLE:
        case MESSAGE_ENEMIES_CLOSING:
        case MESSAGE_ENEMIES_AT_THE_DOOR:
            return MESSAGE_ADVISOR_MILITARY;
        case MESSAGE_CAESAR_REQUESTS_GOODS:
        case MESSAGE_CAESAR_REQUESTS_MONEY:
        case MESSAGE_CAESAR_REQUESTS_ARMY:
        case MESSAGE_REQUEST_REMINDER:
        case MESSAGE_REQUEST_RECEIVED:
        case MESSAGE_REQUEST_REFUSED:
        case MESSAGE_REQUEST_REFUSED_OVERDUE:
        case MESSAGE_REQUEST_RECEIVED_LATE:
        case MESSAGE_REQUEST_CAN_COMPLY:
            return MESSAGE_ADVISOR_IMPERIAL;
        case MESSAGE_UNEMPLOYMENT:
        case MESSAGE_WORKERS_NEEDED:
        case MESSAGE_ROME_LOWERS_WAGES:
        case MESSAGE_ROME_RAISES_WAGES:
            return MESSAGE_ADVISOR_LABOR;
        case MESSAGE_NOT_ENOUGH_FOOD:
        case MESSAGE_FOOD_NOT_DELIVERED:
            return MESSAGE_ADVISOR_POPULATION;
        case MESSAGE_HEALTH_ILLNESS:
        case MESSAGE_HEALTH_DISEASE:
        case MESSAGE_HEALTH_PESTILENCE:
            return MESSAGE_ADVISOR_HEALTH;
        case MESSAGE_GODS_UNHAPPY:
        case MESSAGE_GODS_WRATHFUL:
            return MESSAGE_ADVISOR_RELIGION;
        default:
            return MESSAGE_ADVISOR_NONE
    }
}
export function city_message_reset_category_count(category: message_category) {
    data.message_count[category] = 0;
}
export function city_message_increase_category_count(category: message_category) {
    data.message_count[category]++;
}
export function city_message_get_category_count(category: message_category) {
    return data.message_count[category];
}
export function city_message_decrease_delays() {
    for (let i: number = 0; i < MAX_MESSAGE_CATEGORIES; i++) {
        if (data.message_delay[i] > 0) {
            data.message_delay[i]--;
        }
    }
}
export function city_message_mark_population_shown(population: number) {
    switch (population) {
        case 500:
            data.population_shown.pop500 = 1;
            return 1;
        case 1000:
            data.population_shown.pop1000 = 1;
            return 1;
        case 2000:
            data.population_shown.pop2000 = 1;
            return 1;
        case 3000:
            data.population_shown.pop3000 = 1;
            return 1;
        case 5000:
            data.population_shown.pop5000 = 1;
            return 1;
        case 10000:
            data.population_shown.pop10000 = 1;
            return 1;
        case 15000:
            data.population_shown.pop15000 = 1;
            return 1;
        case 20000:
            data.population_shown.pop20000 = 1;
            return 1;
        case 25000:
            data.population_shown.pop25000 = 1;
            return 1;
        default: return 0;
    }
}
export function city_message_get(message_id: number) {
    return data.messages[message_id];
}
export function city_message_set_current(message_id: number) {
    return data.current_message_id = message_id;
}
export function city_message_mark_read(message_id: number) {
    data.messages[message_id].is_read = 1;
}
export function city_message_delete(message_id: number) {
    data.messages[message_id].message_type = 0;
    city_message_sort_and_compact();
}
export function city_message_count() {
    return data.total_messages;
}
export function city_message_problem_area_count() {
    return data.problem_count;
}
function has_problem_area(msg: city_message, lang_msg_type: lang_message_type) {
    if (lang_msg_type == MESSAGE_TYPE_DISASTER) {
        return 1;
    }
    if (lang_msg_type == MESSAGE_TYPE_INVASION) {
        if (formation_grid_offset_for_invasion(msg.param1)) {
            return 1;
        }
        return (msg.month + 1) % 12 == game_time_month() &&
            msg.year + (msg.month + 1) / 12 == game_time_year();
    }
    return 0;
}
export function city_message_next_problem_area_grid_offset() {
    let now: time_millis = time_get_millis();
    if (now - data.problem_last_click_time > 3000) {
        data.problem_index = 0;
    }
    data.problem_last_click_time = now;
    city_message_sort_and_compact();
    data.problem_count = 0;
    for (let i: number = 0; i < 999; i++) {
        let msg: city_message = data.messages[i];
        if (msg.message_type && msg.year >= game_time_year() - 1) {
            let lang_msg: lang_message = lang_get_message(city_message_get_text_id(msg.message_type));
            let lang_msg_type: lang_message_type = lang_msg.message_type;
            if (has_problem_area(msg, lang_msg_type)) {
                data.problem_count++;
            }
        }
    }
    if (data.problem_count <= 0) {
        data.problem_index = 0;
        return 0;
    }
    if (data.problem_index >= data.problem_count) {
        data.problem_index = 0;
    }
    let index: number = 0;
    let current_year: number = game_time_year();
    for (let i: number = 0; i < 999; i++) {
        let msg: city_message = data.messages[i];
        if (msg.message_type && msg.year >= current_year - 1) {
            let text_id: number = city_message_get_text_id(msg.message_type);
            let lang_msg_type: lang_message_type = lang_get_message(text_id).message_type;
            if (has_problem_area(msg, lang_msg_type)) {
                index++;
                if (data.problem_index < index) {
                    data.problem_index++;
                    let grid_offset: number = msg.param2;
                    if (lang_msg_type == MESSAGE_TYPE_INVASION) {
                        let formation_grid_offset: number = formation_grid_offset_for_invasion(msg.param1);
                        if (formation_grid_offset) {
                            grid_offset = formation_grid_offset;
                        }
                    }
                    return grid_offset;
                }
            }
        }
    }
    return 0;
}
export function city_message_clear_scroll() {
    data.scroll_position = 0;
}
export function city_message_scroll_position() {
    return data.scroll_position;
}
export function city_message_set_scroll_position(scroll_position: number) {
    data.scroll_position = scroll_position;
}
export function city_message_save_state(messages: buffer, extra: buffer, counts: buffer, delays: buffer, population: buffer) {
    for (let i: number = 0; i < MAX_MESSAGES; i++) {
        let msg: city_message = data.messages[i];
        buffer_write_i32(messages, msg.param1);
        buffer_write_i16(messages, msg.year);
        buffer_write_i16(messages, msg.param2);
        buffer_write_i16(messages, msg.message_type);
        buffer_write_i16(messages, msg.sequence);
        buffer_write_u8(messages, msg.is_read);
        buffer_write_u8(messages, msg.month);
        buffer_write_i16(messages, 0);
    }
    buffer_write_i32(extra, data.next_message_sequence);
    buffer_write_i32(extra, data.total_messages);
    buffer_write_i32(extra, data.current_message_id);
    for (let i: number = 0; i < MAX_MESSAGE_CATEGORIES; i++) {
        buffer_write_i32(counts, data.message_count[i]);
        buffer_write_i32(delays, data.message_delay[i]);
    }
    buffer_write_u8(population, 0);
    buffer_write_u8(population, data.population_shown.pop500);
    buffer_write_u8(population, data.population_shown.pop1000);
    buffer_write_u8(population, data.population_shown.pop2000);
    buffer_write_u8(population, data.population_shown.pop3000);
    buffer_write_u8(population, data.population_shown.pop5000);
    buffer_write_u8(population, data.population_shown.pop10000);
    buffer_write_u8(population, data.population_shown.pop15000);
    buffer_write_u8(population, data.population_shown.pop20000);
    buffer_write_u8(population, data.population_shown.pop25000);
}
export function city_message_load_state(messages: buffer, extra: buffer, counts: buffer, delays: buffer, population: buffer) {
    for (let i: number = 0; i < MAX_MESSAGES; i++) {
        let msg: city_message = data.messages[i];
        msg.param1 = buffer_read_i32(messages);
        msg.year = buffer_read_i16(messages);
        msg.param2 = buffer_read_i16(messages);
        msg.message_type = buffer_read_i16(messages);
        msg.sequence = buffer_read_i16(messages);
        msg.is_read = buffer_read_u8(messages);
        msg.month = buffer_read_u8(messages);
        buffer_skip(messages, 2);
    }
    data.next_message_sequence = buffer_read_i32(extra);
    data.total_messages = buffer_read_i32(extra);
    data.current_message_id = buffer_read_i32(extra);
    for (let i: number = 0; i < MAX_MESSAGE_CATEGORIES; i++) {
        data.message_count[i] = buffer_read_i32(counts);
        data.message_delay[i] = buffer_read_i32(delays);
    }
    buffer_skip(population, 1);
    data.population_shown.pop500 = buffer_read_u8(population);
    data.population_shown.pop1000 = buffer_read_u8(population);
    data.population_shown.pop2000 = buffer_read_u8(population);
    data.population_shown.pop3000 = buffer_read_u8(population);
    data.population_shown.pop5000 = buffer_read_u8(population);
    data.population_shown.pop10000 = buffer_read_u8(population);
    data.population_shown.pop15000 = buffer_read_u8(population);
    data.population_shown.pop20000 = buffer_read_u8(population);
    data.population_shown.pop25000 = buffer_read_u8(population);
}
