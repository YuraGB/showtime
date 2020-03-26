import {put} from 'redux-saga/effects'

import * as actions from "../actions";
import axios from "../../axios-orders";

export function* purchaseBurgerSaga(action) {
    yield put(actions.purchaseBurgerStart());
    try {
        const response = yield axios.post('/orders.json?auth=' + action.token, action.orderData);
        yield put(actions.purchaseBurgerSuccess(response.data.name, action.orderData))
    } catch(err) {
        yield put(actions.purchaseBurgerFail(err))
    }
}

export function* fetchOrderSaga(action) {
    yield put(actions.fetchOrdersStart());
    const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';

    try {
        const res = yield axios.get('./orders.json' + queryParams);
        const fetchData = [];

        for (let key in res.data) {
            fetchData.push(
                {
                    ...res.data[key],
                    id: key
                })
        }

        yield put(actions.fetchOrdersSuccess(fetchData))
    } catch(e) {
        yield put(actions.fetchOrdersFail(e))
    }
}
