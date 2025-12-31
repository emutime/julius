
import { scenario_campaign_rank } from 'scenario/property';
export class mission_id {
    public peaceful: number = 0;
    public military: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.peaceful = args[0]);
        args.length >= 2 && (this.military = args[1]);
    }
}
let MISSION_IDS = [
    new mission_id(0, 0),
    new mission_id(1, 1),
    new mission_id(2, 3),
    new mission_id(4, 5),
    new mission_id(6, 7),
    new mission_id(8, 9),
    new mission_id(10, 11),
    new mission_id(12, 13),
    new mission_id(14, 15),
    new mission_id(16, 17),
    new mission_id(18, 19),
    new mission_id(20, 21),
];
let RANK_CHOICE: number[] = [
    0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
];
export function game_mission_peaceful() {
    return MISSION_IDS[scenario_campaign_rank()].peaceful;
}
export function game_mission_military() {
    return MISSION_IDS[scenario_campaign_rank()].military;
}
export function game_mission_has_choice() {
    return RANK_CHOICE[scenario_campaign_rank()];
}
