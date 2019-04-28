import { PureComponent, Component } from 'react';
import { Row, Col, Statistic } from 'antd';
import basic, { BasicProps } from './basic';
import Chart from '@/components/charts/simple';
import Empty from './basic/empty';

export interface CpuProps extends BasicProps {
  timeMask: string;
}

@basic
class Cpu extends (PureComponent || Component)<CpuProps, any> {
  render() {
    const { data, total, used, timeMask } = this.props;
    if (data!.length <= 0) return (<Empty description="暂无CPU监控数据" />);
    return (
      <Row gutter={24}>
        <Col span={12} style={{ textAlign: 'right' }}>
          <Statistic title="CPU总量" suffix="核" value={total} />
        </Col>
        <Col span={12} style={{ textAlign: 'right' }}>
          <Statistic title="CPU使用率" suffix="%" value={used} />
        </Col>
        <Col span={24} style={{ height: 260 }}>
          <Chart timeMask={timeMask} data={data} />
        </Col>
      </Row>
    )
  }
}

export default Cpu;