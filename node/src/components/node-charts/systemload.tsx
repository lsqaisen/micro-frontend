import { PureComponent } from 'react';
import { Row, Col, PageHeader } from 'antd';
import basic, { BasicProps } from './basic';
import Chart from '@/components/global/charts/simple';
import Empty from './basic/empty';

export interface SystemLoadProps extends BasicProps {
  timeMask: string
}

@basic
class SystemLoad extends PureComponent<SystemLoadProps, any> {
  render() {
    const { data, timeMask } = this.props;
    if (data!.length <= 0) return (<Empty description={`暂无系统负载监控数据`} />);
    return (
      <PageHeader style={{ padding: 0 }} title="系统平均负载">
        <Chart legend={{ position: 'top-center' }} type="line" height={298} timeMask={timeMask} color={["#286cff", "#0db46e", "#ff9000"]} data={data} />
      </PageHeader>
    )
  }
}

export default SystemLoad;