import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeOut = (expireTimeOut) => {
    console.log(expireTimeOut);
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expireTimeOut * 1000);
    };
};

export const authSuccess = (token, userId) => {
    console.log(token);
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
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
        
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCl5OoYFulIiVikKuqeIGpEYtuKSEVvBO0';
        if(isSignup){
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCl5OoYFulIiVikKuqeIGpEYtuKSEVvBO0';
        }
        
        axios.post(url, authData)
             .then( response => {
                 console.log(response);
                 dispatch(authSuccess(response.data));
                 dispatch(checkAuthTimeOut(response.data.expiresIn))
             })
             .catch(err => {
                 dispatch(authFail(err.response.data.error));
             });
    };
};