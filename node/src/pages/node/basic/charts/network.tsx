import { connect } from 'dva';
import { createSelector } from 'reselect';
import NetworkChart from '@/components/node-charts/network';

export default connect(createSelector(
  [
    () => 'network',
    (props: any) => props.node.metrics,
  ],
  (type, metrics) => ({ type, metrics })
))((props: any) => {
  const { type, metrics, name, ..._props } = props;
  const { data = [] } = (metrics[name] || {})[type] || {};
  return (
    <NetworkChart
      {..._props}
      type={type}
      name={name}
      data={data.map(({ key, time, value }: any) => ({
        title: key === "in" ? "流入" : "流出",
        time: time * 1000,
        value,
      }))}
    />
  )
});