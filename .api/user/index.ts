import request from '../request';

/**
 * 登录
 */
interface LoginRequest {
  username: string,
  password: string,
}

function login({ username, password }: LoginRequest) {
  return request(`/login?username=${username}&password=${password}`, {
    method: 'post',
    body: { username, password }
  });
}

/**
 * 登出
 */
function logout() {
  window.location.href = '/logout';
}

/**
 * 获取用户信息
 */
interface ProfileRequest {
  admin?: string,
  current?: string,
}

function getProfile({ admin = '', current = '' }: ProfileRequest) {
  return request(`/profile?admin=${admin}&current=${current}`);
}

/**
 * 修改密码
 */
interface ModifyPasswordRequest {
  username: string,
  old_password: string,
  new_password: string,
}

function modifyPassword({ old_password, new_password, username }: ModifyPasswordRequest) {
  return request(`/service/auth/api/users/current/password`, {
    method: 'put',
    headers: {
      "Authorization": "Basic " + btoa(username + ":" + old_password)
    },
    body: { old_password, new_password },
  });
}


/**
 * 重置密码
 */
interface ResetPasswordRequest {
  uuid: string,
  password: string,
}

function resetPassword({ uuid, password }: ResetPasswordRequest) {
  return request(`/service/auth/reset?reset_uuid=${uuid}&password=${password}`, {
    method: 'post',
  });
}

/**
* 发送验证码在邮件
*/
function sendCode(email: string) {
  return request(`/service/auth/sendEmail?email=${email}`);
}

/**
 * 获取关联域信息
 */
function getDomain() {
  return request('/service/auth/api/ldap/domain');
}

export {
  LoginRequest,
  ProfileRequest,
  ModifyPasswordRequest,
  ResetPasswordRequest,
}
export default {
  login,
  logout,
  getProfile,
  modifyPassword,
  resetPassword,
  sendCode,
  getDomain,
}