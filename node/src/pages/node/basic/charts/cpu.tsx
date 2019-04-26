import { connect } from 'dva';
import { createSelector } from 'reselect';
import CpuChart from '@/components/node-charts/cpu';

export default connect(createSelector(
  [
    () => 'cpu',
    (props: any) => props.node.metrics,
  ],
  (type, metrics) => ({ type, metrics })
))((props: any) => {
  const { type, metrics, name, ..._props } = props;
  const { total = 0, data = [] } = (metrics[name] || {})[type] || {};
  let used = 0;
  if (data.length > 0) used = data.slice(-1)[0].value || 0;
  return (
    <CpuChart
      {..._props}
      type={type}
      name={name}
      total={total}
      used={Number(used * 100).toFixed(2)}
      data={data.map(({ time, value }: any) => ({
        title: type,
        time: time * 1000,
        value: (value * 100).toFixed(2)
      }))}
    />
  )
});