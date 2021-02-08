import React, { useEffect } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../UI/Spinner/Spinner";
import { connect } from "react-redux";
import * as actions from '../../store/actions';


const Orders = (props) => {

    useEffect(() => {
        props.fetchOrders(props.token);
        // axios
        //     .get("/orders.json")
        //     .then(res => {
        //         // console.log(res.data);
        //         // method 1 to turn object into an array.method 2 is in Order.js
        //         // TODO: create a util out of this
        //         const ordersArray = [];
        //         for (let key in res.data) {
        //             ordersArray.push({ ...res.data[key], key: key });
        //         }
        //         // console.log(ordersArray);
        //         setOrders(ordersArray);
        //         setLoading(false);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //         setLoading(false);
        //     });
        // setTimeout(() => {
        //     console.table(orders);
        // }, 3000);
    }, []);
    // console.table(orders);

    return (
        <div>
            <h2 className='mb-4 font-bold mx-auto text-center'>Your Orders</h2>
            <ul>
                {!props.loading && props.orders ? (
                    props.orders.map(order => {
                        return (
                            <Order
                                key={order.key}
                                ingredients={order.ingredients}
                                totalPrice={order.totalPrice}
                            />
                        );
                    })
                ) : (
                    <Spinner />
                )}
            </ul>
        </div>
    );
};

const mapStateToProps = (state) => {
    return  {
        loading: state.order.loading,
        orders: state.order.orders,
        token: state.auth.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchOrders: (token) => dispatch(actions.fetchOrders(token))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
