import {apiRequest} from './Base';
import {projectDetails, worktracksUrl, addTaskUrl} from '../Constants';

const loadTasks = (id, block) => {
    const url = projectDetails(id);
    return apiRequest(url, 'GET', null, block);
};

const addTask = (parameters, block) => {
    return apiRequest(addTaskUrl, 'POST', parameters, block);
};

const loadWorktracks = (projectId, taskId, block) => {
    const url = worktracksUrl(projectId, taskId);
    return apiRequest(url, 'GET', null, block);
};

export {
    loadTasks,
    addTask,
    loadWorktracks,
};
