import request from '../utils/request';

/**
 *  获取节点监控信息
 */

interface MetricData {
  data: any[];
  total: number | string;
  used: number | string;
}

interface getMetricsRequest {
  type: 'cpu' | 'mem' | 'systemload' | 'filesystem' | 'diskio' | 'disk' | 'inode' | 'network' | 'tcpestab' | 'networkpackets';
  name: string; //节点名称
  step?: number | string; //间隔时间(s)
  dur?: number | string;  //总时长
}

function getMetricData(_data: any, callback: (data: any) => any) {
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

async function getMetrics({ type, name, step = 5, dur = 600 }: getMetricsRequest) {
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
            if ((data || []).length > 0) used = Number(data.slice(-1)[0].value || 0).toFixed(2);
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
            if ((data || []).length > 0) used = Number(data.slice(-1)[0].value || 0).toFixed(2);
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
            if ((data || []).length > 0) used = Number(data.slice(-1)[0].value || 0).toFixed(2);
            return {
              data: { type, used, total, data },
              err,
            }
          }
        }
      }
    });
}

export {
  getMetricsRequest
}

export default {
  getMetrics
}