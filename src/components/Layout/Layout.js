import React from "react";
import Aux from "../../hoc/Aux";
import { NavLink } from "react-router-dom";
// import Checkout from "../../container/Checkout/Checkout";
import classes from "./Layout.css";
import { connect } from "react-redux";

const Layout = props => {

    return (
        <Aux>
            <nav className='flex justify-between py-3 px-4 shadow-lg'>
                <div>Toolbar, Sidebar, Backdrop, Footer</div>
                <div className='flex'>
                <NavLink to='/' exact className='mr-2'>
                    Burger Builder
                </NavLink>
                {props.isLoggedIn
                ? (<>
                    <NavLink to='/logout' className='mr-2'>Logout</NavLink>
                    <NavLink to='/orders'>Orders</NavLink>
                </>)
                : <NavLink to='/auth' className='mr-2'>Sign Up</NavLink>}

                </div>

            </nav>
            <main className={`${classes.Content} py-5`}>
                <>{props.children}</>
            </main>
        </Aux>
    )
};

const mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.token ? true : false
    }

}



export default connect(mapStateToProps)(Layout);
