import { PureComponent, Component } from 'react';
import { Row, Col, Statistic } from 'antd';
import basic, { BasicProps } from './basic';
import Chart from '@/components/charts/simple';
import Empty from './basic/empty';

export interface MemProps extends BasicProps {
  timeMask: string;
  totalSuffix: React.ReactNode;
  usedSuffix: React.ReactNode;
}

@basic
class Mem extends (PureComponent || Component)<MemProps, any> {
  render() {
    const { data, total, used, totalSuffix, usedSuffix, timeMask } = this.props;
    if (data!.length <= 0) return (<Empty description="暂无CPU监控数据" />);
    return (
      <Row gutter={24}>
        <Col span={12} style={{ textAlign: 'right' }}>
          <Statistic title="内存总量" suffix={totalSuffix!} value={total} />
        </Col>
        <Col span={12} style={{ textAlign: 'right' }}>
          <Statistic title="内存使用量" suffix={usedSuffix!} value={used} />
        </Col>
        <Col span={24} style={{ height: 260 }}>
          <Chart timeMask={timeMask} color={["#0db46e"]} data={data} />
        </Col>
      </Row>
    )
  }
}

export default Mem;