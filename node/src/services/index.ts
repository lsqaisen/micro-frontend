import request from '../utils/request';

/**
 * 获取插件激活状态
 */

async function getPluginStatus(name: string) {
  return request(`/api/plugin`).then(({ data, err }: any) => {
    return {
      data: (data.plugins || []).some((plugin: any) => plugin.spec.id === name && plugin.status === 'active'),
      err
    }
  });
}

export default {
  getPluginStatus
}