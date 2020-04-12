import {apiRequest} from './Base';
import {signInUrl} from '../Constants';

export const signInRequest = (parameters, block) => {
    return apiRequest(signInUrl, 'POST', parameters, block);
};
