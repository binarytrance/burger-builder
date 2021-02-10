import React from "react";
import Aux from "../../hoc/Aux";
import { NavLink } from "react-router-dom";
// import Checkout from "../../container/Checkout/Checkout";
import classes from "./Layout.css";
import { connect } from "react-redux";
import * as actions from '../../store/actions';

const Layout = props => {
    const handleLogout = () => {
        console.log('props', props);

        // props.onLogout();
        console.log(props, 'asdf')
        props.history.push('/')
    }
    return (
        <Aux>
            <nav className='flex justify-between py-3 px-4 shadow-lg'>
                <div>Toolbar, Sidebar, Backdrop, Footer</div>
                <div className='flex'>
                <NavLink to='/' exact className='mr-2'>
                    Burger Builder
                </NavLink>
                {props.isLoggedIn
                ? <button className='mr-2' onClick={handleLogout}>Logout</button>
                : <NavLink to='/auth' className='mr-2'>Sign Up</NavLink>}
                <NavLink to='/orders'>Orders</NavLink>
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

const mapDispatchToProps = dispatch => {
    return {
        onLogout: dispatch(() => actions.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
