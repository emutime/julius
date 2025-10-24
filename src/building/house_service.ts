import { building, building_get, MAX_BUILDINGS } from 'building/building';
import { building_state, building_type } from 'building/type';
import { city_culture_coverage_average_entertainment } from 'city/culture';
import BUILDING_TOWER = building_type.BUILDING_TOWER;
import BUILDING_STATE_UNUSED = building_state.BUILDING_STATE_UNUSED;
import BUILDING_STATE_IN_USE = building_state.BUILDING_STATE_IN_USE;
function decay(value: number) {
    if (value > 0) {
        value = value - 1;
    } else {
        value = 0;
    }
    return value;
}
export function house_service_decay_culture() {
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state != BUILDING_STATE_IN_USE || !b.house_size) {
            continue
        }
        b.data.house.theater = decay(b.data.house.theater);
        b.data.house.amphitheater_actor = decay(b.data.house.amphitheater_actor);
        b.data.house.amphitheater_gladiator = decay(b.data.house.amphitheater_gladiator);
        b.data.house.colosseum_gladiator = decay(b.data.house.colosseum_gladiator);
        b.data.house.colosseum_lion = decay(b.data.house.colosseum_lion);
        b.data.house.hippodrome = decay(b.data.house.hippodrome);
        b.data.house.school = decay(b.data.house.school);
        b.data.house.library = decay(b.data.house.library);
        b.data.house.academy = decay(b.data.house.academy);
        b.data.house.barber = decay(b.data.house.barber);
        b.data.house.clinic = decay(b.data.house.clinic);
        b.data.house.bathhouse = decay(b.data.house.bathhouse);
        b.data.house.hospital = decay(b.data.house.hospital);
        b.data.house.temple_ceres = decay(b.data.house.temple_ceres);
        b.data.house.temple_neptune = decay(b.data.house.temple_neptune);
        b.data.house.temple_mercury = decay(b.data.house.temple_mercury);
        b.data.house.temple_mars = decay(b.data.house.temple_mars);
        b.data.house.temple_venus = decay(b.data.house.temple_venus);
    }
}
export function house_service_decay_tax_collector() {
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state == BUILDING_STATE_IN_USE && b.house_tax_coverage) {
            b.house_tax_coverage--;
        }
    }
}
export function house_service_decay_houses_covered() {
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state != BUILDING_STATE_UNUSED && b.type != BUILDING_TOWER) {
            if (b.houses_covered <= 1) {
                b.houses_covered = 0;
            } else {
                b.houses_covered--;
            }
        }
    }
}
export function house_service_calculate_culture_aggregates() {
    let base_entertainment: number = city_culture_coverage_average_entertainment() / 5;
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state != BUILDING_STATE_IN_USE || !b.house_size) {
            continue
        }
        b.data.house.entertainment = base_entertainment;
        if (b.data.house.theater) {
            b.data.house.entertainment += 10
        }
        if (b.data.house.amphitheater_actor) {
            if (b.data.house.amphitheater_gladiator) {
                b.data.house.entertainment += 15
            } else {
                b.data.house.entertainment += 10
            }
        }
        if (b.data.house.colosseum_gladiator) {
            if (b.data.house.colosseum_lion) {
                b.data.house.entertainment += 25
            } else {
                b.data.house.entertainment += 15
            }
        }
        if (b.data.house.hippodrome) {
            b.data.house.entertainment += 30
        }
        b.data.house.education = 0;
        if (b.data.house.school || b.data.house.library) {
            b.data.house.education = 1;
            if (b.data.house.school && b.data.house.library) {
                b.data.house.education = 2;
                if (b.data.house.academy) {
                    b.data.house.education = 3;
                }
            }
        }
        b.data.house.num_gods = 0;
        if (b.data.house.temple_ceres) {
            ++b.data.house.num_gods;
        }
        if (b.data.house.temple_neptune) {
            ++b.data.house.num_gods;
        }
        if (b.data.house.temple_mercury) {
            ++b.data.house.num_gods;
        }
        if (b.data.house.temple_mars) {
            ++b.data.house.num_gods;
        }
        if (b.data.house.temple_venus) {
            ++b.data.house.num_gods;
        }
        b.data.house.health = 0;
        if (b.data.house.clinic) {
            ++b.data.house.health;
        }
        if (b.data.house.hospital) {
            ++b.data.house.health;
        }
    }
}
