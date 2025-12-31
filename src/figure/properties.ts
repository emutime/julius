import { figure_type } from 'figure/type';
export const enum figure_category {
    FIGURE_CATEGORY_INACTIVE = 0,
    FIGURE_CATEGORY_CITIZEN = 1,
    FIGURE_CATEGORY_ARMED = 2,
    FIGURE_CATEGORY_HOSTILE = 3,
    FIGURE_CATEGORY_CRIMINAL = 4,
    FIGURE_CATEGORY_NATIVE = 5,
    FIGURE_CATEGORY_ANIMAL = 6
};
export class figure_properties {
    public category: figure_category = null;
    public max_damage: number = 0;
    public attack_value: number = 0;
    public defense_value: number = 0;
    public missile_defense_value: number = 0;
    public missile_attack_value: number = 0;
    public missile_delay: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.category = args[0]);
        args.length >= 2 && (this.max_damage = args[1]);
        args.length >= 3 && (this.attack_value = args[2]);
        args.length >= 4 && (this.defense_value = args[3]);
        args.length >= 5 && (this.missile_defense_value = args[4]);
        args.length >= 6 && (this.missile_attack_value = args[5]);
        args.length >= 7 && (this.missile_delay = args[6]);
    }
}
let properties: figure_properties[] = [
    //  cat  dmg  atk  def Mdef Matk Mfrq
    { category: 0, max_damage: 0, attack_value: 0, defense_value: 0, missile_defense_value: 0, missile_attack_value: 0, missile_delay: 0 },
    { category: 1, max_damage: 20, attack_value: 0, defense_value: 0, missile_defense_value: 0, missile_attack_value: 0, missile_delay: 0 },
    { category: 1, max_damage: 20, attack_value: 0, defense_value: 0, missile_defense_value: 0, missile_attack_value: 0, missile_delay: 0 },
    { category: 1, max_damage: 20, attack_value: 0, defense_value: 0, missile_defense_value: 0, missile_attack_value: 0, missile_delay: 0 },
    { category: 1, max_damage: 20, attack_value: 0, defense_value: 0, missile_defense_value: 0, missile_attack_value: 0, missile_delay: 0 },
    { category: 0, max_damage: 0, attack_value: 0, defense_value: 0, missile_defense_value: 0, missile_attack_value: 0, missile_delay: 0 },
    { category: 0, max_damage: 0, attack_value: 0, defense_value: 0, missile_defense_value: 0, missile_attack_value: 0, missile_delay: 0 },
    { category: 1, max_damage: 20, attack_value: 0, defense_value: 0, missile_defense_value: 0, missile_attack_value: 0, missile_delay: 0 },
    { category: 1, max_damage: 20, attack_value: 0, defense_value: 0, missile_defense_value: 0, missile_attack_value: 0, missile_delay: 0 },
    { category: 1, max_damage: 20, attack_value: 0, defense_value: 0, missile_defense_value: 0, missile_attack_value: 0, missile_delay: 0 },
    { category: 2, max_damage: 50, attack_value: 5, defense_value: 0, missile_defense_value: 0, missile_attack_value: 0, missile_delay: 0 },
    { category: 2, max_damage: 80, attack_value: 4, defense_value: 0, missile_defense_value: 0, missile_attack_value: 4, missile_delay: 100 },
    { category: 2, max_damage: 120, attack_value: 8, defense_value: 0, missile_defense_value: 0, missile_attack_value: 0, missile_delay: 0 },
    { category: 2, max_damage: 150, attack_value: 10, defense_value: 0, missile_defense_value: 0, missile_attack_value: 0, missile_delay: 0 },
    { category: 0, max_damage: 0, attack_value: 0, defense_value: 0, missile_defense_value: 0, missile_attack_value: 0, missile_delay: 0 },
    { category: 1, max_damage: 20, attack_value: 0, defense_value: 0, missile_defense_value: 0, missile_attack_value: 0, missile_delay: 0 },
    { category: 2, max_damage: 100, attack_value: 9, defense_value: 2, missile_defense_value: 0, missile_attack_value: 0, missile_delay: 0 },
    { category: 2, max_damage: 100, attack_value: 15, defense_value: 0, missile_defense_value: 0, missile_attack_value: 0, missile_delay: 0 },
    { category: 1, max_damage: 20, attack_value: 0, defense_value: 0, missile_defense_value: 0, missile_attack_value: 0, missile_delay: 0 },
    { category: 1, max_damage: 10, attack_value: 0, defense_value: 0, missile_defense_value: 0, missile_attack_value: 0, missile_delay: 0 },
    { category: 0, max_damage: 0, attack_value: 0, defense_value: 0, missile_defense_value: 0, missile_attack_value: 0, missile_delay: 0 },
    { category: 1, max_damage: 10, attack_value: 0, defense_value: 0, missile_defense_value: 0, missile_attack_value: 0, missile_delay: 0 },
    { category: 4, max_damage: 12, attack_value: 0, defense_value: 0, missile_defense_value: 0, missile_attack_value: 0, missile_delay: 0 },
    { category: 4, max_damage: 12, attack_value: 0, defense_value: 0, missile_defense_value: 0, missile_attack_value: 0, missile_delay: 0 },
    { category: 4, max_damage: 12, attack_value: 0, defense_value: 0, missile_defense_value: 0, missile_attack_value: 0, missile_delay: 0 },
    { category: 0, max_damage: 0, attack_value: 0, defense_value: 0, missile_defense_value: 0, missile_attack_value: 0, missile_delay: 0 },
    { category: 1, max_damage: 20, attack_value: 0, defense_value: 0, missile_defense_value: 0, missile_attack_value: 0, missile_delay: 0 },
    { category: 1, max_damage: 20, attack_value: 0, defense_value: 0, missile_defense_value: 0, missile_attack_value: 0, missile_delay: 0 },
    { category: 1, max_damage: 10, attack_value: 0, defense_value: 0, missile_defense_value: 0, missile_attack_value: 0, missile_delay: 0 },
    { category: 1, max_damage: 20, attack_value: 0, defense_value: 0, missile_defense_value: 0, missile_attack_value: 0, missile_delay: 0 },
    { category: 1, max_damage: 20, attack_value: 0, defense_value: 0, missile_defense_value: 0, missile_attack_value: 0, missile_delay: 0 },
    { category: 1, max_damage: 20, attack_value: 0, defense_value: 0, missile_defense_value: 0, missile_attack_value: 0, missile_delay: 0 },
    { category: 1, max_damage: 20, attack_value: 0, defense_value: 0, missile_defense_value: 0, missile_attack_value: 0, missile_delay: 0 },
    { category: 1, max_damage: 20, attack_value: 0, defense_value: 0, missile_defense_value: 0, missile_attack_value: 0, missile_delay: 0 },
    { category: 1, max_damage: 20, attack_value: 0, defense_value: 0, missile_defense_value: 0, missile_attack_value: 0, missile_delay: 0 },
    { category: 0, max_damage: 0, attack_value: 0, defense_value: 0, missile_defense_value: 0, missile_attack_value: 0, missile_delay: 0 },
    { category: 0, max_damage: 0, attack_value: 0, defense_value: 0, missile_defense_value: 0, missile_attack_value: 0, missile_delay: 0 },
    { category: 1, max_damage: 20, attack_value: 0, defense_value: 0, missile_defense_value: 0, missile_attack_value: 0, missile_delay: 0 },
    { category: 1, max_damage: 20, attack_value: 0, defense_value: 0, missile_defense_value: 0, missile_attack_value: 0, missile_delay: 0 },
    { category: 1, max_damage: 10, attack_value: 0, defense_value: 0, missile_defense_value: 0, missile_attack_value: 0, missile_delay: 0 },
    { category: 5, max_damage: 40, attack_value: 6, defense_value: 0, missile_defense_value: 0, missile_attack_value: 0, missile_delay: 0 },
    { category: 2, max_damage: 50, attack_value: 6, defense_value: 0, missile_defense_value: 0, missile_attack_value: 6, missile_delay: 50 },
    { category: 3, max_damage: 70, attack_value: 5, defense_value: 0, missile_defense_value: 0, missile_attack_value: 4, missile_delay: 70 },
    { category: 3, max_damage: 90, attack_value: 7, defense_value: 0, missile_defense_value: 0, missile_attack_value: 0, missile_delay: 0 },
    { category: 3, max_damage: 120, attack_value: 12, defense_value: 2, missile_defense_value: 2, missile_attack_value: 0, missile_delay: 0 },
    { category: 3, max_damage: 120, attack_value: 7, defense_value: 1, missile_defense_value: 0, missile_attack_value: 5, missile_delay: 70 },
    { category: 3, max_damage: 200, attack_value: 20, defense_value: 5, missile_defense_value: 8, missile_attack_value: 6, missile_delay: 70 },
    { category: 3, max_damage: 120, attack_value: 15, defense_value: 4, missile_defense_value: 4, missile_attack_value: 0, missile_delay: 0 },
    { category: 3, max_damage: 90, attack_value: 7, defense_value: 1, missile_defense_value: 0, missile_attack_value: 0, missile_delay: 0 },
    { category: 3, max_damage: 110, attack_value: 10, defense_value: 1, missile_defense_value: 2, missile_attack_value: 0, missile_delay: 0 },
    { category: 3, max_damage: 70, attack_value: 5, defense_value: 0, missile_defense_value: 0, missile_attack_value: 3, missile_delay: 100 },
    { category: 3, max_damage: 100, attack_value: 6, defense_value: 1, missile_defense_value: 0, missile_attack_value: 4, missile_delay: 70 },
    { category: 3, max_damage: 120, attack_value: 15, defense_value: 2, missile_defense_value: 3, missile_attack_value: 0, missile_delay: 0 },
    { category: 3, max_damage: 100, attack_value: 9, defense_value: 2, missile_defense_value: 0, missile_attack_value: 0, missile_delay: 0 },
    { category: 3, max_damage: 90, attack_value: 4, defense_value: 0, missile_defense_value: 0, missile_attack_value: 4, missile_delay: 100 },
    { category: 3, max_damage: 100, attack_value: 8, defense_value: 0, missile_defense_value: 0, missile_attack_value: 0, missile_delay: 0 },
    { category: 3, max_damage: 150, attack_value: 13, defense_value: 2, missile_defense_value: 0, missile_attack_value: 0, missile_delay: 0 },
    { category: 5, max_damage: 40, attack_value: 0, defense_value: 0, missile_defense_value: 0, missile_attack_value: 0, missile_delay: 0 },
    { category: 0, max_damage: 100, attack_value: 0, defense_value: 0, missile_defense_value: 0, missile_attack_value: 12, missile_delay: 0 },
    { category: 0, max_damage: 100, attack_value: 0, defense_value: 0, missile_defense_value: 0, missile_attack_value: 20, missile_delay: 0 },
    { category: 0, max_damage: 100, attack_value: 0, defense_value: 0, missile_defense_value: 0, missile_attack_value: 200, missile_delay: 0 },
    { category: 0, max_damage: 100, attack_value: 0, defense_value: 0, missile_defense_value: 0, missile_attack_value: 0, missile_delay: 200 },
    { category: 0, max_damage: 100, attack_value: 0, defense_value: 0, missile_defense_value: 0, missile_attack_value: 0, missile_delay: 0 },
    { category: 0, max_damage: 100, attack_value: 0, defense_value: 0, missile_defense_value: 0, missile_attack_value: 0, missile_delay: 0 },
    { category: 0, max_damage: 100, attack_value: 0, defense_value: 0, missile_defense_value: 0, missile_attack_value: 0, missile_delay: 0 },
    { category: 0, max_damage: 100, attack_value: 0, defense_value: 0, missile_defense_value: 0, missile_attack_value: 0, missile_delay: 0 },
    { category: 0, max_damage: 100, attack_value: 0, defense_value: 0, missile_defense_value: 0, missile_attack_value: 0, missile_delay: 0 },
    { category: 6, max_damage: 10, attack_value: 0, defense_value: 0, missile_defense_value: 0, missile_attack_value: 0, missile_delay: 0 },
    { category: 3, max_damage: 80, attack_value: 8, defense_value: 0, missile_defense_value: 0, missile_attack_value: 0, missile_delay: 0 },
    { category: 6, max_damage: 20, attack_value: 0, defense_value: 0, missile_defense_value: 0, missile_attack_value: 0, missile_delay: 0 },
    { category: 0, max_damage: 100, attack_value: 0, defense_value: 0, missile_defense_value: 0, missile_attack_value: 10, missile_delay: 0 },
    { category: 0, max_damage: 100, attack_value: 0, defense_value: 0, missile_defense_value: 0, missile_attack_value: 0, missile_delay: 0 },
    { category: 0, max_damage: 100, attack_value: 0, defense_value: 0, missile_defense_value: 0, missile_attack_value: 0, missile_delay: 0 },
    { category: 0, max_damage: 100, attack_value: 0, defense_value: 0, missile_defense_value: 0, missile_attack_value: 0, missile_delay: 0 },
    { category: 0, max_damage: 100, attack_value: 0, defense_value: 0, missile_defense_value: 0, missile_attack_value: 0, missile_delay: 0 },
    { category: 0, max_damage: 100, attack_value: 0, defense_value: 0, missile_defense_value: 0, missile_attack_value: 0, missile_delay: 0 },
    { category: 0, max_damage: 100, attack_value: 0, defense_value: 0, missile_defense_value: 0, missile_attack_value: 0, missile_delay: 0 }
];
export function figure_properties_for_type(type: figure_type) {
    return properties[type];
}
