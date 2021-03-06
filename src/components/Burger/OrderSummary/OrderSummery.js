import React from 'react';

import Auxx from '../../../hoc/Auxx/Auxx';
import Button from "../../UI/Button/Button";
import PropTypes from 'prop-types';

const orderSummery = (props) => {
    const ingrSumm = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key={Math.random()}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
                </li>
            )
        });

    return (
        <Auxx>
            <h3>Your Order</h3>
            <p>A delicias burger with the following ingredients:</p>
            <ul>
                {ingrSumm}
            </ul>
            <p><strong>Total price: {props.price}</strong></p>
            <p>continue</p>
            <Button
                btnType='Danger'
                clicked={props.purchaseCancel}
            >Cancel</Button>
            <Button
                btnType='Success'
                clicked={props.purchaseContinue}>
                Continue</Button>
        </Auxx>
    )
};

orderSummery.propTypes = {
    btnType: PropTypes.string,
    clicked: PropTypes.func
};

export default React.memo(orderSummery);