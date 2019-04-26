import { PureComponent, Component, Fragment } from 'react';
import * as G2 from '@antv/g2';
import { generateUUID } from '@/utils';

enum Types { line = "line", area = "area" }

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
  data?: DataType[];
}

class Simple extends (PureComponent || Component)<SimpleProps, any> {
  static readonly defaultProps: SimpleProps = {
    type: Types.area,
    symbol: '%',
    data: [],
    height: 260,
    color: ['#286cff']
  }

  chart: any = undefined;

  id = generateUUID();

  UNSAFE_componentWillReceiveProps({ data = [] }: SimpleProps) {
    if (JSON.stringify(data) !== JSON.stringify(this.props.data)) {
      this.chart && this.chart.changeData(data);
    }

  }
  componentDidMount() {
    const { type, height, color, symbol, data } = this.props;
    this.chart = new G2.Chart({
      container: this.id,
      forceFit: true,
      height,
      padding: [24, 0, 50, 56]
    });
    this.chart.source(data);

    this.chart.scale({
      value: {
        type: 'linear',
        sync: true,
        formatter(val: any) {
          return `${val}${symbol}`
        }
      },
      time: {
        type: 'time',
        mask: 'h:mm:ss',
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

    this.chart.line().position('time*value').color("title", color);
    type === Types.area && this.chart.area().position('time*value').color("title", color).opacity(.4);
    this.chart.render();
  }
  render() {
    return (
      <div style={{ width: '100%', height: '100%' }} id={this.id} />
    )
  }
}

export default Simple;
