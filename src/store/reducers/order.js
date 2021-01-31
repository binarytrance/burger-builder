import * as actionTypes from '../actions/actionTypes';
import  updateObject  from '../util';


const initialState = {
    orders: [],
    loading: false,
    orderPlaced: false
}

const createOrderSuccess = (state, action) => {
    const updatedOrders = state.orders.concat({id: action.orderId, ...action.orderDetalis})
    return  updateObject(state, {orders: updatedOrders, loading: false, orderPlaced: true});
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.CREATE_ORDER_SUCCESS: return createOrderSuccess(state, action);
        case actionTypes.CREATE_ORDER_FAIL: return updateObject(state, {loading: false});
        case actionTypes.START_LOADING: return updateObject(state, {loading: true});
        case actionTypes.ORDER_PLACED: return updateObject( state, {orderPlaced: false})
        case actionTypes.FETCH_ORDERS_SUCCESS: return updateObject(state, {orders: action.orders, loading: false})
        case actionTypes.FETCH_ORDERS_FAIL: return updateObject(state, {orders: action.orders, loading: false})
        case actionTypes.FETCH_ORDERS_START: return updateObject(state, {loading: true});
        default:
            return state;
    }
}

export default reducer;