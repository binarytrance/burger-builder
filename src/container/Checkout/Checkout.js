import React, { useState, useEffect } from "react";
import CheckoutSummary from "./CheckoutSummary";
import CheckoutStyles from "../../styles/CheckoutStyles";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";

// 1.ingredients and their price added
// 2.total price
// 3.cancel and go back
// 4.continue -> contact form
// 5.build burger
const Checkout = props => {
    // console.log(props);
    const [ingredients, setIngredients] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    // const urlParams = useParams();
    // console.log(props.location.ingredients);
    const cancelCheckoutHandler = () => {
        // console.log(props);
        props.history.goBack();
    };
    const placeOrderHandler = () => {
        props.history.replace("/checkout/contact-data");
    };
    useEffect(() => {
        // console.log("search", props.location.search);

        const query = new URLSearchParams(props.location.search); // returns an object with arrays ['ingredient', quantity]
        const ingredientsObj = {};
        // console.log("query", query);

        for (let param of query.entries()) {
            console.log(param);
            if (param[0] === "totalPrice") {
                setTotalPrice(param[1]);
            } else {
                // we are constructing the ingredientsObj with the ingredients and their respective values
                ingredientsObj[param[0]] = +param[1];
            }
        }
        setIngredients(ingredientsObj);
        console.log(query, ingredients);
    }, []);
    return (
        <CheckoutStyles>
            <div className='bg-gray-100'>
                <h1 className='px-3 '>Checkoutttt</h1>
                <CheckoutSummary
                    ingredients={ingredients ? ingredients : {}}
                    cancelCheckoutHandler={cancelCheckoutHandler}
                    placeOrderHandler={placeOrderHandler}
                />
            </div>
            <Route
                path={props.match.path + "/contact-data"}
                render={props => (
                    <ContactData ingredients={ingredients} price={totalPrice} {...props} />
                )}
            />
        </CheckoutStyles>
    );
};

export default Checkout;
