import React, { useState, useEffect } from "react";
import CheckoutSummary from "./CheckoutSummary";
import CheckoutStyles from "../../styles/CheckoutStyles";
// import { useParams } from "react-router-dom";

// 1.ingredients and their price added
// 2.total price
// 3.cancel and go back
// 4.continue -> contact form
// 5.build burger
const Checkout = props => {
    console.log(props);
    const [ingredients, setIngredients] = useState({});
    // const urlParams = useParams();
    // console.log(props.location.ingredients);
    const cancelCheckout = () => {
        console.log(props);
        props.history.goBack();
    };
    useEffect(() => {
        console.log("search", props.location.search);

        const query = new URLSearchParams(props.location.search); // returns an object with arrays ['ingredient', quantity]
        const ingredientsObj = {};
        console.log("query", query);

        for (let param of query.entries()) {
            console.log(param);
            // we are constructing the ingredientsObj with the ingredients and their respective values
            ingredientsObj[param[0]] = +param[1];
        }
        setIngredients(ingredientsObj);
        console.log(query, ingredients);
    }, [props.location.search]);
    return (
        <CheckoutStyles>
            <div className='bg-gray-100'>
                <h1 className='px-3 '>Checkoutttt</h1>
                <CheckoutSummary
                    ingredients={ingredients ? ingredients : {}}
                    cancelCheckout={cancelCheckout}
                />
            </div>
        </CheckoutStyles>
    );
};

export default Checkout;
