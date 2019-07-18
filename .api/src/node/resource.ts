
import request, { ResType } from '../request';


/**
 * @typedef {Object} getResourceRequest
 * @property {string} cluster - 集群名称
 * @property {string} namespace - 工作空间，system代表为系统管理员
 * @property {string} resource - 资源池名称，为空获取所有资源池
 * @property {builtin' | 'tenant' | undefined} type - 内置的不可删除或租户的：builtin | tenant
 */
export type getResourceRequest = {
  cluster?: string;
  namespace?: string;
  resource?: string;
  type?: 'builtin' | 'tenant' | undefined;
}

/**
 * 获取资源池列表
 * get resource list
 * @param {getResourceRequest} options
 * @param {string} options.cluster - 集群名称
 * @param {string} options.namespace - 工作空间，system代表为系统管理员
 * @param {string} options.resource - 资源池名称，为空获取所有资源池
 * @param {builtin' | 'tenant' | undefined} options.type - 内置的不可删除或租户的：builtin | tenant
 * @returns {Promise<ResType>}
 */
export function getResource(options: getResourceRequest): Promise<ResType> {
  const { cluster = "default", namespace = "system", resource = '', type = '' } = options;
  return request(`/service/node/api/cluster/${cluster}/namespace/${namespace}/resource/${resource}?type=${type}`);
}

/**
 * @typedef {Object} createResourceRequest
 * @property {string} namespace - 工作空间，system代表为系统管理员
 * @property {string} name - 资源池名称，为空获取所有资源池
 * @property {string} desc - 资源池备注
 */
export type createResourceRequest = {
  namespace?: string;
  name: string;
  desc?: string;
}

/**
 * 创建资源池
 * create resource
 * @param {createResourceRequest} options
 * @property {string} options.namespace - 工作空间，system代表为系统管理员
 * @property {string} options.name - 资源池名称，为空获取所有资源池
 * @property {string} options.desc - 资源池备注
 * @returns {Promise<ResType>}
 */
export function createResource(options: createResourceRequest): Promise<ResType> {
  const { namespace = 'system', ...body } = options;
  return request(`/service/node/api/cluster/default/namespace/${namespace}/resource`, {
    method: 'post',
    body,
  });
}

/**
 * @typedef {Object} deleteResourceRequest
 * @property {string} namespace - 工作空间，system代表为系统管理员
 * @property {string} name - 资源池名称，为空获取所有资源池
 */
export type deleteResourceRequest = {
  namespace?: string;
  name: string;
}

/**
 * 删除资源池
 * delete resource
 * @param {deleteResourceRequest} options
 * @property {string} options.namespace - 工作空间，system代表为系统管理员
 * @property {string} options.name - 资源池名称，为空获取所有资源池
 * @returns {Promise<ResType>}
 */
export function deleteResource(options: deleteResourceRequest): Promise<ResType> {
  const { namespace = 'system', name } = options;
  return request(`/service/node/api/cluster/default/namespace/${namespace}/resource/${name}`, {
    method: 'delete',
  });
}

/**
 * @typedef {Object} joinResourceRequest
 * @property {string} namespace - 工作空间，system代表为系统管理员
 * @property {string} resource - 资源池名称
 * @property {string | string[]} names - 节点名称
 */
export type joinResourceRequest = {
  namespace?: string;
  resource: string;
  names: string | string[];
}

/**
 * 将节点加入资源池
 * node join resource
 * @param {joinResourceRequest} options
 * @property {string} options.namespace - 工作空间，system代表为系统管理员
 * @property {string} options.name - 资源池名称，为空获取所有资源池
 * @returns {Promise<ResType>}
 */
export function joinResource(options: joinResourceRequest): Promise<ResType> {
  const { namespace, resource, names } = options;
  return request(`/service/node/api/cluster/default/namespace/${namespace || 'system'}/resource/${resource}/node`, {
    method: 'post',
    body: { names }
  });
}

/**
 * @typedef {Object} removeResourceRequest
 * @property {string} namespace - 工作空间，system代表为系统管理员
 * @property {string} resource - 资源池名称
 * @property {string} name - 节点名称
 */
export type removeResourceRequest = {
  namespace?: string;
  resource: string;
  name: string;
}

/**
 * 将节点移除资源池
 * resource remove node 
 * @param {removeResourceRequest} options
 * @property {string} options.namespace - 工作空间，system代表为系统管理员
 * @property {string} options.name - 资源池名称，为空获取所有资源池
 * @returns {Promise<ResType>}
 */
export function removeResource(options: removeResourceRequest): Promise<ResType> {
  const { namespace = "system", resource, name } = options;
  return request(`/service/node/api/cluster/default/namespace/${namespace}/resource/${resource}/node/${name}`, {
    method: 'delete',
  });
}