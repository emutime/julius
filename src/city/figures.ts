
;
import { resource_type } from 'game/resource';
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
import RESOURCE_MAX_FOOD = resource_type.RESOURCE_MAX_FOOD;
export let city_data: city_data_t = new city_data_t();
export function city_figures_reset() {
    city_data.figure.enemies = 0;
    city_data.figure.rioters = 0;
    city_data.figure.attacking_natives = 0;
    city_data.figure.animals = 0;
    city_data.figure.imperial_soldiers = 0;
    city_data.figure.soldiers = 0;
    if (city_data.figure.security_breach_duration > 0) {
        city_data.figure.security_breach_duration--;
    }
}
export function city_figures_add_animal() {
    city_data.figure.animals++;
}
export function city_figures_add_attacking_native() {
    city_data.figure.security_breach_duration = 10;
    city_data.figure.attacking_natives++;
}
export function city_figures_add_enemy() {
    city_data.figure.enemies++;
}
export function city_figures_add_imperial_soldier() {
    city_data.figure.imperial_soldiers++;
}
export function city_figures_add_rioter(is_attacking: number) {
    city_data.figure.rioters++;
    if (is_attacking) {
        city_data.figure.security_breach_duration = 10;
    }
}
export function city_figures_add_soldier() {
    city_data.figure.soldiers++;
}
export function city_figures_set_gladiator_revolt() {
    city_data.figure.attacking_natives = 10;
}
export function city_figures_animals() {
    return city_data.figure.animals;
}
export function city_figures_attacking_natives() {
    return city_data.figure.attacking_natives;
}
export function city_figures_imperial_soldiers() {
    return city_data.figure.imperial_soldiers;
}
export function city_figures_enemies() {
    return city_data.figure.enemies;
}
export function city_figures_rioters() {
    return city_data.figure.rioters;
}
export function city_figures_soldiers() {
    return city_data.figure.soldiers;
}
export function city_figures_total_invading_enemies() {
    return city_data.figure.imperial_soldiers + city_data.figure.enemies;
}
export function city_figures_has_security_breach() {
    return city_data.figure.security_breach_duration > 0;
}
