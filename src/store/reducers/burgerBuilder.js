import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0,
    },
    totalPrice: 0,
};

const INGREDIENTS_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 0.7,
    bacon: 0.7
};

const reducer = (state= initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENTS: 
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientName]
            };
        default: 
            return state;
    }
};

export default reducer;