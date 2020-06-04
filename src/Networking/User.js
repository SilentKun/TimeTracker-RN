import {apiRequest} from './Base';
import {updateUserPage, updateUserUrl, usersUrl, currentUserUrl, statsUrl} from '../Constants';

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
    return apiRequest(statsUrl, 'POST', parameters, block);
};

export {
    updateUserData,
    updateUser,
    loadUsers,
    loadCurrentUser,
    loadUserStats,
};
