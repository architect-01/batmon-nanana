import React, { useEffect } from "react";
import { Carousel } from "react-carousel3";

import * as cfg from "../config";
import { getAvailableMonsters } from "../interactions/interactions";

const style = {
    width: 297,
    height: 296,
};

const MonsterCarousel = ({ monsters, monsterSelected, setMonsterSelected }) => {
    useEffect(() => {
        (async () => {
            for (const monster of monsters) {
                const element = document.getElementById(
                    `CarouselItem_${monster.id}`
                );
                element.onclick = () => {
                    setMonsterSelected(monster);
                };
            }
        })();
    }, []);

    return (
        <div
            className="MonsterCarousel"
            style={{
                display: "flex",
                justifyContent: "center",
                background: "transparent",
            }}
        >
            <Carousel
                height={500}
                width={1000}
                yOrigin={0}
                yRadius={100}
                autoPlay={false}
            >
                {monsters.map((monster) => (
                    <div
                        key={monster.id}
                        style={style}
                        id={`CarouselItem_${monster.id}`}
                    >
                        <img
                            width="300px"
                            alt=""
                            src={monster.imgPath}
                            className={`${
                                monsterSelected.id == monster.id
                                    ? "SelectedMonster"
                                    : ""
                            }`}
                        />
                        <h2>{monster.name}</h2>
                        <div className="MonsterInfoDiv">
                            <div>
                                {" "}
                                <h3>Health: {monster.stats.health}</h3>
                                <h3>Speed: {monster.stats.speed}</h3>
                                <h3>Stamina: {monster.stats.stamina}</h3>
                            </div>
                            <div>
                                {" "}
                                {monster.skills.map((skill, key) => (
                                    <div className="Skill">
                                        <img src={skill.imgPath}></img>
                                        <h3>{skill.name}</h3>
                                        <h3>Damage: {skill.damage}</h3>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export { MonsterCarousel };
