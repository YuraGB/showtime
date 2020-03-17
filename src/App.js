import React, {useEffect, useRef} from 'react';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from 'react-redux';
import {authCheckState} from "./store/actions";

function App (props) {
    const {isAuth, onTrySignup} = props;
    let routs = null;
    routs = (
        <Switch>
            <Route path='/auth' component={Auth}/>
            <Route path='/' exact component={BurgerBuilder} />
            <Redirect to='/'/>
        </Switch>
    );
    if (isAuth) {
        routs = (
            <Switch>
                <Route path='/checkout' component={Checkout}/>
                <Route path='/orders' component={Orders}/>
                <Route path='/logout' component={Logout}/>
                <Route path='/' exact component={BurgerBuilder} />
                <Redirect to={props.redirectUrl}/>
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
