import { connect } from 'dva';
import { createSelector } from 'reselect';
import IoChart from '@/components/node-charts/io';

export default connect(createSelector(
  [
    () => ['diskio', 'disk'],
    (props: any) => props.node.metrics,
  ],
  (type, metrics) => ({ type, metrics })
))((props: any) => {
  const { type, metrics, name, ..._props } = props;
  const diskio = (metrics[name] || {})['diskio'] || {};
  const disk = (metrics[name] || {})['disk'] || {};
  return (
    <IoChart
      {..._props}
      type={type}
      name={name}
      data={[].concat((diskio.data || []).map(({ key, time, value }: any) => ({
        key: 'diskio',
        title: key === "r" ? "读取(iops)" : "写入(iops)",
        time: time * 1000,
        value: Number(value).toFixed(2),
        diskio: Number(value).toFixed(2),
      }))).concat((disk.data || []).map(({ key, time, value }: any) => ({
        key: 'disk',
        title: key === "read" ? "读取速度" : "写入速度",
        time: time * 1000,
        value: (value * 100).toFixed(2),
        disk: (value * 100).toFixed(2)
      })))}
    />
  )
});