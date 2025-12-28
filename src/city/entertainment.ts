import { building, building_get, MAX_BUILDINGS } from 'building/building';
import { building_state, building_type } from 'building/type';
import { resource_type } from 'game/resource';
import { city_data_t } from './data_private';
import BUILDING_AMPHITHEATER = building_type.BUILDING_AMPHITHEATER;
import BUILDING_THEATER = building_type.BUILDING_THEATER;
import BUILDING_HIPPODROME = building_type.BUILDING_HIPPODROME;
import BUILDING_COLOSSEUM = building_type.BUILDING_COLOSSEUM;
import BUILDING_STATE_IN_USE = building_state.BUILDING_STATE_IN_USE;;
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
import RESOURCE_MAX_FOOD = resource_type.RESOURCE_MAX_FOOD;
export let city_data: city_data_t = new city_data_t();
export function city_entertainment_theater_shows() {
    return city_data.entertainment.theater_shows;
}
export function city_entertainment_amphitheater_shows() {
    return city_data.entertainment.amphitheater_shows;
}
export function city_entertainment_colosseum_shows() {
    return city_data.entertainment.colosseum_shows;
}
export function city_entertainment_hippodrome_shows() {
    return city_data.entertainment.hippodrome_shows;
}
export function city_entertainment_set_hippodrome_has_race(has_race: number) {
    city_data.entertainment.hippodrome_has_race = has_race;
}
export function city_entertainment_hippodrome_has_race() {
    return city_data.entertainment.hippodrome_has_race;
}
export function city_entertainment_venue_needing_shows() {
    return city_data.entertainment.venue_needing_shows;
}
export function city_entertainment_calculate_shows() {
    city_data.entertainment.theater_shows = 0;
    city_data.entertainment.theater_no_shows_weighted = 0;
    city_data.entertainment.amphitheater_shows = 0;
    city_data.entertainment.amphitheater_no_shows_weighted = 0;
    city_data.entertainment.colosseum_shows = 0;
    city_data.entertainment.colosseum_no_shows_weighted = 0;
    city_data.entertainment.hippodrome_shows = 0;
    city_data.entertainment.hippodrome_no_shows_weighted = 0;
    city_data.entertainment.venue_needing_shows = 0;
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state != BUILDING_STATE_IN_USE) {
            continue
        }
        switch (b.type) {
            case BUILDING_THEATER:
                if (b.data.entertainment.days1) {
                    city_data.entertainment.theater_shows++;
                } else {
                    city_data.entertainment.theater_no_shows_weighted++;
                }
                break
            case BUILDING_AMPHITHEATER:
                if (b.data.entertainment.days1) {
                    city_data.entertainment.amphitheater_shows++;
                } else {
                    city_data.entertainment.amphitheater_no_shows_weighted += 2
                }
                if (b.data.entertainment.days2) {
                    city_data.entertainment.amphitheater_shows++;
                } else {
                    city_data.entertainment.amphitheater_no_shows_weighted += 2
                }
                break
            case BUILDING_COLOSSEUM:
                if (b.data.entertainment.days1) {
                    city_data.entertainment.colosseum_shows++;
                } else {
                    city_data.entertainment.colosseum_no_shows_weighted += 3
                }
                if (b.data.entertainment.days2) {
                    city_data.entertainment.colosseum_shows++;
                } else {
                    city_data.entertainment.colosseum_no_shows_weighted += 3
                }
                break
            case BUILDING_HIPPODROME:
                if (b.data.entertainment.days1) {
                    city_data.entertainment.hippodrome_shows++;
                } else {
                    city_data.entertainment.hippodrome_no_shows_weighted += 100
                }
                break
        }
    }
    let worst_shows: number = 0;
    if (city_data.entertainment.theater_no_shows_weighted > worst_shows) {
        worst_shows = city_data.entertainment.theater_no_shows_weighted;
        city_data.entertainment.venue_needing_shows = 1;
    }
    if (city_data.entertainment.amphitheater_no_shows_weighted > worst_shows) {
        worst_shows = city_data.entertainment.amphitheater_no_shows_weighted;
        city_data.entertainment.venue_needing_shows = 2;
    }
    if (city_data.entertainment.colosseum_no_shows_weighted > worst_shows) {
        worst_shows = city_data.entertainment.colosseum_no_shows_weighted;
        city_data.entertainment.venue_needing_shows = 3;
    }
    if (city_data.entertainment.hippodrome_no_shows_weighted > worst_shows) {
        city_data.entertainment.venue_needing_shows = 4;
    }
}
export function city_entertainment_show_message_colosseum() {
    if (!city_data.entertainment.colosseum_message_shown) {
        city_data.entertainment.colosseum_message_shown = 1;
        return 1;
    } else {
        return 0;
    }
}
export function city_entertainment_show_message_hippodrome() {
    if (!city_data.entertainment.hippodrome_message_shown) {
        city_data.entertainment.hippodrome_message_shown = 1;
        return 1;
    } else {
        return 0;
    }
}
