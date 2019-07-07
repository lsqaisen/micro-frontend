import request from '../utils/request';

interface getRepositoriesRequest {
  page?: number;
  page_size?: number;
  detail: boolean;
  q?: string;
  project_id?: string;
}

function getRepositories({ page = 1, page_size = 10, detail = true, q = '', project_id }: getRepositoriesRequest) {
  return request(`/service/registry/api/repositories?page=${page}&page_size=${page_size}&detail=${detail}&q=${q}&project_id=${project_id}`);
}

function getTags(repository_name: string) {
  return request(`/service/registry/api/repositories/${repository_name}/tags`);
}

interface lockRequest {
  resource_name: string;
  resource?: string;
  tag: string;
  lock: string;
}

function lock({ resource_name, resource = "repository", tag, lock }: lockRequest) {
  return request(`/service/registry/api/resource`, {
    method: lock ? 'post' : 'delete',
    body: { resource_name, resource, tag }
  });
}

function upload(formData: any) {
  return request(`/service/ci/upload`, {
    method: 'post',
    body: formData,
  }, true);
}

interface deleteTagRequest {
  repository_name: string;
  tag: string;
}

function deleteTag({ repository_name, tag }: deleteTagRequest) {
  return request(`/service/registry/api/repositories/${repository_name}/tags/?tag=${tag}`, {
    method: 'delete'
  })
}

export {
  getRepositoriesRequest,
  lockRequest,
  deleteTagRequest,
}

export default {
  getRepositories,
  getTags,
  lock,
  upload,
  deleteTag,
}
