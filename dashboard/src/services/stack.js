import request from '../utils/request';

//stack
export function list(requestData) {
    const { namespace, page = 1, itemsPerPage = 10 } = requestData;
    return request(`/service/stack/api/stack?namespace=${namespace}&page=${page}&itemsPerPage=${itemsPerPage}`);
}

export function detail({ namespace, name }) {
    return request(`/service/stack/api/stack/detail?namespace=${namespace}&name=${name}`);
}

export function metric({ current, name = "" }) {
    return request(`/api/service/stack/api/namespace/metric?namespace=${current}&name=${name}`)
}

/**
 * 获取POD监控信息
 * @param {string} namespace 工作空间
 * @param {string} name 工作空间，传空获取所有
 */
export function podMetric({ namespace, name = "" }) {
    return request(`/service/stack/api/pod/metric?namespace=${namespace}&name=${name}`)
}

export function addstack({ name, namespace, ippool, desc }) {
    return request(`/service/stack/api/stack`, {
        method: 'post',
        body: { name, namespace, ippool: ippool === 'none' ? "" : ippool, desc },
    })
}

export function deletestack({ name, namespace }) {
    return request(`/service/stack/api/stack/delete`, {
        method: 'post',
        body: { name, namespace },
    })
}

//service
/**
 * 创建服务
 */
export function createService(data) {
    return request(`/service/stack/api/app`, {
        method: 'post',
        body: data,
    });
}
/**
 * 添加外部服务
 */
export function createExService(data) {
    return request(`/service/stack/api/appext`, {
        method: 'post',
        body: data,
    });
}
/**
 * 删除服务
 * @param {string} type app | appext 
 * @param {string} namespace 工作空间 
 * @param {string} name 服务名称
 * @param {string} stack 应用名称
 */
export function delService({ type = 'app', namespace, name, stack }) {
    return request(`/service/stack/api/${type === 'app' ? 'app/del' : 'appext/delete'}`, {
        method: 'post',
        body: { namespace, name, stack },
    });
}
/**
 * 更新服务
 */
export function updateService(data) {
    return request(`/service/stack/api/app/rollupdate`, {
        method: 'post',
        body: data,
    });
}
/**
 * 获取服务详情
 * @param {string} namespace 工作空间 
 * @param {string} name 服务名称 
 * @param {string} type 类型 
 */
export function serviceDetail({ namespace, name, type = '' }) {
    return request(`/service/stack/api/app${type}/detail?namespace=${namespace}&name=${name}`);
}

/**
 * 获取服务历史版本
 * @param {string} namespace 工作空间 
 * @param {string} name 服务名称 
 */
export function history({ namespace, name }) {
    return request(`/service/stack/api/app/history?namespace=${namespace}&name=${name}`);
}

/**
 * 修改服务副本数
 * @param {string} namespace 工作空间 
 * @param {string} name 服务名称 
 * @param {string} stack 应用栈名称 
 * @param {number} replicas 副本数 
 */
export function scale({ namespace, name, stack, replicas }) {
    return request(`/service/stack/api/app/scale`, {
        method: 'post',
        body: { namespace, name, stack, replicas },
    });
}

/**
 * 更新端口信息
 * @param {string} namespace 工作空间 
 * @param {string} name 服务名称 
 * @param {string} stack 应用栈名称 
 * @param {array} ports 端口,{containerPort,servicePort,protocol} 
 */
export function updatePorts({ namespace, name, stack, ports }) {
    return request(`/service/stack/api/app/service`, {
        method: 'post',
        body: { namespace, name, stack, ports },
    });
}

/**
 * 修改动态伸缩，最小副本数／最大副本数／cpu阈值都为0时关闭动态伸缩
 * @param {string} namespace 工作空间 
 * @param {string} name 服务名称 
 * @param {string} stack 应用栈名称 
 * @param {number} minReplicas 最小副本数 
 * @param {number} maxReplicas 最大副本数 
 * @param {number} targetCPUPercentage cpu阈值 
 * @param {number} targetMemoryPercentage 内存阈值 
 */
export function modifyAutoScale({ namespace, name, stack, minReplicas, maxReplicas, targetCPUPercentage, targetMemoryPercentage }) {
    return request(`/service/stack/api/app/autoscale`, {
        method: 'post',
        body: { namespace, name, stack, minReplicas, maxReplicas, targetCPUPercentage, targetMemoryPercentage },
    });
}

