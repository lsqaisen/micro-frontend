import request from '../utils/request';

interface getProjectsRequest {
  namespace: string;
  page?: number;
  page_size?: number;
}

function getProjects({ namespace, page = 1, page_size = 10 }: getProjectsRequest) {
  return request(`/service/registry/api/projects?namespace=${namespace}&page=${page}&page_size=${page_size}`);
}

interface createProjectRequest {
  project_name: string;
  owner_id: number;
  user_ids?: number[];
  description?: string;
  is_default?: boolean;
  public?: boolean;
  type?: number;
}

function createProject(requestData: createProjectRequest) {
  return request(`/service/registry/api/projects`, {
    method: 'post',
    body: {
      ...requestData,
      owner_id: Number(requestData.owner_id || 0),
      public: requestData.public ? 1 : 0,
    },
  });
}

interface modifyProjectRequest {
  project_id: string;
  description: string;
}

function modifyProject({ description, project_id }: modifyProjectRequest) {
  return request(`/service/auth/api/projects/${project_id}`, {
    method: 'put',
    body: { description }
  });
}

function deleteProject(project_id: string) {
  return request(`/service/registry/api/projects/${project_id}`, {
    method: 'delete',
  });
}

interface setAdminRequest {
  project_id: number;
  owner_id: number;
}

function setAdmin({ project_id, owner_id }: setAdminRequest) {
  return request(`/service/auth/api/projects/${project_id}`, {
    method: 'put',
    body: { owner_id }
  });
}

export {
  getProjectsRequest,
  modifyProjectRequest,
  createProjectRequest,
  setAdminRequest,
}

export default {
  getProjects,
  deleteProject,
  modifyProject,
  createProject,
  setAdmin,
}
