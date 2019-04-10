import { PureComponent, Component, Fragment } from 'react';
import { Icon, Button, Drawer } from 'antd';
import AddClusterForm from './form/add-cluster-form';
import { FormComponentProps } from 'antd/lib/form'
import styles from './style/index.less';


class AddCluster extends (PureComponent || Component)<any, any> {
  state = {
    visible: false
  }

  render() {
    let { visible } = this.state;
    return (
      <div style={{ padding: '24px 0px 8px 16px' }}>
        <Button style={{ width: '100%' }} onClick={() => { this.setState({ visible: true }) }}>
          <Icon type="plus" /> 添加集群
        </Button>
        <Drawer
          title="Create a new cluster"
          width={466}
          placement="left"
          onClose={() => { this.setState({ visible: false }) }}
          visible={visible}
        >
          <AddClusterForm ref="addcluster" />
          <div
            style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e9e9e9',
              padding: '10px 16px',
              background: '#fff',
              textAlign: 'right',
            }}
          >
            <Button onClick={() => { }} style={{ marginRight: 8 }}> 取消 </Button>
            <Button onClick={() => {
              (this.refs.addcluster as any).validateFields(async (error: any, values: any) => {
                console.log(error, values)
              })
            }} type="primary"> 提交 </Button>
          </div>
        </Drawer>
      </div>
    )
  }
}

export default AddCluster;