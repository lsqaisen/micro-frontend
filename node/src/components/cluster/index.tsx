import { PureComponent, Component, Fragment } from 'react';
import { Menu, Icon, Button } from 'antd';
import router from 'umi/router';
import QueueAnim from 'rc-queue-anim';
import ScrollBar from 'react-perfect-scrollbar';
import AddCluser from './add-cluster';
import styles from './style/index.less';

const { SubMenu, ItemGroup } = Menu;

export type CluseterProps = {
  cluster: any[];
  currentCluster?: string;
}

class Cluster extends (PureComponent || Component)<CluseterProps, any> {
  UNSAFE_componentWillReceiveProps({ cluster, currentCluster }: CluseterProps) {
    if (cluster.length > 0) {
      if (!currentCluster && !!this.props.currentCluster) {
        router.push(`/node?cluster=${this.props.currentCluster}`);
      }
      if (!!currentCluster && this.props.currentCluster !== currentCluster && cluster.every(v => `${v.name}` !== currentCluster)) {
        router.push(`/node?cluster=${this.props.currentCluster}`);
      }
    }
  }
  componentDidMount() {
    const { currentCluster, cluster } = this.props;
    if (!currentCluster && cluster.length > 0) {
      router.push(`/node?cluster=${(cluster || [])[0].name || ''}`);
    }
  }
  render() {
    const { currentCluster, cluster = [] } = this.props;
    return (
      <div className={styles.menu_box}>
        <AddCluser />
        <ScrollBar
          option={{
            suppressScrollX: true,
          }}
        >
          <QueueAnim
            component={Menu}
            componentProps={{
              mode: "inline",
              style: { height: '100%' },
              selectedKeys: [currentCluster],
              onClick: (e: any) => {
                router.push(`/node?cluster=${e.key}`);
              }
            }}
            animConfig={[
              { opacity: [1, 0], translateX: [0, -250] },
              { opacity: [1, 0], translateX: [0, 250] },
            ]}
          >
            <ItemGroup key="cluster" title="集群列表">
              {cluster.map(v => (
                <Menu.Item key={v.name}>
                  {v.name}
                  {v.name !== "default" && <Icon type="close" style={{ position: 'absolute', top: '13px', right: 0 }} />}
                </Menu.Item>
              ))}
            </ItemGroup>
          </QueueAnim>
        </ScrollBar>
      </div>
    )
  }
}

export default Cluster;