import request from '../utils/request';

/**
 * 获取configmap列表
 * @param {string} namespace 空间，system代表为系统管理员 
 * @param {number} page 页
 * @param {number} itemsPerPage 每页条数
 */

interface getConfigMapRequest {
  namespace?: string;
  page?: number;
  itemsPerPage?: number;
}

function getConfigMap({ namespace = "default", page = 1, itemsPerPage = 10 }: getConfigMapRequest) {
  return request(`/service/stack/api/appconfigs?namespace=${namespace}&page=${page}&itemsPerPage=${itemsPerPage}`);
}

export {
  getConfigMapRequest,
}

export default {
  getConfigMap
}
