import request from '../utils/request';

/**
 * 获取资源池列表
 */
enum resourceType { builtin = "builtin", tenant = "tenant" }
interface getResourceRequest {
  cluster?: string | undefined;  		// 集群名称
  namespace?: string | undefined;		// 工作空间，system代表为系统管理员
  resource?: string | undefined; 		// 资源池名称，为空获取所有资源池
  type?: resourceType | undefined;  // 内置的不可删除或租户的：builtin | tenant
}

function getResource(data: getResourceRequest) {
  const { cluster = "default", namespace = "system", resource = '', type = '' } = data;
  return request(`/service/node/api/cluster/${cluster}/namespace/${namespace}/resource/${resource}?type=${type}`);
}


export {
  getResourceRequest,
}
export default {
  getResource,
}
