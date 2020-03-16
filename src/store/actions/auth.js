import * as actionTypes from './actionTasks';
import axios from 'axios';

export const  authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const  authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    };
};

export const  authError = (error) => {
    console.log(error);
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (experationTime) => {
        return dispatch => {
            setTimeout(() => {
                dispatch(logout());
            }, experationTime * 1000);
        };
};

export const setAuthRedirect = path => {
    return {
        type: actionTypes.AUTH_SET_PATH_REDIRECT,
        path: path
    }
};

export const  auth = (email, password, isSignUp) => dispatch => {
    dispatch(authStart());
    const authData = {
        email: email,
        password: password,
        returnSecureToken: true
    };
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCDVt6Dwhq4jRhutRc0mZLvKaMmxhP9MfY';
    if(!isSignUp) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCDVt6Dwhq4jRhutRc0mZLvKaMmxhP9MfY';
    }
    axios.post(url, authData)
    .then(resp => {
         dispatch(authSuccess(resp.data.idToken, resp.data.localId));
         dispatch(checkAuthTimeout(resp.data.expiresIn))
    })
    .catch(err => dispatch(authError(err.response.data.error)))
};
