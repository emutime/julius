
;
import { emperor_gift } from 'city/emperor';
import { finance_overview } from 'city/finance';
import { house_demands } from 'city/houses';
import { labor_category_data } from 'city/labor';
import { resource_trade_status } from 'city/constants';
import { resource_type } from 'game/resource';
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
import RESOURCE_MAX_FOOD = resource_type.RESOURCE_MAX_FOOD;
import { resource_type } from 'game/resource';
import { workshop_type } from 'game/resource';
import { resource_image_type } from 'game/resource';
import { resource_list } from 'city/resource';
import { map_point } from 'map/point';
import { map_tile } from 'map/point';
import { god_status } from 'city/data_private';
export let city_data: city_data_t = new city_data_t();
function update_field(field: number, max_value: number) {
    (* field)--;
    if (* field <= 0) {
        * field = (int8_t) max_value;
        return 1;
    } else {
        return 0;
    }
}
export function city_sound_update_march_enemy() {
    return update_field(city_data.sound.march_enemy, 200);
}
export function city_sound_update_march_horse() {
    return update_field(city_data.sound.march_horse, 200);
}
export function city_sound_update_march_wolf() {
    return update_field(city_data.sound.march_wolf, 12);
}
export function city_sound_update_shoot_arrow() {
    return update_field(city_data.sound.shoot_arrow, 10);
}
export function city_sound_update_hit_wolf() {
    return update_field(city_data.sound.hit_wolf, 4);
}
export function city_sound_update_hit_soldier() {
    return update_field(city_data.sound.hit_soldier, 8);
}
export function city_sound_update_hit_axe() {
    return update_field(city_data.sound.hit_axe, 8);
}
export function city_sound_update_hit_club() {
    return update_field(city_data.sound.hit_club, 8);
}
export function city_sound_update_hit_spear() {
    return update_field(city_data.sound.hit_spear, 8);
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
