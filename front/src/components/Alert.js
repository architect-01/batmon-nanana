import * as cfg from "../config";

import "../style/css/App.css";

const Alert = ({ isOpen, message, type, updateState }) => {
    if (isOpen == false) return null;

    setTimeout(
        () => updateState({ alertOpen: false }),
        cfg.FRONT_CONSTANTS.alarmActiveTime
    );

    return (
        <div className={`AlertX ${type}`}>
            <h2>{message}</h2>
        </div>
    );
};

export { Alert };
