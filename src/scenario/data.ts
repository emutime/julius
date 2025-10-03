
import { map_point } from 'map/point';
;
export const enum event {
    EVENT_NOT_STARTED = 0,
    EVENT_IN_PROGRESS = 1,
    EVENT_FINISHED = 2,
}
export const enum allowed_building {
    ALLOWED_BUILDING_NONE = 0,
    ALLOWED_BUILDING_FARMS = 1,
    ALLOWED_BUILDING_RAW_MATERIALS = 2,
    ALLOWED_BUILDING_WORKSHOPS = 3,
    ALLOWED_BUILDING_ROAD = 4,
    ALLOWED_BUILDING_WALL = 5,
    ALLOWED_BUILDING_AQUEDUCT = 6,
    ALLOWED_BUILDING_HOUSING = 7,
    ALLOWED_BUILDING_AMPHITHEATER = 8,
    ALLOWED_BUILDING_THEATER = 9,
    ALLOWED_BUILDING_HIPPODROME = 10,
    ALLOWED_BUILDING_COLOSSEUM = 11,
    ALLOWED_BUILDING_GLADIATOR_SCHOOL = 12,
    ALLOWED_BUILDING_LION_HOUSE = 13,
    ALLOWED_BUILDING_ACTOR_COLONY = 14,
    ALLOWED_BUILDING_CHARIOT_MAKER = 15,
    ALLOWED_BUILDING_GARDENS = 16,
    ALLOWED_BUILDING_PLAZA = 17,
    ALLOWED_BUILDING_STATUES = 18,
    ALLOWED_BUILDING_DOCTOR = 19,
    ALLOWED_BUILDING_HOSPITAL = 20,
    ALLOWED_BUILDING_BATHHOUSE = 21,
    ALLOWED_BUILDING_BARBER = 22,
    ALLOWED_BUILDING_SCHOOL = 23,
    ALLOWED_BUILDING_ACADEMY = 24,
    ALLOWED_BUILDING_LIBRARY = 25,
    ALLOWED_BUILDING_PREFECTURE = 26,
    ALLOWED_BUILDING_FORT = 27,
    ALLOWED_BUILDING_GATEHOUSE = 28,
    ALLOWED_BUILDING_TOWER = 29,
    ALLOWED_BUILDING_SMALL_TEMPLES = 30,
    ALLOWED_BUILDING_LARGE_TEMPLES = 31,
    ALLOWED_BUILDING_MARKET = 32,
    ALLOWED_BUILDING_GRANARY = 33,
    ALLOWED_BUILDING_WAREHOUSE = 34,
    ALLOWED_BUILDING_TRIUMPHAL_ARCH = 35,
    ALLOWED_BUILDING_DOCK = 36,
    ALLOWED_BUILDING_WHARF = 37,
    ALLOWED_BUILDING_GOVERNOR_HOME = 38,
    ALLOWED_BUILDING_ENGINEERS_POST = 39,
    ALLOWED_BUILDING_SENATE = 40,
    ALLOWED_BUILDING_FORUM = 41,
    ALLOWED_BUILDING_WELL = 42,
    ALLOWED_BUILDING_ORACLE = 43,
    ALLOWED_BUILDING_MISSION_POST = 44,
    ALLOWED_BUILDING_BRIDGE = 45,
    ALLOWED_BUILDING_BARRACKS = 46,
    ALLOWED_BUILDING_MILITARY_ACADEMY = 47,
    ALLOWED_BUILDING_DISTRIBUTION_CENTER = 48,
}
export class win_criteria_t {
    public enabled: number = 0;
    public goal: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.enabled = args[0]);
        args.length >= 2 && (this.goal = args[1]);
    }
}
export class request_t {
    public year: number = 0;
    public resource: number = 0;
    public amount: number = 0;
    public deadline_years: number = 0;
    public can_comply_dialog_shown: number = 0;
    public favor: number = 0;
    public month: number = 0;
    public state: number = 0;
    public visible: number = 0;
    public months_to_comply: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.year = args[0]);
        args.length >= 2 && (this.resource = args[1]);
        args.length >= 3 && (this.amount = args[2]);
        args.length >= 4 && (this.deadline_years = args[3]);
        args.length >= 5 && (this.can_comply_dialog_shown = args[4]);
        args.length >= 6 && (this.favor = args[5]);
        args.length >= 7 && (this.month = args[6]);
        args.length >= 8 && (this.state = args[7]);
        args.length >= 9 && (this.visible = args[8]);
        args.length >= 10 && (this.months_to_comply = args[9]);
    }
}
export class invasion_t {
    public year: number = 0;
    public type: number = 0;
    public amount: number = 0;
    public from: number = 0;
    public attack_type: number = 0;
    public month: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.year = args[0]);
        args.length >= 2 && (this.type = args[1]);
        args.length >= 3 && (this.amount = args[2]);
        args.length >= 4 && (this.from = args[3]);
        args.length >= 5 && (this.attack_type = args[4]);
        args.length >= 6 && (this.month = args[5]);
    }
}
export class price_change_t {
    public year: number = 0;
    public month: number = 0;
    public resource: number = 0;
    public amount: number = 0;
    public is_rise: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.year = args[0]);
        args.length >= 2 && (this.month = args[1]);
        args.length >= 3 && (this.resource = args[2]);
        args.length >= 4 && (this.amount = args[3]);
        args.length >= 5 && (this.is_rise = args[4]);
    }
}
export class demand_change_t {
    public year: number = 0;
    public month: number = 0;
    public resource: number = 0;
    public route_id: number = 0;
    public is_rise: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.year = args[0]);
        args.length >= 2 && (this.month = args[1]);
        args.length >= 3 && (this.resource = args[2]);
        args.length >= 4 && (this.route_id = args[3]);
        args.length >= 5 && (this.is_rise = args[4]);
    }
}
class time_limit {
    public enabled: number = 0;
    public years: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.enabled = args[0]);
        args.length >= 2 && (this.years = args[1]);
    }
}
class survival_time {
    public enabled: number = 0;
    public years: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.enabled = args[0]);
        args.length >= 2 && (this.years = args[1]);
    }
}
class win_criteria {
    public population: win_criteria_t = null;
    public culture: win_criteria_t = null;
    public prosperity: win_criteria_t = null;
    public peace: win_criteria_t = null;
    public favor: win_criteria_t = null;
    public time_limit: time_limit = null;
    public survival_time: survival_time = null;
    public milestone25_year: number = 0;
    public milestone50_year: number = 0;
    public milestone75_year: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.population = args[0]);
        args.length >= 2 && (this.culture = args[1]);
        args.length >= 3 && (this.prosperity = args[2]);
        args.length >= 4 && (this.peace = args[3]);
        args.length >= 5 && (this.favor = args[4]);
        args.length >= 6 && (this.time_limit = args[5]);
        args.length >= 7 && (this.survival_time = args[6]);
        args.length >= 8 && (this.milestone25_year = args[7]);
        args.length >= 9 && (this.milestone50_year = args[8]);
        args.length >= 10 && (this.milestone75_year = args[9]);
    }
}
class empire {
    public id: number = 0;
    public is_expanded: number = 0;
    public expansion_year: number = 0;
    public distant_battle_roman_travel_months: number = 0;
    public distant_battle_enemy_travel_months: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.id = args[0]);
        args.length >= 2 && (this.is_expanded = args[1]);
        args.length >= 3 && (this.expansion_year = args[2]);
        args.length >= 4 && (this.distant_battle_roman_travel_months = args[3]);
        args.length >= 5 && (this.distant_battle_enemy_travel_months = args[4]);
    }
}
class earthquake {
    public severity: number = 0;
    public year: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.severity = args[0]);
        args.length >= 2 && (this.year = args[1]);
    }
}
class emperor_change {
    public year: number = 0;
    public enabled: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.year = args[0]);
        args.length >= 2 && (this.enabled = args[1]);
    }
}
class gladiator_revolt {
    public year: number = 0;
    public enabled: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.year = args[0]);
        args.length >= 2 && (this.enabled = args[1]);
    }
}
class random_events {
    public sea_trade_problem: number = 0;
    public land_trade_problem: number = 0;
    public raise_wages: number = 0;
    public lower_wages: number = 0;
    public contaminated_water: number = 0;
    public iron_mine_collapse: number = 0;
    public clay_pit_flooded: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.sea_trade_problem = args[0]);
        args.length >= 2 && (this.land_trade_problem = args[1]);
        args.length >= 3 && (this.raise_wages = args[2]);
        args.length >= 4 && (this.lower_wages = args[3]);
        args.length >= 5 && (this.contaminated_water = args[4]);
        args.length >= 6 && (this.iron_mine_collapse = args[5]);
        args.length >= 7 && (this.clay_pit_flooded = args[6]);
    }
}
class map {
    public width: number = 0;
    public height: number = 0;
    public grid_start: number = 0;
    public grid_border_size: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.width = args[0]);
        args.length >= 2 && (this.height = args[1]);
        args.length >= 3 && (this.grid_start = args[2]);
        args.length >= 4 && (this.grid_border_size = args[3]);
    }
}
class native_images {
    public hut: number = 0;
    public meeting: number = 0;
    public crops: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.hut = args[0]);
        args.length >= 2 && (this.meeting = args[1]);
        args.length >= 3 && (this.crops = args[2]);
    }
}
class settings {
    public campaign_rank: number = 0;
    public campaign_mission: number = 0;
    public is_custom: number = 0;
    public starting_favor: number = 0;
    public starting_personal_savings: number = 0;
    public player_name: number[] = new Array(MAX_PLAYER_NAME).fill(0);
    public campaign_player_name: number[] = new Array(MAX_PLAYER_NAME).fill(0);
    public constructor(...args: any[]) {
        args.length >= 1 && (this.campaign_rank = args[0]);
        args.length >= 2 && (this.campaign_mission = args[1]);
        args.length >= 3 && (this.is_custom = args[2]);
        args.length >= 4 && (this.starting_favor = args[3]);
        args.length >= 5 && (this.starting_personal_savings = args[4]);
        args.length >= 6 && (this.player_name = args[5]);
        args.length >= 7 && (this.campaign_player_name = args[6]);
    }
}
export class scenario_t {
    public scenario_name: number[] = new Array(MAX_SCENARIO_NAME).fill(0);
    public start_year: number = 0;
    public climate: number = 0;
    public player_rank: number = 0;
    public initial_funds: number = 0;
    public rescue_loan: number = 0;
    public rome_supplies_wheat: number = 0;
    public image_id: number = 0;
    public brief_description: number[] = new Array(MAX_BRIEF_DESCRIPTION).fill(0);
    public briefing: number[] = new Array(MAX_BRIEFING).fill(0);
    public enemy_id: number = 0;
    public is_open_play: number = 0;
    public open_play_scenario_id: number = 0;
    public win_criteria: win_criteria = null;
    public empire: empire = null;
    public requests: request_t[] = new Array(MAX_REQUESTS).fill(null);
    public demand_changes: demand_change_t[] = new Array(MAX_DEMAND_CHANGES).fill(null);
    public price_changes: price_change_t[] = new Array(MAX_DEMAND_CHANGES).fill(null);
    public invasions: invasion_t[] = new Array(MAX_INVASIONS).fill(null);
    public earthquake: earthquake = null;
    public emperor_change: emperor_change = null;
    public gladiator_revolt: gladiator_revolt = null;
    public random_events: random_events = null;
    public map: map = null;
    public flotsam_enabled: number = 0;
    public entry_point: map_point = null;
    public exit_point: map_point = null;
    public river_entry_point: map_point = null;
    public river_exit_point: map_point = null;
    public earthquake_point: map_point = null;
    public herd_points: map_point[] = new Array(MAX_HERD_POINTS).fill(null);
    public fishing_points: map_point[] = new Array(MAX_FISH_POINTS).fill(null);
    public invasion_points: map_point[] = new Array(MAX_INVASION_POINTS).fill(null);
    public allowed_buildings: number[] = new Array(MAX_ALLOWED_BUILDINGS).fill(0);
    public native_images: native_images = null;
    public settings: settings = null;
    public is_saved: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.scenario_name = args[0]);
        args.length >= 2 && (this.start_year = args[1]);
        args.length >= 3 && (this.climate = args[2]);
        args.length >= 4 && (this.player_rank = args[3]);
        args.length >= 5 && (this.initial_funds = args[4]);
        args.length >= 6 && (this.rescue_loan = args[5]);
        args.length >= 7 && (this.rome_supplies_wheat = args[6]);
        args.length >= 8 && (this.image_id = args[7]);
        args.length >= 9 && (this.brief_description = args[8]);
        args.length >= 10 && (this.briefing = args[9]);
        args.length >= 11 && (this.enemy_id = args[10]);
        args.length >= 12 && (this.is_open_play = args[11]);
        args.length >= 13 && (this.open_play_scenario_id = args[12]);
        args.length >= 14 && (this.win_criteria = args[13]);
        args.length >= 15 && (this.empire = args[14]);
        args.length >= 16 && (this.requests = args[15]);
        args.length >= 17 && (this.demand_changes = args[16]);
        args.length >= 18 && (this.price_changes = args[17]);
        args.length >= 19 && (this.invasions = args[18]);
        args.length >= 20 && (this.earthquake = args[19]);
        args.length >= 21 && (this.emperor_change = args[20]);
        args.length >= 22 && (this.gladiator_revolt = args[21]);
        args.length >= 23 && (this.random_events = args[22]);
        args.length >= 24 && (this.map = args[23]);
        args.length >= 25 && (this.flotsam_enabled = args[24]);
        args.length >= 26 && (this.entry_point = args[25]);
        args.length >= 27 && (this.exit_point = args[26]);
        args.length >= 28 && (this.river_entry_point = args[27]);
        args.length >= 29 && (this.river_exit_point = args[28]);
        args.length >= 30 && (this.earthquake_point = args[29]);
        args.length >= 31 && (this.herd_points = args[30]);
        args.length >= 32 && (this.fishing_points = args[31]);
        args.length >= 33 && (this.invasion_points = args[32]);
        args.length >= 34 && (this.allowed_buildings = args[33]);
        args.length >= 35 && (this.native_images = args[34]);
        args.length >= 36 && (this.settings = args[35]);
        args.length >= 37 && (this.is_saved = args[36]);
    }
}
export let scenario: scenario_t = new scenario_t();
