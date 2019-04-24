import { PureComponent, Component } from 'react';
import { Tabs, Modal, PageHeader } from 'antd';
import router from 'umi/router';
import AddResource from './add-resource';
import { createResourceRequest } from '@/services/resource';
import styles from './style/index.less';

const TabPane = Tabs.TabPane;

export type ResourceProps = {
  data: any[];
  clusterName: string;
  resourceName: string;
  onAdd?: (value: createResourceRequest) => void;
  onDelete?: (name: string | any) => void;
};

const routes = [
  {
    path: 'index',
    breadcrumbName: 'First-level Menu',
  },
  {
    path: 'first',
    breadcrumbName: 'Second-level Menu',
  },
  {
    path: 'second',
    breadcrumbName: 'Third-level Menu',
  },
];

class Resource extends (PureComponent || Component)<ResourceProps, any> {

  setResource = (resourceName?: string) => {
    const { clusterName } = this.props;
    router.push(`/node?cluster=${clusterName!}&resource=${resourceName!}`);
  }
  UNSAFE_componentWillReceiveProps({ data, resourceName }: ResourceProps) {
    if (data.length > 0) {
      if ((!resourceName && !!this.props.resourceName) || data.every(v => `${v.name}` !== resourceName)) {
        this.setResource(data[0].name)
      }
      if (!!resourceName && this.props.resourceName !== resourceName && data.every(v => `${v.name}` !== resourceName)) {
        if (data.every(v => `${v.name}` !== this.props.resourceName)) {
          this.setResource(data[0].name)
        } else {
          this.setResource(this.props.resourceName)
        }
      }
    }
  }
  componentDidMount() {
    const { resourceName, data } = this.props;
    if (!resourceName) {
      this.setResource(data[0].name)
    }
  }
  render() {
    const { resourceName, data = [], children, onAdd, onDelete } = this.props;
    const resource = data.find(v => v.name === resourceName) || {};
    return (
      <PageHeader
        title={resource.tag}
        subTitle={resource.desc}
        breadcrumb={{ routes }}
      >
        <Tabs
          hideAdd
          className={styles.resource}
          onChange={(activeKey: string) => this.setResource(activeKey)}
          activeKey={resourceName}
          type="editable-card"
          tabBarExtraContent={<AddResource onSubmit={onAdd} />}
          onEdit={(resourceName) => {
            Modal.confirm({
              title: `确认是否需要删除资源池${resourceName}?`,
              content: data.find(v => v.name === resourceName).desc,
              okText: '确认',
              okType: 'danger',
              cancelText: '取消',
              onOk() {
                return new Promise(async (resolve, reject) => {
                  const error: any = await onDelete!(resourceName);
                  if (!error) {
                    resolve()
                  } else {
                    reject(error)
                  }
                })
              },
            })
          }}
        >
          {
            data.map(v => (
              <TabPane tab={v.tag} key={v.name}>
                {children}
              </TabPane>
            ))
          }
        </Tabs >
      </PageHeader>
    )
  }
}

export default Resource;