import {apiRequest} from './Base';
import {updateUserPage, updateUserUrl} from '../Constants';

const updateUserData = (parameters, block) => {
    return apiRequest(updateUserPage, 'POST', parameters, block);
};

const updateUser = (parameters, block) => {
    return apiRequest(updateUserUrl, 'POST', parameters, block);
};

export {
    updateUserData,
    updateUser,
};
