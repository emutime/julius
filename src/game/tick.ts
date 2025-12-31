import { building_update_desirability, building_update_highest_id, building_update_state } from 'building/building';
import { building_count_update } from 'building/count';
import { building_dock_update_open_water_access } from 'building/dock';
import { building_figure_generate } from 'building/figure';
import { building_government_distribute_treasury } from 'building/government';
import { building_granaries_calculate_stocks } from 'building/granary';
import { building_house_process_evolve_and_consume_goods } from 'building/house_evolution';
import { house_population_evict_overcrowded, house_population_update_migration, house_population_update_room } from 'building/house_population';
import { house_service_calculate_culture_aggregates, house_service_decay_culture, house_service_decay_houses_covered, house_service_decay_tax_collector } from 'building/house_service';
import { building_industry_update_production, building_industry_update_wheat_production } from 'building/industry';
import { building_maintenance_check_fire_collapse, building_maintenance_check_rome_access, building_maintenance_update_burning_ruins, building_maintenance_update_fire_direction } from 'building/maintenance';
import { city_culture_calculate, city_culture_update_coverage } from 'city/culture';
import { city_emperor_update } from 'city/emperor';
import { city_festival_update } from 'city/festival';
import { city_finance_handle_month_change, city_finance_handle_year_change } from 'city/finance';
import { city_gods_calculate_moods, city_gods_reset_neptune_blessing } from 'city/gods';
import { city_health_update } from 'city/health';
import { city_labor_update } from 'city/labor';
import { city_message_decrease_delays, city_message_sort_and_compact } from 'city/message';
import { city_migration_reset_newcomers } from 'city/migration';
import { city_population_record_monthly, city_population_request_yearly_update } from 'city/population';
import { city_ratings_update } from 'city/ratings';
import { city_resource_calculate_food_stocks_and_supply_wheat, city_resource_calculate_warehouse_stocks, city_resource_calculate_workshop_stocks, city_resource_consume_food } from 'city/resource';
import { city_sentiment_update } from 'city/sentiment';
import { city_trade_update } from 'city/trade';
import { city_victory_check, city_victory_update_months_to_govern } from 'city/victory';
import { random_generate_next } from 'core/random';
import { editor_is_active } from 'editor/editor';
import { empire_city_reset_yearly_trade_amounts } from 'empire/city';
import { figure_action_handle } from 'figure/action';
import { formation_update_all, formation_update_monthly_morale_at_rest } from 'figure/formation';
import { figure_generate_criminals } from 'figuretype/crime';
import { game_file_write_saved_game } from 'game/file';
import { resource_type } from 'game/resource';
import { setting_monthly_autosave } from 'game/settings';
import { game_time_advance_day, game_time_advance_month, game_time_advance_tick, game_time_advance_year, game_time_day, game_time_tick } from 'game/time';
import { tutorial_on_day_tick, tutorial_on_month_tick } from 'game/tutorial';
import { game_undo_disable, game_undo_reduce_time_available } from 'game/undo';
import { map_desirability_update } from 'map/desirability';
import { map_natives_check_land } from 'map/natives';
import { map_road_network_update } from 'map/road_network';
import { map_routing_update_land_citizen } from 'map/routing_terrain';
import { map_tiles_update_all_roads, map_tiles_update_all_water } from 'map/tiles';
import { map_water_supply_update_houses, map_water_supply_update_reservoir_fountain } from 'map/water_supply';
import { scenario_demand_change_process } from 'scenario/demand_change';
import { scenario_distant_battle_process } from 'scenario/distant_battle';
import { scenario_earthquake_process } from 'scenario/earthquake';
import { scenario_emperor_change_process } from 'scenario/emperor_change';
import { scenario_empire_process_expansion } from 'scenario/empire';
import { scenario_gladiator_revolt_process } from 'scenario/gladiator_revolt';
import { scenario_invasion_process } from 'scenario/invasion';
import { scenario_price_change_process } from 'scenario/price_change';
import { scenario_random_event_process } from 'scenario/random_event';
import { scenario_request_process } from 'scenario/request';
import { sound_music_update } from 'sound/music';
import { widget_minimap_invalidate } from 'widget/minimap';
import RESOURCE_MAX = resource_type.RESOURCE_MAX;
function advance_year() {
    scenario_empire_process_expansion();
    game_undo_disable();
    game_time_advance_year();
    city_population_request_yearly_update();
    city_finance_handle_year_change();
    empire_city_reset_yearly_trade_amounts();
    building_maintenance_update_fire_direction();
    city_ratings_update(1);
    city_gods_reset_neptune_blessing();
}
function advance_month() {
    city_migration_reset_newcomers();
    city_health_update();
    scenario_random_event_process();
    city_finance_handle_month_change();
    city_resource_consume_food();
    scenario_distant_battle_process();
    scenario_invasion_process();
    scenario_request_process();
    scenario_demand_change_process();
    scenario_price_change_process();
    city_victory_update_months_to_govern();
    formation_update_monthly_morale_at_rest();
    city_message_decrease_delays();
    map_tiles_update_all_roads();
    map_tiles_update_all_water();
    map_routing_update_land_citizen();
    city_message_sort_and_compact();
    if (game_time_advance_month()) {
        advance_year();
    } else {
        city_ratings_update(0);
    }
    city_population_record_monthly();
    city_festival_update();
    tutorial_on_month_tick();
    if (setting_monthly_autosave()) {
        game_file_write_saved_game("autosave.sav");
    }
}
function advance_day() {
    if (game_time_advance_day()) {
        advance_month();
    }
    if (game_time_day() == 0 || game_time_day() == 8) {
        city_sentiment_update();
    }
    tutorial_on_day_tick();
}
function advance_tick() {
    switch (game_time_tick()) {
        case 1:
            city_gods_calculate_moods(1);
            break
        case 2:
            sound_music_update(0);
            break
        case 3:
            widget_minimap_invalidate();
            break
        case 4:
            city_emperor_update();
            break
        case 5:
            formation_update_all(0);
            break
        case 6:
            map_natives_check_land();
            break
        case 7:
            map_road_network_update();
            break
        case 8:
            building_granaries_calculate_stocks();
            break
        case 10:
            building_update_highest_id();
            break
        case 12:
            house_service_decay_houses_covered();
            break
        case 16:
            city_resource_calculate_warehouse_stocks();
            break
        case 17:
            city_resource_calculate_food_stocks_and_supply_wheat();
            break
        case 18:
            city_resource_calculate_workshop_stocks();
            break
        case 19:
            building_dock_update_open_water_access();
            break
        case 20:
            building_industry_update_production();
            break
        case 21:
            building_maintenance_check_rome_access();
            break
        case 22:
            house_population_update_room();
            break
        case 23:
            house_population_update_migration();
            break
        case 24:
            house_population_evict_overcrowded();
            break
        case 25:
            city_labor_update();
            break
        case 27:
            map_water_supply_update_reservoir_fountain();
            break
        case 28:
            map_water_supply_update_houses();
            break
        case 29:
            formation_update_all(1);
            break
        case 30:
            widget_minimap_invalidate();
            break
        case 31:
            building_figure_generate();
            break
        case 32:
            city_trade_update();
            break
        case 33:
            building_count_update();
            city_culture_update_coverage();
            break
        case 34:
            building_government_distribute_treasury();
            break
        case 35:
            house_service_decay_culture();
            break
        case 36:
            house_service_calculate_culture_aggregates();
            break
        case 37:
            map_desirability_update();
            break
        case 38:
            building_update_desirability();
            break
        case 39:
            building_house_process_evolve_and_consume_goods();
            break
        case 40:
            building_update_state();
            break
        case 43:
            building_maintenance_update_burning_ruins();
            break
        case 44:
            building_maintenance_check_fire_collapse();
            break
        case 45:
            figure_generate_criminals();
            break
        case 46:
            building_industry_update_wheat_production();
            break
        case 48:
            house_service_decay_tax_collector();
            break
        case 49:
            city_culture_calculate();
            break
    }
    if (game_time_advance_tick()) {
        advance_day();
    }
}
export function game_tick_run() {
    if (editor_is_active()) {
        random_generate_next();
        figure_action_handle();
        return;
    }
    random_generate_next();
    game_undo_reduce_time_available();
    advance_tick();
    figure_action_handle();
    scenario_earthquake_process();
    scenario_gladiator_revolt_process();
    scenario_emperor_change_process();
    city_victory_check();
}
