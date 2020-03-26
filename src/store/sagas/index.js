import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTasks';
import {logoutSaga, checkoutTimeOutSaga, authUserSaga, authCheckStateSaga} from "./auth";

export function* watchAuth() {
    yield takeEvery(actionTypes.AUTH_INITIAL_LOGOUT, logoutSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkoutTimeOutSaga);
    yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga);
};