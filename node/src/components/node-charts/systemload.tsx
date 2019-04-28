import { PureComponent, Component } from 'react';
import { Row, Col, PageHeader } from 'antd';
import basic, { BasicProps } from './basic';
import Chart from '@/components/charts/simple';
import Empty from './basic/empty';

export interface SystemLoadProps extends BasicProps {
  timeMask: string
}

@basic
class SystemLoad extends (PureComponent || Component)<SystemLoadProps, any> {
  render() {
    const { data, timeMask } = this.props;
    if (data!.length <= 0) return (<Empty description="暂无CPU监控数据" />);
    return (
      <PageHeader style={{ padding: 0 }} title="系统平均负载">
        <Row gutter={24} style={{ paddingTop: 24 }}>
          <Col span={24} style={{ height: 260 }}>
            <Chart timeMask={timeMask} type={"line" as any} color={["#286cff", "#0db46e", "#ff9000"]} data={data} />
          </Col>
        </Row>
      </PageHeader>
    )
  }
}

export default SystemLoad;