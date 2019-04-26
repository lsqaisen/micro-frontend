import { Row, Col, Statistic } from 'antd';
import Basic, { BasicProps } from './basic';
import Chart from '@/components/charts/simple';
import Empty from './basic/empty';

export interface CpuProps extends BasicProps { }

class Cpu extends Basic<CpuProps, any> {
  render() {
    const { data, total, used } = this.props;
    if (data!.length <= 0) return (<Empty description="暂无CPU监控数据" />);
    return (
      <Row gutter={24} style={{ paddingTop: 16 }}>
        <Col span={12} style={{ textAlign: 'right' }}>
          <Statistic title="CPU总量" suffix="核" value={total} />
        </Col>
        <Col span={12} style={{ textAlign: 'right', paddingRight: 32 }}>
          <Statistic title="CPU使用率" suffix="%" value={used} />
        </Col>
        <Col span={24} style={{ height: 260 }}>
          <Chart data={data} />
        </Col>
      </Row>
    )
  }
}

export default Cpu;