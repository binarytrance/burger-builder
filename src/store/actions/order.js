// action creators for submitting an order
import axiosInstance from '../../axios-orders';
import * as actionTypes from '../actions/actionTypes';

export const createOrderSuccess = (id, orderDetails) => {
    return {
        type: actionTypes.CREATE_ORDER_SUCCESS,
        orderId: id,
        orderDetails
    }
}

export const startLoading = () => {
    return {
        type: actionTypes.START_LOADING
    }
}
// asyn action creator. this is what gets dispatched from the container on clicking of order now
export const createOrder = (customerOrder) => {
    return dispatch => {
        dispatch(startLoading());
        axiosInstance
            .post("/orders.json", customerOrder)
            .then(response => {
                // this.setState({ loading: false });
                console.log("response", response.data);
                // this.props.history.push("/");
                dispatch(createOrderSuccess(response.data, customerOrder))
            })
            .catch(error => {
                // this.setState({ loading: false });
                // console.log("error", error);
                dispatch(createOrderFail(error));
            });
    }
}

export const createOrderFail = (error) => {
    return {
        type: actionTypes.CREATE_ORDER_FAIL,
        error
    }
}