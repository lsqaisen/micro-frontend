import request from '../utils/request';

/**
 * 获取用户信息
 */
export function profile(data) {
    const { admin = '', current = '' } = data;
    return request(`/profile?admin=${admin}&current=${current}`);
}

/**
 * 登录
 * @param {object} data | {username,password}
 */
export function login(data) {
    const { username, password } = data;
    return request(`/login?username=${username}&password=${password}`, {
        method: 'post',
        body: data
    });
}

/**
 * 修改密码
 * @param {sring} old_password 
 * @param {sring} new_password 
 * @param {sring || undefined} username 
 */
export function modifyPassword(data) {
    const { old_password, new_password, username } = data;
    return request(`/service/auth/api/users/current/password`, {
        method: 'put',
        headers: {
            "Authorization": "Basic " + btoa(username + ":" + old_password)
        },
        body: { old_password, new_password },
    });
}

/**
 * 获取关联域信息
 */
export async function relation() {
    return request('/service/auth/api/ldap/domain');
}

/**
 * 获取license信息
 */
export function license() {
    return request(`/api/license`);
}
/**
 * 延长
 * @param {string} content license 
 */
export function active({ content }) {
    return request(`/api/license`, {
        method: 'post',
        body: { content },
    });
}