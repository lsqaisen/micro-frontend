import { PureComponent, Component, Fragment } from 'react';
import { Tabs, Icon, Button } from 'antd';
import router from 'umi/router';
import QueueAnim from 'rc-queue-anim';
import Node, { NodeProps } from '../node';
import styles from './style/index.less';

const TabPane = Tabs.TabPane;

export type ResourceProps = {
  resource: any[];
  cluster: string;
  currentResource: string;
};

class Resource extends (PureComponent || Component)<ResourceProps, any> {
  UNSAFE_componentWillReceiveProps({ resource, cluster, currentResource }: ResourceProps) {
    if (resource.length > 0) {
      if (!currentResource && !!this.props.currentResource) {
        router.push(`/node?cluster=${cluster || ''}&resource=${resource[0].name || ''}`);
      }
      if (!!currentResource && this.props.currentResource !== currentResource && resource.every(v => `${v.name}` !== currentResource)) {
        router.push(`/node?cluster=${cluster || ''}&resource=${this.props.currentResource || ''}`);
      }
    }
  }
  componentDidMount() {
    const { currentResource, cluster, resource } = this.props;
    if (!currentResource) {
      router.push(`/node?cluster=${cluster || ''}&resource=${resource[0].name || ''}`);
    }
  }
  render() {
    const { cluster, currentResource, resource = [], children } = this.props;
    return (
      <Tabs
        className={styles.resource}
        onChange={(activeKey: string) => router.push(`/node?cluster=${cluster || ''}&resource=${activeKey || ''}`)}
        activeKey={currentResource}
        type="editable-card"
        onEdit={() => { }}
      >
        {resource.map(v => (
          <TabPane tab={v.tag} key={v.name}>
            {children}
          </TabPane>
        ))}
      </Tabs>
    )
  }
}

export default Resource;