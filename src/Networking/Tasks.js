import {apiRequest} from './Base';
import {projectDetails, worktracksUrl, addTaskUrl, taskUrl, statesUrl, updateStateUrl} from '../Constants';

const loadTasks = (id, block) => {
    const url = projectDetails(id);
    return apiRequest(url, 'GET', null, block);
};

const addTask = (parameters, block) => {
    return apiRequest(addTaskUrl, 'POST', parameters, block);
};

const loadWorktracks = (taskId, block) => {
    const url = worktracksUrl(taskId);
    return apiRequest(url, 'GET', null, block);
};

const loadWorkTask = (taskId, block) => {
    const url = taskUrl(taskId);
    return apiRequest(url, 'GET', null, block);
};

const loadTaskStates = (block) => {
    return apiRequest(statesUrl, 'GET', null, block);
};

const updateTaskState = (parameters, block) => {
    return apiRequest(updateStateUrl, 'POST', parameters, block);
};

export {
    loadTasks,
    addTask,
    loadWorktracks,
    loadWorkTask,
    loadTaskStates,
    updateTaskState,
};
