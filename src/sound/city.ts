export const MAX_CHANNELS = 70;
export const CITY_CHANNEL_OFFSET = 15;
import { building } from 'building/building';
import { building_state, building_type } from 'building/type';
import { city_figures_imperial_soldiers } from 'city/figures';
import { buffer, buffer_read_i32, buffer_read_u32, buffer_skip, buffer_write_i32, buffer_write_u32 } from 'core/buffer';
import { time_get_millis, time_millis } from 'core/time';
import { set_sound_type, setting_sound } from 'game/settings';
import { sound_channel } from 'sound/channel';
import { sound_device_is_channel_playing, sound_device_play_channel_panned, sound_device_set_channel_volume } from 'sound/device';
import { memset } from '../../ext/crt';
export const enum sound_direction {
    SOUND_DIRECTION_LEFT = 0,
    SOUND_DIRECTION_CENTER = 2,
    SOUND_DIRECTION_RIGHT = 4
};
import BUILDING_AMPHITHEATER = building_type.BUILDING_AMPHITHEATER;
import BUILDING_THEATER = building_type.BUILDING_THEATER;
import BUILDING_HIPPODROME = building_type.BUILDING_HIPPODROME;
import BUILDING_GLADIATOR_SCHOOL = building_type.BUILDING_GLADIATOR_SCHOOL;
import BUILDING_STATE_UNUSED = building_state.BUILDING_STATE_UNUSED;;
import SOUND_DIRECTION_LEFT = sound_direction.SOUND_DIRECTION_LEFT;
import SOUND_DIRECTION_CENTER = sound_direction.SOUND_DIRECTION_CENTER;
import SOUND_DIRECTION_RIGHT = sound_direction.SOUND_DIRECTION_RIGHT;
import SOUND_CITY = set_sound_type.SOUND_CITY;
import SOUND_CHANNEL_CITY_MIN = sound_channel.SOUND_CHANNEL_CITY_MIN;
import SOUND_CHANNEL_CITY_MAX = sound_channel.SOUND_CHANNEL_CITY_MAX;
export const enum sound_channel_city_house {
    SOUND_CHANNEL_CITY_HOUSE_SLUM = 30,
    SOUND_CHANNEL_CITY_HOUSE_POOR = 34,
    SOUND_CHANNEL_CITY_HOUSE_MEDIUM = 38,
    SOUND_CHANNEL_CITY_HOUSE_GOOD = 42,
    SOUND_CHANNEL_CITY_HOUSE_POSH = 46,
    SOUND_CHANNEL_CITY_AMPHITHEATER = 50,
    SOUND_CHANNEL_CITY_THEATER = 51,
    SOUND_CHANNEL_CITY_HIPPODROME = 52,
    SOUND_CHANNEL_CITY_COLOSSEUM = 53,
    SOUND_CHANNEL_CITY_GLADIATOR_SCHOOL = 54,
    SOUND_CHANNEL_CITY_LION_PIT = 55,
    SOUND_CHANNEL_CITY_ACTOR_COLONY = 56,
    SOUND_CHANNEL_CITY_CHARIOT_MAKER = 57,
    SOUND_CHANNEL_CITY_GARDEN = 58,
    SOUND_CHANNEL_CITY_CLINIC = 62,
    SOUND_CHANNEL_CITY_HOSPITAL = 63,
    SOUND_CHANNEL_CITY_BATHHOUSE = 64,
    SOUND_CHANNEL_CITY_BARBER = 65,
    SOUND_CHANNEL_CITY_SCHOOL = 66,
    SOUND_CHANNEL_CITY_ACADEMY = 67,
    SOUND_CHANNEL_CITY_LIBRARY = 68,
    SOUND_CHANNEL_CITY_PREFECTURE = 69,
    SOUND_CHANNEL_CITY_FORT = 70,
    SOUND_CHANNEL_CITY_TOWER = 74,
    SOUND_CHANNEL_CITY_TEMPLE_CERES = 78,
    SOUND_CHANNEL_CITY_TEMPLE_NEPTUNE = 79,
    SOUND_CHANNEL_CITY_TEMPLE_MERCURY = 80,
    SOUND_CHANNEL_CITY_TEMPLE_MARS = 81,
    SOUND_CHANNEL_CITY_TEMPLE_VENUS = 82,
    SOUND_CHANNEL_CITY_MARKET = 83,
    SOUND_CHANNEL_CITY_GRANARY = 87,
    SOUND_CHANNEL_CITY_WAREHOUSE = 89,
    SOUND_CHANNEL_CITY_SHIPYARD = 91,
    SOUND_CHANNEL_CITY_DOCK = 93,
    SOUND_CHANNEL_CITY_WHARF = 95,
    SOUND_CHANNEL_CITY_PALACE = 97,
    SOUND_CHANNEL_CITY_ENGINEERS_POST = 98,
    SOUND_CHANNEL_CITY_SENATE = 99,
    SOUND_CHANNEL_CITY_FORUM = 100,
    SOUND_CHANNEL_CITY_RESERVOIR = 101,
    SOUND_CHANNEL_CITY_FOUNTAIN = 102,
    SOUND_CHANNEL_CITY_WELL = 106,
    SOUND_CHANNEL_CITY_MILITARY_ACADEMY = 110,
    SOUND_CHANNEL_CITY_ORACLE = 111,
    SOUND_CHANNEL_CITY_BURNING_RUIN = 112,
    SOUND_CHANNEL_CITY_WHEAT_FARM = 113,
    SOUND_CHANNEL_CITY_VEGETABLE_FARM = 114,
    SOUND_CHANNEL_CITY_FRUIT_FARM = 115,
    SOUND_CHANNEL_CITY_OLIVE_FARM = 116,
    SOUND_CHANNEL_CITY_VINE_FARM = 117,
    SOUND_CHANNEL_CITY_PIG_FARM = 118,
    SOUND_CHANNEL_CITY_QUARRY = 119,
    SOUND_CHANNEL_CITY_IRON_MINE = 120,
    SOUND_CHANNEL_CITY_TIMBER_YARD = 121,
    SOUND_CHANNEL_CITY_CLAY_PIT = 122,
    SOUND_CHANNEL_CITY_WINE_WORKSHOP = 123,
    SOUND_CHANNEL_CITY_OIL_WORKSHOP = 124,
    SOUND_CHANNEL_CITY_WEAPONS_WORKSHOP = 125,
    SOUND_CHANNEL_CITY_FURNITURE_WORKSHOP = 126,
    SOUND_CHANNEL_CITY_POTTERY_WORKSHOP = 127,
    SOUND_CHANNEL_CITY_EMPTY_LAND = 128,
    SOUND_CHANNEL_CITY_RIVER = 132,
    SOUND_CHANNEL_CITY_MISSION_POST = 133,
}

