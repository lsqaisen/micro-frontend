import { PureComponent } from 'react';
import { Menu, Icon, Modal } from 'antd';
import router from 'umi/router';
import QueueAnim from 'rc-queue-anim';
import ScrollBar from 'react-perfect-scrollbar';
import AddCluser from './add-cluster';
import { addClusterRequest } from '@/services/cluster';
import styles from './style/index.less';

const { ItemGroup } = Menu;

export type ClusterProps = {
  data: any[];
  clusterName?: string;
  onAdd?: (value: addClusterRequest) => void;
  onDelete?: (name: string) => void;
}

class Cluster extends PureComponent<ClusterProps, any> {
  static readonly defaultProps: ClusterProps = {
    data: []
  }
  setCluster = (clusterName?: string) => {
    router.push(`/node?cluster=${clusterName!}`);
  }
  UNSAFE_componentWillReceiveProps({ data, clusterName }: ClusterProps) {
    if (data.length > 0) {
      if (!clusterName && !!this.props.clusterName) {
        this.setCluster(this.props.clusterName)
      }
      if (!clusterName && !this.props.clusterName) {
        this.setCluster((data || [])[0].name || '')
      }
      if (!!clusterName && this.props.clusterName !== clusterName && data.every(v => `${v.name}` !== clusterName)) {
        this.setCluster(this.props.clusterName);
      }
    }
  }
  componentDidMount() {
    const { clusterName, data } = this.props;
    if (!clusterName && data.length > 0) {
      this.setCluster((data || [])[0].name || '')
    }
  }
  render() {
    const { clusterName, data, onAdd, onDelete } = this.props;
    return (
      <div className={styles.menu_box}>
        <AddCluser onSubmit={onAdd!} />
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
              selectedKeys: [clusterName],
              onClick: (e: any) => this.setCluster(e.key)
            }}
            animConfig={[
              { opacity: [1, 0], translateX: [0, -250] },
              { opacity: [1, 0], translateX: [0, 250] },
            ]}
          >
            <ItemGroup key="cluster" title="集群列表">
              {data.map((v: addClusterRequest) => (
                <Menu.Item key={v.name}>
                  {v.name}
                  {v.name !== "default" && <a
                    href="#"
                    style={{ position: 'absolute', top: 0, right: 0 }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      Modal.confirm({
                        title: `确认是否需要删除集群${v.name}?`,
                        content: v.desc,
                        okText: '确认',
                        okType: 'danger',
                        cancelText: '取消',
                        onOk() {
                          return new Promise(async (resolve, reject) => {
                            const error: any = await onDelete!(v.name);
                            if (!error) {
                              resolve()
                            } else {
                              reject(error)
                            }
                          })
                        },
                      })
                    }}> <Icon type="close" /> </a>}
                </Menu.Item>
              ))}
            </ItemGroup>
          </QueueAnim>
        </ScrollBar>
      </div >
    )
  }
}

export default Cluster;