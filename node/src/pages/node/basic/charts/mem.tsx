import { connect } from 'dva';
import { createSelector } from 'reselect';
import MemChart from '@/components/node-charts/mem';

export default connect(createSelector(
  [
    () => 'mem',
    (props: any) => props.node.metrics,
  ],
  (type, metrics) => ({ type, metrics })
))((props: any) => {
  const { type, metrics, name, ..._props } = props;
  const { total = 0, data = [] } = (metrics[name] || {})[type] || {};
  let used = 0;
  if (data.length > 0) used = data.slice(-1)[0].value || 0;
  const [_total, _tsuffix] = window.Number(total).flowCeil(0).split(/(?<=[0-9])(?=[a-zA-Z])/);
  const [_used, _usuffix] = window.Number(used * total).flowCeil(4).split(/(?<=[0-9])(?=[a-zA-Z])/);
  return (
    <MemChart
      {..._props}
      type={type}
      name={name}
      total={_total}
      totalSuffix={_tsuffix}
      used={_used}
      usedSuffix={_usuffix}
      data={data.map(({ time, value }: any) => ({
        title: '内存',
        time: time * 1000,
        value: (value * 100).toFixed(2)
      }))}
    />
  )
});