
import request from '../utils/request';

const ORDER_API = '/service/node/api';

/**
 * 获取集群列表
 */
export async function cluster() {
    return request(`${ORDER_API}/cluster`);
}

/**
 * 添加集群
 * @param {string} name     名称
 * @param {string} desc     描述
 * @param {string} type     类型，‘vcenter’ | ‘aliyun’
 * @param {object} vcenter  vcenter账户信息，{name,password,url}
 * @param {object} aliyun   aliyun账户信息,{}
 */
export async function add({ name, desc, type, vcenter, aliyun }) {
    return request(`${ORDER_API}/cluster`, {
        method: 'post',
        body: { name, desc, type, vcenter, aliyun }
    });
}

/**
 * 删除集群
 * @param {string} name     集群名称
 */
export async function del(name) {
    return request(`${ORDER_API}/cluster/${name}`, {
        method: 'delete',
    });
}

/**
 * 获取资源池
 * @param {string} cluster 集群名称
 * @param {string} namespace 工作空间，system代表为系统管理员
 * @param {string} resource 资源池名称，为空获取所有资源池
 * @param {string} type 内置的不可删除或租户的：builtin | tenant
 */
export async function getResource(requestData) {
    const { cluster = "default", namespace, resource = '', type = '' } = requestData;
    return request(`/service/node/api/cluster/${cluster}/namespace/${namespace || 'system'}/resource/${resource}?type=${type}`);
}

/**
 * 创建资源池
 * @param {string} namespace 工作空间，system代表为系统管理员
 * @param {string} name 资源池名称
 * @param {string} desc 资源池备注
 */
export async function createResource(requestData) {
    console.log(requestData)
    const { namespace = 'system', ...body } = requestData;
    return request(`/service/node/api/cluster/default/namespace/${namespace || 'system'}/resource`, {
        method: 'post',
        body,
    });
}

/**
 * 删除资源池
 * @param {string} namespace 工作空间，system代表为系统管理员
 * @param {string} name 资源池名称
 */
export async function deleteResource(requestData) {
    const { namespace = 'system', name } = requestData;
    return request(`/service/node/api/cluster/default/namespace/${namespace || 'system'}/resource/${name}`, {
        method: 'delete',
    });
}

/**
 * 将节点加入资源池
 * @param {string} namespace 工作空间，system代表为系统管理员
 * @param {string} resource 资源池名称
 * @param {string} names 节点名称
 */
export async function joinResource(requestData) {
    const { namespace, resource, names } = requestData;
    return request(`/service/node/api/cluster/default/namespace/${namespace || 'system'}/resource/${resource}/node`, {
        method: 'post',
        body: { names }
    });
}

/**
 * 将节点移除资源池
 * @param {string} namespace 工作空间，system代表为系统管理员
 * @param {string} resource 资源池名称
 * @param {string} name 节点名称
 */
export async function removeResource(requestData) {
    const { namespace, resource, name } = requestData;
    return request(`/service/node/api/cluster/default/namespace/${namespace || 'system'}/resource/${resource}/node/${name}`, {
        method: 'delete',
    });
}

/**
 * 获取节点列表
 * @param {string} namespace 工作空间，system代表为系统管理员
 * @param {string} resource 资源池名称
 * @param {string} type type==node：获取安装好的节点信息，type!=node：获取正在安装的节点
 * @param {number} page 页
 * @param {number} itemsPerPage 每页条数
 */
export async function nodes(requestData) {
    const { cluster = 'default', namespace = 'system', resource = '', type = 'node', page = 1, itemsPerPage = 10 } = requestData;
    return request(`/service/node/api/cluster/${cluster}/node/?namespace=${namespace || 'system'}&resource=${resource}&type=${type}&page=${page}&itemsPerPage=${itemsPerPage}`);
}


/**
 * 添加主机
 * @param {string} auth_type shh类型：username_password : sshkey, 
 * @param {string} ssh_username 当为auth_type 为sshkey时,可以不填
 * @param {string} ssh_password 当为auth_type 为sshkey时,可以不填
 * @param {string} ssh_key 当为auth_type 为username_password时,可以不填
 * @param {string} node_port 端口
 * @param {array} node_ip 节点IP
 */
export async function install(requestData) {
    return request(`/service/node/api/cluster/default/node`, {
        method: 'post',
        body: { ...requestData, node_port: `${requestData.node_port}` },
    });
}

/**
 * 删除节点
 * @param {string} name 节点名称
 */
export async function deleteNode(name) {
    return request(`/service/node/api/cluster/default/node/${name}`, {
        method: 'delete'
    });
}

/**
 * 取消安装等待
 */
export async function cancelInstalling() {
    return request(`/service/node/api/cluster/default/node/stop`);
}

/**
 * 取消安装
 */
export async function cancelPengding(ip) {
    return request(`/service/node/api/cluster/default/node/pending/${ip}`, {
        method: 'delete',
    });
}

/**
 * 删除安装记录
 */
export async function deleteInstall(ip) {
    return request(`/service/node/api/cluster/default/node/history/${ip}`, {
        method: 'delete',
    });
}

/**
 * 删除所有安装记录
 */
export async function deleteInstalls() {
    return request(`/service/node/api/machine/queue/all`, {
        method: 'delete',
    });
}

/**
 * 获取节点详情
 * @param {string} name 节点名称 
 */
export async function nodedetail(requestData) {
    const { name } = requestData;
    return request(`/service/node/api/cluster/default/node/detail/${name}`);
}

/**
 * 修改主机调度状态
 * @param {string} name 节点名称
 * @param {bool} allocatable 是否可调度
 */
export async function modifyStatus(requestData) {
    const { name, allocatable } = requestData;
    return request(`/service/node/api/cluster/default/node/${name}?oper=${allocatable ? 'uncordon' : 'drain'}`, {
        method: 'put',
    });
}

//主机申请管理
/**
 * 申请节点资源
 * @param {string} namespace  
 * @param {string} reqResourcePool 请求资源池
 * @param {string} desResourcePool 目标资源池 
 * @param {number} nodenum 申请节点数 
 * @param {number} cpu 申请节点资源cpu
 * @param {number} mem 申请节点资源内存
 * @param {string} desc 申请描述信息
 */
export async function apply({ namespace, reqResourcePool, desResourcePool, nodenum, cpu, mem, desc }) {
    return request(`/service/node/api/cluster/default/apply`, {
        method: 'post',
        body: { namespace, reqResourcePool, desResourcePool, nodenum, cpu, mem, desc },
    });
}

/**
 * 获取申请列表
 * @param {string} namespace
 * @param {string} status:  reject || agree || cancel
 * @param {string} resource 资源池名称
 */
export async function getApply(data) {
    const { namespace, status, resource } = data;
    return request(`/service/node/api/cluster/default/apply/?namespace=${namespace || ""}&status=${status || ""}&resource=${resource || ""}`);
}

/**
 * 释放节点
 * @param {string} name 节点名称
 */
export async function deleteApply(name) {
    return request(`/service/node/api/cluster/default/node/${name}?oper=release`, {
        method: 'put',
    });
}

/**
 * 分配节点
 * @param {sting} status:  wait || reject || agree || cancel || ""
 * @param {array} node
 */
export async function setApply({ id, status, allocNode = "" }) {
    return request(`/service/node/api/cluster/default/apply/${id}`, {
        method: 'put',
        body: { status, allocNode },
    });
}