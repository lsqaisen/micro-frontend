import request from '@/utils/request';

interface Quota {
  namespace?: string;
  bandwidth: string;
  disk: string;
  podCpu: string;
  podMem: string;
  podNum: string;
  totalVolumeCap: string;
  volumeCap: string;
  volumeNum: string;
}

function getQuota(namespace: string) {
  return request(`/service/tenant/api/quota${namespace ? `?namespace=${namespace}` : '/default'}`);
}

function setQuota({ namespace, bandwidth = '1', ...data }: Quota) {
  return request(`/service/tenant/api/quota${namespace ? '' : '/default'}`, {
    method: 'post',
    body: { namespace, bandwidth, ...data },
  });
}

function getOverset(namespace?: string) {
  const url = !!namespace ?
    `/service/tenant/api/quota/overset?namespace=${namespace === 'system' ? 'default' : namespace}` :
    `/service/tenant/api/quota/overset`;
  return request(url);
}

function setOverset(over_set: string, namespace?: string) {
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
    body: { bandwidth, ...data }
  });
}

function resetDefaultQuota() {
  return request(`/service/tenant/api/quota/default`, {
    method: 'delete'
  });
}


export {
  Quota,
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
