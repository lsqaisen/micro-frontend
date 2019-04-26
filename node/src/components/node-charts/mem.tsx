import { Row, Col, Statistic } from 'antd';
import Basic, { BasicProps } from './basic';
import Chart from '@/components/charts/simple';
import Empty from './basic/empty';

export interface MemProps extends BasicProps {
  totalSuffix: React.ReactNode;
  usedSuffix: React.ReactNode;
}

class Mem extends Basic<MemProps, any> {
  render() {
    const { data, total, used, totalSuffix, usedSuffix } = this.props;
    if (data!.length <= 0) return (<Empty description="暂无CPU监控数据" />);
    return (
      <Row gutter={24} style={{ paddingTop: 16 }}>
        <Col span={12} style={{ textAlign: 'right' }}>
          <Statistic title="内存总量" suffix={totalSuffix} value={total} />
        </Col>
        <Col span={12} style={{ textAlign: 'right', paddingRight: 32 }}>
          <Statistic title="内存使用量" suffix={usedSuffix} value={used} />
        </Col>
        <Col span={24} style={{ height: 260 }}>
          <Chart color={["#0db46e"]} data={data} />
        </Col>
      </Row>
    )
  }
}

export default Mem;