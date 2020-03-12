import * as actionTypes from './actionTasks';

export const  authStart = () => {
    return {
        type: actionTypes.AUTH_SUCCESS
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

export const  auth = (email, password) => dispatch => dispatch(authStart());