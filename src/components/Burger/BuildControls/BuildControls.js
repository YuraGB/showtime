import React from 'react';

import classes from './BuildControls.module.css';
import BuildControl from "./BuildControl/BuildControl";

const controls = [
    { label: 'Salad', type: 'salad'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Meat', type:  'meat'},
];

const BuildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
            {
                controls.map((ctrl) => {
                    return <BuildControl
                        added={()=>props.ingrAdded(ctrl.type)}
                        key={ctrl.label}
                        removed={() => props.ingrRem(ctrl.type)}
                        label={ctrl.label}
                        disabled={props.disabled[ctrl.type]}
                    />
                })
            }
            <button
                className={classes.OrderButton}
                disabled={!props.purchaseble}
                onClick={props.ordered}
            >{ props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
        </div>
    )
};

export default BuildControls;