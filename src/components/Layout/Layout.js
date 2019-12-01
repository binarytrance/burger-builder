import React from "react";
import Aux from "../../hoc/Aux";
import classes from "./Layout.css";

export const Layout = props => (
  <Aux>
    <div>Toolbar, Sidebar, Backdrop, Footer</div>
    <main className={classes.Content}>{props.children}</main>
  </Aux>
);
