import React from 'react';
import Aux from "../Aux/Aux";
import Modal from "../../components/UI/Model/Modal";

const withErrorHandler = (WrapperComponent) => {
    return (props) => {
        return (
            <Aux>
                <Modal show>
                    Something didn't work!
                </Modal>
                <WrapperComponent {...props} />
            </Aux>
        )
    }
};

export default withErrorHandler;