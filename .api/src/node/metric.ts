import request from '../request';

interface Window { [key: string]: any; }
declare var window: Window;

window.Number.prototype.flowCeil = function (fractionDigits: number = 0) {
  if (Number(this.toFixed(fractionDigits)) === 0) return `0`;
  if (this / 1024 / 1024 / 1024 / 1024 >= 1) {
    return `${Number(this / 1024 / 1024 / 1024 / 1024).toFixed(fractionDigits)}T`;
  } else if (this / 1024 / 1024 / 1024 >= 1) {
    return `${Number(this / 1024 / 1024 / 1024).toFixed(fractionDigits)}G`;
  } else if (this / 1024 / 1024 >= 1) {
    return `${Number(this / 1024 / 1024).toFixed(fractionDigits)}M`;
  } else if (this / 1024 >= 1) {
    return `${Number(this / 1024).toFixed(fractionDigits)}K`;
  }
  return `${Number(this).toFixed(fractionDigits)}B`
}

window.Number.prototype.netCeil = function (fractionDigits: number = 0) {
  if (Number(this.toFixed(fractionDigits)) === 0) return `0`;
  if (this / 1024 / 1024 / 1024 >= 1) {
    return `${Number(this / 1024 / 1024 / 1024).toFixed(fractionDigits)}GB`;
  } else if (this / 1024 / 1024 >= 1) {
    return `${Number(this / 1024 / 1024).toFixed(fractionDigits)}MB`;
  } else if (this / 1024 >= 1) {
    return `${Number(this / 1024).toFixed(fractionDigits)}KB`;
  }
  return `${Number(this).toFixed(fractionDigits)}B`
}

/**
 * @typedef {object} MetricData
 * @property {any[]} data - metric data
 * @property {number} total 
 * @property {number} used
 */
export type MetricData = {
  data: any[];
  total: number;
  used: number;
}

/**
 * @typedef {object} getMetricsRequest
 * @property {'cpu' | 'mem' | 'systemload' | 'filesystem' | 'diskio' | 'disk' | 'inode' | 'network' | 'tcpestab' | 'networkpackets'} type
 * @property {string} name
 * @property {number} step
 * @property {number} dur
 */
export type getMetricsRequest = {
  type: 'cpu' | 'mem' | 'systemload' | 'filesystem' | 'diskio' | 'disk' | 'inode' | 'network' | 'tcpestab' | 'networkpackets';
  name: string; //节点名称
  step?: number; //间隔时间(s)
  dur?: number;  //总时长
}

/**
 * 获取节点监控信息
 * @param {any} _data
 * @param {(data: any) => any} callback
 */
export function getMetricData(_data: any, callback: (data: any) => any) {
  let metricData: any[] = [];
  const { data, total, used, ...extrData } = _data;
  if (Array.isArray(data)) {
    data.map(({ values = [] }: any, key: any) => {
      metricData = metricData.concat(values.map(([time, value]: any) => callback({ key, time, value })));
    })
  } else {
    Object.entries(extrData || {}).forEach(([key, value]: any) => {
      if (Array.isArray(value)) {
        value.map(({ values = [] }: any) => {
          metricData = metricData.concat(values.map(([time, value]: any) => callback({ key, time, value })));
        })
      }
    })
  }
  return {
    data: metricData,
    used,
    total,
  }
}

/**
 * 获取节点监控信息
 * get node metrics
 * @param {getMetricsRequest} options
 * @property {'cpu' | 'mem' | 'systemload' | 'filesystem' | 'diskio' | 'disk' | 'inode' | 'network' | 'tcpestab' | 'networkpackets'} options.type
 * @property {string} options.name
 * @property {number} options.step
 * @property {number} options.dur
 * @returns {Promise<ResType>}
 */
export async function getMetrics(options: getMetricsRequest): Promise<any> {
  const { type, name, step = 5, dur = 600 } = options;
  return request(`/service/monitor/api/nodemetric/${type}?node=${name}&step=${step}&dur=${dur}`)
    .then(({ data: _data, err }: any) => {
      if (!err) {
        switch (type) {
          case 'cpu':
          case 'mem':
          case 'inode': {
            let { data = [], used = 0, total = 0 }: MetricData = getMetricData(
              _data,
              ({ time, value }) => ({
                title: type === 'mem' ? '内存' : type,
                time: time * 1000,
                value: (value * 100).toFixed(2)
              }),
            );
            if ((data || []).length > 0) used = Number(Number(data.slice(-1)[0].value || 0).toFixed(2));
            return {
              data: { type, used, total, data },
              err,
            }
          }
          case 'systemload': {
            let { data = [], used = 0, total = 0 }: MetricData = getMetricData(
              _data,
              ({ key, time, value }) => ({
                title: key === 0 ? '1分钟' : key === 1 ? '5分钟' : '10分钟',
                time: time * 1000,
                value: Number(value).toFixed(2)
              }),
            );
            return {
              data: { type, used, total, data },
              err,
            }
          }
          case 'filesystem': {
            let { data = [], used = 0, total = 0 }: MetricData = getMetricData(
              _data,
              () => null,
            );
            return {
              data: {
                type, data,
                pused: window.Number(Number(used) / Number(total || -1) * 100).toFixed(1),
                used: window.Number((used || 0)).flowCeil(1),
                total: window.Number((total || 0)).flowCeil(1)
              },
              err,
            }
          }
          case 'diskio':
          case 'disk': {
            let { data = [], used = 0, total = 0 }: MetricData = getMetricData(
              _data,
              ({ key, time, value }) => ({
                key: type,
                title: key === "r" ? "读取(iops)" : key === "w" ? "写入(iops)" : key === "read" ? "读取速度" : "写入速度",
                time: time * 1000,
                value: Number(value).toFixed(2),
                [type]: Number(value).toFixed(2),
              }),
            );
            return {
              data: { type, used, total, data },
              err,
            }
          }
          case 'tcpestab': {
            let { data = [], used = 0, total = 0 }: MetricData = getMetricData(
              _data,
              ({ time, value }) => ({
                title: 'TCP连接数',
                time: time * 1000,
                value: Number(value).toFixed(2)
              }),
            );
            if ((data || []).length > 0) used = Number(Number(data.slice(-1)[0].value || 0).toFixed(2));
            return {
              data: { type, used, total, data },
              err,
            }
          }
          case 'network':
          case 'networkpackets': {
            let { data = [], used = 0, total = 0 }: MetricData = getMetricData(
              _data,
              ({ key, time, value }) => ({
                title: key === 'in' ? "流入" : "流出",
                time: time * 1000,
                value: Number(value).toFixed(2),
              }),
            );
            if ((data || []).length > 0) used = Number(Number(data.slice(-1)[0].value || 0).toFixed(2));
            return {
              data: { type, used, total, data },
              err,
            }
          }
        }
      }
    });
}