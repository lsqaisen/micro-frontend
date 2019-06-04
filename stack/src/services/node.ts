import request from '../utils/request';

/**
 * 获取节点列表
 */
interface getNodesRequest {
	cluster?: string | undefined;      // 集群名称
	namespace?: string | undefined;    // 工作空间，system代表为系统管理员
	resource?: string | undefined; 		 // 资源池名称
	type?: string | undefined;        // type==node：获取安装好的节点信息，type!=node：获取正在安装的节点
	page?: string | undefined;     		 // 页
	itemsPerPage?: number | undefined;  // 每页条数
}

function getNodes(data: getNodesRequest) {
	const { cluster = 'default', namespace = 'system', resource = '', type = 'node', page = 1, itemsPerPage = 10 } = data;
	return request(`/service/node/api/cluster/${cluster}/node/?namespace=${namespace}&resource=${resource}&type=${type}&page=${page}&itemsPerPage=${itemsPerPage}`);
}

/**
 * 添加主机
 */
interface installRequest {
	auth_type: "username_password" | "sshkey";     //shh类型
	ssh_username?: string | undefined;    // 当为auth_type 为sshkey时,可以不填
	ssh_password?: string | undefined; 		 // 当为auth_type 为sshkey时,可以不填
	ssh_key?: string | undefined;         // 当为auth_type 为username_password时,可以不填
	node_port: string | number;    		 // 端口
	node_ip: string[];  // 节点IP
}
function install(requestData: installRequest) {
	return request(`/service/node/api/cluster/default/node`, {
		method: 'post',
		body: { ...requestData, node_port: `${requestData.node_port}` },
	});
}

/**
 * 删除节点
 */
function deleteNode(name: string) {
	return request(`/service/node/api/cluster/default/node/${name}`, {
		method: 'delete'
	});
}

/**
 * 取消安装
 */
function cancelInstalling() {
	return request(`/service/node/api/cluster/default/node/stop`);
}

/**
 * 取消安装等待
 */

function cancelPengding(ip: string) {
	return request(`/service/node/api/cluster/default/node/pending/${ip}`, {
		method: 'delete',
	});
}

/**
 * 删除安装记录
 */
function deleteInstallRecord(ip: string) {
	return request(`/service/node/api/cluster/default/node/history/${ip}`, {
		method: 'delete',
	});
}

/**
 * 删除所有安装记录
 */
function deleteInstallAllRecord() {
	return request(`/service/node/api/machine/queue/all`, {
		method: 'delete',
	});
}

/**
 * 获取节点详情
 * @param {string} name 节点名称 
 */

function getNodeDetail(name: string) {
	return request(`/service/node/api/cluster/default/node/detail/${name}`);
}

/**
 * 修改主机调度状态
 */
interface modifyStatusRequest {
	name: string;     //节点名称
	allocatable: "uncordon" | "drain";    // 是否可调度
}

function modifyStatus({ name, allocatable }: modifyStatusRequest) {
	return request(`/service/node/api/cluster/default/node/${name}?oper=${allocatable}`, {
		method: 'put',
	});
}

//主机申请管理
/**
 * 申请节点资源
 */
export interface applyRequest {
	namespace: string;     // 工作空间，system代表为系统管理员
	reqResourcePool: string;    // 是否可调度
	desResourcePool: string; //目标资源池 
	nodenum: number; //申请节点数 
	cpu: number; //申请节点资源cpu
	mem: number; //申请节点资源内存
	desc?: string; //申请描述信息
}
export function apply(applyRequest: applyRequest) {
	return request(`/service/node/api/cluster/default/apply`, {
		method: 'post',
		body: applyRequest,
	});
}

/**
 * 获取申请列表
 */
enum Status { reject = "reject", agree = "agree", cancel = "cancel", wait = "wait" }
export interface getApplyRequest {
	namespace?: string;     // 工作空间，system代表为系统管理员
	status: Status | "";    // reject || agree || cancel
	resource?: string; //资源池名称
}
export function getApply({ namespace = "", status = "", resource = "" }: getApplyRequest) {
	return request(`/service/node/api/cluster/default/apply/?namespace=${namespace}&status=${status || ""}&resource=${resource}`);
}

/**
 * 释放节点
 */
export function deleteApply(name: string) {
	return request(`/service/node/api/cluster/default/node/${name}?oper=release`, {
		method: 'put',
	});
}

/**
 * 分配节点
 */
export interface setApplyRequest {
	id: string | number;
	status: Status | "";    //  wait || reject || agree || cancel
	allocNode?: string[] | ""; //节点列表
}
export function setApply({ id, status, allocNode = "" }: setApplyRequest) {
	return request(`/service/node/api/cluster/default/apply/${id}`, {
		method: 'put',
		body: { status, allocNode },
	});
}


export {
	getNodesRequest,
	installRequest,
	modifyStatusRequest,
}

export default {
	getNodes,
	getNodeDetail,
	install,
	deleteNode,
	cancelInstalling,
	cancelPengding,
	deleteInstallRecord,
	deleteInstallAllRecord,
	modifyStatus,
}

