import * as actionTypes from '../actions/actionTasks';
import { updateObject } from '../utility';

const initState = {
    token: null,
    userId: null,
    error: null,
    loading: false
};

const authStart = (state, action) => {
    return updateObject(state, {error: null, loading: true});
};

const authSuccess = (state, action) => {
    console.log(state, action);
    return updateObject(state, {
        error: null,
        loading: false,
        token: action.token,
        userId: action.userId
    });
};

const authLogout = (state, action) => {
    return updateObject(state, {token: null, userId: null})
};

const authFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    })
};

const reducer = (state=initState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTH_FAIL:
            return authFail(state, action);
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state,action);
        default:
            return state;
    }
};

export default reducer;
