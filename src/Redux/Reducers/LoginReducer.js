import {loginActionsKeys as keys} from '../Actions/LoginActions';

const loginReducer = (state = {isLoggedIn: false, currentUser: null}, action) => {
    switch (action.type) {
    case keys.UPDATE_USER:
        return {...state, isLoggedIn: true, currentUser: action.payload.user};
    case keys.USER_LOGGED_IN:
        return {...state, isLoggedIn: true, currentUser: action.payload.user};
    case keys.USER_LOGGED_OUT:
        return {...state, isLoggedIn: false, currentUser: null};
    default:
        return state;
    }
};

export default loginReducer;
