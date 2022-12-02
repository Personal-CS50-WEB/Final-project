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
    LOGOUT
    
} from '../actions/types';


const initalState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: localStorage.getItem('access') ? true : false,
    user: null
};

export default function(state = initalState, action) {
    const {type, payload } = action;

    switch(type) {
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('access', payload.access)
            localStorage.setItem('refresh', payload.refresh)
            return {
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh
            }
        case USER_LOADDED_SUCCESS:
            return {
                ...state,
                user:payload
            }
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticated: false
            }
        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: false
            }
        case USER_LOADDED_FAIL:
            return {
                ...state,
                user:null
            }
        case SIGNUP_FAIL:
        case LOGOUT:
        case LOGIN_FAIL:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return {
                ...state,
                isAuthenticated: false,
                access: null,
                refresh: null,
                user: null
            }
        case ACTIVATION_SUCCESS:
        case ACTIVATION_FAIL:
            return {
                ...state
            }
        default: 
            return state
    }
};
