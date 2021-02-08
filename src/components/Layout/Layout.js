import React from "react";
import Aux from "../../hoc/Aux";
import { NavLink } from "react-router-dom";
// import Checkout from "../../container/Checkout/Checkout";
import classes from "./Layout.css";

export const Layout = props => (
    <Aux>
        <nav className='flex justify-between py-3 px-4 shadow-lg'>
            <div>Toolbar, Sidebar, Backdrop, Footer</div>
            <div className='flex'>
            <NavLink to='/' exact className='mr-2'>
                Burger Builder
            </NavLink>
            <NavLink to='/auth' className='mr-2'>Sign Up</NavLink>
            <NavLink to='/orders'>Orders</NavLink>
            </div>

        </nav>
        <main className={`${classes.Content} py-5`}>
            <>{props.children}</>
        </main>
    </Aux>
);
