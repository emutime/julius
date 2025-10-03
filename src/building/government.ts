import { building, building_get, MAX_BUILDINGS } from 'building/building';
import { building_count_active } from 'building/count';
import { building_state, building_type } from 'building/type';
import { city_finance_treasury } from 'city/finance';
import BUILDING_SENATE_1_UNUSED = building_type.BUILDING_SENATE_1_UNUSED;
import BUILDING_SENATE = building_type.BUILDING_SENATE;
import BUILDING_FORUM = building_type.BUILDING_FORUM;
import BUILDING_FORUM_2_UNUSED = building_type.BUILDING_FORUM_2_UNUSED;
import BUILDING_STATE_IN_USE = building_state.BUILDING_STATE_IN_USE;;
export function building_government_distribute_treasury() {
    let units: number = 5 * building_count_active(BUILDING_SENATE_1_UNUSED) +
        1 * building_count_active(BUILDING_FORUM) +
        8 * building_count_active(BUILDING_SENATE) +
        2 * building_count_active(BUILDING_FORUM_2_UNUSED);
    let amount_per_unit: number;
    let remainder: number;
    let treasury: number = city_finance_treasury();
    if (treasury > 0 && units > 0) {
        amount_per_unit = treasury / units;
        remainder = treasury - units * amount_per_unit;
    } else {
        amount_per_unit = 0;
        remainder = 0;
    }
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state != BUILDING_STATE_IN_USE || b.house_size) {
            continue
        }
        b.tax_income_or_storage = 0;
        if (b.num_workers <= 0) {
            continue
        }
        switch (b.type) {
            case BUILDING_SENATE:
                b.tax_income_or_storage = 8 * amount_per_unit + remainder;
                remainder = 0;
                break
            case BUILDING_SENATE_1_UNUSED:
                if (remainder && !building_count_active(BUILDING_SENATE)) {
                    b.tax_income_or_storage = 5 * amount_per_unit + remainder;
                    remainder = 0;
                } else {
                    b.tax_income_or_storage = 5 * amount_per_unit;
                }
                break
            case BUILDING_FORUM_2_UNUSED:
                if (remainder && !(
                    building_count_active(BUILDING_SENATE) ||
                    building_count_active(BUILDING_SENATE_1_UNUSED))) {
                    b.tax_income_or_storage = 2 * amount_per_unit + remainder;
                    remainder = 0;
                } else {
                    b.tax_income_or_storage = 2 * amount_per_unit;
                }
                break
            case BUILDING_FORUM:
                if (remainder && !(
                    building_count_active(BUILDING_SENATE) ||
                    building_count_active(BUILDING_SENATE_1_UNUSED) ||
                    building_count_active(BUILDING_FORUM_2_UNUSED))) {
                    b.tax_income_or_storage = amount_per_unit + remainder;
                    remainder = 0;
                } else {
                    b.tax_income_or_storage = amount_per_unit;
                }
                break
        }
    }
}
