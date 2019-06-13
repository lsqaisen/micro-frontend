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

interface addGroupRequest {
  name: string;
  project: string; // * | namespace
  users?: string[];
  description?: string;
  privileges: number[];
}

function addGroup(data: addGroupRequest) {
  return request(`/service/auth/api/groups`, {
    method: 'post',
    body: data
  });
}

function deleteGroup(group_id: string | number) {
  return request(`/service/auth/api/groups/${group_id}`, {
    method: 'delete',
  });
}

function addUserToGroup({ user_id, group_id }) {
  return request(`/service/auth/api/groups/${Number(group_id)}/users`, {
    method: "post",
    body: {
      user_id
    }
  });
}

function removeUserLeaveGroup({ user_id, group_id }) {
  return request(`/service/auth/api/groups/${group_id}/users/${user_id}`, {
    method: "delete"
  });
}


export {
  getPrivilegesRequest,
}

export default {
  getPrivileges
}
