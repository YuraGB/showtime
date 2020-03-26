import * as actionTypes from './actionTasks';

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
  return {
      type: actionTypes.SET_INGREDIENTS,
      ingredients: ingr
  }
};

export const initIngredients = () => {
    return {
        type: actionTypes.INIT_INGREDIENTS
    }
};

export const fetchIngredientsError = () => {
   return {
       type: actionTypes.FETCH_INGREDIENTS_ERROR
   }
};
