
import request from '../utils/request';

/**
 * 获取集群列表
 */
export function getCluster() {
  return request(`/service/node/api/cluster`);
}

/**
 * 添加集群
 */
enum clusterType { vcenter = "vcenter", aliyun = "aliyun" }
export interface vcenterData {
  name: string;
  password: string;
  url: string;
}
export interface addRequest {
  name: string; //名称
  desc: string; //描述
  type: clusterType;
  vcenter: vcenterData;
  aliyun: object;
}

export function addCluster(requestData: addRequest) {
  return request(`/service/node/api/cluster`, {
    method: 'post',
    body: requestData,
  });
}

/**
 * 删除集群
 */
export function deleteCluster(name: string /*集群名称*/) {
  return request(`/service/node/api/cluster/${name}`, {
    method: 'delete',
  });
}
