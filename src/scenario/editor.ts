import { MAX_BRIEF_DESCRIPTION } from 'scenario/data';
import { MAX_BRIEFING } from 'scenario/data';
import { MAX_ALLOWED_BUILDINGS } from 'scenario/data';
import { MAX_INVASION_POINTS } from 'scenario/data';
import { MAX_FISH_POINTS } from 'scenario/data';
import { MAX_HERD_POINTS } from 'scenario/data';
import { MAX_REQUESTS } from 'scenario/data';
import { MAX_INVASIONS } from 'scenario/data';
import { MAX_PRICE_CHANGES } from 'scenario/data';
import { MAX_DEMAND_CHANGES } from 'scenario/data';
;
export class editor_request {
    public year: number = 0;
    public resource: number = 0;
    public amount: number = 0;
    public deadline_years: number = 0;
    public favor: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.year = args[0]);
        args.length >= 2 && (this.resource = args[1]);
        args.length >= 3 && (this.amount = args[2]);
        args.length >= 4 && (this.deadline_years = args[3]);
        args.length >= 5 && (this.favor = args[4]);
    }
}
export class editor_invasion {
    public year: number = 0;
    public type: number = 0;
    public amount: number = 0;
    public from: number = 0;
    public attack_type: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.year = args[0]);
        args.length >= 2 && (this.type = args[1]);
        args.length >= 3 && (this.amount = args[2]);
        args.length >= 4 && (this.from = args[3]);
        args.length >= 5 && (this.attack_type = args[4]);
    }
}
export class editor_price_change {
    public year: number = 0;
    public resource: number = 0;
    public amount: number = 0;
    public is_rise: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.year = args[0]);
        args.length >= 2 && (this.resource = args[1]);
        args.length >= 3 && (this.amount = args[2]);
        args.length >= 4 && (this.is_rise = args[3]);
    }
}
export class editor_demand_change {
    public year: number = 0;
    public resource: number = 0;
    public route_id: number = 0;
    public is_rise: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.year = args[0]);
        args.length >= 2 && (this.resource = args[1]);
        args.length >= 3 && (this.route_id = args[2]);
        args.length >= 4 && (this.is_rise = args[3]);
    }
}
import { lang_type } from 'core/lang';
import { lang_message_type } from 'core/lang';
import { lang_message } from 'core/lang';
import { lang_get_string } from 'core/lang';
import { string_equals } from 'core/string';
import { string_copy } from 'core/string';
import { buffer } from 'core/buffer';
import { GRID } from 'map/grid';
import GRID_SIZE = GRID.GRID_SIZE;
import { map_point } from 'map/point';
import { request_t } from 'scenario/data';
import { invasion_t } from 'scenario/data';
import { price_change_t } from 'scenario/data';
import { demand_change_t } from 'scenario/data';
export let scenario: scenario_t = new scenario_t();
import { scenario_climate } from 'scenario/property';
import CLIMATE_CENTRAL = scenario_climate.CLIMATE_CENTRAL;
import CLIMATE_NORTHERN = scenario_climate.CLIMATE_NORTHERN;
import CLIMATE_DESERT = scenario_climate.CLIMATE_DESERT;
import { scenario_climate } from 'scenario/property';
import { _invalid_parameter_noinfo } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt';
import { _errno } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/errno';
import { memcpy } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vcruntime_string';
import { memcpy } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vcruntime_string';
import { memmove } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vcruntime_string';
import { memmove } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vcruntime_string';
import { memset } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vcruntime_string';
import { memset } from 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include/vcruntime_string';
import { wcsnlen } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstring';
import { wcstok } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/corecrt_wstring';
import { strnlen } from 'C:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt/string';
export class unnamed11_14 {
    public width: number = 0;
    public height: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.width = args[0]);
        args.length >= 2 && (this.height = args[1]);
    }
}
let MAP_SIZES: struct (unnamed struct at./ src / scenario / editor.c: 11: 14)[] = new Array().fill({
    { 40, 40},
    { 60, 60},
    { 80, 80},
    { 100, 100},
    { 120, 120},
    { 160, 160}
});
function init_point(point: map_point) {
    point.x = -1;
    point.y = -1;
}
export function scenario_editor_create(map_size: number) {
    memset(scenario, 0);
    scenario.map.width = MAP_SIZES[map_size].width;
    scenario.map.height = MAP_SIZES[map_size].height;
    scenario.map.grid_border_size = GRID_SIZE - scenario.map.width;
    scenario.map.grid_start = (GRID_SIZE - scenario.map.height) / 2 * GRID_SIZE + (GRID_SIZE - scenario.map.width) / 2;
    string_copy(lang_get_string(44, 37), scenario.brief_description, MAX_BRIEF_DESCRIPTION);
    string_copy(lang_get_string(44, 38), scenario.briefing, MAX_BRIEFING);
    scenario.initial_funds = 1000;
    scenario.rescue_loan = 500;
    scenario.start_year = -500;
    scenario.win_criteria.milestone25_year = 10;
    scenario.win_criteria.milestone50_year = 20;
    scenario.win_criteria.milestone75_year = 30;
    for (let i: number = 0; i < MAX_ALLOWED_BUILDINGS; i++) {
        scenario.allowed_buildings[i] = 1;
    }
    scenario.rome_supplies_wheat = 0;
    scenario.win_criteria.culture.goal = 10;
    scenario.win_criteria.culture.enabled = 1;
    scenario.win_criteria.prosperity.goal = 10;
    scenario.win_criteria.prosperity.enabled = 1;
    scenario.win_criteria.peace.goal = 10;
    scenario.win_criteria.peace.enabled = 1;
    scenario.win_criteria.favor.goal = 10;
    scenario.win_criteria.favor.enabled = 1;
    scenario.win_criteria.population.goal = 0;
    scenario.win_criteria.population.enabled = 0;
    scenario.win_criteria.time_limit.years = 0;
    scenario.win_criteria.time_limit.enabled = 0;
    scenario.win_criteria.survival_time.years = 0;
    scenario.win_criteria.survival_time.enabled = 0;
    scenario.earthquake.severity = 0;
    scenario.earthquake.year = 0;
    init_point(scenario.earthquake_point);
    init_point(scenario.entry_point);
    init_point(scenario.exit_point);
    init_point(scenario.river_entry_point);
    init_point(scenario.river_exit_point);
    for (let i: number = 0; i < MAX_INVASION_POINTS; i++) {
        init_point(scenario.invasion_points[i]);
    }
    for (let i: number = 0; i < MAX_FISH_POINTS; i++) {
        init_point(scenario.fishing_points[i]);
    }
    for (let i: number = 0; i < MAX_HERD_POINTS; i++) {
        init_point(scenario.herd_points[i]);
    }
    for (let i: number = 0; i < MAX_REQUESTS; i++) {
        scenario.requests[i].deadline_years = 5;
        scenario.requests[i].favor = 8;
    }
    for (let i: number = 0; i < MAX_INVASIONS; i++) {
        scenario.invasions[i].from = 8;
    }
    scenario.is_saved = 1;
}
export function scenario_editor_set_native_images(image_hut: number, image_meeting: number, image_crops: number) {
    scenario.native_images.hut = image_hut;
    scenario.native_images.meeting = image_meeting;
    scenario.native_images.crops = image_crops;
}
export function scenario_editor_request_get(index: number, request: editor_request) {
    request.year = scenario.requests[index].year;
    request.amount = scenario.requests[index].amount;
    request.resource = scenario.requests[index].resource;
    request.deadline_years = scenario.requests[index].deadline_years;
    request.favor = scenario.requests[index].favor;
}
function sort_requests() {
    for (let i: number = 0; i < MAX_REQUESTS; i++) {
        for (let j: number = MAX_REQUESTS - 1; j > 0; j--) {
            let current: request_t = scenario.requests[j];
            let prev: request_t = scenario.requests[j - 1];
            if (current.resource && (!prev.resource || prev.year > current.year)) {
                let tmp: request_t = * current;
                * current = * prev;
                * prev = tmp;
            }
        }
    }
}
export function scenario_editor_request_delete(index: number) {
    scenario.requests[index].year = 0;
    scenario.requests[index].amount = 0;
    scenario.requests[index].resource = 0;
    scenario.requests[index].deadline_years = 5;
    scenario.requests[index].favor = 8;
    sort_requests();
    scenario.is_saved = 0;
}
export function scenario_editor_request_save(index: number, request: editor_request) {
    scenario.requests[index].year = request.year;
    scenario.requests[index].amount = request.amount;
    scenario.requests[index].resource = request.resource;
    scenario.requests[index].deadline_years = request.deadline_years;
    scenario.requests[index].favor = request.favor;
    sort_requests();
    scenario.is_saved = 0;
}
export function scenario_editor_invasion_get(index: number, invasion: editor_invasion) {
    invasion.year = scenario.invasions[index].year;
    invasion.type = scenario.invasions[index].type;
    invasion.amount = scenario.invasions[index].amount;
    invasion.from = scenario.invasions[index].from;
    invasion.attack_type = scenario.invasions[index].attack_type;
}
function sort_invasions() {
    for (let i: number = 0; i < MAX_INVASIONS; i++) {
        for (let j: number = MAX_INVASIONS - 1; j > 0; j--) {
            let current: invasion_t = scenario.invasions[j];
            let prev: invasion_t = scenario.invasions[j - 1];
            if (current.type && (!prev.type || prev.year > current.year)) {
                let tmp: invasion_t = * current;
                * current = * prev;
                * prev = tmp;
            }
        }
    }
}
export function scenario_editor_invasion_delete(index: number) {
    scenario.invasions[index].year = 0;
    scenario.invasions[index].amount = 0;
    scenario.invasions[index].type = 0;
    scenario.invasions[index].from = 8;
    scenario.invasions[index].attack_type = 0;
    sort_invasions();
    scenario.is_saved = 0;
}
export function scenario_editor_invasion_save(index: number, invasion: editor_invasion) {
    scenario.invasions[index].year = invasion.type ? invasion.year : 0;
    scenario.invasions[index].amount = invasion.type ? invasion.amount : 0;
    scenario.invasions[index].type = invasion.type;
    scenario.invasions[index].from = invasion.from;
    scenario.invasions[index].attack_type = invasion.attack_type;
    sort_invasions();
    scenario.is_saved = 0;
}
export function scenario_editor_price_change_get(index: number, price_change: editor_price_change) {
    price_change.year = scenario.price_changes[index].year;
    price_change.resource = scenario.price_changes[index].resource;
    price_change.amount = scenario.price_changes[index].amount;
    price_change.is_rise = scenario.price_changes[index].is_rise;
}
function sort_price_changes() {
    for (let i: number = 0; i < MAX_PRICE_CHANGES; i++) {
        if (!scenario.price_changes[i].resource) {
            scenario.price_changes[i].year = 0;
        }
    }
    for (let i: number = 0; i < MAX_PRICE_CHANGES; i++) {
        for (let j: number = MAX_PRICE_CHANGES - 1; j > 0; j--) {
            let current: price_change_t = scenario.price_changes[j];
            let prev: price_change_t = scenario.price_changes[j - 1];
            if (current.year && (!prev.year || prev.year > current.year)) {
                let tmp: price_change_t = * current;
                * current = * prev;
                * prev = tmp;
            }
        }
    }
}
export function scenario_editor_price_change_delete(index: number) {
    scenario.price_changes[index].year = 0;
    scenario.price_changes[index].resource = 0;
    scenario.price_changes[index].amount = 0;
    scenario.price_changes[index].is_rise = 0;
    sort_price_changes();
    scenario.is_saved = 0;
}
export function scenario_editor_price_change_save(index: number, price_change: editor_price_change) {
    scenario.price_changes[index].year = price_change.year;
    scenario.price_changes[index].resource = price_change.resource;
    scenario.price_changes[index].amount = price_change.amount;
    scenario.price_changes[index].is_rise = price_change.is_rise;
    sort_price_changes();
    scenario.is_saved = 0;
}
export function scenario_editor_demand_change_get(index: number, demand_change: editor_demand_change) {
    demand_change.year = scenario.demand_changes[index].year;
    demand_change.resource = scenario.demand_changes[index].resource;
    demand_change.route_id = scenario.demand_changes[index].route_id;
    demand_change.is_rise = scenario.demand_changes[index].is_rise;
}
function sort_demand_changes() {
    for (let i: number = 0; i < MAX_DEMAND_CHANGES; i++) {
        if (!scenario.demand_changes[i].resource) {
            scenario.demand_changes[i].year = 0;
        }
    }
    for (let i: number = 0; i < MAX_DEMAND_CHANGES; i++) {
        for (let j: number = MAX_DEMAND_CHANGES - 1; j > 0; j--) {
            let current: demand_change_t = scenario.demand_changes[j];
            let prev: demand_change_t = scenario.demand_changes[j - 1];
            if (current.year && (!prev.year || prev.year > current.year)) {
                let tmp: demand_change_t = * current;
                * current = * prev;
                * prev = tmp;
            }
        }
    }
}
export function scenario_editor_demand_change_delete(index: number) {
    scenario.demand_changes[index].year = 0;
    scenario.demand_changes[index].resource = 0;
    scenario.demand_changes[index].route_id = 0;
    scenario.demand_changes[index].is_rise = 0;
    sort_demand_changes();
    scenario.is_saved = 0;
}
export function scenario_editor_demand_change_save(index: number, demand_change: editor_demand_change) {
    scenario.demand_changes[index].year = demand_change.year;
    scenario.demand_changes[index].resource = demand_change.resource;
    scenario.demand_changes[index].route_id = demand_change.route_id;
    scenario.demand_changes[index].is_rise = demand_change.is_rise;
    sort_demand_changes();
    scenario.is_saved = 0;
}
export function scenario_editor_cycle_image(forward: number) {
    if (forward) {
        scenario.image_id++;
    } else {
        scenario.image_id--;
    }
    if (scenario.image_id < 0) {
        scenario.image_id = 15;
    }
    if (scenario.image_id > 15) {
        scenario.image_id = 0;
    }
    scenario.is_saved = 0;
}
export function scenario_editor_cycle_climate() {
    switch (scenario.climate) {
        case CLIMATE_CENTRAL:
            scenario.climate = CLIMATE_NORTHERN;
            break
        case CLIMATE_NORTHERN:
            scenario.climate = CLIMATE_DESERT;
            break
        case CLIMATE_DESERT:
        default:
            scenario.climate = CLIMATE_CENTRAL
            break
    }
    scenario.is_saved = 0;
}
export function scenario_editor_update_brief_description(new_description: number) {
    if (!string_equals(scenario.brief_description, new_description)) {
        string_copy(new_description, scenario.brief_description, MAX_BRIEF_DESCRIPTION);
        scenario.is_saved = 0;
    }
}
export function scenario_editor_set_enemy(enemy_id: number) {
    scenario.enemy_id = enemy_id;
    scenario.is_saved = 0;
}
export function scenario_editor_change_empire(change: number) {
    scenario.empire.id += change
    if (scenario.empire.id < 0) {
        scenario.empire.id = 39;
    } else if (scenario.empire.id >= 40) {
        scenario.empire.id = 0;
    }
    scenario.is_saved = 0;
}
export function scenario_editor_is_building_allowed(id: number) {
    return scenario.allowed_buildings[id];
}
export function scenario_editor_toggle_building_allowed(id: number) {
    scenario.allowed_buildings[id] = scenario.allowed_buildings[id] ? 0 : 1;
    scenario.is_saved = 0;
}
export function scenario_editor_set_player_rank(rank: number) {
    scenario.player_rank = rank;
    scenario.is_saved = 0;
}
export function scenario_editor_set_initial_funds(amount: number) {
    scenario.initial_funds = amount;
    scenario.is_saved = 0;
}
export function scenario_editor_set_rescue_loan(amount: number) {
    scenario.rescue_loan = amount;
    scenario.is_saved = 0;
}
export function scenario_editor_toggle_rome_supplies_wheat() {
    scenario.rome_supplies_wheat = !scenario.rome_supplies_wheat;
    scenario.is_saved = 0;
}
export function scenario_editor_toggle_flotsam() {
    scenario.flotsam_enabled = !scenario.flotsam_enabled;
    scenario.is_saved = 0;
}
export function scenario_editor_milestone_year(milestone_percentage: number) {
    switch (milestone_percentage) {
        case 25:
            return scenario.win_criteria.milestone25_year;
        case 50:
            return scenario.win_criteria.milestone50_year;
        case 75:
            return scenario.win_criteria.milestone75_year;
        default:
            return 0
    }
}
export function scenario_editor_set_milestone_year(milestone_percentage: number, year: number) {
    switch (milestone_percentage) {
        case 25:
            scenario.win_criteria.milestone25_year = year;
            break
        case 50:
            scenario.win_criteria.milestone50_year = year;
            break
        case 75:
            scenario.win_criteria.milestone75_year = year;
            break
        default:
            return
    }
    scenario.is_saved = 0;
}
export function scenario_editor_set_start_year(year: number) {
    scenario.start_year = year;
    scenario.is_saved = 0;
}
export function scenario_editor_toggle_open_play() {
    scenario.is_open_play = !scenario.is_open_play;
    if (scenario.is_open_play) {
        scenario.open_play_scenario_id = 12;
    }
    scenario.is_saved = 0;
}
export function scenario_editor_toggle_culture() {
    scenario.win_criteria.culture.enabled = !scenario.win_criteria.culture.enabled;
    scenario.is_saved = 0;
}
export function scenario_editor_set_culture(goal: number) {
    scenario.win_criteria.culture.goal = goal;
    scenario.is_saved = 0;
}
export function scenario_editor_toggle_prosperity() {
    scenario.win_criteria.prosperity.enabled = !scenario.win_criteria.prosperity.enabled;
    scenario.is_saved = 0;
}
export function scenario_editor_set_prosperity(goal: number) {
    scenario.win_criteria.prosperity.goal = goal;
    scenario.is_saved = 0;
}
export function scenario_editor_toggle_peace() {
    scenario.win_criteria.peace.enabled = !scenario.win_criteria.peace.enabled;
    scenario.is_saved = 0;
}
export function scenario_editor_set_peace(goal: number) {
    scenario.win_criteria.peace.goal = goal;
    scenario.is_saved = 0;
}
export function scenario_editor_toggle_favor() {
    scenario.win_criteria.favor.enabled = !scenario.win_criteria.favor.enabled;
    scenario.is_saved = 0;
}
export function scenario_editor_set_favor(goal: number) {
    scenario.win_criteria.favor.goal = goal;
    scenario.is_saved = 0;
}
export function scenario_editor_toggle_population() {
    scenario.win_criteria.population.enabled = !scenario.win_criteria.population.enabled;
    scenario.is_saved = 0;
}
export function scenario_editor_set_population(goal: number) {
    scenario.win_criteria.population.goal = goal;
    scenario.is_saved = 0;
}
export function scenario_editor_toggle_time_limit() {
    scenario.win_criteria.time_limit.enabled = !scenario.win_criteria.time_limit.enabled;
    if (scenario.win_criteria.time_limit.enabled) {
        scenario.win_criteria.survival_time.enabled = 0;
    }
    scenario.is_saved = 0;
}
export function scenario_editor_set_time_limit(years: number) {
    scenario.win_criteria.time_limit.years = years;
    scenario.is_saved = 0;
}
export function scenario_editor_toggle_survival_time() {
    scenario.win_criteria.survival_time.enabled = !scenario.win_criteria.survival_time.enabled;
    if (scenario.win_criteria.survival_time.enabled) {
        scenario.win_criteria.time_limit.enabled = 0;
    }
    scenario.is_saved = 0;
}
export function scenario_editor_set_survival_time(years: number) {
    scenario.win_criteria.survival_time.years = years;
    scenario.is_saved = 0;
}
