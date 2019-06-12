import request from '@/utils/request';

function getGroup(project_id: string | number) {
  return request(`/service/auth/api/groups?project_id=${project_id}`);
}

interface addGroupRequest {
  name: string;
  project: string; // * | namespace
  users?: string[];
  description?: string;
  privileges: string[];
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
  addGroupRequest,
}

export default {
  getGroup,
  addGroup,
  deleteGroup,
}
