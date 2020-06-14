import {apiRequest} from './Base';
import {
    projectsUrl,
    updateProjectUrl,
    membersUrl,
    deleteProjectUrl,
    acceptInviteUrl,
    addProjectUrl,
    deleteUser,
    declineInviteUrl,
} from '../Constants';

const loadProjects = (block) => {
    return apiRequest(projectsUrl, 'GET', null, block);
};

const addProject = (parameters, block) => {
    return apiRequest(addProjectUrl, 'POST', parameters, block);
};

const editProject = (parameters, block) => {
    return apiRequest(updateProjectUrl, 'POST', parameters, block);
};

const deleteProject = (id, block) => {
    const url = deleteProjectUrl(id);
    return apiRequest(url, 'DELETE', null, block);
};

const loadProjectMembers = (id, block) => {
    const url = membersUrl(id);
    return apiRequest(url, 'GET', null, block);
};

const addProjectMember = (parameters, block) => {
    return apiRequest(membersUrl, 'POST', parameters, block);
};

const deleteProjectMember = (parameters, block) => {
    return apiRequest(deleteUser, 'POST', parameters, block);
};

const acceptInvite = (parameters, block) => {
    return apiRequest(acceptInviteUrl, 'POST', parameters, block);
};

const declineInvite = (id, block) => {
    const url = declineInviteUrl(id);
    return apiRequest(url, 'POST', null, block);
};

export {
    loadProjects,
    addProject,
    editProject,
    deleteProject,
    loadProjectMembers,
    addProjectMember,
    deleteProjectMember,
    acceptInvite,
    declineInvite,
};
