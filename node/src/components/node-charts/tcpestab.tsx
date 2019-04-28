import { PureComponent, Component } from 'react';
import { Row, Col, Statistic, PageHeader } from 'antd';
import basic, { BasicProps } from './basic';
import Chart from '@/components/charts/simple';
import Empty from './basic/empty';

export interface TcpestabProps extends BasicProps {
  timeMask: string
}

@basic
class Tcpestab extends (PureComponent || Component)<TcpestabProps, any> {
  render() {
    const { data, timeMask } = this.props;
    if (data!.length <= 0) return (<Empty description="暂无TCP连接数数据" />);
    return (
      <PageHeader style={{ padding: 0 }} title="TCP连接数">
        <Row>
          <Col>
            <Statistic title="TCP连接数" suffix="（个）" value={data!.slice(-1)[0].value} />
          </Col>  
          <Col span={24} style={{ height: 260 }}>
            <Chart timeMask={timeMask} symbol="个" type={"interval" as any} color={["#286cff", "#0db46e", "#ff9000"]} data={data} />
          </Col>
        </Row>
      </PageHeader>
    )
  }
}

export default Tcpestab;