import SOUND_CHANNEL_CITY_HOUSE_SLUM = sound_channel_city_house.SOUND_CHANNEL_CITY_HOUSE_SLUM
import SOUND_CHANNEL_CITY_HOUSE_POOR = sound_channel_city_house.SOUND_CHANNEL_CITY_HOUSE_POOR
import SOUND_CHANNEL_CITY_HOUSE_MEDIUM = sound_channel_city_house.SOUND_CHANNEL_CITY_HOUSE_MEDIUM
import SOUND_CHANNEL_CITY_HOUSE_GOOD = sound_channel_city_house.SOUND_CHANNEL_CITY_HOUSE_GOOD
import SOUND_CHANNEL_CITY_HOUSE_POSH = sound_channel_city_house.SOUND_CHANNEL_CITY_HOUSE_POSH
import SOUND_CHANNEL_CITY_AMPHITHEATER = sound_channel_city_house.SOUND_CHANNEL_CITY_AMPHITHEATER
import SOUND_CHANNEL_CITY_THEATER = sound_channel_city_house.SOUND_CHANNEL_CITY_THEATER
import SOUND_CHANNEL_CITY_HIPPODROME = sound_channel_city_house.SOUND_CHANNEL_CITY_HIPPODROME
import SOUND_CHANNEL_CITY_COLOSSEUM = sound_channel_city_house.SOUND_CHANNEL_CITY_COLOSSEUM
import SOUND_CHANNEL_CITY_GLADIATOR_SCHOOL = sound_channel_city_house.SOUND_CHANNEL_CITY_GLADIATOR_SCHOOL
import SOUND_CHANNEL_CITY_LION_PIT = sound_channel_city_house.SOUND_CHANNEL_CITY_LION_PIT
import SOUND_CHANNEL_CITY_ACTOR_COLONY = sound_channel_city_house.SOUND_CHANNEL_CITY_ACTOR_COLONY
import SOUND_CHANNEL_CITY_CHARIOT_MAKER = sound_channel_city_house.SOUND_CHANNEL_CITY_CHARIOT_MAKER
import SOUND_CHANNEL_CITY_GARDEN = sound_channel_city_house.SOUND_CHANNEL_CITY_GARDEN
import SOUND_CHANNEL_CITY_CLINIC = sound_channel_city_house.SOUND_CHANNEL_CITY_CLINIC
import SOUND_CHANNEL_CITY_HOSPITAL = sound_channel_city_house.SOUND_CHANNEL_CITY_HOSPITAL
import SOUND_CHANNEL_CITY_BATHHOUSE = sound_channel_city_house.SOUND_CHANNEL_CITY_BATHHOUSE
import SOUND_CHANNEL_CITY_BARBER = sound_channel_city_house.SOUND_CHANNEL_CITY_BARBER
import SOUND_CHANNEL_CITY_SCHOOL = sound_channel_city_house.SOUND_CHANNEL_CITY_SCHOOL
import SOUND_CHANNEL_CITY_ACADEMY = sound_channel_city_house.SOUND_CHANNEL_CITY_ACADEMY
import SOUND_CHANNEL_CITY_LIBRARY = sound_channel_city_house.SOUND_CHANNEL_CITY_LIBRARY
import SOUND_CHANNEL_CITY_PREFECTURE = sound_channel_city_house.SOUND_CHANNEL_CITY_PREFECTURE
import SOUND_CHANNEL_CITY_FORT = sound_channel_city_house.SOUND_CHANNEL_CITY_FORT
import SOUND_CHANNEL_CITY_TOWER = sound_channel_city_house.SOUND_CHANNEL_CITY_TOWER
import SOUND_CHANNEL_CITY_TEMPLE_CERES = sound_channel_city_house.SOUND_CHANNEL_CITY_TEMPLE_CERES
import SOUND_CHANNEL_CITY_TEMPLE_NEPTUNE = sound_channel_city_house.SOUND_CHANNEL_CITY_TEMPLE_NEPTUNE
import SOUND_CHANNEL_CITY_TEMPLE_MERCURY = sound_channel_city_house.SOUND_CHANNEL_CITY_TEMPLE_MERCURY
import SOUND_CHANNEL_CITY_TEMPLE_MARS = sound_channel_city_house.SOUND_CHANNEL_CITY_TEMPLE_MARS
import SOUND_CHANNEL_CITY_TEMPLE_VENUS = sound_channel_city_house.SOUND_CHANNEL_CITY_TEMPLE_VENUS
import SOUND_CHANNEL_CITY_MARKET = sound_channel_city_house.SOUND_CHANNEL_CITY_MARKET
import SOUND_CHANNEL_CITY_GRANARY = sound_channel_city_house.SOUND_CHANNEL_CITY_GRANARY
import SOUND_CHANNEL_CITY_WAREHOUSE = sound_channel_city_house.SOUND_CHANNEL_CITY_WAREHOUSE
import SOUND_CHANNEL_CITY_SHIPYARD = sound_channel_city_house.SOUND_CHANNEL_CITY_SHIPYARD
import SOUND_CHANNEL_CITY_DOCK = sound_channel_city_house.SOUND_CHANNEL_CITY_DOCK
import SOUND_CHANNEL_CITY_WHARF = sound_channel_city_house.SOUND_CHANNEL_CITY_WHARF
import SOUND_CHANNEL_CITY_PALACE = sound_channel_city_house.SOUND_CHANNEL_CITY_PALACE
import SOUND_CHANNEL_CITY_ENGINEERS_POST = sound_channel_city_house.SOUND_CHANNEL_CITY_ENGINEERS_POST
import SOUND_CHANNEL_CITY_SENATE = sound_channel_city_house.SOUND_CHANNEL_CITY_SENATE
import SOUND_CHANNEL_CITY_FORUM = sound_channel_city_house.SOUND_CHANNEL_CITY_FORUM
import SOUND_CHANNEL_CITY_RESERVOIR = sound_channel_city_house.SOUND_CHANNEL_CITY_RESERVOIR
import SOUND_CHANNEL_CITY_FOUNTAIN = sound_channel_city_house.SOUND_CHANNEL_CITY_FOUNTAIN
import SOUND_CHANNEL_CITY_WELL = sound_channel_city_house.SOUND_CHANNEL_CITY_WELL
import SOUND_CHANNEL_CITY_MILITARY_ACADEMY = sound_channel_city_house.SOUND_CHANNEL_CITY_MILITARY_ACADEMY
import SOUND_CHANNEL_CITY_ORACLE = sound_channel_city_house.SOUND_CHANNEL_CITY_ORACLE
import SOUND_CHANNEL_CITY_BURNING_RUIN = sound_channel_city_house.SOUND_CHANNEL_CITY_BURNING_RUIN
import SOUND_CHANNEL_CITY_WHEAT_FARM = sound_channel_city_house.SOUND_CHANNEL_CITY_WHEAT_FARM
import SOUND_CHANNEL_CITY_VEGETABLE_FARM = sound_channel_city_house.SOUND_CHANNEL_CITY_VEGETABLE_FARM
import SOUND_CHANNEL_CITY_FRUIT_FARM = sound_channel_city_house.SOUND_CHANNEL_CITY_FRUIT_FARM
import SOUND_CHANNEL_CITY_OLIVE_FARM = sound_channel_city_house.SOUND_CHANNEL_CITY_OLIVE_FARM
import SOUND_CHANNEL_CITY_VINE_FARM = sound_channel_city_house.SOUND_CHANNEL_CITY_VINE_FARM
import SOUND_CHANNEL_CITY_PIG_FARM = sound_channel_city_house.SOUND_CHANNEL_CITY_PIG_FARM
import SOUND_CHANNEL_CITY_QUARRY = sound_channel_city_house.SOUND_CHANNEL_CITY_QUARRY
import SOUND_CHANNEL_CITY_IRON_MINE = sound_channel_city_house.SOUND_CHANNEL_CITY_IRON_MINE
import SOUND_CHANNEL_CITY_TIMBER_YARD = sound_channel_city_house.SOUND_CHANNEL_CITY_TIMBER_YARD
import SOUND_CHANNEL_CITY_CLAY_PIT = sound_channel_city_house.SOUND_CHANNEL_CITY_CLAY_PIT
import SOUND_CHANNEL_CITY_WINE_WORKSHOP = sound_channel_city_house.SOUND_CHANNEL_CITY_WINE_WORKSHOP
import SOUND_CHANNEL_CITY_OIL_WORKSHOP = sound_channel_city_house.SOUND_CHANNEL_CITY_OIL_WORKSHOP
import SOUND_CHANNEL_CITY_WEAPONS_WORKSHOP = sound_channel_city_house.SOUND_CHANNEL_CITY_WEAPONS_WORKSHOP
import SOUND_CHANNEL_CITY_FURNITURE_WORKSHOP = sound_channel_city_house.SOUND_CHANNEL_CITY_FURNITURE_WORKSHOP
import SOUND_CHANNEL_CITY_POTTERY_WORKSHOP = sound_channel_city_house.SOUND_CHANNEL_CITY_POTTERY_WORKSHOP
import SOUND_CHANNEL_CITY_EMPTY_LAND = sound_channel_city_house.SOUND_CHANNEL_CITY_EMPTY_LAND
import SOUND_CHANNEL_CITY_RIVER = sound_channel_city_house.SOUND_CHANNEL_CITY_RIVER
import SOUND_CHANNEL_CITY_MISSION_POST = sound_channel_city_house.SOUND_CHANNEL_CITY_MISSION_POST








