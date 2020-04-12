import {apiRequest} from './Base';
import {signUpUrl} from '../Constants';

export const signUpRequest = (parameters, block) => {
    return apiRequest(signUpUrl, 'POST', parameters, block);
};
