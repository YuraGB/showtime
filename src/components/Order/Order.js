import React from 'react';

import classes from './Order.module.css';

const Order = (props) => {
    const ingridient = [];

    for( let ingrName in props.ingredients) {
        ingridient.push(
            {
                name: ingrName,
                amount: props.ingredients[ingrName]
            })
    };

    const ingOutput = ingridient.map( ig =>(
        <span
            style={{
                textTransform:'Capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #eee'
            }}
            key={ig.name}>{ig.name}: ({ig.amount})</span>
    ));

    return (
        <div className={classes.Order}>
            <p>
                Ingredients:
                {
                    ingOutput
                }
            </p>
            <p>
                price: <strong>{props.price.toFixed(2)}</strong>
            </p>
        </div>
    )
};

export default Order;