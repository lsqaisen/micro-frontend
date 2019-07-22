
import request from '../utils/request';

export function tenants(data) {
    const { page = 1, page_size = 10, project_name = "", is_public = 0 } = data;
    return request(`/service/auth/api/projects?page=${page}&page_size=${page_size}&project_name=${project_name}&is_public=${is_public}&tag=namespace&owner=1&type=4`);
}

export function createTenant(data) {
    return request(`/service/tenant/api/tenant`, {
        method: 'post',
        body: { ...data, is_default: true, type: 4 }
    });
}

export function deleteTenant(project_id) {
    return request(`/service/tenant/api/tenant/${project_id}`, {
        method: 'delete'
    });
}

export function editTenant(data) {
    const { project_id, ...body } = data;
    return request(`/service/auth/api/projects/${project_id}`, {
        method: 'put',
        body: body,
    });
}

export function quota(namespace) {
    return request(`/service/tenant/api/quota?namespace=${namespace}`);
}

export function setQuota(data) {
    return request(`/service/tenant/api/quota`, {
        method: 'post',
        body: data,
    });
}

export function overset(namespace) {
    return request(namespace ? `/service/tenant/api/quota/overset?namespace=${namespace}` : `/service/tenant/api/quota/overset`);
}

export function setOverset(data) {
    const { namespace, over_set } = data;
    return request(`/service/tenant/api/quota/overset?over_set=${over_set}&namespace=${namespace}`, {
        method: 'post',
    });
}

export function defaultQuota(data) {
    return request(`/service/tenant/api/quota/default`);
}

export function setDefault(data) {
    return request(`/service/tenant/api/quota/default`, {
        method: 'post',
        body: { ...data, bandwidth: '1' }
    });
}

export function resetDefault() {
    return request(`/service/tenant/api/quota/default`, {
        method: 'delete'
    });
}

export function status() {
    return request(`/service/tenant/api/billing/status`);
}

export function changeStatus(running) {
    return request(`/service/tenant/api/billing/status`, {
        method: 'put',
        body: { running }
    });
}

export function account() {
    return request(`/service/tenant/api/account`);
}

export function configlist() {
    return request(`/service/tenant/api/rechargeconfig/configlist`);
}

export function rechargeconfig() {
    return request(`/service/tenant/api/rechargeconfig`);
}

export function addRechargeConfig(data) {
    return request(`/service/tenant/api/rechargeconfig`, {
        method: 'post',
        body: data
    });
}

export function deleteRechargeConfig(id) {
    return request(`/service/tenant/api/rechargeconfig/${id}`, {
        method: 'delete',
    });
}

export function modifyRechargeConfig(data) {
    return request(`/service/tenant/api/rechargeconfig`, {
        method: 'put',
        body: data
    });
}

export function recharge(data) {
    return request(`/service/tenant/api/recharge`, {
        method: 'post',
        body: data
    });
}

export function order(data) {
    const { type = "consume", time_from = "", time_to = "", page = 1, page_size = 10, tenant_name = "" } = data;
    return request(`/service/tenant/api/${type}?time_from=${time_from}&time_to=${time_to}&page=${page}&page_size=${page_size}&tenant_name=${tenant_name}`);
}

export async function orderDetails(data) {
    const { type = "consume", id } = data;
    return request(`/service/tenant/api/${type}/detail?${type}_id=${id}`);
}

export function downloadOrder(data) {
    const { type = "consume", page, page_size } = data;
    window.location = `${window.location.origin}/service/tenant/api/${type}/download?page=${page}&page_size=${page_size}`;
}

export function charge(data) {
    const { page = 1, page_size = 10, time_from = "", time_to = "", tenant_name = "" } = data;
    return request(`/service/tenant/api/recharge?time_from=${time_from}&time_to=${time_to}&page=${page}&page_size=${page_size}&tenant_name=${tenant_name}`);
}
