import * as THREE from "three";

import * as cfg from "../../../config";

const initMonster = (global, monsterId, isMonster0) => {
    const loader = new THREE.TextureLoader();
    console.log(cfg.MONSTERS[monsterId].imgPath);
    const material = new THREE.SpriteMaterial({
        map: loader.load(cfg.MONSTERS[monsterId].imgPath),
    });

    const sprite = new THREE.Sprite(material);

    sprite.position.y = isMonster0
        ? cfg.MONSTER0_POSITION_Y
        : cfg.MONSTER1_POSITION_Y;

    global.scene.add(sprite);

    return { sprite, isActive: false };
};

export { initMonster };
