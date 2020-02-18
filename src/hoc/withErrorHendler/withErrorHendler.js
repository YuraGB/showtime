import React from 'react';
import Auxx from "../Aux/Aux";
import Modal from "../../components/UI/Model/Modal";


const withErrorHandler = (WrapperComponent) => {
    return (props) => {
        return (
            <Auxx>
                <Modal show>
                    Something didn't work!
                </Modal>
                <WrapperComponent {...props} />
            </Auxx>
        )
    }
};

export default withErrorHandler;