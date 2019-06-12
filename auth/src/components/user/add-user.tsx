import { PureComponent, cloneElement } from 'react';
import { Icon, Button, Drawer } from 'antd';
import AddGroupForm, { GroupFromProps } from './form/add-group-form';
import { addGroupRequest } from '@/services/group';
import styles from './style/index.less';

export interface AddGroupProps {
  btn?: React.ReactNode;
  onSubmit?: (value: addGroupRequest) => void
}

class AddGroup extends PureComponent<AddGroupProps, any> {
  static readonly defaultProps = {
    onSubmit: () => null
  };

  state = {
    loading: false,
    visible: false,
  }

  render() {
    const { btn, onSubmit } = this.props;
    const { loading, visible } = this.state;
    return (
      <div className={styles.add_group}>
        {btn ? cloneElement(btn as any, {
          onClick: () => { this.setState({ visible: true }) }
        }) : <Button className={styles.btn} type="primary" onClick={() => { this.setState({ visible: true }) }}>
            <Icon type="plus" /> 添加权限组
        </Button>}
        <Drawer
          maskClosable={false}
          title="添加用户权限组"
          width={482}
          placement="left"
          onClose={() => { this.setState({ visible: false }) }}
          visible={visible}
        >
          <AddGroupForm ref="addgroup" />
          <div className={"node-actions"} >
            <Button onClick={() => { this.setState({ visible: false }) }} style={{ marginRight: 8 }}> 取消 </Button>
            <Button loading={loading} onClick={() => {
              (this.refs.addgroup as any).validateFields(async (error: any, values: addGroupRequest) => {
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

export default AddGroup;