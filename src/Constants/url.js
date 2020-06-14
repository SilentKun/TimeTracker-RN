const baseUrl = 'http://truthofway-001-site1.itempurl.com';
const signInUrl = `${baseUrl}/api/account/signin`;
const signUpUrl = `${baseUrl}/api/account/signup`;
const projectsUrl = `${baseUrl}/api/project/getall`;
const acceptInviteUrl = `${baseUrl}/api/project/accept`;
const declineInviteUrl = (id) => `${baseUrl}/api/project/reject?id=${id}`;
const addProjectUrl = `${baseUrl}/api/project/add`;
const signedProjectsUrl = `${projectsUrl}/1/signedProjects`;
const projectDetails = (id) => `${baseUrl}/api/project/get?id=${id}`;
const updateProjectUrl = `${baseUrl}/api/project/update`;
const deleteProjectUrl = (id) => `${baseUrl}/api/project/delete?Id=${id}`;
const updateUserPage = `${baseUrl}/api/mypage/update`;
const addTaskUrl = `${baseUrl}/api/task/add`;
const updateUserUrl = `${baseUrl}/api/project/UpdateUser`;
const deleteUser = `${baseUrl}/api/project/RemoveUserFromProject`;
const membersUrl = `${baseUrl}/api/project/addUserToProject`;
const worktracksUrl = (id) => `${baseUrl}/api/worktrack/getall?id=${id}`;
const taskUrl = (id) => `${baseUrl}/api/task/get?id=${id}`;
const statesUrl = `${baseUrl}/api/state/getall`;
const updateStateUrl = `${baseUrl}/api/task/UpdateState`;
const deleteTaskUrl = (id) => `${baseUrl}/api/task/delete?Id=${id}`;
const updateTaskUrl = `${baseUrl}/api/task/update`;
const usersUrl = (id) => `${baseUrl}/api/project/GetUsers?id=${id}`;
const currentUserUrl = `${baseUrl}/api/account/GetCurrentUser`;
const reportsUrl = `${baseUrl}/api/worktrack/GetReport`;
const userInfoUrl = `${baseUrl}/api/mypage/get`;
const updateMembersUrl = (projectId, memberId) => `${signedProjectsUrl}/${projectId}/members/${memberId}`;
// const worktracksUrl = (projectId, taskId) => `${signedProjectsUrl}/${projectId}/tasks/${taskId}/worktracks`;

export {
    baseUrl,
    signInUrl,
    signUpUrl,
    projectsUrl,
    addProjectUrl,
    signedProjectsUrl,
    projectDetails,
    updateProjectUrl,
    membersUrl,
    updateMembersUrl,
    worktracksUrl,
    acceptInviteUrl,
    taskUrl,
    updateUserPage,
    deleteProjectUrl,
    deleteUser,
    addTaskUrl,
    updateUserUrl,
    statesUrl,
    updateStateUrl,
    deleteTaskUrl,
    updateTaskUrl,
    usersUrl,
    currentUserUrl,
    reportsUrl,
    userInfoUrl,
    declineInviteUrl,
};
