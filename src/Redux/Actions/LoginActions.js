const keys = {
    USER_LOGGED_IN: 'USER_LOGGED_IN',
    USER_LOGGED_OUT: 'USER_LOGGED_OUT',
    UPDATE_USER: 'UPDATE_USER',
    TRACKING_ON: 'TRACKING_ON',
    TRACKING_OFF: 'TRACKING_OFF',
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

const trackingOn = (task) => {
    return {
        type: keys.TRACKING_ON,
        payload: {task},
    };
};

const trackingOff = () => {
    return {
        type: keys.TRACKING_OFF,
    };
};

export {
    keys as loginActionsKeys,

    logInUser,
    logOutUser,
    updateUser,
    trackingOn,
    trackingOff,
};
