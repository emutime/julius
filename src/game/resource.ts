
import { building_type } from 'building/type';
import { resource_image_type, resource_type, workshop_type } from 'game/resource';
import { scenario_building_allowed } from 'scenario/building';
import RESOURCE_WHEAT = resource_type.RESOURCE_WHEAT;
import RESOURCE_VEGETABLES = resource_type.RESOURCE_VEGETABLES;
import RESOURCE_FRUIT = resource_type.RESOURCE_FRUIT;
import RESOURCE_OLIVES = resource_type.RESOURCE_OLIVES;
import RESOURCE_VINES = resource_type.RESOURCE_VINES;
import RESOURCE_MEAT = resource_type.RESOURCE_MEAT;
import RESOURCE_IRON = resource_type.RESOURCE_IRON;
import RESOURCE_TIMBER = resource_type.RESOURCE_TIMBER;
import RESOURCE_CLAY = resource_type.RESOURCE_CLAY;
import WORKSHOP_NONE = workshop_type.WORKSHOP_NONE;
import WORKSHOP_OLIVES_TO_OIL = workshop_type.WORKSHOP_OLIVES_TO_OIL;
import WORKSHOP_VINES_TO_WINE = workshop_type.WORKSHOP_VINES_TO_WINE;
import WORKSHOP_IRON_TO_WEAPONS = workshop_type.WORKSHOP_IRON_TO_WEAPONS;
import WORKSHOP_TIMBER_TO_FURNITURE = workshop_type.WORKSHOP_TIMBER_TO_FURNITURE;
import WORKSHOP_CLAY_TO_POTTERY = workshop_type.WORKSHOP_CLAY_TO_POTTERY;
import RESOURCE_IMAGE_STORAGE = resource_image_type.RESOURCE_IMAGE_STORAGE;
import RESOURCE_IMAGE_CART = resource_image_type.RESOURCE_IMAGE_CART;
import RESOURCE_IMAGE_FOOD_CART = resource_image_type.RESOURCE_IMAGE_FOOD_CART;
import RESOURCE_IMAGE_ICON = resource_image_type.RESOURCE_IMAGE_ICON;
import BUILDING_WHARF = building_type.BUILDING_WHARF;
export function resource_image_offset(resource: resource_type, type: resource_image_type) {
    if (resource == RESOURCE_MEAT && scenario_building_allowed(BUILDING_WHARF)) {
        switch (type) {
            case RESOURCE_IMAGE_STORAGE:
                return 40;
            case RESOURCE_IMAGE_CART:
                return 648;
            case RESOURCE_IMAGE_FOOD_CART:
                return 8;
            case RESOURCE_IMAGE_ICON:
                return 11;
            default: return 0
        }
    } else {
        return 0;
    }
}
export function resource_is_food(resource: resource_type) {
    return resource == RESOURCE_WHEAT || resource == RESOURCE_VEGETABLES ||
        resource == RESOURCE_FRUIT || resource == RESOURCE_MEAT;
}
export function resource_to_workshop_type(resource: resource_type) {
    switch (resource) {
        case RESOURCE_OLIVES:
            return WORKSHOP_OLIVES_TO_OIL;
        case RESOURCE_VINES:
            return WORKSHOP_VINES_TO_WINE;
        case RESOURCE_IRON:
            return WORKSHOP_IRON_TO_WEAPONS;
        case RESOURCE_TIMBER:
            return WORKSHOP_TIMBER_TO_FURNITURE;
        case RESOURCE_CLAY:
            return WORKSHOP_CLAY_TO_POTTERY;
        default:
            return WORKSHOP_NONE
    }
}
