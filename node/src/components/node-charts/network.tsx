import { PureComponent, Component } from 'react';
import { Row, Col, Statistic, PageHeader } from 'antd';
import basic, { BasicProps } from './basic';
import Chart from '@/components/charts/simple';
import Empty from './basic/empty';

export interface NetworkProps extends BasicProps {
  timeMask: string
}

@basic
class Network extends (PureComponent || Component)<NetworkProps, any> {
  render() {
    const { data, timeMask } = this.props;
    if (data!.length <= 0) return (<Empty description="暂无TCP连接数数据" />);
    return (
      <PageHeader style={{ padding: 0 }} title="TCP连接数">
        <Row>
          <Col>
            <Statistic title="TCP连接数" value={window.Number(data!.slice(-1)[0].value).netCeil(2)} />
          </Col>
          <Col span={24} style={{ height: 260 }}>
            <Chart timeMask={timeMask} format={(v: any) => window.Number(v).netCeil(2)} symbol="个" type={"line" as any} color={["#286cff", "#0db46e", "#ff9000"]} data={data} />
          </Col>
        </Row>
      </PageHeader>
    )
  }
}

export default Network;