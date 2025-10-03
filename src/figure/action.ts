import { MAX_FIGURES } from 'figure/figure';
import { city_entertainment_set_hippodrome_has_race } from 'city/entertainment';
import { city_figures_reset } from 'city/figures';;
import { buffer } from 'core/buffer';
import { direction_type } from 'core/direction';
import { figure_type } from 'figure/type';
import { figure_state } from 'figure/type';
import FIGURE_STATE_ALIVE = figure_state.FIGURE_STATE_ALIVE;
import FIGURE_STATE_DEAD = figure_state.FIGURE_STATE_DEAD;
import { figure } from 'figure/figure';
import { figure_get } from 'figure/figure';
import { figure_delete } from 'figure/figure';
import { figure_seagulls_action } from 'figuretype/animal';
import { figure_sheep_action } from 'figuretype/animal';
import { figure_wolf_action } from 'figuretype/animal';
import { figure_zebra_action } from 'figuretype/animal';
import { figure_hippodrome_horse_action } from 'figuretype/animal';
import { figure_cartpusher_action } from 'figuretype/cartpusher';
import { figure_warehouseman_action } from 'figuretype/cartpusher';
import { figure_protestor_action } from 'figuretype/crime';
import { figure_criminal_action } from 'figuretype/crime';
import { figure_rioter_action } from 'figuretype/crime';
import { figure_docker_action } from 'figuretype/docker';
import { figure_editor_flag_action } from 'figuretype/editor';
import { figure_enemy43_spear_action } from 'figuretype/enemy';
import { figure_enemy44_sword_action } from 'figuretype/enemy';
import { figure_enemy45_sword_action } from 'figuretype/enemy';
import { figure_enemy_camel_action } from 'figuretype/enemy';
import { figure_enemy_elephant_action } from 'figuretype/enemy';
import { figure_enemy_chariot_action } from 'figuretype/enemy';
import { figure_enemy49_fast_sword_action } from 'figuretype/enemy';
import { figure_enemy50_sword_action } from 'figuretype/enemy';
import { figure_enemy51_spear_action } from 'figuretype/enemy';
import { figure_enemy52_mounted_archer_action } from 'figuretype/enemy';
import { figure_enemy53_axe_action } from 'figuretype/enemy';
import { figure_enemy_gladiator_action } from 'figuretype/enemy';
import { figure_enemy_caesar_legionary_action } from 'figuretype/enemy';
import { figure_entertainer_action } from 'figuretype/entertainer';
import { figure_engineer_action } from 'figuretype/maintenance';
import { figure_prefect_action } from 'figuretype/maintenance';
import { figure_worker_action } from 'figuretype/maintenance';
import { figure_market_buyer_action } from 'figuretype/market';
import { figure_delivery_boy_action } from 'figuretype/market';
import { building_type } from 'building/type';
import { building } from 'building/building';
import { figure_immigrant_action } from 'figuretype/migrant';
import { figure_emigrant_action } from 'figuretype/migrant';
import { figure_homeless_action } from 'figuretype/migrant';
import { figure_explosion_cloud_action } from 'figuretype/missile';
import { figure_arrow_action } from 'figuretype/missile';
import { figure_spear_action } from 'figuretype/missile';
import { figure_javelin_action } from 'figuretype/missile';
import { figure_bolt_action } from 'figuretype/missile';
import { figure_indigenous_native_action } from 'figuretype/native';
import { figure_priest_action } from 'figuretype/service';
import { figure_school_child_action } from 'figuretype/service';
import { figure_teacher_action } from 'figuretype/service';
import { figure_librarian_action } from 'figuretype/service';
import { figure_barber_action } from 'figuretype/service';
import { figure_bathhouse_worker_action } from 'figuretype/service';
import { figure_doctor_action } from 'figuretype/service';
import { figure_missionary_action } from 'figuretype/service';
import { figure_patrician_action } from 'figuretype/service';
import { figure_labor_seeker_action } from 'figuretype/service';
import { figure_market_trader_action } from 'figuretype/service';
import { figure_tax_collector_action } from 'figuretype/service';
import { figure_military_standard_action } from 'figuretype/soldier';
import { figure_soldier_action } from 'figuretype/soldier';
import { figure_trade_caravan_action } from 'figuretype/trader';
import { figure_trade_caravan_donkey_action } from 'figuretype/trader';
import { figure_native_trader_action } from 'figuretype/trader';
import { figure_trade_ship_action } from 'figuretype/trader';
import { figure_ballista_action } from 'figuretype/wall';
import { figure_tower_sentry_action } from 'figuretype/wall';
import { figure_flotsam_action } from 'figuretype/water';
import { figure_shipwreck_action } from 'figuretype/water';
import { figure_fishing_boat_action } from 'figuretype/water';
function figure_nobody_action(f: figure) {
}
let figure_action_callbacks: void ([] = new Array().fill({
    figure_nobody_action, //0
    figure_immigrant_action,
    figure_emigrant_action,
    figure_homeless_action,
    figure_cartpusher_action,
    figure_labor_seeker_action,
    figure_explosion_cloud_action,
    figure_tax_collector_action,
    figure_engineer_action,
    figure_warehouseman_action,
    figure_prefect_action, //10
    figure_soldier_action,
    figure_soldier_action,
    figure_soldier_action,
    figure_military_standard_action,
    figure_entertainer_action,
    figure_entertainer_action,
    figure_entertainer_action,
    figure_entertainer_action,
    figure_trade_caravan_action,
    figure_trade_ship_action, //20
    figure_trade_caravan_donkey_action,
    figure_protestor_action,
    figure_criminal_action,
    figure_rioter_action,
    figure_fishing_boat_action,
    figure_market_trader_action,
    figure_priest_action,
    figure_school_child_action,
    figure_teacher_action,
    figure_librarian_action, //30
    figure_barber_action,
    figure_bathhouse_worker_action,
    figure_doctor_action,
    figure_doctor_action,
    figure_worker_action,
    figure_editor_flag_action,
    figure_flotsam_action,
    figure_docker_action,
    figure_market_buyer_action,
    figure_patrician_action, //40
    figure_indigenous_native_action,
    figure_tower_sentry_action,
    figure_enemy43_spear_action,
    figure_enemy44_sword_action,
    figure_enemy45_sword_action,
    figure_enemy_camel_action,
    figure_enemy_elephant_action,
    figure_enemy_chariot_action,
    figure_enemy49_fast_sword_action,
    figure_enemy50_sword_action, //50
    figure_enemy51_spear_action,
    figure_enemy52_mounted_archer_action,
    figure_enemy53_axe_action,
    figure_enemy_gladiator_action,
    figure_nobody_action,
    figure_nobody_action,
    figure_enemy_caesar_legionary_action,
    figure_native_trader_action,
    figure_arrow_action,
    figure_javelin_action, //60
    figure_bolt_action,
    figure_ballista_action,
    figure_nobody_action,
    figure_missionary_action,
    figure_seagulls_action,
    figure_delivery_boy_action,
    figure_shipwreck_action,
    figure_sheep_action,
    figure_wolf_action,
    figure_zebra_action, //70
    figure_spear_action,
    figure_hippodrome_horse_action,
    figure_nobody_action,
    figure_nobody_action,
    figure_nobody_action,
    figure_nobody_action,
    figure_nobody_action,
    figure_nobody_action,
    figure_nobody_action
});
export function figure_action_handle() {
    city_figures_reset();
    city_entertainment_set_hippodrome_has_race(0);
    for (let i: number = 1; i < MAX_FIGURES; i++) {
        let f: figure = figure_get(i);
        if (f.state) {
            if (f.targeted_by_figure_id) {
                let attacker: figure = figure_get(f.targeted_by_figure_id);
                if (attacker.state != FIGURE_STATE_ALIVE) {
                    f.targeted_by_figure_id = 0;
                }
                if (attacker.target_figure_id != i) {
                    f.targeted_by_figure_id = 0;
                }
            }
            figure_action_callbacks[f.type](f);
            if (f.state == FIGURE_STATE_DEAD) {
                figure_delete(f);
            }
        }
    }
}
