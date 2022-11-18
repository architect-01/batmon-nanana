import * as cfg from "../../config";

import { _buildSkill } from "./play";

const getReplayInfo = async ({ _contracts, matchId }) => {
    try {
        console.log({ _contracts, matchId });
        const {
            monster0_health,
            monster1_health,
            canClaim,
            isFinal,
            skillId,
            turn,
        } = await _contracts.batmon.viewPlayOut(matchId);
        console.log({ canClaim });

        const move = {
            id: 0,
            state: {
                monster0: { health: (133).toString() },
                monster1: { health: (44444).toString() },
            },
            action: {
                monster: 2,
                effect: "dummy",
                damage: -100,
            },
        };

        const moves = [move];

        const skills = [];
        for (let i = 0; i < cfg.FRONT_CONSTANTS.skillImgPaths.length; i++) {
            skills.push((await _buildSkill({ _contracts, id: i })).name);
        }

        console.log({ skills });
        for (let i = 0; i < 100; ++i) {
            moves.push({
                id: i + 1,
                state: {
                    monster0: { health: monster0_health[i].toString() },
                    monster1: { health: monster1_health[i].toString() },
                },
                action: {
                    monster: parseInt(turn[i].toString()),
                    effect: skills[parseInt(skillId[i].toString())],
                    damage: 10,
                },
            });
            if (isFinal[i]) {
                break;
            }
        }

        console.log({ moves });

        const { monster0_Id, monster1_Id } = await _contracts.batmon.matches(
            matchId
        );

        console.log(monster0_Id, monster1_Id);
        return {
            isPending: false,
            canClaim,
            monsterIds: [monster0_Id, monster1_Id],
            moves,
        };
    } catch {
        return {
            isPending: true,
            canClaim: false,
            monsterIds: [0, 0],
            moves: [],
        };
    }
};

const claimMonster = async ({ _provider, _contracts, matchId }) => {
    await _contracts.batmon.claim(matchId);
};

export { getReplayInfo, claimMonster };
