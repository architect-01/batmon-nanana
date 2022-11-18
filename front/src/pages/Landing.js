import { useNavigate } from "react-router-dom";

import { useEffect } from "react";

import { connectWallet } from "../interactions/interactions";

import * as cfg from "../config";

import "../style/css/App.css";

const Landing = ({ state, updateState }) => {
    const navigate = useNavigate();
    return (
        <div className="LandingPage">
            <img
                className="MonsterImg"
                src={cfg.FRONT_CONSTANTS.logoMonsterImgPath}
            ></img>
            <h1>{cfg.FRONT_CONSTANTS.appName}</h1>
            <h3 className="MainDescription Gray">
                <h3>
                    Fully <u className="White">on-chain game</u> built for the
                </h3>
                <img
                    className="OrganizatorImg"
                    src={cfg.FRONT_CONSTANTS.organizatorImgPath}
                ></img>
                <h3> {cfg.FRONT_CONSTANTS.hackathonDescriptionText}</h3>
            </h3>

            <h3 className="Gray">{cfg.FRONT_CONSTANTS.overviewText}</h3>
            <div
                className="connectWalletBtn"
                onClick={async () => {
                    updateState({
                        modalOpen: true,
                        modalMessage: "Pending connection...",
                    });

                    const { err, account } = await connectWallet();

                    if (err == "") {
                        updateState({ modalOpen: false, account });

                        navigate("/home", { replace: false });
                    } else {
                        updateState({
                            modalOpen: false,
                            alertOpen: true,
                            alertMessage:
                                "Error: You need to install TronLink wallet",
                        });
                    }
                }}
            >
                {cfg.FRONT_CONSTANTS.connectWalletText}
            </div>
        </div>
    );
};

export { Landing };
