import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (authToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authToken,
        userId
    }
}

export const logout = () => {
    localStorage.setItem('authToken', null);
    localStorage.setItem('expiryDate', null);
    localStorage.setItem('userId', null);
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

const onAuthTimeout = (timeout) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, timeout * 1000);
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        // make async call
        dispatch(authStart());
        const authData = {
            email,
            password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCbfyREQ069e7nFq8lwcNpCyPNpnpF7iMA';
        if(!isSignUp) url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCbfyREQ069e7nFq8lwcNpCyPNpnpF7iMA';
        axios.post(url, authData)
        .then(response => {
            const expiryDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('expiryDate', expiryDate); // setting the expiry date
            localStorage.setItem('userId', response.data.localId);
            dispatch(authSuccess(response.data.idToken, response.data.localId)); // TODO: gotta be as explicit as possible. extract the props and pass them indivisually instead of the whole data object
            dispatch(onAuthTimeout(response.data.expiresIn))
            localStorage.setItem('authToken', response.data.idToken);

        })
        .catch(error => {
            dispatch(authFail(error.response.data.error));
        })
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const checkForAuth = () => {
    const token = localStorage.getItem('authToken');
    const expiryDate = new Date(localStorage.getItem('expiryDate'));
    const userId = localStorage.getItem('userId');
    return dispatch => {
        // debugger;
        if(!token) {
            return;
        }
        else if(new Date() <= expiryDate) {
            dispatch(authStart())
            dispatch(authSuccess(token, userId));
            dispatch(onAuthTimeout((expiryDate.getTime() - new Date().getTime())/1000))
        }
        else {
            dispatch(logout());
        }
    }
}