import { INGREDIENT_PRICES } from '../../constants';
import * as actionTypes from '../actions/actionTypes';
import updateObject from '../util';

const initialState = {
    ingredients: null,
    totalPrice: 0,
    error: false
}

const addIngredient = (state, action) => {

    const ingredients = updateObject(
        state.ingredients,
        // overriding a property of the object the ES6 way
        {[action.ingredientName]: state.ingredients[action.ingredientName] + 1}
    )
    const totalPrice = state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    const updatedState = {
        ...state,
        ingredients,
        totalPrice
    }
    return updateObject(state, updatedState);
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_INGREDIENTS: // implement updateObject, then take this code and create a function
            return {
                ...state,
                ingredients: action.allIngredients,
                totalPrice: 0,
                error: false
            }
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    // overriding a property of the object the ES6 way
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,

                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            };
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            }

        default:
            return state;
    }
}

export default reducer;