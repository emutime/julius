
import { direction_type } from 'core/direction';;
import { calc_adjust_with_percentage } from 'core/calc';
import { set_tooltips } from 'game/settings';
import { set_difficulty } from 'game/settings';
import DIFFICULTY_VERY_EASY = set_difficulty.DIFFICULTY_VERY_EASY;
import DIFFICULTY_EASY = set_difficulty.DIFFICULTY_EASY;
import DIFFICULTY_NORMAL = set_difficulty.DIFFICULTY_NORMAL;
import { set_difficulty } from 'game/settings';
import { set_sound_type } from 'game/settings';
import { set_sound } from 'game/settings';
import { setting_difficulty } from 'game/settings';
export class unnamed6_14 {
    public money: number = 0;
    public enemies: number = 0;
    public starting_favor: number = 0;
    public sentiment: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.money = args[0]);
        args.length >= 2 && (this.enemies = args[1]);
        args.length >= 3 && (this.starting_favor = args[2]);
        args.length >= 4 && (this.sentiment = args[3]);
    }
}
let data: struct (unnamed struct at./ src / game / difficulty.c: 6: 14)[] = new Array().fill({
    { 300, 40, 70, 80}, // very easy
    { 200, 60, 60, 70}, // easy
    { 150, 80, 50, 60}, // normal
    { 100, 100, 50, 50}, // hard
    { 75, 120, 40, 40} // very hard
});
export function difficulty_starting_favor() {
    return data[setting_difficulty()].starting_favor;
}
export function difficulty_sentiment() {
    return data[setting_difficulty()].sentiment;
}
export function difficulty_adjust_money(money: number) {
    return calc_adjust_with_percentage(money, data[setting_difficulty()].money);
}
export function difficulty_adjust_enemies(enemies: number) {
    return calc_adjust_with_percentage(enemies, data[setting_difficulty()].enemies);
}
export function difficulty_adjust_wolf_attack(attack: number) {
    switch (setting_difficulty()) {
        case DIFFICULTY_VERY_EASY:
            return 2;
        case DIFFICULTY_EASY:
            return 4;
        case DIFFICULTY_NORMAL:
            return 6;
        default: return attack
    }
}
