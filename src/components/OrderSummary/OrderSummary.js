import React from "react";
import Aux from "../../hoc/Aux";

const OrderSummary = ({ ingredients, totalPrice, closeModalHandler }) => {
    console.log(ingredients, totalPrice);
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
            <button onClick={closeModalHandler}>Cancel</button>
            <button onClick={closeModalHandler}>Checkout</button>
        </Aux>
    );
};

export default OrderSummary;
