import request from '@/utils/request';


/**
 * 获取服务列表
 * @param {string} namespace 空间
 * @param {number} page 页
 * @param {number} itemsPerPage 每页条
 */

interface getStackRequest {
  namespace: string;
  page?: number;
  itemsPerPage?: number;
}

function getStack({ namespace, page = 1, itemsPerPage = 1000000 }: getStackRequest) {
  return request(`/service/stack/api/stack?namespace=${namespace}&page=${page}&itemsPerPage=${itemsPerPage}`);
}


/**
 * 创建应用栈
 * @param {string} namespace 空间
 * @param {string} name 应用栈名称
 * @param {string} ippool 网络
 * @param {string} desc 应用描述
 */

interface createStackRequest {
  namespace: string;
  name: string;
  ippool?: string;
  desc?: string;
}

function createStack(data: createStackRequest) {
  return request(`/service/stack/api/stack`, {
    method: 'post',
    body: data,
  })
}

/**
 * 删除应用栈
 * @param {string} namespace 空间
 * @param {string} name 应用栈名称
 */

interface deleteStackRequest {
  namespace: string;
  name: string;
}

function deleteStack(data: deleteStackRequest) {
  return request(`/service/stack/api/stack/delete`, {
    method: 'post',
    body: data,
  })
}


export {
  getStackRequest,
  createStackRequest,
  deleteStackRequest,
}

export default {
  getStack,
  createStack,
  deleteStack,
}
