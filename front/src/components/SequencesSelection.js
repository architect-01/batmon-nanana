import { useState } from "react";

import * as cfg from "../config";

const Tile = ({ monster, x, y, verify, callback, selected }) => {
    const [currentOptionId, setCurrentOptionId] = useState(selected[y][x]);

    const update = () => {
        if (verify({ x, y }) == true) {
            let nextId;
            if (currentOptionId === null) {
                nextId = 0;
            } else {
                nextId =
                    monster.skills.length > currentOptionId + 1
                        ? currentOptionId + 1
                        : 0;
            }
            setCurrentOptionId(nextId);
            callback({ x, y, id: nextId });
        }
    };

    return (
        <div className="Tile" onClick={update}>
            {currentOptionId == null ? null : (
                <img src={monster.skills[currentOptionId].imgPath}></img>
            )}
        </div>
    );
};

const SequencesSelection = ({ monster, selected }) => {
    const verify = ({ x, y }) => {
        if (x == 0) return true;
        if (selected[y][x - 1] != null) return true;
        return false;
    };

    const updateTile = ({ x, y, id }) => {
        if (verify({ x, y })) selected[y][x] = monster.skills[id].id;
    };

    const SkillRow = ({ y }) => {
        return (
            <div className="SkillRowContainer">
                <div className="SkillRow">
                    {selected[y].map((e2, k2) => (
                        <Tile
                            key={`k2_${k2}`}
                            monster={monster}
                            x={k2}
                            y={y}
                            verify={verify}
                            callback={updateTile}
                            selected={selected}
                        ></Tile>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="SequencesSelection" onClick={() => console.log(1)}>
            <SkillRow y={0}></SkillRow>
            <SkillRow y={1}></SkillRow>
            <SkillRow y={2}></SkillRow>
        </div>
    );
};

export { SequencesSelection };
