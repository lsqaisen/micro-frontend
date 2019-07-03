import request from '../utils/request';

interface getTenantsRequest {
  page?: number;
  page_size?: number;
  project_name?: string;
  is_public?: number;
  tag?: string;
  owner?: number;
  type?: number;
}

function getTenants({ page = 1, page_size = 10, project_name = "", is_public = 0, tag = "namespace", owner = 1, type = 4 }: getTenantsRequest) {
  return request(`/service/auth/api/projects?page=${page}&page_size=${page_size}&project_name=${project_name}&is_public=${is_public}&tag=${tag}&owner=${owner}&type=${type}`);
}

interface createTenantRequest {
  project_name: string;
  owner_id: number;
  user_ids?: number[];
  description?: string;
  is_default?: boolean;
  type?: number;
}

function createTenant({ is_default = true, type = 4, ...data }: createTenantRequest) {
  return request(`/service/tenant/api/tenant`, {
    method: 'post',
    body: { ...data, is_default: true, type: 4 }
  });
}

function deleteTenant(project_id: number) {
  return request(`/service/tenant/api/tenant/${project_id}`, {
    method: 'delete'
  });
}

interface editTenantRequest extends createTenantRequest {
  is_default?: boolean;
  type: number;
  project_id: number;
}

function editTenant(data: editTenantRequest) {
  const { project_id, ...body } = data;
  return request(`/service/auth/api/projects/${project_id}`, {
    method: 'put',
    body: body,
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
  getTenantsRequest,
  createTenantRequest,
  editTenantRequest,
  setAdminRequest,
}

export default {
  getTenants,
  createTenant,
  deleteTenant,
  editTenant,
  setAdmin,
}
