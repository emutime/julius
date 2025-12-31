
import { direction_type } from 'core/direction';
import DIR_0_TOP = direction_type.DIR_0_TOP;
import DIR_1_TOP_RIGHT = direction_type.DIR_1_TOP_RIGHT;
import DIR_2_RIGHT = direction_type.DIR_2_RIGHT;
import DIR_3_BOTTOM_RIGHT = direction_type.DIR_3_BOTTOM_RIGHT;
import DIR_4_BOTTOM = direction_type.DIR_4_BOTTOM;
import DIR_5_BOTTOM_LEFT = direction_type.DIR_5_BOTTOM_LEFT;
import DIR_6_LEFT = direction_type.DIR_6_LEFT;
import DIR_7_TOP_LEFT = direction_type.DIR_7_TOP_LEFT;
import DIR_8_NONE = direction_type.DIR_8_NONE;
;
export function calc_adjust_with_percentage(value: number, percentage: number) {
    return percentage * value / 100;
}
export function calc_percentage(value: number, total: number) {
    if (total) {
        let value_times_100: number = 100 * value;
        return value_times_100 / total;
    } else {
        return 0;
    }
}
function get_delta(value1: number, value2: number) {
    if (value1 <= value2) {
        return value2 - value1;
    } else {
        return value1 - value2;
    }
}
export function calc_maximum_distance(x1: number, y1: number, x2: number, y2: number) {
    let distance_x: number = get_delta(x1, x2);
    let distance_y: number = get_delta(y1, y2);
    if (distance_x >= distance_y) {
        return distance_x;
    } else {
        return distance_y;
    }
}
export function calc_distance_with_penalty(x1: number, y1: number, x2: number, y2: number, dist_to_entry1: number, dist_to_entry2: number) {
    let penalty: number;
    if (dist_to_entry1 > dist_to_entry2) {
        penalty = dist_to_entry1 - dist_to_entry2;
    } else {
        penalty = dist_to_entry2 - dist_to_entry1;
    }
    if (dist_to_entry1 == -1) {
        penalty = 0;
    }
    return penalty + calc_maximum_distance(x1, y1, x2, y2);
}
export function calc_general_direction(x_from: number, y_from: number, x_to: number, y_to: number) {
    if (x_from < x_to) {
        if (y_from > y_to) {
            return DIR_1_TOP_RIGHT;
        } else if (y_from == y_to) {
            return DIR_2_RIGHT;
        } else if (y_from < y_to) {
            return DIR_3_BOTTOM_RIGHT;
        }
    } else if (x_from == x_to) {
        if (y_from > y_to) {
            return DIR_0_TOP;
        } else if (y_from < y_to) {
            return DIR_4_BOTTOM;
        }
    } else if (x_from > x_to) {
        if (y_from > y_to) {
            return DIR_7_TOP_LEFT;
        } else if (y_from == y_to) {
            return DIR_6_LEFT;
        } else if (y_from < y_to) {
            return DIR_5_BOTTOM_LEFT;
        }
    }
    return DIR_8_NONE;
}
export function calc_missile_shooter_direction(x_from: number, y_from: number, x_to: number, y_to: number) {
    let dx: number = x_from > x_to ? x_from - x_to : x_to - x_from;
    let dy: number = y_from > y_to ? y_from - y_to : y_to - y_from;
    let percentage: number;
    if (dx > dy) {
        percentage = calc_percentage(dx, dy);
    } else if (dx == dy) {
        percentage = 100;
    } else {
        percentage = -calc_percentage(dy, dx);
    }
    if (x_from == x_to) {
        if (y_from < y_to) {
            return DIR_4_BOTTOM;
        } else {
            return DIR_0_TOP;
        }
    } else if (x_from > x_to) {
        if (y_from == y_to) {
            return DIR_6_LEFT;
        } else if (y_from > y_to) {
            if (percentage >= 400) {
                return DIR_6_LEFT;
            } else if (percentage > -400) {
                return DIR_7_TOP_LEFT;
            } else {
                return DIR_0_TOP;
            }
        } else {
            if (percentage >= 400) {
                return DIR_6_LEFT;
            } else if (percentage > -400) {
                return DIR_5_BOTTOM_LEFT;
            } else {
                return DIR_4_BOTTOM;
            }
        }
    } else {
        if (y_from == y_to) {
            return DIR_2_RIGHT;
        } else if (y_from > y_to) {
            if (percentage >= 400) {
                return DIR_2_RIGHT;
            } else if (percentage > -400) {
                return DIR_1_TOP_RIGHT;
            } else {
                return DIR_0_TOP;
            }
        } else {
            if (percentage >= 400) {
                return DIR_2_RIGHT;
            } else if (percentage > -400) {
                return DIR_3_BOTTOM_RIGHT;
            } else {
                return DIR_4_BOTTOM;
            }
        }
    }
}
export function calc_missile_direction(x_from: number, y_from: number, x_to: number, y_to: number) {
    let dx: number = x_from > x_to ? x_from - x_to : x_to - x_from;
    let dy: number = y_from > y_to ? y_from - y_to : y_to - y_from;
    let percentage: number;
    if (dx > dy) {
        percentage = calc_percentage(dx, dy);
    } else if (dx == dy) {
        percentage = 100;
    } else {
        percentage = -calc_percentage(dy, dx);
    }
    if (x_from == x_to) {
        if (y_from < y_to) {
            return 8;
        } else {
            return 0;
        }
    } else if (x_from > x_to) {
        if (y_from == y_to) {
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
    } else {
        if (y_from == y_to) {
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
export function calc_bound(value: number, min: number, max: number) {
    if (value < min) {
        return min;
    } else if (value > max) {
        return max;
    } else {
        return value;
    }
}
