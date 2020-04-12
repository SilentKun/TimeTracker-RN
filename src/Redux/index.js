import React from 'react';
import {Provider} from 'react-redux';
import configureStore from './Store';

const store = configureStore();
window.store = store;

const ReduxApp = ({children}) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
};

export default ReduxApp;
export {
    store,
};
