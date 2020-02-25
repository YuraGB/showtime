import React from 'react';

import classes from './Burger.module.css';
import BurgerIngridient from "./BurgerIngredient/BurgerIngridient";

const Burger = (props) => {

    let transormIngr = Object.keys(props.ingredients)
        .map((igKey)=> {
            return [...Array(props.ingredients[igKey])].map((_, i) =>
                {
                   return <BurgerIngridient type={igKey} key={igKey + i}/>
                })
            })
    .reduce((arr, curr) => {
        return arr.concat(curr)
    }, []);

    if (transormIngr.length === 0) {
        transormIngr = 'Please set the ingedients'
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngridient type='bread-top' />
            {
                transormIngr
            }
            <BurgerIngridient type='bread-bottom' />
        </div>
    )
};

export default Burger;
