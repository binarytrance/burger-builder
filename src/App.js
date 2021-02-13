import React, { useEffect } from "react";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./container/BurgerBuilder/BurgerBuilder";
import { BrowserRouter, Redirect } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import Checkout from "./container/Checkout/Checkout";
import Orders from "./container/Orders/Orders";
import Auth from './container/Auth/Auth';
import Logout from "./container/Logout/Logout";
import { connect } from "react-redux";
import * as actions from './store/actions';

function App(props) {
    useEffect(() => {
        props.checkForAuth()
    });
    let routes = (
        <Switch>
            <Route path='/auth' component={Auth}/>
            <Route exact path='/' component={BurgerBuilder} />
            <Redirect to='/'/>
        </Switch>
    );
    if(props.isAuthenticated) {
        routes = (
            <Switch>
                    <Route path='/orders' component={Orders} />
                    <Route path='/checkout' component={Checkout} />
                    <Route path='/logout' component={Logout} />
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
