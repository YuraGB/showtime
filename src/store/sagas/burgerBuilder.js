import axios from "../../axios-orders";
import {put} from 'redux-saga/effects';

import {fetchIngredientsError, setIngredients} from "../actions/burgerBuilder";

export function* iniIngredients () {
    try {
        const response = yield axios.get('/ingredients.json');
        yield put(setIngredients(response.data));
    } catch(err) {
        yield put(fetchIngredientsError())
    }
}