export class city_channel {
    public in_use: number = 0;
    public available: number = 0;
    public total_views: number = 0;
    public views_threshold: number = 0;
    public direction_views: number[] = new Array(5).fill(0);
    public channel: number = 0;
    public times_played: number = 0;
    public last_played_time: time_millis = null;
    public delay_millis: time_millis = null;
    public should_play: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.in_use = args[0]);
        args.length >= 2 && (this.available = args[1]);
        args.length >= 3 && (this.total_views = args[2]);
        args.length >= 4 && (this.views_threshold = args[3]);
        args.length >= 5 && (this.direction_views = args[4]);
        args.length >= 6 && (this.channel = args[5]);
        args.length >= 7 && (this.times_played = args[6]);
        args.length >= 8 && (this.last_played_time = args[7]);
        args.length >= 9 && (this.delay_millis = args[8]);
        args.length >= 10 && (this.should_play = args[9]);
    }
}
let channels: city_channel[] = new Array(MAX_CHANNELS);
let BUILDING_TYPE_TO_CHANNEL_ID: number[] = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, //0-9
    1, 1, 1, 1, 1, 1, 2, 2, 2, 2, //10-19
    3, 3, 3, 3, 4, 4, 4, 4, 5, 5, //20-29
    6, 7, 8, 9, 10, 11, 12, 13, 0, 14, //30-39
    0, 0, 0, 0, 0, 0, 15, 16, 17, 18, //40-49
    0, 19, 20, 21, 0, 22, 0, 23, 24, 24, //50-59
    25, 26, 27, 28, 29, 25, 26, 27, 28, 29, //60-69
    30, 31, 32, 0, 33, 34, 35, 36, 36, 36, //70-79
    63, 37, 0, 0, 38, 38, 39, 39, 0, 0, // 80-89
    40, 0, 0, 0, 43, 0, 0, 0, 44, 45, //90-99
    46, 47, 48, 49, 50, 51, 52, 53, 54, 55, //100-109
    56, 57, 58, 59, 60, 0, 0, 0, 0, 0, //110-119
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, //120-129
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, //130-139
    0, 0, 0, 0, 0, 0 //140-145
];
let last_update_time: time_millis;
export function sound_city_init() {
    last_update_time = time_get_millis();
    memset(channels, 0);
    for (let i: number = 0; i < MAX_CHANNELS; i++) {
        channels[i].last_played_time = last_update_time;
    }
    for (let i: number = 1; i < 63; i++) {
        channels[i].in_use = 1;
        channels[i].views_threshold = 200;
        channels[i].delay_millis = 30000;
    }
    channels[1].channel = SOUND_CHANNEL_CITY_HOUSE_SLUM;
    channels[2].channel = SOUND_CHANNEL_CITY_HOUSE_POOR;
    channels[3].channel = SOUND_CHANNEL_CITY_HOUSE_MEDIUM;
    channels[4].channel = SOUND_CHANNEL_CITY_HOUSE_GOOD;
    channels[5].channel = SOUND_CHANNEL_CITY_HOUSE_POSH;
    channels[6].channel = SOUND_CHANNEL_CITY_AMPHITHEATER;
    channels[7].channel = SOUND_CHANNEL_CITY_THEATER;
    channels[8].channel = SOUND_CHANNEL_CITY_HIPPODROME;
    channels[9].channel = SOUND_CHANNEL_CITY_COLOSSEUM;
    channels[10].channel = SOUND_CHANNEL_CITY_GLADIATOR_SCHOOL;
    channels[11].channel = SOUND_CHANNEL_CITY_LION_PIT;
    channels[12].channel = SOUND_CHANNEL_CITY_ACTOR_COLONY;
    channels[13].channel = SOUND_CHANNEL_CITY_CHARIOT_MAKER;
    channels[14].channel = SOUND_CHANNEL_CITY_GARDEN;
    channels[15].channel = SOUND_CHANNEL_CITY_CLINIC;
    channels[16].channel = SOUND_CHANNEL_CITY_HOSPITAL;
    channels[17].channel = SOUND_CHANNEL_CITY_BATHHOUSE;
    channels[18].channel = SOUND_CHANNEL_CITY_BARBER;
    channels[19].channel = SOUND_CHANNEL_CITY_SCHOOL;
    channels[20].channel = SOUND_CHANNEL_CITY_ACADEMY;
    channels[21].channel = SOUND_CHANNEL_CITY_LIBRARY;
    channels[22].channel = SOUND_CHANNEL_CITY_PREFECTURE;
    channels[23].channel = SOUND_CHANNEL_CITY_FORT;
    channels[24].channel = SOUND_CHANNEL_CITY_TOWER;
    channels[25].channel = SOUND_CHANNEL_CITY_TEMPLE_CERES;
    channels[26].channel = SOUND_CHANNEL_CITY_TEMPLE_NEPTUNE;
    channels[27].channel = SOUND_CHANNEL_CITY_TEMPLE_MERCURY;
    channels[28].channel = SOUND_CHANNEL_CITY_TEMPLE_MARS;
    channels[29].channel = SOUND_CHANNEL_CITY_TEMPLE_VENUS;
    channels[30].channel = SOUND_CHANNEL_CITY_MARKET;
    channels[31].channel = SOUND_CHANNEL_CITY_GRANARY;
    channels[32].channel = SOUND_CHANNEL_CITY_WAREHOUSE;
    channels[33].channel = SOUND_CHANNEL_CITY_SHIPYARD;
    channels[34].channel = SOUND_CHANNEL_CITY_DOCK;
    channels[35].channel = SOUND_CHANNEL_CITY_WHARF;
    channels[36].channel = SOUND_CHANNEL_CITY_PALACE;
    channels[37].channel = SOUND_CHANNEL_CITY_ENGINEERS_POST;
    channels[38].channel = SOUND_CHANNEL_CITY_SENATE;
    channels[39].channel = SOUND_CHANNEL_CITY_FORUM;
    channels[40].channel = SOUND_CHANNEL_CITY_RESERVOIR;
    channels[41].channel = SOUND_CHANNEL_CITY_FOUNTAIN;
    channels[42].channel = SOUND_CHANNEL_CITY_WELL;
    channels[43].channel = SOUND_CHANNEL_CITY_MILITARY_ACADEMY;
    channels[44].channel = SOUND_CHANNEL_CITY_ORACLE;
    channels[45].channel = SOUND_CHANNEL_CITY_BURNING_RUIN;
    channels[46].channel = SOUND_CHANNEL_CITY_WHEAT_FARM;
    channels[47].channel = SOUND_CHANNEL_CITY_VEGETABLE_FARM;
    channels[48].channel = SOUND_CHANNEL_CITY_FRUIT_FARM;
    channels[49].channel = SOUND_CHANNEL_CITY_OLIVE_FARM;
    channels[50].channel = SOUND_CHANNEL_CITY_VINE_FARM;
    channels[51].channel = SOUND_CHANNEL_CITY_PIG_FARM;
    channels[52].channel = SOUND_CHANNEL_CITY_QUARRY;
    channels[53].channel = SOUND_CHANNEL_CITY_IRON_MINE;
    channels[54].channel = SOUND_CHANNEL_CITY_TIMBER_YARD;
    channels[55].channel = SOUND_CHANNEL_CITY_CLAY_PIT;
    channels[56].channel = SOUND_CHANNEL_CITY_WINE_WORKSHOP;
    channels[57].channel = SOUND_CHANNEL_CITY_OIL_WORKSHOP;
    channels[58].channel = SOUND_CHANNEL_CITY_WEAPONS_WORKSHOP;
    channels[59].channel = SOUND_CHANNEL_CITY_FURNITURE_WORKSHOP;
    channels[60].channel = SOUND_CHANNEL_CITY_POTTERY_WORKSHOP;
    channels[61].channel = SOUND_CHANNEL_CITY_EMPTY_LAND;
    channels[62].channel = SOUND_CHANNEL_CITY_RIVER;
    channels[63].channel = SOUND_CHANNEL_CITY_MISSION_POST;
}
export function sound_city_set_volume(percentage: number) {
    for (let i: number = SOUND_CHANNEL_CITY_MIN; i <= SOUND_CHANNEL_CITY_MAX; i++) {
        sound_device_set_channel_volume(i, percentage);
    }
}
export function sound_city_mark_building_view(b: building, direction: number) {
    if (b.state == BUILDING_STATE_UNUSED) {
        return;
    }
    let type: number = b.type;
    let channel: number = BUILDING_TYPE_TO_CHANNEL_ID[type];
    if (!channel) {
        return;
    }
    if (type == BUILDING_THEATER || type == BUILDING_AMPHITHEATER ||
        type == BUILDING_GLADIATOR_SCHOOL || type == BUILDING_HIPPODROME) {
        if (b.num_workers <= 0 || city_figures_imperial_soldiers() > 0) {
            return;
        }
    }
    channels[channel].available = 1;
    ++channels[channel].total_views;
    ++channels[channel].direction_views[direction];
}
export function sound_city_decay_views() {
    for (let i: number = 0; i < MAX_CHANNELS; i++) {
        for (let d: number = 0; d < 5; d++) {
            channels[i].direction_views[d] = 0;
        }
        channels[i].total_views /= 2
    }
}
function play_channel(channel: number, direction: number) {
    channel += CITY_CHANNEL_OFFSET
    if (!setting_sound(SOUND_CITY).enabled) {
        return;
    }
    if (sound_device_is_channel_playing(channel)) {
        return;
    }
    let left_pan: number;
    let right_pan: number;
    switch (direction) {
        case SOUND_DIRECTION_CENTER:
            left_pan = right_pan = 100;
            break
        case SOUND_DIRECTION_LEFT:
            left_pan = 100;
            right_pan = 0;
            break
        case SOUND_DIRECTION_RIGHT:
            left_pan = 0;
            right_pan = 100;
            break
        default:
            left_pan = right_pan = 0
            break
    }
    sound_device_play_channel_panned(channel, setting_sound(SOUND_CITY).volume, left_pan, right_pan);
}
export function sound_city_play() {
    let now: time_millis = time_get_millis();
    for (let i: number = 1; i < MAX_CHANNELS; i++) {
        channels[i].should_play = 0;
        if (channels[i].available) {
            channels[i].available = 0;
            if (channels[i].total_views >= channels[i].views_threshold) {
                if (now - channels[i].last_played_time >= channels[i].delay_millis) {
                    channels[i].should_play = 1;
                }
            }
        } else {
            channels[i].total_views = 0;
            for (let d: number = 0; d < 5; d++) {
                channels[i].direction_views[d] = 0;
            }
        }
    }
    if (now - last_update_time < 2000) {
        return;
    }
    let max_delay: time_millis = 0;
    let max_sound_id: number = 0;
    for (let i: number = 1; i < MAX_CHANNELS; i++) {
        if (channels[i].should_play) {
            if (now - channels[i].last_played_time > max_delay) {
                max_delay = now - channels[i].last_played_time;
                max_sound_id = i;
            }
        }
    }
    if (!max_sound_id) {
        return;
    }
    let channel: number = channels[max_sound_id].channel;
    let direction: number;
    if (channels[max_sound_id].direction_views[SOUND_DIRECTION_CENTER] > 10) {
        direction = SOUND_DIRECTION_CENTER;
    } else if (channels[max_sound_id].direction_views[SOUND_DIRECTION_LEFT] > 10) {
        direction = SOUND_DIRECTION_LEFT;
    } else if (channels[max_sound_id].direction_views[SOUND_DIRECTION_RIGHT] > 10) {
        direction = SOUND_DIRECTION_RIGHT;
    } else {
        direction = SOUND_DIRECTION_CENTER;
    }
    play_channel(channel, direction);
    last_update_time = now;
    channels[max_sound_id].last_played_time = now;
    channels[max_sound_id].total_views = 0;
    for (let d: number = 0; d < 5; d++) {
        channels[max_sound_id].direction_views[d] = 0;
    }
    channels[max_sound_id].times_played++;
}
export function sound_city_save_state(buf: buffer) {
    for (let i: number = 0; i < MAX_CHANNELS; i++) {
        let ch: city_channel = channels[i];
        buffer_write_i32(buf, ch.available);
        buffer_write_i32(buf, ch.total_views);
        buffer_write_i32(buf, ch.views_threshold);
        for (let d: number = 0; d < 5; d++) {
            buffer_write_i32(buf, ch.direction_views[d]);
        }
        buffer_write_i32(buf, 0);
        buffer_write_i32(buf, ch.in_use ? 1 : 0);
        buffer_write_i32(buf, ch.channel);
        for (let c: number = 1; c < 8; c++) {
            buffer_write_i32(buf, 0);
        }
        buffer_write_i32(buf, ch.in_use);
        buffer_write_i32(buf, ch.times_played);
        buffer_write_u32(buf, ch.last_played_time);
        buffer_write_u32(buf, ch.delay_millis);
        buffer_write_i32(buf, ch.should_play);
        for (let x: number = 0; x < 9; x++) {
            buffer_write_i32(buf, 0);
        }
    }
}
export function sound_city_load_state(buf: buffer) {
    for (let i: number = 0; i < MAX_CHANNELS; i++) {
        let ch: city_channel = channels[i];
        ch.available = buffer_read_i32(buf);
        ch.total_views = buffer_read_i32(buf);
        ch.views_threshold = buffer_read_i32(buf);
        for (let d: number = 0; d < 5; d++) {
            ch.direction_views[d] = buffer_read_i32(buf);
        }
        buffer_skip(buf, 4);
        buffer_skip(buf, 4);
        ch.channel = buffer_read_i32(buf);
        buffer_skip(buf, 28);
        ch.in_use = buffer_read_i32(buf);
        ch.times_played = buffer_read_i32(buf);
        ch.last_played_time = buffer_read_u32(buf);
        ch.delay_millis = buffer_read_u32(buf);
        ch.should_play = buffer_read_i32(buf);
        buffer_skip(buf, 36);
    }
}
