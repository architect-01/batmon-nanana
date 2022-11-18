import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { claimMonster } from "../interactions/interactions";

const MatchEnd = ({
    global,
    progressNFT_Id,
    isFinished,
    canClaim,
    matchId,
    updateState,
}) => {
    const navigate = useNavigate();
    if (isFinished) {
        return (
            <div>
                <div className={`MatchEnd${canClaim ? " Victory" : " Defeat"}`}>
                    {canClaim ? (
                        <h3>Glorious Victory</h3>
                    ) : (
                        <h3>Shameful Defeat</h3>
                    )}
                    <button onClick={window.game.startReplay}>
                        See Replay Again
                    </button>
                    <button onClick={() => navigate(`/play/${progressNFT_Id}`)}>
                        Continue Playing
                    </button>
                    {canClaim ? (
                        <button
                            onClick={async () => {
                                updateState({
                                    modalOpen: true,
                                    modalMessage: "Sign the transaction...",
                                });
                                await claimMonster({ matchId });
                                updateState({
                                    modalOpen: false,
                                });
                                setTimeout(
                                    () => navigate(`/play/${progressNFT_Id}`),
                                    13000
                                );
                            }}
                        >
                            Claim Monster
                        </button>
                    ) : null}
                </div>
            </div>
        );
    }

    return <div className="MatchEndNotFinished"></div>;
};

export { MatchEnd };
