import * as THREE from "three";
import * as cfg from "../../../config";

const initLaser = (global, isMonster0) => {
    const color = isMonster0 ? cfg.MONSTER0_COLOR : cfg.MONSTER1_COLOR;
    const delta = 0.1;
    const signDelta = isMonster0 ? -delta : delta;

    const material = new THREE.LineBasicMaterial({
        color,
        linewidth: 2,
    });

    let lines = [];
    let points = [];
    let geometry;

    points = [
        new THREE.Vector3(0, cfg.MONSTER1_POSITION_Y, 0),
        new THREE.Vector3(0, cfg.MONSTER0_POSITION_Y, 0),
    ];
    geometry = new THREE.BufferGeometry().setFromPoints(points);
    lines.push(new THREE.Line(geometry, material));

    points = [
        new THREE.Vector3(delta, cfg.MONSTER1_POSITION_Y + signDelta, 0),
        new THREE.Vector3(delta, cfg.MONSTER0_POSITION_Y + signDelta, 0),
    ];
    geometry = new THREE.BufferGeometry().setFromPoints(points);
    lines.push(new THREE.Line(geometry, material));

    points = [
        new THREE.Vector3(-delta, cfg.MONSTER1_POSITION_Y + signDelta, 0),
        new THREE.Vector3(-delta, cfg.MONSTER0_POSITION_Y + signDelta, 0),
    ];
    geometry = new THREE.BufferGeometry().setFromPoints(points);
    lines.push(new THREE.Line(geometry, material));

    for (const line of lines) {
        line.material.transparent = true;
        line.material.opacity = 0;
        global.scene.add(line);
    }

    return { lines, isActive: true };
};

export { initLaser };
