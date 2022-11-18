import * as THREE from "three";
import * as cfg from "../../../config";

const animateLaser = () => {
    const { actions } = window.game.global.objects;

    const { di, move } = window.game;
    const { laser } =
        move.action.monster == 0 ? actions.monster0 : actions.monster1;
    if (move.action.effect != "laser") return;

    if (di == 0) {
        for (const line of laser.lines) {
            line.material.transparent = true;

            line.material.opacity = 1.0;
        }
    } else {
        for (const line of laser.lines) {
            line.material.transparent = true;

            line.material.opacity = window.game.di % 4 == 0 ? 0.0 : 1.0;
        }
    }

    window.game.di += 1;

    if (window.game.di == cfg.LASER.N_STEPS) {
        for (const line of laser.lines) {
            line.material.opacity = 0.0;
        }
        window.game.nextMove();
    }
};
export { animateLaser };
