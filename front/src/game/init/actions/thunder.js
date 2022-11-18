import * as THREE from "three";
import * as cfg from "../../../config";

const initThunder = (global, isMonster0) => {
    const color = isMonster0 ? cfg.MONSTER0_COLOR : cfg.MONSTER1_COLOR;

    const loader = new THREE.TextureLoader();

    const material = new THREE.SpriteMaterial({
        map: loader.load(cfg.ACTIONS[2].imgPath),
        color,
    });

    const sprite = new THREE.Sprite(material);
    sprite.position.set(0, isMonster0 ? -0.3 : +0.3, 1000);
    sprite.scale.set(3, 8, 1);
    sprite.material.side = THREE.DoubleSide;
    global.scene.add(sprite);
    return { sprite, isActive: true, addjustedFor: "monster0" };
};

export { initThunder };
