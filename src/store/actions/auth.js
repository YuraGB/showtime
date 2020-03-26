import * as actionTypes from './actionTasks';

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
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_INITIAL_LOGOUT
    };
};

export  const logoutSucceed = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
};

export const checkAuthTimeout = (experationTime) => {
        return {
            type: actionTypes.AUTH_CHECK_TIMEOUT,
            experationTime: experationTime
        };
};

export const setAuthRedirect = path => {
    return {
        type: actionTypes.AUTH_SET_PATH_REDIRECT,
        path: path
    }
};

export const  auth = (email, password, isSignUp) => {
   return {
       type:actionTypes.AUTH_USER,
       email: email, password: password, isSignUp: isSignUp
   }
};

export const authCheckState = () => {
    return {
        type: actionTypes.AUTH_CHECK_STATE
    }
};
