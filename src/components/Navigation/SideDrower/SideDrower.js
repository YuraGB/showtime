import React from 'react';

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from './SideDrower.module.css';
import Auxx from "../../../hoc/Auxx/Auxx";
import Backdrop from "../../UI/Backdrop/Backdrop";

const SideDrower = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses= [classes.SideDrawer, classes.Open]
    }

    return (
        <Auxx>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuth={props.isAuth}/>
                </nav>
            </div>
        </Auxx>
    )
};

export default SideDrower;