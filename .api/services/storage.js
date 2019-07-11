import request from '../utils/request';



/**
 * 
 * 查询存储空间列表
 * @export
 * @param {string} [current='1'] 当前页
 * @param {string} [pagesize='10'] 
 * @param {string} [namespace="default"] 当前命名空间
 * @returns 
 */
export function query( {current = '1', pagesize = '10', namespace }) {
    return request(`/service/storage/api/storage?page=${current}&itemsPerPage=${pagesize}&pluginname=storage&namespace=${namespace}`);
}

// 查询存储空间的详细信息
export const queryStorageDetail= ({ storage_name,namespace}) => {
    return request(`/service/storage/api/storage/${storage_name}?pluginname=storage&namespace=${namespace}`)
}

/**
 * 删除存储空间
 * 
 * @param {string} storageName 删除的存储名称
 * @param {string} namespace 命名空间 管理员："default",工作空间则获取当前的namespace
 * @returns 
 */
export const deleteStorage = ({ storageName, namespace }) => {
    return request(`/service/storage/api/storage/${storageName}?pluginname=storage&namespace=${namespace}`,{
        method:"delete"
    })
}

/**
 * 新建存储空间  根据类型不同传不同的参数
 * 
 * @param {string} storage_name 存储名称
 * @param {string} storage_type 存储类型
 * 类型为nfs 必传
 * @param {string} nfs_path 到处目录
 * @param {string} nfs_server 服务地址
 * 类型为rbd 必传
 * @param {string} admin_id 管理员
 * @param {string} admin_key 管理员密钥
 * @param {string} monitors 节点地址
 * 类型为rbd时的高级设置  非必传
 * @param {string} pool 镜像资源池
 * @param {string} user_id 用户
 * @param {string} user_key 用户密钥
 * @returns 
 * 
 * */
export const addStorage = ( {...data} ) => {
    
    return request(`/service/storage/api/storage?pluginname=storage`,{ 
        method: 'post',
        body: data,
    })
}

// 查询存储卷的 读取模式
export const queryAccessmode= ({ storageName = "" }) => {
    return request(`/service/storage/api/storage/${storageName}/accessmode`)
}

// 新建一项存储卷
export const createVolume= ({ ...datas }) => {
    return request(`/service/storage/api/storage/pvc?pluginname=storage`,{
        method: 'post',
        body: datas,
    })
}

// 删除存储卷
export const deletePvc = ({ pvcName,namespace}) => {
    return request(`/service/storage/api/storage/pvc/${pvcName}?pluginname=storage&namespace=${namespace}`,{
        method:"delete"
    })
}

// 查询持续卷池
export const queryTag = () => {
    return request(`/service/storage/api/storage/pvc/pool/list`)
}

// 创建持续卷池
export const createTag = ({ name, namespace }) => {
    return request(`/service/storage/api/storage/pvc/pool/${name}`,{
        method:'post',
        body:{ namespace }
    })
}

// 删除持续卷池
export const delTag = ({ name, namespace }) => {
    return request(`/service/storage/api/storage/pvc/pool/${name}`,{
        method:'delete',
        body:{ namespace }
    })
}

// 根据持续卷池获取持续卷
export const queryPvc = ({ pool="", namespace }) => {
    return request(`/service/storage/api/storage/pvc/pool/pvclist?namespace=${namespace}&pool=${pool}`)
}

// 移动PVc到tag中
 /**
 * 
 * 
 * @param {any} pvcname 
 * @param {any} pool 
 * @returns 
 */
export const moveToTag = ({ pvcname, pool }) => {
    return request(`/service/storage/api/storage/pvc/pool/lable`,{
        method:'post',
        body:{
            pvcname, pool
        }
    })
}

// PVc移出tag
 /**
 * 
 * 
 * @param {any} pvcname 
 * @param {any} pool 
 * @returns 
 */
export const moveOutTag = ({ pvcname, pool }) => {
    return request(`/service/storage/api/storage/pvc/pool/lable`,{
        method:'delete',
        body:{
            pvcname, pool
        }
    })
}
