export const MAX_ENEMY_ARMIES = 25;
import { buffer, buffer_read_i32, buffer_write_i32 } from 'core/buffer';
import { formation, formation_get, MAX_FORMATIONS } from 'figure/formation';
import { map_soldier_strength_add, map_soldier_strength_clear } from 'map/soldier_strength';
;
export class enemy_army {
    public formation_id: number = 0;
    public layout: number = 0;
    public home_x: number = 0;
    public home_y: number = 0;
    public destination_x: number = 0;
    public destination_y: number = 0;
    public destination_building_id: number = 0;
    public num_legions: number = 0;
    public ignore_roman_soldiers: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.formation_id = args[0]);
        args.length >= 2 && (this.layout = args[1]);
        args.length >= 3 && (this.home_x = args[2]);
        args.length >= 4 && (this.home_y = args[3]);
        args.length >= 5 && (this.destination_x = args[4]);
        args.length >= 6 && (this.destination_y = args[5]);
        args.length >= 7 && (this.destination_building_id = args[6]);
        args.length >= 8 && (this.num_legions = args[7]);
        args.length >= 9 && (this.ignore_roman_soldiers = args[8]);
    }
}
let enemy_armies: enemy_army[] = new Array(MAX_ENEMY_ARMIES);
export class unnamed10_8 {
    public enemy_formations: number = 0;
    public enemy_strength: number = 0;
    public legion_formations: number = 0;
    public legion_strength: number = 0;
    public days_since_roman_influence_calculation: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.enemy_formations = args[0]);
        args.length >= 2 && (this.enemy_strength = args[1]);
        args.length >= 3 && (this.legion_formations = args[2]);
        args.length >= 4 && (this.legion_strength = args[3]);
        args.length >= 5 && (this.days_since_roman_influence_calculation = args[4]);
    }
}
let totals: unnamed10_8 = new unnamed10_8();
export function enemy_armies_clear() {
    for (let i: number = 0; i < MAX_ENEMY_ARMIES; i++) {
        enemy_armies[i].formation_id = 0;
        enemy_armies[i].layout = 0;
        enemy_armies[i].home_x = 0;
        enemy_armies[i].home_y = 0;
        enemy_armies[i].destination_x = 0;
        enemy_armies[i].destination_y = 0;
        enemy_armies[i].destination_building_id = 0;
        enemy_armies[i].ignore_roman_soldiers = 0;
    }
    totals.enemy_formations = 0;
    totals.enemy_strength = 0;
    totals.legion_formations = 0;
    totals.legion_strength = 0;
    totals.days_since_roman_influence_calculation = 0;
}
export function enemy_army_get(invasion_id: number) {
    return enemy_armies[invasion_id];
}
export function enemy_army_get_editable(invasion_id: number) {
    return enemy_armies[invasion_id];
}
export function enemy_armies_clear_ignore_roman_soldiers() {
    for (let i: number = 0; i < MAX_ENEMY_ARMIES; i++) {
        enemy_armies[i].ignore_roman_soldiers = 0;
    }
}
export function enemy_armies_clear_formations() {
    for (let i: number = 0; i < MAX_ENEMY_ARMIES; i++) {
        enemy_armies[i].formation_id = 0;
        enemy_armies[i].num_legions = 0;
    }
}
export function enemy_army_totals_clear() {
    totals.legion_formations = 0;
    totals.legion_strength = 0;
    totals.enemy_formations = 0;
    totals.enemy_strength = 0;
}
export function enemy_army_totals_add_legion_formation(strength: number) {
    totals.legion_formations++;
    totals.legion_strength += strength
}
export function enemy_army_totals_add_enemy_formation(strength: number) {
    totals.enemy_formations++;
    totals.enemy_strength += strength
}
export function enemy_army_total_enemy_formations() {
    return totals.enemy_formations;
}
export function enemy_army_calculate_roman_influence() {
    totals.days_since_roman_influence_calculation++;
    if (totals.days_since_roman_influence_calculation > 4) {
        totals.days_since_roman_influence_calculation = 0;
    } else {
        return;
    }
    map_soldier_strength_clear();
    for (let i: number = 1; i < MAX_FORMATIONS; i++) {
        let m: formation = formation_get(i);
        if (m.in_use != 1 || !m.is_legion) {
            continue
        }
        if (m.num_figures > 0) {
            map_soldier_strength_add(m.x_home, m.y_home, 7, 1);
        }
        if (m.num_figures > 3) {
            map_soldier_strength_add(m.x_home, m.y_home, 6, 1);
        }
        if (m.num_figures > 6) {
            map_soldier_strength_add(m.x_home, m.y_home, 5, 1);
        }
        if (m.num_figures > 9) {
            map_soldier_strength_add(m.x_home, m.y_home, 4, 1);
        }
        if (m.num_figures > 12) {
            map_soldier_strength_add(m.x_home, m.y_home, 3, 1);
        }
        if (m.num_figures > 15) {
            map_soldier_strength_add(m.x_home, m.y_home, 2, 1);
        }
    }
}
export function enemy_army_is_stronger_than_legions() {
    return totals.enemy_strength > 2 * totals.legion_strength;
}
export function enemy_armies_save_state(buf: buffer, totals_buf: buffer) {
    for (let i: number = 0; i < MAX_ENEMY_ARMIES; i++) {
        buffer_write_i32(buf, enemy_armies[i].formation_id);
    }
    for (let i: number = 0; i < MAX_ENEMY_ARMIES; i++) {
        buffer_write_i32(buf, enemy_armies[i].home_x);
    }
    for (let i: number = 0; i < MAX_ENEMY_ARMIES; i++) {
        buffer_write_i32(buf, enemy_armies[i].home_y);
    }
    for (let i: number = 0; i < MAX_ENEMY_ARMIES; i++) {
        buffer_write_i32(buf, enemy_armies[i].layout);
    }
    for (let i: number = 0; i < MAX_ENEMY_ARMIES; i++) {
        buffer_write_i32(buf, enemy_armies[i].destination_x);
    }
    for (let i: number = 0; i < MAX_ENEMY_ARMIES; i++) {
        buffer_write_i32(buf, enemy_armies[i].destination_y);
    }
    for (let i: number = 0; i < MAX_ENEMY_ARMIES; i++) {
        buffer_write_i32(buf, enemy_armies[i].destination_building_id);
    }
    for (let i: number = 0; i < MAX_ENEMY_ARMIES; i++) {
        buffer_write_i32(buf, enemy_armies[i].num_legions);
    }
    for (let i: number = 0; i < MAX_ENEMY_ARMIES; i++) {
        buffer_write_i32(buf, enemy_armies[i].ignore_roman_soldiers);
    }
    buffer_write_i32(totals_buf, totals.enemy_formations);
    buffer_write_i32(totals_buf, totals.enemy_strength);
    buffer_write_i32(totals_buf, totals.legion_formations);
    buffer_write_i32(totals_buf, totals.legion_strength);
    buffer_write_i32(totals_buf, totals.days_since_roman_influence_calculation);
}
export function enemy_armies_load_state(buf: buffer, totals_buf: buffer) {
    for (let i: number = 0; i < MAX_ENEMY_ARMIES; i++) {
        enemy_armies[i].formation_id = buffer_read_i32(buf);
    }
    for (let i: number = 0; i < MAX_ENEMY_ARMIES; i++) {
        enemy_armies[i].home_x = buffer_read_i32(buf);
    }
    for (let i: number = 0; i < MAX_ENEMY_ARMIES; i++) {
        enemy_armies[i].home_y = buffer_read_i32(buf);
    }
    for (let i: number = 0; i < MAX_ENEMY_ARMIES; i++) {
        enemy_armies[i].layout = buffer_read_i32(buf);
    }
    for (let i: number = 0; i < MAX_ENEMY_ARMIES; i++) {
        enemy_armies[i].destination_x = buffer_read_i32(buf);
    }
    for (let i: number = 0; i < MAX_ENEMY_ARMIES; i++) {
        enemy_armies[i].destination_y = buffer_read_i32(buf);
    }
    for (let i: number = 0; i < MAX_ENEMY_ARMIES; i++) {
        enemy_armies[i].destination_building_id = buffer_read_i32(buf);
    }
    for (let i: number = 0; i < MAX_ENEMY_ARMIES; i++) {
        enemy_armies[i].num_legions = buffer_read_i32(buf);
    }
    for (let i: number = 0; i < MAX_ENEMY_ARMIES; i++) {
        enemy_armies[i].ignore_roman_soldiers = buffer_read_i32(buf);
    }
    totals.enemy_formations = buffer_read_i32(totals_buf);
    totals.enemy_strength = buffer_read_i32(totals_buf);
    totals.legion_formations = buffer_read_i32(totals_buf);
    totals.legion_strength = buffer_read_i32(totals_buf);
    totals.days_since_roman_influence_calculation = buffer_read_i32(totals_buf);
}
