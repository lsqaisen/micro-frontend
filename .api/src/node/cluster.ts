import request, { ResType } from '../request';

/**
 * 获取集群列表
 * get cluster list
 * @returns {Promise<ResType>}
 */
export function getCluster(): Promise<ResType> {
  return request(`/service/node/api/cluster`);
}

/**
 * @typedef {object} VcenterData
 * @property {string} name - vcenter name
 * @property {string} password - vcenter password
 * @property {string} url - vcenter url
 */
export type VcenterData = {
  name: string;
  password: string;
  url: string;
}


/**
 * @typedef {object} addClusterRequest
 * @property {string} name
 * @property {string} desc
 * @property {"vcenter" | "aliyun"} type
 * @property {VcenterData} vcenter
 * @property {object} aliyun
 */
export type addClusterRequest = {
  name: string;
  desc: string;
  type: "vcenter" | "aliyun";
  vcenter: VcenterData;
  aliyun: object;
}

/**
 * 添加集群
 * add cluster
 * @param {addClusterRequest} options
 * @param {string} options.name
 * @param {string} options.desc
 * @param {"vcenter" | "aliyun"} options.type
 * @param {VcenterData} options.vcenter
 * @param {object} options.aliyun
 * @returns {Promise<ResType>}
 */
export function addCluster(options: addClusterRequest): Promise<ResType> {
  return request(`/service/node/api/cluster`, {
    method: 'post',
    body: options,
  });
}

/**
 * 删除集群
 * delete cluster
 * @param {string} name - cluster name
 * @returns {Promise<ResType>}
 */
export function deleteCluster(name: string): Promise<ResType> {
  return request(`/service/node/api/cluster/${name}`, {
    method: 'delete',
  });
}