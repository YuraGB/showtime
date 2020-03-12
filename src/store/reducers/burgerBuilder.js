import * as actionTypes from '../actions/actionTasks';
import {updateObject} from "../utility";

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
};

const INGRIDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.5,
    meat: 1.5,
    bacon: 1.7
};

const addIngredient = (state, action) => {
    const uptdIngr = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1}
    const uptdIngrs = updateObject(state.ingredients, uptdIngr);
    const updatetdState = {
        ingredients: uptdIngrs,
        totalPrice: state.totalPrice + INGRIDIENT_PRICES[action.ingredientName]
    };
    return updateObject(state, updatetdState);
};

const removeIngr = (state, action) => {
    const uptdIngrid = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1};
    const uptdIngrids = updateObject(state.ingredients, uptdIngrid);
    const updatetedState = {
        ingredients: uptdIngrids,
        totalPrice: state.totalPrice - INGRIDIENT_PRICES[action.ingredientName]
    };
    return updateObject(state, updatetedState);
};

const setIngr = (state, action) => {
    return updateObject(state, {
        ...state,
        ingredients: action.ingredients,
        totalPrice: 4,
        error: false
    });
};

const burgerBuilder = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
           return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT:
            return removeIngr(state, action);
        case actionTypes.SET_INGREDIENTS:
            return setIngr(state, action);
        case actionTypes.FETCH_INGREDIENTS_ERROR:
            return updateObject(state, {error: true});
        default:
            return state;
    }
};

export default burgerBuilder;

