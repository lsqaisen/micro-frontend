import request from '../utils/request';

//nodes
export function nodes(requestData) {
    const { namespace = 'system', resource = '', page = 1, itemsPerPage = 10000 } = requestData;
    return request(`/service/node/api/cluster/default/node/?namespace=${namespace || 'system'}&resource=${resource}&type=node&page=${page}&itemsPerPage=${itemsPerPage}`);
}

//host monitor
export function host(requestData) {
    const { type, name, step = 60, dur = 600 } = requestData;
    return request(`/service/monitor/api/nodemetric/${type}?node=${name}&step=${step}&dur=${dur}`);
}

//stacks
export function stacks(requestData) {
    const { namespace, page = 1, itemsPerPage = 1000000 } = requestData;
    return request(`/service/stack/api/stack?namespace=${namespace}&page=${page}&itemsPerPage=${itemsPerPage}`);
}

//service monitor
export function service(requestData) {
    const { type, stack = "", service = "", pod = "", step = 60, dur = 600 } = requestData;
    return request(`/service/monitor/api/podmetric/${type}?application=${stack}&service=${service}&pod=${pod}&step=${step}&dur=${dur}`);
}

//balances
export function balances(requestData) {
    const { namespace, page = 1, itemsPerPage = 1000000 } = requestData;
    return request(`/service/stack/api/balance?namespace=${namespace}&page=${page}&itemsPerPage=${itemsPerPage}`);
}
//balance monitor
export function balance(requestData) {
    const { style = "max", type, name = '', dur = 600, step = 60 } = requestData;
    return request(`/service/monitor/api/nginx/${type}?service=${name}&rule=&dur=${dur}&step=${step}&type=${style}`);
}

//alarm config
export function rules() {
    return request(`/service/monitor/api/alert/rules`);
}

export function metrics() {
    return request(`/service/monitor/api/metric`);
}


//group
export function groups() {
    return request(`/service/monitor/api/alert/groups`);
}

export function addGroup(data) {
    return request(`/service/monitor/api/alert/group`, {
        method: 'post',
        body: data
    });
}

export async function deleteGroup(id) {
    return request(`/service/monitor/api/alert/group/${id}`, {
        method: 'delete'
    });
}

export function services(data) {
    const { module, admin, namespace } = data;
    return request(module === 'node' ? admin ? `/service/node/api/cluster/default/node/?namespace=${`system`}&resource=&type=node&page=1&itemsPerPage=100000` : `/service/node/api/cluster/default/node/?namespace=${namespace}&resource=&type=node&page=1&itemsPerPage=100000` : `/service/monitor/api/service?type=${module}`);
}

export function createRule(data) {
    return request(`/service/monitor/api/alert/rule`, {
        method: "post",
        body: data
    });
}
export function deleteRule(id) {
    return request(`/service/monitor/api/alert/rule/${id}`, {
        method: 'delete'
    });
}

//events
export function events(data) {
    const { page = 1, size = 10, type = "reason|name", val = "" } = data;
    return request(`/service/monitor/api/list?page=${page}&size=${size}&type=${type}&val=${val}`);
}

//smtp set
export function config() {
    return request(`/service/monitor/api/alert/config`);
}
export function setConfig(data) {
    return request(`/service/monitor/api/alert/config`, {
        method: 'post',
        body: data
    });
}