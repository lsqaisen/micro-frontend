import request from '../utils/request';

//resource
export function totalResource({ type, namespace, end_at = "", dur = 300, step = 60, resource = '' }) {
    return request(`/service/monitor/api/dashboard/${type === 1 ? 'cluster' : 'tenant'}/summary?namespace=${namespace}&dur=${dur}&step=${step}&end_at=${end_at}&resource=${resource}`);
}

export function resource({ type, namespace, end_at = "", dur = 300, step = 60, resource = '' }) {
    return request(`/service/monitor/api/dashboard/${type === 1 ? 'cluster' : 'tenant'}/realtimeload?namespace=${namespace}&dur=${dur}&step=${step}&end_at=${end_at}&resource=${resource}`);
}

//alarm
export function alarm({ page = 1, size = 10, type = "reason|name", val = "" }) {
    return request(`/service/monitor/api/list?page=${page}&size=${size}&type=${type}&val=${val}`);
}

//network
export function flow({ type, namespace, end_at = "", dur = 24 * 60 * 60, step = 60 * 60 }) {
    return request(`/service/monitor/api/dashboard/${type === 1 ? 'cluster' : 'tenant'}/networkspeed?namespace=${namespace}&dur=${dur}&step=${step}&end_at=${end_at}`);
}

export function requests({ type, namespace, end_at = "", dur = 24 * 60 * 60, step = 60 * 60 }) {
    return request(`/service/monitor/api/dashboard/${type === 1 ? 'cluster' : 'tenant'}/requestsrate?namespace=${namespace}&dur=${dur}&step=${step}&end_at=${end_at}`);
}

//top10
export function top10({ type, namespace, end_at = "", dur = 300, step = 60 }) {
    return request(`/service/monitor/api/dashboard/${type === 1 ? 'cluster' : 'tenant'}/tenantrecouceusage?namespace=${namespace}&dur=${dur}&step=${step}&end_at=${end_at}`);
}

//service number
export function services({ type, namespace, end_at = "", dur = 604800, step = 86400 }) {
    return request(`/service/monitor/api/dashboard/${type === 1 ? 'cluster' : 'tenant'}/servciecount?namespace=${namespace}&dur=${dur}&step=${step}&end_at=${end_at}`);
}

//registry
export function registry({ dur = 300, step = 60 }) {
    return request(`/service/monitor/api/dashboard/cluster/storage?dur=${dur}&step=${step}`);
}

//vip
export function vip() {
    return request(`/service/monitor/api/vipnode`);
}
//nodes
export function nodes(requestData) {
    const { namespace, resource = '' } = requestData;
    return request(`/service/node/api/cluster/default/node/?namespace=${namespace || 'system'}&resource=${resource}&type=node&page=1&itemsPerPage=10000`);
}
//servicestatistics
export function servicestatistics() {
    return request(`/service/monitor/api/servicestatistics`);
}
//realtimeload
export function realtimeload(requestData) {
    const { type, namespace, end_at = "", dur = 300, step = 60, resource = '' } = requestData;
    return request(`/service/monitor/api/dashboard/${type === 1 ? 'cluster' : 'tenant'}/realtimeload?namespace=${namespace}&dur=${dur}&step=${step}&end_at=${end_at}&resource=${resource}`);
}
//summary
export function summary(requestData) {
    const { type, namespace, resource = '' } = requestData;
    return request(`/service/monitor/api/dashboard/${type === 1 ? 'cluster' : 'tenant'}/summary?namespace=${namespace}&resource=${resource}`);
}