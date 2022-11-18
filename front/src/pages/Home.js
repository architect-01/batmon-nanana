import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CurrentLevel } from "../components/CurrentLevel";

import { getProgressionInfo, register } from "../interactions/interactions";

import * as cfg from "../config";

const Home = ({ state, updateState }) => {
    const navigate = useNavigate();

    const [progressInfo, setProgressInfo] = useState(null);
    const [newProgressNFT_Id, setProgressNFT_Id] = useState(null);

    useEffect(() => {
        (async () => {
            updateState({
                modalOpen: true,
                modalMessage: "Fetching Your Progress information...",
            });
            const { err, info } = await getProgressionInfo();
            if (err == "") {
                setProgressInfo(info);
                updateState({
                    modalOpen: false,
                });
            } else {
                console.log({ err });
            }
            // setTimeout(async () => {
            //     const { err, info } = await getProgressionInfo();
            //     if (err == "") {
            //         setProgressInfo(info);
            //         updateState({
            //             modalOpen: false,
            //         });
            //     }
            // }, cfg.FRONT_CONSTANTS.refreshingPeriod);
        })();
    }, []);

    if (progressInfo == null) {
        return null;
    }

    const hasPlayedBefore = progressInfo.tracks.length > 0;

    return (
        <div className="HomePage">
            <div className="RegisterSection">
                <h2>Explanation:</h2>
                <h3 className="Description">
                    <br></br>
                    In order to start playing, you must register first. You can
                    register multiple times, with each registration triggering a
                    mint of an NFT associated with your progress in the game.
                    <br></br> <br></br>
                    These NFTs can then be traded in order to enable
                    Play-to-Earn (P2E) mechanism for the most successful
                    players.
                </h3>
                <div
                    className="Button"
                    onClick={async () => {
                        updateState({
                            modalOpen: true,
                            modalMessage: "Signature pending...",
                        });
                        const { err, progressNFT_Id } = await register();
                        if (err == "") {
                            setProgressNFT_Id(progressNFT_Id);
                        }
                        updateState({ modalOpen: false });
                        setTimeout(async () => {
                            const { err, info } = await getProgressionInfo();
                            if (err == "") {
                                setProgressInfo(info);
                                updateState({
                                    modalOpen: false,
                                });
                            } else {
                                console.log({ err });
                            }
                        }, 3000);
                    }}
                >
                    Register
                </div>
            </div>
            {
                <div className="ProgressInfo">
                    <h2>Tracks({progressInfo.tracks.length}):</h2>
                    {hasPlayedBefore ? (
                        progressInfo.tracks.map((track) => {
                            return (
                                <div
                                    className="Track"
                                    onClick={async () => {
                                        navigate(
                                            `/play/${track.progressNFT_Id}`,
                                            { replace: false }
                                        );
                                    }}
                                >
                                    <h3>
                                        NFT id: {track.progressNFT_Id} :: Level:{" "}
                                        {track.levelInfo.level}
                                    </h3>
                                    <CurrentLevel
                                        levelInfo={track.levelInfo}
                                    ></CurrentLevel>
                                </div>
                            );
                        })
                    ) : (
                        <h3 className="Trackc">
                            Your tracks will be presented here when they are
                            created.
                        </h3>
                    )}
                </div>
            }
        </div>
    );
};

export { Home };
