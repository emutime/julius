import { emperor_gift } from 'city/emperor';
import { finance_overview } from 'city/finance';
import { house_demands } from 'city/houses';
import { labor_category_data } from 'city/labor';
import { resource_type } from 'game/resource';
import { map_point, map_tile } from 'map/point';
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
import RESOURCE_MAX_FOOD = resource_type.RESOURCE_MAX_FOOD;
export class god_status {
    public happiness: number = 0;
    public target_happiness: number = 0;
    public wrath_bolts: number = 0;
    public blessing_done: number = 0;
    public small_curse_done: number = 0;
    public months_since_festival: number = 0;
    public unused1: number = 0;
    public unused2: number = 0;
    public unused3: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.happiness = args[0]);
        args.length >= 2 && (this.target_happiness = args[1]);
        args.length >= 3 && (this.wrath_bolts = args[2]);
        args.length >= 4 && (this.blessing_done = args[3]);
        args.length >= 5 && (this.small_curse_done = args[4]);
        args.length >= 6 && (this.months_since_festival = args[5]);
        args.length >= 7 && (this.unused1 = args[6]);
        args.length >= 8 && (this.unused2 = args[7]);
        args.length >= 9 && (this.unused3 = args[8]);
    }
}
class building {
    public senate_placed: number = 0;
    public senate_x: number = 0;
    public senate_y: number = 0;
    public senate_grid_offset: number = 0;
    public senate_building_id: number = 0;
    public hippodrome_placed: number = 0;
    public barracks_x: number = 0;
    public barracks_y: number = 0;
    public barracks_grid_offset: number = 0;
    public barracks_building_id: number = 0;
    public barracks_placed: number = 0;
    public distribution_center_x: number = 0;
    public distribution_center_y: number = 0;
    public distribution_center_grid_offset: number = 0;
    public distribution_center_building_id: number = 0;
    public distribution_center_placed: number = 0;
    public trade_center_building_id: number = 0;
    public triumphal_arches_available: number = 0;
    public triumphal_arches_placed: number = 0;
    public working_wharfs: number = 0;
    public shipyard_boats_requested: number = 0;
    public working_docks: number = 0;
    public working_dock_ids: number[] = new Array(10).fill(0);
    public mission_post_operational: number = 0;
    public main_native_meeting: map_point = null;
    public unknown_value: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.senate_placed = args[0]);
        args.length >= 2 && (this.senate_x = args[1]);
        args.length >= 3 && (this.senate_y = args[2]);
        args.length >= 4 && (this.senate_grid_offset = args[3]);
        args.length >= 5 && (this.senate_building_id = args[4]);
        args.length >= 6 && (this.hippodrome_placed = args[5]);
        args.length >= 7 && (this.barracks_x = args[6]);
        args.length >= 8 && (this.barracks_y = args[7]);
        args.length >= 9 && (this.barracks_grid_offset = args[8]);
        args.length >= 10 && (this.barracks_building_id = args[9]);
        args.length >= 11 && (this.barracks_placed = args[10]);
        args.length >= 12 && (this.distribution_center_x = args[11]);
        args.length >= 13 && (this.distribution_center_y = args[12]);
        args.length >= 14 && (this.distribution_center_grid_offset = args[13]);
        args.length >= 15 && (this.distribution_center_building_id = args[14]);
        args.length >= 16 && (this.distribution_center_placed = args[15]);
        args.length >= 17 && (this.trade_center_building_id = args[16]);
        args.length >= 18 && (this.triumphal_arches_available = args[17]);
        args.length >= 19 && (this.triumphal_arches_placed = args[18]);
        args.length >= 20 && (this.working_wharfs = args[19]);
        args.length >= 21 && (this.shipyard_boats_requested = args[20]);
        args.length >= 22 && (this.working_docks = args[21]);
        args.length >= 23 && (this.working_dock_ids = args[22]);
        args.length >= 24 && (this.mission_post_operational = args[23]);
        args.length >= 25 && (this.main_native_meeting = args[24]);
        args.length >= 26 && (this.unknown_value = args[25]);
    }
}
class figure {
    public animals: number = 0;
    public attacking_natives: number = 0;
    public enemies: number = 0;
    public imperial_soldiers: number = 0;
    public rioters: number = 0;
    public soldiers: number = 0;
    public security_breach_duration: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.animals = args[0]);
        args.length >= 2 && (this.attacking_natives = args[1]);
        args.length >= 3 && (this.enemies = args[2]);
        args.length >= 4 && (this.imperial_soldiers = args[3]);
        args.length >= 5 && (this.rioters = args[4]);
        args.length >= 6 && (this.soldiers = args[5]);
        args.length >= 7 && (this.security_breach_duration = args[6]);
    }
}
class invasion {
    public count: number = 0;
    public size: number = 0;
    public soldiers_killed: number = 0;
    public warnings_given: number = 0;
    public days_until_invasion: number = 0;
    public duration_day_countdown: number = 0;
    public retreat_message_shown: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.count = args[0]);
        args.length >= 2 && (this.size = args[1]);
        args.length >= 3 && (this.soldiers_killed = args[2]);
        args.length >= 4 && (this.warnings_given = args[3]);
        args.length >= 5 && (this.days_until_invasion = args[4]);
        args.length >= 6 && (this.duration_day_countdown = args[5]);
        args.length >= 7 && (this.retreat_message_shown = args[6]);
    }
}
class emperor {
    public gifts: emperor_gift[] = new Array(3).fill(null);
    public selected_gift_size: number = 0;
    public months_since_gift: number = 0;
    public gift_overdose_penalty: number = 0;
    public debt_state: number = 0;
    public months_in_debt: number = 0;
    public player_rank: number = 0;
    public salary_rank: number = 0;
    public salary_amount: number = 0;
    public donate_amount: number = 0;
    public personal_savings: number = 0;
    public invasion: invasion = null;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.gifts = args[0]);
        args.length >= 2 && (this.selected_gift_size = args[1]);
        args.length >= 3 && (this.months_since_gift = args[2]);
        args.length >= 4 && (this.gift_overdose_penalty = args[3]);
        args.length >= 5 && (this.debt_state = args[4]);
        args.length >= 6 && (this.months_in_debt = args[5]);
        args.length >= 7 && (this.player_rank = args[6]);
        args.length >= 8 && (this.salary_rank = args[7]);
        args.length >= 9 && (this.salary_amount = args[8]);
        args.length >= 10 && (this.donate_amount = args[9]);
        args.length >= 11 && (this.personal_savings = args[10]);
        args.length >= 12 && (this.invasion = args[11]);
    }
}
class military {
    public total_legions: number = 0;
    public total_soldiers: number = 0;
    public empire_service_legions: number = 0;
    public legionary_legions: number = 0;
    public native_attack_duration: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.total_legions = args[0]);
        args.length >= 2 && (this.total_soldiers = args[1]);
        args.length >= 3 && (this.empire_service_legions = args[2]);
        args.length >= 4 && (this.legionary_legions = args[3]);
        args.length >= 5 && (this.native_attack_duration = args[4]);
    }
}
class distant_battle {
    public city: number = 0;
    public city_foreign_months_left: number = 0;
    public total_count: number = 0;
    public won_count: number = 0;
    public enemy_strength: number = 0;
    public roman_strength: number = 0;
    public months_until_battle: number = 0;
    public roman_months_to_travel_forth: number = 0;
    public roman_months_to_travel_back: number = 0;
    public enemy_months_traveled: number = 0;
    public roman_months_traveled: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.city = args[0]);
        args.length >= 2 && (this.city_foreign_months_left = args[1]);
        args.length >= 3 && (this.total_count = args[2]);
        args.length >= 4 && (this.won_count = args[3]);
        args.length >= 5 && (this.enemy_strength = args[4]);
        args.length >= 6 && (this.roman_strength = args[5]);
        args.length >= 7 && (this.months_until_battle = args[6]);
        args.length >= 8 && (this.roman_months_to_travel_forth = args[7]);
        args.length >= 9 && (this.roman_months_to_travel_back = args[8]);
        args.length >= 10 && (this.enemy_months_traveled = args[9]);
        args.length >= 11 && (this.roman_months_traveled = args[10]);
    }
}
class finance {
    public treasury: number = 0;
    public tax_percentage: number = 0;
    public estimated_tax_income: number = 0;
    public estimated_wages: number = 0;
    public last_year: finance_overview = null;
    public this_year: finance_overview = null;
    public interest_so_far: number = 0;
    public salary_so_far: number = 0;
    public wages_so_far: number = 0;
    public stolen_this_year: number = 0;
    public stolen_last_year: number = 0;
    public cheated_money: number = 0;
    public tribute_not_paid_last_year: number = 0;
    public tribute_not_paid_total_years: number = 0;
    public wage_rate_paid_this_year: number = 0;
    public wage_rate_paid_last_year: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.treasury = args[0]);
        args.length >= 2 && (this.tax_percentage = args[1]);
        args.length >= 3 && (this.estimated_tax_income = args[2]);
        args.length >= 4 && (this.estimated_wages = args[3]);
        args.length >= 5 && (this.last_year = args[4]);
        args.length >= 6 && (this.this_year = args[5]);
        args.length >= 7 && (this.interest_so_far = args[6]);
        args.length >= 8 && (this.salary_so_far = args[7]);
        args.length >= 9 && (this.wages_so_far = args[8]);
        args.length >= 10 && (this.stolen_this_year = args[9]);
        args.length >= 11 && (this.stolen_last_year = args[10]);
        args.length >= 12 && (this.cheated_money = args[11]);
        args.length >= 13 && (this.tribute_not_paid_last_year = args[12]);
        args.length >= 14 && (this.tribute_not_paid_total_years = args[13]);
        args.length >= 15 && (this.wage_rate_paid_this_year = args[14]);
        args.length >= 16 && (this.wage_rate_paid_last_year = args[15]);
    }
}
class yearly {
    public collected_plebs: number = 0;
    public collected_patricians: number = 0;
    public uncollected_plebs: number = 0;
    public uncollected_patricians: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.collected_plebs = args[0]);
        args.length >= 2 && (this.collected_patricians = args[1]);
        args.length >= 3 && (this.uncollected_plebs = args[2]);
        args.length >= 4 && (this.uncollected_patricians = args[3]);
    }
}
class monthlyTaxes {
    public collected_plebs: number = 0;
    public collected_patricians: number = 0;
    public uncollected_plebs: number = 0;
    public uncollected_patricians: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.collected_plebs = args[0]);
        args.length >= 2 && (this.collected_patricians = args[1]);
        args.length >= 3 && (this.uncollected_plebs = args[2]);
        args.length >= 4 && (this.uncollected_patricians = args[3]);
    }
}
class taxes {
    public taxed_plebs: number = 0;
    public taxed_patricians: number = 0;
    public untaxed_plebs: number = 0;
    public untaxed_patricians: number = 0;
    public percentage_taxed_plebs: number = 0;
    public percentage_taxed_patricians: number = 0;
    public percentage_taxed_people: number = 0;
    public yearly: yearly = null;
    public monthly: monthlyTaxes = null;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.taxed_plebs = args[0]);
        args.length >= 2 && (this.taxed_patricians = args[1]);
        args.length >= 3 && (this.untaxed_plebs = args[2]);
        args.length >= 4 && (this.untaxed_patricians = args[3]);
        args.length >= 5 && (this.percentage_taxed_plebs = args[4]);
        args.length >= 6 && (this.percentage_taxed_patricians = args[5]);
        args.length >= 7 && (this.percentage_taxed_people = args[6]);
        args.length >= 8 && (this.yearly = args[7]);
        args.length >= 9 && (this.monthly = args[8]);
    }
}
class monthlyPopulation {
    public values: number[] = new Array(2400).fill(0);
    public next_index: number = 0;
    public count: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.values = args[0]);
        args.length >= 2 && (this.next_index = args[1]);
        args.length >= 3 && (this.count = args[2]);
    }
}
class population {
    public population: number = 0;
    public population_last_year: number = 0;
    public school_age: number = 0;
    public academy_age: number = 0;
    public working_age: number = 0;
    public monthly: monthlyPopulation = null;
    public at_age: number[] = new Array(100).fill(0);
    public at_level: number[] = new Array(20).fill(0);
    public yearly_update_requested: number = 0;
    public yearly_births: number = 0;
    public yearly_deaths: number = 0;
    public lost_removal: number = 0;
    public lost_homeless: number = 0;
    public lost_troop_request: number = 0;
    public last_change: number = 0;
    public total_all_years: number = 0;
    public total_years: number = 0;
    public average_per_year: number = 0;
    public highest_ever: number = 0;
    public total_capacity: number = 0;
    public room_in_houses: number = 0;
    public people_in_tents: number = 0;
    public people_in_tents_shacks: number = 0;
    public people_in_large_insula_and_above: number = 0;
    public people_in_villas_palaces: number = 0;
    public percentage_plebs: number = 0;
    public last_used_house_add: number = 0;
    public last_used_house_remove: number = 0;
    public graph_order: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.population = args[0]);
        args.length >= 2 && (this.population_last_year = args[1]);
        args.length >= 3 && (this.school_age = args[2]);
        args.length >= 4 && (this.academy_age = args[3]);
        args.length >= 5 && (this.working_age = args[4]);
        args.length >= 6 && (this.monthly = args[5]);
        args.length >= 7 && (this.at_age = args[6]);
        args.length >= 8 && (this.at_level = args[7]);
        args.length >= 9 && (this.yearly_update_requested = args[8]);
        args.length >= 10 && (this.yearly_births = args[9]);
        args.length >= 11 && (this.yearly_deaths = args[10]);
        args.length >= 12 && (this.lost_removal = args[11]);
        args.length >= 13 && (this.lost_homeless = args[12]);
        args.length >= 14 && (this.lost_troop_request = args[13]);
        args.length >= 15 && (this.last_change = args[14]);
        args.length >= 16 && (this.total_all_years = args[15]);
        args.length >= 17 && (this.total_years = args[16]);
        args.length >= 18 && (this.average_per_year = args[17]);
        args.length >= 19 && (this.highest_ever = args[18]);
        args.length >= 20 && (this.total_capacity = args[19]);
        args.length >= 21 && (this.room_in_houses = args[20]);
        args.length >= 22 && (this.people_in_tents = args[21]);
        args.length >= 23 && (this.people_in_tents_shacks = args[22]);
        args.length >= 24 && (this.people_in_large_insula_and_above = args[23]);
        args.length >= 25 && (this.people_in_villas_palaces = args[24]);
        args.length >= 26 && (this.percentage_plebs = args[25]);
        args.length >= 27 && (this.last_used_house_add = args[26]);
        args.length >= 28 && (this.last_used_house_remove = args[27]);
        args.length >= 29 && (this.graph_order = args[28]);
    }
}
class labor {
    public wages: number = 0;
    public wages_rome: number = 0;
    public workers_available: number = 0;
    public workers_employed: number = 0;
    public workers_unemployed: number = 0;
    public workers_needed: number = 0;
    public unemployment_percentage: number = 0;
    public unemployment_percentage_for_senate: number = 0;
    public categories: labor_category_data[] = new Array(10).fill(null);
    public constructor(...args: any[]) {
        args.length >= 1 && (this.wages = args[0]);
        args.length >= 2 && (this.wages_rome = args[1]);
        args.length >= 3 && (this.workers_available = args[2]);
        args.length >= 4 && (this.workers_employed = args[3]);
        args.length >= 5 && (this.workers_unemployed = args[4]);
        args.length >= 6 && (this.workers_needed = args[5]);
        args.length >= 7 && (this.unemployment_percentage = args[6]);
        args.length >= 8 && (this.unemployment_percentage_for_senate = args[7]);
        args.length >= 9 && (this.categories = args[8]);
    }
}
class migration {
    public immigration_duration: number = 0;
    public emigration_duration: number = 0;
    public immigration_amount_per_batch: number = 0;
    public emigration_amount_per_batch: number = 0;
    public immigration_queue_size: number = 0;
    public emigration_queue_size: number = 0;
    public immigrated_today: number = 0;
    public emigrated_today: number = 0;
    public refused_immigrants_today: number = 0;
    public no_immigration_cause: number = 0;
    public percentage: number = 0;
    public newcomers: number = 0;
    public emigration_message_shown: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.immigration_duration = args[0]);
        args.length >= 2 && (this.emigration_duration = args[1]);
        args.length >= 3 && (this.immigration_amount_per_batch = args[2]);
        args.length >= 4 && (this.emigration_amount_per_batch = args[3]);
        args.length >= 5 && (this.immigration_queue_size = args[4]);
        args.length >= 6 && (this.emigration_queue_size = args[5]);
        args.length >= 7 && (this.immigrated_today = args[6]);
        args.length >= 8 && (this.emigrated_today = args[7]);
        args.length >= 9 && (this.refused_immigrants_today = args[8]);
        args.length >= 10 && (this.no_immigration_cause = args[9]);
        args.length >= 11 && (this.percentage = args[10]);
        args.length >= 12 && (this.newcomers = args[11]);
        args.length >= 13 && (this.emigration_message_shown = args[12]);
    }
}
class sentiment {
    public value: number = 0;
    public previous_value: number = 0;
    public message_delay: number = 0;
    public include_tents: number = 0;
    public unemployment: number = 0;
    public wages: number = 0;
    public low_mood_cause: number = 0;
    public protesters: number = 0;
    public criminals: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.value = args[0]);
        args.length >= 2 && (this.previous_value = args[1]);
        args.length >= 3 && (this.message_delay = args[2]);
        args.length >= 4 && (this.include_tents = args[3]);
        args.length >= 5 && (this.unemployment = args[4]);
        args.length >= 6 && (this.wages = args[5]);
        args.length >= 7 && (this.low_mood_cause = args[6]);
        args.length >= 8 && (this.protesters = args[7]);
        args.length >= 9 && (this.criminals = args[8]);
    }
}
class health {
    public num_hospital_workers: number = 0;
    public target_value: number = 0;
    public value: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.num_hospital_workers = args[0]);
        args.length >= 2 && (this.target_value = args[1]);
        args.length >= 3 && (this.value = args[2]);
    }
}
class culture_points {
    public theater: number = 0;
    public religion: number = 0;
    public school: number = 0;
    public library: number = 0;
    public academy: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.theater = args[0]);
        args.length >= 2 && (this.religion = args[1]);
        args.length >= 3 && (this.school = args[2]);
        args.length >= 4 && (this.library = args[3]);
        args.length >= 5 && (this.academy = args[4]);
    }
}
class ratings {
    public culture: number = 0;
    public prosperity: number = 0;
    public peace: number = 0;
    public favor: number = 0;
    public culture_points: culture_points = null;
    public prosperity_treasury_last_year: number = 0;
    public prosperity_max: number = 0;
    public peace_destroyed_buildings: number = 0;
    public peace_years_of_peace: number = 0;
    public peace_num_criminals: number = 0;
    public peace_num_rioters: number = 0;
    public peace_riot_cause: number = 0;
    public favor_salary_penalty: number = 0;
    public favor_milestone_penalty: number = 0;
    public favor_ignored_request_penalty: number = 0;
    public favor_last_year: number = 0;
    public favor_change: number = 0;
    public selected: number = 0;
    public culture_explanation: number = 0;
    public prosperity_explanation: number = 0;
    public peace_explanation: number = 0;
    public favor_explanation: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.culture = args[0]);
        args.length >= 2 && (this.prosperity = args[1]);
        args.length >= 3 && (this.peace = args[2]);
        args.length >= 4 && (this.favor = args[3]);
        args.length >= 5 && (this.culture_points = args[4]);
        args.length >= 6 && (this.prosperity_treasury_last_year = args[5]);
        args.length >= 7 && (this.prosperity_max = args[6]);
        args.length >= 8 && (this.peace_destroyed_buildings = args[7]);
        args.length >= 9 && (this.peace_years_of_peace = args[8]);
        args.length >= 10 && (this.peace_num_criminals = args[9]);
        args.length >= 11 && (this.peace_num_rioters = args[10]);
        args.length >= 12 && (this.peace_riot_cause = args[11]);
        args.length >= 13 && (this.favor_salary_penalty = args[12]);
        args.length >= 14 && (this.favor_milestone_penalty = args[13]);
        args.length >= 15 && (this.favor_ignored_request_penalty = args[14]);
        args.length >= 16 && (this.favor_last_year = args[15]);
        args.length >= 17 && (this.favor_change = args[16]);
        args.length >= 18 && (this.selected = args[17]);
        args.length >= 19 && (this.culture_explanation = args[18]);
        args.length >= 20 && (this.prosperity_explanation = args[19]);
        args.length >= 21 && (this.peace_explanation = args[20]);
        args.length >= 22 && (this.favor_explanation = args[21]);
    }
}
class culture {
    public average_entertainment: number = 0;
    public average_religion: number = 0;
    public average_education: number = 0;
    public average_health: number = 0;
    public religion_coverage: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.average_entertainment = args[0]);
        args.length >= 2 && (this.average_religion = args[1]);
        args.length >= 3 && (this.average_education = args[2]);
        args.length >= 4 && (this.average_health = args[3]);
        args.length >= 5 && (this.religion_coverage = args[4]);
    }
}
class religion {
    public gods: god_status[] = new Array(5).fill(null);
    public least_happy_god: number = 0;
    public angry_message_delay: number = 0;
    public venus_curse_active: number = 0;
    public neptune_double_trade_active: number = 0;
    public neptune_sank_ships: number = 0;
    public mars_spirit_power: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.gods = args[0]);
        args.length >= 2 && (this.least_happy_god = args[1]);
        args.length >= 3 && (this.angry_message_delay = args[2]);
        args.length >= 4 && (this.venus_curse_active = args[3]);
        args.length >= 5 && (this.neptune_double_trade_active = args[4]);
        args.length >= 6 && (this.neptune_sank_ships = args[5]);
        args.length >= 7 && (this.mars_spirit_power = args[6]);
    }
}
class entertainment {
    public theater_shows: number = 0;
    public theater_no_shows_weighted: number = 0;
    public amphitheater_shows: number = 0;
    public amphitheater_no_shows_weighted: number = 0;
    public colosseum_shows: number = 0;
    public colosseum_no_shows_weighted: number = 0;
    public hippodrome_shows: number = 0;
    public hippodrome_no_shows_weighted: number = 0;
    public venue_needing_shows: number = 0;
    public hippodrome_has_race: number = 0;
    public hippodrome_message_shown: number = 0;
    public colosseum_message_shown: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.theater_shows = args[0]);
        args.length >= 2 && (this.theater_no_shows_weighted = args[1]);
        args.length >= 3 && (this.amphitheater_shows = args[2]);
        args.length >= 4 && (this.amphitheater_no_shows_weighted = args[3]);
        args.length >= 5 && (this.colosseum_shows = args[4]);
        args.length >= 6 && (this.colosseum_no_shows_weighted = args[5]);
        args.length >= 7 && (this.hippodrome_shows = args[6]);
        args.length >= 8 && (this.hippodrome_no_shows_weighted = args[7]);
        args.length >= 9 && (this.venue_needing_shows = args[8]);
        args.length >= 10 && (this.hippodrome_has_race = args[9]);
        args.length >= 11 && (this.hippodrome_message_shown = args[10]);
        args.length >= 12 && (this.colosseum_message_shown = args[11]);
    }
}
class planned {
    public months_to_go: number = 0;
    public god: number = 0;
    public size: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.months_to_go = args[0]);
        args.length >= 2 && (this.god = args[1]);
        args.length >= 3 && (this.size = args[2]);
    }
}
class selected {
    public god: number = 0;
    public size: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.god = args[0]);
        args.length >= 2 && (this.size = args[1]);
    }
}
class festival {
    public planned: planned = null;
    public selected: selected = null;
    public small_cost: number = 0;
    public large_cost: number = 0;
    public grand_cost: number = 0;
    public grand_wine: number = 0;
    public not_enough_wine: number = 0;
    public months_since_festival: number = 0;
    public first_festival_effect_months: number = 0;
    public second_festival_effect_months: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.planned = args[0]);
        args.length >= 2 && (this.selected = args[1]);
        args.length >= 3 && (this.small_cost = args[2]);
        args.length >= 4 && (this.large_cost = args[3]);
        args.length >= 5 && (this.grand_cost = args[4]);
        args.length >= 6 && (this.grand_wine = args[5]);
        args.length >= 7 && (this.not_enough_wine = args[6]);
        args.length >= 8 && (this.months_since_festival = args[7]);
        args.length >= 9 && (this.first_festival_effect_months = args[8]);
        args.length >= 10 && (this.second_festival_effect_months = args[9]);
    }
}
class granaries {
    public operating: number = 0;
    public not_operating: number = 0;
    public not_operating_with_food: number = 0;
    public understaffed: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.operating = args[0]);
        args.length >= 2 && (this.not_operating = args[1]);
        args.length >= 3 && (this.not_operating_with_food = args[2]);
        args.length >= 4 && (this.understaffed = args[3]);
    }
}
class resource {
    public space_in_warehouses: number[] = new Array(RESOURCE_MAX).fill(0);
    public stored_in_warehouses: number[] = new Array(RESOURCE_MAX).fill(0);
    public space_in_workshops: number[] = new Array(6).fill(0);
    public stored_in_workshops: number[] = new Array(6).fill(0);
    public trade_status: number[] = new Array(RESOURCE_MAX).fill(0);
    public export_over: number[] = new Array(RESOURCE_MAX).fill(0);
    public stockpiled: number[] = new Array(RESOURCE_MAX).fill(0);
    public mothballed: number[] = new Array(RESOURCE_MAX).fill(0);
    public wine_types_available: number = 0;
    public food_types_available: number = 0;
    public food_types_eaten: number = 0;
    public granary_food_stored: number[] = new Array(RESOURCE_MAX_FOOD).fill(0);
    public granary_total_stored: number = 0;
    public food_supply_months: number = 0;
    public food_needed_per_month: number = 0;
    public food_consumed_last_month: number = 0;
    public food_produced_last_month: number = 0;
    public food_produced_this_month: number = 0;
    public granaries: granaries = null;
    public last_used_warehouse: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.space_in_warehouses = args[0]);
        args.length >= 2 && (this.stored_in_warehouses = args[1]);
        args.length >= 3 && (this.space_in_workshops = args[2]);
        args.length >= 4 && (this.stored_in_workshops = args[3]);
        args.length >= 5 && (this.trade_status = args[4]);
        args.length >= 6 && (this.export_over = args[5]);
        args.length >= 7 && (this.stockpiled = args[6]);
        args.length >= 8 && (this.mothballed = args[7]);
        args.length >= 9 && (this.wine_types_available = args[8]);
        args.length >= 10 && (this.food_types_available = args[9]);
        args.length >= 11 && (this.food_types_eaten = args[10]);
        args.length >= 12 && (this.granary_food_stored = args[11]);
        args.length >= 13 && (this.granary_total_stored = args[12]);
        args.length >= 14 && (this.food_supply_months = args[13]);
        args.length >= 15 && (this.food_needed_per_month = args[14]);
        args.length >= 16 && (this.food_consumed_last_month = args[15]);
        args.length >= 17 && (this.food_produced_last_month = args[16]);
        args.length >= 18 && (this.food_produced_this_month = args[17]);
        args.length >= 19 && (this.granaries = args[18]);
        args.length >= 20 && (this.last_used_warehouse = args[19]);
    }
}
class sound {
    public march_enemy: number = 0;
    public march_horse: number = 0;
    public march_wolf: number = 0;
    public shoot_arrow: number = 0;
    public hit_soldier: number = 0;
    public hit_spear: number = 0;
    public hit_club: number = 0;
    public hit_elephant: number = 0;
    public hit_axe: number = 0;
    public hit_wolf: number = 0;
    public die_citizen: number = 0;
    public die_soldier: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.march_enemy = args[0]);
        args.length >= 2 && (this.march_horse = args[1]);
        args.length >= 3 && (this.march_wolf = args[2]);
        args.length >= 4 && (this.shoot_arrow = args[3]);
        args.length >= 5 && (this.hit_soldier = args[4]);
        args.length >= 6 && (this.hit_spear = args[5]);
        args.length >= 7 && (this.hit_club = args[6]);
        args.length >= 8 && (this.hit_elephant = args[7]);
        args.length >= 9 && (this.hit_axe = args[8]);
        args.length >= 10 && (this.hit_wolf = args[9]);
        args.length >= 11 && (this.die_citizen = args[10]);
        args.length >= 12 && (this.die_soldier = args[11]);
    }
}
class trade {
    public num_land_routes: number = 0;
    public num_sea_routes: number = 0;
    public land_trade_problem_duration: number = 0;
    public sea_trade_problem_duration: number = 0;
    public caravan_import_resource: number = 0;
    public caravan_backup_import_resource: number = 0;
    public docker_import_resource: number = 0;
    public docker_export_resource: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.num_land_routes = args[0]);
        args.length >= 2 && (this.num_sea_routes = args[1]);
        args.length >= 3 && (this.land_trade_problem_duration = args[2]);
        args.length >= 4 && (this.sea_trade_problem_duration = args[3]);
        args.length >= 5 && (this.caravan_import_resource = args[4]);
        args.length >= 6 && (this.caravan_backup_import_resource = args[5]);
        args.length >= 7 && (this.docker_import_resource = args[6]);
        args.length >= 8 && (this.docker_export_resource = args[7]);
    }
}
class largest_road_networks {
    public id: number = 0;
    public size: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.id = args[0]);
        args.length >= 2 && (this.size = args[1]);
    }
}
class map {
    public entry_point: map_tile = null;
    public exit_point: map_tile = null;
    public entry_flag: map_tile = null;
    public exit_flag: map_tile = null;
    public largest_road_networks: largest_road_networks[] = new Array(10).fill(null);
    public constructor(...args: any[]) {
        args.length >= 1 && (this.entry_point = args[0]);
        args.length >= 2 && (this.exit_point = args[1]);
        args.length >= 3 && (this.entry_flag = args[2]);
        args.length >= 4 && (this.exit_flag = args[3]);
        args.length >= 5 && (this.largest_road_networks = args[4]);
    }
}
class mission {
    public has_won: number = 0;
    public continue_months_left: number = 0;
    public continue_months_chosen: number = 0;
    public fired_message_shown: number = 0;
    public victory_message_shown: number = 0;
    public start_saved_game_written: number = 0;
    public tutorial_fire_message_shown: number = 0;
    public tutorial_disease_message_shown: number = 0;
    public tutorial_senate_built: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.has_won = args[0]);
        args.length >= 2 && (this.continue_months_left = args[1]);
        args.length >= 3 && (this.continue_months_chosen = args[2]);
        args.length >= 4 && (this.fired_message_shown = args[3]);
        args.length >= 5 && (this.victory_message_shown = args[4]);
        args.length >= 6 && (this.start_saved_game_written = args[5]);
        args.length >= 7 && (this.tutorial_fire_message_shown = args[6]);
        args.length >= 8 && (this.tutorial_disease_message_shown = args[7]);
        args.length >= 9 && (this.tutorial_senate_built = args[8]);
    }
}
class unused {
    public other_player: ArrayBuffer = new ArrayBuffer(18068);
    public unknown_00a0: number = 0;
    public unknown_00a1: number = 0;
    public unknown_00a2: number = 0;
    public unknown_00a3: number = 0;
    public unknown_00a4: number = 0;
    public unknown_00a6: number = 0;
    public unknown_00a7: number = 0;
    public unknown_00c0: number = 0;
    public unused_27d0: number = 0;
    public unknown_27e0: number[] = new Array(4).fill(0);
    public unknown_27f0: number = 0;
    public unknown_27f4: number[] = new Array(18).fill(0);
    public unknown_2828: number = 0;
    public unused_28ca: number = 0;
    public unknown_2924: number[] = new Array(272).fill(0);
    public unknown_2b6c: number = 0;
    public unknown_2c20: number[] = new Array(1400).fill(0);
    public houses_requiring_unknown_to_evolve: number[] = new Array(8).fill(0);
    public unknown_4238: number[] = new Array(4).fill(0);
    public unknown_4284: number = 0;
    public unknown_4294: number[] = new Array(2).fill(0);
    public unknown_4334: number = 0;
    public unknown_4374: number[] = new Array(2).fill(0);
    public unknown_439c: number[] = new Array(3).fill(0);
    public padding_43b2: number[] = new Array(2).fill(0);
    public unknown_43d8: number[] = new Array(5).fill(0);
    public unknown_43f0: number = 0;
    public unused_4454: number = 0;
    public unknown_446c: number[] = new Array(4).fill(0);
    public unused_4488: number = 0;
    public unused_native_force_attack: number = 0;
    public unused_44e0: number[] = new Array(2).fill(0);
    public unused_44ec: number = 0;
    public unused_44f8: number = 0;
    public unused_4524: number[] = new Array(11).fill(0);
    public unknown_458e: number = 0;
    public unused_45a5: number[] = new Array(6).fill(0);
    public unknown_464c: number[] = new Array(232).fill(0);
    public unknown_order: number = 0;
    public faction_id: number = 0;
    public faction_bytes: number[] = new Array(2).fill(0);
    public constructor(...args: any[]) {
        args.length >= 1 && (this.other_player = args[0]);
        args.length >= 2 && (this.unknown_00a0 = args[1]);
        args.length >= 3 && (this.unknown_00a1 = args[2]);
        args.length >= 4 && (this.unknown_00a2 = args[3]);
        args.length >= 5 && (this.unknown_00a3 = args[4]);
        args.length >= 6 && (this.unknown_00a4 = args[5]);
        args.length >= 7 && (this.unknown_00a6 = args[6]);
        args.length >= 8 && (this.unknown_00a7 = args[7]);
        args.length >= 9 && (this.unknown_00c0 = args[8]);
        args.length >= 10 && (this.unused_27d0 = args[9]);
        args.length >= 11 && (this.unknown_27e0 = args[10]);
        args.length >= 12 && (this.unknown_27f0 = args[11]);
        args.length >= 13 && (this.unknown_27f4 = args[12]);
        args.length >= 14 && (this.unknown_2828 = args[13]);
        args.length >= 15 && (this.unused_28ca = args[14]);
        args.length >= 16 && (this.unknown_2924 = args[15]);
        args.length >= 17 && (this.unknown_2b6c = args[16]);
        args.length >= 18 && (this.unknown_2c20 = args[17]);
        args.length >= 19 && (this.houses_requiring_unknown_to_evolve = args[18]);
        args.length >= 20 && (this.unknown_4238 = args[19]);
        args.length >= 21 && (this.unknown_4284 = args[20]);
        args.length >= 22 && (this.unknown_4294 = args[21]);
        args.length >= 23 && (this.unknown_4334 = args[22]);
        args.length >= 24 && (this.unknown_4374 = args[23]);
        args.length >= 25 && (this.unknown_439c = args[24]);
        args.length >= 26 && (this.padding_43b2 = args[25]);
        args.length >= 27 && (this.unknown_43d8 = args[26]);
        args.length >= 28 && (this.unknown_43f0 = args[27]);
        args.length >= 29 && (this.unused_4454 = args[28]);
        args.length >= 30 && (this.unknown_446c = args[29]);
        args.length >= 31 && (this.unused_4488 = args[30]);
        args.length >= 32 && (this.unused_native_force_attack = args[31]);
        args.length >= 33 && (this.unused_44e0 = args[32]);
        args.length >= 34 && (this.unused_44ec = args[33]);
        args.length >= 35 && (this.unused_44f8 = args[34]);
        args.length >= 36 && (this.unused_4524 = args[35]);
        args.length >= 37 && (this.unknown_458e = args[36]);
        args.length >= 38 && (this.unused_45a5 = args[37]);
        args.length >= 39 && (this.unknown_464c = args[38]);
        args.length >= 40 && (this.unknown_order = args[39]);
        args.length >= 41 && (this.faction_id = args[40]);
        args.length >= 42 && (this.faction_bytes = args[41]);
    }
}
export class city_data_t {
    public building: building = null;
    public figure: figure = null;
    public houses: house_demands = null;
    public emperor: emperor = null;
    public military: military = null;
    public distant_battle: distant_battle = null;
    public finance: finance = null;
    public taxes: taxes = null;
    public population: population = null;
    public labor: labor = null;
    public migration: migration = null;
    public sentiment: sentiment = null;
    public health: health = null;
    public ratings: ratings = null;
    public culture: culture = null;
    public religion: religion = null;
    public entertainment: entertainment = null;
    public festival: festival = null;
    public resource: resource = null;
    public sound: sound = null;
    public trade: trade = null;
    public map: map = null;
    public mission: mission = null;
    public unused: unused = null;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.building = args[0]);
        args.length >= 2 && (this.figure = args[1]);
        args.length >= 3 && (this.houses = args[2]);
        args.length >= 4 && (this.emperor = args[3]);
        args.length >= 5 && (this.military = args[4]);
        args.length >= 6 && (this.distant_battle = args[5]);
        args.length >= 7 && (this.finance = args[6]);
        args.length >= 8 && (this.taxes = args[7]);
        args.length >= 9 && (this.population = args[8]);
        args.length >= 10 && (this.labor = args[9]);
        args.length >= 11 && (this.migration = args[10]);
        args.length >= 12 && (this.sentiment = args[11]);
        args.length >= 13 && (this.health = args[12]);
        args.length >= 14 && (this.ratings = args[13]);
        args.length >= 15 && (this.culture = args[14]);
        args.length >= 16 && (this.religion = args[15]);
        args.length >= 17 && (this.entertainment = args[16]);
        args.length >= 18 && (this.festival = args[17]);
        args.length >= 19 && (this.resource = args[18]);
        args.length >= 20 && (this.sound = args[19]);
        args.length >= 21 && (this.trade = args[20]);
        args.length >= 22 && (this.map = args[21]);
        args.length >= 23 && (this.mission = args[22]);
        args.length >= 24 && (this.unused = args[23]);
    }
};
export let city_data: city_data_t = new city_data_t();
