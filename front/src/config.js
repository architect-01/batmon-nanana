const FRONT_CONSTANTS = {
    appName: "BatMon:NaNaNa",
    connectWalletText: "Connect Metamask wallet",
    logoMonsterImgPath: "/images/monsters/Protezar.png",
    organizatorImgPath: "/chainlink.png",
    hackathonDescriptionText: " Fall Hackathon 2022",
    monsterImgPaths: [
        "/images/monsters/Protezar.png",
        "/images/monsters/Raret.png",
        "/images/monsters/Trapnear.png",
        "/images/monsters/Unurak.png",
        "/images/monsters/Warwear.png",
        "/images/monsters/Wizket.png",
    ],
    skillImgPaths: [
        "/images/actions/fire.png",
        "/images/actions/laser.png",
        "/images/actions/thunder.png",
    ],
    refreshingPeriod: 3000,
    alarmActiveTime: 3000,
    maxSkillCount: 5,
    unusedSkillId: 4095,
    nMonsterSkew: 2,
    devpostLink: "",
    overviewText:
        "**BatMon:NaNaNa** is an on-chain game where the player is thrown into an unfamiliar suroundings and must fight against terrible monsters in order to survive. The player moves through levels, encountering more powerful monsters on each level, and battles them - BatMon (get it ? :)). If he wins, he captures them and advances to the next level. Each monster has an unique set of skills that can be combined to form sequences giving rise to Programmable Battle Monsters.",
};

const BACK_CONSTANTS = {
    batmonAddr: "0x71060AfF9d562474915b099df231f1864D73c71E",
    progressNFTAddr: "0x2A933824EfE133d5689E225b58A2598e1ab6829f",
};

const DEFAULT_APP_STATE = {
    account: null,
    modalOpen: false,
    modalMessage: "",
    alertOpen: false,
    alertMessage: "Alert:",
    alertType: "danger",
};

const APP_CONSTANTS = {
    localStorageKey: "progmon-state",
};

const ProgMon = {
    address: "TFYw4KdFXTxVuuWaPT7xAxZu6BC26zCoLd",
};

const ProgressNFT = {
    address: "0x120566bebFCd8137D5dA7322f9358BDA8552a59B",
};

const DUMMY = {
    N_STEPS: 50,
};
const FIRE = {
    N_STEPS: 25,
};

const LASER = {
    N_STEPS: 15,
};

const THUNDER = {
    N_STEPS: 15,
};

const N_FRAMES_PER_MOVE = 100;

const MONSTER0_POSITION_Y = 4;
const MONSTER1_POSITION_Y = -4;
const MONSTER0_COLOR = 0xff0000;
const MONSTER1_COLOR = 0x00ffff;

const N_STARS = 10;

const MONSTERS = [
    { name: "Protezar", imgPath: "/images/monsters/Protezar.png" },
    { name: "Raret", imgPath: "/images/monsters/Raret.png" },
    { name: "Trapnear", imgPath: "/images/monsters/Trapnear.png" },
    { name: "Unurak", imgPath: "/images/monsters/Unurak.png" },
    { name: "Warwear", imgPath: "/images/monsters/Warwear.png" },
    { name: "Wizket", imgPath: "/images/monsters/Wizket.png" },
];

const ACTIONS = [
    {
        name: "fire",
        imgPath: "/images/actions/fire.png",
    },
    {
        name: "laser",
        imgPath: "/images/actions/laser.png",
    },
    {
        name: "lighting",
        imgPath: "/images/actions/thunder.png",
    },
];

const ACTIONS_PER_MONSTER = {
    azgar: [ACTIONS[0], ACTIONS[1]],
    drakl: [ACTIONS[1]],
    grothem: [ACTIONS[0]],
};

const MAX_SKILLS_COUNT = 5;

export {
    FRONT_CONSTANTS,
    BACK_CONSTANTS,
    DEFAULT_APP_STATE,
    APP_CONSTANTS,
    DUMMY,
    FIRE,
    LASER,
    THUNDER,
    N_FRAMES_PER_MOVE,
    MONSTER0_POSITION_Y,
    MONSTER1_POSITION_Y,
    MONSTER0_COLOR,
    MONSTER1_COLOR,
    N_STARS,
    MONSTERS,
    ACTIONS,
    ACTIONS_PER_MONSTER,
    ProgMon,
    ProgressNFT,
    MAX_SKILLS_COUNT,
};
