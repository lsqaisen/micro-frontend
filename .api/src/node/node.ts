import request, { ResType } from '../request';

/**
 * @typedef {Object} getNodesRequest
 * @property {string} cluster - cluster name
 * @property {string} namespace - namespace
 * @property {string} resource - resource name
 * @property {string} type - resource name
 * @property {number} page - page
 * @property {number} page_size - page size
 */
export type getNodesRequest = {
	cluster?: string;
	namespace?: string;
	resource?: string;
	type?: string | 'node';
	page?: number;
	page_size?: number;
}

/**
 * 获取节点列表
 * get node list
 * @param {getNodesRequest} options
 * @param {string} options.cluster - cluster name
 * @param {string} options.namespace - namespace
 * @param {string} options.resource - resource name
 * @param {string} options.type - resource name
 * @param {number} options.page - page
 * @param {number} options.page_size - page size
 * @returns {Promise<ResType>}
 */
export function getNodes(options: getNodesRequest): Promise<ResType> {
	const { cluster = 'default', namespace = 'system', resource = '', type = 'node', page = 1, page_size = 10 } = options;
	return request(`/service/node/api/cluster/${cluster}/node/?namespace=${namespace}&resource=${resource}&type=${type}&page=${page}&itemsPerPage=${page_size}`);
}

/**
 * @typedef {Object} installRequest
 * @property {string} auth_type - ssh type
 * @property {string} ssh_username - 当为auth_type 为sshkey时,可以不填
 * @property {string} ssh_password - 当为auth_type 为sshkey时,可以不填
 * @property {string} ssh_key - 当为auth_type 为username_password时,可以不填
 * @property {number} node_port - 端口
 * @property {number} node_ip -节点IP
 */
export type installRequest = {
	auth_type: "username_password" | "sshkey";
	ssh_username?: string;
	ssh_password?: string;
	ssh_key?: string;
	node_port: string;
	node_ip: string[];
}

/**
 * 添加主机
 * install node
 * @param {installRequest} options
 * @param {string} options.auth_type - ssh type
 * @param {string} options.ssh_username - 当为auth_type 为sshkey时,可以不填
 * @param {string} options.ssh_password - 当为auth_type 为sshkey时,可以不填
 * @param {string} options.ssh_key - 当为auth_type 为username_password时,可以不填
 * @param {number} options.node_port - 端口
 * @param {number} options.node_ip -节点IP
 * @returns {Promise<ResType>}
 */
export function install(options: installRequest): Promise<ResType> {
	return request(`/service/node/api/cluster/default/node`, {
		method: 'post',
		body: options,
	});
}

/**
 * 删除节点
 * delete node
 * @param {string} name - node name
 * @returns {Promise<ResType>}
 */
export function deleteNode(name: string): Promise<ResType> {
	return request(`/service/node/api/cluster/default/node/${name}`, {
		method: 'delete'
	});
}

/**
 * 取消安装
 * cancel install
 * @returns {Promise<ResType>}
 */
export function cancelInstalling(): Promise<ResType> {
	return request(`/service/node/api/cluster/default/node/stop`);
}

/**
 * 取消安装等待
 * cancel pending
 * @param {string} ip - node ip
 * @returns {Promise<ResType>}
 */
export function cancelPengding(ip: string): Promise<ResType> {
	return request(`/service/node/api/cluster/default/node/pending/${ip}`, {
		method: 'delete',
	});
}

/**
 * 删除安装记录
 * delete install record by ip
 * @param {string} ip - node ip
 * @returns {Promise<ResType>}
 */
export function deleteInstallRecord(ip: string): Promise<ResType> {
	return request(`/service/node/api/cluster/default/node/history/${ip}`, {
		method: 'delete',
	});
}

/**
 * 删除所有安装记录
 * delete all install record
 * @returns {Promise<ResType>}
 */
export function deleteInstallAllRecord(): Promise<ResType> {
	return request(`/service/node/api/machine/queue/all`, {
		method: 'delete',
	});
}

/**
 * 获取节点详情
 * get node detail
 * @param {string} name - node name
 * @returns {Promise<ResType>}
 */
export function getNodeDetail(name: string): Promise<ResType> {
	return request(`/service/node/api/cluster/default/node/detail/${name}`);
}

