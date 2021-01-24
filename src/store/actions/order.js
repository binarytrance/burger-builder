// action creators for submitting an order
import axiosInstance from '../../axios-orders';
import * as actionTypes from '../actions/actionTypes';

export const creatOrderSuccess = (orderDetails) => {
    return {
        type: actionTypes.CREATE_ORDER_SUCCESS,
        orderDetails
    }
}

export const createOrder = () => {
    return dispatch => {

    }
}

export const createOrderFail = () => {
    return {
        type: actionTypes.CREATE_ORDER_FAIL
    }
}