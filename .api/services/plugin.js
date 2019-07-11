
import request from '../utils/request';

/**
 * 获取插件列表
 */
export async function plugins() {
    return request(`/api/plugin`);
}

/**
 * 激活插件
 */
export async function active({ name }) {
    return request(`/api/plugin`, {
        method: 'post',
        body: { name },
    })
}

/**
 * 卸载插件
 */
export async function del({ name }) {
    return request(`/api/plugin/del`, {
        method: 'post',
        body: { name },
    })
}