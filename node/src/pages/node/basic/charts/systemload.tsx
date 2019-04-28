import { connect } from 'dva';
import { createSelector } from 'reselect';
import SystemLoadChart from '@/components/node-charts/systemload';

export default connect(createSelector(
  [
    () => 'systemload',
    (props: any) => props.node.metrics,
  ],
  (type, metrics) => ({ type, metrics })
))((props: any) => {
  const { type, metrics, name, ..._props } = props;
  const { data = [] } = (metrics[name] || {})[type] || {};
  return (
    <SystemLoadChart
      {..._props}
      type={type}
      name={name}
      data={data.map(({ key, time, value }: any) => ({
        title: key === 0 ? '1分钟' : key === 1 ? '5分钟' : '10分钟',
        time: time * 1000,
        value: Number(value).toFixed(2)
      }))}
    />
  )
});