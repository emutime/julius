import { building_menu_update } from 'building/menu';
import { city_buildings_earn_triumphal_arch } from 'city/buildings';
import { city_message_post, city_message_type } from 'city/message';
import { city_ratings_change_favor } from 'city/ratings';
import { calc_percentage } from 'core/calc';
import { empire_city_get_vulnerable_roman, empire_city_set_foreign, empire_city_set_vulnerable } from 'empire/city';
import { formation, formation_get, MAX_FORMATIONS } from 'figure/formation';
import { formation_legions_kill_in_distant_battle, formation_legions_return_from_distant_battle } from 'figure/formation_legion';
import { resource_type } from 'game/resource';
import { scenario_distant_battle_enemy_travel_months, scenario_distant_battle_roman_travel_months } from 'scenario/distant_battle';
import { city_data_t } from './data_private';
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
import RESOURCE_MAX_FOOD = resource_type.RESOURCE_MAX_FOOD;
export let city_data: city_data_t = new city_data_t();
import MESSAGE_DISTANT_BATTLE_LOST_NO_TROOPS = city_message_type.MESSAGE_DISTANT_BATTLE_LOST_NO_TROOPS;
import MESSAGE_DISTANT_BATTLE_LOST_TOO_LATE = city_message_type.MESSAGE_DISTANT_BATTLE_LOST_TOO_LATE;
import MESSAGE_DISTANT_BATTLE_LOST_TOO_WEAK = city_message_type.MESSAGE_DISTANT_BATTLE_LOST_TOO_WEAK;
import MESSAGE_DISTANT_BATTLE_WON = city_message_type.MESSAGE_DISTANT_BATTLE_WON;
import MESSAGE_TROOPS_RETURN_FAILED = city_message_type.MESSAGE_TROOPS_RETURN_FAILED;
import MESSAGE_TROOPS_RETURN_VICTORIOUS = city_message_type.MESSAGE_TROOPS_RETURN_VICTORIOUS;
import MESSAGE_DISTANT_BATTLE_CITY_RETAKEN = city_message_type.MESSAGE_DISTANT_BATTLE_CITY_RETAKEN;
export function city_military_clear_legionary_legions() {
    city_data.military.legionary_legions = 0;
}
export function city_military_add_legionary_legion() {
    city_data.military.legionary_legions++;
}
export function city_military_has_legionary_legions() {
    return city_data.military.legionary_legions > 0;
}
export function city_military_total_legions() {
    return city_data.military.total_legions;
}
export function city_military_total_soldiers() {
    return city_data.military.total_soldiers;
}
export function city_military_empire_service_legions() {
    return city_data.military.empire_service_legions;
}
export function city_military_clear_empire_service_legions() {
    city_data.military.empire_service_legions = 0;
}
export function city_military_update_totals() {
    city_data.military.empire_service_legions = 0;
    city_data.military.total_soldiers = 0;
    city_data.military.total_legions = 0;
    for (let i: number = 1; i < MAX_FORMATIONS; i++) {
        let m: formation = formation_get(i);
        if (m.in_use && m.is_legion) {
            city_data.military.total_legions++;
            city_data.military.total_soldiers += m.num_figures
            if (m.empire_service && m.num_figures > 0) {
                city_data.military.empire_service_legions++;
            }
        }
    }
}
export function city_military_is_native_attack_active() {
    return city_data.military.native_attack_duration > 0;
}
export function city_military_start_native_attack() {
    city_data.military.native_attack_duration = 2;
}
export function city_military_decrease_native_attack_duration() {
    if (city_data.military.native_attack_duration) {
        city_data.military.native_attack_duration--;
    }
}
export function city_military_determine_distant_battle_city() {
    city_data.distant_battle.city = empire_city_get_vulnerable_roman();
}
export function city_military_distant_battle_city() {
    return city_data.distant_battle.city;
}
export function city_military_distant_battle_city_is_roman() {
    return city_data.distant_battle.city_foreign_months_left <= 0;
}
export function city_military_distant_battle_enemy_strength() {
    return city_data.distant_battle.enemy_strength;
}
export function city_military_dispatch_to_distant_battle(roman_strength: number) {
    city_data.distant_battle.roman_months_to_travel_forth = scenario_distant_battle_roman_travel_months();
    city_data.distant_battle.roman_strength = roman_strength;
}
export function city_military_distant_battle_roman_army_is_traveling() {
    return city_data.distant_battle.roman_months_to_travel_forth > 0 ||
        city_data.distant_battle.roman_months_to_travel_back > 0;
}
export function city_military_distant_battle_roman_army_is_traveling_forth() {
    return city_data.distant_battle.roman_months_to_travel_forth > 0;
}
export function city_military_distant_battle_roman_army_is_traveling_back() {
    return city_data.distant_battle.roman_months_to_travel_back > 0;
}
export function city_military_distant_battle_enemy_months_traveled() {
    return city_data.distant_battle.enemy_months_traveled;
}
export function city_military_distant_battle_roman_months_traveled() {
    return city_data.distant_battle.roman_months_traveled;
}
export function city_military_has_distant_battle() {
    return city_data.distant_battle.months_until_battle > 0 ||
        city_data.distant_battle.roman_months_to_travel_back > 0 ||
        city_data.distant_battle.roman_months_to_travel_forth > 0 ||
        city_data.distant_battle.city_foreign_months_left > 0;
}
export function city_military_months_until_distant_battle() {
    return city_data.distant_battle.months_until_battle;
}
export function city_military_init_distant_battle(enemy_strength: number) {
    city_data.distant_battle.enemy_months_traveled = 1;
    city_data.distant_battle.roman_months_traveled = 1;
    city_data.distant_battle.months_until_battle = 24;
    city_data.distant_battle.enemy_strength = enemy_strength;
    city_data.distant_battle.total_count++;
    city_data.distant_battle.roman_months_to_travel_back = 0;
    city_data.distant_battle.roman_months_to_travel_forth = 0;
}
function update_time_traveled() {
    let roman_travel_months: number = scenario_distant_battle_roman_travel_months();
    let enemy_travel_months: number = scenario_distant_battle_enemy_travel_months();
    if (city_data.distant_battle.months_until_battle < enemy_travel_months) {
        city_data.distant_battle.enemy_months_traveled =
            enemy_travel_months - city_data.distant_battle.months_until_battle + 1;
    } else {
        city_data.distant_battle.enemy_months_traveled = 1;
    }
    if (city_data.distant_battle.roman_months_to_travel_forth >= 1) {
        if (roman_travel_months - city_data.distant_battle.roman_months_traveled >
            enemy_travel_months - city_data.distant_battle.enemy_months_traveled) {
            city_data.distant_battle.roman_months_to_travel_forth -= 2
        } else {
            city_data.distant_battle.roman_months_to_travel_forth--;
        }
        if (city_data.distant_battle.roman_months_to_travel_forth <= 1) {
            city_data.distant_battle.roman_months_to_travel_forth = 1;
        }
        city_data.distant_battle.roman_months_traveled =
            roman_travel_months - city_data.distant_battle.roman_months_to_travel_forth + 1;
        if (city_data.distant_battle.roman_months_traveled < 1) {
            city_data.distant_battle.roman_months_traveled = 1;
        }
        if (city_data.distant_battle.roman_months_traveled > roman_travel_months) {
            city_data.distant_battle.roman_months_traveled = roman_travel_months;
        }
    }
}
function set_city_vulnerable() {
    if (city_data.distant_battle.city) {
        empire_city_set_vulnerable(city_data.distant_battle.city);
    }
}
function set_city_foreign() {
    if (city_data.distant_battle.city) {
        empire_city_set_foreign(city_data.distant_battle.city);
    }
    city_data.distant_battle.city_foreign_months_left = 24;
}
function player_has_won() {
    let won: number;
    let pct_loss: number;
    if (city_data.distant_battle.roman_strength < city_data.distant_battle.enemy_strength) {
        won = 0;
        pct_loss = 100;
    } else {
        won = 1;
        let pct_advantage: number = calc_percentage(
            city_data.distant_battle.roman_strength - city_data.distant_battle.enemy_strength,
            city_data.distant_battle.roman_strength);
        if (pct_advantage < 10) {
            pct_loss = 70;
        } else if (pct_advantage < 25) {
            pct_loss = 50;
        } else if (pct_advantage < 50) {
            pct_loss = 25;
        } else if (pct_advantage < 75) {
            pct_loss = 15;
        } else if (pct_advantage < 100) {
            pct_loss = 10;
        } else if (pct_advantage < 150) {
            pct_loss = 5;
        } else {
            pct_loss = 0;
        }
    }
    formation_legions_kill_in_distant_battle(pct_loss);
    return won;
}
function fight_distant_battle() {
    if (city_data.distant_battle.roman_months_to_travel_forth <= 0) {
        city_message_post(true, MESSAGE_DISTANT_BATTLE_LOST_NO_TROOPS, 0, 0);
        city_ratings_change_favor(-50);
        set_city_foreign();
    } else if (city_data.distant_battle.roman_months_to_travel_forth > 2) {
        city_message_post(true, MESSAGE_DISTANT_BATTLE_LOST_TOO_LATE, 0, 0);
        city_ratings_change_favor(-25);
        set_city_foreign();
        city_data.distant_battle.roman_months_to_travel_back = city_data.distant_battle.roman_months_traveled;
    } else if (!player_has_won()) {
        city_message_post(true, MESSAGE_DISTANT_BATTLE_LOST_TOO_WEAK, 0, 0);
        city_ratings_change_favor(-10);
        set_city_foreign();
        city_data.distant_battle.roman_months_traveled = 0;
    } else {
        city_message_post(true, MESSAGE_DISTANT_BATTLE_WON, 0, 0);
        city_ratings_change_favor(25);
        city_buildings_earn_triumphal_arch();
        building_menu_update();
        city_data.distant_battle.won_count++;
        city_data.distant_battle.city_foreign_months_left = 0;
        city_data.distant_battle.roman_months_to_travel_back = city_data.distant_battle.roman_months_traveled;
    }
    city_data.distant_battle.months_until_battle = 0;
    city_data.distant_battle.enemy_months_traveled = 0;
    city_data.distant_battle.roman_months_to_travel_forth = 0;
}
function update_aftermath() {
    if (city_data.distant_battle.roman_months_to_travel_back > 0) {
        city_data.distant_battle.roman_months_to_travel_back--;
        city_data.distant_battle.roman_months_traveled = city_data.distant_battle.roman_months_to_travel_back;
        if (city_data.distant_battle.roman_months_to_travel_back <= 0) {
            if (city_data.distant_battle.city_foreign_months_left) {
                city_message_post(true, MESSAGE_TROOPS_RETURN_FAILED, 0, city_data.map.exit_point.grid_offset);
            } else {
                city_message_post(true, MESSAGE_TROOPS_RETURN_VICTORIOUS, 0, city_data.map.exit_point.grid_offset);
            }
            city_data.distant_battle.roman_months_traveled = 0;
            formation_legions_return_from_distant_battle();
        }
    } else if (city_data.distant_battle.city_foreign_months_left > 0) {
        city_data.distant_battle.city_foreign_months_left--;
        if (city_data.distant_battle.city_foreign_months_left <= 0) {
            city_message_post(true, MESSAGE_DISTANT_BATTLE_CITY_RETAKEN, 0, 0);
            set_city_vulnerable();
        }
    }
}
export function city_military_process_distant_battle() {
    if (city_data.distant_battle.months_until_battle > 0) {
        --city_data.distant_battle.months_until_battle;
        if (city_data.distant_battle.months_until_battle > 0) {
            update_time_traveled();
        } else {
            fight_distant_battle();
        }
    } else {
        update_aftermath();
    }
}
