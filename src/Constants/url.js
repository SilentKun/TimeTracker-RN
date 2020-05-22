const baseUrl = 'https://5dc2b93b1666f6001477f3c5.mockapi.io/';
const signInUrl = `${baseUrl}/signIn`;
const signUpUrl = `${baseUrl}/signUp`;
const projectsUrl = `${baseUrl}/projects`;
const signedProjectsUrl = `${projectsUrl}/1/signedProjects`;
const tasksUrl = (id) => `${signedProjectsUrl}/${id}/tasks`;
const updateProjectUrl = (id) => `${signedProjectsUrl}/${id}`;

export {
    baseUrl,
    signInUrl,
    signUpUrl,
    projectsUrl,
    signedProjectsUrl,
    tasksUrl,
    updateProjectUrl,
};
