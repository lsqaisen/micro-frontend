import { PureComponent, Component } from 'react';
import { Icon, Button, Drawer } from 'antd';
import AddClusterForm from './form/add-cluster-form';
import { addClusterRequest } from '@/services/cluster';
import styles from './style/index.less';

export interface AddClusterProps {
  onSubmit?: (value: addClusterRequest) => void
}

class AddCluster extends (PureComponent || Component)<AddClusterProps, any> {
  static readonly defaultProps: AddClusterProps = {
    onSubmit: () => null
  };

  state = {
    loading: false,
    visible: false,
  }

  render() {
    const { onSubmit } = this.props;
    const { loading, visible } = this.state;
    return (
      <div className={styles.add_cluster} >
        <Button className={styles.btn} type="primary" onClick={() => { this.setState({ visible: true }) }}>
          <Icon type="plus" /> 添加集群
        </Button>
        <Drawer
          title="添加集群"
          width={482}
          placement="left"
          onClose={() => { this.setState({ visible: false }) }}
          visible={visible}
        >
          <AddClusterForm ref="addcluster" />
          <div className={"node-actions"} >
            <Button onClick={() => { this.setState({ visible: false }) }} style={{ marginRight: 8 }}> 取消 </Button>
            <Button loading={loading} onClick={() => {
              (this.refs.addcluster as any).validateFields(async (error: any, values: addClusterRequest) => {
                if (!error) {
                  this.setState({ loading: true })
                  if ((await onSubmit!(values)) as any) {
                    this.setState({ loading: false })
                  } else {
                    this.setState({ visible: false, loading: false })
                  }
                }
              })
            }} type="primary"> 提交 </Button>
          </div>
        </Drawer>
      </div>
    )
  }
}

export default AddCluster;