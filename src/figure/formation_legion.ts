import { building, building_get } from 'building/building';
import { building_state, building_type } from 'building/type';
import { city_figures_attacking_natives, city_figures_enemies, city_figures_rioters } from 'city/figures';
import { city_military_dispatch_to_distant_battle } from 'city/military';
import { city_warning_show, warning_type } from 'city/warning';
import { calc_adjust_with_percentage } from 'core/calc';
import { direction_type } from 'core/direction';
import { figure_action } from 'figure/action';
import { enemy_army_total_enemy_formations } from 'figure/enemy_army';
import { figure, figure_create, figure_delete, figure_get, figure_is_dead, figure_is_legion, MAX_FIGURES } from 'figure/figure';
import { formation, formation_calculate_figures, formation_calculate_legion_totals, formation_change_morale, formation_clear, formation_clear_monthly_counters, formation_create_legion, formation_decrease_monthly_counters, formation_get, formation_has_low_morale, formation_record_fight, formation_type, legion_recruit, MAX_FORMATION_FIGURES, MAX_FORMATIONS, MAX_LEGIONS } from 'figure/formation';
import { figure_route_remove } from 'figure/route';
import { figure_state, figure_type } from 'figure/type';
import { map_building_at } from 'map/building';
import { map_figure_foreach_until } from 'map/figure';
import { GRID, map_grid_offset } from 'map/grid';
import { map_routing_calculate_distances, map_routing_distance } from 'map/routing';
import BUILDING_FORT_GROUND = building_type.BUILDING_FORT_GROUND;
import BUILDING_FORT = building_type.BUILDING_FORT;
import BUILDING_STATE_IN_USE = building_state.BUILDING_STATE_IN_USE;;
import FIGURE_FORT_JAVELIN = figure_type.FIGURE_FORT_JAVELIN;
import FIGURE_FORT_MOUNTED = figure_type.FIGURE_FORT_MOUNTED;
import FIGURE_FORT_LEGIONARY = figure_type.FIGURE_FORT_LEGIONARY;
import FIGURE_FORT_STANDARD = figure_type.FIGURE_FORT_STANDARD;
import FIGURE_STATE_ALIVE = figure_state.FIGURE_STATE_ALIVE;
import FIGURE_STATE_DEAD = figure_state.FIGURE_STATE_DEAD;
import LEGION_RECRUIT_NONE = legion_recruit.LEGION_RECRUIT_NONE;
import LEGION_RECRUIT_MOUNTED = legion_recruit.LEGION_RECRUIT_MOUNTED;
import LEGION_RECRUIT_JAVELIN = legion_recruit.LEGION_RECRUIT_JAVELIN;
import LEGION_RECRUIT_LEGIONARY = legion_recruit.LEGION_RECRUIT_LEGIONARY;
import FORMATION_MOP_UP = formation_type.FORMATION_MOP_UP;
import WARNING_LEGION_MORALE_TOO_LOW = warning_type.WARNING_LEGION_MORALE_TOO_LOW;
import DIR_0_TOP = direction_type.DIR_0_TOP;
import FIGURE_ACTION_80_SOLDIER_AT_REST = figure_action.FIGURE_ACTION_80_SOLDIER_AT_REST;
import FIGURE_ACTION_81_SOLDIER_GOING_TO_FORT = figure_action.FIGURE_ACTION_81_SOLDIER_GOING_TO_FORT;
import FIGURE_ACTION_82_SOLDIER_RETURNING_TO_BARRACKS = figure_action.FIGURE_ACTION_82_SOLDIER_RETURNING_TO_BARRACKS;
import FIGURE_ACTION_83_SOLDIER_GOING_TO_STANDARD = figure_action.FIGURE_ACTION_83_SOLDIER_GOING_TO_STANDARD;
import FIGURE_ACTION_86_SOLDIER_MOPPING_UP = figure_action.FIGURE_ACTION_86_SOLDIER_MOPPING_UP;
import FIGURE_ACTION_87_SOLDIER_GOING_TO_DISTANT_BATTLE = figure_action.FIGURE_ACTION_87_SOLDIER_GOING_TO_DISTANT_BATTLE;
import FIGURE_ACTION_88_SOLDIER_RETURNING_FROM_DISTANT_BATTLE = figure_action.FIGURE_ACTION_88_SOLDIER_RETURNING_FROM_DISTANT_BATTLE;
import FIGURE_ACTION_148_FLEEING = figure_action.FIGURE_ACTION_148_FLEEING;
import FIGURE_ACTION_149_CORPSE = figure_action.FIGURE_ACTION_149_CORPSE;
import FIGURE_ACTION_150_ATTACK = figure_action.FIGURE_ACTION_150_ATTACK;
import GRID_SIZE = GRID.GRID_SIZE;
export function formation_legion_create_for_fort(fort: building) {
    formation_calculate_legion_totals();
    let m: formation = formation_create_legion(fort.id, fort.x, fort.y, fort.subtype.fort_figure_type);
    if (!m.id) {
        return 0;
    }
    let standard: figure = figure_create(FIGURE_FORT_STANDARD, 0, 0, DIR_0_TOP);
    standard.building_id = fort.id;
    standard.formation_id = m.id;
    m.standard_figure_id = standard.id;
    return m.id;
}
export function formation_legion_delete_for_fort(fort: building) {
    if (fort.formation_id > 0) {
        let m: formation = formation_get(fort.formation_id);
        if (m.in_use) {
            if (m.standard_figure_id) {
                figure_delete(figure_get(m.standard_figure_id));
            }
            formation_clear(fort.formation_id);
            formation_calculate_legion_totals();
        }
    }
}
export function formation_legion_recruits_needed() {
    for (let i: number = 1; i < MAX_FORMATIONS; i++) {
        let m: formation = formation_get(i);
        if (m.in_use && m.is_legion && m.legion_recruit_type != LEGION_RECRUIT_NONE) {
            return 1;
        }
    }
    return 0;
}
export function formation_legion_update_recruit_status(fort: building) {
    let m: formation = formation_get(fort.formation_id);
    m.legion_recruit_type = LEGION_RECRUIT_NONE;
    if (!m.is_at_fort || m.cursed_by_mars || m.num_figures == m.max_figures) {
        return;
    }
    if (m.num_figures < m.max_figures) {
        let type: number = fort.subtype.fort_figure_type;
        if (type == FIGURE_FORT_LEGIONARY) {
            m.legion_recruit_type = LEGION_RECRUIT_LEGIONARY;
        } else if (type == FIGURE_FORT_JAVELIN) {
            m.legion_recruit_type = LEGION_RECRUIT_JAVELIN;
        } else if (type == FIGURE_FORT_MOUNTED) {
            m.legion_recruit_type = LEGION_RECRUIT_MOUNTED;
        }
    } else {
        let too_many: number = m.num_figures - m.max_figures;
        for (let i: number = MAX_FORMATION_FIGURES - 1; i >= 0 && too_many > 0; i--) {
            if (m.figures[i]) {
                figure_get(m.figures[i]).action_state = FIGURE_ACTION_82_SOLDIER_RETURNING_TO_BARRACKS;
                too_many--;
            }
        }
        formation_calculate_figures();
    }
}
export function formation_legion_change_layout(m: formation, new_layout: number) {
    if (new_layout == FORMATION_MOP_UP && m.layout != FORMATION_MOP_UP) {
        m.prev.layout = m.layout;
    }
    m.layout = new_layout;
}
export function formation_legion_restore_layout(m: formation) {
    if (m.layout == FORMATION_MOP_UP) {
        m.layout = m.prev.layout;
    }
}
function prepare_to_move(m: formation) {
    if (m.months_very_low_morale || m.months_low_morale > 1) {
        return 0;
    }
    if (m.months_low_morale == 1) {
        formation_change_morale(m, 10);
    }
    return 1;
}
export function formation_legion_move_to(m: formation, x: number, y: number) {
    map_routing_calculate_distances(m.x_home, m.y_home);
    if (map_routing_distance(map_grid_offset(x, y)) <= 0) {
        return;
    }
    if (x == m.x_home && y == m.y_home) {
        return;
    }
    if (m.cursed_by_mars) {
        return;
    }
    m.standard_x = x;
    m.standard_y = y;
    m.is_at_fort = 0;
    if (m.morale <= 20) {
        city_warning_show(WARNING_LEGION_MORALE_TOO_LOW);
    }
    for (let i: number = 0; i < MAX_FORMATION_FIGURES && m.figures[i]; i++) {
        let f: figure = figure_get(m.figures[i]);
        if (f.action_state == FIGURE_ACTION_149_CORPSE ||
            f.action_state == FIGURE_ACTION_150_ATTACK) {
            continue
        }
        if (prepare_to_move(m)) {
            f.alternative_location_index = 0;
            f.action_state = FIGURE_ACTION_83_SOLDIER_GOING_TO_STANDARD;
            figure_route_remove(f);
        }
    }
}
export function formation_legion_return_home(m: formation) {
    map_routing_calculate_distances(m.x_home, m.y_home);
    if (map_routing_distance(map_grid_offset(m.x, m.y)) <= 0) {
        return;
    }
    if (m.cursed_by_mars) {
        return;
    }
    m.is_at_fort = 1;
    formation_legion_restore_layout(m);
    for (let i: number = 0; i < MAX_FORMATION_FIGURES && m.figures[i]; i++) {
        let f: figure = figure_get(m.figures[i]);
        if (f.action_state == FIGURE_ACTION_149_CORPSE ||
            f.action_state == FIGURE_ACTION_150_ATTACK) {
            continue
        }
        if (prepare_to_move(m)) {
            f.action_state = FIGURE_ACTION_81_SOLDIER_GOING_TO_FORT;
            figure_route_remove(f);
        }
    }
}
function dispatch_soldiers(m: formation) {
    m.in_distant_battle = 1;
    m.is_at_fort = 0;
    for (let fig: number = 0; fig < m.num_figures; fig++) {
        if (m.figures[fig] > 0) {
            let f: figure = figure_get(m.figures[fig]);
            if (!figure_is_dead(f)) {
                f.action_state = FIGURE_ACTION_87_SOLDIER_GOING_TO_DISTANT_BATTLE;
            }
        }
    }
    let strength_factor: number;
    if (m.has_military_training) {
        strength_factor = m.figure_type == FIGURE_FORT_LEGIONARY ? 3 : 2;
    } else {
        strength_factor = m.figure_type == FIGURE_FORT_LEGIONARY ? 2 : 1;
    }
    return strength_factor * m.num_figures;
}
export function formation_legions_dispatch_to_distant_battle() {
    let num_legions: number = 0;
    let roman_strength: number = 0;
    for (let i: number = 1; i < MAX_FORMATIONS; i++) {
        let m: formation = formation_get(i);
        if (m.in_use && m.is_legion && m.empire_service && m.num_figures > 0) {
            roman_strength += dispatch_soldiers(m)
            num_legions++;
        }
    }
    if (num_legions > 0) {
        city_military_dispatch_to_distant_battle(roman_strength);
    }
}
function kill_soldiers(m: formation, kill_percentage: number) {
    formation_change_morale(m, -75);
    let soldiers_total: number = 0;
    for (let fig: number = 0; fig < m.num_figures; fig++) {
        if (m.figures[fig] > 0) {
            let f: figure = figure_get(m.figures[fig]);
            if (!figure_is_dead(f)) {
                soldiers_total++;
            }
        }
    }
    let soldiers_to_kill: number = calc_adjust_with_percentage(soldiers_total, kill_percentage);
    if (soldiers_to_kill >= soldiers_total) {
        m.is_at_fort = 1;
        m.in_distant_battle = 0;
    }
    for (let fig: number = 0; fig < m.num_figures; fig++) {
        if (m.figures[fig] > 0) {
            let f: figure = figure_get(m.figures[fig]);
            if (!figure_is_dead(f)) {
                if (soldiers_to_kill) {
                    soldiers_to_kill--;
                    f.state = FIGURE_STATE_DEAD;
                }
            }
        }
    }
}
export function formation_legions_kill_in_distant_battle(kill_percentage: number) {
    for (let i: number = 1; i < MAX_FORMATIONS; i++) {
        let m: formation = formation_get(i);
        if (m.in_use && m.is_legion && m.in_distant_battle) {
            kill_soldiers(m, kill_percentage);
        }
    }
}
function return_soldiers(m: formation) {
    m.in_distant_battle = 0;
    for (let fig: number = 0; fig < m.num_figures; fig++) {
        if (m.figures[fig] > 0) {
            let f: figure = figure_get(m.figures[fig]);
            if (!figure_is_dead(f)) {
                f.action_state = FIGURE_ACTION_88_SOLDIER_RETURNING_FROM_DISTANT_BATTLE;
                f.formation_at_rest = 1;
            }
        }
    }
}
export function formation_legions_return_from_distant_battle() {
    for (let i: number = 1; i < MAX_FORMATIONS; i++) {
        let m: formation = formation_get(i);
        if (m.in_use && m.is_legion && m.in_distant_battle) {
            return_soldiers(m);
        }
    }
}
export function formation_legion_curse() {
    let best_legion: formation = null;
    let best_legion_weight: number = 0;
    for (let i: number = 1; i <= 6; i++) {
        let m: formation = formation_get(i);
        if (m.in_use == 1 && m.is_legion) {
            let weight: number = m.num_figures;
            if (m.figure_type == FIGURE_FORT_LEGIONARY) {
                weight *= 2
            }
            if (weight > best_legion_weight) {
                best_legion_weight = weight;
                best_legion = m;
            }
        }
    }
    if (!best_legion) {
        return 0;
    }
    for (let i: number = 0; i < MAX_FORMATION_FIGURES - 1; i++) {
        if (best_legion.figures[i] > 0) {
            figure_get(best_legion.figures[i]).action_state = FIGURE_ACTION_82_SOLDIER_RETURNING_TO_BARRACKS;
        }
    }
    best_legion.cursed_by_mars = 96;
    formation_calculate_figures();
    return 1;
}
function is_legion(f: figure) {
    if (figure_is_legion(f) || f.type == FIGURE_FORT_STANDARD) {
        return f.formation_id;
    }
    return 0;
}
export function formation_legion_at_grid_offset(grid_offset: number) {
    return map_figure_foreach_until(grid_offset, is_legion);
}
export function formation_legion_at_building(grid_offset: number) {
    let building_id: number = map_building_at(grid_offset);
    if (building_id > 0) {
        let b: building = building_get(building_id);
        if (b.state == BUILDING_STATE_IN_USE && (b.type == BUILDING_FORT || b.type == BUILDING_FORT_GROUND)) {
            return b.formation_id;
        }
    }
    return 0;
}
export function formation_legion_update() {
    for (let i: number = 1; i <= MAX_LEGIONS; i++) {
        let m: formation = formation_get(i);
        if (m.in_use != 1 || !m.is_legion) {
            continue
        }
        formation_decrease_monthly_counters(m);
        if (city_figures_enemies() <= 0) {
            formation_clear_monthly_counters(m);
        }
        for (let n: number = 0; n < MAX_FORMATION_FIGURES; n++) {
            if (figure_get(m.figures[n]).action_state == FIGURE_ACTION_150_ATTACK) {
                formation_record_fight(m);
            }
        }
        if (formation_has_low_morale(m)) {
            for (let n: number = 0; n < MAX_FORMATION_FIGURES; n++) {
                let f: figure = figure_get(m.figures[n]);
                if (f.action_state != FIGURE_ACTION_150_ATTACK &&
                    f.action_state != FIGURE_ACTION_149_CORPSE &&
                    f.action_state != FIGURE_ACTION_148_FLEEING) {
                    f.action_state = FIGURE_ACTION_148_FLEEING;
                    figure_route_remove(f);
                }
            }
        } else if (m.layout == FORMATION_MOP_UP) {
            if (enemy_army_total_enemy_formations() +
                city_figures_rioters() +
                city_figures_attacking_natives() > 0) {
                for (let n: number = 0; n < MAX_FORMATION_FIGURES; n++) {
                    if (m.figures[n] != 0) {
                        let f: figure = figure_get(m.figures[n]);
                        if (f.action_state != FIGURE_ACTION_150_ATTACK &&
                            f.action_state != FIGURE_ACTION_149_CORPSE) {
                            f.action_state = FIGURE_ACTION_86_SOLDIER_MOPPING_UP;
                        }
                    }
                }
            } else {
                formation_legion_restore_layout(m);
            }
        }
    }
}
export function formation_legion_decrease_damage() {
    for (let i: number = 1; i < MAX_FIGURES; i++) {
        let f: figure = figure_get(i);
        if (f.state == FIGURE_STATE_ALIVE && figure_is_legion(f)) {
            if (f.action_state == FIGURE_ACTION_80_SOLDIER_AT_REST) {
                if (f.damage) {
                    f.damage--;
                }
            }
        }
    }
}
