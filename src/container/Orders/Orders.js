import React, { useEffect, useState } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../UI/Spinner/Spinner";

const Orders = () => {
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState(null);
    useEffect(() => {
        axios
            .get("/orders.json")
            .then(res => {
                // console.log(res.data);
                // method 1 to turn object into an array.method 2 is in Order.js
                // TODO: create a util out of this
                const ordersArray = [];
                for (let key in res.data) {
                    ordersArray.push({ ...res.data[key], key: key });
                }
                // console.log(ordersArray);
                setOrders(ordersArray);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
        // setTimeout(() => {
        //     console.table(orders);
        // }, 3000);
    }, []);
    console.table(orders);

    return (
        <div>
            <h2 className='mb-4 font-bold mx-auto text-center'>Your Orders</h2>
            <ul>
                {!loading && orders ? (
                    orders.map(order => {
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

export default withErrorHandler(Orders, axios);
