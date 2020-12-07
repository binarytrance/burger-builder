import React from "react";
// import Button
import Burger from "../../components/Burger/Burger";

const CheckoutSummary = ({ ingredients, cancelCheckoutHandler, placeOrderHandler }) => {
    return (
        <div className='checkout-summary'>
            <h1 className='px-3'>Your cart includes:</h1>
            <div className='h-1/2'>
                <Burger ingredients={ingredients} />
            </div>
            <div className=''>
                <button className='' onClick={cancelCheckoutHandler}>
                    Go Back
                </button>
                <button className='' onClick={placeOrderHandler}>
                    Proceed
                </button>
            </div>
        </div>
    );
};

export default CheckoutSummary;
