import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { init, loop } from "../game/main";

import { MatchStart } from "../components/MatchStart";
import { MatchEnd } from "../components/MatchEnd";
import { MonsterState } from "../components/MonsterState";
import { MatchProgress } from "../components/MatchProgress";

import {
    getReplayInfo,
    initContractHandlers,
} from "../interactions/interactions";

import "../style/css/pages/Replay.css";

let global = {
    scene: null,
    objects: {
        player: {},
        monster: {},
        actions: {
            fire: { sprite: null, isActive: false },
        },
    },
};

const Replay = ({ state, updateState }) => {
    const { matchId, progressNFT_Id } = useParams();
    const [replayInfo, setReplayInfo] = useState(null);
    const [moveInfo, setMoveInfo] = useState(null);
    const [isStarting, setIsStarting] = useState(true);
    const [isFinished, setIsFinished] = useState(false);
    global.setMoveInfo = setMoveInfo;
    global.setIsStarting = setIsStarting;
    global.setIsFinished = setIsFinished;

    useEffect(() => {
        (async () => {
            updateState({
                modalOpen: true,
                modalMessage: "Fetching Match Replay...",
            });
            let _replayInfo = await getReplayInfo({
                matchId: parseInt(matchId),
            });

            while (_replayInfo.isPending) {
                await new Promise((resolve) => setTimeout(resolve, 5000));

                _replayInfo = await getReplayInfo({
                    matchId: parseInt(matchId),
                });
                updateState({
                    modalOpen: true,
                    modalMessage: "Waiting for Randomness to get fullfiled...",
                });
            }

            setTimeout(async () => {
                setIsStarting(false);
            }, 1500);
            init(global, _replayInfo.monsterIds);
            loop(global, _replayInfo.moves);
            setMoveInfo(_replayInfo.moves[0]);

            setReplayInfo(_replayInfo);
            updateState({
                modalOpen: false,
                alertOpen: false,
            });
        })();
        return () => {
            const element = document.getElementById("GameReplay");
            if (element != null) element.remove();
            global = {};
        };
    }, []);

    if (moveInfo == null || replayInfo == null) {
        return null;
    }

    return (
        <div>
            <MatchStart
                isStarting={isStarting}
                monsters={replayInfo.monsterIds}
            ></MatchStart>
            <MonsterState
                move={moveInfo}
                affectedMonster={1 - moveInfo.action.monster}
            ></MonsterState>
            <MatchProgress
                monsters={replayInfo.monsterIds}
                moves={replayInfo.moves}
                move={moveInfo}
            ></MatchProgress>
            <MatchEnd
                global={global}
                isFinished={isFinished}
                canClaim={replayInfo.canClaim}
                matchId={matchId}
                updateState={updateState}
                progressNFT_Id={progressNFT_Id}
            ></MatchEnd>
        </div>
    );
};

export { Replay };
