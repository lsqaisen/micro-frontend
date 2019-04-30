import { PureComponent, Component } from 'react';
import { PageHeader } from 'antd';
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
    if (data!.length <= 0) return (<Empty description="暂无网络流入流出数据" />);
    return (
      <PageHeader style={{ padding: 0 }} title="网络流入流出">
        <Chart height={308} legend={{ position: 'top' }} min={undefined} type="line" timeMask={timeMask} color={["#286cff", "#0db46e", "#ff9000"]} data={data} formatter={v => window.Number(v).netCeil(2)} />
      </PageHeader>
    )
  }
}

export default Network;