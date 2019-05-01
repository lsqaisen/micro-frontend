import { PureComponent, Component } from 'react';
import { Row, Col, Statistic, PageHeader } from 'antd';
import basic, { BasicProps } from './basic';
import Chart from '@/components/charts/simple';
import Empty from './basic/empty';

export interface MemProps extends BasicProps {
  timeMask: string;
}

@basic
class Mem extends PureComponent<MemProps, any> {
  render() {
    const { type, data, total, used, timeMask } = this.props;
    if (data!.length <= 0) return (<Empty description={`暂无${type}监控数据`} />);
    return (
      <PageHeader style={{ padding: 0 }} title="内存" subTitle="使用量/总量">
        <Row gutter={24}>
          <Col span={24} style={{ paddingBottom: 16 }}>
            <Statistic suffix={`/ ${total}`} value={used} />
          </Col>
          <Col span={24}>
            <Chart line type="area" height={248} timeMask={timeMask} color={["#0db46e"]} data={data} />
          </Col>
        </Row>
      </PageHeader>
    )
  }
}

export default Mem;