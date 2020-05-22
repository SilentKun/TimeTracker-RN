import {apiRequest} from './Base';
import {tasksUrl} from '../Constants';

const loadTasks = (id, block) => {
    const url = tasksUrl(id);
    return apiRequest(url, 'GET', null, block);
};

export {
    loadTasks,
};
