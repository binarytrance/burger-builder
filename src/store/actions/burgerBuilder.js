import axiosInstance from '../../axios-orders';
import * as actionTypes from '../actions/actionTypes';


// this action creator is only used internally, but the action it houses is the action that gets dispatched
const fetchIngredientsHandler = (allIngredients) => {
    return {
        type:actionTypes.FETCH_INGREDIENTS,
        allIngredients
    }
}

 const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
 }
// the action creator that gets actually dispatched
export const fetchIngredients = (asdf) => {


    return dispatch => {
        // console.log(dispatch, 'dispatch');
        axiosInstance.get('https://my-burger-builder-42007.firebaseio.com/ingredients.json')
        .then(response => {
            console.log(response);
            dispatch(fetchIngredientsHandler(response.data))
        })
        .catch(error => {
            console.log(error);
            // dispatch to change error state
            dispatch(fetchIngredientsFailed())
        })
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