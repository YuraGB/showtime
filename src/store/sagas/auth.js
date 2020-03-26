
import {put, delay} from 'redux-saga/effects'
import * as actions from "../actions";
import axios from "axios";

export function* logoutSaga() {
    yield  localStorage.removeItem('token');
    yield  localStorage.removeItem('expirationDate');
    yield  localStorage.removeItem('userId');

    yield put(actions.logoutSucceed());
};

export function* checkoutTimeOutSaga(action) {
    yield delay((action.experationTime*1000));
    yield put(actions.logout());
};

export function* authUserSaga(action) {
   yield put(actions.authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    };

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCDVt6Dwhq4jRhutRc0mZLvKaMmxhP9MfY';

    if(!action.isSignUp) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCDVt6Dwhq4jRhutRc0mZLvKaMmxhP9MfY';
    }
    try {
        const resp = yield axios.post(url, authData);
        const expDate = yield new Date(new Date().getTime() + resp.data.expiresIn * 1000);

        yield localStorage.setItem('token', resp.data.idToken);
        yield localStorage.setItem('expirationDate', expDate);
        yield localStorage.setItem('userId', resp.data.localId);
        yield put(actions.authSuccess(resp.data.idToken, resp.data.localId));
        yield put(actions.checkAuthTimeout(resp.data.expiresIn));
    } catch (err) {
       yield put(actions.authError(err.response.data.error))
    }
}

export function* authCheckStateSaga() {
    const token = yield localStorage.getItem('token');

    if (!token) {
        yield put(actions.logout());
    }else {
        const expTime = yield new Date(localStorage.getItem('expirationDate'));
        if (expTime < new Date()) {
            yield put(actions.logout());
        } else {
            const userId = yield localStorage.getItem('userId');

            yield put(actions.authSuccess(token, userId));
            yield put(actions.checkAuthTimeout((expTime.getTime() - new Date().getTime()) / 1000));
        }
    }
}
