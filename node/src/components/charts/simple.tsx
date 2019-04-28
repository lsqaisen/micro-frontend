import { PureComponent, Component } from 'react';
import * as G2 from '@antv/g2';
import { generateUUID } from '@/utils';

enum Types { line = "line", area = "area", interval = "interval" }

export interface DataType {
  title: string;
  time: number;
  value: number | string;
}

export interface SimpleProps {
  type?: Types;
  color?: string[];
  symbol?: string;
  height?: number;
  timeMask?: string;
  format?: Function;
  data?: DataType[];
}

class Simple extends (PureComponent || Component)<SimpleProps, any> {
  static readonly defaultProps: SimpleProps = {
    type: Types.area,
    symbol: '%',
    data: [],
    height: 260,
    timeMask: 'mm:ss',
    color: ['#286cff']
  }

  chart: any = undefined;

  id = generateUUID();

  UNSAFE_componentWillReceiveProps({ data = [], timeMask }: SimpleProps) {
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
    const { type, timeMask, height, color, symbol, format, data } = this.props;
    this.chart = new G2.Chart({
      container: this.id,
      forceFit: true,
      height,
      padding: [16, 8, 50, 60]
    });
    this.chart.source(data);
    this.chart.scale({
      value: {
        type: 'linear',
        sync: true,
        formatter(val: any) {
          return format ? format(val) : `${val}${symbol}`
        }
      },
      time: {
        type: 'time',
        mask: timeMask,
      }
    });
    this.chart.axis('title');
    this.chart.tooltip({
      crosshairs: 'y',
      share: true
    });
    this.chart.legend({
      attachLast: true
    });
    if (type === Types.interval) {
      this.chart.interval().position('time*value').color("title", color).shape('spline');
    } else {
      this.chart.line().position('time*value').color("title", color).shape('smooth');
      type === Types.area && this.chart.area().position('time*value').color("title", color).opacity(.4);
    }
    this.chart.render();
  }
  render() {
    return (
      <div style={{ width: '100%', height: '100%' }} id={this.id} />
    )
  }
}

export default Simple;
