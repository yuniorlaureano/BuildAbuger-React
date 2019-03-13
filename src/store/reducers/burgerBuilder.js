import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 0,
    error: false,
    building: false
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
                totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName],
                building: true
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientName],
                building: true
            };
        case actionTypes.SET_INGREDIENT:
            return {
                ...state,
                ingredients: action.ingredients,
                error: false,
                totalPrice: 4,
                building: false
            };
        case actionTypes.FETCH_INGREDIENT_FAILED:
            return {
                ...state,
                error: true
            };
        default: 
            return state;
    }
};

export default reducer;