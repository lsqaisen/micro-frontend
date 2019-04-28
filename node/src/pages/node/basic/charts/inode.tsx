import { connect } from 'dva';
import { createSelector } from 'reselect';
import InodeChart from '@/components/node-charts/inode';

export default connect(createSelector(
  [
    () => 'inode',
    (props: any) => props.node.metrics,
  ],
  (type, metrics) => ({ type, metrics })
))((props: any) => {
  const { type, metrics, name, ..._props } = props;
  const { data = [] } = (metrics[name] || {})[type] || {};
  return (
    <InodeChart
      {..._props}
      type={type}
      name={name}
      data={data.map(({ time, value }: any) => ({
        title: type,
        time: time * 1000,
        value: Number(value * 100).toFixed(2)
      }))}
    />
  )
});