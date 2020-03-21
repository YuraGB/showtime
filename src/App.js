import React, {useEffect} from 'react';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';

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
            <Switch>
                <Route path='/checkout' component={asyncCheckout}/>
                <Route path='/orders' component={asyncOrders}/>
                <Route path='/logout' component={Logout}/>
                <Route path='/auth' component={asyncAuth}/>
                <Route path='/' exact component={BurgerBuilder} />
                <Redirect to='/'/>
            </Switch>
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
