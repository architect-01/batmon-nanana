import * as THREE from "three";
import * as cfg from "../../../config";

const animateDummy = () => {
    if (window.game.move.action.effect != "dummy") return;

    window.game.di += 1;

    if (window.game.di == cfg.DUMMY.N_STEPS) {
        window.game.nextMove();
    }
};
export { animateDummy };
