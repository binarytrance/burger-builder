import React from "react";
import CheckoutSummary from "./CheckoutSummary";
import CheckoutStyles from "../../styles/CheckoutStyles";

// 1.ingredients and their price added
// 2.total price
// 3.cancel and go back
// 4.continue
// 5.build burger
const Checkout = () => {
    return (
        <CheckoutStyles>
            <div className='bg-gray-100'>
                <h1 className='px-3 '>Checkoutttt</h1>
                {/* <CheckoutSummary /> */}
            </div>
        </CheckoutStyles>
    );
};

export default Checkout;
