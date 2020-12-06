import React from "react";
// import Button
import Burger from "../../components/Burger/Burger";

const CheckoutSummary = ({ ingredients, cancelCheckout }) => {
    return (
        <div className='checkout-summary'>
            <h1 className='px-3'>Your cart includes:</h1>
            <div className='h-1/2'>
                <Burger ingredients={ingredients} />
            </div>
            <div className=''>
                <button className='' onClick={cancelCheckout}>
                    Go Back
                </button>
                {/* <Link to={} */}
                <button className='' onClick={console.log("")}>
                    Proceed
                </button>
            </div>
        </div>
    );
};

export default CheckoutSummary;
