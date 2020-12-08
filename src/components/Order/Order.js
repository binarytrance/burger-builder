import React from "react";

const Order = ({ ingredients, totalPrice }) => {
    console.log(ingredients);
    // method 2 to create array out of an object
    const ingredientsList = Object.keys(ingredients).map((ingredient, index) => {
        return (
            <li key={`${ingredient}-${index}`}>
                {ingredient}: {ingredients[ingredient]}
            </li>
        );
    });
    return (
        <li className='shadow-lg p-3 max-w-3xl mx-auto mb-3 rounded-lg'>
            <h3 className='font-bold mb-2'>Ingredients</h3>
            <ul className='mb-1'>{ingredientsList}</ul>
            <p className='italic'>Total Price: ${(+totalPrice).toFixed(2)}</p>
        </li>
    );
};

export default Order;
