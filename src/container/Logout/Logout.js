import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import * as actions from '../../store/actions';

const Logout = (props) => {

    useEffect(() => {
        props.onLogout()
    });
    return (
        <Redirect to='/'/>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    }
}

export default connect(null, mapDispatchToProps)(Logout);
