import React, { useEffect } from "react";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./container/BurgerBuilder/BurgerBuilder";
import { BrowserRouter, Redirect } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import Logout from "./container/Logout/Logout";
import { connect } from "react-redux";
import * as actions from './store/actions';
import asyncComponent from './hoc/asyncComponent/asyncComonent';

const asyncAuth = asyncComponent(() => {
    return import('./container/Auth/Auth');
})

const asyncCheckout = asyncComponent(() => {
    return import('./container/Checkout/Checkout');
})

const asyncOrders = asyncComponent(() => {
    return import("./container/Orders/Orders");
})

function App(props) {
    useEffect(() => {
        props.checkForAuth()
    });
    let routes = (
        <Switch>
            <Route path='/auth' component={asyncAuth}/>
            <Route exact path='/' component={BurgerBuilder} />
            <Redirect to='/'/>
        </Switch>
    );
    if(props.isAuthenticated) {
        routes = (
            <Switch>
                    <Route path='/orders' component={asyncOrders} />
                    <Route path='/checkout' component={asyncCheckout} />
                    <Route path='/logout' component={Logout} />
                    <Route path='/auth' component={asyncAuth}/>
                    <Route exact path='/' component={BurgerBuilder} />
                    <Redirect to='/'/>
            </Switch>
        )
    }
    return (
        <BrowserRouter>
            <Layout>
                {routes}
                {/* <BurgerBuilder /> */}
            </Layout>
        </BrowserRouter>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token ? true : false
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        checkForAuth: () => dispatch(actions.checkForAuth())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
