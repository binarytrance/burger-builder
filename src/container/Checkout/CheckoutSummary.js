import React from "react";
// import Button
import { Link } from "react-router-dom";
import Burger from "../../components/Burger/Burger";

const CheckoutSummary = ({ ingredients }) => {
    return (
        <div className='checkout-summary'>
            <h1 className='px-3'>Your cart includes:</h1>
            <div className='h-screen'>
                <Burger ingredients={ingredients} />
            </div>
            <div className=''>
                <button className='' onClick={console.log("")}>
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
