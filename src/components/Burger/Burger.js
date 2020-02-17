import React from 'react';

import classes from './Burger.module.css';
import BurgerIngridient from "./BurgerIngredient/BurgerIngridient";

const Burger = (props) => {
    console.log(props.ingrediens);
    let transormIngr = Object.keys(props.ingrediens)
        .map((igKey)=> {
            return [...Array(props.ingrediens[igKey])].map((_, i) =>
                {
                   return <BurgerIngridient type={igKey} key={igKey + i}/>
                })
            })
    .reduce((arr, curr) => {
        return arr.concat(curr)
    }, []);
console.log(transormIngr)
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
