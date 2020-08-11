import React from "react";
import Aux from "../../hoc/Aux";

const OrderSummary = ({ ingredients, price, closeModalHandler, continuePurchaseHandler }) => {
    console.log(ingredients, price);
    const orderedIngredients = Object.keys(ingredients).reduce((result, ingredient, index) => {
        if (ingredients[ingredient] > 0)
            result.push(
                <li key={ingredient + index}>
                    <span>{ingredient}</span>: {ingredients[ingredient]}
                </li>
            );
        return result;
    }, []);
    return (
        <Aux>
            <h3>You have ordered the following items:</h3>
            <ul>{orderedIngredients}</ul>
            <p>Total Price: {price}</p>
            <button onClick={closeModalHandler}>Cancel</button>
            <button onClick={continuePurchaseHandler}>Checkout</button>
        </Aux>
    );
};

export default OrderSummary;
