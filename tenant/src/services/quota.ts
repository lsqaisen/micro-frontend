import request from '@/utils/request';

interface Quota {
  bandwidth: string;
}

function getQuota(namespace: string) {
  return request(`/service/tenant/api/quota?namespace=${namespace}`);
}

function setQuota(data: Quota) {
  return request(`/service/tenant/api/quota`, {
    method: 'post',
    body: data,
  });
}

function getOverset(namespace?: string) {
  const url = !!namespace ?
    `/service/tenant/api/quota/overset?namespace=${namespace === 'system' ? 'default' : namespace}` :
    `/service/tenant/api/quota/overset`;
  return request(url);
}

interface setOVerSoldRequest {
  namespace?: string;
  over_set: number | string;
}

function setOverset({ namespace, over_set }: setOVerSoldRequest) {
  return request(`/service/tenant/api/quota/overset?over_set=${over_set}${namespace ? `&namespace=${namespace}` : ''}`, {
    method: 'post',
  });
}

function getDefaultQuota() {
  return request(`/service/tenant/api/quota/default`);
}


function setDefaultQuota({ bandwidth = '1', ...data }: Quota) {
  return request(`/service/tenant/api/quota/default`, {
    method: 'post',
    body: { ...data, bandwidth }
  });
}

function resetDefaultQuota() {
  return request(`/service/tenant/api/quota/default`, {
    method: 'delete'
  });
}


export {
  Quota,
  setOVerSoldRequest
}

export default {
  getQuota,
  setQuota,
  getOverset,
  setOverset,
  getDefaultQuota,
  setDefaultQuota,
  resetDefaultQuota,
}
