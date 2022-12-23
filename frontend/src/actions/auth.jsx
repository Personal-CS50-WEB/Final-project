import axios from 'axios';
import{
    LOGIN_SUCCESS,
    LOGIN_FAIL ,
    USER_LOADDED_SUCCESS,
    USER_LOADDED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    UPDATE_TOKEN_SUCCESS,
    LOGOUT
    
} from './types';

export const checkAuthenticated = () => async dispatch => {
    // if access token call api to verify
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }; 
        const body = JSON.stringify({ token: localStorage.getItem('access') });
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/verify/`, body, config)
            if (res.data.code !== 'token_not_valid') {
                dispatch({
                    type: AUTHENTICATED_SUCCESS
                });
            } else{
                    dispatch({
                        type: AUTHENTICATED_FAIL
                    });
                }
        // if token expired call api to refresh token
        } catch (err) {
            try{
                const data = JSON.stringify({ refresh: localStorage.getItem('refresh') });
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/refresh/`, 
                data, config)
                
                if (res.data.code !== 'token_not_valid') {
                    dispatch({
                        type:UPDATE_TOKEN_SUCCESS,
                        payload: res.data
                    });
                    dispatch(loud_user());
                }
            }catch(err){
            dispatch({
                type: AUTHENTICATED_FAIL
            });
        }
    }
    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
};

export const loud_user = () => async dispatch => {
    // call api to get user data
    if (localStorage.getItem('access')){
        const config = {
            headers: {
                'Authorization': `JWT  ${localStorage.getItem('access')}`,
            }
        };
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config)
    
            dispatch({
                type: USER_LOADDED_SUCCESS,
                payload: res.data
            });
            
        } catch(err){
            dispatch({
                type: USER_LOADDED_FAIL
            });
        }
    }
    else {
        dispatch({
            type: USER_LOADDED_FAIL
        });
    }
};

export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({ email, password })
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create`, body, config)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(loud_user());
    } catch(err){
        dispatch({
            type: LOGIN_FAIL
        });
    }
};
export const signup = (username, email, password, re_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({ username, email, password, re_password });
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body, config);

        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: SIGNUP_FAIL
        })
    }
};

export const verify = (uid, token) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT  ${localStorage.getItem('access')}`,
        }
    };
    const body = JSON.stringify({ uid, token });
    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/activation/`, body, config);

        dispatch({
            type: ACTIVATION_SUCCESS,
        });
    } catch (err) {
        dispatch({
            type: ACTIVATION_FAIL
        })
    }
};

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
};


