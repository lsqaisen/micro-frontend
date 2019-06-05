import request from '../utils/request';


// 查询持续卷池
function getPoolList() {
    return request(`/service/storage/api/storage/pvc/pool/list`)
}


// 根据持续卷池获取持续卷
interface getPvcListRequest {
    namespace: string;
    pool: string;
}
function getPvcList({ pool = "", namespace = "default" }: getPvcListRequest) {
    return request(`/service/storage/api/storage/pvc/pool/pvclist?namespace=${namespace}&pool=${pool}`)
}

export {
    getPvcListRequest
}

export default {
    getPoolList,
    getPvcList,
}
