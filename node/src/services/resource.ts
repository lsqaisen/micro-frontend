
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

/**
 * 创建资源池
 */
interface createResourceRequest {
  namespace?: string | undefined;		// 工作空间，system代表为系统管理员
  name: string; 		// 资源池名称，为空获取所有资源池
  desc?: string | undefined;  // 资源池备注
}

function createResource(requestData: createResourceRequest) {
  const { namespace = 'system', ...body } = requestData;
  return request(`/service/node/api/cluster/default/namespace/${namespace}/resource`, {
    method: 'post',
    body,
  });
}

/**
 * 删除资源池
 */
interface deleteResourceRequest {
  namespace?: string | undefined;	// 工作空间，system代表为系统管理员
  name: string;	// 资源池名称，为空获取所有资源池
}

function deleteResource(requestData: deleteResourceRequest) {
  const { namespace = 'system', name } = requestData;
  return request(`/service/node/api/cluster/default/namespace/${namespace}/resource/${name}`, {
    method: 'delete',
  });
}

/**
 * 将节点加入资源池
 */
interface joinResourceRequest {
  namespace?: string | undefined;		// 工作空间，system代表为系统管理员
  resource: string;//资源池名称
  names: string | string[];		// 节点名称
}
function joinResource(requestData: joinResourceRequest) {
  const { namespace, resource, names } = requestData;
  return request(`/service/node/api/cluster/default/namespace/${namespace || 'system'}/resource/${resource}/node`, {
    method: 'post',
    body: { names }
  });
}

/**
 * 将节点移除资源池
 */
interface removeResourceRequest {
  namespace?: string | undefined; 		// 工作空间，system代表为系统管理员
  resource: string; //资源池名称
  name: string;		// 节点名称
}
function removeResource(requestData: removeResourceRequest) {
  const { namespace = "system", resource, name } = requestData;
  return request(`/service/node/api/cluster/default/namespace/${namespace}/resource/${resource}/node/${name}`, {
    method: 'delete',
  });
}

export {
  getResourceRequest,
  createResourceRequest,
  deleteResourceRequest,
  joinResourceRequest,
  removeResourceRequest,
}
export default {
  getResource,
  createResource,
  deleteResource,
  joinResource,
  removeResource,
}
