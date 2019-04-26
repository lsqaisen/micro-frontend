import { Row, Col, PageHeader } from 'antd';
import Basic, { BasicProps } from './basic';
import Chart from '@/components/charts/simple';
import Empty from './basic/empty';

export interface SystemLoadProps extends BasicProps { }

class SystemLoad extends Basic<SystemLoadProps, any> {
  render() {
    const { data } = this.props;
    if (data!.length <= 0) return (<Empty description="暂无CPU监控数据" />);
    return (
      <Row gutter={24} style={{ paddingTop: 16 }}>
        <Col span={24}>
          <PageHeader title="系统平均负载" />
        </Col>
        <Col span={24} style={{ height: 260 }}>
          <Chart color={["#286cff", "#0db46e", "#ff9000"]} data={data} />
        </Col>
      </Row>
    )
  }
}

export default SystemLoad;