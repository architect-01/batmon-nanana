import * as cfg from "../../config";

const getCurrentLevelInfo = async ({ _contracts, progressNFT_Id }) => {
    const level =
        (await _getCurrentLevel({ _contracts, progressNFT_Id })) +
        cfg.FRONT_CONSTANTS.nMonsterSkew;
    const oposingMonster = await _buildMonster({ _contracts, id: level });
    const availableMonsters = await _getAvailableMonsters({
        _contracts,
        progressNFT_Id,
    });

    return {
        loaded: true,
        level,
        oposingMonster,
        availableMonsters,
    };
};

const startBattle = async ({
    _contracts,
    progressNFT_Id,
    monsterId,
    sequences,
}) => {
    const sequencesT = sequences[0].map((_, colIndex) =>
        sequences.map((row) =>
            row[colIndex] == null
                ? cfg.FRONT_CONSTANTS.unusedSkillId
                : row[colIndex]
        )
    );

    console.log({ progressNFT_Id, monsterId, sequencesT });

    const matchId = await _contracts.batmon.matchCounter();

    console.log({
        progressNFT_owner: await _contracts.progressNFT.ownerOf(progressNFT_Id),
    });

    console.log({
        tx: await _contracts.batmon.battle(
            progressNFT_Id,
            monsterId,
            sequencesT
        ),
    });

    return { matchId };
};

const _getAvailableMonsters = async ({ _contracts, progressNFT_Id }) => {
    const currLevel = await _getCurrentLevel({ _contracts, progressNFT_Id });

    const monsters = [];
    for (let id = 0; id < currLevel + cfg.FRONT_CONSTANTS.nMonsterSkew; id++) {
        monsters.push(await _buildMonster({ _contracts, id }));
    }
    console.log({ monsters });
    return monsters;
};

const randomInt = (max = 23) => {
    return `${Math.floor(Math.random() * max)}`;
};

const _buildMonster = async ({ _contracts, id }) => {
    const { name, health, speed, stamina } = await _contracts.batmon.monsters(
        id
    );

    const imgPath = cfg.FRONT_CONSTANTS.monsterImgPaths[id];

    const skills = [];
    for (let i = 0; i < cfg.FRONT_CONSTANTS.maxSkillCount; ++i) {
        console.log({ X: await _contracts.batmon.monsterIdToSkillIds(id, i) });
        const skillId = parseInt(
            (await _contracts.batmon.monsterIdToSkillIds(id, i)).toString()
        );
        if (skillId != cfg.FRONT_CONSTANTS.unusedSkillId) {
            skills.push(
                await _buildSkill({
                    _contracts,
                    id: skillId,
                })
            );
        }
    }

    console.log({ id, skills });

    return {
        id,
        name,
        imgPath,
        stats: {
            health: health.toString(),
            speed: speed.toString(),
            stamina: stamina.toString(),
        },
        skills,
    };
};

const _buildSkill = async ({ _contracts, id }) => {
    const { name, damage } = await _contracts.batmon.skills(id);

    const imgPath = cfg.FRONT_CONSTANTS.skillImgPaths[id];
    return {
        id,
        name,
        imgPath,
        damage: damage.toString(),
    };
};

const _getCurrentLevel = async ({ _contracts, progressNFT_Id }) => {
    return parseInt(
        (await _contracts.progressNFT.tokenIdToLevel(progressNFT_Id)).toString()
    );
};

export { getCurrentLevelInfo, startBattle, _buildSkill };
