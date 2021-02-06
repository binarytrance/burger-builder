import Axios from 'axios';
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

export const auth = (email, password) => {
    return dispatch => {
        // make async call
        dispatch(authStart())
        const authData = {
            email,
            password,
            returnSecureToken: true
        }
        console.log(authData);

        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCbfyREQ069e7nFq8lwcNpCyPNpnpF7iMA', authData)
        .then(response => {
            console.log(response);
            dispatch(authSuccess());
        })
        .catch(error => {
            console.log(error)
            dispatch(authFail());
        })
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}