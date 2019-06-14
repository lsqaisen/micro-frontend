import request from '@/utils/request';

function getGroup(project_id: string | number) {
  return request(`/service/auth/api/groups?project_id=${project_id}`);
}

interface addGroupRequest {
  name: string;
  project: string; // * | namespace
  users?: number[];
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

interface actionUserRequest {
  user_id: number;
  group_id: string | number;
}

function addUser({ user_id, group_id }: actionUserRequest) {
  return request(`/service/auth/api/groups/${group_id}/users`, {
    method: "post",
    body: { user_id: Number(user_id) }
  });
}

function removeUser({ user_id, group_id }: actionUserRequest) {
  return request(`/service/auth/api/groups/${group_id}/users/${user_id}`, {
    method: "delete"
  });
}


export {
  addGroupRequest,
  actionUserRequest,
}

export default {
  getGroup,
  addGroup,
  deleteGroup,
  addUser,
  removeUser,
}
