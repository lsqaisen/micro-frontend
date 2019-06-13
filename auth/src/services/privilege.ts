import request from '@/utils/request';

interface getPrivilegesRequest {
  admin?: boolean;
  project_id: string | number;
}

function getPrivileges({ admin, project_id }: getPrivilegesRequest) {
  let url = admin ?
    `/service/auth/api/joint-privileges` :
    `/service/auth/api/joint-privileges?project_id=${project_id}`;
  return request(url);
}

interface updatePrivilegesRequest {
  group_id: number;
  privileges?: number[];
  remove_privileges?: number[];
}

function updatePrivileges({ group_id, privileges = [], remove_privileges = [] }: updatePrivilegesRequest) {
  return request(`/service/auth/api/groups`, {
    method: 'put',
    body: {
      group_id,
      privileges,
      remove_privileges
    }
  });
}

export {
  getPrivilegesRequest,
  updatePrivilegesRequest,
}

export default {
  getPrivileges,
  updatePrivileges
}
