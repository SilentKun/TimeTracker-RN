import {apiRequest} from './Base';
import {updateUserPage, updateUserUrl, usersUrl, currentUserUrl, reportsUrl, userInfoUrl} from '../Constants';

const updateUserData = (parameters, block) => {
    return apiRequest(updateUserPage, 'POST', parameters, block);
};

const updateUser = (parameters, block) => {
    return apiRequest(updateUserUrl, 'POST', parameters, block);
};

const loadUsers = (id, block) => {
    const url = usersUrl(id);
    return apiRequest(url, 'GET', null, block);
};

const loadCurrentUser = (block) => {
    return apiRequest(currentUserUrl, 'GET', null, block);
};

const loadUserStats = (parameters, block) => {
    return apiRequest(reportsUrl, 'POST', parameters, block);
};

const loadUserInfo = (block) => {
    return apiRequest(userInfoUrl, 'GET', null, block);
};

export {
    updateUserData,
    updateUser,
    loadUsers,
    loadCurrentUser,
    loadUserStats,
    loadUserInfo,
};
