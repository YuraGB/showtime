import React from 'react';

import classes from './Modal.module.css';
import Aux from "../../../hoc/Aux/Aux";
import Backdrop from "../Backdrop/Backdrop";

const Modal = (props) => {
    return (
        <Aux>
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
        </Aux>
    )
};

export default React.memo(Modal);