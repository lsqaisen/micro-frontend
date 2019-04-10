import { PureComponent, Component, Fragment } from 'react';
import { Drawer } from 'antd';
import router from 'umi/router';
import QueueAnim from 'rc-queue-anim';
import Node, { NodeProps } from '../node';
import styles from './style/index.less';


export type ResourceProps = {
  resource: any[];
  cluster: string;
  currentResource: string;
};

class Install extends (PureComponent || Component)<ResourceProps, any> {
  componentDidMount() {
  }
  render() {
    const { cluster, currentResource, resource = [], children } = this.props;
    return (
      <Fragment>
        <a href="">安装详情</a>
        <Drawer
          title="Basic Drawer"
          // placement={this.state.placement}
          closable={false}
          onClose={() => { }}
          // visible={this.state.visible}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
      </Fragment>
    )
  }
}

export default Install;