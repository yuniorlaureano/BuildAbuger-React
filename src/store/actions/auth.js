import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        console.log(authData);
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCl5OoYFulIiVikKuqeIGpEYtuKSEVvBO0';
        if(isSignup){
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCl5OoYFulIiVikKuqeIGpEYtuKSEVvBO0';
        }
        
        axios.post(url, authData)
             .then( response => {
                 console.log(response);
                 dispatch(authSuccess(response));
             })
             .catch(err => {
                 console.log(err);
                 dispatch(authFail(err));
             });
    };
};