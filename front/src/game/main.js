import * as THREE from "three";
import * as cfg from "../config";

import { initMonster } from "./init/monsters/monster";
import { initFire } from "./init/actions/fire";
import { initLaser } from "./init/actions/laser";

import { animateMonster } from "./effects/monsters/monster";
import { animateFire } from "./effects/actions/fire";
import { animateLaser } from "./effects/actions/laser";
import { animateDummy } from "./effects/actions/dummy";
import { animateThunder } from "./effects/actions/thunder";
import { initThunder } from "./init/actions/thunder";

const init = (global, monsters) => {
    console.log("init called");
    const scene = new THREE.Scene();
    // scene.background = new THREE.Color(0x000000);
    const camera = new THREE.PerspectiveCamera(
        100,
        window.innerWidth / window.innerHeight,
        1,
        100
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0); // the default
    renderer.setSize(window.innerWidth, window.innerHeight);
    const newEl = document.createElement("div");
    newEl.id = "GameReplay";
    newEl.appendChild(renderer.domElement);
    document.body.appendChild(newEl);

    camera.position.z = 6;

    global.scene = scene;

    global.camera = camera;
    global.renderer = renderer;

    global.objects = { actions: { monster0: {}, monster1: {} } };

    global.objects.monster0 = initMonster(global, monsters[0], true);
    global.objects.monster1 = initMonster(global, monsters[1], false);

    global.objects.actions.monster0.fire = initFire(global, true);
    global.objects.actions.monster0.laser = initLaser(global, true);

    global.objects.actions.monster1.fire = initFire(global);
    global.objects.actions.monster1.laser = initLaser(global);

    global.objects.actions.monster0.thunder = initThunder(global, true);
    global.objects.actions.monster1.thunder = initThunder(global);

    window.game = { global, di: 0 };
};

const loop = (global, moves) => {
    window.game.moves = moves;
    window.game.move = moves[0];
    window.game.moveId = 0;
    window.game.startReplay = () => {
        window.game.di = 0;
        window.game.moveId = 0;
        global.setIsFinished(false);
        global.setIsStarting(true);
        setTimeout(() => {
            global.setIsStarting(false);
        }, 1000);
    };
    window.game.nextMove = () => {
        window.game.di = 0;
        window.game.moveId += 1;
        if (window.game.moves.length > window.game.moveId) {
            window.game.move = window.game.moves[window.game.moveId];
            global.setMoveInfo(window.game.move);
        } else {
            global.setIsFinished(true);
        }
    };

    const animation = () => {
        requestAnimationFrame(animation);

        animateDummy();
        animateFire();
        animateThunder();
        animateLaser();
        animateMonster();

        global.renderer.render(global.scene, global.camera);
    };
    animation();
};

export { init, loop };
