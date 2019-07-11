import request from '../utils/request';

/*****************   Ippoollist   r*********************/
// 查询ip池列表
export async function query({ pageNo = 1, pageSize = 10 }) {
    return request(`/service/network/api/ip_pool/list?pageNo=${pageNo}&pageSize=${pageSize}`);
}

// 新增IP池
export async function addIpPool({ ...payload }) {
    return request(`/service/network/api/ip_pool/add`, {
        method: "post",
        body: { ...payload }
    });
}

// 删除ip池 
export async function delIPPoolList({ id }) {
    return request(`/service/network/api/ip_pool/del?id=${id}`, {
        method: "delete",
    })
}

/*****************   Ipsectionmanage   r*********************/

// 查询ip池分段
export async function queryIpsection({ pageNo = 1, pageSize = 10 }) {
    return request(`/service/network/api/use_ips/list?pageNo=${pageNo}&pageSize=${pageSize}`);
}

// 拆分该ip分段信息
export async function splitIPsection({ id }) {
    return request(`/service/network/api/use_ips/split?id=${id}`);
}

// 合并该ip分段信息
export async function mergeIPsection({ id }) {
    return request(`/service/network/api/use_ips/merge?id=${id}`);
}

// 释放该ip分段
export async function delIPsection({ id, current }) {
    return request(`/service/network/api/use_ips/del?id=${id}`, {
        method: "delete",
    });
}

/*****************   Policy   r*********************/

// 查询策略路由列表
export function queryPolicy() {
    return request(`/service/network/api/policyroute`);
}

// 新增策略路由
export async function addPolicy({ ...payload }) {
    return request(`/service/network/api/policyroute`, {
        method: "post",
        body: payload
    });
}

// 删除策略路由
export async function delPolicy({ Network, dest, gateway, desc }) {

    return request(`/service/network/api/policyroute`, {
        method: "delete",
        body: {
            Network, dest, gateway, desc
        }
    });
}


/*****************   Ippartmanage   r*********************/

// 查询ip段列表
export function queryIpPartM({ current = "default", pageNo = 1 }) {
    return request(`/service/network/api/use_ips/list?namespace=${current}&pageNo=${pageNo}&pageSize=100000000`);
}

// 删除ip段
export async function delIpPartM({ current = "default", id }) {
    return request(`/service/network/api/use_ips/del?id=${id}&namespace=${current}`, {
        method: "delete"
    });
}

// 新增IP段
export async function addIpPartM({ current = "default", data }) {
    return request(`/service/network/api/use_ips/add`, {
        method: "post",
        body: {
            ...data,
            namespace: current
        }
    });
}

/**
 * 查询IP段下面的子网规则
 * 
 * @export 
 * @param {any} namespace 
 * @param {any} cidr 
 * @param {number} [pageNo=1] 
 * @param {number} [pageSize=100000] 
 * @returns 
 */
export function queryRules({ namespace, cidr, type, pageNo = 1, pageSize = 100000 }) {
    return request(`/service/network/api/acl/list?namespace=${namespace}&cidr=${cidr}&type=${type}&pageNo=${pageNo}&pageSize=${pageSize}`);
}
/**
 * 删除子网规则
 * 
 * @export
 * @param {any} { id } 
 * @returns 
 */
export function deleteRules({ id }) {
    return request(`/service/network/api/acl/del?id=${id}`, {
        method: "delete",
        body: {
            id
        }
    });
}
/**
 * 修改子网规则的状态：生效
 * 
 * @export
 * @param {any} { id, namespace } 
 * @returns 
 */
export function setEnable({ id, namespace }) {
    return request(`/service/network/api/acl/enable?id=${id}&namespace=${namespace}`);
}
/**
 * 修改子网规则的状态：失效
 * 
 * @export
 * @param {any} { id, namespace } 
 * @returns 
 */
export function setDisable({ id, namespace }) {
    return request(`/service/network/api/acl/disable?id=${id}&namespace=${namespace}`);
}

export function addRule(value) {
    return request(`/service/network/api/acl/add`, {
        method: 'post',
        body: value
    });
}

export function updateRule(value) {
    return request(`/service/network/api/acl/update`, {
        method: 'post',
        body: value
    });
}





/*****************   BGP设备   r*********************/

// 查询设备列表
export async function queryDevice() {
    return request(`/service/network/api/bgpdevice/list?pageNo=1&pageSize=20`);
}

/**
 * 
 * 新增BGP设备
 * @export
 * @param {array} node_ip  
 * @param {string} [auth_type="username_password"] 
 * @param {string} ssh_username 
 * @param {string} ssh_password 
 * @param {string} node_type 
 * @param {string} name 
 * @param {string} asnumber 
 * @returns 
 */
export async function addDevice({ node_ip, auth_type = "username_password", ssh_username, ssh_key, node_type, name, asnumber, node_port }) {
    return request(`/service/network/api/bgpdevice/add`, {
        method: "post",
        body: {
            router_id: node_ip,
            node_ip,
            auth_type,
            ssh_username,
            ssh_key,
            node_type,
            name,
            asnumber,
            node_port: `${node_port}`
        }
    })
}

/**
 * 删除设备
 * 
 * @export
 * @param {string} nodename 根据节点名称删除设备
 * @returns 
 */
export async function delDevice({ node_ip, node_type, asnumber, router_id }) {
    return request(`/service/network/api/bgpdevice/del`, {
        method: "delete",
        body: {
            node_ip, node_type, asnumber, router_id
        }
    });
}
/**
 * 停止安装设备
 * 
 * @export
 * @returns 
 */
export async function stopInstall() {
    return request(`/service/network/api/bgpdevice/stop`);
}

/**
 * 
 * 
 * @export 新增peer设备
 * @param {string} ip 
 * @param {string} name 
 * @param {string} rrid 
 * @param {number} asnumber 
 * @returns 
 */
export async function addPeer({ ip, name, device_id, device_ip, asnumber, type }) {
    return request(`/service/network/api/bgppeer/add`, {
        method: "post",
        body: {
            ip, name, device_id, asnumber, type, device_ip
        }
    });
}


/**
 * @desc 删除peer设备
 * 
 * @export
 * @param {any} ip 
 * @param {any} name 
 * @param {any} type 
 * @param {any} asnumber 
 * @param {any} device_id 
 * @returns 
 */
export async function delPeer({ ip, name, type, asnumber, device_id }) {
    return request(`/service/network/api/bgppeer/del`, {
        method: "delete",
        body: {
            ip, name, type, asnumber, device_id
        }
    });
}

/**
 * 获取负载均衡虚拟ip
 */
export async function queryBalanceVip() {
    return request(`/service/network/api/balance/vip`);
}

/**
 * 添加负载均衡虚拟ip/ip段
 * @param {string} ip ip地址/地址段
 */
export async function addBalanceVip({ ip }) {
    return request(`/service/network/api/balance/vip`, {
        method: 'post',
        body: { ip },
    });
}

/**
 * 删除负载均衡虚拟ip
 * @param {string} ip ip地址
 */
export async function delBalanceVip({ ip }) {
    return request(`/service/network/api/balance/vip`, {
        method: 'delete',
        body: { ip },
    });
}
/**
 * 查询负载均衡虚拟ip
 * @param {string} ip ip地址
 */
export async function searchBalanceVip({ ip }) {
    return request(`/service/network/api/balance/vip?ip=${ip}`);
}


