export const MAX_OBJECTS = 200;
import { buffer, buffer_read_i16, buffer_read_u16, buffer_read_u8, buffer_skip } from 'core/buffer';
import { calc_maximum_distance } from 'core/calc';
import { image, image_get, image_group } from 'core/image';
import { group_terrain } from 'core/image_group';
import { empire_city, empire_city_clear_all, empire_city_get } from 'empire/city';
import { trade_route_init } from 'empire/trade_route';
import { empire_city_type, empire_object_type } from 'empire/type';
import { game_animation_should_advance } from 'game/animation';
import { resource_type } from 'game/resource';
import { scenario_empire_is_expanded } from 'scenario/empire';
class expanded {
    public x: number = 0;
    public y: number = 0;
    public image_id: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.x = args[0]);
        args.length >= 2 && (this.y = args[1]);
        args.length >= 3 && (this.image_id = args[2]);
    }
}
export class empire_object {
    public id: number = 0;
    public type: number = 0;
    public animation_index: number = 0;
    public x: number = 0;
    public y: number = 0;
    public width: number = 0;
    public height: number = 0;
    public image_id: number = 0;
    public expanded: expanded = null;
    public distant_battle_travel_months: number = 0;
    public trade_route_id: number = 0;
    public invasion_path_id: number = 0;
    public invasion_years: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.id = args[0]);
        args.length >= 2 && (this.type = args[1]);
        args.length >= 3 && (this.animation_index = args[2]);
        args.length >= 4 && (this.x = args[3]);
        args.length >= 5 && (this.y = args[4]);
        args.length >= 6 && (this.width = args[5]);
        args.length >= 7 && (this.height = args[6]);
        args.length >= 8 && (this.image_id = args[7]);
        args.length >= 9 && (this.expanded = args[8]);
        args.length >= 10 && (this.distant_battle_travel_months = args[9]);
        args.length >= 11 && (this.trade_route_id = args[10]);
        args.length >= 12 && (this.invasion_path_id = args[11]);
        args.length >= 13 && (this.invasion_years = args[12]);
    }
}
import GROUP_EMPIRE_CITY = group_terrain.GROUP_EMPIRE_CITY;
import GROUP_EMPIRE_CITY_TRADE = group_terrain.GROUP_EMPIRE_CITY_TRADE;
import GROUP_EMPIRE_CITY_DISTANT_ROMAN = group_terrain.GROUP_EMPIRE_CITY_DISTANT_ROMAN;
import RESOURCE_MIN = resource_type.RESOURCE_MIN;
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
import EMPIRE_OBJECT_CITY = empire_object_type.EMPIRE_OBJECT_CITY;
import EMPIRE_OBJECT_BATTLE_ICON = empire_object_type.EMPIRE_OBJECT_BATTLE_ICON;
import EMPIRE_OBJECT_LAND_TRADE_ROUTE = empire_object_type.EMPIRE_OBJECT_LAND_TRADE_ROUTE;
import EMPIRE_OBJECT_SEA_TRADE_ROUTE = empire_object_type.EMPIRE_OBJECT_SEA_TRADE_ROUTE;
import EMPIRE_CITY_DISTANT_ROMAN = empire_city_type.EMPIRE_CITY_DISTANT_ROMAN;
import EMPIRE_CITY_OURS = empire_city_type.EMPIRE_CITY_OURS;
import EMPIRE_CITY_TRADE = empire_city_type.EMPIRE_CITY_TRADE;
import EMPIRE_CITY_DISTANT_FOREIGN = empire_city_type.EMPIRE_CITY_DISTANT_FOREIGN;
import EMPIRE_CITY_VULNERABLE_ROMAN = empire_city_type.EMPIRE_CITY_VULNERABLE_ROMAN;
import EMPIRE_CITY_FUTURE_ROMAN = empire_city_type.EMPIRE_CITY_FUTURE_ROMAN;
export class full_empire_object {
    public in_use: number = 0;
    public city_type: number = 0;
    public city_name_id: number = 0;
    public trade_route_open: number = 0;
    public trade_route_cost: number = 0;
    public city_sells_resource: number[] = new Array(10).fill(0);
    public city_buys_resource: number[] = new Array(8).fill(0);
    public trade40: number = 0;
    public trade25: number = 0;
    public trade15: number = 0;
    public obj: empire_object = null;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.in_use = args[0]);
        args.length >= 2 && (this.city_type = args[1]);
        args.length >= 3 && (this.city_name_id = args[2]);
        args.length >= 4 && (this.trade_route_open = args[3]);
        args.length >= 5 && (this.trade_route_cost = args[4]);
        args.length >= 6 && (this.city_sells_resource = args[5]);
        args.length >= 7 && (this.city_buys_resource = args[6]);
        args.length >= 8 && (this.trade40 = args[7]);
        args.length >= 9 && (this.trade25 = args[8]);
        args.length >= 10 && (this.trade15 = args[9]);
        args.length >= 11 && (this.obj = args[10]);
    }
}
let objects: full_empire_object[] = new Array(MAX_OBJECTS);
function fix_image_ids() {
    let image_id: number = 0;
    for (let i: number = 0; i < MAX_OBJECTS; i++) {
        if (objects[i].in_use
            && objects[i].obj.type == EMPIRE_OBJECT_CITY
            && objects[i].city_type == EMPIRE_CITY_OURS) {
            image_id = objects[i].obj.image_id;
            break
        }
    }
    if (image_id > 0 && image_id != image_group(GROUP_EMPIRE_CITY)) {
        let offset: number = image_group(GROUP_EMPIRE_CITY) - image_id;
        for (let i: number = 0; i < MAX_OBJECTS; i++) {
            if (!objects[i].in_use) {
                continue
            }
            if (objects[i].obj.image_id) {
                objects[i].obj.image_id += offset
                if (objects[i].obj.expanded.image_id) {
                    objects[i].obj.expanded.image_id += offset
                }
            }
        }
    }
}
export function empire_object_load(buf: buffer) {
    for (let i: number = 0; i < MAX_OBJECTS; i++) {
        let full: full_empire_object = objects[i];
        let obj: empire_object = full.obj;
        obj.id = i;
        obj.type = buffer_read_u8(buf);
        full.in_use = buffer_read_u8(buf);
        obj.animation_index = buffer_read_u8(buf);
        buffer_skip(buf, 1);
        obj.x = buffer_read_i16(buf);
        obj.y = buffer_read_i16(buf);
        obj.width = buffer_read_i16(buf);
        obj.height = buffer_read_i16(buf);
        obj.image_id = buffer_read_i16(buf);
        obj.expanded.image_id = buffer_read_i16(buf);
        buffer_skip(buf, 1);
        obj.distant_battle_travel_months = buffer_read_u8(buf);
        buffer_skip(buf, 2);
        obj.expanded.x = buffer_read_i16(buf);
        obj.expanded.y = buffer_read_i16(buf);
        full.city_type = buffer_read_u8(buf);
        full.city_name_id = buffer_read_u8(buf);
        obj.trade_route_id = buffer_read_u8(buf);
        full.trade_route_open = buffer_read_u8(buf);
        full.trade_route_cost = buffer_read_i16(buf);
        for (let r: number = 0; r < 10; r++) {
            full.city_sells_resource[r] = buffer_read_u8(buf);
        }
        buffer_skip(buf, 2);
        for (let r: number = 0; r < 8; r++) {
            full.city_buys_resource[r] = buffer_read_u8(buf);
        }
        obj.invasion_path_id = buffer_read_u8(buf);
        obj.invasion_years = buffer_read_u8(buf);
        full.trade40 = buffer_read_u16(buf);
        full.trade25 = buffer_read_u16(buf);
        full.trade15 = buffer_read_u16(buf);
        buffer_skip(buf, 6);
    }
    fix_image_ids();
}
export function empire_object_init_cities() {
    empire_city_clear_all();
    let route_index: number = 1;
    for (let i: number = 0; i < MAX_OBJECTS; i++) {
        if (!objects[i].in_use || objects[i].obj.type != EMPIRE_OBJECT_CITY) {
            continue
        }
        let obj: full_empire_object = objects[i];
        let city: empire_city | null = empire_city_get(route_index++);
        if (city) {
            city.in_use = 1;
            city.type = obj.city_type;
            city.name_id = obj.city_name_id;
            if (obj.obj.trade_route_id < 0) {
                obj.obj.trade_route_id = 0;
            }
            if (obj.obj.trade_route_id >= 20) {
                obj.obj.trade_route_id = 19;
            }
            city.route_id = obj.obj.trade_route_id;
            city.is_open = obj.trade_route_open;
            city.cost_to_open = obj.trade_route_cost;
            city.is_sea_trade = is_sea_trade_route(obj.obj.trade_route_id);
            for (let resource: number = RESOURCE_MIN; resource < RESOURCE_MAX; resource++) {
                city.sells_resource[resource] = 0;
                city.buys_resource[resource] = 0;
                if (city.type == EMPIRE_CITY_DISTANT_ROMAN
                    || city.type == EMPIRE_CITY_DISTANT_FOREIGN
                    || city.type == EMPIRE_CITY_VULNERABLE_ROMAN
                    || city.type == EMPIRE_CITY_FUTURE_ROMAN) {
                    continue
                }
                if (empire_object_city_sells_resource(i, resource)) {
                    city.sells_resource[resource] = 1;
                }
                if (empire_object_city_buys_resource(i, resource)) {
                    city.buys_resource[resource] = 1;
                }
                let amount: number;
                switch (get_trade_amount_code(i, resource)) {
                    case 1:
                        amount = 15;
                        break
                    case 2:
                        amount = 25;
                        break
                    case 3:
                        amount = 40;
                        break
                    default: amount = 0
                        break
                }
                trade_route_init(city.route_id, resource, amount);
            }
            city.trader_entry_delay = 4;
            city.trader_figure_ids[0] = 0;
            city.trader_figure_ids[1] = 0;
            city.trader_figure_ids[2] = 0;
            city.empire_object_id = i;
        }
    }
}
export function empire_object_init_distant_battle_travel_months(object_type: number) {
    let month: number = 0;
    for (let i: number = 0; i < MAX_OBJECTS; i++) {
        if (objects[i].in_use && objects[i].obj.type == object_type) {
            month++;
            objects[i].obj.distant_battle_travel_months = month;
        }
    }
    return month;
}
export function empire_object_get(object_id: number) {
    return objects[object_id].obj;
}
export function empire_object_get_our_city() {
    for (let i: number = 0; i < MAX_OBJECTS; i++) {
        if (objects[i].in_use) {
            let obj: empire_object = objects[i].obj;
            if (obj.type == EMPIRE_OBJECT_CITY && objects[i].city_type == EMPIRE_CITY_OURS) {
                return obj;
            }
        }
    }
    return null;
}
export function empire_object_foreach(callback: (obj: empire_object) => void) {
    for (let i: number = 0; i < MAX_OBJECTS; i++) {
        if (objects[i].in_use) {
            callback(objects[i].obj);
        }
    }
}
export function empire_object_get_battle_icon(path_id: number, year: number) {
    for (let i: number = 0; i < MAX_OBJECTS; i++) {
        if (objects[i].in_use) {
            let obj: empire_object = objects[i].obj;
            if (obj.type == EMPIRE_OBJECT_BATTLE_ICON &&
                obj.invasion_path_id == path_id && obj.invasion_years == year) {
                return obj;
            }
        }
    }
    return 0;
}
export function empire_object_get_max_invasion_path() {
    let max_path: number = 0;
    for (let i: number = 0; i < MAX_OBJECTS; i++) {
        if (objects[i].in_use && objects[i].obj.type == EMPIRE_OBJECT_BATTLE_ICON) {
            if (objects[i].obj.invasion_path_id > max_path) {
                max_path = objects[i].obj.invasion_path_id;
            }
        }
    }
    return max_path;
}
export function empire_object_get_closest(x: number, y: number) {
    let min_dist: number = 10000;
    let min_obj_id: number = 0;
    for (let i: number = 0; i < MAX_OBJECTS && objects[i].in_use; i++) {
        let obj: empire_object = objects[i].obj;
        let obj_x: number
        let obj_y: number;
        if (scenario_empire_is_expanded()) {
            obj_x = obj.expanded.x;
            obj_y = obj.expanded.y;
        } else {
            obj_x = obj.x;
            obj_y = obj.y;
        }
        if (obj_x - 8 > x || obj_x + obj.width + 8 <= x) {
            continue
        }
        if (obj_y - 8 > y || obj_y + obj.height + 8 <= y) {
            continue
        }
        let dist: number = calc_maximum_distance(x, y, obj_x + obj.width / 2, obj_y + obj.height / 2);
        if (dist < min_dist) {
            min_dist = dist;
            min_obj_id = i + 1;
        }
    }
    return min_obj_id;
}
export function empire_object_set_expanded(object_id: number, new_city_type: number) {
    objects[object_id].city_type = new_city_type;
    if (new_city_type == EMPIRE_CITY_TRADE) {
        objects[object_id].obj.expanded.image_id = image_group(GROUP_EMPIRE_CITY_TRADE);
    } else if (new_city_type == EMPIRE_CITY_DISTANT_ROMAN) {
        objects[object_id].obj.expanded.image_id = image_group(GROUP_EMPIRE_CITY_DISTANT_ROMAN);
    }
}
export function empire_object_city_buys_resource(object_id: number, resource: number) {
    let object: full_empire_object = objects[object_id];
    for (let i: number = 0; i < 8; i++) {
        if (object.city_buys_resource[i] == resource) {
            return 1;
        }
    }
    return 0;
}
export function empire_object_city_sells_resource(object_id: number, resource: number) {
    let object: full_empire_object = objects[object_id];
    for (let i: number = 0; i < 10; i++) {
        if (object.city_sells_resource[i] == resource) {
            return 1;
        }
    }
    return 0;
}
function is_trade_city(index: number) {
    if (objects[index].obj.type != EMPIRE_OBJECT_CITY) {
        return 0;
    }
    return objects[index].city_type > EMPIRE_CITY_OURS && objects[index].city_type < EMPIRE_CITY_FUTURE_ROMAN;
}
function get_trade_amount_code(index: number, resource: number) {
    if (!is_trade_city(index)) {
        return 0;
    }
    let resource_flag: number = 1 << resource;
    if (objects[index].trade40 & resource_flag) {
        return 3;
    }
    if (objects[index].trade25 & resource_flag) {
        return 2;
    }
    if (objects[index].trade15 & resource_flag) {
        return 1;
    }
    return 0;
}
function is_sea_trade_route(route_id: number) {
    for (let i: number = 0; i < MAX_OBJECTS; i++) {
        if (objects[i].in_use && objects[i].obj.trade_route_id == route_id) {
            if (objects[i].obj.type == EMPIRE_OBJECT_SEA_TRADE_ROUTE) {
                return 1;
            }
            if (objects[i].obj.type == EMPIRE_OBJECT_LAND_TRADE_ROUTE) {
                return 0;
            }
        }
    }
    return 0;
}
function get_animation_offset(image_id: number, current_index: number) {
    if (current_index <= 0) {
        current_index = 1;
    }
    let img: image = image_get(image_id);
    let animation_speed: number = img.animation_speed_id;
    if (!game_animation_should_advance(animation_speed)) {
        return current_index;
    }
    if (img.animation_can_reverse) {
        let is_reverse: number = 0;
        if (current_index & 0x80) {
            is_reverse = 1;
        }
        let current_sprite: number = current_index & 0x7f;
        if (is_reverse) {
            current_index = current_sprite - 1;
            if (current_index < 1) {
                current_index = 1;
                is_reverse = 0;
            }
        } else {
            current_index = current_sprite + 1;
            if (current_index > img.num_animation_sprites) {
                current_index = img.num_animation_sprites;
                is_reverse = 1;
            }
        }
        if (is_reverse) {
            current_index = current_index | 0x80;
        }
    } else {
        current_index++;
        if (current_index > img.num_animation_sprites) {
            current_index = 1;
        }
    }
    return current_index;
}
export function empire_object_update_animation(obj: empire_object, image_id: number) {
    return objects[obj.id].obj.animation_index = get_animation_offset(image_id, obj.animation_index);
}
