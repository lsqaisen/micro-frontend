import { connect } from 'dva';
import { createSelector } from 'reselect';
import TcpestabChart from '@/components/node-charts/tcpestab';

export default connect(createSelector(
  [
    () => 'tcpestab',
    (props: any) => props.node.metrics,
  ],
  (type, metrics) => ({ type, metrics })
))((props: any) => {
  const { type, metrics, name, ..._props } = props;
  const { data = [] } = (metrics[name] || {})[type] || {};
  return (
    <TcpestabChart
      {..._props}
      type={type}
      name={name}
      data={data.map(({ time, value }: any) => ({
        title: type,
        time: time * 1000,
        value: Number(value).toFixed(1)
      }))}
    />
  )
});