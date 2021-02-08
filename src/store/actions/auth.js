import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (data) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: data
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
        console.log(authData);
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCbfyREQ069e7nFq8lwcNpCyPNpnpF7iMA';
        if(!isSignUp) url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCbfyREQ069e7nFq8lwcNpCyPNpnpF7iMA';
        axios.post(url, authData)
        .then(response => {
            console.log(response);
            dispatch(authSuccess(response.data)); // TODO: gotta be as explicit as possible. extract the props and pass them indivisually instead of the whole data object
        })
        .catch(error => {
            console.log(error)
            dispatch(authFail(error.data));
        })
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}