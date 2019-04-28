import { PureComponent, Component, Fragment } from 'react';
import * as G2 from '@antv/g2';
import { generateUUID } from '@/utils';

enum Types { line = "line", area = "area" }

export interface SimpleProps {
  type?: Types;
  color?: string[];
  symbol?: string;
  height?: number;
  data?: number;
}

class Cpu extends (PureComponent || Component)<SimpleProps, any> {
  static readonly defaultProps: SimpleProps = {
    type: Types.area,
    symbol: '%',
    data: 0,
    height: 160,
    color: ['#286cff']
  }

  chart: any = undefined;
  view: any = undefined;

  id = generateUUID();
  formatData = (value: any) => {
    let data = [];
    for (let i = 0; i < 100; i++) {
      var item: any = {};
      item.type = i + '';
      item.value = 10;
      if (i === Number(Number(value).toFixed(0))) {
        console.log(43434)
        item.value = 14;
      }
      if (i > value!) {
        item.value = 0;
      }
      data.push(item);
    }
    console.log(data,4343)
    return data;
  }
  UNSAFE_componentWillReceiveProps({ data = 0 }: SimpleProps) {
    if (data != this.props.data) {
      console.log(232323)
      this.chart && this.chart.changeData(this.formatData(data));
      this.view &&  this.view.changeData(this.formatData(data));
    }

  }
  componentDidMount() {
    const { type, height, color, symbol, data } = this.props;
    var data1 = [];
    for (var i = 0; i < 100; i++) {
      var item: any = {};
      item.type = i + '';
      item.value = 10;
      data1.push(item);
    }
    let data2 = this.formatData(data);

    this.chart = new G2.Chart({
      container: this.id,
      forceFit: true,
      height,
      padding: 0
    });
    this.chart.scale({
      type: {
        range: [0, 1]
      },
      value: {
        sync: true
      }
    });
    this.chart.legend(false);
    this.chart.tooltip(false);
    var view1 = this.chart.view();
    view1.source(data1);
    view1.axis(false);
    view1.coord('polar', {
      startAngle: -9 / 8 * Math.PI,
      endAngle: 1 / 8 * Math.PI,
      innerRadius: 0.75,
      radius: 0.8
    });
    view1.interval().position('type*value').color('#CBCBCB').size(3);

    this.chart.source(data1, {
      type: {
        tickCount: 3
      }
    });
    this.chart.axis('value', false);
    this.chart.axis('type', {
      grid: null,
      line: undefined,
      tickLine: null,
      label: {
        offset: -15,
        textStyle: {
          textAlign: 'center',
          fill: 'color',
          fontSize: 18
        },
        formatter: (val: any) => {
          if (val === '99') {
            return 100;
          }
          return val;
        }
      }
    });
    this.chart.coord('polar', {
      startAngle: -9 / 8 * Math.PI,
      endAngle: 1 / 8 * Math.PI,
      innerRadius: 0.95,
      radius: 0.55
    });
    this.chart.interval().position('type*value').color('#CBCBCB').size(3);

    this.view = this.chart.view();
    this.view.source(data2);
    this.view.axis(false);
    this.view.coord('polar', {
      startAngle: -9 / 8 * Math.PI,
      endAngle: 1 / 8 * Math.PI,
      innerRadius: 0.75,
      radius: 0.8
    });
    this.view.interval().position('type*value').color('value', color!).opacity(1).size(3);
    this.view.guide().text({
      position: ['50%', '65%'],
      content: `${data}${symbol}`,
      style: {
        fill: '#286cff',
        fontSize: 24,
        textAlign: 'center',
        textBaseline: 'middle'
      }
    });

    this.chart.render();
  }
  render() {
    return (
      <div style={{ width: '100%', height: '100%' }} id={this.id} />
    )
  }
}

export default Cpu;