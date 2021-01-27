import React from "react";
// import Aux from "../../hoc/Aux";
// import { Link } from "react-router-dom";

const OrderSummary = ({ ingredients, price, closeModalHandler, continuePurchaseHandler }) => {
    // console.log('summary',{ingredients, price});
    // console.table(ingredients);
    const orderedIngredients = Object.keys(ingredients).reduce((result, ingredient, index) => {
        // console.log({ result, ingredient, index });
        if (ingredients[ingredient] > 0)
            result.push(
                <li key={ingredient + index}>
                    <span>{ingredient}</span>: {ingredients[ingredient]}
                </li>
            );
        return result;
    }, []);
    return (
        <div className='p-4'>
            <h3 className='text-bold'>You have ordered the following items:</h3>
            <ul>{orderedIngredients}</ul>
            <p>Total Price: {price}</p>
            <button
                className='bg-red-500 px-4 py-2 rounded text-white mr-3'
                onClick={closeModalHandler}
            >
                Cancel
            </button>
            {/* <Link to={{ pathname: `/checkout`, ingredients: ingredients }}> */}
            <button
                className='bg-green-500 px-4 py-2 rounded text-white'
                onClick={continuePurchaseHandler}
            >
                Checkout
            </button>
            {/* </Link> */}
        </div>
    );
};

export default OrderSummary;