/**
 * @typedef {Object} modifyStatusRequest
 * @property {string} name - node name
 * @property {"uncordon" | "drain"} allocatable
 */
export type modifyStatusRequest = {
	name: string;     //节点名称
	allocatable: "uncordon" | "drain";    // 是否可调度
}

/**
 * 修改主机调度状态
 * modify node status
 * @param {modifyStatusRequest} options
 * @param {string} options.name - node name
 * @param {"uncordon" | "drain"} options.allocatable
 * @returns {Promise<ResType>}
 */
export function modifyStatus(options: modifyStatusRequest): Promise<ResType> {
	const { name, allocatable } = options;
	return request(`/service/node/api/cluster/default/node/${name}?oper=${allocatable}`, {
		method: 'put',
	});
}

//主机申请管理

/**
 * @typedef {Object} applyRequest
 * @property {string} namespace - 工作空间，system代表为系统管理员
 * @property {string} reqResourcePool - 是否可调度
 * @property {string} desResourcePool - 目标资源池 
 * @property {number} nodenum - 申请节点数 
 * @property {number} cpu - 申请节点资源cpu
 * @property {number} mem - 申请节点资源内存
 * @property {string} desc - 申请描述信息
 */
export type applyRequest = {
	namespace: string;
	reqResourcePool: string;
	desResourcePool: string;
	nodenum: number;
	cpu: number;
	mem: number;
	desc?: string;
}

/**
 * 申请节点资源
 * apply node
 * @param {applyRequest} options
 * @param {string} options.namespace - 工作空间，system代表为系统管理员
 * @param {string} options.reqResourcePool - 是否可调度
 * @param {string} options.desResourcePool - 目标资源池 
 * @param {number} options.nodenum - 申请节点数 
 * @param {number} options.cpu - 申请节点资源cpu
 * @param {number} options.mem - 申请节点资源内存
 * @param {string} options.desc - 申请描述信息
 * @returns {Promise<ResType>}
 */
export function apply(options: applyRequest): Promise<ResType> {
	return request(`/service/node/api/cluster/default/apply`, {
		method: 'post',
		body: options,
	});
}

/**
 * @typedef {Object} getApplyRequest
 * @property {string} namespace - 工作空间，system代表为系统管理员
 * @property {"reject" | "agree" | "cancel" | "wait" | ""} status
 * @property {string} resource - 资源池名称
 */
export type getApplyRequest = {
	namespace?: string;
	status: "reject" | "agree" | "cancel" | "wait" | "";
	resource?: string;
}

/**
 * 获取申请列表
 * get apply list
 * @param {getApplyRequest} options
 * @param {string} options.namespace - 工作空间，system代表为系统管理员
 * @param {"reject" | "agree" | "cancel" | "wait" | ""} options.status
 * @param {string} options.resource - 资源池名称
 * @returns {Promise<ResType>}
 */
export function getApply(options: getApplyRequest): Promise<ResType> {
	const { namespace = "", status = "", resource = "" } = options;
	return request(`/service/node/api/cluster/default/apply/?namespace=${namespace}&status=${status || ""}&resource=${resource}`);
}

/**
 * 释放节点
 * delete apply node
 * @param {string} name - node name
 * @returns {Promise<ResType>}
 */
export function deleteApply(name: string): Promise<ResType> {
	return request(`/service/node/api/cluster/default/node/${name}?oper=release`, {
		method: 'put',
	});
}

/**
 * @typedef {Object} setApplyRequest
 * @property {number} id - 申请ID
 * @property {"reject" | "agree" | "cancel" | "wait" | ""} status
 * @property {string[]} allocNode - 节点列表
 */
export interface setApplyRequest {
	id: number;
	status: "reject" | "agree" | "cancel" | "wait" | "";
	allocNode?: string[];
}

/**
 * 分配节点
 * set apply node list
 * @param {setApplyRequest} options
 * @param {number} options.id - 申请ID
 * @param {"reject" | "agree" | "cancel" | "wait" | ""} options.status
 * @param {string[]} options.allocNode -节点列表
 * @returns {Promise<ResType>}
 */
export function setApply(options: setApplyRequest): Promise<ResType> {
	const { id, status, allocNode } = options;
	return request(`/service/node/api/cluster/default/apply/${id}`, {
		method: 'put',
		body: { status, allocNode },
	});
}