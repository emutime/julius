
;
import { city_data_t } from 'city/data_private';
import { resource_type } from 'game/resource';
import { Ref } from '../../ext/crt';
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
import RESOURCE_MAX_FOOD = resource_type.RESOURCE_MAX_FOOD;
export let city_data: city_data_t = new city_data_t();
function update_field(field: Ref<number>, max_value: number) {
    field.v--;
    if (field.v <= 0) {
        field.v = max_value;
        return 1;
    } else {
        return 0;
    }
}
export function city_sound_update_march_enemy() {
    const field = new Ref<number>(city_data.sound.march_enemy);
    const result = update_field(field, 200);
    city_data.sound.march_enemy = field.v;
    return result;
}
export function city_sound_update_march_horse() {
    const field = new Ref<number>(city_data.sound.march_horse);
    const result = update_field(field, 200);
    city_data.sound.march_horse = field.v;
    return result;
}
export function city_sound_update_march_wolf() {
    const field = new Ref<number>(city_data.sound.march_wolf);
    const result = update_field(field, 12);
    city_data.sound.march_wolf = field.v;
    return result;
}
export function city_sound_update_shoot_arrow() {
    const field = new Ref<number>(city_data.sound.shoot_arrow);
    const result = update_field(field, 10);
    city_data.sound.shoot_arrow = field.v;
    return result;
}
export function city_sound_update_hit_wolf() {
    const field = new Ref<number>(city_data.sound.hit_wolf);
    const result = update_field(field, 4);
    city_data.sound.hit_wolf = field.v;
    return result;
}
export function city_sound_update_hit_soldier() {
    const field = new Ref<number>(city_data.sound.hit_soldier);
    const result = update_field(field, 8);
    city_data.sound.hit_soldier = field.v;
    return result;
}
export function city_sound_update_hit_axe() {
    const field = new Ref<number>(city_data.sound.hit_axe);
    const result = update_field(field, 8);
    city_data.sound.hit_axe = field.v;
    return result;
}
export function city_sound_update_hit_club() {
    const field = new Ref<number>(city_data.sound.hit_club);
    const result = update_field(field, 8);
    city_data.sound.hit_club = field.v;
    return result;
}
export function city_sound_update_hit_spear() {
    const field = new Ref<number>(city_data.sound.hit_spear);
    const result = update_field(field, 8);
    city_data.sound.hit_spear = field.v;
    return result;
}
export function city_sound_update_hit_elephant() {
    if (city_data.sound.hit_elephant == 1) {
        city_data.sound.hit_elephant = 0;
    } else {
        city_data.sound.hit_elephant = 1;
    }
    return city_data.sound.hit_elephant;
}
export function city_sound_update_die_citizen() {
    city_data.sound.die_citizen++;
    if (city_data.sound.die_citizen >= 4) {
        city_data.sound.die_citizen = 0;
    }
    return city_data.sound.die_citizen;
}
export function city_sound_update_die_soldier() {
    city_data.sound.die_soldier++;
    if (city_data.sound.die_soldier >= 4) {
        city_data.sound.die_soldier = 0;
    }
    return city_data.sound.die_soldier;
}
