import React from 'react';

import classes from './Buttom.module.css';

const Button = (props) => {
    return (
        <button
            disabled={props.disabled !==undefined ? !props.disabled : false}
            className={[classes.Button, classes[props.btnType]].join(' ')}
            onClick={props.clicked}
        >
            {props.children}
        </button>
    )
};

export default Button;
