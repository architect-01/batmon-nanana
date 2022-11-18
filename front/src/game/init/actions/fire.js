import * as THREE from "three";
import * as cfg from "../../../config";

const initFire = (global, isMonster0) => {
    const color = isMonster0 ? cfg.MONSTER0_COLOR : cfg.MONSTER1_COLOR;

    const loader = new THREE.TextureLoader();

    const material = new THREE.SpriteMaterial({
        map: loader.load(cfg.ACTIONS[0].imgPath),
        color,
    });

    const sprite = new THREE.Sprite(material);
    sprite.position.set(0, 0, 1000);
    sprite.scale.set(0.5, 0.5, 1000);
    global.scene.add(sprite);
    return { sprite, isActive: true };
};

export { initFire };
