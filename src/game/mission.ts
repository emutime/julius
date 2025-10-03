
;
import { scenario_climate } from 'scenario/property';
import { scenario_campaign_rank } from 'scenario/property';
export class unnamed5_14 {
    public peaceful: number = 0;
    public military: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.peaceful = args[0]);
        args.length >= 2 && (this.military = args[1]);
    }
}
let MISSION_IDS: struct (unnamed struct at./ src / game / mission.c: 5: 14)[] = new Array(12).fill({
    { 0, 0},
    { 1, 1},
    { 2, 3},
    { 4, 5},
    { 6, 7},
    { 8, 9},
    { 10, 11},
    { 12, 13},
    { 14, 15},
    { 16, 17},
    { 18, 19},
    { 20, 21},
});
let RANK_CHOICE: number[] = new Array().fill({
    0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
});
export function game_mission_peaceful() {
    return MISSION_IDS[scenario_campaign_rank()].peaceful;
}
export function game_mission_military() {
    return MISSION_IDS[scenario_campaign_rank()].military;
}
export function game_mission_has_choice() {
    return RANK_CHOICE[scenario_campaign_rank()];
}
