import { PureComponent, Component, Fragment } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import { Row, Col, Select, Radio } from 'antd';
import Cpu from './cpu';
import Mem from './mem';
import SystemLoad from './systemload';

const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

@connect(createSelector(
  [
    (props: any) => props.node.nodes['$all'] || [],
  ],
  (nodes) => ({ nodes })
))
class Metric extends (PureComponent || Component)<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      name: props.name || '.*',
      nodes: [],
      dur: 60 * 10,
      step: 5,
    }
  }
  get = () => {
    return this.props.dispatch({
      type: 'node/nodes',
    })
  }
  componentDidMount() {
    this.get();
  }
  render() {
    const { nodes: { data = [] } } = this.props;
    const { name, step, dur } = this.state;
    console.log(data)
    return (
      <Fragment>
        <Row style={{ margin: '24px 0' }}>
          {this.props.name ? null : <label style={{ marginRight: 56 }}>
            {`节点：`}
            <Select value={name} style={{ width: '240px' }} onChange={name => this.setState({ name })}>
              <Option key='.*'>所有节点{`(${data.length})`}</Option>
              {data.map((node: any) => <Option key={node.name}>{node.name}</Option>)}
            </Select>
          </label>}
          <label>
            {`时间：`}
            <RadioGroup value={dur} onChange={e => this.setState({
              dur: e.target.value,
              step: e.target.value == 60 * 10 ? 5 : e.target.value / 180
            })}>
              <RadioButton value={60 * 10}>实时</RadioButton>
              <RadioButton value={60 * 60 * 3}>近3小时</RadioButton>
              <RadioButton value={60 * 60 * 12}>近12小时</RadioButton>
              <RadioButton value={60 * 60 * 24}>近24小时</RadioButton>
              <RadioButton value={60 * 60 * 24 * 3}>近3天</RadioButton>
              <RadioButton value={60 * 60 * 24 * 7}>近7天</RadioButton>
            </RadioGroup>
          </label>
        </Row>
        <Row gutter={24}>
          <Col span={8} >
            <Cpu name={name} dur={dur} step={step} />
          </Col>
          <Col span={8} >
            <Mem name={name} dur={dur} step={step} />
          </Col>
          <Col span={8} >
            <SystemLoad name={name} dur={dur} step={step} />
          </Col>
        </Row>
      </Fragment>
    )
  }
}


export default Metric;