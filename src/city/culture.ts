import { building, building_get, MAX_BUILDINGS } from 'building/building';
import { building_count_active, building_count_total } from 'building/count';
import { building_state, building_type } from 'building/type';
import { god_type } from 'city/constants';
import { city_entertainment_calculate_shows } from 'city/entertainment';
import { city_festival_calculate_costs } from 'city/festival';
import { city_population_academy_age, city_population_calculate_educational_age, city_population_school_age } from 'city/population';
import { buffer, buffer_read_i32, buffer_write_i32 } from 'core/buffer';
import { calc_percentage } from 'core/calc';
import { resource_type } from 'game/resource';
import { city_data_t } from './data_private';
import GOD_CERES = god_type.GOD_CERES;
import GOD_NEPTUNE = god_type.GOD_NEPTUNE;
import GOD_MERCURY = god_type.GOD_MERCURY;
import GOD_MARS = god_type.GOD_MARS;
import GOD_VENUS = god_type.GOD_VENUS;
import BUILDING_AMPHITHEATER = building_type.BUILDING_AMPHITHEATER;
import BUILDING_THEATER = building_type.BUILDING_THEATER;
import BUILDING_HIPPODROME = building_type.BUILDING_HIPPODROME;
import BUILDING_COLOSSEUM = building_type.BUILDING_COLOSSEUM;
import BUILDING_HOSPITAL = building_type.BUILDING_HOSPITAL;
import BUILDING_SCHOOL = building_type.BUILDING_SCHOOL;
import BUILDING_ACADEMY = building_type.BUILDING_ACADEMY;
import BUILDING_LIBRARY = building_type.BUILDING_LIBRARY;
import BUILDING_SMALL_TEMPLE_CERES = building_type.BUILDING_SMALL_TEMPLE_CERES;
import BUILDING_SMALL_TEMPLE_NEPTUNE = building_type.BUILDING_SMALL_TEMPLE_NEPTUNE;
import BUILDING_SMALL_TEMPLE_MERCURY = building_type.BUILDING_SMALL_TEMPLE_MERCURY;
import BUILDING_SMALL_TEMPLE_MARS = building_type.BUILDING_SMALL_TEMPLE_MARS;
import BUILDING_SMALL_TEMPLE_VENUS = building_type.BUILDING_SMALL_TEMPLE_VENUS;
import BUILDING_LARGE_TEMPLE_CERES = building_type.BUILDING_LARGE_TEMPLE_CERES;
import BUILDING_LARGE_TEMPLE_NEPTUNE = building_type.BUILDING_LARGE_TEMPLE_NEPTUNE;
import BUILDING_LARGE_TEMPLE_MERCURY = building_type.BUILDING_LARGE_TEMPLE_MERCURY;
import BUILDING_LARGE_TEMPLE_MARS = building_type.BUILDING_LARGE_TEMPLE_MARS;
import BUILDING_LARGE_TEMPLE_VENUS = building_type.BUILDING_LARGE_TEMPLE_VENUS;
import BUILDING_ORACLE = building_type.BUILDING_ORACLE;
import BUILDING_STATE_IN_USE = building_state.BUILDING_STATE_IN_USE;
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
import RESOURCE_MAX_FOOD = resource_type.RESOURCE_MAX_FOOD;
export let city_data: city_data_t = new city_data_t();
export class unnamed12_8 {
    public theater: number = 0;
    public amphitheater: number = 0;
    public colosseum: number = 0;
    public hippodrome: number = 0;
    public hospital: number = 0;
    public school: number = 0;
    public academy: number = 0;
    public library: number = 0;
    public religion: number[] = new Array(5).fill(0);
    public oracle: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.theater = args[0]);
        args.length >= 2 && (this.amphitheater = args[1]);
        args.length >= 3 && (this.colosseum = args[2]);
        args.length >= 4 && (this.hippodrome = args[3]);
        args.length >= 5 && (this.hospital = args[4]);
        args.length >= 6 && (this.school = args[5]);
        args.length >= 7 && (this.academy = args[6]);
        args.length >= 8 && (this.library = args[7]);
        args.length >= 9 && (this.religion = args[8]);
        args.length >= 10 && (this.oracle = args[9]);
    }
}
let coverage: unnamed12_8 = new unnamed12_8();
export function city_culture_coverage_theater() {
    return coverage.theater;
}
export function city_culture_coverage_amphitheater() {
    return coverage.amphitheater;
}
export function city_culture_coverage_colosseum() {
    return coverage.colosseum;
}
export function city_culture_coverage_hippodrome() {
    return coverage.hippodrome;
}
export function city_culture_coverage_average_entertainment() {
    return (coverage.hippodrome + coverage.colosseum + coverage.amphitheater + coverage.theater) / 4;
}
export function city_culture_coverage_religion(god: god_type) {
    return coverage.religion[god];
}
export function city_culture_coverage_school() {
    return coverage.school;
}
export function city_culture_coverage_library() {
    return coverage.library;
}
export function city_culture_coverage_academy() {
    return coverage.academy;
}
export function city_culture_coverage_hospital() {
    return coverage.hospital;
}
export function city_culture_average_education() {
    return city_data.culture.average_education;
}
export function city_culture_average_entertainment() {
    return city_data.culture.average_entertainment;
}
export function city_culture_average_health() {
    return city_data.culture.average_health;
}
function top(input: number) {
    return input > 100 ? 100 : input;
}
export function city_culture_update_coverage() {
    let population: number = city_data.population.population;
    coverage.theater = top(calc_percentage(500 * building_count_active(BUILDING_THEATER), population));
    coverage.amphitheater = top(calc_percentage(800 * building_count_active(BUILDING_AMPHITHEATER), population));
    coverage.colosseum = top(calc_percentage(1500 * building_count_active(BUILDING_COLOSSEUM), population));
    if (building_count_active(BUILDING_HIPPODROME) <= 0) {
        coverage.hippodrome = 0;
    } else {
        coverage.hippodrome = 100;
    }
    let oracles: number = building_count_total(BUILDING_ORACLE);
    coverage.religion[GOD_CERES] = top(calc_percentage(
        500 * oracles +
        750 * building_count_active(BUILDING_SMALL_TEMPLE_CERES) +
        1500 * building_count_active(BUILDING_LARGE_TEMPLE_CERES),
        population));
    coverage.religion[GOD_NEPTUNE] = top(calc_percentage(
        500 * oracles +
        750 * building_count_active(BUILDING_SMALL_TEMPLE_NEPTUNE) +
        1500 * building_count_active(BUILDING_LARGE_TEMPLE_NEPTUNE),
        population));
    coverage.religion[GOD_MERCURY] = top(calc_percentage(
        500 * oracles +
        750 * building_count_active(BUILDING_SMALL_TEMPLE_MERCURY) +
        1500 * building_count_active(BUILDING_LARGE_TEMPLE_MERCURY),
        population));
    coverage.religion[GOD_MARS] = top(calc_percentage(
        500 * oracles +
        750 * building_count_active(BUILDING_SMALL_TEMPLE_MARS) +
        1500 * building_count_active(BUILDING_LARGE_TEMPLE_MARS),
        population));
    coverage.religion[GOD_VENUS] = top(calc_percentage(
        500 * oracles +
        750 * building_count_active(BUILDING_SMALL_TEMPLE_VENUS) +
        1500 * building_count_active(BUILDING_LARGE_TEMPLE_VENUS),
        population));
    coverage.oracle = top(calc_percentage(500 * oracles, population));
    city_data.culture.religion_coverage =
        coverage.religion[GOD_CERES] +
        coverage.religion[GOD_NEPTUNE] +
        coverage.religion[GOD_MERCURY] +
        coverage.religion[GOD_MARS] +
        coverage.religion[GOD_VENUS];
    city_data.culture.religion_coverage /= 5
    city_population_calculate_educational_age();
    coverage.school = top(calc_percentage(
        75 * building_count_active(BUILDING_SCHOOL), city_population_school_age()));
    coverage.library = top(calc_percentage(
        800 * building_count_active(BUILDING_LIBRARY), population));
    coverage.academy = top(calc_percentage(
        100 * building_count_active(BUILDING_ACADEMY), city_population_academy_age()));
    coverage.hospital = top(calc_percentage(
        1000 * building_count_active(BUILDING_HOSPITAL), population));
}
export function city_culture_calculate() {
    city_data.culture.average_entertainment = 0;
    city_data.culture.average_religion = 0;
    city_data.culture.average_education = 0;
    city_data.culture.average_health = 0;
    let num_houses: number = 0;
    for (let i: number = 1; i < MAX_BUILDINGS; i++) {
        let b: building = building_get(i);
        if (b.state == BUILDING_STATE_IN_USE && b.house_size) {
            num_houses++;
            city_data.culture.average_entertainment += b.data.house.entertainment
            city_data.culture.average_religion += b.data.house.num_gods
            city_data.culture.average_education += b.data.house.education
            city_data.culture.average_health += b.data.house.health
        }
    }
    if (num_houses) {
        city_data.culture.average_entertainment /= num_houses
        city_data.culture.average_religion /= num_houses
        city_data.culture.average_education /= num_houses
        city_data.culture.average_health /= num_houses
    }
    city_entertainment_calculate_shows();
    city_festival_calculate_costs();
}
export function city_culture_save_state(buf: buffer) {
    buffer_write_i32(buf, coverage.theater);
    buffer_write_i32(buf, coverage.amphitheater);
    buffer_write_i32(buf, coverage.colosseum);
    buffer_write_i32(buf, coverage.hospital);
    buffer_write_i32(buf, coverage.hippodrome);
    for (let i: number = GOD_CERES; i <= GOD_VENUS; i++) {
        buffer_write_i32(buf, coverage.religion[i]);
    }
    buffer_write_i32(buf, coverage.oracle);
    buffer_write_i32(buf, coverage.school);
    buffer_write_i32(buf, coverage.library);
    buffer_write_i32(buf, coverage.academy);
    buffer_write_i32(buf, coverage.hospital);
}
export function city_culture_load_state(buf: buffer) {
    coverage.theater = buffer_read_i32(buf);
    coverage.amphitheater = buffer_read_i32(buf);
    coverage.colosseum = buffer_read_i32(buf);
    coverage.hospital = buffer_read_i32(buf);
    coverage.hippodrome = buffer_read_i32(buf);
    for (let i: number = GOD_CERES; i <= GOD_VENUS; i++) {
        coverage.religion[i] = buffer_read_i32(buf);
    }
    coverage.oracle = buffer_read_i32(buf);
    coverage.school = buffer_read_i32(buf);
    coverage.library = buffer_read_i32(buf);
    coverage.academy = buffer_read_i32(buf);
    coverage.hospital = buffer_read_i32(buf);
}
