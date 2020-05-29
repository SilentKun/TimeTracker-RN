import {apiRequest} from './Base';
import {
    projectsUrl,
    signedProjectsUrl,
    updateProjectUrl,
    membersUrl,
    updateMembersUrl,
    acceptInviteUrl,
    addProjectUrl
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
    const url = updateProjectUrl(id);
    return apiRequest(url, 'DELETE', null, block);
};

const loadProjectMembers = (id, block) => {
    const url = membersUrl(id);
    return apiRequest(url, 'GET', null, block);
};

const addProjectMember = (id, parameters, block) => {
    const url = membersUrl(id);
    return apiRequest(url, 'POST', parameters, block);
};

const deleteProjectMember = (projectId, memberId, block) => {
    const url = updateMembersUrl(projectId, memberId);
    return apiRequest(url, 'DELETE', null, block);
};

const acceptInvite = (parameters, block) => {
    return apiRequest(acceptInviteUrl, 'POST', parameters, block);
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
};
