import React, {useEffect} from 'react';
import {Redirect, Router, Route, Switch, withRouter} from 'react-router-dom';
import { AnimatedSwitch, AnimatedRoute } from 'react-router-transition';

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from 'react-redux';
import {authCheckState} from "./store/actions";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";


const asyncCheckout = asyncComponent(() => import("./containers/Checkout/Checkout"));
const asyncOrders = asyncComponent(() => import("./containers/Orders/Orders"));
const asyncAuth = asyncComponent(() => import("./containers/Auth/Auth"));
function App (props) {
    const {isAuth, onTrySignup} = props;
    let routs = null;
    routs = (
        <Switch>
            <Route path='/auth' component={asyncAuth}/>
            <Route path='/' exact component={BurgerBuilder} />
            <Redirect to='/'/>
        </Switch>
    );
    if (isAuth) {
        routs = (
            <AnimatedSwitch
                atEnter={{ opacity: 0 }}
                atLeave={{ opacity: 0 }}
                atActive={{ opacity: 1 }}
                className="switch-wrapper"
            >
                <AnimatedRoute  atEnter={{ offset: -100 }}
                                atLeave={{ offset: -20 }}
                                atActive={{ offset: 0 }}
                                mapStyles={(styles) => ({
                                    transform: `translateX(${styles.offset}%)`,
                                })} path='/checkout' component={asyncCheckout}/>
                <AnimatedRoute  atEnter={{ offset: -100 }}
                                atLeave={{ offset: -20 }}
                                atActive={{ offset: 0 }}
                                mapStyles={(styles) => ({
                                    transform: `translateX(${styles.offset}%)`,
                                })} path='/orders' component={asyncOrders}/>
                <AnimatedRoute  atEnter={{ offset: -100 }}
                                atLeave={{ offset: -20 }}
                                atActive={{ offset: 0 }}
                                mapStyles={(styles) => ({
                                    transform: `translateX(${styles.offset}%)`,
                                })} path='/logout' component={Logout}/>
                <AnimatedRoute  atEnter={{ offset: -100 }}
                                atLeave={{ offset: -20 }}
                                atActive={{ offset: 0 }}
                                mapStyles={(styles) => ({
                                    transform: `translateX(${styles.offset}%)`,
                                })} path='/auth' component={asyncAuth}/>
                <AnimatedRoute  atEnter={{ offset: -100 }}
                                atLeave={{ offset: -20 }}
                                atActive={{ offset: 0 }}
                                mapStyles={(styles) => ({
                                    transform: `translateX(${styles.offset}%)`,
                                })} path='/' exact component={BurgerBuilder} />
                <Redirect to='/'/>
            </AnimatedSwitch>
        )
    }

    useEffect(() => onTrySignup(), [onTrySignup]);
    return (
        <div>
            <Layout>
                {routs}
            </Layout>
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        onTrySignup: () => dispatch(authCheckState())
    }
};
const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null,
        redirectUrl: state.auth.authUrl
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
