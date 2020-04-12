const keys = {
    USER_LOGGED_IN: 'USER_LOGGED_IN',
    USER_LOGGED_OUT: 'USER_LOGGED_OUT',
    UPDATE_USER: 'UPDATE_USER',
};

const updateUser = (user) => {
    return {
        type: keys.UPDATE_USER,
        payload: {user},
    };
};

const logInUser = (user) => {
    return {
        type: keys.USER_LOGGED_IN,
        payload: {user},
    };
};

const logOutUser = () => {
    return {
        type: keys.USER_LOGGED_OUT,
    };
};

export {
    keys as loginActionsKeys,

    logInUser,
    logOutUser,
    updateUser,
};
