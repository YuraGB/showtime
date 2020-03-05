import * as actionTypes from './actionTasks';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGAR_SUCCESS,
        orderId: id,
        orderData: orderData
    }
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_ERROR,
        error: error
    }
};

export const purchaseBurgerStart = (orderData) => dispatch => {
    return {
        type: actionTypes.PURCHASE_BURGAR_START
    }
};

export const puchaseBurger = (orderData) => dispatch => {
    dispatch(purchaseBurgerStart());

    axios.post('/orders.json', orderData)
    .then(response => {
        dispatch(purchaseBurgerSuccess(response.data, orderData))
    })
    .catch(err => {
        dispatch(purchaseBurgerFail(err))
    });
};
