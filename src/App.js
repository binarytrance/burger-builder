import React, { useEffect } from "react";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./container/BurgerBuilder/BurgerBuilder";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import Checkout from "./container/Checkout/Checkout";
import Orders from "./container/Orders/Orders";
import Auth from './container/Auth/Auth';
import Logout from "./container/Logout/Logout";
import { connect } from "react-redux";
import * as actions from './store/actions';

function App(props) {
    useEffect(() => {
        console.log('checking for auth');

        props.checkForAuth()
    });
    return (
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route path='/orders' component={Orders} />
                    <Route path='/checkout' component={Checkout} />
                    <Route path='/auth' component={Auth}/>
                    <Route path='/logout' component={Logout} />
                    <Route exact path='/' component={BurgerBuilder} />
                </Switch>
                {/* <BurgerBuilder /> */}
            </Layout>
        </BrowserRouter>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        checkForAuth: () => dispatch(actions.checkForAuth())
    }
}

export default connect(null, mapDispatchToProps)(App);
