import React from "react";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./container/BurgerBuilder/BurgerBuilder";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import Checkout from "./container/Checkout/Checkout";
import Orders from "./container/Orders/Orders";
import Auth from './container/Auth/Auth';

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route path='/orders' component={Orders} />
                    <Route path='/checkout' component={Checkout} />
                    <Route path='/auth' component={Auth}/>
                    <Route exact path='/' component={BurgerBuilder} />
                </Switch>
                {/* <BurgerBuilder /> */}
            </Layout>
        </BrowserRouter>
    );
}

export default App;
