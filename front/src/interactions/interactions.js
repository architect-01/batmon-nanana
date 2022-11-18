import { ethers } from "ethers";
import * as playModule from "./pages/play";
import * as replayModule from "./pages/replay";

import * as cfg from "../config";

import BATMON_ARTIFACT from "./artifacts/contracts/BatMon.sol/BatMon.json";
import PROGRESS_NFT_ARTIFACT from "./artifacts/contracts/ProgressNFT.sol/ProgressNFT.json";

const delay = (delayInms = 1000) => {
    return new Promise((resolve) => setTimeout(resolve, delayInms));
};

let _provider;
const _contracts = {
    batmon: null,
    progressNFT: null,
};

let _state;
let _updateState;

const setup = ({ state, updateState }) => {
    _state = state;
    _updateState = updateState;
};

const connectWallet = async () => {
    await delay(50);

    if (window.ethereum == null) {
        return { err: "You need to install Metamask" };
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const account = await signer.getAddress();

    _contracts.batmon = new ethers.Contract(
        cfg.BACK_CONSTANTS.batmonAddr,
        BATMON_ARTIFACT.abi,
        provider
    ).connect(signer);

    _contracts.progressNFT = new ethers.Contract(
        cfg.BACK_CONSTANTS.progressNFTAddr,
        PROGRESS_NFT_ARTIFACT.abi,
        provider
    ).connect(signer);

    _updateState({ account });

    return { err: "", account };
};

const initContractHandlers = async () => {};

const register = async () => {
    await delay(2000);
    await _contracts.batmon.register();

    return { err: "", progressNFT_Id: null };
};

const getCurrentLevelInfo = async ({ progressNFT_Id }) => {
    await delay(2000);
    return await playModule.getCurrentLevelInfo({ _contracts, progressNFT_Id });
};

const getReplayInfo = async ({ matchId }) => {
    await delay(2000);
    return await replayModule.getReplayInfo({ _contracts, matchId });
};

const startBattle = async ({ progressNFT_Id, monsterId, sequences }) => {
    await delay(2000);
    return await playModule.startBattle({
        _contracts,
        progressNFT_Id,
        monsterId,
        sequences,
    });
};

const claimMonster = async ({ matchId }) => {
    await delay(1000);
    return await replayModule.claimMonster({
        _provider,
        _contracts,
        matchId,
    });
};

const getProgressionInfo = async () => {
    await delay(2000);

    const progressNFT_tokenCounter = parseInt(
        (await _contracts.progressNFT.tokenCounter()).toString()
    );
    console.log({ progressNFT_tokenCounter });

    const info = { tracks: [] };

    for (
        let progressNFT_Id = 0;
        progressNFT_Id < progressNFT_tokenCounter;
        ++progressNFT_Id
    ) {
        const nftOwner = _state.account;
        console.log(nftOwner);

        if (nftOwner == _state.account) {
            info.tracks.push({
                progressNFT_Id,
                levelInfo: await getCurrentLevelInfo({
                    progressNFT_Id,
                }),
            });
        }
    }

    return {
        err: "",
        info,
    };
};

export {
    setup,
    initContractHandlers,
    connectWallet,
    register,
    getCurrentLevelInfo,
    getReplayInfo,
    startBattle,
    claimMonster,
    getProgressionInfo,
};
