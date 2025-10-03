export const MAX_FORMATIONS = 50;
export const MAX_FORMATION_FIGURES = 16;
import { city_military_add_legionary_legion, city_military_clear_legionary_legions, city_military_update_totals } from 'city/military';
import { buffer, buffer_read_i16, buffer_read_i32, buffer_read_u8, buffer_skip, buffer_write_i16, buffer_write_i32, buffer_write_u8 } from 'core/buffer';
import { calc_bound, calc_general_direction, calc_maximum_distance, calc_percentage } from 'core/calc';
import { direction_type } from 'core/direction';
import { enemy_army_totals_add_enemy_formation, enemy_army_totals_add_legion_formation, enemy_army_totals_clear } from 'figure/enemy_army';
import { figure, figure_get, figure_is_enemy, figure_is_herd, figure_is_legion, MAX_FIGURES } from 'figure/figure';
import { formation } from 'figure/formation';
import { formation_enemy_update } from 'figure/formation_enemy';
import { formation_herd_update } from 'figure/formation_herd';
import { formation_legion_decrease_damage, formation_legion_restore_layout, formation_legion_update } from 'figure/formation_legion';
import { figure_properties_for_type } from 'figure/properties';
import { enemy_type, figure_state, figure_type } from 'figure/type';
import { GRID, map_grid_offset } from 'map/grid';
import { sound_effect, sound_effect_play } from 'sound/effect';
import { memset } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vcruntime_string';
;
import FIGURE_FORT_JAVELIN = figure_type.FIGURE_FORT_JAVELIN;
import FIGURE_FORT_MOUNTED = figure_type.FIGURE_FORT_MOUNTED;
import FIGURE_FORT_LEGIONARY = figure_type.FIGURE_FORT_LEGIONARY;
import FIGURE_ENEMY54_GLADIATOR = figure_type.FIGURE_ENEMY54_GLADIATOR;
import FIGURE_ENEMY_CAESAR_LEGIONARY = figure_type.FIGURE_ENEMY_CAESAR_LEGIONARY;
import ENEMY_0_BARBARIAN = enemy_type.ENEMY_0_BARBARIAN;
import ENEMY_1_NUMIDIAN = enemy_type.ENEMY_1_NUMIDIAN;
import ENEMY_2_GAUL = enemy_type.ENEMY_2_GAUL;
import ENEMY_3_CELT = enemy_type.ENEMY_3_CELT;
import ENEMY_4_GOTH = enemy_type.ENEMY_4_GOTH;
import ENEMY_8_GREEK = enemy_type.ENEMY_8_GREEK;
import ENEMY_10_CARTHAGINIAN = enemy_type.ENEMY_10_CARTHAGINIAN;
import FIGURE_STATE_ALIVE = figure_state.FIGURE_STATE_ALIVE;
import FORMATION_COLUMN = formation.FORMATION_COLUMN;
import FORMATION_DOUBLE_LINE_1 = formation.FORMATION_DOUBLE_LINE_1;
import FORMATION_DOUBLE_LINE_2 = formation.FORMATION_DOUBLE_LINE_2;
import FORMATION_SINGLE_LINE_1 = formation.FORMATION_SINGLE_LINE_1;
import FORMATION_SINGLE_LINE_2 = formation.FORMATION_SINGLE_LINE_2;
import FORMATION_TORTOISE = formation.FORMATION_TORTOISE;
import FORMATION_HERD = formation.FORMATION_HERD;
import FORMATION_ENEMY_DOUBLE_LINE = formation.FORMATION_ENEMY_DOUBLE_LINE;
export class formation_state {
    public duration_halt: number = 0;
    public duration_advance: number = 0;
    public duration_regroup: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.duration_halt = args[0]);
        args.length >= 2 && (this.duration_advance = args[1]);
        args.length >= 3 && (this.duration_regroup = args[2]);
    }
}
class prev {
    public layout: number = 0;
    public x_home: number = 0;
    public y_home: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.layout = args[0]);
        args.length >= 2 && (this.x_home = args[1]);
        args.length >= 3 && (this.y_home = args[2]);
    }
}
export class formation {
    public id: number = 0;
    public faction_id: number = 0;
    public in_use: number = 0;
    public is_herd: number = 0;
    public is_legion: number = 0;
    public legion_id: number = 0;
    public layout: number = 0;
    public direction: number = 0;
    public orientation: number = 0;
    public morale: number = 0;
    public months_from_home: number = 0;
    public months_low_morale: number = 0;
    public months_very_low_morale: number = 0;
    public figure_type: number = 0;
    public num_figures: number = 0;
    public max_figures: number = 0;
    public figures: number[] = new Array(MAX_FORMATION_FIGURES).fill(0);
    public total_damage: number = 0;
    public max_total_damage: number = 0;
    public x: number = 0;
    public y: number = 0;
    public x_home: number = 0;
    public y_home: number = 0;
    public building_id: number = 0;
    public standard_x: number = 0;
    public standard_y: number = 0;
    public standard_figure_id: number = 0;
    public destination_x: number = 0;
    public destination_y: number = 0;
    public destination_building_id: number = 0;
    public wait_ticks: number = 0;
    public is_halted: number = 0;
    public recent_fight: number = 0;
    public unknown_fired: number = 0;
    public missile_fired: number = 0;
    public missile_attack_timeout: number = 0;
    public missile_attack_formation_id: number = 0;
    public empire_service: number = 0;
    public in_distant_battle: number = 0;
    public cursed_by_mars: number = 0;
    public has_military_training: number = 0;
    public legion_recruit_type: number = 0;
    public is_at_fort: number = 0;
    public enemy_type: number = 0;
    public enemy_legion_index: number = 0;
    public attack_type: number = 0;
    public invasion_id: number = 0;
    public invasion_sequence: number = 0;
    public enemy_state: formation_state = null;
    public herd_direction: number = 0;
    public herd_wolf_spawn_delay: number = 0;
    public prev: prev = null;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.id = args[0]);
        args.length >= 2 && (this.faction_id = args[1]);
        args.length >= 3 && (this.in_use = args[2]);
        args.length >= 4 && (this.is_herd = args[3]);
        args.length >= 5 && (this.is_legion = args[4]);
        args.length >= 6 && (this.legion_id = args[5]);
        args.length >= 7 && (this.layout = args[6]);
        args.length >= 8 && (this.direction = args[7]);
        args.length >= 9 && (this.orientation = args[8]);
        args.length >= 10 && (this.morale = args[9]);
        args.length >= 11 && (this.months_from_home = args[10]);
        args.length >= 12 && (this.months_low_morale = args[11]);
        args.length >= 13 && (this.months_very_low_morale = args[12]);
        args.length >= 14 && (this.figure_type = args[13]);
        args.length >= 15 && (this.num_figures = args[14]);
        args.length >= 16 && (this.max_figures = args[15]);
        args.length >= 17 && (this.figures = args[16]);
        args.length >= 18 && (this.total_damage = args[17]);
        args.length >= 19 && (this.max_total_damage = args[18]);
        args.length >= 20 && (this.x = args[19]);
        args.length >= 21 && (this.y = args[20]);
        args.length >= 22 && (this.x_home = args[21]);
        args.length >= 23 && (this.y_home = args[22]);
        args.length >= 24 && (this.building_id = args[23]);
        args.length >= 25 && (this.standard_x = args[24]);
        args.length >= 26 && (this.standard_y = args[25]);
        args.length >= 27 && (this.standard_figure_id = args[26]);
        args.length >= 28 && (this.destination_x = args[27]);
        args.length >= 29 && (this.destination_y = args[28]);
        args.length >= 30 && (this.destination_building_id = args[29]);
        args.length >= 31 && (this.wait_ticks = args[30]);
        args.length >= 32 && (this.is_halted = args[31]);
        args.length >= 33 && (this.recent_fight = args[32]);
        args.length >= 34 && (this.unknown_fired = args[33]);
        args.length >= 35 && (this.missile_fired = args[34]);
        args.length >= 36 && (this.missile_attack_timeout = args[35]);
        args.length >= 37 && (this.missile_attack_formation_id = args[36]);
        args.length >= 38 && (this.empire_service = args[37]);
        args.length >= 39 && (this.in_distant_battle = args[38]);
        args.length >= 40 && (this.cursed_by_mars = args[39]);
        args.length >= 41 && (this.has_military_training = args[40]);
        args.length >= 42 && (this.legion_recruit_type = args[41]);
        args.length >= 43 && (this.is_at_fort = args[42]);
        args.length >= 44 && (this.enemy_type = args[43]);
        args.length >= 45 && (this.enemy_legion_index = args[44]);
        args.length >= 46 && (this.attack_type = args[45]);
        args.length >= 47 && (this.invasion_id = args[46]);
        args.length >= 48 && (this.invasion_sequence = args[47]);
        args.length >= 49 && (this.enemy_state = args[48]);
        args.length >= 50 && (this.herd_direction = args[49]);
        args.length >= 51 && (this.herd_wolf_spawn_delay = args[50]);
        args.length >= 52 && (this.prev = args[51]);
    }
}
import DIR_0_TOP = direction_type.DIR_0_TOP;
import DIR_2_RIGHT = direction_type.DIR_2_RIGHT;
import DIR_4_BOTTOM = direction_type.DIR_4_BOTTOM;
import DIR_6_LEFT = direction_type.DIR_6_LEFT;
import DIR_8_NONE = direction_type.DIR_8_NONE;
import GRID_SIZE = GRID.GRID_SIZE;
import SOUND_EFFECT_FORMATION_SHIELD = sound_effect.SOUND_EFFECT_FORMATION_SHIELD;
let formations: formation[] = new Array(MAX_FORMATIONS);
export class unnamed18_8 {
    public id_last_in_use: number = 0;
    public id_last_legion: number = 0;
    public num_legions: number = 0;
    public selected_formation: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.id_last_in_use = args[0]);
        args.length >= 2 && (this.id_last_legion = args[1]);
        args.length >= 3 && (this.num_legions = args[2]);
        args.length >= 4 && (this.selected_formation = args[3]);
    }
}
let data: unnamed18_8 = new unnamed18_8();
export function formations_clear() {
    for (let i: number = 0; i < MAX_FORMATIONS; i++) {
        memset(formations[i], 0);
        formations[i].id = i;
    }
    data.id_last_in_use = 0;
    data.id_last_legion = 0;
    data.num_legions = 0;
    data.selected_formation = 0;
}
export function formation_clear(formation_id: number) {
    memset(formations[formation_id], 0);
    formations[formation_id].id = formation_id;
}
function get_free_formation(start_index: number) {
    for (let i: number = start_index; i < MAX_FORMATIONS; i++) {
        if (!formations[i].in_use) {
            return i;
        }
    }
    return 0;
}
export function formation_create_legion(building_id: number, x: number, y: number, type: figure_type) {
    let formation_id: number = get_free_formation(1);
    if (!formation_id) {
        return formations[0];
    }
    let m: formation = formations[formation_id];
    m.faction_id = 1;
    m.in_use = 1;
    m.is_legion = 1;
    m.figure_type = type;
    m.building_id = building_id;
    m.layout = FORMATION_DOUBLE_LINE_1;
    m.morale = 50;
    m.is_at_fort = 1;
    m.legion_id = formation_id - 1;
    m.x = m.standard_x = m.x_home = x + 3;
    m.y = m.standard_y = m.y_home = y - 1;
    data.num_legions++;
    if (formation_id > data.id_last_in_use) {
        data.id_last_in_use = formation_id;
    }
    return m;
}
function formation_create(figure_type: number, layout: number, orientation: number, x: number, y: number) {
    let formation_id: number = get_free_formation(10);
    if (!formation_id) {
        return 0;
    }
    let f: formation = formations[formation_id];
    f.faction_id = 0;
    f.x = x;
    f.y = y;
    f.in_use = 1;
    f.is_legion = 0;
    f.figure_type = figure_type;
    f.legion_id = formation_id - 10;
    f.morale = 100;
    if (layout == FORMATION_ENEMY_DOUBLE_LINE) {
        if (orientation == DIR_0_TOP || orientation == DIR_4_BOTTOM) {
            f.layout = FORMATION_DOUBLE_LINE_1;
        } else {
            f.layout = FORMATION_DOUBLE_LINE_2;
        }
    } else {
        f.layout = layout;
    }
    return formation_id;
}
export function formation_create_herd(figure_type: number, x: number, y: number, num_animals: number) {
    let formation_id: number = formation_create(figure_type, FORMATION_HERD, 0, x, y);
    if (!formation_id) {
        return 0;
    }
    let f: formation = formations[formation_id];
    f.is_herd = 1;
    f.wait_ticks = 24;
    f.max_figures = num_animals;
    return formation_id;
}
export function formation_create_enemy(figure_type: number, x: number, y: number, layout: number, orientation: number, enemy_type: number, attack_type: number, invasion_id: number, invasion_sequence: number) {
    let formation_id: number = formation_create(figure_type, layout, orientation, x, y);
    if (!formation_id) {
        return 0;
    }
    let f: formation = formations[formation_id];
    f.attack_type = attack_type;
    f.orientation = orientation;
    f.enemy_type = enemy_type;
    f.invasion_id = invasion_id;
    f.invasion_sequence = invasion_sequence;
    return formation_id;
}
export function formation_get(formation_id: number) {
    return formations[formation_id];
}
export function formation_get_selected() {
    return data.selected_formation;
}
export function formation_set_selected(formation_id: number) {
    data.selected_formation = formation_id;
}
export function formation_toggle_empire_service(formation_id: number) {
    formations[formation_id].empire_service = formations[formation_id].empire_service ? 0 : 1;
}
export function formation_record_missile_fired(m: formation) {
    m.missile_fired = 6;
}
export function formation_record_missile_attack(m: formation, from_formation_id: number) {
    m.missile_attack_timeout = 6;
    m.missile_attack_formation_id = from_formation_id;
}
export function formation_record_fight(m: formation) {
    m.recent_fight = 6;
}
export function formation_grid_offset_for_invasion(invasion_sequence: number) {
    for (let i: number = 1; i < MAX_FORMATIONS; i++) {
        let m: formation = formations[i];
        if (m.in_use == 1 && !m.is_legion && !m.is_herd && m.invasion_sequence == invasion_sequence) {
            if (m.x_home > 0 || m.y_home > 0) {
                return map_grid_offset(m.x_home, m.y_home);
            } else {
                return 0;
            }
        }
    }
    return 0;
}
export function formation_caesar_pause() {
    for (let i: number = 1; i < MAX_FORMATIONS; i++) {
        if (formations[i].in_use == 1 && formations[i].figure_type == FIGURE_ENEMY_CAESAR_LEGIONARY) {
            formations[i].wait_ticks = 20;
        }
    }
}
export function formation_caesar_retreat() {
    for (let i: number = 1; i < MAX_FORMATIONS; i++) {
        if (formations[i].in_use == 1 && formations[i].figure_type == FIGURE_ENEMY_CAESAR_LEGIONARY) {
            formations[i].months_low_morale = 1;
        }
    }
}
export function formation_has_low_morale(m: formation) {
    return m.months_low_morale || m.months_very_low_morale;
}
export function formation_get_num_legions_cached() {
    return data.num_legions;
}
export function formation_calculate_legion_totals() {
    data.id_last_legion = 0;
    data.num_legions = 0;
    city_military_clear_legionary_legions();
    for (let i: number = 1; i < MAX_FORMATIONS; i++) {
        let m: formation = formation_get(i);
        if (m.in_use) {
            if (m.is_legion) {
                data.id_last_legion = i;
                data.num_legions++;
                if (m.figure_type == FIGURE_FORT_LEGIONARY) {
                    city_military_add_legionary_legion();
                }
            }
            if (m.missile_attack_timeout <= 0 && m.figures[0]) {
                let f: figure = figure_get(m.figures[0]);
                if (f.state == FIGURE_STATE_ALIVE) {
                    formation_set_home(m, f.x, f.y);
                }
            }
        }
    }
}
export function formation_get_num_legions() {
    let total: number = 0;
    for (let i: number = 1; i < MAX_FORMATIONS; i++) {
        if (formations[i].in_use && formations[i].is_legion) {
            total++;
        }
    }
    return total;
}
export function formation_for_legion(legion_index: number) {
    let index: number = 1;
    for (let i: number = 1; i < MAX_FORMATIONS; i++) {
        if (formations[i].in_use && formations[i].is_legion) {
            if (index++ == legion_index) {
                return i;
            }
        }
    }
    return 0;
}
export function formation_change_morale(m: formation, amount: number) {
    let max_morale: number;
    if (m.figure_type == FIGURE_FORT_LEGIONARY) {
        max_morale = m.has_military_training ? 100 : 80;
    } else if (m.figure_type == FIGURE_ENEMY_CAESAR_LEGIONARY) {
        max_morale = 100;
    } else if (m.figure_type == FIGURE_FORT_JAVELIN || m.figure_type == FIGURE_FORT_MOUNTED) {
        max_morale = m.has_military_training ? 80 : 60;
    } else {
        switch (m.enemy_type) {
            case ENEMY_0_BARBARIAN:
            case ENEMY_1_NUMIDIAN:
            case ENEMY_2_GAUL:
            case ENEMY_3_CELT:
            case ENEMY_4_GOTH:
                max_morale = 80;
                break
            case ENEMY_8_GREEK:
            case ENEMY_10_CARTHAGINIAN:
                max_morale = 90;
                break
            default:
                max_morale = 70
                break
        }
    }
    m.morale = calc_bound(m.morale + amount, 0, max_morale);
}
export function formation_update_morale_after_death(m: formation) {
    formation_calculate_figures();
    let pct_dead: number = calc_percentage(1, m.num_figures);
    let morale: number;
    if (pct_dead < 8) {
        morale = -5;
    } else if (pct_dead < 10) {
        morale = -7;
    } else if (pct_dead < 14) {
        morale = -10;
    } else if (pct_dead < 20) {
        morale = -12;
    } else if (pct_dead < 30) {
        morale = -15;
    } else {
        morale = -20;
    }
    formation_change_morale(m, morale);
}
function change_all_morale(legion: number, enemy: number) {
    for (let i: number = 1; i < MAX_FORMATIONS; i++) {
        let m: formation = formations[i];
        if (m.in_use && !m.is_herd) {
            if (m.is_legion) {
                formation_change_morale(m, legion);
            } else {
                formation_change_morale(m, enemy);
            }
        }
    }
}
export function formation_update_monthly_morale_deployed() {
    for (let i: number = 1; i < MAX_FORMATIONS; i++) {
        let f: formation = formations[i];
        if (f.in_use != 1 || f.is_herd) {
            continue
        }
        if (f.is_legion) {
            if (!f.is_at_fort && !f.in_distant_battle) {
                if (f.morale <= 20 && !f.months_low_morale && !f.months_very_low_morale) {
                    change_all_morale(-10, 10);
                }
                if (f.morale <= 10) {
                    f.months_very_low_morale++;
                } else if (f.morale <= 20) {
                    f.months_low_morale++;
                }
            }
        } else {
            if (f.morale <= 20 && !f.months_low_morale && !f.months_very_low_morale) {
                change_all_morale(10, -10);
            }
            if (f.morale <= 10) {
                f.months_very_low_morale++;
            } else if (f.morale <= 20) {
                f.months_low_morale++;
            }
        }
    }
}
export function formation_update_monthly_morale_at_rest() {
    for (let i: number = 1; i < MAX_FORMATIONS; i++) {
        let m: formation = formations[i];
        if (m.in_use != 1 || m.is_herd) {
            continue
        }
        if (m.is_legion) {
            if (m.is_at_fort) {
                m.months_from_home = 0;
                m.months_very_low_morale = 0;
                m.months_low_morale = 0;
                formation_change_morale(m, 5);
                formation_legion_restore_layout(m);
            } else if (!m.recent_fight) {
                m.months_from_home++;
                if (m.months_from_home > 3) {
                    if (m.months_from_home > 100) {
                        m.months_from_home = 100;
                    }
                    formation_change_morale(m, -5);
                }
            }
        } else {
            formation_change_morale(m, 0);
        }
    }
}
export function formation_decrease_monthly_counters(m: formation) {
    if (m.is_legion) {
        if (m.cursed_by_mars) {
            m.cursed_by_mars--;
        }
    }
    if (m.missile_fired) {
        m.missile_fired--;
    }
    if (m.missile_attack_timeout) {
        m.missile_attack_timeout--;
    }
    if (m.recent_fight) {
        m.recent_fight--;
    }
}
export function formation_clear_monthly_counters(m: formation) {
    m.missile_fired = 0;
    m.missile_attack_timeout = 0;
    m.recent_fight = 0;
}
export function formation_set_destination(m: formation, x: number, y: number) {
    m.destination_x = x;
    m.destination_y = y;
}
export function formation_set_destination_building(m: formation, x: number, y: number, building_id: number) {
    m.destination_x = x;
    m.destination_y = y;
    m.destination_building_id = building_id;
}
export function formation_set_home(m: formation, x: number, y: number) {
    m.x_home = x;
    m.y_home = y;
}
function clear_figures() {
    for (let i: number = 1; i < MAX_FORMATIONS; i++) {
        let f: formation = formations[i];
        for (let fig: number = 0; fig < MAX_FORMATION_FIGURES; fig++) {
            f.figures[fig] = 0;
        }
        f.num_figures = 0;
        f.is_at_fort = 1;
        f.total_damage = 0;
        f.max_total_damage = 0;
    }
}
function add_figure(formation_id: number, figure_id: number, deployed: number, damage: number, max_damage: number) {
    let f: formation = formations[formation_id];
    f.num_figures++;
    f.total_damage += damage
    f.max_total_damage += max_damage
    if (deployed) {
        f.is_at_fort = 0;
    }
    for (let fig: number = 0; fig < MAX_FORMATION_FIGURES; fig++) {
        if (!f.figures[fig]) {
            f.figures[fig] = figure_id;
            return fig;
        }
    }
    return 0;
}
export function formation_move_herds_away(x: number, y: number) {
    for (let i: number = 1; i < MAX_FORMATIONS; i++) {
        let f: formation = formations[i];
        if (f.in_use != 1 || f.is_legion || !f.is_herd || f.num_figures <= 0) {
            continue
        }
        if (calc_maximum_distance(x, y, f.x_home, f.y_home) <= 6) {
            formations[i].wait_ticks = 50;
            formations[i].herd_direction = calc_general_direction(x, y, f.x_home, f.y_home);
        }
    }
}
export function formation_calculate_figures() {
    clear_figures();
    for (let i: number = 1; i < MAX_FIGURES; i++) {
        let f: figure = figure_get(i);
        if (f.state != FIGURE_STATE_ALIVE) {
            continue
        }
        if (!figure_is_legion(f) && !figure_is_enemy(f) && !figure_is_herd(f)) {
            continue
        }
        if (f.type == FIGURE_ENEMY54_GLADIATOR) {
            continue
        }
        let index: number = add_figure(f.formation_id, i,
            f.formation_at_rest != 1, f.damage,
            figure_properties_for_type(f.type).max_damage
        );
        f.index_in_formation = index;
    }
    enemy_army_totals_clear();
    for (let i: number = 1; i < MAX_FORMATIONS; i++) {
        let m: formation = formation_get(i);
        if (m.in_use && !m.is_herd) {
            if (m.is_legion) {
                if (m.num_figures > 0) {
                    let was_halted: number = m.is_halted;
                    m.is_halted = 1;
                    for (let fig: number = 0; fig < m.num_figures; fig++) {
                        let figure_id: number = m.figures[fig];
                        if (figure_id && figure_get(figure_id).direction != DIR_8_NONE) {
                            m.is_halted = 0;
                        }
                    }
                    let total_strength: number = m.num_figures;
                    if (m.figure_type == FIGURE_FORT_LEGIONARY) {
                        total_strength += m.num_figures / 2
                    }
                    enemy_army_totals_add_legion_formation(total_strength);
                    if (m.figure_type == FIGURE_FORT_LEGIONARY) {
                        if (!was_halted && m.is_halted) {
                            sound_effect_play(SOUND_EFFECT_FORMATION_SHIELD);
                        }
                    }
                }
            } else {
                if (m.num_figures <= 0) {
                    formation_clear(m.id);
                } else {
                    enemy_army_totals_add_enemy_formation(m.num_figures);
                }
            }
        }
    }
    city_military_update_totals();
}
function update_direction(formation_id: number, first_figure_direction: number) {
    let f: formation = formations[formation_id];
    if (f.unknown_fired) {
        f.unknown_fired--;
    } else if (f.missile_fired) {
        f.direction = first_figure_direction;
    } else if (f.layout == FORMATION_DOUBLE_LINE_1 || f.layout == FORMATION_SINGLE_LINE_1) {
        if (f.y_home < f.prev.y_home) {
            f.direction = DIR_0_TOP;
        } else if (f.y_home > f.prev.y_home) {
            f.direction = DIR_4_BOTTOM;
        }
    } else if (f.layout == FORMATION_DOUBLE_LINE_2 || f.layout == FORMATION_SINGLE_LINE_2) {
        if (f.x_home < f.prev.x_home) {
            f.direction = DIR_6_LEFT;
        } else if (f.x_home > f.prev.x_home) {
            f.direction = DIR_2_RIGHT;
        }
    } else if (f.layout == FORMATION_TORTOISE || f.layout == FORMATION_COLUMN) {
        let dx: number = (f.x_home < f.prev.x_home) ? (f.prev.x_home - f.x_home) : (f.x_home - f.prev.x_home);
        let dy: number = (f.y_home < f.prev.y_home) ? (f.prev.y_home - f.y_home) : (f.y_home - f.prev.y_home);
        if (dx > dy) {
            if (f.x_home < f.prev.x_home) {
                f.direction = DIR_6_LEFT;
            } else if (f.x_home > f.prev.x_home) {
                f.direction = DIR_2_RIGHT;
            }
        } else {
            if (f.y_home < f.prev.y_home) {
                f.direction = DIR_0_TOP;
            } else if (f.y_home > f.prev.y_home) {
                f.direction = DIR_4_BOTTOM;
            }
        }
    }
    f.prev.x_home = f.x_home;
    f.prev.y_home = f.y_home;
}
function update_directions() {
    for (let i: number = 1; i < MAX_FORMATIONS; i++) {
        let m: formation = formations[i];
        if (m.in_use && !m.is_herd) {
            update_direction(m.id, figure_get(m.figures[0]).direction);
        }
    }
}
function set_legion_max_figures() {
    for (let i: number = 1; i < MAX_FORMATIONS; i++) {
        if (formations[i].in_use && formations[i].is_legion) {
            formations[i].max_figures = 16;
        }
    }
}
export function formation_update_all(second_time: number) {
    formation_calculate_legion_totals();
    formation_calculate_figures();
    update_directions();
    formation_legion_decrease_damage();
    if (!second_time) {
        formation_update_monthly_morale_deployed();
    }
    set_legion_max_figures();
    formation_legion_update();
    formation_enemy_update();
    formation_herd_update();
}
export function formations_save_state(buf: buffer, totals: buffer) {
    for (let i: number = 0; i < MAX_FORMATIONS; i++) {
        let f: formation = formations[i];
        buffer_write_u8(buf, f.in_use);
        buffer_write_u8(buf, f.faction_id);
        buffer_write_u8(buf, f.legion_id);
        buffer_write_u8(buf, f.is_at_fort);
        buffer_write_i16(buf, f.figure_type);
        buffer_write_i16(buf, f.building_id);
        for (let fig: number = 0; fig < MAX_FORMATION_FIGURES; fig++) {
            buffer_write_i16(buf, f.figures[fig]);
        }
        buffer_write_u8(buf, f.num_figures);
        buffer_write_u8(buf, f.max_figures);
        buffer_write_i16(buf, f.layout);
        buffer_write_i16(buf, f.morale);
        buffer_write_u8(buf, f.x_home);
        buffer_write_u8(buf, f.y_home);
        buffer_write_u8(buf, f.standard_x);
        buffer_write_u8(buf, f.standard_y);
        buffer_write_u8(buf, f.x);
        buffer_write_u8(buf, f.y);
        buffer_write_u8(buf, f.destination_x);
        buffer_write_u8(buf, f.destination_y);
        buffer_write_i16(buf, f.destination_building_id);
        buffer_write_i16(buf, f.standard_figure_id);
        buffer_write_u8(buf, f.is_legion);
        buffer_skip(buf, 1);
        buffer_write_i16(buf, f.attack_type);
        buffer_write_i16(buf, f.legion_recruit_type);
        buffer_write_i16(buf, f.has_military_training);
        buffer_write_i16(buf, f.total_damage);
        buffer_write_i16(buf, f.max_total_damage);
        buffer_write_i16(buf, f.wait_ticks);
        buffer_write_i16(buf, f.recent_fight);
        buffer_write_i16(buf, f.enemy_state.duration_advance);
        buffer_write_i16(buf, f.enemy_state.duration_regroup);
        buffer_write_i16(buf, f.enemy_state.duration_halt);
        buffer_write_i16(buf, f.enemy_legion_index);
        buffer_write_i16(buf, f.is_halted);
        buffer_write_i16(buf, f.missile_fired);
        buffer_write_i16(buf, f.missile_attack_timeout);
        buffer_write_i16(buf, f.missile_attack_formation_id);
        buffer_write_i16(buf, f.prev.layout);
        buffer_write_i16(buf, f.cursed_by_mars);
        buffer_write_u8(buf, f.months_low_morale);
        buffer_write_u8(buf, f.empire_service);
        buffer_write_u8(buf, f.in_distant_battle);
        buffer_write_u8(buf, f.is_herd);
        buffer_write_u8(buf, f.enemy_type);
        buffer_write_u8(buf, f.direction);
        buffer_write_u8(buf, f.prev.x_home);
        buffer_write_u8(buf, f.prev.y_home);
        buffer_write_u8(buf, f.unknown_fired);
        buffer_write_u8(buf, f.orientation);
        buffer_write_u8(buf, f.months_from_home);
        buffer_write_u8(buf, f.months_very_low_morale);
        buffer_write_u8(buf, f.invasion_id);
        buffer_write_u8(buf, f.herd_wolf_spawn_delay);
        buffer_write_u8(buf, f.herd_direction);
        buffer_skip(buf, 17);
        buffer_write_i16(buf, f.invasion_sequence);
    }
    buffer_write_i32(totals, data.id_last_in_use);
    buffer_write_i32(totals, data.id_last_legion);
    buffer_write_i32(totals, data.num_legions);
}
export function formations_load_state(buf: buffer, totals: buffer) {
    data.id_last_in_use = buffer_read_i32(totals);
    data.id_last_legion = buffer_read_i32(totals);
    data.num_legions = buffer_read_i32(totals);
    data.selected_formation = 0;
    for (let i: number = 0; i < MAX_FORMATIONS; i++) {
        let f: formation = formations[i];
        f.id = i;
        f.in_use = buffer_read_u8(buf);
        f.faction_id = buffer_read_u8(buf);
        f.legion_id = buffer_read_u8(buf);
        f.is_at_fort = buffer_read_u8(buf);
        f.figure_type = buffer_read_i16(buf);
        f.building_id = buffer_read_i16(buf);
        for (let fig: number = 0; fig < MAX_FORMATION_FIGURES; fig++) {
            f.figures[fig] = buffer_read_i16(buf);
        }
        f.num_figures = buffer_read_u8(buf);
        f.max_figures = buffer_read_u8(buf);
        f.layout = buffer_read_i16(buf);
        f.morale = buffer_read_i16(buf);
        f.x_home = buffer_read_u8(buf);
        f.y_home = buffer_read_u8(buf);
        f.standard_x = buffer_read_u8(buf);
        f.standard_y = buffer_read_u8(buf);
        f.x = buffer_read_u8(buf);
        f.y = buffer_read_u8(buf);
        f.destination_x = buffer_read_u8(buf);
        f.destination_y = buffer_read_u8(buf);
        f.destination_building_id = buffer_read_i16(buf);
        f.standard_figure_id = buffer_read_i16(buf);
        f.is_legion = buffer_read_u8(buf);
        buffer_skip(buf, 1);
        f.attack_type = buffer_read_i16(buf);
        f.legion_recruit_type = buffer_read_i16(buf);
        f.has_military_training = buffer_read_i16(buf);
        f.total_damage = buffer_read_i16(buf);
        f.max_total_damage = buffer_read_i16(buf);
        f.wait_ticks = buffer_read_i16(buf);
        f.recent_fight = buffer_read_i16(buf);
        f.enemy_state.duration_advance = buffer_read_i16(buf);
        f.enemy_state.duration_regroup = buffer_read_i16(buf);
        f.enemy_state.duration_halt = buffer_read_i16(buf);
        f.enemy_legion_index = buffer_read_i16(buf);
        f.is_halted = buffer_read_i16(buf);
        f.missile_fired = buffer_read_i16(buf);
        f.missile_attack_timeout = buffer_read_i16(buf);
        f.missile_attack_formation_id = buffer_read_i16(buf);
        f.prev.layout = buffer_read_i16(buf);
        f.cursed_by_mars = buffer_read_i16(buf);
        f.months_low_morale = buffer_read_u8(buf);
        f.empire_service = buffer_read_u8(buf);
        f.in_distant_battle = buffer_read_u8(buf);
        f.is_herd = buffer_read_u8(buf);
        f.enemy_type = buffer_read_u8(buf);
        f.direction = buffer_read_u8(buf);
        f.prev.x_home = buffer_read_u8(buf);
        f.prev.y_home = buffer_read_u8(buf);
        f.unknown_fired = buffer_read_u8(buf);
        f.orientation = buffer_read_u8(buf);
        f.months_from_home = buffer_read_u8(buf);
        f.months_very_low_morale = buffer_read_u8(buf);
        f.invasion_id = buffer_read_u8(buf);
        f.herd_wolf_spawn_delay = buffer_read_u8(buf);
        f.herd_direction = buffer_read_u8(buf);
        buffer_skip(buf, 17);
        f.invasion_sequence = buffer_read_i16(buf);
    }
}
