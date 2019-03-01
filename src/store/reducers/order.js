import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: true
};

const reducer = (state =initialState, action) => {
    switch(action.type){
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOder = {
                ...action.orderData,
                id: action.orderId
            };

            return {
                ...state,
                loading: false,
                orders: state.orders.concat(newOder)
            };
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
};