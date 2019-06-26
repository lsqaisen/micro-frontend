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
  let body: any = { bandwidth, ...data };
  namespace && (body.namespace = namespace);
  return request(`/service/tenant/api/quota${namespace ? '' : '/default'}`, {
    method: 'post',
    body,
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

function resetQuota() {
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
  resetQuota,
}
