import * as actionTypes from './actionTasks';
import axios from 'axios';

export const  authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const  authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    };
};

export const  authError = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const  auth = (email, password) => dispatch => {
    console.log(email, password);
    dispatch(authStart());
    const authData = {
        email: email,
        password: password,
        returnSecureToken: true
    };
    axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCDVt6Dwhq4jRhutRc0mZLvKaMmxhP9MfY', authData)
    .then(resp => dispatch(authSuccess(resp.data)))
    .catch(err => dispatch(authError(err)))
};
