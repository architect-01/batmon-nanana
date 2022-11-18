import { useEffect, useState } from "react";

import * as cfg from "../config";
import { getCurrentLevelInfo } from "../interactions/interactions";

import "../style/css/components/CurrentLevel.css";

const CurrentLevel = ({ levelInfo }) => {
    if (levelInfo.level == null) {
        return <div className="CurrentLevel">Loading</div>;
    }
    console.log({ levelInfo });
    return (
        <div className="CurrentLevel">
            <div className="SubSection">
                <img src={levelInfo.oposingMonster.imgPath}></img>
            </div>

            <div className="SubSection">
                <h2>Stats:</h2>
                <h3>Health: {levelInfo.oposingMonster.stats.health}</h3>
                <h3>Speed: {levelInfo.oposingMonster.stats.speed}</h3>
                <h3>Stamina: {levelInfo.oposingMonster.stats.stamina}</h3>
            </div>

            <div className="SubSection">
                <h2>Skills:</h2>

                {levelInfo.oposingMonster.skills.map((skill) => (
                    <div className="Skill">
                        <img src={skill.imgPath}></img>
                        <h3>{skill.name}</h3>
                        <h3>Damage: {skill.damage}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export { CurrentLevel };
