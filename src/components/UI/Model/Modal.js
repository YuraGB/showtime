import React from 'react';

import classes from './Modal.module.css';
import Auxx from "../../../hoc/Auxx/Auxx";
import Backdrop from "../Backdrop/Backdrop";

const Modal = (props) => {
    return (
        <Auxx>
            <div
                className={classes.Modal}
                style={{
                    transform: props.show ? 'translateY(0vh)': 'translateY(100vh)',
                    opacity: props.show ? '1' : '0'
                }}
            >
                {
                    props.children
                }
            </div>
            <Backdrop
                show={props.show}
                clicked={props.modalClosed}
            />
        </Auxx>
    )
};

export default React.memo(Modal);