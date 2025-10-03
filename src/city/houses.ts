
class missing {
    public well: number = 0;
    public fountain: number = 0;
    public entertainment: number = 0;
    public more_entertainment: number = 0;
    public education: number = 0;
    public more_education: number = 0;
    public religion: number = 0;
    public second_religion: number = 0;
    public third_religion: number = 0;
    public barber: number = 0;
    public bathhouse: number = 0;
    public clinic: number = 0;
    public hospital: number = 0;
    public food: number = 0;
    public second_wine: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.well = args[0]);
        args.length >= 2 && (this.fountain = args[1]);
        args.length >= 3 && (this.entertainment = args[2]);
        args.length >= 4 && (this.more_entertainment = args[3]);
        args.length >= 5 && (this.education = args[4]);
        args.length >= 6 && (this.more_education = args[5]);
        args.length >= 7 && (this.religion = args[6]);
        args.length >= 8 && (this.second_religion = args[7]);
        args.length >= 9 && (this.third_religion = args[8]);
        args.length >= 10 && (this.barber = args[9]);
        args.length >= 11 && (this.bathhouse = args[10]);
        args.length >= 12 && (this.clinic = args[11]);
        args.length >= 13 && (this.hospital = args[12]);
        args.length >= 14 && (this.food = args[13]);
        args.length >= 15 && (this.second_wine = args[14]);
    }
}
class requiring {
    public school: number = 0;
    public library: number = 0;
    public barber: number = 0;
    public bathhouse: number = 0;
    public clinic: number = 0;
    public religion: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.school = args[0]);
        args.length >= 2 && (this.library = args[1]);
        args.length >= 3 && (this.barber = args[2]);
        args.length >= 4 && (this.bathhouse = args[3]);
        args.length >= 5 && (this.clinic = args[4]);
        args.length >= 6 && (this.religion = args[5]);
    }
}
export class house_demands {
    public missing: missing = null;
    public requiring: requiring = null;
    public health: number = 0;
    public religion: number = 0;
    public education: number = 0;
    public entertainment: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.missing = args[0]);
        args.length >= 2 && (this.requiring = args[1]);
        args.length >= 3 && (this.health = args[2]);
        args.length >= 4 && (this.religion = args[3]);
        args.length >= 5 && (this.education = args[4]);
        args.length >= 6 && (this.entertainment = args[5]);
    }
};
import { resource_type } from 'game/resource';
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
import RESOURCE_MAX_FOOD = resource_type.RESOURCE_MAX_FOOD;
export let city_data: city_data_t = new city_data_t();
export function city_houses_reset_demands() {
    city_data.houses.missing.fountain = 0;
    city_data.houses.missing.well = 0;
    city_data.houses.missing.entertainment = 0;
    city_data.houses.missing.more_entertainment = 0;
    city_data.houses.missing.education = 0;
    city_data.houses.missing.more_education = 0;
    city_data.houses.missing.religion = 0;
    city_data.houses.missing.second_religion = 0;
    city_data.houses.missing.third_religion = 0;
    city_data.houses.missing.barber = 0;
    city_data.houses.missing.bathhouse = 0;
    city_data.houses.missing.clinic = 0;
    city_data.houses.missing.hospital = 0;
    city_data.houses.missing.food = 0;
    city_data.houses.requiring.school = 0;
    city_data.houses.requiring.library = 0;
    city_data.houses.requiring.barber = 0;
    city_data.houses.requiring.bathhouse = 0;
    city_data.houses.requiring.clinic = 0;
    city_data.houses.requiring.religion = 0;
}
export function city_houses_demands() {
    return city_data.houses;
}
export function city_houses_calculate_culture_demands() {
    city_data.houses.health = 0;
    let max: number = 0;
    if (city_data.houses.missing.bathhouse > max) {
        city_data.houses.health = 1;
        max = city_data.houses.missing.bathhouse;
    }
    if (city_data.houses.missing.barber > max) {
        city_data.houses.health = 2;
        max = city_data.houses.missing.barber;
    }
    if (city_data.houses.missing.clinic > max) {
        city_data.houses.health = 3;
        max = city_data.houses.missing.clinic;
    }
    if (city_data.houses.missing.hospital > max) {
        city_data.houses.health = 4;
    }
    city_data.houses.education = 0;
    if (city_data.houses.missing.more_education > city_data.houses.missing.education) {
        city_data.houses.education = 1;
    } else if (city_data.houses.missing.more_education < city_data.houses.missing.education) {
        city_data.houses.education = 2;
    } else if (city_data.houses.missing.more_education || city_data.houses.missing.education) {
        city_data.houses.education = 3;
    }
    city_data.houses.entertainment = 0;
    if (city_data.houses.missing.entertainment > city_data.houses.missing.more_entertainment) {
        city_data.houses.entertainment = 1;
    } else if (city_data.houses.missing.more_entertainment) {
        city_data.houses.entertainment = 2;
    }
    city_data.houses.religion = 0;
    max = 0;
    if (city_data.houses.missing.religion > max) {
        city_data.houses.religion = 1;
        max = city_data.houses.missing.religion;
    }
    if (city_data.houses.missing.second_religion > max) {
        city_data.houses.religion = 2;
        max = city_data.houses.missing.second_religion;
    }
    if (city_data.houses.missing.third_religion > max) {
        city_data.houses.religion = 3;
    }
}
