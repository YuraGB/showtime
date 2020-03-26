import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTasks';
import {logoutSaga, checkoutTimeOutSaga, authUserSaga, authCheckStateSaga} from "./auth";
import {iniIngredients} from "./burgerBuilder";
import {purchaseBurgerSaga, fetchOrderSaga} from "./order";

export function* watchAuth() {
    yield takeEvery(actionTypes.AUTH_INITIAL_LOGOUT, logoutSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkoutTimeOutSaga);
    yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga);
};

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.INIT_INGREDIENTS, iniIngredients);
}

export function* watchOrder() {
    yield takeEvery(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
    yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrderSaga);
}