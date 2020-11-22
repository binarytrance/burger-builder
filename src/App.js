import React from "react";
import { Layout } from "./components/Layout/Layout";
import BurgerBuilder from "./container/BurgerBuilder/BurgerBuilder";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import Checkout from "./container/Checkout/Checkout";

function App() {
    return (
        <BrowserRouter>
            <Layout>
                {/* <BurgerBuilder /> */}
                <Route exact path='/' component={BurgerBuilder} />
                <Route path='/checkout' render={props => <Checkout />} />
            </Layout>
        </BrowserRouter>
    );
}

export default App;
