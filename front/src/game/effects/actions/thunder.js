import * as THREE from "three";
import * as cfg from "../../../config";

const animateThunder = () => {
    const { actions } = window.game.global.objects;

    const { di, move } = window.game;
    const { thunder } =
        move.action.monster == 0 ? actions.monster0 : actions.monster1;
    if (move.action.effect != "thunder") return;

    const isMonster0 = move.action.monster == 0;

    const flipY = isMonster0 ? 1 : -1;

    if (di == 0) {
        thunder.sprite.position.z = 0;
    } else {
        // thunder.sprite.material.opacity = di % 2 == 0 ? 1.0 : 0;

        if (di % 4 == 0) {
            thunder.sprite.material.map.center.set(0.5, 0.5);
            thunder.sprite.material.map.repeat.set(-1, flipY);
        } else {
            thunder.sprite.material.map.center.set(0.5, 0.5);
            thunder.sprite.material.map.repeat.set(1, flipY);
        }

        thunder.sprite.material.opacity =
            di % 3 == 0 ? 1.0 : 0.2 * (1 + (di % 4));
    }
    window.game.di += 1;

    if (window.game.di == cfg.THUNDER.N_STEPS) {
        thunder.sprite.position.z = 1000;

        window.game.nextMove();
    }
};
export { animateThunder };
