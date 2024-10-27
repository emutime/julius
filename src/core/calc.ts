// core/calc.ts

// 根据百分比调整值
export function calc_adjust_with_percentage(value: number, percentage: number): number {
    return (percentage * value) / 100;
}

// 计算值占总值的百分比
export function calc_percentage(value: number, total: number): number {
    if (total) {
        const value_times_100 = 100 * value;
        return Math.floor(value_times_100 / total); // 向下取整
    } else {
        return 0;
    }
}

// 获取两个值之间的差值
export function get_delta(value1: number, value2: number): number {
    return Math.abs(value2 - value1); // 返回绝对值
}

// 计算最大距离
export function calc_maximum_distance(x1: number, y1: number, x2: number, y2: number): number {
    const distance_x = get_delta(x1, x2);
    const distance_y = get_delta(y1, y2);
    return Math.max(distance_x, distance_y); // 返回最大值
}

// 计算带惩罚的距离
export function calc_distance_with_penalty(
    x1: number, y1: number, x2: number, y2: number,
    dist_to_entry1: number, dist_to_entry2: number
): number {
    let penalty: number;
    if (dist_to_entry1 > dist_to_entry2) {
        penalty = dist_to_entry1 - dist_to_entry2;
    } else {
        penalty = dist_to_entry2 - dist_to_entry1;
    }
    if (dist_to_entry1 === -1) {
        penalty = 0;
    }
    return penalty + calc_maximum_distance(x1, y1, x2, y2);
}

// 计算一般方向
enum DirectionType {
    DIR_0_TOP,
    DIR_1_TOP_RIGHT,
    DIR_2_RIGHT,
    DIR_3_BOTTOM_RIGHT,
    DIR_4_BOTTOM,
    DIR_5_BOTTOM_LEFT,
    DIR_6_LEFT,
    DIR_7_TOP_LEFT,
    DIR_8_NONE
}

export function calc_general_direction(x_from: number, y_from: number, x_to: number, y_to: number): DirectionType {
    if (x_from < x_to) {
        if (y_from > y_to) {
            return DirectionType.DIR_1_TOP_RIGHT;
        } else if (y_from === y_to) {
            return DirectionType.DIR_2_RIGHT;
        } else {
            return DirectionType.DIR_3_BOTTOM_RIGHT;
        }
    } else if (x_from === x_to) {
        if (y_from > y_to) {
            return DirectionType.DIR_0_TOP;
        } else {
            return DirectionType.DIR_4_BOTTOM;
        }
    } else {
        if (y_from > y_to) {
            return DirectionType.DIR_7_TOP_LEFT;
        } else if (y_from === y_to) {
            return DirectionType.DIR_6_LEFT;
        } else {
            return DirectionType.DIR_5_BOTTOM_LEFT;
        }
    }
}

// 计算导弹发射器方向
export function calc_missile_shooter_direction(x_from: number, y_from: number, x_to: number, y_to: number): DirectionType {
    const dx = Math.abs(x_from - x_to);
    const dy = Math.abs(y_from - y_to);
    let percentage: number;

    if (dx > dy) {
        percentage = calc_percentage(dx, dy);
    } else if (dx === dy) {
        percentage = 100;
    } else {
        percentage = -calc_percentage(dy, dx);
    }

    if (x_from === x_to) {
        return y_from < y_to ? DirectionType.DIR_4_BOTTOM : DirectionType.DIR_0_TOP;
    } else if (x_from > x_to) {
        if (y_from === y_to) {
            return DirectionType.DIR_6_LEFT;
        } else if (y_from > y_to) {
            if (percentage >= 400) {
                return DirectionType.DIR_6_LEFT;
            } else if (percentage > -400) {
                return DirectionType.DIR_7_TOP_LEFT;
            } else {
                return DirectionType.DIR_0_TOP;
            }
        } else {
            if (percentage >= 400) {
                return DirectionType.DIR_6_LEFT;
            } else if (percentage > -400) {
                return DirectionType.DIR_5_BOTTOM_LEFT;
            } else {
                return DirectionType.DIR_4_BOTTOM;
            }
        }
    } else { // x_from < x_to
        if (y_from === y_to) {
            return DirectionType.DIR_2_RIGHT;
        } else if (y_from > y_to) {
            if (percentage >= 400) {
                return DirectionType.DIR_2_RIGHT;
            } else if (percentage > -400) {
                return DirectionType.DIR_1_TOP_RIGHT;
            } else {
                return DirectionType.DIR_0_TOP;
            }
        } else {
            if (percentage >= 400) {
                return DirectionType.DIR_2_RIGHT;
            } else if (percentage > -400) {
                return DirectionType.DIR_3_BOTTOM_RIGHT;
            } else {
                return DirectionType.DIR_4_BOTTOM;
            }
        }
    }
}

// 计算导弹方向
export function calc_missile_direction(x_from: number, y_from: number, x_to: number, y_to: number): number {
    const dx = Math.abs(x_from - x_to);
    const dy = Math.abs(y_from - y_to);
    let percentage: number;

    if (dx > dy) {
        percentage = calc_percentage(dx, dy);
    } else if (dx === dy) {
        percentage = 100;
    } else {
        percentage = -calc_percentage(dy, dx);
    }

    if (x_from === x_to) {
        return y_from < y_to ? 8 : 0;
    } else if (x_from > x_to) {
        if (y_from === y_to) {
            return 12;
        } else if (y_from > y_to) {
            if (percentage >= 500) {
                return 12;
            } else if (percentage >= 200) {
                return 13;
            } else if (percentage > -200) {
                return 14;
            } else if (percentage > -500) {
                return 15;
            } else {
                return 0;
            }
        } else {
            if (percentage >= 500) {
                return 12;
            } else if (percentage >= 200) {
                return 11;
            } else if (percentage > -200) {
                return 10;
            } else if (percentage > -500) {
                return 9;
            } else {
                return 8;
            }
        }
    } else { // x_from < x_to
        if (y_from === y_to) {
            return 4;
        } else if (y_from > y_to) {
            if (percentage >= 500) {
                return 4;
            } else if (percentage >= 200) {
                return 3;
            } else if (percentage > -200) {
                return 2;
            } else if (percentage > -500) {
                return 1;
            } else {
                return 0;
            }
        } else {
            if (percentage >= 500) {
                return 4;
            } else if (percentage >= 200) {
                return 5;
            } else if (percentage > -200) {
                return 6;
            } else if (percentage > -500) {
                return 7;
            } else {
                return 8;
            }
        }
    }
}

// 计算值的边界
export function calc_bound(value: number, min: number, max: number): number {
    if (value < min) {
        return min;
    } else if (value > max) {
        return max;
    } else {
        return value;
    }
}