/**
 * 获取服务副本中容器的日志
 * @param {string} namespace 工作空间 
 * @param {string} name 服务名称 
 * @param {string} container 容器名称 
 * @param {number} offsetFrom 最小副本数 
 * @param {number} offsetTo 最大副本数 
 */
export function getServiceLogs({ namespace, name, container = "", offsetFrom = "", offsetTo = "" }) {
    return request(`/service/stack/api/pod/logs?namespace=${namespace}&name=${name}&offsetFrom=${offsetFrom}&offsetTo=${offsetTo}&container=${container}`);
}

/**
 * 获取服务yaml配置
 * @param {string} namespace 工作空间 
 * @param {string} name 服务名称
 */
export function getYaml({ namespace, name }) {
    return request(`/service/stack/api/app/export?namespace=${namespace}&name=${name}`, {
    }, false, true);
}

/**
 * 删除副本
 * @param {string} namespace 工作空间 
 * @param {string} name 副本名称
 */
export function delPod({ namespace, name }) {
    return request(`/service/stack/api/pod/delete?name=${name}&namespace=${namespace}`);
}

//负载均衡

/**
 * 获取负载均衡列表
 * @param {string} namespace 命名空间
 * @param {number} page 第几页
 * @param {number} itemsPerPage 每页条数
 */
export function balances({ namespace, page = 1, itemsPerPage = 10 }) {
    return request(`/service/stack/api/balance?namespace=${namespace}&page=${page}&itemsPerPage=${itemsPerPage}`);
}

/**
 * 创建负载均衡
 * @param {string} namespace    工作空间
 * @param {string} nodeName     节点名称
 * @param {string} hostip       节点IP标识
 * @param {number} memory       内存配额
 * @param {bool} collectlog     是否开启日志收集
 * @param {string} desc         描述
 */
export function createBalance({ namespace, name, nodeName, hostip, collectlog, desc = "" }) {
    return request(`/service/stack/api/balance`, {
        method: 'post',
        body: { namespace, name, nodeName, hostip, collectlog, desc },
    });
}

/**
 * 删除负载均衡
 * @param {string} namespace 命名空间
 * @param {string} name 负载均衡名称
 */
export function deleteBalance({ namespace, name }) {
    return request(`/service/stack/api/balance/del`, {
        method: 'post',
        body: { name, namespace },
    });
}

/**
 * 获取负载均衡信息
 * @param {string} namespace    工作空间
 * @param {string} name         负载均衡名称
 */
export function getBalance({ namespace, name }) {
    return request(`/service/stack/api/balance/detail?namespace=${namespace}&name=${name}`);
}

/**
 * 添加负载均衡规则
 */
export function createRules(data) {
    return request(`service/stack/api/balance/add/${!data.rules ? 'httprule' : 'rule'}`, {
        method: 'post',
        body: data,
    });
}

/**
 * 删除负载均衡规则 *
 * @param {string} type         类型
 * @param {string} namespace    工作空间
 * @param {string} name         负载均衡名称
 * @param {string} id           规则ID
 */
export function delRule({ type = 'rule', name, namespace, id }) {
    return request(`service/stack/api/balance/del/${type}/`, {
        method: 'post',
        body: {
            ids: [id], namespace, name,
        },
    });
}

/**
 * 获取服务或负载均衡或副本事件
 * @param {string} type app ： ‘balance’ ： ‘pod’
 * @param {string} namespace 工作空间 
 * @param {string} name 服务名称 
 */
export function getEvents({ type, namespace, name }) {
    return request(`/service/stack/api/${type}/event?namespace=${namespace}&name=${name}`);
}

/**
 * 获取configmap列表
 * @param {string} namespace 工作空间，system代表为系统管理员 
 * @param {number} page 页
 * @param {number} itemsPerPage 每页条数
 */
export function configMap(data) {
    const { namespace, page = 1, itemsPerPage = 10 } = data;
    return request(`/service/stack/api/appconfigs?namespace=${namespace}&page=${page}&itemsPerPage=${itemsPerPage}`);
}

export function addConfigMap(data) {
    const { namespace, name, desc, fileData } = data;
    return request(`/service/stack/api/appconfigs`, {
        method: 'post',
        body: { namespace, name, desc, fileData },
    });
}

export function editConfigMap(data) {
    const { namespace, name, desc, fileData } = data;
    return request(`/service/stack/api/appconfigs`, {
        method: 'put',
        body: { namespace, name, desc, fileData },
    });
}

