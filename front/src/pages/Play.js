import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { CurrentLevel } from "../components/CurrentLevel";
import { MonsterCarousel } from "../components/MonsterCarousel";
import { SequencesSelection } from "../components/SequencesSelection";

import { getCurrentLevelInfo, startBattle } from "../interactions/interactions";

import "../style/css/pages/Play.css";

let sequences = [];

const Play = ({ state, updateState }) => {
    const navigate = useNavigate();
    const { progressNFT_Id } = useParams();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMsg, setModalMsg] = useState(null);

    const [levelInfo, setLevelInfo] = useState({
        loaded: false,
        level: null,
        oposingMonster: null,
        availableMonsters: [],
    });

    const [monsterSelected, setMonsterSelected] = useState(null);

    useEffect(() => {
        (async () => {
            updateState({
                modalOpen: true,
                modalMessage: "Fetching information...",
            });
            const _levelInfo = await getCurrentLevelInfo({ progressNFT_Id });

            console.log({ _levelInfo });

            sequences = [
                [
                    _levelInfo.availableMonsters[0].skills[0].id,
                    null,
                    null,
                    null,
                    null,
                ],
                [
                    _levelInfo.availableMonsters[0].skills[0].id,
                    null,
                    null,
                    null,
                    null,
                ],
                [
                    _levelInfo.availableMonsters[0].skills[0].id,
                    null,
                    null,
                    null,
                    null,
                ],
            ];
            setLevelInfo(_levelInfo);
            setMonsterSelected(_levelInfo.availableMonsters[0]);
            updateState({
                modalOpen: false,
            });
        })();
    }, []);

    if (levelInfo.loaded == false) {
        return null;
    }

    return (
        <div className="PlayPage">
            <h2 className="LevelSideInfo">Level</h2>
            <h2 className="ProgmonSideInfo">Progmon</h2>
            <h2 className="SequencesSideInfo">Sequences</h2>
            <CurrentLevel levelInfo={levelInfo}></CurrentLevel>
            <MonsterCarousel
                monsters={levelInfo.availableMonsters}
                monsterSelected={monsterSelected}
                setMonsterSelected={(m) => {
                    sequences = [
                        [m.skills[0].id, null, null, null, null],
                        [m.skills[0].id, null, null, null, null],
                        [m.skills[0].id, null, null, null, null],
                    ];
                    setMonsterSelected(m);
                    console.log({ monsterSet: m });
                }}
            ></MonsterCarousel>
            <SequencesSelection
                monster={monsterSelected}
                selected={sequences}
            ></SequencesSelection>
            <div
                className="Button"
                onClick={async () => {
                    updateState({
                        modalOpen: true,
                        modalMessage: "Transaction signing pending...",
                    });

                    console.log({ monsterSelected, progressNFT_Id });
                    const { matchId, err } = await startBattle({
                        progressNFT_Id: parseInt(progressNFT_Id),
                        monsterId: monsterSelected.id,
                        sequences,
                    });
                    updateState({
                        modalOpen: false,
                    });

                    navigate(`/replay/${progressNFT_Id}/${matchId}`);
                }}
            >
                Start Battle
            </div>
        </div>
    );
};

export { Play };
