import * as actionTypes from './actionTasks';
import axios from '../../axios-orders';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
};

export const rmvIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
};

export const setIngredients = (ingr) => {
    console.log(ingr);
  return {
      type: actionTypes.SET_INGREDIENTS,
      ingredients: ingr
  }
};

export const initIngredients = () => dispatch => {
    axios.get('/ingredients.json')
    .then(response => {
       dispatch(setIngredients(response.data));
    }).catch(err => dispatch(fetchIngredientsError()))
};

export const fetchIngredientsError = () => {
   return {
       type: actionTypes.FETCH_INGREDIENTS_ERROR
   }
};
