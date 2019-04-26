import request from '../utils/request';

/**
 * 获取集群列表
 */
function getCluster() {
  return request(`/service/node/api/cluster`);
}

/**
 * 添加集群
 */
enum clusterType { vcenter = "vcenter", aliyun = "aliyun" }

interface vcenterData {
  name: string;
  password: string;
  url: string;
}

interface addClusterRequest {
  name: string; //名称
  desc: string; //描述
  type: clusterType;
  vcenter: vcenterData;
  aliyun: object;
}

function addCluster(requestData: addClusterRequest) {
  return request(`/service/node/api/cluster`, {
    method: 'post',
    body: requestData,
  });
}

/**
 * 删除集群
 */
function deleteCluster(name: string /*集群名称*/) {
  return request(`/service/node/api/cluster/${name}`, {
    method: 'delete',
  });
}

export {
  vcenterData,
  addClusterRequest,
}
export default {
  getCluster,
  addCluster,
  deleteCluster,
}
