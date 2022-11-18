import { Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";

import { Landing } from "./pages/Landing";
import { Home } from "./pages/Home";
import { Play } from "./pages/Play";
import { Replay } from "./pages/Replay";

import Navbar from "./components/Navbar";
import { Modal } from "./components/Modal";
import { Alert } from "./components/Alert";
import { Background } from "./components/Background";

import * as cfg from "./config";
import {
    setup,
    initContractHandlers,
    connectWallet,
} from "./interactions/interactions";

import "./style/css/App.css";

const loadState = () => {
    const oldState = localStorage.getItem(cfg.APP_CONSTANTS.localStorageKey);
    if (oldState != undefined) return JSON.parse(oldState);

    return cfg.DEFAULT_APP_STATE;
};

const App = () => {
    const [state, setState] = useState(loadState());

    const updateState = (newVals) => {
        const newState = { ...state, ...newVals };

        // console.log(`new state:`, newState);
        // newState.account =
        //     newState.account == null ? state.account : newState.account;
        localStorage.setItem(
            cfg.APP_CONSTANTS.localStorageKey,
            JSON.stringify(newState)
        );

        setState(newState);
        return newState;
    };

    const isLoggedIn = state.account != null;

    useEffect(() => {
        (async () => {
            setup({ state, updateState });
            if (isLoggedIn) await connectWallet();
        })();
    }, []);

    return (
        <div className="App">
            <Alert
                isOpen={state.alertOpen}
                message={state.alertMessage}
                type={state.alertType}
                updateState={updateState}
            ></Alert>
            <Modal
                isOpen={state.modalOpen}
                message={state.modalMessage}
            ></Modal>
            <Navbar state={state} updateState={updateState} />
            <Background state={state} setState={setState}></Background>
            {isLoggedIn == true ? (
                <Routes>
                    <Route
                        path="/"
                        element={<Navigate to="/home"></Navigate>}
                    />
                    <Route
                        path="/home"
                        element={
                            <Home state={state} updateState={updateState} />
                        }
                    />
                    <Route
                        path="/play/:progressNFT_Id"
                        element={
                            <Play state={state} updateState={updateState} />
                        }
                    />
                    <Route
                        path="/replay/:progressNFT_Id/:matchId"
                        element={
                            <Replay state={state} updateState={updateState} />
                        }
                    />
                    <Route path="*" element={<Navigate to="/" />}></Route>
                </Routes>
            ) : (
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Landing state={state} updateState={updateState} />
                        }
                    />
                    <Route path="*" element={<Navigate to="/" />}></Route>
                </Routes>
            )}
        </div>
    );
};

export default App;
