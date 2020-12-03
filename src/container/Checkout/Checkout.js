import React, { useState } from "react";
import CheckoutSummary from "./CheckoutSummary";
import CheckoutStyles from "../../styles/CheckoutStyles";
// import { useParams } from "react-router-dom";

// 1.ingredients and their price added
// 2.total price
// 3.cancel and go back
// 4.continue -> contact form
// 5.build burger
const Checkout = props => {
    const [ingredientss, setIngredientss] = useState({
        salad: 1,
        meat: 1
    });

    // const urlParams = useParams();
    console.log(props);

    return (
        <CheckoutStyles>
            <div className='bg-gray-100'>
                <h1 className='px-3 '>Checkoutttt</h1>
                <CheckoutSummary ingredients={ingredientss} />
            </div>
        </CheckoutStyles>
    );
};

export default Checkout;
