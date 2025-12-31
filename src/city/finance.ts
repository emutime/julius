import { building, building_get, MAX_BUILDINGS } from 'building/building';
import { model_get_house } from 'building/model';
import { building_state, house_level } from 'building/type';
import { calc_adjust_with_percentage, calc_bound, calc_percentage } from 'core/calc';
import { difficulty_adjust_money } from 'game/difficulty';
import { resource_type } from 'game/resource';
import { game_time_month } from 'game/time';
import { city_data_t } from './data_private';
export const MAX_HOUSE_LEVELS = 20;
class income {
    public taxes: number = 0;
    public exports: number = 0;
    public donated: number = 0;
    public total: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.taxes = args[0]);
        args.length >= 2 && (this.exports = args[1]);
        args.length >= 3 && (this.donated = args[2]);
        args.length >= 4 && (this.total = args[3]);
    }
}
class expenses {
    public imports: number = 0;
    public wages: number = 0;
    public construction: number = 0;
    public interest: number = 0;
    public salary: number = 0;
    public sundries: number = 0;
    public tribute: number = 0;
    public total: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.imports = args[0]);
        args.length >= 2 && (this.wages = args[1]);
        args.length >= 3 && (this.construction = args[2]);
        args.length >= 4 && (this.interest = args[3]);
        args.length >= 5 && (this.salary = args[4]);
        args.length >= 6 && (this.sundries = args[5]);
        args.length >= 7 && (this.tribute = args[6]);
        args.length >= 8 && (this.total = args[7]);
    }
}
export class finance_overview {
    public income: income = null;
    public expenses: expenses = null;
    public net_in_out: number = 0;
    public balance: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.income = args[0]);
        args.length >= 2 && (this.expenses = args[1]);
        args.length >= 3 && (this.net_in_out = args[2]);
        args.length >= 4 && (this.balance = args[3]);
    }
}
import HOUSE_SMALL_VILLA = house_level.HOUSE_SMALL_VILLA;
import BUILDING_STATE_IN_USE = building_state.BUILDING_STATE_IN_USE;;
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
import RESOURCE_MAX_FOOD = resource_type.RESOURCE_MAX_FOOD;
export let city_data: city_data_t = new city_data_t();
export function city_finance_treasury() {
    return city_data.finance.treasury;
}
export function city_finance_out_of_money() {
    return city_data.finance.treasury <= -5000;
}
export function city_finance_tax_percentage() {
    return city_data.finance.tax_percentage;
}
export function city_finance_change_tax_percentage(change: number) {
    city_data.finance.tax_percentage = calc_bound(city_data.finance.tax_percentage + change, 0, 25);
}
export function city_finance_percentage_taxed_people() {
    return city_data.taxes.percentage_taxed_people;
}
export function city_finance_estimated_tax_income() {
    return city_data.finance.estimated_tax_income;
}
export function city_finance_estimated_wages() {
    return city_data.finance.estimated_wages;
}
export function city_finance_process_import(price: number) {
    city_data.finance.treasury -= price
    city_data.finance.this_year.expenses.imports += price
}
export function city_finance_process_export(price: number) {
    city_data.finance.treasury += price
    city_data.finance.this_year.income.exports += price
    if (city_data.religion.neptune_double_trade_active) {
        city_data.finance.treasury += price
        city_data.finance.this_year.income.exports += price
    }
}
export function city_finance_process_cheat() {
    if (city_data.finance.treasury < 5000) {
        city_data.finance.treasury += 1000
        city_data.finance.cheated_money += 1000
    }
}
export function city_finance_process_stolen(stolen: number) {
    city_data.finance.stolen_this_year += stolen
    city_finance_process_sundry(stolen);
}
export function city_finance_process_donation(amount: number) {
    city_data.finance.treasury += amount
    city_data.finance.this_year.income.donated += amount
}
export function city_finance_process_sundry(cost: number) {
    city_data.finance.treasury -= cost
    city_data.finance.this_year.expenses.sundries += cost
}
export function city_finance_process_construction(cost: number) {
    city_data.finance.treasury -= cost
    city_data.finance.this_year.expenses.construction += cost
}
export function city_finance_update_interest() {
    city_data.finance.this_year.expenses.interest = city_data.finance.interest_so_far;
}
export function city_finance_update_salary() {
    city_data.finance.this_year.expenses.salary = city_data.finance.salary_so_far;
}
export function city_finance_calculate_totals() {
    let this_year: finance_overview = city_data.finance.this_year;
    this_year.income.total =
        this_year.income.donated +
        this_year.income.taxes +
        this_year.income.exports;
    this_year.expenses.total =
        this_year.expenses.sundries +
        this_year.expenses.salary +
        this_year.expenses.interest +
        this_year.expenses.construction +
        this_year.expenses.wages +
        this_year.expenses.imports;
    let last_year: finance_overview = city_data.finance.last_year;
    last_year.net_in_out = last_year.income.total - last_year.expenses.total;
    this_year.net_in_out = this_year.income.total - this_year.expenses.total;
    this_year.balance = last_year.balance + this_year.net_in_out;
    this_year.expenses.tribute = 0;
}
export function city_finance_estimate_wages() {
    let monthly_wages: number = city_data.labor.wages * city_data.labor.workers_employed / 10 / 12;
    city_data.finance.this_year.expenses.wages = city_data.finance.wages_so_far;
    city_data.finance.estimated_wages = (12 - game_time_month()) * monthly_wages + city_data.finance.wages_so_far;
}
export function city_finance_estimate_taxes() {
    city_data.taxes.monthly.collected_plebs = 0;
    city_data.taxes.monthly.collected_patricians = 0;
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state == BUILDING_STATE_IN_USE && b.house_size && b.house_tax_coverage) {
            let is_patrician: boolean = b.subtype.house_level >= HOUSE_SMALL_VILLA;
            let trm: number = difficulty_adjust_money(
                model_get_house(b.subtype.house_level).tax_multiplier);
            if (is_patrician) {
                city_data.taxes.monthly.collected_patricians += b.house_population * trm
            } else {
                city_data.taxes.monthly.collected_plebs += b.house_population * trm
            }
        }
    }
    let monthly_patricians: number = calc_adjust_with_percentage(
        city_data.taxes.monthly.collected_patricians / 2,
        city_data.finance.tax_percentage);
    let monthly_plebs: number = calc_adjust_with_percentage(
        city_data.taxes.monthly.collected_plebs / 2,
        city_data.finance.tax_percentage);
    let estimated_rest_of_year: number = (12 - game_time_month()) * (monthly_patricians + monthly_plebs);
    city_data.finance.this_year.income.taxes =
        city_data.taxes.yearly.collected_plebs + city_data.taxes.yearly.collected_patricians;
    city_data.finance.estimated_tax_income = city_data.finance.this_year.income.taxes + estimated_rest_of_year;
}
function collect_monthly_taxes() {
    city_data.taxes.taxed_plebs = 0;
    city_data.taxes.taxed_patricians = 0;
    city_data.taxes.untaxed_plebs = 0;
    city_data.taxes.untaxed_patricians = 0;
    city_data.taxes.monthly.uncollected_plebs = 0;
    city_data.taxes.monthly.collected_plebs = 0;
    city_data.taxes.monthly.uncollected_patricians = 0;
    city_data.taxes.monthly.collected_patricians = 0;
    for (let i: number = 0; i < MAX_HOUSE_LEVELS; i++) {
        city_data.population.at_level[i] = 0;
    }
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state != BUILDING_STATE_IN_USE || !b.house_size) {
            continue
        }
        let is_patrician: boolean = b.subtype.house_level >= HOUSE_SMALL_VILLA;
        let population: number = b.house_population;
        let trm: number = difficulty_adjust_money(
            model_get_house(b.subtype.house_level).tax_multiplier);
        city_data.population.at_level[b.subtype.house_level] += population
        let tax: number = population * trm;
        if (b.house_tax_coverage) {
            if (is_patrician) {
                city_data.taxes.taxed_patricians += population
                city_data.taxes.monthly.collected_patricians += tax
            } else {
                city_data.taxes.taxed_plebs += population
                city_data.taxes.monthly.collected_plebs += tax
            }
            b.tax_income_or_storage += tax
        } else {
            if (is_patrician) {
                city_data.taxes.untaxed_patricians += population
                city_data.taxes.monthly.uncollected_patricians += tax
            } else {
                city_data.taxes.untaxed_plebs += population
                city_data.taxes.monthly.uncollected_plebs += tax
            }
        }
    }
    let collected_patricians: number = calc_adjust_with_percentage(
        city_data.taxes.monthly.collected_patricians / 2,
        city_data.finance.tax_percentage);
    let collected_plebs: number = calc_adjust_with_percentage(
        city_data.taxes.monthly.collected_plebs / 2,
        city_data.finance.tax_percentage);
    let collected_total: number = collected_patricians + collected_plebs;
    city_data.taxes.yearly.collected_patricians += collected_patricians
    city_data.taxes.yearly.collected_plebs += collected_plebs
    city_data.taxes.yearly.uncollected_patricians += calc_adjust_with_percentage(
        city_data.taxes.monthly.uncollected_patricians / 2,
        city_data.finance.tax_percentage)
    city_data.taxes.yearly.uncollected_plebs += calc_adjust_with_percentage(
        city_data.taxes.monthly.uncollected_plebs / 2,
        city_data.finance.tax_percentage)
    city_data.finance.treasury += collected_total
    let total_patricians: number = city_data.taxes.taxed_patricians + city_data.taxes.untaxed_patricians;
    let total_plebs: number = city_data.taxes.taxed_plebs + city_data.taxes.untaxed_plebs;
    city_data.taxes.percentage_taxed_patricians = calc_percentage(city_data.taxes.taxed_patricians, total_patricians);
    city_data.taxes.percentage_taxed_plebs = calc_percentage(city_data.taxes.taxed_plebs, total_plebs);
    city_data.taxes.percentage_taxed_people = calc_percentage(
        city_data.taxes.taxed_patricians + city_data.taxes.taxed_plebs,
        total_patricians + total_plebs);
}
function pay_monthly_wages() {
    let wages: number = city_data.labor.wages * city_data.labor.workers_employed / 10 / 12;
    city_data.finance.treasury -= wages
    city_data.finance.wages_so_far += wages
    city_data.finance.wage_rate_paid_this_year += city_data.labor.wages
}
function pay_monthly_interest() {
    if (city_data.finance.treasury < 0) {
        let interest: number = calc_adjust_with_percentage(-city_data.finance.treasury, 10) / 12;
        city_data.finance.treasury -= interest
        city_data.finance.interest_so_far += interest
    }
}
function pay_monthly_salary() {
    if (!city_finance_out_of_money()) {
        city_data.finance.salary_so_far += city_data.emperor.salary_amount
        city_data.emperor.personal_savings += city_data.emperor.salary_amount
        city_data.finance.treasury -= city_data.emperor.salary_amount
    }
}
export function city_finance_handle_month_change() {
    collect_monthly_taxes();
    pay_monthly_wages();
    pay_monthly_interest();
    pay_monthly_salary();
}
function reset_taxes() {
    city_data.finance.last_year.income.taxes =
        city_data.taxes.yearly.collected_plebs + city_data.taxes.yearly.collected_patricians;
    city_data.taxes.yearly.collected_plebs = 0;
    city_data.taxes.yearly.collected_patricians = 0;
    city_data.taxes.yearly.uncollected_plebs = 0;
    city_data.taxes.yearly.uncollected_patricians = 0;
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state == BUILDING_STATE_IN_USE && b.house_size) {
            b.tax_income_or_storage = 0;
        }
    }
}
function copy_amounts_to_last_year() {
    let last_year: finance_overview = city_data.finance.last_year;
    let this_year: finance_overview = city_data.finance.this_year;
    last_year.expenses.wages = city_data.finance.wages_so_far;
    city_data.finance.wages_so_far = 0;
    city_data.finance.wage_rate_paid_last_year = city_data.finance.wage_rate_paid_this_year;
    city_data.finance.wage_rate_paid_this_year = 0;
    last_year.income.exports = this_year.income.exports;
    this_year.income.exports = 0;
    last_year.expenses.imports = this_year.expenses.imports;
    this_year.expenses.imports = 0;
    last_year.expenses.construction = this_year.expenses.construction;
    this_year.expenses.construction = 0;
    last_year.expenses.interest = city_data.finance.interest_so_far;
    city_data.finance.interest_so_far = 0;
    city_data.finance.last_year.expenses.salary = city_data.finance.salary_so_far;
    city_data.finance.salary_so_far = 0;
    last_year.expenses.sundries = this_year.expenses.sundries;
    this_year.expenses.sundries = 0;
    city_data.finance.stolen_last_year = city_data.finance.stolen_this_year;
    city_data.finance.stolen_this_year = 0;
    last_year.income.donated = this_year.income.donated;
    this_year.income.donated = 0;
}
function pay_tribute() {
    let last_year: finance_overview = city_data.finance.last_year;
    let income: number = last_year.income.donated +
        last_year.income.taxes +
        last_year.income.exports;
    let expenses: number = last_year.expenses.sundries +
        last_year.expenses.salary +
        last_year.expenses.interest +
        last_year.expenses.construction +
        last_year.expenses.wages +
        last_year.expenses.imports;
    city_data.finance.tribute_not_paid_last_year = 0;
    if (city_data.finance.treasury <= 0) {
        city_data.finance.tribute_not_paid_last_year = 1;
        city_data.finance.tribute_not_paid_total_years++;
        last_year.expenses.tribute = 0;
    } else if (income <= expenses) {
        city_data.finance.tribute_not_paid_total_years = 0;
        if (city_data.population.population > 2000) {
            last_year.expenses.tribute = 200;
        } else if (city_data.population.population > 1000) {
            last_year.expenses.tribute = 100;
        } else {
            last_year.expenses.tribute = 0;
        }
    } else {
        city_data.finance.tribute_not_paid_total_years = 0;
        if (city_data.population.population > 5000) {
            last_year.expenses.tribute = 500;
        } else if (city_data.population.population > 3000) {
            last_year.expenses.tribute = 400;
        } else if (city_data.population.population > 2000) {
            last_year.expenses.tribute = 300;
        } else if (city_data.population.population > 1000) {
            last_year.expenses.tribute = 225;
        } else if (city_data.population.population > 500) {
            last_year.expenses.tribute = 150;
        } else {
            last_year.expenses.tribute = 50;
        }
        let pct_profit: number = calc_adjust_with_percentage(income - expenses, 25);
        if (pct_profit > last_year.expenses.tribute) {
            last_year.expenses.tribute = pct_profit;
        }
    }
    city_data.finance.treasury -= last_year.expenses.tribute
    city_data.finance.this_year.expenses.tribute = 0;
    last_year.balance = city_data.finance.treasury;
    last_year.income.total = income;
    last_year.expenses.total = last_year.expenses.tribute + expenses;
}
export function city_finance_handle_year_change() {
    reset_taxes();
    copy_amounts_to_last_year();
    pay_tribute();
}
export function city_finance_overview_last_year() {
    return city_data.finance.last_year;
}
export function city_finance_overview_this_year() {
    return city_data.finance.this_year;
}
