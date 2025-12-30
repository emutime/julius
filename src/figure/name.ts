
import { buffer, buffer_read_i32, buffer_write_i32 } from 'core/buffer';
import { random_byte, random_generate_next } from 'core/random';
import { enemy_type, figure_type } from 'figure/type';
import FIGURE_EXPLOSION = figure_type.FIGURE_EXPLOSION;
import FIGURE_TAX_COLLECTOR = figure_type.FIGURE_TAX_COLLECTOR;
import FIGURE_ENGINEER = figure_type.FIGURE_ENGINEER;
import FIGURE_PREFECT = figure_type.FIGURE_PREFECT;
import FIGURE_FORT_JAVELIN = figure_type.FIGURE_FORT_JAVELIN;
import FIGURE_FORT_MOUNTED = figure_type.FIGURE_FORT_MOUNTED;
import FIGURE_FORT_LEGIONARY = figure_type.FIGURE_FORT_LEGIONARY;
import FIGURE_FORT_STANDARD = figure_type.FIGURE_FORT_STANDARD;
import FIGURE_ACTOR = figure_type.FIGURE_ACTOR;
import FIGURE_GLADIATOR = figure_type.FIGURE_GLADIATOR;
import FIGURE_LION_TAMER = figure_type.FIGURE_LION_TAMER;
import FIGURE_CHARIOTEER = figure_type.FIGURE_CHARIOTEER;
import FIGURE_TRADE_CARAVAN = figure_type.FIGURE_TRADE_CARAVAN;
import FIGURE_TRADE_SHIP = figure_type.FIGURE_TRADE_SHIP;
import FIGURE_TRADE_CARAVAN_DONKEY = figure_type.FIGURE_TRADE_CARAVAN_DONKEY;
import FIGURE_FISHING_BOAT = figure_type.FIGURE_FISHING_BOAT;
import FIGURE_MARKET_TRADER = figure_type.FIGURE_MARKET_TRADER;
import FIGURE_PRIEST = figure_type.FIGURE_PRIEST;
import FIGURE_SCHOOL_CHILD = figure_type.FIGURE_SCHOOL_CHILD;
import FIGURE_TEACHER = figure_type.FIGURE_TEACHER;
import FIGURE_LIBRARIAN = figure_type.FIGURE_LIBRARIAN;
import FIGURE_BARBER = figure_type.FIGURE_BARBER;
import FIGURE_BATHHOUSE_WORKER = figure_type.FIGURE_BATHHOUSE_WORKER;
import FIGURE_DOCTOR = figure_type.FIGURE_DOCTOR;
import FIGURE_SURGEON = figure_type.FIGURE_SURGEON;
import FIGURE_WORKER = figure_type.FIGURE_WORKER;
import FIGURE_MARKET_BUYER = figure_type.FIGURE_MARKET_BUYER;
import FIGURE_PATRICIAN = figure_type.FIGURE_PATRICIAN;
import FIGURE_INDIGENOUS_NATIVE = figure_type.FIGURE_INDIGENOUS_NATIVE;
import FIGURE_TOWER_SENTRY = figure_type.FIGURE_TOWER_SENTRY;
import FIGURE_ENEMY43_SPEAR = figure_type.FIGURE_ENEMY43_SPEAR;
import FIGURE_ENEMY44_SWORD = figure_type.FIGURE_ENEMY44_SWORD;
import FIGURE_ENEMY45_SWORD = figure_type.FIGURE_ENEMY45_SWORD;
import FIGURE_ENEMY46_CAMEL = figure_type.FIGURE_ENEMY46_CAMEL;
import FIGURE_ENEMY47_ELEPHANT = figure_type.FIGURE_ENEMY47_ELEPHANT;
import FIGURE_ENEMY48_CHARIOT = figure_type.FIGURE_ENEMY48_CHARIOT;
import FIGURE_ENEMY49_FAST_SWORD = figure_type.FIGURE_ENEMY49_FAST_SWORD;
import FIGURE_ENEMY50_SWORD = figure_type.FIGURE_ENEMY50_SWORD;
import FIGURE_ENEMY51_SPEAR = figure_type.FIGURE_ENEMY51_SPEAR;
import FIGURE_ENEMY52_MOUNTED_ARCHER = figure_type.FIGURE_ENEMY52_MOUNTED_ARCHER;
import FIGURE_ENEMY53_AXE = figure_type.FIGURE_ENEMY53_AXE;
import FIGURE_ENEMY_CAESAR_JAVELIN = figure_type.FIGURE_ENEMY_CAESAR_JAVELIN;
import FIGURE_ENEMY_CAESAR_MOUNTED = figure_type.FIGURE_ENEMY_CAESAR_MOUNTED;
import FIGURE_ENEMY_CAESAR_LEGIONARY = figure_type.FIGURE_ENEMY_CAESAR_LEGIONARY;
import FIGURE_NATIVE_TRADER = figure_type.FIGURE_NATIVE_TRADER;
import FIGURE_CREATURE = figure_type.FIGURE_CREATURE;
import FIGURE_MISSIONARY = figure_type.FIGURE_MISSIONARY;
import FIGURE_FISH_GULLS = figure_type.FIGURE_FISH_GULLS;
import FIGURE_DELIVERY_BOY = figure_type.FIGURE_DELIVERY_BOY;
import FIGURE_HIPPODROME_HORSES = figure_type.FIGURE_HIPPODROME_HORSES;
import ENEMY_1_NUMIDIAN = enemy_type.ENEMY_1_NUMIDIAN;
import ENEMY_5_PERGAMUM = enemy_type.ENEMY_5_PERGAMUM;
import ENEMY_7_ETRUSCAN = enemy_type.ENEMY_7_ETRUSCAN;
import ENEMY_8_GREEK = enemy_type.ENEMY_8_GREEK;
import ENEMY_9_EGYPTIAN = enemy_type.ENEMY_9_EGYPTIAN;
import ENEMY_10_CARTHAGINIAN = enemy_type.ENEMY_10_CARTHAGINIAN;
export class unnamed5_8 {
    public citizen_male: number = 0;
    public patrician: number = 0;
    public citizen_female: number = 0;
    public tax_collector: number = 0;
    public engineer: number = 0;
    public prefect: number = 0;
    public javelin_thrower: number = 0;
    public cavalry: number = 0;
    public legionary: number = 0;
    public actor: number = 0;
    public gladiator: number = 0;
    public lion_tamer: number = 0;
    public charioteer: number = 0;
    public barbarian: number = 0;
    public enemy_greek: number = 0;
    public enemy_egyptian: number = 0;
    public enemy_arabian: number = 0;
    public trader: number = 0;
    public ship: number = 0;
    public warship: number = 0;
    public enemy_warship: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.citizen_male = args[0]);
        args.length >= 2 && (this.patrician = args[1]);
        args.length >= 3 && (this.citizen_female = args[2]);
        args.length >= 4 && (this.tax_collector = args[3]);
        args.length >= 5 && (this.engineer = args[4]);
        args.length >= 6 && (this.prefect = args[5]);
        args.length >= 7 && (this.javelin_thrower = args[6]);
        args.length >= 8 && (this.cavalry = args[7]);
        args.length >= 9 && (this.legionary = args[8]);
        args.length >= 10 && (this.actor = args[9]);
        args.length >= 11 && (this.gladiator = args[10]);
        args.length >= 12 && (this.lion_tamer = args[11]);
        args.length >= 13 && (this.charioteer = args[12]);
        args.length >= 14 && (this.barbarian = args[13]);
        args.length >= 15 && (this.enemy_greek = args[14]);
        args.length >= 16 && (this.enemy_egyptian = args[15]);
        args.length >= 17 && (this.enemy_arabian = args[16]);
        args.length >= 18 && (this.trader = args[17]);
        args.length >= 19 && (this.ship = args[18]);
        args.length >= 20 && (this.warship = args[19]);
        args.length >= 21 && (this.enemy_warship = args[20]);
    }
}
let data: unnamed5_8 = new unnamed5_8();
function init_name() {
    random_generate_next();
    return random_byte() & 0xf;
}
export function figure_name_init() {
    data.citizen_male = init_name();
    data.patrician = init_name();
    data.citizen_female = init_name();
    data.tax_collector = init_name();
    data.engineer = init_name();
    data.prefect = init_name();
    data.javelin_thrower = init_name();
    data.cavalry = init_name();
    data.legionary = init_name();
    data.actor = init_name();
    data.gladiator = init_name();
    data.lion_tamer = init_name();
    data.charioteer = init_name();
    data.barbarian = init_name();
    data.enemy_greek = init_name();
    data.enemy_egyptian = init_name();
    data.enemy_arabian = init_name();
    data.trader = init_name();
    data.ship = init_name();
    data.warship = init_name();
    data.enemy_warship = init_name();
}
function get_next_name(field_name: string, offset: number, max: number) {
    let field_value: number = (data as any)[field_name];
    let name: number = offset + field_value;
    field_value = field_value + 1;
    if (field_value >= max) {
        field_value = 0;
    }
    (data as any)[field_name] = field_value;
    return name;
}
export function figure_name_get(type: figure_type, enemy: enemy_type) {
    switch (type) {
        case FIGURE_TAX_COLLECTOR:
            return get_next_name("tax_collector", 132, 32);
        case FIGURE_ENGINEER:
            return get_next_name("engineer", 165, 32);
        case FIGURE_PREFECT:
        case FIGURE_TOWER_SENTRY:
            return get_next_name("prefect", 198, 32);
        case FIGURE_ACTOR:
            return get_next_name("actor", 330, 32);
        case FIGURE_GLADIATOR:
            return get_next_name("gladiator", 363, 32);
        case FIGURE_LION_TAMER:
            return get_next_name("lion_tamer", 396, 16);
        case FIGURE_CHARIOTEER:
            return get_next_name("charioteer", 413, 16);
        case FIGURE_TRADE_CARAVAN:
        case FIGURE_TRADE_CARAVAN_DONKEY:
            return get_next_name("trader", 562, 16);
        case FIGURE_TRADE_SHIP:
        case FIGURE_FISHING_BOAT:
            return get_next_name("ship", 579, 16);
        case FIGURE_MARKET_TRADER:
        case FIGURE_MARKET_BUYER:
        case FIGURE_BATHHOUSE_WORKER:
            return get_next_name("citizen_female", 99, 32);
        case FIGURE_SCHOOL_CHILD:
        case FIGURE_DELIVERY_BOY:
        case FIGURE_BARBER:
        case FIGURE_WORKER:
        default:
            return get_next_name("citizen_male", 1, 64)
        case FIGURE_PRIEST:
        case FIGURE_TEACHER:
        case FIGURE_MISSIONARY:
        case FIGURE_LIBRARIAN:
        case FIGURE_DOCTOR:
        case FIGURE_SURGEON:
        case FIGURE_PATRICIAN:
            return get_next_name("patrician", 66, 32);
        case FIGURE_FORT_JAVELIN:
        case FIGURE_ENEMY_CAESAR_JAVELIN:
            return get_next_name("javelin_thrower", 231, 32);
        case FIGURE_FORT_MOUNTED:
        case FIGURE_ENEMY_CAESAR_MOUNTED:
            return get_next_name("cavalry", 264, 32);
        case FIGURE_FORT_LEGIONARY:
        case FIGURE_ENEMY_CAESAR_LEGIONARY:
            return get_next_name("legionary", 297, 32);
        case FIGURE_INDIGENOUS_NATIVE:
        case FIGURE_NATIVE_TRADER:
            return get_next_name("barbarian", 430, 32);
        case FIGURE_ENEMY43_SPEAR:
        case FIGURE_ENEMY44_SWORD:
        case FIGURE_ENEMY45_SWORD:
        case FIGURE_ENEMY46_CAMEL:
        case FIGURE_ENEMY47_ELEPHANT:
        case FIGURE_ENEMY48_CHARIOT:
        case FIGURE_ENEMY49_FAST_SWORD:
        case FIGURE_ENEMY50_SWORD:
        case FIGURE_ENEMY51_SPEAR:
        case FIGURE_ENEMY52_MOUNTED_ARCHER:
        case FIGURE_ENEMY53_AXE:
            switch (enemy) {
                case ENEMY_8_GREEK:
                    return get_next_name("enemy_greek", 463, 32);
                case ENEMY_9_EGYPTIAN:
                    return get_next_name("enemy_egyptian", 496, 32);
                case ENEMY_1_NUMIDIAN:
                case ENEMY_5_PERGAMUM:
                case ENEMY_10_CARTHAGINIAN:
                    return get_next_name("enemy_arabian", 529, 32);
                case ENEMY_7_ETRUSCAN:
                    return get_next_name("prefect", 198, 32);
                default:
                    return get_next_name("barbarian", 430, 32)
            }
        case FIGURE_EXPLOSION:
        case FIGURE_FORT_STANDARD:
        case FIGURE_FISH_GULLS:
        case FIGURE_CREATURE:
        case FIGURE_HIPPODROME_HORSES:
            return 0;
    }
}
export function figure_name_save_state(buf: buffer) {
    buffer_write_i32(buf, data.citizen_male);
    buffer_write_i32(buf, data.patrician);
    buffer_write_i32(buf, data.citizen_female);
    buffer_write_i32(buf, data.tax_collector);
    buffer_write_i32(buf, data.engineer);
    buffer_write_i32(buf, data.prefect);
    buffer_write_i32(buf, data.javelin_thrower);
    buffer_write_i32(buf, data.cavalry);
    buffer_write_i32(buf, data.legionary);
    buffer_write_i32(buf, data.actor);
    buffer_write_i32(buf, data.gladiator);
    buffer_write_i32(buf, data.lion_tamer);
    buffer_write_i32(buf, data.charioteer);
    buffer_write_i32(buf, data.barbarian);
    buffer_write_i32(buf, data.enemy_greek);
    buffer_write_i32(buf, data.enemy_egyptian);
    buffer_write_i32(buf, data.enemy_arabian);
    buffer_write_i32(buf, data.trader);
    buffer_write_i32(buf, data.ship);
    buffer_write_i32(buf, data.warship);
    buffer_write_i32(buf, data.enemy_warship);
}
export function figure_name_load_state(buf: buffer) {
    data.citizen_male = buffer_read_i32(buf);
    data.patrician = buffer_read_i32(buf);
    data.citizen_female = buffer_read_i32(buf);
    data.tax_collector = buffer_read_i32(buf);
    data.engineer = buffer_read_i32(buf);
    data.prefect = buffer_read_i32(buf);
    data.javelin_thrower = buffer_read_i32(buf);
    data.cavalry = buffer_read_i32(buf);
    data.legionary = buffer_read_i32(buf);
    data.actor = buffer_read_i32(buf);
    data.gladiator = buffer_read_i32(buf);
    data.lion_tamer = buffer_read_i32(buf);
    data.charioteer = buffer_read_i32(buf);
    data.barbarian = buffer_read_i32(buf);
    data.enemy_greek = buffer_read_i32(buf);
    data.enemy_egyptian = buffer_read_i32(buf);
    data.enemy_arabian = buffer_read_i32(buf);
    data.trader = buffer_read_i32(buf);
    data.ship = buffer_read_i32(buf);
    data.warship = buffer_read_i32(buf);
    data.enemy_warship = buffer_read_i32(buf);
}
