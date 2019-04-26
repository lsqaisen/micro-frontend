// import { PureComponent, Component } from 'react';
// import { connect } from 'dva';
// import { createSelector } from 'reselect';
// import { Row, Col, Statistic, PageHeader, Empty } from 'antd';
// import Chart from '@/components/charts/simple';
// import { getMetricsRequest } from '@/services/metric';

// const Countdown = Statistic.Countdown;

// @connect(createSelector(
//   [
//     (props: any) => props.node.metrics,
//   ],
//   (data) => ({ data })
// ))
// class Cpu extends (PureComponent || Component)<any, any> {
//   static readonly defaultProps = {
//     dur: 60 * 10,
//     step: 5,
//   }
//   timeHandle: NodeJS.Timeout | undefined = undefined;
//   state = {
//     loading: false,
//   }
//   metric = () => {
//     const { name, step, dur, dispatch } = this.props;
//     let data: getMetricsRequest = { name, step, dur, type: 'systemload', };
//     this.setState({ loading: true })
//     return dispatch({
//       type: 'node/metric',
//       payload: data
//     })
//   }
//   componentDidMount() {
//     this.metric();
//     this.timeHandle = setInterval(async () => {
//       if (!this.state.loading) {
//         await this.metric();
//         this.setState({ loading: false })
//       }
//     }, this.props.step * 1000)
//   }
//   componentWillUnmount() {
//     clearInterval(this.timeHandle!)
//   }
//   render() {
//     const { data, name } = this.props;
//     const metric = (data[name] || {})['systemload'] || {};
//     const metricData1 = (((metric.data || [])[0] || {}).values || []),
//       metricData2 = (((metric.data || [])[0] || {}).values || []),
//       metricData3 = (((metric.data || [])[0] || {}).values || []);
//     if (metricData1.length <= 0 && metricData2.length <= 0 && metricData3.length <= 0) {
//       return (
//         <div style={{ width: '100%', height: 240, position: 'relative' }}>
//           <Empty style={{ float: 'left', position: 'absolute', left: 'calc(50% - 61px)', top: 'calc(50% - 74px)' }} description="暂无系统负载监控数据" />
//         </div>
//       )
//     }
//     return (
//       <Row gutter={24} style={{ paddingTop: 16 }}>
//         <Col span={24}>
//           <PageHeader title="系统平均负载" />
//         </Col>
//         <Col span={24} style={{ height: 260 }}>
//           <Chart
//             type={'line' as any}
//             color={["#286cff", "#0db46e", "#ff9000"]}
//             data={[...metricData1.map(([time, value]: any) => ({
//               title: '1分钟',
//               time: time * 1000,
//               value: Number(value).toFixed(2)
//             })), ...metricData2.map(([time, value]: any) => ({
//               title: '5分钟',
//               time: time * 1000,
//               value: Number(value).toFixed(2)
//             })), ...metricData3.map(([time, value]: any) => ({
//               title: '10分钟',
//               time: time * 1000,
//               value: Number(value).toFixed(2)
//             }))]}
//           />
//         </Col>
//       </Row>
//     )
//   }
// }

// export default Cpu;
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
        value: (value * 100).toFixed(2)
      }))}
    />
  )
});