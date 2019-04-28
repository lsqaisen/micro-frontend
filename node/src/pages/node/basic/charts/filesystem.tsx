import { connect } from 'dva';
import { createSelector } from 'reselect';
import FileSystemChart from '@/components/node-charts/filesystem';

export default connect(createSelector(
  [
    () => 'filesystem',
    (props: any) => props.node.metrics,
  ],
  (type, metrics) => ({ type, metrics })
))((props: any) => {
  const { type, metrics, name, ..._props } = props;
  const { used = 0, total = 0 } = (metrics[name] || {})[type] || {};
  return (
    <FileSystemChart
      {..._props}
      type={type}
      name={name}
      used={used}
      total={total}
      data={Number(Number((used || 0) / (total || -1) * 100).toFixed(2))}
    />
  )
});