import {loginActionsKeys as keys} from '../Actions/LoginActions';

const loginReducer = (state = {isLoggedIn: false, currentUser: null, isTracking: false, task: null}, action) => {
    switch (action.type) {
    case keys.UPDATE_USER:
        return {...state, isLoggedIn: true, currentUser: action.payload.user};
    case keys.USER_LOGGED_IN:
        return {...state, isLoggedIn: true, currentUser: action.payload.user};
    case keys.USER_LOGGED_OUT:
        return {...state, isLoggedIn: false, currentUser: null};
    case keys.TRACKING_ON:
        return {...state, isTracking: true, task: action.payload.task};
    case keys.TRACKING_OFF:
        return {...state, isTracking: false, task: null};
    default:
        return state;
    }
};

export default loginReducer;
