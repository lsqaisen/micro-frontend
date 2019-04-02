import { PureComponent, Component } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import QueueAnim from 'rc-queue-anim';
import Item from '@/components/item';

@connect(createSelector(
  [
    (props: any) => props.plugin.data,
    (props: any) => !!props.loading.effects['plugin/plugins']
  ],
  (plugins, loading) => ({ plugins, loading })
))
class Plugin extends (PureComponent || Component)<any, any> {
  state = {
    init: false,
  }
  plugins = () => {
    this.props.dispatch({
      type: 'plugin/plugins'
    })
  }
  active = async (id: string) => {
    return this.props.dispatch({
      type: 'plugin/active',
      payload: { name: id }
    })
  }
  del = async (id: string) => {
    return this.props.dispatch({
      type: 'plugin/del',
      payload: { name: id }
    })
  }
  componentDidMount() {
    this.plugins();
  }
  render() {
    const { plugins } = this.props;
    const { init } = this.state;
    return (
      <QueueAnim
        type="bottom"
        component={Row}
        componentProps={{
          gutter: 24,
          type: "flex",
          justify: "space-between",
          align: "top"
        }}
      >
        {plugins.map((plguin: any) => (
          <Col key={plguin.spec.id} md={12} xl={8} style={{ padding: '12px' }}>
            <Item
              plugin={plguin}
              onActive={async () => await this.active(plguin.spec.id)}
              onDel={async () => await this.del(plguin.spec.id)}
            />
          </Col>
        ))}
      </QueueAnim>
    )
  }
}

export default Plugin;