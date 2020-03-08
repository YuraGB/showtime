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

export const purchaseBurgerStart = (orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGAR_START
    }
};

export const puchaseBurger = (orderData) => dispatch => {
    dispatch(purchaseBurgerStart());
    console.log("purchase", purchaseBurgerStart);

    axios.post('/orders.json', orderData)
    .then(response => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData))
    })
    .catch(err => {
        dispatch(purchaseBurgerFail(err))
    });
};

export const purchaseInit = () => {
    return {
        type : actionTypes.PURCHASE_INIT
    }
};

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
};

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
};

export const fetchOrders = () => dispatch => {
    dispatch(fetchOrdersStart());

    axios.get('./orders.json')
        .then(res => {
            const fetchData = [];
            for( let key in res.data){
                fetchData.push(
                    {
                        ...res.data[key],
                        id: key
                    })
            }
            dispatch(fetchOrdersSuccess(fetchData));
        })
        .catch(e => dispatch(fetchOrdersFail(e)))
};

