import {apiRequest} from './Base';
import {tasksUrl} from '../Constants';

const loadTasks = (id, block) => {
    const url = tasksUrl(id);
    return apiRequest(url, 'GET', null, block);
};

const addTask = (id, parameters, block) => {
    const url = tasksUrl(id);
    return apiRequest(url, 'POST', parameters, block);
};

export {
    loadTasks,
    addTask,
};
