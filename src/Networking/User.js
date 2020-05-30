import {apiRequest} from './Base';
import {updateUserPage} from '../Constants';

export const updateUserData = (parameters, block) => {
    return apiRequest(updateUserPage, 'POST', parameters, block);
};
