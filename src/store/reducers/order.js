import * as actyionTupes from '../actions/actionTasks';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const reducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case actyionTupes.PURCHASE_BURGAR_START: {
            return {
                ...state,
                loading: true
            }
        }
        case actyionTupes.PURCHASE_BURGAR_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderid
            };
            return {
                ...state,
                loading: false,
                purchased: true,
                orders: state.orders.concat(newOrder)
            };
        case actyionTupes.PURCHASE_BURGAR_ERROR:
            return {
                ...state,
                loading: false,
            };
        case actyionTupes.PURCHASE_INIT:
            return {
                ...state,
                purchased: false
            };
        case actyionTupes.FETCH_ORDERS_START:
            return {
                ...state,
                loading: true
            };
        case actyionTupes.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                orders:action.orders,
                loading: false
            };
        case actyionTupes.FETCH_ORDERS_FAIL:
            return {
                ...state,
                loading: false

            };
        default:
            return state;
    }
};

export default reducer;
