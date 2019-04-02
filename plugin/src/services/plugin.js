import request from '../utils/request';

/**
 * 获取插件列表
 */
export function plugins() {
	return request(`/api/plugin`);
}

/**
 * 激活插件
 */
export function active({ name }) {
	return request(`/api/plugin`, {
		method: 'post',
		body: { name },
	})
}

/**
 * 卸载插件
 */
export function del({ name }) {
	return request(`/api/plugin/del`, {
		method: 'post',
		body: { name },
	})
}