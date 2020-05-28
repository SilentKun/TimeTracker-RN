const baseUrl = 'http://silentkunz-001-site1.dtempurl.com';
const signInUrl = `${baseUrl}/api/account/signin`;
const signUpUrl = `${baseUrl}/api/account/signup`;
const projectsUrl = `${baseUrl}/api/project/getall`;
const signedProjectsUrl = `${projectsUrl}/1/signedProjects`;
const tasksUrl = (id) => `${signedProjectsUrl}/${id}/tasks`;
const updateProjectUrl = (id) => `${signedProjectsUrl}/${id}`;
const membersUrl = (id) => `${signedProjectsUrl}/${id}/members`;
const updateMembersUrl = (projectId, memberId) => `${signedProjectsUrl}/${projectId}/members/${memberId}`;
const worktracksUrl = (projectId, taskId) => `${signedProjectsUrl}/${projectId}/tasks/${taskId}/worktracks`;

export {
    baseUrl,
    signInUrl,
    signUpUrl,
    projectsUrl,
    signedProjectsUrl,
    tasksUrl,
    updateProjectUrl,
    membersUrl,
    updateMembersUrl,
    worktracksUrl,
};