/**
 * 删除configmap
 * @param {string} namespace 工作空间，system代表为系统管理员 
 * @param {number} name 名称
 */
export function delConfigMap(data) {
    const { namespace, name } = data;
    return request(`/service/stack/api/appconfigs?namespace=${namespace}&name=${name}`, {
        method: 'delete',
    });
}




/***********************secretList***********************/
/**
 * 获取secret列表
 * @param {string} namespace 工作空间，system代表为系统管理员 
 * @param {number} page 页
 * @param {number} itemsPerPage 每页条数
 */
export function secretList({ namespace, page = 1, itemsPerPage = 10 }) {
    return request(`/service/stack/api/secret?namespace=${namespace}&page=${page}&itemsPerPage=${itemsPerPage}`);
}

export function createSecret({ type, namespace, body }) {
    if (type === 'ssl') {
        return request(`/service/stack/api/secret?namespace=${namespace}`, {
            method: 'post',
            body: body,
        }, true);
    } else {
        return request(`/service/stack/api/secret/auth`, {
            method: 'post',
            body: { namespace, ...body },
        });
    }
}

/**
 * 添加secret: 用户密码
 * @param {string} namespace 工作空间，system代表为系统管理员
 * @param {string} name 名称
 * @param {string} desc 描述
 * @param {string} username 用户名
 * @param {string} password 密码
 */
export function createSecretByUserPwd({ namespace, name, desc, username, password }) {
    return request(`/service/stack/api/secret/auth`, {
        method: 'post',
        body: { namespace, name, desc, username, password },
    });
}

/**
 * 添加secret: 文件
 * @param {string} namespace 工作空间，system代表为系统管理员
 * @param {object} formData {sslname, desc,sslkey,sslcrt  } 名称,描述,SSL(.key)文件,SSL(.crt)文件
 */
export function createSecretByFile({ namespace, formData }) {
    return request(`/service/stack/api/secret?namespace=${namespace}`, {
        method: 'post',
        body: formData,
    }, true);
}
/**
 * 删除secret
 * @param {string} namespace 工作空间，system代表为系统管理员 
 * @param {number} name 名称
 */
export function deleteSecret({ namespace, name }) {
    return request(`/service/stack/api/secret/del`, {
        method: 'post',
        body: { namespace, name }
    });
}

/**
 * 导入服务
 * @param {string} namespace    工作空间
 * @param {string} stack        应用名称
 * @param {string} content      yaml文件
 */
export function importService({ namespace, stack, content }) {
    return request(`/service/stack/api/import`, {
        method: 'post',
        body: { namespace, stack, content }
    });
}
/**
 * 导出服务
 * @param {string} namespace    工作空间
 * @param {array}  apps         服务集合
 */
export function exportService({ namespace, apps }) {
    window.location.href = `/service/stack/api/export?namespace=${namespace}&apps=${apps.join(",")}`;
}

/**
 * 导出服务
 * @param {string} termid    term id
 * @param {number}  width    宽
 * @param {number}  heigth    高
 */
export function resizeTerm({ termid, width, height }) {
    return request(`/service/stack/api/pod/term/resize?termid=${termid}&width=${width}&height=${height}`);
}


//容器主机
/**
 * 获取容器主机列表
 * @param {string} cluster      集群名称
 * @param {string} zoneid       分区ID
 * @param {string} operation    操作方式
 */
export function getCntrHost({ namespace, page = 1, itemsPerPage = 10 }) {
    return request(`/service/stack/api/pod?namespace=${namespace}&page=${page}&itemsPerPage=${itemsPerPage}`);
}

/**
 * 创建容器主机
 */
export function createCntrHost(data) {
    return request(`/service/stack/api/pod`, {
        method: 'post',
        body: data,
    });
}

/**
 * 获取镜像列表
 * @param {string} namespace 工作空间，system代表为系统管理员 
 * @param {number} page 页
 * @param {number} itemsPerPage 每页条数
 */
export function getImageList({ current = 1, pageSize = 10, detail = 1, q = '', project_id }) {
    return request(`/service/registry/api/repositories?page=${current}&page_size=${pageSize}&detail=${detail}&q=${q}&project_id=${project_id}`);
}

/**
 * 获取镜像列表
 * @param {string} name 镜像名称 
 */
export function getImageTags(name) {
    return request(`/service/registry/api/repositories/${name}/tags`);
}
