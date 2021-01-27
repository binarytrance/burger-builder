import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    orderPlaced: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.CREATE_ORDER_SUCCESS:
            return {
                ...state,
                orders: state.orders.concat({id: action.orderId, ...action.orderDetalis}),
                loading: false,
                orderPlaced: true
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
        case actionTypes.ORDER_PLACED:
            return {
                ...state,
                orderPlaced: false
            }
        case actionTypes.FETCH_ORDERS_SUCCESS:
            console.log(action.orders, 'aha');

            return {
                ...state,
                orders: action.orders,
                loading: false
            }
        case actionTypes.FETCH_ORDERS_FAIL:
            return {
                ...state,
                orders: action.orders,
                loading: false
            }
        case actionTypes.FETCH_ORDERS_START:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}

export default reducer;