import { INGREDIENT_PRICES } from '../../constants';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: {

    },
    totalPrice: 0
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_INGREDIENTS:
            return {
                ...state,
                ingredients: action.allIngredients
            }
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    // overriding a property of the object the ES6 way
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,

                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
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

        default:
            return state;
    }
}

export default reducer;