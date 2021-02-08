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
export const createOrder = (customerOrder, authToken) => {
    return (dispatch) => {
        // console.log(dispatch, customerOrder, 'customerorder');
        dispatch(startLoading());
        axiosInstance
            .post("/orders.json?auth=" + authToken, customerOrder)
            .then(response => {
                // this.setState({ loading: false });
                console.log("response", response.data);
                // this.props.history.push("/");
                dispatch(createOrderSuccess(response.data.name, customerOrder));
                dispatch(orderPlaced())
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

export const orderPlaced = () => {
    return {
        type: actionTypes.ORDER_PLACED
    }
}

// fetch order actions
export const fetchOrders = (authToken) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axiosInstance
            .get("/orders.json?auth=" + authToken)
            .then(res => {
                // console.log(res.data);
                // method 1 to turn object into an array.method 2 is in Order.js
                // TODO: create a util out of this
                const ordersArray = [];
                for (let key in res.data) {
                    ordersArray.push({ ...res.data[key], key: key });
                }
                // console.log(ordersArray);
                // setOrders(ordersArray);
                dispatch(fetchOrdersSuccess(ordersArray))
                // setLoading(false);
            })
            .catch(err => {
                console.log(err);
                dispatch(fetchOrdersFail());
            });
    }

}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders
    }
}

export const fetchOrdersFail = () => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START,
    }
}