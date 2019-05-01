import { PureComponent, Fragment } from 'react';
import { Icon, Button, Drawer } from 'antd';
import AddNodeForm from './form/add-node-form';
import { addClusterRequest } from '@/services/cluster';
import styles from './style/chart.less';

export interface AddNodeProps {
  onSubmit?: (value: addClusterRequest) => any
}

class AddNode extends PureComponent<AddNodeProps, any> {
  static readonly defaultProps: AddNodeProps = {
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
      <Fragment >
        <Button className={styles.btn} type="primary" onClick={() => { this.setState({ visible: true }) }}>
          <Icon type="import" /> 安装节点
        </Button>
        <Drawer
          title="添加集群"
          width={482}
          placement="right"
          onClose={() => { this.setState({ visible: false }) }}
          visible={visible}
        >
          <AddNodeForm ref="addnode" />
          <div className={"node-actions"} >
            <Button onClick={() => { this.setState({ visible: false }) }} style={{ marginRight: 8 }}> 取消 </Button>
            <Button loading={loading} onClick={() => {
              (this.refs.addnode as any).validateFields(async (error: any, values: addClusterRequest) => {
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
      </Fragment>
    )
  }
}

export default AddNode;