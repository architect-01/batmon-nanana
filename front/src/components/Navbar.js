import { useNavigate } from "react-router-dom";

import * as cfg from "../config";

import { setup } from "../interactions/interactions";

import "../style/css/App.css";

const Navbar = ({ state, updateState }) => {
    const navigate = useNavigate();

    return (
        <div className="NavbarContainer">
            <div className="Navbar">
                <h1
                    className="Logo"
                    onClick={() => navigate("/", { replace: false })}
                >
                    {cfg.FRONT_CONSTANTS.appName}
                </h1>
                <div className="Menu">
                    {state.account != null ? (
                        <div className="AccountContainer">
                            <h2>
                                {`${state.account.slice(
                                    0,
                                    7
                                )}...${state.account.slice(
                                    state.account.length - 4
                                )}`}
                            </h2>
                            <h2
                                className="LogOutButton"
                                onClick={() => {
                                    updateState(cfg.DEFAULT_APP_STATE);
                                    setup({ state, updateState });
                                    navigate("/", { replace: true });
                                }}
                            >
                                Log Out
                            </h2>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
