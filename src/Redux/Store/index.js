import {createStore} from 'redux';
import loginReducer from '../Reducers';

export default function configureStore() {
    return createStore(loginReducer);
}
