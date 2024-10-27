import { building_type } from "building/type";
import { scenario_building_allowed } from "scenario/building";

/**
 * Resource types
 */
export const enum resource_type {
    RESOURCE_NONE = 0,
    RESOURCE_WHEAT = 1,
    RESOURCE_VEGETABLES = 2,
    RESOURCE_FRUIT = 3,
    RESOURCE_OLIVES = 4,
    RESOURCE_VINES = 5,
    RESOURCE_MEAT = 6,
    RESOURCE_WINE = 7,
    RESOURCE_OIL = 8,
    RESOURCE_IRON = 9,
    RESOURCE_TIMBER = 10,
    RESOURCE_CLAY = 11,
    RESOURCE_MARBLE = 12,
    RESOURCE_WEAPONS = 13,
    RESOURCE_FURNITURE = 14,
    RESOURCE_POTTERY = 15,
    RESOURCE_DENARII = 16,
    RESOURCE_TROOPS = 17,
    // helper constants
    RESOURCE_MIN = 1,
    RESOURCE_MAX = 16,
    RESOURCE_MIN_FOOD = 1,
    RESOURCE_MAX_FOOD = 7
};

export const enum inventory_type {
    INVENTORY_WHEAT = 0,
    INVENTORY_VEGETABLES = 1,
    INVENTORY_FRUIT = 2,
    INVENTORY_MEAT = 3,
    INVENTORY_WINE = 4,
    INVENTORY_OIL = 5,
    INVENTORY_FURNITURE = 6,
    INVENTORY_POTTERY = 7,
    // helper constants
    INVENTORY_MIN_FOOD = 0,
    INVENTORY_MAX_FOOD = 4,
    INVENTORY_MIN_GOOD = 4,
    INVENTORY_MAX_GOOD = 8,
    INVENTORY_MAX = 8
};

export const enum workshop_type {
    WORKSHOP_NONE = 0,
    WORKSHOP_OLIVES_TO_OIL = 1,
    WORKSHOP_VINES_TO_WINE = 2,
    WORKSHOP_IRON_TO_WEAPONS = 3,
    WORKSHOP_TIMBER_TO_FURNITURE = 4,
    WORKSHOP_CLAY_TO_POTTERY = 5
};

export const enum resource_image_type {
    RESOURCE_IMAGE_STORAGE = 0,
    RESOURCE_IMAGE_CART = 1,
    RESOURCE_IMAGE_FOOD_CART = 2,
    RESOURCE_IMAGE_ICON = 3
};

import RESOURCE_NONE = resource_type.RESOURCE_NONE;
import RESOURCE_WHEAT = resource_type.RESOURCE_WHEAT;
import RESOURCE_VEGETABLES = resource_type.RESOURCE_VEGETABLES;
import RESOURCE_FRUIT = resource_type.RESOURCE_FRUIT;
import RESOURCE_OLIVES = resource_type.RESOURCE_OLIVES;
import RESOURCE_VINES = resource_type.RESOURCE_VINES;
import RESOURCE_MEAT = resource_type.RESOURCE_MEAT;
import RESOURCE_WINE = resource_type.RESOURCE_WINE;
import RESOURCE_OIL = resource_type.RESOURCE_OIL;
import RESOURCE_IRON = resource_type.RESOURCE_IRON;
import RESOURCE_TIMBER = resource_type.RESOURCE_TIMBER;
import RESOURCE_CLAY = resource_type.RESOURCE_CLAY;
import RESOURCE_MARBLE = resource_type.RESOURCE_MARBLE;
import RESOURCE_WEAPONS = resource_type.RESOURCE_WEAPONS;
import RESOURCE_FURNITURE = resource_type.RESOURCE_FURNITURE;
import RESOURCE_POTTERY = resource_type.RESOURCE_POTTERY;
import RESOURCE_DENARII = resource_type.RESOURCE_DENARII;
import RESOURCE_TROOPS = resource_type.RESOURCE_TROOPS;
import RESOURCE_MIN = resource_type.RESOURCE_MIN;
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
import RESOURCE_MIN_FOOD = resource_type.RESOURCE_MIN_FOOD;
import RESOURCE_MAX_FOOD = resource_type.RESOURCE_MAX_FOOD;

import INVENTORY_WHEAT = inventory_type.INVENTORY_WHEAT;
import INVENTORY_VEGETABLES = inventory_type.INVENTORY_VEGETABLES;
import INVENTORY_FRUIT = inventory_type.INVENTORY_FRUIT;
import INVENTORY_MEAT = inventory_type.INVENTORY_MEAT;
import INVENTORY_WINE = inventory_type.INVENTORY_WINE;
import INVENTORY_OIL = inventory_type.INVENTORY_OIL;
import INVENTORY_FURNITURE = inventory_type.INVENTORY_FURNITURE;
import INVENTORY_POTTERY = inventory_type.INVENTORY_POTTERY;
import INVENTORY_MIN_FOOD = inventory_type.INVENTORY_MIN_FOOD;
import INVENTORY_MAX_FOOD = inventory_type.INVENTORY_MAX_FOOD;
import INVENTORY_MIN_GOOD = inventory_type.INVENTORY_MIN_GOOD;
import INVENTORY_MAX_GOOD = inventory_type.INVENTORY_MAX_GOOD;
import INVENTORY_MAX = inventory_type.INVENTORY_MAX;

import WORKSHOP_NONE = workshop_type.WORKSHOP_NONE;
import WORKSHOP_OLIVES_TO_OIL = workshop_type.WORKSHOP_OLIVES_TO_OIL;
import WORKSHOP_VINES_TO_WINE = workshop_type.WORKSHOP_VINES_TO_WINE;
import WORKSHOP_IRON_TO_WEAPONS = workshop_type.WORKSHOP_IRON_TO_WEAPONS;
import WORKSHOP_TIMBER_TO_FURNITURE = workshop_type.WORKSHOP_TIMBER_TO_FURNITURE;
import WORKSHOP_CLAY_TO_POTTERY = workshop_type.WORKSHOP_CLAY_TO_POTTERY;

import RESOURCE_IMAGE_STORAGE = resource_image_type.RESOURCE_IMAGE_STORAGE
import RESOURCE_IMAGE_CART = resource_image_type.RESOURCE_IMAGE_CART
import RESOURCE_IMAGE_FOOD_CART = resource_image_type.RESOURCE_IMAGE_FOOD_CART
import RESOURCE_IMAGE_ICON = resource_image_type.RESOURCE_IMAGE_ICON

import BUILDING_WHARF = building_type.BUILDING_WHARF;

export function resource_image_offset(resource: resource_type, type: resource_image_type) {
    if (resource == RESOURCE_MEAT && scenario_building_allowed(BUILDING_WHARF)) {
        switch (type) {
            case RESOURCE_IMAGE_STORAGE: return 40;
            case RESOURCE_IMAGE_CART: return 648;
            case RESOURCE_IMAGE_FOOD_CART: return 8;
            case RESOURCE_IMAGE_ICON: return 11;
            default: return 0;
        }
    } else {
        return 0;
    }
}

export function resource_is_food(resource: resource_type) {
    return resource == RESOURCE_WHEAT || resource == RESOURCE_VEGETABLES ||
        resource == RESOURCE_FRUIT || resource == RESOURCE_MEAT;
}

export function resource_to_workshop_type(resource: resource_type): workshop_type {
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
            return WORKSHOP_NONE;
    }
}