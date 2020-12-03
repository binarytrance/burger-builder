import React from "react";
import Aux from "../../hoc/Aux";
import { NavLink } from "react-router-dom";
// import Checkout from "../../container/Checkout/Checkout";
import classes from "./Layout.css";

export const Layout = props => (
    <Aux>
        <nav>
            <div>Toolbar, Sidebar, Backdrop, Footer</div>
            <NavLink to='/checkout'>Checkout</NavLink>
        </nav>
        <main className={classes.Content}>
            <>{props.children}</>
        </main>
    </Aux>
);
