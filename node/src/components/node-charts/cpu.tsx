import { PureComponent, Component } from 'react';
import { Row, Col, Statistic, PageHeader } from 'antd';
import basic, { BasicProps } from './basic';
import Chart from '@/components/charts/simple';
import Empty from './basic/empty';

export interface CpuProps extends BasicProps {
  timeMask: string;
}

@basic
class Cpu extends PureComponent<CpuProps, any> {
  render() {
    const { data, total, used, timeMask } = this.props;
    if (data!.length <= 0) return (<Empty description="暂无CPU监控数据" />);
    return (
      <PageHeader style={{ padding: 0 }} title="CPU" subTitle="使用率/总核">
        <Row gutter={24}>
          <Col span={24} style={{ paddingBottom: 16 }}>
            <Statistic suffix={`% / ${total}核`} value={used} />
          </Col>
          <Col span={24}>
            <Chart line type="area" height={248} timeMask={timeMask} data={data} />
          </Col>
        </Row>
      </PageHeader>
    )
  }
}

export default Cpu;