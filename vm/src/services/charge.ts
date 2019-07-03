import request from '@/utils/request';

interface getChargesRequest {
  page?: number;
  page_size?: number;
  time_from?: string;
  time_to?: string;
  tenant_name?: string;
}

function getCharges({ page = 1, page_size = 10, time_from = "", time_to = "", tenant_name = "" }: getChargesRequest) {
  return request(`/service/tenant/api/recharge?time_from=${time_from}&time_to=${time_to}&page=${page}&page_size=${page_size}&tenant_name=${tenant_name}`);
}


export function getChargeStatus() {
  return request(`/service/tenant/api/billing/status`);
}

export {
  getChargesRequest,
}

export default {
  getCharges,
  getChargeStatus,
}
