import * as THREE from "three";
import * as cfg from "../../../config";

const animateMonster = () => {
    const { monster0, monster1, actions } = window.game.global.objects;
    const { di, move } = window.game;

    const isMonster0 = move.action.monster == 0;

    const monster = isMonster0 ? monster1 : monster0;

    const monsterStartPosY = isMonster0
        ? cfg.MONSTER1_POSITION_Y
        : cfg.MONSTER0_POSITION_Y;

    if (move.action.effect == "laser") {
        monster.sprite.material.opacity = 0.5 * (di % 2) + 0.5;
        monster.sprite.position.x = 0.05 * (di % 4 == 0 ? -1 : 1);
        monster.sprite.position.y =
            monsterStartPosY + 0.05 * (di % 4 == 0 ? 1 : -1);
        if (di == cfg.LASER.N_STEPS) {
            monster.sprite.material.opacity = 1;
            monster.sprite.position.x = 0;
            monster.sprite.position.y = monsterStartPosY;
        }
    }
    if (move.action.effect == "fire") {
        if (di > cfg.FIRE.N_STEPS - 10 && di < cfg.FIRE.N_STEPS - 1) {
            monster.sprite.material.opacity = 0.5 * (di % 2) + 0.5;
            monster.sprite.position.x = 0.05 * (di % 2 == 0 ? -1 : 1);
        } else {
            monster.sprite.material.opacity = 1;
            monster.sprite.material.opacity = 1;
            monster.sprite.position.x = 0;
            monster.sprite.position.y = monsterStartPosY;
        }
    }
};
export { animateMonster };
