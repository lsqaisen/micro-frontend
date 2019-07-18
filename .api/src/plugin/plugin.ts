import request, { ResType } from '../request';

/**
 * 获取插件激活状态
 * get plugin status
 * @param {string} name - plugin name
 * @returns {Promise<ResType>}
 */

export function getPluginStatus(name: string): Promise<ResType> {
	return request(`/api/plugin`).then(({ data, err }: any) => {
		return {
			data: ((data || {}).plugins || []).some((plugin: any) => plugin.spec.id === name && plugin.status === 'active'),
			err
		}
	});
}

/**
 * 获取插件列表
 * get plugin list
 * @returns {Promise<ResType>}
 */
export function plugins(): Promise<ResType> {
	return request(`/api/plugin`);
}

/**
 * 激活插件
 * Active the plugin by name
 * @param name - The plugin name
 * @returns {Promise<ResType>}
 */
export function active(name: string): Promise<ResType> {
	return request(`/api/plugin`, {
		method: 'post',
		body: { name },
	})
}

/**
 * 卸载插件
 * del the plugin by name
 * @param name - The plugin name
 * @returns {Promise<ResType>}
 */
export function del(name: string): Promise<ResType> {
	return request(`/api/plugin/del`, {
		method: 'post',
		body: { name },
	})
}