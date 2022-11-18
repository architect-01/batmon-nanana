import * as THREE from "three";
import * as cfg from "../../../config";

const animateFire = () => {
    const { actions } = window.game.global.objects;
    const { di, move } = window.game;

    if (move.action.effect != "fire") return;

    const isMonster0 = move.action.monster == 0;

    const { fire } = isMonster0 ? actions.monster0 : actions.monster1;

    const startPosY = isMonster0
        ? cfg.MONSTER0_POSITION_Y
        : cfg.MONSTER1_POSITION_Y;

    const endPosY = isMonster0
        ? cfg.MONSTER1_POSITION_Y
        : cfg.MONSTER0_POSITION_Y;

    if (di == 0) {
        fire.sprite.position.x = 0;
        fire.sprite.position.y = startPosY;
        fire.sprite.position.z = 0;
    } else {
        const step =
            ((isMonster0 ? -1 : 1) * Math.abs(startPosY - endPosY)) /
            (cfg.FIRE.N_STEPS - 10);
        fire.sprite.position.y += step;
        fire.sprite.material.rotation += 0.05;
    }
    window.game.di += 1;
    if (window.game.di > cfg.FIRE.N_STEPS - 10) {
        fire.sprite.position.z = 1000;
    }
    if (window.game.di == cfg.FIRE.N_STEPS) {
        window.game.nextMove();
    }
};
export { animateFire };
