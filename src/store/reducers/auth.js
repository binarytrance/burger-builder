import * as actionTypes from '../actions/actionTypes';
import updateObject from '../util';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
}

const authStart = (state) => {
    return updateObject(state, {error: null, loading: true});
}
const authSuccess = (state, action) => {
    return updateObject(state, {token: action.authData.idToken, userId: action.authData.localId, loading: false, error: null});
}
const authFail = (state, action) => {
    return updateObject(state, {error: action.error, loading: false});
}
const authLogout = (state, action) => {
    return updateObject(state, {loading: false, token: null, error: null});
}



const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state)
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action)
        case actionTypes.AUTH_FAIL: return authFail(state, action)
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action)
        default:
            return state;
    }
}

export default reducer;