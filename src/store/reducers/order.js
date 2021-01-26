import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.CREATE_ORDER_SUCCESS:
            return {
                ...state,
                orders: state.orders.concat({id: action.orderId, ...action.orderDetalis}),
                loading: false
            }
        case actionTypes.CREATE_ORDER_FAIL:
            return {
                ...state,
                loading: false
            }
        case actionTypes.START_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}

export default reducer;