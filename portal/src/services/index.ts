import request from '../utils/request';

function getPlugins() {
  return request(`/api/plugin`)
}

/**
 * 获取插件激活状态
 */
function getPluginStatus(name: string) {
  return request(`/api/plugin`).then(({ data, err }: any) => {
    return {
      data: ((data || {}).plugins || []).some((plugin: any) => plugin.spec.id === name && plugin.status === 'active'),
      err
    }
  });
}

export default {
  getPlugins,
  getPluginStatus
}