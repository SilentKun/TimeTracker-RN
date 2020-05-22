import {apiRequest} from './Base';
import {projectsUrl, signedProjectsUrl, updateProjectUrl} from '../Constants';

const loadProjects = (block) => {
    return apiRequest(projectsUrl, 'GET', null, block);
};

const addProject = (parameters, block) => {
    return apiRequest(signedProjectsUrl, 'POST', parameters, block);
};

const editProject = (id, parameters, block) => {
    const url = updateProjectUrl(id);
    return apiRequest(url, 'PUT', parameters, block);
};

const deleteProject = (id, block) => {
    const url = updateProjectUrl(id);
    return apiRequest(url, 'DELETE', null, block);
};

export {
    loadProjects,
    addProject,
    editProject,
    deleteProject,
};
