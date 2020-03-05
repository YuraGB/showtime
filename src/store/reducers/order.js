import * as actyionTupes from '../actions/actionTasks';

const initialState = {
    orders: [],
    loading: false
};

const reducer = (state = initialState, action) => {
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
                orders: state.orders.concat(newOrder)
            };
        case actyionTupes.PURCHASE_BURGAR_ERROR:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};

export default reducer;
