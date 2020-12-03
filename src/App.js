import React from "react";
import { Layout } from "./components/Layout/Layout";
import BurgerBuilder from "./container/BurgerBuilder/BurgerBuilder";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import Checkout from "./container/Checkout/Checkout";

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route path='/checkout' component={Checkout} />
                    <Route exact path='/' component={BurgerBuilder} />
                </Switch>
                {/* <BurgerBuilder /> */}
            </Layout>
        </BrowserRouter>
    );
}

export default App;
