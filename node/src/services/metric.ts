import request from '../utils/request';

/**
 *  获取节点监控信息
 */

interface getMetricsRequest {
  type: string;
  name: string;
  step?: number | string;
  dur?: number | string;
}

function getMetrics({ type, name, step = 60, dur = 600 }: getMetricsRequest) {
  return request(`/service/monitor/api/nodemetric/${type}?node=${name}&step=${step}&dur=${dur}`);
}

export {
  getMetricsRequest
}

export default {
  getMetrics
}