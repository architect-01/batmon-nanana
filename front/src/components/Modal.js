import * as cfg from "../config";

import "../style/css/App.css";

const Modal = ({ isOpen, message }) => {
    if (isOpen == false) return null;

    return (
        <div className="ModalX">
            <h2>{message}</h2>
            <div class="lds-loader">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export { Modal };
