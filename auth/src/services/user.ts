import request from '@/utils/request';

// 查询角色-所有角色下面的所有用户
interface getUsersRequest {
  project_id: string | number;
  admin: boolean;
  username?: string;
  page?: number;
  page_size?: number;
  group_id?: string | number;
}

function getUsers({ group_id, project_id, admin, username = "", page = 1, page_size = 100000 }: getUsersRequest) {
  if (!!group_id && group_id !== "*") {
    return request(`/service/auth/api/groups/${group_id}/detail`);
  } else {
    let url = admin ?
      `/service/auth/api/users?username=${username}&page=${page}&page_size=${page_size}` :
      `/service/auth/api/projects/${project_id}/members?username=${username}&page=${page}&page_size=${page_size}`;
    return request(url);
  }
}


interface deleteUserRequest {
  admin: boolean;
  project_id: string | number;
  user_id: string | number;
  group_id: string | number;
}

function deleteUser({ admin, project_id, user_id, group_id }: deleteUserRequest) {
  let url = Number(group_id) != 0 ?
    `/service/auth/api/groups/${group_id}/users/${user_id}` :
    admin ? `/service/auth/api/users/${user_id}` :
      `/service/auth/api/projects/${project_id}/members/${user_id}`;
  return request(url, {
    method: 'delete'
  });
}

interface addUserRequest {
  admin: boolean;
  type?: number;
  email: string;
  realname: string;
  username: string;
  comment: string;
  project: string;
  password: string;
}

function addUser({ admin, type = 1, project, ...data }: addUserRequest) {
  if (!admin) type = 2;
  let url = admin ? `/service/auth/api/users` : `/service/auth/api/users?project=${project}`;
  return request(url, {
    method: 'post',
    body: { ...data, type }
  });
}


export {
  deleteUserRequest,
  getUsersRequest,
  addUserRequest,
}

export default {
  getUsers,
  deleteUser,
  addUser,
}
