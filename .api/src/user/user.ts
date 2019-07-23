import request, { ResType } from '../request';

/**
 * @typedef {Object} LoginRequest
 * @property {string} username - user name
 * @property {string} password - user password
 */
export type LoginRequest = {
	username: string,
	password: string,
}

/**
 * 登录
 * user login
 * @param {LoginRequest} options
 * @param {string} options.username - user name
 * @param {string} options.password - user password
 * @returns {Promise<ResType>}
 */
export function login(options: LoginRequest): Promise<ResType> {
	const { username, password } = options;
	return request(`/login?username=${username}&password=${password}`, {
		method: 'post',
		body: { username, password }
	});
}

/**
 * 登出
 * user logout
 * @returns {null}
 */
export function logout() {
	window.location.href = '/logout';
}

/**
 * @typedef {Object} ProfileRequest
 * @property {string} admin - user is admin
 * @property {string} current - current uesr
 */
export type ProfileRequest = {
	admin?: string,
	current?: string,
}

/**
 * 获取用户信息
 * get user profile
 * @param {ProfileRequest} options
 * @param {string} options.admin
 * @param {string} options.current
 * @returns {Promise<ResType>}
 */
export function getProfile(options: ProfileRequest): Promise<ResType> {
	const { admin = '', current = '' } = options;
	return request(`/profile?admin=${admin}&current=${current}`);
}

/**
 * @typedef {Object} ModifyPasswordRequest
 * @property {string} username - user name
 * @property {string} old_password - user old password
 * @property {string} new_password - user new password
 */
export type ModifyPasswordRequest = {
	username: string,
	old_password: string,
	new_password: string,
}

/**
 * 修改密码
 * modify user password
 * @param {ModifyPasswordRequest} options
 * @param {string} options.username - user name
 * @param {string} options.old_password - user old password
 * @param {string} options.new_password - user new password
 * @returns {Promise<ResType>}
 */
export function modifyPassword(options: ModifyPasswordRequest): Promise<ResType> {
	const { old_password, new_password, username } = options;
	return request(`/service/auth/api/users/current/password`, {
		method: 'put',
		headers: {
			"Authorization": "Basic " + btoa(username + ":" + old_password)
		},
		body: { old_password, new_password },
	});
}


/**
 * @typedef {Object} ResetPasswordRequest
 * @property {string} uuid - uuid
 * @property {string} password - user new password
 */
export type ResetPasswordRequest = {
	uuid: string,
	password: string,
}

/**
 * 重置密码
 * reset password
 * @param {ResetPasswordRequest} options
 * @param {string} options.uuid - uuid
 * @param {string} options.password - user new password
 * @returns {Promise<ResType>}
 */
export function resetPassword(options: ResetPasswordRequest): Promise<ResType> {
	const { uuid, password } = options;
	return request(`/service/auth/reset?reset_uuid=${uuid}&password=${password}`, {
		method: 'post',
	});
}

/**
 * 发送验证码在邮件
 * Send verification code in the mail 
 * @param {string} email
 * @returns {Promise<ResType>}
 */
export function sendCode(email: string): Promise<ResType> {
	return request(`/service/auth/sendEmail?email=${email}`);
}

/**
 * 获取关联域信息
 * get domain list
 * @returns {Promise<ResType>}
 */
export function getDomain(): Promise<ResType> {
	return request('/service/auth/api/ldap/domain');
}
