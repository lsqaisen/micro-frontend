import request from '../utils/request';

/**
 * 获取secret列表
 * @param {string} namespace 工作空间，system代表为系统管理员 
 * @param {number} page 页
 * @param {number} itemsPerPage 每页条数
 */

interface getSecretsRequest {
  namespace?: string;
  page?: number;
  itemsPerPage?: number;
}

function getSecrets({ namespace = "default", page = 1, itemsPerPage = 10 }: getSecretsRequest) {
  return request(`/service/stack/api/secret?namespace=${namespace}&page=${page}&itemsPerPage=${itemsPerPage}`);
}


export {
  getSecretsRequest,
}
export default {
  getSecrets,
}
