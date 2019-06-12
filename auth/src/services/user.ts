import request from '@/utils/request';

// 查询角色-所有角色下面的所有用户
interface getUsersRequest {
  project_id: string | number;
  admin: boolean;
  username?: string;
  page?: number;
  page_size?: number;
}
function getUsers({ project_id, admin, username = "", page = 1, page_size = 100000 }: getUsersRequest) {
  let url = admin ?
    `/service/auth/api/users?username=${username}&page=${page}&page_size=${page_size}` :
    `/service/auth/api/projects/${project_id}/members?username=${username}&page=${page}&page_size=${page_size}`;
  return request(url);
}


export {
  getUsersRequest,
}

export default {
  getUsers,
}
