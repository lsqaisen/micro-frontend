import { PureComponent, Component } from 'react';
import * as G2 from '@antv/g2';
import { generateUUID } from '@/utils';

enum Types { line = "line", area = "area" }

export interface DataType {
  title: string;
  time: number;
  value: number | string;
}

export interface ContrastProps {
  type?: Types;
  color?: string[];
  symbol?: string;
  height?: number;
  timeMask?: string;
  data?: DataType[];
}

class Contrast extends (PureComponent || Component)<ContrastProps, any> {
  static readonly defaultProps: ContrastProps = {
    type: Types.area,
    symbol: '%',
    data: [],
    height: 260,
    timeMask: 'mm:ss',
    color: ['#286cff']
  }

  chart: any = undefined;
  view1: any = undefined;
  view2: any = undefined;


  id = generateUUID();

  UNSAFE_componentWillReceiveProps({ data = [], timeMask }: ContrastProps) {
    if (JSON.stringify(data) !== JSON.stringify(this.props.data)) {
      this.chart && this.chart.changeData(data);
    }
    if (timeMask !== this.props.timeMask) {
      this.chart.scale({
        time: {
          type: 'time',
          mask: timeMask,
        }
      });
    }
  }
  componentDidMount() {
    const { timeMask, height, color, data } = this.props;
    this.chart = new G2.Chart({
      container: this.id,
      forceFit: true,
      height,
      padding: [16, 56, 50, 56]
    })
    this.chart.legend(false);
    this.chart.axis('disk', {
      grid: null
    });
    this.chart.axis('diskio', {
      title: true
    });

    const scale = {
      time: {
        type: 'time',
        mask: timeMask
      },
      diskio: {
        type: 'linear',
        sync: true,
        alias: '磁盘读写请求数（iops）',
        formatter(val: any) {
          return `${val}`
        },
      },
      disk: {
        type: 'linear',
        sync: true,
        alias: '磁盘读写速度',
        formatter(val: any) {
          return `${window.Number(val).flowCeil(0)}`
        },
      }
    };
    this.chart.source(data, scale)
    this.chart.line().position('time*diskio').color('title', color)
    this.chart.interval().position('time*disk').color('title', color)
    this.chart.render();
  }
  render() {
    return (
      <div style={{ width: '100%', height: '100%' }} id={this.id} />
    )
  }
}

export default Contrast;
