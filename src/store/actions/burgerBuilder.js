import * as actionTypes from '../actions/actionTypes';

export const fetchIngredients = (allIngredients) => {
    return {
        type:actionTypes.FETCH_INGREDIENTS,
        allIngredients
    }
}

export const addIngredient = (ingredientName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName
    }
}
export const removeIngredient = (ingredientName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName
    }
}