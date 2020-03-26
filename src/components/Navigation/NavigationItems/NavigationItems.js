import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link='/'>Burger Builder</NavigationItem>
            {
                props.isAuth
                    ?
                        <React.Fragment>
                            <NavigationItem link='/orders'>Orders</NavigationItem>
                            <NavigationItem link='/logout'>Logout</NavigationItem>
                        </React.Fragment>
                    :   <NavigationItem link='/auth'>Authenticate</NavigationItem>
            }
        </ul>
    )
};

export default NavigationItems;